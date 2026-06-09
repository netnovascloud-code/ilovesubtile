// Konvertools — Mistral-powered text tasks. Self-contained (no shared imports) so it
// deploys cleanly. POST JSON: { task, text, options? }.
//   options: { target?, style?, format? }
// Auth: optional user JWT. Free signed-in users are capped per day; Pro/Business
// and anonymous (client-gated) pass through. Mistral is never named to the user.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS allowlist — echo the caller's Origin only when it's a trusted host
// (production *.vercel.app, the future konvertools.com, local dev). This stops other
// websites from using our AI endpoint as a free backend via the browser.
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

// Quota mirrors of lib/quotas.ts — keep in sync when adjusting limits.
// Free is a rolling 24-hour counter; Pro and Business are monthly (UTC
// calendar month). Anonymous traffic is gated client-side.
// KONVER quotas: signed-in free = 3/day (anonymous is gated client-side at 2).
const DAILY_LIMIT: Record<string, number> = { free: 3, pro: 0, business: 0 };
const MONTHLY_LIMIT: Record<string, number> = { free: 0, pro: 500, business: 3000 };
function utcMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

// Tasks that need the stronger model. i18n-tool / i18n-category deliberately
// use the small model: the strings are short UI/SEO snippets where small is
// plenty, and its far higher rate limit avoids 429 storms when the fill script
// translates ~2000 (tool, locale) pairs in one pass.
const LARGE = new Set(["chapters", "summary", "summarize", "translate", "rephrase", "product-description", "email-pro", "humanize", "cover-letter", "contract-analyze"]);

function buildSystem(task: string, opts: { target?: string; style?: string; format?: string; register?: string; level?: string }): string | null {
  switch (task) {
    case "chapters":
      return `You generate YouTube chapter markers from a transcript with timestamps. Return up to 10 chapters as plain text, one per line, formatted "HH:MM:SS Chapter title". The first chapter must start at 00:00:00.`;
    case "clean":
      return `You receive subtitle text. Fix obvious transcription errors, normalise punctuation, and remove [music] / (sigh) style annotations. Preserve every line break.`;
    case "summary":
      return `You receive a transcript. Return a 4-point summary, one point per line, each line starting with "• ". Plain text only.`;
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
      return `Summarise the user's text as 3-6 key points, one per line, each line starting with "• ". Output only the points, plain text.`;
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
    case "synonyms":
      return `You are a multilingual thesaurus. For the user's word or short phrase, give the most useful synonyms — most natural first — as a single comma-separated line. If the word has clearly distinct senses, put each sense on its own line, prefixed with a short "(sense)" label. Output only the synonyms.`;
    case "conjugate":
      return `You are a verb conjugation engine. Conjugate the user's verb across its language's main tenses and moods. Output one block per tense: a line with the tense name, then each person on its own line (e.g. "je …", "tu …", or "I …", "you …"). Cover at least the present, a past, a future and the common compound/perfect tense. Output only the conjugation.`;
    case "citation":
      return `You generate academic citations. The user's message starts with a "style: <APA|MLA|Chicago|Harvard|IEEE>" line, then the source details (title, authors, year, publisher/journal/URL, etc.). Produce the citation in the requested style on the first line, then a blank line, then a parenthetical / in-text reference example. If a field is missing, do your best with what's given; never invent authors or years. Output ONLY those two blocks.`;
    case "context-examples": {
      const tgt = opts.target || "the same language";
      return `You give bilingual example sentences in context for a word or phrase (Reverso-Context style). The user's text is the word or short phrase. Detect its language automatically. Produce 6 natural example sentences using the term, each followed on the next line by a translation into ${tgt}. Use diverse registers (literature, news, casual speech, technical) so the user can pick the right shade. Output ONLY the 6 example/translation pairs, each pair separated by a blank line. No commentary.`;
    }
    case "ai-detect":
      return `You are an AI-writing detector. Estimate the probability the user's text was written by a language model (ChatGPT, Claude, Gemini, etc.). Be specific: cite phrases that read AI-generated (over-formal transitions, uniform sentence length, hedging clichés, "as an AI" boilerplate). Return ONLY a JSON object: {"score": <0-100 integer, higher = more AI-like>, "verdict": "human"|"mixed"|"likely_ai"|"very_likely_ai", "reasons": [<short string>, ...3-5 items], "flagged": [<verbatim short snippet>, ...0-5 items]}. Use "human" for <25, "mixed" for 25-49, "likely_ai" for 50-79, "very_likely_ai" for ≥80.`;
    case "analyze-file":
      return `You receive a JSON describing a file the user just dropped, plus a catalogue of available tools. Pick the 3 most relevant tools for what the user likely wants to do. Return ONLY JSON of the shape: {"suggestions":[{"slug":"<tool-slug>","why":"<one short sentence>"}, ... 3 items]}. Use only slugs that appear in the provided catalogue.`;
    case "cover-letter":
      return `You receive a JSON with the user's profile (name, current role, key skills, target job description). Write a professional, well-structured cover letter of 3-4 short paragraphs in ${opts.target || "English"}. Open with a hook that links the candidate's strongest skill to the role, explain fit with concrete examples, show genuine interest in the company/mission, close with a confident call to action. Avoid clichés and over-formal phrasing. Output ONLY the letter body — no greeting line, no signature, no commentary.`;
    case "contract-analyze":
      return `You receive the plain text of a contract. Return ONLY a JSON object with these keys: parties (array of strings — the contracting entities), effective_date (ISO YYYY-MM-DD or null), term (string describing duration / termination), payment_terms (string), liability (string — caps / waivers / indemnities, or null), confidentiality (string or null), governing_law (string or null), notable_clauses (array of {title, summary} — 3-6 items the reader should not miss), red_flags (array of strings — anything one-sided or unusual, possibly empty). Be concise; use null when a field is genuinely absent.`;
    case "i18n-tool":
      return `You are a professional software localizer for "Konvertools", a free online file-converter and tools website. The user message is a JSON object with five English fields: name, short, h1, metaTitle, metaDescription. Translate every field into ${opts.target || "the target language"} so it reads naturally and idiomatically. Rules: keep the brand name "Konvertools" unchanged; keep technical/format tokens unchanged (SRT, VTT, MP4, PDF, HEX, RGB, JSON, etc.); metaTitle stays under ~60 characters; metaDescription stays under ~160 characters. Return ONLY a JSON object with the SAME five keys.`;
    case "i18n-category":
      return `You are a professional software localizer for "Konvertools", a free online file-converter and tools website. The user message is a JSON object with two English fields: label (a short category name) and blurb (a one-line description). Translate both into ${opts.target || "the target language"} naturally and concisely. Keep the brand name "Konvertools" unchanged. Return ONLY a JSON object with the SAME two keys.`;
    case "translate-legal":
      // KONVER Part 5: batch-translate a JSON array of legal-prose strings
      // into the target language in ONE call. Uses mistral-small for higher
      // throughput. Preserves inline markdown markers used by the
      // LegalRender component (**bold**, [label](url)).
      return `You are a professional legal translator working for "Konvertools". The user message is a JSON array of English strings drawn from a Privacy Policy or Terms of Service. Translate EVERY string into ${opts.target || "the target language"} so it reads as natural, native legal prose for that language. Rules: keep the brand name "Konvertools" unchanged; keep technical/format tokens (GDPR, SHA-256, MX, AES, RGB, SRT, MP4, etc.) untranslated; preserve the inline markdown markers **bold** and [label](url) EXACTLY where they appear — never alter URLs or mailto addresses; preserve numbered section headings (e.g. "1. Acceptance" -> "1. Acceptation"); keep article numbers like "Art. 6(1)(b)" or "L. 221-28" untouched. Return ONLY a valid JSON array of the SAME length, in the SAME order. Do not add commentary or wrap the array in any object.`;
    default:
      return null;
  }
}

