"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, RotateCw, FlipHorizontal, FlipVertical, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

// Lightweight photo editor — filters + rotation/flip. Deliberately scoped
// like iLoveIMG's "photo editor": six sliders, three preset filters, one
// rotate-90 button, two flip buttons. Pure canvas, no deps.
type Filters = { brightness: number; contrast: number; saturate: number; hue: number; blur: number; grayscale: number };
const DEFAULTS: Filters = { brightness: 100, contrast: 100, saturate: 100, hue: 0, blur: 0, grayscale: 0 };

function buildFilter(f: Filters): string {
  return `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) hue-rotate(${f.hue}deg) blur(${f.blur}px) grayscale(${f.grayscale}%)`;
}

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Drop your image (JPG, PNG, WebP)",
    dropHint: "Your image is processed entirely in your browser — never uploaded.",
    rotate: "Rotate 90°",
    flipH: "Flip H",
    flipV: "Flip V",
    brightness: "Brightness",
    contrast: "Contrast",
    saturation: "Saturation",
    hue: "Hue",
    blur: "Blur",
    grayscale: "Grayscale",
    exporting: "Exporting…",
    exportImage: "Export image",
    download: "Download",
    presetOriginal: "Original",
    presetVivid: "Vivid",
    presetBW: "B&W",
    presetVintage: "Vintage",
  },
  fr: {
    dropLabel: "Déposez votre image (JPG, PNG, WebP)",
    dropHint: "Votre image est entièrement traitée dans votre navigateur — jamais envoyée.",
    rotate: "Pivoter 90°",
    flipH: "Miroir H",
    flipV: "Miroir V",
    brightness: "Luminosité",
    contrast: "Contraste",
    saturation: "Saturation",
    hue: "Teinte",
    blur: "Flou",
    grayscale: "Niveaux de gris",
    exporting: "Export en cours…",
    exportImage: "Exporter l'image",
    download: "Télécharger",
    presetOriginal: "Original",
    presetVivid: "Vif",
    presetBW: "N&B",
    presetVintage: "Vintage",
  },
  es: {
    dropLabel: "Suelta tu imagen (JPG, PNG, WebP)",
    dropHint: "Tu imagen se procesa completamente en tu navegador — nunca se sube.",
    rotate: "Rotar 90°",
    flipH: "Voltear H",
    flipV: "Voltear V",
    brightness: "Brillo",
    contrast: "Contraste",
    saturation: "Saturación",
    hue: "Tono",
    blur: "Desenfoque",
    grayscale: "Escala de grises",
    exporting: "Exportando…",
    exportImage: "Exportar imagen",
    download: "Descargar",
    presetOriginal: "Original",
    presetVivid: "Vívido",
    presetBW: "B&N",
    presetVintage: "Vintage",
  },
  pt: {
    dropLabel: "Solte sua imagem (JPG, PNG, WebP)",
    dropHint: "Sua imagem é processada inteiramente no seu navegador — nunca enviada.",
    rotate: "Girar 90°",
    flipH: "Espelhar H",
    flipV: "Espelhar V",
    brightness: "Brilho",
    contrast: "Contraste",
    saturation: "Saturação",
    hue: "Matiz",
    blur: "Desfoque",
    grayscale: "Escala de cinza",
    exporting: "Exportando…",
    exportImage: "Exportar imagem",
    download: "Baixar",
    presetOriginal: "Original",
    presetVivid: "Vívido",
    presetBW: "P&B",
    presetVintage: "Vintage",
  },
  de: {
    dropLabel: "Bild ablegen (JPG, PNG, WebP)",
    dropHint: "Ihr Bild wird vollständig in Ihrem Browser verarbeitet — niemals hochgeladen.",
    rotate: "90° drehen",
    flipH: "H spiegeln",
    flipV: "V spiegeln",
    brightness: "Helligkeit",
    contrast: "Kontrast",
    saturation: "Sättigung",
    hue: "Farbton",
    blur: "Unschärfe",
    grayscale: "Graustufen",
    exporting: "Wird exportiert…",
    exportImage: "Bild exportieren",
    download: "Herunterladen",
    presetOriginal: "Original",
    presetVivid: "Kräftig",
    presetBW: "S&W",
    presetVintage: "Vintage",
  },
  it: {
    dropLabel: "Trascina la tua immagine (JPG, PNG, WebP)",
    dropHint: "La tua immagine viene elaborata interamente nel browser — non viene mai caricata.",
    rotate: "Ruota 90°",
    flipH: "Specchio H",
    flipV: "Specchio V",
    brightness: "Luminosità",
    contrast: "Contrasto",
    saturation: "Saturazione",
    hue: "Tonalità",
    blur: "Sfocatura",
    grayscale: "Scala di grigi",
    exporting: "Esportazione…",
    exportImage: "Esporta immagine",
    download: "Scarica",
    presetOriginal: "Originale",
    presetVivid: "Vivido",
    presetBW: "B&N",
    presetVintage: "Vintage",
  },
  nl: {
    dropLabel: "Zet uw afbeelding hier neer (JPG, PNG, WebP)",
    dropHint: "Uw afbeelding wordt volledig in uw browser verwerkt — nooit geüpload.",
    rotate: "90° draaien",
    flipH: "H spiegelen",
    flipV: "V spiegelen",
    brightness: "Helderheid",
    contrast: "Contrast",
    saturation: "Verzadiging",
    hue: "Tint",
    blur: "Vervaging",
    grayscale: "Grijswaarden",
    exporting: "Exporteren…",
    exportImage: "Afbeelding exporteren",
    download: "Downloaden",
    presetOriginal: "Origineel",
    presetVivid: "Levendig",
    presetBW: "Z&W",
    presetVintage: "Vintage",
  },
  ja: {
    dropLabel: "画像をドロップ (JPG, PNG, WebP)",
    dropHint: "画像はすべてブラウザ内で処理されます — アップロードされません。",
    rotate: "90° 回転",
    flipH: "水平反転",
    flipV: "垂直反転",
    brightness: "明るさ",
    contrast: "コントラスト",
    saturation: "彩度",
    hue: "色相",
    blur: "ぼかし",
    grayscale: "グレースケール",
    exporting: "エクスポート中…",
    exportImage: "画像をエクスポート",
    download: "ダウンロード",
    presetOriginal: "オリジナル",
    presetVivid: "鮮やか",
    presetBW: "白黒",
    presetVintage: "ヴィンテージ",
  },
  zh: {
    dropLabel: "拖放您的图片 (JPG, PNG, WebP)",
    dropHint: "您的图片完全在浏览器中处理 — 从不上传。",
    rotate: "旋转 90°",
    flipH: "水平翻转",
    flipV: "垂直翻转",
    brightness: "亮度",
    contrast: "对比度",
    saturation: "饱和度",
    hue: "色调",
    blur: "模糊",
    grayscale: "灰度",
    exporting: "导出中…",
    exportImage: "导出图片",
    download: "下载",
    presetOriginal: "原始",
    presetVivid: "鲜艳",
    presetBW: "黑白",
    presetVintage: "复古",
  },
  ko: {
    dropLabel: "이미지를 드롭하세요 (JPG, PNG, WebP)",
    dropHint: "이미지는 브라우저에서 완전히 처리됩니다 — 업로드되지 않습니다.",
    rotate: "90° 회전",
    flipH: "수평 뒤집기",
    flipV: "수직 뒤집기",
    brightness: "밝기",
    contrast: "대비",
    saturation: "채도",
    hue: "색조",
    blur: "흐림",
    grayscale: "흑백",
    exporting: "내보내는 중…",
    exportImage: "이미지 내보내기",
    download: "다운로드",
    presetOriginal: "원본",
    presetVivid: "선명",
    presetBW: "흑백",
    presetVintage: "빈티지",
  },
  ar: {
    dropLabel: "أسقط صورتك هنا (JPG أو PNG أو WebP)",
    dropHint: "تُعالج صورتك بالكامل في متصفحك — لا تُرفع أبدًا.",
    rotate: "تدوير 90°",
    flipH: "قلب أفقي",
    flipV: "قلب رأسي",
    brightness: "السطوع",
    contrast: "التباين",
    saturation: "التشبع",
    hue: "الصبغة",
    blur: "الضبابية",
    grayscale: "تدرج الرمادي",
    exporting: "جارٍ التصدير…",
    exportImage: "تصدير الصورة",
    download: "تنزيل",
    presetOriginal: "الأصلي",
    presetVivid: "زاهي",
    presetBW: "أبيض وأسود",
    presetVintage: "كلاسيكي",
  },
  ru: {
    dropLabel: "Перетащите изображение (JPG, PNG, WebP)",
    dropHint: "Ваше изображение полностью обрабатывается в браузере — никогда не загружается.",
    rotate: "Повернуть на 90°",
    flipH: "Отразить по горизонтали",
    flipV: "Отразить по вертикали",
    brightness: "Яркость",
    contrast: "Контраст",
    saturation: "Насыщенность",
    hue: "Оттенок",
    blur: "Размытие",
    grayscale: "Оттенки серого",
    exporting: "Экспортируется…",
    exportImage: "Экспортировать изображение",
    download: "Скачать",
    presetOriginal: "Оригинал",
    presetVivid: "Яркий",
    presetBW: "Ч/Б",
    presetVintage: "Винтаж",
  },
  hi: {
    dropLabel: "अपनी छवि यहाँ छोड़ें (JPG, PNG, WebP)",
    dropHint: "आपकी छवि पूरी तरह से आपके ब्राउज़र में प्रसंस्कृत होती है — कभी अपलोड नहीं होती।",
    rotate: "90° घुमाएं",
    flipH: "H पलटें",
    flipV: "V पलटें",
    brightness: "चमक",
    contrast: "कंट्रास्ट",
    saturation: "संतृप्ति",
    hue: "रंग-रेखा",
    blur: "धुंधलापन",
    grayscale: "ग्रेस्केल",
    exporting: "निर्यात हो रहा है…",
    exportImage: "छवि निर्यात करें",
    download: "डाउनलोड",
    presetOriginal: "मूल",
    presetVivid: "चमकदार",
    presetBW: "श्वेत-श्याम",
    presetVintage: "विंटेज",
  },
  tr: {
    dropLabel: "Görselinizi bırakın (JPG, PNG, WebP)",
    dropHint: "Görseliniz tamamen tarayıcınızda işlenir — hiçbir zaman yüklenmez.",
    rotate: "90° döndür",
    flipH: "Yatay çevir",
    flipV: "Dikey çevir",
    brightness: "Parlaklık",
    contrast: "Kontrast",
    saturation: "Doygunluk",
    hue: "Ton",
    blur: "Bulanıklık",
    grayscale: "Gri ton",
    exporting: "Dışa aktarılıyor…",
    exportImage: "Görsel dışa aktar",
    download: "İndir",
    presetOriginal: "Orijinal",
    presetVivid: "Canlı",
    presetBW: "S&B",
    presetVintage: "Vintage",
  },
  id: {
    dropLabel: "Jatuhkan gambar Anda (JPG, PNG, WebP)",
    dropHint: "Gambar Anda diproses sepenuhnya di browser Anda — tidak pernah diunggah.",
    rotate: "Putar 90°",
    flipH: "Balik H",
    flipV: "Balik V",
    brightness: "Kecerahan",
    contrast: "Kontras",
    saturation: "Saturasi",
    hue: "Rona",
    blur: "Buram",
    grayscale: "Skala abu-abu",
    exporting: "Mengekspor…",
    exportImage: "Ekspor gambar",
    download: "Unduh",
    presetOriginal: "Asli",
    presetVivid: "Cerah",
    presetBW: "H&P",
    presetVintage: "Vintage",
  },
  vi: {
    dropLabel: "Thả ảnh của bạn vào đây (JPG, PNG, WebP)",
    dropHint: "Ảnh của bạn được xử lý hoàn toàn trên trình duyệt — không bao giờ tải lên.",
    rotate: "Xoay 90°",
    flipH: "Lật ngang",
    flipV: "Lật dọc",
    brightness: "Độ sáng",
    contrast: "Độ tương phản",
    saturation: "Độ bão hòa",
    hue: "Màu sắc",
    blur: "Làm mờ",
    grayscale: "Thang xám",
    exporting: "Đang xuất…",
    exportImage: "Xuất ảnh",
    download: "Tải xuống",
    presetOriginal: "Gốc",
    presetVivid: "Sống động",
    presetBW: "Đ&T",
    presetVintage: "Cổ điển",
  },
  sv: {
    dropLabel: "Släpp din bild här (JPG, PNG, WebP)",
    dropHint: "Din bild bearbetas helt i din webbläsare — laddas aldrig upp.",
    rotate: "Rotera 90°",
    flipH: "Vänd H",
    flipV: "Vänd V",
    brightness: "Ljusstyrka",
    contrast: "Kontrast",
    saturation: "Mättnad",
    hue: "Färgton",
    blur: "Oskärpa",
    grayscale: "Gråskala",
    exporting: "Exporterar…",
    exportImage: "Exportera bild",
    download: "Ladda ner",
    presetOriginal: "Original",
    presetVivid: "Levande",
    presetBW: "S&V",
    presetVintage: "Vintage",
  },
  pl: {
    dropLabel: "Upuść swój obraz (JPG, PNG, WebP)",
    dropHint: "Twój obraz jest w całości przetwarzany w przeglądarce — nigdy nie jest przesyłany.",
    rotate: "Obróć 90°",
    flipH: "Odbij H",
    flipV: "Odbij V",
    brightness: "Jasność",
    contrast: "Kontrast",
    saturation: "Nasycenie",
    hue: "Odcień",
    blur: "Rozmycie",
    grayscale: "Skala szarości",
    exporting: "Eksportowanie…",
    exportImage: "Eksportuj obraz",
    download: "Pobierz",
    presetOriginal: "Oryginał",
    presetVivid: "Żywy",
    presetBW: "C&B",
    presetVintage: "Vintage",
  },
  uk: {
    dropLabel: "Перетягніть зображення (JPG, PNG, WebP)",
    dropHint: "Ваше зображення повністю обробляється у браузері — ніколи не завантажується.",
    rotate: "Повернути на 90°",
    flipH: "Відобразити по горизонталі",
    flipV: "Відобразити по вертикалі",
    brightness: "Яскравість",
    contrast: "Контраст",
    saturation: "Насиченість",
    hue: "Відтінок",
    blur: "Розмиття",
    grayscale: "Відтінки сірого",
    exporting: "Експортується…",
    exportImage: "Експортувати зображення",
    download: "Завантажити",
    presetOriginal: "Оригінал",
    presetVivid: "Яскравий",
    presetBW: "Ч/Б",
    presetVintage: "Вінтаж",
  },
  cs: {
    dropLabel: "Přetáhněte obrázek (JPG, PNG, WebP)",
    dropHint: "Váš obrázek je zpracován zcela v prohlížeči — nikdy není nahrán.",
    rotate: "Otočit o 90°",
    flipH: "Překlopit H",
    flipV: "Překlopit V",
    brightness: "Jas",
    contrast: "Kontrast",
    saturation: "Sytost",
    hue: "Odstín",
    blur: "Rozostření",
    grayscale: "Stupně šedi",
    exporting: "Exportování…",
    exportImage: "Exportovat obrázek",
    download: "Stáhnout",
    presetOriginal: "Originál",
    presetVivid: "Živé",
    presetBW: "Č&B",
    presetVintage: "Vintage",
  },
};

