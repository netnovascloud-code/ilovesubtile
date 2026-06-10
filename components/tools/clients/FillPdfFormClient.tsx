"use client";

import { useState } from "react";
import { Upload, Download, X, Loader2, FormInput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

/**
 * Fill PDF Form — 100% in-browser via pdf-lib's AcroForm API.
 * Detects every form field in the uploaded PDF, renders an input per field,
 * then saves a flattened PDF (no editable fields left). Supports text,
 * checkbox, radio and dropdown fields — the four common AcroForm types.
 *
 * If the PDF has no form fields (e.g. a flat scan), we surface that clearly
 * so the user goes to /sign-pdf instead.
 */

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload your fillable PDF",
    uploadHint: "Any PDF with AcroForm fields — stays in your browser",
    field: "field",
    fields: "fields",
    checked: "Checked",
    chooseOption: "— choose —",
    flattenLabel: "Flatten the form (no editable fields left in the saved PDF)",
    saving: "Saving…",
    saveFilled: "Save filled PDF",
    download: "Download",
    privacy: "Reads and writes AcroForm fields (text, checkbox, radio, dropdown). Nothing is uploaded — your PDF stays on this device.",
    noFields: "No fillable form fields were found in this PDF. Use Sign PDF to add a signature instead.",
    couldNotRead: "Couldn't read that PDF.",
    couldNotSave: "Couldn't save the filled PDF.",
  },
  fr: {
    uploadLabel: "Téléverser votre PDF à remplir",
    uploadHint: "Tout PDF avec des champs AcroForm — reste dans votre navigateur",
    field: "champ",
    fields: "champs",
    checked: "Coché",
    chooseOption: "— choisir —",
    flattenLabel: "Aplatir le formulaire (aucun champ modifiable dans le PDF sauvegardé)",
    saving: "Enregistrement…",
    saveFilled: "Enregistrer le PDF rempli",
    download: "Télécharger",
    privacy: "Lit et écrit les champs AcroForm (texte, case à cocher, radio, liste déroulante). Rien n'est téléversé — votre PDF reste sur cet appareil.",
    noFields: "Aucun champ de formulaire à remplir n'a été trouvé dans ce PDF. Utilisez Signer PDF pour ajouter une signature à la place.",
    couldNotRead: "Impossible de lire ce PDF.",
    couldNotSave: "Impossible d'enregistrer le PDF rempli.",
  },
  es: {
    uploadLabel: "Sube tu PDF rellenable",
    uploadHint: "Cualquier PDF con campos AcroForm — se queda en tu navegador",
    field: "campo",
    fields: "campos",
    checked: "Marcado",
    chooseOption: "— elegir —",
    flattenLabel: "Aplanar el formulario (sin campos editables en el PDF guardado)",
    saving: "Guardando…",
    saveFilled: "Guardar PDF relleno",
    download: "Descargar",
    privacy: "Lee y escribe campos AcroForm (texto, casilla de verificación, radio, desplegable). Nada se sube — tu PDF permanece en este dispositivo.",
    noFields: "No se encontraron campos de formulario rellenables en este PDF. Usa Firmar PDF para agregar una firma.",
    couldNotRead: "No se pudo leer ese PDF.",
    couldNotSave: "No se pudo guardar el PDF relleno.",
  },
  pt: {
    uploadLabel: "Carregue o seu PDF preenchível",
    uploadHint: "Qualquer PDF com campos AcroForm — fica no seu navegador",
    field: "campo",
    fields: "campos",
    checked: "Marcado",
    chooseOption: "— escolher —",
    flattenLabel: "Achatar o formulário (sem campos editáveis no PDF guardado)",
    saving: "A guardar…",
    saveFilled: "Guardar PDF preenchido",
    download: "Transferir",
    privacy: "Lê e escreve campos AcroForm (texto, caixa de seleção, rádio, lista suspensa). Nada é enviado — o seu PDF permanece neste dispositivo.",
    noFields: "Não foram encontrados campos de formulário preenchíveis neste PDF. Use Assinar PDF para adicionar uma assinatura.",
    couldNotRead: "Não foi possível ler esse PDF.",
    couldNotSave: "Não foi possível guardar o PDF preenchido.",
  },
  de: {
    uploadLabel: "Ausfüllbares PDF hochladen",
    uploadHint: "Jede PDF mit AcroForm-Feldern — bleibt in Ihrem Browser",
    field: "Feld",
    fields: "Felder",
    checked: "Angehakt",
    chooseOption: "— auswählen —",
    flattenLabel: "Formular reduzieren (keine bearbeitbaren Felder im gespeicherten PDF)",
    saving: "Speichern…",
    saveFilled: "Ausgefülltes PDF speichern",
    download: "Herunterladen",
    privacy: "Liest und schreibt AcroForm-Felder (Text, Kontrollkästchen, Radio, Dropdown). Es wird nichts hochgeladen — Ihre PDF bleibt auf diesem Gerät.",
    noFields: "In dieser PDF wurden keine ausfüllbaren Formularfelder gefunden. Verwenden Sie PDF signieren, um stattdessen eine Unterschrift hinzuzufügen.",
    couldNotRead: "Diese PDF konnte nicht gelesen werden.",
    couldNotSave: "Das ausgefüllte PDF konnte nicht gespeichert werden.",
  },
  it: {
    uploadLabel: "Carica il tuo PDF compilabile",
    uploadHint: "Qualsiasi PDF con campi AcroForm — rimane nel tuo browser",
    field: "campo",
    fields: "campi",
    checked: "Selezionato",
    chooseOption: "— scegli —",
    flattenLabel: "Appiattire il modulo (nessun campo modificabile nel PDF salvato)",
    saving: "Salvataggio…",
    saveFilled: "Salva PDF compilato",
    download: "Scarica",
    privacy: "Legge e scrive campi AcroForm (testo, casella di controllo, radio, menu a discesa). Niente viene caricato — il tuo PDF rimane su questo dispositivo.",
    noFields: "In questo PDF non sono stati trovati campi modulo compilabili. Usa Firma PDF per aggiungere una firma.",
    couldNotRead: "Impossibile leggere quel PDF.",
    couldNotSave: "Impossibile salvare il PDF compilato.",
  },
  nl: {
    uploadLabel: "Uw invulbaar PDF uploaden",
    uploadHint: "Elke PDF met AcroForm-velden — blijft in uw browser",
    field: "veld",
    fields: "velden",
    checked: "Aangevinkt",
    chooseOption: "— kies —",
    flattenLabel: "Formulier samenvoegen (geen bewerkbare velden in het opgeslagen PDF)",
    saving: "Opslaan…",
    saveFilled: "Ingevuld PDF opslaan",
    download: "Downloaden",
    privacy: "Leest en schrijft AcroForm-velden (tekst, selectievakje, radio, dropdown). Er wordt niets geüpload — uw PDF blijft op dit apparaat.",
    noFields: "Er zijn geen invulbare formuliervelden gevonden in dit PDF. Gebruik PDF ondertekenen om een handtekening toe te voegen.",
    couldNotRead: "Kan dat PDF-bestand niet lezen.",
    couldNotSave: "Kan het ingevulde PDF-bestand niet opslaan.",
  },
  ja: {
    uploadLabel: "入力可能なPDFをアップロード",
    uploadHint: "AcroFormフィールドを含むPDF — ブラウザ内に保持",
    field: "フィールド",
    fields: "フィールド",
    checked: "チェック済み",
    chooseOption: "— 選択 —",
    flattenLabel: "フォームをフラット化（保存したPDFに編集可能フィールドを残さない）",
    saving: "保存中…",
    saveFilled: "入力済みPDFを保存",
    download: "ダウンロード",
    privacy: "AcroFormフィールド（テキスト、チェックボックス、ラジオ、ドロップダウン）の読み書きをします。何もアップロードされません — PDFはこのデバイスに留まります。",
    noFields: "このPDFには入力可能なフォームフィールドが見つかりませんでした。署名を追加するにはPDF署名を使用してください。",
    couldNotRead: "そのPDFを読み込めませんでした。",
    couldNotSave: "入力済みPDFを保存できませんでした。",
  },
  zh: {
    uploadLabel: "上传可填写的PDF",
    uploadHint: "任何带有AcroForm字段的PDF — 保留在您的浏览器中",
    field: "字段",
    fields: "字段",
    checked: "已勾选",
    chooseOption: "— 选择 —",
    flattenLabel: "展平表单（保存的PDF中不留可编辑字段）",
    saving: "正在保存…",
    saveFilled: "保存已填写的PDF",
    download: "下载",
    privacy: "读取和写入AcroForm字段（文本、复选框、单选、下拉列表）。不上传任何内容 — PDF保留在此设备上。",
    noFields: "在此PDF中未找到可填写的表单字段。请使用签署PDF添加签名。",
    couldNotRead: "无法读取该PDF。",
    couldNotSave: "无法保存已填写的PDF。",
  },
  ko: {
    uploadLabel: "입력 가능한 PDF 업로드",
    uploadHint: "AcroForm 필드가 있는 PDF — 브라우저에 유지",
    field: "필드",
    fields: "필드",
    checked: "체크됨",
    chooseOption: "— 선택 —",
    flattenLabel: "양식 병합 (저장된 PDF에 편집 가능한 필드 없음)",
    saving: "저장 중…",
    saveFilled: "작성된 PDF 저장",
    download: "다운로드",
    privacy: "AcroForm 필드(텍스트, 체크박스, 라디오, 드롭다운)를 읽고 씁니다. 아무것도 업로드되지 않습니다 — PDF는 이 기기에 유지됩니다.",
    noFields: "이 PDF에서 입력 가능한 양식 필드를 찾을 수 없습니다. PDF 서명을 사용하여 서명을 추가하세요.",
    couldNotRead: "해당 PDF를 읽을 수 없습니다.",
    couldNotSave: "작성된 PDF를 저장할 수 없습니다.",
  },
  ar: {
    uploadLabel: "ارفع PDF القابل للملء",
    uploadHint: "أي PDF بحقول AcroForm — يبقى في متصفحك",
    field: "حقل",
    fields: "حقول",
    checked: "محدد",
    chooseOption: "— اختر —",
    flattenLabel: "تسوية النموذج (بدون حقول قابلة للتعديل في PDF المحفوظ)",
    saving: "جاري الحفظ…",
    saveFilled: "حفظ PDF المملوء",
    download: "تنزيل",
    privacy: "يقرأ ويكتب حقول AcroForm (نص، خانة اختيار، راديو، قائمة منسدلة). لا يُرفع أي شيء — يبقى PDF على هذا الجهاز.",
    noFields: "لم يتم العثور على حقول نموذج قابلة للملء في هذا PDF. استخدم توقيع PDF لإضافة توقيع بدلاً من ذلك.",
    couldNotRead: "تعذر قراءة هذا PDF.",
    couldNotSave: "تعذر حفظ PDF المملوء.",
  },
  ru: {
    uploadLabel: "Загрузить заполняемый PDF",
    uploadHint: "Любой PDF с полями AcroForm — остаётся в вашем браузере",
    field: "поле",
    fields: "полей",
    checked: "Отмечено",
    chooseOption: "— выбрать —",
    flattenLabel: "Свернуть форму (без редактируемых полей в сохранённом PDF)",
    saving: "Сохранение…",
    saveFilled: "Сохранить заполненный PDF",
    download: "Скачать",
    privacy: "Читает и записывает поля AcroForm (текст, флажок, переключатель, выпадающий список). Ничего не загружается — ваш PDF остаётся на устройстве.",
    noFields: "В этом PDF не найдено заполняемых полей формы. Используйте «Подписать PDF», чтобы добавить подпись.",
    couldNotRead: "Не удалось прочитать этот PDF.",
    couldNotSave: "Не удалось сохранить заполненный PDF.",
  },
  hi: {
    uploadLabel: "अपना भरने योग्य PDF अपलोड करें",
    uploadHint: "AcroForm फ़ील्ड वाला कोई भी PDF — ब्राउज़र में रहता है",
    field: "फ़ील्ड",
    fields: "फ़ील्ड",
    checked: "चेक किया गया",
    chooseOption: "— चुनें —",
    flattenLabel: "फ़ॉर्म समतल करें (सहेजे गए PDF में कोई संपादन योग्य फ़ील्ड नहीं)",
    saving: "सहेजा जा रहा है…",
    saveFilled: "भरा हुआ PDF सहेजें",
    download: "डाउनलोड",
    privacy: "AcroForm फ़ील्ड (टेक्स्ट, चेकबॉक्स, रेडियो, ड्रॉपडाउन) पढ़ता और लिखता है। कुछ भी अपलोड नहीं होता — आपका PDF इस डिवाइस पर रहता है।",
    noFields: "इस PDF में कोई भरने योग्य फ़ॉर्म फ़ील्ड नहीं मिले। इसके बजाय हस्ताक्षर जोड़ने के लिए PDF हस्ताक्षर का उपयोग करें।",
    couldNotRead: "वह PDF पढ़ने में असमर्थ।",
    couldNotSave: "भरा हुआ PDF सहेजने में असमर्थ।",
  },
  tr: {
    uploadLabel: "Doldurulabilir PDF'nizi yükleyin",
    uploadHint: "AcroForm alanları olan herhangi bir PDF — tarayıcınızda kalır",
    field: "alan",
    fields: "alan",
    checked: "İşaretli",
    chooseOption: "— seç —",
    flattenLabel: "Formu düzleştir (kaydedilen PDF'de düzenlenebilir alan kalmaz)",
    saving: "Kaydediliyor…",
    saveFilled: "Doldurulmuş PDF'yi kaydet",
    download: "İndir",
    privacy: "AcroForm alanlarını (metin, onay kutusu, radyo, açılır menü) okur ve yazar. Hiçbir şey yüklenmez — PDF'niz bu cihazda kalır.",
    noFields: "Bu PDF'de doldurulabilir form alanı bulunamadı. Bunun yerine imza eklemek için PDF İmzala'yı kullanın.",
    couldNotRead: "O PDF okunamadı.",
    couldNotSave: "Doldurulmuş PDF kaydedilemedi.",
  },
  id: {
    uploadLabel: "Unggah PDF yang dapat diisi",
    uploadHint: "PDF apa pun dengan kolom AcroForm — tetap di browser Anda",
    field: "kolom",
    fields: "kolom",
    checked: "Dicentang",
    chooseOption: "— pilih —",
    flattenLabel: "Ratakan formulir (tidak ada kolom yang dapat diedit di PDF yang disimpan)",
    saving: "Menyimpan…",
    saveFilled: "Simpan PDF yang telah diisi",
    download: "Unduh",
    privacy: "Membaca dan menulis kolom AcroForm (teks, kotak centang, radio, dropdown). Tidak ada yang diunggah — PDF Anda tetap di perangkat ini.",
    noFields: "Tidak ditemukan kolom formulir yang dapat diisi di PDF ini. Gunakan Tanda Tangani PDF untuk menambahkan tanda tangan.",
    couldNotRead: "Tidak dapat membaca PDF tersebut.",
    couldNotSave: "Tidak dapat menyimpan PDF yang telah diisi.",
  },
  vi: {
    uploadLabel: "Tải lên PDF có thể điền",
    uploadHint: "Bất kỳ PDF nào có trường AcroForm — lưu trong trình duyệt của bạn",
    field: "trường",
    fields: "trường",
    checked: "Đã chọn",
    chooseOption: "— chọn —",
    flattenLabel: "Làm phẳng biểu mẫu (không còn trường có thể chỉnh sửa trong PDF đã lưu)",
    saving: "Đang lưu…",
    saveFilled: "Lưu PDF đã điền",
    download: "Tải xuống",
    privacy: "Đọc và ghi các trường AcroForm (văn bản, hộp kiểm, radio, dropdown). Không có gì được tải lên — PDF của bạn ở lại trên thiết bị này.",
    noFields: "Không tìm thấy trường biểu mẫu có thể điền trong PDF này. Hãy dùng Ký PDF để thêm chữ ký.",
    couldNotRead: "Không thể đọc PDF đó.",
    couldNotSave: "Không thể lưu PDF đã điền.",
  },
  sv: {
    uploadLabel: "Ladda upp ditt ifyllningsbara PDF",
    uploadHint: "Vilken PDF som helst med AcroForm-fält — stannar i din webbläsare",
    field: "fält",
    fields: "fält",
    checked: "Ikryssad",
    chooseOption: "— välj —",
    flattenLabel: "Platta till formuläret (inga redigerbara fält kvar i den sparade PDF:en)",
    saving: "Sparar…",
    saveFilled: "Spara ifylld PDF",
    download: "Ladda ner",
    privacy: "Läser och skriver AcroForm-fält (text, kryssruta, radio, dropdown). Ingenting laddas upp — din PDF stannar på den här enheten.",
    noFields: "Inga ifyllningsbara formulärfält hittades i denna PDF. Använd Signera PDF för att lägga till en signatur istället.",
    couldNotRead: "Kunde inte läsa den PDF:en.",
    couldNotSave: "Kunde inte spara den ifyllda PDF:en.",
  },
  pl: {
    uploadLabel: "Prześlij wypełnialny plik PDF",
    uploadHint: "Dowolny PDF z polami AcroForm — pozostaje w przeglądarce",
    field: "pole",
    fields: "pól",
    checked: "Zaznaczono",
    chooseOption: "— wybierz —",
    flattenLabel: "Spłaszcz formularz (brak edytowalnych pól w zapisanym PDF)",
    saving: "Zapisywanie…",
    saveFilled: "Zapisz wypełniony PDF",
    download: "Pobierz",
    privacy: "Odczytuje i zapisuje pola AcroForm (tekst, pole wyboru, radio, lista rozwijana). Nic nie jest przesyłane — PDF pozostaje na tym urządzeniu.",
    noFields: "W tym pliku PDF nie znaleziono wypełnialnych pól formularza. Użyj opcji Podpisz PDF, aby dodać podpis.",
    couldNotRead: "Nie można odczytać tego PDF.",
    couldNotSave: "Nie można zapisać wypełnionego PDF.",
  },
  uk: {
    uploadLabel: "Завантажте PDF для заповнення",
    uploadHint: "Будь-який PDF з полями AcroForm — залишається у вашому браузері",
    field: "поле",
    fields: "полів",
    checked: "Позначено",
    chooseOption: "— обрати —",
    flattenLabel: "Об'єднати форму (без редагованих полів у збереженому PDF)",
    saving: "Збереження…",
    saveFilled: "Зберегти заповнений PDF",
    download: "Завантажити",
    privacy: "Читає та записує поля AcroForm (текст, прапорець, перемикач, список). Нічого не завантажується — ваш PDF залишається на цьому пристрої.",
    noFields: "У цьому PDF не знайдено полів форми для заповнення. Скористайтеся «Підписати PDF», щоб додати підпис.",
    couldNotRead: "Не вдалося прочитати цей PDF.",
    couldNotSave: "Не вдалося зберегти заповнений PDF.",
  },
  cs: {
    uploadLabel: "Nahrát vyplnitelný PDF",
    uploadHint: "Libovolný PDF s poli AcroForm — zůstane ve vašem prohlížeči",
    field: "pole",
    fields: "polí",
    checked: "Zaškrtnuto",
    chooseOption: "— vybrat —",
    flattenLabel: "Sloučit formulář (žádná upravitelná pole v uloženém PDF)",
    saving: "Ukládání…",
    saveFilled: "Uložit vyplněný PDF",
    download: "Stáhnout",
    privacy: "Čte a zapisuje pole AcroForm (text, zaškrtávací políčko, radio, rozbalovací seznam). Nic se nenahrává — váš PDF zůstává na tomto zařízení.",
    noFields: "V tomto PDF nebyla nalezena žádná vyplnitelná pole formuláře. Použijte Podepsat PDF pro přidání podpisu.",
    couldNotRead: "Tento PDF nelze přečíst.",
    couldNotSave: "Vyplněný PDF nelze uložit.",
  },
};

