/**
 * Plan definitions — pure data, no payment SDK.
 *
 * All payment API calls live in Supabase Edge Functions (`stripe-checkout`,
 * `stripe-portal`, `stripe-webhook`; `stripe-setup` provisions the account).
 * The Stripe key never reaches the frontend, and prices are resolved by
 * lookup_key (pro_monthly …) so the SAME code serves test and live mode —
 * switching modes is only swapping the STRIPE_* secrets. Keep the amounts
 * below in sync with the amounts in supabase/functions/stripe-setup.
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
