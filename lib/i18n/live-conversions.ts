import { type Locale } from "@/lib/i18n/locales";

/**
 * Label for the live "conversions done" counter on the homepage, rendered as
 * "{n} <conversions>". English is the base + fallback for any untranslated
 * locale (same degradation as live-presence / runs-on).
 */
export type LiveConversionsStrings = { conversions: string };

const en: LiveConversionsStrings = { conversions: "conversions" };
const fr: LiveConversionsStrings = { conversions: "conversions" };

const TABLE: Partial<Record<Locale, LiveConversionsStrings>> = { en, fr };

export function getLiveConversions(locale: Locale): LiveConversionsStrings {
  return TABLE[locale] ?? en;
}
