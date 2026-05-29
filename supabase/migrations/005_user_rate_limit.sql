-- =====================================================================
-- Wyrlo — per-user generic rate limiter (used for send-email, etc.)
--
-- One row per (user, bucket). Race-safe sliding-window counter exposed
-- via the user_rate_hit() SECURITY DEFINER RPC. RLS is enabled but no
-- end-user policies exist — writes happen only via the RPC.
-- =====================================================================

create table if not exists public.user_rate_limits (
  user_id      uuid not null references auth.users on delete cascade,
  bucket       text not null,
  window_start timestamptz not null default now(),
  window_count integer not null default 0,
  primary key (user_id, bucket)
);

alter table public.user_rate_limits enable row level security;

create or replace function public.user_rate_hit(
  p_user uuid,
  p_bucket text,
  p_limit integer,
  p_window_secs integer default 60
) returns table(allowed boolean, retry_after integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  ws timestamptz;
  wc integer;
  now_ts timestamptz := now();
begin
  insert into public.user_rate_limits (user_id, bucket, window_start, window_count)
  values (p_user, p_bucket, now_ts, 0)
  on conflict (user_id, bucket) do nothing;

  select window_start, window_count into ws, wc
    from public.user_rate_limits where user_id = p_user and bucket = p_bucket for update;

  if ws is null or now_ts - ws >= make_interval(secs => p_window_secs) then
    update public.user_rate_limits
       set window_start = now_ts, window_count = 1
     where user_id = p_user and bucket = p_bucket;
    return query select true, 0;
    return;
  end if;

  if wc >= p_limit then
    return query select false,
      greatest(1, ceil(extract(epoch from (ws + make_interval(secs => p_window_secs) - now_ts)))::int);
    return;
  end if;

  update public.user_rate_limits
     set window_count = wc + 1
   where user_id = p_user and bucket = p_bucket;
  return query select true, 0;
end;
$$;
revoke execute on function public.user_rate_hit(uuid, text, integer, integer) from public, anon, authenticated;
