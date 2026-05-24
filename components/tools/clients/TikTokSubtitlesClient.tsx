"use client";

import { useState } from "react";
import { Sparkles, Music2, MessageCircle, Type } from "lucide-react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";
import type { SubtitleStyle } from "@/components/tools/SubtitleStylePicker";

type Phase = "idle" | "configure" | "uploading" | "done" | "error";
type Preset = "classic" | "karaoke" | "popup" | "bigbold";

const PRESET_STYLES: Record<Preset, SubtitleStyle> = {
  classic: {
    fontFamily: "Inter", fontSizePx: 32, color: "#FFFFFF", outlineColor: "#000000",
    outlineWidth: 3, bold: true, italic: false, position: "bottom", align: "center",
  },
  karaoke: {
    fontFamily: "Impact", fontSizePx: 40, color: "#FFD600", outlineColor: "#000000",
    outlineWidth: 4, bold: true, italic: false, position: "middle", align: "center",
  },
  popup: {
    fontFamily: "Roboto", fontSizePx: 36, color: "#FFFFFF", outlineColor: "#2D6BE4",
    outlineWidth: 5, bold: true, italic: false, position: "middle", align: "center",
  },
  bigbold: {
    fontFamily: "Impact", fontSizePx: 52, color: "#FFFFFF", outlineColor: "#000000",
    outlineWidth: 5, bold: true, italic: false, position: "middle", align: "center",
  },
};

export function TikTokSubtitlesClient() {
  const [video, setVideo] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>("classic");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);

  const locale = useLocale();
  const chrome = getChrome(locale);
  const ui = getToolUi(locale);

  function onFile(f: File) {
    setVideo(f);
    setPhase("configure");
    setError(null);
  }

  async function start() {
    if (!video) return;
    setPhase("uploading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", video);
      fd.append("style", JSON.stringify(PRESET_STYLES[preset]));
      fd.append("preset", preset);
      fd.append("word_by_word", String(preset !== "classic"));
      const res = await fetch("/api/process/tiktok-subtitles", { method: "POST", body: fd });
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
    setPreset("classic");
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
      />
    );
  }

  if (phase === "uploading" && video) {
    return <ProcessingScreen filename={video.name} fileSize={video.size} status={chrome.processing.processing} />;
  }

  if (phase === "configure" && video) {
    const presets: { id: Preset; label: string; icon: React.ReactNode; bg: string }[] = [
      { id: "classic", label: ui.tiktok.classic, icon: <Type className="h-5 w-5" />, bg: "bg-ink-100" },
      { id: "karaoke", label: ui.tiktok.karaoke, icon: <Music2 className="h-5 w-5" />, bg: "bg-amber-100" },
      { id: "popup", label: ui.tiktok.popup, icon: <MessageCircle className="h-5 w-5" />, bg: "bg-brand-100" },
      { id: "bigbold", label: ui.tiktok.bigBold, icon: <Sparkles className="h-5 w-5" />, bg: "bg-rose-100" },
    ];

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
          <div className="text-sm text-ink-500">{video.name}</div>
          <h3 className="mt-2 text-lg font-semibold text-ink-900">{ui.tiktok.pickPreset}</h3>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-sm transition-colors",
                  preset === p.id ? "border-brand-500 bg-brand-50" : "border-ink-100 bg-white hover:bg-ink-50",
                )}
              >
                <div className={cn("grid h-12 w-12 place-items-center rounded-full", p.bg)}>
                  {p.icon}
                </div>
                <span className="font-medium text-ink-900">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <div className="flex gap-2">
          <Button onClick={start}>{ui.tiktok.render}</Button>
          <Button variant="outline" onClick={reset}>
            {chrome.sync.cancel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <UploadZone
        accept={["mp4", "mov", "webm", "mp3", "m4a"]}
        maxMb={100}
        onFile={onFile}
      />
      {phase === "error" && error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
