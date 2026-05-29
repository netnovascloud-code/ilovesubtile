"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, GitBranch, Layers, Languages, WandSparkles, Eraser, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; desc?: string };

const FEATURED: { icon: typeof Sparkles; href: string; label: string; desc: string }[] = [
  { icon: GitBranch, href: "/workflow", label: "Workflow Builder", desc: "Chain conversions in one click" },
  { icon: Layers, href: "/batch", label: "Batch Converter", desc: "Process up to 50 files" },
  { icon: Languages, href: "/translator", label: "AI Translator", desc: "30+ languages, formal/informal" },
  { icon: WandSparkles, href: "/ai-humanizer", label: "AI Humanizer", desc: "Make AI text sound human" },
  { icon: Eraser, href: "/remove-background", label: "Remove Background", desc: "Transparent PNG in seconds" },
  { icon: FileDown, href: "/compress-pdf", label: "Compress PDF", desc: "Shrink scans & image PDFs" },
];

const NEW: Item[] = [
  { href: "/qr-generator", label: "QR Code Generator" },
  { href: "/excel-to-pdf", label: "Excel to PDF" },
  { href: "/add-watermark", label: "Add Watermark to Video" },
  { href: "/pdf-to-text", label: "PDF to Text" },
  { href: "/rephraser", label: "AI Rephraser" },
  { href: "/word-to-pdf", label: "Word to PDF" },
];

export function ToolsMenu({
  categories,
  toolsHref,
}: {
  categories: { id: string; label: string }[];
  toolsHref: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-sm text-ink-700 transition-colors hover:text-ink-900"
      >
        Tools <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[640px] max-w-[92vw] -translate-x-1/2 pt-3">
          <div className="grid grid-cols-[1.4fr_1fr] gap-0 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-cardHover">
            {/* Featured */}
            <div className="border-r border-ink-100 p-4">
              <p className="mb-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                <Sparkles className="h-3 w-3" /> Featured
              </p>
              <div className="grid grid-cols-2 gap-1">
                {FEATURED.map(({ icon: Icon, href, label, desc }) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)} className="group flex items-start gap-2 rounded-lg p-2 transition-colors hover:bg-ink-50">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-600"><Icon className="h-3.5 w-3.5" /></span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink-900">{label}</span>
                      <span className="block truncate text-[11px] text-ink-400">{desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories + New */}
            <div className="p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">Categories</p>
              <div className="flex flex-wrap gap-1">
                {categories.map((c) => (
                  <Link key={c.id} href={toolsHref} onClick={() => setOpen(false)} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-600 hover:bg-ink-100 hover:text-ink-900">
                    {c.label}
                  </Link>
                ))}
              </div>
              <p className="mb-2 mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">New</p>
              <ul className="space-y-0.5">
                {NEW.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} onClick={() => setOpen(false)} className="block rounded px-1.5 py-1 text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-900">{i.label}</Link>
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
