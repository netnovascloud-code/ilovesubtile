#!/usr/bin/env bash
#
# Build & push the conversion image to the Scaleway Container Registry.
# Run this MANUALLY from your machine — there is no CI for this service.
#
#   ./deploy.sh
#
# Requires Docker running locally and services/conversion/.env filled in.

set -euo pipefail
cd "$(dirname "$0")"

# 1) Load local secrets (SCW_ACCESS_KEY, SCW_SECRET_KEY) from .env (never committed).
if [ ! -f .env ]; then
  echo "ERROR: services/conversion/.env is missing. Copy .env.example to .env and fill it in." >&2
  exit 1
fi
set -a; . ./.env; set +a

if [ -z "${SCW_SECRET_KEY:-}" ]; then
  echo "ERROR: SCW_SECRET_KEY is empty in .env" >&2
  exit 1
fi

REGISTRY="rg.fr-par.scw.cloud/konvertools"
IMAGE="$REGISTRY/conversion:latest"

# 2) Log in to the Scaleway registry. The username is literally 'nologin';
#    the password is your Scaleway SECRET key. --password-stdin avoids leaking
#    it in the process list / shell history (the secure form of `-p`).
echo "$SCW_SECRET_KEY" | docker login "$REGISTRY" -u nologin --password-stdin

# 3) Build for linux/amd64 (Scaleway Serverless Containers run amd64; this also
#    works when you build from an Apple-silicon Mac).
docker build --platform linux/amd64 -t "$IMAGE" .

# 4) Push the image.
docker push "$IMAGE"

echo ""
echo "✅ Pushed $IMAGE"
echo "   Next: create/redeploy the Serverless Container in the Scaleway console pointing at this image."
