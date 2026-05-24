// Whisper-powered subtitle generation.
// POST a multipart upload with `file` (audio/video).
// Optional query: tool=subtitle-generator|tiktok-subtitles
//
// Deploy: supabase functions deploy process-subtitles
// Secrets: supabase secrets set OPENAI_API_KEY=sk-...

import { corsHeaders, handleOptions, json } from "../_shared/cors.ts";
import { getCaller, getServiceClient } from "../_shared/auth.ts";

function srtFromVerboseJson(verbose: {
  segments: { id: number; start: number; end: number; text: string }[];
}) {
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  const fmt = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.round((sec - Math.floor(sec)) * 1000);
    return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
  };
  return verbose.segments
    .map((s, i) => `${i + 1}\n${fmt(s.start)} --> ${fmt(s.end)}\n${s.text.trim()}`)
    .join("\n\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const openai = Deno.env.get("OPENAI_API_KEY");
  if (!openai) return json({ error: "missing_openai_key" }, { status: 500 });

  const caller = await getCaller(req);
  const supabase = getServiceClient();

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "no_file" }, { status: 400 });

  // Hand the file straight to OpenAI's transcription endpoint.
  const whisperForm = new FormData();
  whisperForm.append("file", file);
  whisperForm.append("model", "whisper-1");
  whisperForm.append("response_format", "verbose_json");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${openai}` },
    body: whisperForm,
  });

  if (!res.ok) {
    const message = await res.text();
    return json({ error: "openai_failed", message }, { status: 502 });
  }

  const verbose = await res.json();
  const srt = srtFromVerboseJson(verbose);

  const filename = `${(file.name ?? "subtitles").replace(/\.[^.]+$/, "")}.srt`;
  const folder = caller?.id ?? "anonymous";
  const path = `${folder}/${crypto.randomUUID()}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from("results")
    .upload(path, new Blob([srt], { type: "application/x-subrip" }), {
      contentType: "application/x-subrip",
    });
  if (uploadError) return json({ error: "storage_failed", message: uploadError.message }, { status: 500 });

  const { data: signed } = await supabase.storage.from("results").createSignedUrl(path, 3600);

  if (caller) {
    await supabase.from("jobs").insert({
      user_id: caller.id,
      tool: "subtitle-generator",
      status: "done",
      output_file_url: signed?.signedUrl ?? null,
      language_source: verbose?.language ?? null,
      completed_at: new Date().toISOString(),
    });
  }

  return json({ url: signed?.signedUrl, filename }, { headers: corsHeaders });
});
