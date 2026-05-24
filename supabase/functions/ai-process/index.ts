// Mistral-powered text tasks: YouTube chapters, AI cleanup, summarisation.
// POST JSON: { task: "chapters" | "clean" | "summary", text: string }
//
// Deploy: supabase functions deploy ai-process
// Secrets: supabase secrets set MISTRAL_API_KEY=...

import { corsHeaders, handleOptions, json } from "../_shared/cors.ts";
import { getCaller, getServiceClient } from "../_shared/auth.ts";

const SYSTEM_PROMPTS = {
  chapters: `You generate YouTube chapter markers from a transcript with timestamps.
Return up to 10 chapters as plain text, one per line, formatted "HH:MM:SS Chapter title".
The first chapter must start at 00:00:00.`,
  clean: `You receive subtitle text. Fix obvious transcription errors, normalise punctuation, and remove [music] / (sigh) style annotations. Preserve every line break.`,
  summary: `You receive a transcript. Return a 4-bullet summary in plain markdown.`,
} as const;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const mistralKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralKey) return json({ error: "missing_mistral_key" }, { status: 500 });

  const caller = await getCaller(req);
  const supabase = getServiceClient();

  const body = (await req.json()) as { task?: keyof typeof SYSTEM_PROMPTS; text?: string };
  if (!body.task || !(body.task in SYSTEM_PROMPTS) || !body.text) {
    return json({ error: "bad_request" }, { status: 400 });
  }

  // Pick the right model: complex tasks → large, simple → small.
  const model = body.task === "clean" ? "mistral-small-latest" : "mistral-large-latest";

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mistralKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS[body.task] },
        { role: "user", content: body.text },
      ],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    return json({ error: "mistral_failed", message }, { status: 502 });
  }

  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  const output = data.choices?.[0]?.message?.content?.trim() ?? "";

  if (caller) {
    await supabase.from("jobs").insert({
      user_id: caller.id,
      tool: body.task === "chapters" ? "youtube-chapters" : "ai-process",
      status: "done",
      metadata: { task: body.task },
      completed_at: new Date().toISOString(),
    });
  }

  return json({ output }, { headers: corsHeaders });
});
