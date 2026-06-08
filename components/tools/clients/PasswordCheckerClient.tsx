"use client";

import { useCallback, useState } from "react";
import { ShieldCheck, ShieldAlert, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 100% client-side breach check via the HaveIBeenPwned k-anonymity API.
// We hash the password locally with SHA-1, send only the first 5 hex chars
// of the hash, and match the returned suffixes locally. The full password
// (and full hash) never leave the browser.
type Result = { count: number };

async function pwnedCount(password: string): Promise<number> {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(password));
  const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  const prefix = hex.slice(0, 5);
  const suffix = hex.slice(5);
  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, { headers: { "Add-Padding": "true" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  for (const line of text.split("\n")) {
    const [s, c] = line.trim().split(":");
    if (s === suffix) return Number(c) || 0;
  }
  return 0;
}

export function PasswordCheckerClient() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (!password || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const count = await pwnedCount(password);
      setResult({ count });
    } catch {
      setError("Could not reach the breach database. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [password, loading]);

  const pwned = result && result.count > 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Password to check</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setResult(null); }}
              onKeyDown={(e) => e.key === "Enter" && run()}
              autoComplete="off"
              placeholder="Type a password to test…"
              className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-3 pr-10 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button type="button" onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700" aria-label={show ? "Hide" : "Show"}>
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button onClick={run} disabled={!password || loading} size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {loading ? "Checking…" : "Check"}
          </Button>
        </div>
      </div>

      {result && (
        <div className={cn("rounded-xl border p-5 shadow-card ring-1", pwned ? "border-red-200 bg-red-50/40 ring-red-200" : "border-emerald-200 bg-emerald-50/40 ring-emerald-200")}>
          <div className="flex items-center gap-3">
            {pwned ? <ShieldAlert className="h-8 w-8 text-red-600" /> : <ShieldCheck className="h-8 w-8 text-emerald-600" />}
            <div>
              {pwned ? (
                <>
                  <p className="text-base font-semibold text-red-700">Compromised — don&apos;t use this password</p>
                  <p className="text-xs text-ink-500">It appeared <strong>{result.count.toLocaleString()}</strong> time{result.count === 1 ? "" : "s"} in known data breaches.</p>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-emerald-700">Safe — never seen in a breach</p>
                  <p className="text-xs text-ink-500">This password isn&apos;t in the HaveIBeenPwned breach corpus.</p>
                </>
              )}
            </div>
          </div>
          {pwned && (
            <p className="mt-3 text-xs text-ink-500">
              Change it everywhere you used it and pick a unique password (a password manager helps). A leaked password is on attacker credential-stuffing lists even if it looks strong.
            </p>
          )}
        </div>
      )}

      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      <p className="text-xs text-ink-400">
        Your password never leaves your browser. We hash it locally with SHA-1 and query HaveIBeenPwned using k-anonymity — only the first 5 characters of the hash are sent, never the password or full hash.
      </p>
    </div>
  );
}
