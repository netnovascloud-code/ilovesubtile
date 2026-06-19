"use client";

import { useRef, useState } from "react";
import { Type, Download, X, Loader2 } from "lucide-react";
import { Font, woff2 } from "fonteditor-core";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { type Locale } from "@/lib/i18n/locales";

/** Font formats fonteditor-core can READ. */
type InType = "ttf" | "otf" | "woff" | "woff2";
/** Formats it can WRITE (OTF/CFF output isn't supported by the lib). */
type OutType = "ttf" | "woff" | "woff2";

const OUT_MIME: Record<OutType, string> = {
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
};

function inTypeFromName(name: string): InType | null {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "ttf") return "ttf";
  if (ext === "otf") return "otf";
  if (ext === "woff") return "woff";
  if (ext === "woff2") return "woff2";
  return null;
}

// woff2 needs its wasm initialised once before reading/writing that format.
let woff2Ready: Promise<unknown> | null = null;
function ensureWoff2() {
  if (!woff2Ready) woff2Ready = woff2.init("/woff2.wasm");
  return woff2Ready;
}

async function convertFont(buf: ArrayBuffer, inType: InType, outType: OutType): Promise<ArrayBuffer> {
  if (inType === "woff2" || outType === "woff2") await ensureWoff2();
  const font = Font.create(buf, { type: inType, hinting: true });
  // In the browser write() returns an ArrayBuffer (the Node Buffer path needs no
  // toBuffer flag here); the d.ts types it as Buffer, hence the cast.
  return font.write({ type: outType, hinting: true }) as unknown as ArrayBuffer;
}

type Row = {
  id: string;
  name: string;          // original filename
  inType: InType;
  buf: ArrayBuffer;
  status: "idle" | "working" | "done" | "error";
  url?: string;          // object URL of the converted file
  outName?: string;
  error?: string;
};

type Strings = {
  drop: string;
  hint: string;
  outputFormat: string;
  convert: string;
  converting: string;
  download: string;
  clear: string;
  unsupported: string;
  failed: string;
  privacy: string;
};

const EN: Strings = {
  drop: "Drop font files or click to choose",
  hint: "TTF · OTF · WOFF · WOFF2 — convert several at once",
  outputFormat: "Output format",
  convert: "Convert",
  converting: "Converting…",
  download: "Download",
  clear: "Clear",
  unsupported: "Unsupported file (use TTF, OTF, WOFF or WOFF2)",
  failed: "Could not convert this font",
  privacy: "100% processed in your browser — your fonts are never uploaded.",
};

const FR: Strings = {
  drop: "Déposez des fichiers de police ou cliquez pour choisir",
  hint: "TTF · OTF · WOFF · WOFF2 — convertissez-en plusieurs à la fois",
  outputFormat: "Format de sortie",
  convert: "Convertir",
  converting: "Conversion…",
  download: "Télécharger",
  clear: "Effacer",
  unsupported: "Fichier non pris en charge (utilisez TTF, OTF, WOFF ou WOFF2)",
  failed: "Conversion impossible pour cette police",
  privacy: "Traité à 100 % dans votre navigateur — vos polices ne sont jamais envoyées.",
};

const ES: Strings = {
  drop: "Suelta archivos de fuente o haz clic para elegir",
  hint: "TTF · OTF · WOFF · WOFF2 — convierte varias a la vez",
  outputFormat: "Formato de salida",
  convert: "Convertir",
  converting: "Convirtiendo…",
  download: "Descargar",
  clear: "Borrar",
  unsupported: "Archivo no compatible (usa TTF, OTF, WOFF o WOFF2)",
  failed: "No se pudo convertir esta fuente",
  privacy: "100 % procesado en tu navegador: tus fuentes nunca se suben.",
};

const PT: Strings = {
  drop: "Solte arquivos de fonte ou clique para escolher",
  hint: "TTF · OTF · WOFF · WOFF2 — converta várias de uma vez",
  outputFormat: "Formato de saída",
  convert: "Converter",
  converting: "Convertendo…",
  download: "Baixar",
  clear: "Limpar",
  unsupported: "Arquivo não suportado (use TTF, OTF, WOFF ou WOFF2)",
  failed: "Não foi possível converter esta fonte",
  privacy: "100% processado no seu navegador — suas fontes nunca são enviadas.",
};

const DE: Strings = {
  drop: "Schriftdateien ablegen oder zum Auswählen klicken",
  hint: "TTF · OTF · WOFF · WOFF2 — mehrere auf einmal konvertieren",
  outputFormat: "Ausgabeformat",
  convert: "Konvertieren",
  converting: "Konvertiere…",
  download: "Herunterladen",
  clear: "Leeren",
  unsupported: "Nicht unterstützte Datei (nutze TTF, OTF, WOFF oder WOFF2)",
  failed: "Diese Schrift konnte nicht konvertiert werden",
  privacy: "100 % im Browser verarbeitet — deine Schriften werden nie hochgeladen.",
};

