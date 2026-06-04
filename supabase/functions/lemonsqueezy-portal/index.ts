// Konvertools — open the Lemon Squeezy customer portal for the authenticated
// user. Lemon Squeezy issues a signed, time-limited portal URL per subscription
// (urls.customer_portal); the customer can update payment method, switch plan,
// view invoices and cancel there.
//
// POST /functions/v1/lemonsqueezy-portal
// Returns: { url: "https://<store>.lemonsqueezy.com/billing?..." }
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
    .from("profiles").select("ls_subscription_id").eq("id", caller.id).maybeSingle();
  if (!profile?.ls_subscription_id) return json({ error: "no_subscription" }, { status: 400 });

  try {
    const res = await fetch(`${LS_API}/subscriptions/${profile.ls_subscription_id}`, {
      headers: { "Authorization": `Bearer ${key}`, "Accept": "application/vnd.api+json" },
    });
    const body = await res.json();
    if (!res.ok) return json({ error: "lemonsqueezy_failed", detail: body?.errors ?? body }, { status: 502 });
    const portal = body?.data?.attributes?.urls?.customer_portal;
    if (!portal) return json({ error: "no_portal_url" }, { status: 502 });
    return json({ url: portal });
  } catch (err) {
    return json({ error: "lemonsqueezy_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }
});
