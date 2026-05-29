-- =====================================================================
-- Konver — Business plan monthly credit grant (200 credits, expiring)
--
-- Purchased credits (profiles.credits) never expire. Business subscribers
-- additionally receive 200 credits on the 1st of each month that expire at
-- month end. These live in a separate bucket so the two never mix.
--
-- Spend order: monthly (expiring) first, then permanent — so the free
-- monthly allowance is always used before paid credits.
-- =====================================================================

alter table public.profiles add column if not exists monthly_credits integer not null default 0;
-- The calendar month (YYYY-MM, UTC) the monthly_credits belong to. When the
-- current month differs, the bucket is treated as 0 (lazily expired on read/spend).
alter table public.profiles add column if not exists monthly_credits_month text;

-- Effective, spendable balance = permanent + (monthly if still this month).
create or replace function public.available_credits(p_user uuid)
returns integer
language sql
security definer
set search_path = public
as $$
  select credits + case
    when monthly_credits_month = to_char(now() at time zone 'utc', 'YYYY-MM') then monthly_credits
    else 0
  end
  from public.profiles where id = p_user;
$$;
revoke execute on function public.available_credits(uuid) from public, anon, authenticated;

-- Atomically spend credits, monthly bucket first, then permanent.
-- Returns the new TOTAL spendable balance. Backward-compatible signature.
create or replace function public.spend_credits(p_user uuid, p_amount integer, p_reason text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  perm integer;
  monthly integer;
  mmonth text;
  this_month text := to_char(now() at time zone 'utc', 'YYYY-MM');
  from_monthly integer;
  from_perm integer;
  new_total integer;
begin
  select credits, monthly_credits, monthly_credits_month
    into perm, monthly, mmonth
  from public.profiles where id = p_user for update;
  if perm is null then raise exception 'no_profile'; end if;

  -- Lazily expire a stale monthly bucket.
  if mmonth is distinct from this_month then monthly := 0; end if;

  if (perm + monthly) < p_amount then raise exception 'insufficient_credits'; end if;

  from_monthly := least(monthly, p_amount);
  from_perm := p_amount - from_monthly;
  new_total := (perm - from_perm) + (monthly - from_monthly);

  update public.profiles
    set credits = perm - from_perm,
        monthly_credits = monthly - from_monthly,
        monthly_credits_month = this_month
  where id = p_user;

  insert into public.credit_transactions (user_id, amount, reason, balance_after)
  values (p_user, -p_amount, p_reason, new_total);
  return new_total;
end;
$$;
revoke execute on function public.spend_credits(uuid, integer, text) from public, anon, authenticated;

-- Grant the monthly Business allowance. Idempotent within a month: re-running
-- tops the bucket back up to 200 only if it wasn't already granted this month.
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
      set monthly_credits = 200, monthly_credits_month = this_month
    where plan = 'business'
      and (monthly_credits_month is distinct from this_month)
    returning id
  )
  insert into public.credit_transactions (user_id, amount, reason, balance_after)
  select u.id, 200, 'business_monthly_grant', p.credits + 200
  from updated u join public.profiles p on p.id = u.id;
  get diagnostics affected = row_count;
  return affected;
end;
$$;
revoke execute on function public.grant_business_monthly() from public, anon, authenticated;

-- Schedule the grant for 00:05 UTC on the 1st of every month (pg_cron).
do $$
declare
  legacy_name text;
begin
  if not exists (select 1 from pg_extension where extname = 'pg_cron') then
    return;
  end if;
  -- Drop legacy names idempotently (Wyrlo-era prod cron + a prior run of this
  -- migration under the new name) before scheduling, so re-running this
  -- migration never leaves two crons running side by side.
  foreach legacy_name in array array['wyrlo_business_monthly', 'konver_business_monthly'] loop
    if exists (select 1 from cron.job where jobname = legacy_name) then
      perform cron.unschedule(legacy_name);
    end if;
  end loop;
  perform cron.schedule('konver_business_monthly', '5 0 1 * *', $cron$ select public.grant_business_monthly(); $cron$);
end;
$$;
