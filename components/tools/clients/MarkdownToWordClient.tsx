"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildDocx } from "@/lib/docx-writer";

const SAMPLE = `# Project Brief

## Overview
This document is **converted to Word** from Markdown, entirely in your browser.

## Goals
- Ship the new landing page
- Improve Core Web Vitals
- Add the pricing table

## Notes
See the [docs](https://example.com) for details.`;

/** Flatten markdown into plain lines + a set of heading line-indexes for buildDocx. */
function markdownToLines(md: string): { lines: string[]; headings: Set<number> } {
  const lines: string[] = [];
  const headings = new Set<number>();
  let inFence = false;
  for (const rawLine of md.replace(/\r\n/g, "\n").split("\n")) {
    let line = rawLine;
    if (/^```/.test(line.trim())) { inFence = !inFence; continue; }
    if (inFence) { lines.push(line); continue; }

    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) { headings.add(lines.length); lines.push(stripInline(h[2])); continue; }

    // Bullet / numbered lists → "• " prefix.
    const ul = /^\s*[-*+]\s+(.*)$/.exec(line);
    const ol = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (ul) { lines.push("•  " + stripInline(ul[1])); continue; }
    if (ol) { lines.push("•  " + stripInline(ol[1])); continue; }

    if (/^\s*>/.test(line)) { lines.push(stripInline(line.replace(/^\s*>\s?/, ""))); continue; }
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) { lines.push("———"); continue; } // hr

    lines.push(stripInline(line));
  }
  return { lines, headings };
}

/** Strip inline markdown markers, keeping the visible text (link text, no URL). */
function stripInline(s: string): string {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")     // images → alt text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")        // links → text
    .replace(/(\*\*|__)(.*?)\1/g, "$2")             // bold
    .replace(/(\*|_)(.*?)\1/g, "$2")                 // italic
    .replace(/`([^`]+)`/g, "$1")                     // inline code
    .trim();
}

export function MarkdownToWordClient() {
  const [md, setMd] = useState(SAMPLE);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setBusy(true); setError(null);
    try {
      const { lines, headings } = markdownToLines(md);
      const blob = await buildDocx(lines, headings);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "document.docx";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (e) {
      setError(`Could not build the document: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setMd(await f.text());
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 hover:border-brand-300">
          <FileText className="h-4 w-4" /> Load a .md file
          <input type="file" accept=".md,.markdown,text/markdown,text/plain" onChange={onFile} className="hidden" />
        </label>
        <span className="text-xs text-ink-400">{md.length.toLocaleString()} characters</span>
      </div>

      <textarea
        value={md} onChange={(e) => setMd(e.target.value)} spellCheck={false}
        className="h-72 w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        placeholder="Paste your Markdown here…"
      />

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <Button onClick={generate} disabled={busy || !md.trim()} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Download .docx
      </Button>

      <p className="text-xs text-ink-400">
        Headings, lists, blockquotes and inline emphasis are converted to a clean, editable Word document — built entirely in your browser.
      </p>
    </div>
  );
}
