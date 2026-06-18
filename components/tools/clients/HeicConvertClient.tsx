"use client";

import { useCallback, useState } from "react";
import { Download, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

// HEIC is the iPhone photo format and only Safari decodes it natively. We
// ship a converter for every other browser by loading heic2any (libheif
// compiled to wasm) from esm.sh at runtime — same pattern as the background
// removal tool, so webpack/SWC never sees the wasm bundle and the main
// chunk stays slim.
type Heic2Any = (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>;

async function loadHeic2Any(): Promise<Heic2Any> {
  const url = "https://esm.sh/heic2any@0.0.4?bundle";
  const mod = await import(/* webpackIgnore: true */ url) as { default: Heic2Any };
  return mod.default;
}

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Drop your HEIC / HEIF image",
    dropHint: "Conversion runs in your browser via WebAssembly — your photo is never uploaded.",
    jpgQuality: "JPG quality",
    converting: "Converting…",
    convertTo: "Convert to",
    download: "Download",
    wasmHint: "First conversion fetches ~2 MB of WebAssembly from the browser CDN — subsequent ones are instant.",
    errorFallback: "Could not convert this file.",
  },
  fr: {
    dropLabel: "Déposez votre image HEIC / HEIF",
    dropHint: "La conversion s'effectue dans votre navigateur via WebAssembly — votre photo n'est jamais envoyée.",
    jpgQuality: "Qualité JPG",
    converting: "Conversion…",
    convertTo: "Convertir en",
    download: "Télécharger",
    wasmHint: "La première conversion télécharge ~2 Mo de WebAssembly depuis le CDN — les suivantes sont instantanées.",
    errorFallback: "Impossible de convertir ce fichier.",
  },
  es: {
    dropLabel: "Suelta tu imagen HEIC / HEIF",
    dropHint: "La conversión se realiza en tu navegador via WebAssembly — tu foto nunca se sube.",
    jpgQuality: "Calidad JPG",
    converting: "Convirtiendo…",
    convertTo: "Convertir a",
    download: "Descargar",
    wasmHint: "La primera conversión descarga ~2 MB de WebAssembly desde la CDN — las siguientes son instantáneas.",
    errorFallback: "No se pudo convertir este archivo.",
  },
  pt: {
    dropLabel: "Solte sua imagem HEIC / HEIF",
    dropHint: "A conversão ocorre no seu navegador via WebAssembly — sua foto nunca é enviada.",
    jpgQuality: "Qualidade JPG",
    converting: "Convertendo…",
    convertTo: "Converter para",
    download: "Baixar",
    wasmHint: "A primeira conversão baixa ~2 MB de WebAssembly do CDN — as seguintes são instantâneas.",
    errorFallback: "Não foi possível converter este arquivo.",
  },
  de: {
    dropLabel: "HEIC / HEIF-Bild hier ablegen",
    dropHint: "Die Konvertierung läuft in Ihrem Browser via WebAssembly — Ihr Foto wird nie hochgeladen.",
    jpgQuality: "JPG-Qualität",
    converting: "Konvertierung…",
    convertTo: "Konvertieren in",
    download: "Herunterladen",
    wasmHint: "Die erste Konvertierung lädt ~2 MB WebAssembly vom Browser-CDN — danach sofort.",
    errorFallback: "Diese Datei konnte nicht konvertiert werden.",
  },
  it: {
    dropLabel: "Trascina qui la tua immagine HEIC / HEIF",
    dropHint: "La conversione avviene nel tuo browser via WebAssembly — la tua foto non viene mai caricata.",
    jpgQuality: "Qualità JPG",
    converting: "Conversione…",
    convertTo: "Converti in",
    download: "Scarica",
    wasmHint: "La prima conversione scarica ~2 MB di WebAssembly dal CDN — le successive sono immediate.",
    errorFallback: "Impossibile convertire questo file.",
  },
  nl: {
    dropLabel: "Zet uw HEIC / HEIF-afbeelding hier neer",
    dropHint: "Conversie verloopt in uw browser via WebAssembly — uw foto wordt nooit geüpload.",
    jpgQuality: "JPG-kwaliteit",
    converting: "Converteren…",
    convertTo: "Converteren naar",
    download: "Downloaden",
    wasmHint: "De eerste conversie laadt ~2 MB WebAssembly van de browser-CDN — daarna direct.",
    errorFallback: "Dit bestand kon niet worden geconverteerd.",
  },
  ja: {
    dropLabel: "HEIC / HEIF 画像をここにドロップ",
    dropHint: "変換はWebAssemblyでブラウザ内で実行 — 写真はアップロードされません。",
    jpgQuality: "JPG 品質",
    converting: "変換中…",
    convertTo: "変換先",
    download: "ダウンロード",
    wasmHint: "初回変換はブラウザCDNから約2MBのWebAssemblyを取得します — 以降は即時。",
    errorFallback: "このファイルを変換できませんでした。",
  },
  zh: {
    dropLabel: "将您的 HEIC / HEIF 图片拖放到此处",
    dropHint: "转换在您的浏览器中通过 WebAssembly 运行 — 您的照片不会被上传。",
    jpgQuality: "JPG 质量",
    converting: "转换中…",
    convertTo: "转换为",
    download: "下载",
    wasmHint: "首次转换从浏览器 CDN 获取约 2 MB 的 WebAssembly — 后续即时完成。",
    errorFallback: "无法转换此文件。",
  },
  ko: {
    dropLabel: "HEIC / HEIF 이미지를 여기에 놓으세요",
    dropHint: "변환은 WebAssembly를 통해 브라우저에서 실행됩니다 — 사진은 업로드되지 않습니다.",
    jpgQuality: "JPG 품질",
    converting: "변환 중…",
    convertTo: "변환 대상",
    download: "다운로드",
    wasmHint: "첫 번째 변환은 브라우저 CDN에서 ~2 MB의 WebAssembly를 가져옵니다 — 이후는 즉시.",
    errorFallback: "이 파일을 변환할 수 없습니다.",
  },
  ar: {
    dropLabel: "أسقط صورة HEIC / HEIF هنا",
    dropHint: "يتم التحويل في متصفحك عبر WebAssembly — لن يتم رفع صورتك مطلقًا.",
    jpgQuality: "جودة JPG",
    converting: "جاري التحويل…",
    convertTo: "تحويل إلى",
    download: "تنزيل",
    wasmHint: "يتم جلب ~2 MB من WebAssembly من CDN المتصفح في أول تحويل — ما يليه فوري.",
    errorFallback: "تعذّر تحويل هذا الملف.",
  },
  ru: {
    dropLabel: "Перетащите изображение HEIC / HEIF",
    dropHint: "Конвертация выполняется в браузере через WebAssembly — фото никогда не загружается.",
    jpgQuality: "Качество JPG",
    converting: "Конвертация…",
    convertTo: "Конвертировать в",
    download: "Скачать",
    wasmHint: "Первая конвертация загружает ~2 МБ WebAssembly из CDN браузера — последующие мгновенны.",
    errorFallback: "Не удалось конвертировать этот файл.",
  },
  hi: {
    dropLabel: "अपनी HEIC / HEIF छवि यहाँ छोड़ें",
    dropHint: "रूपांतरण WebAssembly के माध्यम से आपके ब्राउज़र में चलता है — आपकी फ़ोटो कभी अपलोड नहीं होती।",
    jpgQuality: "JPG गुणवत्ता",
    converting: "रूपांतरित हो रहा है…",
    convertTo: "इसमें बदलें",
    download: "डाउनलोड करें",
    wasmHint: "पहला रूपांतरण ब्राउज़र CDN से ~2 MB WebAssembly लाता है — अगले तत्काल होते हैं।",
    errorFallback: "इस फ़ाइल को परिवर्तित नहीं किया जा सका।",
  },
  tr: {
    dropLabel: "HEIC / HEIF görselinizi buraya bırakın",
    dropHint: "Dönüştürme WebAssembly aracılığıyla tarayıcınızda çalışır — fotoğrafınız asla yüklenmez.",
    jpgQuality: "JPG kalitesi",
    converting: "Dönüştürülüyor…",
    convertTo: "Dönüştür:",
    download: "İndir",
    wasmHint: "İlk dönüştürme, tarayıcı CDN'sinden ~2 MB WebAssembly indirir — sonrakiler anında gerçekleşir.",
    errorFallback: "Bu dosya dönüştürülemedi.",
  },
  id: {
    dropLabel: "Letakkan gambar HEIC / HEIF Anda di sini",
    dropHint: "Konversi berjalan di browser Anda melalui WebAssembly — foto Anda tidak pernah diunggah.",
    jpgQuality: "Kualitas JPG",
    converting: "Mengonversi…",
    convertTo: "Konversi ke",
    download: "Unduh",
    wasmHint: "Konversi pertama mengunduh ~2 MB WebAssembly dari CDN browser — berikutnya instan.",
    errorFallback: "Tidak dapat mengonversi file ini.",
  },
  vi: {
    dropLabel: "Thả hình ảnh HEIC / HEIF của bạn vào đây",
    dropHint: "Chuyển đổi chạy trong trình duyệt của bạn qua WebAssembly — ảnh của bạn không bao giờ được tải lên.",
    jpgQuality: "Chất lượng JPG",
    converting: "Đang chuyển đổi…",
    convertTo: "Chuyển đổi sang",
    download: "Tải xuống",
    wasmHint: "Lần chuyển đổi đầu tiên tải ~2 MB WebAssembly từ CDN trình duyệt — những lần sau là tức thì.",
    errorFallback: "Không thể chuyển đổi tệp này.",
  },
  sv: {
    dropLabel: "Släpp din HEIC / HEIF-bild här",
    dropHint: "Konverteringen körs i din webbläsare via WebAssembly — ditt foto laddas aldrig upp.",
    jpgQuality: "JPG-kvalitet",
    converting: "Konverterar…",
    convertTo: "Konvertera till",
    download: "Ladda ned",
    wasmHint: "Den första konverteringen hämtar ~2 MB WebAssembly från webbläsarens CDN — efterföljande är omedelbara.",
    errorFallback: "Kunde inte konvertera den här filen.",
  },
  pl: {
    dropLabel: "Upuść obraz HEIC / HEIF tutaj",
    dropHint: "Konwersja działa w przeglądarce przez WebAssembly — Twoje zdjęcie nigdy nie jest przesyłane.",
    jpgQuality: "Jakość JPG",
    converting: "Konwertowanie…",
    convertTo: "Konwertuj do",
    download: "Pobierz",
    wasmHint: "Pierwsza konwersja pobiera ~2 MB WebAssembly z CDN przeglądarki — kolejne są natychmiastowe.",
    errorFallback: "Nie można skonwertować tego pliku.",
  },
  uk: {
    dropLabel: "Перетягніть зображення HEIC / HEIF сюди",
    dropHint: "Конвертація виконується у вашому браузері через WebAssembly — фото ніколи не завантажується.",
    jpgQuality: "Якість JPG",
    converting: "Конвертація…",
    convertTo: "Конвертувати в",
    download: "Завантажити",
    wasmHint: "Перша конвертація завантажує ~2 МБ WebAssembly з CDN браузера — наступні миттєві.",
    errorFallback: "Не вдалося конвертувати цей файл.",
  },
  cs: {
    dropLabel: "Přetáhněte obrázek HEIC / HEIF sem",
    dropHint: "Konverze probíhá ve vašem prohlížeči přes WebAssembly — vaše fotografie se nikdy nenahrává.",
    jpgQuality: "Kvalita JPG",
    converting: "Konvertování…",
    convertTo: "Převést na",
    download: "Stáhnout",
    wasmHint: "První konverze stáhne ~2 MB WebAssembly z CDN prohlížeče — následující jsou okamžité.",
    errorFallback: "Tento soubor se nepodařilo převést.",
  },
};

