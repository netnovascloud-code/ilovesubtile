"use client";

import { useMemo, useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
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

export function CleanClient() {
  const [filename, setFilename] = useState<string | null>(null);
  const [format, setFormat] = useState<"srt" | "vtt">("srt");
  const [cues, setCues] = useState<Cue[] | null>(null);
  const [opts, setOpts] = useState<CleanOptions>(DEFAULT_OPTS);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ content: string; name: string } | null>(null);
  const locale = useLocale();
  const chrome = getChrome(locale);
  const t = chrome.clean;

  const TOGGLES: { key: keyof CleanOptions; label: string }[] = [
    { key: "stripSdh", label: t.stripSdh },
    { key: "removeDuplicates", label: t.removeDup },
    { key: "normaliseShouting", label: t.shouting },
    { key: "collapseWhitespace", label: t.collapseWs },
    { key: "trim", label: t.trim },
  ];

  const cleaned = useMemo(() => (cues ? cleanCues(cues, opts) : null), [cues, opts]);

  async function handleFile(file: File) {
    setError(null);
    try {
      const raw = await file.text();
      const fmt = detectFormat(file.name, raw);
      if (fmt === "unknown") {
        setError(chrome.errors.badFormat);
        return;
      }
      setFormat(fmt);
      setCues(parseSubtitles(raw));
      setFilename(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : chrome.errors.cantParse);
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
        <h3 className="font-semibold text-ink-900">{t.title}</h3>
        <p className="mt-1 text-sm text-ink-500">
          {tt(t.summary, { a: cues.length, b: cleaned.length })}
        </p>
        <div className="mt-6 space-y-3">
          {TOGGLES.map((toggle) => (
            <label key={toggle.key} className="flex items-center gap-3 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={Boolean(opts[toggle.key])}
                onChange={(e) => setOpts((o) => ({ ...o, [toggle.key]: e.target.checked }))}
                className="h-4 w-4 rounded border-ink-200 text-brand-500 focus:ring-brand-500"
              />
              {toggle.label}
            </label>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button onClick={finalize}>{t.download}</Button>
          <Button variant="outline" onClick={reset}>
            {t.cancel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone accept={["srt", "vtt"]} maxMb={25} onFile={handleFile} />
      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
