"use client";

import { useMemo, useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseSubtitles, toSrt, toVtt, detectFormat, downloadBlob, type Cue } from "@/lib/srt-utils";

function msToInput(ms: number) {
  const total = Math.max(0, Math.round(ms));
  const h = Math.floor(total / 3_600_000);
  const m = Math.floor((total % 3_600_000) / 60_000);
  const s = Math.floor((total % 60_000) / 1_000);
  const mmm = total % 1_000;
  return (
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0") +
    "." +
    String(mmm).padStart(3, "0")
  );
}

function inputToMs(v: string): number | null {
  const m = /^(\d{1,3}):([0-5]?\d):([0-5]?\d)[.,](\d{1,3})$/.exec(v.trim());
  if (!m) return null;
  return Number(m[1]) * 3_600_000 + Number(m[2]) * 60_000 + Number(m[3]) * 1_000 + Number(m[4].padEnd(3, "0").slice(0, 3));
}

export function EditorClient() {
  const [filename, setFilename] = useState<string | null>(null);
  const [format, setFormat] = useState<"srt" | "vtt">("srt");
  const [cues, setCues] = useState<Cue[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    try {
      const raw = await file.text();
      const fmt = detectFormat(file.name, raw);
      if (fmt === "unknown") {
        setError("Couldn't detect SRT or VTT format.");
        return;
      }
      setFormat(fmt);
      setCues(parseSubtitles(raw));
      setFilename(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't parse that file.");
    }
  }

  function updateCue(idx: number, patch: Partial<Cue>) {
    if (!cues) return;
    setCues(cues.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  }

  function deleteCue(idx: number) {
    if (!cues) return;
    setCues(cues.filter((_, i) => i !== idx));
  }

  function exportFile() {
    if (!cues || !filename) return;
    const content = format === "vtt" ? toVtt(cues) : toSrt(cues);
    const name = filename.replace(/\.(srt|vtt)$/i, "") + `.edited.${format}`;
    downloadBlob(content, name, format === "vtt" ? "text/vtt" : "application/x-subrip");
  }

  const totalDuration = useMemo(() => (cues?.length ? cues[cues.length - 1].end : 0), [cues]);

  if (!cues) {
    return (
      <div className="space-y-4">
        <UploadZone accept={["srt", "vtt"]} maxMb={25} onFile={handleFile} cta="Open file" />
        {error && (
          <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-ink-100 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-ink-100 p-4">
        <div>
          <div className="text-sm font-medium text-ink-900">{filename}</div>
          <div className="text-xs text-ink-400">
            {cues.length} cues · {msToInput(totalDuration)} total
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setCues(null); setFilename(null); }}>
            Open another
          </Button>
          <Button size="sm" onClick={exportFile}>
            Export {format.toUpperCase()}
          </Button>
        </div>
      </div>

      <div className="divide-y divide-ink-100">
        {cues.map((c, idx) => (
          <div key={idx} className="grid gap-3 p-4 md:grid-cols-[80px_180px_1fr_auto]">
            <div className="text-sm text-ink-400">#{idx + 1}</div>
            <div className="space-y-1">
              <Input
                value={msToInput(c.start)}
                onChange={(e) => {
                  const ms = inputToMs(e.target.value);
                  if (ms !== null) updateCue(idx, { start: ms });
                }}
                className="font-mono text-xs"
              />
              <Input
                value={msToInput(c.end)}
                onChange={(e) => {
                  const ms = inputToMs(e.target.value);
                  if (ms !== null) updateCue(idx, { end: ms });
                }}
                className="font-mono text-xs"
              />
            </div>
            <textarea
              value={c.lines.join("\n")}
              onChange={(e) => updateCue(idx, { lines: e.target.value.split("\n") })}
              rows={2}
              className="w-full resize-y rounded border border-ink-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="button"
              onClick={() => deleteCue(idx)}
              className="self-start rounded p-1 text-xs text-ink-400 hover:bg-red-50 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
