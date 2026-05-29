"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

function hexToHsl(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  const r = ((int >> 16) & 255) / 255, g = ((int >> 8) & 255) / 255, b = (int & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360; s = Math.max(0, Math.min(100, s)) / 100; l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x]; else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  const to = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

type Scheme = { title: string; colors: string[] };

function Swatch({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      className="group flex-1 overflow-hidden rounded-lg border border-ink-100 text-left"
      title="Copy HEX"
    >
      <div className="h-16 w-full" style={{ background: hex }} />
      <div className="flex items-center justify-between gap-1 px-2 py-1.5 text-xs font-mono text-ink-700">
        {hex.toUpperCase()}
        {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3 text-ink-300 group-hover:text-ink-600" />}
      </div>
    </button>
  );
}

export function ColorPaletteClient() {
  const [base, setBase] = useState("#4f46e5");

  const schemes = useMemo<Scheme[] | null>(() => {
    const hsl = hexToHsl(base);
    if (!hsl) return null;
    const [h, s, l] = hsl;
    return [
      { title: "Complementary", colors: [hslToHex(h, s, l), hslToHex(h + 180, s, l)] },
      { title: "Analogous", colors: [hslToHex(h - 30, s, l), hslToHex(h, s, l), hslToHex(h + 30, s, l)] },
      { title: "Triadic", colors: [hslToHex(h, s, l), hslToHex(h + 120, s, l), hslToHex(h + 240, s, l)] },
      { title: "Tetradic", colors: [hslToHex(h, s, l), hslToHex(h + 90, s, l), hslToHex(h + 180, s, l), hslToHex(h + 270, s, l)] },
      { title: "Shades & tints", colors: [90, 70, 55, 40, 25].map((ll) => hslToHex(h, s, ll)) },
    ];
  }, [base]);

  const valid = schemes !== null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Base colour
          <input type="color" value={valid ? base : "#4f46e5"} onChange={(e) => setBase(e.target.value)}
            className="mt-1 h-10 w-16 cursor-pointer rounded-md border border-ink-200 bg-white p-1" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          HEX
          <input value={base} onChange={(e) => setBase(e.target.value)}
            className={`mt-1 w-32 rounded-md border bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-100 ${valid ? "border-ink-200 focus:border-brand-400" : "border-red-300"}`} />
        </label>
      </div>

      {!valid && <p className="text-sm text-amber-700">Enter a 6-digit HEX colour, e.g. #4F46E5.</p>}

      {valid && schemes.map((sc) => (
        <div key={sc.title}>
          <h3 className="mb-2 text-sm font-semibold text-ink-800">{sc.title}</h3>
          <div className="flex gap-2">
            {sc.colors.map((c, i) => <Swatch key={`${sc.title}-${i}`} hex={c} />)}
          </div>
        </div>
      ))}

      <p className="text-xs text-ink-400">Click any swatch to copy its HEX. Generated in your browser.</p>
    </div>
  );
}
