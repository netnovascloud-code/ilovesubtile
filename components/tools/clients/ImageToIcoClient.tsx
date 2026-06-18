"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload an image",
    uploadHint: "PNG, JPG or WebP — we build a multi-size .ico (16, 32, 48, 64 px)",
    buildingFavicon: "Building favicon…",
    faviconInfo: "favicon.ico · {size} · contains {sizes} px",
    downloadBtn: "Download favicon.ico",
    couldNotGenerate: "Could not generate the favicon",
    privacy: "100% in your browser via Canvas — your image is never uploaded.",
  },
  fr: {
    uploadLabel: "Télécharger une image",
    uploadHint: "PNG, JPG ou WebP — nous créons un .ico multi-taille (16, 32, 48, 64 px)",
    buildingFavicon: "Création du favicon…",
    faviconInfo: "favicon.ico · {size} · contient {sizes} px",
    downloadBtn: "Télécharger favicon.ico",
    couldNotGenerate: "Impossible de générer le favicon",
    privacy: "100% dans votre navigateur via Canvas — votre image n'est jamais envoyée.",
  },
  es: {
    uploadLabel: "Subir una imagen",
    uploadHint: "PNG, JPG o WebP — creamos un .ico multi-tamaño (16, 32, 48, 64 px)",
    buildingFavicon: "Creando favicon…",
    faviconInfo: "favicon.ico · {size} · contiene {sizes} px",
    downloadBtn: "Descargar favicon.ico",
    couldNotGenerate: "No se pudo generar el favicon",
    privacy: "100% en tu navegador vía Canvas — tu imagen nunca se sube.",
  },
  pt: {
    uploadLabel: "Carregar uma imagem",
    uploadHint: "PNG, JPG ou WebP — criamos um .ico multi-tamanho (16, 32, 48, 64 px)",
    buildingFavicon: "A criar favicon…",
    faviconInfo: "favicon.ico · {size} · contém {sizes} px",
    downloadBtn: "Baixar favicon.ico",
    couldNotGenerate: "Não foi possível gerar o favicon",
    privacy: "100% no seu navegador via Canvas — a sua imagem nunca é enviada.",
  },
  de: {
    uploadLabel: "Bild hochladen",
    uploadHint: "PNG, JPG oder WebP — wir erstellen eine .ico mit mehreren Größen (16, 32, 48, 64 px)",
    buildingFavicon: "Favicon wird erstellt…",
    faviconInfo: "favicon.ico · {size} · enthält {sizes} px",
    downloadBtn: "favicon.ico herunterladen",
    couldNotGenerate: "Favicon konnte nicht erstellt werden",
    privacy: "100% im Browser über Canvas — Ihr Bild wird nie hochgeladen.",
  },
  it: {
    uploadLabel: "Carica un'immagine",
    uploadHint: "PNG, JPG o WebP — creiamo un .ico multi-dimensione (16, 32, 48, 64 px)",
    buildingFavicon: "Creazione favicon…",
    faviconInfo: "favicon.ico · {size} · contiene {sizes} px",
    downloadBtn: "Scarica favicon.ico",
    couldNotGenerate: "Impossibile generare la favicon",
    privacy: "100% nel browser tramite Canvas — la tua immagine non viene mai caricata.",
  },
  nl: {
    uploadLabel: "Afbeelding uploaden",
    uploadHint: "PNG, JPG of WebP — wij maken een .ico met meerdere formaten (16, 32, 48, 64 px)",
    buildingFavicon: "Favicon wordt gemaakt…",
    faviconInfo: "favicon.ico · {size} · bevat {sizes} px",
    downloadBtn: "favicon.ico downloaden",
    couldNotGenerate: "Kon favicon niet genereren",
    privacy: "100% in uw browser via Canvas — uw afbeelding wordt nooit geüpload.",
  },
  ja: {
    uploadLabel: "画像をアップロード",
    uploadHint: "PNG, JPG または WebP — マルチサイズ .ico (16, 32, 48, 64 px) を作成",
    buildingFavicon: "ファビコンを作成中…",
    faviconInfo: "favicon.ico · {size} · {sizes} px を含む",
    downloadBtn: "favicon.ico をダウンロード",
    couldNotGenerate: "ファビコンを生成できませんでした",
    privacy: "ブラウザ内で Canvas を使用して処理—画像はアップロードされません。",
  },
  zh: {
    uploadLabel: "上传图片",
    uploadHint: "PNG、JPG 或 WebP — 我们构建多尺寸 .ico (16, 32, 48, 64 px)",
    buildingFavicon: "正在构建 favicon…",
    faviconInfo: "favicon.ico · {size} · 包含 {sizes} px",
    downloadBtn: "下载 favicon.ico",
    couldNotGenerate: "无法生成 favicon",
    privacy: "100% 在您的浏览器中通过 Canvas 处理—图片永远不会被上传。",
  },
  ko: {
    uploadLabel: "이미지 업로드",
    uploadHint: "PNG, JPG 또는 WebP — 다중 크기 .ico (16, 32, 48, 64 px) 생성",
    buildingFavicon: "파비콘 생성 중…",
    faviconInfo: "favicon.ico · {size} · {sizes} px 포함",
    downloadBtn: "favicon.ico 다운로드",
    couldNotGenerate: "파비콘을 생성할 수 없습니다",
    privacy: "브라우저에서 Canvas로 100% 처리—이미지는 업로드되지 않습니다.",
  },
  ar: {
    uploadLabel: "تحميل صورة",
    uploadHint: "PNG أو JPG أو WebP — ننشئ ملف .ico متعدد الأحجام (16, 32, 48, 64 px)",
    buildingFavicon: "جاريإنشاء الأيقونة المفضلة…",
    faviconInfo: "favicon.ico · {size} · يحتوي على {sizes} px",
    downloadBtn: "تنزيل favicon.ico",
    couldNotGenerate: "تعذّر إنشاء الأيقونة المفضلة",
    privacy: "100% في متصفحك عبر Canvas — لا تُرفَع صورتك أبداً.",
  },
  ru: {
    uploadLabel: "Загрузить изображение",
    uploadHint: "PNG, JPG или WebP — создаём .ico с несколькими размерами (16, 32, 48, 64 px)",
    buildingFavicon: "Создание фавикона…",
    faviconInfo: "favicon.ico · {size} · содержит {sizes} px",
    downloadBtn: "Скачать favicon.ico",
    couldNotGenerate: "Не удалось создать фавикон",
    privacy: "100% в браузере через Canvas — ваше изображение никогда не загружается.",
  },
  hi: {
    uploadLabel: "छवि अपलोड करें",
    uploadHint: "PNG, JPG या WebP — हम मल्टी-साइज़ .ico (16, 32, 48, 64 px) बनाते हैं",
    buildingFavicon: "फ़ेविकॉन बन रहा है…",
    faviconInfo: "favicon.ico · {size} · {sizes} px शामिल",
    downloadBtn: "favicon.ico डाउनलोड करें",
    couldNotGenerate: "फ़ेविकॉन नहीं बन सका",
    privacy: "आपके ब्राउज़र में Canvas के माध्यम से 100% — आपकी छवि कभी अपलोड नहीं होती।",
  },
  tr: {
    uploadLabel: "Görsel yükle",
    uploadHint: "PNG, JPG veya WebP — çok boyutlu .ico oluşturuyoruz (16, 32, 48, 64 px)",
    buildingFavicon: "Favicon oluşturuluyor…",
    faviconInfo: "favicon.ico · {size} · {sizes} px içerir",
    downloadBtn: "favicon.ico indir",
    couldNotGenerate: "Favicon oluşturulamadı",
    privacy: "Tarayıcınızda Canvas ile %100 — görseliniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadLabel: "Unggah gambar",
    uploadHint: "PNG, JPG atau WebP — kami membangun .ico multi-ukuran (16, 32, 48, 64 px)",
    buildingFavicon: "Membangun favicon…",
    faviconInfo: "favicon.ico · {size} · berisi {sizes} px",
    downloadBtn: "Unduh favicon.ico",
    couldNotGenerate: "Gagal membuat favicon",
    privacy: "100% di browser Anda melalui Canvas — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    uploadLabel: "Tải lên hình ảnh",
    uploadHint: "PNG, JPG hoặc WebP — chúng tôi tạo .ico đa kích thước (16, 32, 48, 64 px)",
    buildingFavicon: "Đang tạo favicon…",
    faviconInfo: "favicon.ico · {size} · chứa {sizes} px",
    downloadBtn: "Tải xuống favicon.ico",
    couldNotGenerate: "Không thể tạo favicon",
    privacy: "100% trong trình duyệt của bạn qua Canvas — hình ảnh không bao giờ được tải lên.",
  },
  sv: {
    uploadLabel: "Ladda upp en bild",
    uploadHint: "PNG, JPG eller WebP — vi bygger en .ico med flera storlekar (16, 32, 48, 64 px)",
    buildingFavicon: "Bygger favicon…",
    faviconInfo: "favicon.ico · {size} · innehåller {sizes} px",
    downloadBtn: "Ladda ned favicon.ico",
    couldNotGenerate: "Kunde inte generera favicon",
    privacy: "100% i din webbläsare via Canvas — din bild laddas aldrig upp.",
  },
  pl: {
    uploadLabel: "Prześlij obraz",
    uploadHint: "PNG, JPG lub WebP — tworzymy .ico w wielu rozmiarach (16, 32, 48, 64 px)",
    buildingFavicon: "Tworzenie favicon…",
    faviconInfo: "favicon.ico · {size} · zawiera {sizes} px",
    downloadBtn: "Pobierz favicon.ico",
    couldNotGenerate: "Nie można wygenerować favicon",
    privacy: "100% w Twojej przeglądarce przez Canvas — Twój obraz nigdy nie jest przesyłany.",
  },
  uk: {
    uploadLabel: "Завантажити зображення",
    uploadHint: "PNG, JPG або WebP — ми створюємо .ico з декількома розмірами (16, 32, 48, 64 px)",
    buildingFavicon: "Створення фавікону…",
    faviconInfo: "favicon.ico · {size} · містить {sizes} px",
    downloadBtn: "Завантажити favicon.ico",
    couldNotGenerate: "Не вдалося створити фавікон",
    privacy: "100% у браузері через Canvas — зображення ніколи не завантажується.",
  },
  cs: {
    uploadLabel: "Nahrát obrázek",
    uploadHint: "PNG, JPG nebo WebP — vytvoříme .ico s více velikostmi (16, 32, 48, 64 px)",
    buildingFavicon: "Vytváření favikony…",
    faviconInfo: "favicon.ico · {size} · obsahuje {sizes} px",
    downloadBtn: "Stáhnout favicon.ico",
    couldNotGenerate: "Favikonu nelze vygenerovat",
    privacy: "100% ve vašem prohlížeči přes Canvas — váš obrázek se nikdy nenačítá.",
  },
};

