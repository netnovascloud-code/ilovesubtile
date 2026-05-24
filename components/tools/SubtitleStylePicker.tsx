"use client";

import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SubtitleStyle = {
  fontFamily: "Inter" | "Arial" | "Roboto" | "Open Sans" | "Verdana" | "Impact";
  fontSizePx: number;
  color: string;
  outlineColor: string;
  outlineWidth: number;
  bold: boolean;
  italic: boolean;
  position: "top" | "middle" | "bottom";
  align: "left" | "center" | "right";
};

export const DEFAULT_STYLE: SubtitleStyle = {
  fontFamily: "Inter",
  fontSizePx: 28,
  color: "#FFFFFF",
  outlineColor: "#000000",
  outlineWidth: 2,
  bold: true,
  italic: false,
  position: "bottom",
  align: "center",
};

const FONTS: SubtitleStyle["fontFamily"][] = ["Inter", "Arial", "Roboto", "Open Sans", "Verdana", "Impact"];

export function SubtitleStylePicker({
  value,
  onChange,
  labels,
}: {
  value: SubtitleStyle;
  onChange: (next: SubtitleStyle) => void;
  labels: {
    font: string;
    size: string;
    color: string;
    outline: string;
    outlineWidth: string;
    position: string;
    align: string;
    bold: string;
    italic: string;
    top: string;
    middle: string;
    bottom: string;
    preview: string;
    previewText: string;
  };
}) {
  const set = <K extends keyof SubtitleStyle>(k: K, v: SubtitleStyle[K]) =>
    onChange({ ...value, [k]: v });

  const previewAlign =
    value.align === "left" ? "justify-start" : value.align === "right" ? "justify-end" : "justify-center";
  const previewVertical =
    value.position === "top" ? "items-start pt-4" : value.position === "middle" ? "items-center" : "items-end pb-6";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-ink-700">{labels.font}</label>
          <select
            value={value.fontFamily}
            onChange={(e) => set("fontFamily", e.target.value as SubtitleStyle["fontFamily"])}
            className="mt-1 h-10 w-full rounded border border-ink-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">
            {labels.size}: {value.fontSizePx}px
          </label>
          <input
            type="range"
            min={14}
            max={72}
            value={value.fontSizePx}
            onChange={(e) => set("fontSizePx", Number(e.target.value))}
            className="mt-2 w-full accent-brand-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-ink-700">{labels.color}</label>
            <input
              type="color"
              value={value.color}
              onChange={(e) => set("color", e.target.value)}
              className="mt-1 h-10 w-full cursor-pointer rounded border border-ink-200 bg-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-700">{labels.outline}</label>
            <input
              type="color"
              value={value.outlineColor}
              onChange={(e) => set("outlineColor", e.target.value)}
              className="mt-1 h-10 w-full cursor-pointer rounded border border-ink-200 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">
            {labels.outlineWidth}: {value.outlineWidth}px
          </label>
          <input
            type="range"
            min={0}
            max={6}
            value={value.outlineWidth}
            onChange={(e) => set("outlineWidth", Number(e.target.value))}
            className="mt-2 w-full accent-brand-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={value.bold}
            onClick={() => set("bold", !value.bold)}
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded border px-3 text-sm",
              value.bold ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700",
            )}
          >
            <Bold className="h-3.5 w-3.5" />
            {labels.bold}
          </button>
          <button
            type="button"
            aria-pressed={value.italic}
            onClick={() => set("italic", !value.italic)}
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded border px-3 text-sm",
              value.italic ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700",
            )}
          >
            <Italic className="h-3.5 w-3.5" />
            {labels.italic}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm font-medium text-ink-700">{labels.position}</div>
            <div className="mt-1 flex gap-1">
              {(["top", "middle", "bottom"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={value.position === p}
                  onClick={() => set("position", p)}
                  className={cn(
                    "flex-1 rounded border px-2 py-1.5 text-xs",
                    value.position === p ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700",
                  )}
                >
                  {p === "top" ? labels.top : p === "middle" ? labels.middle : labels.bottom}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-ink-700">{labels.align}</div>
            <div className="mt-1 flex gap-1">
              {(
                [
                  { v: "left", icon: <AlignLeft className="h-3.5 w-3.5" /> },
                  { v: "center", icon: <AlignCenter className="h-3.5 w-3.5" /> },
                  { v: "right", icon: <AlignRight className="h-3.5 w-3.5" /> },
                ] as const
              ).map((a) => (
                <button
                  key={a.v}
                  type="button"
                  aria-pressed={value.align === a.v}
                  onClick={() => set("align", a.v)}
                  className={cn(
                    "flex flex-1 items-center justify-center rounded border px-2 py-1.5",
                    value.align === a.v ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700",
                  )}
                >
                  {a.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm font-medium text-ink-700">{labels.preview}</div>
        <div
          className={cn(
            "relative flex aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-ink-700 to-ink-900",
            previewVertical,
            previewAlign,
          )}
        >
          <span
            className="mx-4 max-w-[90%] px-2 leading-tight"
            style={{
              fontFamily: value.fontFamily === "Open Sans" ? `"Open Sans"` : value.fontFamily,
              fontSize: `${Math.min(value.fontSizePx, 48)}px`,
              fontWeight: value.bold ? 700 : 400,
              fontStyle: value.italic ? "italic" : "normal",
              color: value.color,
              WebkitTextStroke: value.outlineWidth > 0 ? `${value.outlineWidth}px ${value.outlineColor}` : undefined,
              paintOrder: "stroke fill",
            }}
          >
            {labels.previewText}
          </span>
        </div>
      </div>
    </div>
  );
}
