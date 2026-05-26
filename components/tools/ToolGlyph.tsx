"use client";

import { ToolIcon } from "@/components/tools/ToolIcon";
import { categoryAccent } from "@/lib/category-theme";
import type { ToolCategory } from "@/lib/tools-config";

/** iLovePDF-style document icon: a sheet with a folded corner and a coloured
 * band showing the file format, in the category's vivid accent colour. */
function FileGlyph({ accent, label, px }: { accent: string; label: string; px: number }) {
  const len = label.replace(/[^A-Za-z0-9]/g, "").length;
  const fs = len <= 1 ? 7 : len === 2 ? 6 : len === 3 ? 5 : len === 4 ? 4.1 : 3.4;
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.5 2H6.5A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V8.5L13.5 2Z"
        fill="#fff" stroke={accent} strokeWidth="1.6" strokeLinejoin="round"
      />
      {/* folded corner */}
      <path d="M13.5 2 20 8.5h-4.7a1.8 1.8 0 0 1-1.8-1.8V2Z" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="1.6" strokeLinejoin="round" />
      {/* format band */}
      <rect x="4.4" y="12.7" width="15.2" height="6.6" rx="1.6" fill={accent} />
      <text x="12" y="17.5" textAnchor="middle" fontSize={fs} fontWeight="800" fill="#fff" fontFamily="var(--font-jakarta), system-ui, sans-serif" letterSpacing="-0.3">
        {label}
      </text>
    </svg>
  );
}

export function ToolGlyph({
  category,
  iconName,
  badge,
  px = 40,
}: {
  category: ToolCategory;
  iconName: string;
  badge?: string;
  px?: number;
}) {
  const accent = categoryAccent(category);
  if (badge) return <FileGlyph accent={accent} label={badge} px={px} />;
  return <ToolIcon name={iconName} size={Math.round(px * 0.82)} color={accent} strokeWidth={1.9} />;
}
