"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Copy, Check, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { useLocale } from "@/hooks/useLocale";

// Tesseract.js types are intentionally minimal — we only consume what we use
// and load the library dynamically from a CDN (no npm dep, no Webpack bundling).
type TesseractWorker = {
  recognize: (img: Blob, opts?: object, conf?: object) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
};
type TesseractModule = {
  createWorker: (
    lang: string,
    oem?: number,
    options?: { logger?: (m: { status: string; progress: number }) => void },
  ) => Promise<TesseractWorker>;
};

const TESSERACT_URL = "https://esm.sh/tesseract.js@5";

// Tesseract uses 3-letter codes; we only expose the most-searched langs to
// keep the UI calm. The library lazy-loads the .traineddata for each picked
// language on first run (~10 MB cached afterwards in IndexedDB).
const LANGS: { code: string; label: string }[] = [
  { code: "eng", label: "English" },
  { code: "fra", label: "Français" },
  { code: "spa", label: "Español" },
  { code: "deu", label: "Deutsch" },
  { code: "ita", label: "Italiano" },
  { code: "por", label: "Português" },
  { code: "nld", label: "Nederlands" },
  { code: "rus", label: "Русский" },
  { code: "ara", label: "العربية" },
  { code: "jpn", label: "日本語" },
  { code: "chi_sim", label: "中文 (简体)" },
  { code: "kor", label: "한국어" },
];

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Image",
    languageLabel: "Language",
    loadingEngine: "Loading engine…",
    reading: "Reading…",
    extractText: "Extract text",
    extractedLabel: "Extracted text",
    chars: "chars",
    copy: "Copy",
    privacyNote: "Powered by Tesseract.js — the OCR engine and language data run entirely in your browser, your image is never uploaded. First run downloads ~10 MB of language data; cached afterwards.",
    ocrError: "OCR failed: ",
  },
  fr: {
    dropLabel: "Image",
    languageLabel: "Langue",
    loadingEngine: "Chargement du moteur…",
    reading: "Lecture…",
    extractText: "Extraire le texte",
    extractedLabel: "Texte extrait",
    chars: "caractères",
    copy: "Copier",
    privacyNote: "Propulsé par Tesseract.js — le moteur OCR et les données linguistiques fonctionnent entièrement dans votre navigateur, votre image n'est jamais envoyée. Le premier lancement télécharge ∼10 Mo de données ; mis en cache ensuite.",
    ocrError: "Échec de l'OCR : ",
  },
  es: {
    dropLabel: "Imagen",
    languageLabel: "Idioma",
    loadingEngine: "Cargando motor…",
    reading: "Leyendo…",
    extractText: "Extraer texto",
    extractedLabel: "Texto extraído",
    chars: "caracteres",
    copy: "Copiar",
    privacyNote: "Con tecnología de Tesseract.js — el motor OCR y los datos de idioma se ejecutan completamente en tu navegador, tu imagen nunca se sube. La primera ejecución descarga ∼10 MB de datos de idioma; guardados en caché después.",
    ocrError: "Error de OCR: ",
  },
  pt: {
    dropLabel: "Imagem",
    languageLabel: "Idioma",
    loadingEngine: "Carregando motor…",
    reading: "Lendo…",
    extractText: "Extrair texto",
    extractedLabel: "Texto extraído",
    chars: "caracteres",
    copy: "Copiar",
    privacyNote: "Powered pelo Tesseract.js — o motor OCR e os dados de idioma rodam inteiramente no seu navegador, sua imagem nunca é enviada. A primeira execução baixa ∼10 MB de dados de idioma; armazenados em cache depois.",
    ocrError: "Falha no OCR: ",
  },
  de: {
    dropLabel: "Bild",
    languageLabel: "Sprache",
    loadingEngine: "Engine wird geladen…",
    reading: "Liest…",
    extractText: "Text extrahieren",
    extractedLabel: "Extrahierter Text",
    chars: "Zeichen",
    copy: "Kopieren",
    privacyNote: "Powered by Tesseract.js — die OCR-Engine und Sprachdaten laufen vollständig in Ihrem Browser, Ihr Bild wird niemals hochgeladen. Beim ersten Start werden ∼10 MB Sprachdaten heruntergeladen; danach gecacht.",
    ocrError: "OCR fehlgeschlagen: ",
  },
  it: {
    dropLabel: "Immagine",
    languageLabel: "Lingua",
    loadingEngine: "Caricamento motore…",
    reading: "Lettura…",
    extractText: "Estrai testo",
    extractedLabel: "Testo estratto",
    chars: "caratteri",
    copy: "Copia",
    privacyNote: "Basato su Tesseract.js — il motore OCR e i dati linguistici funzionano interamente nel browser, la tua immagine non viene mai caricata. Il primo avvio scarica ∼10 MB di dati; poi viene messo in cache.",
    ocrError: "OCR fallito: ",
  },
  nl: {
    dropLabel: "Afbeelding",
    languageLabel: "Taal",
    loadingEngine: "Engine laden…",
    reading: "Lezen…",
    extractText: "Tekst extraheren",
    extractedLabel: "Geëxtraheerde tekst",
    chars: "tekens",
    copy: "Kopiëren",
    privacyNote: "Aangedreven door Tesseract.js — de OCR-engine en taalgegevens draaien volledig in uw browser, uw afbeelding wordt nooit geüpload. Bij de eerste uitvoering worden ∼10 MB taalgegevens geladen; daarna gecached.",
    ocrError: "OCR mislukt: ",
  },
  ja: {
    dropLabel: "画像",
    languageLabel: "言語",
    loadingEngine: "エンジンを読み込み中…",
    reading: "読み取り中…",
    extractText: "テキストを抽出",
    extractedLabel: "抽出されたテキスト",
    chars: "文字",
    copy: "コピー",
    privacyNote: "Tesseract.js を使用 — OCR エンジンと言語データはすべてブラウザ内で動作し、画像はアップロードされません。初回起動時に言語データ（∼10 MB）をダウンロードし、以後はキャッシュされます。",
    ocrError: "OCR に失敗しました: ",
  },
  zh: {
    dropLabel: "图片",
    languageLabel: "语言",
    loadingEngine: "加载引擎…",
    reading: "读取中…",
    extractText: "提取文字",
    extractedLabel: "提取的文字",
    chars: "字符",
    copy: "复制",
    privacyNote: "由 Tesseract.js 驱动 — OCR 引擎和语言数据完全在您的浏览器中运行，您的图片永远不会被上传。首次运行下载约 10 MB 语言数据；之后缓存。",
    ocrError: "OCR 失败: ",
  },
  ko: {
    dropLabel: "이미지",
    languageLabel: "언어",
    loadingEngine: "엔진 로딩 중…",
    reading: "읽는 중…",
    extractText: "텍스트 추출",
    extractedLabel: "추출된 텍스트",
    chars: "자",
    copy: "복사",
    privacyNote: "Tesseract.js로 구동 — OCR 엔진과 언어 데이터는 브라우저에서 완전히 실행되며 이미지는 절대 업로드되지 않습니다. 첫 실행 시 약 10 MB의 언어 데이터를 다운로드하고 이후 캐시됩니다.",
    ocrError: "OCR 실패: ",
  },
  ar: {
    dropLabel: "الصورة",
    languageLabel: "اللغة",
    loadingEngine: "جارٍ تحميل المحرك…",
    reading: "جارٍ القراءة…",
    extractText: "استخراج النص",
    extractedLabel: "النص المستخرج",
    chars: "حرفًا",
    copy: "نسخ",
    privacyNote: "مدعوم بـ Tesseract.js — يعمل محرك OCR وبيانات اللغة بالكامل في متصفحك، صورتك لن تُرفع أبدًا. التشغيل الأوّل يُنزّل ∼10 ميغابايت من بيانات اللغة، ثم تُخزَّن.",
    ocrError: "فشل OCR: ",
  },
  ru: {
    dropLabel: "Изображение",
    languageLabel: "Язык",
    loadingEngine: "Загружается движок…",
    reading: "Чтение…",
    extractText: "Извлечь текст",
    extractedLabel: "Извлечённый текст",
    chars: "символов",
    copy: "Копировать",
    privacyNote: "Работает на Tesseract.js — движок OCR и языковые данные полностью работают в вашем браузере, изображение никогда не загружается. При первом запуске скачивается ∼10 МБ языковых данных; затем кешируется.",
    ocrError: "OCR завершился с ошибкой: ",
  },
  hi: {
    dropLabel: "छवि",
    languageLabel: "भाषा",
    loadingEngine: "इंजन लोड हो रहा है…",
    reading: "पढ़ा जा रहा है…",
    extractText: "पाठ निकालें",
    extractedLabel: "निकाला गया पाठ",
    chars: "अक्षर",
    copy: "कॉपी करें",
    privacyNote: "Tesseract.js द्वारा संचालित — OCR इंजन और भाषा डेटा पूरी तरह आपके ब्राउज़र में चलते हैं, आपकी छवि कभी अपलोड नहीं होती। पहली बार ∼10 MB भाषा डेटा डाउनलोड होता है; फिर कैश होता है।",
    ocrError: "OCR विफल रहा: ",
  },
  tr: {
    dropLabel: "Görsel",
    languageLabel: "Dil",
    loadingEngine: "Motor yükleniyor…",
    reading: "Okunuyor…",
    extractText: "Metni çıkar",
    extractedLabel: "Çıkarılan metin",
    chars: "karakter",
    copy: "Kopyala",
    privacyNote: "Tesseract.js ile desteklenmektedir — OCR motoru ve dil verileri tamamen tarayıcınızda çalışır, görseliniz hiçbir zaman yüklenmez. İlk çalıştırmada ∼10 MB dil verisi indirilir; sonra önbelleğe alınır.",
    ocrError: "OCR başarısız: ",
  },
  id: {
    dropLabel: "Gambar",
    languageLabel: "Bahasa",
    loadingEngine: "Memuat mesin…",
    reading: "Membaca…",
    extractText: "Ekstrak teks",
    extractedLabel: "Teks yang diekstrak",
    chars: "karakter",
    copy: "Salin",
    privacyNote: "Didukung oleh Tesseract.js — mesin OCR dan data bahasa berjalan sepenuhnya di browser Anda, gambar Anda tidak pernah diunggah. Pertama kali mengunduh ∼10 MB data bahasa; selanjutnya di-cache.",
    ocrError: "OCR gagal: ",
  },
  vi: {
    dropLabel: "Ảnh",
    languageLabel: "Ngôn ngữ",
    loadingEngine: "Đang tải công cụ…",
    reading: "Đang đọc…",
    extractText: "Trích xuất văn bản",
    extractedLabel: "Văn bản đã trích xuất",
    chars: "ký tự",
    copy: "Sao chép",
    privacyNote: "Được hỗ trợ bởi Tesseract.js — OCR engine và dữ liệu ngôn ngữ chạy hoàn toàn trên trình duyệt của bạn, ảnh không bao giờ được tải lên. Lần đầu tải ∼10 MB dữ liệu ngôn ngữ; sau đó được lưu vào bộ nhớ đệm.",
    ocrError: "OCR thất bại: ",
  },
  sv: {
    dropLabel: "Bild",
    languageLabel: "Språk",
    loadingEngine: "Laddar motor…",
    reading: "Läser…",
    extractText: "Extrahera text",
    extractedLabel: "Extraherad text",
    chars: "tecken",
    copy: "Kopiera",
    privacyNote: "Drivs av Tesseract.js — OCR-motorn och språkdata körs helt i din webbläsare, din bild laddas aldrig upp. Vid första körningen laddas ∼10 MB språkdata; cachas sedan.",
    ocrError: "OCR misslyckades: ",
  },
  pl: {
    dropLabel: "Obraz",
    languageLabel: "Język",
    loadingEngine: "Ładowanie silnika…",
    reading: "Odczytywanie…",
    extractText: "Wyodrębnij tekst",
    extractedLabel: "Wyodrębniony tekst",
    chars: "znaków",
    copy: "Kopiuj",
    privacyNote: "Zasilany przez Tesseract.js — silnik OCR i dane językowe działają całkowicie w Twojej przeglądarce, Twój obraz nigdy nie jest przesyłany. Pierwsze uruchomienie pobiera ∼10 MB danych językowych; następnie jest w pamięci podręcznej.",
    ocrError: "OCR nie powiodło się: ",
  },
  uk: {
    dropLabel: "Зображення",
    languageLabel: "Мова",
    loadingEngine: "Завантаження двигуна…",
    reading: "Читання…",
    extractText: "Витягти текст",
    extractedLabel: "Витягнутий текст",
    chars: "символів",
    copy: "Копіювати",
    privacyNote: "Працює на Tesseract.js — OCR-двигун і мовні дані повністю працюють у вашому браузері, зображення ніколи не завантажується. Перший запуск завантажує ∼10 МБ мовних даних; потім кешується.",
    ocrError: "OCR завершився з помилкою: ",
  },
  cs: {
    dropLabel: "Obrázek",
    languageLabel: "Jazyk",
    loadingEngine: "Načítání engine…",
    reading: "Čtení…",
    extractText: "Extrahovat text",
    extractedLabel: "Extrahovaný text",
    chars: "znaků",
    copy: "Kopírovat",
    privacyNote: "Využívá Tesseract.js — OCR engine a jazyková data běží zcela ve vašem prohlížeči, váš obrázek není nikdy nahrán. První spuštění stahuje ∼10 MB jazykových dat; poté se ukládá do mezipaměti.",
    ocrError: "OCR selhalo: ",
  },
};

