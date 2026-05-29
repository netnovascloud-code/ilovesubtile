"use client";

import { useMemo, useState } from "react";

/** Simple line-level LCS diff — produces (type, text) tuples for rendering. */
type DiffOp = { type: "eq" | "add" | "del"; text: string };

function lineDiff(a: string, b: string): DiffOp[] {
  const A = a.split(/\r?\n/);
  const B = b.split(/\r?\n/);
  const n = A.length, m = B.length;
  // LCS table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ops: DiffOp[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) { ops.push({ type: "eq", text: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push({ type: "del", text: A[i] }); i++; }
    else { ops.push({ type: "add", text: B[j] }); j++; }
  }
  while (i < n) ops.push({ type: "del", text: A[i++] });
  while (j < m) ops.push({ type: "add", text: B[j++] });
  return ops;
}

export function TextDiffClient() {
  const [a, setA] = useState("The quick brown fox\njumps over the lazy dog.\nA second line.\n");
  const [b, setB] = useState("The quick red fox\njumps over the lazy dog.\nAn added line.\nA second line.\n");

  const ops = useMemo(() => lineDiff(a, b), [a, b]);
  const stats = useMemo(() => {
    let add = 0, del = 0, eq = 0;
    for (const o of ops) (o.type === "add" ? add++ : o.type === "del" ? del++ : eq++);
    return { add, del, eq };
  }, [ops]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-400">Original</label>
          <textarea value={a} onChange={(e) => setA(e.target.value)} spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-400">Changed</label>
          <textarea value={b} onChange={(e) => setB(e.target.value)} spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-ink-500">
        <span className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-emerald-700">+{stats.add}</span>
        <span className="rounded bg-red-50 px-2 py-0.5 font-mono text-red-700">−{stats.del}</span>
        <span className="rounded bg-ink-50 px-2 py-0.5 font-mono text-ink-500">={stats.eq}</span>
      </div>

      <pre className="overflow-auto rounded-lg border border-ink-100 bg-white p-4 font-mono text-sm leading-relaxed">
        {ops.map((o, i) => (
          <div key={i} className={
            o.type === "add" ? "bg-emerald-50 text-emerald-800" :
            o.type === "del" ? "bg-red-50 text-red-800" : "text-ink-700"
          }>
            <span className="select-none pr-2 text-ink-300">{o.type === "add" ? "+" : o.type === "del" ? "−" : " "}</span>
            {o.text || " "}
          </div>
        ))}
      </pre>

      <p className="text-xs text-ink-400">100% in your browser — both texts never leave your device.</p>
    </div>
  );
}
