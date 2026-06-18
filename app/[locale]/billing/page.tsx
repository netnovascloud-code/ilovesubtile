import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { BillingView } from "@/components/account/BillingView";
import { isLocale } from "@/lib/i18n/locales";
import { getBilling } from "@/lib/i18n/account";

// Auth/cookie-driven, per-user — never statically generated. The parent
// [locale] layout exports generateStaticParams (for the static pricing/legal
// pages), so Next would otherwise try to prerender this route at build with no
// session — and BillingView's try/catch swallows the dynamic bail, baking a
// static redirect to /login. Reading headers() here (outside any try/catch)
// forces on-demand rendering for every /<locale>/billing.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const title = isLocale(params.locale) ? getBilling(params.locale).title : "Billing";
  return { title, robots: { index: false, follow: false } };
}

export default function LocalisedBilling({ params }: { params: { locale: string } }) {
  headers(); // force dynamic rendering (uncaught dynamic-API read)
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  return <BillingView locale={params.locale} />;
}
