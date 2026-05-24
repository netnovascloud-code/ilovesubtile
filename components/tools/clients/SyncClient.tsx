"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";
import {
  parseSubtitles,
  shiftCues,
  toSrt,
  toVtt,
  detectFormat,
  downloadBlob,
  type Cue,
} from "@/lib/srt-utils";

export function SyncClient() {
  const [filename, setFilename] = useState<string | null>(null);
  const [format, setFormat] = useState<"srt" | "vtt">("srt");
  const [cues, setCues] = useState<Cue[] | null>(null);
  const [offsetSec, setOffsetSec] = useState("0");
  const [offsetMs, setOffsetMs] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ content: string; name: string } | null>(null);
  const locale = useLocale();
  const chrome = getChrome(locale);
  const t = chrome.sync;

  async function handleFile(file: File) {
    setError(null);
    try {
      const raw = await file.text();
      const fmt = detectFormat(file.name, raw);
      if (fmt === "unknown") {
        setError(chrome.errors.badFormat);
        return;
      }
      const parsed = parseSubtitles(raw);
      if (!parsed.length) {
        setError(chrome.errors.noCues);
        return;
      }
      setFormat(fmt);
      setCues(parsed);
      setFilename(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : chrome.errors.cantParse);
    }
  }

  function apply() {
    if (!cues || !filename) return;
    const total = (parseFloat(offsetSec) || 0) * 1000 + (parseFloat(offsetMs) || 0);
    if (Number.isNaN(total)) {
      setError(chrome.errors.cantParse);
      return;
    }
    const shifted = shiftCues(cues, total);
    const content = format === "vtt" ? toVtt(shifted) : toSrt(shifted);
    const newName = filename.replace(/\.(srt|vtt)$/i, "") + `.synced.${format}`;
    setResult({ content, name: newName });
  }

  function reset() {
    setFilename(null);
    setCues(null);
    setResult(null);
    setOffsetSec("0");
    setOffsetMs("0");
    setError(null);
  }

  if (result) {
    return (
      <ResultScreen
        filename={result.name}
        preview={result.content.split("\n").slice(0, 12).join("\n")}
        onDownload={() =>
          downloadBlob(result.content, result.name, format === "vtt" ? "text/vtt" : "application/x-subrip")
        }
        onReset={reset}
      />
    );
  }

  if (cues) {
    return (
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <h3 className="font-semibold text-ink-900">{t.prompt}</h3>
        <p className="mt-1 text-sm text-ink-500">{t.help}</p>
        <div className="mt-6 grid max-w-md grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-ink-700">{t.seconds}</label>
            <Input
              type="number"
              step="0.001"
              value={offsetSec}
              onChange={(e) => setOffsetSec(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-700">{t.millis}</label>
            <Input
              type="number"
              step="1"
              value={offsetMs}
              onChange={(e) => setOffsetMs(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}
        <div className="mt-6 flex gap-2">
          <Button onClick={apply}>{t.apply}</Button>
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
