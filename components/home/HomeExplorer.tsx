"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolIcon } from "@/components/tools/ToolIcon";
import type { ToolCardSpec, ToolCategory } from "@/lib/tools-config";

const TONE_BG: Record<ToolCardSpec["tone"], string> = {
  blue: "bg-brand-50 text-brand-600",
  indigo: "bg-indigo-50 text-indigo-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-500",
  violet: "bg-violet-50 text-violet-600",
  teal: "bg-teal-50 text-teal-600",
  slate: "bg-slate-100 text-slate-600",
};

type CategoryChip = { id: ToolCategory; label: string; iconName: string; tone: ToolCardSpec["tone"] };

export type HomeStrings = {
  title: string;
  placeholder: string;
  all: string;
  suggestions: string[];
  free: string;
  empty: string;
};

export function HomeExplorer({
  tools,
  categories,
  categoryLabels,
  strings,
  prefix = "",
}: {
  tools: ToolCardSpec[];
  categories: CategoryChip[];
  categoryLabels: Record<string, string>;
  strings: HomeStrings;
  prefix?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ToolCategory | "all">("all");

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      if (active !== "all" && t.category !== active) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.slug.replace(/-/g, " ").includes(q)
      );
    });
  }, [tools, active, q]);

  const grouped = useMemo(() => {
    const map = new Map<ToolCategory, ToolCardSpec[]>();
    for (const t of filtered) {
      const arr = map.get(t.category) ?? [];
      arr.push(t);
      map.set(t.category, arr);
    }
    return categories
      .map((c) => ({ category: c, items: map.get(c.id) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [filtered, categories]);

  function Card({ t }: { t: ToolCardSpec }) {
    return (
      <Link
        href={`${prefix}/${t.slug}`}
        className="group relative flex flex-col rounded-lg border border-ink-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-cardHover"
      >
        <div className={cn("grid h-10 w-10 place-items-center rounded-lg transition-transform duration-200 group-hover:scale-105", TONE_BG[t.tone])}>
          <ToolIcon name={t.iconName} className="h-[18px] w-[18px]" />
        </div>
        <h3 className="mt-4 font-semibold text-ink-900">{t.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.short}</p>
        {t.free && (
          <span className="mt-3 inline-flex w-fit items-center rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
            {strings.free}
          </span>
        )}
      </Link>
    );
  }

  return (
    <>
      {/* Search hero */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">{strings.title}</h1>
            <div className="relative mt-6">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                placeholder={strings.placeholder}
                className="w-full rounded-xl border border-ink-200 bg-white py-4 pl-12 pr-4 text-base text-ink-900 shadow-card placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {strings.suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setActive("all"); }}
                  className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Category chips */}
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
            <button
              onClick={() => setActive("all")}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === "all" ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
              )}
            >
              {strings.all}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActive(c.id); setQuery(""); }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active === c.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
                )}
              >
                <ToolIcon name={c.iconName} className="h-4 w-4" />
                {categoryLabels[c.id] ?? c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section id="tools" className="scroll-mt-20 bg-white">
        <div className="container py-10">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-ink-500">{strings.empty}</p>
          ) : q || active !== "all" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((t) => <Card key={t.slug} t={t} />)}
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map(({ category, items }) => (
                <div key={category.id}>
                  <div className="flex items-center gap-2">
                    <div className={cn("grid h-8 w-8 place-items-center rounded-lg", TONE_BG[category.tone])}>
                      <ToolIcon name={category.iconName} className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-ink-900">
                      {categoryLabels[category.id] ?? category.label}
                    </h2>
                    <Link href={`#tools`} onClick={() => setActive(category.id)} className="ml-auto inline-flex items-center text-sm text-brand-600 hover:underline">
                      {items.length} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((t) => <Card key={t.slug} t={t} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
