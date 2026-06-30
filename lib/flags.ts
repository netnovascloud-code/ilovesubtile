// Central pre-launch feature flags. Flip a value back to `true` (one line) to
// re-enable a capability — no other change needed.
//
// Current state (pre-launch, no payment provider live yet):
//   • Subscriptions are OFF — Lemon Squeezy is gone and Paddle isn't wired up
//     until the site is live, so no checkout is offered.
//   • The Mistral-powered AI modules are PAUSED to avoid cost while unmonetised.
//   • The Google translator stays ON (it's capped to Google's free tier).

/** Paid subscriptions / checkout. Off until Paddle is live. */
export const BILLING_ENABLED = false;

/** Mistral AI tools (text, vision, assistant, subtitle AI). Paused for now.
 *  Does NOT affect the Google translator, which runs on its own function. */
export const AI_ENABLED = false;
