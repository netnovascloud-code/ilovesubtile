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
    // Wrap the array in its own element so the document keeps a single root —
    // emitting bare <item> siblings at the top level produces invalid XML.
    const inner = value.map((v) => jsonToXml(v, "item", next)).join("\n");
    return `${indent}<${tag}>\n${inner}\n${indent}</${tag}>`;
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

// ── YAML (minimal, dependency-free) ──────────────────────────────────────────

function needsYamlQuote(s: string): boolean {
  return s === "" || /^[\s]|[\s]$|[:#\[\]{}&*!|>'"%@`,]|^-|^\?|^(true|false|null|yes|no|~)$/i.test(s) || /^-?\d/.test(s) && isFinite(Number(s));
}
function yamlScalar(v: unknown): string {
  if (v === null || v === undefined) return "null";
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  const s = String(v);
  return needsYamlQuote(s) ? JSON.stringify(s) : s;
}
function toYaml(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}[]`;
    return value.map((v) => {
      if (v !== null && typeof v === "object") {
        const block = toYaml(v, indent + 1).replace(/^\s+/, "");
        return `${pad}- ${block}`;
      }
      return `${pad}- ${yamlScalar(v)}`;
    }).join("\n");
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${pad}{}`;
    return entries.map(([k, v]) => {
      if (v !== null && typeof v === "object" && (Array.isArray(v) ? v.length : Object.keys(v).length)) {
        return `${pad}${k}:\n${toYaml(v, indent + 1)}`;
      }
      return `${pad}${k}: ${yamlScalar(v)}`;
    }).join("\n");
  }
  return `${pad}${yamlScalar(value)}`;
}

