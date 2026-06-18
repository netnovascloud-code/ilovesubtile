"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Adj = { brightness: number; contrast: number; saturation: number; hue: number };
const DEFAULTS: Adj = { brightness: 100, contrast: 100, saturation: 100, hue: 0 };

const T: Record<string, Record<string, string>> = {
  en: {
    uploadImage: "Upload an image",
    uploadHint: "JPG, PNG or WebP — adjusted in your browser",
    brightness: "Brightness",
    contrast: "Contrast",
    saturation: "Saturation",
    hue: "Hue",
    export: "Export",
    reset: "Reset",
    download: "Download",
    errorRead: "Could not read this image: ",
    errorExport: "Could not export: ",
    privacy: "100% in your browser via Canvas — your image is never uploaded.",
  },
  fr: {
    uploadImage: "Téléverser une image",
    uploadHint: "JPG, PNG ou WebP — ajusté dans votre navigateur",
    brightness: "Luminosité",
    contrast: "Contraste",
    saturation: "Saturation",
    hue: "Teinte",
    export: "Exporter",
    reset: "Réinitialiser",
    download: "Télécharger",
    errorRead: "Impossible de lire cette image : ",
    errorExport: "Impossible d'exporter : ",
    privacy: "100 % dans votre navigateur via Canvas — votre image n'est jamais envoyée.",
  },
  es: {
    uploadImage: "Subir una imagen",
    uploadHint: "JPG, PNG o WebP — ajustado en tu navegador",
    brightness: "Brillo",
    contrast: "Contraste",
    saturation: "Saturación",
    hue: "Matiz",
    export: "Exportar",
    reset: "Restablecer",
    download: "Descargar",
    errorRead: "No se pudo leer esta imagen: ",
    errorExport: "No se pudo exportar: ",
    privacy: "100 % en tu navegador con Canvas — tu imagen nunca se sube.",
  },
  pt: {
    uploadImage: "Enviar uma imagem",
    uploadHint: "JPG, PNG ou WebP — ajustado no seu navegador",
    brightness: "Brilho",
    contrast: "Contraste",
    saturation: "Saturação",
    hue: "Matiz",
    export: "Exportar",
    reset: "Redefinir",
    download: "Baixar",
    errorRead: "Não foi possível ler esta imagem: ",
    errorExport: "Não foi possível exportar: ",
    privacy: "100% no seu navegador via Canvas — sua imagem nunca é enviada.",
  },
  de: {
    uploadImage: "Bild hochladen",
    uploadHint: "JPG, PNG oder WebP — im Browser angepasst",
    brightness: "Helligkeit",
    contrast: "Kontrast",
    saturation: "Sättigung",
    hue: "Farbton",
    export: "Exportieren",
    reset: "Zurücksetzen",
    download: "Herunterladen",
    errorRead: "Bild konnte nicht gelesen werden: ",
    errorExport: "Export fehlgeschlagen: ",
    privacy: "100 % im Browser via Canvas — Ihr Bild wird nie hochgeladen.",
  },
  it: {
    uploadImage: "Carica un'immagine",
    uploadHint: "JPG, PNG o WebP — regolato nel browser",
    brightness: "Luminosità",
    contrast: "Contrasto",
    saturation: "Saturazione",
    hue: "Tonalità",
    export: "Esporta",
    reset: "Reimposta",
    download: "Scarica",
    errorRead: "Impossibile leggere questa immagine: ",
    errorExport: "Impossibile esportare: ",
    privacy: "100% nel tuo browser via Canvas — la tua immagine non viene mai caricata.",
  },
  nl: {
    uploadImage: "Afbeelding uploaden",
    uploadHint: "JPG, PNG of WebP — aangepast in uw browser",
    brightness: "Helderheid",
    contrast: "Contrast",
    saturation: "Verzadiging",
    hue: "Tint",
    export: "Exporteren",
    reset: "Herstellen",
    download: "Downloaden",
    errorRead: "Kon deze afbeelding niet lezen: ",
    errorExport: "Kon niet exporteren: ",
    privacy: "100% in uw browser via Canvas — uw afbeelding wordt nooit geüpload.",
  },
  ja: {
    uploadImage: "画像をアップロード",
    uploadHint: "JPG、PNG または WebP — ブラウザ内で調整",
    brightness: "明るさ",
    contrast: "コントラスト",
    saturation: "彩度",
    hue: "色相",
    export: "エクスポート",
    reset: "リセット",
    download: "ダウンロード",
    errorRead: "この画像を読み込めませんでした: ",
    errorExport: "エクスポートできませんでした: ",
    privacy: "Canvasでブラウザ内で100%処理 — 画像は決してアップロードされません。",
  },
  zh: {
    uploadImage: "上传图片",
    uploadHint: "JPG、PNG 或 WebP — 在您的浏览器中调整",
    brightness: "亮度",
    contrast: "对比度",
    saturation: "饱和度",
    hue: "色调",
    export: "导出",
    reset: "重置",
    download: "下载",
    errorRead: "无法读取此图片：",
    errorExport: "无法导出：",
    privacy: "100% 在您的浏览器中通过 Canvas 处理 — 您的图片永远不会被上传。",
  },
  ko: {
    uploadImage: "이미지 업로드",
    uploadHint: "JPG, PNG 또는 WebP — 브라우저에서 조정",
    brightness: "밝기",
    contrast: "대비",
    saturation: "채도",
    hue: "색조",
    export: "내보내기",
    reset: "초기화",
    download: "다운로드",
    errorRead: "이 이미지를 읽을 수 없습니다: ",
    errorExport: "내보낼 수 없습니다: ",
    privacy: "Canvas를 통해 브라우저에서 100% 처리 — 이미지는 절대 업로드되지 않습니다.",
  },
  ar: {
    uploadImage: "رفع صورة",
    uploadHint: "JPG أو PNG أو WebP — يُعدَّل في متصفحك",
    brightness: "السطوع",
    contrast: "التباين",
    saturation: "التشبع",
    hue: "درجة اللون",
    export: "تصدير",
    reset: "إعادة تعيين",
    download: "تنزيل",
    errorRead: "تعذّر قراءة هذه الصورة: ",
    errorExport: "تعذّر التصدير: ",
    privacy: "معالجة 100% في متصفحك عبر Canvas — لن يتم رفع صورتك مطلقًا.",
  },
  ru: {
    uploadImage: "Загрузить изображение",
    uploadHint: "JPG, PNG или WebP — редактируется в браузере",
    brightness: "Яркость",
    contrast: "Контрастность",
    saturation: "Насыщенность",
    hue: "Оттенок",
    export: "Экспортировать",
    reset: "Сбросить",
    download: "Скачать",
    errorRead: "Не удалось прочитать изображение: ",
    errorExport: "Не удалось экспортировать: ",
    privacy: "100% в вашем браузере через Canvas — ваше изображение никогда не загружается.",
  },
  hi: {
    uploadImage: "छवि अपलोड करें",
    uploadHint: "JPG, PNG या WebP — आपके ब्राउज़र में समायोजित",
    brightness: "चमक",
    contrast: "कंट्रास्ट",
    saturation: "संतृप्ति",
    hue: "रंग",
    export: "निर्यात करें",
    reset: "रीसेट करें",
    download: "डाउनलोड करें",
    errorRead: "इस छवि को पढ़ा नहीं जा सका: ",
    errorExport: "निर्यात नहीं किया जा सका: ",
    privacy: "Canvas के जरिए आपके ब्राउज़र में 100% प्रसंस्करण — आपकी छवि कभी अपलोड नहीं होती।",
  },
  tr: {
    uploadImage: "Görsel yükle",
    uploadHint: "JPG, PNG veya WebP — tarayıcınızda ayarlanır",
    brightness: "Parlaklık",
    contrast: "Kontrast",
    saturation: "Doygunluk",
    hue: "Ton",
    export: "Dışa aktar",
    reset: "Sıfırla",
    download: "İndir",
    errorRead: "Bu görsel okunamadı: ",
    errorExport: "Dışa aktarılamadı: ",
    privacy: "Canvas aracılığıyla tarayıcınızda %100 işlenir — görseliniz asla yüklenmez.",
  },
  id: {
    uploadImage: "Unggah gambar",
    uploadHint: "JPG, PNG atau WebP — disesuaikan di browser Anda",
    brightness: "Kecerahan",
    contrast: "Kontras",
    saturation: "Saturasi",
    hue: "Rona",
    export: "Ekspor",
    reset: "Reset",
    download: "Unduh",
    errorRead: "Tidak dapat membaca gambar ini: ",
    errorExport: "Tidak dapat mengekspor: ",
    privacy: "100% diproses di browser Anda melalui Canvas — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    uploadImage: "Tải lên hình ảnh",
    uploadHint: "JPG, PNG hoặc WebP — điều chỉnh trong trình duyệt của bạn",
    brightness: "Độ sáng",
    contrast: "Độ tương phản",
    saturation: "Độ bão hòa",
    hue: "Màu sắc",
    export: "Xuất",
    reset: "Đặt lại",
    download: "Tải xuống",
    errorRead: "Không thể đọc hình ảnh này: ",
    errorExport: "Không thể xuất: ",
    privacy: "100% xử lý trong trình duyệt của bạn qua Canvas — hình ảnh của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadImage: "Ladda upp bild",
    uploadHint: "JPG, PNG eller WebP — justeras i din webbläsare",
    brightness: "Ljusstyrka",
    contrast: "Kontrast",
    saturation: "Mättnad",
    hue: "Nyans",
    export: "Exportera",
    reset: "Återställ",
    download: "Ladda ned",
    errorRead: "Kunde inte läsa denna bild: ",
    errorExport: "Kunde inte exportera: ",
    privacy: "100% bearbetas i din webbläsare via Canvas — din bild laddas aldrig upp.",
  },
  pl: {
    uploadImage: "Prześlij obraz",
    uploadHint: "JPG, PNG lub WebP — dostosowany w przeglądarce",
    brightness: "Jasność",
    contrast: "Kontrast",
    saturation: "Nasycenie",
    hue: "Odcień",
    export: "Eksportuj",
    reset: "Resetuj",
    download: "Pobierz",
    errorRead: "Nie można odczytać tego obrazu: ",
    errorExport: "Nie można eksportować: ",
    privacy: "100% przetwarzane w przeglądarce przez Canvas — Twój obraz nigdy nie jest przesyłany.",
  },
  uk: {
    uploadImage: "Завантажити зображення",
    uploadHint: "JPG, PNG або WebP — налаштовується у вашому браузері",
    brightness: "Яскравість",
    contrast: "Контрастність",
    saturation: "Насиченість",
    hue: "Відтінок",
    export: "Експортувати",
    reset: "Скинути",
    download: "Завантажити",
    errorRead: "Не вдалося прочитати це зображення: ",
    errorExport: "Не вдалося експортувати: ",
    privacy: "100% у вашому браузері через Canvas — ваше зображення ніколи не завантажується.",
  },
  cs: {
    uploadImage: "Nahrát obrázek",
    uploadHint: "JPG, PNG nebo WebP — upraveno ve vašem prohlížeči",
    brightness: "Jas",
    contrast: "Kontrast",
    saturation: "Sytost",
    hue: "Odstín",
    export: "Exportovat",
    reset: "Resetovat",
    download: "Stáhnout",
    errorRead: "Tento obrázek se nepodařilo načíst: ",
    errorExport: "Export se nezdařil: ",
    privacy: "100% zpracováno ve vašem prohlížeči přes Canvas — váš obrázek se nikdy nenahrává.",
  },
};

