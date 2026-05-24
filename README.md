# CaptionFlow

Free online subtitle tools, built like iLovePDF — one focused page per tool, drop your file, get your result.

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
| `/subtitle-generator`     | `process-subtitles` → Mistral Voxtral (`voxtral-mini-latest`) |
| `/tiktok-subtitles`       | `process-subtitles` → Voxtral + FFmpeg worker                 |
| `/translate-subtitles`    | `translate-subtitles` → Mistral (`mistral-large-latest`)      |
| `/batch-translate`        | `translate-subtitles` (one call per language)                 |
| `/youtube-chapters`       | `ai-process` → Mistral (`mistral-large-latest`)               |
| `/auto-sync`              | `ai-process` + FFmpeg worker                                  |
| `/add-subtitles-to-video` | `process-ffmpeg` → your FFmpeg worker (you provide the host)  |
| `/extract-subtitles`      | `process-ffmpeg` → your FFmpeg worker                          |
| `/style-subtitles`        | `process-ffmpeg` → your FFmpeg worker                          |
| Billing (checkout)        | `stripe-checkout` Edge Function                                |
| Billing (portal)          | `stripe-portal` Edge Function                                  |
| Stripe events             | `stripe-webhook` Edge Function                                 |
| Emails                    | `send-email` Edge Function → Resend                            |

All AI processing goes through a **single provider** (Mistral) with a
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
- `STRIPE_SECRET_KEY` — used by `stripe-checkout`, `stripe-portal`, `stripe-webhook`
- `STRIPE_WEBHOOK_SECRET` — used by `stripe-webhook`
- `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_PRO_ANNUAL`, `STRIPE_PRICE_BIZ_MONTHLY`, `STRIPE_PRICE_BIZ_ANNUAL` — Stripe price IDs read by `stripe-checkout`
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
  api/billing/checkout/route.ts  # Stripe Checkout session
  api/billing/portal/route.ts    # Stripe Customer Portal
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
  stripe.ts           PLANS + Stripe client
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
    process-subtitles/      Voxtral  (subtitle-generator, tiktok-subtitles)
    translate-subtitles/    Mistral  (translate, batch-translate)
    ai-process/             Mistral  (youtube-chapters, ai cleanup, summary)
    process-ffmpeg/         Forwarder to your FFmpeg worker (burn-in, extract, style)
    stripe-checkout/        Creates Stripe Checkout sessions
    stripe-portal/          Opens the Stripe Customer Portal
    stripe-webhook/         Mirrors subscription state into profiles
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
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set STRIPE_PRICE_PRO_MONTHLY=price_...
supabase secrets set STRIPE_PRICE_PRO_ANNUAL=price_...
supabase secrets set STRIPE_PRICE_BIZ_MONTHLY=price_...
supabase secrets set STRIPE_PRICE_BIZ_ANNUAL=price_...
# Only when you have your own FFmpeg worker:
supabase secrets set VPS_API_URL=https://your-ffmpeg-host/api
supabase secrets set VPS_API_KEY=...

supabase functions deploy process-subtitles
supabase functions deploy translate-subtitles
supabase functions deploy ai-process
supabase functions deploy process-ffmpeg
supabase functions deploy stripe-checkout
supabase functions deploy stripe-portal
supabase functions deploy stripe-webhook --no-verify-jwt
supabase functions deploy send-email
```

### Stripe

In the Stripe dashboard create four products. The price IDs go into Supabase
Edge Function secrets (used server-side by `stripe-webhook` and the checkout
route), not into `.env`:
- `STRIPE_PRICE_PRO_MONTHLY`
- `STRIPE_PRICE_PRO_ANNUAL`
- `STRIPE_PRICE_BIZ_MONTHLY`
- `STRIPE_PRICE_BIZ_ANNUAL`

Then point a webhook at `https://<project>.supabase.co/functions/v1/stripe-webhook` subscribed to `checkout.session.completed` and `customer.subscription.*`.

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
- ⏳ Backend secrets (Mistral / Stripe / Resend) — Edge Functions deployed and live, just need keys set
- ⏳ FFmpeg worker — `process-ffmpeg` deployed and returns a clean error until you set `VPS_API_URL` + `VPS_API_KEY`
- ⏳ Full i18n for tool pages (only homepage is localised today)
- ⏳ Ad network integration (Ezoic / Media.net)
- ⏳ FFmpeg worker on Hetzner
