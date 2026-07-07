-- Stripe billing columns on profiles. Populated by the stripe-webhook function.
-- Replaces the dormant ls_* columns as the live billing state (those stay in
-- place, unused, per the no-destructive-migrations rule).
alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists stripe_subscription_id text;
alter table public.profiles add column if not exists stripe_subscription_status text;
alter table public.profiles add column if not exists stripe_renews_at timestamptz;

-- The webhook looks profiles up by customer id on subscription events.
create index if not exists profiles_stripe_customer_idx
  on public.profiles (stripe_customer_id)
  where stripe_customer_id is not null;
