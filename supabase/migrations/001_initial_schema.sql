-- =====================================================================
-- CaptionFlow — initial schema
-- =====================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- profiles : extends auth.users with plan + Stripe linkage + usage
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id                     uuid primary key references auth.users on delete cascade,
  email                  text,
  full_name              text,
  avatar_url             text,
  plan                   text not null default 'free' check (plan in ('free', 'pro', 'business')),
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  daily_usage            integer not null default 0,
  usage_reset_at         timestamptz not null default now(),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists profiles_plan_idx on public.profiles (plan);

-- Auto-create profile on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- The trigger runs as the function owner regardless of GRANTs, so we revoke
-- EXECUTE from public/anon/authenticated to keep the function from being
-- callable via /rest/v1/rpc/handle_new_user.
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;

-- ---------------------------------------------------------------------
-- jobs : one row per tool invocation
-- ---------------------------------------------------------------------
create table if not exists public.jobs (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users on delete set null,
  tool              text not null,
  status            text not null default 'pending' check (status in ('pending', 'processing', 'done', 'error')),
  input_file_url    text,
  output_file_url   text,
  language_source   text,
  language_target   text,
  metadata          jsonb not null default '{}'::jsonb,
  error_message     text,
  created_at        timestamptz not null default now(),
  completed_at      timestamptz
);

create index if not exists jobs_user_id_idx     on public.jobs (user_id, created_at desc);
create index if not exists jobs_status_idx      on public.jobs (status);
create index if not exists jobs_tool_idx        on public.jobs (tool);

-- ---------------------------------------------------------------------
-- subscriptions : mirror of Stripe state for fast reads
-- ---------------------------------------------------------------------
create table if not exists public.subscriptions (
  id                      uuid primary key default uuid_generate_v4(),
  user_id                 uuid not null references auth.users on delete cascade,
  stripe_subscription_id  text unique,
  plan                    text not null check (plan in ('pro', 'business')),
  status                  text not null,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index if not exists subscriptions_user_idx on public.subscriptions (user_id);

-- ---------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.jobs          enable row level security;
alter table public.subscriptions enable row level security;

-- profiles
drop policy if exists "profiles read own"   on public.profiles;
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles read own"   on public.profiles for select using (auth.uid() = id);
create policy "profiles update own" on public.profiles for update using (auth.uid() = id);

-- jobs
drop policy if exists "jobs read own"   on public.jobs;
drop policy if exists "jobs insert own" on public.jobs;
create policy "jobs read own"   on public.jobs for select using (auth.uid() = user_id);
create policy "jobs insert own" on public.jobs for insert with check (auth.uid() = user_id or user_id is null);

-- subscriptions (read-only for the user; Edge Functions write via service role)
drop policy if exists "subscriptions read own" on public.subscriptions;
create policy "subscriptions read own" on public.subscriptions for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false),
       ('results', 'results', false)
on conflict (id) do nothing;

-- Each authenticated user can read/write their own folder inside both buckets.
drop policy if exists "uploads user rw" on storage.objects;
create policy "uploads user rw" on storage.objects
  for all
  using (bucket_id in ('uploads', 'results') and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id in ('uploads', 'results') and (storage.foldername(name))[1] = auth.uid()::text);
