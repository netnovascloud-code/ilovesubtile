import type { Locale } from "@/lib/i18n/locales";
import type { LocalisedStep } from "./tool-steps";

/**
 * AUTO-GENERATED — do not edit by hand.
 *
 * Localised "How it works" step cards for every tool, keyed slug → locale.
 * Produced by `scripts/fill-translations.mjs --target steps` (Mistral via the
 * ai-process edge function) and by batch translation passes.
 *
 * `getLocalisedSteps` prefers hand-authored steps (lib/i18n/tool-steps.ts) over
 * this overlay, and falls back to the English source (tools-config.ts) when a
 * (slug, locale) pair is absent here. A missing entry is therefore always safe.
 */
export const GENERATED_STEP_TRANSLATIONS: Record<string, Partial<Record<Locale, LocalisedStep[]>>> = {};
