import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  _stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
  return _stripe;
}

export const PLANS = {
  pro: {
    name: "Pro",
    priceMonthly: 12,
    priceAnnual: 99,
    stripeMonthlyPriceId: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
    stripeAnnualPriceId: process.env.STRIPE_PRICE_PRO_ANNUAL ?? "",
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
    stripeMonthlyPriceId: process.env.STRIPE_PRICE_BIZ_MONTHLY ?? "",
    stripeAnnualPriceId: process.env.STRIPE_PRICE_BIZ_ANNUAL ?? "",
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
