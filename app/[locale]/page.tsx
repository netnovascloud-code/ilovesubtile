import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HomeExplorer } from "@/components/home/HomeExplorer";
import { TOOLS, CATEGORIES, toCardSpec } from "@/lib/tools-config";
import { toolKeywords } from "@/lib/keywords";
import { categoryLabel } from "@/lib/i18n/resolve-category-i18n";
import { getStrings } from "@/lib/i18n/strings";
import { getHomeExplorer } from "@/lib/i18n/home-explorer";
import { isLocale, NON_DEFAULT_LOCALES, isRtl, localePath } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/utils";
import { HREFLANG_PREFIX, LOCALES } from "@/lib/seo";

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
    title: { absolute: `Konver — ${ui.hero.title}` },
    description: ui.hero.subtitle,
    alternates: { canonical: canonicalPath, languages: alts },
    openGraph: {
      title: `Konver — ${ui.hero.title}`,
      description: ui.hero.subtitle,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: "Konver",
      locale,
    },
  };
}

export default function LocaleHome({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  const locale = params.locale;
  const ui = getStrings(locale);
  const rtl = isRtl(locale);
  // Enrich the search haystack with locale-aware keyword variants.
  const tools = TOOLS.map((t) => ({ ...toCardSpec(t), keywords: toolKeywords(t, locale).join(" ") }));
  const categories = CATEGORIES.map((c) => ({ id: c.id, label: categoryLabel(c.id, locale), iconName: c.iconName, tone: c.tone }));
  const categoryLabels = Object.fromEntries(CATEGORIES.map((c) => [c.id, categoryLabel(c.id, locale)]));
  const hx = getHomeExplorer(locale);
  const SUGGEST = [
    { query: "jpg to png", category: "images" },
    { query: "compress", category: "images" },
    { query: "json to csv", category: "developer" },
    { query: "translate", category: "text-ai" },
    { query: "subtitle", category: "subtitles" },
  ] as const;

  return (
    <div dir={rtl ? "rtl" : undefined}>
      <HomeExplorer
        tools={tools}
        categories={categories}
        categoryLabels={categoryLabels}
        prefix={localePath(locale)}
        strings={{
          title: hx.title,
          subtitle: hx.subtitle,
          placeholder: hx.placeholder,
          all: hx.all,
          counter: hx.counter.replace("{n}", String(tools.length)),
          suggestions: SUGGEST.map((s, i) => ({ ...s, label: hx.suggestions[i] })),
          ai: hx.ai,
          seeAll: hx.seeAll,
          empty: hx.empty,
        }}
      />

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
