import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, ArrowRight } from "lucide-react";
import { TOOLS, CATEGORY_BY_ID, type ToolCategory } from "@/lib/tools-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryTheme } from "@/lib/category-theme";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import { ogImageUrl, HREFLANG_PREFIX } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { DEFAULT_LOCALE, localePath, type Locale } from "@/lib/i18n/locales";
import { categoryLabel, categoryBlurb } from "@/lib/i18n/resolve-category-i18n";
import { resolveToolI18n } from "@/lib/i18n/resolve-tool-i18n";
import { getChrome } from "@/lib/i18n/chrome";
import { CATEGORY_FAQ } from "@/lib/i18n/category-faq";

const SITE = "https://konvertools.com";

/** Localized "Home" for the breadcrumb (short, safe across all 19 locales). */
const HOME_LABEL: Record<Locale, string> = {
  en: "Home", fr: "Accueil", es: "Inicio", pt: "Início", de: "Startseite",
  it: "Home", nl: "Home", ja: "ホーム", zh: "首页", ko: "홈", ar: "الرئيسية",
  ru: "Главная", hi: "होम", tr: "Ana sayfa", id: "Beranda", vi: "Trang chủ",
  sv: "Hem", pl: "Strona główna", uk: "Головна", cs: "Domů",
};

/** Shared category landing — lists every tool in the category. On the English
 * canonical it also renders the marketing FAQ; localized variants render the
 * fully-translated hub (label, blurb, tool names) and keep the FAQ on the
 * English page only (which they hreflang-alternate to). */
