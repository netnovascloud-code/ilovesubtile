import type { Locale } from "@/lib/seo";
import type { LegalDoc } from "@/lib/legal/types";

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/translate-legal.mjs.
 * Translated via Mistral through the Konvertools ai-process edge function.
 * Missing entries fall back to English at render time.
 */
export const PRIVACY_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {
  "fr": {
    "h1": "Politique de confidentialité",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Dernière mise à jour : %DATE% · En vigueur immédiatement pour tous les visiteurs et détenteurs de compte.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Notre principe fondamental : nous ne conservons pas vos fichiers",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (le « Service ») fonctionne comme une boîte à outils axée sur la confidentialité. L’engagement le plus important que nous prenons est le suivant :"
          },
          {
            "kind": "ul",
            "items": [
              "**Outils fonctionnant uniquement dans le navigateur** (convertisseurs d’images, outils PDF utilisant pdf-lib, conversions audio et vidéo via FFmpeg.wasm, outils de code, calculatrices, générateurs de QR codes, vérificateur de fuites de mots de passe, la plupart des utilitaires) s’exécutent **entièrement dans votre navigateur web via WebAssembly**. Votre fichier ou votre saisie n’est jamais transmis à nos serveurs. Nous n’avons aucun moyen technique de le lire.",
              "**Outils assistés par serveur** (transcription IA, traduction IA, tâches textuelles IA, sous-titres vidéo incrustés, scanner d’URL, détecteur de phishing, vérificateur de certificats SSL et quelques autres) nécessitent l’envoi de certaines données vers un backend. Dans tous les cas, le fichier ou le texte est traité en temps réel et supprimé du stockage temporaire dans les trente (30) minutes qui suivent.",
              "Nous ne stockons jamais le contenu d’un fichier téléversé dans un emplacement persistant, nous n’utilisons jamais vos téléversements pour entraîner des modèles d’IA, et nous ne les vendons, ne les louons ni ne les partageons avec des tiers à quelque fin que ce soit autre que la fourniture du résultat que vous avez demandé."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Responsable du traitement des données",
        "blocks": [
          {
            "kind": "p",
            "text": "Aux fins du Règlement général sur la protection des données (RGPD — Règlement (UE) 2016/679), le responsable du traitement des données est l’éditeur du Service. Pour toute question relative à la confidentialité : [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Données que nous collectons",
        "blocks": [
          {
            "kind": "p",
            "text": "Les seules données personnelles que nous conservons dans notre base de données sont :"
          },
          {
            "kind": "ul",
            "items": [
              "**Identifiants de compte** : votre adresse e-mail ; une copie salée et hachée de votre mot de passe (gérée par Supabase Auth — nous ne voyons ni ne stockons le mot de passe en clair) ; un nom d’affichage et une URL d’avatar optionnels si vous vous connectez avec Google.",
              "**État de l’abonnement** : plan actuel (gratuit / Pro / Business), identifiant client Stripe, et les dates de vos renouvellements les plus récents.",
              "**Compteurs d’utilisation** : compteurs de quota agrégés (par exemple, « 3 exécutions d’IA utilisées aujourd’hui », « 420 exécutions d’IA mensuelles utilisées ») mis à jour directement sur votre profil. Nous **n’enregistrons pas** de données par exécution.",
              "**Métadonnées des tâches (transitoires)** : lorsqu’un outil assisté par serveur produit un résultat (par exemple, un fichier .srt issu d’une transcription), nous enregistrons le nom de l’outil, l’URL de téléchargement du résultat, la langue source et un horodatage de fin. Ces lignes sont purgées automatiquement après **deux (2) heures**. Elles ne contiennent jamais le contenu de vos fichiers.",
              "**Enregistrements de consentement** : la date et l’heure auxquelles vous avez accepté ces Conditions et notre Politique de confidentialité, ainsi que votre choix concernant les e-mails marketing. Conservés pendant la durée de votre compte plus une période probatoire légale de cinq (5) ans après la suppression."
            ]
          },
          {
            "kind": "p",
            "text": "Nous **ne collectons pas** : votre adresse IP (au-delà de l’utilisation temporaire que Supabase et notre hébergeur en font pour la limitation de débit et les journaux de sécurité), votre empreinte numérique du navigateur, des événements de suivi comportemental, vos enregistrements d’écran ou toute donnée biométrique."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Fichiers que vous traitez",
        "blocks": [
          {
            "kind": "p",
            "text": "Comme indiqué à la section 1, le contenu des fichiers que vous traitez n’est jamais conservé par nos soins. Le cycle de vie précis est le suivant :"
          },
          {
            "kind": "ul",
            "items": [
              "**Outils fonctionnant uniquement dans le navigateur** : aucune transmission. Le fichier est lu en mémoire par votre navigateur, le résultat est produit localement, et vous le téléchargez directement. Nous n’enregistrons rien concernant le fichier lui-même.",
              "**Transcription / traduction / OCR / analyse de phishing par IA** : le fichier ou le texte est envoyé en flux continu à notre fonction Edge Supabase, qui le transmet immédiatement au fournisseur d’IA concerné (voir section 7) pour inférence. Le résultat vous est retourné et le tampon de téléversement temporaire est supprimé. Les fichiers de résultat écrits dans notre compartiment de stockage privé sont accessibles via une URL signée pendant soixante (60) minutes et physiquement purgés dans les trente (30) minutes suivant leur génération.",
              "**Vérificateur de fuites de mots de passe** : votre mot de passe ne quitte jamais votre navigateur. Nous le hachons localement avec SHA-1 et interrogeons HaveIBeenPwned en utilisant le k-anonymat — seuls les cinq premiers caractères du hachage sont envoyés. Le mot de passe et le hachage complet ne sont jamais transmis.",
              "**Scanner d’URL / vérificateur SSL** : seule l’URL ou le nom d’hôte que vous saisissez est transmis (vers Google Safe Browsing pour le scanner d’URL, ou utilisé pour ouvrir une connexion TLS en direct pour le vérificateur SSL). Aucun contenu de page environnant."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Bases légales du traitement (RGPD Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Exécution d’un contrat** (Art. 6(1)(b)) — lorsque vous créez un compte et utilisez des fonctionnalités payantes, le traitement est nécessaire pour fournir le Service.",
              "**Intérêts légitimes** (Art. 6(1)(f)) — prévention des fraudes, atténuation des abus, journaux de sécurité de base et amélioration du Service.",
              "**Consentement** (Art. 6(1)(a)) — e-mails marketing, cookies optionnels d’analytique ou de publicité (le cas échéant), et toute future intégration optionnelle.",
              "**Obligation légale** (Art. 6(1)(c)) — conservation des enregistrements de facturation conformément à la loi fiscale française (généralement dix ans)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Vos droits au titre du RGPD",
        "blocks": [
          {
            "kind": "p",
            "text": "En tant que personne concernée par le Règlement (UE) 2016/679 du 27 avril 2016 (le « RGPD »), vous bénéficiez des droits suivants, exercables à tout moment et gratuitement depuis l’adresse e-mail enregistrée sur votre compte :"
          },
          {
            "kind": "ul",
            "items": [
              "**Droit d’accès** (RGPD Art. 15) — obtenir la confirmation que nous traitons vos données et en obtenir une copie.",
              "**Droit de rectification** (RGPD Art. 16) — faire corriger des données inexactes ou incomplètes.",
              "**Droit à l’effacement / droit à l’oubli** (RGPD Art. 17) — faire supprimer vos données lorsque les bases légales du traitement ne s’appliquent plus.",
              "**Droit à la limitation du traitement** (RGPD Art. 18) — geler temporairement le traitement pendant le règlement d’un litige.",
              "**Droit à la portabilité des données** (RGPD Art. 20) — recevoir vos données dans un format structuré, lisible par machine.",
              "**Droit d’opposition** (RGPD Art. 21) — vous opposer, pour des raisons liées à votre situation particulière, à tout moment au traitement basé sur nos intérêts légitimes.",
              "**Droit de retirer votre consentement** (RGPD Art. 7(3)) — pour le traitement basé sur le consentement, le retirer à tout moment sans affecter la licéité des traitements antérieurs.",
              "**Droit de ne pas faire l’objet d’une décision automatisée** (RGPD Art. 22) — aucun de nos traitements n’implique de décisions automatisées produisant des effets juridiques à votre égard."
            ]
          },
          {
            "kind": "p",
            "text": "Pour exercer l’un de ces droits, écrivez à [support@konvertools.com](mailto:support@konvertools.com) depuis l’adresse enregistrée sur votre compte. Nous répondrons dans un délai d’un (1) mois, conformément au RGPD Art. 12(3) ; ce délai peut être prolongé de deux mois supplémentaires pour les demandes particulièrement complexes, auquel cas nous vous en informerons dans le premier mois."
          },
          {
            "kind": "p",
            "text": "Vous disposez également du **droit de déposer une réclamation auprès d’une autorité de contrôle** (RGPD Art. 77). Pour les utilisateurs en France, il s’agit de la **Commission nationale de l’informatique et des libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, France — téléphone +33 (0)1 53 73 22 22 — réclamations en ligne sur [www.cnil.fr/fr/plaintes](https://www.cnil.fr/fr/plaintes). Pour les utilisateurs dans d’autres États membres de l’UE/EEE, vous pouvez déposer une réclamation auprès de votre **autorité nationale de contrôle** (la liste est maintenue par le Comité européen de la protection des données sur [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_fr)). Vous pouvez également saisir un recours juridictionnel conformément au RGPD Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Sous-traitants tiers",
        "blocks": [
          {
            "kind": "p",
            "text": "La fourniture du Service nécessite que nous partagions des données strictement limitées avec les sous-traitants suivants. Chacun dispose de sa propre politique de confidentialité régissant la manière dont ils traitent les données qu’ils reçoivent de notre part."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (société enregistrée à Singapour, hébergée dans l’UE pour notre projet) — authentification, base de données, stockage de fichiers et fonctions Edge. Reçoit vos identifiants de compte, vos données de profil et (de manière transitoire) tout fichier que vous téléversez pour un outil assisté par serveur. Agit en tant que sous-traitant.",
              "**Mistral AI** (France) — inférence de modèles de langage pour la traduction, la reformulation, la synthèse, l’humanisation de texte, l’analyse de motifs de phishing et autres tâches textuelles ; transcription audio (Voxtral) ; OCR et tâches de vision par IA (Pixtral). Le texte ou l’image que vous soumettez est envoyé à Mistral pour inférence. Mistral s’est engagé contractuellement à **ne pas** utiliser les entrées de l’API pour entraîner ses modèles.",
              "**Google Safe Browsing** (Google LLC, États-Unis) — uniquement lorsque vous utilisez le Scanner d’URL ou le Détecteur de phishing. Seules les URL que vous soumettez (ou les liens extraits de l’e-mail que vous collez) sont transmises. Il s’agit du seul service tiers de sécurité que nous utilisons.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — uniquement lorsque vous utilisez le Vérificateur de fuites de mots de passe, et uniquement les cinq premiers caractères du hachage SHA-1 de votre mot de passe (k-anonymat). Interrogé directement depuis votre navigateur, sans passer par nos serveurs.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irlande) — traitement des paiements et facturation des abonnements. Nous **ne voyons ni ne stockons** les détails de votre carte. Stripe reçoit votre adresse e-mail, votre méthode de paiement, votre adresse de facturation et le plan que vous avez acheté.",
              "**Resend** (États-Unis) — envoi d’e-mails transactionnels (confirmation de compte, reçus de paiement, réinitialisation de mot de passe). Reçoit votre adresse e-mail et le corps de l’e-mail que nous envoyons.",
              "**Vercel** (États-Unis) — réseau de diffusion de contenu pour les pages statiques. Reçoit des métadonnées standard de trafic web (IP, user-agent, URL demandée) pour le routage et la prévention des abus. Conservées conformément à la politique de rétention des logs de Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Lorsque l’un de ces sous-traitants opère en dehors de l’Espace économique européen, les transferts sont régis par les Clauses contractuelles types (SCC) de la Commission européenne ou un mécanisme de transfert équivalent."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies et technologies similaires",
        "blocks": [
          {
            "kind": "p",
            "text": "Nous utilisons uniquement les cookies et éléments de stockage local suivants :"
          },
          {
            "kind": "ul",
            "items": [
              "**Essentiels** : NEXT_LOCALE (conserve votre langue choisie), et les cookies de session Supabase (sb-*-auth-token) lorsque vous êtes connecté. Ceux-ci ne nécessitent pas de consentement au titre du RGPD.",
              "**Publicité optionnelle** : si et lorsque nous activons des partenaires publicitaires (Ezoic est actuellement référencé dans notre code mais non activé pour votre trafic), nous afficherons une bannière de consentement claire et ne définirons des cookies publicitaires qu’une fois que vous aurez opté pour."
            ]
          },
          {
            "kind": "p",
            "text": "Nous n’utilisons actuellement aucun outil d’analytique, pixel de suivi ou balise de reciblage. Si nous en ajoutons, la bannière de cookies ci-dessus les bloquera."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Sécurité du traitement (RGPD Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "Conformément au RGPD Art. 32, nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté au risque :"
          },
          {
            "kind": "ul",
            "items": [
              "**Chiffrement en transit** — tout le trafic vers et depuis le Service est protégé par TLS 1.2 ou supérieur.",
              "**Chiffrement au repos** — Supabase chiffre la base de données sous-jacente (y compris vos données de compte) avec AES-256.",
              "**Gestion des mots de passe** — votre mot de passe est haché par Supabase Auth et jamais stocké en clair. Nous vérifions en outre les nouveaux mots de passe côté client contre l’API k-anonymat de HaveIBeenPwned pour refuser les mots de passe connus pour avoir fuité.",
              "**Données de paiement** — jamais vues ni stockées par nos soins ; le flux de paiement par carte est entièrement délégué à Stripe (conforme PCI-DSS Niveau 1).",
              "**Contrôle d’accès** — des politiques de sécurité au niveau des lignes empêchent un utilisateur de lire les données d’un autre ; les clés de rôle de service sont restreintes aux fonctions Edge.",
              "**Hygiène des fichiers** — aucun fichier téléversé n’est conservé : les outils fonctionnant uniquement dans le navigateur ne transmettent rien, et les outils assistés par serveur suppriment les tampons temporaires dans les 30 minutes.",
              "**Réponse aux vulnérabilités** — les problèmes de sécurité peuvent être signalés confidentiellement à [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Malgré ces mesures, aucun système n’est parfaitement sécurisé ; vous acceptez le risque résiduel inhérent à tout service en ligne."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Minimisation des données et limitation des finalités (RGPD Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "Conformément au RGPD Art. 5(1)(c), nous ne collectons que les données strictement nécessaires aux finalités définies dans la présente Politique. Concrètement : nous ne collectons pas votre adresse IP au-delà des logs de routage éphémères, nous ne réalisons pas d’empreinte numérique de votre navigateur, nous n’exécutons pas d’analytique comportementale, et nous n’utilisons jamais un fichier que vous traitez pour entraîner des modèles d’IA. Nous ne collectons pas de données de catégorie spéciale (Art. 9) ni de données relatives à des infractions pénales (Art. 10). Les données sont tenues à jour et exactes (Art. 5(1)(d)) ; vous pouvez corriger toute inexactitude à tout moment via votre tableau de bord ou en contactant [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Conservation",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Données de profil : conservées pendant la durée de votre compte, supprimées dans les trente (30) jours suivant la fermeture du compte.",
              "Métadonnées des tâches : purgées automatiquement après deux (2) heures.",
              "Fichiers de résultat dans le compartiment de stockage : supprimés physiquement dans les trente (30) minutes suivant leur génération.",
              "Enregistrements de facturation : conservés pendant dix (10) ans pour se conformer aux obligations fiscales françaises.",
              "Enregistrements de consentement : conservés pendant la durée de votre compte plus cinq (5) ans après pour servir de preuve légale."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Mineurs",
        "blocks": [
          {
            "kind": "p",
            "text": "Le Service **n’est pas destiné aux enfants de moins de seize (16) ans**. Si vous avez moins de cet âge, vous ne devez pas créer de compte. Nous ne collectons pas sciemment de données auprès des mineurs ; si nous en prenons connaissance, nous les supprimerons."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Modifications de cette politique",
        "blocks": [
          {
            "kind": "p",
            "text": "Nous pouvons modifier cette Politique de confidentialité de temps à autre. Les changements substantiels seront annoncés par e-mail aux détenteurs de compte au moins trente (30) jours avant leur entrée en vigueur. La version la plus récente est toujours disponible à l’adresse [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Contact",
        "blocks": [
          {
            "kind": "p",
            "text": "Pour toute question concernant cette politique ou vos données — y compris l’exercice de l’un de vos droits au titre du RGPD (voir section 6) — écrivez à [support@konvertools.com](mailto:support@konvertools.com). Cette seule adresse mail est notre point de contact pour les questions relatives à la confidentialité, à la sécurité, à la facturation et au support général. Vous pouvez également déposer une réclamation auprès de la CNIL française (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) ou auprès de l’autorité de contrôle de votre pays de résidence."
          }
        ]
      }
    ]
  },
  "es": {
    "h1": "Política de Privacidad",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Última actualización: %DATE% · Efectiva de inmediato para todos los visitantes y titulares de cuentas.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Nuestro principio fundamental: no almacenamos tus archivos",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (el \"Servicio\") opera como un conjunto de herramientas con enfoque en la privacidad. El compromiso más importante que asumimos es el siguiente:"
          },
          {
            "kind": "ul",
            "items": [
              "**Herramientas solo para navegador** (convertidores de imágenes, herramientas de PDF que utilizan pdf-lib, conversiones de audio y vídeo con FFmpeg.wasm, herramientas de código, calculadoras, generadores de códigos QR, el verificador de filtraciones de contraseñas, la mayoría de las utilidades) se ejecutan **completamente dentro de tu navegador web mediante WebAssembly**. Tu archivo o entrada nunca se transmite a nuestros servidores. No tenemos medios técnicos para leerlo.",
              "**Herramientas con asistencia de servidor** (transcripción con IA, traducción con IA, tareas de texto con IA, incrustación de subtítulos en vídeo, escáner de URL, detector de phishing, verificador de certificados SSL y algunas otras) necesitan enviar algo a un backend. En todos los casos, el archivo o texto se procesa en tiempo real y se elimina del almacenamiento temporal en un plazo de treinta (30) minutos.",
              "Nunca almacenamos el contenido de ningún archivo subido en una ubicación persistente, no utilizamos tus archivos subidos para entrenar modelos de IA ni los vendemos, alquilamos o compartimos con terceros para ningún fin distinto al de proporcionar el resultado que solicitaste."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Responsable del tratamiento de datos",
        "blocks": [
          {
            "kind": "p",
            "text": "A efectos del Reglamento General de Protección de Datos de la UE (Reglamento (UE) 2016/679, \"GDPR\"), el responsable del tratamiento de datos es el editor del Servicio. Para cualquier consulta sobre privacidad: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Qué datos recopilamos",
        "blocks": [
          {
            "kind": "p",
            "text": "Los únicos datos personales que persistimos en nuestra base de datos son:"
          },
          {
            "kind": "ul",
            "items": [
              "**Credenciales de cuenta**: tu dirección de correo electrónico; una copia con sal y hash de tu contraseña (gestionada por Supabase Auth — nunca vemos ni almacenamos el texto en claro); nombre de visualización y URL de avatar opcionales si inicias sesión con Google.",
              "**Estado de suscripción**: plan actual (gratis / Pro / Business), identificador de cliente de Stripe y las fechas de tus renovaciones más recientes.",
              "**Contadores de uso**: contadores agregados de cuotas (por ejemplo, \"3 ejecuciones de IA utilizadas hoy\", \"420 ejecuciones de IA mensuales utilizadas\") actualizados en tu perfil. **No registramos registros por ejecución**.",
              "**Metadatos de trabajos (transitorios)**: cuando una herramienta con asistencia de servidor genera un resultado (por ejemplo, un archivo .srt de transcripción), registramos el nombre de la herramienta, la URL de descarga del resultado, el idioma de origen y una marca de tiempo de finalización. Estas filas se purgan automáticamente después de **dos (2) horas**. Nunca contienen el contenido de tus archivos.",
              "**Registros de consentimiento**: la fecha y hora en que aceptaste estos Términos y nuestra Política de Privacidad, y si optaste por recibir correos electrónicos de marketing. Se conservan durante la duración de tu cuenta más un período de prueba legal de cinco (5) años tras la eliminación."
            ]
          },
          {
            "kind": "p",
            "text": "**No recopilamos**: tu dirección IP (más allá del uso temporal que hacen Supabase y nuestro proveedor de alojamiento para limitación de tasas y registros de seguridad), huella digital de tu navegador, eventos de seguimiento conductual, grabaciones de pantalla ni ningún dato biométrico."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Archivos que procesas",
        "blocks": [
          {
            "kind": "p",
            "text": "Como se indica en la sección 1, el contenido de los archivos que procesas nunca es almacenado por nosotros. El ciclo de vida preciso es el siguiente:"
          },
          {
            "kind": "ul",
            "items": [
              "**Herramientas solo para navegador**: cero transmisión. El archivo se lee en la memoria de tu navegador, el resultado se produce localmente y lo descargas directamente. No registramos nada sobre el archivo en sí.",
              "**Transcripción / traducción / OCR / análisis de phishing con IA**: el archivo o texto se envía en tiempo real a nuestra función Edge de Supabase, que lo reenvía inmediatamente al proveedor de IA correspondiente (consulta la sección 7) para su inferencia. El resultado se devuelve y el búfer de carga temporal se descarta. Los archivos de resultados escritos en nuestro bucket de almacenamiento privado son accesibles mediante URL firmada durante sesenta (60) minutos y se eliminan físicamente en un plazo de treinta (30) minutos tras su generación.",
              "**Verificador de filtraciones de contraseñas**: tu contraseña nunca abandona tu navegador. La hasheamos localmente con SHA-1 y consultamos HaveIBeenPwned mediante k-anonimato — solo se envían los cinco primeros caracteres del hash. La contraseña y el hash completo nunca se transmiten.",
              "**Escáner de URL / verificador de SSL**: solo se transmite la URL o nombre de host que escribes (a Google Safe Browsing para el escáner de URL o para abrir una conexión TLS en vivo para el verificador de SSL). No se envían los contenidos de la página circundante."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Bases legales para el tratamiento (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Cumplimiento de un contrato** (Art. 6(1)(b)) — cuando creas una cuenta y utilizas funciones de pago, el tratamiento es necesario para prestar el Servicio.",
              "**Intereses legítimos** (Art. 6(1)(f)) — prevención de fraudes, mitigación de abusos, registros básicos de seguridad y mejora del Servicio.",
              "**Consentimiento** (Art. 6(1)(a)) — correos electrónicos de marketing, cookies de análisis o publicidad opcionales (si y cuando se habiliten) y cualquier integración opcional futura.",
              "**Obligación legal** (Art. 6(1)(c)) — conservación de registros de facturación según lo exigido por la ley fiscal francesa (normalmente diez años)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Tus derechos según el GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Como interesado bajo el Reglamento (UE) 2016/679 de 27 de abril de 2016 (el \"GDPR\"), disfrutas de los siguientes derechos, ejercitables en cualquier momento y sin coste desde la dirección de correo electrónico registrada en tu cuenta:"
          },
          {
            "kind": "ul",
            "items": [
              "**Derecho de acceso** (GDPR Art. 15) — obtener confirmación de que procesamos tus datos y una copia de los mismos.",
              "**Derecho de rectificación** (GDPR Art. 16) — corregir datos inexactos o incompletos.",
              "**Derecho de supresión / derecho al olvido** (GDPR Art. 17) — eliminar tus datos cuando ya no apliquen las bases legales para el tratamiento.",
              "**Derecho de limitación del tratamiento** (GDPR Art. 18) — congelar temporalmente el tratamiento mientras se resuelve una disputa.",
              "**Derecho a la portabilidad de los datos** (GDPR Art. 20) — recibir tus datos en un formato estructurado y legible por máquina.",
              "**Derecho de oposición** (GDPR Art. 21) — oponerte, en cualquier momento y por motivos relacionados con tu situación particular, al tratamiento basado en intereses legítimos.",
              "**Derecho a retirar el consentimiento** (GDPR Art. 7(3)) — para tratamientos basados en consentimiento, retirarlo en cualquier momento sin afectar la legalidad del tratamiento previo.",
              "**Derecho a no ser objeto de decisiones automatizadas** (GDPR Art. 22) — ninguno de nuestros tratamientos implica decisiones automatizadas que produzcan efectos jurídicos sobre ti."
            ]
          },
          {
            "kind": "p",
            "text": "Para ejercer cualquiera de estos derechos, escribe a [support@konvertools.com](mailto:support@konvertools.com) desde la dirección registrada en tu cuenta. Respondemos en un plazo de un (1) mes, según lo exige el GDPR Art. 12(3); el plazo puede prorrogarse dos meses adicionales para solicitudes especialmente complejas, en cuyo caso te informaremos en el primer mes."
          },
          {
            "kind": "p",
            "text": "También tienes el **derecho a presentar una reclamación ante una autoridad de control** (GDPR Art. 77). Para usuarios en Francia, esta es la **Comisión Nacional de Informática y Libertades (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARÍS CEDEX 07, Francia — teléfono +33 (0)1 53 73 22 22 — reclamaciones en línea en [www.cnil.fr/es/reclamaciones](https://www.cnil.fr/es/reclamaciones). Para usuarios en otros Estados miembros de la UE/EEE, puedes presentar una reclamación ante tu **autoridad nacional de control** (la lista la mantiene el Comité Europeo de Protección de Datos en [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_es)). También puedes buscar una solución judicial según el GDPR Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Procesadores de terceros",
        "blocks": [
          {
            "kind": "p",
            "text": "Para prestar el Servicio, debemos compartir datos estrictamente limitados con los siguientes procesadores. Cada uno tiene su propia política de privacidad que rige cómo manejan los datos que reciben de nosotros."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (constituida en Singapur, alojada en la UE para nuestro proyecto) — autenticación, base de datos, almacenamiento de archivos y funciones Edge. Recibe tus credenciales de cuenta, datos de perfil y (transitoriamente) cualquier archivo que subas para una herramienta con asistencia de servidor. Actúa como nuestro subprocesador.",
              "**Mistral AI** (Francia) — inferencia de modelos de lenguaje para traducción, reformulación, resumen, humanización de texto con IA, análisis de patrones de phishing y otras tareas de texto; transcripción de audio (Voxtral); OCR e tareas de visión por imagen (Pixtral). El texto o imagen que envíes se envía a Mistral para su inferencia. Mistral se ha comprometido contractualmente a **no utilizar las entradas de la API para entrenar sus modelos**.",
              "**Google Safe Browsing** (Google LLC, EE.UU.) — solo cuando utilizas el Escáner de URL o el Detector de Phishing. Solo se transmiten las URL que envíes (o los enlaces extraídos del correo electrónico que pegues). Este es el único servicio de seguridad de terceros que utilizamos.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — solo cuando utilizas el Verificador de Filtraciones de Contraseñas, y solo los cinco primeros caracteres del hash SHA-1 de tu contraseña (k-anonimato). Se consulta directamente desde tu navegador, no a través de nuestros servidores.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irlanda) — procesamiento de pagos y facturación de suscripciones. **Nunca vemos ni almacenamos** los detalles de tu tarjeta. Stripe recibe tu correo electrónico, método de pago, dirección de facturación y el plan que compraste.",
              "**Resend** (EE.UU.) — entrega de correos electrónicos transaccionales (confirmación de cuenta, recibos de pago, restablecimiento de contraseña). Recibe tu dirección de correo electrónico y el cuerpo del correo que enviamos.",
              "**Vercel** (EE.UU.) — red de entrega de contenido para páginas estáticas. Recibe metadatos estándar de tráfico web (IP, agente de usuario, URL solicitada) para enrutamiento y prevención de abusos. Se conserva según la política de retención de registros de Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Cuando alguno de estos procesadores opera fuera del Espacio Económico Europeo, las transferencias se rigen por las Cláusulas Contractuales Tipo (SCC) de la Comisión Europea o un mecanismo de transferencia equivalente."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies y tecnologías similares",
        "blocks": [
          {
            "kind": "p",
            "text": "Solo utilizamos las siguientes cookies y elementos de almacenamiento local:"
          },
          {
            "kind": "ul",
            "items": [
              "**Esenciales**: NEXT_LOCALE (recuerda el idioma que has elegido) y cookies de sesión de Supabase (sb-*-auth-token) cuando inicias sesión. Estas no requieren consentimiento según el GDPR.",
              "**Publicidad opcional**: si y cuando habilitemos socios publicitarios (actualmente Ezoic está referenciado en nuestro código pero no está activado para tu tráfico), mostraremos un banner de consentimiento claro y solo estableceremos cookies publicitarias una vez que optes por ellas."
            ]
          },
          {
            "kind": "p",
            "text": "Actualmente no ejecutamos ningún análisis, píxeles de seguimiento ni etiquetas de remarketing. Si añadimos alguno, el banner de cookies anterior lo regulará."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Seguridad del tratamiento (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "De conformidad con el GDPR Art. 32, implementamos medidas técnicas y organizativas adecuadas para garantizar un nivel de seguridad acorde al riesgo:"
          },
          {
            "kind": "ul",
            "items": [
              "**Cifrado en tránsito** — todo el tráfico hacia y desde el Servicio está protegido por TLS 1.2 o superior.",
              "**Cifrado en reposo** — Supabase cifra la base de datos subyacente (incluidos tus datos de cuenta) con AES-256.",
              "**Manejo de contraseñas** — tu contraseña se hashea mediante Supabase Auth y nunca se almacena en texto claro. Además, verificamos nuevas contraseñas en el cliente contra la API de k-anonimato de HaveIBeenPwned para rechazar contraseñas conocidas comprometidas.",
              "**Datos de pago** — nunca vistos ni almacenados por nosotros; el flujo de pago con tarjeta está completamente delegado a Stripe (cumplimiento PCI-DSS Nivel 1).",
              "**Control de acceso** — políticas de seguridad a nivel de filas impiden que un usuario lea los datos de otro; las claves de rol de servicio están restringidas a funciones Edge.",
              "**Higiene de archivos** — ningún archivo subido se retiene: las herramientas solo para navegador nunca transmiten nada, y las herramientas con asistencia de servidor eliminan búferes temporales en 30 minutos.",
              "**Respuesta a vulnerabilidades** — los problemas de seguridad pueden reportarse confidencialmente a [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "A pesar de estas medidas, ningún sistema es perfectamente seguro; aceptas el riesgo residual inherente a cualquier servicio en línea."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Minimización de datos y limitación de finalidad (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "De conformidad con el GDPR Art. 5(1)(c), recopilamos solo los datos estrictamente necesarios para los fines establecidos en esta Política. Concretamente: no recopilamos tu dirección IP más allá de registros de enrutamiento efímeros, no fingerprinting de tu navegador, no ejecutamos análisis conductuales y nunca utilizamos ningún archivo que proceses para entrenar modelos de IA. No recopilamos datos de categorías especiales (Art. 9) ni datos relacionados con infracciones penales (Art. 10). Los datos se mantienen precisos y actualizados (Art. 5(1)(d)); puedes corregir cualquier inexactitud en cualquier momento a través de tu panel o contactando a [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Retención",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Datos de perfil: se conservan mientras exista tu cuenta, se eliminan en un plazo de treinta (30) días tras el cierre de la cuenta.",
              "Metadatos de trabajos: se purgan automáticamente después de dos (2) horas.",
              "Archivos de resultados en el bucket de almacenamiento: se eliminan físicamente en un plazo de treinta (30) minutos tras su generación.",
              "Registros de facturación: se conservan durante diez (10) años para cumplir con las obligaciones fiscales francesas.",
              "Registros de consentimiento: se conservan durante la duración de tu cuenta más cinco (5) años adicionales como prueba legal."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Menores de edad",
        "blocks": [
          {
            "kind": "p",
            "text": "El Servicio **no va dirigido a menores de dieciséis (16) años**. Si tienes menos de esa edad, no debes crear una cuenta. No recopilamos datos de menores de forma intencional; si nos percatamos de ello, los eliminaremos."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Cambios en esta política",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos modificar esta Política de Privacidad en cualquier momento. Los cambios sustanciales se anunciarán por correo electrónico a los titulares de cuentas al menos treinta (30) días antes de que entren en vigor. La versión más reciente siempre está disponible en [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Contacto",
        "blocks": [
          {
            "kind": "p",
            "text": "Para cualquier pregunta sobre esta política o tus datos —incluidos el ejercicio de tus derechos según el GDPR (consulta la sección 6)— escribe a [support@konvertools.com](mailto:support@konvertools.com). Esta única dirección de correo es nuestro punto de contacto para consultas sobre privacidad, seguridad, facturación y soporte general. También puedes presentar una reclamación ante la autoridad francesa de protección de datos CNIL (3 Place de Fontenoy, TSA 80715, 75334 París Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) o ante la autoridad de control de tu país de residencia."
          }
        ]
      }
    ]
  },
  "pt": {
    "h1": "Política de Privacidade",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Última atualização: %DATE% · Eficaz imediatamente para todos os visitantes e titulares de contas.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Nosso princípio fundamental: não armazenamos seus arquivos",
        "blocks": [
          {
            "kind": "p",
            "text": "A Konvertools (o \"Serviço\") é operada como um conjunto de ferramentas com foco em privacidade. O compromisso mais importante que assumimos é este:"
          },
          {
            "kind": "ul",
            "items": [
              "**Ferramentas apenas no navegador** (conversores de imagem, ferramentas de PDF que utilizam pdf-lib, conversões de áudio e vídeo com FFmpeg.wasm, ferramentas de código, calculadoras, geradores de QR, o verificador de violação de senhas, a maioria das utilidades) são executadas **inteiramente dentro do seu navegador web por meio de WebAssembly**. Seu arquivo ou entrada nunca é transmitido aos nossos servidores. Não possuímos meios técnicos para lê-lo.",
              "**Ferramentas com assistência de servidor** (transcrição de IA, tradução de IA, tarefas de texto de IA, legendas de vídeo queimadas, o scanner de URLs, o detector de phishing, o verificador de certificados SSL e um pequeno número de outros) precisam enviar algo a um backend. Em todos os casos, o arquivo ou texto é processado em tempo real e excluído do armazenamento temporário em até trinta (30) minutos.",
              "Nunca armazenamos o conteúdo de nenhum arquivo carregado em local persistente, nunca usamos seus uploads para treinar modelos de IA e nunca os vendemos, alugamos ou compartilhamos com terceiros para qualquer finalidade além de entregar o resultado que você solicitou."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Controlador de dados",
        "blocks": [
          {
            "kind": "p",
            "text": "Para os fins do Regulamento Geral sobre a Proteção de Dados da União Europeia (Regulamento (UE) 2016/679, \"GDPR\"), o controlador de dados é o editor do Serviço. Contato para qualquer consulta sobre privacidade: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. O que coletamos",
        "blocks": [
          {
            "kind": "p",
            "text": "Os únicos dados pessoais que persistimos em nosso banco de dados são:"
          },
          {
            "kind": "ul",
            "items": [
              "**Credenciais de conta**: seu endereço de e-mail; uma cópia com hash e salgada de sua senha (gerenciada pelo Supabase Auth — nunca vemos ou armazenamos o texto simples); nome de exibição e URL do avatar opcionais, caso você faça login com o Google.",
              "**Estado da assinatura**: plano atual (gratuito / Pro / Business), identificador de cliente do Stripe e as datas de suas renovações mais recentes.",
              "**Contadores de uso**: contadores agregados de cota (por exemplo, \"3 execuções de IA usadas hoje\", \"420 execuções de IA mensais usadas\") atualizados no local na linha do seu perfil. Não registramos **registros por execução**.",
              "**Metadados de tarefas (transitórios)**: quando uma ferramenta com assistência de servidor produz uma saída (por exemplo, um arquivo .srt de transcrição), registramos o nome da ferramenta, a URL de download do resultado, o idioma de origem e um carimbo de data/hora de conclusão. Essas linhas são **purificadas automaticamente após duas (2) horas**. Elas nunca contêm o conteúdo do seu arquivo.",
              "**Registros de consentimento**: a data e o horário em que você aceitou estes Termos e nossa Política de Privacidade, e se optou por receber e-mails de marketing. Mantidos durante a duração da sua conta mais um período de cinco (5) anos após a exclusão, como prova legal."
            ]
          },
          {
            "kind": "p",
            "text": "Não coletamos: **seu endereço IP** (além do uso temporário que o Supabase e nosso provedor de hospedagem fazem dele para limitação de taxa e registro de segurança), **sua impressão digital do navegador**, **eventos de rastreamento comportamental**, **gravações da sua tela** ou **quaisquer dados biométricos**."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Arquivos que você processa",
        "blocks": [
          {
            "kind": "p",
            "text": "Conforme declarado na seção 1, o conteúdo dos arquivos que você processa nunca é persistido por nós. O ciclo de vida exato é:"
          },
          {
            "kind": "ul",
            "items": [
              "**Ferramentas apenas no navegador**: nenhuma transmissão. O arquivo é lido na memória pelo seu navegador, o resultado é produzido localmente e você o baixa diretamente. Não registramos nada sobre o arquivo em si.",
              "**Transcrição / tradução / OCR / análise de phishing por IA**: o arquivo ou texto é transmitido para nossa Edge Function do Supabase, que imediatamente o encaminha para o respectivo provedor de IA (consulte a seção 7) para inferência. O resultado é retornado a você e o buffer de upload temporário é descartado. Os arquivos de resultado gravados em nosso bucket de armazenamento privado são acessíveis por meio de URL assinado por sessenta (60) minutos e **purificados fisicamente em até trinta (30) minutos após a geração**.",
              "**Verificador de violação de senhas**: sua senha nunca sai do seu navegador. Nós a criptografamos localmente com SHA-1 e consultamos o HaveIBeenPwned usando k-anonimato — apenas os **primeiros 5 caracteres do hash** são enviados. A senha e o hash completo nunca são transmitidos.",
              "**Scanner de URLs / verificador de SSL**: apenas a URL ou nome de host que você digita é transmitido (para o Google Safe Browsing no caso do scanner de URLs ou usado para abrir uma conexão TLS ao vivo no caso do verificador de SSL). Nenhum conteúdo circundante da página."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Bases legais para processamento (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Execução de um contrato** (Art. 6(1)(b)) — quando você cria uma conta e usa recursos pagos, o processamento é necessário para fornecer o Serviço.",
              "**Interesses legítimos** (Art. 6(1)(f)) — prevenção de fraudes, mitigação de abusos, registro básico de segurança e melhoria do Serviço.",
              "**Consentimento** (Art. 6(1)(a)) — e-mails de marketing, cookies analíticos ou de publicidade opcionais (se e quando ativados) e qualquer integração opcional futura.",
              "**Obrigação legal** (Art. 6(1)(c)) — retenção de registros de faturamento conforme exigido pela legislação tributária francesa (geralmente dez anos)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Seus direitos sob o GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Como titular de dados sob o Regulamento (UE) 2016/679 de 27 de abril de 2016 (o \"GDPR\"), você possui os seguintes direitos, exercíveis a qualquer momento e gratuitamente a partir do endereço de e-mail registrado na sua conta:"
          },
          {
            "kind": "ul",
            "items": [
              "**Direito de acesso** (GDPR Art. 15) — obter confirmação de que processamos seus dados e uma cópia deles.",
              "**Direito de retificação** (GDPR Art. 16) — ter dados imprecisos ou incompletos corrigidos.",
              "**Direito de apagamento / direito ao esquecimento** (GDPR Art. 17) — ter seus dados excluídos quando as bases legais para processamento não se aplicarem mais.",
              "**Direito à limitação do processamento** (GDPR Art. 18) — congelar temporariamente o processamento enquanto uma disputa é resolvida.",
              "**Direito à portabilidade dos dados** (GDPR Art. 20) — receber seus dados em um formato estruturado e legível por máquina.",
              "**Direito de oposição** (GDPR Art. 21) — opor-se, a qualquer momento, com base na sua situação particular, ao processamento baseado em nossos interesses legítimos.",
              "**Direito de retirada do consentimento** (GDPR Art. 7(3)) — para processamento baseado em consentimento, retirá-lo a qualquer momento sem afetar a legalidade do processamento anterior.",
              "**Direito a não ser submetido a decisões automatizadas** (GDPR Art. 22) — nenhum de nossos processamentos envolve decisões automatizadas exclusivas que produzam efeitos legais sobre você."
            ]
          },
          {
            "kind": "p",
            "text": "Para exercer qualquer um desses direitos, escreva para [support@konvertools.com](mailto:support@konvertools.com) a partir do endereço registrado na sua conta. Responderemos dentro de um (1) mês, conforme exigido pelo GDPR Art. 12(3); o prazo pode ser prorrogado por mais dois meses para solicitações particularmente complexas, caso em que informaremos você dentro do primeiro mês."
          },
          {
            "kind": "p",
            "text": "Você também tem o **direito de apresentar uma reclamação a uma autoridade de supervisão** (GDPR Art. 77). Para usuários na França, esta é a **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, França — telefone +33 (0)1 53 73 22 22 — reclamações online em [www.cnil.fr/pt](https://www.cnil.fr/en/plaintes). Para usuários em outros Estados-Membros da UE/EEE, você pode apresentar uma reclamação à sua **autoridade nacional de supervisão** (a lista é mantida pelo European Data Protection Board em [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Você também pode buscar uma solução judicial sob o GDPR Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Processadores de terceiros",
        "blocks": [
          {
            "kind": "p",
            "text": "A prestação do Serviço requer que compartilhemos dados estritamente limitados com os seguintes processadores. Cada um possui sua própria política de privacidade que rege como eles lidam com os dados que recebem de nós."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (incorporada em Singapura, hospedada na UE para o nosso projeto) — autenticação, banco de dados, armazenamento de arquivos e Edge Functions. Recebe suas credenciais de conta, dados de perfil e (transitoriamente) qualquer arquivo que você carregar para uma ferramenta com assistência de servidor. Atua como nosso subprocessador.",
              "**Mistral AI** (França) — inferência de modelo de linguagem de grande porte para tradução, reformulação, sumarização, o humanizador de IA, análise de padrões de phishing e outras tarefas de texto; transcrição de áudio (Voxtral); tarefas de OCR e Visão de imagem (Pixtral). O texto ou imagem que você enviar é enviado à Mistral para inferência. A Mistral comprometeu-se contratualmente a **não usar as entradas da API para treinar seus modelos**.",
              "**Google Safe Browsing** (Google LLC, EUA) — apenas quando você usa o Scanner de URLs ou o Detector de Phishing. Apenas os URLs que você enviar (ou links extraídos do e-mail que você colar) são transmitidos. Este é o único serviço de segurança de terceiros que utilizamos.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — apenas quando você usa o Verificador de Violação de Senhas e apenas os **primeiros 5 caracteres do hash SHA-1 da sua senha** (k-anonimato). Consultado diretamente do seu navegador, não por meio dos nossos servidores.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irlanda) — processamento de pagamentos e faturamento de assinaturas. Nós **nunca vemos ou armazenamos** os detalhes do seu cartão. O Stripe recebe seu e-mail, método de pagamento, endereço de cobrança e o plano que você comprou.",
              "**Resend** (EUA) — entrega de e-mails transacionais (confirmação de conta, recibos de pagamento, redefinição de senha). Recebe seu endereço de e-mail e o corpo do e-mail que enviamos.",
              "**Vercel** (EUA) — rede de distribuição de conteúdo para páginas estáticas. Recebe metadados padrão de tráfego web (IP, user-agent, URL solicitado) para roteamento e prevenção de abusos. Mantidos de acordo com a política de retenção de logs da Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Quando algum desses processadores opera fora do Espaço Econômico Europeu, as transferências são regidas pelas Cláusulas Contratuais Tipo (SCCs) da Comissão Europeia ou um mecanismo de transferência equivalente."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies e tecnologias semelhantes",
        "blocks": [
          {
            "kind": "p",
            "text": "Utilizamos apenas os seguintes cookies e itens de armazenamento local:"
          },
          {
            "kind": "ul",
            "items": [
              "**Essenciais**: NEXT_LOCALE (lembra o idioma escolhido) e cookies de sessão do Supabase (sb-*-auth-token) quando você está conectado. Estes não exigem consentimento sob o GDPR.",
              "**Publicidade opcional**: se e quando ativarmos parceiros de publicidade (atualmente o Ezoic está referenciado no nosso código, mas ainda não ativado para o seu tráfego), exibiremos um banner de consentimento claro e só definiremos cookies de publicidade após você optar por aceitar."
            ]
          },
          {
            "kind": "p",
            "text": "Atualmente, não executamos nenhuma análise, pixels de rastreamento ou tags de remarketing. Se adicionarmos alguma, o banner de cookies acima as restringirá."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Segurança do processamento (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "Em conformidade com o GDPR Art. 32, implementamos medidas técnicas e organizacionais apropriadas para garantir um nível de segurança adequado ao risco:"
          },
          {
            "kind": "ul",
            "items": [
              "**Criptografia em trânsito** — todo o tráfego para e do Serviço é protegido por TLS 1.2 ou superior.",
              "**Criptografia em repouso** — o Supabase criptografa o banco de dados subjacente (incluindo seus dados de conta) com AES-256.",
              "**Manuseio de senhas** — sua senha é criptografada pelo Supabase Auth e nunca armazenada em texto simples. Além disso, verificamos novas senhas contra a API de k-anonimato do HaveIBeenPwned no lado do cliente para recusar senhas conhecidas como comprometidas.",
              "**Dados de pagamento** — nunca vistos ou armazenados por nós; o fluxo de pagamento com cartão é totalmente delegado ao Stripe (conforme PCI-DSS Nível 1).",
              "**Controle de acesso** — políticas de segurança em nível de linha impedem que um usuário leia os dados de outro usuário; chaves de função de serviço são restritas a Edge Functions.",
              "**Higiene de arquivos** — nenhum arquivo carregado é retido: ferramentas apenas no navegador nunca transmitem nada, e ferramentas com assistência de servidor excluem buffers temporários em até 30 minutos.",
              "**Resposta a vulnerabilidades** — problemas de segurança podem ser relatados confidencialmente para [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Apesar dessas medidas, nenhum sistema é perfeitamente seguro; você aceita o risco residual inerente a qualquer serviço online."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Minimização e limitação de propósito de dados (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "Em conformidade com o GDPR Art. 5(1)(c), coletamos apenas os dados estritamente necessários para os fins estabelecidos nesta Política. Concretamente: não coletamos seu endereço IP além de logs de roteamento efêmeros, não fazemos impressão digital do seu navegador, não executamos análises comportamentais e nunca usamos nenhum arquivo que você processa para treinar modelos de IA. Não coletamos dados de categorias especiais (Art. 9) ou dados relacionados a infrações penais (Art. 10). Os dados são mantidos precisos e atualizados (Art. 5(1)(d)); você pode corrigir qualquer imprecisão a qualquer momento por meio do seu painel ou entrando em contato com [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Retenção",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dados de perfil: mantidos enquanto sua conta existir, excluídos em até trinta (30) dias após o encerramento da conta.",
              "Metadados de tarefas: purificados automaticamente após duas (2) horas.",
              "Arquivos de resultado no bucket de armazenamento: excluídos fisicamente em até trinta (30) minutos após a geração.",
              "Registros de faturamento: retidos por dez (10) anos para cumprir obrigações fiscais francesas.",
              "Registros de consentimento: mantidos durante a duração da sua conta mais cinco (5) anos após a exclusão, como prova legal."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Menores de idade",
        "blocks": [
          {
            "kind": "p",
            "text": "O Serviço **não é direcionado a crianças menores de dezesseis (16) anos**. Se você tiver menos que essa idade, não deve criar uma conta. Não coletamos dados de menores de forma intencional; se tomarmos conhecimento de que coletamos, excluiremos os dados."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Alterações nesta política",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos alterar esta Política de Privacidade periodicamente. Alterações substanciais serão anunciadas por e-mail aos titulares de contas com pelo menos trinta (30) dias de antecedência antes de entrarem em vigor. A versão mais recente está sempre disponível em [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Contato",
        "blocks": [
          {
            "kind": "p",
            "text": "Para qualquer dúvida sobre esta política ou seus dados — incluindo o exercício de qualquer um dos seus direitos sob o GDPR (consulte a seção 6) — escreva para [support@konvertools.com](mailto:support@konvertools.com). Este único endereço de e-mail é nosso ponto de contato para privacidade, segurança, faturamento e consultas gerais de suporte. Você também pode apresentar uma reclamação à autoridade francesa de proteção de dados CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) ou à autoridade de supervisão do seu país de residência."
          }
        ]
      }
    ]
  },
  "de": {
    "h1": "Datenschutzerklärung",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Zuletzt aktualisiert: %DATE% · Sofort gültig für alle Besucher und Kontoinhaber.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Unser Grundprinzip: Wir speichern Ihre Dateien nicht",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (der „Dienst“) wird als datenschutzfreundliches Toolkit betrieben. Die wichtigste Verpflichtung, die wir eingehen, lautet:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-only-Tools** (Bildkonverter, PDF-Tools, die pdf-lib nutzen, Audio- und Videokonvertierungen mit FFmpeg.wasm, Code-Tools, Rechner, QR-Generatoren, der Passwort-Breach-Checker, die meisten Utilities) laufen **ausschließlich in Ihrem Webbrowser über WebAssembly**. Ihre Datei oder Eingabe wird niemals an unsere Server übertragen. Wir haben keine technischen Mittel, um sie zu lesen.",
              "**Servergestützte Tools** (KI-Transkription, KI-Übersetzung, KI-Textaufgaben, Einbrennen von Videountertiteln, der URL-Scanner, der Phishing-Detektor, der SSL-Zertifikatsprüfer und einige andere) müssen etwas an ein Backend senden. In jedem Fall wird die Datei oder der Text in Echtzeit verarbeitet und innerhalb von dreißig (30) Minuten aus dem temporären Speicher gelöscht.",
              "Wir speichern niemals den Inhalt einer hochgeladenen Datei an einem persistenten Ort, wir nutzen Ihre Uploads nicht zur Schulung von KI-Modellen und wir verkaufen, vermieten oder teilen sie nicht mit Dritten für einen anderen Zweck als die Bereitstellung des von Ihnen angeforderten Ergebnisses."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Verantwortlicher für die Datenverarbeitung",
        "blocks": [
          {
            "kind": "p",
            "text": "Für die Zwecke der EU-Datenschutz-Grundverordnung (Verordnung (EU) 2016/679, „GDPR“) ist der Verantwortliche für die Datenverarbeitung der Herausgeber des Dienstes. Kontakt für Datenschutzanfragen: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Welche Daten wir erheben",
        "blocks": [
          {
            "kind": "p",
            "text": "Die einzigen personenbezogenen Daten, die wir in unserer Datenbank speichern, sind:"
          },
          {
            "kind": "ul",
            "items": [
              "**Kontoanmeldedaten**: Ihre E-Mail-Adresse; eine gesalzene, gehashte Kopie Ihres Passworts (verwaltet durch Supabase Auth – wir sehen oder speichern niemals das Klartextpasswort); optional Anzeigename und Avatar-URL, falls Sie sich mit Google anmelden.",
              "**Abonnementstatus**: aktueller Plan (kostenlos / Pro / Business), Stripe-Kundenkennung und die Daten Ihrer letzten Verlängerungen.",
              "**Nutzungskontingente**: aggregierte Kontingentzähler (z. B. „3 KI-Läufe heute genutzt“, „420 monatliche KI-Läufe genutzt“), die in Ihrem Profil aktualisiert werden. Wir führen **keine pro-Lauf-Protokolle**.",
              "**Job-Metadaten (vorübergehend)**: Wenn ein servergestütztes Tool ein Ergebnis erzeugt (z. B. eine .srt-Datei aus einer Transkription), speichern wir den Tool-Namen, die Download-URL des Ergebnisses, die Quellsprache und einen Abschlusszeitstempel. Diese Zeilen werden automatisch nach **zwei (2) Stunden** gelöscht. Sie enthalten niemals den Inhalt Ihrer Datei.",
              "**Einwilligungsprotokolle**: Datum und Uhrzeit, zu der Sie diese Nutzungsbedingungen und unsere Datenschutzerklärung akzeptiert haben, sowie ob Sie in Marketing-E-Mails eingewilligt haben. Werden für die Dauer Ihres Kontos plus einen rechtlichen Nachweiszeitraum von fünf (5) Jahren nach Löschung gespeichert."
            ]
          },
          {
            "kind": "p",
            "text": "Wir erheben **keine** Daten zu: Ihrer IP-Adresse (über den temporären Gebrauch hinaus, den Supabase und unser Hosting-Anbieter für Rate-Limiting und Sicherheitsprotokollierung machen), Ihrem Browser-Fingerprint, Verhaltens-Tracking-Ereignissen, Ihren Bildschirmaufnahmen oder biometrischen Daten."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Dateien, die Sie verarbeiten",
        "blocks": [
          {
            "kind": "p",
            "text": "Wie in Abschnitt 1 dargelegt, werden die Inhalte der von Ihnen verarbeiteten Dateien von uns niemals gespeichert. Der genaue Lebenszyklus ist:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-only-Tools**: keine Übertragung. Die Datei wird vom Browser in den Speicher gelesen, das Ergebnis wird lokal erzeugt und Sie laden es direkt herunter. Wir protokollieren nichts zur Datei selbst.",
              "**KI-Transkription / -Übersetzung / -OCR / Phishing-Analyse**: Die Datei oder der Text wird an unsere Supabase Edge Function gestreamt, die ihn sofort an den jeweiligen KI-Anbieter (siehe Abschnitt 7) zur Inferenz weiterleitet. Das Ergebnis wird an Sie zurückgegeben und der temporäre Upload-Puffer wird verworfen. Ergebnisdateien, die in unserem privaten Speicher-Bucket geschrieben werden, sind für sechzig (60) Minuten über signierte URLs zugänglich und werden innerhalb von dreißig (30) Minuten nach Erstellung physisch gelöscht.",
              "**Passwort-Breach-Checker**: Ihr Passwort verlässt niemals Ihren Browser. Wir hashen es lokal mit SHA-1 und fragen HaveIBeenPwned mit k-Anonymität ab – es werden nur die ersten 5 Zeichen des Hashs gesendet. Das Passwort und der vollständige Hash werden niemals übertragen.",
              "**URL-Scanner / SSL-Checker**: Es wird nur die von Ihnen eingegebene URL oder der Hostname übertragen (an Google Safe Browsing für den URL-Scanner oder zur Herstellung einer TLS-Verbindung für den SSL-Checker). Keine umliegenden Seitinhalte."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Rechtliche Grundlagen für die Verarbeitung (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Erfüllung eines Vertrags** (Art. 6(1)(b)) – Wenn Sie ein Konto erstellen und kostenpflichtige Funktionen nutzen, ist die Verarbeitung zur Erbringung des Dienstes erforderlich.",
              "**Berechtigtes Interesse** (Art. 6(1)(f)) – Betrugsprävention, Missbrauchsbekämpfung, grundlegende Sicherheitsprotokollierung und Verbesserung des Dienstes.",
              "**Einwilligung** (Art. 6(1)(a)) – Marketing-E-Mails, optionale Analysen oder Werbe-Cookies (falls aktiviert) sowie zukünftige optionale Integrationen.",
              "**Rechtliche Verpflichtung** (Art. 6(1)(c)) – Aufbewahrung von Rechnungsunterlagen gemäß französischer Steuergesetzgebung (in der Regel zehn Jahre)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Ihre Rechte gemäß GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Als betroffene Person gemäß Verordnung (EU) 2016/679 vom 27. April 2016 („GDPR“) stehen Ihnen folgende Rechte zu, die Sie jederzeit und kostenlos über die auf Ihrem Konto registrierte E-Mail-Adresse ausüben können:"
          },
          {
            "kind": "ul",
            "items": [
              "**Recht auf Auskunft** (GDPR Art. 15) – Bestätigung erhalten, dass wir Ihre Daten verarbeiten, und eine Kopie davon erhalten.",
              "**Recht auf Berichtigung** (GDPR Art. 16) – Ungenauigkeiten oder unvollständige Daten korrigieren lassen.",
              "**Recht auf Löschung / Recht auf Vergessenwerden** (GDPR Art. 17) – Ihre Daten löschen lassen, wenn die Rechtsgrundlage für die Verarbeitung nicht mehr besteht.",
              "**Recht auf Einschränkung der Verarbeitung** (GDPR Art. 18) – Verarbeitung vorübergehend einfrieren, während ein Streit geklärt wird.",
              "**Recht auf Datenübertragbarkeit** (GDPR Art. 20) – Ihre Daten in einem strukturierten, maschinenlesbaren Format erhalten.",
              "**Recht auf Widerspruch** (GDPR Art. 21) – Jederzeit aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch gegen die Verarbeitung einlegen, die auf unseren berechtigten Interessen beruht.",
              "**Recht auf Widerruf der Einwilligung** (GDPR Art. 7(3)) – Bei auf Einwilligung beruhender Verarbeitung die Einwilligung jederzeit widerrufen, ohne dass die Rechtmäßigkeit der vorherigen Verarbeitung beeinträchtigt wird.",
              "**Recht, keiner ausschließlich automatisierten Entscheidung unterworfen zu werden** (GDPR Art. 22) – Keine unserer Verarbeitungen umfasst ausschließlich automatisierte Entscheidungen mit rechtlicher Wirkung oder ähnlich erheblicher Auswirkung auf Sie."
            ]
          },
          {
            "kind": "p",
            "text": "Um eines dieser Rechte auszuüben, schreiben Sie an [support@konvertools.com](mailto:support@konvertools.com) von der auf Ihrem Konto registrierten Adresse. Wir antworten innerhalb von einem (1) Monat, wie in GDPR Art. 12(3) vorgeschrieben; bei besonders komplexen Anfragen kann sich die Frist um weitere zwei Monate verlängern, in diesem Fall werden wir Sie innerhalb des ersten Monats informieren."
          },
          {
            "kind": "p",
            "text": "Sie haben zudem das **Recht, sich an eine Aufsichtsbehörde zu wenden** (GDPR Art. 77). Für Nutzer in Frankreich ist dies die **Commission Nationale de l'Informatique et des Libertés (CNIL)** – 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Frankreich – Telefon +33 (0)1 53 73 22 22 – Online-Beschwerden unter [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Für Nutzer in anderen EU-/EWR-Mitgliedstaaten können Sie sich an Ihre **nationale Aufsichtsbehörde** wenden (die Liste wird vom Europäischen Datenschutzausschuss unter [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en) geführt). Sie können auch einen gerichtlichen Rechtsbehelf gemäß GDPR Art. 79 einlegen."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Auftragsverarbeiter",
        "blocks": [
          {
            "kind": "p",
            "text": "Für die Erbringung des Dienstes müssen wir streng begrenzte Daten mit den folgenden Auftragsverarbeitern teilen. Jeder hat seine eigene Datenschutzerklärung, die regelt, wie sie die von uns erhaltenen Daten behandeln."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (in Singapur gegründet, für unser Projekt in der EU gehostet) – Authentifizierung, Datenbank, Dateispeicher und Edge Functions. Erhält Ihre Kontoanmeldedaten, Profildaten und (vorübergehend) jede Datei, die Sie für ein servergestütztes Tool hochladen. Agiert als unser Unterauftragsverarbeiter.",
              "**Mistral AI** (Frankreich) – Inferenz mit großen Sprachmodellen für Übersetzung, Umformulierung, Zusammenfassung, den KI-Humanizer, Phishing-Musteranalyse und andere Textaufgaben; Audio-Transkription (Voxtral); Bild-OCR und Vision-Aufgaben (Pixtral). Der von Ihnen übermittelte Text oder das Bild wird an Mistral zur Inferenz gesendet. Mistral hat vertraglich zugesichert, **keine API-Eingaben** zur Schulung seiner Modelle zu nutzen.",
              "**Google Safe Browsing** (Google LLC, USA) – nur bei Nutzung des URL-Scanners oder des Phishing-Detektors. Es werden nur die von Ihnen übermittelten URLs (oder aus der von Ihnen eingefügten E-Mail extrahierten Links) übertragen. Dies ist der einzige von uns genutzte Drittanbieter-Sicherheitsdienst.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) – nur bei Nutzung des Passwort-Breach-Checkers und nur die ersten 5 Zeichen des SHA-1-Hashs Ihres Passworts (k-Anonymität). Abgefragt direkt aus Ihrem Browser, nicht über unsere Server.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irland) – Zahlungsabwicklung und Abonnement-Abrechnung. Wir **sehen oder speichern niemals** Ihre Kartendaten. Stripe erhält Ihre E-Mail-Adresse, Zahlungsmethode, Rechnungsadresse und den von Ihnen gekauften Plan.",
              "**Resend** (USA) – Zustellung transaktionaler E-Mails (Kontobestätigung, Zahlungsbestätigung, Passwortzurücksetzung). Erhält Ihre E-Mail-Adresse und den von uns gesendeten E-Mail-Inhalt.",
              "**Vercel** (USA) – Content Delivery Network für statische Seiten. Erhält Standard-Web-Traffic-Metadaten (IP, User-Agent, angeforderte URL) zur Routing- und Missbrauchsprävention. Gemäß der Protokollierungsrichtlinie von Vercel gespeichert."
            ]
          },
          {
            "kind": "p",
            "text": "Falls einer dieser Auftragsverarbeiter außerhalb des Europäischen Wirtschaftsraums tätig ist, unterliegen die Datenübermittlungen den Standardvertragsklauseln (SCC) der Europäischen Kommission oder einem gleichwertigen Übermittlungsmechanismus."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies und ähnliche Technologien",
        "blocks": [
          {
            "kind": "p",
            "text": "Wir nutzen nur die folgenden Cookies und Local-Storage-Elemente:"
          },
          {
            "kind": "ul",
            "items": [
              "**Notwendig**: NEXT_LOCALE (speichert Ihre gewählte Sprache) und Supabase-Sitzungscookies (sb-*-auth-token) bei angemeldeten Nutzern. Diese erfordern keine Einwilligung gemäß GDPR.",
              "**Optional Werbung**: Falls wir Werbepartner aktivieren (derzeit ist Ezoic in unserem Code referenziert, aber noch nicht für Ihren Traffic aktiviert), zeigen wir einen klaren Einwilligungsbanner an und setzen Werbe-Cookies erst nach Ihrer Zustimmung."
            ]
          },
          {
            "kind": "p",
            "text": "Wir führen derzeit keine Analysen, Tracking-Pixel oder Remarketing-Tags durch. Falls wir welche hinzufügen, wird der oben genannte Cookie-Banner sie steuern."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Sicherheit der Verarbeitung (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "Gemäß GDPR Art. 32 setzen wir angemessene technische und organisatorische Maßnahmen ein, um ein dem Risiko angemessenes Sicherheitsniveau zu gewährleisten:"
          },
          {
            "kind": "ul",
            "items": [
              "**Verschlüsselung während der Übertragung** – Der gesamte Datenverkehr zum und vom Dienst ist durch TLS 1.2 oder höher geschützt.",
              "**Verschlüsselung im Ruhezustand** – Supabase verschlüsselt die zugrundeliegende Datenbank (einschließlich Ihrer Kontodaten) mit AES-256.",
              "**Passworthandhabung** – Ihr Passwort wird von Supabase Auth gehasht und niemals im Klartext gespeichert. Zusätzlich prüfen wir neue Passwörter clientseitig mit der HaveIBeenPwned-k-Anonymität-API, um bekannte kompromittierte Passwörter abzulehnen.",
              "**Zahlungsdaten** – Werden von uns weder gesehen noch gespeichert; der Kartenzahlungsvorgang wird vollständig an Stripe delegiert (PCI-DSS Level 1-konform).",
              "**Zugangskontrolle** – Row-Level-Sicherheitspolitiken verhindern, dass ein Nutzer Daten eines anderen Nutzers liest; Service-Rollen-Schlüssel sind auf Edge Functions beschränkt.",
              "**Dateihygiene** – Keine hochgeladene Datei wird jemals gespeichert: Browser-only-Tools übertragen nichts, und servergestützte Tools löschen temporäre Puffer innerhalb von 30 Minuten.",
              "**Verwundbarkeitsreaktion** – Sicherheitsprobleme können vertraulich an [support@konvertools.com](mailto:support@konvertools.com) gemeldet werden."
            ]
          },
          {
            "kind": "p",
            "text": "Trotz dieser Maßnahmen ist kein System perfekt sicher; Sie akzeptieren das verbleibende Risiko, das mit jedem Onlinedienst einhergeht."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Datensparsamkeit und Zweckbindung (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "Gemäß GDPR Art. 5(1)(c) erheben wir nur die Daten, die für die in dieser Erklärung genannten Zwecke strikt erforderlich sind. Konkret: Wir erheben keine IP-Adresse über flüchtige Routing-Protokolle hinaus, wir fingerprinten Ihren Browser nicht, wir führen keine Verhaltensanalysen durch und wir nutzen niemals eine von Ihnen verarbeitete Datei zur Schulung von KI-Modellen. Wir erheben keine besonderen Kategorien von Daten (Art. 9) oder Daten zu strafbaren Handlungen (Art. 10). Die Daten werden korrekt und aktuell gehalten (Art. 5(1)(d)); Sie können Ungenauigkeiten jederzeit über Ihr Dashboard oder durch Kontakt mit [support@konvertools.com](mailto:support@konvertools.com) korrigieren."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Aufbewahrung",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profildaten: Werden während der Existenz Ihres Kontos gespeichert und innerhalb von dreißig (30) Tagen nach Kontoschließung gelöscht.",
              "Job-Metadaten: Werden automatisch nach zwei (2) Stunden gelöscht.",
              "Ergebnisdateien im Speicher-Bucket: Werden innerhalb von dreißig (30) Minuten nach Erstellung physisch gelöscht.",
              "Abrechnungsunterlagen: Werden zehn (10) Jahre lang aufbewahrt, um französischen Steuerpflichten zu entsprechen.",
              "Einwilligungsprotokolle: Werden für die Dauer Ihres Kontos plus fünf (5) Jahre danach als rechtlicher Nachweis gespeichert."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Minderjährige",
        "blocks": [
          {
            "kind": "p",
            "text": "Der Dienst richtet sich **nicht an Kinder unter sechzehn (16) Jahren**. Wenn Sie jünger sind, dürfen Sie kein Konto erstellen. Wir sammeln keine Daten von Minderjährigen; falls wir davon Kenntnis erlangen, löschen wir diese."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Änderungen dieser Erklärung",
        "blocks": [
          {
            "kind": "p",
            "text": "Wir können diese Datenschutzerklärung von Zeit zu Zeit anpassen. Wesentliche Änderungen werden mindestens dreißig (30) Tage vor ihrem Inkrafttreten per E-Mail an Kontoinhaber angekündigt. Die jeweils aktuelle Version ist stets unter [https://konvertools.com/privacy](https://konvertools.com/privacy) verfügbar."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "Bei Fragen zu dieser Erklärung oder Ihren Daten – einschließlich der Ausübung Ihrer GDPR-Rechte (siehe Abschnitt 6) – schreiben Sie an [support@konvertools.com](mailto:support@konvertools.com). Diese einzige E-Mail-Adresse ist unser Ansprechpartner für Datenschutz-, Sicherheits-, Abrechnungs- und allgemeine Support-Anfragen. Sie können sich auch an die französische Datenschutzbehörde CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 – [www.cnil.fr](https://www.cnil.fr)) oder an die Aufsichtsbehörde Ihres Wohnsitzlandes wenden."
          }
        ]
      }
    ]
  },
  "it": {
    "h1": "Informativa sulla privacy",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ultimo aggiornamento: %DATE% · Efficace immediatamente per tutti i visitatori e gli utenti registrati.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Il nostro principio fondamentale: non conserviamo i tuoi file",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (il \"Servizio\") viene gestito come una suite di strumenti incentrata sulla privacy. L'impegno più importante che assumiamo è questo:"
          },
          {
            "kind": "ul",
            "items": [
              "**Strumenti esclusivamente lato browser** (convertitori di immagini, strumenti PDF che utilizzano pdf-lib, conversioni audio e video tramite FFmpeg.wasm, strumenti per il codice, calcolatrici, generatori di codici QR, il controllo delle violazioni delle password, la maggior parte delle utility) vengono eseguiti **completamente all'interno del tuo browser web tramite WebAssembly**. Il file o l'input non vengono mai trasmessi ai nostri server. Non abbiamo mezzi tecnici per leggerli.",
              "**Strumenti assistiti dal server** (trascrizione AI, traduzione AI, attività testuali AI, sottotitoli video incisi, lo scanner di URL, il rilevatore di phishing, il controllo dei certificati SSL e un piccolo numero di altri) necessitano di inviare qualcosa a un backend. In ogni caso, il file o il testo viene elaborato in tempo reale e cancellato dall'archiviazione temporanea entro trenta (30) minuti.",
              "Non conserviamo mai il contenuto di alcun file caricato in una posizione persistente, non utilizziamo i tuoi upload per addestrare modelli AI e non li vendiamo, affittiamo o condividiamo con terze parti per alcun fine diverso dalla consegna del risultato da te richiesto."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Titolare del trattamento dei dati",
        "blocks": [
          {
            "kind": "p",
            "text": "Ai fini del Regolamento generale sulla protezione dei dati dell'UE (Regolamento (UE) 2016/679, \"GDPR\"), il titolare del trattamento dei dati è l'editore del Servizio. Contatto per qualsiasi richiesta in materia di privacy: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Dati che raccogliamo",
        "blocks": [
          {
            "kind": "p",
            "text": "I soli dati personali che persistono nel nostro database sono:"
          },
          {
            "kind": "ul",
            "items": [
              "**Credenziali dell'account**: il tuo indirizzo email; una copia salata e hashata della password (gestita da Supabase Auth — non vediamo né memorizziamo mai il testo in chiaro); nome visualizzato e URL dell'avatar opzionali se ti registri con Google.",
              "**Stato dell'abbonamento**: piano attuale (gratuito / Pro / Business), identificatore cliente Stripe e le date dei tuoi rinnovi più recenti.",
              "**Contatori di utilizzo**: contatori aggregati di quota (ad esempio, \"3 esecuzioni AI utilizzate oggi\", \"420 esecuzioni AI mensili utilizzate\") aggiornati direttamente sulla tua riga del profilo. **Non registriamo** record per ogni esecuzione.",
              "**Metadati delle attività (transitori)**: quando uno strumento assistito dal server produce un output (ad esempio un file .srt dalla trascrizione), registriamo il nome dello strumento, l'URL di download del risultato, la lingua di origine e un timestamp di completamento. Queste righe vengono eliminate automaticamente dopo **due (2) ore**. Non contengono mai il contenuto dei tuoi file.",
              "**Registri del consenso**: la data e l'ora in cui hai accettato questi Termini e la nostra Informativa sulla privacy, e se hai scelto di ricevere email di marketing. Conservati per la durata del tuo account più un periodo di prova legale di cinque (5) anni dopo la cancellazione."
            ]
          },
          {
            "kind": "p",
            "text": "**Non raccogliamo**: il tuo indirizzo IP (oltre all'uso temporaneo che Supabase e il nostro provider di hosting ne fanno per il rate-limiting e la registrazione di sicurezza), l'impronta digitale del browser, eventi di tracciamento comportamentale, le tue registrazioni dello schermo o qualsiasi dato biometrico."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. File che elabori",
        "blocks": [
          {
            "kind": "p",
            "text": "Come indicato nella sezione 1, il contenuto dei file che elabori non viene mai conservato da noi. Il ciclo di vita preciso è:"
          },
          {
            "kind": "ul",
            "items": [
              "**Strumenti esclusivamente lato browser**: nessuna trasmissione. Il file viene letto in memoria dal tuo browser, il risultato viene prodotto localmente e lo scarichi direttamente. Non registriamo nulla riguardo al file stesso.",
              "**Trascrizione / traduzione / OCR / analisi phishing AI**: il file o il testo viene trasmesso in streaming a una nostra Edge Function di Supabase, che lo inoltra immediatamente al provider AI pertinente (vedi sezione 7) per l'inferenza. Il risultato viene restituito a te e il buffer di caricamento temporaneo viene scartato. I file di risultato scritti nel nostro bucket di archiviazione privato sono accessibili tramite URL firmato per sessanta (60) minuti e fisicamente eliminati entro trenta (30) minuti dalla generazione.",
              "**Controllo delle violazioni delle password**: la password non lascia mai il tuo browser. La hashiamo localmente con SHA-1 e interroghiamo HaveIBeenPwned utilizzando la k-anonimità — vengono inviati solo i primi 5 caratteri dell'hash. La password e l'hash completo non vengono mai trasmessi.",
              "**Scanner di URL / controllo SSL**: viene trasmesso solo l'URL o il nome host che digiti (a Google Safe Browsing per lo scanner di URL, o utilizzato per aprire una connessione TLS live per il controllo SSL). Nessun contenuto della pagina circostante."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Basi giuridiche del trattamento (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Esecuzione di un contratto** (Art. 6(1)(b)) — quando crei un account e utilizzi funzionalità a pagamento, il trattamento è necessario per erogare il Servizio.",
              "**Interessi legittimi** (Art. 6(1)(f)) — prevenzione delle frodi, mitigazione degli abusi, registrazione di base della sicurezza e miglioramento del Servizio.",
              "**Consenso** (Art. 6(1)(a)) — email di marketing, cookie facoltativi per l'analisi o la pubblicità (se e quando abilitati) e qualsiasi futura integrazione facoltativa.",
              "**Obbligo legale** (Art. 6(1)(c)) — conservazione dei registri contabili come richiesto dalla legge fiscale francese (tipicamente dieci anni)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. I tuoi diritti ai sensi del GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "In qualità di interessato ai sensi del Regolamento (UE) 2016/679 del 27 aprile 2016 (il \"GDPR\"), godi dei seguenti diritti, esercitabili in qualsiasi momento e gratuitamente dall'indirizzo email registrato sul tuo account:"
          },
          {
            "kind": "ul",
            "items": [
              "**Diritto di accesso** (GDPR Art. 15) — ottenere conferma che trattiamo i tuoi dati e una copia degli stessi.",
              "**Diritto di rettifica** (GDPR Art. 16) — far correggere dati inaccurati o incompleti.",
              "**Diritto all'oblio / diritto alla cancellazione** (GDPR Art. 17) — far cancellare i tuoi dati quando le basi giuridiche del trattamento non sono più applicabili.",
              "**Diritto di limitazione del trattamento** (GDPR Art. 18) — sospendere temporaneamente il trattamento durante la risoluzione di una controversia.",
              "**Diritto alla portabilità dei dati** (GDPR Art. 20) — ricevere i tuoi dati in un formato strutturato, leggibile meccanicamente.",
              "**Diritto di opposizione** (GDPR Art. 21) — opporsi in qualsiasi momento, per motivi legati alla tua situazione particolare, al trattamento basato su nostri interessi legittimi.",
              "**Diritto di revoca del consenso** (GDPR Art. 7(3)) — per i trattamenti basati sul consenso, revocarlo in qualsiasi momento senza pregiudicare la liceità dei trattamenti precedenti.",
              "**Diritto a non essere sottoposto a decisioni automatizzate** (GDPR Art. 22) — nessuno dei nostri trattamenti prevede decisioni automatizzate che producano effetti giuridici su di te."
            ]
          },
          {
            "kind": "p",
            "text": "Per esercitare uno di questi diritti, scrivi a [support@konvertools.com](mailto:support@konvertools.com) dall'indirizzo registrato sul tuo account. Risponderemo entro un (1) mese, come richiesto dal GDPR Art. 12(3); il periodo può essere esteso di ulteriori due mesi per richieste particolarmente complesse, nel qual caso ti informeremo entro il primo mese."
          },
          {
            "kind": "p",
            "text": "Hai anche il **diritto di presentare reclamo a un'autorità di controllo** (GDPR Art. 77). Per gli utenti residenti in Francia, questa è la **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Francia — telefono +33 (0)1 53 73 22 22 — reclami online su [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Per gli utenti residenti in altri Stati membri UE/SEE, puoi presentare reclamo alla tua **autorità nazionale di controllo** (l'elenco è mantenuto dal Comitato europeo per la protezione dei dati su [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Puoi anche ricorrere a un rimedio giudiziario ai sensi del GDPR Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Responsabili del trattamento di terze parti",
        "blocks": [
          {
            "kind": "p",
            "text": "Per erogare il Servizio, dobbiamo condividere dati strettamente limitati con i seguenti responsabili del trattamento. Ognuno di essi ha una propria informativa sulla privacy che disciplina come gestisce i dati che riceve da noi."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (società costituita a Singapore, ospitata nell'UE per il nostro progetto) — autenticazione, database, archiviazione file e Edge Functions. Riceve le tue credenziali dell'account, i dati del profilo e (transitoriamente) qualsiasi file che carichi per uno strumento assistito dal server. Agisce come nostro sub-responsabile del trattamento.",
              "**Mistral AI** (Francia) — inferenza di modelli linguistici di grandi dimensioni per traduzione, riformulazione, sintesi, l'umanizzazione AI, analisi dei pattern di phishing e altre attività testuali; trascrizione audio (Voxtral); OCR e attività di visione delle immagini (Pixtral). Il testo o l'immagine che invii vengono inviati a Mistral per l'inferenza. Mistral si è impegnata contrattualmente a **non utilizzare gli input dell'API** per addestrare i propri modelli.",
              "**Google Safe Browsing** (Google LLC, USA) — solo quando utilizzi lo Scanner di URL o il Rilevatore di Phishing. Vengono trasmessi solo gli URL che inserisci (o i link estratti dall'email che incolli). Questo è l'unico servizio di sicurezza di terze parti che utilizziamo.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — solo quando utilizzi il Controllo delle violazioni delle password e solo i primi 5 caratteri dell'hash SHA-1 della password (k-anonimità). Interrogato direttamente dal tuo browser, non tramite i nostri server.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irlanda) — elaborazione dei pagamenti e fatturazione degli abbonamenti. **Non vediamo né memorizziamo** mai i dettagli della tua carta. Stripe riceve il tuo indirizzo email, il metodo di pagamento, l'indirizzo di fatturazione e il piano acquistato.",
              "**Resend** (USA) — consegna di email transazionali (conferma dell'account, ricevute di pagamento, reset della password). Riceve il tuo indirizzo email e il corpo dell'email che inviamo.",
              "**Vercel** (USA) — content delivery network per le pagine statiche. Riceve metadati standard del traffico web (IP, user-agent, URL richiesto) per l'instradamento e la prevenzione degli abusi. Conservati in conformità con la politica di conservazione dei log di Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Laddove uno di questi responsabili del trattamento operi al di fuori dello Spazio Economico Europeo, i trasferimenti sono disciplinati dalle Clausole Contrattuali Standard (SCCs) della Commissione europea o da un meccanismo di trasferimento equivalente."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookie e tecnologie simili",
        "blocks": [
          {
            "kind": "p",
            "text": "Utilizziamo solo i seguenti cookie e elementi di archiviazione locale:"
          },
          {
            "kind": "ul",
            "items": [
              "**Essenziali**: NEXT_LOCALE (ricorda la lingua scelta), e i cookie di sessione Supabase (sb-*-auth-token) quando sei registrato. Questi non richiedono il consenso ai sensi del GDPR.",
              "**Pubblicità facoltativa**: se e quando abilitiamo partner pubblicitari (attualmente Ezoic è referenziato nel nostro codice ma non ancora attivato per il tuo traffico), mostreremo un banner di consenso chiaro e imposteremo cookie pubblicitari solo dopo che avrai scelto di acconsentire."
            ]
          },
          {
            "kind": "p",
            "text": "Attualmente non utilizziamo analisi, pixel di tracciamento o tag di remarketing. Se ne aggiungiamo, il banner dei cookie sopra li bloccherà."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Sicurezza del trattamento (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "In conformità con il GDPR Art. 32, implementiamo misure tecniche e organizzative appropriate per garantire un livello di sicurezza adeguato al rischio:"
          },
          {
            "kind": "ul",
            "items": [
              "**Cifratura in transito** — tutto il traffico verso e dal Servizio è protetto da TLS 1.2 o versioni successive.",
              "**Cifratura a riposo** — Supabase cifra il database sottostante (inclusi i dati del tuo account) con AES-256.",
              "**Gestione delle password** — la password viene hashata da Supabase Auth e non viene mai memorizzata in chiaro. Controlliamo inoltre le nuove password tramite l'API client-side di HaveIBeenPwned con k-anonimità per rifiutare password note per essere state violate.",
              "**Dati di pagamento** — non vengono mai visti né memorizzati da noi; il flusso di pagamento della carta è completamente delegato a Stripe (conforme PCI-DSS Livello 1).",
              "**Controllo degli accessi** — le politiche di sicurezza a livello di riga impediscono a un utente di leggere i dati di un altro utente; le chiavi del ruolo di servizio sono limitate alle Edge Functions.",
              "**Igiene dei file** — nessun file caricato viene mai conservato: gli strumenti esclusivamente lato browser non trasmettono nulla, e gli strumenti assistiti dal server eliminano i buffer temporanei entro 30 minuti.",
              "**Risposta alle vulnerabilità** — problemi di sicurezza possono essere segnalati in via riservata a [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Nonostante queste misure, nessun sistema è perfettamente sicuro; accetti il rischio residuo insito in qualsiasi servizio online."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Minimizzazione dei dati e limitazione delle finalità (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "In conformità con il GDPR Art. 5(1)(c), raccogliamo solo i dati strettamente necessari per gli scopi indicati nella presente Informativa. In concreto: non raccogliamo il tuo indirizzo IP oltre ai log di instradamento effimeri, non tracciamo l'impronta digitale del tuo browser, non eseguiamo analisi comportamentali e non utilizziamo mai alcun file che elabori per addestrare modelli AI. Non raccogliamo dati di categoria speciale (Art. 9) né dati relativi a reati penali (Art. 10). I dati sono mantenuti accurati e aggiornati (Art. 5(1)(d)); puoi correggere eventuali inesattezze in qualsiasi momento tramite la tua dashboard o contattando [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Conservazione",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dati del profilo: conservati per tutta la durata del tuo account, eliminati entro trenta (30) giorni dalla chiusura dell'account.",
              "Metadati delle attività: eliminati automaticamente dopo due (2) ore.",
              "File di risultato nel bucket di archiviazione: eliminati fisicamente entro trenta (30) minuti dalla generazione.",
              "Registri contabili: conservati per dieci (10) anni per conformarsi agli obblighi fiscali francesi.",
              "Registri del consenso: conservati per la durata del tuo account più cinque (5) anni successivi come prova legale."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Minori",
        "blocks": [
          {
            "kind": "p",
            "text": "Il Servizio **non è rivolto a bambini sotto i sedici (16) anni**. Se hai meno di quell'età non devi creare un account. Non raccogliamo consapevolmente dati da minori; se veniamo a conoscenza di averlo fatto, li elimineremo."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Modifiche alla presente informativa",
        "blocks": [
          {
            "kind": "p",
            "text": "Possiamo modificare la presente Informativa sulla privacy di volta in volta. Modifiche sostanziali verranno annunciate tramite email agli utenti registrati almeno trenta (30) giorni prima della loro entrata in vigore. La versione più recente è sempre disponibile su [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Contatti",
        "blocks": [
          {
            "kind": "p",
            "text": "Per qualsiasi domanda su questa informativa o sui tuoi dati — inclusi l'esercizio di uno qualsiasi dei tuoi diritti GDPR (vedi sezione 6) — scrivi a [support@konvertools.com](mailto:support@konvertools.com). Questo indirizzo email è il nostro unico punto di contatto per richieste di privacy, sicurezza, fatturazione e supporto generale. Puoi anche presentare un reclamo all'autorità francese per la protezione dei dati CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) o all'autorità di controllo del tuo paese di residenza."
          }
        ]
      }
    ]
  },
  "nl": {
    "h1": "Privacybeleid",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Laatst bijgewerkt: %DATE% · Direct van toepassing voor alle bezoekers en accounthouders.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Ons kernprincipe: we houden uw bestanden niet vast",
        "blocks": [
          {
            "kind": "p",
            "text": "De [Konvertools](de \"Service\") wordt geëxploiteerd als een privacy-first toolkit. De belangrijkste belofte die we maken is deze:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-only tools** (afbeeldingsconverters, PDF-tools die gebruikmaken van pdf-lib, audio- en videoconversies aangedreven door FFmpeg.wasm, code-tools, rekenmachines, QR-generators, de wachtwoordbreukcontrole, de meeste utilities) voeren **volledig binnen uw webbrowser uit via WebAssembly**. Uw bestand of invoer wordt nooit naar onze servers verzonden. We hebben geen technische middelen om het te lezen.",
              "**Server-assisted tools** (AI-transcriptie, AI-vertaling, AI-teksttaken, inbrandvideo-ondertiteling, de URL-scanner, de phishingdetector, de SSL-certificaatcontrole en een klein aantal andere) moeten iets naar een backend sturen. In elk geval wordt het bestand of de tekst in realtime verwerkt en binnen dertig (30) minuten verwijderd uit tijdelijke opslag.",
              "We slaan de inhoud van geen enkel geüpload bestand op in een persistente locatie, we gebruiken uw uploads nooit om AI-modellen te trainen en we verkopen, verhuren of delen ze nooit met derden voor enig ander doel dan het leveren van het resultaat dat u heeft aangevraagd."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Gegevensverwerkingsverantwoordelijke",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor de doeleinden van de Algemene verordening gegevensbescherming van de EU (Verordening (EU) 2016/679, \"GDPR\"), is de gegevensverwerkingsverantwoordelijke de uitgever van de Service. Contact voor elke privacyvraag: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Wat we verzamelen",
        "blocks": [
          {
            "kind": "p",
            "text": "De enige persoonsgegevens die we in onze database opslaan zijn:"
          },
          {
            "kind": "ul",
            "items": [
              "**Accountgegevens**: uw e-mailadres; een gezouten, gehashte kopie van uw wachtwoord (beheerd door Supabase Auth — we zien of slaan het plaintext nooit op); optionele weergavenaam en avatar-URL als u inlogt met Google.",
              "**Abonnementstatus**: huidig abonnement (gratis / Pro / Business), Stripe-klantidentificator en de data van uw meest recente verlengingen.",
              "**Gebruikscounters**: geaggregeerde quota-tellers (bijv. \"3 AI-runs gebruikt vandaag\", \"420 AI-runs gebruikt deze maand\") die op uw profielrij worden bijgewerkt. We loggen **geen per-run records**.",
              "**Jobmetadata (tijdelijk)**: wanneer een server-assisted tool een uitvoer produceert (bijv. een .srt-bestand van transcriptie), registreren we de naam van de tool, de download-URL van het resultaat, de brontaal en een voltooingstijdstempel. Deze rijen worden automatisch verwijderd na **twee (2) uur**. Ze bevatten nooit de inhoud van uw bestand.",
              "**Toestemmingsrecords**: de datum en tijd waarop u deze voorwaarden en ons Privacybeleid heeft geaccepteerd, en of u heeft ingestemd met marketing-e-mails. Blijven bewaard voor de duur van uw account plus een wettelijk bewijsperiode van vijf (5) jaar na verwijdering."
            ]
          },
          {
            "kind": "p",
            "text": "We verzamelen **niet**: uw IP-adres (behalve het tijdelijke gebruik dat Supabase en onze hostingprovider ervan maken voor rate-limiting en beveiligingslogging), uw browserfingerprint, gedragsmatige trackinggebeurtenissen, uw schermopnames of enige biometrische gegevens."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Bestanden die u verwerkt",
        "blocks": [
          {
            "kind": "p",
            "text": "Zoals vermeld in sectie 1 worden de inhoud van bestanden die u verwerkt nooit door ons opgeslagen. De precieze levenscyclus is:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-only tools**: nul transmissie. Het bestand wordt door uw browser in het geheugen gelezen, het resultaat wordt lokaal geproduceerd en u downloadt het rechtstreeks. We loggen niets over het bestand zelf.",
              "**AI-transcriptie / vertaling / OCR / phishinganalyse**: het bestand of de tekst wordt gestreamd naar onze Supabase Edge Function, die het direct doorstuurt naar de relevante AI-aanbieder (zie sectie 7) voor inferentie. Het resultaat wordt aan u teruggegeven en de tijdelijke uploadbuffer wordt verwijderd. Resultaatsbestanden die naar onze private opslagbucket worden geschreven, zijn toegankelijk via een ondertekende URL gedurende zestig (60) minuten en fysiek verwijderd binnen dertig (30) minuten na generatie.",
              "**Wachtwoordbreukcontrole**: uw wachtwoord verlaat nooit uw browser. We hashen het lokaal met SHA-1 en vragen HaveIBeenPwned op via k-anonimiteit — alleen de eerste 5 tekens van de hash worden verzonden. Het wachtwoord en de volledige hash worden nooit verzonden.",
              "**URL-scanner / SSL-controle**: alleen de URL of hostnaam die u typt wordt verzonden (naar Google Safe Browsing voor de URL-scanner, of gebruikt om een live TLS-verbinding te openen voor de SSL-controle). Geen omringende pagina-inhoud."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Wettelijke grondslagen voor verwerking (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Uitvoering van een overeenkomst** (Art. 6(1)(b)) — wanneer u een account aanmaakt en betaalde functies gebruikt, is verwerking noodzakelijk om de Service te leveren.",
              "**Legitieme belangen** (Art. 6(1)(f)) — fraudepreventie, misbruikmitigatie, basisbeveiligingslogging en verbetering van de Service.",
              "**Toestemming** (Art. 6(1)(a)) — marketing-e-mails, optionele analytics- of advertentiecookies (indien en wanneer ingeschakeld) en elke toekomstige optionele integratie.",
              "**Wettelijke verplichting** (Art. 6(1)(c)) — bewaring van factuurgegevens zoals vereist door Franse belastingwetgeving (doorgaans tien jaar)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Uw rechten op grond van de GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Als gegevenssubject onder Verordening (EU) 2016/679 van 27 april 2016 (de \"GDPR\") heeft u de volgende rechten, die op elk moment en kosteloos kunnen worden uitgeoefend vanaf het e-mailadres geregistreerd op uw account:"
          },
          {
            "kind": "ul",
            "items": [
              "**Recht op inzage** (GDPR Art. 15) — verkrijg bevestiging dat we uw gegevens verwerken en een kopie ervan.",
              "**Recht op rectificatie** (GDPR Art. 16) — laat onnauwkeurige of onvolledige gegevens corrigeren.",
              "**Recht op wissen / recht om vergeten te worden** (GDPR Art. 17) — laat uw gegevens verwijderen wanneer de wettelijke grondslag voor verwerking niet langer van toepassing is.",
              "**Recht op beperking van de verwerking** (GDPR Art. 18) — tijdelijk bevriezen van verwerking terwijl een geschil wordt opgelost.",
              "**Recht op gegevensoverdraagbaarheid** (GDPR Art. 20) — ontvang uw gegevens in een gestructureerd, machine-leesbaar formaat.",
              "**Recht op verzet** (GDPR Art. 21) — verzet u op elk moment, op grond van uw specifieke situatie, tegen verwerking op basis van onze legitieme belangen.",
              "**Recht op intrekking van toestemming** (GDPR Art. 7(3)) — voor verwerking op basis van toestemming, intrek deze op elk moment zonder dat de rechtmatigheid van eerdere verwerking wordt aangetast.",
              "**Recht niet onderworpen te worden aan geautomatiseerde besluitvorming** (GDPR Art. 22) — geen van onze verwerkingen omvat besluitvorming die uitsluitend op automatisering berust en juridische effecten heeft voor u."
            ]
          },
          {
            "kind": "p",
            "text": "Om een van deze rechten uit te oefenen, schrijft u naar [support@konvertools.com](mailto:support@konvertools.com) vanaf het adres geregistreerd op uw account. We reageren binnen één (1) maand, zoals vereist door GDPR Art. 12(3); de termijn kan met twee maanden worden verlengd voor bijzonder complexe verzoeken, in welk geval we u binnen de eerste maand hiervan op de hoogte stellen."
          },
          {
            "kind": "p",
            "text": "U heeft ook het **recht om een klacht in te dienen bij een toezichthoudende autoriteit** (GDPR Art. 77). Voor gebruikers in Frankrijk is dit de **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Frankrijk — telefoon +33 (0)1 53 73 22 22 — online klachten op [www.cnil.fr/fr/plaintes](https://www.cnil.fr/fr/plaintes). Voor gebruikers in andere EU/EEA-lidstaten kunt u een klacht indienen bij uw **nationale toezichthoudende autoriteit** (de lijst wordt bijgehouden door de European Data Protection Board op [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_fr)). U kunt ook een gerechtelijke voorziening zoeken op grond van GDPR Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Derde-partijverwerkers",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor het leveren van de Service delen we strikt beperkte gegevens met de volgende verwerkers. Elke partij heeft zijn eigen privacybeleid dat bepaalt hoe ze de gegevens die ze van ons ontvangen, behandelen."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (in Singapore gevestigd, in de EU gehost voor ons project) — authenticatie, database, bestandsopslag en Edge Functions. Ontvangt uw accountgegevens, profielgegevens en (tijdelijk) elk bestand dat u uploadt voor een server-assisted tool. Fungeert als onze subverwerker.",
              "**Mistral AI** (Frankrijk) — inferentie met grote-taalmodellen voor vertaling, herformulering, samenvatting, de AI-humaniser, phishingpatroonanalyse en andere teksttaken; audio-transcriptie (Voxtral); afbeeldings-OCR en Vision-taken (Pixtral). De tekst of afbeelding die u indient wordt naar Mistral verzonden voor inferentie. Mistral heeft contractueel toegezegd **geen** API-inputs te gebruiken om zijn modellen te trainen.",
              "**Google Safe Browsing** (Google LLC, VS) — alleen wanneer u de URL-scanner of de phishingdetector gebruikt. Alleen de URLs die u indient (of links die uit de e-mail worden geëxtraheerd die u plakt) worden verzonden. Dit is de enige derde-partijbeveiligingsservice die we gebruiken.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — alleen wanneer u de wachtwoordbreukcontrole gebruikt, en alleen de eerste 5 tekens van de SHA-1-hash van uw wachtwoord (k-anonimiteit). Rechtstreeks vanuit uw browser opgevraagd, niet via onze servers.",
              "**Stripe** (Stripe Payments Europe, Ltd., Ierland) — verwerking van betalingen en abonnementsfacturering. We **zien of slaan uw kaartgegevens nooit op**. Stripe ontvangt uw e-mailadres, betaalmethode, factuuradres en het abonnement dat u heeft gekocht.",
              "**Resend** (VS) — transactie-e-mailbezorging (accountbevestiging, betalingsbewijs, wachtwoordreset). Ontvangt uw e-mailadres en de e-mailinhoud die we verzenden.",
              "**Vercel** (VS) — content delivery network voor statische pagina's. Ontvangt standaard webverkeer-metadata (IP, user-agent, aangevraagde URL) voor routering en misbruikpreventie. Blijft in lijn met het logboekretentiebeleid van Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Wanneer een van deze verwerkers buiten de Europese Economische Ruimte opereert, worden overdrachten gereguleerd door de Standard Contractual Clauses (SCCs) van de Europese Commissie of een gelijkwaardig overdrachtsmechanisme."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies en soortgelijke technologieën",
        "blocks": [
          {
            "kind": "p",
            "text": "We gebruiken alleen de volgende cookies en lokale opslagitems:"
          },
          {
            "kind": "ul",
            "items": [
              "**Essentieel**: NEXT_LOCALE (onthoudt uw gekozen taal) en Supabase-sessiecookies (sb-*-auth-token) wanneer u bent ingelogd. Deze vereisen geen toestemming op grond van de GDPR.",
              "**Optioneel voor advertenties**: indien en wanneer we advertentiepartners inschakelen (momenteel wordt Ezoic in onze code genoemd maar nog niet geactiveerd voor uw verkeer), zullen we een duidelijke toestemmingsbanner weergeven en alleen advertentiecookies instellen nadat u heeft ingestemd."
            ]
          },
          {
            "kind": "p",
            "text": "We voeren momenteel geen analytics, trackingpixels of remarketingtags uit. Als we er een toevoegen, zal de cookie-banner hierboven deze afschermen."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Beveiliging van verwerking (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "In overeenstemming met GDPR Art. 32 implementeren we passende technische en organisatorische maatregelen om een beveiligingsniveau te waarborgen dat geschikt is voor het risico:"
          },
          {
            "kind": "ul",
            "items": [
              "**Versleuteling in transit** — al het verkeer naar en van de Service is beschermd door TLS 1.2 of hoger.",
              "**Versleuteling bij rust** — Supabase versleutelt de onderliggende database (inclusief uw accountgegevens) met AES-256.",
              "**Wachtwoordafhandeling** — uw wachtwoord wordt gehashd door Supabase Auth en nooit in plaintext opgeslagen. We controleren nieuwe wachtwoorden bovendien client-side tegen de HaveIBeenPwned k-anonimiteit-API om bekende gelekte wachtwoorden te weigeren.",
              "**Betaalgegevens** — nooit door ons gezien of opgeslagen; de betaalstroom voor kaarten is volledig uitbesteed aan Stripe (PCI-DSS Level 1-compliant).",
              "**Toegangscontrole** — row-level security-beleid voorkomt dat een gebruiker gegevens van een andere gebruiker kan lezen; service-rolsleutels zijn beperkt tot Edge Functions.",
              "**Bestandshygiëne** — geen geüpload bestand wordt ooit bewaard: browser-only tools verzenden nooit iets, en server-assisted tools verwijderen tijdelijke buffers binnen 30 minuten.",
              "**Vulnerabiliteitsreactie** — beveiligingsproblemen kunnen vertrouwelijk worden gemeld naar [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Ondanks deze maatregelen is geen enkel systeem perfect veilig; u accepteert het resterende risico dat inherent is aan elke online service."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Gegevensminimalisatie en doelbeperking (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "In overeenstemming met GDPR Art. 5(1)(c) verzamelen we alleen de gegevens die strikt noodzakelijk zijn voor de doeleinden uiteengezet in dit beleid. Concreet: we verzamelen uw IP-adres niet verder dan ephemere routeringslogs, we fingerprinten uw browser niet, we voeren geen gedragsmatige analytics uit en we gebruiken nooit een bestand dat u verwerkt om AI-modellen te trainen. We verzamelen geen bijzondere-categoriegegevens (Art. 9) of gegevens met betrekking tot strafbare feiten (Art. 10). Gegevens worden nauwkeurig en up-to-date gehouden (Art. 5(1)(d)); u kunt elke onnauwkeurigheid op elk moment corrigeren via uw dashboard of door contact op te nemen met [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Retentie",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profielgegevens: bewaard zolang uw account bestaat, verwijderd binnen dertig (30) dagen na sluiting van het account.",
              "Jobmetadata: automatisch verwijderd na twee (2) uur.",
              "Resultaatsbestanden in de opslagbucket: fysiek verwijderd binnen dertig (30) minuten na generatie.",
              "Factuurgegevens: bewaard gedurende tien (10) jaar om te voldoen aan Franse belastingverplichtingen.",
              "Toestemmingsrecords: bewaard voor de duur van uw account plus vijf (5) jaar daarna als wettelijk bewijs."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Minderjarigen",
        "blocks": [
          {
            "kind": "p",
            "text": "De Service is **niet gericht op kinderen onder de zestien (16) jaar**. Als u jonger bent, mag u geen account aanmaken. We verzamelen niet bewust gegevens van minderjarigen; als we ervan op de hoogte worden gesteld dat we dat wel hebben gedaan, zullen we ze verwijderen."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Wijzigingen in dit beleid",
        "blocks": [
          {
            "kind": "p",
            "text": "We kunnen dit Privacybeleid van tijd tot tijd wijzigen. Substantiële wijzigingen worden per e-mail aan accounthouders aangekondigd ten minste dertig (30) dagen voordat ze van kracht worden. De meest recente versie is altijd beschikbaar op [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Contact",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor elke vraag over dit beleid of uw gegevens — inclusief het uitoefenen van een van uw GDPR-rechten (zie sectie 6) — schrijft u naar [support@konvertools.com](mailto:support@konvertools.com). Dit enkele postvak is ons contactpunt voor privacy-, beveiligings-, facturerings- en algemene ondersteuningsverzoeken. U kunt ook een klacht indienen bij de Franse gegevensbeschermingsautoriteit CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) of bij de toezichthoudende autoriteit van uw woonland."
          }
        ]
      }
    ]
  },
  "ja": {
    "h1": "プライバシーポリシー",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最終更新日: %DATE% · 直ちにすべての訪問者およびアカウント保持者に対して効力を発します。",
    "sections": [
      {
        "id": "principle",
        "title": "1. 当社の基本原則：お客様のファイルは保持しません",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools（以下「サービス」）は、プライバシーを最優先とするツールキットとして運営されています。当社が最も重視するコミットメントは次のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**ブラウザ内ツール** (画像変換、pdf-libを使用したPDFツール、FFmpeg.wasmによるオーディオ・ビデオ変換、コードツール、計算機、QRコード生成、パスワード流出チェッカー、ほとんどのユーティリティ) は、**WebAssemblyを介してお客様のウェブブラウザ内で完全に実行されます**。ファイルや入力内容は当社のサーバーに送信されることはありません。当社にはそれを読み取る技術的手段はありません。",
              "**サーバー支援ツール** (AI文字起こし、AI翻訳、AIテキスト処理、ビデオ字幕焼き込み、URLスキャナー、フィッシング検出器、SSL証明書チェッカーなどの一部ツール) では、バックエンドに何らかのデータを送信する必要があります。いずれの場合も、ファイルやテキストはリアルタイムで処理され、一時的なストレージから30分以内に削除されます。",
              "当社は、アップロードされたファイルの内容を永続的な場所に保存することはなく、アップロードされたファイルをAIモデルのトレーニングに使用することも、販売、賃貸、第三者との共有をすることもありません。また、リクエストされた結果をお届けする目的を除き、第三者と共有することもありません。"
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. データ管理者",
        "blocks": [
          {
            "kind": "p",
            "text": "EU一般データ保護規則（規則（EU）2016/679、「GDPR」）の目的上、データ管理者はサービスの発行者です。プライバシーに関するお問い合わせ先：[support@konvertools.com](mailto:support@konvertools.com)。"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 当社が収集するデータ",
        "blocks": [
          {
            "kind": "p",
            "text": "当社がデータベースに永続的に保持する個人データは次のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**アカウント資格情報**：メールアドレス。パスワードのソルト化・ハッシュ化されたコピー（Supabase Authによって管理され、当社は平文を閲覧または保存することはありません）。Googleでサインインする場合は、任意の表示名とアバターURL。",
              "**サブスクリプション状態**：現在のプラン（無料 / Pro / Business）、Stripeの顧客識別子、および直近の更新日。",
              "**使用カウンター**：集約された割り当てカウンター（例：「本日AI実行3回使用」、「月間AI実行420回使用」）は、プロファイル行上で更新されます。当社は**実行ごとの記録はログに残しません**。",
              "**ジョブメタデータ（一時的）**：サーバー支援ツールで出力（例：文字起こしによる.srtファイル）が生成された場合、ツール名、結果ダウンロードURL、ソース言語、完了時刻を記録します。これらの行は**2時間**後に自動的に消去されます。ファイルの内容は含まれません。",
              "**同意記録**：当社の利用規約およびプライバシーポリシーを受諾した日時、マーケティングメールのオプトインの有無。アカウント削除後5年間の法的証拠期間を含め、アカウントの存続期間中に保持されます。"
            ]
          },
          {
            "kind": "p",
            "text": "当社は以下を収集**しません**：IPアドレス（Supabaseおよび当社のホスティングプロバイダーがレート制限やセキュリティログのために一時的に使用するものを除く）、ブラウザフィンガープリント、行動追跡イベント、画面録画、生体認証データ。"
          }
        ]
      },
      {
        "id": "files",
        "title": "4. お客様が処理するファイル",
        "blocks": [
          {
            "kind": "p",
            "text": "第1項で述べたとおり、処理されるファイルの内容は当社によって永続的に保持されることはありません。正確なライフサイクルは次のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**ブラウザ内ツール**：送信なし。ファイルはブラウザによってメモリに読み込まれ、結果はローカルで生成され、直接ダウンロードされます。ファイル自体に関するログは記録されません。",
              "**AI文字起こし / 翻訳 / OCR / フィッシング分析**：ファイルまたはテキストは、当社のSupabase Edge Functionにストリーミングされ、直ちに関連するAIプロバイダー（第7項を参照）に転送されて推論が行われます。結果はお客様に返され、一時的なアップロードバッファーは30分以内に破棄されます。結果ファイルは、当社のプライベートストレージバケットに60分間署名付きURLでアクセス可能であり、生成から30分以内に物理的に消去されます。",
              "**パスワード流出チェッカー**：パスワードはブラウザから送信されることはありません。SHA-1でローカルにハッシュ化され、k-匿名性を用いてHaveIBeenPwnedに照会されます。ハッシュの先頭5文字のみが送信されます。パスワードおよび完全なハッシュは送信されません。",
              "**URLスキャナー / SSLチェッカー**：入力されたURLまたはホスト名のみが送信されます（URLスキャナーの場合はGoogle Safe Browsing、SSLチェッカーの場合はライブTLS接続を開くため）。周辺のページコンテンツは送信されません。"
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. 処理の法的根拠（GDPR Art. 6）",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**契約の履行**（Art. 6(1)(b)）—アカウントを作成し有料機能を使用する際、処理はサービスの提供に必要です。",
              "**正当な利益**（Art. 6(1)(f)）—不正防止、悪用軽減、基本的なセキュリティログ、サービスの改善。",
              "**同意**（Art. 6(1)(a)）—マーケティングメール、オプションの分析または広告Cookie（有効化された場合）、将来のオプション統合。",
              "**法的義務**（Art. 6(1)(c)）—フランスの税法（通常10年間）に基づく請求記録の保持。"
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. GDPRに基づくお客様の権利",
        "blocks": [
          {
            "kind": "p",
            "text": "2016年4月27日の規則（EU）2016/679（「GDPR」）に基づくデータ主体として、お客様は以下の権利を有しており、いつでも無料でアカウントに登録されたメールアドレスから行使できます。"
          },
          {
            "kind": "ul",
            "items": [
              "**アクセス権**（GDPR Art. 15）—当社がお客様のデータを処理していることの確認とそのコピーの取得。",
              "**訂正権**（GDPR Art. 16）—不正確または不完全なデータの訂正。",
              "**消去権 / 忘れられる権利**（GDPR Art. 17）—処理の法的根拠がなくなった場合にデータを削除する権利。",
              "**処理制限権**（GDPR Art. 18）—紛争が解決されるまで処理を一時的に停止する権利。",
              "**データポータビリティ権**（GDPR Art. 20）—構造化された機械可読形式でデータを受け取る権利。",
              "**異議申立権**（GDPR Art. 21）—正当な利益に基づく処理に対し、お客様の状況に関連する理由によりいつでも異議を申し立てる権利。",
              "**同意の撤回権**（GDPR Art. 7(3)）—同意に基づく処理について、同意をいつでも撤回できます。撤回は過去の処理の合法性に影響を与えません。",
              "**自動化された個別決定からの保護**（GDPR Art. 22）—当社の処理において、お客様に法的効果を及ぼす完全に自動化された決定は行われません。"
            ]
          },
          {
            "kind": "p",
            "text": "これらの権利を行使するには、アカウントに登録されたメールアドレスから [support@konvertools.com](mailto:support@konvertools.com) までご連絡ください。GDPR Art. 12(3)に基づき、1か月以内に回答します。特に複雑なリクエストの場合はさらに2か月延長されることがあり、その際は最初の1か月以内にご連絡いたします。"
          },
          {
            "kind": "p",
            "text": "また、**監督機関への苦情申立権**（GDPR Art. 77）も有しています。フランス在住の方は、**フランス国立情報・自由委員会（CNIL）**—3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, France—電話 +33 (0)1 53 73 22 22—オンライン苦情申立先 [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes) までご連絡ください。EU/EEA加盟国在住の方は、お住まいの国の**国家監督機関**（欧州データ保護委員会が [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en) で維持しているリストを参照）に苦情を申し立てることができます。また、GDPR Art. 79に基づく司法救済を求めることもできます。"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 第三者プロセッサ",
        "blocks": [
          {
            "kind": "p",
            "text": "サービスの提供には、以下のプロセッサとの厳格に制限されたデータ共有が必要です。各プロセッサは、当社から受け取ったデータを処理する方法を規定する独自のプライバシーポリシーを有しています。"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase**（シンガポール法人、当社プロジェクトではEU内でホスティング）—認証、データベース、ファイルストレージ、Edge Functions。アカウント資格情報、プロファイルデータ、およびサーバー支援ツールでアップロードされたファイル（一時的）を受け取ります。当社のサブプロセッサとして機能します。",
              "**Mistral AI**（フランス）—翻訳、言い換え、要約、AIヒューマナイザー、フィッシングパターン分析、その他テキストタスクのための大規模言語モデル推論。音声文字起こし（Voxtral）、画像OCRおよびVisionタスク（Pixtral）。送信されたテキストまたは画像はMistralに送られ推論が行われます。Mistralは契約上、API入力をモデルのトレーニングに使用しないことを約束しています。",
              "**Google Safe Browsing**（Google LLC、米国）—URLスキャナーまたはフィッシング検出器を使用する場合のみ。送信されるのは入力されたURL（またはメールに貼り付けられたリンク）のみです。当社が使用する唯一の第三者セキュリティサービスです。",
              "**HaveIBeenPwned**（Have I Been Pwned LLC）—パスワード流出チェッカーを使用する場合のみ。SHA-1ハッシュの先頭5文字（k-匿名性）のみが送信されます。ブラウザから直接照会され、当社のサーバーを経由することはありません。",
              "**Stripe**（Stripe Payments Europe, Ltd., アイルランド）—決済処理およびサブスクリプション請求。当社は**カードの詳細を閲覧または保存することはありません**。Stripeはメールアドレス、支払い方法、請求先住所、購入したプランを受け取ります。",
              "**Resend**（米国）—トランザクションメール配信（アカウント確認、支払い領収書、パスワードリセット）。メールアドレスと当社が送信するメール本文を受け取ります。",
              "**Vercel**（米国）—静的ページのコンテンツデリバリーネットワーク。ルーティングおよび悪用防止のための標準的なウェブトラフィックメタデータ（IP、ユーザーエージェント、リクエストURL）を受け取ります。Vercelのログ保持ポリシーに従って保持されます。"
            ]
          },
          {
            "kind": "p",
            "text": "これらのプロセッサのうち、EU経済領域外で運営されるものは、欧州委員会の標準契約条項（SCCs）または同等の移転メカニズムによって移転が規制されています。"
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookieおよび類似技術",
        "blocks": [
          {
            "kind": "p",
            "text": "当社は以下のCookieおよびローカルストレージアイテムのみを使用します。"
          },
          {
            "kind": "ul",
            "items": [
              "**必須**：NEXT_LOCALE（選択した言語を記憶）、サインイン時にSupabaseセッションCookie（sb-*-auth-token）。これらはGDPR上、同意を必要としません。",
              "**オプション広告**：広告パートナー（現在コード内でEzoicが参照されていますが、お客様のトラフィックではまだ有効化されていません）を有効化する場合、明確な同意バナーを表示し、オプトイン後にのみ広告Cookieを設定します。"
            ]
          },
          {
            "kind": "p",
            "text": "当社は現在、分析、トラッキングピクセル、リマーケティングタグを実行していません。今後追加する場合は、上記のCookieバナーで制御します。"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. 処理のセキュリティ（GDPR Art. 32）",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Art. 32に従い、リスクに応じた適切な技術的および組織的対策を実施しています。"
          },
          {
            "kind": "ul",
            "items": [
              "**転送時の暗号化**—サービスとのすべてのトラフィックはTLS 1.2以上で保護されています。",
              "**保存時の暗号化**—Supabaseは、データベース（アカウントデータを含む）をAES-256で暗号化します。",
              "**パスワード処理**—パスワードはSupabase Authによってハッシュ化され、平文で保存されることはありません。また、新しいパスワードはクライアントサイドでHaveIBeenPwnedのk-匿名性APIを照会し、既知の流出パスワードを拒否します。",
              "**支払いデータ**—当社は閲覧または保存することはありません。カード決済フローは完全にStripeに委任されており（PCI-DSSレベル1に準拠）、当社は関与しません。",
              "**アクセス制御**—行レベルのセキュリティポリシーにより、ユーザーは他のユーザーのデータを読み取ることができません。サービスロールキーはEdge Functionsに制限されています。",
              "**ファイルの衛生管理**—アップロードされたファイルは決して保持されません。ブラウザ内ツールは何も送信せず、サーバー支援ツールは一時バッファーを30分以内に削除します。",
              "**脆弱性対応**—セキュリティ上の問題は [support@konvertools.com](mailto:support@konvertools.com) まで機密で報告できます。"
            ]
          },
          {
            "kind": "p",
            "text": "これらの対策にもかかわらず、完全に安全なシステムは存在しません。お客様はオンラインサービスに固有の残存リスクを受け入れるものとします。"
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. データ最小化および目的制限（GDPR Art. 5）",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Art. 5(1)(c)に従い、当社は本ポリシーに記載された目的のために厳格に必要なデータのみを収集します。具体的には、IPアドレスを一時的なルーティングログを超えて収集せず、ブラウザのフィンガープリントを行わず、行動分析を実行せず、処理されたファイルをAIモデルのトレーニングに使用することもありません。特別なカテゴリのデータ（Art. 9）または犯罪に関連するデータ（Art. 10）は収集しません。データは正確かつ最新の状態に保たれ（Art. 5(1)(d)）、不正確な場合はダッシュボードまたは [support@konvertools.com](mailto:support@konvertools.com) までご連絡いただくことでいつでも修正できます。"
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. 保持期間",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "プロファイルデータ：アカウントが存在する間保持され、アカウント削除から30日以内に削除されます。",
              "ジョブメタデータ：2時間後に自動的に消去されます。",
              "ストレージバケット内の結果ファイル：生成から30分以内に物理的に削除されます。",
              "請求記録：フランスの税務義務を果たすために10年間保持されます。",
              "同意記録：アカウントの存続期間中およびその後5年間、法的証拠として保持されます。"
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. 未成年者",
        "blocks": [
          {
            "kind": "p",
            "text": "当社のサービスは**16歳未満のお子様を対象としていません**。16歳未満の方はアカウントを作成できません。当社は未成年者からのデータを故意に収集することはありません。万が一収集した場合は、削除いたします。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. 本ポリシーの変更",
        "blocks": [
          {
            "kind": "p",
            "text": "当社は本プライバシーポリシーを随時改定する場合があります。実質的な変更については、有効日の少なくとも30日前にアカウント保持者にメールで通知します。最新版は常に [https://konvertools.com/privacy](https://konvertools.com/privacy) でご覧いただけます。"
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. お問い合わせ",
        "blocks": [
          {
            "kind": "p",
            "text": "本ポリシーまたはお客様のデータに関するご質問（第6項のGDPR権利の行使を含む）については、[support@konvertools.com](mailto:support@konvertools.com) までご連絡ください。このメールボックスは、プライバシー、セキュリティ、請求、および一般的なサポートに関するお問い合わせ窓口です。また、フランスのデータ保護当局CNIL（3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)）または居住国の監督機関に苦情を申し立てることもできます。"
          }
        ]
      }
    ]
  },
  "zh": {
    "h1": "隐私政策",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最后更新：%DATE% · 自即日起对所有访客和账户持有人生效。",
    "sections": [
      {
        "id": "principle",
        "title": "1. 我们的核心原则：我们不保留您的文件",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools（以下称“服务”）作为一款以隐私为先的工具包运营。我们做出的最重要承诺如下："
          },
          {
            "kind": "ul",
            "items": [
              "**仅在浏览器中运行的工具**（图像转换器、使用 pdf-lib 的 PDF 工具、由 FFmpeg.wasm 驱动的音频和视频转换、代码工具、计算器、二维码生成器、密码泄露检查器、大多数实用工具）**完全在您的网络浏览器中通过 WebAssembly 执行**。您的文件或输入永远不会传输到我们的服务器。我们无法读取它，也不具备技术手段。",
              "**服务器辅助工具**（AI 转录、AI 翻译、AI 文本任务、视频字幕烧录、URL 扫描器、钓鱼检测器、SSL 证书检查器及其他少数工具）需要将某些内容发送到后端。在所有情况下，文件或文本均实时处理并在三十（30）分钟内从临时存储中删除。",
              "我们永远不会将任何上传文件的内容存储在任何持久位置，永远不会使用您的上传内容训练 AI 模型，也永远不会出于任何目的（除为您提供所请求的结果外）将其出售、出租或与第三方共享。"
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. 数据控制者",
        "blocks": [
          {
            "kind": "p",
            "text": "根据《欧盟通用数据保护条例》（第(EU) 2016/679号条例，“GDPR”），数据控制者为服务的发布者。如有任何隐私咨询，请联系：[support@konvertools.com](mailto:support@konvertools.com)。"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 我们收集的数据",
        "blocks": [
          {
            "kind": "p",
            "text": "我们在数据库中持久保存的唯一个人数据包括："
          },
          {
            "kind": "ul",
            "items": [
              "**账户凭据**：您的电子邮件地址；加盐哈希后的密码副本（由 Supabase Auth 管理——我们永远不会看到或存储明文密码）；如您使用 Google 登录，可选择显示名称和头像 URL。",
              "**订阅状态**：当前套餐（免费/Pro/Business）、Stripe 客户标识符以及您最近续费的日期。",
              "**使用计数器**：聚合配额计数器（如“今日已使用 3 次 AI 功能”、“本月已使用 420 次 AI 功能”），在您的个人资料行中就地更新。我们**不会**记录每次运行的详细记录。",
              "**作业元数据（临时）**：当服务器辅助工具生成输出（如转录生成的 .srt 文件）时，我们会记录工具名称、结果下载 URL、源语言及完成时间戳。这些记录会在**两（2）小时**后自动清除。它们永远不会包含您文件的内容。",
              "**同意记录**：您接受本条款及隐私政策的日期和时间，以及是否选择接收营销邮件。这些记录在您的账户存在期间及账户删除后五（5）年内保留，作为法律证据。"
            ]
          },
          {
            "kind": "p",
            "text": "我们**不会**收集：您的 IP 地址（仅在 Supabase 和我们的托管提供商为限速和安全日志临时使用）、浏览器指纹、行为跟踪事件、屏幕录制内容或任何生物识别数据。"
          }
        ]
      },
      {
        "id": "files",
        "title": "4. 您处理的文件",
        "blocks": [
          {
            "kind": "p",
            "text": "如第 1 节所述，您处理的文件内容永远不会被我们持久保存。具体生命周期如下："
          },
          {
            "kind": "ul",
            "items": [
              "**仅在浏览器中运行的工具**：零传输。文件由您的浏览器读入内存，结果在本地生成，您直接下载。我们不记录关于该文件本身的任何日志。",
              "**AI 转录/翻译/OCR/钓鱼分析**：文件或文本会流式传输至我们的 Supabase Edge Function，该函数会立即将其转发至相关 AI 提供商（见第 7 节）进行推理。结果返回给您后，临时上传缓冲区被丢弃。写入我们私有存储桶的结果文件会生成签名 URL，供您在六十（60）分钟内访问，并在生成后三十（30）分钟内物理清除。",
              "**密码泄露检查器**：您的密码永远不会离开浏览器。我们在本地使用 SHA-1 对其进行哈希处理，并通过 k-匿名性向 HaveIBeenPwned 查询——仅发送哈希的前 5 个字符。密码和完整哈希永远不会被传输。",
              "**URL 扫描器/SSL 检查器**：仅传输您输入的 URL 或主机名（URL 扫描器传输至 Google Safe Browsing，SSL 检查器用于建立 TLS 连接）。不包含周围页面内容。"
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. 处理的法律依据（GDPR Art. 6）",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**合同履行**（Art. 6(1)(b)）——当您创建账户并使用付费功能时，处理是履行合同所必需的。",
              "**合法利益**（Art. 6(1)(f)）——欺诈预防、滥用缓解、基本安全日志记录及服务改进。",
              "**同意**（Art. 6(1)(a)）——营销邮件、可选分析或广告 Cookie（如启用）以及任何未来可选集成。",
              "**法律义务**（Art. 6(1)(c)）——根据法国税法要求保留账单记录（通常为十年）。"
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. 您在 GDPR 下的权利",
        "blocks": [
          {
            "kind": "p",
            "text": "作为《欧盟通用数据保护条例（第(EU) 2016/679号条例）》第 27 条规定的数据主体，您享有以下权利，可随时免费通过账户注册的电子邮件地址行使："
          },
          {
            "kind": "ul",
            "items": [
              "**访问权**（GDPR Art. 15）——获取我们处理您数据的确认及其副本。",
              "**更正权**（GDPR Art. 16）——更正不准确或不完整的数据。",
              "**删除权/被遗忘权**（GDPR Art. 17）——在处理法律依据不再适用时删除您的数据。",
              "**限制处理权**（GDPR Art. 18）——在争议解决期间暂时冻结处理。",
              "**可携权**（GDPR Art. 20）——以结构化、机器可读格式接收您的数据。",
              "**异议权**（GDPR Art. 21）——基于您的特殊情况，随时对基于合法利益的处理提出异议。",
              "**撤回同意权**（GDPR Art. 7(3)）——对于基于同意的处理，可随时撤回，且不影响先前处理的合法性。",
              "**不接受自动决策权**（GDPR Art. 22）——我们的处理中不涉及仅基于自动化决策对您产生法律效果的情况。"
            ]
          },
          {
            "kind": "p",
            "text": "要行使上述任何权利，请从账户注册的地址发送邮件至 [support@konvertools.com](mailto:support@konvertools.com)。我们将在一个（1）月内响应，符合 GDPR Art. 12(3)的要求；对于特别复杂的请求，可延长两个月，届时我们将在首月内通知您。"
          },
          {
            "kind": "p",
            "text": "您还享有**向监管机构投诉的权利**（GDPR Art. 77）。对于法国用户，监管机构为**法国信息自由委员会（CNIL）**——地址：3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, 法国——电话：+33 (0)1 53 73 22 22——在线投诉：[www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes)。对于其他欧盟/欧洲经济区成员国用户，您可向**所在国的国家监管机构**投诉（欧洲数据保护委员会在 [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en) 维护名单）。您还可根据 GDPR Art. 79 寻求司法救济。"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 第三方处理者",
        "blocks": [
          {
            "kind": "p",
            "text": "提供服务需要我们与以下处理者共享严格限定的数据。每个处理者均有自己的隐私政策，规定其如何处理从我们这里接收的数据。"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase**（新加坡注册，在欧盟为我们的项目提供托管）——身份验证、数据库、文件存储和 Edge Functions。接收您的账户凭据、个人资料数据及（临时）任何您上传用于服务器辅助工具的文件。作为我们的分包处理者。",
              "**Mistral AI**（法国）——大型语言模型推理，用于翻译、改写、摘要、AI 人性化、钓鱼模式分析及其他文本任务；音频转录（Voxtral）；图像 OCR 和视觉任务（Pixtral）。您提交的文本或图像会发送至 Mistral 进行推理。Mistral 已通过合同承诺**不会**将 API 输入用于训练其模型。",
              "**Google Safe Browsing**（Google LLC，美国）——仅在您使用 URL 扫描器或钓鱼检测器时。仅传输您提交的 URL（或从您粘贴的邮件中提取的链接）。这是我们唯一使用的第三方安全服务。",
              "**HaveIBeenPwned**（Have I Been Pwned LLC）——仅在您使用密码泄露检查器时，且仅发送密码 SHA-1 哈希的前 5 个字符（k-匿名性）。直接从您的浏览器查询，不通过我们的服务器。",
              "**Stripe**（Stripe Payments Europe, Ltd.，爱尔兰）——支付处理和订阅计费。我们**永远不会看到或存储**您的卡片详情。Stripe 接收您的电子邮件、支付方式、账单地址及您购买的套餐。",
              "**Resend**（美国）——交易邮件发送（账户确认、支付收据、密码重置）。接收您的电子邮件地址及我们发送的邮件正文。",
              "**Vercel**（美国）——静态页面的内容分发网络。接收标准网络流量元数据（IP、用户代理、请求 URL）用于路由和滥用预防。遵循 Vercel 的日志保留政策。"
            ]
          },
          {
            "kind": "p",
            "text": "如上述任何处理者位于欧洲经济区之外，数据传输受欧盟委员会《标准合同条款》（SCCs）或等效传输机制的约束。"
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookie 及类似技术",
        "blocks": [
          {
            "kind": "p",
            "text": "我们仅使用以下 Cookie 和本地存储项："
          },
          {
            "kind": "ul",
            "items": [
              "**必要 Cookie**：NEXT_LOCALE（记住您选择的语言）及登录时的 Supabase 会话 Cookie（sb-*-auth-token）。这些无需 GDPR 同意即可设置。",
              "**可选广告 Cookie**：如我们启用广告合作伙伴（当前代码中引用了 Ezoic，但尚未为您的流量激活），我们将显示明确的同意横幅，并在您选择同意后才设置广告 Cookie。"
            ]
          },
          {
            "kind": "p",
            "text": "我们目前不运行任何分析、跟踪像素或重定向标签。如添加任何此类功能，上述 Cookie 横幅将进行管控。"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. 处理安全性（GDPR Art. 32）",
        "blocks": [
          {
            "kind": "p",
            "text": "根据 GDPR Art. 32，我们实施适当的技术和组织措施，确保风险水平的安全性："
          },
          {
            "kind": "ul",
            "items": [
              "**传输加密**——所有往返服务的流量均受 TLS 1.2 或更高版本保护。",
              "**静态加密**——Supabase 使用 AES-256 加密底层数据库（包括您的账户数据）。",
              "**密码处理**——您的密码由 Supabase Auth 哈希处理，明文永远不会被存储。我们还会在客户端通过 HaveIBeenPwned k-匿名性 API 检查新密码，拒绝已知泄露的密码。",
              "**支付数据**——我们永远不会看到或存储；卡支付流程完全委托给 Stripe（PCI-DSS Level 1 合规）。",
              "**访问控制**——行级安全策略可防止用户读取他人数据；服务角色密钥仅限 Edge Functions 使用。",
              "**文件安全**——上传的文件永远不会被保留：仅在浏览器中运行的工具不传输任何内容，服务器辅助工具在 30 分钟内删除临时缓冲区。",
              "**漏洞响应**——安全问题可保密报告至 [support@konvertools.com](mailto:support@konvertools.com)。"
            ]
          },
          {
            "kind": "p",
            "text": "尽管采取了这些措施，没有系统是绝对安全的；您接受任何在线服务固有的剩余风险。"
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. 数据最小化与目的限制（GDPR Art. 5）",
        "blocks": [
          {
            "kind": "p",
            "text": "根据 GDPR Art. 5(1)(c)，我们仅收集本政策中规定目的所必需的数据。具体而言：我们不收集您的 IP 地址（仅用于临时路由日志），不指纹您的浏览器，不运行行为分析，也永远不会使用您处理的任何文件来训练 AI 模型。我们不收集特殊类别数据（Art. 9）或与刑事犯罪相关的数据（Art. 10）。数据保持准确和最新（Art. 5(1)(d)）；您可随时通过仪表板或联系 [support@konvertools.com](mailto:support@konvertools.com) 纠正任何不准确信息。"
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. 数据保留",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "个人资料数据：在账户存在期间保留，账户关闭后三十（30）天内删除。",
              "作业元数据：自动在两（2）小时后清除。",
              "存储桶中的结果文件：在生成后三十（30）分钟内物理删除。",
              "账单记录：为符合法国税务义务，保留十（10）年。",
              "同意记录：在账户存在期间及账户删除后五（5）年内作为法律证据保留。"
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. 未成年人",
        "blocks": [
          {
            "kind": "p",
            "text": "本服务**不针对十六（16）岁以下儿童**。如您未满该年龄，请勿创建账户。我们不会故意收集未成年人的数据；如发现此类情况，我们将删除相关数据。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. 本政策的变更",
        "blocks": [
          {
            "kind": "p",
            "text": "我们可能不时修改本隐私政策。重大变更将至少提前三十（30）天通过电子邮件通知账户持有者。最新版本始终可在 [https://konvertools.com/privacy](https://konvertools.com/privacy) 获取。"
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. 联系方式",
        "blocks": [
          {
            "kind": "p",
            "text": "如对本政策或您的数据有任何疑问——包括行使您的 GDPR 权利（见第 6 节）——请发送邮件至 [support@konvertools.com](mailto:support@konvertools.com)。此单一邮箱为我们的隐私、安全、计费和一般支持咨询的联系点。您还可向法国数据保护机构 CNIL（地址：3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —— [www.cnil.fr](https://www.cnil.fr)）或您居住国的监管机构投诉。"
          }
        ]
      }
    ]
  },
  "ko": {
    "h1": "개인정보 보호정책",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "마지막 업데이트: %DATE% · 모든 방문자와 계정 보유자에게 즉시 적용됩니다.",
    "sections": [
      {
        "id": "principle",
        "title": "1. 핵심 원칙: 귀하의 파일은 보관하지 않습니다",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools(이하 \"서비스\")는 프라이버시 우선 도구 키트로 운영됩니다. 우리가 가장 중요하게 약속하는 단 하나의 원칙은 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**브라우저 내 도구** (이미지 변환기, pdf-lib를 사용하는 PDF 도구, FFmpeg.wasm 기반 오디오/비디오 변환, 코드 도구, 계산기, QR 생성기, 비밀번호 유출 확인기, 대부분의 유틸리티)는 **웹어셈블리를 통해 웹 브라우저 내에서 완전히 실행**됩니다. 귀하의 파일이나 입력은 서버로 전송되지 않습니다. 우리는 이를 읽을 기술적 수단이 없습니다.",
              "**서버 지원 도구** (AI 음성 인식, AI 번역, AI 텍스트 작업, 비디오 자막 삽입, URL 스캐너, 피싱 감지기, SSL 인증서 확인기 및 기타 소수 도구)는 백엔드로 무언가를 전송해야 합니다. 모든 경우 파일이나 텍스트는 실시간으로 처리되며 임시 저장소에서 서른(30) 분 이내에 삭제됩니다.",
              "우리는 업로드된 파일의 내용을 어떤 영구적인 위치에도 저장하지 않으며, 귀하의 업로드를 AI 모델 학습에 사용하지 않으며, 요청하신 결과를 전달하는 목적 외에는 제3자에게 판매, 임대 또는 공유하지 않습니다."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. 데이터 관리자",
        "blocks": [
          {
            "kind": "p",
            "text": "EU 일반 데이터 보호 규정(GDPR, Regulation (EU) 2016/679)에 따라 데이터 관리자는 서비스 게시자입니다. 개인정보 관련 문의: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 수집하는 정보",
        "blocks": [
          {
            "kind": "p",
            "text": "데이터베이스에 영구적으로 저장하는 개인정보는 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**계정 인증 정보**: 이메일 주소; 암호화된 해시된 비밀번호 복사본(plaintext는 확인 불가하며 Supabase Auth에서 관리); Google 로그인 시 선택적 표시 이름 및 아바타 URL.",
              "**구독 상태**: 현재 플랜(무료 / Pro / Business), Stripe 고객 식별자, 가장 최근 갱신 일자.",
              "**사용량 카운터**: 집계된 할당량 카운터(예: \"오늘 AI 사용 3회\", \"월간 AI 사용 420회\")는 프로필 행에서 실시간으로 업데이트됩니다. **개별 실행 기록은 로그하지 않습니다**.",
              "**작업 메타데이터(일시적)**: 서버 지원 도구가 결과(예: 음성 인식으로 생성된 .srt 파일)를 생성할 경우 도구 이름, 결과 다운로드 URL, 소스 언어, 완료 타임스탬프를 기록합니다. 이러한 행은 **두(2) 시간 후 자동으로 삭제**됩니다. 파일 내용은 포함되지 않습니다.",
              "**동의 기록**: 본 약관과 개인정보 보호정책을 수락한 날짜 및 시각, 마케팅 이메일 수신 동의 여부. 계정 삭제 후 5년간 법적 증거 보존 기간 동안 보관됩니다."
            ]
          },
          {
            "kind": "p",
            "text": "다음은 **수집하지 않는 정보**입니다: IP 주소(요율 제한 및 보안 로깅을 위해 Supabase와 호스팅 제공업체가 일시적으로 사용하는 것 제외), 브라우저 핑거프린팅, 행동 추적 이벤트, 화면 녹화, 바이오메트릭 데이터."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. 처리하는 파일",
        "blocks": [
          {
            "kind": "p",
            "text": "1항에서 설명한 바와 같이 처리하는 파일의 내용은 영구적으로 보관되지 않습니다. 정확한 수명은 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**브라우저 내 도구**: 전송 없음. 파일이 브라우저에 메모리로 읽혀지고 결과가 로컬에서 생성되며 직접 다운로드됩니다. 파일 자체에 대한 로그는 남기지 않습니다.",
              "**AI 음성 인식 / 번역 / OCR / 피싱 분석**: 파일이나 텍스트가 Supabase Edge Function으로 스트리밍되어 관련 AI 제공업체(7항 참조)로 즉시 전달됩니다. 결과가 반환되고 임시 업로드 버퍼는 삭제됩니다. 개인 저장소 버킷에 작성된 결과 파일은 60분 동안 서명된 URL로 접근 가능하며 생성 후 30분 이내 물리적으로 삭제됩니다.",
              "**비밀번호 유출 확인기**: 비밀번호는 브라우저를 떠나지 않습니다. 로컬에서 SHA-1 해시로 처리하고 k-익명성을 사용하여 HaveIBeenPwned에 쿼리합니다. 해시의 처음 5자리만 전송됩니다. 비밀번호와 전체 해시는 전송되지 않습니다.",
              "**URL 스캐너 / SSL 확인기**: 입력한 URL 또는 호스트 이름만 전송됩니다(각각 Google Safe Browsing으로 URL 스캐너, TLS 연결을 위해 SSL 확인기). 주변 페이지 내용은 전송되지 않습니다."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. 처리 법적 근거(GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**계약 이행** (Art. 6(1)(b)) — 계정을 생성하고 유료 기능을 사용할 때 서비스를 제공하기 위해 처리가 필요합니다.",
              "**정당한 이익** (Art. 6(1)(f)) — 사기 방지, 남용 완화, 기본 보안 로깅, 서비스 개선.",
              "**동의** (Art. 6(1)(a)) — 마케팅 이메일, 선택적 분석 또는 광고 쿠키(사용 가능한 경우), 향후 선택적 통합.",
              "**법적 의무** (Art. 6(1)(c)) — 프랑스 세법(일반적으로 10년)에 따라 청구 기록 보관."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. GDPR 하의 귀하의 권리",
        "blocks": [
          {
            "kind": "p",
            "text": "2016년 4월 27일 Regulation (EU) 2016/679(GDPR)에 따라 귀하는 다음과 같은 권리를 보유하며, 언제든지 무료로 계정에 등록된 이메일 주소로 행사할 수 있습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**접근권** (GDPR Art. 15) — 데이터 처리를 확인하고 복사본을 받을 권리.",
              "**정정권** (GDPR Art. 16) — 부정확하거나 불완전한 데이터를 정정할 권리.",
              "**삭제권 / 잊힐 권리** (GDPR Art. 17) — 처리 근거가 더 이상 적용되지 않을 때 데이터를 삭제할 권리.",
              "**처리 제한권** (GDPR Art. 18) — 분쟁이 해결되는 동안 처리를 일시적으로 중단할 권리.",
              "**데이터 이관권** (GDPR Art. 20) — 구조화된 기계 판독 가능한 형식으로 데이터를 받을 권리.",
              "**이의권** (GDPR Art. 21) — 특정 상황에 근거하여 정당한 이익에 기반한 처리(Art. 6(1)(f))에 이의를 제기할 권리.",
              "**동의 철회권** (GDPR Art. 7(3)) — 동의에 기반한 처리(Art. 6(1)(a))의 경우 사전 처리의 적법성에 영향을 주지 않고 언제든지 동의를 철회할 권리.",
              "**자동화된 의사결정으로부터의 자유** (GDPR Art. 22) — 우리의 처리 중 어떤 것도 귀하에 대한 법적 효과를 초래하는 완전 자동화된 의사결정에 의존하지 않습니다."
            ]
          },
          {
            "kind": "p",
            "text": "이러한 권리를 행사하려면 계정에 등록된 주소로 [support@konvertools.com](mailto:support@konvertools.com)으로 문의하십시오. GDPR Art. 12(3)에 따라 1개월 이내에 응답하며, 특히 복잡한 요청의 경우 2개월까지 연장될 수 있으며 이 경우 첫 달 안에 귀하에게 통보합니다."
          },
          {
            "kind": "p",
            "text": "또한 **감독기관에 불만 제기권** (GDPR Art. 77)을 보유하고 있습니다. 프랑스 사용자의 경우 **프랑스 정보통신기술위원회(CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, France — 전화 +33 (0)1 53 73 22 22 — 온라인 불만 접수 [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). EU/EEA 회원국 사용자의 경우 **국가 감독기관**에 불만을 제기할 수 있습니다(유럽 데이터 보호위원회에서 [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)에서 목록을 관리합니다). 또한 GDPR Art. 79에 따라 사법적 구제를 요청할 수도 있습니다."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 제3자 처리자",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스 제공을 위해 다음과 같은 처리자와 엄격히 제한된 데이터를 공유해야 합니다. 각 처리자는 수신한 데이터 처리를 규율하는 자체 개인정보 보호정책을 보유하고 있습니다."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (싱가포르 법인, EU 내 호스팅) — 인증, 데이터베이스, 파일 저장소, Edge Functions. 계정 인증 정보, 프로필 데이터 및 서버 지원 도구용 파일(일시적)을 수신합니다. 우리의 하위 처리자로 활동합니다.",
              "**Mistral AI** (프랑스) — 번역, 재구성, 요약, AI 인간화, 피싱 패턴 분석 및 기타 텍스트 작업용 대형 언어 모델 추론; 오디오 음성 인식(Voxtral); 이미지 OCR 및 Vision 작업(Pixtral). 제출한 텍스트나 이미지가 추론용으로 전송됩니다. Mistral은 API 입력을 모델 학습에 **사용하지 않겠다는 계약을 체결**했습니다.",
              "**Google Safe Browsing** (Google LLC, 미국) — URL 스캐너 또는 피싱 감지기를 사용할 때만 전송됩니다. 제출한 URL(또는 이메일에 포함된 링크)만 전송됩니다. 이것이 우리가 사용하는 유일한 제3자 보안 서비스입니다.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — 비밀번호 유출 확인기를 사용할 때만 전송되며, 항상 비밀번호의 SHA-1 해시 처음 5자리( k-익명성)만 전송됩니다. 서버를 거치지 않고 브라우저에서 직접 쿼리됩니다.",
              "**Stripe** (Stripe Payments Europe, Ltd., 아일랜드) — 결제 처리 및 구독 청구. **카드 세부 정보는 확인하거나 저장하지 않습니다**. Stripe는 이메일, 결제 수단, 청구 주소, 구매한 플랜을 수신합니다.",
              "**Resend** (미국) — 트랜잭션 이메일 전달(계정 확인, 결제 영수증, 비밀번호 재설정). 이메일 주소와 우리가 보내는 이메일 본문을 수신합니다.",
              "**Vercel** (미국) — 정적 페이지용 콘텐츠 전달 네트워크. 라우팅 및 남용 방지를 위해 표준 웹 트래픽 메타데이터(IP, 사용자 에이전트, 요청 URL)를 수신합니다. Vercel의 로그 보관 정책에 따라 보관됩니다."
            ]
          },
          {
            "kind": "p",
            "text": "이러한 처리자 중 EU/EEA 외 지역에서 운영되는 경우 전송은 유럽 위원회의 표준 계약 클로즈(SCC) 또는 동등한 전송 메커니즘에 의해 규율됩니다."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. 쿠키 및 유사 기술",
        "blocks": [
          {
            "kind": "p",
            "text": "다음 쿠키 및 로컬 스토리지 항목만 사용합니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**필수**: NEXT_LOCALE(선택한 언어 기억), 로그인 시 Supabase 세션 쿠키(sb-*-auth-token). GDPR에 따라 동의가 필요하지 않습니다.",
              "**선택적 광고**: 광고 파트너(현재 코드에 Ezoic이 참조되어 있지만 아직 활성화되지 않음)를 사용할 경우 명확한 동의 배너를 표시하고 동의한 경우에만 광고 쿠키를 설정합니다."
            ]
          },
          {
            "kind": "p",
            "text": "현재 분석, 추적 픽셀 또는 재마케팅 태그는 실행하지 않습니다. 추가할 경우 위의 쿠키 배너에서 제어합니다."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. 처리 보안(GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Art. 32에 따라 위험 수준에 적합한 기술적 및 조직적 조치를 구현합니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**전송 중 암호화** — 서비스와의 모든 트래픽은 TLS 1.2 이상으로 보호됩니다.",
              "**저장 시 암호화** — Supabase는 데이터베이스(계정 데이터 포함)를 AES-256으로 암호화합니다.",
              "**비밀번호 처리** — 비밀번호는 Supabase Auth에 의해 해시 처리되며 평문으로 저장되지 않습니다. 또한 클라이언트 측에서 HaveIBeenPwned k-익명성 API를 확인하여 알려진 유출 비밀번호를 거부합니다.",
              "**결제 데이터** — 확인하거나 저장하지 않음; 카드 결제 흐름은 완전히 Stripe에 위임됩니다(PCI-DSS Level 1 준수).",
              "**접근 제어** — 행 수준 보안 정책으로 한 사용자가 다른 사용자의 데이터를 읽지 못하도록 하며 서비스 역할 키는 Edge Functions에만 제한됩니다.",
              "**파일 위생** — 업로드된 파일은 영구적으로 보관되지 않음: 브라우저 내 도구는 아무것도 전송하지 않으며 서버 지원 도구는 임시 버퍼를 30분 이내에 삭제합니다.",
              "**취약성 대응** — 보안 문제는 [support@konvertools.com](mailto:support@konvertools.com)으로 비밀리에 보고할 수 있습니다."
            ]
          },
          {
            "kind": "p",
            "text": "이러한 조치에도 불구하고 어떤 시스템도 완벽하게 안전하지 않으며, 모든 온라인 서비스에 내재된 잔존 위험을 수락합니다."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. 데이터 최소화 및 목적 제한(GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Art. 5(1)(c)에 따라 본 정책에 명시된 목적에 strictly 필요한 데이터만 수집합니다. 구체적으로: IP 주소는 일시적인 라우팅 로그 외에는 수집하지 않으며, 브라우저 핑거프린팅을 수행하지 않으며, 행동 분석을 실행하지 않으며, 처리하는 파일을 AI 모델 학습에 사용하지 않습니다. 특별 범주 데이터(Art. 9) 또는 형사 범죄 관련 데이터(Art. 10)를 수집하지 않습니다. 데이터는 정확하고 최신 상태로 유지됩니다(Art. 5(1)(d)); 언제든지 대시보드 또는 [support@konvertools.com](mailto:support@konvertools.com)으로 문의하여 오류를 정정할 수 있습니다."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. 보관 기간",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "프로필 데이터: 계정 존재 시 보관, 계정 삭제 후 서른(30)일 이내 삭제.",
              "작업 메타데이터: 자동으로 2시간 후 삭제.",
              "저장소 버킷의 결과 파일: 생성 후 30분 이내 물리적 삭제.",
              "청구 기록: 프랑스 세법 준수를 위해 10년간 보관.",
              "동의 기록: 계정 기간 동안 보관 후 5년간 법적 증거로 보관."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. 미성년자",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스는 **16세 미만의 아동**을 대상으로 하지 않습니다. 해당 연령 미만이라면 계정을 생성할 수 없습니다. 미성년자의 데이터를 알고 있거나 수집한 경우 즉시 삭제합니다."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. 정책 변경",
        "blocks": [
          {
            "kind": "p",
            "text": "본 개인정보 보호정책을 수시로 개정할 수 있습니다. 실질적인 변경 사항은 계정 보유자에게 30일 전에 이메일로 공지됩니다. 최신 버전은 항상 [https://konvertools.com/privacy](https://konvertools.com/privacy)에서 확인할 수 있습니다."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. 문의",
        "blocks": [
          {
            "kind": "p",
            "text": "본 정책 또는 귀하의 데이터에 대한 질문이 있는 경우 — 6항의 GDPR 권리 행사 포함 — [support@konvertools.com](mailto:support@konvertools.com)으로 문의하십시오. 이 단일 메일박스가 개인정보, 보안, 청구 및 일반 지원 문의에 대한 연락처입니다. 프랑스 데이터 보호 당국 CNIL(3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) 또는 거주 국가의 감독기관에 불만을 제기할 수도 있습니다."
          }
        ]
      }
    ]
  },
  "ar": {
    "h1": "سياسة الخصوصية",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "آخر تحديث: %DATE% · سارية المفعول فوراً لجميع الزوار وحاملي الحسابات.",
    "sections": [
      {
        "id": "principle",
        "title": "1. المبدأ الأساسي: نحن لا نحتفظ بملفاتك",
        "blocks": [
          {
            "kind": "p",
            "text": "يتم تشغيل خدمة **Konvertools** (المشار إليها بـ \"الخدمة\") كأداة خصوصية بامتياز. الالتزام الأهم الذي نلتزم به هو هذا:"
          },
          {
            "kind": "ul",
            "items": [
              "**أدوات تعمل فقط في المتصفح** (م converters الصور، أدوات PDF التي تستخدم pdf-lib، تحويلات الصوت والفيديو التي تعمل بواسطة FFmpeg.wasm، أدوات الترميز، الآلات الحاسبة، مولدات QR، فاحص اختراقات كلمات المرور، معظم الأدوات الأخرى) تعمل **كاملة داخل متصفحك عبر WebAssembly**. لم تتم مشاركة ملفك أو إدخالك مطلقاً مع خوادمنا. ليس لدينا أي وسيلة فنية لقراءته.",
              "**أدوات بمساعدة الخادم** (النسخ الصوتية بالذكاء الاصطناعي، الترجمة بالذكاء الاصطناعي، مهام النصوص بالذكاء الاصطناعي، إضافة ترجمات الفيديو، ماسح الروابط، كاشف التصيد، فاحص شهادة SSL وبعض الأدوات الأخرى) تحتاج إلى إرسال شيء إلى الخلفية. في كل حالة، تتم معالجة الملف أو النص في الوقت الفعلي ويتم حذفه من التخزين المؤقت خلال ثلاثين (30) دقيقة.",
              "لم نقم مطلقاً بتخزين محتوى أي ملف تم تحميله في أي موقع دائم، ولم نستخدم مطلقاً تحميلاتك لتدريب نماذج الذكاء الاصطناعي، ولم نبع أو نؤجر أو نشاركها مع أطراف ثالثة لأي غرض سوى تقديم النتيجة التي طلبتها."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. مسؤول البيانات",
        "blocks": [
          {
            "kind": "p",
            "text": "لأغراض لائحة الاتحاد الأوروبي العامة لحماية البيانات (Regulation (EU) 2016/679، \"GDPR\")، مسؤول البيانات هو الناشر للخدمة. للتواصل بشأن أي استفسار يتعلق بالخصوصية: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. البيانات التي نجمعها",
        "blocks": [
          {
            "kind": "p",
            "text": "البيانات الشخصية الوحيدة التي نثبتها في قاعدة بياناتنا هي:"
          },
          {
            "kind": "ul",
            "items": [
              "**بيانات اعتماد الحساب**: عنوان بريدك الإلكتروني؛ نسخة مشفرة ومملحة من كلمة المرور (مدارة بواسطة Supabase Auth — نحن لا نرى أو نخزن النصPlain)؛ الاسم المعروض الاختياري ورابط الصورة الرمزية إذا قمت بتسجيل الدخول باستخدام Google.",
              "**حالة الاشتراك**: الخطة الحالية (مجاني / Pro / Business)، المعرف العميل لـ Stripe، وتواريخ أحدث تجديداتك.",
              "**عدادات الاستخدام**: عدادات الحصص المجمعة (مثل \"تم استخدام 3 عمليات ذكاء اصطناعي اليوم\"، \"تم استخدام 420 عملية ذكاء اصطناعي شهرياً\") المحدثة في مكانها في صفك الشخصي. نحن **لا نقوم** بتسجيل سجلات لكل عملية.",
              "**بيانات تعريف الوظيفة (عابرة)**: عند إنتاج أداة بمساعدة الخادم مخرجاً (مثل ملف .srt من النسخ الصوتي)، نسجل اسم الأداة، رابط تنزيل النتيجة، اللغة المصدر، وتوقيت الإنجاز. تتم إزالة هذه الصفوف تلقائياً بعد **ساعتين (2)**. لا تحتوي مطلقاً على محتوى ملفك.",
              "**سجلات الموافقة**: التاريخ والوقت الذي وافقت فيه على هذه الشروط وسياسة الخصوصية لدينا، وما إذا كنت قد اخترت الاشتراك في رسائل البريد الإلكتروني التسويقية. محفوظة طوال مدة حسابك بالإضافة إلى فترة أدلة قانونية مدتها خمس (5) سنوات بعد الحذف."
            ]
          },
          {
            "kind": "p",
            "text": "نحن **لا نجمع** ما يلي: عنوان IP الخاص بك (بخلاف الاستخدام المؤقت الذي تقوم به Supabase ومزود الاستضافة لدينا لأغراض الحد من المعدل وتسجيلات الأمان)، بصمة متصفحك، أحداث التتبع السلوكي، تسجيلات شاشتك، أو أي بيانات حيوية."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. الملفات التي تعالجها",
        "blocks": [
          {
            "kind": "p",
            "text": "كما هو مذكور في القسم 1، لا نقوم مطلقاً بتخزين محتويات الملفات التي تعالجها. الدورة الحياتية الدقيقة هي:"
          },
          {
            "kind": "ul",
            "items": [
              "**أدوات تعمل فقط في المتصفح**: لا يوجد إرسال مطلقاً. يقرأ المتصفح الملف إلى الذاكرة، ويتم إنتاج النتيجة محلياً، وتقوم بتنزيلها مباشرة. لا نقوم بتسجيل أي شيء يتعلق بالملف نفسه.",
              "**النسخ الصوتي / الترجمة / OCR / تحليل التصيد بالذكاء الاصطناعي**: يتم إرسال الملف أو النص إلى دالة Edge الخاصة بنا في Supabase، والتي تقوم فوراً بإرساله إلى مزود الذكاء الاصطناعي ذي الصلة (انظر القسم 7) للاستدلال. يتم إرجاع النتيجة إليك ويتم التخلص من مخزن التحميل المؤقت. تتم كتابة ملفات النتائج إلى دلو التخزين الخاص بنا ويمكن الوصول إليها عبر روابط موقعة لمدة ستين (60) دقيقة ويتم إزالتها مادياً خلال ثلاثين (30) دقيقة من إنشائها.",
              "**فاحص اختراقات كلمات المرور**: لا تغادر كلمة مرورك المتصفح مطلقاً. نقوم بتجزئتها محلياً باستخدام SHA-1 ونستعلم عن HaveIBeenPwned باستخدام k-anonymity — يتم إرسال الأحرف الخمسة الأولى من التجزئة فقط. لم تتم مشاركة كلمة المرور أو التجزئة الكاملة مطلقاً.",
              "**ماسح الروابط / فاحص SSL**: يتم إرسال الرابط أو اسم النطاق الذي تكتبه فقط (إلى Google Safe Browsing لماسح الروابط، أو لاستخدامه لفتح اتصال TLS حي لفاحص SSL). لا يوجد محتويات محيطة للصفحة."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. الأسس القانونية للمعالجة (GDPR المادة 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**تنفيذ العقد** (المادة 6(1)(ب)) — عند إنشاء حساب واستخدام الميزات المدفوعة، يكون المعالجة ضرورية لتقديم الخدمة.",
              "**المصالح المشروعة** (المادة 6(1)(و)) — منع الاحتيال، التخفيف من سوء الاستخدام، تسجيلات الأمان الأساسية، وتحسين الخدمة.",
              "**الموافقة** (المادة 6(1)(أ)) — رسائل البريد الإلكتروني التسويقية، ملفات تعريف الارتباط التحليلية أو الإعلانية الاختيارية (إذا تم تمكينها)، وأي تكامل اختياري مستقبلي.",
              "**الالتزام القانوني** (المادة 6(1)(ج)) — الاحتفاظ بسجلات الفواتير وفقاً للقانون الضريبي الفرنسي (عادة عشر سنوات)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. حقوقك بموجب GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "باعتبارك خاضعاً للائحة (EU) 2016/679 المؤرخ 27 أبريل 2016 (\"GDPR\")، تتمتع بالحقوق التالية، والتي يمكنك ممارستها في أي وقت وبدون تكلفة من عنوان البريد الإلكتروني المسجل في حسابك:"
          },
          {
            "kind": "ul",
            "items": [
              "**حق الوصول** (GDPR المادة 15) — الحصول على تأكيد بأننا نعالج بياناتك ونسخة منها.",
              "**حق التصحيح** (GDPR المادة 16) — تصحيح البيانات غير الدقيقة أو غير الكاملة.",
              "**حق الحذف / الحق في النسيان** (GDPR المادة 17) — حذف بياناتك عندما لم تعد الأسس القانونية للمعالجة سارية.",
              "**حق تقييد المعالجة** (GDPR المادة 18) — تجميد المعالجة مؤقتاً أثناء حل النزاع.",
              "**حق نقل البيانات** (GDPR المادة 20) — استلام بياناتك بتنسيق منظم وقابل للقراءة آلياً.",
              "**حق الاعتراض** (GDPR المادة 21) — الاعتراض في أي وقت، لأسباب تتعلق بحالتك الخاصة، على المعالجة بناءً على مصالحنا المشروعة.",
              "**حق سحب الموافقة** (GDPR المادة 7(3)) — لسحب الموافقة في أي وقت دون التأثير على قانونية المعالجة السابقة.",
              "**الحق في عدم الخضوع للقرارات الآلية** (GDPR المادة 22) — لا تتضمن أي من عملياتنا قرارات آلية تنتج آثاراً قانونية عليك."
            ]
          },
          {
            "kind": "p",
            "text": "لممارسة أي من هذه الحقوق، اكتب إلى [support@konvertools.com](mailto:support@konvertools.com) من العنوان المسجل في حسابك. سنرد خلال شهر (1) واحد، وفقاً للمادة 12(3) من GDPR؛ قد يتم تمديد الفترة لشهرين آخرين للطلبات المعقدة بشكل خاص، وفي هذه الحالة سنبلغك خلال الشهر الأول."
          },
          {
            "kind": "p",
            "text": "لديك أيضاً **الحق في تقديم شكوى إلى سلطة رقابية** (GDPR المادة 77). للمستخدمين في فرنسا، هذه هي **اللجنة الوطنية للمعلوماتية والحريات (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, فرنسا — هاتف +33 (0)1 53 73 22 22 — شكاوى عبر الإنترنت على [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). للمستخدمين في دول الاتحاد الأوروبي/المنطقة الاقتصادية الأوروبية الأخرى، يمكنك تقديم شكوى إلى **السلطة الرقابية الوطنية** (القائمة محفوظة من قبل مجلس حماية البيانات الأوروبي على [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). يمكنك أيضاً طلب سبيل قضائي بموجب المادة 79 من GDPR."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. المعالجون من طرف ثالث",
        "blocks": [
          {
            "kind": "p",
            "text": "يتطلب تقديم الخدمة منا مشاركة بيانات محدودة للغاية مع المعالجين التاليين. لكل منهم سياسة خصوصية خاصة به تنظم كيفية تعاملهم مع البيانات التي نرسلها إليهم."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (شركة مسجلة في سنغافورة، مستضافة في الاتحاد الأوروبي لمشروعنا) — المصادقة، قاعدة البيانات، تخزين الملفات، ودوال Edge. يستقبل بيانات اعتماد حسابك، بيانات الملف الشخصي، وأي ملف تقوم بتحميله لأداة بمساعدة الخادم (عابراً). يعمل كمعالج فرعي لنا.",
              "**Mistral AI** (فرنسا) — استدلال نماذج اللغة الكبيرة للترجمة، إعادة الصياغة، التلخيص، التحويل البشري بالذكاء الاصطناعي، تحليل أنماط التصيد، ومهام النصوص الأخرى؛ النسخ الصوتي (Voxtral)؛ OCR والوظائف البصرية للصور (Pixtral). يتم إرسال النص أو الصورة التي تقدمها إلى Mistral للاستدلال. تعهد Mistral **عدم** استخدام مدخلات API لتدريب نماذجها.",
              "**Google Safe Browsing** (Google LLC، الولايات المتحدة) — فقط عند استخدام ماسح الروابط أو كاشف التصيد. يتم إرسال الروابط التي تقدمها (أو الروابط المستخرجة من البريد الإلكتروني الذي تلصقه) فقط. هذه هي الخدمة الأمنية من طرف ثالث الوحيدة التي نستخدمها.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — فقط عند استخدام فاحص اختراقات كلمات المرور، ولم يتم إرسال سوى الأحرف الخمسة الأولى من تجزئة SHA-1 لكلمة المرور (k-anonymity). يتم الاستعلام مباشرة من متصفحك، وليس عبر خوادمنا.",
              "**Stripe** (Stripe Payments Europe, Ltd., أيرلندا) — معالجة الدفعات والفواتير الاشتراك. نحن **لا نرى أو نخزن** تفاصيل بطاقتك مطلقاً. يستقبل Stripe بريدك الإلكتروني، طريقة الدفع، عنوان الفوترة، والخطة التي اشتريتها.",
              "**Resend** (الولايات المتحدة) — تسليم رسائل البريد الإلكتروني المعاملات (تأكيد الحساب، إيصالات الدفع، إعادة تعيين كلمة المرور). يستقبل عنوان بريدك الإلكتروني وجسم البريد الإلكتروني الذي نرسله.",
              "**Vercel** (الولايات المتحدة) — شبكة توصيل محتوى للصفحات الثابتة. يستقبل بيانات تعريف حركة مرور الويب القياسية (IP، وكيل المستخدم، URL المطلوب) للتوجيه ومنع سوء الاستخدام. محفوظة وفقاً لسياسة الاحتفاظ بسجلات Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "عندما يعمل أي من هذه المعالجين خارج المنطقة الاقتصادية الأوروبية، يتم تنظيم النقل بواسطة الشروط التعاقدية القياسية (SCCs) للجنة الأوروبية أو آلية نقل مكافئة."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. ملفات تعريف الارتباط والتقنيات المماثلة",
        "blocks": [
          {
            "kind": "p",
            "text": "نستخدم فقط ملفات تعريف الارتباط والعناصر المحلية التالية:"
          },
          {
            "kind": "ul",
            "items": [
              "**أساسية**: NEXT_LOCALE (تذكر اللغة التي اخترتها)، وملفات تعريف الارتباط الخاصة بجلسة Supabase (sb-*-auth-token) عند تسجيل الدخول. لا تتطلب موافقة بموجب GDPR.",
              "**إعلانية اختيارية**: إذا قمنا بتمكين شركاء الإعلانات (يتم حالياً الإشارة إلى Ezoic في الكود لدينا ولكن لم يتم تفعيله لحركة مرورك)، سنعرض لافتة موافقة واضحة ولن نضع ملفات تعريف الارتباط الإعلانية إلا بعد موافقتك."
            ]
          },
          {
            "kind": "p",
            "text": "نحن لا نستخدم حالياً أي تحليلات أو وحدات تتبع أو علامات إعادة تسويق. إذا أضفنا أياً منها، ستتحكم لافتة الموافقة أعلاه فيها."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. أمن المعالجة (GDPR المادة 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "وفقاً للمادة 32 من GDPR، ننفذ تدابير فنية وتنظيمية مناسبة لضمان مستوى أمن يتناسب مع المخاطر:"
          },
          {
            "kind": "ul",
            "items": [
              "**التشفير أثناء النقل** — يتم حماية جميع حركة المرور إلى الخدمة ومنه بواسطة TLS 1.2 أو أعلى.",
              "**التشفير أثناء التخزين** — تقوم Supabase بتشفير قاعدة البيانات الأساسية (بما في ذلك بيانات حسابك) باستخدام AES-256.",
              "**معالجة كلمات المرور** — يتم تجزئة كلمة مرورك بواسطة Supabase Auth ولا يتم تخزينها كنص plain. نتحقق أيضاً من كلمات المرور الجديدة باستخدام API k-anonymity لـ HaveIBeenPwned من جانب العميل لرفض كلمات المرور المعروفة بأنها مخترقة.",
              "**بيانات الدفع** — لم نراها أو نخزنها مطلقاً؛ يتم تفويض مسار الدفع بالكامل إلى Stripe (متوافق مع PCI-DSS المستوى 1).",
              "**تحكم الوصول** — تمنع سياسات أمن الصفوف مستوى المستخدم من قراءة بيانات مستخدم آخر؛ يتم تقييد مفاتيح دور الخدمة بوظائف Edge.",
              "**نظافة الملفات** — لم يتم الاحتفاظ بأي ملف تم تحميله مطلقاً: لا تقوم أدوات المتصفح فقط بإرسال أي شيء، وتقوم أدوات الخادم بمساعدة الخادم بحذف المخازن المؤقتة خلال 30 دقيقة.",
              "**الاستجابة للثغرات** — يمكن الإبلاغ عن مشكلات الأمن بسرية إلى [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "على الرغم من هذه التدابير، لا يوجد نظام آمن تماماً؛ أنت تقبل المخاطر المتبقية الكامنة في أي خدمة عبر الإنترنت."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. تقليل البيانات والحد من الأغراض (GDPR المادة 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "وفقاً للمادة 5(1)(ج) من GDPR، نجمع فقط البيانات الضرورية للغاية للأغراض المحددة في هذه السياسة. بشكل ملموس: لا نجمع عنوان IP الخاص بك بخلاف سجلات التوجيه العابرة، ولا نتعقب بصمة متصفحك، ولا نقوم بتشغيل تحليلات سلوكية، ولا نستخدم مطلقاً أي ملف تعالجه لتدريب نماذج الذكاء الاصطناعي. لا نجمع البيانات الخاصة بالفئة (المادة 9) أو البيانات المتعلقة بجرائم جنائية (المادة 10). يتم الحفاظ على البيانات دقيقة وحديثة (المادة 5(1)(د))؛ يمكنك تصحيح أي عدم دقة في أي وقت عبر لوحة التحكم الخاصة بك أو عن طريق الاتصال بـ [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. الاحتفاظ",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "بيانات الملف الشخصي: محفوظة طوال مدة حسابك، ويتم حذفها خلال ثلاثين (30) يوماً من إغلاق الحساب.",
              "بيانات تعريف الوظيفة: تتم إزالتها تلقائياً بعد ساعتين (2).",
              "ملفات النتائج في دلو التخزين: تتم إزالتها مادياً خلال ثلاثين (30) دقيقة من إنشائها.",
              "سجلات الفواتير: محفوظة لمدة عشر (10) سنوات للامتثال للالتزامات الضريبية الفرنسية.",
              "سجلات الموافقة: محفوظة طوال مدة حسابك بالإضافة إلى خمس (5) سنوات بعد ذلك كدليل قانوني."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. القصر",
        "blocks": [
          {
            "kind": "p",
            "text": "الخدمة **غير موجهة للأطفال دون سن السادسة عشرة (16)**. إذا كنت دون هذه السن، يجب ألا تنشئ حساباً. لا نجمع بيانات القصر عن علم؛ إذا علمنا بذلك، سنحذفها."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. التغييرات على هذه السياسة",
        "blocks": [
          {
            "kind": "p",
            "text": "قد نقوم بتعديل سياسة الخصوصية هذه من وقت لآخر. سيتم الإعلان عن التغييرات الجوهرية عبر البريد الإلكتروني لحاملي الحسابات قبل ثلاثين (30) يوماً على الأقل من سريانها. النسخة الأحدث متاحة دائماً على [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. الاتصال",
        "blocks": [
          {
            "kind": "p",
            "text": "لأي سؤال حول هذه السياسة أو بياناتك — بما في ذلك ممارسة أي من حقوقك بموجب GDPR (انظر القسم 6) — اكتب إلى [support@konvertools.com](mailto:support@konvertools.com). هذه الرسالة الواحدة هي نقطة الاتصال لدينا للخصوصية والأمن والفواتير والدعم العام. يمكنك أيضاً تقديم شكوى إلى اللجنة الوطنية الفرنسية لحماية البيانات CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris CEDEX 07 — [www.cnil.fr](https://www.cnil.fr)) أو إلى السلطة الرقابية في بلد إقامتك."
          }
        ]
      }
    ]
  },
  "ru": {
    "h1": "Политика конфиденциальности",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Последнее обновление: %DATE% · Вступает в силу немедленно для всех посетителей и владельцев учётных записей.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Наш основной принцип: мы не храним ваши файлы",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (далее — «Услуга») работает как набор инструментов, ориентированный на конфиденциальность. Наше самое важное обязательство заключается в следующем:"
          },
          {
            "kind": "ul",
            "items": [
              "**Инструменты, работающие только в браузере** (конвертеры изображений, PDF-инструменты на основе pdf-lib, аудио- и видеоконвертеры с использованием FFmpeg.wasm, инструменты для работы с кодом, калькуляторы, генераторы QR-кодов, проверка утечек паролей, большинство утилит) выполняются **полностью внутри вашего веб-браузера через WebAssembly**. Ваш файл или ввод никогда не передаются на наши серверы. У нас нет технической возможности их прочитать.",
              "**Инструменты с серверной поддержкой** (AI-транскрибирование, AI-перевод, AI-обработка текста, наложение субтитров на видео, сканер URL, детектор фишинга, проверка SSL-сертификатов и некоторые другие) требуют отправки данных на бэкенд. Во всех случаях файл или текст обрабатываются в режиме реального времени и удаляются из временного хранилища в течение тридцати (30) минут.",
              "Мы никогда не храним содержимое загруженных файлов на постоянной основе, не используем ваши загрузки для обучения моделей ИИ и не продаём, не сдаём в аренду и не передаём их третьим лицам для любых целей, кроме предоставления результата, который вы запросили."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Контролёр данных",
        "blocks": [
          {
            "kind": "p",
            "text": "В соответствии с Положением Европейского Союза о защите данных (Регламент (ЕС) 2016/679, «GDPR»), контролёром данных является издатель Услуги. Для любых вопросов, связанных с конфиденциальностью: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Какие данные мы собираем",
        "blocks": [
          {
            "kind": "p",
            "text": "Единственные персональные данные, которые мы сохраняем в нашей базе данных:"
          },
          {
            "kind": "ul",
            "items": [
              "**Учётные данные**: ваш адрес электронной почты; соль и хеш вашего пароля (управляется Supabase Auth — мы не видим и не храним пароль в открытом виде); при входе через Google — необязательные отображаемое имя и URL аватара.",
              "**Статус подписки**: текущий тарифный план (бесплатный / Pro / Business), идентификатор клиента Stripe и даты последних продлений.",
              "**Счётчики использования**: агрегированные квоты (например, «3 запуска ИИ сегодня», «420 ежемесячных запусков ИИ использовано») обновляются на вашей учётной записи. Мы **не ведём запись отдельных запусков**.",
              "**Метаданные задач (временные)**: при генерации результата серверным инструментом (например, файл .srt при транскрибировании) мы записываем название инструмента, URL для скачивания результата, исходный язык и время завершения. Эти записи автоматически удаляются через **два (2) часа**. Они никогда не содержат содержимого вашего файла.",
              "**Записи согласий**: дата и время принятия вами настоящих Условий и нашей Политики конфиденциальности, а также выбор подписки на маркетинговые письма. Хранятся в течение срока существования вашей учётной записи плюс пять (5) лет после её удаления в качестве доказательной базы."
            ]
          },
          {
            "kind": "p",
            "text": "Мы **не собираем**: ваш IP-адрес (кроме временного использования Supabase и нашего хостинг-провайдера для ограничения частоты запросов и логирования безопасности), отпечаток браузера, события поведенческого трекинга, записи с экрана или биометрические данные."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Файлы, которые вы обрабатываете",
        "blocks": [
          {
            "kind": "p",
            "text": "Как указано в разделе 1, содержимое файлов, которые вы обрабатываете, никогда не сохраняется нами. Точный жизненный цикл следующий:"
          },
          {
            "kind": "ul",
            "items": [
              "**Инструменты, работающие только в браузере**: передача данных отсутствует. Файл считывается в память вашим браузером, результат генерируется локально, и вы скачиваете его напрямую. Мы не логируем данные о самом файле.",
              "**AI-транскрибирование / перевод / OCR / анализ фишинга**: файл или текст передаются в нашу Supabase Edge Function, которая мгновенно перенаправляет их соответствующему провайдеру ИИ (см. раздел 7) для инференса. Результат возвращается вам, а временный буфер загрузки удаляется. Результирующие файлы, записанные в наше частное хранилище, доступны по подписанным URL в течение шестидесяти (60) минут и физически удаляются в течение тридцати (30) минут после генерации.",
              "**Проверка утечек паролей**: ваш пароль никогда не покидает ваш браузер. Мы хешируем его локально с помощью SHA-1 и запрашиваем HaveIBeenPwned с использованием k-анонимности — отправляется только первые 5 символов хеша. Пароль и полный хеш никогда не передаются.",
              "**Сканер URL / проверка SSL**: передаётся только URL или имя хоста, которые вы вводите (в Google Safe Browsing для сканера URL или для открытия живого TLS-соединения при проверке SSL). Никакие данные окружающей страницы не передаются."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Правовые основания обработки (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Исполнение договора** (Art. 6(1)(b)) — при создании учётной записи и использовании платных функций обработка необходима для предоставления Услуги.",
              "**Законные интересы** (Art. 6(1)(f)) — предотвращение мошенничества, смягчение злоупотреблений, базовое логирование безопасности и улучшение Услуги.",
              "**Согласие** (Art. 6(1)(a)) — маркетинговые письма, необязательные аналитические или рекламные cookies (если и когда включены), а также любые будущие необязательные интеграции.",
              "**Юридическое обязательство** (Art. 6(1)(c)) — хранение платёжных записей в соответствии с требованиями французского налогового законодательства (обычно десять лет)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Ваши права в соответствии с GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Как субъект данных в соответствии с Регламентом (ЕС) 2016/679 от 27 апреля 2016 года («GDPR»), вы обладаете следующими правами, которые можете реализовать в любое время и бесплатно с адреса электронной почты, зарегистрированного в вашей учётной записи:"
          },
          {
            "kind": "ul",
            "items": [
              "**Право на доступ** (GDPR Art. 15) — получить подтверждение обработки ваших данных и копию этих данных.",
              "**Право на исправление** (GDPR Art. 16) — исправить неточные или неполные данные.",
              "**Право на удаление / право быть забытым** (GDPR Art. 17) — удалить ваши данные, когда правовые основания для обработки больше не применяются.",
              "**Право на ограничение обработки** (GDPR Art. 18) — временно приостановить обработку данных во время разрешения споров.",
              "**Право на переносимость данных** (GDPR Art. 20) — получить ваши данные в структурированном, машиночитаемом формате.",
              "**Право на возражение** (GDPR Art. 21) — в любое время возражать против обработки данных на основе наших законных интересов при наличии уважительных причин, связанных с вашей конкретной ситуацией.",
              "**Право на отзыв согласия** (GDPR Art. 7(3)) — для обработки на основе согласия отозвать его в любое время без ущерба для законности предыдущей обработки.",
              "**Право не подвергаться автоматизированным решениям** (GDPR Art. 22) — ни одна из наших операций не включает полностью автоматизированные решения, которые могут иметь юридические последствия для вас."
            ]
          },
          {
            "kind": "p",
            "text": "Для реализации любого из этих прав напишите на [support@konvertools.com](mailto:support@konvertools.com) с адреса, зарегистрированного в вашей учётной записи. Мы ответим в течение одного (1) месяца, как требует GDPR Art. 12(3); срок может быть продлён ещё на два месяца для особенно сложных запросов, о чём мы уведомим вас в течение первого месяца."
          },
          {
            "kind": "p",
            "text": "У вас также есть **право подать жалобу в надзорный орган** (GDPR Art. 77). Для пользователей во Франции это **Национальная комиссия по информатике и свободам (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Франция — телефон +33 (0)1 53 73 22 22 — подача жалоб онлайн на [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Для пользователей в других государствах-членах ЕС/ЕЭЗ вы можете подать жалобу в **национальный надзорный орган** (список поддерживается Европейским советом по защите данных на [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Вы также можете обратиться за судебной защитой в соответствии с GDPR Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Сторонние обработчики",
        "blocks": [
          {
            "kind": "p",
            "text": "Для предоставления Услуги нам необходимо передавать строго ограниченные данные следующим обработчикам. Каждый из них имеет свою собственную политику конфиденциальности, регулирующую обработку данных, которые они получают от нас."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (компания, зарегистрированная в Сингапуре, размещённая в ЕС для нашего проекта) — аутентификация, база данных, файловое хранилище и Edge Functions. Получает ваши учётные данные, профильные данные и (временные) любые файлы, загруженные для инструментов с серверной поддержкой. Выступает в роли нашего субподрядчика.",
              "**Mistral AI** (Франция) — инференс больших языковых моделей для перевода, перефразирования, суммаризации, «человечного» ИИ, анализа шаблонов фишинга и других текстовых задач; аудиотранскрибирование (Voxtral); OCR и Vision для изображений (Pixtral). Текст или изображение, которые вы отправляете, передаются Mistral для инференса. Mistral контрактно обязался **не использовать входные данные API для обучения своих моделей**.",
              "**Google Safe Browsing** (Google LLC, США) — только при использовании Сканера URL или Детектора фишинга. Передаются только URL, которые вы отправляете (или ссылки, извлечённые из письма, которое вы вставляете). Это единственная сторонняя служба безопасности, которую мы используем.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — только при использовании Проверки утечек паролей, и только первые 5 символов хеша SHA-1 вашего пароля (k-анонимность). Запрос выполняется напрямую из вашего браузера, а не через наши серверы.",
              "**Stripe** (Stripe Payments Europe, Ltd., Ирландия) — обработка платежей и подписка на тарифные планы. Мы **никогда не видим и не храним** данные вашей карты. Stripe получает ваш адрес электронной почты, платёжные реквизиты, адрес выставления счёта и купленный вами тарифный план.",
              "**Resend** (США) — доставка транзакционных писем (подтверждение учётной записи, квитанции об оплате, сброс пароля). Получает ваш адрес электронной почты и тело письма, которое мы отправляем.",
              "**Vercel** (США) — сеть доставки контента для статических страниц. Получает стандартные метаданные веб-трафика (IP, user-agent, запрашиваемый URL) для маршрутизации и предотвращения злоупотреблений. Хранится в соответствии с политикой логирования Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Если любой из этих обработчиков работает за пределами Европейской экономической зоны, передача данных регулируется Стандартными контрактными положениями (SCCs) Европейской комиссии или эквивалентным механизмом передачи."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies и аналогичные технологии",
        "blocks": [
          {
            "kind": "p",
            "text": "Мы используем только следующие cookies и элементы локального хранилища:"
          },
          {
            "kind": "ul",
            "items": [
              "**Обязательные**: NEXT_LOCALE (сохраняет выбранный вами язык) и cookies сеанса Supabase (sb-*-auth-token) при входе в систему. Они не требуют согласия в соответствии с GDPR.",
              "**Необязательные рекламные**: если и когда мы подключаем партнёров по рекламе (в настоящее время в нашем коде упоминается Ezoic, но пока не активирован для вашего трафика), мы будем отображать чёткий баннер согласия и устанавливать рекламные cookies только после того, как вы дадите согласие."
            ]
          },
          {
            "kind": "p",
            "text": "В настоящее время мы не используем никакие аналитические системы, пиксели отслеживания или теги ремаркетинга. Если мы добавим их, баннер согласия выше будет их контролировать."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Безопасность обработки (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "В соответствии с GDPR Art. 32 мы реализуем соответствующие технические и организационные меры для обеспечения уровня безопасности, соответствующего риску:"
          },
          {
            "kind": "ul",
            "items": [
              "**Шифрование при передаче** — весь трафик к Услуге и от неё защищён TLS 1.2 или выше.",
              "**Шифрование при хранении** — Supabase шифрует базу данных (включая ваши учётные данные) с помощью AES-256.",
              "**Обработка паролей** — ваш пароль хешируется Supabase Auth и никогда не хранится в открытом виде. Мы дополнительно проверяем новые пароли с помощью клиентского API k-анонимности HaveIBeenPwned, чтобы отклонять известные скомпрометированные пароли.",
              "**Платёжные данные** — никогда не видны и не хранятся нами; процесс оплаты картой полностью делегирован Stripe (соответствует PCI-DSS Level 1).",
              "**Контроль доступа** — политики безопасности на уровне строк предотвращают чтение данных одного пользователя другим; ключи сервис-ролей ограничены Edge Functions.",
              "**Гигиена файлов** — ни один загруженный файл никогда не сохраняется: инструменты, работающие только в браузере, ничего не передают, а инструменты с серверной поддержкой удаляют временные буферы в течение 30 минут.",
              "**Реагирование на уязвимости** — о проблемах безопасности можно сообщить конфиденциально на [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Несмотря на эти меры, ни одна система не является абсолютно защищённой; вы принимаете остаточный риск, inherent любому онлайн-сервису."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Минимизация данных и ограничение целей (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "В соответствии с GDPR Art. 5(1)(c) мы собираем только данные, строго необходимые для целей, указанных в настоящей Политике. Конкретно: мы не собираем ваш IP-адрес за пределами временных маршрутных логов, не отслеживаем отпечаток браузера, не используем поведенческий анализ и никогда не используем файлы, которые вы обрабатываете, для обучения моделей ИИ. Мы не собираем специальные категории данных (Art. 9) или данные, относящиеся к уголовным преступлениям (Art. 10). Данные поддерживаются в точном и актуальном состоянии (Art. 5(1)(d)); вы можете исправить неточности в любое время через панель управления или отправив письмо на [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Хранение данных",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Профильные данные: хранятся до существования вашей учётной записи, удаляются в течение тридцати (30) дней после её закрытия.",
              "Метаданные задач: автоматически удаляются через два (2) часа.",
              "Результирующие файлы в хранилище: физически удаляются в течение тридцати (30) минут после генерации.",
              "Платёжные записи: хранятся в течение десяти (10) лет для соблюдения французских налоговых обязательств.",
              "Записи согласий: хранятся в течение срока существования вашей учётной записи плюс пять (5) лет после её удаления в качестве доказательной базы."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Несовершеннолетние",
        "blocks": [
          {
            "kind": "p",
            "text": "Услуга **не предназначена для детей младше шестнадцати (16) лет**. Если вам меньше этого возраста, вы не должны создавать учётную запись. Мы не осознанно собираем данные несовершеннолетних; если нам станет об этом известно, мы удалим их."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Изменения в этой политике",
        "blocks": [
          {
            "kind": "p",
            "text": "Мы можем время от времени вносить изменения в настоящую Политику конфиденциальности. Существенные изменения будут объявлены по электронной почте владельцам учётных записей не менее чем за тридцать (30) дней до их вступления в силу. Самая актуальная версия всегда доступна по адресу [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Контактная информация",
        "blocks": [
          {
            "kind": "p",
            "text": "По любым вопросам, связанным с этой политикой или вашими данными — включая реализацию любых ваших прав в соответствии с GDPR (см. раздел 6) — напишите на [support@konvertools.com](mailto:support@konvertools.com). Этот единственный почтовый ящик является нашей точкой контакта для вопросов, связанных с конфиденциальностью, безопасностью, оплатой и общей поддержкой. Вы также можете подать жалобу в французский орган по защите данных CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) или в надзорный орган страны вашего проживания."
          }
        ]
      }
    ]
  },
  "hi": {
    "h1": "गोपनीयता नीति",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "अंतिम अपडेट: %DATE% · सभी आगंतुकों और खाता धारकों के लिए तत्काल प्रभाव से लागू।",
    "sections": [
      {
        "id": "principle",
        "title": "1. हमारा मूल सिद्धांत: हम आपके फ़ाइलें नहीं रखते",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (\"सेवा\") को एक गोपनीयता-पहला टूलकिट के रूप में संचालित किया जाता है। हमारा सबसे महत्वपूर्ण प्रतिबद्धता यह है:"
          },
          {
            "kind": "ul",
            "items": [
              "**ब्राउज़र-केवल टूल** (छवि कन्वर्टर्स, पीडीएफ टूल जो pdf-lib का उपयोग करते हैं, ऑडियो और वीडियो रूपांतरण FFmpeg.wasm द्वारा संचालित, कोड टूल, कैलकुलेटर्स, क्यूआर जनरेटर्स, पासवर्ड उल्लंघन चेकर, अधिकांश उपयोगिताएँ) **पूरी तरह से आपके वेब ब्राउज़र के भीतर वेबअसेंबली के माध्यम से निष्पादित होते हैं**। आपकी फ़ाइल या इनपुट को हमारे सर्वरों पर कभी भी प्रसारित नहीं किया जाता है। हमारे पास इसे पढ़ने का कोई तकनीकी साधन नहीं है।",
              "**सर्वर-सहायता प्राप्त टूल** (AI प्रतिलेखन, AI अनुवाद, AI पाठ कार्य, वीडियो सबटाइटल जलाना, URL स्कैनर, फ़िशिंग डिटेक्टर, SSL प्रमाणपत्र चेकर और अन्य कुछ) को बैकएंड पर कुछ भेजने की आवश्यकता होती है। प्रत्येक मामले में फ़ाइल या पाठ को वास्तविक समय में संसाधित किया जाता है और तीस (30) मिनट के भीतर अस्थायी संग्रहण से हटा दिया जाता है।",
              "हम किसी भी अपलोड की गई फ़ाइल की सामग्री को किसी निरंतर स्थान पर संग्रहीत नहीं करते हैं, हम आपके अपलोड का उपयोग AI मॉडलों को प्रशिक्षित करने के लिए नहीं करते हैं, और हम उन्हें तीसरे पक्ष के साथ किसी भी उद्देश्य के लिए बेचते, किराए पर नहीं देते या साझा नहीं करते हैं, सिवाय इसके कि आपको अपना अनुरोधित परिणाम प्रदान किया जा सके।"
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. डेटा नियंत्रक",
        "blocks": [
          {
            "kind": "p",
            "text": "यूरोपीय संघ के सामान्य डेटा संरक्षण विनियमन (नियमन (ईयू) 2016/679, \"GDPR\") के उद्देश्यों के लिए, डेटा नियंत्रक सेवा के प्रकाशक हैं। गोपनीयता संबंधी किसी भी पूछताछ के लिए संपर्क: [support@konvertools.com](mailto:support@konvertools.com)।"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. हम क्या एकत्र करते हैं",
        "blocks": [
          {
            "kind": "p",
            "text": "हमारे डेटाबेस में एकमात्र व्यक्तिगत डेटा जो हम संग्रहीत करते हैं, वह है:"
          },
          {
            "kind": "ul",
            "items": [
              "**खाता क्रेडेंशियल्स**: आपका ईमेल पता; आपके पासवर्ड की नमकीन, हैश की गई प्रति (Supabase Auth द्वारा प्रबंधित — हम कभी भी सादे पाठ को नहीं देखते या संग्रहीत नहीं करते); यदि आप Google से साइन इन करते हैं तो वैकल्पिक प्रदर्शन नाम और अवतार URL।",
              "**सदस्यता स्थिति**: वर्तमान योजना (निःशुल्क / Pro / Business), Stripe ग्राहक पहचानकर्ता, और आपके नवीनतम नवीकरण की तिथियाँ।",
              "**उपयोग काउंटर्स**: एकत्रित कोटा काउंटर्स (जैसे \"आज 3 AI रन उपयोग किए गए\", \"420 मासिक AI रन उपयोग किए गए\") जो आपके प्रोफ़ाइल पंक्ति पर ही अपडेट किए जाते हैं। हम **प्रति-रन रिकॉर्ड लॉग नहीं करते**।",
              "**कार्य मेटाडेटा (अस्थायी)**: जब कोई सर्वर-सहायता प्राप्त टूल आउटपुट उत्पन्न करता है (जैसे प्रतिलेखन से .srt फ़ाइल), हम टूल का नाम, परिणाम डाउनलोड URL, स्रोत भाषा, और पूर्ण होने का समय रिकॉर्ड करते हैं। ये पंक्तियाँ स्वचालित रूप से **दो (2) घंटे** के बाद हटा दी जाती हैं। इनमें कभी भी आपकी फ़ाइल की सामग्री शामिल नहीं होती है।",
              "**सहमति रिकॉर्ड्स**: वह तिथि और समय जब आपने इन नियमों और हमारी गोपनीयता नीति को स्वीकार किया, और क्या आपने विपणन ईमेल के लिए ऑप्ट-इन किया। आपके खाते के विलोपन के बाद पाँच (5) वर्षों तक कानूनी साक्ष्य अवधि सहित आपके खाते की अवधि के दौरान रखा जाता है।"
            ]
          },
          {
            "kind": "p",
            "text": "हम **निम्नलिखित डेटा एकत्र नहीं करते**: आपका IP पता (केवल अस्थायी उपयोग जो Supabase और हमारे होस्टिंग प्रदाता दर-सीमित और सुरक्षा लॉगिंग के लिए करते हैं), आपका ब्राउज़र फ़िंगरप्रिंट, व्यवहार संबंधी ट्रैकिंग घटनाएँ, आपकी स्क्रीन रिकॉर्डिंग, या कोई जैव-मेट्रिक डेटा।"
          }
        ]
      },
      {
        "id": "files",
        "title": "4. फ़ाइलें जिन्हें आप संसाधित करते हैं",
        "blocks": [
          {
            "kind": "p",
            "text": "अनुभाग 1 में बताया गया है, आपके द्वारा संसाधित की जाने वाली फ़ाइलों की सामग्री को हम कभी भी संग्रहीत नहीं करते। सटीक जीवनचक्र इस प्रकार है:"
          },
          {
            "kind": "ul",
            "items": [
              "**ब्राउज़र-केवल टूल**: शून्य प्रसारण। फ़ाइल को आपके ब्राउज़र द्वारा मेमोरी में पढ़ा जाता है, परिणाम स्थानीय रूप से उत्पन्न होता है, और आप इसे सीधे डाउनलोड करते हैं। हम फ़ाइल के बारे में कुछ भी लॉग नहीं करते।",
              "**AI प्रतिलेखन / अनुवाद / OCR / फ़िशिंग विश्लेषण**: फ़ाइल या पाठ को हमारे Supabase Edge Function पर स्ट्रीम किया जाता है, जो तुरंत इसे संबंधित AI प्रदाता (अनुभाग 7 देखें) को अनुमान के लिए अग्रेषित करता है। परिणाम आपको वापस कर दिया जाता है और अस्थायी अपलोड बफर तीस (30) मिनट के भीतर हटा दिया जाता है। हमारी निजी संग्रहण बाल्टी में लिखे गए परिणाम फ़ाइलें आपको साठ (60) मिनट के लिए साइन-URL के माध्यम से उपलब्ध होती हैं और उत्पन्न होने के तीस (30) मिनट के भीतर भौतिक रूप से हटा दी जाती हैं।",
              "**पासवर्ड उल्लंघन चेकर**: आपका पासवर्ड कभी भी आपके ब्राउज़र से बाहर नहीं जाता। हम इसे स्थानीय रूप से SHA-1 के साथ हैश करते हैं और k-अज्ञातता का उपयोग करके HaveIBeenPwned से क्वेरी करते हैं — केवल हैश के पहले 5 वर्ण भेजे जाते हैं। पासवर्ड और पूर्ण हैश कभी भी प्रसारित नहीं किए जाते।",
              "**URL स्कैनर / SSL चेकर**: केवल वह URL या होस्टनाम जिसे आप टाइप करते हैं (Google Safe Browsing के लिए URL स्कैनर के लिए, या SSL चेकर के लिए एक लाइव TLS कनेक्शन खोलने के लिए) प्रसारित किया जाता है। आसपास के पृष्ठ की सामग्री नहीं।"
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. प्रसंस्करण के कानूनी आधार (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**एक अनुबंध के निष्पादन** (Art. 6(1)(b)) — जब आप एक खाता बनाते हैं और सशुल्क सुविधाओं का उपयोग करते हैं, तो सेवा प्रदान करने के लिए प्रसंस्करण आवश्यक है।",
              "**वैध हित** (Art. 6(1)(f)) — धोखाधड़ी रोकथाम, दुरुपयोग शमन, बुनियादी सुरक्षा लॉगिंग, और सेवा में सुधार।",
              "**सहमति** (Art. 6(1)(a)) — विपणन ईमेल, वैकल्पिक विश्लेषण या विज्ञापन कुकीज़ (यदि और जब सक्षम किया जाता है), और भविष्य में किसी भी वैकल्पिक एकीकरण।",
              "**कानूनी दायित्व** (Art. 6(1)(c)) — फ्रांसीसी कर कानून (आमतौर पर दस वर्ष) द्वारा आवश्यक बिलिंग रिकॉर्ड्स की अवधारण।"
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. GDPR के तहत आपके अधिकार",
        "blocks": [
          {
            "kind": "p",
            "text": "27 अप्रैल 2016 के विनियमन (ईयू) 2016/679 (\"GDPR\") के तहत एक डेटा विषय के रूप में, आपको निम्नलिखित अधिकार प्राप्त हैं, जिन्हें किसी भी समय और आपके खाते पर पंजीकृत ईमेल पते से निःशुल्क प्रयोग किया जा सकता है:"
          },
          {
            "kind": "ul",
            "items": [
              "**पहुँच का अधिकार** (GDPR Art. 15) — पुष्टि प्राप्त करें कि हम आपके डेटा को संसाधित करते हैं और उसका एक प्रतिलिपि प्राप्त करें।",
              "**सुधार का अधिकार** (GDPR Art. 16) — अशुद्ध या अपूर्ण डेटा को सही करवाएं।",
              "**मिटाने का अधिकार / भुलाए जाने का अधिकार** (GDPR Art. 17) — जब प्रसंस्करण के कानूनी आधार लागू नहीं होते, तब अपने डेटा को हटवाएं।",
              "**प्रसंस्करण पर प्रतिबंध का अधिकार** (GDPR Art. 18) — एक विवाद के हल होने तक प्रसंस्करण को अस्थायी रूप से रोकें।",
              "**डेटा पोर्टेबिलिटी का अधिकार** (GDPR Art. 20) — अपना डेटा एक संरचित, मशीन-पठनीय प्रारूप में प्राप्त करें।",
              "**आपत्ति का अधिकार** (GDPR Art. 21) — अपने विशेष स्थिति से संबंधित कारणों पर, हमारे वैध हितों पर आधारित प्रसंस्करण के खिलाफ किसी भी समय आपत्ति करें।",
              "**सहमति वापस लेने का अधिकार** (GDPR Art. 7(3)) — सहमति पर आधारित प्रसंस्करण के लिए, पूर्व प्रसंस्करण की कानूनीता को प्रभावित किए बिना किसी भी समय इसे वापस लें।",
              "**स्वचालित निर्णय लेने के अधीन नहीं होने का अधिकार** (GDPR Art. 22) — हमारे किसी भी प्रसंस्करण में आप पर कानूनी प्रभाव उत्पन्न करने वाले पूर्णतः स्वचालित निर्णय शामिल नहीं हैं।"
            ]
          },
          {
            "kind": "p",
            "text": "इन अधिकारों में से किसी का भी प्रयोग करने के लिए, अपने खाते पर पंजीकृत पते से [support@konvertools.com](mailto:support@konvertools.com) पर लिखें। हम GDPR Art. 12(3) के अनुसार एक (1) महीने के भीतर उत्तर देंगे; विशेष रूप से जटिल अनुरोधों के लिए अवधि को दो और महीनों तक बढ़ाया जा सकता है, जिसके मामले में हम पहले महीने के भीतर आपको सूचित करेंगे।"
          },
          {
            "kind": "p",
            "text": "आपके पास **एक पर्यवेक्षी प्राधिकरण के पास शिकायत दर्ज करने का अधिकार** भी है (GDPR Art. 77)। फ्रांस के उपयोगकर्ताओं के लिए, यह **Commission Nationale de l'Informatique et des Libertés (CNIL)** है — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, फ्रांस — टेलीफोन +33 (0)1 53 73 22 22 — ऑनलाइन शिकायतें [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes) पर। अन्य EU/EEA सदस्य राज्यों के उपयोगकर्ताओं के लिए, आप अपने **राष्ट्रीय पर्यवेक्षी प्राधिकरण** के पास शिकायत दर्ज कर सकते हैं (सूची European Data Protection Board द्वारा बनाए रखी जाती है [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en))। आप GDPR Art. 79 के तहत न्यायिक उपाय भी तलाश सकते हैं।"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. तृतीय-पक्ष प्रसंस्करणकर्ता",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा प्रदान करने के लिए, हमें निम्नलिखित प्रसंस्करणकर्ताओं के साथ सीमित डेटा साझा करने की आवश्यकता होती है। प्रत्येक की अपनी गोपनीयता नीति होती है जो यह नियंत्रित करती है कि वे हमारे द्वारा प्राप्त डेटा को कैसे संभालते हैं।"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (सिंगापुर में निगमित, हमारे प्रोजेक्ट के लिए EU में होस्ट किया गया) — प्रमाणीकरण, डेटाबेस, फ़ाइल संग्रहण, और Edge Functions। आपके खाता क्रेडेंशियल्स, प्रोफ़ाइल डेटा और (अस्थायी रूप से) किसी भी सर्वर-सहायता प्राप्त टूल के लिए अपलोड की गई फ़ाइल प्राप्त करता है। हमारे उप-प्रसंस्करणकर्ता के रूप में कार्य करता है।",
              "**Mistral AI** (फ्रांस) — बड़े भाषा मॉडल अनुमान: अनुवाद, पुनः लिखना, सारांश, AI मानवीकरण, फ़िशिंग-पैटर्न विश्लेषण, और अन्य पाठ कार्य; ऑडियो प्रतिलेखन (Voxtral); छवि OCR और Vision कार्य (Pixtral)। आपके द्वारा सबमिट किया गया पाठ या छवि अनुमान के लिए Mistral को भेजा जाता है। Mistral ने **API इनपुट का उपयोग अपने मॉडलों को प्रशिक्षित करने के लिए नहीं करने** का अनुबंध किया है।",
              "**Google Safe Browsing** (Google LLC, USA) — केवल जब आप URL स्कैनर या फ़िशिंग डिटेक्टर का उपयोग करते हैं। केवल वही URL जिन्हें आप सबमिट करते हैं (या ईमेल से निकाले गए लिंक) प्रसारित किए जाते हैं। यह एकमात्र तृतीय-पक्ष सुरक्षा सेवा है जिसका हम उपयोग करते हैं।",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — केवल जब आप पासवर्ड उल्लंघन चेकर का उपयोग करते हैं, और केवल आपके पासवर्ड के SHA-1 हैश के पहले 5 वर्ण (k-अज्ञातता)। सीधे आपके ब्राउज़र से क्वेरी किया जाता है, हमारे सर्वरों के माध्यम से नहीं।",
              "**Stripe** (Stripe Payments Europe, Ltd., आयरलैंड) — भुगतान प्रसंस्करण और सदस्यता बिलिंग। हम **आपके कार्ड विवरण कभी नहीं देखते या संग्रहीत नहीं करते**। Stripe को आपका ईमेल, भुगतान विधि, बिलिंग पता, और आपने खरीदी गई योजना प्राप्त होती है।",
              "**Resend** (USA) — लेन-देन संबंधी ईमेल वितरण (खाता पुष्टिकरण, भुगतान रसीदें, पासवर्ड रीसेट)। आपके ईमेल पते और ईमेल निकाय जिसे हम भेजते हैं, प्राप्त करता है।",
              "**Vercel** (USA) — स्थिर पृष्ठों के लिए सामग्री वितरण नेटवर्क। रूटिंग और दुरुपयोग रोकथाम के लिए मानक वेब-ट्रैफ़िक मेटाडेटा (IP, user-agent, अनुरोधित URL) प्राप्त करता है। Vercel की लॉग अवधारण नीति के अनुसार रखा जाता है।"
            ]
          },
          {
            "kind": "p",
            "text": "जहाँ इनमें से कोई भी प्रसंस्करणकर्ता यूरोपीय आर्थिक क्षेत्र के बाहर संचालित होता है, वहाँ स्थानांतरण यूरोपीय आयोग के मानक अनुबंधीय खंडों (SCCs) या समकक्ष स्थानांतरण तंत्र द्वारा शासित होते हैं।"
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. कुकीज़ और समान तकनीकें",
        "blocks": [
          {
            "kind": "p",
            "text": "हम केवल निम्नलिखित कुकीज़ और स्थानीय-संग्रहण वस्तुओं का उपयोग करते हैं:"
          },
          {
            "kind": "ul",
            "items": [
              "**आवश्यक**: NEXT_LOCALE (आपकी चुनी हुई भाषा को याद रखता है), और Supabase सत्र कुकीज़ (sb-*-auth-token) जब आप साइन इन होते हैं। ये GDPR के तहत सहमति की आवश्यकता नहीं रखते।",
              "**वैकल्पिक विज्ञापन**: यदि और जब हम विज्ञापन भागीदारों (वर्तमान में Ezoic हमारे कोड में संदर्भित है लेकिन अभी तक आपके ट्रैफ़िक के लिए सक्रिय नहीं है) को सक्षम करते हैं, तो हम एक स्पष्ट सहमति बैनर प्रदर्शित करेंगे और केवल तभी विज्ञापन कुकीज़ सेट करेंगे जब आप ऑप्ट-इन करेंगे।"
            ]
          },
          {
            "kind": "p",
            "text": "हम वर्तमान में कोई विश्लेषण, ट्रैकिंग पिक्सेल या पुनः विपणन टैग नहीं चलाते। यदि हम कोई जोड़ते हैं, तो उपरोक्त कुकी बैनर उन्हें नियंत्रित करेगा।"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. प्रसंस्करण की सुरक्षा (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Art. 32 के अनुसार, हम जोखिम के स्तर के अनुरूप उपयुक्त तकनीकी और संगठनात्मक उपाय लागू करते हैं:"
          },
          {
            "kind": "ul",
            "items": [
              "**प्रसारण में एन्क्रिप्शन** — सेवा के लिए आने-जाने वाला सभी ट्रैफ़िक TLS 1.2 या उच्चतर द्वारा संरक्षित है।",
              "**विश्राम में एन्क्रिप्शन** — Supabase आपके खाता डेटा सहित अंतर्निहित डेटाबेस को AES-256 के साथ एन्क्रिप्ट करता है।",
              "**पासवर्ड हैंडलिंग** — आपका पासवर्ड Supabase Auth द्वारा हैश किया जाता है और कभी भी सादे पाठ में संग्रहीत नहीं किया जाता। हम नए पासवर्डों की HaveIBeenPwned k-अज्ञातता API के विरुद्ध क्लाइंट-साइड जाँच भी करते हैं ताकि ज्ञात उल्लंघन वाले पासवर्डों को अस्वीकार किया जा सके।",
              "**भुगतान डेटा** — कभी भी हमारे द्वारा नहीं देखा या संग्रहीत नहीं किया जाता; कार्ड भुगतान प्रवाह पूरी तरह से Stripe (PCI-DSS Level 1 अनुपालन) को सौंपा गया है।",
              "**पहुँच नियंत्रण** — पंक्ति-स्तरीय सुरक्षा नीतियाँ एक उपयोगकर्ता को दूसरे उपयोगकर्ता के डेटा को पढ़ने से रोकती हैं; सेवा-भूमिका कुंजियाँ Edge Functions तक सीमित हैं।",
              "**फ़ाइल स्वच्छता** — कोई भी अपलोड की गई फ़ाइल कभी भी बरकरार नहीं रखी जाती: ब्राउज़र-केवल टूल कुछ भी प्रसारित नहीं करते, और सर्वर-सहायता प्राप्त टूल अस्थायी बफर्स को 30 मिनट के भीतर हटा देते हैं।",
              "**कमज़ोरी प्रतिक्रिया** — सुरक्षा मुद्दों की गोपनीय रूप से [support@konvertools.com](mailto:support@konvertools.com) पर रिपोर्ट की जा सकती है।"
            ]
          },
          {
            "kind": "p",
            "text": "इन उपायों के बावजूद, कोई भी प्रणाली पूर्णतः सुरक्षित नहीं है; आप किसी भी ऑनलाइन सेवा के अंतर्निहित जोखिम को स्वीकार करते हैं।"
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. डेटा न्यूनतमकरण और उद्देश्य सीमा (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Art. 5(1)(c) के अनुसार, हम केवल इस नीति में निर्धारित उद्देश्यों के लिए आवश्यक डेटा एकत्र करते हैं। विशिष्ट रूप से: हम आपके IP पते को केवल क्षणिक रूटिंग लॉग्स से परे एकत्र नहीं करते, हम आपके ब्राउज़र का फ़िंगरप्रिंट नहीं बनाते, हम व्यवहार संबंधी विश्लेषण नहीं चलाते, और हम आपके द्वारा संसाधित किसी भी फ़ाइल का उपयोग AI मॉडलों को प्रशिक्षित करने के लिए नहीं करते। हम विशेष श्रेणी के डेटा (Art. 9) या आपराधिक अपराधों से संबंधित डेटा (Art. 10) एकत्र नहीं करते। डेटा सटीक और अद्यतन रखा जाता है (Art. 5(1)(d)); आप किसी भी समय अपने डैशबोर्ड के माध्यम से या [support@konvertools.com](mailto:support@konvertools.com) पर संपर्क करके किसी भी अशुद्धि को ठीक कर सकते हैं।"
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. अवधारण",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "प्रोफ़ाइल डेटा: आपके खाते के अस्तित्व के दौरान रखा जाता है, खाता बंद होने के तीस (30) दिनों के भीतर हटा दिया जाता है।",
              "कार्य मेटाडेटा: स्वचालित रूप से दो (2) घंटे के बाद हटा दिया जाता है।",
              "संग्रहण बाल्टी में परिणाम फ़ाइलें: उत्पन्न होने के तीस (30) मिनट के भीतर भौतिक रूप से हटा दी जाती हैं।",
              "बिलिंग रिकॉर्ड्स: फ्रांसीसी कर दायित्वों का पालन करने के लिए दस (10) वर्षों तक बनाए रखे जाते हैं।",
              "सहमति रिकॉर्ड्स: आपके खाते की अवधि के दौरान और उसके विलोपन के बाद पाँच (5) वर्षों तक कानूनी साक्ष्य के रूप में रखा जाता है।"
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. नाबालिग",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा **सोलह (16) वर्ष से कम उम्र के बच्चों के लिए निर्दिष्ट नहीं है**। यदि आप इस आयु से कम हैं तो आपको खाता नहीं बनाना चाहिए। हम जानबूझकर नाबालिगों से डेटा एकत्र नहीं करते; यदि हमें पता चलता है कि हमने ऐसा किया है, तो हम इसे हटा देंगे।"
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. इस नीति में परिवर्तन",
        "blocks": [
          {
            "kind": "p",
            "text": "हम समय-समय पर इस गोपनीयता नीति में संशोधन कर सकते हैं। महत्वपूर्ण परिवर्तन प्रभावी होने से तीस (30) दिन पहले खाता धारकों को ईमेल द्वारा सूचित किया जाएगा। नवीनतम संस्करण हमेशा [https://konvertools.com/privacy](https://konvertools.com/privacy) पर उपलब्ध है।"
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. संपर्क",
        "blocks": [
          {
            "kind": "p",
            "text": "इस नीति या आपके डेटा के बारे में किसी भी प्रश्न के लिए — जिसमें आपके GDPR अधिकार (अनुभाग 6 देखें) का प्रयोग भी शामिल है — [support@konvertools.com](mailto:support@konvertools.com) पर लिखें। गोपनीयता, सुरक्षा, बिलिंग और सामान्य सहायता पूछताछ के लिए यह एकमात्र मेलबॉक्स है। आप फ्रांसीसी डेटा-संरक्षण प्राधिकरण CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) या अपने निवास देश के पर्यवेक्षी प्राधिकरण के पास भी शिकायत दर्ज कर सकते हैं।"
          }
        ]
      }
    ]
  },
  "tr": {
    "h1": "Gizlilik Politikası",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Son güncelleme: __TARİH__ · Tüm ziyaretçiler ve hesap sahipleri için derhal yürürlüğe girer.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Temel ilkemiz: dosyalarınızı saklamıyoruz",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (\"Hizmet\"), gizliliğe öncelik veren bir araç seti olarak işletilmektedir. Sunduğumuz en önemli taahhüt şudur:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tarayıcıda çalışan araçlar** (görüntü dönüştürücüleri, pdf-lib kullanan PDF araçları, FFmpeg.wasm tarafından desteklenen ses ve video dönüştürmeleri, kod araçları, hesap makineleri, QR kod üreticileri, parola ihlali kontrolcüsü, çoğu yardımcı program) **tamamen web tarayıcınızda WebAssembly aracılığıyla çalışır**. Dosyanız veya girdiniz hiçbir zaman sunucularımıza iletilmez. Onu okumamızın teknik bir yolu yoktur.",
              "**Sunucu destekli araçlar** (AI transkripsiyonu, AI çevirisi, AI metin görevleri, video altyazılarını yakma, URL tarayıcısı, phishing tespitçisi, SSL sertifika kontrolcüsü ve diğer bazıları) bir arka uca bir şey göndermeleri gerekir. Her durumda dosya veya metin gerçek zamanlı olarak işlenir ve geçici depolamadan otuz (30) dakika içinde silinir.",
              "Hiçbir yüklenen dosyanın içeriğini kalıcı bir konumda saklamıyoruz, dosyalarınızı AI modellerini eğitmek için kullanmıyoruz ve sonuç talep ettiğiniz hizmet dışında üçüncü taraflara satmıyor, kiralamıyor veya paylaşmıyoruz."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Veri sorumlusu",
        "blocks": [
          {
            "kind": "p",
            "text": "Avrupa Birliği Genel Veri Koruma Yönetmeliği (Yönetmelik (AB) 2016/679, \"GDPR\") kapsamında veri sorumlusu, Hizmetin yayıncısıdır. Gizlilikle ilgili herhangi bir sorgu için iletişim: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Topladığımız veriler",
        "blocks": [
          {
            "kind": "p",
            "text": "Veritabanımızda kalıcı olarak sakladığımız tek kişisel veri şunlardır:"
          },
          {
            "kind": "ul",
            "items": [
              "**Hesap kimlik bilgileri**: e-posta adresiniz; Supabase Auth tarafından yönetilen, tuzlanmış, özetlenmiş bir parola kopyası (aslına hiçbir şekilde erişemiyoruz veya saklamıyoruz); Google ile giriş yaparsanız isteğe bağlı bir görüntü adı ve avatar URL’si.",
              "**Abonelik durumu**: mevcut plan (ücretsiz / Pro / İş), Stripe müşteri tanımlayıcısı ve en son yenileme tarihleriniz.",
              "**Kullanım sayaçları**: profil satırınızda yerinde güncellenen özetlenmiş kota sayaçları (ör. \"bugün 3 AI çalışması kullanıldı\", \"aylık 420 AI çalışması kullanıldı\"). **Her çalışmanın kayıtlarını tutmuyoruz**.",
              "**İş meta verileri (geçici)**: bir sunucu destekli araç çıktı ürettiğinde (ör. transkripsiyondan oluşan bir .srt dosyası), araç adını, sonuç indirme URL’sini, kaynak dili ve tamamlanma zaman damgasını kaydederiz. Bu satırlar otomatik olarak **iki (2) saat** sonra silinir. Hiçbir zaman dosyanızın içeriğini içermezler.",
              "**Onay kayıtları**: bu Kullanım Koşullarını ve Gizlilik Politikamızı kabul ettiğiniz tarih ve saat ile pazarlama e-postalarına katılmayı seçip seçmediğiniz. Hesabınızın silinmesinden sonraki beş (5) yıl boyunca yasal kanıt süresi boyunca saklanır."
            ]
          },
          {
            "kind": "p",
            "text": "Toplamıyoruz: IP adresinizi (yalnızca Supabase ve barındırma sağlayıcımızın hız sınırlaması ve güvenlik günlüğü için geçici kullanımının ötesinde), tarayıcı parmak izinizi, davranışsal izleme olaylarını, ekran kayıtlarınızı veya herhangi bir biyometrik veriyi."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. İşlediğiniz dosyalar",
        "blocks": [
          {
            "kind": "p",
            "text": "1. bölümde belirtildiği gibi, işlediğiniz dosyaların içeriği asla bizim tarafımızdan kalıcı olarak saklanmaz. Kesin yaşam döngüsü şöyledir:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tarayıcıda çalışan araçlar**: sıfır iletim. Dosya tarayıcınız tarafından belleğe okunur, sonuç yerel olarak üretilir ve doğrudan indirirsiniz. Dosya hakkında hiçbir şeyi günlüğe kaydetmeyiz.",
              "**AI transkripsiyon / çeviri / OCR / phishing analizi**: dosya veya metin, Supabase Edge Function’a aktarılır, ardından ilgili AI sağlayıcısına (bkz. 7. bölüm) gerçek zamanlı olarak iletilir. Sonuç size geri döndürülür ve geçici yükleme arabelleği otuz (30) dakika içinde silinir. Özel depolama alanımıza yazılan sonuç dosyaları altmış (60) dakika boyunca imzalı URL ile erişilebilir ve fiziksel olarak otuz (30) dakika içinde silinir.",
              "**Parola ihlali kontrolcüsü**: parolanız hiçbir zaman tarayıcınızdan ayrılmaz. Yerel olarak SHA-1 ile özetlenir ve k-anonimlik kullanılarak HaveIBeenPwned’e sorgulanır — yalnızca özetin ilk 5 karakteri gönderilir. Parola ve tam özet hiçbir zaman iletilmez.",
              "**URL tarayıcısı / SSL kontrolcüsü**: yalnızca girdiğiniz URL veya ana bilgisayar adı iletilir (URL tarayıcısı için Google Safe Browsing’e, SSL kontrolcüsü için canlı bir TLS bağlantısı açmak için). Çevre sayfa içerikleri değil."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. İşleme için hukuki dayanaklar (GDPR Mad. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Sözleşmenin ifası** (Mad. 6(1)(b)) — bir hesap oluşturduğunuzda ve ücretli özellikleri kullandığınızda, işleme Hizmeti sunmak için gereklidir.",
              "**Meşru çıkarlar** (Mad. 6(1)(f)) — dolandırıcılık önleme, kötüye kullanım azaltma, temel güvenlik günlüğü ve Hizmeti iyileştirme.",
              "**Onay** (Mad. 6(1)(a)) — pazarlama e-postaları, isteğe bağlı analiz veya reklam çerezleri (etkinleştirildiğinde) ve gelecekteki isteğe bağlı entegrasyonlar.",
              "**Yasal yükümlülük** (Mad. 6(1)(c)) — Fransız vergi hukuku uyarınca fatura kayıtlarının on yıl boyunca saklanması."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. GDPR kapsamındaki haklarınız",
        "blocks": [
          {
            "kind": "p",
            "text": "27 Nisan 2016 tarihli Yönetmelik (AB) 2016/679 (\"GDPR\") kapsamında veri sahibi olarak aşağıdaki haklara sahipsiniz; herhangi bir zamanda ve ücretsiz olarak hesabınıza kayıtlı e-posta adresinden kullanabilirsiniz:"
          },
          {
            "kind": "ul",
            "items": [
              "**Erişim hakkı** (GDPR Mad. 15) — verilerinizin işlendiğine dair onay ve bir kopyasını alma.",
              "**Düzeltme hakkı** (GDPR Mad. 16) — yanlış veya eksik verilerin düzeltilmesi.",
              "**Silinme hakkı / unutulma hakkı** (GDPR Mad. 17) — işleme için hukuki dayanak kalmadığında verilerinizin silinmesi.",
              "**İşlemenin sınırlandırılması hakkı** (GDPR Mad. 18) — bir anlaşmazlık çözülene kadar işlemenin geçici olarak durdurulması.",
              "**Veri taşınabilirliği hakkı** (GDPR Mad. 20) — verilerinizi yapılandırılmış, makine tarafından okunabilir bir biçimde almak.",
              "**İtiraz hakkı** (GDPR Mad. 21) — meşru çıkarlarımıza dayalı işlemeye, özel durumunuza ilişkin gerekçelerle herhangi bir zamanda itiraz etme.",
              "**Onayın geri çekilmesi hakkı** (GDPR Mad. 7(3)) — onaya dayalı işleme için, onayı herhangi bir zamanda hukuki geçmişi etkilemeksizin geri çekebilirsiniz.",
              "**Otomatik karar almadan muaf olma hakkı** (GDPR Mad. 22) — hiçbir işlemimiz yalnızca otomatik kararlar yoluyla size hukuki sonuçlar doğurmaz."
            ]
          },
          {
            "kind": "p",
            "text": "Bu haklardan herhangi birini kullanmak için, hesabınıza kayıtlı adresten [support@konvertools.com](mailto:support@konvertools.com) adresine yazın. GDPR Mad. 12(3) uyarınca bir (1) ay içinde yanıt vereceğiz; özellikle karmaşık talepler için süreyi iki ay daha uzatabiliriz, bu durumda ilk ay içinde sizi bilgilendireceğiz."
          },
          {
            "kind": "p",
            "text": "Ayrıca **bir denetim makamına şikayette bulunma hakkına** sahipsiniz (GDPR Mad. 77). Fransa’daki kullanıcılar için bu, **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Fransa — telefon +33 (0)1 53 73 22 22 — çevrimiçi şikayetler için [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes) adresidir. Diğer AB/EEA üye devletlerindeki kullanıcılar, **ulusal denetim makamınıza** şikayette bulunabilirsiniz (liste Avrupa Veri Koruma Kurulu tarafından [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en) adresinde tutulmaktadır). Ayrıca GDPR Mad. 79 uyarınca yargı yoluna başvurabilirsiniz."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Üçüncü taraf işleyiciler",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmeti sunmak için aşağıdaki işleyicilerle sınırlı verileri paylaşmamız gerekmektedir. Her birinin, bizden aldıkları verileri nasıl işlediklerini düzenleyen kendi gizlilik politikası vardır."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (Singapur merkezli, projemiz için AB’de barındırılan) — kimlik doğrulama, veritabanı, dosya depolama ve Edge Functions. Hesap kimlik bilgilerinizi, profil verilerinizi ve (geçici olarak) sunucu destekli bir araç için yüklediğiniz herhangi bir dosyayı alır. Alt işleyicimiz olarak hareket eder.",
              "**Mistral AI** (Fransa) — çeviri, yeniden ifade etme, özetleme, AI insanlaştırma, phishing kalıbı analizi ve diğer metin görevleri için büyük dil modeli çıkarımı; ses transkripsiyonu (Voxtral); görüntü OCR ve Vision görevleri (Pixtral). Gönderdiğiniz metin veya görüntü, çıkarım için Mistral’e gönderilir. Mistral, API girdilerini modellerini eğitmek için **kullanmayacağına** dair sözleşmesel olarak taahhüt vermiştir.",
              "**Google Safe Browsing** (Google LLC, ABD) — yalnızca URL Tarayıcısını veya Phishing Tespitçisini kullandığınızda. Yalnızca gönderdiğiniz URL’ler (veya yapıştırdığınız e-postadan çıkarılan bağlantılar) iletilir. Kullandığımız tek üçüncü taraf güvenlik hizmeti budur.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — yalnızca Parola İhlali Kontrolcüsünü kullandığınızda ve yalnızca SHA-1 özetinizin ilk 5 karakteri (k-anonimlik) gönderilir. Tarayıcınızdan doğrudan sorgulanır, sunucularımızdan değil.",
              "**Stripe** (Stripe Payments Europe, Ltd., İrlanda) — ödeme işleme ve abonelik faturalandırması. Kart detaylarını **hiçbir şekilde görmüyor veya saklamıyoruz**. Stripe, e-posta adresinizi, ödeme yönteminizi, fatura adresinizi ve satın aldığınız planı alır.",
              "**Resend** (ABD) — işlemsel e-posta gönderimi (hesap onayı, ödeme makbuzu, parola sıfırlama). E-posta adresinizi ve gönderdiğimiz e-posta gövdesini alır.",
              "**Vercel** (ABD) — statik sayfalar için içerik dağıtım ağı. Yönlendirme ve kötüye kullanım önleme için standart web trafiği meta verilerini (IP, kullanıcı aracısı, istenen URL) alır. Vercel’in günlük saklama politikasına uygun olarak saklanır."
            ]
          },
          {
            "kind": "p",
            "text": "Bu işleyicilerden herhangi biri Avrupa Ekonomik Alanı dışında faaliyet gösteriyorsa, aktarımlar Avrupa Komisyonu’nun Standart Sözleşme Şartları (SCCs) veya eşdeğer bir aktarım mekanizması tarafından düzenlenir."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Çerezler ve benzer teknolojiler",
        "blocks": [
          {
            "kind": "p",
            "text": "Yalnızca aşağıdaki çerezleri ve yerel depolama öğelerini kullanırız:"
          },
          {
            "kind": "ul",
            "items": [
              "**Zorunlu**: NEXT_LOCALE (seçtiğiniz dili hatırlar) ve oturum açtığınızda Supabase oturum çerezleri (sb-*-auth-token). Bunlar GDPR kapsamında onaya gerek duymaz.",
              "**İsteğe bağlı reklamcılık**: reklam ortaklarımızı etkinleştirdiğimizde (şu anda kodumuzda Ezoic referans verilmekte ancak trafiğiniz için henüz etkinleştirilmemiştir), açık bir onay banner’ı gösterecek ve yalnızca onay verdiğinizde reklam çerezleri ayarlayacağız."
            ]
          },
          {
            "kind": "p",
            "text": "Şu anda herhangi bir analiz, izleme pikselleri veya yeniden pazarlama etiketleri çalıştırmıyoruz. Eğer eklersek, yukarıdaki çerez banner’ı bunları engelleyecektir."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. İşleme güvenliği (GDPR Mad. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Mad. 32 uyarınca, riske uygun teknik ve organizasyonel önlemleri uyguluyoruz:"
          },
          {
            "kind": "ul",
            "items": [
              "**İletimde şifreleme** — Hizmet’e gelen ve giden tüm trafik TLS 1.2 veya üzeri ile korunmaktadır.",
              "**Dinlenmede şifreleme** — Supabase, veritabanınızı (hesap verilerinizi de dahil) AES-256 ile şifreler.",
              "**Parola işleme** — parolanız Supabase Auth tarafından özetlenir ve aslı saklanmaz. Ayrıca yeni parolaları müşteri tarafında HaveIBeenPwned k-anonimlik API’sine kontrol ederek bilinen ihlal edilmiş parolaları reddediyoruz.",
              "**Ödeme verileri** — asla görmüyor veya saklamıyoruz; kart ödeme akışı tamamen Stripe’a (PCI-DSS Seviye 1 uyumlu) devredilmiştir.",
              "**Erişim kontrolü** — satır düzeyinde güvenlik politikaları bir kullanıcının diğerinin verilerini okumasını engeller; hizmet rolü anahtarları yalnızca Edge Functions’a sınırlıdır.",
              "**Dosya hijyeni** — yüklenen hiçbir dosya asla saklanmaz: tarayıcıda çalışan araçlar hiçbir şey iletmez, sunucu destekli araçlar geçici arabellekleri otuz dakika içinde siler.",
              "**Zafiyet yanıtı** — güvenlik sorunları [support@konvertools.com](mailto:support@konvertools.com) adresine gizlilik içinde bildirilebilir."
            ]
          },
          {
            "kind": "p",
            "text": "Bu önlemler rağmen, hiçbir sistem mükemmel güvenlikte değildir; herhangi bir çevrimiçi hizmetin doğasında bulunan kalıntı riski kabul edersiniz."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Veri minimizasyonu ve amaç sınırlaması (GDPR Mad. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "GDPR Mad. 5(1)(c) uyarınca, yalnızca bu Politikada belirtilen amaçlar için kesinlikle gerekli olan verileri toplarız. Somut olarak: IP adresinizi yalnızca geçici yönlendirme günlükleri dışında toplamıyoruz, tarayıcınızı parmak izinden almıyoruz, davranışsal analizler çalıştırmıyoruz ve işlediğiniz hiçbir dosyayı AI modellerini eğitmek için kullanmıyoruz. Özel kategori verileri (Mad. 9) veya suçla ilgili verileri (Mad. 10) toplamıyoruz. Veriler doğru ve güncel tutulur (Mad. 5(1)(d)); herhangi bir yanlışlığı hesabınızdaki kontrol panelinden veya [support@konvertools.com](mailto:support@konvertools.com) adresine yazarak düzeltebilirsiniz."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Saklama",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profil verileri: hesabınız var olduğu sürece saklanır, hesabın kapatılmasından otuz (30) gün içinde silinir.",
              "İş meta verileri: otomatik olarak iki (2) saat sonra silinir.",
              "Depolama alanındaki sonuç dosyaları: oluşturulduktan otuz (30) dakika içinde fiziksel olarak silinir.",
              "Fatura kayıtları: Fransız vergi yükümlülüklerine uymak için on (10) yıl boyunca saklanır.",
              "Onay kayıtları: hesabınızın süresi boyunca ve ardından beş (5) yıl daha yasal kanıt süresi boyunca saklanır."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Küçükler",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet **on altı (16) yaşın altındaki çocuklara yönelik değildir**. On altı yaşın altında iseniz hesap oluşturamazsınız. Küçüklerden veri toplamadığımızı biliyoruz; farkında olursak, verileri sileriz."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Politikadaki değişiklikler",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Gizlilik Politikasını zaman zaman değiştirebiliriz. Önemli değişiklikler, yürürlüğe girmeden en az otuz (30) gün önce hesap sahiplerine e-posta ile duyurulacaktır. En son sürüm her zaman [https://konvertools.com/privacy](https://konvertools.com/privacy) adresinde mevcuttur."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. İletişim",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu politika veya verileriniz hakkında herhangi bir sorunuz için — GDPR haklarınızın kullanımı dahil (bkz. 6. bölüm) — [support@konvertools.com](mailto:support@konvertools.com) adresine yazın. Bu tek posta kutusu gizlilik, güvenlik, faturalandırma ve genel destek sorularınız için iletişim noktamızdır. Fransız veri koruma kurumu CNIL’e (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) veya ikamet ettiğiniz ülkenin denetim makamına şikayette bulunabilirsiniz."
          }
        ]
      }
    ]
  },
  "id": {
    "h1": "Kebijakan Privasi",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Terakhir diperbarui: %DATE% · Berlaku segera untuk semua pengunjung dan pemegang akun.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Prinsip inti kami: kami tidak menyimpan file Anda",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (disebut sebagai \"Layanan\") dioperasikan sebagai rangkaian alat yang mengutamakan privasi. Komitmen terpenting yang kami buat adalah ini:"
          },
          {
            "kind": "ul",
            "items": [
              "**Alat berbasis peramban** (konverter gambar, alat PDF yang menggunakan pdf-lib, konversi audio dan video yang ditenagai oleh FFmpeg.wasm, alat kode, kalkulator, pembuat kode QR, pemeriksa kebocoran kata sandi, sebagian besar utilitas) dieksekusi **sepenuhnya di dalam peramban web Anda melalui WebAssembly**. File atau masukan Anda tidak pernah dikirimkan ke server kami. Kami tidak memiliki sarana teknis untuk membacanya.",
              "**Alat berbantuan server** (transkripsi AI, terjemahan AI, tugas teks AI, pembakaran subtitle video, pemindai URL, detektor phishing, pemeriksa sertifikat SSL, dan beberapa lainnya) memerlukan pengiriman sesuatu ke backend. Dalam setiap kasus, file atau teks diproses secara waktu nyata dan dihapus dari penyimpanan sementara dalam tiga puluh (30) menit.",
              "Kami tidak pernah menyimpan konten dari file yang diunggah di lokasi mana pun secara persisten, kami tidak pernah menggunakan unggahan Anda untuk melatih model AI, dan kami tidak pernah menjual, menyewakan, atau membagikannya kepada pihak ketiga untuk tujuan apa pun selain menyampaikan hasil yang Anda minta."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Pengendali data",
        "blocks": [
          {
            "kind": "p",
            "text": "Untuk kepentingan Peraturan Umum Perlindungan Data Uni Eropa (Regulation (EU) 2016/679, \"GDPR\"), pengendali data adalah penerbit Layanan. Kontak untuk pertanyaan privasi apa pun: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Data yang kami kumpulkan",
        "blocks": [
          {
            "kind": "p",
            "text": "Satu-satunya data pribadi yang kami simpan dalam database kami adalah:"
          },
          {
            "kind": "ul",
            "items": [
              "**Kredensial akun**: alamat email Anda; salinan kata sandi Anda yang diberi garam dan di-hash (dikelola oleh Supabase Auth — kami tidak pernah melihat atau menyimpan teks aslinya); nama tampilan dan URL avatar opsional jika Anda masuk menggunakan Google.",
              "**Status langganan**: rencana saat ini (gratis / Pro / Bisnis), pengidentifikasi pelanggan Stripe, dan tanggal pembaruan langganan terakhir Anda.",
              "**Penghitung penggunaan**: penghitung kuota teragregasi (mis. \"3 penggunaan AI hari ini\", \"420 penggunaan AI bulanan\") yang diperbarui di tempat pada baris profil Anda. Kami **tidak** mencatat rekaman per penggunaan.",
              "**Metadata pekerjaan (sementara)**: ketika alat berbantuan server menghasilkan keluaran (mis. file .srt dari transkripsi), kami mencatat nama alat, URL unduhan hasil, bahasa sumber, dan stempel waktu penyelesaian. Baris ini dihapus secara otomatis setelah **dua (2) jam**. Baris ini tidak pernah berisi konten file Anda.",
              "**Catatan persetujuan**: tanggal dan waktu saat Anda menerima Ketentuan dan Kebijakan Privasi kami, serta apakah Anda memilih untuk menerima email pemasaran. Disimpan selama masa akun Anda ditambah periode bukti hukum lima (5) tahun setelah penghapusan."
            ]
          },
          {
            "kind": "p",
            "text": "Kami **tidak** mengumpulkan: alamat IP Anda (selain penggunaan sementara yang dilakukan Supabase dan penyedia hosting kami untuk pembatasan laju dan pencatatan keamanan), sidik jari peramban Anda, peristiwa pelacakan perilaku, rekaman layar Anda, atau data biometrik apa pun."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. File yang Anda proses",
        "blocks": [
          {
            "kind": "p",
            "text": "Seperti yang dinyatakan di bagian 1, konten file yang Anda proses tidak pernah disimpan oleh kami. Siklus hidup yang tepat adalah:"
          },
          {
            "kind": "ul",
            "items": [
              "**Alat berbasis peramban**: tidak ada transmisi. File dibaca ke dalam memori oleh peramban Anda, hasil diproduksi secara lokal, dan Anda mengunduhnya langsung. Kami tidak mencatat apa pun tentang file itu sendiri.",
              "**Transkripsi / terjemahan / OCR AI / analisis phishing**: file atau teks dialirkan ke Fungsi Tepi Supabase kami, yang segera meneruskannya ke penyedia AI terkait (lihat bagian 7) untuk inferensi. Hasil dikembalikan kepada Anda dan buffer unggahan sementara dibuang. File hasil yang ditulis ke bucket penyimpanan pribadi kami dapat diakses melalui URL yang ditandatangani selama enam puluh (60) menit dan secara fisik dihapus dalam tiga puluh (30) menit setelah pembuatan.",
              "**Pemeriksa kebocoran kata sandi**: kata sandi Anda tidak pernah meninggalkan peramban Anda. Kami melakukan hash lokal dengan SHA-1 dan menanyakan HaveIBeenPwned menggunakan k-anonymity — hanya lima karakter pertama dari hash yang dikirim. Kata sandi dan hash lengkap tidak pernah ditransmisikan.",
              "**Pemindai URL / pemeriksa SSL**: hanya URL atau nama host yang Anda ketik yang ditransmisikan (ke Google Safe Browsing untuk pemindai URL, atau digunakan untuk membuka koneksi TLS langsung untuk pemeriksa SSL). Tidak ada konten halaman sekitarnya."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Dasar hukum pemrosesan (GDPR Pasal 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Pelaksanaan kontrak** (Pasal 6(1)(b)) — ketika Anda membuat akun dan menggunakan fitur berbayar, pemrosesan diperlukan untuk menyampaikan Layanan.",
              "**Kepentingan sah** (Pasal 6(1)(f)) — pencegahan penipuan, mitigasi penyalahgunaan, pencatatan keamanan dasar, dan peningkatan Layanan.",
              "**Persetujuan** (Pasal 6(1)(a)) — email pemasaran, cookie analitik atau iklan opsional (jika dan ketika diaktifkan), serta integrasi opsional di masa depan.",
              "**Kewajiban hukum** (Pasal 6(1)(c)) — penyimpanan catatan penagihan sebagaimana diwajibkan oleh hukum pajak Prancis (umumnya sepuluh tahun)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Hak Anda berdasarkan GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Sebagai subjek data berdasarkan Peraturan (EU) 2016/679 tanggal 27 April 2016 (\"GDPR\"), Anda memiliki hak-hak berikut, yang dapat dijalankan setiap saat dan tanpa biaya dari alamat email yang terdaftar di akun Anda:"
          },
          {
            "kind": "ul",
            "items": [
              "**Hak akses** (GDPR Pasal 15) — memperoleh konfirmasi bahwa kami memproses data Anda dan salinannya.",
              "**Hak perbaikan** (GDPR Pasal 16) — memiliki data yang tidak akurat atau tidak lengkap diperbaiki.",
              "**Hak penghapusan / hak untuk dilupakan** (GDPR Pasal 17) — memiliki data Anda dihapus ketika dasar hukum pemrosesan tidak lagi berlaku.",
              "**Hak pembatasan pemrosesan** (GDPR Pasal 18) — membekukan sementara pemrosesan selama sengketa diselesaikan.",
              "**Hak portabilitas data** (GDPR Pasal 20) — menerima data Anda dalam format terstruktur yang dapat dibaca mesin.",
              "**Hak untuk menolak** (GDPR Pasal 21) — menolak, setiap saat, berdasarkan keadaan khusus Anda, terhadap pemrosesan yang didasarkan pada kepentingan sah kami.",
              "**Hak untuk menarik persetujuan** (GDPR Pasal 7(3)) — untuk pemrosesan yang didasarkan pada persetujuan, menariknya setiap saat tanpa mempengaruhi keabsahan pemrosesan sebelumnya.",
              "**Hak untuk tidak menjadi subjek keputusan otomatis** (GDPR Pasal 22) — tidak ada pemrosesan kami yang melibatkan keputusan otomatis semata yang menghasilkan efek hukum bagi Anda."
            ]
          },
          {
            "kind": "p",
            "text": "Untuk menjalankan hak-hak ini, tulislah ke [support@konvertools.com](mailto:support@konvertools.com) dari alamat yang terdaftar di akun Anda. Kami akan menanggapi dalam satu (1) bulan, sebagaimana disyaratkan oleh GDPR Pasal 12(3); periode dapat diperpanjang hingga dua bulan lagi untuk permintaan yang sangat kompleks, dalam hal ini kami akan memberi tahu Anda dalam bulan pertama."
          },
          {
            "kind": "p",
            "text": "Anda juga memiliki **hak untuk mengajukan pengaduan kepada otoritas pengawas** (GDPR Pasal 77). Untuk pengguna di Prancis, ini adalah **Komisi Nasional untuk Informatika dan Kebebasan (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Prancis — telepon +33 (0)1 53 73 22 22 — pengaduan online di [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Untuk pengguna di negara-negara anggota UE/EEA lainnya, Anda dapat mengajukan pengaduan kepada **otoritas pengawas nasional Anda** (daftarnya tersedia di situs web Dewan Eropa Perlindungan Data di [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Anda juga dapat mencari upaya hukum berdasarkan GDPR Pasal 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Pemroses pihak ketiga",
        "blocks": [
          {
            "kind": "p",
            "text": "Penyampaian Layanan memerlukan kami untuk membagikan data yang sangat terbatas kepada pemroses berikut. Masing-masing memiliki kebijakan privasi sendiri yang mengatur cara mereka menangani data yang mereka terima dari kami."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (berbadan hukum Singapura, dihosting di UE untuk proyek kami) — otentikasi, basis data, penyimpanan file, dan Fungsi Tepi. Menerima kredensial akun, data profil, dan (sementara) file apa pun yang Anda unggah untuk alat berbantuan server. Bertindak sebagai sub-pemroses kami.",
              "**Mistral AI** (Prancis) — inferensi model bahasa besar untuk terjemahan, perampingan, ringkasan, humanisasi AI, analisis pola phishing, dan tugas teks lainnya; transkripsi audio (Voxtral); tugas OCR dan Vision gambar (Pixtral). Teks atau gambar yang Anda kirim dikirimkan ke Mistral untuk inferensi. Mistral telah berkomitmen secara kontraktual untuk **tidak** menggunakan masukan API untuk melatih modelnya.",
              "**Google Safe Browsing** (Google LLC, AS) — hanya ketika Anda menggunakan Pemindai URL atau Detektor Phishing. Hanya URL yang Anda kirim (atau tautan yang diekstrak dari email yang Anda tempel) yang ditransmisikan. Ini adalah satu-satunya layanan keamanan pihak ketiga yang kami gunakan.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — hanya ketika Anda menggunakan Pemeriksa Kebocoran Kata Sandi, dan hanya lima karakter pertama dari hash SHA-1 kata sandi Anda (k-anonymity). Dikueri langsung dari peramban Anda, bukan melalui server kami.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irlandia) — pemrosesan pembayaran dan penagihan langganan. Kami **tidak pernah melihat atau menyimpan** detail kartu Anda. Stripe menerima email, metode pembayaran, alamat penagihan, dan rencana yang Anda beli.",
              "**Resend** (AS) — pengiriman email transaksional (konfirmasi akun, tanda terima pembayaran, reset kata sandi). Menerima alamat email dan isi email yang kami kirim.",
              "**Vercel** (AS) — jaringan pengiriman konten untuk halaman statis. Menerima metadata lalu lintas web standar (IP, agen pengguna, URL yang diminta) untuk perutean dan pencegahan penyalahgunaan. Disimpan sesuai dengan kebijakan retensi log Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Di mana pun pemroses ini beroperasi di luar Kawasan Ekonomi Eropa, transfer tunduk pada Klausul Kontrak Standar (SCCs) Komisi Eropa atau mekanisme transfer setara."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookie dan teknologi serupa",
        "blocks": [
          {
            "kind": "p",
            "text": "Kami hanya menggunakan cookie dan item penyimpanan lokal berikut:"
          },
          {
            "kind": "ul",
            "items": [
              "**Esensial**: NEXT_LOCALE (mengingat bahasa pilihan Anda), dan cookie sesi Supabase (sb-*-auth-token) ketika Anda masuk. Ini tidak memerlukan persetujuan berdasarkan GDPR.",
              "**Iklan opsional**: jika dan ketika kami mengaktifkan mitra iklan (saat ini Ezoic dirujuk dalam kode kami tetapi belum diaktifkan untuk lalu lintas Anda), kami akan menampilkan banner persetujuan yang jelas dan hanya menetapkan cookie iklan setelah Anda memilih untuk menerimanya."
            ]
          },
          {
            "kind": "p",
            "text": "Kami saat ini tidak menjalankan analitik, pixel pelacakan, atau tag remarketing apa pun. Jika kami menambahkannya, banner cookie di atas akan mengaturnya."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Keamanan pemrosesan (GDPR Pasal 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "Sesuai dengan GDPR Pasal 32, kami menerapkan tindakan teknis dan organisasi yang tepat untuk memastikan tingkat keamanan yang sesuai dengan risiko:"
          },
          {
            "kind": "ul",
            "items": [
              "**Enkripsi dalam transit** — semua lalu lintas ke dan dari Layanan dilindungi oleh TLS 1.2 atau lebih tinggi.",
              "**Enkripsi saat istirahat** — Supabase mengenkripsi basis data yang mendasarinya (termasuk data akun Anda) dengan AES-256.",
              "**Penanganan kata sandi** — kata sandi Anda di-hash oleh Supabase Auth dan tidak pernah disimpan dalam bentuk asli. Kami juga memeriksa kata sandi baru terhadap API k-anonymity HaveIBeenPwned secara klien untuk menolak kata sandi yang diketahui telah bocor.",
              "**Data pembayaran** — tidak pernah dilihat atau disimpan oleh kami; alur pembayaran kartu sepenuhnya didelegasikan ke Stripe (PCI-DSS Level 1 compliant).",
              "**Kontrol akses** — kebijakan keamanan tingkat baris mencegah satu pengguna membaca data pengguna lain; kunci peran layanan dibatasi untuk Fungsi Tepi.",
              "**Kebersihan file** — tidak ada file yang diunggah yang pernah disimpan: alat berbasis peramban tidak pernah mentransmisikan apa pun, dan alat berbantuan server menghapus buffer sementara dalam 30 menit.",
              "**Respons kerentanan** — masalah keamanan dapat dilaporkan secara rahasia ke [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Meskipun ada tindakan ini, tidak ada sistem yang benar-benar aman; Anda menerima risiko residual yang melekat pada layanan online apa pun."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Minimisasi data dan pembatasan tujuan (GDPR Pasal 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "Sesuai dengan GDPR Pasal 5(1)(c), kami hanya mengumpulkan data yang sangat diperlukan untuk tujuan yang ditetapkan dalam Kebijakan ini. Secara konkret: kami tidak mengumpulkan alamat IP Anda di luar log routing sementara, kami tidak melakukan sidik jari peramban Anda, kami tidak menjalankan analitik perilaku, dan kami tidak pernah menggunakan file apa pun yang Anda proses untuk melatih model AI. Kami tidak mengumpulkan data kategori khusus (Pasal 9) atau data yang berkaitan dengan tindak pidana (Pasal 10). Data disimpan akurat dan terkini (Pasal 5(1)(d)); Anda dapat memperbaiki ketidakakuratan apa pun setiap saat melalui dasbor Anda atau dengan menghubungi [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Retensi",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Data profil: disimpan selama akun Anda ada, dihapus dalam tiga puluh (30) hari setelah penutupan akun.",
              "Metadata pekerjaan: dihapus secara otomatis setelah dua (2) jam.",
              "File hasil di bucket penyimpanan: dihapus secara fisik dalam tiga puluh (30) menit setelah pembuatan.",
              "Catatan penagihan: disimpan selama sepuluh (10) tahun untuk mematuhi kewajiban pajak Prancis.",
              "Catatan persetujuan: disimpan selama masa akun Anda ditambah lima (5) tahun setelahnya sebagai bukti hukum."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Anak di bawah umur",
        "blocks": [
          {
            "kind": "p",
            "text": "Layanan **tidak ditujukan untuk anak di bawah enam belas (16) tahun**. Jika Anda berada di bawah usia tersebut, Anda tidak boleh membuat akun. Kami tidak dengan sengaja mengumpulkan data dari anak di bawah umur; jika kami mengetahui hal itu, kami akan menghapusnya."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Perubahan pada kebijakan ini",
        "blocks": [
          {
            "kind": "p",
            "text": "Kami dapat mengubah Kebijakan Privasi ini sewaktu-waktu. Perubahan substansial akan diumumkan melalui email kepada pemegang akun setidaknya tiga puluh (30) hari sebelum diberlakukan. Versi terbaru selalu tersedia di [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Kontak",
        "blocks": [
          {
            "kind": "p",
            "text": "Untuk pertanyaan apa pun tentang kebijakan ini atau data Anda — termasuk pelaksanaan hak-hak GDPR Anda (lihat bagian 6) — tulislah ke [support@konvertools.com](mailto:support@konvertools.com). Kotak surat tunggal ini adalah titik kontak kami untuk pertanyaan privasi, keamanan, penagihan, dan dukungan umum. Anda juga dapat mengajukan pengaduan kepada otoritas perlindungan data Prancis CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) atau kepada otoritas pengawas negara tempat tinggal Anda."
          }
        ]
      }
    ]
  },
  "vi": {
    "h1": "Chính sách Bảo mật",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Cập nhật lần cuối: %DATE% · Có hiệu lực ngay lập tức đối với tất cả khách truy cập và chủ tài khoản.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Nguyên tắc cốt lõi của chúng tôi: chúng tôi không lưu trữ tệp của bạn",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (dịch vụ \"Dịch vụ\") hoạt động như một bộ công cụ ưu tiên quyền riêng tư. Cam kết quan trọng nhất mà chúng tôi đưa ra là:"
          },
          {
            "kind": "ul",
            "items": [
              "**Công cụ chỉ chạy trên trình duyệt** (công cụ chuyển đổi hình ảnh, công cụ PDF sử dụng pdf-lib, chuyển đổi âm thanh và video bằng FFmpeg.wasm, công cụ mã, máy tính, tạo mã QR, công cụ kiểm tra vi phạm mật khẩu, hầu hết các tiện ích) hoạt động **hoàn toàn trong trình duyệt web của bạn thông qua WebAssembly**. Tệp hoặc đầu vào của bạn không bao giờ được truyền đến máy chủ của chúng tôi. Chúng tôi không có phương tiện kỹ thuật nào để đọc nó.",
              "**Công cụ hỗ trợ từ máy chủ** (chuyển ngữ AI, dịch thuật AI, tác vụ văn bản AI, chèn phụ đề video, trình quét URL, trình phát hiện lừa đảo, trình kiểm tra chứng chỉ SSL và một số công cụ khác) cần gửi dữ liệu đến hệ thống phụ trợ. Trong mọi trường hợp, tệp hoặc văn bản được xử lý theo thời gian thực và bị xóa khỏi bộ nhớ tạm trong vòng ba mươi (30) phút.",
              "Chúng tôi không bao giờ lưu trữ nội dung của bất kỳ tệp tải lên nào ở bất kỳ vị trí bền vững nào, không bao giờ sử dụng các tệp tải lên của bạn để đào tạo mô hình AI, và không bao giờ bán, cho thuê hoặc chia sẻ chúng với bên thứ ba vì bất kỳ mục đích nào ngoài việc cung cấp kết quả bạn yêu cầu."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Đơn vị kiểm soát dữ liệu",
        "blocks": [
          {
            "kind": "p",
            "text": "Theo quy định của Quy định chung về Bảo vệ Dữ liệu của EU (Quy định (EU) 2016/679, \"GDPR\"), đơn vị kiểm soát dữ liệu là nhà xuất bản Dịch vụ. Liên hệ cho bất kỳ thắc mắc về quyền riêng tư: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Dữ liệu chúng tôi thu thập",
        "blocks": [
          {
            "kind": "p",
            "text": "Dữ liệu cá nhân duy nhất mà chúng tôi lưu trữ trong cơ sở dữ liệu là:"
          },
          {
            "kind": "ul",
            "items": [
              "**Thông tin đăng nhập tài khoản**: địa chỉ email của bạn; bản sao băm có muối của mật khẩu (được quản lý bởi Supabase Auth — chúng tôi không bao giờ nhìn thấy hoặc lưu trữ mật khẩu dạng văn bản thuần); tên hiển thị tùy chọn và URL hình đại diện nếu bạn đăng nhập bằng Google.",
              "**Trạng thái đăng ký**: gói hiện tại (miễn phí / Pro / Doanh nghiệp), mã khách hàng Stripe, và ngày gia hạn gần nhất của bạn.",
              "**Bộ đếm sử dụng**: bộ đếm hạn ngạch đã tổng hợp (ví dụ: \"3 lần chạy AI hôm nay\", \"420 lần chạy AI hàng tháng đã sử dụng\") được cập nhật tại chỗ trên hàng hồ sơ của bạn. Chúng tôi **không** ghi lại các bản ghi cho mỗi lần chạy.",
              "**Siêu dữ liệu công việc (tạm thời)**: khi một công cụ hỗ trợ từ máy chủ tạo ra đầu ra (ví dụ: tệp .srt từ chuyển ngữ), chúng tôi ghi lại tên công cụ, URL tải xuống kết quả, ngôn ngữ nguồn và dấu thời gian hoàn thành. Các hàng này được tự động xóa sau **hai (2) giờ**. Chúng không bao giờ chứa nội dung tệp của bạn.",
              "**Bản ghi sự đồng thuận**: ngày và giờ bạn chấp nhận Điều khoản và Chính sách Bảo mật của chúng tôi, cũng như liệu bạn có chọn nhận email tiếp thị hay không. Được lưu giữ trong suốt thời gian tồn tại tài khoản của bạn cộng với khoảng thời gian bằng chứng pháp lý là năm (5) năm sau khi xóa."
            ]
          },
          {
            "kind": "p",
            "text": "Chúng tôi **không** thu thập: địa chỉ IP của bạn (ngoài việc sử dụng tạm thời mà Supabase và nhà cung cấp lưu trữ của chúng tôi thực hiện cho mục đích giới hạn tốc độ và ghi nhật ký bảo mật), dấu vân tay trình duyệt, sự kiện theo dõi hành vi, ghi hình màn hình của bạn hoặc bất kỳ dữ liệu sinh trắc học nào."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Tệp bạn xử lý",
        "blocks": [
          {
            "kind": "p",
            "text": "Như đã nêu trong mục 1, nội dung tệp bạn xử lý không bao giờ được chúng tôi lưu trữ. Vòng đời chính xác như sau:"
          },
          {
            "kind": "ul",
            "items": [
              "**Công cụ chỉ chạy trên trình duyệt**: không truyền tải. Tệp được đọc vào bộ nhớ bởi trình duyệt của bạn, kết quả được tạo cục bộ và bạn tải xuống trực tiếp. Chúng tôi không ghi nhật ký bất cứ điều gì về bản thân tệp.",
              "**Chuyển ngữ / dịch thuật / OCR AI / phân tích lừa đảo**: tệp hoặc văn bản được truyền theo luồng đến Edge Function của Supabase, nơi ngay lập tức chuyển tiếp đến nhà cung cấp AI liên quan (xem mục 7) để suy luận. Kết quả được trả về cho bạn và bộ đệm tải lên tạm thời bị loại bỏ. Các tệp kết quả được ghi vào bộ lưu trữ riêng của chúng tôi có thể truy cập thông qua URL ký trong vòng sáu mươi (60) phút và bị xóa vật lý trong vòng ba mươi (30) phút sau khi tạo.",
              "**Công cụ kiểm tra vi phạm mật khẩu**: mật khẩu của bạn không bao giờ rời khỏi trình duyệt. Chúng tôi băm nó cục bộ bằng SHA-1 và truy vấn HaveIBeenPwned bằng phương pháp k-anonymity — chỉ năm (5) ký tự đầu tiên của hàm băm được gửi. Mật khẩu và hàm băm đầy đủ không bao giờ được truyền tải.",
              "**Trình quét URL / trình kiểm tra SSL**: chỉ URL hoặc tên máy chủ bạn nhập được truyền tải (đến Google Safe Browsing cho trình quét URL, hoặc được sử dụng để mở kết nối TLS trực tiếp cho trình kiểm tra SSL). Không có nội dung trang xung quanh."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Cơ sở pháp lý xử lý (GDPR Điều 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Thực hiện hợp đồng** (Điều 6(1)(b)) — khi bạn tạo tài khoản và sử dụng các tính năng trả phí, xử lý là cần thiết để cung cấp Dịch vụ.",
              "**Lợi ích hợp pháp** (Điều 6(1)(f)) — ngăn chặn gian lận, giảm thiểu lạm dụng, ghi nhật ký bảo mật cơ bản và cải thiện Dịch vụ.",
              "**Sự đồng thuận** (Điều 6(1)(a)) — email tiếp thị, cookie phân tích hoặc quảng cáo tùy chọn (nếu và khi được bật), và bất kỳ tích hợp tùy chọn nào trong tương lai.",
              "**Nghĩa vụ pháp lý** (Điều 6(1)(c)) — lưu giữ hồ sơ thanh toán theo yêu cầu của luật thuế Pháp (thường là mười năm)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Quyền của bạn theo GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Là chủ thể dữ liệu theo Quy định (EU) 2016/679 ngày 27 tháng 4 năm 2016 (\"GDPR\"), bạn được hưởng các quyền sau đây, có thể thực hiện bất kỳ lúc nào và miễn phí từ địa chỉ email đã đăng ký trên tài khoản của bạn:"
          },
          {
            "kind": "ul",
            "items": [
              "**Quyền truy cập** (GDPR Điều 15) — xác nhận rằng chúng tôi xử lý dữ liệu của bạn và nhận bản sao của nó.",
              "**Quyền sửa chữa** (GDPR Điều 16) — sửa dữ liệu không chính xác hoặc không đầy đủ.",
              "**Quyền xóa / quyền được quên** (GDPR Điều 17) — xóa dữ liệu của bạn khi cơ sở pháp lý xử lý không còn áp dụng.",
              "**Quyền hạn chế xử lý** (GDPR Điều 18) — tạm dừng xử lý trong khi tranh chấp được giải quyết.",
              "**Quyền di chuyển dữ liệu** (GDPR Điều 20) — nhận dữ liệu của bạn ở định dạng có cấu trúc, có thể đọc bằng máy.",
              "**Quyền phản đối** (GDPR Điều 21) — phản đối bất kỳ lúc nào, dựa trên tình huống cụ thể của bạn, đối với xử lý dựa trên lợi ích hợp pháp của chúng tôi.",
              "**Quyền rút lại sự đồng thuận** (GDPR Điều 7(3)) — đối với xử lý dựa trên sự đồng thuận, rút lại bất kỳ lúc nào mà không ảnh hưởng đến tính hợp pháp của xử lý trước đó.",
              "**Quyền không chịu quyết định tự động** (GDPR Điều 22) — không có xử lý nào của chúng tôi liên quan đến quyết định tự động duy nhất tạo ra hiệu lực pháp lý đối với bạn."
            ]
          },
          {
            "kind": "p",
            "text": "Để thực hiện bất kỳ quyền nào trong số này, hãy viết thư đến [support@konvertools.com](mailto:support@konvertools.com) từ địa chỉ đã đăng ký trên tài khoản của bạn. Chúng tôi sẽ phản hồi trong vòng một (1) tháng, theo yêu cầu của GDPR Điều 12(3); thời hạn có thể được gia hạn thêm hai tháng đối với các yêu cầu đặc biệt phức tạp, trong trường hợp đó chúng tôi sẽ thông báo cho bạn trong tháng đầu tiên."
          },
          {
            "kind": "p",
            "text": "Bạn cũng có **quyền khiếu nại lên cơ quan giám sát** (GDPR Điều 77). Đối với người dùng tại Pháp, đây là **Ủy ban Quốc gia về Tin học và Tự do (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Pháp — điện thoại +33 (0)1 53 73 22 22 — khiếu nại trực tuyến tại [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Đối với người dùng ở các quốc gia thành viên EU/EEA khác, bạn có thể khiếu nại lên **cơ quan giám sát quốc gia của mình** (danh sách do Ủy ban Châu Âu về Bảo vệ Dữ liệu duy trì tại [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Bạn cũng có thể tìm kiếm biện pháp khắc phục tư pháp theo GDPR Điều 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Nhà xử lý bên thứ ba",
        "blocks": [
          {
            "kind": "p",
            "text": "Việc cung cấp Dịch vụ yêu cầu chúng tôi chia sẻ dữ liệu hạn chế với các nhà xử lý sau đây. Mỗi bên có chính sách bảo mật riêng điều chỉnh cách họ xử lý dữ liệu nhận được từ chúng tôi."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (đăng ký tại Singapore, lưu trữ tại EU cho dự án của chúng tôi) — xác thực, cơ sở dữ liệu, lưu trữ tệp và Edge Functions. Nhận thông tin đăng nhập tài khoản, dữ liệu hồ sơ và (tạm thời) bất kỳ tệp nào bạn tải lên cho công cụ hỗ trợ từ máy chủ. Đóng vai trò là nhà xử lý phụ của chúng tôi.",
              "**Mistral AI** (Pháp) — suy luận mô hình ngôn ngữ lớn cho dịch thuật, diễn giải, tóm tắt, công cụ nhân hóa AI, phân tích mẫu lừa đảo và các tác vụ văn bản khác; chuyển ngữ âm thanh (Voxtral); OCR hình ảnh và tác vụ thị giác (Pixtral). Văn bản hoặc hình ảnh bạn gửi được gửi đến Mistral để suy luận. Mistral đã cam kết hợp đồng **không** sử dụng đầu vào API để đào tạo mô hình của mình.",
              "**Google Safe Browsing** (Google LLC, Hoa Kỳ) — chỉ khi bạn sử dụng Trình quét URL hoặc Trình phát hiện lừa đảo. Chỉ các URL bạn gửi (hoặc liên kết trích xuất từ email bạn dán) được truyền tải. Đây là dịch vụ bảo mật của bên thứ ba duy nhất mà chúng tôi sử dụng.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — chỉ khi bạn sử dụng Công cụ kiểm tra vi phạm mật khẩu, và chỉ năm (5) ký tự đầu tiên của hàm băm SHA-1 mật khẩu của bạn (phương pháp k-anonymity). Truy vấn trực tiếp từ trình duyệt của bạn, không thông qua máy chủ của chúng tôi.",
              "**Stripe** (Stripe Payments Europe, Ltd., Ireland) — xử lý thanh toán và lập hóa đơn đăng ký. Chúng tôi **không bao giờ nhìn thấy hoặc lưu trữ** chi tiết thẻ của bạn. Stripe nhận địa chỉ email, phương thức thanh toán, địa chỉ thanh toán và gói bạn đã mua.",
              "**Resend** (Hoa Kỳ) — cung cấp email giao dịch (xác nhận tài khoản, biên lai thanh toán, đặt lại mật khẩu). Nhận địa chỉ email của bạn và nội dung email chúng tôi gửi.",
              "**Vercel** (Hoa Kỳ) — mạng phân phối nội dung cho các trang tĩnh. Nhận siêu dữ liệu lưu lượng web tiêu chuẩn (IP, user-agent, URL được yêu cầu) để định tuyến và ngăn chặn lạm dụng. Được lưu giữ theo chính sách lưu giữ nhật ký của Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Nếu bất kỳ nhà xử lý nào trong số này hoạt động bên ngoài Khu vực Kinh tế Châu Âu, việc chuyển dữ liệu được điều chỉnh bởi Các điều khoản Hợp đồng Tiêu chuẩn (SCCs) của Ủy ban Châu Âu hoặc cơ chế chuyển dữ liệu tương đương."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookie và công nghệ tương tự",
        "blocks": [
          {
            "kind": "p",
            "text": "Chúng tôi chỉ sử dụng các cookie và mục lưu trữ cục bộ sau đây:"
          },
          {
            "kind": "ul",
            "items": [
              "**Cần thiết**: NEXT_LOCALE (ghi nhớ ngôn ngữ bạn chọn) và cookie phiên Supabase (sb-*-auth-token) khi bạn đăng nhập. Những cookie này không yêu cầu sự đồng thuận theo GDPR.",
              "**Quảng cáo tùy chọn**: nếu và khi chúng tôi bật đối tác quảng cáo (hiện tại Ezoic được tham chiếu trong mã của chúng tôi nhưng chưa được kích hoạt cho lưu lượng truy cập của bạn), chúng tôi sẽ hiển thị biểu ngữ đồng thuận rõ ràng và chỉ đặt cookie quảng cáo sau khi bạn chọn nhận."
            ]
          },
          {
            "kind": "p",
            "text": "Hiện tại chúng tôi không chạy bất kỳ phân tích, pixel theo dõi hoặc thẻ remarketing nào. Nếu chúng tôi thêm bất kỳ tính năng nào, biểu ngữ cookie ở trên sẽ kiểm soát chúng."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Bảo mật xử lý (GDPR Điều 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "Theo GDPR Điều 32, chúng tôi thực hiện các biện pháp kỹ thuật và tổ chức phù hợp để đảm bảo mức độ bảo mật phù hợp với rủi ro:"
          },
          {
            "kind": "ul",
            "items": [
              "**Mã hóa trong quá trình truyền tải** — tất cả lưu lượng truy cập đến và đi từ Dịch vụ được bảo vệ bởi TLS 1.2 trở lên.",
              "**Mã hóa khi lưu trữ** — Supabase mã hóa cơ sở dữ liệu bên dưới (bao gồm cả dữ liệu tài khoản của bạn) bằng AES-256.",
              "**Xử lý mật khẩu** — mật khẩu của bạn được băm bởi Supabase Auth và không bao giờ được lưu trữ ở dạng văn bản thuần. Chúng tôi bổ sung kiểm tra mật khẩu mới chống lại API k-anonymity của HaveIBeenPwned phía máy khách để từ chối mật khẩu đã bị xâm phạm.",
              "**Dữ liệu thanh toán** — không bao giờ được chúng tôi nhìn thấy hoặc lưu trữ; quy trình thanh toán thẻ được ủy quyền hoàn toàn cho Stripe (tuân thủ PCI-DSS Cấp 1).",
              "**Kiểm soát truy cập** — chính sách bảo mật cấp hàng ngăn người dùng này đọc dữ liệu của người dùng khác; khóa vai trò dịch vụ bị hạn chế đối với Edge Functions.",
              "**Vệ sinh tệp** — không có tệp tải lên nào được lưu giữ: công cụ chỉ chạy trên trình duyệt không bao giờ truyền bất cứ thứ gì, và công cụ hỗ trợ từ máy chủ xóa bộ đệm tạm trong vòng 30 phút.",
              "**Phản ứng lỗ hổng bảo mật** — các vấn đề bảo mật có thể được báo cáo bí mật đến [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Bất chấp các biện pháp này, không có hệ thống nào là hoàn toàn an toàn; bạn chấp nhận rủi ro tồn tại vốn có của bất kỳ dịch vụ trực tuyến nào."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Giảm thiểu dữ liệu và giới hạn mục đích (GDPR Điều 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "Theo GDPR Điều 5(1)(c), chúng tôi chỉ thu thập dữ liệu cần thiết cho các mục đích đã nêu trong Chính sách này. Cụ thể: chúng tôi không thu thập địa chỉ IP của bạn ngoài nhật ký định tuyến tạm thời, không lấy dấu vân tay trình duyệt, không chạy phân tích hành vi, và không bao giờ sử dụng bất kỳ tệp nào bạn xử lý để đào tạo mô hình AI. Chúng tôi không thu thập dữ liệu danh mục đặc biệt (Điều 9) hoặc dữ liệu liên quan đến tội phạm (Điều 10). Dữ liệu được giữ chính xác và cập nhật (Điều 5(1)(d)); bạn có thể sửa bất kỳ dữ liệu không chính xác nào bất kỳ lúc nào thông qua bảng điều khiển của mình hoặc bằng cách liên hệ với [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Lưu giữ dữ liệu",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dữ liệu hồ sơ: được lưu giữ trong khi tài khoản của bạn tồn tại, xóa trong vòng ba mươi (30) ngày sau khi đóng tài khoản.",
              "Siêu dữ liệu công việc: tự động xóa sau hai (2) giờ.",
              "Tệp kết quả trong bộ lưu trữ: bị xóa vật lý trong vòng ba mươi (30) phút sau khi tạo.",
              "Hồ sơ thanh toán: được lưu giữ trong mười (10) năm để tuân thủ nghĩa vụ thuế của Pháp.",
              "Bản ghi sự đồng thuận: được lưu giữ trong suốt thời gian tồn tại tài khoản của bạn cộng với năm (5) năm sau đó như bằng chứng pháp lý."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Trẻ vị thành niên",
        "blocks": [
          {
            "kind": "p",
            "text": "Dịch vụ **không nhằm vào trẻ em dưới mười sáu (16) tuổi**. Nếu bạn dưới độ tuổi đó, bạn không được tạo tài khoản. Chúng tôi không thu thập dữ liệu từ trẻ vị thành niên một cách có chủ ý; nếu chúng tôi phát hiện ra điều đó, chúng tôi sẽ xóa dữ liệu đó."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Thay đổi đối với chính sách này",
        "blocks": [
          {
            "kind": "p",
            "text": "Chúng tôi có thể sửa đổi Chính sách Bảo mật này theo thời gian. Những thay đổi quan trọng sẽ được thông báo qua email cho chủ tài khoản ít nhất ba mươi (30) ngày trước khi có hiệu lực. Phiên bản mới nhất luôn có sẵn tại [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Liên hệ",
        "blocks": [
          {
            "kind": "p",
            "text": "Mọi thắc mắc về chính sách này hoặc dữ liệu của bạn — bao gồm cả việc thực hiện bất kỳ quyền GDPR nào của bạn (xem mục 6) — hãy viết thư đến [support@konvertools.com](mailto:support@konvertools.com). Hòm thư này là điểm liên hệ duy nhất của chúng tôi cho các thắc mắc về quyền riêng tư, bảo mật, thanh toán và hỗ trợ chung. Bạn cũng có thể khiếu nại lên Ủy ban Bảo vệ Dữ liệu Pháp CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) hoặc với cơ quan giám sát của quốc gia cư trú của bạn."
          }
        ]
      }
    ]
  },
  "sv": {
    "h1": "Integritetspolicy",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Senast uppdaterad: %DATE% · Gäller omedelbart för alla besökare och kontoinnehavare.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Vår grundläggande princip: vi lagrar inte dina filer",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (\"Tjänsten\") drivs som en integritetsfokuserad verktygslåda. Det viktigaste åtagandet vi gör är detta:"
          },
          {
            "kind": "ul",
            "items": [
              "**Enbart webbläsarbaserade verktyg** (bildkonverterare, PDF-verktyg som använder pdf-lib, ljud- och videokonverteringar drivna av FFmpeg.wasm, kodverktyg, miniräknare, QR-generering, lösenordsskyddsverktyget, de flesta verktygen) körs **helt och hållet i din webbläsare via WebAssembly**. Din fil eller inmatning skickas aldrig till våra servrar. Vi har inga tekniska möjligheter att läsa den.",
              "**Serverassisterade verktyg** (AI-transkribering, AI-översättning, AI-textuppgifter, inbränning av videounderskrifter, URL-skannern, phishingdetektorn, SSL-certifikatkontroll och ett fåtal andra) behöver skicka något till en backend. I samtliga fall bearbetas filen eller texten i realtid och raderas från tillfällig lagring inom trettio (30) minuter.",
              "Vi lagrar aldrig innehållet i någon uppladdad fil på någon beständig plats, vi använder aldrig dina uppladdningar för att träna AI-modeller, och vi säljer, hyr ut eller delar dem med tredje part för något annat syfte än att leverera det resultat du begärt."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Dataskyddsansvarig",
        "blocks": [
          {
            "kind": "p",
            "text": "För ändamål enligt EU:s allmänna dataskyddsförordning (Förordning (EU) 2016/679, \"GDPR\"), är den dataskyddsansvarige utgivaren av Tjänsten. Kontakt för eventuella integritetsfrågor: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Vad vi samlar in",
        "blocks": [
          {
            "kind": "p",
            "text": "Den enda personliga information vi lagrar i vår databas är:"
          },
          {
            "kind": "ul",
            "items": [
              "**Kontouppgifter**: din e-postadress; en saltad, hashad kopia av ditt lösenord (hanterat av Supabase Auth — vi ser eller lagrar aldrig det i klartext); valfritt visningsnamn och avatar-URL om du loggar in med Google.",
              "**Abonnemangsstatus**: aktuell plan (gratis / Pro / Business), Stripe-kundidentifierare och datum för dina senaste förnyelser.",
              "**Användningsräknare**: aggregerade kvoträknare (t.ex. \"3 AI-körningar använda idag\", \"420 AI-körningar använda denna månad\") som uppdateras direkt i din profilsrad. Vi loggar **inte** per-körningsposter.",
              "**Jobbmetadata (övergående)**: när ett serverassisterat verktyg producerar ett resultat (t.ex. en .srt-fil från transkribering) lagrar vi verktygets namn, nedladdnings-URL för resultatet, källspråket och en slutförningstidpunkt. Dessa rader raderas automatiskt efter **två (2) timmar**. De innehåller aldrig innehållet i din fil.",
              "**Samtyckesposter**: datum och tidpunkt för när du accepterade dessa villkor och vår Integritetspolicy, samt om du valde att tacka ja till marknadsföringsmejl. Bevaras under hela ditt konto plus en lagstadgad bevisperiod på fem (5) år efter radering."
            ]
          },
          {
            "kind": "p",
            "text": "Vi samlar **inte** in: din IP-adress (utom den tillfälliga användning som Supabase och vår hostingleverantör gör av den för hastighetsbegränsning och säkerhetsloggning), din webbläsares fingeravtryck, beteendemässiga spårningshändelser, dina skärminspelningar eller någon biometrisk data."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Filer du bearbetar",
        "blocks": [
          {
            "kind": "p",
            "text": "Som anges i avsnitt 1 lagras aldrig innehållet i de filer du bearbetar av oss. Den exakta livscykeln är:"
          },
          {
            "kind": "ul",
            "items": [
              "**Enbart webbläsarbaserade verktyg**: ingen överföring. Filen läses in i minnet av din webbläsare, resultatet produceras lokalt och du laddar ner det direkt. Vi loggar ingenting om filen själv.",
              "**AI-transkribering / översättning / OCR / phishinganalys**: filen eller texten strömmas till vår Supabase Edge Function, som omedelbart vidarebefordrar den till den relevanta AI-leverantören (se avsnitt 7) för inferens. Resultatet returneras till dig och den tillfälliga uppladdningsbufferten raderas. Resultatfiler som skrivs till vår privata lagringsbucket är åtkomliga via signerade URL:er i sextio (60) minuter och raderas fysiskt inom trettio (30) minuter efter generering.",
              "**Lösenordsskyddsverktyget**: ditt lösenord lämnar aldrig din webbläsare. Vi hashar det lokalt med SHA-1 och frågar HaveIBeenPwned med k-anonymitet — endast de första 5 tecknen av hashen skickas. Lösenordet och den fullständiga hashen överförs aldrig.",
              "**URL-skannern / SSL-kontrollen**: endast den URL eller domän du skriver in överförs (till Google Safe Browsing för URL-skannern, eller används för att öppna en live TLS-anslutning för SSL-kontrollen). Inget kringliggande sidinnehåll."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Rättsliga grunder för bearbetning (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Fullgörande av avtal** (Art. 6(1)(b)) — när du skapar ett konto och använder betalda funktioner är bearbetningen nödvändig för att leverera Tjänsten.",
              "**Legitima intressen** (Art. 6(1)(f)) — bedrägeriförebyggande, missbruksbegränsning, grundläggande säkerhetsloggning och förbättring av Tjänsten.",
              "**Samtycke** (Art. 6(1)(a)) — marknadsföringsmejl, valfria analys- eller reklamcookies (om och när de aktiveras) och eventuella framtida valfria integrationer.",
              "**Rättslig förpliktelse** (Art. 6(1)(c)) — bevarande av fakturaunderlag som krävs enligt fransk skattelagstiftning (vanligtvis tio år)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Dina rättigheter enligt GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Som registrerad person enligt Förordning (EU) 2016/679 av den 27 april 2016 (\"GDPR\") har du följande rättigheter, som du när som helst och utan kostnad kan utöva från den e-postadress som är registrerad på ditt konto:"
          },
          {
            "kind": "ul",
            "items": [
              "**Rätt till tillgång** (GDPR Art. 15) — få bekräftelse på att vi bearbetar dina uppgifter och en kopia av dem.",
              "**Rätt till rättelse** (GDPR Art. 16) — få felaktiga eller ofullständiga uppgifter korrigerade.",
              "**Rätt till radering / glömska** (GDPR Art. 17) — få dina uppgifter raderade när de rättsliga grunderna för bearbetning inte längre gäller.",
              "**Rätt till begränsning av bearbetning** (GDPR Art. 18) — tillfälligt frysa bearbetningen medan en tvist avgörs.",
              "**Rätt till dataportabilitet** (GDPR Art. 20) — ta emot dina uppgifter i ett strukturerat, maskinläsbart format.",
              "**Rätt att invända** (GDPR Art. 21) — när som helst, av skäl som rör din specifika situation, invända mot bearbetning som baseras på våra legitima intressen.",
              "**Rätt att återkalla samtycke** (GDPR Art. 7(3)) — för bearbetning som baseras på samtycke, återkalla det när som helst utan att påverka lagligheten av tidigare bearbetning.",
              "**Rätt att inte bli föremål för automatiserat beslutsfattande** (GDPR Art. 22) — ingen av vår bearbetning innefattar enbart automatiserade beslut som ger rättsliga effekter för dig."
            ]
          },
          {
            "kind": "p",
            "text": "För att utöva någon av dessa rättigheter, skriv till [support@konvertools.com](mailto:support@konvertools.com) från den adress som är registrerad på ditt konto. Vi kommer att svara inom en (1) månad, som krävs enligt GDPR Art. 12(3); perioden kan förlängas med ytterligare två månader för särskilt komplexa förfrågningar, i vilket fall vi kommer att informera dig inom den första månaden."
          },
          {
            "kind": "p",
            "text": "Du har också **rätten att lämna in ett klagomål till en tillsynsmyndighet** (GDPR Art. 77). För användare i Frankrike är detta **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Frankrike — telefon +33 (0)1 53 73 22 22 — klagomål online på [www.cnil.fr/fr/plaintes](https://www.cnil.fr/fr/plaintes). För användare i andra EU/EES-länder kan du lämna in ett klagomål till din **nationella tillsynsmyndighet** (listan finns på Europeiska dataskyddsstyrelsens webbplats [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Du kan också söka rättslig prövning enligt GDPR Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Tredjepartsprocessorer",
        "blocks": [
          {
            "kind": "p",
            "text": "För att leverera Tjänsten delar vi strikt begränsad data med följande processorer. Var och en har sin egen integritetspolicy som reglerar hur de hanterar data de får från oss."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (registrerat i Singapore, hostat i EU för vårt projekt) — autentisering, databas, filförvaring och Edge Functions. Tar emot dina kontouppgifter, profildata och (övergående) eventuella filer du laddar upp för ett serverassisterat verktyg. Verkar som vår underleverantör.",
              "**Mistral AI** (Frankrike) — inferens av stora språkmodeller för översättning, omformulering, sammanfattning, den AI-mänskliggöraren, phishingmönsteranalys och andra textuppgifter; ljudtranskribering (Voxtral); bild-OCR och bildanalys (Pixtral). Den text eller bild du skickar skickas till Mistral för inferens. Mistral har kontraktuellt åtagit sig att **inte** använda API-inmatningar för att träna sina modeller.",
              "**Google Safe Browsing** (Google LLC, USA) — endast när du använder URL-skannern eller Phishingdetektorn. Endast de URL:er du skickar in (eller länkar som extraheras från den e-post du klistrar in) överförs. Detta är den enda tredjepartssäkerhetstjänst vi använder.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — endast när du använder Lösenordsskyddsverktyget, och endast de första 5 tecknen av ditt lösenords SHA-1-hash (k-anonymitet). Frågas direkt från din webbläsare, inte via våra servrar.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irland) — betalningsförmedling och abonnemangsfakturering. Vi **ser eller lagrar aldrig** dina kortuppgifter. Stripe tar emot din e-post, betalningsmetod, faktureringsadress och den plan du köpt.",
              "**Resend** (USA) — transaktionell e-postleverans (kontobekräftelse, betalningskvittor, återställning av lösenord). Tar emot din e-postadress och e-postkroppen vi skickar.",
              "**Vercel** (USA) — innehållsleveransnätverk för statiska sidor. Tar emot standard webbtrafikmetadata (IP, user-agent, begärd URL) för routing och missbruksförebyggande. Bevaras i enlighet med Vercels loggningspolicy."
            ]
          },
          {
            "kind": "p",
            "text": "Där någon av dessa processorer verkar utanför Europeiska ekonomiska samarbetsområdet (EES) regleras överföringar av Europeiska kommissionens standardavtalsklausuler (SCC) eller motsvarande överföringsmekanism."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies och liknande tekniker",
        "blocks": [
          {
            "kind": "p",
            "text": "Vi använder endast följande cookies och lokal lagringsobjekt:"
          },
          {
            "kind": "ul",
            "items": [
              "**Nödvändiga**: NEXT_LOCALE (kommer ihåg ditt valda språk) och Supabase sessionscookies (sb-*-auth-token) när du är inloggad. Dessa kräver inget samtycke enligt GDPR.",
              "**Valfria annonseringscookies**: om och när vi aktiverar annonspartners (för närvarande refereras Ezoic i vår kod men inte aktiverat för din trafik) kommer vi att visa en tydlig samtyckesbanner och endast sätta annonseringscookies efter att du tackat ja."
            ]
          },
          {
            "kind": "p",
            "text": "Vi kör för närvarande inga analysverktyg, spårningspixlar eller remarketingtaggar. Om vi lägger till några kommer cookie-bannern ovan att styra dem."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Säkerhet i bearbetningen (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "I enlighet med GDPR Art. 32 implementerar vi lämpliga tekniska och organisatoriska åtgärder för att säkerställa en säkerhetsnivå som är lämplig för risken:"
          },
          {
            "kind": "ul",
            "items": [
              "**Kryptering under överföring** — all trafik till och från Tjänsten skyddas av TLS 1.2 eller högre.",
              "**Kryptering vid vila** — Supabase krypterar den underliggande databasen (inklusive dina kontouppgifter) med AES-256.",
              "**Lösenordshantering** — ditt lösenord hashas av Supabase Auth och lagras aldrig i klartext. Vi kontrollerar dessutom nya lösenord mot HaveIBeenPwned:s k-anonymitets-API på klientsidan för att neka kända läckta lösenord.",
              "**Betalningsdata** — aldrig sedda eller lagrade av oss; kortbetalningsflödet är helt delegerat till Stripe (PCI-DSS nivå 1-kompatibelt).",
              "**Åtkomstkontroll** — radnivå säkerhetspolicys förhindrar att en användare läser en annan användares data; tjänsterollnycklar är begränsade till Edge Functions.",
              "**Filhygien** — ingen uppladdad fil lagras någonsin: enbart webbläsarbaserade verktyg överför aldrig något, och serverassisterade verktyg raderar tillfälliga buffrar inom 30 minuter.",
              "**Sårbarhetsrespons** — säkerhetsproblem kan rapporteras konfidentiellt till [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Trots dessa åtgärder är inget system perfekt säkert; du accepterar den kvarvarande risken som är förknippad med alla onlinetjänster."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Dataminimering och ändamålsbegränsning (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "I enlighet med GDPR Art. 5(1)(c) samlar vi endast in de uppgifter som är strikt nödvändiga för de ändamål som anges i denna policy. Konkret: vi samlar inte in din IP-adress utöver tillfälliga routingloggar, vi fingeravtrycker inte din webbläsare, vi kör ingen beteendeanalys och vi använder aldrig någon fil du bearbetar för att träna AI-modeller. Vi samlar inte in särskilda kategorier av data (Art. 9) eller data som rör straffrättsliga förseelser (Art. 10). Uppgifterna hålls korrekta och aktuella (Art. 5(1)(d)); du kan korrigera eventuella felaktigheter när som helst via din instrumentpanel eller genom att kontakta [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Bevarande",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profildata: bevaras under hela ditt konto, raderas inom trettio (30) dagar efter kontostängning.",
              "Jobbmetadata: raderas automatiskt efter två (2) timmar.",
              "Resultatfiler i lagringsbucketen: raderas fysiskt inom trettio (30) minuter efter generering.",
              "Fakturaunderlag: bevaras i tio (10) år för att uppfylla franska skatteplikter.",
              "Samtyckesposter: bevaras under hela ditt konto plus fem (5) år därefter som rättsligt bevis."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Minderåriga",
        "blocks": [
          {
            "kind": "p",
            "text": "Tjänsten är **inte avsedd för barn under sexton (16) år**. Om du är under den åldern får du inte skapa ett konto. Vi samlar inte medvetet in data från minderåriga; om vi blir medvetna om att vi har gjort det kommer vi att radera det."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Ändringar av denna policy",
        "blocks": [
          {
            "kind": "p",
            "text": "Vi kan ändra denna Integritetspolicy när som helst. Väsentliga ändringar kommer att meddelas via e-post till kontoinnehavare minst trettio (30) dagar innan de träder i kraft. Den senaste versionen finns alltid tillgänglig på [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "För eventuella frågor om denna policy eller dina uppgifter — inklusive utövandet av dina GDPR-rättigheter (se avsnitt 6) — skriv till [support@konvertools.com](mailto:support@konvertools.com). Denna enda e-postadress är vår kontaktpunkt för integritets-, säkerhets-, fakturerings- och allmän supportfrågor. Du kan också lämna in ett klagomål till den franska dataskyddsmyndigheten CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) eller till tillsynsmyndigheten i ditt hemland."
          }
        ]
      }
    ]
  },
  "pl": {
    "h1": "Polityka prywatności",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ostatnia aktualizacja: %DATE% · Obowiązuje niezwłocznie dla wszystkich odwiedzających i posiadaczy kont.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Nasza podstawowa zasada: nie przechowujemy Twoich plików",
        "blocks": [
          {
            "kind": "p",
            "text": "Usługa Konvertools (zwana dalej „Serwisem”) działa jako zestaw narzędzi stawiających prywatność na pierwszym miejscu. Najważniejsze zobowiązanie, które podejmujemy, brzmi następująco:"
          },
          {
            "kind": "ul",
            "items": [
              "**Narzędzia działające wyłącznie w przeglądarce** (konwertery obrazów, narzędzia PDF korzystające z pdf-lib, konwersje audio i wideo zasilane przez FFmpeg.wasm, narzędzia do kodowania, kalkulatory, generatory kodów QR, sprawdzacz naruszeń haseł, większość narzędzi pomocniczych) działają **całkowicie w Twojej przeglądarce internetowej za pomocą WebAssembly**. Twój plik lub dane wejściowe nigdy nie są przesyłane na nasze serwery. Nie mamy technicznych możliwości, aby je odczytać.",
              "**Narzędzia wspomagane serwerowo** (transkrypcja AI, tłumaczenie AI, zadania tekstowe AI, wpisywanie napisów do wideo, skaner adresów URL, wykrywacz phishingu, sprawdzacz certyfikatów SSL oraz kilka innych) wymagają przesłania czegoś do backendu. We wszystkich przypadkach plik lub tekst jest przetwarzany w czasie rzeczywistym i usuwany z tymczasowej pamięci masowej w ciągu trzydziestu (30) minut.",
              "Nigdy nie przechowujemy treści żadnego przesłanego pliku w żadnym trwałym miejscu, nigdy nie używamy Twoich przesyłek do trenowania modeli AI ani nie sprzedajemy, nie wynajmujemy ani nie udostępniamy ich stronom trzecim w jakimkolwiek celu poza dostarczeniem wyniku, którego zażądałeś."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Administrator danych osobowych",
        "blocks": [
          {
            "kind": "p",
            "text": "Na potrzeby Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 („RODO”) administratorem danych osobowych jest wydawca Serwisu. Kontakt w sprawie wszelkich zapytań dotyczących prywatności: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Jakie dane zbieramy",
        "blocks": [
          {
            "kind": "p",
            "text": "Jedynymi danymi osobowymi, które przechowujemy w naszej bazie danych, są:"
          },
          {
            "kind": "ul",
            "items": [
              "**Dane uwierzytelniające konta**: Twój adres e-mail; zasolony, zahaszowany odpowiednik Twojego hasła (zarządzany przez Supabase Auth — nigdy nie widzimy ani nie przechowujemy hasła w postaci jawnej); opcjonalna nazwa wyświetlana oraz adres URL awatara, jeśli zalogujesz się przez Google.",
              "**Stan subskrypcji**: aktualny plan (darmowy / Pro / Business), identyfikator klienta Stripe oraz daty ostatnich odnowień.",
              "**Liczniki użycia**: zagregowane liczniki kwot (np. „3 uruchomienia AI dzisiaj”, „420 miesięcznych uruchomień AI użytych”) aktualizowane na Twoim profilu. **Nie rejestrujemy** rekordów dotyczących poszczególnych uruchomień.",
              "**Metadane zadań (przejściowe)**: gdy narzędzie wspomagane serwerowo generuje wynik (np. plik .srt z transkrypcji), zapisujemy nazwę narzędzia, adres URL do pobrania wyniku, język źródłowy oraz znacznik czasu zakończenia. Wiersze te są automatycznie usuwane po **dwóch (2) godzinach**. Nigdy nie zawierają treści Twojego pliku.",
              "**Rekordy zgody**: data i godzina, o której zaakceptowałeś niniejsze Warunki oraz naszą Politykę prywatności, a także czy wyraziłeś zgodę na otrzymywanie wiadomości marketingowych. Przechowywane przez okres istnienia Twojego konta oraz przez okres pięciu (5) lat od jego usunięcia w celach dowodowych."
            ]
          },
          {
            "kind": "p",
            "text": "**Nie zbieramy**: Twojego adresu IP (poza tymczasowym użyciem przez Supabase i naszego dostawcę hostingu w celach ograniczania częstości zapytań i logowania zabezpieczeń), odcisku palca przeglądarki, zdarzeń śledzenia zachowań, nagrań ekranu ani żadnych danych biometrycznych."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Pliki, które przetwarzasz",
        "blocks": [
          {
            "kind": "p",
            "text": "Jak wskazano w sekcji 1, treści plików, które przetwarzasz, nigdy nie są przez nas przechowywane. Dokładny cykl życia wygląda następująco:"
          },
          {
            "kind": "ul",
            "items": [
              "**Narzędzia działające wyłącznie w przeglądarce**: brak transmisji. Plik jest odczytywany do pamięci przez przeglądarkę, wynik jest generowany lokalnie, a Ty pobierasz go bezpośrednio. Nie rejestrujemy niczego dotyczącego samego pliku.",
              "**Transkrypcja / tłumaczenie / OCR AI / analiza phishingu**: plik lub tekst jest przesyłany strumieniowo do naszej funkcji Edge Supabase, która natychmiast przekazuje go odpowiedniemu dostawcy AI (patrz sekcja 7) w celu wnioskowania. Wynik jest zwracany do Ciebie, a bufor tymczasowego przesyłania jest usuwany. Pliki wynikowe zapisane w naszym prywatnym magazynie są dostępne za pośrednictwem podpisanych adresów URL przez sześćdziesiąt (60) minut i fizycznie usuwane w ciągu trzydziestu (30) minut od wygenerowania.",
              "**Sprawdzacz naruszeń haseł**: Twoje hasło nigdy nie opuszcza przeglądarki. Lokalnie haszujemy je algorytmem SHA-1 i zapytujemy HaveIBeenPwned przy użyciu k-anonimowości — przesyłane są jedynie pierwsze 5 znaków hasha. Hasło i pełny hash nigdy nie są transmitowane.",
              "**Skaner adresów URL / sprawdzacz SSL**: przesyłany jest jedynie adres URL lub nazwa hosta, którą wpisujesz (do Google Safe Browsing w przypadku skanera adresów URL lub w celu otwarcia aktywnego połączenia TLS w przypadku sprawdzacza SSL). Żadne otaczające treści strony."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Prawne podstawy przetwarzania (RODO Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Wykonanie umowy** (Art. 6(1)(b)) — gdy tworzysz konto i korzystasz z płatnych funkcji, przetwarzanie jest konieczne do świadczenia Usługi.",
              "**Uzasadniony interes** (Art. 6(1)(f)) — zapobieganie oszustwom, łagodzenie nadużyć, podstawowe logowanie zabezpieczeń oraz ulepszanie Usługi.",
              "**Zgoda** (Art. 6(1)(a)) — wiadomości marketingowe, opcjonalne pliki cookie analityczne lub reklamowe (jeśli i kiedy zostaną włączone) oraz wszelkie przyszłe opcjonalne integracje.",
              "**Obowiązek prawny** (Art. 6(1)(c)) — przechowywanie rekordów rozliczeniowych zgodnie z wymogami prawa podatkowego Francji (zazwyczaj dziesięć lat)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Twoje prawa według RODO",
        "blocks": [
          {
            "kind": "p",
            "text": "Jako osoba, której dane dotyczą, na mocy Rozporządzenia (UE) 2016/679 z dnia 27 kwietnia 2016 r. („RODO”), przysługują Ci następujące prawa, które możesz wykonywać w dowolnym momencie i bezpłatnie z adresu e-mail zarejestrowanego na Twoim koncie:"
          },
          {
            "kind": "ul",
            "items": [
              "**Prawo dostępu** (RODO Art. 15) — uzyskanie potwierdzenia, że przetwarzamy Twoje dane, oraz ich kopii.",
              "**Prawo sprostowania** (RODO Art. 16) — skorygowanie nieprawidłowych lub niekompletnych danych.",
              "**Prawo do bycia zapomnianym** (RODO Art. 17) — usunięcie Twoich danych, gdy podstawy prawne przetwarzania przestaną obowiązywać.",
              "**Prawo do ograniczenia przetwarzania** (RODO Art. 18) — tymczasowe wstrzymanie przetwarzania w trakcie rozstrzygania sporu.",
              "**Prawo do przenoszenia danych** (RODO Art. 20) — otrzymanie danych w ustrukturyzowanym, nadającym się do odczytu maszynowego formacie.",
              "**Prawo do sprzeciwu** (RODO Art. 21) — sprzeciw w dowolnym momencie, z przyczyn związanych z Twoją szczególną sytuacją, wobec przetwarzania opierającego się na uzasadnionym interesie.",
              "**Prawo do wycofania zgody** (RODO Art. 7(3)) — w przypadku przetwarzania opartego na zgodzie, wycofanie jej w dowolnym momencie bez wpływu na zgodność wcześniejszego przetwarzania.",
              "**Prawo niepodlegania decyzjom opartym wyłącznie na zautomatyzowanym przetwarzaniu** (RODO Art. 22) — żadne z naszych procesów nie obejmuje wyłącznie zautomatyzowanych decyzji powodujących skutki prawne lub istotnie wpływających na Ciebie."
            ]
          },
          {
            "kind": "p",
            "text": "Aby skorzystać z któregokolwiek z tych praw, napisz na [support@konvertools.com](mailto:support@konvertools.com) z adresu zarejestrowanego na Twoim koncie. Odpowiemy w ciągu jednego (1) miesiąca, zgodnie z wymogiem RODO Art. 12(3); okres może zostać przedłużony o kolejne dwa miesiące w przypadku szczególnie złożonych wniosków, w takim przypadku poinformujemy Cię w ciągu pierwszego miesiąca."
          },
          {
            "kind": "p",
            "text": "Przysługuje Ci również **prawo wniesienia skargi do organu nadzorczego** (RODO Art. 77). Dla użytkowników we Francji jest to **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Francja — telefon +33 (0)1 53 73 22 22 — skargi online na stronie [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Dla użytkowników w innych państwach członkowskich UE/EEA możesz złożyć skargę do **krajowego organu nadzorczego** (lista jest prowadzona przez Europejską Radę Ochrony Danych na stronie [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Możesz również dochodzić swoich praw sądowniczo na mocy RODO Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Procesory stron trzecich",
        "blocks": [
          {
            "kind": "p",
            "text": "Świadczenie Usługi wymaga udostępnienia ściśle ograniczonych danych następującym procesorom. Każdy z nich posiada własną politykę prywatności regulującą sposób postępowania z danymi otrzymanymi od nas."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (zarejestrowany w Singapurze, hostowany w UE dla naszego projektu) — uwierzytelnianie, baza danych, magazyn plików oraz funkcje Edge. Otrzymuje dane uwierzytelniające Twojego konta, dane profilu oraz (przejściowo) dowolny plik, który przesyłasz do narzędzia wspomaganego serwerowo. Działa jako nasz podprocesor.",
              "**Mistral AI** (Francja) — wnioskowanie przy użyciu dużych modeli językowych w zakresie tłumaczenia, parafrazowania, streszczania, humanizacji tekstu AI, analizy wzorców phishingu oraz innych zadań tekstowych; transkrypcja audio (Voxtral); OCR i zadania wizyjne (Pixtral). Tekst lub obraz, który przesyłasz, jest wysyłany do Mistral w celu wnioskowania. Mistral zobowiązał się umownie **nie używać danych wejściowych API do trenowania swoich modeli**.",
              "**Google Safe Browsing** (Google LLC, USA) — wyłącznie podczas korzystania ze skanera adresów URL lub wykrywacza phishingu. Przesyłane są jedynie adresy URL, które wprowadzasz (lub linki wyodrębnione z wiadomości e-mail, którą wklejasz). Jest to jedyna usługa bezpieczeństwa stron trzecich, której używamy.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — wyłącznie podczas korzystania ze sprawdzacza naruszeń haseł, i wyłącznie pierwsze 5 znaków hasha SHA-1 Twojego hasła (k-anonimowość). Zapytanie jest wykonywane bezpośrednio z przeglądarki, nie przez nasze serwery.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irlandia) — przetwarzanie płatności i rozliczenia subskrypcji. **Nigdy nie widzimy ani nie przechowujemy** szczegółów Twojej karty. Stripe otrzymuje Twój adres e-mail, metodę płatności, adres rozliczeniowy oraz plan, który wykupiłeś.",
              "**Resend** (USA) — dostarczanie wiadomości e-mail transakcyjnych (potwierdzenia konta, potwierdzenia płatności, reset hasła). Otrzymuje Twój adres e-mail oraz treść wiadomości, którą wysyłamy.",
              "**Vercel** (USA) — sieć dostarcy treści dla statycznych stron. Otrzymuje standardowe metadane ruchu sieciowego (IP, user-agent, żądany adres URL) w celach routingu i zapobiegania nadużyciom. Przechowywane zgodnie z polityką retencji logów Vercela."
            ]
          },
          {
            "kind": "p",
            "text": "W przypadku gdy którykolwiek z tych procesorów działa poza Europejskim Obszarem Gospodarczym, transfery są regulowane przez Standardowe Klauzule Umowne Komisji Europejskiej (SCCs) lub równoważny mechanizm transferu."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Pliki cookie i podobne technologie",
        "blocks": [
          {
            "kind": "p",
            "text": "Używamy wyłącznie następujących plików cookie i elementów lokalnego magazynu:"
          },
          {
            "kind": "ul",
            "items": [
              "**Niezbędne**: NEXT_LOCALE (zapamiętuje wybrany język) oraz ciasteczka sesji Supabase (sb-*-auth-token) podczas zalogowania. Nie wymagają one zgody zgodnie z RODO.",
              "**Opcjonalne reklamowe**: jeśli i kiedy włączymy partnerów reklamowych (obecnie w naszym kodzie odniesiono się do Ezoic, ale nie jest ono jeszcze aktywne dla Twojego ruchu), wyświetlimy wyraźny baner zgody i ustawimy pliki cookie reklamowe dopiero po wyrażeniu przez Ciebie zgody."
            ]
          },
          {
            "kind": "p",
            "text": "Obecnie nie prowadzimy żadnej analityki, znaczników śledzenia ani tagów remarketingu. Jeśli dodamy jakiekolwiek, powyższy baner cookie je zablokuje."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Bezpieczeństwo przetwarzania (RODO Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "Zgodnie z RODO Art. 32 wdrażamy odpowiednie środki techniczne i organizacyjne, aby zapewnić poziom bezpieczeństwa odpowiedni do ryzyka:"
          },
          {
            "kind": "ul",
            "items": [
              "**Szyfrowanie w tranzycie** — cały ruch do i z Serwisu jest chroniony protokołem TLS 1.2 lub wyższym.",
              "**Szyfrowanie w spoczynku** — Supabase szyfruje podstawową bazę danych (w tym dane Twojego konta) algorytmem AES-256.",
              "**Obsługa haseł** — Twoje hasło jest haszowane przez Supabase Auth i nigdy nie jest przechowywane w postaci jawnej. Dodatkowo sprawdzamy nowe hasła po stronie klienta przy użyciu interfejsu API HaveIBeenPwned k-anonimowości, aby odrzucić znane naruszone hasła.",
              "**Dane płatności** — nigdy nie są widziane ani przechowywane przez nas; proces płatności kartą jest w pełni delegowany do Stripe (PCI-DSS Level 1 compliant).",
              "**Kontrola dostępu** — polityki bezpieczeństwa na poziomie wierszy uniemożliwiają użytkownikowi odczytanie danych innego użytkownika; klucze ról usług są ograniczone do funkcji Edge.",
              "**Higiena plików** — żaden przesłany plik nie jest nigdy przechowywany: narzędzia działające wyłącznie w przeglądarce nigdy niczego nie transmitują, a narzędzia wspomagane serwerowo usuwają bufory tymczasowe w ciągu 30 minut.",
              "**Reagowanie na podatności** — problemy związane z bezpieczeństwem można zgłaszać poufnie na [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Pomimo tych środków żaden system nie jest doskonale bezpieczny; akceptujesz inherentne ryzyko resztkowe związane z każdą usługą online."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Minimalizacja danych i ograniczenie celu (RODO Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "Zgodnie z RODO Art. 5(1)(c) zbieramy wyłącznie dane ściśle konieczne do celów określonych w niniejszej Polityce. Konkretnie: nie zbieramy Twojego adresu IP poza efemerycznymi logami routingu, nie fingerprintujemy przeglądarki, nie prowadzimy analizy zachowań oraz nigdy nie używamy żadnego przetwarzanego pliku do trenowania modeli AI. Nie zbieramy danych szczególnej kategorii (Art. 9) ani danych dotyczących czynów zabronionych (Art. 10). Dane są utrzymywane w stanie dokładnym i aktualnym (Art. 5(1)(d)); możesz skorygować ewentualne nieprawidłowości w dowolnym momencie za pośrednictwem panelu lub kontaktując się pod adresem [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Retencja",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dane profilu: przechowywane podczas istnienia konta, usuwane w ciągu trzydziestu (30) dni od zamknięcia konta.",
              "Metadane zadań: automatycznie usuwane po dwóch (2) godzinach.",
              "Pliki wynikowe w magazynie: fizycznie usuwane w ciągu trzydziestu (30) minut od wygenerowania.",
              "Rekordy rozliczeniowe: przechowywane przez dziesięć (10) lat w celu spełnienia obowiązków podatkowych Francji.",
              "Rekordy zgody: przechowywane przez okres istnienia konta oraz przez pięć (5) lat po jego usunięciu jako dowód prawny."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Nieletni",
        "blocks": [
          {
            "kind": "p",
            "text": "Serwis **nie jest skierowany do dzieci poniżej szesnastego (16) roku życia**. Jeśli nie ukończyłeś tego wieku, nie możesz założyć konta. Nie gromadzimy świadomie danych od nieletnich; jeśli dowiemy się, że zgromadziliśmy takie dane, usuniemy je."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Zmiany w niniejszej polityce",
        "blocks": [
          {
            "kind": "p",
            "text": "Możemy okresowo zmieniać niniejszą Politykę prywatności. Istotne zmiany zostaną ogłoszone e-mailem do posiadaczy kont co najmniej trzydzieści (30) dni przed ich wejściem w życie. Najnowsza wersja jest zawsze dostępna pod adresem [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "W przypadku pytań dotyczących niniejszej polityki lub Twoich danych — w tym wykonywania któregokolwiek z praw według RODO (patrz sekcja 6) — napisz na [support@konvertools.com](mailto:support@konvertools.com). Ten jeden adres mailowy jest naszym punktem kontaktowym w sprawach prywatności, bezpieczeństwa, rozliczeń oraz ogólnego wsparcia. Możesz również złożyć skargę do francuskiego organu ochrony danych CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) lub do organu nadzorczego w kraju Twojego zamieszkania."
          }
        ]
      }
    ]
  },
  "uk": {
    "h1": "Політика конфіденційності",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Останнє оновлення: %DATE% · Набирає чинності негайно для всіх відвідувачів та власників облікових записів.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Наш основний принцип: ми не зберігаємо ваші файли",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (далі — «Сервіс») працює як інструментарій, орієнтований на конфіденційність. Найважливіше зобов'язання, яке ми беремо на себе, полягає в наступному:"
          },
          {
            "kind": "ul",
            "items": [
              "**Інструменти, що працюють лише у браузері** (конвертери зображень, інструменти для роботи з PDF, що використовують pdf-lib, конвертація аудіо та відео за допомогою FFmpeg.wasm, інструменти для роботи з кодом, калькулятори, генератори QR-кодів, перевірка паролів на витік, більшість утиліт) виконуються **повністю всередині вашого веб-браузера за допомогою WebAssembly**. Ваш файл або вхідні дані ніколи не передаються на наші сервери. У нас немає технічної можливості їх прочитати.",
              "**Інструменти з підтримкою сервера** (AI-транскрибування, AI-переклад, AI-обробка тексту, накладання субтитрів на відео, сканер URL-адрес, детектор фішингу, перевірка SSL-сертифікатів та деякі інші) потребують відправки даних на бекенд. У кожному випадку файл або текст обробляються в режимі реального часу та видаляються з тимчасового сховища протягом тридцяти (30) хвилин.",
              "Ми ніколи не зберігаємо вміст завантажених файлів у будь-якому постійному місці, ніколи не використовуємо ваші завантаження для навчання моделей AI та ніколи не продаємо, не здаємо в оренду та не передаємо їх третім особам з будь-якою метою, окрім надання результату, який ви запросили."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Контролер даних",
        "blocks": [
          {
            "kind": "p",
            "text": "Згідно з Положеннями Європейського Союзу про захист даних (Regulation (EU) 2016/679, «GDPR»), контролером даних є видавець Сервісу. Для звернень з питань конфіденційності: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Які дані ми збираємо",
        "blocks": [
          {
            "kind": "p",
            "text": "Єдині персональні дані, які ми зберігаємо в нашій базі даних:"
          },
          {
            "kind": "ul",
            "items": [
              "**Облікові дані користувача**: ваша електронна адреса; сольований та хешований варіант вашого пароля (керований Supabase Auth — ми ніколи не бачимо та не зберігаємо пароль у відкритому вигляді); за бажанням — ім'я для відображення та URL аватара, якщо ви входите через Google.",
              "**Стан підписки**: поточний тарифний план (безкоштовний / Pro / Business), ідентифікатор клієнта Stripe, а також дати останніх поновлень.",
              "**Лічильники використання**: агреговані лічильники квот (наприклад, «3 запуски AI сьогодні», «420 щомісячних запусків AI використано»), оновлюються безпосередньо у вашому профілі. Ми **не** ведемо журнали окремих запусків.",
              "**Метадані завдань (тимчасові)**: коли інструмент з підтримкою сервера генерує результат (наприклад, файл .srt з транскрибування), ми записуємо назву інструменту, URL для завантаження результату, вихідну мову та час завершення. Ці рядки автоматично видаляються через **дві (2) години**. Вони ніколи не містять вмісту вашого файлу.",
              "**Записи згоди**: дата та час, коли ви прийняли ці Умови та нашу Політику конфіденційності, а також чи ви дали згоду на отримання маркетингових листів. Зберігаються протягом існування вашого облікового запису та протягом п'яти (5) років після видалення для доказових цілей."
            ]
          },
          {
            "kind": "p",
            "text": "Ми **не** збираємо: вашу IP-адресу (окрім тимчасового використання Supabase та нашого хостинг-провайдера для обмеження швидкості та логування безпеки), відбиток вашого браузера, події поведінкового трекінгу, записи вашого екрана або будь-які біометричні дані."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Файли, які ви обробляєте",
        "blocks": [
          {
            "kind": "p",
            "text": "Як зазначено у розділі 1, вміст файлів, які ви обробляєте, ніколи не зберігається нами. Точний життєвий цикл:"
          },
          {
            "kind": "ul",
            "items": [
              "**Інструменти, що працюють лише у браузері**: ніяка передача даних. Файл зчитується у пам'ять вашим браузером, результат генерується локально, і ви завантажуєте його безпосередньо. Ми нічого не логуємо щодо самого файлу.",
              "**AI-транскрибування / переклад / OCR / аналіз фішингу**: файл або текст передаються у наш Supabase Edge Function, яка негайно перенаправляє їх відповідному постачальнику AI (див. розділ 7) для виконання. Результат повертається вам, а тимчасовий буфер завантаження видаляється. Результативні файли, записані у нашому приватному сховищі, доступні за підписаними URL-адресами протягом шістдесяти (60) хвилин та фізично видаляються протягом тридцяти (30) хвилин після генерації.",
              "**Перевірка паролів на витік**: ваш пароль ніколи не залишає ваш браузер. Ми хешуємо його локально за допомогою SHA-1 та запитуємо HaveIBeenPwned за допомогою k-анонімності — передаються лише перші 5 символів хешу. Пароль та повний хеш ніколи не передаються.",
              "**Сканер URL-адрес / перевірка SSL**: передається лише URL-адреса або ім'я хоста, яке ви вводите (до Google Safe Browsing для сканера URL-адрес або для відкриття TLS-з'єднання для перевірки SSL). Жоден вміст навколишньої сторінки не передається."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Правові підстави для обробки даних (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Виконання договору** (Art. 6(1)(b)) — коли ви створюєте обліковий запис та використовуєте платні функції, обробка необхідна для надання Сервісу.",
              "**Законні інтереси** (Art. 6(1)(f)) — запобігання шахрайству, пом'якшення зловживань, базове логування безпеки та покращення Сервісу.",
              "**Згода** (Art. 6(1)(a)) — маркетингові листи, необов'язкові аналітичні або рекламні cookies (якщо та коли вони увімкнені), а також будь-які майбутні необов'язкові інтеграції.",
              "**Правовий обов'язок** (Art. 6(1)(c)) — зберігання бухгалтерських записів відповідно до вимог французького податкового законодавства (зазвичай десять років)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Ваші права згідно з GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Як суб'єкт даних відповідно до Положення (EU) 2016/679 від 27 квітня 2016 року («GDPR»), ви маєте такі права, які можете реалізувати в будь-який час безкоштовно з електронної адреси, зареєстрованої у вашому обліковому записі:"
          },
          {
            "kind": "ul",
            "items": [
              "**Право на доступ** (GDPR Art. 15) — отримати підтвердження того, що ми обробляємо ваші дані, та копію цих даних.",
              "**Право на виправлення** (GDPR Art. 16) — виправити неточні або неповні дані.",
              "**Право на видалення / право бути забутим** (GDPR Art. 17) — видалити ваші дані, коли правові підстави для обробки більше не застосовуються.",
              "**Право на обмеження обробки** (GDPR Art. 18) — тимчасово зупинити обробку даних під час вирішення суперечки.",
              "**Право на перенесення даних** (GDPR Art. 20) — отримати ваші дані у структурованому, машинно-читаному форматі.",
              "**Право на заперечення** (GDPR Art. 21) — заперечувати на будь-якій підставі, пов'язаній з вашою конкретною ситуацією, проти обробки даних на підставі наших законних інтересів.",
              "**Право відкликати згоду** (GDPR Art. 7(3)) — для обробки даних на підставі згоди ви можете відкликати її в будь-який час без впливу на законність попередньої обробки.",
              "**Право не бути об'єктом рішень, прийнятих виключно на основі автоматизованої обробки** (GDPR Art. 22) — жодна з наших обробок не передбачає автоматизованих рішень, які мали б юридичні наслідки для вас."
            ]
          },
          {
            "kind": "p",
            "text": "Для реалізації будь-якого з цих прав напишіть на [support@konvertools.com](mailto:support@konvertools.com) з електронної адреси, зареєстрованої у вашому обліковому записі. Ми відповімо протягом одного (1) місяця, як того вимагає GDPR Art. 12(3); термін може бути продовжений ще на два місяці для особливо складних запитів, про що ми повідомимо вас протягом першого місяця."
          },
          {
            "kind": "p",
            "text": "Ви також маєте **право подати скаргу до наглядового органу** (GDPR Art. 77). Для користувачів у Франції це **Національна комісія з інформатики та свобод (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Франція — телефон +33 (0)1 53 73 22 22 — онлайн-скарги за адресою [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Для користувачів в інших державах-членах ЄС/ЕЕЗ ви можете подати скаргу до **національного наглядового органу** (список підтримується Європейською радою з захисту даних за адресою [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Ви також можете звернутися до судового захисту відповідно до GDPR Art. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Треті сторони-обробники",
        "blocks": [
          {
            "kind": "p",
            "text": "Для надання Сервісу нам необхідно передавати строго обмежені дані таким обробникам. Кожен з них має власну політику конфіденційності, яка регулює, як вони обробляють дані, отримані від нас."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (інкорпорований у Сінгапурі, розміщений у ЄС для нашого проєкту) — автентифікація, база даних, файловий архів та Edge Functions. Отримує ваші облікові дані, профільні дані та (тимчасово) будь-який файл, який ви завантажуєте для інструменту з підтримкою сервера. Виступає нашим субліцензіатом.",
              "**Mistral AI** (Франція) — виконання великомовних моделей для перекладу, перефразування, резюмування, AI-гуманізації, аналізу шаблонів фішингу та інших текстових завдань; аудіотранскрибування (Voxtral); OCR та візуальні завдання (Pixtral). Текст або зображення, які ви надсилаєте, передаються Mistral для виконання. Mistral контрактно зобов'язався **не** використовувати вхідні дані API для навчання своїх моделей.",
              "**Google Safe Browsing** (Google LLC, США) — лише під час використання сканера URL-адрес або детектора фішингу. Передаються лише ті URL-адреси, які ви надсилаєте (або посилання, вилучені з електронного листа, який ви вставляєте). Це єдиний сторонній сервіс безпеки, який ми використовуємо.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — лише під час використання перевірки паролів на витік, і лише перші 5 символів хешу SHA-1 вашого пароля (k-анонімність). Запит здійснюється безпосередньо з вашого браузера, а не через наші сервери.",
              "**Stripe** (Stripe Payments Europe, Ltd., Ірландія) — обробка платежів та керування підпискою. Ми **ніколи не бачимо та не зберігаємо** деталі вашої карти. Stripe отримує вашу електронну адресу, спосіб оплати, платіжну адресу та тарифний план, який ви придбали.",
              "**Resend** (США) — доставка транзакційних листів (підтвердження облікового запису, квитанції про оплату, скидання пароля). Отримує вашу електронну адресу та тіло листа, який ми відправляємо.",
              "**Vercel** (США) — мережа доставки контенту для статичних сторінок. Отримує стандартні метадані веб-трафіку (IP, user-agent, запитуваний URL) для маршрутизації та запобігання зловживанням. Зберігаються відповідно до політики логування Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "У випадках, коли будь-який з цих обробників працює за межами Європейської економічної зони, передача даних регулюється Стандартними контрактними положеннями (SCCs) Європейської комісії або еквівалентним механізмом передачі."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies та подібні технології",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми використовуємо лише такі cookies та елементи локального сховища:"
          },
          {
            "kind": "ul",
            "items": [
              "**Обов'язкові**: NEXT_LOCALE (зберігає обрану вами мову) та cookies сесії Supabase (sb-*-auth-token) під час входу. Вони не потребують згоди згідно з GDPR.",
              "**Необов'язкові рекламні**: якщо та коли ми активуємо партнерів з реклами (наразі Ezoic згадується у нашому коді, але ще не активований для вашого трафіку), ми відобразимо чітке банер згоди та встановлюватимемо рекламні cookies лише після вашої згоди."
            ]
          },
          {
            "kind": "p",
            "text": "Наразі ми не використовуємо жодних аналітичних систем, пікслів відстеження чи ремаркетингових тегів. Якщо ми додамо будь-які з них, банер згоди вище буде контролювати їх."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Безпека обробки даних (GDPR Art. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "Відповідно до GDPR Art. 32 ми впроваджуємо відповідні технічні та організаційні заходи для забезпечення рівня безпеки, що відповідає ризику:"
          },
          {
            "kind": "ul",
            "items": [
              "**Шифрування під час передачі** — весь трафік до та від Сервісу захищений TLS 1.2 або вище.",
              "**Шифрування на носії** — Supabase шифрує базу даних (включаючи ваші облікові дані) за допомогою AES-256.",
              "**Обробка паролів** — ваш пароль хешується Supabase Auth і ніколи не зберігається у відкритому вигляді. Ми додатково перевіряємо нові паролі за допомогою клієнтського API HaveIBeenPwned k-анонімності, щоб відхиляти відомі зламані паролі.",
              "**Платіжні дані** — ніколи не бачаться та не зберігаються нами; обробка платежів повністю делегована Stripe (відповідає стандарту PCI-DSS Level 1).",
              "**Контроль доступу** — політики безпеки на рівні рядків запобігають читанню даних одного користувача іншим; ключі сервіс-ролі обмежені Edge Functions.",
              "**Гігієна файлів** — жоден завантажений файл ніколи не зберігається: інструменти, що працюють лише у браузері, нічого не передають, а інструменти з підтримкою сервера видаляють тимчасові буфери протягом 30 хвилин.",
              "**Реагування на вразливості** — про проблеми безпеки можна повідомляти конфіденційно на [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Незважаючи на ці заходи, жодна система не є абсолютно захищеною; ви приймаєте залишковий ризик, властивий будь-якому онлайн-сервісу."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Мінімізація та обмеження цілей збору даних (GDPR Art. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "Відповідно до GDPR Art. 5(1)(c) ми збираємо лише ті дані, які є суворо необхідними для цілей, зазначених у цій Політиці. Конкретно: ми не збираємо вашу IP-адресу за межами тимчасових логів маршрутизації, не збираємо відбиток вашого браузера, не ведемо поведінковий аналіз та ніколи не використовуємо файли, які ви обробляєте, для навчання моделей AI. Ми не збираємо спеціальні категорії даних (Art. 9) або дані щодо кримінальних правопорушень (Art. 10). Дані зберігаються точними та актуальними (Art. 5(1)(d)); ви можете виправити неточності в будь-який час через свій кабінет або надіславши запит на [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Терміни зберігання",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Профільні дані: зберігаються протягом існування вашого облікового запису, видаляються протягом тридцяти (30) днів після закриття облікового запису.",
              "Метадані завдань: автоматично видаляються через дві (2) години.",
              "Результативні файли у сховищі: фізично видаляються протягом тридцяти (30) хвилин після генерації.",
              "Бухгалтерські записи: зберігаються протягом десяти (10) років для виконання французьких податкових зобов'язань.",
              "Записи згоди: зберігаються протягом існування вашого облікового запису та протягом п'яти (5) років після цього як доказ."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Неповнолітні користувачі",
        "blocks": [
          {
            "kind": "p",
            "text": "Сервіс **не призначений для дітей молодше шістнадцяти (16) років****. Якщо вам менше цього віку, ви не маєте права створювати обліковий запис. Ми свідомо не збираємо дані від неповнолітніх; якщо нам стане відомо про таке, ми негайно видалимо їх."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Зміни в цій політиці",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми можемо періодично оновлювати цю Політику конфіденційності. Істотні зміни будуть оголошені електронною поштою власникам облікових записів щонайменше за тридцять (30) днів до набрання чинності. Остання версія завжди доступна за адресою [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Контактна інформація",
        "blocks": [
          {
            "kind": "p",
            "text": "За будь-якими питаннями щодо цієї Політики або ваших даних — включаючи реалізацію будь-яких ваших прав згідно з GDPR (див. розділ 6) — напишіть на [support@konvertools.com](mailto:support@konvertools.com). Ця електронна адреса є єдиним каналом зв'язку для питань конфіденційності, безпеки, оплати та загальної підтримки. Ви також можете подати скаргу до французького органу захисту даних CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) або до наглядового органу вашої країни проживання."
          }
        ]
      }
    ]
  },
  "cs": {
    "h1": "Zásady ochrany osobních údajů",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Poslední aktualizace: %DATE% · Platné ihned pro všechny návštěvníky a držitele účtů.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Naše základní zásada: vaše soubory neukládáme",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (dále jen „Služba“) funguje jako sada nástrojů s důrazem na ochranu soukromí. Nejvýznamnější závazek, který vůči vám máme, zní takto:"
          },
          {
            "kind": "ul",
            "items": [
              "**Nástroje běžící pouze v prohlížeči** (konvertory obrázků, nástroje pro PDF využívající pdf-lib, převody audia a videa prostřednictvím FFmpeg.wasm, nástroje pro kód, kalkulačky, generátory QR kódů, kontrola prolomených hesel, většina utilit) běží **zcela uvnitř vašeho webového prohlížeče prostřednictvím WebAssembly**. Váš soubor nebo vstupní data se nikdy neodesílají na naše servery. Nemáme žádné technické prostředky, jak je přečíst.",
              "**Nástroje využívající server** (AI transkripce, AI překlady, AI textové úlohy, vkládání titulků do videa, skener URL, detektor phishingu, kontrola SSL certifikátů a několik dalších) musí něco odeslat na backend. V každém případě jsou soubor či text zpracovávány v reálném čase a z dočasného úložiště jsou smazány do třiceti (30) minut.",
              "Nikdy neukládáme obsah žádného nahraného souboru na trvalém místě, nikdy nepoužíváme vaše nahraná data k výcviku AI modelů a nikdy je neprodáváme, nepronajímáme ani nesdílíme s třetími stranami za žádným účelem kromě doručení výsledku, který jste si vyžádali."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Správce údajů",
        "blocks": [
          {
            "kind": "p",
            "text": "Pro účely Nařízení Evropského parlamentu a Rady (EU) 2016/679 („GDPR“) je správcem údajů vydavatel Služby. Kontakt pro jakékoli dotazy týkající se ochrany osobních údajů: [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Jaká data shromažďujeme",
        "blocks": [
          {
            "kind": "p",
            "text": "Jediné osobní údaje, které trvale ukládáme v naší databázi, jsou následující:"
          },
          {
            "kind": "ul",
            "items": [
              "**Přihlašovací údaje**: vaše e-mailová adresa; solený a hašovaný záznam vašeho hesla (spravovaný službou Supabase Auth — my nevidíme ani neukládáme prostý text hesla); volitelný zobrazovaný název a URL avataru, pokud se přihlásíte pomocí Google.",
              "**Stav předplatného**: aktuální tarif (zdarma / Pro / Business), identifikátor zákazníka Stripe a data vašich posledních obnov.",
              "**Počítadla využití**: agregovaná počítadla kvót (např. „Dnes jste použili 3 AI běhy“, „Tento měsíc jste použili 420 AI běhů“), která se aktualizují přímo ve vašem profilu. **Neukládáme** záznamy o jednotlivých bězích.",
              "**Metadata úloh (přechodná)**: když nástroj využívající server vyprodukuje výsledek (např. soubor .srt z transkripce), zaznamenáme název nástroje, URL pro stažení výsledku, zdrojový jazyk a čas dokončení. Tyto řádky jsou automaticky odstraněny po **dvě (2) hodinách**. Nikdy neobsahují obsah vašeho souboru.",
              "**Záznamy o souhlasu**: datum a čas, kdy jste přijali tyto Podmínky a naše Zásady ochrany osobních údajů, a zda jste se přihlásili k odběru marketingových e-mailů. Uchovávány po dobu existence vašeho účtu plus pět (5) let po jeho smazání jako právní důkaz."
            ]
          },
          {
            "kind": "p",
            "text": "**Neukládáme**: vaši IP adresu (kromě dočasného použití, které provádějí Supabase a náš hostingový poskytovatel pro omezení rychlosti a bezpečnostní protokolování), otisk prohlížeče, sledovací události chování, záznamy z obrazovky ani žádná biometrická data."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Soubory, které zpracováváte",
        "blocks": [
          {
            "kind": "p",
            "text": "Jak je uvedeno v části 1, obsah souborů, které zpracováváte, nikdy neukládáme. Přesný životní cyklus je následující:"
          },
          {
            "kind": "ul",
            "items": [
              "**Nástroje běžící pouze v prohlížeči**: žádný přenos. Soubor je přečten do paměti vaším prohlížečem, výsledek je vyprodukován lokálně a vy si jej stáhnete přímo. O souboru samotném si nic nezaznamenáváme.",
              "**AI transkripce / překlady / OCR / analýza phishingu**: soubor či text je streamován do naší funkce Supabase Edge Function, která jej okamžitě předá příslušnému poskytovateli AI (viz část 7) pro inferenci. Výsledek je vrácen vám a dočasný úložný prostor je smazán. Výsledné soubory zapsané do našeho privátního úložného prostoru jsou přístupné prostřednictvím podepsaných URL po šedesát (60) minut a fyzicky smazány do třiceti (30) minut od vygenerování.",
              "**Kontrola prolomených hesel**: vaše heslo nikdy neopustí váš prohlížeč. Lokálně jej hašujeme pomocí SHA-1 a dotazujeme se HaveIBeenPwned pomocí k-anonymity — odesíláme pouze prvních pět znaků haše. Heslo a úplný haš se nikdy nepřenesou.",
              "**Skener URL / kontrola SSL**: přenáší se pouze URL či název hostitele, který zadáte (k Google Safe Browsing pro skener URL, nebo k otevření živého TLS připojení pro kontrolu SSL). Žádný obsah okolních stránek."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Právní základy zpracování (GDPR čl. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Plnění smlouvy** (čl. 6 odst. 1 písm. b)) — při vytváření účtu a používání placených funkcí je zpracování nezbytné k poskytování Služby.",
              "**Legitimní zájmy** (čl. 6 odst. 1 písm. f)) — prevence podvodů, zmírňování zneužívání, základní protokolování zabezpečení a zlepšování Služby.",
              "**Souhlas** (čl. 6 odst. 1 písm. a)) — marketingové e-maily, volitelné analytické nebo reklamní cookies (pokud a kdykoli budou povoleny) a jakékoli budoucí volitelné integrace.",
              "**Právní povinnost** (čl. 6 odst. 1 písm. c)) — uchovávání fakturačních záznamů dle francouzského daňového zákona (obvykle deset let)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Vaše práva podle GDPR",
        "blocks": [
          {
            "kind": "p",
            "text": "Jako subjekt údajů podle Nařízení Evropského parlamentu a Rady (EU) 2016/679 ze dne 27. dubna 2016 („GDPR“) máte následující práva, která lze uplatnit kdykoli a zdarma prostřednictvím e-mailové adresy registrované ve vašem účtu:"
          },
          {
            "kind": "ul",
            "items": [
              "**Právo na informace** (GDPR čl. 15) — získat potvrzení, že vaše údaje zpracováváme, a jejich kopii.",
              "**Právo na opravu** (GDPR čl. 16) — nechat opravit nepřesné nebo neúplné údaje.",
              "**Právo na vymazání / právo být zapomenut** (GDPR čl. 17) — nechat svá data smazat, pokud pominuly právní důvody pro zpracování.",
              "**Právo na omezení zpracování** (GDPR čl. 18) — dočasně pozastavit zpracování během řešení sporu.",
              "**Právo na přenositelnost údajů** (GDPR čl. 20) — obdržet svá data ve strukturovaném, strojově čitelném formátu.",
              "**Právo vznést námitku** (GDPR čl. 21) — kdykoli vznést námitku proti zpracování založenému na našich legitimních zájmech z důvodů souvisejících s vaší konkrétní situací.",
              "**Právo odvolat souhlas** (GDPR čl. 7 odst. 3) — pro zpracování založené na souhlasu jej kdykoli odvolat bez ovlivnění zákonnosti předchozího zpracování.",
              "**Právo nebýt předmětem automatizovaného rozhodování** (GDPR čl. 22) — žádné z našich zpracování nezahrnuje výlučně automatizovaná rozhodnutí produkující právní účinky vztahující se k vám."
            ]
          },
          {
            "kind": "p",
            "text": "Chcete-li uplatnit některé z těchto práv, napište na [support@konvertools.com](mailto:support@konvertools.com) z adresy registrované ve vašem účtu. Odpovíme do jednoho (1) měsíce, jak požaduje GDPR čl. 12 odst. 3; lhůta může být prodloužena o další dva měsíce v případě zvláště složitých žádostí, v takovém případě vás budeme informovat během prvního měsíce."
          },
          {
            "kind": "p",
            "text": "Máte také **právo podat stížnost u dozorového orgánu** (GDPR čl. 77). Pro uživatele ve Francii se jedná o **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, Francie — telefon +33 (0)1 53 73 22 22 — online stížnosti na [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). Pro uživatele v jiných členských státech EU/EEA můžete podat stížnost u svého **národního dozorového orgánu** (seznam je veden Evropskou radou pro ochranu údajů na [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). Můžete také vyhledat soudní nápravu podle GDPR čl. 79."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Třetí strany zpracovávající údaje",
        "blocks": [
          {
            "kind": "p",
            "text": "Poskytování Služby vyžaduje, abychom sdíleli přísně omezená data s následujícími zpracovateli. Každý z nich má vlastní zásady ochrany osobních údajů, které upravují, jak nakládají s údaji, které od nás obdrží."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (zaregistrovaný v Singapuru, hostovaný v EU pro náš projekt) — autentizace, databáze, úložiště souborů a Edge Functions. Přijímá vaše přihlašovací údaje, profilová data a (přechodně) jakýkoli soubor, který nahrajete pro nástroj využívající server. Působí jako náš subzpracovatel.",
              "**Mistral AI** (Francie) — inference velkých jazykových modelů pro překlady, parafrázování, shrnutí, AI humanizaci, analýzu vzorců phishingu a další textové úlohy; audio transkripce (Voxtral); OCR a úlohy zpracování obrazu (Pixtral). Text či obrázek, který odešlete, je odeslán k inferenci do Mistral. Mistral se smluvně zavázal **nepoužívat vstupy z API k výcviku svých modelů**.",
              "**Google Safe Browsing** (Google LLC, USA) — pouze při používání skeneru URL nebo detektoru phishingu. Přenáší se pouze URL, které zadáte (nebo odkazy extrahované z e-mailu, který vložíte). Toto je jediná třetí strana poskytující bezpečnostní služby, kterou používáme.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — pouze při používání kontroly prolomených hesel a pouze prvních pěti znaků haše vašeho hesla SHA-1 (k-anonymita). Dotazováno přímo z vašeho prohlížeče, nikoli prostřednictvím našich serverů.",
              "**Stripe** (Stripe Payments Europe, Ltd., Irsko) — zpracování plateb a fakturace předplatného. **Nikdy nevidíme ani neukládáme** údaje o vaší platební kartě. Stripe přijímá vaši e-mailovou adresu, platební metodu, fakturační adresu a tarif, který jste zakoupili.",
              "**Resend** (USA) — doručování transakčních e-mailů (ověření účtu, potvrzení platby, reset hesla). Přijímá vaši e-mailovou adresu a tělo e-mailu, který odesíláme.",
              "**Vercel** (USA) — síť pro doručování obsahu pro statické stránky. Přijímá standardní metadata webového provozu (IP, user-agent, požadovaná URL) pro směrování a prevenci zneužívání. Uchováváno v souladu s politikou uchovávání logů Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Pokud kterýkoli z těchto zpracovatelů působí mimo Evropský hospodářský prostor, jsou přenosy řízeny Standardními smluvními doložkami Evropské komise (SCCs) nebo obdobným mechanismem pro přenos údajů."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies a podobné technologie",
        "blocks": [
          {
            "kind": "p",
            "text": "Používáme pouze následující cookies a položky místního úložiště:"
          },
          {
            "kind": "ul",
            "items": [
              "**Nezbytné**: NEXT_LOCALE (pamatuje si vámi zvolený jazyk) a cookies relace Supabase (sb-*-auth-token) při přihlášení. Tyto nevyžadují souhlas podle GDPR.",
              "**Volitelné reklamní**: pokud a kdykoli povolíme partnerské reklamní společnosti (v současnosti je v našem kódu referenční Ezoic, ale zatím není aktivován pro váš provoz), zobrazíme jasný banner pro souhlas a nastavíme reklamní cookies pouze poté, co se přihlásíte."
            ]
          },
          {
            "kind": "p",
            "text": "V současnosti nepoužíváme žádnou analytiku, sledovací pixely ani remarketingové tagy. Pokud nějaké přidáme, výše uvedený banner pro souhlas je bude blokovat."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Zabezpečení zpracování (GDPR čl. 32)",
        "blocks": [
          {
            "kind": "p",
            "text": "V souladu s GDPR čl. 32 uplatňujeme přiměřená technická a organizační opatření k zajištění úrovně zabezpečení odpovídající riziku:"
          },
          {
            "kind": "ul",
            "items": [
              "**Šifrování v přenosu** — veškerý provoz do a z Služby je chráněn TLS 1.2 nebo vyšší.",
              "**Šifrování v klidu** — Supabase šifruje základní databázi (včetně vašich účtových údajů) pomocí AES-256.",
              "**Zpracování hesel** — vaše heslo je hašováno službou Supabase Auth a nikdy není uloženo v prostém textu. Navíc na straně klienta kontrolujeme nová hesla prostřednictvím k-anonymního API HaveIBeenPwned, abychom odmítli známá prolomená hesla.",
              "**Platební údaje** — nikdy je nevidíme ani neukládáme; platební proces je plně delegován na Stripe (PCI-DSS Level 1 compliant).",
              "**Oprávnění přístupu** — bezpečnostní politiky na úrovni řádků zabraňují tomu, aby jeden uživatel četl data jiného uživatele; klíče pro služební role jsou omezeny na Edge Functions.",
              "**Hygiena souborů** — žádný nahraný soubor není nikdy uchováván: nástroje běžící pouze v prohlížeči nic nepřenesou, nástroje využívající server smazají dočasné úložiště do 30 minut.",
              "**Reakce na zranitelnosti** — bezpečnostní problémy lze nahlásit důvěrně na [support@konvertools.com](mailto:support@konvertools.com)."
            ]
          },
          {
            "kind": "p",
            "text": "Přes tato opatření není žádný systém dokonale zabezpečen; přijímáte zbytková rizika inherentní jakékoli online službě."
          }
        ]
      },
      {
        "id": "minimisation",
        "title": "10. Minimalizace údajů a omezení účelu (GDPR čl. 5)",
        "blocks": [
          {
            "kind": "p",
            "text": "V souladu s GDPR čl. 5 odst. 1 písm. c) shromažďujeme pouze údaje nezbytné pro účely stanovené v této Politice. Konkrétně: neukládáme vaši IP adresu mimo dočasné protokoly směrování, neprovádíme otiskování vašeho prohlížeče, neprovádíme behaviorální analýzu a nikdy nepoužíváme žádný soubor, který zpracováváte, k výcviku AI modelů. Nesbíráme zvláštní kategorii údajů (čl. 9) ani údaje týkající se trestných činů (čl. 10). Údaje jsou udržovány přesné a aktuální (čl. 5 odst. 1 písm. d); případné nepřesnosti můžete kdykoli opravit prostřednictvím svého panelu nebo kontaktováním [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "retention",
        "title": "11. Doba uchovávání",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profilová data: uchovávána po dobu existence vašeho účtu, smazána do třiceti (30) dnů po uzavření účtu.",
              "Metadata úloh: automaticky odstraněna po dvou (2) hodinách.",
              "Výsledné soubory v úložném prostoru: fyzicky smazány do třiceti (30) minut od vygenerování.",
              "Fakturační záznamy: uchovávány deset (10) let, aby byly splněny francouzské daňové povinnosti.",
              "Záznamy o souhlasu: uchovávány po dobu existence vašeho účtu plus pět (5) let poté jako právní důkaz."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "12. Děti",
        "blocks": [
          {
            "kind": "p",
            "text": "Služba **není určena dětem mladším šestnácti (16) let**. Pokud jste mladší, nesmíte si vytvořit účet. Úmyslně nesbíráme údaje od dětí; pokud se dozvíme, že jsme tak učinili, údaje smažeme."
          }
        ]
      },
      {
        "id": "changes",
        "title": "13. Změny této politiky",
        "blocks": [
          {
            "kind": "p",
            "text": "Tuto Zásady ochrany osobních údajů můžeme občas změnit. Podstatné změny budou oznámeny držitelům účtů e-mailem alespoň třicet (30) dní před jejich účinností. Nejnovější verze je vždy k dispozici na [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "14. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "Jakékoli dotazy týkající se této politiky nebo vašich údajů — včetně uplatnění kterýchkoli vašich práv podle GDPR (viz část 6) — napište na [support@konvertools.com](mailto:support@konvertools.com). Toto jediné e-mailové adresa je naším kontaktním bodem pro dotazy týkající se ochrany osobních údajů, zabezpečení, fakturace a obecné podpory. Můžete také podat stížnost u francouzského dozorového orgánu pro ochranu údajů CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) nebo u dozorového orgánu vaší země bydliště."
          }
        ]
      }
    ]
  }
};
export const TERMS_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {
  "fr": {
    "h1": "Conditions d'utilisation",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Dernière mise à jour : %DATE% · En utilisant Konvertools, vous acceptez ces conditions.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Acceptation",
        "blocks": [
          {
            "kind": "p",
            "text": "Les présentes Conditions d'utilisation (les « Conditions ») constituent un accord contraignant entre vous (l'« Utilisateur ») et l'éditeur de Konvertools (l'« Éditeur », « nous », « notre ») concernant votre utilisation du site web Konvertools et de tous les outils, API et services associés (collectivement le « Service »). En créant un compte, en cochant la case d'acceptation lors de l'inscription ou simplement en utilisant un outil du Service, vous confirmez avoir lu, compris et accepté ces Conditions dans leur intégralité, ainsi que notre Politique de confidentialité."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Le Service",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools propose un catalogue d'utilitaires de conversion de fichiers, d'outils de traitement de documents et d'images, d'outils textuels assistés par IA, d'outils de sécurité indicatifs (vérificateur d'e-mails, détecteur de phishing, scanner d'URL, vérificateur de certificats SSL, vérificateur de fuites de mots de passe) et d'utilitaires pour développeurs. La plupart des outils s'exécutent entièrement dans votre navigateur ; certains nécessitent un traitement serveur. Le Service est fourni **« tel quel » et « disponible tel quel »** sans aucune garantie, expresse ou implicite, y compris de qualité marchande, d'adéquation à un usage particulier ou de non-violation de droits."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitation de responsabilité — à lire attentivement",
        "blocks": [
          {
            "kind": "p",
            "text": "**Dans la mesure maximale permise par la loi, l'Éditeur décline toute responsabilité pour les dommages de quelque nature que ce soit résultant de votre utilisation ou de votre incapacité à utiliser le Service.** En particulier, vous reconnaissez et acceptez que l'Éditeur ne sera pas responsable de :"
          },
          {
            "kind": "ul",
            "items": [
              "la perte de données, les fichiers corrompus ou incorrects, ou les conversions échouées ;",
              "les décisions, financières, commerciales ou autres, que vous prenez en fonction des résultats de tout outil ;",
              "les temps d'arrêt, la latence ou l'indisponibilité temporaire de toute fonctionnalité ;",
              "les défaillances de services tiers (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, hébergeurs) ;",
              "les dommages indirects, accessoires, spéciaux, consécutifs ou punitifs de quelque nature que ce soit ;",
              "tout montant global excédant les frais que vous avez effectivement payés à notre égard au cours des douze (12) mois précédant l'événement donnant lieu à la réclamation, plafonné à cent (100) euros pour les utilisateurs de la version gratuite."
            ]
          },
          {
            "kind": "p",
            "text": "**Outils de sécurité** : le Scanner d'URL, le Détecteur de phishing, le Vérificateur d'e-mails, le Vérificateur de certificats SSL et le Vérificateur de fuites de mots de passe sont fournis **à titre informatif et indicatif uniquement**. Ils agrègent des signaux tiers (Google Safe Browsing, DNS public, HaveIBeenPwned, échanges TLS en direct) et des heuristiques de modèles de langage. Ils **ne constituent pas une garantie de sécurité, de validité ou d'absence de risque**. Les nouvelles pages de phishing apparaissent plus rapidement que les bases de données de réputation ne peuvent les cataloguer ; un e-mail validé par nos vérifications peut tout de même être inactif ou frauduleux ; un certificat SSL valide ne certifie pas le contenu d'un site. L'Éditeur décline expressément toute responsabilité pour tout préjudice résultant d'un e-mail de phishing que le Service a jugé sûr, d'un lien dangereux que le Service n'a pas identifié, d'un e-mail transactionnel envoyé à une adresse que le Service a marquée comme valide, ou de toute décision de sécurité prise sur la base de ces outils. L'Utilisateur assume l'entière responsabilité de telles décisions."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Utilisation acceptable",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous acceptez de **ne pas** utiliser le Service pour :"
          },
          {
            "kind": "ul",
            "items": [
              "télécharger, traiter ou distribuer du contenu illégal dans votre juridiction ou en France ;",
              "traiter des fichiers pour lesquels vous ne détenez pas les droits nécessaires (œuvres protégées par le droit d'auteur sans autorisation, données personnelles que vous n'êtes pas autorisé à traiter, informations classifiées) ;",
              "commettre ou faciliter la fraude, le blanchiment d'argent, le financement du terrorisme ou toute activité criminelle ;",
              "utiliser l'humanisateur d'IA, les outils textuels d'IA ou toute autre fonctionnalité pour plagier, tromper un tiers, manipuler des systèmes d'évaluation (académiques, de recrutement, de réseaux publicitaires) d'une manière contraire à leurs règles, ou induire en erreur d'une manière qui enfreint la loi applicable ;",
              "tenter de surcharger, rétro-ingénieriser, scraper, abuser des limites de taux ou interférer d'une autre manière avec le fonctionnement ou la disponibilité du Service ;",
              "contourner les quotas, les exigences de paiement ou toute autre restriction en place ;",
              "créer plusieurs comptes pour multiplier les quotas de la version gratuite ou partager un compte avec plus d'individus que ne le permet votre abonnement."
            ]
          },
          {
            "kind": "p",
            "text": "Nous pouvons suspendre ou résilier votre compte immédiatement et sans préavis si nous avons des motifs raisonnables de croire que vous avez enfreint cette section, sans droit à un remboursement d'aucune sorte."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Votre contenu",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous conservez tous les droits, titres et intérêts sur les fichiers et textes que vous soumettez au Service. Vous nous accordez une licence limitée, non exclusive, mondiale, gratuite et strictement nécessaire pour les traiter uniquement afin de fournir l'outil que vous avez demandé. Cette licence prend fin dès que le résultat vous est retourné (outils assistés par serveur) ou n'existe jamais (outils uniquement navigateur, puisque votre fichier ne nous parvient pas). Nous ne revendiquons pas, et ne revendiquerons pas, la propriété de votre contenu ni ne l'utiliserons pour entraîner des modèles d'IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Comptes",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous devez avoir au moins seize (16) ans pour créer un compte. Vous êtes responsable de la confidentialité de vos identifiants et de toute activité se produisant sous votre compte. Signalez-nous immédiatement tout accès non autorisé suspect à [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Abonnements, facturation et remboursements",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Abonnements** : Gratuit (0 €), Pro (25 €/mois ou 210 €/an), Business (79 €/mois ou 664 €/an). Les fonctionnalités et quotas des abonnements sont ceux décrits sur notre page [Tarifs](/pricing) au moment de l'achat. Nous nous réservons le droit de modifier les fonctionnalités des abonnements avec un préavis de 30 jours.",
              "**Renouvellement automatique** : les abonnements mensuels et annuels se renouvellent automatiquement selon la même périodicité jusqu'à annulation. Vous pouvez annuler à tout moment depuis votre tableau de bord ; l'annulation prend effet à la fin de la période de facturation en cours. Vous conservez l'accès jusqu'à cette date.",
              "**Droit de rétractation (UE)** : conformément à l'article L. 221-28 du Code de la consommation français, lorsque vous utilisez activement le Service pendant la période initiale de rétractation de 14 jours, vous consentez expressément à l'exécution immédiate du contrat et renoncez à votre droit de rétractation. Si vous n'avez pas utilisé de fonctionnalité payante, vous pouvez vous rétracter dans les 14 jours en envoyant un e-mail à [support@konvertools.com](mailto:support@konvertools.com) et nous vous rembourserons intégralement sous 14 jours.",
              "**Pas de remboursements partiels** : en dehors du scénario de rétractation ci-dessus, les frais déjà payés pour la période de facturation en cours ne sont pas remboursables.",
              "**Modifications des prix** : nous pouvons modifier les prix avec un préavis de 30 jours. Les abonnés existants conservent leur tarif actuel jusqu'à leur prochaine date de renouvellement.",
              "**Traitement des paiements** : les paiements sont traités de manière sécurisée par **Stripe** (Stripe Payments Europe, Ltd.), un processeur de paiement conforme PCI-DSS Niveau 1. Nous n'avons jamais accès ni ne stockons vos coordonnées bancaires. L'Éditeur est le vendeur enregistré ; le montant affiché lors du paiement est le montant facturé, et toute TVA applicable y est indiquée."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Propriété intellectuelle",
        "blocks": [
          {
            "kind": "p",
            "text": "Le nom, le logo, le code, la conception, la documentation, la structure de la base de données et le contenu agrégé du Service sont la propriété exclusive de l'Éditeur et sont protégés par le droit français et international de la propriété intellectuelle. Aucune licence n'est accordée en dehors de ce qui est strictement nécessaire pour utiliser le Service comme prévu. Vous ne pouvez pas reproduire, modifier, désassembler ou créer des œuvres dérivées du Service ou de l'une de ses parties, sauf si la loi applicable l'autorise expressément."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Indemnisation",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous acceptez d'indemniser et de tenir l'Éditeur indemne de toute réclamation, perte, dommage, responsabilité, coût ou dépense (y compris les honoraires d'avocat raisonnables) découlant de (a) votre manquement à ces Conditions, (b) votre violation de toute loi ou droit d'un tiers, ou (c) tout contenu que vous avez soumis au Service."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Modifications des Conditions",
        "blocks": [
          {
            "kind": "p",
            "text": "Nous pouvons modifier ces Conditions à tout moment. Les modifications substantielles seront notifiées par e-mail aux titulaires de compte au moins trente (30) jours avant leur entrée en vigueur. En continuant à utiliser le Service après cette période, vous acceptez les Conditions modifiées. La dernière version est toujours disponible à l'adresse [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Résiliation",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous pouvez résilier votre compte à tout moment depuis votre tableau de bord. Nous pouvons résilier ou suspendre votre compte immédiatement et sans préavis si vous enfreignez ces Conditions, abusez du Service ou ne payez pas un abonnement récurrent. À la résiliation, vos données sont supprimées sous trente (30) jours, sauf les enregistrements de facturation et de consentement conservés comme décrit dans notre Politique de confidentialité."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Loi applicable et juridiction",
        "blocks": [
          {
            "kind": "p",
            "text": "Ces Conditions sont régies par les lois de la France. Tout litige découlant de ou lié à ces Conditions ou au Service sera soumis à la juridiction exclusive des tribunaux de Paris, France, sauf si un consommateur bénéficie d'un droit d'action obligatoire dans son pays de résidence en vertu du droit de l'Union européenne ou du droit national applicable. Avant d'engager une action en justice, vous acceptez de tenter de résoudre le litige à l'amiable en écrivant à [support@konvertools.com](mailto:support@konvertools.com). Les consommateurs de l'UE peuvent également utiliser la plateforme de résolution des litiges en ligne de la Commission européenne à l'adresse [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Divers",
        "blocks": [
          {
            "kind": "p",
            "text": "Si une disposition de ces Conditions est jugée invalide ou inexécutoire, les autres dispositions restent pleinement en vigueur. Notre incapacité à faire respecter un droit ou une disposition ne constitue pas une renonciation à ce droit. Ces Conditions (ainsi que la Politique de confidentialité et toute condition spécifique à un abonnement référencée lors de l'achat) constituent l'intégralité de l'accord entre vous et l'Éditeur concernant le Service."
          }
        ]
      }
    ]
  },
  "es": {
    "h1": "Términos de Servicio",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Última actualización: %DATE% · Al utilizar Konvertools, usted acepta estos términos.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Aceptación",
        "blocks": [
          {
            "kind": "p",
            "text": "Estos Términos de Servicio (los \"Términos\") constituyen un acuerdo vinculante entre usted (el \"Usuario\") y el editor de Konvertools (el \"Editor\", \"nosotros\", \"nos\") con respecto a su uso del sitio web de Konvertools y todas las herramientas, APIs y servicios relacionados (en conjunto, el \"Servicio\"). Al crear una cuenta, marcar la casilla de aceptación al registrarse o simplemente utilizar cualquier herramienta del Servicio, usted confirma que ha leído, comprendido y aceptado estos Términos en su totalidad, junto con nuestra Política de Privacidad."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. El Servicio",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools ofrece un catálogo de utilidades de conversión de archivos, herramientas de procesamiento de documentos e imágenes, utilidades de texto asistidas por IA, herramientas de seguridad indicativas (verificador de correos electrónicos, detector de phishing, escáner de URLs, verificador de certificados SSL, verificador de filtraciones de contraseñas) y utilidades para desarrolladores. La mayoría de las herramientas se ejecutan completamente en su navegador; algunas requieren procesamiento en el servidor. El Servicio se ofrece **\"tal cual\" y \"según disponibilidad\"**, sin garantía alguna, expresa o implícita, incluyendo comerciabilidad, idoneidad para un propósito particular o no infracción."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitación de responsabilidad — léase con atención",
        "blocks": [
          {
            "kind": "p",
            "text": "**En la máxima medida permitida por la ley, el Editor rechaza cualquier responsabilidad por daños de cualquier tipo derivados del uso o la imposibilidad de usar el Servicio.** En particular, usted reconoce y acepta que el Editor no será responsable de:"
          },
          {
            "kind": "ul",
            "items": [
              "pérdida de datos, archivos corruptos o incorrectos, o conversiones fallidas;",
              "decisiones, financieras, comerciales u otras, que tome basándose en los resultados de cualquier herramienta;",
              "tiempos de inactividad, latencia o indisponibilidad temporal de cualquier función;",
              "fallos de servicios de terceros (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, proveedores de alojamiento);",
              "daños indirectos, incidentales, especiales, consecuentes o punitivos de cualquier tipo;",
              "cualquier importe agregado que supere las tarifas que usted haya pagado efectivamente a nosotros en los doce (12) meses anteriores al evento que origine la reclamación, con un límite de cien (100) euros para usuarios de nivel gratuito."
            ]
          },
          {
            "kind": "p",
            "text": "**Herramientas de seguridad**: el Escáner de URLs, el Detector de Phishing, el Verificador de Correos Electrónicos, el Verificador de Certificados SSL y el Verificador de Filtraciones de Contraseñas se proporcionan **únicamente con fines informativos e indicativos**. Agregan señales de terceros (Google Safe Browsing, DNS público, HaveIBeenPwned, negociaciones TLS en tiempo real) y heurísticas de modelos de lenguaje de gran tamaño. **No constituyen una garantía de seguridad, validez o ausencia de riesgo**. Las páginas de phishing nuevas aparecen más rápido de lo que las bases de datos de reputación pueden catalogar; un correo electrónico que pase nuestras verificaciones puede seguir siendo inactivo o fraudulento; un certificado SSL válido no certifica el contenido de un sitio. El Editor rechaza expresamente toda responsabilidad por cualquier daño resultante de un correo electrónico de phishing que el Servicio haya considerado seguro, un enlace inseguro que el Servicio no haya identificado, un correo transaccional enviado a una dirección que el Servicio marcó como válida, o cualquier decisión de seguridad tomada en base a estas herramientas. El Usuario asume la responsabilidad exclusiva de tales decisiones."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Uso aceptable",
        "blocks": [
          {
            "kind": "p",
            "text": "Usted acuerda **no** utilizar el Servicio para:"
          },
          {
            "kind": "ul",
            "items": [
              "subir, procesar o distribuir contenido que sea ilegal en su jurisdicción o en Francia;",
              "procesar archivos para los que no posea los derechos necesarios (obras con derechos de autor sin autorización, datos personales que no esté autorizado a procesar, información clasificada);",
              "cometer o facilitar fraude, blanqueo de capitales, financiación del terrorismo o cualquier actividad delictiva;",
              "utilizar el humanizador de IA, las herramientas de texto de IA o cualquier otra función para plagiar, engañar a un tercero, manipular sistemas de evaluación (académicos, de contratación, redes publicitarias) de manera que viole sus normas, o inducir a error de cualquier forma que infrinja la ley aplicable;",
              "intentar sobrecargar, ingeniería inversa, raspar, abusar de los límites de velocidad o interferir de otro modo con el funcionamiento o la disponibilidad del Servicio;",
              "eludir cuotas, requisitos de pago u otras restricciones vigentes;",
              "crear múltiples cuentas para multiplicar las cuotas del nivel gratuito o compartir una cuenta entre más personas de las permitidas por su plan."
            ]
          },
          {
            "kind": "p",
            "text": "Podemos suspender o dar de baja su cuenta de inmediato y sin previo aviso si tenemos motivos razonables para creer que ha incumplido esta sección, sin derecho a reembolso alguno."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Su contenido",
        "blocks": [
          {
            "kind": "p",
            "text": "Usted conserva todos los derechos, título e interés sobre los archivos y textos que envíe al Servicio. Nos otorga una licencia estrictamente limitada, no exclusiva, mundial, libre de regalías, para procesarlos únicamente con el fin de proporcionar la herramienta que solicitó. Esta licencia finaliza en el momento en que se devuelve el resultado al usuario (herramientas asistidas por servidor) o nunca llega a existir (herramientas que funcionan en el navegador, ya que su archivo nunca llega a nosotros). No reclamamos ni utilizaremos su contenido para entrenar modelos de IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Cuentas",
        "blocks": [
          {
            "kind": "p",
            "text": "Debe tener al menos dieciséis (16) años para crear una cuenta. Usted es responsable de mantener confidenciales sus credenciales y de cualquier actividad que ocurra bajo su cuenta. Notifíquenos de inmediato en [support@konvertools.com](mailto:support@konvertools.com) cualquier acceso no autorizado sospechoso."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Suscripciones, facturación y reembolsos",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Planes**: Gratis (€0), Pro (€25/mes o €210/año), Business (€79/mes o €664/año). Las características y cuotas de los planes se describen en nuestra página de [Precios](/pricing) en el momento de la compra. Nos reservamos el derecho de modificar las características de los planes con 30 días de antelación.",
              "**Renovación automática**: las suscripciones mensuales y anuales se renuevan automáticamente en la misma cadencia hasta que sean canceladas. Puede cancelar en cualquier momento desde su panel de control; la cancelación surte efecto al final del período de facturación actual. Mantiene el acceso hasta esa fecha.",
              "**Derecho de desistimiento (UE)**: según el Artículo L. 221-28 del Código de Consumo francés, cuando utilice activamente el Servicio durante el período inicial de 14 días de desistimiento, consiente expresamente en la ejecución inmediata del contrato y renuncia a su derecho de desistimiento. Si no ha utilizado ninguna función de pago, puede desistir en un plazo de 14 días enviando un correo a [support@konvertools.com](mailto:support@konvertools.com) y le reembolsaremos el importe íntegro en un plazo de 14 días.",
              "**Sin reembolsos parciales**: fuera del escenario de desistimiento mencionado anteriormente, las tarifas ya pagadas para el período de facturación actual no son reembolsables.",
              "**Cambios de precio**: podemos modificar los precios con 30 días de antelación. Los suscriptores existentes mantienen su precio actual hasta su próxima fecha de renovación.",
              "**Procesamiento de pagos**: los pagos se gestionan de forma segura mediante **Stripe** (Stripe Payments Europe, Ltd.), un procesador de pagos PCI-DSS Nivel 1. Nosotros no vemos ni almacenamos los datos de su tarjeta. El Editor es el vendedor registrado; el importe mostrado en el pago es el cobrado, y cualquier IVA aplicable se indica allí."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Propiedad intelectual",
        "blocks": [
          {
            "kind": "p",
            "text": "El nombre, logo, código, diseño, documentación, estructura de la base de datos y contenido agregado del Servicio son propiedad exclusiva del Editor y están protegidos por las leyes de propiedad intelectual francesas e internacionales. No se le otorga ninguna licencia más allá de lo estrictamente necesario para usar el Servicio según lo previsto. No puede reproducir, modificar, descompilar ni crear obras derivadas del Servicio o cualquier parte del mismo, salvo que la ley aplicable lo permita expresamente."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Indemnización",
        "blocks": [
          {
            "kind": "p",
            "text": "Usted acuerda indemnizar y mantener indemne al Editor frente a cualquier reclamación, pérdida, daño, responsabilidad, costo o gasto (incluyendo honorarios legales razonables) que surja de (a) su incumplimiento de estos Términos, (b) su violación de cualquier ley o derecho de terceros, o (c) cualquier contenido que haya enviado al Servicio."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Modificaciones de los Términos",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos modificar estos Términos en cualquier momento. Los cambios sustanciales se notificarán por correo electrónico a los titulares de cuentas con al menos treinta (30) días de antelación antes de que entren en vigor. Al continuar usando el Servicio después de ese período, acepta los Términos modificados. La versión más reciente siempre está disponible en [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Terminación",
        "blocks": [
          {
            "kind": "p",
            "text": "Puede dar de baja su cuenta en cualquier momento desde su panel de control. Nosotros podemos dar de baja o suspender su cuenta de inmediato y sin previo aviso si incumple estos Términos, abusa del Servicio o no paga una suscripción recurrente. Tras la terminación, sus datos se eliminan en un plazo de treinta (30) días, excepto los registros de facturación y consentimiento que se conservan según lo descrito en nuestra Política de Privacidad."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Ley aplicable y jurisdicción",
        "blocks": [
          {
            "kind": "p",
            "text": "Estos Términos se rigen por las leyes de Francia. Cualquier disputa derivada o relacionada con estos Términos o el Servicio se someterá a la jurisdicción exclusiva de los tribunales de París, Francia, salvo cuando un consumidor tenga un derecho de acción obligatorio en su país de residencia según el derecho de la Unión Europea o la legislación nacional aplicable. Antes de iniciar acciones legales, usted acuerda intentar resolver la disputa de manera amistosa escribiendo a [support@konvertools.com](mailto:support@konvertools.com). Los consumidores de la UE también pueden utilizar la plataforma de resolución de litigios en línea de la Comisión Europea en [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Disposiciones varias",
        "blocks": [
          {
            "kind": "p",
            "text": "Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes mantienen su pleno efecto. Nuestra falta de aplicación de cualquier derecho o disposición no constituye una renuncia a ese derecho. Estos Términos (junto con la Política de Privacidad y cualquier término específico del plan al que se haga referencia en el momento de la compra) constituyen el acuerdo completo entre usted y el Editor con respecto al Servicio."
          }
        ]
      }
    ]
  },
  "pt": {
    "h1": "Termos de Serviço",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Última atualização: %DATE% · Ao utilizar o Konvertools, você concorda com estes termos.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Aceitação",
        "blocks": [
          {
            "kind": "p",
            "text": "Estes Termos de Serviço (os \"Termos\") constituem um acordo vinculativo entre você (o \"Usuário\") e o editor do Konvertools (o \"Editor\", \"nós\", \"nosso\") relativo ao uso do site Konvertools e de todas as ferramentas, APIs e serviços relacionados (coletivamente denominados \"Serviço\"). Ao criar uma conta, marcar a caixa de aceitação no momento do cadastro ou simplesmente utilizar qualquer ferramenta do Serviço, você confirma ter lido, compreendido e aceitado estes Termos na íntegra, juntamente com a nossa Política de Privacidade."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. O Serviço",
        "blocks": [
          {
            "kind": "p",
            "text": "O Konvertools oferece um catálogo de utilitários de conversão de arquivos, ferramentas de processamento de documentos e imagens, utilitários de texto assistidos por IA, ferramentas de segurança indicativas (verificador de e-mail, detector de phishing, scanner de URLs, verificador de certificados SSL, verificador de violação de senhas) e utilitários para desenvolvedores. A maioria das ferramentas é executada inteiramente no seu navegador; algumas exigem processamento no servidor. O Serviço é oferecido **\"como está\" e \"na condição em que se encontra\"**, sem qualquer garantia de qualquer tipo, expressa ou implícita, incluindo comercialização, adequação a um fim específico ou não-infringimento."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitação de responsabilidade — leia atentamente",
        "blocks": [
          {
            "kind": "p",
            "text": "**Na máxima extensão permitida pela lei, o Editor isenta-se de qualquer responsabilidade por danos de qualquer natureza decorrentes do uso ou da incapacidade de uso do Serviço.** Em particular, você reconhece e concorda que o Editor não será responsável por:"
          },
          {
            "kind": "ul",
            "items": [
              "perda de dados, arquivos corrompidos ou incorretos, ou conversões malsucedidas;",
              "decisões, financeiras, comerciais ou de outra natureza, que você tomar com base nos resultados de qualquer ferramenta;",
              "tempo de inatividade, latência ou indisponibilidade temporária de qualquer recurso;",
              "falhas em serviços de terceiros (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, provedores de hospedagem);",
              "danos indiretos, incidentais, especiais, consequenciais ou punitivos de qualquer tipo;",
              "qualquer montante agregado superior às taxas que você efetivamente pagou ao Editor nos doze (12) meses anteriores ao evento que deu origem à reclamação, limitado a cem (100) euros para usuários da versão gratuita."
            ]
          },
          {
            "kind": "p",
            "text": "**Ferramentas de segurança**: o Scanner de URLs, o Detector de Phishing, o Verificador de E-mail, o Verificador de Certificados SSL e o Verificador de Violação de Senhas são fornecidos **apenas para fins informativos e indicativos**. Eles agregam sinais de terceiros (Google Safe Browsing, DNS público, HaveIBeenPwned, negociações TLS ao vivo) e heurísticas de modelos de linguagem de grande porte. Eles **não constituem garantia de segurança, validade ou ausência de risco**. Novas páginas de phishing aparecem mais rápido do que os bancos de dados de reputação conseguem catalogar; um e-mail que passe nos nossos testes pode ainda estar inativo ou fraudulento; um certificado SSL válido não certifica o conteúdo de um site. O Editor expressamente declina de toda responsabilidade por quaisquer danos decorrentes de um e-mail de phishing que o Serviço tenha considerado seguro, de um link inseguro que o Serviço não tenha identificado, de um e-mail transacional enviado a um endereço que o Serviço tenha marcado como válido, ou de qualquer decisão de segurança tomada com base nestas ferramentas. O Usuário assume total responsabilidade por tais decisões."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Uso aceitável",
        "blocks": [
          {
            "kind": "p",
            "text": "Você concorda em **não** utilizar o Serviço para:"
          },
          {
            "kind": "ul",
            "items": [
              "enviar, processar ou distribuir conteúdo que seja ilegal na sua jurisdição ou na França;",
              "processar arquivos para os quais você não detenha os direitos necessários (obras protegidas por direitos autorais sem autorização, dados pessoais que você não tem direito de processar, informações classificadas);",
              "cometer ou facilitar fraude, lavagem de dinheiro, financiamento do terrorismo ou qualquer atividade criminosa;",
              "utilizar o humanizador de IA, as ferramentas de texto de IA ou qualquer outro recurso para plagiar, enganar terceiros, manipular sistemas de avaliação (acadêmicos, recrutamento, redes de anúncios) de forma contrária às suas regras, ou induzir em erro de qualquer maneira que viole a legislação aplicável;",
              "tentar sobrecarregar, reverter engenharia, fazer scraping, abusar de limites de taxa ou interferir de outra forma na operação ou disponibilidade do Serviço;",
              "contornar cotas, requisitos de pagamento ou quaisquer outras restrições vigentes;",
              "criar múltiplas contas para multiplicar as cotas da versão gratuita ou compartilhar uma conta com mais indivíduos do que o permitido pelo seu plano."
            ]
          },
          {
            "kind": "p",
            "text": "Podemos suspender ou encerrar sua conta imediatamente e sem aviso prévio se tivermos motivos razoáveis para acreditar que você violou esta seção, sem direito a reembolso de qualquer tipo."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Seu conteúdo",
        "blocks": [
          {
            "kind": "p",
            "text": "Você mantém todos os direitos, título e interesse nos arquivos e textos que enviar ao Serviço. Você nos concede uma licença limitada, não exclusiva, mundial, livre de royalties, para processá-los unicamente para fornecer a ferramenta que você solicitou. Esta licença termina no momento em que o resultado é retornado a você (ferramentas assistidas por servidor) ou nunca chega a existir (ferramentas executadas apenas no navegador, uma vez que seu arquivo nunca chega até nós). Não reivindicamos, nem reivindicaremos, a propriedade do seu conteúdo ou o utilizaremos para treinar modelos de IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Contas",
        "blocks": [
          {
            "kind": "p",
            "text": "Você deve ter pelo menos dezesseis (16) anos de idade para criar uma conta. Você é responsável por manter suas credenciais confidenciais e por qualquer atividade que ocorra sob sua conta. Notifique-nos imediatamente em [support@konvertools.com](mailto:support@konvertools.com) sobre qualquer acesso não autorizado suspeito."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Assinaturas, faturamento e reembolsos",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Planos**: Gratuito (€0), Pro (€25/mês ou €210/ano), Business (€79/mês ou €664/ano). Os recursos e cotas dos planos são os descritos em nossa página de [Preços](/pricing) no momento da compra. Reservamo-nos o direito de alterar os recursos dos planos com 30 dias de antecedência.",
              "**Renovação automática**: assinaturas mensais e anuais são renovadas automaticamente na mesma periodicidade até serem canceladas. Você pode cancelar a qualquer momento pelo seu painel de controle; o cancelamento entra em vigor no final do período de faturamento atual. Você mantém o acesso até essa data.",
              "**Direito de arrependimento (UE)**: nos termos do Artigo L. 221-28 do Código de Consumo francês, quando você utiliza ativamente o Serviço durante o período inicial de 14 dias de arrependimento, você consente expressamente com a execução imediata do contrato e renuncia ao seu direito de arrependimento. Se você não tiver utilizado nenhum recurso pago, poderá se arrepender no prazo de 14 dias enviando um e-mail para [support@konvertools.com](mailto:support@konvertools.com) e nós reembolsaremos integralmente em até 14 dias.",
              "**Sem reembolsos parciais**: fora do cenário de arrependimento acima, taxas já pagas pelo período de faturamento atual não são reembolsáveis.",
              "**Alterações de preço**: podemos alterar os preços com 30 dias de antecedência. Assinantes existentes mantêm o preço atual até a próxima data de renovação.",
              "**Processamento de pagamento**: os pagamentos são processados com segurança pela **Stripe** (Stripe Payments Europe, Ltd.), um processador de pagamentos PCI-DSS Nível 1. Nunca vemos ou armazenamos os dados do seu cartão. O Editor é o vendedor registrado; o valor exibido no checkout é o valor cobrado, e quaisquer impostos aplicáveis são indicados nesse momento."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Propriedade intelectual",
        "blocks": [
          {
            "kind": "p",
            "text": "O nome, logotipo, código, design, documentação, estrutura de banco de dados e conteúdo agregado do Serviço são propriedade exclusiva do Editor e estão protegidos pelas leis de propriedade intelectual francesa e internacional. Nenhuma licença é concedida a você além do estritamente necessário para usar o Serviço conforme pretendido. Você não pode reproduzir, modificar, descompilar ou criar obras derivadas do Serviço ou de qualquer parte dele, exceto conforme expressamente permitido pela lei aplicável."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Indenização",
        "blocks": [
          {
            "kind": "p",
            "text": "Você concorda em indenizar e isentar o Editor de qualquer reclamação, perda, dano, responsabilidade, custo ou despesa (incluindo honorários advocatícios razoáveis) decorrentes de (a) seu descumprimento destes Termos, (b) sua violação de qualquer lei ou direito de terceiros, ou (c) qualquer conteúdo que você tenha enviado ao Serviço."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Alterações nos Termos",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos alterar estes Termos periodicamente. Alterações substanciais serão notificadas por e-mail aos titulares de contas com pelo menos trinta (30) dias de antecedência antes de entrarem em vigor. Ao continuar a usar o Serviço após esse período, você aceita os Termos alterados. A versão mais recente está sempre disponível em [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Encerramento",
        "blocks": [
          {
            "kind": "p",
            "text": "Você pode encerrar sua conta a qualquer momento pelo seu painel de controle. Podemos encerrar ou suspender sua conta imediatamente e sem aviso prévio se você violar estes Termos, abusar do Serviço ou deixar de pagar uma assinatura recorrente. Após o encerramento, seus dados são excluídos em até trinta (30) dias, exceto registros de faturamento e consentimento, que são mantidos conforme descrito em nossa Política de Privacidade."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Lei aplicável e jurisdição",
        "blocks": [
          {
            "kind": "p",
            "text": "Estes Termos são regidos pelas leis da França. Qualquer disputa decorrente ou relacionada a estes Termos ou ao Serviço será submetida à jurisdição exclusiva dos tribunais de Paris, França, exceto quando o direito de ação obrigatório do consumidor em seu país de residência prevalecer nos termos da legislação da União Europeia ou nacional aplicável. Antes de iniciar uma ação judicial, você concorda em tentar resolver a disputa de forma amigável escrevendo para [support@konvertools.com](mailto:support@konvertools.com). Consumidores da UE também podem utilizar a plataforma de Resolução de Litígios de Consumidores da Comissão Europeia em [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Disposições gerais",
        "blocks": [
          {
            "kind": "p",
            "text": "Se qualquer disposição destes Termos for considerada inválida ou inexequível, as disposições restantes permanecem plenamente em vigor. Nossa falha em fazer valer qualquer direito ou disposição não constitui renúncia a esse direito. Estes Termos (juntamente com a Política de Privacidade e quaisquer termos específicos do plano referenciados na compra) constituem o acordo integral entre você e o Editor relativo ao Serviço."
          }
        ]
      }
    ]
  },
  "de": {
    "h1": "Nutzungsbedingungen",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Stand: __DATUM__ · Durch die Nutzung von Konvertools stimmen Sie diesen Bedingungen zu.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Annahme",
        "blocks": [
          {
            "kind": "p",
            "text": "Diese Nutzungsbedingungen (die „Bedingungen“) bilden eine verbindliche Vereinbarung zwischen Ihnen (dem „Nutzer“) und dem Herausgeber von Konvertools (dem „Herausgeber“, „wir“, „uns“) in Bezug auf Ihre Nutzung der Konvertools-Website sowie aller damit verbundenen Tools, APIs und Dienste (gemeinsam als „Dienst“ bezeichnet). Durch die Erstellung eines Kontos, das Ankreuzen des Akzeptanzfeldes bei der Registrierung oder die bloße Nutzung eines Tools im Dienst bestätigen Sie, dass Sie diese Bedingungen in vollem Umfang gelesen, verstanden und akzeptiert haben, zusammen mit unserer Datenschutzerklärung."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Der Dienst",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools bietet einen Katalog an Datei-Konvertierungstools, Dokumenten- und Bildbearbeitungswerkzeugen, KI-gestützten Text-Utilities, indikativen Sicherheitstools (E-Mail-Prüfer, Phishing-Detektor, URL-Scanner, SSL-Zertifikatsprüfer, Passwort-Breach-Checker) sowie Entwickler-Utilities. Die meisten Tools laufen vollständig in Ihrem Browser; einige erfordern eine serverseitige Verarbeitung. Der Dienst wird **„wie er ist“ und „wie verfügbar“** ohne jegliche ausdrückliche oder stillschweigende Gewährleistung angeboten, einschließlich der Handelsfähigkeit, Eignung für einen bestimmten Zweck oder Rechtsmangelfreiheit."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Haftungsbeschränkung — sorgfältig lesen",
        "blocks": [
          {
            "kind": "p",
            "text": "**Soweit gesetzlich zulässig, schließt der Herausgeber jede Haftung für Schäden jedweder Art aus, die sich aus Ihrer Nutzung oder der Unfähigkeit zur Nutzung des Dienstes ergeben.** Insbesondere erkennen Sie an und stimmen zu, dass der Herausgeber nicht haftet für:"
          },
          {
            "kind": "ul",
            "items": [
              "Datenverlust, beschädigte oder falsche Dateien oder fehlgeschlagene Konvertierungen;",
              "Entscheidungen, finanzieller, geschäftlicher oder sonstiger Art, die Sie aufgrund der Ausgabe eines Tools treffen;",
              "Ausfallzeiten, Latenz oder vorübergehende Nichtverfügbarkeit einer Funktion;",
              "Ausfälle von Drittanbietern (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, Hosting-Anbieter);",
              "mittelbare, zufällige, besondere, Folgeschäden oder Strafschäden jedweder Art;",
              "einen Gesamtbetrag, der den von Ihnen in den zwölf (12) Monaten vor dem Schadensereignis tatsächlich an uns gezahlten Gebühren übersteigt, begrenzt auf einhundert (100) Euro für Nutzer des kostenlosen Tarifs."
            ]
          },
          {
            "kind": "p",
            "text": "**Sicherheitstools**: Der URL-Scanner, der Phishing-Detektor, der E-Mail-Prüfer, der SSL-Zertifikatsprüfer und der Passwort-Breach-Checker werden **ausschließlich zu Informations- und Indikationszwecken** bereitgestellt. Sie aggregieren Signale von Drittanbietern (Google Safe Browsing, öffentliche DNS, HaveIBeenPwned, Live-TLS-Handshakes) sowie heuristische KI-Modelle. Sie **stellen keine Garantie für Sicherheit, Gültigkeit oder Risikofreiheit dar**. Neue Phishing-Seiten entstehen schneller, als Reputationsdatenbanken sie erfassen können; eine E-Mail, die unsere Prüfungen besteht, kann dennoch inaktiv oder betrügerisch sein; ein gültiges SSL-Zertifikat bescheinigt nicht den Inhalt einer Website. Der Herausgeber lehnt jede Haftung für Schäden ab, die aus einer Phishing-E-Mail entstehen, die der Dienst als sicher eingestuft hat, einem unsicheren Link, den der Dienst nicht erkannt hat, einer Transaktions-E-Mail, die an eine vom Dienst als gültig markierte Adresse gesendet wurde, oder einer Sicherheitsentscheidung, die auf Basis dieser Tools getroffen wurde. Der Nutzer trägt die alleinige Verantwortung für solche Entscheidungen."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Zulässige Nutzung",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie stimmen zu, den Dienst **nicht** zu nutzen, um:"
          },
          {
            "kind": "ul",
            "items": [
              "Inhalte hochzuladen, zu verarbeiten oder zu verbreiten, die in Ihrer Rechtsordnung oder in Frankreich illegal sind;",
              "Dateien zu verarbeiten, für die Sie nicht über die erforderlichen Rechte verfügen (urheberrechtlich geschützte Werke ohne Genehmigung, personenbezogene Daten, die Sie nicht verarbeiten dürfen, klassifizierte Informationen);",
              "Betrug, Geldwäsche, die Finanzierung von Terrorismus oder eine andere strafbare Handlung zu begehen oder zu erleichtern;",
              "den KI-Humanisierer, die KI-Text-Tools oder ein anderes Feature zu nutzen, um zu plagiieren, eine dritte Partei zu täuschen, Bewertungssysteme (akademische, Personalabteilungen, Werbenetzwerke) in einer Weise zu manipulieren, die gegen deren Regeln verstößt, oder auf sonstige Weise gegen geltendes Recht zu verstoßen;",
              "zu versuchen, den Dienst zu überlasten, zu reverse-engineeren, zu scrapen, die Ratenbegrenzungen zu missbrauchen oder auf sonstige Weise in den Betrieb oder die Verfügbarkeit des Dienstes einzugreifen;",
              "Quoten, Zahlungsanforderungen oder andere Einschränkungen zu umgehen;",
              "mehrere Konten zu erstellen, um die kostenlosen Kontingente zu vervielfachen, oder ein Konto mit mehr Personen zu teilen, als Ihr Tarif erlaubt."
            ]
          },
          {
            "kind": "p",
            "text": "Wir können Ihr Konto unverzüglich und ohne Vorwarnung sperren oder kündigen, wenn wir berechtigten Grund zu der Annahme haben, dass Sie gegen diesen Abschnitt verstoßen haben, ohne Anspruch auf eine Rückerstattung jedweder Art."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ihre Inhalte",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie behalten alle Rechte, Titel und Interessen an den Dateien und Texten, die Sie dem Dienst übermitteln. Sie erteilen uns eine streng begrenzte, gebührenfreie, weltweite Lizenz zur Verarbeitung derselben ausschließlich zur Erbringung des von Ihnen angeforderten Tools. Diese Lizenz endet in dem Moment, in dem das Ergebnis an Sie zurückgegeben wird (servergestützte Tools) oder überhaupt nicht entsteht (browserbasierte Tools, da Ihre Datei uns nie erreicht). Wir erheben und werden keine Ansprüche auf Ihre Inhalte erheben oder diese zur Schulung von KI-Modellen verwenden."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konten",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie müssen mindestens sechzehn (16) Jahre alt sein, um ein Konto zu erstellen. Sie sind für die vertrauliche Behandlung Ihrer Zugangsdaten und für alle Aktivitäten verantwortlich, die unter Ihrem Konto stattfinden. Benachrichtigen Sie uns unverzüglich unter [support@konvertools.com](mailto:support@konvertools.com) bei einem Verdacht auf unbefugten Zugriff."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Abonnements, Abrechnung und Rückerstattungen",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Tarife**: Kostenlos (€0), Pro (€25/Monat oder €210/Jahr), Business (€79/Monat oder €664/Jahr). Die Funktionen und Kontingente der Tarife sind wie auf unserer [Preisseite](/pricing) zum Zeitpunkt des Kaufs beschrieben. Wir behalten uns vor, die Tariffunktionen mit 30-tägiger Vorankündigung zu ändern.",
              "**Automatische Verlängerung**: Monatliche und jährliche Abonnements verlängern sich automatisch in derselben Frequenz, bis sie gekündigt werden. Sie können jederzeit über Ihr Dashboard kündigen; die Kündigung tritt am Ende der aktuellen Abrechnungsperiode in Kraft. Sie behalten bis dahin Zugriff.",
              "**Widerrufsrecht (EU)**: Gemäß Artikel L. 221-28 des französischen Verbrauchergesetzbuchs erklären Sie sich durch die aktive Nutzung des Dienstes während der anfänglichen 14-tägigen Widerrufsfrist ausdrücklich mit der sofortigen Vertragserfüllung einverstanden und verzichten auf Ihr Widerrufsrecht. Falls Sie keine kostenpflichtigen Funktionen genutzt haben, können Sie innerhalb von 14 Tagen per E-Mail an [support@konvertools.com](mailto:support@konvertools.com) widerrufen, und wir erstatten Ihnen den Betrag innerhalb von 14 Tagen.",
              "**Keine Teilrückerstattungen**: Außerhalb des oben genannten Widerrufsfalls sind bereits gezahlte Gebühren für die aktuelle Abrechnungsperiode nicht erstattungsfähig.",
              "**Preisanpassungen**: Wir können die Preise mit 30-tägiger Vorankündigung ändern. Bestehende Abonnenten behalten ihren aktuellen Preis bis zum nächsten Verlängerungstermin.",
              "**Zahlungsabwicklung**: Die Zahlungen werden sicher über **Stripe** (Stripe Payments Europe, Ltd.) abgewickelt, einen PCI-DSS-Level-1-Zahlungsdienstleister. Wir erhalten oder speichern keine Kartendaten. Der Herausgeber ist der Verkäufer; der im Checkout angezeigte Betrag ist der berechnete Betrag, und jede anfallende MwSt. wird dort ausgewiesen."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Geistiges Eigentum",
        "blocks": [
          {
            "kind": "p",
            "text": "Name, Logo, Code, Design, Dokumentation, Datenbankstruktur und aggregierte Inhalte des Dienstes sind ausschließliches Eigentum des Herausgebers und unterliegen dem französischen und internationalen Recht des geistigen Eigentums. Ihnen wird keine Lizenz eingeräumt, außer derjenigen, die zur Nutzung des Dienstes in der vorgesehenen Weise strikt erforderlich ist. Sie dürfen den Dienst oder Teile davon weder reproduzieren, modifizieren, dekompilieren noch abgeleitete Werke erstellen, es sei denn, dies ist ausdrücklich durch geltendes Recht gestattet."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Freistellung",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie verpflichten sich, den Herausgeber von allen Ansprüchen, Verlusten, Schäden, Haftungen, Kosten oder Aufwendungen (einschließlich angemessener Rechtskosten) freizustellen und ihn schadlos zu halten, die entstehen aus (a) Ihrer Verletzung dieser Bedingungen, (b) Ihrer Verletzung von Gesetzen oder Rechten Dritter oder (c) Inhalten, die Sie dem Dienst übermittelt haben."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Änderungen der Bedingungen",
        "blocks": [
          {
            "kind": "p",
            "text": "Wir können diese Bedingungen von Zeit zu Zeit ändern. Wesentliche Änderungen werden den Kontoinhabern per E-Mail mindestens dreißig (30) Tage vor Inkrafttreten mitgeteilt. Durch die weitere Nutzung des Dienstes nach diesem Zeitraum akzeptieren Sie die geänderten Bedingungen. Die jeweils aktuelle Version ist stets unter [https://konvertools.com/terms](https://konvertools.com/terms) verfügbar."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Beendigung",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie können Ihr Konto jederzeit über Ihr Dashboard kündigen. Wir können Ihr Konto unverzüglich und ohne Vorwarnung kündigen oder sperren, wenn Sie gegen diese Bedingungen verstoßen, den Dienst missbrauchen oder eine wiederkehrende Zahlung nicht leisten. Nach der Kündigung werden Ihre Daten innerhalb von dreißig (30) Tagen gelöscht, mit Ausnahme von Abrechnungs- und Einwilligungsaufzeichnungen, die gemäß unserer Datenschutzerklärung aufbewahrt werden."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Anwendbares Recht und Gerichtsstand",
        "blocks": [
          {
            "kind": "p",
            "text": "Diese Bedingungen unterliegen dem Recht Frankreichs. Jegliche Streitigkeit, die sich aus oder im Zusammenhang mit diesen Bedingungen oder dem Dienst ergibt, unterliegt der ausschließlichen Zuständigkeit der Gerichte von Paris, Frankreich, sofern nicht ein Verbraucher in seinem Wohnsitzland nach EU-Recht oder nationalem Recht ein zwingendes Klagerecht hat. Bevor Sie rechtliche Schritte einleiten, stimmen Sie zu, den Streit gütlich zu regeln, indem Sie eine E-Mail an [support@konvertools.com](mailto:support@konvertools.com) senden. EU-Verbraucher können auch die Online-Streitbeilegungsplattform der Europäischen Kommission unter [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) nutzen."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Sonstiges",
        "blocks": [
          {
            "kind": "p",
            "text": "Falls eine Bestimmung dieser Bedingungen für unwirksam oder nicht durchsetzbar erklärt wird, bleiben die übrigen Bestimmungen in vollem Umfang wirksam. Unsere Unterlassung, ein Recht oder eine Bestimmung durchzusetzen, stellt keinen Verzicht auf dieses Recht dar. Diese Bedingungen (zusammen mit der Datenschutzerklärung und etwaigen tarifspezifischen Bedingungen, auf die beim Kauf verwiesen wird) bilden die gesamte Vereinbarung zwischen Ihnen und dem Herausgeber in Bezug auf den Dienst."
          }
        ]
      }
    ]
  },
  "it": {
    "h1": "Condizioni di Servizio",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ultimo aggiornamento: %DATE% · Utilizzando Konvertools si accettano questi termini.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Accettazione",
        "blocks": [
          {
            "kind": "p",
            "text": "Queste Condizioni di Servizio (i \"Termini\") costituiscono un accordo vincolante tra te (l'\"Utente\") e l'editore di Konvertools (l'\"Editore\", \"noi\", \"nostro\") in merito all'utilizzo del sito web Konvertools e di tutti gli strumenti, API e servizi correlati (collettivamente il \"Servizio\"). Creando un account, spuntando la casella di accettazione al momento della registrazione o semplicemente utilizzando uno strumento del Servizio, confermi di aver letto, compreso e accettato integralmente questi Termini, insieme alla nostra Politica sulla Privacy."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Il Servizio",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools offre un catalogo di utility per la conversione di file, strumenti di elaborazione di documenti e immagini, utility di testo assistite da IA, strumenti di sicurezza indicativi (verificatore di email, rilevatore di phishing, scanner di URL, controllo dei certificati SSL, controllo delle violazioni delle password) e utility per sviluppatori. La maggior parte degli strumenti viene eseguita interamente nel tuo browser; alcuni richiedono l'elaborazione lato server. Il Servizio viene offerto **\"così com'è\" e \"nella disponibilità attuale\"** senza alcuna garanzia di alcun tipo, espressa o implicita, inclusa la commerciabilità, l'idoneità per uno scopo particolare o la non violazione di diritti."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitazione di responsabilità — leggere attentamente",
        "blocks": [
          {
            "kind": "p",
            "text": "**Nei limiti massimi consentiti dalla legge, l'Editore declina qualsiasi responsabilità per danni di qualsiasi tipo derivanti dall'uso o dall'impossibilità di utilizzare il Servizio.** In particolare, si riconosce e si conviene che l'Editore non sarà responsabile per:"
          },
          {
            "kind": "ul",
            "items": [
              "perdita di dati, file corrotti o errati, o conversioni non riuscite;",
              "decisioni, finanziarie, aziendali o di altro tipo, che si prendono sulla base dei risultati di qualsiasi strumento;",
              "tempi di inattività, latenza o indisponibilità temporanea di qualsiasi funzione;",
              "guasti di servizi di terze parti (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, provider di hosting);",
              "danni indiretti, incidentali, speciali, consequenziali o punitivi di qualsiasi tipo;",
              "qualsiasi importo complessivo superiore alle tariffe effettivamente pagate a noi nei dodici (12) mesi precedenti l'evento che dà origine alla richiesta, con un limite massimo di cento (100) euro per gli utenti del piano gratuito."
            ]
          },
          {
            "kind": "p",
            "text": "**Strumenti di sicurezza**: lo Scanner di URL, il Rilevatore di Phishing, il Verificatore di Email, il Controllo dei Certificati SSL e il Controllo delle Violazioni delle Password vengono forniti **solo a fini informativi e indicativi**. Essi aggregato segnali di terze parti (Google Safe Browsing, DNS pubblici, HaveIBeenPwned, handshake TLS in tempo reale) e euristiche basate su modelli linguistici di grandi dimensioni. Essi **non costituiscono una garanzia di sicurezza, validità o assenza di rischi**. Le pagine di phishing nuove appaiono più velocemente di quanto i database di reputazione possano catalogarle; un'email che supera i nostri controlli potrebbe comunque essere inattiva o fraudolenta; un certificato SSL valido non certifica il contenuto di un sito. L'Editore declina espressamente qualsiasi responsabilità per eventuali danni derivanti da un'email di phishing che il Servizio ha ritenuto sicura, da un link non sicuro che il Servizio non ha identificato, da un'email transazionale inviata a un indirizzo che il Servizio ha segnalato come valido, o da qualsiasi decisione di sicurezza presa sulla base di questi strumenti. L'Utente si assume la piena responsabilità di tali decisioni."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Uso accettabile",
        "blocks": [
          {
            "kind": "p",
            "text": "Si conviene di **non** utilizzare il Servizio per:"
          },
          {
            "kind": "ul",
            "items": [
              "caricare, elaborare o distribuire contenuti illegali nella propria giurisdizione o in Francia;",
              "elaborare file per i quali non si detengono i diritti necessari (opere protette da copyright senza autorizzazione, dati personali che non si è autorizzati a trattare, informazioni classificate);",
              "commettere o facilitare frodi, riciclaggio di denaro, finanziamento del terrorismo o qualsiasi attività criminale;",
              "utilizzare l'umanizzatore AI, gli strumenti di testo AI o qualsiasi altra funzione per plagiare, ingannare un terzo, manipolare sistemi di valutazione (accademici, reclutamento, reti pubblicitarie) in modo che violi le loro regole, o per fuorviare in qualsiasi modo che violi la legge applicabile;",
              "tentare di sovraccaricare, ingegnerizzare al contrario, fare scraping, abusare dei limiti di velocità o interferire in altro modo con il funzionamento o la disponibilità del Servizio;",
              "eludere le quote, i requisiti di pagamento o qualsiasi altra restrizione in vigore;",
              "creare più account per moltiplicare le quote del piano gratuito o condividere un account con più persone di quante ne consenta il piano sottoscritto."
            ]
          },
          {
            "kind": "p",
            "text": "Possiamo sospendere o terminare il tuo account immediatamente e senza preavviso se abbiamo ragionevoli motivi per ritenere che tu abbia violato questa sezione, senza diritto a alcun rimborso."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. I tuoi contenuti",
        "blocks": [
          {
            "kind": "p",
            "text": "Conservi tutti i diritti, la titolarità e l'interesse nei file e nei testi che invii al Servizio. Ci concedi una licenza limitata, gratuita, mondiale e non esclusiva per elaborarli esclusivamente al fine di fornire lo strumento richiesto. Questa licenza termina nel momento in cui il risultato viene restituito a te (strumenti assistiti dal server) o non entra mai in vigore (strumenti solo lato browser, poiché il file non ci viene mai inviato). Non rivendichiamo, né lo faremo, la proprietà dei tuoi contenuti né li utilizziamo per addestrare modelli di IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Account",
        "blocks": [
          {
            "kind": "p",
            "text": "Devi avere almeno sedici (16) anni per creare un account. Sei responsabile della riservatezza delle tue credenziali e di qualsiasi attività che avviene sotto il tuo account. Comunicaci immediatamente eventuali accessi non autorizzati scrivendo a [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Abbonamenti, fatturazione e rimborsi",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Piani**: Gratuito (€0), Pro (€25/mese o €210/anno), Business (€79/mese o €664/anno). Le funzionalità e le quote dei piani sono descritte nella nostra pagina [Prezzi](/pricing) al momento dell'acquisto. Ci riserviamo il diritto di modificare le funzionalità dei piani con un preavviso di 30 giorni.",
              "**Rinnovo automatico**: gli abbonamenti mensili e annuali si rinnovano automaticamente alla stessa cadenza fino alla cancellazione. Puoi annullare in qualsiasi momento dal tuo pannello di controllo; la cancellazione ha effetto alla fine del periodo di fatturazione corrente. Conservi l'accesso fino a quella data.",
              "**Diritto di recesso (UE)**: ai sensi dell'Articolo L. 221-28 del Codice del Consumo francese, quando si utilizza attivamente il Servizio durante il periodo iniziale di 14 giorni per il recesso si acconsente espressamente all'esecuzione immediata del contratto e si rinuncia al diritto di recesso. Se non si è utilizzata alcuna funzione a pagamento, è possibile recedere entro 14 giorni inviando una email a [support@konvertools.com](mailto:support@konvertools.com) e provvederemo a emettere un rimborso completo entro 14 giorni.",
              "**Nessun rimborso parziale**: al di fuori dello scenario di recesso sopra descritto, le tariffe già pagate per il periodo di fatturazione corrente non sono rimborsabili.",
              "**Modifiche dei prezzi**: possiamo modificare i prezzi con un preavviso di 30 giorni. Gli abbonati esistenti mantengono il prezzo attuale fino alla data di rinnovo successiva.",
              "**Elaborazione dei pagamenti**: i pagamenti vengono gestiti in modo sicuro da **Stripe** (Stripe Payments Europe, Ltd.), un processore di pagamenti conforme a PCI-DSS Level 1. Non vediamo né memorizziamo i dettagli della tua carta. L'Editore è il venditore registrato; l'importo mostrato al checkout è l'importo addebitato e qualsiasi IVA applicabile viene indicata in quella sede."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Proprietà intellettuale",
        "blocks": [
          {
            "kind": "p",
            "text": "Il nome, il logo, il codice, il design, la documentazione, la struttura del database e il contenuto aggregato del Servizio sono di esclusiva proprietà dell'Editore e sono tutelati dalle leggi francesi e internazionali sulla proprietà intellettuale. Non ti viene concessa alcuna licenza se non quella strettamente necessaria per utilizzare il Servizio come previsto. Non puoi riprodurre, modificare, decompilare o creare opere derivate del Servizio o di qualsiasi sua parte, se non nei limiti espressamente consentiti dalla legge applicabile."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Indennizzo",
        "blocks": [
          {
            "kind": "p",
            "text": "Si conviene a indennizzare e tenere indenne l'Editore da qualsiasi richiesta, perdita, danno, responsabilità, costo o spesa (inclusi gli onorari legali ragionevoli) derivante da (a) la violazione dei presenti Termini da parte tua, (b) la violazione di qualsiasi legge o diritto di terze parti, o (c) qualsiasi contenuto che hai inviato al Servizio."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Modifiche ai Termini",
        "blocks": [
          {
            "kind": "p",
            "text": "Possiamo modificare questi Termini di volta in volta. Le modifiche sostanziali verranno comunicate tramite email agli utenti registrati almeno trenta (30) giorni prima della loro entrata in vigore. Continuando a utilizzare il Servizio dopo tale periodo si accettano i Termini modificati. L'ultima versione è sempre disponibile all'indirizzo [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Risoluzione",
        "blocks": [
          {
            "kind": "p",
            "text": "Puoi terminare il tuo account in qualsiasi momento dal tuo pannello di controllo. Possiamo terminare o sospendere il tuo account immediatamente e senza preavviso se violi questi Termini, abusi del Servizio o non paghi un abbonamento ricorrente. Al termine dell'account, i tuoi dati vengono eliminati entro trenta (30) giorni, ad eccezione dei registri di fatturazione e dei consensi conservati come descritto nella nostra Politica sulla Privacy."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Legge applicabile e giurisdizione",
        "blocks": [
          {
            "kind": "p",
            "text": "Questi Termini sono regolati dalle leggi della Francia. Eventuali controversie derivanti o connesse a questi Termini o al Servizio devono essere sottoposte alla giurisdizione esclusiva dei tribunali di Parigi, Francia, salvo quando il diritto di azione obbligatorio del consumatore nel proprio paese di residenza prevale ai sensi del diritto dell'Unione Europea o della legge nazionale applicabile. Prima di intraprendere un'azione legale, si conviene di tentare di risolvere la controversia in via amichevole scrivendo a [support@konvertools.com](mailto:support@konvertools.com). I consumatori dell'UE possono inoltre utilizzare la piattaforma di risoluzione delle controversie online della Commissione Europea all'indirizzo [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Varie",
        "blocks": [
          {
            "kind": "p",
            "text": "Se una disposizione di questi Termini viene ritenuta invalida o non applicabile, le restanti disposizioni rimangono pienamente in vigore. La nostra mancata applicazione di un diritto o di una disposizione non costituisce una rinuncia a tale diritto. Questi Termini (insieme alla Politica sulla Privacy e a eventuali termini specifici del piano richiamati all'atto dell'acquisto) costituiscono l'intero accordo tra te e l'Editore in merito al Servizio."
          }
        ]
      }
    ]
  },
  "nl": {
    "h1": "Gebruiksvoorwaarden",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Laatst bijgewerkt: %DATE% · Door Konvertools te gebruiken, gaat u akkoord met deze voorwaarden.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Acceptatie",
        "blocks": [
          {
            "kind": "p",
            "text": "Deze Gebruiksvoorwaarden (de \"Voorwaarden\") vormen een bindende overeenkomst tussen u (de \"Gebruiker\") en de uitgever van Konvertools (de \"Uitgever\", \"wij\", \"ons\") met betrekking tot uw gebruik van de website van Konvertools en alle bijbehorende tools, API's en diensten (collectief de \"Dienst\"). Door een account aan te maken, het acceptatievakje bij inschrijving aan te vinken of simpelweg een tool op de Dienst te gebruiken, bevestigt u dat u deze Voorwaarden volledig heeft gelezen, begrepen en geaccepteerd, samen met ons Privacybeleid."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. De Dienst",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools biedt een catalogus met bestandsconversiehulpmiddelen, document- en afbeeldingsverwerkingsgereedschappen, AI-ondersteunde tekstgereedschappen, indicatieve beveiligingsgereedschappen (e-mailverifier, phishingdetector, URL-scanner, SSL-certificaatcontrole, wachtwoordbreukcontrole) en ontwikkelaarsgereedschappen. De meeste tools draaien volledig in uw browser; sommige vereisen serververwerking. De Dienst wordt aangeboden **\"zoals deze is\" en \"zoals beschikbaar\"** zonder enige vorm van garantie, expliciet of impliciet, met inbegrip van verkoopbaarheid, geschiktheid voor een bepaald doel of geen inbreuk op rechten."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Aansprakelijkheidsbeperking — lees zorgvuldig",
        "blocks": [
          {
            "kind": "p",
            "text": "**Voor zover wettelijk toegestaan, sluit de Uitgever elke aansprakelijkheid uit voor schade van welke aard dan ook die voortvloeit uit uw gebruik van, of het onvermogen om gebruik te maken van, de Dienst.** In het bijzonder erkent en gaat u ermee akkoord dat de Uitgever niet aansprakelijk is voor:"
          },
          {
            "kind": "ul",
            "items": [
              "verlies van gegevens, beschadigde of incorrecte bestanden, of mislukte conversies;",
              "beslissingen, financieel, zakelijk of anderszins, die u neemt op basis van de output van een tool;",
              "uitvaltijd, latentie of tijdelijke onbeschikbaarheid van een functie;",
              "storingen bij externe diensten (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, hostingproviders);",
              "indirecte, incidentele, speciale, gevolg- of punitieve schade van welke aard dan ook;",
              "een totaalbedrag dat de vergoedingen overstijgt die u in de twaalf (12) maanden voorafgaand aan het voorval dat aan de claim ten grondslag ligt, heeft betaald aan ons, met een maximum van honderd (100) euro voor gebruikers met een gratis abonnement."
            ]
          },
          {
            "kind": "p",
            "text": "**Beveiligingsgereedschappen**: de URL-scanner, de phishingdetector, de e-mailverifier, de SSL-certificaatcontrole en de wachtwoordbreukcontrole worden uitsluitend **ter informatieve en indicatieve doeleinden** aangeboden. Ze aggregeren externe signalen (Google Safe Browsing, openbare DNS, HaveIBeenPwned, live TLS-handshakes) en heuristieken van grote taalmodellen. Ze **vormen geen garantie voor veiligheid, geldigheid of afwezigheid van risico**. Nieuwe phishingpagina's verschijnen sneller dan reputatiedatabases ze kunnen catalogiseren; een e-mail die onze controles doorstaat, kan nog steeds inactief of frauduleus zijn; een geldig SSL-certificaat garandeert niet de inhoud van een website. De Uitgever sluit uitdrukkelijk elke aansprakelijkheid uit voor schade die voortvloeit uit een phishing-e-mail die de Dienst als veilig heeft aangemerkt, een onveilige link die de Dienst niet heeft geïdentificeerd, een transactie-e-mail die naar een adres is verzonden dat de Dienst als geldig heeft gemarkeerd, of een beveiligingsbeslissing die op basis van deze gereedschappen is genomen. De Gebruiker is zelf verantwoordelijk voor dergelijke beslissingen."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Aanvaardbaar gebruik",
        "blocks": [
          {
            "kind": "p",
            "text": "U gaat ermee akkoord de Dienst **niet** te gebruiken voor:"
          },
          {
            "kind": "ul",
            "items": [
              "het uploaden, verwerken of verspreiden van inhoud die illegaal is in uw rechtsgebied of in Frankrijk;",
              "het verwerken van bestanden waarvoor u niet de benodigde rechten heeft (met auteursrecht beschermde werken zonder toestemming, persoonsgegevens waar u niet gemachtigd bent om te verwerken, geclassificeerde informatie);",
              "het plegen of faciliteren van fraude, witwassen van geld, financiering van terrorisme of enige criminele activiteit;",
              "het gebruik van de AI-humaniseringsgereedschappen, de AI-tekstgereedschappen of een andere functie om te plagiaat te plegen, een derde partij te misleiden, evaluatiesystemen (academisch, werving, advertentienetwerken) te manipuleren op een manier die in strijd is met hun regels, of op welke manier dan ook te misleiden in strijd met toepasselijke wetgeving;",
              "het proberen te overbelasten, reverse-engineeren, scrapen, de limieten te misbruiken, of op andere wijze de werking of beschikbaarheid van de Dienst te verstoren;",
              "quotumlimieten, betalingsverplichtingen of andere restricties te omzeilen;",
              "meerdere accounts aan te maken om de gratis quotumlimieten te vermenigvuldigen, of een account te delen met meer personen dan uw abonnement toestaat."
            ]
          },
          {
            "kind": "p",
            "text": "We kunnen uw account onmiddellijk en zonder voorafgaande kennisgeving opschorten of beëindigen als we redelijke gronden hebben om aan te nemen dat u deze sectie heeft geschonden, zonder recht op restitutie van welke aard dan ook."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Uw inhoud",
        "blocks": [
          {
            "kind": "p",
            "text": "U behoudt alle rechten, titel en belang in de bestanden en teksten die u naar de Dienst uploadt. U verleent ons een strikt beperkte, royaltyvrije, wereldwijde licentie om deze uitsluitend te verwerken om de tool die u heeft aangevraagd te leveren. Deze licentie eindigt op het moment dat het resultaat aan u wordt teruggegeven (serverondersteunde tools) of nooit tot stand komt (browser-only tools, aangezien uw bestand ons nooit bereikt). We claimen geen eigendom van uw inhoud en gebruiken deze niet om AI-modellen te trainen."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Accounts",
        "blocks": [
          {
            "kind": "p",
            "text": "U moet ten minste zestien (16) jaar oud zijn om een account aan te maken. U bent verantwoordelijk voor het vertrouwelijk houden van uw inloggegevens en voor elke activiteit die onder uw account plaatsvindt. Meld ons onmiddellijk via [support@konvertools.com](mailto:support@konvertools.com) als u vermoedt dat er ongeautoriseerde toegang heeft plaatsgevonden."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Abonnementen, facturering en restituties",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Abonnementen**: Gratis (€0), Pro (€25/maand of €210/jaar), Business (€79/maand of €664/jaar). De functies en quotumlimieten van abonnementen zijn zoals beschreven op onze [Prijspagina](/pricing) op het moment van aankoop. We behouden ons het recht voor om abonnementsfuncties met 30 dagen voorafgaande kennisgeving aan te passen.",
              "**Automatische verlenging**: maand- en jaarabonnementen verlengen automatisch op dezelfde frequentie totdat ze worden geannuleerd. U kunt op elk moment annuleren via uw dashboard; de annulering treedt in werking aan het einde van de huidige factureringsperiode. U behoudt toegang tot die datum.",
              "**Ontbindingsrecht (EU)**: op grond van Artikel L. 221-28 van de Franse Consumentenwet, stemt u ermee in dat u bij actief gebruik van de Dienst tijdens de initiële ontbindingsperiode van 14 dagen uitdrukkelijk toestemt met de onmiddellijke uitvoering van de overeenkomst en afstand doet van uw ontbindingsrecht. Als u geen betaalde functie heeft gebruikt, kunt u binnen 14 dagen annuleren door een e-mail te sturen naar [support@konvertools.com](mailto:support@konvertools.com) en wij zullen binnen 14 dagen een volledige restitutie verwerken.",
              "**Geen gedeeltelijke restituties**: buiten het hierboven beschreven ontbindingscenario zijn reeds betaalde vergoedingen voor de huidige factureringsperiode niet restitueerbaar.",
              "**Prijswijzigingen**: we kunnen prijzen wijzigen met 30 dagen voorafgaande kennisgeving. Bestaande abonnees behouden hun huidige prijs tot hun volgende verlengingsdatum.",
              "**Betalingsverwerking**: betalingen worden veilig verwerkt door **Stripe** (Stripe Payments Europe, Ltd.), een PCI-DSS Level 1-betalingsprocessor. We zien of slaan uw kaartgegevens nooit op. De Uitgever is de verkoper van record; het bedrag dat bij de checkout wordt getoond, is het bedrag dat in rekening wordt gebracht, en eventuele toepasselijke BTW wordt daarbij aangegeven."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Intellectuele eigendom",
        "blocks": [
          {
            "kind": "p",
            "text": "De naam, het logo, de code, het ontwerp, de documentatie, de database-indeling en de geaggregeerde inhoud van de Dienst zijn het exclusieve eigendom van de Uitgever en vallen onder de bescherming van Franse en internationale intellectuele-eigendomswetgeving. U krijgt geen licentie verleend, behalve wat strikt noodzakelijk is om de Dienst te gebruiken zoals bedoeld. U mag de Dienst of enig onderdeel ervan niet reproduceren, wijzigen, decompileren of afgeleide werken maken, tenzij dit uitdrukkelijk is toegestaan door toepasselijke wetgeving."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Schadeloosstelling",
        "blocks": [
          {
            "kind": "p",
            "text": "U gaat ermee akkoord de Uitgever schadeloos te stellen en haar vrij te houden van enige vordering, schade, aansprakelijkheid, kosten of kostenpost (inclusief redelijke juridische kosten) die voortvloeien uit (a) uw schending van deze Voorwaarden, (b) uw overtreding van enige wet of rechten van derden, of (c) enige inhoud die u naar de Dienst heeft geüpload."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Wijzigingen in de Voorwaarden",
        "blocks": [
          {
            "kind": "p",
            "text": "We kunnen deze Voorwaarden af en toe wijzigen. Belangrijke wijzigingen worden minimaal dertig (30) dagen voorafgaand aan de inwerkingtreding per e-mail aan accounthouders meegedeeld. Door het gebruik van de Dienst na deze periode voort te zetten, gaat u akkoord met de gewijzigde Voorwaarden. De meest recente versie is altijd beschikbaar op [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Beëindiging",
        "blocks": [
          {
            "kind": "p",
            "text": "U kunt uw account op elk moment beëindigen via uw dashboard. We kunnen uw account onmiddellijk en zonder voorafgaande kennisgeving opschorten of beëindigen als u deze Voorwaarden schendt, de Dienst misbruikt of een terugkerend abonnement niet betaalt. Bij beëindiging worden uw gegevens binnen dertig (30) dagen verwijderd, met uitzondering van factuur- en toestemmingsgegevens die worden bewaard zoals beschreven in ons Privacybeleid."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Toepasselijk recht en rechtsbevoegdheid",
        "blocks": [
          {
            "kind": "p",
            "text": "Deze Voorwaarden vallen onder het Franse recht. Elke geschil dat voortvloeit uit of verband houdt met deze Voorwaarden of de Dienst wordt onderworpen aan de exclusieve rechtsbevoegdheid van de rechtbanken van Parijs, Frankrijk, tenzij een consument zijn verplichte actierecht in zijn land van verblijf kan uitoefenen op grond van Europese Unie- of nationale wetgeving. Voordat u juridische stappen onderneemt, gaat u ermee akkoord om het geschil eerst op een vriendelijke manier op te lossen door een bericht te sturen naar [support@konvertools.com](mailto:support@konvertools.com). EU-consumenten kunnen ook gebruikmaken van het platform voor online geschillenbeslechting van de Europese Commissie op [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Overige bepalingen",
        "blocks": [
          {
            "kind": "p",
            "text": "Als een bepaling van deze Voorwaarden ongeldig of niet afdwingbaar wordt verklaard, blijven de overige bepalingen volledig van kracht. Onze niet-nakoming van een recht of bepaling is geen afstand van dat recht. Deze Voorwaarden (samen met het Privacybeleid en eventuele abonnementsspecifieke voorwaarden die bij aankoop van toepassing zijn) vormen de volledige overeenkomst tussen u en de Uitgever met betrekking tot de Dienst."
          }
        ]
      }
    ]
  },
  "ja": {
    "h1": "利用規約",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最終更新日：%DATE% · Konvertoolsをご利用いただくことにより、これらの利用規約に同意したものとみなされます。",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. 同意",
        "blocks": [
          {
            "kind": "p",
            "text": "本利用規約（以下「本規約」といいます）は、貴方（以下「ユーザー」といいます）とKonvertoolsの発行者（以下「発行者」、「当社」、「弊社」といいます）との間の、Konvertoolsウェブサイトおよび関連するすべてのツール、API、サービス（総称して「サービス」といいます）のご利用に関する拘束力のある合意を形成します。アカウントの作成、登録時の同意チェックボックスのクリック、またはサービス上のいずれかのツールのご利用により、貴方は本規約全体を読み、理解し、完全に同意したことを確認したものとみなされます。また、プライバシーポリシーにも同意したものとみなされます。"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. サービス",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertoolsは、ファイル変換ユーティリティ、文書・画像処理ツール、AI支援テキストユーティリティ、セキュリティ検証ツール（メール検証、フィッシング検出、URLスキャナー、SSL証明書チェッカー、パスワード漏洩チェッカー）、および開発者向けユーティリティのカタログを提供します。ほとんどのツールはブラウザ内で完全に実行されますが、一部のツールはサーバー処理を必要とします。サービスは、**「現状有姿」および「利用可能な状態で」**提供され、商品性、特定目的への適合性、または非侵害性を含む、明示的または黙示的を問わず、いかなる種類の保証もありません。"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 責任の制限 — 注意深くお読みください",
        "blocks": [
          {
            "kind": "p",
            "text": "**法令により最大限許容される範囲で、発行者はサービスのご利用またはご利用できないことにより生じるいかなる種類の損害についても責任を負いません。** 特に、貴方は以下に同意するものとします。"
          },
          {
            "kind": "ul",
            "items": [
              "データの損失、破損または不正なファイル、変換の失敗；",
              "ツールの出力に基づく意思決定、財務、ビジネスその他の決定；",
              "ダウンタイム、レイテンシー、または機能の一時的な利用不可；",
              "サードパーティサービスの障害（Supabase、Mistral、Google Safe Browsing、HaveIBeenPwned、Stripe、Resend、ホスティングプロバイダー）；",
              "間接的、偶発的、特別、結果的、または懲罰的損害を含むいかなる種類の損害；",
              "貴方が主張する請求に関連する出来事の発生前12か月以内に実際に支払った料金を超える集計額、無料プラン利用者については100ユーロを上限とします。"
            ]
          },
          {
            "kind": "p",
            "text": "**セキュリティツール**：URLスキャナー、フィッシング検出器、メール検証、SSL証明書チェッカー、パスワード漏洩チェッカーは、**情報提供および参考目的のみ**で提供されます。これらは、Google Safe Browsing、公開DNS、HaveIBeenPwned、ライブTLSハンドシェイクなどのサードパーティのシグナルと大規模言語モデルの推論を集約したものです。これらは**安全性、有効性、リスクの不在を保証するものではありません**。新しいフィッシングページは、評判データベースがカタログ化するよりも速く出現します。検査に合格したメールであっても、まだアクティブでない、または詐欺の可能性があります。SSL証明書が有効であっても、サイトの内容を保証するものではありません。発行者は、サービスが安全と判断したフィッシングメールによる被害、サービスが特定できなかった安全でないリンク、サービスが有効と判断したアドレスへのトランザクションメール、またはこれらのツールに基づくセキュリティ判断から生じるいかなる損害についても、明示的に責任を放棄します。このような判断に関する責任は、すべてユーザーが負うものとします。"
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 適切な利用",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方はサービスを以下の目的でご利用しないことに同意します。"
          },
          {
            "kind": "ul",
            "items": [
              "ご自身の管轄地またはフランスで違法なコンテンツをアップロード、処理、または配布する；",
              "必要な権利（許可なく著作権のある作品、処理する権利のない個人データ、機密情報）を有していないファイルを処理する；",
              "詐欺、マネーロンダリング、テロ資金調達、その他の犯罪行為を実行または助長する；",
              "AI人間化ツール、AIテキストツール、その他の機能を使用して、剽窃を行う、第三者を欺く、学術、採用、広告ネットワークなどの評価システムをその規則に違反する方法で操作する、または適用法に違反する方法で誤解を招く；",
              "サービスの運用または可用性を妨害または干渉する目的で、過負荷、リバースエンジニアリング、スクレイピング、レート制限の悪用、その他の行為を行う；",
              "割り当てられたクォータ、支払い要件、またはその他の制限を回避する；",
              "無料プランのクォータを複数のアカウントで不正に利用したり、プランで許可された以上の個人がアカウントを共有したりする。"
            ]
          },
          {
            "kind": "p",
            "text": "発行者は、本項に違反したと合理的な理由があると判断した場合、直ちに通知なしにアカウントを停止または終了することができ、いかなる種類の返金も受ける権利はありません。"
          }
        ]
      },
      {
        "id": "content",
        "title": "5. 貴方のコンテンツ",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方がサービスに送信するファイルおよびテキストに関するすべての権利、所有権、利益は貴方に帰属します。貴方は、サービスに対し、要求されたツールを提供するためにのみ処理することを目的とした、厳格に制限された、無償の、世界的なライセンスを付与します。このライセンスは、結果が貴方に返される瞬間（サーバー処理が必要なツール）またはまったく発生しない（ブラウザ内で完結するツール、貴方のファイルは弊社に送信されないため）に終了します。弊社は貴方のコンテンツの所有権を主張することはなく、AIモデルのトレーニングにも使用しません。"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. アカウント",
        "blocks": [
          {
            "kind": "p",
            "text": "アカウントを作成するには、少なくとも16歳以上でなければなりません。貴方は、資格情報を機密に保ち、アカウント下で発生したいかなる活動についても責任を負います。不正アクセスが疑われる場合は、直ちに[support@konvertools.com](mailto:support@konvertools.com)までご連絡ください。"
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. サブスクリプション、請求、返金",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**プラン**：無料（€0）、Pro（月額€25または年額€210）、Business（月額€79または年額€664）。プランの機能およびクォータは、購入時の[料金ページ](/pricing)に記載されているとおりです。弊社は30日間の事前通知をもってプランの機能を変更する権利を有します。",
              "**自動更新**：月額および年額のサブスクリプションは、キャンセルされるまで同じ頻度で自動更新されます。ダッシュボードからいつでもキャンセルできます。キャンセルは現在の請求期間の終了時に有効となり、それまでは引き続きアクセスできます。",
              "**EUにおける解約権（撤回権）**：フランス消費者法第L. 221-28条に基づき、初回の14日間の解約期間中にサービスを能動的にご利用いただいた場合、契約の即時履行に同意したものとみなされ、解約権を放棄したものとみなされます。有償機能をご利用いただいていない場合は、[support@konvertools.com](mailto:support@konvertools.com)までメールを送信することで14日以内に解約でき、弊社は14日以内に全額返金いたします。",
              "**部分返金不可**：上記解約シナリオを除き、現在の請求期間に支払済みの料金は返金されません。",
              "**価格改定**：弊社は30日間の事前通知をもって価格を改定することがあります。既存のサブスクライバーは、次回の更新日まで現在の価格が適用されます。",
              "**決済処理**：決済は、PCI-DSSレベル1の決済処理業者である**Stripe**（Stripe Payments Europe, Ltd.）によって安全に処理されます。弊社はカード情報を一切閲覧または保存しません。発行者が販売者であり、チェックアウト時に表示される金額が請求される金額となり、適用されるVATが表示されます。"
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. 知的財産",
        "blocks": [
          {
            "kind": "p",
            "text": "サービスの名称、ロゴ、コード、デザイン、ドキュメント、データベース構造、集約コンテンツは、発行者の独占的な財産であり、フランスおよび国際的な知的財産法によって保護されています。サービスを意図したとおりに利用するために厳格に必要とされる場合を除き、貴方にはいかなるライセンスも付与されません。貴方は、適用法により明示的に許可されている場合を除き、サービスまたはその一部を複製、改変、逆コンパイル、派生的著作物を作成することはできません。"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. 免責補償",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方は、以下に起因するいかなる請求、損失、損害、責任、費用（合理的な弁護士費用を含む）について、発行者を免責し、損害から保護することに同意します。（a）本規約の違反、（b）法令または第三者の権利の違反、（c）サービスに送信したコンテンツ。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. 規約の変更",
        "blocks": [
          {
            "kind": "p",
            "text": "弊社は本規約を随時改定することがあります。実質的な変更については、変更の30日前までにアカウント保持者にメールで通知されます。この期間を経過した後もサービスをご利用いただくことで、改定された規約に同意したものとみなされます。最新版は常に[https://konvertools.com/terms](https://konvertools.com/terms)でご確認いただけます。"
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. 解約",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方はダッシュボードからいつでもアカウントを解約できます。規約に違反した場合、サービスを悪用した場合、または定期購読料の支払いが滞った場合、弊社は直ちに通知なしにアカウントを解約または停止することがあります。解約後、弊社のプライバシーポリシーに記載されているとおり、請求記録および同意記録を除き、30日以内にデータが削除されます。"
          }
        ]
      },
      {
        "id": "law",
        "title": "12. 準拠法および管轄",
        "blocks": [
          {
            "kind": "p",
            "text": "本規約はフランス法に準拠します。本規約またはサービスに関連する紛争については、欧州連合または適用される国内法により消費者の強制的な権利行使が認められる場合を除き、フランス・パリの裁判所の専属管轄に付託されます。法的措置を講じる前に、[support@konvertools.com](mailto:support@konvertools.com)に書面で連絡し、紛争を友好的な方法で解決することに同意します。EUの消費者は、欧州委員会のオンライン紛争解決プラットフォーム[ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)もご利用いただけます。"
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. その他",
        "blocks": [
          {
            "kind": "p",
            "text": "本規約のいずれかの条項が無効または執行不能と判断された場合でも、他の条項は完全に有効です。弊社による権利または条項の不行使は、その権利の放棄を意味するものではありません。本規約（プライバシーポリシーおよび購入時に参照されるプラン固有の条項とともに）は、サービスに関する貴方と発行者との間の包括的な合意を構成します。"
          }
        ]
      }
    ]
  },
  "zh": {
    "h1": "服务条款",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最后更新：%DATE% · 通过使用 Konvertools，您即表示同意本条款。",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. 接受条款",
        "blocks": [
          {
            "kind": "p",
            "text": "本《服务条款》（以下简称“条款”）构成您（以下简称“您”或“用户”）与 Konvertools 的发布者（以下简称“发布者”、“我们”或“本公司”）之间关于您使用 Konvertools 网站及所有相关工具、API 和服务（统称为“服务”）的一项具有约束力的协议。通过创建账户、在注册时勾选接受复选框或仅使用服务中的任何工具，您即确认已完整阅读、理解并接受本条款的全部内容，同时一并接受我们的《隐私政策》。"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. 服务内容",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools 提供一系列文件转换实用工具、文档与图像处理工具、AI 辅助文本工具、指示性安全工具（邮箱验证器、钓鱼网站检测器、URL 扫描器、SSL 证书检查器、密码泄露检查器）以及开发者工具。大多数工具完全在您的浏览器中执行；部分工具需要服务器处理。服务以“**原样**”和“**按现状**”提供，不附带任何明示或暗示的保证，包括但不限于适销性、适用性或非侵权性。"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 责任限制 — 请仔细阅读",
        "blocks": [
          {
            "kind": "p",
            "text": "**在法律允许的最大范围内，发布者对您使用或无法使用服务而导致的任何损害概不承担责任。**具体而言，您确认并同意发布者不对以下情况承担责任："
          },
          {
            "kind": "ul",
            "items": [
              "数据丢失、文件损坏或转换失败；",
              "基于任何工具输出所做出的决定（包括但不限于财务、商业等）；",
              "服务的停机、延迟或临时不可用；",
              "第三方服务故障（Supabase、Mistral、Google Safe Browsing、HaveIBeenPwned、Stripe、Resend、托管服务提供商）；",
              "间接、附带、特殊、后果性或惩罚性损害赔偿；",
              "任何超过您在引发索赔事件前十二（12）个月内实际向我们支付的费用的累计金额，免费用户上限为一百（100）欧元。"
            ]
          },
          {
            "kind": "p",
            "text": "**安全工具**：URL 扫描器、钓鱼网站检测器、邮箱验证器、SSL 证书检查器及密码泄露检查器仅供**参考和指示性使用**。这些工具汇总第三方信号（Google Safe Browsing、公共 DNS、HaveIBeenPwned、实时 TLS 握手）及大语言模型启发式方法。它们**不构成安全性、有效性或无风险的保证**。新的钓鱼网站出现速度超过信誉数据库的收录速度；通过检查的邮件可能仍为无效或欺诈性邮件；SSL 证书有效并不证明网站内容的安全性。发布者明确放弃因服务判定为安全的钓鱼邮件、服务未识别出的不安全链接、服务标记为有效的地址发送的交易邮件或基于这些工具做出的任何安全决策而导致的任何损害的责任。用户应对上述决策承担全部责任。"
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 可接受的使用方式",
        "blocks": [
          {
            "kind": "p",
            "text": "您同意**不**将服务用于以下用途："
          },
          {
            "kind": "ul",
            "items": [
              "上传、处理或分发在您所在司法管辖区或法国属于非法的内容；",
              "处理您无权处理的文件（未经授权的版权作品、您无权处理的个人数据、机密信息）；",
              "实施或协助欺诈、洗钱、恐怖主义融资或任何刑事活动；",
              "使用 AI 人性化工具、AI 文本工具或其他功能进行抄袭、欺骗第三方、操纵评估系统（学术、招聘、广告网络）以违反其规则，或以任何方式误导他人而违反适用法律；",
              "尝试过载、逆向工程、抓取、滥用速率限制或以其他方式干扰服务的运行或可用性；",
              "规避配额、付费要求或其他限制；",
              "创建多个账户以增加免费额度，或在超过计划允许的情况下共享账户。"
            ]
          },
          {
            "kind": "p",
            "text": "如我们有合理理由相信您违反本条款，我们可立即无通知地暂停或终止您的账户，且无权获得任何形式的退款。"
          }
        ]
      },
      {
        "id": "content",
        "title": "5. 您的内容",
        "blocks": [
          {
            "kind": "p",
            "text": "您对提交至服务的文件和文本保留所有权利、所有权和利益。您授予我们一项严格限定的、免版税的、全球性许可，仅用于处理您请求的工具。该许可在将结果返回给您时（服务器辅助工具）立即终止，或在浏览器端工具中从未生效（因为您的文件未传输至我们）。我们不会、也不会声称拥有您的内容的所有权，也不会将其用于训练 AI 模型。"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. 账户",
        "blocks": [
          {
            "kind": "p",
            "text": "您必须年满十六（16）周岁方可创建账户。您对保管好凭证负责，并对在您账户下发生的任何活动负责。如发现任何未经授权的访问，请立即通过 [support@konvertools.com](mailto:support@konvertools.com) 联系我们。"
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. 订阅、计费与退款",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**套餐**：免费（€0）、专业版（€25/月或€210/年）、商业版（€79/月或€664/年）。套餐功能和配额详见我们在购买时的 [定价页面](/pricing)。我们保留在提前 30 天通知的情况下修改套餐功能的权利。",
              "**自动续费**：月度和年度订阅将自动续费，直至取消。您可随时通过仪表板取消订阅；取消将在当前计费周期结束时生效。您将保留访问权限直至该日期。",
              "**撤回权（欧盟）**：根据《法国消费者法》第 L. 221-28 条，在初始 14 天撤回期内主动使用服务的情况下，您明确同意立即履行合同并放弃撤回权。如您未使用任何付费功能，可在 14 天内通过发送邮件至 [support@konvertools.com](mailto:support@konvertools.com) 撤回，我们将在 14 天内全额退款。",
              "**不予部分退款**：除上述撤回情形外，当前计费周期内已支付的费用概不退款。",
              "**价格变更**：我们可在提前 30 天通知的情况下变更价格。现有订阅用户在下次续费前保持当前价格不变。",
              "**支付处理**：支付由 **Stripe**（Stripe Payments Europe, Ltd.）安全处理，**PCI-DSS 一级**支付处理器。我们不会看到或存储您的卡片信息。发布者为记录销售方；结账时显示的金额为实际收费金额，且适用的增值税将在该处标明。"
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. 知识产权",
        "blocks": [
          {
            "kind": "p",
            "text": "服务的名称、徽标、代码、设计、文档、数据库结构及汇总内容均为发布者的独家财产，受法国及国际知识产权法保护。除为使用服务所必需的严格许可外，您无权复制、修改、反编译或创建服务或其任何部分的衍生作品，法律另有明确规定的除外。"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. 补偿责任",
        "blocks": [
          {
            "kind": "p",
            "text": "您同意对因以下情况导致的任何索赔、损失、损害、责任、成本或费用（包括合理律师费）向发布者进行补偿并使其免受损害：（a）您违反本条款；（b）您违反任何法律或第三方权利；（c）您向服务提交的任何内容。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. 条款变更",
        "blocks": [
          {
            "kind": "p",
            "text": "我们可能不时修改本条款。实质性变更将至少提前三十（30）天通过邮件通知账户持有人。在该期限后继续使用服务即表示您接受修改后的条款。最新版本始终可在 [https://konvertools.com/terms](https://konvertools.com/terms) 查看。"
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. 终止",
        "blocks": [
          {
            "kind": "p",
            "text": "您可随时通过仪表板终止账户。如您违反本条款、滥用服务或未支付订阅费用，我们可立即无通知地终止或暂停您的账户。终止后，您的数据将在三十（30）天内删除，但计费记录和同意记录将按《隐私政策》所述保留。"
          }
        ]
      },
      {
        "id": "law",
        "title": "12. 管辖法律与司法管辖权",
        "blocks": [
          {
            "kind": "p",
            "text": "本条款受法国法律管辖。与本条款或服务相关的任何争议应提交法国巴黎法院专属管辖，但欧盟或适用的国内法赋予消费者强制性诉讼权利的情况除外。在提起法律诉讼前，您同意通过书面方式尝试友好解决争议，发送至 [support@konvertools.com](mailto:support@konvertools.com)。欧盟消费者还可使用欧盟委员会的在线争议解决平台：[ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)。"
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. 其他条款",
        "blocks": [
          {
            "kind": "p",
            "text": "如本条款的任何条款被认定为无效或不可执行，其余条款仍完全有效。我们未行使任何权利或条款不构成对该权利的放弃。本条款（连同《隐私政策》及购买时引用的特定套餐条款）构成您与发布者之间关于服务的完整协议。"
          }
        ]
      }
    ]
  },
  "ko": {
    "h1": "서비스 약관",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "마지막 업데이트: %DATE% · Konvertools를 사용함으로써 귀하는 본 약관에 동의하는 것입니다.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. 수락",
        "blocks": [
          {
            "kind": "p",
            "text": "본 서비스 약관(이하 \"약관\")은 귀하(이하 \"사용자\")와 Konvertools의 발행자(이하 \"발행자\", \"우리\", \"저희\") 간의 Konvertools 웹사이트 및 모든 관련 도구, API, 서비스(이하 \"서비스\") 사용에 대한 구속력 있는 계약을 형성합니다. 계정을 생성하거나, 가입 시 수락 확인란을 체크하거나, 서비스상의 어떤 도구라도 사용함으로써 귀하는 본 약관 전체를 읽고 이해했으며, 본 약관과 개인정보 보호정책에 완전히 동의함을 확인하는 것입니다."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. 서비스",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools는 파일 변환 유틸리티, 문서 및 이미지 처리 도구, AI 지원 텍스트 유틸리티, 보안 도구(이메일 검증기, 피싱 탐지기, URL 스캐너, SSL 인증서 확인기, 비밀번호 유출 확인기) 및 개발자 유틸리티로 구성된 카탈로그를 제공합니다. 대부분의 도구는 브라우저에서 완전히 실행되며, 일부는 서버 처리가 필요합니다. 서비스는 **\"있는 그대로\"** 및 **\"사용 가능한 상태로\"** 제공되며, 명시적 또는 묵시적 보증(상품성, 특정 목적 적합성, 비침해 포함)을 포함하여 어떠한 종류의 보증도 제공되지 않습니다."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 책임 제한 — 주의 깊게 읽어보십시오",
        "blocks": [
          {
            "kind": "p",
            "text": "**법이 허용하는 최대한의 범위 내에서 발행자는 서비스 사용 또는 사용 불가능으로 인해 발생할 수 있는 모든 종류의 손해에 대한 책임을 부인합니다.** 특히 귀하는 다음 사항을 인정하고 동의합니다. 발행자는 다음 사항에 대해 책임을 지지 않습니다."
          },
          {
            "kind": "ul",
            "items": [
              "데이터 손실, 손상 또는 잘못된 파일, 또는 변환 실패;",
              "도구의 출력물을 기반으로 한 의사 결정(재정, 비즈니스 등);",
              "서비스의 가동 중단, 지연 또는 일시적 사용 불가;",
              "서드파티 서비스 장애(Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, 호스팅 제공업체);",
              "간접적, 우발적, 특별, 결과적 또는 징벌적 손해;",
              "청구 원인이 되는 사건 발생 전 12개월 동안 귀하가 지불한 실제 요금의 총액을 초과하는 금액(무료 등급 사용자의 경우 100유로로 제한)."
            ]
          },
          {
            "kind": "p",
            "text": "**보안 도구**: URL 스캐너, 피싱 탐지기, 이메일 검증기, SSL 인증서 확인기, 비밀번호 유출 확인기는 **정보 제공 및 지표 목적**으로만 제공됩니다. 이러한 도구는 서드파티 신호(Google Safe Browsing, 공개 DNS, HaveIBeenPwned, 실시간 TLS 핸드셰이크) 및 대규모 언어 모델 기반 추론을 집계합니다. 이러한 도구는 **안전성, 유효성 또는 위험 부재에 대한 보증을 구성하지 않습니다**. 새로운 피싱 페이지는 평판 데이터베이스가 카탈로그를 작성하기 전에 더 빠르게 나타나며, 검사를 통과한 이메일이 여전히 비활성 또는 사기일 수 있습니다. SSL 인증서가 유효하다고 해서 사이트의 콘텐츠가 안전하다는 의미는 아닙니다. 발행자는 이러한 도구에 따라 안전한 것으로 판단된 피싱 이메일, 탐지하지 못한 안전하지 않은 링크, 서비스가 유효하다고 표시한 주소로 전송된 거래용 이메일 또는 이러한 도구를 기반으로 한 보안 결정으로 인해 발생한 모든 손해에 대해 명시적으로 책임을 거부합니다. 사용자는 이러한 결정에 대한 전적인 책임을 집니다."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 허용 가능한 사용",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 다음 행위를 위해 서비스를 사용하지 않기로 동의합니다."
          },
          {
            "kind": "ul",
            "items": [
              "귀하의 관할권 또는 프랑스에서 불법인 콘텐츠를 업로드, 처리 또는 배포;",
              "필요한 권리를 보유하지 않은 파일 처리(허가 없이 저작권이 있는 작품, 처리할 권한이 없는 개인 데이터, 기밀 정보);",
              "사기, 돈세탁, 테러리즘 자금 조달 또는 기타 범죄 행위를 저지르거나 용이하게 함;",
              "AI 인간화 도구, AI 텍스트 도구 또는 기타 기능을 사용하여 표절을 하거나, 제3자를 속이거나, 학술, 채용, 광고 네트워크 등 평가 시스템을 해당 규칙에 위배되는 방식으로 조작하거나, 적용 가능한 법률을 위반하여 오도하는 행위;",
              "서비스의 운영 또는 가용성을 방해하거나 과도한 부하를 일으키려는 시도, 리버스 엔지니어링, 스크래핑, 비율 제한 남용 또는 기타 간섭;",
              "할당량, 결제 요구 사항 또는 기타 제한을 우회;",
              "무료 등급 할당량을 늘리기 위해 다중 계정을 생성하거나, 계획에서 허용하는 것보다 더 많은 개인 간 계정을 공유."
            ]
          },
          {
            "kind": "p",
            "text": "본 조항을 위반했다고 합리적인 근거가 있는 경우, 예고 없이 즉시 계정을 정지 또는 종료할 수 있으며, 어떠한 종류의 환불도 받을 수 없습니다."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. 귀하의 콘텐츠",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 서비스에 제출하는 파일 및 텍스트에 대한 모든 권리, 소유권 및 이익을 보유합니다. 귀하는 요청한 도구를 제공하기 위해 해당 콘텐츠를 처리할 수 있도록 엄격히 제한된, 무료, 전 세계적인 라이선스를 발행자에게 부여합니다. 이 라이선스는 결과가 귀하에게 반환되는 즉시 종료됩니다(서버 지원 도구) 또는 브라우저 전용 도구의 경우(파일이 저희에게 전송되지 않으므로) 아예 발생하지 않습니다. 저희는 귀하의 콘텐츠에 대한 소유권을 주장하지 않으며, AI 모델 훈련에 사용하지 않습니다."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. 계정",
        "blocks": [
          {
            "kind": "p",
            "text": "계정을 생성하려면 최소 16세 이상이어야 합니다. 귀하는 자격 증명을 비밀로 유지할 책임이 있으며, 계정 하에서 발생하는 모든 활동에 대해 책임을 집니다. [support@konvertools.com](mailto:support@konvertools.com)으로 suspected unauthorized access(허가받지 않은 접근 의심)을 즉시 알리십시오."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. 구독, 결제 및 환불",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**플랜**: 무료(€0), 프로(€25/월 또는 €210/년), 비즈니스(€79/월 또는 €664/년). 플랜의 기능 및 할당량은 구매 시 [가격 페이지](/pricing)에서 설명된 대로 제공됩니다. 저희는 30일 전에 공지하고 플랜 기능을 수정할 권리를 보유합니다.",
              "**자동 갱신**: 월간 및 연간 구독은 취소할 때까지 동일한 주기로 자동 갱신됩니다. 언제든지 대시보드에서 취소할 수 있으며, 취소는 현재 결제 기간이 종료될 때 적용됩니다. 해당 날짜까지 서비스에 계속 접근할 수 있습니다.",
              "**철회권(EU)**: 프랑스 소비자법 제 L. 221-28조에 따라, 초기 14일 철회 기간 동안 서비스를 적극적으로 사용한 경우 계약의 즉시 이행을 명시적으로 동의하며, 철회권을 포기합니다. 유료 기능을 사용하지 않은 경우 [support@konvertools.com](mailto:support@konvertools.com)으로 이메일을 보내 14일 이내에 철회할 수 있으며, 저희는 14일 이내에 전액 환불을 발행합니다.",
              "**부분 환불 불가**: 위의 철회 시나리오 외에는 현재 결제 기간에 대해 이미 지불한 요금은 환불되지 않습니다.",
              "**가격 변경**: 저희는 30일 전에 가격을 변경할 수 있습니다. 기존 구독자는 다음 갱신일까지 현재 가격을 유지합니다.",
              "**결제 처리**: 결제는 **Stripe**(Stripe Payments Europe, Ltd.)를 통해 안전하게 처리됩니다. PCI-DSS Level 1 결제 처리업체입니다. 저희는 카드 세부 정보를 확인하거나 저장하지 않습니다. 발행자는 판매자로서 기록되며, 결제 시 표시된 금액이 청구되며, 적용 가능한 부가가치세가 표시됩니다."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. 지식재산권",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스의 이름, 로고, 코드, 디자인, 문서, 데이터베이스 구조 및 집계된 콘텐츠는 발행자의 독점 재산이며, 프랑스 및 국제 지식재산권 법률에 의해 보호됩니다. 서비스 사용에 필요한 범위를 초과하는 라이선스는 부여되지 않습니다. 적용 가능한 법률에 명시적으로 허용된 경우를 제외하고, 서비스의 복제, 수정, 역공학, 파생 작품 생성을 할 수 없습니다."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. 면책 및 손해배상",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 다음 사항으로 인해 발생하는 모든 청구, 손실, 손해, 책임, 비용 또는 비용(합리적인 법적 수수료 포함)에 대해 발행자를 면책하고 손해로부터 보호할 것에 동의합니다. (a) 본 약관 위반, (b) 법 또는 제3자 권리 위반, (c) 서비스에 제출한 콘텐츠."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. 약관 변경",
        "blocks": [
          {
            "kind": "p",
            "text": "저희는 때때로 본 약관을 수정할 수 있습니다. 실질적인 변경 사항은 계정 보유자에게 약관 변경이 발효되기 최소 30일 전에 이메일로 알립니다. 해당 기간 후에도 서비스를 계속 사용하면 수정된 약관에 동의하는 것입니다. 최신 버전은 항상 [https://konvertools.com/terms](https://konvertools.com/terms)에서 확인할 수 있습니다."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. 종료",
        "blocks": [
          {
            "kind": "p",
            "text": "언제든지 대시보드에서 계정을 종료할 수 있습니다. 본 약관을 위반하거나, 서비스를 남용하거나, 정기 구독료를 지불하지 않을 경우 저희는 즉시 예고 없이 계정을 종료 또는 정지할 수 있습니다. 종료 시 billing records(청구 기록) 및 개인정보 보호정책에 설명된 대로 보관된 동의 기록을 제외하고 데이터가 30일 이내에 삭제됩니다."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. 준거법 및 관할",
        "blocks": [
          {
            "kind": "p",
            "text": "본 약관은 프랑스 법률에 따라 규율됩니다. 본 약관 또는 서비스와 관련하여 발생하는 분쟁은 유럽 연합 또는 적용 가능한 국내법에 따라 소비자의 강제적 권리가 보장되는 경우를 제외하고, 프랑스 파리 소재 법원의 전속 관할권에 제출됩니다. 법적 조치를 시작하기 전에 [support@konvertools.com](mailto:support@konvertools.com)으로 분쟁을amicably(원만히) 해결하기 위해 서면으로 연락하기로 동의합니다. EU 소비자는 [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)에서 유럽 위원회의 온라인 분쟁 해결 플랫폼을 사용할 수도 있습니다."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. 기타",
        "blocks": [
          {
            "kind": "p",
            "text": "본 약관의 어떠한 조항도 무효 또는 집행 불가능한 것으로 판결될 경우, 나머지 조항은 완전히 유효합니다. 저희의 권리 또는 조항의 집행 실패는 해당 권리의 포기로 간주되지 않습니다. 본 약관(구매 시 참조된 플랜별 약관 및 개인정보 보호정책 포함)은 서비스와 관련하여 귀하와 발행자 간의 전체 계약을 구성합니다."
          }
        ]
      }
    ]
  },
  "ar": {
    "h1": "شروط الخدمة",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "آخر تحديث: %DATE% · باستخدامك لـ Konvertools، فإنك توافق على هذه الشروط.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. القبول",
        "blocks": [
          {
            "kind": "p",
            "text": "تشكل هذه الشروط (المشار إليها بـ \"الشروط\") اتفاقية ملزمة بينك (المستخدم \"المستخدم\") والناشر لـ Konvertools (الناشر \"الناشر\"، \"نحن\"، \"لدينا\") فيما يتعلق باستخدامك لموقع Konvertools وجميع الأدوات والواجهات البرمجية والخدمات ذات الصلة (يشار إليها مجتمعة بـ \"الخدمة\"). من خلال إنشاء حساب، أو تحديد مربع القبول أثناء التسجيل، أو ببساطة باستخدام أي أداة في الخدمة، فإنك تؤكد أنك قد قرأت وفهمت وقبلت هذه الشروط بالكامل، إلى جانب سياستنا الخاصة بالخصوصية."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. الخدمة",
        "blocks": [
          {
            "kind": "p",
            "text": "توفر Konvertools كتالوجاً من أدوات تحويل الملفات، وأدوات معالجة المستندات والصور، وأدوات النص المدعومة بالذكاء الاصطناعي، وأدوات الأمان التوجيهية (محقق البريد الإلكتروني، كاشف التصيد، ماسح الروابط، فاحص شهادة SSL، فاحص اختراق كلمات المرور) وأدوات المطورين. تنفذ معظم الأدوات بالكامل في متصفحك؛ بينما تتطلب بعضها معالجة على الخادم. تُقدم الخدمة **\"كما هي\" و\"كما متوفرة\"** دون أي ضمان من أي نوع، سواء كان ذلك صريحاً أو ضمنياً، بما في ذلك قابلية البيع، أو الملاءمة لغرض معين، أو عدم انتهاك الحقوق."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. الحد من المسؤولية — اقرأ بعناية",
        "blocks": [
          {
            "kind": "p",
            "text": "**إلى الحد الأقصى المسموح به بموجب القانون، يتنازل الناشر عن أي مسؤولية عن الأضرار من أي نوع ناتجة عن استخدامك أو عدم قدرتك على استخدام الخدمة.** وبشكل خاص، فإنك تقر وتوافق على أن الناشر لن يكون مسؤولاً عن:"
          },
          {
            "kind": "ul",
            "items": [
              "فقدان البيانات، أو تلف أو عدم صحة الملفات، أو تحويلات فاشلة؛",
              "القرارات، المالية أو التجارية أو غيرها، التي تتخذها بناءً على مخرجات أي أداة؛",
              "فترات التوقف، أو التأخير، أو عدم توفر أي ميزة مؤقتاً؛",
              "فشل الخدمات التابعة لجهات خارجية (Supabase، Mistral، Google Safe Browsing، HaveIBeenPwned، Stripe، Resend، مزودي الاستضافة)؛",
              "الأضرار غير المباشرة، العرضية، الخاصة، اللاحقة أو العقابية من أي نوع؛",
              "أي مبلغ إجمالي يتجاوز الرسوم التي دفعتها إلينا فعلياً في الاثني عشر (12) شهراً السابقة للحدث الذي أدى إلى المطالبة، مع سقف قدره مائة (100) يورو للمستخدمين في المستوى المجاني."
            ]
          },
          {
            "kind": "p",
            "text": "**أدوات الأمان**: ماسح الروابط، وكاشف التصيد، ومحقق البريد الإلكتروني، وفاحص شهادة SSL، وفاحص اختراق كلمات المرور تُقدم **لأغراض استرشادية وإعلامية فقط**. فهي تجمع إشارات من جهات خارجية (Google Safe Browsing، DNS العام، HaveIBeenPwned، مصافحات TLS الحية) وقياسات نماذج اللغة الكبيرة. **لا تشكل هذه الأدوات ضماناً للسلامة أو الصحة أو عدم وجود مخاطر**. تظهر صفحات التصيد الجديدة بشكل أسرع من قدرة قواعد البيانات على تصنيفها؛ قد يكون البريد الإلكتروني الذي اجتاز فحصنا لا يزال غير نشط أو احتيالياً؛ لا يضمن صلاحية شهادة SSL سلامة محتوى الموقع. يتنازل الناشر صراحة عن أي مسؤولية عن أي ضرر ناتج عن بريد إلكتروني تصيدي اعتبرته الخدمة آمناً، أو رابطاً غير آمن فشلت في تحديده، أو بريد إلكتروني معاملة أُرسل إلى عنوان اعتبرته الخدمة صالحاً، أو أي قرار أمني اتخذ بناءً على هذه الأدوات. يتحمل المستخدم المسؤولية الكاملة عن مثل هذه القرارات."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. الاستخدام المقبول",
        "blocks": [
          {
            "kind": "p",
            "text": "أنت توافق **عدم** استخدام الخدمة لـ:"
          },
          {
            "kind": "ul",
            "items": [
              "رفع أو معالجة أو توزيع محتوى غير قانوني في بلدك أو في فرنسا؛",
              "معالجة ملفات لا تملك الحقوق اللازمة لها (مؤلفات محمية بحقوق الطبع والنشر دون إذن، بيانات شخصية لا يحق لك معالجتها، معلومات مصنفة)؛",
              "ارتكاب أو تسهيل الاحتيال، غسل الأموال، تمويل الإرهاب أو أي نشاط إجرامي؛",
              "استخدام أدوات التزييف البشري للذكاء الاصطناعي، أو أدوات النص للذكاء الاصطناعي، أو أي ميزة أخرى للانتحال، أو لخداع طرف ثالث، أو لت manipulate أنظمة التقييم (أكاديمية، توظيف، شبكات إعلانية) بما يخالف قواعدها، أو لإضفاء طابع خادع بأي طريقة تنتهك القانون المعمول به؛",
              "محاولة تحميل الخدمة، أو الهندسة العكسية، أو الاستخلاص، أو تجاوز حدود المعدل، أو التدخل بأي طريقة أخرى في تشغيل الخدمة أو توافرها؛",
              "التحايل على الحصص أو متطلبات الدفع أو أي قيود أخرى مفروضة؛",
              "إنشاء حسابات متعددة لتضخيم حصص المستوى المجاني، أو مشاركة حساب عبر أكثر من فرد مما يسمح به خطتك."
            ]
          },
          {
            "kind": "p",
            "text": "يجوز لنا تعليق أو إنهاء حسابك فوراً ودون إشعار إذا كان لدينا أسباب معقولة للاعتقاد أنك انتهكت هذا القسم، دون الحق في استرداد أي مبلغ."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. المحتوى الخاص بك",
        "blocks": [
          {
            "kind": "p",
            "text": "أنت تحتفظ بجميع الحقوق، والملكية، والفائدة في الملفات والنصوص التي تقدمها إلى الخدمة. تمنحنا رخصة محدودة للغاية، مجانية من حقوق الملكية، عالمية لاستخدامها حصرياً لتقديم الأداة التي طلبتها. تنتهي هذه الرخصة فور إرجاع النتيجة إليك (الأدوات التي تتطلب معالجة على الخادم) أو لا تنشأ على الإطلاق (الأدوات التي تعمل في المتصفح فقط، حيث لا تصل ملفاتك إلينا أبداً). نحن لا نطالب، ولن نطالب، بملكية محتواك أو استخدامه لتدريب نماذج الذكاء الاصطناعي."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. الحسابات",
        "blocks": [
          {
            "kind": "p",
            "text": "يجب أن يكون عمرك ستة عشر (16) عاماً على الأقل لإنشاء حساب. أنت مسؤول عن الحفاظ على سرية بيانات الاعتماد الخاصة بك وأي نشاط يحدث تحت حسابك. أخبرنا فوراً عبر البريد الإلكتروني [support@konvertools.com](mailto:support@konvertools.com) بأي وصول غير مصرح به مشتبه به."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. الاشتراكات، الفوترة وردود الأموال",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**الخطط**: مجاني (€0)، محترف (€25/شهر أو €210/سنة)، أعمال (€79/شهر أو €664/سنة). يتم وصف ميزات الخطط والحصص على [صفحة التسعير الخاصة بنا](/pricing) وقت الشراء. نحتفظ بحق تعديل ميزات الخطط مع إشعار مدته 30 يوماً.",
              "**التجديد التلقائي**: يتم تجديد الاشتراكات الشهرية والسنوية تلقائياً بنفس وتيرتها حتى يتم الإلغاء. يمكنك الإلغاء في أي وقت من لوحة التحكم الخاصة بك؛ يدخل الإلغاء حيز التنفيذ في نهاية فترة الفوترة الحالية. تحتفظ بالوصول حتى ذلك التاريخ.",
              "**حق الانسحاب (الاتحاد الأوروبي)**: بموجب المادة L. 221-28 من قانون المستهلك الفرنسي، عندما تستخدم الخدمة بنشاط خلال فترة الانسحاب الأولية البالغة 14 يوماً، فإنك توافق صراحة على التنفيذ الفوري للعقد وتنازل عن حقك في الانسحاب. إذا لم تستخدم أي ميزة مدفوعة، يمكنك الانسحاب خلال 14 يوماً عبر إرسال بريد إلكتروني إلى [support@konvertools.com](mailto:support@konvertools.com) وسنقوم برد المبلغ بالكامل خلال 14 يوماً.",
              "**لا ترد الأموال الجزئية**: خارج سيناريو الانسحاب المذكور أعلاه، فإن الرسوم المدفوعة بالفعل للفترة الفواتيرية الحالية غير قابلة للاسترداد.",
              "**تغييرات الأسعار**: يجوز لنا تعديل الأسعار مع إشعار مدته 30 يوماً. يحتفظ المشتركون الحاليون بسعرهم الحالي حتى تاريخ تجديدهم التالي.",
              "**معالجة الدفع**: تتم معالجة المدفوعات بشكل آمن عبر **Stripe** (Stripe Payments Europe, Ltd.)، معالج دفع معتمد من PCI-DSS المستوى 1. نحن لا نرى أو نخزن تفاصيل بطاقتك أبداً. الناشر هو بائع السجل؛ المبلغshown في عملية الدفع هو المبلغ الذي يتم تحصيله، ويتم الإشارة إلى أي ضريبة VAT مطبقة هناك."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. الملكية الفكرية",
        "blocks": [
          {
            "kind": "p",
            "text": "الاسم، والشعار، والشيفرة، والتصميم، والتوثيق، وهيكل قاعدة البيانات والمحتوى المجمّع للخدمة هي ملكية حصرية للناشر وتحميها قوانين الملكية الفكرية الفرنسية والدولية. لا يتم منح أي رخصة لك بخلاف ما هو ضروري بشكل صارم لاستخدام الخدمة كما هو مقصود. لا يجوز لك استنساخ أو تعديل أو فك تشفير أو إنشاء أعمال مشتقة من الخدمة أو أي جزء منها، إلا إذا كان ذلك مسموحاً صراحة بموجب القانون المعمول به."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. التعويض",
        "blocks": [
          {
            "kind": "p",
            "text": "أنت توافق على تعويض الناشر وحمايته من أي مطالبة أو خسارة أو ضرر أو مسؤولية أو تكلفة أو مصروف (بما في ذلك الرسوم القانونية المعقولة) تنشأ عن (أ) انتهاكك لهذه الشروط، (ب) انتهاكك لأي قانون أو حق طرف ثالث، أو (ج) أي محتوى قدمته إلى الخدمة."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. التغييرات في الشروط",
        "blocks": [
          {
            "kind": "p",
            "text": "يجوز لنا تعديل هذه الشروط من وقت لآخر. سيتم إشعار التغييرات الجوهرية عبر البريد الإلكتروني لحاملي الحسابات قبل 30 يوماً على الأقل من سريانها. من خلال مواصلة استخدامك للخدمة بعد تلك الفترة، فإنك تقبل الشروط المعدلة. الإصدار الأحدث متاح دائماً على [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. الإنهاء",
        "blocks": [
          {
            "kind": "p",
            "text": "يجوز لك إنهاء حسابك في أي وقت من لوحة التحكم الخاصة بك. يجوز لنا إنهاء أو تعليق حسابك فوراً ودون إشعار إذا انتهكت هذه الشروط، أو أسأت استخدام الخدمة، أو فشلت في دفع اشتراك متكرر. عند الإنهاء، يتم حذف بياناتك خلال ثلاثين (30) يوماً، باستثناء سجلات الفوترة وسجلات الموافقة التي تحتفظ بها وفقاً لسياستنا الخاصة بالخصوصية."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. القانون الحاكم والاختصاص القضائي",
        "blocks": [
          {
            "kind": "p",
            "text": "تخضع هذه الشروط لقوانين فرنسا. يتم تقديم أي نزاع ينشأ عن هذه الشروط أو الخدمة إلى الاختصاص الحصري لمحاكم باريس، فرنسا، باستثناء الحقوق الإلزامية للمستهلك في بلد إقامتهم وفقاً لقانون الاتحاد الأوروبي أو القانون الوطني المعمول به. قبل بدء أي إجراء قانوني، соглашаетесь попытаться разрешить спор дружелюбно, написав на [support@konvertools.com](mailto:support@konvertools.com). потребители ЕС также могут воспользоваться платформой Европейской комиссии по разрешению споров в Интернете на [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. أحكام متنوعة",
        "blocks": [
          {
            "kind": "p",
            "text": "إذا تم اعتبار أي بند من هذه الشروط باطلاً أو غير قابل للتنفيذ، تظل البنود المتبقية سارية بالكامل. عدم قيامنا بإنفاذ أي حق أو بند لا يشكل تنازلاً عن ذلك الحق. تشكل هذه الشروط (إلى جانب سياسة الخصوصية وأي شروط محددة للخطة المشار إليها عند الشراء) الاتفاقية الكاملة بينك وبين الناشر فيما يتعلق بالخدمة."
          }
        ]
      }
    ]
  },
  "ru": {
    "h1": "Условия обслуживания",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Последнее обновление: %DATE% · Используя Konvertools, вы соглашаетесь с этими условиями.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Принятие условий",
        "blocks": [
          {
            "kind": "p",
            "text": "Настоящие Условия обслуживания (далее — «Условия») представляют собой обязательное соглашение между вами (далее — «Пользователь») и издателем сервиса Konvertools (далее — «Издатель», «мы», «нас») в отношении использования вами веб-сайта Konvertools и всех связанных инструментов, API и услуг (совокупно именуемых «Сервис»). Создавая учётную запись, отмечая флажок согласия при регистрации или просто используя любой инструмент на Сервисе, вы подтверждаете, что ознакомились, поняли и полностью принимаете настоящие Условия вместе с нашей Политикой конфиденциальности."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Описание Сервиса",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools предоставляет каталог утилит для конвертации файлов, инструменты обработки документов и изображений, утилиты на основе ИИ, а также инструменты для проверки безопасности (верификатор электронной почты, детектор фишинга, сканер URL, проверка SSL-сертификатов, проверка утечек паролей) и разработчиков. Большинство инструментов работают полностью в вашем браузере; некоторые требуют серверной обработки. Сервис предоставляется **«как есть»** и **«доступен»** без каких-либо явных или подразумеваемых гарантий, включая коммерческую пригодность, пригодность для конкретных целей или отсутствие нарушений прав."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Ограничение ответственности — внимательно прочитайте",
        "blocks": [
          {
            "kind": "p",
            "text": "**В максимально возможной степени, допустимой законом, Издатель снимает с себя ответственность за любой ущерб, возникший в результате использования вами или невозможности использования Сервиса.** В частности, вы признаёте и соглашаетесь с тем, что Издатель не несёт ответственности за:"
          },
          {
            "kind": "ul",
            "items": [
              "потеря данных, повреждённые или некорректные файлы, неудачные конвертации;",
              "решения, финансовые, деловые или иные, которые вы принимаете на основе результатов работы любого инструмента;",
              "простои, задержки или временную недоступность любой функции;",
              "сбои сторонних сервисов (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, хостинг-провайдеры);",
              "косвенные, случайные, специальные, косвенные или штрафные убытки любого рода;",
              "любую совокупную сумму, превышающую плату, которую вы фактически уплатили нам в течение двенадцати (12) месяцев, предшествующих событию, повлёкшему претензию, с лимитом в сто (100) евро для пользователей бесплатного тарифа."
            ]
          },
          {
            "kind": "p",
            "text": "**Инструменты безопасности**: сканер URL, детектор фишинга, верификатор электронной почты, проверка SSL-сертификатов и проверка утечек паролей предоставляются **исключительно в информационных и ознакомительных целях**. Они агрегируют сторонние сигналы (Google Safe Browsing, публичные DNS, HaveIBeenPwned, живые TLS-рукопожатия) и эвристику на основе больших языковых моделей. Они **не являются гарантией безопасности, достоверности или отсутствия риска**. Новые фишинговые страницы появляются быстрее, чем базы репутации успевают их каталогизировать; электронное письмо, прошедшее наши проверки, может оказаться недействительным или мошенническим; действительный SSL-сертификат не гарантирует подлинность содержимого сайта. Издатель прямо отказывается от любой ответственности за любой вред, возникший в результате фишингового письма, которое Сервис счёл безопасным, небезопасной ссылки, которую Сервис не сумел идентифицировать, транзакционного письма, отправленного на адрес, который Сервис пометил как действительный, или любого решения о безопасности, принятого на основе этих инструментов. Пользователь несет единоличную ответственность за такие решения."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Допустимое использование",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы соглашаетесь **не** использовать Сервис для:"
          },
          {
            "kind": "ul",
            "items": [
              "загрузки, обработки или распространения контента, который является незаконным в вашей юрисдикции или во Франции;",
              "обработки файлов, на которые у вас нет необходимых прав (произведения, защищённые авторским правом без разрешения, личные данные, к обработке которых вы не уполномочены, секретная информация);",
              "совершения или содействия мошенничеству, отмыванию денег, финансированию терроризма или любой другой преступной деятельности;",
              "использования инструментов для «человезации» текста на основе ИИ, других текстовых инструментов или любых других функций для плагиата, введения в заблуждение третьих лиц, манипуляции системами оценки (академическими, рекрутинговыми, рекламными сетями) в нарушение их правил или для введения в заблуждение любым способом, противоречащим применимому законодательству;",
              "попыток перегрузить, reverse-engineer, scrapить, нарушать лимиты запросов или иным образом вмешиваться в работу или доступность Сервиса;",
              "обхода квот, требований оплаты или любых других ограничений, действующих на Сервисе;",
              "создания нескольких учётных записей для увеличения квот бесплатного тарифа или совместного использования одной учётной записи несколькими лицами, если это не разрешено вашим тарифным планом."
            ]
          },
          {
            "kind": "p",
            "text": "Мы можем немедленно приостановить или заблокировать вашу учётную запись без предварительного уведомления, если у нас есть разумные основания полагать, что вы нарушили этот раздел, без права на возмещение уплаченных сумм."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ваш контент",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы сохраняете все права, титул и интерес в отношении файлов и текста, которые вы отправляете на Сервис. Вы предоставляете нам строго ограниченную, безвозмездную, всемирную лицензию на их обработку исключительно для предоставления запрошенного вами инструмента. Эта лицензия прекращает своё действие в момент возврата результата вам (для инструментов с серверной обработкой) или не возникает вовсе (для инструментов, работающих только в браузере, поскольку ваш файл до нас не доходит). Мы не претендуем и не будем претендовать на право собственности на ваш контент и не будем использовать его для обучения моделей ИИ."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Учётные записи",
        "blocks": [
          {
            "kind": "p",
            "text": "Вам должно быть не менее шестнадцати (16) лет для создания учётной записи. Вы несёте ответственность за сохранность ваших учётных данных и за любую активность, происходящую под вашей учётной записью. Немедленно уведомите нас по адресу [support@konvertools.com](mailto:support@konvertools.com) о любом подозрении в несанкционированном доступе."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Подписки, оплата и возврат средств",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Тарифные планы**: бесплатный (€0), Pro (€25/месяц или €210/год), Business (€79/месяц или €664/год). Особенности тарифных планов и квоты описаны на нашей [странице тарифов](/pricing) на момент покупки. Мы оставляем за собой право изменять особенности тарифных планов с уведомлением за 30 дней.",
              "**Автопродление**: ежемесячные и ежегодные подписки продлеваются автоматически в том же режиме до момента отмены. Вы можете отменить подписку в любой момент через вашу панель управления; отмена вступает в силу в конце текущего расчётного периода. Вы сохраняете доступ до этой даты.",
              "**Право на отказ (ЕС)**: в соответствии со статьёй L. 221-28 Французского кодекса защиты прав потребителей, если вы активно используете Сервис в течение первоначального 14-дневного периода отказа, вы прямо соглашаетесь на немедленное исполнение договора и отказываетесь от права на отказ. Если вы не использовали ни одну из платных функций, вы можете отказаться в течение 14 дней, отправив письмо на [support@konvertools.com](mailto:support@konvertools.com), и мы вернём вам полную сумму в течение 14 дней.",
              "**Возврат средств не производится**: за пределами описанного выше сценария отказа, уже уплаченные за текущий расчётный период средства не подлежат возврату.",
              "**Изменение цен**: мы можем изменять цены с уведомлением за 30 дней. Действующие подписчики сохраняют текущую цену до следующей даты продления.",
              "**Обработка платежей**: платежи обрабатываются securely **Stripe** (Stripe Payments Europe, Ltd.), платёжным процессором уровня PCI-DSS 1. Мы не видим и не храним данные вашей карты. Издатель является продавцом; сумма, указанная при оформлении заказа, является суммой к оплате, и любые применимые налоги указываются там же."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Интеллектуальная собственность",
        "blocks": [
          {
            "kind": "p",
            "text": "Название, логотип, код, дизайн, документация, структура базы данных и агрегированный контент Сервиса являются исключительной собственностью Издателя и защищены французским и международным законодательством об интеллектуальной собственности. Вам предоставляется только та лицензия, которая строго необходима для использования Сервиса по назначению. Вы не вправе воспроизводить, изменять, декомпилировать или создавать производные произведения Сервиса или любой его части, кроме случаев, прямо разрешённых применимым законодательством."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Возмещение ущерба",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы соглашаетесь возместить Издателю любой ущерб, убытки, ответственность, затраты или расходы (включая разумные юридические сборы), возникшие в результате (a) вашего нарушения настоящих Условий, (b) вашего нарушения любого закона или прав третьих лиц, или (c) любого контента, который вы отправили на Сервис."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Изменение Условий",
        "blocks": [
          {
            "kind": "p",
            "text": "Мы можем время от времени изменять настоящие Условия. Существенные изменения будут доведены до сведения владельцев учётных записей по электронной почте не менее чем за тридцать (30) дней до их вступления в силу. Продолжая использовать Сервис после этого периода, вы принимаете изменённые Условия. Последняя версия всегда доступна по адресу [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Прекращение действия",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы можете закрыть свою учётную запись в любой момент через панель управления. Мы можем немедленно приостановить или заблокировать вашу учётную запись без предварительного уведомления, если вы нарушили настоящие Условия, злоупотребили Сервисом или не оплатили текущую подписку. После прекращения действия ваши данные удаляются в течение тридцати (30) дней, за исключением платёжных записей и записей о согласии, которые хранятся в соответствии с нашей Политикой конфиденциальности."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Применимое право и подсудность",
        "blocks": [
          {
            "kind": "p",
            "text": "Настоящие Условия регулируются законодательством Франции. Любые споры, возникающие из настоящих Условий или в связи с Сервисом, подлежат рассмотрению в исключительной юрисдикции судов Парижа, Франция, за исключением случаев, когда обязательное право потребителя на обращение в суд в стране его проживания превалирует в соответствии с законодательством Европейского Союза или национальным законодательством. Прежде чем начинать судебное разбирательство, вы соглашаетесь попытаться урегулировать спор мирным путём, направив письмо на [support@konvertools.com](mailto:support@konvertools.com). Потребители из ЕС также могут воспользоваться платформой Европейской комиссии по разрешению споров в Интернете по адресу [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Прочие положения",
        "blocks": [
          {
            "kind": "p",
            "text": "Если какое-либо положение настоящих Условий признано недействительным или неисполнимым, остальные положения сохраняют полную силу. Наше неисполнение какого-либо права или положения не является отказом от этого права. Настоящие Условия (вместе с Политикой конфиденциальности и любыми специфичными для тарифного плана условиями, упомянутыми при покупке) составляют полное соглашение между вами и Издателем в отношении Сервиса."
          }
        ]
      }
    ]
  },
  "hi": {
    "h1": "सेवा की शर्तें",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "अंतिम अपडेट: %DATE% · Konvertools का उपयोग करके आप इन शर्तों से सहमत होते हैं।",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. स्वीकृति",
        "blocks": [
          {
            "kind": "p",
            "text": "ये सेवा की शर्तें (\"शर्तें\") आपके (\"उपयोगकर्ता\") और Konvertools के प्रकाशक (\"प्रकाशक\", \"हम\", \"हमें\") के बीच आपके द्वारा Konvertools वेबसाइट और सभी संबंधित टूल, API और सेवाओं (सामूहिक रूप से \"सेवा\") के उपयोग के संबंध में एक बाध्यकारी समझौता बनाती हैं। एक खाता बनाकर, साइनअप पर स्वीकृति बॉक्स पर टिक लगाकर, या सेवा पर किसी भी टूल का उपयोग करके, आप पुष्टि करते हैं कि आपने इन शर्तों को पूरी तरह से पढ़ लिया है, समझ लिया है और स्वीकार कर लिया है, साथ ही हमारी गोपनीयता नीति के साथ भी।"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. सेवा",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools फ़ाइल-कनवर्ज़न उपयोगिताओं, दस्तावेज़ और छवि प्रसंस्करण टूल, AI-सहायता प्राप्त पाठ उपयोगिताओं, संकेतक सुरक्षा उपकरण (ईमेल सत्यापनकर्ता, फ़िशिंग डिटेक्टर, URL स्कैनर, SSL प्रमाणपत्र चेकर, पासवर्ड उल्लंघन चेकर) और डेवलपर उपयोगिताओं का एक कैटलॉग प्रदान करता है। अधिकांश टूल पूरी तरह से आपके ब्राउज़र में निष्पादित होते हैं; कुछ को सर्वर प्रसंस्करण की आवश्यकता होती है। सेवा **\"जैसी है\" और \"जहाँ उपलब्ध है\"** प्रदान की जाती है, बिना किसी प्रकार की वारंटी के, चाहे वह व्यक्त या निहित हो, जिसमें व्यापारिकता, विशेष उद्देश्य के लिए उपयुक्तता, या उल्लंघन न होना शामिल है।"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. देयता की सीमा — ध्यान से पढ़ें",
        "blocks": [
          {
            "kind": "p",
            "text": "**जहाँ तक कानून द्वारा अनुमति दी गई है, प्रकाशक सेवा के आपके उपयोग या उपयोग में असमर्थता से उत्पन्न होने वाले किसी भी प्रकार के नुकसान के लिए देयता को अस्वीकार करता है।** विशेष रूप से, आप स्वीकार करते हैं और सहमत हैं कि प्रकाशक निम्नलिखित के लिए उत्तरदायी नहीं होगा:"
          },
          {
            "kind": "ul",
            "items": [
              "डेटा हानि, दूषित या गलत फ़ाइलें, या विफल रूपांतरण;",
              "आपके द्वारा किसी भी टूल के आउटपुट के आधार पर लिए गए निर्णय, वित्तीय, व्यावसायिक या अन्यथा;",
              "डाउनटाइम, विलंबता, या किसी सुविधा की अस्थायी अनुपलब्धता;",
              "तृतीय-पक्ष सेवा विफलताएँ (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, होस्टिंग प्रदाता);",
              "अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक नुकसान किसी भी प्रकार के;",
              "घटना के कारण दावे के लिए पूर्ववर्ती बारह (12) महीनों में आपके द्वारा वास्तव में भुगतान की गई फीस से अधिक कुल राशि, मुफ्त-स्तरीय उपयोगकर्ताओं के लिए एक सौ (100) यूरो तक सीमित।"
            ]
          },
          {
            "kind": "p",
            "text": "**सुरक्षा उपकरण**: URL स्कैनर, फ़िशिंग डिटेक्टर, ईमेल सत्यापनकर्ता, SSL प्रमाणपत्र चेकर और पासवर्ड उल्लंघन चेकर **केवल सूचनात्मक और संकेतक उद्देश्यों के लिए** प्रदान किए जाते हैं। वे तृतीय-पक्ष संकेतों (Google Safe Browsing, सार्वजनिक DNS, HaveIBeenPwned, लाइव TLS हैंडशेक) और बड़े-भाषा-मॉडल अनुमान एकत्र करते हैं। वे **सुरक्षा, वैधता या जोखिम की अनुपस्थिति की गारंटी नहीं देते हैं**। नई फ़िशिंग पृष्ठ प्रतिष्ठा डेटाबेस की तुलना में तेज़ी से प्रकट होते हैं; एक ईमेल जो हमारे जाँचों से गुजर जाता है, फिर भी निष्क्रिय या धोखाधड़ी वाला हो सकता है; एक वैध SSL प्रमाणपत्र वाली साइट की सामग्री को प्रमाणित नहीं करता है। प्रकाशक इन उपकरणों के आधार पर लिए गए किसी भी नुकसान के लिए स्पष्ट रूप से देयता अस्वीकार करता है। उपयोगकर्ता ऐसे निर्णयों के लिए पूरी तरह से उत्तरदायी है।"
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. स्वीकार्य उपयोग",
        "blocks": [
          {
            "kind": "p",
            "text": "आप सेवा का उपयोग करने के लिए सहमत हैं **निम्नलिखित कार्य नहीं करने के लिए**:"
          },
          {
            "kind": "ul",
            "items": [
              "अपने अधिकार क्षेत्र या फ्रांस में अवैध सामग्री अपलोड, प्रसंस्करण या वितरित करना;",
              "ऐसे फ़ाइलों को संसाधित करना जिनके लिए आपके पास आवश्यक अधिकार नहीं हैं (लेखक की अनुमति के बिना कॉपीराइटेड कार्य, व्यक्तिगत डेटा जिसे आप संसाधित करने के अधिकारी नहीं हैं, वर्गीकृत जानकारी);",
              "धोखाधड़ी, मनी लॉन्ड्रिंग, आतंकवाद के वित्तपोषण या किसी भी आपराधिक गतिविधि को अंजाम देना या सुविधा प्रदान करना;",
              "AI मानवीकरण, AI पाठ उपकरण या किसी अन्य सुविधा का उपयोग करके साहित्यिक चोरी करना, किसी तीसरे पक्ष को धोखा देना, मूल्यांकन प्रणालियों (शैक्षणिक, भर्ती, विज्ञापन नेटवर्क) में हेरफेर करना जो उनके नियमों का उल्लंघन करता है, या लागू कानून का उल्लंघन करने वाले तरीके से धोखा देना;",
              "सेवा के संचालन या उपलब्धता में हस्तक्षेप करने का प्रयास करना, रिवर्स-इंजीनियरिंग करना, स्क्रैप करना, दर सीमाओं का दुरुपयोग करना, या अन्यथा हस्तक्षेप करना;",
              "कोटा, भुगतान आवश्यकताओं या लागू प्रतिबंधों को बायपास करना;",
              "मुफ्त-स्तरीय कोटा को गुणा करने के लिए एकाधिक खाते बनाना, या अपने प्लान द्वारा अनुमत व्यक्तियों से अधिक व्यक्तियों के बीच एक खाता साझा करना।"
            ]
          },
          {
            "kind": "p",
            "text": "यदि हमें उचित आधार मिलते हैं कि आपने इस अनुभाग का उल्लंघन किया है, तो हम बिना किसी सूचना के तुरंत आपके खाते को निलंबित या समाप्त कर सकते हैं, और किसी भी प्रकार के धनवापसी के हकदार नहीं होंगे।"
          }
        ]
      },
      {
        "id": "content",
        "title": "5. आपकी सामग्री",
        "blocks": [
          {
            "kind": "p",
            "text": "आप सेवा में सबमिट की गई फ़ाइलों और पाठ में सभी अधिकार, शीर्षक और हित बरकरार रखते हैं। आप हमें केवल आपके द्वारा अनुरोधित टूल प्रदान करने के लिए उन्हें संसाधित करने के लिए एक सख्ती से सीमित, रॉयल्टी-मुक्त, वैश्विक लाइसेंस प्रदान करते हैं। यह लाइसेंस तुरंत समाप्त हो जाता है जब परिणाम आपको वापस कर दिया जाता है (सर्वर-सहायता प्राप्त टूल) या बिल्कुल भी अस्तित्व में नहीं आता है (ब्राउज़र-केवल टूल, क्योंकि आपकी फ़ाइल कभी भी हमारे पास नहीं पहुँचती)। हम आपके कंटेंट का स्वामित्व नहीं लेते हैं और न ही इसे AI मॉडल को प्रशिक्षित करने के लिए उपयोग करेंगे।"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. खाते",
        "blocks": [
          {
            "kind": "p",
            "text": "खाता बनाने के लिए आपकी आयु कम से कम सोलह (16) वर्ष होनी चाहिए। आप अपने क्रेडेंशियल्स को गोपनीय रखने और अपने खाते के अंतर्गत होने वाली किसी भी गतिविधि के लिए उत्तरदायी हैं। किसी भी संदिग्ध अनधिकृत पहुँच की सूचना तुरंत हमें [support@konvertools.com](mailto:support@konvertools.com) पर दें।"
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. सदस्यताएँ, बिलिंग और धनवापसी",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**योजनाएँ**: मुफ्त (€0), प्रो (€25/माह या €210/वर्ष), बिज़नेस (€79/माह या €664/वर्ष)। योजना सुविधाएँ और कोटा हमारे [मूल्य निर्धारण पृष्ठ](/pricing) पर खरीद के समय वर्णित हैं। हम 30 दिनों के नोटिस के साथ योजना सुविधाओं में संशोधन करने का अधिकार सुरक्षित रखते हैं।",
              "**स्वतः नवीनीकरण**: मासिक और वार्षिक सदस्यताएँ उसी क्रम में स्वतः नवीनीकृत होती हैं जब तक रद्द नहीं की जाती। आप अपने डैशबोर्ड से कभी भी रद्द कर सकते हैं; रद्द करने का प्रभाव वर्तमान बिलिंग अवधि के अंत में होता है। आप उस तिथि तक पहुँच बनाए रखते हैं।",
              "**वापसी का अधिकार (ईयू)**: फ्रेंच उपभोक्ता संहिता के अनुच्छेद L. 221-28 के तहत, जब आप प्रारंभिक 14-दिवसीय वापसी अवधि के दौरान सक्रिय रूप से सेवा का उपयोग करते हैं, तो आप स्पष्ट रूप से अनुबंध के तुरंत प्रदर्शन के लिए सहमत होते हैं और अपनी वापसी के अधिकार को त्याग देते हैं। यदि आपने किसी भी सशुल्क सुविधा का उपयोग नहीं किया है, तो आप 14 दिनों के भीतर [support@konvertools.com](mailto:support@konvertools.com) को ईमेल करके वापसी कर सकते हैं और हम 14 दिनों के भीतर पूर्ण धनवापसी जारी करेंगे।",
              "**आंशिक धनवापसी नहीं**: उपरोक्त वापसी परिदृश्य के अलावा, वर्तमान बिलिंग अवधि के लिए पहले से भुगतान की गई फीस गैर-वापसी योग्य हैं।",
              "**मूल्य परिवर्तन**: हम 30 दिनों के नोटिस के साथ मूल्यों में संशोधन कर सकते हैं। मौजूदा ग्राहक अपनी अगली नवीनीकरण तिथि तक अपनी वर्तमान कीमत बनाए रखते हैं।",
              "**भुगतान प्रसंस्करण**: भुगतान **Stripe** (Stripe Payments Europe, Ltd.) द्वारा सुरक्षित रूप से संसाधित किए जाते हैं, जो एक PCI-DSS स्तर 1 भुगतान प्रसंस्कर्ता है। हम आपके कार्ड विवरण कभी नहीं देखते या संग्रहीत नहीं करते। प्रकाशक रिकॉर्ड का विक्रेता है; चेकआउट पर दिखाया गया राशि वह राशि है जो ली जाती है, और कोई भी लागू VAT वहाँ इंगित किया गया है।"
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. बौद्धिक संपदा",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा का नाम, लोगो, कोड, डिज़ाइन, दस्तावेज़, डेटाबेस संरचना और एकत्रित सामग्री प्रकाशक की विशेष संपत्ति है और फ्रेंच और अंतर्राष्ट्रीय बौद्धिक-संपदा कानून द्वारा संरक्षित है। आपको सेवा का उपयोग करने के लिए आवश्यक सीमित लाइसेंस के अलावा कोई लाइसेंस प्रदान नहीं किया जाता है। आप सेवा या उसके किसी भी हिस्से की प्रतिलिपि, संशोधन, डीकोम्पाइल या व्युत्पन्न कार्य नहीं बना सकते, सिवाय इसके कि लागू कानून द्वारा स्पष्ट रूप से अनुमति दी गई हो।"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. क्षतिपूर्ति",
        "blocks": [
          {
            "kind": "p",
            "text": "आप इन शर्तों के अपने उल्लंघन से उत्पन्न होने वाले किसी भी दावे, हानि, क्षति, देयता, लागत या व्यय (उचित कानूनी शुल्क सहित) से प्रकाशक को क्षतिपूर्ति करने और उसे हानिरहित रखने के लिए सहमत हैं, चाहे (a) आपके द्वारा इन शर्तों का उल्लंघन, (b) कानून या तृतीय-पक्ष अधिकार का उल्लंघन, या (c) सेवा में सबमिट किया गया आपका कोई भी कंटेंट।"
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. शर्तों में परिवर्तन",
        "blocks": [
          {
            "kind": "p",
            "text": "हम इन शर्तों में समय-समय पर संशोधन कर सकते हैं। महत्वपूर्ण परिवर्तन ईमेल द्वारा खाता धारकों को प्रभावी होने से कम से कम तीस (30) दिन पहले सूचित किए जाएंगे। उस अवधि के बाद सेवा का उपयोग जारी रखकर आप संशोधित शर्तों को स्वीकार करते हैं। नवीनतम संस्करण हमेशा [https://konvertools.com/terms](https://konvertools.com/terms) पर उपलब्ध है।"
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. समाप्ति",
        "blocks": [
          {
            "kind": "p",
            "text": "आप अपने डैशबोर्ड से कभी भी अपना खाता समाप्त कर सकते हैं। यदि आप इन शर्तों का उल्लंघन करते हैं, सेवा का दुरुपयोग करते हैं, या आवर्ती सदस्यता का भुगतान करने में विफल रहते हैं, तो हम आपके खाते को तुरंत और बिना सूचना के समाप्त या निलंबित कर सकते हैं। समाप्ति पर आपका डेटा तीस (30) दिनों के भीतर हटा दिया जाता है, सिवाय बिलिंग रिकॉर्ड और सहमति रिकॉर्ड के जिन्हें हमारी गोपनीयता नीति के अनुसार रखा जाता है।"
          }
        ]
      },
      {
        "id": "law",
        "title": "12. शासी कानून और अधिकार क्षेत्र",
        "blocks": [
          {
            "kind": "p",
            "text": "ये शर्तें फ्रांस के कानूनों द्वारा शासित होती हैं। इन शर्तों या सेवा से उत्पन्न होने वाले किसी भी विवाद को पेरिस, फ्रांस के न्यायालयों के विशेष अधिकार क्षेत्र में प्रस्तुत किया जाएगा, सिवाय इसके कि यूरोपीय संघ या लागू राष्ट्रीय कानून के तहत उपभोक्ता के निवास देश में अनिवार्य कार्रवाई के अधिकार का पूर्वाग्रह हो। कानूनी कार्रवाई शुरू करने से पहले, आप [support@konvertools.com](mailto:support@konvertools.com) को लिखकर विवाद को सौहार्दपूर्ण ढंग से हल करने का प्रयास करने के लिए सहमत हैं। ईयू उपभोक्ता यूरोपीय आयोग के ऑनलाइन विवाद समाधान प्लेटफॉर्म [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) का भी उपयोग कर सकते हैं।"
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. विविध",
        "blocks": [
          {
            "kind": "p",
            "text": "यदि इन शर्तों का कोई प्रावधान अमान्य या अप्रवर्तनीय पाया जाता है, तो शेष प्रावधान पूर्ण प्रभाव में बने रहते हैं। हमारे द्वारा किसी अधिकार या प्रावधान को लागू न करना उस अधिकार का परित्याग नहीं है। ये शर्तें (गोपनीयता नीति और खरीद के समय संदर्भित किसी भी योजना-विशिष्ट शर्तों के साथ) सेवा के संबंध में आप और प्रकाशक के बीच पूर्ण समझौता बनाती हैं।"
          }
        ]
      }
    ]
  },
  "tr": {
    "h1": "Hizmet Koşulları",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Son güncelleme: %DATE% · Konvertools'u kullanarak bu koşulları kabul etmiş sayılırsınız.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Kabul",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Hizmet Koşulları (\"Koşullar\") sizinle (\"Kullanıcı\") ve Konvertools yayıncısı (\"Yayımcı\", \"biz\", \"bizim\") arasında Konvertools web sitesini ve tüm ilgili araçları, API'leri ve hizmetleri (topluca \"Hizmet\") kullanımınızla ilgili olarak yapılan bağlayıcı bir anlaşmadır. Bir hesap oluşturduğunuzda, kayıt sırasında kabul onay kutusunu işaretlediğinizde veya Hizmet'teki herhangi bir aracı kullandığınızda, bu Koşulları tamamen okuduğunuzu, anladığınızı ve kabul ettiğinizi, ayrıca Gizlilik Politikamızla birlikte doğruladığınızı teyit etmiş olursunuz."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Hizmet",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools, dosya dönüştürme yardımcı programları, belge ve görüntü işleme araçları, AI destekli metin araçları, gösterge niteliğinde güvenlik araçları (e-posta doğrulayıcı, phishing tespitçisi, URL tarayıcı, SSL sertifika denetleyicisi, parola ihlali denetleyicisi) ve geliştirici araçları olmak üzere bir katalog sunmaktadır. Araçların çoğu tamamen tarayıcınızda çalışır; bazıları sunucu işlemesi gerektirir. Hizmet, **\"olduğu gibi\"** ve **\"mevcut olduğu şekilde\"** herhangi bir açık veya zımni garanti olmaksızın sunulmaktadır; bu garantiler arasında satılabilirlik, belirli bir amaca uygunluk veya ihlal etmeme yer alır."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Sorumluluk sınırlaması — dikkatlice okuyun",
        "blocks": [
          {
            "kind": "p",
            "text": "**Yasal olarak izin verilen maksimum ölçüde, Yayımcı, Hizmet'in kullanımından veya kullanamamanızdan kaynaklanan her türlü zarar için sorumluluğu reddeder.** Özellikle, aşağıdakilerden kaynaklanan zararlar için Yayımcı'nın sorumlu olmayacağını kabul ve taahhüt edersiniz:"
          },
          {
            "kind": "ul",
            "items": [
              "veri kaybı, bozulmuş veya yanlış dosyalar veya başarısız dönüştürmeler;",
              "araç çıktısına dayanarak aldığınız kararlar, finansal, ticari veya diğer türler;",
              "herhangi bir özelliğin çalışmama süresi, gecikme veya geçici olarak kullanılamaması;",
              "üçüncü taraf hizmet arızaları (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, barındırma sağlayıcıları);",
              "dolaylı, rastlantısal, özel, sonuçsal veya cezai nitelikteki her türlü zarar;",
              "iddia doğuran olaydan önceki on iki (12) ay içinde bize ödediğiniz ücretlerin toplam tutarı, ücretsiz kullanıcı kategorisindekiler için yüz (100) avro ile sınırlı olmak üzere, aşan herhangi bir miktar."
            ]
          },
          {
            "kind": "p",
            "text": "**Güvenlik araçları**: URL Tarayıcı, Phishing Tespitçisi, E-posta Doğrulayıcı, SSL Sertifika Denetleyicisi ve Parola İhlali Denetleyicisi yalnızca **bilgi vermek ve gösterge niteliğinde** amaçlarla sunulmaktadır. Bu araçlar üçüncü taraf sinyallerini (Google Safe Browsing, genel DNS, HaveIBeenPwned, canlı TLS el sıkışmaları) ve büyük dil modeli sezgilerini bir araya getirir. **Güvenlik, geçerlilik veya risk bulunmaması konusunda herhangi bir garanti teşkil etmezler.** Yeni phishing sayfaları, itibar veritabanlarının kataloglayabileceğinden daha hızlı ortaya çıkar; kontrolümüzden geçen bir e-posta yine de etkin olmayabilir veya sahte olabilir; geçerli bir SSL sertifikası bir sitenin içeriğini doğrulamaz. Yayımcı, Hizmet'in güvenli olduğunu belirttiği bir phishing e-postasından, Hizmet'in tanımlayamadığı güvensiz bir bağlantıdan, Hizmet'in geçerli olarak işaretlediği bir adrese gönderilen bir işlem e-postasından veya bu araçlara dayanarak alınan herhangi bir güvenlik kararından kaynaklanan herhangi bir zarar için açıkça sorumluluk reddinde bulunur. Kullanıcı, bu tür kararların tek sorumluluğunu üstlenir."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Kabul edilebilir kullanım",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet'i aşağıdakiler için kullanmama konusunda kabul edersiniz:"
          },
          {
            "kind": "ul",
            "items": [
              "bulunduğunuz yargı alanında veya Fransa'da yasa dışı olan içeriği yüklemek, işlemek veya dağıtmak;",
              "gerekli haklara sahip olmadığınız dosyaları işlemek (yetkisiz telif hakkı eserleri, işleme hakkınız olmayan kişisel veriler, gizli bilgiler);",
              "dolandırıcılık, kara para aklama, terörizmin finansmanı veya herhangi bir suç faaliyeti gerçekleştirmek veya kolaylaştırmak;",
              "AI insanlaştırıcısını, AI metin araçlarını veya diğer herhangi bir özelliği intihal yapmak, üçüncü bir tarafı aldatmak, akademik, işe alım, reklam ağları gibi değerlendirme sistemlerini onların kurallarına aykırı şekilde manipüle etmek veya uygulanabilir hukuka aykırı şekilde yanıltmak için kullanmak;",
              "Hizmet'in çalışmasını veya kullanılabilirliğini engellemek, tersine mühendislik uygulamak, kazımak, hız sınırlarını kötüye kullanmak veya müdahale etmek amacıyla girişimde bulunmak;",
              "kotaları, ödeme gerekliliklerini veya mevcut diğer kısıtlamaları aşmaya çalışmak;",
              "ücretsiz kullanıcı kotasını çoğaltmak için birden fazla hesap oluşturmak veya hesabınızı planınızın izin verdiğinden daha fazla kişi arasında paylaşmak."
            ]
          },
          {
            "kind": "p",
            "text": "Bu bölümü ihlal ettiğinize dair makul gerekçelerimiz varsa, hesabınızı herhangi bir uyarı yapılmaksızın derhal askıya alabilir veya sonlandırabiliriz ve herhangi bir ücret iadesi hakkınız olmayacaktır."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. İçeriğiniz",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet'e gönderdiğiniz dosya ve metinlerin tüm haklarını, unvanını ve çıkarlarını elinizde tutarsınız. Size yalnızca talep ettiğiniz aracı sunmak amacıyla işlem yapmamız için, sınırlı, ücretsiz, dünya çapında bir lisans verirsiniz. Bu lisans, sonucun size iade edildiği anda sona erer (sunucu destekli araçlar) veya hiç oluşmaz (tarayıcıda yalnızca çalışan araçlar, çünkü dosyanız bize ulaşmaz). İçeriğinizin sahipliğini iddia etmiyoruz ve AI modellerini eğitmek için kullanmayacağız."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Hesaplar",
        "blocks": [
          {
            "kind": "p",
            "text": "Hesap oluşturmak için en az on altı (16) yaşında olmalısınız. Kimlik bilgilerinizin gizliliğinden ve hesabınız altında gerçekleşen herhangi bir faaliyetten siz sorumlusunuz. Yetkisiz erişim şüphesi durumunda derhal [support@konvertools.com](mailto:support@konvertools.com) adresinden bizi bilgilendirin."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Abonelikler, faturalandırma ve iadeler",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Planlar**: Ücretsiz (€0), Pro (€25/ay veya €210/yıl), Business (€79/ay veya €664/yıl). Plan özellikleri ve kotaları, satın alma sırasında [Fiyatlandırma sayfamızda](/pricing) açıklandığı şekildedir. Plan özelliklerinde 30 günlük bildirimle değişiklik yapma hakkımız saklıdır.",
              "**Otomatik yenileme**: Aylık ve yıllık abonelikler, iptal edilene kadar aynı sıklıkta otomatik olarak yenilenir. Hesabınızdan herhangi bir zamanda iptal edebilirsiniz; iptal, cari faturalandırma döneminin sonunda geçerli olur. O tarihe kadar erişiminizi korursunuz.",
              "**Geriye dönük cayma hakkı (AB)**: Fransız Tüketici Kanunu'nun L. 221-28 maddesi uyarınca, ilk 14 günlük cayma süresi içinde Hizmet'i aktif olarak kullanmanız durumunda sözleşmenin hemen yerine getirilmesine açıkça rıza gösterir ve cayma hakkından feragat edersiniz. Ücretli herhangi bir özelliği kullanmamışsanız, [support@konvertools.com](mailto:support@konvertools.com) adresine e-posta göndererek 14 gün içinde cayma hakkını kullanabilir ve 14 gün içinde tam iade yaparız.",
              "**Kısmi iadeler yoktur**: yukarıdaki cayma senaryosu dışında, cari faturalandırma dönemine ait ücretler iade edilemez.",
              "**Fiyat değişiklikleri**: 30 günlük bildirimle fiyatları değiştirebiliriz. Mevcut aboneler, bir sonraki yenileme tarihlerine kadar mevcut fiyatlarını korurlar.",
              "**Ödeme işleme**: ödemeler, PCI-DSS Seviye 1 ödeme işleyicisi olan **Stripe** (Stripe Payments Europe, Ltd.) tarafından güvenli bir şekilde işlenir. Kart bilgilerinizi hiç görmeyiz veya depolamayız. Yayımcı kayıtlı satıcıdır; ödeme sırasında gösterilen tutar faturalandırılan tutardır ve herhangi bir uygulanabilir KDV orada belirtilir."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Fikri mülkiyet",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet'in adı, logosu, kodu, tasarımı, belgeleri, veritabanı yapısı ve toplanmış içeriği Yayımcı'nın münhasır mülkiyetindedir ve Fransız ve uluslararası fikri mülkiyet hukuku tarafından korunmaktadır. Size yalnızca Hizmet'i amaçlandığı şekilde kullanmanız için gerekli olanın ötesinde lisans verilmemektedir. Hizmet'in veya herhangi bir bölümünün kopyasını çıkaramaz, değiştiremez, tersine mühendislik uygulayamaz veya türev çalışmalar oluşturamazsınız; ancak uygulanabilir hukuk tarafından açıkça izin verilen durumlar hariç."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Tazminat",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Koşulların ihlali (a), herhangi bir yasanın veya üçüncü taraf hakkının ihlali (b) veya Hizmet'e gönderdiğiniz herhangi bir içeriğinizden (c) kaynaklanan herhangi bir talep, kayıp, zarar, sorumluluk, maliyet veya giderden (makul avukatlık ücretleri dahil) Yayımcı'yı tazmin edeceğinizi ve zararsız kılacağınızı kabul edersiniz."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Koşullarda değişiklikler",
        "blocks": [
          {
            "kind": "p",
            "text": "Koşulları zaman zaman değiştirebiliriz. Önemli değişiklikler, etkili olmalarından en az otuz (30) gün önce hesap sahiplerine e-posta yoluyla bildirilecektir. Bu süre geçtikten sonra Hizmet'i kullanmaya devam etmeniz, değiştirilmiş Koşulları kabul etmiş sayılırsınız. En son sürüm her zaman [https://konvertools.com/terms](https://konvertools.com/terms) adresinde mevcuttur."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Sonlandırma",
        "blocks": [
          {
            "kind": "p",
            "text": "Hesabınızı herhangi bir zamanda hesabınızdan sonlandırabilirsiniz. Koşulları ihlal etmeniz, Hizmet'i kötüye kullanmanız veya tekrarlayan aboneliği ödememeniz durumunda hesabınızı derhal ve herhangi bir uyarı yapılmaksızın sonlandırabilir veya askıya alabiliriz. Sonlandırma durumunda faturalandırma kayıtları ve Gizlilik Politikamızda açıklanan rıza kayıtları hariç olmak üzere verileriniz otuz (30) gün içinde silinir."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Yetkili hukuk ve yargı yeri",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Koşullar Fransa hukukuna tabidir. Bu Koşullardan veya Hizmet'ten kaynaklanan herhangi bir anlaşmazlık, Avrupa Birliği veya ilgili ulusal hukuk uyarınca tüketicinin zorunlu dava hakkının geçerli olduğu durumlar hariç, Paris mahkemelerinin münhasır yargı yetkisine tabi olacaktır. Yasal işlem başlatmadan önce, anlaşmazlığı [support@konvertools.com](mailto:support@konvertools.com) adresine yazarak dostane şekilde çözmeyi kabul edersiniz. AB tüketicileri ayrıca Avrupa Komisyonu'nun Online Anlaşmazlık Çözümü platformunu [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) adresinde kullanabilirler."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Çeşitli hükümler",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Koşulların herhangi bir hükmü geçersiz veya uygulanamaz bulunursa, kalan hükümler tamamen yürürlükte kalır. Herhangi bir hakkın veya hükmün uygulanmaması, o hakkın feragat edildiği anlamına gelmez. Bu Koşullar (Gizlilik Politikası ve satın alma sırasında başvurulan plana özel koşullarla birlikte) sizinle Yayımcı arasındaki Hizmet'e ilişkin tüm anlaşmanın tamamını oluşturur."
          }
        ]
      }
    ]
  },
  "id": {
    "h1": "Ketentuan Layanan",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Terakhir diperbarui: %DATE% · Dengan menggunakan Konvertools, Anda menyetujui ketentuan ini.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Penerimaan",
        "blocks": [
          {
            "kind": "p",
            "text": "Ketentuan Layanan ini (\"Ketentuan\") membentuk perjanjian yang mengikat antara Anda (\"Pengguna\") dan penerbit Konvertools (\"Penerbit\", \"kami\", \"kami\") terkait penggunaan situs web Konvertools dan semua alat, API, serta layanan terkait (secara kolektif disebut \"Layanan\"). Dengan membuat akun, mencentang kotak penerimaan saat pendaftaran, atau sekadar menggunakan alat apa pun di Layanan, Anda menyatakan bahwa Anda telah membaca, memahami, dan menerima Ketentuan ini secara keseluruhan, bersama dengan Kebijakan Privasi kami."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Layanan",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools menyediakan katalog utilitas konversi berkas, alat pemrosesan dokumen dan gambar, utilitas teks berbantuan AI, alat keamanan indikatif (verifikator email, detektor phishing, pemindai URL, pemeriksa sertifikat SSL, pemeriksa kebocoran kata sandi), serta utilitas pengembang. Sebagian besar alat berjalan sepenuhnya di peramban Anda; beberapa memerlukan pemrosesan server. Layanan disediakan **\"apa adanya\" dan \"tersedia apa adanya\"** tanpa jaminan apa pun, baik secara tegas maupun tersirat, termasuk kelayakan niaga, kesesuaian untuk tujuan tertentu, atau tidak melanggar hak cipta."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Pembatasan tanggung jawab — baca dengan seksama",
        "blocks": [
          {
            "kind": "p",
            "text": "**Sejauh yang diizinkan oleh hukum, Penerbit menolak setiap tanggung jawab atas kerugian apa pun yang timbul dari penggunaan atau ketidakmampuan Anda untuk menggunakan Layanan.** Secara khusus, Anda menyatakan dan menyetujui bahwa Penerbit tidak bertanggung jawab atas:"
          },
          {
            "kind": "ul",
            "items": [
              "kehilangan data, berkas yang rusak atau tidak benar, atau konversi yang gagal;",
              "keputusan, keuangan, bisnis, atau lainnya, yang Anda ambil berdasarkan keluaran dari alat apa pun;",
              "waktu henti, latensi, atau ketidaktersediaan sementara fitur apa pun;",
              "kegagalan layanan pihak ketiga (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, penyedia hosting);",
              "kerugian tidak langsung, insidental, khusus, konsekuensial, ataupun hukuman apa pun;",
              "jumlah agregat yang melebihi biaya yang benar-benar Anda bayarkan kepada kami dalam dua belas (12) bulan sebelum kejadian yang menimbulkan klaim, dengan batas seratus (100) euro untuk pengguna tingkat gratis."
            ]
          },
          {
            "kind": "p",
            "text": "**Alat keamanan**: Pemindai URL, Detektor Phishing, Verifikator Email, Pemeriksa Sertifikat SSL, dan Pemeriksa Kebocoran Kata Sandi disediakan **hanya untuk tujuan informatif dan indikatif**. Alat-alat ini mengumpulkan sinyal pihak ketiga (Google Safe Browsing, DNS publik, HaveIBeenPwned, penanganan TLS langsung) serta heuristik model bahasa besar. Alat-alat ini **bukan merupakan jaminan keamanan, validitas, atau tidak adanya risiko**. Halaman phishing baru muncul lebih cepat daripada basis data reputasi yang dapat mengatalognya; email yang lolos pemeriksaan kami mungkin masih tidak aktif atau curang; sertifikat SSL yang valid tidak menjamin isi situs. Penerbit secara tegas menolak semua tanggung jawab atas kerugian apa pun yang diakibatkan oleh email phishing yang dinyatakan aman oleh Layanan, tautan tidak aman yang gagal diidentifikasi Layanan, email transaksional yang dikirim ke alamat yang dinyatakan valid oleh Layanan, atau keputusan keamanan apa pun yang diambil berdasarkan alat-alat ini. Pengguna bertanggung jawab penuh atas keputusan tersebut."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Penggunaan yang dapat diterima",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda setuju **tidak** menggunakan Layanan untuk:"
          },
          {
            "kind": "ul",
            "items": [
              "mengunggah, memproses, atau mendistribusikan konten yang ilegal di yurisdiksi Anda atau di Prancis;",
              "memproses berkas yang Anda tidak memiliki hak yang diperlukan (karya berhak cipta tanpa izin, data pribadi yang tidak Anda berhak proses, informasi rahasia);",
              "melakukan atau memfasilitasi penipuan, pencucian uang, pendanaan terorisme, atau aktivitas kriminal apa pun;",
              "menggunakan humanisasi AI, alat teks AI, atau fitur lain untuk melakukan plagiarisme, menipu pihak ketiga, memanipulasi sistem evaluasi (akademik, perekrutan, jaringan iklan) dengan cara yang melanggar aturan mereka, atau menyesatkan dengan cara yang melanggar hukum yang berlaku;",
              "mencoba membebani, melakukan rekayasa balik, scraping, menyalahgunakan batas laju, atau mengganggu operasi atau ketersediaan Layanan dengan cara lain;",
              "mengelakkan kuota, persyaratan pembayaran, atau pembatasan lain yang berlaku;",
              "membuat beberapa akun untuk menggandakan kuota tingkat gratis, atau berbagi akun dengan lebih banyak individu daripada yang diizinkan oleh paket Anda."
            ]
          },
          {
            "kind": "p",
            "text": "Kami dapat menangguhkan atau menghentikan akun Anda segera dan tanpa pemberitahuan jika kami memiliki alasan yang wajar untuk meyakini Anda telah melanggar bagian ini, tanpa hak atas pengembalian dana apa pun."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Konten Anda",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda tetap memiliki semua hak, kepemilikan, dan kepentingan atas berkas dan teks yang Anda unggah ke Layanan. Anda memberikan kami lisensi terbatas, bebas royalti, dan bersifat global untuk memprosesnya semata-mata guna menyediakan alat yang Anda minta. Lisensi ini berakhir seketika hasil dikembalikan kepada Anda (alat berbantuan server) atau tidak pernah tercipta sama sekali (alat berbasis peramban, karena berkas Anda tidak pernah sampai ke kami). Kami tidak, dan tidak akan, mengklaim kepemilikan atas konten Anda atau menggunakannya untuk melatih model AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Akun",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda harus berusia minimal enam belas (16) tahun untuk membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan kredensial Anda dan atas aktivitas apa pun yang terjadi di bawah akun Anda. Beritahu kami segera melalui [support@konvertools.com](mailto:support@konvertools.com) jika terjadi akses tidak sah yang dicurigai."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Langganan, penagihan, dan pengembalian dana",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Paket**: Gratis (€0), Pro (€25/bulan atau €210/tahun), Bisnis (€79/bulan atau €664/tahun). Fitur dan kuota paket dijelaskan di [halaman Harga kami](/pricing) pada saat pembelian. Kami berhak mengubah fitur paket dengan pemberitahuan 30 hari.",
              "**Pembaruan otomatis**: langganan bulanan dan tahunan diperbarui secara otomatis dengan frekuensi yang sama hingga dibatalkan. Anda dapat membatalkan kapan saja melalui dasbor Anda; pembatalan berlaku pada akhir periode penagihan saat ini. Anda tetap memiliki akses hingga tanggal tersebut.",
              "**Hak penarikan (UE)**: berdasarkan Pasal L. 221-28 dari Kode Konsumen Prancis, ketika Anda secara aktif menggunakan Layanan selama periode penarikan awal 14 hari, Anda secara tegas menyetujui pelaksanaan kontrak segera dan melepaskan hak penarikan Anda. Jika Anda tidak menggunakan fitur berbayar apa pun, Anda dapat menarik diri dalam 14 hari dengan mengirim email ke [support@konvertools.com](mailto:support@konvertools.com) dan kami akan mengembalikan dana secara penuh dalam 14 hari.",
              "**Tidak ada pengembalian dana sebagian**: di luar skenario penarikan di atas, biaya yang sudah dibayarkan untuk periode penagihan saat ini tidak dapat dikembalikan.",
              "**Perubahan harga**: kami dapat mengubah harga dengan pemberitahuan 30 hari. Pelanggan yang sudah ada mempertahankan harga saat ini hingga tanggal pembaruan berikutnya.",
              "**Pemrosesan pembayaran**: pembayaran ditangani dengan aman oleh **Stripe** (Stripe Payments Europe, Ltd.), pemroses pembayaran PCI-DSS Level 1. Kami tidak pernah melihat atau menyimpan detail kartu Anda. Penerbit adalah penjual yang tercatat; jumlah yang ditampilkan pada saat checkout adalah jumlah yang dibebankan, dan pajak pertambahan nilai yang berlaku ditunjukkan di sana."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Kekayaan intelektual",
        "blocks": [
          {
            "kind": "p",
            "text": "Nama, logo, kode, desain, dokumentasi, struktur basis data, dan konten agregat Layanan adalah milik eksklusif Penerbit dan dilindungi oleh hukum kekayaan intelektual Prancis dan internasional. Tidak ada lisensi yang diberikan kepada Anda selain yang secara ketat diperlukan untuk menggunakan Layanan sebagaimana dimaksud. Anda tidak boleh mereproduksi, memodifikasi, dekompilasi, atau membuat karya turunan dari Layanan atau bagian apa pun darinya, kecuali sebagaimana secara tegas diizinkan oleh hukum yang berlaku."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Indemnifikasi",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda setuju untuk membebaskan dan membela Penerbit dari setiap klaim, kerugian, kerusakan, tanggung jawab, biaya, atau pengeluaran (termasuk biaya hukum yang wajar) yang timbul dari (a) pelanggaran Ketentuan oleh Anda, (b) pelanggaran hukum atau hak pihak ketiga oleh Anda, atau (c) konten apa pun yang Anda unggah ke Layanan."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Perubahan Ketentuan",
        "blocks": [
          {
            "kind": "p",
            "text": "Kami dapat mengubah Ketentuan ini sewaktu-waktu. Perubahan substansial akan diberitahukan melalui email kepada pemegang akun setidaknya tiga puluh (30) hari sebelum berlaku. Dengan terus menggunakan Layanan setelah periode tersebut, Anda menerima Ketentuan yang telah diubah. Versi terbaru selalu tersedia di [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Pemutusan",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda dapat menghentikan akun Anda kapan saja melalui dasbor. Kami dapat menghentikan atau menangguhkan akun Anda segera dan tanpa pemberitahuan jika Anda melanggar Ketentuan, menyalahgunakan Layanan, atau gagal membayar langganan berulang. Setelah pemutusan, data Anda dihapus dalam tiga puluh (30) hari, kecuali catatan penagihan dan catatan persetujuan yang disimpan sebagaimana dijelaskan dalam Kebijakan Privasi kami."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Hukum yang berlaku dan yurisdiksi",
        "blocks": [
          {
            "kind": "p",
            "text": "Ketentuan ini diatur oleh hukum Prancis. Setiap sengketa yang timbul dari atau terkait dengan Ketentuan atau Layanan harus diajukan kepada yurisdiksi eksklusif pengadilan Paris, Prancis, kecuali hak tindakan wajib konsumen di negara tempat tinggal mereka berlaku berdasarkan hukum Uni Eropa atau nasional yang berlaku. Sebelum memulai tindakan hukum, Anda setuju untuk mencoba menyelesaikan sengketa secara damai dengan menulis ke [support@konvertools.com](mailto:support@konvertools.com). Konsumen UE juga dapat menggunakan platform Penyelesaian Sengketa Online Komisi Eropa di [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Ketentuan lain",
        "blocks": [
          {
            "kind": "p",
            "text": "Jika ketentuan apa pun dalam Ketentuan ini dinyatakan tidak valid atau tidak dapat ditegakkan, ketentuan yang tersisa tetap berlaku sepenuhnya. Kegagalan kami untuk menegakkan hak atau ketentuan apa pun bukan merupakan pelepasan atas hak tersebut. Ketentuan ini (bersama dengan Kebijakan Privasi dan ketentuan spesifik paket yang dirujuk pada saat pembelian) merupakan keseluruhan perjanjian antara Anda dan Penerbit terkait Layanan."
          }
        ]
      }
    ]
  },
  "vi": {
    "h1": "Điều khoản Dịch vụ",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Cập nhật lần cuối: %DATE% · Bằng cách sử dụng Konvertools, bạn đồng ý với các điều khoản này.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Chấp nhận",
        "blocks": [
          {
            "kind": "p",
            "text": "Các Điều khoản Dịch vụ (\"Điều khoản\") này tạo thành một thỏa thuận ràng buộc giữa bạn (\"Người dùng\") và nhà xuất bản của Konvertools (\"Nhà xuất bản\", \"chúng tôi\", \"chúng tôi\") liên quan đến việc sử dụng trang web Konvertools và tất cả các công cụ, API và dịch vụ liên quan (gọi chung là \"Dịch vụ\"). Bằng cách tạo tài khoản, đánh dấu vào ô chấp nhận khi đăng ký hoặc đơn giản bằng cách sử dụng bất kỳ công cụ nào trên Dịch vụ, bạn xác nhận rằng bạn đã đọc, hiểu và chấp nhận toàn bộ các Điều khoản này, cùng với Chính sách Bảo mật của chúng tôi."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Dịch vụ",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools cung cấp danh mục các tiện ích chuyển đổi tệp, công cụ xử lý tài liệu và hình ảnh, tiện ích văn bản hỗ trợ bởi AI, công cụ bảo mật chỉ mang tính chất tham khảo (trình xác minh email, trình phát hiện lừa đảo, trình quét URL, trình kiểm tra chứng chỉ SSL, trình kiểm tra vi phạm mật khẩu) và tiện ích dành cho nhà phát triển. Hầu hết các công cụ hoạt động hoàn toàn trong trình duyệt của bạn; một số yêu cầu xử lý trên máy chủ. Dịch vụ được cung cấp **\"nguyên trạng\" và \"sẵn có\"** mà không có bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý, bao gồm khả năng thương mại, phù hợp cho mục đích cụ thể hoặc không vi phạm."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Giới hạn trách nhiệm — đọc kỹ",
        "blocks": [
          {
            "kind": "p",
            "text": "**Trong phạm vi tối đa cho phép bởi pháp luật, Nhà xuất bản từ chối mọi trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng Dịch vụ của bạn.** Đặc biệt, bạn thừa nhận và đồng ý rằng Nhà xuất bản sẽ không chịu trách nhiệm về:"
          },
          {
            "kind": "ul",
            "items": [
              "mất dữ liệu, tệp bị hỏng hoặc không chính xác, hoặc chuyển đổi thất bại;",
              "các quyết định, tài chính, kinh doanh hoặc các quyết định khác mà bạn đưa ra dựa trên kết quả của bất kỳ công cụ nào;",
              "thời gian chết, độ trễ hoặc tình trạng không khả dụng tạm thời của bất kỳ tính năng nào;",
              "lỗi dịch vụ của bên thứ ba (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, nhà cung cấp dịch vụ lưu trữ);",
              "thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc thiệt hại trừng phạt bất kỳ loại nào;",
              "bất kỳ khoản tiền tổng hợp nào vượt quá khoản phí bạn đã thanh toán cho chúng tôi trong mười hai (12) tháng trước sự kiện dẫn đến khiếu nại, giới hạn tối đa một trăm (100) euro đối với người dùng tầng miễn phí."
            ]
          },
          {
            "kind": "p",
            "text": "**Công cụ bảo mật**: Trình quét URL, Trình phát hiện lừa đảo, Trình xác minh email, Trình kiểm tra chứng chỉ SSL và Trình kiểm tra vi phạm mật khẩu được cung cấp **chỉ với mục đích thông tin và tham khảo**. Chúng tổng hợp các tín hiệu từ bên thứ ba (Google Safe Browsing, DNS công cộng, HaveIBeenPwned, bắt tay TLS trực tiếp) và các thuật toán heuristic dựa trên mô hình ngôn ngữ lớn. Chúng **không tạo thành bất kỳ sự đảm bảo nào về an toàn, tính hợp lệ hoặc không có rủi ro**. Các trang lừa đảo mới xuất hiện nhanh hơn so với cơ sở dữ liệu danh tiếng có thể cập nhật; một email vượt qua kiểm tra của chúng tôi vẫn có thể không hoạt động hoặc gian lận; chứng chỉ SSL hợp lệ không chứng nhận nội dung của một trang web. Nhà xuất bản từ chối mọi trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ một email lừa đảo mà Dịch vụ coi là an toàn, một liên kết không an toàn mà Dịch vụ không phát hiện được, một email giao dịch được gửi đến địa chỉ mà Dịch vụ đánh dấu là hợp lệ, hoặc bất kỳ quyết định bảo mật nào dựa trên các công cụ này. Người dùng chịu trách nhiệm hoàn toàn cho những quyết định như vậy."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Sử dụng chấp nhận được",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn đồng ý **không** sử dụng Dịch vụ để:"
          },
          {
            "kind": "ul",
            "items": [
              "tải lên, xử lý hoặc phân phối nội dung bất hợp pháp trong phạm vi pháp luật của bạn hoặc tại Pháp;",
              "xử lý các tệp mà bạn không nắm giữ quyền cần thiết (tác phẩm có bản quyền không có sự cho phép, dữ liệu cá nhân mà bạn không có quyền xử lý, thông tin mật);",
              "tham gia hoặc tạo điều kiện cho gian lận, rửa tiền, tài trợ cho khủng bố hoặc bất kỳ hoạt động tội phạm nào;",
              "sử dụng công cụ nhân hóa AI, công cụ văn bản AI hoặc bất kỳ tính năng nào khác để đạo văn, lừa dối bên thứ ba, thao túng hệ thống đánh giá (học thuật, tuyển dụng, mạng quảng cáo) theo cách vi phạm quy tắc của chúng, hoặc lừa dối theo bất kỳ cách nào vi phạm luật áp dụng;",
              "cố gắng quá tải, đảo ngược kỹ thuật, thu thập dữ liệu, lạm dụng giới hạn tốc độ hoặc can thiệp vào hoạt động hoặc khả năng sẵn có của Dịch vụ theo bất kỳ cách nào;",
              "vượt quá hạn ngạch, yêu cầu thanh toán hoặc bất kỳ hạn chế nào khác đang áp dụng;",
              "tạo nhiều tài khoản để nhân đôi hạn ngạch tầng miễn phí hoặc chia sẻ tài khoản cho nhiều cá nhân hơn so với kế hoạch của bạn cho phép."
            ]
          },
          {
            "kind": "p",
            "text": "Chúng tôi có thể tạm ngưng hoặc chấm dứt tài khoản của bạn ngay lập tức và không cần thông báo nếu chúng tôi có lý do chính đáng để tin rằng bạn đã vi phạm điều khoản này, mà không có quyền yêu cầu hoàn tiền dưới bất kỳ hình thức nào."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Nội dung của bạn",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn giữ tất cả quyền, quyền sở hữu và lợi ích đối với các tệp và văn bản bạn gửi đến Dịch vụ. Bạn cấp cho chúng tôi một giấy phép giới hạn, không có bản quyền, trên toàn thế giới để xử lý chúng chỉ nhằm cung cấp công cụ bạn yêu cầu. Giấy phép này chấm dứt ngay khi kết quả được trả về cho bạn (công cụ hỗ trợ máy chủ) hoặc không bao giờ tồn tại (công cụ chỉ trình duyệt, vì tệp của bạn không bao giờ đến được với chúng tôi). Chúng tôi không, và sẽ không, tuyên bố sở hữu nội dung của bạn hoặc sử dụng nó để đào tạo mô hình AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Tài khoản",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn phải ít nhất mười sáu (16) tuổi để tạo tài khoản. Bạn chịu trách nhiệm giữ bí mật thông tin đăng nhập của mình và mọi hoạt động xảy ra dưới tài khoản của bạn. Thông báo ngay cho chúng tôi tại [support@konvertools.com](mailto:support@konvertools.com) về bất kỳ truy cập trái phép nào được nghi ngờ."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Đăng ký, thanh toán và hoàn tiền",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Gói dịch vụ**: Miễn phí (€0), Pro (€25/tháng hoặc €210/năm), Business (€79/tháng hoặc €664/năm). Các tính năng và hạn ngạch của gói được mô tả trên trang [Bảng giá của chúng tôi](/pricing) tại thời điểm mua. Chúng tôi có quyền sửa đổi tính năng gói với thông báo trước 30 ngày.",
              "**Tự động gia hạn**: đăng ký hàng tháng và hàng năm tự động gia hạn theo cùng chu kỳ cho đến khi hủy. Bạn có thể hủy bất kỳ lúc nào từ bảng điều khiển của mình; việc hủy có hiệu lực vào cuối kỳ thanh toán hiện tại. Bạn vẫn có quyền truy cập cho đến ngày đó.",
              "**Quyền rút lui (EU)**: theo Điều L. 221-28 của Bộ luật Tiêu dùng Pháp, khi bạn chủ động sử dụng Dịch vụ trong giai đoạn rút lui ban đầu 14 ngày, bạn đồng ý thực hiện hợp đồng ngay lập tức và từ bỏ quyền rút lui của mình. Nếu bạn chưa sử dụng bất kỳ tính năng trả phí nào, bạn có thể rút lui trong vòng 14 ngày bằng cách gửi email đến [support@konvertools.com](mailto:support@konvertools.com) và chúng tôi sẽ hoàn tiền đầy đủ trong vòng 14 ngày.",
              "**Không hoàn tiền một phần**: ngoài trường hợp rút lui nêu trên, phí đã thanh toán cho kỳ thanh toán hiện tại không được hoàn lại.",
              "**Thay đổi giá**: chúng tôi có thể sửa đổi giá với thông báo trước 30 ngày. Người đăng ký hiện tại giữ nguyên mức giá hiện tại cho đến ngày gia hạn tiếp theo.",
              "**Xử lý thanh toán**: thanh toán được xử lý an toàn bởi **Stripe** (Stripe Payments Europe, Ltd.), một bộ xử lý thanh toán tuân thủ PCI-DSS Cấp 1. Chúng tôi không bao giờ nhìn thấy hoặc lưu trữ chi tiết thẻ của bạn. Nhà xuất bản là người bán ghi nhận; số tiền hiển thị tại thanh toán là số tiền được tính, và bất kỳ khoản VAT áp dụng nào cũng được chỉ định tại đó."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Sở hữu trí tuệ",
        "blocks": [
          {
            "kind": "p",
            "text": "Tên, biểu tượng, mã, thiết kế, tài liệu, cấu trúc cơ sở dữ liệu và nội dung tổng hợp của Dịch vụ là tài sản độc quyền của Nhà xuất bản và được bảo vệ bởi luật sở hữu trí tuệ Pháp và quốc tế. Bạn không được cấp bất kỳ giấy phép nào ngoài những gì cần thiết để sử dụng Dịch vụ theo mục đích dự định. Bạn không được sao chép, sửa đổi, dịch ngược hoặc tạo tác phẩm phái sinh từ Dịch vụ hoặc bất kỳ phần nào của nó, trừ khi được phép rõ ràng bởi luật áp dụng."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Bồi thường thiệt hại",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn đồng ý bồi thường và giữ Nhà xuất bản vô hại khỏi bất kỳ khiếu nại, tổn thất, thiệt hại, trách nhiệm, chi phí hoặc khoản chi (bao gồm phí pháp lý hợp lý) phát sinh từ (a) việc bạn vi phạm các Điều khoản này, (b) việc bạn vi phạm bất kỳ luật hoặc quyền của bên thứ ba nào, hoặc (c) bất kỳ nội dung nào bạn gửi đến Dịch vụ."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Thay đổi Điều khoản",
        "blocks": [
          {
            "kind": "p",
            "text": "Chúng tôi có thể sửa đổi các Điều khoản này theo thời gian. Những thay đổi quan trọng sẽ được thông báo qua email cho người dùng có tài khoản ít nhất ba mươi (30) ngày trước khi chúng có hiệu lực. Bằng cách tiếp tục sử dụng Dịch vụ sau thời gian đó, bạn chấp nhận các Điều khoản đã sửa đổi. Phiên bản mới nhất luôn có sẵn tại [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Chấm dứt",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn có thể chấm dứt tài khoản của mình bất kỳ lúc nào từ bảng điều khiển. Chúng tôi có thể chấm dứt hoặc tạm ngưng tài khoản của bạn ngay lập tức và không cần thông báo nếu bạn vi phạm các Điều khoản này, lạm dụng Dịch vụ hoặc không thanh toán đăng ký định kỳ. Sau khi chấm dứt, dữ liệu của bạn sẽ bị xóa trong vòng ba mươi (30) ngày, ngoại trừ hồ sơ thanh toán và hồ sơ đồng thuận được lưu giữ theo mô tả trong Chính sách Bảo mật của chúng tôi."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Luật điều chỉnh và thẩm quyền xét xử",
        "blocks": [
          {
            "kind": "p",
            "text": "Các Điều khoản này chịu sự điều chỉnh bởi luật pháp Pháp. Bất kỳ tranh chấp phát sinh từ hoặc liên quan đến các Điều khoản này hoặc Dịch vụ sẽ được đưa ra trước thẩm quyền độc quyền của tòa án Paris, Pháp, trừ trường hợp quyền hành động bắt buộc của người tiêu dùng tại quốc gia cư trú của họ theo luật Liên minh Châu Âu hoặc luật quốc gia áp dụng. Trước khi khởi kiện, bạn đồng ý cố gắng giải quyết tranh chấp một cách thân thiện bằng cách viết thư đến [support@konvertools.com](mailto:support@konvertools.com). Người tiêu dùng EU cũng có thể sử dụng nền tảng Giải quyết Tranh chấp Trực tuyến của Ủy ban Châu Âu tại [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Các điều khoản khác",
        "blocks": [
          {
            "kind": "p",
            "text": "Nếu bất kỳ điều khoản nào trong các Điều khoản này bị coi là vô hiệu hoặc không thể thi hành, các điều khoản còn lại vẫn có hiệu lực đầy đủ. Việc chúng tôi không thực thi bất kỳ quyền hoặc điều khoản nào không phải là từ bỏ quyền đó. Các Điều khoản này (cùng với Chính sách Bảo mật và bất kỳ điều khoản cụ thể theo gói nào được đề cập khi mua) cấu thành toàn bộ thỏa thuận giữa bạn và Nhà xuất bản liên quan đến Dịch vụ."
          }
        ]
      }
    ]
  },
  "sv": {
    "h1": "Användarvillkor",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Senast uppdaterad: %DATE% · Genom att använda Konvertools godkänner du dessa villkor.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Acceptation",
        "blocks": [
          {
            "kind": "p",
            "text": "Dessa Användarvillkor (nedan kallade \"Villkoren\") utgör ett bindande avtal mellan dig (nedan kallad \"Användaren\") och utgivaren av Konvertools (nedan kallad \"Utgivaren\", \"vi\", \"oss\") avseende ditt användande av Konvertools webbplats och alla relaterade verktyg, API:er och tjänster (gemensamt kallade \"Tjänsten\"). Genom att skapa ett konto, bocka i acceptansrutan vid registrering eller helt enkelt genom att använda något verktyg på Tjänsten bekräftar du att du har läst, förstått och accepterat dessa Villkor i sin helhet, tillsammans med vår Integritetspolicy."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Tjänsten",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools tillhandahåller en katalog med filkonverteringsverktyg, dokument- och bildbehandlingsverktyg, AI-assisterade textverktyg, indikativa säkerhetsverktyg (e-postverifierare, phishingdetektor, URL-skanner, SSL-certifikatkontroll, lösenordsläckagekontroll) samt utvecklarverktyg. De flesta verktyg körs helt i din webbläsare; vissa kräver serverbearbetning. Tjänsten tillhandahålls **\"som den är\" och \"tillgänglig\"** utan någon form av garanti, vare sig uttrycklig eller underförstådd, inklusive garanti för säljbarhet, lämplighet för ett visst ändamål eller frånvaro av intrång."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Begränsning av ansvar — läs noga",
        "blocks": [
          {
            "kind": "p",
            "text": "**I den utsträckning lagen tillåter begränsar Utgivaren allt ansvar för skador av något slag som uppstår till följd av ditt användande av, eller oförmåga att använda, Tjänsten.** Du bekräftar och godkänner särskilt att Utgivaren inte ska vara ansvarig för:"
          },
          {
            "kind": "ul",
            "items": [
              "förlust av data, korrupta eller felaktiga filer eller misslyckade konverteringar;",
              "beslut, ekonomiska, affärsmässiga eller andra, som du fattar baserat på resultatet från något verktyg;",
              "nedtid, fördröjning eller tillfällig otillgänglighet för någon funktion;",
              "fel hos tredje parts tjänster (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, värdtjänstleverantörer);",
              "indirekta, tillfälliga, särskilda, följd- eller straffskador av något slag;",
              "något sammanlagt belopp som överstiger de avgifter du faktiskt har betalat till oss under de tolv (12) månader som föregår händelsen som ger upphov till kravet, med ett tak på ett hundra (100) euro för användare på gratisnivå."
            ]
          },
          {
            "kind": "p",
            "text": "**Säkerhetsverktyg**: URL-skannern, phishingdetektorn, e-postverifieraren, SSL-certifikatkontrollen och lösenordsläckagekontrollen tillhandahålls **enbart i informations- och indikativt syfte**. De aggregerar signaler från tredje part (Google Safe Browsing, offentlig DNS, HaveIBeenPwned, live TLS-handskakningar) och heuristiker från stora språkmodeller. De **konstituerar inte en garanti för säkerhet, giltighet eller frånvaro av risk**. Nya phishing-sidor uppkommer snabbare än vad ryktesdatabaser kan katalogisera; en e-post som passerar våra kontroller kan ändå vara inaktiv eller bedräglig; ett giltigt SSL-certifikat garanterar inte en webbplats innehåll. Utgivaren avsäger sig uttryckligen allt ansvar för eventuell skada som uppstår till följd av en phishing-e-post som Tjänsten bedömde som säker, en osäker länk som Tjänsten missade, en transaktionell e-post som skickades till en adress som Tjänsten markerade som giltig, eller något säkerhetsbeslut som fattats utifrån dessa verktyg. Användaren bär ensamt ansvaret för sådana beslut."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Acceptabel användning",
        "blocks": [
          {
            "kind": "p",
            "text": "Du godkänner att **inte** använda Tjänsten för att:"
          },
          {
            "kind": "ul",
            "items": [
              "ladda upp, bearbeta eller distribuera innehåll som är olagligt i din jurisdiktion eller i Frankrike;",
              "bearbeta filer för vilka du inte innehar nödvändiga rättigheter (upphovsrättsskyddade verk utan tillstånd, personuppgifter som du inte har rätt att bearbeta, hemlig information);",
              "utföra eller underlätta bedrägeri, penningtvätt, finansiering av terrorism eller någon annan brottslig verksamhet;",
              "använda AI-humaniseringen, AI-textverktygen eller något annat verktyg för att plagiera, bedra en tredje part, manipulera utvärderingssystem (akademiska, rekryterings-, annonsnätverk) på ett sätt som strider mot deras regler, eller på annat sätt vilseleda i strid med tillämplig lag;",
              "försöka överbelasta, reverse-engineera, skrapa, missbruka hastighetsbegränsningar eller på annat sätt störa driften eller tillgängligheten för Tjänsten;",
              "undvika kvoter, betalningskrav eller andra begränsningar som är på plats;",
              "skapa flera konton för att utöka gratisnivåns kvoter eller dela ett konto med fler personer än vad ditt abonnemang tillåter."
            ]
          },
          {
            "kind": "p",
            "text": "Vi kan omedelbart och utan föregående meddelande suspendera eller avsluta ditt konto om vi har rimlig grund att tro att du har brutit mot denna paragraf, utan rätt till återbetalning av något slag."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ditt innehåll",
        "blocks": [
          {
            "kind": "p",
            "text": "Du behåller alla rättigheter, titel och intresse i de filer och texter som du skickar till Tjänsten. Du ger oss en strikt begränsad, avgiftsfri, världsomspännande licens att bearbeta dem enbart för att leverera det verktyg du har begärt. Denna licens upphör omedelbart när resultatet returneras till dig (serverassisterade verktyg) eller aldrig träder i kraft alls (enbart webbläsarverktyg, eftersom din fil aldrig når oss). Vi gör, och kommer inte att göra, anspråk på äganderätten till ditt innehåll eller använda det för att träna AI-modeller."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konton",
        "blocks": [
          {
            "kind": "p",
            "text": "Du måste vara minst sexton (16) år för att skapa ett konto. Du ansvarar för att hålla dina inloggningsuppgifter konfidentiella och för all aktivitet som sker under ditt konto. Meddela oss omedelbart på [support@konvertools.com](mailto:support@konvertools.com) vid misstänkt obehörig åtkomst."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Abonnemang, fakturering och återbetalningar",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Abonnemang**: Gratis (€0), Pro (€25/månad eller €210/år), Business (€79/månad eller €664/år). Funktioner och kvoter för abonnemang beskrivs på vår [Prissida](/pricing) vid köptillfället. Vi förbehåller oss rätten att ändra abonnemangets funktioner med 30 dagars varsel.",
              "**Automatisk förnyelse**: Månads- och årsabonnemang förnyas automatiskt med samma intervall tills de sägs upp. Du kan säga upp när som helst via ditt kontrollpanel; uppsägningen träder i kraft vid slutet av den aktuella faktureringsperioden. Du behåller åtkomst tills dess.",
              "**Ångerrätt (EU)**: enligt Artikel L. 221-28 i den franska konsumentlagen, när du aktivt använder Tjänsten under den initiala 14-dagars ångerfristen godkänner du uttryckligen den omedelbara fullgörandet av avtalet och avstår från din ångerrätt. Om du inte har använt någon betald funktion kan du ångra dig inom 14 dagar genom att skicka ett e-postmeddelande till [support@konvertools.com](mailto:support@konvertools.com) och vi kommer att utfärda en full återbetalning inom 14 dagar.",
              "**Inga delvisa återbetalningar**: utöver ovanstående ångerscenario är avgifter som redan har betalats för den aktuella faktureringsperioden icke-återbetalningsbara.",
              "**Prisförändringar**: vi kan ändra priser med 30 dagars varsel. Befintliga abonnenter behåller sitt nuvarande pris tills nästa förnyelse.",
              "**Betalningshantering**: betalningar hanteras säkert av **Stripe** (Stripe Payments Europe, Ltd.), en PCI-DSS nivå 1-betalningsprocessor. Vi ser eller lagrar aldrig dina kortuppgifter. Utgivaren är säljaren; beloppet som visas vid utcheckning är det belopp som debiteras, och eventuell tillämplig moms anges där."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Immateriella rättigheter",
        "blocks": [
          {
            "kind": "p",
            "text": "Namn, logotyp, kod, design, dokumentation, databasstruktur och aggregerat innehåll för Tjänsten är Utgivarens exklusiva egendom och skyddas av fransk och internationell immaterialrättslagstiftning. Ingen licens ges till dig utöver vad som strikt krävs för att använda Tjänsten som avsett. Du får inte reproducera, modifiera, dekompilera eller skapa härledda verk av Tjänsten eller någon del av den, utom i den utsträckning som uttryckligen tillåts enligt tillämplig lag."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Indemnifiering",
        "blocks": [
          {
            "kind": "p",
            "text": "Du godkänner att hålla Utgivaren oskadlig från alla anspråk, förluster, skador, ansvar, kostnader eller utgifter (inklusive skäliga advokatkostnader) som uppstår till följd av (a) ditt brott mot dessa Villkor, (b) ditt brott mot någon lag eller tredje parts rättigheter, eller (c) något innehåll som du har skickat till Tjänsten."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Ändringar av Villkoren",
        "blocks": [
          {
            "kind": "p",
            "text": "Vi kan ändra dessa Villkor när som helst. Väsentliga ändringar kommer att meddelas via e-post till kontoinnehavare minst trettio (30) dagar innan de träder i kraft. Genom att fortsätta använda Tjänsten efter denna period accepterar du de ändrade Villkoren. Den senaste versionen finns alltid tillgänglig på [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Uppsägning",
        "blocks": [
          {
            "kind": "p",
            "text": "Du kan säga upp ditt konto när som helst via ditt kontrollpanel. Vi kan säga upp eller suspendera ditt konto omedelbart och utan föregående meddelande om du bryter mot dessa Villkor, missbrukar Tjänsten eller inte betalar ett återkommande abonnemang. Vid uppsägning raderas dina data inom trettio (30) dagar, med undantag för fakturerings- och samtyckesregister som behålls enligt vår Integritetspolicy."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Tillämplig lag och jurisdiktion",
        "blocks": [
          {
            "kind": "p",
            "text": "Dessa Villkor styrs av fransk lag. Eventuella tvister som uppstår i samband med dessa Villkor eller Tjänsten ska hänskjutas till den exklusiva jurisdiktionen för domstolarna i Paris, Frankrike, såvida inte en konsuments obligatoriska rätt till åtgärd i sin hemvistland enligt EU-lagstiftning eller nationell lag gäller. Innan du inleder rättsliga åtgärder godkänner du att försöka lösa tvisten på ett vänligt sätt genom att skriva till [support@konvertools.com](mailto:support@konvertools.com). EU-konsumenter kan också använda Europeiska kommissionens plattform för online-tvister på [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Övrigt",
        "blocks": [
          {
            "kind": "p",
            "text": "Om någon bestämmelse i dessa Villkor befinns ogiltig eller oenforcerbar, förblir de återstående bestämmelserna fullt giltiga. Vårt underlåtande att genomdriva någon rätt eller bestämmelse utgör inte ett avstående från den rätten. Dessa Villkor (tillsammans med Integritetspolicyn och eventuella abonnemangsspecifika villkor som refereras vid köp) utgör hela avtalet mellan dig och Utgivaren avseende Tjänsten."
          }
        ]
      }
    ]
  },
  "pl": {
    "h1": "Regulamin Usługi",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ostatnia aktualizacja: %DATE% · Korzystając z Konvertools, wyrażasz zgodę na niniejsze warunki.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Akceptacja",
        "blocks": [
          {
            "kind": "p",
            "text": "Niniejszy Regulamin Usługi (zwany dalej „Regulaminem”) stanowi wiążącą umowę pomiędzy Tobą (zwany dalej „Użytkownikiem”) a wydawcą Konvertools (zwany dalej „Wydawcą”, „my”, „nas”) dotyczącą korzystania z witryny Konvertools oraz wszystkich powiązanych narzędzi, interfejsów API i usług (zwanych łącznie „Usługą”). Tworząc konto, zaznaczając pole akceptacji podczas rejestracji lub po prostu korzystając z dowolnego narzędzia w Usłudze, potwierdzasz, że zapoznałeś się z niniejszym Regulaminem w całości, zrozumiałeś go i akceptujesz w pełni, wraz z naszą Polityką Prywatności."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Charakterystyka Usługi",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools oferuje katalog narzędzi do konwersji plików, przetwarzania dokumentów i obrazów, narzędzi tekstowych wspomaganych sztuczną inteligencją, wskaźnikowych narzędzi bezpieczeństwa (weryfikator e-maili, wykrywacz phishingu, skaner adresów URL, sprawdzacz certyfikatów SSL, sprawdzacz naruszeń haseł) oraz narzędzi dla programistów. Większość narzędzi działa wyłącznie w przeglądarce użytkownika; niektóre wymagają przetwarzania po stronie serwera. Usługa jest świadczona **„tak, jak jest” i „tak, jak dostępna”** bez jakiejkolwiek gwarancji, wyraźnej lub dorozumianej, w tym dotyczącej przydatności handlowej, przydatności do określonego celu lub braku naruszenia praw."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Ograniczenie odpowiedzialności — przeczytaj uważnie",
        "blocks": [
          {
            "kind": "p",
            "text": "**W maksymalnym zakresie dozwolonym przez prawo, Wydawca wyłącza wszelką odpowiedzialność za szkody powstałe w wyniku korzystania z Usługi lub niemożności jej korzystania.** W szczególności uznajesz i zgadzasz się, że Wydawca nie ponosi odpowiedzialności za:"
          },
          {
            "kind": "ul",
            "items": [
              "utratę danych, uszkodzone lub nieprawidłowe pliki bądź nieudane konwersje;",
              "podejmowane decyzje, finansowe, biznesowe lub inne, które podejmujesz w oparciu o wyniki dowolnego narzędzia;",
              "przestoje, opóźnienia lub tymczasową niedostępność jakiejkolwiek funkcji;",
              "awarie usług stron trzecich (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, dostawcy hostingu);",
              "szkody pośrednie, incydentalne, specjalne, następcze lub karne jakiegokolwiek rodzaju;",
              "jakąkolwiek łączną kwotę przewyższającą opłaty, które rzeczywiście zapłaciłeś nam w ciągu dwunastu (12) miesięcy poprzedzających zdarzenie stanowiące podstawę roszczenia, ograniczoną do stu (100) euro w przypadku użytkowników korzystających z darmowego poziomu."
            ]
          },
          {
            "kind": "p",
            "text": "**Narzędzia bezpieczeństwa**: skaner adresów URL, wykrywacz phishingu, weryfikator e-maili, sprawdzacz certyfikatów SSL oraz sprawdzacz naruszeń haseł są świadczone **wyłącznie w celach informacyjnych i orientacyjnych**. Agregują one sygnały pochodzące od stron trzecich (Google Safe Browsing, publiczny DNS, HaveIBeenPwned, aktywne negocjacje TLS) oraz heurystyki oparte na dużych modelach językowych. **Nie stanowią one gwarancji bezpieczeństwa, ważności lub braku ryzyka**. Nowe strony phishingowe pojawiają się szybciej, niż bazy reputacji są w stanie je skatalogować; e-mail, który przeszedł nasze kontrole, może nadal być nieaktywny lub oszukańczy; ważny certyfikat SSL nie potwierdza treści strony. Wydawca wyraźnie zrzeka się wszelkiej odpowiedzialności za jakiekolwiek szkody wynikające z e-maila phishingowego, który Usługa uznała za bezpieczny, niebezpiecznego linku, którego Usługa nie zidentyfikowała, transakcyjnego e-maila wysłanego na adres uznany przez Usługę za ważny, lub jakiejkolwiek decyzji dotyczącej bezpieczeństwa podjętej w oparciu o te narzędzia. Użytkownik ponosi wyłączną odpowiedzialność za takie decyzje."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Akceptowalne korzystanie",
        "blocks": [
          {
            "kind": "p",
            "text": "Zgadzasz się **nie** używać Usługi do:"
          },
          {
            "kind": "ul",
            "items": [
              "przesyłania, przetwarzania lub rozpowszechniania treści nielegalnych w Twojej jurysdykcji lub we Francji;",
              "przetwarzania plików, do których nie posiadasz odpowiednich praw (utwory chronione prawem autorskim bez upoważnienia, dane osobowe, do których nie masz prawa przetwarzania, informacje niejawne);",
              "popełniania lub ułatwiania oszustw, prania brudnych pieniędzy, finansowania terroryzmu lub jakiejkolwiek działalności przestępczej;",
              "korzystania z narzędzi do humanizacji tekstu AI, narzędzi tekstowych AI lub jakiejkolwiek innej funkcji w celu plagiatu, oszukiwania osób trzecich, manipulowania systemami oceny (akademickimi, rekrutacyjnymi, sieci reklamowych) w sposób naruszający ich zasady lub wprowadzania w błąd w jakikolwiek sposób, który narusza obowiązujące prawo;",
              "próbowania przeciążenia, inżynierii wstecznej, scrapingowania, nadużywania limitów szybkości lub w inny sposób zakłócania działania lub dostępności Usługi;",
              "omijania limitów, wymogów płatności lub jakichkolwiek innych ograniczeń wprowadzonych w Usłudze;",
              "tworzenia wielu kont w celu zwiększenia limitów darmowego poziomu lub udostępniania konta większej liczbie osób, niż pozwala na to Twój plan."
            ]
          },
          {
            "kind": "p",
            "text": "Możemy natychmiastowo zawiesić lub zakończyć Twoje konto bez uprzedzenia, jeśli mamy uzasadnione podstawy, aby sądzić, że naruszyłeś niniejszy punkt, bez prawa do jakiegokolwiek zwrotu opłat."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Twoje treści",
        "blocks": [
          {
            "kind": "p",
            "text": "Zachowujesz wszelkie prawa, tytuł i interesy w plikach i tekstach, które przesyłasz do Usługi. Udzielasz nam ściśle ograniczonej, nieodpłatnej, światowej licencji na ich przetwarzanie wyłącznie w celu dostarczenia narzędzia, którego zażądałeś. Licencja ta wygasa w momencie zwrócenia wyniku (narzędzia wymagające przetwarzania serwerowego) lub nie powstaje wcale (narzędzia działające wyłącznie w przeglądarce, gdyż Twój plik nigdy do nas nie trafia). Nie rościmy sobie i nie będziemy rościć prawa własności do Twoich treści ani używać ich do trenowania modeli AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konta",
        "blocks": [
          {
            "kind": "p",
            "text": "Musisz mieć ukończone co najmniej szesnaście (16) lat, aby utworzyć konto. Jesteś odpowiedzialny za zachowanie poufności swoich danych logowania oraz za wszelką działalność odbywającą się na Twoim koncie. Niezwłocznie powiadom nas o podejrzewanym nieuprawnionym dostępie, wysyłając wiadomość na adres [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Subskrypcje, płatności i zwroty",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Plany**: Darmowy (0 €), Pro (25 €/miesiąc lub 210 €/rok), Biznes (79 €/miesiąc lub 664 €/rok). Funkcje i limity planów są opisane na naszej stronie [Cennik](/pricing) w momencie zakupu. Zastrzegamy sobie prawo do zmiany funkcji planów z 30-dniowym wyprzedzeniem.",
              "**Autoodnawianie**: subskrypcje miesięczne i roczne odnawiają się automatycznie w tym samym cyklu, chyba że zostaną anulowane. Możesz anulować je w dowolnym momencie z poziomu swojego panelu; anulowanie wchodzi w życie z końcem bieżącego okresu rozliczeniowego. Zachowujesz dostęp do Usługi do tego czasu.",
              "**Prawo odstąpienia (UE)**: zgodnie z Art. L. 221-28 francuskiego Kodeksu konsumenckiego, jeśli aktywnie korzystasz z Usługi w trakcie początkowego 14-dniowego okresu odstąpienia, wyrażasz zgodę na natychmiastowe wykonanie umowy i rezygnujesz z prawa do odstąpienia. Jeśli nie korzystałeś z żadnej płatnej funkcji, możesz odstąpić w ciągu 14 dni, wysyłając wiadomość na adres [support@konvertools.com](mailto:support@konvertools.com), a my dokonamy pełnego zwrotu w ciągu 14 dni.",
              "**Brak częściowych zwrotów**: poza powyższym scenariuszem odstąpienia, opłaty już zapłacone za bieżący okres rozliczeniowy nie podlegają zwrotowi.",
              "**Zmiany cen**: możemy zmieniać ceny z 30-dniowym wyprzedzeniem. Istniejący subskrybenci zachowują swoją obecną cenę do następnego terminu odnowienia.",
              "**Obrót płatnościami**: płatności są przetwarzane w sposób bezpieczny przez **Stripe** (Stripe Payments Europe, Ltd.), płatnika PCI-DSS Level 1. Nigdy nie widzimy ani nie przechowujemy danych Twojej karty. Wydawca jest sprzedawcą wpisanym do rejestru; kwota widoczna podczas płatności jest kwotą naliczoną, a wszelkie należne podatki VAT są wskazane w tym miejscu."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Własność intelektualna",
        "blocks": [
          {
            "kind": "p",
            "text": "Nazwa, logo, kod, projekt, dokumentacja, struktura bazy danych oraz agregowane treści Usługi są wyłączną własnością Wydawcy i są chronione przez francuskie oraz międzynarodowe prawo własności intelektualnej. Nie udziela się Ci żadnej licencji poza tą ściśle konieczną do korzystania z Usługi zgodnie z jej przeznaczeniem. Nie możesz powielać, modyfikować, dekompilować ani tworzyć utworów zależnych z Usługi lub jakiejkolwiek jej części, chyba że jest to wyraźnie dozwolone przez obowiązujące prawo."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Indemnizacja",
        "blocks": [
          {
            "kind": "p",
            "text": "Zgadzasz się bronić, zaspokoić i utrzymać Wydawcę w stanie nienaruszonym wobec jakiegokolwiek roszczenia, straty, szkody, odpowiedzialności, kosztu lub wydatku (w tym rozsądnych opłat prawnych) wynikających z (a) Twojego naruszenia niniejszego Regulaminu, (b) naruszenia przez Ciebie jakiegokolwiek prawa lub prawa osoby trzeciej, lub (c) jakiejkolwiek treści, którą przesłałeś do Usługi."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Zmiany Regulaminu",
        "blocks": [
          {
            "kind": "p",
            "text": "Możemy okresowo zmieniać niniejszy Regulamin. Istotne zmiany zostaną powiadomione e-mailowo użytkownikom posiadającym konta co najmniej trzydzieści (30) dni przed ich wejściem w życie. Kontynuując korzystanie z Usługi po upływie tego okresu, akceptujesz zmieniony Regulamin. Najnowsza wersja jest zawsze dostępna pod adresem [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Rozwiązanie umowy",
        "blocks": [
          {
            "kind": "p",
            "text": "Możesz rozwiązać swoje konto w dowolnym momencie z poziomu swojego panelu. Możemy natychmiastowo rozwiązać lub zawiesić Twoje konto bez uprzedzenia, jeśli naruszasz niniejszy Regulamin, nadużywasz Usługi lub nie płacisz za subskrypcję odnawianą cyklicznie. Po rozwiązaniu Twoje dane są usuwane w ciągu trzydziestu (30) dni, z wyjątkiem zapisów dotyczących rozliczeń i zgód, które są przechowywane zgodnie z naszą Polityką Prywatności."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Prawo właściwe i jurysdykcja",
        "blocks": [
          {
            "kind": "p",
            "text": "Niniejszy Regulamin podlega prawu Francji. Wszelkie spory wynikające z niniejszego Regulaminu lub Usługi będą rozpatrywane przez sądy wyłącznie właściwe w Paryżu we Francji, z zastrzeżeniem obowiązujących praw konsumenta w kraju jego zamieszkania w Unii Europejskiej. Przed wszczęciem postępowania sądowego zobowiązujesz się podjąć próbę polubownego rozwiązania sporu, wysyłając wiadomość na adres [support@konvertools.com](mailto:support@konvertools.com). Konsumenci z UE mogą również skorzystać z platformy Europejskiego Centrum Konsumenckiego do rozstrzygania sporów online pod adresem [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Postanowienia ogólne",
        "blocks": [
          {
            "kind": "p",
            "text": "Jeśli jakiekolwiek postanowienie niniejszego Regulaminu zostanie uznane za nieważne lub nieegzekwowalne, pozostałe postanowienia pozostają w pełni skuteczne. Nasze niedopełnienie obowiązku egzekwowania jakiegokolwiek prawa lub postanowienia nie stanowi zrzeczenia się tego prawa. Niniejszy Regulamin (wraz z Polityką Prywatności oraz wszelkimi warunkami dotyczącymi konkretnych planów, na które powołano się podczas zakupu) stanowi całość umowy pomiędzy Tobą a Wydawcą dotyczącą Usługi."
          }
        ]
      }
    ]
  },
  "uk": {
    "h1": "Правила надання послуг",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Останнє оновлення: %DATE% · Використовуючи Konvertools, ви погоджуєтеся з цими умовами.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Acceptation",
        "blocks": [
          {
            "kind": "p",
            "text": "Ці Правила надання послуг (далі — «Умови») утворюють обов’язкову угоду між вами (далі — «Користувач») та видавцем Konvertools (далі — «Видавець», «ми», «нас») щодо використання вами вебсайту Konvertools та усіх пов’язаних інструментів, API та послуг (далі — «Послуга»). Створюючи обліковий запис, встановлюючи прапорець погодження під час реєстрації або просто використовуючи будь-який інструмент на Послузі, ви підтверджуєте, що ознайомилися, зрозуміли та повністю приймаєте ці Умови разом із нашою Політикою конфіденційності."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Послуга",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools надає каталог утиліт для конвертації файлів, інструментів обробки документів і зображень, AI-інструментів для роботи з текстом, орієнтовних інструментів безпеки (перевірка електронних адрес, детектор фішингу, сканер URL, перевірка SSL-сертифікатів, перевірка витоків паролів) та розробницьких утиліт. Більшість інструментів працюють виключно у вашому браузері; деякі потребують серверної обробки. Послуга надається **«як є»** та **«за наявності»** без будь-яких гарантій, явних або припустимих, включно з придатністю для продажу, відповідністю певній меті чи відсутністю порушень прав інтелектуальної власності."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Обмеження відповідальності — уважно прочитайте",
        "blocks": [
          {
            "kind": "p",
            "text": "**У межах, дозволених чинним законодавством, Видавець відмовляється від будь-якої відповідальності за шкоду будь-якого роду, що виникла внаслідок вашого використання Послуги або неможливості її використання.** Зокрема, ви визнаєте та погоджуєтеся, що Видавець не нестиме відповідальності за:"
          },
          {
            "kind": "ul",
            "items": [
              "втрату даних, пошкоджені або неправильні файли чи невдалі конвертації;",
              "рішення, фінансового, бізнесового чи іншого характеру, які ви приймаєте на основі результатів роботи будь-якого інструменту;",
              "простої, затримки чи тимчасову недоступність будь-якої функції;",
              "збої сторонніх сервісів (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, хостинг-провайдери);",
              "непрямі, випадкові, спеціальні, наслідкові чи штрафні збитки будь-якого роду;",
              "будь-яку сукупну суму, що перевищує плату, яку ви фактично сплатили нам протягом дванадцяти (12) місяців, що передували події, яка спричинила вимогу, з обмеженням у сто (100) євро для користувачів безкоштовного рівня."
            ]
          },
          {
            "kind": "p",
            "text": "**Інструменти безпеки**: сканер URL, детектор фішингу, перевірка електронних адрес, перевірка SSL-сертифікатів та перевірка витоків паролів надаються **виключно в інформаційних та орієнтовних цілях**. Вони агрегують сторонні сигнали (Google Safe Browsing, публічні DNS, HaveIBeenPwned, живі TLS-рукопотискання) та евристику великих мовних моделей. Вони **не становлять жодної гарантії безпеки, дійсності чи відсутності ризику**. Нові фішингові сторінки з’являються швидше, ніж бази даних репутації можуть їх каталогізувати; електронний лист, який пройшов нашу перевірку, може виявитися неактивним чи шахрайським; дійсний SSL-сертифікат не гарантує змісту сайту. Видавець прямо відмовляється від будь-якої відповідальності за будь-яку шкоду, спричинену фішинговим листом, який Послуга визнала безпечним, небезпечним посиланням, яке Послуга не ідентифікувала, транзакційним листом, надісланим на адресу, яку Послуга позначила як дійсну, або будь-яким рішенням щодо безпеки, прийнятим на основі цих інструментів. Користувач несе повну відповідальність за такі рішення."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Прийнятне використання",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви погоджуєтеся **не** використовувати Послугу для:"
          },
          {
            "kind": "ul",
            "items": [
              "завантаження, обробки чи поширення контенту, який є незаконним у вашій країні чи у Франції;",
              "обробки файлів, щодо яких у вас немає необхідних прав (охоронюваних авторським правом творів без дозволу, персональних даних, до яких ви не маєте права обробляти, засекреченої інформації);",
              "вчинення чи сприяння шахрайству, відмиванню грошей, фінансуванню тероризму чи будь-якій іншій злочинній діяльності;",
              "використання AI-гуманізатора, AI-текстових інструментів чи будь-якої іншої функції для плагіату, обману третьої сторони, маніпуляції системами оцінювання (академічними, рекрутинговими, рекламними мережами) у спосіб, що суперечить їхнім правилам, або для введення в оману будь-яким чином, що порушує чинне законодавство;",
              "спроб перевантаження, реверс-інжинірингу, збору даних, зловживання лімітами швидкості чи іншого втручання в роботу чи доступність Послуги;",
              "обходу квот, вимог до оплати чи будь-яких інших обмежень, що діють;",
              "створення декількох облікових записів для збільшення квот безкоштовного рівня чи спільного використання облікового запису більшою кількістю осіб, ніж дозволяє ваш тариф."
            ]
          },
          {
            "kind": "p",
            "text": "Ми можемо негайно призупинити або закрити ваш обліковий запис без попередження, якщо маємо достатні підстави вважати, що ви порушили цей розділ, без права на будь-яке відшкодування."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ваш контент",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви зберігаєте всі права, титул та інтереси щодо файлів і тексту, які ви надсилаєте до Послуги. Ви надаєте нам суворо обмежену, безоплатну, світову ліцензію на їх обробку виключно для надання запитаного вами інструменту. Ця ліцензія припиняється миттєво після повернення результату вам (інструменти з серверною обробкою) або не виникає взагалі (інструменти, що працюють лише у браузері, оскільки ваш файл до нас не надходить). Ми не претендуємо та не будемо претендувати на право власності на ваш контент і не використовуватимемо його для навчання AI-моделей."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Облікові записи",
        "blocks": [
          {
            "kind": "p",
            "text": "Вам має виповнитися шістнадцять (16) років, щоб створити обліковий запис. Ви несете відповідальність за конфіденційність своїх облікових даних та за будь-яку діяльність, що відбувається під вашим обліковим записом. Негайно повідомте нас про будь-який підозрілий несанкціонований доступ за адресою [support@konvertools.com](mailto:support@konvertools.com)."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Підписки, оплата та повернення коштів",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Тарифи**: Безкоштовний (€0), Pro (€25/міс. або €210/рік), Business (€79/міс. або €664/рік). Особливості та квоти тарифів описано на нашій сторінці [Ціни](/pricing) на момент покупки. Ми залишаємо за собою право змінювати особливості тарифів із повідомленням за 30 днів.",
              "**Автоматичне поновлення**: щомісячні та річні підписки поновлюються автоматично з тією ж періодичністю до моменту скасування. Ви можете скасувати підписку в будь-який час через свій кабінет; скасування набуває чинності наприкінці поточного періоду оплати. Ви зберігаєте доступ до Послуги до цієї дати.",
              "**Право на відмову (ЄС)**: відповідно до статті L. 221-28 Французького кодексу захисту прав споживачів, якщо ви активно використовуєте Послугу протягом початкового 14-денного періоду відмови, ви прямо погоджуєтеся з негайним виконанням договору та відмовляєтеся від права на відмову. Якщо ви не використовували жодної платної функції, ви можете відмовитися протягом 14 днів, надіславши електронний лист на [support@konvertools.com](mailto:support@konvertools.com), і ми здійснимо повне повернення коштів протягом 14 днів.",
              "**Без часткового повернення коштів**: за межами вищеописаного сценарію відмови, вже сплачені за поточний період оплати кошти не підлягають поверненню.",
              "**Зміна цін**: ми можемо змінити ціни з повідомленням за 30 днів. Існуючі підписники зберігають свою поточну ціну до наступної дати поновлення.",
              "**Обробка платежів**: платежі обробляються безпечно за допомогою **Stripe** (Stripe Payments Europe, Ltd.), процесора платежів рівня PCI-DSS 1. Ми ніколи не бачимо та не зберігаємо дані вашої картки. Видавець є продавцем за записом; сума, зазначена під час оформлення замовлення, є тією, що списується, а будь-який застосовний ПДВ вказується там само."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Інтелектуальна власність",
        "blocks": [
          {
            "kind": "p",
            "text": "Назва, логотип, код, дизайн, документація, структура бази даних та агрегований контент Послуги є виключною власністю Видавця та захищені французьким та міжнародним законодавством про інтелектуальну власність. Вам надається лише ліцензія, суворо необхідна для використання Послуги за призначенням. Ви не можете відтворювати, змінювати, декомпілювати чи створювати похідні роботи Послуги чи будь-якої її частини, окрім випадків, прямо дозволених чинним законодавством."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Відшкодування збитків",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви погоджуєтеся відшкодовувати Видавцю будь-які вимоги, збитки, шкоду, відповідальність, витрати чи витрати (включно з розумними юридичними гонорарами), що виникли внаслідок (a) вашого порушення цих Умов, (b) вашого порушення будь-якого закону чи прав третьої сторони або (c) будь-якого контенту, надісланого вами до Послуги."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Зміни Умов",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми можемо періодично змінювати ці Умови. Істотні зміни буде повідомлено електронною поштою власникам облікових записів щонайменше за тридцять (30) днів до набрання ними чинності. Продовжуючи використовувати Послугу після цього періоду, ви приймаєте змінені Умови. Остання версія завжди доступна за адресою [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Припинення дії",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви можете закрити свій обліковий запис у будь-який час через свій кабінет. Ми можемо негайно закрити або призупинити ваш обліковий запис без попередження, якщо ви порушили ці Умови, зловживали Послугою або не сплатили поточну підписку. Після припинення діяльності ваші дані видаляються протягом тридцяти (30) днів, окрім записів про оплату та згод, які зберігаються відповідно до нашої Політики конфіденційності."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Застосовне право та юрисдикція",
        "blocks": [
          {
            "kind": "p",
            "text": "Ці Умови регулюються законодавством Франції. Будь-які спори, що виникають у зв’язку з цими Умовами чи Послугою, підлягають виключній юрисдикції судів Парижа, Франція, окрім випадків, коли споживач має обов’язкове право на судовий захист у своїй країні проживання відповідно до законодавства Європейського Союзу чи національного законодавства. Перш ніж розпочинати юридичні дії, ви погоджуєтеся спробувати врегулювати спір мирним шляхом, надіславши електронний лист на [support@konvertools.com](mailto:support@konvertools.com). Споживачі з ЄС також можуть скористатися платформою Європейської комісії з вирішення спорів онлайн за адресою [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Інше",
        "blocks": [
          {
            "kind": "p",
            "text": "Якщо будь-яку умову цих Умов буде визнано недійсною чи нездійсненною, інші положення залишаються в повній силі. Наше нездійснення будь-якого права чи положення не є відмовою від цього права. Ці Умови (разом із Політикою конфіденційності та будь-якими специфічними умовами тарифу, зазначеними під час покупки) становлять повну угоду між вами та Видавцем щодо Послуги."
          }
        ]
      }
    ]
  },
  "cs": {
    "h1": "Služební podmínky",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Poslední aktualizace: %DATE% · Používáním služby Konvertools souhlasíte s těmito podmínkami.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Acceptation",
        "blocks": [
          {
            "kind": "p",
            "text": "Tyto Služební podmínky (dále jen „Podmínky“) tvoří závaznou dohodu mezi vámi (dále jen „Uživatel“) a vydavatelem služby Konvertools (dále jen „Vydavatel“, „my“, „nás“) týkající se vašeho používání webových stránek Konvertools a všech souvisejících nástrojů, API a služeb (dohromady dále jen „Služba“). Vytvořením účtu, zaškrtnutím políčka pro přijetí podmínek při registraci nebo pouhým použitím jakéhokoli nástroje na Službě potvrzujete, že jste si tyto Podmínky přečetli, porozuměli jim a plně je přijímáte spolu s naší Zásadou ochrany osobních údajů."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Služba",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools poskytuje katalog nástrojů pro převody souborů, zpracování dokumentů a obrázků, nástroje s podporou AI, indikativní bezpečnostní nástroje (ověřovač e-mailů, detektor phishingu, skener URL, kontrola SSL certifikátů, kontrola prolomených hesel) a nástroje pro vývojáře. Většina nástrojů běží výhradně ve vašem prohlížeči; některé vyžadují zpracování na serveru. Služba je poskytována **„tak, jak je“ a „tak, jak je k dispozici“** bez jakékoli záruky, ať už výslovné či implicitní, včetně záruk obchodovatelnosti, vhodnosti pro konkrétní účel nebo neporušování práv."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Omezení odpovědnosti — pozorně si přečtěte",
        "blocks": [
          {
            "kind": "p",
            "text": "**V maximální míře povolené zákonem Vydavatel odmítá jakoukoli odpovědnost za škody jakéhokoli druhu vzniklé vaším používáním Služby nebo neschopností Službu používat.** Zejména uznáváte a souhlasíte s tím, že Vydavatel nebude odpovědný za:"
          },
          {
            "kind": "ul",
            "items": [
              "ztrátu dat, poškozené nebo nesprávné soubory či selhání převodů;",
              "rozhodnutí, finanční, obchodní či jiná, která učiníte na základě výstupu z jakéhokoli nástroje;",
              "dobytrvání, latenci či dočasnou nedostupnost jakékoli funkce;",
              "selhání služeb třetích stran (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, poskytovatelé hostingu);",
              "nepřímé, vedlejší, zvláštní, následné či trestné škody jakéhokoli druhu;",
              "jakékoli celkové částky převyšující poplatky, které jste nám skutečně zaplatili v období dvanácti (12) měsíců předcházejících události zakládající nárok, omezené na sto (100) eur pro uživatele bez placeného tarifu."
            ]
          },
          {
            "kind": "p",
            "text": "**Bezpečnostní nástroje**: Skener URL, Detektor phishingu, Ověřovač e-mailů, Kontrola SSL certifikátů a Kontrola prolomených hesel jsou poskytovány **pouze pro informační a indikativní účely**. Tyto nástroje agregují signály třetích stran (Google Safe Browsing, veřejné DNS, HaveIBeenPwned, živé TLS handshaky) a heuristiky velkých jazykových modelů. **Nejedná se o záruku bezpečnosti, platnosti či absence rizika.** Nové phishingové stránky se objevují rychleji, než je schopna katalogizovat databáze reputace; e-mail, který projde našimi kontrolami, může být stále neaktivní či podvodný; platný SSL certifikát nezaručuje obsah stránky. Vydavatel výslovně odmítá jakoukoli odpovědnost za jakoukoli újmu vzniklou phishingovým e-mailem, který Služba označila za bezpečný, nebezpečným odkazem, který Služba nezjistila, transakčním e-mailem odeslaným na adresu označenou Službou jako platnou, či jakýmkoli bezpečnostním rozhodnutím učiněným na základě těchto nástrojů. Uživatel nese veškerou odpovědnost za taková rozhodnutí."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Přípustné použití",
        "blocks": [
          {
            "kind": "p",
            "text": "Souhlasíte, že Službu **nebudete** používat k:"
          },
          {
            "kind": "ul",
            "items": [
              "nahraní, zpracování či distribuci obsahu, který je v zemi vašeho bydliště či ve Francii nelegální;",
              "zpracování souborů, k nimž nemáte potřebná práva (autorskoprávně chráněná díla bez souhlasu, osobní údaje, které nemáte oprávnění zpracovávat, utajované informace);",
              "páchání či usnadňování podvodů, praní špinavých peněz, financování terorismu či jakékoli jiné trestné činnosti;",
              "používání nástrojů pro lidštění AI, nástrojů pro texty s podporou AI či jakékoli jiné funkce k plagiátorství, k podvodu třetí strany, k manipulaci hodnocení systémů (akademických, náborových, reklamních sítí) v rozporu s jejich pravidly, či k jakémukoli jinému klamání v rozporu s platnými zákony;",
              "pokusům o přetížení, reverznímu inženýrství, scrapování, zneužívání limitů frekvence či jinému zasahování do provozu či dostupnosti Služby;",
              "obcházení kvót, platebních požadavků či jakýchkoli jiných omezení;",
              "vytváření více účtů za účelem násobení kvót bezplatného tarifu či sdílení jednoho účtu mezi více osobami, než umožňuje váš tarif."
            ]
          },
          {
            "kind": "p",
            "text": "Můžeme váš účet okamžitě a bez předchozího upozornění pozastavit či ukončit, pokud máme oprávněné důvody domnívat se, že jste porušili tuto část, a to bez nároku na jakoukoli refundaci."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Váš obsah",
        "blocks": [
          {
            "kind": "p",
            "text": "Veškerá práva, vlastnictví a zájmy k souborům a textům, které do Služby nahrajete, zůstávají na vás. Poskytujete nám výhradně omezenou, bezúplatnou, celosvětovou licenci k jejich zpracování výhradně za účelem poskytnutí nástroje, který jste požadovali. Tato licence zaniká okamžikem, kdy je vám výsledek vrácen (nástroje využívající server) či nikdy nevzniká (nástroje běžící pouze v prohlížeči, jelikož váš soubor k nám nikdy nedorazí). Netvrdíme si vlastnictví vašeho obsahu ani jej nebudeme používat k trénování AI modelů."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Účty",
        "blocks": [
          {
            "kind": "p",
            "text": "K vytvoření účtu musíte být starší šestnácti (16) let. Jste odpovědní za udržování důvěrnosti svých přihlašovacích údajů a za jakoukoli aktivitu probíhající pod vaším účtem. Okamžitě nás informujte na adrese [support@konvertools.com](mailto:support@konvertools.com) o jakémkoli podezření na neoprávněný přístup."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Předplatné, platby a refundace",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Tarify**: Bezplatný (€0), Pro (€25/měsíc či €210/rok), Business (€79/měsíc či €664/rok). Funkce a kvóty tarifů jsou popsány na naší stránce [Ceník](/pricing) v době nákupu. Vyhrazujeme si právo měnit funkce tarifů s třicetidenním předstihem.",
              "**Automatické prodlužování**: Měsíční a roční předplatné se automaticky prodlužují ve stejné frekvenci, dokud nejsou zrušena. Můžete je zrušit kdykoli z vašeho panelu; zrušení nabývá účinnosti na konci aktuálního fakturačního období. Přístup si ponecháte až do tohoto data.",
              "**Právo na odstoupení (EU)**: Podle článku L. 221-28 francouzského zákoníku o ochraně spotřebitele, pokud aktivně používáte Službu během počátečního čtrnáctidenního období na odstoupení, výslovně souhlasíte s okamžitým plněním smlouvy a vzdáváte se práva na odstoupení. Pokud jste nepoužili žádnou placenou funkci, můžete odstoupit do čtrnácti dnů zasláním e-mailu na [support@konvertools.com](mailto:support@konvertools.com) a my vám do čtrnácti dnů vydáme plnou refundaci.",
              "**Žádné částečné refundace**: Mimo výše uvedený scénář odstoupení nejsou již zaplacené poplatky za aktuální fakturační období refundovatelné.",
              "**Změny cen**: Můžeme ceny změnit s třicetidenním předstihem. Stávající předplatitelé si ponechávají svou aktuální cenu až do dalšího data obnovy.",
              "**Zpracování plateb**: Platby jsou zpracovávány bezpečně prostřednictvím **Stripe** (Stripe Payments Europe, Ltd.), platebního procesoru s certifikací PCI-DSS Level 1. Vaše platební údaje nikdy nevidíme ani je neukládáme. Vydavatel je prodejcem v záznamu; částka uvedená při platbě je částka, kterou jste zaplatili, a případná DPH je na ní uvedena."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "8. Duševní vlastnictví",
        "blocks": [
          {
            "kind": "p",
            "text": "Název, logo, kód, design, dokumentace, struktura databáze a agregovaný obsah Služby jsou výhradním majetkem Vydavatele a jsou chráněny francouzskými a mezinárodními zákony o duševním vlastnictví. Vám není poskytnuta žádná licence kromě té, která je nezbytně nutná k používání Služby tak, jak je zamýšleno. Nesmíte reprodukovat, upravovat, dekompilovat ani vytvářet odvozená díla ze Služby či její části, ledaže by to bylo výslovně povoleno platným zákonem."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "9. Náhrada škody",
        "blocks": [
          {
            "kind": "p",
            "text": "Souhlasíte, že nás budete chránit a uhradíte nám jakýkoli nárok, ztrátu, škodu, odpovědnost, náklady či výdaje (včetně přiměřených právních poplatků) vzniklé v důsledku (a) vašeho porušení těchto Podmínek, (b) vašeho porušení jakéhokoli zákona či práv třetích stran, či (c) jakéhokoli obsahu, který jste do Služby nahráli."
          }
        ]
      },
      {
        "id": "changes",
        "title": "10. Změny Podmínek",
        "blocks": [
          {
            "kind": "p",
            "text": "Můžeme tyto Podmínky občas upravit. Podstatné změny budou oznámeny držitelům účtů e-mailem alespoň třicet (30) dnů před jejich nabytím účinnosti. Pokračováním v používání Služby po uplynutí tohoto období přijímáte změněné Podmínky. Nejnovější verze je vždy k dispozici na [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "11. Ukončení",
        "blocks": [
          {
            "kind": "p",
            "text": "Svůj účet můžete kdykoli ukončit z vašeho panelu. My můžeme váš účet okamžitě a bez předchozího upozornění ukončit či pozastavit, pokud porušíte tyto Podmínky, zneužijete Službu či nezaplatíte opakující se předplatné. Po ukončení jsou vaše data smazána do třiceti (30) dnů, s výjimkou fakturačních a souhlasových záznamů, které jsou uchovány tak, jak je popsáno v naší Zásadě ochrany osobních údajů."
          }
        ]
      },
      {
        "id": "law",
        "title": "12. Působnost práva a příslušnost soudů",
        "blocks": [
          {
            "kind": "p",
            "text": "Tyto Podmínky se řídí právem Francie. Jakýkoli spor vzniklý v souvislosti s těmito Podmínkami či Službou bude podroben výhradně příslušnosti soudů v Paříži ve Francii, s výjimkou případů, kdy má spotřebitel podle evropského či národního práva právo na soudní řízení ve své zemi bydliště. Před zahájením právních kroků se dohodnete, že se pokusíte spor řešit smírně zasláním zprávy na [support@konvertools.com](mailto:support@konvertools.com). Spotřebitelé z EU mohou také využít platformu pro řešení sporů Evropské komise na adrese [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "13. Různé",
        "blocks": [
          {
            "kind": "p",
            "text": "Pokud je jakékoli ustanovení těchto Podmínek shledáno neplatným či nevymahatelným, zbytek ustanovení zůstává v plném rozsahu účinný. Naše neprosazování jakéhokoli práva či ustanovení není zřeknutím se tohoto práva. Tyto Podmínky (spolu se Zásadou ochrany osobních údajů a jakýmikoli tarif-specifickými podmínkami uvedenými při nákupu) tvoří celou dohodu mezi vámi a Vydavatelem týkající se Služby."
          }
        ]
      }
    ]
  }
};
