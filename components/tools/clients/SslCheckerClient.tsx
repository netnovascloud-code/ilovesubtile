"use client";

import { useCallback, useState } from "react";
import { ShieldCheck, ShieldAlert, AlertCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Result = {
  host: string;
  valid: boolean;
  notBefore: string;
  notAfter: string;
  daysRemaining: number;
  issuer: string;
  subject: string;
  domains: string[];
  keyStrength: string;
};

export function SslCheckerClient() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  const run = useCallback(async () => {
    if (!url.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await callTool("ssl-checker", { action: "ssl_check", url: url.trim() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({ kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null });
          return;
        }
        setError(data.message ?? "Could not read the SSL certificate for that site.");
        return;
      }
      setResult(data as Result);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }, [url, loading]);

  const expiringSoon = result && result.daysRemaining >= 0 && result.daysRemaining <= 30;
  const ok = result?.valid && !expiringSoon;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Website URL</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={url} onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="example.com"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
          <Button onClick={run} disabled={!url.trim() || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? "Checking…" : "Check SSL"}
          </Button>
        </div>
      </div>

      {result && (
        <div className={cn("rounded-xl border p-5 shadow-card ring-1", result.valid ? (expiringSoon ? "border-amber-200 bg-amber-50/40 ring-amber-200" : "border-emerald-200 bg-emerald-50/40 ring-emerald-200") : "border-red-200 bg-red-50/40 ring-red-200")}>
          <div className="flex items-center gap-3">
            {ok ? <ShieldCheck className="h-8 w-8 text-emerald-600" /> : <ShieldAlert className={cn("h-8 w-8", result.valid ? "text-amber-600" : "text-red-600")} />}
            <div>
              <p className={cn("text-base font-semibold", result.valid ? (expiringSoon ? "text-amber-700" : "text-emerald-700") : "text-red-700")}>
                {!result.valid ? "Certificate not valid" : expiringSoon ? `Valid — expires in ${result.daysRemaining} days` : "Valid certificate"}
              </p>
              <p className="text-xs text-ink-500 break-all">{result.host}</p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <Row label="Expires" value={`${result.notAfter.slice(0, 10)} (${result.daysRemaining} days)`} />
            <Row label="Issued by" value={result.issuer} />
            <Row label="Issued" value={result.notBefore.slice(0, 10)} />
            <Row label="Key strength" value={result.keyStrength} />
            <Row label="Covered domains" value={result.domains.slice(0, 6).join(", ") + (result.domains.length > 6 ? `, +${result.domains.length - 6}` : "")} full />
          </dl>
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">
        We open a live TLS connection to read the certificate and return the result in real time — nothing is stored. A valid certificate means the connection is encrypted and the domain is CA-verified; it doesn&apos;t certify the site&apos;s content.
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}

function Row({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={cn("rounded-md border border-ink-100 bg-white px-3 py-2", full && "sm:col-span-2")}>
      <dt className="text-xs uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="mt-0.5 break-words font-medium text-ink-900">{value || "—"}</dd>
    </div>
  );
}
