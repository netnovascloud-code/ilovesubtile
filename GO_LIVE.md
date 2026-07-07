# Konvertools — Go-Live Runbook

Step-by-step actions to take the production stack from Stripe TEST mode to
LIVE. Each step says **WHO**, **WHERE**, **WHAT**, and how to verify.

The Stripe integration is mode-agnostic by design: prices are resolved by
**lookup_key** (`pro_monthly`, `pro_annual`, `business_monthly`,
`business_annual`), so test → live is only (a) re-running `stripe-setup` with
the live key and (b) swapping two Supabase secrets.

---

## 0 · Prerequisites
- [ ] Vercel project `ilovesubtile` on the `main` branch is deploying green.
- [ ] Supabase project `flimyasklnzcsenogsup` (CaptionFlow) health: green.
- [ ] Custom domain `konvertools.com` (and `konver.app`) points to Vercel.
- [ ] DNS for emails (Resend SPF/DKIM) verified.
- [ ] Migration `028_stripe_billing_columns.sql` applied.
- [ ] Edge functions deployed: `stripe-checkout`, `stripe-webhook`,
      `stripe-portal`, `stripe-setup` (all `--no-verify-jwt`).

## 0.1 · Auth emails via Resend (REQUIRED — confirmation / magic-link / reset)
WHO: you · WHERE: Supabase Dashboard → **Authentication → Emails → SMTP Settings**

IMPORTANT: Supabase sends **authentication** emails (signup confirmation,
magic link, password reset, email-change) itself, through whatever SMTP is
configured here — NOT through the `send-email` edge function. So even with
Resend's domain verified, auth mails go out from the built-in
`noreply@mail.app.supabase.io` (rate-limited) until you enable custom SMTP.

1. Toggle **Enable Custom SMTP** ON and enter:
   - Host: `smtp.resend.com` · Port: `465` · Username: `resend`
   - Password: your Resend API key (`re_…`)
   - Sender: `Konvertools <no-reply@konvertools.com>` (verified in Resend)
2. **Authentication → URL Configuration** → Site URL = `https://konvertools.com`;
   add `https://konvertools.com/auth/callback` to Redirect URLs.

VERIFY: sign up with a throwaway address; the `mail.send` line in Auth logs
must show `no-reply@konvertools.com`.

## 1 · Configure Stripe TEST mode (once)
WHO: you (signed in with an email listed in `SETUP_ADMIN_EMAILS`)

1. Supabase secrets: `STRIPE_SECRET_KEY` = your **test** key (`sk_test_…`),
   `SETUP_ADMIN_EMAILS` = your email.
2. Run the configurator (creates products, the 4 prices, and the webhook
   endpoint; idempotent — safe to re-run):
   ```bash
   curl -X POST "https://flimyasklnzcsenogsup.supabase.co/functions/v1/stripe-setup?webhook=1" \
     -H "Authorization: Bearer <your session JWT>" -H "apikey: <anon key>"
   ```
3. The response contains the webhook **signing secret** (`whsec_…`) — copy it
   into the `STRIPE_WEBHOOK_SECRET` Supabase secret IMMEDIATELY (shown once).

VERIFY: Stripe Dashboard (test mode) → Products shows "Konvertools Pro"
(€25/mo, €210/yr) and "Konvertools Business" (€79/mo, €664/yr);
Developers → Webhooks shows the `…/functions/v1/stripe-webhook` endpoint.

## 2 · Test the full payment flow (TEST mode)
WHO: you · WHERE: the deployed site (incognito)
1. Sign up with a throwaway email → Pricing → **Upgrade to Pro**.
2. On the Stripe Checkout page pay with card `4242 4242 4242 4242`,
   any future date, any CVC.
3. You should land on `/dashboard?upgraded=1`.

VERIFY (SQL):
```sql
select email, plan, stripe_customer_id, stripe_subscription_id,
       stripe_subscription_status, stripe_renews_at
  from public.profiles where email = '<your test email>';
```
Expected: `plan='pro'`, customer + subscription ids set, status `active`.
Then open `/billing` → **Manage billing** → the Stripe portal opens; cancel
from there and check the webhook flips the status (access kept until period
end, then `plan='free'` on `customer.subscription.deleted`).

## 3 · Branding the payment page
WHO: you · WHERE: Stripe Dashboard → **Settings → Branding**
Upload the Konvertools logo + icon, set brand colour — this styles the hosted
Checkout page and the customer portal. Also **Settings → Customer emails**:
enable receipts for successful payments and refunds.

## 4 · Switch to LIVE
WHO: you
1. Activate your Stripe account (business details, bank account for payouts).
2. Re-run step 1 with the **live** key: set `STRIPE_SECRET_KEY` = `sk_live_…`,
   call `stripe-setup?webhook=1` again, put the returned live `whsec_…` into
   `STRIPE_WEBHOOK_SECRET`.
3. That's it — same lookup_keys, so no code or env change anywhere else.

## 5 · End-to-end LIVE smoke test (REAL CARD, small amount)
1. Subscribe to Pro monthly (€25) with a real card.
2. Verify the `profiles` row updates and the Stripe receipt email arrives.
3. Open `/billing` → portal → **cancel** the subscription, and (optionally)
   refund yourself from Dashboard → Payments.

## 6 · Post-launch watch (first 24 h)
- Stripe Dashboard → Developers → Webhooks → the endpoint's delivery log:
  every event should be 200 (failures are retried by Stripe for 3 days).
- Supabase → Edge Functions logs for `stripe-webhook` / `stripe-checkout`.
- Watch Vercel Analytics for any 5xx.

---

## Rollback
- Vercel: instant rollback to the previous deployment (one click).
- Billing kill-switch: set `BILLING_ENABLED = false` in `lib/flags.ts` and
  redeploy — checkout buttons go inert; existing subscriptions keep renewing
  in Stripe until cancelled there.
- DB: migrations are forward-only; write a reverse migration if needed
  (never drop data).
