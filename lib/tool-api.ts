import { getSupabaseBrowser } from "@/lib/supabase/client";
import { SUPABASE_URL } from "@/lib/utils";
import { AI_ENABLED } from "@/lib/flags";

// Mistral-backed functions paused while AI is off (lib/flags). The Google
// translator (`translate`), the pure-code security tools (SSL/email/URL) and
// the link tools are NOT in this set, so they keep working.
const AI_PAUSED_FUNCTIONS = new Set<string>([
  "ai-process", "ai-vision", "ai-assistant", "process-subtitles", "translate-subtitles",
]);
// Tools that live inside a NON-AI function but still call Mistral, so they must
// be paused by slug. The phishing detector runs inside `security-tools` (which
// otherwise stays live for SSL/email/URL) but uses Mistral to read intent.
const AI_PAUSED_SLUGS = new Set<string>(["phishing-detector"]);

/** tool slug → Supabase Edge Function that handles it. */
const FN_MAP: Record<string, string> = {
  "subtitle-generator": "process-subtitles",
  "tiktok-subtitles": "process-subtitles",
  "voice-to-text": "process-subtitles",
  "citation-generator": "ai-process",
  "ai-detector": "ai-process",
  "context-examples": "ai-process",
  "translate-document-with-layout": "ai-process",
  "translate-subtitles": "translate-subtitles",
  "batch-translate": "translate-subtitles",
  "youtube-chapters": "ai-process",
  "auto-sync": "ai-process",
  "ai-humanizer": "ai-process",
  // The three former process-ffmpeg slugs (add-subtitles-to-video,
  // extract-subtitles, style-subtitles) now run entirely in the browser
  // (FFmpeg.wasm / pure-JS) and no longer call any backend.
  // The live text translator (/translator) uses Google Cloud Translation via
  // the dedicated `translate` function — a real MT engine, not the LLM.
  "translator": "translate",
  // Text & AI tools — all handled by the ai-process function via `task`.
  "translate-text": "ai-process",
  "rephrase-text": "ai-process",
  "summarize-text": "ai-process",
  "fix-grammar": "ai-process",
  "simplify-text": "ai-process",
  "professional-email": "ai-process",
  "product-description": "ai-process",
  "hashtag-generator": "ai-process",
  "sentiment-analysis": "ai-process",
  "keyword-extractor": "ai-process",
  "detect-language": "ai-process",
  "smart-drop": "ai-process",
  "smart-assistant": "ai-assistant",
  "cover-letter": "ai-process",
  "contract-analyzer": "ai-process",
  // Vision tools — all handled by the ai-vision function via `task` (sends
  // a data-URL image instead of a text body; same response envelope).
  "handwriting-to-text": "ai-vision",
  "business-card-scanner": "ai-vision",
  "receipt-scanner": "ai-vision",
  "screenshot-to-code": "ai-vision",
  "image-to-table": "ai-vision",
  // Security tools — all handled by the security-tools function via `action`.
  // (password-checker is pure client-side via HaveIBeenPwned — no backend.)
  "email-checker": "security-tools",
  "phishing-detector": "security-tools",
  "url-scanner": "security-tools",
  "ssl-checker": "security-tools",
  // Link tools — all create rows via the create-link function (login required,
  // anti-phishing screened). The light builders (UTM, mailto/wifi) are pure
  // client-side and don't map here.
  "url-shortener": "create-link",
  "deep-link": "create-link",
  "magic-link": "create-link",
};

export function toolFunction(slug: string): string | null {
  return FN_MAP[slug] ?? null;
}

/**
 * Call a tool's Edge Function DIRECTLY from the browser.
 *
 * We deliberately do NOT proxy through a Next.js route: Vercel caps
 * serverless request bodies at ~4.5 MB, which 413s any real audio/video
 * upload. Supabase Edge Functions accept much larger bodies, so the file
 * goes straight there. Auth = the user's session JWT when signed in,
 * otherwise the public anon key (free tier). The anon key is also sent as
 * `apikey` for Supabase's function router.
 */
export async function callTool(slug: string, body: FormData | object): Promise<Response> {
  const fn = FN_MAP[slug];
  if (!fn) throw new Error(`No backend function mapped for "${slug}"`);
  if (!SUPABASE_URL) throw new Error("Supabase URL not configured");

  // AI modules are paused (lib/flags). Short-circuit with a clear 503 so no
  // request hits the AI backends. The translator / non-AI security / link tools
  // are not in either paused set, so they're unaffected.
  if (!AI_ENABLED && (AI_PAUSED_FUNCTIONS.has(fn) || AI_PAUSED_SLUGS.has(slug))) {
    return new Response(
      JSON.stringify({ error: "ai_paused", message: "AI tools are temporarily unavailable — they're coming back soon." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  let bearer = anon;
  try {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.auth.getSession();
    if (data.session?.access_token) bearer = data.session.access_token;
  } catch {
    // not signed in / env missing — fall back to anon
  }

  const isJson = !(body instanceof FormData);
  // Abort after 90s so a stuck job never spins the UI forever.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 90_000);
  try {
    return await fetch(`${SUPABASE_URL}/functions/v1/${fn}?tool=${encodeURIComponent(slug)}`, {
      method: "POST",
      headers: {
        apikey: anon,
        Authorization: `Bearer ${bearer}`,
        ...(isJson ? { "Content-Type": "application/json" } : {}),
      },
      body: isJson ? JSON.stringify(body) : (body as FormData),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}
