"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Loader2, GripVertical, Trash2, RotateCw, Upload } from "lucide-react";
import { ReorderButtons } from "@/components/tools/ReorderButtons";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropYourPdf: "Drop your PDF",
    dropHint: "Reorder pages, rotate them, or delete what you don't need.",
    choosePdf: "Choose PDF",
    renderingPages: "Rendering pages…",
    exportReorganized: "Export reorganized PDF",
    exporting: "Exporting…",
    download: "Download",
    rotatePage: "Rotate 90°",
    deletePage: "Delete page",
    page: "Page",
    couldNotRead: "Could not read this PDF.",
    couldNotExport: "Could not export PDF.",
    privacy: "Drag a thumbnail to a new position to reorder. Everything runs in your browser — the PDF is never uploaded.",
  },
  fr: {
    dropYourPdf: "Déposez votre PDF",
    dropHint: "Réorganisez les pages, faites-les pivoter ou supprimez celles dont vous n'avez pas besoin.",
    choosePdf: "Choisir un PDF",
    renderingPages: "Rendu des pages…",
    exportReorganized: "Exporter le PDF réorganisé",
    exporting: "Exportation…",
    download: "Télécharger",
    rotatePage: "Pivoter de 90°",
    deletePage: "Supprimer la page",
    page: "Page",
    couldNotRead: "Impossible de lire ce PDF.",
    couldNotExport: "Impossible d'exporter le PDF.",
    privacy: "Faites glisser une miniature vers une nouvelle position pour réordonner. Tout se passe dans votre navigateur — le PDF n'est jamais envoyé.",
  },
  es: {
    dropYourPdf: "Suelta tu PDF",
    dropHint: "Reordena páginas, rótalas o elimina las que no necesites.",
    choosePdf: "Elegir PDF",
    renderingPages: "Renderizando páginas…",
    exportReorganized: "Exportar PDF reorganizado",
    exporting: "Exportando…",
    download: "Descargar",
    rotatePage: "Rotar 90°",
    deletePage: "Eliminar página",
    page: "Página",
    couldNotRead: "No se pudo leer este PDF.",
    couldNotExport: "No se pudo exportar el PDF.",
    privacy: "Arrastra una miniatura a una nueva posición para reordenar. Todo se ejecuta en tu navegador — el PDF nunca se sube.",
  },
  pt: {
    dropYourPdf: "Solte seu PDF",
    dropHint: "Reordene páginas, gire-as ou exclua o que não precisa.",
    choosePdf: "Escolher PDF",
    renderingPages: "Renderizando páginas…",
    exportReorganized: "Exportar PDF reorganizado",
    exporting: "Exportando…",
    download: "Baixar",
    rotatePage: "Girar 90°",
    deletePage: "Excluir página",
    page: "Página",
    couldNotRead: "Não foi possível ler este PDF.",
    couldNotExport: "Não foi possível exportar o PDF.",
    privacy: "Arraste uma miniatura para uma nova posição para reordenar. Tudo é executado no seu navegador — o PDF nunca é enviado.",
  },
  de: {
    dropYourPdf: "PDF hier ablegen",
    dropHint: "Seiten neu anordnen, drehen oder nicht benötigte löschen.",
    choosePdf: "PDF auswählen",
    renderingPages: "Seiten werden gerendert…",
    exportReorganized: "Neugeordnetes PDF exportieren",
    exporting: "Exportieren…",
    download: "Herunterladen",
    rotatePage: "90° drehen",
    deletePage: "Seite löschen",
    page: "Seite",
    couldNotRead: "Diese PDF konnte nicht gelesen werden.",
    couldNotExport: "PDF konnte nicht exportiert werden.",
    privacy: "Miniaturansicht an neue Position ziehen, um neu anzuordnen. Alles wird im Browser ausgeführt — die PDF wird nie hochgeladen.",
  },
  it: {
    dropYourPdf: "Trascina il tuo PDF",
    dropHint: "Riordina le pagine, ruotale o elimina quelle non necessarie.",
    choosePdf: "Scegli PDF",
    renderingPages: "Rendering delle pagine…",
    exportReorganized: "Esporta PDF riorganizzato",
    exporting: "Esportazione…",
    download: "Scarica",
    rotatePage: "Ruota 90°",
    deletePage: "Elimina pagina",
    page: "Pagina",
    couldNotRead: "Impossibile leggere questo PDF.",
    couldNotExport: "Impossibile esportare il PDF.",
    privacy: "Trascina una miniatura in una nuova posizione per riordinare. Tutto viene eseguito nel browser — il PDF non viene mai caricato.",
  },
  nl: {
    dropYourPdf: "Zet uw PDF hier neer",
    dropHint: "Orden pagina's opnieuw, roteer ze of verwijder wat u niet nodig hebt.",
    choosePdf: "PDF kiezen",
    renderingPages: "Pagina's renderen…",
    exportReorganized: "Gereorganiseerde PDF exporteren",
    exporting: "Exporteren…",
    download: "Downloaden",
    rotatePage: "90° draaien",
    deletePage: "Pagina verwijderen",
    page: "Pagina",
    couldNotRead: "Dit PDF-bestand kon niet worden gelezen.",
    couldNotExport: "PDF kon niet worden geëxporteerd.",
    privacy: "Sleep een miniatuur naar een nieuwe positie om te herordenen. Alles wordt in uw browser uitgevoerd — de PDF wordt nooit geüpload.",
  },
  ja: {
    dropYourPdf: "PDFをドロップ",
    dropHint: "ページを並び替え、回転、または不要なページを削除できます。",
    choosePdf: "PDFを選択",
    renderingPages: "ページをレンダリング中…",
    exportReorganized: "整理済みPDFをエクスポート",
    exporting: "エクスポート中…",
    download: "ダウンロード",
    rotatePage: "90°回転",
    deletePage: "ページを削除",
    page: "ページ",
    couldNotRead: "このPDFを読み込めませんでした。",
    couldNotExport: "PDFをエクスポートできませんでした。",
    privacy: "サムネイルをドラッグして新しい位置に移動して並び替えます。すべてブラウザで実行 — PDFはアップロードされません。",
  },
  zh: {
    dropYourPdf: "拖入您的PDF",
    dropHint: "重新排序页面、旋转页面或删除不需要的页面。",
    choosePdf: "选择PDF",
    renderingPages: "渲染页面中…",
    exportReorganized: "导出重新整理的PDF",
    exporting: "导出中…",
    download: "下载",
    rotatePage: "旋转90°",
    deletePage: "删除页面",
    page: "第",
    couldNotRead: "无法读取此PDF。",
    couldNotExport: "无法导出PDF。",
    privacy: "将缩略图拖到新位置以重新排序。一切在您的浏览器中运行 — PDF永远不会被上传。",
  },
  ko: {
    dropYourPdf: "PDF를 여기에 놓으세요",
    dropHint: "페이지를 재정렬하거나 회전하거나 불필요한 것을 삭제하세요.",
    choosePdf: "PDF 선택",
    renderingPages: "페이지 렌더링 중…",
    exportReorganized: "재구성된 PDF 내보내기",
    exporting: "내보내는 중…",
    download: "다운로드",
    rotatePage: "90° 회전",
    deletePage: "페이지 삭제",
    page: "페이지",
    couldNotRead: "이 PDF를 읽을 수 없습니다.",
    couldNotExport: "PDF를 내보낼 수 없습니다.",
    privacy: "썸네일을 새 위치로 드래그하여 순서를 변경합니다. 브라우저에서 100% 실행 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    dropYourPdf: "أسقط ملف PDF هنا",
    dropHint: "أعد ترتيب الصفحات أو دوّرها أو احذف ما لا تحتاجه.",
    choosePdf: "اختر PDF",
    renderingPages: "جاري عرض الصفحات…",
    exportReorganized: "تصدير PDF المُعاد تنظيمه",
    exporting: "جاري التصدير…",
    download: "تنزيل",
    rotatePage: "تدوير 90°",
    deletePage: "حذف الصفحة",
    page: "صفحة",
    couldNotRead: "تعذّر قراءة هذا الملف PDF.",
    couldNotExport: "تعذّر تصدير الملف PDF.",
    privacy: "اسحب صورة مصغّرة إلى موضع جديد لإعادة الترتيب. يعمل كل شيء في متصفحك — لن يتم تحميل الملف PDF مطلقًا.",
  },
  ru: {
    dropYourPdf: "Перетащите PDF сюда",
    dropHint: "Меняйте порядок страниц, поворачивайте их или удаляйте ненужные.",
    choosePdf: "Выбрать PDF",
    renderingPages: "Рендеринг страниц…",
    exportReorganized: "Экспортировать реорганизованный PDF",
    exporting: "Экспорт…",
    download: "Скачать",
    rotatePage: "Повернуть на 90°",
    deletePage: "Удалить страницу",
    page: "Стр.",
    couldNotRead: "Не удалось прочитать этот PDF.",
    couldNotExport: "Не удалось экспортировать PDF.",
    privacy: "Перетащите миниатюру на новое место для изменения порядка. Всё работает в браузере — PDF не загружается.",
  },
  hi: {
    dropYourPdf: "अपना PDF यहाँ छोड़ें",
    dropHint: "पेज पुनः व्यवस्थित करें, घुमाएं, या जो नहीं चाहिए उसे हटाएं।",
    choosePdf: "PDF चुनें",
    renderingPages: "पेज रेंडर हो रहे हैं…",
    exportReorganized: "पुनर्गठित PDF निर्यात करें",
    exporting: "निर्यात हो रहा है…",
    download: "डाउनलोड करें",
    rotatePage: "90° घुमाएं",
    deletePage: "पेज हटाएं",
    page: "पेज",
    couldNotRead: "यह PDF नहीं पढ़ा जा सका।",
    couldNotExport: "PDF निर्यात नहीं हो सका।",
    privacy: "क्रम बदलने के लिए थंबनेल को नई स्थिति पर खींचें। सब कुछ आपके ब्राउज़र में चलता है — PDF कभी अपलोड नहीं होता।",
  },
  tr: {
    dropYourPdf: "PDF'inizi buraya bırakın",
    dropHint: "Sayfaları yeniden düzenleyin, döndürün veya gerekmeyen sayfaları silin.",
    choosePdf: "PDF seç",
    renderingPages: "Sayfalar oluşturuluyor…",
    exportReorganized: "Yeniden düzenlenmiş PDF'i dışa aktar",
    exporting: "Dışa aktarılıyor…",
    download: "İndir",
    rotatePage: "90° döndür",
    deletePage: "Sayfayı sil",
    page: "Sayfa",
    couldNotRead: "Bu PDF okunamadı.",
    couldNotExport: "PDF dışa aktarılamadı.",
    privacy: "Yeniden sıralamak için küçük resmi yeni bir konuma sürükleyin. Her şey tarayıcınızda çalışır — PDF hiçbir zaman yüklenmez.",
  },
  id: {
    dropYourPdf: "Jatuhkan PDF Anda di sini",
    dropHint: "Atur ulang halaman, putar, atau hapus yang tidak diperlukan.",
    choosePdf: "Pilih PDF",
    renderingPages: "Merender halaman…",
    exportReorganized: "Ekspor PDF yang diatur ulang",
    exporting: "Mengekspor…",
    download: "Unduh",
    rotatePage: "Putar 90°",
    deletePage: "Hapus halaman",
    page: "Halaman",
    couldNotRead: "PDF ini tidak dapat dibaca.",
    couldNotExport: "PDF tidak dapat diekspor.",
    privacy: "Seret thumbnail ke posisi baru untuk mengurutkan ulang. Semuanya berjalan di browser Anda — PDF tidak pernah diunggah.",
  },
  vi: {
    dropYourPdf: "Kéo PDF vào đây",
    dropHint: "Sắp xếp lại trang, xoay hoặc xóa những gì không cần.",
    choosePdf: "Chọn PDF",
    renderingPages: "Đang kết xuất trang…",
    exportReorganized: "Xuất PDF đã tổ chức lại",
    exporting: "Đang xuất…",
    download: "Tải xuống",
    rotatePage: "Xoay 90°",
    deletePage: "Xóa trang",
    page: "Trang",
    couldNotRead: "Không thể đọc PDF này.",
    couldNotExport: "Không thể xuất PDF.",
    privacy: "Kéo hình thu nhỏ đến vị trí mới để sắp xếp lại. Mọi thứ chạy trong trình duyệt — PDF không bao giờ được tải lên.",
  },
  sv: {
    dropYourPdf: "Släpp din PDF här",
    dropHint: "Ordna om sidor, rotera dem eller ta bort det du inte behöver.",
    choosePdf: "Välj PDF",
    renderingPages: "Renderar sidor…",
    exportReorganized: "Exportera omorganiserad PDF",
    exporting: "Exporterar…",
    download: "Ladda ner",
    rotatePage: "Rotera 90°",
    deletePage: "Ta bort sida",
    page: "Sida",
    couldNotRead: "Det gick inte att läsa denna PDF.",
    couldNotExport: "Det gick inte att exportera PDF:en.",
    privacy: "Dra en miniatyr till en ny position för att ändra ordning. Allt körs i din webbläsare — PDF:en laddas aldrig upp.",
  },
  pl: {
    dropYourPdf: "Upuść plik PDF tutaj",
    dropHint: "Zmień kolejność stron, obróć je lub usuń to, czego nie potrzebujesz.",
    choosePdf: "Wybierz PDF",
    renderingPages: "Renderowanie stron…",
    exportReorganized: "Eksportuj przeorganizowany PDF",
    exporting: "Eksportowanie…",
    download: "Pobierz",
    rotatePage: "Obróć o 90°",
    deletePage: "Usuń stronę",
    page: "Strona",
    couldNotRead: "Nie można odczytać tego pliku PDF.",
    couldNotExport: "Nie można wyeksportować pliku PDF.",
    privacy: "Przeciągnij miniaturę na nową pozycję, aby zmienić kolejność. Wszystko działa w przeglądarce — plik PDF nigdy nie jest przesyłany.",
  },
  uk: {
    dropYourPdf: "Перетягніть PDF сюди",
    dropHint: "Змінюйте порядок сторінок, повертайте їх або видаляйте непотрібні.",
    choosePdf: "Вибрати PDF",
    renderingPages: "Рендеринг сторінок…",
    exportReorganized: "Експортувати реорганізований PDF",
    exporting: "Експорт…",
    download: "Завантажити",
    rotatePage: "Повернути на 90°",
    deletePage: "Видалити сторінку",
    page: "Стор.",
    couldNotRead: "Не вдалося прочитати цей PDF.",
    couldNotExport: "Не вдалося експортувати PDF.",
    privacy: "Перетягніть мініатюру на нове місце для зміни порядку. Все працює у вашому браузері — PDF ніколи не завантажується.",
  },
  cs: {
    dropYourPdf: "Sem přetáhněte PDF",
    dropHint: "Změňte pořadí stránek, otočte je nebo odstraňte, co nepotřebujete.",
    choosePdf: "Vybrat PDF",
    renderingPages: "Vykreslování stránek…",
    exportReorganized: "Exportovat reorganizované PDF",
    exporting: "Exportování…",
    download: "Stáhnout",
    rotatePage: "Otočit o 90°",
    deletePage: "Smazat stránku",
    page: "Strana",
    couldNotRead: "Tento soubor PDF nelze přečíst.",
    couldNotExport: "PDF soubor nelze exportovat.",
    privacy: "Přetáhněte miniaturu na novou pozici pro změnu pořadí. Vše probíhá ve vašem prohlížeči — PDF soubor není nikdy nahrán.",
  },
};

