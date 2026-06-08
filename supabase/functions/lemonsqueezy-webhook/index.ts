// Konvertools — Lemon Squeezy webhook → mirrors subscription/credit state into
// the profiles table and sends an upgrade confirmation email.
//
// Security: EVERY request is authenticated by verifying the `X-Signature`
// header — an HMAC-SHA256 (hex) of the raw body computed with
// LEMONSQUEEZY_WEBHOOK_SECRET. Requests that fail verification are rejected
// with 401 before any side effect.
//
// Events handled (configure these in the Lemon Squeezy dashboard):
//   subscription_created, subscription_updated  → set/keep plan
//   subscription_cancelled                      → keep plan until period end
//   subscription_expired                        → downgrade to free
//   subscription_payment_success                → ensure plan active (renewal)
//   order_created                               → grant credit pack (if pack)
//   order_refunded, subscription_payment_refunded → reverse access/credits
//
// Deploy: supabase functions deploy lemonsqueezy-webhook --no-verify-jwt
// Secrets: LEMONSQUEEZY_WEBHOOK_SECRET
// Lemon Squeezy → Settings → Webhooks → callback URL:
//   https://<project>.supabase.co/functions/v1/lemonsqueezy-webhook

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { ...init, headers: { "Content-Type": "application/json", ...(init.headers ?? {}) } });
}
function getServiceClient() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
}

const enc = new TextEncoder();

/** Constant-time hex compare. */
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verify X-Signature = hex(HMAC-SHA256(rawBody, secret)). */
async function verifySignature(rawBody: string, signature: string, secret: string): Promise<boolean> {
  if (!signature) return false;
  const keyData = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", keyData, enc.encode(rawBody));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return timingSafeEqualHex(expected, signature.trim().toLowerCase());
}

