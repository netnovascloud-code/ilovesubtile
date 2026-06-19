import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, HREFLANG_PREFIX, type Locale } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { LegalRender } from "@/lib/legal/render";
import { LEGAL_NOTICE_EN } from "@/lib/legal/legal-notice-en";
import { LEGAL_NOTICE_TRANSLATIONS } from "@/lib/legal/legal-notice-translations";
import { LEGAL_NOTICE_TRANSLATIONS_GENERATED } from "@/lib/legal/legal-notice-translations.generated";

// Script-filled locales, overridden by any hand-curated translation.
const LEGAL_NOTICE = { ...LEGAL_NOTICE_TRANSLATIONS_GENERATED, ...LEGAL_NOTICE_TRANSLATIONS };

const LOCALE_NAMES: Record<Locale, string> = {
  en: "English", fr: "Français", es: "Español", pt: "Português", de: "Deutsch",
  it: "Italiano", nl: "Nederlands", ja: "日本語", zh: "中文", ko: "한국어",
  ar: "العربية", ru: "Русский", hi: "हिन्दी", tr: "Türkçe", id: "Bahasa Indonesia",
  vi: "Tiếng Việt", sv: "Svenska", pl: "Polski", uk: "Українська", cs: "Čeština",
};

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
    title: LEGAL_NOTICE[locale]?.h1 ?? "Legal Notice",
    alternates: { canonical: `${HREFLANG_PREFIX[locale]}/legal-notice`, languages: alts },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  const translated = LEGAL_NOTICE[locale];
  // Native version when available; otherwise English with a pending notice
  // (instead of silently serving English with no indication). The English
  // version remains the legally-binding text until a translation is published.
  if (translated) return <LegalRender doc={translated} locale={locale} slug="legal-notice" />;
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
      <LegalRender doc={LEGAL_NOTICE_EN} locale={locale} slug="legal-notice" />
    </>
  );
}
