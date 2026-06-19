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

const TABLE: Partial<Record<Locale, Strings>> = { en: EN, fr: FR };

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
