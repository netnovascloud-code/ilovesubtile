"use client";

import { useState } from "react";
import { ScanSearch, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { CharMeter } from "@/components/tools/CharMeter";
import { useCharLimit } from "@/hooks/useCharLimit";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Verdict = "human" | "mixed" | "likely_ai" | "very_likely_ai";
type Result = { score: number; verdict: Verdict; reasons: string[]; flagged: string[] };

const VERDICT_TONE: Record<Verdict, { ring: string; bg: string; text: string; label: string }> = {
  human: { ring: "ring-emerald-200", bg: "bg-emerald-500", text: "text-emerald-700", label: "Likely human-written" },
  mixed: { ring: "ring-amber-200", bg: "bg-amber-500", text: "text-amber-700", label: "Mixed signals" },
  likely_ai: { ring: "ring-orange-200", bg: "bg-orange-500", text: "text-orange-700", label: "Likely AI-written" },
  very_likely_ai: { ring: "ring-red-200", bg: "bg-red-500", text: "text-red-700", label: "Very likely AI-written" },
};

export function AiDetectorClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);
  const meter = useCharLimit(input);

  async function run() {
    if (!input.trim() || loading || meter.over) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("ai-detector", { task: "ai-detect", text: input.trim() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError("Could not analyse that text. Please try again.");
        return;
      }
      // ai-process returns { output: rawJson } for JSON tasks.
      let parsed: Result | null = null;
      try { parsed = JSON.parse(data.output ?? "") as Result; } catch { /* fall through */ }
      if (!parsed || typeof parsed.score !== "number") {
        setError("The detector returned an unexpected response. Please try again.");
        return;
      }
      // Defensive clamp/normalize.
      parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
      parsed.reasons = Array.isArray(parsed.reasons) ? parsed.reasons.slice(0, 5) : [];
      parsed.flagged = Array.isArray(parsed.flagged) ? parsed.flagged.slice(0, 5) : [];
      if (!["human", "mixed", "likely_ai", "very_likely_ai"].includes(parsed.verdict)) {
        parsed.verdict = parsed.score < 25 ? "human" : parsed.score < 50 ? "mixed" : parsed.score < 80 ? "likely_ai" : "very_likely_ai";
      }
      setResult(parsed);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const tone = result ? VERDICT_TONE[result.verdict] : null;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Text to analyse</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a paragraph (at least a few sentences for a useful estimate)…"
          className={cn("h-56 w-full resize-y rounded-lg border bg-white p-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2",
            meter.over ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-ink-200 focus:border-brand-400 focus:ring-brand-100")} />
        <CharMeter state={meter} />
      </div>

      <Button onClick={run} disabled={!input.trim() || loading || meter.over} size="lg">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanSearch className="h-4 w-4" />}
        {loading ? "Analysing…" : "Detect AI writing"}
      </Button>

      {result && tone && (
        <div className={cn("rounded-xl border bg-white p-5 shadow-card ring-1", tone.ring)}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className={cn("text-sm font-semibold", tone.text)}>{tone.label}</p>
              <p className="text-xs text-ink-500">{result.score}% AI-likelihood</p>
            </div>
            <span className={cn("text-4xl font-semibold tabular-nums", tone.text)}>{result.score}<span className="text-base font-normal text-ink-400">/100</span></span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div className={cn("h-full rounded-full transition-all duration-500", tone.bg)} style={{ width: `${result.score}%` }} />
          </div>

          {result.reasons.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Why</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-700">
                {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

          {result.flagged.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Suspect phrases</p>
              <ul className="mt-1 space-y-1 text-sm">
                {result.flagged.map((s, i) => <li key={i}><span className="rounded bg-amber-50 px-1.5 py-0.5 font-mono text-[12px] text-amber-800">{s}</span></li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">
        Heuristic AI-likelihood estimate from a state-of-the-art LLM. No detector is 100 % accurate — use the score as a hint, not a verdict, especially on short texts.
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
