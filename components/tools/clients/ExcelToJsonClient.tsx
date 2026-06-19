"use client";

import { useState } from "react";
import { Upload, X, Copy, Check, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { safeReadWorkbook, loadXlsx, sanitizeParsed } from "@/lib/safe-xlsx";
import { useLocale } from "@/hooks/useLocale";

type Mode = "rows" | "matrix";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadXlsx: "Upload an .xlsx or .xls",
    uploadHint: "Parsed in your browser via SheetJS",
    sheet: "Sheet",
    format: "Format",
    prettyPrint: "Pretty-print",
    formatRows: "Array of objects (first row = headers)",
    formatMatrix: "Array of arrays (raw rows)",
    parsing: "Parsing…",
    copied: "Copied",
    copy: "Copy",
    downloadJson: "Download .json",
    errorRead: "Could not read the spreadsheet: ",
    errorConvert: "Could not convert: ",
    privacy: "100% in your browser via SheetJS — your spreadsheet is never uploaded.",
  },
  fr: {
    uploadXlsx: "Téléverser un .xlsx ou .xls",
    uploadHint: "Analysé dans votre navigateur via SheetJS",
    sheet: "Feuille",
    format: "Format",
    prettyPrint: "Mise en forme",
    formatRows: "Tableau d'objets (première ligne = en-têtes)",
    formatMatrix: "Tableau de tableaux (lignes brutes)",
    parsing: "Analyse…",
    copied: "Copié",
    copy: "Copier",
    downloadJson: "Télécharger .json",
    errorRead: "Impossible de lire le tableur : ",
    errorConvert: "Impossible de convertir : ",
    privacy: "100 % dans votre navigateur via SheetJS — votre tableur n'est jamais envoyé.",
  },
  es: {
    uploadXlsx: "Subir un .xlsx o .xls",
    uploadHint: "Analizado en tu navegador via SheetJS",
    sheet: "Hoja",
    format: "Formato",
    prettyPrint: "Formato legible",
    formatRows: "Array de objetos (primera fila = encabezados)",
    formatMatrix: "Array de arrays (filas sin procesar)",
    parsing: "Analizando…",
    copied: "Copiado",
    copy: "Copiar",
    downloadJson: "Descargar .json",
    errorRead: "No se pudo leer la hoja de cálculo: ",
    errorConvert: "No se pudo convertir: ",
    privacy: "100 % en tu navegador con SheetJS — tu hoja de cálculo nunca se sube.",
  },
  pt: {
    uploadXlsx: "Enviar um .xlsx ou .xls",
    uploadHint: "Analisado no seu navegador via SheetJS",
    sheet: "Planilha",
    format: "Formato",
    prettyPrint: "Formatação legível",
    formatRows: "Array de objetos (primeira linha = cabeçalhos)",
    formatMatrix: "Array de arrays (linhas brutas)",
    parsing: "Analisando…",
    copied: "Copiado",
    copy: "Copiar",
    downloadJson: "Baixar .json",
    errorRead: "Não foi possível ler a planilha: ",
    errorConvert: "Não foi possível converter: ",
    privacy: "100% no seu navegador via SheetJS — sua planilha nunca é enviada.",
  },
  de: {
    uploadXlsx: ".xlsx oder .xls hochladen",
    uploadHint: "Im Browser via SheetJS geparst",
    sheet: "Tabelle",
    format: "Format",
    prettyPrint: "Formatiert",
    formatRows: "Array von Objekten (erste Zeile = Kopfzeilen)",
    formatMatrix: "Array von Arrays (Rohdaten)",
    parsing: "Parsen…",
    copied: "Kopiert",
    copy: "Kopieren",
    downloadJson: ".json herunterladen",
    errorRead: "Tabellenkalkulation konnte nicht gelesen werden: ",
    errorConvert: "Konvertierung fehlgeschlagen: ",
    privacy: "100 % im Browser via SheetJS — Ihre Tabellenkalkulation wird nie hochgeladen.",
  },
  it: {
    uploadXlsx: "Carica un .xlsx o .xls",
    uploadHint: "Analizzato nel browser via SheetJS",
    sheet: "Foglio",
    format: "Formato",
    prettyPrint: "Formattazione leggibile",
    formatRows: "Array di oggetti (prima riga = intestazioni)",
    formatMatrix: "Array di array (righe grezze)",
    parsing: "Analisi…",
    copied: "Copiato",
    copy: "Copia",
    downloadJson: "Scarica .json",
    errorRead: "Impossibile leggere il foglio di calcolo: ",
    errorConvert: "Impossibile convertire: ",
    privacy: "100% nel tuo browser via SheetJS — il tuo foglio di calcolo non viene mai caricato.",
  },
  nl: {
    uploadXlsx: "Een .xlsx of .xls uploaden",
    uploadHint: "Geparsed in uw browser via SheetJS",
    sheet: "Blad",
    format: "Formaat",
    prettyPrint: "Opmaak",
    formatRows: "Array van objecten (eerste rij = koppen)",
    formatMatrix: "Array van arrays (ruwe rijen)",
    parsing: "Parseren…",
    copied: "Gekopieerd",
    copy: "Kopiëren",
    downloadJson: ".json downloaden",
    errorRead: "Kon de spreadsheet niet lezen: ",
    errorConvert: "Kon niet converteren: ",
    privacy: "100% in uw browser via SheetJS — uw spreadsheet wordt nooit geüpload.",
  },
  ja: {
    uploadXlsx: ".xlsx または .xls をアップロード",
    uploadHint: "SheetJS でブラウザ内で解析",
    sheet: "シート",
    format: "フォーマット",
    prettyPrint: "整形",
    formatRows: "オブジェクトの配列（先頭行 = ヘッダー）",
    formatMatrix: "配列の配列（生データ）",
    parsing: "解析中…",
    copied: "コピー済み",
    copy: "コピー",
    downloadJson: ".json をダウンロード",
    errorRead: "スプレッドシートを読み込めませんでした: ",
    errorConvert: "変換できませんでした: ",
    privacy: "SheetJS でブラウザ内で100%処理 — スプレッドシートは決してアップロードされません。",
  },
  zh: {
    uploadXlsx: "上传 .xlsx 或 .xls",
    uploadHint: "通过 SheetJS 在您的浏览器中解析",
    sheet: "工作表",
    format: "格式",
    prettyPrint: "格式化输出",
    formatRows: "对象数组（第一行 = 标题）",
    formatMatrix: "数组的数组（原始行）",
    parsing: "解析中…",
    copied: "已复制",
    copy: "复制",
    downloadJson: "下载 .json",
    errorRead: "无法读取电子表格：",
    errorConvert: "无法转换：",
    privacy: "100% 在您的浏览器中通过 SheetJS 处理 — 您的电子表格永远不会被上传。",
  },
  ko: {
    uploadXlsx: ".xlsx 또는 .xls 업로드",
    uploadHint: "SheetJS를 통해 브라우저에서 파싱",
    sheet: "시트",
    format: "형식",
    prettyPrint: "보기 좋게 출력",
    formatRows: "객체 배열 (첫 번째 행 = 헤더)",
    formatMatrix: "배열의 배열 (원시 행)",
    parsing: "파싱 중…",
    copied: "복사됨",
    copy: "복사",
    downloadJson: ".json 다운로드",
    errorRead: "스프레드시트를 읽을 수 없습니다: ",
    errorConvert: "변환할 수 없습니다: ",
    privacy: "SheetJS를 통해 브라우저에서 100% 처리 — 스프레드시트는 절대 업로드되지 않습니다.",
  },
  ar: {
    uploadXlsx: "رفع ملف .xlsx أو .xls",
    uploadHint: "يُحلَّل في متصفحك عبر SheetJS",
    sheet: "الورقة",
    format: "التنسيق",
    prettyPrint: "تنسيق جميل",
    formatRows: "مصفوفة كائنات (الصف الأول = رؤوس الأعمدة)",
    formatMatrix: "مصفوفة مصفوفات (صفوف خام)",
    parsing: "جاري التحليل…",
    copied: "تم النسخ",
    copy: "نسخ",
    downloadJson: "تنزيل .json",
    errorRead: "تعذّر قراءة جدول البيانات: ",
    errorConvert: "تعذّر التحويل: ",
    privacy: "معالجة 100% في متصفحك عبر SheetJS — لن يتم رفع جدول البيانات مطلقًا.",
  },
  ru: {
    uploadXlsx: "Загрузить .xlsx или .xls",
    uploadHint: "Разбирается в браузере через SheetJS",
    sheet: "Лист",
    format: "Формат",
    prettyPrint: "Форматированный вывод",
    formatRows: "Массив объектов (первая строка = заголовки)",
    formatMatrix: "Массив массивов (сырые строки)",
    parsing: "Разбор…",
    copied: "Скопировано",
    copy: "Копировать",
    downloadJson: "Скачать .json",
    errorRead: "Не удалось прочитать таблицу: ",
    errorConvert: "Не удалось конвертировать: ",
    privacy: "100% в вашем браузере через SheetJS — ваша таблица никогда не загружается.",
  },
  hi: {
    uploadXlsx: ".xlsx या .xls अपलोड करें",
    uploadHint: "SheetJS के माध्यम से आपके ब्राउज़र में पार्स",
    sheet: "शीट",
    format: "प्रारूप",
    prettyPrint: "सुंदर प्रिंट",
    formatRows: "ऑब्जेक्ट सरणी (पहली पंक्ति = शीर्षक)",
    formatMatrix: "सरणियों की सरणी (कच्ची पंक्तियाँ)",
    parsing: "पार्स हो रहा है…",
    copied: "कॉपी किया गया",
    copy: "कॉपी करें",
    downloadJson: ".json डाउनलोड करें",
    errorRead: "स्प्रेडशीट नहीं पढ़ी जा सकी: ",
    errorConvert: "रूपांतरित नहीं किया जा सका: ",
    privacy: "SheetJS के जरिए आपके ब्राउज़र में 100% — आपकी स्प्रेडशीट कभी अपलोड नहीं होती।",
  },
  tr: {
    uploadXlsx: ".xlsx veya .xls yükle",
    uploadHint: "SheetJS aracılığıyla tarayıcınızda ayrıştırılır",
    sheet: "Sayfa",
    format: "Biçim",
    prettyPrint: "Güzel yazdır",
    formatRows: "Nesne dizisi (ilk satır = başlıklar)",
    formatMatrix: "Dizi dizisi (ham satırlar)",
    parsing: "Ayrıştırılıyor…",
    copied: "Kopyalandı",
    copy: "Kopyala",
    downloadJson: ".json indir",
    errorRead: "Elektronik tablo okunamadı: ",
    errorConvert: "Dönüştürülemedi: ",
    privacy: "SheetJS aracılığıyla tarayıcınızda %100 işlenir — elektronik tablonuz asla yüklenmez.",
  },
  id: {
    uploadXlsx: "Unggah .xlsx atau .xls",
    uploadHint: "Diurai di browser Anda melalui SheetJS",
    sheet: "Lembar",
    format: "Format",
    prettyPrint: "Cetak rapi",
    formatRows: "Array objek (baris pertama = header)",
    formatMatrix: "Array dari array (baris mentah)",
    parsing: "Mengurai…",
    copied: "Disalin",
    copy: "Salin",
    downloadJson: "Unduh .json",
    errorRead: "Tidak dapat membaca spreadsheet: ",
    errorConvert: "Tidak dapat mengonversi: ",
    privacy: "100% diproses di browser Anda melalui SheetJS — spreadsheet Anda tidak pernah diunggah.",
  },
  vi: {
    uploadXlsx: "Tải lên .xlsx hoặc .xls",
    uploadHint: "Phân tích trong trình duyệt của bạn qua SheetJS",
    sheet: "Trang tính",
    format: "Định dạng",
    prettyPrint: "In đẹp",
    formatRows: "Mảng đối tượng (hàng đầu = tiêu đề)",
    formatMatrix: "Mảng của mảng (hàng thô)",
    parsing: "Đang phân tích…",
    copied: "Đã sao chép",
    copy: "Sao chép",
    downloadJson: "Tải .json",
    errorRead: "Không thể đọc bảng tính: ",
    errorConvert: "Không thể chuyển đổi: ",
    privacy: "100% xử lý trong trình duyệt của bạn qua SheetJS — bảng tính của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadXlsx: "Ladda upp .xlsx eller .xls",
    uploadHint: "Parsas i din webbläsare via SheetJS",
    sheet: "Blad",
    format: "Format",
    prettyPrint: "Snyggt skriv ut",
    formatRows: "Array av objekt (första raden = rubriker)",
    formatMatrix: "Array av arrayer (rådata)",
    parsing: "Parserar…",
    copied: "Kopierat",
    copy: "Kopiera",
    downloadJson: "Ladda ned .json",
    errorRead: "Kunde inte läsa kalkylbladet: ",
    errorConvert: "Kunde inte konvertera: ",
    privacy: "100% bearbetas i din webbläsare via SheetJS — ditt kalkylblad laddas aldrig upp.",
  },
  pl: {
    uploadXlsx: "Prześlij .xlsx lub .xls",
    uploadHint: "Parsowane w przeglądarce przez SheetJS",
    sheet: "Arkusz",
    format: "Format",
    prettyPrint: "Ładne drukowanie",
    formatRows: "Tablica obiektów (pierwszy wiersz = nagłówki)",
    formatMatrix: "Tablica tablic (surowe wiersze)",
    parsing: "Parsowanie…",
    copied: "Skopiowano",
    copy: "Kopiuj",
    downloadJson: "Pobierz .json",
    errorRead: "Nie można odczytać arkusza kalkulacyjnego: ",
    errorConvert: "Nie można skonwertować: ",
    privacy: "100% przetwarzane w przeglądarce przez SheetJS — Twój arkusz nigdy nie jest przesyłany.",
  },
  uk: {
    uploadXlsx: "Завантажити .xlsx або .xls",
    uploadHint: "Розбирається у браузері через SheetJS",
    sheet: "Аркуш",
    format: "Формат",
    prettyPrint: "Форматований вивід",
    formatRows: "Масив об'єктів (перший рядок = заголовки)",
    formatMatrix: "Масив масивів (сирі рядки)",
    parsing: "Розбір…",
    copied: "Скопійовано",
    copy: "Копіювати",
    downloadJson: "Завантажити .json",
    errorRead: "Не вдалося прочитати таблицю: ",
    errorConvert: "Не вдалося конвертувати: ",
    privacy: "100% у вашому браузері через SheetJS — ваша таблиця ніколи не завантажується.",
  },
  cs: {
    uploadXlsx: "Nahrát .xlsx nebo .xls",
    uploadHint: "Zpracováno ve vašem prohlížeči přes SheetJS",
    sheet: "List",
    format: "Formát",
    prettyPrint: "Hezký tisk",
    formatRows: "Pole objektů (první řádek = záhlaví)",
    formatMatrix: "Pole polí (surová data)",
    parsing: "Parsování…",
    copied: "Zkopírováno",
    copy: "Kopírovat",
    downloadJson: "Stáhnout .json",
    errorRead: "Tabulku se nepodařilo načíst: ",
    errorConvert: "Konverze selhala: ",
    privacy: "100% zpracováno ve vašem prohlížeči přes SheetJS — vaše tabulka se nikdy nenahrává.",
  },
};

