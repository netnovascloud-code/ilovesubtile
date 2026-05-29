// Konver — Mistral-powered text tasks. Self-contained (no shared imports) so it
// deploys cleanly. POST JSON: { task, text, options? }.
//   options: { target?, style?, format? }
// Auth: optional user JWT. Free signed-in users are capped per day; Pro/Business
// and anonymous (client-gated) pass through. Mistral is never named to the user.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS allowlist — echo the caller's Origin only when it's a trusted host
// (production *.vercel.app, the future konver.app, local dev). This stops other
// websites from using our AI endpoint as a free backend via the browser.
const STATIC_ORIGINS = new Set<string>([
  "https://konver.app", "https://www.konver.app",
  "http://localhost:3000", "http://127.0.0.1:3000",
]);
function corsFor(req: Request): Record<string, string> {
  const o = req.headers.get("origin") ?? "";
  const allow = STATIC_ORIGINS.has(o) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : "https://konver.app";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Mirror of lib/quotas.ts DAILY_LIMITS — must move together when adjusting
// the free-tier daily cap (also enforced client-side via lib/quotas.ts).
const DAILY_LIMIT: Record<string, number> = { free: 2, pro: Infinity, business: Infinity };

// Tasks that need the stronger model.
const LARGE = new Set(["chapters", "summary", "translate", "rephrase", "product-description", "email-pro", "humanize", "cover-letter", "contract-analyze"]);

function buildSystem(task: string, opts: { target?: string; style?: string; format?: string; register?: string; level?: string }): string | null {
  switch (task) {
    case "chapters":
      return `You generate YouTube chapter markers from a transcript with timestamps. Return up to 10 chapters as plain text, one per line, formatted "HH:MM:SS Chapter title". The first chapter must start at 00:00:00.`;
    case "clean":
      return `You receive subtitle text. Fix obvious transcription errors, normalise punctuation, and remove [music] / (sigh) style annotations. Preserve every line break.`;
    case "summary":
      return `You receive a transcript. Return a 4-bullet summary in plain markdown.`;
    case "translate": {
      const reg = opts.register === "formal" ? " Use a polite, formal register (e.g. vouvoiement in French, Sie in German)."
        : opts.register === "informal" ? " Use a casual, informal register (e.g. tutoiement in French, du in German)."
        : "";
      return `You are an expert translator. Translate the user's text into ${opts.target || "English"} so it reads naturally and idiomatically — never word-for-word.${reg} Preserve line breaks, numbers and formatting. Output ONLY the translation, with no notes, quotes or preamble.`;
    }
    case "humanize": {
      const intensity = opts.level === "light" ? "Make light, careful edits."
        : opts.level === "strong" ? "Rewrite assertively for maximum natural variation."
        : "Apply a balanced rewrite.";
      return `You rewrite AI-generated text so it reads as natural, human-written prose. ${intensity} Vary sentence length (mix short and long), use less predictable transitions, replace uniform/over-formal vocabulary with varied natural synonyms, add slight personal rephrasings, and break repetitive structures. Keep the original meaning, language and overall length. Output ONLY the rewritten text.`;
    }
    case "rephrase":
      return `Rewrite the user's text in a ${opts.style || "clear, neutral"} style/tone. Keep the original meaning and language. Output ONLY the rewritten text.`;
    case "summarize":
      if (opts.format === "sentence") return `Summarise the user's text in a single concise sentence. Output only that sentence.`;
      if (opts.format === "detailed") return `Write a detailed summary of the user's text in 1-3 short paragraphs. Output only the summary.`;
      return `Summarise the user's text as 3-6 key bullet points in markdown. Output only the bullets.`;
    case "grammar":
      return `Correct spelling, grammar and punctuation in the user's text. Keep the same language, meaning and formatting. Output ONLY the corrected text.`;
    case "simplify":
      return `Rewrite the user's text in plain, simple language a 12-year-old could understand. Keep the same language. Use short sentences. Output ONLY the simplified text.`;
    case "email-pro":
      return `Turn the user's rough notes or draft into a polished, professional email. Keep the user's language. Include a suitable greeting and sign-off. Output ONLY the email.`;
    case "product-description":
      return `Write a compelling e-commerce product description from the given product details. Use 2 short paragraphs followed by 3-5 bullet-point features. Persuasive but honest. Output only the description.`;
    case "hashtags":
      return `Generate 15-25 relevant, popular social-media hashtags for the user's content. Output ONLY the hashtags, space-separated, each starting with #.`;
    case "sentiment":
      return `Analyse the sentiment of the user's text. Output exactly three lines: "Sentiment: <Positive|Negative|Neutral|Mixed>", "Confidence: <0-100>%", "Why: <one short sentence>".`;
    case "keywords":
      return `Extract the 8-12 most important keywords and key phrases from the user's text. Output ONLY a comma-separated list, most important first.`;
    case "detect-language":
      return `Identify the language of the user's text. Output exactly one line: "<Language name> (<ISO 639-1 code>)". Nothing else.`;
    case "analyze-file":
      return `You receive a JSON describing a file the user just dropped, plus a catalogue of available tools. Pick the 3 most relevant tools for what the user likely wants to do. Return ONLY JSON of the shape: {"suggestions":[{"slug":"<tool-slug>","why":"<one short sentence>"}, ... 3 items]}. Use only slugs that appear in the provided catalogue.`;
    case "cover-letter":
      return `You receive a JSON with the user's profile (name, current role, key skills, target job description). Write a professional, well-structured cover letter of 3-4 short paragraphs in ${opts.target || "English"}. Open with a hook that links the candidate's strongest skill to the role, explain fit with concrete examples, show genuine interest in the company/mission, close with a confident call to action. Avoid clichés and over-formal phrasing. Output ONLY the letter body — no greeting line, no signature, no commentary.`;
    case "contract-analyze":
      return `You receive the plain text of a contract. Return ONLY a JSON object with these keys: parties (array of strings — the contracting entities), effective_date (ISO YYYY-MM-DD or null), term (string describing duration / termination), payment_terms (string), liability (string — caps / waivers / indemnities, or null), confidentiality (string or null), governing_law (string or null), notable_clauses (array of {title, summary} — 3-6 items the reader should not miss), red_flags (array of strings — anything one-sided or unusual, possibly empty). Be concise; use null when a field is genuinely absent.`;
    default:
      return null;
  }
}

const TOOL_BY_TASK: Record<string, string> = {
  chapters: "youtube-chapters", translate: "translate-text", rephrase: "rephrase-text",
  humanize: "ai-humanizer",
  summarize: "summarize-text", grammar: "fix-grammar", simplify: "simplify-text",
  "email-pro": "professional-email", "product-description": "product-description",
  hashtags: "hashtag-generator", sentiment: "sentiment-analysis", keywords: "keyword-extractor",
  "detect-language": "detect-language",
  "analyze-file": "smart-drop",
  "cover-letter": "cover-letter",
  "contract-analyze": "contract-analyzer",
};

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

  const body = (await req.json().catch(() => ({}))) as {
    task?: string; text?: string; options?: { target?: string; style?: string; format?: string; register?: string; level?: string };
  };
  const task = body.task ?? "";
  const text = (body.text ?? "").trim();
  const system = buildSystem(task, body.options ?? {});
  if (!system || !text) return json({ error: "bad_request" }, { status: 400 });
  // Contracts can run long — bump the cap to 120 KB only for that task to
  // keep memory predictable on the smaller default tasks.
  const maxLen = task === "contract-analyze" ? 120_000 : 40_000;
  if (text.length > maxLen) return json({ error: "text_too_long" }, { status: 413 });

  // Resolve caller (optional) and enforce the per-day free-tier cap.
  let userId: string | null = null;
  const authz = req.headers.get("Authorization");
  if (authz && !authz.endsWith(anon)) {
    try {
      const u = createClient(url, anon, { global: { headers: { Authorization: authz } } });
      const { data } = await u.auth.getUser();
      userId = data.user?.id ?? null;
    } catch { /* anon */ }
  }

  if (userId) {
    try {
      const { data: prof } = await svc.from("profiles").select("plan, daily_usage, usage_reset_at").eq("id", userId).maybeSingle();
      const plan = (prof?.plan as string) ?? "free";
      const limit = DAILY_LIMIT[plan] ?? DAILY_LIMIT.free;
      if (limit !== Infinity) {
        const now = Date.now();
        const resetAt = prof?.usage_reset_at ? new Date(prof.usage_reset_at).getTime() : 0;
        const overdue = now - resetAt > 24 * 3600 * 1000;
        const current = overdue ? 0 : (prof?.daily_usage ?? 0);
        if (current >= limit) {
          return json({ error: "daily_limit", resetAt: new Date((overdue ? now : resetAt) + 24 * 3600 * 1000).toISOString() }, { status: 429 });
        }
        await svc.from("profiles").update({
          daily_usage: current + 1,
          usage_reset_at: overdue ? new Date().toISOString() : (prof?.usage_reset_at ?? new Date().toISOString()),
        }).eq("id", userId);
      }
    } catch { /* fail-open: never block on a quota bookkeeping error */ }
  }

  const model = LARGE.has(task) ? "mistral-large-latest" : "mistral-small-latest";
  const wantsJson = task === "analyze-file" || task === "contract-analyze";
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, { role: "user", content: text }],
      ...(wantsJson ? { response_format: { type: "json_object" } } : {}),
      temperature: task === "translate" || task === "grammar" ? 0.1 : task === "humanize" ? 0.85 : wantsJson ? 0.2 : 0.4,
    }),
  });

  if (!res.ok) return json({ error: "processing_failed", message: await res.text() }, { status: 502 });
  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  const output = data.choices?.[0]?.message?.content?.trim() ?? "";

  if (userId) {
    await svc.from("jobs").insert({
      user_id: userId, tool: TOOL_BY_TASK[task] ?? "ai-process", status: "done",
      metadata: { task }, completed_at: new Date().toISOString(),
    });
  }

  return json({ output });
});
