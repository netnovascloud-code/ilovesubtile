import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const LOCALES = new Set([
  "fr", "es", "pt", "de", "it", "nl", "ja", "zh", "ko", "ar", "ru", "hi",
  "tr", "id", "vi", "sv", "pl", "uk", "cs",
]);

/** Build the per-request Content-Security-Policy with a fresh nonce. The
 *  nonce + 'strict-dynamic' replace 'unsafe-inline' on script-src; any
 *  scripts loaded by a nonced script are then trusted by propagation, so
 *  esm.sh / unpkg / Ezoic / Stripe loaders still work without explicit
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
    "worker-src 'self' blob:",
    "connect-src 'self' blob: https://*.supabase.co https://esm.sh https://unpkg.com https://staticimgly.com https://api.frankfurter.dev https://api.pwnedpasswords.com https://api.mistral.ai https://checkout.stripe.com https://*.ezoic.net https://*.ezojs.com",
    "frame-src 'self' https://checkout.stripe.com https://js.stripe.com https://hooks.stripe.com https://billing.stripe.com https://*.ezoic.net",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://checkout.stripe.com",
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
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|og/|robots.txt|sitemap.xml).*)",
  ],
};
