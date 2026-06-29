"use client";

import { useState } from "react";
import { Upload, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { categoryTheme } from "@/lib/category-theme";
import { useLocale } from "@/hooks/useLocale";
import type { ToolCategory } from "@/lib/tools-config";

// Minimal en+fr copy (English fallback for the other locales), matching the
// pattern used by the other tool clients. Previously this card mixed a French
// header with an English body on every locale.
const T: Record<string, Record<string, string>> = {
  en: {
    upload: "Click to upload",
    accepted: "Accepted: {accept}",
    anyFile: "any file",
    soon: "Coming soon",
    soonBody: "This tool runs server-side. We're finalising the conversion engine — drop in any time and we'll let you know when it's live.",
    footer: "When live: files are deleted immediately after your download. Never stored, never shared.",
  },
  fr: {
    upload: "Cliquez pour importer",
    accepted: "Accepté : {accept}",
    anyFile: "tout fichier",
    soon: "Bientôt disponible",
    soonBody: "Cet outil fonctionne côté serveur. Nous finalisons le moteur de conversion — déposez un fichier quand vous voulez, nous vous préviendrons dès sa mise en ligne.",
    footer: "Une fois en ligne : les fichiers sont supprimés immédiatement après votre téléchargement. Jamais stockés, jamais partagés.",
  },
};

/**
 * Placeholder client for server-side tools (Documents/Audio/Video) whose
 * conversion engine isn't connected yet. The full UI ships so users can see
 * how it'll work; the action button is disabled until the server is wired in.
 */
export function PendingClient({ category, accept }: { category: ToolCategory; accept: string }) {
  const [file, setFile] = useState<File | null>(null);
  const th = categoryTheme(category);
  const s = T[useLocale()] ?? T.en;

  return (
    <div className="space-y-4">
      {!file ? (
        <label className={cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors hover:brightness-95", th.dropBorder, th.dropBg)}>
          <span className={cn("grid h-12 w-12 place-items-center rounded-xl", th.iconBg, th.iconText)}>
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{s.upload}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.accepted.replace("{accept}", accept || s.anyFile)}</span>
          <input type="file" accept={accept} className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => setFile(null)} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
        <div className="flex items-start gap-2">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900">{s.soon}</p>
            <p className="mt-0.5 text-amber-800">{s.soonBody}</p>
          </div>
        </div>
      </div>

      <Button size="lg" disabled aria-disabled className="cursor-not-allowed opacity-60">
        <Lock className="h-4 w-4" /> {s.soon}
      </Button>

      <p className="text-xs text-ink-400">{s.footer}</p>
    </div>
  );
}
