"use client";

import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, cn } from "@/lib/utils";
import { TemplatesBar } from "@/components/tools/TemplatesBar";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    addImages: "Add JPG or PNG images",
    dropHint: "Drop here or click to choose · drag to reorder",
    fitToImage: "Fit to image",
    margin: "Margin",
    buildingPdf: "Building PDF…",
    generatePdf: "Generate PDF",
    downloadPdf: "Download PDF",
    couldNotBuild: "Could not build PDF: ",
    privacy: "Built 100% in your browser — your images are never uploaded.",
  },
  fr: {
    addImages: "Ajouter des images JPG ou PNG",
    dropHint: "Déposez ici ou cliquez pour choisir · glissez pour réordonner",
    fitToImage: "Ajuster à l'image",
    margin: "Marge",
    buildingPdf: "Création du PDF…",
    generatePdf: "Générer le PDF",
    downloadPdf: "Télécharger le PDF",
    couldNotBuild: "Impossible de créer le PDF : ",
    privacy: "Créé 100 % dans votre navigateur — vos images ne sont jamais envoyées.",
  },
  es: {
    addImages: "Añadir imágenes JPG o PNG",
    dropHint: "Suelta aquí o haz clic para elegir · arrastra para reordenar",
    fitToImage: "Ajustar a la imagen",
    margin: "Margen",
    buildingPdf: "Creando PDF…",
    generatePdf: "Generar PDF",
    downloadPdf: "Descargar PDF",
    couldNotBuild: "No se pudo crear el PDF: ",
    privacy: "Creado 100 % en tu navegador — tus imágenes nunca se suben.",
  },
  pt: {
    addImages: "Adicionar imagens JPG ou PNG",
    dropHint: "Solte aqui ou clique para escolher · arraste para reordenar",
    fitToImage: "Ajustar à imagem",
    margin: "Margem",
    buildingPdf: "Criando PDF…",
    generatePdf: "Gerar PDF",
    downloadPdf: "Baixar PDF",
    couldNotBuild: "Não foi possível criar o PDF: ",
    privacy: "Criado 100 % no seu navegador — suas imagens nunca são enviadas.",
  },
  de: {
    addImages: "JPG- oder PNG-Bilder hinzufügen",
    dropHint: "Hier ablegen oder klicken · ziehen zum Neuanordnen",
    fitToImage: "An Bild anpassen",
    margin: "Rand",
    buildingPdf: "PDF wird erstellt…",
    generatePdf: "PDF erstellen",
    downloadPdf: "PDF herunterladen",
    couldNotBuild: "PDF konnte nicht erstellt werden: ",
    privacy: "100 % im Browser erstellt — Ihre Bilder werden nie hochgeladen.",
  },
  it: {
    addImages: "Aggiungi immagini JPG o PNG",
    dropHint: "Trascina qui o clicca per scegliere · trascina per riordinare",
    fitToImage: "Adatta all'immagine",
    margin: "Margine",
    buildingPdf: "Creazione PDF…",
    generatePdf: "Genera PDF",
    downloadPdf: "Scarica PDF",
    couldNotBuild: "Impossibile creare il PDF: ",
    privacy: "Creato al 100 % nel browser — le tue immagini non vengono mai caricate.",
  },
  nl: {
    addImages: "JPG- of PNG-afbeeldingen toevoegen",
    dropHint: "Hier neerzetten of klikken om te kiezen · slepen om te herordenen",
    fitToImage: "Aanpassen aan afbeelding",
    margin: "Marge",
    buildingPdf: "PDF maken…",
    generatePdf: "PDF genereren",
    downloadPdf: "PDF downloaden",
    couldNotBuild: "PDF kon niet worden gemaakt: ",
    privacy: "100 % gemaakt in uw browser — uw afbeeldingen worden nooit geüpload.",
  },
  ja: {
    addImages: "JPGまたはPNG画像を追加",
    dropHint: "ここにドロップまたはクリックして選択 · ドラッグして並び替え",
    fitToImage: "画像に合わせる",
    margin: "余白",
    buildingPdf: "PDF作成中…",
    generatePdf: "PDFを生成",
    downloadPdf: "PDFをダウンロード",
    couldNotBuild: "PDFを作成できませんでした: ",
    privacy: "ブラウザで100%作成 — 画像はアップロードされません。",
  },
  zh: {
    addImages: "添加JPG或PNG图片",
    dropHint: "拖到此处或点击选择 · 拖拽以重新排序",
    fitToImage: "适应图片大小",
    margin: "边距",
    buildingPdf: "创建PDF中…",
    generatePdf: "生成PDF",
    downloadPdf: "下载PDF",
    couldNotBuild: "无法创建PDF：",
    privacy: "全部在您的浏览器中创建 — 图片永远不会被上传。",
  },
  ko: {
    addImages: "JPG 또는 PNG 이미지 추가",
    dropHint: "여기에 놓거나 클릭하여 선택 · 드래그하여 순서 변경",
    fitToImage: "이미지에 맞추기",
    margin: "여백",
    buildingPdf: "PDF 생성 중…",
    generatePdf: "PDF 생성",
    downloadPdf: "PDF 다운로드",
    couldNotBuild: "PDF를 만들 수 없습니다: ",
    privacy: "브라우저에서 100% 생성 — 이미지는 업로드되지 않습니다.",
  },
  ar: {
    addImages: "إضافة صور JPG أو PNG",
    dropHint: "أسقط هنا أو انقر للاختيار · اسحب لإعادة الترتيب",
    fitToImage: "ملاءمة الصورة",
    margin: "الهامش",
    buildingPdf: "جاري إنشاء PDF…",
    generatePdf: "إنشاء PDF",
    downloadPdf: "تنزيل PDF",
    couldNotBuild: "تعذّر إنشاء PDF: ",
    privacy: "يتم الإنشاء 100% في متصفحك — لن يتم تحميل صورك مطلقًا.",
  },
  ru: {
    addImages: "Добавить изображения JPG или PNG",
    dropHint: "Перетащите сюда или нажмите для выбора · перетащивайте для сортировки",
    fitToImage: "Под размер изображения",
    margin: "Поля",
    buildingPdf: "Создание PDF…",
    generatePdf: "Создать PDF",
    downloadPdf: "Скачать PDF",
    couldNotBuild: "Не удалось создать PDF: ",
    privacy: "Создано на 100% в вашем браузере — ваши изображения не загружаются.",
  },
  hi: {
    addImages: "JPG या PNG चित्र जोड़ें",
    dropHint: "यहाँ ड्रॉप करें या चुनने के लिए क्लिक करें · क्रम बदलने के लिए खींचें",
    fitToImage: "चित्र के अनुसार",
    margin: "हाशिया",
    buildingPdf: "PDF बन रहा है…",
    generatePdf: "PDF बनाएं",
    downloadPdf: "PDF डाउनलोड करें",
    couldNotBuild: "PDF नहीं बन सका: ",
    privacy: "आपके ब्राउज़र में 100% बनाया — आपके चित्र कभी अपलोड नहीं होते।",
  },
  tr: {
    addImages: "JPG veya PNG resim ekle",
    dropHint: "Buraya bırak veya seçmek için tıkla · yeniden sıralamak için sürükle",
    fitToImage: "Resme sığdır",
    margin: "Kenar boşluğu",
    buildingPdf: "PDF oluşturuluyor…",
    generatePdf: "PDF oluştur",
    downloadPdf: "PDF indir",
    couldNotBuild: "PDF oluşturulamadı: ",
    privacy: "Tarayıcınızda 100% oluşturuldu — resimleriniz hiçbir zaman yüklenmez.",
  },
  id: {
    addImages: "Tambahkan gambar JPG atau PNG",
    dropHint: "Jatuhkan di sini atau klik untuk memilih · seret untuk mengurutkan ulang",
    fitToImage: "Sesuaikan gambar",
    margin: "Margin",
    buildingPdf: "Membuat PDF…",
    generatePdf: "Buat PDF",
    downloadPdf: "Unduh PDF",
    couldNotBuild: "Gagal membuat PDF: ",
    privacy: "Dibuat 100% di browser Anda — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    addImages: "Thêm ảnh JPG hoặc PNG",
    dropHint: "Kéo vào đây hoặc nhấp để chọn · kéo để sắp xếp lại",
    fitToImage: "Vừa khít ảnh",
    margin: "Lề",
    buildingPdf: "Đang tạo PDF…",
    generatePdf: "Tạo PDF",
    downloadPdf: "Tải xuống PDF",
    couldNotBuild: "Không thể tạo PDF: ",
    privacy: "Tạo 100% trong trình duyệt — ảnh của bạn không bao giờ được tải lên.",
  },
  sv: {
    addImages: "Lägg till JPG- eller PNG-bilder",
    dropHint: "Släpp här eller klicka för att välja · dra för att ändra ordning",
    fitToImage: "Anpassa till bild",
    margin: "Marginal",
    buildingPdf: "Skapar PDF…",
    generatePdf: "Generera PDF",
    downloadPdf: "Ladda ner PDF",
    couldNotBuild: "Kunde inte skapa PDF: ",
    privacy: "Skapad 100% i din webbläsare — dina bilder laddas aldrig upp.",
  },
  pl: {
    addImages: "Dodaj obrazy JPG lub PNG",
    dropHint: "Upuść tutaj lub kliknij, aby wybrać · przeciągnij, aby zmienić kolejność",
    fitToImage: "Dopasuj do obrazu",
    margin: "Margines",
    buildingPdf: "Tworzenie PDF…",
    generatePdf: "Generuj PDF",
    downloadPdf: "Pobierz PDF",
    couldNotBuild: "Nie można utworzyć PDF: ",
    privacy: "Utworzono w 100% w Twojej przeglądarce — Twoje obrazy nigdy nie są przesyłane.",
  },
  uk: {
    addImages: "Додати зображення JPG або PNG",
    dropHint: "Перетягніть сюди або натисніть для вибору · перетягуйте для зміни порядку",
    fitToImage: "Під розмір зображення",
    margin: "Поля",
    buildingPdf: "Створення PDF…",
    generatePdf: "Створити PDF",
    downloadPdf: "Завантажити PDF",
    couldNotBuild: "Не вдалося створити PDF: ",
    privacy: "Створено на 100% у вашому браузері — ваші зображення ніколи не завантажуються.",
  },
  cs: {
    addImages: "Přidat obrázky JPG nebo PNG",
    dropHint: "Přetáhněte sem nebo klikněte pro výběr · přetáhněte pro změnu pořadí",
    fitToImage: "Přizpůsobit obrázku",
    margin: "Okraj",
    buildingPdf: "Vytváření PDF…",
    generatePdf: "Generovat PDF",
    downloadPdf: "Stáhnout PDF",
    couldNotBuild: "PDF nelze vytvořit: ",
    privacy: "Vytvořeno 100% ve vašem prohlížeči — vaše obrázky nejsou nikdy nahrávány.",
  },
};

