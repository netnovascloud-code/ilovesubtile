import type { Locale } from "@/lib/seo";

export { LOCALES, type Locale } from "@/lib/seo";

export const DEFAULT_LOCALE: Locale = "en";

/** Locales other than English — these live under /<locale>/... */
export const NON_DEFAULT_LOCALES: Locale[] = [
  "fr", "es", "pt", "de", "it", "nl", "ja", "zh", "ko", "ar", "ru", "hi",
  "tr", "id", "vi", "sv", "pl", "uk", "cs",
];

export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  it: "Italiano",
  nl: "Nederlands",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  ar: "العربية",
  ru: "Русский",
  hi: "हिन्दी",
  tr: "Türkçe",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  sv: "Svenska",
  pl: "Polski",
  uk: "Українська",
  cs: "Čeština",
};

export const RTL_LOCALES: ReadonlySet<Locale> = new Set(["ar"]);

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

export function isLocale(value: string): value is Locale {
  return (LANGUAGE_NAMES as Record<string, string>)[value] !== undefined;
}

export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\//, "");
  if (locale === DEFAULT_LOCALE) return clean ? `/${clean}` : "/";
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