export function PhotoEditorClient() {
  const s = T[useLocale()] ?? T.en;

  const PRESETS: { name: string; v: Filters }[] = [
    { name: s.presetOriginal, v: DEFAULTS },
    { name: s.presetVivid, v: { ...DEFAULTS, brightness: 105, contrast: 115, saturate: 140 } },
    { name: s.presetBW, v: { ...DEFAULTS, contrast: 110, grayscale: 100 } },
    { name: s.presetVintage, v: { ...DEFAULTS, brightness: 102, contrast: 95, saturate: 70, hue: 18 } },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [f, setF] = useState<Filters>(DEFAULTS);
  const [angle, setAngle] = useState(0);                       // 0/90/180/270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const i = new Image();
    i.onload = () => { setFile(file); setImg(i); URL.revokeObjectURL(url); };
    i.src = url;
  }, []);

  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current;
    const maxSide = 720;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    renderTo(c, img, scale, f, angle, flipH, flipV);
  }, [img, f, angle, flipH, flipV]);

  const exportImg = useCallback(async () => {
    if (!img || !file) return;
    setBusy(true);
    try {
      const c = document.createElement("canvas");
      renderTo(c, img, 1, f, angle, flipH, flipV);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob: Blob | null = await new Promise((res) => c.toBlob((b) => res(b), mime, 0.94));
      if (!blob) return;
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } finally {
      setBusy(false);
    }
  }, [img, file, f, angle, flipH, flipV, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setImg(null); setOut(null);
    setF(DEFAULTS); setAngle(0); setFlipH(false); setFlipV(false);
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
        <canvas ref={canvasRef} className="mx-auto max-h-[440px] w-auto rounded" />
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.name} onClick={() => setF(p.v)} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50">
            {p.name}
          </button>
        ))}
        <button onClick={() => setAngle((angle + 90) % 360)} className="ml-auto inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
          <RotateCw className="h-3.5 w-3.5" /> {s.rotate}
        </button>
        <button onClick={() => setFlipH((v) => !v)} className={`inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium hover:border-brand-300 ${flipH ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700"}`}>
          <FlipHorizontal className="h-3.5 w-3.5" /> {s.flipH}
        </button>
        <button onClick={() => setFlipV((v) => !v)} className={`inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium hover:border-brand-300 ${flipV ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700"}`}>
          <FlipVertical className="h-3.5 w-3.5" /> {s.flipV}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={`${s.brightness} ${f.brightness}%`} value={f.brightness} min={50} max={200} onChange={(v) => setF({ ...f, brightness: v })} />
        <Slider label={`${s.contrast} ${f.contrast}%`} value={f.contrast} min={50} max={200} onChange={(v) => setF({ ...f, contrast: v })} />
        <Slider label={`${s.saturation} ${f.saturate}%`} value={f.saturate} min={0} max={200} onChange={(v) => setF({ ...f, saturate: v })} />
        <Slider label={`${s.hue} ${f.hue}°`} value={f.hue} min={0} max={360} onChange={(v) => setF({ ...f, hue: v })} />
        <Slider label={`${s.blur} ${f.blur}px`} value={f.blur} min={0} max={20} onChange={(v) => setF({ ...f, blur: v })} />
        <Slider label={`${s.grayscale} ${f.grayscale}%`} value={f.grayscale} min={0} max={100} onChange={(v) => setF({ ...f, grayscale: v })} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportImg} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{s.exporting}</> : s.exportImage}
        </Button>
        {out && (
          <a href={out.url} download={`edited-${file.name.replace(/\.[^.]+$/, "")}.${file.type === "image/png" ? "png" : "jpg"}`}
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

function renderTo(c: HTMLCanvasElement, img: HTMLImageElement, scale: number, f: Filters, angle: number, flipH: boolean, flipV: boolean) {
  const sw = Math.round(img.naturalWidth * scale);
  const sh = Math.round(img.naturalHeight * scale);
  const rotated = angle === 90 || angle === 270;
  c.width = rotated ? sh : sw;
  c.height = rotated ? sw : sh;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.filter = buildFilter(f);
  ctx.save();
  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
  ctx.restore();
}
