"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadPdf: "Upload a PDF",
    uploadHint: "A diagonal text watermark is added to every page, in your browser",
    watermarkText: "Watermark text",
    colour: "Colour",
    opacity: "Opacity:",
    fontSize: "Font size:",
    watermarking: "Watermarking…",
    addWatermark: "Add watermark",
    downloadPdf: "Download PDF",
    couldNotWatermark: "Could not watermark the PDF: ",
    privacy: "100% in your browser via pdf-lib — your PDF is never uploaded.",
  },
  fr: {
    uploadPdf: "Télécharger un PDF",
    uploadHint: "Un filigrane texte diagonal est ajouté à chaque page, dans votre navigateur",
    watermarkText: "Texte du filigrane",
    colour: "Couleur",
    opacity: "Opacité :",
    fontSize: "Taille de police :",
    watermarking: "Filigranage en cours…",
    addWatermark: "Ajouter un filigrane",
    downloadPdf: "Télécharger le PDF",
    couldNotWatermark: "Impossible d'ajouter un filigrane : ",
    privacy: "100 % dans votre navigateur via pdf-lib — votre PDF n'est jamais envoyé.",
  },
  es: {
    uploadPdf: "Subir un PDF",
    uploadHint: "Se añade una marca de agua de texto diagonal a cada página, en tu navegador",
    watermarkText: "Texto de la marca de agua",
    colour: "Color",
    opacity: "Opacidad:",
    fontSize: "Tamaño de fuente:",
    watermarking: "Añadiendo marca de agua…",
    addWatermark: "Añadir marca de agua",
    downloadPdf: "Descargar PDF",
    couldNotWatermark: "No se pudo añadir marca de agua: ",
    privacy: "100 % en tu navegador via pdf-lib — tu PDF nunca se sube.",
  },
  pt: {
    uploadPdf: "Carregar um PDF",
    uploadHint: "Uma marca d'água de texto diagonal é adicionada a cada página, no seu navegador",
    watermarkText: "Texto da marca d'água",
    colour: "Cor",
    opacity: "Opacidade:",
    fontSize: "Tamanho da fonte:",
    watermarking: "Adicionando marca d'água…",
    addWatermark: "Adicionar marca d'água",
    downloadPdf: "Baixar PDF",
    couldNotWatermark: "Não foi possível adicionar marca d'água: ",
    privacy: "100 % no seu navegador via pdf-lib — seu PDF nunca é enviado.",
  },
  de: {
    uploadPdf: "PDF hochladen",
    uploadHint: "Ein diagonales Textwasserzeichen wird in Ihrem Browser auf jede Seite hinzugefügt",
    watermarkText: "Wasserzeichentext",
    colour: "Farbe",
    opacity: "Deckkraft:",
    fontSize: "Schriftgröße:",
    watermarking: "Wasserzeichen wird hinzugefügt…",
    addWatermark: "Wasserzeichen hinzufügen",
    downloadPdf: "PDF herunterladen",
    couldNotWatermark: "Wasserzeichen konnte nicht hinzugefügt werden: ",
    privacy: "100 % im Browser über pdf-lib — Ihre PDF wird nie hochgeladen.",
  },
  it: {
    uploadPdf: "Carica un PDF",
    uploadHint: "Una filigrana di testo diagonale viene aggiunta a ogni pagina nel tuo browser",
    watermarkText: "Testo della filigrana",
    colour: "Colore",
    opacity: "Opacità:",
    fontSize: "Dimensione font:",
    watermarking: "Aggiunta filigrana…",
    addWatermark: "Aggiungi filigrana",
    downloadPdf: "Scarica PDF",
    couldNotWatermark: "Impossibile aggiungere la filigrana: ",
    privacy: "100 % nel browser via pdf-lib — il tuo PDF non viene mai caricato.",
  },
  nl: {
    uploadPdf: "PDF uploaden",
    uploadHint: "Een diagonaal tekstwatermerk wordt in uw browser aan elke pagina toegevoegd",
    watermarkText: "Watermerktekst",
    colour: "Kleur",
    opacity: "Dekking:",
    fontSize: "Lettergrootte:",
    watermarking: "Watermerk toevoegen…",
    addWatermark: "Watermerk toevoegen",
    downloadPdf: "PDF downloaden",
    couldNotWatermark: "Watermerk kon niet worden toegevoegd: ",
    privacy: "100 % in uw browser via pdf-lib — uw PDF wordt nooit geüpload.",
  },
  ja: {
    uploadPdf: "PDFをアップロード",
    uploadHint: "斜めテキスト透かしがブラウザ内で全ページに追加されます",
    watermarkText: "透かしテキスト",
    colour: "色",
    opacity: "不透明度:",
    fontSize: "フォントサイズ:",
    watermarking: "透かし追加中…",
    addWatermark: "透かしを追加",
    downloadPdf: "PDFをダウンロード",
    couldNotWatermark: "透かしを追加できませんでした: ",
    privacy: "ブラウザでpdf-lib経由100%処理 — PDFはアップロードされません。",
  },
  zh: {
    uploadPdf: "上传PDF",
    uploadHint: "在您的浏览器中为每页添加斜向文字水印",
    watermarkText: "水印文字",
    colour: "颜色",
    opacity: "不透明度:",
    fontSize: "字体大小:",
    watermarking: "添加水印中…",
    addWatermark: "添加水印",
    downloadPdf: "下载PDF",
    couldNotWatermark: "无法添加水印：",
    privacy: "通过pdf-lib在您的浏览器中100%处理 — PDF永远不会被上传。",
  },
  ko: {
    uploadPdf: "PDF 업로드",
    uploadHint: "브라우저에서 모든 페이지에 대각선 텍스트 워터마크가 추가됩니다",
    watermarkText: "워터마크 텍스트",
    colour: "색상",
    opacity: "불투명도:",
    fontSize: "글꼴 크기:",
    watermarking: "워터마크 추가 중…",
    addWatermark: "워터마크 추가",
    downloadPdf: "PDF 다운로드",
    couldNotWatermark: "워터마크를 추가할 수 없습니다: ",
    privacy: "브라우저에서 pdf-lib로 100% 처리 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    uploadPdf: "تحميل PDF",
    uploadHint: "تُضاف علامة مائية نصية قطرية إلى كل صفحة في متصفحك",
    watermarkText: "نص العلامة المائية",
    colour: "اللون",
    opacity: "الشفافية:",
    fontSize: "حجم الخط:",
    watermarking: "جاري إضافة العلامة المائية…",
    addWatermark: "إضافة علامة مائية",
    downloadPdf: "تنزيل PDF",
    couldNotWatermark: "تعذّر إضافة علامة مائية: ",
    privacy: "100% في متصفحك عبر pdf-lib — لن يتم تحميل ملف PDF مطلقًا.",
  },
  ru: {
    uploadPdf: "Загрузить PDF",
    uploadHint: "На каждую страницу добавляется диагональный текстовый водяной знак в браузере",
    watermarkText: "Текст водяного знака",
    colour: "Цвет",
    opacity: "Прозрачность:",
    fontSize: "Размер шрифта:",
    watermarking: "Добавление водяного знака…",
    addWatermark: "Добавить водяной знак",
    downloadPdf: "Скачать PDF",
    couldNotWatermark: "Не удалось добавить водяной знак: ",
    privacy: "100% в вашем браузере через pdf-lib — ваш PDF не загружается.",
  },
  hi: {
    uploadPdf: "PDF अपलोड करें",
    uploadHint: "आपके ब्राउज़र में हर पेज पर विकर्ण टेक्स्ट वॉटरमार्क जोड़ा जाता है",
    watermarkText: "वॉटरमार्क टेक्स्ट",
    colour: "रंग",
    opacity: "अपारदर्शिता:",
    fontSize: "फ़ॉन्ट आकार:",
    watermarking: "वॉटरमार्क जोड़ा जा रहा है…",
    addWatermark: "वॉटरमार्क जोड़ें",
    downloadPdf: "PDF डाउनलोड करें",
    couldNotWatermark: "PDF पर वॉटरमार्क नहीं लगा सका: ",
    privacy: "आपके ब्राउज़र में pdf-lib द्वारा 100% — PDF कभी अपलोड नहीं होता।",
  },
  tr: {
    uploadPdf: "PDF yükle",
    uploadHint: "Tarayıcınızda her sayfaya çapraz metin filigranı eklenir",
    watermarkText: "Filigran metni",
    colour: "Renk",
    opacity: "Opaklık:",
    fontSize: "Yazı tipi boyutu:",
    watermarking: "Filigran ekleniyor…",
    addWatermark: "Filigran ekle",
    downloadPdf: "PDF indir",
    couldNotWatermark: "Filigran eklenemedi: ",
    privacy: "Tarayıcınızda pdf-lib aracılığıyla 100% — PDF'iniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadPdf: "Unggah PDF",
    uploadHint: "Tanda air teks diagonal ditambahkan ke setiap halaman di browser Anda",
    watermarkText: "Teks tanda air",
    colour: "Warna",
    opacity: "Opasitas:",
    fontSize: "Ukuran font:",
    watermarking: "Menambahkan tanda air…",
    addWatermark: "Tambahkan tanda air",
    downloadPdf: "Unduh PDF",
    couldNotWatermark: "Gagal menambahkan tanda air: ",
    privacy: "100% di browser Anda via pdf-lib — PDF Anda tidak pernah diunggah.",
  },
  vi: {
    uploadPdf: "Tải lên PDF",
    uploadHint: "Hình mờ văn bản chéo được thêm vào mỗi trang trong trình duyệt của bạn",
    watermarkText: "Văn bản hình mờ",
    colour: "Màu sắc",
    opacity: "Độ mờ:",
    fontSize: "Cỡ chữ:",
    watermarking: "Đang thêm hình mờ…",
    addWatermark: "Thêm hình mờ",
    downloadPdf: "Tải xuống PDF",
    couldNotWatermark: "Không thể thêm hình mờ: ",
    privacy: "100% trong trình duyệt qua pdf-lib — PDF của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadPdf: "Ladda upp PDF",
    uploadHint: "En diagonal textvattenstämpel läggs till på varje sida i din webbläsare",
    watermarkText: "Vattenstämpeltext",
    colour: "Färg",
    opacity: "Opacitet:",
    fontSize: "Teckenstorlek:",
    watermarking: "Lägger till vattenstämpel…",
    addWatermark: "Lägg till vattenstämpel",
    downloadPdf: "Ladda ner PDF",
    couldNotWatermark: "Kunde inte lägga till vattenstämpel: ",
    privacy: "100% i din webbläsare via pdf-lib — din PDF laddas aldrig upp.",
  },
  pl: {
    uploadPdf: "Prześlij PDF",
    uploadHint: "Do każdej strony w przeglądarce dodawany jest ukośny tekst znaku wodnego",
    watermarkText: "Tekst znaku wodnego",
    colour: "Kolor",
    opacity: "Krycie:",
    fontSize: "Rozmiar czcionki:",
    watermarking: "Dodawanie znaku wodnego…",
    addWatermark: "Dodaj znak wodny",
    downloadPdf: "Pobierz PDF",
    couldNotWatermark: "Nie można dodać znaku wodnego: ",
    privacy: "100% w Twojej przeglądarce via pdf-lib — Twój PDF nigdy nie jest przesyłany.",
  },
  uk: {
    uploadPdf: "Завантажити PDF",
    uploadHint: "До кожної сторінки в браузері додається діагональний текстовий водяний знак",
    watermarkText: "Текст водяного знаку",
    colour: "Колір",
    opacity: "Прозорість:",
    fontSize: "Розмір шрифту:",
    watermarking: "Додавання водяного знаку…",
    addWatermark: "Додати водяний знак",
    downloadPdf: "Завантажити PDF",
    couldNotWatermark: "Не вдалося додати водяний знак: ",
    privacy: "100% у вашому браузері через pdf-lib — ваш PDF ніколи не завантажується.",
  },
  cs: {
    uploadPdf: "Nahrát PDF",
    uploadHint: "Na každou stránku ve vašem prohlížeči se přidá diagonální textový vodoznak",
    watermarkText: "Text vodoznaku",
    colour: "Barva",
    opacity: "Neprůhlednost:",
    fontSize: "Velikost písma:",
    watermarking: "Přidávání vodoznaku…",
    addWatermark: "Přidat vodoznak",
    downloadPdf: "Stáhnout PDF",
    couldNotWatermark: "Vodoznak nelze přidat: ",
    privacy: "100% ve vašem prohlížeči přes pdf-lib — váš PDF soubor není nikdy nahrán.",
  },
};

