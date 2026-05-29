"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type JsBarcodeOpts = { format: string; width?: number; height?: number; displayValue?: boolean; margin?: number; background?: string; lineColor?: string };
type JsBarcodeFn = (target: HTMLElement | SVGElement | string, value: string, options?: JsBarcodeOpts) => void;

async function loadJsBarcode(): Promise<JsBarcodeFn> {
  const url = "https://esm.sh/jsbarcode@3.11.6";
  const mod = (await import(/* webpackIgnore: true */ url)) as { default: JsBarcodeFn } | JsBarcodeFn;
  return typeof mod === "function" ? mod : (mod as { default: JsBarcodeFn }).default;
}

const FORMATS = [
  { id: "CODE128", label: "Code 128 (general purpose)" },
  { id: "CODE39", label: "Code 39" },
  { id: "EAN13", label: "EAN-13 (retail)" },
  { id: "EAN8", label: "EAN-8" },
  { id: "UPC", label: "UPC-A" },
  { id: "ITF14", label: "ITF-14" },
  { id: "MSI", label: "MSI" },
  { id: "pharmacode", label: "Pharmacode" },
];

const SAMPLES: Record<string, string> = {
  CODE128: "KONVER-12345",
  CODE39: "KONVER 39",
  EAN13: "5901234123457",
  EAN8: "96385074",
  UPC: "123456789012",
  ITF14: "10012345678902",
  MSI: "1234567",
  pharmacode: "1234",
};

export function BarcodeGeneratorClient() {
  const [format, setFormat] = useState("CODE128");
  const [value, setValue] = useState(SAMPLES.CODE128);
  const [displayValue, setDisplayValue] = useState(true);
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(80);
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    if (!svgRef.current) return;
    loadJsBarcode().then((JsBarcode) => {
      if (cancelled || !svgRef.current) return;
      try {
        // Clear before redraw to avoid stale appended children.
        while (svgRef.current.firstChild) svgRef.current.removeChild(svgRef.current.firstChild);
        JsBarcode(svgRef.current, value, { format, displayValue, width, height, margin: 10, background: "#ffffff", lineColor: "#0f172a" });
      } catch (e) {
        setError((e as Error).message);
      }
    }).catch((e) => { if (!cancelled) setError(`Could not load JsBarcode: ${(e as Error).message}`); });
    return () => { cancelled = true; };
  }, [format, value, displayValue, width, height]);

  function downloadSvg() {
    if (!svgRef.current) return;
    const xml = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob(['<?xml version="1.0"?>\n' + xml], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `barcode-${format}.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  async function downloadPng() {
    if (!svgRef.current) return;
    const xml = new XMLSerializer().serializeToString(svgRef.current);
    const url = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
    const img = new Image();
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => rej(new Error("load")); img.src = url; });
    const c = document.createElement("canvas");
    c.width = img.width || 400; c.height = img.height || 120;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0);
    c.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `barcode-${format}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Format
          <select value={format} onChange={(e) => { setFormat(e.target.value); setValue(SAMPLES[e.target.value] ?? value); }} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
            {FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Value
          <input value={value} onChange={(e) => setValue(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-ink-600">
          <input type="checkbox" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} className="h-4 w-4" /> Show value under the barcode
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Bar width: {width}
          <input type="range" min={1} max={6} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-1" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600 sm:col-span-2">
          Height: {height}px
          <input type="range" min={40} max={200} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-1" />
        </label>
      </div>

      <div className="grid place-items-center rounded-lg border border-ink-100 bg-white p-6">
        <svg ref={svgRef} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={downloadPng}><Download className="h-3.5 w-3.5" /> Download PNG</Button>
        <Button variant="outline" onClick={downloadSvg}><Download className="h-3.5 w-3.5" /> Download SVG</Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via JsBarcode — your data never leaves your device.</p>
    </div>
  );
}
