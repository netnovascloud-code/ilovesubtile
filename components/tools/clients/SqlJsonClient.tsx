"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

type Dir = "sql_to_json" | "json_to_sql";

const T: Record<string, Record<string, string>> = {
  en: {
    swap: "Swap",
    tableName: "Table name",
    sqlInput: "SQL input",
    jsonInput: "JSON input",
    jsonOutput: "JSON output",
    sqlOutput: "SQL output",
    copied: "Copied",
    copy: "Copy",
    parseError: "Could not parse: ",
    privacy: "100% in your browser — nothing is uploaded.",
  },
  fr: {
    swap: "Inverser",
    tableName: "Nom de la table",
    sqlInput: "Entrée SQL",
    jsonInput: "Entrée JSON",
    jsonOutput: "Sortie JSON",
    sqlOutput: "Sortie SQL",
    copied: "Copié",
    copy: "Copier",
    parseError: "Impossible d'analyser : ",
    privacy: "100 % dans votre navigateur — rien n'est envoyé.",
  },
  es: {
    swap: "Intercambiar",
    tableName: "Nombre de tabla",
    sqlInput: "Entrada SQL",
    jsonInput: "Entrada JSON",
    jsonOutput: "Salida JSON",
    sqlOutput: "Salida SQL",
    copied: "Copiado",
    copy: "Copiar",
    parseError: "No se pudo analizar: ",
    privacy: "100 % en tu navegador — nada se sube.",
  },
  pt: {
    swap: "Trocar",
    tableName: "Nome da tabela",
    sqlInput: "Entrada SQL",
    jsonInput: "Entrada JSON",
    jsonOutput: "Saída JSON",
    sqlOutput: "Saída SQL",
    copied: "Copiado",
    copy: "Copiar",
    parseError: "Não foi possível analisar: ",
    privacy: "100% no seu navegador — nada é enviado.",
  },
  de: {
    swap: "Tauschen",
    tableName: "Tabellenname",
    sqlInput: "SQL-Eingabe",
    jsonInput: "JSON-Eingabe",
    jsonOutput: "JSON-Ausgabe",
    sqlOutput: "SQL-Ausgabe",
    copied: "Kopiert",
    copy: "Kopieren",
    parseError: "Konnte nicht geparst werden: ",
    privacy: "100 % im Browser — nichts wird hochgeladen.",
  },
  it: {
    swap: "Scambia",
    tableName: "Nome tabella",
    sqlInput: "Input SQL",
    jsonInput: "Input JSON",
    jsonOutput: "Output JSON",
    sqlOutput: "Output SQL",
    copied: "Copiato",
    copy: "Copia",
    parseError: "Impossibile analizzare: ",
    privacy: "100% nel tuo browser — nulla viene caricato.",
  },
  nl: {
    swap: "Wisselen",
    tableName: "Tabelnaam",
    sqlInput: "SQL-invoer",
    jsonInput: "JSON-invoer",
    jsonOutput: "JSON-uitvoer",
    sqlOutput: "SQL-uitvoer",
    copied: "Gekopieerd",
    copy: "Kopiëren",
    parseError: "Kon niet parseren: ",
    privacy: "100% in uw browser — niets wordt geüpload.",
  },
  ja: {
    swap: "入れ替え",
    tableName: "テーブル名",
    sqlInput: "SQL 入力",
    jsonInput: "JSON 入力",
    jsonOutput: "JSON 出力",
    sqlOutput: "SQL 出力",
    copied: "コピー済み",
    copy: "コピー",
    parseError: "解析できませんでした: ",
    privacy: "ブラウザ内で100%処理 — 何もアップロードされません。",
  },
  zh: {
    swap: "互换",
    tableName: "表名",
    sqlInput: "SQL 输入",
    jsonInput: "JSON 输入",
    jsonOutput: "JSON 输出",
    sqlOutput: "SQL 输出",
    copied: "已复制",
    copy: "复制",
    parseError: "无法解析：",
    privacy: "100% 在您的浏览器中处理 — 不会上传任何内容。",
  },
  ko: {
    swap: "교환",
    tableName: "테이블 이름",
    sqlInput: "SQL 입력",
    jsonInput: "JSON 입력",
    jsonOutput: "JSON 출력",
    sqlOutput: "SQL 출력",
    copied: "복사됨",
    copy: "복사",
    parseError: "파싱할 수 없습니다: ",
    privacy: "브라우저에서 100% 처리 — 아무것도 업로드되지 않습니다.",
  },
  ar: {
    swap: "تبديل",
    tableName: "اسم الجدول",
    sqlInput: "إدخال SQL",
    jsonInput: "إدخال JSON",
    jsonOutput: "إخراج JSON",
    sqlOutput: "إخراج SQL",
    copied: "تم النسخ",
    copy: "نسخ",
    parseError: "تعذّر التحليل: ",
    privacy: "معالجة 100% في متصفحك — لا يتم رفع أي شيء.",
  },
  ru: {
    swap: "Поменять",
    tableName: "Имя таблицы",
    sqlInput: "SQL ввод",
    jsonInput: "JSON ввод",
    jsonOutput: "JSON вывод",
    sqlOutput: "SQL вывод",
    copied: "Скопировано",
    copy: "Копировать",
    parseError: "Не удалось разобрать: ",
    privacy: "100% в вашем браузере — ничего не загружается.",
  },
  hi: {
    swap: "बदलें",
    tableName: "तालिका नाम",
    sqlInput: "SQL इनपुट",
    jsonInput: "JSON इनपुट",
    jsonOutput: "JSON आउटपुट",
    sqlOutput: "SQL आउटपुट",
    copied: "कॉपी किया गया",
    copy: "कॉपी करें",
    parseError: "पार्स नहीं किया जा सका: ",
    privacy: "आपके ब्राउज़र में 100% — कुछ भी अपलोड नहीं होता।",
  },
  tr: {
    swap: "Değiştir",
    tableName: "Tablo adı",
    sqlInput: "SQL girişi",
    jsonInput: "JSON girişi",
    jsonOutput: "JSON çıkışı",
    sqlOutput: "SQL çıkışı",
    copied: "Kopyalandı",
    copy: "Kopyala",
    parseError: "Ayrıştırılamadı: ",
    privacy: "Tarayıcınızda %100 işlenir — hiçbir şey yüklenmez.",
  },
  id: {
    swap: "Tukar",
    tableName: "Nama tabel",
    sqlInput: "Input SQL",
    jsonInput: "Input JSON",
    jsonOutput: "Output JSON",
    sqlOutput: "Output SQL",
    copied: "Disalin",
    copy: "Salin",
    parseError: "Tidak dapat mengurai: ",
    privacy: "100% diproses di browser Anda — tidak ada yang diunggah.",
  },
  vi: {
    swap: "Đổi chỗ",
    tableName: "Tên bảng",
    sqlInput: "Đầu vào SQL",
    jsonInput: "Đầu vào JSON",
    jsonOutput: "Đầu ra JSON",
    sqlOutput: "Đầu ra SQL",
    copied: "Đã sao chép",
    copy: "Sao chép",
    parseError: "Không thể phân tích: ",
    privacy: "100% xử lý trong trình duyệt của bạn — không có gì được tải lên.",
  },
  sv: {
    swap: "Byt",
    tableName: "Tabellnamn",
    sqlInput: "SQL-indata",
    jsonInput: "JSON-indata",
    jsonOutput: "JSON-utdata",
    sqlOutput: "SQL-utdata",
    copied: "Kopierat",
    copy: "Kopiera",
    parseError: "Kunde inte tolka: ",
    privacy: "100% bearbetas i din webbläsare — inget laddas upp.",
  },
  pl: {
    swap: "Zamień",
    tableName: "Nazwa tabeli",
    sqlInput: "Wejście SQL",
    jsonInput: "Wejście JSON",
    jsonOutput: "Wyjście JSON",
    sqlOutput: "Wyjście SQL",
    copied: "Skopiowano",
    copy: "Kopiuj",
    parseError: "Nie można sparsować: ",
    privacy: "100% przetwarzane w przeglądarce — nic nie jest przesyłane.",
  },
  uk: {
    swap: "Поміняти",
    tableName: "Назва таблиці",
    sqlInput: "SQL введення",
    jsonInput: "JSON введення",
    jsonOutput: "JSON виведення",
    sqlOutput: "SQL виведення",
    copied: "Скопійовано",
    copy: "Копіювати",
    parseError: "Не вдалося розібрати: ",
    privacy: "100% у вашому браузері — нічого не завантажується.",
  },
  cs: {
    swap: "Prohodit",
    tableName: "Název tabulky",
    sqlInput: "SQL vstup",
    jsonInput: "JSON vstup",
    jsonOutput: "JSON výstup",
    sqlOutput: "SQL výstup",
    copied: "Zkopírováno",
    copy: "Kopírovat",
    parseError: "Nelze rozebrat: ",
    privacy: "100% zpracováno ve vašem prohlížeči — nic se nenahrává.",
  },
};