export function HeicConvertClient({ target }: { target: "jpeg" | "png" }) {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number; name: string } | null>(null);
  const [quality, setQuality] = useState(92);

  const targetMime = target === "jpeg" ? "image/jpeg" : "image/png";
  const targetExt = target === "jpeg" ? "jpg" : "png";

  const onFile = useCallback((f: File) => {
    if (out) URL.revokeObjectURL(out.url);
    setOut(null); setError(null); setFile(f);
  }, [out]);

  const convert = useCallback(async () => {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const heic2any = await loadHeic2Any();
      // Some iPhones save .heic that are actually JPEG containers — heic2any
      // throws "input is not HEIC". Fall back to passing the file straight
      // through a canvas re-encode in that case.
      let outBlob: Blob;
      try {
        const r = await heic2any({ blob: file, toType: targetMime, quality: quality / 100 });
        outBlob = Array.isArray(r) ? r[0] : r;
      } catch (heicErr) {
        const msg = heicErr instanceof Error ? heicErr.message : String(heicErr);
        if (/not HEIC|format is not/i.test(msg)) {
          const img = await loadImage(file);
          const c = document.createElement("canvas");
          c.width = img.naturalWidth; c.height = img.naturalHeight;
          const ctx = c.getContext("2d")!;
          if (targetMime === "image/jpeg") { ctx.fillStyle = "white"; ctx.fillRect(0, 0, c.width, c.height); }
          ctx.drawImage(img, 0, 0);
          outBlob = await new Promise<Blob>((res, rej) =>
            c.toBlob((b) => (b ? res(b) : rej(new Error("encoding failed"))), targetMime, quality / 100),
          );
        } else {
          throw heicErr;
        }
      }
      const name = file.name.replace(/\.(heic|heif)$/i, "") + "." + targetExt;
      setOut({ url: URL.createObjectURL(outBlob), size: outBlob.size, name });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.errorFallback);
    } finally {
      setBusy(false);
    }
  }, [file, targetMime, targetExt, quality, s.errorFallback]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setOut(null); setError(null);
  };

  if (!file) {
    return (
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/heic": [".heic", ".heif"], "image/heif": [".heif"] }}
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
        <div className="min-w-0 truncate text-sm text-ink-700">
          {file.name} <span className="text-ink-400">({formatBytes(file.size)})</span>
        </div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      {target === "jpeg" && (
        <label className="flex flex-col text-xs font-medium text-ink-600 sm:w-64">
          {s.jpgQuality} {quality}%
          <input type="range" min={50} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="accent-brand-500" />
        </label>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={convert} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{s.converting}</> : `${s.convertTo} ${target.toUpperCase()}`}
        </Button>
        {out && (
          <a href={out.url} download={out.name}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>

      <p className="text-xs text-ink-400">
        {s.wasmHint}
      </p>
    </div>
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); res(img); };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("Could not read image.")); };
    img.src = url;
  });
}