function parseYamlScalar(raw: string): unknown {
  const s = raw.trim();
  if (s === "" || s === "~" || s.toLowerCase() === "null") return null;
  if (s.toLowerCase() === "true") return true;
  if (s.toLowerCase() === "false") return false;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d*\.\d+$/.test(s)) return parseFloat(s);
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    try { return JSON.parse(s.replace(/^'|'$/g, '"')); } catch { return s.slice(1, -1); }
  }
  return s;
}
type YamlLine = { indent: number; text: string };
function parseYamlBlock(lines: YamlLine[], start: number, indent: number): [unknown, number] {
  let i = start;
  // Detect sequence vs mapping at this indent.
  if (i < lines.length && lines[i].indent === indent && lines[i].text.startsWith("- ")) {
    const arr: unknown[] = [];
    while (i < lines.length && lines[i].indent === indent && (lines[i].text === "-" || lines[i].text.startsWith("- "))) {
      const rest = lines[i].text === "-" ? "" : lines[i].text.slice(2);
      if (rest === "" ) {
        const [val, next] = parseYamlBlock(lines, i + 1, indent + 1);
        arr.push(val); i = next;
      } else if (/^[\w.$-]+:(\s|$)/.test(rest)) {
        // inline map start on the dash line
        const synthetic: YamlLine[] = [{ indent: indent + 1, text: rest }];
        for (let j = i + 1; j < lines.length && lines[j].indent > indent; j++) synthetic.push(lines[j]);
        const [val] = parseYamlBlock(synthetic, 0, indent + 1);
        arr.push(val);
        i++;
        while (i < lines.length && lines[i].indent > indent) i++;
      } else {
        arr.push(parseYamlScalar(rest)); i++;
      }
    }
    return [arr, i];
  }
  const obj: Record<string, unknown> = {};
  while (i < lines.length && lines[i].indent === indent && !lines[i].text.startsWith("- ")) {
    const m = lines[i].text.match(/^([^:]+):(.*)$/);
    if (!m) { i++; continue; }
    const key = m[1].trim();
    const val = m[2].trim();
    if (val === "") {
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const [child, next] = parseYamlBlock(lines, i + 1, lines[i + 1].indent);
        obj[key] = child; i = next;
      } else { obj[key] = null; i++; }
    } else {
      obj[key] = parseYamlScalar(val); i++;
    }
  }
  return [obj, i];
}
function yamlToJsonValue(text: string): unknown {
  const lines: YamlLine[] = text.replace(/\r\n/g, "\n").split("\n")
    .map((l) => l.replace(/\s+#.*$/, ""))
    .filter((l) => l.trim() !== "" && !l.trim().startsWith("#"))
    .map((l) => ({ indent: Math.floor((l.match(/^ */)?.[0].length ?? 0) / 2), text: l.trim() }));
  if (lines.length === 0) return null;
  const baseIndent = lines[0].indent;
  const [val] = parseYamlBlock(lines, 0, baseIndent);
  return val;
}

// ── Markdown <-> HTML (minimal) ──────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function mdInline(s: string): string {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let listType: "ul" | "ol" | null = null;
  const closeList = () => { if (listType) { out.push(`</${listType}>`); listType = null; } };
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      closeList();
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      out.push(`<pre><code${lang ? ` class="language-${lang}"` : ""}>${escapeHtml(buf.join("\n"))}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { closeList(); out.push(`<h${h[1].length}>${mdInline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (/^\s*>\s?/.test(line)) { closeList(); out.push(`<blockquote>${mdInline(line.replace(/^\s*>\s?/, ""))}</blockquote>`); i++; continue; }
    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ul) { if (listType !== "ul") { closeList(); out.push("<ul>"); listType = "ul"; } out.push(`<li>${mdInline(ul[1])}</li>`); i++; continue; }
    if (ol) { if (listType !== "ol") { closeList(); out.push("<ol>"); listType = "ol"; } out.push(`<li>${mdInline(ol[1])}</li>`); i++; continue; }
    if (line.trim() === "") { closeList(); i++; continue; }
    closeList();
    out.push(`<p>${mdInline(line)}</p>`);
    i++;
  }
  closeList();
  return out.join("\n");
}

function htmlToMarkdown(html: string): string {
  if (typeof DOMParser === "undefined") throw new Error("This tool runs in your browser.");
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walk = (node: Node): string => {
    if (node.nodeType === 3) return node.textContent ?? "";
    if (node.nodeType !== 1) return "";
    const el = node as Element;
    const inner = Array.from(el.childNodes).map(walk).join("");
    switch (el.tagName.toLowerCase()) {
      case "h1": return `\n# ${inner}\n`;
      case "h2": return `\n## ${inner}\n`;
      case "h3": return `\n### ${inner}\n`;
      case "h4": return `\n#### ${inner}\n`;
      case "h5": return `\n##### ${inner}\n`;
      case "h6": return `\n###### ${inner}\n`;
      case "strong": case "b": return `**${inner}**`;
      case "em": case "i": return `*${inner}*`;
      case "code": return el.parentElement?.tagName.toLowerCase() === "pre" ? inner : `\`${inner}\``;
      case "pre": return `\n\`\`\`\n${inner.replace(/\n$/, "")}\n\`\`\`\n`;
      case "a": return `[${inner}](${el.getAttribute("href") ?? ""})`;
      case "blockquote": return `\n> ${inner.trim()}\n`;
      case "li": return `- ${inner.trim()}\n`;
      case "ul": case "ol": return `\n${inner}`;
      case "br": return "\n";
      case "p": case "div": return `\n${inner}\n`;
      default: return inner;
    }
  };
  return walk(doc.body).replace(/\n{3,}/g, "\n\n").trim();
}

// ── CSS minify & SQL format (light) ──────────────────────────────────────────

function minifyCss(css: string): string {
  // Tokenise, keeping string literals verbatim and dropping /* */ comments,
  // so whitespace tightening never corrupts quoted content (e.g. content: "a ; b").
  const parts: { str: boolean; text: string }[] = [];
  let i = 0;
  while (i < css.length) {
    const c = css[i];
    if (c === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end < 0 ? css.length : end + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < css.length && !(css[j] === c && css[j - 1] !== "\\")) j++;
      parts.push({ str: true, text: css.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    let j = i;
    let buf = "";
    while (j < css.length) {
      const d = css[j];
      if (d === '"' || d === "'" || (d === "/" && css[j + 1] === "*")) break;
      buf += d; j++;
    }
    parts.push({ str: false, text: buf });
    i = j;
  }
  return parts
    .map((p) => p.str ? p.text : p.text.replace(/\s+/g, " ").replace(/\s*([{}:;,>~+])\s*/g, "$1").replace(/;}/g, "}"))
    .join("")
    .trim();
}

const SQL_KEYWORDS = ["SELECT", "FROM", "WHERE", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION ALL", "UNION", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"];
function formatSql(sql: string): string {
  let s = sql.replace(/\s+/g, " ").trim();
  for (const kw of SQL_KEYWORDS) {
    s = s.replace(new RegExp(`\\s*\\b${kw.replace(/ /g, "\\s+")}\\b\\s*`, "gi"), `\n${kw} `);
  }
  s = s.replace(/\s*,\s*/g, ",\n  ");
  return s.split("\n").map((l) => l.trimEnd()).join("\n").trim();
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
    inputPlaceholder: '{"book":{"title":"Konvertools","pages":3}}',
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
    inputPlaceholder: "https://konvertools.com/search?q=a b&x=1",
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

  "xml-to-json": {
    inputLabel: "XML input",
    inputPlaceholder: "<book><title>Konvertools</title><pages>3</pages></book>",
    outputLabel: "JSON",
    download: { ext: "json", mime: "application/json" },
    mono: true,
    run: (input) => {
      if (!input.trim()) return "";
      if (typeof DOMParser === "undefined") throw new Error("This tool runs in your browser.");
      const doc = new DOMParser().parseFromString(input, "application/xml");
      const err = doc.querySelector("parsererror");
      if (err) throw new Error("Invalid XML.");
      const toObj = (el: Element): unknown => {
        const children = Array.from(el.children);
        const attrs = Array.from(el.attributes);
        // Pure leaf with no attributes → just its text.
        if (children.length === 0 && attrs.length === 0) return el.textContent?.trim() ?? "";
        const obj: Record<string, unknown> = {};
        // Preserve attributes as "@name" keys so they aren't silently dropped.
        for (const a of attrs) obj[`@${a.name}`] = a.value;
        if (children.length === 0) {
          const text = el.textContent?.trim();
          if (text) obj["#text"] = text;
          return obj;
        }
        for (const child of children) {
          const key = child.tagName;
          const val = toObj(child);
          if (key in obj) {
            if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
            (obj[key] as unknown[]).push(val);
          } else obj[key] = val;
        }
        return obj;
      };
      const root = doc.documentElement;
      return JSON.stringify({ [root.tagName]: toObj(root) }, null, 2);
    },
  },

  "json-to-yaml": {
    inputLabel: "JSON input",
    inputPlaceholder: '{"name":"Konvertools","tags":["fast","free"]}',
    outputLabel: "YAML",
    download: { ext: "yaml", mime: "text/yaml" },
    mono: true,
    run: (input) => {
      if (!input.trim()) return "";
      let parsed: unknown;
      try { parsed = JSON.parse(input); }
      catch (e) { throw new Error(`Invalid JSON: ${(e as Error).message}`); }
      return toYaml(parsed);
    },
  },

  "yaml-to-json": {
    inputLabel: "YAML input",
    inputPlaceholder: "name: Konvertools\ntags:\n  - fast\n  - free",
    outputLabel: "JSON",
    download: { ext: "json", mime: "application/json" },
    mono: true,
    run: (input) => {
      if (!input.trim()) return "";
      try { return JSON.stringify(yamlToJsonValue(input), null, 2); }
      catch (e) { throw new Error(`Could not parse YAML: ${(e as Error).message}`); }
    },
  },

  "markdown-to-html": {
    inputLabel: "Markdown",
    inputPlaceholder: "# Title\n\nSome **bold** text and a [link](https://konvertools.com).",
    outputLabel: "HTML",
    download: { ext: "html", mime: "text/html" },
    mono: true,
    run: (input) => (input.trim() ? markdownToHtml(input) : ""),
  },

  "html-to-markdown": {
    inputLabel: "HTML",
    inputPlaceholder: "<h1>Title</h1><p>Some <strong>bold</strong> text.</p>",
    outputLabel: "Markdown",
    download: { ext: "md", mime: "text/markdown" },
    mono: true,
    run: (input) => (input.trim() ? htmlToMarkdown(input) : ""),
  },

  "minify-css": {
    inputLabel: "CSS",
    inputPlaceholder: ".btn {\n  color: red;\n  padding: 8px;\n}",
    outputLabel: "Minified CSS",
    download: { ext: "css", mime: "text/css" },
    mono: true,
    run: (input) => (input.trim() ? minifyCss(input) : ""),
  },

  "format-sql": {
    inputLabel: "SQL",
    inputPlaceholder: "select id, name from users where age > 18 order by name",
    outputLabel: "Formatted SQL",
    download: { ext: "sql", mime: "text/plain" },
    mono: true,
    run: (input) => (input.trim() ? formatSql(input) : ""),
  },

  "word-counter": {
    inputLabel: "Your text",
    inputPlaceholder: "Paste or type your text here…",
    outputLabel: "Statistics",
    // Monospace so the space-padded "Label: value" columns line up — in a
    // proportional font the stats collapse into an unreadable ragged block.
    mono: true,
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

  // Clean AI export — strip the invisible watermark characters, Markdown
  // artefacts and "As an AI…" boilerplate that LLMs leave in copy-pasted text.
  // 100% in-browser, no AI, no quota.
  "clean-ai-export": {
    inputLabel: "Paste your AI text",
    inputPlaceholder: "Paste text from ChatGPT, Claude, Gemini…",
    outputLabel: "Clean text",
    modes: [
      { id: "standard", label: "Standard" },
      { id: "invisible", label: "Invisible chars only" },
      { id: "markdown", label: "Strip formatting" },
      { id: "plain", label: "Plain text" },
    ],
    defaultMode: "standard",
    download: { ext: "txt", mime: "text/plain;charset=utf-8" },
    run: (input, mode) => {
      // Zero-width / bidi / soft-hyphen / BOM characters used as AI "watermarks".
      const INVISIBLE = /[\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF\u00AD\u180E\u061C]/g;
      let s = input.replace(INVISIBLE, "").replace(/\r\n?/g, "\n");
      if (mode === "invisible") {
        return s.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
      }
      // Strip Markdown emphasis, headings, bullets and code fences.
      s = s
        .replace(/\*\*(.+?)\*\*/gs, "$1")
        .replace(/__(.+?)__/gs, "$1")
        .replace(/(^|[^*])\*(?!\*)([^*\n]+?)\*(?!\*)/g, "$1$2")
        .replace(/^[ \t]*#{1,6}[ \t]+/gm, "")
        .replace(/^[ \t]*[*+\-][ \t]+/gm, "• ")
        .replace(/`{1,3}/g, "");
      if (mode !== "markdown") {
        // Drop common AI boilerplate openers.
        s = s.replace(/^\s*(as an ai(?: language model)?|as a large language model|i'?m just an ai)\b[^.\n]*[.:]\s*/gim, "");
      }
      if (mode === "plain") {
        // Straighten smart punctuation to plain ASCII.
        s = s
          .replace(/[‘’‚‛]/g, "'")
          .replace(/[“”„‟]/g, '"')
          .replace(/[–—―]/g, "-")
          .replace(/…/g, "...")
          .replace(/\u00A0/g, " ");
      }
      return s
        .replace(/[ \t]{2,}/g, " ")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    },
  },

  // Anonymize / Redact (RGPD) — masks personal data (email, phone, IBAN, card,
  // SSN, IP) entirely in the browser. The text never leaves the device, which
  // is the whole point of a privacy tool.
  "anonymize-text": {
    inputLabel: "Text to anonymize",
    inputPlaceholder: "Paste text containing names, emails, phone numbers…",
    outputLabel: "Anonymized text",
    modes: [
      { id: "label", label: "Typed labels" },
      { id: "mask", label: "Mask (••••)" },
      { id: "remove", label: "Remove" },
    ],
    defaultMode: "label",
    download: { ext: "txt", mime: "text/plain;charset=utf-8" },
    run: (input, mode) => {
      // Order matters: consume structured numbers (IBAN/card/SSN/IP) before the
      // looser phone pattern so it can't re-match them. Replacements never
      // contain digits, so later passes skip already-redacted spans.
      const PII: { type: string; re: RegExp }[] = [
        { type: "EMAIL", re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi },
        { type: "IBAN", re: /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/gi },
        { type: "CARD", re: /\b(?:\d[ -]?){13,19}\b/g },
        { type: "SSN", re: /\b\d{3}-\d{2}-\d{4}\b/g },
        { type: "IP", re: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g },
        // Loose phone span (international formats); the replacer rejects it
        // unless it holds 7+ digits, so it won't redact stray short numbers.
        { type: "PHONE", re: /(?:\+|00)?\d[\d\s.()\-]{5,}\d/g },
      ];
      const replacer = (type: string) => (m: string) => {
        const digits = m.replace(/\D/g, "").length;
        if (type === "PHONE" && (digits < 7 || digits > 15)) return m;
        if (mode === "remove") return "";
        if (mode === "mask") return "•".repeat(Math.min(12, Math.max(4, m.replace(/\s/g, "").length)));
        return `[${type}]`;
      };
      let s = input;
      for (const { type, re } of PII) s = s.replace(re, replacer(type));
      return mode === "remove" ? s.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+\n/g, "\n").trim() : s;
    },
  },
};
