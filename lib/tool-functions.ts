// Server-safe tool → Edge-Function mapping and auth predicate. Kept free of any
// browser imports ("use client" modules) so Server Components (ToolPageShell)
// can import `toolRequiresAuth` without pulling in the Supabase browser client.
// lib/tool-api.ts re-exports these for the client-side callTool path.

// Mistral-backed functions require a signed-in user (they reject anonymous
// callers with 401 `auth_required`). The Google translator (`translate`), the
// pure-code security tools (SSL/email/URL) and the link builders are NOT here.
export const AI_AUTH_FUNCTIONS = new Set<string>([
  "ai-process", "ai-vision", "ai-assistant", "process-subtitles", "translate-subtitles",
]);
// Tools inside a NON-AI function that still call Mistral, gated by slug. The
// phishing detector runs inside `security-tools` (otherwise open for
// SSL/email/URL) but uses Mistral to read intent.
export const AI_AUTH_SLUGS = new Set<string>(["phishing-detector"]);

/** tool slug → Supabase Edge Function that handles it. */
export const FN_MAP: Record<string, string> = {
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
 * True when a tool's backend requires a signed-in user — i.e. the Mistral AI
 * modules. These functions reject anonymous callers (401 `auth_required`), so
 * the UI gates them behind a sign-in prompt instead of letting a visitor hit
 * that raw error. Pure function — safe to call from Server Components.
 */
export function toolRequiresAuth(slug: string): boolean {
  const fn = FN_MAP[slug];
  return (!!fn && AI_AUTH_FUNCTIONS.has(fn)) || AI_AUTH_SLUGS.has(slug);
}
