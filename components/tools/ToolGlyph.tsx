"use client";

import { ToolIcon } from "@/components/tools/ToolIcon";
import { categoryGradient } from "@/lib/category-theme";
import type { ToolCategory, ConvertPair } from "@/lib/tools-config";

/**
 * iLovePDF-style tool icon: a rounded square with a 135° category gradient and
 * a white symbol — a source→target pair for converters, a short text mark for
 * formatting tools, or the tool's distinct glyph otherwise.
 */
export function ToolGlyph({
  category,
  iconName,
  convert,
  badge,
  px = 48,
}: {
  category: ToolCategory;
  iconName: string;
  convert?: ConvertPair;
  badge?: string;
  px?: number;
}) {
  const g = categoryGradient(category);
  const radius = Math.round(px * 0.3);

  let symbol: React.ReactNode;
  if (convert) {
    const fs = (s: string) => (s.length <= 3 ? px * 0.2 : px * 0.16);
    symbol = (
      <span className="flex flex-col items-center font-extrabold leading-none text-white">
        <span style={{ fontSize: fs(convert.from), opacity: 0.8 }}>{convert.from}</span>
        <svg width={px * 0.28} height={px * 0.18} viewBox="0 0 24 14" fill="none" aria-hidden="true">
          <path d="M12 2v8m0 0 4-4m-4 4-4-4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: fs(convert.to) * 1.05 }}>{convert.to}</span>
      </span>
    );
  } else if (badge) {
    symbol = (
      <span className="font-extrabold leading-none text-white" style={{ fontSize: px * 0.3 }}>
        {badge}
      </span>
    );
  } else {
    symbol = <ToolIcon name={iconName} size={Math.round(px * 0.5)} color="#fff" strokeWidth={2} />;
  }

  return (
    <div
      className="grid shrink-0 place-items-center shadow-[0_4px_10px_-2px_rgb(15_23_42_/_0.2)]"
      style={{
        width: px,
        height: px,
        borderRadius: radius,
        backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})`,
      }}
    >
      {symbol}
    </div>
  );
}
