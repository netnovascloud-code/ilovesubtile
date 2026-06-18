// Konvertools — audio/video → SRT via Mistral.
//
// Deploy: supabase functions deploy process-subtitles
// Secret:  supabase secrets set MISTRAL_API_KEY=...
//
// All AI calls go through api.mistral.ai with a single MISTRAL_API_KEY.
// Audio transcription uses Voxtral (Mistral's audio model) on the
// /audio/transcriptions endpoint. Text tasks elsewhere use mistral-large
// and mistral-small via /chat/completions.

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
async function getCaller(req: Request) {
  const auth = req.headers.get("Authorization");
  if (!auth) return null;
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anon) return null;
  const c = createClient(url, anon, { global: { headers: { Authorization: auth } } });
  const { data } = await c.auth.getUser();
  return data.user;
}
function getServiceClient() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
}

// Server-side AI quota, mirroring ai-process / ai-vision. Free = rolling 24h on
// profiles.daily_usage; Pro/Business = monthly (UTC). Without this a direct
// authenticated POST bypasses the client-side cap and can drive unbounded paid
// transcription cost. Fail-open on any DB error so a counter glitch never
// blocks a real (paying) user.
const QUOTA_DAILY: Record<string, number> = { free: 3 };
const QUOTA_MONTHLY: Record<string, number> = { pro: 500, business: 3000 };
async function enforceAiQuota(
  svc: ReturnType<typeof getServiceClient>,
  userId: string,
): Promise<{ ok: true; refund: () => Promise<void> } | { ok: false; status: number; body: Record<string, unknown> }> {
  try {
    const { data: prof } = await svc.from("profiles")
      .select("plan, daily_usage, usage_reset_at, monthly_ai_usage, monthly_ai_month")
      .eq("id", userId).maybeSingle();
    const plan = (prof?.plan as string) ?? "free";
    // Restores the slot we're about to charge if the transcription later fails.
    let refund: () => Promise<void> = async () => {};
    if (plan === "free") {
      const limit = QUOTA_DAILY.free;
      const now = Date.now();
      const resetAt = prof?.usage_reset_at ? new Date(prof.usage_reset_at).getTime() : 0;
      const overdue = now - resetAt > 24 * 3600 * 1000;
      const current = overdue ? 0 : (prof?.daily_usage ?? 0);
      if (current >= limit) {
        return { ok: false, status: 429, body: { error: "daily_limit", plan, limit, used: current, remaining: 0, resetAt: new Date((overdue ? now : resetAt) + 24 * 3600 * 1000).toISOString() } };
      }
      await svc.from("profiles").update({
        daily_usage: current + 1,
        usage_reset_at: overdue ? new Date().toISOString() : (prof?.usage_reset_at ?? new Date().toISOString()),
      }).eq("id", userId);
      refund = async () => {
        try {
          const { data: p } = await svc.from("profiles").select("daily_usage").eq("id", userId).maybeSingle();
          await svc.from("profiles").update({ daily_usage: Math.max(0, (p?.daily_usage ?? 1) - 1) }).eq("id", userId);
        } catch { /* best-effort */ }
      };
    } else {
      const limit = QUOTA_MONTHLY[plan] ?? QUOTA_MONTHLY.pro;
      const d = new Date();
      const month = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      const used = prof?.monthly_ai_month === month ? (prof?.monthly_ai_usage ?? 0) : 0;
      if (used >= limit) {
        const next = new Date();
        next.setUTCDate(1); next.setUTCHours(0, 0, 0, 0); next.setUTCMonth(next.getUTCMonth() + 1);
        return { ok: false, status: 429, body: { error: "monthly_limit", plan, limit, used, remaining: 0, resetAt: next.toISOString() } };
      }
      await svc.from("profiles").update({ monthly_ai_usage: used + 1, monthly_ai_month: month }).eq("id", userId);
      refund = async () => {
        try {
          const { data: p } = await svc.from("profiles").select("monthly_ai_usage").eq("id", userId).maybeSingle();
          await svc.from("profiles").update({ monthly_ai_usage: Math.max(0, (p?.monthly_ai_usage ?? 1) - 1) }).eq("id", userId);
        } catch { /* best-effort */ }
      };
    }
    return { ok: true, refund };
  } catch {
    return { ok: true, refund: async () => {} }; // fail-open — never block on a counter glitch
  }
}

type Segment = { start: number; end: number; text: string };

function srtFromSegments(segments: Segment[]): string {
  const pad = (n: number, w = 2) => String(Math.max(0, n)).padStart(w, "0");
  const fmt = (sec: number) => {
    const total = Math.max(0, sec);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = Math.floor(total % 60);
    const ms = Math.round((total - Math.floor(total)) * 1000);
    return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
  };
  return segments
    .map((s, i) => `${i + 1}\n${fmt(s.start)} --> ${fmt(s.end)}\n${s.text.trim()}`)
    .join("\n\n") + "\n";
}

