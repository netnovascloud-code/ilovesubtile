-- =====================================================================
-- Wyrlo — per-API-key rate limiting (sliding 60s window)
--
-- Cheap, race-safe counter stored on the key row itself. Each call hits
-- api_rate_hit(); when the window's count exceeds the limit it returns
-- allowed=false plus how many seconds until the window resets (→ HTTP 429).
-- =====================================================================

alter table public.api_keys add column if not exists window_start timestamptz;
alter table public.api_keys add column if not exists window_count integer not null default 0;

create or replace function public.api_rate_hit(p_key_id uuid, p_limit integer, p_window_secs integer default 60)
returns table(allowed boolean, retry_after integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  ws timestamptz;
  wc integer;
  now_ts timestamptz := now();
begin
  select window_start, window_count into ws, wc from public.api_keys where id = p_key_id for update;

  -- Fresh window (first call or the previous window has elapsed).
  if ws is null or now_ts - ws >= make_interval(secs => p_window_secs) then
    update public.api_keys set window_start = now_ts, window_count = 1 where id = p_key_id;
    return query select true, 0;
    return;
  end if;

  if wc >= p_limit then
    return query select false, greatest(1, ceil(extract(epoch from (ws + make_interval(secs => p_window_secs) - now_ts)))::int);
    return;
  end if;

  update public.api_keys set window_count = wc + 1 where id = p_key_id;
  return query select true, 0;
end;
$$;
revoke execute on function public.api_rate_hit(uuid, integer, integer) from public, anon, authenticated;
