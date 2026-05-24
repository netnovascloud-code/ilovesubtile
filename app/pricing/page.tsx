import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "@/components/billing/UpgradeButton";
import { PLANS, FREE_PLAN } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free for casual use. Pro at €12/month for unlimited subtitle generation, translation, sync and burn-in. Business at €49/month with API access.",
  alternates: { canonical: "/pricing" },
};

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
        <div className="flex flex-col rounded-lg border border-ink-100 bg-white p-8 shadow-card">
          <h2 className="text-lg font-semibold text-ink-900">{FREE_PLAN.name}</h2>
          <p className="mt-1 text-sm text-ink-500">Great for one-off jobs.</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€0</span>
            <span className="text-sm text-ink-500">/ forever</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {FREE_PLAN.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/register" className="mt-8">
            <Button variant="outline" className="w-full">
              Get started
            </Button>
          </Link>
        </div>

        <div className="relative flex flex-col rounded-lg border border-brand-500 bg-white p-8 shadow-card ring-1 ring-brand-500">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
            Most popular
          </span>
          <h2 className="text-lg font-semibold text-ink-900">{PLANS.pro.name}</h2>
          <p className="mt-1 text-sm text-ink-500">Unlimited tools, no ads, no watermark.</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€{PLANS.pro.priceMonthly}</span>
            <span className="text-sm text-ink-500">/ month</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {PLANS.pro.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <UpgradeButton plan="pro" label="Upgrade to Pro" className="w-full" />
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-ink-100 bg-white p-8 shadow-card">
          <h2 className="text-lg font-semibold text-ink-900">{PLANS.business.name}</h2>
          <p className="mt-1 text-sm text-ink-500">API access and team seats.</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€{PLANS.business.priceMonthly}</span>
            <span className="text-sm text-ink-500">/ month</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {PLANS.business.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <UpgradeButton plan="business" label="Choose Business" variant="outline" className="w-full" />
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-ink-400">
        All prices in EUR, VAT excluded. Annual plans available at checkout (save ~30%).
      </p>
    </div>
  );
}
