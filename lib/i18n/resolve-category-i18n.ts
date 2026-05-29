import type { Locale } from "@/lib/i18n/locales";
import { CATEGORY_BY_ID, type ToolCategory } from "@/lib/tools-config";
import { GENERATED_CATEGORY_TRANSLATIONS } from "./category-translations.generated";

/** Localized category label, falling back to the English label. */
export function categoryLabel(id: ToolCategory, locale: Locale): string {
  return GENERATED_CATEGORY_TRANSLATIONS[id]?.[locale]?.label ?? CATEGORY_BY_ID[id].label;
}

/** Localized category blurb, falling back to the English blurb. */
export function categoryBlurb(id: ToolCategory, locale: Locale): string {
  return GENERATED_CATEGORY_TRANSLATIONS[id]?.[locale]?.blurb ?? CATEGORY_BY_ID[id].blurb;
}
