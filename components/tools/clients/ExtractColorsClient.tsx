"use client";

import { useState } from "react";
import { Upload, X, Copy, Check } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Swatch = { hex: string; rgb: string; hsl: string; count: number };

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload an image",
    uploadHint: "We extract the 5 dominant colours — entirely in your browser",
    sourceAlt: "Source",
    privacy: "100% in your browser via Canvas — your image is never uploaded.",
    couldNotRead: "Could not read the image",
  },
  fr: {
    uploadLabel: "Télécharger une image",
    uploadHint: "Nous extrayons les 5 couleurs dominantes — entièrement dans votre navigateur",
    sourceAlt: "Source",
    privacy: "100% dans votre navigateur via Canvas — votre image n'est jamais envoyée.",
    couldNotRead: "Impossible de lire l'image",
  },
  es: {
    uploadLabel: "Subir una imagen",
    uploadHint: "Extraemos los 5 colores dominantes — completamente en tu navegador",
    sourceAlt: "Fuente",
    privacy: "100% en tu navegador vía Canvas — tu imagen nunca se sube.",
    couldNotRead: "No se pudo leer la imagen",
  },
  pt: {
    uploadLabel: "Carregar uma imagem",
    uploadHint: "Extraímos as 5 cores dominantes — inteiramente no seu navegador",
    sourceAlt: "Fonte",
    privacy: "100% no seu navegador via Canvas — a sua imagem nunca é enviada.",
    couldNotRead: "Não foi possível ler a imagem",
  },
  de: {
    uploadLabel: "Bild hochladen",
    uploadHint: "Wir extrahieren die 5 dominanten Farben — vollständig in Ihrem Browser",
    sourceAlt: "Quelle",
    privacy: "100% im Browser über Canvas — Ihr Bild wird nie hochgeladen.",
    couldNotRead: "Bild konnte nicht gelesen werden",
  },
  it: {
    uploadLabel: "Carica un'immagine",
    uploadHint: "Estraiamo i 5 colori dominanti — interamente nel browser",
    sourceAlt: "Sorgente",
    privacy: "100% nel browser tramite Canvas — la tua immagine non viene mai caricata.",
    couldNotRead: "Impossibile leggere l'immagine",
  },
  nl: {
    uploadLabel: "Afbeelding uploaden",
    uploadHint: "Wij extraheren de 5 dominante kleuren — volledig in uw browser",
    sourceAlt: "Bron",
    privacy: "100% in uw browser via Canvas — uw afbeelding wordt nooit geüpload.",
    couldNotRead: "Kon de afbeelding niet lezen",
  },
  ja: {
    uploadLabel: "画像をアップロード",
    uploadHint: "主要な 5 色をブラウザ内で完全に抽出します",
    sourceAlt: "ソース",
    privacy: "ブラウザ内で Canvas を使用して処理—画像はアップロードされません。",
    couldNotRead: "画像を読み取れませんでした",
  },
  zh: {
    uploadLabel: "上传图片",
    uploadHint: "我们在您的浏览器中完全提取 5 种主要颜色",
    sourceAlt: "来源",
    privacy: "100% 在您的浏览器中通过 Canvas 处理—图片永远不会被上传。",
    couldNotRead: "无法读取图片",
  },
  ko: {
    uploadLabel: "이미지 업로드",
    uploadHint: "브라우저에서 완전히 5가지 주요 색상을 추출합니다",
    sourceAlt: "소스",
    privacy: "브라우저에서 Canvas로 100% 처리—이미지는 업로드되지 않습니다.",
    couldNotRead: "이미지를 읽을 수 없습니다",
  },
  ar: {
    uploadLabel: "تحميل صورة",
    uploadHint: "نستخرج 5 ألوان مهيمنة — بالكامل في متصفحك",
    sourceAlt: "المصدر",
    privacy: "100% في متصفحك عبر Canvas — لا تُرفَع صورتك أبداً.",
    couldNotRead: "تعذّر قراءة الصورة",
  },
  ru: {
    uploadLabel: "Загрузить изображение",
    uploadHint: "Мы извлекаем 5 доминирующих цветов — полностью в браузере",
    sourceAlt: "Источник",
    privacy: "100% в браузере через Canvas — ваше изображение никогда не загружается.",
    couldNotRead: "Не удалось прочитать изображение",
  },
  hi: {
    uploadLabel: "छवि अपलोड करें",
    uploadHint: "हम 5 मुख्य रंग पूरी तरह आपके ब्राउज़र में निकालते हैं",
    sourceAlt: "स्रोत",
    privacy: "आपके ब्राउज़र में Canvas के माध्यम से 100% — आपकी छवि कभी अपलोड नहीं होती।",
    couldNotRead: "छवि नहीं पढ़ी जा सकी",
  },
  tr: {
    uploadLabel: "Görsel yükle",
    uploadHint: "5 baskın rengi tamamen tarayıcınızda çıkarıyoruz",
    sourceAlt: "Kaynak",
    privacy: "Tarayıcınızda Canvas ile %100 — görseliniz hiçbir zaman yüklenmez.",
    couldNotRead: "Görsel okunamadı",
  },
  id: {
    uploadLabel: "Unggah gambar",
    uploadHint: "Kami mengekstrak 5 warna dominan — sepenuhnya di browser Anda",
    sourceAlt: "Sumber",
    privacy: "100% di browser Anda melalui Canvas — gambar Anda tidak pernah diunggah.",
    couldNotRead: "Tidak dapat membaca gambar",
  },
  vi: {
    uploadLabel: "Tải lên hình ảnh",
    uploadHint: "Chúng tôi trích xuất 5 màu chủ đạo — hoàn toàn trong trình duyệt của bạn",
    sourceAlt: "Nguồn",
    privacy: "100% trong trình duyệt của bạn qua Canvas — hình ảnh không bao giờ được tải lên.",
    couldNotRead: "Không thể đọc hình ảnh",
  },
  sv: {
    uploadLabel: "Ladda upp en bild",
    uploadHint: "Vi extraherar de 5 dominerande färgerna — helt i din webbläsare",
    sourceAlt: "Källa",
    privacy: "100% i din webbläsare via Canvas — din bild laddas aldrig upp.",
    couldNotRead: "Kunde inte läsa bilden",
  },
  pl: {
    uploadLabel: "Prześlij obraz",
    uploadHint: "Wyodrębniamy 5 dominujących kolorów — całkowicie w Twojej przeglądarce",
    sourceAlt: "Źródło",
    privacy: "100% w Twojej przeglądarce przez Canvas — Twój obraz nigdy nie jest przesyłany.",
    couldNotRead: "Nie można odczytać obrazu",
  },
  uk: {
    uploadLabel: "Завантажити зображення",
    uploadHint: "Ми витягуємо 5 домінуючих кольорів — повністю у браузері",
    sourceAlt: "Джерело",
    privacy: "100% у браузері через Canvas — зображення ніколи не завантажується.",
    couldNotRead: "Не вдалося прочитати зображення",
  },
  cs: {
    uploadLabel: "Nahrát obrázek",
    uploadHint: "Extrahujeme 5 dominantních barev — zcela ve vašem prohlížeči",
    sourceAlt: "Zdroj",
    privacy: "100% ve vašem prohlížeči přes Canvas — váš obrázek se nikdy nenačítá.",
    couldNotRead: "Obrázek nelze přečíst",
  },
};

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
const hex2 = (n: number) => n.toString(16).padStart(2, "0");

