"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { CharMeter } from "@/components/tools/CharMeter";
import { useCharLimit } from "@/hooks/useCharLimit";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Verdict = "safe" | "suspicious" | "dangerous";
type Result = {
  score: number; verdict: Verdict; signals: string[];
  impersonates: string | null;
  badUrls: { url: string; threat: string }[];
  urlsChecked: number;
};

const TONE: Record<Verdict, { bg: string; text: string; ring: string; label: string }> = {
  safe: { bg: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-200", label: "Looks legitimate" },
  suspicious: { bg: "bg-amber-500", text: "text-amber-700", ring: "ring-amber-200", label: "Suspicious — be careful" },
  dangerous: { bg: "bg-red-500", text: "text-red-700", ring: "ring-red-200", label: "Likely a scam / phishing" },
};

export function PhishingDetectorClient() {
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
      const res = await callTool("phishing-detector", { action: "analyze_phishing", text: input.trim() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError(data.message ?? "Could not analyse that email. Please try again.");
        return;
      }
      setResult(data as Result);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const tone = result ? TONE[result.verdict] : null;
  const dangerous = result?.verdict === "dangerous";

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Paste the suspicious email</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Paste the full email content here — sender, subject and body…"
          className={cn("h-56 w-full resize-y rounded-lg border bg-white p-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2",
            meter.over ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-ink-200 focus:border-brand-400 focus:ring-brand-100")} />
        <CharMeter state={meter} />
      </div>

      <Button onClick={run} disabled={!input.trim() || loading || meter.over} size="lg">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
        {loading ? "Analysing…" : "Check for phishing"}
      </Button>

      {result && tone && (
        <div className={cn("rounded-xl border bg-white p-5 shadow-card ring-1", tone.ring)}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-center gap-2">
              {dangerous ? <ShieldAlert className="h-6 w-6 text-red-600" /> : <ShieldCheck className={cn("h-6 w-6", tone.text)} />}
              <div>
                <p className={cn("text-sm font-semibold", tone.text)}>{tone.label}</p>
                {result.impersonates && <p className="text-xs text-ink-500">Appears to impersonate: <span className="font-medium">{result.impersonates}</span></p>}
              </div>
            </div>
            <span className={cn("text-4xl font-semibold tabular-nums", tone.text)}>{result.score}<span className="text-base font-normal text-ink-400">/100</span></span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div className={cn("h-full rounded-full transition-all duration-500", tone.bg)} style={{ width: `${result.score}%` }} />
          </div>

          {result.signals.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Warning signs</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-700">
                {result.signals.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {result.badUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Dangerous links found</p>
              <ul className="mt-1 space-y-1 text-sm">
                {result.badUrls.map((b, i) => (
                  <li key={i} className="break-all"><span className="rounded bg-red-50 px-1.5 py-0.5 font-mono text-[12px] text-red-700">{b.url}</span> <span className="text-xs text-red-600">({b.threat})</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">
        AI-assisted analysis for guidance only — it cross-checks any links against Google Safe Browsing but cannot guarantee an email is safe. When in doubt, never click links or share personal information.
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
