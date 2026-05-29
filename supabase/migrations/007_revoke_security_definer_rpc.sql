-- =====================================================================
-- Konver — close public RPC exposure of SECURITY DEFINER functions
--
-- The Supabase security advisor flagged several SECURITY DEFINER functions
-- as EXECUTE-able by the anon / authenticated roles through PostgREST
-- (/rest/v1/rpc/<fn>). The critical one was grant_credits: any visitor could
-- POST to /rest/v1/rpc/grant_credits and award themselves unlimited credits.
-- validate_api_key allowed probing API-key hashes; the trigger functions
-- should never be RPC-callable.
--
-- Revoking EXECUTE from public/anon/authenticated closes the RPC surface.
-- Edge Functions call these with the service role (EXECUTE retained), and
-- trigger functions run via the trigger mechanism regardless of grants, so
-- all real functionality is preserved.
--
-- Existence-guarded so a fresh `db reset` never errors (and never rolls back,
-- which would reopen the grant) if a function happens to be absent.
-- =====================================================================

do $$
declare
  fn record;
begin
  for fn in
    select p.oid::regprocedure as sig
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in ('grant_credits','validate_api_key','handle_new_user',
                        'protect_profile_columns','rls_auto_enable')
  loop
    execute format('revoke execute on function %s from public, anon, authenticated;', fn.sig);
  end loop;
end;
$$;
