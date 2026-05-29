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
    priceMonthly: 9,
    priceAnnual: 79,
    features: [
      "Unlimited AI tools",
      "Workflow Builder",
      "Batch up to 20 files",
      "Files up to 500 MB",
      "No ads, no watermark",
      "10 saved templates",
      "Video background removal up to 3 min",
      "All AI languages",
      "Priority queue",
    ],
  },
  business: {
    name: "Business",
    priceMonthly: 29,
    priceAnnual: 249,
    features: [
      "Everything in Pro",
      "200 API credits/month included",
      "Full REST API",
      "Unlimited batch",
      "Unlimited templates",
      "Files up to 2 GB",
      "3 team seats",
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
    "All browser tools, free & unlimited",
    "AI tools: 5/day signed in (3/day anonymous)",
    "AI files up to 25 MB",
    "Watermark on burned-in video",
  ],
};

export type PlanKey = keyof typeof PLANS;
