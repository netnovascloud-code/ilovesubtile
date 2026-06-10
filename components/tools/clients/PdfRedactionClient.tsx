"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FileText, Download, Loader2, Undo2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "PDF to redact",
    working: "Working…",
    loadingPdf: "Loading PDF…",
    prev: "Prev",
    next: "Next",
    page: "Page",
    of: "/",
    undoBox: "Undo box",
    dragHint: "Drag on the page to draw a black box.",
    box: "box",
    boxes: "boxes",
    total: "total.",
    exportBtn: "Export redacted PDF",
    flattening: "Flattening page",
    saving: "Saving…",
    privacy: "Pages are flattened to images on export, so redacted text is permanently removed — not just covered. 100% in your browser.",
    couldNotOpen: "Could not open the PDF: ",
    couldNotExport: "Could not export the redacted PDF: ",
  },
  fr: {
    dropLabel: "PDF à caviarder",
    working: "Traitement…",
    loadingPdf: "Chargement du PDF…",
    prev: "Précédent",
    next: "Suivant",
    page: "Page",
    of: "/",
    undoBox: "Annuler la zone",
    dragHint: "Faites glisser sur la page pour dessiner un rectangle noir.",
    box: "zone",
    boxes: "zones",
    total: "au total.",
    exportBtn: "Exporter le PDF caviardé",
    flattening: "Aplatissement de la page",
    saving: "Enregistrement…",
    privacy: "Les pages sont aplaties en images lors de l'export, donc le texte caviardé est définitivement supprimé — pas seulement masqué. 100 % dans votre navigateur.",
    couldNotOpen: "Impossible d'ouvrir le PDF : ",
    couldNotExport: "Impossible d'exporter le PDF caviardé : ",
  },
  es: {
    dropLabel: "PDF a redactar",
    working: "Procesando…",
    loadingPdf: "Cargando PDF…",
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
    of: "/",
    undoBox: "Deshacer caja",
    dragHint: "Arrastra en la página para dibujar una caja negra.",
    box: "caja",
    boxes: "cajas",
    total: "en total.",
    exportBtn: "Exportar PDF redactado",
    flattening: "Aplanando página",
    saving: "Guardando…",
    privacy: "Las páginas se aplanan a imágenes en la exportación, por lo que el texto redactado se elimina de forma permanente — no solo cubierto. 100% en tu navegador.",
    couldNotOpen: "No se pudo abrir el PDF: ",
    couldNotExport: "No se pudo exportar el PDF redactado: ",
  },
  pt: {
    dropLabel: "PDF para redar",
    working: "A processar…",
    loadingPdf: "A carregar PDF…",
    prev: "Anterior",
    next: "Seguinte",
    page: "Página",
    of: "/",
    undoBox: "Desfazer caixa",
    dragHint: "Arraste na página para desenhar uma caixa preta.",
    box: "caixa",
    boxes: "caixas",
    total: "no total.",
    exportBtn: "Exportar PDF redigido",
    flattening: "A aplanar página",
    saving: "A guardar…",
    privacy: "As páginas são aplanadas para imagens na exportação, pelo que o texto redigido é removido permanentemente — não apenas coberto. 100% no seu navegador.",
    couldNotOpen: "Não foi possível abrir o PDF: ",
    couldNotExport: "Não foi possível exportar o PDF redigido: ",
  },
  de: {
    dropLabel: "Zu schwärzendes PDF",
    working: "Verarbeitung…",
    loadingPdf: "PDF wird geladen…",
    prev: "Zurück",
    next: "Weiter",
    page: "Seite",
    of: "/",
    undoBox: "Box rückgängig",
    dragHint: "Ziehen Sie auf der Seite, um eine schwarze Box zu zeichnen.",
    box: "Box",
    boxes: "Boxen",
    total: "insgesamt.",
    exportBtn: "Geschwärztes PDF exportieren",
    flattening: "Seite wird gerastert",
    saving: "Speichern…",
    privacy: "Seiten werden beim Export als Bilder gerastert, sodass geschwärzter Text dauerhaft entfernt wird — nicht nur abgedeckt. 100 % in Ihrem Browser.",
    couldNotOpen: "Die PDF konnte nicht geöffnet werden: ",
    couldNotExport: "Das geschwärzte PDF konnte nicht exportiert werden: ",
  },
  it: {
    dropLabel: "PDF da oscurare",
    working: "Elaborazione…",
    loadingPdf: "Caricamento PDF…",
    prev: "Precedente",
    next: "Successivo",
    page: "Pagina",
    of: "/",
    undoBox: "Annulla riquadro",
    dragHint: "Trascina sulla pagina per disegnare un riquadro nero.",
    box: "riquadro",
    boxes: "riquadri",
    total: "in totale.",
    exportBtn: "Esporta PDF oscurato",
    flattening: "Conversione pagina",
    saving: "Salvataggio…",
    privacy: "Le pagine vengono appiattite in immagini all'esportazione, quindi il testo oscurato viene rimosso definitivamente — non solo coperto. 100% nel browser.",
    couldNotOpen: "Impossibile aprire il PDF: ",
    couldNotExport: "Impossibile esportare il PDF oscurato: ",
  },
  nl: {
    dropLabel: "Te redigeren PDF",
    working: "Verwerken…",
    loadingPdf: "PDF laden…",
    prev: "Vorige",
    next: "Volgende",
    page: "Pagina",
    of: "/",
    undoBox: "Vak ongedaan maken",
    dragHint: "Sleep op de pagina om een zwart vak te tekenen.",
    box: "vak",
    boxes: "vakken",
    total: "totaal.",
    exportBtn: "Geredigeerde PDF exporteren",
    flattening: "Pagina rasteren",
    saving: "Opslaan…",
    privacy: "Pagina's worden bij export als afbeeldingen afgevlakt, zodat geredigeerde tekst permanent wordt verwijderd — niet alleen bedekt. 100% in uw browser.",
    couldNotOpen: "Kan de PDF niet openen: ",
    couldNotExport: "Kan de geredigeerde PDF niet exporteren: ",
  },
  ja: {
    dropLabel: "墨消しするPDF",
    working: "処理中…",
    loadingPdf: "PDFを読み込み中…",
    prev: "前へ",
    next: "次へ",
    page: "ページ",
    of: "/",
    undoBox: "ボックスを元に戻す",
    dragHint: "ページ上でドラッグして黒いボックスを描きます。",
    box: "ボックス",
    boxes: "ボックス",
    total: "合計。",
    exportBtn: "墨消しPDFをエクスポート",
    flattening: "ページをラスタライズ中",
    saving: "保存中…",
    privacy: "エクスポート時にページが画像として統合されるため、墨消しテキストは完全に削除されます — 隠されるだけではありません。100%ブラウザ内で処理。",
    couldNotOpen: "PDFを開けませんでした: ",
    couldNotExport: "墨消しPDFをエクスポートできませんでした: ",
  },
  zh: {
    dropLabel: "要编辑的PDF",
    working: "处理中…",
    loadingPdf: "正在加载PDF…",
    prev: "上一页",
    next: "下一页",
    page: "第",
    of: "/",
    undoBox: "撤销方框",
    dragHint: "在页面上拖动以绘制黑色方框。",
    box: "个方框",
    boxes: "个方框",
    total: "共。",
    exportBtn: "导出已编辑PDF",
    flattening: "正在栅格化第",
    saving: "正在保存…",
    privacy: "导出时页面将被栅格化为图像，因此编辑的文本将被永久删除 — 而不仅仅是遮盖。100%在您的浏览器中处理。",
    couldNotOpen: "无法打开PDF：",
    couldNotExport: "无法导出已编辑的PDF：",
  },
  ko: {
    dropLabel: "편집할 PDF",
    working: "처리 중…",
    loadingPdf: "PDF 로딩 중…",
    prev: "이전",
    next: "다음",
    page: "페이지",
    of: "/",
    undoBox: "상자 실행 취소",
    dragHint: "페이지에서 드래그하여 검은 상자를 그립니다.",
    box: "상자",
    boxes: "상자",
    total: "총.",
    exportBtn: "편집된 PDF 내보내기",
    flattening: "페이지 래스터화 중",
    saving: "저장 중…",
    privacy: "내보낼 때 페이지가 이미지로 병합되므로 편집된 텍스트가 영구적으로 제거됩니다 — 단순히 가려지는 것이 아닙니다. 100% 브라우저에서 처리.",
    couldNotOpen: "PDF를 열 수 없습니다: ",
    couldNotExport: "편집된 PDF를 내보낼 수 없습니다: ",
  },
  ar: {
    dropLabel: "PDF للتحرير",
    working: "جاري المعالجة…",
    loadingPdf: "جاري تحميل PDF…",
    prev: "السابق",
    next: "التالي",
    page: "صفحة",
    of: "/",
    undoBox: "تراجع عن المربع",
    dragHint: "اسحب على الصفحة لرسم مربع أسود.",
    box: "مربع",
    boxes: "مربعات",
    total: "إجمالاً.",
    exportBtn: "تصدير PDF المحرَّر",
    flattening: "تحويل الصفحة",
    saving: "جاري الحفظ…",
    privacy: "تُحوَّل الصفحات إلى صور عند التصدير، لذا يُزال النص المحرَّر نهائياً — لا يُغطَّى فقط. 100% في متصفحك.",
    couldNotOpen: "تعذر فتح PDF: ",
    couldNotExport: "تعذر تصدير PDF المحرَّر: ",
  },
  ru: {
    dropLabel: "PDF для редактирования",
    working: "Обработка…",
    loadingPdf: "Загрузка PDF…",
    prev: "Назад",
    next: "Далее",
    page: "Страница",
    of: "/",
    undoBox: "Отменить рамку",
    dragHint: "Перетащите по странице, чтобы нарисовать чёрную рамку.",
    box: "рамка",
    boxes: "рамок",
    total: "всего.",
    exportBtn: "Экспортировать редактированный PDF",
    flattening: "Растеризация страницы",
    saving: "Сохранение…",
    privacy: "При экспорте страницы растеризуются в изображения, поэтому скрытый текст удаляется навсегда — а не просто закрывается. 100% в вашем браузере.",
    couldNotOpen: "Не удалось открыть PDF: ",
    couldNotExport: "Не удалось экспортировать редактированный PDF: ",
  },
  hi: {
    dropLabel: "रिडैक्ट करने के लिए PDF",
    working: "प्रसंस्करण…",
    loadingPdf: "PDF लोड हो रहा है…",
    prev: "पिछला",
    next: "अगला",
    page: "पृष्ठ",
    of: "/",
    undoBox: "बॉक्स पूर्ववत करें",
    dragHint: "काला बॉक्स बनाने के लिए पृष्ठ पर खींचें।",
    box: "बॉक्स",
    boxes: "बॉक्स",
    total: "कुल।",
    exportBtn: "रिडैक्टेड PDF निर्यात करें",
    flattening: "पृष्ठ रास्टराइज़ हो रहा है",
    saving: "सहेजा जा रहा है…",
    privacy: "निर्यात पर पृष्ठ छवियों में बदले जाते हैं, इसलिए रिडैक्टेड टेक्स्ट स्थायी रूप से हटा दिया जाता है — केवल ढका नहीं। 100% आपके ब्राउज़र में।",
    couldNotOpen: "PDF नहीं खोला जा सका: ",
    couldNotExport: "रिडैक्टेड PDF निर्यात नहीं किया जा सका: ",
  },
  tr: {
    dropLabel: "Redakte edilecek PDF",
    working: "İşleniyor…",
    loadingPdf: "PDF yükleniyor…",
    prev: "Önceki",
    next: "Sonraki",
    page: "Sayfa",
    of: "/",
    undoBox: "Kutuyu geri al",
    dragHint: "Siyah kutu çizmek için sayfaya sürükleyin.",
    box: "kutu",
    boxes: "kutu",
    total: "toplam.",
    exportBtn: "Redakte edilmiş PDF'yi dışa aktar",
    flattening: "Sayfa taranıyor",
    saving: "Kaydediliyor…",
    privacy: "Dışa aktarmada sayfalar görüntülere dönüştürülür, böylece redakte edilen metin kalıcı olarak kaldırılır — yalnızca örtülmez. %100 tarayıcınızda.",
    couldNotOpen: "PDF açılamadı: ",
    couldNotExport: "Redakte edilmiş PDF dışa aktarılamadı: ",
  },
  id: {
    dropLabel: "PDF untuk disunting",
    working: "Memproses…",
    loadingPdf: "Memuat PDF…",
    prev: "Sebelumnya",
    next: "Berikutnya",
    page: "Halaman",
    of: "/",
    undoBox: "Batalkan kotak",
    dragHint: "Seret pada halaman untuk menggambar kotak hitam.",
    box: "kotak",
    boxes: "kotak",
    total: "total.",
    exportBtn: "Ekspor PDF yang disunting",
    flattening: "Rasterisasi halaman",
    saving: "Menyimpan…",
    privacy: "Halaman diratakan ke gambar saat ekspor, sehingga teks yang disunting dihapus secara permanen — bukan hanya ditutupi. 100% di browser Anda.",
    couldNotOpen: "Tidak dapat membuka PDF: ",
    couldNotExport: "Tidak dapat mengekspor PDF yang disunting: ",
  },
  vi: {
    dropLabel: "PDF cần biên tập",
    working: "Đang xử lý…",
    loadingPdf: "Đang tải PDF…",
    prev: "Trước",
    next: "Tiếp",
    page: "Trang",
    of: "/",
    undoBox: "Hoàn tác hộp",
    dragHint: "Kéo trên trang để vẽ hộp đen.",
    box: "hộp",
    boxes: "hộp",
    total: "tổng cộng.",
    exportBtn: "Xuất PDF đã biên tập",
    flattening: "Đang rasterize trang",
    saving: "Đang lưu…",
    privacy: "Các trang được làm phẳng thành ảnh khi xuất, vì vậy văn bản đã biên tập bị xóa vĩnh viễn — không chỉ bị che. 100% trong trình duyệt của bạn.",
    couldNotOpen: "Không thể mở PDF: ",
    couldNotExport: "Không thể xuất PDF đã biên tập: ",
  },
  sv: {
    dropLabel: "PDF att redigera",
    working: "Bearbetar…",
    loadingPdf: "Laddar PDF…",
    prev: "Föregående",
    next: "Nästa",
    page: "Sida",
    of: "/",
    undoBox: "Ångra ruta",
    dragHint: "Dra på sidan för att rita en svart ruta.",
    box: "ruta",
    boxes: "rutor",
    total: "totalt.",
    exportBtn: "Exportera redigerad PDF",
    flattening: "Rastrerar sida",
    saving: "Sparar…",
    privacy: "Sidor plattas till bilder vid export, så redigerad text tas bort permanent — inte bara täcks. 100% i din webbläsare.",
    couldNotOpen: "Kunde inte öppna PDF:en: ",
    couldNotExport: "Kunde inte exportera den redigerade PDF:en: ",
  },
  pl: {
    dropLabel: "PDF do redakcji",
    working: "Przetwarzanie…",
    loadingPdf: "Ładowanie PDF…",
    prev: "Wstecz",
    next: "Dalej",
    page: "Strona",
    of: "/",
    undoBox: "Cofnij pole",
    dragHint: "Przeciągnij na stronie, aby narysować czarne pole.",
    box: "pole",
    boxes: "pól",
    total: "łącznie.",
    exportBtn: "Eksportuj zredagowany PDF",
    flattening: "Rasteryzacja strony",
    saving: "Zapisywanie…",
    privacy: "Strony są spłaszczane do obrazów podczas eksportu, więc zredagowany tekst jest trwale usuwany — nie tylko zakrywany. 100% w przeglądarce.",
    couldNotOpen: "Nie można otworzyć PDF: ",
    couldNotExport: "Nie można wyeksportować zredagowanego PDF: ",
  },
  uk: {
    dropLabel: "PDF для редагування",
    working: "Обробка…",
    loadingPdf: "Завантаження PDF…",
    prev: "Назад",
    next: "Далі",
    page: "Сторінка",
    of: "/",
    undoBox: "Скасувати рамку",
    dragHint: "Перетягніть на сторінці, щоб намалювати чорну рамку.",
    box: "рамка",
    boxes: "рамок",
    total: "всього.",
    exportBtn: "Експортувати редагований PDF",
    flattening: "Растеризація сторінки",
    saving: "Збереження…",
    privacy: "При експорті сторінки растеризуються в зображення, тому прихований текст видаляється назавжди — а не просто закривається. 100% у вашому браузері.",
    couldNotOpen: "Не вдалося відкрити PDF: ",
    couldNotExport: "Не вдалося експортувати редагований PDF: ",
  },
  cs: {
    dropLabel: "PDF k redigování",
    working: "Zpracování…",
    loadingPdf: "Načítání PDF…",
    prev: "Předchozí",
    next: "Další",
    page: "Strana",
    of: "/",
    undoBox: "Vrátit rámeček",
    dragHint: "Přetáhněte na stránce a nakreslete černý rámeček.",
    box: "rámeček",
    boxes: "rámečků",
    total: "celkem.",
    exportBtn: "Exportovat redigovaný PDF",
    flattening: "Rasterizace strany",
    saving: "Ukládání…",
    privacy: "Stránky jsou při exportu sloučeny do obrázků, takže redigovaný text je trvale odstraněn — nejen zakryt. 100% ve vašem prohlížeči.",
    couldNotOpen: "PDF nelze otevřít: ",
    couldNotExport: "Redigovaný PDF nelze exportovat: ",
  },
};

