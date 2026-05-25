-- =====================================================================
-- CaptionFlow — API keys, credits and the credit ledger
-- =====================================================================

-- Credits balance on the profile
alter table public.profiles add column if not exists credits integer not null default 0;

-- API keys (Business plan). We store only a SHA-256 hash + a display prefix;
-- the raw key is shown to the user exactly once at creation time.
create table if not exists public.api_keys (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users on delete cascade,
  name         text not null default 'Default',
  key_hash     text not null unique,
  key_prefix   text not null,
  last_used_at timestamptz,
  revoked      boolean not null default false,
  created_at   timestamptz not null default now()
);
create index if not exists api_keys_user_idx on public.api_keys (user_id);
create index if not exists api_keys_hash_idx on public.api_keys (key_hash) where revoked = false;

-- Credit ledger: positive = purchase/grant, negative = usage.
create table if not exists public.credit_transactions (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid not null references auth.users on delete cascade,
  amount                integer not null,
  reason                text not null,
  balance_after         integer not null,
  stripe_payment_intent text,
  created_at            timestamptz not null default now()
);
create index if not exists credit_tx_user_idx on public.credit_transactions (user_id, created_at desc);

-- RLS — users read their own keys (hash never exposed) and ledger.
-- Writes happen via the service role inside Edge Functions only.
alter table public.api_keys enable row level security;
alter table public.credit_transactions enable row level security;

drop policy if exists "api_keys read own" on public.api_keys;
create policy "api_keys read own" on public.api_keys for select using (auth.uid() = user_id);

drop policy if exists "credit_tx read own" on public.credit_transactions;
create policy "credit_tx read own" on public.credit_transactions for select using (auth.uid() = user_id);

-- Atomically spend credits + append a ledger row.
create or replace function public.spend_credits(p_user uuid, p_amount integer, p_reason text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  current_balance integer;
  new_balance integer;
begin
  select credits into current_balance from public.profiles where id = p_user for update;
  if current_balance is null then raise exception 'no_profile'; end if;
  if current_balance < p_amount then raise exception 'insufficient_credits'; end if;
  new_balance := current_balance - p_amount;
  update public.profiles set credits = new_balance where id = p_user;
  insert into public.credit_transactions (user_id, amount, reason, balance_after)
  values (p_user, -p_amount, p_reason, new_balance);
  return new_balance;
end;
$$;
revoke execute on function public.spend_credits(uuid, integer, text) from public, anon, authenticated;

-- Grant credits (purchase / signup bonus) + ledger row.
create or replace function public.grant_credits(p_user uuid, p_amount integer, p_reason text, p_pi text default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_balance integer;
begin
  update public.profiles set credits = credits + p_amount where id = p_user
    returning credits into new_balance;
  insert into public.credit_transactions (user_id, amount, reason, balance_after, stripe_payment_intent)
  values (p_user, p_amount, p_reason, new_balance, p_pi);
  return new_balance;
end;
$$;
revoke execute on function public.grant_credits(uuid, integer, text, text) from public, anon, authenticated;
