"use client";

import { useCallback, useRef, useState } from "react";
import { Download, X, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropPdf: "Drop your PDF",
    dropHint: "Pull a subset of pages out into a new PDF.",
    choosePdf: "Choose PDF",
    pagesToKeep: "Pages to keep",
    pageInputPlaceholder: "e.g. 1, 3-5, 9",
    pagesSelected: "pages selected",
    pageSelected: "page selected",
    extracting: "Extracting…",
    extract: "Extract",
    page: "page",
    pages: "pages",
    download: "Download",
    couldNotRead: "Could not read this PDF.",
    couldNotExtract: "Could not extract pages.",
    noValidPages: "No valid pages in your selection.",
  },
  fr: {
    dropPdf: "Déposez votre PDF",
    dropHint: "Extrayez un sous-ensemble de pages dans un nouveau PDF.",
    choosePdf: "Choisir un PDF",
    pagesToKeep: "Pages à conserver",
    pageInputPlaceholder: "ex. 1, 3-5, 9",
    pagesSelected: "pages sélectionnées",
    pageSelected: "page sélectionnée",
    extracting: "Extraction…",
    extract: "Extraire",
    page: "page",
    pages: "pages",
    download: "Télécharger",
    couldNotRead: "Impossible de lire ce PDF.",
    couldNotExtract: "Impossible d’extraire les pages.",
    noValidPages: "Aucune page valide dans votre sélection.",
  },
  es: {
    dropPdf: "Suelta tu PDF",
    dropHint: "Extrae un subconjunto de páginas en un nuevo PDF.",
    choosePdf: "Elegir PDF",
    pagesToKeep: "Páginas a conservar",
    pageInputPlaceholder: "ej. 1, 3-5, 9",
    pagesSelected: "páginas seleccionadas",
    pageSelected: "página seleccionada",
    extracting: "Extrayendo…",
    extract: "Extraer",
    page: "página",
    pages: "páginas",
    download: "Descargar",
    couldNotRead: "No se pudo leer este PDF.",
    couldNotExtract: "No se pudieron extraer las páginas.",
    noValidPages: "No hay páginas válidas en tu selección.",
  },
  pt: {
    dropPdf: "Solte o seu PDF",
    dropHint: "Extraia um subconjunto de páginas para um novo PDF.",
    choosePdf: "Escolher PDF",
    pagesToKeep: "Páginas a manter",
    pageInputPlaceholder: "ex. 1, 3-5, 9",
    pagesSelected: "páginas selecionadas",
    pageSelected: "página selecionada",
    extracting: "A extrair…",
    extract: "Extrair",
    page: "página",
    pages: "páginas",
    download: "Transferir",
    couldNotRead: "Não foi possível ler este PDF.",
    couldNotExtract: "Não foi possível extrair as páginas.",
    noValidPages: "Nenhuma página válida na sua seleção.",
  },
  de: {
    dropPdf: "PDF hier ablegen",
    dropHint: "Extrahieren Sie eine Teilmenge von Seiten in ein neues PDF.",
    choosePdf: "PDF auswählen",
    pagesToKeep: "Zu behaltende Seiten",
    pageInputPlaceholder: "z. B. 1, 3-5, 9",
    pagesSelected: "Seiten ausgewählt",
    pageSelected: "Seite ausgewählt",
    extracting: "Extrahiere…",
    extract: "Extrahieren",
    page: "Seite",
    pages: "Seiten",
    download: "Herunterladen",
    couldNotRead: "Diese PDF konnte nicht gelesen werden.",
    couldNotExtract: "Die Seiten konnten nicht extrahiert werden.",
    noValidPages: "Keine gültigen Seiten in Ihrer Auswahl.",
  },
  it: {
    dropPdf: "Trascina il tuo PDF",
    dropHint: "Estrai un sottoinsieme di pagine in un nuovo PDF.",
    choosePdf: "Scegli PDF",
    pagesToKeep: "Pagine da mantenere",
    pageInputPlaceholder: "es. 1, 3-5, 9",
    pagesSelected: "pagine selezionate",
    pageSelected: "pagina selezionata",
    extracting: "Estrazione…",
    extract: "Estrai",
    page: "pagina",
    pages: "pagine",
    download: "Scarica",
    couldNotRead: "Impossibile leggere questo PDF.",
    couldNotExtract: "Impossibile estrarre le pagine.",
    noValidPages: "Nessuna pagina valida nella selezione.",
  },
  nl: {
    dropPdf: "Sleep uw PDF hiernaartoe",
    dropHint: "Haal een subset van pagina’s op in een nieuw PDF.",
    choosePdf: "PDF kiezen",
    pagesToKeep: "Te bewaren pagina’s",
    pageInputPlaceholder: "bijv. 1, 3-5, 9",
    pagesSelected: "pagina’s geselecteerd",
    pageSelected: "pagina geselecteerd",
    extracting: "Extraheren…",
    extract: "Extraheren",
    page: "pagina",
    pages: "pagina’s",
    download: "Downloaden",
    couldNotRead: "Kan dit PDF-bestand niet lezen.",
    couldNotExtract: "Kan de pagina’s niet extraheren.",
    noValidPages: "Geen geldige pagina’s in uw selectie.",
  },
  ja: {
    dropPdf: "PDFをドロップ",
    dropHint: "ページの一部を新しいPDFに抽出します。",
    choosePdf: "PDFを選択",
    pagesToKeep: "保持するページ",
    pageInputPlaceholder: "例: 1, 3-5, 9",
    pagesSelected: "ページ選択済み",
    pageSelected: "ページ選択済み",
    extracting: "抽出中…",
    extract: "抽出",
    page: "ページ",
    pages: "ページ",
    download: "ダウンロード",
    couldNotRead: "このPDFを読み込めませんでした。",
    couldNotExtract: "ページを抽出できませんでした。",
    noValidPages: "選択に有効なページがありません。",
  },
  zh: {
    dropPdf: "将PDF拖放至此",
    dropHint: "将部分页面提取到新的PDF文件中。",
    choosePdf: "选择PDF",
    pagesToKeep: "要保留的页面",
    pageInputPlaceholder: "例如: 1, 3-5, 9",
    pagesSelected: "页已选",
    pageSelected: "页已选",
    extracting: "正在提取…",
    extract: "提取",
    page: "页",
    pages: "页",
    download: "下载",
    couldNotRead: "无法读取此PDF。",
    couldNotExtract: "无法提取页面。",
    noValidPages: "您的选择中没有有效页面。",
  },
  ko: {
    dropPdf: "PDF를 여기에 놓으세요",
    dropHint: "페이지 일부를 새 PDF로 추출합니다.",
    choosePdf: "PDF 선택",
    pagesToKeep: "유지할 페이지",
    pageInputPlaceholder: "예: 1, 3-5, 9",
    pagesSelected: "페이지 선택됨",
    pageSelected: "페이지 선택됨",
    extracting: "추출 중…",
    extract: "추출",
    page: "페이지",
    pages: "페이지",
    download: "다운로드",
    couldNotRead: "이 PDF를 읽을 수 없습니다.",
    couldNotExtract: "페이지를 추출할 수 없습니다.",
    noValidPages: "선택 항목에 유효한 페이지가 없습니다.",
  },
  ar: {
    dropPdf: "أفلت PDF هنا",
    dropHint: "استخراج مجموعة فرعية من الصفحات إلى PDF جديد.",
    choosePdf: "اختيار PDF",
    pagesToKeep: "الصفحات المراد الاحتفاظ بها",
    pageInputPlaceholder: "مثال: 1, 3-5, 9",
    pagesSelected: "صفحات محددة",
    pageSelected: "صفحة محددة",
    extracting: "جاري الاستخراج…",
    extract: "استخراج",
    page: "صفحة",
    pages: "صفحات",
    download: "تنزيل",
    couldNotRead: "تعذر قراءة هذا PDF.",
    couldNotExtract: "تعذر استخراج الصفحات.",
    noValidPages: "لا توجد صفحات صالحة في تحديدك.",
  },
  ru: {
    dropPdf: "Перетащите PDF сюда",
    dropHint: "Извлеките подмножество страниц в новый PDF.",
    choosePdf: "Выбрать PDF",
    pagesToKeep: "Страницы для сохранения",
    pageInputPlaceholder: "напр. 1, 3-5, 9",
    pagesSelected: "страниц выбрано",
    pageSelected: "страница выбрана",
    extracting: "Извлечение…",
    extract: "Извлечь",
    page: "страница",
    pages: "страниц",
    download: "Скачать",
    couldNotRead: "Не удалось прочитать PDF.",
    couldNotExtract: "Не удалось извлечь страницы.",
    noValidPages: "Нет допустимых страниц в вашем выборе.",
  },
  hi: {
    dropPdf: "PDF यहाँ छोड़ें",
    dropHint: "पृष्ठों का एक उपसमुच्चय नए PDF में निकालें।",
    choosePdf: "PDF चुनें",
    pagesToKeep: "रखने वाले पृष्ठ",
    pageInputPlaceholder: "जैसे 1, 3-5, 9",
    pagesSelected: "पृष्ठ चयनित",
    pageSelected: "पृष्ठ चयनित",
    extracting: "निकाला जा रहा है…",
    extract: "निकालें",
    page: "पृष्ठ",
    pages: "पृष्ठ",
    download: "डाउनलोड",
    couldNotRead: "इस PDF को पढ़ने में असमर्थ।",
    couldNotExtract: "पृष्ठ निकालने में असमर्थ।",
    noValidPages: "आपके चयन में कोई वैध पृष्ठ नहीं।",
  },
  tr: {
    dropPdf: "PDF'nizi buraya bırakın",
    dropHint: "Sayfaların bir alt kümesini yeni bir PDF'ye çıkarın.",
    choosePdf: "PDF Seç",
    pagesToKeep: "Saklanacak sayfalar",
    pageInputPlaceholder: "ör. 1, 3-5, 9",
    pagesSelected: "sayfa seçildi",
    pageSelected: "sayfa seçildi",
    extracting: "Çıkarılıyor…",
    extract: "Çıkar",
    page: "sayfa",
    pages: "sayfa",
    download: "İndir",
    couldNotRead: "Bu PDF okunamadı.",
    couldNotExtract: "Sayfalar çıkarılamadı.",
    noValidPages: "Seçiminizde geçerli sayfa yok.",
  },
  id: {
    dropPdf: "Letakkan PDF Anda di sini",
    dropHint: "Ekstrak sebagian halaman ke PDF baru.",
    choosePdf: "Pilih PDF",
    pagesToKeep: "Halaman yang disimpan",
    pageInputPlaceholder: "mis. 1, 3-5, 9",
    pagesSelected: "halaman dipilih",
    pageSelected: "halaman dipilih",
    extracting: "Mengekstrak…",
    extract: "Ekstrak",
    page: "halaman",
    pages: "halaman",
    download: "Unduh",
    couldNotRead: "Tidak dapat membaca PDF ini.",
    couldNotExtract: "Tidak dapat mengekstrak halaman.",
    noValidPages: "Tidak ada halaman valid dalam pilihan Anda.",
  },
  vi: {
    dropPdf: "Kéo thả PDF vào đây",
    dropHint: "Trích xuất một tập hợp trang sang PDF mới.",
    choosePdf: "Chọn PDF",
    pagesToKeep: "Các trang cần giữ",
    pageInputPlaceholder: "ví dụ: 1, 3-5, 9",
    pagesSelected: "trang đã chọn",
    pageSelected: "trang đã chọn",
    extracting: "Đang trích xuất…",
    extract: "Trích xuất",
    page: "trang",
    pages: "trang",
    download: "Tải xuống",
    couldNotRead: "Không thể đọc PDF này.",
    couldNotExtract: "Không thể trích xuất các trang.",
    noValidPages: "Không có trang hợp lệ trong lựa chọn của bạn.",
  },
  sv: {
    dropPdf: "Släpp din PDF här",
    dropHint: "Extrahera en delmmängd sidor till en ny PDF.",
    choosePdf: "Välj PDF",
    pagesToKeep: "Sidor att behålla",
    pageInputPlaceholder: "t.ex. 1, 3-5, 9",
    pagesSelected: "sidor valda",
    pageSelected: "sida vald",
    extracting: "Extraherar…",
    extract: "Extrahera",
    page: "sida",
    pages: "sidor",
    download: "Ladda ner",
    couldNotRead: "Kunde inte läsa denna PDF.",
    couldNotExtract: "Kunde inte extrahera sidor.",
    noValidPages: "Inga giltiga sidor i ditt urval.",
  },
  pl: {
    dropPdf: "Upuść plik PDF tutaj",
    dropHint: "Wyodrębnij podzbiór stron do nowego pliku PDF.",
    choosePdf: "Wybierz PDF",
    pagesToKeep: "Strony do zachowania",
    pageInputPlaceholder: "np. 1, 3-5, 9",
    pagesSelected: "stron wybranych",
    pageSelected: "strona wybrana",
    extracting: "Wyodrębnianie…",
    extract: "Wyodrębnij",
    page: "strona",
    pages: "strony",
    download: "Pobierz",
    couldNotRead: "Nie można odczytać tego pliku PDF.",
    couldNotExtract: "Nie można wyodrębnić stron.",
    noValidPages: "Brak prawidłowych stron w wyborze.",
  },
  uk: {
    dropPdf: "Перетягніть PDF сюди",
    dropHint: "Витягніть підмножину сторінок у новий PDF.",
    choosePdf: "Вибрати PDF",
    pagesToKeep: "Сторінки для збереження",
    pageInputPlaceholder: "напр. 1, 3-5, 9",
    pagesSelected: "сторінок вибрано",
    pageSelected: "сторінка вибрана",
    extracting: "Витягування…",
    extract: "Витягти",
    page: "сторінка",
    pages: "сторінок",
    download: "Завантажити",
    couldNotRead: "Не вдалося прочитати цей PDF.",
    couldNotExtract: "Не вдалося витягти сторінки.",
    noValidPages: "У вашому виборі немає дійсних сторінок.",
  },
  cs: {
    dropPdf: "Přetažite PDF sem",
    dropHint: "Extrahujte podmnožinu stránek do nového PDF.",
    choosePdf: "Vybrat PDF",
    pagesToKeep: "Stránky k ponechání",
    pageInputPlaceholder: "např. 1, 3-5, 9",
    pagesSelected: "stránek vybráno",
    pageSelected: "stránka vybrána",
    extracting: "Extrahuji…",
    extract: "Extrahovat",
    page: "stránka",
    pages: "stránek",
    download: "Stáhnout",
    couldNotRead: "Tento PDF nelze přečíst.",
    couldNotExtract: "Stránky nelze extrahovat.",
    noValidPages: "Ve vašem výběru nejsou žádné platné stránky.",
  },
};

