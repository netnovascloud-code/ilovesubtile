import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { DashboardView } from "@/components/account/DashboardView";
import { isLocale } from "@/lib/i18n/locales";
import { getDashboard } from "@/lib/i18n/account";

// Auth/cookie-driven, per-user — never statically generated. Reading headers()
// here (outside any try/catch) forces on-demand rendering; otherwise the parent
// [locale] layout's generateStaticParams would prerender it at build with no
// session, baking a static /login redirect. (Same approach as [locale]/billing.)
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const title = isLocale(params.locale) ? getDashboard(params.locale).title : "Dashboard";
  return { title, robots: { index: false, follow: false } };
}

export default function LocalisedDashboard({ params }: { params: { locale: string } }) {
  headers(); // force dynamic rendering (uncaught dynamic-API read)
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  return <DashboardView locale={params.locale} />;
}
