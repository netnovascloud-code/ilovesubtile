"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

// HTML → PNG/JPG via the SVG <foreignObject> trick — no dependency. The
// HTML is wrapped in an SVG, loaded as a data URL into an <img>, then
// drawn to a canvas. External resources (https images) are kept, but
// they must be CORS-friendly for the canvas to stay un-tainted.
const SAMPLE = `<div style="
  font-family: -apple-system, Segoe UI, Roboto, sans-serif;
  background: linear-gradient(135deg, #2D6BE4, #1F54C2);
  color: white;
  padding: 60px;
  border-radius: 24px;
  width: 800px;
  box-sizing: border-box;
">
  <h1 style="font-size: 56px; margin: 0;">Hello, Konvertools 👋</h1>
  <p style="font-size: 22px; opacity: 0.9; margin-top: 16px;">
    Paste any HTML on the left to render it as an image — perfect for social cards,
    quick mockups or styled snippets.
  </p>
</div>`;

export function HtmlToImageClient() {
  const [html, setHtml] = useState(SAMPLE);
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(560);
  const [format, setFormat] = useState<"png" | "jpg">("png");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);

  const run = useCallback(async () => {
    setBusy(true); setError(null);
    let host: HTMLDivElement | null = null;
    try {
      // Render the HTML in a real off-screen DOM node and rasterise it with
      // html2canvas. The previous SVG <foreignObject> → <img> → canvas trick
      // TAINTS the canvas in Chrome ("Tainted canvases may not be exported"),
      // so toBlob always failed. html2canvas walks the DOM and draws primitives,
      // so the resulting canvas stays exportable.
      host = document.createElement("div");
      host.style.cssText = `position:fixed;left:-99999px;top:0;width:${width}px;height:${height}px;overflow:hidden;`;
      host.innerHTML = html;
      document.body.appendChild(host);

      const html2canvas = (await import(/* webpackIgnore: true */ "https://esm.sh/html2canvas@1.4.1")).default as (el: HTMLElement, opts?: Record<string, unknown>) => Promise<HTMLCanvasElement>;
      const canvas = await html2canvas(host, {
        width, height, scale: 1, useCORS: true, logging: false,
        backgroundColor: format === "jpg" ? "#ffffff" : null,
      });
      const mime = format === "png" ? "image/png" : "image/jpeg";
      const outBlob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Encoding failed."))), mime, 0.94));
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(outBlob), size: outBlob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not render HTML.");
    } finally {
      if (host) host.remove();
      setBusy(false);
    }
  }, [html, width, height, format, out]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          HTML
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} rows={14}
            className="mt-1 rounded-md border border-ink-200 bg-white p-3 font-mono text-xs text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col text-xs font-medium text-ink-600">
              Width (px)
              <input type="number" min={100} max={4000} value={width} onChange={(e) => setWidth(Number(e.target.value) || 900)}
                className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900" />
            </label>
            <label className="flex flex-col text-xs font-medium text-ink-600">
              Height (px)
              <input type="number" min={100} max={4000} value={height} onChange={(e) => setHeight(Number(e.target.value) || 560)}
                className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900" />
            </label>
            <label className="flex flex-col text-xs font-medium text-ink-600">
              Format
              <select value={format} onChange={(e) => setFormat(e.target.value as "png" | "jpg")}
                className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </label>
          </div>
          {out && <img src={out.url} alt="preview" className="max-h-[360px] w-full rounded border border-ink-200 object-contain" />}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Rendering…</> : "Render image"}
        </Button>
        {out && (
          <a href={out.url} download={`html-${Date.now()}.${format}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>

      <p className="text-xs text-ink-400">
        Rendered in your browser with html2canvas — inline styles work best, and any
        external images must be CORS-accessible to appear.
      </p>
    </div>
  );
}
