"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Entry = { id: string; file: File; rows: string[][]; headers: string[] };

function parseCsv(text: string): string[][] {
  // Minimal RFC-4180 parser: quotes, escaped quotes, commas inside quotes, CRLF.
  const out: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; } else inQuotes = false;
      } else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); out.push(row); row = []; cur = ""; }
      else if (c === "\r") { /* swallow */ }
      else cur += c;
    }
  }
  if (cur.length || row.length) { row.push(cur); out.push(row); }
  // Drop only genuine blank lines (a lone empty cell). A structural all-empty row
  // like `,,` parses to ["","",""] and is a real record — keep it so column
  // alignment and row counts stay correct.
  return out.filter((r) => !(r.length === 1 && r[0] === ""));
}
function toCsv(rows: string[][]): string {
  return rows.map((r) => r.map((c) => /[,"\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c).join(",")).join("\n") + "\n";
}

const T: Record<string, Record<string, string>> = {
  en: {
    addCsvFiles: "Add CSV files",
    addHint: "Parsed and merged in your browser",
    mergeMode: "Merge mode",
    modeByName: "Align columns by header name (recommended)",
    modeStack: "Just stack rows (keep first file's headers)",
    parsing: "Parsing…",
    downloadMerged: "Download merged.csv",
    rowsCols: "rows",
    cols: "cols",
    errorRead: "Could not read CSV: ",
    privacy: "100% in your browser — your CSVs are never uploaded.",
  },
  fr: {
    addCsvFiles: "Ajouter des fichiers CSV",
    addHint: "Analysés et fusionnés dans votre navigateur",
    mergeMode: "Mode de fusion",
    modeByName: "Aligner les colonnes par nom d'en-tête (recommandé)",
    modeStack: "Empiler les lignes (conserver les en-têtes du premier fichier)",
    parsing: "Analyse…",
    downloadMerged: "Télécharger merged.csv",
    rowsCols: "lignes",
    cols: "cols",
    errorRead: "Impossible de lire le CSV : ",
    privacy: "100 % dans votre navigateur — vos CSV ne sont jamais envoyés.",
  },
  es: {
    addCsvFiles: "Agregar archivos CSV",
    addHint: "Analizados y fusionados en tu navegador",
    mergeMode: "Modo de fusión",
    modeByName: "Alinear columnas por nombre de encabezado (recomendado)",
    modeStack: "Solo apilar filas (conservar encabezados del primer archivo)",
    parsing: "Analizando…",
    downloadMerged: "Descargar merged.csv",
    rowsCols: "filas",
    cols: "cols",
    errorRead: "No se pudo leer el CSV: ",
    privacy: "100 % en tu navegador — tus archivos CSV nunca se suben.",
  },
  pt: {
    addCsvFiles: "Adicionar arquivos CSV",
    addHint: "Analisados e mesclados no seu navegador",
    mergeMode: "Modo de mesclagem",
    modeByName: "Alinhar colunas pelo nome do cabeçalho (recomendado)",
    modeStack: "Apenas empilhar linhas (manter cabeçalhos do primeiro arquivo)",
    parsing: "Analisando…",
    downloadMerged: "Baixar merged.csv",
    rowsCols: "linhas",
    cols: "cols",
    errorRead: "Não foi possível ler o CSV: ",
    privacy: "100% no seu navegador — seus arquivos CSV nunca são enviados.",
  },
  de: {
    addCsvFiles: "CSV-Dateien hinzufügen",
    addHint: "Im Browser geparst und zusammengeführt",
    mergeMode: "Zusammenführungsmodus",
    modeByName: "Spalten nach Kopfzeilenname ausrichten (empfohlen)",
    modeStack: "Nur Zeilen stapeln (Kopfzeilen der ersten Datei behalten)",
    parsing: "Parsen…",
    downloadMerged: "merged.csv herunterladen",
    rowsCols: "Zeilen",
    cols: "Spalten",
    errorRead: "CSV konnte nicht gelesen werden: ",
    privacy: "100 % im Browser — Ihre CSV-Dateien werden nie hochgeladen.",
  },
  it: {
    addCsvFiles: "Aggiungi file CSV",
    addHint: "Analizzati e uniti nel browser",
    mergeMode: "Modalità di unione",
    modeByName: "Allinea colonne per nome intestazione (consigliato)",
    modeStack: "Impila le righe (mantieni le intestazioni del primo file)",
    parsing: "Analisi…",
    downloadMerged: "Scarica merged.csv",
    rowsCols: "righe",
    cols: "col",
    errorRead: "Impossibile leggere il CSV: ",
    privacy: "100% nel tuo browser — i tuoi file CSV non vengono mai caricati.",
  },
  nl: {
    addCsvFiles: "CSV-bestanden toevoegen",
    addHint: "Geparsed en samengevoegd in uw browser",
    mergeMode: "Samenvoegmodus",
    modeByName: "Kolommen uitlijnen op kolomnaam (aanbevolen)",
    modeStack: "Rijen stapelen (koppen van eerste bestand bewaren)",
    parsing: "Parseren…",
    downloadMerged: "merged.csv downloaden",
    rowsCols: "rijen",
    cols: "kol",
    errorRead: "Kon het CSV-bestand niet lezen: ",
    privacy: "100% in uw browser — uw CSV-bestanden worden nooit geüpload.",
  },
  ja: {
    addCsvFiles: "CSV ファイルを追加",
    addHint: "ブラウザ内で解析・結合",
    mergeMode: "結合モード",
    modeByName: "ヘッダー名で列を揃える（推奨）",
    modeStack: "行を積み重ねる（最初のファイルのヘッダーを保持）",
    parsing: "解析中…",
    downloadMerged: "merged.csv をダウンロード",
    rowsCols: "行",
    cols: "列",
    errorRead: "CSV を読み込めませんでした: ",
    privacy: "ブラウザ内で100%処理 — CSV ファイルは決してアップロードされません。",
  },
  zh: {
    addCsvFiles: "添加 CSV 文件",
    addHint: "在您的浏览器中解析和合并",
    mergeMode: "合并模式",
    modeByName: "按标题名对齐列（推荐）",
    modeStack: "仅堆叠行（保留第一个文件的标题）",
    parsing: "解析中…",
    downloadMerged: "下载 merged.csv",
    rowsCols: "行",
    cols: "列",
    errorRead: "无法读取 CSV：",
    privacy: "100% 在您的浏览器中处理 — 您的 CSV 文件永远不会被上传。",
  },
  ko: {
    addCsvFiles: "CSV 파일 추가",
    addHint: "브라우저에서 파싱 및 병합",
    mergeMode: "병합 모드",
    modeByName: "헤더 이름으로 열 정렬 (권장)",
    modeStack: "행만 쌓기 (첫 번째 파일의 헤더 유지)",
    parsing: "파싱 중…",
    downloadMerged: "merged.csv 다운로드",
    rowsCols: "행",
    cols: "열",
    errorRead: "CSV를 읽을 수 없습니다: ",
    privacy: "브라우저에서 100% 처리 — CSV 파일은 절대 업로드되지 않습니다.",
  },
  ar: {
    addCsvFiles: "إضافة ملفات CSV",
    addHint: "يُحلَّل ويُدمَج في متصفحك",
    mergeMode: "وضع الدمج",
    modeByName: "محاذاة الأعمدة حسب اسم العنوان (مُوصى به)",
    modeStack: "تكديس الصفوف فقط (الاحتفاظ بعناوين الملف الأول)",
    parsing: "جاري التحليل…",
    downloadMerged: "تنزيل merged.csv",
    rowsCols: "صفوف",
    cols: "أعمدة",
    errorRead: "تعذّر قراءة CSV: ",
    privacy: "معالجة 100% في متصفحك — لن يتم رفع ملفات CSV مطلقًا.",
  },
  ru: {
    addCsvFiles: "Добавить CSV-файлы",
    addHint: "Разбирается и объединяется в браузере",
    mergeMode: "Режим объединения",
    modeByName: "Выравнивание столбцов по имени заголовка (рекомендуется)",
    modeStack: "Просто складывать строки (сохранять заголовки первого файла)",
    parsing: "Разбор…",
    downloadMerged: "Скачать merged.csv",
    rowsCols: "строк",
    cols: "столб",
    errorRead: "Не удалось прочитать CSV: ",
    privacy: "100% в вашем браузере — ваши CSV-файлы никогда не загружаются.",
  },
  hi: {
    addCsvFiles: "CSV फ़ाइलें जोड़ें",
    addHint: "आपके ब्राउज़र में पार्स और मर्ज",
    mergeMode: "मर्ज मोड",
    modeByName: "हेडर नाम से कॉलम संरेखित करें (अनुशंसित)",
    modeStack: "केवल पंक्तियाँ जोड़ें (पहली फ़ाइल के हेडर रखें)",
    parsing: "पार्स हो रहा है…",
    downloadMerged: "merged.csv डाउनलोड करें",
    rowsCols: "पंक्तियाँ",
    cols: "कॉलम",
    errorRead: "CSV नहीं पढ़ा जा सका: ",
    privacy: "आपके ब्राउज़र में 100% — आपकी CSV फ़ाइलें कभी अपलोड नहीं होतीं।",
  },
  tr: {
    addCsvFiles: "CSV dosyaları ekle",
    addHint: "Tarayıcınızda ayrıştırılır ve birleştirilir",
    mergeMode: "Birleştirme modu",
    modeByName: "Sütunları başlık adına göre hizala (önerilen)",
    modeStack: "Sadece satırları yığ (ilk dosyanın başlıklarını koru)",
    parsing: "Ayrıştırılıyor…",
    downloadMerged: "merged.csv indir",
    rowsCols: "satır",
    cols: "sütun",
    errorRead: "CSV okunamadı: ",
    privacy: "Tarayıcınızda %100 işlenir — CSV dosyalarınız asla yüklenmez.",
  },
  id: {
    addCsvFiles: "Tambah file CSV",
    addHint: "Diurai dan digabungkan di browser Anda",
    mergeMode: "Mode penggabungan",
    modeByName: "Sejajarkan kolom berdasarkan nama header (disarankan)",
    modeStack: "Tumpuk baris saja (pertahankan header file pertama)",
    parsing: "Mengurai…",
    downloadMerged: "Unduh merged.csv",
    rowsCols: "baris",
    cols: "kol",
    errorRead: "Tidak dapat membaca CSV: ",
    privacy: "100% diproses di browser Anda — file CSV Anda tidak pernah diunggah.",
  },
  vi: {
    addCsvFiles: "Thêm tệp CSV",
    addHint: "Phân tích và ghép trong trình duyệt của bạn",
    mergeMode: "Chế độ ghép",
    modeByName: "Căn chỉnh cột theo tên tiêu đề (khuyến nghị)",
    modeStack: "Chỉ xếp chồng hàng (giữ tiêu đề của tệp đầu tiên)",
    parsing: "Đang phân tích…",
    downloadMerged: "Tải merged.csv",
    rowsCols: "hàng",
    cols: "cột",
    errorRead: "Không thể đọc CSV: ",
    privacy: "100% xử lý trong trình duyệt của bạn — tệp CSV của bạn không bao giờ được tải lên.",
  },
  sv: {
    addCsvFiles: "Lägg till CSV-filer",
    addHint: "Parsas och sammanfogas i din webbläsare",
    mergeMode: "Sammanfogningsläge",
    modeByName: "Justera kolumner efter rubriknamn (rekommenderat)",
    modeStack: "Stapla bara rader (behåll den första filens rubriker)",
    parsing: "Parserar…",
    downloadMerged: "Ladda ned merged.csv",
    rowsCols: "rader",
    cols: "kol",
    errorRead: "Kunde inte läsa CSV-filen: ",
    privacy: "100% bearbetas i din webbläsare — dina CSV-filer laddas aldrig upp.",
  },
  pl: {
    addCsvFiles: "Dodaj pliki CSV",
    addHint: "Parsowane i scalane w przeglądarce",
    mergeMode: "Tryb scalania",
    modeByName: "Wyrównaj kolumny według nazwy nagłówka (zalecane)",
    modeStack: "Tylko układaj wiersze (zachowaj nagłówki pierwszego pliku)",
    parsing: "Parsowanie…",
    downloadMerged: "Pobierz merged.csv",
    rowsCols: "wiersze",
    cols: "kol",
    errorRead: "Nie można odczytać pliku CSV: ",
    privacy: "100% przetwarzane w przeglądarce — Twoje pliki CSV nigdy nie są przesyłane.",
  },
  uk: {
    addCsvFiles: "Додати CSV-файли",
    addHint: "Розбирається і об'єднується у браузері",
    mergeMode: "Режим об'єднання",
    modeByName: "Вирівнювання стовпців за назвою заголовка (рекомендовано)",
    modeStack: "Просто складати рядки (зберігати заголовки першого файлу)",
    parsing: "Розбір…",
    downloadMerged: "Завантажити merged.csv",
    rowsCols: "рядків",
    cols: "стовп",
    errorRead: "Не вдалося прочитати CSV: ",
    privacy: "100% у вашому браузері — ваші CSV-файли ніколи не завантажуються.",
  },
  cs: {
    addCsvFiles: "Přidat soubory CSV",
    addHint: "Parsováno a sloučeno ve vašem prohlížeči",
    mergeMode: "Režim sloučení",
    modeByName: "Zarovnat sloupce podle názvu záhlaví (doporučeno)",
    modeStack: "Jen skládat řádky (zachovat záhlaví prvního souboru)",
    parsing: "Parsování…",
    downloadMerged: "Stáhnout merged.csv",
    rowsCols: "řádků",
    cols: "sl",
    errorRead: "Soubor CSV se nepodařilo načíst: ",
    privacy: "100% zpracováno ve vašem prohlížeči — vaše CSV soubory se nikdy nenahrávají.",
  },
};

export function MergeCsvClient() {
  const s = T[useLocale()] ?? T.en;
  const [items, setItems] = useState<Entry[]>([]);
  const [mode, setMode] = useState<"by_name" | "stack">("by_name");
  const [out, setOut] = useState<string>("");
  const [outSize, setOutSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const dragIndex = useRef<number | null>(null);

  useEffect(() => { if (items.length) buildMerge(); else setOut(""); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [items, mode]);

  async function add(files: FileList | null) {
    if (!files) return;
    setError(null); setBusy(true);
    try {
      const next: Entry[] = [];
      for (const f of Array.from(files)) {
        const text = await f.text();
        const rows = parseCsv(text);
        if (!rows.length) continue;
        next.push({ id: crypto.randomUUID(), file: f, rows: rows.slice(1), headers: rows[0] });
      }
      setItems((prev) => [...prev, ...next]);
    } catch (e) {
      setError(`${s.errorRead}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function remove(id: string) { setItems((prev) => prev.filter((e) => e.id !== id)); }
  function move(from: number, to: number) {
    setItems((prev) => { const n = prev.slice(); const [it] = n.splice(from, 1); n.splice(to, 0, it); return n; });
  }

  function buildMerge() {
    if (mode === "stack") {
      const merged = items.flatMap((e, i) => i === 0 ? [e.headers, ...e.rows] : e.rows);
      const text = toCsv(merged);
      setOut(text); setOutSize(new Blob([text]).size);
      return;
    }
    // by_name: take the union of headers (in order seen), align each row by header.
    const allHeaders: string[] = [];
    for (const e of items) for (const h of e.headers) if (!allHeaders.includes(h)) allHeaders.push(h);
    const rows: string[][] = [allHeaders];
    for (const e of items) {
      const idx = allHeaders.map((h) => e.headers.indexOf(h));
      for (const r of e.rows) rows.push(idx.map((i) => (i >= 0 ? (r[i] ?? "") : "")));
    }
    const text = toCsv(rows);
    setOut(text); setOutSize(new Blob([text]).size);
  }

  function downloadCsv() {
    const blob = new Blob([out], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "merged.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-teal-600" />
        <span className="mt-2 font-medium text-ink-900">{s.addCsvFiles}</span>
        <span className="mt-0.5 text-xs text-ink-400">{s.addHint}</span>
        <input type="file" accept=".csv,text/csv" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <>
          <ul className="space-y-2">
            {items.map((e, i) => (
              <li key={e.id} draggable onDragStart={() => { dragIndex.current = i; }} onDragOver={(ev) => ev.preventDefault()}
                onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
                className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm">
                <GripVertical className="h-4 w-4 cursor-grab text-ink-300" />
                <span className="grid h-6 w-6 place-items-center rounded bg-teal-50 text-xs font-bold text-teal-700">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-medium text-ink-900">{e.file.name}</span>
                  <span className="ml-2 text-xs text-ink-400">{e.rows.length} {s.rowsCols} · {e.headers.length} {s.cols}</span>
                </span>
                <button onClick={() => remove(e.id)} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>

          <label className="flex items-center gap-2 text-sm text-ink-600">{s.mergeMode}
            <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
              <option value="by_name">{s.modeByName}</option>
              <option value="stack">{s.modeStack}</option>
            </select>
          </label>
        </>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {s.parsing}</p>}

      {out && (
        <>
          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={downloadCsv}><Download className="h-4 w-4" /> {s.downloadMerged} · {formatBytes(outSize)}</Button>
          </div>
          <pre className="max-h-72 overflow-auto rounded-lg border border-ink-100 bg-white p-3 font-mono text-xs leading-relaxed text-ink-700">{out.slice(0, 4000)}{out.length > 4000 && "\n…"}</pre>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
