# Audit LIVE Supabase — CaptionFlow / Konvertools

- **Projet Supabase :** CaptionFlow (`flimyasklnzcsenogsup`)
- **Date :** 2026-06-08
- **Périmètre :** audit de l'infrastructure RÉELLEMENT déployée (via MCP), comparée
  au code de la PR #1, puis déploiement des correctifs validés.

---

## 1. Résumé

La base était globalement saine (RLS partout, buckets privés, fonctions internes
verrouillées, crons en place), mais le travail de sécurité de la PR #1 n'était
**pas** déployé en prod. Trois trous de coût/sécurité réellement exploitables ont
été corrigés en live ce jour, plus la mise en place du rate-limit IP anonyme.

## 2. Correctifs appliqués en PROD (ce jour, via MCP)

### Migrations
| Migration | Effet | Statut |
|---|---|---|
| `020_protect_ai_quota_columns` | Étend le trigger `protect_profile_columns` pour épingler `monthly_ai_usage`, `monthly_ai_month`, `usage_buckets` (ferme le contournement du quota IA par `PATCH` PostgREST). Déclare `usage_buckets`. | ✅ Appliquée |
| `021_tos_consent_drift` | Déclare `tos_accepted_at` / `marketing_opt_in` et `ensure_tos_acceptance` de façon idempotente (no-op sur la prod, sécurise les futurs `db reset`). | ✅ Appliquée |
| `022_ip_rate_limit` | Crée `ip_rate_limits` (RLS, service-role only) + `ip_rate_hit()` + cron `konver_ip_rate_purge` (purge horaire). | ✅ Appliquée |

### Fonctions edge redéployées
| Fonction | Version | Apport | `verify_jwt` |
|---|---|---|---|
| `ai-vision` | v11 | Lecture `sys`/`wantsJson` en amont + rate-limit IP anonyme | false |
| `ai-process` | v25 | Rate-limit IP anonyme | false |
| `process-subtitles` | v14 | Quota IA serveur + rejet anonyme avant l'appel Voxtral | true |
| `translate-subtitles` | v13 | Quota IA serveur + rejet anonyme avant Mistral | true |
| `lemonsqueezy-setup` | v5 | Allowlist admin `SETUP_ADMIN_EMAILS` (refus par défaut) | true |

> **`api-keys` NON redéployée** : la version déployée (v10) fonctionne déjà
> (révocation via `revoked` + `revoked_at`). La version PR retire `revoked_at`
> (sa base de migrations n'a pas la 018) → la redéployer serait une régression.

## 3. Vérifications post-déploiement (toutes ✅)

- `ip_rate_hit` existe, `EXECUTE` révoqué pour `anon` et `authenticated`.
- Trigger `protect_profile_columns` épingle bien `monthly_ai_usage` et `usage_buckets`.
- `ip_rate_limits` : RLS active, 0 policy (accès service-role uniquement).
- Cron `konver_ip_rate_purge` actif.
- Re-scan advisors sécurité : aucun nouveau problème introduit.

## 4. État de l'audit (rappel)

- **RLS** : activée sur les 7 tables ; aucune table en lecture/écriture publique.
- **Fonctions SECURITY DEFINER** : toutes avec `search_path` + `EXECUTE` révoqué
  pour anon/public (sauf `ensure_tos_acceptance`, appelable par `authenticated`
  mais gardée par `auth.uid() = p_user` → faux positif advisor).
- **Storage** : buckets `results` et `uploads` privés ; policy par dossier
  `auth.uid()` ; URLs signées 1 h ; purge auto par cron.
- **Cron** : `konver_job_retention` (5 min), `konver_business_monthly`,
  et désormais `konver_ip_rate_purge`.

## 5. Actions manuelles restantes (hors MCP)

1. **Définir le secret** `SETUP_ADMIN_EMAILS=info@konvertools.com`
   (`supabase secrets set ...` ou Dashboard → Edge Functions → Secrets).
   Tant qu'il est absent, `lemonsqueezy-setup` répond « setup_locked » (sûr).
2. **Activer** la protection contre les mots de passe fuités
   (Dashboard → Authentication → password security / HaveIBeenPwned).
3. **Vérifier les secrets** : `RESEND_API_KEY`, `LEMONSQUEEZY_API_KEY`,
   `LEMONSQUEEZY_WEBHOOK_SECRET` (non listables via MCP).
4. **Réglages Auth** à confirmer au dashboard : confirmation d'email,
   limites anti-force-brute, allowlist d'URL de redirection, expiration OTP.
5. **RESEND** : valider le domaine `konvertools.com` (SPF + DKIM) pour
   `no-reply@konvertools.com`.
6. **Réconcilier le dépôt** : la prod contient des migrations (016/017/018,
   `020_secure_ensure_tos_acceptance`) absentes du dépôt, et les fichiers utilisent
   un préfixe court (`020_...`) au lieu du format horodaté de la CLI.
   **Ne pas lancer `supabase db push`** tel quel (rejouerait depuis la 001).
7. **Surface inutile** : supprimer les fonctions Stripe (`stripe-webhook`,
   `stripe-checkout`, `stripe-portal`) une fois la bascule Lemon Squeezy confirmée.

## 6. Points info / faible priorité

- `billing_config` / `user_rate_limits` / `ip_rate_limits` : RLS sans policy =
  accès service-role uniquement (voulu). Vérifier que le front ne lit pas
  `billing_config` en direct.
- 5 index « inutilisés » signalés (faute de trafic) — ne PAS supprimer
  `api_keys_hash_idx` (sert à valider les clés API).
