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

const DRAFT: Partial<Record<Locale, string>> = {
  en: "⚠ This legal notice is being finalised. Fields shown in [brackets] are placeholders awaiting the publisher's verified details.",
  fr: "⚠ Ces mentions légales sont en cours de finalisation. Les champs entre [crochets] sont des espaces réservés en attente des informations vérifiées de l'éditeur.",
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) return {};
  const alts: Record<string, string> = {};
  for (const l of LOCALES) alts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/legal-notice`;
  alts["x-default"] = `${SITE_URL}/legal-notice`;
  return {
    title: LEGAL_NOTICE_TRANSLATIONS[locale]?.h1 ?? "Legal Notice",
    alternates: { canonical: `${HREFLANG_PREFIX[locale]}/legal-notice`, languages: alts },
    robots: { index: false, follow: true },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  const translated = LEGAL_NOTICE_TRANSLATIONS[locale];
  const banner = DRAFT[locale] ?? DRAFT.en!;
  return (
    <>
      <div className="container max-w-3xl pt-10">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{banner}</div>
      </div>
      <LegalRender doc={translated ?? LEGAL_NOTICE_EN} />
    </>
  );
}
