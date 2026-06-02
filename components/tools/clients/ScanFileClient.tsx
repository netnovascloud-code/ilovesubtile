"use client";

import { useCallback, useState } from "react";
import { ShieldCheck, ShieldAlert, ShieldQuestion, AlertCircle, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Verdict = "clean" | "suspicious" | "dangerous" | "unknown";
type Result = {
  verdict: Verdict; malicious?: number; suspicious?: number; total?: number;
  threats?: string[]; message?: string; source?: string;
};

const TONE: Record<Verdict, { icon: typeof ShieldCheck; border: string; bg: string; text: string; label: string }> = {
  clean: { icon: ShieldCheck, border: "border-emerald-200", bg: "bg-emerald-50/40", text: "text-emerald-700", label: "File looks clean" },
  suspicious: { icon: ShieldAlert, border: "border-amber-200", bg: "bg-amber-50/40", text: "text-amber-700", label: "Suspicious file" },
  dangerous: { icon: ShieldAlert, border: "border-red-200", bg: "bg-red-50/40", text: "text-red-700", label: "Dangerous file" },
  unknown: { icon: ShieldQuestion, border: "border-ink-200", bg: "bg-ink-50/40", text: "text-ink-700", label: "Not in the database" },
};

async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function ScanFileClient() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  const onFile = useCallback((f: File) => { setFile(f); setResult(null); setError(null); }, []);

  const scan = useCallback(async () => {
    if (!file || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const sha256 = await sha256Hex(file);
      const res = await callTool("scan-file", { action: "scan_file", sha256, name: file.name, size: file.size });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError(data.message ?? "Could not scan that file. Please try again.");
        return;
      }
      setResult(data as Result);
    } catch {
      setError("Could not read or scan that file. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [file, loading]);

  const reset = () => { setFile(null); setResult(null); setError(null); };

  if (!file) {
    return (
      <div className="space-y-3">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
          <Upload className="h-8 w-8 text-ink-400" />
          <div className="text-base font-semibold text-ink-900">Drop a file to scan</div>
          <div className="text-sm text-ink-500">We compute its fingerprint (SHA-256) in your browser and check it against 70+ antivirus engines — the file itself is never uploaded.</div>
          <input type="file" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Choose file</span>
        </label>
      </div>
    );
  }

  const tone = result ? TONE[result.verdict] : null;
  const Icon = tone?.icon ?? ShieldCheck;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-lg border border-ink-100 bg-white p-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink-900">{file.name}</div>
          <div className="text-xs text-ink-400">{formatBytes(file.size)}</div>
        </div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <Button onClick={scan} disabled={loading} size="lg">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
        {loading ? "Scanning…" : "Scan for viruses"}
      </Button>

      {result && tone && (
        <div className={cn("rounded-xl border p-5 shadow-card", tone.border, tone.bg)}>
          <div className="flex items-center gap-3">
            <Icon className={cn("h-8 w-8", tone.text)} />
            <div>
              <p className={cn("text-base font-semibold", tone.text)}>{tone.label}</p>
              {result.total != null
                ? <p className="text-xs text-ink-500">{result.malicious ?? 0}/{result.total} engines flagged this file{(result.suspicious ?? 0) > 0 ? ` · ${result.suspicious} suspicious` : ""}.</p>
                : <p className="text-xs text-ink-500">{result.message}</p>}
            </div>
          </div>
          {result.threats && result.threats.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Detections</p>
              <ul className="mt-1 space-y-1 text-sm">
                {result.threats.map((t, i) => <li key={i}><span className="rounded bg-red-50 px-1.5 py-0.5 font-mono text-[12px] text-red-700">{t}</span></li>)}
              </ul>
            </div>
          )}
          {result.source && <p className="mt-3 text-xs text-ink-400">Source: {result.source}.</p>}
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">
        Indicative result provided by VirusTotal (70+ antivirus engines) — it does not constitute an absolute guarantee of safety. An "unknown" result means no engine has yet analysed this exact file.
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
