"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, ArrowRight, X, Sparkles, Loader2 } from "lucide-react";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import { formatBytes, cn } from "@/lib/utils";
import { callTool } from "@/lib/tool-api";
import type { ToolCardSpec } from "@/lib/tools-config";

const RULES: Record<string, string[]> = {
  pdf: ["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-jpg", "rotate-pdf"],
  jpg: ["compress-image", "jpg-to-png", "jpg-to-webp", "resize-image"],
  jpeg: ["compress-image", "jpg-to-png", "jpg-to-webp", "resize-image"],
  png: ["compress-image", "png-to-jpg", "png-to-webp", "resize-image"],
  webp: ["compress-image", "resize-image"],
  svg: ["svg-to-png"],
  mp3: ["wav-to-mp3", "compress-audio", "cut-audio", "change-volume"],
  wav: ["mp3-to-wav", "compress-audio", "cut-audio"],
  m4a: ["compress-audio", "cut-audio"],
  flac: ["compress-audio", "cut-audio"],
  ogg: ["compress-audio", "cut-audio"],
  mp4: ["compress-video", "audio-from-video", "trim-video", "mp4-to-gif", "mp4-to-webm"],
  mov: ["compress-video", "audio-from-video", "trim-video", "mp4-to-webm"],
  mkv: ["compress-video", "audio-from-video", "trim-video"],
  webm: ["compress-video", "trim-video"],
  gif: ["gif-to-mp4"],
  zip: ["extract-zip"],
  json: ["format-json", "json-to-csv", "json-to-yaml", "json-to-xml"],
  csv: ["csv-to-json"],
  xml: ["xml-to-json"],
  yaml: ["yaml-to-json"], yml: ["yaml-to-json"],
  md: ["markdown-to-html"],
  html: ["html-to-markdown", "html-to-pdf"], htm: ["html-to-markdown", "html-to-pdf"],
  srt: ["srt-to-vtt", "srt-to-text", "translate-subtitles", "sync-subtitles"],
  vtt: ["vtt-to-srt", "srt-to-text", "translate-subtitles"],
  doc: ["word-to-pdf"], docx: ["word-to-pdf"],
  xls: ["excel-to-pdf"], xlsx: ["excel-to-pdf"],
};

const HINTS: Record<string, string> = {
  "merge-pdf": "Combine multiple PDFs into one.",
  "split-pdf": "Extract page ranges from a PDF.",
  "compress-pdf": "Reduce PDF size for email or upload.",
  "pdf-to-jpg": "Convert PDF pages to images.",
  "rotate-pdf": "Fix the orientation of every page.",
  "compress-image": "Cut file size, keep it sharp.",
  "jpg-to-png": "Lossless conversion with transparency.",
  "jpg-to-webp": "30% smaller at the same quality.",
  "png-to-jpg": "Smaller files for web and email.",
  "png-to-webp": "Tiny files, transparency kept.",
  "resize-image": "Set an exact width and height.",
  "svg-to-png": "Rasterise vectors at any resolution.",
  "wav-to-mp3": "Compress WAV to portable MP3.",
  "mp3-to-wav": "Lossless WAV from MP3.",
  "compress-audio": "Smaller file, same clarity.",
  "cut-audio": "Trim between two timestamps.",
  "change-volume": "Boost or lower the loudness.",
  "compress-video": "Shrink the file for sharing.",
  "audio-from-video": "Extract just the soundtrack.",
  "trim-video": "Cut between two timestamps.",
  "mp4-to-gif": "Make a short looped GIF.",
  "mp4-to-webm": "Web-optimised playback.",
  "gif-to-mp4": "Much smaller, same loop.",
  "extract-zip": "Open and pick files out of a ZIP.",
  "format-json": "Beautify, validate or minify.",
  "json-to-csv": "Turn API data into a spreadsheet.",
  "json-to-yaml": "Readable YAML for configs.",
  "json-to-xml": "Well-formed XML output.",
  "csv-to-json": "Spreadsheet rows to ready JSON.",
  "xml-to-json": "Clean JSON from XML.",
  "yaml-to-json": "Pipe-friendly JSON output.",
  "markdown-to-html": "Render Markdown to HTML.",
  "html-to-markdown": "Clean Markdown from HTML.",
  "html-to-pdf": "Render a web page to PDF.",
  "srt-to-vtt": "WebVTT for HTML5 players.",
  "vtt-to-srt": "SubRip for Premiere / DaVinci.",
  "srt-to-text": "Plain transcript, timestamps stripped.",
  "translate-subtitles": "Translate into 30+ languages.",
  "sync-subtitles": "Shift timing by milliseconds.",
  "word-to-pdf": "Convert .docx to PDF.",
  "excel-to-pdf": "Render every sheet to PDF.",
};

