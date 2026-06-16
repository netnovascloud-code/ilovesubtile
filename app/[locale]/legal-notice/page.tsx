import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, HREFLANG_PREFIX, type Locale } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { LegalRender } from "@/lib/legal/render";
import { LEGAL_NOTICE_EN } from "@/lib/legal/legal-notice-en";
import { LEGAL_NOTICE_TRANSLATIONS } from "@/lib/legal/legal-notice-translations";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) return {};
  const alts: Record<string, string> = {};
  for (const l of LOCALES) alts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/legal-notice`;
  alts["x-default"] = `${SITE_URL}/legal-notice`;
  return {
    title: LEGAL_NOTICE_TRANSLATIONS[locale]?.h1 ?? "Legal Notice",
    alternates: { canonical: `${HREFLANG_PREFIX[locale]}/legal-notice`, languages: alts },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  const translated = LEGAL_NOTICE_TRANSLATIONS[locale];
  return <LegalRender doc={translated ?? LEGAL_NOTICE_EN} />;
}
