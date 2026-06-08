"use client";

import { useState } from "react";
import { Mail, Loader2, Copy, Check, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callTool } from "@/lib/tool-api";

const LANGS = ["English", "French", "Spanish", "German", "Italian", "Portuguese", "Dutch"];

export function CoverLetterClient() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [target, setTarget] = useState("English");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run() {
    if (!name.trim() || !jobDesc.trim() || loading) return;
    setLoading(true); setError(null); setOutput("");
    try {
      const payload = JSON.stringify({
        name: name.trim(),
        current_role: role.trim(),
        key_skills: skills.trim(),
        target_job: jobDesc.trim(),
      });
      const res = await callTool("cover-letter", { task: "cover-letter", text: payload, options: { target } });
      const json = (await res.json()) as { output?: string; error?: string; message?: string };
      if (!res.ok || !json.output) throw new Error(json.message ?? json.error ?? `HTTP ${res.status}`);
      setOutput(json.output);
    } catch (e) {
      setError((e as Error).message);
    } finally { setLoading(false); }
  }

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1400); };

  async function downloadPdf() {
    if (!output) return;
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    const doc = await PDFDocument.create();
    const helv = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    let page = doc.addPage([595, 842]); // A4 in points
    const margin = 56, lineHeight = 15, size = 11;
    let y = 800;

    // Header: candidate name in bold + date
    page.drawText(name || "Cover Letter", { x: margin, y, size: 18, font: bold, color: rgb(0.05, 0.05, 0.06) });
    y -= 24;
    page.drawText(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
      { x: margin, y, size: 10, font: helv, color: rgb(0.4, 0.4, 0.42) });
    y -= 28;

    // Body — word-wrap by manually measuring widths against the available width.
    const maxWidth = 595 - 2 * margin;
    for (const paragraph of output.split(/\n+/)) {
      const words = paragraph.split(/\s+/);
      let line = "";
      for (const w of words) {
        const candidate = line ? `${line} ${w}` : w;
        if (helv.widthOfTextAtSize(candidate, size) > maxWidth) {
          page.drawText(line, { x: margin, y, size, font: helv, color: rgb(0.1, 0.1, 0.12) });
          y -= lineHeight; line = w;
          if (y < margin) { y = 800; page = doc.addPage([595, 842]); }
        } else line = candidate;
      }
      if (line) { page.drawText(line, { x: margin, y, size, font: helv, color: rgb(0.1, 0.1, 0.12) }); y -= lineHeight; }
      y -= 6;
      if (y < margin) { y = 800; page = doc.addPage([595, 842]); }
    }

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(name || "cover-letter").replace(/\s+/g, "-").toLowerCase()}.pdf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  const field = (label: string, v: string, set: (s: string) => void, kind: "input" | "textarea" = "input", rows = 3) => (
    <label className="flex flex-col text-xs font-medium text-ink-600">
      {label}
      {kind === "input" ? (
        <input value={v} onChange={(e) => set(e.target.value)}
          className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
      ) : (
        <textarea value={v} onChange={(e) => set(e.target.value)} rows={rows}
          className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
      )}
    </label>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {field("Your name", name, setName)}
        {field("Current role", role, setRole)}
      </div>
      {field("Key skills & strengths", skills, setSkills, "textarea", 3)}
      {field("Target job description (paste it)", jobDesc, setJobDesc, "textarea", 6)}

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Language
          <select value={target} onChange={(e) => setTarget(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <Button onClick={run} disabled={loading || !name.trim() || !jobDesc.trim()} size="lg">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Writing…" : output ? "Regenerate" : "Generate cover letter"}
        </Button>
      </div>

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-600">Your cover letter</span>
            <div className="flex gap-2">
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />} Copy
              </button>
              <button onClick={downloadPdf} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                <Download className="h-3 w-3" /> PDF
              </button>
            </div>
          </div>
          <textarea value={output} onChange={(e) => setOutput(e.target.value)}
            className="h-80 w-full rounded-lg border border-ink-200 bg-white p-4 text-sm leading-relaxed text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
      )}

      <p className="flex items-center gap-1.5 text-xs text-ink-400">
        <Mail className="h-3.5 w-3.5" />
        Drafted by AI from the job description you paste. Always read it through and tweak it to your voice.
      </p>
    </div>
  );
}
