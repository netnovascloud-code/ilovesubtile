"use client";

import { useState } from "react";
import { Image as ImageIcon, FileText, Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { BatchImageClient } from "@/components/tools/clients/BatchImageClient";
import { BatchPdfClient } from "@/components/tools/clients/BatchPdfClient";
import { BatchAudioClient } from "@/components/tools/clients/BatchAudioClient";
import { BatchVideoClient } from "@/components/tools/clients/BatchVideoClient";

type Mode = "image" | "pdf" | "audio" | "video";

export function BatchTabs() {
  const [mode, setMode] = useState<Mode>("image");
  return (
    <div className="space-y-5">
      <div className="inline-flex flex-wrap rounded-lg border border-ink-200 bg-white p-1">
        <button onClick={() => setMode("image")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "image" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <ImageIcon className="h-3.5 w-3.5" /> Images
        </button>
        <button onClick={() => setMode("pdf")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "pdf" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <FileText className="h-3.5 w-3.5" /> Compress PDFs
        </button>
        <button onClick={() => setMode("audio")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "audio" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <Music className="h-3.5 w-3.5" /> Audio → MP3
        </button>
        <button onClick={() => setMode("video")} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === "video" ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
          <Video className="h-3.5 w-3.5" /> Compress videos
        </button>
      </div>
      {mode === "image" ? <BatchImageClient /> : mode === "pdf" ? <BatchPdfClient /> : mode === "audio" ? <BatchAudioClient /> : <BatchVideoClient />}
    </div>
  );
}
