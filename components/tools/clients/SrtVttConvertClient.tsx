"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { parseSubtitles, toSrt, toVtt, detectFormat, downloadBlob, type Cue } from "@/lib/srt-utils";

type Mode = "srt-to-vtt" | "vtt-to-srt";

export function SrtVttConvertClient({ mode }: { mode: Mode }) {
  const target = mode === "srt-to-vtt" ? "vtt" : "srt";
  const [filename, setFilename] = useState<string | null>(null);
  const [result, setResult] = useState<{ content: string; cues: Cue[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    try {
      const raw = await file.text();
      const fmt = detectFormat(file.name, raw);
      if (fmt !== "unknown" && fmt !== (mode === "srt-to-vtt" ? "srt" : "vtt")) {
        setError(
          `That looks like a ${fmt.toUpperCase()} file. Try the ${fmt === "vtt" ? "VTT to SRT" : "SRT to VTT"} converter instead.`,
        );
        return;
      }
      const cues = parseSubtitles(raw);
      if (!cues.length) {
        setError("Couldn't find any subtitle cues in that file.");
        return;
      }
      const content = target === "vtt" ? toVtt(cues) : toSrt(cues);
      const newName = file.name.replace(/\.(srt|vtt)$/i, "") + `.${target}`;
      setFilename(newName);
      setResult({ content, cues });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't parse that file.");
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
        onDownload={() => downloadBlob(result.content, filename, target === "vtt" ? "text/vtt" : "application/x-subrip")}
        onReset={reset}
        crossLinks={[
          { href: "/translate-subtitles", label: "Translate this file" },
          { href: "/sync-subtitles", label: "Fix the timing" },
          { href: "/subtitle-editor", label: "Open in editor" },
        ]}
      />
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone
        accept={mode === "srt-to-vtt" ? ["srt"] : ["vtt"]}
        maxMb={25}
        onFile={handleFile}
        cta={mode === "srt-to-vtt" ? "Convert to VTT" : "Convert to SRT"}
      />
      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
