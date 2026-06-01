// Konvertools — Stripe webhook → mirrors plan into profiles + sends an
// upgrade confirmation email via the send-email function.
//
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
// Stripe Dashboard → Webhooks → https://<project>.supabase.co/functions/v1/stripe-webhook
// Events: checkout.session.completed, customer.subscription.*

import Stripe from "https://esm.sh/stripe@17.2.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { "Content-Type": "application/json", ...(init.headers ?? {}) } });
}
function getServiceClient() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
}

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-09-30.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

async function planFromSubscription(subId: string): Promise<"pro" | "business" | "free"> {
  const sub = await stripe.subscriptions.retrieve(subId, { expand: ["items.data.price.product"] });
  const product = sub.items.data[0]?.price.product;
  const name = typeof product === "object" && product && "name" in product ? String((product as { name: string }).name).toLowerCase() : "";
  if (name.includes("business")) return "business";
  if (name.includes("pro")) return "pro";
  return "free";
}

async function sendUpgradeEmail(to: string | null | undefined, plan: string) {
  if (!to) return;
  const url = Deno.env.get("SUPABASE_URL");
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !service) return;
  try {
    await fetch(`${url}/functions/v1/send-email`, {
      method: "POST",
      headers: { Authorization: `Bearer ${service}`, apikey: service, "Content-Type": "application/json" },
      body: JSON.stringify({ to, template: "upgrade", data: { plan } }),
    });
  } catch (_e) {
    /* non-critical */
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });
  const whSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!whSecret) return json({ error: "missing_webhook_secret" }, { status: 500 });

  const signature = req.headers.get("stripe-signature");
  if (!signature) return json({ error: "no_signature" }, { status: 400 });
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, whSecret);
  } catch (err) {
    return json({ error: "signature_invalid", message: err instanceof Error ? err.message : "?" }, { status: 400 });
  }

  const supabase = getServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      const userId = (s.metadata?.user_id as string | undefined) ?? null;

      // One-time credit-pack purchase → grant non-expiring credits.
      if (userId && (s.mode === "payment" || s.metadata?.kind === "pack")) {
        const credits = Number(s.metadata?.credits ?? 0);
        const pi = s.payment_intent ? String(s.payment_intent) : String(s.id);
        if (credits > 0) {
          // Idempotency: skip if we've already recorded this payment.
          const { data: existing } = await supabase
            .from("credit_transactions").select("id").eq("stripe_payment_intent", pi).maybeSingle();
          if (!existing) {
            await supabase.rpc("grant_credits", {
              p_user: userId, p_amount: credits, p_reason: `pack:${s.metadata?.pack ?? "credits"}`, p_pi: pi,
            });
          }
        }
        break;
      }

      if (!userId || !s.subscription || !s.customer) break;
      const plan = await planFromSubscription(String(s.subscription));
      await supabase.from("profiles").update({
        plan,
        stripe_customer_id: String(s.customer),
        stripe_subscription_id: String(s.subscription),
        updated_at: new Date().toISOString(),
      }).eq("id", userId);
      const { data: prof } = await supabase.from("profiles").select("email").eq("id", userId).maybeSingle();
      await sendUpgradeEmail(prof?.email ?? s.customer_details?.email ?? null, plan);
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const plan = event.type === "customer.subscription.deleted" ? "free" : await planFromSubscription(sub.id);
      await supabase.from("profiles").update({
        plan,
        stripe_subscription_id: event.type === "customer.subscription.deleted" ? null : sub.id,
        updated_at: new Date().toISOString(),
      }).eq("stripe_customer_id", String(sub.customer));
      break;
    }
  }

  return json({ received: true });
});