// Fallback when Voxtral returns plain text without per-segment timestamps:
// chunk by sentence at ~15 chars/sec so the SRT is still useful for review.
function segmentsFromPlainText(text: string): Segment[] {
  const sentences = text.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/);
  const out: Segment[] = [];
  let cursor = 0;
  for (const s of sentences) {
    const duration = Math.max(1.5, s.length / 15);
    out.push({ start: cursor, end: cursor + duration, text: s });
    cursor += duration;
  }
  return out;
}

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const handleOptions = () => new Response("ok", { headers: cors });
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const mistralKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralKey) return json({ error: "missing_mistral_key" }, { status: 500 });

  // Reject anonymous callers BEFORE any expensive work. process-subtitles
  // requires a signed-in user (results live under a UID-namespaced storage
  // folder). Checking here — rather than after the Voxtral transcription —
  // also stops anonymous holders of the public anon key from burning paid
  // Mistral transcription cost only to receive a 401 at the end.
  const caller = await getCaller(req);
  if (!caller) return json({ error: "unauthorized" }, { status: 401 });
  const supabase = getServiceClient();

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "no_file" }, { status: 400 });
  // Size cap: 500 MB hard ceiling (Pro/Business). Free callers are gated by
  // the daily-quota check at the api-gateway / client level.
  if (file.size > 500 * 1024 * 1024) return json({ error: "file_too_large", message: "Files are capped at 500 MB." }, { status: 413 });
  const ftype = (file.type || "").toLowerCase();
  if (ftype && !ftype.startsWith("audio/") && !ftype.startsWith("video/") && ftype !== "application/octet-stream") {
    return json({ error: "bad_mime", message: `Unsupported content type: ${ftype}. Send an audio or video file.` }, { status: 415 });
  }
  const fname = (file.name || "").toLowerCase();
  const bad = [".exe", ".dll", ".bat", ".cmd", ".sh", ".ps1", ".dmg", ".msi", ".scr", ".com", ".vbs", ".js", ".jar"];
  if (bad.some((ext) => fname.endsWith(ext))) return json({ error: "bad_request", message: "Executable file types are not accepted." }, { status: 400 });

  // Enforce the AI quota server-side BEFORE the expensive Voxtral call.
  const quota = await enforceAiQuota(supabase, caller.id);
  if (!quota.ok) return json(quota.body, { status: quota.status });

  const voxtralForm = new FormData();
  voxtralForm.append("file", file);
  voxtralForm.append("model", "voxtral-mini-latest");
  voxtralForm.append("response_format", "verbose_json");
  voxtralForm.append("timestamp_granularities[]", "segment");

  const res = await fetch("https://api.mistral.ai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${mistralKey}` },
    body: voxtralForm,
  });
  if (!res.ok) { await quota.refund(); return json({ error: "mistral_failed", message: await res.text() }, { status: 502 }); }

  const verbose = await res.json() as { text?: string; language?: string; segments?: Segment[] };

  const segments: Segment[] = Array.isArray(verbose.segments) && verbose.segments.length
    ? verbose.segments
    : segmentsFromPlainText(verbose.text ?? "");

  if (!segments.length) { await quota.refund(); return json({ error: "empty_transcription" }, { status: 502 }); }

  const srt = srtFromSegments(segments);

  // Sanitize the source filename: strip everything but [a-z0-9._-], drop
  // leading dots, and cap length. This prevents storage-key injection like
  // `../../<victim-uuid>/file.srt` even if the storage backend ever decided
  // to normalize segments — the path is built from controlled parts only.
  const rawBase = (file.name ?? "subtitles").replace(/\.[^.]+$/, "");
  const safeBase = rawBase
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 64) || "subtitles";
  const filename = `${safeBase}.srt`;
  const path = `${caller.id}/${crypto.randomUUID()}/${filename}`;

  const { error: uploadError } = await supabase.storage.from("results")
    .upload(path, new Blob([srt], { type: "application/x-subrip" }), { contentType: "application/x-subrip" });
  if (uploadError) { await quota.refund(); return json({ error: "storage_failed", message: uploadError.message }, { status: 500 }); }

  const { data: signed } = await supabase.storage.from("results").createSignedUrl(path, 3600);

  await supabase.from("jobs").insert({
    user_id: caller.id,
    tool: "subtitle-generator",
    status: "done",
    output_file_url: signed?.signedUrl ?? null,
    language_source: verbose?.language ?? null,
    completed_at: new Date().toISOString(),
  });

  return json({ url: signed?.signedUrl, filename });
});
