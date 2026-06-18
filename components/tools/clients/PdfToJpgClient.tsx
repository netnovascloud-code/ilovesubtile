"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadPdf: "Upload a PDF",
    uploadHint: "Every page becomes a JPG, rendered in your browser",
    scaleStandard: "Standard (1.5×)",
    scaleHigh: "High (2×)",
    scaleCrisp: "Crisp (3×)",
    renderingPages: "Rendering pages…",
    pagesRendered: "pages rendered",
    pageRendered: "page rendered",
    downloadAll: "Download all (ZIP)",
    page: "Page",
    save: "Save",
    couldNotRender: "Could not render: ",
    privacy: "Rendered 100% in your browser via pdfjs — your PDF is never uploaded.",
  },
  fr: {
    uploadPdf: "Télécharger un PDF",
    uploadHint: "Chaque page devient un JPG, rendu dans votre navigateur",
    scaleStandard: "Standard (1,5×)",
    scaleHigh: "Haute (2×)",
    scaleCrisp: "Nette (3×)",
    renderingPages: "Rendu des pages…",
    pagesRendered: "pages rendues",
    pageRendered: "page rendue",
    downloadAll: "Tout télécharger (ZIP)",
    page: "Page",
    save: "Sauvegarder",
    couldNotRender: "Impossible de rendre : ",
    privacy: "Rendu 100 % dans votre navigateur via pdfjs — votre PDF n'est jamais envoyé.",
  },
  es: {
    uploadPdf: "Subir un PDF",
    uploadHint: "Cada página se convierte en un JPG, renderizado en tu navegador",
    scaleStandard: "Estándar (1,5×)",
    scaleHigh: "Alta (2×)",
    scaleCrisp: "Nítida (3×)",
    renderingPages: "Renderizando páginas…",
    pagesRendered: "páginas renderizadas",
    pageRendered: "página renderizada",
    downloadAll: "Descargar todo (ZIP)",
    page: "Página",
    save: "Guardar",
    couldNotRender: "No se pudo renderizar: ",
    privacy: "Renderizado 100 % en tu navegador via pdfjs — tu PDF nunca se sube.",
  },
  pt: {
    uploadPdf: "Carregar um PDF",
    uploadHint: "Cada página vira um JPG, renderizado no seu navegador",
    scaleStandard: "Padrão (1,5×)",
    scaleHigh: "Alta (2×)",
    scaleCrisp: "Nítida (3×)",
    renderingPages: "Renderizando páginas…",
    pagesRendered: "páginas renderizadas",
    pageRendered: "página renderizada",
    downloadAll: "Baixar tudo (ZIP)",
    page: "Página",
    save: "Salvar",
    couldNotRender: "Não foi possível renderizar: ",
    privacy: "Renderizado 100 % no seu navegador via pdfjs — seu PDF nunca é enviado.",
  },
  de: {
    uploadPdf: "PDF hochladen",
    uploadHint: "Jede Seite wird als JPG in Ihrem Browser gerendert",
    scaleStandard: "Standard (1,5×)",
    scaleHigh: "Hoch (2×)",
    scaleCrisp: "Scharf (3×)",
    renderingPages: "Seiten werden gerendert…",
    pagesRendered: "Seiten gerendert",
    pageRendered: "Seite gerendert",
    downloadAll: "Alle herunterladen (ZIP)",
    page: "Seite",
    save: "Speichern",
    couldNotRender: "Rendern fehlgeschlagen: ",
    privacy: "100 % im Browser über pdfjs gerendert — Ihre PDF wird nie hochgeladen.",
  },
  it: {
    uploadPdf: "Carica un PDF",
    uploadHint: "Ogni pagina diventa un JPG, reso nel tuo browser",
    scaleStandard: "Standard (1,5×)",
    scaleHigh: "Alta (2×)",
    scaleCrisp: "Nitida (3×)",
    renderingPages: "Rendering delle pagine…",
    pagesRendered: "pagine rese",
    pageRendered: "pagina resa",
    downloadAll: "Scarica tutto (ZIP)",
    page: "Pagina",
    save: "Salva",
    couldNotRender: "Impossibile eseguire il rendering: ",
    privacy: "Reso al 100 % nel browser via pdfjs — il tuo PDF non viene mai caricato.",
  },
  nl: {
    uploadPdf: "PDF uploaden",
    uploadHint: "Elke pagina wordt een JPG, weergegeven in uw browser",
    scaleStandard: "Standaard (1,5×)",
    scaleHigh: "Hoog (2×)",
    scaleCrisp: "Scherp (3×)",
    renderingPages: "Pagina's renderen…",
    pagesRendered: "pagina's gerenderd",
    pageRendered: "pagina gerenderd",
    downloadAll: "Alles downloaden (ZIP)",
    page: "Pagina",
    save: "Opslaan",
    couldNotRender: "Renderen mislukt: ",
    privacy: "100 % gerenderd in uw browser via pdfjs — uw PDF wordt nooit geüpload.",
  },
  ja: {
    uploadPdf: "PDFをアップロード",
    uploadHint: "各ページがJPGになり、ブラウザでレンダリングされます",
    scaleStandard: "標準 (1.5×)",
    scaleHigh: "高画質 (2×)",
    scaleCrisp: "鮮明 (3×)",
    renderingPages: "ページをレンダリング中…",
    pagesRendered: "ページをレンダリング済み",
    pageRendered: "ページをレンダリング済み",
    downloadAll: "すべてダウンロード (ZIP)",
    page: "ページ",
    save: "保存",
    couldNotRender: "レンダリングできませんでした: ",
    privacy: "ブラウザでpdfjs経由100%レンダリング — PDFはアップロードされません。",
  },
  zh: {
    uploadPdf: "上传PDF",
    uploadHint: "每页变为JPG，在您的浏览器中渲染",
    scaleStandard: "标准 (1.5×)",
    scaleHigh: "高清 (2×)",
    scaleCrisp: "清晰 (3×)",
    renderingPages: "渲染页面中…",
    pagesRendered: "页已渲染",
    pageRendered: "页已渲染",
    downloadAll: "下载全部 (ZIP)",
    page: "第",
    save: "保存",
    couldNotRender: "无法渲染：",
    privacy: "通过pdfjs在您的浏览器中100%渲染 — PDF永远不会被上传。",
  },
  ko: {
    uploadPdf: "PDF 업로드",
    uploadHint: "모든 페이지가 JPG로 변환되어 브라우저에서 렌더링됩니다",
    scaleStandard: "표준 (1.5×)",
    scaleHigh: "고화질 (2×)",
    scaleCrisp: "선명 (3×)",
    renderingPages: "페이지 렌더링 중…",
    pagesRendered: "페이지 렌더링됨",
    pageRendered: "페이지 렌더링됨",
    downloadAll: "모두 다운로드 (ZIP)",
    page: "페이지",
    save: "저장",
    couldNotRender: "렌더링할 수 없습니다: ",
    privacy: "브라우저에서 pdfjs로 100% 렌더링 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    uploadPdf: "تحميل PDF",
    uploadHint: "كل صفحة تصبح JPG، يتم عرضها في متصفحك",
    scaleStandard: "قياسي (1.5×)",
    scaleHigh: "عالي (2×)",
    scaleCrisp: "واضح (3×)",
    renderingPages: "جاري عرض الصفحات…",
    pagesRendered: "صفحات تم عرضها",
    pageRendered: "صفحة تم عرضها",
    downloadAll: "تنزيل الكل (ZIP)",
    page: "صفحة",
    save: "حفظ",
    couldNotRender: "تعذّر العرض: ",
    privacy: "يتم العرض 100% في متصفحك عبر pdfjs — لن يتم تحميل ملف PDF مطلقًا.",
  },
  ru: {
    uploadPdf: "Загрузить PDF",
    uploadHint: "Каждая страница станет JPG, отрендеренным в браузере",
    scaleStandard: "Стандарт (1,5×)",
    scaleHigh: "Высокое (2×)",
    scaleCrisp: "Чёткое (3×)",
    renderingPages: "Рендеринг страниц…",
    pagesRendered: "страниц отрендерено",
    pageRendered: "страница отрендерена",
    downloadAll: "Скачать всё (ZIP)",
    page: "Страница",
    save: "Сохранить",
    couldNotRender: "Не удалось отрендерить: ",
    privacy: "Отрендерено на 100% в вашем браузере через pdfjs — ваш PDF не загружается.",
  },
  hi: {
    uploadPdf: "PDF अपलोड करें",
    uploadHint: "प्रत्येक पेज JPG बनता है, आपके ब्राउज़र में रेंडर होता है",
    scaleStandard: "मानक (1.5×)",
    scaleHigh: "उच्च (2×)",
    scaleCrisp: "स्पष्ट (3×)",
    renderingPages: "पेज रेंडर हो रहे हैं…",
    pagesRendered: "पेज रेंडर हुए",
    pageRendered: "पेज रेंडर हुआ",
    downloadAll: "सब डाउनलोड करें (ZIP)",
    page: "पेज",
    save: "सहेजें",
    couldNotRender: "रेंडर नहीं हो सका: ",
    privacy: "आपके ब्राउज़र में pdfjs द्वारा 100% रेंडर — PDF कभी अपलोड नहीं होता।",
  },
  tr: {
    uploadPdf: "PDF yükle",
    uploadHint: "Her sayfa JPG'ye dönüştürülür, tarayıcında oluşturulur",
    scaleStandard: "Standart (1,5×)",
    scaleHigh: "Yüksek (2×)",
    scaleCrisp: "Net (3×)",
    renderingPages: "Sayfalar oluşturuluyor…",
    pagesRendered: "sayfa oluşturuldu",
    pageRendered: "sayfa oluşturuldu",
    downloadAll: "Tümünü indir (ZIP)",
    page: "Sayfa",
    save: "Kaydet",
    couldNotRender: "Oluşturulamadı: ",
    privacy: "Tarayıcınızda pdfjs aracılığıyla 100% oluşturuldu — PDF'iniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadPdf: "Unggah PDF",
    uploadHint: "Setiap halaman menjadi JPG, dirender di browser Anda",
    scaleStandard: "Standar (1,5×)",
    scaleHigh: "Tinggi (2×)",
    scaleCrisp: "Tajam (3×)",
    renderingPages: "Merender halaman…",
    pagesRendered: "halaman dirender",
    pageRendered: "halaman dirender",
    downloadAll: "Unduh semua (ZIP)",
    page: "Halaman",
    save: "Simpan",
    couldNotRender: "Gagal merender: ",
    privacy: "Dirender 100% di browser Anda via pdfjs — PDF Anda tidak pernah diunggah.",
  },
  vi: {
    uploadPdf: "Tải lên PDF",
    uploadHint: "Mỗi trang trở thành JPG, được kết xuất trong trình duyệt của bạn",
    scaleStandard: "Chuẩn (1,5×)",
    scaleHigh: "Cao (2×)",
    scaleCrisp: "Sắc nét (3×)",
    renderingPages: "Đang kết xuất trang…",
    pagesRendered: "trang đã kết xuất",
    pageRendered: "trang đã kết xuất",
    downloadAll: "Tải xuống tất cả (ZIP)",
    page: "Trang",
    save: "Lưu",
    couldNotRender: "Không thể kết xuất: ",
    privacy: "Kết xuất 100% trong trình duyệt qua pdfjs — PDF của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadPdf: "Ladda upp PDF",
    uploadHint: "Varje sida blir en JPG, renderad i din webbläsare",
    scaleStandard: "Standard (1,5×)",
    scaleHigh: "Hög (2×)",
    scaleCrisp: "Skarp (3×)",
    renderingPages: "Renderar sidor…",
    pagesRendered: "sidor renderade",
    pageRendered: "sida renderad",
    downloadAll: "Ladda ner alla (ZIP)",
    page: "Sida",
    save: "Spara",
    couldNotRender: "Kunde inte rendera: ",
    privacy: "Renderad 100% i din webbläsare via pdfjs — din PDF laddas aldrig upp.",
  },
  pl: {
    uploadPdf: "Prześlij PDF",
    uploadHint: "Każda strona staje się plikiem JPG renderowanym w przeglądarce",
    scaleStandard: "Standardowy (1,5×)",
    scaleHigh: "Wysoki (2×)",
    scaleCrisp: "Ostry (3×)",
    renderingPages: "Renderowanie stron…",
    pagesRendered: "stron wyrenderowanych",
    pageRendered: "strona wyrenderowana",
    downloadAll: "Pobierz wszystko (ZIP)",
    page: "Strona",
    save: "Zapisz",
    couldNotRender: "Nie można wyrenderować: ",
    privacy: "Wyrenderowano w 100% w przeglądarce via pdfjs — Twój PDF nigdy nie jest przesyłany.",
  },
  uk: {
    uploadPdf: "Завантажити PDF",
    uploadHint: "Кожна сторінка стає JPG, відрендереним у браузері",
    scaleStandard: "Стандарт (1,5×)",
    scaleHigh: "Висока (2×)",
    scaleCrisp: "Чітке (3×)",
    renderingPages: "Рендеринг сторінок…",
    pagesRendered: "сторінок відрендерено",
    pageRendered: "сторінка відрендерена",
    downloadAll: "Завантажити все (ZIP)",
    page: "Сторінка",
    save: "Зберегти",
    couldNotRender: "Не вдалося відрендерити: ",
    privacy: "Відрендерено на 100% у вашому браузері через pdfjs — ваш PDF ніколи не завантажується.",
  },
  cs: {
    uploadPdf: "Nahrát PDF",
    uploadHint: "Každá stránka se stane JPG, vykresleným ve vašem prohlížeči",
    scaleStandard: "Standardní (1,5×)",
    scaleHigh: "Vysoké (2×)",
    scaleCrisp: "Ostré (3×)",
    renderingPages: "Vykreslování stránek…",
    pagesRendered: "stránek vykresleno",
    pageRendered: "stránka vykreslena",
    downloadAll: "Stáhnout vše (ZIP)",
    page: "Stránka",
    save: "Uložit",
    couldNotRender: "Vykreslení se nezdařilo: ",
    privacy: "Vykresleno 100% ve vašem prohlížeči přes pdfjs — váš PDF soubor není nikdy nahrán.",
  },
};

