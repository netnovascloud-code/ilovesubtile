"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntervalToggle, type Interval } from "@/components/billing/IntervalToggle";
import { UpgradeButton } from "@/components/billing/UpgradeButton";
import { PLANS, FREE_PLAN } from "@/lib/stripe";
import type { ToolUiStrings } from "@/lib/i18n/tool-ui";
import type { PlanFeatures } from "@/lib/i18n/plan-features";

type Strings = {
  mostPopular: string;
  perMonth: string;
  forever: string;
  free: { desc: string; cta: string };
  pro: { desc: string; cta: string };
  business: { desc: string; cta: string };
};

export function PricingTiles({
  strings,
  intervalLabels,
  features,
}: {
  strings: Strings;
  intervalLabels: ToolUiStrings["pricing"];
  features: PlanFeatures;
}) {
  const [interval, setInterval] = useState<Interval>("monthly");

  const proPrice = interval === "monthly" ? PLANS.pro.priceMonthly : Math.round(PLANS.pro.priceAnnual / 12);
  const bizPrice = interval === "monthly" ? PLANS.business.priceMonthly : Math.round(PLANS.business.priceAnnual / 12);
  const proAnnualTotal = PLANS.pro.priceAnnual;
  const bizAnnualTotal = PLANS.business.priceAnnual;

  return (
    <>
      <div className="mt-8 flex justify-center">
        <IntervalToggle value={interval} onChange={setInterval} labels={intervalLabels} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="flex flex-col rounded-lg border border-ink-100 bg-white p-8 shadow-card">
          <h2 className="text-lg font-semibold text-ink-900">{FREE_PLAN.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{strings.free.desc}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€0</span>
            <span className="text-sm text-ink-500">/ {strings.forever}</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {features.free.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/register" className="mt-8">
            <Button variant="outline" className="w-full">
              {strings.free.cta}
            </Button>
          </Link>
        </div>

        <div className="relative flex flex-col rounded-lg border border-brand-500 bg-white p-8 shadow-card ring-1 ring-brand-500">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
            {strings.mostPopular}
          </span>
          <h2 className="text-lg font-semibold text-ink-900">{PLANS.pro.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{strings.pro.desc}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€{proPrice}</span>
            <span className="text-sm text-ink-500">/ {strings.perMonth}</span>
          </div>
          {interval === "annual" && (
            <div className="mt-1 text-xs text-ink-400">€{proAnnualTotal} billed yearly</div>
          )}
          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {features.pro.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <UpgradeButton plan="pro" interval={interval} label={strings.pro.cta} className="w-full" />
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-ink-100 bg-white p-8 shadow-card">
          <h2 className="text-lg font-semibold text-ink-900">{PLANS.business.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{strings.business.desc}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€{bizPrice}</span>
            <span className="text-sm text-ink-500">/ {strings.perMonth}</span>
          </div>
          {interval === "annual" && (
            <div className="mt-1 text-xs text-ink-400">€{bizAnnualTotal} billed yearly</div>
          )}
          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {features.business.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <UpgradeButton plan="business" interval={interval} label={strings.business.cta} variant="outline" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
