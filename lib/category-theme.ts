import type { ToolCategory } from "@/lib/tools-config";

// Per-category colour system. Full class strings are written literally so the
// Tailwind JIT scanner (which globs ./lib) emits them — no safelist needed.
export type CategoryTheme = {
  /** Icon tile background + icon colour. */
  iconBg: string;
  iconText: string;
  /** Card hover border colour. */
  hoverBorder: string;
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
    iconBg: "bg-blue-50", iconText: "text-blue-600", hoverBorder: "hover:border-blue-300",
    chipBg: "bg-blue-50", chipText: "text-blue-600", dropBg: "bg-blue-50/50", dropBorder: "border-blue-300", accentText: "text-blue-600",
  },
  audio: {
    iconBg: "bg-orange-50", iconText: "text-orange-600", hoverBorder: "hover:border-orange-300",
    chipBg: "bg-orange-50", chipText: "text-orange-600", dropBg: "bg-orange-50/50", dropBorder: "border-orange-300", accentText: "text-orange-600",
  },
  video: {
    iconBg: "bg-violet-50", iconText: "text-violet-600", hoverBorder: "hover:border-violet-300",
    chipBg: "bg-violet-50", chipText: "text-violet-600", dropBg: "bg-violet-50/50", dropBorder: "border-violet-300", accentText: "text-violet-600",
  },
  images: {
    iconBg: "bg-emerald-50", iconText: "text-emerald-600", hoverBorder: "hover:border-emerald-300",
    chipBg: "bg-emerald-50", chipText: "text-emerald-600", dropBg: "bg-emerald-50/50", dropBorder: "border-emerald-300", accentText: "text-emerald-600",
  },
  subtitles: {
    iconBg: "bg-sky-50", iconText: "text-sky-600", hoverBorder: "hover:border-sky-300",
    chipBg: "bg-sky-50", chipText: "text-sky-600", dropBg: "bg-sky-50/50", dropBorder: "border-sky-300", accentText: "text-sky-600",
  },
  developer: {
    iconBg: "bg-cyan-50", iconText: "text-cyan-600", hoverBorder: "hover:border-cyan-300",
    chipBg: "bg-cyan-50", chipText: "text-cyan-600", dropBg: "bg-cyan-50/50", dropBorder: "border-cyan-300", accentText: "text-cyan-600",
  },
  "text-ai": {
    iconBg: "bg-indigo-50", iconText: "text-indigo-600", hoverBorder: "hover:border-indigo-300",
    chipBg: "bg-indigo-50", chipText: "text-indigo-600", dropBg: "bg-indigo-50/50", dropBorder: "border-indigo-300", accentText: "text-indigo-600",
  },
};

export function categoryTheme(cat: ToolCategory): CategoryTheme {
  return CATEGORY_THEME[cat] ?? CATEGORY_THEME.developer;
}

// Saturated accent hex per category — used by the colourful SVG tool icons.
export const CATEGORY_ACCENT: Record<ToolCategory, string> = {
  documents: "#2563EB",
  audio: "#F97316",
  video: "#7C3AED",
  images: "#10B981",
  subtitles: "#0EA5E9",
  developer: "#06B6D4",
  "text-ai": "#6366F1",
};

export function categoryAccent(cat: ToolCategory): string {
  return CATEGORY_ACCENT[cat] ?? CATEGORY_ACCENT.developer;
}