type Page = { num: number; url: string; size: number };

type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getViewport: (o: { scale: number }) => { width: number; height: number }; render: (o: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> } }> }> };
};

async function loadPdfjs(): Promise<PdfJs> {
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  return lib;
}

export function PdfToJpgClient() {
  const s = T[useLocale()] ?? T.en;

  const SCALES = [
    { id: "1.5", label: s.scaleStandard },
    { id: "2", label: s.scaleHigh },
    { id: "3", label: s.scaleCrisp },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<string>("2");
  const [pages, setPages] = useState<Page[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function run(f: File) {
    setBusy(true); setError(null); setProgress(2);
    pages.forEach((p) => URL.revokeObjectURL(p.url));
    setPages([]);
    try {
      const pdfjs = await loadPdfjs();
      const buf = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const total = doc.numPages;
      const out: Page[] = [];
      const sc = parseFloat(scale);
      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: sc });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not available.");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        const blob: Blob = await new Promise((r, j) => canvas.toBlob((b) => (b ? r(b) : j(new Error("Encode failed"))), "image/jpeg", 0.92));
        out.push({ num: i, url: URL.createObjectURL(blob), size: blob.size });
        setProgress(Math.max(2, Math.min(99, Math.round((i / total) * 100))));
      }
      setPages(out);
      setProgress(100);
    } catch (e) { setError(`${s.couldNotRender}${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  async function downloadAll() {
    if (pages.length === 0) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (const p of pages) {
      const blob = await (await fetch(p.url)).blob();
      zip.file(`page-${String(p.num).padStart(3, "0")}.jpg`, blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(/\.pdf$/i, "")}-jpg.zip`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadPdf}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); run(f); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setPages([]); setError(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {SCALES.map((sc) => (
            <button key={sc.id} onClick={() => { setScale(sc.id); if (file) run(file); }} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", scale === sc.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{sc.label}</button>
          ))}
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{s.renderingPages}</p>
            <p className="text-xs text-ink-400">{progress}%</p>
          </div>
        </div>
      )}

      {pages.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink-700">{pages.length} {pages.length > 1 ? s.pagesRendered : s.pageRendered}</p>
            <Button size="sm" onClick={downloadAll}><Download className="h-3.5 w-3.5" /> {s.downloadAll}</Button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {pages.map((p) => (
              <li key={p.num} className="rounded-lg border border-ink-100 bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`${s.page} ${p.num}`} className="w-full rounded object-contain" />
                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span className="text-ink-500">{s.page} {p.num} · {formatBytes(p.size)}</span>
                  <a href={p.url} download={`page-${String(p.num).padStart(3, "0")}.jpg`} className="text-brand-600 hover:underline">{s.save}</a>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
