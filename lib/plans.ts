/**
 * Plan definitions — pure data, no payment SDK.
 *
 * All payment API calls live in Supabase Edge Functions (`lemonsqueezy-checkout`,
 * `lemonsqueezy-portal`, `lemonsqueezy-webhook`). The Lemon Squeezy store and
 * variant IDs live in those functions' secrets, not in the frontend.
 *
 * Lemon Squeezy is our Merchant of Record — it collects and remits VAT/sales
 * tax worldwide, so we never handle tax ourselves.
 */

export const PLANS = {
  pro: {
    name: "Pro",
    priceMonthly: 25,
    priceAnnual: 210,
    features: [
      "500 AI conversions / month",
      "Workflow Builder",
      "Batch up to 20 files",
      "Files up to 1 GB",
      "Text up to 50,000 characters",
      "No ads, no watermark",
      "10 saved templates",
      "Video background removal up to 5 min",
      "All AI languages",
      "Priority queue",
    ],
  },
  business: {
    name: "Business",
    priceMonthly: 79,
    priceAnnual: 664,
    features: [
      "3,000 AI conversions / month",
      "Everything in Pro",
      "Text up to 100,000 characters",
      "Unlimited batch",
      "Unlimited templates",
      "Files up to 5 GB",
      "5 team seats",
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
    "AI tools: 5/day",
    "AI files up to 20 MB",
    "Watermark on burned-in video",
    "Ads during AI processing",
  ],
};

export type PlanKey = keyof typeof PLANS;
