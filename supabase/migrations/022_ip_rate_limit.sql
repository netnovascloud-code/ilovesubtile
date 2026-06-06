-- =====================================================================
-- Konvertools — per-IP rate limit for ANONYMOUS AI calls.
--
-- ai-process / ai-vision / security-tools(analyze_phishing) accept anonymous
-- traffic (the public anon key). Per-user monthly/daily quotas only apply to
-- signed-in users; anonymous usage was gated CLIENT-SIDE only. CORS and the
-- client gate do NOT stop a direct server-to-server POST with the (public)
-- anon key, so the AI endpoints could be driven without bound — unbounded
-- Mistral cost. This adds a cheap server-side per-IP sliding-window limiter
-- the edge functions call for anonymous callers (fail-open on any error so a
-- bookkeeping glitch never blocks a real user).
--
-- Keyed by (ip, bucket) — IP is a free-form string, so this is a sibling of
-- user_rate_limits (migration 005) rather than reusing its uuid key.
-- =====================================================================

create table if not exists public.ip_rate_limits (
  ip           text not null,
  bucket       text not null,
  window_start timestamptz not null default now(),
  window_count integer not null default 0,
  primary key (ip, bucket)
);

alter table public.ip_rate_limits enable row level security;
-- No policies → only service_role (the edge functions) ever touches it.
revoke all on public.ip_rate_limits from public, anon, authenticated;

create or replace function public.ip_rate_hit(
  p_ip text,
  p_bucket text,
  p_limit integer,
  p_window_secs integer default 3600
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
  -- No identifiable IP → don't gate (avoid blocking when the proxy header is
  -- absent; signed-in users have their own per-account quota anyway).
  if p_ip is null or p_ip = '' then
    return query select true, 0;
    return;
  end if;

  insert into public.ip_rate_limits (ip, bucket, window_start, window_count)
  values (p_ip, p_bucket, now_ts, 0)
  on conflict (ip, bucket) do nothing;

  select window_start, window_count into ws, wc
    from public.ip_rate_limits where ip = p_ip and bucket = p_bucket for update;

  if ws is null or now_ts - ws >= make_interval(secs => p_window_secs) then
    update public.ip_rate_limits
       set window_start = now_ts, window_count = 1
     where ip = p_ip and bucket = p_bucket;
    return query select true, 0;
    return;
  end if;

  if wc >= p_limit then
    return query select false,
      greatest(1, ceil(extract(epoch from (ws + make_interval(secs => p_window_secs) - now_ts)))::int);
    return;
  end if;

  update public.ip_rate_limits
     set window_count = wc + 1
   where ip = p_ip and bucket = p_bucket;
  return query select true, 0;
end;
$$;

revoke execute on function public.ip_rate_hit(text, text, integer, integer) from public, anon, authenticated;

-- Bounded growth: purge idle IP counters daily (guard on pg_cron presence,
-- mirroring migration 011). Re-runnable: unschedule any prior copy first.
do $$
begin
  if not exists (select 1 from pg_extension where extname = 'pg_cron') then
    return;
  end if;
  if exists (select 1 from cron.job where jobname = 'konver_ip_rate_purge') then
    perform cron.unschedule('konver_ip_rate_purge');
  end if;
  perform cron.schedule('konver_ip_rate_purge', '17 * * * *',
    $cron$ delete from public.ip_rate_limits where window_start < now() - interval '1 day'; $cron$);
end;
$$;