/** Very forgiving INSERT parser: handles `INSERT INTO tbl (a, b) VALUES (1, 'x'), (2, 'y');`
 *  Returns rows as objects keyed by the column names. Single-quoted strings are unwrapped. */
function parseInserts(sql: string): { table: string; rows: Record<string, unknown>[] } {
  const m = sql.match(/INSERT\s+INTO\s+("?[A-Za-z0-9_.]+"?)\s*\(([^)]+)\)\s*VALUES\s*(.+);?\s*$/is);
  if (!m) throw new Error("Could not find an INSERT INTO … VALUES statement.");
  const table = m[1].replace(/"/g, "");
  const cols = m[2].split(",").map((c) => c.trim().replace(/^["`]|["`]$/g, ""));
  const tuples: string[][] = [];
  let cur: string[] = [];
  let buf = "";
  let inStr = false;
  let depth = 0;
  for (const ch of m[3]) {
    if (inStr) {
      buf += ch;
      if (ch === "'") {
        // A quote closes the string unless escaped by an ODD run of backslashes
        // (`\'`). `''` doubling is handled by re-entering on the next quote.
        let bs = 0;
        for (let k = buf.length - 2; k >= 0 && buf[k] === "\\"; k--) bs++;
        if (bs % 2 === 0) inStr = false;
      }
      continue;
    }
    if (ch === "'") { inStr = true; buf += ch; continue; }
    if (ch === "(") { if (depth === 0) { buf = ""; cur = []; } else buf += ch; depth++; continue; }
    if (ch === ")") { depth--; if (depth === 0) { cur.push(buf.trim()); tuples.push(cur); } else buf += ch; continue; }
    if (depth === 1 && ch === ",") { cur.push(buf.trim()); buf = ""; continue; }
    if (depth > 0) buf += ch;
  }
  const rows = tuples.map((tup) => {
    const obj: Record<string, unknown> = {};
    tup.forEach((raw, i) => {
      let v: unknown;
      const lower = raw.toLowerCase();
      if (lower === "null") v = null;
      else if (lower === "true") v = true;
      else if (lower === "false") v = false;
      else if (/^-?\d+(\.\d+)?$/.test(raw)) {
        // Keep leading-zero codes (e.g. 02115) and integers beyond JS's safe range
        // as strings — coercing them via Number() would silently corrupt the value.
        const n = Number(raw);
        v = !/^-?0\d/.test(raw) && (raw.includes(".") || Number.isSafeInteger(n)) ? n : raw;
      }
      else if (raw.startsWith("'") && raw.endsWith("'")) v = raw.slice(1, -1).replace(/''/g, "'").replace(/\\'/g, "'");
      else v = raw;
      obj[cols[i] ?? `col_${i + 1}`] = v;
    });
    return obj;
  });
  return { table, rows };
}

function jsonToInsert(table: string, rows: Record<string, unknown>[]): string {
  if (!Array.isArray(rows) || rows.length === 0) return "";
  const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r ?? {}))));
  // Quote a table/column name only when it isn't a plain identifier, so simple
  // output stays clean but "first name" / reserved words still produce valid SQL.
  const ident = (name: string) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) ? name : `"${name.replace(/"/g, '""')}"`;
  const lit = (v: unknown): string => {
    if (v === null || v === undefined) return "NULL";
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    // Nested objects/arrays have no native SQL form — serialise to a JSON string
    // literal rather than emitting "[object Object]".
    if (typeof v === "object") return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
    return `'${String(v).replace(/'/g, "''")}'`;
  };
  const values = rows.map((r) => `(${cols.map((c) => lit(r[c])).join(", ")})`).join(",\n  ");
  return `INSERT INTO ${ident(table)} (${cols.map(ident).join(", ")})\nVALUES\n  ${values};\n`;
}

