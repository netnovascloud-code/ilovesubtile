import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ToolDefinition } from "@/lib/tools-config";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/seo";
import { localePath } from "@/lib/i18n/locales";
import { getToolI18n } from "@/lib/i18n/tool-translations";

const TONE_BG: Record<ToolDefinition["tone"], string> = {
  blue: "bg-brand-50 text-brand-600",
  indigo: "bg-indigo-50 text-indigo-600",
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-600",
  violet: "bg-violet-50 text-violet-600",
  teal: "bg-teal-50 text-teal-600",
  slate: "bg-ink-100 text-ink-700",
};

export function ToolCard({ tool, locale = "en" }: { tool: ToolDefinition; locale?: Locale }) {
  const Icon = tool.icon;
  const i18n = locale === "en" ? null : getToolI18n(tool.slug, locale);
  const name = i18n?.name ?? tool.name;
  const short = i18n?.short ?? tool.short;
  return (
    <Link
      href={localePath(locale, tool.slug)}
      className="group relative flex flex-col rounded-lg border border-ink-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-ink-200"
    >
      <div className={cn("grid h-10 w-10 place-items-center rounded", TONE_BG[tool.tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-semibold text-ink-900">{name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-500">{short}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
        Open <ArrowRight className="ml-1 h-4 w-4" />
      </div>
      {tool.proOnly && (
        <span className="absolute right-4 top-4 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
          Pro
        </span>
      )}
    </Link>
  );
}