// Combined "organize PDF" tool — what iLovePDF calls /organize_pdf. Loads
// every page as a thumbnail, lets the user drag to reorder, rotate each
// page 90deg, or delete individual pages, then saves a fresh PDF with
// only the surviving (re-ordered) pages.
//
// pdf-lib handles the PDF mutation; pdfjs-dist renders the previews.
type Page = { id: string; sourceIndex: number; rotation: number; thumb: string };

export function OrganizePdfClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const dragIdx = useRef<number | null>(null);

  const onFile = useCallback(async (f: File) => {
    setError(null); setOut(null); setFile(f); setPages([]);
    setBusy(true);
    try {
      const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.mjs";
      const pdfjs = await import(/* webpackIgnore: true */ url) as typeof import("pdfjs-dist");
      // Workers are heavy and tend to break under bundlers — disable them and
      // run the small worker payload on the main thread (fine for thumbnails).
      pdfjs.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.mjs";
      const data = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      const result: Page[] = [];
      for (let i = 0; i < doc.numPages; i++) {
        const page = await doc.getPage(i + 1);
        const vp = page.getViewport({ scale: 0.4 });
        const c = document.createElement("canvas");
        c.width = vp.width; c.height = vp.height;
        await page.render({ canvas: c, canvasContext: c.getContext("2d")!, viewport: vp }).promise;
        result.push({ id: crypto.randomUUID(), sourceIndex: i, rotation: 0, thumb: c.toDataURL("image/jpeg", 0.75) });
      }
      setPages(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotRead);
    } finally {
      setBusy(false);
    }
  }, [s.couldNotRead]);

  const move = (from: number, to: number) => {
    if (from === to) return;
    setPages((p) => { const c = p.slice(); const [it] = c.splice(from, 1); c.splice(to, 0, it); return c; });
  };
  const remove = (i: number) => setPages((p) => p.filter((_, idx) => idx !== i));
  const rotate = (i: number) => setPages((p) => p.map((pg, idx) => idx === i ? { ...pg, rotation: (pg.rotation + 90) % 360 } : pg));

  const exportPdf = useCallback(async () => {
    if (!file || !pages.length) return;
    setBusy(true); setError(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer());
      const dst = await PDFDocument.create();
      const copied = await dst.copyPages(src, pages.map((p) => p.sourceIndex));
      for (let i = 0; i < copied.length; i++) {
        const page = copied[i];
        const rot = pages[i].rotation;
        if (rot) page.setRotation(degrees(((page.getRotation().angle ?? 0) + rot) % 360));
        dst.addPage(page);
      }
      const bytes = await dst.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotExport);
    } finally {
      setBusy(false);
    }
  }, [file, pages, out, s.couldNotExport]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setPages([]); setOut(null); setError(null);
  };

  if (!file) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">{s.dropYourPdf}</div>
        <div className="text-sm text-ink-500">{s.dropHint}</div>
        <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{s.choosePdf}</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name} <span className="text-ink-400">({pages.length} {s.page.toLowerCase()}s)</span></div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      {busy && !pages.length && (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" />{s.renderingPages}</div>
      )}

      {pages.length > 0 && (
        <>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {pages.map((p, i) => (
              <li key={p.id}
                draggable
                onDragStart={() => { dragIdx.current = i; }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (dragIdx.current !== null) move(dragIdx.current, i); dragIdx.current = null; }}
                className="group relative cursor-move rounded-lg border border-ink-200 bg-white p-2 shadow-sm hover:border-brand-300">
                <div className="absolute right-1 top-1 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => rotate(i)} className="grid h-6 w-6 place-items-center rounded bg-white/90 text-ink-700 shadow ring-1 ring-ink-200 hover:bg-brand-50" title={s.rotatePage} aria-label={s.rotatePage}>
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => remove(i)} className="grid h-6 w-6 place-items-center rounded bg-white/90 text-red-600 shadow ring-1 ring-ink-200 hover:bg-red-50" title={s.deletePage} aria-label={s.deletePage}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <img src={p.thumb} alt={`${s.page} ${i + 1}`} style={{ transform: `rotate(${p.rotation}deg)` }} className="mx-auto block max-h-44 w-auto transition-transform" />
                <div className="mt-1 flex items-center justify-between text-xs text-ink-500">
                  <GripVertical className="h-3 w-3" />
                  <ReorderButtons index={i} count={pages.length} onMove={move} />
                  <span>{s.page} {i + 1}</span>
                  <span className="font-mono text-ink-400">#{p.sourceIndex + 1}</span>
                </div>
              </li>
            ))}
          </ul>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-wrap gap-2">
            <Button onClick={exportPdf} disabled={busy || !pages.length}>
              {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{s.exporting}</> : s.exportReorganized}
            </Button>
            {out && (
              <a href={out.url} download={`organized-${file.name}`}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
                <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
              </a>
            )}
          </div>
        </>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
