-- =====================================================================
-- Konvertools — migrate billing from Stripe to Lemon Squeezy.
--
-- Lemon Squeezy is our Merchant of Record (collects + remits VAT worldwide,
-- handles dunning + chargebacks). This migration:
--   1. Renames every stripe_* column to ls_*
--   2. Adds ls_subscription_status + ls_renews_at on profiles
--   3. Creates billing_config — a key/value table the Edge Functions read at
--      runtime for store_id + variant_ids, so onboarding is dashboard-only
--      and rotating a variant doesn't require redeploying functions.
--   4. Recreates the SECURITY DEFINER functions that referenced the old names.
-- =====================================================================

-- ── profiles ─────────────────────────────────────────────────────────
alter table public.profiles rename column stripe_customer_id     to ls_customer_id;
alter table public.profiles rename column stripe_subscription_id to ls_subscription_id;

alter table public.profiles add column if not exists ls_subscription_status text;
alter table public.profiles add column if not exists ls_renews_at           timestamptz;

-- ── subscriptions ────────────────────────────────────────────────────
alter table public.subscriptions rename column stripe_subscription_id to ls_subscription_id;

-- ── credit ledger ────────────────────────────────────────────────────
alter table public.credit_transactions rename column stripe_payment_intent to payment_ref;

-- Rename internal constraint identifiers that still carry "stripe".
do $$
begin
  if exists (select 1 from pg_constraint where conname = 'profiles_stripe_customer_id_key') then
    alter table public.profiles rename constraint profiles_stripe_customer_id_key to profiles_ls_customer_id_key;
  end if;
  if exists (select 1 from pg_constraint where conname = 'profiles_stripe_subscription_id_key') then
    alter table public.profiles rename constraint profiles_stripe_subscription_id_key to profiles_ls_subscription_id_key;
  end if;
  if exists (select 1 from pg_constraint where conname = 'subscriptions_stripe_subscription_id_key') then
    alter table public.subscriptions rename constraint subscriptions_stripe_subscription_id_key to subscriptions_ls_subscription_id_key;
  end if;
end $$;

-- ── billing_config ───────────────────────────────────────────────────
-- Store ID + variant IDs live here. The Edge Functions (service_role) read
-- them on every checkout. RLS denies anon/authenticated entirely.
create table if not exists public.billing_config (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table public.billing_config enable row level security;
-- No policies → only service_role bypasses RLS. anon + authenticated get 0 rows.

revoke all on public.billing_config from public, anon, authenticated;
grant  select, insert, update, delete on public.billing_config to service_role;

-- Pre-seed the store_id we already discovered from the LS API. Variant IDs
-- get inserted after the user creates the 6 products in the LS dashboard.
insert into public.billing_config (key, value) values ('store_id', '397168')
  on conflict (key) do update set value = excluded.value, updated_at = now();

-- ── protect_profile_columns ──────────────────────────────────────────
create or replace function public.protect_profile_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;
  new.plan                   := old.plan;
  new.credits                := old.credits;
  new.monthly_credits        := old.monthly_credits;
  new.monthly_credits_month  := old.monthly_credits_month;
  new.ls_customer_id         := old.ls_customer_id;
  new.ls_subscription_id     := old.ls_subscription_id;
  new.ls_subscription_status := old.ls_subscription_status;
  new.ls_renews_at           := old.ls_renews_at;
  new.daily_usage            := old.daily_usage;
  new.usage_reset_at         := old.usage_reset_at;
  new.id                     := old.id;
  new.created_at             := old.created_at;
  return new;
end;
$$;

drop trigger if exists profiles_protect_sensitive on public.profiles;
create trigger profiles_protect_sensitive
  before update on public.profiles
  for each row execute function public.protect_profile_columns();

-- ── grant_credits: idempotent on payment_ref (was stripe_payment_intent) ──
create or replace function public.grant_credits(p_user uuid, p_amount integer, p_reason text, p_pi text default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_balance integer;
begin
  if p_pi is not null and exists (
    select 1 from public.credit_transactions where payment_ref = p_pi
  ) then
    select credits into new_balance from public.profiles where id = p_user;
    return new_balance;
  end if;

  update public.profiles set credits = credits + p_amount where id = p_user
    returning credits into new_balance;
  insert into public.credit_transactions (user_id, amount, reason, balance_after, payment_ref)
  values (p_user, p_amount, p_reason, new_balance, p_pi);
  return new_balance;

exception when unique_violation then
  update public.profiles set credits = credits - p_amount where id = p_user
    returning credits into new_balance;
  return new_balance;
end;
$$;
revoke execute on function public.grant_credits(uuid, integer, text, text) from public, anon, authenticated;
