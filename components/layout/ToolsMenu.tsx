"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, GitBranch, Layers, Languages, WandSparkles, Eraser, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/lib/i18n/locales";
import { getChrome } from "@/lib/i18n/chrome";

// Icons + hrefs are static; labels/descriptions come from the locale dict
// (chrome.toolsMenu) so the whole mega-menu is translated.
const FEATURED: { icon: typeof Sparkles; href: string; key: keyof ReturnType<typeof getChrome>["toolsMenu"]["featuredItems"] }[] = [
  { icon: GitBranch, href: "/workflow", key: "workflow" },
  { icon: Layers, href: "/batch", key: "batch" },
  { icon: Languages, href: "/translator", key: "translator" },
  { icon: WandSparkles, href: "/ai-humanizer", key: "humanizer" },
  { icon: Eraser, href: "/remove-background", key: "removeBg" },
  { icon: FileDown, href: "/merge-pdf", key: "mergePdf" },
];

const NEW: { href: string; key: keyof ReturnType<typeof getChrome>["toolsMenu"]["newItems"] }[] = [
  { href: "/url-shortener", key: "urlShortener" },
  { href: "/deep-link", key: "deepLink" },
  { href: "/magic-link", key: "magicLink" },
  { href: "/utm-builder", key: "utmBuilder" },
  { href: "/qr-generator", key: "qrGenerator" },
  { href: "/pdf-to-jpg", key: "pdfToJpg" },
];

export function ToolsMenu({
  categories,
  toolsHref,
  locale,
}: {
  categories: { id: string; label: string; href: string }[];
  toolsHref: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  const chrome = getChrome(locale);
  const tm = chrome.toolsMenu;

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-sm text-ink-700 transition-colors hover:text-ink-900"
      >
        {chrome.nav.tools} <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[640px] max-w-[92vw] -translate-x-1/2 pt-3">
          <div className="grid grid-cols-[1.4fr_1fr] gap-0 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-cardHover">
            {/* Featured */}
            <div className="border-r border-ink-100 p-4">
              <p className="mb-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                <Sparkles className="h-3 w-3" /> {tm.featured}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {FEATURED.map(({ icon: Icon, href, key }) => (
                  // workflow / batch now have localised routes; the rest keep their href.
                  <Link key={href} href={href === "/workflow" || href === "/batch" ? localePath(locale, href.slice(1)) : href} onClick={() => setOpen(false)} className="group flex items-start gap-2 rounded-lg p-2 transition-colors hover:bg-ink-50">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-600"><Icon className="h-3.5 w-3.5" /></span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink-900">{tm.featuredItems[key].label}</span>
                      <span className="block truncate text-[11px] text-ink-400">{tm.featuredItems[key].desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories + New */}
            <div className="p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">{tm.categories}</p>
              <div className="flex flex-wrap gap-1">
                {categories.map((c) => (
                  <Link key={c.id} href={c.href} onClick={() => setOpen(false)} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600 hover:bg-ink-100 hover:text-ink-900">
                    {c.label}
                  </Link>
                ))}
                <Link href={toolsHref} onClick={() => setOpen(false)} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100">
                  {tm.all} →
                </Link>
              </div>
              <p className="mb-2 mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">{tm.new}</p>
              <ul className="space-y-0.5">
                {NEW.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} onClick={() => setOpen(false)} className="block rounded px-1.5 py-1 text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900">{tm.newItems[i.key]}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
