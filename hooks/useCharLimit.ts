"use client";

import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";
import {
  TEXT_CHAR_LIMITS,
  NEXT_TIER,
  resolveTier,
  countWords,
  readingMinutes,
  type AccountTier,
} from "@/lib/text-limits";
import { getTextMeter, type TextMeterStrings } from "@/lib/i18n/text-meter";

export type CharLimitState = {
  chars: number;
  words: number;
  minutes: number;
  limit: number;
  /** Character ceiling of the tier the user is upsold to (for the CTA copy). */
  nextLimit: number | null;
  tier: AccountTier;
  over: boolean;
  near: boolean;
  loading: boolean;
  locale: string;
  strings: TextMeterStrings;
};

/** Live per-plan character/word/reading-time state for one text input. */
export function useCharLimit(text: string): CharLimitState {
  const { user, plan, loading } = useUser();
  const locale = useLocale();
  const tier = resolveTier(!!user, plan);
  const limit = TEXT_CHAR_LIMITS[tier];
  const next = NEXT_TIER[tier];
  const chars = text.length;
  const words = countWords(text);
  return {
    chars,
    words,
    minutes: readingMinutes(words),
    limit,
    nextLimit: next ? TEXT_CHAR_LIMITS[next] : null,
    tier,
    // Don't block until the plan has resolved, so a Pro user pasting a long
    // text isn't briefly gated by the anonymous ceiling during load.
    over: !loading && chars > limit,
    near: !loading && chars <= limit && chars > limit * 0.9,
    loading,
    locale,
    strings: getTextMeter(locale),
  };
}
