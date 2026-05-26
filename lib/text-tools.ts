// Pure, in-browser transforms for the "code pur" tools — free & unlimited,
// no AI, no upload, no quota. Each entry powers one tool page via TextToolClient.
// run() returns the output string or throws an Error with a user-facing message.

export type TextToolMode = { id: string; label: string };

export type TextToolDef = {
  run: (input: string, mode: string) => string;
  modes?: TextToolMode[];
  defaultMode?: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  /** When set, the output can be downloaded as a file. */
  download?: { ext: string; mime: string };
  /** Monospace text areas (code/data tools). */
  mono?: boolean;
  /** Live transform as the user types (default true). */
  live?: boolean;
};

// ── helpers ────────────────────────────────────────────────────────────────

function utf8ToBase64(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
function base64ToUtf8(b64: string): string {
  const bin = atob(b64.trim().replace(/\s+/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
function base64UrlToUtf8(b64url: string): string {
  let s = b64url.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return base64ToUtf8(s);
}

/** Minimal RFC-4180 CSV parser (handles quotes, escaped quotes, CRLF). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const s = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\n") {
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || r[0] !== "");
}

function csvEscape(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function jsonToXml(value: unknown, tag = "root", indent = ""): string {
  const next = indent + "  ";
  if (Array.isArray(value)) {
    return value.map((v) => jsonToXml(v, "item", indent)).join("\n");
  }
  if (value !== null && typeof value === "object") {
    const inner = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => jsonToXml(v, k.replace(/[^\w.-]/g, "_"), next))
      .join("\n");
    return `${indent}<${tag}>\n${inner}\n${indent}</${tag}>`;
  }
  const text = String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `${indent}<${tag}>${text}</${tag}>`;
}

// ── registry ─────────────────────────────────────────────────────────────────

export const TEXT_TOOLS: Record<string, TextToolDef> = {
  "format-json": {
    inputLabel: "JSON input",
    inputPlaceholder: '{"hello":"world","items":[1,2,3]}',
    outputLabel: "Formatted JSON",
    download: { ext: "json", mime: "application/json" },
    mono: true,
    modes: [
      { id: "pretty", label: "Beautify" },
      { id: "minify", label: "Minify" },
    ],
    defaultMode: "pretty",
    run: (input, mode) => {
      if (!input.trim()) return "";
      let parsed: unknown;
      try { parsed = JSON.parse(input); }
      catch (e) { throw new Error(`Invalid JSON: ${(e as Error).message}`); }
      return JSON.stringify(parsed, null, mode === "minify" ? undefined : 2);
    },
  },

  "json-to-csv": {
    inputLabel: "JSON array of objects",
    inputPlaceholder: '[{"name":"Ada","age":36},{"name":"Linus","age":54}]',
    outputLabel: "CSV",
    download: { ext: "csv", mime: "text/csv" },
    mono: true,
    run: (input) => {
      if (!input.trim()) return "";
      let data: unknown;
      try { data = JSON.parse(input); }
      catch (e) { throw new Error(`Invalid JSON: ${(e as Error).message}`); }
      if (!Array.isArray(data)) throw new Error("Expected a JSON array of objects.");
      if (data.length === 0) return "";
      const cols = Array.from(
        data.reduce((set: Set<string>, row) => {
          if (row && typeof row === "object") Object.keys(row).forEach((k) => set.add(k));
          return set;
        }, new Set<string>()),
      );
      const head = cols.map(csvEscape).join(",");
      const body = data.map((row) =>
        cols.map((c) => csvEscape((row as Record<string, unknown>)?.[c])).join(","),
      ).join("\n");
      return `${head}\n${body}`;
    },
  },

  "csv-to-json": {
    inputLabel: "CSV input",
    inputPlaceholder: "name,age\nAda,36\nLinus,54",
    outputLabel: "JSON",
    download: { ext: "json", mime: "application/json" },
    mono: true,
    run: (input) => {
      if (!input.trim()) return "";
      const rows = parseCsv(input);
      if (rows.length < 1) return "[]";
      const [header, ...lines] = rows;
      const objs = lines.map((cells) => {
        const o: Record<string, string> = {};
        header.forEach((h, i) => { o[h] = cells[i] ?? ""; });
        return o;
      });
      return JSON.stringify(objs, null, 2);
    },
  },

  "json-to-xml": {
    inputLabel: "JSON input",
    inputPlaceholder: '{"book":{"title":"Wyrlo","pages":3}}',
    outputLabel: "XML",
    download: { ext: "xml", mime: "application/xml" },
    mono: true,
    run: (input) => {
      if (!input.trim()) return "";
      let parsed: unknown;
      try { parsed = JSON.parse(input); }
      catch (e) { throw new Error(`Invalid JSON: ${(e as Error).message}`); }
      return `<?xml version="1.0" encoding="UTF-8"?>\n${jsonToXml(parsed)}`;
    },
  },

  "base64": {
    inputLabel: "Text",
    inputPlaceholder: "Type text to encode, or paste Base64 to decode…",
    outputLabel: "Result",
    mono: true,
    modes: [
      { id: "encode", label: "Encode" },
      { id: "decode", label: "Decode" },
    ],
    defaultMode: "encode",
    run: (input, mode) => {
      if (!input) return "";
      try { return mode === "decode" ? base64ToUtf8(input) : utf8ToBase64(input); }
      catch { throw new Error("Invalid Base64 input."); }
    },
  },

  "url-encode": {
    inputLabel: "Text / URL",
    inputPlaceholder: "https://wyrlo.io/search?q=a b&x=1",
    outputLabel: "Result",
    mono: true,
    modes: [
      { id: "encode", label: "Encode" },
      { id: "decode", label: "Decode" },
    ],
    defaultMode: "encode",
    run: (input, mode) => {
      if (!input) return "";
      try { return mode === "decode" ? decodeURIComponent(input) : encodeURIComponent(input); }
      catch { throw new Error("Invalid URL-encoded input."); }
    },
  },

  "jwt-decoder": {
    inputLabel: "JWT",
    inputPlaceholder: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.signature",
    outputLabel: "Decoded header & payload",
    mono: true,
    run: (input) => {
      const token = input.trim();
      if (!token) return "";
      const parts = token.split(".");
      if (parts.length < 2) throw new Error("Not a valid JWT (expected header.payload.signature).");
      let header: unknown, payload: unknown;
      try { header = JSON.parse(base64UrlToUtf8(parts[0])); payload = JSON.parse(base64UrlToUtf8(parts[1])); }
      catch { throw new Error("Could not decode this JWT — the header/payload are not valid Base64URL JSON."); }
      return `// HEADER\n${JSON.stringify(header, null, 2)}\n\n// PAYLOAD\n${JSON.stringify(payload, null, 2)}`;
    },
  },

  "word-counter": {
    inputLabel: "Your text",
    inputPlaceholder: "Paste or type your text here…",
    outputLabel: "Statistics",
    run: (input) => {
      const words = (input.trim().match(/\S+/g) ?? []).length;
      const chars = input.length;
      const charsNoSpaces = input.replace(/\s/g, "").length;
      const sentences = (input.match(/[.!?]+(\s|$)/g) ?? []).length;
      const paragraphs = input.split(/\n{2,}/).filter((p) => p.trim()).length;
      const lines = input === "" ? 0 : input.split("\n").length;
      const readingMin = Math.max(1, Math.round(words / 200));
      return [
        `Words:           ${words}`,
        `Characters:      ${chars}`,
        `Characters (no spaces): ${charsNoSpaces}`,
        `Sentences:       ${sentences}`,
        `Paragraphs:      ${paragraphs}`,
        `Lines:           ${lines}`,
        `Reading time:    ~${readingMin} min`,
      ].join("\n");
    },
  },
};
