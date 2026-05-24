import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PricingTiles } from "@/components/billing/PricingTiles";
import { getStrings } from "@/lib/i18n/strings";
import { getToolUi } from "@/lib/i18n/tool-ui";
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
  const ui = getStrings(locale).pricing;
  const intervalLabels = getToolUi(locale).pricing;
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : undefined} className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-ink-900">{ui.title}</h1>
        <p className="mt-3 text-ink-500">{ui.lead}</p>
      </div>

      <PricingTiles
        strings={{
          mostPopular: ui.mostPopular,
          perMonth: ui.perMonth,
          forever: ui.forever,
          free: ui.free,
          pro: ui.pro,
          business: ui.business,
        }}
        intervalLabels={intervalLabels}
      />

      <p className="mt-10 text-center text-xs text-ink-400">{ui.footnote}</p>
    </div>
  );
}
