// Central pre-launch feature flags. Flip a value (one line) to toggle a
// capability — no other change needed.
//
// Current state:
//   • Subscriptions run on STRIPE (hosted Checkout + Billing portal). The mode
//     (test vs live) is decided solely by the STRIPE_SECRET_KEY /
//     STRIPE_WEBHOOK_SECRET Supabase secrets — sk_test_… = test cards only.
//   • The Mistral-powered AI modules are PAUSED to avoid cost while unmonetised.
//   • The Google translator stays ON (it's capped to Google's free tier).

/** Paid subscriptions / checkout (Stripe). */
export const BILLING_ENABLED = true;

/** Mistral AI tools (text, vision, assistant, subtitle AI). Paused for now.
 *  Does NOT affect the Google translator, which runs on its own function. */
export const AI_ENABLED = false;
