"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Copy, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

/** jsQR loaded from a CDN at runtime so webpack/SWC never see it.
 *  jsQR exports a default function that decodes a Uint8ClampedArray (RGBA). */
type JsQR = (data: Uint8ClampedArray, width: number, height: number) => null | { data: string; location: unknown };

async function loadJsQR(): Promise<JsQR> {
  const url = "https://esm.sh/jsqr@1.4.0";
  const mod = (await import(/* webpackIgnore: true */ url)) as { default: JsQR } | JsQR;
  return (typeof mod === "function" ? mod : (mod as { default: JsQR }).default);
}

function tryDetect(jsQR: JsQR, bmp: ImageBitmap): string | null {
  // Cap the work canvas so giant photos don't grind.
  const max = 1024;
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bmp, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);
  const r = jsQR(data, w, h);
  return r ? r.data : null;
}

const T: Record<string, Record<string, string>> = {
  en: {
    uploadImage: "Upload an image",
    uploadSub: "JPG, PNG or WebP — decoded in your browser",
    scanCamera: "Scan from camera",
    scanSub: "Live scan via your device camera",
    stop: "Stop",
    decoding: "Decoding…",
    decoded: "Decoded",
    copy: "Copy",
    copied: "Copied",
    openLink: "Open link",
    privacy: "100% in your browser via jsQR — your image is never uploaded.",
    noQr: "No QR code detected in this image. Try a sharper photo or a closer crop.",
    readError: "Could not read the image: ",
    cameraError: "Camera access denied: ",
  },
  fr: {
    uploadImage: "Charger une image",
    uploadSub: "JPG, PNG ou WebP — décodé dans votre navigateur",
    scanCamera: "Scanner avec la caméra",
    scanSub: "Scan en direct via la caméra de votre appareil",
    stop: "Arrêter",
    decoding: "Décodage…",
    decoded: "Décodé",
    copy: "Copier",
    copied: "Copié",
    openLink: "Ouvrir le lien",
    privacy: "100 % dans votre navigateur via jsQR — votre image n'est jamais envoyée.",
    noQr: "Aucun QR code détecté. Essayez une photo plus nette ou un recadrage plus serré.",
    readError: "Impossible de lire l'image : ",
    cameraError: "Accès à la caméra refusé : ",
  },
  es: {
    uploadImage: "Subir una imagen",
    uploadSub: "JPG, PNG o WebP — decodificado en tu navegador",
    scanCamera: "Escanear con la cámara",
    scanSub: "Escaneo en vivo a través de la cámara del dispositivo",
    stop: "Detener",
    decoding: "Decodificando…",
    decoded: "Decodificado",
    copy: "Copiar",
    copied: "Copiado",
    openLink: "Abrir enlace",
    privacy: "100 % en tu navegador vía jsQR — tu imagen nunca se sube.",
    noQr: "No se detectó ningún código QR. Prueba con una foto más nítida o un recorte más ajustado.",
    readError: "No se pudo leer la imagen: ",
    cameraError: "Acceso a la cámara denegado: ",
  },
  pt: {
    uploadImage: "Enviar uma imagem",
    uploadSub: "JPG, PNG ou WebP — decodificado no seu navegador",
    scanCamera: "Escanear com a câmara",
    scanSub: "Scan ao vivo pela câmara do dispositivo",
    stop: "Parar",
    decoding: "Decodificando…",
    decoded: "Decodificado",
    copy: "Copiar",
    copied: "Copiado",
    openLink: "Abrir link",
    privacy: "100% no seu navegador via jsQR — a sua imagem nunca é enviada.",
    noQr: "Nenhum QR code detectado nesta imagem. Tente uma foto mais nítida ou um recorte mais próximo.",
    readError: "Não foi possível ler a imagem: ",
    cameraError: "Acesso à câmara negado: ",
  },
  de: {
    uploadImage: "Bild hochladen",
    uploadSub: "JPG, PNG oder WebP — im Browser dekodiert",
    scanCamera: "Mit Kamera scannen",
    scanSub: "Live-Scan über Ihre Gerätekamera",
    stop: "Stoppen",
    decoding: "Dekodierung…",
    decoded: "Dekodiert",
    copy: "Kopieren",
    copied: "Kopiert",
    openLink: "Link öffnen",
    privacy: "100 % im Browser via jsQR — Ihr Bild wird niemals hochgeladen.",
    noQr: "Kein QR-Code erkannt. Versuchen Sie ein schärferes Foto oder einen engeren Ausschnitt.",
    readError: "Bild konnte nicht gelesen werden: ",
    cameraError: "Kamerazugriff verweigert: ",
  },
  it: {
    uploadImage: "Carica un'immagine",
    uploadSub: "JPG, PNG o WebP — decodificato nel tuo browser",
    scanCamera: "Scansione con la fotocamera",
    scanSub: "Scansione live tramite la fotocamera del dispositivo",
    stop: "Ferma",
    decoding: "Decodifica…",
    decoded: "Decodificato",
    copy: "Copia",
    copied: "Copiato",
    openLink: "Apri link",
    privacy: "100% nel tuo browser tramite jsQR — la tua immagine non viene mai caricata.",
    noQr: "Nessun codice QR rilevato. Prova con una foto più nitida o un ritaglio più ravvicinato.",
    readError: "Impossibile leggere l'immagine: ",
    cameraError: "Accesso alla fotocamera negato: ",
  },
  nl: {
    uploadImage: "Afbeelding uploaden",
    uploadSub: "JPG, PNG of WebP — gedecodeerd in uw browser",
    scanCamera: "Scannen met camera",
    scanSub: "Live scan via de camera van uw apparaat",
    stop: "Stoppen",
    decoding: "Decoderen…",
    decoded: "Gedecodeerd",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    openLink: "Link openen",
    privacy: "100% in uw browser via jsQR — uw afbeelding wordt nooit geüpload.",
    noQr: "Geen QR-code gevonden. Probeer een scherpere foto of een nauwere uitsnede.",
    readError: "Afbeelding kon niet worden gelezen: ",
    cameraError: "Cameratoegang geweigerd: ",
  },
  ja: {
    uploadImage: "画像をアップロード",
    uploadSub: "JPG、PNG または WebP — ブラウザでデコード",
    scanCamera: "カメラでスキャン",
    scanSub: "デバイスのカメラでライブスキャン",
    stop: "停止",
    decoding: "デコード中…",
    decoded: "デコード済み",
    copy: "コピー",
    copied: "コピー済み",
    openLink: "リンクを開く",
    privacy: "jsQR を使用してブラウザ内で 100% 処理 — 画像はアップロードされません。",
    noQr: "この画像に QR コードが見つかりません。より鮮明な写真またはより近いトリミングをお試しください。",
    readError: "画像を読み取れませんでした: ",
    cameraError: "カメラへのアクセスが拒否されました: ",
  },
  zh: {
    uploadImage: "上传图片",
    uploadSub: "JPG、PNG 或 WebP — 在浏览器中解码",
    scanCamera: "使用摄像头扫描",
    scanSub: "通过设备摄像头进行实时扫描",
    stop: "停止",
    decoding: "解码中…",
    decoded: "已解码",
    copy: "复制",
    copied: "已复制",
    openLink: "打开链接",
    privacy: "通过 jsQR 在您的浏览器中 100% 处理 — 您的图片永远不会上传。",
    noQr: "此图片中未检测到二维码。请尝试更清晰的照片或更近的裁剪。",
    readError: "无法读取图片: ",
    cameraError: "摄像头访问被拒绝: ",
  },
  ko: {
    uploadImage: "이미지 업로드",
    uploadSub: "JPG, PNG 또는 WebP — 브라우저에서 디코딩",
    scanCamera: "카메라로 스캔",
    scanSub: "기기 카메라를 통한 실시간 스캔",
    stop: "중지",
    decoding: "디코딩 중…",
    decoded: "디코딩됨",
    copy: "복사",
    copied: "복사됨",
    openLink: "링크 열기",
    privacy: "jsQR을 통해 브라우저에서 100% 처리 — 이미지는 절대 업로드되지 않습니다.",
    noQr: "이 이미지에서 QR 코드가 감지되지 않았습니다. 더 선명한 사진이나 더 가까운 자르기를 시도해보세요.",
    readError: "이미지를 읽을 수 없습니다: ",
    cameraError: "카메라 접근이 거부되었습니다: ",
  },
  ar: {
    uploadImage: "تحميل صورة",
    uploadSub: "JPG أو PNG أو WebP — يُفكَّك في متصفحك",
    scanCamera: "المسح بالكاميرا",
    scanSub: "مسح مباشر عبر كاميرا جهازك",
    stop: "إيقاف",
    decoding: "جارٍ الفكّ…",
    decoded: "تم الفكّ",
    copy: "نسخ",
    copied: "تم النسخ",
    openLink: "فتح الرابط",
    privacy: "100٪ في متصفحك عبر jsQR — صورتك لا تُرفع أبداً.",
    noQr: "لم يُكتشف رمز QR في هذه الصورة. جرّب صورة أوضح أو قصاصة أقرب.",
    readError: "تعذّرت قراءة الصورة: ",
    cameraError: "رُفض الوصول إلى الكاميرا: ",
  },
  ru: {
    uploadImage: "Загрузить изображение",
    uploadSub: "JPG, PNG или WebP — декодирование в браузере",
    scanCamera: "Сканировать с камеры",
    scanSub: "Живое сканирование через камеру устройства",
    stop: "Остановить",
    decoding: "Декодирование…",
    decoded: "Декодировано",
    copy: "Копировать",
    copied: "Скопировано",
    openLink: "Открыть ссылку",
    privacy: "100% в вашем браузере через jsQR — изображение никогда не загружается.",
    noQr: "QR-код не обнаружен. Попробуйте более чёткое фото или более тесную обрезку.",
    readError: "Не удалось прочитать изображение: ",
    cameraError: "Доступ к камере запрещён: ",
  },
  hi: {
    uploadImage: "एक छवि अपलोड करें",
    uploadSub: "JPG, PNG या WebP — आपके ब्राउज़र में डीकोड",
    scanCamera: "कैमरे से स्कैन करें",
    scanSub: "डिवाइस कैमरे के माध्यम से लाइव स्कैन",
    stop: "रोकें",
    decoding: "डीकोड हो रहा है…",
    decoded: "डीकोड किया गया",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    openLink: "लिंक खोलें",
    privacy: "jsQR के माध्यम से आपके ब्राउज़र में 100% — आपकी छवि कभी अपलोड नहीं होती।",
    noQr: "इस छवि में कोई QR कोड नहीं मिला। एक स्पष्ट फ़ोटो या करीबी क्रॉप आज़माएं।",
    readError: "छवि पढ़ नहीं सकी: ",
    cameraError: "कैमरा एक्सेस अस्वीकृत: ",
  },
  tr: {
    uploadImage: "Görsel yükle",
    uploadSub: "JPG, PNG veya WebP — tarayıcınızda çözümlendi",
    scanCamera: "Kamerayla tara",
    scanSub: "Cihaz kameranız aracılığıyla canlı tarama",
    stop: "Durdur",
    decoding: "Çözümleniyor…",
    decoded: "Çözümlendi",
    copy: "Kopyala",
    copied: "Kopyalandı",
    openLink: "Bağlantıyı aç",
    privacy: "Tarayıcınızda jsQR üzerinden %100 işlem — görseliniz asla yüklenmez.",
    noQr: "Bu görüntüde QR kodu algılanmadı. Daha net bir fotoğraf veya daha yakın bir kırpma deneyin.",
    readError: "Görüntü okunamadı: ",
    cameraError: "Kamera erişimi reddedildi: ",
  },
  id: {
    uploadImage: "Unggah gambar",
    uploadSub: "JPG, PNG atau WebP — didekode di browser Anda",
    scanCamera: "Pindai dengan kamera",
    scanSub: "Pindai langsung melalui kamera perangkat Anda",
    stop: "Berhenti",
    decoding: "Mendekode…",
    decoded: "Terdekode",
    copy: "Salin",
    copied: "Disalin",
    openLink: "Buka tautan",
    privacy: "100% di browser Anda via jsQR — gambar Anda tidak pernah diunggah.",
    noQr: "Tidak ada kode QR yang terdeteksi. Coba foto yang lebih tajam atau potongan yang lebih dekat.",
    readError: "Tidak dapat membaca gambar: ",
    cameraError: "Akses kamera ditolak: ",
  },
  vi: {
    uploadImage: "Tải lên hình ảnh",
    uploadSub: "JPG, PNG hoặc WebP — giải mã trong trình duyệt của bạn",
    scanCamera: "Quét bằng camera",
    scanSub: "Quét trực tiếp qua camera thiết bị",
    stop: "Dừng",
    decoding: "Đang giải mã…",
    decoded: "Đã giải mã",
    copy: "Sao chép",
    copied: "Đã sao chép",
    openLink: "Mở liên kết",
    privacy: "100% trong trình duyệt của bạn qua jsQR — hình ảnh của bạn không bao giờ được tải lên.",
    noQr: "Không phát hiện mã QR trong ảnh này. Hãy thử ảnh rõ hơn hoặc cắt gần hơn.",
    readError: "Không thể đọc hình ảnh: ",
    cameraError: "Truy cập camera bị từ chối: ",
  },
  sv: {
    uploadImage: "Ladda upp en bild",
    uploadSub: "JPG, PNG eller WebP — avkodas i din webbläsare",
    scanCamera: "Skanna med kamera",
    scanSub: "Liveskanning via enhetens kamera",
    stop: "Stopp",
    decoding: "Avkodar…",
    decoded: "Avkodat",
    copy: "Kopiera",
    copied: "Kopierat",
    openLink: "Öppna länk",
    privacy: "100 % i din webbläsare via jsQR — din bild laddas aldrig upp.",
    noQr: "Ingen QR-kod hittades i bilden. Försök med ett skarpare foto eller en tätare beskärning.",
    readError: "Kunde inte läsa bilden: ",
    cameraError: "Kameraåtkomst nekad: ",
  },
  pl: {
    uploadImage: "Prześlij obraz",
    uploadSub: "JPG, PNG lub WebP — dekodowane w przeglądarce",
    scanCamera: "Skanuj aparatem",
    scanSub: "Skanowanie na żywo przez kamerę urządzenia",
    stop: "Zatrzymaj",
    decoding: "Dekodowanie…",
    decoded: "Zdekodowano",
    copy: "Kopiuj",
    copied: "Skopiowano",
    openLink: "Otwórz link",
    privacy: "100% w Twojej przeglądarce przez jsQR — obraz nigdy nie jest wysyłany.",
    noQr: "Nie wykryto kodu QR. Spróbuj ostrzejszego zdjęcia lub bliższego kadrowania.",
    readError: "Nie można odczytać obrazu: ",
    cameraError: "Dostęp do kamery odrzucony: ",
  },
  uk: {
    uploadImage: "Завантажити зображення",
    uploadSub: "JPG, PNG або WebP — декодується у браузері",
    scanCamera: "Сканувати камерою",
    scanSub: "Живе сканування через камеру пристрою",
    stop: "Зупинити",
    decoding: "Декодування…",
    decoded: "Декодовано",
    copy: "Копіювати",
    copied: "Скопійовано",
    openLink: "Відкрити посилання",
    privacy: "100% у вашому браузері через jsQR — зображення ніколи не завантажується.",
    noQr: "QR-код не виявлено. Спробуйте чіткіше фото або ближче кадрування.",
    readError: "Не вдалося прочитати зображення: ",
    cameraError: "Доступ до камери заборонено: ",
  },
  cs: {
    uploadImage: "Nahrát obrázek",
    uploadSub: "JPG, PNG nebo WebP — dekódováno ve vašem prohlížeči",
    scanCamera: "Skenovat kamerou",
    scanSub: "Živé skenování přes kameru zařízení",
    stop: "Zastavit",
    decoding: "Dekódování…",
    decoded: "Dekódováno",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    openLink: "Otevřít odkaz",
    privacy: "100 % ve vašem prohlížeči přes jsQR — váš obrázek není nikdy nahrán.",
    noQr: "Žádný QR kód nebyl nalezen. Zkuste ostřejší fotku nebo těsnější ořez.",
    readError: "Obrázek nelze přečíst: ",
    cameraError: "Přístup ke kameře byl odepřen: ",
  },
};

