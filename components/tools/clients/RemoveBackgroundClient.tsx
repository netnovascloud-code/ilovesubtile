"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type BgModule = { removeBackground: (input: Blob | string, opts?: unknown) => Promise<Blob> };

// Load @imgly/background-removal from an ESM CDN at runtime so webpack/SWC
// never sees the lib's onnxruntime-web bundle (which uses dynamic require and
// breaks Next builds when included in the client chunk).
async function loadBgRemoval(): Promise<BgModule> {
  const url = "https://esm.sh/@imgly/background-removal@1.5.6?bundle";
  return (await import(/* webpackIgnore: true */ url)) as BgModule;
}

const T: Record<string, Record<string, string>> = {
  en: {
    clickUpload: "Click to upload an image",
    acceptHint: "JPG, PNG or WebP · processed privately in your browser",
    original: "Original",
    bgRemoved: "Background removed",
    progressHint: "% · first run downloads the AI model (~40MB), then it's cached",
    resultPlaceholder: "Result will appear here.",
    removingBg: "Removing background…",
    removeBg: "Remove background",
    downloadPng: "Download PNG",
    privacyNote: "100% in your browser via WebAssembly — your image is never uploaded.",
    errorPrefix: "Could not process the image: ",
  },
  fr: {
    clickUpload: "Cliquez pour télécharger une image",
    acceptHint: "JPG, PNG ou WebP · traité localement dans votre navigateur",
    original: "Original",
    bgRemoved: "Arrière-plan supprimé",
    progressHint: "% · le premier lancement télécharge le modèle IA (∼40 Mo), puis il est mis en cache",
    resultPlaceholder: "Le résultat apparaîtra ici.",
    removingBg: "Suppression en cours…",
    removeBg: "Supprimer l’arrière-plan",
    downloadPng: "Télécharger PNG",
    privacyNote: "100 % dans votre navigateur via WebAssembly — votre image n’est jamais envoyée.",
    errorPrefix: "Impossible de traiter l’image : ",
  },
  es: {
    clickUpload: "Haz clic para subir una imagen",
    acceptHint: "JPG, PNG o WebP · procesado localmente en tu navegador",
    original: "Original",
    bgRemoved: "Fondo eliminado",
    progressHint: "% · la primera vez descarga el modelo de IA (∼40 MB), luego se guarda en caché",
    resultPlaceholder: "El resultado aparecerá aquí.",
    removingBg: "Eliminando fondo…",
    removeBg: "Eliminar fondo",
    downloadPng: "Descargar PNG",
    privacyNote: "100 % en tu navegador mediante WebAssembly — tu imagen nunca se sube.",
    errorPrefix: "No se pudo procesar la imagen: ",
  },
  pt: {
    clickUpload: "Clique para carregar uma imagem",
    acceptHint: "JPG, PNG ou WebP · processado localmente no seu navegador",
    original: "Original",
    bgRemoved: "Fundo removido",
    progressHint: "% · na primeira execução o modelo de IA (∼40 MB) é baixado e armazenado em cache",
    resultPlaceholder: "O resultado aparecerá aqui.",
    removingBg: "Removendo fundo…",
    removeBg: "Remover fundo",
    downloadPng: "Baixar PNG",
    privacyNote: "100 % no seu navegador via WebAssembly — sua imagem nunca é enviada.",
    errorPrefix: "Não foi possível processar a imagem: ",
  },
  de: {
    clickUpload: "Klicken Sie, um ein Bild hochzuladen",
    acceptHint: "JPG, PNG oder WebP · wird lokal in Ihrem Browser verarbeitet",
    original: "Original",
    bgRemoved: "Hintergrund entfernt",
    progressHint: "% · beim ersten Start wird das KI-Modell (∼40 MB) heruntergeladen und dann gecacht",
    resultPlaceholder: "Das Ergebnis erscheint hier.",
    removingBg: "Hintergrund wird entfernt…",
    removeBg: "Hintergrund entfernen",
    downloadPng: "PNG herunterladen",
    privacyNote: "100 % in Ihrem Browser via WebAssembly — Ihr Bild wird niemals hochgeladen.",
    errorPrefix: "Das Bild konnte nicht verarbeitet werden: ",
  },
  it: {
    clickUpload: "Clicca per caricare un’immagine",
    acceptHint: "JPG, PNG o WebP · elaborato localmente nel tuo browser",
    original: "Originale",
    bgRemoved: "Sfondo rimosso",
    progressHint: "% · al primo avvio scarica il modello AI (∼40 MB), poi viene messo in cache",
    resultPlaceholder: "Il risultato apparirà qui.",
    removingBg: "Rimozione sfondo…",
    removeBg: "Rimuovi sfondo",
    downloadPng: "Scarica PNG",
    privacyNote: "100 % nel tuo browser tramite WebAssembly — la tua immagine non viene mai caricata.",
    errorPrefix: "Impossibile elaborare l’immagine: ",
  },
  nl: {
    clickUpload: "Klik om een afbeelding te uploaden",
    acceptHint: "JPG, PNG of WebP · verwerkt in uw browser",
    original: "Origineel",
    bgRemoved: "Achtergrond verwijderd",
    progressHint: "% · de eerste keer wordt het AI-model (∼40 MB) gedownload en gecached",
    resultPlaceholder: "Het resultaat verschijnt hier.",
    removingBg: "Achtergrond verwijderen…",
    removeBg: "Achtergrond verwijderen",
    downloadPng: "PNG downloaden",
    privacyNote: "100 % in uw browser via WebAssembly — uw afbeelding wordt nooit geüpload.",
    errorPrefix: "Kan de afbeelding niet verwerken: ",
  },
  ja: {
    clickUpload: "画像をアップロードするにはクリック",
    acceptHint: "JPG、PNG または WebP · ブラウザ内で処理",
    original: "元の画像",
    bgRemoved: "背景削除済み",
    progressHint: "% · 初回起動時に AI モデル（∼40 MB）をダウンロードし、以後はキャッシュされます",
    resultPlaceholder: "結果がここに表示されます。",
    removingBg: "背景を削除中…",
    removeBg: "背景を削除",
    downloadPng: "PNG をダウンロード",
    privacyNote: "WebAssembly を使用してブラウザ内で完全処理—画像はアップロードされません。",
    errorPrefix: "画像を処理できませんでした: ",
  },
  zh: {
    clickUpload: "点击上传图片",
    acceptHint: "JPG、PNG 或 WebP · 在您的浏览器中本地处理",
    original: "原图",
    bgRemoved: "已删除背景",
    progressHint: "% · 首次运行下载 AI 模型（∼40 MB），此后缓存",
    resultPlaceholder: "结果将显示在这里。",
    removingBg: "正在删除背景…",
    removeBg: "删除背景",
    downloadPng: "下载 PNG",
    privacyNote: "100% 在您的浏览器中通过 WebAssembly 处理—您的图片永远不会被上传。",
    errorPrefix: "无法处理图片: ",
  },
  ko: {
    clickUpload: "클릭하여 이미지를 업로드하세요",
    acceptHint: "JPG, PNG 또는 WebP · 브라우저에서 로컬 처리",
    original: "원본",
    bgRemoved: "배경 제거됨",
    progressHint: "% · 첫 실행 시 AI 모델(약 40 MB)을 다운로드하고 캐시됩니다",
    resultPlaceholder: "결과가 여기에 표시됩니다.",
    removingBg: "배경 제거 중…",
    removeBg: "배경 제거",
    downloadPng: "PNG 다운로드",
    privacyNote: "WebAssembly를 통해 브라우저에서 100% 처리 — 이미지는 절대 업로드되지 않습니다.",
    errorPrefix: "이미지를 처리할 수 없습니다: ",
  },
  ar: {
    clickUpload: "انقر لتحميل صورة",
    acceptHint: "JPG أو PNG أو WebP · يُعالج محليًا في متصفحك",
    original: "الأصلي",
    bgRemoved: "تمت إزالة الخلفية",
    progressHint: "‏% · عند التشغيل الأوّل يجري تنزيل نموذج الذكاء الاصطناعي (‏∼40 ميغابايت‎)، ثم يُخزّن",
    resultPlaceholder: "سيظهر النتيجة هنا.",
    removingBg: "جارٍ إزالة الخلفية…",
    removeBg: "إزالة الخلفية",
    downloadPng: "تنزيل PNG",
    privacyNote: "يعمل 100‏% في متصفحك عبر WebAssembly — صورتك لن تُرفع أبدًا.",
    errorPrefix: "تعذّر معالجة الصورة: ",
  },
  ru: {
    clickUpload: "Нажмите, чтобы загрузить изображение",
    acceptHint: "JPG, PNG или WebP · обрабатывается локально в вашем браузере",
    original: "Оригинал",
    bgRemoved: "Фон удалён",
    progressHint: "% · при первом запуске загружается модель ИИ (∼40 МБ), затем кэшируется",
    resultPlaceholder: "Результат появится здесь.",
    removingBg: "Удаляем фон…",
    removeBg: "Удалить фон",
    downloadPng: "Скачать PNG",
    privacyNote: "100 % в вашем браузере через WebAssembly — ваше изображение никогда не загружается.",
    errorPrefix: "Не удалось обработать изображение: ",
  },
  hi: {
    clickUpload: "चित्र अपलोड करने के लिए क्लिक करें",
    acceptHint: "JPG, PNG या WebP · आपके ब्राउज़र में स्थानीय रूप से प्रसंस्कृत",
    original: "मूल",
    bgRemoved: "पृष्ठभूमि हटाई गई",
    progressHint: "% · पहली बार AI मॉडल (∼40 MB) डाउनलोड होता है, फिर कैश हो जाता है",
    resultPlaceholder: "परिणाम यहाँ दिखेगा।",
    removingBg: "पृष्ठभूमि हटाई जा रही है…",
    removeBg: "पृष्ठभूमि हटाएं",
    downloadPng: "PNG डाउनलोड करें",
    privacyNote: "WebAssembly के जरिए आपके ब्राउज़र में 100% — आपकी चित्र कभी अपलोड नहीं होती।",
    errorPrefix: "चित्र प्रसंस्कृत नहीं हो सका: ",
  },
  tr: {
    clickUpload: "Görsel yüklemek için tıklayın",
    acceptHint: "JPG, PNG veya WebP · tarayıcınızda yerel olarak işlenir",
    original: "Orijinal",
    bgRemoved: "Arka plan kaldırıldı",
    progressHint: "% · ilk çalıştırmada AI modeli (∼40 MB) indirilir, sonra önbelleğe alınır",
    resultPlaceholder: "Sonuç burada görünecek.",
    removingBg: "Arka plan kaldırılıyor…",
    removeBg: "Arka planı kaldır",
    downloadPng: "PNG indir",
    privacyNote: "WebAssembly aracılığıyla tarayıcınızda 100 % — görseliniz hiçbir zaman yüklenmez.",
    errorPrefix: "Görsel işlenemedi: ",
  },
  id: {
    clickUpload: "Klik untuk mengunggah gambar",
    acceptHint: "JPG, PNG atau WebP · diproses secara lokal di browser Anda",
    original: "Asli",
    bgRemoved: "Latar belakang dihapus",
    progressHint: "% · pertama kali unduh model AI (∼40 MB), lalu disimpan di cache",
    resultPlaceholder: "Hasil akan muncul di sini.",
    removingBg: "Menghapus latar belakang…",
    removeBg: "Hapus latar belakang",
    downloadPng: "Unduh PNG",
    privacyNote: "100% di browser Anda melalui WebAssembly — gambar Anda tidak pernah diunggah.",
    errorPrefix: "Tidak dapat memproses gambar: ",
  },
  vi: {
    clickUpload: "Nhấp để tải ảnh lên",
    acceptHint: "JPG, PNG hoặc WebP · xử lý cục bộ trên trình duyệt của bạn",
    original: "Gốc",
    bgRemoved: "Đã xóa nền",
    progressHint: "% · lần đầu tải xuống mô hình AI (∼40 MB), sau đó được lưu vào bộ nhớ đệm",
    resultPlaceholder: "Kết quả sẽ xuất hiện ở đây.",
    removingBg: "Đang xóa nền…",
    removeBg: "Xóa nền",
    downloadPng: "Tải xuống PNG",
    privacyNote: "100% trên trình duyệt của bạn qua WebAssembly — ảnh của bạn không bao giờ được tải lên.",
    errorPrefix: "Không thể xử lý ảnh: ",
  },
  sv: {
    clickUpload: "Klicka för att ladda upp en bild",
    acceptHint: "JPG, PNG eller WebP · bearbetas lokalt i din webbläsare",
    original: "Original",
    bgRemoved: "Bakgrund borttagen",
    progressHint: "% · första gången laddas AI-modellen (∼40 MB) ner och cachas sedan",
    resultPlaceholder: "Resultatet visas här.",
    removingBg: "Tar bort bakgrund…",
    removeBg: "Ta bort bakgrund",
    downloadPng: "Ladda ner PNG",
    privacyNote: "100 % i din webbläsare via WebAssembly — din bild laddas aldrig upp.",
    errorPrefix: "Kunde inte bearbeta bilden: ",
  },
  pl: {
    clickUpload: "Kliknij, aby prześleć obraz",
    acceptHint: "JPG, PNG lub WebP · przetwarzane lokalnie w Twojej przeglądarce",
    original: "Oryginał",
    bgRemoved: "Tło usunięte",
    progressHint: "% · przy pierwszym uruchomieniu pobierany jest model AI (∼40 MB), potem jest w pamięci podręcznej",
    resultPlaceholder: "Wynik pojawi się tutaj.",
    removingBg: "Usuwanie tła…",
    removeBg: "Usuń tło",
    downloadPng: "Pobierz PNG",
    privacyNote: "100 % w Twojej przeglądarce przez WebAssembly — Twoje zdjęcie nigdy nie jest przesyłane.",
    errorPrefix: "Nie można przetworzyć obrazu: ",
  },
  uk: {
    clickUpload: "Натисніть, щоб завантажити зображення",
    acceptHint: "JPG, PNG або WebP · обробляється локально у вашому браузері",
    original: "Оригінал",
    bgRemoved: "Фон видалено",
    progressHint: "% · при першому запуску завантажується модель ЩІ (∼40 МБ), потім кешується",
    resultPlaceholder: "Результат з’явиться тут.",
    removingBg: "Видалення фону…",
    removeBg: "Видалити фон",
    downloadPng: "Завантажити PNG",
    privacyNote: "100 % у вашому браузері через WebAssembly — ваше зображення ніколи не завантажується.",
    errorPrefix: "Не вдалося обробити зображення: ",
  },
  cs: {
    clickUpload: "Klikněte pro nahrání obrázku",
    acceptHint: "JPG, PNG nebo WebP · zpracováno lokálně ve vašem prohlížeči",
    original: "Originál",
    bgRemoved: "Pozadí odstraněno",
    progressHint: "% · při prvním spuštění se stahuje AI model (∼40 MB), poté je uložen v meziregioně",
    resultPlaceholder: "Výsledek se zobrazí zde.",
    removingBg: "Odstraňování pozadí…",
    removeBg: "Odstranit pozadí",
    downloadPng: "Stáhnout PNG",
    privacyNote: "100 % ve vašem prohlížeči přes WebAssembly — váš obrázek není nikdy nahrán.",
    errorPrefix: "Obrázek nelze zpracovat: ",
  },
};