export function CategoryPage({ category, locale = DEFAULT_LOCALE }: { category: ToolCategory; locale?: Locale }) {
  const def = CATEGORY_BY_ID[category];
  const isEn = locale === DEFAULT_LOCALE;
  const label = categoryLabel(category, locale);
  const blurb = categoryBlurb(category, locale);
  const chrome = getChrome(locale);
  const toolsWord = chrome.nav.tools.toLowerCase();
  const tools = TOOLS.filter((t) => t.category === category);
  const canonical = `${SITE}${HREFLANG_PREFIX[locale]}/${category}`;

  const localized = tools.map((t) => {
    const i18n = isEn ? null : resolveToolI18n(t.slug, locale);
    return {
      slug: t.slug,
      category: t.category,
      icon: t.icon,
      name: i18n?.name ?? t.name,
      short: i18n?.short ?? t.short,
      href: localePath(locale, t.slug),
    };
  });

  const heading = isEn ? `All ${def.label} Tools — Free Online` : label;
  const intro = isEn
    ? `${blurb} Every tool below is free, runs in your browser when it can, and is built around a single conversion — no editor, no sign-up, no nonsense.`
    : blurb;

  // English keeps a richer, category-specific FAQ for SEO; localized variants
  // use the fully-translated generic FAQ so the page reads entirely in-language.
  const faqHeading = isEn ? "Frequently asked questions" : (CATEGORY_FAQ[locale]?.heading ?? CATEGORY_FAQ.en.heading);
  const FAQ: { q: string; a: string }[] = isEn ? [
    {
      q: `Are these ${def.label.toLowerCase()} tools free?`,
      a: `Yes — every tool on this page is free and unlimited for browser-side conversions. AI-powered tools have a generous daily allowance on the free plan; Pro unlocks unlimited runs and larger files.`,
    },
    {
      q: `Are my files uploaded?`,
      a: `Most tools in this category run entirely in your browser via WebAssembly — your files never leave your device. The few that need a server (AI transcription, translation, video burn-in) delete files within 30 minutes of processing.`,
    },
    {
      q: `Do I need to sign up?`,
      a: `No. Every tool works without an account. Sign up only if you want a higher daily quota, larger files, saved templates and the workflow builder.`,
    },
  ] : (CATEGORY_FAQ[locale]?.items ?? CATEGORY_FAQ.en.items);

  return (
    <div>
      <section className="border-b border-ink-100 bg-surface">
        <div className="container py-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500">
            <Link href={localePath(locale)} className="inline-flex items-center hover:text-ink-900">
              <Home className="mr-1 h-3.5 w-3.5" />
              {HOME_LABEL[locale]}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
            <span className="text-ink-900">{label}</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
            {heading}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-500">{intro}</p>
          <p className="mt-2 text-sm text-ink-400">{tools.length} {toolsWord}.</p>
        </div>
      </section>

      <main className="container py-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[1800px]:grid-cols-5 min-[2400px]:grid-cols-6">
          {localized.map((t) => {
            const theme = categoryTheme(t.category);
            return (
              <li key={t.slug}>
                <Link
                  href={t.href}
                  className={cn("group flex items-start gap-3 rounded-lg border border-ink-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5", theme.hoverBorder)}
                >
                  <div className="shrink-0">
                    <ToolGlyph category={t.category} iconName={(t.icon as { displayName?: string }).displayName ?? "Wrench"} px={40} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 font-medium text-ink-900">
                      {t.name}
                      <ArrowRight className="h-3.5 w-3.5 text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-0.5 text-sm text-ink-500">{t.short}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      {FAQ.length > 0 && (
        <section className="border-t border-ink-100 bg-surface">
          <div className="container py-16">
            <h2 className="text-2xl font-semibold text-ink-900">{faqHeading}</h2>
            <dl className="mt-8 grid gap-4 md:grid-cols-2">
              {FAQ.map((f) => (
                <div key={f.q} className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
                  <dt className="font-semibold text-ink-900">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-500">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {FAQ.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: HOME_LABEL[locale], item: `${SITE}${HREFLANG_PREFIX[locale]}/` },
            { "@type": "ListItem", position: 2, name: label, item: canonical },
          ],
        }}
      />
      {/* CollectionPage + ItemList — lets Google enumerate every tool in this
          category as a single hub (improves sitelinks / category indexing). */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: isEn ? `All ${def.label} Tools — Konvertools` : `${label} — Konvertools`,
          description: blurb,
          url: canonical,
          inLanguage: locale,
          isPartOf: { "@type": "WebSite", name: "Konvertools", url: `${SITE}/` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: localized.length,
            itemListElement: localized.map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE}${HREFLANG_PREFIX[locale]}/${t.slug}`,
              name: t.name,
              description: t.short,
            })),
          },
        }}
      />
    </div>
  );
}

/** SEO metadata builder shared by all category routes (English + localized). */
export function categoryMetadata(category: ToolCategory, locale: Locale = DEFAULT_LOCALE): Metadata {
  const def = CATEGORY_BY_ID[category];
  const isEn = locale === DEFAULT_LOCALE;

  // hreflang alternates: every locale points at its own category URL.
  const languages: Record<string, string> = {};
  for (const [loc, prefix] of Object.entries(HREFLANG_PREFIX)) {
    languages[loc] = `${prefix}/${category}`;
  }
  languages["x-default"] = `/${category}`;

  if (!isEn) {
    const label = categoryLabel(category, locale);
    const blurb = categoryBlurb(category, locale);
    const title = `${label} | Konvertools`;
    return {
      title: { absolute: title },
      description: blurb,
      alternates: { canonical: `${HREFLANG_PREFIX[locale]}/${category}`, languages },
      openGraph: {
        type: "website",
        url: `${SITE}${HREFLANG_PREFIX[locale]}/${category}`,
        title,
        description: blurb,
        siteName: "Konvertools",
        images: [ogImageUrl(label, blurb)],
      },
      twitter: { card: "summary_large_image", title, images: [ogImageUrl(label, blurb)] },
      robots: { index: true, follow: true },
    };
  }

  const titles: Record<ToolCategory, string> = {
    documents: "All Document Conversion Tools — Free Online",
    audio: "All Audio Converter Tools — Free Online",
    video: "All Video Converter Tools — Free Online",
    images: "All Image Converter & Editor Tools — Free Online",
    subtitles: "All Subtitle Tools — Generate, Convert, Translate",
    developer: "All Code & Developer Tools — Free Online",
    "text-ai": "AI Text Tools — Translate, Rephrase, Summarize Free",
    utilities: "Online Utilities — QR, Colors, Units, Currencies & More",
    archives: "Archive Tools — Create & Extract ZIP Online Free",
    security: "Security Tools — Email, SSL, Password & Phishing Checkers",
  };
  const seeds: Record<ToolCategory, string[]> = {
    documents: ["pdf tools", "document converter", "pdf converter online", "merge pdf", "compress pdf", "pdf to word"],
    audio: ["audio converter", "convert audio online", "mp3 converter", "compress audio", "extract audio", "audio editor online"],
    video: ["video converter", "convert video online", "mp4 converter", "compress video", "video to gif", "trim video"],
    images: ["image converter", "convert image online", "image editor", "compress image", "resize image", "remove background"],
    subtitles: ["subtitle tools", "generate subtitles", "srt converter", "translate subtitles", "subtitle editor online"],
    developer: ["developer tools", "code formatter", "json formatter", "base64 encode", "code converter online"],
    "text-ai": ["ai text tools", "ai translator", "paraphrasing tool", "summarize text", "ai humanizer", "free ai writer"],
    utilities: ["online utilities", "qr code generator", "color picker", "unit converter", "currency converter"],
    archives: ["archive tools", "create zip online", "extract zip", "unzip online free", "zip files"],
    security: ["email verifier", "check email valid", "phishing email checker", "url scanner", "is this link safe", "ssl certificate checker", "password breach checker"],
  };
  const title = titles[category];
  const description = `${def.blurb} Free, fast, browser-first — no sign-up needed.`;
  const toolPks = TOOLS.filter((t) => t.category === category).map((t) => t.primaryKeyword.toLowerCase());
  const keywords = Array.from(new Set([
    `${def.label.toLowerCase()} tools`,
    `free ${def.label.toLowerCase()} tools online`,
    ...seeds[category],
    ...toolPks,
  ])).slice(0, 28);
  return {
    title: { absolute: `${title} | Konvertools` },
    description,
    keywords,
    alternates: { canonical: `/${category}`, languages },
    openGraph: {
      type: "website",
      url: `${SITE}/${category}`,
      title: `${title} | Konvertools`,
      description,
      siteName: "Konvertools",
      images: [ogImageUrl(title, def.blurb)],
    },
    twitter: { card: "summary_large_image", title: `${title} | Konvertools`, images: [ogImageUrl(title, def.blurb)] },
    robots: { index: true, follow: true },
  };
}
