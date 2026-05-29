"use client";

import { useEffect, useRef, useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { SubtitleStylePicker, DEFAULT_STYLE, type SubtitleStyle } from "@/components/tools/SubtitleStylePicker";
import { useLocale } from "@/hooks/useLocale";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { parseSubtitles, toAss, type Cue } from "@/lib/srt-utils";

type Phase = "idle" | "done" | "error";

// Styling subtitles produces a self-contained .ass file (Advanced SubStation
// Alpha), which carries the look inline — so this is a pure in-browser text
// transform. No upload, no media engine: parse the SRT/VTT, re-emit as ASS,
// and regenerate whenever the style changes.
export function StyleSubtitlesClient() {
  const [style, setStyle] = useState<SubtitleStyle>(DEFAULT_STYLE);
  const [phase, setPhase] = useState<Phase>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [cues, setCues] = useState<Cue[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  const locale = useLocale();
  const ui = getToolUi(locale);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  function build(nextCues: Cue[], nextStyle: SubtitleStyle) {
    const ass = toAss(nextCues, nextStyle);
    if (cleanup.current) URL.revokeObjectURL(cleanup.current);
    const url = URL.createObjectURL(new Blob([ass], { type: "text/plain;charset=utf-8" }));
    cleanup.current = url;
    setResultUrl(url);
  }

  async function start(f: File) {
    setError(null);
    try {
      const raw = await f.text();
      const parsed = parseSubtitles(raw);
      if (!parsed.length) {
        setPhase("error");
        setError("No subtitle cues found — please upload a valid .srt or .vtt file.");
        return;
      }
      setFileName(f.name.replace(/\.[^.]+$/, "") + ".ass");
      setCues(parsed);
      build(parsed, style);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : "Could not read this file.");
    }
  }

  // Re-render the ASS whenever the style changes after the first build.
  useEffect(() => {
    if (cues) build(cues, style);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style]);

  function reset() {
    setStyle(DEFAULT_STYLE);
    setPhase("idle");
    setCues(null);
    setFileName("");
    setResultUrl(null);
    setError(null);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-ink-900">{ui.burnIn.customise}</h3>
        <div className="mt-6">
          <SubtitleStylePicker value={style} onChange={setStyle} labels={ui.style} />
        </div>
      </div>

      {phase === "done" && resultUrl && cues ? (
        <ResultScreen
          filename={fileName}
          onDownload={() => {
            const a = document.createElement("a");
            a.href = resultUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }}
          onReset={reset}
        />
      ) : (
        <UploadZone accept={["srt", "vtt"]} maxMb={25} onFile={start} cta={ui.style.download} />
      )}

      {phase === "error" && error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
      <p className="text-xs text-ink-400">100% in your browser — your subtitles are never uploaded.</p>
    </div>
  );
}
