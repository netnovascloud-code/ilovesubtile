/**
 * Plan definitions — pure data, no Stripe SDK.
 *
 * All Stripe API calls live in Supabase Edge Functions (`stripe-checkout`,
 * `stripe-portal`, `stripe-webhook`). The Stripe price IDs live in those
 * functions' secrets, not in the frontend.
 */

export const PLANS = {
  pro: {
    name: "Pro",
    priceMonthly: 12,
    priceAnnual: 99,
    features: [
      "Unlimited tool runs",
      "Files up to 500 MB",
      "No ads, no watermark",
      "All 30+ translation languages",
      "Batch downloads",
      "Priority queue",
    ],
  },
  business: {
    name: "Business",
    priceMonthly: 49,
    priceAnnual: 399,
    features: [
      "Everything in Pro",
      "REST API access",
      "Up to 5 team seats",
      "Batch translate (10+ languages at once)",
      "Priority support",
      "Custom invoicing",
    ],
  },
} as const;

export const FREE_PLAN = {
  name: "Free",
  priceMonthly: 0,
  priceAnnual: 0,
  features: [
    "5 runs/day signed in (3/day anonymous)",
    "Files up to 50 MB",
    "Watermark on burned-in video",
    "Last 10 jobs in history",
  ],
};

export type PlanKey = keyof typeof PLANS;
