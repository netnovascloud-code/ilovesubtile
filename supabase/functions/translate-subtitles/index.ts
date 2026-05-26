// Wyrlo — translate SRT/VTT via Mistral chat (JSON mode).
//
// Deploy: supabase functions deploy translate-subtitles
// Secret:  supabase secrets set MISTRAL_API_KEY=...
//
// We send cues in chunks of 60 to keep prompts within sensible token
// budgets. The model returns a JSON object with the translated cues in
// the same order; on a count mismatch we error out cleanly rather than
// silently dropping or duplicating lines.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function handleOptions() { return new Response("ok", { headers: corsHeaders }); }
function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { ...corsHeaders, "Content-Type": "application/json", ...(init.headers ?? {}) } });
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

const LANG_NAMES: Record<string, string> = {
  EN: "English", FR: "French", ES: "Spanish", PT: "Portuguese", DE: "German",
  IT: "Italian", NL: "Dutch", JA: "Japanese", ZH: "Chinese", KO: "Korean",
  AR: "Arabic", RU: "Russian", HI: "Hindi", PL: "Polish", TR: "Turkish",
  SV: "Swedish", NO: "Norwegian", DA: "Danish", FI: "Finnish", CS: "Czech",
  EL: "Greek", HE: "Hebrew", TH: "Thai", VI: "Vietnamese", ID: "Indonesian",
  RO: "Romanian", HU: "Hungarian", UK: "Ukrainian", BG: "Bulgarian",
  HR: "Croatian", SK: "Slovak", SL: "Slovenian", LT: "Lithuanian",
  LV: "Latvian", ET: "Estonian",
};

async function translateChunk(chunk: string[], targetLangName: string, sourceLangName: string | undefined, mistralKey: string): Promise<string[]> {
  const system = `You are a professional subtitle translator.
Translate every input cue from ${sourceLangName ?? "the source language"} to ${targetLangName}.
Rules:
- Output the SAME number of cues as input, in the SAME order.
- Preserve every internal line break inside a cue.
- Do NOT add commentary, notes or explanations.
- Keep proper nouns and brand names untouched.
- Match the cue's tone (casual stays casual).
Return ONLY a valid JSON object: {"cues": ["translated cue 1", "translated cue 2", ...]}`;
  const userPayload = JSON.stringify({ cues: chunk });

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: [{ role: "system", content: system }, { role: "user", content: userPayload }],
      response_format: { type: "json_object" },
      temperature: 0.1,
    }),
  });
  if (!res.ok) throw new Error(`mistral ${res.status}: ${await res.text()}`);

  const data = await res.json() as { choices: { message: { content: string } }[] };
  const content = data.choices?.[0]?.message?.content ?? "{}";
  let parsed: { cues?: unknown };
  try { parsed = JSON.parse(content); } catch { throw new Error("mistral returned invalid JSON"); }
  const out = Array.isArray(parsed.cues) ? parsed.cues.map(String) : [];
  if (out.length !== chunk.length) throw new Error(`expected ${chunk.length} cues, got ${out.length}`);
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const mistralKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralKey) return json({ error: "missing_mistral_key" }, { status: 500 });

  const caller = await getCaller(req);
  const supabase = getServiceClient();

  const form = await req.formData();
  const file = form.get("file");
  const targetLang = String(form.get("target_lang") ?? "EN").toUpperCase();
  const sourceLang = form.get("source_lang") ? String(form.get("source_lang")).toUpperCase() : undefined;
  if (!(file instanceof File)) return json({ error: "no_file" }, { status: 400 });
  const targetLangName = LANG_NAMES[targetLang] ?? targetLang;
  const sourceLangName = sourceLang ? LANG_NAMES[sourceLang] ?? sourceLang : undefined;

  const raw = await file.text();
  const cues = parseSrt(raw);
  if (!cues.length) return json({ error: "empty_subtitle" }, { status: 400 });

  const CHUNK = 60;
  const cueTexts = cues.map((c) => c.lines.join("\n"));
  const translatedAll: string[] = [];
  try {
    for (let i = 0; i < cueTexts.length; i += CHUNK) {
      const chunk = cueTexts.slice(i, i + CHUNK);
      const out = await translateChunk(chunk, targetLangName, sourceLangName, mistralKey);
      translatedAll.push(...out);
    }
  } catch (err) {
    return json({ error: "translation_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }

  const translated = cues.map((c, i) => ({ ...c, lines: translatedAll[i].split("\n") }));
  const srt = toSrt(translated);

  const filename = `${(file.name ?? "translated").replace(/\.[^.]+$/, "")}.${targetLang.toLowerCase()}.srt`;
  const folder = caller?.id ?? "anonymous";
  const path = `${folder}/${crypto.randomUUID()}/${filename}`;

  await supabase.storage.from("results").upload(path, new Blob([srt], { type: "application/x-subrip" }), { contentType: "application/x-subrip" });
  const { data: signed } = await supabase.storage.from("results").createSignedUrl(path, 3600);

  if (caller) {
    await supabase.from("jobs").insert({
      user_id: caller.id, tool: "translate-subtitles", status: "done",
      output_file_url: signed?.signedUrl ?? null, language_target: targetLang,
      completed_at: new Date().toISOString(),
    });
  }
  return json({ url: signed?.signedUrl, filename });
});
