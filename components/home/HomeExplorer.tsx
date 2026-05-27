"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import { categoryTheme, categoryGradient } from "@/lib/category-theme";
import type { ToolCardSpec, ToolCategory } from "@/lib/tools-config";

type CategoryChip = { id: ToolCategory; label: string; iconName: string };
export type HomeSuggestion = { label: string; query: string; category: ToolCategory };

export type HomeStrings = {
  title: string;
  subtitle: string;
  placeholder: string;
  all: string;
  suggestions: HomeSuggestion[];
  free: string;
  ai: string;
  seeAll: string; // "{n}" placeholder
  empty: string;
};

const PREVIEW_PER_CATEGORY = 4;

// Light synonym expansion so common phrasings still match.
const SYNONYMS: Record<string, string[]> = {
  photo: ["image"], photos: ["image"], picture: ["image"], pic: ["image"],
  pics: ["image"], js: ["javascript"], regexp: ["regex"], yml: ["yaml"],
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

  // Only surface categories that actually have tools (no dead-end filters).
  const presentCategories = useMemo(() => {
    const present = new Set(tools.map((t) => t.category));
    return categories.filter((c) => present.has(c.id));
  }, [tools, categories]);

  const filtered = useMemo(() => {
    if (!q) return tools.filter((t) => active === "all" || t.category === active);
    const terms = [q, ...(SYNONYMS[q] ?? [])];
    return tools.filter((t) => {
      if (active !== "all" && t.category !== active) return false;
      const hay = `${t.name} ${t.short} ${t.keywords} ${t.slug.replace(/-/g, " ")}`.toLowerCase();
      return terms.some((term) => hay.includes(term));
    });
  }, [tools, active, q]);

  const grouped = useMemo(() => {
    const map = new Map<ToolCategory, ToolCardSpec[]>();
    for (const t of filtered) {
      const arr = map.get(t.category) ?? [];
      arr.push(t);
      map.set(t.category, arr);
    }
    return presentCategories
      .map((c) => ({ chip: c, items: map.get(c.id) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [filtered, presentCategories]);

  const showGrouped = !q && active === "all";

  function Card({ t }: { t: ToolCardSpec }) {
    const th = categoryTheme(t.category);
    return (
      <Link
        href={`${prefix}/${t.slug}`}
        className={cn(
          "group relative flex flex-col rounded-xl border-b-2 border-transparent bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-cardHover",
          th.hoverBorderB,
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <ToolGlyph category={t.category} iconName={t.iconName} convert={t.convert} badge={t.badge} px={46} />
          </div>
          {t.free ? (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">{strings.free}</span>
          ) : t.ai ? (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              <Zap className="h-2.5 w-2.5 fill-white" /> {strings.ai}
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 text-sm font-semibold text-ink-900">{t.name}</h3>
        <p className="mt-0.5 truncate text-xs text-ink-500">{t.short}</p>
      </Link>
    );
  }

  return (
    <>
      {/* Search hero — subtle ice-blue gradient fading seamlessly into white */}
      <section className="bg-gradient-to-b from-sky-50 via-sky-50/30 to-white">
        <div className="container py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-[2.75rem] md:leading-tight">{strings.title}</h1>
            <p className="mx-auto mt-3 max-w-xl text-ink-500">{strings.subtitle}</p>
            <div className="relative mt-8">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                placeholder={strings.placeholder}
                className="w-full rounded-2xl border border-ink-200/70 bg-white py-5 pl-14 pr-5 text-base text-ink-900 shadow-[0_10px_40px_-12px_rgb(15_23_42_/_0.25)] outline-none transition-shadow placeholder:text-ink-300 focus:border-brand-300 focus:shadow-[0_12px_48px_-12px_rgb(45_107_228_/_0.35)] md:text-lg"
              />
            </div>
            {/* Colour-coded quick suggestions */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {strings.suggestions.map((s) => {
                const th = categoryTheme(s.category);
                return (
                  <button
                    key={s.label}
                    onClick={() => { setQuery(s.query); setActive("all"); }}
                    className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105", th.chipBg, th.chipText)}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category filter chips */}
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
            <button
              onClick={() => { setActive("all"); setQuery(""); }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === "all" && !q ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
              )}
            >
              {strings.all}
            </button>
            {presentCategories.map((c) => {
              const th = categoryTheme(c.id);
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => { setActive(c.id); setQuery(""); }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    on ? cn(th.chipBg, th.chipText, "border-transparent") : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
                  )}
                >
                  <ToolIcon name={c.iconName} className="h-4 w-4" />
                  {categoryLabels[c.id] ?? c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section id="tools" className="scroll-mt-20 bg-white">
        <div className="container pb-16 pt-4">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-ink-500">{strings.empty}</p>
          ) : showGrouped ? (
            <div className="space-y-12">
              {grouped.map(({ chip, items }) => {
                const th = categoryTheme(chip.id);
                const g = categoryGradient(chip.id);
                const total = items.length;
                const preview = items.slice(0, PREVIEW_PER_CATEGORY);
                return (
                  <div key={chip.id}>
                    <div className="flex items-center gap-2.5">
                      <span
                        className="grid h-8 w-8 place-items-center rounded-full text-white shadow-sm"
                        style={{ backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                      >
                        <ToolIcon name={chip.iconName} size={16} color="#fff" strokeWidth={2} />
                      </span>
                      <h2 className="text-xl font-bold tracking-tight text-ink-900">{categoryLabels[chip.id] ?? chip.label}</h2>
                      {total > PREVIEW_PER_CATEGORY && (
                        <button
                          onClick={() => { setActive(chip.id); setQuery(""); }}
                          className={cn("ml-auto inline-flex items-center gap-1 text-sm font-semibold hover:underline", th.accentText)}
                        >
                          {strings.seeAll.replace("{n}", String(total))} <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                      {preview.map((t) => <Card key={t.slug} t={t} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {filtered.map((t) => <Card key={t.slug} t={t} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
