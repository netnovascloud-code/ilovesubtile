"use client";

import { useDropzone } from "react-dropzone";
import { cn, formatBytes } from "@/lib/utils";

export type MiniDropProps = {
  label: string;
  accept: Record<string, string[]>;
  onFile: (f: File) => void;
  current: File | null;
  icon: React.ReactNode;
  /** Optional second-line hint shown when no file is selected yet. */
  hint?: string;
};

/**
 * A compact drop zone used inside multi-file forms (paired uploads,
 * burn-in, auto-sync). Keeps state-less so callers can lift the
 * selected File and validate / submit as a group.
 */
export function MiniDrop({ label, accept, onFile, current, icon, hint }: MiniDropProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && onFile(files[0]),
    multiple: false,
    accept,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-200 bg-white p-6 text-center transition-colors",
        isDragActive && "border-brand-500 bg-brand-50/50",
        current && "border-solid border-ink-100",
      )}
    >
      <input {...getInputProps()} />
      <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600">
        {icon}
      </div>
      <div className="mt-3 text-sm font-medium text-ink-900">{label}</div>
      {current ? (
        <div className="mt-2 truncate text-xs text-ink-500" title={current.name}>
          {current.name} · {formatBytes(current.size)}
        </div>
      ) : hint ? (
        <div className="mt-2 text-xs text-ink-400">{hint}</div>
      ) : null}
    </div>
  );
}