export function ImageToTextClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState("eng");
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const previewUrl = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    const u = URL.createObjectURL(file);
    previewUrl.current = u; setPreview(u);
    return () => { if (previewUrl.current) URL.revokeObjectURL(previewUrl.current); };
  }, [file]);

  async function run() {
    if (!file) return;
    setError(null); setText(""); setPhase("loading"); setProgress(0);
    try {
      const mod = (await import(/* webpackIgnore: true */ TESSERACT_URL)) as unknown as TesseractModule;
      setPhase("running");
      const worker = await mod.createWorker(lang, 1, {
        logger: (m) => {
          // Tesseract reports several phases; we surface the recognition one
          // since it's the only one with meaningful progress for the user.
          if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100));
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      setText(data.text.trim());
      setPhase("done"); setProgress(100);
    } catch (e) {
      setPhase("error");
      setError(`${s.ocrError}${(e as Error).message}`);
    }
  }

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(file?.name ?? "ocr").replace(/\.[^.]+$/, "")}.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"], "image/bmp": [".bmp"], "image/tiff": [".tif", ".tiff"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setText(""); setPhase("idle"); }}
        current={file}
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Source preview" className="mx-auto max-h-64 rounded-lg border border-ink-100" />
      )}

      {file && (
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.languageLabel}
            <select value={lang} onChange={(e) => setLang(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
          <Button onClick={run} disabled={phase === "loading" || phase === "running"} size="lg">
            {phase === "loading" || phase === "running" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {phase === "loading" ? s.loadingEngine : phase === "running" ? `${s.reading} ${progress}%` : s.extractText}
          </Button>
        </div>
      )}

      {(phase === "loading" || phase === "running") && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {text && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">{s.extractedLabel} · {text.length.toLocaleString()} {s.chars}</span>
            <div className="flex gap-2">
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />} {s.copy}
              </button>
              <button onClick={download} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                <Download className="h-3 w-3" /> .txt
              </button>
            </div>
          </div>
          <textarea
            value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}
            className="h-72 w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      )}

      <p className="text-xs text-ink-400">
        {s.privacyNote}
      </p>
    </div>
  );
}