type TextEntry = { kind: "text"; name: string; max: number };
type CheckEntry = { kind: "check"; name: string };
type RadioEntry = { kind: "radio"; name: string; options: string[] };
type DropdownEntry = { kind: "dropdown"; name: string; options: string[] };
type Entry = TextEntry | CheckEntry | RadioEntry | DropdownEntry;

export function FillPdfFormClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [flatten, setFlatten] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("form.pdf");
  const [outSize, setOutSize] = useState(0);

  async function onFile(f: File) {
    setFile(f); setError(null); setOutUrl(null); setEntries([]); setValues({});
    try {
      const bytes = new Uint8Array(await f.arrayBuffer());
      setPdfBytes(bytes);
      const { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFDropdown } = await import("pdf-lib");
      const doc = await PDFDocument.load(bytes);
      const form = doc.getForm();
      const fields = form.getFields();
      const next: Entry[] = [];
      const seed: Record<string, string | boolean> = {};
      for (const fld of fields) {
        const name = fld.getName();
        if (fld instanceof PDFTextField) {
          next.push({ kind: "text", name, max: fld.getMaxLength() ?? 0 });
          seed[name] = fld.getText() ?? "";
        } else if (fld instanceof PDFCheckBox) {
          next.push({ kind: "check", name });
          seed[name] = fld.isChecked();
        } else if (fld instanceof PDFRadioGroup) {
          next.push({ kind: "radio", name, options: fld.getOptions() });
          seed[name] = fld.getSelected() ?? "";
        } else if (fld instanceof PDFDropdown) {
          next.push({ kind: "dropdown", name, options: fld.getOptions() });
          seed[name] = fld.getSelected()?.[0] ?? "";
        }
      }
      setEntries(next);
      setValues(seed);
      if (next.length === 0) setError(s.noFields);
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotRead);
      setPdfBytes(null);
    }
  }

  async function save() {
    if (!pdfBytes || !file || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFDropdown } = await import("pdf-lib");
      const doc = await PDFDocument.load(pdfBytes);
      const form = doc.getForm();
      for (const e of entries) {
        const v = values[e.name];
        const field = form.getField(e.name);
        if (e.kind === "text" && field instanceof PDFTextField) field.setText(String(v ?? ""));
        else if (e.kind === "check" && field instanceof PDFCheckBox) (v ? field.check() : field.uncheck());
        else if (e.kind === "radio" && field instanceof PDFRadioGroup && v) field.select(String(v));
        else if (e.kind === "dropdown" && field instanceof PDFDropdown && v) field.select(String(v));
      }
      if (flatten) form.flatten();
      const out = await doc.save();
      const blob = new Blob([new Uint8Array(out)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(url);
      setOutSize(blob.size);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-filled.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : s.couldNotSave);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-brand-50/30 px-6 py-12 text-center transition-colors hover:border-brand-300">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Upload className="h-5 w-5" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)} · {entries.length} {entries.length === 1 ? s.field : s.fields}</span>
          </div>
          <button onClick={() => { setFile(null); setPdfBytes(null); setEntries([]); setValues({}); setOutUrl(null); setError(null); }}
            className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {entries.length > 0 && (
        <div className="space-y-3 rounded-lg border border-ink-100 bg-white p-4">
          {entries.map((e) => (
            <div key={e.name}>
              <label className="block text-xs font-medium text-ink-600">{e.name}</label>
              {e.kind === "text" && (
                <input
                  type="text"
                  value={String(values[e.name] ?? "")}
                  maxLength={e.max || undefined}
                  onChange={(ev) => setValues((st) => ({ ...st, [e.name]: ev.target.value }))}
                  className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              )}
              {e.kind === "check" && (
                <label className="mt-1 inline-flex items-center gap-2 text-sm text-ink-800">
                  <input type="checkbox" checked={Boolean(values[e.name])}
                    onChange={(ev) => setValues((st) => ({ ...st, [e.name]: ev.target.checked }))}
                    className="h-4 w-4 rounded border-ink-300 accent-brand-500" />
                  {s.checked}
                </label>
              )}
              {(e.kind === "radio" || e.kind === "dropdown") && (
                <select value={String(values[e.name] ?? "")}
                  onChange={(ev) => setValues((st) => ({ ...st, [e.name]: ev.target.value }))}
                  className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100">
                  <option value="">{s.chooseOption}</option>
                  {e.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              )}
            </div>
          ))}
          <label className="mt-2 flex items-center gap-2 text-xs text-ink-600">
            <input type="checkbox" checked={flatten} onChange={(e) => setFlatten(e.target.checked)} className="h-3.5 w-3.5 rounded border-ink-300 accent-brand-500" />
            {s.flattenLabel}
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={save} disabled={!entries.length || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FormInput className="h-4 w-4" />}
          {busy ? s.saving : s.saveFilled}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.download} · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        {s.privacy}
      </p>
    </div>
  );
}
