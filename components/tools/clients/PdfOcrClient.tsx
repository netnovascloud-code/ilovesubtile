"use client";

import { useState } from "react";
import { FileText, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Scanned PDF",
    docLanguage: "Document language",
    working: "Working…",
    runOcr: "Run OCR",
    loadingEngines: "Loading engines…",
    ocrFailed: "OCR failed: ",
    recognizedText: "Recognized text",
    chars: "chars",
    downloadTxt: "Download .txt",
    privacy: "Pages are rasterised in your browser with pdf.js and read with Tesseract.js — your PDF is never uploaded. Pages are processed sequentially; large scanned docs can take a minute or two.",
  },
  fr: {
    dropLabel: "PDF scanné",
    docLanguage: "Langue du document",
    working: "Traitement…",
    runOcr: "Lancer l'OCR",
    loadingEngines: "Chargement des moteurs…",
    ocrFailed: "OCR échoué : ",
    recognizedText: "Texte reconnu",
    chars: "caractères",
    downloadTxt: "Télécharger .txt",
    privacy: "Les pages sont rastérisées dans votre navigateur avec pdf.js et lues avec Tesseract.js — votre PDF n'est jamais téléversé. Les pages sont traitées séquentiellement ; les grands documents scannés peuvent prendre une à deux minutes.",
  },
  es: {
    dropLabel: "PDF escaneado",
    docLanguage: "Idioma del documento",
    working: "Procesando…",
    runOcr: "Ejecutar OCR",
    loadingEngines: "Cargando motores…",
    ocrFailed: "OCR fallido: ",
    recognizedText: "Texto reconocido",
    chars: "caracteres",
    downloadTxt: "Descargar .txt",
    privacy: "Las páginas se rasterizan en tu navegador con pdf.js y se leen con Tesseract.js — tu PDF nunca se sube. Las páginas se procesan secuencialmente; los documentos escaneados grandes pueden tardar uno o dos minutos.",
  },
  pt: {
    dropLabel: "PDF digitalizado",
    docLanguage: "Idioma do documento",
    working: "A processar…",
    runOcr: "Executar OCR",
    loadingEngines: "A carregar motores…",
    ocrFailed: "OCR falhado: ",
    recognizedText: "Texto reconhecido",
    chars: "caracteres",
    downloadTxt: "Transferir .txt",
    privacy: "As páginas são rasterizadas no seu navegador com pdf.js e lidas com Tesseract.js — o seu PDF nunca é enviado. As páginas são processadas sequencialmente; documentos digitalizados grandes podem demorar um ou dois minutos.",
  },
  de: {
    dropLabel: "Gescannte PDF",
    docLanguage: "Dokumentsprache",
    working: "Verarbeitung…",
    runOcr: "OCR starten",
    loadingEngines: "Engines werden geladen…",
    ocrFailed: "OCR fehlgeschlagen: ",
    recognizedText: "Erkannter Text",
    chars: "Zeichen",
    downloadTxt: ".txt herunterladen",
    privacy: "Seiten werden in Ihrem Browser mit pdf.js gerastert und mit Tesseract.js gelesen — Ihre PDF wird niemals hochgeladen. Seiten werden nacheinander verarbeitet; große gescannte Dokumente können ein bis zwei Minuten dauern.",
  },
  it: {
    dropLabel: "PDF scansionato",
    docLanguage: "Lingua del documento",
    working: "Elaborazione…",
    runOcr: "Esegui OCR",
    loadingEngines: "Caricamento motori…",
    ocrFailed: "OCR fallito: ",
    recognizedText: "Testo riconosciuto",
    chars: "caratteri",
    downloadTxt: "Scarica .txt",
    privacy: "Le pagine vengono rasterizzate nel browser con pdf.js e lette con Tesseract.js — il tuo PDF non viene mai caricato. Le pagine vengono elaborate in sequenza; i documenti scansionati grandi possono richiedere uno o due minuti.",
  },
  nl: {
    dropLabel: "Gescand PDF",
    docLanguage: "Documenttaal",
    working: "Verwerken…",
    runOcr: "OCR uitvoeren",
    loadingEngines: "Engines laden…",
    ocrFailed: "OCR mislukt: ",
    recognizedText: "Herkende tekst",
    chars: "tekens",
    downloadTxt: ".txt downloaden",
    privacy: "Pagina's worden in uw browser gerasterd met pdf.js en gelezen met Tesseract.js — uw PDF wordt nooit geüpload. Pagina's worden sequentieel verwerkt; grote gescande documenten kunnen een à twee minuten duren.",
  },
  ja: {
    dropLabel: "スキャンされたPDF",
    docLanguage: "ドキュメントの言語",
    working: "処理中…",
    runOcr: "OCRを実行",
    loadingEngines: "エンジンを読み込み中…",
    ocrFailed: "OCRに失敗: ",
    recognizedText: "認識されたテキスト",
    chars: "文字",
    downloadTxt: ".txtをダウンロード",
    privacy: "ページはブラウザ内でpdf.jsによりラスタライズされ、Tesseract.jsで読み取られます — PDFはアップロードされません。ページは順次処理され、大きなスキャン文書は数分かかる場合があります。",
  },
  zh: {
    dropLabel: "扫描PDF",
    docLanguage: "文档语言",
    working: "处理中…",
    runOcr: "运行OCR",
    loadingEngines: "正在加载引擎…",
    ocrFailed: "OCR失败：",
    recognizedText: "识别的文本",
    chars: "字符",
    downloadTxt: "下载 .txt",
    privacy: "页面在您的浏览器中用pdf.js栅格化，并用Tesseract.js读取 — 您的PDF永不上传。页面按顺序处理；大型扫描文档可能需要一两分钟。",
  },
  ko: {
    dropLabel: "스캔된 PDF",
    docLanguage: "문서 언어",
    working: "처리 중…",
    runOcr: "OCR 실행",
    loadingEngines: "엔진 로딩 중…",
    ocrFailed: "OCR 실패: ",
    recognizedText: "인식된 텍스트",
    chars: "자",
    downloadTxt: ".txt 다운로드",
    privacy: "페이지는 브라우저에서 pdf.js로 래스터화되고 Tesseract.js로 읽힙니다 — PDF는 업로드되지 않습니다. 페이지는 순차적으로 처리되며, 큰 스캔 문서는 1~2분 정도 걸릴 수 있습니다.",
  },
  ar: {
    dropLabel: "PDF ممسوح ضوئياً",
    docLanguage: "لغة المستند",
    working: "جاري المعالجة…",
    runOcr: "تشغيل OCR",
    loadingEngines: "جاري تحميل المحركات…",
    ocrFailed: "فشل OCR: ",
    recognizedText: "النص المعرَّف",
    chars: "حرف",
    downloadTxt: "تنزيل .txt",
    privacy: "تُنقَّط الصفحات في متصفحك بـ pdf.js وتُقرأ بـ Tesseract.js — لا يُرفع PDF أبداً. تعالَج الصفحات بالتسلسل؛ المستندات الممسوحة الكبيرة قد تستغرق دقيقة أو دقيقتين.",
  },
  ru: {
    dropLabel: "Сканированный PDF",
    docLanguage: "Язык документа",
    working: "Обработка…",
    runOcr: "Запустить OCR",
    loadingEngines: "Загрузка движков…",
    ocrFailed: "Ошибка OCR: ",
    recognizedText: "Распознанный текст",
    chars: "символов",
    downloadTxt: "Скачать .txt",
    privacy: "Страницы растеризуются в браузере с помощью pdf.js и читаются через Tesseract.js — PDF никогда не загружается. Страницы обрабатываются последовательно; большие сканированные документы могут занять несколько минут.",
  },
  hi: {
    dropLabel: "स्कैन किया गया PDF",
    docLanguage: "दस्तावेज़ की भाषा",
    working: "प्रसंस्करण…",
    runOcr: "OCR चलाएं",
    loadingEngines: "इंजन लोड हो रहे हैं…",
    ocrFailed: "OCR विफल: ",
    recognizedText: "पहचाना गया टेक्स्ट",
    chars: "अक्षर",
    downloadTxt: ".txt डाउनलोड करें",
    privacy: "पृष्ठ आपके ब्राउज़र में pdf.js से रास्टराइज़ होते हैं और Tesseract.js से पढ़े जाते हैं — PDF कभी अपलोड नहीं होता। पृष्ठ क्रमिक रूप से संसाधित होते हैं; बड़े स्कैन किए गए दस्तावेज़ों में एक-दो मिनट लग सकते हैं।",
  },
  tr: {
    dropLabel: "Taranmış PDF",
    docLanguage: "Belge dili",
    working: "İşleniyor…",
    runOcr: "OCR çalıştır",
    loadingEngines: "Motorlar yükleniyor…",
    ocrFailed: "OCR başarısız: ",
    recognizedText: "Tanınan metin",
    chars: "karakter",
    downloadTxt: ".txt indir",
    privacy: "Sayfalar, tarayıcınızda pdf.js ile taranır ve Tesseract.js ile okunur — PDF'niz hiçbir zaman yüklenmez. Sayfalar sıralı olarak işlenir; büyük taranmış belgeler bir iki dakika sürebilir.",
  },
  id: {
    dropLabel: "PDF hasil scan",
    docLanguage: "Bahasa dokumen",
    working: "Memproses…",
    runOcr: "Jalankan OCR",
    loadingEngines: "Memuat mesin…",
    ocrFailed: "OCR gagal: ",
    recognizedText: "Teks yang dikenali",
    chars: "karakter",
    downloadTxt: "Unduh .txt",
    privacy: "Halaman dirasterisasi di browser Anda dengan pdf.js dan dibaca dengan Tesseract.js — PDF Anda tidak pernah diunggah. Halaman diproses secara berurutan; dokumen hasil scan yang besar mungkin membutuhkan satu atau dua menit.",
  },
  vi: {
    dropLabel: "PDF được quét",
    docLanguage: "Ngôn ngữ tài liệu",
    working: "Đang xử lý…",
    runOcr: "Chạy OCR",
    loadingEngines: "Đang tải động cơ…",
    ocrFailed: "OCR thất bại: ",
    recognizedText: "Văn bản được nhận dạng",
    chars: "ký tự",
    downloadTxt: "Tải xuống .txt",
    privacy: "Các trang được rasterize trong trình duyệt của bạn bằng pdf.js và đọc bằng Tesseract.js — PDF không bao giờ được tải lên. Các trang được xử lý tuần tự; tài liệu scan lớn có thể mất một hoặc hai phút.",
  },
  sv: {
    dropLabel: "Skannad PDF",
    docLanguage: "Dokumentspråk",
    working: "Bearbetar…",
    runOcr: "Kör OCR",
    loadingEngines: "Laddar motorer…",
    ocrFailed: "OCR misslyckades: ",
    recognizedText: "Igenkänd text",
    chars: "tecken",
    downloadTxt: "Ladda ner .txt",
    privacy: "Sidor rastreras i din webbläsare med pdf.js och läses med Tesseract.js — din PDF laddas aldrig upp. Sidor behandlas sekventiellt; stora skannade dokument kan ta en till två minuter.",
  },
  pl: {
    dropLabel: "Zeskanowany PDF",
    docLanguage: "Język dokumentu",
    working: "Przetwarzanie…",
    runOcr: "Uruchom OCR",
    loadingEngines: "Ładowanie silników…",
    ocrFailed: "OCR nie powiodło się: ",
    recognizedText: "Rozpoznany tekst",
    chars: "znaków",
    downloadTxt: "Pobierz .txt",
    privacy: "Strony są rasteryzowane w przeglądarce za pomocą pdf.js i odczytywane przez Tesseract.js — PDF nigdy nie jest przesyłany. Strony przetwarzane są sekwencyjnie; duże zeskanowane dokumenty mogą zająć minutę lub dwie.",
  },
  uk: {
    dropLabel: "Відсканований PDF",
    docLanguage: "Мова документа",
    working: "Обробка…",
    runOcr: "Запустити OCR",
    loadingEngines: "Завантаження рушіїв…",
    ocrFailed: "Помилка OCR: ",
    recognizedText: "Розпізнаний текст",
    chars: "символів",
    downloadTxt: "Завантажити .txt",
    privacy: "Сторінки растеризуються у браузері через pdf.js та читаються через Tesseract.js — PDF ніколи не завантажується. Сторінки обробляються послідовно; великі відскановані документи можуть займати кілька хвилин.",
  },
  cs: {
    dropLabel: "Naskenovaný PDF",
    docLanguage: "Jazyk dokumentu",
    working: "Zpracování…",
    runOcr: "Spustit OCR",
    loadingEngines: "Načítání enginů…",
    ocrFailed: "OCR selhalo: ",
    recognizedText: "Rozpoznaný text",
    chars: "znaků",
    downloadTxt: "Stáhnout .txt",
    privacy: "Stránky jsou rastrovány ve vašem prohlížeči pomocí pdf.js a čteny pomocí Tesseract.js — váš PDF se nikdy nenahrává. Stránky jsou zpracovávány postupně; velké naskenované dokumenty mohou trvat minutu nebo dvě.",
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
type TesseractWorker = {
  recognize: (img: Blob | string, opts?: object, conf?: object) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
};
type TesseractModule = {
  createWorker: (
    lang: string,
    oem?: number,
    options?: { logger?: (m: { status: string; progress: number }) => void },
  ) => Promise<TesseractWorker>;
};

const PDFJS_URL = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
const TESSERACT_URL = "https://esm.sh/tesseract.js@5";

let pdfjsCache: PdfJs | null = null;
async function loadPdfjs(): Promise<PdfJs> {
  if (pdfjsCache) return pdfjsCache;
  const lib = (await import(/* webpackIgnore: true */ PDFJS_URL)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  pdfjsCache = lib;
  return lib;
}

const LANGS: { code: string; label: string }[] = [
  { code: "eng", label: "English" }, { code: "fra", label: "Français" },
  { code: "spa", label: "Español" }, { code: "deu", label: "Deutsch" },
  { code: "ita", label: "Italiano" }, { code: "por", label: "Português" },
  { code: "nld", label: "Nederlands" }, { code: "rus", label: "Русский" },
  { code: "ara", label: "العربية" }, { code: "jpn", label: "日本語" },
  { code: "chi_sim", label: "中文 (简体)" }, { code: "kor", label: "한국어" },
];

export function PdfOcrClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState("eng");
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "done" | "error">("idle");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");

  async function run() {
    if (!file) return;
    setError(null); setText(""); setPhase("loading"); setStatus(s.loadingEngines); setProgress(0);
    try {
      const [pdfjs, tessMod] = await Promise.all([
        loadPdfjs(),
        import(/* webpackIgnore: true */ TESSERACT_URL) as Promise<TesseractModule>,
      ]);
      const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;

      setPhase("running"); setStatus(`${s.runOcr} (${LANGS.find((l) => l.code === lang)?.label})…`);
      // Reuse the same worker across all pages — significantly faster than
      // spinning up a new worker for each page.
      const worker = await tessMod.createWorker(lang, 1);

      // Render each page at 2× for crisp glyphs, OCR the resulting PNG, then
      // join with form-feed separators so paginated downstream tools can
      // re-split if they want to.
      const chunks: string[] = [];
      for (let n = 1; n <= doc.numPages; n++) {
        setStatus(`OCR page ${n}/${doc.numPages}…`);
        setProgress(Math.round((n - 1) / doc.numPages * 100));
        const page = await doc.getPage(n);
        const vp = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
        // toBlob avoids the multi-MB string allocation that toDataURL forces
        // for every page — critical on large scans (50+ pages on mobile would
        // OOM the tab). Tesseract accepts Blob directly.
        const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
        const { data } = await worker.recognize(blob);
        chunks.push(data.text.trim());
      }
      await worker.terminate();
      setText(chunks.join("\n\n\f\n\n"));
      setProgress(100); setPhase("done"); setStatus("");
    } catch (e) {
      setError(`${s.ocrFailed}${(e as Error).message}`);
      setPhase("error");
    }
  }

  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(file?.name ?? "ocr").replace(/\.pdf$/i, "")}.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  const busy = phase === "loading" || phase === "running";

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "application/pdf": [".pdf"] }}
        icon={<FileText className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setText(""); setPhase("idle"); }}
        current={file}
      />

      {file && (
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.docLanguage}
            <select value={lang} onChange={(e) => setLang(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
          <Button onClick={run} disabled={busy} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {busy ? status || s.working : s.runOcr}
          </Button>
        </div>
      )}

      {busy && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {text && !busy && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">{s.recognizedText} · {text.length.toLocaleString()} {s.chars}</span>
            <Button onClick={download} variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" /> {s.downloadTxt}
            </Button>
          </div>
          <textarea
            value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}
            className="h-80 w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      )}

      <p className="text-xs text-ink-400">
        {s.privacy}
      </p>
    </div>
  );
}
