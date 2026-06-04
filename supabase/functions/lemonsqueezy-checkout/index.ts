// Konvertools — create a Lemon Squeezy hosted checkout for the authenticated
// user. Lemon Squeezy is our Merchant of Record: it collects and remits VAT
// worldwide, so we never touch tax logic.
//
// Subscriptions:
//   POST /functions/v1/lemonsqueezy-checkout?plan=pro|business&interval=monthly|annual
// Credit packs (one-time, never expire):
//   POST /functions/v1/lemonsqueezy-checkout?pack=starter|growth|scale|studio
// Returns: { url: "https://<store>.lemonsqueezy.com/checkout/..." }  (embed-ready)
//
// The returned URL is opened in the Lemon Squeezy overlay client-side (lemon.js),
// so the buyer never leaves konvertools.com.
//
// Deploy:  supabase functions deploy lemonsqueezy-checkout
// Secrets: LEMONSQUEEZY_API_KEY
//          LEMONSQUEEZY_STORE_ID            (optional — auto-discovered if unset)
//          LS_VARIANT_PRO_MONTHLY / LS_VARIANT_PRO_ANNUAL
//          LS_VARIANT_BIZ_MONTHLY / LS_VARIANT_BIZ_ANNUAL
//          LS_VARIANT_PACK_STARTER / _GROWTH / _SCALE / _STUDIO

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

function lsHeaders(key: string) {
  return {
    "Authorization": `Bearer ${key}`,
    "Accept": "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  };
}

// Resolve the store ID once per cold start: explicit env wins, otherwise we
// auto-discover it by listing the API key's stores (the user asked for the
// Store ID to be fetched automatically).
let cachedStoreId: string | null = null;
async function resolveStoreId(key: string): Promise<string | null> {
  const fromEnv = Deno.env.get("LEMONSQUEEZY_STORE_ID");
  if (fromEnv) return fromEnv;
  if (cachedStoreId) return cachedStoreId;
  const res = await fetch(`${LS_API}/stores`, { headers: lsHeaders(key) });
  if (!res.ok) return null;
  const body = await res.json();
  const first = body?.data?.[0]?.id;
  cachedStoreId = first ? String(first) : null;
  return cachedStoreId;
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

  const storeId = await resolveStoreId(key);
  if (!storeId) return json({ error: "no_store" }, { status: 500 });

  const url = new URL(req.url);
  const origin = req.headers.get("origin") ?? "https://konvertools.com";

  // Decide variant + the custom data the webhook will read back.
  let variantId: string | undefined;
  let custom: Record<string, string>;
  let redirectPath: string;

  const pack = url.searchParams.get("pack")?.toLowerCase();
  if (pack) {
    const PACK_CREDITS: Record<string, number> = { starter: 100, growth: 500, scale: 2000, studio: 6000 };
    const credits = PACK_CREDITS[pack];
    if (!credits) return json({ error: "invalid_pack" }, { status: 400 });
    variantId = Deno.env.get(`LS_VARIANT_PACK_${pack.toUpperCase()}`);
    if (!variantId) return json({ error: "no_variant_configured", env: `LS_VARIANT_PACK_${pack.toUpperCase()}` }, { status: 400 });
    custom = { user_id: caller.id, kind: "pack", pack, credits: String(credits) };
    redirectPath = url.searchParams.get("success_path") ?? "/dashboard?credits=1";
  } else {
    const plan = (url.searchParams.get("plan") ?? "pro").toLowerCase();
    const interval = url.searchParams.get("interval") === "annual" ? "annual" : "monthly";
    if (plan !== "pro" && plan !== "business") return json({ error: "invalid_plan" }, { status: 400 });
    const envKey = `LS_VARIANT_${plan === "business" ? "BIZ" : "PRO"}_${interval.toUpperCase()}`;
    variantId = Deno.env.get(envKey);
    if (!variantId) return json({ error: "no_variant_configured", env: envKey }, { status: 400 });
    custom = { user_id: caller.id, kind: "subscription", plan };
    redirectPath = url.searchParams.get("success_path") ?? "/dashboard?upgraded=1";
  }

  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        // embed:true → URL works inside the lemon.js overlay.
        checkout_options: { embed: true, dark: false },
        checkout_data: {
          email: caller.email ?? undefined,
          // custom values must be strings; surfaced as meta.custom_data in webhooks.
          custom,
        },
        product_options: {
          redirect_url: `${origin}${redirectPath}`,
          enabled_variants: [Number(variantId)],
        },
      },
      relationships: {
        store: { data: { type: "stores", id: String(storeId) } },
        variant: { data: { type: "variants", id: String(variantId) } },
      },
    },
  };

  try {
    const res = await fetch(`${LS_API}/checkouts`, {
      method: "POST",
      headers: lsHeaders(key),
      body: JSON.stringify(payload),
    });
    const body = await res.json();
    if (!res.ok) {
      return json({ error: "lemonsqueezy_failed", detail: body?.errors ?? body }, { status: 502 });
    }
    const checkoutUrl = body?.data?.attributes?.url;
    if (!checkoutUrl) return json({ error: "no_url" }, { status: 502 });
    return json({ url: checkoutUrl });
  } catch (err) {
    return json({ error: "lemonsqueezy_failed", message: err instanceof Error ? err.message : "?" }, { status: 502 });
  }
});
