// Konvertools — Lemon Squeezy setup helper.
//
// The Lemon Squeezy API is READ-ONLY for products/variants — you cannot create
// products programmatically; they must be created once in the LS dashboard
// (Store → Products). This function does the rest automatically: it fetches
// your Store ID and lists every product/variant with its ID, then prints the
// exact `supabase secrets set` commands to wire them up.
//
// Run it once, after creating the 6 products (Pro, Business + 4 credit packs)
// in the dashboard:
//   GET /functions/v1/lemonsqueezy-setup           (Authorization: Bearer <session jwt>)
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
async function requireAuth(req: Request): Promise<boolean> {
  const auth = req.headers.get("Authorization");
  if (!auth) return false;
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anon) return false;
  const c = createClient(url, anon, { global: { headers: { Authorization: auth } } });
  const { data } = await c.auth.getUser();
  return !!data.user;
}
function lsHeaders(key: string) {
  return { "Authorization": `Bearer ${key}`, "Accept": "application/vnd.api+json" };
}

Deno.serve(async (req) => {
  const c = cors();
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body, null, 2), { ...init, headers: { ...c, "Content-Type": "application/json", ...(init.headers ?? {}) } });
  if (req.method === "OPTIONS") return new Response("ok", { headers: c });

  const key = Deno.env.get("LEMONSQUEEZY_API_KEY");
  if (!key) return json({ error: "missing_lemonsqueezy_key" }, { status: 500 });
  if (!(await requireAuth(req))) return json({ error: "unauthorized" }, { status: 401 });

  // 1) Stores
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

  type Variant = { id: string; name: string; price: number; productName: string };
  const variants: Variant[] = [];
  const included = (prodBody?.included ?? []) as Array<{ type: string; id: string; attributes: Record<string, unknown> }>;
  const productNameById = new Map<string, string>();
  for (const p of (prodBody?.data ?? [])) {
    productNameById.set(String(p.id), String(p.attributes?.name ?? ""));
  }
  for (const inc of included) {
    if (inc.type !== "variants") continue;
    const productId = String((inc.attributes?.product_id as number | string) ?? "");
    variants.push({
      id: String(inc.id),
      name: String(inc.attributes?.name ?? ""),
      price: Number(inc.attributes?.price ?? 0),
      productName: productNameById.get(productId) ?? "",
    });
  }

  return json({
    store: { id: storeId, name: store?.attributes?.name ?? null },
    variants,
    next_steps: [
      "Map each variant id below to the matching secret, then run them:",
      "supabase secrets set LEMONSQUEEZY_STORE_ID=" + storeId,
      "supabase secrets set LS_VARIANT_PRO_MONTHLY=<id> LS_VARIANT_PRO_ANNUAL=<id>",
      "supabase secrets set LS_VARIANT_BIZ_MONTHLY=<id> LS_VARIANT_BIZ_ANNUAL=<id>",
      "supabase secrets set LS_VARIANT_PACK_STARTER=<id> LS_VARIANT_PACK_GROWTH=<id> LS_VARIANT_PACK_SCALE=<id> LS_VARIANT_PACK_STUDIO=<id>",
    ],
  });
});
