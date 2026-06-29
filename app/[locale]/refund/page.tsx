import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, HREFLANG_PREFIX, type Locale } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { LegalRender } from "@/lib/legal/render";
import { REFUND_EN } from "@/lib/legal/refund-en";
import { REFUND_TRANSLATIONS } from "@/lib/legal/refund-translations";

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
  for (const l of LOCALES) alts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/refund`;
  alts["x-default"] = `${SITE_URL}/refund`;
  return {
    title: REFUND_TRANSLATIONS[locale]?.h1 ?? "Refund Policy",
    alternates: { canonical: `${HREFLANG_PREFIX[locale]}/refund`, languages: alts },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  const translated = REFUND_TRANSLATIONS[locale];
  // Native version when available; otherwise English with a pending notice.
  if (translated) return <LegalRender doc={translated} locale={locale} slug="refund" />;
  return (
    <>
      <div className="container max-w-3xl pt-10">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">🌍 Translation in progress — {LOCALE_NAMES[locale]}</p>
          <p className="mt-1">
            A native {LOCALE_NAMES[locale]} translation is being prepared. The English version below remains the binding text until the translated version is published.
          </p>
        </div>
      </div>
      <LegalRender doc={REFUND_EN} locale={locale} slug="refund" />
    </>
  );
}
