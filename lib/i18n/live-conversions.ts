import { type Locale } from "@/lib/i18n/locales";

/**
 * Label for the live "conversions done" counter on the homepage, rendered as
 * "{n} <conversions>". English is the base + fallback for any untranslated
 * locale (same degradation as live-presence / runs-on).
 */
export type LiveConversionsStrings = { conversions: string };

const en: LiveConversionsStrings = { conversions: "conversions" };
const fr: LiveConversionsStrings = { conversions: "conversions" };
const es: LiveConversionsStrings = { conversions: "conversiones" };
const pt: LiveConversionsStrings = { conversions: "conversões" };
const de: LiveConversionsStrings = { conversions: "Konvertierungen" };
const it: LiveConversionsStrings = { conversions: "conversioni" };
const nl: LiveConversionsStrings = { conversions: "conversies" };
const ja: LiveConversionsStrings = { conversions: "件の変換" };
const zh: LiveConversionsStrings = { conversions: "次转换" };
const ko: LiveConversionsStrings = { conversions: "건 변환" };
const ar: LiveConversionsStrings = { conversions: "عملية تحويل" };
const ru: LiveConversionsStrings = { conversions: "конвертаций" };
const hi: LiveConversionsStrings = { conversions: "रूपांतरण" };
const tr: LiveConversionsStrings = { conversions: "dönüşüm" };
const id: LiveConversionsStrings = { conversions: "konversi" };
const vi: LiveConversionsStrings = { conversions: "lượt chuyển đổi" };
const sv: LiveConversionsStrings = { conversions: "konverteringar" };
const pl: LiveConversionsStrings = { conversions: "konwersji" };
const uk: LiveConversionsStrings = { conversions: "конвертацій" };
const cs: LiveConversionsStrings = { conversions: "konverzí" };

const TABLE: Partial<Record<Locale, LiveConversionsStrings>> = {
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

export function getLiveConversions(locale: Locale): LiveConversionsStrings {
  return TABLE[locale] ?? en;
}
