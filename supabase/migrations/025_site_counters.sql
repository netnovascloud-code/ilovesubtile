-- Public vanity counters (e.g. total conversions) shown live on the homepage.
-- A tiny key -> bigint store. Reads are public; writes go ONLY through the
-- SECURITY DEFINER bump RPC (no direct INSERT/UPDATE grant), and the per-call
-- increment is clamped so a single call can't wildly inflate the number.
create table if not exists public.site_counters (
  key        text primary key,
  value      bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.site_counters (key, value)
  values ('conversions', 0)
  on conflict (key) do nothing;

alter table public.site_counters enable row level security;

-- Public read (the number is meant to be shown to everyone). Realtime delivers
-- UPDATEs to anon subscribers because this SELECT policy applies to them.
drop policy if exists "site_counters public read" on public.site_counters;
create policy "site_counters public read"
  on public.site_counters for select
  to anon, authenticated
  using (true);

-- Atomic, clamped increment. SECURITY DEFINER so anon can bump without any
-- direct write grant on the table.
create or replace function public.bump_conversions(p_n int default 1)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare v bigint;
begin
  if p_n is null or p_n < 1 then p_n := 1; end if;
  if p_n > 100 then p_n := 100; end if;
  update public.site_counters
     set value = value + p_n, updated_at = now()
   where key = 'conversions'
  returning value into v;
  return v;
end;
$$;

revoke all on function public.bump_conversions(int) from public;
grant execute on function public.bump_conversions(int) to anon, authenticated;

-- Live updates for the homepage counter.
alter publication supabase_realtime add table public.site_counters;
