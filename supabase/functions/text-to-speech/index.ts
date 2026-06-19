// Konvertools — text-to-speech via OpenAI. Self-contained (no shared imports).
//
// POST { text, voice } -> audio/mpeg (mp3 bytes) on success; JSON error otherwise.
// Counts ONE AI run per generation (refunded on any failure), enforces a per-plan
// character cap, and chunks the text to OpenAI's per-request limit, concatenating
// the mp3 parts. Sign-in required (premium / cost control).
//
// Secret: OPENAI_API_KEY. When it's unset the function returns {error:"not_configured"}
// (HTTP 503) so the UI can show "coming soon" — the tool ships ready to activate.
// The key stays server-side and never reaches the browser.

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
    "Access-Control-Allow-Origin": allow, "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Quota mirrors lib/ai-quotas.ts — signed-in free = 5/day, Pro/Business monthly.
const DAILY_LIMIT: Record<string, number> = { free: 5, pro: 0, business: 0 };
const MONTHLY_LIMIT: Record<string, number> = { free: 0, pro: 500, business: 3000 };
// Per-plan input character cap (cost control). Free gets a small taste.
const CHAR_CAP: Record<string, number> = { free: 600, pro: 50000, business: 100000 };
function utcMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

const VOICES = new Set(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]);

// Split text into <=maxLen chunks, preferring sentence then word boundaries.
function chunkText(text: string, maxLen = 4000): string[] {
  const out: string[] = [];
  let rest = text.trim();
  while (rest.length > maxLen) {
    let cut = rest.lastIndexOf(". ", maxLen);
    if (cut < maxLen * 0.5) cut = rest.lastIndexOf(" ", maxLen);
    if (cut <= 0) cut = maxLen;
    out.push(rest.slice(0, cut + 1).trim());
    rest = rest.slice(cut + 1);
  }
  if (rest.trim()) out.push(rest.trim());
  return out;
}

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (b: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(b), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiKey) return json({ error: "not_configured" }, { status: 503 });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const svc = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const body = (await req.json().catch(() => ({}))) as { text?: string; voice?: string };
  const text = (body.text ?? "").trim();
  const voice = VOICES.has(body.voice ?? "") ? body.voice! : "alloy";
  if (!text) return json({ error: "bad_request" }, { status: 400 });

  // TTS requires sign-in (premium + cost control).
  let userId: string | null = null;
  const authz = req.headers.get("Authorization");
  if (authz && !authz.endsWith(anon)) {
    try {
      const u = createClient(url, anon, { global: { headers: { Authorization: authz } } });
      const { data } = await u.auth.getUser();
      userId = data.user?.id ?? null;
    } catch { /* anon */ }
  }
  if (!userId) return json({ error: "auth_required" }, { status: 401 });

  const { data: prof } = await svc.from("profiles")
    .select("plan, daily_usage, usage_reset_at, monthly_ai_usage, monthly_ai_month")
    .eq("id", userId).maybeSingle();
  const plan = (prof?.plan as string) ?? "free";
  const cap = CHAR_CAP[plan] ?? CHAR_CAP.free;
  if (text.length > cap) return json({ error: "text_too_long", plan, limit: cap }, { status: 413 });

  // Pre-charge one AI-quota slot; refund it if synthesis fails.
  let refundQuota: () => Promise<void> = async () => {};
  if (plan === "free") {
    const limit = DAILY_LIMIT.free;
    const now = Date.now();
    const resetAt = prof?.usage_reset_at ? new Date(prof.usage_reset_at).getTime() : 0;
    const overdue = now - resetAt > 24 * 3600 * 1000;
    const current = overdue ? 0 : (prof?.daily_usage ?? 0);
    if (current >= limit) {
      return json({ error: "daily_limit", plan, limit, used: current, remaining: 0,
        resetAt: new Date((overdue ? now : resetAt) + 24 * 3600 * 1000).toISOString() }, { status: 429 });
    }
    await svc.from("profiles").update({
      daily_usage: current + 1,
      usage_reset_at: overdue ? new Date().toISOString() : (prof?.usage_reset_at ?? new Date().toISOString()),
    }).eq("id", userId);
    refundQuota = async () => { try {
      const { data: p } = await svc.from("profiles").select("daily_usage").eq("id", userId!).maybeSingle();
      await svc.from("profiles").update({ daily_usage: Math.max(0, (p?.daily_usage ?? 1) - 1) }).eq("id", userId!);
    } catch { /* best-effort */ } };
  } else {
    const limit = MONTHLY_LIMIT[plan] ?? MONTHLY_LIMIT.pro;
    const month = utcMonth();
    const sameMonth = prof?.monthly_ai_month === month;
    const used = sameMonth ? (prof?.monthly_ai_usage ?? 0) : 0;
    if (used >= limit) {
      const next = new Date(); next.setUTCDate(1); next.setUTCHours(0, 0, 0, 0); next.setUTCMonth(next.getUTCMonth() + 1);
      return json({ error: "monthly_limit", plan, limit, used, remaining: 0, resetAt: next.toISOString() }, { status: 429 });
    }
    await svc.from("profiles").update({ monthly_ai_usage: used + 1, monthly_ai_month: month }).eq("id", userId);
    refundQuota = async () => { try {
      const { data: p } = await svc.from("profiles").select("monthly_ai_usage").eq("id", userId!).maybeSingle();
      await svc.from("profiles").update({ monthly_ai_usage: Math.max(0, (p?.monthly_ai_usage ?? 1) - 1) }).eq("id", userId!);
    } catch { /* best-effort */ } };
  }

  try {
    const parts = chunkText(text, 4000);
    const buffers: Uint8Array[] = [];
    for (const part of parts) {
      const r = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: { Authorization: `Bearer ${openaiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o-mini-tts", voice, input: part, response_format: "mp3" }),
      });
      if (!r.ok) {
        const detail = await r.text().catch(() => "");
        await refundQuota();
        return json({ error: "tts_failed", status: r.status, detail: detail.slice(0, 300) }, { status: 502 });
      }
      buffers.push(new Uint8Array(await r.arrayBuffer()));
    }
    const total = buffers.reduce((n, b) => n + b.length, 0);
    const out = new Uint8Array(total);
    let off = 0;
    for (const b of buffers) { out.set(b, off); off += b.length; }
    return new Response(out, { headers: { ...cors, "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
  } catch (err) {
    await refundQuota();
    return json({ error: "tts_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }
});
