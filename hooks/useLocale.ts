"use client";

import { usePathname } from "next/navigation";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

/**
 * Detect the current locale from the URL path. The first segment is
 * either a known non-English locale (e.g. /fr/...) or English (default).
 * Used by client components that live in the root layout and don't
 * have a server-side locale prop available.
 */
export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first) && first !== "en") return first;
  return DEFAULT_LOCALE;
}
