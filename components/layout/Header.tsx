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
import { ToolsMenu } from "@/components/layout/ToolsMenu";
import { AiQuotaPill } from "@/components/billing/AiQuotaPill";
import { CATEGORIES } from "@/lib/tools-config";

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

  const toolsHref = `${localePath(locale)}#tools`;
  const categories = CATEGORIES.map((c) => ({ id: c.id, label: c.label }));

  // Flat list used only for the mobile drawer.
  const MOBILE_NAV = [
    { href: toolsHref, label: t.tools },
    { href: "/workflow", label: "Workflow" },
    { href: "/batch", label: "Batch" },
    { href: "/translator", label: "Translator" },
    { href: "/rephraser", label: "Rephraser" },
    { href: "/ai-humanizer", label: "AI Humanizer" },
    { href: localePath(locale, "pricing"), label: t.pricing },
    // /api, /workflow, /batch have no localized route — link them un-prefixed
    // (the header itself stays translated via the locale cookie).
    { href: "/api", label: t.api },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/90 backdrop-blur transition-colors",
        scrolled ? "border-b border-ink-100" : "",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href={localePath(locale)}
          onClick={() => {
            // On the homepage, a same-route click won't remount the explorer,
            // so tell it to reset its category filter and scroll to the top.
            if (typeof window !== "undefined") {
              const p = window.location.pathname;
              if (p === "/" || p === localePath(locale)) {
                window.dispatchEvent(new CustomEvent("konver:home"));
              }
            }
          }}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink-900"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-[17px] font-extrabold leading-none text-white shadow-sm">K</span>
          <span>Konver</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <ToolsMenu categories={categories} toolsHref={toolsHref} />
          <Link href="/workflow" className="text-sm text-ink-700 transition-colors hover:text-ink-900">Workflow</Link>
          <Link href="/batch" className="text-sm text-ink-700 transition-colors hover:text-ink-900">Batch</Link>
          <Link href={localePath(locale, "pricing")} className="text-sm text-ink-700 transition-colors hover:text-ink-900">{t.pricing}</Link>
          <Link href="/api" className="text-sm text-ink-700 transition-colors hover:text-ink-900">{t.api}</Link>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-3">
          <AiQuotaPill />
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
            {MOBILE_NAV.map((n) => (
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
