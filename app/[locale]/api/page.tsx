import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";
import { NON_DEFAULT_LOCALES, isLocale } from "@/lib/i18n/locales";
import { resolveToolI18n } from "@/lib/i18n/resolve-tool-i18n";
import { ApiDocsBody } from "@/app/api/ApiDocsBody";

const tool = TOOLS_BY_SLUG.api;

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale) || params.locale === "en") return {};
  const i18n = resolveToolI18n(tool.slug, params.locale);
  return buildToolMetadata(tool, params.locale, i18n ?? undefined);
}

export default function LocalisedApiDocsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale === "en") notFound();
  const locale = params.locale;
  const i18n = resolveToolI18n(tool.slug, locale);
  const override = i18n ? { name: i18n.name, h1: i18n.h1, metaDescription: i18n.metaDescription } : undefined;

  return (
    <ToolPageShell tool={tool} locale={locale} override={override}>
      <ApiDocsBody locale={locale} />
    </ToolPageShell>
  );
}
