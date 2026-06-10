"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { useLocale } from "@/hooks/useLocale";

type Preset = { label: string; w: number; h: number };
const PRESETS: Preset[] = [
  { label: "Instagram Square", w: 1, h: 1 },
  { label: "Instagram Portrait", w: 4, h: 5 },
  { label: "Story / Reel / TikTok", w: 9, h: 16 },
  { label: "X / Twitter", w: 16, h: 9 },
  { label: "Facebook", w: 1.91, h: 1 },
  { label: "YouTube Thumbnail", w: 16, h: 9 },
  { label: "LinkedIn Banner", w: 4, h: 1 },
  { label: "Pinterest Pin", w: 2, h: 3 },
];

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Image to crop",
    cropping: "Cropping…",
    couldNotCrop: "Could not crop the image",
    croppedPreview: "Cropped preview",
    download: "Download",
    privacy: "Center-cropped to the exact ratio, at full resolution. Runs in your browser — your image is never uploaded.",
  },
  fr: {
    dropLabel: "Image à recadrer",
    cropping: "Recadrage…",
    couldNotCrop: "Impossible de recadrer l’image",
    croppedPreview: "Aperçu recadré",
    download: "Télécharger",
    privacy: "Recadrage centré au ratio exact, en pleine résolution. Exécuté dans votre navigateur — votre image n’est jamais envoyée.",
  },
  es: {
    dropLabel: "Imagen para recortar",
    cropping: "Recortando…",
    couldNotCrop: "No se pudo recortar la imagen",
    croppedPreview: "Vista previa recortada",
    download: "Descargar",
    privacy: "Recorte centrado en el ratio exacto, a plena resolución. Se ejecuta en tu navegador — tu imagen nunca se sube.",
  },
  pt: {
    dropLabel: "Imagem para cortar",
    cropping: "Cortando…",
    couldNotCrop: "Não foi possível cortar a imagem",
    croppedPreview: "Pré-visualização cortada",
    download: "Baixar",
    privacy: "Recorte centrado na proporção exata, em resolução total. Executado no seu navegador — a sua imagem nunca é enviada.",
  },
  de: {
    dropLabel: "Bild zum Zuschneiden",
    cropping: "Wird zugeschnitten…",
    couldNotCrop: "Das Bild konnte nicht zugeschnitten werden",
    croppedPreview: "Zugeschnittene Vorschau",
    download: "Herunterladen",
    privacy: "Mittig auf das genaue Seitenverhältnis zugeschnitten, in voller Auflösung. Läuft in Ihrem Browser — Ihr Bild wird nie hochgeladen.",
  },
  it: {
    dropLabel: "Immagine da ritagliare",
    cropping: "Ritaglio…",
    couldNotCrop: "Impossibile ritagliare l’immagine",
    croppedPreview: "Anteprima ritagliata",
    download: "Scarica",
    privacy: "Ritaglio centrato al rapporto esatto, in piena risoluzione. Eseguito nel browser — la tua immagine non viene mai caricata.",
  },
  nl: {
    dropLabel: "Afbeelding bijsnijden",
    cropping: "Bijsnijden…",
    couldNotCrop: "Kon de afbeelding niet bijsnijden",
    croppedPreview: "Bijgesneden voorbeeld",
    download: "Downloaden",
    privacy: "Gecentreerd bijgesneden op de exacte verhouding, op volledige resolutie. Draait in uw browser — uw afbeelding wordt nooit geüpload.",
  },
  ja: {
    dropLabel: "トリミングする画像",
    cropping: "トリミング中…",
    couldNotCrop: "画像をトリミングできませんでした",
    croppedPreview: "トリミング後のプレビュー",
    download: "ダウンロード",
    privacy: "正確なアスペクト比に中居トリミング、フル解像度。ブラウザで処理—画像はアップロードされません。",
  },
  zh: {
    dropLabel: "要裁剪的图片",
    cropping: "裁剪中…",
    couldNotCrop: "无法裁剪图片",
    croppedPreview: "裁剪预览",
    download: "下载",
    privacy: "按精确比例居中裁剪，保持全分辨率。在您的浏览器中运行—图片永远不会被上传。",
  },
  ko: {
    dropLabel: "크롭할 이미지",
    cropping: "크롭 중…",
    couldNotCrop: "이미지를 크롭할 수 없습니다",
    croppedPreview: "크롭된 미리보기",
    download: "다운로드",
    privacy: "정확한 비율로 중앙 크롭, 전체 해상도. 브라우저에서 실행—이미지는 업로드되지 않습니다.",
  },
  ar: {
    dropLabel: "صورة للقص",
    cropping: "جاريالقص…",
    couldNotCrop: "تعذّر قص الصورة",
    croppedPreview: "معاينة الصورة المقصوصة",
    download: "تنزيل",
    privacy: "قص متمركز بالنسبة الدقيقة، بالدقة الكاملة. يعمل في متصفحك — لا تُرفَع صورتك أبداً.",
  },
  ru: {
    dropLabel: "Изображение для обрезки",
    cropping: "Обрезка…",
    couldNotCrop: "Не удалось обрезать изображение",
    croppedPreview: "Предпросмотр обрезки",
    download: "Скачать",
    privacy: "Обрезка по центру с точным соотношением, в полном разрешении. Работает в браузере — ваше изображение никогда не загружается.",
  },
  hi: {
    dropLabel: "क्रॉप करने के लिए चित्र",
    cropping: "क्रॉप हो रहा है…",
    couldNotCrop: "चित्र क्रॉप नहीं हो सका",
    croppedPreview: "क्रॉप किया पूर्वावलोकन",
    download: "डाउनलोड",
    privacy: "सटीक अनुपात पर केंद्र से क्रॉप, पूरी रेज़ोल्यूशन पर। आपके ब्राउज़र में चलता है — आपकी छवि कभी अपलोड नहीं होती।",
  },
  tr: {
    dropLabel: "Kesmek için görsel",
    cropping: "Kesiliyor…",
    couldNotCrop: "Görsel kesilemiyor",
    croppedPreview: "Kesilmiş önizleme",
    download: "İndir",
    privacy: "Tam çözünürlükte, kesin oranda ortalanarak kesildi. Tarayıcınızda çalışır — görseliniz hiçbir zaman yüklenmez.",
  },
  id: {
    dropLabel: "Gambar untuk dipotong",
    cropping: "Memotong…",
    couldNotCrop: "Gagal memotong gambar",
    croppedPreview: "Pratinjau terpotong",
    download: "Unduh",
    privacy: "Dipotong di tengah dengan rasio tepat, pada resolusi penuh. Berjalan di browser Anda — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    dropLabel: "Hình ảnh để cắt",
    cropping: "Đang cắt…",
    couldNotCrop: "Không thể cắt hình ảnh",
    croppedPreview: "Xem trước đã cắt",
    download: "Tải xuống",
    privacy: "Cắt giữa theo tỉ lệ chính xác, ở độ phân giải đầy đủ. Chạy trong trình duyệt của bạn — hình ảnh không bao giờ được tải lên.",
  },
  sv: {
    dropLabel: "Bild att beskära",
    cropping: "Beskär…",
    couldNotCrop: "Kunde inte beskära bilden",
    croppedPreview: "Förhandsgranskning beskärd",
    download: "Ladda ned",
    privacy: "Centralt beskuren till exakt bildförhållande, i full upplösning. Körs i din webbläsare — din bild laddas aldrig upp.",
  },
  pl: {
    dropLabel: "Obraz do przycięcia",
    cropping: "Przycinanie…",
    couldNotCrop: "Nie można przyciąć obrazu",
    croppedPreview: "Podgląd przyciętego obrazu",
    download: "Pobierz",
    privacy: "Wycentrowane przycięcie do dokładnego współczynnika proporcji, w pełnej rozdzielczości. Działa w Twojej przeglądarce — Twój obraz nigdy nie jest przesyłany.",
  },
  uk: {
    dropLabel: "Зображення для обрізки",
    cropping: "Обрізка…",
    couldNotCrop: "Не вдалося обрізати зображення",
    croppedPreview: "Попередній перегляд обрізки",
    download: "Завантажити",
    privacy: "Обрізка по центру з точним співвідношенням, у повній роздільній здатності. Працює у вашому браузері — зображення ніколи не завантажується.",
  },
  cs: {
    dropLabel: "Obrázek k oříznutí",
    cropping: "Ořezávání…",
    couldNotCrop: "Obrázek nelze ořínout",
    croppedPreview: "Náhled oříznutého obrázku",
    download: "Stáhnout",
    privacy: "Ořínuto na střed při přesném poměru, v plném rozlišení. Běží ve vašem prohlížeči — váš obrázek se nikdy nenačítá.",
  },
};

