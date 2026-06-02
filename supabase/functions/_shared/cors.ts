// CORS allowlist. We only echo the Origin header when it matches one of these
// known hosts; otherwise the response carries no allow-origin and the browser
// rejects the cross-site call. Additional origins (preview deploys, local
// dev) can be added by setting KONVER_EXTRA_ORIGINS as a comma-separated env.
const STATIC_ORIGINS = new Set<string>([
  "https://konvertools.com",
  "https://konver.app", "https://www.konver.app",
  "https://www.konvertools.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function allowedOrigin(req: Request): string {
  const o = req.headers.get("origin") ?? "";
  if (!o) return "";
  if (STATIC_ORIGINS.has(o)) return o;
  // Common preview-deploy patterns (Vercel) and the configured prod host(s).
  if (/^https:\/\/[a-z0-9-]+(?:--konver)?\.vercel\.app$/.test(o)) return o;
  const extra = (Deno.env.get("KONVER_EXTRA_ORIGINS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (extra.includes(o)) return o;
  return "";
}

export function buildCors(req: Request): Record<string, string> {
  const origin = allowedOrigin(req);
  return {
    // When no match, we send an empty allow-origin (browsers block the response).
    // We never fall back to "*" because some of these endpoints rely on Authorization.
    "Access-Control-Allow-Origin": origin,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

// Legacy export retained for the rare static use; new code should use buildCors(req).
export const corsHeaders = {
  "Access-Control-Allow-Origin": "https://konvertools.com",
  "https://konver.app", "https://www.konver.app",
  "Vary": "Origin",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function handleOptions(req?: Request) {
  return new Response("ok", { headers: req ? buildCors(req) : corsHeaders });
}

export function json(body: unknown, init: ResponseInit = {}, req?: Request) {
  const headers = req ? buildCors(req) : corsHeaders;
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { ...headers, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
}
