"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?/",
};

function strengthLabel(len: number, classes: number): { label: string; cls: string; pct: number } {
  const entropy = len * Math.log2([26, 36, 62, 88][Math.max(0, Math.min(3, classes - 1))] || 26);
  if (entropy < 40) return { label: "Weak", cls: "bg-red-500", pct: 25 };
  if (entropy < 60) return { label: "OK", cls: "bg-amber-500", pct: 50 };
  if (entropy < 90) return { label: "Strong", cls: "bg-emerald-500", pct: 75 };
  return { label: "Very strong", cls: "bg-emerald-600", pct: 100 };
}

export function PasswordGenClient() {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pool = [
      lower && SETS.lower,
      upper && SETS.upper,
      digits && SETS.digits,
      symbols && SETS.symbols,
    ].filter(Boolean).join("");
    if (!pool) { setPwd(""); return; }
    const buf = new Uint32Array(length);
    crypto.getRandomValues(buf);
    let out = "";
    for (let i = 0; i < length; i++) out += pool[buf[i] % pool.length];
    setPwd(out);
  }, [length, lower, upper, digits, symbols]);

  useEffect(() => { generate(); }, [generate]);

  function copy() { if (!pwd) return; navigator.clipboard.writeText(pwd); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  const classes = [lower, upper, digits, symbols].filter(Boolean).length;
  const s = strengthLabel(length, classes);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-ink-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <code className="flex-1 select-all break-all rounded-md bg-ink-50 px-3 py-3 font-mono text-base text-ink-900">
            {pwd || <span className="text-ink-300">Pick at least one character set</span>}
          </code>
          <Button size="sm" variant="outline" onClick={generate}><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button>
          <Button size="sm" onClick={copy} disabled={!pwd}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs font-medium text-ink-500">Strength:</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
            <div className={cn("h-full rounded-full transition-all", s.cls)} style={{ width: `${s.pct}%` }} />
          </div>
          <span className="text-xs font-semibold text-ink-700">{s.label}</span>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-ink-100 bg-white p-4">
        <div>
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium text-ink-700">Length</label>
            <span className="font-mono text-ink-900">{length}</span>
          </div>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-1 w-full accent-brand-500" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([
            ["Lowercase a-z", lower, setLower],
            ["Uppercase A-Z", upper, setUpper],
            ["Digits 0-9", digits, setDigits],
            ["Symbols !@#…", symbols, setSymbols],
          ] as const).map(([label, on, set]) => (
            <label key={label} className="flex cursor-pointer items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700">
              <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-400">Generated locally with crypto.getRandomValues — never sent to a server.</p>
    </div>
  );
}
