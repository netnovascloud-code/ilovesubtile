import { type Locale } from "@/lib/i18n/locales";

/**
 * Label for the live "visitors online" presence counter on the homepage.
 * Rendered as "{n} <online>". English is the base + fallback for any locale not
 * yet translated here (same degradation as runs-on / plan-compare).
 */
export type LivePresenceStrings = { online: string };

const en: LivePresenceStrings = { online: "online now" };
const fr: LivePresenceStrings = { online: "en ligne" };

const TABLE: Partial<Record<Locale, LivePresenceStrings>> = { en, fr };

export function getLivePresence(locale: Locale): LivePresenceStrings {
  return TABLE[locale] ?? en;
}