type LsCustom = { user_id?: string; kind?: string; plan?: string; pack?: string; credits?: string };

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
  } catch (_e) { /* non-critical */ }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });
  const secret = Deno.env.get("LEMONSQUEEZY_WEBHOOK_SECRET");
  if (!secret) return json({ error: "missing_webhook_secret" }, { status: 500 });

  const raw = await req.text();
  const signature = req.headers.get("x-signature") ?? "";
  if (!(await verifySignature(raw, signature, secret))) {
    return json({ error: "invalid_signature" }, { status: 401 });
  }

  let event: { meta?: { event_name?: string; custom_data?: LsCustom }; data?: { id?: string; attributes?: Record<string, unknown> } };
  try {
    event = JSON.parse(raw);
  } catch {
    return json({ error: "bad_json" }, { status: 400 });
  }

  const name = event.meta?.event_name ?? "";
  const custom = event.meta?.custom_data ?? {};
  const attr = (event.data?.attributes ?? {}) as Record<string, unknown>;
  const supabase = getServiceClient();

  const userId = custom.user_id ?? null;
  const customerId = attr["customer_id"] != null ? String(attr["customer_id"]) : null;
  const subId = event.data?.id ? String(event.data.id) : null;

  // Resolve the target profile: prefer the user_id we stamped at checkout,
  // otherwise fall back to the Lemon Squeezy customer id we stored earlier.
  async function findUserId(): Promise<string | null> {
    if (userId) return userId;
    if (customerId) {
      const { data } = await supabase.from("profiles").select("id").eq("ls_customer_id", customerId).maybeSingle();
      return data?.id ?? null;
    }
    return null;
  }

  switch (name) {
    // ── Subscriptions ────────────────────────────────────────────────────
    case "subscription_created":
    case "subscription_updated": {
      const uid = await findUserId();
      if (!uid) break;
      const status = String(attr["status"] ?? "");
      const plan = (custom.plan === "business" ? "business" : custom.plan === "pro" ? "pro" : null);
      // active / on_trial / paid → plan on. cancelled keeps access until ends_at
      // (handled in its own case). expired/unpaid → free.
      const isActive = ["active", "on_trial", "paid"].includes(status);
      const isDead = ["expired", "unpaid"].includes(status);
      // Read the current plan first so we only email on a genuine upgrade —
      // LemonSqueezy replays subscription_created, which otherwise re-sends the
      // "welcome" email every time.
      const { data: before } = await supabase.from("profiles").select("plan, email").eq("id", uid).maybeSingle();
      const update: Record<string, unknown> = {
        ls_customer_id: customerId,
        ls_subscription_id: subId,
        ls_subscription_status: status,
        ls_renews_at: (attr["renews_at"] as string | null) ?? (attr["ends_at"] as string | null) ?? null,
        updated_at: new Date().toISOString(),
      };
      if (isDead) update.plan = "free";
      else if (isActive && plan) update.plan = plan;
      await supabase.from("profiles").update(update).eq("id", uid);
      // Business includes a monthly API-credit bucket — grant it immediately
      // rather than withholding it until the 1st-of-month cron. The RPC is
      // idempotent per calendar month, so replays never double-grant.
      if (isActive && plan === "business") await supabase.rpc("grant_business_monthly");
      if (isActive && plan && before?.plan !== plan) {
        await sendUpgradeEmail(before?.email ?? (attr["user_email"] as string | undefined) ?? null, plan);
      }
      break;
    }
    case "subscription_payment_success": {
      // The payload here is a subscription-INVOICE, not a subscription: its
      // id/status/renews_at belong to the invoice, so writing them would
      // overwrite ls_subscription_id with an invoice id and break the customer
      // portal. Renewals are reflected by subscription_updated; here we only
      // refresh the customer link. (The real subscription id is
      // attr.subscription_id if ever needed.)
      const uid = await findUserId();
      if (!uid) break;
      const upd: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (customerId) upd.ls_customer_id = customerId;
      await supabase.from("profiles").update(upd).eq("id", uid);
      break;
    }
    case "subscription_cancelled": {
      // Cancelled but still paid until ends_at — keep the plan, record the end.
      const uid = await findUserId();
      if (!uid) break;
      await supabase.from("profiles").update({
        ls_subscription_status: "cancelled",
        ls_renews_at: (attr["ends_at"] as string | null) ?? null,
        updated_at: new Date().toISOString(),
      }).eq("id", uid);
      break;
    }
    case "subscription_expired": {
      const uid = await findUserId();
      if (!uid) break;
      await supabase.from("profiles").update({
        plan: "free",
        ls_subscription_status: "expired",
        ls_subscription_id: null,
        ls_renews_at: null,
        updated_at: new Date().toISOString(),
      }).eq("id", uid);
      break;
    }

    // ── One-time credit packs ────────────────────────────────────────────
    case "order_created": {
      if (custom.kind !== "pack") break;
      const uid = await findUserId();
      if (!uid) break;
      const credits = Number(custom.credits ?? 0);
      const orderRef = subId ? `ls_order:${subId}` : `ls_order:${attr["identifier"] ?? crypto.randomUUID()}`;
      if (credits > 0) {
        // grant_credits is idempotent on the payment ref (DB-enforced).
        await supabase.rpc("grant_credits", {
          p_user: uid, p_amount: credits, p_reason: `pack:${custom.pack ?? "credits"}`, p_pi: orderRef,
        });
        if (customerId) await supabase.from("profiles").update({ ls_customer_id: customerId }).eq("id", uid);
      }
      break;
    }

    // ── Refunds → reverse ────────────────────────────────────────────────
    case "order_refunded": {
      const uid = await findUserId();
      if (!uid) break;
      if (custom.kind === "pack") {
        const credits = Number(custom.credits ?? 0);
        const orderRef = subId ? `ls_refund:${subId}` : `ls_refund:${attr["identifier"] ?? crypto.randomUUID()}`;
        if (credits > 0) {
          // Negative grant, idempotent on the refund ref. grant_credits floors
          // the balance at 0 so a refund can't push it negative.
          await supabase.rpc("grant_credits", {
            p_user: uid, p_amount: -credits, p_reason: `refund:${custom.pack ?? "credits"}`, p_pi: orderRef,
          });
        }
      } else {
        // Refund of a subscription's order → revoke paid access. Some stores
        // emit order_refunded instead of subscription_payment_refunded, so
        // handle it here too rather than leaving the user on a paid plan.
        await supabase.from("profiles").update({
          plan: "free", ls_subscription_status: "refunded", ls_renews_at: null, updated_at: new Date().toISOString(),
        }).eq("id", uid);
      }
      break;
    }
    case "subscription_payment_refunded": {
      const uid = await findUserId();
      if (!uid) break;
      await supabase.from("profiles").update({
        plan: "free",
        ls_subscription_status: "refunded",
        ls_renews_at: null,
        updated_at: new Date().toISOString(),
      }).eq("id", uid);
      break;
    }
    // ── Pause / dunning ──────────────────────────────────────────────────
    case "subscription_paused": {
      const uid = await findUserId();
      if (!uid) break;
      await supabase.from("profiles").update({
        plan: "free", ls_subscription_status: "paused", updated_at: new Date().toISOString(),
      }).eq("id", uid);
      break;
    }
    case "subscription_unpaused": {
      const uid = await findUserId();
      if (!uid) break;
      const plan = (custom.plan === "business" ? "business" : custom.plan === "pro" ? "pro" : null);
      const update: Record<string, unknown> = { ls_subscription_status: "active", updated_at: new Date().toISOString() };
      if (plan) update.plan = plan;
      await supabase.from("profiles").update(update).eq("id", uid);
      if (plan === "business") await supabase.rpc("grant_business_monthly");
      break;
    }
    case "subscription_payment_failed": {
      // Dunning — flag the account so the billing page can surface "payment
      // overdue". Access isn't revoked until subscription_expired.
      const uid = await findUserId();
      if (!uid) break;
      await supabase.from("profiles").update({
        ls_subscription_status: "past_due", updated_at: new Date().toISOString(),
      }).eq("id", uid);
      break;
    }
  }

  return json({ received: true });
});
