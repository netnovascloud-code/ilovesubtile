"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Drop your image (JPG, PNG, WebP)",
    dropHint: "Your image is processed entirely in your browser — never uploaded.",
    labelBrightness: "Brightness",
    labelContrast: "Contrast",
    labelSaturation: "Saturation",
    sharpenLabel: "Apply subtle sharpen",
    enhanceBtn: "Enhance image",
    enhancing: "Enhancing…",
    download: "Download",
    couldNotRead: "Could not read this image.",
    couldNotEnhance: "Could not enhance image.",
  },
  fr: {
    dropLabel: "Déposez votre image (JPG, PNG, WebP)",
    dropHint: "Votre image est traitée entièrement dans votre navigateur — jamais envoyée.",
    labelBrightness: "Luminosité",
    labelContrast: "Contraste",
    labelSaturation: "Saturation",
    sharpenLabel: "Appliquer un léger renforcement de la netteté",
    enhanceBtn: "Améliorer l'image",
    enhancing: "Amélioration…",
    download: "Télécharger",
    couldNotRead: "Impossible de lire cette image.",
    couldNotEnhance: "Impossible d'améliorer l'image.",
  },
  es: {
    dropLabel: "Suelta tu imagen (JPG, PNG, WebP)",
    dropHint: "Tu imagen se procesa completamente en tu navegador — nunca se sube.",
    labelBrightness: "Brillo",
    labelContrast: "Contraste",
    labelSaturation: "Saturación",
    sharpenLabel: "Aplicar nitidez suave",
    enhanceBtn: "Mejorar imagen",
    enhancing: "Mejorando…",
    download: "Descargar",
    couldNotRead: "No se pudo leer esta imagen.",
    couldNotEnhance: "No se pudo mejorar la imagen.",
  },
  pt: {
    dropLabel: "Largue a sua imagem (JPG, PNG, WebP)",
    dropHint: "A sua imagem é processada inteiramente no seu navegador — nunca enviada.",
    labelBrightness: "Brilho",
    labelContrast: "Contraste",
    labelSaturation: "Saturação",
    sharpenLabel: "Aplicar nitidez subtil",
    enhanceBtn: "Melhorar imagem",
    enhancing: "A melhorar…",
    download: "Baixar",
    couldNotRead: "Não foi possível ler esta imagem.",
    couldNotEnhance: "Não foi possível melhorar a imagem.",
  },
  de: {
    dropLabel: "Bild ablegen (JPG, PNG, WebP)",
    dropHint: "Ihr Bild wird vollständig in Ihrem Browser verarbeitet — nie hochgeladen.",
    labelBrightness: "Helligkeit",
    labelContrast: "Kontrast",
    labelSaturation: "Sättigung",
    sharpenLabel: "Leichte Schärfung anwenden",
    enhanceBtn: "Bild verbessern",
    enhancing: "Wird verbessert…",
    download: "Herunterladen",
    couldNotRead: "Dieses Bild konnte nicht gelesen werden.",
    couldNotEnhance: "Das Bild konnte nicht verbessert werden.",
  },
  it: {
    dropLabel: "Trascina la tua immagine (JPG, PNG, WebP)",
    dropHint: "La tua immagine viene elaborata interamente nel browser — non viene mai caricata.",
    labelBrightness: "Luminosità",
    labelContrast: "Contrasto",
    labelSaturation: "Saturazione",
    sharpenLabel: "Applica nitidezza sottile",
    enhanceBtn: "Migliora immagine",
    enhancing: "Miglioramento…",
    download: "Scarica",
    couldNotRead: "Impossibile leggere questa immagine.",
    couldNotEnhance: "Impossibile migliorare l'immagine.",
  },
  nl: {
    dropLabel: "Sleep uw afbeelding (JPG, PNG, WebP)",
    dropHint: "Uw afbeelding wordt volledig in uw browser verwerkt — nooit geüpload.",
    labelBrightness: "Helderheid",
    labelContrast: "Contrast",
    labelSaturation: "Verzadiging",
    sharpenLabel: "Subtiele verscherping toepassen",
    enhanceBtn: "Afbeelding verbeteren",
    enhancing: "Verbeteren…",
    download: "Downloaden",
    couldNotRead: "Kon deze afbeelding niet lezen.",
    couldNotEnhance: "Kon de afbeelding niet verbeteren.",
  },
  ja: {
    dropLabel: "画像をドロップ (JPG, PNG, WebP)",
    dropHint: "画像はブラウザ内で完全に処理されます—アップロードはされません。",
    labelBrightness: "明るさ",
    labelContrast: "コントラスト",
    labelSaturation: "彩度",
    sharpenLabel: "シャープネスを適用",
    enhanceBtn: "画像を強調",
    enhancing: "強調中…",
    download: "ダウンロード",
    couldNotRead: "この画像を読み込めませんでした。",
    couldNotEnhance: "画像を強調できませんでした。",
  },
  zh: {
    dropLabel: "拖入图片 (JPG, PNG, WebP)",
    dropHint: "您的图片完全在浏览器中处理—永远不会被上传。",
    labelBrightness: "亮度",
    labelContrast: "对比度",
    labelSaturation: "饱和度",
    sharpenLabel: "应用细微锐化",
    enhanceBtn: "增强图片",
    enhancing: "增强中…",
    download: "下载",
    couldNotRead: "无法读取此图片。",
    couldNotEnhance: "无法增强图片。",
  },
  ko: {
    dropLabel: "이미지 드롭 (JPG, PNG, WebP)",
    dropHint: "이미지는 브라우저에서 완전히 처리됩니다—업로드되지 않습니다.",
    labelBrightness: "밝기",
    labelContrast: "대비",
    labelSaturation: "채도",
    sharpenLabel: "미세 샤프닝 적용",
    enhanceBtn: "이미지 향상",
    enhancing: "향상 중…",
    download: "다운로드",
    couldNotRead: "이미지를 읽을 수 없습니다.",
    couldNotEnhance: "이미지를 향상할 수 없습니다.",
  },
  ar: {
    dropLabel: "أفلت صورتك (JPG, PNG, WebP)",
    dropHint: "تتم معالجة صورتك بالكامل في متصفحك — لا تُرفَع أبداً.",
    labelBrightness: "السطوع",
    labelContrast: "التباين",
    labelSaturation: "التشبع",
    sharpenLabel: "تطبيق حدة خفيفة",
    enhanceBtn: "تحسين الصورة",
    enhancing: "جاريالتحسين…",
    download: "تنزيل",
    couldNotRead: "تعذّر قراءة هذه الصورة.",
    couldNotEnhance: "تعذّر تحسين الصورة.",
  },
  ru: {
    dropLabel: "Перетащите изображение (JPG, PNG, WebP)",
    dropHint: "Изображение обрабатывается полностью в браузере — никогда не загружается.",
    labelBrightness: "Яркость",
    labelContrast: "Контрастность",
    labelSaturation: "Насыщенность",
    sharpenLabel: "Применить лёгкую резкость",
    enhanceBtn: "Улучшить изображение",
    enhancing: "Улучшение…",
    download: "Скачать",
    couldNotRead: "Не удалось прочитать это изображение.",
    couldNotEnhance: "Не удалось улучшить изображение.",
  },
  hi: {
    dropLabel: "अपनी छवि छोड़ें (JPG, PNG, WebP)",
    dropHint: "आपकी छवि पूरी तरह से आपके ब्राउज़र में संसाधित होती है — कभी अपलोड नहीं होती।",
    labelBrightness: "चमक",
    labelContrast: "कंट्रास्ट",
    labelSaturation: "संतृप्ति",
    sharpenLabel: "हल्का शार्पन लागू करें",
    enhanceBtn: "छवि सुधारें",
    enhancing: "सुधार हो रहा है…",
    download: "डाउनलोड",
    couldNotRead: "यह छवि नहीं पढ़ी जा सकी।",
    couldNotEnhance: "छवि सुधार नहीं हो सका।",
  },
  tr: {
    dropLabel: "Görselinizi bırakın (JPG, PNG, WebP)",
    dropHint: "Görseliniz tamamen tarayıcınızda işlenir — hiçbir zaman yüklenmez.",
    labelBrightness: "Parlaklık",
    labelContrast: "Kontrast",
    labelSaturation: "Doygunluk",
    sharpenLabel: "Hafif keskinleştirme uygula",
    enhanceBtn: "Görseli geliştir",
    enhancing: "Geliştiriliyor…",
    download: "İndir",
    couldNotRead: "Bu görsel okunamadı.",
    couldNotEnhance: "Görsel geliştirilemedi.",
  },
  id: {
    dropLabel: "Seret gambar Anda (JPG, PNG, WebP)",
    dropHint: "Gambar Anda diproses sepenuhnya di browser Anda — tidak pernah diunggah.",
    labelBrightness: "Kecerahan",
    labelContrast: "Kontras",
    labelSaturation: "Saturasi",
    sharpenLabel: "Terapkan ketajaman halus",
    enhanceBtn: "Tingkatkan gambar",
    enhancing: "Sedang meningkatkan…",
    download: "Unduh",
    couldNotRead: "Tidak dapat membaca gambar ini.",
    couldNotEnhance: "Tidak dapat meningkatkan gambar.",
  },
  vi: {
    dropLabel: "Thả hình ảnh của bạn (JPG, PNG, WebP)",
    dropHint: "Hình ảnh của bạn được xử lý hoàn toàn trong trình duyệt — không bao giờ được tải lên.",
    labelBrightness: "Độ sáng",
    labelContrast: "Độ tương phản",
    labelSaturation: "Độ bão hòa",
    sharpenLabel: "Áp dụng làm nét nhẹ",
    enhanceBtn: "Cải thiện hình ảnh",
    enhancing: "Đang cải thiện…",
    download: "Tải xuống",
    couldNotRead: "Không thể đọc hình ảnh này.",
    couldNotEnhance: "Không thể cải thiện hình ảnh.",
  },
  sv: {
    dropLabel: "Släpp din bild (JPG, PNG, WebP)",
    dropHint: "Din bild behandlas helt i din webbläsare — laddas aldrig upp.",
    labelBrightness: "Ljusstyrka",
    labelContrast: "Kontrast",
    labelSaturation: "Mättnad",
    sharpenLabel: "Använd subtil skärpning",
    enhanceBtn: "Förbättra bild",
    enhancing: "Förbättrar…",
    download: "Ladda ned",
    couldNotRead: "Kunde inte läsa den här bilden.",
    couldNotEnhance: "Kunde inte förbättra bilden.",
  },
  pl: {
    dropLabel: "Upuść obraz (JPG, PNG, WebP)",
    dropHint: "Twój obraz jest przetwarzany w całości w Twojej przeglądarce — nigdy nie jest przesyłany.",
    labelBrightness: "Jasność",
    labelContrast: "Kontrast",
    labelSaturation: "Nasycenie",
    sharpenLabel: "Zastosuj delikatne wyostrzenie",
    enhanceBtn: "Ulepsz obraz",
    enhancing: "Ulepszanie…",
    download: "Pobierz",
    couldNotRead: "Nie można odczytać tego obrazu.",
    couldNotEnhance: "Nie można ulepszyć obrazu.",
  },
  uk: {
    dropLabel: "Перетягніть зображення (JPG, PNG, WebP)",
    dropHint: "Зображення обробляється повністю у браузері — ніколи не завантажується.",
    labelBrightness: "Яскравість",
    labelContrast: "Контрастність",
    labelSaturation: "Насиченість",
    sharpenLabel: "Застосувати легке підвищення різкості",
    enhanceBtn: "Покращити зображення",
    enhancing: "Покращення…",
    download: "Завантажити",
    couldNotRead: "Не вдалося прочитати це зображення.",
    couldNotEnhance: "Не вдалося покращити зображення.",
  },
  cs: {
    dropLabel: "Přetáhněte obrázek (JPG, PNG, WebP)",
    dropHint: "Váš obrázek je zpracován zcela ve vašem prohlížeči — nikdy není nahrán.",
    labelBrightness: "Jas",
    labelContrast: "Kontrast",
    labelSaturation: "Sytost",
    sharpenLabel: "Použít jemné doostření",
    enhanceBtn: "Vylepšit obrázek",
    enhancing: "Vylepšování…",
    download: "Stáhnout",
    couldNotRead: "Tento obrázek nelze přečíst.",
    couldNotEnhance: "Obrázek nelze vylepšit.",
  },
};