type Entry = { id: string; file: File; previewUrl: string };

const PAGE_SIZES = [
  { id: "A4", label: "A4", width: 595.28, height: 841.89 },
  { id: "Letter", label: "Letter", width: 612, height: 792 },
  { id: "Fit", label: "fitToImage", width: 0, height: 0 },
] as const;

export function ImagesToPdfClient() {
  const s = T[useLocale()] ?? T.en;
  const [items, setItems] = useState<Entry[]>([]);
  const [pageSize, setPageSize] = useState<string>("A4");
  const [margin, setMargin] = useState<number>(20);
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);

  function add(files: FileList | null) {
    if (!files) return;
    const next: Entry[] = [];
    for (const f of Array.from(files)) {
      if (f.type === "image/jpeg" || f.type === "image/png") {
        next.push({ id: crypto.randomUUID(), file: f, previewUrl: URL.createObjectURL(f) });
      }
    }
    setItems((prev) => [...prev, ...next]);
    setResultUrl(null); setError(null);
  }
  function remove(id: string) {
    setItems((prev) => { const found = prev.find((e) => e.id === id); if (found) URL.revokeObjectURL(found.previewUrl); return prev.filter((e) => e.id !== id); });
    setResultUrl(null);
  }
  function move(from: number, to: number) {
    setItems((prev) => { const next = prev.slice(); const [it] = next.splice(from, 1); next.splice(to, 0, it); return next; });
  }

  async function generate() {
    if (items.length === 0 || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      const size = PAGE_SIZES.find((p) => p.id === pageSize)!;
      for (const { file } of items) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const img = file.type === "image/png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        let pageW: number, pageH: number;
        if (size.id === "Fit") { pageW = img.width; pageH = img.height; }
        else { pageW = size.width; pageH = size.height; }
        const page = doc.addPage([pageW, pageH]);
        if (size.id === "Fit") {
          page.drawImage(img, { x: 0, y: 0, width: pageW, height: pageH });
        } else {
          const m = margin;
          const aw = pageW - 2 * m, ah = pageH - 2 * m;
          const scale = Math.min(aw / img.width, ah / img.height);
          const w = img.width * scale, h = img.height * scale;
          page.drawImage(img, { x: (pageW - w) / 2, y: (pageH - h) / 2, width: w, height: h });
        }
      }
      const blob = new Blob([await doc.save() as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) { setError(`${s.couldNotBuild}${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <TemplatesBar
        tool="images-to-pdf"
        settings={{ pageSize, margin }}
        onApply={(settings) => {
          if (typeof settings.pageSize === "string") setPageSize(settings.pageSize);
          if (typeof settings.margin === "number") setMargin(settings.margin);
        }}
      />
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-blue-600" />
        <span className="mt-2 font-medium text-ink-900">{s.addImages}</span>
        <span className="mt-0.5 text-xs text-ink-400">{s.dropHint}</span>
        <input type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {items.map((e, i) => (
            <li
              key={e.id}
              draggable
              onDragStart={() => { dragIndex.current = i; }}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
              className="group relative rounded-lg border border-ink-100 bg-white p-2"
            >
              <div className="absolute right-1 top-1 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => remove(e.id)} className="rounded-md bg-white/90 p-1 text-ink-400 shadow hover:text-red-600"><X className="h-3 w-3" /></button>
              </div>
              <span className="absolute left-1 top-1 z-10 grid h-5 w-5 place-items-center rounded bg-blue-600 text-[10px] font-bold text-white">{i + 1}</span>
              <GripVertical className="absolute left-1 bottom-1 z-10 h-3.5 w-3.5 cursor-grab text-ink-300" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.previewUrl} alt="" className="aspect-square w-full rounded object-contain" />
              <p className="mt-1 truncate text-[11px] text-ink-500">{e.file.name} · {formatBytes(e.file.size)}</p>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {PAGE_SIZES.map((p) => (
              <button key={p.id} onClick={() => setPageSize(p.id)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", pageSize === p.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
                {p.id === "Fit" ? s.fitToImage : p.label}
              </button>
            ))}
          </div>
          {pageSize !== "Fit" && (
            <label className="flex items-center gap-2 text-sm text-ink-600">
              {s.margin}
              <input type="number" min={0} max={120} value={margin} onChange={(e) => setMargin(Number(e.target.value) || 0)} className="w-20 rounded-md border border-ink-200 bg-white px-2 py-1 text-sm" />
              pt
            </label>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={generate} disabled={items.length === 0 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.buildingPdf : s.generatePdf}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="images.pdf">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> {s.downloadPdf}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
