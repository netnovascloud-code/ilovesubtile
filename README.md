# CaptionFlow

[![CI](https://github.com/netnovascloud-code/ilovesubtile/actions/workflows/ci.yml/badge.svg)](https://github.com/netnovascloud-code/ilovesubtile/actions/workflows/ci.yml)

Free online subtitle tools, built like iLovePDF — one focused page per tool, drop your file, get your result.

## Testing & CI

Run locally:

```bash
npm run test:run     # run the tests once (CI mode)
npm test             # watch mode
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

The suite tests the **real** logic behind the four critical flows. Edge Functions
run on Deno, so their environment-agnostic logic is extracted into shared modules
(`supabase/functions/_shared/`) that both the Deno function **and** the Node tests
import — we test the production code, not a copy. Each suite has success **and**
rejection/failure-detection cases.

| Area (file) | What's covered |
| --- | --- |
| `tests/credits.test.ts` | Credit cost math (`lib/credits.ts`): transcribe per-minute rounding, translate per-1k-words, short/long tiers, word count. |
| `tests/plan-limits.test.ts` | Per-plan upload caps (`lib/plan-limits.ts`) + AI quota resolver (`lib/ai-quotas.ts`): Free 20 MB / Pro 1 GB / Business 5 GB, anon-2 vs free-5, daily vs monthly. |
| `tests/ls-signature.test.ts` | Lemon Squeezy webhook HMAC (`_shared/ls-signature.ts`, used by `lemonsqueezy-webhook`): valid passes; tampered / forged / missing signature rejected. |
| `tests/api-key.test.ts` | API-key SHA-256 + format + usability (`_shared/api-key.ts`, used by `api-gateway`): random / revoked / not-found rejected. |

CI (`.github/workflows/ci.yml`) runs `npm ci → typecheck → lint → test:run` on every
push and PR to `main`. **The current tests need no secrets** (pure logic + Node
crypto), so CI runs with zero configuration.

### Gating the Vercel deploy on CI

Vercel auto-deploys on push, independently of GitHub Actions. To block a deploy
when tests fail: either (a) in Vercel → Settings → Git set the **Production Branch**
to `main` and enable *"Only deploy if checks pass"*, or (b) disable Vercel's auto
git-deploy and deploy from the workflow with the Vercel CLI (`VERCEL_TOKEN` secret)
after the tests pass.

### Not yet wired (needs infrastructure you provision)

- **Full DB-integration tests** (the `spend_credits` / `api_rate_hit` RPCs, webhook
  writes to `profiles`, idempotence, the monthly reset, the concurrent double-spend
  race) need a **dedicated test Supabase project** — never run them against prod.
  Add GitHub Secrets `SUPABASE_TEST_URL` + `SUPABASE_TEST_SERVICE_ROLE_KEY`; mock
  Mistral and Lemon Squeezy so no real credits/payments are consumed.
- **Sentry** needs a Sentry project DSN (`NEXT_PUBLIC_SENTRY_DSN`, plus
  `SENTRY_AUTH_TOKEN` for source maps) before the SDK is wired into the app and the
  Edge Functions.

This repository is the **scaffold**: every page exists, every route is reachable, all SEO metadata (JSON-LD `SoftwareApplication`, `FAQPage`, `BreadcrumbList`, hreflang) is in place. Five of the JS-only tools are fully functional in the browser today. The rest need a backend to be wired up.

---

## What works out of the box

After `npm install && npm run dev`, no backend, no env vars:

- **Homepage** with the iLovePDF-style grid of 16 tools
- **Localised homepages**: `/fr`, `/es`, `/de`
- **All 16 tool pages** are reachable with correct H1, meta, FAQ schema
- **Competitor pages**: `/veed-alternative`, `/kapwing-alternative`, `/happyscribe-alternative`, `/clideo-alternative`
- **Pricing**, **API docs**, **privacy**, **terms**, **404**, sitemap, robots
- **Five tools that work end-to-end in your browser** (no backend needed):
  - `/srt-to-vtt`
  - `/vtt-to-srt`
  - `/sync-subtitles`
  - `/srt-to-text`
  - `/clean-subtitles`
  - `/subtitle-editor` (live editing of cues)
- AdBlock detection that **never blocks the service** — just shows a polite toast
- All ads rendered as placeholders (no network calls yet)

## What needs to be wired up

These tools require a backend; the UI exists and posts to `/api/process/<slug>`, which forwards to a Supabase Edge Function:

| Tool                       | Backend                                                       |
|---------------------------|---------------------------------------------------------------|
| `/subtitle-generator`     | `process-subtitles` → AI (`voxtral-mini-latest`) |
| `/tiktok-subtitles`       | `process-subtitles` → AI + FFmpeg worker                 |
| `/translate-subtitles`    | `translate-subtitles` → AI (`AI`)      |
| `/batch-translate`        | `translate-subtitles` (one call per language)                 |
| `/youtube-chapters`       | `ai-process` → AI (`AI`)               |
| `/auto-sync`              | `ai-process` + FFmpeg worker                                  |
| `/add-subtitles-to-video` | `process-ffmpeg` → your FFmpeg worker (you provide the host)  |
| `/extract-subtitles`      | `process-ffmpeg` → your FFmpeg worker                          |
| `/style-subtitles`        | `process-ffmpeg` → your FFmpeg worker                          |
| Billing (checkout)        | `lemonsqueezy-checkout` Edge Function                          |
| Billing (portal)          | `lemonsqueezy-portal` Edge Function                            |
| Lemon Squeezy events      | `lemonsqueezy-webhook` Edge Function                          |
| Emails                    | `send-email` Edge Function → Resend                            |

All AI processing goes through a **single provider** (AI) with a
**single key** (`MISTRAL_API_KEY`). No OpenAI, no DeepL, no Whisper.

Until configured, these UIs will surface a clear "Backend not configured" error.

---

## Quick start

```bash
npm install
npm run dev
```

A single `.env` at the repo root holds **two Supabase values only**:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

That's it. The file is git-ignored — never commit it. The production site
URL (`https://captionflow.com`) is hardcoded in `lib/utils.ts`.

**Sensitive keys never live in `.env` and never in Vercel envs.** They live
exclusively in Supabase Edge Function secrets (set via the Supabase dashboard
or `supabase secrets set`). The full list:

- `MISTRAL_API_KEY` — used by `process-subtitles`, `translate-subtitles`, `ai-process`
- `LEMONSQUEEZY_API_KEY` — used by `lemonsqueezy-checkout`, `lemonsqueezy-portal`, `lemonsqueezy-setup`
- `LEMONSQUEEZY_WEBHOOK_SECRET` — used by `lemonsqueezy-webhook` (X-Signature HMAC verification)
- `LEMONSQUEEZY_STORE_ID` — optional; auto-discovered from the API key if unset
- `LS_VARIANT_PRO_MONTHLY`, `LS_VARIANT_PRO_ANNUAL`, `LS_VARIANT_BIZ_MONTHLY`, `LS_VARIANT_BIZ_ANNUAL` — subscription variant IDs read by `lemonsqueezy-checkout`
- `LS_VARIANT_PACK_STARTER`, `LS_VARIANT_PACK_GROWTH`, `LS_VARIANT_PACK_SCALE`, `LS_VARIANT_PACK_STUDIO` — credit-pack variant IDs
- `RESEND_API_KEY` — used by `send-email`
- `VPS_API_URL`, `VPS_API_KEY` — used by `process-ffmpeg` (only when you wire your FFmpeg worker)

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically by
Supabase into every Edge Function — you don't set those yourself.

---

## Project layout

```
app/
  page.tsx                       # iLovePDF-style homepage with 16-tool grid
  layout.tsx                     # Root layout, Plus Jakarta Sans, header/footer
  sitemap.ts, robots.ts          # Auto-generated from TOOLS + ALTERNATIVES
  not-found.tsx
  fr/page.tsx, es/page.tsx, de/page.tsx   # Localised homepages

  subtitle-generator/            # ┐
  add-subtitles-to-video/        # │ One folder per tool.
  srt-to-vtt/                    # │ Each is a thin wrapper that imports its
  vtt-to-srt/                    # │ definition from TOOLS_BY_SLUG and renders
  translate-subtitles/           # │ <ToolPageShell> + a Client component.
  sync-subtitles/                # │
  extract-subtitles/             # │
  subtitle-editor/               # │
  tiktok-subtitles/              # │
  clean-subtitles/               # │
  srt-to-text/                   # │
  youtube-chapters/              # │
  batch-translate/               # │
  style-subtitles/               # │
  auto-sync/                     # │
  api/                           # ┘  (also the /api docs page)

  veed-alternative/              # ┐
  kapwing-alternative/           # │ SEO pages for the four big competitors.
  happyscribe-alternative/       # │
  clideo-alternative/            # ┘

  pricing/, privacy/, terms/, dashboard/, login/, register/

  api/process/[slug]/route.ts    # Forwarder to Supabase Edge Functions
  auth/callback/route.ts         # Supabase OAuth callback handler

components/
  layout/         Header, Footer, AdblockNotice
  tools/          ToolCard, ToolPageShell, UploadZone, ProcessingScreen, ResultScreen
  tools/clients/  Per-tool client components (5 JS-only + 1 generic ServerJobClient)
  ads/            AdSlot (placeholder, CLS-safe)
  alternatives/   CompetitorPage (shared by /*-alternative routes)
  auth/           EmailAuthForm, GoogleButton
  ui/             button, input, card, badge

lib/
  tools-config.ts     ★ source of truth — 16 tools + 4 competitors
  srt-utils.ts        Real parser, emitter, shift, clean, plaintext
  seo.ts              buildToolMetadata, JSON-LD helpers, hreflang
  plans.ts            PLANS + FREE_PLAN (pure data)
  lemonsqueezy.ts     Browser checkout-overlay helper
  utils.ts            cn(), formatBytes(), SITE_URL
  supabase/
    client.ts         Browser client
    server.ts         Server Component client
    middleware.ts     Edge runtime session refresh
  i18n/               en/fr/es/de JSON

hooks/
  useAdblockDetect.ts
  useUser.ts

supabase/
  config.toml
  migrations/001_initial_schema.sql   profiles, jobs, subscriptions, RLS, storage
  functions/
    _shared/          cors + auth helpers
    process-subtitles/      AI  (subtitle-generator, tiktok-subtitles)
    translate-subtitles/    AI  (translate, batch-translate)
    ai-process/             AI  (youtube-chapters, ai cleanup, summary)
    process-ffmpeg/         Forwarder to your FFmpeg worker (burn-in, extract, style)
    lemonsqueezy-checkout/  Creates Lemon Squeezy hosted checkouts (overlay)
    lemonsqueezy-portal/    Opens the Lemon Squeezy customer portal
    lemonsqueezy-webhook/   Verifies X-Signature, mirrors state into profiles
    lemonsqueezy-setup/     One-time: auto-discovers store + variant IDs
    send-email/             Resend transactional emails
```

---

## Adding a new tool

1. Add an entry to `TOOLS` in `lib/tools-config.ts` — that drives the homepage card, sitemap, hreflang, SEO metadata, FAQ schema, and breadcrumb.
2. Create `app/<slug>/page.tsx` that mirrors the existing pattern (5 lines: import shell, import client, export metadata via `buildToolMetadata`, render).
3. If client-only, create a new file in `components/tools/clients/` and use `lib/srt-utils.ts`.
4. If server-backed, reuse `ServerJobClient` and add a `slug → function` mapping in `app/api/process/[slug]/route.ts`.

---

## Backend setup (when you're ready)

```bash
# Auth + DB
supabase init                     # if not already a Supabase folder
supabase db push                  # applies migrations/001_initial_schema.sql

# Edge function secrets (server-only API keys live HERE, never in Vercel)
supabase secrets set MISTRAL_API_KEY=...
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set LEMONSQUEEZY_API_KEY=...
supabase secrets set LEMONSQUEEZY_WEBHOOK_SECRET=...
# Variant IDs — discover them with the lemonsqueezy-setup function (below):
supabase secrets set LS_VARIANT_PRO_MONTHLY=... LS_VARIANT_PRO_ANNUAL=...
supabase secrets set LS_VARIANT_BIZ_MONTHLY=... LS_VARIANT_BIZ_ANNUAL=...
supabase secrets set LS_VARIANT_PACK_STARTER=... LS_VARIANT_PACK_GROWTH=... LS_VARIANT_PACK_SCALE=... LS_VARIANT_PACK_STUDIO=...
# Only when you have your own FFmpeg worker:
supabase secrets set VPS_API_URL=https://your-ffmpeg-host/api
supabase secrets set VPS_API_KEY=...

supabase functions deploy process-subtitles
supabase functions deploy translate-subtitles
supabase functions deploy ai-process
supabase functions deploy process-ffmpeg
supabase functions deploy lemonsqueezy-checkout
supabase functions deploy lemonsqueezy-portal
supabase functions deploy lemonsqueezy-setup
supabase functions deploy lemonsqueezy-webhook --no-verify-jwt
supabase functions deploy send-email
```

### Lemon Squeezy (Merchant of Record)

The Lemon Squeezy API is read-only for products, so create the 6 products
once in the dashboard (Store → Products):

- **Pro** — €12/month and €99/year (two variants on one product)
- **Business** — €39/month and €349/year
- **Credit packs** (single-payment): Starter 100/€12, Growth 500/€39, Scale 2000/€99, Studio 6000/€249

Then run the setup helper once to auto-discover your Store ID and every variant ID:

```bash
curl -H "Authorization: Bearer <your-supabase-session-jwt>" \
  https://<project>.supabase.co/functions/v1/lemonsqueezy-setup
```

Map the returned variant IDs to the `LS_VARIANT_*` secrets above. Finally, in
Lemon Squeezy → Settings → Webhooks add a callback to
`https://<project>.supabase.co/functions/v1/lemonsqueezy-webhook`, paste the
**signing secret** into `LEMONSQUEEZY_WEBHOOK_SECRET`, and subscribe to:
`subscription_created`, `subscription_updated`, `subscription_cancelled`,
`subscription_expired`, `subscription_payment_success`,
`subscription_payment_refunded`, `order_created`, `order_refunded`.

### Google OAuth

Enable Google in Supabase → Authentication → Providers and add `http://localhost:3000/auth/callback` plus your prod URL to "Redirect URLs".

---

## Design principles encoded in the codebase

- Plus Jakarta Sans, single brand colour `#2D6BE4`, 8px radius, `shadow-card` only.
- Lucide icons exclusively — no emoji.
- `AdSlot` has fixed dimensions to prevent CLS jumps when networks finally load.
- AdBlock notice is **polite + dismissible + post-render** — never blocks the service.
- All SEO data flows from `lib/tools-config.ts`. To change a tool's title you change one file.
- Ads only ever appear in the `ProcessingScreen` (rectangle) and `ResultScreen` sidebar — never in the navigation, hero, or homepage grid.

---

## Status

- ✅ Foundation, layout, design system
- ✅ Source of truth for 16 tools + 4 competitors
- ✅ All 16 tool pages reachable, SEO-complete (Schema.org + hreflang)
- ✅ 5 client-only tools fully working
- ✅ Auth pages, dashboard, pricing, API docs
- ✅ Supabase migrations + 6 Edge Function stubs
- ✅ Sitemap, robots, 404
- ⏳ Backend secrets (AI / Lemon Squeezy / Resend) — Edge Functions deployed and live, just need keys set
- ⏳ FFmpeg worker — `process-ffmpeg` deployed and returns a clean error until you set `VPS_API_URL` + `VPS_API_KEY`
- ⏳ Full i18n for tool pages (only homepage is localised today)
- ⏳ Ad network integration (Ezoic / Media.net)
- ⏳ FFmpeg worker on Hetzner
