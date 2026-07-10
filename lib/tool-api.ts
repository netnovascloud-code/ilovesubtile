import { getSupabaseBrowser } from "@/lib/supabase/client";
import { SUPABASE_URL } from "@/lib/utils";
import { AI_ENABLED } from "@/lib/flags";
import { FN_MAP, AI_AUTH_FUNCTIONS, AI_AUTH_SLUGS } from "@/lib/tool-functions";

// Re-export the server-safe helpers so existing/import sites can keep using
// "@/lib/tool-api" for both the browser call path and the mapping helpers.
export { toolFunction, toolRequiresAuth, FN_MAP } from "@/lib/tool-functions";

// Mistral-backed functions are paused while AI is off (lib/flags). Same sets as
// the auth gate — a paused/AI function requires a signed-in user, and while
// paused we short-circuit before any request leaves the browser.
const AI_PAUSED_FUNCTIONS = AI_AUTH_FUNCTIONS;
const AI_PAUSED_SLUGS = AI_AUTH_SLUGS;

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
