"use client";

import { useMemo, useState } from "react";
import { Copy, Download, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TEXT_TOOLS } from "@/lib/text-tools";
import { useLocale } from "@/hooks/useLocale";
import { getCommonUi } from "@/lib/i18n/tool-ui";

export function TextToolClient({ slug }: { slug: string }) {
  const def = TEXT_TOOLS[slug];
  const t = getCommonUi(useLocale());
  const [input, setInput] = useState("");
  const [mode, setMode] = useState(def?.defaultMode ?? def?.modes?.[0]?.id ?? "default");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!def) return { output: "", error: "Unknown tool." };
    try {
      return { output: def.run(input, mode), error: null as string | null };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Something went wrong." };
    }
  }, [def, input, mode]);

  if (!def) return null;

  const monoCls = def.mono ? "font-mono text-[13px]" : "text-sm";

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    if (!def.download) return;
    const blob = new Blob([output], { type: def.download.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.${def.download.ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      {def.modes && (
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {def.modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                mode === m.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">{def.inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={def.inputPlaceholder}
            spellCheck={false}
            className={cn(
              "h-72 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100",
              monoCls,
            )}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{def.outputLabel}</label>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t.copied : t.copy}
              </Button>
              {def.download && (
                <Button size="sm" variant="outline" onClick={download} disabled={!output}>
                  <Download className="h-3.5 w-3.5" /> {t.download}
                </Button>
              )}
            </div>
          </div>
          <textarea
            value={error ? "" : output}
            readOnly
            spellCheck={false}
            placeholder={t.resultPlaceholder}
            className={cn(
              "h-72 w-full resize-y rounded-lg border bg-ink-50/50 p-3 text-ink-900 focus:outline-none",
              error ? "border-red-200" : "border-ink-200",
              monoCls,
            )}
          />
          {error && input.trim() && (
            <p className="mt-2 flex items-start gap-1.5 text-sm text-red-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-ink-400">{t.privacyText}</p>
    </div>
  );
}
