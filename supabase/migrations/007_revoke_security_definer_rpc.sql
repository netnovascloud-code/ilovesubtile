-- =====================================================================
-- Wyrlo — close public RPC exposure of SECURITY DEFINER functions
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
-- =====================================================================

revoke execute on function public.grant_credits(uuid, integer, text, text) from public, anon, authenticated;
revoke execute on function public.validate_api_key(text) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.protect_profile_columns() from public, anon, authenticated;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
