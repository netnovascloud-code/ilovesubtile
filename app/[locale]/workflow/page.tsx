import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkflowBuilderClient } from "@/components/tools/clients/WorkflowBuilderClient";
import { ProGate } from "@/components/billing/ProGate";
import { getWorkflow } from "@/lib/i18n/page-workflow";
import { NON_DEFAULT_LOCALES, isLocale, isRtl } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/utils";
import { HREFLANG_PREFIX, LOCALES } from "@/lib/seo";

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale) || params.locale === "en") return {};
  const locale = params.locale;
  const t = getWorkflow(locale);
  const canonicalPath = `${HREFLANG_PREFIX[locale]}/workflow`;
  const alts: Record<string, string> = {};
  for (const loc of LOCALES) alts[loc] = `${SITE_URL}${HREFLANG_PREFIX[loc]}/workflow`;
  alts["x-default"] = `${SITE_URL}/workflow`;
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: { canonical: canonicalPath, languages: alts },
  };
}

export default function LocalisedWorkflow({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  const locale = params.locale;
  const t = getWorkflow(locale);
  const rtl = isRtl(locale);

  return (
    <section dir={rtl ? "rtl" : undefined} className="bg-surface">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">{t.hero.title}</h1>
          <p className="mt-3 text-ink-500">{t.hero.lead}</p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <ProGate>
            <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card md:p-7">
              <WorkflowBuilderClient locale={locale} />
            </div>
          </ProGate>
        </div>
      </div>
    </section>
  );
}
