"use client";

import { useState } from "react";
import { ShieldCheck, AlertCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Verdict = "valid" | "risky" | "disposable" | "no_domain" | "invalid";
type Result = {
  email: string; verdict: Verdict; score: number;
  checks: { syntax: boolean; domain: boolean; mx: boolean; disposable: boolean };
  signals: string[];
};

const TONE: Record<Verdict, { bg: string; text: string; ring: string; label: string }> = {
  valid: { bg: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-200", label: "Valid & deliverable" },
  risky: { bg: "bg-amber-500", text: "text-amber-700", ring: "ring-amber-200", label: "Risky — may not receive mail" },
  disposable: { bg: "bg-orange-500", text: "text-orange-700", ring: "ring-orange-200", label: "Disposable / throwaway" },
  no_domain: { bg: "bg-red-500", text: "text-red-700", ring: "ring-red-200", label: "Domain does not exist" },
  invalid: { bg: "bg-red-500", text: "text-red-700", ring: "ring-red-200", label: "Invalid address" },
};

const CHECK_LABELS: { key: keyof Result["checks"]; label: string; good: (v: boolean) => boolean }[] = [
  { key: "syntax", label: "Valid syntax", good: (v) => v },
  { key: "domain", label: "Domain resolves", good: (v) => v },
  { key: "mx", label: "Accepts mail (MX)", good: (v) => v },
  { key: "disposable", label: "Not disposable", good: (v) => !v },
];

export function EmailCheckerClient() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  async function run() {
    if (!email.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("email-checker", { action: "validate_email", email: email.trim() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError(data.message ?? "Could not check that email. Please try again.");
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

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Email address</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="name@example.com" type="email"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
          <Button onClick={run} disabled={!email.trim() || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? "Checking…" : "Verify"}
          </Button>
        </div>
      </div>

      {result && tone && (
        <div className={cn("rounded-xl border bg-white p-5 shadow-card ring-1", tone.ring)}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className={cn("text-sm font-semibold", tone.text)}>{tone.label}</p>
              <p className="text-xs text-ink-500 break-all">{result.email}</p>
            </div>
            <span className={cn("text-4xl font-semibold tabular-nums", tone.text)}>{result.score}<span className="text-base font-normal text-ink-400">/100</span></span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div className={cn("h-full rounded-full transition-all duration-500", tone.bg)} style={{ width: `${result.score}%` }} />
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {CHECK_LABELS.map((c) => {
              const ok = c.good(result.checks[c.key]);
              return (
                <li key={c.key} className={cn("flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium", ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700")}>
                  <span>{ok ? "✓" : "✗"}</span> {c.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">
        Checks syntax, that the domain resolves, that it has mail (MX) records, and whether it's a disposable provider. A mailbox can still be inactive — this is an indicative reliability score, not a guarantee of delivery.
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
