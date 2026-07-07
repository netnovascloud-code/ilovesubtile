// Konvertools — Stripe webhook. Verifies the Stripe-Signature header (HMAC
// SHA-256 of "<t>.<rawBody>" with the endpoint's signing secret), then maps
// subscription lifecycle events onto the caller's profile:
//   checkout.session.completed        → attach customer/subscription, set plan
//   customer.subscription.updated     → refresh plan / status / renewal date
//   customer.subscription.deleted     → back to free
//
// The subscription's price → plan mapping uses the price LOOKUP KEY
// (pro_monthly / pro_annual / business_monthly / business_annual) with a
// metadata fallback, so no per-mode price ids are needed.
//
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET (whsec_…, from the
// endpoint created by stripe-setup or the dashboard).
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { "Content-Type": "application/json", ...(init.headers ?? {}) } });
}

async function verifySignature(secret: string, header: string, rawBody: string): Promise<boolean> {
  let ts = "";
  const sigs: string[] = [];
  for (const part of header.split(",")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k === "t") ts = v;
    else if (k === "v1") sigs.push(v);
  }
  if (!ts || sigs.length === 0) return false;
  // Reject stale timestamps (replay protection, 5 min tolerance).
  const age = Math.abs(Date.now() / 1000 - Number(ts));
  if (!Number.isFinite(age) || age > 300) return false;

  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(`${ts}.${rawBody}`));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return sigs.some((sig) => {
    if (sig.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    return diff === 0;
  });
}

type StripeSubscription = {
  id?: string;
  customer?: string;
  status?: string;
  cancel_at_period_end?: boolean;
  current_period_end?: number;
  metadata?: Record<string, string>;
  items?: { data?: Array<{ price?: { lookup_key?: string | null; metadata?: Record<string, string> }; current_period_end?: number }> };
};

function planFromSubscription(sub: StripeSubscription): "pro" | "business" {
  const price = sub.items?.data?.[0]?.price;
  const viaLookup = (price?.lookup_key ?? "").startsWith("business") ? "business"
    : (price?.lookup_key ?? "").startsWith("pro") ? "pro" : null;
  const viaMeta = price?.metadata?.plan === "business" ? "business"
    : price?.metadata?.plan === "pro" ? "pro" : null;
  return viaLookup ?? viaMeta ?? "pro";
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const whSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const apiKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!whSecret || !apiKey) return json({ error: "not_configured" }, { status: 503 });

  const raw = await req.text();
  const sig = req.headers.get("Stripe-Signature") ?? "";
  const valid = await verifySignature(whSecret, sig, raw).catch(() => false);
  if (!valid) return json({ error: "bad_signature" }, { status: 401 });

  let evt: { type?: string; data?: { object?: Record<string, unknown> } };
  try { evt = JSON.parse(raw); } catch { return json({ error: "bad_json" }, { status: 400 }); }
  const type = evt.type ?? "";
  const obj = (evt.data?.object ?? {}) as Record<string, unknown>;

  const svc = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  async function applySubscription(sub: StripeSubscription, hintUserId?: string | null) {
    const customerId = sub.customer ?? null;
    let userId = sub.metadata?.user_id ?? hintUserId ?? null;
    if (!userId && customerId) {
      const { data: p } = await svc.from("profiles").select("id").eq("stripe_customer_id", customerId).maybeSingle();
      userId = (p?.id as string) ?? null;
    }
    if (!userId) return;

    const status = sub.status ?? null;
    // Access-granting statuses. past_due keeps access during Stripe's dunning
    // retries (the UI surfaces the overdue state); a final failure arrives as
    // a subscription.deleted / unpaid transition and drops the plan below.
    const grants = status === "active" || status === "trialing" || status === "past_due";
    const plan = grants ? planFromSubscription(sub) : "free";
    const endSec = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
    const renewsAt = endSec ? new Date(endSec * 1000).toISOString() : null;
    // Surface "cancels at period end" to the UI as its own status.
    const displayStatus = status === "active" && sub.cancel_at_period_end ? "cancelled" : status;

    await svc.from("profiles").update({
      plan,
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id ?? null,
      stripe_subscription_status: displayStatus,
      stripe_renews_at: renewsAt,
    }).eq("id", userId);
  }

  if (type === "checkout.session.completed") {
    const subId = (obj.subscription as string) ?? null;
    const userId = ((obj.metadata as Record<string, string> | null)?.user_id) ?? (obj.client_reference_id as string) ?? null;
    if (subId) {
      const res = await fetch(`https://api.stripe.com/v1/subscriptions/${subId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(15_000),
      });
      if (res.ok) await applySubscription(await res.json() as StripeSubscription, userId);
    }
  } else if (type === "customer.subscription.created" || type === "customer.subscription.updated") {
    await applySubscription(obj as StripeSubscription);
  } else if (type === "customer.subscription.deleted") {
    const sub = obj as StripeSubscription;
    const customerId = sub.customer ?? null;
    let userId = sub.metadata?.user_id ?? null;
    if (!userId && customerId) {
      const { data: p } = await svc.from("profiles").select("id").eq("stripe_customer_id", customerId).maybeSingle();
      userId = (p?.id as string) ?? null;
    }
    if (userId) {
      await svc.from("profiles").update({
        plan: "free",
        stripe_subscription_id: null,
        stripe_subscription_status: "ended",
        stripe_renews_at: null,
      }).eq("id", userId);
    }
  }

  return json({ received: true });
});