export function AdjustImageClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [bmp, setBmp] = useState<ImageBitmap | null>(null);
  const [adj, setAdj] = useState<Adj>(DEFAULTS);
  const [busy, setBusy] = useState(false);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanup = useRef<string | null>(null);
  const bmpRef = useRef<ImageBitmap | null>(null);

  useEffect(() => () => {
    if (cleanup.current) URL.revokeObjectURL(cleanup.current);
    // Close the *current* bitmap via a ref — an empty-dep cleanup would otherwise
    // capture the initial (null) bmp and leak the one actually loaded.
    if (bmpRef.current) bmpRef.current.close();
  }, []);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null);
    setFile(f);
    try {
      const b = await createImageBitmap(f);
      if (bmpRef.current) bmpRef.current.close();
      bmpRef.current = b;
      setBmp(b);
    } catch (e) {
      setError(`${s.errorRead}${(e as Error).message}`);
    }
  }

  // Re-render on adjustment change. Canvas filter handles all 4 in one pass.
  useEffect(() => {
    if (!bmp || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = bmp.width; canvas.height = bmp.height;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `brightness(${adj.brightness}%) contrast(${adj.contrast}%) saturate(${adj.saturation}%) hue-rotate(${adj.hue}deg)`;
    ctx.drawImage(bmp, 0, 0);
  }, [bmp, adj]);

  async function exportImage() {
    if (!canvasRef.current || !file) return;
    setBusy(true);
    try {
      const type = file.type === "image/jpeg" ? "image/jpeg" : "image/png";
      const blob: Blob = await new Promise((res, rej) =>
        canvasRef.current!.toBlob((b) => (b ? res(b) : rej(new Error("blob_failed"))), type, 0.95),
      );
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
    } catch (e) {
      setError(`${s.errorExport}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function reset() { setAdj(DEFAULTS); }
  const dirty = JSON.stringify(adj) !== JSON.stringify(DEFAULTS);

  const downloadName = file ? file.name.replace(/(\.[^.]+)?$/, "-adjusted$1") : "adjusted.png";

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadImage}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { if (bmpRef.current) { bmpRef.current.close(); bmpRef.current = null; } setFile(null); setBmp(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {bmp && (
        <>
          <div className="rounded-lg border border-ink-100 bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-3">
            <canvas ref={canvasRef} className="mx-auto block max-h-96 max-w-full object-contain" />
          </div>

          <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
            <Slider label={`${s.brightness}: ${adj.brightness}%`} min={0} max={200} value={adj.brightness} onChange={(v) => setAdj((a) => ({ ...a, brightness: v }))} />
            <Slider label={`${s.contrast}: ${adj.contrast}%`} min={0} max={200} value={adj.contrast} onChange={(v) => setAdj((a) => ({ ...a, contrast: v }))} />
            <Slider label={`${s.saturation}: ${adj.saturation}%`} min={0} max={200} value={adj.saturation} onChange={(v) => setAdj((a) => ({ ...a, saturation: v }))} />
            <Slider label={`${s.hue}: ${adj.hue}°`} min={-180} max={180} value={adj.hue} onChange={(v) => setAdj((a) => ({ ...a, hue: v }))} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={exportImage} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {s.export}
            </Button>
            {dirty && (
              <Button size="lg" variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" /> {s.reset}
              </Button>
            )}
            {outUrl && (
              <a href={outUrl} download={downloadName}>
                <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.download} · {formatBytes(outSize)}</Button>
              </a>
            )}
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}

function Slider({ label, min, max, value, onChange }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex flex-col text-xs font-medium text-ink-600">
      {label}
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1" />
    </label>
  );
}
