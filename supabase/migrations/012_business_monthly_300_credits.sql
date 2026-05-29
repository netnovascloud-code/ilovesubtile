-- =====================================================================
-- Konver — Business monthly grant: bump 200 → 300 credits
--
-- The Business plan now includes 300 included credits/month (was 200).
-- Migration 003 hardcodes the old value, so we redeclare grant_business_monthly
-- here with the new amount. The function is idempotent within a calendar
-- month (the WHERE clause skips users whose monthly_credits_month already
-- matches the current month), so this migration won't double-credit anyone
-- who was already topped up earlier in the month.
-- =====================================================================

create or replace function public.grant_business_monthly()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  this_month text := to_char(now() at time zone 'utc', 'YYYY-MM');
  affected integer;
begin
  with updated as (
    update public.profiles
      set monthly_credits = 300, monthly_credits_month = this_month
    where plan = 'business'
      and (monthly_credits_month is distinct from this_month)
    returning id
  )
  insert into public.credit_transactions (user_id, amount, reason, balance_after)
  select u.id, 300, 'business_monthly_grant', p.credits + 300
  from updated u join public.profiles p on p.id = u.id;
  get diagnostics affected = row_count;
  return affected;
end;
$$;
revoke execute on function public.grant_business_monthly() from public, anon, authenticated;
