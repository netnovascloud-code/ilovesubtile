"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Drop your image (JPG, PNG, WebP)",
    dropHint: "Your image is processed entirely in your browser — never uploaded.",
    topText: "Top text",
    bottomText: "Bottom text",
    textSize: "Text size",
    generateMeme: "Generate meme",
    download: "Download",
  },
  fr: {
    dropLabel: "Déposez votre image (JPG, PNG, WebP)",
    dropHint: "Votre image est entièrement traitée dans votre navigateur — jamais envoyée.",
    topText: "Texte en haut",
    bottomText: "Texte en bas",
    textSize: "Taille du texte",
    generateMeme: "Générer le mème",
    download: "Télécharger",
  },
  es: {
    dropLabel: "Suelta tu imagen (JPG, PNG, WebP)",
    dropHint: "Tu imagen se procesa completamente en tu navegador — nunca se sube.",
    topText: "Texto superior",
    bottomText: "Texto inferior",
    textSize: "Tamaño del texto",
    generateMeme: "Generar meme",
    download: "Descargar",
  },
  pt: {
    dropLabel: "Solte sua imagem (JPG, PNG, WebP)",
    dropHint: "Sua imagem é processada inteiramente no seu navegador — nunca enviada.",
    topText: "Texto superior",
    bottomText: "Texto inferior",
    textSize: "Tamanho do texto",
    generateMeme: "Gerar meme",
    download: "Baixar",
  },
  de: {
    dropLabel: "Bild ablegen (JPG, PNG, WebP)",
    dropHint: "Ihr Bild wird vollständig in Ihrem Browser verarbeitet — niemals hochgeladen.",
    topText: "Text oben",
    bottomText: "Text unten",
    textSize: "Textgröße",
    generateMeme: "Meme erstellen",
    download: "Herunterladen",
  },
  it: {
    dropLabel: "Trascina la tua immagine (JPG, PNG, WebP)",
    dropHint: "La tua immagine viene elaborata interamente nel browser — non viene mai caricata.",
    topText: "Testo in alto",
    bottomText: "Testo in basso",
    textSize: "Dimensione testo",
    generateMeme: "Genera meme",
    download: "Scarica",
  },
  nl: {
    dropLabel: "Zet uw afbeelding hier neer (JPG, PNG, WebP)",
    dropHint: "Uw afbeelding wordt volledig in uw browser verwerkt — nooit geüpload.",
    topText: "Tekst boven",
    bottomText: "Tekst onder",
    textSize: "Tekstgrootte",
    generateMeme: "Meme maken",
    download: "Downloaden",
  },
  ja: {
    dropLabel: "画像をドロップ (JPG, PNG, WebP)",
    dropHint: "画像はすべてブラウザ内で処理されます — アップロードされません。",
    topText: "上のテキスト",
    bottomText: "下のテキスト",
    textSize: "テキストサイズ",
    generateMeme: "ミームを生成",
    download: "ダウンロード",
  },
  zh: {
    dropLabel: "拖放您的图片 (JPG, PNG, WebP)",
    dropHint: "您的图片完全在浏览器中处理 — 从不上传。",
    topText: "顶部文字",
    bottomText: "底部文字",
    textSize: "文字大小",
    generateMeme: "生成表情包",
    download: "下载",
  },
  ko: {
    dropLabel: "이미지를 드롭하세요 (JPG, PNG, WebP)",
    dropHint: "이미지는 브라우저에서 완전히 처리됩니다 — 업로드되지 않습니다.",
    topText: "상단 텍스트",
    bottomText: "하단 텍스트",
    textSize: "텍스트 크기",
    generateMeme: "밈 생성",
    download: "다운로드",
  },
  ar: {
    dropLabel: "أسقط صورتك هنا (JPG أو PNG أو WebP)",
    dropHint: "تُعالج صورتك بالكامل في متصفحك — لا تُرفع أبدًا.",
    topText: "النص العلوي",
    bottomText: "النص السفلي",
    textSize: "حجم النص",
    generateMeme: "إنشاء ميم",
    download: "تنزيل",
  },
  ru: {
    dropLabel: "Перетащите изображение (JPG, PNG, WebP)",
    dropHint: "Ваше изображение полностью обрабатывается в браузере — никогда не загружается.",
    topText: "Текст вверху",
    bottomText: "Текст внизу",
    textSize: "Размер текста",
    generateMeme: "Создать мем",
    download: "Скачать",
  },
  hi: {
    dropLabel: "अपनी छवि यहाँ छोड़ें (JPG, PNG, WebP)",
    dropHint: "आपकी छवि पूरी तरह से आपके ब्राउज़र में प्रसंस्कृत होती है — कभी अपलोड नहीं होती।",
    topText: "ऊपरी पाठ",
    bottomText: "निचला पाठ",
    textSize: "पाठ आकार",
    generateMeme: "मीम बनाएं",
    download: "डाउनलोड",
  },
  tr: {
    dropLabel: "Görselinizi bırakın (JPG, PNG, WebP)",
    dropHint: "Görseliniz tamamen tarayıcınızda işlenir — hiçbir zaman yüklenmez.",
    topText: "Üst metin",
    bottomText: "Alt metin",
    textSize: "Metin boyutu",
    generateMeme: "Meme oluştur",
    download: "İndir",
  },
  id: {
    dropLabel: "Jatuhkan gambar Anda (JPG, PNG, WebP)",
    dropHint: "Gambar Anda diproses sepenuhnya di browser Anda — tidak pernah diunggah.",
    topText: "Teks atas",
    bottomText: "Teks bawah",
    textSize: "Ukuran teks",
    generateMeme: "Buat meme",
    download: "Unduh",
  },
  vi: {
    dropLabel: "Thả ảnh của bạn vào đây (JPG, PNG, WebP)",
    dropHint: "Ảnh của bạn được xử lý hoàn toàn trên trình duyệt — không bao giờ tải lên.",
    topText: "Văn bản trên",
    bottomText: "Văn bản dưới",
    textSize: "Cỡ chữ",
    generateMeme: "Tạo meme",
    download: "Tải xuống",
  },
  sv: {
    dropLabel: "Släpp din bild här (JPG, PNG, WebP)",
    dropHint: "Din bild bearbetas helt i din webbläsare — laddas aldrig upp.",
    topText: "Text överst",
    bottomText: "Text nederst",
    textSize: "Textstorlek",
    generateMeme: "Generera meme",
    download: "Ladda ner",
  },
  pl: {
    dropLabel: "Upuść swój obraz (JPG, PNG, WebP)",
    dropHint: "Twój obraz jest w całości przetwarzany w przeglądarce — nigdy nie jest przesyłany.",
    topText: "Tekst górny",
    bottomText: "Tekst dolny",
    textSize: "Rozmiar tekstu",
    generateMeme: "Utwórz mema",
    download: "Pobierz",
  },
  uk: {
    dropLabel: "Перетягніть зображення (JPG, PNG, WebP)",
    dropHint: "Ваше зображення повністю обробляється у браузері — ніколи не завантажується.",
    topText: "Верхній текст",
    bottomText: "Нижній текст",
    textSize: "Розмір тексту",
    generateMeme: "Створити мем",
    download: "Завантажити",
  },
  cs: {
    dropLabel: "Přetáhněte obrázek (JPG, PNG, WebP)",
    dropHint: "Váš obrázek je zpracován zcela v prohlížeči — nikdy není nahrán.",
    topText: "Text nahoře",
    bottomText: "Text dole",
    textSize: "Velikost textu",
    generateMeme: "Vytvořit meme",
    download: "Stáhnout",
  },
};

