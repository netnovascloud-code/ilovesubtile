"use client";

import { useState } from "react";
import { Upload, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

type ZX = {
  BrowserMultiFormatReader: new () => {
    decodeFromImageUrl: (url: string) => Promise<{ getText(): string; getBarcodeFormat(): number } | undefined>;
  };
  BarcodeFormat?: Record<number, string>;
};

async function loadZxing(): Promise<ZX> {
  const url = "https://esm.sh/@zxing/library@0.21.3";
  return (await import(/* webpackIgnore: true */ url)) as ZX;
}

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload an image with a barcode",
    uploadSub: "EAN, UPC, Code 128, QR — decoded in your browser",
    decoding: "Decoding…",
    copy: "Copy",
    copied: "Copied",
    privacy: "100% in your browser via @zxing/library — your image is never uploaded.",
    noBarcode: "No barcode detected. Try a clearer photo or a tighter crop.",
    readError: "Could not read the image: ",
  },
  fr: {
    uploadLabel: "Charger une image avec un code-barres",
    uploadSub: "EAN, UPC, Code 128, QR — décodé dans votre navigateur",
    decoding: "Décodage…",
    copy: "Copier",
    copied: "Copié",
    privacy: "100 % dans votre navigateur via @zxing/library — votre image n'est jamais envoyée.",
    noBarcode: "Aucun code-barres détecté. Essayez une photo plus nette ou un recadrage plus serré.",
    readError: "Impossible de lire l'image : ",
  },
  es: {
    uploadLabel: "Subir una imagen con un código de barras",
    uploadSub: "EAN, UPC, Code 128, QR — decodificado en tu navegador",
    decoding: "Decodificando…",
    copy: "Copiar",
    copied: "Copiado",
    privacy: "100 % en tu navegador vía @zxing/library — tu imagen nunca se sube.",
    noBarcode: "No se detectó ningún código de barras. Prueba con una foto más nítida o un recorte más ajustado.",
    readError: "No se pudo leer la imagen: ",
  },
  pt: {
    uploadLabel: "Enviar uma imagem com código de barras",
    uploadSub: "EAN, UPC, Code 128, QR — decodificado no seu navegador",
    decoding: "Decodificando…",
    copy: "Copiar",
    copied: "Copiado",
    privacy: "100% no seu navegador via @zxing/library — a sua imagem nunca é enviada.",
    noBarcode: "Nenhum código de barras detectado. Tente uma foto mais nítida ou um recorte mais próximo.",
    readError: "Não foi possível ler a imagem: ",
  },
  de: {
    uploadLabel: "Bild mit Barcode hochladen",
    uploadSub: "EAN, UPC, Code 128, QR — im Browser dekodiert",
    decoding: "Dekodierung…",
    copy: "Kopieren",
    copied: "Kopiert",
    privacy: "100 % im Browser via @zxing/library — Ihr Bild wird niemals hochgeladen.",
    noBarcode: "Kein Barcode erkannt. Versuchen Sie ein schärferes Foto oder einen engeren Ausschnitt.",
    readError: "Bild konnte nicht gelesen werden: ",
  },
  it: {
    uploadLabel: "Carica un'immagine con codice a barre",
    uploadSub: "EAN, UPC, Code 128, QR — decodificato nel tuo browser",
    decoding: "Decodifica…",
    copy: "Copia",
    copied: "Copiato",
    privacy: "100% nel tuo browser tramite @zxing/library — la tua immagine non viene mai caricata.",
    noBarcode: "Nessun codice a barre rilevato. Prova con una foto più nitida o un ritaglio più ravvicinato.",
    readError: "Impossibile leggere l'immagine: ",
  },
  nl: {
    uploadLabel: "Afbeelding met streepjescode uploaden",
    uploadSub: "EAN, UPC, Code 128, QR — gedecodeerd in uw browser",
    decoding: "Decoderen…",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    privacy: "100% in uw browser via @zxing/library — uw afbeelding wordt nooit geüpload.",
    noBarcode: "Geen streepjescode gevonden. Probeer een scherpere foto of een nauwere uitsnede.",
    readError: "Afbeelding kon niet worden gelezen: ",
  },
  ja: {
    uploadLabel: "バーコード付きの画像をアップロード",
    uploadSub: "EAN、UPC、Code 128、QR — ブラウザでデコード",
    decoding: "デコード中…",
    copy: "コピー",
    copied: "コピー済み",
    privacy: "@zxing/library を使用してブラウザ内で 100% 処理 — 画像はアップロードされません。",
    noBarcode: "バーコードが検出されませんでした。より鮮明な写真またはより近いトリミングをお試しください。",
    readError: "画像を読み取れませんでした: ",
  },
  zh: {
    uploadLabel: "上传含条形码的图片",
    uploadSub: "EAN、UPC、Code 128、QR — 在浏览器中解码",
    decoding: "解码中…",
    copy: "复制",
    copied: "已复制",
    privacy: "通过 @zxing/library 在您的浏览器中 100% 处理 — 您的图片永远不会上传。",
    noBarcode: "未检测到条形码。请尝试更清晰的照片或更近的裁剪。",
    readError: "无法读取图片: ",
  },
  ko: {
    uploadLabel: "바코드가 있는 이미지 업로드",
    uploadSub: "EAN, UPC, Code 128, QR — 브라우저에서 디코딩",
    decoding: "디코딩 중…",
    copy: "복사",
    copied: "복사됨",
    privacy: "@zxing/library를 통해 브라우저에서 100% 처리 — 이미지는 절대 업로드되지 않습니다.",
    noBarcode: "바코드가 감지되지 않았습니다. 더 선명한 사진이나 더 가까운 자르기를 시도해보세요.",
    readError: "이미지를 읽을 수 없습니다: ",
  },
  ar: {
    uploadLabel: "تحميل صورة تحتوي على باركود",
    uploadSub: "EAN أو UPC أو Code 128 أو QR — يُفكَّك في متصفحك",
    decoding: "جارٍ الفكّ…",
    copy: "نسخ",
    copied: "تم النسخ",
    privacy: "100٪ في متصفحك عبر @zxing/library — صورتك لا تُرفع أبداً.",
    noBarcode: "لم يُكتشف باركود. جرّب صورة أوضح أو قصاصة أقرب.",
    readError: "تعذّرت قراءة الصورة: ",
  },
  ru: {
    uploadLabel: "Загрузить изображение со штрихкодом",
    uploadSub: "EAN, UPC, Code 128, QR — декодирование в браузере",
    decoding: "Декодирование…",
    copy: "Копировать",
    copied: "Скопировано",
    privacy: "100% в вашем браузере через @zxing/library — изображение никогда не загружается.",
    noBarcode: "Штрихкод не обнаружен. Попробуйте более чёткое фото или более тесную обрезку.",
    readError: "Не удалось прочитать изображение: ",
  },
  hi: {
    uploadLabel: "बारकोड वाली छवि अपलोड करें",
    uploadSub: "EAN, UPC, Code 128, QR — आपके ब्राउज़र में डीकोड",
    decoding: "डीकोड हो रहा है…",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    privacy: "@zxing/library के माध्यम से आपके ब्राउज़र में 100% — आपकी छवि कभी अपलोड नहीं होती।",
    noBarcode: "कोई बारकोड नहीं मिला। एक स्पष्ट फ़ोटो या करीबी क्रॉप आज़माएं।",
    readError: "छवि पढ़ नहीं सकी: ",
  },
  tr: {
    uploadLabel: "Barkodlu görsel yükle",
    uploadSub: "EAN, UPC, Code 128, QR — tarayıcınızda çözümlendi",
    decoding: "Çözümleniyor…",
    copy: "Kopyala",
    copied: "Kopyalandı",
    privacy: "Tarayıcınızda @zxing/library üzerinden %100 işlem — görseliniz asla yüklenmez.",
    noBarcode: "Barkod algılanmadı. Daha net bir fotoğraf veya daha yakın bir kırpma deneyin.",
    readError: "Görüntü okunamadı: ",
  },
  id: {
    uploadLabel: "Unggah gambar dengan barcode",
    uploadSub: "EAN, UPC, Code 128, QR — didekode di browser Anda",
    decoding: "Mendekode…",
    copy: "Salin",
    copied: "Disalin",
    privacy: "100% di browser Anda via @zxing/library — gambar Anda tidak pernah diunggah.",
    noBarcode: "Tidak ada barcode yang terdeteksi. Coba foto yang lebih tajam atau potongan yang lebih dekat.",
    readError: "Tidak dapat membaca gambar: ",
  },
  vi: {
    uploadLabel: "Tải lên hình ảnh có mã vạch",
    uploadSub: "EAN, UPC, Code 128, QR — giải mã trong trình duyệt của bạn",
    decoding: "Đang giải mã…",
    copy: "Sao chép",
    copied: "Đã sao chép",
    privacy: "100% trong trình duyệt của bạn qua @zxing/library — hình ảnh của bạn không bao giờ được tải lên.",
    noBarcode: "Không phát hiện mã vạch. Hãy thử ảnh rõ hơn hoặc cắt gần hơn.",
    readError: "Không thể đọc hình ảnh: ",
  },
  sv: {
    uploadLabel: "Ladda upp en bild med streckkod",
    uploadSub: "EAN, UPC, Code 128, QR — avkodas i din webbläsare",
    decoding: "Avkodar…",
    copy: "Kopiera",
    copied: "Kopierat",
    privacy: "100 % i din webbläsare via @zxing/library — din bild laddas aldrig upp.",
    noBarcode: "Ingen streckkod hittades. Försök med ett skarpare foto eller en tätare beskärning.",
    readError: "Kunde inte läsa bilden: ",
  },
  pl: {
    uploadLabel: "Prześlij obraz z kodem kreskowym",
    uploadSub: "EAN, UPC, Code 128, QR — dekodowane w przeglądarce",
    decoding: "Dekodowanie…",
    copy: "Kopiuj",
    copied: "Skopiowano",
    privacy: "100% w Twojej przeglądarce przez @zxing/library — obraz nigdy nie jest wysyłany.",
    noBarcode: "Nie wykryto kodu kreskowego. Spróbuj ostrzejszego zdjęcia lub bliższego kadrowania.",
    readError: "Nie można odczytać obrazu: ",
  },
  uk: {
    uploadLabel: "Завантажити зображення зі штрихкодом",
    uploadSub: "EAN, UPC, Code 128, QR — декодується у браузері",
    decoding: "Декодування…",
    copy: "Копіювати",
    copied: "Скопійовано",
    privacy: "100% у вашому браузері через @zxing/library — зображення ніколи не завантажується.",
    noBarcode: "Штрихкод не виявлено. Спробуйте чіткіше фото або ближче кадрування.",
    readError: "Не вдалося прочитати зображення: ",
  },
  cs: {
    uploadLabel: "Nahrát obrázek s čárovým kódem",
    uploadSub: "EAN, UPC, Code 128, QR — dekódováno ve vašem prohlížeči",
    decoding: "Dekódování…",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    privacy: "100 % ve vašem prohlížeči přes @zxing/library — váš obrázek není nikdy nahrán.",
    noBarcode: "Žádný čárový kód nebyl nalezen. Zkuste ostřejší fotku nebo těsnější ořez.",
    readError: "Obrázek nelze přečíst: ",
  },
};

