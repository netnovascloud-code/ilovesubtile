"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Dir = "sql_to_json" | "json_to_sql";

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
  const lit = (v: unknown): string => {
    if (v === null || v === undefined) return "NULL";
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    // Nested objects/arrays have no native SQL form — serialise to a JSON string
    // literal rather than emitting "[object Object]".
    if (typeof v === "object") return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
    return `'${String(v).replace(/'/g, "''")}'`;
  };
  const values = rows.map((r) => `(${cols.map((c) => lit(r[c])).join(", ")})`).join(",\n  ");
  return `INSERT INTO ${table} (${cols.join(", ")})\nVALUES\n  ${values};\n`;
}

export function SqlJsonClient({ defaultDir = "sql_to_json" }: { defaultDir?: Dir } = {}) {
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
          <ArrowLeftRight className="h-3.5 w-3.5" /> Swap
        </Button>
        {dir === "json_to_sql" && (
          <label className="flex items-center gap-2 text-xs font-medium text-ink-600">Table name
            <input value={tableName} onChange={(e) => setTableName(e.target.value)} className="rounded-md border border-ink-200 px-2 py-1 text-sm" />
          </label>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-400">{dir === "sql_to_json" ? "SQL input" : "JSON input"}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false}
            className="h-64 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-400">{dir === "sql_to_json" ? "JSON output" : "SQL output"}</label>
            <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <pre className="h-64 overflow-auto rounded-lg border border-ink-100 bg-ink-900 p-3 font-mono text-xs leading-relaxed text-ink-50">{output || (error ? "" : "—")}</pre>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">Could not parse: {error}</p>}
      <p className="text-xs text-ink-400">100% in your browser — nothing is uploaded.</p>
    </div>
  );
}
