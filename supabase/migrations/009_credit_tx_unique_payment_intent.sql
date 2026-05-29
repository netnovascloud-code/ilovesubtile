-- =====================================================================
-- Wyrlo — make Stripe credit-pack grants exactly-once
--
-- The stripe-webhook performed a check-then-insert ("does a row with this
-- stripe_payment_intent already exist?  if not, grant credits"). That's
-- TOCTOU on a money path: two near-simultaneous webhook deliveries for the
-- same payment_intent can both pass the lookup, both call grant_credits,
-- and both insert a ledger row — doubling the credits granted for one
-- purchase. Stripe retries aggressively, so this race is realistic.
--
-- Fix 1: a partial UNIQUE index on credit_transactions.stripe_payment_intent
-- so at most one ledger row can ever exist per Stripe payment.
-- Fix 2 (migration 010): grant_credits short-circuits when an entry for the
-- given p_pi already exists, and swallows unique_violation if it loses the
-- race so the second caller just returns the current balance.
-- =====================================================================

create unique index if not exists credit_tx_pi_unique
  on public.credit_transactions (stripe_payment_intent)
  where stripe_payment_intent is not null;
