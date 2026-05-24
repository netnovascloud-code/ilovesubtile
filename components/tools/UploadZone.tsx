"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileUp } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";

export type UploadZoneProps = {
  accept: string[];
  maxMb: number;
  onFile: (file: File) => void;
  cta?: string;
  multiple?: boolean;
};

export function UploadZone({ accept, maxMb, onFile, cta, multiple = false }: UploadZoneProps) {
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const chrome = getChrome(locale);
  const t = chrome.upload;

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (!accepted.length) return;
      const file = accepted[0];
      if (file.size > maxMb * 1024 * 1024) {
        setError(tt(t.fileTooLarge, { size: formatBytes(file.size), mb: maxMb }));
        return;
      }
      setError(null);
      onFile(file);
    },
    [onFile, maxMb, t],
  );

  const MIME: Record<string, string> = {
    srt: "application/x-subrip", vtt: "text/vtt", ass: "text/plain", txt: "text/plain",
    mp4: "video/mp4", mov: "video/quicktime", webm: "video/webm", mkv: "video/x-matroska", avi: "video/x-msvideo",
    mp3: "audio/mpeg", wav: "audio/wav", m4a: "audio/mp4", flac: "audio/flac", ogg: "audio/ogg",
  };
  const acceptMap: Record<string, string[]> = {};
  for (const ext of accept) {
    const mime = MIME[ext] ?? "application/octet-stream";
    acceptMap[mime] = (acceptMap[mime] ?? []).concat(`.${ext}`);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: acceptMap,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-200 bg-white px-6 py-16 text-center transition-colors",
          isDragActive && "border-brand-500 bg-brand-50/50",
        )}
      >
        <input {...getInputProps()} />
        <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600">
          {isDragActive ? <FileUp className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
        </div>
        <h3 className="mt-6 text-lg font-semibold text-ink-900">
          {isDragActive ? t.dropHere : t.dropOrClick}
        </h3>
        <p className="mt-2 max-w-md text-sm text-ink-500">
          {t.formats}: {accept.map((a) => a.toUpperCase()).join(", ")}. {tt(t.maxFree, { mb: maxMb })}
        </p>
        <Button type="button" className="mt-6" size="lg">
          {cta ?? t.selectFile}
        </Button>
      </div>
      {error && (
        <p className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
