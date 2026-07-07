import type { Locale } from "@/lib/seo";
import type { LegalDoc } from "@/lib/legal/types";

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/translate-legal.mjs.
 * Translated via Mistral through the Konvertools ai-process edge function.
 * Missing entries fall back to English at render time.
 *
 * Reset to empty: the English Terms/Privacy changed again (Paddle → Stripe,
 * and Stripe is a payment processor — Konvertools is now the seller of record,
 * so the Merchant-of-Record/VAT clauses were rewritten). The fill script only
 * translates MISSING locales — it never re-translates changed English — so any
 * filled entry would freeze the stale Paddle wording on the localized pages.
 * Empty means every localized /terms and /privacy renders the corrected
 * English source with the "translation in progress" banner until the pipeline
 * regenerates them from the current English.
 */
export const PRIVACY_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {};
export const TERMS_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {};
