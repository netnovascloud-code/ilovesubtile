"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { AdProcessing } from "@/components/ads/AdProcessing";
import { TemplatesBar } from "@/components/tools/TemplatesBar";
import { CharMeter } from "@/components/tools/CharMeter";
import { useCharLimit } from "@/hooks/useCharLimit";

const LEVELS = [
  { id: "light", label: "Light" },
  { id: "medium", label: "Medium" },
  { id: "strong", label: "Strong" },
] as const;

// Heuristic "human-ness": humans vary sentence length a lot, so we score the
// normalised standard deviation of sentence lengths (burstiness).
function humanScore(text: string): number {
  const sents = text.split(/[.!?]+/).map((s) => s.trim().split(/\s+/).length).filter((n) => n > 1);
  if (sents.length < 2) return 0;
  const mean = sents.reduce((a, b) => a + b, 0) / sents.length;
  const variance = sents.reduce((a, b) => a + (b - mean) ** 2, 0) / sents.length;
  const cv = Math.sqrt(variance) / mean; // coefficient of variation
  return Math.max(40, Math.min(99, Math.round(cv * 140 + 45)));
}

export function HumanizerClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [level, setLevel] = useState<string>("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [score, setScore] = useState(0);
  const meter = useCharLimit(input);

  async function run() {
    if (!input.trim() || loading || meter.over) return;
    setLoading(true); setError(null); setOutput(""); setScore(0);
    try {
      const res = await callTool("ai-humanizer", { task: "humanize", text: input, options: { level } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error === "daily_limit" ? "Daily free limit reached — sign in or upgrade for a higher monthly quota." : "Something went wrong. Try again.");
        return;
      }
      const out = data.output ?? "";
      setOutput(out);
      setScore(humanScore(out));
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="space-y-4">
      <TemplatesBar
        tool="ai-humanizer"
        settings={{ level }}
        onApply={(s) => { if (typeof s.level === "string") setLevel(s.level); }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-500">Strength:</span>
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {LEVELS.map((l) => (
              <button key={l.id} onClick={() => setLevel(l.id)}
                className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", level === l.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
        {output && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink-700">Humanization score</span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${score}%` }} />
            </div>
            <span className="text-sm font-bold text-emerald-600">{score}</span>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">AI-generated text</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste the AI text you want to humanize…"
            className={cn("h-72 w-full resize-y rounded-lg border bg-white p-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2",
              meter.over ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-ink-200 focus:border-brand-400 focus:ring-brand-100")} />
          <CharMeter state={meter} />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">Humanized text</label>
            <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="h-72 w-full overflow-auto whitespace-pre-wrap rounded-lg border border-ink-200 bg-ink-50/50 p-3 text-sm text-ink-900">
            {loading ? <span className="text-ink-400">Humanizing…</span> : output || <span className="text-ink-300">Your humanized text will appear here.</span>}
          </div>
        </div>
      </div>

      <Button onClick={run} disabled={!input.trim() || loading || meter.over} size="lg">
        <Sparkles className="h-4 w-4" /> {loading ? "Working…" : "Humanize text"}
      </Button>

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">Rewrites text you own to read more naturally. Your text is never stored. {loading ? "" : ""}</p>
      {loading && <AdProcessing />}
    </div>
  );
}
