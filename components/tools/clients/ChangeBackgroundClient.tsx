"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { MiniDrop } from "@/components/tools/MiniDrop";

// We reuse the @imgly/background-removal lib that already powers
// /remove-background. The CDN URL keeps onnxruntime-web out of the Next bundle.
type BgModule = { removeBackground: (input: Blob | string) => Promise<Blob> };
let bgCache: BgModule | null = null;
async function loadBg(): Promise<BgModule> {
  if (bgCache) return bgCache;
  const url = "https://esm.sh/@imgly/background-removal@1.5.6?bundle";
  bgCache = (await import(/* webpackIgnore: true */ url)) as BgModule;
  return bgCache;
}

type BgMode = "color" | "gradient" | "image";

const GRADIENTS: { id: string; label: string; from: string; to: string }[] = [
  { id: "sunset", label: "Sunset", from: "#ff7e5f", to: "#feb47b" },
  { id: "ocean", label: "Ocean", from: "#2193b0", to: "#6dd5ed" },
  { id: "purple", label: "Purple", from: "#7f00ff", to: "#e100ff" },
  { id: "mint", label: "Mint", from: "#56ab2f", to: "#a8e063" },
  { id: "rose", label: "Rose", from: "#ff5f6d", to: "#ffc371" },
  { id: "ink", label: "Ink", from: "#232526", to: "#414345" },
];

export function ChangeBackgroundClient() {
  const [file, setFile] = useState<File | null>(null);
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [mode, setMode] = useState<BgMode>("color");
  const [color, setColor] = useState("#ffffff");
  const [gradient, setGradient] = useState(GRADIENTS[0]);
  const [cutoutBlob, setCutoutBlob] = useState<Blob | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [phase, setPhase] = useState<"idle" | "removing" | "compositing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string[]>([]);

  useEffect(() => () => { cleanup.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  async function ensureCutout(): Promise<Blob> {
    if (cutoutBlob) return cutoutBlob;
    setPhase("removing");
    const bg = await loadBg();
    const blob = await bg.removeBackground(file!);
    setCutoutBlob(blob);
    return blob;
  }

  async function buildBackground(width: number, height: number): Promise<HTMLCanvasElement> {
    const c = document.createElement("canvas");
    c.width = width; c.height = height;
    const ctx = c.getContext("2d")!;
    if (mode === "color") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    } else if (mode === "gradient") {
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, gradient.from); g.addColorStop(1, gradient.to);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    } else {
      if (!bgFile) throw new Error("Pick a background image, or switch to color/gradient.");
      const bmp = await createImageBitmap(bgFile);
      // Cover the canvas while preserving the bg image's aspect ratio.
      const r = Math.max(width / bmp.width, height / bmp.height);
      const w = bmp.width * r, h = bmp.height * r;
      ctx.drawImage(bmp, (width - w) / 2, (height - h) / 2, w, h);
      bmp.close?.();
    }
    return c;
  }

  async function run() {
    if (!file) return;
    setError(null); setOutUrl(null); setPhase("removing");
    try {
      const cutout = await ensureCutout();
      setPhase("compositing");
      const subjBmp = await createImageBitmap(cutout);
      const bgCanvas = await buildBackground(subjBmp.width, subjBmp.height);
      const ctx = bgCanvas.getContext("2d")!;
      ctx.drawImage(subjBmp, 0, 0);
      subjBmp.close?.();
      const blob: Blob = await new Promise((res) => bgCanvas.toBlob((b) => res(b!), "image/png"));
      cleanup.current.forEach((u) => URL.revokeObjectURL(u));
      const url = URL.createObjectURL(blob);
      cleanup.current = [url];
      setOutUrl(url); setOutSize(blob.size); setPhase("done");
    } catch (e) {
      setError(`Could not change the background: ${(e as Error).message}`);
      setPhase("error");
    }
  }

  const busy = phase === "removing" || phase === "compositing";

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Subject image"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setCutoutBlob(null); setOutUrl(null); }}
        current={file}
      />

      {file && (
        <>
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {(["color", "gradient", "image"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${mode === m ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                {m}
              </button>
            ))}
          </div>

          {mode === "color" && (
            <label className="flex items-center gap-3 text-xs font-medium text-ink-600">
              Background colour
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-ink-200 bg-white p-1" />
              <span className="font-mono text-ink-700">{color.toUpperCase()}</span>
            </label>
          )}

          {mode === "gradient" && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {GRADIENTS.map((g) => (
                <button key={g.id} onClick={() => setGradient(g)}
                  className={`h-14 rounded-lg border text-xs font-medium text-white shadow-sm ${gradient.id === g.id ? "ring-2 ring-brand-500" : "border-ink-200"}`}
                  style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}>
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {mode === "image" && (
            <MiniDrop
              label="Background image"
              accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
              icon={<ImageIcon className="h-5 w-5" />}
              onFile={setBgFile}
              current={bgFile}
            />
          )}

          <Button onClick={run} disabled={busy} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
            {phase === "removing" ? "Removing the original background…" :
             phase === "compositing" ? "Building the new background…" :
             cutoutBlob ? "Re-apply background" : "Change background"}
          </Button>
        </>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {outUrl && !busy && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Result" className="mx-auto max-h-96 rounded-lg border border-ink-100" />
          <a href={outUrl} download={`${(file?.name ?? "image").replace(/\.[^.]+$/, "")}-newbg.png`}>
            <Button size="lg"><Download className="h-4 w-4" /> Download · {formatBytes(outSize)}</Button>
          </a>
        </div>
      )}

      <p className="text-xs text-ink-400">
        Background removed locally with an on-device model — your image is never uploaded. First run downloads ~70 MB of weights; cached afterwards.
      </p>
    </div>
  );
}
