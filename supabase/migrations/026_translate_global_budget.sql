-- Global monthly character budget for the Google translator, so total usage
-- across ALL users can never exceed Google's free tier (500k/month). Only the
-- service role (which bypasses RLS) touches this table.
create table if not exists public.usage_global (
  key text primary key,
  month text not null,
  chars bigint not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.usage_global enable row level security;

-- Atomically reserve p_chars against the monthly budget p_cap. Resets when the
-- UTC month rolls over. Returns true if the chars were consumed (under cap),
-- false if the budget for this month is exhausted.
create or replace function public.translate_consume(p_chars integer, p_cap bigint, p_month text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  cur_month text;
  cur_chars bigint;
begin
  insert into public.usage_global(key, month, chars)
    values ('translate', p_month, 0)
    on conflict (key) do nothing;
  select month, chars into cur_month, cur_chars
    from public.usage_global where key = 'translate' for update;
  if cur_month is distinct from p_month then
    update public.usage_global set month = p_month, chars = p_chars, updated_at = now() where key = 'translate';
    return true;
  end if;
  if cur_chars + p_chars > p_cap then
    return false;
  end if;
  update public.usage_global set chars = cur_chars + p_chars, updated_at = now() where key = 'translate';
  return true;
end;
$$;

revoke all on function public.translate_consume(integer, bigint, text) from public, anon, authenticated;
