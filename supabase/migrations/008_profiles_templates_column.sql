-- =====================================================================
-- Konver — declare profiles.templates (repo/live drift fix)
--
-- lib/templates.ts reads/writes profiles.templates (saved tool presets).
-- The column exists in the live DB but was never declared in a repo
-- migration, so a fresh `supabase db reset` / new-environment deploy would
-- fail at runtime. This declares it idempotently.
--
-- Security note: templates is intentionally end-user-editable. The
-- profiles_protect_sensitive trigger (migration 006) preserves only the
-- server-managed columns (plan, credits, …) and deliberately does NOT touch
-- templates, so users can manage their own presets via the existing
-- "profiles update own" RLS policy.
-- =====================================================================

alter table public.profiles add column if not exists templates jsonb not null default '[]'::jsonb;
