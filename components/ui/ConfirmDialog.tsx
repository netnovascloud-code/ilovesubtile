"use client";

import { useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ConfirmOptions = {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
};

/**
 * Reusable confirmation dialog. Render it with `open` driven by state and an
 * `onConfirm` callback. Used for destructive dashboard actions (revoke API key,
 * cancel plan…) so nothing irreversible happens on a single click.
 */
export function ConfirmDialog({
  open,
  options,
  onConfirm,
  onClose,
  busy,
}: {
  open: boolean;
  options: ConfirmOptions | null;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !busy) onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, busy, onClose]);

  if (!open || !options) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4 py-6"
      onClick={() => { if (!busy) onClose(); }}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} disabled={busy} className="absolute right-3 top-3 rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700 disabled:opacity-50">
          <X className="h-4 w-4" />
        </button>
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${options.danger ? "bg-red-50 text-red-600" : "bg-brand-50 text-brand-600"}`}>
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h2 id="confirm-title" className="mt-3 text-lg font-semibold text-ink-900">{options.title}</h2>
        <p className="mt-2 text-sm text-ink-600">{options.body}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={busy}>{options.cancelLabel ?? "Cancel"}</Button>
          <Button onClick={onConfirm} disabled={busy} className={options.danger ? "bg-red-600 hover:bg-red-700" : ""}>
            {busy ? "…" : options.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
