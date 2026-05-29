-- =====================================================================
-- Wyrlo — privacy retention: purge job rows and temp Storage objects
--
-- Privacy guarantee: Wyrlo stores NO file or document content — only
-- metadata (tool name, status, file name/size in `metadata` jsonb, the
-- short-lived signed URLs). To keep even that minimal, every job row and
-- every object in the temporary `uploads`/`results` buckets is hard-deleted
-- two hours after creation. Download links already expire after 1 hour
-- (see the send-email edge function), so a 2-hour purge never races a live
-- download.
--
-- This runs server-side via pg_cron; nothing here is reachable by clients.
-- =====================================================================

create or replace function public.cleanup_expired_jobs()
returns void
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  cutoff timestamptz := now() - interval '2 hours';
begin
  -- 1) Drop job metadata older than the retention window.
  delete from public.jobs where created_at < cutoff;

  -- 2) Drop temporary Storage object rows older than the retention window.
  --    Removing the row makes the object unreachable through the Storage API.
  --    (Physical byte reclamation in the object store is handled separately
  --    by the bucket lifecycle policy; the metadata row is the access path.)
  delete from storage.objects
   where bucket_id in ('uploads', 'results')
     and created_at < cutoff;
end;
$$;

-- Only the cron scheduler (function owner) ever calls this — never clients.
revoke execute on function public.cleanup_expired_jobs() from public, anon, authenticated;

-- Schedule every 15 minutes when pg_cron is available (mirrors migration 003).
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    if exists (select 1 from cron.job where jobname = 'wyrlo_job_retention') then
      perform cron.unschedule('wyrlo_job_retention');
    end if;
    perform cron.schedule('wyrlo_job_retention', '*/15 * * * *', $cron$ select public.cleanup_expired_jobs(); $cron$);
  end if;
end;
$$;
