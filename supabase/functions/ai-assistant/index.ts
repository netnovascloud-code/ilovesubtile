// Konvertools — natural-language assistant. POST JSON: { text }
// where `text` is the user's goal followed by a catalogue of available tools
// ("slug — name — description", one per line). Returns { steps: [{ slug, why }] }
// — 1-3 catalogue tools that accomplish the goal, in execution order. The model
// only routes; the actual conversion runs in the matched tool (browser or
// server) under its own plan caps.
//
// Auth: optional user JWT. Free signed-in users share the per-day AI cap; anon
// is IP-rate-limited. Self-contained (no shared imports) so it deploys cleanly.
// Deploy: supabase functions deploy ai-assistant
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

// Quota mirrors ai-process: free = rolling 24h, Pro/Business = monthly (UTC).
const DAILY_LIMIT: Record<string, number> = { free: 5, pro: 0, business: 0 };
const MONTHLY_LIMIT: Record<string, number> = { free: 0, pro: 500, business: 3000 };
function utcMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

const SYSTEM = `You are the assistant for "Konvertools", a website of file, format, image, video, audio, document, text and developer tools. The user's message has two parts: their GOAL (a sentence describing what they want to do) and a CATALOGUE of available tools, one per line formatted "slug — name — description". Choose the 1 to 3 catalogue tools that best accomplish the goal, in the order the user should use them (for a multi-step goal list each step in order). Return ONLY a JSON object {"steps":[{"slug":"<exact slug copied from the catalogue>","why":"<one short sentence, written in the SAME language as the goal>"}]}. Use ONLY slugs that appear verbatim in the catalogue — never invent one. If nothing in the catalogue fits, return {"steps":[]}.`;

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const mistralKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralKey) return json({ error: "missing_mistral_key" }, { status: 500 });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const svc = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const body = (await req.json().catch(() => ({}))) as { text?: string };
  const text = (body.text ?? "").trim();
  if (!text) return json({ error: "bad_request" }, { status: 400 });
  if (text.length > 40_000) return json({ error: "text_too_long" }, { status: 413 });

  // Resolve caller (optional) and enforce the per-plan AI cap.
  let userId: string | null = null;
  const authz = req.headers.get("Authorization");
  if (authz && !authz.endsWith(anon)) {
    try {
      const u = createClient(url, anon, { global: { headers: { Authorization: authz } } });
      const { data } = await u.auth.getUser();
      userId = data.user?.id ?? null;
    } catch { /* anon */ }
  }

  // No anonymous AI: the assistant requires a signed-in user.
  if (!userId) return json({ error: "auth_required", message: "Sign in to use the AI tools." }, { status: 401 });

  // Restores the pre-charged slot if the model call fails. Best-effort, fail-open.
  let refundQuota: () => Promise<void> = async () => {};
  if (userId) {
    try {
      const { data: prof } = await svc.from("profiles")
        .select("plan, daily_usage, usage_reset_at, monthly_ai_usage, monthly_ai_month")
        .eq("id", userId).maybeSingle();
      const plan = (prof?.plan as string) ?? "free";
      if (plan === "free") {
        const limit = DAILY_LIMIT.free;
        const now = Date.now();
        const resetAt = prof?.usage_reset_at ? new Date(prof.usage_reset_at).getTime() : 0;
        const overdue = now - resetAt > 24 * 3600 * 1000;
        const current = overdue ? 0 : (prof?.daily_usage ?? 0);
        if (current >= limit) {
          return json({ error: "daily_limit", plan, limit, used: current, remaining: 0, resetAt: new Date((overdue ? now : resetAt) + 24 * 3600 * 1000).toISOString() }, { status: 429 });
        }
        await svc.from("profiles").update({
          daily_usage: current + 1,
          usage_reset_at: overdue ? new Date().toISOString() : (prof?.usage_reset_at ?? new Date().toISOString()),
        }).eq("id", userId);
        refundQuota = async () => {
          try {
            const { data: p } = await svc.from("profiles").select("daily_usage").eq("id", userId!).maybeSingle();
            await svc.from("profiles").update({ daily_usage: Math.max(0, (p?.daily_usage ?? 1) - 1) }).eq("id", userId!);
          } catch { /* best-effort */ }
        };
      } else {
        const limit = MONTHLY_LIMIT[plan] ?? MONTHLY_LIMIT.pro;
        const month = utcMonth();
        const used = prof?.monthly_ai_month === month ? (prof?.monthly_ai_usage ?? 0) : 0;
        if (used >= limit) {
          const next = new Date();
          next.setUTCDate(1); next.setUTCHours(0, 0, 0, 0); next.setUTCMonth(next.getUTCMonth() + 1);
          return json({ error: "monthly_limit", plan, limit, used, remaining: 0, resetAt: next.toISOString() }, { status: 429 });
        }
        await svc.from("profiles").update({ monthly_ai_usage: used + 1, monthly_ai_month: month }).eq("id", userId);
        refundQuota = async () => {
          try {
            const { data: p } = await svc.from("profiles").select("monthly_ai_usage").eq("id", userId!).maybeSingle();
            await svc.from("profiles").update({ monthly_ai_usage: Math.max(0, (p?.monthly_ai_usage ?? 1) - 1) }).eq("id", userId!);
          } catch { /* best-effort */ }
        };
      }
    } catch { /* fail-open */ }
  } else {
    try {
      const xff = req.headers.get("x-forwarded-for") ?? "";
      const ip = xff.split(",")[0].trim() || req.headers.get("x-real-ip") || "";
      const { data: rl } = await svc.rpc("ip_rate_hit", { p_ip: ip, p_bucket: "ai-assistant", p_limit: 120, p_window_secs: 3600 });
      const row = Array.isArray(rl) ? rl[0] : rl;
      if (row && row.allowed === false) {
        const retry = Number(row.retry_after ?? 3600);
        return json({ error: "rate_limited", message: `Too many requests from your network. Sign in for higher limits, or retry in ${retry}s.`, retry_after: retry }, { status: 429, headers: { "Retry-After": String(retry) } });
      }
    } catch { /* fail-open */ }
  }

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: "system", content: SYSTEM }, { role: "user", content: text }],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  });
  if (!res.ok) { await refundQuota(); return json({ error: "processing_failed", message: await res.text() }, { status: 502 }); }

  let steps: { slug: string; why: string }[] = [];
  try {
    const data = (await res.json()) as { choices: { message: { content: string } }[] };
    const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}") as { steps?: { slug: string; why: string }[] };
    steps = Array.isArray(parsed.steps) ? parsed.steps.slice(0, 3) : [];
  } catch {
    await refundQuota();
    return json({ error: "processing_failed", message: "Malformed model response." }, { status: 502 });
  }

  return json({ steps });
});
