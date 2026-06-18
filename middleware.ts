import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const LOCALES = new Set([
  "fr", "es", "pt", "de", "it", "nl", "ja", "zh", "ko", "ar", "ru", "hi",
  "tr", "id", "vi", "sv", "pl", "uk", "cs",
]);

/** Slugs that exist ONLY in English (no localised route under app/[locale]/…).
 *  Category hubs now HAVE localised routes (/<locale>/documents …) so they are
 *  intentionally NOT in this list. These remaining SEO landing + competitor
 *  pages stay English-only; a /fr/<slug> hit (bookmark, external link, SERP)
 *  308-redirects to the English canonical instead of 404ing. */
const EN_ONLY_SLUGS = new Set([
  // SEO landing pages
  "rephraser", "translator", "ai-humanizer",
  // Competitor alternative pages
  "adobe-acrobat-alternative", "clideo-alternative", "convertio-alternative",
  "deepl-alternative", "grammarly-alternative", "happyscribe-alternative",
  "ilovepdf-alternative", "kapwing-alternative", "remove-bg-alternative",
  "veed-alternative",
]);

/** App sections that have NO localised route (auth, account, system/docs pages).
 *  A /<locale>/<section> hit — language switch, bookmark, stale link — would
 *  otherwise 404 through the dynamic [slug] route, so we strip the locale
 *  prefix and 308 to the English canonical. Matches nested paths too
 *  (e.g. /fr/dashboard, /fr/login). NOTE: workflow / batch / api now HAVE
 *  localised routes under app/[locale]/… so they are intentionally NOT here. */
const ROOT_ONLY_SECTIONS = new Set([
  "login", "register", "developer",
]);

/** Sections with a localised root (e.g. /[locale]/billing exists) but whose
 *  deeper paths stay English-only (billing/checkout). Only the sub-paths are
 *  stripped — a bare /<locale>/billing renders its real localised route. */
const LOCALISED_ROOT_EN_SUBPATHS = new Set(["billing"]);

/** Build the per-request Content-Security-Policy with a fresh nonce. The
 *  nonce + 'strict-dynamic' replace 'unsafe-inline' on script-src; any
 *  scripts loaded by a nonced script are then trusted by propagation, so
 *  esm.sh / unpkg / Ezoic / Lemon Squeezy loaders still work without explicit
 *  origin allowlists on script-src (CSP3 ignores URL allowlists when
 *  'strict-dynamic' is set).
 *
 *  'unsafe-eval' is retained because FFmpeg.wasm, pdf-lib, mammoth and the
 *  ESM-CDN-loaded libs rely on Function()/eval at runtime.
 *  'unsafe-inline' on style-src is retained — CSS injection is a much lower
 *  XSS risk and removing it would require nonces on every Tailwind utility,
 *  CSS-in-JS block and `style={{}}` prop. */
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' 'wasm-unsafe-eval' blob:`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https: *.supabase.co",
    "media-src 'self' blob:",
    "worker-src 'self' blob: https://cdn.jsdelivr.net",
    // wss://*.supabase.co is REQUIRED — @supabase/ssr opens a Realtime
    // WebSocket on session resolution (incl. the OAuth callback at /?code=…).
    // CSP treats wss:// and https:// as distinct schemes, so listing the https
    // origin alone blocks the socket and crashes the browser client.
    // https://vercel.live: feedback widget on *.vercel.app preview deploys.
    // cdn.jsdelivr.net + tessdata.projectnaptha.com: Tesseract.js (PDF OCR /
    // image-to-text) fetches its WASM core + worker from jsDelivr and the
    // language model (eng.traineddata.gz) from projectnaptha by default.
    "connect-src 'self' blob: https://*.supabase.co wss://*.supabase.co https://esm.sh https://unpkg.com https://cdn.jsdelivr.net https://tessdata.projectnaptha.com https://staticimgly.com https://api.frankfurter.dev https://api.pwnedpasswords.com https://api.mistral.ai https://api.lemonsqueezy.com https://*.lemonsqueezy.com https://*.ezoic.net https://*.ezojs.com https://vercel.live",
    "frame-src 'self' https://app.lemonsqueezy.com https://*.lemonsqueezy.com https://*.ezoic.net https://vercel.live",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://*.lemonsqueezy.com",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}
