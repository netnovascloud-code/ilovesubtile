"use client";

import { useEffect } from "react";
import { useLocale } from "@/hooks/useLocale";
import { isRtl } from "@/lib/i18n/locales";

/**
 * Keeps <html lang> and dir in sync with the URL locale on the client.
 * Done client-side (not via headers() in the root layout) so every route
 * stays statically generated — important for the SEO/CWV targets.
 * Googlebot executes JS, so it sees the corrected lang; hreflang in the
 * server-rendered <head> remains the primary signal regardless.
 */
export function HtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale]);
  return null;
}
