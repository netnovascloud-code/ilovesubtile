export type Cue = {
  /** 1-based index in the original file (used for re-emit) */
  index: number;
  /** Start time in milliseconds */
  start: number;
  /** End time in milliseconds */
  end: number;
  /** Text lines, joined by \n on emit */
  lines: string[];
};

const TIME_SRT = /^(\d{1,3}):(\d{2}):(\d{2})[,.](\d{1,3})$/;
const TIME_VTT = /^(?:(\d{1,3}):)?(\d{2}):(\d{2})[,.](\d{1,3})$/;

function toMs(h: string, m: string, s: string, ms: string): number {
  return (
    Number(h) * 3_600_000 +
    Number(m) * 60_000 +
    Number(s) * 1_000 +
    Number(ms.padEnd(3, "0").slice(0, 3))
  );
}

function fromMs(total: number, sep = ","): string {
  const clamped = Math.max(0, Math.round(total));
  const h = Math.floor(clamped / 3_600_000);
  const m = Math.floor((clamped % 3_600_000) / 60_000);
  const s = Math.floor((clamped % 60_000) / 1_000);
  const ms = clamped % 1_000;
  return (
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0") +
    sep +
    String(ms).padStart(3, "0")
  );
}

function normalise(text: string): string {
  return text.replace(/\r\n?/g, "\n").replace(/^﻿/, "");
}

function parseTimecodeLine(line: string): { start: number; end: number } | null {
  const parts = line.split("-->").map((s) => s.trim());
  if (parts.length !== 2) return null;
  const [a, b] = parts;
  const ma = TIME_SRT.exec(a) || TIME_VTT.exec(a);
  const mb = TIME_SRT.exec(b.split(/\s+/)[0] ?? b) || TIME_VTT.exec(b.split(/\s+/)[0] ?? b);
  if (!ma || !mb) return null;
  const start = ma.length === 5 ? toMs(ma[1], ma[2], ma[3], ma[4]) : toMs("0", ma[2], ma[3], ma[4]);
  const end = mb.length === 5 ? toMs(mb[1], mb[2], mb[3], mb[4]) : toMs("0", mb[2], mb[3], mb[4]);
  return { start, end };
}

/** Parse any SRT or VTT file into a list of cues. Tolerant to BOM, CRLF, and minor format drift. */
export function parseSubtitles(raw: string): Cue[] {
  const text = normalise(raw);
  const lines = text.split("\n");
  const cues: Cue[] = [];
  let i = 0;
  let cueIndex = 0;

  // Skip the WEBVTT header if present.
  if (lines[0]?.trim().toUpperCase().startsWith("WEBVTT")) {
    i = 1;
    while (i < lines.length && lines[i].trim() !== "") i++;
  }

  while (i < lines.length) {
    while (i < lines.length && lines[i].trim() === "") i++;
    if (i >= lines.length) break;

    // Optional cue identifier (SRT index or VTT cue id).
    let possibleId = lines[i];
    let timing: { start: number; end: number } | null = null;

    if (possibleId.includes("-->")) {
      timing = parseTimecodeLine(possibleId);
    } else {
      i++;
      if (i >= lines.length) break;
      timing = parseTimecodeLine(lines[i] ?? "");
    }

    if (!timing) {
      i++;
      continue;
    }
    i++;

    const textLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "") {
      textLines.push(lines[i]);
      i++;
    }

    cueIndex += 1;
    cues.push({ index: cueIndex, start: timing.start, end: timing.end, lines: textLines });
  }

  return cues;
}

export function toSrt(cues: Cue[]): string {
  return (
    cues
      .map(
        (c, idx) =>
          `${idx + 1}\n${fromMs(c.start, ",")} --> ${fromMs(c.end, ",")}\n${c.lines.join("\n")}`,
      )
      .join("\n\n") + "\n"
  );
}

export function toVtt(cues: Cue[]): string {
  const body = cues
    .map(
      (c) =>
        `${fromMs(c.start, ".")} --> ${fromMs(c.end, ".")}\n${c.lines.join("\n")}`,
    )
    .join("\n\n");
  return `WEBVTT\n\n${body}\n`;
}

export function toPlainText(cues: Cue[], opts: { mergeParagraphs?: boolean } = {}): string {
  if (opts.mergeParagraphs) {
    return cues.map((c) => c.lines.join(" ")).join(" ").trim() + "\n";
  }
  return cues.map((c) => c.lines.join(" ")).join("\n") + "\n";
}

export function shiftCues(cues: Cue[], offsetMs: number): Cue[] {
  return cues.map((c) => ({
    ...c,
    start: Math.max(0, c.start + offsetMs),
    end: Math.max(0, c.end + offsetMs),
  }));
}

export type CleanOptions = {
  stripSdh?: boolean;
  removeDuplicates?: boolean;
  normaliseShouting?: boolean;
  collapseWhitespace?: boolean;
  trim?: boolean;
};

const SDH = /\[[^\]]+\]|\([^)]+\)/g;

export function cleanCues(cues: Cue[], opts: CleanOptions = {}): Cue[] {
  const out: Cue[] = [];
  for (const c of cues) {
    let lines = c.lines.map((l) => {
      let s = l;
      if (opts.stripSdh) s = s.replace(SDH, "");
      if (opts.collapseWhitespace) s = s.replace(/\s+/g, " ");
      if (opts.normaliseShouting && /^[\sA-ZÀ-ÝÆŒ0-9\W]+$/.test(s) && /[A-ZÀ-ÝÆŒ]/.test(s)) {
        s = s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase());
      }
      if (opts.trim) s = s.trim();
      return s;
    });
    lines = lines.filter((l) => l.length > 0);
    if (lines.length === 0) continue;
    if (
      opts.removeDuplicates &&
      out.length > 0 &&
      out[out.length - 1].lines.join("\n") === lines.join("\n")
    ) {
      out[out.length - 1].end = c.end;
      continue;
    }
    out.push({ ...c, lines });
  }
  return out;
}

/** Detect the most likely subtitle format from a filename or raw content. */
export function detectFormat(filename: string | undefined, raw: string): "srt" | "vtt" | "unknown" {
  if (filename?.toLowerCase().endsWith(".vtt")) return "vtt";
  if (filename?.toLowerCase().endsWith(".srt")) return "srt";
  if (normalise(raw).trimStart().toUpperCase().startsWith("WEBVTT")) return "vtt";
  if (/\d{2}:\d{2}:\d{2},\d{3}\s*-->/m.test(raw)) return "srt";
  return "unknown";
}

export function downloadBlob(content: string, filename: string, mime = "text/plain") {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
