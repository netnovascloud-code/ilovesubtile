import type { Metadata } from "next";
import type { ToolDefinition } from "@/lib/tools-config";
import { SITE_URL } from "@/lib/utils";

export const LOCALES = ["en", "fr", "es", "pt", "de", "it", "nl", "ja", "zh", "ko", "ar", "ru", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

/** Path prefix used by each locale. Empty for the default (English). */
export const HREFLANG_PREFIX: Record<Locale, string> = {
  en: "",
  fr: "/fr",
  es: "/es",
  pt: "/pt",
  de: "/de",
  it: "/it",
  nl: "/nl",
  ja: "/ja",
  zh: "/zh",
  ko: "/ko",
  ar: "/ar",
  ru: "/ru",
  hi: "/hi",
};

/** Build the canonical and hreflang alternates for a given tool + locale. */
export function buildToolMetadata(
  tool: ToolDefinition,
  locale: Locale = "en",
  override?: { name?: string; h1?: string; metaTitle?: string; metaDescription?: string; primaryKeyword?: string },
): Metadata {
  const slugPath = `/${tool.slug}`;
  const canonicalPath = `${HREFLANG_PREFIX[locale]}${slugPath}`;
  const canonical = `${SITE_URL}${canonicalPath}`;

  const alts: Record<string, string> = {};
  for (const loc of LOCALES) {
    alts[loc] = `${SITE_URL}${HREFLANG_PREFIX[loc]}${slugPath}`;
  }
  alts["x-default"] = `${SITE_URL}${slugPath}`;

  const title = override?.metaTitle ?? tool.metaTitle;
  const description = override?.metaDescription ?? tool.metaDescription;
  const name = override?.name ?? tool.name;
  const primaryKeyword = override?.primaryKeyword ?? tool.primaryKeyword;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    keywords: [primaryKeyword, name, "subtitles", "captions", "SRT", "VTT"],
    alternates: { canonical: canonicalPath, languages: alts },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "CaptionFlow",
      locale: locale === "en" ? "en_US" : locale.replace("-", "_"),
      images: [{ url: `/og/${tool.slug}.png`, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og/${tool.slug}.png`],
    },
    robots: { index: true, follow: true },
  };
}

export function softwareApplicationSchema(
  tool: ToolDefinition,
  locale: Locale = "en",
  override?: { name?: string; metaDescription?: string },
) {
  const name = override?.name ?? tool.name;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} — CaptionFlow`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    description: override?.metaDescription ?? tool.metaDescription,
    inLanguage: locale,
    url: `${SITE_URL}${HREFLANG_PREFIX[locale]}/${tool.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2847",
    },
  };
}

export function faqPageSchema(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(
  tool: ToolDefinition,
  locale: Locale = "en",
  override?: { name?: string; homeLabel?: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: override?.homeLabel ?? "Home", item: `${SITE_URL}${HREFLANG_PREFIX[locale]}/` },
      { "@type": "ListItem", position: 2, name: override?.name ?? tool.name, item: `${SITE_URL}${HREFLANG_PREFIX[locale]}/${tool.slug}` },
    ],
  };
}
