import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "@/components/billing/UpgradeButton";
import { PLANS, FREE_PLAN } from "@/lib/stripe";
import { getStrings } from "@/lib/i18n/strings";
import { NON_DEFAULT_LOCALES, isLocale, isRtl } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/utils";
import { HREFLANG_PREFIX, LOCALES } from "@/lib/seo";

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale) || params.locale === "en") return {};
  const locale = params.locale;
  const ui = getStrings(locale);
  const canonicalPath = `${HREFLANG_PREFIX[locale]}/pricing`;
  const alts: Record<string, string> = {};
  for (const loc of LOCALES) alts[loc] = `${SITE_URL}${HREFLANG_PREFIX[loc]}/pricing`;
  alts["x-default"] = `${SITE_URL}/pricing`;
  return {
    title: { absolute: `${ui.pricing.title} — CaptionFlow` },
    description: ui.pricing.lead,
    alternates: { canonical: canonicalPath, languages: alts },
  };
}

export default function LocalisedPricing({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  const locale = params.locale;
  const ui = getStrings(locale);
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : undefined} className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ink-900">{ui.pricing.title}</h1>
        <p className="mt-3 text-ink-500">{ui.pricing.lead}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="flex flex-col rounded-lg border border-ink-100 bg-white p-8 shadow-card">
          <h2 className="text-lg font-semibold text-ink-900">{FREE_PLAN.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{ui.pricing.free.desc}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€0</span>
            <span className="text-sm text-ink-500">/ {ui.pricing.forever}</span>
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
              {ui.pricing.free.cta}
            </Button>
          </Link>
        </div>

        <div className="relative flex flex-col rounded-lg border border-brand-500 bg-white p-8 shadow-card ring-1 ring-brand-500">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
            {ui.pricing.mostPopular}
          </span>
          <h2 className="text-lg font-semibold text-ink-900">{PLANS.pro.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{ui.pricing.pro.desc}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€{PLANS.pro.priceMonthly}</span>
            <span className="text-sm text-ink-500">/ {ui.pricing.perMonth}</span>
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
            <UpgradeButton plan="pro" label={ui.pricing.pro.cta} className="w-full" />
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-ink-100 bg-white p-8 shadow-card">
          <h2 className="text-lg font-semibold text-ink-900">{PLANS.business.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{ui.pricing.business.desc}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-ink-900">€{PLANS.business.priceMonthly}</span>
            <span className="text-sm text-ink-500">/ {ui.pricing.perMonth}</span>
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
            <UpgradeButton plan="business" label={ui.pricing.business.cta} variant="outline" className="w-full" />
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-ink-400">{ui.pricing.footnote}</p>
    </div>
  );
}