export function SmartDropZone({ tools }: { tools: ToolCardSpec[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [aiSlugs, setAiSlugs] = useState<{ slug: string; why: string }[] | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const ext = file ? (file.name.split(".").pop() || "").toLowerCase() : "";
  const slugs = ext ? (RULES[ext] ?? []) : [];
  const suggestions = slugs
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is ToolCardSpec => Boolean(t))
    .slice(0, 3);

  function pick(f: File | null) {
    setFile(f); setAiSlugs(null); setAiError(null);
  }

  async function askAi() {
    if (!file || aiBusy) return;
    setAiBusy(true); setAiError(null); setAiSlugs(null);
    try {
      const catalogue = tools.slice(0, 80).map((t) => ({ slug: t.slug, name: t.name, category: t.category, short: t.short }));
      const text = JSON.stringify({ file: { name: file.name, type: file.type || `application/${ext}`, sizeBytes: file.size }, tools: catalogue });
      const res = await callTool("smart-drop", { task: "analyze-file", text });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setAiError(data.error === "daily_limit" ? "Daily AI limit reached." : "Could not get AI suggestions."); return; }
      let parsed: { suggestions?: { slug: string; why: string }[] } = {};
      try { parsed = JSON.parse(data.output ?? "{}"); } catch { parsed = {}; }
      const list = (parsed.suggestions ?? []).filter((s) => tools.find((t) => t.slug === s.slug)).slice(0, 3);
      setAiSlugs(list);
    } catch { setAiError("Network error — try again."); }
    finally { setAiBusy(false); }
  }

  const aiCards = aiSlugs
    ? aiSlugs.map((s) => ({ tool: tools.find((t) => t.slug === s.slug)!, why: s.why })).filter((x) => x.tool)
    : null;

  if (!file) {
    return (
      <label className="mx-auto block max-w-2xl cursor-pointer rounded-xl border border-dashed border-ink-200 bg-white/60 p-3 text-center transition-colors hover:border-brand-300 hover:bg-white">
        <div className="flex items-center justify-center gap-2 text-sm text-ink-500">
          <Upload className="h-4 w-4" />
          <span>Drop any file here — we'll suggest the right tool.</span>
        </div>
        <input type="file" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
      </label>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-ink-200 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 truncate text-sm text-ink-700">
          <span className="font-semibold text-ink-900">{file.name}</span>
          <span className="ml-2 text-ink-400">{formatBytes(file.size)} · .{ext || "?"}</span>
        </div>
        <div className="flex items-center gap-1">
          {!aiCards && (
            <button onClick={askAi} disabled={aiBusy} className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 disabled:opacity-50">
              {aiBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
              {aiBusy ? "Thinking…" : "Ask AI"}
            </button>
          )}
          <button onClick={() => pick(null)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      {aiCards && aiCards.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-600"><Sparkles className="h-3 w-3" /> AI suggestions</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {aiCards.map(({ tool: t, why }) => (
              <Link key={t.slug} href={`/${t.slug}`} className="group flex flex-col gap-1 rounded-lg border border-indigo-100 bg-indigo-50/40 p-3 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-card">
                <div className="flex items-center gap-2">
                  <ToolGlyph category={t.category} iconName={t.iconName} px={28} />
                  <span className="truncate text-sm font-semibold text-ink-900">{t.name}</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-xs text-ink-600">{why}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {aiError && <p className="mt-2 text-xs text-red-600">{aiError}</p>}

      {suggestions.length === 0 ? (
        !aiCards && <p className="mt-3 text-sm text-ink-500">No rule-based match for <code>.{ext}</code> — try the search below or click <strong>Ask AI</strong>.</p>
      ) : (
        <div className="mt-3">
          {aiCards && <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">Quick picks</p>}
          <div className="grid gap-2 sm:grid-cols-3">
            {suggestions.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className={cn("group flex flex-col gap-1 rounded-lg border border-ink-100 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card")}>
                <div className="flex items-center gap-2">
                  <ToolGlyph category={t.category} iconName={t.iconName} px={28} />
                  <span className="truncate text-sm font-semibold text-ink-900">{t.name}</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-ink-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-xs text-ink-500">{HINTS[t.slug] ?? t.short}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