// Extract a subset of pages from a PDF into a brand-new PDF. Accepts either
// individual page numbers (1, 3, 7) or ranges (4-9), mixed (1, 3-5, 9). Pure
// pdf-lib, no preview rendering — kept lean for huge PDFs where the OCR /
// organize tool's thumbnailing is overkill.
export function ExtractPdfPagesClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [spec, setSpec] = useState("1-3");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFile = useCallback(async (f: File) => {
    setError(null); setOut(null); setFile(f); setPageCount(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
      setSpec(`1-${Math.min(doc.getPageCount(), 3)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotRead);
    }
  }, [s]);

  const parsedPages = parseSpec(spec, pageCount);
  const specError = pageCount > 0 && !parsedPages.length ? s.noValidPages : null;

  const extract = useCallback(async () => {
    if (!file || !parsedPages.length) return;
    setBusy(true); setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const dst = await PDFDocument.create();
      const copied = await dst.copyPages(src, parsedPages.map((p) => p - 1));
      for (const page of copied) dst.addPage(page);
      const bytes = await dst.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotExtract);
    } finally {
      setBusy(false);
    }
  }, [file, parsedPages, out, s]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setOut(null); setError(null); setPageCount(0);
  };

  if (!file) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">{s.dropPdf}</div>
        <div className="text-sm text-ink-500">{s.dropHint}</div>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{s.choosePdf}</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name} <span className="text-ink-400">({pageCount} {s.pages})</span></div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <label className="flex flex-col text-xs font-medium text-ink-600">
        {s.pagesToKeep}
        <input value={spec} onChange={(e) => setSpec(e.target.value)} placeholder={s.pageInputPlaceholder}
          className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        <span className="mt-1 text-ink-400">{parsedPages.length} {parsedPages.length === 1 ? s.pageSelected : s.pagesSelected}{parsedPages.length ? `: ${parsedPages.slice(0, 12).join(", ")}${parsedPages.length > 12 ? "…" : ""}` : ""}</span>
      </label>

      {(specError || error) && <p className="text-sm text-red-600">{specError ?? error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={extract} disabled={busy || !parsedPages.length}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{s.extracting}</> : `${s.extract} ${parsedPages.length} ${parsedPages.length === 1 ? s.page : s.pages}`}
        </Button>
        {out && (
          <a href={out.url} download={`extracted-${file.name}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

// Parse "1, 3-5, 9" → [1, 3, 4, 5, 9], clamped to [1, total] and deduped.
function parseSpec(spec: string, total: number): number[] {
  if (!total) return [];
  const out = new Set<number>();
  for (const raw of spec.split(",")) {
    const part = raw.trim();
    if (!part) continue;
    const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      let a = Number(range[1]), b = Number(range[2]);
      if (a > b) [a, b] = [b, a];
      for (let i = Math.max(1, a); i <= Math.min(total, b); i++) out.add(i);
    } else if (/^\d+$/.test(part)) {
      const n = Number(part);
      if (n >= 1 && n <= total) out.add(n);
    }
  }
  return [...out].sort((a, b) => a - b);
}
