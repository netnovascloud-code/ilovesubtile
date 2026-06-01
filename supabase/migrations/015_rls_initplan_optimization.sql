-- Performance: wrap auth.uid() in a scalar subselect so Postgres evaluates it
-- ONCE per query instead of re-running it for every row (Supabase advisor
-- 0003, auth_rls_initplan). Behaviour is identical — only the query plan
-- improves at scale. Applied via MCP apply_migration; kept here for parity.

alter policy "profiles read own"      on public.profiles            using ((select auth.uid()) = id);
alter policy "profiles update own"    on public.profiles            using ((select auth.uid()) = id);
alter policy "jobs read own"          on public.jobs                using ((select auth.uid()) = user_id);
alter policy "jobs insert own"        on public.jobs                with check ((select auth.uid()) = user_id);
alter policy "subscriptions read own" on public.subscriptions       using ((select auth.uid()) = user_id);
alter policy "api_keys read own"      on public.api_keys            using ((select auth.uid()) = user_id);
alter policy "credit_tx read own"     on public.credit_transactions using ((select auth.uid()) = user_id);
