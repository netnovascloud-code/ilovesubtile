"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

const ALGOS = ["SHA-1", "SHA-256", "SHA-512"] as const;
type Algo = (typeof ALGOS)[number];

async function digest(text: string, algo: Algo): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashClient() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<Algo, string>>({ "SHA-1": "", "SHA-256": "", "SHA-512": "" });
  const [copied, setCopied] = useState<Algo | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!input) { if (alive) setHashes({ "SHA-1": "", "SHA-256": "", "SHA-512": "" }); return; }
      const next = { "SHA-1": "", "SHA-256": "", "SHA-512": "" } as Record<Algo, string>;
      for (const a of ALGOS) next[a] = await digest(input, a);
      if (alive) setHashes(next);
    })();
    return () => { alive = false; };
  }, [input]);

  function copy(a: Algo) { navigator.clipboard.writeText(hashes[a]); setCopied(a); setTimeout(() => setCopied(null), 1500); }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Text to hash</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste any text — hashes update instantly."
          className="h-40 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>
      {ALGOS.map((a) => (
        <div key={a} className="flex items-center gap-2">
          <span className="w-20 text-xs font-semibold uppercase tracking-wide text-ink-500">{a}</span>
          <code className="flex-1 break-all rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-[12px] text-ink-900">
            {hashes[a] || <span className="text-ink-300">—</span>}
          </code>
          <button onClick={() => copy(a)} disabled={!hashes[a]} className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-2 text-xs text-ink-600 hover:text-ink-900 disabled:opacity-40">
            {copied === a ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      ))}
      <p className="text-xs text-ink-400">100% in your browser — SHA-1, SHA-256 and SHA-512 via the WebCrypto API. MD5 isn't included (insecure and not in WebCrypto).</p>
    </div>
  );
}
