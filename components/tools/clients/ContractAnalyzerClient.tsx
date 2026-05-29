"use client";

import { useState } from "react";
import { FileText, Loader2, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callTool } from "@/lib/tool-api";

type PdfPage = { getTextContent: () => Promise<{ items: { str: string; hasEOL?: boolean }[] }> };
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfDoc> };
};

let pdfjsCache: PdfJs | null = null;
async function loadPdfjs(): Promise<PdfJs> {
  if (pdfjsCache) return pdfjsCache;
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  pdfjsCache = lib;
  return lib;
}

async function extractText(file: File): Promise<string> {
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages: string[] = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const content = await page.getTextContent();
    let line = "";
    const lines: string[] = [];
    for (const it of content.items) {
      line += it.str;
      if (it.hasEOL) { lines.push(line); line = ""; }
      else line += " ";
    }
    if (line) lines.push(line);
    pages.push(lines.join("\n"));
  }
  return pages.join("\n\n");
}

type Analysis = {
  parties: string[];
  effective_date: string | null;
  term: string | null;
  payment_terms: string | null;
  liability: string | null;
  confidentiality: string | null;
  governing_law: string | null;
  notable_clauses: { title: string; summary: string }[];
  red_flags: string[];
};

export function ContractAnalyzerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [phase, setPhase] = useState<"idle" | "extracting" | "analyzing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!file) return;
    setError(null); setAnalysis(null); setPhase("extracting");
    try {
      const text = await extractText(file);
      if (!text.trim()) throw new Error("No text could be extracted from this PDF — is it a scan? Try the PDF OCR tool first.");
      setPhase("analyzing");
      // ai-process accepts up to 120 KB for the contract-analyze task.
      const res = await callTool("contract-analyzer", { task: "contract-analyze", text: text.slice(0, 120_000) });
      const json = (await res.json()) as { output?: string; error?: string; message?: string };
      if (!res.ok || !json.output) throw new Error(json.message ?? json.error ?? `HTTP ${res.status}`);
      setAnalysis(JSON.parse(json.output) as Analysis);
      setPhase("done");
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  const busy = phase === "extracting" || phase === "analyzing";

  const row = (label: string, v: string | string[] | null) => {
    if (v == null || (Array.isArray(v) && v.length === 0)) return null;
    return (
      <tr className="border-b border-ink-100 last:border-0 align-top">
        <td className="bg-ink-50/50 px-3 py-2 font-medium text-ink-600 w-1/3">{label}</td>
        <td className="px-3 py-2 text-ink-900">{Array.isArray(v) ? v.join(", ") : v}</td>
      </tr>
    );
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Contract PDF"
        accept={{ "application/pdf": [".pdf"] }}
        icon={<FileText className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setAnalysis(null); setPhase("idle"); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          {phase === "extracting" ? "Reading the PDF…" :
           phase === "analyzing" ? "Analyzing the clauses…" :
           analysis ? "Re-analyze" : "Analyze contract"}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {analysis && (
        <>
          <div className="overflow-hidden rounded-lg border border-ink-100">
            <table className="w-full text-sm">
              <tbody>
                {row("Parties", analysis.parties)}
                {row("Effective date", analysis.effective_date)}
                {row("Term", analysis.term)}
                {row("Payment terms", analysis.payment_terms)}
                {row("Liability", analysis.liability)}
                {row("Confidentiality", analysis.confidentiality)}
                {row("Governing law", analysis.governing_law)}
              </tbody>
            </table>
          </div>

          {analysis.notable_clauses?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-ink-800">Notable clauses</h3>
              <ul className="space-y-2">
                {analysis.notable_clauses.map((c, i) => (
                  <li key={i} className="rounded-lg border border-ink-100 bg-white p-3">
                    <div className="text-sm font-semibold text-ink-900">{c.title}</div>
                    <p className="mt-1 text-sm text-ink-600">{c.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.red_flags?.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-800">
                <ShieldAlert className="h-4 w-4" /> Red flags
              </h3>
              <ul className="space-y-1.5 text-sm text-amber-800">
                {analysis.red_flags.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-ink-400">
        AI-generated analysis for orientation only — not legal advice. Long contracts are read up to ~120 KB. Scanned PDFs need OCR first.
      </p>
    </div>
  );
}
