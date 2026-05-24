"use client";

import { CheckCircle2, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ads/AdSlot";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";

export type ResultScreenProps = {
  filename: string;
  preview?: string;
  onDownload: () => void;
  onReset: () => void;
  crossLinks?: { href: string; label: string }[];
  hideAds?: boolean;
};

export function ResultScreen({
  filename,
  preview,
  onDownload,
  onReset,
  crossLinks = [],
  hideAds = false,
}: ResultScreenProps) {
  const locale = useLocale();
  const chrome = getChrome(locale);
  const t = chrome.result;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-green-50">
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-ink-900">{t.ready}</h3>
          <p className="mt-1 text-sm text-ink-500">{filename}</p>
          <Button size="lg" className="mt-6" onClick={onDownload}>
            <Download className="h-4 w-4" />
            {t.download}
          </Button>
          <button
            type="button"
            onClick={onReset}
            className="mt-3 text-sm text-ink-500 underline-offset-4 hover:text-ink-900 hover:underline"
          >
            {t.tryAnother}
          </button>
        </div>

        {preview && (
          <div className="mt-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              {t.preview}
            </div>
            <pre className="max-h-64 overflow-auto rounded border border-ink-100 bg-ink-50 p-4 text-xs leading-relaxed text-ink-700">
              {preview}
            </pre>
          </div>
        )}

        {crossLinks.length > 0 && (
          <div className="mt-8 border-t border-ink-100 pt-6">
            <div className="text-sm font-semibold text-ink-900">{t.whatNext}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {crossLinks.map((l) => (
                <Link key={l.href} href={l.href}>
                  <Button variant="outline" size="sm">
                    {l.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {!hideAds && (
        <aside className="hidden lg:block">
          <div className="mb-2 text-[10px] uppercase tracking-wide text-ink-300">{chrome.processing.ad}</div>
          <AdSlot slot="sidebar" />
        </aside>
      )}
    </div>
  );
}
