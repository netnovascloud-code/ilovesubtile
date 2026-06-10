// Konvertools — link creation backend (URL shortener, deep/smart link, magic link).
// POST JSON: { kind, target_url, ios_url?, android_url?, code?, expires_in_days?, max_clicks? }
//   kind=short  → plain short URL
//   kind=deep   → smart/deep link (target_url = web fallback, ios_url / android_url optional)
//   kind=magic  → single-use / expiring link (max_clicks and/or expires_in_days)
//
// Auth: SIGNED-IN ONLY. Anonymous callers get 401 — link creation is gated to
// accounts so we can attribute, rate-limit and revoke. The user_id comes from
// the verified JWT, never from the body.
//
// Anti-phishing: every destination URL is screened with Google Safe Browsing v4
// before a link is created. A flagged URL is refused (422) so we never shorten
// a malware / phishing destination.
//
// Secrets: GOOGLE_SAFE_BROWSING_KEY, SUPABASE_URL, SUPABASE_ANON_KEY,
//          SUPABASE_SERVICE_ROLE_KEY, optional LINK_BASE_URL (defaults to
//          https://konvertools.com).
// Deploy: supabase functions deploy create-link --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

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

// Resolve the signed-in user from the bearer JWT. Returns null for anon (the
// bearer equals the anon key) or an invalid token.
async function resolveUser(url: string, anon: string, req: Request): Promise<string | null> {
  const authz = req.headers.get("Authorization");
  if (!authz || authz.endsWith(anon)) return null;
  try {
    const u = createClient(url, anon, { global: { headers: { Authorization: authz } } });
    const { data } = await u.auth.getUser();
    return data.user?.id ?? null;
  } catch { return null; }
}

// Google Safe Browsing API v4 (threatMatches:find) — free, commercial-safe.
async function safeBrowsing(urls: string[], key: string): Promise<{ url: string; threat: string }[]> {
  if (!key || !urls.length) return [];
  try {
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
  } catch { return []; }
}

const THREAT_LABEL: Record<string, string> = {
  MALWARE: "Malware", SOCIAL_ENGINEERING: "Phishing / social engineering",
  UNWANTED_SOFTWARE: "Unwanted software", POTENTIALLY_HARMFUL_APPLICATION: "Potentially harmful app",
};

// Only public http(s) URLs are allowed as destinations.
function normalizeUrl(raw: string): string | null {
  const s = (raw ?? "").trim();
  if (!s) return null;
  let u: URL;
  try { u = new URL(s); } catch { return null; }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  const host = u.hostname.toLowerCase();
  // Refuse loopback / private / non-routable hosts.
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return null;
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) {
    const [a, b] = host.split(".").map(Number);
    if (a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return null;
  }
  return u.toString();
}

// URL-safe random code (no ambiguous chars).
const ALPHABET = "abcdefghijkmnopqrstuvwxyz23456789";
function randomCode(len = 7): string {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const supaUrl = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const baseUrl = (Deno.env.get("LINK_BASE_URL") ?? "https://konvertools.com").replace(/\/+$/, "");

  // ── auth: signed-in only ──────────────────────────────────────────────
  const userId = await resolveUser(supaUrl, anon, req);
  if (!userId) return json({ error: "auth_required", message: "Sign in to create links." }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    kind?: string; target_url?: string; ios_url?: string; android_url?: string;
    code?: string; expires_in_days?: number; max_clicks?: number;
  };

  const kind = body.kind === "deep" || body.kind === "magic" ? body.kind : "short";

  // ── validate destination URL(s) ───────────────────────────────────────
  const target = normalizeUrl(body.target_url ?? "");
  if (!target) return json({ error: "bad_url", message: "Enter a valid http(s) URL." }, { status: 400 });

  const ios = body.ios_url ? normalizeUrl(body.ios_url) : null;
  const android = body.android_url ? normalizeUrl(body.android_url) : null;
  if (body.ios_url && !ios) return json({ error: "bad_url", message: "iOS URL is invalid." }, { status: 400 });
  if (body.android_url && !android) return json({ error: "bad_url", message: "Android URL is invalid." }, { status: 400 });

  // ── anti-phishing: Safe Browsing screen on all destinations ───────────
  const sbKey = Deno.env.get("GOOGLE_SAFE_BROWSING_KEY") ?? "";
  const toScan = [target, ios, android].filter((u): u is string => !!u);
  const hits = await safeBrowsing(toScan, sbKey);
  if (hits.length) {
    return json({
      error: "unsafe_url",
      message: `This destination was flagged as unsafe (${THREAT_LABEL[hits[0].threat] ?? hits[0].threat}) and can't be shortened.`,
      threats: hits,
    }, { status: 422 });
  }

  // ── optional custom code ──────────────────────────────────────────────
  let code = (body.code ?? "").trim().toLowerCase();
  if (code) {
    if (!/^[a-z0-9_-]{3,32}$/.test(code)) {
      return json({ error: "bad_code", message: "Custom alias must be 3–32 chars: letters, numbers, - or _." }, { status: 400 });
    }
  }

  // ── magic-link constraints ────────────────────────────────────────────
  let expiresAt: string | null = null;
  let maxClicks: number | null = null;
  if (kind === "magic") {
    const days = Number(body.expires_in_days);
    if (Number.isFinite(days) && days > 0) {
      expiresAt = new Date(Date.now() + Math.min(days, 365) * 86_400_000).toISOString();
    }
    const mc = Number(body.max_clicks);
    if (Number.isFinite(mc) && mc > 0) maxClicks = Math.min(Math.floor(mc), 1_000_000);
    // A magic link with no limits is just a short link — default to single-use.
    if (!expiresAt && !maxClicks) maxClicks = 1;
  }

  const svc = createClient(supaUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Insert, retrying on code collision (random) or rejecting (custom alias taken).
  for (let attempt = 0; attempt < 5; attempt++) {
    const finalCode = code || randomCode();
    const { data, error } = await svc.from("links").insert({
      user_id: userId,
      code: finalCode,
      kind,
      target_url: target,
      ios_url: ios,
      android_url: android,
      expires_at: expiresAt,
      max_clicks: maxClicks,
    }).select("code").single();

    if (!error && data) {
      return json({
        code: data.code,
        url: `${baseUrl}/s/${data.code}`,
        kind,
        expires_at: expiresAt,
        max_clicks: maxClicks,
      });
    }
    // 23505 = unique_violation on `code`.
    const isDup = (error as { code?: string } | null)?.code === "23505";
    if (isDup && code) {
      return json({ error: "code_taken", message: "That custom alias is already taken." }, { status: 409 });
    }
    if (!isDup) {
      return json({ error: "insert_failed", message: error?.message ?? "Could not create link." }, { status: 500 });
    }
    // random collision → loop and try a new code
  }

  return json({ error: "insert_failed", message: "Could not allocate a unique code, try again." }, { status: 500 });
});
