import type { Locale } from "@/lib/i18n/locales";
import type { ToolI18n } from "./tool-translations";

/**
 * AUTO-GENERATED — do not edit by hand.
 *
 * Filled by `node scripts/fill-translations.mjs` (which calls Mistral Large
 * with your MISTRAL_API_KEY). This overlay holds machine translations for
 * tools that have no hand-authored entry in TOOL_TRANSLATIONS yet. The
 * resolver (getToolI18n) prefers hand-authored strings field-by-field and
 * only falls back to this overlay, then to English.
 *
 * Stored as a TS object literal (not JSON) so it has zero runtime imports and
 * can be imported both by the Next build and by the standalone fill script.
 */
export const GENERATED_TOOL_TRANSLATIONS: Record<string, Partial<Record<Locale, ToolI18n>>> = {};
