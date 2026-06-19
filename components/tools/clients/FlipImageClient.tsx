"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, FlipHorizontal, FlipVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Mode = "horizontal" | "vertical" | "both";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload an image",
    uploadHint: "JPG, PNG or WebP — flipped in your browser",
    modeHorizontal: "Horizontal",
    modeVertical: "Vertical",
    modeBoth: "Both",
    result: "Result",
    download: "Download",
    flipping: "Flipping…",
    couldNotFlip: "Could not flip the image",
    privacy: "100% in your browser via Canvas — your image is never uploaded.",
  },
  fr: {
    uploadLabel: "Télécharger une image",
    uploadHint: "JPG, PNG ou WebP — retourné dans votre navigateur",
    modeHorizontal: "Horizontal",
    modeVertical: "Vertical",
    modeBoth: "Les deux",
    result: "Résultat",
    download: "Télécharger",
    flipping: "Retournement…",
    couldNotFlip: "Impossible de retourner l'image",
    privacy: "100% dans votre navigateur via Canvas — votre image n'est jamais envoyée.",
  },
  es: {
    uploadLabel: "Subir una imagen",
    uploadHint: "JPG, PNG o WebP — volteado en tu navegador",
    modeHorizontal: "Horizontal",
    modeVertical: "Vertical",
    modeBoth: "Ambos",
    result: "Resultado",
    download: "Descargar",
    flipping: "Volteando…",
    couldNotFlip: "No se pudo voltear la imagen",
    privacy: "100% en tu navegador vía Canvas — tu imagen nunca se sube.",
  },
  pt: {
    uploadLabel: "Carregar uma imagem",
    uploadHint: "JPG, PNG ou WebP — invertido no seu navegador",
    modeHorizontal: "Horizontal",
    modeVertical: "Vertical",
    modeBoth: "Ambos",
    result: "Resultado",
    download: "Baixar",
    flipping: "A inverter…",
    couldNotFlip: "Não foi possível inverter a imagem",
    privacy: "100% no seu navegador via Canvas — a sua imagem nunca é enviada.",
  },
  de: {
    uploadLabel: "Bild hochladen",
    uploadHint: "JPG, PNG oder WebP — im Browser gespiegelt",
    modeHorizontal: "Horizontal",
    modeVertical: "Vertikal",
    modeBoth: "Beides",
    result: "Ergebnis",
    download: "Herunterladen",
    flipping: "Wird gespiegelt…",
    couldNotFlip: "Das Bild konnte nicht gespiegelt werden",
    privacy: "100% im Browser über Canvas — Ihr Bild wird nie hochgeladen.",
  },
  it: {
    uploadLabel: "Carica un'immagine",
    uploadHint: "JPG, PNG o WebP — ribaltato nel browser",
    modeHorizontal: "Orizzontale",
    modeVertical: "Verticale",
    modeBoth: "Entrambi",
    result: "Risultato",
    download: "Scarica",
    flipping: "Ribaltamento…",
    couldNotFlip: "Impossibile ribaltare l'immagine",
    privacy: "100% nel browser tramite Canvas — la tua immagine non viene mai caricata.",
  },
  nl: {
    uploadLabel: "Afbeelding uploaden",
    uploadHint: "JPG, PNG of WebP — gespiegeld in uw browser",
    modeHorizontal: "Horizontaal",
    modeVertical: "Verticaal",
    modeBoth: "Beide",
    result: "Resultaat",
    download: "Downloaden",
    flipping: "Spiegelen…",
    couldNotFlip: "Kon de afbeelding niet spiegelen",
    privacy: "100% in uw browser via Canvas — uw afbeelding wordt nooit geüpload.",
  },
  ja: {
    uploadLabel: "画像をアップロード",
    uploadHint: "JPG, PNG または WebP — ブラウザ内で反転",
    modeHorizontal: "水平",
    modeVertical: "垂直",
    modeBoth: "両方",
    result: "結果",
    download: "ダウンロード",
    flipping: "反転中…",
    couldNotFlip: "画像を反転できませんでした",
    privacy: "ブラウザ内で Canvas を使用して処理—画像はアップロードされません。",
  },
  zh: {
    uploadLabel: "上传图片",
    uploadHint: "JPG、PNG 或 WebP — 在您的浏览器中翻转",
    modeHorizontal: "水平",
    modeVertical: "垂直",
    modeBoth: "两者",
    result: "结果",
    download: "下载",
    flipping: "翻转中…",
    couldNotFlip: "无法翻转图片",
    privacy: "100% 在您的浏览器中通过 Canvas 处理—图片永远不会被上传。",
  },
  ko: {
    uploadLabel: "이미지 업로드",
    uploadHint: "JPG, PNG 또는 WebP — 브라우저에서 뒤집기",
    modeHorizontal: "수평",
    modeVertical: "수직",
    modeBoth: "둘 다",
    result: "결과",
    download: "다운로드",
    flipping: "뒤집는 중…",
    couldNotFlip: "이미지를 뒤집을 수 없습니다",
    privacy: "브라우저에서 Canvas로 100% 처리—이미지는 업로드되지 않습니다.",
  },
  ar: {
    uploadLabel: "تحميل صورة",
    uploadHint: "JPG أو PNG أو WebP — يُقلَب في متصفحك",
    modeHorizontal: "أفقي",
    modeVertical: "عمودي",
    modeBoth: "كلاهما",
    result: "النتيجة",
    download: "تنزيل",
    flipping: "جاريالقلب…",
    couldNotFlip: "تعذّر قلب الصورة",
    privacy: "100% في متصفحك عبر Canvas — لا تُرفَع صورتك أبداً.",
  },
  ru: {
    uploadLabel: "Загрузить изображение",
    uploadHint: "JPG, PNG или WebP — отражение в браузере",
    modeHorizontal: "Горизонтально",
    modeVertical: "Вертикально",
    modeBoth: "Оба",
    result: "Результат",
    download: "Скачать",
    flipping: "Отражение…",
    couldNotFlip: "Не удалось отразить изображение",
    privacy: "100% в браузере через Canvas — ваше изображение никогда не загружается.",
  },
  hi: {
    uploadLabel: "छवि अपलोड करें",
    uploadHint: "JPG, PNG या WebP — आपके ब्राउज़र में पलटा जाता है",
    modeHorizontal: "क्षैतिज",
    modeVertical: "ऊर्ध्वाधर",
    modeBoth: "दोनों",
    result: "परिणाम",
    download: "डाउनलोड",
    flipping: "पलटा जा रहा है…",
    couldNotFlip: "छवि नहीं पलटी जा सकी",
    privacy: "आपके ब्राउज़र में Canvas के माध्यम से 100% — आपकी छवि कभी अपलोड नहीं होती।",
  },
  tr: {
    uploadLabel: "Görsel yükle",
    uploadHint: "JPG, PNG veya WebP — tarayıcınızda çevrilir",
    modeHorizontal: "Yatay",
    modeVertical: "Dikey",
    modeBoth: "İkisi de",
    result: "Sonuç",
    download: "İndir",
    flipping: "Çevriliyor…",
    couldNotFlip: "Görsel çevrilemedi",
    privacy: "Tarayıcınızda Canvas ile %100 — görseliniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadLabel: "Unggah gambar",
    uploadHint: "JPG, PNG atau WebP — dibalik di browser Anda",
    modeHorizontal: "Horizontal",
    modeVertical: "Vertikal",
    modeBoth: "Keduanya",
    result: "Hasil",
    download: "Unduh",
    flipping: "Membalik…",
    couldNotFlip: "Gagal membalik gambar",
    privacy: "100% di browser Anda melalui Canvas — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    uploadLabel: "Tải lên hình ảnh",
    uploadHint: "JPG, PNG hoặc WebP — lật trong trình duyệt của bạn",
    modeHorizontal: "Ngang",
    modeVertical: "Dọc",
    modeBoth: "Cả hai",
    result: "Kết quả",
    download: "Tải xuống",
    flipping: "Đang lật…",
    couldNotFlip: "Không thể lật hình ảnh",
    privacy: "100% trong trình duyệt của bạn qua Canvas — hình ảnh không bao giờ được tải lên.",
  },
  sv: {
    uploadLabel: "Ladda upp en bild",
    uploadHint: "JPG, PNG eller WebP — speglad i din webbläsare",
    modeHorizontal: "Horisontell",
    modeVertical: "Vertikal",
    modeBoth: "Båda",
    result: "Resultat",
    download: "Ladda ned",
    flipping: "Speglar…",
    couldNotFlip: "Kunde inte spegla bilden",
    privacy: "100% i din webbläsare via Canvas — din bild laddas aldrig upp.",
  },
  pl: {
    uploadLabel: "Prześlij obraz",
    uploadHint: "JPG, PNG lub WebP — odbity w Twojej przeglądarce",
    modeHorizontal: "Poziomo",
    modeVertical: "Pionowo",
    modeBoth: "Oba",
    result: "Wynik",
    download: "Pobierz",
    flipping: "Odbijanie…",
    couldNotFlip: "Nie można odbić obrazu",
    privacy: "100% w Twojej przeglądarce przez Canvas — Twój obraz nigdy nie jest przesyłany.",
  },
  uk: {
    uploadLabel: "Завантажити зображення",
    uploadHint: "JPG, PNG або WebP — відображення у браузері",
    modeHorizontal: "Горизонтально",
    modeVertical: "Вертикально",
    modeBoth: "Обидва",
    result: "Результат",
    download: "Завантажити",
    flipping: "Відображення…",
    couldNotFlip: "Не вдалося відобразити зображення",
    privacy: "100% у браузері через Canvas — зображення ніколи не завантажується.",
  },
  cs: {
    uploadLabel: "Nahrát obrázek",
    uploadHint: "JPG, PNG nebo WebP — převráceno ve vašem prohlížeči",
    modeHorizontal: "Vodorovně",
    modeVertical: "Svisle",
    modeBoth: "Obojí",
    result: "Výsledek",
    download: "Stáhnout",
    flipping: "Převracení…",
    couldNotFlip: "Obrázek nelze převrátit",
    privacy: "100% ve vašem prohlížeči přes Canvas — váš obrázek se nikdy nenačítá.",
  },
};

