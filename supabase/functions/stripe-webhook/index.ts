// Stripe webhook receiver — mirrors subscription state into Supabase.
//
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
// Secrets:
//   supabase secrets set STRIPE_SECRET_KEY=sk_live_...
//   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
// Then in Stripe Dashboard → Webhooks: point at
//   https://<your-project>.supabase.co/functions/v1/stripe-webhook
// Subscribe to: checkout.session.completed, customer.subscription.*

import Stripe from "https://esm.sh/stripe@17.2.0?target=deno";
import { json } from "../_shared/cors.ts";
import { getServiceClient } from "../_shared/auth.ts";

const secret = Deno.env.get("STRIPE_SECRET_KEY")!;
const whSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const stripe = new Stripe(secret, { apiVersion: "2024-09-30.acacia", httpClient: Stripe.createFetchHttpClient() });

async function planFromSubscription(subId: string): Promise<"pro" | "business" | "free"> {
  const sub = await stripe.subscriptions.retrieve(subId, { expand: ["items.data.price.product"] });
  const product = sub.items.data[0]?.price.product;
  const name = typeof product === "object" && product && "name" in product ? String(product.name).toLowerCase() : "";
  if (name.includes("business")) return "business";
  if (name.includes("pro")) return "pro";
  return "free";
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  if (!signature) return json({ error: "no_signature" }, { status: 400 });

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
      if (!userId || !s.subscription || !s.customer) break;
      const plan = await planFromSubscription(String(s.subscription));
      await supabase.from("profiles").update({
        plan,
        stripe_customer_id: String(s.customer),
        stripe_subscription_id: String(s.subscription),
        updated_at: new Date().toISOString(),
      }).eq("id", userId);
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const plan = event.type === "customer.subscription.deleted"
        ? "free"
        : await planFromSubscription(sub.id);
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
