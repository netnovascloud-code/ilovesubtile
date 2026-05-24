"use client";

import { useEffect, useState } from "react";

/**
 * Bait-element AdBlock detector. Never blocks the service —
 * callers decide what to do (show a polite message, lower the free quota).
 */
export function useAdblockDetect() {
  const [detected, setDetected] = useState<boolean | null>(null);

  useEffect(() => {
    const bait = document.createElement("div");
    bait.id = "ad-bait";
    bait.className = "ads ad-banner advertisement adsbox";
    bait.setAttribute("aria-hidden", "true");
    bait.style.cssText =
      "height:1px;width:1px;position:absolute;left:-9999px;opacity:0;pointer-events:none;";
    document.body.appendChild(bait);

    // Defer one tick so AdBlock has time to hide the element.
    const t = setTimeout(() => {
      const cs = window.getComputedStyle(bait);
      const hidden =
        bait.offsetHeight === 0 ||
        bait.offsetParent === null ||
        cs.display === "none" ||
        cs.visibility === "hidden";
      setDetected(Boolean(hidden));
      bait.remove();
    }, 200);

    return () => {
      clearTimeout(t);
      if (bait.isConnected) bait.remove();
    };
  }, []);

  return detected;
}