export function RemoveBackgroundClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string[]>([]);

  useEffect(() => () => { cleanup.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  function pick(f: File | null) {
    if (!f) return;
    setError(null); setOutUrl(null); setProgress(0); setOutSize(0);
    cleanup.current.forEach((u) => URL.revokeObjectURL(u));
    cleanup.current = [];
    const u = URL.createObjectURL(f);
    cleanup.current.push(u);
    setFile(f); setSrcUrl(u);
  }

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setProgress(2); setOutUrl(null);
    try {
      const mod = await loadBgRemoval();
      const blob = await mod.removeBackground(file, {
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) setProgress(Math.max(2, Math.min(99, Math.round((current / total) * 100))));
        },
        output: { format: "image/png", quality: 1 },
      });
      const url = URL.createObjectURL(blob);
      cleanup.current.push(url);
      setOutUrl(url); setOutSize(blob.size); setProgress(100);
    } catch (e) {
      setError(`${s.errorPrefix}${(e as Error).message}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 px-6 py-16 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{s.clickUpload}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.acceptHint}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setOutUrl(null); }} aria-label="Remove" className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-ink-100 bg-white p-3">
            <p className="mb-2 text-sm font-medium text-ink-700">{s.original}</p>
            <div className="grid min-h-56 place-items-center rounded bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {srcUrl && <img src={srcUrl} alt="Original" className="max-h-72 max-w-full object-contain" />}
            </div>
          </div>
          <div className="rounded-lg border border-ink-100 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-ink-700">{s.bgRemoved}</p>
              {outUrl && <span className="text-xs text-emerald-600">{formatBytes(outSize)}</span>}
            </div>
            <div className="grid min-h-56 place-items-center rounded bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-2">
              {busy ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                  <div className="h-1.5 w-40 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs text-ink-400">{progress}{s.progressHint}</span>
                </div>
              ) : outUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={outUrl} alt="Transparent" className="max-h-72 max-w-full object-contain" />
              ) : (
                <span className="text-sm text-ink-400">{s.resultPlaceholder}</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={run} disabled={!file || busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.removingBg : s.removeBg}
        </Button>
        {outUrl && (
          <a href={outUrl} download="no-background.png">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.downloadPng}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacyNote}</p>
    </div>
  );
}