function hexToRgb01(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const n = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const int = parseInt(n, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

export function WatermarkPdfClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [color, setColor] = useState("#ff0000");
  const [opacity, setOpacity] = useState(0.2);
  const [size, setSize] = useState(48);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("watermarked.pdf");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const [r, g, b] = hexToRgb01(color);
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const tw = font.widthOfTextAtSize(text, size);
        // Centre the diagonal watermark on the page.
        page.drawText(text, {
          x: width / 2 - (tw / 2) * Math.cos(Math.PI / 4),
          y: height / 2 - (tw / 2) * Math.sin(Math.PI / 4),
          size,
          font,
          color: rgb(r, g, b),
          opacity,
          rotate: degrees(45),
        });
      }
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-watermarked.pdf");
    } catch (e) {
      setError(`${s.couldNotWatermark}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadPdf}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setOutUrl(null); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600 sm:col-span-2">
            {s.watermarkText}
            <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-ink-600">
            {s.colour} <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-7 w-10 cursor-pointer rounded border-0 bg-transparent p-0" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.opacity} {Math.round(opacity * 100)}%
            <input type="range" min={5} max={80} value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="mt-1" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.fontSize} {size}pt
            <input type="range" min={18} max={120} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-1" />
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {file && <Button size="lg" onClick={run} disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}{busy ? s.watermarking : s.addWatermark}</Button>}
        {outUrl && <a href={outUrl} download={outName}><Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.downloadPdf}</Button></a>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
