import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ToolDefinition } from "@/lib/tools-config";
import { DEFAULT_LOCALE, type Locale, localePath } from "@/lib/i18n/locales";
import { getToolI18n } from "@/lib/i18n/tool-translations";
import { getChrome } from "@/lib/i18n/chrome";

export function ToolCard({
  tool,
  locale = DEFAULT_LOCALE,
}: {
  tool: ToolDefinition;
  locale?: Locale;
}) {
  const Icon = tool.icon;
  const i18n = locale === "en" ? null : getToolI18n(tool.slug, locale);
  const chrome = getChrome(locale);
  const name = i18n?.name ?? tool.name;
  const short = i18n?.short ?? tool.short;
  return (
    <Link
      href={localePath(locale, tool.slug)}
      className="group relative flex flex-col rounded-lg border border-ink-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-cardHover"
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg border border-ink-100 bg-ink-50 text-ink-500 transition-colors duration-200 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 font-semibold text-ink-900">{name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-500">{short}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
        {chrome.card.open} <ArrowRight className="ml-1 h-4 w-4" />
      </div>
      {tool.proOnly && (
        <span className="absolute right-4 top-4 rounded bg-ink-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-600">
          {chrome.card.pro}
        </span>
      )}
    </Link>
  );
}
