"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadPdf: "Upload a PDF",
    pageRanges: "Page ranges",
    rangesPlaceholder: "e.g. 1-3, 5, 7-8",
    rangesHint: "Comma-separated ranges (1-based). Multiple ranges produce a ZIP.",
    splitting: "Splitting…",
    splitPdf: "Split PDF",
    download: "Download",
    couldNotRead: "Could not read PDF: ",
    privacy: "Processed 100% in your browser — your PDF is never uploaded.",
  },
  fr: {
    uploadPdf: "Télécharger un PDF",
    pageRanges: "Plages de pages",
    rangesPlaceholder: "ex. 1-3, 5, 7-8",
    rangesHint: "Plages séparées par des virgules (base 1). Plusieurs plages génèrent un ZIP.",
    splitting: "Découpage en cours…",
    splitPdf: "Diviser le PDF",
    download: "Télécharger",
    couldNotRead: "Impossible de lire le PDF : ",
    privacy: "Traité 100 % dans votre navigateur — votre PDF n'est jamais envoyé.",
  },
  es: {
    uploadPdf: "Subir un PDF",
    pageRanges: "Rangos de páginas",
    rangesPlaceholder: "p.ej. 1-3, 5, 7-8",
    rangesHint: "Rangos separados por comas (base 1). Varios rangos generan un ZIP.",
    splitting: "Dividiendo…",
    splitPdf: "Dividir PDF",
    download: "Descargar",
    couldNotRead: "No se pudo leer el PDF: ",
    privacy: "Procesado 100 % en tu navegador — tu PDF nunca se sube.",
  },
  pt: {
    uploadPdf: "Carregar um PDF",
    pageRanges: "Intervalos de páginas",
    rangesPlaceholder: "ex. 1-3, 5, 7-8",
    rangesHint: "Intervalos separados por vírgulas (base 1). Vários intervalos geram um ZIP.",
    splitting: "Dividindo…",
    splitPdf: "Dividir PDF",
    download: "Baixar",
    couldNotRead: "Não foi possível ler o PDF: ",
    privacy: "Processado 100 % no seu navegador — seu PDF nunca é enviado.",
  },
  de: {
    uploadPdf: "PDF hochladen",
    pageRanges: "Seitenbereiche",
    rangesPlaceholder: "z.B. 1-3, 5, 7-8",
    rangesHint: "Kommagetrennte Bereiche (1-basiert). Mehrere Bereiche erzeugen ein ZIP.",
    splitting: "Wird aufgeteilt…",
    splitPdf: "PDF aufteilen",
    download: "Herunterladen",
    couldNotRead: "PDF konnte nicht gelesen werden: ",
    privacy: "100 % im Browser verarbeitet — Ihre PDF wird nie hochgeladen.",
  },
  it: {
    uploadPdf: "Carica un PDF",
    pageRanges: "Intervalli di pagine",
    rangesPlaceholder: "es. 1-3, 5, 7-8",
    rangesHint: "Intervalli separati da virgole (base 1). Più intervalli generano un ZIP.",
    splitting: "Divisione in corso…",
    splitPdf: "Dividi PDF",
    download: "Scarica",
    couldNotRead: "Impossibile leggere il PDF: ",
    privacy: "Elaborato al 100 % nel browser — il tuo PDF non viene mai caricato.",
  },
  nl: {
    uploadPdf: "PDF uploaden",
    pageRanges: "Paginabereiken",
    rangesPlaceholder: "bijv. 1-3, 5, 7-8",
    rangesHint: "Kommagescheiden bereiken (1-gebaseerd). Meerdere bereiken produceren een ZIP.",
    splitting: "Splitsen…",
    splitPdf: "PDF splitsen",
    download: "Downloaden",
    couldNotRead: "PDF kon niet worden gelezen: ",
    privacy: "100 % verwerkt in uw browser — uw PDF wordt nooit geüpload.",
  },
  ja: {
    uploadPdf: "PDFをアップロード",
    pageRanges: "ページ範囲",
    rangesPlaceholder: "例: 1-3, 5, 7-8",
    rangesHint: "カンマ区切りの範囲（1始まり）。複数の範囲はZIPになります。",
    splitting: "分割中…",
    splitPdf: "PDFを分割",
    download: "ダウンロード",
    couldNotRead: "PDFを読み込めませんでした: ",
    privacy: "ブラウザで100%処理 — PDFはアップロードされません。",
  },
  zh: {
    uploadPdf: "上传PDF",
    pageRanges: "页面范围",
    rangesPlaceholder: "例如 1-3, 5, 7-8",
    rangesHint: "以逗号分隔的范围（从1开始）。多个范围将生成ZIP。",
    splitting: "拆分中…",
    splitPdf: "拆分PDF",
    download: "下载",
    couldNotRead: "无法读取PDF：",
    privacy: "全部在您的浏览器中处理 — PDF永远不会被上传。",
  },
  ko: {
    uploadPdf: "PDF 업로드",
    pageRanges: "페이지 범위",
    rangesPlaceholder: "예: 1-3, 5, 7-8",
    rangesHint: "쉼표로 구분된 범위(1부터 시작). 여러 범위는 ZIP으로 생성됩니다.",
    splitting: "분할 중…",
    splitPdf: "PDF 분할",
    download: "다운로드",
    couldNotRead: "PDF를 읽을 수 없습니다: ",
    privacy: "브라우저에서 100% 처리 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    uploadPdf: "تحميل PDF",
    pageRanges: "نطاقات الصفحات",
    rangesPlaceholder: "مثال: 1-3, 5, 7-8",
    rangesHint: "نطاقات مفصولة بفواصل (تبدأ من 1). نطاقات متعددة تُنتج ملف ZIP.",
    splitting: "جاري التقسيم…",
    splitPdf: "تقسيم PDF",
    download: "تنزيل",
    couldNotRead: "تعذّر قراءة PDF: ",
    privacy: "تتم المعالجة 100% في متصفحك — لن يتم تحميل ملف PDF مطلقًا.",
  },
  ru: {
    uploadPdf: "Загрузить PDF",
    pageRanges: "Диапазоны страниц",
    rangesPlaceholder: "напр. 1-3, 5, 7-8",
    rangesHint: "Диапазоны через запятую (с 1). Несколько диапазонов создают ZIP.",
    splitting: "Разделение…",
    splitPdf: "Разделить PDF",
    download: "Скачать",
    couldNotRead: "Не удалось прочитать PDF: ",
    privacy: "Обработано на 100% в вашем браузере — ваш PDF не загружается.",
  },
  hi: {
    uploadPdf: "PDF अपलोड करें",
    pageRanges: "पेज श्रेणियाँ",
    rangesPlaceholder: "जैसे 1-3, 5, 7-8",
    rangesHint: "अल्पविराम से अलग की गई श्रेणियाँ (1 से शुरू)। कई श्रेणियाँ ZIP बनाती हैं।",
    splitting: "विभाजित हो रहा है…",
    splitPdf: "PDF विभाजित करें",
    download: "डाउनलोड करें",
    couldNotRead: "PDF पढ़ नहीं सका: ",
    privacy: "आपके ब्राउज़र में 100% संसाधित — आपका PDF कभी अपलोड नहीं होता।",
  },
  tr: {
    uploadPdf: "PDF yükle",
    pageRanges: "Sayfa aralıkları",
    rangesPlaceholder: "örn. 1-3, 5, 7-8",
    rangesHint: "Virgülle ayrılmış aralıklar (1 tabanlı). Birden fazla aralık ZIP oluşturur.",
    splitting: "Bölünüyor…",
    splitPdf: "PDF'i böl",
    download: "İndir",
    couldNotRead: "PDF okunamadı: ",
    privacy: "Tarayıcınızda 100% işlendi — PDF'iniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadPdf: "Unggah PDF",
    pageRanges: "Rentang halaman",
    rangesPlaceholder: "mis. 1-3, 5, 7-8",
    rangesHint: "Rentang dipisahkan koma (berbasis 1). Beberapa rentang menghasilkan ZIP.",
    splitting: "Memisahkan…",
    splitPdf: "Pisahkan PDF",
    download: "Unduh",
    couldNotRead: "Gagal membaca PDF: ",
    privacy: "Diproses 100% di browser Anda — PDF Anda tidak pernah diunggah.",
  },
  vi: {
    uploadPdf: "Tải lên PDF",
    pageRanges: "Phạm vi trang",
    rangesPlaceholder: "vd. 1-3, 5, 7-8",
    rangesHint: "Các phạm vi cách nhau bằng dấu phẩy (bắt đầu từ 1). Nhiều phạm vi tạo ra ZIP.",
    splitting: "Đang tách…",
    splitPdf: "Tách PDF",
    download: "Tải xuống",
    couldNotRead: "Không thể đọc PDF: ",
    privacy: "Xử lý 100% trong trình duyệt — PDF của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadPdf: "Ladda upp PDF",
    pageRanges: "Sidintervall",
    rangesPlaceholder: "t.ex. 1-3, 5, 7-8",
    rangesHint: "Kommaseparerade intervall (1-baserade). Flera intervall skapar en ZIP.",
    splitting: "Delar upp…",
    splitPdf: "Dela upp PDF",
    download: "Ladda ner",
    couldNotRead: "Kunde inte läsa PDF: ",
    privacy: "Bearbetad 100% i din webbläsare — din PDF laddas aldrig upp.",
  },
  pl: {
    uploadPdf: "Prześlij PDF",
    pageRanges: "Zakresy stron",
    rangesPlaceholder: "np. 1-3, 5, 7-8",
    rangesHint: "Zakresy oddzielone przecinkami (od 1). Wiele zakresów tworzy ZIP.",
    splitting: "Dzielenie…",
    splitPdf: "Podziel PDF",
    download: "Pobierz",
    couldNotRead: "Nie można odczytać pliku PDF: ",
    privacy: "Przetworzono w 100% w Twojej przeglądarce — Twój PDF nigdy nie jest przesyłany.",
  },
  uk: {
    uploadPdf: "Завантажити PDF",
    pageRanges: "Діапазони сторінок",
    rangesPlaceholder: "напр. 1-3, 5, 7-8",
    rangesHint: "Діапазони через кому (з 1). Кілька діапазонів створюють ZIP.",
    splitting: "Розбиття…",
    splitPdf: "Розбити PDF",
    download: "Завантажити",
    couldNotRead: "Не вдалося прочитати PDF: ",
    privacy: "Оброблено на 100% у вашому браузері — ваш PDF ніколи не завантажується.",
  },
  cs: {
    uploadPdf: "Nahrát PDF",
    pageRanges: "Rozsahy stránek",
    rangesPlaceholder: "např. 1-3, 5, 7-8",
    rangesHint: "Rozsahy oddělené čárkami (od 1). Více rozsahů vytvoří ZIP.",
    splitting: "Rozdělování…",
    splitPdf: "Rozdělit PDF",
    download: "Stáhnout",
    couldNotRead: "PDF nelze přečíst: ",
    privacy: "Zpracováno 100% ve vašem prohlížeči — váš PDF soubor není nikdy nahrán.",
  },
};

