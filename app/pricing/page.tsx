import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS, FREE_PLAN } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free for casual use. Pro at €12/month for unlimited subtitle generation, translation, sync and burn-in. Business at €49/month with API access.",
  alternates: { canonical: "/pricing" },
};

const TIERS = [
  {
    key: "free",
    title: FREE_PLAN.name,
    price: "€0",
    period: "forever",
    description: "Great for one-off jobs.",
    cta: "Get started",
    href: "/register",
    features: FREE_PLAN.features,
    highlight: false,
  },
  {
    key: "pro",
    title: PLANS.pro.name,
    price: `€${PLANS.pro.priceMonthly}`,
    period: "per month",
    description: "Unlimited tools, no ads, no watermark.",
    cta: "Upgrade to Pro",
    href: "/register?plan=pro",
    features: PLANS.pro.features,
    highlight: true,
  },
  {
    key: "business",
    title: PLANS.business.name,
    price: `€${PLANS.business.priceMonthly}`,
    period: "per month",
    description: "API access and team seats.",
    cta: "Talk to us",
    href: "/register?plan=business",
    features: PLANS.business.features,
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ink-900">Simple, honest pricing</h1>
        <p className="mt-3 text-ink-500">
          Free for everyone. Go Pro when you need more. Cancel anytime.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.key}
            className={`relative flex flex-col rounded-lg border bg-white p-8 shadow-card ${
              t.highlight ? "border-brand-500 ring-1 ring-brand-500" : "border-ink-100"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-ink-900">{t.title}</h2>
            <p className="mt-1 text-sm text-ink-500">{t.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold text-ink-900">{t.price}</span>
              <span className="text-sm text-ink-500">/ {t.period}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link href={t.href} className="mt-8">
              <Button variant={t.highlight ? "primary" : "outline"} className="w-full">
                {t.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-ink-400">
        All prices in EUR, VAT excluded. Annual plans available at checkout (save ~30%).
      </p>
    </div>
  );
}
