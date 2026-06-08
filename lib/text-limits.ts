// Per-plan input limits for the AI text tools (Reverso / Scribbr style).
// The live counter + blocking live in <CharMeter>; the edge function keeps its
// own hard cap (40 KB / 120 KB) as a backstop. Keep these in sync with the
// pricing copy in lib/i18n/strings.ts.
export type AccountTier = "anonymous" | "free" | "pro" | "business";

export const TEXT_CHAR_LIMITS: Record<AccountTier, number> = {
  anonymous: 1_500,
  free: 5_000,
  pro: 50_000,
  business: 100_000,
};

/** The tier a visitor is upsold to when they hit their current ceiling. */
export const NEXT_TIER: Record<AccountTier, AccountTier | null> = {
  anonymous: "free",
  free: "pro",
  pro: "business",
  business: null,
};

export function resolveTier(hasUser: boolean, plan: "free" | "pro" | "business"): AccountTier {
  return hasUser ? plan : "anonymous";
}

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).filter(Boolean).length : 0;
}

/** Reading time in minutes at ~200 wpm; 0 for empty, otherwise at least 1. */
export function readingMinutes(words: number): number {
  return words === 0 ? 0 : Math.max(1, Math.round(words / 200));
}
