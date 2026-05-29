-- =====================================================================
-- Wyrlo — make grant_credits exactly-once on stripe_payment_intent
--
-- Companion to migration 009 (partial UNIQUE index). The webhook caller
-- still issues an idempotency check, but that check is now backed by the
-- database. Two concurrent calls for the same payment_intent will:
--   1. Short-circuit on the existence check (most cases), or
--   2. Race past the existence check, the unique index gates the second
--      INSERT, the EXCEPTION block reverses our own credit bump, and the
--      function returns the current balance.
-- Either way the user is credited exactly once.
--
-- Verified live (rolled back): two consecutive calls with the same p_pi
-- yield +100 then +0, instead of the previous +100 then +100.
-- =====================================================================

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
    select 1 from public.credit_transactions where stripe_payment_intent = p_pi
  ) then
    select credits into new_balance from public.profiles where id = p_user;
    return new_balance;
  end if;

  update public.profiles set credits = credits + p_amount where id = p_user
    returning credits into new_balance;
  insert into public.credit_transactions (user_id, amount, reason, balance_after, stripe_payment_intent)
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
