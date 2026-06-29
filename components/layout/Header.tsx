"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";
import { localePath, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { UserMenu } from "@/components/layout/UserMenu";
import { ToolsMenu } from "@/components/layout/ToolsMenu";
import { AiQuotaPill } from "@/components/billing/AiQuotaPill";
import { CATEGORIES } from "@/lib/tools-config";
import { categoryLabel } from "@/lib/i18n/resolve-category-i18n";

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
  const categories = CATEGORIES.map((c) => ({
    id: c.id,
    label: categoryLabel(c.id, locale),
    href: localePath(locale, c.id),
  }));

  // /login and /register have no /<locale> route — they localise via ?lang.
  // Carry the active locale so a French visitor lands on a French auth form
  // instead of the English default.
  const langQuery = locale !== DEFAULT_LOCALE ? `?lang=${locale}` : "";
  const loginHref = `/login${langQuery}`;
  const registerHref = `/register${langQuery}`;

  // Flat list used only for the mobile drawer.
  const MOBILE_NAV = [
    { href: toolsHref, label: t.tools },
    { href: localePath(locale, "workflow"), label: t.workflow },
    { href: localePath(locale, "batch"), label: t.batch },
    { href: "/translator", label: "Translator" },
    { href: "/rephraser", label: "Rephraser" },
    { href: "/ai-humanizer", label: "AI Humanizer" },
    { href: localePath(locale, "pricing"), label: t.pricing },
    // workflow / batch now have localised routes (app/[locale]/…).
    // translator / rephraser / ai-humanizer stay English-only (SEO landing pages).
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
          className="flex items-center"
          aria-label="Konvertools — Home"
        >
          {/* Brand wordmark — 647x122 source, rendered at 28px tall.
              `priority` because it's above the fold on every page. */}
          <Image
            src="/Logo.png"
            alt="Konvertools"
            width={149}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <ToolsMenu categories={categories} toolsHref={toolsHref} locale={locale} />
          <Link href={localePath(locale, "workflow")} className="text-sm text-ink-700 transition-colors hover:text-ink-900">{t.workflow}</Link>
          <Link href={localePath(locale, "batch")} className="text-sm text-ink-700 transition-colors hover:text-ink-900">{t.batch}</Link>
          <Link href={localePath(locale, "pricing")} prefetch={false} className="text-sm text-ink-700 transition-colors hover:text-ink-900">{t.pricing}</Link>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-3">
          <AiQuotaPill />
          <UserMenu
            loginHref={loginHref}
            registerHref={registerHref}
            dashboardHref={localePath(locale, "dashboard")}
            billingHref={localePath(locale, "billing")}
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
              <Link href={loginHref} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  {t.login}
                </Button>
              </Link>
              <Link href={registerHref} className="flex-1">
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
