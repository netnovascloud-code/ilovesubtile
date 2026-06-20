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

  const lsHeaders = { "Authorization": `Bearer ${key}`, "Accept": "application/vnd.api+json" };

  try {
    let subId = profile?.ls_subscription_id ?? null;

    // Self-heal: no recorded subscription but we know the LS customer → ask LS
    // directly (covers a missed/failed subscription_created webhook). If found,
    // backfill the profile so the billing page shows the right state next load.
    if (!subId && profile?.ls_customer_id) {
      const res = await fetch(`${LS_API}/subscriptions?filter[customer_id]=${profile.ls_customer_id}`, { headers: lsHeaders });
      const body = await res.json();
      if (!res.ok) {
        console.error("LS subscriptions list failed", res.status, JSON.stringify(body).slice(0, 400));
      } else {
        const subs = Array.isArray(body?.data) ? body.data : [];
        const LIVE = ["active", "on_trial", "past_due", "unpaid", "paused", "cancelled"];
        const pick = subs.find((sub: { attributes?: { status?: string } }) => LIVE.includes(sub?.attributes?.status ?? "")) ?? subs[0] ?? null;
        if (pick?.id) {
          subId = String(pick.id);
          try {
            await supabase.from("profiles").update({
              ls_subscription_id: subId,
              ls_subscription_status: pick.attributes?.status ?? null,
              ls_renews_at: pick.attributes?.renews_at ?? null,
            }).eq("id", caller.id);
          } catch { /* best-effort backfill */ }
        }
      }
    }

    // Subscription portal (manage card, switch plan, invoices, cancel).
    if (subId) {
      const res = await fetch(`${LS_API}/subscriptions/${subId}`, { headers: lsHeaders });
      const body = await res.json();
      if (!res.ok) {
        console.error("LS subscription fetch failed", res.status, JSON.stringify(body).slice(0, 400));
        return json({ error: "lemonsqueezy_failed", scope: "subscription", status: res.status, detail: body?.errors ?? body }, { status: 502 });
      }
      const urls = body?.data?.attributes?.urls ?? {};
      const portal = urls.customer_portal ?? null;
      const updatePaymentMethodUrl = urls.update_payment_method ?? null;
      if (!portal && !updatePaymentMethodUrl) return json({ error: "no_subscription_portal", scope: "subscription" }, { status: 502 });
      return json({ url: portal, updatePaymentMethodUrl });
    }

    // No subscription anywhere. Lemon Squeezy only issues a portal for
    // subscriptions, so a one-time pack buyer / comped plan has nothing to
    // manage here (receipts are emailed automatically).
    return json({ error: "no_subscription" }, { status: 400 });
  } catch (err) {
    return json({ error: "lemonsqueezy_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }
});