export function ExcelToJsonClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("rows");
  const [pretty, setPretty] = useState(true);
  const [sheet, setSheet] = useState<string>("");
  const [sheets, setSheets] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function pick(f: File | null) {
    if (!f) return;
    setFile(f); setError(null); setOutput(""); setBusy(true);
    try {
      const data = new Uint8Array(await f.arrayBuffer());
      // cellDates so date cells parse to JS Dates (→ ISO strings in JSON) instead
      // of raw Excel serial numbers like 45672.
      const { wb } = await safeReadWorkbook(data, { cellDates: true });
      setSheets(wb.SheetNames);
      const first = wb.SheetNames[0];
      setSheet(first);
      convert(wb, first, mode, pretty);
    } catch (e) {
      setError(`${s.errorRead}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function convert(wb: { Sheets: Record<string, unknown> }, sheetName: string, m: Mode, p: boolean) {
    try {
      const xlsx = await loadXlsx();
      const ws = wb.Sheets[sheetName];
      if (!ws) { setOutput(""); return; }
      let json: unknown;
      if (m === "matrix") {
        json = sanitizeParsed(xlsx.utils.sheet_to_json(ws as never, { header: 1, defval: null, blankrows: false }));
      } else {
        json = sanitizeParsed(xlsx.utils.sheet_to_json(ws as never, { defval: null, blankrows: false }));
      }
      setOutput(p ? JSON.stringify(json, null, 2) : JSON.stringify(json));
    } catch (e) {
      setError(`${s.errorConvert}${(e as Error).message}`);
    }
  }

  // Overrides are passed explicitly because the calling setState (setSheet/setMode/
  // setPretty) hasn't applied yet when this runs — reading component state here would
  // use the previous value and render the wrong sheet/format.
  async function reconvert(over?: { sheet?: string; mode?: Mode; pretty?: boolean }) {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const { wb } = await safeReadWorkbook(data);
      await convert(wb, over?.sheet ?? sheet, over?.mode ?? mode, over?.pretty ?? pretty);
    } finally {
      setBusy(false);
    }
  }

  async function copyAll() {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }
  function downloadJson() {
    const blob = new Blob([output || "[]"], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (file?.name.replace(/\.[^.]+$/, "") || "data") + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-teal-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadXlsx}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutput(""); setSheets([]); }} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {sheets.length > 0 && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.sheet}
            <select value={sheet} onChange={(e) => { setSheet(e.target.value); reconvert({ sheet: e.target.value }); }} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              {sheets.map((sh) => <option key={sh} value={sh}>{sh}</option>)}
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.format}
            <select value={mode} onChange={(e) => { setMode(e.target.value as Mode); reconvert({ mode: e.target.value as Mode }); }} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="rows">{s.formatRows}</option>
              <option value="matrix">{s.formatMatrix}</option>
            </select>
          </label>
          <label className="flex items-center gap-2 self-end text-sm text-ink-700">
            <input type="checkbox" checked={pretty} onChange={(e) => { setPretty(e.target.checked); reconvert({ pretty: e.target.checked }); }} className="h-4 w-4" />
            {s.prettyPrint}
          </label>
        </div>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {s.parsing}</p>}

      {output && (
        <>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={copyAll}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? s.copied : s.copy}
            </Button>
            <Button size="sm" onClick={downloadJson}><Download className="h-3.5 w-3.5" /> {s.downloadJson}</Button>
            <span className="self-center text-xs text-ink-400">{output.length.toLocaleString()} chars</span>
          </div>
          <pre className="max-h-[28rem] overflow-auto rounded-lg border border-ink-100 bg-ink-900 p-4 font-mono text-xs leading-relaxed text-ink-50">{output}</pre>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
