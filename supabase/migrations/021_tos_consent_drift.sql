-- =====================================================================
-- Konvertools — declare the ToS/consent schema idempotently (repo/live drift).
--
-- app/auth/callback/route.ts records GDPR consent at first login via
--   supabase.rpc("ensure_tos_acceptance", { p_user, p_ts, p_marketing })
-- which writes profiles.tos_accepted_at + profiles.marketing_opt_in. Those two
-- columns and the function exist in the live DB (applied via MCP) but were
-- never committed to a repo migration. So a fresh `supabase db reset` /
-- new-environment deploy has neither — and because the callback swallows the
-- RPC error ("best-effort"), consent is then SILENTLY never recorded. Same
-- drift class as migration 008 (templates) and 020 (usage_buckets).
--
-- SAFE ON PROD: columns use ADD COLUMN IF NOT EXISTS, and the function is
-- created ONLY IF ABSENT, so the live definition is never overwritten.
-- =====================================================================

alter table public.profiles
  add column if not exists tos_accepted_at  timestamptz,
  add column if not exists marketing_opt_in boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'ensure_tos_acceptance'
  ) then
    -- Records the caller's ToS acceptance + marketing choice. tos_accepted_at
    -- is set once (coalesce keeps the first acceptance); marketing_opt_in is
    -- sticky once granted. A signed-in user may only stamp their OWN row;
    -- service-role callers (auth.uid() null) may stamp any row.
    create function public.ensure_tos_acceptance(
      p_user uuid, p_ts timestamptz, p_marketing boolean
    )
    returns void
    language plpgsql
    security definer
    set search_path = public
    as $fn$
    begin
      update public.profiles
         set tos_accepted_at  = coalesce(tos_accepted_at, p_ts),
             marketing_opt_in = marketing_opt_in or coalesce(p_marketing, false)
       where id = p_user
         and (auth.uid() is null or auth.uid() = p_user);
    end;
    $fn$;

    revoke execute on function public.ensure_tos_acceptance(uuid, timestamptz, boolean) from public, anon;
    grant  execute on function public.ensure_tos_acceptance(uuid, timestamptz, boolean) to authenticated, service_role;
  end if;
end;
$$;
