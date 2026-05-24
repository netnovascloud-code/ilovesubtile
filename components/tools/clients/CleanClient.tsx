"use client";

import { useMemo, useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import {
  parseSubtitles,
  cleanCues,
  toSrt,
  toVtt,
  detectFormat,
  downloadBlob,
  type Cue,
  type CleanOptions,
} from "@/lib/srt-utils";

const DEFAULT_OPTS: CleanOptions = {
  stripSdh: true,
  removeDuplicates: true,
  normaliseShouting: false,
  collapseWhitespace: true,
  trim: true,
};

const TOGGLES: { key: keyof CleanOptions; label: string }[] = [
  { key: "stripSdh", label: "Strip SDH tags like [music] (sigh)" },
  { key: "removeDuplicates", label: "Remove consecutive duplicate lines" },
  { key: "normaliseShouting", label: "Convert ALL-CAPS to sentence case" },
  { key: "collapseWhitespace", label: "Collapse multiple spaces" },
  { key: "trim", label: "Trim whitespace around each line" },
];

export function CleanClient() {
  const [filename, setFilename] = useState<string | null>(null);
  const [format, setFormat] = useState<"srt" | "vtt">("srt");
  const [cues, setCues] = useState<Cue[] | null>(null);
  const [opts, setOpts] = useState<CleanOptions>(DEFAULT_OPTS);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ content: string; name: string } | null>(null);

  const cleaned = useMemo(() => (cues ? cleanCues(cues, opts) : null), [cues, opts]);

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

  function finalize() {
    if (!cleaned || !filename) return;
    const content = format === "vtt" ? toVtt(cleaned) : toSrt(cleaned);
    const name = filename.replace(/\.(srt|vtt)$/i, "") + `.cleaned.${format}`;
    setDone({ content, name });
  }

  function reset() {
    setFilename(null);
    setCues(null);
    setDone(null);
    setError(null);
    setOpts(DEFAULT_OPTS);
  }

  if (done) {
    return (
      <ResultScreen
        filename={done.name}
        preview={done.content.split("\n").slice(0, 12).join("\n")}
        onDownload={() =>
          downloadBlob(done.content, done.name, format === "vtt" ? "text/vtt" : "application/x-subrip")
        }
        onReset={reset}
      />
    );
  }

  if (cues && cleaned) {
    return (
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <h3 className="font-semibold text-ink-900">What should we clean?</h3>
        <p className="mt-1 text-sm text-ink-500">
          {cues.length} cues in · {cleaned.length} after cleanup.
        </p>
        <div className="mt-6 space-y-3">
          {TOGGLES.map((t) => (
            <label key={t.key} className="flex items-center gap-3 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={Boolean(opts[t.key])}
                onChange={(e) => setOpts((o) => ({ ...o, [t.key]: e.target.checked }))}
                className="h-4 w-4 rounded border-ink-200 text-brand-500 focus:ring-brand-500"
              />
              {t.label}
            </label>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button onClick={finalize}>Download cleaned file</Button>
          <Button variant="outline" onClick={reset}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone accept={["srt", "vtt"]} maxMb={25} onFile={handleFile} cta="Choose file" />
      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
