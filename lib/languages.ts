/**
 * Languages supported by the translation pipeline. Codes are uppercase
 * ISO-639-1 — Mistral's chat completion accepts them in the prompt and
 * the edge function maps each one to a human-readable name.
 */
export type LanguageCode =
  | "EN" | "FR" | "ES" | "PT" | "DE" | "IT" | "NL" | "JA" | "ZH" | "KO"
  | "AR" | "RU" | "HI" | "PL" | "TR" | "SV" | "NO" | "DA" | "FI" | "CS"
  | "EL" | "HE" | "TH" | "VI" | "ID" | "RO" | "HU" | "UK" | "BG" | "HR"
  | "SK" | "SL" | "LT" | "LV" | "ET";

export const LANGUAGES: { code: LanguageCode; native: string; english: string }[] = [
  { code: "EN", native: "English", english: "English" },
  { code: "FR", native: "Français", english: "French" },
  { code: "ES", native: "Español", english: "Spanish" },
  { code: "PT", native: "Português", english: "Portuguese" },
  { code: "DE", native: "Deutsch", english: "German" },
  { code: "IT", native: "Italiano", english: "Italian" },
  { code: "NL", native: "Nederlands", english: "Dutch" },
  { code: "JA", native: "日本語", english: "Japanese" },
  { code: "ZH", native: "中文", english: "Chinese" },
  { code: "KO", native: "한국어", english: "Korean" },
  { code: "AR", native: "العربية", english: "Arabic" },
  { code: "RU", native: "Русский", english: "Russian" },
  { code: "HI", native: "हिन्दी", english: "Hindi" },
  { code: "PL", native: "Polski", english: "Polish" },
  { code: "TR", native: "Türkçe", english: "Turkish" },
  { code: "SV", native: "Svenska", english: "Swedish" },
  { code: "NO", native: "Norsk", english: "Norwegian" },
  { code: "DA", native: "Dansk", english: "Danish" },
  { code: "FI", native: "Suomi", english: "Finnish" },
  { code: "CS", native: "Čeština", english: "Czech" },
  { code: "EL", native: "Ελληνικά", english: "Greek" },
  { code: "HE", native: "עברית", english: "Hebrew" },
  { code: "TH", native: "ไทย", english: "Thai" },
  { code: "VI", native: "Tiếng Việt", english: "Vietnamese" },
  { code: "ID", native: "Bahasa Indonesia", english: "Indonesian" },
  { code: "RO", native: "Română", english: "Romanian" },
  { code: "HU", native: "Magyar", english: "Hungarian" },
  { code: "UK", native: "Українська", english: "Ukrainian" },
  { code: "BG", native: "Български", english: "Bulgarian" },
  { code: "HR", native: "Hrvatski", english: "Croatian" },
  { code: "SK", native: "Slovenčina", english: "Slovak" },
  { code: "SL", native: "Slovenščina", english: "Slovenian" },
  { code: "LT", native: "Lietuvių", english: "Lithuanian" },
  { code: "LV", native: "Latviešu", english: "Latvian" },
  { code: "ET", native: "Eesti", english: "Estonian" },
];

/** Locale → suggested initial target language for the translation UI. */
export const DEFAULT_TARGETS: Record<string, LanguageCode> = {
  en: "ES",
  fr: "EN",
  es: "EN",
  pt: "EN",
  de: "EN",
  it: "EN",
  nl: "EN",
  ja: "EN",
  zh: "EN",
  ko: "EN",
  ar: "EN",
  ru: "EN",
  hi: "EN",
};