function parseRanges(spec: string, max: number): number[][] {
  // "1-3, 5, 7-8" → [[1,3],[5,5],[7,8]], 1-based, clamped to [1,max].
  const out: number[][] = [];
  for (const part of spec.split(",")) {
    const p = part.trim();
    if (!p) continue;
    const m = p.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
    if (!m) throw new Error(`Bad range: "${p}"`);
    const a = Math.max(1, Math.min(max, parseInt(m[1], 10)));
    const b = Math.max(1, Math.min(max, parseInt(m[2] ?? m[1], 10)));
    out.push([Math.min(a, b), Math.max(a, b)]);
  }
  if (!out.length) throw new Error("Enter at least one range.");
  return out;
}

export function PdfSplitClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [ranges, setRanges] = useState("1");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("split.zip");

  async function loadFile(f: File) {
    setError(null); setResultUrl(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setFile(f);
      setPageCount(src.getPageCount());
      setRanges(`1-${src.getPageCount()}`);
    } catch (e) { setError(`${s.couldNotRead}${(e as Error).message}`); }
  }

  async function split() {
    if (!file || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const [{ PDFDocument }, { default: JSZip }] = await Promise.all([import("pdf-lib"), import("jszip")]);
      const groups = parseRanges(ranges, pageCount);
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const outs: { name: string; bytes: Uint8Array }[] = [];
      for (const [a, b] of groups) {
        const doc = await PDFDocument.create();
        const idx = Array.from({ length: b - a + 1 }, (_, i) => a - 1 + i);
        const pages = await doc.copyPages(src, idx);
        for (const p of pages) doc.addPage(p);
        outs.push({ name: a === b ? `page-${a}.pdf` : `pages-${a}-${b}.pdf`, bytes: await doc.save() });
      }
      if (outs.length === 1) {
        const blob = new Blob([outs[0].bytes as BlobPart], { type: "application/pdf" });
        setResultUrl(URL.createObjectURL(blob));
        setResultName(outs[0].name);
      } else {
        const zip = new JSZip();
        outs.forEach((o) => zip.file(o.name, o.bytes));
        const zipBlob = await zip.generateAsync({ type: "blob" });
        setResultUrl(URL.createObjectURL(zipBlob));
        setResultName("split.zip");
      }
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadPdf}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{pageCount} page{pageCount > 1 ? "s" : ""} · {formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setResultUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.pageRanges}</label>
          <input
            value={ranges}
            onChange={(e) => setRanges(e.target.value)}
            placeholder={s.rangesPlaceholder}
            className="w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <p className="mt-1 text-xs text-ink-400">{s.rangesHint}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={split} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.splitting : s.splitPdf}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> {s.download}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
