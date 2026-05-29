"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces the window back to the top on every route change.
 *
 * Next's App Router usually does this for <Link> navigations, but nested
 * layouts, programmatic router.push() calls and the home explorer's
 * category/tool switches can leave the viewport scrolled mid-page. Listening
 * to the pathname and resetting scroll guarantees the user always lands at
 * the top of the new page.
 *
 * Deliberately keyed on pathname ONLY — not useSearchParams — because reading
 * search params here would opt the whole tree out of static generation (Next
 * would demand a Suspense boundary), and we want every route to stay SSG.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    // "instant" so it doesn't animate on every click; ignored by older browsers.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}
