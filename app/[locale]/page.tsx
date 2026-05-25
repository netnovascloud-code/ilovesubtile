import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Sparkles, Zap, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS } from "@/lib/tools-config";
import { getStrings } from "@/lib/i18n/strings";
import { isLocale, NON_DEFAULT_LOCALES, isRtl, localePath } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/utils";
import { HREFLANG_PREFIX, LOCALES } from "@/lib/seo";

const ICON_BY_REASON = [Zap, Sparkles, Globe2, ShieldCheck];

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale) || params.locale === "en") return {};
  const locale = params.locale;
  const ui = getStrings(locale);
  const canonicalPath = `${HREFLANG_PREFIX[locale]}/`;
  const alts: Record<string, string> = {};
  for (const loc of LOCALES) alts[loc] = `${SITE_URL}${HREFLANG_PREFIX[loc]}/`;
  alts["x-default"] = `${SITE_URL}/`;
  return {
    title: { absolute: `CaptionFlow — ${ui.hero.title}` },
    description: ui.hero.subtitle,
    alternates: { canonical: canonicalPath, languages: alts },
    openGraph: {
      title: `CaptionFlow — ${ui.hero.title}`,
      description: ui.hero.subtitle,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: "CaptionFlow",
      locale,
    },
  };
}

export default function LocaleHome({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  const locale = params.locale;
  const ui = getStrings(locale);
  const rtl = isRtl(locale);

  return (
    <div dir={rtl ? "rtl" : undefined}>
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              {ui.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
              {ui.hero.title}
            </h1>
            <p className="mt-4 text-lg text-ink-500">{ui.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={localePath(locale, "subtitle-generator")}>
                <Button size="lg">
                  {ui.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`${localePath(locale)}#tools`}>
                <Button size="lg" variant="outline">
                  {ui.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-20 border-t border-ink-100 bg-white">
        <div className="container py-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900">
              {ui.home.toolsTitle}
            </h2>
            <p className="mt-3 text-ink-500">{ui.home.toolsLead}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-white">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-900">{ui.home.whyTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ui.home.reasons.map((r, i) => {
              const Icon = ICON_BY_REASON[i] ?? Sparkles;
              return (
                <div key={r.title} className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
                  <div className="grid h-10 w-10 place-items-center rounded bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-ink-900">{r.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-surface">
        <div className="container py-20">
          <div className="rounded-lg border border-ink-100 bg-white p-10 shadow-card md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
                  {ui.home.upgradeTitle}
                </h2>
                <p className="mt-3 text-ink-500">{ui.home.upgradeBody}</p>
                <div className="mt-6 flex gap-3">
                  <Link href={localePath(locale, "pricing")}>
                    <Button>{ui.home.upgradeCtaPrimary}</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">{ui.home.upgradeCtaSecondary}</Button>
                  </Link>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-ink-700">
                {ui.home.upgradeFeatures.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
