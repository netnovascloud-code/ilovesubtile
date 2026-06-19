// Konvertools — open the Lemon Squeezy customer portal for the authenticated
// user. Lemon Squeezy issues signed, time-limited URLs per subscription
// (urls.customer_portal, urls.update_payment_method); the customer can update
// their payment method, switch plan, view invoices and cancel there. Both URLs
// are short-lived (~24h) and regenerated on every fetch, so we hit the LS API
// fresh on each click and never store them.
//
// POST /functions/v1/lemonsqueezy-portal
// Returns: {
//   url: "https://<store>.lemonsqueezy.com/billing?...",              // customer portal
//   updatePaymentMethodUrl: "https://<store>.lemonsqueezy.com/..."    // change card
// }
//
// Deploy:  supabase functions deploy lemonsqueezy-portal
// Secrets: LEMONSQUEEZY_API_KEY

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const LS_API = "https://api.lemonsqueezy.com/v1";

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
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const key = Deno.env.get("LEMONSQUEEZY_API_KEY");
  if (!key) return json({ error: "missing_lemonsqueezy_key" }, { status: 500 });

  const caller = await getCaller(req);
  if (!caller) return json({ error: "unauthorized" }, { status: 401 });

  const supabase = getServiceClient();
  const { data: profile } = await supabase
    .from("profiles").select("ls_subscription_id, ls_customer_id").eq("id", caller.id).maybeSingle();

  try {
    // 1) Active subscription → the subscription portal (manage card, switch plan,
    //    invoices, cancel). Returns both the portal and the direct change-card URL.
    if (profile?.ls_subscription_id) {
      const res = await fetch(`${LS_API}/subscriptions/${profile.ls_subscription_id}`, {
        headers: { "Authorization": `Bearer ${key}`, "Accept": "application/vnd.api+json" },
      });
      const body = await res.json();
      if (!res.ok) {
        console.error("LS subscription fetch failed", res.status, JSON.stringify(body).slice(0, 400));
        return json({ error: "lemonsqueezy_failed", scope: "subscription", status: res.status, detail: body?.errors ?? body }, { status: 502 });
      }
      const urls = body?.data?.attributes?.urls ?? {};
      const portal = urls.customer_portal ?? null;
      const updatePaymentMethodUrl = urls.update_payment_method ?? null;
      if (!portal && !updatePaymentMethodUrl) return json({ error: "no_portal_url", scope: "subscription" }, { status: 502 });
      return json({ url: portal, updatePaymentMethodUrl });
    }

    // 2) No subscription but a known Lemon Squeezy customer (e.g. a comped plan
    //    that bought credit packs, or a one-off pack buyer on Free). The CUSTOMER
    //    portal still lets them update their payment method and download every
    //    receipt — so we surface it instead of saying "nothing to manage".
    if (profile?.ls_customer_id) {
      const res = await fetch(`${LS_API}/customers/${profile.ls_customer_id}`, {
        headers: { "Authorization": `Bearer ${key}`, "Accept": "application/vnd.api+json" },
      });
      const body = await res.json();
      if (!res.ok) {
        console.error("LS customer fetch failed", res.status, JSON.stringify(body).slice(0, 400));
        return json({ error: "lemonsqueezy_failed", scope: "customer", status: res.status, detail: body?.errors ?? body }, { status: 502 });
      }
      const portal = body?.data?.attributes?.urls?.customer_portal ?? null;
      if (!portal) {
        console.error("LS customer has no portal url", JSON.stringify(body?.data?.attributes?.urls ?? {}).slice(0, 400));
        return json({ error: "no_portal_url", scope: "customer" }, { status: 502 });
      }
      return json({ url: portal });
    }

    // 3) No Lemon Squeezy relationship at all (e.g. comped plan that never bought
    //    anything). There is genuinely no payment method or receipt to manage.
    return json({ error: "no_billing_account" }, { status: 400 });
  } catch (err) {
    return json({ error: "lemonsqueezy_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }
});
