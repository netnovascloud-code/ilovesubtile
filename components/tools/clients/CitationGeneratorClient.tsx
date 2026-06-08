"use client";

import { useState } from "react";
import { Copy, Check, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { CharMeter } from "@/components/tools/CharMeter";
import { useCharLimit } from "@/hooks/useCharLimit";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

const STYLES = ["APA", "MLA", "Chicago", "Harvard", "IEEE"] as const;

export function CitationGeneratorClient() {
  const [style, setStyle] = useState<(typeof STYLES)[number]>("APA");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);
  const meter = useCharLimit(input);

  async function run() {
    if (!input.trim() || loading || meter.over) return;
    setLoading(true); setError(null); setOutput("");
    try {
      // The ai-process 'citation' task expects a leading 'style: <X>' line.
      const text = `style: ${style}\n${input.trim()}`;
      const res = await callTool("citation-generator", { task: "citation", text });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError("Could not generate that citation. Please try again.");
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
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {STYLES.map((s) => (
          <button key={s} onClick={() => setStyle(s)}
            className={cn("rounded-full border px-3 py-1 text-sm font-medium transition-colors",
              style === s ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300")}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Source details</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={`e.g.\nTitle: The Selfish Gene\nAuthor: Richard Dawkins\nYear: 1976\nPublisher: Oxford University Press\nor paste a URL with the page's title and author.`}
            className={cn("h-64 w-full resize-y rounded-lg border bg-white p-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2",
              meter.over ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-ink-200 focus:border-brand-400 focus:ring-brand-100")} />
          <CharMeter state={meter} />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{style} citation + in-text</label>
            <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="h-64 w-full overflow-auto whitespace-pre-wrap rounded-lg border border-ink-200 bg-ink-50/50 p-3 text-sm leading-relaxed text-ink-900">
            {loading ? <span className="text-ink-400">Generating…</span>
              : output || <span className="text-ink-300">Your citation will appear here.</span>}
          </div>
        </div>
      </div>

      <Button onClick={run} disabled={!input.trim() || loading || meter.over} size="lg">
        <BookOpen className="h-4 w-4" /> {loading ? "Generating…" : `Generate ${style} citation`}
      </Button>

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
