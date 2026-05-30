import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const LOCALES = new Set([
  "fr", "es", "pt", "de", "it", "nl", "ja", "zh", "ko", "ar", "ru", "hi",
  "tr", "id", "vi", "sv", "pl", "uk", "cs",
]);
// Named per Next.js convention so it lines up with the standard ecosystem.
// We also read the legacy "wyrlo_locale" cookie so users who picked a language
// before the Konver rename don't lose their preference on next visit.
const LOCALE_COOKIE = "NEXT_LOCALE";
const LEGACY_LOCALE_COOKIE = "wyrlo_locale";

/** Pick the best supported locale from a cookie or Accept-Language header. */
function preferredLocale(request: NextRequest): string | null {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
    ?? request.cookies.get(LEGACY_LOCALE_COOKIE)?.value;
  if (cookie === "en") return null;
  if (cookie && LOCALES.has(cookie)) return cookie;
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (!tag) continue;
    if (tag.startsWith("en")) return null;
    const base = tag.split("-")[0];
    if (LOCALES.has(base)) return base;
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const response = await updateSupabaseSession(request);
  const { pathname } = request.nextUrl;

  // Locale auto-redirect: only on the English root. Once the user is on a
  // localised path, leave them be — the chosen language never changes mid-navigation.
  if (pathname === "/") {
    const target = preferredLocale(request);
    if (target) {
      const url = request.nextUrl.clone();
      url.pathname = `/${target}`;
      const r = NextResponse.redirect(url);
      r.cookies.set(LOCALE_COOKIE, target, { maxAge: 60 * 60 * 24 * 365, path: "/" });
      return r;
    }
  }

  // Remember the explicit locale when the user visits a localised root, so
  // subsequent visits to `/` redirect to the same place.
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && LOCALES.has(seg) && request.cookies.get(LOCALE_COOKIE)?.value !== seg) {
    response.cookies.set(LOCALE_COOKIE, seg, { maxAge: 60 * 60 * 24 * 365, path: "/" });
  }

  if (pathname.startsWith("/dashboard")) {
    // @supabase/ssr stores the session as `sb-<ref>-auth-token`, and splits
    // it into `.0`/`.1` chunks when large — so match by *contains*, not
    // endsWith, otherwise chunked sessions look logged-out (redirect loop).
    const hasSession = [...request.cookies.getAll()].some(
      (c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"),
    );
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|og/|robots.txt|sitemap.xml).*)",
  ],
};
