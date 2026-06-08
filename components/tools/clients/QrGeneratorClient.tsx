"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SIZES = [256, 512, 1024] as const;
const LEVELS = [
  { id: "L", label: "Low (≈7%)" },
  { id: "M", label: "Medium (≈15%)" },
  { id: "Q", label: "Quartile (≈25%)" },
  { id: "H", label: "High (≈30%)" },
] as const;

export function QrGeneratorClient() {
  const [text, setText] = useState("https://konvertools.com");
  const [size, setSize] = useState<number>(512);
  const [level, setLevel] = useState<string>("M");
  const [fg, setFg] = useState("#0B0F19");
  const [bg, setBg] = useState("#FFFFFF");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!text.trim()) { setDataUrl(""); return; }
      try {
        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(text, { width: size, errorCorrectionLevel: level as "L" | "M" | "Q" | "H", margin: 2, color: { dark: fg, light: bg } });
        if (alive) { setDataUrl(url); setError(null); }
      } catch (e) {
        if (alive) { setError(`Could not encode: ${(e as Error).message}`); setDataUrl(""); }
      }
    })();
    return () => { alive = false; };
  }, [text, size, level, fg, bg]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto]">
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="URL, text, Wi-Fi credentials…"
            className="h-32 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", size === s ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{s}px</button>
            ))}
          </div>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm">
            {LEVELS.map((l) => <option key={l.id} value={l.id}>Error correction: {l.label}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm text-ink-600">FG <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-ink-200" /></label>
          <label className="flex items-center gap-2 text-sm text-ink-600">BG <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-ink-200" /></label>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <p className="text-xs text-ink-400">Generated in your browser — nothing is uploaded.</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl border border-ink-200 bg-white p-4 shadow-card">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dataUrl} alt="QR code" className="h-56 w-56" />
          ) : (
            <div className="grid h-56 w-56 place-items-center text-sm text-ink-300">Type something…</div>
          )}
        </div>
        {dataUrl && (
          <a href={dataUrl} download="qr.png">
            <Button><Download className="h-4 w-4" /> Download PNG</Button>
          </a>
        )}
      </div>
    </div>
  );
}
