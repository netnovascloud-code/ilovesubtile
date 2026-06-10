"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadPdf: "Upload a PDF",
    uploadHint: "Page numbers are added to every page, in your browser",
    position: "Position",
    posBottomCenter: "Bottom centre",
    posBottomRight: "Bottom right",
    posBottomLeft: "Bottom left",
    posTopCenter: "Top centre",
    posTopRight: "Top right",
    format: "Format",
    startAt: "Start at",
    fontSize: "Font size:",
    numbering: "Numbering…",
    addPageNumbers: "Add page numbers",
    downloadPdf: "Download PDF",
    couldNotAdd: "Could not add page numbers: ",
    privacy: "100% in your browser via pdf-lib — your PDF is never uploaded.",
  },
  fr: {
    uploadPdf: "Télécharger un PDF",
    uploadHint: "Les numéros de page sont ajoutés à chaque page, dans votre navigateur",
    position: "Position",
    posBottomCenter: "Bas centre",
    posBottomRight: "Bas droite",
    posBottomLeft: "Bas gauche",
    posTopCenter: "Haut centre",
    posTopRight: "Haut droite",
    format: "Format",
    startAt: "Commencer à",
    fontSize: "Taille de police :",
    numbering: "Numérotation en cours…",
    addPageNumbers: "Ajouter des numéros de page",
    downloadPdf: "Télécharger le PDF",
    couldNotAdd: "Impossible d'ajouter les numéros de page : ",
    privacy: "100 % dans votre navigateur via pdf-lib — votre PDF n'est jamais envoyé.",
  },
  es: {
    uploadPdf: "Subir un PDF",
    uploadHint: "Se añaden números de página a cada página, en tu navegador",
    position: "Posición",
    posBottomCenter: "Centro inferior",
    posBottomRight: "Inferior derecho",
    posBottomLeft: "Inferior izquierdo",
    posTopCenter: "Centro superior",
    posTopRight: "Superior derecho",
    format: "Formato",
    startAt: "Comenzar en",
    fontSize: "Tamaño de fuente:",
    numbering: "Numerando…",
    addPageNumbers: "Añadir números de página",
    downloadPdf: "Descargar PDF",
    couldNotAdd: "No se pudieron añadir números de página: ",
    privacy: "100 % en tu navegador via pdf-lib — tu PDF nunca se sube.",
  },
  pt: {
    uploadPdf: "Carregar um PDF",
    uploadHint: "Números de página são adicionados a cada página, no seu navegador",
    position: "Posição",
    posBottomCenter: "Centro inferior",
    posBottomRight: "Direita inferior",
    posBottomLeft: "Esquerda inferior",
    posTopCenter: "Centro superior",
    posTopRight: "Direita superior",
    format: "Formato",
    startAt: "Começar em",
    fontSize: "Tamanho da fonte:",
    numbering: "Numerando…",
    addPageNumbers: "Adicionar números de página",
    downloadPdf: "Baixar PDF",
    couldNotAdd: "Não foi possível adicionar números de página: ",
    privacy: "100 % no seu navegador via pdf-lib — seu PDF nunca é enviado.",
  },
  de: {
    uploadPdf: "PDF hochladen",
    uploadHint: "Seitenzahlen werden in Ihrem Browser auf jede Seite hinzugefügt",
    position: "Position",
    posBottomCenter: "Unten Mitte",
    posBottomRight: "Unten rechts",
    posBottomLeft: "Unten links",
    posTopCenter: "Oben Mitte",
    posTopRight: "Oben rechts",
    format: "Format",
    startAt: "Beginnen bei",
    fontSize: "Schriftgröße:",
    numbering: "Nummerierung…",
    addPageNumbers: "Seitenzahlen hinzufügen",
    downloadPdf: "PDF herunterladen",
    couldNotAdd: "Seitenzahlen konnten nicht hinzugefügt werden: ",
    privacy: "100 % im Browser über pdf-lib — Ihre PDF wird nie hochgeladen.",
  },
  it: {
    uploadPdf: "Carica un PDF",
    uploadHint: "I numeri di pagina vengono aggiunti a ogni pagina nel tuo browser",
    position: "Posizione",
    posBottomCenter: "Centro basso",
    posBottomRight: "Destra bassa",
    posBottomLeft: "Sinistra bassa",
    posTopCenter: "Centro alto",
    posTopRight: "Destra alta",
    format: "Formato",
    startAt: "Inizia da",
    fontSize: "Dimensione font:",
    numbering: "Numerazione…",
    addPageNumbers: "Aggiungi numeri di pagina",
    downloadPdf: "Scarica PDF",
    couldNotAdd: "Impossibile aggiungere i numeri di pagina: ",
    privacy: "100 % nel browser via pdf-lib — il tuo PDF non viene mai caricato.",
  },
  nl: {
    uploadPdf: "PDF uploaden",
    uploadHint: "Paginanummers worden in uw browser aan elke pagina toegevoegd",
    position: "Positie",
    posBottomCenter: "Onderaan midden",
    posBottomRight: "Onderaan rechts",
    posBottomLeft: "Onderaan links",
    posTopCenter: "Bovenaan midden",
    posTopRight: "Bovenaan rechts",
    format: "Formaat",
    startAt: "Beginnen bij",
    fontSize: "Lettergrootte:",
    numbering: "Nummering…",
    addPageNumbers: "Paginanummers toevoegen",
    downloadPdf: "PDF downloaden",
    couldNotAdd: "Paginanummers konden niet worden toegevoegd: ",
    privacy: "100 % in uw browser via pdf-lib — uw PDF wordt nooit geüpload.",
  },
  ja: {
    uploadPdf: "PDFをアップロード",
    uploadHint: "ページ番号がブラウザ内で全ページに追加されます",
    position: "位置",
    posBottomCenter: "下中央",
    posBottomRight: "右下",
    posBottomLeft: "左下",
    posTopCenter: "上中央",
    posTopRight: "右上",
    format: "形式",
    startAt: "開始番号",
    fontSize: "フォントサイズ:",
    numbering: "番号付け中…",
    addPageNumbers: "ページ番号を追加",
    downloadPdf: "PDFをダウンロード",
    couldNotAdd: "ページ番号を追加できませんでした: ",
    privacy: "ブラウザでpdf-lib経由100%処理 — PDFはアップロードされません。",
  },
  zh: {
    uploadPdf: "上传PDF",
    uploadHint: "在您的浏览器中为每页添加页码",
    position: "位置",
    posBottomCenter: "底部居中",
    posBottomRight: "右下",
    posBottomLeft: "左下",
    posTopCenter: "顶部居中",
    posTopRight: "右上",
    format: "格式",
    startAt: "起始页码",
    fontSize: "字体大小:",
    numbering: "添加页码中…",
    addPageNumbers: "添加页码",
    downloadPdf: "下载PDF",
    couldNotAdd: "无法添加页码：",
    privacy: "通过pdf-lib在您的浏览器中100%处理 — PDF永远不会被上传。",
  },
  ko: {
    uploadPdf: "PDF 업로드",
    uploadHint: "브라우저에서 모든 페이지에 페이지 번호가 추가됩니다",
    position: "위치",
    posBottomCenter: "아래 가운데",
    posBottomRight: "오른쪽 아래",
    posBottomLeft: "왼쪽 아래",
    posTopCenter: "위 가운데",
    posTopRight: "오른쪽 위",
    format: "형식",
    startAt: "시작 번호",
    fontSize: "글꼴 크기:",
    numbering: "번호 매기기 중…",
    addPageNumbers: "페이지 번호 추가",
    downloadPdf: "PDF 다운로드",
    couldNotAdd: "페이지 번호를 추가할 수 없습니다: ",
    privacy: "브라우저에서 pdf-lib로 100% 처리 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    uploadPdf: "تحميل PDF",
    uploadHint: "تُضاف أرقام الصفحات إلى كل صفحة في متصفحك",
    position: "الموضع",
    posBottomCenter: "أسفل الوسط",
    posBottomRight: "أسفل اليمين",
    posBottomLeft: "أسفل اليسار",
    posTopCenter: "أعلى الوسط",
    posTopRight: "أعلى اليمين",
    format: "التنسيق",
    startAt: "يبدأ من",
    fontSize: "حجم الخط:",
    numbering: "جاري الترقيم…",
    addPageNumbers: "إضافة أرقام الصفحات",
    downloadPdf: "تنزيل PDF",
    couldNotAdd: "تعذّر إضافة أرقام الصفحات: ",
    privacy: "100% في متصفحك عبر pdf-lib — لن يتم تحميل ملف PDF مطلقًا.",
  },
  ru: {
    uploadPdf: "Загрузить PDF",
    uploadHint: "Номера страниц добавляются на каждую страницу в браузере",
    position: "Позиция",
    posBottomCenter: "Снизу по центру",
    posBottomRight: "Снизу справа",
    posBottomLeft: "Снизу слева",
    posTopCenter: "Сверху по центру",
    posTopRight: "Сверху справа",
    format: "Формат",
    startAt: "Начать с",
    fontSize: "Размер шрифта:",
    numbering: "Нумерация…",
    addPageNumbers: "Добавить номера страниц",
    downloadPdf: "Скачать PDF",
    couldNotAdd: "Не удалось добавить номера страниц: ",
    privacy: "100% в вашем браузере через pdf-lib — ваш PDF не загружается.",
  },
  hi: {
    uploadPdf: "PDF अपलोड करें",
    uploadHint: "आपके ब्राउज़र में हर पेज पर पेज नंबर जोड़े जाते हैं",
    position: "स्थिति",
    posBottomCenter: "नीचे मध्य",
    posBottomRight: "नीचे दाएं",
    posBottomLeft: "नीचे बाएं",
    posTopCenter: "ऊपर मध्य",
    posTopRight: "ऊपर दाएं",
    format: "प्रारूप",
    startAt: "से शुरू करें",
    fontSize: "फ़ॉन्ट आकार:",
    numbering: "नंबर लगाए जा रहे हैं…",
    addPageNumbers: "पेज नंबर जोड़ें",
    downloadPdf: "PDF डाउनलोड करें",
    couldNotAdd: "पेज नंबर नहीं जोड़ सका: ",
    privacy: "आपके ब्राउज़र में pdf-lib द्वारा 100% — PDF कभी अपलोड नहीं होता।",
  },
  tr: {
    uploadPdf: "PDF yükle",
    uploadHint: "Tarayıcınızda her sayfaya sayfa numaraları eklenir",
    position: "Konum",
    posBottomCenter: "Alt orta",
    posBottomRight: "Alt sağ",
    posBottomLeft: "Alt sol",
    posTopCenter: "Üst orta",
    posTopRight: "Üst sağ",
    format: "Biçim",
    startAt: "Başlangıç",
    fontSize: "Yazı tipi boyutu:",
    numbering: "Numaralandırılıyor…",
    addPageNumbers: "Sayfa numaraları ekle",
    downloadPdf: "PDF indir",
    couldNotAdd: "Sayfa numaraları eklenemedi: ",
    privacy: "Tarayıcınızda pdf-lib aracılığıyla 100% — PDF'iniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadPdf: "Unggah PDF",
    uploadHint: "Nomor halaman ditambahkan ke setiap halaman di browser Anda",
    position: "Posisi",
    posBottomCenter: "Bawah tengah",
    posBottomRight: "Bawah kanan",
    posBottomLeft: "Bawah kiri",
    posTopCenter: "Atas tengah",
    posTopRight: "Atas kanan",
    format: "Format",
    startAt: "Mulai dari",
    fontSize: "Ukuran font:",
    numbering: "Memberi nomor…",
    addPageNumbers: "Tambahkan nomor halaman",
    downloadPdf: "Unduh PDF",
    couldNotAdd: "Gagal menambahkan nomor halaman: ",
    privacy: "100% di browser Anda via pdf-lib — PDF Anda tidak pernah diunggah.",
  },
  vi: {
    uploadPdf: "Tải lên PDF",
    uploadHint: "Số trang được thêm vào mỗi trang trong trình duyệt của bạn",
    position: "Vị trí",
    posBottomCenter: "Dưới giữa",
    posBottomRight: "Dưới bên phải",
    posBottomLeft: "Dưới bên trái",
    posTopCenter: "Trên giữa",
    posTopRight: "Trên bên phải",
    format: "Định dạng",
    startAt: "Bắt đầu từ",
    fontSize: "Cỡ chữ:",
    numbering: "Đang đánh số…",
    addPageNumbers: "Thêm số trang",
    downloadPdf: "Tải xuống PDF",
    couldNotAdd: "Không thể thêm số trang: ",
    privacy: "100% trong trình duyệt qua pdf-lib — PDF của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadPdf: "Ladda upp PDF",
    uploadHint: "Sidnummer läggs till på varje sida i din webbläsare",
    position: "Position",
    posBottomCenter: "Nedre mitten",
    posBottomRight: "Nedre höger",
    posBottomLeft: "Nedre vänster",
    posTopCenter: "Övre mitten",
    posTopRight: "Övre höger",
    format: "Format",
    startAt: "Börja vid",
    fontSize: "Teckenstorlek:",
    numbering: "Numrerar…",
    addPageNumbers: "Lägg till sidnummer",
    downloadPdf: "Ladda ner PDF",
    couldNotAdd: "Kunde inte lägga till sidnummer: ",
    privacy: "100% i din webbläsare via pdf-lib — din PDF laddas aldrig upp.",
  },
  pl: {
    uploadPdf: "Prześlij PDF",
    uploadHint: "Numery stron są dodawane do każdej strony w przeglądarce",
    position: "Pozycja",
    posBottomCenter: "Dół środek",
    posBottomRight: "Dół prawo",
    posBottomLeft: "Dół lewo",
    posTopCenter: "Góra środek",
    posTopRight: "Góra prawo",
    format: "Format",
    startAt: "Zacznij od",
    fontSize: "Rozmiar czcionki:",
    numbering: "Numerowanie…",
    addPageNumbers: "Dodaj numery stron",
    downloadPdf: "Pobierz PDF",
    couldNotAdd: "Nie można dodać numerów stron: ",
    privacy: "100% w Twojej przeglądarce via pdf-lib — Twój PDF nigdy nie jest przesyłany.",
  },
  uk: {
    uploadPdf: "Завантажити PDF",
    uploadHint: "Номери сторінок додаються до кожної сторінки у браузері",
    position: "Позиція",
    posBottomCenter: "Знизу по центру",
    posBottomRight: "Знизу справа",
    posBottomLeft: "Знизу зліва",
    posTopCenter: "Зверху по центру",
    posTopRight: "Зверху справа",
    format: "Формат",
    startAt: "Починати з",
    fontSize: "Розмір шрифту:",
    numbering: "Нумерація…",
    addPageNumbers: "Додати номери сторінок",
    downloadPdf: "Завантажити PDF",
    couldNotAdd: "Не вдалося додати номери сторінок: ",
    privacy: "100% у вашому браузері через pdf-lib — ваш PDF ніколи не завантажується.",
  },
  cs: {
    uploadPdf: "Nahrát PDF",
    uploadHint: "Na každou stránku ve vašem prohlížeči se přidají čísla stránek",
    position: "Pozice",
    posBottomCenter: "Dole uprostřed",
    posBottomRight: "Dole vpravo",
    posBottomLeft: "Dole vlevo",
    posTopCenter: "Nahoře uprostřed",
    posTopRight: "Nahoře vpravo",
    format: "Formát",
    startAt: "Začít od",
    fontSize: "Velikost písma:",
    numbering: "Číslování…",
    addPageNumbers: "Přidat čísla stránek",
    downloadPdf: "Stáhnout PDF",
    couldNotAdd: "Čísla stránek nelze přidat: ",
    privacy: "100% ve vašem prohlížeči přes pdf-lib — váš PDF soubor není nikdy nahrán.",
  },
};

