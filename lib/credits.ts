/**
 * Konvertools credit system — single source of truth for the public REST API.
 *
 * Pure data, no SDK. The Supabase Edge Function `api-gateway` mirrors the
 * cost logic in Deno (it can't import this file), so keep the two in sync —
 * see `supabase/functions/api-gateway/index.ts` → `creditCost()`.
 *
 * Credits NEVER expire (purchased packs). The only exception is the monthly
 * Business grant, which resets on the 1st — tracked separately server-side.
 */

export type CreditPack = {
  id: "starter" | "growth" | "scale" | "studio";
  credits: number;
  priceEur: number;
  /** Effective price per credit, for display. */
  perCredit: number;
  /** Marketing highlight, e.g. "Best value". */
  badge?: string;
};

export const CREDIT_PACKS: CreditPack[] = [
  { id: "starter", credits: 100, priceEur: 12, perCredit: 0.12 },
  { id: "growth", credits: 500, priceEur: 39, perCredit: 0.078 },
  { id: "scale", credits: 2000, priceEur: 99, perCredit: 0.0495, badge: "Most popular" },
  { id: "studio", credits: 6000, priceEur: 249, perCredit: 0.0415, badge: "Best value" },
];

/** Business plan auto-grant on the 1st of each month. Expires end of month. */
export const BUSINESS_MONTHLY_CREDITS = 300;

/**
 * Credit cost per API operation. Text operations are tiered by length
 * (short < 500 words, long ≥ 500 words). transcribe & translate are metered
 * (see the metered helpers below) — the values here are the per-unit rate.
 */
export const CREDIT_COST = {
  me: 0,
  job: 0,
  /** per minute, rounded up */
  transcribe: 10,
  /** per 1000 words, rounded up, minimum one unit */
  translate: 5,
  rephrase: { short: 3, long: 8 },
  summarize: { short: 3, long: 6 },
  humanize: { short: 5, long: 12 },
  convert_code: 4,
  explain_code: 3,
  remove_background: 2,
  convert_image: 1,
  convert_pdf: 1,
  // Security tools (KONVER Part 2). VirusTotal scan_file removed — its free
  // API forbids commercial use. Remaining tools are all commercial-safe.
  validate_email: 1,
  analyze_phishing: 3,
  scan_url: 1,
  password_check: 1,
  ssl_check: 1,
} as const;

/** A word count ≥ this is billed at the "long" tier. */
export const LONG_TEXT_THRESHOLD = 500;

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

/** transcribe: 10 credits per started minute. 61s → 2 min → 20 credits. */
export function transcribeCost(durationSeconds: number): number {
  return Math.max(1, Math.ceil(durationSeconds / 60)) * CREDIT_COST.transcribe;
}

/** translate: 5 credits per started 1000 words, minimum 5. */
export function translateCost(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 1000)) * CREDIT_COST.translate;
}

/** Tiered text op cost (rephrase / summarize / humanize). */
export function tieredCost(
  op: "rephrase" | "summarize" | "humanize",
  wordCount: number,
): number {
  const tier = CREDIT_COST[op];
  return wordCount >= LONG_TEXT_THRESHOLD ? tier.long : tier.short;
}

/** Rows for the public cost table on the API docs page. */
export const COST_TABLE: { op: string; credits: string }[] = [
  { op: "transcribe", credits: "10 / min" },
  { op: "translate", credits: "5 / 1k words" },
  { op: "rephrase", credits: "3–8" },
  { op: "summarize", credits: "3–6" },
  { op: "humanize", credits: "5–12" },
  { op: "convert_code", credits: "4" },
  { op: "remove_background", credits: "2" },
  { op: "convert_image", credits: "1" },
  { op: "convert_pdf", credits: "1" },
  { op: "validate_email", credits: "1" },
  { op: "analyze_phishing", credits: "3" },
  { op: "scan_url", credits: "1" },
  { op: "password_check", credits: "1" },
  { op: "ssl_check", credits: "1" },
  { op: "me · job", credits: "0" },
];
