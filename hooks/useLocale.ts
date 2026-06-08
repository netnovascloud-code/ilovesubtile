"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

const COOKIE = "konver_locale";

function readCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)konver_locale=([^;]+)/);
  const v = m?.[1];
  return v && isLocale(v) && v !== DEFAULT_LOCALE ? v : null;
}

function writeCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  // 1-year, site-wide; mirrors the language the user is browsing in so the
  // header/footer stay translated on the English-only routes (/workflow,
  // /batch, /api, /dashboard) that have no /<locale> prefix.
  document.cookie = `${COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Detect the current locale. The first path segment wins when it's a known
 * non-English locale (e.g. /fr/...). On non-prefixed routes we fall back to a
 * cookie that remembers the last localized page the user visited, so switching
 * language carries across the whole site — not just the /<locale> pages.
 *
 * SSR always resolves the path-derived value (cookies aren't readable during
 * static generation), then the client reconciles after mount. Seeding state
 * with the path value keeps the first client render identical to SSR, avoiding
 * a React #425 hydration mismatch.
 */
export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  const first = pathname.split("/")[1] ?? "";
  const fromPath: Locale = isLocale(first) && first !== "en" ? first : DEFAULT_LOCALE;
  const [resolved, setResolved] = useState<Locale>(fromPath);

  useEffect(() => {
    if (fromPath !== DEFAULT_LOCALE) {
      // On a localized route — remember it and use it.
      writeCookie(fromPath);
      setResolved(fromPath);
    } else {
      // On an English-only route — honour the remembered language if any.
      setResolved(readCookie() ?? DEFAULT_LOCALE);
    }
  }, [fromPath]);

  // Path-derived locale is SSR-stable, so return it directly on localized
  // routes; only the cookie fallback needs the post-mount `resolved` value.
  return fromPath !== DEFAULT_LOCALE ? fromPath : resolved;
}
