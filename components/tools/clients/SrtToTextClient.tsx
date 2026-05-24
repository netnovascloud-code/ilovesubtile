"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";
import { parseSubtitles, toPlainText, downloadBlob } from "@/lib/srt-utils";

export function SrtToTextClient() {
  const [filename, setFilename] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [merge, setMerge] = useState(true);
  const [raw, setRaw] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const chrome = getChrome(locale);

  async function handleFile(file: File) {
    setError(null);
    try {
      const r = await file.text();
      const cues = parseSubtitles(r);
      if (!cues.length) {
        setError(chrome.errors.noCues);
        return;
      }
      setRaw(r);
      setFilename(file.name.replace(/\.(srt|vtt)$/i, "") + ".txt");
      setContent(toPlainText(cues, { mergeParagraphs: merge }));
    } catch (err) {
      setError(err instanceof Error ? err.message : chrome.errors.cantParse);
    }
  }

  function toggle() {
    if (!raw) return;
    const cues = parseSubtitles(raw);
    setContent(toPlainText(cues, { mergeParagraphs: !merge }));
    setMerge((v) => !v);
  }

  function reset() {
    setFilename(null);
    setContent(null);
    setRaw(null);
    setError(null);
  }

  if (content && filename) {
    return (
      <>
        <div className="mb-4">
          <Button variant="outline" size="sm" onClick={toggle}>
            {merge ? chrome.srtToText.merged : chrome.srtToText.perCue}
          </Button>
        </div>
        <ResultScreen
          filename={filename}
          preview={content.split("\n").slice(0, 12).join("\n")}
          onDownload={() => downloadBlob(content, filename, "text/plain")}
          onReset={reset}
        />
      </>
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
