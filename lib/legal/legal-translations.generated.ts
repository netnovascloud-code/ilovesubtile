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
    "lastUpdatedLabel": "Dernière mise à jour : %DATE% · Applicable immédiatement pour tous les visiteurs et détenteurs de compte.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Notre principe fondamental : nous ne conservons pas vos fichiers",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (le « Service ») fonctionne comme une boîte à outils axée sur la confidentialité. L'engagement le plus important que nous prenons est le suivant :"
          },
          {
            "kind": "ul",
            "items": [
              "**Outils exécutés uniquement dans le navigateur** (convertisseurs d'images, outils PDF utilisant pdf-lib, conversions audio et vidéo via FFmpeg.wasm, outils de code, calculatrices, générateurs de QR codes, le vérificateur de fuites de mots de passe, la plupart des utilitaires) s'exécutent **entièrement dans votre navigateur web via WebAssembly**. Votre fichier ou votre saisie n'est jamais transmis à nos serveurs. Nous n'avons aucun moyen technique de le lire.",
              "**Outils assistés par serveur** (transcription IA, traduction IA, tâches textuelles IA, sous-titres vidéo intégrés, le scanner d'URL, le détecteur de phishing, le vérificateur de certificats SSL et quelques autres) nécessitent l'envoi de données vers un backend. Dans chaque cas, le fichier ou le texte est traité en temps réel et supprimé du stockage temporaire dans les trente (30) minutes qui suivent.",
              "Nous ne stockons jamais le contenu d'un fichier téléversé dans un emplacement persistant, nous n'utilisons jamais vos téléversements pour entraîner des modèles d'IA, et nous ne vendons, ne louons ni ne partageons vos données avec des tiers à quelque fin que ce soit, sauf pour vous fournir le résultat que vous avez demandé."
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
            "text": "Aux fins du Règlement général sur la protection des données (RGPD, Règlement (UE) 2016/679), le responsable du traitement des données est l'éditeur du Service. Contact pour toute question relative à la confidentialité : [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Identifiants de compte** : votre adresse e-mail ; une copie salée et hachée de votre mot de passe (gérée par Supabase Auth — nous ne voyons ni ne stockons le mot de passe en clair) ; un nom d'affichage et une URL d'avatar optionnels si vous vous connectez avec Google.",
              "**État de l'abonnement** : plan actuel (gratuit / Pro / Business), identifiant client Stripe, solde de crédit actuel, et les dates de vos renouvellements les plus récents.",
              "**Compteurs d'utilisation** : compteurs de quota agrégés (par exemple, « 3 exécutions IA utilisées aujourd'hui », « 420 exécutions IA mensuelles utilisées ») mis à jour directement sur votre ligne de profil. Nous ne **consignons pas** de registres par exécution.",
              "**Métadonnées des tâches (transitoires)** : lorsqu'un outil assisté par serveur produit un résultat (par exemple, un fichier .srt issu d'une transcription), nous enregistrons le nom de l'outil, l'URL de téléchargement du résultat, la langue source et un horodatage de fin. Ces lignes sont purgées automatiquement après **deux (2) heures**. Elles ne contiennent jamais le contenu de votre fichier.",
              "**Enregistrements de consentement** : la date et l'heure auxquelles vous avez accepté ces Conditions générales et notre Politique de confidentialité, ainsi que votre choix d'opter pour les e-mails marketing. Conservés pendant la durée de votre compte plus une période probatoire légale de cinq (5) ans après la suppression.",
              "**Clés API** : si vous générez des clés pour l'API REST publique, nous ne stockons que le hachage SHA-256 et un préfixe d'affichage de 12 caractères. La clé brute vous est affichée une seule fois lors de sa création et ne peut plus être récupérée par la suite."
            ]
          },
          {
            "kind": "p",
            "text": "Nous ne collectons **pas** : votre adresse IP (au-delà de l'utilisation temporaire que Supabase et notre hébergeur en font pour la limitation de débit et la journalisation de sécurité), votre empreinte de navigateur, des événements de suivi comportemental, vos enregistrements d'écran ou des données biométriques."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Fichiers que vous traitez",
        "blocks": [
          {
            "kind": "p",
            "text": "Comme indiqué à la section 1, le contenu des fichiers que vous traitez n'est jamais conservé par nos soins. Le cycle de vie précis est le suivant :"
          },
          {
            "kind": "ul",
            "items": [
              "**Outils exécutés uniquement dans le navigateur** : aucune transmission. Le fichier est lu en mémoire par votre navigateur, le résultat est produit localement, et vous le téléchargez directement. Nous ne consignons rien concernant le fichier lui-même.",
              "**Transcription / traduction / OCR / analyse de phishing IA** : le fichier ou le texte est transmis en flux continu à notre fonction Edge Supabase, qui le redirige immédiatement vers le fournisseur d'IA concerné (voir section 7) pour inférence. Le résultat vous est retourné et le tampon de téléversement temporaire est supprimé. Les fichiers de résultat écrits dans notre compartiment de stockage privé sont accessibles via une URL signée pendant soixante (60) minutes et physiquement purgés dans les trente (30) minutes suivant leur génération.",
              "**Vérificateur de fuites de mots de passe** : votre mot de passe ne quitte jamais votre navigateur. Nous le hachons localement avec SHA-1 et interrogeons HaveIBeenPwned en utilisant le k-anonymat — seuls les cinq premiers caractères du hachage sont envoyés. Le mot de passe et le hachage complet ne sont jamais transmis.",
              "**Scanner d'URL / vérificateur SSL** : seule l'URL ou le nom d'hôte que vous saisissez est transmis (vers Google Safe Browsing pour le scanner d'URL, ou utilisé pour ouvrir une connexion TLS en direct pour le vérificateur SSL). Aucun contenu de page environnant."
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
              "**Exécution d'un contrat** (Art. 6(1)(b)) — lorsque vous créez un compte et utilisez des fonctionnalités payantes, le traitement est nécessaire pour fournir le Service.",
              "**Intérêts légitimes** (Art. 6(1)(f)) — prévention des fraudes, atténuation des abus, journalisation de sécurité de base et amélioration du Service.",
              "**Consentement** (Art. 6(1)(a)) — e-mails marketing, cookies analytiques ou publicitaires optionnels (le cas échéant), et toute intégration optionnelle future.",
              "**Obligation légale** (Art. 6(1)(c)) — conservation des enregistrements de facturation conformément à la loi fiscale française (généralement dix ans)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Vos droits",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous bénéficiez des droits d'accès (Art. 15), de rectification (Art. 16), d'effacement (Art. 17), de limitation (Art. 18), de portabilité (Art. 20), d'opposition (Art. 21) et de retrait du consentement à tout moment sans affecter la légalité des traitements antérieurs. Vous avez également le droit de déposer une réclamation auprès de la CNIL (France) ou de l'autorité de protection des données de votre pays de résidence. Pour exercer l'un de ces droits, envoyez un e-mail à l'adresse [privacy@konvertools.com](mailto:privacy@konvertools.com) depuis l'adresse enregistrée sur votre compte. Nous répondrons dans les trente (30) jours, conformément à l'Art. 12(3) du RGPD."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Sous-traitants tiers",
        "blocks": [
          {
            "kind": "p",
            "text": "La fourniture du Service nécessite que nous partagions des données strictement limitées avec les sous-traitants suivants. Chacun dispose de sa propre politique de confidentialité régissant la manière dont ils traitent les données qu'ils reçoivent de notre part."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (société enregistrée à Singapour, hébergée dans l'UE pour notre projet) — authentification, base de données, stockage de fichiers et fonctions Edge. Reçoit vos identifiants de compte, vos données de profil et (de manière transitoire) tout fichier que vous téléversez pour un outil assisté par serveur. Agit en tant que sous-traitant.",
              "**Mistral AI** (France) — inférence de modèles de langage pour la traduction, la reformulation, la synthèse, l'humanisation de texte, l'analyse de schémas de phishing et autres tâches textuelles ; transcription audio (Voxtral) ; OCR et tâches de vision par ordinateur d'images (Pixtral). Le texte ou l'image que vous soumettez est envoyé à Mistral pour inférence. Mistral s'est engagé contractuellement à **ne pas** utiliser les entrées de l'API pour entraîner ses modèles.",
              "**Google Safe Browsing** (Google LLC, États-Unis) — uniquement lorsque vous utilisez le Scanner d'URL ou le Détecteur de phishing. Seules les URL que vous soumettez (ou les liens extraits de l'e-mail que vous collez) sont transmises. Il s'agit du seul service tiers de sécurité que nous utilisons.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — uniquement lorsque vous utilisez le Vérificateur de fuites de mots de passe, et uniquement les cinq premiers caractères du hachage SHA-1 de votre mot de passe (k-anonymat). Interrogé directement depuis votre navigateur, sans passer par nos serveurs.",
              "**Stripe** (États-Unis / Irlande) — traitement des paiements et gestion des abonnements. Nous **ne voyons ni ne stockons** les détails de votre carte. Stripe reçoit votre adresse e-mail, votre méthode de paiement et le plan/pack de crédits que vous avez acheté.",
              "**Resend** (États-Unis) — envoi d'e-mails transactionnels (confirmation de compte, reçus de paiement, réinitialisation de mot de passe). Reçoit votre adresse e-mail et le corps de l'e-mail que nous envoyons.",
              "**Vercel** (États-Unis) — réseau de diffusion de contenu pour les pages statiques. Reçoit des métadonnées standard du trafic web (IP, user-agent, URL demandée) pour le routage et la prévention des abus. Conservées conformément à la politique de rétention des logs de Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Lorsque l'un de ces sous-traitants opère en dehors de l'Espace économique européen, les transferts sont régis par les Clauses contractuelles types (SCC) de la Commission européenne ou un mécanisme de transfert équivalent."
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
              "**Essentiels** : NEXT_LOCALE (retient la langue choisie), et les cookies de session Supabase (sb-*-auth-token) lorsque vous êtes connecté. Ceux-ci ne nécessitent pas de consentement au titre du RGPD.",
              "**Publicité optionnelle** : si et lorsque nous activons des partenaires publicitaires (Ezoic est actuellement référencé dans notre code mais non activé pour votre trafic), nous afficherons une bannière de consentement claire et ne définirons des cookies publicitaires qu'après votre accord."
            ]
          },
          {
            "kind": "p",
            "text": "Nous n'exécutons actuellement aucune analyse, pixel de suivi ou balise de reciblage. Si nous en ajoutons, la bannière de cookies ci-dessus les contrôlera."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Sécurité",
        "blocks": [
          {
            "kind": "p",
            "text": "Tout le trafic vers et depuis le Service est chiffré avec TLS 1.2 ou supérieur. Les mots de passe sont stockés sous forme de hachages Argon2 par Supabase Auth. Nous vérifions les nouveaux mots de passe côté client via l'API publique HaveIBeenPwned en utilisant le k-anonymat, de sorte qu'un mot de passe connu pour avoir fuité ne peut pas être utilisé. Les clés API sont stockées uniquement sous forme de hachages SHA-256. Les lignes de la base de données sont protégées par des politiques de sécurité au niveau des lignes qui garantissent qu'un utilisateur ne peut pas lire les données d'un autre utilisateur. Malgré ces mesures, aucun système n'est parfaitement sécurisé ; vous acceptez le risque résiduel inhérent à tout service en ligne."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Rétention",
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
        "title": "11. Mineurs",
        "blocks": [
          {
            "kind": "p",
            "text": "Le Service **n'est pas destiné aux enfants de moins de seize (16) ans**. Si vous avez moins de cet âge, vous ne devez pas créer de compte. Nous ne collectons pas sciemment de données auprès des mineurs ; si nous en prenons connaissance, nous les supprimerons."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Modifications de cette politique",
        "blocks": [
          {
            "kind": "p",
            "text": "Nous pouvons modifier cette Politique de confidentialité de temps à autre. Les modifications substantielles seront annoncées par e-mail aux détenteurs de compte au moins trente (30) jours avant leur entrée en vigueur. La version la plus récente est toujours disponible à l'adresse [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contact",
        "blocks": [
          {
            "kind": "p",
            "text": "Pour toute question concernant cette politique ou vos données, écrivez à l'adresse [privacy@konvertools.com](mailto:privacy@konvertools.com). Vous pouvez également déposer une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL, [cnil.fr](https://www.cnil.fr/)) ou auprès de l'autorité de protection des données de votre pays de résidence."
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
            "text": "Konvertools (el \"Servicio\") se opera como un conjunto de herramientas con privacidad como prioridad. El compromiso más importante que asumimos es el siguiente:"
          },
          {
            "kind": "ul",
            "items": [
              "**Herramientas solo para navegador** (convertidores de imágenes, herramientas de PDF que usan pdf-lib, conversiones de audio y vídeo con FFmpeg.wasm, herramientas de código, calculadoras, generadores de códigos QR, el verificador de filtraciones de contraseñas, la mayoría de las utilidades) se ejecutan **completamente dentro de tu navegador web mediante WebAssembly**. Tu archivo o entrada nunca se transmite a nuestros servidores. No tenemos medios técnicos para leerlo.",
              "**Herramientas con asistencia de servidor** (transcripción con IA, traducción con IA, tareas de texto con IA, subtítulos incrustados en vídeo, el escáner de URLs, el detector de phishing, el verificador de certificados SSL y un pequeño número de otras) necesitan enviar algo a un backend. En todos los casos, el archivo o texto se procesa en tiempo real y se elimina del almacenamiento temporal en un plazo de treinta (30) minutos.",
              "Nunca almacenamos el contenido de ningún archivo subido en una ubicación persistente, no utilizamos tus archivos para entrenar modelos de IA, ni los vendemos, alquilamos ni compartimos con terceros para ningún fin distinto al de entregar el resultado que solicitaste."
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
            "text": "A efectos del Reglamento General de Protección de Datos de la UE (Reglamento (UE) 2016/679, \"GDPR\"), el responsable del tratamiento de datos es el editor del Servicio. Para cualquier consulta sobre privacidad: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Credenciales de cuenta**: tu dirección de correo electrónico; una copia salada y cifrada de tu contraseña (gestionada por Supabase Auth — nunca vemos ni almacenamos el texto sin cifrar); nombre de visualización opcional y URL del avatar si inicias sesión con Google.",
              "**Estado de suscripción**: plan actual (gratis / Pro / Business), identificador de cliente de Stripe, saldo de crédito actual y las fechas de tus renovaciones más recientes.",
              "**Contadores de uso**: contadores agregados de cuota (por ejemplo, \"3 ejecuciones de IA usadas hoy\", \"420 ejecuciones de IA mensuales usadas\") actualizados en tu perfil. **No registramos** registros por ejecución.",
              "**Metadatos de trabajos (transitorios)**: cuando una herramienta con asistencia de servidor genera un resultado (por ejemplo, un archivo .srt de transcripción), registramos el nombre de la herramienta, la URL de descarga del resultado, el idioma de origen y una marca de tiempo de finalización. Estas filas se eliminan automáticamente después de **dos (2) horas**. Nunca contienen el contenido de tu archivo.",
              "**Registros de consentimiento**: la fecha y hora en que aceptaste estos Términos y nuestra Política de Privacidad, y si optaste por recibir correos electrónicos de marketing. Se conservan durante la duración de tu cuenta más un período de prueba legal de cinco (5) años tras la eliminación.",
              "**Claves de API**: si generas claves para la API REST pública, almacenamos solo el hash SHA-256 y un prefijo de visualización de 12 caracteres. La clave sin cifrar se muestra exactamente una vez en el momento de su creación y, a partir de entonces, es irrecuperable."
            ]
          },
          {
            "kind": "p",
            "text": "**No recopilamos**: tu dirección IP (más allá del uso temporal que Supabase y nuestro proveedor de alojamiento hacen de ella para limitación de velocidad y registros de seguridad), huella digital de tu navegador, eventos de seguimiento conductual, grabaciones de pantalla ni ningún dato biométrico."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Archivos que procesas",
        "blocks": [
          {
            "kind": "p",
            "text": "Como se indica en la sección 1, el contenido de los archivos que procesas nunca es almacenado por nosotros. El ciclo de vida exacto es el siguiente:"
          },
          {
            "kind": "ul",
            "items": [
              "**Herramientas solo para navegador**: cero transmisión. El archivo se lee en la memoria por tu navegador, el resultado se produce localmente y lo descargas directamente. No registramos nada sobre el archivo en sí.",
              "**Transcripción / traducción / OCR con IA / análisis de phishing con IA**: el archivo o texto se envía en tiempo real a nuestra función Edge de Supabase, que lo reenvía inmediatamente al proveedor de IA correspondiente (consulta la sección 7) para su inferencia. El resultado se devuelve y el búfer de subida temporal se descarta. Los archivos de resultados escritos en nuestro bucket de almacenamiento privado son accesibles mediante URL firmada durante sesenta (60) minutos y se eliminan físicamente en un plazo de treinta (30) minutos tras su generación.",
              "**Verificador de filtraciones de contraseñas**: tu contraseña nunca abandona tu navegador. La ciframos localmente con SHA-1 y consultamos HaveIBeenPwned mediante k-anonimato — solo se envían los primeros 5 caracteres del hash. La contraseña y el hash completo nunca se transmiten.",
              "**Escáner de URLs / verificador de SSL**: solo se transmite la URL o el nombre de host que escribes (a Google Safe Browsing para el escáner de URLs, o se usa para abrir una conexión TLS en vivo para el verificador de SSL). No se envían los contenidos de la página circundante."
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
              "**Cumplimiento de un contrato** (Art. 6(1)(b)) — cuando creas una cuenta y usas funciones de pago, el tratamiento es necesario para prestar el Servicio.",
              "**Intereses legítimos** (Art. 6(1)(f)) — prevención de fraudes, mitigación de abusos, registros básicos de seguridad y mejora del Servicio.",
              "**Consentimiento** (Art. 6(1)(a)) — correos electrónicos de marketing, cookies analíticas o publicitarias opcionales (si y cuando se activen), y cualquier integración opcional futura.",
              "**Obligación legal** (Art. 6(1)(c)) — conservación de registros de facturación según lo exigido por la ley fiscal francesa (normalmente diez años)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Tus derechos",
        "blocks": [
          {
            "kind": "p",
            "text": "Tienes los derechos de acceso (Art. 15), rectificación (Art. 16), supresión (Art. 17), limitación (Art. 18), portabilidad (Art. 20), oposición (Art. 21) y a retirar el consentimiento en cualquier momento sin afectar la legalidad de los tratamientos previos. También tienes derecho a presentar una reclamación ante la CNIL (Francia) o la autoridad de control de tu país de residencia. Para ejercer cualquier derecho, envía un correo a [privacy@konvertools.com](mailto:privacy@konvertools.com) desde la dirección registrada en tu cuenta. Respondemos en un plazo de treinta (30) días, según lo exige el GDPR Art. 12(3)."
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
              "**Supabase** (con sede en Singapur, alojado en la UE para nuestro proyecto) — autenticación, base de datos, almacenamiento de archivos y funciones Edge. Recibe tus credenciales de cuenta, datos de perfil y (de forma transitoria) cualquier archivo que subas para una herramienta con asistencia de servidor. Actúa como nuestro subprocesador.",
              "**Mistral AI** (Francia) — inferencia con modelos de lenguaje para traducción, reformulación, resumen, el humanizador de IA, análisis de patrones de phishing y otras tareas de texto; transcripción de audio (Voxtral); tareas de OCR e imágenes (Pixtral). El texto o imagen que envíes se envía a Mistral para su inferencia. Mistral se ha comprometido contractualmente a **no utilizar las entradas de la API para entrenar sus modelos**.",
              "**Google Safe Browsing** (Google LLC, EE. UU.) — solo cuando usas el Escáner de URLs o el Detector de Phishing. Solo se transmiten las URLs que escribas (o los enlaces extraídos del correo que pegues). Este es el único servicio de seguridad de terceros que utilizamos.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — solo cuando usas el Verificador de Filtraciones de Contraseñas, y solo los primeros 5 caracteres del hash SHA-1 de tu contraseña (k-anonimato). Se consulta directamente desde tu navegador, no a través de nuestros servidores.",
              "**Stripe** (EE. UU. / Irlanda) — procesamiento de pagos y gestión de suscripciones. **Nunca vemos ni almacenamos** los detalles de tu tarjeta. Stripe recibe tu correo electrónico, método de pago y el plan/paquete de crédito que compraste.",
              "**Resend** (EE. UU.) — entrega de correos electrónicos transaccionales (confirmación de cuenta, recibos de pago, restablecimiento de contraseña). Recibe tu dirección de correo electrónico y el cuerpo del correo que enviamos.",
              "**Vercel** (EE. UU.) — red de distribución de contenido para páginas estáticas. Recibe metadatos estándar de tráfico web (IP, agente de usuario, URL solicitada) para enrutamiento y prevención de abusos. Se conservan según la política de retención de registros de Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Cuando alguno de estos procesadores opera fuera del Espacio Económico Europeo, las transferencias están reguladas por las Cláusulas Contractuales Tipo (SCC) de la Comisión Europea o un mecanismo de transferencia equivalente."
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
              "**Esenciales**: NEXT_LOCALE (recuerda el idioma elegido), y las cookies de sesión de Supabase (sb-*-auth-token) cuando inicias sesión. Estas no requieren consentimiento según el GDPR.",
              "**Publicidad opcional**: si y cuando activemos socios publicitarios (actualmente Ezoic está referenciado en nuestro código pero no está activado para tu tráfico), mostraremos un banner de consentimiento claro y solo estableceremos cookies publicitarias tras tu opción de inclusión."
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
        "title": "9. Seguridad",
        "blocks": [
          {
            "kind": "p",
            "text": "Todo el tráfico hacia y desde el Servicio está cifrado con TLS 1.2 o superior. Las contraseñas se almacenan como hashes Argon2 por Supabase Auth. Comprobamos las nuevas contraseñas contra la API pública de HaveIBeenPwned con k-anonimato en el lado del cliente, por lo que no se puede usar una contraseña conocida como filtrada. Las claves de API se almacenan solo como hashes SHA-256. Las filas de la base de datos están protegidas por políticas de seguridad a nivel de fila que garantizan que un usuario no pueda leer los datos de otro. A pesar de estas medidas, ningún sistema es perfectamente seguro; aceptas el riesgo residual inherente a cualquier servicio en línea."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Retención",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Datos de perfil: se conservan mientras exista tu cuenta, se eliminan en un plazo de treinta (30) días tras el cierre de la cuenta.",
              "Metadatos de trabajos: se eliminan automáticamente después de dos (2) horas.",
              "Archivos de resultados en el bucket de almacenamiento: se eliminan físicamente en un plazo de treinta (30) minutos tras su generación.",
              "Registros de facturación: se conservan durante diez (10) años para cumplir con las obligaciones fiscales francesas.",
              "Registros de consentimiento: se conservan durante la duración de tu cuenta más cinco (5) años adicionales como prueba legal."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Menores de edad",
        "blocks": [
          {
            "kind": "p",
            "text": "El Servicio **no está dirigido a menores de dieciséis (16) años**. Si tienes menos de esa edad, no debes crear una cuenta. No recopilamos datos de menores de forma intencional; si nos percatamos de que lo hemos hecho, los eliminaremos."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Cambios en esta política",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos modificar esta Política de Privacidad en cualquier momento. Los cambios sustanciales se anunciarán por correo electrónico a los titulares de cuentas al menos treinta (30) días antes de que entren en vigor. La versión más reciente siempre está disponible en [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contacto",
        "blocks": [
          {
            "kind": "p",
            "text": "Para cualquier pregunta sobre esta política o tus datos, escribe a [privacy@konvertools.com](mailto:privacy@konvertools.com). También puedes presentar una reclamación ante la autoridad francesa de protección de datos (CNIL, [cnil.fr](https://www.cnil.fr/)) o ante la autoridad de control de tu país de residencia."
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
            "text": "O **Konvertools** (o \"Serviço\") é operado como um conjunto de ferramentas focado em privacidade. O compromisso mais importante que assumimos é este:"
          },
          {
            "kind": "ul",
            "items": [
              "**Ferramentas executadas apenas no navegador** (conversores de imagem, ferramentas de PDF que utilizam o pdf-lib, conversões de áudio e vídeo com o FFmpeg.wasm, ferramentas de código, calculadoras, geradores de QR, o verificador de violação de senhas, a maioria das utilidades) são executadas **inteiramente dentro do seu navegador web por meio do WebAssembly**. Seu arquivo ou entrada nunca é transmitido aos nossos servidores. Não possuímos meios técnicos para lê-lo.",
              "**Ferramentas assistidas por servidor** (transcrição por IA, tradução por IA, tarefas de texto por IA, legendas embutidas em vídeos, o scanner de URLs, o detector de phishing, o verificador de certificados SSL e um pequeno número de outras) precisam enviar algo a um backend. Em todos os casos, o arquivo ou texto é processado em tempo real e excluído do armazenamento temporário em até trinta (30) minutos.",
              "Nunca armazenamos o conteúdo de nenhum arquivo carregado em local persistente, não utilizamos seus uploads para treinar modelos de IA e não vendemos, alugamos ou compartilhamos seus dados com terceiros para qualquer finalidade além de fornecer o resultado que você solicitou."
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
            "text": "Para os fins do Regulamento Geral sobre a Proteção de Dados da União Europeia (Regulamento (UE) 2016/679, \"GDPR\"), o controlador de dados é o editor do Serviço. Contato para qualquer consulta sobre privacidade: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Quais dados coletamos",
        "blocks": [
          {
            "kind": "p",
            "text": "Os únicos dados pessoais que persistimos em nosso banco de dados são:"
          },
          {
            "kind": "ul",
            "items": [
              "**Credenciais de conta**: seu endereço de e-mail; uma cópia com hash e salgada de sua senha (gerenciada pelo Supabase Auth — nunca vemos ou armazenamos a senha em texto simples); nome de exibição e URL do avatar opcionais, caso você faça login com o Google.",
              "**Estado da assinatura**: plano atual (gratuito / Pro / Business), identificador do cliente no Stripe, saldo de créditos atual e as datas de suas renovações mais recentes.",
              "**Contadores de uso**: contadores agregados de cota (por exemplo, \"3 execuções de IA usadas hoje\", \"420 execuções de IA mensais usadas\") atualizados no perfil do usuário. **Não registramos** registros por execução.",
              "**Metadados de tarefas (transitórios)**: quando uma ferramenta assistida por servidor produz um resultado (por exemplo, um arquivo .srt de transcrição), registramos o nome da ferramenta, a URL de download do resultado, o idioma de origem e um carimbo de data/hora de conclusão. Essas linhas são removidas automaticamente após **duas (2) horas**. Elas nunca contêm o conteúdo do seu arquivo.",
              "**Registros de consentimento**: a data e hora em que você aceitou estes Termos e nossa Política de Privacidade, e se optou por receber e-mails de marketing. Mantidos durante a duração da sua conta mais um período de cinco (5) anos após a exclusão, como prova legal.",
              "**Chaves de API**: se você gerar chaves para a API REST pública, armazenamos apenas o hash SHA-256 e um prefixo de exibição de 12 caracteres. A chave bruta é exibida a você exatamente uma vez no momento da criação e não pode ser recuperada posteriormente."
            ]
          },
          {
            "kind": "p",
            "text": "**Não coletamos**: seu endereço IP (além do uso temporário que o Supabase e nosso provedor de hospedagem fazem dele para limitação de taxa e registro de segurança), impressão digital do navegador, eventos de rastreamento comportamental, gravações de tela ou quaisquer dados biométricos."
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
              "**Ferramentas executadas apenas no navegador**: nenhuma transmissão. O arquivo é lido na memória pelo seu navegador, o resultado é produzido localmente e você faz o download diretamente. Não registramos nada sobre o arquivo em si.",
              "**Transcrição / tradução / OCR / análise de phishing por IA**: o arquivo ou texto é transmitido para nossa função Edge do Supabase, que imediatamente o encaminha para o respectivo provedor de IA (consulte a seção 7) para inferência. O resultado é retornado a você e o buffer de upload temporário é descartado. Os arquivos de resultado gravados em nosso bucket de armazenamento privado são acessíveis por meio de URLs assinadas por você por sessenta (60) minutos e fisicamente removidos em até trinta (30) minutos após a geração.",
              "**Verificador de violação de senhas**: sua senha nunca sai do seu navegador. Nós a criptografamos localmente com SHA-1 e consultamos o HaveIBeenPwned usando k-anonimato — apenas os primeiros 5 caracteres do hash são enviados. A senha e o hash completo nunca são transmitidos.",
              "**Scanner de URLs / verificador SSL**: apenas a URL ou nome de host que você digita é transmitido (para o Google Safe Browsing no caso do scanner de URLs ou usado para abrir uma conexão TLS ao vivo no verificador SSL). Nenhum conteúdo circundante da página."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Bases legais para o processamento (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Execução de um contrato** (Art. 6(1)(b)) — quando você cria uma conta e utiliza recursos pagos, o processamento é necessário para fornecer o Serviço.",
              "**Interesses legítimos** (Art. 6(1)(f)) — prevenção de fraudes, mitigação de abusos, registro básico de segurança e aprimoramento do Serviço.",
              "**Consentimento** (Art. 6(1)(a)) — e-mails de marketing, cookies opcionais de análise ou publicidade (se e quando ativados), e qualquer integração opcional futura.",
              "**Obrigação legal** (Art. 6(1)(c)) — retenção de registros de faturamento conforme exigido pela legislação tributária francesa (geralmente dez anos)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Seus direitos",
        "blocks": [
          {
            "kind": "p",
            "text": "Você tem os direitos de acesso (Art. 15), retificação (Art. 16), eliminação (Art. 17), limitação (Art. 18), portabilidade (Art. 20), objeção (Art. 21) e de retirar o consentimento a qualquer momento sem afetar a legalidade do processamento anterior. Você também tem o direito de apresentar uma reclamação à CNIL (França) ou à autoridade de supervisão do seu país de residência. Para exercer qualquer direito, envie um e-mail para [privacy@konvertools.com](mailto:privacy@konvertools.com) a partir do endereço registrado em sua conta. Respondemos dentro de trinta (30) dias, conforme exigido pelo GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Processadores de terceiros",
        "blocks": [
          {
            "kind": "p",
            "text": "Para fornecer o Serviço, precisamos compartilhar dados estritamente limitados com os seguintes processadores. Cada um deles possui sua própria política de privacidade que rege como lidam com os dados que recebem de nós."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (incorporada em Singapura, hospedada na UE para nosso projeto) — autenticação, banco de dados, armazenamento de arquivos e funções Edge. Recebe suas credenciais de conta, dados de perfil e (transitoriamente) qualquer arquivo que você carregue para uma ferramenta assistida por servidor. Atua como nosso sub-processador.",
              "**Mistral AI** (França) — inferência de modelos de linguagem de grande porte para tradução, reformulação, resumo, humanização de texto por IA, análise de padrões de phishing e outras tarefas de texto; transcrição de áudio (Voxtral); OCR de imagens e tarefas de visão (Pixtral). O texto ou imagem que você enviar é enviado à Mistral para inferência. A Mistral se comprometeu contratualmente a **não usar as entradas da API para treinar seus modelos**.",
              "**Google Safe Browsing** (Google LLC, EUA) — apenas quando você utiliza o Scanner de URLs ou o Detector de Phishing. Apenas as URLs que você enviar (ou links extraídos do e-mail que você colar) são transmitidas. Este é o único serviço de segurança de terceiros que utilizamos.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — apenas quando você utiliza o Verificador de Violação de Senhas, e apenas os primeiros 5 caracteres do hash SHA-1 de sua senha (k-anonimato). Consultado diretamente do seu navegador, não por meio de nossos servidores.",
              "**Stripe** (EUA / Irlanda) — processamento de pagamentos e gerenciamento de assinaturas. **Nunca vemos ou armazenamos** os detalhes do seu cartão. O Stripe recebe seu e-mail, método de pagamento e o plano/pacote de créditos que você comprou.",
              "**Resend** (EUA) — entrega de e-mails transacionais (confirmação de conta, recibos de pagamento, redefinição de senha). Recebe seu endereço de e-mail e o corpo do e-mail que enviamos.",
              "**Vercel** (EUA) — rede de distribuição de conteúdo para páginas estáticas. Recebe metadados padrão de tráfego web (IP, user-agent, URL solicitada) para roteamento e prevenção de abusos. Mantidos de acordo com a política de retenção de logs da Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Quando qualquer um desses processadores opera fora do Espaço Econômico Europeu, as transferências são regidas pelas Cláusulas Contratuais Padrão (SCCs) da Comissão Europeia ou por um mecanismo de transferência equivalente."
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
              "**Essenciais**: NEXT_LOCALE (lembra o idioma escolhido) e cookies de sessão do Supabase (sb-*-auth-token) quando você está conectado. Esses não exigem consentimento conforme o GDPR.",
              "**Publicidade opcional**: se e quando ativarmos parceiros de publicidade (atualmente o Ezoic está referenciado em nosso código, mas ainda não ativado para o seu tráfego), exibiremos um banner claro de consentimento e só definiremos cookies de publicidade após sua opção."
            ]
          },
          {
            "kind": "p",
            "text": "Atualmente, não executamos nenhuma análise, pixels de rastreamento ou tags de remarketing. Se adicionarmos alguma, o banner de cookies acima as bloqueará."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Segurança",
        "blocks": [
          {
            "kind": "p",
            "text": "Todo o tráfego para e do Serviço é criptografado com TLS 1.2 ou superior. As senhas são armazenadas como hashes Argon2 pelo Supabase Auth. Verificamos novas senhas contra a API pública de k-anonimato do HaveIBeenPwned no lado do cliente, para que uma senha conhecida como violada não possa ser usada. As chaves de API são armazenadas apenas como hashes SHA-256. As linhas do banco de dados são protegidas por políticas de segurança em nível de linha que garantem que um usuário não possa ler os dados de outro usuário. Apesar dessas medidas, nenhum sistema é perfeitamente seguro; você aceita o risco residual inerente a qualquer serviço online."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Retenção",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dados de perfil: mantidos enquanto sua conta existir, excluídos em até trinta (30) dias após o encerramento da conta.",
              "Metadados de tarefas: removidos automaticamente após duas (2) horas.",
              "Arquivos de resultado no bucket de armazenamento: excluídos fisicamente em até trinta (30) minutos após a geração.",
              "Registros de faturamento: retidos por dez (10) anos para cumprir obrigações fiscais francesas.",
              "Registros de consentimento: mantidos durante a duração da sua conta mais cinco (5) anos após a exclusão, como prova legal."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Menores de idade",
        "blocks": [
          {
            "kind": "p",
            "text": "O Serviço **não é direcionado a crianças menores de dezesseis (16) anos**. Se você tiver menos de 16 anos, não deve criar uma conta. Não coletamos dados de menores de forma intencional; se tomarmos conhecimento de que coletamos, excluiremos os dados."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Alterações nesta política",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos alterar esta Política de Privacidade periodicamente. Alterações substanciais serão anunciadas por e-mail aos titulares de contas com pelo menos trinta (30) dias de antecedência antes de entrarem em vigor. A versão mais recente está sempre disponível em [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contato",
        "blocks": [
          {
            "kind": "p",
            "text": "Para qualquer dúvida sobre esta política ou seus dados, escreva para [privacy@konvertools.com](mailto:privacy@konvertools.com). Você também pode apresentar uma reclamação à autoridade francesa de proteção de dados (CNIL, [cnil.fr](https://www.cnil.fr/)) ou à autoridade de supervisão do seu país de residência."
          }
        ]
      }
    ]
  },
  "de": {
    "h1": "Datenschutzrichtlinie",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Zuletzt aktualisiert: %DATE% · Sofort gültig für alle Besucher und Kontoinhaber.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Unser Grundprinzip: Wir speichern Ihre Dateien nicht",
        "blocks": [
          {
            "kind": "p",
            "text": "Der **Service** [Konvertools](https://konvertools.com) wird als datenschutzorientiertes Toolkit betrieben. Die wichtigste Verpflichtung, die wir eingehen, lautet:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-basierte Tools** (Bildkonverter, PDF-Tools, die pdf-lib nutzen, Audio- und Videokonvertierungen, die von FFmpeg.wasm betrieben werden, Code-Tools, Rechner, QR-Generatoren, der Passwort-Breach-Checker sowie die meisten Utilities) laufen **ausschließlich in Ihrem Webbrowser über WebAssembly**. Ihre Datei oder Eingabe wird niemals an unsere Server übertragen. Wir haben keine technischen Möglichkeiten, sie zu lesen.",
              "**Servergestützte Tools** (KI-Transkription, KI-Übersetzung, KI-Textaufgaben, Einbrennen von Untertiteln in Videos, der URL-Scanner, der Phishing-Detektor, der SSL-Zertifikatsprüfer sowie einige andere) müssen etwas an ein Backend senden. In jedem Fall wird die Datei oder der Text in Echtzeit verarbeitet und innerhalb von dreißig (30) Minuten aus dem temporären Speicher gelöscht.",
              "Wir speichern niemals den Inhalt hochgeladener Dateien an einer persistenten Stelle, wir nutzen Ihre Uploads nicht zur Schulung von KI-Modellen und wir verkaufen, vermieten oder teilen sie nicht mit Dritten zu einem anderen Zweck als der Bereitstellung des von Ihnen angeforderten Ergebnisses."
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
            "text": "Für die Zwecke der **EU-Datenschutz-Grundverordnung (Verordnung (EU) 2016/679, „GDPR“)** ist der für die Datenverarbeitung Verantwortliche der Herausgeber des **Service**. Kontakt für Datenschutzanfragen: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Kontoanmeldedaten**: Ihre E-Mail-Adresse; eine gesalzene, gehashte Kopie Ihres Passworts (verwaltet durch Supabase Auth — wir sehen oder speichern das Klartextpasswort niemals); optional Anzeigename und Avatar-URL, falls Sie sich mit Google anmelden.",
              "**Abonnementstatus**: aktueller Tarif (kostenlos / Pro / Business), Stripe-Kundenkennung, aktueller Guthabenstand sowie die Daten Ihrer letzten Verlängerung.",
              "**Nutzungskennzahlen**: aggregierte Kontingentzähler (z. B. „3 KI-Läufe heute genutzt“, „420 monatliche KI-Läufe genutzt“), die in Ihrer Profilzeile aktualisiert werden. Wir führen **keine pro-Lauf-Protokolle**.",
              "**Job-Metadaten (flüchtig)**: Wenn ein servergestütztes Tool ein Ergebnis erzeugt (z. B. eine .srt-Datei aus einer Transkription), speichern wir den Tool-Namen, die Download-URL des Ergebnisses, die Quellsprache und einen Abschlusszeitstempel. Diese Zeilen werden automatisch nach **zwei (2) Stunden** gelöscht. Sie enthalten niemals den Inhalt Ihrer Datei.",
              "**Einwilligungsprotokolle**: Datum und Uhrzeit, zu der Sie diese Nutzungsbedingungen und unsere Datenschutzrichtlinie akzeptiert haben, sowie ob Sie in Marketing-E-Mails eingewilligt haben. Werden für die Dauer Ihres Kontos plus einen rechtlichen Nachweisszeitraum von fünf (5) Jahren nach Löschung gespeichert.",
              "**API-Schlüssel**: Falls Sie Schlüssel für die öffentliche REST-API generieren, speichern wir nur den SHA-256-Hash und eine 12-stellige Anzeigepräfix. Der Rohschlüssel wird Ihnen genau einmal bei der Erstellung angezeigt und ist danach nicht mehr wiederherstellbar."
            ]
          },
          {
            "kind": "p",
            "text": "Wir erheben **keine** Daten zu: Ihrer IP-Adresse (über den temporären Einsatz hinaus, den Supabase und unser Hosting-Anbieter für Ratenbegrenzung und Sicherheitsprotokollierung vornehmen), Ihrem Browser-Fingerprint, verhaltensbasierten Tracking-Ereignissen, Bildschirmaufzeichnungen oder biometrischen Daten."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Dateien, die Sie verarbeiten",
        "blocks": [
          {
            "kind": "p",
            "text": "Wie in Abschnitt 1 dargelegt, werden die Inhalte der von Ihnen verarbeiteten Dateien von uns nicht gespeichert. Der genaue Lebenszyklus ist:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-basierte Tools**: keine Übertragung. Die Datei wird von Ihrem Browser in den Speicher gelesen, das Ergebnis wird lokal erzeugt und Sie laden es direkt herunter. Wir protokollieren nichts über die Datei selbst.",
              "**KI-Transkription / -Übersetzung / -OCR / Phishing-Analyse**: Die Datei oder der Text wird an unsere Supabase Edge Function gestreamt, die sie umgehend an den jeweiligen KI-Anbieter (siehe Abschnitt 7) zur Inferenz weiterleitet. Das Ergebnis wird an Sie zurückgegeben und der temporäre Upload-Puffer wird verworfen. Ergebnisdaten, die in unserem privaten Speicher-Bucket geschrieben werden, sind für sechzig (60) Minuten über signierte URLs für Sie zugänglich und werden innerhalb von dreißig (30) Minuten nach Erstellung physisch gelöscht.",
              "**Passwort-Breach-Checker**: Ihr Passwort verlässt niemals Ihren Browser. Wir hashen es lokal mit SHA-1 und fragen HaveIBeenPwned mit k-Anonymität ab — es werden nur die ersten 5 Zeichen des Hashs gesendet. Das Passwort und der vollständige Hash werden niemals übertragen.",
              "**URL-Scanner / SSL-Prüfer**: Es wird nur die von Ihnen eingegebene URL oder der Hostname übertragen (an Google Safe Browsing für den URL-Scanner oder zur Herstellung einer TLS-Verbindung für den SSL-Prüfer). Keine umliegenden Seitinhalte."
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
              "**Vertragserfüllung** (Art. 6(1)(b)) — Wenn Sie ein Konto erstellen und kostenpflichtige Funktionen nutzen, ist die Verarbeitung zur Erbringung des **Service** erforderlich.",
              "**Berechtigtes Interesse** (Art. 6(1)(f)) — Betrugsprävention, Missbrauchsbekämpfung, grundlegende Sicherheitsprotokollierung und Verbesserung des **Service**.",
              "**Einwilligung** (Art. 6(1)(a)) — Marketing-E-Mails, optionale Analysen oder Werbe-Cookies (falls und sobald aktiviert) sowie zukünftige optionale Integrationen.",
              "**Rechtliche Verpflichtung** (Art. 6(1)(c)) — Aufbewahrung von Abrechnungsunterlagen gemäß französischer Steuergesetzgebung (in der Regel zehn Jahre)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Ihre Rechte",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie haben die Rechte auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und den Widerruf Ihrer Einwilligung zu jedem Zeitpunkt, ohne dass die Rechtmäßigkeit der vorherigen Verarbeitung beeinträchtigt wird. Sie haben zudem das Recht, sich bei der CNIL (Frankreich) oder der für Sie zuständigen Aufsichtsbehörde zu beschweren. Um eines dieser Rechte auszuüben, senden Sie eine E-Mail an [privacy@konvertools.com](mailto:privacy@konvertools.com) von der auf Ihrem Konto registrierten Adresse. Wir werden innerhalb von dreißig (30) Tagen antworten, wie in GDPR Art. 12(3) vorgeschrieben."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Externe Dienstleister",
        "blocks": [
          {
            "kind": "p",
            "text": "Für die Bereitstellung des **Service** müssen wir streng begrenzte Daten mit den folgenden Dienstleistern teilen. Jeder von ihnen verfügt über eine eigene Datenschutzrichtlinie, die regelt, wie sie die von uns erhaltenen Daten behandeln."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (in Singapur gegründet, für unser Projekt in der EU gehostet) — Authentifizierung, Datenbank, Dateispeicher und Edge Functions. Erhält Ihre Kontodaten, Profildaten und (flüchtig) jede Datei, die Sie für ein servergestütztes Tool hochladen. Agiert als unser Unterauftragsverarbeiter.",
              "**Mistral AI** (Frankreich) — Inferenz mit großen Sprachmodellen für Übersetzung, Umschreibung, Zusammenfassung, den KI-Humanizer, Phishing-Musteranalyse und andere Textaufgaben; Audio-Transkription (Voxtral); Bild-OCR und Vision-Aufgaben (Pixtral). Der von Ihnen übermittelte Text oder das Bild wird an Mistral zur Inferenz gesendet. Mistral hat vertraglich zugesichert, **keine API-Eingaben** zur Schulung seiner Modelle zu nutzen.",
              "**Google Safe Browsing** (Google LLC, USA) — nur bei Nutzung des URL-Scanners oder des Phishing-Detektors. Es werden nur die von Ihnen eingegebenen URLs (oder aus der von Ihnen eingefügten E-Mail extrahierten Links) übertragen. Dies ist der einzige von uns genutzte Drittanbieter-Dienst im Bereich Sicherheit.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — nur bei Nutzung des Passwort-Breach-Checkers und nur die ersten 5 Zeichen des SHA-1-Hashs Ihres Passworts (k-Anonymität). Die Abfrage erfolgt direkt aus Ihrem Browser, nicht über unsere Server.",
              "**Stripe** (USA / Irland) — Zahlungsabwicklung und Abonnementverwaltung. Wir **sehen oder speichern Ihre Kartendaten niemals**. Stripe erhält Ihre E-Mail-Adresse, Zahlungsmethode und den von Ihnen gekauften Tarif/Guthaben.",
              "**Resend** (USA) — Zustellung transaktionaler E-Mails (Kontobestätigung, Zahlungsbestätigung, Passwortzurücksetzung). Erhält Ihre E-Mail-Adresse und den von uns gesendeten E-Mail-Text.",
              "**Vercel** (USA) — Content Delivery Network für statische Seiten. Erhält Standard-Web-Traffic-Metadaten (IP, User-Agent, angeforderte URL) zur Routing- und Missbrauchsprävention. Werden gemäß der Protokollaufbewahrungsrichtlinie von Vercel gespeichert."
            ]
          },
          {
            "kind": "p",
            "text": "Falls einer dieser Dienstleister außerhalb des Europäischen Wirtschaftsraums tätig ist, unterliegen die Datenübermittlungen den Standardvertragsklauseln (SCCs) der Europäischen Kommission oder einem gleichwertigen Mechanismus."
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
              "**Notwendig**: NEXT_LOCALE (speichert Ihre gewählte Sprache) und Supabase-Sitzungscookies (sb-*-auth-token) bei angemeldeten Benutzern. Diese erfordern keine Einwilligung gemäß GDPR.",
              "**Optional Werbung**: Falls und sobald wir Werbepartner aktivieren (derzeit ist Ezoic in unserem Code referenziert, aber noch nicht für Ihren Traffic aktiviert), zeigen wir einen klaren Einwilligungsbanner und setzen Werbe-Cookies erst nach Ihrer Zustimmung."
            ]
          },
          {
            "kind": "p",
            "text": "Wir führen derzeit keine Analysen, Tracking-Pixel oder Remarketing-Tags durch. Falls wir solche hinzufügen, wird der oben genannte Cookie-Banner diese steuern."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Sicherheit",
        "blocks": [
          {
            "kind": "p",
            "text": "Der gesamte Datenverkehr zum und vom **Service** ist mit TLS 1.2 oder höher verschlüsselt. Passwörter werden von Supabase Auth als Argon2-Hashes gespeichert. Wir prüfen neue Passwörter clientseitig über die öffentliche HaveIBeenPwned-k-Anonymität-API, sodass ein bekannt kompromittiertes Passwort nicht verwendet werden kann. API-Schlüssel werden nur als SHA-256-Hashes gespeichert. Datenbankzeilen sind durch Row-Level-Security-Policies geschützt, die sicherstellen, dass ein Benutzer keine Daten eines anderen Benutzers lesen kann. Trotz dieser Maßnahmen ist kein System perfekt sicher; Sie akzeptieren das verbleibende Risiko, das mit jedem Online-Service verbunden ist."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Aufbewahrung",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profildaten: werden während der Existenz Ihres Kontos gespeichert und innerhalb von dreißig (30) Tagen nach Kontoschließung gelöscht.",
              "Job-Metadaten: werden automatisch nach zwei (2) Stunden gelöscht.",
              "Ergebnisdateien im Speicher-Bucket: werden innerhalb von dreißig (30) Minuten nach Erstellung physisch gelöscht.",
              "Abrechnungsunterlagen: werden zehn (10) Jahre lang aufbewahrt, um französischen Steuerpflichten zu entsprechen.",
              "Einwilligungsprotokolle: werden für die Dauer Ihres Kontos plus fünf (5) Jahre danach als rechtlicher Nachweis gespeichert."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Minderjährige",
        "blocks": [
          {
            "kind": "p",
            "text": "Der **Service** richtet sich **nicht an Kinder unter sechzehn (16) Jahren**. Wenn Sie jünger sind, dürfen Sie kein Konto erstellen. Wir erheben keine Daten von Minderjährigen wissentlich; falls wir davon Kenntnis erlangen, werden wir die Daten löschen."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Änderungen dieser Richtlinie",
        "blocks": [
          {
            "kind": "p",
            "text": "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit ändern. Wesentliche Änderungen werden Kontoinhabern mindestens dreißig (30) Tage vor Inkrafttreten per E-Mail angekündigt. Die jeweils aktuelle Version ist stets unter [https://konvertools.com/privacy](https://konvertools.com/privacy) verfügbar."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "Bei Fragen zu dieser Richtlinie oder Ihren Daten schreiben Sie an [privacy@konvertools.com](mailto:privacy@konvertools.com). Sie können sich auch bei der französischen Datenschutzbehörde (CNIL, [cnil.fr](https://www.cnil.fr/)) oder der für Ihren Wohnsitz zuständigen Aufsichtsbehörde beschweren."
          }
        ]
      }
    ]
  },
  "it": {
    "h1": "Politica sulla privacy",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ultimo aggiornamento: %DATE% · Efficace immediatamente per tutti i visitatori e gli utenti registrati.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Il nostro principio fondamentale: non conserviamo i tuoi file",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (il \"Servizio\") viene gestito come una suite di strumenti incentrata sulla privacy. L'impegno più importante che prendiamo è questo:"
          },
          {
            "kind": "ul",
            "items": [
              "**Strumenti esclusivamente basati sul browser** (convertitori di immagini, strumenti PDF che utilizzano pdf-lib, conversioni audio e video tramite FFmpeg.wasm, strumenti per il codice, calcolatrici, generatori di codici QR, il controllo delle violazioni delle password, la maggior parte delle utility) vengono eseguiti **completamente all'interno del tuo browser web tramite WebAssembly**. Il tuo file o l'input non vengono mai trasmessi ai nostri server. Non abbiamo mezzi tecnici per leggerli.",
              "**Strumenti assistiti dal server** (trascrizione AI, traduzione AI, attività testuali AI, sottotitoli video bruciati, lo scanner di URL, il rilevatore di phishing, il controllo dei certificati SSL e alcuni altri) devono inviare qualcosa a un backend. In ogni caso, il file o il testo viene elaborato in tempo reale e cancellato dalla memoria temporanea entro trenta (30) minuti.",
              "Non conserviamo mai il contenuto di alcun file caricato in una posizione persistente, non utilizziamo i tuoi file per addestrare modelli AI e non li vendiamo, affittiamo o condividiamo con terze parti per alcun fine diverso dalla fornitura del risultato da te richiesto."
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
            "text": "Ai fini del Regolamento generale sulla protezione dei dati dell'UE (Regolamento (UE) 2016/679, \"GDPR\"), il titolare del trattamento dei dati è l'editore del Servizio. Per qualsiasi richiesta in materia di privacy: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Cosa raccogliamo",
        "blocks": [
          {
            "kind": "p",
            "text": "I soli dati personali che persistiamo nel nostro database sono:"
          },
          {
            "kind": "ul",
            "items": [
              "**Credenziali di accesso**: il tuo indirizzo email; una copia salata e crittografata della tua password (gestita da Supabase Auth — non vediamo né memorizziamo mai il testo in chiaro); un nome visualizzato e un URL dell'avatar opzionali se ti registri con Google.",
              "**Stato dell'abbonamento**: piano attuale (gratuito / Pro / Business), identificatore cliente di Stripe, saldo crediti attuale e le date dei tuoi rinnovi più recenti.",
              "**Contatori di utilizzo**: contatori aggregati di quota (ad esempio, \"3 esecuzioni AI utilizzate oggi\", \"420 esecuzioni AI mensili utilizzate\") aggiornati direttamente sulla riga del tuo profilo. Non registriamo **mai** dati per ogni singola esecuzione.",
              "**Metadati delle attività (transitori)**: quando uno strumento assistito dal server produce un output (ad esempio, un file .srt dalla trascrizione), registriamo il nome dello strumento, l'URL di download del risultato, la lingua di origine e un timestamp di completamento. Queste righe vengono eliminate automaticamente dopo **due (2) ore**. Non contengono mai il contenuto dei tuoi file.",
              "**Registri del consenso**: la data e l'ora in cui hai accettato questi Termini e la nostra Politica sulla privacy, nonché se hai scelto di ricevere email di marketing. Conservati per la durata del tuo account più un periodo di prova legale di cinque (5) anni dopo la cancellazione.",
              "**Chiavi API**: se generi chiavi per la REST API pubblica, memorizziamo solo l'hash SHA-256 e un prefisso di visualizzazione di 12 caratteri. La chiave grezza ti viene mostrata esattamente una volta al momento della creazione e non è più recuperabile in seguito."
            ]
          },
          {
            "kind": "p",
            "text": "Non raccogliamo: il tuo indirizzo IP (oltre all'uso temporaneo che Supabase e il nostro provider di hosting ne fanno per il controllo delle tariffe e la registrazione delle attività di sicurezza), l'impronta digitale del browser, eventi di tracciamento comportamentale, le tue registrazioni dello schermo o qualsiasi dato biometrico."
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
              "**Strumenti esclusivamente basati sul browser**: nessuna trasmissione. Il file viene letto in memoria dal tuo browser, il risultato viene prodotto localmente e lo scarichi direttamente. Non registriamo nulla riguardo al file stesso.",
              "**Trascrizione / traduzione / OCR / analisi phishing AI**: il file o il testo viene trasmesso in streaming alla nostra funzione Edge di Supabase, che lo inoltra immediatamente al provider AI pertinente (vedi sezione 7) per l'inferenza. Il risultato viene restituito a te e il buffer di caricamento temporaneo viene scartato. I file di risultato scritti nel nostro bucket di archiviazione privata sono accessibili tramite URL firmato per sessanta (60) minuti e fisicamente eliminati entro trenta (30) minuti dalla generazione.",
              "**Controllo delle violazioni delle password**: la tua password non lascia mai il browser. La crittografiamo localmente con SHA-1 e interroghiamo HaveIBeenPwned utilizzando la k-anonimità — vengono inviati solo i primi 5 caratteri dell'hash. La password e l'hash completo non vengono mai trasmessi.",
              "**Scanner di URL / controllo SSL**: viene trasmesso solo l'URL o il nome host che digiti (a Google Safe Browsing per lo scanner di URL o utilizzato per aprire una connessione TLS live per il controllo SSL). Nessun contenuto circostante della pagina."
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
              "**Esecuzione di un contratto** (Art. 6(1)(b)) — quando crei un account e utilizzi funzionalità a pagamento, il trattamento è necessario per fornire il Servizio.",
              "**Legittimo interesse** (Art. 6(1)(f)) — prevenzione delle frodi, mitigazione degli abusi, registrazione di base delle attività di sicurezza e miglioramento del Servizio.",
              "**Consenso** (Art. 6(1)(a)) — email di marketing, cookie facoltativi per l'analisi o la pubblicità (se e quando abilitati) e qualsiasi futura integrazione facoltativa.",
              "**Obbligo legale** (Art. 6(1)(c)) — conservazione dei registri contabili come richiesto dalla legge fiscale francese (tipicamente dieci anni)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. I tuoi diritti",
        "blocks": [
          {
            "kind": "p",
            "text": "Hai i diritti di accesso (Art. 15), rettifica (Art. 16), cancellazione (Art. 17), limitazione (Art. 18), portabilità (Art. 20), opposizione (Art. 21) e di revocare il consenso in qualsiasi momento senza pregiudicare la liceità dei trattamenti precedenti. Hai anche il diritto di presentare reclamo alla CNIL (Francia) o all'autorità di controllo del tuo paese di residenza. Per esercitare qualsiasi diritto, invia un'email a [privacy@konvertools.com](mailto:privacy@konvertools.com) dall'indirizzo registrato sul tuo account. Risponderemo entro trenta (30) giorni, come richiesto dall'Art. 12(3) GDPR."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Processori di terze parti",
        "blocks": [
          {
            "kind": "p",
            "text": "Per fornire il Servizio, dobbiamo condividere dati strettamente limitati con i seguenti processori. Ognuno ha una propria politica sulla privacy che disciplina come gestiscono i dati che ricevono da noi."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (società costituita a Singapore, ospitata nell'UE per il nostro progetto) — autenticazione, database, archiviazione file e funzioni Edge. Riceve le tue credenziali di accesso, i dati del profilo e (transitoriamente) qualsiasi file che carichi per uno strumento assistito dal server. Agisce come nostro sub-processore.",
              "**Mistral AI** (Francia) — inferenza di modelli linguistici di grandi dimensioni per traduzione, riformulazione, sintesi, l'umanizzazione AI, analisi dei pattern di phishing e altre attività testuali; trascrizione audio (Voxtral); OCR e attività di visione delle immagini (Pixtral). Il testo o l'immagine che invii vengono inviati a Mistral per l'inferenza. Mistral si è impegnata contrattualmente a **non utilizzare gli input API per addestrare i propri modelli**.",
              "**Google Safe Browsing** (Google LLC, USA) — solo quando utilizzi lo Scanner di URL o il Rilevatore di Phishing. Vengono trasmessi solo gli URL che inserisci (o i link estratti dall'email che incolli). Questo è l'unico servizio di sicurezza di terze parti che utilizziamo.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — solo quando utilizzi il Controllo delle violazioni delle password e solo i primi 5 caratteri dell'hash SHA-1 della tua password (k-anonimità). Interrogato direttamente dal tuo browser, non tramite i nostri server.",
              "**Stripe** (USA / Irlanda) — elaborazione dei pagamenti e gestione degli abbonamenti. **Non vediamo né memorizziamo mai** i dettagli della tua carta. Stripe riceve il tuo indirizzo email, il metodo di pagamento e il piano/pacchetto di crediti acquistato.",
              "**Resend** (USA) — consegna di email transazionali (conferma dell'account, ricevute di pagamento, reset della password). Riceve il tuo indirizzo email e il corpo dell'email che inviamo.",
              "**Vercel** (USA) — rete per la distribuzione di contenuti per le pagine statiche. Riceve metadati standard del traffico web (IP, user-agent, URL richiesto) per l'instradamento e la prevenzione degli abusi. Conservati in conformità con la politica di conservazione dei log di Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Laddove uno di questi processori opera al di fuori dello Spazio Economico Europeo, i trasferimenti sono regolati dalle Clausole Contrattuali Standard (SCC) della Commissione Europea o da un meccanismo di trasferimento equivalente."
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
              "**Essenziali**: NEXT_LOCALE (ricorda la lingua scelta) e i cookie di sessione di Supabase (sb-*-auth-token) quando sei registrato. Questi non richiedono il consenso ai sensi del GDPR.",
              "**Pubblicità facoltativa**: se e quando abilitiamo partner pubblicitari (attualmente Ezoic è referenziato nel nostro codice ma non ancora attivato per il tuo traffico), mostreremo un banner di consenso chiaro e imposteremo i cookie pubblicitari solo dopo che avrai scelto di acconsentire."
            ]
          },
          {
            "kind": "p",
            "text": "Attualmente non eseguiamo analisi, pixel di tracciamento o tag di remarketing. Se ne aggiungiamo, il banner dei cookie sopra li bloccherà."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Sicurezza",
        "blocks": [
          {
            "kind": "p",
            "text": "Tutto il traffico verso e dal Servizio è crittografato con TLS 1.2 o versioni successive. Le password vengono memorizzate come hash Argon2 da Supabase Auth. Controlliamo le nuove password tramite l'API pubblica k-anonimità di HaveIBeenPwned lato client, quindi non può essere utilizzata una password nota per essere stata violata. Le chiavi API vengono memorizzate solo come hash SHA-256. Le righe del database sono protette da politiche di sicurezza a livello di riga che garantiscono che un utente non possa leggere i dati di un altro utente. Nonostante queste misure, nessun sistema è perfettamente sicuro; accetti il rischio residuo insito in qualsiasi servizio online."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Conservazione",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dati del profilo: conservati finché esiste il tuo account, eliminati entro trenta (30) giorni dalla chiusura dell'account.",
              "Metadati delle attività: eliminati automaticamente dopo due (2) ore.",
              "File di risultato nel bucket di archiviazione: fisicamente eliminati entro trenta (30) minuti dalla generazione.",
              "Registri contabili: conservati per dieci (10) anni per conformarsi agli obblighi fiscali francesi.",
              "Registri del consenso: conservati per la durata del tuo account più cinque (5) anni successivi come prova legale."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Minori",
        "blocks": [
          {
            "kind": "p",
            "text": "Il Servizio **non è rivolto a bambini sotto i sedici (16) anni**. Se hai meno di quell'età non devi creare un account. Non raccogliamo consapevolmente dati da minori; se veniamo a conoscenza di averlo fatto, li elimineremo."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Modifiche a questa politica",
        "blocks": [
          {
            "kind": "p",
            "text": "Possiamo modificare questa Politica sulla privacy di volta in volta. Le modifiche sostanziali verranno annunciate tramite email agli utenti registrati almeno trenta (30) giorni prima della loro entrata in vigore. La versione più recente è sempre disponibile all'indirizzo [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contatti",
        "blocks": [
          {
            "kind": "p",
            "text": "Per qualsiasi domanda su questa politica o sui tuoi dati, scrivi a [privacy@konvertools.com](mailto:privacy@konvertools.com). Puoi anche presentare reclamo alla CNIL (Francia) ([cnil.fr](https://www.cnil.fr/)) o all'autorità di controllo del tuo paese di residenza."
          }
        ]
      }
    ]
  },
  "nl": {
    "h1": "Privacybeleid",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Laatst bijgewerkt: %DATE% · Direct van kracht voor alle bezoekers en houders van een account.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Ons kernprincipe: we houden uw bestanden niet vast",
        "blocks": [
          {
            "kind": "p",
            "text": "De service **Konvertools** (de \"Service\") wordt geëxploiteerd als een privacy-first toolkit. De belangrijkste belofte die we maken is deze:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tools die alleen in de browser werken** (afbeeldingsconverters, PDF-tools die gebruikmaken van pdf-lib, audio- en videoconversies aangedreven door FFmpeg.wasm, code-tools, rekenmachines, QR-generators, de wachtwoordbreukcontrole, de meeste utilities) worden **volledig binnen uw webbrowser uitgevoerd via WebAssembly**. Uw bestand of invoer wordt nooit naar onze servers verzonden. We hebben geen technische middelen om het te lezen.",
              "**Serverondersteunde tools** (AI-transcriptie, AI-vertaling, AI-teksttaken, het inbranden van ondertitels in video's, de URL-scanner, de phishingdetector, de SSL-certificaatcontrole en een klein aantal andere) moeten iets naar een backend verzenden. In elk geval wordt het bestand of de tekst in realtime verwerkt en binnen dertig (30) minuten verwijderd uit tijdelijke opslag.",
              "We slaan de inhoud van geen enkel geüpload bestand op in een persistentie locatie, we gebruiken uw uploads niet om AI-modellen te trainen en we verkopen, verhuren of delen ze niet met derden voor enig ander doel dan het leveren van het resultaat dat u heeft aangevraagd."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Gegevensverantwoordelijke",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor de toepassing van de Algemene verordening gegevensbescherming (Verordening (EU) 2016/679, \"GDPR\") is de gegevensverantwoordelijke de uitgever van de Service. Contact voor vragen over privacy: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Welke gegevens wij verzamelen",
        "blocks": [
          {
            "kind": "p",
            "text": "De enige persoonsgegevens die we in onze database opslaan zijn:"
          },
          {
            "kind": "ul",
            "items": [
              "**Accountgegevens**: uw e-mailadres; een gezouten, gehashte kopie van uw wachtwoord (beheerd door Supabase Auth — wij zien of slaan de platte tekst nooit op); optionele weergavenaam en avatar-URL als u zich aanmeldt met Google.",
              "**Abonnementstatus**: huidig abonnement (gratis / Pro / Business), Stripe-klantidentificatie, huidige tegoedbalans en de data van uw meest recente verlengingen.",
              "**Gebruikscounters**: samengevoegde quota-counters (bijv. \"3 AI-runs gebruikt vandaag\", \"420 maandelijkse AI-runs gebruikt\") die ter plekke worden bijgewerkt op uw profielrij. We loggen **geen** per-runrecords.",
              "**Jobmetadata (tijdelijk)**: wanneer een serverondersteunde tool een resultaat produceert (bijv. een .srt-bestand van transcriptie), registreren we de naam van de tool, de download-URL van het resultaat, de bron taal en een voltooiingstijdstempel. Deze rijen worden automatisch gewist na **twee (2) uur**. Ze bevatten nooit de inhoud van uw bestand.",
              "**Toestemmingsrecords**: de datum en tijd waarop u deze voorwaarden en ons privacybeleid heeft geaccepteerd, en of u heeft ingestemd met marketingmails. Blijven bewaard voor de duur van uw account plus een wettelijk bewijsperiode van vijf (5) jaar na verwijdering.",
              "**API-sleutels**: als u sleutels genereert voor de openbare REST API, slaan we alleen de SHA-256-hash en een 12-tekens weergavevoorvoegsel op. De originele sleutel wordt u precies één keer getoond bij aanmaak en is daarna niet meer terug te halen."
            ]
          },
          {
            "kind": "p",
            "text": "We verzamelen **niet**: uw IP-adres (behalve het tijdelijke gebruik dat Supabase en onze hostprovider ervan maken voor rate-limiting en beveiligingslogging), uw browserfingerprint, gedragsmatige trackinggebeurtenissen, uw schermopnames of enige biometrische gegevens."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Bestanden die u verwerkt",
        "blocks": [
          {
            "kind": "p",
            "text": "Zoals vermeld in sectie 1 worden de inhoud van bestanden die u verwerkt nooit door ons opgeslagen. De precieze levenscyclus is als volgt:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tools die alleen in de browser werken**: nul transmissie. Het bestand wordt door uw browser in het geheugen gelezen, het resultaat wordt lokaal geproduceerd en u downloadt het direct. We loggen niets over het bestand zelf.",
              "**AI-transcriptie / -vertaling / -OCR / phishinganalyse**: het bestand of de tekst wordt gestreamd naar onze Supabase Edge Function, die het direct doorstuurt naar de relevante AI-aanbieder (zie sectie 7) voor inferentie. Het resultaat wordt aan u teruggegeven en de tijdelijke uploadbuffer wordt verwijderd. Resultatenbestanden die naar onze private opslagbucket worden geschreven, zijn toegankelijk via een gesigneerde URL gedurende zestig (60) minuten en fysiek gewist binnen dertig (30) minuten na generatie.",
              "**Wachtwoordbreukcontrole**: uw wachtwoord verlaat nooit uw browser. We hashen het lokaal met SHA-1 en vragen HaveIBeenPwned op met k-anonimiteit — alleen de eerste 5 tekens van de hash worden verzonden. Het wachtwoord en de volledige hash worden nooit verzonden.",
              "**URL-scanner / SSL-controle**: alleen de URL of hostnaam die u invoert wordt verzonden (naar Google Safe Browsing voor de URL-scanner, of gebruikt om een live TLS-verbinding te openen voor de SSL-controle). Geen inhoud van de omringende pagina."
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
              "**Legitiem belang** (Art. 6(1)(f)) — fraudepreventie, misbruikbeperking, basisbeveiligingslogging en het verbeteren van de Service.",
              "**Toestemming** (Art. 6(1)(a)) — marketingmails, optionele analytics- of advertentiecookies (indien en wanneer ingeschakeld), en elke toekomstige optionele integratie.",
              "**Wettelijke verplichting** (Art. 6(1)(c)) — bewaring van factuurgegevens zoals vereist door Franse belastingwetgeving (doorgaans tien jaar)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Uw rechten",
        "blocks": [
          {
            "kind": "p",
            "text": "U heeft de rechten op toegang (Art. 15), rectificatie (Art. 16), wissen (Art. 17), beperking (Art. 18), overdraagbaarheid (Art. 20), bezwaar (Art. 21) en het intrekken van toestemming op elk moment zonder dat dit de wettigheid van eerdere verwerking beïnvloedt. U heeft ook het recht om een klacht in te dienen bij de CNIL (Frankrijk) of uw lokale toezichthoudende autoriteit. Om een recht uit te oefenen, stuurt u een e-mail naar [privacy@konvertools.com](mailto:privacy@konvertools.com) vanaf het e-mailadres dat geregistreerd staat op uw account. We reageren binnen dertig (30) dagen, zoals vereist door GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Derde partijen die gegevens verwerken",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor het leveren van de Service moeten we strikt beperkte gegevens delen met de volgende verwerkers. Elke partij heeft zijn eigen privacybeleid dat van toepassing is op hoe zij de gegevens die zij van ons ontvangen, behandelen."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (opgericht in Singapore, gehost in de EU voor ons project) — authenticatie, database, bestandsopslag en Edge Functions. Ontvangt uw accountgegevens, profielgegevens en (tijdelijk) elk bestand dat u uploadt voor een serverondersteunde tool. Fungeert als onze subverwerker.",
              "**Mistral AI** (Frankrijk) — inferentie met grote taalmodellen voor vertaling, herformulering, samenvatting, de AI-humanizer, phishingpatroonanalyse en andere teksttaken; audio-transcriptie (Voxtral); afbeeldings-OCR en Vision-taken (Pixtral). De tekst of afbeelding die u indient wordt naar Mistral verzonden voor inferentie. Mistral heeft contractueel toegezegd **geen** API-inputs te gebruiken voor het trainen van haar modellen.",
              "**Google Safe Browsing** (Google LLC, VS) — alleen wanneer u de URL-scanner of de phishingdetector gebruikt. Alleen de URLs die u indient (of links die uit de e-mail worden geëxtraheerd die u plakt) worden verzonden. Dit is de enige derdepartij-beveiligingsservice die we gebruiken.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — alleen wanneer u de wachtwoordbreukcontrole gebruikt, en alleen de eerste 5 tekens van de SHA-1-hash van uw wachtwoord (k-anonimiteit). Rechtstreeks vanuit uw browser opgevraagd, niet via onze servers.",
              "**Stripe** (VS / Ierland) — verwerking van betalingen en abonnementbeheer. We **zien of slaan uw kaartgegevens nooit op**. Stripe ontvangt uw e-mailadres, betaalmethode en het abonnement/tegoed dat u heeft gekocht.",
              "**Resend** (VS) — levering van transactie-e-mails (accountbevestiging, betalingsbewijs, wachtwoordherstel). Ontvangt uw e-mailadres en de e-mailinhoud die we verzenden.",
              "**Vercel** (VS) — content delivery network voor statische pagina's. Ontvangt standaard webverkeer-metadata (IP, user-agent, aangevraagde URL) voor routering en misbruikpreventie. Blijft binnen de logretentiebeleid van Vercel."
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
              "**Essentieel**: NEXT_LOCALE (onthoudt uw gekozen taal) en Supabase sessiecookies (sb-*-auth-token) wanneer u bent ingelogd. Deze vereisen geen toestemming onder GDPR.",
              "**Optioneel voor advertenties**: indien en wanneer we advertentiepartners inschakelen (momenteel wordt Ezoic in onze code vermeld maar nog niet geactiveerd voor uw verkeer), zullen we een duidelijke toestemmingsbanner tonen en alleen advertentiecookies instellen nadat u heeft ingestemd."
            ]
          },
          {
            "kind": "p",
            "text": "We voeren momenteel geen analytics, tracking pixels of remarketing tags uit. Als we er een toevoegen, zal de cookiebanner hierboven deze blokkeren."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Beveiliging",
        "blocks": [
          {
            "kind": "p",
            "text": "Alle verkeer naar en van de Service is versleuteld met TLS 1.2 of hoger. Wachtwoorden worden opgeslagen als Argon2-hashes door Supabase Auth. We controleren nieuwe wachtwoorden tegen de openbare HaveIBeenPwned k-anonimiteit API aan de clientzijde, zodat een bekend gecompromitteerd wachtwoord niet kan worden gebruikt. API-sleutels worden alleen opgeslagen als SHA-256-hashes. Database-rijen worden beschermd door row-level security policies die ervoor zorgen dat één gebruiker de gegevens van een andere gebruiker niet kan lezen. Ondanks deze maatregelen is geen enkel systeem perfect veilig; u accepteert het resterende risico dat inherent is aan elke online dienst."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Bewaring",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profielgegevens: bewaard zolang uw account bestaat, verwijderd binnen dertig (30) dagen na sluiting van het account.",
              "Jobmetadata: automatisch gewist na twee (2) uur.",
              "Resultaatbestanden in de opslagbucket: fysiek verwijderd binnen dertig (30) minuten na generatie.",
              "Factuurgegevens: bewaard gedurende tien (10) jaar om te voldoen aan Franse belastingverplichtingen.",
              "Toestemmingsrecords: bewaard voor de duur van uw account plus vijf (5) jaar daarna als wettelijk bewijs."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Minderjarigen",
        "blocks": [
          {
            "kind": "p",
            "text": "De Service is **niet gericht op kinderen onder de zestien (16) jaar**. Als u jonger bent, mag u geen account aanmaken. We verzamelen niet bewust gegevens van minderjarigen; als we ervan op de hoogte worden gesteld dat we dat wel hebben gedaan, zullen we deze verwijderen."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Wijzigingen in dit beleid",
        "blocks": [
          {
            "kind": "p",
            "text": "We kunnen dit privacybeleid van tijd tot tijd wijzigen. Belangrijke wijzigingen worden minimaal dertig (30) dagen voor inwerkingtreding per e-mail aangekondigd aan houders van accounts. De meest recente versie is altijd beschikbaar op [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contact",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor vragen over dit beleid of uw gegevens kunt u schrijven naar [privacy@konvertools.com](mailto:privacy@konvertools.com). U kunt ook een klacht indienen bij de Franse gegevensbeschermingsautoriteit (CNIL, [cnil.fr](https://www.cnil.fr/)) of bij de toezichthoudende autoriteit van uw land van verblijf."
          }
        ]
      }
    ]
  },
  "ja": {
    "h1": "プライバシーポリシー",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最終更新日: %DATE% · 直ちにすべての訪問者およびアカウント保持者に対して効力を発生します。",
    "sections": [
      {
        "id": "principle",
        "title": "1. 当社の基本原則：お客様のファイルは保持しません",
        "blocks": [
          {
            "kind": "p",
            "text": "**Konvertools** (以下「本サービス」) は、プライバシーを最優先としたツールキットとして運営されています。当社が最も重要な約束とするのは、以下のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**ブラウザ内ツール** (画像変換、pdf-libを使用したPDFツール、FFmpeg.wasmによるオーディオ・ビデオ変換、コードツール、計算機、QRコード生成、パスワード漏洩チェッカー、その他ほとんどのユーティリティ) は、**WebAssemblyを介してお客様のウェブブラウザ内で完全に実行されます**。ファイルや入力内容は当社のサーバーに送信されることはありません。当社にはそれを読み取る技術的手段がありません。",
              "**サーバー支援ツール** (AI文字起こし、AI翻訳、AIテキスト処理、ビデオ字幕焼き込み、URLスキャナー、フィッシング検出器、SSL証明書チェッカーなどの一部のツール) では、バックエンドに何らかのデータを送信する必要があります。いずれの場合も、ファイルやテキストはリアルタイムで処理され、一時的な保存領域から30分以内に削除されます。",
              "当社は、アップロードされたファイルの内容を永続的な場所に保存することはなく、アップロード内容をAIモデルの学習に使用することも、販売、賃貸、第三者との共有を行うこともありません。お客様がリクエストした結果を提供する目的を除き、いかなる目的でも行いません。"
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
            "text": "EU一般データ保護規則（規則(EU) 2016/679、以下「GDPR」）の目的上、データ管理者は本サービスの発行者です。プライバシーに関するお問い合わせ先：[privacy@konvertools.com](mailto:privacy@konvertools.com)。"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 当社が収集するデータ",
        "blocks": [
          {
            "kind": "p",
            "text": "当社のデータベースに永続的に保存される個人データは以下のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**アカウント資格情報**：メールアドレス。パスワードのソルト化・ハッシュ化されたコピー（Supabase Authにより管理されており、平文は当社が見ることも保存することもありません）。Googleでサインインした場合は、任意の表示名とアバターURL。",
              "**サブスクリプション状態**：現在のプラン（無料 / Pro / Business）、Stripe顧客識別子、現在のクレジット残高、直近の更新日。",
              "**使用カウンター**：集約された割り当てカウンター（例：「本日AI実行3回使用済み」、「月間AI実行420回使用済み」など）は、プロファイル行上で更新されます。当社は**実行ごとの記録はログに残しません**。",
              "**ジョブメタデータ（一時的）**：サーバー支援ツールが出力を生成した場合（例：文字起こしによる.srtファイル）、ツール名、結果ダウンロードURL、ソース言語、完了時刻を記録します。これらの行は**2時間**後に自動的に消去されます。ファイルの内容は含まれません。",
              "**同意記録**：本規約および当社のプライバシーポリシーを受諾した日時、ならびにマーケティングメールへのオプトインの有無。アカウント削除後5年間の法的証拠期間を含む、アカウントの存続期間中保持されます。",
              "**APIキー**：REST APIの公開キーを生成した場合、SHA-256ハッシュと12文字の表示プレフィックスのみを保存します。生のキーは作成時に一度だけ表示され、その後回復不能となります。"
            ]
          },
          {
            "kind": "p",
            "text": "当社は以下を収集しません：IPアドレス（Supabaseおよび当社のホスティングプロバイダーがレート制限およびセキュリティログのために一時的に使用する場合を除く）、ブラウザフィンガープリント、行動追跡イベント、画面録画、生体認証データ。"
          }
        ]
      },
      {
        "id": "files",
        "title": "4. 処理されるファイル",
        "blocks": [
          {
            "kind": "p",
            "text": "第1項で述べたとおり、処理されるファイルの内容は当社によって永続的に保持されることはありません。正確なライフサイクルは以下のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**ブラウザ内ツール**：一切の送信なし。ファイルはブラウザによってメモリに読み込まれ、結果はローカルで生成され、お客様が直接ダウンロードします。ファイル自体に関するログは記録されません。",
              "**AI文字起こし / 翻訳 / OCR / フィッシング分析**：ファイルまたはテキストはSupabase Edge Functionにストリーミングされ、直ちに関連するAIプロバイダー（第7項を参照）に転送されて推論が行われます。結果はお客様に返され、一時的なアップロードバッファは破棄されます。プライベートストレージバケットに書き込まれた結果ファイルは、60分間署名付きURLでアクセス可能であり、生成から30分以内に物理的に消去されます。",
              "**パスワード漏洩チェッカー**：パスワードはブラウザから一切送信されません。SHA-1でローカルにハッシュ化され、k-匿名性を用いてHaveIBeenPwnedに照会されます。ハッシュの先頭5文字のみが送信されます。パスワードおよび完全なハッシュは送信されません。",
              "**URLスキャナー / SSLチェッカー**：入力されたURLまたはホスト名のみが送信されます（URLスキャナーの場合はGoogle Safe Browsing、SSLチェッカーの場合はライブTLS接続を開くため）。周辺のページ内容は送信されません。"
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
              "**契約の履行**（Art. 6(1)(b)） — アカウントを作成し有料機能を使用する場合、処理はサービスの提供に必要です。",
              "**正当な利益**（Art. 6(1)(f)） — 不正行為の防止、悪用の抑止、基本的なセキュリティログ、サービスの改善。",
              "**同意**（Art. 6(1)(a)） — マーケティングメール、任意の分析または広告Cookie（有効化された場合）、将来の任意の統合。",
              "**法的義務**（Art. 6(1)(c)） — フランスの税法（通常10年間）に基づく請求記録の保持。"
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. お客様の権利",
        "blocks": [
          {
            "kind": "p",
            "text": "お客様には、アクセス権（Art. 15）、訂正権（Art. 16）、消去権（Art. 17）、処理制限権（Art. 18）、移植権（Art. 20）、異議申し立て権（Art. 21）、ならびに同意の撤回権があります。同意の撤回は、それ以前の処理の合法性に影響を与えるものではありません。また、フランスのデータ保護当局（CNIL）またはお客様の居住国の監督機関に苦情を申し立てる権利もあります。権利を行使するには、アカウントに登録されたメールアドレスから[privacy@konvertools.com](mailto:privacy@konvertools.com)にメールを送信してください。GDPR Art. 12(3)に基づき、30日以内に回答します。"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 第三者プロセッサ",
        "blocks": [
          {
            "kind": "p",
            "text": "サービスの提供には、以下のプロセッサとの厳格に限定されたデータ共有が必要です。各プロセッサには独自のプライバシーポリシーがあり、当社から受領したデータの取り扱い方法を規定しています。"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase**（シンガポール法人、当社プロジェクトではEU内でホスティング） — 認証、データベース、ファイルストレージ、Edge Functions。アカウント資格情報、プロファイルデータ、ならびにサーバー支援ツールでアップロードされたファイル（一時的）を受領します。当社のサブプロセッサとして機能します。",
              "**Mistral AI**（フランス） — 翻訳、言い換え、要約、AIヒューマナイザー、フィッシングパターン分析、その他テキスト処理、音声文字起こし（Voxtral）、画像OCRおよびVisionタスク（Pixtral）のための大規模言語モデル推論。送信されたテキストまたは画像はMistralに推論のために送信されます。Mistralは契約上、API入力をモデルの学習に使用しないことを約束しています。",
              "**Google Safe Browsing**（Google LLC、米国） — URLスキャナーまたはフィッシング検出器を使用する場合のみ。送信されるのはお客様が入力したURL（またはメールに貼り付けたリンク）のみです。当社が使用する唯一の第三者セキュリティサービスです。",
              "**HaveIBeenPwned**（Have I Been Pwned LLC） — パスワード漏洩チェッカーを使用する場合のみ、パスワードのSHA-1ハッシュの先頭5文字（k-匿名性）のみが送信されます。ブラウザから直接照会され、当社のサーバーを経由しません。",
              "**Stripe**（米国 / アイルランド） — 決済処理およびサブスクリプション管理。当社は**カード情報を一切見ることも保存することもありません**。Stripeはメールアドレス、支払い方法、購入したプラン/クレジットパックを受領します。",
              "**Resend**（米国） — トランザクションメール配信（アカウント確認、支払い領収書、パスワードリセット）。メールアドレスおよび当社が送信するメール本文を受領します。",
              "**Vercel**（米国） — 静的ページのコンテンツデリバリーネットワーク。ルーティングおよび悪用防止のために、標準的なウェブトラフィックメタデータ（IP、ユーザーエージェント、リクエストURL）を受領します。Vercelのログ保持ポリシーに従って保持されます。"
            ]
          },
          {
            "kind": "p",
            "text": "これらのプロセッサのうち、欧州経済領域外で運営されるものは、欧州委員会の標準契約条項（SCCs）または同等の移転メカニズムによって移転が規制されています。"
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
              "**任意の広告**：当社が広告パートナー（現在コード内でEzoicが参照されていますが、お客様のトラフィックにはまだ有効化されていません）を有効化する場合、明確な同意バナーを表示し、オプトイン後にのみ広告Cookieを設定します。"
            ]
          },
          {
            "kind": "p",
            "text": "現在、当社はアナリティクス、トラッキングピクセル、リマーケティングタグを実行していません。今後追加する場合は、上記のCookieバナーで制御します。"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. セキュリティ",
        "blocks": [
          {
            "kind": "p",
            "text": "本サービスへのすべてのトラフィックはTLS 1.2以上で暗号化されています。パスワードはSupabase AuthによりArgon2ハッシュとして保存されます。新しいパスワードは、クライアント側でHaveIBeenPwnedのk-匿名性APIを使用してチェックされるため、既知の漏洩パスワードは使用できません。APIキーはSHA-256ハッシュとしてのみ保存されます。データベース行は行レベルセキュリティポリシーによって保護されており、ユーザーは他のユーザーのデータを読み取ることができません。これらの対策にもかかわらず、完全に安全なシステムは存在しません。お客様は、あらゆるオンラインサービスに固有の残存リスクを受け入れるものとします。"
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. 保持期間",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "プロファイルデータ：アカウントが存在する間保持され、アカウント削除から30日以内に削除されます。",
              "ジョブメタデータ：2時間後に自動的に消去されます。",
              "ストレージバケット内の結果ファイル：生成から30分以内に物理的に削除されます。",
              "請求記録：フランスの税務義務を遵守するために10年間保持されます。",
              "同意記録：アカウントの存続期間中およびその後5年間、法的証拠として保持されます。"
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. 未成年者",
        "blocks": [
          {
            "kind": "p",
            "text": "本サービスは**16歳未満の児童を対象としていません**。16歳未満の場合はアカウントを作成できません。当社は故意に未成年者のデータを収集することはありません。万一収集した場合は削除します。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. 本ポリシーの変更",
        "blocks": [
          {
            "kind": "p",
            "text": "当社は随時本プライバシーポリシーを改定する場合があります。実質的な変更については、効力発生日30日前までにアカウント保持者にメールで通知します。最新版は常に[https://konvertools.com/privacy](https://konvertools.com/privacy)でご確認いただけます。"
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. お問い合わせ",
        "blocks": [
          {
            "kind": "p",
            "text": "本ポリシーまたはお客様のデータに関するご質問は、[privacy@konvertools.com](mailto:privacy@konvertools.com)までご連絡ください。また、フランスのデータ保護当局（CNIL、[cnil.fr](https://www.cnil.fr/)）またはお客様の居住国の監督機関に苦情を申し立てることもできます。"
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
            "text": "Konvertools（以下简称“服务”）作为一款以隐私为先的工具包运营。我们做出的最重要承诺如下："
          },
          {
            "kind": "ul",
            "items": [
              "**仅在浏览器中运行的工具**（图像转换器、使用 pdf-lib 的 PDF 工具、由 FFmpeg.wasm 驱动的音频和视频转换、代码工具、计算器、二维码生成器、密码泄露检查器、大多数实用工具）会**完全在您的网页浏览器中通过 WebAssembly 执行**。您的文件或输入内容不会传输到我们的服务器。我们无法读取它。",
              "**服务器辅助工具**（AI 转录、AI 翻译、AI 文本任务、视频字幕烧录、URL 扫描器、钓鱼检测器、SSL 证书检查器及其他少数工具）需要将内容发送至后端。在所有情况下，文件或文本均会实时处理并在三十（30）分钟内从临时存储中删除。",
              "我们永远不会将任何上传文件的内容存储在任何持久位置，永远不会使用您的上传内容训练 AI 模型，也永远不会出于任何目的（除非为向您交付所请求的结果）将其出售、出租或与第三方共享。"
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
            "text": "根据《欧盟通用数据保护条例》（第(EU) 2016/679 号条例，“GDPR”）的规定，数据控制者为服务的发布者。如有任何隐私咨询，请联系：[privacy@konvertools.com](mailto:privacy@konvertools.com)。"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 我们收集的信息",
        "blocks": [
          {
            "kind": "p",
            "text": "我们在数据库中持久保存的唯一个人数据包括："
          },
          {
            "kind": "ul",
            "items": [
              "**账户凭证**：您的电子邮件地址；加盐哈希后的密码副本（由 Supabase Auth 管理——我们永远不会看到或存储明文密码）；如您使用 Google 登录，则可选显示名称和头像 URL。",
              "**订阅状态**：当前套餐（免费/专业版/商业版）、Stripe 客户标识符、当前信用余额以及您最近续费的日期。",
              "**使用计数器**：聚合配额计数器（例如“今日已使用 3 次 AI 运行”、“本月已使用 420 次 AI 运行”），在您的个人资料行中实时更新。我们**不会**记录每次运行的详细记录。",
              "**作业元数据（临时）**：当服务器辅助工具生成输出（例如转录生成的 .srt 文件）时，我们会记录工具名称、结果下载 URL、源语言及完成时间戳。这些记录会在**两（2）小时**后自动清除。它们永远不会包含您文件的内容。",
              "**同意记录**：您接受本条款及隐私政策的日期和时间，以及您是否选择接收营销邮件。这些记录会在您的账户存在期间保留，并在账户删除后继续保留五（5）年作为法律证据。",
              "**API 密钥**：如您为公共 REST API 生成密钥，我们仅存储其 SHA-256 哈希值及 12 个字符的显示前缀。原始密钥仅在创建时向您显示一次，此后无法恢复。"
            ]
          },
          {
            "kind": "p",
            "text": "我们**不会**收集：您的 IP 地址（仅在 Supabase 和我们的托管提供商用于限流和安全日志时临时使用）、浏览器指纹、行为跟踪事件、屏幕录制内容或任何生物识别数据。"
          }
        ]
      },
      {
        "id": "files",
        "title": "4. 您处理的文件",
        "blocks": [
          {
            "kind": "p",
            "text": "如第 1 节所述，您处理的文件内容永远不会被我们持久保存。其具体生命周期如下："
          },
          {
            "kind": "ul",
            "items": [
              "**仅在浏览器中运行的工具**：零传输。文件由您的浏览器读入内存，结果在本地生成，您直接下载。我们不会记录有关该文件本身的任何信息。",
              "**AI 转录/翻译/OCR/钓鱼分析**：文件或文本会流式传输至我们的 Supabase Edge Function，该函数会立即将其转发至相关 AI 提供商（见第 7 节）进行推理。结果返回给您后，临时上传缓冲区会被丢弃。写入我们私有存储桶的结果文件会生成签名 URL，供您访问六十（60）分钟，并在生成后三十（30）分钟内物理删除。",
              "**密码泄露检查器**：您的密码永远不会离开浏览器。我们在本地使用 SHA-1 对其进行哈希处理，并通过 k-匿名性向 HaveIBeenPwned 查询——仅发送哈希的前五个字符。密码和完整哈希值永远不会被传输。",
              "**URL 扫描器/SSL 检查器**：仅传输您输入的 URL 或主机名（URL 扫描器传输至 Google Safe Browsing，SSL 检查器用于建立 TLS 连接）。不会传输周围页面的内容。"
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. 处理的法律依据（GDPR 第 6 条）",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**合同履行**（第 6(1)(b) 条）——当您创建账户并使用付费功能时，处理是交付服务所必需的。",
              "**合法利益**（第 6(1)(f) 条）——欺诈预防、滥用缓解、基本安全日志记录以及改进服务。",
              "**同意**（第 6(1)(a) 条）——营销邮件、可选分析或广告 Cookie（如启用）以及任何未来可选集成。",
              "**法律义务**（第 6(1)(c) 条）——根据法国税法要求保留账单记录（通常为十年）。"
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. 您的权利",
        "blocks": [
          {
            "kind": "p",
            "text": "您享有以下权利：访问权（第 15 条）、更正权（第 16 条）、删除权（第 17 条）、限制权（第 18 条）、可携权（第 20 条）、反对权（第 21 条），以及随时撤回同意（不影响先前处理的合法性）。您还享有向法国数据保护局（CNIL）或您所在国家/地区的监管机构投诉的权利。如需行使任何权利，请从您账户注册的邮箱发送邮件至 [privacy@konvertools.com](mailto:privacy@konvertools.com)。我们将在三十（30）天内回复，符合 GDPR 第 12(3) 条的要求。"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 第三方处理者",
        "blocks": [
          {
            "kind": "p",
            "text": "交付服务需要我们与以下处理者共享严格限定的数据。每个处理者都有自己的隐私政策，规定其如何处理从我们这里收到的数据。"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase**（新加坡注册，在欧盟托管我们的项目）——身份验证、数据库、文件存储和 Edge Functions。接收您的账户凭证、个人资料数据以及（临时）您上传用于服务器辅助工具的任何文件。作为我们的分包处理者。",
              "**Mistral AI**（法国）——大型语言模型推理，用于翻译、改写、摘要、AI 人性化、钓鱼模式分析及其他文本任务；音频转录（Voxtral）；图像 OCR 和视觉任务（Pixtral）。您提交的文本或图像会发送至 Mistral 进行推理。Mistral 已通过合同承诺**不会**将 API 输入用于训练其模型。",
              "**Google Safe Browsing**（Google LLC，美国）——仅在您使用 URL 扫描器或钓鱼检测器时。仅传输您提交的 URL（或从您粘贴的邮件中提取的链接）。这是我们唯一使用的第三方安全服务。",
              "**HaveIBeenPwned**（Have I Been Pwned LLC）——仅在您使用密码泄露检查器时，且仅发送密码 SHA-1 哈希的前五个字符（k-匿名性）。直接从您的浏览器查询，不通过我们的服务器。",
              "**Stripe**（美国/爱尔兰）——支付处理和订阅管理。我们**永远不会**看到或存储您的卡片详情。Stripe 接收您的邮箱、支付方式及您购买的套餐/信用包。",
              "**Resend**（美国）——交易邮件发送（账户确认、支付收据、密码重置）。接收您的邮箱地址及我们发送的邮件正文。",
              "**Vercel**（美国）——静态页面的内容分发网络。接收标准网络流量元数据（IP、用户代理、请求 URL）用于路由和滥用预防。根据 Vercel 的日志保留政策保留。"
            ]
          },
          {
            "kind": "p",
            "text": "如上述任何处理者在欧洲经济区之外运营，数据传输受欧盟委员会《标准合同条款》（SCCs）或同等传输机制的约束。"
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
              "**必要 Cookie**：NEXT_LOCALE（记住您选择的语言）及 Supabase 会话 Cookie（sb-*-auth-token，您登录时使用）。这些不需要 GDPR 下的同意。",
              "**可选广告 Cookie**：如我们启用广告合作伙伴（目前代码中引用了 Ezoic，但尚未为您的流量激活），我们会显示清晰的同意横幅，并在您选择同意后才设置广告 Cookie。"
            ]
          },
          {
            "kind": "p",
            "text": "我们目前不运行任何分析、跟踪像素或重定向标签。如添加任何此类功能，上述 Cookie 横幅将对其进行管控。"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. 安全",
        "blocks": [
          {
            "kind": "p",
            "text": "服务的所有流入和流出流量均使用 TLS 1.2 或更高版本加密。密码由 Supabase Auth 以 Argon2 哈希形式存储。我们在客户端通过公开的 HaveIBeenPwned k-匿名性 API 检查新密码，因此已知泄露的密码无法使用。API 密钥仅以 SHA-256 哈希形式存储。数据库行受行级安全策略保护，确保用户无法读取他人的数据。尽管采取了这些措施，但没有任何系统是绝对安全的；您接受任何在线服务固有的剩余风险。"
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. 保留期限",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "个人资料数据：在您的账户存在期间保留，账户关闭后三十（30）天内删除。",
              "作业元数据：自动在两（2）小时后清除。",
              "存储桶中的结果文件：在生成后三十（30）分钟内物理删除。",
              "账单记录：为符合法国税务义务，保留十（10）年。",
              "同意记录：在您的账户存在期间及之后五（5）年作为法律证据保留。"
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. 未成年人",
        "blocks": [
          {
            "kind": "p",
            "text": "本服务**不针对十六（16）岁以下儿童**。如您未满该年龄，请勿创建账户。我们不会有意收集未成年人的数据；如发现此类情况，我们将立即删除。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. 政策变更",
        "blocks": [
          {
            "kind": "p",
            "text": "我们可能会不时修改本隐私政策。实质性变更将至少提前三十（30）天通过邮件通知账户持有人。最新版本始终可在 [https://konvertools.com/privacy](https://konvertools.com/privacy) 查看。"
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. 联系方式",
        "blocks": [
          {
            "kind": "p",
            "text": "如对本政策或您的数据有任何疑问，请发送邮件至 [privacy@konvertools.com](mailto:privacy@konvertools.com)。您也可向法国数据保护局（CNIL，[cnil.fr](https://www.cnil.fr/)）或您所在国家/地区的监管机构投诉。"
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
        "title": "1. 핵심 원칙: 우리는 귀하의 파일을 보관하지 않습니다",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools(이하 \"서비스\")는 프라이버시 우선 도구 키트로 운영됩니다. 우리가 하는 가장 중요한 약속은 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**브라우저 전용 도구** (이미지 변환기, pdf-lib을 사용하는 PDF 도구, FFmpeg.wasm 기반 오디오/비디오 변환, 코드 도구, 계산기, QR 생성기, 비밀번호 유출 확인기, 대부분의 유틸리티)는 **웹어셈블리를 통해 귀하의 웹 브라우저에서 완전히 실행됩니다**. 귀하의 파일이나 입력은 서버로 전송되지 않습니다. 우리는 이를 읽을 기술적 수단이 없습니다.",
              "**서버 지원 도구** (AI 음성 변환, AI 번역, AI 텍스트 작업, 비디오 자막 삽입, URL 스캐너, 피싱 감지기, SSL 인증서 확인기 등 소수)는 백엔드로 무언가를 전송해야 합니다. 모든 경우에 파일이나 텍스트는 실시간으로 처리되며 임시 저장소에서 삼십(30) 분 이내에 삭제됩니다.",
              "우리는 업로드된 파일의 내용을 영구 저장소에 보관하지 않으며, 귀하의 업로드를 AI 모델 학습에 사용하지 않으며, 요청하신 결과를 제공하는 목적 외에는 제3자와 공유, 판매 또는 임대하지 않습니다."
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
            "text": "EU 일반 데이터 보호 규정(GDPR, 규정(EU) 2016/679)의 목적을 위해 데이터 관리자는 서비스 게시자입니다. 개인정보 관련 문의: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 수집하는 정보",
        "blocks": [
          {
            "kind": "p",
            "text": "데이터베이스에 영구 보관하는 개인정보는 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**계정 인증 정보**: 이메일 주소; Supabase Auth에서 관리하는 암호의 솔트 처리된 해시 복사본(우리는 평문 암호를 볼 수 없거나 저장하지 않음); Google 로그인 시 선택적 표시 이름 및 아바타 URL.",
              "**구독 상태**: 현재 플랜(무료 / Pro / Business), Stripe 고객 식별자, 현재 잔액, 가장 최근 갱신 일자.",
              "**사용량 카운터**: 집계된 할당량 카운터(예: \"오늘 AI 사용 3회\", \"월간 AI 사용 420회\")가 프로필 행에서 실시간으로 업데이트됩니다. **실행별 기록은 로그하지 않습니다**.",
              "**작업 메타데이터(일시적)**: 서버 지원 도구가 결과를 생성할 때(예: 음성 변환으로 .srt 파일 생성) 도구 이름, 결과 다운로드 URL, 소스 언어, 완료 타임스탬프를 기록합니다. 이러한 행은 **이시간(2시간) 후 자동으로 삭제됩니다**. 파일 내용은 포함되지 않습니다.",
              "**동의 기록**: 본 약관과 개인정보 보호정책을 수락한 날짜와 시각, 마케팅 이메일 수신 동의 여부. 계정 삭제 후 5년간 법적 증거 보존 기간을 포함하여 계정 기간 동안 보관됩니다.",
              "**API 키**: 공개 REST API용 키를 생성할 경우 SHA-256 해시와 12자 표시 접두사만 저장합니다. 원본 키는 생성 시 한 번만 표시되며 이후에는 복구할 수 없습니다."
            ]
          },
          {
            "kind": "p",
            "text": "우리는 **다음 정보는 수집하지 않습니다**: IP 주소(Suapbase 및 호스팅 제공업체의 임시 사용을 제외하고는 속도 제한 및 보안 로깅용), 브라우저 핑거프린트, 행동 추적 이벤트, 화면 녹화, 바이오메트릭 데이터 등."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. 처리하는 파일",
        "blocks": [
          {
            "kind": "p",
            "text": "1항에서 명시한 바와 같이 처리하는 파일의 내용은 영구적으로 보관되지 않습니다. 구체적인 수명 주기는 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**브라우저 전용 도구**: 전송 없음. 파일이 브라우저에 메모리로 읽혀지고 결과가 로컬에서 생성되며 직접 다운로드됩니다. 파일에 대한 로그는 남기지 않습니다.",
              "**AI 음성 변환 / 번역 / OCR / 피싱 분석**: 파일이나 텍스트가 Supabase Edge Function으로 스트리밍되어 관련 AI 제공업체(7항 참조)로 즉시 전달됩니다. 결과가 반환되고 임시 업로드 버퍼는 삭제됩니다. 개인 저장소 버킷에 작성된 결과 파일은 60분 동안 서명된 URL로 접근 가능하며 생성 후 삼십(30) 분 이내에 물리적으로 삭제됩니다.",
              "**비밀번호 유출 확인기**: 비밀번호는 브라우저를 떠나지 않습니다. 로컬에서 SHA-1 해싱 후 k-익명성을 사용하여 HaveIBeenPwned에 쿼리합니다. 해시의 처음 5자만 전송됩니다. 비밀번호와 전체 해시는 전송되지 않습니다.",
              "**URL 스캐너 / SSL 확인기**: 사용하시는 URL 또는 호스트 이름만 전송됩니다(Google Safe Browsing으로 URL 스캐너, TLS 연결을 열기 위한 SSL 확인기). 주변 페이지 내용은 전송되지 않습니다."
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
        "title": "6. 귀하의 권리",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 접근권(Art. 15), 정정권(Art. 16), 삭제권(Art. 17), 제한권(Art. 18), 이전권(Art. 20), 이의제기권(Art. 21) 및 언제든지 동의를 철회할 권리가 있으며,此之前의 처리의 적법성은 영향을 받지 않습니다. 또한 프랑스 CNIL(또는 거주국의 감독 기관)에 불만을 제기할 권리가 있습니다. 권리를 행사하려면 계정에 등록된 이메일로 [privacy@konvertools.com](mailto:privacy@konvertools.com)에 문의하십시오. GDPR Art. 12(3)에 따라 삼십(30)일 이내에 응답합니다."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 제3자 처리업체",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스 제공을 위해 다음과 같은 제3자 처리업체와 엄격히 제한된 데이터를 공유해야 합니다. 각 업체는 수신한 데이터를 처리하는 방식에 대한 자체 개인정보 보호정책을 보유하고 있습니다."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (싱가포르 법인, EU 내 호스팅) — 인증, 데이터베이스, 파일 저장소, Edge Functions. 계정 인증 정보, 프로필 데이터 및 서버 지원 도구용 파일(일시적)을 수신합니다. 우리의 하위 처리업체로 활동합니다.",
              "**Mistral AI** (프랑스) — 번역, 재구성, 요약, AI 인간화, 피싱 패턴 분석 등 텍스트 작업, 음성 변환(Voxtral), 이미지 OCR 및 Vision 작업(Pixtral)을 위한 대형 언어 모델 추론. 제출한 텍스트나 이미지가 추론용으로 Mistral로 전송됩니다. Mistral은 API 입력을 모델 학습에 **사용하지 않겠다는 계약을 체결했습니다**.",
              "**Google Safe Browsing** (Google LLC, 미국) — URL 스캐너 또는 피싱 감지기를 사용할 때만 해당됩니다. 제출한 URL(또는 이메일에 붙인 링크)만 전송됩니다. 이것이 우리가 사용하는 유일한 제3자 보안 서비스입니다.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — 비밀번호 유출 확인기를 사용할 때만 해당되며, k-익명성을 사용하여 비밀번호의 SHA-1 해시 처음 5자만 전송됩니다. 브라우저에서 직접 쿼리되며 서버를 거치지 않습니다.",
              "**Stripe** (미국 / 아일랜드) — 결제 처리 및 구독 관리. **카드 세부 정보는 볼 수 없거나 저장하지 않습니다**. Stripe는 이메일, 결제 수단, 구매한 플랜/크레딧 팩을 수신합니다.",
              "**Resend** (미국) — 트랜잭션 이메일 전달(계정 확인, 결제 영수증, 비밀번호 재설정). 이메일 주소와 전송하는 이메일 본문을 수신합니다.",
              "**Vercel** (미국) — 정적 페이지용 콘텐츠 전달 네트워크. 라우팅 및 남용 방지를 위한 표준 웹 트래픽 메타데이터(IP, 사용자 에이전트, 요청 URL)를 수신합니다. Vercel의 로그 보관 정책에 따라 보관됩니다."
            ]
          },
          {
            "kind": "p",
            "text": "이러한 처리업체 중 유럽 경제 지역(EER) 외에서 운영되는 경우 전송은 유럽 위원회의 표준 계약 클로즈(SCC) 또는 동등한 전송 메커니즘에 의해 규율됩니다."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. 쿠키 및 유사 기술",
        "blocks": [
          {
            "kind": "p",
            "text": "다음 쿠키 및 로컬 저장소 항목만 사용합니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**필수**: NEXT_LOCALE(선택한 언어 기억), 로그인 시 Supabase 세션 쿠키(sb-*-auth-token). GDPR에 따라 동의가 필요하지 않습니다.",
              "**선택적 광고**: 광고 파트너(Ezoic가 코드에 참조되어 있지만 현재 귀하의 트래픽에는 활성화되지 않음)를 사용할 경우 명확한 동의 배너를 표시하고 동의한 경우에만 광고 쿠키를 설정합니다."
            ]
          },
          {
            "kind": "p",
            "text": "현재는 분석, 추적 픽셀 또는 재마케팅 태그를 실행하지 않습니다. 추가할 경우 위의 쿠키 배너에서 제어합니다."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. 보안",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스와의 모든 트래픽은 TLS 1.2 이상으로 암호화됩니다. 비밀번호는 Supabase Auth에서 Argon2 해시로 저장됩니다. 공개 HaveIBeenPwned k-익명성 API를 클라이언트 측에서 확인하므로 알려진 유출 비밀번호는 사용할 수 없습니다. API 키는 SHA-256 해시로만 저장됩니다. 데이터베이스 행은 행 수준 보안 정책으로 보호되어 한 사용자가 다른 사용자의 데이터를 읽을 수 없습니다. 이러한 조치에도 불구하고 어떤 시스템도 완벽하게 안전하지 않으며, 모든 온라인 서비스에 내재된 잔존 위험을 수락합니다."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. 보관 기간",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "프로필 데이터: 계정 존재 시 보관, 계정 삭제 후 삼십(30)일 이내 삭제.",
              "작업 메타데이터: 이시간(2시간) 후 자동 삭제.",
              "저장소 버킷의 결과 파일: 생성 후 삼십(30)분 이내 물리적 삭제.",
              "청구 기록: 프랑스 세법 준수를 위해 십(10)년간 보관.",
              "동의 기록: 계정 기간 동안 보관 후 5년간 법적 증거로 보관."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. 미성년자",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스는 **만 16세 미만의 아동을 대상으로 하지 않습니다**. 해당 연령 미만이라면 계정을 생성할 수 없습니다. 미성년자의 데이터를 고의로 수집하지 않으며, 실수로 수집된 경우 삭제합니다."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. 정책 변경",
        "blocks": [
          {
            "kind": "p",
            "text": "이 개인정보 보호정책을 수시로 개정할 수 있습니다. 실질적인 변경 사항은 적용 최소 삼십(30)일 전에 계정 보유자에게 이메일로 공지됩니다. 최신 버전은 항상 [https://konvertools.com/privacy](https://konvertools.com/privacy)에서 확인할 수 있습니다."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. 문의",
        "blocks": [
          {
            "kind": "p",
            "text": "이 정책 또는 귀하의 데이터에 대한 문의는 [privacy@konvertools.com](mailto:privacy@konvertools.com)으로 문의하십시오. 프랑스 데이터 보호 당국(CNIL, [cnil.fr](https://www.cnil.fr/)) 또는 거주국의 감독 기관에 불만을 제기할 수도 있습니다."
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
        "title": "1. المبدأ الأساسي لدينا: نحن لا نحتفظ بملفاتك",
        "blocks": [
          {
            "kind": "p",
            "text": "يتم تشغيل **Konvertools** (الخدمة) كأداة خصوصية تركز على حماية البيانات. الالتزام الأهم الذي نقدمه هو الآتي:"
          },
          {
            "kind": "ul",
            "items": [
              "**الأدوات التي تعمل داخل المتصفح** (م converters الصور، أدوات PDF التي تستخدم pdf-lib، تحويلات الصوت والفيديو التي تعمل بواسطة FFmpeg.wasm، أدوات الترميز، الآلات الحاسبة، مولدات QR، فاحص اختراقات كلمات المرور، معظم الأدوات الأخرى) تعمل **كاملة داخل متصفحك عبر WebAssembly**. لم يتم إرسال ملفك أو إدخالك مطلقاً إلى خوادمنا. ليس لدينا أي وسيلة فنية لقراءتها.",
              "**الأدوات التي تعتمد على الخادم** (النسخ الصوتية بواسطة الذكاء الاصطناعي، الترجمة بواسطة الذكاء الاصطناعي، مهام النص بواسطة الذكاء الاصطناعي، إضافةSubtitles إلى الفيديو، فاحص الروابط، كاشف التصيد، فاحص شهادة SSL وبعض الأدوات الأخرى) تحتاج إلى إرسال شيء إلى الخلفية. في جميع الحالات، تتم معالجة الملف أو النص في الوقت الفعلي ويتم حذفه من التخزين المؤقت خلال ثلاثين (30) دقيقة.",
              "لم نقم أبداً بتخزين محتوى أي ملف تم تحميله في أي موقع دائم، ولم نستخدم أبداً عمليات التحميل الخاصة بك لتدريب نماذج الذكاء الاصطناعي، ولم نبع أو نؤجر أو نشاركها مع أطراف ثالثة لأي غرض سوى تقديم النتيجة التي طلبتها."
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
            "text": "لأغراض لائحة الاتحاد الأوروبي العامة لحماية البيانات (Regulation (EU) 2016/679، \"GDPR\")، فإن مسؤول البيانات هو الناشر للخدمة. للتواصل بشأن أي استفسار يتعلق بالخصوصية: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. البيانات التي نجمعها",
        "blocks": [
          {
            "kind": "p",
            "text": "البيانات الشخصية الوحيدة التي نحتفظ بها في قاعدة بياناتنا هي:"
          },
          {
            "kind": "ul",
            "items": [
              "**بيانات الاعتماد الخاصة بالحساب**: عنوان بريدك الإلكتروني؛ نسخة مشفرة ومملحة من كلمة المرور (تدار بواسطة Supabase Auth — لم نتمكن مطلقاً من رؤية كلمة المرور الأصلية أو تخزينها)؛ الاسم الظاهري وعنوان صورة الرمزية إذا قمت بتسجيل الدخول باستخدام Google.",
              "**حالة الاشتراك**: الخطة الحالية (مجاني / Pro / Business)، المعرف الخاص بك كمستهلك في Stripe، رصيدك الحالي، وتواريخ آخر تجديداتك.",
              "**عدادات الاستخدام**: عدادات الحصة المجمعة (مثل \"تم استخدام 3 عمليات ذكاء اصطناعي اليوم\"، \"تم استخدام 420 عملية ذكاء اصطناعي شهرياً\") يتم تحديثها في مكانها على صفحتك الشخصية. **نحن لا نسجل سجلات لكل عملية**.",
              "**بيانات تعريف الوظيفة (عابرة)**: عند إنتاج أداة تعتمد على الخادم مخرجاً (مثل ملف .srt من النسخ الصوتي)، نقوم بتسجيل اسم الأداة، رابط تنزيل النتيجة، اللغة المصدر، ووقت إكمال العملية. يتم حذف هذه الصفوف تلقائياً بعد **ساعتين (2)**. لا تحتوي مطلقاً على محتوى ملفك.",
              "**سجلات الموافقة**: التاريخ والوقت الذي وافقت فيه على هذه الشروط وسياسة الخصوصية لدينا، وما إذا كنت قد اخترت الاشتراك في رسائل البريد الإلكتروني التسويقية. يتم الاحتفاظ بها طوال مدة حسابك بالإضافة إلى فترة أدلة قانونية مدتها خمس (5) سنوات بعد الحذف.",
              "**مفاتيح API**: إذا قمت بإنشاء مفاتيح لواجهة برمجة التطبيقات العامة (REST API)، نقوم بتخزين SHA-256 فقط بالإضافة إلى بادئة عرض مكونة من 12 حرفاً. يتم عرض المفتاح الخام لك مرة واحدة بالضبط عند الإنشاء ولا يمكن استرداده لاحقاً."
            ]
          },
          {
            "kind": "p",
            "text": "**نحن لا نجمع**: عنوان IP الخاص بك (بخلاف الاستخدام المؤقت الذي تقوم به Supabase ومزود الاستضافة لدينا لأغراض الحد من المعدل وتسجيلات الأمان)، بصمة متصفحك، أحداث التتبع السلوكي، تسجيلات شاشتك، أو أي بيانات حيوية."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. الملفات التي تعالجها",
        "blocks": [
          {
            "kind": "p",
            "text": "كما هو مذكور في القسم 1، لم نقم مطلقاً بتخزين محتويات الملفات التي تعالجها. الدورة الحياتية الدقيقة هي كالتالي:"
          },
          {
            "kind": "ul",
            "items": [
              "**الأدوات التي تعمل داخل المتصفح**: لا إرسال مطلق. يتم قراءة الملف إلى الذاكرة بواسطة متصفحك، ويتم إنتاج النتيجة محلياً، وتقوم بتنزيلها مباشرة. لا نقوم بتسجيل أي شيء يتعلق بالملف نفسه.",
              "**النسخ الصوتي / الترجمة / OCR / تحليل التصيد**: يتم إرسال الملف أو النص إلى دالة Edge الخاصة بنا في Supabase، والتي تقوم فوراً بإرساله إلى مزود الذكاء الاصطناعي المعني (انظر القسم 7) للاستدلال. يتم إرجاع النتيجة إليك ويتم حذف مخزن التحميل المؤقت. يتم الوصول إلى ملفات النتائج المكتوبة في دلو التخزين الخاص بنا عبر عنوان URL موقّع لمدة ستين (60) دقيقة ويتم حذفها مادياً خلال ثلاثين (30) دقيقة من إنشائها.",
              "**فاحص اختراقات كلمات المرور**: لم تغادر كلمة المرور مطلقاً متصفحك. نقوم بتشفيرها محلياً باستخدام SHA-1 ونستعلم عن HaveIBeenPwned باستخدام k-anonymity — يتم إرسال الأحرف الخمسة الأولى من التجزئة فقط. لم يتم إرسال كلمة المرور أو التجزئة الكاملة مطلقاً.",
              "**فاحص الروابط / فاحص SSL**: يتم إرسال عنوان URL أو اسم النطاق الذي تكتبه فقط (إلى Google Safe Browsing لفاحص الروابط، أو لاستخدامه لفتح اتصال TLS حي لفاحص SSL). لا يتم إرسال محتويات الصفحة المحيطة."
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
              "**المصالح المشروعة** (المادة 6(1)(و)) — منع الاحتيال، تخفيف سوء الاستخدام، تسجيلات الأمان الأساسية، وتحسين الخدمة.",
              "**الموافقة** (المادة 6(1)(أ)) — رسائل البريد الإلكتروني التسويقية، ملفات تعريف الارتباط التحليلية أو الإعلانية الاختيارية (إذا تم تفعيلها)، وأي تكامل اختياري مستقبلي.",
              "**الالتزام القانوني** (المادة 6(1)(ج)) — الاحتفاظ بسجلات الفواتير وفقاً للقانون الضريبي الفرنسي (عادة عشر سنوات)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. حقوقك",
        "blocks": [
          {
            "kind": "p",
            "text": "لديك حقوق الوصول (المادة 15)، التصحيح (المادة 16)، الحذف (المادة 17)، التقييد (المادة 18)، النقل (المادة 20)، الاعتراض (المادة 21) وسحب الموافقة في أي وقت دون التأثير على قانونية المعالجة السابقة. لديك أيضاً الحق في تقديم شكوى إلى CNIL (فرنسا) أو السلطة الإشرافية المحلية في بلد إقامتك. لممارسة أي حق، أرسل بريداً إلكترونياً إلى [privacy@konvertools.com](mailto:privacy@konvertools.com) من العنوان المسجل في حسابك. سنرد خلال ثلاثين (30) يوماً، وفقاً للمادة 12(3) من GDPR."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. المعالجون من طرف ثالث",
        "blocks": [
          {
            "kind": "p",
            "text": "يتطلب تقديم الخدمة منا مشاركة بيانات محدودة للغاية مع المعالجين التاليين. لكل منهم سياسة خصوصية خاصة به تنظم كيفية تعاملهم مع البيانات التي يتلقونها منا."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (مؤسسة سنغافورية، مستضافة في الاتحاد الأوروبي لمشروعنا) — المصادقة، قاعدة البيانات، تخزين الملفات، ودوال Edge. يستقبل بيانات اعتماد حسابك، بياناتك الشخصية وأي ملف تقوم بتحميله لأداة تعتمد على الخادم. يعمل كمعالج فرعي لنا.",
              "**Mistral AI** (فرنسا) — استدلال نماذج اللغة الكبيرة للترجمة، إعادة الصياغة، التلخيص، التحويل البشري للنصوص، تحليل أنماط التصيد، وغيرها من مهام النص؛ النسخ الصوتي (Voxtral)؛ OCR للصور ومهام الرؤية (Pixtral). يتم إرسال النص أو الصورة التي تقدمها إلى Mistral للاستدلال. تعهد Mistral عقدياً **بعد استخدام مدخلات API** لتدريب نماذجها.",
              "**Google Safe Browsing** (Google LLC، الولايات المتحدة) — فقط عند استخدامك لفاحص الروابط أو كاشف التصيد. يتم إرسال عناوين URL التي تقدمها (أو الروابط المستخرجة من البريد الإلكتروني الذي تلصقه) فقط. هذا هو الخدمة الأمنية الوحيدة من طرف ثالث نستخدمها.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — فقط عند استخدامك لفاحص اختراقات كلمات المرور، ولم يتم إرسال سوى الأحرف الخمسة الأولى من تجزئة SHA-1 لكلمة المرور (k-anonymity). يتم الاستعلام مباشرة من متصفحك، وليس عبر خوادمنا.",
              "**Stripe** (الولايات المتحدة / أيرلندا) — معالجة المدفوعات وإدارة الاشتراكات. **لم نتمكن مطلقاً من رؤية أو تخزين** تفاصيل بطاقتك. يستقبل Stripe عنوان بريدك الإلكتروني، طريقة الدفع، والخطة/الحزمة الائتمانية التي اشتريتها.",
              "**Resend** (الولايات المتحدة) — تسليم رسائل البريد الإلكتروني المعاملاتي (تأكيد الحساب، إيصالات الدفع، إعادة تعيين كلمة المرور). يستقبل عنوان بريدك الإلكتروني وجسم الرسالة الذي نرسله.",
              "**Vercel** (الولايات المتحدة) — شبكة توصيل محتوى للصفحات الثابتة. يستقبل بيانات تعريف حركة المرور على الويب القياسية (IP، وكيل المستخدم، عنوان URL المطلوب) للتوجيه ومنع سوء الاستخدام. يتم الاحتفاظ بها وفقاً لسياسة الاحتفاظ بسجلات Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "عندما يعمل أي من هذه المعالجين خارج المنطقة الاقتصادية الأوروبية، تتم إدارة عمليات النقل بموجب الشروط التعاقدية القياسية (SCCs) للجنة الأوروبية أو آلية نقل مكافئة."
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
              "**أساسية**: NEXT_LOCALE (تتذكر اللغة التي اخترتها)، وملفات تعريف الارتباط الخاصة بجلسة Supabase (sb-*-auth-token) عند تسجيل الدخول. لا تتطلب موافقتك بموجب GDPR.",
              "**إعلانية اختيارية**: إذا قمنا بتمكين شركاء الإعلانات (يتم الإشارة إلى Ezoic حالياً في الكود الخاص بنا ولكن لم يتم تفعيله بعد لحركة المرور الخاصة بك)، سنعرض لافتة موافقة واضحة ولن نضع ملفات تعريف الارتباط الإعلانية إلا بعد موافقتك."
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
        "title": "9. الأمان",
        "blocks": [
          {
            "kind": "p",
            "text": "يتم تشفير جميع حركة المرور إلى الخدمة ومنه باستخدام TLS 1.2 أو أعلى. يتم تخزين كلمات المرور على شكل تجزئات Argon2 بواسطة Supabase Auth. نقوم بفحص كلمات المرور الجديدة مقابل API HaveIBeenPwned العام باستخدام k-anonymity من جانب العميل، لذا لا يمكن استخدام كلمة مرور معروفة بأنها مخترقة. يتم تخزين مفاتيح API فقط على شكل تجزئات SHA-256. يتم حماية صفوف قاعدة البيانات بسياسات أمان على مستوى الصفوف مما يضمن عدم قدرة مستخدم على قراءة بيانات مستخدم آخر. على الرغم من هذه الإجراءات، لا يوجد نظام آمن تماماً؛ أنت تقبل المخاطر المتبقية الكامنة في أي خدمة عبر الإنترنت."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. الاحتفاظ",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "بيانات الحساب الشخصي: محفوظة طوال مدة حسابك، ويتم حذفها خلال ثلاثين (30) يوماً من إغلاق الحساب.",
              "بيانات تعريف الوظيفة: يتم حذفها تلقائياً بعد ساعتين (2).",
              "ملفات النتائج في دلو التخزين: يتم حذفها مادياً خلال ثلاثين (30) دقيقة من إنشائها.",
              "سجلات الفواتير: محفوظة لمدة عشر (10) سنوات للامتثال بالالتزامات الضريبية الفرنسية.",
              "سجلات الموافقة: محفوظة طوال مدة حسابك بالإضافة إلى خمس (5) سنوات بعد ذلك كدليل قانوني."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. القصر",
        "blocks": [
          {
            "kind": "p",
            "text": "الخدمة **غير موجهة للأطفال دون السادسة عشرة (16)**. إذا لم تبلغ هذا السن، يجب ألا تنشئ حساباً. نحن لا نجمع بيانات القصر عمداً؛ إذا علمنا أننا فعلنا ذلك، سنقوم بحذفها."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. التغييرات على هذه السياسة",
        "blocks": [
          {
            "kind": "p",
            "text": "قد نقوم بتعديل سياسة الخصوصية هذه من وقت لآخر. سيتم الإعلان عن التغييرات الجوهرية عبر البريد الإلكتروني لحاملي الحسابات قبل ثلاثين (30) يوماً على الأقل من سريان مفعولها. النسخة الأحدث متاحة دائماً على [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. الاتصال",
        "blocks": [
          {
            "kind": "p",
            "text": "لأي سؤال حول هذه السياسة أو بياناتك، اكتب إلى [privacy@konvertools.com](mailto:privacy@konvertools.com). يمكنك أيضاً تقديم شكوى إلى الهيئة الفرنسية لحماية البيانات (CNIL، [cnil.fr](https://www.cnil.fr/)) أو إلى السلطة الإشرافية في بلد إقامتك."
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
            "text": "Konvertools (далее — «Сервис») работает как набор инструментов, ориентированных на конфиденциальность. Наше самое важное обязательство заключается в следующем:"
          },
          {
            "kind": "ul",
            "items": [
              "**Инструменты, работающие только в браузере** (конвертеры изображений, инструменты для работы с PDF, использующие pdf-lib, аудио- и видеоконвертеры на основе FFmpeg.wasm, инструменты для работы с кодом, калькуляторы, генераторы QR-кодов, проверка утечек паролей, большинство утилит) выполняются **полностью внутри вашего веб-браузера с помощью WebAssembly**. Ваш файл или данные никогда не передаются на наши серверы. У нас нет технической возможности их прочитать.",
              "**Инструменты с серверной поддержкой** (AI-транскрибирование, AI-перевод, AI-обработка текста, наложение субтитров на видео, сканирование URL, детектор фишинга, проверка SSL-сертификатов и некоторые другие) требуют отправки данных на бэкенд. В каждом случае файл или текст обрабатываются в реальном времени и удаляются из временного хранилища в течение тридцати (30) минут.",
              "Мы никогда не храним содержимое загруженных файлов на постоянной основе, не используем ваши загрузки для обучения моделей ИИ и не продаём, не сдаём в аренду и не передаём их третьим лицам ни для каких целей, кроме предоставления результата, который вы запросили."
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
            "text": "В соответствии с Положениями Европейского Союза о защите данных (Регламент (ЕС) 2016/679, «GDPR»), контролёром данных является издатель Сервиса. Для обращений по вопросам конфиденциальности: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Какие данные мы собираем",
        "blocks": [
          {
            "kind": "p",
            "text": "Единственные персональные данные, которые мы храним в нашей базе данных:"
          },
          {
            "kind": "ul",
            "items": [
              "**Учётные данные**: ваш адрес электронной почты; соль и хешированная копия вашего пароля (управляется Supabase Auth — мы не видим и не храним пароль в открытом виде); при входе через Google — необязательные отображаемое имя и URL аватара.",
              "**Статус подписки**: текущий тарифный план (бесплатный / Pro / Business), идентификатор клиента Stripe, текущий кредитный баланс и даты последних пополнений.",
              "**Счётчики использования**: агрегированные квоты (например, «3 запуска ИИ сегодня», «420 ежемесячных запусков ИИ использовано») обновляются на вашей учётной записи. Мы **не ведём запись отдельных запусков**.",
              "**Метаданные задач (временные)**: при выполнении инструментов с серверной поддержкой (например, получение файла .srt из транскрибирования) мы записываем название инструмента, URL для скачивания результата, исходный язык и время завершения. Эти записи автоматически удаляются через **два (2) часа**. Они никогда не содержат содержимого вашего файла.",
              "**Записи согласий**: дата и время принятия вами этих Условий и нашей Политики конфиденциальности, а также выбор подписки на маркетинговые письма. Хранятся в течение срока действия вашей учётной записи плюс пять (5) лет после её удаления в качестве юридических доказательств.",
              "**API-ключи**: если вы создаёте ключи для публичного REST API, мы храним только SHA-256-хеш и 12-символьный префикс для отображения. Сырой ключ показывается вам только один раз при создании и впоследствии не подлежит восстановлению."
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
              "**Инструменты, работающие только в браузере**: данные не передаются. Файл считывается в память вашим браузером, результат генерируется локально, и вы скачиваете его напрямую. Мы не логируем никакой информации о самом файле.",
              "**AI-транскрибирование / перевод / OCR / анализ фишинга**: файл или текст потоково передаётся в нашу Supabase Edge Function, которая немедленно пересылает его соответствующему провайдеру ИИ (см. раздел 7) для инференса. Результат возвращается вам, а временный буфер загрузки удаляется. Файлы результатов, записанные в наш частный бакет хранения, доступны по подписанным URL в течение шестидесяти (60) минут и физически удаляются в течение тридцати (30) минут после генерации.",
              "**Проверка утечек паролей**: ваш пароль никогда не покидает ваш браузер. Мы хешируем его локально с помощью SHA-1 и запрашиваем HaveIBeenPwned с использованием k-анонимности — передаются только первые 5 символов хеша. Пароль и полный хеш никогда не передаются.",
              "**Сканирование URL / проверка SSL**: передаётся только URL или имя хоста, которые вы вводите (в Google Safe Browsing для сканера URL или для открытия живого TLS-соединения для проверки SSL). Никакие окружающие данные страницы не передаются."
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
              "**Исполнение договора** (Art. 6(1)(b)) — при создании учётной записи и использовании платных функций обработка необходима для предоставления Сервиса.",
              "**Законные интересы** (Art. 6(1)(f)) — предотвращение мошенничества, смягчение злоупотреблений, базовое логирование безопасности и улучшение Сервиса.",
              "**Согласие** (Art. 6(1)(a)) — маркетинговые письма, необязательные аналитические или рекламные cookies (если и когда включены), а также любые будущие необязательные интеграции.",
              "**Юридическое обязательство** (Art. 6(1)(c)) — хранение платёжных записей в соответствии с требованиями французского налогового законодательства (обычно десять лет)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Ваши права",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы обладаете правами доступа (Art. 15), исправления (Art. 16), удаления (Art. 17), ограничения обработки (Art. 18), переносимости (Art. 20), возражения (Art. 21) и возможностью отозвать согласие в любое время без ущерба для законности предыдущей обработки. Вы также имеете право подать жалобу в CNIL (Франция) или в местный надзорный орган. Для реализации любого права напишите на [privacy@konvertools.com](mailto:privacy@konvertools.com) с адреса, зарегистрированного в вашей учётной записи. Мы ответим в течение тридцати (30) дней, как требует GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Сторонние обработчики",
        "blocks": [
          {
            "kind": "p",
            "text": "Для предоставления Сервиса нам необходимо передавать строго ограниченные данные следующим обработчикам. У каждого из них есть своя политика конфиденциальности, регулирующая обработку данных, которые они получают от нас."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (Singapore-incorporated, размещённый в ЕС для нашего проекта) — аутентификация, база данных, файловое хранилище и Edge Functions. Получает ваши учётные данные, профиль и (временные) любые файлы, загруженные для инструментов с серверной поддержкой. Выступает в роли нашего субподрядчика.",
              "**Mistral AI** (Франция) — инференс больших языковых моделей для перевода, перефразирования, суммаризации, «человечного» текста, анализа шаблонов фишинга и других текстовых задач; аудиотранскрибирование (Voxtral); OCR и Vision для изображений (Pixtral). Текст или изображение, которые вы отправляете, передаются Mistral для инференса. Mistral на договорной основе **не использует входные данные API для обучения своих моделей**.",
              "**Google Safe Browsing** (Google LLC, США) — только при использовании сканера URL или детектора фишинга. Передаются только URL, которые вы вводите (или ссылки, извлечённые из письма, которое вы вставляете). Это единственный сторонний сервис безопасности, который мы используем.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — только при использовании проверки утечек паролей, и только первые 5 символов SHA-1-хеша вашего пароля (k-анонимность). Запрос выполняется напрямую из вашего браузера, а не через наши серверы.",
              "**Stripe** (США / Ирландия) — обработка платежей и управление подписками. Мы **никогда не видим и не храним** данные вашей карты. Stripe получает ваш адрес электронной почты, платёжные реквизиты и купленный вами тариф/пакет кредитов.",
              "**Resend** (США) — доставка транзакционных писем (подтверждение учётной записи, квитанции об оплате, сброс пароля). Получает ваш адрес электронной почты и тело письма, которое мы отправляем.",
              "**Vercel** (США) — сеть доставки контента для статичных страниц. Получает стандартные метаданные веб-трафика (IP, user-agent, запрашиваемый URL) для маршрутизации и предотвращения злоупотреблений. Хранится в соответствии с политикой хранения логов Vercel."
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
              "**Обязательные**: NEXT_LOCALE (запоминает выбранный язык) и cookies сеанса Supabase (sb-*-auth-token) при входе в систему. Они не требуют согласия в соответствии с GDPR.",
              "**Необязательные рекламные**: если и когда мы подключаем партнёров по рекламе (в настоящее время в нашем коде упоминается Ezoic, но пока не активирован для вашего трафика), мы будем отображать чёткий баннер согласия и устанавливать рекламные cookies только после вашего согласия."
            ]
          },
          {
            "kind": "p",
            "text": "В настоящее время мы не используем аналитику, пиксели отслеживания или ремаркетинговые теги. Если мы добавим их, баннер согласия выше будет их контролировать."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Безопасность",
        "blocks": [
          {
            "kind": "p",
            "text": "Вся передача данных на Сервис и с него шифруется с помощью TLS 1.2 или выше. Пароли хранятся в виде хешей Argon2 в Supabase Auth. Мы проверяем новые пароли с помощью публичного API k-анонимности HaveIBeenPwned на стороне клиента, поэтому известный скомпрометированный пароль не может быть использован. API-ключи хранятся только в виде SHA-256-хешей. Строки базы данных защищены политиками безопасности на уровне строк, что гарантирует, что один пользователь не может прочитать данные другого. Несмотря на эти меры, ни одна система не является абсолютно безопасной; вы принимаете на себя остаточные риски, inherent для любого онлайн-сервиса."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Хранение данных",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Данные профиля: хранятся до тех пор, пока существует ваша учётная запись, удаляются в течение тридцати (30) дней после её закрытия.",
              "Метаданные задач: автоматически удаляются через два (2) часа.",
              "Файлы результатов в бакете хранения: физически удаляются в течение тридцати (30) минут после генерации.",
              "Платёжные записи: хранятся в течение десяти (10) лет для соблюдения французских налоговых обязательств.",
              "Записи согласий: хранятся в течение срока действия вашей учётной записи плюс пять (5) лет после её удаления в качестве юридических доказательств."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Несовершеннолетние",
        "blocks": [
          {
            "kind": "p",
            "text": "Сервис **не предназначен для детей младше шестнадцати (16) лет**. Если вам меньше этого возраста, вы не должны создавать учётную запись. Мы не осознанно собираем данные несовершеннолетних; если нам станет об этом известно, мы удалим их."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Изменения в этой политике",
        "blocks": [
          {
            "kind": "p",
            "text": "Мы можем время от времени вносить изменения в эту Политику конфиденциальности. Существенные изменения будут объявлены по электронной почте владельцам учётных записей не менее чем за тридцать (30) дней до вступления в силу. Последняя версия всегда доступна по адресу [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Контакт",
        "blocks": [
          {
            "kind": "p",
            "text": "По любым вопросам о настоящей политике или ваших данных напишите на [privacy@konvertools.com](mailto:privacy@konvertools.com). Вы также можете подать жалобу во французский орган по защите данных (CNIL, [cnil.fr](https://www.cnil.fr/)) или в надзорный орган вашей страны проживания."
          }
        ]
      }
    ]
  },
  "hi": {
    "h1": "गोपनीयता नीति",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "अंतिम अपडेट: %DATE% · सभी आगंतुकों और खाता धारकों के लिए तुरंत प्रभावी।",
    "sections": [
      {
        "id": "principle",
        "title": "1. हमारा मूल सिद्धांत: हम आपके फ़ाइलें नहीं रखते",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (\"सेवा\") एक गोपनीयता-प्रथम टूलकिट के रूप में संचालित होती है। हमारा सबसे महत्वपूर्ण वादा यह है:"
          },
          {
            "kind": "ul",
            "items": [
              "**ब्राउज़र-केवल उपकरण** (छवि कन्वर्टर्स, पीडीएफ उपकरण जो pdf-lib का उपयोग करते हैं, ऑडियो और वीडियो रूपांतरण FFmpeg.wasm द्वारा संचालित, कोड उपकरण, कैलकुलेटर, क्यूआर जनरेटर, पासवर्ड उल्लंघन चेकर, अधिकांश उपयोगिताएँ) **पूरी तरह से आपके वेब ब्राउज़र में WebAssembly के माध्यम से निष्पादित होते हैं**। आपकी फ़ाइल या इनपुट कभी भी हमारे सर्वरों पर प्रसारित नहीं होता। हमारे पास इसे पढ़ने का कोई तकनीकी साधन नहीं है।",
              "**सर्वर-सहायता प्राप्त उपकरण** (AI प्रतिलेखन, AI अनुवाद, AI पाठ कार्य, वीडियो सबटाइटल बर्न-इन, URL स्कैनर, फ़िशिंग डिटेक्टर, SSL प्रमाणपत्र चेकर और अन्य कुछ) को बैकएंड पर कुछ भेजने की आवश्यकता होती है। हर मामले में फ़ाइल या पाठ को वास्तविक समय में संसाधित किया जाता है और तीस (30) मिनट के भीतर अस्थायी संग्रहण से हटा दिया जाता है।",
              "हम कभी भी किसी अपलोड की गई फ़ाइल की सामग्री को किसी निरंतर स्थान पर संग्रहीत नहीं करते, हम आपके अपलोड का उपयोग AI मॉडलों को प्रशिक्षित करने के लिए नहीं करते, और हम उन्हें किसी तीसरे पक्ष के साथ किसी भी उद्देश्य के लिए नहीं बेचते, किराए पर नहीं देते या साझा नहीं करते, सिवाय इसके कि आपको आपके द्वारा अनुरोधित परिणाम प्रदान करने के लिए।"
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
            "text": "यूरोपीय संघ के सामान्य डेटा संरक्षण विनियमन (विनियमन (ईयू) 2016/679, \"GDPR\") के प्रयोजनों के लिए, डेटा नियंत्रक सेवा के प्रकाशक हैं। गोपनीयता संबंधी किसी भी पूछताछ के लिए संपर्क: [privacy@konvertools.com](mailto:privacy@konvertools.com)।"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. हम क्या एकत्र करते हैं",
        "blocks": [
          {
            "kind": "p",
            "text": "हम अपने डेटाबेस में केवल निम्नलिखित व्यक्तिगत डेटा को बनाए रखते हैं:"
          },
          {
            "kind": "ul",
            "items": [
              "**खाता क्रेडेंशियल्स**: आपका ईमेल पता; आपके पासवर्ड की नमकीन, हैश की गई प्रति (Supabase Auth द्वारा प्रबंधित — हम कभी भी सादे पाठ को नहीं देखते या संग्रहीत नहीं करते); Google के साथ साइन इन करने पर वैकल्पिक प्रदर्शन नाम और अवतार URL।",
              "**सदस्यता स्थिति**: वर्तमान योजना (निःशुल्क / Pro / Business), Stripe ग्राहक पहचानकर्ता, वर्तमान क्रेडिट शेष, और आपके नवीनतम नवीकरण की तिथियाँ।",
              "**उपयोग काउंटर्स**: समेकित कोटा काउंटर्स (उदाहरण के लिए, \"आज 3 AI रन उपयोग किए गए\", \"मासिक 420 AI रन उपयोग किए गए\") आपके प्रोफ़ाइल पंक्ति पर ही अपडेट किए जाते हैं। हम **प्रति-रन रिकॉर्ड लॉग नहीं करते**।",
              "**कार्य मेटाडेटा (अस्थायी)**: जब कोई सर्वर-सहायता प्राप्त उपकरण कोई आउटपुट उत्पन्न करता है (उदाहरण के लिए, प्रतिलेखन से .srt फ़ाइल), तो हम उपकरण का नाम, परिणाम डाउनलोड URL, स्रोत भाषा, और पूर्ण होने का टाइमस्टैम्प रिकॉर्ड करते हैं। ये पंक्तियाँ स्वचालित रूप से **दो (2) घंटे बाद** हटा दी जाती हैं। इनमें कभी भी आपकी फ़ाइल की सामग्री शामिल नहीं होती।",
              "**सहमति रिकॉर्ड्स**: वह तिथि और समय जब आपने इन नियमों और हमारी गोपनीयता नीति को स्वीकार किया, और क्या आपने विपणन ईमेलों के लिए ऑप्ट-इन किया। आपके खाते के विलोपन के बाद पाँच (5) वर्षों तक कानूनी साक्ष्य अवधि सहित खाते के पूरे जीवनकाल के लिए रखा जाता है।",
              "**API कुंजियाँ**: यदि आप सार्वजनिक REST API के लिए कुंजियाँ उत्पन्न करते हैं, तो हम केवल SHA-256 हैश और 12-वर्ण प्रदर्शन उपसर्ग संग्रहीत करते हैं। कच्ची कुंजी आपको निर्माण के समय ठीक एक बार दिखाई जाती है और उसके बाद पुनर्प्राप्त नहीं की जा सकती।"
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
            "text": "जैसा कि अनुभाग 1 में बताया गया है, आप द्वारा संसाधित फ़ाइलों की सामग्री को हम कभी भी बनाए नहीं रखते। सटीक जीवनचक्र इस प्रकार है:"
          },
          {
            "kind": "ul",
            "items": [
              "**ब्राउज़र-केवल उपकरण**: शून्य प्रसारण। फ़ाइल को आपके ब्राउज़र द्वारा स्मृति में पढ़ा जाता है, परिणाम स्थानीय रूप से उत्पन्न होता है, और आप इसे सीधे डाउनलोड करते हैं। हम फ़ाइल के बारे में कुछ भी लॉग नहीं करते।",
              "**AI प्रतिलेखन / अनुवाद / OCR / फ़िशिंग विश्लेषण**: फ़ाइल या पाठ को हमारे Supabase Edge Function पर स्ट्रीम किया जाता है, जो तुरंत इसे संबंधित AI प्रदाता (अनुभाग 7 देखें) पर अनुमान के लिए अग्रेषित करता है। परिणाम आपको वापस कर दिया जाता है और अस्थायी अपलोड बफर तीस (30) मिनट के भीतर हटा दिया जाता है। हमारी निजी संग्रहण बाल्टी में लिखे गए परिणाम फ़ाइलें आपको साठ (60) मिनट के लिए साइन-URL द्वारा सुलभ होती हैं और उत्पन्न होने के तीस (30) मिनट के भीतर भौतिक रूप से हटा दी जाती हैं।",
              "**पासवर्ड उल्लंघन चेकर**: आपका पासवर्ड कभी भी आपके ब्राउज़र से बाहर नहीं जाता। हम इसे स्थानीय रूप से SHA-1 के साथ हैश करते हैं और k-अज्ञातता का उपयोग करते हुए HaveIBeenPwned से पूछताछ करते हैं — केवल हैश के पहले 5 वर्ण भेजे जाते हैं। पासवर्ड और पूर्ण हैश कभी भी प्रसारित नहीं किए जाते।",
              "**URL स्कैनर / SSL चेकर**: केवल वही URL या होस्टनाम जिसे आप टाइप करते हैं प्रसारित किया जाता है (URL स्कैनर के लिए Google Safe Browsing को, या SSL चेकर के लिए एक लाइव TLS कनेक्शन खोलने के लिए)। आस-पास के पृष्ठ की सामग्री नहीं।"
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
              "**कानूनी दायित्व** (Art. 6(1)(c)) — फ्रांस के कर कानून (आमतौर पर दस वर्ष) द्वारा आवश्यक बिलिंग रिकॉर्ड्स की अवधारण।"
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. आपके अधिकार",
        "blocks": [
          {
            "kind": "p",
            "text": "आपके पास पहुँच (Art. 15), सुधार (Art. 16), विलोपन (Art. 17), प्रतिबंध (Art. 18), पोर्टेबिलिटी (Art. 20), आपत्ति (Art. 21) और किसी भी समय सहमति वापस लेने का अधिकार है, जो पूर्व प्रसंस्करण की कानूनीता को प्रभावित नहीं करेगा। आप फ्रांस के CNIL (फ्रांस) या अपने स्थानीय पर्यवेक्षी प्राधिकरण के पास शिकायत दर्ज करने का भी अधिकार रखते हैं। किसी भी अधिकार का प्रयोग करने के लिए, अपने खाते पर पंजीकृत ईमेल से [privacy@konvertools.com](mailto:privacy@konvertools.com) पर ईमेल करें। हम GDPR Art. 12(3) के अनुसार तीस (30) दिनों के भीतर उत्तर देंगे।"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. तृतीय-पक्ष प्रसंस्करणकर्ता",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा प्रदान करने के लिए हमें निम्नलिखित प्रसंस्करणकर्ताओं के साथ सीमित डेटा साझा करने की आवश्यकता होती है। प्रत्येक के पास अपनी स्वयं की गोपनीयता नीति है जो यह नियंत्रित करती है कि वे हमारे द्वारा प्राप्त डेटा को कैसे संभालते हैं।"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (सिंगापुर में निगमित, हमारे प्रोजेक्ट के लिए EU में होस्टेड) — प्रमाणीकरण, डेटाबेस, फ़ाइल संग्रहण, और Edge Functions। आपके खाता क्रेडेंशियल्स, प्रोफ़ाइल डेटा और (अस्थायी रूप से) किसी भी सर्वर-सहायता प्राप्त उपकरण के लिए अपलोड की गई फ़ाइल प्राप्त करता है। हमारे उप-प्रसंस्करणकर्ता के रूप में कार्य करता है।",
              "**Mistral AI** (फ्रांस) — अनुवाद, पुनर्कथन, सारांशीकरण, AI मानवीकरण, फ़िशिंग-पैटर्न विश्लेषण और अन्य पाठ कार्य के लिए बड़े भाषा मॉडल अनुमान; ऑडियो प्रतिलेखन (Voxtral); छवि OCR और Vision कार्य (Pixtral)। आपके द्वारा सबमिट किया गया पाठ या छवि अनुमान के लिए Mistral को भेजा जाता है। Mistral ने **API इनपुट्स का उपयोग अपने मॉडलों को प्रशिक्षित करने के लिए नहीं** करने का अनुबंधात्मक रूप से वचन दिया है।",
              "**Google Safe Browsing** (Google LLC, USA) — केवल जब आप URL स्कैनर या फ़िशिंग डिटेक्टर का उपयोग करते हैं। केवल वही URL जिसे आप सबमिट करते हैं (या ईमेल में पेस्ट किए गए लिंक) प्रसारित किए जाते हैं। यह एकमात्र तृतीय-पक्ष सुरक्षा सेवा है जिसका हम उपयोग करते हैं।",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — केवल जब आप पासवर्ड उल्लंघन चेकर का उपयोग करते हैं, और केवल आपके पासवर्ड के SHA-1 हैश के पहले 5 वर्ण (k-अज्ञातता)। सीधे आपके ब्राउज़र से क्वेरी की जाती है, हमारे सर्वरों के माध्यम से नहीं।",
              "**Stripe** (USA / आयरलैंड) — भुगतान प्रसंस्करण और सदस्यता प्रबंधन। हम **आपके कार्ड विवरण कभी नहीं देखते या संग्रहीत नहीं करते**। Stripe को आपका ईमेल, भुगतान विधि, और आपने खरीदी गई योजना/क्रेडिट-पैक प्राप्त होता है।",
              "**Resend** (USA) — लेन-देन संबंधी ईमेल वितरण (खाता पुष्टि, भुगतान रसीद, पासवर्ड रीसेट)। आपके ईमेल पते और ईमेल निकाय जिसे हम भेजते हैं, प्राप्त करता है।",
              "**Vercel** (USA) — स्थैतिक पृष्ठों के लिए कंटेंट डिलीवरी नेटवर्क। रूटिंग और दुरुपयोग रोकथाम के लिए मानक वेब-ट्रैफ़िक मेटाडेटा (IP, उपयोगकर्ता-एजेंट, अनुरोधित URL) प्राप्त करता है। Vercel की लॉग अवधारण नीति के अनुसार रखा जाता है।"
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
            "text": "हम केवल निम्नलिखित कुकीज़ और स्थानीय-संग्रहण आइटम का उपयोग करते हैं:"
          },
          {
            "kind": "ul",
            "items": [
              "**आवश्यक**: NEXT_LOCALE (आपकी चुनी हुई भाषा को याद रखता है), और Supabase सत्र कुकीज़ (sb-*-auth-token) जब आप साइन इन होते हैं। ये GDPR के तहत सहमति की आवश्यकता नहीं रखते।",
              "**वैकल्पिक विज्ञापन**: यदि और जब हम विज्ञापन भागीदारों (वर्तमान में Ezoic हमारे कोड में संदर्भित है लेकिन अभी तक आपके ट्रैफ़िक के लिए सक्रिय नहीं है) को सक्षम करते हैं, तो हम एक स्पष्ट सहमति बैनर प्रदर्शित करेंगे और केवल तब विज्ञापन कुकीज़ सेट करेंगे जब आप ऑप्ट-इन करेंगे।"
            ]
          },
          {
            "kind": "p",
            "text": "हम वर्तमान में कोई विश्लेषण, ट्रैकिंग पिक्सेल या पुनर्कथन टैग नहीं चलाते। यदि हम कोई जोड़ते हैं, तो ऊपर दिया गया कुकी बैनर उन्हें नियंत्रित करेगा।"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. सुरक्षा",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा में आने-जाने वाला सभी ट्रैफ़िक TLS 1.2 या उच्चतर के साथ एन्क्रिप्टेड है। पासवर्ड Supabase Auth द्वारा Argon2 हैश के रूप में संग्रहीत किए जाते हैं। हम नए पासवर्ड की क्लाइंट-साइड HaveIBeenPwned k-अज्ञातता API के विरुद्ध जाँच करते हैं, ताकि एक ज्ञात-भंग पासवर्ड का उपयोग नहीं किया जा सके। API कुंजियाँ केवल SHA-256 हैश के रूप में संग्रहीत की जाती हैं। डेटाबेस पंक्तियाँ पंक्ति-स्तरीय सुरक्षा नीतियों द्वारा संरक्षित हैं जो यह सुनिश्चित करती हैं कि एक उपयोगकर्ता दूसरे उपयोगकर्ता के डेटा को नहीं पढ़ सकता। इन उपायों के बावजूद, कोई भी प्रणाली पूर्णतः सुरक्षित नहीं है; आप किसी भी ऑनलाइन सेवा के अंतर्निहित जोखिम को स्वीकार करते हैं।"
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. अवधारण",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "प्रोफ़ाइल डेटा: आपके खाते के अस्तित्व के दौरान रखा जाता है, खाता बंद होने के तीस (30) दिनों के भीतर हटा दिया जाता है।",
              "कार्य मेटाडेटा: स्वचालित रूप से दो (2) घंटे बाद हटा दिया जाता है।",
              "संग्रहण बाल्टी में परिणाम फ़ाइलें: उत्पन्न होने के तीस (30) मिनट के भीतर भौतिक रूप से हटा दी जाती हैं।",
              "बिलिंग रिकॉर्ड्स: फ्रांस के कर दायित्वों का पालन करने के लिए दस (10) वर्षों तक बनाए रखे जाते हैं।",
              "सहमति रिकॉर्ड्स: आपके खाते के पूरे जीवनकाल के दौरान और उसके बाद पाँच (5) वर्षों तक कानूनी साक्ष्य के रूप में रखा जाता है।"
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. नाबालिग",
        "blocks": [
          {
            "kind": "p",
            "text": "यह सेवा **सोलह (16) वर्ष से कम उम्र के बच्चों के लिए नहीं है**। यदि आप इस आयु से कम हैं तो आपको खाता नहीं बनाना चाहिए। हम जानबूझकर नाबालिगों से डेटा एकत्र नहीं करते; यदि हमें पता चलता है कि हमने ऐसा किया है, तो हम इसे हटा देंगे।"
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. इस नीति में परिवर्तन",
        "blocks": [
          {
            "kind": "p",
            "text": "हम समय-समय पर इस गोपनीयता नीति में संशोधन कर सकते हैं। महत्वपूर्ण परिवर्तन प्रभावी होने से तीस (30) दिन पहले खाता धारकों को ईमेल द्वारा सूचित किया जाएगा। नवीनतम संस्करण हमेशा [https://konvertools.com/privacy](https://konvertools.com/privacy) पर उपलब्ध होता है।"
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. संपर्क",
        "blocks": [
          {
            "kind": "p",
            "text": "इस नीति या आपके डेटा के बारे में किसी भी प्रश्न के लिए, [privacy@konvertools.com](mailto:privacy@konvertools.com) पर लिखें। आप फ्रांस के डेटा-संरक्षण प्राधिकरण (CNIL, [cnil.fr](https://www.cnil.fr/)) या अपने निवास देश के पर्यवेक्षी प्राधिकरण के पास भी शिकायत दर्ज कर सकते हैं।"
          }
        ]
      }
    ]
  },
  "tr": {
    "h1": "Gizlilik Politikası",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Son güncelleme: %DATE% · Tüm ziyaretçiler ve hesap sahipleri için derhal geçerlidir.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Temel ilkemiz: dosyalarınızı saklamıyoruz",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (\"Hizmet\"), gizliliğe öncelik veren bir araç seti olarak işletilmektedir. Yaptığımız en önemli taahhüt şudur:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tarayıcı içi araçlar** (görüntü dönüştürücüleri, pdf-lib kullanan PDF araçları, FFmpeg.wasm tarafından desteklenen ses ve video dönüştürmeleri, kod araçları, hesap makineleri, QR oluşturucular, parola ihlali denetleyicisi, çoğu yardımcı program) **tamamen WebAssembly aracılığıyla web tarayıcınızın içinde çalışır**. Dosyanız veya girdiniz hiçbir zaman sunucularımıza iletilmez. Onu okumamız için teknik bir yolumuz yoktur.",
              "**Sunucu destekli araçlar** (AI transkripsiyonu, AI çevirisi, AI metin görevleri, video altyazılarını yakma, URL tarayıcısı, phishing denetleyicisi, SSL sertifika denetleyicisi ve diğer bazıları) bir arka uca bir şey göndermeleri gerekir. Her durumda dosya veya metin gerçek zamanlı olarak işlenir ve geçici depolamadan otuz (30) dakika içinde silinir.",
              "Hiçbir yüklenen dosyanın içeriğini kalıcı bir konuma kaydetmeyiz, dosyalarınızı AI modellerinin eğitimi için kullanmayız ve bunları size istediğiniz sonucu teslim etmek dışında herhangi bir amaçla üçüncü taraflara satmayız, kiralamayız veya paylaşmayız."
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
            "text": "Avrupa Birliği Genel Veri Koruma Yönetmeliği (Yönetmelik (AB) 2016/679, \"GDPR\") kapsamında veri sorumlusu Hizmetin yayıncısıdır. Gizlilikle ilgili herhangi bir sorgu için iletişim: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Hesap kimlik bilgileri**: e-posta adresiniz; Supabase Auth tarafından yönetilen, tuzlanmış ve hash'lenmiş bir parola kopyası (açık metni hiç görmeyiz veya saklamayız); Google ile giriş yaparsanız isteğe bağlı gösterim adı ve avatar URL'si.",
              "**Abonelik durumu**: mevcut plan (ücretsiz / Pro / İş), Stripe müşteri tanımlayıcısı, mevcut kredi bakiyesi ve en son yenileme tarihleri.",
              "**Kullanım sayaçları**: profil satırınızda yerinde güncellenen özet kota sayaçları (ör. \"bugün 3 AI çalışması kullanıldı\", \"aylık 420 AI çalışması kullanıldı\"). **Her çalışmanın kayıtlarını değil**, sayaçları saklarız.",
              "**İş meta verileri (geçici)**: bir sunucu destekli araç çıktı ürettiğinde (ör. transkripsiyondan oluşan bir .srt dosyası), araç adı, sonuç indirme URL'si, kaynak dil ve tamamlanma zaman damgasını kaydederiz. Bu satırlar otomatik olarak **iki (2) saat** sonra silinir. Hiçbir zaman dosyanızın içeriğini içermezler.",
              "**Onay kayıtları**: bu Şartları ve Gizlilik Politikamızı kabul ettiğiniz tarih ve saat ile pazarlama e-postalarına katılmayı seçip seçmediğiniz. Hesabınızın silinmesinden sonraki beş (5) yıl boyunca yasal kanıt süresi dahil olmak üzere hesap süresince saklanır.",
              "**API anahtarları**: halka açık REST API için anahtarlar oluşturursanız, yalnızca SHA-256 hash'ini ve 12 karakterlik bir gösterim öneki saklarız. Ham anahtar size yalnızca oluşturulduğunda bir kez gösterilir ve daha sonra kurtarılamaz."
            ]
          },
          {
            "kind": "p",
            "text": "**Toplamıyoruz**: IP adresinizi (yalnızca Supabase ve barındırma sağlayıcımızın hız sınırlaması ve güvenlik günlüğü için geçici kullanımı dışında), tarayıcı parmak izini, davranışsal izleme olaylarını, ekran kayıtlarınızı veya herhangi bir biyometrik veriyi toplamıyoruz."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. İşlediğiniz dosyalar",
        "blocks": [
          {
            "kind": "p",
            "text": "1. bölümde belirtildiği gibi, işlediğiniz dosyaların içeriğini hiçbir şekilde kalıcı olarak saklamayız. Kesin yaşam döngüsü şöyledir:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tarayıcı içi araçlar**: sıfır iletim. Dosya tarayıcınız tarafından belleğe okunur, sonuç yerel olarak üretilir ve doğrudan indirirsiniz. Dosyanın kendisi hakkında hiçbir şeyi kaydetmeyiz.",
              "**AI transkripsiyonu / çevirisi / OCR / phishing analizi**: dosya veya metin, Supabase Edge Function'a akar ve ilgili AI sağlayıcısına (7. bölüme bakınız) gerçek zamanlı olarak iletilir. Sonuç size geri döndürülür ve geçici yükleme arabelleği çıkarılır. Özel depolama alanımıza yazılan sonuç dosyaları altmış (60) dakika boyunca imzalı URL ile erişilebilir ve fiziksel olarak otuz (30) dakika içinde silinir.",
              "**Parola ihlali denetleyicisi**: parolanız hiçbir zaman tarayıcınızı terk etmez. Yerel olarak SHA-1 ile hash'lenir ve k-anonimlik kullanılarak HaveIBeenPwned'e sorgulanır — yalnızca hash'in ilk 5 karakteri gönderilir. Parola ve tam hash hiçbir zaman iletilmez.",
              "**URL tarayıcısı / SSL denetleyicisi**: yalnızca yazdığınız URL veya ana makine adı iletilir (URL tarayıcısı için Google Safe Browsing'e, SSL denetleyicisi için canlı TLS bağlantısı açmak üzere). Çevre sayfa içerikleri değil."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. İşlemenin hukuki dayanakları (GDPR Mad. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Sözleşmenin ifası** (Mad. 6(1)(b)) — hesap oluşturduğunuzda ve ücretli özellikleri kullandığınızda, Hizmeti sunmak için işleme gerekli olur.",
              "**Meşru menfaatler** (Mad. 6(1)(f)) — dolandırıcılık önleme, kötüye kullanım azaltma, temel güvenlik günlüğü ve Hizmeti iyileştirme.",
              "**Onay** (Mad. 6(1)(a)) — pazarlama e-postaları, isteğe bağlı analiz veya reklam çerezleri (etkinleştirildiğinde) ve gelecekteki isteğe bağlı entegrasyonlar.",
              "**Yasal yükümlülük** (Mad. 6(1)(c)) — Fransız vergi hukukunca gerekli olduğu üzere fatura kayıtlarının on yıl süreyle saklanması."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Haklarınız",
        "blocks": [
          {
            "kind": "p",
            "text": "Erişim hakkına (Mad. 15), düzeltme hakkına (Mad. 16), silinme hakkına (Mad. 17), kısıtlama hakkına (Mad. 18), taşınabilirlik hakkına (Mad. 20), itiraz hakkına (Mad. 21) ve herhangi bir zamanda onayınızı geri çekme hakkına sahipsiniz ve bu işlemin hukuka uygunluğunu etkilemeden önceki işlemler için de geçerlidir. Ayrıca Fransa'daki CNIL'e (Commission nationale de l'informatique et des libertés) veya yerel denetim kurumunuza şikayette bulunma hakkına da sahipsiniz. Herhangi bir hakkınızı kullanmak için, hesabınıza kayıtlı e-posta adresinden [privacy@konvertools.com](mailto:privacy@konvertools.com) adresine e-posta gönderin. GDPR Mad. 12(3) uyarınca otuz (30) gün içinde yanıt vereceğiz."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Üçüncü taraf işleyiciler",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmetin sunulması için aşağıdaki işleyicilerle sınırlı verileri paylaşmamız gerekmektedir. Her birinin, bizden aldıkları verileri nasıl işlediklerini düzenleyen kendi gizlilik politikası bulunmaktadır."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (Singapur'da kurulu, projemiz için AB'de barındırılan) — kimlik doğrulama, veritabanı, dosya depolama ve Edge Functions. Hesap kimlik bilgilerinizi, profil verilerinizi ve sunucu destekli bir araç için yüklediğiniz herhangi bir dosyayı (geçici olarak) alır. Alt işleyicimiz olarak hareket eder.",
              "**Mistral AI** (Fransa) — çeviri, yeniden ifade etme, özetleme, AI insanlaştırma, phishing kalıbı analizi ve diğer metin görevleri için büyük dil modeli çıkarımı; ses transkripsiyonu (Voxtral); görüntü OCR ve Vision görevleri (Pixtral). Gönderdiğiniz metin veya görüntü, çıkarım için Mistral'e gönderilir. Mistral, API girdilerini modellerinin eğitimi için kullanmayacağına dair sözleşmesel taahhütte bulunmuştur.",
              "**Google Safe Browsing** (Google LLC, ABD) — yalnızca URL Tarayıcısını veya Phishing Denetleyicisini kullandığınızda. Yalnızca gönderdiğiniz URL'ler (veya yapıştırdığınız e-postadan çıkarılan bağlantılar) iletilir. Kullandığımız tek üçüncü taraf güvenlik hizmeti budur.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — yalnızca Parola İhlali Denetleyicisini kullandığınızda ve yalnızca parolanızın SHA-1 hash'inin ilk 5 karakteri (k-anonimlik) gönderilir. Tarayıcınızdan doğrudan sorgulanır, sunucularımız üzerinden değil.",
              "**Stripe** (ABD / İrlanda) — ödeme işleme ve abonelik yönetimi. **Kart detaylarını hiç görmeyiz veya saklamayız**. Stripe, e-posta adresinizi, ödeme yönteminizi ve satın aldığınız plan/puan paketini alır.",
              "**Resend** (ABD) — işlemsel e-posta teslimi (hesap onayı, ödeme fişi, parola sıfırlama). E-posta adresinizi ve gönderdiğimiz e-posta içeriğini alır.",
              "**Vercel** (ABD) — statik sayfalar için içerik dağıtım ağı. Yönlendirme ve kötüye kullanım önleme için standart web trafiği meta verilerini (IP, kullanıcı aracısı, istenen URL) alır. Vercel'in günlük saklama politikasına uygun olarak saklanır."
            ]
          },
          {
            "kind": "p",
            "text": "Bu işleyicilerden herhangi biri Avrupa Ekonomik Alanı dışında faaliyet gösteriyorsa, aktarımlar Avrupa Komisyonu'nun Standart Sözleşme Maddeleri (SCCs) veya eşdeğer bir aktarım mekanizması tarafından düzenlenir."
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
              "**Zorunlu**: NEXT_LOCALE (seçtiğiniz dili hatırlar) ve oturum açtığınızda Supabase oturum çerezleri (sb-*-auth-token). Bunlar GDPR kapsamında onay gerektirmez.",
              "**İsteğe bağlı reklamcılık**: reklam ortaklarımızı etkinleştirdiğimizde (şu anda kodumuzda Ezoic referans verilmekte ancak trafiğiniz için henüz etkinleştirilmemiştir), açık bir onay banner'ı görüntüleyecek ve yalnızca katılmayı seçtiğinizde reklam çerezleri ayarlayacağız."
            ]
          },
          {
            "kind": "p",
            "text": "Şu anda herhangi bir analiz, izleme pikselleri veya yeniden pazarlama etiketleri çalıştırmıyoruz. Eğer eklersek, yukarıdaki çerez banner'ı bunları engelleyecektir."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Güvenlik",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmete giden ve hizmetten gelen tüm trafik TLS 1.2 veya üzeri ile şifrelenmiştir. Parolalar Supabase Auth tarafından Argon2 hash'leri olarak saklanır. Yeni parolaları müşteri tarafında HaveIBeenPwned'un halka açık k-anonimlik API'sine karşı kontrol ederiz, böylece bilinen ihlal edilmiş bir parola kullanılamaz. API anahtarları yalnızca SHA-256 hash'leri olarak saklanır. Veritabanı satırları, bir kullanıcının başka bir kullanıcının verilerini okuyamamasını sağlayan satır düzeyinde güvenlik politikalarıyla korunur. Bu önlemler rağmen, hiçbir sistem mükemmel güvenlikte değildir; herhangi bir çevrimiçi hizmette bulunan kalıntı riski kabul edersiniz."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Saklama",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profil verileri: hesabınız var oldukça saklanır, hesabın kapatılmasından otuz (30) gün içinde silinir.",
              "İş meta verileri: otomatik olarak iki (2) saat sonra silinir.",
              "Depolama alanındaki sonuç dosyaları: oluşturulduktan otuz (30) dakika içinde fiziksel olarak silinir.",
              "Fatura kayıtları: Fransız vergi yükümlülüklerine uygunluk için on (10) yıl boyunca saklanır.",
              "Onay kayıtları: hesabınızın süresi boyunca ve ardından beş (5) yıl daha yasal kanıt olarak saklanır."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Reşit olmayanlar",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet **on altı (16) yaşın altındaki çocuklara yönelik değildir**. On altı yaşın altında iseniz hesap oluşturamazsınız. Küçüklerden veri toplamadığımızı biliyoruz; eğer farkında olmadan topladığımız tespit edilirse, verileri sileceğiz."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Bu politikanın değişiklikleri",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Gizlilik Politikasını zaman zaman değiştirebiliriz. Önemli değişiklikler, yürürlüğe girmesinden en az otuz (30) gün önce hesap sahiplerine e-posta yoluyla duyurulacaktır. En güncel versiyon her zaman [https://konvertools.com/privacy](https://konvertools.com/privacy) adresinde bulunabilir."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. İletişim",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu politika veya verileriniz hakkında herhangi bir sorunuz varsa, [privacy@konvertools.com](mailto:privacy@konvertools.com) adresine yazın. Ayrıca Fransız veri koruma kurumu CNIL'e ([cnil.fr](https://www.cnil.fr/)) veya ikamet ettiğiniz ülkenin denetim kurumuna şikayette bulunabilirsiniz."
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
            "text": "Konvertools (disebut sebagai \"Layanan\") dioperasikan sebagai rangkaian alat yang mengutamakan privasi. Komitmen terpenting yang kami buat adalah sebagai berikut:"
          },
          {
            "kind": "ul",
            "items": [
              "**Alat berbasis peramban** (konverter gambar, alat PDF yang menggunakan pdf-lib, konversi audio dan video yang didukung oleh FFmpeg.wasm, alat kode, kalkulator, pembuat kode QR, pemeriksa kebocoran kata sandi, sebagian besar utilitas) berjalan **sepenuhnya di dalam peramban web Anda melalui WebAssembly**. File atau masukan Anda tidak pernah dikirimkan ke server kami. Kami tidak memiliki sarana teknis untuk membacanya.",
              "**Alat berbantuan server** (transkripsi AI, terjemahan AI, tugas teks AI, pembakaran subtitle video, pemindai URL, detektor phishing, pemeriksa sertifikat SSL dan sejumlah alat lainnya) memerlukan pengiriman sesuatu ke backend. Dalam setiap kasus, file atau teks diproses secara waktu nyata dan dihapus dari penyimpanan sementara dalam tiga puluh (30) menit.",
              "Kami tidak pernah menyimpan konten dari file yang diunggah di lokasi mana pun secara persisten, tidak pernah menggunakan unggahan Anda untuk melatih model AI, serta tidak pernah menjual, menyewakan, atau membagikannya kepada pihak ketiga untuk tujuan apa pun selain menyampaikan hasil yang Anda minta."
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
            "text": "Untuk kepentingan Peraturan Umum Perlindungan Data Uni Eropa (Regulation (EU) 2016/679, \"GDPR\"), pengendali data adalah penerbit Layanan. Hubungi untuk pertanyaan privasi apa pun: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Data yang kami kumpulkan",
        "blocks": [
          {
            "kind": "p",
            "text": "Satu-satunya data pribadi yang kami simpan secara persisten dalam database kami adalah:"
          },
          {
            "kind": "ul",
            "items": [
              "**Kredensial akun**: alamat email Anda; salinan kata sandi Anda yang diberi garam dan di-hash (dikelola oleh Supabase Auth — kami tidak pernah melihat atau menyimpan teks asli); nama tampilan opsional dan URL avatar jika Anda masuk menggunakan Google.",
              "**Status langganan**: rencana saat ini (gratis / Pro / Bisnis), pengidentifikasi pelanggan Stripe, saldo kredit saat ini, serta tanggal pembaruan langganan terakhir Anda.",
              "**Penghitung penggunaan**: penghitung kuota teragregasi (mis. \"3 penggunaan AI hari ini\", \"420 penggunaan AI bulanan\") yang diperbarui di baris profil Anda. Kami **tidak mencatat** catatan per penggunaan.",
              "**Metadata pekerjaan (sementara)**: ketika alat berbantuan server menghasilkan keluaran (mis. file .srt dari transkripsi), kami mencatat nama alat, URL unduhan hasil, bahasa sumber, serta waktu penyelesaian. Baris ini secara otomatis dihapus setelah **dua (2) jam**. Baris tersebut tidak pernah berisi konten file Anda.",
              "**Catatan persetujuan**: tanggal dan waktu saat Anda menerima Ketentuan dan Kebijakan Privasi kami, serta apakah Anda memilih untuk menerima email pemasaran. Disimpan selama masa akun Anda ditambah periode bukti hukum lima (5) tahun setelah penghapusan.",
              "**Kunci API**: jika Anda membuat kunci untuk API REST publik, kami hanya menyimpan hash SHA-256 dan awalan tampilan 12 karakter. Kunci mentah ditampilkan kepada Anda tepat sekali pada saat pembuatan dan tidak dapat dipulihkan lagi setelahnya."
            ]
          },
          {
            "kind": "p",
            "text": "Kami **tidak mengumpulkan**: alamat IP Anda (selain penggunaan sementara yang dilakukan Supabase dan penyedia hosting kami untuk pembatasan laju dan pencatatan keamanan), sidik jari peramban, peristiwa pelacakan perilaku, rekaman layar Anda, atau data biometrik apa pun."
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
              "**Transkripsi / terjemahan / OCR / analisis phishing AI**: file atau teks dialirkan ke Fungsi Tepi Supabase kami, yang segera meneruskannya ke penyedia AI terkait (lihat bagian 7) untuk inferensi. Hasil dikembalikan kepada Anda dan buffer unggahan sementara dibuang. File hasil yang ditulis ke bucket penyimpanan pribadi kami dapat diakses melalui URL tertandatangani selama enam puluh (60) menit dan secara fisik dihapus dalam tiga puluh (30) menit setelah pembuatan.",
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
              "**Persetujuan** (Pasal 6(1)(a)) — email pemasaran, cookie analitik atau iklan opsional (jika dan ketika diaktifkan), serta integrasi opsional apa pun di masa depan.",
              "**Kewajiban hukum** (Pasal 6(1)(c)) — penyimpanan catatan penagihan sebagaimana diwajibkan oleh hukum pajak Prancis (umumnya sepuluh tahun)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Hak Anda",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda memiliki hak akses (Pasal 15), perbaikan (Pasal 16), penghapusan (Pasal 17), pembatasan (Pasal 18), portabilitas (Pasal 20), keberatan (Pasal 21), serta untuk menarik persetujuan kapan saja tanpa memengaruhi keabsahan pemrosesan sebelumnya. Anda juga memiliki hak untuk mengajukan keluhan kepada CNIL (Prancis) atau otoritas pengawas lokal Anda. Untuk menggunakan hak apa pun, kirim email ke [privacy@konvertools.com](mailto:privacy@konvertools.com) dari alamat yang terdaftar di akun Anda. Kami akan menanggapi dalam tiga puluh (30) hari, sebagaimana disyaratkan oleh GDPR Pasal 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Pemroses pihak ketiga",
        "blocks": [
          {
            "kind": "p",
            "text": "Penyampaian Layanan mengharuskan kami untuk membagikan data yang sangat terbatas dengan pemroses berikut. Masing-masing memiliki kebijakan privasi sendiri yang mengatur cara mereka menangani data yang mereka terima dari kami."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (berbadan hukum Singapura, dihosting di UE untuk proyek kami) — otentikasi, basis data, penyimpanan file, dan Fungsi Tepi. Menerima kredensial akun, data profil, dan (sementara) file apa pun yang Anda unggah untuk alat berbantuan server. Bertindak sebagai sub-pemroses kami.",
              "**Mistral AI** (Prancis) — inferensi model bahasa besar untuk terjemahan, pengubahan kalimat, ringkasan, humanisasi AI, analisis pola phishing, serta tugas teks lainnya; transkripsi audio (Voxtral); OCR gambar dan tugas Vision (Pixtral). Teks atau gambar yang Anda kirimkan dikirimkan ke Mistral untuk inferensi. Mistral telah berkomitmen secara kontraktual untuk **tidak menggunakan masukan API untuk melatih modelnya**.",
              "**Google Safe Browsing** (Google LLC, AS) — hanya ketika Anda menggunakan Pemindai URL atau Detektor Phishing. Hanya URL yang Anda kirim (atau tautan yang diekstrak dari email yang Anda tempel) yang ditransmisikan. Ini adalah satu-satunya layanan keamanan pihak ketiga yang kami gunakan.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — hanya ketika Anda menggunakan Pemeriksa Kebocoran Kata Sandi, dan hanya lima karakter pertama dari hash SHA-1 kata sandi Anda (k-anonymity). Dikueri langsung dari peramban Anda, bukan melalui server kami.",
              "**Stripe** (AS / Irlandia) — pemrosesan pembayaran dan manajemen langganan. Kami **tidak pernah melihat atau menyimpan** detail kartu Anda. Stripe menerima email, metode pembayaran, serta paket/langganan yang Anda beli.",
              "**Resend** (AS) — pengiriman email transaksional (konfirmasi akun, tanda terima pembayaran, reset kata sandi). Menerima alamat email dan badan email yang kami kirim.",
              "**Vercel** (AS) — jaringan pengiriman konten untuk halaman statis. Menerima metadata lalu lintas web standar (IP, agen pengguna, URL yang diminta) untuk perutean dan pencegahan penyalahgunaan. Disimpan sesuai dengan kebijakan retensi log Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Di mana pun pemroses ini beroperasi di luar Kawasan Ekonomi Eropa, transfer diatur oleh Klausul Kontrak Standar (SCCs) Komisi Eropa atau mekanisme transfer yang setara."
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
              "**Esensial**: NEXT_LOCALE (mengingat bahasa pilihan Anda), serta cookie sesi Supabase (sb-*-auth-token) saat Anda masuk. Ini tidak memerlukan persetujuan menurut GDPR.",
              "**Iklan opsional**: jika dan ketika kami mengaktifkan mitra iklan (saat ini Ezoic dirujuk dalam kode kami tetapi belum diaktifkan untuk lalu lintas Anda), kami akan menampilkan banner persetujuan yang jelas dan hanya menetapkan cookie iklan setelah Anda memilih untuk menerimanya."
            ]
          },
          {
            "kind": "p",
            "text": "Saat ini kami tidak menjalankan analitik, pixel pelacakan, atau tag remarketing apa pun. Jika kami menambahkannya, banner cookie di atas akan mengaturnya."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Keamanan",
        "blocks": [
          {
            "kind": "p",
            "text": "Seluruh lalu lintas ke dan dari Layanan dienkripsi dengan TLS 1.2 atau lebih tinggi. Kata sandi disimpan sebagai hash Argon2 oleh Supabase Auth. Kami memeriksa kata sandi baru terhadap API publik HaveIBeenPwned k-anonymity di sisi klien, sehingga kata sandi yang diketahui bocor tidak dapat digunakan. Kunci API disimpan hanya sebagai hash SHA-256. Baris basis data dilindungi oleh kebijakan keamanan tingkat baris yang memastikan satu pengguna tidak dapat membaca data pengguna lain. Meskipun ada langkah-langkah ini, tidak ada sistem yang benar-benar aman; Anda menerima risiko residual yang melekat pada layanan online apa pun."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Retensi",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Data profil: disimpan selama akun Anda ada, dihapus dalam tiga puluh (30) hari setelah penutupan akun.",
              "Metadata pekerjaan: secara otomatis dihapus setelah dua (2) jam.",
              "File hasil di bucket penyimpanan: secara fisik dihapus dalam tiga puluh (30) menit setelah pembuatan.",
              "Catatan penagihan: disimpan selama sepuluh (10) tahun untuk mematuhi kewajiban pajak Prancis.",
              "Catatan persetujuan: disimpan selama masa akun Anda ditambah lima (5) tahun setelahnya sebagai bukti hukum."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Anak di bawah umur",
        "blocks": [
          {
            "kind": "p",
            "text": "Layanan **tidak ditujukan untuk anak di bawah enam belas (16) tahun**. Jika Anda berada di bawah usia tersebut, Anda dilarang membuat akun. Kami tidak dengan sengaja mengumpulkan data dari anak di bawah umur; jika kami mengetahui hal tersebut, kami akan menghapusnya."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Perubahan pada kebijakan ini",
        "blocks": [
          {
            "kind": "p",
            "text": "Kami dapat mengubah Kebijakan Privasi ini sewaktu-waktu. Perubahan substansial akan diumumkan melalui email kepada pemegang akun setidaknya tiga puluh (30) hari sebelum berlaku. Versi terbaru selalu tersedia di [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Kontak",
        "blocks": [
          {
            "kind": "p",
            "text": "Untuk pertanyaan apa pun mengenai kebijakan ini atau data Anda, tulis ke [privacy@konvertools.com](mailto:privacy@konvertools.com). Anda juga dapat mengajukan keluhan kepada otoritas perlindungan data Prancis (CNIL, [cnil.fr](https://www.cnil.fr/)) atau otoritas pengawas negara tempat tinggal Anda."
          }
        ]
      }
    ]
  },
  "vi": {
    "h1": "Chính sách Bảo mật",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Cập nhật lần cuối: %DATE% · Có hiệu lực ngay lập tức đối với tất cả khách truy cập và người dùng tài khoản.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Nguyên tắc cốt lõi của chúng tôi: chúng tôi không lưu trữ tệp của bạn",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (dịch vụ \"Dịch vụ\") được vận hành như một bộ công cụ ưu tiên quyền riêng tư. Cam kết quan trọng nhất mà chúng tôi đưa ra là:"
          },
          {
            "kind": "ul",
            "items": [
              "**Công cụ chỉ chạy trên trình duyệt** (công cụ chuyển đổi hình ảnh, công cụ PDF sử dụng pdf-lib, chuyển đổi âm thanh và video bằng FFmpeg.wasm, công cụ mã, máy tính, tạo mã QR, công cụ kiểm tra vi phạm mật khẩu, hầu hết tiện ích) hoạt động **hoàn toàn trong trình duyệt web của bạn thông qua WebAssembly**. Tệp hoặc dữ liệu đầu vào của bạn không bao giờ được truyền đến máy chủ của chúng tôi. Chúng tôi không có phương tiện kỹ thuật nào để đọc nó.",
              "**Công cụ hỗ trợ từ máy chủ** (chuyển ngữ AI, dịch thuật AI, tác vụ văn bản AI, chèn phụ đề video, trình quét URL, trình phát hiện lừa đảo, trình kiểm tra chứng chỉ SSL và một số công cụ khác) cần gửi dữ liệu đến hệ thống phụ trợ. Trong mọi trường hợp, tệp hoặc văn bản được xử lý theo thời gian thực và bị xóa khỏi bộ nhớ tạm trong vòng ba mươi (30) phút.",
              "Chúng tôi không bao giờ lưu trữ nội dung của bất kỳ tệp nào được tải lên tại bất kỳ vị trí bền vững nào, không bao giờ sử dụng dữ liệu tải lên của bạn để đào tạo mô hình AI, và không bao giờ bán, cho thuê hoặc chia sẻ chúng với bên thứ ba vì bất kỳ mục đích nào ngoài việc cung cấp kết quả bạn yêu cầu."
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
            "text": "Theo quy định của Quy định chung về bảo vệ dữ liệu của EU (Quy định (EU) 2016/679, \"GDPR\"), đơn vị kiểm soát dữ liệu là nhà xuất bản Dịch vụ. Liên hệ cho bất kỳ yêu cầu bảo mật nào: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Dữ liệu chúng tôi thu thập",
        "blocks": [
          {
            "kind": "p",
            "text": "Dữ liệu cá nhân duy nhất mà chúng tôi lưu trữ trong cơ sở dữ liệu của mình là:"
          },
          {
            "kind": "ul",
            "items": [
              "**Thông tin đăng nhập tài khoản**: địa chỉ email của bạn; bản sao băm có muối của mật khẩu (được quản lý bởi Supabase Auth — chúng tôi không bao giờ nhìn thấy hoặc lưu trữ mật khẩu dạng văn bản thuần); tên hiển thị tùy chọn và URL hình đại diện nếu bạn đăng nhập bằng Google.",
              "**Trạng thái đăng ký**: gói hiện tại (miễn phí / Pro / Business), định danh khách hàng Stripe, số dư tín dụng hiện tại và ngày gia hạn gần nhất của bạn.",
              "**Bộ đếm sử dụng**: bộ đếm hạn ngạch đã tổng hợp (ví dụ: \"3 lượt chạy AI hôm nay\", \"420 lượt chạy AI hàng tháng đã sử dụng\") được cập nhật tại chỗ trên hàng hồ sơ của bạn. Chúng tôi **không** ghi lại hồ sơ theo từng lượt chạy.",
              "**Siêu dữ liệu công việc (tạm thời)**: khi một công cụ hỗ trợ từ máy chủ tạo ra đầu ra (ví dụ: tệp .srt từ chuyển ngữ), chúng tôi ghi lại tên công cụ, URL tải xuống kết quả, ngôn ngữ nguồn và dấu thời gian hoàn thành. Các hàng này được tự động xóa sau **hai (2) giờ**. Chúng không bao giờ chứa nội dung tệp của bạn.",
              "**Hồ sơ sự đồng thuận**: ngày và giờ bạn chấp nhận Điều khoản và Chính sách Bảo mật của chúng tôi, cũng như liệu bạn có chọn tham gia email tiếp thị hay không. Được lưu giữ trong suốt thời gian tồn tại tài khoản của bạn cộng với khoảng thời gian bằng chứng pháp lý là năm (5) năm sau khi xóa.",
              "**Khóa API**: nếu bạn tạo khóa cho API REST công khai, chúng tôi chỉ lưu trữ băm SHA-256 và tiền tố hiển thị gồm 12 ký tự. Khóa thô được hiển thị cho bạn chính xác một lần khi tạo và không thể khôi phục sau đó."
            ]
          },
          {
            "kind": "p",
            "text": "Chúng tôi **không** thu thập: địa chỉ IP của bạn (ngoài việc sử dụng tạm thời Supabase và nhà cung cấp dịch vụ lưu trữ của chúng tôi cho mục đích giới hạn tốc độ và ghi nhật ký bảo mật), dấu vân tay trình duyệt, sự kiện theo dõi hành vi, ghi hình màn hình của bạn hoặc bất kỳ dữ liệu sinh trắc học nào."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Tệp bạn xử lý",
        "blocks": [
          {
            "kind": "p",
            "text": "Như đã nêu trong mục 1, nội dung của các tệp bạn xử lý không bao giờ được chúng tôi lưu trữ. Vòng đời chính xác như sau:"
          },
          {
            "kind": "ul",
            "items": [
              "**Công cụ chỉ chạy trên trình duyệt**: không truyền tải. Tệp được đọc vào bộ nhớ bởi trình duyệt của bạn, kết quả được tạo cục bộ và bạn tải xuống trực tiếp. Chúng tôi không ghi nhật ký bất cứ điều gì về tệp đó.",
              "**Chuyển ngữ / dịch thuật / OCR / phân tích lừa đảo bằng AI**: tệp hoặc văn bản được truyền theo luồng đến Edge Function của Supabase của chúng tôi, chức năng này ngay lập tức chuyển tiếp đến nhà cung cấp AI liên quan (xem mục 7) để suy luận. Kết quả được trả về cho bạn và bộ đệm tải lên tạm thời bị loại bỏ. Các tệp kết quả được ghi vào bộ lưu trữ riêng tư của chúng tôi có thể truy cập qua URL ký kết trong sáu mươi (60) phút và bị xóa vật lý trong vòng ba mươi (30) phút sau khi tạo.",
              "**Công cụ kiểm tra vi phạm mật khẩu**: mật khẩu của bạn không bao giờ rời khỏi trình duyệt. Chúng tôi băm nó cục bộ bằng SHA-1 và truy vấn HaveIBeenPwned bằng phương pháp k-anonymity — chỉ năm (5) ký tự đầu tiên của băm được gửi. Mật khẩu và băm đầy đủ không bao giờ được truyền tải.",
              "**Trình quét URL / trình kiểm tra SSL**: chỉ URL hoặc tên máy chủ bạn nhập được truyền tải (đến Google Safe Browsing cho trình quét URL, hoặc được sử dụng để mở kết nối TLS trực tiếp cho trình kiểm tra SSL). Không có nội dung trang xung quanh."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Cơ sở pháp lý cho xử lý (GDPR Điều 6)",
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
        "title": "6. Quyền của bạn",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn có các quyền truy cập (Điều 15), chỉnh sửa (Điều 16), xóa (Điều 17), hạn chế (Điều 18), di chuyển dữ liệu (Điều 20), phản đối (Điều 21) và rút sự đồng thuận bất kỳ lúc nào mà không ảnh hưởng đến tính hợp pháp của quá trình xử lý trước đó. Bạn cũng có quyền khiếu nại lên CNIL (Pháp) hoặc cơ quan giám sát địa phương của mình. Để thực hiện bất kỳ quyền nào, hãy gửi email đến [privacy@konvertools.com](mailto:privacy@konvertools.com) từ địa chỉ đã đăng ký trên tài khoản của bạn. Chúng tôi sẽ phản hồi trong vòng ba mươi (30) ngày, theo yêu cầu của GDPR Điều 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Nhà cung cấp dịch vụ bên thứ ba",
        "blocks": [
          {
            "kind": "p",
            "text": "Để cung cấp Dịch vụ, chúng tôi phải chia sẻ dữ liệu hạn chế với các nhà cung cấp dịch vụ bên thứ ba sau đây. Mỗi nhà cung cấp có chính sách bảo mật riêng điều chỉnh cách họ xử lý dữ liệu nhận được từ chúng tôi."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (đăng ký tại Singapore, lưu trữ tại EU cho dự án của chúng tôi) — xác thực, cơ sở dữ liệu, lưu trữ tệp và Edge Functions. Nhận thông tin đăng nhập tài khoản, dữ liệu hồ sơ và (tạm thời) bất kỳ tệp nào bạn tải lên cho công cụ hỗ trợ từ máy chủ. Đóng vai trò là nhà cung cấp phụ của chúng tôi.",
              "**Mistral AI** (Pháp) — suy luận mô hình ngôn ngữ lớn cho dịch thuật, diễn đạt lại, tóm tắt, công cụ nhân hóa AI, phân tích mẫu lừa đảo và các tác vụ văn bản khác; chuyển ngữ âm thanh (Voxtral); OCR hình ảnh và tác vụ thị giác (Pixtral). Văn bản hoặc hình ảnh bạn gửi được gửi đến Mistral để suy luận. Mistral đã cam kết theo hợp đồng **không** sử dụng đầu vào API để đào tạo mô hình của mình.",
              "**Google Safe Browsing** (Google LLC, Hoa Kỳ) — chỉ khi bạn sử dụng Trình quét URL hoặc Trình phát hiện lừa đảo. Chỉ các URL bạn gửi (hoặc liên kết trích xuất từ email bạn dán) được truyền tải. Đây là dịch vụ bảo mật bên thứ ba duy nhất mà chúng tôi sử dụng.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — chỉ khi bạn sử dụng Công cụ kiểm tra vi phạm mật khẩu, và chỉ năm (5) ký tự đầu tiên của băm SHA-1 mật khẩu của bạn (phương pháp k-anonymity). Truy vấn trực tiếp từ trình duyệt của bạn, không thông qua máy chủ của chúng tôi.",
              "**Stripe** (Hoa Kỳ / Ireland) — xử lý thanh toán và quản lý đăng ký. Chúng tôi **không bao giờ nhìn thấy hoặc lưu trữ** chi tiết thẻ của bạn. Stripe nhận địa chỉ email, phương thức thanh toán và gói/tín dụng bạn đã mua.",
              "**Resend** (Hoa Kỳ) — cung cấp email giao dịch (xác nhận tài khoản, biên lai thanh toán, đặt lại mật khẩu). Nhận địa chỉ email của bạn và nội dung email mà chúng tôi gửi.",
              "**Vercel** (Hoa Kỳ) — mạng phân phối nội dung cho các trang tĩnh. Nhận siêu dữ liệu lưu lượng web tiêu chuẩn (IP, user-agent, URL được yêu cầu) để định tuyến và ngăn chặn lạm dụng. Được lưu giữ theo chính sách lưu giữ nhật ký của Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Bất kỳ nhà cung cấp nào trong số này hoạt động bên ngoài Khu vực Kinh tế Châu Âu, việc chuyển dữ liệu được điều chỉnh bởi Các điều khoản hợp đồng tiêu chuẩn (SCCs) của Ủy ban Châu Âu hoặc cơ chế chuyển tương đương."
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
              "**Quảng cáo tùy chọn**: nếu và khi chúng tôi kích hoạt đối tác quảng cáo (hiện tại Ezoic được tham chiếu trong mã của chúng tôi nhưng chưa được kích hoạt cho lưu lượng truy cập của bạn), chúng tôi sẽ hiển thị biểu ngữ đồng thuận rõ ràng và chỉ đặt cookie quảng cáo sau khi bạn chọn tham gia."
            ]
          },
          {
            "kind": "p",
            "text": "Hiện tại chúng tôi không chạy bất kỳ phân tích, pixel theo dõi hoặc thẻ tiếp thị lại nào. Nếu chúng tôi bổ sung bất kỳ tính năng nào, biểu ngữ cookie trên sẽ kiểm soát chúng."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Bảo mật",
        "blocks": [
          {
            "kind": "p",
            "text": "Tất cả lưu lượng truy cập đến và đi từ Dịch vụ đều được mã hóa bằng TLS 1.2 trở lên. Mật khẩu được lưu trữ dưới dạng băm Argon2 bởi Supabase Auth. Chúng tôi kiểm tra mật khẩu mới chống lại API công khai HaveIBeenPwned k-anonymity phía máy khách, do đó mật khẩu bị vi phạm đã biết không thể được sử dụng. Khóa API chỉ được lưu trữ dưới dạng băm SHA-256. Các hàng trong cơ sở dữ liệu được bảo vệ bởi chính sách bảo mật cấp hàng đảm bảo người dùng này không thể đọc dữ liệu của người dùng khác. Bất chấp các biện pháp này, không hệ thống nào hoàn toàn an toàn; bạn chấp nhận rủi ro vốn có của bất kỳ dịch vụ trực tuyến nào."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Lưu giữ dữ liệu",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dữ liệu hồ sơ: được lưu giữ trong khi tài khoản của bạn tồn tại, xóa trong vòng ba mươi (30) ngày sau khi đóng tài khoản.",
              "Siêu dữ liệu công việc: tự động xóa sau hai (2) giờ.",
              "Tệp kết quả trong bộ lưu trữ: bị xóa vật lý trong vòng ba mươi (30) phút sau khi tạo.",
              "Hồ sơ thanh toán: được lưu giữ trong mười (10) năm để tuân thủ nghĩa vụ thuế của Pháp.",
              "Hồ sơ sự đồng thuận: được lưu giữ trong suốt thời gian tồn tại tài khoản của bạn cộng với năm (5) năm sau đó như bằng chứng pháp lý."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Trẻ vị thành niên",
        "blocks": [
          {
            "kind": "p",
            "text": "Dịch vụ **không hướng đến trẻ em dưới mười sáu (16) tuổi**. Nếu bạn dưới độ tuổi đó, bạn không được tạo tài khoản. Chúng tôi không biếtingly thu thập dữ liệu từ trẻ vị thành niên; nếu chúng tôi phát hiện ra điều đó, chúng tôi sẽ xóa dữ liệu đó."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Thay đổi đối với chính sách này",
        "blocks": [
          {
            "kind": "p",
            "text": "Chúng tôi có thể sửa đổi Chính sách Bảo mật này theo thời gian. Những thay đổi quan trọng sẽ được thông báo qua email cho người dùng tài khoản ít nhất ba mươi (30) ngày trước khi chúng có hiệu lực. Phiên bản mới nhất luôn có sẵn tại [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Liên hệ",
        "blocks": [
          {
            "kind": "p",
            "text": "Mọi thắc mắc về chính sách này hoặc dữ liệu của bạn, hãy viết thư đến [privacy@konvertools.com](mailto:privacy@konvertools.com). Bạn cũng có thể khiếu nại lên Cơ quan bảo vệ dữ liệu Pháp (CNIL, [cnil.fr](https://www.cnil.fr/)) hoặc cơ quan giám sát của quốc gia cư trú của bạn."
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
        "title": "1. Vår grundprincip: vi lagrar inte dina filer",
        "blocks": [
          {
            "kind": "p",
            "text": "Tjänsten Konvertools (nedan kallad \"Tjänsten\") drivs som en integritetsfokuserad verktygslåda. Det viktigaste åtagandet vi gör är följande:"
          },
          {
            "kind": "ul",
            "items": [
              "**Enbart webbläsarbaserade verktyg** (bildkonverterare, PDF-verktyg som använder pdf-lib, ljud- och videokonverteringar med FFmpeg.wasm, kodverktyg, miniräknare, QR-generatorer, lösenordskontrollanten, de flesta verktygen) körs **helt och hållet i din webbläsare via WebAssembly**. Din fil eller inmatning skickas aldrig till våra servrar. Vi har inga tekniska möjligheter att läsa den.",
              "**Serverassisterade verktyg** (AI-transkribering, AI-översättning, AI-textuppgifter, inbränning av videounderskrifter, URL-skannern, bedrägeridetektorn, SSL-certifikatkontroll och ett fåtal andra) måste skicka något till en backend. I samtliga fall bearbetas filen eller texten i realtid och raderas från tillfällig lagring inom trettio (30) minuter.",
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
            "text": "För ändamålen med EU:s allmänna dataskyddsförordning (förordning (EU) 2016/679, \"GDPR\") är den dataskyddsansvarige utgivaren av Tjänsten. Kontakt för eventuella integritetsfrågor: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Kontouppgifter**: din e-postadress; en saltad, hashad kopia av ditt lösenord (hanteras av Supabase Auth — vi ser eller lagrar aldrig klartexten); valfritt visningsnamn och avatar-URL om du loggar in med Google.",
              "**Abonnemangsstatus**: aktuellt abonnemang (gratis / Pro / Business), Stripe-kundidentifierare, aktuellt kreditbelopp och datum för dina senaste förnyelser.",
              "**Användningsräknare**: aggregerade kvoträknare (t.ex. \"3 AI-körningar använda idag\", \"420 AI-körningar använda denna månad\") som uppdateras direkt i din profilrad. Vi loggar **inte** per-körningsregister.",
              "**Jobbmetadata (tillfällig)**: när ett serverassisterat verktyg producerar ett resultat (t.ex. en .srt-fil från transkribering) registrerar vi verktygets namn, nedladdnings-URL för resultatet, källspråk och en slutförningstidpunkt. Dessa rader raderas automatiskt efter **två (2) timmar**. De innehåller aldrig innehållet i din fil.",
              "**Samtyckesregister**: datum och tidpunkt för när du accepterade dessa villkor och vår Integritetspolicy, samt om du valde att ta emot marknadsföringsmejl. Lagras under hela ditt kontos livslängd plus en lagstadgad bevisperiod på fem (5) år efter radering.",
              "**API-nycklar**: om du genererar nycklar för den publika REST-API:n lagrar vi endast SHA-256-hashen och en 12-teckens visningsprefix. Den råa nyckeln visas för dig exakt en gång vid skapandet och kan därefter inte återställas."
            ]
          },
          {
            "kind": "p",
            "text": "Vi samlar **inte** in: din IP-adress (utom den tillfälliga användning Supabase och vår hostingleverantör gör av den för hastighetsbegränsning och säkerhetsloggning), din webbläsaridentifiering, beteendespårning, dina skärminspelningar eller någon biometrisk data."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Filer du bearbetar",
        "blocks": [
          {
            "kind": "p",
            "text": "Som anges i avsnitt 1 lagras aldrig innehållet i de filer du bearbetar av oss. Den exakta livscykeln är följande:"
          },
          {
            "kind": "ul",
            "items": [
              "**Enbart webbläsarbaserade verktyg**: ingen överföring. Filen läses in i minnet av din webbläsare, resultatet produceras lokalt och du laddar ner det direkt. Vi loggar ingenting om själva filen.",
              "**AI-transkribering / översättning / OCR / bedrägerianalys**: filen eller texten strömmas till vår Supabase Edge Function, som omedelbart vidarebefordrar den till den relevanta AI-leverantören (se avsnitt 7) för inferens. Resultatet returneras till dig och den tillfälliga uppladdningsbufferten raderas. Resultatfiler som skrivs till vår privata lagringsbucket är tillgängliga via signerade URL:er i sextio (60) minuter och raderas fysiskt inom trettio (30) minuter efter generering.",
              "**Lösenordskontrollanten**: ditt lösenord lämnar aldrig din webbläsare. Vi hashar det lokalt med SHA-1 och frågar HaveIBeenPwned med k-anonymitet — endast de första 5 tecknen av hashvärdet skickas. Lösenordet och det fullständiga hashvärdet överförs aldrig.",
              "**URL-skannern / SSL-kontrollen**: endast den URL eller värdnamn du anger överförs (till Google Safe Browsing för URL-skannern eller för att öppna en live TLS-anslutning för SSL-kontrollen). Inget kringliggande sidinnehåll."
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
              "**Samtycke** (Art. 6(1)(a)) — marknadsföringsmejl, valfri analys eller reklamcookies (om och när de aktiveras) samt eventuella framtida valfria integrationer.",
              "**Rättslig förpliktelse** (Art. 6(1)(c)) — lagring av fakturauppgifter enligt fransk skattelagstiftning (vanligtvis tio år)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Dina rättigheter",
        "blocks": [
          {
            "kind": "p",
            "text": "Du har rättigheterna till tillgång (Art. 15), rättelse (Art. 16), radering (Art. 17), begränsning (Art. 18), dataportabilitet (Art. 20), invändning (Art. 21) och att återkalla samtycke när som helst utan att påverka lagligheten i tidigare bearbetning. Du har också rätt att lämna in ett klagomål till CNIL (Frankrike) eller din lokala tillsynsmyndighet. För att utöva någon rättighet, skicka ett mejl till [privacy@konvertools.com](mailto:privacy@konvertools.com) från den adress som är registrerad på ditt konto. Vi kommer att svara inom trettio (30) dagar, enligt GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Tredjepartsprocessorer",
        "blocks": [
          {
            "kind": "p",
            "text": "För att leverera Tjänsten måste vi dela mycket begränsad data med följande processorer. Var och en har sin egen integritetspolicy som reglerar hur de hanterar data de får från oss."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (registrerat i Singapore, hostat i EU för vårt projekt) — autentisering, databas, filförvaring och Edge Functions. Tar emot dina kontouppgifter, profildata och (tillfälligt) eventuell fil du laddar upp för ett serverassisterat verktyg. Verkar som vår underleverantör.",
              "**Mistral AI** (Frankrike) — inferens med stora språkmodeller för översättning, omformulering, sammanfattning, AI-humanisering, bedrägerimönsteranalys och andra textuppgifter; ljudtranskribering (Voxtral); bild-OCR och bildanalys (Pixtral). Den text eller bild du skickar vidarebefordras till Mistral för inferens. Mistral har kontraktsmässigt åtagit sig att **inte** använda API-inmatningar för att träna sina modeller.",
              "**Google Safe Browsing** (Google LLC, USA) — endast när du använder URL-skannern eller bedrägeridetektorn. Endast de URL:er du anger (eller länkar som extraheras från det mejl du klistrar in) överförs. Detta är den enda tredjepartssäkerhetstjänst vi använder.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — endast när du använder lösenordskontrollanten, och endast de första 5 tecknen av SHA-1-hashen av ditt lösenord (k-anonymitet). Frågas direkt från din webbläsare, inte via våra servrar.",
              "**Stripe** (USA / Irland) — betalningsförmedling och abonnemangsadministration. Vi **ser eller lagrar aldrig** dina kortuppgifter. Stripe tar emot din e-postadress, betalningsmetod och det abonnemang/kreditpaket du köpt.",
              "**Resend** (USA) — transaktionell e-postleverans (kontbekräftelse, betalningskvitton, återställning av lösenord). Tar emot din e-postadress och e-postkroppen vi skickar.",
              "**Vercel** (USA) — innehållsleveransnätverk för statiska sidor. Tar emot standard webbtrafikmetadata (IP, user-agent, begärd URL) för routing och missbruksförebyggande. Lagras i enlighet med Vercels loggningspolicy."
            ]
          },
          {
            "kind": "p",
            "text": "Där någon av dessa processorer verkar utanför Europeiska ekonomiska samarbetsområdet överförs data enligt Europeiska kommissionens standardavtalsklausuler (SCCs) eller motsvarande överföringsmekanism."
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
              "**Nödvändiga**: NEXT_LOCALE (kommer ihåg valt språk) och Supabase-sessioncookies (sb-*-auth-token) när du är inloggad. Dessa kräver inget samtycke enligt GDPR.",
              "**Valfria reklamcookies**: om och när vi aktiverar reklampartners (för närvarande refereras Ezoic i vår kod men inte aktiverat för din trafik) kommer vi att visa en tydlig samtyckesbanner och endast sätta reklamcookies efter att du gett ditt samtycke."
            ]
          },
          {
            "kind": "p",
            "text": "Vi kör för närvarande inga analysverktyg, spårningspixlar eller remarketing-taggar. Om vi lägger till några kommer cookie-bannern ovan att styra dem."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Säkerhet",
        "blocks": [
          {
            "kind": "p",
            "text": "All trafik till och från Tjänsten är krypterad med TLS 1.2 eller högre. Lösenord lagras som Argon2-hashar av Supabase Auth. Vi kontrollerar nya lösenord mot den publika HaveIBeenPwned k-anonymitet-API:n på klientsidan, så ett känt läckt lösenord kan inte användas. API-nycklar lagras endast som SHA-256-hashar. Databastrader skyddas av rad-nivå säkerhetspolicys som säkerställer att en användare inte kan läsa en annan användares data. Trots dessa åtgärder är inget system helt säkert; du accepterar den kvarvarande risken som är förknippad med alla onlinetjänster."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Lagringstid",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profildata: lagras under hela ditt kontos livslängd, raderas inom trettio (30) dagar efter kontostängning.",
              "Jobbmetadata: raderas automatiskt efter två (2) timmar.",
              "Resultatfiler i lagringsbucketen: raderas fysiskt inom trettio (30) minuter efter generering.",
              "Fakturauppgifter: lagras i tio (10) år för att uppfylla franska skatteplikter.",
              "Samtyckesregister: lagras under hela ditt kontos livslängd plus fem (5) år därefter som juridisk bevisning."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Minderåriga",
        "blocks": [
          {
            "kind": "p",
            "text": "Tjänsten är **inte avsedd för barn under sexton (16) år**. Om du är under den åldern får du inte skapa ett konto. Vi samlar inte medvetet in data från minderåriga; om vi blir medvetna om att vi har gjort det kommer vi att radera det."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Ändringar av denna policy",
        "blocks": [
          {
            "kind": "p",
            "text": "Vi kan ändra denna Integritetspolicy när som helst. Väsentliga ändringar kommer att meddelas via mejl till kontoinnehavare minst trettio (30) dagar innan de träder i kraft. Den senaste versionen finns alltid tillgänglig på [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "För eventuella frågor om denna policy eller din data, skriv till [privacy@konvertools.com](mailto:privacy@konvertools.com). Du kan också lämna in ett klagomål till den franska dataskyddsmyndigheten (CNIL, [cnil.fr](https://www.cnil.fr/)) eller till tillsynsmyndigheten i ditt hemland."
          }
        ]
      }
    ]
  },
  "pl": {
    "h1": "Polityka prywatności",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ostatnia aktualizacja: %DATE% · Obowiązuje natychmiast dla wszystkich odwiedzających i posiadaczy kont.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Nasza podstawowa zasada: nie przechowujemy Twoich plików",
        "blocks": [
          {
            "kind": "p",
            "text": "Usługa **Konvertools** („Usługa”) działa jako zestaw narzędzi priorytetowo traktujących prywatność. Najważniejsze zobowiązanie, jakie podejmujemy, jest następujące:"
          },
          {
            "kind": "ul",
            "items": [
              "**Narzędzia działające wyłącznie w przeglądarce** (konwertery obrazów, narzędzia PDF korzystające z pdf-lib, konwersje audio i wideo oparte na FFmpeg.wasm, narzędzia do kodu, kalkulatory, generatory kodów QR, sprawdzacz naruszeń haseł, większość narzędzi pomocniczych) działają **całkowicie w Twojej przeglądarce internetowej za pomocą WebAssembly**. Plik lub dane wejściowe nigdy nie są przesyłane na nasze serwery. Nie mamy technicznych możliwości, aby je odczytać.",
              "**Narzędzia wspomagane serwerowo** (transkrypcja AI, tłumaczenie AI, zadania tekstowe AI, wbudowywanie napisów wideo, skaner adresów URL, wykrywacz phishingu, sprawdzacz certyfikatów SSL oraz kilka innych) wymagają przesłania czegoś do backendu. W każdym przypadku plik lub tekst jest przetwarzany w czasie rzeczywistym i usuwany z tymczasowego magazynu w ciągu trzydziestu (30) minut.",
              "Nigdy nie przechowujemy treści przesłanych plików w żadnym trwałym miejscu, nie używamy przesłanych plików do trenowania modeli AI ani nie sprzedajemy, nie wynajmujemy ani nie udostępniamy ich stronom trzecim w żadnym celu poza dostarczeniem wyniku, którego zażądałeś."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Administrator danych",
        "blocks": [
          {
            "kind": "p",
            "text": "Na mocy Ogólnego Rozporządzenia o Ochronie Danych (Rozporządzenie (UE) 2016/679, „RODO”) administratorem danych jest wydawca Usługi. Kontakt w sprawie wszelkich zapytań dotyczących prywatności: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Jakie dane zbieramy",
        "blocks": [
          {
            "kind": "p",
            "text": "Jedynymi danymi osobowymi, które trwale przechowujemy w naszej bazie danych, są:"
          },
          {
            "kind": "ul",
            "items": [
              "**Dane uwierzytelniające konta**: Twój adres e-mail; zasolony i zahaszowany (SHA-256) odpowiednik Twojego hasła (zarządzany przez Supabase Auth — nigdy nie widzimy ani nie przechowujemy hasła w postaci jawnej); opcjonalna nazwa wyświetlana oraz adres URL awatara, jeśli zalogujesz się przez Google.",
              "**Stan subskrypcji**: aktualny plan (darmowy / Pro / Business), identyfikator klienta Stripe, aktualny stan środków kredytowych oraz daty ostatnich odnowień.",
              "**Liczniki użycia**: zagregowane liczniki kwot (np. „3 uruchomienia AI dzisiaj”, „420 miesięcznych uruchomień AI użytych”) aktualizowane na Twoim profilu. **Nie rejestrujemy** rekordów dotyczących pojedynczych uruchomień.",
              "**Metadane zadań (przejściowe)**: w przypadku narzędzi wspomaganych serwerowo, które generują wynik (np. plik .srt z transkrypcji), rejestrujemy nazwę narzędzia, adres URL do pobrania wyniku, język źródłowy oraz znacznik czasu zakończenia. Rekordy te są automatycznie usuwane po **dwóch (2) godzinach**. Nigdy nie zawierają treści Twojego pliku.",
              "**Rekordy zgody**: data i godzina, w której zaakceptowałeś niniejsze Warunki oraz naszą Politykę Prywatności, a także czy wyraziłeś zgodę na otrzymywanie e-maili marketingowych. Przechowywane są przez okres istnienia Twojego konta oraz przez okres pięciu (5) lat od jego usunięcia w celach dowodowych.",
              "**Klucze API**: jeśli wygenerujesz klucze dla publicznego API REST, przechowujemy jedynie skrót SHA-256 oraz 12-znakowy prefiks wyświetlany. Oryginalny klucz jest pokazywany Tobie dokładnie raz w momencie utworzenia i nie może zostać odzyskany później."
            ]
          },
          {
            "kind": "p",
            "text": "**Nie zbieramy**: Twojego adresu IP (poza tymczasowym użyciem przez Supabase i naszego dostawcę hostingu w celach ograniczania liczby zapytań i logowania zabezpieczeń), odcisku przeglądarki, zdarzeń śledzenia zachowań, nagrań ekranu ani żadnych danych biometrycznych."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Pliki, które przetwarzasz",
        "blocks": [
          {
            "kind": "p",
            "text": "Jak wskazano w sekcji 1, treści plików, które przetwarzasz, nigdy nie są przez nas przechowywane. Dokładny cykl życia jest następujący:"
          },
          {
            "kind": "ul",
            "items": [
              "**Narzędzia działające wyłącznie w przeglądarce**: brak transmisji. Plik jest odczytywany do pamięci przez przeglądarkę, wynik jest generowany lokalnie, a Ty pobierasz go bezpośrednio. Nie rejestrujemy niczego dotyczącego samego pliku.",
              "**Transkrypcja / tłumaczenie / OCR AI / analiza phishingu**: plik lub tekst jest przesyłany strumieniowo do naszej funkcji Edge Supabase, która natychmiast przekazuje go odpowiedniemu dostawcy AI (patrz sekcja 7) w celu wnioskowania. Wynik jest zwracany Tobie, a tymczasowy bufor przesyłania jest usuwany. Pliki wynikowe zapisane w naszym prywatnym magazynie obiektów są dostępne za pośrednictwem podpisanych adresów URL przez sześćdziesiąt (60) minut i fizycznie usuwane w ciągu trzydziestu (30) minut od wygenerowania.",
              "**Sprawdzacz naruszeń haseł**: Twoje hasło nigdy nie opuszcza przeglądarki. Lokalnie haszujemy je algorytmem SHA-1 i zapytań API HaveIBeenPwned przy użyciu k-anonimowości — przesyłane są jedynie pierwsze 5 znaków skrótu. Hasło i pełny skrót nigdy nie są transmitowane.",
              "**Skaner adresów URL / sprawdzacz SSL**: przesyłany jest jedynie adres URL lub nazwa hosta, którą wpisujesz (do Google Safe Browsing w przypadku skanera adresów URL lub do otwarcia połączenia TLS w przypadku sprawdzacza SSL). Żadne otaczające treści strony."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Podstawy prawne przetwarzania (RODO Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Wykonanie umowy** (Art. 6(1)(b)) — podczas tworzenia konta i korzystania z płatnych funkcji przetwarzanie jest konieczne do świadczenia Usługi.",
              "**Uzasadniony interes** (Art. 6(1)(f)) — zapobieganie oszustwom, łagodzenie nadużyć, podstawowe logowanie zabezpieczeń oraz poprawa Usługi.",
              "**Zgoda** (Art. 6(1)(a)) — e-maile marketingowe, opcjonalne pliki cookie analityczne lub reklamowe (jeśli i kiedy będą włączone) oraz wszelkie przyszłe opcjonalne integracje.",
              "**Obowiązek prawny** (Art. 6(1)(c)) — przechowywanie dokumentów księgowych zgodnie z wymogami prawa podatkowego Francji (zazwyczaj dziesięć lat)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Twoje prawa",
        "blocks": [
          {
            "kind": "p",
            "text": "Przysługują Ci prawa dostępu (Art. 15), sprostowania (Art. 16), usunięcia (Art. 17), ograniczenia przetwarzania (Art. 18), przenoszenia danych (Art. 20), sprzeciwu (Art. 21) oraz możliwość wycofania zgody w dowolnym momencie bez wpływu na legalność wcześniejszego przetwarzania. Masz również prawo złożyć skargę do CNIL (Francja) lub lokalnego organu nadzorczego. Aby skorzystać z któregokolwiek prawa, wyślij e-mail na adres [privacy@konvertools.com](mailto:privacy@konvertools.com) z adresu zarejestrowanego w Twoim koncie. Odpowiemy w ciągu trzydziestu (30) dni, zgodnie z wymogiem RODO Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Procesory stron trzecich",
        "blocks": [
          {
            "kind": "p",
            "text": "Świadczenie Usługi wymaga przekazania ściśle ograniczonych danych następującym procesorom. Każdy z nich posiada własną politykę prywatności regulującą sposób, w jaki obchodzi się z danymi otrzymanymi od nas."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (zarejestrowany w Singapurze, hostowany w UE dla naszego projektu) — uwierzytelnianie, baza danych, magazyn plików oraz funkcje Edge. Otrzymuje dane uwierzytelniające Twojego konta, dane profilu oraz (przejściowo) dowolny plik, który przesyłasz do narzędzia wspomaganego serwerowo. Działa jako nasz podprocesor.",
              "**Mistral AI** (Francja) — wnioskowanie przy użyciu dużych modeli językowych do tłumaczenia, parafrazowania, streszczania, humanizacji tekstu AI, analizy wzorców phishingu oraz innych zadań tekstowych; transkrypcja audio (Voxtral); OCR obrazów i zadania wizyjne (Pixtral). Przesyłany przez Ciebie tekst lub obraz jest wysyłany do Mistral w celu wnioskowania. Mistral zobowiązał się umownie **nie używać danych wejściowych API do trenowania swoich modeli**.",
              "**Google Safe Browsing** (Google LLC, USA) — wyłącznie podczas korzystania ze skanera adresów URL lub wykrywacza phishingu. Przesyłane są jedynie adresy URL, które wprowadzasz (lub linki wyodrębnione z wklejonego przez Ciebie e-maila). Jest to jedyna usługa bezpieczeństwa stron trzecich, której używamy.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — wyłącznie podczas korzystania ze sprawdzacza naruszeń haseł i jedynie pierwszych 5 znaków skrótu SHA-1 Twojego hasła (k-anonimowość). Zapytanie jest wykonywane bezpośrednio z przeglądarki, nie przez nasze serwery.",
              "**Stripe** (USA / Irlandia) — przetwarzanie płatności i zarządzanie subskrypcjami. **Nigdy nie widzimy ani nie przechowujemy** szczegółów Twojej karty. Stripe otrzymuje Twój adres e-mail, metodę płatności oraz plan/pakiet kredytów, który zakupiłeś.",
              "**Resend** (USA) — dostarczanie transakcyjnych wiadomości e-mail (potwierdzenia konta, potwierdzenia płatności, reset hasła). Otrzymuje Twój adres e-mail oraz treść wiadomości, którą wysyłamy.",
              "**Vercel** (USA) — sieć dostarczania treści dla statycznych stron. Otrzymuje standardowe metadane ruchu sieciowego (IP, user-agent, żądany adres URL) w celach routingu i zapobiegania nadużyciom. Przechowywane zgodnie z polityką retencji logów Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "W przypadku, gdy którykolwiek z tych procesorów działa poza Europejskim Obszarem Gospodarczym, transfery są regulowane przez Standardowe Klauzule Umowne (SCCs) Komisji Europejskiej lub równoważny mechanizm transferu."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Pliki cookie i podobne technologie",
        "blocks": [
          {
            "kind": "p",
            "text": "Używamy jedynie następujących plików cookie i elementów lokalnego magazynu:"
          },
          {
            "kind": "ul",
            "items": [
              "**Niezbędne**: NEXT_LOCALE (zapamiętuje wybrany przez Ciebie język) oraz pliki cookie sesji Supabase (sb-*-auth-token) podczas zalogowania. Nie wymagają one zgody zgodnie z RODO.",
              "**Opcjonalne reklamowe**: jeśli i kiedy włączymy partnerów reklamowych (obecnie w naszym kodzie odniesiono się do Ezoic, ale nie jest ono jeszcze aktywne dla Twojego ruchu), wyświetlimy wyraźny baner zgody i ustawimy pliki cookie reklamowe dopiero po wyrażeniu przez Ciebie zgody."
            ]
          },
          {
            "kind": "p",
            "text": "Obecnie nie uruchamiamy żadnej analityki, pikseli śledzenia ani tagów remarketingowych. Jeśli dodamy jakiekolwiek, powyższy baner cookie je zablokuje."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Bezpieczeństwo",
        "blocks": [
          {
            "kind": "p",
            "text": "Cały ruch do i z Usługi jest szyfrowany protokołem TLS 1.2 lub wyższym. Hasła są przechowywane jako skróty Argon2 przez Supabase Auth. Sprawdzamy nowe hasła przy użyciu publicznego API k-anonimowości HaveIBeenPwned po stronie klienta, aby uniemożliwić użycie znanego naruszonego hasła. Klucze API są przechowywane jedynie jako skróty SHA-256. Rekordy w bazie danych są chronione przez polityki bezpieczeństwa na poziomie wierszy, które uniemożliwiają użytkownikowi odczytanie danych innego użytkownika. Pomimo tych środków żaden system nie jest doskonale bezpieczny; akceptujesz inherentne ryzyko resztkowe związane z każdą usługą online."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Retencja",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dane profilu: przechowywane podczas istnienia konta, usuwane w ciągu trzydziestu (30) dni od zamknięcia konta.",
              "Metadane zadań: automatycznie usuwane po dwóch (2) godzinach.",
              "Pliki wynikowe w magazynie obiektów: fizycznie usuwane w ciągu trzydziestu (30) minut od wygenerowania.",
              "Rekordy księgowe: przechowywane przez dziesięć (10) lat w celu spełnienia obowiązków podatkowych Francji.",
              "Rekordy zgód: przechowywane przez okres istnienia konta oraz przez pięć (5) lat po jego usunięciu w celach dowodowych."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Osoby niepełnoletnie",
        "blocks": [
          {
            "kind": "p",
            "text": "Usługa **nie jest skierowana do dzieci poniżej szesnastego (16) roku życia**. Jeśli nie ukończyłeś tego wieku, nie możesz utworzyć konta. Nie gromadzimy danych osób niepełnoletnich świadomie; jeśli dowiemy się, że zgromadziliśmy takie dane, usuniemy je."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Zmiany w niniejszej polityce",
        "blocks": [
          {
            "kind": "p",
            "text": "Możemy okresowo zmieniać niniejszą Politykę Prywatności. Istotne zmiany będą ogłaszane e-mailem do posiadaczy kont co najmniej trzydzieści (30) dni przed wejściem w życie. Najnowsza wersja jest zawsze dostępna pod adresem [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "W przypadku pytań dotyczących niniejszej polityki lub Twoich danych napisz na adres [privacy@konvertools.com](mailto:privacy@konvertools.com). Możesz również złożyć skargę do francuskiego organu ochrony danych (CNIL, [cnil.fr](https://www.cnil.fr/)) lub do organu nadzorczego w Twoim kraju zamieszkania."
          }
        ]
      }
    ]
  },
  "uk": {
    "h1": "Політика конфіденційності",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Останнє оновлення: %DATE% · Набирає чинності негайно для всіх відвідувачів та власників акаунтів.",
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
              "**Інструменти, що працюють лише у браузері** (конвертери зображень, інструменти для роботи з PDF, що використовують pdf-lib, конвертація аудіо та відео за допомогою FFmpeg.wasm, інструменти для роботи з кодом, калькулятори, генератори QR-кодів, перевірка паролів на витік, більшість утиліт) виконуються **повністю у вашому веб-браузері за допомогою WebAssembly**. Ваш файл або вхідні дані ніколи не передаються на наші сервери. У нас немає технічної можливості їх прочитати.",
              "**Інструменти з підтримкою сервера** (AI-транскрибування, AI-переклад, AI-обробка тексту, накладання субтитрів на відео, сканування URL, детектор фішингу, перевірка SSL-сертифікатів та деякі інші) потребують передачі даних до бекенду. У кожному випадку файл або текст обробляється в режимі реального часу та видаляється з тимчасового сховища протягом тридцяти (30) хвилин.",
              "Ми ніколи не зберігаємо вміст завантажених файлів у будь-якому постійному місці, не використовуємо ваші завантаження для навчання моделей ШІ та не продаємо, не здаємо в оренду та не передаємо їх третім сторонам з будь-якою метою, окрім надання результату, який ви запитали."
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
            "text": "Згідно з Положеннями Європейського Союзу про захист даних (Регламент (ЄС) 2016/679, «GDPR»), контролером даних є видавець Сервісу. Для звернень щодо конфіденційності: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Облікові дані акаунту**: ваша електронна адреса; сольований та хешований варіант вашого пароля (керований Supabase Auth — ми ніколи не бачимо та не зберігаємо відкритий текст); необов'язкові ім'я для відображення та URL аватара, якщо ви входите за допомогою Google.",
              "**Стан підписки**: поточний тарифний план (безкоштовний / Pro / Business), ідентифікатор клієнта Stripe, поточний кредитний баланс та дати ваших останніх поновлень.",
              "**Лічильники використання**: агреговані лічильники квот (наприклад, «3 запуски ШІ сьогодні», «420 щомісячних запусків ШІ використано») оновлюються на вашому профілі. Ми **не** ведемо записи щодо кожного запуску.",
              "**Метадані завдань (тимчасові)**: коли інструмент з підтримкою сервера генерує результат (наприклад, файл .srt з транскрибування), ми записуємо назву інструменту, URL для завантаження результату, вихідну мову та час завершення. Ці рядки автоматично видаляються через **дві (2) години**. Вони ніколи не містять вміст вашого файлу.",
              "**Записи згоди**: дата та час, коли ви прийняли ці Умови та нашу Політику конфіденційності, а також чи ви дали згоду на отримання маркетингових листів. Зберігаються протягом існування вашого акаунту та протягом п'яти (5) років після видалення для юридичних доказів.",
              "**API-ключі**: якщо ви генеруєте ключі для публічного REST API, ми зберігаємо лише хеш SHA-256 та 12-символьний префікс для відображення. Повний ключ показується вам лише один раз під час створення та не може бути відновлений згодом."
            ]
          },
          {
            "kind": "p",
            "text": "Ми **не** збираємо: вашу IP-адресу (окрім тимчасового використання Supabase та нашого хостинг-провайдера для обмеження швидкості та логування безпеки), відбиток браузера, події поведінкового трекінгу, записи вашого екрана або будь-які біометричні дані."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Файли, які ви обробляєте",
        "blocks": [
          {
            "kind": "p",
            "text": "Як зазначено у розділі 1, ми ніколи не зберігаємо вміст файлів, які ви обробляєте. Точний життєвий цикл:"
          },
          {
            "kind": "ul",
            "items": [
              "**Інструменти, що працюють лише у браузері**: ніякої передачі даних. Файл зчитується у пам'ять вашим браузером, результат генерується локально, і ви завантажуєте його безпосередньо. Ми не логуємо нічого щодо самого файлу.",
              "**AI-транскрибування / переклад / OCR / аналіз фішингу**: файл або текст передаються у потік до нашої Supabase Edge Function, яка негайно перенаправляє їх відповідному постачальнику ШІ (див. розділ 7) для інференції. Результат повертається вам, а тимчасовий буфер завантаження видаляється. Результативні файли, записані у нашому приватному сховищі, доступні за підписаними URL протягом шістдесяти (60) хвилин та фізично видаляються протягом тридцяти (30) хвилин після генерації.",
              "**Перевірка паролів на витік**: ваш пароль ніколи не залишає ваш браузер. Ми хешуємо його локально за допомогою SHA-1 та запитуємо HaveIBeenPwned за допомогою k-анонімності — передається лише перші 5 символів хешу. Пароль та повний хеш ніколи не передаються.",
              "**Сканування URL / перевірка SSL**: передається лише URL або ім'я хоста, які ви вводите (до Google Safe Browsing для сканера URL або для відкриття живого TLS-з'єднання для перевірки SSL). Жоден інший вміст сторінки не передається."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Правові підстави для обробки (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Виконання договору** (Art. 6(1)(b)) — коли ви створюєте акаунт та використовуєте платні функції, обробка необхідна для надання Сервісу.",
              "**Законні інтереси** (Art. 6(1)(f)) — запобігання шахрайству, пом'якшення зловживань, базове логування безпеки та покращення Сервісу.",
              "**Згода** (Art. 6(1)(a)) — маркетингові листи, необов'язкові аналітичні або рекламні cookies (якщо та коли вони увімкнені), а також будь-які майбутні необов'язкові інтеграції.",
              "**Законні вимоги** (Art. 6(1)(c)) — зберігання платіжних записів відповідно до вимог французького податкового законодавства (зазвичай десять років)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Ваші права",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви маєте права на доступ (Art. 15), виправлення (Art. 16), видалення (Art. 17), обмеження обробки (Art. 18), перенесення даних (Art. 20), заперечення (Art. 21) та відкликання згоди в будь-який час без впливу на законність попередньої обробки. Ви також маєте право подати скаргу до CNIL (Франція) або до місцевого наглядового органу. Для реалізації будь-якого права напишіть на [privacy@konvertools.com](mailto:privacy@konvertools.com) з електронної адреси, зареєстрованої у вашому акаунті. Ми відповімо протягом тридцяти (30) днів, як вимагає GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Треті сторони-обробники",
        "blocks": [
          {
            "kind": "p",
            "text": "Для надання Сервісу нам необхідно передавати суворо обмежені дані наступним обробникам. Кожен з них має власну політику конфіденційності, яка регулює, як вони обробляють дані, отримані від нас."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (зареєстрований у Сінгапурі, розміщений у ЄС для нашого проєкту) — автентифікація, база даних, файлове сховище та Edge Functions. Отримує ваші облікові дані акаунту, профільні дані та (тимчасово) будь-який файл, який ви завантажуєте для інструменту з підтримкою сервера. Виступає нашим суборобітником.",
              "**Mistral AI** (Франція) — інференція великих мовних моделей для перекладу, перефразування, резюмування, «олюднення» тексту, аналізу шаблонів фішингу та інших текстових завдань; аудіотранскрибування (Voxtral); OCR та візуальні завдання (Pixtral). Текст або зображення, які ви надсилаєте, передаються Mistral для інференції. Mistral взяв на себе договірне зобов'язання **не використовувати вхідні дані API** для навчання своїх моделей.",
              "**Google Safe Browsing** (Google LLC, США) — лише під час використання Сканера URL або Детектора фішингу. Передаються лише ті URL, які ви надсилаєте (або посилання, вилучені з електронного листа, який ви вставляєте). Це єдина стороння служба безпеки, яку ми використовуємо.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — лише під час використання Перевірки паролів на витік, і лише перші 5 символів хешу SHA-1 вашого пароля (k-анонімність). Запит здійснюється безпосередньо з вашого браузера, а не через наші сервери.",
              "**Stripe** (США / Ірландія) — обробка платежів та управління підпискою. Ми **ніколи не бачимо та не зберігаємо** деталі вашої картки. Stripe отримує вашу електронну адресу, спосіб оплати та тарифний план/пакет кредитів, який ви придбали.",
              "**Resend** (США) — доставка транзакційних електронних листів (підтвердження акаунту, квитанції про оплату, скидання пароля). Отримує вашу електронну адресу та тіло листа, який ми надсилаємо.",
              "**Vercel** (США) — мережа доставки контенту для статичних сторінок. Отримує стандартні метадані веб-трафіку (IP, user-agent, запитаний URL) для маршрутизації та запобігання зловживанням. Зберігаються відповідно до політики логування Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "У випадках, коли будь-який з цих обробників працює за межами Європейської економічної зони, передача даних регулюється Стандартними договірними положеннями (SCCs) Європейської комісії або еквівалентним механізмом передачі."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies та подібні технології",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми використовуємо лише наступні cookies та елементи локального сховища:"
          },
          {
            "kind": "ul",
            "items": [
              "**Необхідні**: NEXT_LOCALE (зберігає обрану вами мову) та cookies сесії Supabase (sb-*-auth-token) під час роботи в системі. Вони не потребують згоди відповідно до GDPR.",
              "**Необов'язкова реклама**: якщо та коли ми увімкнемо партнерів з реклами (наразі Ezoic згадується у нашому коді, але ще не активований для вашого трафіку), ми відобразимо чітке банер згоди та встановлюватимемо рекламні cookies лише після вашої згоди."
            ]
          },
          {
            "kind": "p",
            "text": "Наразі ми не використовуємо жодної аналітики, трекінгових пікселів або ремаркетингових тегів. Якщо ми додамо будь-які з них, банер згоди вище буде контролювати їх."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Безпека",
        "blocks": [
          {
            "kind": "p",
            "text": "Уся інформація, що передається до та від Сервісу, шифрується за допомогою TLS 1.2 або вище. Паролі зберігаються у вигляді хешів Argon2 за допомогою Supabase Auth. Ми перевіряємо нові паролі за допомогою публічного API k-анонімності HaveIBeenPwned на стороні клієнта, тому відомий зламаний пароль не може бути використаний. API-ключі зберігаються лише у вигляді хешів SHA-256. Рядки бази даних захищені політиками захисту на рівні рядків, що гарантує, що один користувач не може прочитати дані іншого. Незважаючи на ці заходи, жодна система не є абсолютно захищеною; ви приймаєте залишковий ризик, властивий будь-якому онлайн-сервісу."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Зберігання даних",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Дані профілю: зберігаються протягом існування вашого акаунту, видаляються протягом тридцяти (30) днів після закриття акаунту.",
              "Метадані завдань: автоматично видаляються через дві (2) години.",
              "Результативні файли у сховищі: фізично видаляються протягом тридцяти (30) хвилин після генерації.",
              "Платіжні записи: зберігаються протягом десяти (10) років для виконання французьких податкових зобов'язань.",
              "Записи згоди: зберігаються протягом існування вашого акаунту та протягом п'яти (5) років після цього як юридичні докази."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Неповнолітні користувачі",
        "blocks": [
          {
            "kind": "p",
            "text": "Сервіс **не призначений для дітей молодше шістнадцяти (16) років**. Якщо вам менше цього віку, ви не повинні створювати акаунт. Ми свідомо не збираємо дані неповнолітніх; якщо нам стане відомо про таке, ми негайно видалимо їх."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Зміни в цій політиці",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми можемо періодично оновлювати цю Політику конфіденційності. Істотні зміни буде оголошено електронною поштою власникам акаунтів щонайменше за тридцять (30) днів до набрання ними чинності. Остання версія завжди доступна за адресою [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Контактна інформація",
        "blocks": [
          {
            "kind": "p",
            "text": "За будь-якими питаннями щодо цієї політики або ваших даних напишіть на [privacy@konvertools.com](mailto:privacy@konvertools.com). Ви також можете подати скаргу до французького органу з захисту даних (CNIL, [cnil.fr](https://www.cnil.fr/)) або до наглядового органу вашої країни проживання."
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
            "text": "Konvertools (dále jen „Služba“) funguje jako nástroj s prioritou ochrany soukromí. Naše nejdůležitější závazek zní takto:"
          },
          {
            "kind": "ul",
            "items": [
              "**Nástroje běžící pouze v prohlížeči** (konvertory obrázků, nástroje PDF využívající pdf-lib, převody zvuku a videa prostřednictvím FFmpeg.wasm, nástroje pro kód, kalkulačky, generátory QR kódů, kontrola prolomených hesel, většina utilit) běží **zcela uvnitř vašeho webového prohlížeče prostřednictvím WebAssembly**. Váš soubor či vstupní data nikdy nejsou odesílána na naše servery. Nemáme technickou možnost je přečíst.",
              "**Nástroje využívající server** (AI transkripce, AI překlady, AI textové úlohy, vkládání titulků do videa, skenování URL, detekce phishingu, kontrola SSL certifikátů a několik dalších) vyžadují odeslání dat na backend. V každém případě jsou soubory či texty zpracovávány v reálném čase a z dočasného úložiště jsou smazány do třiceti (30) minut.",
              "Nikdy neukládáme obsah žádného nahraného souboru v žádném trvalém umístění, nikdy nepoužíváme vaše nahraná data k výcviku AI modelů a nikdy je neprodáváme, nepronajímáme ani nesdílíme s třetími stranami za žádným účelem kromě poskytnutí výsledku, který jste si vyžádali."
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
            "text": "Pro účely Nařízení Evropského parlamentu a Rady (EU) 2016/679 („GDPR“) je správcem údajů vydavatel Služby. Kontakt pro jakékoli dotazy týkající se ochrany osobních údajů: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Jaká data shromažďujeme",
        "blocks": [
          {
            "kind": "p",
            "text": "Jediné osobní údaje, které trvale uchováváme v naší databázi, jsou:"
          },
          {
            "kind": "ul",
            "items": [
              "**Přihlašovací údaje**: vaše e-mailová adresa; solený a hašovaný záznam vašeho hesla (spravovaný prostřednictvím Supabase Auth — my nevidíme ani neukládáme prostý text hesla); volitelný zobrazovaný název a URL avataru, pokud se přihlásíte prostřednictvím Google.",
              "**Stav předplatného**: aktuální plán (zdarma / Pro / Business), identifikátor zákazníka Stripe, aktuální zůstatek kreditů a data vašich posledních obnov.",
              "**Kontrolní počty využití**: agregované kontroly kvót (např. „Dnes jste použili 3 AI běhy“, „Bylo využito 420 měsíčních AI běhů“) aktualizované na vašem profilu. **Neukládáme** záznamy o jednotlivých bězích.",
              "**Metadata úloh (dočasné)**: když nástroj využívající server vyprodukuje výstup (např. soubor .srt z transkripce), zaznamenáme název nástroje, URL ke stažení výsledku, zdrojový jazyk a čas dokončení. Tyto řádky jsou automaticky odstraněny po **dvou (2) hodinách**. Nikdy neobsahují obsah vašeho souboru.",
              "**Záznamy o souhlasu**: datum a čas, kdy jste přijali tyto Podmínky a naše Zásady ochrany osobních údajů, a zda jste souhlasili s marketingovými e-maily. Uchovávány po dobu existence vašeho účtu plus pět (5) let po jeho smazání jako právní důkaz.",
              "**API klíče**: pokud vygenerujete klíče pro veřejné REST API, ukládáme pouze haš SHA-256 a 12místný zobrazovaný prefix. Samotný klíč je zobrazen pouze jednou při vytvoření a následně již není obnovitelný."
            ]
          },
          {
            "kind": "p",
            "text": "**Neukládáme**: vaši IP adresu (kromě dočasného využití společností Supabase a naším poskytovatelem hostingu pro účely omezování rychlosti a bezpečnostního protokolování), otisk prohlížeče, sledovací události chování, záznamy o obrazovce ani žádná biometrická data."
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
              "**Nástroje běžící pouze v prohlížeči**: žádný přenos. Soubor je přečten do paměti vaším prohlížečem, výsledek je vyprodukován lokálně a vy si jej stáhnete přímo. O souboru samotném nic neprotokolujeme.",
              "**AI transkripce / překlad / OCR / analýza phishingu**: soubor či text je streamován do naší Edge Funkce Supabase, která jej okamžitě předá příslušnému poskytovateli AI (viz část 7) pro inferenci. Výsledek je vrácen vám a dočasný úložný prostor pro nahrání je smazán. Výsledné soubory zapsané do našeho privátního úložiště jsou přístupné prostřednictvím podepsaných URL po šedesát (60) minut a fyzicky smazány do třiceti (30) minut od vygenerování.",
              "**Kontrola prolomených hesel**: vaše heslo nikdy neopustí váš prohlížeč. Lokálně jej hašujeme pomocí SHA-1 a dotazujeme se na HaveIBeenPwned pomocí k-anonymity — odesílány jsou pouze první 4 znaky haše. Heslo a celý haš nikdy nejsou přenášeny.",
              "**Skenování URL / kontrola SSL**: přenášen je pouze URL či hostname, který zadáte (pro Google Safe Browsing u skeneru URL, respektive pro otevření živého TLS připojení u kontroly SSL). Žádný obsah okolních stránek."
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
              "**Plnění smlouvy** (čl. 6 odst. 1 písm. b)) — při vytváření účtu a využívání placených funkcí je zpracování nezbytné pro poskytování Služby.",
              "**Oprávněné zájmy** (čl. 6 odst. 1 písm. f)) — prevence podvodů, zmírňování zneužívání, základní bezpečnostní protokolování a zlepšování Služby.",
              "**Souhlas** (čl. 6 odst. 1 písm. a)) — marketingové e-maily, volitelné analytické či reklamní cookies (pokud a kdykoli jsou povoleny) a případné budoucí volitelné integrace.",
              "**Právní povinnost** (čl. 6 odst. 1 písm. c)) — uchovávání účetních záznamů dle francouzského daňového práva (obvykle deset let)."
            ]
          }
        ]
      },
      {
        "id": "rights",
        "title": "6. Vaše práva",
        "blocks": [
          {
            "kind": "p",
            "text": "Máte právo na přístup (čl. 15), opravu (čl. 16), výmaz (čl. 17), omezení zpracování (čl. 18), přenositelnost (čl. 20), odpor (čl. 21) a odvolání souhlasu kdykoli bez vlivu na zákonnost předchozího zpracování. Máte také právo podat stížnost u CNIL (Francie) nebo u příslušného dozorového orgánu ve vaší zemi. Chcete-li uplatnit jakékoli právo, zašlete e-mail na [privacy@konvertools.com](mailto:privacy@konvertools.com) z adresy registrované ve vašem účtu. Odpovíme do třiceti (30) dnů, jak požaduje GDPR čl. 12 odst. 3."
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
              "**Supabase** (zaregistrováno v Singapuru, hostováno v EU pro náš projekt) — autentizace, databáze, úložiště souborů a Edge Funkce. Přijímá vaše přihlašovací údaje, profilová data a (dočasně) jakýkoli soubor, který nahrajete pro nástroj využívající server. Působí jako náš sub-zpracovatel.",
              "**Mistral AI** (Francie) — inference velkých jazykových modelů pro překlady, parafrázování, shrnutí, AI humanizaci, analýzu vzorů phishingu a další textové úlohy; transkripci zvuku (Voxtral); OCR a úlohy zpracování obrázků (Pixtral). Text či obrázek, který odešlete, je odeslán Mistralu pro inferenci. Mistral se smluvně zavázal **nepoužívat vstupy z API k výcviku svých modelů**.",
              "**Google Safe Browsing** (Google LLC, USA) — pouze při používání skeneru URL nebo detektoru phishingu. Přenášen je pouze URL, které zadáte (nebo odkazy extrahované z e-mailu, který vložíte). Jedná se o jediný třetí stranu poskytující bezpečnostní službu, kterou využíváme.",
              "**HaveIBeenPwned** (Have I Been Pwned LLC) — pouze při používání Kontroly prolomených hesel a pouze prvních 5 znaků haše vašeho hesla SHA-1 (k-anonymita). Dotazováno přímo z vašeho prohlížeče, nikoli prostřednictvím našich serverů.",
              "**Stripe** (USA / Irsko) — zpracování plateb a správa předplatného. **Nikdy nevidíme ani neukládáme** vaše platební údaje. Stripe přijímá vaši e-mailovou adresu, platební metodu a plán/kreditní balíček, který jste zakoupili.",
              "**Resend** (USA) — doručování transakčních e-mailů (ověření účtu, potvrzení platby, reset hesla). Přijímá vaši e-mailovou adresu a tělo e-mailu, který odesíláme.",
              "**Vercel** (USA) — síť pro doručování obsahu pro statické stránky. Přijímá standardní metadata webového provozu (IP, user-agent, požadovaná URL) pro směrování a prevenci zneužívání. Uchováváno v souladu s retenční politikou Vercelu."
            ]
          },
          {
            "kind": "p",
            "text": "Pokud kterýkoli z těchto zpracovatelů působí mimo Evropský hospodářský prostor, jsou přenosy řízeny Standardními smluvními doložkami (SCCs) Evropské komise nebo obdobným mechanismem pro přenos údajů."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies a podobné technologie",
        "blocks": [
          {
            "kind": "p",
            "text": "Používáme pouze následující cookies a položky lokálního úložiště:"
          },
          {
            "kind": "ul",
            "items": [
              "**Nezbytné**: NEXT_LOCALE (pamatuje si vámi zvolený jazyk) a cookies relace Supabase (sb-*-auth-token) při přihlášení. Tyto nevyžadují souhlas dle GDPR.",
              "**Volitelné reklamní**: pokud a kdy povolíme partnerské reklamní společnosti (v současnosti je v našem kódu referován Ezoic, ale zatím není aktivován pro váš provoz), zobrazíme jasný banner pro souhlas a cookies pro reklamu nastavíme pouze po vašem souhlasu."
            ]
          },
          {
            "kind": "p",
            "text": "V současnosti neprovádíme žádnou analytiku, sledovací pixely ani remarketingové tagy. Pokud nějaké přidáme, výše uvedený banner pro souhlas je bude blokovat."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Zabezpečení",
        "blocks": [
          {
            "kind": "p",
            "text": "Veškerý provoz Služby je šifrován pomocí TLS 1.2 nebo vyššího. Hesla jsou ukládána jako haše Argon2 prostřednictvím Supabase Auth. Nová hesla kontrolujeme proti veřejnému API HaveIBeenPwned pomocí k-anonymity přímo na straně klienta, takže nelze použít známé prolomené heslo. API klíče jsou ukládány pouze jako haše SHA-256. Řádky v databázi jsou chráněny politikami zabezpečení na úrovni řádků, které zajišťují, že jeden uživatel nemůže přečíst data jiného uživatele. Přes tato opatření není žádný systém dokonale zabezpečen; přijímáte zbytková rizika inherentní jakékoli online službě."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Doba uchovávání",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profilová data: uchovávána po dobu existence vašeho účtu, smazána do třiceti (30) dnů po uzavření účtu.",
              "Metadata úloh: automaticky smazáno po dvou (2) hodinách.",
              "Výsledné soubory v úložišti: fyzicky smazány do třiceti (30) minut od vygenerování.",
              "Účetní záznamy: uchovávány po dobu deseti (10) let pro splnění francouzských daňových povinností.",
              "Záznamy o souhlasu: uchovávány po dobu existence vašeho účtu plus pět (5) let poté jako právní důkaz."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Děti",
        "blocks": [
          {
            "kind": "p",
            "text": "Služba **není určena dětem mladším šestnácti (16) let**. Pokud jste mladší, nesmíte si vytvářet účet. Úmyslně nesbíráme údaje od dětí; pokud zjistíme, že jsme tak učinili, údaje smažeme."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Změny této zásady",
        "blocks": [
          {
            "kind": "p",
            "text": "Tuto Zásadu ochrany osobních údajů můžeme občas změnit. Podstatné změny budou oznámeny e-mailem držitelům účtů alespoň třicet (30) dnů před jejich nabytím účinnosti. Nejnovější verze je vždy k dispozici na [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "Jakékoli dotazy týkající se této zásady nebo vašich údajů zašlete na [privacy@konvertools.com](mailto:privacy@konvertools.com). Můžete také podat stížnost u francouzského dozorového orgánu pro ochranu údajů (CNIL, [cnil.fr](https://www.cnil.fr/)) nebo u příslušného orgánu ve vaší zemi."
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
            "text": "Les présentes Conditions d'utilisation (les « Conditions ») constituent un accord contraignant entre vous (l'« Utilisateur ») et l'éditeur de Konvertools (l'« Éditeur », « nous », « notre ») concernant votre utilisation du site web Konvertools et de tous les outils, API et services associés (dénommés collectivement le « Service »). En créant un compte, en cochant la case d'acceptation lors de l'inscription ou simplement en utilisant un outil du Service, vous confirmez avoir lu, compris et accepté intégralement les présentes Conditions, ainsi que notre Politique de confidentialité."
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
            "text": "**Dans la mesure maximale permise par la loi, l'Éditeur décline toute responsabilité pour les dommages de quelque nature que ce soit résultant de votre utilisation ou de votre incapacité à utiliser le Service.** En particulier, vous reconnaissez et acceptez que l'Éditeur ne sera pas responsable des éléments suivants :"
          },
          {
            "kind": "ul",
            "items": [
              "perte de données, fichiers corrompus ou incorrects, ou conversions échouées ;",
              "décisions, financières, professionnelles ou autres, que vous prenez en vous fondant sur les résultats de tout outil ;",
              "périodes d'indisponibilité, latence ou indisponibilité temporaire de toute fonctionnalité ;",
              "défaillances de services tiers (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, hébergeurs) ;",
              "dommages indirects, accessoires, spéciaux, consécutifs ou punitifs de quelque nature que ce soit ;",
              "tout montant global excédant les frais que vous avez effectivement payés à notre égard au cours des douze (12) mois précédant l'événement donnant lieu à la réclamation, plafonné à cent (100) euros pour les utilisateurs de la formule gratuite."
            ]
          },
          {
            "kind": "p",
            "text": "**Outils de sécurité** : le Scanner d'URL, le Détecteur de phishing, le Vérificateur d'e-mails, le Vérificateur de certificats SSL et le Vérificateur de fuites de mots de passe sont fournis **à titre indicatif et informatif uniquement**. Ils agrègent des signaux tiers (Google Safe Browsing, DNS public, HaveIBeenPwned, échanges TLS en direct) et des heuristiques de modèles de langage de grande taille. Ils **ne constituent pas une garantie de sécurité, de validité ou d'absence de risque**. Les nouvelles pages de phishing apparaissent plus rapidement que les bases de données de réputation ne peuvent les répertorier ; un e-mail validé par nos vérifications peut toujours être inactif ou frauduleux ; un certificat SSL valide ne certifie pas le contenu d'un site. L'Éditeur décline expressément toute responsabilité pour tout préjudice résultant d'un e-mail de phishing que le Service a jugé sûr, d'un lien dangereux que le Service n'a pas identifié, d'un e-mail transactionnel envoyé à une adresse que le Service a marquée comme valide, ou de toute décision de sécurité prise sur la base de ces outils. L'Utilisateur assume l'entière responsabilité de telles décisions."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Utilisation acceptable",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous acceptez de ne **pas** utiliser le Service pour :"
          },
          {
            "kind": "ul",
            "items": [
              "télécharger, traiter ou diffuser du contenu illégal dans votre juridiction ou en France ;",
              "traiter des fichiers pour lesquels vous ne détenez pas les droits nécessaires (œuvres protégées par le droit d'auteur sans autorisation, données personnelles que vous n'êtes pas autorisé à traiter, informations classifiées) ;",
              "commettre ou faciliter la fraude, le blanchiment d'argent, le financement du terrorisme ou toute activité criminelle ;",
              "utiliser l'humanisateur IA, les outils textuels IA ou toute autre fonctionnalité pour plagier, tromper un tiers, manipuler des systèmes d'évaluation (académiques, de recrutement, de réseaux publicitaires) d'une manière contraire à leurs règles, ou induire en erreur d'une façon qui enfreint la loi applicable ;",
              "tenter de surcharger, rétro-ingénieriser, scraper, abuser des limites de débit, ou interférer d'une autre manière avec le fonctionnement ou la disponibilité du Service ;",
              "contourner les quotas, les exigences de paiement ou toute autre restriction en place ;",
              "créer plusieurs comptes pour multiplier les quotas de la formule gratuite, ou partager un compte avec plus d'individus que ne le permet votre formule."
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
            "text": "Vous conservez tous les droits, titres et intérêts sur les fichiers et textes que vous soumettez au Service. Vous nous accordez une licence limitée, non exclusive, mondiale, gratuite et cessible uniquement pour traiter ces contenus afin de fournir l'outil que vous avez demandé. Cette licence prend fin dès que le résultat vous est retourné (outils assistés par serveur) ou n'existe tout simplement pas (outils exécutés dans le navigateur, puisque votre fichier ne nous parvient jamais). Nous ne revendiquons pas et ne revendiquerons pas la propriété de votre contenu, ni ne l'utiliserons pour entraîner des modèles d'IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Comptes",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous devez avoir au moins seize (16) ans pour créer un compte. Vous êtes responsable de la confidentialité de vos identifiants et de toute activité se produisant sous votre compte. Signalez-nous immédiatement toute suspicion d'accès non autorisé à [security@konvertools.com](mailto:security@konvertools.com)."
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
              "**Formules** : Gratuite (0 €), Pro (12 €/mois ou 99 €/an), Business (39 €/mois ou 349 €/an). Les fonctionnalités et quotas des formules sont ceux décrits sur notre page [Tarifs](/pricing) au moment de l'achat. Nous nous réservons le droit de modifier les fonctionnalités des formules avec un préavis de 30 jours.",
              "**Renouvellement automatique** : les abonnements mensuels et annuels se renouvellent automatiquement selon la même périodicité jusqu'à annulation. Vous pouvez annuler à tout moment depuis votre tableau de bord ; l'annulation prend effet à la fin de la période de facturation en cours. Vous conservez l'accès jusqu'à cette date.",
              "**Droit de rétractation (UE)** : conformément à l'article L. 221-28 du Code de la consommation français, lorsque vous utilisez activement le Service pendant la période initiale de rétractation de 14 jours, vous consentez expressément à l'exécution immédiate du contrat et renoncez à votre droit de rétractation. Si vous n'avez pas utilisé de fonctionnalité payante, vous pouvez vous rétracter dans les 14 jours en envoyant un e-mail à [billing@konvertools.com](mailto:billing@konvertools.com) et nous vous rembourserons intégralement sous 14 jours.",
              "**Pas de remboursements partiels** : en dehors du scénario de rétractation ci-dessus, les frais déjà payés pour la période de facturation en cours ne sont pas remboursables.",
              "**Crédits** : les crédits API achetés sous forme de packs ponctuels (« Starter », « Growth », « Scale », « Studio ») **ne périment jamais**. Les 300 crédits automatiquement attribués chaque mois aux abonnés Business expirent à la fin du mois civil et **ne sont pas remboursables**.",
              "**Modifications des prix** : nous pouvons modifier les prix avec un préavis de 30 jours. Les abonnés existants conservent leur tarif actuel jusqu'à leur prochaine date de renouvellement.",
              "**Taxes** : les prix s'affichent hors TVA le cas échéant. Stripe collecte et reverse toute taxe due dans votre juridiction."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. API REST publique",
        "blocks": [
          {
            "kind": "p",
            "text": "La formule Business expose une API REST publique authentifiée par des clés API que vous générez depuis votre tableau de bord. L'utilisation de l'API est également régie par :"
          },
          {
            "kind": "ul",
            "items": [
              "**Limites de débit** : 60 requêtes par minute (compléments Pro) ou 120 requêtes par minute (Business). Un abus prolongé peut entraîner un ralentissement temporaire ou une révocation permanente de la clé.",
              "**Consommation de crédits** : chaque appel API déduit des crédits aux tarifs publiés dans notre [documentation API](/api). Les appels échoués (réponses 5xx) ne déduisent pas de crédits.",
              "**Sécurité des clés** : vous êtes responsable du stockage sécurisé de vos clés API et de leur rotation en cas de compromission. Nous pouvons révoquer toute clé à tout moment si nous suspectons un abus.",
              "**Utilisation en amont acceptable** : les applications construites sur notre API doivent respecter ces Conditions, y compris la section sur l'utilisation acceptable. Vous ne devez pas exposer nos clés API aux utilisateurs finaux (sous-licenciez plutôt votre service)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Propriété intellectuelle",
        "blocks": [
          {
            "kind": "p",
            "text": "Le nom, le logo, le code, la conception, la documentation, la structure de la base de données et le contenu agrégé du Service sont la propriété exclusive de l'Éditeur et sont protégés par le droit français et international de la propriété intellectuelle. Aucune licence n'est accordée en dehors de ce qui est strictement nécessaire pour utiliser le Service comme prévu. Vous ne pouvez pas reproduire, modifier, décompiler ou créer des œuvres dérivées du Service ou de toute partie de celui-ci, sauf dans la mesure expressément autorisée par la loi applicable."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnisation",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous acceptez d'indemniser et de tenir l'Éditeur indemne de toute réclamation, perte, dommage, responsabilité, coût ou dépense (y compris les honoraires d'avocat raisonnables) découlant (a) de votre manquement à ces Conditions, (b) de votre violation de toute loi ou droit d'un tiers, ou (c) de tout contenu que vous avez soumis au Service."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Modifications des Conditions",
        "blocks": [
          {
            "kind": "p",
            "text": "Nous pouvons modifier ces Conditions à tout moment. Les modifications substantielles seront notifiées par e-mail aux titulaires de compte au moins trente (30) jours avant leur entrée en vigueur. En continuant à utiliser le Service après cette période, vous acceptez les Conditions modifiées. La dernière version est toujours disponible à l'adresse [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Résiliation",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous pouvez résilier votre compte à tout moment depuis votre tableau de bord. Nous pouvons résilier ou suspendre votre compte immédiatement et sans préavis si vous enfreignez ces Conditions, abusez du Service ou ne payez pas un abonnement récurrent. À la résiliation, vos données sont supprimées sous trente (30) jours, sauf les enregistrements de facturation et de consentement conservés conformément à notre Politique de confidentialité."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Loi applicable et juridiction",
        "blocks": [
          {
            "kind": "p",
            "text": "Ces Conditions sont régies par les lois de la France. Tout litige découlant ou lié à ces Conditions ou au Service sera soumis à la compétence exclusive des tribunaux de Paris, France, sauf lorsque le droit de recours obligatoire d'un consommateur dans son pays de résidence prévaut en vertu du droit de l'Union européenne ou du droit national applicable. Avant d'engager une action en justice, vous acceptez de tenter de résoudre le litige à l'amiable en écrivant à [legal@konvertools.com](mailto:legal@konvertools.com). Les consommateurs de l'UE peuvent également utiliser la plateforme de résolution des litiges en ligne de la Commission européenne à l'adresse [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Divers",
        "blocks": [
          {
            "kind": "p",
            "text": "Si une disposition de ces Conditions est jugée invalide ou non exécutoire, les autres dispositions restent pleinement en vigueur. Notrefailure à faire respecter un droit ou une disposition ne constitue pas une renonciation à ce droit. Ces Conditions (ainsi que la Politique de confidentialité et toute condition spécifique à une formule référencée lors de l'achat) constituent l'intégralité de l'accord entre vous et l'Éditeur concernant le Service."
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
            "text": "Estos Términos de Servicio (los \"Términos\") constituyen un acuerdo vinculante entre usted (el \"Usuario\") y el editor de Konvertools (el \"Editor\", \"nosotros\", \"nos\") con respecto a su uso del sitio web de Konvertools y todas las herramientas, APIs y servicios relacionados (en conjunto, el \"Servicio\"). Al crear una cuenta, marcar la casilla de aceptación durante el registro o simplemente al utilizar cualquier herramienta del Servicio, confirma que ha leído, entendido y aceptado estos Términos en su totalidad, junto con nuestra Política de Privacidad."
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
        "title": "3. Limitación de responsabilidad — léase detenidamente",
        "blocks": [
          {
            "kind": "p",
            "text": "**En la máxima medida permitida por la ley, el Editor rechaza toda responsabilidad por daños de cualquier tipo derivados del uso o la imposibilidad de usar el Servicio.** En particular, usted reconoce y acepta que el Editor no será responsable de:"
          },
          {
            "kind": "ul",
            "items": [
              "pérdida de datos, archivos corruptos o incorrectos, o conversiones fallidas;",
              "decisiones, financieras, comerciales u otras, que tome en función de los resultados de cualquier herramienta;",
              "tiempos de inactividad, latencia o indisponibilidad temporal de cualquier función;",
              "fallos de servicios de terceros (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, proveedores de alojamiento);",
              "daños indirectos, incidentales, especiales, consecuentes o punitivos de cualquier tipo;",
              "cualquier importe agregado que supere las tarifas que usted haya pagado efectivamente a nosotros en los doce (12) meses anteriores al evento que origine la reclamación, con un límite de cien (100) euros para usuarios de nivel gratuito."
            ]
          },
          {
            "kind": "p",
            "text": "**Herramientas de seguridad**: el Escáner de URLs, el Detector de Phishing, el Verificador de Correos Electrónicos, el Verificador de Certificados SSL y el Verificador de Filtraciones de Contraseñas se proporcionan **únicamente con fines informativos e indicativos**. Agregan señales de terceros (Google Safe Browsing, DNS público, HaveIBeenPwned, negociaciones TLS en vivo) y heurísticos de modelos de lenguaje de gran tamaño. **No constituyen una garantía de seguridad, validez o ausencia de riesgo**. Las páginas de phishing nuevas aparecen más rápido de lo que las bases de datos de reputación pueden catalogar; un correo electrónico que pase nuestras verificaciones puede seguir siendo inactivo o fraudulento; un certificado SSL válido no certifica el contenido de un sitio. El Editor rechaza expresamente toda responsabilidad por cualquier daño derivado de un correo electrónico de phishing que el Servicio consideró seguro, un enlace inseguro que el Servicio no identificó, un correo transaccional enviado a una dirección que el Servicio marcó como válida o cualquier decisión de seguridad tomada en función de estas herramientas. El Usuario asume la responsabilidad exclusiva de dichas decisiones."
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
              "procesar archivos para los que no posee los derechos necesarios (obras con derechos de autor sin autorización, datos personales que no tiene derecho a procesar, información clasificada);",
              "cometer o facilitar fraude, lavado de dinero, financiación del terrorismo o cualquier actividad delictiva;",
              "utilizar el humanizador de IA, las herramientas de texto de IA o cualquier otra función para plagiar, engañar a un tercero, manipular sistemas de evaluación (académicos, de contratación, redes publicitarias) de manera que viole sus normas, o inducir a error de cualquier forma que infrinja la legislación aplicable;",
              "intentar saturar, ingeniería inversa, raspar, abusar de los límites de velocidad, o interferir de otro modo con el funcionamiento o disponibilidad del Servicio;",
              "eludir cuotas, requisitos de pago u otras restricciones vigentes;",
              "crear múltiples cuentas para multiplicar las cuotas del nivel gratuito o compartir una cuenta con más personas de las permitidas por su plan."
            ]
          },
          {
            "kind": "p",
            "text": "Podemos suspender o dar por terminada su cuenta de inmediato y sin previo aviso si tenemos motivos razonables para creer que ha incumplido esta sección, sin derecho a reembolso alguno."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Su contenido",
        "blocks": [
          {
            "kind": "p",
            "text": "Usted conserva todos los derechos, título e interés sobre los archivos y textos que envíe al Servicio. Nos otorga una licencia estrictamente limitada, no exclusiva, mundial, libre de regalías, para procesarlos únicamente con el fin de proporcionar la herramienta que solicitó. Esta licencia finaliza en el momento en que se le devuelve el resultado (herramientas asistidas por servidor) o nunca llega a existir (herramientas solo de navegador, ya que su archivo nunca llega a nosotros). No reclamamos ni utilizaremos su contenido para entrenar modelos de IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Cuentas",
        "blocks": [
          {
            "kind": "p",
            "text": "Debe tener al menos dieciséis (16) años para crear una cuenta. Es responsable de mantener confidenciales sus credenciales y de cualquier actividad que ocurra bajo su cuenta. Notifíquenos de inmediato a [security@konvertools.com](mailto:security@konvertools.com) cualquier acceso no autorizado sospechoso."
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
              "**Planes**: Gratis (€0), Pro (€12/mes o €99/año), Business (€39/mes o €349/año). Las características y cuotas de los planes se describen en nuestra página de [Precios](/pricing) en el momento de la compra. Nos reservamos el derecho de modificar las características de los planes con 30 días de antelación.",
              "**Renovación automática**: las suscripciones mensuales y anuales se renuevan automáticamente en la misma cadencia hasta que se cancelen. Puede cancelar en cualquier momento desde su panel de control; la cancelación surte efecto al final del período de facturación actual. Mantiene el acceso hasta esa fecha.",
              "**Derecho de desistimiento (UE)**: según el Artículo L. 221-28 del Código de Consumo francés, cuando utiliza activamente el Servicio durante el período inicial de 14 días de desistimiento, consiente expresamente en la ejecución inmediata del contrato y renuncia a su derecho de desistimiento. Si no ha utilizado ninguna función de pago, puede desistir en un plazo de 14 días enviando un correo a [billing@konvertools.com](mailto:billing@konvertools.com) y le reembolsaremos el importe íntegro en un plazo de 14 días.",
              "**Sin reembolsos parciales**: fuera del escenario de desistimiento mencionado anteriormente, las tarifas ya pagadas por el período de facturación actual no son reembolsables.",
              "**Créditos**: los créditos de API comprados como paquetes de un solo uso (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **no caducan**. Los 300 créditos asignados automáticamente cada mes a los suscriptores Business caducan al final del mes calendario y **no son reembolsables**.",
              "**Cambios de precio**: podemos modificar los precios con 30 días de antelación. Los suscriptores existentes mantienen su precio actual hasta su próxima fecha de renovación.",
              "**Impuestos**: los precios se muestran sin IVA cuando corresponda. Stripe recauda e ingresa cualquier impuesto aplicable en su jurisdicción."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. API REST pública",
        "blocks": [
          {
            "kind": "p",
            "text": "El plan Business expone una API REST pública autenticada mediante claves de API que genera desde su panel de control. El uso de la API se rige adicionalmente por:"
          },
          {
            "kind": "ul",
            "items": [
              "**Límites de velocidad**: 60 solicitudes por minuto (ampliaciones Pro) o 120 solicitudes por minuto (Business). El abuso sostenido puede resultar en limitación temporal de velocidad o revocación permanente de la clave.",
              "**Consumo de créditos**: cada llamada a la API deduce créditos según las tarifas publicadas en nuestra [documentación de la API](/api). Las llamadas fallidas (respuestas 5xx) no deducen créditos.",
              "**Seguridad de las claves**: usted es responsable de almacenar sus claves de API de forma segura y rotarlas si se ven comprometidas. Podemos revocar cualquier clave en cualquier momento si sospechamos abuso.",
              "**Uso aguas arriba aceptable**: las aplicaciones construidas sobre nuestra API deben cumplir con estos Términos, incluyendo la sección de uso aceptable. No debe exponer nuestras claves de API a los usuarios finales (licencie su servicio en su lugar)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Propiedad intelectual",
        "blocks": [
          {
            "kind": "p",
            "text": "El nombre, logo, código, diseño, documentación, estructura de la base de datos y contenido agregado del Servicio son propiedad exclusiva del Editor y están protegidos por las leyes de propiedad intelectual francesas e internacionales. No se le otorga ninguna licencia salvo la estrictamente necesaria para usar el Servicio según lo previsto. No puede reproducir, modificar, descompilar ni crear obras derivadas del Servicio o cualquier parte de él, salvo que la ley aplicable lo permita expresamente."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnización",
        "blocks": [
          {
            "kind": "p",
            "text": "Usted acuerda indemnizar y mantener indemne al Editor frente a cualquier reclamación, pérdida, daño, responsabilidad, costo o gasto (incluyendo honorarios legales razonables) derivado de (a) su incumplimiento de estos Términos, (b) su violación de cualquier ley o derecho de terceros, o (c) cualquier contenido que haya enviado al Servicio."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Modificaciones de los Términos",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos modificar estos Términos en cualquier momento. Los cambios sustanciales se notificarán por correo electrónico a los titulares de cuentas con al menos treinta (30) días de antelación antes de que surtan efecto. Al continuar usando el Servicio después de ese período, acepta los Términos modificados. La versión más reciente siempre está disponible en [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Terminación",
        "blocks": [
          {
            "kind": "p",
            "text": "Puede dar por terminada su cuenta en cualquier momento desde su panel de control. Podemos dar por terminada o suspender su cuenta de inmediato y sin previo aviso si incumple estos Términos, abusa del Servicio o no paga una suscripción recurrente. Tras la terminación, sus datos se eliminan en un plazo de treinta (30) días, excepto los registros de facturación y consentimiento que se conservan según lo descrito en nuestra Política de Privacidad."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Ley aplicable y jurisdicción",
        "blocks": [
          {
            "kind": "p",
            "text": "Estos Términos se rigen por las leyes de Francia. Cualquier disputa derivada o relacionada con estos Términos o el Servicio se someterá a la jurisdicción exclusiva de los tribunales de París, Francia, salvo cuando un consumidor tenga derecho a una acción obligatoria en su país de residencia según la legislación de la Unión Europea o nacional aplicable. Antes de iniciar acciones legales, usted acuerda intentar resolver la disputa de manera amistosa escribiendo a [legal@konvertools.com](mailto:legal@konvertools.com). Los consumidores de la UE también pueden utilizar la plataforma de Resolución de Litigios en Línea de la Comisión Europea en [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Disposiciones varias",
        "blocks": [
          {
            "kind": "p",
            "text": "Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes mantienen su plena vigencia. Nuestra falta de aplicación de cualquier derecho o disposición no constituye una renuncia a ese derecho. Estos Términos (junto con la Política de Privacidad y cualquier término específico del plan referenciado en el momento de la compra) constituyen el acuerdo completo entre usted y el Editor con respecto al Servicio."
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
            "text": "Estes Termos de Serviço (os \"Termos\") constituem um acordo vinculativo entre você (o \"Usuário\") e o editor do Konvertools (o \"Editor\", \"nós\", \"nosso\") relativo ao uso do site Konvertools e de todas as ferramentas, APIs e serviços relacionados (coletivamente denominados \"Serviço\"). Ao criar uma conta, marcar a caixa de aceitação no momento do cadastro ou simplesmente ao utilizar qualquer ferramenta do Serviço, você confirma que leu, compreendeu e aceitou estes Termos na íntegra, juntamente com a nossa Política de Privacidade."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. O Serviço",
        "blocks": [
          {
            "kind": "p",
            "text": "O Konvertools oferece um catálogo de utilitários de conversão de arquivos, ferramentas de processamento de documentos e imagens, utilitários de texto assistidos por IA, ferramentas de segurança indicativas (verificador de e-mails, detector de phishing, scanner de URLs, verificador de certificados SSL, verificador de violação de senhas) e utilitários para desenvolvedores. A maioria das ferramentas é executada inteiramente no seu navegador; algumas requerem processamento no servidor. O Serviço é oferecido **\"como está\" e \"na condição em que se encontra\"**, sem qualquer garantia, expressa ou implícita, incluindo comercialização, adequação a um fim específico ou não violação de direitos."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitação de responsabilidade — leia com atenção",
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
              "falhas de serviços de terceiros (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, provedores de hospedagem);",
              "danos indiretos, incidentais, especiais, consequenciais ou punitivos de qualquer tipo;",
              "qualquer montante agregado superior às taxas que você efetivamente pagou à nossa empresa nos doze (12) meses anteriores ao evento que deu origem à reclamação, limitado a cem (100) euros para usuários da camada gratuita."
            ]
          },
          {
            "kind": "p",
            "text": "**Ferramentas de segurança**: o Scanner de URLs, o Detector de Phishing, o Verificador de E-mails, o Verificador de Certificados SSL e o Verificador de Violação de Senhas são fornecidos **apenas para fins informativos e indicativos**. Eles agregam sinais de terceiros (Google Safe Browsing, DNS público, HaveIBeenPwned, handshakes TLS ao vivo) e heurísticas de modelos de linguagem de grande porte. Eles **não constituem garantia de segurança, validade ou ausência de risco**. Novas páginas de phishing surgem mais rápido do que os bancos de dados de reputação conseguem catalogá-las; um e-mail que passa nos nossos testes pode ainda assim estar inativo ou fraudulento; um certificado SSL válido não certifica o conteúdo de um site. O Editor expressamente declina de qualquer responsabilidade por quaisquer danos resultantes de um e-mail de phishing que o Serviço considerou seguro, de um link inseguro que o Serviço não conseguiu identificar, de um e-mail transacional enviado a um endereço que o Serviço marcou como válido ou de qualquer decisão de segurança tomada com base nestas ferramentas. O Usuário assume total responsabilidade por tais decisões."
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
              "processar arquivos para os quais você não detenha os direitos necessários (obras protegidas por direitos autorais sem autorização, dados pessoais que não tem direito de processar, informações classificadas);",
              "cometer ou facilitar fraude, lavagem de dinheiro, financiamento do terrorismo ou qualquer atividade criminosa;",
              "utilizar o humanizador de IA, as ferramentas de texto de IA ou qualquer outro recurso para plagiar, enganar terceiros, manipular sistemas de avaliação (acadêmicos, recrutamento, redes de anúncios) de forma contrária às suas regras ou induzir em erro de qualquer maneira que viole a legislação aplicável;",
              "tentar sobrecarregar, reverter engenharia, raspar, abusar de limites de taxa ou, de outra forma, interferir na operação ou disponibilidade do Serviço;",
              "contornar cotas, requisitos de pagamento ou quaisquer outras restrições em vigor;",
              "criar múltiplas contas para multiplicar cotas da camada gratuita ou compartilhar uma conta com mais indivíduos do que o permitido pelo seu plano."
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
            "text": "Você mantém todos os direitos, título e interesse nos arquivos e textos que enviar ao Serviço. Você nos concede uma licença limitada, não exclusiva, mundial, livre de royalties, para processá-los unicamente para fornecer a ferramenta que você solicitou. Esta licença termina no momento em que o resultado é retornado a você (ferramentas assistidas por servidor) ou nunca chega a existir (ferramentas executadas apenas no navegador, uma vez que seu arquivo nunca chega até nós). Não reivindicamos, nem reivindicaremos, propriedade sobre o seu conteúdo ou o utilizaremos para treinar modelos de IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Contas",
        "blocks": [
          {
            "kind": "p",
            "text": "Você deve ter pelo menos dezesseis (16) anos de idade para criar uma conta. Você é responsável por manter suas credenciais confidenciais e por qualquer atividade que ocorra sob sua conta. Notifique-nos imediatamente em [security@konvertools.com](mailto:security@konvertools.com) sobre qualquer acesso não autorizado suspeito."
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
              "**Planos**: Gratuito (€0), Pro (€12/mês ou €99/ano), Business (€39/mês ou €349/ano). Os recursos e cotas dos planos são os descritos em nossa página de [Preços](/pricing) no momento da compra. Reservamo-nos o direito de alterar os recursos dos planos com 30 dias de antecedência.",
              "**Renovação automática**: assinaturas mensais e anuais são renovadas automaticamente na mesma periodicidade até serem canceladas. Você pode cancelar a qualquer momento pelo seu painel; o cancelamento entra em vigor no final do período de faturamento atual. Você mantém o acesso até essa data.",
              "**Direito de arrependimento (UE)**: nos termos do Artigo L. 221-28 do Código de Defesa do Consumidor francês, quando você utiliza ativamente o Serviço durante o período inicial de 14 dias de arrependimento, você expressamente consente com a execução imediata do contrato e renuncia ao seu direito de arrependimento. Se você não utilizou nenhum recurso pago, poderá se arrepender dentro de 14 dias enviando um e-mail para [billing@konvertools.com](mailto:billing@konvertools.com) e nós reembolsaremos integralmente em até 14 dias.",
              "**Sem reembolsos parciais**: fora do cenário de arrependimento acima, taxas já pagas pelo período de faturamento atual não são reembolsáveis.",
              "**Créditos**: créditos de API adquiridos como pacotes únicos (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **nunca expiram**. Os 300 créditos concedidos automaticamente a cada mês aos assinantes Business expiram no final do mês civil e **não são reembolsáveis**.",
              "**Alterações de preço**: podemos alterar os preços com 30 dias de antecedência. Assinantes existentes mantêm o preço atual até a próxima data de renovação.",
              "**Impostos**: os preços são exibidos sem IVA, quando aplicável. O Stripe coleta e repassa quaisquer impostos devidos na sua jurisdição."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. API REST Pública",
        "blocks": [
          {
            "kind": "p",
            "text": "O plano Business expõe uma API REST pública autenticada por chaves de API que você gera pelo seu painel. O uso da API é regido adicionalmente por:"
          },
          {
            "kind": "ul",
            "items": [
              "**Limites de taxa**: 60 solicitações por minuto (acréscimos Pro) ou 120 solicitações por minuto (Business). Abuso prolongado pode resultar em limitação temporária ou revogação permanente da chave.",
              "**Consumo de créditos**: cada chamada à API deduz créditos nas taxas publicadas na nossa [documentação da API](/api). Chamadas malsucedidas (respostas 5xx) não deduzem créditos.",
              "**Segurança da chave**: você é responsável por armazenar suas chaves de API de forma segura e rotacioná-las em caso de comprometimento. Podemos revogar qualquer chave a qualquer momento se suspeitarmos de abuso.",
              "**Uso aceitável upstream**: aplicações construídas sobre a nossa API devem cumprir estes Termos, incluindo a seção de uso aceitável. Você não deve expor nossas chaves de API a usuários finais (licencie seu serviço de forma alternativa)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Propriedade intelectual",
        "blocks": [
          {
            "kind": "p",
            "text": "O nome, logotipo, código, design, documentação, estrutura de banco de dados e conteúdo agregado do Serviço são propriedade exclusiva do Editor e estão protegidos pelas leis de propriedade intelectual francesa e internacional. Nenhuma licença é concedida a você além do estritamente necessário para usar o Serviço conforme pretendido. Você não pode reproduzir, modificar, descompilar ou criar obras derivadas do Serviço ou de qualquer parte dele, exceto conforme expressamente permitido pela lei aplicável."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indenização",
        "blocks": [
          {
            "kind": "p",
            "text": "Você concorda em indenizar e manter o Editor isento de quaisquer reclamações, perdas, danos, responsabilidades, custos ou despesas (incluindo honorários advocatícios razoáveis) decorrentes de (a) seu descumprimento destes Termos, (b) sua violação de qualquer lei ou direito de terceiros, ou (c) qualquer conteúdo que você tenha enviado ao Serviço."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Alterações nos Termos",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos alterar estes Termos periodicamente. Alterações substanciais serão notificadas por e-mail aos titulares de contas com pelo menos trinta (30) dias de antecedência antes de entrarem em vigor. Ao continuar a usar o Serviço após esse período, você aceita os Termos alterados. A versão mais recente está sempre disponível em [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Encerramento",
        "blocks": [
          {
            "kind": "p",
            "text": "Você pode encerrar sua conta a qualquer momento pelo seu painel. Podemos encerrar ou suspender sua conta imediatamente e sem aviso prévio se violar estes Termos, abusar do Serviço ou deixar de pagar uma assinatura recorrente. Após o encerramento, seus dados são excluídos em até trinta (30) dias, exceto registros de faturamento e consentimento, que são retidos conforme descrito na nossa Política de Privacidade."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Lei aplicável e jurisdição",
        "blocks": [
          {
            "kind": "p",
            "text": "Estes Termos são regidos pelas leis da França. Qualquer disputa decorrente ou relacionada a estes Termos ou ao Serviço será submetida à jurisdição exclusiva dos tribunais de Paris, França, exceto quando o direito de ação obrigatório do consumidor no seu país de residência prevalecer nos termos da legislação da União Europeia ou nacional aplicável. Antes de iniciar uma ação judicial, você concorda em tentar resolver a disputa de forma amigável escrevendo para [legal@konvertools.com](mailto:legal@konvertools.com). Consumidores da UE também podem utilizar a plataforma de Resolução de Litígios de Consumidores da Comissão Europeia em [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Disposições diversas",
        "blocks": [
          {
            "kind": "p",
            "text": "Se qualquer disposição destes Termos for considerada inválida ou inexequível, as disposições restantes permanecem em pleno vigor. Nossa falha em fazer valer qualquer direito ou disposição não constitui renúncia a esse direito. Estes Termos (juntamente com a Política de Privacidade e quaisquer termos específicos do plano referenciados na compra) constituem o acordo integral entre você e o Editor relativo ao Serviço."
          }
        ]
      }
    ]
  },
  "de": {
    "h1": "Nutzungsbedingungen",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Stand: %DATE% · Durch die Nutzung von Konvertools stimmen Sie diesen Bedingungen zu.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Annahme",
        "blocks": [
          {
            "kind": "p",
            "text": "Diese Nutzungsbedingungen (die „Bedingungen“) bilden eine verbindliche Vereinbarung zwischen Ihnen (dem „Nutzer“) und dem Herausgeber von Konvertools (dem „Herausgeber“, „wir“, „uns“) in Bezug auf Ihre Nutzung der Konvertools-Website sowie aller damit verbundenen Tools, APIs und Dienste (gemeinsam der „Dienst“). Durch die Erstellung eines Kontos, das Ankreuzen der Akzeptanzbox bei der Registrierung oder durch die einfache Nutzung eines Tools auf dem Dienst bestätigen Sie, dass Sie diese Bedingungen in vollem Umfang gelesen, verstanden und akzeptiert haben, zusammen mit unserer Datenschutzerklärung."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Der Dienst",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools bietet einen Katalog an Datei-Konvertierungsprogrammen, Dokumenten- und Bildbearbeitungstools, KI-gestützten Textprogrammen, indikativen Sicherheitstools (E-Mail-Prüfer, Phishing-Detektor, URL-Scanner, SSL-Zertifikatsprüfer, Passwort-Breach-Checker) sowie Entwickler-Tools. Die meisten Tools laufen vollständig in Ihrem Browser; einige erfordern eine serverseitige Verarbeitung. Der Dienst wird **„wie er ist“ und „wie verfügbar“** ohne Gewährleistung jedweder Art angeboten, weder ausdrücklich noch stillschweigend, einschließlich der Marktfähigkeit, Eignung für einen bestimmten Zweck oder Rechtsmangelfreiheit."
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
              "Datenverlust, beschädigte oder fehlerhafte Dateien oder fehlgeschlagene Konvertierungen;",
              "Entscheidungen, finanzieller, geschäftlicher oder sonstiger Art, die Sie auf Grundlage der Ausgabe eines Tools treffen;",
              "Ausfallzeiten, Latenz oder vorübergehende Nichtverfügbarkeit einer Funktion;",
              "Ausfälle von Drittanbietern (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, Hosting-Anbieter);",
              "mittelbare, zufällige, besondere, Folgeschäden oder Strafschäden jedweder Art;",
              "einen Gesamtbetrag, der den von Ihnen tatsächlich in den zwölf (12) Monaten vor dem Schadensereignis an uns gezahlten Gebühren übersteigt, begrenzt auf einhundert (100) Euro für Nutzer des kostenlosen Tarifs."
            ]
          },
          {
            "kind": "p",
            "text": "**Sicherheitstools**: Der URL-Scanner, der Phishing-Detektor, der E-Mail-Prüfer, der SSL-Zertifikatsprüfer und der Passwort-Breach-Checker werden **ausschließlich zu Informations- und Indikationszwecken** bereitgestellt. Sie aggregieren Signale von Drittanbietern (Google Safe Browsing, öffentliche DNS, HaveIBeenPwned, Live-TLS-Handshakes) sowie KI-Heuristiken. Sie **stellen keine Garantie für Sicherheit, Gültigkeit oder Abwesenheit von Risiken** dar. Neue Phishing-Seiten entstehen schneller, als Reputationsdatenbanken sie katalogisieren können; eine E-Mail, die unsere Prüfungen besteht, kann dennoch inaktiv oder betrügerisch sein; ein gültiges SSL-Zertifikat bestätigt nicht den Inhalt einer Website. Der Herausgeber lehnt jede Haftung für Schäden ab, die aus einer Phishing-E-Mail entstehen, die der Dienst als sicher eingestuft hat, einem unsicheren Link, den der Dienst nicht identifiziert hat, einer Transaktions-E-Mail, die an eine Adresse gesendet wurde, die der Dienst als gültig markiert hat, oder jedweder Sicherheitsentscheidung, die auf Grundlage dieser Tools getroffen wurde. Der Nutzer trägt die alleinige Verantwortung für solche Entscheidungen."
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
              "Dateien zu verarbeiten, für die Sie nicht die erforderlichen Rechte besitzen (urheberrechtlich geschützte Werke ohne Genehmigung, personenbezogene Daten, zu deren Verarbeitung Sie nicht berechtigt sind, klassifizierte Informationen);",
              "Betrug, Geldwäsche, die Finanzierung von Terrorismus oder jedwede kriminelle Aktivität zu begehen oder zu erleichtern;",
              "den KI-Humanizer, die KI-Text-Tools oder ein anderes Feature zu nutzen, um zu plagiieren, eine dritte Partei zu täuschen, Bewertungssysteme (akademische, Personalauswahl, Werbenetzwerke) in einer Weise zu manipulieren, die deren Regeln widerspricht, oder auf sonstige Weise zu täuschen, die gegen geltendes Recht verstößt;",
              "den Dienst zu überlasten, rückzuentwickeln, zu scrapen, Rate-Limits zu missbrauchen oder auf sonstige Weise den Betrieb oder die Verfügbarkeit des Dienstes zu beeinträchtigen;",
              "Quoten, Zahlungsanforderungen oder andere Einschränkungen zu umgehen;",
              "mehrere Konten zu erstellen, um die kostenlosen Tarifquoten zu vervielfachen, oder ein Konto mit mehr Personen zu teilen, als Ihr Tarif zulässt."
            ]
          },
          {
            "kind": "p",
            "text": "Wir können Ihr Konto unverzüglich und ohne Vorankündigung sperren oder kündigen, wenn wir berechtigten Grund zu der Annahme haben, dass Sie gegen diesen Abschnitt verstoßen haben, ohne Anspruch auf eine Rückerstattung jedweder Art."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ihre Inhalte",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie behalten alle Rechte, Titel und Interessen an den Dateien und Texten, die Sie in den Dienst hochladen. Sie erteilen uns eine streng begrenzte, gebührenfreie, weltweite Lizenz zur Verarbeitung derselben ausschließlich, um das von Ihnen angeforderte Tool bereitzustellen. Diese Lizenz endet in dem Moment, in dem das Ergebnis an Sie zurückgegeben wird (servergestützte Tools) oder kommt überhaupt nicht zustande (browserbasierte Tools, da Ihre Datei uns nie erreicht). Wir erheben und werden keine Eigentumsansprüche an Ihren Inhalten geltend machen oder diese zur Schulung von KI-Modellen nutzen."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konten",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie müssen mindestens sechzehn (16) Jahre alt sein, um ein Konto zu erstellen. Sie sind für die vertrauliche Behandlung Ihrer Zugangsdaten sowie für jede Aktivität verantwortlich, die unter Ihrem Konto stattfindet. Benachrichtigen Sie uns unverzüglich unter [security@konvertools.com](mailto:security@konvertools.com) bei jedem Verdacht auf unbefugten Zugriff."
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
              "**Tarife**: Kostenlos (€0), Pro (€12/Monat oder €99/Jahr), Business (€39/Monat oder €349/Jahr). Die Funktionen und Quoten der Tarife sind wie auf unserer [Preisseite](/pricing) zum Zeitpunkt des Kaufs beschrieben. Wir behalten uns vor, Tariffunktionen mit 30-tägiger Vorankündigung zu ändern.",
              "**Automatische Verlängerung**: Monatliche und jährliche Abonnements verlängern sich automatisch in derselben Frequenz, bis sie gekündigt werden. Sie können jederzeit über Ihr Dashboard kündigen; die Kündigung wird am Ende der aktuellen Abrechnungsperiode wirksam. Sie behalten bis dahin den Zugriff.",
              "**Widerrufsrecht (EU)**: Gemäß Artikel L. 221-28 des französischen Verbrauchergesetzbuchs erklären Sie sich durch die aktive Nutzung des Dienstes während der anfänglichen 14-tägigen Widerrufsfrist ausdrücklich mit der sofortigen Vertragserfüllung einverstanden und verzichten auf Ihr Widerrufsrecht. Falls Sie keine kostenpflichtigen Funktionen genutzt haben, können Sie innerhalb von 14 Tagen per E-Mail an [billing@konvertools.com](mailto:billing@konvertools.com) widerrufen, und wir erstatten Ihnen den vollen Betrag innerhalb von 14 Tagen.",
              "**Keine Teilrückerstattungen**: Außerhalb des oben genannten Widerrufsfalls sind bereits gezahlte Gebühren für die aktuelle Abrechnungsperiode nicht erstattungsfähig.",
              "**Guthaben**: Als Einmalkäufe erworbene API-Guthaben („Starter“, „Growth“, „Scale“, „Studio“) **verfallen nie**. Die jedem Business-Abonnenten monatlich automatisch gutgeschriebenen 300 Guthaben verfallen am Ende des Kalendermonats und sind **nicht erstattungsfähig**.",
              "**Preisanpassungen**: Wir können die Preise mit 30-tägiger Vorankündigung anpassen. Bestehende Abonnenten behalten ihren aktuellen Preis bis zum nächsten Verlängerungstermin.",
              "**Steuer**: Die Preise werden gegebenenfalls ohne MwSt. angezeigt. Stripe erhebt und überweist die in Ihrer Rechtsordnung fällige Steuer."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Öffentliche REST-API",
        "blocks": [
          {
            "kind": "p",
            "text": "Der Business-Tarif stellt eine öffentliche REST-API bereit, die durch API-Schlüssel authentifiziert wird, die Sie über Ihr Dashboard generieren. Die Nutzung der API unterliegt zusätzlich den folgenden Bedingungen:"
          },
          {
            "kind": "ul",
            "items": [
              "**Rate-Limits**: 60 Anfragen pro Minute (Pro-Aufstockungen) oder 120 Anfragen pro Minute (Business). Andauernder Missbrauch kann zu vorübergehender Drosselung oder dauerhafter Schlüsselentziehung führen.",
              "**Guthabenverbrauch**: Jeder API-Aufruf zieht Guthaben gemäß den in unserer [API-Dokumentation](/api) veröffentlichten Sätzen ab. Fehlgeschlagene Aufrufe (5xx-Antworten) ziehen keine Guthaben ab.",
              "**Schlüsselsicherheit**: Sie sind für die sichere Speicherung Ihrer API-Schlüssel und deren Rotation bei Verdacht auf Kompromittierung verantwortlich. Wir können jeden Schlüssel jederzeit entziehen, wenn wir Missbrauch vermuten.",
              "**Zulässige Nutzung durch Dritte**: Anwendungen, die auf unserer API aufbauen, müssen diese Bedingungen einhalten, einschließlich des Abschnitts zur zulässigen Nutzung. Sie dürfen unsere API-Schlüssel nicht an Endnutzer weitergeben (lizenzieren Sie stattdessen Ihren Dienst weiter)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Geistiges Eigentum",
        "blocks": [
          {
            "kind": "p",
            "text": "Name, Logo, Code, Design, Dokumentation, Datenbankstruktur und aggregierte Inhalte des Dienstes sind ausschließliches Eigentum des Herausgebers und unterliegen dem französischen und internationalen Recht des geistigen Eigentums. Ihnen wird keine Lizenz eingeräumt, außer derjenigen, die zur Nutzung des Dienstes wie vorgesehen strikt erforderlich ist. Sie dürfen den Dienst oder Teile davon weder reproduzieren, modifizieren, dekompilieren noch abgeleitete Werke erstellen, es sei denn, dies ist ausdrücklich durch geltendes Recht gestattet."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Freistellung",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie verpflichten sich, den Herausgeber von jedweder Forderung, Verlust, Schaden, Haftung, Kosten oder Aufwand (einschließlich angemessener Rechtsanwaltskosten) freizustellen und ihn schadlos zu halten, die sich aus (a) Ihrem Verstoß gegen diese Bedingungen, (b) Ihrer Verletzung von Gesetzen oder Rechten Dritter oder (c) jedwedem Inhalt, den Sie in den Dienst hochgeladen haben, ergeben."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Änderungen der Bedingungen",
        "blocks": [
          {
            "kind": "p",
            "text": "Wir können diese Bedingungen von Zeit zu Zeit ändern. Wesentliche Änderungen werden Kontoinhabern mindestens dreißig (30) Tage vor Inkrafttreten per E-Mail mitgeteilt. Durch die weitere Nutzung des Dienstes nach diesem Zeitraum akzeptieren Sie die geänderten Bedingungen. Die jeweils aktuelle Version ist stets unter [https://konvertools.com/terms](https://konvertools.com/terms) verfügbar."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Beendigung",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie können Ihr Konto jederzeit über Ihr Dashboard kündigen. Wir können Ihr Konto unverzüglich und ohne Vorankündigung kündigen oder sperren, wenn Sie gegen diese Bedingungen verstoßen, den Dienst missbrauchen oder eine wiederkehrende Zahlung nicht leisten. Nach der Kündigung werden Ihre Daten innerhalb von dreißig (30) Tagen gelöscht, mit Ausnahme von Abrechnungs- und Einwilligungsdaten, die gemäß unserer Datenschutzerklärung aufbewahrt werden."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Anwendbares Recht und Gerichtsstand",
        "blocks": [
          {
            "kind": "p",
            "text": "Diese Bedingungen unterliegen dem Recht Frankreichs. Jede Streitigkeit, die sich aus oder im Zusammenhang mit diesen Bedingungen oder dem Dienst ergibt, unterliegt der ausschließlichen Zuständigkeit der Gerichte von Paris, Frankreich, sofern nicht ein Verbraucher nach EU-Recht oder nationalem Recht ein zwingendes Klagerecht in seinem Wohnsitzland hat. Bevor Sie rechtliche Schritte einleiten, stimmen Sie zu, den Streit gütlich zu regeln, indem Sie eine E-Mail an [legal@konvertools.com](mailto:legal@konvertools.com) senden. EU-Verbraucher können auch die Online-Streitbeilegungsplattform der Europäischen Kommission unter [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) nutzen."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Sonstiges",
        "blocks": [
          {
            "kind": "p",
            "text": "Falls eine Bestimmung dieser Bedingungen für unwirksam oder nicht durchsetzbar erklärt wird, bleiben die übrigen Bestimmungen in vollem Umfang wirksam. Unsere Unterlassung der Durchsetzung eines Rechts oder einer Bestimmung stellt keinen Verzicht auf dieses Recht dar. Diese Bedingungen (zusammen mit der Datenschutzerklärung und jedweden tarifspezifischen Bedingungen, auf die beim Kauf verwiesen wird) bilden die gesamte Vereinbarung zwischen Ihnen und dem Herausgeber in Bezug auf den Dienst."
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
            "text": "Queste Condizioni di Servizio (i \"Termini\") costituiscono un accordo vincolante tra te (l'\"Utente\") e il titolare di Konvertools (il \"Titolare\", \"noi\", \"ci\") in merito all'utilizzo del sito web Konvertools e di tutti gli strumenti, API e servizi correlati (collettivamente il \"Servizio\"). Creando un account, spuntando la casella di accettazione all'iscrizione o semplicemente utilizzando uno strumento del Servizio, confermi di aver letto, compreso e accettato integralmente questi Termini, insieme alla nostra Informativa sulla Privacy."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Il Servizio",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools offre un catalogo di utility per la conversione di file, strumenti di elaborazione di documenti e immagini, utility di testo assistite da IA, strumenti di sicurezza indicativi (verificatore di email, rilevatore di phishing, scanner di URL, controllo dei certificati SSL, controllo delle violazioni delle password) e utility per sviluppatori. La maggior parte degli strumenti viene eseguita interamente nel tuo browser; alcuni richiedono l'elaborazione lato server. Il Servizio viene fornito **\"così com'è\" e \"come disponibile\"** senza alcuna garanzia di alcun tipo, espressa o implicita, inclusa la commerciabilità, l'idoneità per uno scopo particolare o la non violazione di diritti di terzi."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitazione di responsabilità — leggere attentamente",
        "blocks": [
          {
            "kind": "p",
            "text": "**Nei limiti massimi consentiti dalla legge, il Titolare declina qualsiasi responsabilità per danni di qualsiasi tipo derivanti dall'uso o dalla mancata possibilità di utilizzare il Servizio.** In particolare, riconosci e accetti che il Titolare non sarà responsabile per:"
          },
          {
            "kind": "ul",
            "items": [
              "perdita di dati, file corrotti o errati, o conversioni non riuscite;",
              "decisioni, finanziarie, commerciali o di altro tipo, che prendi in base ai risultati di qualsiasi strumento;",
              "tempi di inattività, latenza o indisponibilità temporanea di qualsiasi funzionalità;",
              "guasti di servizi di terze parti (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, provider di hosting);",
              "danni indiretti, incidentali, speciali, consequenziali o punitivi di qualsiasi tipo;",
              "qualsiasi importo complessivo superiore alle tariffe effettivamente pagate a noi nei dodici (12) mesi precedenti l'evento che dà origine alla richiesta, con un limite massimo di cento (100) euro per gli utenti del piano gratuito."
            ]
          },
          {
            "kind": "p",
            "text": "**Strumenti di sicurezza**: lo Scanner di URL, il Rilevatore di Phishing, il Verificatore di Email, il Controllo dei Certificati SSL e il Controllo delle Violazioni delle Password vengono forniti **solo a scopo informativo e indicativo**. Essi aggregato segnali di terze parti (Google Safe Browsing, DNS pubblici, HaveIBeenPwned, handshake TLS in tempo reale) e euristiche basate su modelli linguistici di grandi dimensioni. Non **costituiscono una garanzia di sicurezza, validità o assenza di rischi**. Nuove pagine di phishing compaiono più velocemente di quanto i database di reputazione possano catalogarle; un'email che supera i nostri controlli potrebbe comunque essere inattiva o fraudolenta; un certificato SSL valido non certifica il contenuto di un sito. Il Titolare declina espressamente ogni responsabilità per qualsiasi danno derivante da un'email di phishing che il Servizio ha ritenuto sicura, da un link non sicuro che il Servizio non ha identificato, da un'email transazionale inviata a un indirizzo che il Servizio ha segnalato come valido, o da qualsiasi decisione di sicurezza presa sulla base di questi strumenti. L'Utente assume la piena responsabilità di tali decisioni."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Uso accettabile",
        "blocks": [
          {
            "kind": "p",
            "text": "Accetti di **non** utilizzare il Servizio per:"
          },
          {
            "kind": "ul",
            "items": [
              "caricare, elaborare o distribuire contenuti illegali nella tua giurisdizione o in Francia;",
              "elaborare file per i quali non si possiedono i diritti necessari (opere protette da copyright senza autorizzazione, dati personali che non si è autorizzati a trattare, informazioni classificate);",
              "commettere o facilitare frodi, riciclaggio di denaro, finanziamento del terrorismo o qualsiasi attività criminale;",
              "utilizzare l'umanizzatore AI, gli strumenti di testo AI o qualsiasi altra funzionalità per plagiare, ingannare un terzo, manipolare sistemi di valutazione (accademici, di reclutamento, reti pubblicitarie) in modo da violare le loro regole, o per fuorviare in qualsiasi modo che violi la legge applicabile;",
              "tentare di sovraccaricare, ingegnerizzare al contrario, fare scraping, abusare dei limiti di velocità, o interferire in altro modo con il funzionamento o la disponibilità del Servizio;",
              "eludere quote, requisiti di pagamento o qualsiasi altra restrizione in vigore;",
              "creare più account per moltiplicare le quote del piano gratuito o condividere un account con più persone di quante ne permetta il tuo piano."
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
            "text": "Conservi tutti i diritti, titoli e interessi nei file e nei testi che invii al Servizio. Ci concedi una licenza limitata, gratuita, mondiale e non esclusiva per elaborarli esclusivamente al fine di fornirti lo strumento richiesto. Tale licenza termina nel momento in cui il risultato viene restituito a te (strumenti assistiti dal server) o non entra mai in vigore (strumenti solo lato browser, poiché il tuo file non ci viene mai trasmesso). Non rivendichiamo, né lo faremo, la proprietà dei tuoi contenuti né li utilizziamo per addestrare modelli AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Account",
        "blocks": [
          {
            "kind": "p",
            "text": "Devi avere almeno sedici (16) anni per creare un account. Sei responsabile della riservatezza delle tue credenziali e di qualsiasi attività che avviene sotto il tuo account. Comunicaci immediatamente all'indirizzo [security@konvertools.com](mailto:security@konvertools.com) qualsiasi accesso non autorizzato sospetto."
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
              "**Piani**: Gratuito (€0), Pro (€12/mese o €99/anno), Business (€39/mese o €349/anno). Le funzionalità e le quote dei piani sono descritte nella nostra pagina [Prezzi](/pricing) al momento dell'acquisto. Ci riserviamo il diritto di modificare le funzionalità dei piani con un preavviso di 30 giorni.",
              "**Rinnovo automatico**: gli abbonamenti mensili e annuali si rinnovano automaticamente alla stessa cadenza fino alla cancellazione. Puoi annullare in qualsiasi momento dal tuo pannello di controllo; la cancellazione avrà effetto alla fine del periodo di fatturazione corrente. Mantieni l'accesso fino a quella data.",
              "**Diritto di recesso (UE)**: ai sensi dell'Articolo L. 221-28 del Codice del Consumo francese, qualora tu utilizzi attivamente il Servizio durante il periodo iniziale di 14 giorni per il recesso, dai il tuo consenso espresso all'esecuzione immediata del contratto e rinunci al tuo diritto di recesso. Se non hai utilizzato alcuna funzionalità a pagamento, puoi recedere entro 14 giorni inviando un'email a [billing@konvertools.com](mailto:billing@konvertools.com) e provvederemo a rimborsarti l'intero importo entro 14 giorni.",
              "**Nessun rimborso parziale**: al di fuori dello scenario di recesso sopra descritto, le tariffe già pagate per il periodo di fatturazione corrente non sono rimborsabili.",
              "**Crediti**: i crediti API acquistati come pacchetti una tantum (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **non scadono mai**. I 300 crediti concessi automaticamente ogni mese agli utenti Business scadono alla fine del mese solare e **non sono rimborsabili**.",
              "**Modifiche dei prezzi**: possiamo modificare i prezzi con un preavviso di 30 giorni. Gli abbonati esistenti mantengono il prezzo attuale fino alla data di rinnovo successiva.",
              "**Imposte**: i prezzi sono indicati al netto dell'IVA ove applicabile. Stripe raccoglie e versa qualsiasi imposta dovuta nella tua giurisdizione."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. API REST pubblica",
        "blocks": [
          {
            "kind": "p",
            "text": "Il piano Business espone un'API REST pubblica autenticata tramite chiavi API che puoi generare dal tuo pannello di controllo. L'uso dell'API è inoltre regolato da:"
          },
          {
            "kind": "ul",
            "items": [
              "**Limiti di velocità**: 60 richieste al minuto (aggiunte Pro) o 120 richieste al minuto (Business). Abusi prolungati possono comportare un temporaneo rallentamento o la revoca permanente della chiave.",
              "**Consumo di crediti**: ogni chiamata API sottrae crediti secondo le tariffe pubblicate nella nostra [documentazione API](/api). Le chiamate non riuscite (risposte 5xx) non sottraggono crediti.",
              "**Sicurezza delle chiavi**: sei responsabile della conservazione sicura delle tue chiavi API e della loro rotazione in caso di compromissione. Possiamo revocare qualsiasi chiave in qualsiasi momento se sospettiamo un abuso.",
              "**Uso accettabile a monte**: le applicazioni costruite sulla nostra API devono rispettare questi Termini, inclusa la sezione sull'uso accettabile. Non devi esporre le nostre chiavi API agli utenti finali (sub-licenzia il tuo servizio invece)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Proprietà intellettuale",
        "blocks": [
          {
            "kind": "p",
            "text": "Il nome, il logo, il codice, il design, la documentazione, la struttura del database e i contenuti aggregati del Servizio sono di esclusiva proprietà del Titolare e sono tutelati dalla legge francese e internazionale in materia di proprietà intellettuale. Non ti viene concessa alcuna licenza oltre a quella strettamente necessaria per utilizzare il Servizio come previsto. Non puoi riprodurre, modificare, decompilare o creare opere derivate del Servizio o di qualsiasi sua parte, salvo quanto espressamente consentito dalla legge applicabile."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Manleva",
        "blocks": [
          {
            "kind": "p",
            "text": "Accetti di manlevare e tenere indenne il Titolare da qualsiasi richiesta, perdita, danno, responsabilità, costo o spesa (inclusi gli onorari legali ragionevoli) derivante da (a) la tua violazione di questi Termini, (b) la tua violazione di qualsiasi legge o diritto di terzi, o (c) qualsiasi contenuto che hai inviato al Servizio."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Modifiche ai Termini",
        "blocks": [
          {
            "kind": "p",
            "text": "Possiamo modificare questi Termini di volta in volta. Le modifiche sostanziali verranno comunicate tramite email agli utenti registrati almeno trenta (30) giorni prima della loro entrata in vigore. Continuando a utilizzare il Servizio dopo tale periodo, accetti i Termini modificati. L'ultima versione è sempre disponibile all'indirizzo [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Risoluzione",
        "blocks": [
          {
            "kind": "p",
            "text": "Puoi terminare il tuo account in qualsiasi momento dal tuo pannello di controllo. Possiamo terminare o sospendere il tuo account immediatamente e senza preavviso se violi questi Termini, abusi del Servizio o non paghi un abbonamento ricorrente. Al termine dell'account, i tuoi dati vengono eliminati entro trenta (30) giorni, ad eccezione dei registri di fatturazione e dei consensi conservati come descritto nella nostra Informativa sulla Privacy."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Legge applicabile e foro competente",
        "blocks": [
          {
            "kind": "p",
            "text": "Questi Termini sono regolati dalle leggi della Francia. Qualsiasi controversia derivante o connessa a questi Termini o al Servizio deve essere sottoposta alla giurisdizione esclusiva dei tribunali di Parigi, Francia, salvo qualora il consumatore possa avvalersi di un diritto di azione obbligatorio nel proprio paese di residenza ai sensi del diritto dell'Unione Europea o della legge nazionale applicabile. Prima di intraprendere azioni legali, accetti di tentare di risolvere la controversia in via amichevole scrivendo a [legal@konvertools.com](mailto:legal@konvertools.com). I consumatori dell'UE possono inoltre utilizzare la piattaforma di risoluzione delle controversie online della Commissione Europea all'indirizzo [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Disposizioni varie",
        "blocks": [
          {
            "kind": "p",
            "text": "Se una disposizione di questi Termini viene ritenuta invalida o non applicabile, le restanti disposizioni rimangono pienamente in vigore. La nostra mancata applicazione di un diritto o di una disposizione non costituisce una rinuncia a tale diritto. Questi Termini (insieme all'Informativa sulla Privacy e a eventuali termini specifici del piano richiamati all'acquisto) costituiscono l'intero accordo tra te e il Titolare in merito al Servizio."
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
            "text": "Deze Gebruiksvoorwaarden (de \"Voorwaarden\") vormen een bindende overeenkomst tussen u (de \"Gebruiker\") en de uitgever van Konvertools (de \"Uitgever\", \"wij\", \"ons\") met betrekking tot uw gebruik van de website van Konvertools en alle bijbehorende tools, API's en diensten (gezamenlijk de \"Dienst\"). Door een account aan te maken, het acceptatievakje bij inschrijving aan te vinken of door simpelweg een tool op de Dienst te gebruiken, bevestigt u dat u deze Voorwaarden volledig heeft gelezen, begrepen en geaccepteerd, samen met ons Privacybeleid."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. De Dienst",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools biedt een catalogus met bestandsconversiehulpmiddelen, document- en afbeeldingsverwerkingsgereedschappen, AI-ondersteunde teksthulpmiddelen, indicatieve beveiligingsgereedschappen (e-mailverifier, phishingdetector, URL-scanner, SSL-certificaatcontrole, wachtwoordbreukcontrole) en ontwikkelaarshulpmiddelen. De meeste tools werken volledig in uw browser; sommige vereisen serververwerking. De Dienst wordt aangeboden **\"zoals het is\" en \"zoals beschikbaar\"** zonder enige vorm van garantie, uitdrukkelijk of stilzwijgend, waaronder maar niet beperkt tot verkoopbaarheid, geschiktheid voor een bepaald doel of niet-inbreuk op rechten."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Aansprakelijkheidsbeperking — lees zorgvuldig",
        "blocks": [
          {
            "kind": "p",
            "text": "**Voor zover wettelijk toegestaan, wijst de Uitgever elke aansprakelijkheid af voor schade van welke aard dan ook die voortvloeit uit uw gebruik van, of onvermogen om de Dienst te gebruiken.** In het bijzonder erkent en gaat u akkoord met het volgende: de Uitgever is niet aansprakelijk voor:"
          },
          {
            "kind": "ul",
            "items": [
              "verlies van gegevens, beschadigde of incorrecte bestanden, of mislukte conversies;",
              "beslissingen, financieel, zakelijk of anderszins, die u neemt op basis van de output van een tool;",
              "downtime, latentie of tijdelijke onbeschikbaarheid van een functie;",
              "storingen bij derde partijen (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, hostingproviders);",
              "indirecte, incidentele, speciale, gevolgschade of punitieve schadevergoedingen van welke aard dan ook;",
              "een totaalbedrag dat hoger is dan de kosten die u daadwerkelijk in de twaalf (12) maanden voorafgaand aan het voorval dat aan de claim ten grondslag ligt aan ons heeft betaald, met een maximum van honderd (100) euro voor gebruikers van het gratis abonnement."
            ]
          },
          {
            "kind": "p",
            "text": "**Beveiligingsgereedschappen**: de URL-scanner, de phishingdetector, de e-mailverifier, de SSL-certificaatcontrole en de wachtwoordbreukcontrole worden uitsluitend **voor informatieve en indicatieve doeleinden** aangeboden. Ze aggregeren signalen van derde partijen (Google Safe Browsing, openbare DNS, HaveIBeenPwned, live TLS-handshakes) en heuristieken van grote taalmodellen. Ze **vormen geen garantie voor veiligheid, geldigheid of afwezigheid van risico**. Nieuwe phishingpagina's verschijnen sneller dan reputatiedatabases ze kunnen catalogiseren; een e-mail die onze controles doorstaat, kan nog steeds inactief of frauduleus zijn; een geldig SSL-certificaat certificeert niet de inhoud van een site. De Uitgever wijst uitdrukkelijk elke aansprakelijkheid af voor schade die voortvloeit uit een phishing-e-mail die de Dienst als veilig heeft gemarkeerd, een onveilige link die de Dienst niet heeft geïdentificeerd, een transactie-e-mail die naar een adres is verzonden dat de Dienst als geldig heeft gemarkeerd, of een beveiligingsbeslissing die op basis van deze gereedschappen is genomen. De Gebruiker is zelf verantwoordelijk voor dergelijke beslissingen."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Acceptabel gebruik",
        "blocks": [
          {
            "kind": "p",
            "text": "U gaat ermee akkoord de Dienst **niet** te gebruiken voor:"
          },
          {
            "kind": "ul",
            "items": [
              "het uploaden, verwerken of verspreiden van inhoud die illegaal is in uw rechtsgebied of in Frankrijk;",
              "het verwerken van bestanden waarvoor u niet de benodigde rechten heeft (met auteursrecht beschermde werken zonder toestemming, persoonsgegevens waar u niet toe bevoegd bent om te verwerken, geclassificeerde informatie);",
              "het plegen of faciliteren van fraude, witwassen van geld, financiering van terrorisme of enige criminele activiteit;",
              "het gebruik van de AI-humaanmaker, de AI-tekstgereedschappen of een andere functie om plagiaat te plegen, een derde partij te misleiden, evaluatiesystemen (academisch, werving, advertentienetwerken) te manipuleren op een manier die in strijd is met hun regels, of op enigerlei wijze te misleiden in strijd met van toepassing zijnde wetgeving;",
              "het proberen te overbelasten, reverse-engineeren, scrapen, misbruiken van limieten, of op andere wijze de werking of beschikbaarheid van de Dienst te verstoren;",
              "het omzeilen van quotums, betalingsvereisten of andere beperkingen die van kracht zijn;",
              "het aanmaken van meerdere accounts om gratis quotums te vermenigvuldigen of het delen van een account met meer personen dan uw abonnement toestaat."
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
            "text": "U behoudt alle rechten, titel en belang in de bestanden en teksten die u naar de Dienst uploadt. U verleent ons een strikt beperkte, royaltyvrije, wereldwijde licentie om ze uitsluitend te verwerken om de tool die u heeft aangevraagd te leveren. Deze licentie eindigt op het moment dat het resultaat aan u wordt geretourneerd (servergeassisteerde tools) of komt nooit tot stand (browser-only tools, aangezien uw bestand ons nooit bereikt). We claimen geen eigendom van uw inhoud en zullen deze ook niet gebruiken om AI-modellen te trainen."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Accounts",
        "blocks": [
          {
            "kind": "p",
            "text": "U moet minimaal zestien (16) jaar oud zijn om een account aan te maken. U bent verantwoordelijk voor het vertrouwelijk houden van uw inloggegevens en voor elke activiteit die onder uw account plaatsvindt. Meld ons onmiddellijk op [security@konvertools.com](mailto:security@konvertools.com) bij een vermoeden van ongeautoriseerde toegang."
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
              "**Abonnementen**: Gratis (€0), Pro (€12/maand of €99/jaar), Business (€39/maand of €349/jaar). De functies en quotums van abonnementen zijn zoals beschreven op onze [Prijspagina](/pricing) op het moment van aankoop. We behouden ons het recht voor om abonnementsfuncties met 30 dagen voorafgaande kennisgeving te wijzigen.",
              "**Automatische verlenging**: maand- en jaarabonnementen verlengen automatisch met dezelfde frequentie totdat ze worden geannuleerd. U kunt op elk moment annuleren via uw dashboard; annulering treedt in werking aan het einde van de huidige factureringsperiode. U behoudt toegang tot die datum.",
              "**Wettelijk recht van ontbinding (EU)**: op grond van Artikel L. 221-28 van de Franse Consumentenwet, wanneer u de Dienst actief gebruikt tijdens de initiële 14-daagse ontbindingsperiode, stemt u uitdrukkelijk in met de onmiddellijke uitvoering van de overeenkomst en doet u afstand van uw recht op ontbinding. Als u geen betaalde functie heeft gebruikt, kunt u binnen 14 dagen ontbinden door een e-mail te sturen naar [billing@konvertools.com](mailto:billing@konvertools.com) en wij zullen binnen 14 dagen een volledige restitutie verlenen.",
              "**Geen gedeeltelijke restituties**: buiten het bovenstaande ontbindingscenario zijn reeds betaalde kosten voor de huidige factureringsperiode niet restitueerbaar.",
              "**Credits**: API-credits die als eenmalige pakketten zijn gekocht (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **vervallen nooit**. De 300 credits die elke maand automatisch aan Business-abonnees worden toegekend, vervallen aan het einde van de kalendermaand en zijn **niet restitueerbaar**.",
              "**Prijswijzigingen**: we kunnen prijzen wijzigen met 30 dagen voorafgaande kennisgeving. Bestaande abonnees behouden hun huidige prijs tot hun volgende verlengingsdatum.",
              "**Belasting**: prijzen worden getoond exclusief BTW waar van toepassing. Stripe int en draagt elke verschuldigde belasting in uw rechtsgebied af."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Openbare REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "Het Business-abonnement biedt een openbare REST API die wordt geauthenticeerd met API-sleutels die u genereert via uw dashboard. Het gebruik van de API wordt bovendien gereguleerd door:"
          },
          {
            "kind": "ul",
            "items": [
              "**Snelheidslimieten**: 60 verzoeken per minuut (Pro-opladingen) of 120 verzoeken per minuut (Business). Duurzaam misbruik kan leiden tot tijdelijke throttling of permanente intrekking van de sleutel.",
              "**Creditverbruik**: elk API-verzoek haalt credits af tegen de tarieven die zijn gepubliceerd in onze [API-documentatie](/api). Mislukte verzoeken (5xx-responsen) halen geen credits af.",
              "**Sleutelbeveiliging**: u bent verantwoordelijk voor het veilig opslaan van uw API-sleutels en het rouleren ervan bij vermoeden van compromittering. We kunnen elke sleutel op elk moment intrekken als we misbruik vermoeden.",
              "**Acceptabel upstreamgebruik**: applicaties gebouwd op onze API moeten voldoen aan deze Voorwaarden, inclusief de sectie over acceptabel gebruik. U mag onze API-sleutels niet blootstellen aan eindgebruikers (licentieer uw dienst in plaats daarvan door)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Intellectuele eigendom",
        "blocks": [
          {
            "kind": "p",
            "text": "De naam, het logo, de code, het ontwerp, de documentatie, de database-indeling en de geaggregeerde inhoud van de Dienst zijn het exclusieve eigendom van de Uitgever en worden beschermd door Franse en internationale intellectuele-eigendomswetgeving. U krijgt geen licentie dan strikt noodzakelijk om de Dienst te gebruiken zoals bedoeld. U mag de Dienst of enig deel ervan niet reproduceren, wijzigen, decompileren of afgeleide werken maken, tenzij dit uitdrukkelijk is toegestaan door van toepassing zijnde wetgeving."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Schadeloosstelling",
        "blocks": [
          {
            "kind": "p",
            "text": "U gaat ermee akkoord de Uitgever schadeloos te stellen en vrij te houden voor elke claim, schade, aansprakelijkheid, kosten of kosten (inclusief redelijke juridische kosten) die voortvloeien uit (a) uw schending van deze Voorwaarden, (b) uw overtreding van enige wet of rechten van derden, of (c) enige inhoud die u naar de Dienst heeft geüpload."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Wijzigingen in de Voorwaarden",
        "blocks": [
          {
            "kind": "p",
            "text": "We kunnen deze Voorwaarden af en toe wijzigen. Belangrijke wijzigingen worden minimaal dertig (30) dagen voorafgaand aan inwerkingtreding per e-mail aan accounthouders gemeld. Door de Dienst na die periode te blijven gebruiken, accepteert u de gewijzigde Voorwaarden. De meest recente versie is altijd beschikbaar op [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Beëindiging",
        "blocks": [
          {
            "kind": "p",
            "text": "U kunt uw account op elk moment beëindigen via uw dashboard. We kunnen uw account onmiddellijk en zonder voorafgaande kennisgeving opschorten of beëindigen als u deze Voorwaarden schendt, de Dienst misbruikt of niet betaalt voor een terugkerend abonnement. Na beëindiging worden uw gegevens binnen dertig (30) dagen verwijderd, met uitzondering van factuur- en toestemmingsgegevens die worden bewaard zoals beschreven in ons Privacybeleid."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Toepasselijk recht en jurisdictie",
        "blocks": [
          {
            "kind": "p",
            "text": "Deze Voorwaarden vallen onder het recht van Frankrijk. Elke geschil dat voortvloeit uit of verband houdt met deze Voorwaarden of de Dienst wordt voorleggen aan de exclusieve jurisdictie van de rechtbanken van Parijs, Frankrijk, tenzij een consument zijn verplichte actierecht in zijn land van verblijf onder EU- of nationaal recht prevaleert. Voordat u juridische stappen onderneemt, gaat u ermee akkoord om te proberen het geschil op een vriendelijke manier op te lossen door te schrijven naar [legal@konvertools.com](mailto:legal@konvertools.com). EU-consumenten kunnen ook gebruikmaken van het platform voor online geschillenbeslechting van de Europese Commissie op [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Overige bepalingen",
        "blocks": [
          {
            "kind": "p",
            "text": "Als een bepaling van deze Voorwaarden ongeldig of niet afdwingbaar wordt geacht, blijven de overige bepalingen volledig van kracht. Onze niet-nakoming van enig recht of bepaling is geen afstand van dat recht. Deze Voorwaarden (samen met het Privacybeleid en eventuele abonnementsspecifieke voorwaarden die bij aankoop zijn verwezen) vormen de volledige overeenkomst tussen u en de Uitgever met betrekking tot de Dienst."
          }
        ]
      }
    ]
  },
  "ja": {
    "h1": "利用規約",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最終更新日: %DATE% · Konvertoolsをご利用いただくことで、これらの規約に同意したものとみなされます。",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. 同意",
        "blocks": [
          {
            "kind": "p",
            "text": "本利用規約（以下「本規約」といいます）は、あなた（以下「ユーザー」といいます）とKonvertoolsの発行者（以下「発行者」「当社」「弊社」といいます）との間の、Konvertoolsウェブサイトおよび関連するすべてのツール、API、サービス（以下総称して「サービス」といいます）のご利用に関する拘束力のある契約です。アカウントの作成、登録時の同意チェックボックスのクリック、またはサービス上のいずれかのツールをご利用いただくことにより、あなたは本規約全文を読み、理解し、完全に同意したことを確認したものとみなされます。また、プライバシーポリシーにも同意したものとみなされます。"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. サービス",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertoolsは、ファイル変換ユーティリティ、文書・画像処理ツール、AI支援テキストユーティリティ、セキュリティ検査ツール（メール検証、フィッシング検出、URLスキャナー、SSL証明書チェッカー、パスワード漏洩チェッカー）、および開発者向けユーティリティのカタログを提供します。ほとんどのツールはブラウザ内で完全に実行されますが、一部のツールはサーバー処理を必要とします。サービスは、**「現状有姿」および「利用可能な状態」**で提供され、明示・黙示を問わず、商品性、特定目的への適合性、非侵害に関する保証を含むいかなる保証も行いません。"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 損害賠償責任の制限 — 注意深くお読みください",
        "blocks": [
          {
            "kind": "p",
            "text": "**法令で許容される最大限の範囲で、発行者は、サービスのご利用またはご利用できないことにより生じるいかなる種類の損害についても責任を負いません。** 特に、発行者は以下に起因する損害について一切の責任を負わないことに、あなたは同意します。"
          },
          {
            "kind": "ul",
            "items": [
              "データの損失、ファイルの破損または不正確な変換、変換の失敗；",
              "ツールの出力に基づく意思決定（財務、ビジネスその他を問わず）；",
              "サービスの停止、遅延、または機能の一時的な利用不可；",
              "第三者サービスの障害（Supabase、Mistral、Google Safe Browsing、HaveIBeenPwned、Stripe、Resend、ホスティングプロバイダー）；",
              "間接的、偶発的、特別、結果的、または懲罰的損害（いかなる種類の損害も含む）；",
              "請求の原因となった出来事の12か月前からのご利用料金（無料プランの場合は100ユーロを上限）を超える集計金額。"
            ]
          },
          {
            "kind": "p",
            "text": "**セキュリティツール**：URLスキャナー、フィッシング検出器、メール検証、SSL証明書チェッカー、パスワード漏洩チェッカーは、**情報提供および参考目的のみ**で提供されています。これらのツールは、第三者のシグナル（Google Safe Browsing、パブリックDNS、HaveIBeenPwned、ライブTLSハンドシェイク）および大規模言語モデルのヒューリスティックを集約したものであり、**安全性、有効性、リスクのないことの保証を構成するものではありません**。新しいフィッシングページは、評判データベースがカタログ化するよりも速く出現します。当社のチェックを通過したメールであっても、無効または詐欺的な可能性があります。SSL証明書が有効であっても、サイトの内容が安全であることを保証するものではありません。発行者は、当社のツールで安全と判定されたフィッシングメール、当社のツールで特定できなかった安全でないリンク、当社のツールで有効と判定されたアドレスに送信されたトランザクションメール、またはこれらのツールに基づくセキュリティ判断に起因するあらゆる損害について、一切の責任を負いません。ユーザーは、これらの判断について単独で責任を負います。"
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 適切な利用",
        "blocks": [
          {
            "kind": "p",
            "text": "あなたは以下を行わないことに同意します。"
          },
          {
            "kind": "ul",
            "items": [
              "ご自身の管轄地またはフランスで違法なコンテンツをアップロード、処理、または配布すること；",
              "必要な権利を有していないファイルを処理すること（許可なく著作権のある作品、処理する権利のない個人データ、機密情報）；",
              "詐欺、マネーロンダリング、テロ資金調達、その他の犯罪行為を実行または助長すること；",
              "AI人間化ツール、AIテキストツール、その他の機能を使用して、剽窃を行うこと、第三者を欺くこと、学術、採用、広告ネットワークなどの評価システムをその規則に違反して操作すること、または適用法に違反する方法で誤解を招くこと；",
              "サービスの運用または可用性に干渉する目的で、過負荷、リバースエンジニアリング、スクレイピング、レート制限の悪用、その他の方法を試みること；",
              "割り当てられたクォータ、支払い要件、またはその他の制限を回避すること；",
              "無料プランのクォータを複数のアカウントで増やすこと、またはプランで許可された人数を超えてアカウントを共有すること。"
            ]
          },
          {
            "kind": "p",
            "text": "当社は、本条に違反したと合理的な根拠があると判断した場合、アカウントを直ちに、かつ通知なしで停止または終了することができ、いかなる種類の返金も受けられません。"
          }
        ]
      },
      {
        "id": "content",
        "title": "5. あなたのコンテンツ",
        "blocks": [
          {
            "kind": "p",
            "text": "あなたは、サービスに送信するファイルおよびテキストに関するすべての権利、所有権、利益を保持します。あなたは、要求されたツールを提供するためにのみ処理することを目的とした、厳格に制限された、無償の、世界的なライセンスを発行者に付与します。このライセンスは、結果が返却された瞬間に終了します（サーバー処理が必要なツール）またはそもそも発生しません（ブラウザのみのツール、ファイルが当社に送信されないため）。当社は、あなたのコンテンツの所有権を主張することはなく、AIモデルのトレーニングに使用することもありません。"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. アカウント",
        "blocks": [
          {
            "kind": "p",
            "text": "アカウントを作成するには、少なくとも16歳以上でなければなりません。資格情報の機密性を保持し、アカウント下で発生するあらゆる活動について責任を負います。不正アクセスが疑われる場合は、直ちに[security@konvertools.com](mailto:security@konvertools.com)までご連絡ください。"
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
              "**プラン**：無料（€0）、Pro（月額€12または年額€99）、Business（月額€39または年額€349）。プランの機能とクォータは、購入時の[料金ページ](/pricing)に記載のとおりです。当社は30日間の通知をもってプランの機能を変更する権利を留保します。",
              "**自動更新**：月額および年額のサブスクリプションは、キャンセルされるまで同じ頻度で自動更新されます。ダッシュボードからいつでもキャンセルできます。キャンセルは現在の請求期間の終了時に有効となります。それまでは引き続きアクセスできます。",
              "**撤回権（EU）**：フランス消費者法第L. 221-28条に基づき、初回の14日間の撤回期間中にサービスを積極的にご利用いただいた場合、あなたは契約の即時履行に同意し、撤回権を放棄したものとみなされます。有償機能をご利用いただいていない場合は、[billing@konvertools.com](mailto:billing@konvertools.com)までメールを送信することで14日以内に撤回でき、当社は14日以内に全額返金いたします。",
              "**部分返金不可**：上記の撤回シナリオを除き、現在の請求期間に支払われた料金は返金されません。",
              "**クレジット**：APIクレジットを1回限りのパック（「Starter」「Growth」「Scale」「Studio」）で購入した場合、これらは**有効期限がありません**。Businessプランの加入者に毎月自動付与される300クレジットは、カレンダー月の末日に失効し、**返金されません**。",
              "**価格改定**：当社は30日間の通知をもって価格を改定することができます。既存のサブスクライバーは、次回の更新日まで現在の価格が適用されます。",
              "**税金**：表示される価格は、該当する場合を除き、消費税抜きです。Stripeが管轄地の税金を徴収・納付します。"
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. パブリックREST API",
        "blocks": [
          {
            "kind": "p",
            "text": "Businessプランでは、ダッシュボードから生成するAPIキーで認証されるパブリックREST APIが提供されます。APIのご利用は、以下の追加条件にも従います。"
          },
          {
            "kind": "ul",
            "items": [
              "**レート制限**：1分あたり60リクエスト（Proアップグレード）または120リクエスト（Business）。継続的な悪用は、一時的な制限またはキーの永久取り消しにつながる可能性があります。",
              "**クレジット消費**：各APIコールは、[APIドキュメント](/api)に記載のレートでクレジットを消費します。失敗したコール（5xxレスポンス）はクレジットを消費しません。",
              "**キーのセキュリティ**：APIキーの安全な保管と、侵害された場合のローテーションはユーザーの責任です。当社は、悪用が疑われる場合はいつでもキーを取り消すことができます。",
              "**上流の利用に関する適切性**：当社のAPIを使用して構築されたアプリケーションは、これらの利用規約（特に適切な利用に関する条項）に準拠する必要があります。エンドユーザーにAPIキーを公開してはなりません（代わりにサービスをサブライセンスしてください）。"
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. 知的財産権",
        "blocks": [
          {
            "kind": "p",
            "text": "サービスの名称、ロゴ、コード、デザイン、ドキュメント、データベース構造、および集約されたコンテンツは、発行者の排他的な所有物であり、フランスおよび国際的な知的財産法によって保護されています。サービスを意図したとおりに利用するために必要な範囲を超えて、あなたにライセンスは付与されません。あなたは、適用法によって明示的に許可されている場合を除き、サービスまたはその一部を複製、改変、逆コンパイル、派生的な作品を作成することはできません。"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. 免責補償",
        "blocks": [
          {
            "kind": "p",
            "text": "あなたは、以下に起因するあらゆる請求、損失、損害、責任、費用（合理的な弁護士費用を含む）について、発行者を免責し、損害から保護することに同意します。（a）あなたの本規約違反、（b）法令または第三者の権利の違反、（c）あなたがサービスに送信したコンテンツ。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. 規約の変更",
        "blocks": [
          {
            "kind": "p",
            "text": "当社は、本規約を随時改定することができます。実質的な変更については、効力発生日30日前までにアカウント保有者にメールで通知されます。その期間を過ぎてサービスを引き続きご利用いただくことで、改定後の規約に同意したものとみなされます。最新版は常に[https://konvertools.com/terms](https://konvertools.com/terms)でご確認いただけます。"
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. 解約",
        "blocks": [
          {
            "kind": "p",
            "text": "ダッシュボードからいつでもアカウントを解約できます。当社は、本規約に違反した場合、サービスを悪用した場合、または定期購読料の支払いが滞った場合、直ちに、かつ通知なしでアカウントを解約または停止することができます。解約後、データは30日以内に削除されます（プライバシーポリシーに記載のとおり、請求記録および同意記録は保持されます）。"
          }
        ]
      },
      {
        "id": "law",
        "title": "13. 準拠法および管轄",
        "blocks": [
          {
            "kind": "p",
            "text": "本規約はフランス法に準拠します。本規約またはサービスに関連するあらゆる紛争は、欧州連合または適用される国内法の下で消費者の強制的な権利行使が優先される場合を除き、フランス・パリの裁判所の専属管轄に付託されます。法的措置を開始する前に、[legal@konvertools.com](mailto:legal@konvertools.com)に書面で紛争の amicable な解決を試みることに同意します。EUの消費者は、欧州委員会のオンライン紛争解決プラットフォーム[ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)も利用できます。"
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. その他",
        "blocks": [
          {
            "kind": "p",
            "text": "本規約のいずれかの条項が無効または執行不能と判断された場合でも、他の条項は完全に有効です。当社が権利または条項を執行しないことは、その権利の放棄を意味しません。本規約（プライバシーポリシーおよび購入時に参照されるプラン固有の条項とともに）は、サービスに関するあなたと発行者との間の完全な合意を構成します。"
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
            "text": "本《服务条款》（以下称“条款”）构成您（以下称“您”或“用户”）与 Konvertools 的发布者（以下称“发布者”、“我们”或“本公司”）之间的一项具有约束力的协议，涉及您对 Konvertools 网站及所有相关工具、API 与服务（统称为“服务”）的使用。通过创建账户、在注册时勾选接受框或仅使用服务中的任一工具，即表示您已完整阅读、理解并接受本条款的全部内容，同时一并接受我们的《隐私政策》。"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. 服务内容",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools 提供一系列文件转换实用工具、文档与图像处理工具、AI 辅助文本工具、安全性指示工具（邮箱验证器、钓鱼网站检测器、URL 扫描器、SSL 证书检查器、密码泄露检查器）以及开发者实用工具。大多数工具完全在您的浏览器中执行；部分工具需服务器处理。服务以“**原样**”和“**按现状**”提供，不附带任何明示或暗示的保证，包括但不限于适销性、适用性或非侵权性。"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 责任限制 — 请仔细阅读",
        "blocks": [
          {
            "kind": "p",
            "text": "**在法律允许的最大范围内，发布者对您使用或无法使用服务所导致的任何损害概不承担责任。** 您特此确认并同意，发布者无需承担以下责任："
          },
          {
            "kind": "ul",
            "items": [
              "数据丢失、文件损坏或转换失败；",
              "基于任何工具输出所做出的决定（包括财务、商业或其他决定）；",
              "服务的停机、延迟或功能临时不可用；",
              "第三方服务故障（Supabase、Mistral、Google Safe Browsing、HaveIBeenPwned、Stripe、Resend、托管服务提供商）；",
              "间接、附带、特殊、后果性或惩罚性损害赔偿；",
              "任何超过您在导致索赔事件发生前十二（12）个月内实际向我们支付费用的金额，且对于免费用户，上限为一百（100）欧元。"
            ]
          },
          {
            "kind": "p",
            "text": "**安全工具**：URL 扫描器、钓鱼网站检测器、邮箱验证器、SSL 证书检查器及密码泄露检查器仅供**参考和指示性使用**。这些工具汇总第三方信号（Google Safe Browsing、公共 DNS、HaveIBeenPwned、实时 TLS 握手）及大型语言模型启发式分析，但**并不构成安全性、有效性或无风险的保证**。新的钓鱼网页出现速度远超信誉数据库的收录速度；通过我们检查的邮箱仍可能处于未激活或欺诈状态；SSL 证书有效并不代表网站内容的安全性。发布者明确拒绝对任何因服务判定为安全的钓鱼邮件、服务未识别的不安全链接、服务标记为有效的地址发送的交易邮件或基于这些工具做出的任何安全决策所导致的损害承担责任。用户应自行承担此类决策的全部责任。"
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
              "使用 AI 人性化工具、AI 文本工具或其他功能进行抄袭、欺骗第三方、操纵评估系统（学术、招聘、广告网络）以违反其规则，或以任何方式进行误导（违反适用法律的行为）；",
              "尝试过载、逆向工程、网页抓取、滥用速率限制或以其他方式干扰服务的运行或可用性；",
              "规避配额、付款要求或其他现有限制；",
              "创建多个账户以增加免费配额，或将一个账户共享给超出您计划允许的人员使用。"
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
            "text": "您对提交至服务的文件和文本保留所有权利、所有权和利益。您授予我们一项严格有限的、免版税的、全球性许可，仅用于处理这些内容以提供您请求的工具。该许可在将结果返回给您时（服务器辅助工具）立即终止，或在浏览器端工具中根本不存在（因为您的文件未传输至我们）。我们不会、也不会声称拥有您的内容，或将其用于训练 AI 模型。"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. 账户",
        "blocks": [
          {
            "kind": "p",
            "text": "您必须年满十六（16）周岁方可创建账户。您对保管好凭证负责，并对在您账户下发生的任何活动负责。如发现任何可疑的未经授权访问，请立即通过 [security@konvertools.com](mailto:security@konvertools.com) 通知我们。"
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
              "**套餐**：免费（€0）、专业版（€12/月或€99/年）、商业版（€39/月或€349/年）。套餐功能与配额以购买时我方[定价页面](/pricing)所述为准。我们保留在提前 30 天通知的情况下修改套餐功能的权利。",
              "**自动续费**：月度和年度订阅将按相同周期自动续费，直至取消。您可随时通过仪表板取消订阅；取消将在当前计费周期结束时生效。您将保留访问权限直至该日期。",
              "**撤回权（欧盟）**：根据《法国消费者法典》第 L. 221-28 条，在初始 14 天撤回期内主动使用服务的，即表示您明确同意立即履行合同并放弃撤回权。如您未使用任何付费功能，可在 14 天内通过发送邮件至 [billing@konvertools.com](mailto:billing@konvertools.com) 申请撤回，我们将在 14 天内全额退款。",
              "**不予部分退款**：除上述撤回情形外，当前计费周期内已支付的费用概不退款。",
              "**积分**：购买的一次性积分包（“入门”、“成长”、“扩展”、“工作室”）的积分**永不过期**。商业版订阅用户每月自动赠送的 300 积分将在日历月结束时**过期且不予退款**。",
              "**价格变更**：我们可在提前 30 天通知的情况下变更价格。现有订阅用户在下次续费前将维持当前价格。",
              "**税费**：价格显示为不含增值税（如适用）。Stripe 将在您所在司法管辖区代收并缴纳任何应缴税款。"
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. 公开 REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "商业版套餐提供公开 REST API，通过您从仪表板生成的 API 密钥进行身份验证。API 的使用还受以下条款约束："
          },
          {
            "kind": "ul",
            "items": [
              "**速率限制**：每分钟 60 次请求（专业版加购）或 120 次请求（商业版）。持续滥用可能导致临时限流或永久撤销密钥。",
              "**积分消耗**：每次 API 调用按我方[ API 文档 ](/api)中公布的费率扣除积分。失败的调用（5xx 响应）不扣除积分。",
              "**密钥安全**：您负责安全存储 API 密钥并及时轮换受到泄露时的密钥。如我们怀疑滥用，可随时撤销任何密钥。",
              "**上游使用的可接受性**：基于我们 API 构建的应用必须遵守本条款，包括可接受使用条款。您不得将我们的 API 密钥暴露给最终用户（请改用子授权您的服务）。"
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. 知识产权",
        "blocks": [
          {
            "kind": "p",
            "text": "服务的名称、徽标、代码、设计、文档、数据库结构及汇总内容均为发布者的独家财产，受法国及国际知识产权法保护。除为使用服务所必需的严格许可外，您无权进行任何复制、修改、反编译或创建衍生作品。"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. 赔偿责任",
        "blocks": [
          {
            "kind": "p",
            "text": "您同意对以下情况给发布者造成的任何索赔、损失、损害、责任、成本或费用（包括合理的律师费）承担赔偿责任并使其免受损害：（a）您违反本条款；（b）您违反任何法律或第三方权利；（c）您向服务提交的任何内容。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. 条款变更",
        "blocks": [
          {
            "kind": "p",
            "text": "我们可能不时修改本条款。实质性变更将至少提前三十（30）天通过邮件通知账户持有人。在该期限后继续使用服务即表示您接受修改后的条款。最新版本始终可在 [https://konvertools.com/terms](https://konvertools.com/terms) 查阅。"
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. 终止",
        "blocks": [
          {
            "kind": "p",
            "text": "您可随时通过仪表板终止账户。如您违反本条款、滥用服务或未支付订阅费用，我们可立即无通知地终止或暂停您的账户。账户终止后，您的数据将在三十（30）天内删除，但计费记录和同意记录将按《隐私政策》所述保留。"
          }
        ]
      },
      {
        "id": "law",
        "title": "13. 管辖法律与司法管辖权",
        "blocks": [
          {
            "kind": "p",
            "text": "本条款受法国法律管辖。与本条款或服务相关的任何争议应提交法国巴黎法院专属管辖，但如欧盟或适用的国内法赋予消费者在其居住国享有强制性诉讼权利，则不在此限。在提起法律诉讼前，您同意先通过书面方式尝试友好解决争议，发送至 [legal@konvertools.com](mailto:legal@konvertools.com)。欧盟消费者还可使用欧盟委员会的在线争议解决平台 [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)。"
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. 其他条款",
        "blocks": [
          {
            "kind": "p",
            "text": "如本条款的任何条款被认定为无效或不可执行，其余条款仍完全有效。我们未行使任何权利或条款不构成对该权利的放弃。本条款（连同《隐私政策》及购买时引用的任何特定套餐条款）构成您与发布者之间关于服务的完整协议。"
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
            "text": "본 서비스 약관(이하 \"약관\")은 사용자(이하 \"사용자\")와 Konvertools의 발행자(이하 \"발행자\", \"우리\", \"저희\") 간의 Konvertools 웹사이트 및 모든 관련 도구, API, 서비스(이하 \"서비스\") 사용에 관한 구속력 있는 계약을 형성합니다. 계정을 생성하거나, 가입 시 수락 체크박스를 선택하거나, 서비스 내의 도구를 단순히 사용하는 경우, 귀하는 본 약관 전체와 저희의 개인정보 보호정책을 읽고 이해했으며 완전히 수락했다는 사실을 확인하는 것입니다."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. 서비스",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools는 파일 변환 유틸리티, 문서 및 이미지 처리 도구, AI 지원 텍스트 유틸리티, 지표 보안 도구(이메일 확인자, 피싱 탐지기, URL 스캐너, SSL 인증서 확인기, 비밀번호 유출 확인기) 및 개발자 유틸리티를 제공합니다. 대부분의 도구는 브라우저에서 완전히 실행되며, 일부는 서버 처리가 필요합니다. 서비스는 **\"있는 그대로\"** 및 **\"사용 가능한 대로\"** 제공되며, 명시적이든 묵시적이든 상품성, 특정 목적에의 적합성 또는 비침해성에 대한 어떠한 보증도 없습니다."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 책임 제한 — 주의 깊게 읽어보십시오",
        "blocks": [
          {
            "kind": "p",
            "text": "**법이 허용하는 최대 범위 내에서, 발행자는 서비스 사용 또는 사용 불가능으로 인한 모든 종류의 손해에 대한 책임을 부인합니다.** 특히, 귀하는 다음 사항을 인정하고 동의합니다. 발행자는 다음 사항에 대해 책임을 지지 않습니다."
          },
          {
            "kind": "ul",
            "items": [
              "데이터 손실, 손상 또는 잘못된 파일, 또는 변환 실패;",
              "도구의 출력에 기반한 결정(재정, 비즈니스 등);",
              "서비스의 가동 중단, 지연 또는 일시적 사용 불가능;",
              "서드파티 서비스 장애(Supsabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, 호스팅 제공업체);",
              "간접, 우발적, 특별, 결과적 또는 징벌적 손해;",
              "사건 발생 시점의 12개월 동안 귀하가 저희에게 실제로 지불한 수수료를 초과하는 금액(무료 등급 사용자의 경우 100유로로 상한)."
            ]
          },
          {
            "kind": "p",
            "text": "**보안 도구**: URL 스캐너, 피싱 탐지기, 이메일 확인자, SSL 인증서 확인기 및 비밀번호 유출 확인기는 **정보 제공 및 지표 목적**으로만 제공됩니다. 이들은 서드파티 신호(Google Safe Browsing, 공개 DNS, HaveIBeenPwned, 실시간 TLS 핸드셰이크) 및 대규모 언어 모델의 휴리스틱을 집계합니다. 이들은 **안전성, 유효성 또는 위험 부재에 대한 보증을 구성하지 않습니다**. 새로운 피싱 페이지는 평판 데이터베이스가 목록화할 수 있는 것보다 더 빠르게 나타나며, 저희 검사를 통과한 이메일이 여전히 비활성 또는 사기일 수 있습니다. SSL 인증서가 유효하다고 해서 사이트의 콘텐츠가 안전하다는 의미는 아닙니다. 발행자는 이러한 도구에 기반한 보안 결정으로 인해 발생하는 모든 손해에 대해 명시적으로 책임을 거부합니다. 사용자는 이러한 결정에 대한 전적인 책임을 집니다."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 허용 가능한 사용",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 다음 사항에 서비스를 **사용하지 않을**ことに 동의합니다."
          },
          {
            "kind": "ul",
            "items": [
              "귀하의 관할권 또는 프랑스에서 불법인 콘텐츠 업로드, 처리 또는 배포;",
              "필요한 권리를 보유하지 않은 파일을 처리(저작권이 있는 작품을 무단으로, 귀하가 처리할 권리가 없는 개인정보, 기밀 정보);",
              "사기, 돈세탁, 테러리즘 자금 조달 또는 기타 범죄 활동 촉진;",
              "AI 인간화 도구, AI 텍스트 도구 또는 기타 기능을 표절, 제3자를 속이기, 학술, 채용, 광고 네트워크 등 평가 시스템을 규정을 위반하는 방식으로 조작하거나, 적용 가능한 법률을 위반하는 방식으로 오도하기 위해 사용;",
              "서비스의 운영 또는 가용성을 방해하거나 과부하를 일으키려는 시도, 역공학, 스크래핑, 속도 제한 남용 또는 기타 간섭;",
              "할당량, 결제 요구 사항 또는 기타 제한을 우회하기;",
              "무료 등급 할당량을 늘리기 위해 다중 계정을 생성하거나, 플랜에서 허용하는 것보다 많은 인원이 계정을 공유하는 행위."
            ]
          },
          {
            "kind": "p",
            "text": "본 조항을 위반했다고 합리적인 근거가 있는 경우, 발행자는 사전 통보 없이 즉시 계정을 정지 또는 종료할 수 있으며, 어떠한 종류의 환불도 받을 수 없습니다."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. 귀하의 콘텐츠",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 서비스에 제출하는 파일 및 텍스트에 대한 모든 권리, 소유권 및 이익을 보유합니다. 귀하는 요청한 도구를 제공하기 위해 이를 처리할 수 있도록 엄격히 제한된, 무료, 전 세계적 라이선스를 저희에게 부여합니다. 이 라이선스는 결과가 귀하에게 반환되는 즉시(서버 지원 도구) 또는 브라우저 전용 도구의 경우 파일이 저희에게 전송되지 않으므로 라이선스가 아예 발생하지 않습니다. 저희는 귀하의 콘텐츠를 소유하지 않으며, AI 모델 훈련에 사용하지도 않습니다."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. 계정",
        "blocks": [
          {
            "kind": "p",
            "text": "계정을 생성하려면 최소 16세 이상이어야 합니다. 귀하는 자격 증명을 비밀로 유지하고 계정에서 발생하는 모든 활동에 대해 책임을 집니다. [security@konvertools.com](mailto:security@konvertools.com)으로 즉시 알리십시오."
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
              "**플랜**: 무료(€0), 프로(€12/월 또는 €99/년), 비즈니스(€39/월 또는 €349/년). 플랜의 기능 및 할당량은 구매 시 [가격 페이지](/pricing)에서 설명한 대로입니다. 저희는 30일 전에 플랜 기능을 변경할 권리를 보유합니다.",
              "**자동 갱신**: 월간 및 연간 구독은 취소할 때까지 동일한 주기로 자동 갱신됩니다. 언제든지 대시보드에서 취소할 수 있으며, 취소는 현재 결제 기간이 종료될 때 효력이 발생합니다. 해당 날짜까지 액세스 권한을 유지합니다.",
              "**철회권(EU)**: 프랑스 소비자법 제 L. 221-28조에 따라, 초기 14일 철회 기간 동안 서비스를 적극적으로 사용한 경우, 귀하는 계약을 즉시 이행하는 데 명시적으로 동의하며 철회권을 포기합니다. 유료 기능을 사용하지 않은 경우, [billing@konvertools.com](mailto:billing@konvertools.com)으로 이메일을 보내 14일 이내에 전액 환불을 받을 수 있습니다.",
              "**부분 환불 불가**: 위의 철회 시나리오 외에는 현재 결제 기간에 대해 이미 지불한 수수료는 환불되지 않습니다.",
              "**크레딧**: 일회성 패키지(„Starter“, „Growth“, „Scale“, „Studio“)로 구매한 API 크레딧은 **절대 만료되지 않습니다**. 비즈니스 플랜 구독자에게 매월 자동으로 제공되는 300크레딧은 해당 달의 말일에 만료되며 **환불되지 않습니다**.",
              "**가격 변경**: 30일 전에 가격을 변경할 수 있습니다. 기존 구독자는 다음 갱신일까지 현재 가격을 유지합니다.",
              "**세금**: 가격은 적용 가능한 경우 부가가치세를 제외하고 표시됩니다. Stripe가 귀하의 관할권에서 부과되는 세금을 징수 및 납부합니다."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. 공개 REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "비즈니스 플랜은 대시보드에서 생성한 API 키로 인증되는 공개 REST API를 제공합니다. API 사용은 다음 사항에 따라 추가로 규율됩니다."
          },
          {
            "kind": "ul",
            "items": [
              "**속도 제한**: 분당 60회 요청(프로 상향) 또는 분당 120회 요청(비즈니스). 지속적인 남용은 일시적인 속도 제한 또는 영구적인 키 취소로 이어질 수 있습니다.",
              "**크레딧 소모**: 각 API 호출은 [API 문서](/api)에 게시된 비율로 크레딧을 차감합니다. 실패한 호출(5xx 응답)은 크레딧을 차감하지 않습니다.",
              "**키 보안**: API 키를 안전하게 저장하고 손상된 경우 교체할 책임은 귀하에게 있습니다. 저희는 남용이 의심되는 경우 언제든지 키를 취소할 수 있습니다.",
              "**상위 사용 허용**: 저희 API를 기반으로 구축된 애플리케이션은 이러한 약관을 포함하여 허용 가능한 사용 섹션을 준수해야 합니다. API 키를 최종 사용자에게 노출해서는 안 됩니다(서비스를 서브라이선스하십시오)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. 지적 재산권",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스의 이름, 로고, 코드, 디자인, 문서, 데이터베이스 구조 및 집계된 콘텐츠는 발행자의 배타적 재산이며, 프랑스 및 국제 지적 재산권에 의해 보호됩니다. 서비스 사용에 필요한 경우를 제외하고는 어떠한 라이선스도 부여되지 않습니다. 적용 가능한 법률에 의해 명시적으로 허용된 경우를 제외하고는 서비스의 복제, 수정, 역공학 또는 파생 작업을 수행할 수 없습니다."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. 면책 보상",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 다음 사항으로 인해 발생하는 모든 청구, 손실, 손해, 책임, 비용 또는 비용(합리적인 법적 수수료 포함)에 대해 발행자를 면책하고 무해하게 할 것에 동의합니다. (a) 본 약관 위반, (b) 법 또는 제3자 권리 위반, (c) 서비스에 제출한 콘텐츠."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. 약관 변경",
        "blocks": [
          {
            "kind": "p",
            "text": "저희는 때때로 약관을 변경할 수 있습니다. 실질적인 변경 사항은 계정 보유자에게 약관 발효 30일 전에 이메일로 통보됩니다. 해당 기간 이후에도 서비스를 계속 사용하면 수정된 약관을 수락하는 것입니다. 최신 버전은 항상 [https://konvertools.com/terms](https://konvertools.com/terms)에서 확인할 수 있습니다."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. 종료",
        "blocks": [
          {
            "kind": "p",
            "text": "대시보드에서 언제든지 계정을 종료할 수 있습니다. 약관을 위반하거나, 서비스를 남용하거나, 정기 구독료를 미지급한 경우, 저희는 즉시 사전 통보 없이 계정을 종료 또는 정지할 수 있습니다. 종료 시 billing 기록 및 개인정보 보호정책에 설명된 대로 보관된 동의 기록을 제외하고 데이터가 30일 이내에 삭제됩니다."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. 준거법 및 관할권",
        "blocks": [
          {
            "kind": "p",
            "text": "본 약관은 프랑스 법률에 따라 규율됩니다. 본 약관 또는 서비스와 관련하여 발생하는 분쟁은 유럽 연합 또는 적용 가능한 국내법에 따라 소비자의 강제적 권리가 우선하는 경우를 제외하고는 프랑스 파리 소재 법원의 전속 관할권에 제출됩니다. 법적 조치를 시작하기 전에 [legal@konvertools.com](mailto:legal@konvertools.com)으로 서면으로 분쟁을 우호적으로 해결하려고 노력하기로 동의합니다. EU 소비자는 또한 유럽 위원회의 온라인 분쟁 해결 플랫폼 [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)을 사용할 수 있습니다."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. 기타",
        "blocks": [
          {
            "kind": "p",
            "text": "본 약관의 어떠한 조항도 무효 또는 집행 불가능한 것으로 판결되는 경우, 나머지 조항은 완전히 유효합니다. 저희가 권리나 조항을 집행하지 않는 것이 해당 권리의 포기로 간주되지 않습니다. 본 약관(구매 시 참조된 플랜별 약관 및 개인정보 보호정책 포함)은 서비스와 관련하여 귀하와 발행자 간의 전체 계약을 구성합니다."
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
            "text": "تشكل هذه الشروط (\"الشروط\") اتفاقية ملزمة بينك (\"المستخدم\") والناشر لـ Konvertools (\"الناشر\"، \"نحن\"، \"لدينا\") فيما يتعلق باستخدامك لموقع Konvertools وجميع الأدوات والواجهات البرمجية والخدمات ذات الصلة (بشكل جماعي \"الخدمة\"). من خلال إنشاء حساب، أو تحديد مربع القبول عند التسجيل، أو ببساطة باستخدام أي أداة في الخدمة، فإنك تؤكد أنك قد قرأت وفهمت وقبلت هذه الشروط بالكامل، إلى جانب سياستنا الخاصة بالخصوصية."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. الخدمة",
        "blocks": [
          {
            "kind": "p",
            "text": "توفر Konvertools كتالوجًا من أدوات تحويل الملفات، وأدوات معالجة المستندات والصور، وأدوات النص المدعومة بالذكاء الاصطناعي، وأدوات الأمان التوضيحية (مدقق البريد الإلكتروني، كاشف التصيد، ماسح الروابط، فاحص شهادة SSL، فاحص اختراق كلمات المرور) وأدوات المطورين. تنفذ معظم الأدوات بالكامل في متصفحك؛ بينما تتطلب بعضها معالجة على الخادم. تُقدم الخدمة **\"كما هي\" و\"كما متاحة\"** دون أي ضمان من أي نوع، سواء كان ذلك صريحًا أو ضمنيًا، بما في ذلك القابلية للتسويق، أو الملاءمة لغرض معين، أو عدم التعدي."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. الحد من المسؤولية — اقرأ بعناية",
        "blocks": [
          {
            "kind": "p",
            "text": "**إلى الحد الأقصى المسموح به بموجب القانون، يتنازل الناشر عن أي مسؤولية عن الأضرار من أي نوع ناتجة عن استخدامك أو عدم قدرتك على استخدام الخدمة.** على وجه الخصوص، أنت تقر وتوافق على أن الناشر لن يكون مسؤولاً عن:"
          },
          {
            "kind": "ul",
            "items": [
              "فقدان البيانات، أو الملفات الفاسدة أو غير الصحيحة، أو تحويلات فاشلة؛",
              "القرارات، المالية أو التجارية أو غير ذلك، التي تتخذها بناءً على مخرجات أي أداة؛",
              "فترات التوقف، أو التأخير، أو عدم توفر أي ميزة مؤقتًا؛",
              "فشل الخدمات التابعة لجهات خارجية (Supabase، Mistral، Google Safe Browsing، HaveIBeenPwned، Stripe، Resend، مزودي الاستضافة)؛",
              "الأضرار غير المباشرة، العرضية، الخاصة، اللاحقة أو العقابية من أي نوع؛",
              "أي مبلغ إجمالي يتجاوز الرسوم التي دفعتها إلينا في الاثني عشر (12) شهرًا السابقة للحدث الذي أدى إلى المطالبة، مع سقف قدره مائة (100) يورو للمستخدمين من الطبقة المجانية."
            ]
          },
          {
            "kind": "p",
            "text": "**أدوات الأمان**: ماسح الروابط، وكاشف التصيد، وفاحص البريد الإلكتروني، وفاحص شهادة SSL، وفاحص اختراق كلمات المرور تُقدم **لأغراض إعلامية وتوضيحية فقط**. فهي تجمع إشارات من جهات خارجية (Google Safe Browsing، DNS العام، HaveIBeenPwned، المصافحات TLS الحية) وافتراضيات نماذج اللغة الكبيرة. **لا تشكل ضمانًا للسلامة أو الصحة أو عدم وجود مخاطر**. تظهر صفحات التصيد الجديدة بشكل أسرع من قدرة قواعد البيانات على تصنيفها؛ قد يكون البريد الإلكتروني الذي يجتاز فحوصاتنا لا يزال غير نشط أو احتياليًا؛ لا يضمن صلاحية شهادة SSL محتوى الموقع. يتنازل الناشر صراحة عن أي مسؤولية عن أي ضرر ناتج عن بريد إلكتروني تصيدي اعتبرته الخدمة آمنًا، أو رابطًا غير آمن فشلت في تحديده، أو بريد إلكتروني معاملاتي أُرسل إلى عنوان اعتبرته الخدمة صالحًا، أو أي قرار أمني اتخذ بناءً على هذه الأدوات. يتحمل المستخدم المسؤولية الكاملة عن مثل هذه القرارات."
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
              "تحميل أو معالجة أو توزيع محتوى غير قانوني في ولايتك القضائية أو في فرنسا؛",
              "معالجة ملفات لا تملك الحقوق اللازمة لها (أعمال محمية بحقوق الطبع والنشر دون إذن، بيانات شخصية لا يحق لك معالجتها، معلومات مصنفة)؛",
              "ارتكاب أو تسهيل الاحتيال، غسيل الأموال، تمويل الإرهاب أو أي نشاط إجرامي؛",
              "استخدام أدوات الذكاء الاصطناعي مثل مزيل البصمة أو أدوات النص أو أي ميزة أخرى للانتحال، أو لخداع طرف ثالث، أو للتحكم في أنظمة التقييم (أكاديمية، توظيف، شبكات إعلانية) بما يخالف قواعدها، أو لإضفاء طابع خادع بأي طريقة تنتهك القانون المعمول به؛",
              "محاولة تحميل الخدمة، أو الهندسة العكسية، أو الاستخلاص، أو استغلال حدود المعدل، أو التدخل بطريقة أخرى في تشغيل الخدمة أو توافرها؛",
              "التحايل على الحصص أو متطلبات الدفع أو أي قيود أخرى مفروضة؛",
              "إنشاء حسابات متعددة لتضخيم حصص الطبقة المجانية، أو مشاركة حساب واحد عبر أكثر من فرد مما يسمح به خطتك."
            ]
          },
          {
            "kind": "p",
            "text": "يجوز لنا تعليق أو إنهاء حسابك فورًا ودون إشعار إذا كان لدينا أسباب معقولة للاعتقاد بأنك انتهكت هذا القسم، دون الحق في استرداد أي رسوم."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. محتواك",
        "blocks": [
          {
            "kind": "p",
            "text": "أنت تحتفظ بجميع الحقوق، واللقب والمصلحة في الملفات والنصوص التي تقدمها إلى الخدمة. تمنحنا ترخيصًا محدودًا للغاية، بدون حقوق، عالميًا لمعالجتها حصريًا لتقديم الأداة التي طلبتها. ينتهي هذا الترخيص فورًا عند إرجاع النتيجة إليك (الأدوات التي تعتمد على الخادم) أو لا ينشأ على الإطلاق (الأدوات التي تعمل في المتصفح فقط، حيث لا تصل ملفاتك إلينا). نحن لا نطالب ولن نطالب بملكية محتواك أو استخدامه لتدريب نماذج الذكاء الاصطناعي."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. الحسابات",
        "blocks": [
          {
            "kind": "p",
            "text": "يجب أن يكون عمرك ستة عشر (16) عامًا على الأقل لإنشاء حساب. أنت مسؤول عن الحفاظ على سرية بيانات الاعتماد الخاصة بك وأي نشاط يحدث تحت حسابك. أخبرنا فورًا عبر البريد الإلكتروني [security@konvertools.com](mailto:security@konvertools.com) بأي وصول غير مصرح به مشتبه به."
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
              "**الخطط**: مجانية (0 يورو)، محترف (12 يورو/شهر أو 99 يورو/سنة)، أعمال (39 يورو/شهر أو 349 يورو/سنة). ميزات الخطط والحصص موضحة على [صفحة التسعير](/pricing) لدينا وقت الشراء. نحتفظ بحق تعديل ميزات الخطط مع إشعار مدته 30 يومًا.",
              "**التجديد التلقائي**: الاشتراكات الشهرية والسنوية تتجدد تلقائيًا بنفس وتيرتها حتى الإلغاء. يمكنك الإلغاء في أي وقت من لوحة التحكم الخاصة بك؛ يبدأ الإلغاء سريانه في نهاية فترة الفوترة الحالية. ستحتفظ بالوصول حتى ذلك التاريخ.",
              "**حق الانسحاب (الاتحاد الأوروبي)**: بموجب المادة L. 221-28 من قانون المستهلك الفرنسي، عندما تستخدم الخدمة بنشاط خلال فترة الانسحاب الأولية البالغة 14 يومًا، فإنك توافق صراحة على تنفيذ العقد فورًا وتتخلى عن حقك في الانسحاب. إذا لم تستخدم أي ميزة مدفوعة، يمكنك الانسحاب خلال 14 يومًا عبر إرسال بريد إلكتروني إلى [billing@konvertools.com](mailto:billing@konvertools.com) وسنقوم برد المبلغ بالكامل خلال 14 يومًا.",
              "**لا ترد الأموال جزئيًا**: خارج سيناريو الانسحاب أعلاه، فإن الرسوم المدفوعة بالفعل للفترة الفواتيرية الحالية غير قابلة للاسترداد.",
              "**الاعتمادات**: الاعتمادات التي تم شراؤها كحزم لمرة واحدة (\"مبتدئ\"، \"نمو\"، \"توسع\"، \"استوديو\") **لا تنتهي صلاحيتها أبدًا**. الاعتمادات الـ 300 التي تُمنح تلقائيًا كل شهر لمشتركي خطة الأعمال تنتهي في نهاية الشهر الميلادي **ولا يمكن استردادها**.",
              "**تغييرات الأسعار**: يجوز لنا تعديل الأسعار مع إشعار مدته 30 يومًا. يحتفظ المشتركون الحاليون بسعرهم الحالي حتى تاريخ تجديدهم التالي.",
              "**الضريبة**: تُعرض الأسعار بدون ضريبة القيمة المضافة حيثما ينطبق ذلك. يجمع Stripe أي ضريبة مستحقة في ولايتك القضائية ويسددها."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. واجهة برمجة التطبيقات العامة (REST API)",
        "blocks": [
          {
            "kind": "p",
            "text": "تكشف خطة الأعمال عن واجهة برمجة تطبيقات عامة (REST API) يتم المصادقة عليها بواسطة مفاتيح API التي تنشئها من لوحة التحكم الخاصة بك. استخدام واجهة برمجة التطبيقات يخضع أيضًا لـ:"
          },
          {
            "kind": "ul",
            "items": [
              "**حدود المعدل**: 60 طلبًا في الدقيقة (الزيادات في خطة المحترف) أو 120 طلبًا في الدقيقة (خطة الأعمال). قد يؤدي سوء الاستخدام المستمر إلى خنق مؤقت أو إلغاء دائم للمفتاح.",
              "**استهلاك الاعتمادات**: كل استدعاء لواجهة برمجة التطبيقات يخصم الاعتمادات وفقًا للمعدلات المنشورة في [توثيق واجهة برمجة التطبيقات](/api) لدينا. لا تستهلك المكالمات الفاشلة (استجابات 5xx) الاعتمادات.",
              "**أمان المفاتيح**: أنت مسؤول عن تخزين مفاتيح API الخاصة بك بشكل آمن ودورانها إذا تم اختراقها. يجوز لنا إلغاء أي مفتاح في أي وقت إذا اشتبهنا في سوء الاستخدام.",
              "**الاستخدام المقبول من قبل الطرف الثالث**: يجب أن تمتثل التطبيقات المبنية على واجهة برمجة التطبيقات لدينا لهذه الشروط، بما في ذلك قسم الاستخدام المقبول. يجب ألا تعرض مفاتيح API الخاصة بنا للمستخدمين النهائيين (قم بترخيص خدمتك بدلاً من ذلك)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. الملكية الفكرية",
        "blocks": [
          {
            "kind": "p",
            "text": "الاسم والشعار والرمز والتصميم والتوثيق وهيكل قاعدة البيانات والمحتوى المجمّع للخدمة هي ملكية حصرية للناشر وتحميها قوانين الملكية الفكرية الفرنسية والدولية. لا يُمنح لك أي ترخيص سوى ما هو ضروري بشكل صارم لاستخدام الخدمة كما هو مقصود. لا يجوز لك استنساخ أو تعديل أو فك تشفير أو إنشاء أعمال مشتقة من الخدمة أو أي جزء منها، إلا إذا كان ذلك مسموحًا به صراحة بموجب القانون المعمول به."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. التعويض",
        "blocks": [
          {
            "kind": "p",
            "text": "أنت توافق على تعويض الناشر وحمايته من أي مطالبة أو خسارة أو ضرر أو مسؤولية أو تكلفة أو مصروف (بما في ذلك أتعاب المحاماة المعقولة) تنشأ عن (أ) انتهاكك لهذه الشروط، (ب) انتهاكك لأي قانون أو حق طرف ثالث، أو (ج) أي محتوى قدمته إلى الخدمة."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. التغييرات في الشروط",
        "blocks": [
          {
            "kind": "p",
            "text": "يجوز لنا تعديل هذه الشروط من وقت لآخر. سيتم إشعار التغييرات الجوهرية عبر البريد الإلكتروني لحاملي الحسابات قبل 30 يومًا على الأقل من سريانها. من خلال مواصلة استخدام الخدمة بعد تلك الفترة، فإنك تقبل الشروط المعدلة. الإصدار الأحدث متاح دائمًا على [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. الإنهاء",
        "blocks": [
          {
            "kind": "p",
            "text": "يجوز لك إنهاء حسابك في أي وقت من لوحة التحكم الخاصة بك. يجوز لنا إنهاء أو تعليق حسابك فورًا ودون إشعار إذا انتهكت هذه الشروط، أو أسأت استخدام الخدمة، أو فشلت في دفع اشتراك متكرر. عند الإنهاء، يتم حذف بياناتك خلال ثلاثين (30) يومًا، باستثناء سجلات الفوترة وسجلات الموافقة التي تحتفظ بها كما هو موضح في سياسة الخصوصية لدينا."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. القانون الحاكم والاختصاص القضائي",
        "blocks": [
          {
            "kind": "p",
            "text": "تخضع هذه الشروط لقوانين فرنسا. أي نزاع ينشأ عن هذه الشروط أو الخدمة يخضع للاختصاص الحصري لمحكمة باريس، فرنسا، إلا حيثما يسود حق المستهلك الإلزامي في بلد إقامتك بموجب قانون الاتحاد الأوروبي أو القانون الوطني المعمول به. قبل بدء أي إجراء قانوني، соглашаетесь попытаться разрешить спор мирным путем, написав на [legal@konvertools.com](mailto:legal@konvertools.com). المستهلكون الأوروبيون يمكنهم أيضًا استخدام منصة تسوية المنازعات عبر الإنترنت التابعة للمفوضية الأوروبية على [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. بنود متنوعة",
        "blocks": [
          {
            "kind": "p",
            "text": "إذا تم اعتبار أي بند من هذه الشروط باطلاً أو غير قابل للتنفيذ، تظل البنود المتبقية سارية بالكامل. عدم قيامنا بإنفاذ أي حق أو شرط لا يشكل تنازلًا عن ذلك الحق. تشكل هذه الشروط (إلى جانب سياسة الخصوصية وأي شروط محددة للخطة المشار إليها عند الشراء) الاتفاقية الكاملة بينك وبين الناشر فيما يتعلق بالخدمة."
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
            "text": "Настоящие Условия обслуживания (далее — «Условия») представляют собой обязательное соглашение между вами (далее — «Пользователь») и издателем сервиса Konvertools (далее — «Издатель», «мы», «нас») в отношении использования вами веб-сайта Konvertools и всех связанных инструментов, API и услуг (совокупно — «Сервис»). Создавая учётную запись, отмечая флажок согласия при регистрации или просто используя любой инструмент на Сервисе, вы подтверждаете, что ознакомились, поняли и полностью принимаете эти Условия вместе с нашей Политикой конфиденциальности."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Сервис",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools предоставляет каталог утилит для конвертации файлов, инструменты обработки документов и изображений, AI-инструменты для работы с текстом, индикативные инструменты безопасности (проверка электронной почты, детектор фишинга, сканер URL, проверка SSL-сертификатов, проверка утечек паролей) и инструменты для разработчиков. Большинство инструментов работают полностью в вашем браузере; некоторые требуют серверной обработки. Сервис предоставляется **«как есть»** и **«по мере возможности»** без каких-либо явных или подразумеваемых гарантий, включая пригодность для коммерческого использования, соответствие конкретной цели или отсутствие нарушений прав интеллектуальной собственности."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Ограничение ответственности — внимательно прочитайте",
        "blocks": [
          {
            "kind": "p",
            "text": "**В максимально допустимой законом степени Издатель снимает с себя всякую ответственность за любые убытки, возникшие в результате использования вами или невозможности использования Сервиса.** В частности, вы признаёте и соглашаетесь с тем, что Издатель не несёт ответственности за:"
          },
          {
            "kind": "ul",
            "items": [
              "потерю данных, повреждённые или некорректные файлы, неудачные конвертации;",
              "решения, финансового, делового или иного характера, принятые вами на основе результатов работы любого инструмента;",
              "простои, задержки или временную недоступность любой функции;",
              "сбои сторонних сервисов (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, хостинг-провайдеры);",
              "косвенные, случайные, особые, косвенные или штрафные убытки любого рода;",
              "любую совокупную сумму, превышающую плату, фактически уплаченную вами нам в течение двенадцати (12) месяцев, предшествующих событию, повлёкшему возникновение претензии, с верхним пределом в сто (100) евро для пользователей бесплатного уровня."
            ]
          },
          {
            "kind": "p",
            "text": "**Инструменты безопасности**: сканер URL, детектор фишинга, проверка электронной почты, проверка SSL-сертификатов и проверка утечек паролей предоставляются **исключительно в информационных и индикативных целях**. Они агрегируют сторонние сигналы (Google Safe Browsing, публичные DNS, HaveIBeenPwned, живые TLS-рукопожатия) и эвристику на основе больших языковых моделей. Они **не гарантируют безопасность, подлинность или отсутствие риска**. Новые фишинговые страницы появляются быстрее, чем базы репутации успевают их каталогизировать; электронное письмо, прошедшее проверку, может оказаться неактивным или мошенническим; наличие действительного SSL-сертификата не подтверждает подлинность содержимого сайта. Издатель прямо отказывается от любой ответственности за любой вред, возникший в результате фишингового письма, которое Сервис посчитал безопасным, небезопасной ссылки, которую Сервис не сумел идентифицировать, транзакционного письма, отправленного на адрес, который Сервис пометил как действительный, или любого решения о безопасности, принятого на основе этих инструментов. Пользователь несет единоличную ответственность за такие решения."
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
              "обработки файлов, на которые у вас нет необходимых прав (произведения, защищённые авторским правом без разрешения, персональные данные, к которым вы не имеете права доступа, засекреченная информация);",
              "совершения или содействия мошенничеству, отмыванию денег, финансированию терроризма или любой другой преступной деятельности;",
              "использования AI-гуманизатора, AI-инструментов для работы с текстом или любых других функций для плагиата, обмана третьих лиц, манипуляции системами оценки (академическими, рекрутинговыми, рекламными сетями) в нарушение их правил или для введения в заблуждение любым способом, противоречащим применимому законодательству;",
              "попыток перегрузить, reverse-engineer, scrapить, нарушить ограничения по скорости или иным образом вмешаться в работу или доступность Сервиса;",
              "обхода квот, требований оплаты или любых других ограничений, действующих на Сервисе;",
              "создания нескольких учётных записей для увеличения квот бесплатного уровня или совместного использования одной учётной записи несколькими лицами, если это не разрешено вашим тарифным планом."
            ]
          },
          {
            "kind": "p",
            "text": "Мы можем немедленно приостановить или прекратить действие вашей учётной записи без предварительного уведомления, если у нас есть разумные основания полагать, что вы нарушили данный раздел, без права на возмещение уплаченных сумм."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ваш контент",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы сохраняете все права, титул и интерес в отношении файлов и текста, которые вы отправляете на Сервис. Вы предоставляете нам строго ограниченную, безвозмездную, мировую лицензию на их обработку исключительно для предоставления запрошенного вами инструмента. Эта лицензия прекращает своё действие в момент возврата результата вам (инструменты с серверной обработкой) или не возникает вовсе (инструменты, работающие только в браузере, так как ваш файл никогда не покидает ваше устройство). Мы не претендуем и не будем претендовать на право собственности на ваш контент и не будем использовать его для обучения AI-моделей."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Учётные записи",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы должны быть не моложе шестнадцати (16) лет для создания учётной записи. Вы несёте ответственность за сохранность ваших учётных данных и за любую активность, происходящую под вашей учётной записью. Немедленно уведомьте нас по адресу [security@konvertools.com](mailto:security@konvertools.com) о любом подозрении в несанкционированном доступе."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Подписки, выставление счетов и возврат средств",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Тарифные планы**: Бесплатный (€0), Pro (€12/месяц или €99/год), Business (€39/месяц или €349/год). Особенности и квоты тарифных планов описаны на нашей [странице тарифов](/pricing) на момент покупки. Мы оставляем за собой право изменять особенности тарифных планов с уведомлением за 30 дней.",
              "**Автоматическое продление**: ежемесячные и ежегодные подписки продлеваются автоматически в том же режиме до момента отмены. Вы можете отменить подписку в любой момент через вашу панель управления; отмена вступает в силу в конце текущего расчётного периода. Вы сохраняете доступ до этой даты.",
              "**Право на отказ (ЕС)**: в соответствии со статьёй L. 221-28 Французского потребительского кодекса, если вы активно используете Сервис в течение первоначального 14-дневного периода отказа, вы прямо соглашаетесь на немедленное исполнение договора и отказываетесь от права на отказ. Если вы не использовали ни одну платную функцию, вы можете отказаться в течение 14 дней, отправив письмо на [billing@konvertools.com](mailto:billing@konvertools.com), и мы вернём вам полную сумму в течение 14 дней.",
              "**Возврат средств не производится**: за пределами описанного выше сценария отказа, уплаченные за текущий расчётный период средства не подлежат возврату.",
              "**Кредиты**: API-кредиты, приобретённые в качестве разовых пакетов («Starter», «Growth», «Scale», «Studio»), **никогда не истекают**. 300 кредитов, автоматически предоставляемых каждый месяц пользователям тарифного плана Business, истекают в конце календарного месяца и **не подлежат возврату**.",
              "**Изменение цен**: мы можем изменять цены с уведомлением за 30 дней. Существующие подписчики сохраняют текущую цену до следующей даты продления.",
              "**Налоги**: цены указаны без учёта НДС, где это применимо. Stripe взимает и перечисляет любые налоги, подлежащие уплате в вашей юрисдикции."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Публичный REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "Тарифный план Business предоставляет публичный REST API, аутентифицируемый с помощью API-ключей, которые вы генерируете в вашей панели управления. Использование API регулируется дополнительно следующими условиями:"
          },
          {
            "kind": "ul",
            "items": [
              "**Ограничения по скорости**: 60 запросов в минуту (дополнительные запросы для тарифа Pro) или 120 запросов в минуту (для тарифа Business). Устойчивое злоупотребление может привести к временному ограничению скорости или постоянной блокировке ключа.",
              "**Списание кредитов**: каждый вызов API списывает кредиты по тарифам, опубликованным в нашей [документации по API](/api). Неудачные вызовы (ответы 5xx) не списывают кредиты.",
              "**Безопасность ключей**: вы несёте ответственность за безопасное хранение ваших API-ключей и их ротацию в случае компрометации. Мы можем отозвать любой ключ в любой момент при подозрении в злоупотреблении.",
              "**Допустимое использование вышестоящими**: приложения, построенные на основе нашего API, должны соответствовать настоящим Условиям, включая раздел о допустимом использовании. Вы не должны раскрывать наши API-ключи конечным пользователям (вместо этого используйте сублицензирование вашего сервиса)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Интеллектуальная собственность",
        "blocks": [
          {
            "kind": "p",
            "text": "Название, логотип, код, дизайн, документация, структура базы данных и агрегированный контент Сервиса являются исключительной собственностью Издателя и защищены французским и международным законодательством об интеллектуальной собственности. Вам не предоставляется никакой лицензии, кроме строго необходимой для использования Сервиса по назначению. Вы не вправе воспроизводить, изменять, декомпилировать или создавать производные работы на основе Сервиса или любой его части, кроме случаев, прямо разрешённых применимым законодательством."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Возмещение ущерба",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы соглашаетесь возмещать Издателю и ограждать его от любых претензий, убытков, ущерба, ответственности, расходов или затрат (включая разумные юридические сборы), возникших в результате (a) вашего нарушения настоящих Условий, (b) вашего нарушения закона или прав третьих лиц, или (c) любого контента, который вы отправили на Сервис."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Изменения в Условиях",
        "blocks": [
          {
            "kind": "p",
            "text": "Мы можем время от времени изменять настоящие Условия. Существенные изменения будут доведены до сведения владельцев учётных записей по электронной почте не менее чем за тридцать (30) дней до их вступления в силу. Продолжая использовать Сервис после этого периода, вы принимаете изменённые Условия. Последняя версия всегда доступна по адресу [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Прекращение действия",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы можете прекратить действие вашей учётной записи в любой момент через вашу панель управления. Мы можем немедленно приостановить или прекратить действие вашей учётной записи без предварительного уведомления, если вы нарушили настоящие Условия, злоупотребили Сервисом или не оплатили текущую подписку. После прекращения действия ваши данные удаляются в течение тридцати (30) дней, за исключением платёжных записей и записей о согласии, которые хранятся в соответствии с нашей Политикой конфиденциальности."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Применимое право и подсудность",
        "blocks": [
          {
            "kind": "p",
            "text": "Настоящие Условия регулируются законодательством Франции. Любые споры, возникающие в связи с настоящими Условиями или Сервисом, подлежат исключительной юрисдикции судов Парижа, Франция, за исключением случаев, когда обязательное право потребителя на обращение в суд в стране его проживания превалирует в соответствии с законодательством Европейского Союза или национальным законодательством. Прежде чем начинать судебное разбирательство, вы соглашаетесь попытаться урегулировать спор мирным путём, направив письмо на [legal@konvertools.com](mailto:legal@konvertools.com). Потребители из ЕС также могут воспользоваться платформой Европейской комиссии по внесудебному урегулированию споров по адресу [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Прочие положения",
        "blocks": [
          {
            "kind": "p",
            "text": "Если какое-либо положение настоящих Условий признано недействительным или неисполнимым, остальные положения сохраняют полную силу. Наше неисполнение какого-либо права или положения не является отказом от этого права. Настоящие Условия (вместе с Политикой конфиденциальности и любыми специфическими условиями тарифных планов, упомянутыми при покупке) составляют полное соглашение между вами и Издателем в отношении Сервиса."
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
            "text": "ये सेवा की शर्तें (\"शर्तें\") आपके (\"उपयोगकर्ता\") और Konvertools के प्रकाशक (\"प्रकाशक\", \"हम\", \"हमें\") के बीच एक बाध्यकारी समझौता है, जो Konvertools वेबसाइट और उससे संबंधित सभी उपकरणों, API और सेवाओं (सामूहिक रूप से \"सेवा\") के आपके उपयोग के संबंध में है। एक खाता बनाकर, साइनअप पर स्वीकृति चेकबॉक्स पर टिक करके, या सेवा पर किसी भी उपकरण का उपयोग करके, आप पुष्टि करते हैं कि आपने इन शर्तों को पूरी तरह से पढ़ लिया है, समझ लिया है और स्वीकार कर लिया है, साथ ही हमारी गोपनीयता नीति के साथ।"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. सेवा",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools फ़ाइल-रूपांतरण उपयोगिताओं, दस्तावेज़ और छवि प्रसंस्करण उपकरण, AI-सहायता प्राप्त पाठ उपयोगिताओं, संकेतक सुरक्षा उपकरण (ईमेल सत्यापनकर्ता, फ़िशिंग डिटेक्टर, URL स्कैनर, SSL प्रमाणपत्र चेकर, पासवर्ड उल्लंघन चेकर) और डेवलपर उपयोगिताओं का एक कैटलॉग प्रदान करता है। अधिकांश उपकरण पूरी तरह से आपके ब्राउज़र में निष्पादित होते हैं; कुछ को सर्वर प्रसंस्करण की आवश्यकता होती है। सेवा **\"जैसी है\" और \"जैसी उपलब्ध है\"** के रूप में प्रदान की जाती है, बिना किसी प्रकार की वारंटी के, चाहे वह व्यक्त या निहित हो, जिसमें व्यापारिकता, विशेष उद्देश्य के लिए उपयुक्तता, या उल्लंघन न होना शामिल है।"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. उत्तरदायित्व की सीमा — ध्यानपूर्वक पढ़ें",
        "blocks": [
          {
            "kind": "p",
            "text": "**जहां तक कानून द्वारा अनुमति दी गई है, प्रकाशक सेवा के आपके उपयोग या उपयोग करने में असमर्थता से उत्पन्न होने वाले किसी भी प्रकार के नुकसान के लिए उत्तरदायित्व को अस्वीकार करता है।** विशेष रूप से, आप स्वीकार करते हैं और सहमत हैं कि प्रकाशक उत्तरदायी नहीं होगा:"
          },
          {
            "kind": "ul",
            "items": [
              "डेटा हानि, दूषित या गलत फ़ाइलें, या असफल रूपांतरण;",
              "उपकरण के आउटपुट के आधार पर आप द्वारा लिए गए निर्णय, वित्तीय, व्यावसायिक या अन्यथा;",
              "सेवा के किसी भी सुविधा का डाउनटाइम, विलंबता, या अस्थायी अनुपलब्धता;",
              "तृतीय-पक्ष सेवा विफलताओं (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, होस्टिंग प्रदाता);",
              "अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक नुकसान किसी भी प्रकार के;",
              "घटना के कारण दावे के लिए पूर्ववर्ती बारह (12) महीनों में आप द्वारा वास्तव में भुगतान की गई फीस से अधिक कुल राशि, मुफ्त-स्तरीय उपयोगकर्ताओं के लिए एक सौ (100) यूरो तक सीमित।"
            ]
          },
          {
            "kind": "p",
            "text": "**सुरक्षा उपकरण**: URL स्कैनर, फ़िशिंग डिटेक्टर, ईमेल सत्यापनकर्ता, SSL प्रमाणपत्र चेकर और पासवर्ड उल्लंघन चेकर **केवल सूचनात्मक और संकेतक उद्देश्यों के लिए** प्रदान किए जाते हैं। वे तृतीय-पक्ष संकेतों (Google Safe Browsing, सार्वजनिक DNS, HaveIBeenPwned, लाइव TLS हैंडशेक) और बड़े-भाषा-मॉडल अनुमान एकत्र करते हैं। वे **सुरक्षा, वैधता या जोखिम की अनुपस्थिति की गारंटी नहीं देते हैं**। नई फ़िशिंग पृष्ठ प्रतिष्ठा डेटाबेस की तुलना में तेजी से दिखाई देते हैं; एक ईमेल जो हमारे जांचों को पास कर जाता है, फिर भी निष्क्रिय या धोखाधड़ीपूर्ण हो सकता है; एक वैध SSL प्रमाणपत्र वाली साइट की सामग्री की गारंटी नहीं देता है। प्रकाशक इन उपकरणों के आधार पर लिए गए किसी भी नुकसान के लिए स्पष्ट रूप से उत्तरदायित्व को अस्वीकार करता है। उपयोगकर्ता ऐसे निर्णयों के लिए पूरी तरह से उत्तरदायी है।"
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. स्वीकार्य उपयोग",
        "blocks": [
          {
            "kind": "p",
            "text": "आप सेवा का उपयोग करने के लिए निम्नलिखित कार्य करने के लिए **सहमत नहीं** हैं:"
          },
          {
            "kind": "ul",
            "items": [
              "अपने अधिकार क्षेत्र या फ्रांस में अवैध सामग्री अपलोड, संसाधित या वितरित करना;",
              "ऐसे फ़ाइलों को संसाधित करना जिनके लिए आपके पास आवश्यक अधिकार नहीं हैं (लेखक की अनुमति के बिना कॉपीराइटेड कार्य, व्यक्तिगत डेटा जिसे आप संसाधित करने के अधिकारी नहीं हैं, वर्गीकृत जानकारी);",
              "धोखाधड़ी, मनी लॉन्ड्रिंग, आतंकवाद के वित्तपोषण या किसी भी आपराधिक गतिविधि को सुविधाजनक बनाना;",
              "AI मानवकारक, AI पाठ उपकरण या किसी अन्य सुविधा का उपयोग करके साहित्यिक चोरी करना, किसी तीसरे पक्ष को धोखा देना, मूल्यांकन प्रणालियों (शैक्षणिक, भर्ती, विज्ञापन नेटवर्क) में हेरफेर करना जो उनके नियमों का उल्लंघन करता है, या लागू कानून का उल्लंघन करते हुए किसी भी तरह से गुमराह करना;",
              "सेवा के संचालन या उपलब्धता में हस्तक्षेप करने का प्रयास करना, रिवर्स-इंजीनियरिंग करना, स्क्रैप करना, दर सीमाओं का दुरुपयोग करना, या अन्यथा हस्तक्षेप करना;",
              "कोटा, भुगतान आवश्यकताओं या लागू प्रतिबंधों को दरकिनार करना;",
              "मुफ्त-स्तरीय कोटा को गुणा करने के लिए एकाधिक खाते बनाना, या अपने प्लान द्वारा अनुमत व्यक्तियों की तुलना में अधिक व्यक्तियों के साथ एक खाता साझा करना।"
            ]
          },
          {
            "kind": "p",
            "text": "यदि हमें उचित आधार मिलते हैं कि आपने इस अनुभाग का उल्लंघन किया है, तो हम बिना किसी पूर्व सूचना के तुरंत आपके खाते को निलंबित या समाप्त कर सकते हैं, और किसी भी प्रकार के धनवापसी के हकदार नहीं होंगे।"
          }
        ]
      },
      {
        "id": "content",
        "title": "5. आपकी सामग्री",
        "blocks": [
          {
            "kind": "p",
            "text": "आप सेवा में प्रस्तुत फ़ाइलों और पाठ के सभी अधिकार, शीर्षक और हित बनाए रखते हैं। आप हमें केवल आपके द्वारा अनुरोधित उपकरण को वितरित करने के लिए उन्हें संसाधित करने के लिए एक सख्त रूप से सीमित, रॉयल्टी-मुक्त, वैश्विक लाइसेंस प्रदान करते हैं। यह लाइसेंस तुरंत समाप्त हो जाता है जब परिणाम आपको वापस कर दिया जाता है (सर्वर-सहायता प्राप्त उपकरण) या बिल्कुल भी अस्तित्व में नहीं आता है (ब्राउज़र-केवल उपकरण, क्योंकि आपकी फ़ाइल कभी भी हमारे पास नहीं पहुंचती है)। हम आपके कंटेंट का स्वामित्व नहीं लेते हैं और न ही इसे AI मॉडलों को प्रशिक्षित करने के लिए उपयोग करेंगे।"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. खाते",
        "blocks": [
          {
            "kind": "p",
            "text": "खाता बनाने के लिए आपकी आयु कम से कम सोलह (16) वर्ष होनी चाहिए। आप अपने क्रेडेंशियल्स को गोपनीय रखने और अपने खाते के अंतर्गत होने वाली किसी भी गतिविधि के लिए उत्तरदायी हैं। किसी भी संदिग्ध अनधिकृत पहुंच की सूचना तुरंत [security@konvertools.com](mailto:security@konvertools.com) पर दें।"
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
              "**योजनाएँ**: मुफ्त (€0), प्रो (€12/माह या €99/वर्ष), बिजनेस (€39/माह या €349/वर्ष)। योजना सुविधाएँ और कोटा हमारे [मूल्य निर्धारण पृष्ठ](/pricing) पर खरीद के समय वर्णित हैं। हम 30 दिनों के नोटिस के साथ योजना सुविधाओं में संशोधन करने का अधिकार सुरक्षित रखते हैं।",
              "**स्वतः नवीनीकरण**: मासिक और वार्षिक सदस्यताएँ उसी क्रम में स्वतः नवीनीकृत होती हैं जब तक रद्द नहीं की जातीं। आप अपने डैशबोर्ड से किसी भी समय रद्द कर सकते हैं; रद्द करने का प्रभाव वर्तमान बिलिंग अवधि के अंत में होता है। आप उस तिथि तक पहुँच बनाए रखते हैं।",
              "**वापसी का अधिकार (ईयू)**: फ्रांसीसी उपभोक्ता संहिता के अनुच्छेद L. 221-28 के तहत, जब आप प्रारंभिक 14-दिवसीय वापसी अवधि के दौरान सक्रिय रूप से सेवा का उपयोग करते हैं, तो आप स्पष्ट रूप से अनुबंध के तत्काल निष्पादन के लिए सहमति देते हैं और वापसी के अपने अधिकार को त्याग देते हैं। यदि आपने किसी भी सशुल्क सुविधा का उपयोग नहीं किया है, तो आप 14 दिनों के भीतर [billing@konvertools.com](mailto:billing@konvertools.com) पर ईमेल करके वापसी कर सकते हैं और हम 14 दिनों के भीतर पूर्ण धनवापसी जारी करेंगे।",
              "**आंशिक धनवापसी नहीं**: उपरोक्त वापसी परिदृश्य के अलावा, वर्तमान बिलिंग अवधि के लिए पहले से भुगतान की गई फीस गैर-वापसी योग्य हैं।",
              "**क्रेडिट**: एक बार के पैक (\"स्टार्टर\", \"ग्रोथ\", \"स्केल\", \"स्टूडियो\") के रूप में खरीदे गए API क्रेडिट **कभी समाप्त नहीं होते हैं**। बिजनेस ग्राहकों को प्रत्येक माह स्वतः प्रदान किए जाने वाले 300 क्रेडिट कैलेंडर माह के अंत में समाप्त हो जाते हैं और **गैर-वापसी योग्य** हैं।",
              "**मूल्य परिवर्तन**: हम 30 दिनों के नोटिस के साथ मूल्यों में संशोधन कर सकते हैं। मौजूदा ग्राहक अपनी अगली नवीनीकरण तिथि तक अपनी वर्तमान कीमत बनाए रखते हैं।",
              "**कर**: मूल्य प्रदर्शित किए गए हैं जहाँ लागू हो, करों को छोड़कर। Stripe आपके अधिकार क्षेत्र में देय किसी भी कर को एकत्र और प्रेषित करता है।"
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. सार्वजनिक REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "बिजनेस प्लान एक सार्वजनिक REST API प्रदर्शित करता है जिसे आपके डैशबोर्ड से उत्पन्न API कुंजियों द्वारा प्रमाणित किया जाता है। API के उपयोग को अतिरिक्त रूप से निम्नलिखित द्वारा नियंत्रित किया जाता है:"
          },
          {
            "kind": "ul",
            "items": [
              "**दर सीमाएँ**: 60 अनुरोध प्रति मिनट (प्रो अतिरिक्त) या 120 अनुरोध प्रति मिनट (बिजनेस)। निरंतर दुरुपयोग के परिणामस्वरूप अस्थायी थ्रॉटलिंग या स्थायी कुंजी निरस्तीकरण हो सकता है।",
              "**क्रेडिट खपत**: प्रत्येक API कॉल हमारे [API दस्तावेज़](/api) में प्रकाशित दरों पर क्रेडिट काट लेता है। विफल कॉल (5xx प्रतिक्रियाएँ) क्रेडिट नहीं काटते हैं।",
              "**कुंजी सुरक्षा**: आप अपनी API कुंजियों को सुरक्षित रूप से संग्रहीत करने और यदि समझौता किया गया हो तो उन्हें घुमाने के लिए उत्तरदायी हैं। हम किसी भी कुंजी को किसी भी समय निरस्त कर सकते हैं यदि हमें दुरुपयोग का संदेह हो।",
              "**स्वीकार्य अपस्ट्रीम उपयोग**: हमारे API पर निर्मित अनुप्रयोगों को इन शर्तों का पालन करना चाहिए, जिसमें स्वीकार्य-उपयोग अनुभाग शामिल है। आपको अपने API कुंजियों को अंतिम उपयोगकर्ताओं को उजागर नहीं करना चाहिए (अपनी सेवा को उप-लाइसेंस दें)।"
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. बौद्धिक संपदा",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा का नाम, लोगो, कोड, डिज़ाइन, दस्तावेज़ीकरण, डेटाबेस संरचना और सेवा की एकत्रित सामग्री प्रकाशक की विशेष संपत्ति है और फ्रांसीसी और अंतर्राष्ट्रीय बौद्धिक-संपदा कानून द्वारा संरक्षित है। आपको सेवा के आवश्यक उपयोग के अलावा कोई लाइसेंस प्रदान नहीं किया जाता है। आप सेवा या उसके किसी भी हिस्से को पुनरुत्पादित, संशोधित, डीकोम्पाइल या व्युत्पन्न कार्य नहीं बना सकते हैं, सिवाय इसके कि लागू कानून द्वारा स्पष्ट रूप से अनुमति दी गई हो।"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. क्षतिपूर्ति",
        "blocks": [
          {
            "kind": "p",
            "text": "आप इन शर्तों के अपने उल्लंघन से उत्पन्न किसी भी दावे, हानि, क्षति, उत्तरदायित्व, लागत या व्यय (उचित कानूनी शुल्क सहित) के लिए प्रकाशक को क्षतिपूर्ति करने और उसे हानिरहित रखने के लिए सहमत हैं, (a) आपके द्वारा इन शर्तों का उल्लंघन, (b) कानून या किसी तीसरे पक्ष के अधिकार का उल्लंघन, या (c) सेवा में प्रस्तुत आपकी कोई भी सामग्री।"
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. शर्तों में परिवर्तन",
        "blocks": [
          {
            "kind": "p",
            "text": "हम समय-समय पर इन शर्तों में संशोधन कर सकते हैं। महत्वपूर्ण परिवर्तन ईमेल द्वारा खाता धारकों को प्रभावी होने से कम से कम तीस (30) दिन पहले सूचित किए जाएंगे। उस अवधि के बाद सेवा का उपयोग जारी रखकर आप संशोधित शर्तों को स्वीकार करते हैं। नवीनतम संस्करण हमेशा [https://konvertools.com/terms](https://konvertools.com/terms) पर उपलब्ध है।"
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. समाप्ति",
        "blocks": [
          {
            "kind": "p",
            "text": "आप अपने डैशबोर्ड से किसी भी समय अपना खाता समाप्त कर सकते हैं। यदि आप इन शर्तों का उल्लंघन करते हैं, सेवा का दुरुपयोग करते हैं, या आवर्ती सदस्यता का भुगतान करने में विफल रहते हैं, तो हम बिना किसी पूर्व सूचना के आपका खाता समाप्त या निलंबित कर सकते हैं। समाप्ति पर आपका डेटा हमारी गोपनीयता नीति में वर्णित अनुसार बिलिंग रिकॉर्ड और सहमति रिकॉर्ड को छोड़कर तीस (30) दिनों के भीतर हटा दिया जाता है।"
          }
        ]
      },
      {
        "id": "law",
        "title": "13. शासी कानून और अधिकार क्षेत्र",
        "blocks": [
          {
            "kind": "p",
            "text": "ये शर्तें फ्रांस के कानूनों द्वारा शासित हैं। इन शर्तों या सेवा से उत्पन्न होने वाले किसी भी विवाद को फ्रांस के पेरिस के न्यायालयों के विशेष अधिकार क्षेत्र में प्रस्तुत किया जाएगा, सिवाय जहां यूरोपीय संघ या लागू राष्ट्रीय कानून के तहत उपभोक्ता के निवास देश में कार्रवाई का अनिवार्य अधिकार प्रभावी रहता है। कानूनी कार्रवाई शुरू करने से पहले, आप [legal@konvertools.com](mailto:legal@konvertools.com) पर लिखकर विवाद को सौहार्दपूर्ण ढंग से हल करने के लिए सहमत हैं। ईयू उपभोक्ता यूरोपीय आयोग के ऑनलाइन विवाद समाधान प्लेटफ़ॉर्म [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) का भी उपयोग कर सकते हैं।"
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. विविध",
        "blocks": [
          {
            "kind": "p",
            "text": "यदि इन शर्तों का कोई प्रावधान अमान्य या अप्रवर्तनीय पाया जाता है, तो शेष प्रावधान पूर्ण प्रभाव में रहते हैं। हमारा किसी अधिकार या प्रावधान को लागू न करना उस अधिकार का परित्याग नहीं है। ये शर्तें (गोपनीयता नीति और खरीद के समय संदर्भित किसी भी योजना-विशिष्ट शर्तों के साथ) सेवा के संबंध में आपके और प्रकाशक के बीच पूर्ण समझौता बनाती हैं।"
          }
        ]
      }
    ]
  },
  "tr": {
    "h1": "Hizmet Şartları",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Son güncelleme: %DATE% · Konvertools'u kullanarak bu şartları kabul etmiş sayılırsınız.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Kabul",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Hizmet Şartları (\"Şartlar\"), sizin (\"Kullanıcı\") ile Konvertools yayıncısı (\"Yayımcı\", \"biz\", \"bizim\") arasında Konvertools web sitesinin ve tüm ilgili araçların, API'lerin ve hizmetlerin (birlikte \"Hizmet\" olarak anılacaktır) kullanımınızla ilgili olarak yapılan bağlayıcı bir anlaşmadır. Bir hesap oluşturduğunuzda, kayıt sırasında kabul onay kutusunu işaretlediğinizde veya Hizmet'teki herhangi bir aracı kullandığınızda, bu Şartları tamamen okuduğunuzu, anladığınızı ve kabul ettiğinizi ve ayrıca Gizlilik Politikamızla birlikte bu Şartları da kabul etmiş sayılırsınız."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Hizmet",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools, dosya dönüştürme yardımcı programları, belge ve görüntü işleme araçları, yapay zekâ destekli metin araçları, gösterge niteliğinde güvenlik araçları (e-posta doğrulayıcı, phishing tespit aracı, URL tarayıcı, SSL sertifikası kontrolü, parola ihlali kontrolü) ve geliştirici araçları olmak üzere bir katalog sunmaktadır. Araçların çoğu tamamen tarayıcınızda çalışır; bazıları ise sunucu işlemesi gerektirir. Hizmet, **\"olduğu gibi\"** ve **\"mevcut olduğu şekilde\"** herhangi bir türde açık veya zımni garanti olmaksızın sunulmaktadır; bu garantiler ticari uygunluk, belirli bir amaca uygunluk veya ihlal etmeme gibi konuları kapsamaz."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Sorumluluk sınırlaması — dikkatlice okuyun",
        "blocks": [
          {
            "kind": "p",
            "text": "**Yasal olarak izin verilen maksimum ölçüde, Yayımcı, Hizmet'in kullanımından veya kullanamamanızdan kaynaklanan herhangi bir zarar için sorumluluk kabul etmez.** Özellikle, aşağıdakiler de dahil olmak üzere herhangi bir sorumluluk kabul etmediğinizi kabul ve taahhüt edersiniz:"
          },
          {
            "kind": "ul",
            "items": [
              "veri kaybı, bozulmuş veya yanlış dosyalar veya başarısız dönüştürmeler;",
              "araç çıktısına dayanarak aldığınız kararlar, finansal, ticari veya diğer türden kararlar;",
              "Hizmet'in herhangi bir özelliğinin durması, gecikmesi veya geçici olarak kullanılamaması;",
              "üçüncü taraf hizmet arızaları (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, barındırma sağlayıcıları);",
              "dolaylı, rastlantısal, özel, sonuçsal veya cezai nitelikteki herhangi bir zarar;",
              "olayın meydana geldiği on iki (12) aylık dönemde ödediğiniz ücretleri aşan herhangi bir toplam tutar, ücretsiz katmanda kullanıcılar için yüz (100) avro ile sınırlıdır."
            ]
          },
          {
            "kind": "p",
            "text": "**Güvenlik araçları**: URL Tarayıcı, Phishing Tespit Aracı, E-posta Doğrulayıcı, SSL Sertifikası Kontrolü ve Parola İhlali Kontrolü yalnızca **bilgilendirme ve gösterge amaçlı** olarak sunulmaktadır. Bu araçlar üçüncü taraf sinyallerini (Google Safe Browsing, genel DNS, HaveIBeenPwned, canlı TLS el sıkışmaları) ve büyük dil modeli sezgilerini birleştirir. **Güvenlik, geçerlilik veya riskin olmadığına dair bir garanti teşkil etmezler**. Yeni phishing sayfaları, itibar veritabanlarının kataloglayabileceğinden daha hızlı ortaya çıkar; kontrolümüzden geçen bir e-posta yine de aktif olmayan veya sahte olabilir; geçerli bir SSL sertifikası bir sitenin içeriğini doğrulamaz. Yayımcı, Hizmet'in güvenli olarak işaretlediği bir phishing e-postasından, Hizmet'in tanımlayamadığı güvensiz bir bağlantıdan, Hizmet'in geçerli olarak işaretlediği bir adrese gönderilen bir işlem e-postasından veya bu araçlara dayanarak alınan herhangi bir güvenlik kararından kaynaklanan herhangi bir zarar için açıkça sorumluluk kabul etmemektedir. Kullanıcı, bu tür kararların tek sorumluluğunu üstlenir."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Kabul edilebilir kullanım",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet'i aşağıdakiler için kullanmama konusunda anlaşırsınız:"
          },
          {
            "kind": "ul",
            "items": [
              "bulunduğunuz yargı alanında veya Fransa'da yasadışı olan içeriği yüklemek, işlemek veya dağıtmak;",
              "gerekli haklara sahip olmadığınız dosyaları işlemek (yetkisiz telif hakkı eserleri, işleme hakkına sahip olmadığınız kişisel veriler, gizli bilgiler);",
              "dolandırıcılık, kara para aklama, terörizmin finansmanı veya herhangi bir suç faaliyeti gerçekleştirmek veya kolaylaştırmak;",
              "Yapay Zekâ insanlaştırma aracını, Yapay Zekâ metin araçlarını veya diğer herhangi bir özelliği intihal yapmak, üçüncü bir tarafı aldatmak, akademik, işe alım, reklam ağları gibi değerlendirme sistemlerini onların kurallarına aykırı şekilde manipüle etmek veya uygulanabilir yasayı ihlal edecek şekilde yanıltmak için kullanmak;",
              "Hizmet'in çalışmasını veya kullanılabilirliğini engellemek, tersine mühendislik uygulamak, kazımak, hız sınırlarını kötüye kullanmak veya müdahale etmek amacıyla girişimde bulunmak;",
              "kotaları, ödeme gerekliliklerini veya mevcut herhangi bir kısıtlamayı aşmaya çalışmak;",
              "ücretsiz katman kotalarını çoğaltmak için birden fazla hesap oluşturmak veya hesabınızı planınızın izin verdiğinden daha fazla kişi arasında paylaşmak."
            ]
          },
          {
            "kind": "p",
            "text": "Bu bölümün ihlal edildiğine dair makul gerekçelerimiz olması durumunda hesabınızı hemen ve bildirimde bulunmaksızın askıya alabilir veya sonlandırabiliriz; herhangi bir türde iade hakkına sahip değilsiniz."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. İçeriğiniz",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet'e gönderdiğiniz dosyalar ve metinler üzerindeki tüm hakları, unvanları ve menfaatleri elinde tutarsınız. Size yalnızca talep ettiğiniz aracı sunmak amacıyla işlemek üzere, sınırlı, ücretsiz, dünya çapında bir lisans size verirsiniz. Bu lisans, sonucun size iade edildiği anda sona erer (sunucu destekli araçlar) veya hiç oluşmaz (tarayıcıda yalnızca çalışan araçlar, çünkü dosyanız bize ulaşmaz). İçeriğinizin sahipliğini iddia etmiyoruz ve yapay zekâ modellerini eğitmek için kullanmayacağız."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Hesaplar",
        "blocks": [
          {
            "kind": "p",
            "text": "Hesap oluşturmak için en az on altı (16) yaşında olmalısınız. Kimlik bilgilerinizi gizli tutmaktan ve hesabınız altında gerçekleşen herhangi bir faaliyetten siz sorumlusunuz. Yetkisiz erişim şüphesi durumunda derhal [security@konvertools.com](mailto:security@konvertools.com) adresinden bizi bilgilendirin."
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
              "**Planlar**: Ücretsiz (€0), Pro (€12/ay veya €99/yıl), Business (€39/ay veya €349/yıl). Plan özellikleri ve kotaları satın alma sırasında [Fiyatlandırma sayfamızda](/pricing) açıklandığı şekildedir. Plan özelliklerini 30 gün önceden bildirimde bulunarak değiştirme hakkımız saklıdır.",
              "**Otomatik yenileme**: Aylık ve yıllık abonelikler, iptal edilene kadar aynı sıklıkta otomatik olarak yenilenir. Hesabınızdan herhangi bir zamanda iptal edebilirsiniz; iptal, cari faturalandırma döneminin sonunda geçerli olur. O tarihe kadar erişiminizi korursunuz.",
              "**İptal hakkı (AB)**: Fransız Tüketici Kanunu'nun L. 221-28. maddesi uyarınca, ilk 14 günlük iptal süresi içinde Hizmet'i aktif olarak kullanmanız durumunda sözleşmenin hemen yerine getirilmesine açıkça rıza gösterir ve iptal hakkından feragat edersiniz. Ücretli bir özelliği kullanmadıysanız, [billing@konvertools.com](mailto:billing@konvertools.com) adresine e-posta göndererek 14 gün içinde iptal edebilir ve size 14 gün içinde tam iade yaparız.",
              "**Kısmi iadeler yoktur**: Yukarıdaki iptal senaryosu dışında, cari faturalandırma dönemine ait ücretler iade edilemez.",
              "**Krediler**: Tek seferlik paketler olarak satın alınan API kredileri (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **süresiz olarak geçerlidir**. Business abonelerine her ay otomatik olarak verilen 300 kredi, takvim ayının sonunda sona erer ve **iade edilemez**.",
              "**Fiyat değişiklikleri**: fiyatları 30 gün önceden bildirimde bulunarak değiştirebiliriz. Mevcut aboneler, fiyat değişikliğine kadar mevcut fiyatlarını korur.",
              "**Vergi**: fiyatlar, ilgili yerlerde KDV hariç gösterilir. Stripe, bulunduğunuz yargı alanındaki vergi yükümlülüklerini toplar ve öder."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Genel REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "Business planı, kontrol panelinizden oluşturduğunuz API anahtarlarıyla kimlik doğrulanan genel bir REST API sunar. API kullanımı ayrıca aşağıdakilerle de düzenlenir:"
          },
          {
            "kind": "ul",
            "items": [
              "**Hız sınırları**: Dakikada 60 istek (Pro eklemeleri) veya dakikada 120 istek (Business). Sürdürülebilir kötüye kullanım, geçici olarak sınırlama veya kalıcı anahtar iptaline yol açabilir.",
              "**Kredi tüketimi**: her API çağrısı, [API belgelerimizde](/api) yayınlanan oranlarda kredileri düşürür. Başarısız çağrılar (5xx yanıtları) kredileri düşürmez.",
              "**Anahtar güvenliği**: API anahtarlarınızı güvenli bir şekilde saklamaktan ve şüpheli durumlarda değiştirmekten siz sorumlusunuz. Suistimal şüphesi durumunda herhangi bir anahtarı herhangi bir zamanda iptal edebiliriz.",
              "**Yukarı akış kullanımı**: API'miz üzerine inşa edilen uygulamalar, kabul edilebilir kullanım bölümünü de içeren bu Şartlara uymalıdır. API anahtarlarınızı son kullanıcılara maruz bırakmamalısınız (hizmetinizi lisanslamak yerine)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Fikri mülkiyet",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet'in adı, logosu, kodu, tasarımı, belgeleri, veritabanı yapısı ve toplanmış içeriği Yayımcı'nın özel mülkiyetindedir ve Fransız ve uluslararası fikri mülkiyet hukuku tarafından korunmaktadır. Size yalnızca Hizmet'i amaçlandığı şekilde kullanmanız için gerekli olan lisans verilir. Hizmet'in veya herhangi bir bölümünün kopyalanması, değiştirilmesi, tersine mühendislik uygulanması veya türev çalışmalarının oluşturulması, uygulanabilir yasa tarafından açıkça izin verilmediği sürece yasaktır."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Tazminat",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Şartların ihlali (a), herhangi bir yasanın veya üçüncü taraf hakkının ihlali (b) veya Hizmet'e gönderdiğiniz herhangi bir içeriğin (c) neden olduğu herhangi bir talep, kayıp, zarar, yükümlülük, maliyet veya giderden (makul avukatlık ücretleri dahil) kaynaklanan herhangi bir zarar için Yayımcı'yı tazmin etmeyi ve zararsız kılmayı kabul edersiniz."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Şartlardaki değişiklikler",
        "blocks": [
          {
            "kind": "p",
            "text": "Şartlarımızı zaman zaman değiştirebiliriz. Önemli değişiklikler, etkili olmalarından en az otuz (30) gün önce hesap sahiplerine e-posta yoluyla bildirilecektir. Bu süre geçtikten sonra Hizmet'i kullanmaya devam etmeniz, değiştirilmiş Şartları kabul etmiş sayılırsınız. En son versiyon her zaman [https://konvertools.com/terms](https://konvertools.com/terms) adresinde bulunabilir."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Sonlandırma",
        "blocks": [
          {
            "kind": "p",
            "text": "Hesabınızı kontrol panelinizden herhangi bir zamanda sonlandırabilirsiniz. Şartları ihlal etmeniz, Hizmet'i kötüye kullanmanız veya tekrarlayan aboneliği ödememeniz durumunda hesabınızı hemen ve bildirimde bulunmaksızın sonlandırabilir veya askıya alabiliriz. Hesap sonlandırıldıktan sonra verileriniz, Gizlilik Politikamızda açıklandığı şekilde fatura kayıtları ve rıza kayıtları hariç otuz (30) gün içinde silinir."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Yürürlükteki hukuk ve yargı yetkisi",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Şartlar Fransız hukukuna tabidir. Bu Şartlardan veya Hizmet'ten kaynaklanan veya bağlantılı olan herhangi bir anlaşmazlık, Avrupa Birliği veya ilgili ulusal hukuk uyarınca tüketicinin zorunlu dava hakkının geçerli olduğu durumlar hariç, Paris mahkemelerinin münhasır yargı yetkisine tabi olacaktır. Hukuki işlem başlatmadan önce, anlaşmazlığı [legal@konvertools.com](mailto:legal@konvertools.com) adresine yazarak dostane şekilde çözmeyi kabul edersiniz. AB tüketicileri ayrıca anlaşmazlıklarını [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) adresindeki Avrupa Komisyonu'nun Çevrimiçi Anlaşmazlık Çözüm platformunu da kullanabilir."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Çeşitli hükümler",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Şartların herhangi bir hükmü geçersiz veya uygulanamaz bulunursa, kalan hükümler tamamen yürürlükte kalır. Herhangi bir hakkın veya hükmün uygulanmaması, o hakkın feragat edildiği anlamına gelmez. Bu Şartlar (satın alma sırasında referans verilen planlara özel şartlar ve Gizlilik Politikası ile birlikte) sizin ve Yayımcı arasındaki Hizmet'e ilişkin tüm anlaşmayı oluşturur."
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
            "text": "Ketentuan Layanan ini (\"Ketentuan\") membentuk perjanjian yang mengikat antara Anda (\"Pengguna\") dan penerbit Konvertools (\"Penerbit\", \"kami\", \"kami\") terkait penggunaan situs web Konvertools serta semua alat, API, dan layanan terkait (secara kolektif disebut \"Layanan\"). Dengan membuat akun, mencentang kotak penerimaan saat pendaftaran, atau sekadar menggunakan alat apa pun di Layanan, Anda menyatakan bahwa Anda telah membaca, memahami, dan menerima Ketentuan ini secara keseluruhan, bersama dengan Kebijakan Privasi kami."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Layanan",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools menyediakan katalog utilitas konversi berkas, alat pemrosesan dokumen dan gambar, utilitas teks berbantuan AI, alat keamanan indikatif (pemeriksa email, detektor phishing, pemindai URL, pemeriksa sertifikat SSL, pemeriksa kebocoran kata sandi) serta utilitas pengembang. Sebagian besar alat berjalan sepenuhnya di peramban Anda; beberapa memerlukan pemrosesan server. Layanan ini ditawarkan **\"apa adanya\" dan \"tersedia apa adanya\"** tanpa jaminan apa pun, baik tersurat maupun tersirat, termasuk tetapi tidak terbatas pada kelayakan dagang, kesesuaian untuk tujuan tertentu, atau tidak melanggar hak cipta."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Pembatasan tanggung jawab — baca dengan saksama",
        "blocks": [
          {
            "kind": "p",
            "text": "**Sejauh yang diizinkan oleh hukum, Penerbit menolak segala tanggung jawab atas kerugian apa pun yang timbul dari penggunaan atau ketidakmampuan Anda menggunakan Layanan.** Secara khusus, Anda menyatakan dan menyetujui bahwa Penerbit tidak bertanggung jawab atas:"
          },
          {
            "kind": "ul",
            "items": [
              "kehilangan data, berkas yang rusak atau tidak benar, atau konversi yang gagal;",
              "keputusan, keuangan, bisnis, atau lainnya yang Anda ambil berdasarkan keluaran dari alat apa pun;",
              "waktu henti, latensi, atau ketidaktersediaan sementara fitur apa pun;",
              "kegagalan layanan pihak ketiga (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, penyedia hosting);",
              "kerugian tidak langsung, insidental, khusus, konsekuensial, ataupun hukuman apa pun;",
              "jumlah agregat yang melebihi biaya yang benar-benar Anda bayarkan kepada kami dalam dua belas (12) bulan sebelum kejadian yang menimbulkan klaim, dengan batas seratus (100) euro untuk pengguna tingkat gratis."
            ]
          },
          {
            "kind": "p",
            "text": "**Alat keamanan**: Pemindai URL, Detektor Phishing, Pemeriksa Email, Pemeriksa Sertifikat SSL, dan Pemeriksa Kebocoran Kata Sandi disediakan **hanya untuk tujuan informatif dan indikatif**. Alat-alat ini mengumpulkan sinyal dari pihak ketiga (Google Safe Browsing, DNS publik, HaveIBeenPwned, penanganan TLS langsung) serta heuristik model bahasa besar. Alat-alat ini **tidak memberikan jaminan keamanan, validitas, atau ketidakberisikoan**. Halaman phishing baru muncul lebih cepat daripada katalog basis data reputasi; email yang lolos pemeriksaan kami mungkin masih tidak aktif atau penipuan; sertifikat SSL yang valid tidak menjamin konten suatu situs. Penerbit secara tegas menolak segala tanggung jawab atas kerugian apa pun yang timbul akibat email phishing yang dinilai aman oleh Layanan, tautan tidak aman yang gagal diidentifikasi, email transaksional yang dikirim ke alamat yang dinilai valid oleh Layanan, atau keputusan keamanan apa pun yang diambil berdasarkan alat-alat ini. Pengguna menanggung tanggung jawab penuh atas keputusan tersebut."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Penggunaan yang dapat diterima",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda menyetujui untuk **tidak** menggunakan Layanan untuk:"
          },
          {
            "kind": "ul",
            "items": [
              "mengunggah, memproses, atau mendistribusikan konten yang ilegal di yurisdiksi Anda atau di Prancis;",
              "memproses berkas yang tidak Anda miliki hak yang diperlukan (karya berhak cipta tanpa izin, data pribadi yang tidak Anda berhak olah, informasi rahasia);",
              "melakukan atau memfasilitasi penipuan, pencucian uang, pendanaan terorisme, atau aktivitas kriminal apa pun;",
              "menggunakan humanisasi AI, alat teks AI, atau fitur lainnya untuk plagiarisme, menipu pihak ketiga, memanipulasi sistem evaluasi (akademik, perekrutan, jaringan iklan) dengan cara yang melanggar aturan mereka, atau menyesatkan dengan cara yang melanggar hukum yang berlaku;",
              "mencoba membebani, melakukan rekayasa balik, scraping, menyalahgunakan batas laju, atau mengganggu operasi atau ketersediaan Layanan dengan cara apa pun;",
              "mengelakkan kuota, persyaratan pembayaran, atau pembatasan lain yang berlaku;",
              "membuat banyak akun untuk menggandakan kuota tingkat gratis, atau berbagi akun dengan lebih banyak individu daripada yang diizinkan oleh paket Anda."
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
            "text": "Anda harus berusia minimal enam belas (16) tahun untuk membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan kredensial Anda dan atas aktivitas apa pun yang terjadi di bawah akun Anda. Beritahu kami segera melalui [security@konvertools.com](mailto:security@konvertools.com) jika terjadi akses tidak sah yang dicurigai."
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
              "**Paket**: Gratis (€0), Pro (€12/bulan atau €99/tahun), Bisnis (€39/bulan atau €349/tahun). Fitur dan kuota paket dijelaskan di [halaman Harga](/pricing) kami pada saat pembelian. Kami berhak mengubah fitur paket dengan pemberitahuan 30 hari.",
              "**Pembaruan otomatis**: langganan bulanan dan tahunan diperbarui secara otomatis dengan frekuensi yang sama hingga dibatalkan. Anda dapat membatalkan kapan saja melalui dasbor Anda; pembatalan berlaku pada akhir periode penagihan saat ini. Anda tetap memiliki akses hingga tanggal tersebut.",
              "**Hak penarikan (UE)**: menurut Pasal L. 221-28 Kode Konsumen Prancis, ketika Anda secara aktif menggunakan Layanan selama periode penarikan awal 14 hari, Anda secara tegas menyetujui pelaksanaan kontrak segera dan melepaskan hak penarikan Anda. Jika Anda tidak menggunakan fitur berbayar apa pun, Anda dapat menarik diri dalam 14 hari dengan mengirim email ke [billing@konvertools.com](mailto:billing@konvertools.com) dan kami akan mengembalikan dana secara penuh dalam 14 hari.",
              "**Tidak ada pengembalian sebagian**: di luar skenario penarikan di atas, biaya yang telah dibayarkan untuk periode penagihan saat ini tidak dapat dikembalikan.",
              "**Kredit**: kredit API yang dibeli sebagai paket sekali pakai (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **tidak pernah kedaluwarsa**. 300 kredit yang secara otomatis diberikan setiap bulan kepada pelanggan Bisnis kedaluwarsa pada akhir bulan kalender dan **tidak dapat dikembalikan**.",
              "**Perubahan harga**: kami dapat mengubah harga dengan pemberitahuan 30 hari. Pelanggan yang sudah ada mempertahankan harga saat ini hingga tanggal pembaruan berikutnya.",
              "**Pajak**: harga ditampilkan tanpa PPN jika berlaku. Stripe akan memungut dan menyetorkan pajak yang terutang di yurisdiksi Anda."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. API REST Publik",
        "blocks": [
          {
            "kind": "p",
            "text": "Paket Bisnis menyediakan API REST Publik yang diautentikasi dengan kunci API yang Anda buat melalui dasbor. Penggunaan API juga tunduk pada:"
          },
          {
            "kind": "ul",
            "items": [
              "**Batas laju**: 60 permintaan per menit (tambahan Pro) atau 120 permintaan per menit (Bisnis). Penyalahgunaan berkelanjutan dapat mengakibatkan pembatasan sementara atau pencabutan kunci permanen.",
              "**Pengurangan kredit**: setiap panggilan API mengurangi kredit sesuai dengan tarif yang dipublikasikan di [dokumentasi API](/api) kami. Panggilan gagal (respons 5xx) tidak mengurangi kredit.",
              "**Keamanan kunci**: Anda bertanggung jawab untuk menyimpan kunci API Anda dengan aman dan memutarnya jika terjadi kompromi. Kami dapat mencabut kunci apa pun kapan saja jika kami mencurigai penyalahgunaan.",
              "**Penggunaan hulu yang dapat diterima**: aplikasi yang dibangun di atas API kami harus mematuhi Ketentuan ini, termasuk bagian penggunaan yang dapat diterima. Anda tidak boleh mengekspos kunci API kami kepada pengguna akhir (lisensikan layanan Anda sebagai gantinya)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Kekayaan intelektual",
        "blocks": [
          {
            "kind": "p",
            "text": "Nama, logo, kode, desain, dokumentasi, struktur basis data, dan konten agregat Layanan adalah milik eksklusif Penerbit dan dilindungi oleh hukum kekayaan intelektual Prancis dan internasional. Tidak ada lisensi yang diberikan kepada Anda selain yang secara ketat diperlukan untuk menggunakan Layanan sebagaimana dimaksud. Anda tidak boleh mereproduksi, memodifikasi, dekompilasi, atau membuat karya turunan dari Layanan atau bagian apa pun darinya, kecuali sebagaimana secara tegas diizinkan oleh hukum yang berlaku."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Pembebasan tanggung jawab",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda menyetujui untuk membebaskan dan menjaga Penerbit dari segala tuntutan, kerugian, kerusakan, tanggung jawab, biaya, atau pengeluaran (termasuk biaya hukum yang wajar) yang timbul dari (a) pelanggaran Anda terhadap Ketentuan ini, (b) pelanggaran Anda terhadap hukum atau hak pihak ketiga, atau (c) konten apa pun yang Anda unggah ke Layanan."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Perubahan Ketentuan",
        "blocks": [
          {
            "kind": "p",
            "text": "Kami dapat mengubah Ketentuan ini sewaktu-waktu. Perubahan substansial akan diberitahukan melalui email kepada pemegang akun setidaknya tiga puluh (30) hari sebelum diberlakukan. Dengan terus menggunakan Layanan setelah periode tersebut, Anda menerima Ketentuan yang telah diubah. Versi terbaru selalu tersedia di [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Pemutusan",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda dapat menghentikan akun Anda kapan saja melalui dasbor. Kami dapat menghentikan atau menangguhkan akun Anda segera dan tanpa pemberitahuan jika Anda melanggar Ketentuan ini, menyalahgunakan Layanan, atau gagal membayar langganan berulang. Setelah pemutusan, data Anda akan dihapus dalam tiga puluh (30) hari, kecuali catatan penagihan dan pencatatan persetujuan yang disimpan sebagaimana dijelaskan dalam Kebijakan Privasi kami."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Hukum yang berlaku dan yurisdiksi",
        "blocks": [
          {
            "kind": "p",
            "text": "Ketentuan ini tunduk pada hukum Prancis. Setiap sengketa yang timbul dari atau terkait dengan Ketentuan ini atau Layanan akan diajukan kepada yurisdiksi eksklusif pengadilan Paris, Prancis, kecuali apabila hak tindakan wajib konsumen di negara tempat tinggalnya berlaku menurut hukum Uni Eropa atau nasional yang berlaku. Sebelum memulai tindakan hukum, Anda menyetujui untuk mencoba menyelesaikan sengketa secara damai dengan menulis ke [legal@konvertools.com](mailto:legal@konvertools.com). Konsumen UE juga dapat menggunakan platform Penyelesaian Sengketa Online Komisi Eropa di [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Hal-hal lain",
        "blocks": [
          {
            "kind": "p",
            "text": "Jika ketentuan apa pun dalam Ketentuan ini dinyatakan tidak valid atau tidak dapat ditegakkan, ketentuan yang tersisa tetap berlaku sepenuhnya. Kegagalan kami untuk menegakkan hak atau ketentuan apa pun tidak dianggap sebagai pengabaian terhadap hak tersebut. Ketentuan ini (bersama dengan Kebijakan Privasi dan ketentuan spesifik paket yang dirujuk saat pembelian) merupakan perjanjian lengkap antara Anda dan Penerbit terkait Layanan."
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
            "text": "Các Điều khoản Dịch vụ (\"Điều khoản\") này tạo thành một thỏa thuận ràng buộc giữa bạn (\"Người dùng\") và nhà xuất bản của Konvertools (\"Nhà xuất bản\", \"chúng tôi\", \"chúng tôi\") liên quan đến việc bạn sử dụng trang web Konvertools và tất cả các công cụ, API và dịch vụ liên quan (tập thể gọi là \"Dịch vụ\"). Bằng cách tạo tài khoản, đánh dấu vào ô chấp nhận khi đăng ký hoặc đơn giản bằng cách sử dụng bất kỳ công cụ nào trên Dịch vụ, bạn xác nhận rằng bạn đã đọc, hiểu và chấp nhận toàn bộ các Điều khoản này, cùng với Chính sách Bảo mật của chúng tôi."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Dịch vụ",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools cung cấp danh mục các tiện ích chuyển đổi tệp, công cụ xử lý tài liệu và hình ảnh, tiện ích hỗ trợ bởi AI, công cụ bảo mật chỉ mang tính chất tham khảo (xác minh email, phát hiện lừa đảo, quét URL, kiểm tra chứng chỉ SSL, kiểm tra vi phạm mật khẩu) và tiện ích dành cho nhà phát triển. Hầu hết các công cụ hoạt động hoàn toàn trong trình duyệt của bạn; một số yêu cầu xử lý trên máy chủ. Dịch vụ được cung cấp **\"như hiện trạng\" và \"sẵn có\"** mà không có bất kỳ bảo hành nào, dù là rõ ràng hay ngụ ý, bao gồm khả năng thương mại, phù hợp cho mục đích cụ thể hoặc không vi phạm."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Giới hạn trách nhiệm — đọc kỹ",
        "blocks": [
          {
            "kind": "p",
            "text": "**Trong phạm vi tối đa cho phép bởi pháp luật, Nhà xuất bản từ chối mọi trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc bạn sử dụng hoặc không thể sử dụng Dịch vụ.** Đặc biệt, bạn thừa nhận và đồng ý rằng Nhà xuất bản sẽ không chịu trách nhiệm cho:"
          },
          {
            "kind": "ul",
            "items": [
              "mất dữ liệu, tệp bị hỏng hoặc không chính xác, hoặc chuyển đổi thất bại;",
              "các quyết định, tài chính, kinh doanh hoặc các quyết định khác mà bạn đưa ra dựa trên đầu ra của bất kỳ công cụ nào;",
              "thời gian chết, độ trễ hoặc sự không khả dụng tạm thời của bất kỳ tính năng nào;",
              "lỗi dịch vụ của bên thứ ba (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, nhà cung cấp dịch vụ lưu trữ);",
              "thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc trừng phạt dưới bất kỳ hình thức nào;",
              "bất kỳ khoản tiền tổng hợp nào vượt quá khoản phí bạn đã thanh toán cho chúng tôi trong mười hai (12) tháng trước sự kiện phát sinh yêu cầu bồi thường, giới hạn ở một trăm (100) euro đối với người dùng tầng miễn phí."
            ]
          },
          {
            "kind": "p",
            "text": "**Công cụ bảo mật**: Trình quét URL, Trình phát hiện lừa đảo, Trình xác minh email, Trình kiểm tra chứng chỉ SSL và Trình kiểm tra vi phạm mật khẩu được cung cấp **chỉ mang tính chất thông tin và tham khảo**. Chúng tổng hợp các tín hiệu từ bên thứ ba (Google Safe Browsing, DNS công cộng, HaveIBeenPwned, bắt tay TLS trực tiếp) và các phương pháp heuristic dựa trên mô hình ngôn ngữ lớn. Chúng **không cấu thành sự đảm bảo về an toàn, tính hợp lệ hoặc không có rủi ro**. Các trang lừa đảo mới xuất hiện nhanh hơn so với cơ sở dữ liệu danh tiếng có thể lập danh mục; một email vượt qua kiểm tra của chúng tôi vẫn có thể không hoạt động hoặc gian lận; chứng chỉ SSL hợp lệ không chứng nhận nội dung của một trang web. Nhà xuất bản từ chối rõ ràng mọi trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ một email lừa đảo mà Dịch vụ cho là an toàn, một liên kết không an toàn mà Dịch vụ không xác định được, một email giao dịch được gửi đến địa chỉ mà Dịch vụ đánh dấu là hợp lệ, hoặc bất kỳ quyết định bảo mật nào dựa trên các công cụ này. Người dùng chịu trách nhiệm duy nhất cho những quyết định như vậy."
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
              "tải lên, xử lý hoặc phân phối nội dung bất hợp pháp tại khu vực pháp lý của bạn hoặc tại Pháp;",
              "xử lý các tệp mà bạn không nắm giữ quyền cần thiết (tác phẩm có bản quyền không có sự cho phép, dữ liệu cá nhân mà bạn không được phép xử lý, thông tin mật);",
              "tham gia hoặc tạo điều kiện cho gian lận, rửa tiền, tài trợ cho khủng bố hoặc bất kỳ hoạt động tội phạm nào;",
              "sử dụng công cụ nhân hóa AI, công cụ văn bản AI hoặc bất kỳ tính năng nào khác để đạo văn, lừa dối bên thứ ba, thao túng hệ thống đánh giá (học thuật, tuyển dụng, mạng quảng cáo) theo cách vi phạm quy tắc của chúng, hoặc lừa dối theo bất kỳ cách nào vi phạm luật áp dụng;",
              "cố gắng quá tải, đảo ngược kỹ thuật, thu thập dữ liệu, lạm dụng giới hạn tốc độ hoặc can thiệp vào hoạt động hoặc khả năng sẵn có của Dịch vụ theo bất kỳ cách nào;",
              "vượt qua hạn ngạch, yêu cầu thanh toán hoặc bất kỳ hạn chế nào khác đang áp dụng;",
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
            "text": "Bạn giữ tất cả quyền, quyền sở hữu và lợi ích đối với các tệp và văn bản bạn gửi đến Dịch vụ. Bạn cấp cho chúng tôi một giấy phép giới hạn, không có bản quyền, toàn cầu để xử lý chúng chỉ nhằm cung cấp công cụ bạn yêu cầu. Giấy phép này chấm dứt ngay khi kết quả được trả về cho bạn (công cụ hỗ trợ bởi máy chủ) hoặc không bao giờ tồn tại (công cụ chỉ chạy trên trình duyệt, vì tệp của bạn không bao giờ đến được với chúng tôi). Chúng tôi không, và sẽ không, tuyên bố sở hữu nội dung của bạn hoặc sử dụng nó để đào tạo mô hình AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Tài khoản",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn phải ít nhất mười sáu (16) tuổi để tạo tài khoản. Bạn chịu trách nhiệm giữ bí mật thông tin đăng nhập của mình và chịu trách nhiệm về bất kỳ hoạt động nào xảy ra dưới tài khoản của bạn. Thông báo ngay cho chúng tôi tại [security@konvertools.com](mailto:security@konvertools.com) về bất kỳ truy cập trái phép nào được nghi ngờ."
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
              "**Gói dịch vụ**: Miễn phí (€0), Pro (€12/tháng hoặc €99/năm), Doanh nghiệp (€39/tháng hoặc €349/năm). Các tính năng và hạn ngạch của gói được mô tả trên trang [Bảng giá của chúng tôi](/pricing) tại thời điểm mua. Chúng tôi có quyền sửa đổi tính năng của gói với thông báo trước 30 ngày.",
              "**Tự động gia hạn**: đăng ký hàng tháng và hàng năm tự động gia hạn theo cùng chu kỳ cho đến khi bị hủy. Bạn có thể hủy bất kỳ lúc nào từ bảng điều khiển của mình; việc hủy có hiệu lực vào cuối kỳ thanh toán hiện tại. Bạn vẫn có quyền truy cập cho đến ngày đó.",
              "**Quyền rút lui (EU)**: theo Điều L. 221-28 của Bộ luật Tiêu dùng Pháp, khi bạn chủ động sử dụng Dịch vụ trong giai đoạn rút lui ban đầu 14 ngày, bạn đồng ý rõ ràng với việc thực hiện hợp đồng ngay lập tức và từ bỏ quyền rút lui của mình. Nếu bạn chưa sử dụng bất kỳ tính năng trả phí nào, bạn có thể rút lui trong vòng 14 ngày bằng cách gửi email đến [billing@konvertools.com](mailto:billing@konvertools.com) và chúng tôi sẽ hoàn tiền đầy đủ trong vòng 14 ngày.",
              "**Không hoàn tiền một phần**: ngoài trường hợp rút lui nêu trên, phí đã thanh toán cho kỳ thanh toán hiện tại không được hoàn lại.",
              "**Tín dụng**: tín dụng API mua dưới dạng gói một lần (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **không bao giờ hết hạn**. 300 tín dụng được tự động cấp mỗi tháng cho người đăng ký Doanh nghiệp sẽ hết hạn vào cuối tháng dương lịch và **không được hoàn lại**.",
              "**Thay đổi giá**: chúng tôi có thể sửa đổi giá với thông báo trước 30 ngày. Người đăng ký hiện tại giữ nguyên mức giá cho đến ngày gia hạn tiếp theo.",
              "**Thuế**: giá được hiển thị không bao gồm VAT (nếu có). Stripe thu thuế và chuyển tiền thuế đến khu vực pháp lý của bạn."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. API REST công khai",
        "blocks": [
          {
            "kind": "p",
            "text": "Gói Doanh nghiệp cung cấp API REST công khai được xác thực bằng khóa API do bạn tạo từ bảng điều khiển. Việc sử dụng API còn chịu sự điều chỉnh bổ sung bởi:"
          },
          {
            "kind": "ul",
            "items": [
              "**Giới hạn tốc độ**: 60 yêu cầu mỗi phút (nâng cấp Pro) hoặc 120 yêu cầu mỗi phút (Doanh nghiệp). Lạm dụng kéo dài có thể dẫn đến tạm ngưng tạm thời hoặc thu hồi khóa vĩnh viễn.",
              "**Tiêu hao tín dụng**: mỗi cuộc gọi API trừ đi tín dụng theo tỷ lệ được công bố trong [tài liệu API của chúng tôi](/api). Các cuộc gọi thất bại (phản hồi 5xx) không trừ tín dụng.",
              "**Bảo mật khóa**: bạn chịu trách nhiệm lưu trữ khóa API của mình một cách an toàn và xoay khóa nếu bị xâm phạm. Chúng tôi có thể thu hồi bất kỳ khóa nào bất kỳ lúc nào nếu nghi ngờ lạm dụng.",
              "**Sử dụng thượng nguồn chấp nhận được**: các ứng dụng được xây dựng trên API của chúng tôi phải tuân thủ các Điều khoản này, bao gồm cả phần sử dụng chấp nhận được. Bạn không được phép tiết lộ khóa API của chúng tôi cho người dùng cuối (thay vào đó hãy cấp phép lại dịch vụ của bạn)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Sở hữu trí tuệ",
        "blocks": [
          {
            "kind": "p",
            "text": "Tên, biểu tượng, mã, thiết kế, tài liệu, cấu trúc cơ sở dữ liệu và nội dung tổng hợp của Dịch vụ là tài sản độc quyền của Nhà xuất bản và được bảo vệ bởi luật sở hữu trí tuệ của Pháp và quốc tế. Bạn không được cấp bất kỳ giấy phép nào ngoài những gì cần thiết để sử dụng Dịch vụ theo mục đích dự định. Bạn không được sao chép, sửa đổi, dịch ngược hoặc tạo tác phẩm phái sinh từ Dịch vụ hoặc bất kỳ phần nào của nó, trừ khi được pháp luật cho phép rõ ràng."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Bồi thường thiệt hại",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn đồng ý bồi thường và giữ Nhà xuất bản vô hại khỏi bất kỳ khiếu nại, tổn thất, thiệt hại, trách nhiệm, chi phí hoặc khoản phí (bao gồm phí pháp lý hợp lý) phát sinh từ (a) việc bạn vi phạm các Điều khoản này, (b) việc bạn vi phạm bất kỳ luật nào hoặc quyền của bên thứ ba, hoặc (c) bất kỳ nội dung nào bạn gửi đến Dịch vụ."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Thay đổi Điều khoản",
        "blocks": [
          {
            "kind": "p",
            "text": "Chúng tôi có thể sửa đổi các Điều khoản này theo thời gian. Những thay đổi quan trọng sẽ được thông báo qua email cho người dùng có tài khoản ít nhất ba mươi (30) ngày trước khi chúng có hiệu lực. Bằng cách tiếp tục sử dụng Dịch vụ sau thời gian đó, bạn chấp nhận các Điều khoản đã sửa đổi. Phiên bản mới nhất luôn có sẵn tại [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Chấm dứt",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn có thể chấm dứt tài khoản của mình bất kỳ lúc nào từ bảng điều khiển. Chúng tôi có thể chấm dứt hoặc tạm ngưng tài khoản của bạn ngay lập tức và không cần thông báo nếu bạn vi phạm các Điều khoản này, lạm dụng Dịch vụ hoặc không thanh toán đăng ký định kỳ. Sau khi chấm dứt, dữ liệu của bạn sẽ bị xóa trong vòng ba mươi (30) ngày, trừ hồ sơ thanh toán và hồ sơ đồng thuận được lưu giữ theo mô tả trong Chính sách Bảo mật của chúng tôi."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Luật điều chỉnh và thẩm quyền tài phán",
        "blocks": [
          {
            "kind": "p",
            "text": "Các Điều khoản này chịu sự điều chỉnh bởi luật pháp của Pháp. Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các Điều khoản này hoặc Dịch vụ sẽ được đưa ra trước thẩm quyền độc quyền của tòa án Paris, Pháp, trừ khi quyền hành động bắt buộc của người tiêu dùng tại quốc gia cư trú của họ có hiệu lực theo luật của Liên minh Châu Âu hoặc luật quốc gia áp dụng. Trước khi khởi kiện, bạn đồng ý cố gắng giải quyết tranh chấp một cách thân thiện bằng cách viết thư đến [legal@konvertools.com](mailto:legal@konvertools.com). Người tiêu dùng EU cũng có thể sử dụng nền tảng Giải quyết Tranh chấp Trực tuyến của Ủy ban Châu Âu tại [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Các điều khoản khác",
        "blocks": [
          {
            "kind": "p",
            "text": "Nếu bất kỳ điều khoản nào trong các Điều khoản này bị coi là vô hiệu hoặc không thể thực thi, các điều khoản còn lại vẫn có hiệu lực đầy đủ. Việc chúng tôi không thực thi bất kỳ quyền hoặc điều khoản nào không phải là từ bỏ quyền đó. Các Điều khoản này (cùng với Chính sách Bảo mật và bất kỳ điều khoản cụ thể theo gói nào được đề cập khi mua) cấu thành toàn bộ thỏa thuận giữa bạn và Nhà xuất bản liên quan đến Dịch vụ."
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
            "text": "Dessa Användarvillkor (nedan kallade \"Villkoren\") utgör ett bindande avtal mellan dig (nedan kallad \"Användaren\") och utgivaren av Konvertools (nedan kallad \"Utgivaren\", \"vi\", \"oss\") avseende ditt användande av Konvertools webbplats och alla tillhörande verktyg, API:er och tjänster (gemensamt kallat \"Tjänsten\"). Genom att skapa ett konto, kryssa i acceptansrutan vid registrering eller genom att helt enkelt använda något verktyg på Tjänsten bekräftar du att du har läst, förstått och accepterat dessa Villkor i sin helhet, tillsammans med vår Integritetspolicy."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Tjänsten",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools tillhandahåller en katalog med filkonverteringsverktyg, dokument- och bildbehandlingsverktyg, AI-assisterade textverktyg, indikativa säkerhetsverktyg (e-postverifierare, phishingdetektor, URL-skanner, SSL-certifikatkontroll, lösenordsläckagekontroll) samt utvecklarverktyg. De flesta verktyg körs helt i din webbläsare; vissa kräver serverbearbetning. Tjänsten tillhandahålls **\"som den är\" och \"tillgänglig\"** utan någon form av garanti, uttrycklig eller underförstådd, inklusive försäljbarhet, lämplighet för ett särskilt ändamål eller icke-intrång."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Begränsning av ansvar — läs noga",
        "blocks": [
          {
            "kind": "p",
            "text": "**I den utsträckning lagen tillåter, friskriver sig Utgivaren från allt ansvar för skador av något slag som uppstår till följd av ditt användande av, eller oförmåga att använda, Tjänsten.** Du bekräftar och godkänner särskilt att Utgivaren inte ska vara ansvarig för följande:"
          },
          {
            "kind": "ul",
            "items": [
              "förlust av data, korrupta eller felaktiga filer eller misslyckade konverteringar;",
              "beslut, finansiella, affärsmässiga eller andra, som du fattar baserat på resultatet från något verktyg;",
              "nedtid, fördröjning eller tillfällig otillgänglighet av någon funktion;",
              "fel hos tredje parts tjänster (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, värdtjänstleverantörer);",
              "indirekta, tillfälliga, särskilda, följd- eller straffskador av något slag;",
              "någon sammanlagd ersättning som överstiger de avgifter du faktiskt har betalat till oss under de tolv (12) månader som föregår händelsen som ger upphov till kravet, med ett tak på ett hundra (100) euro för användare på gratisnivå."
            ]
          },
          {
            "kind": "p",
            "text": "**Säkerhetsverktyg**: URL-skannern, Phishingdetektorn, E-postverifieraren, SSL-certifikatkontrollen och lösenordsläckagekontrollen tillhandahålls **enbart i informations- och indikativt syfte**. De aggregerar signaler från tredje part (Google Safe Browsing, allmän DNS, HaveIBeenPwned, levande TLS-handskakningar) och heuristik från stora språkmodeller. De **utgör ingen garanti för säkerhet, giltighet eller frånvaro av risk**. Nya phishing-sidor uppstår snabbare än ryktesdatabaser kan katalogisera dem; en e-post som passerar våra kontroller kan ändå vara inaktiv eller bedräglig; ett giltigt SSL-certifikat garanterar inte en webbplats innehåll. Utgivaren friskriver sig uttryckligen från allt ansvar för skador som uppstår till följd av en phishing-e-post som Tjänsten bedömde som säker, en osäker länk som Tjänsten missade, en transaktionell e-post som skickades till en adress som Tjänsten markerade som giltig, eller något säkerhetsbeslut som fattats på grundval av dessa verktyg. Användaren bär ensamt ansvaret för sådana beslut."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Acceptabel användning",
        "blocks": [
          {
            "kind": "p",
            "text": "Du förbinder dig att **inte** använda Tjänsten för att:"
          },
          {
            "kind": "ul",
            "items": [
              "ladda upp, bearbeta eller distribuera innehåll som är olagligt i din jurisdiktion eller i Frankrike;",
              "bearbeta filer för vilka du inte innehar nödvändiga rättigheter (upphovsrättsskyddade verk utan tillstånd, personuppgifter som du inte har rätt att bearbeta, hemlig information);",
              "utföra eller underlätta bedrägeri, penningtvätt, finansiering av terrorism eller annan brottslig verksamhet;",
              "använda AI-humaniseringen, AI-textverktygen eller andra funktioner för att plagiera, bedra en tredje part, manipulera utvärderingssystem (akademiska, rekryterings-, annonsnätverk) på ett sätt som strider mot deras regler, eller på annat sätt vilseleda i strid med tillämplig lag;",
              "försöka överbelasta, reverse-engineera, skrapa, missbruka hastighetsbegränsningar eller på annat sätt störa driften eller tillgängligheten av Tjänsten;",
              "undvika kvoter, betalningskrav eller andra begränsningar som finns;",
              "skapa flera konton för att multiplicera gratisnivåns kvoter eller dela ett konto med fler personer än vad ditt abonnemang tillåter."
            ]
          },
          {
            "kind": "p",
            "text": "Vi kan omedelbart och utan föregående meddelande suspendera eller avsluta ditt konto om vi har rimliga skäl att tro att du har brutit mot denna paragraf, utan rätt till återbetalning av något slag."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ditt innehåll",
        "blocks": [
          {
            "kind": "p",
            "text": "Du behåller alla rättigheter, titel och intresse i de filer och texter som du skickar till Tjänsten. Du ger oss en strikt begränsad, avgiftsfri, global licens att bearbeta dem enbart för att leverera det verktyg du har begärt. Denna licens upphör i samma ögonblick som resultatet returneras till dig (serverassisterade verktyg) eller aldrig träder i kraft alls (webbläsarbaserade verktyg, eftersom din fil aldrig når oss). Vi gör, och kommer inte att göra, anspråk på äganderätt till ditt innehåll eller använda det för att träna AI-modeller."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konton",
        "blocks": [
          {
            "kind": "p",
            "text": "Du måste vara minst sexton (16) år för att skapa ett konto. Du ansvarar för att hålla dina inloggningsuppgifter konfidentiella och för all aktivitet som sker under ditt konto. Meddela oss omedelbart på [security@konvertools.com](mailto:security@konvertools.com) om du misstänker obehörig åtkomst."
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
              "**Abonnemang**: Gratis (€0), Pro (€12/månad eller €99/år), Business (€39/månad eller €349/år). Funktioner och kvoter för abonnemang beskrivs på vår [Prissida](/pricing) vid köptillfället. Vi förbehåller oss rätten att ändra abonnemangets funktioner med 30 dagars varsel.",
              "**Automatisk förnyelse**: Månads- och årsabonnemang förnyas automatiskt med samma frekvens tills de avbryts. Du kan avbryta när som helst via ditt kontrollpanel; avbrytandet träder i kraft vid slutet av den aktuella faktureringsperioden. Du behåller åtkomst tills dess.",
              "**Ångerrätt (EU)**: enligt Artikel L. 221-28 i den franska konsumentkodexen, när du aktivt använder Tjänsten under den initiala 14-dagars ångerfristen, samtycker du uttryckligen till omedelbar fullgörande av avtalet och avsäger dig din ångerrätt. Om du inte har använt någon betald funktion kan du ångra dig inom 14 dagar genom att skicka ett e-postmeddelande till [billing@konvertools.com](mailto:billing@konvertools.com) och vi kommer att utfärda en full återbetalning inom 14 dagar.",
              "**Inga partiella återbetalningar**: utanför ovanstående ångerscenario är avgifter som redan har betalats för den aktuella faktureringsperioden icke-återbetalningsbara.",
              "**Krediter**: API-krediter som köpts som engångspaket (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **löper aldrig ut**. De 300 krediter som Business-abonnenter automatiskt tilldelas varje månad löper ut vid slutet av kalendermånaden och är **icke-återbetalningsbara**.",
              "**Prisförändringar**: vi kan ändra priser med 30 dagars varsel. Befintliga abonnenter behåller sitt nuvarande pris tills nästa förnyelsedatum.",
              "**Moms**: priser visas exklusive moms där så är tillämpligt. Stripe samlar in och redovisar eventuell moms som är skyldig i din jurisdiktion."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Offentligt REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "Business-abonnemanget exponerar ett offentligt REST API som autentiseras med API-nycklar som du genererar från ditt kontrollpanel. Användningen av API:t regleras dessutom av följande:"
          },
          {
            "kind": "ul",
            "items": [
              "**Hastighetsbegränsningar**: 60 förfrågningar per minut (Pro-tillägg) eller 120 förfrågningar per minut (Business). Upprepad missbruk kan leda till tillfällig begränsning eller permanent återkallande av nyckeln.",
              "**Kreditförbrukning**: varje API-anrop drar av krediter enligt de priser som anges i vår [API-dokumentation](/api). Misslyckade anrop (5xx-svar) drar inte av krediter.",
              "**Nyckelsäkerhet**: du ansvarar för att lagra dina API-nycklar säkert och rotera dem om de komprometteras. Vi kan återkalla vilken nyckel som helst när som helst om vi misstänker missbruk.",
              "**Acceptabel uppströmsanvändning**: applikationer som bygger på vårt API måste följa dessa Villkor, inklusive avsnittet om acceptabel användning. Du får inte exponera våra API-nycklar för slutanvändare (licensiera istället din tjänst vidare)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Immateriella rättigheter",
        "blocks": [
          {
            "kind": "p",
            "text": "Namn, logotyp, kod, design, dokumentation, databasstruktur och aggregerat innehåll för Tjänsten är Utgivarens exklusiva egendom och skyddas av fransk och internationell immaterialrättslagstiftning. Ingen licens ges till dig utöver vad som är strikt nödvändigt för att använda Tjänsten som avsett. Du får inte reproducera, modifiera, dekompilera eller skapa härledda verk av Tjänsten eller någon del av den, utom i den utsträckning lagen uttryckligen tillåter."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnifiering",
        "blocks": [
          {
            "kind": "p",
            "text": "Du förbinder dig att hålla Utgivaren oskadlig och ersätta Utgivaren för alla anspråk, förluster, skador, ansvar, kostnader eller utgifter (inklusive rimliga juridiska avgifter) som uppstår till följd av (a) ditt brott mot dessa Villkor, (b) ditt brott mot någon lag eller tredje parts rättigheter, eller (c) något innehåll som du har skickat till Tjänsten."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Ändringar av Villkoren",
        "blocks": [
          {
            "kind": "p",
            "text": "Vi kan ändra dessa Villkor när som helst. Väsentliga ändringar meddelas via e-post till kontoinnehavare minst trettio (30) dagar innan de träder i kraft. Genom att fortsätta använda Tjänsten efter denna period accepterar du de ändrade Villkoren. Den senaste versionen finns alltid tillgänglig på [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Uppsägning",
        "blocks": [
          {
            "kind": "p",
            "text": "Du kan när som helst avsluta ditt konto via ditt kontrollpanel. Vi kan omedelbart och utan föregående meddelande avsluta eller suspendera ditt konto om du bryter mot dessa Villkor, missbrukar Tjänsten eller inte betalar ett återkommande abonnemang. Vid uppsägning raderas dina data inom trettio (30) dagar, förutom fakturerings- och samtyckesregister som behålls enligt vår Integritetspolicy."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Tillämplig lag och jurisdiktion",
        "blocks": [
          {
            "kind": "p",
            "text": "Dessa Villkor styrs av fransk lag. Eventuella tvister som uppstår i samband med dessa Villkor eller Tjänsten ska hänskjutas till de exklusiva domstolarna i Paris, Frankrike, såvida inte en konsuments obligatoriska rättigheter i sitt hemland enligt EU-lagstiftning eller nationell lagstiftning gäller. Innan du inleder rättsliga åtgärder förbinder du dig att försöka lösa tvisten på ett vänligt sätt genom att skriva till [legal@konvertools.com](mailto:legal@konvertools.com). EU-konsumenter kan också använda Europeiska kommissionens plattform för online-tvister på [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Övrigt",
        "blocks": [
          {
            "kind": "p",
            "text": "Om någon bestämmelse i dessa Villkor befinns ogiltig eller oenforcebar, förblir de återstående bestämmelserna fullt giltiga. Vårt underlåtenhet att genomdriva någon rätt eller bestämmelse utgör inte ett avstående från den rätten. Dessa Villkor (tillsammans med Integritetspolicyn och eventuella abonnemangsspecifika villkor som hänvisas till vid köp) utgör hela avtalet mellan dig och Utgivaren avseende Tjänsten."
          }
        ]
      }
    ]
  },
  "pl": {
    "h1": "Regulamin",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ostatnia aktualizacja: %DATE% · Korzystając z Konvertools, wyrażasz zgodę na niniejsze warunki.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Akceptacja",
        "blocks": [
          {
            "kind": "p",
            "text": "Niniejszy Regulamin (zwany dalej „Regulaminem”) stanowi wiążącą umowę pomiędzy Tobą (zwany dalej „Użytkownikiem”) a wydawcą Konvertools (zwany dalej „Wydawcą”, „my”, „nas”) dotyczącą korzystania z serwisu Konvertools oraz wszystkich powiązanych narzędzi, API i usług (zwanych łącznie „Usługą”). Tworząc konto, zaznaczając pole akceptacji podczas rejestracji lub po prostu korzystając z dowolnego narzędzia w Serwisie, potwierdzasz, że zapoznałeś się z niniejszym Regulaminem w całości, zrozumiałeś go i akceptujesz, wraz z naszą Polityką Prywatności."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Charakterystyka Usługi",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools oferuje katalog narzędzi do konwersji plików, przetwarzania dokumentów i obrazów, narzędzi tekstowych wspomaganych AI, narzędzi bezpieczeństwa (weryfikator e-maili, wykrywacz phishingu, skaner adresów URL, weryfikator certyfikatów SSL, sprawdzanie naruszeń haseł) oraz narzędzi dla programistów. Większość narzędzi działa wyłącznie w przeglądarce użytkownika; niektóre wymagają przetwarzania po stronie serwera. Usługa jest świadczona **„tak jak jest” i „tak jak dostępna”** bez jakiejkolwiek gwarancji, wyraźnej lub dorozumianej, w tym dotyczącej przydatności handlowej, przydatności do określonego celu lub braku naruszenia praw."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Ograniczenie odpowiedzialności — przeczytaj uważnie",
        "blocks": [
          {
            "kind": "p",
            "text": "**W maksymalnym zakresie dozwolonym przez prawo, Wydawca wyłącza wszelką odpowiedzialność za szkody powstałe w wyniku korzystania z Usługi lub niemożności jej użycia.** W szczególności uznajesz i zgadzasz się, że Wydawca nie ponosi odpowiedzialności za:"
          },
          {
            "kind": "ul",
            "items": [
              "utratę danych, uszkodzone lub nieprawidłowe pliki lub nieudane konwersje;",
              "podejmowane decyzje, finansowe, biznesowe lub inne, oparte na wynikach dowolnego narzędzia;",
              "przestoje, opóźnienia lub tymczasową niedostępność jakiejkolwiek funkcji;",
              "awarie usług stron trzecich (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, dostawcy hostingu);",
              "szkody pośrednie, incydentalne, specjalne, następcze lub karne w jakiejkolwiek formie;",
              "jakąkolwiek łączną kwotę przekraczającą opłaty, które rzeczywiście zapłaciłeś nam w ciągu dwunastu (12) miesięcy poprzedzających zdarzenie stanowiące podstawę roszczenia, z limitem stu (100) euro dla użytkowników darmowej wersji."
            ]
          },
          {
            "kind": "p",
            "text": "**Narzędzia bezpieczeństwa**: Skaner adresów URL, Wykrywacz phishingu, Weryfikator e-maili, Weryfikator certyfikatów SSL oraz Sprawdzanie naruszeń haseł są świadczone **wyłącznie w celach informacyjnych i orientacyjnych**. Agregują one sygnały pochodzące od stron trzecich (Google Safe Browsing, publiczny DNS, HaveIBeenPwned, aktywne uzgadnianie TLS) oraz heurystyki modeli językowych. **Nie stanowią one gwarancji bezpieczeństwa, ważności lub braku ryzyka.** Nowe strony phishingowe pojawiają się szybciej, niż bazy reputacyjne są w stanie je skatalogować; e-mail, który przeszedł nasze kontrole, może nadal być nieaktywny lub oszukańczy; ważny certyfikat SSL nie potwierdza treści strony. Wydawca wyraźnie odmawia wszelkiej odpowiedzialności za jakiekolwiek szkody wynikające z e-maila phishingowego, który Usługa uznała za bezpieczny, niebezpiecznego linku, którego Usługa nie zidentyfikowała, transakcyjnego e-maila wysłanego na adres uznany przez Usługę za ważny lub jakiejkolwiek decyzji dotyczącej bezpieczeństwa podjętej na podstawie tych narzędzi. Użytkownik ponosi wyłączną odpowiedzialność za takie decyzje."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Użycie zgodne z przeznaczeniem",
        "blocks": [
          {
            "kind": "p",
            "text": "Zgadzasz się **nie** używać Usługi do:"
          },
          {
            "kind": "ul",
            "items": [
              "przesyłania, przetwarzania lub rozpowszechniania treści nielegalnych w Twojej jurysdykcji lub we Francji;",
              "przetwarzania plików, do których nie posiadasz odpowiednich praw (utwory chronione prawem autorskim bez upoważnienia, dane osobowe, do których nie jesteś uprawniony, informacje niejawne);",
              "popełniania lub ułatwiania oszustw, prania brudnych pieniędzy, finansowania terroryzmu lub jakiejkolwiek działalności przestępczej;",
              "używania narzędzi do humanizacji tekstu AI, narzędzi tekstowych AI lub jakiejkolwiek innej funkcji w celu plagiatu, oszukiwania osób trzecich, manipulowania systemami oceny (akademickimi, rekrutacyjnymi, sieci reklamowych) w sposób naruszający ich zasady lub wprowadzania w błąd w jakikolwiek sposób, który narusza obowiązujące prawo;",
              "próby przeciążenia, inżynierii wstecznej, scrapingu, nadużywania limitów szybkości lub innego zakłócania działania lub dostępności Usługi;",
              "omijania limitów, wymogów płatności lub jakichkolwiek innych ograniczeń wprowadzonych w Serwisie;",
              "tworzenia wielu kont w celu zwiększenia limitów darmowej wersji lub udostępniania konta większej liczbie osób niż pozwala na to Twój plan."
            ]
          },
          {
            "kind": "p",
            "text": "Możemy natychmiast zawiesić lub zakończyć Twoje konto bez uprzedzenia, jeśli mamy uzasadnione podstawy, aby sądzić, że naruszyłeś niniejszy punkt, bez prawa do zwrotu jakichkolwiek opłat."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Twoje treści",
        "blocks": [
          {
            "kind": "p",
            "text": "Zachowujesz wszelkie prawa, tytuł i interesy do plików i tekstów, które przesyłasz do Usługi. Udzielasz nam ściśle ograniczonej, nieodpłatnej, światowej licencji na ich przetwarzanie wyłącznie w celu dostarczenia narzędzia, którego zażądałeś. Licencja ta wygasa w momencie zwrócenia wyniku do Ciebie (narzędzia wymagające przetwarzania serwerowego) lub nie wchodzi w ogóle w życie (narzędzia działające wyłącznie w przeglądarce, gdyż Twój plik nigdy do nas nie trafia). Nie rościmy sobie i nie będziemy rościć prawa własności do Twoich treści ani używać ich do trenowania modeli AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konta",
        "blocks": [
          {
            "kind": "p",
            "text": "Musisz mieć ukończone co najmniej szesnaście (16) lat, aby utworzyć konto. Jesteś odpowiedzialny za zachowanie poufności swoich danych logowania oraz za wszelką działalność, która odbywa się na Twoim koncie. Niezwłocznie powiadom nas o podejrzeniu nieautoryzowanego dostępu, wysyłając wiadomość na adres [security@konvertools.com](mailto:security@konvertools.com)."
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
              "**Plany**: Darmowy (0 €), Pro (12 €/miesiąc lub 99 €/rok), Business (39 €/miesiąc lub 349 €/rok). Funkcje i limity planów są opisane na naszej stronie [Cennik](/pricing) w momencie zakupu. Zastrzegamy sobie prawo do zmiany funkcji planów z 30-dniowym wyprzedzeniem.",
              "**Autoodnawianie**: subskrypcje miesięczne i roczne odnawiają się automatycznie w tym samym cyklu, aż do odwołania. Możesz anulować w dowolnym momencie z poziomu panelu użytkownika; anulowanie wchodzi w życie z końcem bieżącego okresu rozliczeniowego. Zachowujesz dostęp do Usługi do tego czasu.",
              "**Prawo odstąpienia (UE)**: zgodnie z art. L. 221-28 francuskiego Kodeksu konsumenta, jeśli aktywnie korzystasz z Usługi w ciągu początkowego 14-dniowego okresu odstąpienia, wyrażasz zgodę na natychmiastowe wykonanie umowy i rezygnujesz z prawa do odstąpienia. Jeśli nie korzystałeś z żadnej płatnej funkcji, możesz odstąpić w ciągu 14 dni, wysyłając wiadomość na adres [billing@konvertools.com](mailto:billing@konvertools.com), a my dokonamy pełnego zwrotu w ciągu 14 dni.",
              "**Brak zwrotów częściowych**: poza powyższym scenariuszem odstąpienia, opłaty już zapłacone za bieżący okres rozliczeniowy nie podlegają zwrotowi.",
              "**Kredyty**: zakupione pakiety kredytów API (,,Starter”, „Growth”, „Scale”, „Studio”) **nie tracą ważności**. Trzysta (300) kredytów przyznawanych automatycznie każdego miesiąca użytkownikom planu Business tracą ważność z końcem danego miesiąca kalendarzowego i **nie podlegają zwrotowi**.",
              "**Zmiany cen**: możemy zmieniać ceny z 30-dniowym wyprzedzeniem. Istniejący subskrybenci zachowują obowiązującą cenę do następnego terminu odnowienia.",
              "**Podatek**: ceny są wyświetlane bez VAT, gdzie ma to zastosowanie. Stripe pobiera i przekazuje należny podatek w Twojej jurysdykcji."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Publiczne API REST",
        "blocks": [
          {
            "kind": "p",
            "text": "Plan Business udostępnia publiczne API REST uwierzytelniane za pomocą kluczy API generowanych z poziomu panelu użytkownika. Korzystanie z API jest dodatkowo regulowane przez:"
          },
          {
            "kind": "ul",
            "items": [
              "**Limity szybkości**: 60 żądań na minutę (dodatki do planu Pro) lub 120 żądań na minutę (plan Business). Trwałe nadużycia mogą skutkować tymczasowym ograniczeniem szybkości lub trwałym unieważnieniem klucza.",
              "**Zużycie kredytów**: każde wywołanie API pobiera kredyty według stawek opublikowanych w naszej [dokumentacji API](/api). Niepowodzenia (odpowiedzi 5xx) nie pobierają kredytów.",
              "**Bezpieczeństwo kluczy**: jesteś odpowiedzialny za bezpieczne przechowywanie swoich kluczy API i ich rotację w przypadku podejrzenia naruszenia. Możemy unieważnić klucz w dowolnym momencie, jeśli podejrzewamy nadużycie.",
              "**Akceptowalne zastosowania upstream**: aplikacje zbudowane na naszym API muszą być zgodne z niniejszym Regulaminem, w tym z sekcją dotyczącą użytkowania zgodnego z przeznaczeniem. Nie wolno udostępniać kluczy API naszym użytkownikom końcowym (zamiast tego sublicencjonuj swoją usługę)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Własność intelektualna",
        "blocks": [
          {
            "kind": "p",
            "text": "Nazwa, logo, kod, projekt, dokumentacja, struktura bazy danych oraz agregowane treści Usługi stanowią wyłączną własność Wydawcy i są chronione przez francuskie oraz międzynarodowe prawo własności intelektualnej. Nie udziela się Ci żadnej licencji poza tymi ściśle koniecznymi do korzystania z Usługi zgodnie z jej przeznaczeniem. Nie możesz powielać, modyfikować, dekompilować ani tworzyć utworów zależnych z Usługi lub jakiejkolwiek jej części, chyba że jest to wyraźnie dozwolone przez obowiązujące prawo."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnifikacja",
        "blocks": [
          {
            "kind": "p",
            "text": "Zobowiązujesz się do zwolnienia Wydawcy z odpowiedzialności oraz do pokrycia wszelkich roszczeń, strat, szkód, odpowiedzialności, kosztów lub wydatków (w tym rozsądnych honorariów prawnych) wynikających z (a) naruszenia niniejszego Regulaminu przez Ciebie, (b) naruszenia przez Ciebie prawa lub praw osób trzecich lub (c) jakiejkolwiek treści przesłanej do Usługi."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Zmiany w Regulaminie",
        "blocks": [
          {
            "kind": "p",
            "text": "Możemy okresowo modyfikować niniejszy Regulamin. Istotne zmiany zostaną powiadomione e-mailowo użytkownikom posiadającym konta co najmniej trzydzieści (30) dni przed ich wejściem w życie. Kontynuując korzystanie z Usługi po tym okresie, akceptujesz zmieniony Regulamin. Najnowsza wersja jest zawsze dostępna pod adresem [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Wypowiedzenie",
        "blocks": [
          {
            "kind": "p",
            "text": "Możesz wypowiedzieć swoje konto w dowolnym momencie z poziomu panelu użytkownika. Możemy wypowiedzieć lub zawiesić Twoje konto natychmiast i bez uprzedzenia, jeśli naruszasz niniejszy Regulamin, nadużywasz Usługi lub nie płacisz za subskrypcję odnawialną. Po wypowiedzeniu Twoje dane są usuwane w ciągu trzydziestu (30) dni, z wyjątkiem zapisów dotyczących płatności i zgód, które są przechowywane zgodnie z naszą Polityką Prywatności."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Prawo właściwe i jurysdykcja",
        "blocks": [
          {
            "kind": "p",
            "text": "Niniejszy Regulamin podlega prawu francuskiemu. Wszelkie spory wynikające z niniejszego Regulaminu lub Usługi będą rozpatrywane przez sądy wyłącznie właściwe w Paryżu we Francji, z zastrzeżeniem obowiązkowego prawa konsumenta do działania w jego kraju zamieszkania zgodnie z prawem Unii Europejskiej lub obowiązującym prawem krajowym. Przed wszczęciem postępowania sądowego zobowiązujesz się podjąć próbę polubownego rozwiązania sporu, wysyłając wiadomość na adres [legal@konvertools.com](mailto:legal@konvertools.com). Konsumenci z UE mogą również skorzystać z europejskiej platformy do rozstrzygania sporów konsumenckich pod adresem [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Postanowienia ogólne",
        "blocks": [
          {
            "kind": "p",
            "text": "Jeśli jakiekolwiek postanowienie niniejszego Regulaminu zostanie uznane za nieważne lub nieegzekwowalne, pozostałe postanowienia pozostają w pełni skuteczne. Nasze niedopełnienie obowiązku egzekwowania jakiegokolwiek prawa lub postanowienia nie stanowi zrzeczenia się tego prawa. Niniejszy Regulamin (wraz z Polityką Prywatności oraz wszelkimi warunkami dotyczącymi konkretnych planów, do których odwołano się podczas zakupu) stanowi całość umowy pomiędzy Tobą a Wydawcą dotyczącą Usługi."
          }
        ]
      }
    ]
  },
  "uk": {
    "h1": "Умови обслуговування",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Останнє оновлення: %DATE% · Використовуючи Konvertools, ви погоджуєтеся з цими умовами.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Прийняття",
        "blocks": [
          {
            "kind": "p",
            "text": "Ці Умови обслуговування (далі — «Умови») утворюють обов’язкову угоду між вами (далі — «Користувач») та видавцем Konvertools (далі — «Видавець», «ми», «нас») щодо використання вами вебсайту Konvertools та усіх пов’язаних інструментів, API та послуг (далі — «Сервіс»). Створюючи обліковий запис, встановлюючи прапорець прийняття під час реєстрації або просто використовуючи будь-який інструмент на Сервісі, ви підтверджуєте, що прочитали, зрозуміли та повністю приймаєте ці Умови разом із нашою Політикою конфіденційності."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Сервіс",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools надає каталог утиліт для конвертації файлів, інструменти для обробки документів та зображень, утиліти на базі штучного інтелекту для роботи з текстом, інструменти безпеки (перевірка електронної пошти, детектор фішингу, сканер URL-адрес, перевірка SSL-сертифікатів, перевірка витоку паролів) та інструменти для розробників. Більшість інструментів працюють виключно у вашому браузері; деякі вимагають серверної обробки. Сервіс надається **«як є»** та **«за наявності»** без будь-яких гарантій, явних чи неявних, включаючи придатність для продажу, придатність для певної мети чи відсутність порушення прав."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Обмеження відповідальності — уважно прочитайте",
        "blocks": [
          {
            "kind": "p",
            "text": "**У межах, дозволених законом, Видавець відмовляється від будь-якої відповідальності за шкоду будь-якого роду, що виникла внаслідок вашого використання Сервісу або неможливості його використання.** Зокрема, ви визнаєте та погоджуєтеся, що Видавець не несе відповідальності за:"
          },
          {
            "kind": "ul",
            "items": [
              "втрату даних, пошкоджені або неправильні файли чи невдалі конвертації;",
              "рішення, фінансові, бізнесові чи інші, які ви приймаєте на основі результатів роботи будь-якого інструменту;",
              "простої, затримки чи тимчасову недоступність будь-якої функції;",
              "збої сторонніх сервісів (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, хостинг-провайдери);",
              "непрямі, випадкові, спеціальні, наслідкові чи штрафні збитки будь-якого роду;",
              "будь-яку сукупну суму, що перевищує плату, яку ви фактично сплатили нам протягом дванадцяти (12) місяців, що передували події, яка спричинила претензію, з обмеженням у сто (100) євро для користувачів безкоштовного рівня."
            ]
          },
          {
            "kind": "p",
            "text": "**Інструменти безпеки**: сканер URL-адрес, детектор фішингу, перевірка електронної пошти, перевірка SSL-сертифікатів та перевірка витоку паролів надаються **виключно в інформаційних та індикативних цілях**. Вони агрегують сторонні сигнали (Google Safe Browsing, публічний DNS, HaveIBeenPwned, живі TLS-рукопотискання) та евристику великих мовних моделей. Вони **не становлять гарантії безпеки, дійсності чи відсутності ризику**. Нові фішингові сторінки з’являються швидше, ніж бази репутації встигають їх каталогізувати; електронний лист, який пройшов наші перевірки, може виявитися неактивним чи шахрайським; дійсний SSL-сертифікат не гарантує зміст сайту. Видавець прямо відмовляється від будь-якої відповідальності за будь-яку шкоду, спричинену фішинговим електронним листом, який Сервіс визнав безпечним, небезпечним посиланням, яке Сервіс не зміг ідентифікувати, транзакційним електронним листом, надісланим на адресу, яку Сервіс позначив як дійсну, чи будь-яким рішенням щодо безпеки, прийнятим на основі цих інструментів. Користувач несе одноосібну відповідальність за такі рішення."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Прийнятне використання",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви погоджуєтеся **не** використовувати Сервіс для:"
          },
          {
            "kind": "ul",
            "items": [
              "завантаження, обробки чи поширення контенту, який є незаконним у вашій країні чи у Франції;",
              "обробки файлів, щодо яких ви не володієте необхідними правами (охоронювані авторським правом твори без дозволу, персональні дані, до яких ви не маєте права обробляти, засекречена інформація);",
              "здійснення чи сприяння шахрайству, відмиванню грошей, фінансуванню тероризму чи будь-якої іншої злочинної діяльності;",
              "використання інструментів штучного інтелекту для гуманізації тексту, інших інструментів для роботи з текстом чи будь-якої іншої функції для плагіату, обману третьої сторони, маніпуляції системами оцінювання (академічними, рекрутинговими, рекламними мережами) у спосіб, що суперечить їхнім правилам, чи для введення в оману будь-яким чином, що порушує чинне законодавство;",
              "намагатися перевантажувати, зворотньо розробляти, збирати дані, зловживати лімітами швидкості чи іншим чином втручатися в роботу чи доступність Сервісу;",
              "обходити квоти, вимоги до оплати чи будь-які інші обмеження, що діють;",
              "створювати декілька облікових записів для збільшення лімітів безкоштовного рівня чи ділитися обліковим записом з більшою кількістю осіб, ніж дозволяє ваш тариф."
            ]
          },
          {
            "kind": "p",
            "text": "Ми можемо негайно призупинити або закрити ваш обліковий запис без попередження, якщо маємо достатні підстави вважати, що ви порушили цей розділ, без права на відшкодування будь-яких витрат."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ваш контент",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви зберігаєте всі права, титул та інтереси щодо файлів і тексту, які ви надсилаєте до Сервісу. Ви надаєте нам суворо обмежену, безоплатну, світову ліцензію на їх обробку виключно для надання запитаного вами інструменту. Ця ліцензія припиняється миттєво, як тільки результат повертається вам (інструменти з серверною обробкою) або не виникає взагалі (інструменти, що працюють лише у браузері, оскільки ваш файл до нас не надходить). Ми не заявляємо та не будемо заявляти права власності на ваш контент і не використовуватимемо його для навчання моделей штучного інтелекту."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Облікові записи",
        "blocks": [
          {
            "kind": "p",
            "text": "Вам має виповнитися шістнадцять (16) років, щоб створити обліковий запис. Ви несете відповідальність за конфіденційність своїх облікових даних та за будь-яку діяльність, що відбувається під вашим обліковим записом. Негайно повідомте нас на [security@konvertools.com](mailto:security@konvertools.com) про будь-яке підозрюване несанкціоноване використання."
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
              "**Тарифи**: Безкоштовний (€0), Pro (€12/місяць або €99/рік), Business (€39/місяць або €349/рік). Особливості та ліміти тарифів описані на нашій сторінці [Ціни](/pricing) на момент покупки. Ми залишаємо за собою право змінювати особливості тарифів із повідомленням за 30 днів.",
              "**Автоматичне поновлення**: щомісячні та річні підписки поновлюються автоматично з тією ж періодичністю до моменту скасування. Ви можете скасувати підписку в будь-який час через свій кабінет; скасування набуває чинності наприкінці поточного періоду оплати. Ви зберігаєте доступ до Сервісу до цієї дати.",
              "**Право на відмову (ЄС)**: відповідно до статті L. 221-28 Французького кодексу захисту прав споживачів, якщо ви активно використовуєте Сервіс протягом початкового 14-денного періоду відмови, ви прямо погоджуєтеся з негайним виконанням договору та відмовляєтеся від свого права на відмову. Якщо ви не використовували жодної платної функції, ви можете відмовитися протягом 14 днів, надіславши електронний лист на [billing@konvertools.com](mailto:billing@konvertools.com), і ми здійснимо повне повернення коштів протягом 14 днів.",
              "**Без часткового повернення коштів**: за межами вищеописаного сценарію відмови, вже сплачені за поточний період оплати кошти не повертаються.",
              "**Кредити**: API-кредити, придбані як одноразові пакети («Starter», «Growth», «Scale», «Studio»), **ніколи не закінчуються**. 300 кредитів, які автоматично надаються щомісяця користувачам тарифу Business, закінчуються наприкінці календарного місяця та **не повертаються**.",
              "**Зміна цін**: ми можемо змінювати ціни з повідомленням за 30 днів. Існуючі підписники зберігають свою поточну ціну до наступної дати поновлення.",
              "**Податок**: ціни вказано без ПДВ, де це застосовно. Stripe збирає та перераховує будь-який податок, який підлягає сплаті у вашій країні."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Публічний REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "Тариф Business надає публічний REST API, автентифікований за допомогою API-ключів, які ви генеруєте у своєму кабінеті. Використання API регулюється додатково такими умовами:"
          },
          {
            "kind": "ul",
            "items": [
              "**Ліміти швидкості**: 60 запитів на хвилину (для тарифу Pro з додатковими кредитами) або 120 запитів на хвилину (для тарифу Business). Постійне зловживання може призвести до тимчасового обмеження швидкості чи остаточного анулювання ключа.",
              "**Списання кредитів**: кожен запит до API списує кредити за тарифами, опублікованими в нашій [документації API](/api). Неуспішні запити (відповіді 5xx) не списують кредити.",
              "**Безпека ключів**: ви несете відповідальність за безпечне зберігання своїх API-ключів та їх зміну у разі компрометації. Ми можемо анулювати будь-який ключ у будь-який час, якщо підозрюємо зловживання.",
              "**Прийнятне використання сторонніми**: додатки, створені на основі нашого API, мають відповідати цим Умовам, включаючи розділ про прийнятне використання. Ви не повинні надавати нашим API-ключам кінцевих користувачів (натомість ліцензуйте свій сервіс)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Інтелектуальна власність",
        "blocks": [
          {
            "kind": "p",
            "text": "Назва, логотип, код, дизайн, документація, структура бази даних та агрегований контент Сервісу є виключною власністю Видавця та захищені французьким та міжнародним законодавством про інтелектуальну власність. Вам не надається жодної ліцензії, окрім тієї, що суворо необхідна для використання Сервісу за призначенням. Ви не можете відтворювати, змінювати, декомпілювати чи створювати похідні роботи Сервісу чи будь-якої його частини, окрім випадків, прямо дозволених чинним законодавством."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Відшкодування збитків",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви погоджуєтеся відшкодовувати Видавцю та захищати його від будь-яких претензій, збитків, шкоди, відповідальності, витрат чи витрат (включаючи розумні юридичні гонорари), що виникають через (a) ваше порушення цих Умов, (b) ваше порушення будь-якого закону чи прав третьої сторони, або (c) будь-який контент, який ви надіслали до Сервісу."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Зміни в Умовах",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми можемо періодично змінювати ці Умови. Істотні зміни буде повідомлено користувачам облікових записів електронною поштою щонайменше за тридцять (30) днів до набрання ними чинності. Продовжуючи використовувати Сервіс після цього періоду, ви приймаєте змінені Умови. Остання версія завжди доступна за адресою [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Припинення дії",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви можете закрити свій обліковий запис у будь-який час через свій кабінет. Ми можемо негайно закрити або призупинити ваш обліковий запис без попередження, якщо ви порушили ці Умови, зловживали Сервісом або не сплатили поточну підписку. Після закриття ваші дані видаляються протягом тридцяти (30) днів, окрім записів про оплату та згод, які зберігаються відповідно до нашої Політики конфіденційності."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Чинне законодавство та юрисдикція",
        "blocks": [
          {
            "kind": "p",
            "text": "Ці Умови регулюються законодавством Франції. Будь-які спори, що виникають у зв’язку з цими Умовами чи Сервісом, підлягають виключній юрисдикції судів Парижа, Франція, окрім випадків, коли обов’язкове право споживача на дію в країні його проживання переважає відповідно до законодавства Європейського Союзу чи національного законодавства. Перш ніж розпочинати юридичні дії, ви погоджуєтеся спробувати врегулювати спір мирним шляхом, надіславши лист на [legal@konvertools.com](mailto:legal@konvertools.com). Споживачі з ЄС також можуть скористатися платформою Європейської комісії з врегулювання онлайн-спорів за адресою [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Інше",
        "blocks": [
          {
            "kind": "p",
            "text": "Якщо будь-яку умову цих Умов буде визнано недійсною чи нездійсненною, інші положення залишаються в повній силі. Наше невиконання будь-якого права чи положення не є відмовою від цього права. Ці Умови (разом із Політикою конфіденційності та будь-якими специфічними умовами тарифів, на які посилаються під час покупки) становлять повну угоду між вами та Видавцем щодо Сервісу."
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
            "text": "Tyto Služební podmínky (dále jen „Podmínky“) tvoří závaznou dohodu mezi vámi (dále jen „Uživatel“) a vydavatelem služby Konvertools (dále jen „Vydavatel“, „my“, „nás“) týkající se vašeho používání webových stránek Konvertools a všech souvisejících nástrojů, API a služeb (dohromady dále jen „Služba“). Vytvořením účtu, zaškrtnutím políčka pro přijetí podmínek při registraci nebo pouhým použitím jakéhokoliv nástroje na Službě potvrzujete, že jste si tyto Podmínky přečetli, porozuměli jim a plně je přijímáte spolu s naší Zásadou ochrany osobních údajů."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Služba",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools poskytuje katalog nástrojů pro převody souborů, zpracování dokumentů a obrázků, nástroje s podporou AI, indikativní bezpečnostní nástroje (ověřovač e-mailů, detektor phishingu, skener URL, kontrola SSL certifikátů, kontrola prolomených hesel) a nástroje pro vývojáře. Většina nástrojů běží zcela ve vašem prohlížeči; některé vyžadují zpracování na serveru. Služba je poskytována **„tak jak je“** a **„tak jak je k dispozici“** bez jakékoliv záruky, ať už výslovné či implicitní, včetně záruk obchodovatelnosti, vhodnosti pro určitý účel nebo neporušování práv."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Omezení odpovědnosti — pozorně si přečtěte",
        "blocks": [
          {
            "kind": "p",
            "text": "**V maximální míře povolené zákonem Vydavatel odmítá jakoukoliv odpovědnost za škody jakéhokoliv druhu vzniklé v důsledku vašeho používání Služby nebo neschopnosti Službu používat.** Konkrétně uznáváte a souhlasíte s tím, že Vydavatel nebude odpovědný za:"
          },
          {
            "kind": "ul",
            "items": [
              "ztrátu dat, poškozené či nesprávné soubory nebo neúspěšné převody;",
              "rozhodnutí, finanční, obchodní či jiná, která učiníte na základě výstupu z jakéhokoliv nástroje;",
              "doby nečinnosti, latenci nebo dočasnou nedostupnost jakékoliv funkce;",
              "selhání služeb třetích stran (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, poskytovatelé hostingu);",
              "nepřímé, vedlejší, zvláštní, následné nebo trestné škody jakéhokoliv druhu;",
              "jakékoliv celkové částky převyšující poplatky, které jste nám skutečně zaplatili během dvanácti (12) měsíců předcházejících události, která dala vzniknout nároku, a to s horní hranicí sto (100) eur pro uživatele bez placeného tarifu."
            ]
          },
          {
            "kind": "p",
            "text": "**Bezpečnostní nástroje**: Skener URL, Detektor phishingu, Ověřovač e-mailů, Kontrola SSL certifikátů a Kontrola prolomených hesel jsou poskytovány **pouze pro informační a indikativní účely**. Tyto nástroje agregují signály třetích stran (Google Safe Browsing, veřejné DNS, HaveIBeenPwned, živé TLS handshaky) a heuristiky velkých jazykových modelů. **Nezaručují bezpečnost, platnost ani absenci rizika.** Nové phishingové stránky se objevují rychleji, než mohou databáze reputace zaznamenat; e-mail, který projde našimi kontrolami, může být stále neaktivní či podvodný; platný SSL certifikát nezaručuje obsah stránky. Vydavatel výslovně odmítá jakoukoliv odpovědnost za jakoukoliv újmu vzniklou v důsledku phishingového e-mailu, který Služba označila za bezpečný, nebezpečného odkazu, který Služba nezjistila, transakčního e-mailu odeslaného na adresu, kterou Služba označila za platnou, nebo jakéhokoliv bezpečnostního rozhodnutí učiněného na základě těchto nástrojů. Za taková rozhodnutí nese výhradní odpovědnost Uživatel."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Přípustné použití",
        "blocks": [
          {
            "kind": "p",
            "text": "Souhlasíte, že Službu **nebudete používat** k:"
          },
          {
            "kind": "ul",
            "items": [
              "nahrávání, zpracování nebo distribuci obsahu, který je v vaší jurisdikci či ve Francii nelegální;",
              "zpracování souborů, k jejichž zpracování nemáte potřebná práva (autorskoprávně chráněná díla bez souhlasu, osobní údaje, ke kterým nemáte oprávnění, utajované informace);",
              "páchání či usnadňování podvodu, praní špinavých peněz, financování terorismu nebo jakékoliv trestné činnosti;",
              "používání nástrojů pro humanizaci AI, nástrojů pro texty s podporou AI či jakékoliv jiné funkce k plagiátorství, k podvodu třetí strany, k manipulaci s hodnocovacími systémy (akademickými, náborovými, reklamními sítěmi) v rozporu s jejich pravidly, nebo k jakékoliv formě klamání, která porušuje platné zákony;",
              "pokusům o přetížení, reverznímu inženýrství, scrapování, zneužívání limitů rychlosti nebo jinému zasahování do provozu či dostupnosti Služby;",
              "obcházení kvót, platebních požadavků či jakýchkoliv jiných omezení;",
              "vytváření více účtů za účelem násobení kvót bezplatného tarifu nebo sdílení jednoho účtu mezi více osobami, než umožňuje váš tarif."
            ]
          },
          {
            "kind": "p",
            "text": "Můžeme váš účet okamžitě a bez předchozího upozornění pozastavit či ukončit, pokud máme oprávněné důvody domnívat se, že jste toto ustanovení porušili, a to bez nároku na jakoukoliv refundaci."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Váš obsah",
        "blocks": [
          {
            "kind": "p",
            "text": "Všechna práva, vlastnictví a oprávnění k souborům a textům, které do Služby vložíte, zůstávají nadále ve vašem vlastnictví. Udělujete nám striktně omezenou, bezúplatnou, celosvětovou licenci k jejich zpracování výhradně za účelem poskytnutí nástroje, který jste požadovali. Tato licence zaniká okamžitě poté, co je vám výsledek vrácen (nástroje využívající server) nebo nikdy nevzniká (nástroje běžící pouze v prohlížeči, jelikož váš soubor k nám nikdy nedorazí). Netvrdíme si vlastnictví vašeho obsahu ani jej nebudeme používat k trénování AI modelů."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Účty",
        "blocks": [
          {
            "kind": "p",
            "text": "Pro vytvoření účtu musíte být starší šestnácti (16) let. Jste odpovědní za utajení svých přihlašovacích údajů a za jakoukoli činnost, která proběhne pod vaším účtem. Okamžitě nás informujte na adrese [security@konvertools.com](mailto:security@konvertools.com) o jakémkoliv podezření na neoprávněný přístup."
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
              "**Tarify**: Bezplatný (€0), Pro (€12/měsíc nebo €99/rok), Business (€39/měsíc nebo €349/rok). Funkce a kvóty tarifů jsou popsány na naší stránce [Ceník](/pricing) v době nákupu. Vyhrazujeme si právo měnit funkce tarifů s 30denním předchozím oznámením.",
              "**Automatické prodloužení**: měsíční a roční předplatné se automaticky prodlužují ve stejné frekvenci, dokud nejsou zrušena. Můžete je zrušit kdykoliv z vašeho profilu; zrušení nabývá účinnosti na konci aktuálního fakturačního období. Přístup si ponecháte až do tohoto data.",
              "**Právo na odstoupení (EU)**: podle článku L. 221-28 francouzského spotřebitelského zákoníku, pokud aktivně používáte Službu během počátečního 14denního období pro odstoupení, výslovně souhlasíte s okamžitým plněním smlouvy a vzdáváte se svého práva na odstoupení. Pokud jste nepoužili žádnou placenou funkci, můžete odstoupit do 14 dnů zasláním e-mailu na adresu [billing@konvertools.com](mailto:billing@konvertools.com) a my vám do 14 dnů vydáme plnou refundaci.",
              "**Žádné částečné refundace**: mimo výše uvedený scénář pro odstoupení nejsou již zaplacené poplatky za aktuální fakturační období refundovatelné.",
              "**Kredity**: API kredity zakoupené jako jednorázové balíčky („Starter“, „Growth“, „Scale“, „Studio“) **nikdy nevyprší**. 300 kreditů automaticky přidělovaných každý měsíc uživatelům tarifu Business vyprší na konci kalendářního měsíce a **nejsou refundovatelné**.",
              "**Změny cen**: můžeme ceny změnit s 30denním předchozím oznámením. Stávající předplatitelé si ponechávají svou aktuální cenu až do dalšího data obnovy.",
              "**Daň**: ceny jsou uváděny bez DPH, kde je to relevantní. Společnost Stripe vybírá a odvádí veškeré daně ve vaší jurisdikci."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Veřejné REST API",
        "blocks": [
          {
            "kind": "p",
            "text": "Tarif Business poskytuje veřejné REST API, které je autentizováno pomocí API klíčů, které si generujete ve svém profilu. Použití API je dále upraveno následujícími body:"
          },
          {
            "kind": "ul",
            "items": [
              "**Limity rychlosti**: 60 požadavků za minutu (doplněk tarifu Pro) nebo 120 požadavků za minutu (tarif Business). Trvalé zneužívání může vést k dočasnému omezování nebo trvalému odebrání klíče.",
              "**Spotřeba kreditů**: každé volání API odečte kredity podle sazeb zveřejněných v naší [dokumentaci k API](/api). Neúspěšná volání (5xx odpovědi) neodečítají kredity.",
              "**Zabezpečení klíčů**: jste odpovědní za bezpečné uložení svých API klíčů a jejich rotaci v případě kompromitace. Můžeme kdykoliv odebrat jakýkoliv klíč, pokud máme podezření na zneužití.",
              "**Přípustné použití v aplikacích**: aplikace postavené na našem API musí dodržovat tyto Podmínky, včetně části o přípustném použití. Nesmíte vystavovat naše API klíče koncovým uživatelům (místo toho poskytněte licenci své služby)."
            ]
          }
        ]
      },
      {
        "id": "ip",
        "title": "9. Duševní vlastnictví",
        "blocks": [
          {
            "kind": "p",
            "text": "Název, logo, kód, design, dokumentace, struktura databáze a agregovaný obsah Služby jsou výhradním vlastnictvím Vydavatele a jsou chráněny francouzskými a mezinárodními zákony o duševním vlastnictví. Uděluje se vám pouze licence nezbytná k používání Služby tak, jak je zamýšleno. Nesmíte reprodukovat, upravovat, dekompilovat ani vytvářet odvozená díla ze Služby či její části, ledaže by to bylo výslovně povoleno platnými zákony."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnifikace",
        "blocks": [
          {
            "kind": "p",
            "text": "Souhlasíte, že budete Vydavatele chránit a uhradíte mu jakýkoliv nárok, ztrátu, škodu, odpovědnost, náklady či výdaje (včetně přiměřených právních poplatků) vzniklé v důsledku (a) vašeho porušení těchto Podmínek, (b) vašeho porušení jakéhokoliv zákona či práv třetí strany, nebo (c) jakéhokoliv obsahu, který jste do Služby vložili."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Změny Podmínek",
        "blocks": [
          {
            "kind": "p",
            "text": "Můžeme tyto Podmínky občas měnit. Podstatné změny budou oznámeny e-mailem držitelům účtů alespoň třicet (30) dní před jejich nabytím účinnosti. Pokračováním v používání Služby po uplynutí tohoto období přijímáte změněné Podmínky. Nejnovější verze je vždy k dispozici na adrese [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Ukončení",
        "blocks": [
          {
            "kind": "p",
            "text": "Můžete svůj účet kdykoliv ukončit z vašeho profilu. Můžeme váš účet okamžitě ukončit či pozastavit, pokud porušíte tyto Podmínky, zneužijete Službu nebo nezaplatíte opakující se předplatné. Po ukončení jsou vaše data smazána do třiceti (30) dnů, s výjimkou fakturačních a souhlasových záznamů, které jsou uchovány v souladu s naší Zásadou ochrany osobních údajů."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Působnost práva a příslušnost",
        "blocks": [
          {
            "kind": "p",
            "text": "Tyto Podmínky se řídí právem Francie. Jakýkoliv spor vzniklý v souvislosti s těmito Podmínkami nebo Službou bude podroben výlučné příslušnosti soudů v Paříži ve Francii, s výjimkou případů, kdy právo spotřebitele v zemi jeho bydliště stanoví jinak podle práva Evropské unie či národních právních předpisů. Před zahájením právních kroků se dohodnete, že se pokusíte spor řešit přátelsky zasláním zprávy na adresu [legal@konvertools.com](mailto:legal@konvertools.com). Spotřebitelé z EU mohou také využít platformu pro řešení sporů Evropské komise na adrese [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Různé",
        "blocks": [
          {
            "kind": "p",
            "text": "Pokud je jakékoliv ustanovení těchto Podmínek shledáno neplatným či nevymahatelným, zbytek ustanovení zůstává v plném rozsahu účinný. Naše nevykonání či neuplatnění jakéhokoliv práva či ustanovení není zřeknutím se tohoto práva. Tyto Podmínky (spolu se Zásadou ochrany osobních údajů a případnými tarifními podmínkami uvedenými při nákupu) tvoří celou dohodu mezi vámi a Vydavatelem týkající se Služby."
          }
        ]
      }
    ]
  }
};
