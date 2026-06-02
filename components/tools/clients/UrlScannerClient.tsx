"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, AlertCircle, Loader2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Verdict = "safe" | "dangerous";
type Result = { url: string; verdict: Verdict; threats: string[]; source: string };

export function UrlScannerClient() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  async function run() {
    if (!url.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("url-scanner", { action: "scan_url", url: url.trim() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError(data.message ?? "Could not scan that URL. Please try again.");
        return;
      }
      setResult(data as Result);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const dangerous = result?.verdict === "dangerous";

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">URL to check</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={url} onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="https://example.com/login"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
          <Button onClick={run} disabled={!url.trim() || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? "Scanning…" : "Scan URL"}
          </Button>
        </div>
      </div>

      {result && (
        <div className={cn("rounded-xl border p-5 shadow-card ring-1", dangerous ? "border-red-200 bg-red-50/40 ring-red-200" : "border-emerald-200 bg-emerald-50/40 ring-emerald-200")}>
          <div className="flex items-center gap-3">
            {dangerous ? <ShieldAlert className="h-8 w-8 text-red-600" /> : <ShieldCheck className="h-8 w-8 text-emerald-600" />}
            <div>
              <p className={cn("text-base font-semibold", dangerous ? "text-red-700" : "text-emerald-700")}>
                {dangerous ? "Dangerous link" : "No threats found"}
              </p>
              <p className="text-xs text-ink-500 break-all">{result.url}</p>
            </div>
          </div>
          {dangerous && result.threats.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {result.threats.map((t, i) => (
                <li key={i} className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700">{t}</li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-ink-400">Checked against {result.source}.</p>
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">
        Indicative result from Google Safe Browsing (a database of known unsafe sites). A "no threats found" result does not guarantee a site is safe — new phishing pages can appear before they're catalogued.
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
