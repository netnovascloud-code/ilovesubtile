/**
 * Advertising configuration.
 *
 * Ads stay OFF until traffic justifies them (target: ~50k visitors/month).
 * Flip ADS_ENABLED to true to activate the three placements — processing,
 * result sidebar, and pre-download — for Free users only. Pro and Business
 * never see ads (gated separately in useShowAds via the plan).
 *
 * The AdSlot components already render Ezoic placeholders; this flag is the
 * single kill-switch so nothing shows prematurely.
 */
export const ADS_ENABLED = false;
