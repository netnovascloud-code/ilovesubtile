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

/** Style shape needed to emit ASS — structurally matches the SubtitleStyle the
 *  style picker produces, but declared here so this lib stays React-free. */
export type AssStyleInput = {
  fontFamily: string;
  fontSizePx: number;
  color: string;
  outlineColor: string;
  outlineWidth: number;
  bold: boolean;
  italic: boolean;
  position: "top" | "middle" | "bottom";
  align: "left" | "center" | "right";
};

function assTime(ms: number): string {
  const t = Math.max(0, Math.round(ms));
  const h = Math.floor(t / 3_600_000);
  const m = Math.floor((t % 3_600_000) / 60_000);
  const s = Math.floor((t % 60_000) / 1_000);
  const cs = Math.floor((t % 1_000) / 10);
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

/** #RRGGBB → ASS &HAABBGGRR (alpha 00 = fully opaque). */
function assColor(hex: string): string {
  const m = /^#?([0-9a-fA-F]{6})$/.exec((hex || "").trim());
  if (!m) return "&H00FFFFFF";
  const r = m[1].slice(0, 2), g = m[1].slice(2, 4), b = m[1].slice(4, 6);
  return `&H00${b}${g}${r}`.toUpperCase();
}

/** Serialise cues to an Advanced SubStation Alpha (.ass) file with the given
 *  style. ASS keeps styling inline, so this is a pure text transform — no media
 *  engine needed. PlayRes is fixed at 1080p, which the font size is relative to. */
export function toAss(cues: Cue[], style: AssStyleInput): string {
  // ASS alignment is numpad-style: 1-3 bottom, 4-6 middle, 7-9 top; within each
  // row 1/2/3 = left/centre/right.
  const base = style.position === "top" ? 7 : style.position === "middle" ? 4 : 1;
  const col = style.align === "left" ? 0 : style.align === "right" ? 2 : 1;
  const alignment = base + col;
  const bold = style.bold ? -1 : 0;
  const italic = style.italic ? -1 : 0;
  const size = Math.max(1, Math.round(style.fontSizePx));
  const outline = Math.max(0, style.outlineWidth);

  const header = [
    "[Script Info]",
    "ScriptType: v4.00+",
    "WrapStyle: 0",
    "ScaledBorderAndShadow: yes",
    "PlayResX: 1920",
    "PlayResY: 1080",
    "",
    "[V4+ Styles]",
    "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    `Style: Default,${style.fontFamily},${size},${assColor(style.color)},&H000000FF,${assColor(style.outlineColor)},&H64000000,${bold},${italic},0,0,100,100,0,0,1,${outline},0,${alignment},60,60,50,1`,
    "",
    "[Events]",
    "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
  ].join("\n");

  const events = cues
    .map((c) => `Dialogue: 0,${assTime(c.start)},${assTime(c.end)},Default,,0,0,0,,${c.lines.join("\\N")}`)
    .join("\n");

  return `${header}\n${events}\n`;
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
