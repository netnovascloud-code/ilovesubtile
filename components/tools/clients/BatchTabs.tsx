"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Image as ImageIcon, FileText, Music, Video, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/lib/i18n/locales";
import { getBatch } from "@/lib/i18n/page-batch";
import { useUser } from "@/hooks/useUser";
import { batchLimit, BATCH_MAX_FILES } from "@/lib/plan-limits";
import { BatchImageClient } from "@/components/tools/clients/BatchImageClient";
import { BatchPdfClient } from "@/components/tools/clients/BatchPdfClient";
import { BatchAudioClient } from "@/components/tools/clients/BatchAudioClient";
import { BatchVideoClient } from "@/components/tools/clients/BatchVideoClient";

type Mode = "image" | "pdf" | "audio" | "video";

// Tier banner copy (en + fr, English fallback for other locales).
const B: Record<string, { anon: string; free: string; paid: string; signIn: string; upgrade: string }> = {
  en: {
    anon: `Without an account: up to {n} files at once. Sign in for ${BATCH_MAX_FILES.free}, or go Pro for ${BATCH_MAX_FILES.pro}.`,
    free: `Free plan: up to {n} files at once. Go Pro for ${BATCH_MAX_FILES.pro} (Business ${BATCH_MAX_FILES.business}).`,
    paid: "Your plan: up to {n} files at once.",
    signIn: "Sign in", upgrade: "Go Pro",
  },
  fr: {
    anon: `Sans compte : jusqu'à {n} fichiers à la fois. Connectez-vous pour ${BATCH_MAX_FILES.free}, ou passez Pro pour ${BATCH_MAX_FILES.pro}.`,
    free: `Plan gratuit : jusqu'à {n} fichiers à la fois. Passez Pro pour ${BATCH_MAX_FILES.pro} (Business ${BATCH_MAX_FILES.business}).`,
    paid: "Votre plan : jusqu'à {n} fichiers à la fois.",
    signIn: "Se connecter", upgrade: "Passer à Pro",
  },
};

export function BatchTabs({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<Mode>("image");
  const t = getBatch(locale).tabs;
  const { user, plan, loading } = useUser();
  const signedIn = !!user;
  const maxFiles = batchLimit(plan, signedIn);
  const bt = B[locale] ?? B.en;
  const tier = !signedIn ? "anon" : (plan === "pro" || plan === "business") ? "paid" : "free";
  const msg = (tier === "anon" ? bt.anon : tier === "free" ? bt.free : bt.paid).replace("{n}", String(maxFiles));

  const tabBtn = (m: Mode, icon: ReactNode, label: string) => (
    <button onClick={() => setMode(m)} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === m ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
      {icon} {label}
    </button>
  );

  return (
    <div className="space-y-5">
      {!loading && (
        <div className="flex flex-col items-start gap-2 rounded-lg border border-ink-100 bg-ink-50/50 p-3 text-sm text-ink-600 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-ink-400" /> {msg}</span>
          {tier === "anon" && (
            <Link href="/login" className="shrink-0 rounded-md bg-brand-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-brand-600">{bt.signIn}</Link>
          )}
          {tier === "free" && (
            <Link href={localePath(locale, "pricing")} prefetch={false} className="shrink-0 rounded-md bg-brand-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-brand-600">{bt.upgrade}</Link>
          )}
        </div>
      )}

      <div className="inline-flex flex-wrap rounded-lg border border-ink-200 bg-white p-1">
        {tabBtn("image", <ImageIcon className="h-3.5 w-3.5" />, t.images)}
        {tabBtn("pdf", <FileText className="h-3.5 w-3.5" />, t.pdfs)}
        {tabBtn("audio", <Music className="h-3.5 w-3.5" />, t.audio)}
        {tabBtn("video", <Video className="h-3.5 w-3.5" />, t.videos)}
      </div>

      {mode === "image" ? <BatchImageClient locale={locale} maxFiles={maxFiles} />
        : mode === "pdf" ? <BatchPdfClient locale={locale} maxFiles={maxFiles} />
        : mode === "audio" ? <BatchAudioClient locale={locale} maxFiles={maxFiles} />
        : <BatchVideoClient locale={locale} maxFiles={maxFiles} />}
    </div>
  );
}