export function FlipImageClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("horizontal");
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function flip(f: File, m: Mode) {
    setError(null); setBusy(true); setOutUrl(null);
    try {
      const bmp = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width; canvas.height = bmp.height;
      const ctx = canvas.getContext("2d")!;
      ctx.save();
      const sx = m === "horizontal" || m === "both" ? -1 : 1;
      const sy = m === "vertical" || m === "both" ? -1 : 1;
      ctx.scale(sx, sy);
      ctx.drawImage(bmp, sx === -1 ? -bmp.width : 0, sy === -1 ? -bmp.height : 0);
      ctx.restore();
      bmp.close();
      const out: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), f.type || "image/png", 0.95));
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(out);
      cleanup.current = url;
      setOutUrl(url); setOutSize(out.size);
    } catch (e) {
      setError(`${s.couldNotFlip}: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function pick(f: File | null) {
    if (!f) return;
    setFile(f);
    flip(f, mode);
  }
  function setModeAndRerun(m: Mode) {
    setMode(m);
    if (file) flip(file, m);
  }

  const downloadName = file ? file.name.replace(/(\.[^.]+)?$/, `-flipped$1`) : "flipped.png";

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} aria-label="Remove" className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {([
            ["horizontal", s.modeHorizontal, FlipHorizontal],
            ["vertical", s.modeVertical, FlipVertical],
            ["both", s.modeBoth, FlipHorizontal],
          ] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setModeAndRerun(id)}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium ${mode === id ? "bg-amber-500 text-white" : "text-ink-600 hover:text-ink-900"}`}>
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
      )}

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-ink-700">{s.result} &middot; {formatBytes(outSize)}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Flipped" className="max-h-96 w-full rounded object-contain" />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {outUrl && (
          <a href={outUrl} download={downloadName}>
            <Button size="lg"><Download className="h-4 w-4" /> {s.download}</Button>
          </a>
        )}
      </div>

      {busy && <p className="text-sm text-ink-500">{s.flipping}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