// One-click image enhancement — brightness, contrast and saturation bumps
// plus a subtle sharpen, all via the native canvas filter pipeline. No
// dependencies, runs entirely in the browser.
export function EnhanceImageClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<HTMLImageElement | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Defaults tuned for "looks better straight away" — matches the iLoveIMG
  // one-click feel. Users can still nudge each slider.
  const [brightness, setBrightness] = useState(105);
  const [contrast, setContrast] = useState(115);
  const [saturate, setSaturate] = useState(120);
  const [sharpen, setSharpen] = useState(true);

  const previewRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = useCallback((f: File) => {
    setError(null); setOut(null);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => { setFile(f); setSrc(img); URL.revokeObjectURL(url); };
    img.onerror = () => { setError(s.couldNotRead); URL.revokeObjectURL(url); };
    img.src = url;
  }, [s.couldNotRead]);

  // Live preview redraws whenever the sliders move.
  useEffect(() => {
    if (!src || !previewRef.current) return;
    const c = previewRef.current;
    const maxSide = 720;
    const scale = Math.min(1, maxSide / Math.max(src.naturalWidth, src.naturalHeight));
    c.width = Math.round(src.naturalWidth * scale);
    c.height = Math.round(src.naturalHeight * scale);
    const ctx = c.getContext("2d")!;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
    ctx.drawImage(src, 0, 0, c.width, c.height);
    if (sharpen) applyUnsharpMask(ctx, c.width, c.height);
  }, [src, brightness, contrast, saturate, sharpen]);

  const run = useCallback(async () => {
    if (!src || !file) return;
    setBusy(true); setError(null);
    try {
      const c = document.createElement("canvas");
      c.width = src.naturalWidth;
      c.height = src.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      ctx.drawImage(src, 0, 0);
      if (sharpen) applyUnsharpMask(ctx, c.width, c.height);
      const mime = file.type.startsWith("image/png") ? "image/png" : "image/jpeg";
      const blob: Blob = await new Promise((res, rej) =>
        c.toBlob((b) => (b ? res(b) : rej(new Error("encoding failed"))), mime, 0.94),
      );
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotEnhance);
    } finally {
      setBusy(false);
    }
  }, [src, file, brightness, contrast, saturate, sharpen, out, s.couldNotEnhance]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setSrc(null); setOut(null); setError(null);
    setBrightness(105); setContrast(115); setSaturate(120); setSharpen(true);
  };

  if (!file) {
    return (
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={onFile}
        current={null}
        hint={s.dropHint}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name}</div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
        <canvas ref={previewRef} className="mx-auto max-h-[440px] w-auto rounded" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={`${s.labelBrightness} ${brightness}%`} value={brightness} min={50} max={200} onChange={setBrightness} />
        <Slider label={`${s.labelContrast} ${contrast}%`} value={contrast} min={50} max={200} onChange={setContrast} />
        <Slider label={`${s.labelSaturation} ${saturate}%`} value={saturate} min={0} max={200} onChange={setSaturate} />
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" checked={sharpen} onChange={(e) => setSharpen(e.target.checked)} className="h-4 w-4" />
        {s.sharpenLabel}
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{s.enhancing}</> : s.enhanceBtn}
        </Button>
        {out && (
          <a href={out.url} download={`enhanced-${file.name.replace(/\.[^.]+$/, "")}.${file.type.startsWith("image/png") ? "png" : "jpg"}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-ink-600">
      {label}
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="accent-brand-500" />
    </label>
  );
}

// Light unsharp mask via a 3x3 convolution kernel. Keeps natural skin tones
// while bringing out edge detail — much subtler than canvas' built-in blur
// trick (which over-sharpens).
function applyUnsharpMask(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const src = ctx.getImageData(0, 0, w, h);
  const dst = ctx.createImageData(w, h);
  const d = src.data, o = dst.data;
  const kernel = [0, -0.25, 0, -0.25, 2, -0.25, 0, -0.25, 0];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let v = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            v += d[((y + ky) * w + (x + kx)) * 4 + c] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        o[(y * w + x) * 4 + c] = Math.max(0, Math.min(255, v));
      }
      o[(y * w + x) * 4 + 3] = 255;
    }
  }
  ctx.putImageData(dst, 0, 0);
}
