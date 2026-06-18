"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGE_NAMES, NON_DEFAULT_LOCALES, isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

const ALL: Locale[] = [DEFAULT_LOCALE, ...NON_DEFAULT_LOCALES];

/** Keep the user on the SAME page when switching language: strip the current
 *  locale prefix, then prepend the target one. Non-localised sections
 *  (dashboard, billing, login, …) have no /<locale>/ route — middleware
 *  308-redirects those back to the English canonical, so this never 404s. */
function swapLocale(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0]) && parts[0] !== "en") parts.shift();
  const rest = parts.join("/");
  if (target === DEFAULT_LOCALE) return rest ? `/${rest}` : "/";
  return rest ? `/${target}/${rest}` : `/${target}`;
}

/** Footer language picker — a compact dropdown (opens upward). hreflang for
 *  crawlers lives in the <head> alternates, so a JS dropdown is fine here. */
export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  /** Persist the choice, then hard-navigate so EVERY layer (server render,
   *  <html lang>/dir, and every client useLocale() reader) picks up the new
   *  language at once — no manual refresh and no half-translated chrome.
   *
   *  TWO cookies, two readers — both must agree or the chrome desyncs (the bug
   *  this fixes):
   *   • konver_locale → useLocale() / HtmlLang drive the footer, navbar and
   *     <html lang> on non-prefixed routes. This is the one that was missing.
   *   • NEXT_LOCALE   → middleware's `/` auto-redirect + x-locale. Without it,
   *     switching to English on `/` would bounce straight back to /<old-locale>. */
  function switchTo(loc: Locale) {
    setOpen(false);
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `konver_locale=${loc}; path=/; max-age=${maxAge}; samesite=lax`;
    document.cookie = `NEXT_LOCALE=${loc}; path=/; max-age=${maxAge}; samesite=lax`;
    window.location.assign(swapLocale(pathname, loc));
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-ink-300 hover:text-ink-900"
      >
        <Globe className="h-3.5 w-3.5" />
        {LANGUAGE_NAMES[current]}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute bottom-full right-0 z-30 mb-2 max-h-72 w-48 overflow-auto rounded-lg border border-ink-100 bg-white p-1 shadow-xl"
        >
          {ALL.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                lang={loc}
                onClick={() => switchTo(loc)}
                className={cn(
                  "block w-full rounded px-3 py-1.5 text-left text-sm transition-colors hover:bg-ink-50",
                  loc === current ? "font-semibold text-brand-700" : "text-ink-600",
                )}
              >
                {LANGUAGE_NAMES[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
