"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

const MIMES: { id: string; label: string }[] = [
  { id: "image/png", label: "PNG" },
  { id: "image/jpeg", label: "JPEG" },
  { id: "image/gif", label: "GIF" },
  { id: "image/webp", label: "WebP" },
  { id: "image/svg+xml", label: "SVG" },
];

const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp", "image/svg+xml": "svg",
};

export function ImageToBase64Client() {
  // ─── Encode mode ────────────────────────────────────────────────────────
  const [file, setFile] = useState<File | null>(null);
  const [b64, setB64] = useState<string>("");
  const [withPrefix, setWithPrefix] = useState(true);
  const [copied, setCopied] = useState(false);
  // ─── Decode mode ────────────────────────────────────────────────────────
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeMime, setDecodeMime] = useState("image/png");
  const [decodeUrl, setDecodeUrl] = useState<string | null>(null);
  const [decodeName, setDecodeName] = useState("decoded.png");
  const decodeRef = useRef<string | null>(null);

  useEffect(() => () => { if (decodeRef.current) URL.revokeObjectURL(decodeRef.current); }, []);

  async function pick(f: File | null) {
    if (!f) return;
    setFile(f);
    const buf = new Uint8Array(await f.arrayBuffer());
    // Streaming-safe base64 of a Uint8Array (chunked to avoid argument size limits).
    let out = "";
    const chunk = 0x8000;
    for (let i = 0; i < buf.length; i += chunk) {
      out += String.fromCharCode.apply(null, buf.subarray(i, i + chunk) as unknown as number[]);
    }
    setB64(btoa(out));
  }

  const output = b64 ? (withPrefix ? `data:${file?.type || "image/png"};base64,${b64}` : b64) : "";

  async function copyEnc() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  function decode() {
    setDecodeUrl(null);
    if (decodeRef.current) { URL.revokeObjectURL(decodeRef.current); decodeRef.current = null; }
    const raw = decodeInput.trim();
    if (!raw) return;
    const m = raw.match(/^data:(image\/[a-z0-9+\-.]+);base64,(.+)$/i);
    const data = m ? m[2] : raw.replace(/\s+/g, "");
    const mime = m ? m[1] : decodeMime;
    setDecodeName(`decoded.${EXT_BY_MIME[mime.toLowerCase()] ?? "bin"}`);
    try {
      const bin = atob(data);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const url = URL.createObjectURL(new Blob([arr as BlobPart], { type: mime }));
      decodeRef.current = url;
      setDecodeUrl(url);
    } catch {
      setDecodeUrl(null);
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-base font-semibold text-ink-900">Image → Base64</h2>
        {!file ? (
          <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
            <Upload className="h-6 w-6 text-teal-600" />
            <span className="mt-2 font-medium text-ink-900">Upload an image</span>
            <span className="mt-0.5 text-xs text-ink-400">JPG, PNG, GIF, WebP, SVG — encoded in your browser</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
          </label>
        ) : (
          <div className="mt-3 flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
            <div className="min-w-0 truncate">
              <span className="font-medium text-ink-900">{file.name}</span>
              <span className="ml-2 text-ink-400">{formatBytes(file.size)} · {file.type}</span>
            </div>
            <button onClick={() => { setFile(null); setB64(""); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
          </div>
        )}

        {b64 && (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input type="checkbox" checked={withPrefix} onChange={(e) => setWithPrefix(e.target.checked)} className="h-4 w-4" />
                Include <code className="rounded bg-ink-100 px-1 text-xs">data:</code> URI prefix
              </label>
              <span className="text-xs text-ink-400">{output.length.toLocaleString()} chars</span>
              <Button size="sm" variant="outline" onClick={copyEnc}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <textarea readOnly value={output}
              className="mt-3 h-48 w-full resize-y rounded-lg border border-ink-100 bg-ink-900 p-3 font-mono text-xs text-ink-50" />
          </>
        )}
      </section>

      <section>
        <h2 className="text-base font-semibold text-ink-900">Base64 → Image</h2>
        <textarea value={decodeInput} onChange={(e) => setDecodeInput(e.target.value)}
          placeholder="Paste a base64 string (with or without the data: URI prefix)…"
          className="mt-3 h-32 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-xs text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-ink-700">
            Default MIME (when no <code className="rounded bg-ink-100 px-1 text-xs">data:</code> prefix)
            <select value={decodeMime} onChange={(e) => setDecodeMime(e.target.value)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
              {MIMES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </label>
          <Button size="sm" onClick={decode} disabled={!decodeInput.trim()}>Decode</Button>
        </div>
        {decodeUrl && (
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-ink-100 bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={decodeUrl} alt="Decoded" className="max-h-56 max-w-full rounded" />
            <a href={decodeUrl} download={decodeName}>
              <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Download</Button>
            </a>
          </div>
        )}
      </section>

      <p className="text-xs text-ink-400">100% in your browser — your image and base64 string never leave your device.</p>
    </div>
  );
}
