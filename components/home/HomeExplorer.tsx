"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import { categoryTheme, categoryAccent } from "@/lib/category-theme";
import type { ToolCardSpec, ToolCategory } from "@/lib/tools-config";

type CategoryChip = { id: ToolCategory; label: string; iconName: string };
export type HomeSuggestion = { label: string; query: string; category: ToolCategory };

export type HomeStrings = {
  title: string;
  subtitle: string;
  placeholder: string;
  all: string;
  counter: string;
  suggestions: HomeSuggestion[];
  ai: string;
  seeAll: string; // "{n}" placeholder
  empty: string;
};

const PREVIEW_PER_CATEGORY = 8;

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

  const scrollToTop = () => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };

  // The header logo links to "/" but, when we're already on the homepage, that
  // navigation doesn't remount this component — so a category filter would stay
  // "stuck". The logo dispatches "konver:home" which we use to reset the view.
  useEffect(() => {
    const reset = () => { setActive("all"); setQuery(""); scrollToTop(); };
    window.addEventListener("konver:home", reset);
    return () => window.removeEventListener("konver:home", reset);
  }, []);

  const q = query.trim().toLowerCase();

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
    return (
      <Link
        href={`${prefix}/${t.slug}`}
        className="group flex min-h-[170px] flex-col rounded-xl border border-ink-100 bg-white p-5 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-ink-200 hover:shadow-cardHover"
      >
        <div className="relative w-fit">
          <ToolGlyph category={t.category} iconName={t.iconName} px={52} />
          {t.ai && (
            <span className="absolute -right-4 -top-1.5 rounded-md px-[5px] py-[2px] text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-sm" style={{ backgroundColor: "#2563EB" }}>
              {strings.ai}
            </span>
          )}
        </div>
        <h3 className="mt-4 font-semibold text-ink-900">{t.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">{t.short}</p>
      </Link>
    );
  }

  return (
    <>
      {/* Search hero — pure white */}
      <section className="bg-white">
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
                className="w-full rounded-2xl border border-ink-200/70 bg-white py-5 pl-14 pr-5 text-base text-ink-900 shadow-[0_10px_40px_-12px_rgb(15_23_42_/_0.2)] outline-none transition-shadow placeholder:text-ink-300 focus:border-brand-300 focus:shadow-[0_12px_48px_-12px_rgb(45_107_228_/_0.3)] md:text-lg"
              />
            </div>
            <p className="mt-4 text-sm font-medium text-ink-400">{strings.counter}</p>
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

      {/* Tool grid — light grey page like iLovePDF, white cards */}
      <section id="tools" className="scroll-mt-20 bg-surface">
        <div className="container py-12">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-ink-500">{strings.empty}</p>
          ) : showGrouped ? (
            <div className="space-y-12">
              {grouped.map(({ chip, items }) => {
                const th = categoryTheme(chip.id);
                const total = items.length;
                const preview = items.slice(0, PREVIEW_PER_CATEGORY);
                return (
                  <div key={chip.id}>
                    <div className="flex items-center gap-2">
                      <ToolIcon name={chip.iconName} size={20} color={categoryAccent(chip.id)} strokeWidth={2} />
                      <h2 className="text-xl font-bold tracking-tight text-ink-900">{categoryLabels[chip.id] ?? chip.label}</h2>
                      {total > PREVIEW_PER_CATEGORY && (
                        <button
                          onClick={() => { setActive(chip.id); setQuery(""); scrollToTop(); }}
                          className={cn("ml-auto inline-flex items-center gap-1 text-sm font-semibold hover:underline", th.accentText)}
                        >
                          {strings.seeAll.replace("{n}", String(total))} <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                      {preview.map((t) => <Card key={t.slug} t={t} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((t) => <Card key={t.slug} t={t} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
