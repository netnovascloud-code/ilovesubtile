// Konvertools — Stripe Checkout launcher. For the signed-in caller, creates a
// hosted Checkout Session (subscription mode) for a plan/interval and returns
// its URL. The client then does a full-page redirect to checkout.stripe.com.
//
// Prices are resolved by LOOKUP KEY (pro_monthly / pro_annual /
// business_monthly / business_annual), created once per mode by the
// stripe-setup function — so this code is identical in test and live mode;
// switching modes is just swapping the STRIPE_SECRET_KEY secret.
//
// Secrets: STRIPE_SECRET_KEY (sk_test_… or sk_live_…).
// Deploy: supabase functions deploy stripe-checkout --no-verify-jwt
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

const STRIPE_API = "https://api.stripe.com/v1";
const LOOKUP: Record<string, string> = {
  "pro:monthly": "pro_monthly",
  "pro:annual": "pro_annual",
  "business:monthly": "business_monthly",
  "business:annual": "business_annual",
};

async function stripe(key: string, method: "GET" | "POST", path: string, form?: Record<string, string>): Promise<{ ok: boolean; status: number; body: Record<string, unknown> }> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      ...(method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: method === "POST" && form ? new URLSearchParams(form).toString() : undefined,
    signal: AbortSignal.timeout(20_000),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body: body as Record<string, unknown> };
}

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const key = Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) return json({ error: "not_configured", message: "Billing isn't configured yet." }, { status: 503 });

  const url = new URL(req.url);
  const plan = url.searchParams.get("plan") === "business" ? "business" : "pro";
  const interval = url.searchParams.get("interval") === "annual" ? "annual" : "monthly";
  const lookupKey = LOOKUP[`${plan}:${interval}`];

  // Auth — checkout is for signed-in users only, so the webhook can attach the
  // subscription to a profile via metadata.user_id.
  const supaUrl = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const authz = req.headers.get("Authorization");
  if (!authz || authz.endsWith(anon)) return json({ error: "unauthorized" }, { status: 401 });
  let userId: string | null = null;
  let email: string | null = null;
  try {
    const u = createClient(supaUrl, anon, { global: { headers: { Authorization: authz } } });
    const { data } = await u.auth.getUser();
    userId = data.user?.id ?? null;
    email = data.user?.email ?? null;
  } catch { /* */ }
  if (!userId) return json({ error: "unauthorized" }, { status: 401 });

  const svc = createClient(supaUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Resolve the price for this plan/interval by lookup key.
  const prices = await stripe(key, "GET", `/prices?lookup_keys[]=${encodeURIComponent(lookupKey)}&active=true&limit=1`);
  const price = (prices.body.data as Array<{ id?: string }> | undefined)?.[0];
  if (!prices.ok || !price?.id) {
    return json({ error: "no_price_configured", message: "This plan isn't on sale yet — run stripe-setup first." }, { status: 503 });
  }

  // Reuse the Stripe customer when we have one (keeps one customer per user
  // across upgrades/cancellations); otherwise Checkout creates it and the
  // webhook stores it.
  const { data: prof } = await svc.from("profiles").select("stripe_customer_id").eq("id", userId).maybeSingle();
  const customerId = (prof?.stripe_customer_id as string) ?? null;

  const origin = STATIC_ORIGINS.has(req.headers.get("origin") ?? "") || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(req.headers.get("origin") ?? "")
    ? (req.headers.get("origin") as string)
    : "https://konvertools.com";

  const form: Record<string, string> = {
    mode: "subscription",
    "line_items[0][price]": price.id,
    "line_items[0][quantity]": "1",
    success_url: `${origin}/dashboard?upgraded=1`,
    cancel_url: `${origin}/pricing`,
    locale: "auto",
    allow_promotion_codes: "true",
    billing_address_collection: "auto",
    client_reference_id: userId,
    "metadata[user_id]": userId,
    "subscription_data[metadata][user_id]": userId,
  };
  if (customerId) form["customer"] = customerId;
  else if (email) form["customer_email"] = email;

  const session = await stripe(key, "POST", "/checkout/sessions", form);
  if (!session.ok || !session.body.url) {
    const err = (session.body.error as { message?: string } | undefined)?.message ?? "checkout_failed";
    return json({ error: "checkout_failed", message: String(err).slice(0, 200) }, { status: 502 });
  }
  return json({ url: session.body.url });
});
