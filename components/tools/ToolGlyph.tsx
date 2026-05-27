"use client";

import { ToolIcon } from "@/components/tools/ToolIcon";
import { categoryAccent } from "@/lib/category-theme";
import type { ToolCategory } from "@/lib/tools-config";

/**
 * Flat, iLovePDF-style tool icon: the tool's Lucide symbol drawn in the
 * category's accent colour, directly on the white card — no coloured tile.
 */
export function ToolGlyph({
  category,
  iconName,
  px = 52,
}: {
  category: ToolCategory;
  iconName: string;
  px?: number;
}) {
  return <ToolIcon name={iconName} size={px} color={categoryAccent(category)} strokeWidth={1.6} />;
}
