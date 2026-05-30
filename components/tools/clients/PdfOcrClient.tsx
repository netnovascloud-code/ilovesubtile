"use client";

import { useState } from "react";
import { FileText, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";

type PdfViewport = { width: number; height: number };
type PdfPage = {
  getViewport: (o: { scale: number }) => PdfViewport;
  render: (o: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }) => { promise: Promise<void> };
};
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfDoc> };
};
type TesseractWorker = {
  recognize: (img: Blob | string, opts?: object, conf?: object) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
};
type TesseractModule = {
  createWorker: (
    lang: string,
    oem?: number,
    options?: { logger?: (m: { status: string; progress: number }) => void },
  ) => Promise<TesseractWorker>;
};

const PDFJS_URL = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
const TESSERACT_URL = "https://esm.sh/tesseract.js@5";

let pdfjsCache: PdfJs | null = null;
async function loadPdfjs(): Promise<PdfJs> {
  if (pdfjsCache) return pdfjsCache;
  const lib = (await import(/* webpackIgnore: true */ PDFJS_URL)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  pdfjsCache = lib;
  return lib;
}

const LANGS: { code: string; label: string }[] = [
  { code: "eng", label: "English" }, { code: "fra", label: "Français" },
  { code: "spa", label: "Español" }, { code: "deu", label: "Deutsch" },
  { code: "ita", label: "Italiano" }, { code: "por", label: "Português" },
  { code: "nld", label: "Nederlands" }, { code: "rus", label: "Русский" },
  { code: "ara", label: "العربية" }, { code: "jpn", label: "日本語" },
  { code: "chi_sim", label: "中文 (简体)" }, { code: "kor", label: "한국어" },
];

export function PdfOcrClient() {
  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState("eng");
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "done" | "error">("idle");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");

  async function run() {
    if (!file) return;
    setError(null); setText(""); setPhase("loading"); setStatus("Loading engines…"); setProgress(0);
    try {
      const [pdfjs, tessMod] = await Promise.all([
        loadPdfjs(),
        import(/* webpackIgnore: true */ TESSERACT_URL) as Promise<TesseractModule>,
      ]);
      const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;

      setPhase("running"); setStatus(`Initializing OCR (${LANGS.find((l) => l.code === lang)?.label})…`);
      // Reuse the same worker across all pages — significantly faster than
      // spinning up a new worker for each page.
      const worker = await tessMod.createWorker(lang, 1);

      // Render each page at 2× for crisp glyphs, OCR the resulting PNG, then
      // join with form-feed separators so paginated downstream tools can
      // re-split if they want to.
      const chunks: string[] = [];
      for (let n = 1; n <= doc.numPages; n++) {
        setStatus(`OCR page ${n}/${doc.numPages}…`);
        setProgress(Math.round((n - 1) / doc.numPages * 100));
        const page = await doc.getPage(n);
        const vp = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
        // toBlob avoids the multi-MB string allocation that toDataURL forces
        // for every page — critical on large scans (50+ pages on mobile would
        // OOM the tab). Tesseract accepts Blob directly.
        const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
        const { data } = await worker.recognize(blob);
        chunks.push(data.text.trim());
      }
      await worker.terminate();
      setText(chunks.join("\n\n\f\n\n"));
      setProgress(100); setPhase("done"); setStatus("");
    } catch (e) {
      setError(`OCR failed: ${(e as Error).message}`);
      setPhase("error");
    }
  }

  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(file?.name ?? "ocr").replace(/\.pdf$/i, "")}.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  const busy = phase === "loading" || phase === "running";

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Scanned PDF"
        accept={{ "application/pdf": [".pdf"] }}
        icon={<FileText className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setText(""); setPhase("idle"); }}
        current={file}
      />

      {file && (
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Document language
            <select value={lang} onChange={(e) => setLang(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
          <Button onClick={run} disabled={busy} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {busy ? status || "Working…" : "Run OCR"}
          </Button>
        </div>
      )}

      {busy && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {text && !busy && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">Recognized text · {text.length.toLocaleString()} chars</span>
            <Button onClick={download} variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" /> Download .txt
            </Button>
          </div>
          <textarea
            value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}
            className="h-80 w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      )}

      <p className="text-xs text-ink-400">
        Pages are rasterised in your browser with pdf.js and read with Tesseract.js — your PDF is never uploaded. Pages are processed sequentially; large scanned docs can take a minute or two.
      </p>
    </div>
  );
}