export function SqlJsonClient({ defaultDir = "sql_to_json" }: { defaultDir?: Dir } = {}) {
  const s = T[useLocale()] ?? T.en;
  const [dir, setDir] = useState<Dir>(defaultDir);
  const [input, setInput] = useState<string>(`INSERT INTO users (id, name, age) VALUES\n  (1, 'Alice', 30),\n  (2, 'Bob', 25);`);
  const [tableName, setTableName] = useState("users");
  const [copied, setCopied] = useState(false);

  // Re-default when switching direction.
  useEffect(() => {
    if (dir === "sql_to_json") setInput(`INSERT INTO users (id, name, age) VALUES\n  (1, 'Alice', 30),\n  (2, 'Bob', 25);`);
    else setInput(`[\n  { "id": 1, "name": "Alice", "age": 30 },\n  { "id": 2, "name": "Bob", "age": 25 }\n]`);
  }, [dir]);

  // Compute output and error together inside the memo — never call setState during
  // render. The error is derived data, so it lives in the same memoised result.
  const { output, error } = useMemo<{ output: string; error: string | null }>(() => {
    try {
      if (!input.trim()) return { output: "", error: null };
      if (dir === "sql_to_json") {
        const { rows } = parseInserts(input);
        return { output: JSON.stringify(rows, null, 2), error: null };
      }
      const parsed = JSON.parse(input);
      const rows: Record<string, unknown>[] = Array.isArray(parsed) ? parsed : [parsed];
      return { output: jsonToInsert(tableName || "my_table", rows), error: null };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [dir, input, tableName]);

  async function copy() {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          <button onClick={() => setDir("sql_to_json")} className={`rounded-md px-3 py-1 text-xs font-medium ${dir === "sql_to_json" ? "bg-teal-500 text-white" : "text-ink-600"}`}>SQL → JSON</button>
          <button onClick={() => setDir("json_to_sql")} className={`rounded-md px-3 py-1 text-xs font-medium ${dir === "json_to_sql" ? "bg-teal-500 text-white" : "text-ink-600"}`}>JSON → SQL</button>
        </div>
        <Button size="sm" variant="outline" onClick={() => setDir((d) => d === "sql_to_json" ? "json_to_sql" : "sql_to_json")}>
          <ArrowLeftRight className="h-3.5 w-3.5" /> {s.swap}
        </Button>
        {dir === "json_to_sql" && (
          <label className="flex items-center gap-2 text-xs font-medium text-ink-600">{s.tableName}
            <input value={tableName} onChange={(e) => setTableName(e.target.value)} className="rounded-md border border-ink-200 px-2 py-1 text-sm" />
          </label>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-400">{dir === "sql_to_json" ? s.sqlInput : s.jsonInput}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-400">{dir === "sql_to_json" ? s.jsonOutput : s.sqlOutput}</label>
            <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? s.copied : s.copy}
            </Button>
          </div>
          <pre className="h-64 overflow-auto rounded-lg border border-ink-100 bg-ink-900 p-3 font-mono text-xs leading-relaxed text-ink-50">{output || (error ? "" : "—")}</pre>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{s.parseError}{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
