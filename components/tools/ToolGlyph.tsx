import { toolEmoji } from "@/lib/tool-emoji";
import type { ToolCategory } from "@/lib/tools-config";

/**
 * A tool's "logo" — rendered as an emoji (keyed off its icon name) instead of a
 * line icon. `category` is accepted for call-site compatibility but unused now
 * that the glyph is a coloured emoji rather than an accent-tinted symbol.
 */
export function ToolGlyph({
  iconName,
  px = 52,
}: {
  category?: ToolCategory;
  iconName: string;
  px?: number;
}) {
  return (
    <span
      aria-hidden
      className="inline-block select-none leading-none"
      style={{ fontSize: Math.round(px * 0.82), lineHeight: 1 }}
    >
      {toolEmoji(iconName)}
    </span>
  );
}
