-- =====================================================================
-- Konvertools — close a quota-bypass hole left open by migration 013.
--
-- Migration 006/019 added profiles_protect_sensitive: a BEFORE UPDATE
-- trigger that pins every *server-managed* column to its OLD value whenever
-- an end-user (auth.uid() IS NOT NULL) updates their own profile row via the
-- "profiles update own" RLS policy. Service-role writes (auth.uid() IS NULL,
-- i.e. edge functions / webhooks) keep full control.
--
-- THE GAP: migration 013 later added the AI-quota counters
--   monthly_ai_usage, monthly_ai_month
-- and the security-tools edge function writes a rolling-quota column
--   usage_buckets
-- NONE of these were added to the protect trigger. Because RLS cannot do
-- column-level restriction, any signed-in user could PATCH their own profile
-- over PostgREST, e.g.
--   PATCH /rest/v1/profiles?id=eq.<own-uid>  { "monthly_ai_usage": 0 }
-- and reset the counter the ai-process / ai-vision functions enforce — i.e.
-- bypass the paid plan's monthly AI cap (Pro 500, Business 3000) entirely, or
-- reset the free phishing-detector daily cap (usage_buckets). That is a direct
-- cost / revenue leak.
--
-- This migration:
--   1. Declares usage_buckets idempotently (repo/live drift — the column is
--      used by supabase/functions/security-tools but was never in a migration,
--      so a fresh `supabase db reset` had no such column and silently
--      fail-opened the phishing quota). Same class of fix as migration 008
--      did for the templates column.
--   2. Re-creates protect_profile_columns() to also pin monthly_ai_usage,
--      monthly_ai_month and usage_buckets to their OLD values for end-users.
-- =====================================================================

-- 1) Declare the rolling-quota column used by the security-tools function.
alter table public.profiles
  add column if not exists usage_buckets jsonb not null default '{}'::jsonb;

-- 2) Extend the protection trigger to the AI-quota + rolling-quota columns.
create or replace function public.protect_profile_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Service-role / edge-function writes run with no auth context: leave them
  -- untouched so legitimate quota bookkeeping and billing updates go through.
  if auth.uid() is null then
    return new;
  end if;
  -- End-user UPDATE via RLS: pin every server-managed column to its old value.
  new.plan                   := old.plan;
  new.credits                := old.credits;
  new.monthly_credits        := old.monthly_credits;
  new.monthly_credits_month  := old.monthly_credits_month;
  new.monthly_ai_usage       := old.monthly_ai_usage;
  new.monthly_ai_month       := old.monthly_ai_month;
  new.usage_buckets          := old.usage_buckets;
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
