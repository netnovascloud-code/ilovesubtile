-- =====================================================================
-- Konver — privacy retention: consolidate temp-data purge into one function
--
-- Privacy guarantee: Konver stores NO file or document content — only
-- metadata (tool name, status, file name/size in the `metadata` jsonb, and
-- short-lived signed URLs). Download links expire after 1 hour
-- (send-email edge function), so the windows below never race a live download.
--
-- Context: an ad-hoc cron `konver-purge-fast` already deleted `results`
-- objects (>30 min) and `jobs` rows (>2 h), but it never touched the
-- `uploads` bucket. This migration centralises the logic in one documented
-- function, adds the missing `uploads` purge, and replaces the ad-hoc cron so
-- there is a single source of truth. Everything here is server-side only.
-- =====================================================================

create or replace function public.cleanup_expired_jobs()
returns void
language plpgsql
security definer
set search_path = public, storage
as $$
begin
  -- Job metadata: keep 2 hours.
  delete from public.jobs
   where created_at < now() - interval '2 hours';

  -- Generated results (download artifacts): keep 30 minutes.
  delete from storage.objects
   where bucket_id = 'results'
     and created_at < now() - interval '30 minutes';

  -- Uploaded inputs (pre-processing temp): keep 30 minutes. THIS is the gap
  -- the old ad-hoc cron left open.
  delete from storage.objects
   where bucket_id = 'uploads'
     and created_at < now() - interval '30 minutes';
end;
$$;

-- Only the cron scheduler (function owner) ever calls this — never clients.
revoke execute on function public.cleanup_expired_jobs() from public, anon, authenticated;

-- Replace the ad-hoc inline cron with one that calls the function above.
do $$
declare
  legacy_name text;
begin
  if not exists (select 1 from pg_extension where extname = 'pg_cron') then
    return;
  end if;
  -- Drop every legacy/historic cron name idempotently: the original ad-hoc
  -- inline cron, the post-CaptionFlow Wyrlo-era name (deployed on prod before
  -- the Konver rename), and any prior run of this same migration. Without
  -- this loop, re-running migration 011 on a production DB that already has
  -- the Wyrlo-named cron would leave BOTH crons scheduled simultaneously.
  foreach legacy_name in array array[
    'wyrlo-purge-fast', 'wyrlo_job_retention',
    'konver-purge-fast', 'konver_job_retention'
  ] loop
    if exists (select 1 from cron.job where jobname = legacy_name) then
      perform cron.unschedule(legacy_name);
    end if;
  end loop;
  perform cron.schedule('konver_job_retention', '*/5 * * * *', $cron$ select public.cleanup_expired_jobs(); $cron$);
end;
$$;
