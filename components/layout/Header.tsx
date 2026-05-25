"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";
import { localePath } from "@/lib/i18n/locales";
import { UserMenu } from "@/components/layout/UserMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();
  const chrome = getChrome(locale);
  const t = chrome.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { href: `${localePath(locale)}#tools`, label: t.tools },
    { href: localePath(locale, "pricing"), label: t.pricing },
    { href: localePath(locale, "api"), label: t.api },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/90 backdrop-blur transition-colors",
        scrolled ? "border-b border-ink-100" : "",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href={localePath(locale)} className="flex items-center font-semibold text-lg tracking-tight text-ink-900">
          CaptionFlow
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-ink-700 transition-colors hover:text-ink-900"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <UserMenu
            labels={{
              login: t.login,
              start: t.start,
              dashboard: chrome.footer.dashboard,
              billing: chrome.account.billing,
              logout: chrome.account.logout,
            }}
          />
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded p-2 text-ink-700 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-100 bg-white md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="rounded px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-3">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  {t.login}
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button size="sm" className="w-full">
                  {t.start}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
