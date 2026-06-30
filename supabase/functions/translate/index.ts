// Konvertools — text translation via Google Cloud Translation API v2.
// A dedicated machine-translation engine (DeepL/Google-style), NOT an LLM
// chatbot. POST JSON: { text, target, source? } where target/source are
// ISO-639-1 codes (any case; "auto"/empty source = auto-detect).
// Returns: { output, detected? }.
//
// Login is REQUIRED: this protects the Google API key from anonymous abuse and
// the project-wide free quota (500,000 chars/month). Each signed-in user is
// metered per calendar month by characters translated.
//
// Secret: GOOGLE_TRANSLATE_API_KEY  (Google Cloud → APIs & Services →
// Credentials → API key, with the Cloud Translation API enabled + billing on).
// IMPORTANT: set a hard cap in Google Cloud → IAM & Admin → Quotas so the
// project can never bill beyond the free 500k characters/month.
// Deploy: supabase functions deploy translate --no-verify-jwt
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

// Per-user monthly caps (a sub-allocation of the global budget below), so one
// user can't drain the shared free pool.
const MONTHLY_CHARS: Record<string, number> = { free: 5_000, pro: 50_000, business: 150_000 };
// App-wide monthly budget — 4% under Google's free 500k chars/month. Enforced
// atomically (translate_consume RPC) so total usage across ALL users can never
// exceed the free tier → 0 € guaranteed, with the Google-side quota cap as the
// ultimate backstop.
const GLOBAL_MONTHLY_CHARS = 480_000;
const MAX_CHARS_PER_REQ = 5000;

function utcMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

// Google returns a few HTML entities even with format=text; decode the common ones.
function unescapeHtml(s: string): string {
  return s
    .replace(/&#39;/g, "'").replace(/&#34;/g, '"').replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
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

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const supaUrl = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const svc = createClient(supaUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const body = (await req.json().catch(() => ({}))) as { text?: string; target?: string; source?: string };
  const text = (body.text ?? "").toString();
  if (!text.trim()) return json({ output: "" });
  if (text.length > MAX_CHARS_PER_REQ) return json({ error: "text_too_long", message: `Max ${MAX_CHARS_PER_REQ} characters per translation.` }, { status: 413 });

  const target = (body.target ?? "").toString().toLowerCase().slice(0, 5);
  if (!target) return json({ error: "bad_request", message: "Missing target language." }, { status: 400 });
  const source = body.source && body.source !== "auto" ? String(body.source).toLowerCase().slice(0, 5) : undefined;

  // Login required — protects the key + the shared free quota.
  const userId = await resolveUser(svc, req, supaUrl, anon);
  if (!userId) return json({ error: "auth_required", message: "Sign in to use the translator." }, { status: 401 });

  const key = Deno.env.get("GOOGLE_TRANSLATE_API_KEY");
  if (!key) return json({ error: "not_configured", message: "The translator isn't configured yet." }, { status: 503 });

  // Per-user monthly character metering (fail-open on counter errors).
  const month = utcMonth();
  // Per-user monthly cap (prevents one user draining the shared pool).
  try {
    const { data: prof } = await svc.from("profiles").select("plan, usage_buckets").eq("id", userId).maybeSingle();
    const plan = (prof?.plan as string) ?? "free";
    const cap = MONTHLY_CHARS[plan] ?? MONTHLY_CHARS.free;
    const buckets = ((prof?.usage_buckets as Record<string, { c: number; m: string }>) ?? {});
    const cur = buckets["translate_chars"];
    const used = cur && cur.m === month ? (cur.c ?? 0) : 0;
    if (used + text.length > cap) {
      return json({ error: "monthly_limit", scope: "user", plan, limit: cap, used, message: "You've reached your monthly translation limit." }, { status: 429 });
    }
    buckets["translate_chars"] = { c: used + text.length, m: month };
    await svc.from("profiles").update({ usage_buckets: buckets }).eq("id", userId);
  } catch { /* never block a real translation on a per-user metering glitch */ }

  // App-wide monthly budget — guarantees the whole project never exceeds
  // Google's free tier. Atomic in Postgres so concurrent calls can't overshoot.
  try {
    const { data: ok } = await svc.rpc("translate_consume", { p_chars: text.length, p_cap: GLOBAL_MONTHLY_CHARS, p_month: month });
    if (ok === false) {
      return json({ error: "monthly_limit", scope: "global", message: "The free monthly translation quota has been reached. It resets next month." }, { status: 429 });
    }
  } catch { /* counter unavailable — the Google-side quota cap is the hard backstop */ }

  try {
    const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, target, format: "text", ...(source ? { source } : {}) }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      const t = await res.text();
      return json({ error: "translate_failed", message: t.slice(0, 200) }, { status: 502 });
    }
    const data = await res.json() as { data?: { translations?: { translatedText: string; detectedSourceLanguage?: string }[] } };
    const tr = data.data?.translations?.[0];
    return json({ output: unescapeHtml(tr?.translatedText ?? ""), detected: tr?.detectedSourceLanguage ?? null });
  } catch (e) {
    return json({ error: "translate_failed", message: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
});