export function QrCodeReaderClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const camRef = useRef<HTMLVideoElement | null>(null);
  const camStream = useRef<MediaStream | null>(null);
  const [scanning, setScanning] = useState(false);
  // The rAF loop must read a ref, not `scanning`: setScanning(true) hasn't applied
  // yet when startCam's closure is created, so the captured state would be false
  // and the loop would exit on its first tick (never decoding anything).
  const scanningRef = useRef(false);

  useEffect(() => () => { scanningRef.current = false; if (camStream.current) camStream.current.getTracks().forEach((t) => t.stop()); }, []);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null); setResult(null);
    setFile(f); setSrcUrl(URL.createObjectURL(f));
    setBusy(true);
    try {
      const jsQR = await loadJsQR();
      const bmp = await createImageBitmap(f);
      const found = tryDetect(jsQR, bmp);
      bmp.close();
      if (found) setResult(found);
      else setError(s.noQr);
    } catch (e) {
      setError(`${s.readError}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function startCam() {
    try {
      setError(null); setResult(null); scanningRef.current = true; setScanning(true);
      const jsQR = await loadJsQR();
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      camStream.current = stream;
      if (camRef.current) { camRef.current.srcObject = stream; await camRef.current.play(); }
      const tick = async () => {
        if (!scanningRef.current || !camRef.current || !camStream.current) return;
        const v = camRef.current;
        if (v.videoWidth && v.videoHeight) {
          const c = document.createElement("canvas");
          c.width = v.videoWidth; c.height = v.videoHeight;
          const ctx = c.getContext("2d", { willReadFrequently: true })!;
          ctx.drawImage(v, 0, 0);
          const { data } = ctx.getImageData(0, 0, c.width, c.height);
          const r = jsQR(data, c.width, c.height);
          if (r) { setResult(r.data); stopCam(); return; }
        }
        requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      setError(`${s.cameraError}${(e as Error).message}`);
      scanningRef.current = false;
      setScanning(false);
    }
  }
  function stopCam() {
    scanningRef.current = false;
    setScanning(false);
    if (camStream.current) { camStream.current.getTracks().forEach((t) => t.stop()); camStream.current = null; }
  }

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div className="space-y-5">
      {!file && !scanning ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
            <Upload className="h-7 w-7 text-slate-600" />
            <span className="mt-2 font-medium text-ink-900">{s.uploadImage}</span>
            <span className="mt-0.5 text-xs text-ink-400">{s.uploadSub}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
          </label>
          <button onClick={startCam} className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
            <Camera className="h-7 w-7 text-slate-600" />
            <span className="mt-2 font-medium text-ink-900">{s.scanCamera}</span>
            <span className="mt-0.5 text-xs text-ink-400">{s.scanSub}</span>
          </button>
        </div>
      ) : null}

      {scanning && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <video ref={camRef} className="w-full max-w-md rounded" playsInline muted />
          <Button size="sm" variant="outline" className="mt-3" onClick={stopCam}>{s.stop}</Button>
        </div>
      )}

      {file && (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span></div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setResult(null); setError(null); }} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
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
          <p className="text-xs uppercase tracking-wide text-emerald-700">{s.decoded}</p>
          <p className="mt-2 break-all font-mono text-sm text-ink-900">{result}</p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={copy}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? s.copied : s.copy}</Button>
            {/^https?:\/\//i.test(result) && <a href={result} target="_blank" rel="noopener noreferrer"><Button size="sm">{s.openLink}</Button></a>}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
