"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { AdProcessing } from "@/components/ads/AdProcessing";
import { AI_TEXT_TOOLS, REPHRASE_STYLES, SUMMARY_FORMATS } from "@/lib/ai-text-tools";
import { LANGUAGES } from "@/lib/languages";
import { TemplatesBar } from "@/components/tools/TemplatesBar";
import { CharMeter } from "@/components/tools/CharMeter";
import { useCharLimit } from "@/hooks/useCharLimit";

export function AiTextClient({ slug }: { slug: string }) {
  const def = AI_TEXT_TOOLS[slug];
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [language, setLanguage] = useState("French");
  const [style, setStyle] = useState<string>(REPHRASE_STYLES[0]);
  const [format, setFormat] = useState<string>(SUMMARY_FORMATS[1].id);
  const meter = useCharLimit(input);

  if (!def) return null;

  async function run() {
    if (!input.trim() || loading || meter.over) return;
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const options: Record<string, string> = {};
      if (def.control === "language") options.target = language;
      if (def.control === "style") options.style = style;
      if (def.control === "format") options.format = format;

      const res = await callTool(slug, { task: def.task, text: input, options });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data.error === "daily_limit"
            ? "You've hit today's free limit. Sign in or upgrade to Pro for unlimited use."
            : data.error === "text_too_long"
            ? "That text is too long — please shorten it and try again."
            : "Something went wrong. Please try again in a moment.",
        );
        return;
      }
      setOutput(data.output ?? "");
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      {def.control !== "none" && (
        <TemplatesBar
          tool={slug}
          settings={{ language, style, format }}
          onApply={(s) => {
            if (typeof s.language === "string") setLanguage(s.language);
            if (typeof s.style === "string") setStyle(s.style);
            if (typeof s.format === "string") setFormat(s.format);
          }}
        />
      )}
      {/* Per-tool control */}
      {def.control !== "none" && (
        <div className="flex flex-wrap items-center gap-2">
          {def.control === "language" && (
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className={selectCls}>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.english}>{l.native} — {l.english}</option>
              ))}
            </select>
          )}
          {def.control === "style" && (
            <div className="flex flex-wrap gap-1.5">
              {REPHRASE_STYLES.map((s) => (
                <button key={s} onClick={() => setStyle(s)}
                  className={cn("rounded-full border px-3 py-1 text-sm transition-colors",
                    style === s ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300")}>
                  {s}
                </button>
              ))}
            </div>
          )}
          {def.control === "format" && (
            <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
              {SUMMARY_FORMATS.map((f) => (
                <button key={f.id} onClick={() => setFormat(f.id)}
                  className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    format === f.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">{def.inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={def.inputPlaceholder}
            className={cn(
              "h-64 w-full resize-y rounded-lg border bg-white p-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2",
              meter.over ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-ink-200 focus:border-brand-400 focus:ring-brand-100",
            )}
          />
          <CharMeter state={meter} />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{def.outputLabel}</label>
            <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="h-64 w-full overflow-auto whitespace-pre-wrap rounded-lg border border-ink-200 bg-ink-50/50 p-3 text-sm text-ink-900">
            {loading ? <span className="text-ink-400">Working on it…</span> : output || <span className="text-ink-300">Your result will appear here.</span>}
          </div>
        </div>
      </div>

      <Button onClick={run} disabled={!input.trim() || loading || meter.over} size="lg">
        <Sparkles className="h-4 w-4" />
        {loading ? "Processing…" : def.cta}
      </Button>

      {error && (
        <p className="flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      {loading && <AdProcessing />}
    </div>
  );
}

const selectCls = "rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
