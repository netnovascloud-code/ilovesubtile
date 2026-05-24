import type { Metadata } from "next";
import type { ToolDefinition } from "@/lib/tools-config";
import { SITE_URL } from "@/lib/utils";

export const LOCALES = ["en", "fr", "es", "pt", "de", "it", "nl", "ja", "zh", "ko", "ar", "ru", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

/** Localised path prefixes used for hreflang only. Pages may or may not exist yet. */
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

export function buildToolMetadata(tool: ToolDefinition): Metadata {
  const path = `/${tool.slug}`;
  const url = `${SITE_URL}${path}`;
  const alts: Record<string, string> = {};
  for (const loc of LOCALES) {
    alts[loc] = `${SITE_URL}${HREFLANG_PREFIX[loc]}${path}`;
  }
  alts["x-default"] = url;

  return {
    metadataBase: new URL(SITE_URL),
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, tool.name, "subtitles", "captions", "SRT", "VTT"],
    alternates: { canonical: path, languages: alts },
    openGraph: {
      type: "website",
      url,
      title: tool.metaTitle,
      description: tool.metaDescription,
      siteName: "CaptionFlow",
      images: [{ url: `/og/${tool.slug}.png`, width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: [`/og/${tool.slug}.png`],
    },
    robots: { index: true, follow: true },
  };
}

export function softwareApplicationSchema(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${tool.name} — CaptionFlow`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    description: tool.metaDescription,
    url: `${SITE_URL}/${tool.slug}`,
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

export function breadcrumbSchema(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: tool.name, item: `${SITE_URL}/${tool.slug}` },
    ],
  };
}
