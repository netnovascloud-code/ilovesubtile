// Konvertools — security tools backend. Self-contained (no shared imports).
// POST JSON: { action, ... }
//   action=validate_email   { email }                  → validity report
//   action=scan_file        { sha256, name?, size? }   → VirusTotal hash lookup
//   action=scan_url         { url }                    → Safe Browsing verdict
//   action=analyze_phishing { text }                   → Mistral + Safe Browsing
//
// Auth: optional user JWT. Signed-in FREE users are capped per day per bucket
// (the conversion lever); anonymous traffic is gated client-side; Pro/Business
// pass through. Nothing is stored: files never leave the browser (only their
// SHA-256 hash is sent), and no job rows are written.
//
// Secrets: VIRUSTOTAL_API_KEY, GOOGLE_SAFE_BROWSING_KEY, MISTRAL_API_KEY.
// Deploy: supabase functions deploy security-tools --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STATIC_ORIGINS = new Set<string>([
  "https://konvertools.com", "https://www.konvertools.com",
  "https://konver.app", "https://www.konver.app",
  "http://localhost:3000", "http://127.0.0.1:3000",
]);
function corsFor(req: Request): Record<string, string> {
  const o = req.headers.get("origin") ?? "";
  const allow = STATIC_ORIGINS.has(o) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : "https://konvertools.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Per-bucket FREE daily caps (signed-in free accounts). Pro/Business unlimited
// within fair use. Anonymous users are gated client-side.
const FREE_DAILY: Record<string, number> = { security: 3, email: 5, url: 20, phishing: 3 };

// ── disposable-email blocklist (cached in module memory for the isolate) ──
let DISPOSABLE: Set<string> | null = null;
let disposableAt = 0;
async function disposableDomains(): Promise<Set<string>> {
  const FRESH = 12 * 3600 * 1000;
  if (DISPOSABLE && Date.now() - disposableAt < FRESH) return DISPOSABLE;
  try {
    const r = await fetch("https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf", { signal: AbortSignal.timeout(8000) });
    if (r.ok) {
      const text = await r.text();
      DISPOSABLE = new Set(text.split(/\r?\n/).map((l) => l.trim().toLowerCase()).filter(Boolean));
      disposableAt = Date.now();
    }
  } catch { /* keep stale / empty */ }
  return DISPOSABLE ?? new Set();
}

// ── rolling-24h per-bucket quota on profiles.usage_buckets ────────────────
async function enforceBucket(svc: ReturnType<typeof createClient>, userId: string | null, bucket: string): Promise<{ blocked: false } | { blocked: true; body: unknown }> {
  if (!userId) return { blocked: false };               // anon: client-gated
  try {
    const { data: prof } = await svc.from("profiles").select("plan, usage_buckets").eq("id", userId).maybeSingle();
    const plan = (prof?.plan as string) ?? "free";
    if (plan !== "free") return { blocked: false };       // paying: fair-use only
    const limit = FREE_DAILY[bucket] ?? 5;
    const buckets = (prof?.usage_buckets as Record<string, { c: number; r: string }>) ?? {};
    const now = Date.now();
    const cur = buckets[bucket];
    const resetMs = cur?.r ? new Date(cur.r).getTime() : 0;
    const overdue = now - resetMs > 24 * 3600 * 1000;
    const used = overdue ? 0 : (cur?.c ?? 0);
    if (used >= limit) {
      return { blocked: true, body: { error: "daily_limit", plan, limit, used, remaining: 0, resetAt: new Date((overdue ? now : resetMs) + 24 * 3600 * 1000).toISOString() } };
    }
    buckets[bucket] = { c: used + 1, r: overdue ? new Date().toISOString() : (cur?.r ?? new Date().toISOString()) };
    await svc.from("profiles").update({ usage_buckets: buckets }).eq("id", userId);
  } catch { /* fail-open: never block on bookkeeping error */ }
  return { blocked: false };
}

async function resolveUser(svc: ReturnType<typeof createClient>, req: Request, url: string, anon: string): Promise<string | null> {
  const authz = req.headers.get("Authorization");
  if (!authz || authz.endsWith(anon)) return null;
  try {
    const u = createClient(url, anon, { global: { headers: { Authorization: authz } } });
    const { data } = await u.auth.getUser();
    return data.user?.id ?? null;
  } catch { return null; }
}

// ── helpers ───────────────────────────────────────────────────────────────
function extractUrls(text: string): string[] {
  const re = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const out = new Set<string>();
  for (const m of text.matchAll(re)) out.add(m[0].replace(/[.,;:)]+$/, ""));
  // Also catch bare domains in href-less text (e.g. "login at paypa1-secure.com").
  const bare = /\b([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi;
  for (const m of text.matchAll(bare)) {
    const host = m[0].toLowerCase();
    if (!host.endsWith(".js") && !host.includes("@")) out.add("http://" + host);
  }
  return [...out].slice(0, 20);
}

async function safeBrowsing(urls: string[], key: string): Promise<{ url: string; threat: string }[]> {
  if (!key || !urls.length) return [];
  const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client: { clientId: "konvertools", clientVersion: "1.0" },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: urls.map((u) => ({ url: u })),
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) return [];
  const data = await res.json() as { matches?: { threat: { url: string }; threatType: string }[] };
  return (data.matches ?? []).map((m) => ({ url: m.threat.url, threat: m.threatType }));
}

const THREAT_LABEL: Record<string, string> = {
  MALWARE: "Malware", SOCIAL_ENGINEERING: "Phishing / social engineering",
  UNWANTED_SOFTWARE: "Unwanted software", POTENTIALLY_HARMFUL_APPLICATION: "Potentially harmful app",
};

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const supaUrl = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const svc = createClient(supaUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const body = (await req.json().catch(() => ({}))) as { action?: string; email?: string; url?: string; sha256?: string; name?: string; size?: number; text?: string };
  const action = body.action ?? "";
  const userId = await resolveUser(svc, req, supaUrl, anon);

  // ───────────────────────────── validate_email ──────────────────────────
  if (action === "validate_email") {
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email) return json({ error: "bad_request", message: "Missing email." }, { status: 400 });
    const gate = await enforceBucket(svc, userId, "email");
    if (gate.blocked) return json(gate.body, { status: 429 });

    const SYNTAX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const syntaxOk = SYNTAX.test(email);
    const domain = email.split("@")[1] ?? "";
    let domainExists = false, hasMx = false, disposable = false;
    const signals: string[] = [];
    if (syntaxOk) {
      disposable = (await disposableDomains()).has(domain);
      try { const mx = await Deno.resolveDns(domain, "MX"); hasMx = Array.isArray(mx) && mx.length > 0; domainExists = hasMx; } catch { /* no MX */ }
      if (!hasMx) { try { const a = await Deno.resolveDns(domain, "A"); domainExists = Array.isArray(a) && a.length > 0; } catch { /* no A */ } }
    }
    // Score + verdict.
    let score = 0;
    if (syntaxOk) score += 25;
    if (domainExists) score += 25;
    if (hasMx) score += 40;
    if (!disposable && syntaxOk) score += 10;
    let verdict: string;
    if (!syntaxOk) { verdict = "invalid"; signals.push("Invalid email syntax."); }
    else if (!domainExists) { verdict = "no_domain"; signals.push("The domain does not resolve (no DNS record)."); }
    else if (disposable) { verdict = "disposable"; signals.push("Disposable / throwaway email provider."); }
    else if (!hasMx) { verdict = "risky"; signals.push("Domain exists but has no mail (MX) records — likely cannot receive email."); }
    else { verdict = "valid"; signals.push("Valid syntax, domain resolves and accepts mail."); }
    return json({ email, verdict, score: Math.max(0, Math.min(100, score)), checks: { syntax: syntaxOk, domain: domainExists, mx: hasMx, disposable }, signals });
  }

  // ───────────────────────────── scan_url ────────────────────────────────
  if (action === "scan_url") {
    const raw = (body.url ?? "").trim();
    if (!raw) return json({ error: "bad_request", message: "Missing url." }, { status: 400 });
    let target = raw;
    if (!/^https?:\/\//i.test(target)) target = "http://" + target;
    try { new URL(target); } catch { return json({ error: "bad_request", message: "Invalid URL." }, { status: 400 }); }
    const gate = await enforceBucket(svc, userId, "url");
    if (gate.blocked) return json(gate.body, { status: 429 });

    const sbKey = Deno.env.get("GOOGLE_SAFE_BROWSING_KEY");
    if (!sbKey) return json({ error: "service_unavailable", message: "URL scanning is temporarily unavailable." }, { status: 503 });
    const matches = await safeBrowsing([target], sbKey);
    const threats = matches.map((m) => THREAT_LABEL[m.threat] ?? m.threat);
    const verdict = threats.length ? "dangerous" : "safe";
    return json({ url: target, verdict, threats, source: "Google Safe Browsing" });
  }

  // ───────────────────────────── scan_file (by hash) ─────────────────────
  if (action === "scan_file") {
    const sha = (body.sha256 ?? "").trim().toLowerCase();
    if (!/^[a-f0-9]{64}$/.test(sha)) return json({ error: "bad_request", message: "Provide a valid SHA-256 hash." }, { status: 400 });
    const gate = await enforceBucket(svc, userId, "security");
    if (gate.blocked) return json(gate.body, { status: 429 });

    const vtKey = Deno.env.get("VIRUSTOTAL_API_KEY");
    if (!vtKey) return json({ error: "service_unavailable", message: "File scanning is temporarily unavailable." }, { status: 503 });
    const res = await fetch(`https://www.virustotal.com/api/v3/files/${sha}`, { headers: { "x-apikey": vtKey }, signal: AbortSignal.timeout(15_000) });
    if (res.status === 404) {
      return json({ sha256: sha, verdict: "unknown", message: "This file is not yet in VirusTotal's database — no antivirus engine has analysed it.", stats: null });
    }
    if (!res.ok) return json({ error: "scan_failed", message: "VirusTotal did not respond. Try again shortly." }, { status: 502 });
    const data = await res.json() as { data?: { attributes?: { last_analysis_stats?: Record<string, number>; last_analysis_results?: Record<string, { category: string; result: string | null; engine_name: string }>; meaningful_name?: string } } };
    const stats = data.data?.attributes?.last_analysis_stats ?? {};
    const malicious = stats.malicious ?? 0;
    const suspicious = stats.suspicious ?? 0;
    const total = Object.values(stats).reduce((a, b) => a + (b ?? 0), 0);
    const results = data.data?.attributes?.last_analysis_results ?? {};
    const threats = Object.values(results)
      .filter((r) => r.category === "malicious" || r.category === "suspicious")
      .map((r) => `${r.engine_name}: ${r.result ?? "flagged"}`)
      .slice(0, 12);
    const verdict = malicious > 0 ? "dangerous" : suspicious > 0 ? "suspicious" : "clean";
    return json({ sha256: sha, verdict, malicious, suspicious, total, threats, source: "VirusTotal" });
  }

  // ───────────────────────────── analyze_phishing ────────────────────────
  if (action === "analyze_phishing") {
    const text = (body.text ?? "").trim();
    if (!text) return json({ error: "bad_request", message: "Paste the email content." }, { status: 400 });
    if (text.length > 40_000) return json({ error: "text_too_long" }, { status: 413 });
    const gate = await enforceBucket(svc, userId, "phishing");
    if (gate.blocked) return json(gate.body, { status: 429 });

    const mistralKey = Deno.env.get("MISTRAL_API_KEY");
    if (!mistralKey) return json({ error: "service_unavailable" }, { status: 503 });

    // URL reputation in parallel with the LLM analysis.
    const urls = extractUrls(text);
    const sbKey = Deno.env.get("GOOGLE_SAFE_BROWSING_KEY") ?? "";
    const sbPromise = safeBrowsing(urls, sbKey).catch(() => []);

    const system = `You are a phishing / scam email detector. Analyse the user's email content for fraud signals: urgency or threatening language, requests for personal/banking/login details, brand impersonation, unrealistic promises (lottery, inheritance), mismatched or suspicious links, generic greetings, and tell-tale grammar. Return ONLY a JSON object: {"score": <0-100 integer, higher = more likely a scam>, "verdict": "safe"|"suspicious"|"dangerous", "signals": [<short string>, ...3-8 items], "impersonates": <string brand/entity or null>}. Use "safe" for <30, "suspicious" for 30-64, "dangerous" for >=65.`;
    let llm: { score: number; verdict: string; signals: string[]; impersonates: string | null } | null = null;
    try {
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "mistral-small-latest", response_format: { type: "json_object" }, temperature: 0.2, messages: [{ role: "system", content: system }, { role: "user", content: text.slice(0, 12_000) }] }),
        signal: AbortSignal.timeout(30_000),
      });
      if (res.ok) {
        const d = await res.json() as { choices: { message: { content: string } }[] };
        llm = JSON.parse(d.choices?.[0]?.message?.content ?? "{}");
      }
    } catch { /* fall through to URL-only */ }

    const sbMatches = await sbPromise;
    const badUrls = sbMatches.map((m) => ({ url: m.url, threat: THREAT_LABEL[m.threat] ?? m.threat }));

    let score = llm && typeof llm.score === "number" ? Math.max(0, Math.min(100, Math.round(llm.score))) : 0;
    const signals = llm && Array.isArray(llm.signals) ? llm.signals.slice(0, 8) : [];
    if (badUrls.length) { score = Math.max(score, 85); signals.unshift(`Contains a link flagged as ${badUrls[0].threat} by Google Safe Browsing.`); }
    const verdict = score >= 65 ? "dangerous" : score >= 30 ? "suspicious" : "safe";
    return json({ score, verdict, signals, impersonates: llm?.impersonates ?? null, badUrls, urlsChecked: urls.length });
  }

  return json({ error: "unknown_action", message: `Unknown action: ${action || "(none)"}.` }, { status: 400 });
});
