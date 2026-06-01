"use client";

import { useState } from "react";
import { Upload, Download, X, Loader2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

/**
 * Translate Document (DOCX) with layout preserved — Part 11 "moat".
 * DOCX is a ZIP of XML. We rewrite every `<w:t>` text node in `word/document.xml`
 * (the body) and `word/header*.xml` / `word/footer*.xml` (running heads/feet),
 * leaving every run-property, paragraph-property and image untouched. Result:
 * fonts, sizes, colours, headings, tables, lists, page breaks — all preserved.
 *
 * Translation is batched: we collect every text node into one list, send it to
 * the AI in chunks of ~80 strings using a delimiter the model is told never to
 * emit, then splice the translations back into the XML in order.
 */

// Pick a delimiter no normal document text contains so we can re-split safely.
const DELIM = "<<<¶KONVER_NEXT§>>>";
const CHUNK = 80; // strings per AI call

function chunked<T>(xs: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += n) out.push(xs.slice(i, i + n));
  return out;
}

// Extract <w:t>…</w:t> contents in document order, then return a rewriter that
// splices new contents back into the same byte ranges. We deliberately keep
// the surrounding markup (xml:space="preserve" etc.) intact.
function extractTexts(xml: string): { items: string[]; rebuild: (translated: string[]) => string } {
  const re = /(<w:t(?:\s[^>]*)?>)([\s\S]*?)(<\/w:t>)/g;
  const items: string[] = [];
  const idxs: { open: string; close: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    items.push(decodeXml(m[2]));
    idxs.push({ open: m[1], close: m[3], start: m.index, end: m.index + m[0].length });
  }
  return {
    items,
    rebuild: (translated) => {
      let out = "";
      let cursor = 0;
      for (let i = 0; i < idxs.length; i++) {
        const { open, close, start, end } = idxs[i];
        out += xml.slice(cursor, start);
        out += open + encodeXml(translated[i] ?? items[i]) + close;
        cursor = end;
      }
      out += xml.slice(cursor);
      return out;
    },
  };
}

function decodeXml(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
function encodeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

async function translateBatch(items: string[], target: string): Promise<string[]> {
  // Tag each item with a stable index so the model can't quietly drop one and
  // shift the rest. We re-split on the index marker and tolerate model drift.
  const joined = items.map((s, i) => `[${i + 1}]${s}${DELIM}`).join("\n");
  const sys =
    `Translate each tagged segment below into ${target} so it reads naturally. ` +
    `Each segment is prefixed by [N] and ends with the literal marker ${DELIM}. ` +
    `KEEP the [N] prefix and the ${DELIM} marker exactly. ` +
    `Never merge segments, never reorder, never add commentary. ` +
    `If a segment is whitespace-only or already in ${target}, keep it as-is (with its prefix/marker).`;
  const res = await callTool("translate-document-with-layout", { task: "translate", text: `${sys}\n\n${joined}`, options: { target } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err: Error & { quota?: { kind: "daily" | "monthly"; limit: number; used: number; resetAt: string | null } } = new Error(data.error ?? "translation_failed");
    if (data.error === "daily_limit" || data.error === "monthly_limit") {
      err.quota = { kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null };
    }
    throw err;
  }
  const out = String(data.output ?? "");
  // Recover by [N] index — robust against the model dropping the trailing marker
  // on the last segment, or swallowing one in the middle.
  const result: string[] = items.slice();
  const tagged = out.split(/\[(\d+)\]/);
  for (let k = 1; k < tagged.length; k += 2) {
    const n = parseInt(tagged[k], 10);
    let value = tagged[k + 1] ?? "";
    const delimAt = value.indexOf(DELIM);
    if (delimAt >= 0) value = value.slice(0, delimAt);
    // Strip any leading newline left over from the join.
    value = value.replace(/^\r?\n/, "").replace(/\r?\n$/, "");
    if (n >= 1 && n <= items.length) result[n - 1] = value;
  }
  return result;
}

export function TranslateDocumentClient() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<LanguageCode>("ES");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("translated.docx");
  const [outSize, setOutSize] = useState(0);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setOutUrl(null); setProgress(0); setPhase("Reading document…");
    try {
      const { default: JSZip } = await import("jszip");
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      // Targets: body + every header/footer XML part.
      const targets: string[] = [];
      zip.forEach((path) => {
        if (path === "word/document.xml" || /^word\/(header|footer)\d*\.xml$/.test(path)) targets.push(path);
      });
      if (!targets.length) {
        setError("This file doesn't look like a Word .docx (no word/document.xml inside).");
        setBusy(false); return;
      }

      // Gather every <w:t> across every target XML so we can batch globally.
      const slices: { path: string; items: string[]; rebuild: (t: string[]) => string }[] = [];
      const flat: string[] = [];
      for (const p of targets) {
        const xml = await zip.file(p)!.async("string");
        const { items, rebuild } = extractTexts(xml);
        slices.push({ path: p, items, rebuild });
        flat.push(...items);
      }
      if (!flat.length) { setError("No text to translate was found."); setBusy(false); return; }

      // Translate the substantive items only (skip pure whitespace).
      const indexes: number[] = [];
      const payload: string[] = [];
      for (let i = 0; i < flat.length; i++) {
        if (flat[i].trim().length > 0) { indexes.push(i); payload.push(flat[i]); }
      }
      const translated = flat.slice();
      const lang = LANGUAGES.find((l) => l.code === target)?.english ?? target;
      const batches = chunked(payload, CHUNK);
      for (let b = 0; b < batches.length; b++) {
        setPhase(`Translating to ${lang} (chunk ${b + 1} / ${batches.length})…`);
        const tr = await translateBatch(batches[b], lang);
        for (let i = 0; i < tr.length; i++) translated[indexes[b * CHUNK + i]] = tr[i];
        setProgress(Math.round(((b + 1) / batches.length) * 100));
      }

      // Splice translations back into each part.
      setPhase("Rebuilding .docx…");
      let cursor = 0;
      for (const s of slices) {
        const slice = translated.slice(cursor, cursor + s.items.length);
        cursor += s.items.length;
        zip.file(s.path, s.rebuild(slice));
      }
      const out = await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      const url = URL.createObjectURL(out);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(url); setOutSize(out.size);
      setOutName(file.name.replace(/\.docx$/i, "") + `.${target.toLowerCase()}.docx`);
      setPhase("Done"); setProgress(100);
    } catch (e) {
      const q = (e as { quota?: QuotaReason }).quota;
      if (q) setQuotaReason(q);
      else setError(e instanceof Error ? e.message : "Translation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-brand-50/30 px-6 py-12 text-center transition-colors hover:border-brand-300">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Upload className="h-5 w-5" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">Upload your Word document</span>
          <span className="mt-0.5 text-xs text-ink-400">.docx — fonts, headings, tables and images stay intact</span>
          <input type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setOutUrl(null); setError(null); setProgress(0); setPhase(""); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); setError(null); setProgress(0); setPhase(""); }}
            className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Translate into
          <select value={target} onChange={(e) => setTarget(e.target.value as LanguageCode)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100">
            {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native} ({l.code})</option>)}
          </select>
        </label>
        <Button onClick={run} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
          {busy ? "Translating…" : "Translate document"}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {busy && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <p className="text-sm text-ink-700">{phase}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        Translates every paragraph, heading, table cell, header and footer while preserving fonts, sizes, colours, lists and images. Long documents are translated in chunks of {CHUNK} runs each — large files may need a few AI calls (Pro 500/mo, Business 3,000/mo).
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
