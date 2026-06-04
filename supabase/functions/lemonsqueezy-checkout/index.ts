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
// Store id + variant ids are read from public.billing_config (service_role).
// That keeps onboarding dashboard-only — no Edge Function redeploys to rotate
// a variant, and the user never touches supabase secrets for those values.
//
// Deploy:  supabase functions deploy lemonsqueezy-checkout
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

// Single round-trip: pull every billing_config key we might need into a map.
let cachedConfig: Map<string, string> | null = null;
async function loadConfig(): Promise<Map<string, string>> {
  if (cachedConfig) return cachedConfig;
  const supabase = getServiceClient();
  const { data } = await supabase.from("billing_config").select("key,value");
  const m = new Map<string, string>();
  for (const row of (data ?? [])) m.set(row.key as string, row.value as string);
  cachedConfig = m;
  return m;
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

  const cfg = await loadConfig();
  const storeId = cfg.get("store_id");
  if (!storeId) return json({ error: "no_store" }, { status: 500 });

  const url = new URL(req.url);
  const origin = req.headers.get("origin") ?? "https://konvertools.com";

  let variantId: string | undefined;
  let custom: Record<string, string>;
  let redirectPath: string;

  const pack = url.searchParams.get("pack")?.toLowerCase();
  if (pack) {
    const PACK_CREDITS: Record<string, number> = { starter: 100, growth: 500, scale: 2000, studio: 6000 };
    const credits = PACK_CREDITS[pack];
    if (!credits) return json({ error: "invalid_pack" }, { status: 400 });
    variantId = cfg.get(`variant_pack_${pack}`);
    if (!variantId) return json({ error: "no_variant_configured", key: `variant_pack_${pack}` }, { status: 400 });
    custom = { user_id: caller.id, kind: "pack", pack, credits: String(credits) };
    redirectPath = url.searchParams.get("success_path") ?? "/dashboard?credits=1";
  } else {
    const plan = (url.searchParams.get("plan") ?? "pro").toLowerCase();
    const interval = url.searchParams.get("interval") === "annual" ? "annual" : "monthly";
    if (plan !== "pro" && plan !== "business") return json({ error: "invalid_plan" }, { status: 400 });
    const cfgKey = `variant_${plan === "business" ? "biz" : "pro"}_${interval}`;
    variantId = cfg.get(cfgKey);
    if (!variantId) return json({ error: "no_variant_configured", key: cfgKey }, { status: 400 });
    custom = { user_id: caller.id, kind: "subscription", plan };
    redirectPath = url.searchParams.get("success_path") ?? "/dashboard?upgraded=1";
  }

  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_options: { embed: true, dark: false },
        checkout_data: {
          email: caller.email ?? undefined,
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
      headers: {
        "Authorization": `Bearer ${key}`,
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
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
