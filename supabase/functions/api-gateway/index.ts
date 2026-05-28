// Wyrlo public REST gateway. Authenticated by a Wyrlo API key
// (cf_live_...), NOT a Supabase JWT — hence verify_jwt is disabled and we
// validate the key ourselves. Deducts credits per call and logs a job.
//
//   POST /functions/v1/api-gateway?action=transcribe   (cost 10)
//   POST /functions/v1/api-gateway?action=translate     (cost 5)  form: target_lang
//   Header: Authorization: Bearer cf_live_...
//   Body: multipart 'file', OR JSON { file_url, target_lang? }
//
// Deploy: supabase functions deploy api-gateway --no-verify-jwt
// Secret: MISTRAL_API_KEY
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });
}
async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const COST: Record<string, number> = { transcribe: 10, translate: 5 };

type Segment = { start: number; end: number; text: string };
function srtFromSegments(segs: Segment[]): string {
  const pad = (n: number, w = 2) => String(Math.max(0, n)).padStart(w, "0");
  const fmt = (sec: number) => {
    const t = Math.max(0, sec);
    return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(Math.floor(t % 60))},${pad(Math.round((t - Math.floor(t)) * 1000), 3)}`;
  };
  return segs.map((s, i) => `${i + 1}\n${fmt(s.start)} --> ${fmt(s.end)}\n${s.text.trim()}`).join("\n\n") + "\n";
}
function parseSrt(raw: string) {
  const blocks = raw.replace(/\r\n?/g, "\n").trim().split(/\n\n+/);
  const cues: { start: string; end: string; lines: string[] }[] = [];
  for (const b of blocks) {
    const lines = b.split("\n");
    const timing = lines.find((l) => l.includes("-->"));
    if (!timing) continue;
    const [start, end] = timing.split("-->").map((s) => s.trim().split(/\s+/)[0]);
    cues.push({ start, end, lines: lines.slice(lines.indexOf(timing) + 1) });
  }
  return cues;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const mistralKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralKey) return json({ error: "missing_mistral_key" }, { status: 500 });
  const svc = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // ---- authenticate the Wyrlo API key ----
  const authz = req.headers.get("Authorization") ?? "";
  const raw = authz.replace(/^Bearer\s+/i, "").trim();
  if (!raw.startsWith("cf_")) return json({ error: "missing_api_key" }, { status: 401 });
  const hash = await sha256(raw);
  const { data: keyRow } = await svc.from("api_keys").select("id, user_id, revoked").eq("key_hash", hash).maybeSingle();
  if (!keyRow || keyRow.revoked) return json({ error: "invalid_api_key" }, { status: 401 });
  const userId = keyRow.user_id as string;
  await svc.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", keyRow.id);

  const action = new URL(req.url).searchParams.get("action") ?? "";
  const cost = COST[action];
  if (!cost) return json({ error: "unknown_action" }, { status: 400 });

  // ---- balance check (fail fast; atomic spend happens after success) ----
  const { data: prof } = await svc.from("profiles").select("credits").eq("id", userId).maybeSingle();
  if ((prof?.credits ?? 0) < cost) return json({ error: "insufficient_credits", needed: cost, balance: prof?.credits ?? 0 }, { status: 402 });

  // ---- read input (multipart file OR JSON file_url) ----
  let file: File | null = null;
  let srtText: string | null = null;
  let targetLang = "EN";
  const ctype = req.headers.get("content-type") ?? "";
  if (ctype.includes("application/json")) {
    const b = await req.json();
    targetLang = String(b.target_lang ?? "EN").toUpperCase();
    const fileUrl = b.file_url ?? b.srt_url;
    if (!fileUrl) return json({ error: "missing_file_url" }, { status: 400 });
    const r = await fetch(fileUrl);
    if (!r.ok) return json({ error: "fetch_failed" }, { status: 400 });
    if (action === "translate") srtText = await r.text();
    else file = new File([await r.blob()], "input");
  } else {
    const form = await req.formData();
    targetLang = String(form.get("target_lang") ?? "EN").toUpperCase();
    const f = form.get("file");
    if (!(f instanceof File)) return json({ error: "no_file" }, { status: 400 });
    if (action === "translate") srtText = await f.text();
    else file = f;
  }

  // ---- do the work ----
  let outSrt = "";
  try {
    if (action === "transcribe") {
      const fd = new FormData();
      fd.append("file", file!);
      fd.append("model", "voxtral-mini-latest");
      fd.append("response_format", "verbose_json");
      fd.append("timestamp_granularities[]", "segment");
      const res = await fetch("https://api.mistral.ai/v1/audio/transcriptions", { method: "POST", headers: { Authorization: `Bearer ${mistralKey}` }, body: fd });
      if (!res.ok) return json({ error: "mistral_failed", message: await res.text() }, { status: 502 });
      const v = await res.json() as { text?: string; segments?: Segment[] };
      const segs = Array.isArray(v.segments) && v.segments.length ? v.segments : [{ start: 0, end: 3, text: v.text ?? "" }];
      outSrt = srtFromSegments(segs);
    } else {
      const cues = parseSrt(srtText!);
      if (!cues.length) return json({ error: "empty_subtitle" }, { status: 400 });
      const system = `Translate every input subtitle cue to ${targetLang}. Output the SAME number of cues, in order, preserving line breaks. Return ONLY JSON: {"cues":["..."]}`;
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST", headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "mistral-large-latest", response_format: { type: "json_object" }, temperature: 0.1, messages: [{ role: "system", content: system }, { role: "user", content: JSON.stringify({ cues: cues.map((c) => c.lines.join("\n")) }) }] }),
      });
      if (!res.ok) return json({ error: "mistral_failed", message: await res.text() }, { status: 502 });
      const data = await res.json() as { choices: { message: { content: string } }[] };
      const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}");
      const out: string[] = Array.isArray(parsed.cues) ? parsed.cues.map(String) : [];
      if (out.length !== cues.length) return json({ error: "translation_mismatch" }, { status: 502 });
      outSrt = cues.map((c, i) => `${i + 1}\n${c.start} --> ${c.end}\n${out[i]}`).join("\n\n") + "\n";
    }
  } catch (err) {
    return json({ error: "processing_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }

  // ---- store result + signed url ----
  const path = `${userId}/${crypto.randomUUID()}/result.srt`;
  await svc.storage.from("results").upload(path, new Blob([outSrt], { type: "application/x-subrip" }), { contentType: "application/x-subrip" });
  // GDPR: 10-minute signed URL window. The pg_cron purge sweeps every 5 min.
  // For files we generated and don't need to retain (text output), we also
  // schedule a best-effort delete after a short window via the platform's
  // built-in storage TTL features (see migration). The link works long enough
  // for the user to download but nothing lingers.
  const { data: signed } = await svc.storage.from("results").createSignedUrl(path, 600);

  // ---- charge credits atomically + log job ----
  const { data: newBalance, error: spendErr } = await svc.rpc("spend_credits", { p_user: userId, p_amount: cost, p_reason: `api:${action}` });
  if (spendErr) return json({ error: "insufficient_credits", message: spendErr.message }, { status: 402 });

  const { data: job } = await svc.from("jobs").insert({
    user_id: userId, tool: `api-${action}`, status: "done",
    output_file_url: signed?.signedUrl ?? null, language_target: action === "translate" ? targetLang : null,
    metadata: { via: "api" }, completed_at: new Date().toISOString(),
  }).select("id").maybeSingle();

  return json({ job_id: job?.id ?? null, url: signed?.signedUrl, credits_remaining: newBalance, cost });
});
