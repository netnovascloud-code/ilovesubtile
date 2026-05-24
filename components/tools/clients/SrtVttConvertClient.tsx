"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { parseSubtitles, toSrt, toVtt, detectFormat, downloadBlob, type Cue } from "@/lib/srt-utils";

type Mode = "srt-to-vtt" | "vtt-to-srt";

export function SrtVttConvertClient({ mode }: { mode: Mode }) {
  const target = mode === "srt-to-vtt" ? "vtt" : "srt";
  const [filename, setFilename] = useState<string | null>(null);
  const [result, setResult] = useState<{ content: string; cues: Cue[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const chrome = getChrome(locale);

  async function handleFile(file: File) {
    setError(null);
    try {
      const raw = await file.text();
      const fmt = detectFormat(file.name, raw);
      const expected = mode === "srt-to-vtt" ? "srt" : "vtt";
      if (fmt !== "unknown" && fmt !== expected) {
        setError(tt(chrome.errors.wrongFormat, {
          fmt: fmt.toUpperCase(),
          other: fmt === "vtt" ? "VTT → SRT" : "SRT → VTT",
        }));
        return;
      }
      const cues = parseSubtitles(raw);
      if (!cues.length) {
        setError(chrome.errors.noCues);
        return;
      }
      const content = target === "vtt" ? toVtt(cues) : toSrt(cues);
      const newName = file.name.replace(/\.(srt|vtt)$/i, "") + `.${target}`;
      setFilename(newName);
      setResult({ content, cues });
    } catch (err) {
      setError(err instanceof Error ? err.message : chrome.errors.cantParse);
    }
  }

  function reset() {
    setFilename(null);
    setResult(null);
    setError(null);
  }

  if (result && filename) {
    return (
      <ResultScreen
        filename={filename}
        preview={result.content.split("\n").slice(0, 12).join("\n")}
        onDownload={() =>
          downloadBlob(result.content, filename, target === "vtt" ? "text/vtt" : "application/x-subrip")
        }
        onReset={reset}
      />
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone accept={mode === "srt-to-vtt" ? ["srt"] : ["vtt"]} maxMb={25} onFile={handleFile} />
      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
