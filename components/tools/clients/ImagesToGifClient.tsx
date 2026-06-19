"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Loader2, Upload, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropTitle: "Drop 2 or more images",
    dropHint: "JPG, PNG, WebP — every frame stays on your device.",
    chooseImages: "Choose images",
    addMore: "Add more",
    frameCount_one: "frame",
    frameCount_other: "frames",
    labelFrameDelay: "Frame delay",
    labelLongestSide: "Longest side",
    labelLoop: "Loop forever",
    encodingGif: "Encoding GIF…",
    buildGif: "Build GIF",
    buildGifWithCount: "Build GIF ({count} frames)",
    download: "Download",
    errorMinFrames: "Add at least 2 images.",
    couldNotBuildGif: "Could not build GIF.",
    privacy: "Drag a thumbnail to reorder frames. Encoding runs entirely in your browser — your images are never uploaded.",
  },
  fr: {
    dropTitle: "Déposez 2 images ou plus",
    dropHint: "JPG, PNG, WebP — chaque image reste sur votre appareil.",
    chooseImages: "Choisir des images",
    addMore: "Ajouter",
    frameCount_one: "image",
    frameCount_other: "images",
    labelFrameDelay: "Délai entre images",
    labelLongestSide: "Côté le plus long",
    labelLoop: "Boucler indéfiniment",
    encodingGif: "Encodage du GIF…",
    buildGif: "Créer le GIF",
    buildGifWithCount: "Créer le GIF ({count} images)",
    download: "Télécharger",
    errorMinFrames: "Ajoutez au moins 2 images.",
    couldNotBuildGif: "Impossible de créer le GIF.",
    privacy: "Faites glisser une miniature pour réordonner les images. L'encodage s'effectue entièrement dans votre navigateur — vos images ne sont jamais envoyées.",
  },
  es: {
    dropTitle: "Suelta 2 o más imágenes",
    dropHint: "JPG, PNG, WebP — cada fotograma permanece en tu dispositivo.",
    chooseImages: "Elegir imágenes",
    addMore: "Añadir más",
    frameCount_one: "fotograma",
    frameCount_other: "fotogramas",
    labelFrameDelay: "Retardo entre fotogramas",
    labelLongestSide: "Lado más largo",
    labelLoop: "Repetir siempre",
    encodingGif: "Codificando GIF…",
    buildGif: "Crear GIF",
    buildGifWithCount: "Crear GIF ({count} fotogramas)",
    download: "Descargar",
    errorMinFrames: "Añade al menos 2 imágenes.",
    couldNotBuildGif: "No se pudo crear el GIF.",
    privacy: "Arrastra una miniatura para reordenar fotogramas. La codificación se ejecuta completamente en tu navegador — tus imágenes nunca se suben.",
  },
  pt: {
    dropTitle: "Solte 2 ou mais imagens",
    dropHint: "JPG, PNG, WebP — cada fotograma fica no seu dispositivo.",
    chooseImages: "Escolher imagens",
    addMore: "Adicionar mais",
    frameCount_one: "fotograma",
    frameCount_other: "fotogramas",
    labelFrameDelay: "Atraso entre fotogramas",
    labelLongestSide: "Lado mais longo",
    labelLoop: "Repetir sempre",
    encodingGif: "A codificar GIF…",
    buildGif: "Criar GIF",
    buildGifWithCount: "Criar GIF ({count} fotogramas)",
    download: "Baixar",
    errorMinFrames: "Adicione pelo menos 2 imagens.",
    couldNotBuildGif: "Não foi possível criar o GIF.",
    privacy: "Arraste uma miniatura para reordenar os fotogramas. A codificação ocorre inteiramente no seu navegador — as suas imagens nunca são enviadas.",
  },
  de: {
    dropTitle: "2 oder mehr Bilder ablegen",
    dropHint: "JPG, PNG, WebP — jedes Bild verbleibt auf Ihrem Gerät.",
    chooseImages: "Bilder auswählen",
    addMore: "Mehr hinzufügen",
    frameCount_one: "Bild",
    frameCount_other: "Bilder",
    labelFrameDelay: "Bildverzögerung",
    labelLongestSide: "Längste Seite",
    labelLoop: "Endlos wiederholen",
    encodingGif: "GIF wird kodiert…",
    buildGif: "GIF erstellen",
    buildGifWithCount: "GIF erstellen ({count} Bilder)",
    download: "Herunterladen",
    errorMinFrames: "Fügen Sie mindestens 2 Bilder hinzu.",
    couldNotBuildGif: "GIF konnte nicht erstellt werden.",
    privacy: "Ziehen Sie ein Vorschaubild, um die Reihenfolge zu ändern. Kodierung erfolgt vollständig im Browser — Ihre Bilder werden nie hochgeladen.",
  },
  it: {
    dropTitle: "Trascina 2 o più immagini",
    dropHint: "JPG, PNG, WebP — ogni fotogramma rimane sul tuo dispositivo.",
    chooseImages: "Scegli immagini",
    addMore: "Aggiungi altri",
    frameCount_one: "fotogramma",
    frameCount_other: "fotogrammi",
    labelFrameDelay: "Ritardo fotogramma",
    labelLongestSide: "Lato più lungo",
    labelLoop: "Ripeti all'infinito",
    encodingGif: "Codifica GIF…",
    buildGif: "Crea GIF",
    buildGifWithCount: "Crea GIF ({count} fotogrammi)",
    download: "Scarica",
    errorMinFrames: "Aggiungi almeno 2 immagini.",
    couldNotBuildGif: "Impossibile creare il GIF.",
    privacy: "Trascina una miniatura per riordinare i fotogrammi. La codifica avviene interamente nel browser — le tue immagini non vengono mai caricate.",
  },
  nl: {
    dropTitle: "Sleep 2 of meer afbeeldingen",
    dropHint: "JPG, PNG, WebP — elk frame blijft op uw apparaat.",
    chooseImages: "Afbeeldingen kiezen",
    addMore: "Meer toevoegen",
    frameCount_one: "frame",
    frameCount_other: "frames",
    labelFrameDelay: "Framevertraging",
    labelLongestSide: "Langste zijde",
    labelLoop: "Eindeloos herhalen",
    encodingGif: "GIF wordt gecodeerd…",
    buildGif: "GIF bouwen",
    buildGifWithCount: "GIF bouwen ({count} frames)",
    download: "Downloaden",
    errorMinFrames: "Voeg minimaal 2 afbeeldingen toe.",
    couldNotBuildGif: "Kon GIF niet bouwen.",
    privacy: "Sleep een miniatuur om frames te herordenen. Codering verloopt volledig in uw browser — uw afbeeldingen worden nooit geüpload.",
  },
  ja: {
    dropTitle: "2枚以上の画像をドロップ",
    dropHint: "JPG, PNG, WebP — すべてのフレームはデバイスに残ります。",
    chooseImages: "画像を選択",
    addMore: "追加",
    frameCount_one: "フレーム",
    frameCount_other: "フレーム",
    labelFrameDelay: "フレーム間隔",
    labelLongestSide: "最長辺",
    labelLoop: "ループする",
    encodingGif: "GIF をエンコード中…",
    buildGif: "GIF を作成",
    buildGifWithCount: "GIF を作成 ({count} フレーム)",
    download: "ダウンロード",
    errorMinFrames: "2枚以上の画像を追加してください。",
    couldNotBuildGif: "GIF を作成できませんでした。",
    privacy: "サムネイルをドラッグしてフレームの順序を変更できます。エンコードはブラウザ内で完全に実行されます—画像はアップロードされません。",
  },
  zh: {
    dropTitle: "拖入 2 张或更多图片",
    dropHint: "JPG、PNG、WebP — 每一帧都保存在您的设备上。",
    chooseImages: "选择图片",
    addMore: "添加更多",
    frameCount_one: "帧",
    frameCount_other: "帧",
    labelFrameDelay: "帧延迟",
    labelLongestSide: "最长边",
    labelLoop: "循环播放",
    encodingGif: "正在编码 GIF…",
    buildGif: "构建 GIF",
    buildGifWithCount: "构建 GIF（{count} 帧）",
    download: "下载",
    errorMinFrames: "至少添加 2 张图片。",
    couldNotBuildGif: "无法构建 GIF。",
    privacy: "拖动缩略图重新排列帧。编码完全在您的浏览器中运行—图片永远不会被上传。",
  },
  ko: {
    dropTitle: "2장 이상의 이미지를 드롭",
    dropHint: "JPG, PNG, WebP — 모든 프레임은 기기에 저장됩니다.",
    chooseImages: "이미지 선택",
    addMore: "더 추가",
    frameCount_one: "프레임",
    frameCount_other: "프레임",
    labelFrameDelay: "프레임 지연",
    labelLongestSide: "가장 긴 면",
    labelLoop: "무한 반복",
    encodingGif: "GIF 인코딩 중…",
    buildGif: "GIF 만들기",
    buildGifWithCount: "GIF 만들기 ({count} 프레임)",
    download: "다운로드",
    errorMinFrames: "이미지를 2장 이상 추가하세요.",
    couldNotBuildGif: "GIF를 만들 수 없습니다.",
    privacy: "썸네일을 드래그하여 프레임 순서를 변경하세요. 인코딩은 완전히 브라우저에서 실행됩니다—이미지는 업로드되지 않습니다.",
  },
  ar: {
    dropTitle: "أفلت صورتين أو أكثر",
    dropHint: "JPG أو PNG أو WebP — كل إطار يبقى على جهازك.",
    chooseImages: "اختر صوراً",
    addMore: "إضافة المزيد",
    frameCount_one: "إطار",
    frameCount_other: "إطارات",
    labelFrameDelay: "تأخير الإطار",
    labelLongestSide: "الجانب الأطول",
    labelLoop: "تكرار لا نهائي",
    encodingGif: "جاريترميز GIF…",
    buildGif: "إنشاء GIF",
    buildGifWithCount: "إنشاء GIF ({count} إطارات)",
    download: "تنزيل",
    errorMinFrames: "أضف صورتين على الأقل.",
    couldNotBuildGif: "تعذّر إنشاء GIF.",
    privacy: "اسحب صورة مصغّرة لإعادة ترتيب الإطارات. يعمل الترميز بالكامل في متصفحك — لا تُرفَع صورك أبداً.",
  },
  ru: {
    dropTitle: "Перетащите 2 или более изображения",
    dropHint: "JPG, PNG, WebP — каждый кадр остаётся на вашем устройстве.",
    chooseImages: "Выбрать изображения",
    addMore: "Добавить ещё",
    frameCount_one: "кадр",
    frameCount_other: "кадров",
    labelFrameDelay: "Задержка кадра",
    labelLongestSide: "Наибольшая сторона",
    labelLoop: "Бесконечный цикл",
    encodingGif: "Кодирование GIF…",
    buildGif: "Создать GIF",
    buildGifWithCount: "Создать GIF ({count} кадров)",
    download: "Скачать",
    errorMinFrames: "Добавьте не менее 2 изображений.",
    couldNotBuildGif: "Не удалось создать GIF.",
    privacy: "Перетащите миниатюру для изменения порядка кадров. Кодирование полностью в браузере — ваши изображения никогда не загружаются.",
  },
  hi: {
    dropTitle: "2 या अधिक छवियाँ छोड़ें",
    dropHint: "JPG, PNG, WebP — हर फ्रेम आपके डिवाइस पर रहता है।",
    chooseImages: "छवियाँ चुनें",
    addMore: "और जोड़ें",
    frameCount_one: "फ्रेम",
    frameCount_other: "फ्रेम",
    labelFrameDelay: "फ्रेम विलंब",
    labelLongestSide: "सबसे लंबी भुजा",
    labelLoop: "अनंत लूप",
    encodingGif: "GIF एन्कोड हो रहा है…",
    buildGif: "GIF बनाएं",
    buildGifWithCount: "GIF बनाएं ({count} फ्रेम)",
    download: "डाउनलोड",
    errorMinFrames: "कम से कम 2 छवियाँ जोड़ें।",
    couldNotBuildGif: "GIF नहीं बन सका।",
    privacy: "फ्रेम क्रमबद्ध करने के लिए थंबनेल खींचें। एन्कोडिंग पूरी तरह से आपके ब्राउज़र में होती है — आपकी छवियाँ कभी अपलोड नहीं होती।",
  },
  tr: {
    dropTitle: "2 veya daha fazla görsel bırakın",
    dropHint: "JPG, PNG, WebP — her kare cihazınızda kalır.",
    chooseImages: "Görseller seç",
    addMore: "Daha fazla ekle",
    frameCount_one: "kare",
    frameCount_other: "kare",
    labelFrameDelay: "Kare gecikmesi",
    labelLongestSide: "En uzun kenar",
    labelLoop: "Sonsuza döngü",
    encodingGif: "GIF kodlanıyor…",
    buildGif: "GIF oluştur",
    buildGifWithCount: "GIF oluştur ({count} kare)",
    download: "İndir",
    errorMinFrames: "En az 2 görsel ekleyin.",
    couldNotBuildGif: "GIF oluşturulamadı.",
    privacy: "Kareleri yeniden sıralamak için küçük resim sürükleyin. Kodlama tamamen tarayıcınızda çalışır — görselleriniz hiçbir zaman yüklenmez.",
  },
  id: {
    dropTitle: "Seret 2 atau lebih gambar",
    dropHint: "JPG, PNG, WebP — setiap frame tetap di perangkat Anda.",
    chooseImages: "Pilih gambar",
    addMore: "Tambah lebih",
    frameCount_one: "frame",
    frameCount_other: "frame",
    labelFrameDelay: "Penundaan frame",
    labelLongestSide: "Sisi terpanjang",
    labelLoop: "Ulangi selamanya",
    encodingGif: "Mengkode GIF…",
    buildGif: "Buat GIF",
    buildGifWithCount: "Buat GIF ({count} frame)",
    download: "Unduh",
    errorMinFrames: "Tambahkan setidaknya 2 gambar.",
    couldNotBuildGif: "Gagal membuat GIF.",
    privacy: "Seret thumbnail untuk mengurutkan frame. Pengkodean berjalan sepenuhnya di browser Anda — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    dropTitle: "Thả 2 hình ảnh trở lên",
    dropHint: "JPG, PNG, WebP — mỗi khung hình ở lại thiết bị của bạn.",
    chooseImages: "Chọn hình ảnh",
    addMore: "Thêm nữa",
    frameCount_one: "khung hình",
    frameCount_other: "khung hình",
    labelFrameDelay: "Độ trễ khung hình",
    labelLongestSide: "Cạnh dài nhất",
    labelLoop: "Lặp mãi mãi",
    encodingGif: "Đang mã hóa GIF…",
    buildGif: "Tạo GIF",
    buildGifWithCount: "Tạo GIF ({count} khung hình)",
    download: "Tải xuống",
    errorMinFrames: "Thêm ít nhất 2 hình ảnh.",
    couldNotBuildGif: "Không thể tạo GIF.",
    privacy: "Kéo hình thu nhỏ để sắp xếp lại khung hình. Mã hóa chạy hoàn toàn trong trình duyệt của bạn — hình ảnh không bao giờ được tải lên.",
  },
  sv: {
    dropTitle: "Släpp 2 eller fler bilder",
    dropHint: "JPG, PNG, WebP — varje bildruta stannar på din enhet.",
    chooseImages: "Välj bilder",
    addMore: "Lägg till fler",
    frameCount_one: "bildruta",
    frameCount_other: "bildrutor",
    labelFrameDelay: "Bildrutefördröjning",
    labelLongestSide: "Längsta sida",
    labelLoop: "Loopa för alltid",
    encodingGif: "Kodar GIF…",
    buildGif: "Bygg GIF",
    buildGifWithCount: "Bygg GIF ({count} bildrutor)",
    download: "Ladda ned",
    errorMinFrames: "Lägg till minst 2 bilder.",
    couldNotBuildGif: "Kunde inte bygga GIF.",
    privacy: "Dra ett miniatyr för att ändra ordning på bildrutor. Kodning körs helt i din webbläsare — dina bilder laddas aldrig upp.",
  },
  pl: {
    dropTitle: "Upuść 2 lub więcej obrazów",
    dropHint: "JPG, PNG, WebP — każda klatka pozostaje na Twoim urządzeniu.",
    chooseImages: "Wybierz obrazy",
    addMore: "Dodaj więcej",
    frameCount_one: "klatka",
    frameCount_other: "klatek",
    labelFrameDelay: "Opóźnienie klatki",
    labelLongestSide: "Najdłuższy bok",
    labelLoop: "Zapętl na zawsze",
    encodingGif: "Kodowanie GIF…",
    buildGif: "Utwórz GIF",
    buildGifWithCount: "Utwórz GIF ({count} klatek)",
    download: "Pobierz",
    errorMinFrames: "Dodaj co najmniej 2 obrazy.",
    couldNotBuildGif: "Nie można utworzyć GIF.",
    privacy: "Przeciągnij miniaturę, aby zmienić kolejność klatek. Kodowanie odbywa się w całości w Twojej przeglądarce — Twoje obrazy nigdy nie są przesyłane.",
  },
  uk: {
    dropTitle: "Перетягніть 2 або більше зображень",
    dropHint: "JPG, PNG, WebP — кожен кадр залишається на вашому пристрої.",
    chooseImages: "Вибрати зображення",
    addMore: "Додати ще",
    frameCount_one: "кадр",
    frameCount_other: "кадрів",
    labelFrameDelay: "Затримка кадру",
    labelLongestSide: "Найбільша сторона",
    labelLoop: "Нескінченний цикл",
    encodingGif: "Кодування GIF…",
    buildGif: "Створити GIF",
    buildGifWithCount: "Створити GIF ({count} кадрів)",
    download: "Завантажити",
    errorMinFrames: "Додайте щонайменше 2 зображення.",
    couldNotBuildGif: "Не вдалося створити GIF.",
    privacy: "Перетягніть мініатюру для зміни порядку кадрів. Кодування повністю у браузері — зображення ніколи не завантажуються.",
  },
  cs: {
    dropTitle: "Přetáhněte 2 nebo více obrázků",
    dropHint: "JPG, PNG, WebP — každý snímek zůstává na vašem zařízení.",
    chooseImages: "Vybrat obrázky",
    addMore: "Přidat další",
    frameCount_one: "snímek",
    frameCount_other: "snímků",
    labelFrameDelay: "Zpoždění snímku",
    labelLongestSide: "Nejdelší strana",
    labelLoop: "Opakovat donekonečna",
    encodingGif: "Kódování GIF…",
    buildGif: "Sestavit GIF",
    buildGifWithCount: "Sestavit GIF ({count} snímků)",
    download: "Stáhnout",
    errorMinFrames: "Přidejte alespoň 2 obrázky.",
    couldNotBuildGif: "GIF nelze sestavit.",
    privacy: "Přetažením miniatury změňte pořadí snímků. Kódování probíhá zcela ve vašem prohlížeči — vaše obrázky se nikdy nenačítají.",
  },
};

