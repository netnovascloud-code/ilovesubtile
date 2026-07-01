-- Paddle Billing columns on profiles (parallel to the dormant ls_* columns).
-- Populated by the paddle-webhook function. Nothing reads/writes these until
-- BILLING_ENABLED is flipped on in the app (lib/flags.ts).
alter table public.profiles add column if not exists paddle_customer_id text;
alter table public.profiles add column if not exists paddle_subscription_id text;
alter table public.profiles add column if not exists paddle_subscription_status text;
alter table public.profiles add column if not exists paddle_renews_at timestamptz;
