"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/** UUID v7 (time-ordered) generator — pure JS, no deps. */
function uuidv7(): string {
  const ms = Date.now();
  const rand = new Uint8Array(10);
  crypto.getRandomValues(rand);
  rand[0] = (rand[0] & 0x0f) | 0x70; // version 7
  rand[2] = (rand[2] & 0x3f) | 0x80; // variant RFC 4122
  const hex = (n: number, w: number) => n.toString(16).padStart(w, "0");
  const msHex = ms.toString(16).padStart(12, "0");
  const bytes = Array.from(rand, (b) => hex(b, 2)).join("");
  return `${msHex.slice(0, 8)}-${msHex.slice(8, 12)}-${bytes.slice(0, 4)}-${bytes.slice(4, 8)}-${bytes.slice(8, 20)}`;
}

const COUNTS = [1, 10, 100, 1000] as const;

export function UuidGeneratorClient() {
  const [version, setVersion] = useState<"v4" | "v7">("v4");
  const [count, setCount] = useState<(typeof COUNTS)[number]>(10);
  const [hyphens, setHyphens] = useState(true);
  const [upper, setUpper] = useState(false);
  const [seed, setSeed] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedOne, setCopiedOne] = useState<number | null>(null);
  // SSR can't run crypto.randomUUID; we'd otherwise hydration-mismatch when
  // the client generates fresh ids. Gate the list on `mounted` so SSR ships
  // an empty <ul> and the client populates it after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ids = useMemo(() => {
    void seed;
    if (!mounted) return [];
    const make = version === "v7" ? uuidv7 : () => crypto.randomUUID();
    const list = Array.from({ length: count }, make);
    return list.map((id) => {
      let s = id;
      if (!hyphens) s = s.replace(/-/g, "");
      if (upper) s = s.toUpperCase();
      return s;
    });
  }, [version, count, hyphens, upper, seed, mounted]);

  async function copyOne(i: number) {
    try {
      await navigator.clipboard.writeText(ids[i]);
      setCopiedOne(i);
      setTimeout(() => setCopiedOne((c) => (c === i ? null : c)), 1000);
    } catch {}
  }
  async function copyAll() {
    try {
      await navigator.clipboard.writeText(ids.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1200);
    } catch {}
  }
  function downloadAll() {
    const blob = new Blob([ids.join("\n") + "\n"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${version}-${ids.length}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-100 bg-white p-4">
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {(["v4", "v7"] as const).map((v) => (
            <button key={v} onClick={() => setVersion(v)} className={`rounded-md px-3 py-1 text-xs font-medium ${version === v ? "bg-brand-500 text-white" : "text-ink-600"}`}>
              UUID {v}
            </button>
          ))}
        </div>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          How many
          <select value={count} onChange={(e) => setCount(Number(e.target.value) as (typeof COUNTS)[number])}
            className="mt-1 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-900">
            {COUNTS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-ink-700">
          <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="h-4 w-4" />
          Hyphens
        </label>
        <label className="flex items-center gap-2 self-end text-sm text-ink-700">
          <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className="h-4 w-4" />
          Uppercase
        </label>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setSeed((s) => s + 1)}>
            <RefreshCw className="h-3.5 w-3.5" /> Regenerate
          </Button>
          <Button size="sm" variant="outline" onClick={copyAll}>
            {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedAll ? "Copied" : "Copy all"}
          </Button>
          <Button size="sm" onClick={downloadAll}>
            <Download className="h-3.5 w-3.5" /> .txt
          </Button>
        </div>
      </div>

      <ul className="max-h-[28rem] divide-y divide-ink-100 overflow-auto rounded-lg border border-ink-100 bg-white">
        {ids.map((id, i) => (
          <li key={i} className="flex items-center gap-3 px-4 py-2">
            <span className="w-12 shrink-0 text-xs text-ink-300">{i + 1}</span>
            <code className="flex-1 break-all font-mono text-sm text-ink-800">{id}</code>
            <button onClick={() => copyOne(i)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
              {copiedOne === i ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </li>
        ))}
      </ul>

      <p className="text-xs text-ink-400">100% in your browser via Web Crypto — never sent anywhere.</p>
    </div>
  );
}
