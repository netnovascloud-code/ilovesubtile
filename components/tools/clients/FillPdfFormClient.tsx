"use client";

import { useState } from "react";
import { Upload, Download, X, Loader2, FormInput } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

/**
 * Fill PDF Form — 100% in-browser via pdf-lib's AcroForm API.
 * Detects every form field in the uploaded PDF, renders an input per field,
 * then saves a flattened PDF (no editable fields left). Supports text,
 * checkbox, radio and dropdown fields — the four common AcroForm types.
 *
 * If the PDF has no form fields (e.g. a flat scan), we surface that clearly
 * so the user goes to /sign-pdf instead.
 */

type TextEntry = { kind: "text"; name: string; max: number };
type CheckEntry = { kind: "check"; name: string };
type RadioEntry = { kind: "radio"; name: string; options: string[] };
type DropdownEntry = { kind: "dropdown"; name: string; options: string[] };
type Entry = TextEntry | CheckEntry | RadioEntry | DropdownEntry;

export function FillPdfFormClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [flatten, setFlatten] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("form.pdf");
  const [outSize, setOutSize] = useState(0);

  async function onFile(f: File) {
    setFile(f); setError(null); setOutUrl(null); setEntries([]); setValues({});
    try {
      const bytes = new Uint8Array(await f.arrayBuffer());
      setPdfBytes(bytes);
      const { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFDropdown } = await import("pdf-lib");
      const doc = await PDFDocument.load(bytes);
      const form = doc.getForm();
      const fields = form.getFields();
      const next: Entry[] = [];
      const seed: Record<string, string | boolean> = {};
      for (const f of fields) {
        const name = f.getName();
        if (f instanceof PDFTextField) {
          next.push({ kind: "text", name, max: f.getMaxLength() ?? 0 });
          seed[name] = f.getText() ?? "";
        } else if (f instanceof PDFCheckBox) {
          next.push({ kind: "check", name });
          seed[name] = f.isChecked();
        } else if (f instanceof PDFRadioGroup) {
          next.push({ kind: "radio", name, options: f.getOptions() });
          seed[name] = f.getSelected() ?? "";
        } else if (f instanceof PDFDropdown) {
          next.push({ kind: "dropdown", name, options: f.getOptions() });
          seed[name] = f.getSelected()?.[0] ?? "";
        }
      }
      setEntries(next);
      setValues(seed);
      if (next.length === 0) setError("No fillable form fields were found in this PDF. Use Sign PDF to add a signature instead.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't read that PDF.");
      setPdfBytes(null);
    }
  }

  async function save() {
    if (!pdfBytes || !file || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFDropdown } = await import("pdf-lib");
      const doc = await PDFDocument.load(pdfBytes);
      const form = doc.getForm();
      for (const e of entries) {
        const v = values[e.name];
        const field = form.getField(e.name);
        if (e.kind === "text" && field instanceof PDFTextField) field.setText(String(v ?? ""));
        else if (e.kind === "check" && field instanceof PDFCheckBox) (v ? field.check() : field.uncheck());
        else if (e.kind === "radio" && field instanceof PDFRadioGroup && v) field.select(String(v));
        else if (e.kind === "dropdown" && field instanceof PDFDropdown && v) field.select(String(v));
      }
      if (flatten) form.flatten();
      const out = await doc.save();
      const blob = new Blob([new Uint8Array(out)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(url);
      setOutSize(blob.size);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-filled.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save the filled PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-brand-50/30 px-6 py-12 text-center transition-colors hover:border-brand-300">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Upload className="h-5 w-5" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">Upload your fillable PDF</span>
          <span className="mt-0.5 text-xs text-ink-400">Any PDF with AcroForm fields — stays in your browser</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)} · {entries.length} field{entries.length === 1 ? "" : "s"}</span>
          </div>
          <button onClick={() => { setFile(null); setPdfBytes(null); setEntries([]); setValues({}); setOutUrl(null); setError(null); }}
            className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {entries.length > 0 && (
        <div className="space-y-3 rounded-lg border border-ink-100 bg-white p-4">
          {entries.map((e) => (
            <div key={e.name}>
              <label className="block text-xs font-medium text-ink-600">{e.name}</label>
              {e.kind === "text" && (
                <input
                  type="text"
                  value={String(values[e.name] ?? "")}
                  maxLength={e.max || undefined}
                  onChange={(ev) => setValues((s) => ({ ...s, [e.name]: ev.target.value }))}
                  className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              )}
              {e.kind === "check" && (
                <label className="mt-1 inline-flex items-center gap-2 text-sm text-ink-800">
                  <input type="checkbox" checked={Boolean(values[e.name])}
                    onChange={(ev) => setValues((s) => ({ ...s, [e.name]: ev.target.checked }))}
                    className="h-4 w-4 rounded border-ink-300 accent-brand-500" />
                  Checked
                </label>
              )}
              {(e.kind === "radio" || e.kind === "dropdown") && (
                <select value={String(values[e.name] ?? "")}
                  onChange={(ev) => setValues((s) => ({ ...s, [e.name]: ev.target.value }))}
                  className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100">
                  <option value="">— choose —</option>
                  {e.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              )}
            </div>
          ))}
          <label className="mt-2 flex items-center gap-2 text-xs text-ink-600">
            <input type="checkbox" checked={flatten} onChange={(e) => setFlatten(e.target.checked)} className="h-3.5 w-3.5 rounded border-ink-300 accent-brand-500" />
            Flatten the form (no editable fields left in the saved PDF)
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={save} disabled={!entries.length || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FormInput className="h-4 w-4" />}
          {busy ? "Saving…" : "Save filled PDF"}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        Reads and writes AcroForm fields (text, checkbox, radio, dropdown). Nothing is uploaded — your PDF stays on this device.
      </p>
    </div>
  );
}