const IT: Strings = {
  drop: "Trascina i file di font o clicca per scegliere",
  hint: "TTF · OTF · WOFF · WOFF2 — convertine più di uno alla volta",
  outputFormat: "Formato di output",
  convert: "Converti",
  converting: "Conversione…",
  download: "Scarica",
  clear: "Cancella",
  unsupported: "File non supportato (usa TTF, OTF, WOFF o WOFF2)",
  failed: "Impossibile convertire questo font",
  privacy: "Elaborato al 100% nel tuo browser — i tuoi font non vengono mai caricati.",
};

const NL: Strings = {
  drop: "Sleep lettertypebestanden of klik om te kiezen",
  hint: "TTF · OTF · WOFF · WOFF2 — converteer er meerdere tegelijk",
  outputFormat: "Uitvoerformaat",
  convert: "Converteren",
  converting: "Converteren…",
  download: "Downloaden",
  clear: "Wissen",
  unsupported: "Niet-ondersteund bestand (gebruik TTF, OTF, WOFF of WOFF2)",
  failed: "Dit lettertype kon niet worden geconverteerd",
  privacy: "100% verwerkt in je browser — je lettertypen worden nooit geüpload.",
};

const JA: Strings = {
  drop: "フォントファイルをドロップまたはクリックして選択",
  hint: "TTF · OTF · WOFF · WOFF2 — 複数を一度に変換",
  outputFormat: "出力フォーマット",
  convert: "変換",
  converting: "変換中…",
  download: "ダウンロード",
  clear: "クリア",
  unsupported: "対応していないファイルです（TTF、OTF、WOFF、WOFF2 を使用）",
  failed: "このフォントを変換できませんでした",
  privacy: "100% ブラウザ内で処理 — フォントがアップロードされることはありません。",
};

const ZH: Strings = {
  drop: "拖放字体文件或点击选择",
  hint: "TTF · OTF · WOFF · WOFF2 — 一次转换多个",
  outputFormat: "输出格式",
  convert: "转换",
  converting: "转换中…",
  download: "下载",
  clear: "清除",
  unsupported: "不支持的文件（请使用 TTF、OTF、WOFF 或 WOFF2）",
  failed: "无法转换此字体",
  privacy: "100% 在您的浏览器中处理 — 您的字体绝不会被上传。",
};

const KO: Strings = {
  drop: "글꼴 파일을 끌어다 놓거나 클릭하여 선택",
  hint: "TTF · OTF · WOFF · WOFF2 — 여러 개를 한 번에 변환",
  outputFormat: "출력 형식",
  convert: "변환",
  converting: "변환 중…",
  download: "다운로드",
  clear: "지우기",
  unsupported: "지원하지 않는 파일입니다 (TTF, OTF, WOFF 또는 WOFF2 사용)",
  failed: "이 글꼴을 변환할 수 없습니다",
  privacy: "100% 브라우저에서 처리 — 글꼴은 절대 업로드되지 않습니다.",
};

const AR: Strings = {
  drop: "أفلت ملفات الخطوط أو انقر للاختيار",
  hint: "TTF · OTF · WOFF · WOFF2 — حوّل عدة ملفات دفعة واحدة",
  outputFormat: "صيغة الإخراج",
  convert: "تحويل",
  converting: "جارٍ التحويل…",
  download: "تنزيل",
  clear: "مسح",
  unsupported: "ملف غير مدعوم (استخدم TTF أو OTF أو WOFF أو WOFF2)",
  failed: "تعذّر تحويل هذا الخط",
  privacy: "تتم المعالجة 100% في متصفحك — لا يتم رفع خطوطك أبدًا.",
};

const RU: Strings = {
  drop: "Перетащите файлы шрифтов или нажмите, чтобы выбрать",
  hint: "TTF · OTF · WOFF · WOFF2 — конвертируйте несколько сразу",
  outputFormat: "Формат вывода",
  convert: "Конвертировать",
  converting: "Конвертация…",
  download: "Скачать",
  clear: "Очистить",
  unsupported: "Неподдерживаемый файл (используйте TTF, OTF, WOFF или WOFF2)",
  failed: "Не удалось конвертировать этот шрифт",
  privacy: "100% обрабатывается в вашем браузере — ваши шрифты никогда не загружаются.",
};

const HI: Strings = {
  drop: "फ़ॉन्ट फ़ाइलें छोड़ें या चुनने के लिए क्लिक करें",
  hint: "TTF · OTF · WOFF · WOFF2 — एक साथ कई बदलें",
  outputFormat: "आउटपुट प्रारूप",
  convert: "बदलें",
  converting: "बदला जा रहा है…",
  download: "डाउनलोड करें",
  clear: "साफ़ करें",
  unsupported: "असमर्थित फ़ाइल (TTF, OTF, WOFF या WOFF2 का उपयोग करें)",
  failed: "इस फ़ॉन्ट को बदला नहीं जा सका",
  privacy: "100% आपके ब्राउज़र में संसाधित — आपके फ़ॉन्ट कभी अपलोड नहीं होते।",
};

