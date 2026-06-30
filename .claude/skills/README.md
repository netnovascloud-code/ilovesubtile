# Project skills library

Claude Code project skills, available to the Skill tool whenever this repo is
checked out. Imported from an external skills bundle (origin: "ECC" and others).

## Selection

- **522 skills** included.
- **6 skipped** because they collide with built-in plugin skills (the built-ins
  remain authoritative): `security-review`, `review`, `run`, `init`, `loop`,
  `deep-research`.
- **176 excluded** as off-topic for this stack (Next.js/TypeScript + Supabase
  Postgres/Deno Edge Functions + Vercel + Mistral): other language/mobile
  ecosystems (Kotlin/Swift/Java/.NET/Go/Rust/PHP/Python-Django), 3D/video/
  animation, medical & regulatory, trading/crypto, logistics/supply-chain,
  heavy infra (k8s/terraform/cloud), office/Jira/n8n tooling, and novelty packs.

Each subfolder has a `SKILL.md` with `name` + `description` frontmatter that the
harness reads to surface the skill.
