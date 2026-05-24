import Link from "next/link";
import { TOOLS } from "@/lib/tools-config";
import { LANGUAGE_NAMES, NON_DEFAULT_LOCALES } from "@/lib/i18n/locales";

export function Footer() {
  const featured = TOOLS.filter((t) => t.phase === 1);

  return (
    <footer className="mt-24 border-t border-ink-100 bg-white">
      <div className="container grid grid-cols-2 gap-10 py-12 md:grid-cols-5">
        <div className="col-span-2 md:col-span-2">
          <div className="font-semibold text-ink-900">CaptionFlow</div>
          <p className="mt-3 max-w-sm text-sm text-ink-500">
            Free subtitle tools online — generate, translate, sync, convert. One simple tool per
            job, all in your browser.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-ink-900">Top tools</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            {featured.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="hover:text-ink-900">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-ink-900">Product</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li>
              <Link href="/pricing" className="hover:text-ink-900">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/api" className="hover:text-ink-900">
                API
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-ink-900">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/veed-alternative" className="hover:text-ink-900">
                vs VEED.io
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-ink-900">Legal</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li>
              <Link href="/privacy" className="hover:text-ink-900">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink-900">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-100">
        <div className="container flex flex-col gap-3 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} CaptionFlow. All rights reserved.</div>
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
