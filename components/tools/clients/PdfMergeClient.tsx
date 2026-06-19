"use client";

import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Entry = { id: string; file: File };

const T: Record<string, Record<string, string>> = {
  en: {
    addFiles: "Add PDF files",
    dropHint: "Drop files here or click to choose · drag to reorder",
    merging: "Merging…",
    mergePdfs: "Merge PDFs",
    downloadMerged: "Download merged PDF",
    couldNotMerge: "Could not merge: ",
    privacy: "Merged 100% in your browser — your PDFs are never uploaded.",
  },
  fr: {
    addFiles: "Ajouter des fichiers PDF",
    dropHint: "Déposez des fichiers ici ou cliquez pour choisir · glissez pour réordonner",
    merging: "Fusion en cours…",
    mergePdfs: "Fusionner les PDF",
    downloadMerged: "Télécharger le PDF fusionné",
    couldNotMerge: "Impossible de fusionner : ",
    privacy: "Fusionné 100 % dans votre navigateur — vos PDF ne sont jamais envoyés.",
  },
  es: {
    addFiles: "Añadir archivos PDF",
    dropHint: "Suelta archivos aquí o haz clic para elegir · arrastra para reordenar",
    merging: "Combinando…",
    mergePdfs: "Combinar PDF",
    downloadMerged: "Descargar PDF combinado",
    couldNotMerge: "No se pudo combinar: ",
    privacy: "Combinado 100 % en tu navegador — tus PDF nunca se suben.",
  },
  pt: {
    addFiles: "Adicionar arquivos PDF",
    dropHint: "Solte arquivos aqui ou clique para escolher · arraste para reordenar",
    merging: "Mesclando…",
    mergePdfs: "Mesclar PDF",
    downloadMerged: "Baixar PDF mesclado",
    couldNotMerge: "Não foi possível mesclar: ",
    privacy: "Mesclado 100 % no seu navegador — seus PDF nunca são enviados.",
  },
  de: {
    addFiles: "PDF-Dateien hinzufügen",
    dropHint: "Dateien hier ablegen oder klicken · ziehen zum Neuanordnen",
    merging: "Wird zusammengefügt…",
    mergePdfs: "PDFs zusammenfügen",
    downloadMerged: "Zusammengefügtes PDF herunterladen",
    couldNotMerge: "Zusammenfügen fehlgeschlagen: ",
    privacy: "100 % im Browser zusammengefügt — Ihre PDFs werden nie hochgeladen.",
  },
  it: {
    addFiles: "Aggiungi file PDF",
    dropHint: "Trascina qui i file o clicca per scegliere · trascina per riordinare",
    merging: "Unione in corso…",
    mergePdfs: "Unisci PDF",
    downloadMerged: "Scarica PDF unito",
    couldNotMerge: "Impossibile unire: ",
    privacy: "Unito al 100 % nel browser — i tuoi PDF non vengono mai caricati.",
  },
  nl: {
    addFiles: "PDF-bestanden toevoegen",
    dropHint: "Bestanden hier neerzetten of klikken om te kiezen · slepen om te herordenen",
    merging: "Samenvoegen…",
    mergePdfs: "PDF’s samenvoegen",
    downloadMerged: "Samengevoegde PDF downloaden",
    couldNotMerge: "Samenvoegen mislukt: ",
    privacy: "100 % samengevoegd in uw browser — uw PDF’s worden nooit geüpload.",
  },
  ja: {
    addFiles: "PDFファイルを追加",
    dropHint: "ファイルをここにドロップまたはクリックして選択 · ドラッグして並び替え",
    merging: "結合中…",
    mergePdfs: "PDFを結合",
    downloadMerged: "結合したPDFをダウンロード",
    couldNotMerge: "結合できませんでした: ",
    privacy: "ブラウザで100%処理 — PDFはアップロードされません。",
  },
  zh: {
    addFiles: "添加PDF文件",
    dropHint: "将文件拖到此处或点击选择 · 拖拽以重新排序",
    merging: "合并中…",
    mergePdfs: "合并PDF",
    downloadMerged: "下载合并后PDF",
    couldNotMerge: "合并失败：",
    privacy: "全部在您的浏览器中处理 — PDF永远不会被上传。",
  },
  ko: {
    addFiles: "PDF 파일 추가",
    dropHint: "파일을 여기에 놓거나 클릭하여 선택 · 드래그하여 순서 변경",
    merging: "병합 중…",
    mergePdfs: "PDF 병합",
    downloadMerged: "병합된 PDF 다운로드",
    couldNotMerge: "병합할 수 없습니다: ",
    privacy: "브라우저에서 100% 처리 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    addFiles: "إضافة ملفات PDF",
    dropHint: "أسقط الملفات هنا أو انقر للاختيار · اسحب لإعادة الترتيب",
    merging: "جاري الدمج…",
    mergePdfs: "دمج PDF",
    downloadMerged: "تنزيل PDF المدمج",
    couldNotMerge: "تعذّر الدمج: ",
    privacy: "يتم الدمج 100% في متصفحك — لن يتم تحميل ملفات PDF مطلقًا.",
  },
  ru: {
    addFiles: "Добавить PDF-файлы",
    dropHint: "Перетащите файлы сюда или нажмите для выбора · перетащивайте для сортировки",
    merging: "Объединение…",
    mergePdfs: "Объединить PDF",
    downloadMerged: "Скачать объединённый PDF",
    couldNotMerge: "Не удалось объединить: ",
    privacy: "Объединение на 100% в вашем браузере — ваши PDF не загружаются.",
  },
  hi: {
    addFiles: "PDF फ़ाइलें जोड़ें",
    dropHint: "फ़ाइलें यहां ड्र钛 करें या चुनने के लिए क्लिक करें · क्रम बदलने के लिए खींचें",
    merging: "मर्ज हो रहा है…",
    mergePdfs: "PDF मर्ज करें",
    downloadMerged: "मर्ज किया PDF डाउनलोड करें",
    couldNotMerge: "मर्ज नहीं हो सका: ",
    privacy: "आपके ब्राउज़र में 100% मर्ज — आपके PDF कभी अपलोड नहीं होते।",
  },
  tr: {
    addFiles: "PDF dosyaları ekle",
    dropHint: "Dosyaları buraya bırak veya seçmek için tıkla · yeniden sıralamak için sürükle",
    merging: "Birleştiriliyor…",
    mergePdfs: "PDF’leri birleştir",
    downloadMerged: "Birleştirilmiş PDF’i indir",
    couldNotMerge: "Birleştirilemedi: ",
    privacy: "Tarayıcınızda 100% birleştirildi — PDF’leriniz hiçbir zaman yüklenmez.",
  },
  id: {
    addFiles: "Tambahkan file PDF",
    dropHint: "Jatuhkan file di sini atau klik untuk memilih · seret untuk mengurutkan ulang",
    merging: "Menggabungkan…",
    mergePdfs: "Gabungkan PDF",
    downloadMerged: "Unduh PDF gabungan",
    couldNotMerge: "Gagal menggabungkan: ",
    privacy: "Digabungkan 100% di browser Anda — PDF Anda tidak pernah diunggah.",
  },
  vi: {
    addFiles: "Thêm tệp PDF",
    dropHint: "Kéo tệp vào đây hoặc nhấp để chọn · kéo để sắp xếp lại",
    merging: "Đang ghép…",
    mergePdfs: "Ghép PDF",
    downloadMerged: "Tải xuống PDF đã ghép",
    couldNotMerge: "Không thể ghép: ",
    privacy: "Ghép 100% trong trình duyệt — PDF của bạn không bao giờ được tải lên.",
  },
  sv: {
    addFiles: "Lägg till PDF-filer",
    dropHint: "Släpp filer här eller klicka för att välja · dra för att ändra ordning",
    merging: "Sammanfogar…",
    mergePdfs: "Sammanfoga PDF:er",
    downloadMerged: "Ladda ner sammanfogad PDF",
    couldNotMerge: "Kunde inte sammanfoga: ",
    privacy: "Sammanfogad 100% i din webbläsare — dina PDF:er laddas aldrig upp.",
  },
  pl: {
    addFiles: "Dodaj pliki PDF",
    dropHint: "Upuść pliki tutaj lub kliknij, aby wybrać · przeciągnij, aby zmienić kolejność",
    merging: "Scalanie…",
    mergePdfs: "Scal pliki PDF",
    downloadMerged: "Pobierz scalony PDF",
    couldNotMerge: "Nie można scalać: ",
    privacy: "Scalono w 100% w Twojej przeglądarce — Twoje pliki PDF nigdy nie są przesyłane.",
  },
  uk: {
    addFiles: "Додати PDF-файли",
    dropHint: "Перетягніть файли сюди або натисніть для вибору · перетягуйте для зміни порядку",
    merging: "Об’єднання…",
    mergePdfs: "Об’єднати PDF",
    downloadMerged: "Завантажити об’єднаний PDF",
    couldNotMerge: "Не вдалося об’єднати: ",
    privacy: "Об’єднання на 100% у вашому браузері — ваші PDF ніколи не завантажуються.",
  },
  cs: {
    addFiles: "Přidat soubory PDF",
    dropHint: "Přetáhněte soubory sem nebo klikněte pro výběr · přetáhněte pro změnu pořadí",
    merging: "Sloučování…",
    mergePdfs: "Sloučit PDF",
    downloadMerged: "Stáhnout sloučené PDF",
    couldNotMerge: "Sloučení se nezdařilo: ",
    privacy: "Sloučeno 100% ve vašem prohlížeči — vaše PDF soubory nejsou nikdy nahrávány.",
  },
};

