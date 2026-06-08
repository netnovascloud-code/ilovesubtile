# Konvertools — Go-Live Runbook

Step-by-step actions to switch the production stack from test mode to live.
Each step says **WHO**, **WHERE**, **WHAT**, and a verification command.

---

## 0 · Prerequisites
- [ ] Vercel project `ilovesubtile` on the `main` branch is deploying green.
- [ ] Supabase project `flimyasklnzcsenogsup` (CaptionFlow) health: green.
- [ ] Custom domain `konvertools.com` (and `konver.app`) points to Vercel.
- [ ] DNS for emails (Resend SPF/DKIM) verified.

## 1 · Test the full payment flow (TEST MODE first)
WHO: you · WHERE: konvertools.com (incognito)
1. Sign up with a throwaway email.
2. Click **Upgrade Pro** → redirected to `konvertools.lemonsqueezy.com/checkout/...`
3. Pay with `4242 4242 4242 4242`, any future date, any CVC, any billing address.
4. You should be redirected to `/dashboard?upgraded=1`.

VERIFY (SQL, via the project's SQL editor):
```sql
select email, plan, ls_subscription_id, ls_subscription_status, ls_renews_at
  from public.profiles
 where email = '<your test email>';
```
Expected: `plan='pro'`, `ls_subscription_id` non-null, `ls_subscription_status='active'`.

If the row didn't update, check edge function logs for `lemonsqueezy-webhook`.

## 2 · Lemon Squeezy dashboard — switch to LIVE
WHO: you · WHERE: app.lemonsqueezy.com
1. **Settings → Stores → KonverTools** → toggle Test mode **OFF**.
2. **Settings → API** → rotate the API key (live now). Copy it.
3. **Settings → Webhooks** → create a new webhook (live):
   - URL: `https://flimyasklnzcsenogsup.supabase.co/functions/v1/lemonsqueezy-webhook`
   - Generate signing secret. Copy it.
   - Tick at least: `subscription_created`, `subscription_updated`,
     `subscription_cancelled`, `subscription_expired`,
     `subscription_payment_success`, `subscription_payment_refunded`,
     `order_created`, `order_refunded`.
4. **Settings → Customer portal** → enable: Cancel subscriptions, Update plan,
   Update payment method.
5. **Settings → Emails** → enable Order confirmation + Subscription receipts,
   set logo + brand colour.
6. **Store → Design** → upload logo, set brand colour, white background.
7. **Store → Products → each of the 6** → upload a product image (Media).
   This fills the empty left column on the checkout page.

## 3 · Update Supabase Edge Function secrets to LIVE
WHO: you · WHERE: Supabase Dashboard → Project Settings → Edge Functions → Secrets
- `LEMONSQUEEZY_API_KEY` → paste the LIVE API key from step 2.2
- `LEMONSQUEEZY_WEBHOOK_SECRET` → paste the LIVE signing secret from step 2.3

## 4 · Re-discover LIVE variant IDs
WHO: Claude (or you, via the deployed function) · WHERE: Supabase
The variant IDs in `public.billing_config` were captured in TEST mode and
will likely differ in LIVE. Run the discovery once:
```sql
-- as service_role (SQL editor):
select net.http_get(
  'https://flimyasklnzcsenogsup.supabase.co/functions/v1/lemonsqueezy-setup',
  headers := jsonb_build_object('Authorization', 'Bearer ' || current_setting('supabase.admin_key', true))
) as req_id;
```
(Or sign in to konvertools and `GET /functions/v1/lemonsqueezy-setup` with
the session JWT — same effect.)

VERIFY:
```sql
select key, value, updated_at from public.billing_config order by key;
```
9 rows expected: store_id + 8 variant_*. updated_at should be recent.

## 5 · End-to-end LIVE smoke test (REAL CARD, small amount)
WHO: you
1. Sign up with a real email.
2. Buy the **Starter Pack** (€12, smallest live transaction).
3. Verify the row in `profiles` updates and you receive the LS receipt email.
4. Open `/billing` → click **Manage billing** → portal opens, cancel/refund
   yourself from there.

## 6 · Cleanup
WHO: Claude or you
- Delete the obsolete edge functions from the Supabase dashboard (MCP can't):
  - `stripe-checkout`, `stripe-portal`, `stripe-webhook`, `ls-diagnostic`
- Purge test profiles created during smoke tests (SQL):
  ```sql
  delete from auth.users where email in ('<test1>', '<test2>');
  -- cascade deletes from public.profiles via FK.
  ```

## 7 · DNS + Vercel — flip to production
WHO: you · WHERE: Vercel + DNS provider
- Merge `claude/vibrant-noether-4ISSI` into `main` (Vercel auto-deploys).
- Verify `konvertools.com` serves the new build.
- Hit a few pages: `/`, `/pricing`, `/dashboard`, `/billing`.

## 8 · Post-launch watch (first 24 h)
- Tail `lemonsqueezy-webhook` logs — every payment should be 200.
- Tail `lemonsqueezy-checkout` logs — every Subscribe click should be 200.
- Watch Vercel Analytics for any 5xx.

---

## Rollback
If a critical bug surfaces post-launch:
- Vercel: instant rollback to the previous deployment (one click).
- DB: migrations are forward-only. If a schema change broke prod, write a
  reverse migration (don't `drop` data — `add column nullable` instead).
- Edge functions: the MCP `deploy_edge_function` always creates a new
  version; previous versions can be re-deployed from the dashboard.
