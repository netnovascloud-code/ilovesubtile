"use client";

import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * Keyboard-accessible alternative to drag-and-drop reordering. Drag-and-drop
 * is mouse/touch only and invisible to keyboard and screen-reader users, so
 * every reorderable list pairs the drag handle with these focusable
 * "move earlier / move later" buttons. They call the same move(from, to) the
 * drop handler uses, and disable at the ends of the list.
 */
export function ReorderButtons({
  index,
  count,
  onMove,
  labelUp = "Move earlier",
  labelDown = "Move later",
  className,
}: {
  index: number;
  count: number;
  onMove: (from: number, to: number) => void;
  labelUp?: string;
  labelDown?: string;
  className?: string;
}) {
  const btn =
    "grid h-5 w-5 place-items-center rounded text-ink-400 hover:bg-ink-100 hover:text-ink-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-default";
  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`}>
      <button type="button" aria-label={labelUp} disabled={index <= 0} onClick={() => onMove(index, index - 1)} className={btn}>
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
      <button type="button" aria-label={labelDown} disabled={index >= count - 1} onClick={() => onMove(index, index + 1)} className={btn}>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}
