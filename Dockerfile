# Multi-stage Dockerfile for Konvertools — host-agnostic Next.js standalone
# build. Works on Coolify, Railway, Render, Fly.io, Cloud Run, plain VPS,
# or any container runtime. Uses Node 22 (matches the CI and the
# package-lock).
#
# Build:  docker build -t konvertools .
# Run:    docker run -p 3000:3000 \
#           -e NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co \
#           -e NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... \
#           -e NEXT_PUBLIC_SITE_URL=https://konvertools.com \
#           konvertools
#
# All KONVERTOOLS_* server secrets (Lemon Squeezy, Mistral, …) live on the
# Supabase Edge Functions, NOT in this Next image — so this container holds
# no production secrets.

# ─── deps ────────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
# `npm ci` mirrors the lock exactly, including transitive devDeps needed for
# the build (typescript, eslint, tailwind, postcss).
RUN npm ci --no-audit --no-fund

# ─── build ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public env vars are baked into the client bundle at build time. They MUST be
# passed via --build-arg or the Coolify/Railway "build env" — they don't show
# up if you only set them at runtime.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL=https://konvertools.com
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── runner ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Drop root.
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone output: the .next/standalone tree ships its OWN node_modules,
# so we don't need to copy the build-time deps. Static and public assets
# still need to be placed next to the server.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Standalone produces server.js at the root, not next start.
CMD ["node", "server.js"]
