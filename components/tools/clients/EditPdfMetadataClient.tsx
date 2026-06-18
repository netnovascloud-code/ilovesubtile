"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, X, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropPdf: "Drop your PDF",
    dropHint: "Edit the document title, author, subject and keywords.",
    choosePdf: "Choose PDF",
    fieldTitle: "Title",
    fieldAuthor: "Author",
    fieldSubject: "Subject",
    fieldKeywords: "Keywords (comma-separated)",
    fieldCreator: "Creator (app that authored it)",
    fieldProducer: "Producer (engine)",
    saving: "Saving…",
    saveBtn: "Save updated PDF",
    download: "Download",
    privacy: "Edit happens entirely in your browser via pdf-lib — the PDF is never uploaded.",
    couldNotRead: "Could not read this PDF.",
    couldNotSave: "Could not save PDF.",
  },
  fr: {
    dropPdf: "Déposez votre PDF",
    dropHint: "Modifiez le titre, l'auteur, le sujet et les mots-clés du document.",
    choosePdf: "Choisir un PDF",
    fieldTitle: "Titre",
    fieldAuthor: "Auteur",
    fieldSubject: "Sujet",
    fieldKeywords: "Mots-clés (séparés par des virgules)",
    fieldCreator: "Créateur (application auteure)",
    fieldProducer: "Producteur (moteur)",
    saving: "Enregistrement…",
    saveBtn: "Enregistrer le PDF mis à jour",
    download: "Télécharger",
    privacy: "La modification se fait entièrement dans votre navigateur via pdf-lib — le PDF n'est jamais téléversé.",
    couldNotRead: "Impossible de lire ce PDF.",
    couldNotSave: "Impossible d'enregistrer le PDF.",
  },
  es: {
    dropPdf: "Suelta tu PDF",
    dropHint: "Edita el título, autor, asunto y palabras clave del documento.",
    choosePdf: "Elegir PDF",
    fieldTitle: "Título",
    fieldAuthor: "Autor",
    fieldSubject: "Asunto",
    fieldKeywords: "Palabras clave (separadas por comas)",
    fieldCreator: "Creador (app que lo creó)",
    fieldProducer: "Productor (motor)",
    saving: "Guardando…",
    saveBtn: "Guardar PDF actualizado",
    download: "Descargar",
    privacy: "La edición ocurre completamente en tu navegador mediante pdf-lib — el PDF nunca se sube.",
    couldNotRead: "No se pudo leer este PDF.",
    couldNotSave: "No se pudo guardar el PDF.",
  },
  pt: {
    dropPdf: "Solte o seu PDF",
    dropHint: "Edite o título, autor, assunto e palavras-chave do documento.",
    choosePdf: "Escolher PDF",
    fieldTitle: "Título",
    fieldAuthor: "Autor",
    fieldSubject: "Assunto",
    fieldKeywords: "Palavras-chave (separadas por vírgula)",
    fieldCreator: "Criador (aplicação que o criou)",
    fieldProducer: "Produtor (motor)",
    saving: "A guardar…",
    saveBtn: "Guardar PDF atualizado",
    download: "Transferir",
    privacy: "A edição ocorre totalmente no seu navegador via pdf-lib — o PDF nunca é enviado.",
    couldNotRead: "Não foi possível ler este PDF.",
    couldNotSave: "Não foi possível guardar o PDF.",
  },
  de: {
    dropPdf: "PDF hier ablegen",
    dropHint: "Bearbeiten Sie Titel, Autor, Betreff und Stichwörter des Dokuments.",
    choosePdf: "PDF auswählen",
    fieldTitle: "Titel",
    fieldAuthor: "Autor",
    fieldSubject: "Betreff",
    fieldKeywords: "Stichwörter (kommagetrennt)",
    fieldCreator: "Ersteller (erstellende App)",
    fieldProducer: "Produzent (Engine)",
    saving: "Speichern…",
    saveBtn: "Aktualisiertes PDF speichern",
    download: "Herunterladen",
    privacy: "Die Bearbeitung erfolgt vollständig in Ihrem Browser über pdf-lib — das PDF wird niemals hochgeladen.",
    couldNotRead: "Diese PDF konnte nicht gelesen werden.",
    couldNotSave: "Das PDF konnte nicht gespeichert werden.",
  },
  it: {
    dropPdf: "Trascina il tuo PDF",
    dropHint: "Modifica titolo, autore, argomento e parole chiave del documento.",
    choosePdf: "Scegli PDF",
    fieldTitle: "Titolo",
    fieldAuthor: "Autore",
    fieldSubject: "Argomento",
    fieldKeywords: "Parole chiave (separate da virgola)",
    fieldCreator: "Creatore (app che lo ha creato)",
    fieldProducer: "Produttore (motore)",
    saving: "Salvataggio…",
    saveBtn: "Salva PDF aggiornato",
    download: "Scarica",
    privacy: "La modifica avviene interamente nel browser tramite pdf-lib — il PDF non viene mai caricato.",
    couldNotRead: "Impossibile leggere questo PDF.",
    couldNotSave: "Impossibile salvare il PDF.",
  },
  nl: {
    dropPdf: "Sleep uw PDF hiernaartoe",
    dropHint: "Bewerk de titel, auteur, onderwerp en trefwoorden van het document.",
    choosePdf: "PDF kiezen",
    fieldTitle: "Titel",
    fieldAuthor: "Auteur",
    fieldSubject: "Onderwerp",
    fieldKeywords: "Trefwoorden (kommagescheiden)",
    fieldCreator: "Maker (app die het heeft gemaakt)",
    fieldProducer: "Producent (engine)",
    saving: "Opslaan…",
    saveBtn: "Bijgewerkte PDF opslaan",
    download: "Downloaden",
    privacy: "De bewerking vindt volledig in uw browser plaats via pdf-lib — de PDF wordt nooit geüpload.",
    couldNotRead: "Kan dit PDF-bestand niet lezen.",
    couldNotSave: "Kan het PDF-bestand niet opslaan.",
  },
  ja: {
    dropPdf: "PDFをドロップ",
    dropHint: "ドキュメントのタイトル、著者、主題、キーワードを編集します。",
    choosePdf: "PDFを選択",
    fieldTitle: "タイトル",
    fieldAuthor: "著者",
    fieldSubject: "主題",
    fieldKeywords: "キーワード（カンマ区切り）",
    fieldCreator: "作成者（作成したアプリ）",
    fieldProducer: "プロデューサー（エンジン）",
    saving: "保存中…",
    saveBtn: "更新されたPDFを保存",
    download: "ダウンロード",
    privacy: "編集はpdf-libを通じてブラウザ内で完全に行われます — PDFはアップロードされません。",
    couldNotRead: "このPDFを読み込めませんでした。",
    couldNotSave: "PDFを保存できませんでした。",
  },
  zh: {
    dropPdf: "将PDF拖放至此",
    dropHint: "编辑文档的标题、作者、主题和关键字。",
    choosePdf: "选择PDF",
    fieldTitle: "标题",
    fieldAuthor: "作者",
    fieldSubject: "主题",
    fieldKeywords: "关键字（逗号分隔）",
    fieldCreator: "创建者（创建应用）",
    fieldProducer: "生产者（引擎）",
    saving: "正在保存…",
    saveBtn: "保存更新的PDF",
    download: "下载",
    privacy: "编辑完全在您的浏览器中通过pdf-lib完成 — PDF永远不会上传。",
    couldNotRead: "无法读取此PDF。",
    couldNotSave: "无法保存PDF。",
  },
  ko: {
    dropPdf: "PDF를 여기에 놓으세요",
    dropHint: "문서 제목, 저자, 주제 및 키워드를 편집합니다.",
    choosePdf: "PDF 선택",
    fieldTitle: "제목",
    fieldAuthor: "저자",
    fieldSubject: "주제",
    fieldKeywords: "키워드 (쉼표로 구분)",
    fieldCreator: "작성자 (작성 앱)",
    fieldProducer: "생성자 (엔진)",
    saving: "저장 중…",
    saveBtn: "업데이트된 PDF 저장",
    download: "다운로드",
    privacy: "편집은 pdf-lib를 통해 완전히 브라우저 내에서 이루어집니다 — PDF는 업로드되지 않습니다.",
    couldNotRead: "이 PDF를 읽을 수 없습니다.",
    couldNotSave: "PDF를 저장할 수 없습니다.",
  },
  ar: {
    dropPdf: "أفلت PDF هنا",
    dropHint: "عدّل عنوان المستند والمؤلف والموضوع والكلمات المفتاحية.",
    choosePdf: "اختيار PDF",
    fieldTitle: "العنوان",
    fieldAuthor: "المؤلف",
    fieldSubject: "الموضوع",
    fieldKeywords: "الكلمات المفتاحية (مفصولة بفواصل)",
    fieldCreator: "المنشئ (التطبيق الذي أنشأه)",
    fieldProducer: "المحرك",
    saving: "جاري الحفظ…",
    saveBtn: "حفظ PDF المحدَّث",
    download: "تنزيل",
    privacy: "يتم التعديل بالكامل في متصفحك عبر pdf-lib — لا يُرفع PDF أبداً.",
    couldNotRead: "تعذر قراءة هذا PDF.",
    couldNotSave: "تعذر حفظ PDF.",
  },
  ru: {
    dropPdf: "Перетащите PDF сюда",
    dropHint: "Редактируйте заголовок, автора, тему и ключевые слова документа.",
    choosePdf: "Выбрать PDF",
    fieldTitle: "Заголовок",
    fieldAuthor: "Автор",
    fieldSubject: "Тема",
    fieldKeywords: "Ключевые слова (через запятую)",
    fieldCreator: "Создатель (приложение-автор)",
    fieldProducer: "Производитель (движок)",
    saving: "Сохранение…",
    saveBtn: "Сохранить обновлённый PDF",
    download: "Скачать",
    privacy: "Редактирование происходит полностью в вашем браузере через pdf-lib — PDF никогда не загружается.",
    couldNotRead: "Не удалось прочитать PDF.",
    couldNotSave: "Не удалось сохранить PDF.",
  },
  hi: {
    dropPdf: "PDF यहाँ छोड़ें",
    dropHint: "दस्तावेज़ का शीर्षक, लेखक, विषय और कीवर्ड संपादित करें।",
    choosePdf: "PDF चुनें",
    fieldTitle: "शीर्षक",
    fieldAuthor: "लेखक",
    fieldSubject: "विषय",
    fieldKeywords: "कीवर्ड (अल्पविराम से अलग)",
    fieldCreator: "निर्माता (जिस ऐप ने बनाया)",
    fieldProducer: "प्रोड्यूसर (इंजन)",
    saving: "सहेजा जा रहा है…",
    saveBtn: "अपडेटेड PDF सहेजें",
    download: "डाउनलोड",
    privacy: "संपादन पूरी तरह से आपके ब्राउज़र में pdf-lib के माध्यम से होता है — PDF कभी अपलोड नहीं होता।",
    couldNotRead: "इस PDF को पढ़ने में असमर्थ।",
    couldNotSave: "PDF सहेजने में असमर्थ।",
  },
  tr: {
    dropPdf: "PDF'nizi buraya bırakın",
    dropHint: "Belgenin başlığını, yazarını, konusunu ve anahtar kelimelerini düzenleyin.",
    choosePdf: "PDF Seç",
    fieldTitle: "Başlık",
    fieldAuthor: "Yazar",
    fieldSubject: "Konu",
    fieldKeywords: "Anahtar kelimeler (virgülle ayrılmış)",
    fieldCreator: "Oluşturucu (oluşturan uygulama)",
    fieldProducer: "Üretici (motor)",
    saving: "Kaydediliyor…",
    saveBtn: "Güncellenmiş PDF'yi kaydet",
    download: "İndir",
    privacy: "Düzenleme tamamen tarayıcınızda pdf-lib aracılığıyla gerçekleşir — PDF hiçbir zaman yüklenmez.",
    couldNotRead: "Bu PDF okunamadı.",
    couldNotSave: "PDF kaydedilemedi.",
  },
  id: {
    dropPdf: "Letakkan PDF Anda di sini",
    dropHint: "Edit judul, penulis, subjek, dan kata kunci dokumen.",
    choosePdf: "Pilih PDF",
    fieldTitle: "Judul",
    fieldAuthor: "Penulis",
    fieldSubject: "Subjek",
    fieldKeywords: "Kata kunci (dipisahkan koma)",
    fieldCreator: "Pembuat (aplikasi yang membuatnya)",
    fieldProducer: "Produsen (mesin)",
    saving: "Menyimpan…",
    saveBtn: "Simpan PDF yang diperbarui",
    download: "Unduh",
    privacy: "Pengeditan sepenuhnya dilakukan di browser Anda melalui pdf-lib — PDF tidak pernah diunggah.",
    couldNotRead: "Tidak dapat membaca PDF ini.",
    couldNotSave: "Tidak dapat menyimpan PDF.",
  },
  vi: {
    dropPdf: "Kéo thả PDF vào đây",
    dropHint: "Chỉnh sửa tiêu đề, tác giả, chủ đề và từ khóa của tài liệu.",
    choosePdf: "Chọn PDF",
    fieldTitle: "Tiêu đề",
    fieldAuthor: "Tác giả",
    fieldSubject: "Chủ đề",
    fieldKeywords: "Từ khóa (phân cách bằng dấu phẩy)",
    fieldCreator: "Người tạo (ứng dụng tạo ra)",
    fieldProducer: "Nhà sản xuất (bộ máy)",
    saving: "Đang lưu…",
    saveBtn: "Lưu PDF đã cập nhật",
    download: "Tải xuống",
    privacy: "Chỉnh sửa hoàn toàn trong trình duyệt của bạn qua pdf-lib — PDF không bao giờ được tải lên.",
    couldNotRead: "Không thể đọc PDF này.",
    couldNotSave: "Không thể lưu PDF.",
  },
  sv: {
    dropPdf: "Släpp din PDF här",
    dropHint: "Redigera dokumentets titel, författare, ämne och nyckelord.",
    choosePdf: "Välj PDF",
    fieldTitle: "Titel",
    fieldAuthor: "Författare",
    fieldSubject: "Ämne",
    fieldKeywords: "Nyckelord (kommaseparerade)",
    fieldCreator: "Skapare (appen som skapade det)",
    fieldProducer: "Producent (motor)",
    saving: "Sparar…",
    saveBtn: "Spara uppdaterad PDF",
    download: "Ladda ner",
    privacy: "Redigering sker helt i din webbläsare via pdf-lib — PDF:en laddas aldrig upp.",
    couldNotRead: "Kunde inte läsa denna PDF.",
    couldNotSave: "Kunde inte spara PDF:en.",
  },
  pl: {
    dropPdf: "Upuść plik PDF tutaj",
    dropHint: "Edytuj tytuł, autora, temat i słowa kluczowe dokumentu.",
    choosePdf: "Wybierz PDF",
    fieldTitle: "Tytuł",
    fieldAuthor: "Autor",
    fieldSubject: "Temat",
    fieldKeywords: "Słowa kluczowe (oddzielone przecinkami)",
    fieldCreator: "Twórca (aplikacja, która go stworzyła)",
    fieldProducer: "Producent (silnik)",
    saving: "Zapisywanie…",
    saveBtn: "Zapisz zaktualizowany PDF",
    download: "Pobierz",
    privacy: "Edycja odbywa się w całości w przeglądarce za pośrednictwem pdf-lib — PDF nigdy nie jest przesyłany.",
    couldNotRead: "Nie można odczytać tego pliku PDF.",
    couldNotSave: "Nie można zapisać pliku PDF.",
  },
  uk: {
    dropPdf: "Перетягніть PDF сюди",
    dropHint: "Редагуйте заголовок, автора, тему та ключові слова документа.",
    choosePdf: "Вибрати PDF",
    fieldTitle: "Заголовок",
    fieldAuthor: "Автор",
    fieldSubject: "Тема",
    fieldKeywords: "Ключові слова (через кому)",
    fieldCreator: "Творець (застосунок-автор)",
    fieldProducer: "Виробник (двигун)",
    saving: "Збереження…",
    saveBtn: "Зберегти оновлений PDF",
    download: "Завантажити",
    privacy: "Редагування відбувається повністю у вашому браузері через pdf-lib — PDF ніколи не завантажується.",
    couldNotRead: "Не вдалося прочитати цей PDF.",
    couldNotSave: "Не вдалося зберегти PDF.",
  },
  cs: {
    dropPdf: "Přetažite PDF sem",
    dropHint: "Upravte název, autora, předmět a klíčová slova dokumentu.",
    choosePdf: "Vybrat PDF",
    fieldTitle: "Název",
    fieldAuthor: "Autor",
    fieldSubject: "Předmět",
    fieldKeywords: "Klíčová slova (oddělená čárkami)",
    fieldCreator: "Tvůrce (aplikace, která ho vytvořila)",
    fieldProducer: "Producent (engine)",
    saving: "Ukládání…",
    saveBtn: "Uložit aktualizovaný PDF",
    download: "Stáhnout",
    privacy: "Úpravy probíhají zcela ve vašem prohlížeči pomocí pdf-lib — PDF se nikdy nenahrává.",
    couldNotRead: "Tento PDF nelze přečíst.",
    couldNotSave: "PDF nelze uložit.",
  },
};

