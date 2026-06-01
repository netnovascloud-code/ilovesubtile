"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGE_NAMES, NON_DEFAULT_LOCALES, isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

const ALL: Locale[] = [DEFAULT_LOCALE, ...NON_DEFAULT_LOCALES];

/** Keep the user on the SAME page when switching language: strip the current
 *  locale prefix, then prepend the target one. */
function swapLocale(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0]) && parts[0] !== "en") parts.shift();
  const rest = parts.join("/");
  if (target === DEFAULT_LOCALE) return rest ? `/${rest}` : "/";
  return rest ? `/${target}/${rest}` : `/${target}`;
}

/** Footer language picker — same spot, now a compact dropdown (opens upward).
 *  hreflang for crawlers lives in the <head> alternates, so a JS dropdown is
 *  fine here. */
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
              <Link
                href={swapLocale(pathname, loc)}
                hrefLang={loc}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded px-3 py-1.5 text-sm transition-colors hover:bg-ink-50",
                  loc === current ? "font-semibold text-brand-700" : "text-ink-600",
                )}
              >
                {LANGUAGE_NAMES[loc]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
