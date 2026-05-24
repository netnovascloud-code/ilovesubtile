"use client";

import { useState } from "react";
import { FilmIcon, FileText, Flame } from "lucide-react";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { Button } from "@/components/ui/button";
import { SubtitleStylePicker, DEFAULT_STYLE, type SubtitleStyle } from "@/components/tools/SubtitleStylePicker";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";

type Phase = "idle" | "uploading" | "done" | "error";

export function AddSubtitlesToVideoClient({ crossLinks = [] }: { crossLinks?: { href: string; label: string }[] }) {
  const [video, setVideo] = useState<File | null>(null);
  const [subs, setSubs] = useState<File | null>(null);
  const [style, setStyle] = useState<SubtitleStyle>(DEFAULT_STYLE);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);

  const locale = useLocale();
  const chrome = getChrome(locale);
  const ui = getToolUi(locale);

  async function burnIn() {
    if (!video || !subs) {
      setError(getToolUi(locale).autoSync.bothNeeded);
      return;
    }
    setPhase("uploading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("video", video);
      fd.append("subtitles", subs);
      fd.append("style", JSON.stringify(style));
      const res = await fetch("/api/process/add-subtitles-to-video", { method: "POST", body: fd });
      if (res.status === 503) {
        setPhase("error");
        setError(chrome.errors.notWiredUp);
        return;
      }
      if (!res.ok) {
        setPhase("error");
        setError(tt(chrome.errors.serverReturned, { status: res.status }));
        return;
      }
      const data = (await res.json()) as { url?: string; filename?: string };
      if (!data.url) {
        setPhase("error");
        setError(chrome.errors.noResultUrl);
        return;
      }
      setResultUrl(data.url);
      setResultName(data.filename ?? `${video.name.replace(/\.[^.]+$/, "")}.captioned.mp4`);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : chrome.errors.network);
    }
  }

  function reset() {
    setVideo(null);
    setSubs(null);
    setStyle(DEFAULT_STYLE);
    setPhase("idle");
    setResultUrl(null);
    setResultName(null);
    setError(null);
  }

  if (phase === "done" && resultUrl && resultName) {
    return (
      <ResultScreen
        filename={resultName}
        onDownload={() => {
          const a = document.createElement("a");
          a.href = resultUrl;
          a.download = resultName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }}
        onReset={reset}
        crossLinks={crossLinks}
      />
    );
  }

  if (phase === "uploading" && video && subs) {
    return <ProcessingScreen filename={`${video.name} + ${subs.name}`} fileSize={video.size + subs.size} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniDrop
          label={ui.burnIn.videoFile}
          accept={{
            "video/mp4": [".mp4"],
            "video/quicktime": [".mov"],
            "video/webm": [".webm"],
            "video/x-matroska": [".mkv"],
            "video/x-msvideo": [".avi"],
          }}
          icon={<FilmIcon className="h-5 w-5" />}
          onFile={setVideo}
          current={video}
        />
        <MiniDrop
          label={ui.burnIn.subtitleFile}
          accept={{ "application/x-subrip": [".srt"], "text/vtt": [".vtt"] }}
          icon={<FileText className="h-5 w-5" />}
          onFile={setSubs}
          current={subs}
        />
      </div>

      {video && subs && (
        <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
          <h3 className="text-lg font-semibold text-ink-900">{ui.burnIn.customise}</h3>
          <div className="mt-6">
            <SubtitleStylePicker value={style} onChange={setStyle} labels={ui.style} />
          </div>
        </div>
      )}

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex gap-2">
        <Button onClick={burnIn} disabled={!video || !subs}>
          <Flame className="h-4 w-4" />
          {ui.burnIn.burnNow}
        </Button>
        {(video || subs) && (
          <Button variant="outline" onClick={reset}>
            {chrome.sync.cancel}
          </Button>
        )}
      </div>
    </div>
  );
}
