import type { Locale } from "@/lib/seo";
import type { LegalDoc } from "@/lib/legal/types";

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/translate-legal.mjs.
 * Translated via Mistral through the Konvertools ai-process edge function.
 * Missing entries fall back to English at render time.
 *
 * Reset to empty: the English Terms/Privacy changed (public REST API + credits
 * removed, then Lemon Squeezy → Paddle). The fill script only translates
 * MISSING locales — it never re-translates changed English — so any filled
 * entry would freeze stale content (the old API section / "Lemon Squeezy") on
 * the localized pages. Empty means every localized /terms and /privacy renders
 * the corrected English source with the "translation in progress" banner until
 * the pipeline regenerates them from the current English.
 */
export const PRIVACY_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {};
export const TERMS_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {};
