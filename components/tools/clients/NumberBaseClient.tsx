"use client";

import { useMemo, useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";

const BASES = [
  { id: 2, label: "Binary", placeholder: "10110011" },
  { id: 8, label: "Octal", placeholder: "263" },
  { id: 10, label: "Decimal", placeholder: "179" },
  { id: 16, label: "Hexadecimal", placeholder: "B3" },
] as const;

function isValid(value: string, base: number): boolean {
  if (!value) return false;
  const re = base === 2 ? /^-?[01]+$/ : base === 8 ? /^-?[0-7]+$/ : base === 10 ? /^-?\d+$/ : /^-?[0-9a-f]+$/i;
  return re.test(value);
}

/** Parse digit-by-digit straight into a BigInt. Going through parseInt() first
 *  would round-trip the value through a 53-bit double and silently corrupt any
 *  number above 2^53 (e.g. a 64-bit hex value). Callers pre-validate the digits. */
function parseToBigInt(value: string, base: number): bigint {
  const neg = value.startsWith("-");
  const digits = (neg ? value.slice(1) : value).toLowerCase();
  const b = BigInt(base);
  let n = 0n;
  for (const ch of digits) n = n * b + BigInt(parseInt(ch, base));
  return neg ? -n : n;
}

export function NumberBaseClient() {
  const [value, setValue] = useState("179");
  const [base, setBase] = useState<number>(10);
  const [copied, setCopied] = useState<number | null>(null);

  const { results, error } = useMemo(() => {
    if (!value.trim()) return { results: null, error: null as string | null };
    if (!isValid(value.trim(), base)) return { results: null, error: `Not a valid base-${base} number.` };
    let n: bigint;
    try { n = parseToBigInt(value.trim(), base); }
    catch { return { results: null, error: "Could not parse number." }; }
    return {
      results: {
        2: n.toString(2),
        8: n.toString(8),
        10: n.toString(10),
        16: n.toString(16).toUpperCase(),
      } as Record<number, string>,
      error: null,
    };
  }, [value, base]);

  function copy(b: number) { if (!results) return; navigator.clipboard.writeText(results[b]); setCopied(b); setTimeout(() => setCopied(null), 1500); }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {BASES.map((b) => (
          <button key={b.id} onClick={() => setBase(b.id)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${base === b.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"}`}>
            {b.label}
          </button>
        ))}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Enter a base-{base} number</label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={BASES.find((x) => x.id === base)?.placeholder}
          className="w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>
      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      {results && (
        <div className="space-y-2">
          {BASES.map((b) => (
            <div key={b.id} className="flex items-center gap-2">
              <span className="w-28 text-xs font-semibold uppercase tracking-wide text-ink-500">{b.label}</span>
              <code className="flex-1 break-all rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900">{results[b.id]}</code>
              <button onClick={() => copy(b.id)} className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-2 text-xs text-ink-600 hover:text-ink-900">
                {copied === b.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-ink-400">100% in your browser. Free and unlimited.</p>
    </div>
  );
}
