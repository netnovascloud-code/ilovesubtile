"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { TOOLS } from "@/lib/tools-config";
import { LANGUAGE_NAMES, NON_DEFAULT_LOCALES, localePath } from "@/lib/i18n/locales";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";
import { resolveToolI18n } from "@/lib/i18n/resolve-tool-i18n";

export function Footer() {
  const locale = useLocale();
  const t = getChrome(locale).footer;
  const featured = TOOLS.filter((tool) => tool.phase === 1);

  return (
    <footer className="mt-24 border-t border-ink-100 bg-white">
      <div className="container grid grid-cols-2 gap-10 py-12 md:grid-cols-5">
        <div className="col-span-2 md:col-span-2">
          <div className="font-semibold text-ink-900">Konver</div>
          <p className="mt-3 max-w-sm text-sm text-ink-500">{t.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" /> GDPR Compliant · Files never stored
          </span>
        </div>

        <div>
          <div className="text-sm font-semibold text-ink-900">{t.topTools}</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            {featured.map((tool) => {
              const i18n = locale === "en" ? null : resolveToolI18n(tool.slug, locale);
              return (
                <li key={tool.slug}>
                  <Link href={localePath(locale, tool.slug)} className="hover:text-ink-900">
                    {i18n?.name ?? tool.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-ink-900">{t.product}</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li>
              <Link href={localePath(locale, "pricing")} className="hover:text-ink-900">
                {t.pricing}
              </Link>
            </li>
            <li>
              <Link href={localePath(locale, "api")} className="hover:text-ink-900">
                {t.api}
              </Link>
            </li>
            <li>
              <Link href="/dashboard" prefetch={false} className="hover:text-ink-900">
                {t.dashboard}
              </Link>
            </li>
            <li>
              <Link href="/veed-alternative" className="hover:text-ink-900">
                {t.vsVeed}
              </Link>
            </li>
            <li>
              <Link href="/kapwing-alternative" className="hover:text-ink-900">
                vs Kapwing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-ink-900">{t.legal}</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li>
              <Link href="/privacy" className="hover:text-ink-900">
                {t.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink-900">
                {t.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-100">
        <div className="container flex flex-col gap-3 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Konver. {t.rights}</div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/" hrefLang="en" className="hover:text-ink-700">
              {LANGUAGE_NAMES.en}
            </Link>
            {NON_DEFAULT_LOCALES.map((loc) => (
              <Link key={loc} href={`/${loc}`} hrefLang={loc} className="hover:text-ink-700">
                {LANGUAGE_NAMES[loc]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
