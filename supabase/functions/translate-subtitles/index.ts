// Translate an SRT/VTT file with DeepL.
// POST a multipart upload with `file` and form fields target_lang, source_lang?
//
// Deploy: supabase functions deploy translate-subtitles
// Secrets: supabase secrets set DEEPL_API_KEY=...

import { corsHeaders, handleOptions, json } from "../_shared/cors.ts";
import { getCaller, getServiceClient } from "../_shared/auth.ts";

// Reuse a tiny SRT parser/emitter in Deno land — we cannot import from npm here.
type Cue = { start: string; end: string; lines: string[] };
function parseSrt(raw: string): Cue[] {
  const blocks = raw.replace(/\r\n?/g, "\n").trim().split(/\n\n+/);
  const cues: Cue[] = [];
  for (const block of blocks) {
    const lines = block.split("\n");
    const timing = lines.find((l) => l.includes("-->"));
    if (!timing) continue;
    const [start, end] = timing.split("-->").map((s) => s.trim().split(/\s+/)[0]);
    const after = lines.slice(lines.indexOf(timing) + 1);
    cues.push({ start, end, lines: after });
  }
  return cues;
}
function toSrt(cues: Cue[]): string {
  return cues.map((c, i) => `${i + 1}\n${c.start} --> ${c.end}\n${c.lines.join("\n")}`).join("\n\n") + "\n";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const deeplKey = Deno.env.get("DEEPL_API_KEY");
  if (!deeplKey) return json({ error: "missing_deepl_key" }, { status: 500 });

  const caller = await getCaller(req);
  const supabase = getServiceClient();

  const form = await req.formData();
  const file = form.get("file");
  const targetLang = String(form.get("target_lang") ?? "EN").toUpperCase();
  const sourceLang = form.get("source_lang") ? String(form.get("source_lang")).toUpperCase() : undefined;
  if (!(file instanceof File)) return json({ error: "no_file" }, { status: 400 });

  const raw = await file.text();
  const cues = parseSrt(raw);
  if (!cues.length) return json({ error: "empty_subtitle" }, { status: 400 });

  // DeepL accepts batched text. Send each cue's joined lines as a separate `text`.
  const params = new URLSearchParams();
  params.set("target_lang", targetLang);
  if (sourceLang) params.set("source_lang", sourceLang);
  for (const c of cues) params.append("text", c.lines.join("\n"));

  const deepl = await fetch("https://api.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!deepl.ok) {
    const message = await deepl.text();
    return json({ error: "deepl_failed", message }, { status: 502 });
  }

  const data = (await deepl.json()) as { translations: { text: string }[] };
  const translated = cues.map((c, i) => ({
    ...c,
    lines: (data.translations[i]?.text ?? c.lines.join("\n")).split("\n"),
  }));
  const srt = toSrt(translated);

  const filename = `${(file.name ?? "translated").replace(/\.[^.]+$/, "")}.${targetLang.toLowerCase()}.srt`;
  const folder = caller?.id ?? "anonymous";
  const path = `${folder}/${crypto.randomUUID()}/${filename}`;

  await supabase.storage
    .from("results")
    .upload(path, new Blob([srt], { type: "application/x-subrip" }), {
      contentType: "application/x-subrip",
    });

  const { data: signed } = await supabase.storage.from("results").createSignedUrl(path, 3600);

  if (caller) {
    await supabase.from("jobs").insert({
      user_id: caller.id,
      tool: "translate-subtitles",
      status: "done",
      output_file_url: signed?.signedUrl ?? null,
      language_target: targetLang,
      completed_at: new Date().toISOString(),
    });
  }

  return json({ url: signed?.signedUrl, filename }, { headers: corsHeaders });
});
