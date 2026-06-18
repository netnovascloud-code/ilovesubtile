import { type Locale } from "@/lib/i18n/locales";

/**
 * Label for the live "visitors online" presence counter on the homepage.
 * Rendered as "{n} <online>". English is the base + fallback for any locale not
 * yet translated here (same degradation as runs-on / plan-compare).
 */
export type LivePresenceStrings = { online: string };

const en: LivePresenceStrings = { online: "online now" };
const fr: LivePresenceStrings = { online: "en ligne" };
const es: LivePresenceStrings = { online: "en línea ahora" };
const pt: LivePresenceStrings = { online: "online agora" };
const de: LivePresenceStrings = { online: "online" };
const it: LivePresenceStrings = { online: "online ora" };
const nl: LivePresenceStrings = { online: "online" };
const ja: LivePresenceStrings = { online: "人がオンライン" };
const zh: LivePresenceStrings = { online: "人在线" };
const ko: LivePresenceStrings = { online: "명 접속 중" };
const ar: LivePresenceStrings = { online: "متصل الآن" };
const ru: LivePresenceStrings = { online: "сейчас онлайн" };
const hi: LivePresenceStrings = { online: "अभी ऑनलाइन" };
const tr: LivePresenceStrings = { online: "kişi çevrimiçi" };
const id: LivePresenceStrings = { online: "sedang online" };
const vi: LivePresenceStrings = { online: "đang trực tuyến" };
const sv: LivePresenceStrings = { online: "online nu" };
const pl: LivePresenceStrings = { online: "online" };
const uk: LivePresenceStrings = { online: "зараз онлайн" };
const cs: LivePresenceStrings = { online: "online" };

const TABLE: Partial<Record<Locale, LivePresenceStrings>> = {
  en,
  fr,
  es,
  pt,
  de,
  it,
  nl,
  ja,
  zh,
  ko,
  ar,
  ru,
  hi,
  tr,
  id,
  vi,
  sv,
  pl,
  uk,
  cs,
};

export function getLivePresence(locale: Locale): LivePresenceStrings {
  return TABLE[locale] ?? en;
}
