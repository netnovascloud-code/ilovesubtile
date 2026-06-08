-- =====================================================================
-- Konvertools — floor the credit balance at 0 in grant_credits.
--
-- A pack refund calls grant_credits(p_amount = -credits). The previous body did
-- `credits = credits + p_amount` with no floor, so refunding a user who had
-- already spent the credits drove profiles.credits NEGATIVE — and spend_credits
-- then permanently rejected every future spend (perm+monthly < amount), locking
-- the account out even after new purchases.
--
-- This redefinition:
--   1. Clamps the balance with greatest(0, …) so a refund can't go negative.
--   2. Fixes the unique_violation handler: the prior version ran a *second*
--      `credits = credits - p_amount` UPDATE, but the failed INSERT already
--      rolled back the block's first UPDATE (plpgsql subtransaction), so that
--      double-subtracted on a duplicate grant. Now it just returns the balance.
-- Idempotency is unchanged (existence check + partial unique index on payment_ref).
-- =====================================================================

create or replace function public.grant_credits(
  p_user uuid, p_amount integer, p_reason text, p_pi text default null
)
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

  update public.profiles set credits = greatest(0, credits + p_amount) where id = p_user
    returning credits into new_balance;
  insert into public.credit_transactions (user_id, amount, reason, balance_after, payment_ref)
  values (p_user, p_amount, p_reason, new_balance, p_pi);
  return new_balance;

exception when unique_violation then
  -- A concurrent grant with the same payment_ref won the race; the block's
  -- UPDATE was rolled back, so the balance is already correct. Just report it.
  select credits into new_balance from public.profiles where id = p_user;
  return new_balance;
end;
$$;

revoke execute on function public.grant_credits(uuid, integer, text, text) from public, anon, authenticated;
