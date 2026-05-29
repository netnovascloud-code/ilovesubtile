"use client";

import { useState } from "react";
import { Upload, X, Loader2, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: { str: string; hasEOL?: boolean }[] }> }> }> };
};

async function loadPdfjs(): Promise<PdfJs> {
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  return lib;
}

async function extractLines(pdfjs: PdfJs, file: File): Promise<string[]> {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const lines: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    let cur = "";
    for (const it of content.items) {
      cur += it.str;
      if (it.hasEOL) { lines.push(cur.trim()); cur = ""; } else cur += " ";
    }
    if (cur.trim()) lines.push(cur.trim());
  }
  return lines.filter((l) => l.length > 0);
}

type Op = { type: "eq" | "add" | "del"; text: string };
function lineDiff(A: string[], B: string[]): Op[] {
  const n = A.length, m = B.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ops: Op[] = [];
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

function Drop({ label, file, onPick, onClear }: { label: string; file: File | null; onPick: (f: File) => void; onClear: () => void }) {
  return file ? (
    <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm">
      <span className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></span>
      <button onClick={onClear} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
    </div>
  ) : (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-4 py-8 text-center transition-colors hover:brightness-95">
      <Upload className="h-6 w-6 text-blue-600" />
      <span className="mt-1.5 text-sm font-medium text-ink-900">{label}</span>
      <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); }} />
    </label>
  );
}

export function ComparePdfClient() {
  const [a, setA] = useState<File | null>(null);
  const [b, setB] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ops, setOps] = useState<Op[] | null>(null);

  async function run() {
    if (!a || !b || busy) return;
    setBusy(true); setError(null); setOps(null);
    try {
      const pdfjs = await loadPdfjs();
      const [la, lb] = await Promise.all([extractLines(pdfjs, a), extractLines(pdfjs, b)]);
      setOps(lineDiff(la, lb));
    } catch (e) {
      setError(`Could not compare: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  const stats = ops ? ops.reduce((acc, o) => { acc[o.type]++; return acc; }, { add: 0, del: 0, eq: 0 } as Record<string, number>) : null;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Drop label="First PDF (original)" file={a} onPick={(f) => { setA(f); setOps(null); }} onClear={() => { setA(null); setOps(null); }} />
        <Drop label="Second PDF (changed)" file={b} onPick={(f) => { setB(f); setOps(null); }} onClear={() => { setB(null); setOps(null); }} />
      </div>

      <Button size="lg" onClick={run} disabled={!a || !b || busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <GitCompare className="h-4 w-4" />}
        {busy ? "Comparing…" : "Compare PDFs"}
      </Button>

      {stats && (
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-emerald-700">+{stats.add} added</span>
          <span className="rounded bg-red-50 px-2 py-0.5 font-mono text-red-700">−{stats.del} removed</span>
          <span className="rounded bg-ink-50 px-2 py-0.5 font-mono text-ink-500">{stats.eq} unchanged</span>
        </div>
      )}

      {ops && (
        <pre className="max-h-[32rem] overflow-auto rounded-lg border border-ink-100 bg-white p-4 font-mono text-xs leading-relaxed">
          {ops.map((o, i) => (
            <div key={i} className={o.type === "add" ? "bg-emerald-50 text-emerald-800" : o.type === "del" ? "bg-red-50 text-red-800" : "text-ink-600"}>
              <span className="select-none pr-2 text-ink-300">{o.type === "add" ? "+" : o.type === "del" ? "−" : " "}</span>{o.text || " "}
            </div>
          ))}
        </pre>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        Text is extracted and compared line by line, 100% in your browser — your PDFs are never uploaded.
        Compares the text layer only (not images or exact layout). Scanned PDFs need OCR first.
      </p>
    </div>
  );
}