// Named per Next.js convention so it lines up with the standard ecosystem.
// We also read the legacy "wyrlo_locale" cookie so users who picked a language
// before the Konvertools rename don't lose their preference on next visit.
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
  // Per-request CSP nonce. Threaded into the request headers as `x-nonce` so
  // the root layout can read it via next/headers and stamp every inline
  // <script> / <Script> with the matching nonce attribute. Set on the
  // response as Content-Security-Policy so the browser enforces it.
  const nonce = generateNonce();
  const extra = new Headers();
  extra.set("x-nonce", nonce);
  // Thread the URL locale to the root layout the same way as the nonce, so
  // <html lang> / dir are correct in the SERVER render (SEO, screen readers,
  // browser auto-translate) instead of being patched client-side after mount.
  const seg0 = request.nextUrl.pathname.split("/").filter(Boolean)[0] ?? "";
  extra.set("x-locale", LOCALES.has(seg0) ? seg0 : "en");

  const response = await updateSupabaseSession(request, extra);
  const csp = buildCsp(nonce);
  response.headers.set("Content-Security-Policy", csp);
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

  // /en/<anything> → 308 to /<anything>. English is served unprefixed, so an
  // explicit /en/ prefix (manual URL, stale bookmark, mis-built link) would
  // otherwise 404. Strip it and redirect to the canonical English path.
  {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "en") {
      const url = request.nextUrl.clone();
      url.pathname = "/" + parts.slice(1).join("/");
      return NextResponse.redirect(url, 308);
    }
  }

  // /<locale>/<en-only-slug> → 308 to /<en-only-slug>. Keeps SEO juice on the
  // English canonical and removes the 404 hole identified in the i18n audit.
  // Doesn't touch /<locale>/<tool-slug> because tools all have localised
  // routes under app/[locale]/[slug].
  {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 2 && LOCALES.has(parts[0]) && EN_ONLY_SLUGS.has(parts[1])) {
      const url = request.nextUrl.clone();
      url.pathname = `/${parts[1]}`;
      return NextResponse.redirect(url, 308);
    }
  }

  // /<locale>/<english-only-path> → 308 to the English canonical (strip the
  // locale prefix). Covers fully English-only sections (dashboard, login, …)
  // and the English-only sub-paths of localised roots (billing/checkout). A
  // bare /<locale>/billing is NOT stripped — it has a real localised route.
  {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && LOCALES.has(parts[0])) {
      const seg = parts[1];
      const strip = ROOT_ONLY_SECTIONS.has(seg) || (LOCALISED_ROOT_EN_SUBPATHS.has(seg) && parts.length >= 3);
      if (strip) {
        const url = request.nextUrl.clone();
        url.pathname = "/" + parts.slice(1).join("/");
        return NextResponse.redirect(url, 308);
      }
    }
  }

  // A visitor whose language preference is non-English, landing on the English
  // /billing canonical (direct link, bookmark, header link before the cookie
  // settled), is sent to the localised route so the WHOLE page is translated —
  // not just the chrome — and the cookie-vs-URL hydration residue can't appear.
  if (pathname === "/billing" || pathname === "/dashboard") {
    const target = preferredLocale(request);
    if (target) {
      const url = request.nextUrl.clone();
      url.pathname = `/${target}${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  // Auth gate for the dashboard — English /dashboard and localised
  // /<locale>/dashboard. Presence-only check on the session cookie; the page
  // resolves the real session.
  {
    const dparts = pathname.split("/").filter(Boolean);
    const isDashboard = dparts[0] === "dashboard" || (LOCALES.has(dparts[0]) && dparts[1] === "dashboard");
    if (isDashboard) {
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
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|og/|robots.txt|sitemap.xml).*)",
  ],
};
