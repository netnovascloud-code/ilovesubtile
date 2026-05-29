// Wyrlo — open the Stripe Customer Portal for the authenticated user.
//
// POST /functions/v1/stripe-portal
// Returns: { url: "https://billing.stripe.com/..." }
//
// Deploy:  supabase functions deploy stripe-portal
// Secrets: supabase secrets set STRIPE_SECRET_KEY=sk_live_...

import Stripe from "https://esm.sh/stripe@17.2.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://wyrlo.io",
  "Vary": "Origin",
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
function getServiceClient() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return handleOptions();
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) return json({ error: "missing_stripe_key" }, { status: 500 });

  const caller = await getCaller(req);
  if (!caller) return json({ error: "unauthorized" }, { status: 401 });

  const supabase = getServiceClient();
  const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", caller.id).maybeSingle();
  if (!profile?.stripe_customer_id) return json({ error: "no_stripe_customer" }, { status: 400 });

  const origin = req.headers.get("origin") ?? "https://wyrlo.io";
  const url = new URL(req.url);
  const returnPath = url.searchParams.get("return_path") ?? "/dashboard";

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2024-09-30.acacia",
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}${returnPath}`,
    });
    return json({ url: session.url });
  } catch (err) {
    return json({ error: "stripe_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }
});
