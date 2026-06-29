import type { Locale } from "@/lib/seo";
import type { LegalDoc } from "@/lib/legal/types";

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/translate-legal.mjs.
 * Translated via Mistral through the Konvertools ai-process edge function.
 * Missing entries fall back to English at render time.
 *
 * Reset to empty after the public REST API / credits were removed from the
 * Terms and Privacy sources: the previous translations still contained the
 * now-deleted "Public REST API" section and API-key clauses, and the fill
 * script only translates MISSING locales (it doesn't re-translate changed
 * English), so they would otherwise stay stale. With these maps empty, every
 * localized /terms and /privacy page renders the corrected English source with
 * the "translation in progress" banner until the pipeline regenerates them.
 */
export const PRIVACY_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {};
export const TERMS_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {};