type Pos = "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-right";
type Fmt = "n" | "n-of-total" | "page-n";

export function PdfPageNumbersClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [pos, setPos] = useState<Pos>("bottom-center");
  const [fmt, setFmt] = useState<Fmt>("n-of-total");
  const [size, setSize] = useState(11);
  const [start, setStart] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("numbered.pdf");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  function label(i: number, total: number) {
    const n = i + start;
    if (fmt === "n") return String(n);
    if (fmt === "page-n") return `Page ${n}`;
    return `${n} / ${total + start - 1}`;
  }

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const total = pages.length;
      const margin = 28;
      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const txt = label(i, total);
        const tw = font.widthOfTextAtSize(txt, size);
        let x = width / 2 - tw / 2;
        let y = margin;
        if (pos.endsWith("right")) x = width - margin - tw;
        else if (pos.endsWith("left")) x = margin;
        if (pos.startsWith("top")) y = height - margin - size;
        page.drawText(txt, { x, y, size, font, color: rgb(0.3, 0.3, 0.3) });
      });
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-numbered.pdf");
    } catch (e) {
      setError(`${s.couldNotAdd}${(e as Error).message}`);
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
          <button onClick={() => { setFile(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.position}
            <select value={pos} onChange={(e) => setPos(e.target.value as Pos)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="bottom-center">{s.posBottomCenter}</option>
              <option value="bottom-right">{s.posBottomRight}</option>
              <option value="bottom-left">{s.posBottomLeft}</option>
              <option value="top-center">{s.posTopCenter}</option>
              <option value="top-right">{s.posTopRight}</option>
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.format}
            <select value={fmt} onChange={(e) => setFmt(e.target.value as Fmt)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="n-of-total">1 / 10</option>
              <option value="n">1</option>
              <option value="page-n">Page 1</option>
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.startAt}
            <input type="number" min={0} value={start} onChange={(e) => setStart(Math.max(0, Number(e.target.value) || 1))} className="mt-1 w-24 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.fontSize} {size}pt
            <input type="range" min={8} max={24} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-1" />
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {file && <Button size="lg" onClick={run} disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}{busy ? s.numbering : s.addPageNumbers}</Button>}
        {outUrl && <a href={outUrl} download={outName}><Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.downloadPdf}</Button></a>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
