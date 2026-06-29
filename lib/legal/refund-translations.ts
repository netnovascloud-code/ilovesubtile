import type { Locale } from "@/lib/seo";
import type { LegalDoc } from "@/lib/legal/types";

// Native Refund Policy translations. Empty for now — non-English locales render
// the English source with a "translation in progress" banner. Fill via the
// scripts/translate-legal.mjs pipeline (or by hand) keyed by locale.
export const REFUND_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {};