// Part 4 — strip Markdown so answers render as clean plain text. Users
// complained about ** and * (and the odd heading/back-tick) leaking into
// rephrase / humanize / summary output. Never run this on JSON tasks.
function stripMarkdown(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/gs, "$1")     // **bold** → bold
    .replace(/__(.+?)__/gs, "$1")          // __bold__ → bold
    .replace(/^[ \t]*#{1,6}[ \t]+/gm, "")  // "## heading" → "heading"
    .replace(/^[ \t]*\*[ \t]+/gm, "• ")    // "* item" bullet → "• item"
    .replace(/`{1,3}/g, "")                // strip code fences / back-ticks
    .replace(/\*/g, "")                    // any stray emphasis asterisks
    .replace(/\n{3,}/g, "\n\n")            // tidy oversized gaps
    .trim();
}

const TOOL_BY_TASK: Record<string, string> = {
  chapters: "youtube-chapters", translate: "translate-text", rephrase: "rephrase-text",
  humanize: "ai-humanizer",
  summarize: "summarize-text", grammar: "fix-grammar", simplify: "simplify-text",
  "email-pro": "professional-email", "product-description": "product-description",
  hashtags: "hashtag-generator", sentiment: "sentiment-analysis", keywords: "keyword-extractor",
  "detect-language": "detect-language",
  synonyms: "synonyms-finder",
  conjugate: "conjugation",
  citation: "citation-generator",
  "ai-detect": "ai-detector",
  "context-examples": "context-examples",
  "analyze-file": "smart-drop",
  "cover-letter": "cover-letter",
  "contract-analyze": "contract-analyzer",
  clean: "clean-subtitles",
  summary: "summarize-text",
  "i18n-tool": "i18n-fill",
  "i18n-category": "i18n-fill",
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
  const baseSystem = buildSystem(task, body.options ?? {});
  if (!baseSystem || !text) return json({ error: "bad_request" }, { status: 400 });

  // wantsJson: tasks whose contract is a JSON object — they must keep their raw
  // structured output (no plain-text rewrite, no markdown stripping).
  const wantsJson = task === "analyze-file" || task === "contract-analyze" || task === "i18n-tool" || task === "i18n-category" || task === "ai-detect" || task === "translate-legal";
  // Tasks that legitimately emit a *specific* language (a translation/letter in
  // opts.target, an i18n fill) or a fixed structured label — these are exempt
  // from the "answer in the input's language" rule.
  const TARGET_OR_STRUCTURED = new Set(["translate", "cover-letter", "i18n-tool", "i18n-category", "detect-language", "analyze-file", "contract-analyze", "context-examples", "translate-legal"]);
  let system = baseSystem;
  // Part 4 — force clean plain text on every prose task.
  if (!wantsJson) system += ` Write your answer in plain text only — no Markdown, no asterisks (*), no bold or italic markers, no headings, no code fences.`;
  // Part 3 — make the model answer in the SAME language as the input. The old
  // wording only forbade switching *to English*, so the model freely drifted to
  // French/German on English input (rephrase/humanize). Forbid any switch.
  if (!TARGET_OR_STRUCTURED.has(task)) system += ` CRITICAL: First detect the language of the user's text, then write your ENTIRE response in that exact same language. Do not translate and do not switch to any other language — if the input is English, answer in English; if it is French, answer in French; and so on for every language.`;
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
      const { data: prof } = await svc.from("profiles")
        .select("plan, daily_usage, usage_reset_at, monthly_ai_usage, monthly_ai_month")
        .eq("id", userId).maybeSingle();
      const plan = (prof?.plan as string) ?? "free";

      if (plan === "free") {
        // Free: rolling 24-hour counter.
        const limit = DAILY_LIMIT.free;
        const now = Date.now();
        const resetAt = prof?.usage_reset_at ? new Date(prof.usage_reset_at).getTime() : 0;
        const overdue = now - resetAt > 24 * 3600 * 1000;
        const current = overdue ? 0 : (prof?.daily_usage ?? 0);
        if (current >= limit) {
          return json({
            error: "daily_limit", plan, limit,
            used: current, remaining: 0,
            resetAt: new Date((overdue ? now : resetAt) + 24 * 3600 * 1000).toISOString(),
          }, { status: 429 });
        }
        await svc.from("profiles").update({
          daily_usage: current + 1,
          usage_reset_at: overdue ? new Date().toISOString() : (prof?.usage_reset_at ?? new Date().toISOString()),
        }).eq("id", userId);
      } else {
        // Pro / Business: monthly counter keyed by UTC YYYY-MM.
        const limit = MONTHLY_LIMIT[plan] ?? MONTHLY_LIMIT.pro;
        const month = utcMonth();
        const sameMonth = prof?.monthly_ai_month === month;
        const used = sameMonth ? (prof?.monthly_ai_usage ?? 0) : 0;
        if (used >= limit) {
          // Reset at the first day of next month, 00:00 UTC.
          const next = new Date();
          next.setUTCDate(1); next.setUTCHours(0, 0, 0, 0);
          next.setUTCMonth(next.getUTCMonth() + 1);
          return json({
            error: "monthly_limit", plan, limit,
            used, remaining: 0,
            resetAt: next.toISOString(),
          }, { status: 429 });
        }
        await svc.from("profiles").update({
          monthly_ai_usage: used + 1,
          monthly_ai_month: month,
        }).eq("id", userId);
      }
    } catch { /* fail-open: never block on a quota bookkeeping error */ }
  } else {
    // Anonymous: cap per client IP so the public anon key can't drive unlimited
    // Mistral calls from outside the browser (CORS + client gating don't stop a
    // direct POST). Generous; fail-open on any bookkeeping error.
    try {
      const xff = req.headers.get("x-forwarded-for") ?? "";
      const ip = xff.split(",")[0].trim() || req.headers.get("x-real-ip") || "";
      const { data: rl } = await svc.rpc("ip_rate_hit", { p_ip: ip, p_bucket: "ai-process", p_limit: 30, p_window_secs: 3600 });
      const row = Array.isArray(rl) ? rl[0] : rl;
      if (row && row.allowed === false) {
        const retry = Number(row.retry_after ?? 3600);
        return json({ error: "rate_limited", message: `Too many requests from your network. Sign in for higher limits, or retry in ${retry}s.`, retry_after: retry }, { status: 429, headers: { "Retry-After": String(retry) } });
      }
    } catch { /* fail-open */ }
  }

  const model = LARGE.has(task) ? "mistral-large-latest" : "mistral-small-latest";
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
  let output = data.choices?.[0]?.message?.content?.trim() ?? "";
  // Part 4 — clean markdown out of prose answers (skip JSON tasks and hashtags,
  // whose '#' must survive).
  if (!wantsJson && task !== "hashtags") output = stripMarkdown(output);

  // Privacy + DB hygiene: text tasks produce no stored artifact, so we do NOT
  // log a jobs row. Quota is tracked on the (single, in-place) profiles
  // counter above — nothing per-run is persisted.

  return json({ output });
});