// Classic top/bottom-text meme maker. Live canvas preview, Impact-style
// white text with a black stroke, exports as PNG. No libs, no server.
export function MemeGeneratorClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [top, setTop] = useState("ONE DOES NOT SIMPLY");
  const [bottom, setBottom] = useState("WRITE A GREAT MEME");
  const [fontSize, setFontSize] = useState(60);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = useCallback((f: File) => {
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => { setFile(f); setImg(i); URL.revokeObjectURL(url); };
    i.src = url;
  }, []);

  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current;
    const maxSide = 720;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);
    drawMeme(c.getContext("2d")!, img, c.width, c.height, top, bottom, (fontSize * c.width) / 600);
  }, [img, top, bottom, fontSize]);

  const exportMeme = useCallback(async () => {
    if (!img) return;
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    drawMeme(c.getContext("2d")!, img, c.width, c.height, top, bottom, (fontSize * c.width) / 600);
    const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
    if (out) URL.revokeObjectURL(out.url);
    setOut({ url: URL.createObjectURL(blob), size: blob.size });
  }, [img, top, bottom, fontSize, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setImg(null); setOut(null);
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.topText}
          <input value={top} onChange={(e) => setTop(e.target.value.toUpperCase())} maxLength={120}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.bottomText}
          <input value={bottom} onChange={(e) => setBottom(e.target.value.toUpperCase())} maxLength={120}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs font-medium text-ink-600 sm:w-1/2">
        {s.textSize} {fontSize}px
        <input type="range" min={24} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="accent-brand-500" />
      </label>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportMeme}>{s.generateMeme}</Button>
        {out && (
          <a href={out.url} download={`meme-${Date.now()}.png`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

function drawMeme(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, top: string, bottom: string, size: number) {
  ctx.drawImage(img, 0, 0, w, h);
  // Impact is the canonical meme font but isn't on every system; the fallback
  // chain mirrors what the legacy meme generators ship with.
  ctx.font = `bold ${size}px Impact, "Anton", "Oswald", "Arial Black", sans-serif`;
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.max(2, size / 12);
  const margin = size * 0.4;
  drawLine(ctx, top, w / 2, margin + size * 0.85, w - margin * 2, size);
  drawLine(ctx, bottom, w / 2, h - margin, w - margin * 2, size, true);
}

function drawLine(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, fromBottom = false) {
  // Word-wrap manually since fillText doesn't.
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  const yStart = fromBottom ? y - (lines.length - 1) * lineHeight : y;
  for (let i = 0; i < lines.length; i++) {
    ctx.strokeText(lines[i], x, yStart + i * lineHeight);
    ctx.fillText(lines[i], x, yStart + i * lineHeight);
  }
}
