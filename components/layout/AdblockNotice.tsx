"use client";

import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import Link from "next/link";
import { useAdblockDetect } from "@/hooks/useAdblockDetect";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";
import { localePath } from "@/lib/i18n/locales";

const SESSION_KEY = "adblock_notice_shown";

export function AdblockNotice() {
  const detected = useAdblockDetect();
  const [visible, setVisible] = useState(false);
  const locale = useLocale();
  const t = getChrome(locale).adblock;

  // Show only after the first successful generation, once per session.
  useEffect(() => {
    function onGenerated() {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      if (!detected) return;
      sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(true);
    }
    window.addEventListener("cf:generated", onGenerated);
    return () => window.removeEventListener("cf:generated", onGenerated);
  }, [detected]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 max-w-sm rounded-lg border border-ink-100 bg-white p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded bg-brand-50 text-brand-600">
          <Heart className="h-4 w-4" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-medium text-ink-900">{t.title}</p>
          <p className="mt-1 text-ink-500">
            {t.body1}{" "}
            <Link href={localePath(locale, "pricing")} className="text-brand-600 underline">
              {t.goPro}
            </Link>
            {t.body2}
          </p>
        </div>
        <button
          aria-label={t.dismiss}
          onClick={() => setVisible(false)}
          className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
