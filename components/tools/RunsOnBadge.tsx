import { Lock, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n/locales";
import { getRunsOn, runsOnKind } from "@/lib/i18n/runs-on";

/**
 * Small "where this runs" badge derived from a tool's `kind`:
 *   • browser (client / ffmpeg) → 🔒 private, the file never leaves the device
 *   • server  (edge / ai)       → ☁️ processed on our servers (may use Mistral)
 * Server component — safe to render inside the tool grid and on tool pages.
 */
export function RunsOnBadge({
  kind,
  locale,
  className,
}: {
  kind: "client" | "edge" | "ffmpeg" | "ai";
  locale: Locale;
  className?: string;
}) {
  const s = getRunsOn(locale);
  const isBrowser = runsOnKind(kind) === "browser";
  const Icon = isBrowser ? Lock : Cloud;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
        isBrowser ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700",
        className,
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={2} />
      {isBrowser ? s.browser : s.server}
    </span>
  );
}
