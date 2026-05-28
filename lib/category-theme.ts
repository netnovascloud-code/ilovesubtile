import type { ToolCategory } from "@/lib/tools-config";

// Per-category colour system. Full class strings are written literally so the
// Tailwind JIT scanner (which globs ./lib) emits them — no safelist needed.
export type CategoryTheme = {
  /** Icon tile background + icon colour. */
  iconBg: string;
  iconText: string;
  /** Card hover border colour. */
  hoverBorder: string;
  /** Card hover bottom-border colour (literal class). */
  hoverBorderB: string;
  /** Category title dot/chip. */
  chipBg: string;
  chipText: string;
  /** Dropzone tint + dashed border. */
  dropBg: string;
  dropBorder: string;
  /** Solid accent (for "see all" links, suggestion pills). */
  accentText: string;
};

export const CATEGORY_THEME: Record<ToolCategory, CategoryTheme> = {
  documents: {
    iconBg: "bg-blue-50", iconText: "text-blue-600", hoverBorder: "hover:border-blue-300", hoverBorderB: "hover:border-b-red-500",
    chipBg: "bg-blue-50", chipText: "text-blue-600", dropBg: "bg-blue-50/50", dropBorder: "border-blue-300", accentText: "text-red-500",
  },
  audio: {
    iconBg: "bg-orange-50", iconText: "text-orange-600", hoverBorder: "hover:border-orange-300", hoverBorderB: "hover:border-b-orange-500",
    chipBg: "bg-orange-50", chipText: "text-orange-600", dropBg: "bg-orange-50/50", dropBorder: "border-orange-300", accentText: "text-orange-600",
  },
  video: {
    iconBg: "bg-violet-50", iconText: "text-violet-600", hoverBorder: "hover:border-violet-300", hoverBorderB: "hover:border-b-fuchsia-500",
    chipBg: "bg-violet-50", chipText: "text-violet-600", dropBg: "bg-violet-50/50", dropBorder: "border-violet-300", accentText: "text-fuchsia-600",
  },
  images: {
    iconBg: "bg-emerald-50", iconText: "text-emerald-600", hoverBorder: "hover:border-emerald-300", hoverBorderB: "hover:border-b-emerald-500",
    chipBg: "bg-emerald-50", chipText: "text-emerald-600", dropBg: "bg-emerald-50/50", dropBorder: "border-emerald-300", accentText: "text-emerald-600",
  },
  subtitles: {
    iconBg: "bg-sky-50", iconText: "text-sky-600", hoverBorder: "hover:border-sky-300", hoverBorderB: "hover:border-b-indigo-500",
    chipBg: "bg-sky-50", chipText: "text-sky-600", dropBg: "bg-sky-50/50", dropBorder: "border-sky-300", accentText: "text-indigo-600",
  },
  developer: {
    iconBg: "bg-cyan-50", iconText: "text-cyan-600", hoverBorder: "hover:border-cyan-300", hoverBorderB: "hover:border-b-cyan-500",
    chipBg: "bg-cyan-50", chipText: "text-cyan-600", dropBg: "bg-cyan-50/50", dropBorder: "border-cyan-300", accentText: "text-cyan-600",
  },
  "text-ai": {
    iconBg: "bg-indigo-50", iconText: "text-indigo-600", hoverBorder: "hover:border-indigo-300", hoverBorderB: "hover:border-b-indigo-500",
    chipBg: "bg-indigo-50", chipText: "text-indigo-600", dropBg: "bg-indigo-50/50", dropBorder: "border-indigo-300", accentText: "text-indigo-600",
  },
  utilities: {
    iconBg: "bg-slate-100", iconText: "text-slate-700", hoverBorder: "hover:border-slate-300", hoverBorderB: "hover:border-b-slate-500",
    chipBg: "bg-slate-100", chipText: "text-slate-700", dropBg: "bg-slate-100/50", dropBorder: "border-slate-300", accentText: "text-slate-700",
  },
};

export function categoryTheme(cat: ToolCategory): CategoryTheme {
  return CATEGORY_THEME[cat] ?? CATEGORY_THEME.developer;
}

// Saturated accent hex per category — used by the colourful SVG tool icons.
export const CATEGORY_ACCENT: Record<ToolCategory, string> = {
  documents: "#E5322D",
  audio: "#F97316",
  video: "#C026D3",
  images: "#059669",
  subtitles: "#4F46E5",
  developer: "#0891B2",
  "text-ai": "#6366F1",
  utilities: "#475569",
};

export function categoryAccent(cat: ToolCategory): string {
  return CATEGORY_ACCENT[cat] ?? CATEGORY_ACCENT.developer;
}

// 135° gradient stops per category — the iLovePDF-style icon tile background.
export const CATEGORY_GRADIENT: Record<ToolCategory, { from: string; to: string }> = {
  documents: { from: "#FF7A59", to: "#E5322D" },
  audio: { from: "#FBBF24", to: "#F97316" },
  video: { from: "#A855F7", to: "#DB2777" },
  images: { from: "#34D399", to: "#059669" },
  subtitles: { from: "#3B82F6", to: "#4F46E5" },
  developer: { from: "#22D3EE", to: "#2563EB" },
  "text-ai": { from: "#6366F1", to: "#8B5CF6" },
  utilities: { from: "#64748B", to: "#334155" },
};

export function categoryGradient(cat: ToolCategory): { from: string; to: string } {
  return CATEGORY_GRADIENT[cat] ?? CATEGORY_GRADIENT.developer;
}


