# Audit bugs — Billing + 183 outils (CaptionFlow / Konvertools)

- **Date :** 2026-06-08
- **Code audité :** branche PR `claude/eager-pasteur-6LPrf` (production-current) — `main` est en retard.
- **Méthode :** audit de CODE (lecture) + vérification des fonctions edge déployées via MCP Supabase.
- **Limite :** l'environnement bloque le réseau sortant (Supabase Functions / Mistral) → **pas de test fonctionnel live**. Le test réel « bonnes conversions/qualité » doit se faire en réseau ouvert (machine locale / CI / site déployé). Un harnais de test est recommandé (section finale).

## Inventaire réel : 183 outils / 10 catégories

| Catégorie | Nb | Exécution |
|---|---|---|
| images | 36 | client (Canvas / wasm) |
| utilities | 29 | client (+2 IA vision) |
| documents | 28 | client (pdf-lib/pdfjs/SheetJS/docx) (+ qq IA) |
| developer | 20 | client (pur JS) (+1 IA vision) |
| text-ai | 20 | IA (ai-process) + 3 client |
| subtitles | 16 | client + IA (process/translate/ai-process) |
| video | 14 | FFmpeg.wasm (+2 client) |
| audio | 10 | FFmpeg.wasm |
| security | 8 | edge `security-tools` + client crypto |
| archives | 2 | client (jszip) |
| **Total** | **183** | |

> Le câblage des tâches IA est **correct** (toutes les tâches `ai-process`/`ai-vision` existent côté edge) **sauf `auto-sync`**. Les chemins crypto (clés SSH, AES, hash, JWT, password-checker HIBP) sont **corrects**.

---

## Bugs — billing (confirmés sur les fonctions déployées)

| # | Gravité | Élément | Problème | Impact |
|---|---|---|---|---|
| C1 | 🔴 Critique | `lemonsqueezy-webhook` `subscription_payment_success` | Traite la facture de renouvellement comme un abonnement : écrase `ls_subscription_id` (= id facture), `status="paid"`, `ls_renews_at=null`. | Portail « gérer l'abonnement » cassé au 1er renouvellement (404). |
| C2 | 🔴 Critique | webhook `subscription_created` | N'accorde jamais les 300 crédits mensuels Business (seulement le cron du 1er). | Nouvel abonné Business sans crédits API pendant ~1 mois. |
| H1 | 🟠 Élevé | `lemonsqueezy-checkout` `loadConfig` | `billing_config` mis en cache global jamais invalidé. | Variant périmé servi après un re-setup. |
| H2 | 🟠 Élevé | webhook `order_refunded` | Ne gère que les packs, pas les abonnements remboursés. | Abonné remboursé peut garder son plan. |
| H3 | 🟠 Élevé | `grant_credits` (refund) | `credits += montant négatif` sans plancher 0. | Solde négatif → verrouillage des dépenses. |
| M1–M4 | 🟡 Moyen | webhook | `isActive` forcé ; pas d'idempotence abonnements (emails en double) ; `paused`/`payment_failed` non gérés ; quota anonyme client-side (bordé par migration 022). | Divers. |

**Correct :** signature HMAC, mapping setup↔checkout (9 clés OK), idempotence des packs (index unique `payment_ref`), `spend_credits`, `available_credits`, anti-PATCH `protect_profile_columns`.

---

## Bugs — outils, triés par priorité

### 🔴 Critiques (outil inutilisable)
| Outil | Cat. | Problème | Fichier |
|---|---|---|---|
| `auto-sync` | subtitles | Envoie FormData(video,subtitles) à `ai-process` qui ne lit que JSON `{task,text}` ; aucune tâche d'alignement n'existe → **toujours HTTP 400**. | `AutoSyncClient.tsx:36-39` → `tool-api.ts:16` → `ai-process/index.ts:170,176` |
| `add-watermark` | video | Filtre `drawtext` absent du core FFmpeg.wasm + police chargée depuis jsdelivr **bloqué par la CSP** + loader cassé. **Ne tourne pas.** | `WatermarkVideoClient.tsx:12-27,80-81`; `middleware.ts:50` |

