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
} from "@/lib/srt-utils";

const QUICK = [-500, -100, 100, 500];

export function SyncClient() {
  const [offsetMs, setOffsetMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ content: string; name: string; format: "srt" | "vtt" } | null>(null);
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
      const cues = parseSubtitles(raw);
      if (!cues.length) {
        setError(chrome.errors.noCues);
        return;
      }
      const shifted = shiftCues(cues, offsetMs);
      const content = fmt === "vtt" ? toVtt(shifted) : toSrt(shifted);
      const name = file.name.replace(/\.(srt|vtt)$/i, "") + `.synced.${fmt}`;
      setResult({ content, name, format: fmt });
    } catch (err) {
      setError(err instanceof Error ? err.message : chrome.errors.cantParse);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  if (result) {
    return (
      <ResultScreen
        filename={result.name}
        preview={result.content.split("\n").slice(0, 12).join("\n")}
        onDownload={() =>
          downloadBlob(result.content, result.name, result.format === "vtt" ? "text/vtt" : "application/x-subrip")
        }
        onReset={reset}
      />
    );
  }

  const seconds = (offsetMs / 1000).toFixed(3).replace(/\.?0+$/, "");

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
        <h3 className="font-semibold text-ink-900">{t.prompt}</h3>
        <p className="mt-1 text-sm text-ink-500">{t.help}</p>

        <div className="mt-5 flex flex-wrap items-end gap-4">
          <div className="flex items-center gap-2">
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setOffsetMs((v) => v + q)}
                className="h-9 rounded border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                {q > 0 ? `+${q}` : q}ms
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-medium text-ink-500">{t.millis}</label>
            <Input
              type="number"
              step="1"
              value={offsetMs}
              onChange={(e) => setOffsetMs(Number(e.target.value) || 0)}
              className="mt-1 w-40"
            />
          </div>

          <button
            type="button"
            onClick={() => setOffsetMs(0)}
            className="h-9 text-sm text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline"
          >
            {t.cancel}
          </button>
        </div>

        <div className="mt-3 text-sm text-ink-700">
          {t.seconds}: <span className="font-mono font-medium">{offsetMs >= 0 ? "+" : ""}{seconds || "0"}s</span>
        </div>
      </div>

      <UploadZone accept={["srt", "vtt"]} maxMb={25} onFile={handleFile} />
      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