type PdfViewport = { width: number; height: number };
type PdfPage = {
  getViewport: (o: { scale: number }) => PdfViewport;
  render: (o: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }) => { promise: Promise<void> };
};
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfDoc> };
};

let pdfjsCache: PdfJs | null = null;
async function loadPdfjs(): Promise<PdfJs> {
  if (pdfjsCache) return pdfjsCache;
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  pdfjsCache = lib;
  return lib;
}

/** Normalised rectangle (0..1) relative to its page, so it survives any scale. */
type Rect = { x: number; y: number; w: number; h: number };

const DISPLAY_W = 720;

export function PdfRedactionClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [rectsByPage, setRectsByPage] = useState<Record<number, Rect[]>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [preview, setPreview] = useState<Rect | null>(null);

  async function onFile(f: File) {
    setFile(f); setError(null); setRectsByPage({}); setPageNum(1); setBusy(true); setStatus(s.loadingPdf);
    try {
      const pdfjs = await loadPdfjs();
      const d = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise;
      setDoc(d);
    } catch (e) {
      setError(`${s.couldNotOpen}${(e as Error).message}`);
    } finally { setBusy(false); setStatus(""); }
  }

  const renderPage = useCallback(async (d: PdfDoc, n: number) => {
    const page = await d.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const scale = DISPLAY_W / base.width;
    const vp = page.getViewport({ scale });
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = vp.width; canvas.height = vp.height;
    await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
  }, []);

  useEffect(() => { if (doc) renderPage(doc, pageNum).catch(() => {}); }, [doc, pageNum, renderPage]);

  // ---- drawing redaction boxes (normalised coords) ----
  const pos = (e: React.PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };
  const onDown = (e: React.PointerEvent) => { drag.current = pos(e); setPreview(null); (e.target as Element).setPointerCapture(e.pointerId); };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const p = pos(e), st = drag.current;
    setPreview({ x: Math.min(st.x, p.x), y: Math.min(st.y, p.y), w: Math.abs(p.x - st.x), h: Math.abs(p.y - st.y) });
  };
  const onUp = () => {
    if (drag.current && preview && preview.w > 0.005 && preview.h > 0.005) {
      setRectsByPage((m) => ({ ...m, [pageNum]: [...(m[pageNum] ?? []), preview] }));
    }
    drag.current = null; setPreview(null);
  };
  const undo = () => setRectsByPage((m) => ({ ...m, [pageNum]: (m[pageNum] ?? []).slice(0, -1) }));

  const totalBoxes = Object.values(rectsByPage).reduce((a, r) => a + r.length, 0);

  // ---- flatten & export: rasterise every page, paint boxes, rebuild PDF ----
  async function exportPdf() {
    if (!doc || !file) return;
    setBusy(true); setError(null);
    try {
      const pdfjs = await loadPdfjs();
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (let n = 1; n <= doc.numPages; n++) {
        setStatus(`${s.flattening} ${n}/${doc.numPages}…`);
        const page = await doc.getPage(n);
        const pt = page.getViewport({ scale: 1 }); // size in PDF points
        const vp = page.getViewport({ scale: 2 }); // 2× for crisp raster
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        ctx.fillStyle = "#000";
        for (const r of rectsByPage[n] ?? []) {
          ctx.fillRect(r.x * canvas.width, r.y * canvas.height, r.w * canvas.width, r.h * canvas.height);
        }
        // toBlob avoids holding a multi-MB string in memory for every page —
        // a 50-page PDF would otherwise allocate ~50 MB of base64 string data
        // before pdf-lib even starts embedding.
        const pngBlob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
        const img = await out.embedPng(await pngBlob.arrayBuffer());
        const p = out.addPage([pt.width, pt.height]);
        p.drawImage(img, { x: 0, y: 0, width: pt.width, height: pt.height });
      }
      setStatus(s.saving);
      const bytes = await out.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${file.name.replace(/\.pdf$/i, "")}-redacted.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (e) {
      setError(`${s.couldNotExport}${(e as Error).message}`);
    } finally { setBusy(false); setStatus(""); }
  }

  const pageRects = rectsByPage[pageNum] ?? [];

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "application/pdf": [".pdf"] }}
        icon={<FileText className="h-5 w-5" />}
        onFile={onFile}
        current={file}
      />

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {busy && <div className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {status || s.working}</div>}

      {doc && (
        <>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Button variant="outline" size="sm" disabled={pageNum <= 1} onClick={() => setPageNum((n) => n - 1)}>{s.prev}</Button>
            <span className="text-ink-600">{s.page} {pageNum} {s.of} {doc.numPages}</span>
            <Button variant="outline" size="sm" disabled={pageNum >= doc.numPages} onClick={() => setPageNum((n) => n + 1)}>{s.next}</Button>
            <Button variant="outline" size="sm" disabled={pageRects.length === 0} onClick={undo}><Undo2 className="h-3.5 w-3.5" /> {s.undoBox}</Button>
            <span className="text-xs text-ink-400">{s.dragHint} {totalBoxes} {totalBoxes === 1 ? s.box : s.boxes} {s.total}</span>
          </div>

          <div
            ref={wrapRef}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
            className="relative mx-auto w-fit cursor-crosshair touch-none select-none rounded border border-ink-200"
            style={{ maxWidth: "100%" }}
          >
            <canvas ref={canvasRef} className="block max-w-full" />
            {pageRects.map((r, i) => (
              <div key={i} className="absolute bg-black" style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` }} />
            ))}
            {preview && (
              <div className="absolute border-2 border-brand-500 bg-brand-500/40" style={{ left: `${preview.x * 100}%`, top: `${preview.y * 100}%`, width: `${preview.w * 100}%`, height: `${preview.h * 100}%` }} />
            )}
          </div>

          <Button onClick={exportPdf} disabled={busy || totalBoxes === 0} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {s.exportBtn}
          </Button>
          <p className="flex items-center gap-1.5 text-xs text-ink-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            {s.privacy}
          </p>
        </>
      )}
    </div>
  );
}
