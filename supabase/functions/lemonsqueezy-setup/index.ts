// Konvertools — Lemon Squeezy setup helper.
//
// The Lemon Squeezy API is READ-ONLY for products/variants — you cannot create
// products programmatically; they must be created once in the LS dashboard
// (Store → Products). This function does the rest automatically: it discovers
// the Store ID and every variant ID, then upserts them into public.billing_config
// so the checkout function picks them up on the next request.
//
// Run it once, after creating the 6 products (Pro, Business + 4 credit packs)
// in the dashboard:
//   GET /functions/v1/lemonsqueezy-setup           (Authorization: Bearer <session jwt>)
//
// Returns the discovered store/variants plus the keys written to billing_config.
// Mapping from product/variant name → billing_config key:
//   Product name contains "pro"      + variant "monthly" → variant_pro_monthly
//                                              "annual"  → variant_pro_annual
//   Product name contains "business" + variant "monthly" → variant_biz_monthly
//                                              "annual"  → variant_biz_annual
//   Product name contains "starter" → variant_pack_starter
//   "growth" → variant_pack_growth · "scale" → variant_pack_scale · "studio" → variant_pack_studio
//
// Deploy:  supabase functions deploy lemonsqueezy-setup
// Secrets: LEMONSQUEEZY_API_KEY

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const LS_API = "https://api.lemonsqueezy.com/v1";

function cors(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };
}
// This is a one-time onboarding helper (it rediscovers store/variant IDs and
// writes billing_config). It must NOT be callable by any signed-in user — gate
// it to an explicit admin allowlist set via the SETUP_ADMIN_EMAILS secret
// (comma-separated). Deny by default when the allowlist is unset, since by then
// billing_config is already seeded and the function should stay locked.
async function requireAdmin(req: Request): Promise<{ ok: true } | { ok: false; status: number; reason: string; message: string }> {
  const auth = req.headers.get("Authorization");
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!auth || !url || !anon) {
    return { ok: false, status: 401, reason: "unauthorized", message: "Sign in as an admin to run setup." };
  }
  const c = createClient(url, anon, { global: { headers: { Authorization: auth } } });
  const { data } = await c.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!email) {
    return { ok: false, status: 401, reason: "unauthorized", message: "Sign in as an admin to run setup." };
  }
  const allow = (Deno.env.get("SETUP_ADMIN_EMAILS") ?? "")
    .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (allow.length === 0) {
    return { ok: false, status: 403, reason: "setup_locked", message: "Setup is locked. Set the SETUP_ADMIN_EMAILS edge-function secret (comma-separated admin emails) to your account email, then retry." };
  }
  if (!allow.includes(email)) {
    return { ok: false, status: 403, reason: "forbidden", message: "Your account is not on the setup admin allowlist (SETUP_ADMIN_EMAILS)." };
  }
  return { ok: true };
}
function lsHeaders(key: string) {
  return { "Authorization": `Bearer ${key}`, "Accept": "application/vnd.api+json" };
}
function getServiceClient() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
}

// Map a product name + variant name to its billing_config key. Returns null if
// the product is not one of the 6 we know about.
function mapToConfigKey(productName: string, variantName: string): string | null {
  const p = productName.toLowerCase();
  const v = variantName.toLowerCase();
  const interval = v.includes("annual") || v.includes("year") ? "annual"
                 : v.includes("month") ? "monthly" : null;
  if (p.includes("pro") && !p.includes("starter") && interval) return `variant_pro_${interval}`;
  if (p.includes("business") && interval) return `variant_biz_${interval}`;
  if (p.includes("starter")) return "variant_pack_starter";
  if (p.includes("growth"))  return "variant_pack_growth";
  if (p.includes("scale"))   return "variant_pack_scale";
  if (p.includes("studio"))  return "variant_pack_studio";
  return null;
}

Deno.serve(async (req) => {
  const c = cors();
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body, null, 2), { ...init, headers: { ...c, "Content-Type": "application/json", ...(init.headers ?? {}) } });
  if (req.method === "OPTIONS") return new Response("ok", { headers: c });

  const key = Deno.env.get("LEMONSQUEEZY_API_KEY");
  if (!key) return json({ error: "missing_lemonsqueezy_key" }, { status: 500 });
  const gate = await requireAdmin(req);
  if (!gate.ok) return json({ error: gate.reason, message: gate.message }, { status: gate.status });

  // 1) Store
  const storesRes = await fetch(`${LS_API}/stores`, { headers: lsHeaders(key) });
  const storesBody = await storesRes.json();
  if (!storesRes.ok) return json({ error: "lemonsqueezy_failed", detail: storesBody?.errors ?? storesBody }, { status: 502 });
  const store = storesBody?.data?.[0];
  const storeId = store ? String(store.id) : null;
  if (!storeId) return json({ error: "no_store" }, { status: 404 });

  // 2) Products + variants for that store
  const prodRes = await fetch(`${LS_API}/products?filter[store_id]=${storeId}&include=variants`, { headers: lsHeaders(key) });
  const prodBody = await prodRes.json();
  if (!prodRes.ok) return json({ error: "lemonsqueezy_failed", detail: prodBody?.errors ?? prodBody }, { status: 502 });

  type Variant = { id: string; name: string; price: number; productName: string; configKey: string | null };
  const variants: Variant[] = [];
  const included = (prodBody?.included ?? []) as Array<{ type: string; id: string; attributes: Record<string, unknown> }>;
  const productNameById = new Map<string, string>();
  for (const p of (prodBody?.data ?? [])) {
    productNameById.set(String(p.id), String(p.attributes?.name ?? ""));
  }
  for (const inc of included) {
    if (inc.type !== "variants") continue;
    const productId = String((inc.attributes?.product_id as number | string) ?? "");
    const productName = productNameById.get(productId) ?? "";
    const variantName = String(inc.attributes?.name ?? "");
    variants.push({
      id: String(inc.id),
      name: variantName,
      price: Number(inc.attributes?.price ?? 0),
      productName,
      configKey: mapToConfigKey(productName, variantName),
    });
  }

  // 3) Upsert into billing_config (service_role bypasses RLS).
  const supabase = getServiceClient();
  const rows: Array<{ key: string; value: string }> = [{ key: "store_id", value: storeId }];
  for (const v of variants) if (v.configKey) rows.push({ key: v.configKey, value: v.id });
  const { error: upsertErr } = await supabase
    .from("billing_config")
    .upsert(rows, { onConflict: "key" });

  return json({
    store: { id: storeId, name: store?.attributes?.name ?? null },
    variants,
    written: rows,
    upsert_error: upsertErr?.message ?? null,
    note: variants.some((v) => !v.configKey)
      ? "Some variants did not map to a known key — rename the product in the LS dashboard to contain 'Pro' / 'Business' / 'Starter' / 'Growth' / 'Scale' / 'Studio' and re-run."
      : null,
  });
});