const TR: Strings = {
  drop: "Yazı tipi dosyalarını bırakın veya seçmek için tıklayın",
  hint: "TTF · OTF · WOFF · WOFF2 — birden fazlasını bir kerede dönüştürün",
  outputFormat: "Çıktı biçimi",
  convert: "Dönüştür",
  converting: "Dönüştürülüyor…",
  download: "İndir",
  clear: "Temizle",
  unsupported: "Desteklenmeyen dosya (TTF, OTF, WOFF veya WOFF2 kullanın)",
  failed: "Bu yazı tipi dönüştürülemedi",
  privacy: "%100 tarayıcınızda işlenir — yazı tipleriniz asla yüklenmez.",
};

const ID: Strings = {
  drop: "Letakkan file font atau klik untuk memilih",
  hint: "TTF · OTF · WOFF · WOFF2 — konversi beberapa sekaligus",
  outputFormat: "Format keluaran",
  convert: "Konversi",
  converting: "Mengonversi…",
  download: "Unduh",
  clear: "Hapus",
  unsupported: "File tidak didukung (gunakan TTF, OTF, WOFF, atau WOFF2)",
  failed: "Tidak dapat mengonversi font ini",
  privacy: "100% diproses di peramban Anda — font Anda tidak pernah diunggah.",
};

const VI: Strings = {
  drop: "Thả tệp phông chữ hoặc nhấp để chọn",
  hint: "TTF · OTF · WOFF · WOFF2 — chuyển đổi nhiều tệp cùng lúc",
  outputFormat: "Định dạng đầu ra",
  convert: "Chuyển đổi",
  converting: "Đang chuyển đổi…",
  download: "Tải xuống",
  clear: "Xóa",
  unsupported: "Tệp không được hỗ trợ (dùng TTF, OTF, WOFF hoặc WOFF2)",
  failed: "Không thể chuyển đổi phông chữ này",
  privacy: "Xử lý 100% trong trình duyệt của bạn — phông chữ của bạn không bao giờ được tải lên.",
};

const SV: Strings = {
  drop: "Släpp teckensnittsfiler eller klicka för att välja",
  hint: "TTF · OTF · WOFF · WOFF2 — konvertera flera samtidigt",
  outputFormat: "Utdataformat",
  convert: "Konvertera",
  converting: "Konverterar…",
  download: "Ladda ner",
  clear: "Rensa",
  unsupported: "Filformatet stöds inte (använd TTF, OTF, WOFF eller WOFF2)",
  failed: "Det gick inte att konvertera det här teckensnittet",
  privacy: "100 % bearbetas i din webbläsare — dina teckensnitt laddas aldrig upp.",
};

const PL: Strings = {
  drop: "Upuść pliki czcionek lub kliknij, aby wybrać",
  hint: "TTF · OTF · WOFF · WOFF2 — konwertuj kilka naraz",
  outputFormat: "Format wyjściowy",
  convert: "Konwertuj",
  converting: "Konwertowanie…",
  download: "Pobierz",
  clear: "Wyczyść",
  unsupported: "Nieobsługiwany plik (użyj TTF, OTF, WOFF lub WOFF2)",
  failed: "Nie można przekonwertować tej czcionki",
  privacy: "100% przetwarzane w Twojej przeglądarce — Twoje czcionki nigdy nie są przesyłane.",
};

const UK: Strings = {
  drop: "Перетягніть файли шрифтів або натисніть, щоб вибрати",
  hint: "TTF · OTF · WOFF · WOFF2 — конвертуйте кілька одночасно",
  outputFormat: "Формат виводу",
  convert: "Конвертувати",
  converting: "Конвертація…",
  download: "Завантажити",
  clear: "Очистити",
  unsupported: "Непідтримуваний файл (використовуйте TTF, OTF, WOFF або WOFF2)",
  failed: "Не вдалося конвертувати цей шрифт",
  privacy: "100% обробляється у вашому браузері — ваші шрифти ніколи не завантажуються.",
};

const CS: Strings = {
  drop: "Přetáhněte soubory písem nebo klikněte pro výběr",
  hint: "TTF · OTF · WOFF · WOFF2 — převeďte několik najednou",
  outputFormat: "Výstupní formát",
  convert: "Převést",
  converting: "Převádím…",
  download: "Stáhnout",
  clear: "Vymazat",
  unsupported: "Nepodporovaný soubor (použijte TTF, OTF, WOFF nebo WOFF2)",
  failed: "Toto písmo se nepodařilo převést",
  privacy: "100 % zpracováno ve vašem prohlížeči — vaše písma se nikdy nenahrávají.",
};

