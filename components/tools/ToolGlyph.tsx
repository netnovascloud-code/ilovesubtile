"use client";

import { ToolIcon } from "@/components/tools/ToolIcon";
import { categoryGradient } from "@/lib/category-theme";
import type { ToolCategory } from "@/lib/tools-config";

/**
 * iLovePDF-style tool icon: a rounded-square tile with a 135° category gradient
 * and a single white Lucide symbol centred inside. No text, ever.
 */
export function ToolGlyph({
  category,
  iconName,
  px = 44,
}: {
  category: ToolCategory;
  iconName: string;
  px?: number;
}) {
  const g = categoryGradient(category);
  return (
    <div
      className="grid shrink-0 place-items-center text-white shadow-[0_4px_10px_-2px_rgb(15_23_42_/_0.2)]"
      style={{
        width: px,
        height: px,
        borderRadius: Math.round(px * 0.28),
        backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})`,
      }}
    >
      <ToolIcon name={iconName} size={Math.round(px * 0.5)} color="#fff" strokeWidth={2} />
    </div>
  );
}