// Edit the seven standard PDF info fields (title, author, subject, keywords,
// creator, producer, creation date). Reads the current values on upload so
// the form starts pre-populated.
type Meta = {
  title: string; author: string; subject: string; keywords: string;
  creator: string; producer: string;
};
const EMPTY: Meta = { title: "", author: "", subject: "", keywords: "", creator: "", producer: "" };

export function EditPdfMetadataClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);

  const onFile = useCallback(async (f: File) => {
    setError(null); setOut(null); setFile(f);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setMeta({
        title: doc.getTitle() ?? "",
        author: doc.getAuthor() ?? "",
        subject: doc.getSubject() ?? "",
        // pdf-lib returns Keywords as a string[] in newer versions; coerce.
        keywords: ([] as string[]).concat(doc.getKeywords() ?? []).join(", "),
        creator: doc.getCreator() ?? "",
        producer: doc.getProducer() ?? "",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotRead);
    }
  }, [s]);

  const save = useCallback(async () => {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(meta.keywords.split(",").map((st) => st.trim()).filter(Boolean));
      doc.setCreator(meta.creator);
      doc.setProducer(meta.producer);
      doc.setModificationDate(new Date());
      const bytes = await doc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotSave);
    } finally {
      setBusy(false);
    }
  }, [file, meta, out, s]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setMeta(EMPTY); setOut(null); setError(null);
  };

  const FIELDS: [keyof Meta, string][] = [
    ["title", s.fieldTitle],
    ["author", s.fieldAuthor],
    ["subject", s.fieldSubject],
    ["keywords", s.fieldKeywords],
    ["creator", s.fieldCreator],
    ["producer", s.fieldProducer],
  ];

  if (!file) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">{s.dropPdf}</div>
        <div className="text-sm text-ink-500">{s.dropHint}</div>
        <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{s.choosePdf}</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name}</div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(([k, label]) => (
          <label key={k} className="flex flex-col text-xs font-medium text-ink-600">
            {label}
            <input value={meta[k]} onChange={(e) => setMeta({ ...meta, [k]: e.target.value })}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={save} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{s.saving}</> : s.saveBtn}
        </Button>
        {out && (
          <a href={out.url} download={`metadata-${file.name}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
