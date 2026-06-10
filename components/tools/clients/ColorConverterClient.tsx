"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0")).join("").toUpperCase();
}
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rp = r / 255, gp = g / 255, bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rp - k) / (1 - k)) * 100),
    m: Math.round(((1 - gp - k) / (1 - k)) * 100),
    y: Math.round(((1 - bp - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

const T: Record<string, Record<string, string>> = {
  en: {
    privacy: "100% in your browser — nothing is uploaded. Free and unlimited.",
  },
  fr: {
    privacy: "100 % dans votre navigateur — rien n'est envoyé. Gratuit et illimité.",
  },
  es: {
    privacy: "100 % en tu navegador — nada se sube. Gratis e ilimitado.",
  },
  pt: {
    privacy: "100% no seu navegador — nada é enviado. Gratuito e ilimitado.",
  },
  de: {
    privacy: "100 % im Browser — nichts wird hochgeladen. Kostenlos und unbegrenzt.",
  },
  it: {
    privacy: "100% nel tuo browser — nulla viene caricato. Gratuito e illimitato.",
  },
  nl: {
    privacy: "100% in uw browser — er wordt niets geüpload. Gratis en onbeperkt.",
  },
  ja: {
    privacy: "ブラウザ内で 100% 処理 — 何もアップロードされません。無料・無制限。",
  },
  zh: {
    privacy: "在您的浏览器中 100% 处理 — 不上传任何内容。免费且无限制。",
  },
  ko: {
    privacy: "브라우저에서 100% 처리 — 아무것도 업로드되지 않습니다. 무료 및 무제한.",
  },
  ar: {
    privacy: "100٪ في متصفحك — لا يُرفع شيء. مجاني وغير محدود.",
  },
  ru: {
    privacy: "100% в вашем браузере — ничего не загружается. Бесплатно и без ограничений.",
  },
  hi: {
    privacy: "आपके ब्राउज़र में 100% — कुछ भी अपलोड नहीं होता। मुफ़्त और असीमित।",
  },
  tr: {
    privacy: "Tarayıcınızda %100 işlem — hiçbir şey yüklenmez. Ücretsiz ve sınırsız.",
  },
  id: {
    privacy: "100% di browser Anda — tidak ada yang diunggah. Gratis dan tak terbatas.",
  },
  vi: {
    privacy: "100% trong trình duyệt của bạn — không có gì được tải lên. Miễn phí và không giới hạn.",
  },
  sv: {
    privacy: "100 % i din webbläsare — inget laddas upp. Gratis och obegränsat.",
  },
  pl: {
    privacy: "100% w Twojej przeglądarce — nic nie jest wysyłane. Bezpłatnie i bez ograniczeń.",
  },
  uk: {
    privacy: "100% у вашому браузері — нічого не завантажується. Безкоштовно та без обмежень.",
  },
  cs: {
    privacy: "100 % ve vašem prohlížeči — nic se nenačítá. Zdarma a bez omezení.",
  },
};

function Row({ label, value, onCopy, copied }: { label: string; value: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</span>
      <code className="flex-1 rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900">{value}</code>
      <button onClick={onCopy} className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-2 text-xs text-ink-600 hover:text-ink-900">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function ColorConverterClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [hex, setHex] = useState("#2D6BE4");
  const [copied, setCopied] = useState<string | null>(null);

  const rgb = useMemo(() => hexToRgb(hex) ?? { r: 0, g: 0, b: 0 }, [hex]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb.r, rgb.g, rgb.b), [rgb]);
  const valid = hexToRgb(hex) !== null;

  const hexStr = valid ? rgbToHex(rgb.r, rgb.g, rgb.b) : hex;
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykStr = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  function copy(key: string, value: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-44 w-44 rounded-2xl border border-ink-200 shadow-card" style={{ backgroundColor: valid ? hexStr : "#fff" }} />
        <input
          type="color"
          value={valid ? hexStr : "#000000"}
          onChange={(e) => setHex(e.target.value.toUpperCase())}
          className="h-10 w-44 cursor-pointer rounded-md border border-ink-200"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-14 text-xs font-semibold uppercase tracking-wide text-ink-500">HEX</span>
          <input
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className={cn("flex-1 rounded-md border bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-100", valid ? "border-ink-200 focus:border-brand-400" : "border-red-300")}
          />
          <button onClick={() => copy("hex", hexStr)} className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-2 text-xs text-ink-600 hover:text-ink-900">
            {copied === "hex" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <Row label="RGB" value={rgbStr} onCopy={() => copy("rgb", rgbStr)} copied={copied === "rgb"} />
        <Row label="HSL" value={hslStr} onCopy={() => copy("hsl", hslStr)} copied={copied === "hsl"} />
        <Row label="CMYK" value={cmykStr} onCopy={() => copy("cmyk", cmykStr)} copied={copied === "cmyk"} />
        <p className="pt-2 text-xs text-ink-400">{s.privacy}</p>
      </div>
    </div>
  );
}