export function BarcodeReaderClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ text: string; format: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null); setResult(null);
    setFile(f);
    if (srcUrl) URL.revokeObjectURL(srcUrl); const url = URL.createObjectURL(f);
    setSrcUrl(url);
    setBusy(true);
    try {
      const zx = await loadZxing();
      const reader = new zx.BrowserMultiFormatReader();
      const r = await reader.decodeFromImageUrl(url);
      if (!r) { setError(s.noBarcode); return; }
      const formatId = r.getBarcodeFormat();
      const formatName = zx.BarcodeFormat ? (zx.BarcodeFormat[formatId] ?? String(formatId)) : String(formatId);
      setResult({ text: r.getText(), format: String(formatName) });
    } catch (e) {
      setError(`${s.readError}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.text); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-slate-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadSub}</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span></div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setResult(null); setError(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {srcUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={srcUrl} alt="Source" className="mx-auto max-h-64 rounded object-contain" />
        </div>
      )}

      {busy && <p className="text-sm text-ink-500">{s.decoding}</p>}

      {result && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-4">
          <p className="text-xs uppercase tracking-wide text-emerald-700">{result.format}</p>
          <p className="mt-2 break-all font-mono text-base text-ink-900">{result.text}</p>
          <Button size="sm" variant="outline" className="mt-3" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? s.copied : s.copy}
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
