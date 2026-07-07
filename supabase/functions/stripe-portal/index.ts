// Konvertools — Stripe Billing customer portal. For the signed-in caller,
// creates a portal session (manage / cancel the subscription, change the
// payment method, download invoices) and returns its URL.
//
// Secrets: STRIPE_SECRET_KEY.
// Deploy: supabase functions deploy stripe-portal --no-verify-jwt
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

  const key = Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) return json({ error: "not_configured", message: "Billing isn't configured yet." }, { status: 503 });

  const supaUrl = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
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
  const { data: prof } = await svc.from("profiles").select("stripe_customer_id").eq("id", userId).maybeSingle();
  const customerId = (prof?.stripe_customer_id as string) ?? null;
  if (!customerId) return json({ error: "no_customer", message: "No billing account yet." }, { status: 404 });

  const origin = STATIC_ORIGINS.has(req.headers.get("origin") ?? "") || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(req.headers.get("origin") ?? "")
    ? (req.headers.get("origin") as string)
    : "https://konvertools.com";

  try {
    const res = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ customer: customerId, return_url: `${origin}/billing` }).toString(),
      signal: AbortSignal.timeout(15_000),
    });
    const body = await res.json().catch(() => ({})) as { url?: string; error?: { message?: string } };
    if (!res.ok || !body.url) {
      return json({ error: "portal_failed", message: String(body.error?.message ?? "portal_failed").slice(0, 200) }, { status: 502 });
    }
    return json({ url: body.url });
  } catch (e) {
    return json({ error: "portal_failed", message: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
});