// Build an animated GIF from a sequence of images using gifenc, loaded from
// esm.sh on first export. gifenc encodes on the MAIN THREAD (no Web Worker),
// which avoids the cross-origin-worker failure gif.js hit in production. Output
// stays purely in the browser, never uploaded.
type GifencModule = {
  GIFEncoder: () => {
    writeFrame: (index: Uint8Array, w: number, h: number, opts: Record<string, unknown>) => void;
    finish: () => void;
    bytes: () => Uint8Array;
  };
  quantize: (rgba: Uint8ClampedArray, maxColors: number) => number[][];
  applyPalette: (rgba: Uint8ClampedArray, palette: number[][]) => Uint8Array;
};

type Frame = { id: string; file: File; url: string };

const ROW = (cols: string[]) => cols.join(" ");

export function ImagesToGifClient() {
  const s = T[useLocale()] ?? T.en;

  const [frames, setFrames] = useState<Frame[]>([]);
  const [delayMs, setDelayMs] = useState(400);
  const [size, setSize] = useState(480);                  // longest side, px
  const [loop, setLoop] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const dragIdx = useRef<number | null>(null);

  // Revoke object URLs only on unmount. Keying this on [frames, out] previously
  // revoked every frame's URL on each add/remove/reorder, breaking the surviving
  // thumbnails. A ref holds the latest set so we revoke exactly once at the end.
  const cleanupRef = useRef({ frames, out });
  cleanupRef.current = { frames, out };
  useEffect(() => () => {
    cleanupRef.current.frames.forEach((f) => URL.revokeObjectURL(f.url));
    if (cleanupRef.current.out) URL.revokeObjectURL(cleanupRef.current.out.url);
  }, []);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const incoming: Frame[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) continue;
      incoming.push({ id: crypto.randomUUID(), file: f, url: URL.createObjectURL(f) });
    }
    setFrames((prev) => [...prev, ...incoming]);
    setError(null);
  };

  const move = (from: number, to: number) => {
    if (from === to) return;
    setFrames((p) => { const c = p.slice(); const [it] = c.splice(from, 1); c.splice(to, 0, it); return c; });
  };
  const remove = (i: number) => setFrames((p) => p.filter((_, idx) => idx !== i));

  const buildGif = useCallback(async () => {
    if (frames.length < 2) { setError(s.errorMinFrames); return; }
    setBusy(true); setError(null); setProgress(0);
    try {
      // Pre-load every image so we know its dimensions before sizing the canvas.
      const imgs = await Promise.all(frames.map((f) => loadImage(f.url)));
      const targetW = size;
      // Scale every frame to fit `size` on the longest side, then center on
      // a canvas matching the FIRST frame's aspect — gif.js requires every
      // frame to have the same dimensions.
      const first = imgs[0];
      const ratio = first.naturalWidth / first.naturalHeight;
      const W = Math.round(ratio >= 1 ? targetW : targetW * ratio);
      const H = Math.round(ratio >= 1 ? targetW / ratio : targetW);

      // gifenc encodes on the MAIN THREAD (no Web Worker) — this avoids the
      // cross-origin worker that gif.js failed/hung on in production. Import via
      // a URL variable so TS doesn't try to resolve the literal as a module.
      const gifencUrl = "https://esm.sh/gifenc@1.0.3";
      const { GIFEncoder, quantize, applyPalette } = (await import(/* webpackIgnore: true */ gifencUrl)) as GifencModule;
      const enc = GIFEncoder();
      for (let i = 0; i < imgs.length; i++) {
        const im = imgs[i];
        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, H);
        // Fit (object-fit:contain) — never crop, fill the rest with white.
        const r2 = im.naturalWidth / im.naturalHeight;
        let dw = W, dh = H, dx = 0, dy = 0;
        if (r2 > W / H) { dh = W / r2; dy = (H - dh) / 2; }
        else { dw = H * r2; dx = (W - dw) / 2; }
        ctx.drawImage(im, dx, dy, dw, dh);
        const { data } = ctx.getImageData(0, 0, W, H);
        const palette = quantize(data, 256);
        const index = applyPalette(data, palette);
        enc.writeFrame(index, W, H, { palette, delay: delayMs, ...(i === 0 ? { repeat: loop ? 0 : -1 } : {}) });
        setProgress(Math.round(((i + 1) / imgs.length) * 100));
        await new Promise((r) => setTimeout(r, 0)); // let the progress bar paint
      }
      enc.finish();
      const blob = new Blob([enc.bytes() as BlobPart], { type: "image/gif" });
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotBuildGif);
    } finally {
      setBusy(false);
    }
  }, [frames, delayMs, size, loop, out, s.errorMinFrames, s.couldNotBuildGif]);

  const reset = () => {
    frames.forEach((f) => URL.revokeObjectURL(f.url));
    if (out) URL.revokeObjectURL(out.url);
    setFrames([]); setOut(null); setError(null); setProgress(0);
  };

  const frameLabel = frames.length === 1 ? s.frameCount_one : s.frameCount_other;

  if (!frames.length) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">{s.dropTitle}</div>
        <div className="text-sm text-ink-500">{s.dropHint}</div>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{s.chooseImages}</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-ink-700">{frames.length} {frameLabel}</div>
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300">
            <Upload className="h-3.5 w-3.5" /> {s.addMore}
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
          </label>
          <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {frames.map((f, i) => (
          <li key={f.id}
            draggable
            onDragStart={() => { dragIdx.current = i; }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIdx.current !== null) move(dragIdx.current, i); dragIdx.current = null; }}
            className="group relative cursor-move rounded-lg border border-ink-200 bg-white p-1.5 shadow-sm hover:border-brand-300">
            <button onClick={() => remove(i)} className="absolute right-1 top-1 z-10 grid h-6 w-6 place-items-center rounded bg-white/90 text-red-600 opacity-0 shadow ring-1 ring-ink-200 transition-opacity hover:bg-red-50 group-hover:opacity-100" title="Remove">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <img src={f.url} alt={`frame ${i + 1}`} className="mx-auto block max-h-28 w-auto" />
            <div className="mt-1 flex items-center justify-between text-[10px] text-ink-500">
              <GripVertical className="h-3 w-3" />
              <span>#{i + 1}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.labelFrameDelay} {delayMs} ms
          <input type="range" min={50} max={2000} step={50} value={delayMs} onChange={(e) => setDelayMs(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.labelLongestSide} {size}px
          <input type="range" min={120} max={1080} step={20} value={size} onChange={(e) => setSize(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="mt-5 inline-flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} className="h-4 w-4" />
          {s.labelLoop}
        </label>
      </div>

      {busy && (
        <div className="space-y-2 rounded-lg border border-ink-100 bg-ink-50/40 p-3 text-sm text-ink-600">
          <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />{s.encodingGif}</div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-200">
            <div className="h-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={buildGif} disabled={busy || frames.length < 2}>
          {busy ? s.encodingGif : s.buildGifWithCount.replace("{count}", String(frames.length))}
        </Button>
        {out && (
          <a href={out.url} download={`animation-${Date.now()}.gif`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>

      {out && (
        <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
          <img src={out.url} alt="preview" className="mx-auto block max-h-64" />
        </div>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error("could not decode image"));
    i.src = url;
  });
}
