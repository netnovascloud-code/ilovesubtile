-- =====================================================================
-- Konvertools — link tools (URL shortener, deep/smart link, magic link).
--
-- ONE table backs all three server-side link kinds; the difference is in the
-- create form + how /s/<code> redirects. Light "builder" tools (UTM, mailto…)
-- are pure client-side and don't touch this table.
--
-- Security:
--   • RLS: a signed-in user only ever sees/creates/deletes their OWN links.
--   • Public redirect resolution goes through resolve_link() (SECURITY DEFINER,
--     granted to anon) so a visitor can follow a link WITHOUT any table-wide
--     read access — the function returns only the destination + enforces
--     expiry / one-time limits and bumps the click counter.
-- =====================================================================

create table if not exists public.links (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  code         text not null unique,
  kind         text not null default 'short' check (kind in ('short', 'deep', 'magic')),
  target_url   text not null,          -- destination / web fallback
  ios_url      text,                   -- deep link: iOS app/store url
  android_url  text,                   -- deep link: Android app/store url
  expires_at   timestamptz,            -- magic link: hard expiry
  max_clicks   integer,                -- magic link: e.g. 1 for single-use
  click_count  integer not null default 0,
  created_at   timestamptz not null default now()
);
create index if not exists links_user_idx on public.links (user_id, created_at desc);

alter table public.links enable row level security;
drop policy if exists "links select own" on public.links;
drop policy if exists "links insert own" on public.links;
drop policy if exists "links delete own" on public.links;
create policy "links select own" on public.links for select using ((select auth.uid()) = user_id);
create policy "links insert own" on public.links for insert with check ((select auth.uid()) = user_id);
create policy "links delete own" on public.links for delete using ((select auth.uid()) = user_id);

-- Public resolver used by the /s/<code> redirect route. Returns the destination
-- and whether the link is dead (expired / out of clicks); increments the
-- counter on a live hit. anon may call it; it exposes nothing but the target.
create or replace function public.resolve_link(p_code text)
returns table(kind text, target_url text, ios_url text, android_url text, expired boolean)
language plpgsql
security definer
set search_path = public
as $$
declare r public.links%rowtype;
begin
  select * into r from public.links where code = p_code;
  if not found then
    return; -- no rows → 404 at the route
  end if;
  if (r.expires_at is not null and now() > r.expires_at)
     or (r.max_clicks is not null and r.click_count >= r.max_clicks) then
    return query select r.kind, r.target_url, r.ios_url, r.android_url, true;
    return;
  end if;
  update public.links set click_count = click_count + 1 where id = r.id;
  return query select r.kind, r.target_url, r.ios_url, r.android_url, false;
end;
$$;

revoke execute on function public.resolve_link(text) from public;
grant execute on function public.resolve_link(text) to anon, authenticated;
