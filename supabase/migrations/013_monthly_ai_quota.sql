-- =====================================================================
-- Konver — monthly AI quota counters (Part 6 / Part 7)
--
-- Pro now ships "500 AI conversions / month" and Business "3,000 / month".
-- The free tier keeps its rolling 24-hour `daily_usage` counter (2/day).
-- This adds the two columns the ai-process edge function increments and an
-- RPC the browser can call to read the user's remaining quota without
-- exposing the whole profiles row.
--
-- Reset: month is keyed by UTC "YYYY-MM"; the counter rolls when the month
-- string changes. No cron needed — the edge function flips it on the next
-- run after the month boundary.
-- =====================================================================

alter table public.profiles
  add column if not exists monthly_ai_usage int not null default 0,
  add column if not exists monthly_ai_month text;

-- Read-only RPC: returns plan, daily_usage, monthly_ai_usage and the month
-- the counter is keyed to. SECURITY DEFINER because RLS on profiles blocks
-- the row otherwise; the function reads only the caller's own row.
create or replace function public.ai_quota_state()
returns table (
  plan text,
  daily_usage int,
  daily_resets_at timestamptz,
  monthly_ai_usage int,
  monthly_ai_month text
)
language sql
security definer
set search_path = public
as $$
  select
    p.plan,
    p.daily_usage,
    p.usage_reset_at + interval '24 hours' as daily_resets_at,
    p.monthly_ai_usage,
    p.monthly_ai_month
  from public.profiles p
  where p.id = auth.uid();
$$;

revoke all on function public.ai_quota_state() from public;
grant execute on function public.ai_quota_state() to authenticated;
