-- =====================================================================
-- Wyrlo — close two RLS escalation paths
--
-- 1) profiles UPDATE policy was column-blind. End-users could set their
--    own plan='business', credits=999999, monthly_credits=999999, etc.
--    This trigger preserves the OLD values of every server-managed
--    column when an end-user (auth.uid() is not null) does the UPDATE.
--    Service-role calls (auth.uid() is null) keep full control — that's
--    how Stripe webhooks / edge functions legitimately update plan/credits.
--
-- 2) jobs INSERT policy used "auth.uid() = user_id OR user_id is null",
--    letting anonymous holders of the anon key spam-insert orphan jobs.
--    Edge functions write via service role and bypass RLS, so dropping
--    the null branch only affects untrusted clients.
-- =====================================================================

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
  new.stripe_customer_id     := old.stripe_customer_id;
  new.stripe_subscription_id := old.stripe_subscription_id;
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

-- Tighten jobs insert policy.
drop policy if exists "jobs insert own" on public.jobs;
create policy "jobs insert own"
  on public.jobs
  for insert
  to authenticated
  with check (auth.uid() = user_id);
