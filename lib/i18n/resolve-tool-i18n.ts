import type { Locale } from "@/lib/i18n/locales";
import { getToolI18n, type ToolI18n } from "./tool-translations";
import { GENERATED_TOOL_TRANSLATIONS } from "./tool-translations.generated";

/**
 * Resolve a tool's localized strings, layering two sources:
 *   1. hand-authored TOOL_TRANSLATIONS  (wins field-by-field)
 *   2. the machine-filled overlay        (tools without a hand-authored entry)
 * Returns null when neither has the locale, so callers fall back to English.
 *
 * This lives in its own module (not in tool-translations.ts) so that
 * tool-translations.ts stays free of runtime imports and can be loaded by the
 * standalone fill script via Node's native TypeScript support.
 */
export function resolveToolI18n(slug: string, locale: Locale): ToolI18n | null {
  const hand = getToolI18n(slug, locale);
  const gen = GENERATED_TOOL_TRANSLATIONS[slug]?.[locale];
  if (hand && gen) return { ...gen, ...hand };
  return hand ?? gen ?? null;
}