/** Frequency-quantised palette: bucket each pixel to a 32-level grid, count, take the top 5. */
function extractPalette(data: Uint8ClampedArray): Swatch[] {
  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();
  const step = 4 * 4; // sample every 4th pixel for speed
  for (let i = 0; i < data.length; i += step) {
    const a = data[i + 3];
    if (a < 128) continue; // skip transparent
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const key = `${r >> 5}-${g >> 5}-${b >> 5}`;
    const cur = buckets.get(key);
    if (cur) { cur.r += r; cur.g += g; cur.b += b; cur.count++; }
    else buckets.set(key, { r, g, b, count: 1 });
  }
  return [...buckets.values()]
    .sort((x, y) => y.count - x.count)
    .slice(0, 5)
    .map((c) => {
      const r = Math.round(c.r / c.count), g = Math.round(c.g / c.count), b = Math.round(c.b / c.count);
      return { hex: `#${hex2(r)}${hex2(g)}${hex2(b)}`, rgb: `rgb(${r}, ${g}, ${b})`, hsl: rgbToHsl(r, g, b), count: c.count };
    });
}

export function ExtractColorsClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<Swatch[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null); setPalette(null);
    setFile(f);
    if (srcUrl) URL.revokeObjectURL(srcUrl); setSrcUrl(URL.createObjectURL(f));
    try {
      const bmp = await createImageBitmap(f);
      const max = 160;
      const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bmp.width * scale));
      canvas.height = Math.max(1, Math.round(bmp.height * scale));
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      bmp.close();
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setPalette(extractPalette(data));
    } catch (e) {
      setError(`${s.couldNotRead}: ${(e as Error).message}`);
    }
  }

  async function copy(v: string) {
    try { await navigator.clipboard.writeText(v); setCopied(v); setTimeout(() => setCopied((c) => (c === v ? null : c)), 1000); } catch {}
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setPalette(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {srcUrl && (
        <div className="overflow-hidden rounded-lg border border-ink-100 bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={srcUrl} alt={s.sourceAlt} className="mx-auto max-h-64 rounded object-contain" />
        </div>
      )}

      {palette && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {palette.map((sw) => (
            <div key={sw.hex} className="overflow-hidden rounded-lg border border-ink-100 bg-white">
              <div className="h-20" style={{ backgroundColor: sw.hex }} />
              <div className="space-y-1 p-3 text-xs">
                {[sw.hex, sw.rgb, sw.hsl].map((v) => (
                  <button key={v} onClick={() => copy(v)} className="flex w-full items-center justify-between gap-2 rounded px-1 py-0.5 font-mono text-ink-700 hover:bg-ink-50">
                    <span className="truncate">{v}</span>
                    {copied === v ? <Check className="h-3 w-3 shrink-0 text-emerald-600" /> : <Copy className="h-3 w-3 shrink-0 text-ink-300" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
