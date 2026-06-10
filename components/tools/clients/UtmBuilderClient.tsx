"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Pure client-side UTM campaign URL builder — nothing leaves the browser.
const FIELDS = [
  { key: "utm_source", label: "Campaign source", required: true, placeholder: "google, newsletter, facebook" },
  { key: "utm_medium", label: "Campaign medium", required: true, placeholder: "cpc, email, social" },
  { key: "utm_campaign", label: "Campaign name", required: true, placeholder: "spring_sale" },
  { key: "utm_term", label: "Campaign term", required: false, placeholder: "running+shoes (paid keywords)" },
  { key: "utm_content", label: "Campaign content", required: false, placeholder: "logolink, textlink (A/B testing)" },
] as const;

export function UtmBuilderClient() {
  const [base, setBase] = useState("");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const b = base.trim();
    if (!b) return "";
    let url: URL;
    try {
      url = new URL(b.includes("://") ? b : `https://${b}`);
    } catch {
      return "";
    }
    for (const f of FIELDS) {
      const v = (vals[f.key] ?? "").trim();
      if (v) url.searchParams.set(f.key, v);
    }
    return url.toString();
  }, [base, vals]);

  const invalid = base.trim() !== "" && result === "";

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Website URL</span>
          <input
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="https://example.com/landing"
            inputMode="url"
            className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <label key={f.key} className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-700">
                {f.label} {f.required && <span className="text-red-500">*</span>}
                <code className="ml-1 text-xs font-normal text-ink-400">{f.key}</code>
              </span>
              <input
                value={vals[f.key] ?? ""}
                onChange={(e) => setVals((p) => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </label>
          ))}
        </div>
        {invalid && <p className="mt-2 text-sm text-red-600">Enter a valid URL (with or without https://).</p>}
        <p className="mt-3 text-xs text-ink-400">Built in your browser — nothing is uploaded.</p>
      </div>

      {result && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="mb-2 text-sm font-medium text-emerald-800">Tagged campaign URL</p>
          <div className="flex items-stretch gap-2">
            <input readOnly value={result} onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 font-mono text-xs text-ink-900" />
            <Button variant="outline" onClick={copy}>
              {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
