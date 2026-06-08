-- =====================================================================
-- Konver — drop the unused ai_quota_state() RPC introduced in 013.
--
-- The hook (hooks/useAiQuota.ts) reads profiles directly via RLS, so the
-- SECURITY DEFINER wrapper was never called. Dropping it removes the
-- "anon_security_definer_function_executable" advisor warning.
-- =====================================================================

drop function if exists public.ai_quota_state();
