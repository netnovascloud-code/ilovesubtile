"use client";

import { ToolIcon } from "@/components/tools/ToolIcon";
import { cn } from "@/lib/utils";

/**
 * Renders a tool's visual: a bold format badge (e.g. "PNG", "CSV") when the
 * tool is a format converter, otherwise its lucide glyph. Keeps every tool
 * visually distinct, iLovePDF-style.
 */
export function ToolGlyph({
  iconName,
  badge,
  iconClassName,
  size = "sm",
}: {
  iconName: string;
  badge?: string;
  iconClassName?: string;
  size?: "sm" | "lg";
}) {
  if (badge) {
    const len = badge.replace(/[^A-Za-z0-9]/g, "").length;
    const sm = len <= 2 ? "text-sm" : len === 3 ? "text-[12px]" : "text-[10px]";
    const lg = len <= 2 ? "text-lg" : len === 3 ? "text-base" : "text-[13px]";
    return <span className={cn("font-extrabold leading-none tracking-tight", size === "lg" ? lg : sm)}>{badge}</span>;
  }
  return <ToolIcon name={iconName} className={iconClassName} />;
}
