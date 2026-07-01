// Konvertools — Paddle Billing customer portal. For the signed-in user, creates
// a Paddle portal session and returns the URL so they can manage/cancel their
// subscription and update their payment method.
//
// Secrets: PADDLE_API_KEY, and optionally PADDLE_ENV ("sandbox" | "production",
// default "sandbox").
// Deploy: supabase functions deploy paddle-portal --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

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

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const supaUrl = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const apiKey = Deno.env.get("PADDLE_API_KEY");
  if (!apiKey) return json({ error: "not_configured", message: "Billing isn't configured yet." }, { status: 503 });
  const base = (Deno.env.get("PADDLE_ENV") ?? "sandbox") === "production"
    ? "https://api.paddle.com" : "https://sandbox-api.paddle.com";

  // Auth: the caller's session JWT.
  const authz = req.headers.get("Authorization");
  if (!authz || authz.endsWith(anon)) return json({ error: "unauthorized" }, { status: 401 });
  let userId: string | null = null;
  try {
    const u = createClient(supaUrl, anon, { global: { headers: { Authorization: authz } } });
    const { data } = await u.auth.getUser();
    userId = data.user?.id ?? null;
  } catch { /* */ }
  if (!userId) return json({ error: "unauthorized" }, { status: 401 });

  const svc = createClient(supaUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: prof } = await svc.from("profiles").select("paddle_customer_id").eq("id", userId).maybeSingle();
  const customerId = (prof?.paddle_customer_id as string) ?? null;
  if (!customerId) return json({ error: "no_customer", message: "No billing account yet." }, { status: 404 });

  try {
    const res = await fetch(`${base}/customers/${customerId}/portal-sessions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      const t = await res.text();
      return json({ error: "portal_failed", message: t.slice(0, 200) }, { status: 502 });
    }
    const body = await res.json() as { data?: { urls?: { general?: { overview?: string } } } };
    const url = body.data?.urls?.general?.overview ?? null;
    if (!url) return json({ error: "no_portal_url" }, { status: 502 });
    return json({ url });
  } catch (e) {
    return json({ error: "portal_failed", message: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
});
