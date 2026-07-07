// Konvertools — one-time Stripe configurator (idempotent). Creates everything
// billing needs in the CURRENT mode of STRIPE_SECRET_KEY (test or live), so
// running it once with the test key and once with the live key configures both
// environments identically:
//
//   • Products  : "Konvertools Pro", "Konvertools Business"
//   • Prices    : pro_monthly €25 · pro_annual €210 · business_monthly €79 ·
//                 business_annual €664 (EUR, recurring, lookup_key + metadata)
//   • Webhook   : POST …/functions/v1/stripe-webhook for checkout + subscription
//                 events (only when called with ?webhook=1). The signing secret
//                 is returned ONCE — copy it into the STRIPE_WEBHOOK_SECRET
//                 Supabase secret immediately.
//
// Safe to re-run: existing lookup_keys / products / an existing endpoint with
// the same URL are reused, never duplicated.
//
// Auth: the signed-in caller's email must be listed in SETUP_ADMIN_EMAILS.
// Secrets: STRIPE_SECRET_KEY, SETUP_ADMIN_EMAILS.
// Deploy: supabase functions deploy stripe-setup --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const PLANS = [
  { plan: "pro", name: "Konvertools Pro", prices: [
    { lookup: "pro_monthly", amount: 2500, interval: "month" },
    { lookup: "pro_annual", amount: 21000, interval: "year" },
  ] },
  { plan: "business", name: "Konvertools Business", prices: [
    { lookup: "business_monthly", amount: 7900, interval: "month" },
    { lookup: "business_annual", amount: 66400, interval: "year" },
  ] },
] as const;

const WEBHOOK_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
];

const STRIPE_API = "https://api.stripe.com/v1";
async function stripe(key: string, method: "GET" | "POST", path: string, form?: URLSearchParams) {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      ...(method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: method === "POST" && form ? form.toString() : undefined,
    signal: AbortSignal.timeout(20_000),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body: body as Record<string, unknown> };
}

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { "Content-Type": "application/json", ...(init.headers ?? {}) } });
}

Deno.serve(async (req) => {
  if (req.method !== "POST" && req.method !== "GET") return json({ error: "method_not_allowed" }, { status: 405 });

  const key = Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) return json({ error: "missing_stripe_key", message: "Set the STRIPE_SECRET_KEY secret first." }, { status: 503 });

  // Admin gate — same pattern as the old setup helper: the signed-in caller's
  // email must be allow-listed.
  const admins = (Deno.env.get("SETUP_ADMIN_EMAILS") ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const authz = req.headers.get("Authorization") ?? "";
  let email: string | null = null;
  try {
    const u = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authz } } });
    const { data } = await u.auth.getUser();
    email = data.user?.email?.toLowerCase() ?? null;
  } catch { /* */ }
  if (!email || !admins.includes(email)) {
    return json({ error: "forbidden", message: "Your email is not in SETUP_ADMIN_EMAILS." }, { status: 403 });
  }

  const mode = key.startsWith("sk_live_") ? "live" : "test";
  const out: Record<string, unknown> = { mode };
  const created: string[] = [];
  const reused: string[] = [];

  // ── 1 · Prices (and their products), keyed by lookup_key ────────────────
  const lookups = PLANS.flatMap((p) => p.prices.map((x) => x.lookup));
  const q = lookups.map((l) => `lookup_keys[]=${encodeURIComponent(l)}`).join("&");
  const existing = await stripe(key, "GET", `/prices?${q}&limit=10`);
  if (!existing.ok) return json({ error: "stripe_error", message: JSON.stringify(existing.body).slice(0, 300) }, { status: 502 });
  const have = new Map<string, string>();
  for (const p of (existing.body.data as Array<{ id: string; lookup_key?: string }> ?? [])) {
    if (p.lookup_key) have.set(p.lookup_key, p.id);
  }

  const priceIds: Record<string, string> = {};
  for (const planDef of PLANS) {
    let productId: string | null = null;
    const missing = planDef.prices.filter((x) => !have.has(x.lookup));

    if (missing.length > 0) {
      // Find (by metadata) or create the plan's product.
      const search = await stripe(key, "GET", `/products/search?query=${encodeURIComponent(`metadata['konver_plan']:'${planDef.plan}'`)}&limit=1`);
      productId = ((search.body.data as Array<{ id: string }> | undefined)?.[0]?.id) ?? null;
      if (!productId) {
        const prod = await stripe(key, "POST", "/products", new URLSearchParams({
          name: planDef.name,
          "metadata[konver_plan]": planDef.plan,
        }));
        if (!prod.ok) return json({ error: "stripe_error", message: JSON.stringify(prod.body).slice(0, 300) }, { status: 502 });
        productId = prod.body.id as string;
        created.push(`product:${planDef.name}`);
      } else {
        reused.push(`product:${planDef.name}`);
      }
    }

    for (const priceDef of planDef.prices) {
      const existingId = have.get(priceDef.lookup);
      if (existingId) { priceIds[priceDef.lookup] = existingId; reused.push(`price:${priceDef.lookup}`); continue; }
      const price = await stripe(key, "POST", "/prices", new URLSearchParams({
        product: productId!,
        currency: "eur",
        unit_amount: String(priceDef.amount),
        "recurring[interval]": priceDef.interval,
        lookup_key: priceDef.lookup,
        transfer_lookup_key: "true",
        "metadata[plan]": planDef.plan,
        "metadata[interval]": priceDef.interval === "month" ? "monthly" : "annual",
      }));
      if (!price.ok) return json({ error: "stripe_error", message: JSON.stringify(price.body).slice(0, 300) }, { status: 502 });
      priceIds[priceDef.lookup] = price.body.id as string;
      created.push(`price:${priceDef.lookup}`);
    }
  }
  out.prices = priceIds;

  // ── 2 · Webhook endpoint (opt-in via ?webhook=1) ─────────────────────────
  if (new URL(req.url).searchParams.get("webhook") === "1") {
    const hookUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/stripe-webhook`;
    const list = await stripe(key, "GET", "/webhook_endpoints?limit=100");
    const already = (list.body.data as Array<{ id: string; url: string }> | undefined)?.find((w) => w.url === hookUrl);
    if (already) {
      reused.push("webhook_endpoint");
      out.webhook = { id: already.id, note: "Endpoint already exists — its secret was shown when it was created. Roll it in the Stripe dashboard if you've lost it." };
    } else {
      const form = new URLSearchParams({ url: hookUrl, description: "Konvertools subscription sync" });
      WEBHOOK_EVENTS.forEach((e) => form.append("enabled_events[]", e));
      const hook = await stripe(key, "POST", "/webhook_endpoints", form);
      if (!hook.ok) return json({ error: "stripe_error", message: JSON.stringify(hook.body).slice(0, 300) }, { status: 502 });
      created.push("webhook_endpoint");
      out.webhook = {
        id: hook.body.id,
        secret: hook.body.secret,
        action: "COPY the secret above into the STRIPE_WEBHOOK_SECRET Supabase secret NOW — it is never shown again.",
      };
    }
  }

  out.created = created;
  out.reused = reused;
  return json(out);
});
