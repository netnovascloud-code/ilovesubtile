// Konvertools — Paddle Billing webhook. Verifies the Paddle-Signature HMAC,
// then maps subscription events to the user's plan on `profiles`.
//
// Paddle sends: header `Paddle-Signature: ts=<unix>;h1=<hex hmac>` and a JSON
// body { event_type, data }. The signed payload is `${ts}:${rawBody}`, HMAC
// SHA-256 with the notification-destination secret.
//
// Secrets:
//   PADDLE_WEBHOOK_SECRET               (Paddle → Notifications → your destination)
//   PADDLE_PRICE_PRO_MONTHLY            price_… id for each plan/interval, so the
//   PADDLE_PRICE_PRO_ANNUAL             webhook can map the subscription's price
//   PADDLE_PRICE_BUSINESS_MONTHLY       back to a plan.
//   PADDLE_PRICE_BUSINESS_ANNUAL
// Deploy: supabase functions deploy paddle-webhook --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { "Content-Type": "application/json", ...(init.headers ?? {}) } });
}

async function verifySignature(secret: string, sigHeader: string, rawBody: string): Promise<boolean> {
  const parts: Record<string, string> = {};
  for (const seg of sigHeader.split(";")) {
    const i = seg.indexOf("=");
    if (i > 0) parts[seg.slice(0, i).trim()] = seg.slice(i + 1).trim();
  }
  const ts = parts["ts"]; const h1 = parts["h1"];
  if (!ts || !h1) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(`${ts}:${rawBody}`));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex.length !== h1.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ h1.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const secret = Deno.env.get("PADDLE_WEBHOOK_SECRET");
  if (!secret) return json({ error: "not_configured" }, { status: 503 });

  const raw = await req.text();
  const sig = req.headers.get("Paddle-Signature") ?? "";
  const ok = await verifySignature(secret, sig, raw).catch(() => false);
  if (!ok) return json({ error: "bad_signature" }, { status: 401 });

  let evt: { event_type?: string; data?: Record<string, unknown> };
  try { evt = JSON.parse(raw); } catch { return json({ error: "bad_json" }, { status: 400 }); }

  const type = evt.event_type ?? "";
  const data = (evt.data ?? {}) as Record<string, unknown>;

  // Map Paddle price ids → plan.
  const PRICE_PLAN: Record<string, string> = {};
  const add = (env: string, plan: string) => { const v = Deno.env.get(env); if (v) PRICE_PLAN[v] = plan; };
  add("PADDLE_PRICE_PRO_MONTHLY", "pro"); add("PADDLE_PRICE_PRO_ANNUAL", "pro");
  add("PADDLE_PRICE_BUSINESS_MONTHLY", "business"); add("PADDLE_PRICE_BUSINESS_ANNUAL", "business");

  const svc = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  if (type.startsWith("subscription.")) {
    const subId = (data.id as string) ?? null;
    const customerId = (data.customer_id as string) ?? null;
    const status = (data.status as string) ?? null;
    const custom = (data.custom_data as Record<string, unknown> | null) ?? null;
    let userId = (custom?.user_id as string) ?? null;
    const items = (data.items as Array<{ price?: { id?: string } }> | undefined) ?? [];
    const priceId = items[0]?.price?.id ?? "";
    const period = (data.current_billing_period as { ends_at?: string } | null) ?? null;
    const renewsAt = period?.ends_at ?? (data.next_billed_at as string) ?? null;

    // "canceled" keeps access until the period end, so it still grants the plan.
    // Only paused/expired (and unknown) drop to free.
    const stillActive = ["active", "trialing", "past_due", "canceled"].includes(status ?? "");
    const plan = stillActive ? (PRICE_PLAN[priceId] ?? "pro") : "free";

    // Resolve the user: custom_data.user_id (set at checkout) is the reliable
    // link; otherwise match a previously-stored paddle_customer_id.
    if (!userId && customerId) {
      const { data: p } = await svc.from("profiles").select("id").eq("paddle_customer_id", customerId).maybeSingle();
      userId = (p?.id as string) ?? null;
    }
    if (userId) {
      await svc.from("profiles").update({
        plan,
        paddle_customer_id: customerId,
        paddle_subscription_id: subId,
        paddle_subscription_status: status,
        paddle_renews_at: renewsAt,
      }).eq("id", userId);
    }
  }

  return json({ received: true });
});
