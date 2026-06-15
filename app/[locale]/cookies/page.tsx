import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, HREFLANG_PREFIX, type Locale } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";
import { LegalRender } from "@/lib/legal/render";
import { COOKIES_EN } from "@/lib/legal/cookies-en";
import { COOKIES_TRANSLATIONS } from "@/lib/legal/cookies-translations";

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
  for (const l of LOCALES) alts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/cookies`;
  alts["x-default"] = `${SITE_URL}/cookies`;
  return {
    title: "Cookie Policy",
    description: "The cookies Konvertools uses and how to control them.",
    alternates: { canonical: `${HREFLANG_PREFIX[locale]}/cookies`, languages: alts },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  const translated = COOKIES_TRANSLATIONS[locale];
  if (translated) return <LegalRender doc={translated} />;
  return (
    <>
      <div className="container max-w-3xl pt-10">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">🌍 Translation in progress — {LOCALE_NAMES[locale]}</p>
          <p className="mt-1">
            A native {LOCALE_NAMES[locale]} translation is being prepared. The English version below remains the authoritative text until the translated version is published.
          </p>
        </div>
      </div>
      <LegalRender doc={COOKIES_EN} />
    </>
  );
}
