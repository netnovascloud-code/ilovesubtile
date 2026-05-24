// CaptionFlow — create a Stripe Checkout session for the authenticated user.
//
// POST /functions/v1/stripe-checkout?plan=pro|business&interval=monthly|annual
// Returns: { url: "https://checkout.stripe.com/..." }
//
// Deploy:  supabase functions deploy stripe-checkout
// Secrets: supabase secrets set STRIPE_SECRET_KEY=sk_live_...
//          supabase secrets set STRIPE_PRICE_PRO_MONTHLY=price_...
//          supabase secrets set STRIPE_PRICE_PRO_ANNUAL=price_...
//          supabase secrets set STRIPE_PRICE_BIZ_MONTHLY=price_...
//          supabase secrets set STRIPE_PRICE_BIZ_ANNUAL=price_...

import Stripe from "https://esm.sh/stripe@17.2.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function handleOptions() { return new Response("ok", { headers: corsHeaders }); }
function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { ...corsHeaders, "Content-Type": "application/json", ...(init.headers ?? {}) } });
}
async function getCaller(req: Request) {
  const auth = req.headers.get("Authorization");
  if (!auth) return null;
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anon) return null;
  const c = createClient(url, anon, { global: { headers: { Authorization: auth } } });
  const { data } = await c.auth.getUser();
  return data.user;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) return json({ error: "missing_stripe_key" }, { status: 500 });

  const caller = await getCaller(req);
  if (!caller) return json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const plan = (url.searchParams.get("plan") ?? "pro").toLowerCase();
  const interval = url.searchParams.get("interval") === "annual" ? "annual" : "monthly";
  if (plan !== "pro" && plan !== "business") return json({ error: "invalid_plan" }, { status: 400 });

  const priceEnvKey = `STRIPE_PRICE_${plan === "business" ? "BIZ" : "PRO"}_${interval.toUpperCase()}`;
  const priceId = Deno.env.get(priceEnvKey);
  if (!priceId) return json({ error: "no_price_configured", env: priceEnvKey }, { status: 400 });

  const origin = req.headers.get("origin") ?? "https://captionflow.com";
  const successPath = url.searchParams.get("success_path") ?? "/dashboard?upgraded=1";
  const cancelPath = url.searchParams.get("cancel_path") ?? "/pricing";

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2024-09-30.acacia",
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: caller.email ?? undefined,
      success_url: `${origin}${successPath}`,
      cancel_url: `${origin}${cancelPath}`,
      metadata: { user_id: caller.id, plan },
      subscription_data: { metadata: { user_id: caller.id, plan } },
    });
    return json({ url: session.url });
  } catch (err) {
    return json({ error: "stripe_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }
});