### 🟠 Élevés
| Outil | Cat. | Problème | Fichier |
|---|---|---|---|
| `ssh-key-generator` | security | Non câblé dans le routeur localisé → en non-EN, tombe sur `ServerJobClient` → « no backend mapped ». Cassé hors anglais. | `app/[locale]/[slug]/page.tsx` |
| `text-encryptor` | security | Idem — cassé dans toutes les locales sauf EN. | `app/[locale]/[slug]/page.tsx` |
| `file-encryptor` | security | Idem — cassé hors EN. | `app/[locale]/[slug]/page.tsx` |
| `cover-letter` | documents | Export PDF multi-page : `const page` jamais réassigné après `addPage` → texte superposé page 1, pages suivantes blanches. | `CoverLetterClient.tsx:48-75` |
| `invoice-generator` | utilities | Crash non géré sur caractères non-Latin-1 (CJK, İ, ł, €dans certains champs…) ; aucun message d'erreur. | `InvoiceGeneratorClient.tsx:55-124` |
| `cron-builder` | utilities | Mois/jours nommés (`JAN`,`MON`) annoncés mais jamais reconnus (`Number(part)`→NaN). | `CronBuilderClient.tsx:53-67` |
| `merge-audio` | audio | Charge FFmpeg via un loader non partagé (chemin worker cassé sous Next/Webpack). | `MergeAudioClient.tsx:13-27` |
| `ai-humanizer` | text-ai | Mappé dans `FN_MAP` mais aucune entrée `TOOLS` → route/UI orpheline (tâche `humanize` pourtant valide). | `tool-api.ts:17` |

### 🟡 Moyens
| Outil | Problème | Fichier |
|---|---|---|
| `add-subtitles-to-video` | Soft-mux `mov_text` mais marketing « incrustation permanente » ; accepte `.ass` non géré. | `AddSubtitlesToVideoClient.tsx:57-64` vs config |
| `extract-subtitles` | `-map 0:s:${i}` index global au lieu d'un compteur de pistes texte → mauvaise piste si texte+image mêlés. | `ExtractSubtitlesClient.tsx:71-83` |
| `svg-to-png` | SVG sans dimensions intrinsèques → sortie 1px/150px (contredit « toute résolution »). | `ImageToolClient.tsx:35-44` |
| `images-to-gif` | Cleanup révoque toutes les object-URL des frames à chaque changement → miniatures cassées. | `ImagesToGifClient.tsx:36-39` |
| `image-collage` | Même bug de cleanup d'object-URL. | `ImageCollageClient.tsx:32-35` |
| `currency-converter` | RUB listé mais non fourni par la BCE → « — » silencieux ; « 28 devises » surévalué. | `CurrencyConverterClient.tsx:14-16` |
| `html-to-pdf` | Annonce URL distante + navigateur headless, ne fait que coller/upload via jspdf. | `HtmlToPdfClient.tsx` |
| `compress-pdf` | Annonce « même qualité » mais rasterise (détruit la couche texte). | `CompressPdfClient.tsx:36-70` |

### 🟢 Mineurs / cosmétiques
`image-to-base64` (download toujours `.png`) · `json-to-csv` (objets imbriqués → `[object Object]`) · `blur-face` (extension/MIME webp) · `exif-viewer` (orientation non préservée au strip ; webp/tiff→png) · `sign-pdf` (ligne guide visible) · `resume-builder` (débordement colonne latérale) · `watermark-image` (maj `onBlur` non live) · `compress-image` (toujours WebP) · `organize-pdf` (version pdfjs divergente) · robustesses `srt-utils`.

---

## Corrects (vérifiés)
Cœur PDF (merge/split/rotate/extract/watermark/page-numbers/metadata/redaction/fill/organize), ZIP, OCR (Tesseract), DOCX-translate, tous les convertisseurs Canvas standard (jpg/png/webp/avif, resize/crop/rotate), encodeurs dev (base64/url/jwt/json↔csv/xml/yaml, sql↔json, minify-css, format-sql), calculatrices (unit/vat/loan/tip/bmi/%, age/timezone/unix), QR/barcode (gen+read), génération clés SSH (`openssh.ts`), AES texte/fichier, password-checker (HIBP k-anonymity), et les 4 actions edge `security-tools` (ssl/email/url/phishing) — toutes câblées et conformes.

---

## Recommandation : harnais de test live
Comme le test fonctionnel réel est impossible ici (réseau bloqué), exécuter en réseau ouvert :
- Outils IA backend : script qui POST chaque `task` à `ai-process`/`ai-vision`/`process-subtitles`/`translate-subtitles` avec un échantillon et juge la sortie.
- Outils client : Playwright headless sur `app/<slug>` avec un fichier d'exemple, vérifier le téléchargement produit.