const TABLE: Partial<Record<Locale, Strings>> = {
  en: EN, fr: FR, es: ES, pt: PT, de: DE, it: IT, nl: NL, ja: JA, zh: ZH,
  ko: KO, ar: AR, ru: RU, hi: HI, tr: TR, id: ID, vi: VI, sv: SV, pl: PL,
  uk: UK, cs: CS,
};

export function FontConverterClient() {
  const locale = useLocale();
  const t = TABLE[locale] ?? EN;
  const [rows, setRows] = useState<Row[]>([]);
  const [out, setOut] = useState<OutType>("woff2");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function addFiles(files: FileList | null) {
    if (!files) return;
    const next: Row[] = [];
    for (const f of Array.from(files)) {
      const inType = inTypeFromName(f.name);
      if (!inType) {
        next.push({ id: crypto.randomUUID(), name: f.name, inType: "ttf", buf: new ArrayBuffer(0), status: "error", error: t.unsupported });
        continue;
      }
      next.push({ id: crypto.randomUUID(), name: f.name, inType, buf: await f.arrayBuffer(), status: "idle" });
    }
    setRows((p) => [...p, ...next]);
  }

  async function convertAll() {
    setBusy(true);
    for (const row of rows) {
      if (row.status !== "idle") continue;
      setRows((p) => p.map((r) => (r.id === row.id ? { ...r, status: "working" } : r)));
      try {
        const outBuf = await convertFont(row.buf, row.inType, out);
        const url = URL.createObjectURL(new Blob([outBuf], { type: OUT_MIME[out] }));
        const outName = `${row.name.replace(/\.[^.]+$/, "")}.${out}`;
        setRows((p) => p.map((r) => (r.id === row.id ? { ...r, status: "done", url, outName } : r)));
      } catch {
        setRows((p) => p.map((r) => (r.id === row.id ? { ...r, status: "error", error: t.failed } : r)));
      }
    }
    setBusy(false);
  }

  function remove(id: string) {
    setRows((p) => {
      const r = p.find((x) => x.id === id);
      if (r?.url) URL.revokeObjectURL(r.url);
      return p.filter((x) => x.id !== id);
    });
  }

  function clearAll() {
    rows.forEach((r) => r.url && URL.revokeObjectURL(r.url));
    setRows([]);
  }

  const pending = rows.some((r) => r.status === "idle");

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        className="cursor-pointer rounded-xl border-2 border-dashed border-ink-200 bg-white px-6 py-10 text-center transition-colors hover:border-brand-400"
      >
        <Type className="mx-auto h-8 w-8 text-brand-500" />
        <p className="mt-3 font-medium text-ink-900">{t.drop}</p>
        <p className="mt-1 text-sm text-ink-500">{t.hint}</p>
        <input
          ref={inputRef}
          type="file"
          accept=".ttf,.otf,.woff,.woff2,font/ttf,font/otf,font/woff,font/woff2"
          multiple
          hidden
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-ink-700">{t.outputFormat}</span>
          <select
            value={out}
            onChange={(e) => setOut(e.target.value as OutType)}
            className="rounded-md border border-ink-200 bg-white px-3 py-2 text-sm"
          >
            <option value="woff2">WOFF2</option>
            <option value="woff">WOFF</option>
            <option value="ttf">TTF</option>
          </select>
        </label>
        <Button onClick={convertAll} disabled={busy || !pending}>
          {busy ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
          {busy ? t.converting : t.convert}
        </Button>
        {rows.length > 0 && (
          <Button variant="outline" onClick={clearAll} disabled={busy}>{t.clear}</Button>
        )}
      </div>

      {rows.length > 0 && (
        <ul className="divide-y divide-ink-100 rounded-lg border border-ink-100 bg-white">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3 px-4 py-3 text-sm">
              <Type className="h-4 w-4 shrink-0 text-ink-400" />
              <span className="min-w-0 flex-1 truncate text-ink-800">
                {r.name}
                <span className="ml-2 text-xs uppercase text-ink-400">{r.inType} → {out}</span>
              </span>
              {r.status === "error" && <span className="text-xs text-red-600">{r.error}</span>}
              {r.status === "working" && <Loader2 className="h-4 w-4 animate-spin text-ink-400" />}
              {r.status === "done" && r.url && (
                <a
                  href={r.url}
                  download={r.outName}
                  className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                >
                  <Download className="h-3.5 w-3.5" /> {t.download}
                </a>
              )}
              <button onClick={() => remove(r.id)} className="text-ink-300 hover:text-ink-600" aria-label="remove">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className={cn("text-xs text-ink-400")}>{t.privacy}</p>
    </div>
  );
}