export function SocialMediaCropClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  // Re-crop whenever the file or preset changes.
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      setBusy(true); setError(null);
      try {
        const bmp = await createImageBitmap(file);
        const dstRatio = preset.w / preset.h, srcRatio = bmp.width / bmp.height;
        let sw: number, sh: number;
        if (srcRatio > dstRatio) { sh = bmp.height; sw = sh * dstRatio; }
        else { sw = bmp.width; sh = sw / dstRatio; }
        const sx = (bmp.width - sw) / 2, sy = (bmp.height - sh) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(sw); canvas.height = Math.round(sh);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bmp, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        bmp.close?.();
        const isJpg = /jpe?g/i.test(file.type);
        const blob: Blob = await new Promise((res) =>
          canvas.toBlob((b) => res(b!), isJpg ? "image/jpeg" : "image/png", isJpg ? 0.92 : undefined));
        if (cancelled) return;
        if (cleanup.current) URL.revokeObjectURL(cleanup.current);
        const url = URL.createObjectURL(blob);
        cleanup.current = url;
        setOutUrl(url); setOutSize(blob.size); setDims({ w: canvas.width, h: canvas.height });
      } catch (e) {
        if (!cancelled) setError(`${s.couldNotCrop}: ${(e as Error).message}`);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => { cancelled = true; };
  }, [file, preset]); // eslint-disable-line react-hooks/exhaustive-deps

  const ext = file && /jpe?g/i.test(file.type) ? "jpg" : "png";
  const outName = file ? `${file.name.replace(/\.[^.]+$/, "")}-${preset.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${ext}` : "";

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setOutUrl(null); }}
        current={file}
      />

      {file && (
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setPreset(p)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium ${preset.label === p.label ? "border-brand-400 bg-brand-50 text-ink-900" : "border-ink-200 bg-white text-ink-600 hover:border-brand-300"}`}>
              {p.label} <span className="text-ink-400">{p.w}:{p.h}</span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {busy && <div className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {s.cropping}</div>}

      {outUrl && !busy && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt={s.croppedPreview} className="mx-auto max-h-80 rounded-lg border border-ink-100" />
          <div className="flex flex-wrap items-center gap-2">
            <a href={outUrl} download={outName}>
              <Button size="lg"><Download className="h-4 w-4" /> {s.download} &middot; {dims?.w}&times;{dims?.h} &middot; {formatBytes(outSize)}</Button>
            </a>
          </div>
        </div>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