export function PdfMergeClient() {
  const s = T[useLocale()] ?? T.en;
  const [items, setItems] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);

  function add(files: FileList | null) {
    if (!files) return;
    const next: Entry[] = [];
    for (const f of Array.from(files)) {
      if (f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")) {
        next.push({ id: crypto.randomUUID(), file: f });
      }
    }
    setItems((prev) => [...prev, ...next]);
    setResultUrl(null); setError(null);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((e) => e.id !== id));
    setResultUrl(null);
  }

  function move(from: number, to: number) {
    setItems((prev) => {
      const next = prev.slice();
      const [it] = next.splice(from, 1);
      next.splice(to, 0, it);
      return next;
    });
  }

  async function merge() {
    if (items.length < 2 || busy) return;
    if (resultUrl) URL.revokeObjectURL(resultUrl); setBusy(true); setError(null); setResultUrl(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const { file } of items) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await out.copyPages(src, src.getPageIndices());
        for (const p of pages) out.addPage(p);
      }
      const blob = new Blob([await out.save() as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(`${s.couldNotMerge}${(e as Error).message}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-blue-600" />
        <span className="mt-2 font-medium text-ink-900">{s.addFiles}</span>
        <span className="mt-0.5 text-xs text-ink-400">{s.dropHint}</span>
        <input type="file" accept="application/pdf,.pdf" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((e, i) => (
            <li
              key={e.id}
              draggable
              onDragStart={() => { dragIndex.current = i; }}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
              className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2"
            >
              <GripVertical className="h-4 w-4 cursor-grab text-ink-300" />
              <span className="grid h-6 w-6 place-items-center rounded bg-blue-50 text-xs font-bold text-blue-600">{i + 1}</span>
              <span className="flex-1 truncate text-sm text-ink-800">{e.file.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(e.file.size)}</span>
              <button onClick={() => remove(e.id)} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={merge} disabled={items.length < 2 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.merging : s.mergePdfs}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="merged.pdf">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> {s.downloadMerged}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
