-- =====================================================================
-- Konvertools — migrate billing from Stripe to Lemon Squeezy
--
-- Lemon Squeezy is now our Merchant of Record. This migration removes every
-- Stripe reference from the schema:
--   • profiles.stripe_customer_id      → profiles.ls_customer_id
--   • profiles.stripe_subscription_id  → profiles.ls_subscription_id
--   • + profiles.ls_subscription_status, profiles.ls_renews_at  (new)
--   • subscriptions.stripe_subscription_id → subscriptions.ls_subscription_id
--   • credit_transactions.stripe_payment_intent → credit_transactions.payment_ref
--
-- Column renames automatically carry their indexes (incl. the partial UNIQUE
-- predicate) along, but the SECURITY DEFINER functions reference column names
-- in their bodies, so grant_credits() and protect_profile_columns() are
-- recreated against the new names.
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

-- Rename internal constraint/index identifiers that still carry "stripe"
-- (cosmetic — these are not referenced by the app, but the brand should be
-- gone from the DB entirely). Guarded so the migration is safe on any history.
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

-- ── protect_profile_columns: server-managed columns end-users cannot set ──
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

-- Trigger definition is unchanged (same function name); recreate for safety.
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
  -- Short-circuit if this payment is already recorded.
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

-- Concurrent webhook delivery won the race on the partial UNIQUE index.
-- Roll back our own credit bump and return the current balance.
exception when unique_violation then
  update public.profiles set credits = credits - p_amount where id = p_user
    returning credits into new_balance;
  return new_balance;
end;
$$;
revoke execute on function public.grant_credits(uuid, integer, text, text) from public, anon, authenticated;
