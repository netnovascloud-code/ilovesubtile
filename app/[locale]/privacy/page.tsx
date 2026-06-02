// Localized Privacy Policy route. Until native translations land, all 19
// non-English locales render the English source with a clearly-flagged
// "translation in progress" notice. The English version remains the
// legally-binding version. hreflang is wired in lib/seo.ts.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivacyPage from "@/app/privacy/page";
import { LOCALES, HREFLANG_PREFIX, type Locale } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

const LOCALE_NAMES: Record<Locale, string> = {
  en: "English", fr: "Français", es: "Español", pt: "Português", de: "Deutsch",
  it: "Italiano", nl: "Nederlands", ja: "日本語", zh: "中文", ko: "한국어",
  ar: "العربية", ru: "Русский", hi: "हिन्दी", tr: "Türkçe", id: "Bahasa Indonesia",
  vi: "Tiếng Việt", sv: "Svenska", pl: "Polski", uk: "Українська", cs: "Čeština",
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) return {};
  const alts: Record<string, string> = {};
  for (const l of LOCALES) alts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/privacy`;
  alts["x-default"] = `${SITE_URL}/privacy`;
  return {
    title: "Privacy Policy",
    description: "How Konvertools handles your data — GDPR-compliant, files never stored.",
    alternates: { canonical: `${HREFLANG_PREFIX[locale]}/privacy`, languages: alts },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  return (
    <>
      <div className="container max-w-3xl pt-10">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">🌍 Translation in progress — {LOCALE_NAMES[locale]}</p>
          <p className="mt-1">
            A native {LOCALE_NAMES[locale]} translation is being prepared. The English version below remains the legally-binding text until the translated version is published.
          </p>
        </div>
      </div>
      <PrivacyPage />
    </>
  );
}
