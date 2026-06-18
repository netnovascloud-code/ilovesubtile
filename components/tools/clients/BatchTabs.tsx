"use client";

import { useState } from "react";
import { Image as ImageIcon, FileText, Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/locales";
import { getBatch } from "@/lib/i18n/page-batch";
import { BatchImageClient } from "@/components/tools/clients/BatchImageClient";
import { BatchPdfClient } from "@/components/tools/clients/BatchPdfClient";
import { BatchAudioClient } from "@/components/tools/clients/BatchAudioClient";
import { BatchVideoClient } from "@/components/tools/clients/BatchVideoClient";

type Mode = "image" | "pdf" | "audio" | "video";

export function BatchTabs({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<Mode>("image");
  const t = getBatch(locale).tabs;
  return (
    <div className="space-y-5">
      <div className="inline-flex flex-wrap rounded-lg border border-ink-200 bg-white p-1">
        <button onClick={() => setMode("image")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "image" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <ImageIcon className="h-3.5 w-3.5" /> {t.images}
        </button>
        <button onClick={() => setMode("pdf")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "pdf" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <FileText className="h-3.5 w-3.5" /> {t.pdfs}
        </button>
        <button onClick={() => setMode("audio")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "audio" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <Music className="h-3.5 w-3.5" /> {t.audio}
        </button>
        <button onClick={() => setMode("video")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "video" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <Video className="h-3.5 w-3.5" /> {t.videos}
        </button>
      </div>
      {mode === "image" ? <BatchImageClient locale={locale} /> : mode === "pdf" ? <BatchPdfClient locale={locale} /> : mode === "audio" ? <BatchAudioClient locale={locale} /> : <BatchVideoClient locale={locale} />}
    </div>
  );
}
