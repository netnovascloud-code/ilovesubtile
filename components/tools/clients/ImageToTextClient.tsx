"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Copy, Check, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";

// Tesseract.js types are intentionally minimal — we only consume what we use
// and load the library dynamically from a CDN (no npm dep, no Webpack bundling).
type TesseractWorker = {
  recognize: (img: Blob, opts?: object, conf?: object) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
};
type TesseractModule = {
  createWorker: (
    lang: string,
    oem?: number,
    options?: { logger?: (m: { status: string; progress: number }) => void },
  ) => Promise<TesseractWorker>;
};

const TESSERACT_URL = "https://esm.sh/tesseract.js@5";

// Tesseract uses 3-letter codes; we only expose the most-searched langs to
// keep the UI calm. The library lazy-loads the .traineddata for each picked
// language on first run (~10 MB cached afterwards in IndexedDB).
const LANGS: { code: string; label: string }[] = [
  { code: "eng", label: "English" },
  { code: "fra", label: "Français" },
  { code: "spa", label: "Español" },
  { code: "deu", label: "Deutsch" },
  { code: "ita", label: "Italiano" },
  { code: "por", label: "Português" },
  { code: "nld", label: "Nederlands" },
  { code: "rus", label: "Русский" },
  { code: "ara", label: "العربية" },
  { code: "jpn", label: "日本語" },
  { code: "chi_sim", label: "中文 (简体)" },
  { code: "kor", label: "한국어" },
];

export function ImageToTextClient() {
  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState("eng");
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const previewUrl = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    const u = URL.createObjectURL(file);
    previewUrl.current = u; setPreview(u);
    return () => { if (previewUrl.current) URL.revokeObjectURL(previewUrl.current); };
  }, [file]);

  async function run() {
    if (!file) return;
    setError(null); setText(""); setPhase("loading"); setProgress(0);
    try {
      const mod = (await import(/* webpackIgnore: true */ TESSERACT_URL)) as unknown as TesseractModule;
      setPhase("running");
      const worker = await mod.createWorker(lang, 1, {
        logger: (m) => {
          // Tesseract reports several phases; we surface the recognition one
          // since it's the only one with meaningful progress for the user.
          if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100));
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      setText(data.text.trim());
      setPhase("done"); setProgress(100);
    } catch (e) {
      setPhase("error");
      setError(`OCR failed: ${(e as Error).message}`);
    }
  }

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(file?.name ?? "ocr").replace(/\.[^.]+$/, "")}.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Image"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"], "image/bmp": [".bmp"], "image/tiff": [".tif", ".tiff"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setText(""); setPhase("idle"); }}
        current={file}
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Source preview" className="mx-auto max-h-64 rounded-lg border border-ink-100" />
      )}

      {file && (
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Language
            <select value={lang} onChange={(e) => setLang(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
          <Button onClick={run} disabled={phase === "loading" || phase === "running"} size="lg">
            {phase === "loading" || phase === "running" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {phase === "loading" ? "Loading engine…" : phase === "running" ? `Reading… ${progress}%` : "Extract text"}
          </Button>
        </div>
      )}

      {(phase === "loading" || phase === "running") && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {text && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">Extracted text · {text.length.toLocaleString()} chars</span>
            <div className="flex gap-2">
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />} Copy
              </button>
              <button onClick={download} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                <Download className="h-3 w-3" /> .txt
              </button>
            </div>
          </div>
          <textarea
            value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}
            className="h-72 w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      )}

      <p className="text-xs text-ink-400">
        Powered by Tesseract.js — the OCR engine and language data run entirely in your browser, your image is never uploaded. First run downloads ~10 MB of language data; cached afterwards.
      </p>
    </div>
  );
}
