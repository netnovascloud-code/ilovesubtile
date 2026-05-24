"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";

export type ProcessingScreenProps = {
  filename: string;
  fileSize: number;
  progress?: number;
  status?: string;
  hideAds?: boolean;
};

export function ProcessingScreen({
  filename,
  fileSize,
  progress,
  status,
  hideAds = false,
}: ProcessingScreenProps) {
  const [fakeProgress, setFakeProgress] = useState(0);
  const locale = useLocale();
  const chrome = getChrome(locale);

  useEffect(() => {
    if (progress !== undefined) return;
    const id = setInterval(() => {
      setFakeProgress((p) => Math.min(p + (100 - p) * 0.08, 92));
    }, 600);
    return () => clearInterval(id);
  }, [progress]);

  const pct = Math.round(progress ?? fakeProgress);

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
      <div className="flex flex-col items-center text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <h3 className="mt-4 text-lg font-semibold text-ink-900">{status ?? chrome.processing.working}</h3>
        <p className="mt-1 text-sm text-ink-500">
          {filename} · {formatBytes(fileSize)}
        </p>

        <div className="mt-6 w-full max-w-md">
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-ink-400">
            <span>{pct}%</span>
            <span>{chrome.processing.takes}</span>
          </div>
        </div>
      </div>

      {!hideAds && (
        <div className="mt-8">
          <div className="mb-2 text-center text-[10px] uppercase tracking-wide text-ink-300">
            {chrome.processing.ad}
          </div>
          <AdSlot slot="processing" />
        </div>
      )}
    </div>
  );
}