const SIZES = [16, 32, 48, 64] as const;

async function pngBytesAt(bmp: ImageBitmap, size: number): Promise<Uint8Array> {
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  // Letterbox to a square so non-square sources don't distort.
  const scale = Math.min(size / bmp.width, size / bmp.height);
  const w = bmp.width * scale, h = bmp.height * scale;
  ctx.drawImage(bmp, (size - w) / 2, (size - h) / 2, w, h);
  const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
  return new Uint8Array(await blob.arrayBuffer());
}

/** Assemble a multi-image ICO that embeds PNG frames (supported by all modern browsers/OSes). */
function buildIco(frames: { size: number; png: Uint8Array }[]): Uint8Array {
  const count = frames.length;
  const header = 6;
  const dirEntry = 16;
  let offset = header + dirEntry * count;
  const dir = new Uint8Array(header + dirEntry * count);
  const dv = new DataView(dir.buffer);
  dv.setUint16(0, 0, true);      // reserved
  dv.setUint16(2, 1, true);      // type 1 = icon
  dv.setUint16(4, count, true);  // image count
  frames.forEach((f, i) => {
    const base = header + dirEntry * i;
    dir[base + 0] = f.size >= 256 ? 0 : f.size; // width (0 = 256)
    dir[base + 1] = f.size >= 256 ? 0 : f.size; // height
    dir[base + 2] = 0;  // palette
    dir[base + 3] = 0;  // reserved
    dv.setUint16(base + 4, 1, true);   // colour planes
    dv.setUint16(base + 6, 32, true);  // bits per pixel
    dv.setUint32(base + 8, f.png.length, true);   // size of PNG data
    dv.setUint32(base + 12, offset, true);        // offset of PNG data
    offset += f.png.length;
  });
  const total = offset;
  const out = new Uint8Array(total);
  out.set(dir, 0);
  let p = header + dirEntry * count;
  for (const f of frames) { out.set(f.png, p); p += f.png.length; }
  return out;
}

export function ImageToIcoClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run(f: File) {
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const bmp = await createImageBitmap(f);
      const frames = await Promise.all(SIZES.map(async (size) => ({ size, png: await pngBytesAt(bmp, size) })));
      bmp.close();
      const ico = buildIco(frames);
      const blob = new Blob([ico as BlobPart], { type: "image/x-icon" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
    } catch (e) {
      setError(`${s.couldNotGenerate}: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function pick(f: File | null) { if (!f) return; setFile(f); run(f); }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {s.buildingFavicon}</p>}

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <p className="text-sm font-medium text-ink-700">{s.faviconInfo.replace("{size}", formatBytes(outSize)).replace("{sizes}", SIZES.join(", "))}</p>
          <a href={outUrl} download="favicon.ico" className="mt-3 inline-block">
            <Button size="lg"><Download className="h-4 w-4" /> {s.downloadBtn}</Button>
          </a>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
