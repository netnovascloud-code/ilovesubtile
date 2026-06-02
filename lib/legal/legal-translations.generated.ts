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
              "**Outils fonctionnant uniquement dans le navigateur** (convertisseurs d'images, outils PDF utilisant pdf-lib, conversions audio et vidéo via FFmpeg.wasm, outils de code, calculatrices, générateurs de QR, la plupart des utilitaires) s'exécutent **entièrement dans votre navigateur web via WebAssembly**. Votre fichier n'est jamais transmis à nos serveurs. Nous n'avons aucun moyen technique de le lire.",
              "**Outils assistés par serveur** (transcription IA, traduction IA, tâches textuelles IA, incrustation de sous-titres vidéo, le scanner de virus, le scanner d'URL, le détecteur de phishing et quelques autres) nécessitent d'envoyer certaines données vers un backend. Dans tous les cas, le fichier ou le texte est traité en temps réel et soit (a) supprimé du stockage temporaire dans les trente (30) minutes, soit (b) — pour le scanner de virus — jamais transmis (seul le hachage SHA-256 du fichier quitte votre appareil).",
              "Nous ne stockons jamais le contenu d'un fichier téléchargé dans un emplacement persistant, nous n'utilisons jamais vos téléchargements pour entraîner des modèles d'IA, et nous ne vendons, louons ou partageons vos données avec des tiers à quelque fin que ce soit, sauf pour vous fournir le résultat que vous avez demandé."
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
            "text": "Aux fins du Règlement général sur la protection des données (RGPD, Règlement (UE) 2016/679), le responsable du traitement des données est l'éditeur du Service. Pour toute question relative à la confidentialité : [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Identifiants de compte** : votre adresse e-mail ; une copie hachée et salée de votre mot de passe (gérée par Supabase Auth — nous ne voyons ni ne stockons le mot de passe en clair) ; un nom d'affichage et une URL d'avatar optionnels si vous vous connectez avec Google.",
              "**État de l'abonnement** : plan actuel (gratuit / Pro / Business), identifiant client Stripe, solde de crédit actuel, et les dates de vos renouvellements les plus récents.",
              "**Compteurs d'utilisation** : compteurs de quota agrégés (par exemple, « 3 exécutions IA utilisées aujourd'hui », « 420 exécutions IA mensuelles utilisées ») mis à jour directement sur votre profil. Nous **ne conservons pas** de registres par exécution.",
              "**Métadonnées des tâches (transitoires)** : lorsqu'un outil assisté par serveur produit un résultat (par exemple, un fichier .srt issu d'une transcription), nous enregistrons le nom de l'outil, l'URL de téléchargement du résultat, la langue source et un horodatage de fin. Ces lignes sont purgées automatiquement après **deux (2) heures**. Elles ne contiennent jamais le contenu de votre fichier.",
              "**Enregistrements de consentement** : la date et l'heure auxquelles vous avez accepté ces Conditions et notre Politique de confidentialité, ainsi que votre choix d'opter pour les e-mails marketing. Conservés pendant la durée de votre compte plus une période probatoire légale de cinq (5) ans après la suppression.",
              "**Clés API** : si vous générez des clés pour l'API REST publique, nous ne stockons que le hachage SHA-256 et un préfixe d'affichage de 12 caractères. La clé brute vous est affichée une seule fois lors de sa création et ne peut plus être récupérée par la suite."
            ]
          },
          {
            "kind": "p",
            "text": "Nous **ne collectons pas** : votre adresse IP (au-delà de l'utilisation temporaire que Supabase et notre hébergeur en font pour la limitation de débit et la journalisation de sécurité), votre empreinte de navigateur, des événements de suivi comportemental, vos enregistrements d'écran ou toute donnée biométrique."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Fichiers que vous traitez",
        "blocks": [
          {
            "kind": "p",
            "text": "Comme indiqué dans la section 1, le contenu des fichiers que vous traitez n'est jamais conservé par nos soins. Le cycle de vie précis est le suivant :"
          },
          {
            "kind": "ul",
            "items": [
              "**Outils fonctionnant uniquement dans le navigateur** : aucune transmission. Le fichier est lu en mémoire par votre navigateur, le résultat est produit localement, et vous le téléchargez directement. Nous n'enregistrons rien concernant le fichier lui-même.",
              "**Transcription / traduction / OCR / analyse de phishing IA** : le fichier ou le texte est envoyé en flux continu à notre fonction Edge Supabase, qui le transmet immédiatement au fournisseur d'IA concerné (voir section 7) pour inférence. Le résultat vous est retourné et le tampon de téléchargement temporaire est supprimé. Les fichiers de résultat écrits dans notre compartiment de stockage privé sont accessibles via une URL signée pendant soixante (60) minutes et physiquement purgés dans les trente (30) minutes suivant leur génération.",
              "**Scanner de virus** : votre fichier ne quitte jamais votre navigateur. Nous calculons localement son empreinte SHA-256 et n'envoyons que le hachage de 64 caractères à VirusTotal. VirusTotal ne peut pas reconstruire votre fichier à partir de son hachage.",
              "**Scanner d'URL** : seule la chaîne d'URL que vous saisissez est transmise à Google Safe Browsing. Aucun contenu de page environnant."
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
              "**Intérêts légitimes** (Art. 6(1)(f)) — prévention de la fraude, atténuation des abus, journalisation de sécurité de base et amélioration du Service.",
              "**Consentement** (Art. 6(1)(a)) — e-mails marketing, cookies analytiques ou publicitaires optionnels (le cas échéant), et toute future intégration optionnelle.",
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
            "text": "Vous bénéficiez des droits d'accès (Art. 15), de rectification (Art. 16), d'effacement (Art. 17), de limitation (Art. 18), de portabilité (Art. 20), d'opposition (Art. 21) et de retrait de votre consentement à tout moment sans que cela n'affecte la légalité des traitements antérieurs. Vous avez également le droit de déposer une réclamation auprès de la CNIL (France) ou de l'autorité de protection des données de votre pays de résidence. Pour exercer l'un de ces droits, envoyez un e-mail à [privacy@konvertools.com](mailto:privacy@konvertools.com) depuis l'adresse enregistrée sur votre compte. Nous répondrons dans les trente (30) jours, conformément à l'Art. 12(3) du RGPD."
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
              "**Supabase** (société enregistrée à Singapour, hébergée dans l'UE pour notre projet) — authentification, base de données, stockage de fichiers et fonctions Edge. Reçoit vos identifiants de compte, vos données de profil et (de manière transitoire) tout fichier que vous téléchargez pour un outil assisté par serveur. Agit en tant que sous-traitant.",
              "**Mistral AI** (France) — inférence de modèles de langage pour la traduction, la reformulation, la synthèse, l'humanisation de texte IA, l'analyse de motifs de phishing et autres tâches textuelles ; transcription audio (Voxtral) ; OCR et tâches de vision par IA (Pixtral). Le texte ou l'image que vous soumettez est envoyé à Mistral pour inférence. Mistral s'est engagé contractuellement à **ne pas utiliser** les entrées de l'API pour entraîner ses modèles.",
              "**VirusTotal** (Google LLC, États-Unis) — uniquement lorsque vous utilisez le Scanner de virus. Seule la somme de contrôle SHA-256 de votre fichier est transmise, jamais le fichier lui-même.",
              "**Google Safe Browsing** (Google LLC, États-Unis) — uniquement lorsque vous utilisez le Scanner d'URL ou le Détecteur de phishing. Seules les URL que vous soumettez (ou les liens extraits du texte que vous collez) sont transmises.",
              "**Stripe** (États-Unis / Irlande) — traitement des paiements et gestion des abonnements. Nous **ne voyons ni ne stockons** les détails de votre carte. Stripe reçoit votre adresse e-mail, votre méthode de paiement et le plan/pack de crédits que vous avez acheté.",
              "**Resend** (États-Unis) — envoi d'e-mails transactionnels (confirmation de compte, reçus de paiement, réinitialisation de mot de passe). Reçoit votre adresse e-mail et le corps de l'e-mail que nous envoyons.",
              "**Vercel** (États-Unis) — réseau de diffusion de contenu pour les pages statiques. Reçoit des métadonnées standard de trafic web (IP, user-agent, URL demandée) pour le routage et la prévention des abus. Conservées conformément à la politique de rétention des logs de Vercel."
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
              "**Publicitaires optionnels** : si et lorsque nous activons des partenaires publicitaires (Ezoic est actuellement référencé dans notre code mais non activé pour votre trafic), nous afficherons une bannière de consentement claire et ne définirons des cookies publicitaires qu'après votre accord."
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
            "text": "Tout le trafic vers et depuis le Service est chiffré avec TLS 1.2 ou supérieur. Les mots de passe sont stockés sous forme de hachages Argon2 par Supabase Auth. Nous vérifions les nouveaux mots de passe côté client contre l'API publique HaveIBeenPwned (méthode k-anonymity), de sorte qu'un mot de passe connu pour avoir été compromis ne peut pas être utilisé. Les clés API sont stockées uniquement sous forme de hachages SHA-256. Les lignes de la base de données sont protégées par des politiques de sécurité au niveau des lignes qui garantissent qu'un utilisateur ne peut pas lire les données d'un autre utilisateur. Malgré ces mesures, aucun système n'est parfaitement sécurisé ; vous acceptez le risque résiduel inhérent à tout service en ligne."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Conservation des données",
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
            "text": "Nous pouvons modifier cette Politique de confidentialité à tout moment. Les changements substantiels seront annoncés par e-mail aux détenteurs de compte au moins trente (30) jours avant leur entrée en vigueur. La dernière version est toujours disponible à l'adresse [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contact",
        "blocks": [
          {
            "kind": "p",
            "text": "Pour toute question concernant cette politique ou vos données, écrivez à [privacy@konvertools.com](mailto:privacy@konvertools.com). Vous pouvez également déposer une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL, [cnil.fr](https://www.cnil.fr/)) ou auprès de l'autorité de protection des données de votre pays de résidence."
          }
        ]
      }
    ]
  },
  "es": {
    "h1": "Política de privacidad",
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
              "**Herramientas solo en el navegador** (convertidores de imágenes, herramientas de PDF que usan pdf-lib, conversiones de audio y vídeo con FFmpeg.wasm, herramientas de código, calculadoras, generadores de códigos QR, la mayoría de las utilidades) se ejecutan **completamente dentro de tu navegador web mediante WebAssembly**. Tu archivo nunca se transmite a nuestros servidores. No tenemos medios técnicos para leerlo.",
              "**Herramientas con asistencia de servidor** (transcripción con IA, traducción con IA, tareas de texto con IA, incrustación de subtítulos en vídeo, el escáner de virus, el escáner de URLs, el detector de phishing y algunas otras) necesitan enviar algo a un backend. En todos los casos, el archivo o texto se procesa en tiempo real y, o bien (a) se elimina del almacenamiento temporal en un plazo de treinta (30) minutos, o bien (b) —en el caso del escáner de virus— nunca se transmite (solo sale de tu dispositivo el hash SHA-256 del archivo).",
              "Nunca almacenamos el contenido de ningún archivo subido en una ubicación persistente, no utilizamos tus subidas para entrenar modelos de IA, ni vendemos, alquilamos ni compartimos tus archivos con terceros para ningún fin distinto al de entregarte el resultado que solicitaste."
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
              "**Credenciales de cuenta**: tu dirección de correo electrónico; una copia con sal y hash de tu contraseña (gestionada por Supabase Auth — nunca vemos ni almacenamos el texto en claro); nombre de visualización opcional y URL del avatar si inicias sesión con Google.",
              "**Estado de suscripción**: plan actual (gratis / Pro / Business), identificador de cliente de Stripe, saldo de crédito actual y las fechas de tus renovaciones más recientes.",
              "**Contadores de uso**: contadores agregados de cuota (por ejemplo, \"3 ejecuciones de IA usadas hoy\", \"420 ejecuciones de IA usadas este mes\") actualizados en tu fila de perfil. **No registramos** registros por ejecución.",
              "**Metadatos de trabajos (transitorios)**: cuando una herramienta con asistencia de servidor produce un resultado (por ejemplo, un archivo .srt de transcripción), registramos el nombre de la herramienta, la URL de descarga del resultado, el idioma de origen y una marca de tiempo de finalización. Estas filas se purgan automáticamente después de **dos (2) horas**. Nunca contienen el contenido de tu archivo.",
              "**Registros de consentimiento**: la fecha y hora en que aceptaste estos Términos y nuestra Política de privacidad, y si optaste por recibir correos electrónicos de marketing. Se conservan durante la duración de tu cuenta más un período de cinco (5) años después de su eliminación como prueba legal.",
              "**Claves de API**: si generas claves para la API REST pública, almacenamos solo el hash SHA-256 y un prefijo de visualización de 12 caracteres. La clave en texto claro se muestra una sola vez en el momento de su creación y, a partir de entonces, no es recuperable."
            ]
          },
          {
            "kind": "p",
            "text": "**No recopilamos**: tu dirección IP (más allá del uso temporal que Supabase y nuestro proveedor de alojamiento hacen de ella para limitación de velocidad y registros de seguridad), tu huella digital del navegador, eventos de seguimiento conductual, grabaciones de pantalla ni ningún dato biométrico."
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
              "**Herramientas solo en el navegador**: cero transmisión. El archivo se lee en la memoria de tu navegador, se produce el resultado localmente y lo descargas directamente. No registramos nada sobre el archivo en sí.",
              "**Transcripción/tradución con IA / OCR / análisis de phishing**: el archivo o texto se envía en tiempo real a nuestra función Edge de Supabase, que lo reenvía inmediatamente al proveedor de IA correspondiente (consulta la sección 7) para su inferencia. El resultado se devuelve a ti y el búfer de subida temporal se descarta. Los archivos de resultado escritos en nuestro bucket de almacenamiento privado son accesibles mediante URL firmada durante sesenta (60) minutos y se eliminan físicamente en un plazo de treinta (30) minutos tras su generación.",
              "**Escáner de virus**: tu archivo nunca abandona tu navegador. Calculamos su huella SHA-256 localmente y solo enviamos el hash resultante de 64 caracteres a VirusTotal. VirusTotal no puede reconstruir tu archivo a partir de su hash.",
              "**Escáner de URLs**: solo se transmite la cadena de URL que escribes a Google Safe Browsing. No se transmiten los contenidos de la página circundante."
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
              "**Ejecución de un contrato** (Art. 6(1)(b)) — cuando creas una cuenta y usas funciones de pago, el tratamiento es necesario para prestar el Servicio.",
              "**Intereses legítimos** (Art. 6(1)(f)) — prevención de fraudes, mitigación de abusos, registros básicos de seguridad y mejora del Servicio.",
              "**Consentimiento** (Art. 6(1)(a)) — correos electrónicos de marketing, cookies analíticas o publicitarias opcionales (si y cuando se activen), y cualquier integración opcional futura.",
              "**Obligación legal** (Art. 6(1)(c)) — conservación de registros de facturación según lo exige la ley fiscal francesa (normalmente diez años)."
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
              "**Supabase** (constituida en Singapur, alojada en la UE para nuestro proyecto) — autenticación, base de datos, almacenamiento de archivos y funciones Edge. Recibe tus credenciales de cuenta, datos de perfil y (de forma transitoria) cualquier archivo que subas para una herramienta con asistencia de servidor. Actúa como nuestro subprocesador.",
              "**Mistral AI** (Francia) — inferencia de modelos de lenguaje para traducción, reformulación, resumen, humanización de texto con IA, análisis de patrones de phishing y otras tareas de texto; transcripción de audio (Voxtral); OCR e tareas de visión por imagen (Pixtral). El texto o imagen que envíes se envía a Mistral para su inferencia. Mistral se ha comprometido contractualmente a **no usar las entradas de la API para entrenar sus modelos**.",
              "**VirusTotal** (Google LLC, EE. UU.) — solo cuando usas el Escáner de virus. Solo se transmite el hash SHA-256 de tu archivo, nunca el archivo en sí.",
              "**Google Safe Browsing** (Google LLC, EE. UU.) — solo cuando usas el Escáner de URLs o el Detector de phishing. Solo se transmiten las URLs que escribes (o los enlaces extraídos del correo que pegues).",
              "**Stripe** (EE. UU. / Irlanda) — procesamiento de pagos y gestión de suscripciones. **Nunca vemos ni almacenamos** los detalles de tu tarjeta. Stripe recibe tu correo electrónico, método de pago y el plan/paquete de crédito que compraste.",
              "**Resend** (EE. UU.) — envío de correos electrónicos transaccionales (confirmación de cuenta, recibos de pago, restablecimiento de contraseña). Recibe tu dirección de correo electrónico y el cuerpo del correo que enviamos.",
              "**Vercel** (EE. UU.) — red de distribución de contenido para páginas estáticas. Recibe metadatos estándar de tráfico web (IP, agente de usuario, URL solicitada) para enrutamiento y prevención de abusos. Se mantiene conforme a la política de retención de registros de Vercel."
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
              "**Esenciales**: NEXT_LOCALE (recuerda el idioma elegido), y cookies de sesión de Supabase (sb-*-auth-token) cuando inicias sesión. Estas no requieren consentimiento según el GDPR.",
              "**Publicidad opcional**: si y cuando activemos socios publicitarios (actualmente Ezoic está referenciado en nuestro código pero no está activado para tu tráfico), mostraremos un banner de consentimiento claro y solo estableceremos cookies publicitarias una vez que optes por aceptarlas."
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
            "text": "Todo el tráfico hacia y desde el Servicio está cifrado con TLS 1.2 o superior. Las contraseñas se almacenan como hashes Argon2 por Supabase Auth. Comprobamos las nuevas contraseñas contra la API pública de HaveIBeenPwned (k-anonimato) en el lado del cliente, por lo que no se puede usar una contraseña conocida como comprometida. Las claves de API se almacenan solo como hashes SHA-256. Las filas de la base de datos están protegidas por políticas de seguridad a nivel de fila que garantizan que un usuario no pueda leer los datos de otro. A pesar de estas medidas, ningún sistema es perfectamente seguro; aceptas el riesgo residual inherente a cualquier servicio en línea."
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
              "Metadatos de trabajos: se purgarán automáticamente después de dos (2) horas.",
              "Archivos de resultado en el bucket de almacenamiento: se eliminan físicamente en un plazo de treinta (30) minutos tras su generación.",
              "Registros de facturación: se conservan durante diez (10) años para cumplir con las obligaciones fiscales francesas.",
              "Registros de consentimiento: se conservan durante la duración de tu cuenta más cinco (5) años adicionales como prueba legal."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Menores",
        "blocks": [
          {
            "kind": "p",
            "text": "El Servicio **no va dirigido a menores de dieciséis (16) años**. Si tienes menos de esa edad, no debes crear una cuenta. No recopilamos datos de menores de forma intencional; si tomamos conocimiento de que lo hemos hecho, los eliminaremos."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Cambios en esta política",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos modificar esta Política de privacidad en cualquier momento. Los cambios sustanciales se anunciarán por correo electrónico a los titulares de cuentas al menos treinta (30) días antes de que entren en vigor. La versión más reciente siempre está disponible en [https://konvertools.com/privacy](https://konvertools.com/privacy)."
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
            "text": "O **Konvertools** (o \"Serviço\") é operado como um conjunto de ferramentas com foco em privacidade. O compromisso mais importante que assumimos é este:"
          },
          {
            "kind": "ul",
            "items": [
              "As ferramentas **exclusivamente para navegador** (conversores de imagem, ferramentas de PDF que utilizam o pdf-lib, conversões de áudio e vídeo com o FFmpeg.wasm, ferramentas de código, calculadoras, geradores de QR, a maioria das utilidades) são executadas **inteiramente dentro do seu navegador web por meio do WebAssembly**. Seu arquivo nunca é transmitido aos nossos servidores. Não possuímos meios técnicos para lê-lo.",
              "As ferramentas **assistidas por servidor** (transcrição por IA, tradução por IA, tarefas de texto por IA, inserção de legendas em vídeos, o scanner de vírus, o scanner de URLs, o detector de phishing e um pequeno número de outras) precisam enviar algo a um backend. Em todos os casos, o arquivo ou texto é processado em tempo real e, em seguida, (a) excluído do armazenamento temporário em até trinta (30) minutos, ou (b) — no caso do scanner de vírus — nunca é transmitido (apenas o hash SHA-256 do arquivo deixa o seu dispositivo).",
              "Nunca armazenamos o conteúdo de nenhum arquivo carregado em local persistente, não utilizamos seus uploads para treinar modelos de IA e nunca vendemos, alugamos ou compartilhamos seus dados com terceiros para qualquer finalidade além de entregar o resultado que você solicitou."
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
              "**Credenciais de conta**: seu endereço de e-mail; uma cópia salgada e criptografada da sua senha (gerenciada pelo Supabase Auth — nunca vemos ou armazenamos o texto simples); nome de exibição e URL do avatar opcionais, caso você faça login com o Google.",
              "**Estado da assinatura**: plano atual (gratuito / Pro / Business), identificador do cliente no Stripe, saldo de crédito atual e as datas das suas renovações mais recentes.",
              "**Contadores de uso**: contadores agregados de cota (ex.: \"3 execuções de IA usadas hoje\", \"420 execuções de IA mensais usadas\") atualizados no seu perfil. **Não registramos registros por execução**.",
              "**Metadados de tarefas (transitórios)**: quando uma ferramenta assistida por servidor produz um resultado (ex.: um arquivo .srt de transcrição), registramos o nome da ferramenta, a URL de download do resultado, o idioma de origem e um carimbo de data/hora de conclusão. Essas linhas são removidas automaticamente após **duas (2) horas**. Elas nunca contêm o conteúdo do seu arquivo.",
              "**Registros de consentimento**: a data e hora em que você aceitou estes Termos e nossa Política de Privacidade, e se optou por receber e-mails de marketing. Mantidos durante a duração da sua conta mais um período de evidência legal de cinco (5) anos após a exclusão.",
              "**Chaves de API**: caso você gere chaves para a API REST pública, armazenamos apenas o hash SHA-256 e um prefixo de exibição de 12 caracteres. A chave bruta é exibida a você exatamente uma vez no momento da criação e não pode ser recuperada posteriormente."
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
              "**Ferramentas exclusivas para navegador**: nenhuma transmissão. O arquivo é lido na memória pelo seu navegador, o resultado é produzido localmente e você o baixa diretamente. Não registramos nada sobre o arquivo em si.",
              "**Transcrição / tradução / OCR / análise de phishing por IA**: o arquivo ou texto é transmitido para nossa Edge Function do Supabase, que o encaminha imediatamente ao respectivo provedor de IA (consulte a seção 7) para inferência. O resultado é retornado a você e o buffer de upload temporário é descartado. Os arquivos de resultado gravados no nosso bucket de armazenamento privado são acessíveis por meio de URLs assinadas por sessenta (60) minutos e fisicamente removidos em até trinta (30) minutos após a geração.",
              "**Scanner de vírus**: seu arquivo nunca sai do navegador. Calculamos localmente a impressão digital SHA-256 do arquivo e enviamos apenas o hash de 64 caracteres resultante ao VirusTotal. O VirusTotal não pode reconstruir o seu arquivo a partir do hash.",
              "**Scanner de URLs**: apenas a string de URL que você digita é transmitida ao Google Safe Browsing. Nenhum conteúdo da página circundante."
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
              "**Interesses legítimos** (Art. 6(1)(f)) — prevenção de fraudes, mitigação de abusos, registro básico de segurança e melhoria do Serviço.",
              "**Consentimento** (Art. 6(1)(a)) — e-mails de marketing, cookies analíticos ou de publicidade opcionais (se e quando ativados) e qualquer integração opcional futura.",
              "**Obrigação legal** (Art. 6(1)(c)) — retenção de registros contábeis conforme exigido pela legislação tributária francesa (geralmente dez anos)."
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
            "text": "Você tem os direitos de acesso (Art. 15), retificação (Art. 16), eliminação (Art. 17), limitação (Art. 18), portabilidade (Art. 20), objeção (Art. 21) e de retirar o consentimento a qualquer momento sem afetar a legalidade do processamento anterior. Você também tem o direito de apresentar uma reclamação à CNIL (França) ou à autoridade supervisora do seu país de residência. Para exercer qualquer direito, envie um e-mail para [privacy@konvertools.com](mailto:privacy@konvertools.com) a partir do endereço registrado na sua conta. Responderemos em até trinta (30) dias, conforme exigido pelo GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Processadores de terceiros",
        "blocks": [
          {
            "kind": "p",
            "text": "Para fornecer o Serviço, precisamos compartilhar dados estritamente limitados com os seguintes processadores. Cada um possui sua própria política de privacidade que rege como eles lidam com os dados que recebem de nós."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (incorporada em Singapura, hospedada na UE para o nosso projeto) — autenticação, banco de dados, armazenamento de arquivos e Edge Functions. Recebe suas credenciais de conta, dados de perfil e (transitoriamente) qualquer arquivo que você carregue para uma ferramenta assistida por servidor. Atua como nosso sub-processador.",
              "**Mistral AI** (França) — inferência de modelos de linguagem de grande porte para tradução, reformulação, sumarização, humanização de texto por IA, análise de padrões de phishing e outras tarefas de texto; transcrição de áudio (Voxtral); tarefas de OCR e Visão de imagem (Pixtral). O texto ou imagem que você submete é enviado à Mistral para inferência. A Mistral comprometeu-se contratualmente a **não utilizar as entradas da API para treinar seus modelos**.",
              "**VirusTotal** (Google LLC, EUA) — apenas quando você utiliza o Scanner de Vírus. Apenas o hash SHA-256 do seu arquivo é transmitido, nunca o arquivo em si.",
              "**Google Safe Browsing** (Google LLC, EUA) — apenas quando você utiliza o Scanner de URLs ou o Detector de Phishing. Apenas as URLs que você submete (ou links extraídos do e-mail que você cola) são transmitidas.",
              "**Stripe** (EUA / Irlanda) — processamento de pagamentos e gerenciamento de assinaturas. **Nunca vemos ou armazenamos** os detalhes do seu cartão. O Stripe recebe seu e-mail, método de pagamento e o plano/pacote de crédito que você comprou.",
              "**Resend** (EUA) — entrega de e-mails transacionais (confirmação de conta, recibos de pagamento, redefinição de senha). Recebe seu endereço de e-mail e o corpo do e-mail que enviamos.",
              "**Vercel** (EUA) — rede de distribuição de conteúdo para páginas estáticas. Recebe metadados padrão de tráfego web (IP, user-agent, URL solicitada) para roteamento e prevenção de abusos. Mantidos de acordo com a política de retenção de logs da Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Quando algum desses processadores opera fora do Espaço Econômico Europeu, as transferências são regidas pelas Cláusulas Contratuais Padrão (SCCs) da Comissão Europeia ou por um mecanismo de transferência equivalente."
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
              "**Essenciais**: NEXT_LOCALE (lembra o idioma escolhido) e cookies de sessão do Supabase (sb-*-auth-token) quando você está conectado. Estes não exigem consentimento conforme o GDPR.",
              "**Publicidade opcional**: se e quando ativarmos parceiros de anúncios (atualmente o Ezoic está referenciado no nosso código, mas ainda não ativado para o seu tráfego), exibiremos um banner claro de consentimento e só definiremos cookies de publicidade após a sua opção."
            ]
          },
          {
            "kind": "p",
            "text": "Atualmente, não executamos nenhuma análise, pixels de rastreamento ou tags de remarketing. Caso adicionemos alguma, o banner de cookies acima as bloqueará."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Segurança",
        "blocks": [
          {
            "kind": "p",
            "text": "Todo o tráfego para e do Serviço é criptografado com TLS 1.2 ou superior. As senhas são armazenadas como hashes Argon2 pelo Supabase Auth. Verificamos novas senhas contra a API pública HaveIBeenPwned (k-anonymity) no lado do cliente, de modo que uma senha conhecida como comprometida não possa ser utilizada. As chaves de API são armazenadas apenas como hashes SHA-256. As linhas do banco de dados são protegidas por políticas de segurança em nível de linha que garantem que um usuário não possa ler os dados de outro usuário. Apesar dessas medidas, nenhum sistema é perfeitamente seguro; você aceita o risco residual inerente a qualquer serviço online."
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
              "Registros contábeis: retidos por dez (10) anos para cumprir obrigações fiscais francesas.",
              "Registros de consentimento: mantidos durante a duração da sua conta mais cinco (5) anos após a exclusão como evidência legal."
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
            "text": "O Serviço **não é direcionado a crianças menores de dezesseis (16) anos**. Se você tiver menos que essa idade, não deve criar uma conta. Não coletamos dados de menores de forma intencional; caso tomemos conhecimento de que coletamos, excluiremos os dados."
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
            "text": "Para qualquer dúvida sobre esta política ou seus dados, escreva para [privacy@konvertools.com](mailto:privacy@konvertools.com). Você também pode apresentar uma reclamação à autoridade francesa de proteção de dados (CNIL, [cnil.fr](https://www.cnil.fr/)) ou à autoridade supervisora do seu país de residência."
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
            "text": "Der **Service** Konvertools wird als datenschutzfreundliches Toolkit betrieben. Die wichtigste Verpflichtung, die wir eingehen, lautet:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-basierte Tools** (Bildkonverter, PDF-Tools, die pdf-lib nutzen, Audio- und Videokonvertierungen mit FFmpeg.wasm, Code-Tools, Rechner, QR-Generatoren, die meisten Utilities) laufen **vollständig in Ihrem Webbrowser über WebAssembly**. Ihre Datei wird niemals an unsere Server übertragen. Wir haben keine technischen Möglichkeiten, sie zu lesen.",
              "**Servergestützte Tools** (KI-Transkription, KI-Übersetzung, KI-Textaufgaben, Einbrennen von Videountertiteln, der Virenscanner, der URL-Scanner, der Phishing-Detektor und einige andere) müssen etwas an ein Backend senden. In jedem Fall wird die Datei oder der Text in Echtzeit verarbeitet und entweder (a) innerhalb von dreißig (30) Minuten aus dem temporären Speicher gelöscht oder (b) – beim Virenscanner – überhaupt nicht übertragen (nur der SHA-256-Hash der Datei verlässt Ihr Gerät).",
              "Wir speichern niemals den Inhalt hochgeladener Dateien an einem persistenten Speicherort, wir nutzen Ihre Uploads nicht zur Schulung von KI-Modellen und wir verkaufen, vermieten oder teilen sie nicht mit Dritten zu einem anderen Zweck als der Bereitstellung des von Ihnen angeforderten Ergebnisses."
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
            "text": "Für die Zwecke der **EU-Datenschutz-Grundverordnung (Verordnung (EU) 2016/679, „GDPR“)** ist der Verantwortliche für die Datenverarbeitung der Herausgeber des **Service**. Kontakt für Datenschutzanfragen: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Kontoanmeldedaten**: Ihre E-Mail-Adresse; eine gesalzene, gehashte Kopie Ihres Passworts (verwaltet durch Supabase Auth – wir sehen oder speichern niemals das Klartextpasswort); optional ein Anzeigename und eine Avatar-URL, falls Sie sich mit Google anmelden.",
              "**Abonnementstatus**: aktueller Plan (kostenlos / Pro / Business), Stripe-Kundenkennung, aktueller Guthabenstand und die Daten Ihrer letzten Verlängerung.",
              "**Nutzungskontingente**: aggregierte Kontingentzähler (z. B. „3 KI-Läufe heute genutzt“, „420 monatliche KI-Läufe genutzt“), die in Ihrer Profilzeile aktualisiert werden. Wir führen **keine Aufzeichnungen pro Lauf** durch.",
              "**Job-Metadaten (vorübergehend)**: Wenn ein servergestütztes Tool ein Ergebnis erzeugt (z. B. eine .srt-Datei aus einer Transkription), speichern wir den Tool-Namen, die Download-URL des Ergebnisses, die Quellsprache und einen Zeitstempel der Fertigstellung. Diese Zeilen werden automatisch nach **zwei (2) Stunden** gelöscht. Sie enthalten niemals den Inhalt Ihrer Datei.",
              "**Einwilligungsnachweise**: Datum und Uhrzeit, zu der Sie diese Nutzungsbedingungen und unsere Datenschutzrichtlinie akzeptiert haben, sowie ob Sie in Marketing-E-Mails eingewilligt haben. Werden für die Dauer Ihres Kontos plus einen rechtlichen Nachweiszeitraum von fünf (5) Jahren nach Löschung gespeichert.",
              "**API-Schlüssel**: Falls Sie Schlüssel für die öffentliche REST-API generieren, speichern wir nur den SHA-256-Hash und eine 12-stellige Anzeigepräfix. Der Rohschlüssel wird Ihnen genau einmal bei der Erstellung angezeigt und ist danach nicht mehr wiederherstellbar."
            ]
          },
          {
            "kind": "p",
            "text": "Wir erheben **keine** Daten zu: Ihrer IP-Adresse (über den temporären Gebrauch hinaus, den Supabase und unser Hosting-Anbieter für die Begrenzung der Zugriffsrate und Sicherheitsprotokollierung nutzen), Ihrem Browser-Fingerprint, verhaltensbasierten Tracking-Ereignissen, Ihren Bildschirmaufzeichnungen oder biometrischen Daten."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Dateien, die Sie verarbeiten",
        "blocks": [
          {
            "kind": "p",
            "text": "Wie in Abschnitt 1 dargelegt, werden die Inhalte der von Ihnen verarbeiteten Dateien von uns niemals gespeichert. Der genaue Lebenszyklus lautet:"
          },
          {
            "kind": "ul",
            "items": [
              "**Browser-basierte Tools**: keine Übertragung. Die Datei wird von Ihrem Browser in den Speicher gelesen, das Ergebnis wird lokal erzeugt und Sie laden es direkt herunter. Wir protokollieren nichts über die Datei selbst.",
              "**KI-Transkription / -Übersetzung / -OCR / Phishing-Analyse**: Die Datei oder der Text wird an unsere Supabase Edge Function gestreamt, die ihn umgehend an den jeweiligen KI-Anbieter (siehe Abschnitt 7) zur Inferenz weiterleitet. Das Ergebnis wird an Sie zurückgegeben und der temporäre Upload-Puffer wird verworfen. Ergebnisdateien, die in unserem privaten Speicher-Bucket geschrieben werden, sind über signierte URLs für sechzig (60) Minuten zugänglich und werden innerhalb von dreißig (30) Minuten nach der Erstellung physisch gelöscht.",
              "**Virenscanner**: Ihre Datei verlässt niemals Ihren Browser. Wir berechnen lokal ihren SHA-256-Fingerabdruck und senden nur das daraus resultierende 64-stellige Hash an VirusTotal. VirusTotal kann Ihre Datei nicht aus ihrem Hash rekonstruieren.",
              "**URL-Scanner**: Nur die von Ihnen eingegebene URL-Zeichenkette wird an Google Safe Browsing übertragen. Keine umgebenden Seitinhalte."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Rechtliche Grundlagen der Verarbeitung (GDPR Art. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Erfüllung eines Vertrags** (Art. 6(1)(b)) – Wenn Sie ein Konto erstellen und kostenpflichtige Funktionen nutzen, ist die Verarbeitung zur Erbringung des **Service** erforderlich.",
              "**Berechtigtes Interesse** (Art. 6(1)(f)) – Betrugsprävention, Missbrauchsbekämpfung, grundlegende Sicherheitsprotokollierung und Verbesserung des **Service**.",
              "**Einwilligung** (Art. 6(1)(a)) – Marketing-E-Mails, optionale Analysen oder Werbe-Cookies (falls und sobald aktiviert) sowie zukünftige optionale Integrationen.",
              "**Rechtliche Verpflichtung** (Art. 6(1)(c)) – Aufbewahrung von Rechnungsunterlagen gemäß französischer Steuergesetzgebung (in der Regel zehn Jahre)."
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
            "text": "Sie haben die Rechte auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und zum Widerruf Ihrer Einwilligung zu jedem Zeitpunkt, ohne dass die Rechtmäßigkeit der vorherigen Verarbeitung beeinträchtigt wird. Sie haben zudem das Recht, sich bei der CNIL (Frankreich) oder der zuständigen Aufsichtsbehörde Ihres Landes zu beschweren. Um eines dieser Rechte auszuüben, senden Sie eine E-Mail an [privacy@konvertools.com](mailto:privacy@konvertools.com) von der auf Ihrem Konto registrierten Adresse. Wir antworten innerhalb von dreißig (30) Tagen, wie in GDPR Art. 12(3) vorgeschrieben."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Externe Dienstleister",
        "blocks": [
          {
            "kind": "p",
            "text": "Für die Bereitstellung des **Service** müssen wir streng begrenzte Daten mit den folgenden Dienstleistern teilen. Jeder hat seine eigene Datenschutzrichtlinie, die regelt, wie sie die von uns erhaltenen Daten behandeln."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (in Singapur gegründet, für unser Projekt in der EU gehostet) – Authentifizierung, Datenbank, Dateispeicher und Edge Functions. Erhält Ihre Kontoanmeldedaten, Profildaten und (vorübergehend) jede Datei, die Sie für ein servergestütztes Tool hochladen. Agiert als unser Unterauftragsverarbeiter.",
              "**Mistral AI** (Frankreich) – Inferenz mit großen Sprachmodellen für Übersetzung, Umformulierung, Zusammenfassung, den KI-Humanizer, Phishing-Musteranalyse und andere Textaufgaben; Audio-Transkription (Voxtral); Bild-OCR und Vision-Aufgaben (Pixtral). Der von Ihnen übermittelte Text oder das Bild wird an Mistral zur Inferenz gesendet. Mistral hat vertraglich zugesichert, **API-Eingaben nicht zur Schulung seiner Modelle** zu nutzen.",
              "**VirusTotal** (Google LLC, USA) – Nur bei Nutzung des Virenscanners. Nur der SHA-256-Hash Ihrer Datei wird übertragen, niemals die Datei selbst.",
              "**Google Safe Browsing** (Google LLC, USA) – Nur bei Nutzung des URL-Scanners oder des Phishing-Detektors. Nur die von Ihnen eingegebenen URLs (oder aus der von Ihnen eingefügten E-Mail extrahierten Links) werden übertragen.",
              "**Stripe** (USA / Irland) – Zahlungsabwicklung und Abonnementverwaltung. Wir **sehen oder speichern niemals** Ihre Kartendaten. Stripe erhält Ihre E-Mail-Adresse, Zahlungsmethode und den von Ihnen gekauften Plan/Guthaben.",
              "**Resend** (USA) – Zustellung transaktionaler E-Mails (Kontobestätigung, Zahlungsbestätigung, Passwortzurücksetzung). Erhält Ihre E-Mail-Adresse und den E-Mail-Text, den wir senden.",
              "**Vercel** (USA) – Content Delivery Network für statische Seiten. Erhält Standard-Web-Traffic-Metadaten (IP, User-Agent, angeforderte URL) für Routing und Missbrauchsprävention. Werden gemäß der Protokollierungsrichtlinie von Vercel aufbewahrt."
            ]
          },
          {
            "kind": "p",
            "text": "Falls einer dieser Dienstleister außerhalb des Europäischen Wirtschaftsraums tätig ist, unterliegen die Datenübermittlungen den Standardvertragsklauseln (SCCs) der Europäischen Kommission oder einem gleichwertigen Übermittlungsmechanismus."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies und ähnliche Technologien",
        "blocks": [
          {
            "kind": "p",
            "text": "Wir verwenden nur die folgenden Cookies und Local-Storage-Elemente:"
          },
          {
            "kind": "ul",
            "items": [
              "**Essenziell**: NEXT_LOCALE (speichert Ihre gewählte Sprache) und Supabase-Sitzungscookies (sb-*-auth-token) bei angemeldeten Benutzern. Diese erfordern keine Einwilligung gemäß GDPR.",
              "**Optional Werbung**: Falls und sobald wir Werbepartner aktivieren (derzeit ist Ezoic in unserem Code referenziert, aber noch nicht für Ihren Traffic aktiviert), zeigen wir einen klaren Einwilligungsbanner und setzen Werbe-Cookies erst nach Ihrer Zustimmung."
            ]
          },
          {
            "kind": "p",
            "text": "Wir führen derzeit keine Analysen, Tracking-Pixel oder Remarketing-Tags durch. Falls wir welche hinzufügen, wird der oben genannte Cookie-Banner diese steuern."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Sicherheit",
        "blocks": [
          {
            "kind": "p",
            "text": "Der gesamte Datenverkehr zum und vom **Service** ist mit TLS 1.2 oder höher verschlüsselt. Passwörter werden von Supabase Auth als Argon2-Hashes gespeichert. Wir prüfen neue Passwörter clientseitig gegen die öffentliche HaveIBeenPwned k-Anonymity-API, sodass ein bekannt kompromittiertes Passwort nicht verwendet werden kann. API-Schlüssel werden nur als SHA-256-Hashes gespeichert. Datenbankzeilen sind durch Row-Level-Security-Richtlinien geschützt, die sicherstellen, dass ein Benutzer keine Daten eines anderen Benutzers lesen kann. Trotz dieser Maßnahmen ist kein System perfekt sicher; Sie akzeptieren das verbleibende Risiko, das mit jedem Online-Service verbunden ist."
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
              "Ergebnisdateien im Speicher-Bucket: werden innerhalb von dreißig (30) Minuten nach der Erstellung physisch gelöscht.",
              "Abrechnungsunterlagen: werden zehn (10) Jahre lang aufbewahrt, um französischen Steuerpflichten zu entsprechen.",
              "Einwilligungsnachweise: werden für die Dauer Ihres Kontos plus fünf (5) Jahre danach als rechtlicher Nachweis aufbewahrt."
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
            "text": "Der **Service** richtet sich **nicht an Kinder unter sechzehn (16) Jahren**. Wenn Sie unter diesem Alter sind, dürfen Sie kein Konto erstellen. Wir erheben keine Daten von Minderjährigen wissentlich; falls wir davon Kenntnis erlangen, werden wir die Daten löschen."
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
            "text": "Bei Fragen zu dieser Richtlinie oder Ihren Daten schreiben Sie an [privacy@konvertools.com](mailto:privacy@konvertools.com). Sie können sich auch bei der französischen Datenschutzbehörde (CNIL, [cnil.fr](https://www.cnil.fr/)) oder der zuständigen Behörde Ihres Wohnsitzlandes beschweren."
          }
        ]
      }
    ]
  },
  "it": {
    "h1": "Politica sulla Privacy",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ultimo aggiornamento: %DATE% · Efficace immediatamente per tutti i visitatori e gli utenti registrati.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Il nostro principio fondamentale: non conserviamo i tuoi file",
        "blocks": [
          {
            "kind": "p",
            "text": "Il servizio **Konvertools** (il \"Servizio\") viene gestito come una suite di strumenti incentrata sulla privacy. L'impegno più importante che prendiamo è questo:"
          },
          {
            "kind": "ul",
            "items": [
              "**Strumenti esclusivamente lato browser** (convertitori di immagini, strumenti PDF che utilizzano pdf-lib, conversioni audio e video tramite FFmpeg.wasm, strumenti per il codice, calcolatrici, generatori di codici QR, la maggior parte delle utility) vengono eseguiti **completamente all'interno del tuo browser web tramite WebAssembly**. Il file non viene mai trasmesso ai nostri server. Non abbiamo mezzi tecnici per leggerlo.",
              "**Strumenti con supporto server** (trascrizione AI, traduzione AI, attività testuali AI, sottotitoli video bruciati, lo scanner antivirus, lo scanner di URL, il rilevatore di phishing e un piccolo numero di altri) necessitano di inviare qualcosa a un backend. In ogni caso, il file o il testo viene elaborato in tempo reale e viene eliminato (a) dalla memoria temporanea entro trenta (30) minuti, oppure (b) — per lo scanner antivirus — non viene mai trasmesso affatto (solo l'hash SHA-256 del file lascia il tuo dispositivo).",
              "Non conserviamo mai il contenuto di alcun file caricato in una posizione persistente, non utilizziamo i tuoi file per addestrare modelli AI e non li vendiamo, affittiamo o condividiamo con terze parti per alcun fine diverso dalla consegna del risultato da te richiesto."
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
              "**Stato dell'abbonamento**: piano attuale (gratuito / Pro / Business), identificatore cliente Stripe, saldo credito attuale e date dei tuoi rinnovi più recenti.",
              "**Contatori di utilizzo**: contatori aggregati di quota (ad esempio \"3 esecuzioni AI utilizzate oggi\", \"420 esecuzioni AI mensili utilizzate\") aggiornati direttamente sulla riga del tuo profilo. **Non registriamo** record per ogni esecuzione.",
              "**Metadati delle attività (transitori)**: quando uno strumento con supporto server produce un output (ad esempio un file .srt da una trascrizione), registriamo il nome dello strumento, l'URL di download del risultato, la lingua di origine e un timestamp di completamento. Queste righe vengono eliminate automaticamente dopo **due (2) ore**. Non contengono mai il contenuto dei tuoi file.",
              "**Registri di consenso**: data e ora in cui hai accettato questi Termini e la nostra Politica sulla Privacy, nonché se hai scelto di ricevere email di marketing. Conservati per la durata del tuo account più un periodo di prova legale di cinque (5) anni dopo la cancellazione.",
              "**Chiavi API**: se generi chiavi per l'API REST pubblica, memorizziamo solo l'hash SHA-256 e un prefisso di visualizzazione di 12 caratteri. La chiave grezza ti viene mostrata una sola volta al momento della creazione e non può essere recuperata in seguito."
            ]
          },
          {
            "kind": "p",
            "text": "**Non raccogliamo**: il tuo indirizzo IP (oltre all'uso temporaneo che Supabase e il nostro provider di hosting fanno di esso per il rate-limiting e la registrazione di sicurezza), l'impronta digitale del browser, eventi di tracciamento comportamentale, registrazioni dello schermo o qualsiasi dato biometrico."
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
              "**Strumenti esclusivamente lato browser**: nessuna trasmissione. Il file viene letto in memoria dal browser, il risultato viene prodotto localmente e lo scarichi direttamente. Non registriamo nulla riguardo al file stesso.",
              "**Trascrizione / traduzione / OCR AI / analisi phishing**: il file o il testo viene trasmesso in streaming a una Edge Function di Supabase, che lo inoltra immediatamente al provider AI pertinente (vedi sezione 7) per l'inferenza. Il risultato viene restituito a te e il buffer di caricamento temporaneo viene scartato. I file di risultato scritti nel nostro bucket di storage privato sono accessibili tramite URL firmato per sessanta (60) minuti e fisicamente eliminati entro trenta (30) minuti dalla generazione.",
              "**Scanner antivirus**: il file non lascia mai il tuo browser. Calcoliamo localmente l'impronta SHA-256 e inviamo solo l'hash di 64 caratteri risultante a VirusTotal. VirusTotal non può ricostruire il tuo file dal suo hash.",
              "**Scanner di URL**: viene trasmesso solo la stringa URL che digiti a Google Safe Browsing. Nessun contenuto circostante della pagina."
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
              "**Legittimo interesse** (Art. 6(1)(f)) — prevenzione delle frodi, mitigazione degli abusi, registrazione di base della sicurezza e miglioramento del Servizio.",
              "**Consenso** (Art. 6(1)(a)) — email di marketing, cookie facoltativi di analisi o pubblicità (se e quando abilitati) e qualsiasi futura integrazione facoltativa.",
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
            "text": "Hai i diritti di accesso (Art. 15), rettifica (Art. 16), cancellazione (Art. 17), limitazione (Art. 18), portabilità (Art. 20), opposizione (Art. 21) e di revocare il consenso in qualsiasi momento senza pregiudicare la liceità dei trattamenti precedenti. Hai anche il diritto di presentare reclamo al CNIL (Francia) o all'autorità di controllo del tuo paese di residenza. Per esercitare qualsiasi diritto, invia una email a [privacy@konvertools.com](mailto:privacy@konvertools.com) dall'indirizzo registrato sul tuo account. Risponderemo entro trenta (30) giorni, come richiesto dall'Art. 12(3) GDPR."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Responsabili del trattamento di terze parti",
        "blocks": [
          {
            "kind": "p",
            "text": "L'erogazione del Servizio richiede di condividere dati strettamente limitati con i seguenti responsabili del trattamento. Ognuno ha una propria politica sulla privacy che disciplina come gestiscono i dati che ricevono da noi."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (società costituita a Singapore, ospitata nell'UE per il nostro progetto) — autenticazione, database, archiviazione file e Edge Functions. Riceve le tue credenziali dell'account, i dati del profilo e (transitoriamente) qualsiasi file che carichi per uno strumento con supporto server. Agisce come nostro sub-responsabile del trattamento.",
              "**Mistral AI** (Francia) — inferenza di modelli linguistici di grandi dimensioni per traduzione, riformulazione, sintesi, l'umanizzazione AI, analisi di pattern di phishing e altre attività testuali; trascrizione audio (Voxtral); OCR e attività di visione delle immagini (Pixtral). Il testo o l'immagine che invii vengono inviati a Mistral per l'inferenza. Mistral si è impegnata contrattualmente a **non utilizzare gli input dell'API per addestrare i propri modelli**.",
              "**VirusTotal** (Google LLC, USA) — solo quando utilizzi lo Scanner Antivirus. Viene trasmesso solo l'hash SHA-256 del file, mai il file stesso.",
              "**Google Safe Browsing** (Google LLC, USA) — solo quando utilizzi lo Scanner di URL o il Rilevatore di Phishing. Vengono trasmessi solo gli URL che digiti (o i link estratti dall'email che incolli).",
              "**Stripe** (USA / Irlanda) — elaborazione dei pagamenti e gestione degli abbonamenti. **Non vediamo né memorizziamo mai** i dettagli della tua carta. Stripe riceve il tuo indirizzo email, il metodo di pagamento e il piano/pacchetto credito che hai acquistato.",
              "**Resend** (USA) — consegna di email transazionali (conferma dell'account, ricevute di pagamento, reset della password). Riceve il tuo indirizzo email e il corpo dell'email che inviamo.",
              "**Vercel** (USA) — content delivery network per le pagine statiche. Riceve metadati standard del traffico web (IP, user-agent, URL richiesto) per l'instradamento e la prevenzione degli abusi. Conservati in conformità con la politica di conservazione dei log di Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Laddove uno di questi responsabili del trattamento operi al di fuori dello Spazio Economico Europeo, i trasferimenti sono disciplinati dalle Clausole Contrattuali Standard (SCCs) della Commissione Europea o da un meccanismo di trasferimento equivalente."
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
              "**Pubblicità facoltativa**: se e quando abilitiamo partner pubblicitari (attualmente Ezoic è referenziato nel nostro codice ma non ancora attivato per il tuo traffico), mostreremo un banner di consenso chiaro e imposteremo cookie pubblicitari solo dopo che avrai scelto di acconsentire."
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
            "text": "Tutto il traffico verso e dal Servizio è crittografato con TLS 1.2 o superiore. Le password vengono memorizzate come hash Argon2 da Supabase Auth. Verifichiamo le nuove password tramite l'API pubblica di HaveIBeenPwned client-side, quindi una password nota per essere stata compromessa non può essere utilizzata. Le chiavi API vengono memorizzate solo come hash SHA-256. Le righe del database sono protette da politiche di sicurezza a livello di riga che garantiscono che un utente non possa leggere i dati di un altro utente. Nonostante queste misure, nessun sistema è perfettamente sicuro; accetti il rischio residuo insito in qualsiasi servizio online."
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
              "Dati del profilo: conservati finché il tuo account esiste, eliminati entro trenta (30) giorni dalla chiusura dell'account.",
              "Metadati delle attività: eliminati automaticamente dopo due (2) ore.",
              "File di risultato nel bucket di archiviazione: eliminati fisicamente entro trenta (30) minuti dalla generazione.",
              "Registri contabili: conservati per dieci (10) anni per conformarsi agli obblighi fiscali francesi.",
              "Registri di consenso: conservati per la durata del tuo account più cinque (5) anni dopo per prove legali."
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
            "text": "Possiamo modificare questa Politica sulla Privacy di volta in volta. Le modifiche sostanziali verranno annunciate tramite email agli utenti registrati almeno trenta (30) giorni prima della loro entrata in vigore. La versione più recente è sempre disponibile all'indirizzo [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contatti",
        "blocks": [
          {
            "kind": "p",
            "text": "Per qualsiasi domanda su questa politica o sui tuoi dati, scrivi a [privacy@konvertools.com](mailto:privacy@konvertools.com). Puoi anche presentare reclamo al Garante francese per la protezione dei dati (CNIL, [cnil.fr](https://www.cnil.fr/)) o all'autorità di controllo del tuo paese di residenza."
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
        "title": "1. Onze kernprincipe: we houden uw bestanden niet vast",
        "blocks": [
          {
            "kind": "p",
            "text": "De **Service** van Konvertools wordt geëxploiteerd als een privacy-first gereedschapskist. De belangrijkste belofte die wij u doen, is deze:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tools die alleen in de browser werken** (afbeeldingsconverters, PDF-tools die gebruikmaken van pdf-lib, audio- en videoconversies aangedreven door FFmpeg.wasm, code-tools, rekenmachines, QR-generators, de meeste utilities) worden **volledig uitgevoerd binnen uw webbrowser via WebAssembly**. Uw bestand wordt nooit naar onze servers verzonden. Wij hebben geen technische middelen om het te lezen.",
              "**Serverondersteunde tools** (AI-transcriptie, AI-vertaling, AI-teksttaken, inbrandende videotitels, de virusscanner, de URL-scanner, de phishingdetector en een klein aantal andere) moeten iets naar een backend verzenden. In elk geval wordt het bestand of de tekst in realtime verwerkt en wordt deze ofwel (a) binnen dertig (30) minuten verwijderd uit tijdelijke opslag, of (b) — voor de virusscanner — helemaal niet verzonden (alleen de SHA-256-hash van het bestand verlaat uw apparaat).",
              "Wij slaan nooit de inhoud van een geüpload bestand op in een permanente locatie, gebruiken uw uploads niet om AI-modellen te trainen en verkopen, verhuren of delen ze niet met derden voor enig ander doel dan het leveren van het resultaat dat u heeft aangevraagd."
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
            "text": "Voor de toepassing van de Algemene verordening gegevensbescherming (Verordening (EU) 2016/679, \"GDPR\") is de gegevensverwerkingsverantwoordelijke de uitgever van de **Service**. Neem voor vragen over privacy contact op via: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Welke gegevens wij verzamelen",
        "blocks": [
          {
            "kind": "p",
            "text": "De enige persoonsgegevens die wij in onze database opslaan, zijn:"
          },
          {
            "kind": "ul",
            "items": [
              "**Accountgegevens**: uw e-mailadres; een gezouten, gehashte kopie van uw wachtwoord (beheerd door Supabase Auth — wij zien of slaan de plaintext nooit op); optionele weergavenaam en avatar-URL als u inlogt met Google.",
              "**Abonnementsstatus**: huidig abonnement (gratis / Pro / Business), Stripe-klantidentificatie, huidige tegoedstand en de data van uw meest recente verlengingen.",
              "**Gebruiksmetingen**: geaggregeerde quotummeters (bijv. \"3 AI-runs gebruikt vandaag\", \"420 AI-runs gebruikt deze maand\") die op uw profielrij worden bijgewerkt. Wij loggen **geen** per-runrecords.",
              "**Jobmetadata (tijdelijk)**: wanneer een serverondersteunde tool een resultaat produceert (bijv. een .srt-bestand van transcriptie), registreren wij de naam van de tool, de download-URL van het resultaat, de brontaal en een voltooiingstijdstempel. Deze rijen worden automatisch gewist na **twee (2) uur**. Ze bevatten nooit de inhoud van uw bestand.",
              "**Toestemmingsrecords**: de datum en tijd waarop u deze voorwaarden en ons privacybeleid heeft geaccepteerd, en of u heeft ingestemd met marketing-e-mails. Deze worden bewaard voor de duur van uw account plus een wettelijk bewijsperiode van vijf (5) jaar na verwijdering.",
              "**API-sleutels**: als u sleutels genereert voor de openbare REST API, slaan wij alleen de SHA-256-hash en een 12-tekens weergavevoorvoegsel op. De originele sleutel wordt u precies één keer getoond bij aanmaak en is daarna niet meer terug te halen."
            ]
          },
          {
            "kind": "p",
            "text": "Wij verzamelen **niet**: uw IP-adres (behalve het tijdelijke gebruik dat Supabase en onze hostingprovider ervan maken voor rate-limiting en beveiligingslogging), uw browserfingerprint, gedragsmatige trackinggebeurtenissen, uw schermopnames of enige biometrische gegevens."
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
              "**Tools die alleen in de browser werken**: nul transmissie. Het bestand wordt door uw browser in het geheugen gelezen, het resultaat wordt lokaal geproduceerd en u downloadt het direct. Wij loggen niets over het bestand zelf.",
              "**AI-transcriptie / vertaling / OCR / phishinganalyse**: het bestand of de tekst wordt gestreamd naar onze Supabase Edge Function, die het direct doorstuurt naar de relevante AI-aanbieder (zie sectie 7) voor inferentie. Het resultaat wordt aan u teruggegeven en de tijdelijke uploadbuffer wordt verwijderd. Resultaatbestanden die naar onze privéopslagbucket worden geschreven, zijn toegankelijk via een ondertekende URL voor zestig (60) minuten en fysiek gewist binnen dertig (30) minuten na generatie.",
              "**Virusscanner**: uw bestand verlaat nooit uw browser. Wij berekenen lokaal de SHA-256-fingerprint en sturen alleen de resulterende 64-tekens hash naar VirusTotal. VirusTotal kan uw bestand niet reconstrueren aan de hand van de hash.",
              "**URL-scanner**: alleen de URL-tekst die u typt, wordt verzonden naar Google Safe Browsing. Geen omringende paginainhoud."
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
              "**Uitvoering van een overeenkomst** (Art. 6(1)(b)) — wanneer u een account aanmaakt en betaalde functies gebruikt, is verwerking noodzakelijk om de **Service** te leveren.",
              "**Legitiem belang** (Art. 6(1)(f)) — fraudepreventie, misbruikbeperking, basisbeveiligingslogging en verbetering van de **Service**.",
              "**Toestemming** (Art. 6(1)(a)) — marketing-e-mails, optionele analytics- of advertentiecookies (indien en wanneer ingeschakeld) en elke toekomstige optionele integratie.",
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
            "text": "U heeft de rechten op inzage (Art. 15), correctie (Art. 16), verwijdering (Art. 17), beperking (Art. 18), overdraagbaarheid (Art. 20), bezwaar (Art. 21) en het intrekken van toestemming op elk moment zonder dat dit de wettigheid van eerdere verwerking beïnvloedt. U heeft ook het recht om een klacht in te dienen bij de CNIL (Frankrijk) of uw lokale toezichthoudende autoriteit. Om een recht uit te oefenen, e-mail [privacy@konvertools.com](mailto:privacy@konvertools.com) vanaf het adres dat op uw account is geregistreerd. Wij reageren binnen dertig (30) dagen, zoals vereist door GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Derde partijen die gegevens verwerken",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor het leveren van de **Service** moeten wij strikt beperkte gegevens delen met de volgende verwerkers. Elke partij heeft zijn eigen privacybeleid dat van toepassing is op hoe zij de gegevens die zij van ons ontvangen, behandelen."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (opgericht in Singapore, gehost in de EU voor ons project) — authenticatie, database, bestandsopslag en Edge Functions. Ontvangt uw accountgegevens, profielgegevens en (tijdelijk) elk bestand dat u uploadt voor een serverondersteunde tool. Fungeert als onze subverwerker.",
              "**Mistral AI** (Frankrijk) — inferentie met grote taalmodellen voor vertaling, herformulering, samenvatting, de AI-humanizer, phishingpatroonanalyse en andere teksttaken; audio-transcriptie (Voxtral); afbeeldings-OCR en Vision-taken (Pixtral). De tekst of afbeelding die u indient, wordt naar Mistral verzonden voor inferentie. Mistral heeft contractueel toegezegd **geen** API-inputs te gebruiken voor het trainen van hun modellen.",
              "**VirusTotal** (Google LLC, VS) — alleen wanneer u de virusscanner gebruikt. Alleen de SHA-256-hash van uw bestand wordt verzonden, nooit het bestand zelf.",
              "**Google Safe Browsing** (Google LLC, VS) — alleen wanneer u de URL-scanner of de phishingdetector gebruikt. Alleen de URL’s die u indient (of links die uit de e-mail worden geëxtraheerd die u plakt) worden verzonden.",
              "**Stripe** (VS / Ierland) — verwerking van betalingen en abonnementbeheer. Wij **zien of slaan uw kaartgegevens nooit op**. Stripe ontvangt uw e-mailadres, betaalmethode en het abonnement/tegoed dat u heeft gekocht.",
              "**Resend** (VS) — levering van transactie-e-mails (accountbevestiging, betalingsbewijs, wachtwoordreset). Ontvangt uw e-mailadres en de e-mailinhoud die wij verzenden.",
              "**Vercel** (VS) — content delivery network voor statische pagina’s. Ontvangt standaard webverkeersmetadata (IP, user-agent, aangevraagde URL) voor routering en misbruikpreventie. Wordt bewaard volgens het logretentiebeleid van Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Wanneer een van deze verwerkers buiten de Europese Economische Ruimte opereert, worden de overdrachten gereguleerd door de Standard Contractual Clauses (SCCs) van de Europese Commissie of een gelijkwaardig overdrachtsmechanisme."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. Cookies en soortgelijke technologieën",
        "blocks": [
          {
            "kind": "p",
            "text": "Wij gebruiken alleen de volgende cookies en lokale opslagitems:"
          },
          {
            "kind": "ul",
            "items": [
              "**Essentieel**: NEXT_LOCALE (onthoudt uw gekozen taal) en Supabase sessiecookies (sb-*-auth-token) wanneer u bent ingelogd. Deze vereisen geen toestemming op grond van de GDPR.",
              "**Optioneel advertentie**: indien en wanneer wij advertentiepartners inschakelen (op dit moment wordt Ezoic in onze code genoemd maar nog niet geactiveerd voor uw verkeer), zullen wij een duidelijke toestemmingsbanner weergeven en alleen advertentiecookies instellen nadat u heeft ingestemd."
            ]
          },
          {
            "kind": "p",
            "text": "Wij voeren momenteel geen analytics, trackingpixels of remarketingtags uit. Als wij er een toevoegen, zal de cookiebanner hierboven deze afschermen."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Beveiliging",
        "blocks": [
          {
            "kind": "p",
            "text": "Alle verkeer naar en van de **Service** is versleuteld met TLS 1.2 of hoger. Wachtwoorden worden opgeslagen als Argon2-hashes door Supabase Auth. Wij controleren nieuwe wachtwoorden aan de hand van de openbare HaveIBeenPwned k-anonimiteit API client-side, zodat een bekend gecompromitteerd wachtwoord niet kan worden gebruikt. API-sleutels worden alleen opgeslagen als SHA-256-hashes. Database rijen worden beschermd door row-level security policies die ervoor zorgen dat één gebruiker de gegevens van een andere gebruiker niet kan lezen. Ondanks deze maatregelen is geen enkel systeem perfect veilig; u accepteert het resterende risico dat inherent is aan elke online service."
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
              "Factuurgegevens: bewaard voor tien (10) jaar om te voldoen aan Franse belastingverplichtingen.",
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
            "text": "De **Service** is **niet gericht op kinderen onder de zestien (16)**. Als u jonger bent, mag u geen account aanmaken. Wij verzamelen niet bewust gegevens van minderjarigen; als wij erachter komen dat we dat wel hebben gedaan, zullen wij deze verwijderen."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Wijzigingen in dit beleid",
        "blocks": [
          {
            "kind": "p",
            "text": "Wij kunnen dit privacybeleid van tijd tot tijd wijzigen. Belangrijke wijzigingen worden minimaal dertig (30) dagen voorafgaand aan inwerkingtreding per e-mail aan houders van accounts gecommuniceerd. De meest recente versie is altijd beschikbaar op [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Contact",
        "blocks": [
          {
            "kind": "p",
            "text": "Voor vragen over dit beleid of uw gegevens, schrijf naar [privacy@konvertools.com](mailto:privacy@konvertools.com). U kunt ook een klacht indienen bij de Franse gegevensbeschermingsautoriteit (CNIL, [cnil.fr](https://www.cnil.fr/)) of bij de toezichthoudende autoriteit van uw land van verblijf."
          }
        ]
      }
    ]
  },
  "ja": {
    "h1": "プライバシーポリシー",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最終更新日: %DATE% · すべての訪問者およびアカウント保持者に対し、直ちに効力を発します。",
    "sections": [
      {
        "id": "principle",
        "title": "1. 当社の基本原則：お客様のファイルは保持しません",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools（以下「本サービス」）は、プライバシーを最優先とするツールキットとして運営されています。当社が最も重要な約束とするのは、以下のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**ブラウザ内ツール** (画像変換、pdf-libを使用したPDFツール、FFmpeg.wasmによるオーディオ・ビデオ変換、コードツール、計算機、QRコード生成、その他のユーティリティ) は、**WebAssemblyを介してお客様のウェブブラウザ内で完全に実行されます**。ファイルは当社のサーバーに送信されることはありません。当社にはそれを読み取る技術的手段はありません。",
              "**サーバー支援ツール** (AI文字起こし、AI翻訳、AIテキスト処理、ビデオ字幕焼き込み、ウイルススキャナー、URLスキャナー、フィッシング検出器などの一部ツール) では、バックエンドに何らかのデータを送信する必要があります。いずれの場合も、ファイルまたはテキストはリアルタイムで処理され、その後、(a) 30分以内に一時ストレージから削除されるか、(b) ウイルススキャナーの場合はファイル自体は送信されず（SHA-256ハッシュのみ送信）、いずれの場合もお客様のデバイスから削除されます。",
              "当社は、アップロードされたファイルの内容を永続的な場所に保存することはなく、ファイルをAIモデルのトレーニングに使用することも、第三者と共有することも、販売・賃貸することもありません。お客様がリクエストした結果を提供する目的を除き、いかなる目的でも行いません。"
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
            "text": "EU一般データ保護規則（規則（EU）2016/679、以下「GDPR」）の目的において、データ管理者は本サービスの発行者です。プライバシーに関するお問い合わせ先：[privacy@konvertools.com](mailto:privacy@konvertools.com)。"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 当社が収集するデータ",
        "blocks": [
          {
            "kind": "p",
            "text": "当社がデータベースに永続化する個人データは、以下のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**アカウント資格情報**：メールアドレス。パスワードはソルト化・ハッシュ化されたコピーのみ（Supabase Authにより管理され、当社は平文を一切見ることも保存することもありません）。Googleでサインインした場合は、任意の表示名とアバターURL。",
              "**サブスクリプション状態**：現在のプラン（無料 / Pro / Business）、Stripe顧客識別子、現在のクレジット残高、直近の更新日。",
              "**使用カウンター**：集計された割り当てカウンター（例：「本日のAI実行回数：3回」、「月間AI実行回数：420回」）はプロフィール行で更新されます。当社は**実行ごとの記録はログに残しません**。",
              "**ジョブメタデータ（一時的）**：サーバー支援ツールで出力（例：文字起こしによる.srtファイル）が生成された場合、ツール名、結果ダウンロードURL、ソース言語、完了時刻を記録します。これらの行は**2時間**後に自動的に消去されます。ファイルの内容は含まれません。",
              "**同意記録**：本規約および当社のプライバシーポリシーを受諾した日時と、マーケティングメールのオプトインの有無。アカウント削除後5年間の法的証拠期間を含め、アカウントの存続期間中保持されます。",
              "**APIキー**：REST APIの公開キーを生成した場合、SHA-256ハッシュと12文字の表示プレフィックスのみを保存します。生成時に平文キーが一度表示され、その後は回復不能です。"
            ]
          },
          {
            "kind": "p",
            "text": "当社は以下のデータは収集しません：IPアドレス（Supabaseおよび当社ホスティングプロバイダーによるレート制限・セキュリティログ目的の一時的使用を除く）、ブラウザフィンガープリント、行動追跡イベント、画面録画、生体認証データ。"
          }
        ]
      },
      {
        "id": "files",
        "title": "4. 処理されるファイル",
        "blocks": [
          {
            "kind": "p",
            "text": "第1項で述べたとおり、処理されるファイルの内容は当社によって永続化されることはありません。正確なライフサイクルは以下のとおりです。"
          },
          {
            "kind": "ul",
            "items": [
              "**ブラウザ内ツール**：送信なし。ファイルはブラウザによりメモリに読み込まれ、結果はローカルで生成され、直接ダウンロードされます。ファイル自体に関するログは記録されません。",
              "**AI文字起こし / 翻訳 / OCR / フィッシング分析**：ファイルまたはテキストはSupabase Edge Functionにストリーミングされ、直ちに関連するAIプロバイダー（第7項を参照）に転送され推論が行われます。結果はお客様に返され、一時アップロードバッファは破棄されます。プライベートストレージバケットに書き込まれた結果ファイルは、60分間署名付きURLでアクセス可能であり、生成から30分以内に物理的に消去されます。",
              "**ウイルススキャナー**：ファイルはブラウザから送信されません。SHA-256ハッシュのみをローカルで計算し、その結果64文字のハッシュをVirusTotalに送信します。VirusTotalはハッシュからファイルを再構築することはできません。",
              "**URLスキャナー**：Google Safe Browsingに送信されるのは、入力したURL文字列のみです。周辺のページ内容は送信されません。"
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
              "**契約の履行**（Art. 6(1)(b)）：アカウントを作成し有料機能を使用する際、サービスを提供するために処理が必要です。",
              "**正当な利益**（Art. 6(1)(f)）：不正行為の防止、悪用の抑制、基本的なセキュリティログ、サービスの改善。",
              "**同意**（Art. 6(1)(a)）：マーケティングメール、任意の分析または広告Cookie（有効化された場合）、将来の任意の統合。",
              "**法的義務**（Art. 6(1)(c)）：フランス税法（通常10年間）により要求される請求記録の保持。"
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
            "text": "お客様には、アクセス権（Art. 15）、訂正権（Art. 16）、消去権（Art. 17）、処理制限権（Art. 18）、移行権（Art. 20）、異議申し立て権（Art. 21）、および同意の撤回権があります。同意の撤回は過去の処理の合法性に影響を与えません。また、フランスの監督機関であるCNIL（[cnil.fr](https://www.cnil.fr/)）または居住地の監督機関に苦情を申し立てる権利もあります。権利を行使するには、アカウントに登録されたメールアドレスから[privacy@konvertools.com](mailto:privacy@konvertools.com)までご連絡ください。GDPR Art. 12(3)に基づき、30日以内に回答いたします。"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 第三者プロセッサ",
        "blocks": [
          {
            "kind": "p",
            "text": "サービスの提供には、以下のプロセッサとの厳格に制限されたデータ共有が必要です。各プロセッサには独自のプライバシーポリシーがあり、当社から受領したデータの取り扱い方法を規定しています。"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase**（シンガポール法人、当社プロジェクトではEU内でホスティング）：認証、データベース、ファイルストレージ、Edge Functions。アカウント資格情報、プロフィールデータ、サーバー支援ツールでアップロードされたファイル（一時的）を受領します。当社のサブプロセッサとして機能します。",
              "**Mistral AI**（フランス法人）：翻訳、言い換え、要約、AIヒューマナイザー、フィッシングパターン分析、その他テキスト処理、音声文字起こし（Voxtral）、画像OCR・Visionタスク（Pixtral）のための大規模言語モデル推論。送信されたテキストまたは画像はMistralに推論のため送信されます。Mistralは契約上、API入力をモデルのトレーニングに使用しないことを約束しています。",
              "**VirusTotal**（Google LLC、米国）：ウイルススキャナーを使用する場合のみ。ファイル自体は送信されず、SHA-256ハッシュのみ送信されます。",
              "**Google Safe Browsing**（Google LLC、米国）：URLスキャナーまたはフィッシング検出器を使用する場合のみ。送信されるのは入力したURL文字列（またはメールに貼り付けたリンク）のみです。",
              "**Stripe**（米国 / アイルランド）：決済処理およびサブスクリプション管理。当社は**カード情報を一切見ることも保存することもありません**。Stripeはメールアドレス、決済方法、購入したプラン・クレジットパックを受領します。",
              "**Resend**（米国）：トランザクションメール配信（アカウント確認、支払い領収書、パスワードリセット）。メールアドレスと当社が送信するメール本文を受領します。",
              "**Vercel**（米国）：静的ページのコンテンツデリバリーネットワーク。ルーティングおよび悪用防止のための標準的なウェブトラフィックメタデータ（IP、ユーザーエージェント、リクエストURL）を受領します。Vercelのログ保持ポリシーに従って保持されます。"
            ]
          },
          {
            "kind": "p",
            "text": "これらのプロセッサのうち、欧州経済領域外で運営されるものは、欧州委員会の標準契約条項（SCCs）または同等の移転メカニズムにより、移転が規制されています。"
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
              "**必須**：NEXT_LOCALE（選択した言語の記憶）、サインイン時にSupabaseセッションCookie（sb-*-auth-token）。これらはGDPR上、同意を必要としません。",
              "**任意の広告**：広告パートナー（現在コード内でEzoicが参照されていますが、お客様のトラフィックではまだ有効化されていません）を有効化する場合、明確な同意バナーを表示し、オプトイン後にのみ広告Cookieを設定します。"
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
        "title": "9. セキュリティ",
        "blocks": [
          {
            "kind": "p",
            "text": "本サービスへのすべてのトラフィックはTLS 1.2以上で暗号化されています。パスワードはSupabase AuthによりArgon2ハッシュとして保存されます。当社は新しいパスワードをHaveIBeenPwned k匿名APIとクライアントサイドで照合し、既知の漏洩パスワードは使用できないようにしています。APIキーはSHA-256ハッシュとしてのみ保存されます。データベース行は行レベルセキュリティポリシーにより保護され、ユーザーは他のユーザーのデータを読み取ることができません。これらの対策にもかかわらず、いかなるシステムも完全に安全ではないため、お客様はオンラインサービスに固有の残存リスクを受け入れるものとします。"
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
              "プロフィールデータ：アカウントが存在する間保持され、アカウント削除から30日以内に削除されます。",
              "ジョブメタデータ：2時間後に自動的に消去されます。",
              "ストレージバケット内の結果ファイル：生成から30分以内に物理的に削除されます。",
              "請求記録：フランスの税法（通常10年間）に準拠するため、10年間保持されます。",
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
            "text": "本サービスは**16歳未満の児童を対象としていません**。16歳未満の方はアカウントを作成できません。当社は故意に未成年者からデータを収集することはありません。万一収集したことが判明した場合は、直ちに削除します。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. ポリシーの変更",
        "blocks": [
          {
            "kind": "p",
            "text": "当社は本プライバシーポリシーを随時改定する場合があります。実質的な変更については、効力発生の少なくとも30日前にアカウント保持者にメールで通知します。最新版は常に[https://konvertools.com/privacy](https://konvertools.com/privacy)でご確認いただけます。"
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. お問い合わせ",
        "blocks": [
          {
            "kind": "p",
            "text": "本ポリシーまたはお客様のデータに関するご質問は、[privacy@konvertools.com](mailto:privacy@konvertools.com)までご連絡ください。また、フランスのデータ保護当局（CNIL、[cnil.fr](https://www.cnil.fr/)）または居住地の監督機関に苦情を申し立てることもできます。"
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
            "text": "Konvertools（以下称“服务”）作为一款以隐私优先的工具包运营。我们做出的最重要承诺如下："
          },
          {
            "kind": "ul",
            "items": [
              "**仅在浏览器中运行的工具**（图像转换器、使用 pdf-lib 的 PDF 工具、由 FFmpeg.wasm 驱动的音频和视频转换、代码工具、计算器、二维码生成器、大多数实用工具）会**完全在您的网页浏览器中通过 WebAssembly 执行**。您的文件永远不会传输到我们的服务器。我们无法从技术上读取它。",
              "**服务器辅助工具**（AI 转录、AI 翻译、AI 文本任务、烧录视频字幕、病毒扫描器、URL 扫描器、钓鱼检测器及少数其他工具）需要将内容发送至后端。在所有情况下，文件或文本均会实时处理，并在以下情况下被删除：（a）临时存储中的内容会在三十（30）分钟内删除，或（b）——对于病毒扫描器——根本不会传输（仅您的设备会发送文件的 SHA-256 哈希值）。",
              "我们永远不会在任何持久位置存储上传文件的内容，永远不会使用您的上传内容训练 AI 模型，也永远不会出于任何目的（除为您提供所请求的结果外）出售、出租或与第三方共享这些内容。"
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
            "text": "根据《欧盟通用数据保护条例》（第(EU) 2016/679 号条例，“GDPR”），数据控制者为服务的发布者。如有任何隐私咨询，请联系：[privacy@konvertools.com](mailto:privacy@konvertools.com)。"
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
              "**账户凭据**：您的电子邮件地址；加盐哈希后的密码副本（由 Supabase Auth 管理——我们永远不会看到或存储明文密码）；如果您使用 Google 登录，还包括可选的显示名称和头像 URL。",
              "**订阅状态**：当前套餐（免费/专业版/商业版）、Stripe 客户标识符、当前信用额度以及您最近续费的日期。",
              "**使用计数器**：聚合配额计数器（例如“今日已使用 3 次 AI 运行”、“本月已使用 420 次 AI 运行”），在您的个人资料行中就地更新。我们**不会**记录每次运行的详细记录。",
              "**作业元数据（临时）**：当服务器辅助工具生成输出（例如从转录生成 .srt 文件）时，我们会记录工具名称、结果下载 URL、源语言和完成时间戳。这些行会在**两（2）小时**后自动清除。它们永远不会包含您文件的内容。",
              "**同意记录**：您接受本条款及我们的隐私政策的日期和时间，以及您是否选择接收营销邮件。这些记录会在您的账户存在期间保留，并在账户删除后继续保留五（5）年作为法律证据。",
              "**API 密钥**：如果您为公共 REST API 生成密钥，我们仅存储其 SHA-256 哈希值及 12 个字符的显示前缀。原始密钥仅在创建时向您显示一次，此后无法恢复。"
            ]
          },
          {
            "kind": "p",
            "text": "我们**不会**收集：您的 IP 地址（仅 Supabase 和我们的托管提供商用于速率限制和安全日志的临时使用除外）、浏览器指纹、行为追踪事件、屏幕录制内容或任何生物识别数据。"
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
              "**仅在浏览器中运行的工具**：零传输。文件由您的浏览器读入内存，结果在本地生成，您直接下载。我们不会记录有关文件本身的任何信息。",
              "**AI 转录/翻译/OCR/钓鱼分析**：文件或文本会流式传输至我们的 Supabase Edge Function，该函数会立即将其转发至相关 AI 提供商（见第 7 节）进行推理。结果会返回给您，临时上传缓冲区会被丢弃。写入我们私有存储桶的结果文件会生成供您访问的签名 URL，有效期为六十（60）分钟，并在生成后三十（30）分钟内物理删除。",
              "**病毒扫描器**：您的文件永远不会离开浏览器。我们在本地计算其 SHA-256 指纹，仅将生成的 64 字符哈希值发送至 VirusTotal。VirusTotal 无法从哈希值重建您的文件。",
              "**URL 扫描器**：仅传输您输入的 URL 字符串至 Google Safe Browsing。不会传输周围页面内容。"
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
              "**履行合同**（第 6(1)(b) 条）——当您创建账户并使用付费功能时，处理是提供服务所必需的。",
              "**合法利益**（第 6(1)(f) 条）——欺诈预防、滥用缓解、基本安全日志记录以及改进服务。",
              "**同意**（第 6(1)(a) 条）——营销邮件、可选的分析或广告 Cookie（如启用）以及任何未来的可选集成。",
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
            "text": "您享有以下权利：访问权（第 15 条）、更正权（第 16 条）、删除权（第 17 条）、限制权（第 18 条）、可携权（第 20 条）、反对权（第 21 条）以及随时撤回同意（无损于先前处理的合法性）。您还享有向法国数据保护局（CNIL）或您所在国家的监管机构投诉的权利。如需行使任何权利，请从您账户注册的邮箱发送邮件至 [privacy@konvertools.com](mailto:privacy@konvertools.com)。我们将在三十（30）天内响应，符合 GDPR 第 12(3) 条的要求。"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 第三方处理者",
        "blocks": [
          {
            "kind": "p",
            "text": "提供服务需要我们与以下处理者共享严格限制的数据。每个处理者都有自己的隐私政策，规定其如何处理从我们这里收到的数据。"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase**（新加坡注册，在欧盟为我们的项目托管）——身份验证、数据库、文件存储和 Edge Functions。接收您的账户凭据、个人资料数据以及（临时）您上传用于服务器辅助工具的任何文件。作为我们的分包处理者。",
              "**Mistral AI**（法国）——用于翻译、改写、摘要、AI 人性化、钓鱼模式分析及其他文本任务的大语言模型推理；音频转录（Voxtral）；图像 OCR 和视觉任务（Pixtral）。您提交的文本或图像会发送至 Mistral 进行推理。Mistral 已通过合同承诺**不会**将 API 输入用于训练其模型。",
              "**VirusTotal**（Google LLC，美国）——仅在您使用病毒扫描器时。仅传输您文件的 SHA-256 哈希值，永远不会传输文件本身。",
              "**Google Safe Browsing**（Google LLC，美国）——仅在您使用 URL 扫描器或钓鱼检测器时。仅传输您输入的 URL 字符串（或从您粘贴的邮件中提取的链接）。",
              "**Stripe**（美国/爱尔兰）——支付处理和订阅管理。我们**永远不会**看到或存储您的卡片详情。Stripe 接收您的电子邮件、支付方式以及您购买的套餐/信用包。",
              "**Resend**（美国）——交易邮件发送（账户确认、支付收据、密码重置）。接收您的电子邮件地址和我们发送的邮件正文。",
              "**Vercel**（美国）——静态页面的内容分发网络。接收标准网络流量元数据（IP、用户代理、请求 URL）用于路由和滥用预防。根据 Vercel 的日志保留政策保留。"
            ]
          },
          {
            "kind": "p",
            "text": "如上述任何处理者在欧洲经济区以外运营，数据传输受欧盟委员会《标准合同条款》（SCCs）或同等传输机制的约束。"
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
              "**必要 Cookie**：NEXT_LOCALE（记住您选择的语言）以及您登录时的 Supabase 会话 Cookie（sb-*-auth-token）。这些 Cookie 无需 GDPR 下的同意即可设置。",
              "**可选广告 Cookie**：如我们启用广告合作伙伴（当前代码中引用了 Ezoic，但尚未为您的流量激活），我们会显示明确的同意横幅，并在您选择加入后才设置广告 Cookie。"
            ]
          },
          {
            "kind": "p",
            "text": "我们目前不运行任何分析、追踪像素或重定向标签。如添加任何此类功能，上述 Cookie 横幅将对其进行管控。"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. 安全",
        "blocks": [
          {
            "kind": "p",
            "text": "所有流向服务的流量均使用 TLS 1.2 或更高版本加密。密码由 Supabase Auth 以 Argon2 哈希形式存储。我们在客户端检查新密码是否存在于公开的 HaveIBeenPwned k-匿名 API 中，因此已知泄露的密码无法使用。API 密钥仅以 SHA-256 哈希形式存储。数据库行受行级安全策略保护，确保一个用户无法读取另一个用户的数据。尽管采取了这些措施，但没有任何系统是绝对安全的；您接受任何在线服务固有的剩余风险。"
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
              "同意记录：在您的账户存在期间保留，并在删除后继续保留五（5）年作为法律证据。"
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
            "text": "本服务**不针对十六（16）岁以下儿童**。如您未满该年龄，请勿创建账户。我们不会故意收集未成年人的数据；如发现此类情况，我们会立即删除。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. 政策变更",
        "blocks": [
          {
            "kind": "p",
            "text": "我们可能会不时修订本隐私政策。重大变更将至少提前三十（30）天通过邮件通知账户持有人。最新版本始终可在 [https://konvertools.com/privacy](https://konvertools.com/privacy) 获取。"
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. 联系方式",
        "blocks": [
          {
            "kind": "p",
            "text": "如对本政策或您的数据有任何疑问，请发送邮件至 [privacy@konvertools.com](mailto:privacy@konvertools.com)。您还可以向法国数据保护局（CNIL，[cnil.fr](https://www.cnil.fr/)）或您所在国家的监管机构投诉。"
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
        "title": "1. 핵심 원칙: 저희는 귀하의 파일을 보관하지 않습니다",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools(이하 \"서비스\")는 프라이버시 우선 도구 키트로 운영됩니다. 저희가 가장 중요하게 약속드리는 단 하나의 원칙은 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**브라우저 기반 도구** (이미지 변환기, pdf-lib을 사용하는 PDF 도구, FFmpeg.wasm 기반 오디오/비디오 변환, 코드 도구, 계산기, QR 생성기, 대부분의 유틸리티)는 **웹어셈블리를 통해 웹 브라우저 내에서 완전히 실행됩니다**. 파일이 서버로 전송되지 않으며, 저희는 이를 읽을 기술적 수단이 없습니다.",
              "**서버 지원 도구** (AI 음성 변환, AI 번역, AI 텍스트 작업, 비디오 자막 삽입, 바이러스 스캐너, URL 스캐너, 피싱 감지 도구 등 소수)는 백엔드로 무언가를 전송해야 합니다. 모든 경우에 파일 또는 텍스트는 실시간으로 처리되며, (a) 임시 저장소에서 삼십(30) 분 이내 삭제되거나, (b) 바이러스 스캐너의 경우 — 파일 자체가 전송되지 않으며(장치에서 SHA-256 해시만 전송됨) 전혀 전송되지 않습니다.",
              "저희는 업로드된 파일의 내용을 영구 저장소에 보관하지 않으며, 업로드 파일을 AI 모델 학습에 사용하지 않으며, 요청하신 결과를 제공하는 목적 외에는 제3자와 공유, 임대 또는 판매하지 않습니다."
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
            "text": "EU 일반 데이터 보호 규정(GDPR, 규정(EU) 2016/679)상 데이터 관리자는 서비스 발행자입니다. 개인정보 관련 문의: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. 수집하는 정보",
        "blocks": [
          {
            "kind": "p",
            "text": "저희가 데이터베이스에 영구 보관하는 개인정보는 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**계정 인증 정보**: 이메일 주소; Supabase Auth에서 관리하는 암호의 솔트 처리 및 해시 복사본(원문은 확인하거나 저장하지 않음); Google 로그인 시 선택적 표시 이름 및 아바타 URL.",
              "**구독 상태**: 현재 플랜(무료 / Pro / Business), Stripe 고객 식별자, 현재 잔액, 가장 최근 갱신 일자.",
              "**사용량 카운터**: 집계된 할당량 카운터(예: \"오늘 AI 사용 3회\", \"월간 AI 사용 420회\")가 프로필 행에서 실시간으로 업데이트됩니다. **개별 실행 기록은 로그로 남기지 않습니다**.",
              "**작업 메타데이터(임시)**: 서버 지원 도구가 결과(예: 음성 변환으로 생성된 .srt 파일)를 생성할 경우, 도구 이름, 결과 다운로드 URL, 소스 언어, 완료 타임스탬프를 기록합니다. 이러한 행은 **이시간(2시간) 후 자동으로 삭제**됩니다. 파일 내용은 포함되지 않습니다.",
              "**동의 기록**: 본 약관 및 개인정보 보호정책을 수락한 일시와 마케팅 이메일 수신 동의 여부를 기록합니다. 계정 삭제 후 5년간 법적 증거 보관 기간을 포함하여 계정 보유 기간 동안 보관됩니다.",
              "**API 키**: 공개 REST API용 키를 생성할 경우, SHA-256 해시와 12자 접두사만 저장합니다. 원본 키는 생성 시 한 번만 표시되며 이후 복구할 수 없습니다."
            ]
          },
          {
            "kind": "p",
            "text": "저희는 **다음 정보는 수집하지 않습니다**: IP 주소(서버리스 및 호스팅 제공업체의 보안 로깅 및 속도 제한용 임시 사용 제외), 브라우저 핑거프린트, 행동 추적 이벤트, 화면 녹화, 생체 인식 데이터 등."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. 처리하는 파일",
        "blocks": [
          {
            "kind": "p",
            "text": "1항에서 언급한 바와 같이, 처리하는 파일의 내용은 저희가 영구 보관하지 않습니다. 구체적인 수명 주기는 다음과 같습니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**브라우저 기반 도구**: 전송 없음. 파일이 브라우저에 메모리로 읽혀지고 결과가 로컬에서 생성되며, 직접 다운로드합니다. 파일에 대한 로그는 남기지 않습니다.",
              "**AI 음성 변환 / 번역 / OCR / 피싱 분석**: 파일 또는 텍스트가 Supabase Edge Function으로 스트리밍되어 관련 AI 제공업체(7항 참조)로 즉시 전달됩니다. 결과가 반환되고 임시 업로드 버퍼가 삭제됩니다. 개인 저장소 버킷에 작성된 결과 파일은 60분 동안 서명된 URL로 접근 가능하며, 생성 후 삼십(30) 분 이내 물리적으로 삭제됩니다.",
              "**바이러스 스캐너**: 파일이 브라우저를 떠나지 않습니다. 로컬에서 SHA-256 지문을 계산하여 64자 해시만 VirusTotal로 전송합니다. VirusTotal은 해시로부터 파일을 복원할 수 없습니다.",
              "**URL 스캐너**: Google Safe Browsing으로 전송되는 것은 입력한 URL 문자열뿐입니다. 주변 페이지 내용은 전송되지 않습니다."
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
              "**법적 의무** (Art. 6(1)(c)) — 프랑스 세법(일반적으로 10년)상 세금 기록 보관을 위한 청구 기록 보관."
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
            "text": "귀하는 접근(Art. 15), 정정(Art. 16), 삭제(Art. 17), 제한(Art. 18), 이전(Art. 20), 이의 제기(Art. 21) 권리와 언제든지 동의를 철회할 권리가 있으며,此之前의 처리의 적법성은 영향을 받지 않습니다. 또한 프랑스 CNIL(또는 거주국의 감독 기관)에 민원을 제기할 권리가 있습니다. 권리를 행사하려면 계정에 등록된 이메일로 [privacy@konvertools.com](mailto:privacy@konvertools.com)으로 문의하시면 됩니다. GDPR Art. 12(3)에 따라 삼십(30)일 이내에 답변드리겠습니다."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. 제3자 처리업체",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스 제공을 위해 다음과 같은 제3자 처리업체와 엄격히 제한된 데이터를 공유해야 합니다. 각 업체는 저희로부터 받은 데이터를 처리하는 방식에 대한 자체 개인정보 보호정책을 보유하고 있습니다."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (싱가포르 법인, EU 내 호스팅) — 인증, 데이터베이스, 파일 저장소, Edge Functions. 계정 인증 정보, 프로필 데이터 및 서버 지원 도구용 파일(임시)을 수신합니다. 저희의 하위 처리업체로 활동합니다.",
              "**Mistral AI** (프랑스) — 번역, 재구성, 요약, AI 인간화, 피싱 패턴 분석 등 텍스트 작업 및 음성 변환(Voxtral), 이미지 OCR 및 Vision 작업(Pixtral)을 위한 대형 언어 모델 추론. 제출한 텍스트 또는 이미지가 추론용으로 Mistral로 전송됩니다. Mistral은 API 입력이 모델 학습에 사용되지 않겠다는 계약을 체결했습니다.",
              "**VirusTotal** (Google LLC, 미국) — 바이러스 스캐너 사용 시에만 해당됩니다. 파일 자체는 전송되지 않으며, 장치에서 SHA-256 해시만 전송됩니다.",
              "**Google Safe Browsing** (Google LLC, 미국) — URL 스캐너 또는 피싱 감지 도구 사용 시에만 해당됩니다. 제출한 URL 문자열(또는 이메일에 포함된 링크)만 전송됩니다.",
              "**Stripe** (미국 / 아일랜드) — 결제 처리 및 구독 관리. **카드 정보는 확인하거나 저장하지 않습니다**. Stripe는 이메일, 결제 수단, 구매한 플랜/크레딧 팩을 수신합니다.",
              "**Resend** (미국) — 트랜잭션 이메일 전달(계정 확인, 결제 영수증, 비밀번호 재설정). 이메일 주소와 저희가 보낸 이메일 본문을 수신합니다.",
              "**Vercel** (미국) — 정적 페이지용 콘텐츠 전달 네트워크. 라우팅 및 남용 방지를 위한 표준 웹 트래픽 메타데이터(IP, 사용자 에이전트, 요청 URL)를 수신합니다. Vercel의 로그 보관 정책에 따라 보관됩니다."
            ]
          },
          {
            "kind": "p",
            "text": "이들 처리업체 중 유럽 경제 지역(EAA) 외에서 운영되는 경우, 전송은 유럽 위원회의 표준 계약 조항(SCCs) 또는 동등한 전송 메커니즘에 따라 규제됩니다."
          }
        ]
      },
      {
        "id": "cookies",
        "title": "8. 쿠키 및 유사 기술",
        "blocks": [
          {
            "kind": "p",
            "text": "저희는 다음 쿠키 및 로컬 스토리지 항목만 사용합니다:"
          },
          {
            "kind": "ul",
            "items": [
              "**필수**: NEXT_LOCALE(선택한 언어 기억), 로그인 시 Supabase 세션 쿠키(sb-*-auth-token). GDPR상 동의가 필요하지 않습니다.",
              "**선택적 광고**: 광고 파트너(Ezoic가 코드에 참조되어 있지만 현재 귀하의 트래픽에는 활성화되지 않음)를 사용할 경우, 명확한 동의 배너를 표시하고 동의 후 광고 쿠키만 설정합니다."
            ]
          },
          {
            "kind": "p",
            "text": "현재 분석, 추적 픽셀 또는 재마케팅 태그는 실행하지 않습니다. 추가 시 쿠키 배너에서 제어됩니다."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. 보안",
        "blocks": [
          {
            "kind": "p",
            "text": "서비스와의 모든 트래픽은 TLS 1.2 이상으로 암호화됩니다. 암호는 Supabase Auth에서 Argon2 해시로 저장됩니다. 공개 HaveIBeenPwned k-익명 API를 클라이언트 측에서 확인하여 알려진 유출 암호는 사용할 수 없습니다. API 키는 SHA-256 해시로만 저장됩니다. 데이터베이스 행은 행 수준 보안 정책으로 보호되어 한 사용자가 다른 사용자의 데이터를 읽을 수 없습니다. 이러한 조치에도 불구하고 온라인 서비스의 잔존 위험을 수용합니다."
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
              "동의 기록: 계정 보유 기간 및 삭제 후 5년간 법적 증거로 보관."
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
            "text": "서비스는 **만 16세 미만 아동을 대상으로 하지 않습니다**. 해당 연령 미만이라면 계정을 생성할 수 없습니다. 미성년자의 데이터를 고의로 수집하지 않으며, 실수로 수집된 경우 삭제하겠습니다."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. 정책 변경",
        "blocks": [
          {
            "kind": "p",
            "text": "저희는 때때로 개인정보 보호정책을 개정할 수 있습니다. 실질적인 변경 사항은 유효 30일 전에 계정 보유자에게 이메일로 공지됩니다. 최신 버전은 항상 [https://konvertools.com/privacy](https://konvertools.com/privacy)에서 확인할 수 있습니다."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. 문의",
        "blocks": [
          {
            "kind": "p",
            "text": "본 정책 또는 귀하의 데이터에 대한 문의는 [privacy@konvertools.com](mailto:privacy@konvertools.com)으로 문의하시면 됩니다. 프랑스 데이터 보호 당국(CNIL, [cnil.fr](https://www.cnil.fr/)) 또는 거주국의 감독 기관에 민원도 제기할 수 있습니다."
          }
        ]
      }
    ]
  },
  "ar": {
    "h1": "سياسة الخصوصية",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "آخر تحديث: %DATE% · سارية المفعول فورًا لجميع الزوار وحاملي الحسابات.",
    "sections": [
      {
        "id": "principle",
        "title": "1. المبدأ الأساسي لدينا: نحن لا نحتفظ بملفاتك",
        "blocks": [
          {
            "kind": "p",
            "text": "يتم تشغيل **Konvertools** (الخدمة) كأداة خصوصية في المقام الأول. الالتزام الأكثر أهمية الذي نقدمه هو هذا:"
          },
          {
            "kind": "ul",
            "items": [
              "**أدوات تعمل فقط في المتصفح** (م converters الصور، أدوات PDF التي تستخدم pdf-lib، تحويلات الصوت والفيديو التي تعمل بواسطة FFmpeg.wasm، أدوات الترميز، الآلات الحاسبة، مولدات QR، معظم الأدوات الأخرى) تعمل **كاملة داخل متصفحك عبر WebAssembly**. لم يتم إرسال ملفك إلى خوادمنا أبدًا. ليس لدينا وسائل فنية لقراءته.",
              "**أدوات بمساعدة الخادم** (النسخ التلقائي بواسطة الذكاء الاصطناعي، الترجمة بواسطة الذكاء الاصطناعي، المهام النصية بواسطة الذكاء الاصطناعي، إضافة ترجمات فيديو محروقة، الفحص antivirus، فحص الروابط، كاشف التصيد، وعدد قليل من الأدوات الأخرى) تحتاج إلى إرسال شيء إلىBackend. في كل حالة، تتم معالجة الملف أو النص في الوقت الفعلي ويتم إما (أ) حذفه من التخزين المؤقت خلال ثلاثين (30) دقيقة، أو (ب) — بالنسبة لفحص antivirus — عدم إرساله نهائيًا (يتم إرسال SHA-256 فقط من الملف خارج جهازك).",
              "نحن لا نقوم أبدًا بتخزين محتوى أي ملف تم تحميله في أي موقع دائم، ولا نستخدم ملفاتك لتدريب نماذج الذكاء الاصطناعي، ولا نبيعها أو نؤجرها أو نشاركها مع أطراف ثالثة لأي غرض سوى تقديم النتيجة التي طلبتها."
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
            "text": "لأغراض لائحة الاتحاد الأوروبي العامة لحماية البيانات (Regulation (EU) 2016/679، \"GDPR\")، مسؤول البيانات هو الناشر للخدمة. للتواصل بشأن أي استفسار يتعلق بالخصوصية: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**بيانات اعتماد الحساب**: عنوان بريدك الإلكتروني؛ نسخة مشفرة ومملحة من كلمة المرور (تدار بواسطة Supabase Auth — نحن لا نرى أو نخزن النصPlain)؛ الاسم الظاهري وعنوان صورة الملف الشخصي إذا قمت بتسجيل الدخول باستخدام Google.",
              "**حالة الاشتراك**: الخطة الحالية (مجاني / Pro / Business)، المعرف العميل لـ Stripe، رصيدك الحالي، وتواريخ أحدث تجديداتك.",
              "**عدادات الاستخدام**: عدادات الحصة المجمعة (مثل \"تم استخدام 3 من عمليات الذكاء الاصطناعي اليوم\"، \"تم استخدام 420 من عمليات الذكاء الاصطناعي شهريًا\") يتم تحديثها في مكانها على صفك الشخصي. نحن **لا نقوم** بتسجيل سجلات لكل عملية.",
              "**بيانات تعريف الوظيفة (عابرة)**: عند إنتاج أداة بمساعدة الخادم مخرجًا (مثل ملف .srt من النسخ التلقائي)، نقوم بتسجيل اسم الأداة، رابط تنزيل النتيجة، اللغة المصدر، وتوقيت الإكمال. تتم إزالة هذه الصفوف تلقائيًا بعد **ساعتين (2)**. لا تحتوي أبدًا على محتوى ملفك.",
              "**سجلات الموافقة**: التاريخ والوقت اللذين وافقت فيهما على هذه الشروط وسياسة الخصوصية لدينا، وما إذا كنت قد اخترت الاشتراك في رسائل البريد الإلكتروني التسويقية. يتم الاحتفاظ بها طوال مدة حسابك بالإضافة إلى فترة أدلة قانونية مدتها خمس (5) سنوات بعد الحذف.",
              "**مفاتيح API**: إذا قمت بإنشاء مفاتيح لواجهة برمجة التطبيقات العامة (REST API)، فإننا نقوم بتخزين SHA-256 فقط والبادئة العرضية المكونة من 12 حرفًا. يتم عرض المفتاح الخام لك مرة واحدة فقط عند الإنشاء ولا يمكن استرداده لاحقًا."
            ]
          },
          {
            "kind": "p",
            "text": "نحن **لا نقوم** بجمع: عنوان IP الخاص بك (بخلاف الاستخدام المؤقت الذي يقوم به Supabase ومزود الاستضافة لدينا لأغراض الحد من المعدل وتسجيلات الأمان)، بصمة متصفحك، أحداث التتبع السلوكي، تسجيلات شاشتك، أو أي بيانات حيوية."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. الملفات التي تقوم بمعالجتها",
        "blocks": [
          {
            "kind": "p",
            "text": "كما هو مذكور في القسم 1، فإن محتويات الملفات التي تقوم بمعالجتها لا يتم الاحتفاظ بها منا أبدًا. الدورة الحياتية الدقيقة هي:"
          },
          {
            "kind": "ul",
            "items": [
              "**أدوات تعمل فقط في المتصفح**: لا يوجد إرسال. يتم قراءة الملف إلى ذاكرة المتصفح، ويتم إنتاج النتيجة محليًا، وتقوم بتنزيلها مباشرة. لا نقوم بتسجيل أي شيء عن الملف نفسه.",
              "**النسخ التلقائي / الترجمة / OCR / تحليل التصيد**: يتم إرسال الملف أو النص إلى دالة Edge الخاصة بنا في Supabase، والتي تقوم فورًا بإرساله إلى مزود الذكاء الاصطناعي ذي الصلة (انظر القسم 7) للاستدلال. يتم إرجاع النتيجة إليك ويتم التخلص من مخزن التحميل المؤقت. يتم الوصول إلى ملفات النتائج المكتوبة في دلو التخزين الخاص بنا عبر روابط موقعة لمدة ستين (60) دقيقة ويتم حذفها ماديًا خلال ثلاثين (30) دقيقة من التوليد.",
              "**فحص antivirus**: لم يغادر ملفك متصفحك أبدًا. نقوم بحساب بصمة SHA-256 الخاصة به محليًا ولا نقوم بإرسال سوى النتيجة المكونة من 64 حرفًا إلى VirusTotal. لا يمكن لـ VirusTotal إعادة بناء ملفك من بصمته.",
              "**فحص الروابط**: يتم إرسال سلسلة URL التي تقوم بكتابتها فقط إلى Google Safe Browsing. لا يتم إرسال محتويات الصفحة المحيطة."
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
              "**الالتزام القانوني** (المادة 6(1)(ج)) — الاحتفاظ بسجلات الفواتير وفقًا للقانون الضريبي الفرنسي (عادة عشر سنوات)."
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
            "text": "لديك حقوق الوصول (المادة 15)، التصحيح (المادة 16)، الحذف (المادة 17)، التقييد (المادة 18)، النقل (المادة 20)، الاعتراض (المادة 21) وسحب الموافقة في أي وقت دون التأثير على قانونية المعالجة السابقة. لديك أيضًا الحق في تقديم شكوى إلى CNIL (فرنسا) أو السلطة الإشرافية المحلية الخاصة بك. لممارسة أي حق، قم بإرسال بريد إلكتروني إلى [privacy@konvertools.com](mailto:privacy@konvertools.com) من العنوان المسجل في حسابك. سنرد خلال ثلاثين (30) يومًا، وفقًا للمادة 12(3) من GDPR."
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
              "**Supabase** (مؤسسة في سنغافورة، مستضافة في الاتحاد الأوروبي لمشروعنا) — المصادقة، قاعدة البيانات، تخزين الملفات، ودوال Edge. يستقبل بيانات اعتماد حسابك، بياناتك الشخصية وأي ملف تقوم بتحميله لأداة بمساعدة الخادم. يعمل كمعالج فرعي لنا.",
              "**Mistral AI** (فرنسا) — استدلال نماذج اللغة الكبيرة للترجمة، إعادة الصياغة، التلخيص، إنسنة النص، تحليل أنماط التصيد، والمهام النصية الأخرى؛ النسخ التلقائي للصوت (Voxtral)؛ OCR للصور ومهام الرؤية (Pixtral). يتم إرسال النص أو الصورة التي تقدمها إلى Mistral للاستدلال. تعهد Mistral بموجب عقد **بعدم استخدام** مدخلات API لتدريب نماذجها.",
              "**VirusTotal** (Google LLC، الولايات المتحدة الأمريكية) — فقط عند استخدامك لفحص antivirus. يتم إرسال SHA-256 فقط من ملفك، وليس الملف نفسه.",
              "**Google Safe Browsing** (Google LLC، الولايات المتحدة الأمريكية) — فقط عند استخدامك لفحص الروابط أو كاشف التصيد. يتم إرسال الروابط التي تقدمها (أو الروابط المستخرجة من البريد الإلكتروني الذي تلصقه) فقط.",
              "**Stripe** (الولايات المتحدة الأمريكية / أيرلندا) — معالجة الدفع وإدارة الاشتراكات. نحن **لا نرى أو نخزن** تفاصيل بطاقتك. يستقبل Stripe بريدك الإلكتروني، وسيلة الدفع، والخطة/الحزمة الائتمانية التي اشتريتها.",
              "**Resend** (الولايات المتحدة الأمريكية) — تسليم البريد الإلكتروني المعاملاتي (تأكيد الحساب، إيصالات الدفع، إعادة تعيين كلمة المرور). يستقبل عنوان بريدك الإلكتروني وجسم البريد الإلكتروني الذي نرسله.",
              "**Vercel** (الولايات المتحدة الأمريكية) — شبكة توصيل محتوى للصفحات الثابتة. يستقبل بيانات تعريف حركة الويب القياسية (IP، وكيل المستخدم، URL المطلوب) للتوجيه ومنع سوء الاستخدام. يتم الاحتفاظ بها وفقًا لسياسة الاحتفاظ بسجلات Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "عندما يعمل أي من هذه المعالجين خارج المنطقة الاقتصادية الأوروبية، تتم إدارة التحويلات بموجب الشروط التعاقدية القياسية (SCCs) للجنة الأوروبية أو آلية نقل مكافئة."
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
              "**أساسية**: NEXT_LOCALE (يتذكر اللغة التي اخترتها)، وملفات تعريف الارتباط الخاصة بجلسة Supabase (sb-*-auth-token) عند تسجيل الدخول. لا تتطلب موافقة بموجب GDPR.",
              "**إعلانية اختيارية**: إذا قمنا بتمكين شركاء الإعلانات (يتم الإشارة إلى Ezoic حاليًا في الكود لدينا ولكن لم يتم تفعيله بعد لحركة المرور الخاصة بك)، سنعرض لافتة موافقة واضحة ولن نضع ملفات تعريف الارتباط الإعلانية إلا بعد موافقتك."
            ]
          },
          {
            "kind": "p",
            "text": "نحن لا نقوم حاليًا بتشغيل أي تحليلات أو وحدات تتبع أو علامات إعادة تسويق. إذا أضفنا أيًا منها، ستتحكم لافتة الموافقة أعلاه فيها."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. الأمان",
        "blocks": [
          {
            "kind": "p",
            "text": "يتم تشفير جميع حركة المرور إلى الخدمة ومنهاعبر TLS 1.2 أو أعلى. يتم تخزين كلمات المرور كهاشات Argon2 بواسطة Supabase Auth. نقوم بفحص كلمات المرور الجديدة مقابل واجهة برمجة التطبيقات العامة HaveIBeenPwned API من جانب العميل، بحيث لا يمكن استخدام كلمة مرور معروفة تم اختراقها. يتم تخزين مفاتيح API فقط كهاشات SHA-256. تتم حماية صفوف قاعدة البيانات بسياسات أمان على مستوى الصفوف تضمن عدم قدرة مستخدم على قراءة بيانات مستخدم آخر. على الرغم من هذه الإجراءات، لا يوجد نظام آمن تمامًا؛ أنت تقبل المخاطر المتبقية الكامنة في أي خدمة عبر الإنترنت."
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
              "بيانات الملف الشخصي: محفوظة طوال مدة حسابك، ويتم حذفها خلال ثلاثين (30) يومًا من إغلاق الحساب.",
              "بيانات تعريف الوظيفة: تتم إزالتها تلقائيًا بعد ساعتين (2).",
              "ملفات النتائج في دلو التخزين: يتم حذفها ماديًا خلال ثلاثين (30) دقيقة من التوليد.",
              "سجلات الفواتير: محفوظة لمدة عشر (10) سنوات للامتثال للالتزامات الضريبية الفرنسية.",
              "سجلات الموافقة: محفوظة طوال مدة حسابك بالإضافة إلى خمس (5) سنوات بعدها كدليل قانوني."
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
            "text": "الخدمة **غير موجهة للأطفال دون سن السادسة عشرة (16)**. إذا كنت دون هذا السن، يجب ألا تنشئ حسابًا. نحن لا نجمع بيانات القصر عن علم؛ إذا أصبحنا على علم بذلك، سنقوم بحذفها."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. التغييرات على هذه السياسة",
        "blocks": [
          {
            "kind": "p",
            "text": "قد نقوم بتعديل سياسة الخصوصية هذه من وقت لآخر. سيتم الإعلان عن التغييرات الجوهرية عبر البريد الإلكتروني لحاملي الحسابات قبل ثلاثين (30) يومًا على الأقل من سريان مفعولها. النسخة الأحدث متاحة دائمًا على [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. الاتصال",
        "blocks": [
          {
            "kind": "p",
            "text": "للإجابة على أي سؤال حول هذه السياسة أو بياناتك، اكتب إلى [privacy@konvertools.com](mailto:privacy@konvertools.com). يمكنك أيضًا تقديم شكوى إلى الهيئة الفرنسية لحماية البيانات (CNIL، [cnil.fr](https://www.cnil.fr/)) أو إلى السلطة الإشرافية في بلد إقامتك."
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
              "**Инструменты, работающие только в браузере** (конвертеры изображений, инструменты для работы с PDF, использующие pdf-lib, аудио- и видеоконвертеры на основе FFmpeg.wasm, инструменты для работы с кодом, калькуляторы, генераторы QR-кодов, большинство утилит) выполняются **полностью внутри вашего веб-браузера через WebAssembly**. Ваш файл никогда не передаётся на наши серверы. У нас нет технической возможности его прочитать.",
              "**Инструменты с серверной поддержкой** (AI-транскрибирование, AI-перевод, AI-обработка текста, наложение субтитров на видео, сканер вирусов, сканер URL, детектор фишинга и некоторые другие) требуют отправки данных на бэкенд. В каждом случае файл или текст обрабатывается в режиме реального времени, и либо (a) удаляется из временного хранилища в течение тридцати (30) минут, либо (b) — для сканера вирусов — вообще не передаётся (на ваше устройство отправляется только SHA-256-хеш файла).",
              "Мы никогда не храним содержимое загруженных файлов в постоянном хранилище, не используем ваши загрузки для обучения моделей ИИ и не продаём, не сдаём в аренду и не передаём их третьим лицам ни для каких целей, кроме как для предоставления результата, который вы запросили."
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
            "text": "В соответствии с Положениями Европейского Союза о защите данных (Регламент (ЕС) 2016/679, «GDPR»), контролёром данных является издатель Сервиса. Для любых вопросов, связанных с конфиденциальностью, обращайтесь по адресу: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Учётные данные**: ваш адрес электронной почты; солёный и хешированный пароль (управляется Supabase Auth — мы не видим и не храним пароль в открытом виде); при входе через Google — необязательные отображаемое имя и URL аватара.",
              "**Статус подписки**: текущий тарифный план (бесплатный / Pro / Business), идентификатор клиента Stripe, текущий кредитный баланс и даты последних пополнений.",
              "**Счётчики использования**: агрегированные квоты (например, «3 AI-запуска сегодня», «420 AI-запусков за месяц»), обновляемые на уровне вашей учётной записи. Мы **не ведём запись отдельных запусков**.",
              "**Метаданные задач (временные)**: при обработке файла инструментом с серверной поддержкой (например, получение .srt из транскрибирования) мы записываем название инструмента, URL для скачивания результата, исходный язык и время завершения. Эти записи автоматически удаляются через **два (2) часа**. Они не содержат содержимого вашего файла.",
              "**Записи согласий**: дата и время принятия вами настоящих Условий и нашей Политики конфиденциальности, а также информация о том, дали ли вы согласие на получение маркетинговых писем. Хранятся в течение срока существования вашей учётной записи плюс пять (5) лет после её удаления в качестве доказательства.",
              "**API-ключи**: если вы создаёте ключи для публичного REST API, мы храним только SHA-256-хеш и 12-символьный префикс для отображения. Сырые ключи показываются вам только один раз при создании и впоследствии невосстановимы."
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
            "text": "Как указано в разделе 1, содержимое файлов, которые вы обрабатываете, никогда не сохраняется нами. Точный жизненный цикл:"
          },
          {
            "kind": "ul",
            "items": [
              "**Инструменты, работающие только в браузере**: данные не передаются. Файл считывается в память вашим браузером, результат формируется локально, и вы скачиваете его напрямую. Мы не логируем информацию о самом файле.",
              "**AI-транскрибирование / перевод / OCR / анализ фишинга**: файл или текст потоково передаётся в нашу Supabase Edge Function, которая сразу же отправляет его соответствующему провайдеру ИИ (см. раздел 7) для инференса. Результат возвращается вам, а временный буфер загрузки удаляется. Результирующие файлы, записанные в наше частное хранилище, доступны вам по подписанным URL в течение шестидесяти (60) минут и физически удаляются в течение тридцати (30) минут после генерации.",
              "**Сканер вирусов**: ваш файл никогда не покидает браузер. Мы вычисляем его SHA-256-хеш локально и отправляем только этот 64-значный хеш в VirusTotal. VirusTotal не может восстановить ваш файл по его хешу.",
              "**Сканер URL**: передаётся только строка URL, которую вы вводите, в Google Safe Browsing. Никакие окружающие содержимое страницы не передаются."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. Правовые основания обработки (GDPR ст. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Исполнение договора** (ст. 6(1)(b)) — при создании учётной записи и использовании платных функций обработка необходима для предоставления Сервиса.",
              "**Законные интересы** (ст. 6(1)(f)) — предотвращение мошенничества, смягчение злоупотреблений, базовое логирование безопасности и улучшение Сервиса.",
              "**Согласие** (ст. 6(1)(a)) — маркетинговые письма, необязательные аналитические или рекламные cookies (если и когда включены), а также любые будущие необязательные интеграции.",
              "**Юридическое обязательство** (ст. 6(1)(c)) — хранение платёжных записей в соответствии с требованиями французского налогового законодательства (обычно десять лет)."
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
            "text": "Вы обладаете правами доступа (ст. 15), исправления (ст. 16), удаления (ст. 17), ограничения обработки (ст. 18), переносимости (ст. 20), возражения (ст. 21) и можете отозвать согласие в любое время без ущерба для законности предыдущей обработки. Вы также вправе подать жалобу в CNIL (Франция) или в местный надзорный орган. Для реализации любого права напишите на [privacy@konvertools.com](mailto:privacy@konvertools.com) с адреса, зарегистрированного в вашей учётной записи. Мы ответим в течение тридцати (30) дней в соответствии с требованиями ст. 12(3) GDPR."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Сторонние обработчики",
        "blocks": [
          {
            "kind": "p",
            "text": "Для предоставления Сервиса нам необходимо передавать строго ограниченные данные следующим обработчикам. У каждого из них есть своя политика конфиденциальности, регулирующая, как они обращаются с данными, полученными от нас."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (компания, зарегистрированная в Сингапуре, размещена в ЕС для нашего проекта) — аутентификация, база данных, файловое хранилище и Edge Functions. Получает ваши учётные данные, профильные данные и (временные) любой файл, загруженный для инструмента с серверной поддержкой. Выступает в роли нашего субподрядчика.",
              "**Mistral AI** (Франция) — инференс больших языковых моделей для перевода, перефразирования, суммаризации, «человечного» ИИ, анализа шаблонов фишинга и других текстовых задач; транскрибирование аудио (Voxtral); OCR и Vision для изображений (Pixtral). Текст или изображение, которые вы отправляете, передаются Mistral для инференса. Mistral по контракту **не использует входные данные API для обучения своих моделей**.",
              "**VirusTotal** (Google LLC, США) — только при использовании Сканера вирусов. Передаётся только SHA-256-хеш вашего файла, но не сам файл.",
              "**Google Safe Browsing** (Google LLC, США) — только при использовании Сканера URL или Детектора фишинга. Передаются только URL, которые вы вводите (или ссылки, извлечённые из письма, которое вы вставляете).",
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
              "**Необязательные рекламные**: если и когда мы подключаем партнёров по рекламе (в настоящее время в коде упоминается Ezoic, но пока не активирован для вашего трафика), мы будем отображать чёткое баннер согласия и устанавливать рекламные cookies только после вашего согласия."
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
            "text": "Вся связь с Сервисом и внутри него шифруется по протоколу TLS 1.2 или выше. Пароли хранятся в виде хешей Argon2 в Supabase Auth. Мы проверяем новые пароли на стороне клиента с помощью публичного API HaveIBeenPwned (k-анонимность), чтобы предотвратить использование известных скомпрометированных паролей. API-ключи хранятся только в виде SHA-256-хешей. Строки базы данных защищены политиками безопасности на уровне строк, что гарантирует, что один пользователь не может прочитать данные другого. Несмотря на эти меры, ни одна система не является абсолютно защищённой; вы принимаете на себя остаточные риски, inherent любым онлайн-сервисам."
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
              "Профильные данные: хранятся, пока существует ваша учётная запись, удаляются в течение тридцати (30) дней после её закрытия.",
              "Метаданные задач: автоматически удаляются через два (2) часа.",
              "Результирующие файлы в хранилище: физически удаляются в течение тридцати (30) минут после генерации.",
              "Платёжные записи: хранятся в течение десяти (10) лет для соблюдения французских налоговых обязательств.",
              "Записи согласий: хранятся в течение срока существования вашей учётной записи плюс пять (5) лет после её удаления в качестве доказательства."
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
            "text": "Мы можем время от времени вносить изменения в настоящую Политику конфиденциальности. Существенные изменения будут объявлены по электронной почте владельцам учётных записей не менее чем за тридцать (30) дней до их вступления в силу. Актуальная версия всегда доступна по адресу [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Контактная информация",
        "blocks": [
          {
            "kind": "p",
            "text": "По любым вопросам, связанным с этой политикой или вашими данными, пишите на [privacy@konvertools.com](mailto:privacy@konvertools.com). Вы также можете подать жалобу во французский орган по защите данных (CNIL, [cnil.fr](https://www.cnil.fr/)) или в надзорный орган вашей страны проживания."
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
            "text": "Konvertools (जिसे \"सेवा\" कहा जाता है) को एक गोपनीयता-प्रथम टूलकिट के रूप में संचालित किया जाता है। हमारा सबसे महत्वपूर्ण प्रतिबद्धता यह है:"
          },
          {
            "kind": "ul",
            "items": [
              "**ब्राउज़र-केवल टूल** (छवि कन्वर्टर्स, पीडीएफ टूल जो pdf-lib का उपयोग करते हैं, ऑडियो और वीडियो कन्वर्ज़न जो FFmpeg.wasm द्वारा संचालित होते हैं, कोड टूल, कैलकुलेटर्स, क्यूआर जनरेटर्स, अधिकांश उपयोगिताएँ) **पूरी तरह से आपके वेब ब्राउज़र के भीतर वेबअसेंबली के माध्यम से** निष्पादित होते हैं। आपकी फ़ाइल कभी भी हमारे सर्वरों पर प्रसारित नहीं होती। हमारे पास इसे पढ़ने का कोई तकनीकी साधन नहीं है।",
              "**सर्वर-सहायता प्राप्त टूल** (AI ट्रांसक्रिप्शन, AI अनुवाद, AI पाठ कार्य, वीडियो सबटाइटल बर्न-इन, वायरस स्कैनर, URL स्कैनर, फ़िशिंग डिटेक्टर और अन्य कुछ टूल) को बैकएंड पर कुछ भेजने की आवश्यकता होती है। प्रत्येक मामले में फ़ाइल या पाठ को वास्तविक समय में संसाधित किया जाता है और या तो (a) तीस (30) मिनट के भीतर अस्थायी संग्रहण से हटा दिया जाता है, या (b) — वायरस स्कैनर के लिए — बिल्कुल भी प्रसारित नहीं किया जाता (केवल फ़ाइल का SHA-256 हैश आपके डिवाइस से बाहर निकलता है)।",
              "हम कभी भी किसी अपलोड की गई फ़ाइल की सामग्री को किसी निरंतर स्थान पर संग्रहीत नहीं करते, हम आपके अपलोड का उपयोग AI मॉडलों को प्रशिक्षित करने के लिए नहीं करते, और हम उन्हें तीसरे पक्ष के साथ किसी भी उद्देश्य के लिए बेचते, किराए पर नहीं देते या साझा नहीं करते, सिवाय इसके कि आपको आपके द्वारा अनुरोधित परिणाम प्रदान किया जा सके।"
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
            "text": "यूरोपीय संघ के सामान्य डेटा संरक्षण विनियमन (विनियमन (ईयू) 2016/679, \"GDPR\") के उद्देश्यों के लिए, डेटा नियंत्रक सेवा के प्रकाशक हैं। किसी भी गोपनीयता पूछताछ के लिए संपर्क: [privacy@konvertools.com](mailto:privacy@konvertools.com)।"
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. हम क्या एकत्र करते हैं",
        "blocks": [
          {
            "kind": "p",
            "text": "हमारे डेटाबेस में हम जो एकमात्र व्यक्तिगत डेटा संग्रहीत करते हैं वह है:"
          },
          {
            "kind": "ul",
            "items": [
              "**खाता क्रेडेंशियल्स**: आपका ईमेल पता; आपके पासवर्ड की नमकीन, हैश की गई प्रति (Supabase Auth द्वारा प्रबंधित — हम कभी भी सादे पाठ को नहीं देखते या संग्रहीत नहीं करते); Google के साथ साइन इन करने पर वैकल्पिक प्रदर्शन नाम और अवतार URL।",
              "**सदस्यता स्थिति**: वर्तमान योजना (निःशुल्क / Pro / Business), Stripe ग्राहक पहचानकर्ता, वर्तमान क्रेडिट शेष राशि, और आपके नवीनतम नवीकरण की तिथियाँ।",
              "**उपयोग काउंटर्स**: एकत्रित कोटा काउंटर्स (उदाहरण के लिए, \"आज 3 AI रन उपयोग किए गए\", \"मासिक 420 AI रन उपयोग किए गए\") जिन्हें आपके प्रोफ़ाइल पंक्ति पर ही अपडेट किया जाता है। हम **प्रति-रन रिकॉर्ड लॉग नहीं करते**।",
              "**कार्य मेटाडेटा (अस्थायी)**: जब कोई सर्वर-सहायता प्राप्त टूल आउटपुट उत्पन्न करता है (उदाहरण के लिए, ट्रांसक्रिप्शन से .srt फ़ाइल), हम टूल का नाम, परिणाम डाउनलोड URL, स्रोत भाषा, और पूर्णता टाइमस्टैम्प रिकॉर्ड करते हैं। ये पंक्तियाँ स्वचालित रूप से **दो (2) घंटे बाद** हटा दी जाती हैं। इनमें कभी भी आपकी फ़ाइल की सामग्री शामिल नहीं होती।",
              "**सहमति रिकॉर्ड्स**: वह तिथि और समय जब आपने इन नियमों और हमारी गोपनीयता नीति को स्वीकार किया, और क्या आपने विपणन ईमेल के लिए ऑप्ट-इन किया। आपके खाते के विलोपन के बाद पाँच (5) वर्षों की कानूनी साक्ष्य अवधि सहित आपके खाते के दौरान संग्रहीत किए जाते हैं।",
              "**API कुंजियाँ**: यदि आप सार्वजनिक REST API के लिए कुंजियाँ उत्पन्न करते हैं, तो हम केवल SHA-256 हैश और 12-वर्ण प्रदर्शन उपसर्ग संग्रहीत करते हैं। कच्ची कुंजी आपको निर्माण के समय ठीक एक बार दिखाई जाती है और उसके बाद पुनर्प्राप्त करने योग्य नहीं होती।"
            ]
          },
          {
            "kind": "p",
            "text": "हम **निम्नलिखित एकत्र नहीं करते**: आपका IP पता (केवल अस्थायी उपयोग के अलावा जो Supabase और हमारे होस्टिंग प्रदाता दर-सीमित और सुरक्षा लॉगिंग के लिए करते हैं), आपका ब्राउज़र फ़िंगरप्रिंट, व्यवहार संबंधी ट्रैकिंग घटनाएँ, आपकी स्क्रीन रिकॉर्डिंग, या कोई जैव-मेट्रिक डेटा।"
          }
        ]
      },
      {
        "id": "files",
        "title": "4. फ़ाइलें जिन्हें आप संसाधित करते हैं",
        "blocks": [
          {
            "kind": "p",
            "text": "जैसा कि अनुभाग 1 में बताया गया है, आप द्वारा संसाधित फ़ाइलों की सामग्री को हम द्वारा कभी भी संग्रहीत नहीं किया जाता। सटीक जीवनचक्र इस प्रकार है:"
          },
          {
            "kind": "ul",
            "items": [
              "**ब्राउज़र-केवल टूल**: शून्य प्रसारण। फ़ाइल को आपके ब्राउज़र द्वारा मेमोरी में पढ़ा जाता है, परिणाम स्थानीय रूप से उत्पन्न होता है, और आप इसे सीधे डाउनलोड करते हैं। हम फ़ाइल के बारे में कुछ भी लॉग नहीं करते।",
              "**AI ट्रांसक्रिप्शन / अनुवाद / OCR / फ़िशिंग विश्लेषण**: फ़ाइल या पाठ को हमारे Supabase Edge Function पर स्ट्रीम किया जाता है, जो तुरंत इसे संबंधित AI प्रदाता (अनुभाग 7 देखें) को अनुमान के लिए अग्रेषित करता है। परिणाम आपको वापस कर दिया जाता है और अस्थायी अपलोड बफर को त्याग दिया जाता है। हमारी निजी संग्रहण बाल्टी में लिखे गए परिणाम फ़ाइलें आपको साठ (60) मिनट के लिए साइन-URL के माध्यम से सुलभ होती हैं और उत्पन्न होने के तीस (30) मिनट के भीतर भौतिक रूप से हटा दी जाती हैं।",
              "**वायरस स्कैनर**: आपकी फ़ाइल कभी भी आपके ब्राउज़र से बाहर नहीं जाती। हम स्थानीय रूप से इसका SHA-256 फ़िंगरप्रिंट कंप्यूट करते हैं और केवल resulting 64-वर्ण हैश को VirusTotal पर भेजते हैं। VirusTotal आपके हैश से आपकी फ़ाइल को पुनर्निर्माण नहीं कर सकता।",
              "**URL स्कैनर**: केवल वह URL स्ट्रिंग जिसे आप टाइप करते हैं, Google Safe Browsing को प्रसारित किया जाता है। आस-पास के पृष्ठ की सामग्री नहीं।"
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
              "**एक अनुबंध का निष्पादन** (Art. 6(1)(b)) — जब आप एक खाता बनाते हैं और सशुल्क सुविधाओं का उपयोग करते हैं, तो प्रसंस्करण सेवा प्रदान करने के लिए आवश्यक है।",
              "**वैध हित** (Art. 6(1)(f)) — धोखाधड़ी रोकथाम, दुरुपयोग शमन, बुनियादी सुरक्षा लॉगिंग, और सेवा में सुधार।",
              "**सहमति** (Art. 6(1)(a)) — विपणन ईमेल, वैकल्पिक विश्लेषण या विज्ञापन कुकीज़ (यदि और जब सक्षम किया जाता है), और भविष्य में किसी भी वैकल्पिक एकीकरण।",
              "**कानूनी दायित्व** (Art. 6(1)(c)) — फ्रांस के कर कानून (आमतौर पर दस वर्ष) द्वारा आवश्यक बिलिंग रिकॉर्ड्स का प्रतिधारण।"
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
            "text": "आपके पास पहुँच (Art. 15), सुधार (Art. 16), विलोपन (Art. 17), प्रतिबंध (Art. 18), पोर्टेबिलिटी (Art. 20), आपत्ति (Art. 21) और किसी भी समय सहमति वापस लेने का अधिकार है, जो पूर्व प्रसंस्करण की कानूनीता को प्रभावित नहीं करता। आपके पास फ्रांस के CNIL (फ्रांस) या अपने स्थानीय पर्यवेक्षी प्राधिकरण के पास शिकायत दर्ज करने का अधिकार भी है। किसी भी अधिकार का प्रयोग करने के लिए, अपने खाते पर पंजीकृत ईमेल से [privacy@konvertools.com](mailto:privacy@konvertools.com) पर ईमेल करें। हम GDPR Art. 12(3) द्वारा आवश्यक thirty (30) दिनों के भीतर उत्तर देंगे।"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. तृतीय-पक्ष प्रसंस्करणकर्ता",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा प्रदान करने के लिए हमें निम्नलिखित प्रसंस्करणकर्ताओं के साथ सीमित डेटा साझा करने की आवश्यकता होती है। प्रत्येक के पास अपना स्वयं का गोपनीयता नीति है जो यह नियंत्रित करती है कि वे हमारे द्वारा प्राप्त डेटा को कैसे संभालते हैं।"
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (सिंगापुर में निगमित, हमारे प्रोजेक्ट के लिए EU में होस्ट किया गया) — प्रमाणीकरण, डेटाबेस, फ़ाइल संग्रहण, और Edge Functions। आपके खाता क्रेडेंशियल्स, प्रोफ़ाइल डेटा और (अस्थायी रूप से) किसी भी सर्वर-सहायता प्राप्त टूल के लिए अपलोड की गई फ़ाइल प्राप्त करता है। हमारे उप-प्रसंस्करणकर्ता के रूप में कार्य करता है।",
              "**Mistral AI** (फ्रांस) — बड़े भाषा मॉडल अनुमान अनुवाद, पुनः-लेखन, सारांशीकरण, AI मानवीकरण, फ़िशिंग-पैटर्न विश्लेषण, और अन्य पाठ कार्य; ऑडियो ट्रांसक्रिप्शन (Voxtral); छवि OCR और Vision कार्य (Pixtral)। आपके द्वारा सबमिट किया गया पाठ या छवि अनुमान के लिए Mistral को भेजा जाता है। Mistral ने **API इनपुट का उपयोग अपने मॉडलों को प्रशिक्षित करने के लिए नहीं करने** का अनुबंधात्मक रूप से वचन दिया है।",
              "**VirusTotal** (Google LLC, USA) — केवल जब आप वायरस स्कैनर का उपयोग करते हैं। केवल आपकी फ़ाइल का SHA-256 हैश प्रसारित किया जाता है, कभी भी फ़ाइल स्वयं नहीं।",
              "**Google Safe Browsing** (Google LLC, USA) — केवल जब आप URL स्कैनर या फ़िशिंग डिटेक्टर का उपयोग करते हैं। केवल वही URL स्ट्रिंग जिसे आप टाइप करते हैं (या ईमेल में शामिल लिंक) प्रसारित किया जाता है।",
              "**Stripe** (USA / आयरलैंड) — भुगतान प्रसंस्करण और सदस्यता प्रबंधन। हम **आपके कार्ड विवरण कभी नहीं देखते या संग्रहीत नहीं करते**। Stripe को आपका ईमेल, भुगतान विधि, और आपने जो योजना/क्रेडिट-पैक खरीदा है, प्राप्त होता है।",
              "**Resend** (USA) — लेन-देन संबंधी ईमेल वितरण (खाता पुष्टि, भुगतान रसीदें, पासवर्ड रीसेट)। आपके ईमेल पते और ईमेल बॉडी जिसे हम भेजते हैं, प्राप्त करता है।",
              "**Vercel** (USA) — स्थैतिक पृष्ठों के लिए सामग्री वितरण नेटवर्क। रूटिंग और दुरुपयोग रोकथाम के लिए मानक वेब-ट्रैफ़िक मेटाडेटा (IP, user-agent, अनुरोधित URL) प्राप्त करता है। Vercel की लॉग प्रतिधारण नीति के अनुसार रखा जाता है।"
            ]
          },
          {
            "kind": "p",
            "text": "जहाँ इनमें से कोई भी प्रसंस्करणकर्ता यूरोपीय आर्थिक क्षेत्र के बाहर संचालित होता है, स्थानांतरण यूरोपीय आयोग के मानक अनुबंधीय खंडों (SCCs) या समकक्ष स्थानांतरण तंत्र द्वारा शासित होते हैं।"
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
              "**वैकल्पिक विज्ञापन**: यदि और जब हम विज्ञापन भागीदारों (वर्तमान में Ezoic हमारे कोड में संदर्भित है लेकिन आपके ट्रैफ़िक के लिए अभी सक्रिय नहीं है) को सक्षम करते हैं, तो हम एक स्पष्ट सहमति बैनर प्रदर्शित करेंगे और केवल तब विज्ञापन कुकीज़ सेट करेंगे जब आप ऑप्ट-इन करेंगे।"
            ]
          },
          {
            "kind": "p",
            "text": "हम वर्तमान में कोई विश्लेषण, ट्रैकिंग पिक्सेल या पुनः-लक्ष्यीकरण टैग नहीं चलाते। यदि हम कोई जोड़ते हैं, तो ऊपर दिया गया कुकी बैनर उन्हें नियंत्रित करेगा।"
          }
        ]
      },
      {
        "id": "security",
        "title": "9. सुरक्षा",
        "blocks": [
          {
            "kind": "p",
            "text": "सेवा में आने-जाने वाला सभी ट्रैफ़िक TLS 1.2 या उच्चतर के साथ एन्क्रिप्टेड है। पासवर्ड Supabase Auth द्वारा Argon2 हैश के रूप में संग्रहीत किए जाते हैं। हम नए पासवर्ड की जाँच सार्वजनिक HaveIBeenPwned k-अज्ञातता API के माध्यम से क्लाइंट-साइड करते हैं, ताकि एक ज्ञात-उल्लंघन वाले पासवर्ड का उपयोग नहीं किया जा सके। API कुंजियाँ केवल SHA-256 हैश के रूप में संग्रहीत की जाती हैं। डेटाबेस पंक्तियाँ पंक्ति-स्तरीय सुरक्षा नीतियों द्वारा संरक्षित हैं जो यह सुनिश्चित करती हैं कि एक उपयोगकर्ता दूसरे उपयोगकर्ता के डेटा को नहीं पढ़ सकता। इन उपायों के बावजूद, कोई भी प्रणाली पूर्ण रूप से सुरक्षित नहीं है; आप किसी भी ऑनलाइन सेवा के अंतर्निहित जोखिम को स्वीकार करते हैं।"
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. प्रतिधारण",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "प्रोफ़ाइल डेटा: आपके खाते के अस्तित्व के दौरान रखा जाता है, खाता बंद होने के तीस (30) दिनों के भीतर हटा दिया जाता है।",
              "कार्य मेटाडेटा: स्वचालित रूप से दो (2) घंटे बाद हटा दिया जाता है।",
              "संग्रहण बाल्टी में परिणाम फ़ाइलें: उत्पन्न होने के तीस (30) मिनट के भीतर भौतिक रूप से हटा दी जाती हैं।",
              "बिलिंग रिकॉर्ड्स: फ्रांस के कर दायित्वों का पालन करने के लिए दस (10) वर्षों तक बनाए रखे जाते हैं।",
              "सहमति रिकॉर्ड्स: आपके खाते के दौरान और उसके बाद पाँच (5) वर्षों तक कानूनी साक्ष्य के रूप में रखा जाता है।"
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
            "text": "सेवा **सोलह (16) वर्ष से कम उम्र के बच्चों के लिए निर्देशित नहीं है**। यदि आप इस आयु से कम हैं तो आपको खाता नहीं बनाना चाहिए। हम जानबूझकर नाबालिगों से डेटा एकत्र नहीं करते; यदि हमें पता चलता है कि हमने ऐसा किया है, तो हम इसे हटा देंगे।"
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. इस नीति में परिवर्तन",
        "blocks": [
          {
            "kind": "p",
            "text": "हम समय-समय पर इस गोपनीयता नीति में संशोधन कर सकते हैं। महत्वपूर्ण परिवर्तन प्रभावी होने से तीस (30) दिन पहले खाता धारकों को ईमेल द्वारा घोषित किए जाएंगे। नवीनतम संस्करण हमेशा [https://konvertools.com/privacy](https://konvertools.com/privacy) पर उपलब्ध है।"
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
    "lastUpdatedLabel": "Son güncelleme: %DATE% · Tüm ziyaretçiler ve hesap sahipleri için derhal yürürlüğe girer.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Temel ilkemiz: dosyalarınızı saklamıyoruz",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (\"Hizmet\") gizliliğe öncelik veren bir araç seti olarak işletilmektedir. Yaptığımız en önemli taahhüt şudur:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tarayıcı içi araçlar** (görüntü dönüştürücüleri, pdf-lib kullanan PDF araçları, FFmpeg.wasm tarafından desteklenen ses ve video dönüştürmeleri, kod araçları, hesap makineleri, QR oluşturucular, çoğu yardımcı program) **tamamen WebAssembly aracılığıyla web tarayıcınızın içinde çalışır**. Dosyanız asla sunucularımıza iletilmez. Onu okumamızın teknik bir yolu yoktur.",
              "**Sunucu destekli araçlar** (AI transkripsiyonu, AI çevirisi, AI metin görevleri, video altyazılarını yakma, virüs tarayıcı, URL tarayıcı, phishing tespit aracı ve diğer bazıları) bir arka uca bir şey göndermeleri gerekir. Her durumda dosya veya metin gerçek zamanlı olarak işlenir ve ya (a) otuz (30) dakika içinde geçici depolamadan silinir, ya da (b) — virüs tarayıcı için — asla iletilmez (yalnızca dosyanızın SHA-256 özeti cihazınızdan ayrılır).",
              "Hiçbir yüklenen dosyanın içeriğini kalıcı bir konumda saklamıyoruz, yüklemelerinizi AI modellerini eğitmek için kullanmıyoruz ve bunları size istediğiniz sonucu teslim etmekten başka herhangi bir amaçla üçüncü taraflara satmıyor, kiralamıyor veya paylaşmıyoruz."
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
              "**Hesap kimlik bilgileri**: e-posta adresiniz; Supabase Auth tarafından yönetilen, tuzlanmış, özetlenmiş bir parola kopyası (aslına hiçbir şekilde erişemiyoruz veya saklamıyoruz); Google ile giriş yaparsanız isteğe bağlı görüntü adı ve avatar URL’si.",
              "**Abonelik durumu**: mevcut plan (ücretsiz / Pro / İş), Stripe müşteri tanımlayıcısı, mevcut kredi bakiyesi ve en son yenileme tarihleri.",
              "**Kullanım sayaçları**: profil satırınızda yerinde güncellenen özet kota sayaçları (ör. \"bugün 3 AI çalışması kullanıldı\", \"aylık 420 AI çalışması kullanıldı\"). **Her çalışmanın kayıtlarını** tutmuyoruz.",
              "**İş meta verileri (geçici)**: bir sunucu destekli araç çıktı ürettiğinde (ör. transkripsiyondan oluşan bir .srt dosyası), araç adı, sonuç indirme URL’si, kaynak dil ve tamamlanma zaman damgasını kaydederiz. Bu satırlar otomatik olarak **iki (2) saat** sonra silinir. Hiçbir zaman dosyanızın içeriğini içermezler.",
              "**Onay kayıtları**: bu Hizmet Şartları ve Gizlilik Politikamızı kabul ettiğiniz tarih ve saati ve pazarlama e-postalarına katılmayı seçip seçmediğinizi kaydederiz. Hesabınızın silinmesinden sonraki beş (5) yıllık yasal kanıt süresi boyunca saklanır.",
              "**API anahtarları**: genel REST API için anahtarlar oluşturursanız yalnızca SHA-256 özeti ve 12 karakterlik bir görüntü öneki saklarız. Ham anahtar size yalnızca oluşturulduğunda bir kez gösterilir ve daha sonra kurtarılamaz."
            ]
          },
          {
            "kind": "p",
            "text": "**Toplamıyoruz**: IP adresinizi (yalnızca Supabase ve barındırma sağlayıcımızın hız sınırlaması ve güvenlik günlüğü için geçici kullanımının ötesinde), tarayıcı parmak izinizi, davranışsal izleme olaylarını, ekran kayıtlarınızı veya biyometrik verileri topluyoruz."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. İşlediğiniz dosyalar",
        "blocks": [
          {
            "kind": "p",
            "text": "Bölüm 1’de belirtildiği gibi, işlediğiniz dosyaların içerikleri asla bizim tarafımızdan kalıcı olarak saklanmaz. Kesin yaşam döngüsü şöyledir:"
          },
          {
            "kind": "ul",
            "items": [
              "**Tarayıcı içi araçlar**: sıfır iletim. Dosya tarayıcınız tarafından belleğe okunur, sonuç yerel olarak üretilir ve doğrudan indirirsiniz. Dosyanın kendisi hakkında hiçbir şeyi kaydetmeyiz.",
              "**AI transkripsiyonu / çevirisi / OCR / phishing analizi**: dosya veya metin Supabase Edge Function’a aktarılır, ardından ilgili AI sağlayıcısına (bölüm 7’ye bakınız) gerçek zamanlı olarak iletilir. Sonuç size geri döndürülür ve geçici yükleme arabelleği silinir. Özel depolama alanımıza yazılan sonuç dosyaları altmış (60) dakika boyunca imzalı-URL erişimine açıktır ve fiziksel olarak otuz (30) dakika içinde silinir.",
              "**Virüs tarayıcı**: dosyanız asla tarayıcınızdan ayrılmaz. Yerel olarak SHA-256 parmak izini hesaplarız ve yalnızca 64 karakterlik özeti VirusTotal’e göndeririz. VirusTotal, özeti dosyanızı yeniden oluşturamaz.",
              "**URL tarayıcı**: yalnızca yazdığınız URL dizesi Google Safe Browsing’e iletilir. Çevresindeki sayfa içeriği değil."
            ]
          }
        ]
      },
      {
        "id": "legal-bases",
        "title": "5. İşleme için yasal dayanaklar (GDPR Mad. 6)",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Sözleşmenin ifası** (Mad. 6(1)(b)) — bir hesap oluşturduğunuzda ve ücretli özellikleri kullandığınızda işleme, Hizmeti sunmak için gereklidir.",
              "**Meşru çıkarlar** (Mad. 6(1)(f)) — dolandırıcılık önleme, kötüye kullanım azaltma, temel güvenlik günlüğü ve Hizmeti iyileştirme.",
              "**Onay** (Mad. 6(1)(a)) — pazarlama e-postaları, isteğe bağlı analitik veya reklam çerezleri (etkinleştirildiğinde) ve gelecekteki isteğe bağlı entegrasyonlar.",
              "**Yasal yükümlülük** (Mad. 6(1)(c)) — Fransız vergi hukuku uyarınca fatura kayıtlarının on yıllık saklanması."
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
            "text": "Erişim (Mad. 15), düzeltme (Mad. 16), silme (Mad. 17), kısıtlama (Mad. 18), taşınabilirlik (Mad. 20), itiraz (Mad. 21) haklarına ve herhangi bir zamanda onayınızı geri çekme hakkına sahipsiniz ve bu durum önceki işlemenin yasallığını etkilemez. Ayrıca haklarınızı Fransa CNIL’ine veya yerel denetim merciinize şikâyet etme hakkına da sahipsiniz. Herhangi bir hakkı kullanmak için, hesabınıza kayıtlı e-posta adresinden [privacy@konvertools.com](mailto:privacy@konvertools.com) adresine e-posta gönderin. GDPR Mad. 12(3) uyarınca otuz (30) gün içinde yanıt vereceğiz."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Üçüncü taraf işleyiciler",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmetin sunulması için aşağıdaki işleyicilerle sınırlı verileri paylaşmamız gerekmektedir. Her birinin, bizden aldıkları verileri nasıl işlediklerini düzenleyen kendi gizlilik politikası vardır."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (Singapur’da kayıtlı, projemiz için AB’de barındırılan) — kimlik doğrulama, veritabanı, dosya depolama ve Edge Functions. Hesap kimlik bilgilerinizi, profil verilerinizi ve sunucu destekli bir araç için yüklediğiniz herhangi bir dosyayı (geçici olarak) alır. Alt işleyicimiz olarak hareket eder.",
              "**Mistral AI** (Fransa) — çeviri, yeniden ifade, özetleme, AI insanlaştırma, phishing kalıbı analizi ve diğer metin görevleri için büyük dil modeli çıkarımı; ses transkripsiyonu (Voxtral); görüntü OCR ve Vision görevleri (Pixtral). Gönderdiğiniz metin veya görüntü çıkarım için Mistral’e iletilir. Mistral, API girdilerini modellerini eğitmek için **kullanmayacağına** dair sözleşmesel taahhütte bulunmuştur.",
              "**VirusTotal** (Google LLC, ABD) — yalnızca Virüs Tarayıcı’yı kullandığınızda. Dosyanızın kendisi değil, yalnızca SHA-256 özeti iletilir.",
              "**Google Safe Browsing** (Google LLC, ABD) — yalnızca URL Tarayıcı’yı veya Phishing Tespit Aracı’nı kullandığınızda. Yalnızca yazdığınız URL’ler (veya yapıştırdığınız e-postadan çıkarılan bağlantılar) iletilir.",
              "**Stripe** (ABD / İrlanda) — ödeme işleme ve abonelik yönetimi. **Kart detaylarınızı asla görmüyor veya saklamıyoruz**. Stripe, e-posta adresinizi, ödeme yönteminizi ve satın aldığınız planı/kredi paketini alır.",
              "**Resend** (ABD) — işlemsel e-posta teslimi (hesap onayı, ödeme makbuzu, şifre sıfırlama). E-posta adresinizi ve gönderdiğimiz e-posta içeriğini alır.",
              "**Vercel** (ABD) — statik sayfalar için içerik dağıtım ağı. Yönlendirme ve kötüye kullanım önleme için standart web trafiği meta verilerini (IP, kullanıcı aracısı, istenen URL) alır. Vercel’in günlük saklama politikasına uygun olarak saklanır."
            ]
          },
          {
            "kind": "p",
            "text": "Bu işleyicilerden herhangi biri Avrupa Ekonomik Alanı dışında faaliyet gösteriyorsa, aktarımlar Avrupa Komisyonu’nun Standart Sözleşme Maddeleri (SCCs) veya eşdeğer bir aktarım mekanizması tarafından düzenlenir."
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
              "**İsteğe bağlı reklamcılık**: reklam ortaklarımızı etkinleştirdiğimizde (şu anda kodumuzda Ezoic referans verilmiş ancak trafiğiniz için henüz etkinleştirilmemiştir), açık bir onay banner’ı gösterecek ve yalnızca onay verdiğinizde reklam çerezleri ayarlayacağız."
            ]
          },
          {
            "kind": "p",
            "text": "Şu anda herhangi bir analitik, izleme pikselleri veya yeniden pazarlama etiketleri çalıştırmıyoruz. Bunlardan herhangi birini eklersek, yukarıdaki çerez banner’ı bunları engelleyecektir."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Güvenlik",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmete gelen ve giden tüm trafik TLS 1.2 veya üzeri ile şifrelenmiştir. Parolalar Supabase Auth tarafından Argon2 özetleri olarak saklanır. Yeni parolaları müşteri tarafında HaveIBeenPwned k-anonymity API’sine karşı kontrol ederiz, böylece bilinen bir ihlal edilmiş parola kullanılamaz. API anahtarları yalnızca SHA-256 özetleri olarak saklanır. Veritabanı satırları, bir kullanıcının diğerinin verilerini okuyamamasını sağlayan satır düzeyinde güvenlik politikalarıyla korunur. Bu önlemler rağmen, hiçbir sistem mükemmel güvenlikte değildir; herhangi bir çevrimiçi hizmetteki kalıntı riski kabul edersiniz."
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
              "Profil verileri: hesabınız var oldukça saklanır, hesap kapatıldıktan otuz (30) gün içinde silinir.",
              "İş meta verileri: otomatik olarak iki (2) saat sonra silinir.",
              "Depolama alanındaki sonuç dosyaları: oluşturulduktan otuz (30) dakika içinde fiziksel olarak silinir.",
              "Fatura kayıtları: Fransız vergi yükümlülüklerine uygun olarak on (10) yıl boyunca saklanır.",
              "Onay kayıtları: hesabınızın süresi boyunca ve ardından beş (5) yıl daha yasal kanıt süresi olarak saklanır."
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
            "text": "Hizmet **on altı (16) yaşın altındaki çocuklara yönelik değildir**. Bu yaşın altında iseniz hesap oluşturamazsınız. Küçüklerden veri toplamadığımızı biliyoruz; farkında olursak, verileri sileriz."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Bu politikanın değişiklikleri",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Gizlilik Politikasını zaman zaman değiştirebiliriz. Önemli değişiklikler, yürürlüğe girmesinden en az otuz (30) gün önce hesap sahiplerine e-posta yoluyla duyurulacaktır. En son sürüm her zaman [https://konvertools.com/privacy](https://konvertools.com/privacy) adresinde mevcuttur."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. İletişim",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu politika veya verileriniz hakkında herhangi bir sorunuz varsa, [privacy@konvertools.com](mailto:privacy@konvertools.com) adresine yazın. Ayrıca şikâyetlerinizi Fransız veri koruma kurumu (CNIL, [cnil.fr](https://www.cnil.fr/)) veya ikamet ettiğiniz ülkenin denetim merciine de iletebilirsiniz."
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
        "title": "1. Prinsip utama kami: kami tidak menyimpan file Anda",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (disebut sebagai \"Layanan\") dioperasikan sebagai rangkaian alat yang mengutamakan privasi. Komitmen terpenting yang kami buat adalah sebagai berikut:"
          },
          {
            "kind": "ul",
            "items": [
              "**Alat berbasis peramban** (konverter gambar, alat PDF yang menggunakan pdf-lib, konversi audio dan video yang ditenagai oleh FFmpeg.wasm, alat kode, kalkulator, pembuat kode QR, sebagian besar utilitas) berjalan **sepenuhnya di dalam peramban web Anda melalui WebAssembly**. File Anda tidak pernah dikirimkan ke server kami. Kami tidak memiliki sarana teknis untuk membacanya.",
              "**Alat berbantuan server** (transkripsi AI, terjemahan AI, tugas teks AI, pembakaran subtitle video, pemindai virus, pemindai URL, pendeteksi phishing, dan sejumlah kecil lainnya) memerlukan pengiriman sesuatu ke backend. Dalam setiap kasus, file atau teks diproses secara real-time dan kemudian (a) dihapus dari penyimpanan sementara dalam tiga puluh (30) menit, atau (b) — untuk pemindai virus — tidak pernah dikirimkan sama sekali (hanya hash SHA-256 file yang meninggalkan perangkat Anda).",
              "Kami tidak pernah menyimpan konten file yang diunggah di lokasi mana pun secara persisten, kami tidak pernah menggunakan unggahan Anda untuk melatih model AI, dan kami tidak pernah menjual, menyewakan, atau membagikannya kepada pihak ketiga untuk tujuan apa pun selain menyampaikan hasil yang Anda minta."
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
            "text": "Untuk kepentingan Peraturan Umum Perlindungan Data Uni Eropa (Regulation (EU) 2016/679, \"GDPR\"), pengendali data adalah penerbit Layanan. Kontak untuk setiap pertanyaan privasi: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Status langganan**: paket saat ini (gratis / Pro / Bisnis), pengidentifikasi pelanggan Stripe, saldo kredit saat ini, serta tanggal pembaruan langganan terakhir Anda.",
              "**Penghitung penggunaan**: penghitung kuota agregat (mis. \"3 penggunaan AI hari ini\", \"420 penggunaan AI bulanan\") yang diperbarui di baris profil Anda. Kami **tidak mencatat** catatan per penggunaan.",
              "**Metadata pekerjaan (sementara)**: ketika alat berbantuan server menghasilkan keluaran (mis. file .srt dari transkripsi), kami mencatat nama alat, URL unduhan hasil, bahasa sumber, dan waktu penyelesaian. Baris ini dihapus secara otomatis setelah **dua (2) jam**. Baris ini tidak pernah berisi konten file Anda.",
              "**Catatan persetujuan**: tanggal dan waktu saat Anda menerima Ketentuan dan Kebijakan Privasi kami, serta apakah Anda memilih untuk menerima email pemasaran. Disimpan selama masa akun Anda ditambah periode bukti hukum lima (5) tahun setelah penghapusan.",
              "**Kunci API**: jika Anda membuat kunci untuk API REST publik, kami hanya menyimpan hash SHA-256 dan awalan tampilan 12 karakter. Kunci mentah hanya ditampilkan kepada Anda sekali saat pembuatan dan tidak dapat dipulihkan lagi setelahnya."
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
            "text": "Seperti yang dinyatakan dalam bagian 1, konten file yang Anda proses tidak pernah disimpan oleh kami. Siklus hidup yang tepat adalah:"
          },
          {
            "kind": "ul",
            "items": [
              "**Alat berbasis peramban**: tidak ada transmisi. File dibaca ke dalam memori oleh peramban Anda, hasil diproduksi secara lokal, dan Anda mengunduhnya langsung. Kami tidak mencatat apa pun tentang file itu sendiri.",
              "**Transkripsi/terjemahan/OCR AI/pemindaian phishing**: file atau teks dialirkan ke Fungsi Tepi Supabase kami, yang segera meneruskannya ke penyedia AI terkait (lihat bagian 7) untuk inferensi. Hasil dikembalikan kepada Anda dan buffer unggahan sementara dibuang. File hasil yang ditulis ke bucket penyimpanan pribadi kami dapat diakses melalui URL tertandatangan selama enam puluh (60) menit dan secara fisik dihapus dalam tiga puluh (30) menit setelah pembuatan.",
              "**Pemindai virus**: file Anda tidak pernah meninggalkan peramban Anda. Kami menghitung hash SHA-256-nya secara lokal dan hanya mengirimkan hash 64 karakter tersebut ke VirusTotal. VirusTotal tidak dapat merekonstruksi file Anda dari hash-nya.",
              "**Pemindai URL**: hanya string URL yang Anda ketik yang dikirimkan ke Google Safe Browsing. Tidak ada konten halaman di sekitarnya."
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
              "**Kewajiban hukum** (Pasal 6(1)(c)) — penyimpanan catatan penagihan sebagaimana diwajibkan oleh hukum pajak Prancis (biasanya sepuluh tahun)."
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
            "text": "Anda memiliki hak untuk mengakses (Pasal 15), mengoreksi (Pasal 16), menghapus (Pasal 17), membatasi (Pasal 18), memindahkan (Pasal 20), keberatan (Pasal 21), dan menarik persetujuan kapan saja tanpa mempengaruhi keabsahan pemrosesan sebelumnya. Anda juga memiliki hak untuk mengajukan keluhan kepada CNIL (Prancis) atau otoritas pengawas lokal Anda. Untuk menggunakan hak apa pun, kirim email ke [privacy@konvertools.com](mailto:privacy@konvertools.com) dari alamat yang terdaftar di akun Anda. Kami akan menanggapi dalam tiga puluh (30) hari, sebagaimana diwajibkan oleh GDPR Pasal 12(3)."
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
              "**Mistral AI** (Prancis) — inferensi model bahasa besar untuk terjemahan, perampingan, ringkasan, humanisasi AI, analisis pola phishing, dan tugas teks lainnya; transkripsi audio (Voxtral); tugas OCR dan Vision gambar (Pixtral). Teks atau gambar yang Anda kirimkan dikirimkan ke Mistral untuk inferensi. Mistral telah berkomitmen secara kontraktual untuk **tidak menggunakan masukan API untuk melatih modelnya**.",
              "**VirusTotal** (Google LLC, AS) — hanya ketika Anda menggunakan Pemindai Virus. Hanya hash SHA-256 file Anda yang dikirimkan, tidak pernah file itu sendiri.",
              "**Google Safe Browsing** (Google LLC, AS) — hanya ketika Anda menggunakan Pemindai URL atau Pendeteksi Phishing. Hanya URL yang Anda ketik (atau tautan yang diekstrak dari email yang Anda tempel) yang dikirimkan.",
              "**Stripe** (AS / Irlandia) — pemrosesan pembayaran dan manajemen langganan. Kami **tidak pernah melihat atau menyimpan** detail kartu Anda. Stripe menerima email, metode pembayaran, dan paket/kredit yang Anda beli.",
              "**Resend** (AS) — pengiriman email transaksional (konfirmasi akun, tanda terima pembayaran, reset kata sandi). Menerima alamat email dan badan email yang kami kirim.",
              "**Vercel** (AS) — jaringan pengiriman konten untuk halaman statis. Menerima metadata lalu lintas web standar (IP, agen pengguna, URL yang diminta) untuk perutean dan pencegahan penyalahgunaan. Disimpan sesuai dengan kebijakan retensi log Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Di mana pun pemroses ini beroperasi di luar Kawasan Ekonomi Eropa, transfer tunduk pada Klausul Kontrak Standar (SCCs) Komisi Eropa atau mekanisme transfer yang setara."
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
              "**Esensial**: NEXT_LOCALE (mengingat bahasa pilihan Anda), dan cookie sesi Supabase (sb-*-auth-token) ketika Anda masuk. Ini tidak memerlukan persetujuan menurut GDPR.",
              "**Iklan opsional**: jika dan ketika kami mengaktifkan mitra iklan (saat ini Ezoic dirujuk dalam kode kami tetapi belum diaktifkan untuk lalu lintas Anda), kami akan menampilkan banner persetujuan yang jelas dan hanya menetapkan cookie iklan setelah Anda memilih untuk menerimanya."
            ]
          },
          {
            "kind": "p",
            "text": "Kami saat ini tidak menjalankan analitik apa pun, pixel pelacakan, atau tag remarketing. Jika kami menambahkannya, banner cookie di atas akan mengaturnya."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Keamanan",
        "blocks": [
          {
            "kind": "p",
            "text": "Semua lalu lintas ke dan dari Layanan dienkripsi dengan TLS 1.2 atau lebih tinggi. Kata sandi disimpan sebagai hash Argon2 oleh Supabase Auth. Kami memeriksa kata sandi baru terhadap API k-anonymity HaveIBeenPwned secara klien, sehingga kata sandi yang diketahui telah diretas tidak dapat digunakan. Kunci API disimpan hanya sebagai hash SHA-256. Baris basis data dilindungi oleh kebijakan keamanan tingkat baris yang memastikan satu pengguna tidak dapat membaca data pengguna lain. Meskipun ada langkah-langkah ini, tidak ada sistem yang benar-benar aman; Anda menerima risiko residual yang melekat pada layanan online apa pun."
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
        "title": "11. Anak di bawah umur",
        "blocks": [
          {
            "kind": "p",
            "text": "Layanan **tidak ditujukan untuk anak di bawah enam belas (16) tahun**. Jika Anda berada di bawah usia tersebut, Anda tidak boleh membuat akun. Kami tidak dengan sengaja mengumpulkan data dari anak di bawah umur; jika kami mengetahui hal tersebut, kami akan menghapusnya."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Perubahan pada kebijakan ini",
        "blocks": [
          {
            "kind": "p",
            "text": "Kami dapat mengubah Kebijakan Privasi ini sewaktu-waktu. Perubahan substansial akan diumumkan melalui email kepada pemegang akun setidaknya tiga puluh (30) hari sebelum diberlakukan. Versi terbaru selalu tersedia di [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Kontak",
        "blocks": [
          {
            "kind": "p",
            "text": "Untuk pertanyaan apa pun tentang kebijakan ini atau data Anda, tulis ke [privacy@konvertools.com](mailto:privacy@konvertools.com). Anda juga dapat mengajukan keluhan kepada otoritas perlindungan data Prancis (CNIL, [cnil.fr](https://www.cnil.fr/)) atau kepada otoritas pengawas negara tempat tinggal Anda."
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
        "title": "1. Nguyên tắc cốt lõi của chúng tôi: chúng tôi không lưu giữ tệp của bạn",
        "blocks": [
          {
            "kind": "p",
            "text": "Dịch vụ Konvertools (sau đây gọi là \"Dịch vụ\") được vận hành như một bộ công cụ ưu tiên quyền riêng tư. Cam kết quan trọng nhất của chúng tôi là:"
          },
          {
            "kind": "ul",
            "items": [
              "**Công cụ chỉ chạy trên trình duyệt** (công cụ chuyển đổi hình ảnh, công cụ PDF sử dụng pdf-lib, chuyển đổi âm thanh và video bằng FFmpeg.wasm, công cụ mã, máy tính, tạo mã QR, hầu hết tiện ích) được thực thi **hoàn toàn bên trong trình duyệt web của bạn thông qua WebAssembly**. Tệp của bạn không bao giờ được truyền đến máy chủ của chúng tôi. Chúng tôi không có phương tiện kỹ thuật nào để đọc nó.",
              "**Công cụ hỗ trợ bởi máy chủ** (chuyển ngữ AI, dịch thuật AI, tác vụ văn bản AI, chèn phụ đề video, trình quét vi-rút, trình quét URL, trình phát hiện lừa đảo và một số công cụ khác) cần gửi dữ liệu đến máy chủ phụ trợ. Trong mọi trường hợp, tệp hoặc văn bản được xử lý theo thời gian thực và sau đó (a) bị xóa khỏi bộ nhớ tạm trong vòng ba mươi (30) phút, hoặc (b) — đối với trình quét vi-rút — không bao giờ được truyền đi (chỉ có hàm băm SHA-256 của tệp rời khỏi thiết bị của bạn).",
              "Chúng tôi không bao giờ lưu trữ nội dung của bất kỳ tệp tải lên nào ở bất kỳ vị trí bền vững nào, không bao giờ sử dụng tệp tải lên của bạn để đào tạo mô hình AI, và không bao giờ bán, cho thuê hoặc chia sẻ chúng với bên thứ ba vì bất kỳ mục đích nào ngoài việc cung cấp kết quả bạn yêu cầu."
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
            "text": "Theo quy định của Quy định chung về bảo vệ dữ liệu của EU (Quy định (EU) 2016/679, \"GDPR\"), đơn vị kiểm soát dữ liệu là nhà xuất bản của Dịch vụ. Liên hệ cho bất kỳ câu hỏi về quyền riêng tư: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Thông tin đăng nhập tài khoản**: địa chỉ email của bạn; bản sao băm có muối của mật khẩu (được quản lý bởi Supabase Auth — chúng tôi không bao giờ nhìn thấy hoặc lưu trữ mật khẩu dạng văn bản); tên hiển thị tùy chọn và URL ảnh đại diện nếu bạn đăng nhập bằng Google.",
              "**Trạng thái đăng ký**: gói hiện tại (miễn phí / Pro / Business), định danh khách hàng Stripe, số dư tín dụng hiện tại, và ngày gia hạn gần nhất của bạn.",
              "**Bộ đếm sử dụng**: bộ đếm hạn ngạch tổng hợp (ví dụ: \"3 lượt chạy AI hôm nay\", \"420 lượt chạy AI hàng tháng đã sử dụng\") được cập nhật tại chỗ trên hàng hồ sơ của bạn. Chúng tôi **không** ghi lại hồ sơ theo từng lượt chạy.",
              "**Siêu dữ liệu công việc (tạm thời)**: khi một công cụ hỗ trợ bởi máy chủ tạo ra đầu ra (ví dụ: tệp .srt từ chuyển ngữ), chúng tôi ghi lại tên công cụ, URL tải xuống kết quả, ngôn ngữ nguồn, và dấu thời gian hoàn thành. Các hàng này được tự động xóa sau **hai (2) giờ**. Chúng không bao giờ chứa nội dung tệp của bạn.",
              "**Bản ghi sự đồng thuận**: ngày và giờ bạn chấp nhận các Điều khoản và Chính sách Bảo mật của chúng tôi, cũng như liệu bạn có chọn nhận email tiếp thị hay không. Được lưu giữ trong suốt thời gian tồn tại tài khoản của bạn cộng thêm thời gian chứng cứ pháp lý là năm (5) năm sau khi xóa.",
              "**Khóa API**: nếu bạn tạo khóa cho API REST công khai, chúng tôi chỉ lưu trữ hàm băm SHA-256 và tiền tố hiển thị 12 ký tự. Khóa thô chỉ được hiển thị cho bạn đúng một lần khi tạo và không thể khôi phục sau đó."
            ]
          },
          {
            "kind": "p",
            "text": "Chúng tôi **không thu thập**: địa chỉ IP của bạn (ngoài việc sử dụng tạm thời Supabase và nhà cung cấp lưu trữ của chúng tôi cho mục đích giới hạn tốc độ và ghi nhật ký bảo mật), dấu vân tay trình duyệt, sự kiện theo dõi hành vi, ghi hình màn hình của bạn, hoặc bất kỳ dữ liệu sinh trắc học nào."
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
              "**Công cụ chỉ chạy trên trình duyệt**: không truyền tải. Tệp được đọc vào bộ nhớ bởi trình duyệt của bạn, kết quả được tạo cục bộ, và bạn tải xuống trực tiếp. Chúng tôi không ghi nhật ký bất cứ điều gì về tệp đó.",
              "**Chuyển ngữ / dịch thuật / OCR AI / phân tích lừa đảo**: tệp hoặc văn bản được truyền theo luồng đến Edge Function của Supabase của chúng tôi, sau đó ngay lập tức chuyển tiếp đến nhà cung cấp AI liên quan (xem mục 7) để suy luận. Kết quả được trả về cho bạn và bộ đệm tải lên tạm thời bị loại bỏ. Các tệp kết quả được ghi vào bucket lưu trữ riêng của chúng tôi có thể truy cập qua URL ký tên trong sáu mươi (60) phút và bị xóa vật lý trong vòng ba mươi (30) phút sau khi tạo.",
              "**Trình quét vi-rút**: tệp của bạn không bao giờ rời khỏi trình duyệt của bạn. Chúng tôi tính toán dấu vân tay SHA-256 của nó cục bộ và chỉ gửi hàm băm 64 ký tự đó đến VirusTotal. VirusTotal không thể tái tạo tệp của bạn từ hàm băm của nó.",
              "**Trình quét URL**: chỉ chuỗi URL bạn nhập được truyền đến Google Safe Browsing. Không có nội dung trang xung quanh."
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
              "**Thực hiện hợp đồng** (Điều 6(1)(b)) — khi bạn tạo tài khoản và sử dụng tính năng trả phí, xử lý là cần thiết để cung cấp Dịch vụ.",
              "**Lợi ích hợp pháp** (Điều 6(1)(f)) — ngăn chặn gian lận, giảm thiểu lạm dụng, ghi nhật ký bảo mật cơ bản, và cải thiện Dịch vụ.",
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
        "title": "7. Nhà xử lý bên thứ ba",
        "blocks": [
          {
            "kind": "p",
            "text": "Để cung cấp Dịch vụ, chúng tôi phải chia sẻ dữ liệu hạn chế với các nhà xử lý sau đây. Mỗi bên có chính sách bảo mật riêng điều chỉnh cách họ xử lý dữ liệu nhận từ chúng tôi."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (đăng ký tại Singapore, lưu trữ tại EU cho dự án của chúng tôi) — xác thực, cơ sở dữ liệu, lưu trữ tệp, và Edge Functions. Nhận thông tin đăng nhập tài khoản, dữ liệu hồ sơ của bạn và (tạm thời) bất kỳ tệp nào bạn tải lên cho công cụ hỗ trợ bởi máy chủ. Đóng vai trò là nhà xử lý phụ của chúng tôi.",
              "**Mistral AI** (Pháp) — suy luận mô hình ngôn ngữ lớn cho dịch thuật, diễn đạt lại, tóm tắt, công cụ nhân hóa AI, phân tích mẫu lừa đảo, và các tác vụ văn bản khác; chuyển ngữ âm thanh (Voxtral); OCR hình ảnh và tác vụ thị giác (Pixtral). Văn bản hoặc hình ảnh bạn gửi được gửi đến Mistral để suy luận. Mistral đã cam kết hợp đồng **không sử dụng đầu vào API để đào tạo mô hình của mình**.",
              "**VirusTotal** (Google LLC, Hoa Kỳ) — chỉ khi bạn sử dụng Trình quét vi-rút. Chỉ hàm băm SHA-256 của tệp của bạn được truyền đi, không bao giờ là tệp đó.",
              "**Google Safe Browsing** (Google LLC, Hoa Kỳ) — chỉ khi bạn sử dụng Trình quét URL hoặc Trình phát hiện lừa đảo. Chỉ các URL bạn nhập (hoặc liên kết trích xuất từ email bạn dán) được truyền đi.",
              "**Stripe** (Hoa Kỳ / Ireland) — xử lý thanh toán và quản lý đăng ký. Chúng tôi **không bao giờ nhìn thấy hoặc lưu trữ** chi tiết thẻ của bạn. Stripe nhận địa chỉ email, phương thức thanh toán, và gói/tín dụng bạn đã mua.",
              "**Resend** (Hoa Kỳ) — cung cấp email giao dịch (xác nhận tài khoản, biên lai thanh toán, đặt lại mật khẩu). Nhận địa chỉ email của bạn và nội dung email chúng tôi gửi.",
              "**Vercel** (Hoa Kỳ) — mạng phân phối nội dung cho các trang tĩnh. Nhận siêu dữ liệu lưu lượng web tiêu chuẩn (IP, user-agent, URL được yêu cầu) để định tuyến và ngăn chặn lạm dụng. Được lưu giữ theo chính sách lưu giữ nhật ký của Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "Nếu bất kỳ nhà xử lý nào trong số này hoạt động bên ngoài Khu vực Kinh tế Châu Âu, việc chuyển dữ liệu được điều chỉnh bởi Các điều khoản hợp đồng tiêu chuẩn (SCCs) của Ủy ban Châu Âu hoặc cơ chế chuyển tương đương."
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
              "**Cần thiết**: NEXT_LOCALE (ghi nhớ ngôn ngữ bạn chọn), và cookie phiên Supabase (sb-*-auth-token) khi bạn đăng nhập. Những cookie này không yêu cầu sự đồng thuận theo GDPR.",
              "**Quảng cáo tùy chọn**: nếu và khi chúng tôi kích hoạt đối tác quảng cáo (hiện tại Ezoic được tham chiếu trong mã của chúng tôi nhưng chưa được kích hoạt cho lưu lượng truy cập của bạn), chúng tôi sẽ hiển thị biểu ngữ đồng thuận rõ ràng và chỉ thiết lập cookie quảng cáo sau khi bạn chọn tham gia."
            ]
          },
          {
            "kind": "p",
            "text": "Hiện tại chúng tôi không chạy bất kỳ phân tích, pixel theo dõi hoặc thẻ tiếp thị lại nào. Nếu chúng tôi bổ sung bất kỳ công nghệ nào, biểu ngữ cookie trên sẽ quản lý chúng."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Bảo mật",
        "blocks": [
          {
            "kind": "p",
            "text": "Tất cả lưu lượng truy cập đến và đi từ Dịch vụ đều được mã hóa bằng TLS 1.2 trở lên. Mật khẩu được lưu trữ dưới dạng hàm băm Argon2 bởi Supabase Auth. Chúng tôi kiểm tra mật khẩu mới chống lại API k-anonymity HaveIBeenPwned phía máy khách, vì vậy mật khẩu bị xâm phạm đã biết không thể được sử dụng. Khóa API chỉ được lưu trữ dưới dạng hàm băm SHA-256. Các hàng trong cơ sở dữ liệu được bảo vệ bởi chính sách bảo mật cấp hàng đảm bảo người dùng này không thể đọc dữ liệu của người dùng khác. Bất chấp các biện pháp này, không hệ thống nào hoàn toàn an toàn; bạn chấp nhận rủi ro tồn dư vốn có của bất kỳ dịch vụ trực tuyến nào."
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
              "Tệp kết quả trong bucket lưu trữ: bị xóa vật lý trong vòng ba mươi (30) phút sau khi tạo.",
              "Hồ sơ thanh toán: được lưu giữ trong mười (10) năm để tuân thủ nghĩa vụ thuế của Pháp.",
              "Bản ghi sự đồng thuận: được lưu giữ trong suốt thời gian tồn tại tài khoản của bạn cộng thêm năm (5) năm sau đó như bằng chứng pháp lý."
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
            "text": "Dịch vụ **không nhắm đến trẻ em dưới mười sáu (16) tuổi**. Nếu bạn dưới độ tuổi đó, bạn không được tạo tài khoản. Chúng tôi không thu thập dữ liệu từ trẻ vị thành niên một cách có chủ ý; nếu chúng tôi phát hiện ra điều đó, chúng tôi sẽ xóa dữ liệu đó."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Thay đổi đối với chính sách này",
        "blocks": [
          {
            "kind": "p",
            "text": "Chúng tôi có thể sửa đổi Chính sách Bảo mật này theo thời gian. Những thay đổi quan trọng sẽ được thông báo qua email cho chủ tài khoản ít nhất ba mươi (30) ngày trước khi có hiệu lực. Phiên bản mới nhất luôn có sẵn tại [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Liên hệ",
        "blocks": [
          {
            "kind": "p",
            "text": "Mọi câu hỏi về chính sách này hoặc dữ liệu của bạn, hãy viết thư đến [privacy@konvertools.com](mailto:privacy@konvertools.com). Bạn cũng có thể khiếu nại lên Cơ quan bảo vệ dữ liệu Pháp (CNIL, [cnil.fr](https://www.cnil.fr/)) hoặc cơ quan giám sát của quốc gia cư trú của bạn."
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
            "text": "Konvertools (\"Tjänsten\") drivs som en integritetsfokuserad verktygslåda. Det viktigaste åtagandet vi gör är följande:"
          },
          {
            "kind": "ul",
            "items": [
              "**Webbläsarbaserade verktyg** (bildkonverterare, PDF-verktyg som använder pdf-lib, ljud- och videokonverteringar som drivs av FFmpeg.wasm, kodverktyg, miniräknare, QR-generatorer, de flesta verktyg) körs **helt och hållet i din webbläsare via WebAssembly**. Din fil överförs aldrig till våra servrar. Vi har inga tekniska möjligheter att läsa den.",
              "**Serverassisterade verktyg** (AI-transkribering, AI-översättning, AI-textuppgifter, inbränning av videounderskrifter, virusavsökaren, URL-avsökaren, phishingdetektorn och ett fåtal andra) behöver skicka något till en backend. I samtliga fall bearbetas filen eller texten i realtid och antingen (a) raderas från tillfällig lagring inom trettio (30) minuter, eller (b) — för virusavsökaren — överförs aldrig alls (endast filens SHA-256-hash lämnar din enhet).",
              "Vi lagrar aldrig innehållet i någon uppladdad fil på något beständigt ställe, vi använder aldrig dina uppladdningar för att träna AI-modeller, och vi säljer, hyr ut eller delar dem med tredje part för något annat syfte än att leverera det resultat du begärt."
            ]
          }
        ]
      },
      {
        "id": "controller",
        "title": "2. Personuppgiftsansvarig",
        "blocks": [
          {
            "kind": "p",
            "text": "För ändamålen med EU:s allmänna dataskyddsförordning (Förordning (EU) 2016/679, \"GDPR\"), är personuppgiftsansvarig utgivaren av Tjänsten. Kontakt för eventuella integritetsfrågor: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
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
              "**Abonnemangsstatus**: aktuellt abonnemang (gratis / Pro / Business), Stripe-kundidentifierare, aktuell kreditsaldo och datum för dina senaste förnyelser.",
              "**Användningsräknare**: aggregerade kvoträknare (t.ex. \"3 AI-körningar använda idag\", \"420 AI-körningar använda denna månad\") som uppdateras direkt i din profilrad. Vi loggar **inte** per-körningsposter.",
              "**Jobbmetadata (tillfällig)**: när ett serverassisterat verktyg producerar ett resultat (t.ex. en .srt-fil från transkribering), sparar vi verktygets namn, nedladdnings-URL för resultatet, källspråket och en slutförningstid. Dessa rader raderas automatiskt efter **två (2) timmar**. De innehåller aldrig innehållet i din fil.",
              "**Samtyckesposter**: datum och tidpunkt för när du accepterade dessa villkor och vår Integritetspolicy, samt om du valde att tacka ja till marknadsföringsmejl. Bevaras under hela ditt kontos livstid plus en lagstadgad bevisperiod på fem (5) år efter radering.",
              "**API-nycklar**: om du genererar nycklar för den publika REST-API:n lagrar vi endast SHA-256-hashen och en 12-teckens visningsprefix. Den råa nyckeln visas för dig exakt en gång vid skapandet och kan därefter inte återställas."
            ]
          },
          {
            "kind": "p",
            "text": "Vi samlar **inte** in: din IP-adress (utom den tillfälliga användning Supabase och vår hostingleverantör gör av den för hastighetsbegränsning och säkerhetsloggning), din webbläsarfingeravtryck, beteende-spårningshändelser, dina skärminspelningar eller någon biometrisk data."
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
              "**Webbläsarbaserade verktyg**: ingen överföring. Filen läses in i minnet av din webbläsare, resultatet produceras lokalt, och du laddar ner det direkt. Vi loggar ingenting om själva filen.",
              "**AI-transkribering / översättning / OCR / phishinganalys**: filen eller texten strömmas till vår Supabase Edge Function, som omedelbart vidarebefordrar den till den relevanta AI-leverantören (se avsnitt 7) för inferens. Resultatet returneras till dig och den tillfälliga uppladdningsbufferten raderas. Resultatfiler som skrivs till vår privata lagringsbucket är åtkomliga via signerade-URL:er i sextio (60) minuter och raderas fysiskt inom trettio (30) minuter efter generering.",
              "**Virusavsökare**: din fil lämnar aldrig din webbläsare. Vi beräknar dess SHA-256-fingeravtryck lokalt och skickar endast den resulterande 64-teckens hash till VirusTotal. VirusTotal kan inte rekonstruera din fil från dess hash.",
              "**URL-avsökare**: endast den URL-sträng du skriver in överförs till Google Safe Browsing. Inget innehåll från den omgivande sidan."
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
              "**Uppfyllande av avtal** (Art. 6(1)(b)) — när du skapar ett konto och använder betalda funktioner är bearbetningen nödvändig för att leverera Tjänsten.",
              "**Legitima intressen** (Art. 6(1)(f)) — bedrägeriförebyggande, missbruksbegränsning, grundläggande säkerhetsloggning och förbättring av Tjänsten.",
              "**Samtycke** (Art. 6(1)(a)) — marknadsföringsmejl, valfria analys- eller reklamcookies (om och när de aktiveras) och eventuella framtida valfria integrationer.",
              "**Rättslig förpliktelse** (Art. 6(1)(c)) — bevarande av fakturaunderlag som krävs enligt fransk skattelagstiftning (vanligtvis tio år)."
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
            "text": "Du har rättigheterna till tillgång (Art. 15), rättelse (Art. 16), radering (Art. 17), begränsning (Art. 18), dataportabilitet (Art. 20), invändning (Art. 21) och att återkalla samtycke när som helst utan att påverka lagligheten av tidigare bearbetning. Du har även rätt att lämna in ett klagomål till CNIL (Frankrike) eller din lokala tillsynsmyndighet. För att utöva någon rättighet, mejla [privacy@konvertools.com](mailto:privacy@konvertools.com) från den adress som är registrerad på ditt konto. Vi kommer att svara inom trettio (30) dagar, som krävs enligt GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Tredjepartsprocessorer",
        "blocks": [
          {
            "kind": "p",
            "text": "För att leverera Tjänsten behöver vi dela mycket begränsad data med följande processorer. Var och en har sin egen integritetspolicy som reglerar hur de hanterar data de får från oss."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (Singapore-baserat, värd i EU för vårt projekt) — autentisering, databas, filförvaring och Edge Functions. Tar emot dina kontouppgifter, profildata och (tillfälligt) eventuell fil du laddar upp för ett serverassisterat verktyg. Verkar som vår underleverantör.",
              "**Mistral AI** (Frankrike) — inferens av stora språkmodeller för översättning, omformulering, sammanfattning, den AI-mänskliggöraren, phishingmönsteranalys och andra textuppgifter; ljudtranskribering (Voxtral); bild-OCR och bildanalys (Pixtral). Den text eller bild du skickar vidarebefordras till Mistral för inferens. Mistral har kontraktuellt åtagit sig att **inte** använda API-inmatningar för att träna sina modeller.",
              "**VirusTotal** (Google LLC, USA) — endast när du använder Virusavsökaren. Endast SHA-256-hashen av din fil överförs, aldrig själva filen.",
              "**Google Safe Browsing** (Google LLC, USA) — endast när du använder URL-avsökaren eller Phishingdetektorn. Endast de URL:er du skriver in (eller länkar som extraheras från mejlet du klistrar in) överförs.",
              "**Stripe** (USA / Irland) — betalningshantering och abonnemangsadministration. Vi **ser eller lagrar aldrig** dina kortuppgifter. Stripe tar emot din e-post, betalningsmetod och det abonnemang/kreditpaket du köpt.",
              "**Resend** (USA) — leverans av transaktionsmejl (kontbekräftelse, betalningskvittens, återställning av lösenord). Tar emot din e-postadress och mejlkroppen vi skickar.",
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
              "**Nödvändiga**: NEXT_LOCALE (kom ihåg ditt valda språk), och Supabase-sessioncookies (sb-*-auth-token) när du är inloggad. Dessa kräver inget samtycke enligt GDPR.",
              "**Valfria reklam**: om och när vi aktiverar reklampartners (för närvarande refereras Ezoic i vår kod men inte aktiverat för din trafik), kommer vi att visa en tydlig samtyckesbanner och endast sätta reklamcookies efter att du tackat ja."
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
            "text": "All trafik till och från Tjänsten är krypterad med TLS 1.2 eller högre. Lösenord lagras som Argon2-hashar av Supabase Auth. Vi kontrollerar nya lösenord mot den publika HaveIBeenPwned k-anonymitet-API:t klientsidan, så ett känt läckt lösenord kan inte användas. API-nycklar lagras endast som SHA-256-hashar. Databastrader skyddas av radvis säkerhetspolicyer som säkerställer att en användare inte kan läsa en annan användares data. Trots dessa åtgärder är inget system perfekt säkert; du accepterar den kvarvarande risken som är förknippad med alla onlinetjänster."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Bevarande",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Profildata: bevaras under hela ditt kontos livstid, raderas inom trettio (30) dagar efter kontostängning.",
              "Jobbmetadata: raderas automatiskt efter två (2) timmar.",
              "Resultatfiler i lagringsbucketen: raderas fysiskt inom trettio (30) minuter efter generering.",
              "Fakturaunderlag: bevaras i tio (10) år för att uppfylla franska skatteplikter.",
              "Samtyckesposter: bevaras under hela ditt kontos livstid plus fem (5) år därefter som juridisk bevisning."
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
            "text": "Tjänsten **är inte avsedd för barn under sexton (16) år**. Om du är under den åldern får du inte skapa ett konto. Vi samlar inte medvetet in data från minderåriga; om vi blir medvetna om att vi har gjort det kommer vi att radera det."
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
            "text": "För eventuella frågor om denna policy eller dina data, skriv till [privacy@konvertools.com](mailto:privacy@konvertools.com). Du kan även lämna in ett klagomål till den franska dataskyddsmyndigheten (CNIL, [cnil.fr](https://www.cnil.fr/)) eller till tillsynsmyndigheten i ditt hemland."
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
            "text": "Usługa **Konvertools** (zwana dalej „Serwisem”) działa jako zestaw narzędzi stawiających prywatność na pierwszym miejscu. Najważniejsze zobowiązanie, jakie podejmujemy, brzmi następująco:"
          },
          {
            "kind": "ul",
            "items": [
              "Narzędzia działające **wyłącznie w przeglądarce** (konwertery obrazów, narzędzia PDF korzystające z pdf-lib, konwersje audio i wideo zasilane przez FFmpeg.wasm, narzędzia do kodowania, kalkulatory, generatory kodów QR, większość narzędzi pomocniczych) są wykonywane **całkowicie w Twojej przeglądarce internetowej za pomocą WebAssembly**. Twój plik nigdy nie jest przesyłany na nasze serwery. Nie mamy technicznych możliwości, aby go odczytać.",
              "Narzędzia **wspomagane serwerowo** (transkrypcja AI, tłumaczenie AI, zadania tekstowe AI, wgrywanie napisów do wideo, skaner wirusów, skaner adresów URL, wykrywacz phishingu oraz kilka innych) wymagają przesłania czegoś do backendu. W każdym przypadku plik lub tekst jest przetwarzany w czasie rzeczywistym, a następnie albo (a) usuwany z tymczasowego magazynu w ciągu trzydziestu (30) minut, albo (b) — w przypadku skanera wirusów — w ogóle nie jest przesyłany (z urządzenia opuszcza jedynie skrót SHA-256 pliku).",
              "Nigdy nie przechowujemy treści przesłanych plików w żadnym trwałym miejscu, nie używamy Twoich przesłanych plików do trenowania modeli AI ani nie sprzedajemy, nie wynajmujemy ani nie udostępniamy ich stronom trzecim w żadnym innym celu niż dostarczenie wyniku, którego zażądałeś."
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
            "text": "Na mocy Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 („RODO”) administratorem danych jest wydawca Serwisu. Kontakt w sprawach związanych z prywatnością: [privacy@konvertools.com](mailto:privacy@konvertools.com)."
          }
        ]
      },
      {
        "id": "what-we-collect",
        "title": "3. Dane, które gromadzimy",
        "blocks": [
          {
            "kind": "p",
            "text": "Jedynymi danymi osobowymi, które trwale przechowujemy w naszej bazie danych, są:"
          },
          {
            "kind": "ul",
            "items": [
              "**Dane uwierzytelniające konta**: Twój adres e-mail; solony i zahaszowany (SHA-256) odpowiednik hasła (zarządzany przez Supabase Auth — nigdy nie widzimy ani nie przechowujemy hasła w postaci jawnej); opcjonalna nazwa wyświetlana oraz adres URL awatara, jeśli logujesz się przez Google.",
              "**Stan subskrypcji**: aktualny plan (darmowy / Pro / Business), identyfikator klienta Stripe, aktualny stan środków oraz daty ostatnich odnowień.",
              "**Liczniki użycia**: zagregowane liczniki kwot (np. „3 użycia AI dzisiaj”, „420 użyć AI w tym miesiącu”) aktualizowane na Twoim profilu. **Nie rejestrujemy** indywidualnych rekordów dotyczących każdego użycia.",
              "**Metadane zadań (przejściowe)**: gdy narzędzie wspomagane serwerowo generuje wynik (np. plik .srt z transkrypcji), zapisujemy nazwę narzędzia, adres URL do pobrania wyniku, język źródłowy oraz znacznik czasu zakończenia. Rekordy te są automatycznie usuwane po **dwóch (2) godzinach**. Nigdy nie zawierają one treści Twojego pliku.",
              "**Rekordy zgody**: data i godzina, w której zaakceptowałeś niniejsze Warunki oraz naszą Politykę Prywatności, a także informacja, czy wyraziłeś zgodę na otrzymywanie wiadomości marketingowych. Przechowywane są przez okres istnienia Twojego konta oraz przez okres pięciu (5) lat od jego usunięcia w celach dowodowych.",
              "**Klucze API**: jeśli wygenerujesz klucze dla publicznego API REST, przechowujemy jedynie skrót SHA-256 oraz 12-znakowy prefiks wyświetlany. Surowy klucz jest pokazywany Tobie dokładnie raz w momencie utworzenia i nie może być odzyskany później."
            ]
          },
          {
            "kind": "p",
            "text": "**Nie gromadzimy**: adresu IP (poza tymczasowym użyciem przez Supabase i naszego dostawcę hostingu w celach ograniczania liczby zapytań i logowania zabezpieczeń), odcisku przeglądarki, zdarzeń śledzenia zachowań, nagrań ekranu ani jakichkolwiek danych biometrycznych."
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
              "**Narzędzia działające wyłącznie w przeglądarce**: brak transmisji. Plik jest odczytywany do pamięci przez Twoją przeglądarkę, wynik jest generowany lokalnie, a Ty pobierasz go bezpośrednio. Nie rejestrujemy niczego dotyczącego samego pliku.",
              "**Transkrypcja / tłumaczenie / OCR AI / analiza phishingu**: plik lub tekst jest przesyłany strumieniowo do naszej funkcji Edge Supabase, która natychmiast przekazuje go do odpowiedniego dostawcy AI (patrz sekcja 7) w celu przeprowadzenia wnioskowania. Wynik jest zwracany Tobie, a tymczasowy bufor przesłania jest usuwany. Pliki wynikowe zapisane w naszym prywatnym magazynie pamięci masowej są dostępne za pośrednictwem podpisanego adresu URL przez sześćdziesiąt (60) minut i fizycznie usuwane w ciągu trzydziestu (30) minut od wygenerowania.",
              "**Skaner wirusów**: Twój plik nigdy nie opuszcza przeglądarki. Obliczamy jego lokalny skrót SHA-256 i przesyłamy jedynie wynikowy 64-znakowy skrót do VirusTotal. VirusTotal nie może odtworzyć Twojego pliku na podstawie jego skrótu.",
              "**Skaner adresów URL**: przesyłany jest jedynie łańcuch adresu URL, który wpisujesz, do Google Safe Browsing. Żadne otaczające treści strony."
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
              "**Wykonywanie umowy** (Art. 6(1)(b)) — gdy zakładasz konto i korzystasz z płatnych funkcji, przetwarzanie jest konieczne do świadczenia Usługi.",
              "**Uzasadniony interes** (Art. 6(1)(f)) — zapobieganie oszustwom, łagodzenie nadużyć, podstawowe logowanie zabezpieczeń oraz doskonalenie Usługi.",
              "**Zgoda** (Art. 6(1)(a)) — wiadomości marketingowe, opcjonalne pliki cookie analityczne lub reklamowe (jeśli i kiedy będą włączone) oraz jakakolwiek przyszła opcjonalna integracja.",
              "**Obowiązek prawny** (Art. 6(1)(c)) — przechowywanie zapisów rozliczeniowych zgodnie z wymogami francuskiego prawa podatkowego (zazwyczaj dziesięć lat)."
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
            "text": "Przysługują Ci prawa dostępu (Art. 15), sprostowania (Art. 16), usunięcia (Art. 17), ograniczenia przetwarzania (Art. 18), przenoszenia danych (Art. 20), sprzeciwu (Art. 21) oraz wycofania zgody w dowolnym momencie bez wpływu na zgodność wcześniejszego przetwarzania z prawem. Masz również prawo złożenia skargi do CNIL (Francja) lub lokalnego organu nadzorczego. Aby skorzystać z któregokolwiek prawa, wyślij wiadomość na adres [privacy@konvertools.com](mailto:privacy@konvertools.com) z adresu zarejestrowanego w Twoim koncie. Odpowiemy w ciągu trzydziestu (30) dni, zgodnie z wymogiem RODO Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Zewnętrzni przetwórcy danych",
        "blocks": [
          {
            "kind": "p",
            "text": "Świadczenie Usługi wymaga przekazania ściśle ograniczonych danych następującym przetwórcom. Każdy z nich posiada własną politykę prywatności regulującą sposób postępowania z danymi, które otrzymuje od nas."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (zarejestrowany w Singapurze, hostowany w UE dla naszego projektu) — uwierzytelnianie, baza danych, magazyn plików oraz funkcje Edge. Otrzymuje dane uwierzytelniające Twojego konta, dane profilu oraz (przejściowo) jakikolwiek plik, który przesyłasz do narzędzia wspomaganego serwerowo. Działa jako nasz podprocesor.",
              "**Mistral AI** (Francja) — wnioskowanie z dużych modeli językowych w zakresie tłumaczenia, parafrazowania, streszczania, humanizacji tekstu AI, analizy wzorców phishingu oraz innych zadań tekstowych; transkrypcja audio (Voxtral); OCR obrazów oraz zadania wizyjne (Pixtral). Tekst lub obraz, który przesyłasz, jest wysyłany do Mistral w celu przeprowadzenia wnioskowania. Mistral zobowiązał się umownie **nie używać wprowadzanych danych API do trenowania swoich modeli**.",
              "**VirusTotal** (Google LLC, USA) — wyłącznie podczas korzystania ze skanera wirusów. Przesyłany jest jedynie skrót SHA-256 Twojego pliku, nigdy sam plik.",
              "**Google Safe Browsing** (Google LLC, USA) — wyłącznie podczas korzystania ze skanera adresów URL lub wykrywacza phishingu. Przesyłane są jedynie adresy URL, które wpisujesz (lub linki wyodrębnione z wiadomości e-mail, którą wklejasz).",
              "**Stripe** (USA / Irlandia) — przetwarzanie płatności i zarządzanie subskrypcjami. **Nigdy nie widzimy ani nie przechowujemy** szczegółów Twojej karty. Stripe otrzymuje Twój adres e-mail, metodę płatności oraz plan/pakiet kredytów, który zakupiłeś.",
              "**Resend** (USA) — dostarczanie wiadomości e-mail transakcyjnych (potwierdzenia konta, potwierdzenia płatności, reset hasła). Otrzymuje Twój adres e-mail oraz treść wiadomości, którą wysyłamy.",
              "**Vercel** (USA) — sieć dostarcy treści dla statycznych stron. Otrzymuje standardowe metadane ruchu sieciowego (adres IP, user-agent, żądany adres URL) w celach routingu i zapobiegania nadużyciom. Przechowywane zgodnie z polityką retencji logów Vercel."
            ]
          },
          {
            "kind": "p",
            "text": "W przypadku, gdy którykolwiek z tych przetwórców działa poza Europejskim Obszarem Gospodarczym, transfery są regulowane przez Standardowe Klauzule Umowne (SCCs) Komisji Europejskiej lub równoważny mechanizm transferu."
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
              "**Niezbędne**: NEXT_LOCALE (zapamiętuje wybrany przez Ciebie język) oraz ciasteczka sesji Supabase (sb-*-auth-token) podczas logowania. Nie wymagają one zgody zgodnie z RODO.",
              "**Opcjonalne reklamowe**: jeśli i kiedy włączymy partnerów reklamowych (obecnie w naszym kodzie jest zdefiniowany Ezoic, ale nie jest aktywowany dla Twojego ruchu), wyświetlimy wyraźny baner zgody i ustawimy pliki cookie reklamowe dopiero po wyrażeniu przez Ciebie zgody."
            ]
          },
          {
            "kind": "p",
            "text": "Obecnie nie prowadzimy żadnej analizy, znaczników śledzenia ani tagów remarketingowych. Jeśli dodamy jakiekolwiek, powyższy baner cookie będzie je blokował."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Bezpieczeństwo",
        "blocks": [
          {
            "kind": "p",
            "text": "Cały ruch do i z Serwisu jest szyfrowany protokołem TLS 1.2 lub wyższym. Hasła są przechowywane w postaci skrótów Argon2 przez Supabase Auth. Sprawdzamy nowe hasła po stronie klienta za pomocą publicznego API HaveIBeenPwned (metoda k-anonimowości), aby uniemożliwić użycie znanego naruszonego hasła. Klucze API są przechowywane jedynie w postaci skrótów SHA-256. Rekordy w bazie danych są chronione przez polityki bezpieczeństwa na poziomie wierszy, które uniemożliwiają odczytanie danych jednego użytkownika przez innego. Pomimo tych środków żaden system nie jest doskonale bezpieczny; akceptujesz inherentne ryzyko resztkowe związane z każdą usługą online."
          }
        ]
      },
      {
        "id": "retention",
        "title": "10. Retencja danych",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "Dane profilu: przechowywane przez okres istnienia konta, usuwane w ciągu trzydziestu (30) dni od zamknięcia konta.",
              "Metadane zadań: automatycznie usuwane po dwóch (2) godzinach.",
              "Pliki wynikowe w magazynie pamięci masowej: fizycznie usuwane w ciągu trzydziestu (30) minut od wygenerowania.",
              "Zapisy rozliczeniowe: przechowywane przez dziesięć (10) lat w celu spełnienia francuskich obowiązków podatkowych.",
              "Rekordy zgody: przechowywane przez okres istnienia konta oraz przez pięć (5) lat od jego usunięcia w celach dowodowych."
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
            "text": "Serwis **nie jest skierowany do osób poniżej szesnastego (16) roku życia**. Jeśli nie ukończyłeś tego wieku, nie możesz zakładać konta. Nie gromadzimy danych osób niepełnoletnich świadomie; jeśli dowiemy się, że zgromadziliśmy takie dane, usuniemy je."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Zmiany w niniejszej polityce",
        "blocks": [
          {
            "kind": "p",
            "text": "Możemy okresowo zmieniać niniejszą Politykę Prywatności. Istotne zmiany zostaną ogłoszone e-mailowo do posiadaczy kont co najmniej trzydzieści (30) dni przed wejściem w życie. Najnowsza wersja jest zawsze dostępna pod adresem [https://konvertools.com/privacy](https://konvertools.com/privacy)."
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
    "lastUpdatedLabel": "Останнє оновлення: %DATE% · Діє негайно для всіх відвідувачів та власників облікових записів.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Наш основний принцип: ми не зберігаємо ваші файли",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (далі — «Сервіс») працює як інструментарій, орієнтований на конфіденційність. Найважливіше зобов’язання, яке ми беремо на себе, полягає в наступному:"
          },
          {
            "kind": "ul",
            "items": [
              "**Інструменти, що працюють лише у браузері** (конвертери зображень, інструменти для роботи з PDF, що використовують pdf-lib, конвертація аудіо та відео за допомогою FFmpeg.wasm, інструменти для роботи з кодом, калькулятори, генератори QR-кодів, більшість утиліт) виконуються **повністю всередині вашого веб-браузера за допомогою WebAssembly**. Ваш файл ніколи не передається на наші сервери. У нас немає технічної можливості його прочитати.",
              "**Інструменти з підтримкою сервера** (AI-транскрибування, AI-переклад, AI-обробка тексту, накладання субтитрів на відео, антивірусний сканер, сканер URL-адрес, детектор фішингу та деякі інші) потребують передачі даних на бекенд. У кожному випадку файл або текст обробляється в режимі реального часу, після чого або (a) видаляється зі тимчасового сховища протягом тридцяти (30) хвилин, або (b) — для антивірусного сканера — взагалі не передається (лише SHA-256-хеш файлу залишає ваш пристрій).",
              "Ми ніколи не зберігаємо вміст завантажених файлів у будь-якому постійному місці, не використовуємо ваші завантаження для навчання моделей AI та не продаємо, не здаємо в оренду та не передаємо їх третім сторонам для будь-яких цілей, окрім надання результату, який ви запросили."
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
              "**Облікові дані** облікового запису: ваша електронна адреса; солений та хешований варіант вашого пароля (керований Supabase Auth — ми ніколи не бачимо та не зберігаємо пароль у відкритому вигляді); за бажанням — ім’я для відображення та URL-адреса аватара, якщо ви увійшли за допомогою Google.",
              "**Стан підписки**: поточний тарифний план (безкоштовний / Pro / Business), ідентифікатор клієнта Stripe, поточний кредитний баланс, а також дати ваших останніх поновлень.",
              "**Лічильники використання**: агреговані лічильники квот (наприклад, «3 AI-запуски сьогодні», «420 AI-запусків на місяць») оновлюються безпосередньо у вашому профілі. Ми **не ведемо записів на рівні окремих запусків**.",
              "**Метадані завдань (тимчасові)**: коли інструмент з підтримкою сервера генерує результат (наприклад, файл .srt з транскрибування), ми фіксуємо назву інструменту, URL-адресу завантаження результату, вихідну мову та час завершення. Ці рядки автоматично видаляються через **дві (2) години**. Вони ніколи не містять вмісту вашого файлу.",
              "**Записи згоди**: дата та час, коли ви прийняли ці Умови та нашу Політику конфіденційності, а також чи ви дали згоду на отримання маркетингових листів. Зберігаються протягом існування вашого облікового запису плюс п’ять (5) років після видалення для юридичних доказів.",
              "**API-ключі**: якщо ви генеруєте ключі для публічного REST API, ми зберігаємо лише SHA-256-хеш та 12-символьний префікс для відображення. Повний ключ показується вам лише один раз під час створення та після цього не відновлюється."
            ]
          },
          {
            "kind": "p",
            "text": "Ми **не збираємо**: вашу IP-адресу (окрім тимчасового використання Supabase та нашого хостинг-провайдера для обмеження швидкості та логування безпеки), відбиток браузера, події поведінкового трекінгу, записи вашого екрана або будь-які біометричні дані."
          }
        ]
      },
      {
        "id": "files",
        "title": "4. Файли, які ви обробляєте",
        "blocks": [
          {
            "kind": "p",
            "text": "Як зазначено в розділі 1, вміст файлів, які ви обробляєте, ніколи не зберігається нами. Точний життєвий цикл:"
          },
          {
            "kind": "ul",
            "items": [
              "**Інструменти, що працюють лише у браузері**: нульова передача. Файл зчитується у пам’ять вашим браузером, результат генерується локально, і ви завантажуєте його безпосередньо. Ми нічого не логуємо щодо самого файлу.",
              "**AI-транскрибування / переклад / OCR / аналіз фішингу**: файл або текст потоково передається до нашої Supabase Edge Function, яка миттєво перенаправляє його відповідному постачальнику AI (див. розділ 7) для виконання. Результат повертається вам, а тимчасовий буфер завантаження видаляється. Файли результатів, записані у нашому приватному сховищі об’єктів, доступні вам за підписаною URL-адресою протягом шістдесяти (60) хвилин і фізично видаляються протягом тридцяти (30) хвилин після генерації.",
              "**Антивірусний сканер**: ваш файл ніколи не залишає ваш браузер. Ми обчислюємо його SHA-256-хеш локально і відправляємо лише отриманий 64-символьний хеш до VirusTotal. VirusTotal не може відновити ваш файл з його хешу.",
              "**Сканер URL-адрес**: передається лише рядок URL-адреси, яку ви вводите, до Google Safe Browsing. Жоден інший вміст сторінки не передається."
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
              "**Виконання договору** (Art. 6(1)(b)) — коли ви створюєте обліковий запис і використовуєте платні функції, обробка необхідна для надання Сервісу.",
              "**Законні інтереси** (Art. 6(1)(f)) — запобігання шахрайству, пом’якшення зловживань, базове логування безпеки та покращення Сервісу.",
              "**Згода** (Art. 6(1)(a)) — маркетингові електронні листи, необов’язкові аналітичні або рекламні cookies (за наявності), а також будь-які майбутні необов’язкові інтеграції.",
              "**Правовий обов’язок** (Art. 6(1)(c)) — зберігання платіжних записів відповідно до вимог французького податкового законодавства (зазвичай десять років)."
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
            "text": "Ви маєте права на доступ (Art. 15), виправлення (Art. 16), видалення (Art. 17), обмеження обробки (Art. 18), перенесення даних (Art. 20), заперечення (Art. 21) та відкликання згоди в будь-який час без впливу на законність попередньої обробки. Ви також маєте право подати скаргу до CNIL (Франція) або до місцевого наглядового органу. Для реалізації будь-якого права напишіть на [privacy@konvertools.com](mailto:privacy@konvertools.com) з електронної адреси, зареєстрованої у вашому обліковому записі. Ми відповімо протягом тридцяти (30) днів, як вимагає GDPR Art. 12(3)."
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "7. Треті сторони-обробники",
        "blocks": [
          {
            "kind": "p",
            "text": "Для надання Сервісу нам необхідно передавати строго обмежені дані наступним обробникам. Кожен з них має власну політику конфіденційності, яка регулює, як вони обробляють дані, отримані від нас."
          },
          {
            "kind": "ul",
            "items": [
              "**Supabase** (зареєстрований у Сінгапурі, хостинг у ЄС для нашого проєкту) — автентифікація, база даних, сховище файлів та Edge Functions. Отримує ваші облікові дані, профільні дані та (тимчасово) будь-який файл, який ви завантажуєте для інструменту з підтримкою сервера. Виступає нашим суборобітником.",
              "**Mistral AI** (Франція) — виконання великомовних моделей для перекладу, перефразування, резюмування, AI-гуманізації, аналізу шаблонів фішингу та інших текстових завдань; аудіотранскрибування (Voxtral); OCR та візуальні завдання для зображень (Pixtral). Текст або зображення, які ви надсилаєте, передаються Mistral для виконання. Mistral взяв на себе договірне зобов’язання **не використовувати вхідні дані API для навчання своїх моделей**.",
              "**VirusTotal** (Google LLC, США) — лише під час використання Антивірусного сканера. Передається лише SHA-256-хеш вашого файлу, але не сам файл.",
              "**Google Safe Browsing** (Google LLC, США) — лише під час використання Сканера URL-адрес або Детектора фішингу. Передаються лише URL-адреси, які ви вводите (або посилання, вилучені з електронного листа, який ви вставляєте).",
              "**Stripe** (США / Ірландія) — обробка платежів та управління підпискою. Ми **ніколи не бачимо та не зберігаємо** деталі вашої карти. Stripe отримує вашу електронну адресу, спосіб оплати та тарифний план/пакет кредитів, які ви придбали.",
              "**Resend** (США) — доставка транзакційних електронних листів (підтвердження облікового запису, квитанції про оплату, скидання пароля). Отримує вашу електронну адресу та тіло електронного листа, який ми відправляємо.",
              "**Vercel** (США) — мережа доставки контенту для статичних сторінок. Отримує стандартні метадані веб-трафіку (IP, user-agent, запитуваний URL) для маршрутизації та запобігання зловживанням. Зберігаються відповідно до політики зберігання логів Vercel."
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
              "**Необхідні**: NEXT_LOCALE (зберігає обрану вами мову) та cookies сесії Supabase (sb-*-auth-token) під час роботи в обліковому записі. Вони не потребують згоди відповідно до GDPR.",
              "**Необов’язкова реклама**: якщо ми активуємо партнерів з реклами (наразі Ezoic згадується у нашому коді, але ще не активний для вашого трафіку), ми відобразимо чітке банер згоди та встановлюватимемо рекламні cookies лише після вашої згоди."
            ]
          },
          {
            "kind": "p",
            "text": "Наразі ми не використовуємо жодних аналітичних інструментів, пікслів відстеження або тегів ремаркетингу. Якщо ми додамо будь-які з них, банер згоди вище буде контролювати їх."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Безпека",
        "blocks": [
          {
            "kind": "p",
            "text": "Уся інформація, що передається до та з Сервісу, шифрується за допомогою TLS 1.2 або вище. Паролі зберігаються у вигляді хешів Argon2 за допомогою Supabase Auth. Ми перевіряємо нові паролі за допомогою клієнтського API HaveIBeenPwned k-anonymity, тому відомі зламані паролі не можуть бути використані. API-ключі зберігаються лише у вигляді SHA-256-хешів. Рядки бази даних захищені політиками безпеки на рівні рядків, що гарантує, що один користувач не може прочитати дані іншого. Незважаючи на ці заходи, жодна система не є абсолютно захищеною; ви приймаєте залишковий ризик, властивий будь-якому онлайн-сервісу."
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
              "Дані профілю: зберігаються протягом існування вашого облікового запису, видаляються протягом тридцяти (30) днів після закриття облікового запису.",
              "Метадані завдань: автоматично видаляються через дві (2) години.",
              "Файли результатів у сховищі об’єктів: фізично видаляються протягом тридцяти (30) хвилин після генерації.",
              "Платіжні записи: зберігаються протягом десяти (10) років для дотримання французьких податкових зобов’язань.",
              "Записи згоди: зберігаються протягом існування вашого облікового запису плюс п’ять (5) років після цього як юридичні докази."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Неповнолітні",
        "blocks": [
          {
            "kind": "p",
            "text": "Сервіс **не призначений для дітей віком до шістнадцяти (16) років****. Якщо вам менше цього віку, ви не повинні створювати обліковий запис. Ми свідомо не збираємо дані неповнолітніх; якщо нам стане відомо про таке збирання, ми негайно видалимо їх."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Зміни в цій політиці",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми можемо періодично оновлювати цю Політику конфіденційності. Істотні зміни буде оголошено електронною поштою власникам облікових записів щонайменше за тридцять (30) днів до набрання чинності. Остання версія завжди доступна за адресою [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Контакт",
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
    "lastUpdatedLabel": "Poslední aktualizace: %DATE% · Platné okamžitě pro všechny návštěvníky a držitele účtů.",
    "sections": [
      {
        "id": "principle",
        "title": "1. Naše základní zásada: vaše soubory neukládáme",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools (dále jen „Služba“) funguje jako nástroj s důrazem na ochranu soukromí. Naše nejdůležitější závazek zní takto:"
          },
          {
            "kind": "ul",
            "items": [
              "**Nástroje běžící pouze v prohlížeči** (konvertory obrázků, nástroje PDF využívající pdf-lib, převody zvuku a videa prostřednictvím FFmpeg.wasm, nástroje pro kód, kalkulačky, generátory QR kódů, většina utilit) se provádějí **zcela uvnitř vašeho webového prohlížeče prostřednictvím WebAssembly**. Váš soubor nikdy není odesílán na naše servery. Nemáme technické prostředky, jak jej přečíst.",
              "**Nástroje využívající server** (AI transkripce, AI překlady, AI textové úlohy, vkládání titulků do videa, antivirový skener, skener URL, detektor phishingu a několik dalších) musí něco odeslat na backend. V každém případě je soubor či text zpracováván v reálném čase a buď (a) je do třiceti (30) minut smazán z dočasného úložiště, nebo (b) – u antivirového skeneru – není vůbec odeslán (z vašeho zařízení odchází pouze hash souboru SHA-256).",
              "Nikdy neukládáme obsah žádného nahraného souboru v žádném trvalém umístění, nikdy nepoužíváme vaše soubory k výcviku AI modelů a nikdy je neprodáváme, nepronajímáme ani nesdílíme s třetími stranami za žádným účelem kromě doručení výsledku, který jste si vyžádali."
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
            "text": "Jediné osobní údaje, které trvale ukládáme v naší databázi, jsou:"
          },
          {
            "kind": "ul",
            "items": [
              "**Přihlašovací údaje**: vaše e-mailová adresa; solený a hašovaný záznam vašeho hesla (spravovaný službou Supabase Auth – my nevidíme ani neukládáme prostý text); volitelný zobrazovaný název a URL avataru, pokud se přihlásíte pomocí Google.",
              "**Stav předplatného**: aktuální tarif (zdarma / Pro / Business), identifikátor zákazníka ve službě Stripe, aktuální zůstatek kreditů a data vašich posledních obnov.",
              "**Počítadla využití**: agregovaná počítadla kvót (např. „Dnes jste použili 3 AI běhy“, „Letos jste použili 420 AI běhů“) aktualizovaná přímo ve vašem profilu. **Neukládáme** záznamy o jednotlivých bězích.",
              "**Metadata úloh (dočasné)**: pokud nástroj využívající server vyprodukuje výstup (např. soubor .srt z transkripce), zaznamenáme název nástroje, URL pro stažení výsledku, zdrojový jazyk a čas dokončení. Tyto řádky jsou automaticky odstraněny po **dvě (2) hodinách**. Nikdy neobsahují obsah vašeho souboru.",
              "**Záznamy o souhlasu**: datum a čas, kdy jste přijali tyto Podmínky a naše Zásady ochrany osobních údajů, a zda jste souhlasili s marketingovými e-maily. Ukládány po dobu existence vašeho účtu plus pět (5) let po jeho smazání jako právní důkaz.",
              "**API klíče**: pokud vygenerujete klíče pro veřejné REST API, ukládáme pouze hash SHA-256 a 12 znaků zobrazovaného prefixu. Originální klíč je vám zobrazen pouze jednou při vytvoření a poté je nezotavitelný."
            ]
          },
          {
            "kind": "p",
            "text": "**Neukládáme**: vaši IP adresu (kromě dočasného použití, které pro účely omezování a zabezpečení využívají Supabase a náš hostingový poskytovatel), otisk prohlížeče, sledovací události chování, záznamy z vašeho obrazovky ani žádná biometrická data."
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
              "**Nástroje běžící pouze v prohlížeči**: žádný přenos. Soubor je přečten do paměti vaším prohlížečem, výsledek je vyprodukován lokálně a vy si jej stáhnete přímo. O souboru samotném nic nezaznamenáváme.",
              "**AI transkripce / překlad / OCR / analýza phishingu**: soubor či text je streamován do naší Edge Funkce Supabase, která jej okamžitě předá příslušnému poskytovateli AI (viz část 7) pro inferenci. Výsledek je vrácen vám a dočasný úložný buffer je odstraněn. Výsledné soubory zapsané do našeho privátního úložiště jsou přístupné prostřednictvím podepsaných URL po šedesát (60) minut a fyzicky smazány do třiceti (30) minut od vygenerování.",
              "**Antivirový skener**: váš soubor nikdy neopustí váš prohlížeč. Lokálně vypočítáme jeho SHA-256 otisk a odešleme pouze výsledný 64 znaků dlouhý hash do služby VirusTotal. VirusTotal nemůže ze svého hashe váš soubor rekonstruovat.",
              "**Skener URL**: je odeslán pouze řetězec URL, který zadáte, do služby Google Safe Browsing. Žádný obsah okolní stránky."
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
              "**Plnění smlouvy** (čl. 6 odst. 1 písm. b)) – při vytváření účtu a používání placených funkcí je zpracování nezbytné k poskytování Služby.",
              "**Legitimní zájem** (čl. 6 odst. 1 písm. f)) – prevence podvodů, zmírňování zneužívání, základní bezpečnostní logování a zlepšování Služby.",
              "**Souhlas** (čl. 6 odst. 1 písm. a)) – marketingové e-maily, volitelné analytické nebo reklamní cookies (pokud a kdykoli jsou povoleny) a případné budoucí volitelné integrace.",
              "**Právní povinnost** (čl. 6 odst. 1 písm. c)) – uchovávání účetních záznamů dle francouzského daňového práva (obvykle deset let)."
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
            "text": "Máte právo na přístup (čl. 15), opravu (čl. 16), výmaz (čl. 17), omezení zpracování (čl. 18), přenositelnost (čl. 20), odpor (čl. 21) a odvolání souhlasu kdykoli bez ovlivnění zákonnosti předchozího zpracování. Máte také právo podat stížnost u CNIL (Francie) nebo u příslušného dozorového orgánu ve vaší zemi. Chcete-li uplatnit jakékoli právo, zašlete e-mail na [privacy@konvertools.com](mailto:privacy@konvertools.com) z adresy registrované ve vašem účtu. Odpovíme do třiceti (30) dnů, jak požaduje GDPR čl. 12 odst. 3."
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
              "**Supabase** (zaregistrovaný v Singapuru, hostovaný v EU pro náš projekt) – autentizace, databáze, úložiště souborů a Edge Funkce. Přijímá vaše přihlašovací údaje, profilová data a (dočasně) jakýkoli soubor, který nahrajete pro nástroj využívající server. Působí jako náš sub-zpracovatel.",
              "**Mistral AI** (Francie) – inference velkých jazykových modelů pro překlad, parafrázování, shrnování, AI humanizaci, analýzu vzorců phishingu a další textové úlohy; audio transkripci (Voxtral); OCR a úlohy zpracování obrazu (Pixtral). Text či obrázek, který odešlete, je odeslán Mistralu pro inferenci. Mistral se smluvně zavázal **nepoužívat vstupy z API k výcviku svých modelů**.",
              "**VirusTotal** (Google LLC, USA) – pouze při používání Antivirového skeneru. Je odeslán pouze hash SHA-256 vašeho souboru, nikdy samotný soubor.",
              "**Google Safe Browsing** (Google LLC, USA) – pouze při používání Skeneru URL nebo Detektoru phishingu. Jsou odeslány pouze URL, které zadáte (nebo odkazy extrahované z e-mailu, který vložíte).",
              "**Stripe** (USA / Irsko) – zpracování plateb a správa předplatného. **Nikdy nevidíme ani neukládáme** údaje o vaší platební kartě. Stripe přijímá vaši e-mailovou adresu, platební metodu a tarif/balíček kreditů, který jste zakoupili.",
              "**Resend** (USA) – doručování transakčních e-mailů (ověření účtu, potvrzení platby, reset hesla). Přijímá vaši e-mailovou adresu a tělo e-mailu, který odesíláme.",
              "**Vercel** (USA) – obsahová distribuční síť pro statické stránky. Přijímá standardní metadata webového provozu (IP, user-agent, požadovaná URL) pro směrování a prevenci zneužívání. Uchováváno v souladu s retenční politikou Vercelu."
            ]
          },
          {
            "kind": "p",
            "text": "Pokud kterýkoli z těchto zpracovatelů působí mimo Evropský hospodářský prostor, jsou přenosy řízeny Standardními smluvními doložkami Evropské komise (SCCs) nebo obdobným mechanismem přenosu."
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
              "**Volitelné reklamní**: pokud a kdy povolíme reklamní partnery (v současnosti je v našem kódu referenční Ezoic, ale zatím není aktivován pro váš provoz), zobrazíme jasný banner pro souhlas a cookies pro reklamu nastavíme pouze po vašem souhlasu."
            ]
          },
          {
            "kind": "p",
            "text": "V současnosti nepoužíváme žádnou analytiku, sledovací pixely ani remarketingové tagy. Pokud je přidáme, výše uvedený banner pro souhlas je bude řídit."
          }
        ]
      },
      {
        "id": "security",
        "title": "9. Zabezpečení",
        "blocks": [
          {
            "kind": "p",
            "text": "Veškerý provoz Služby je šifrován pomocí TLS 1.2 nebo vyššího. Hesla jsou ukládána jako hashe metodou Argon2 prostřednictvím Supabase Auth. Nová hesla kontrolujeme proti veřejnému API HaveIBeenPwned k-anonymity na straně klienta, takže nelze použít známé prolomené heslo. API klíče jsou ukládány pouze jako hashe SHA-256. Řádky v databázi jsou chráněny politikami zabezpečení na úrovni řádků, které zajišťují, že jeden uživatel nemůže přečíst data jiného uživatele. Navzdory těmto opatřením není žádný systém dokonale zabezpečený; přijímáte zbývající riziko inherentní jakékoli online službě."
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
              "Profilová data: uchovávána po dobu existence vašeho účtu, smazána do třiceti (30) dnů od uzavření účtu.",
              "Metadata úloh: automaticky odstraněna po dvou (2) hodinách.",
              "Výsledné soubory v úložném bucketu: fyzicky smazány do třiceti (30) minut od vygenerování.",
              "Účetní záznamy: uchovávány deset (10) let pro splnění francouzských daňových povinností.",
              "Záznamy o souhlasu: uchovávány po dobu existence vašeho účtu plus pět (5) let poté jako právní důkaz."
            ]
          }
        ]
      },
      {
        "id": "minors",
        "title": "11. Mladiství",
        "blocks": [
          {
            "kind": "p",
            "text": "Služba **není určena dětem mladším šestnácti (16) let**. Pokud jste mladší, nesmíte si vytvořit účet. Úmyslně nesbíráme údaje od nezletilých; pokud se dozvíme, že jsme tak učinili, údaje smažeme."
          }
        ]
      },
      {
        "id": "changes",
        "title": "12. Změny této zásady",
        "blocks": [
          {
            "kind": "p",
            "text": "Tuto Zásadu ochrany osobních údajů můžeme občas změnit. Podstatné změny budou oznámeny držitelům účtů e-mailem alespoň třicet (30) dnů před jejich nabytím účinnosti. Nejnovější verze je vždy k dispozici na [https://konvertools.com/privacy](https://konvertools.com/privacy)."
          }
        ]
      },
      {
        "id": "contact",
        "title": "13. Kontakt",
        "blocks": [
          {
            "kind": "p",
            "text": "Jakékoli dotazy týkající se této zásady nebo vašich údajů zašlete na [privacy@konvertools.com](mailto:privacy@konvertools.com). Můžete také podat stížnost u francouzského dozorového orgánu pro ochranu údajů (CNIL, [cnil.fr](https://www.cnil.fr/)) nebo u dozorového orgánu ve vaší zemi pobytu."
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
            "text": "Les présentes Conditions d'utilisation (les « Conditions ») constituent un accord contraignant entre vous (l'« Utilisateur ») et l'éditeur de Konvertools (l'« Éditeur », « nous », « notre ») concernant votre utilisation du site web Konvertools et de tous les outils, API et services associés (collectivement le « Service »). En créant un compte, en cochant la case d'acceptation lors de l'inscription ou simplement en utilisant un outil du Service, vous confirmez avoir lu, compris et accepté ces Conditions en intégralité, ainsi que notre Politique de confidentialité."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Le Service",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools propose un catalogue d'utilitaires de conversion de fichiers, d'outils de traitement de documents et d'images, d'outils textuels assistés par IA, d'outils de sécurité indicatifs (scanner de virus, vérificateur d'emails, détecteur de phishing, scanner d'URL) et d'utilitaires pour développeurs. La plupart des outils s'exécutent entièrement dans votre navigateur ; certains nécessitent un traitement serveur. Le Service est fourni **« tel quel » et « disponible tel quel »** sans aucune garantie, expresse ou implicite, y compris de qualité marchande, d'adéquation à un usage particulier ou de non-violation de droits."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitation de responsabilité — à lire attentivement",
        "blocks": [
          {
            "kind": "p",
            "text": "**Dans la mesure maximale permise par la loi, l'Éditeur décline toute responsabilité pour les dommages de quelque nature que ce soit résultant de votre utilisation ou de votre incapacité à utiliser le Service.** En particulier, vous reconnaissez et acceptez que l'Éditeur ne saurait être tenu responsable de :"
          },
          {
            "kind": "ul",
            "items": [
              "la perte de données, les fichiers corrompus ou incorrects, ou les conversions échouées ;",
              "les décisions, financières, professionnelles ou autres, que vous prenez en vous basant sur les résultats de tout outil ;",
              "les temps d'arrêt, la latence ou l'indisponibilité temporaire de toute fonctionnalité ;",
              "les défaillances de services tiers (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, hébergeurs) ;",
              "les dommages indirects, accessoires, spéciaux, consécutifs ou punitifs de quelque nature que ce soit ;",
              "tout montant global excédant les frais que vous avez effectivement payés à notre égard au cours des douze (12) mois précédant l'événement donnant lieu à la réclamation, plafonné à cent (100) euros pour les utilisateurs de la formule gratuite."
            ]
          },
          {
            "kind": "p",
            "text": "**Outils de sécurité** : le Scanner de virus, le Scanner d'URL, le Détecteur de phishing et le Vérificateur d'emails sont fournis **à titre informatif et indicatif uniquement**. Ils agrègent des signaux tiers (les 70+ moteurs antivirus de VirusTotal, Google Safe Browsing, le DNS public) et des heuristiques basées sur des grands modèles de langage. Ils **ne constituent pas une garantie de sécurité, de validité ou d'absence de risque**. De nouveaux malwares peuvent échapper à la détection jusqu'à ce que les moteurs antivirus soient mis à jour ; de nouvelles pages de phishing apparaissent plus rapidement que les bases de données de réputation ne peuvent les répertorier ; un email validé par nos outils peut toujours être inactif ou frauduleux. L'Éditeur décline expressément toute responsabilité pour tout préjudice résultant d'un fichier malveillant non détecté par le Service, d'un email de phishing jugé sûr par le Service, d'un lien dangereux non identifié par le Service ou d'un email transactionnel envoyé à une adresse marquée comme valide par le Service. L'Utilisateur assume l'entière responsabilité des décisions de sécurité prises sur la base de ces outils."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. Utilisation acceptable",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous vous engagez à **ne pas** utiliser le Service pour :"
          },
          {
            "kind": "ul",
            "items": [
              "télécharger, traiter ou distribuer du contenu illégal dans votre juridiction ou en France ;",
              "traiter des fichiers pour lesquels vous ne détenez pas les droits nécessaires (œuvres protégées par le droit d'auteur sans autorisation, données personnelles que vous n'êtes pas autorisé à traiter, informations classifiées) ;",
              "commettre ou faciliter la fraude, le blanchiment d'argent, le financement du terrorisme ou toute activité criminelle ;",
              "utiliser l'humanisateur d'IA, les outils textuels d'IA ou toute autre fonctionnalité pour plagier, tromper un tiers, manipuler des systèmes d'évaluation (académiques, de recrutement, de réseaux publicitaires) d'une manière contraire à leurs règles, ou induire en erreur d'une façon qui enfreint la loi applicable ;",
              "télécharger des malwares pour tester notre scanner si cela enfreint la loi dans votre juridiction (utilisez plutôt le fichier de test EICAR) ;",
              "tenter de surcharger, de rétro-ingénierie, de scraper, d'abuser des limites de débit, ou d'interférer d'une autre manière avec le fonctionnement ou la disponibilité du Service ;",
              "contourner les quotas, les exigences de paiement ou toute autre restriction en place ;",
              "créer plusieurs comptes pour multiplier les quotas de la formule gratuite ou partager un compte avec plus d'individus que ne le permet votre formule."
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
            "text": "Vous conservez tous les droits, titre et intérêt sur les fichiers et le texte que vous soumettez au Service. Vous nous accordez une licence limitée, non exclusive, mondiale, gratuite et strictement nécessaire pour les traiter uniquement afin de fournir l'outil que vous avez demandé. Cette licence prend fin dès que le résultat vous est retourné (outils assistés par serveur) ou n'existe tout simplement pas (outils exécutés dans le navigateur, puisque votre fichier ne nous parvient jamais). Nous ne revendiquons pas et ne revendiquerons pas la propriété de votre contenu, ni ne l'utiliserons pour entraîner des modèles d'IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Comptes",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous devez avoir au moins seize (16) ans pour créer un compte. Vous êtes responsable de la confidentialité de vos identifiants et de toute activité se produisant sous votre compte. Signalez-nous immédiatement à l'adresse [security@konvertools.com](mailto:security@konvertools.com) tout accès non autorisé suspecté."
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
              "**Formules** : Gratuite (0 €), Pro (12 €/mois ou 99 €/an), Business (39 €/mois ou 349 €/an). Les fonctionnalités et quotas des formules sont ceux décrits sur notre [page Tarifs](/pricing) au moment de l'achat. Nous nous réservons le droit de modifier les fonctionnalités des formules avec un préavis de 30 jours.",
              "**Renouvellement automatique** : les abonnements mensuels et annuels se renouvellent automatiquement à la même cadence jusqu'à annulation. Vous pouvez annuler à tout moment depuis votre tableau de bord ; l'annulation prend effet à la fin de la période de facturation en cours. Vous conservez l'accès jusqu'à cette date.",
              "**Droit de rétractation (UE)** : conformément à l'article L. 221-28 du Code de la consommation français, lorsque vous utilisez activement le Service pendant la période initiale de rétractation de 14 jours, vous consentez expressément à l'exécution immédiate du contrat et renoncez à votre droit de rétractation. Si vous n'avez pas utilisé de fonctionnalité payante, vous pouvez vous rétracter dans les 14 jours en envoyant un email à [billing@konvertools.com](mailto:billing@konvertools.com) et nous vous rembourserons intégralement sous 14 jours.",
              "**Aucun remboursement partiel** : en dehors du scénario de rétractation ci-dessus, les frais déjà payés pour la période de facturation en cours ne sont pas remboursables.",
              "**Crédits** : les crédits API achetés sous forme de packs ponctuels (« Starter », « Growth », « Scale », « Studio ») **ne périment jamais**. Les 300 crédits automatiquement attribués chaque mois aux abonnés Business périment à la fin du mois civil et **ne sont pas remboursables**.",
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
              "**Limites de débit** : 60 requêtes par minute (forfaits Pro supplémentaires) ou 120 requêtes par minute (formule Business). Un abus prolongé peut entraîner un ralentissement temporaire ou une révocation définitive de la clé.",
              "**Consommation de crédits** : chaque appel API déduit des crédits aux tarifs publiés dans notre [documentation API](/api). Les appels échoués (réponses 5xx) ne déduisent pas de crédits.",
              "**Sécurité des clés** : vous êtes responsable du stockage sécurisé de vos clés API et de leur rotation en cas de compromission. Nous pouvons révoquer toute clé à tout moment si nous suspectons un abus.",
              "**Utilisation en amont acceptable** : les applications construites sur notre API doivent respecter ces Conditions, y compris la section sur l'utilisation acceptable. Vous ne devez pas exposer nos clés API aux utilisateurs finaux (sous-licencez plutôt votre service)."
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
            "text": "Le nom, le logo, le code, la conception, la documentation, la structure de la base de données et le contenu agrégé du Service sont la propriété exclusive de l'Éditeur et sont protégés par le droit français et international de la propriété intellectuelle. Aucune licence ne vous est accordée en dehors de ce qui est strictement nécessaire pour utiliser le Service comme prévu. Vous ne pouvez pas reproduire, modifier, désassembler ou créer des œuvres dérivées du Service ou de l'une de ses parties, sauf dans la mesure expressément autorisée par la loi applicable."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnisation",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous acceptez d'indemniser et de garantir l'Éditeur contre toute réclamation, perte, dommage, responsabilité, coût ou dépense (y compris les honoraires d'avocat raisonnables) découlant de (a) votre manquement à ces Conditions, (b) votre violation de toute loi ou droit d'un tiers, ou (c) tout contenu que vous avez soumis au Service."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Modifications des Conditions",
        "blocks": [
          {
            "kind": "p",
            "text": "Nous pouvons modifier ces Conditions à tout moment. Les modifications substantielles seront notifiées par email aux titulaires de compte au moins trente (30) jours avant leur entrée en vigueur. En continuant à utiliser le Service après cette période, vous acceptez les Conditions modifiées. La dernière version est toujours disponible à l'adresse [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Résiliation",
        "blocks": [
          {
            "kind": "p",
            "text": "Vous pouvez résilier votre compte à tout moment depuis votre tableau de bord. Nous pouvons résilier ou suspendre votre compte immédiatement et sans préavis si vous enfreignez ces Conditions, abusez du Service ou ne payez pas un abonnement récurrent. À la résiliation, vos données sont supprimées sous trente (30) jours, sauf les enregistrements de facturation et de consentement conservés comme décrit dans notre Politique de confidentialité."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Loi applicable et juridiction",
        "blocks": [
          {
            "kind": "p",
            "text": "Ces Conditions sont régies par les lois de la France. Tout litige découlant ou lié à ces Conditions ou au Service sera soumis à la juridiction exclusive des tribunaux de Paris, France, sauf si le droit de recours obligatoire du consommateur dans son pays de résidence prévaut en vertu du droit de l'Union européenne ou du droit national applicable. Avant d'engager une action en justice, vous acceptez de tenter de résoudre le litige à l'amiable en écrivant à [legal@konvertools.com](mailto:legal@konvertools.com). Les consommateurs de l'UE peuvent également utiliser la plateforme de résolution des litiges en ligne de la Commission européenne à l'adresse [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Divers",
        "blocks": [
          {
            "kind": "p",
            "text": "Si une disposition de ces Conditions est jugée invalide ou inexécutoire, les autres dispositions restent pleinement en vigueur. Notre failure à faire respecter un droit ou une disposition ne constitue pas une renonciation à ce droit. Ces Conditions (ainsi que la Politique de confidentialité et toute condition spécifique à une formule référencée lors de l'achat) constituent l'intégralité de l'accord entre vous et l'Éditeur concernant le Service."
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
            "text": "Estos Términos de Servicio (los \"Términos\") constituyen un acuerdo vinculante entre usted (el \"Usuario\") y el editor de Konvertools (el \"Editor\", \"nosotros\", \"nuestra\") con respecto a su uso del sitio web de Konvertools y todas las herramientas, APIs y servicios relacionados (en conjunto, el \"Servicio\"). Al crear una cuenta, marcar la casilla de aceptación al registrarse o simplemente al utilizar cualquier herramienta del Servicio, confirma que ha leído, comprendido y aceptado estos Términos en su totalidad, junto con nuestra Política de Privacidad."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. El Servicio",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools ofrece un catálogo de utilidades de conversión de archivos, herramientas de procesamiento de documentos e imágenes, utilidades de texto asistidas por IA, herramientas de seguridad indicativas (escáner de virus, verificador de correos electrónicos, detector de phishing, escáner de URLs) y utilidades para desarrolladores. La mayoría de las herramientas se ejecutan íntegramente en su navegador; algunas requieren procesamiento en el servidor. El Servicio se ofrece **\"tal cual\" y \"disponible\"** sin garantía alguna, expresa o implícita, incluyendo comerciabilidad, aptitud para un propósito particular o no infracción."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitación de responsabilidad — léase con atención",
        "blocks": [
          {
            "kind": "p",
            "text": "**En la máxima medida permitida por la ley, el Editor declina cualquier responsabilidad por daños de cualquier tipo derivados del uso o la imposibilidad de usar el Servicio.** En particular, usted reconoce y acepta que el Editor no será responsable de:"
          },
          {
            "kind": "ul",
            "items": [
              "pérdida de datos, archivos corruptos o incorrectos, o conversiones fallidas;",
              "decisiones, financieras, comerciales u otras, que tome en función de los resultados de cualquier herramienta;",
              "tiempos de inactividad, latencia o indisponibilidad temporal de cualquier función;",
              "fallos de servicios de terceros (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, proveedores de alojamiento);",
              "daños indirectos, incidentales, especiales, consecuentes o punitivos de cualquier tipo;",
              "cualquier importe agregado que supere las tarifas que usted haya pagado efectivamente a nosotros en los doce (12) meses anteriores al evento que dé lugar a la reclamación, con un límite de cien (100) euros para usuarios de nivel gratuito."
            ]
          },
          {
            "kind": "p",
            "text": "**Herramientas de seguridad**: el Escáner de Virus, el Escáner de URLs, el Detector de Phishing y el Verificador de Correos Electrónicos se proporcionan **únicamente con fines informativos e indicativos**. Agregan señales de terceros (más de 70 motores antivirus de VirusTotal, Google Safe Browsing, DNS públicos) y heurísticos basados en modelos de lenguaje avanzado. **No constituyen una garantía de seguridad, validez o ausencia de riesgos.** El malware nuevo puede evadir la detección hasta que los motores antivirus se actualicen; las páginas de phishing aparecen más rápido de lo que las bases de datos de reputación pueden catalogarlas; un correo que pase nuestras verificaciones puede seguir siendo fraudulento o inactivo. El Editor declina expresamente toda responsabilidad por cualquier daño derivado de un archivo malicioso que el Servicio no haya marcado, un correo de phishing que el Servicio haya considerado seguro, un enlace inseguro que el Servicio no haya identificado o un correo transaccional enviado a una dirección que el Servicio marcó como válida. El Usuario asume la responsabilidad exclusiva de las decisiones de seguridad tomadas en función de estas herramientas."
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
              "utilizar el humanizador de IA, las herramientas de texto de IA o cualquier otra función para plagiar, engañar a un tercero, manipular sistemas de evaluación (académicos, de contratación, redes publicitarias) de manera que viole sus normas, o inducir a error de cualquier forma que infrinja la legislación aplicable;",
              "subir malware para probar nuestro escáner si hacerlo infringiera la ley en su jurisdicción (utilice el archivo de prueba EICAR en su lugar);",
              "intentar saturar, ingeniería inversa, raspar, abusar de los límites de velocidad, o interferir de cualquier otra forma con el funcionamiento o la disponibilidad del Servicio;",
              "eludir cuotas, requisitos de pago u otras restricciones vigentes;",
              "crear múltiples cuentas para multiplicar las cuotas del nivel gratuito o compartir una cuenta con más personas de las permitidas por su plan."
            ]
          },
          {
            "kind": "p",
            "text": "Podemos suspender o dar por finalizada su cuenta de inmediato y sin previo aviso si tenemos motivos razonables para creer que ha incumplido esta sección, sin derecho a reembolso alguno."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Su contenido",
        "blocks": [
          {
            "kind": "p",
            "text": "Usted conserva todos los derechos, título e interés sobre los archivos y textos que envíe al Servicio. Nos otorga una licencia estrictamente limitada, no exclusiva, mundial, libre de regalías, para procesarlos únicamente con el fin de proporcionar la herramienta que solicitó. Esta licencia finaliza en el momento en que se le devuelve el resultado (herramientas asistidas por servidor) o nunca llega a existir (herramientas que funcionan solo en el navegador, ya que su archivo nunca nos llega). No reclamamos ni utilizaremos su contenido para entrenar modelos de IA."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Cuentas",
        "blocks": [
          {
            "kind": "p",
            "text": "Debe tener al menos dieciséis (16) años para crear una cuenta. Es responsable de mantener confidenciales sus credenciales y de cualquier actividad que ocurra bajo su cuenta. Notifíquenos de inmediato cualquier acceso no autorizado sospechoso a [security@konvertools.com](mailto:security@konvertools.com)."
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
              "**Planes**: Gratis (€0), Pro (€12/mes o €99/año), Empresa (€39/mes o €349/año). Las características y cuotas de los planes se describen en nuestra página de [Precios](/pricing) en el momento de la compra. Nos reservamos el derecho de modificar las características de los planes con 30 días de antelación.",
              "**Renovación automática**: las suscripciones mensuales y anuales se renuevan automáticamente en el mismo ciclo hasta que sean canceladas. Puede cancelar en cualquier momento desde su panel de control; la cancelación surtirá efecto al final del período de facturación actual. Mantendrá el acceso hasta esa fecha.",
              "**Derecho de desistimiento (UE)**: según el Artículo L. 221-28 del Código de Consumo francés, si utiliza activamente el Servicio durante el período inicial de 14 días de desistimiento, consiente expresamente en la ejecución inmediata del contrato y renuncia a su derecho de desistimiento. Si no ha utilizado ninguna función de pago, puede desistir en un plazo de 14 días enviando un correo a [billing@konvertools.com](mailto:billing@konvertools.com) y le reembolsaremos el importe íntegro en un plazo de 14 días.",
              "**Sin reembolsos parciales**: fuera del escenario de desistimiento mencionado anteriormente, las tarifas ya pagadas por el período de facturación actual no son reembolsables.",
              "**Créditos**: los créditos de API comprados como paquetes de un solo uso (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **no caducan**. Los 300 créditos que se otorgan automáticamente cada mes a los suscriptores del plan Empresa caducan al final del mes calendario y **no son reembolsables**.",
              "**Cambios de precio**: podemos modificar los precios con 30 días de antelación. Los suscriptores existentes mantendrán su precio actual hasta la próxima fecha de renovación.",
              "**Impuestos**: los precios se muestran sin IVA donde corresponda. Stripe recauda y remite cualquier impuesto debido en su jurisdicción."
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
            "text": "El plan Empresa expone una API REST pública autenticada mediante claves de API que genera desde su panel de control. El uso de la API se rige adicionalmente por:"
          },
          {
            "kind": "ul",
            "items": [
              "**Límites de velocidad**: 60 solicitudes por minuto (ampliaciones Pro) o 120 solicitudes por minuto (Empresa). El abuso sostenido puede dar lugar a limitación temporal o revocación permanente de la clave.",
              "**Consumo de créditos**: cada llamada a la API deduce créditos según las tarifas publicadas en nuestra [documentación de API](/api). Las llamadas fallidas (respuestas 5xx) no deducen créditos.",
              "**Seguridad de la clave**: usted es responsable de almacenar sus claves de API de forma segura y rotarlas si se ven comprometidas. Podemos revocar cualquier clave en cualquier momento si sospechamos un abuso.",
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
            "text": "El nombre, logo, código, diseño, documentación, estructura de la base de datos y contenido agregado del Servicio son propiedad exclusiva del Editor y están protegidos por las leyes de propiedad intelectual francesas e internacionales. No se le otorga ninguna licencia más allá de lo estrictamente necesario para usar el Servicio según lo previsto. No puede reproducir, modificar, descompilar ni crear obras derivadas del Servicio o cualquier parte de él, salvo que la ley aplicable lo permita expresamente."
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
            "text": "Podemos modificar estos Términos en cualquier momento. Los cambios sustanciales se notificarán por correo electrónico a los titulares de cuentas al menos treinta (30) días antes de que entren en vigor. Al continuar usando el Servicio después de ese período, acepta los Términos modificados. La versión más reciente siempre está disponible en [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Terminación",
        "blocks": [
          {
            "kind": "p",
            "text": "Puede dar por finalizada su cuenta en cualquier momento desde su panel de control. Nosotros podemos dar por finalizada o suspender su cuenta de inmediato y sin previo aviso si incumple estos Términos, abusa del Servicio o no paga una suscripción recurrente. Tras la terminación, sus datos se eliminarán en un plazo de treinta (30) días, excepto los registros de facturación y consentimiento que se conservarán según lo descrito en nuestra Política de Privacidad."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Ley aplicable y jurisdicción",
        "blocks": [
          {
            "kind": "p",
            "text": "Estos Términos se rigen por las leyes de Francia. Cualquier disputa derivada o relacionada con estos Términos o el Servicio se someterá a la jurisdicción exclusiva de los tribunales de París, Francia, salvo cuando un consumidor tenga un derecho de acción obligatorio en su país de residencia según la legislación de la Unión Europea o nacional aplicable. Antes de iniciar acciones legales, usted acuerda intentar resolver la disputa de manera amistosa escribiendo a [legal@konvertools.com](mailto:legal@konvertools.com). Los consumidores de la UE también pueden utilizar la plataforma de Resolución de Litigios en Línea de la Comisión Europea en [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Disposiciones varias",
        "blocks": [
          {
            "kind": "p",
            "text": "Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes mantendrán su plena vigencia. Nuestra falta de aplicación de cualquier derecho o disposición no constituye una renuncia a ese derecho. Estos Términos (junto con la Política de Privacidad y cualquier término específico del plan referenciado en el momento de la compra) constituyen el acuerdo completo entre usted y el Editor con respecto al Servicio."
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
            "text": "Estes Termos de Serviço (os \"Termos\") constituem um acordo vinculativo entre você (o \"Usuário\") e o editor do Konvertools (o \"Editor\", \"nós\", \"nosso\") relativo ao uso do site Konvertools e de todas as ferramentas, APIs e serviços relacionados (coletivamente denominados \"Serviço\"). Ao criar uma conta, marcar a caixa de aceitação no momento do cadastro ou simplesmente utilizar qualquer ferramenta do Serviço, você confirma que leu, compreendeu e aceitou integralmente estes Termos, juntamente com a nossa Política de Privacidade."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. O Serviço",
        "blocks": [
          {
            "kind": "p",
            "text": "O Konvertools oferece um catálogo de utilitários de conversão de arquivos, ferramentas de processamento de documentos e imagens, utilitários de texto assistidos por IA, ferramentas de segurança indicativas (scanner de vírus, verificador de e-mails, detector de phishing, scanner de URLs) e utilitários para desenvolvedores. A maioria das ferramentas é executada inteiramente no seu navegador; algumas exigem processamento no servidor. O Serviço é oferecido **\"como está\" e \"na condição em que se encontra\"**, sem qualquer garantia de qualquer tipo, expressa ou implícita, incluindo comerciabilidade, adequação a um fim específico ou não-infringência."
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
              "falhas em serviços de terceiros (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, provedores de hospedagem);",
              "danos indiretos, incidentais, especiais, consequenciais ou punitivos de qualquer tipo;",
              "qualquer valor agregado superior às taxas efetivamente pagas por você nos doze (12) meses anteriores ao evento que deu origem à reclamação, limitado a cem (100) euros para usuários da camada gratuita."
            ]
          },
          {
            "kind": "p",
            "text": "**Ferramentas de segurança**: o Scanner de Vírus, o Scanner de URLs, o Detector de Phishing e o Verificador de E-mails são fornecidos **apenas para fins informativos e indicativos**. Eles agregam sinais de terceiros (70+ mecanismos antivírus do VirusTotal, Google Safe Browsing, DNS público) e heurísticas de modelos de linguagem de grande porte. Eles **não constituem garantia de segurança, validade ou ausência de risco**. Novos malwares podem escapar à detecção até que os mecanismos antivírus sejam atualizados; novas páginas de phishing surgem mais rápido do que os bancos de dados de reputação conseguem catalogá-las; um e-mail que passe nos nossos testes pode ainda ser inativo ou fraudulento. O Editor expressamente declina de toda responsabilidade por quaisquer danos decorrentes de um arquivo malicioso não identificado pelo Serviço, de um e-mail de phishing considerado seguro pelo Serviço, de um link inseguro não detectado pelo Serviço ou de um e-mail transacional enviado a um endereço marcado como válido pelo Serviço. O Usuário assume total responsabilidade pelas decisões de segurança tomadas com base nestas ferramentas."
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
              "enviar, processar ou distribuir conteúdo ilegal na sua jurisdição ou na França;",
              "processar arquivos para os quais você não detenha os direitos necessários (obras protegidas por direitos autorais sem autorização, dados pessoais que não tem direito de processar, informações classificadas);",
              "cometer ou facilitar fraudes, lavagem de dinheiro, financiamento do terrorismo ou qualquer atividade criminosa;",
              "utilizar o humanizador de IA, as ferramentas de texto de IA ou qualquer outro recurso para plagiar, enganar terceiros, manipular sistemas de avaliação (acadêmicos, recrutamento, redes de anúncios) de forma contrária às suas regras ou induzir em erro de qualquer maneira que viole a legislação aplicável;",
              "enviar malwares para testar nosso scanner se tal ação violar a lei na sua jurisdição (utilize o arquivo de teste EICAR em vez disso);",
              "tentar sobrecarregar, reverter engenharia, raspar, abusar de limites de taxa ou, de qualquer outra forma, interferir na operação ou disponibilidade do Serviço;",
              "contornar cotas, requisitos de pagamento ou quaisquer outras restrições vigentes;",
              "criar múltiplas contas para multiplicar as cotas da camada gratuita ou compartilhar uma conta com mais indivíduos do que o permitido pelo seu plano."
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
            "text": "Você mantém todos os direitos, título e interesse nos arquivos e textos que enviar ao Serviço. Você nos concede uma licença limitada, não exclusiva, mundial, livre de royalties, para processá-los unicamente para fornecer a ferramenta solicitada. Esta licença termina no momento em que o resultado é retornado a você (ferramentas assistidas por servidor) ou nunca chega a existir (ferramentas executadas apenas no navegador, uma vez que seu arquivo nunca chega até nós). Não reivindicamos, nem reivindicaremos, propriedade sobre o seu conteúdo ou o utilizaremos para treinar modelos de IA."
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
              "**Planos**: Gratuito (€0), Pro (€12/mês ou €99/ano), Business (€39/mês ou €349/ano). Os recursos e cotas dos planos são os descritos na nossa [página de Preços](/pricing) no momento da compra. Reservamo-nos o direito de alterar os recursos dos planos com 30 dias de antecedência.",
              "**Renovação automática**: assinaturas mensais e anuais são renovadas automaticamente na mesma periodicidade até serem canceladas. Você pode cancelar a qualquer momento pelo seu painel; o cancelamento entra em vigor no final do período de faturamento atual. Você mantém o acesso até essa data.",
              "**Direito de arrependimento (UE)**: nos termos do Artigo L. 221-28 do Código de Consumo francês, quando você utiliza ativamente o Serviço durante o período inicial de 14 dias de arrependimento, você consente expressamente com a execução imediata do contrato e renuncia ao seu direito de arrependimento. Se não tiver utilizado nenhum recurso pago, você pode se arrepender no prazo de 14 dias enviando um e-mail para [billing@konvertools.com](mailto:billing@konvertools.com) e nós reembolsaremos integralmente em até 14 dias.",
              "**Sem reembolsos parciais**: fora do cenário de arrependimento acima, taxas já pagas pelo período de faturamento atual não são reembolsáveis.",
              "**Créditos**: créditos de API adquiridos como pacotes únicos (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **não expiram**. Os 300 créditos concedidos automaticamente a cada mês aos assinantes Business expiram no final do mês civil e **não são reembolsáveis**.",
              "**Alterações de preço**: podemos alterar os preços com 30 dias de antecedência. Assinantes existentes mantêm o preço atual até a próxima data de renovação.",
              "**Imposto**: os preços são exibidos sem IVA, quando aplicável. O Stripe coleta e remete quaisquer impostos devidos na sua jurisdição."
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
              "**Limites de taxa**: 60 requisições por minuto (acréscimos Pro) ou 120 requisições por minuto (Business). Abuso prolongado pode resultar em limitação temporária ou revogação permanente da chave.",
              "**Consumo de créditos**: cada chamada à API deduz créditos nas taxas publicadas na nossa [documentação da API](/api). Chamadas malsucedidas (respostas 5xx) não deduzem créditos.",
              "**Segurança da chave**: você é responsável por armazenar suas chaves de API de forma segura e rotacioná-las em caso de comprometimento. Podemos revogar qualquer chave a qualquer momento se suspeitarmos de abuso.",
              "**Uso aceitável upstream**: aplicações construídas sobre a nossa API devem cumprir estes Termos, incluindo a seção de uso aceitável. Você não deve expor nossas chaves de API a usuários finais (licencie seu serviço em vez disso)."
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
            "text": "Você concorda em indenizar e isentar o Editor de quaisquer reclamações, perdas, danos, responsabilidades, custos ou despesas (incluindo honorários advocatícios razoáveis) decorrentes de (a) seu descumprimento destes Termos, (b) sua violação de qualquer lei ou direito de terceiros, ou (c) qualquer conteúdo que você tenha enviado ao Serviço."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Alterações nos Termos",
        "blocks": [
          {
            "kind": "p",
            "text": "Podemos alterar estes Termos periodicamente. Alterações substanciais serão notificadas por e-mail aos titulares de contas com pelo menos trinta (30) dias de antecedência antes de entrarem em vigor. Ao continuar a utilizar o Serviço após esse período, você aceita os Termos alterados. A versão mais recente está sempre disponível em [https://konvertools.com/terms](https://konvertools.com/terms)."
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
            "text": "Estes Termos são regidos pelas leis da França. Qualquer disputa decorrente ou relacionada a estes Termos ou ao Serviço será submetida à jurisdição exclusiva dos tribunais de Paris, França, exceto quando o direito de ação obrigatório do consumidor no seu país de residência prevalecer nos termos do direito da União Europeia ou da legislação nacional aplicável. Antes de iniciar uma ação judicial, você concorda em tentar resolver a disputa amigavelmente escrevendo para [legal@konvertools.com](mailto:legal@konvertools.com). Consumidores da UE também podem utilizar a plataforma de Resolução de Litígios de Consumidores da Comissão Europeia em [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Disposições diversas",
        "blocks": [
          {
            "kind": "p",
            "text": "Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecem plenamente em vigor. Nossa falha em fazer valer qualquer direito ou disposição não constitui renúncia a esse direito. Estes Termos (juntamente com a Política de Privacidade e quaisquer termos específicos do plano referenciados na compra) constituem o acordo integral entre você e o Editor relativo ao Serviço."
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
            "text": "Diese Nutzungsbedingungen (die „Bedingungen“) bilden eine verbindliche Vereinbarung zwischen Ihnen (dem „Nutzer“) und dem Herausgeber von Konvertools (dem „Herausgeber“, „wir“, „uns“) in Bezug auf Ihre Nutzung der Konvertools-Website sowie aller damit verbundenen Tools, APIs und Dienste (gemeinsam „Dienst“ genannt). Durch die Erstellung eines Kontos, das Anklicken des Akzeptanzfeldes bei der Registrierung oder durch die einfache Nutzung eines Tools im Dienst bestätigen Sie, dass Sie diese Bedingungen in vollem Umfang gelesen, verstanden und akzeptiert haben, zusammen mit unserer Datenschutzerklärung."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Der Dienst",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools bietet einen Katalog an Datei-Konvertierungsprogrammen, Dokumenten- und Bildverarbeitungs-Tools, KI-gestützten Text-Utilities, indikativen Sicherheitstools (Virenscanner, E-Mail-Prüfer, Phishing-Detektor, URL-Scanner) sowie Entwickler-Utilities. Die meisten Tools laufen vollständig in Ihrem Browser; einige erfordern eine serverseitige Verarbeitung. Der Dienst wird **„wie er ist“ und „wie verfügbar“** ohne jegliche Gewährleistung jedweder Art angeboten, weder ausdrücklich noch stillschweigend, einschließlich der Marktfähigkeit, Eignung für einen bestimmten Zweck oder der Nichtverletzung von Rechten."
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
              "Entscheidungen, finanzieller, geschäftlicher oder sonstiger Art, die Sie auf Grundlage der Ausgabe eines Tools treffen;",
              "Ausfallzeiten, Latenz oder vorübergehende Nichtverfügbarkeit einer Funktion;",
              "Ausfälle von Drittanbietern (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, Hosting-Anbieter);",
              "mittelbare, zufällige, besondere, Folgeschäden oder Strafschäden jedweder Art;",
              "einen Gesamtbetrag, der den Gebühren entspricht, die Sie uns in den zwölf (12) Monaten vor dem Ereignis, das den Anspruch begründet, tatsächlich gezahlt haben, begrenzt auf einhundert (100) Euro für Nutzer des kostenlosen Tarifs."
            ]
          },
          {
            "kind": "p",
            "text": "**Sicherheitstools**: Der Virenscanner, der URL-Scanner, der Phishing-Detektor und der E-Mail-Prüfer werden **ausschließlich zu Informations- und Indikationszwecken** bereitgestellt. Sie aggregieren Signale von Drittanbietern (die 70+ Antiviren-Engines von VirusTotal, Google Safe Browsing, öffentliche DNS) sowie heuristische Ansätze von großen Sprachmodellen. Sie **stellen keine Garantie für Sicherheit, Gültigkeit oder das Fehlen von Risiken dar**. Neue Malware kann der Erkennung entgehen, bis die Antiviren-Engines aktualisiert werden; neue Phishing-Seiten entstehen schneller, als Reputationsdatenbanken sie erfassen können; eine E-Mail, die unsere Prüfungen besteht, kann dennoch inaktiv oder betrügerisch sein. Der Herausgeber lehnt ausdrücklich jede Haftung für Schäden ab, die durch eine schädliche Datei entstehen, die der Dienst nicht markiert hat, eine Phishing-E-Mail, die der Dienst als sicher eingestuft hat, einen unsicheren Link, den der Dienst nicht identifiziert hat, oder eine Transaktions-E-Mail, die an eine Adresse gesendet wurde, die der Dienst als gültig markiert hat. Der Nutzer trägt die alleinige Verantwortung für Sicherheitsentscheidungen, die auf Grundlage dieser Tools getroffen werden."
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
              "Dateien zu verarbeiten, für die Sie nicht die erforderlichen Rechte besitzen (urheberrechtlich geschützte Werke ohne Genehmigung, personenbezogene Daten, die Sie nicht verarbeiten dürfen, klassifizierte Informationen);",
              "Betrug, Geldwäsche, die Finanzierung von Terrorismus oder eine strafbare Handlung zu begehen oder zu erleichtern;",
              "den KI-Humanizer, die KI-Text-Tools oder ein anderes Feature zu nutzen, um zu plagiieren, eine dritte Partei zu täuschen, Bewertungssysteme (akademische, Personalabteilung, Werbenetzwerke) in einer Weise zu manipulieren, die gegen deren Regeln verstößt, oder auf sonstige Weise zu täuschen, die gegen geltendes Recht verstößt;",
              "Malware hochzuladen, um unseren Scanner zu testen, wenn dies in Ihrer Rechtsordnung gegen das Gesetz verstoßen würde (verwenden Sie stattdessen die EICAR-Testdatei);",
              "den Dienst zu überlasten, rückzuentwickeln, zu scrapen, die Ratenbegrenzungen zu missbrauchen oder auf sonstige Weise in den Betrieb oder die Verfügbarkeit des Dienstes einzugreifen;",
              "Quoten, Zahlungsanforderungen oder andere Einschränkungen zu umgehen;",
              "mehrere Konten zu erstellen, um die kostenlosen Kontingente zu vervielfachen, oder ein Konto mit mehr Personen zu teilen, als Ihr Tarif zulässt."
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
            "text": "Sie behalten alle Rechte, Titel und Interessen an den Dateien und Texten, die Sie dem Dienst übermitteln. Sie erteilen uns eine streng begrenzte, gebührenfreie, weltweite Lizenz zur Verarbeitung derselben ausschließlich, um das Tool zu liefern, das Sie angefordert haben. Diese Lizenz endet in dem Moment, in dem das Ergebnis an Sie zurückgegeben wird (servergestützte Tools) oder gar nicht erst entsteht (browserbasierte Tools, da Ihre Datei uns nie erreicht). Wir beanspruchen oder werden keine Rechte an Ihren Inhalten geltend machen oder diese nutzen, um KI-Modelle zu trainieren."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konten",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie müssen mindestens sechzehn (16) Jahre alt sein, um ein Konto zu erstellen. Sie sind für die vertrauliche Aufbewahrung Ihrer Zugangsdaten und für jede Aktivität verantwortlich, die unter Ihrem Konto stattfindet. Benachrichtigen Sie uns unverzüglich unter [security@konvertools.com](mailto:security@konvertools.com) bei einem Verdacht auf unbefugten Zugriff."
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
              "**Tarife**: Kostenlos (€0), Pro (€12/Monat oder €99/Jahr), Business (€39/Monat oder €349/Jahr). Die Funktionen und Kontingente der Tarife sind wie auf unserer [Preisseite](/pricing) zum Zeitpunkt des Kaufs beschrieben. Wir behalten uns das Recht vor, Tariffunktionen mit 30 Tagen Vorlauf zu ändern.",
              "**Automatische Verlängerung**: Monatliche und jährliche Abonnements verlängern sich automatisch im gleichen Rhythmus, bis sie gekündigt werden. Sie können jederzeit über Ihr Dashboard kündigen; die Kündigung wird am Ende der aktuellen Abrechnungsperiode wirksam. Bis dahin behalten Sie den Zugriff.",
              "**Rückgaberecht (EU)**: Gemäß Artikel L. 221-28 des französischen Verbrauchergesetzbuchs erklären Sie sich durch aktive Nutzung des Dienstes während der anfänglichen 14-tägigen Rückgabefrist ausdrücklich mit der sofortigen Vertragserfüllung einverstanden und verzichten auf Ihr Rückgaberecht. Falls Sie keine bezahlten Funktionen genutzt haben, können Sie innerhalb von 14 Tagen per E-Mail an [billing@konvertools.com](mailto:billing@konvertools.com) zurücktreten, und wir erstatten Ihnen den vollen Betrag innerhalb von 14 Tagen.",
              "**Keine Teilrückerstattungen**: Außerhalb des oben genannten Rückgabeszenarios sind bereits gezahlte Gebühren für die aktuelle Abrechnungsperiode nicht erstattungsfähig.",
              "**Credits**: Als Einmalkäufe erworbene API-Credits („Starter“, „Growth“, „Scale“, „Studio“) **verfallen nie**. Die jedem Business-Abonnenten monatlich automatisch gutgeschriebenen 300 Credits verfallen am Ende des Kalendermonats und sind **nicht erstattungsfähig**.",
              "**Preisanpassungen**: Wir können die Preise mit 30 Tagen Vorlauf anpassen. Bestehende Abonnenten behalten ihren aktuellen Preis bis zum nächsten Verlängerungstermin.",
              "**Steuer**: Die Preise werden ohne Mehrwertsteuer angezeigt, sofern zutreffend. Stripe erhebt und überweist die fällige Steuer in Ihrer Rechtsordnung."
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
              "**Ratenbegrenzung**: 60 Anfragen pro Minute (Pro-Aufstockungen) oder 120 Anfragen pro Minute (Business). Andauernder Missbrauch kann zu vorübergehender Drosselung oder dauerhafter Sperrung des Schlüssels führen.",
              "**Credit-Verbrauch**: Jeder API-Aufruf zieht Credits gemäß den in unserer [API-Dokumentation](/api) veröffentlichten Sätzen ab. Fehlgeschlagene Aufrufe (5xx-Antworten) ziehen keine Credits ab.",
              "**Schlüsselsicherheit**: Sie sind für die sichere Speicherung Ihrer API-Schlüssel und deren Rotation bei Verdacht auf Kompromittierung verantwortlich. Wir können jeden Schlüssel jederzeit sperren, wenn wir Missbrauch vermuten.",
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
            "text": "Name, Logo, Code, Design, Dokumentation, Datenbankstruktur und aggregierte Inhalte des Dienstes sind ausschließliches Eigentum des Herausgebers und unterliegen dem französischen und internationalen Recht des geistigen Eigentums. Ihnen wird keine Lizenz eingeräumt, außer derjenigen, die zur Nutzung des Dienstes in der vorgesehenen Weise strikt erforderlich ist. Sie dürfen den Dienst oder einen Teil davon weder reproduzieren, modifizieren, dekompilieren noch derivative Werke erstellen, es sei denn, dies ist ausdrücklich durch anwendbares Recht gestattet."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Freistellung",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie verpflichten sich, den Herausgeber von allen Ansprüchen, Verlusten, Schäden, Haftungen, Kosten oder Aufwendungen (einschließlich angemessener Rechtsanwaltskosten) freizustellen und ihn schadlos zu halten, die sich ergeben aus (a) Ihrem Verstoß gegen diese Bedingungen, (b) Ihrer Verletzung von Gesetzen oder Rechten Dritter oder (c) Inhalten, die Sie dem Dienst übermittelt haben."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Änderungen der Bedingungen",
        "blocks": [
          {
            "kind": "p",
            "text": "Wir können diese Bedingungen von Zeit zu Zeit ändern. Wesentliche Änderungen werden den Kontoinhabern per E-Mail mindestens dreißig (30) Tage vor Inkrafttreten mitgeteilt. Durch die weitere Nutzung des Dienstes nach diesem Zeitraum akzeptieren Sie die geänderten Bedingungen. Die jeweils aktuelle Version ist stets unter [https://konvertools.com/terms](https://konvertools.com/terms) verfügbar."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Beendigung",
        "blocks": [
          {
            "kind": "p",
            "text": "Sie können Ihr Konto jederzeit über Ihr Dashboard kündigen. Wir können Ihr Konto unverzüglich und ohne Vorwarnung kündigen oder sperren, wenn Sie gegen diese Bedingungen verstoßen, den Dienst missbrauchen oder eine wiederkehrende Zahlung nicht leisten. Nach der Kündigung werden Ihre Daten innerhalb von dreißig (30) Tagen gelöscht, mit Ausnahme von Abrechnungs- und Einwilligungsunterlagen, die gemäß unserer Datenschutzerklärung aufbewahrt werden."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Anwendbares Recht und Gerichtsstand",
        "blocks": [
          {
            "kind": "p",
            "text": "Diese Bedingungen unterliegen dem Recht Frankreichs. Jegliche Streitigkeit, die sich aus oder im Zusammenhang mit diesen Bedingungen oder dem Dienst ergibt, unterliegt der ausschließlichen Zuständigkeit der Gerichte von Paris, Frankreich, sofern nicht das zwingende Klagerecht eines Verbrauchers in seinem Wohnsitzland nach EU-Recht oder nationalem Recht Vorrang hat. Bevor Sie rechtliche Schritte einleiten, stimmen Sie zu, den Streit gütlich zu regeln, indem Sie eine E-Mail an [legal@konvertools.com](mailto:legal@konvertools.com) senden. EU-Verbraucher können auch die Online-Streitbeilegungsplattform der Europäischen Kommission unter [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) nutzen."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Sonstiges",
        "blocks": [
          {
            "kind": "p",
            "text": "Falls eine Bestimmung dieser Bedingungen für unwirksam oder nicht durchsetzbar erklärt wird, bleiben die übrigen Bestimmungen in vollem Umfang wirksam. Unsere Unterlassung, ein Recht oder eine Bestimmung durchzusetzen, stellt keinen Verzicht auf dieses Recht dar. Diese Bedingungen (zusammen mit der Datenschutzerklärung und allen tarifspezifischen Bedingungen, auf die beim Kauf verwiesen wird) bilden die gesamte Vereinbarung zwischen Ihnen und dem Herausgeber in Bezug auf den Dienst."
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
            "text": "Queste Condizioni di Servizio (i \"Termini\") costituiscono un accordo vincolante tra te (l'\"Utente\") e il titolare di Konvertools (il \"Titolare\", \"noi\", \"ci\") in merito all'utilizzo del sito web Konvertools e di tutti gli strumenti, API e servizi correlati (collettivamente il \"Servizio\"). Creando un account, spuntando la casella di accettazione al momento della registrazione o semplicemente utilizzando uno strumento del Servizio, confermi di aver letto, compreso e accettato integralmente questi Termini, insieme alla nostra Politica sulla Privacy."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Il Servizio",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools offre un catalogo di utility per la conversione di file, strumenti di elaborazione di documenti e immagini, utility di testo assistite da IA, strumenti di sicurezza indicativi (scanner antivirus, verifica email, rilevatore di phishing, scanner URL) e utility per sviluppatori. La maggior parte degli strumenti viene eseguita interamente nel tuo browser; alcuni richiedono l'elaborazione lato server. Il Servizio viene offerto **\"così com'è\" e \"nella disponibilità attuale\"** senza alcuna garanzia di alcun tipo, espressa o implicita, inclusa la commerciabilità, l'idoneità per uno scopo particolare o la non violazione di diritti."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Limitazione di responsabilità — leggere attentamente",
        "blocks": [
          {
            "kind": "p",
            "text": "**Nei limiti massimi consentiti dalla legge, il Titolare declina qualsiasi responsabilità per danni di qualsiasi tipo derivanti dall'uso o dall'impossibilità di utilizzare il Servizio.** In particolare, riconosci e accetti che il Titolare non sarà responsabile per:"
          },
          {
            "kind": "ul",
            "items": [
              "perdita di dati, file corrotti o errati o conversioni non riuscite;",
              "decisioni, finanziarie, aziendali o di altro tipo, che prendi in base ai risultati di qualsiasi strumento;",
              "tempi di inattività, latenza o indisponibilità temporanea di qualsiasi funzione;",
              "guasti di servizi di terze parti (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, provider di hosting);",
              "danni indiretti, incidentali, speciali, consequenziali o punitivi di qualsiasi tipo;",
              "qualsiasi importo complessivo superiore alle tariffe effettivamente pagate a noi nei dodici (12) mesi precedenti l'evento che ha dato origine alla richiesta, con un limite massimo di cento (100) euro per gli utenti del piano gratuito."
            ]
          },
          {
            "kind": "p",
            "text": "**Strumenti di sicurezza**: lo Scanner Antivirus, lo Scanner URL, il Rilevatore di Phishing e il Verificatore Email vengono forniti **a solo scopo informativo e indicativo**. Essi aggregato segnali di terze parti (70+ motori antivirus di VirusTotal, Google Safe Browsing, DNS pubblici) e euristiche basate su modelli linguistici di grandi dimensioni. Essi **non costituiscono una garanzia di sicurezza, validità o assenza di rischi**. Nuovi malware possono eludere il rilevamento finché i motori antivirus non vengono aggiornati; nuove pagine di phishing compaiono più velocemente di quanto i database di reputazione possano catalogarle; un'email che supera i nostri controlli potrebbe comunque essere inattiva o fraudolenta. Il Titolare declina espressamente ogni responsabilità per eventuali danni derivanti da un file malevolo non segnalato dal Servizio, da un'email di phishing considerata sicura dal Servizio, da un link non identificato come insicuro dal Servizio o da un'email transazionale inviata a un indirizzo marcato come valido dal Servizio. L'Utente assume la piena responsabilità delle decisioni di sicurezza basate su questi strumenti."
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
              "elaborare file per i quali non detieni i diritti necessari (opere protette da copyright senza autorizzazione, dati personali che non sei autorizzato a trattare, informazioni classificate);",
              "commettere o facilitare frodi, riciclaggio di denaro, finanziamento del terrorismo o qualsiasi attività criminale;",
              "utilizzare l'umanizzatore AI, gli strumenti di testo AI o qualsiasi altra funzione per plagiare, ingannare un terzo, manipolare sistemi di valutazione (accademici, di reclutamento, reti pubblicitarie) in modo da violare le loro regole, o fuorviare in qualsiasi modo che violi la legge applicabile;",
              "caricare malware per testare il nostro scanner se ciò violerebbe la legge nella tua giurisdizione (utilizza invece il file di test EICAR);",
              "tentare di sovraccaricare, ingegnerizzare in reverse, fare scraping, abusare dei limiti di velocità o interferire in altro modo con il funzionamento o la disponibilità del Servizio;",
              "eludere quote, requisiti di pagamento o altre restrizioni in vigore;",
              "creare più account per moltiplicare le quote del piano gratuito o condividere un account con più persone rispetto a quanto consentito dal tuo piano."
            ]
          },
          {
            "kind": "p",
            "text": "Possiamo sospendere o terminare il tuo account immediatamente e senza preavviso se abbiamo fondati motivi per ritenere che tu abbia violato questa sezione, senza diritto a alcun rimborso."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. I tuoi contenuti",
        "blocks": [
          {
            "kind": "p",
            "text": "Conservi tutti i diritti, la titolarità e l'interesse sui file e sui testi che invii al Servizio. Ci concedi una licenza limitata, gratuita, mondiale e non esclusiva per elaborarli esclusivamente al fine di fornire lo strumento che hai richiesto. Questa licenza termina nel momento in cui il risultato viene restituito a te (strumenti assistiti dal server) o non entra mai in vigore (strumenti solo lato browser, poiché il tuo file non ci raggiunge mai). Non rivendichiamo, né lo faremo, la proprietà dei tuoi contenuti né li utilizziamo per addestrare modelli AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Account",
        "blocks": [
          {
            "kind": "p",
            "text": "Devi avere almeno sedici (16) anni per creare un account. Sei responsabile della riservatezza delle tue credenziali e di qualsiasi attività che avviene sotto il tuo account. Comunicaci immediatamente a [security@konvertools.com](mailto:security@konvertools.com) qualsiasi accesso non autorizzato sospetto."
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
              "**Piani**: Gratuito (€0), Pro (€12/mese o €99/anno), Business (€39/mese o €349/anno). Le funzionalità e le quote dei piani sono descritte nella nostra [pagina Prezzi](/pricing) al momento dell'acquisto. Ci riserviamo il diritto di modificare le funzionalità dei piani con un preavviso di 30 giorni.",
              "**Rinnovo automatico**: gli abbonamenti mensili e annuali si rinnovano automaticamente alla stessa cadenza fino alla cancellazione. Puoi annullare in qualsiasi momento dal tuo pannello di controllo; la cancellazione avrà effetto alla fine del periodo di fatturazione corrente. Conservi l'accesso fino a quella data.",
              "**Diritto di recesso (UE)**: ai sensi dell'Articolo L. 221-28 del Codice del Consumo francese, qualora tu utilizzi attivamente il Servizio durante il periodo iniziale di 14 giorni per il recesso, dai il tuo consenso espresso all'esecuzione immediata del contratto e rinunci al tuo diritto di recesso. Se non hai utilizzato alcuna funzione a pagamento, puoi recedere entro 14 giorni inviando un'email a [billing@konvertools.com](mailto:billing@konvertools.com) e provvederemo a rimborsarti l'intero importo entro 14 giorni.",
              "**Nessun rimborso parziale**: al di fuori dello scenario di recesso sopra descritto, le tariffe già pagate per il periodo di fatturazione corrente non sono rimborsabili.",
              "**Crediti**: i crediti API acquistati come pacchetti una tantum (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **non scadono mai**. I 300 crediti concessi automaticamente ogni mese agli abbonati Business scadono alla fine del mese solare e **non sono rimborsabili**.",
              "**Modifiche dei prezzi**: possiamo modificare i prezzi con un preavviso di 30 giorni. Gli abbonati esistenti mantengono il prezzo attuale fino alla data di rinnovo successiva.",
              "**Imposte**: i prezzi sono indicati al netto dell'IVA ove applicabile. Stripe si occupa di riscuotere e versare l'imposta dovuta nella tua giurisdizione."
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
              "**Limiti di velocità**: 60 richieste al minuto (aggiunte Pro) o 120 richieste al minuto (Business). Abusi prolungati possono comportare il throttling temporaneo o la revoca permanente della chiave.",
              "**Consumo di crediti**: ogni chiamata API sottrae crediti secondo le tariffe pubblicate nella nostra [documentazione API](/api). Le chiamate non riuscite (risposte 5xx) non sottraggono crediti.",
              "**Sicurezza delle chiavi**: sei responsabile della conservazione sicura delle tue chiavi API e della loro rotazione in caso di compromissione. Possiamo revocare qualsiasi chiave in qualsiasi momento se sospettiamo abusi.",
              "**Uso accettabile a monte**: le applicazioni costruite sulla nostra API devono rispettare questi Termini, inclusa la sezione sull'uso accettabile. Non devi esporre le nostre chiavi API agli utenti finali (sottolicenzia il tuo servizio invece)."
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
            "text": "Il nome, il logo, il codice, il design, la documentazione, la struttura del database e il contenuto aggregato del Servizio sono di esclusiva proprietà del Titolare e sono tutelati dalle leggi francesi e internazionali in materia di proprietà intellettuale. Non ti viene concessa alcuna licenza oltre a quanto strettamente necessario per utilizzare il Servizio come previsto. Non puoi riprodurre, modificare, decompilare o creare opere derivate del Servizio o di qualsiasi sua parte, se non nei limiti espressamente consentiti dalla legge applicabile."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Manleva",
        "blocks": [
          {
            "kind": "p",
            "text": "Accetti di manlevare e tenere indenne il Titolare da qualsiasi richiesta, perdita, danno, responsabilità, costo o spesa (comprese le spese legali ragionevoli) derivante da (a) la tua violazione di questi Termini, (b) la tua violazione di qualsiasi legge o diritto di terzi, o (c) qualsiasi contenuto che hai inviato al Servizio."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Modifiche ai Termini",
        "blocks": [
          {
            "kind": "p",
            "text": "Possiamo modificare questi Termini di volta in volta. Le modifiche sostanziali verranno comunicate tramite email agli utenti registrati almeno trenta (30) giorni prima della loro entrata in vigore. Continuando a utilizzare il Servizio dopo tale periodo, accetti i Termini modificati. La versione più recente è sempre disponibile all'indirizzo [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Risoluzione",
        "blocks": [
          {
            "kind": "p",
            "text": "Puoi terminare il tuo account in qualsiasi momento dal tuo pannello di controllo. Possiamo terminare o sospendere il tuo account immediatamente e senza preavviso se violi questi Termini, abusi del Servizio o non paghi un abbonamento ricorrente. Al termine dell'account, i tuoi dati vengono eliminati entro trenta (30) giorni, ad eccezione dei registri di fatturazione e dei consensi conservati come descritto nella nostra Politica sulla Privacy."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Legge applicabile e foro competente",
        "blocks": [
          {
            "kind": "p",
            "text": "Questi Termini sono regolati dalle leggi della Francia. Qualsiasi controversia derivante o connessa a questi Termini o al Servizio sarà deferita alla giurisdizione esclusiva dei tribunali di Parigi, Francia, salvo ove la normativa europea o nazionale applicabile preveda un diritto di azione obbligatorio per il consumatore nel proprio paese di residenza. Prima di intraprendere azioni legali, accetti di tentare di risolvere la controversia in via amichevole scrivendo a [legal@konvertools.com](mailto:legal@konvertools.com). I consumatori dell'UE possono inoltre utilizzare la piattaforma di risoluzione delle controversie online della Commissione europea all'indirizzo [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Varie",
        "blocks": [
          {
            "kind": "p",
            "text": "Se una disposizione di questi Termini viene ritenuta invalida o non applicabile, le restanti disposizioni rimangono pienamente in vigore. La nostra mancata applicazione di un diritto o di una disposizione non costituisce una rinuncia a tale diritto. Questi Termini (insieme alla Politica sulla Privacy e a eventuali termini specifici del piano richiamati all'acquisto) costituiscono l'intero accordo tra te e il Titolare in merito al Servizio."
          }
        ]
      }
    ]
  },
  "nl": {
    "h1": "Gebruiksvoorwaarden",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Laatst bijgewerkt: %DATE% · Door gebruik te maken van Konvertools gaat u akkoord met deze voorwaarden.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Acceptatie",
        "blocks": [
          {
            "kind": "p",
            "text": "Deze Gebruiksvoorwaarden (de \"Voorwaarden\") vormen een bindende overeenkomst tussen u (de \"Gebruiker\") en de uitgever van Konvertools (de \"Uitgever\", \"wij\", \"ons\") met betrekking tot uw gebruik van de website van Konvertools en alle bijbehorende tools, API's en diensten (collectief de \"Dienst\"). Door een account aan te maken, het aanmeldingsvakje voor acceptatie aan te vinken of simpelweg een tool op de Dienst te gebruiken, bevestigt u dat u deze Voorwaarden volledig heeft gelezen, begrepen en geaccepteerd, samen met ons Privacybeleid."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. De Dienst",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools biedt een catalogus met bestandsconversiehulpmiddelen, document- en afbeeldingsverwerkingsgereedschappen, AI-ondersteunde tekstgereedschappen, indicatieve beveiligingsgereedschappen (virusscanner, e-mailverifier, phishingdetector, URL-scanner) en ontwikkelaarsgereedschappen. De meeste tools werken volledig in uw browser; sommige vereisen serververwerking. De Dienst wordt aangeboden **\"zoals deze is\" en \"zoals beschikbaar\"** zonder enige vorm van garantie, uitdrukkelijk of stilzwijgend, met inbegrip van maar niet beperkt tot verkoopbaarheid, geschiktheid voor een bepaald doel of niet-inbreuk op rechten van derden."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Aansprakelijkheidsbeperking — lees aandachtig",
        "blocks": [
          {
            "kind": "p",
            "text": "**Voor zover wettelijk toegestaan, sluit de Uitgever elke aansprakelijkheid uit voor schade van welke aard dan ook die voortvloeit uit uw gebruik van, of het niet kunnen gebruiken van, de Dienst.** In het bijzonder erkent en gaat u akkoord met het feit dat de Uitgever niet aansprakelijk is voor:"
          },
          {
            "kind": "ul",
            "items": [
              "verlies van gegevens, beschadigde of onjuiste bestanden, of mislukte conversies;",
              "beslissingen, financieel, zakelijk of anderszins, die u neemt op basis van de output van een tool;",
              "uitvaltijd, latentie of tijdelijke onbeschikbaarheid van een functie;",
              "storingen bij derden (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, hostingproviders);",
              "indirecte, incidentele, speciale, gevolg- of punitieve schade van welke aard dan ook;",
              "een totaalbedrag dat de vergoeding die u in de twaalf (12) maanden voorafgaand aan het voorval dat aanleiding geeft tot de claim daadwerkelijk aan ons heeft betaald, overschrijdt, met een maximum van honderd (100) euro voor gratis gebruikers."
            ]
          },
          {
            "kind": "p",
            "text": "**Beveiligingsgereedschappen**: de Virusscanner, de URL-scanner, de Phishingdetector en de E-mailverifier worden uitsluitend **ter informatieve en indicatieve doeleinden** aangeboden. Zij aggregeren signalen van derden (de 70+ antivirusmotoren van VirusTotal, Google Safe Browsing, openbare DNS) en heuristieken van grote taalmodellen. Zij **vormen geen garantie voor veiligheid, geldigheid of afwezigheid van risico**. Nieuwe malware kan detectie ontwijken totdat antivirusmotoren zijn bijgewerkt; nieuwe phishingpagina's verschijnen sneller dan reputatiedatabases ze kunnen catalogiseren; een e-mail die onze controles doorstaat, kan desondanks frauduleus zijn. De Uitgever sluit uitdrukkelijk elke aansprakelijkheid uit voor schade die voortvloeit uit een kwaadaardig bestand dat de Dienst niet heeft gemarkeerd, een phishing-e-mail die de Dienst als veilig heeft bestempeld, een onveilige link die de Dienst niet heeft geïdentificeerd, of een transactie-e-mail die naar een adres is verzonden dat de Dienst als geldig heeft gemarkeerd. De Gebruiker is zelf verantwoordelijk voor beveiligingsbeslissingen die op basis van deze gereedschappen worden genomen."
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
              "het uploaden, verwerken of verspreiden van inhoud die in uw rechtsgebied of in Frankrijk illegaal is;",
              "het verwerken van bestanden waarvoor u niet de nodige rechten heeft (met auteursrecht beschermde werken zonder toestemming, persoonsgegevens waarvoor u geen verwerkingsbevoegdheid heeft, geclassificeerde informatie);",
              "het plegen of faciliteren van fraude, witwassen van geld, financiering van terrorisme of enige vorm van criminele activiteit;",
              "het gebruik van de AI-humaniser, de AI-tekstgereedschappen of een andere functie om plagiaat te plegen, een derde partij te misleiden, evaluatiesystemen (academisch, werving, advertentienetwerken) te manipuleren op een manier die in strijd is met hun regels, of op enigerlei wijze te misleiden in strijd met toepasselijk recht;",
              "het uploaden van malware om onze scanner te testen als dit in strijd is met de wet in uw rechtsgebied (gebruik in plaats daarvan het EICAR-testbestand);",
              "het proberen te overbelasten, reverse-engineeren, scrapen, misbruiken van limieten, of op andere wijze de werking of beschikbaarheid van de Dienst te verstoren;",
              "het omzeilen van quotumlimieten, betalingsverplichtingen of andere restricties die van toepassing zijn;",
              "het aanmaken van meerdere accounts om gratis quotumlimieten te vermenigvuldigen of het delen van een account met meer personen dan uw abonnement toestaat."
            ]
          },
          {
            "kind": "p",
            "text": "Wij kunnen uw account onmiddellijk en zonder voorafgaande kennisgeving opschorten of beëindigen als wij redelijke gronden hebben om aan te nemen dat u deze sectie heeft overtreden, zonder recht op restitutie van enige aard."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Uw inhoud",
        "blocks": [
          {
            "kind": "p",
            "text": "U behoudt alle rechten, titel en belang in de bestanden en tekst die u naar de Dienst uploadt. U verleent ons een strikt beperkte, royaltyvrije, wereldwijde licentie om deze uitsluitend te verwerken om de tool die u heeft aangevraagd te leveren. Deze licentie eindigt op het moment dat het resultaat aan u wordt geretourneerd (servergeassisteerde tools) of komt nooit tot stand (browser-only tools, aangezien uw bestand ons nooit bereikt). Wij claimen geen eigendom van uw inhoud en zullen deze ook niet gebruiken om AI-modellen te trainen."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Accounts",
        "blocks": [
          {
            "kind": "p",
            "text": "U moet ten minste zestien (16) jaar oud zijn om een account aan te maken. U bent verantwoordelijk voor het vertrouwelijk houden van uw inloggegevens en voor elke activiteit die onder uw account plaatsvindt. Meld ons onmiddellijk via [security@konvertools.com](mailto:security@konvertools.com) bij vermoeden van ongeautoriseerde toegang."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Abonnementen, facturering en restitutie",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Plannen**: Gratis (€0), Pro (€12/maand of €99/jaar), Business (€39/maand of €349/jaar). De functies en quotumlimieten van de plannen zijn zoals beschreven op onze [Prijspagina](/pricing) op het moment van aankoop. Wij behouden ons het recht voor om planfuncties met 30 dagen voorafgaande kennisgeving aan te passen.",
              "**Automatische verlenging**: maand- en jaarabonnementen verlengen automatisch met dezelfde frequentie totdat ze worden geannuleerd. U kunt op elk moment annuleren via uw dashboard; annulering treedt in werking aan het einde van de huidige factureringsperiode. U behoudt toegang tot die datum.",
              "**Herroepingsrecht (EU)**: krachtens Artikel L. 221-28 van de Franse Consumentenwet, als u de Dienst actief gebruikt tijdens de initiële herroepingsperiode van 14 dagen, stemt u uitdrukkelijk in met de onmiddellijke uitvoering van de overeenkomst en doet u afstand van uw herroepingsrecht. Als u geen betaalde functie heeft gebruikt, kunt u binnen 14 dagen herroepen door een e-mail te sturen naar [billing@konvertools.com](mailto:billing@konvertools.com) en wij zullen binnen 14 dagen een volledige restitutie verlenen.",
              "**Geen gedeeltelijke restituties**: buiten het hierboven beschreven herroepingscenario zijn reeds betaalde vergoedingen voor de huidige factureringsperiode niet restitueerbaar.",
              "**Credits**: API-credits die als eenmalige pakketten zijn aangeschaft (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **vervallen nooit**. De 300 credits die maandelijks automatisch aan Business-abonnees worden toegekend, vervallen aan het einde van de kalendermaand en zijn **niet restitueerbaar**.",
              "**Prijswijzigingen**: wij kunnen prijzen wijzigen met 30 dagen voorafgaande kennisgeving. Bestaande abonnees behouden hun huidige prijs tot hun volgende verlengingsdatum.",
              "**Belasting**: prijzen worden getoond exclusief BTW waar van toepassing. Stripe int en draagt eventuele verschuldigde belasting in uw rechtsgebied af."
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
            "text": "Het Business-plan biedt een openbare REST API die wordt geauthenticeerd met API-sleutels die u genereert via uw dashboard. Het gebruik van de API wordt bovendien gereguleerd door:"
          },
          {
            "kind": "ul",
            "items": [
              "**Snelheidslimieten**: 60 verzoeken per minuut (Pro-upgrades) of 120 verzoeken per minuut (Business). Duurzaam misbruik kan leiden tot tijdelijke throttling of permanente intrekking van de sleutel.",
              "**Creditverbruik**: elk API-verzoek haalt credits af volgens de tarieven die zijn gepubliceerd in onze [API-documentatie](/api). Mislukte verzoeken (5xx-responsen) halen geen credits af.",
              "**Sleutelbeveiliging**: u bent verantwoordelijk voor het veilig opslaan van uw API-sleutels en het rouleren ervan als ze zijn gecompromitteerd. Wij kunnen elke sleutel op elk moment intrekken als wij misbruik vermoeden.",
              "**Aanvaardbaar upstream-gebruik**: applicaties gebouwd op onze API moeten voldoen aan deze Voorwaarden, inclusief de sectie over aanvaardbaar gebruik. U mag onze API-sleutels niet blootstellen aan eindgebruikers (licentieer uw dienst in plaats daarvan onder)."
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
            "text": "De naam, het logo, de code, het ontwerp, de documentatie, de database-opbouw en de geaggregeerde inhoud van de Dienst zijn het exclusieve eigendom van de Uitgever en worden beschermd door Frans en internationaal intellectueel eigendomsrecht. U krijgt geen licentie verleend behalve wat strikt noodzakelijk is om de Dienst te gebruiken zoals bedoeld. U mag de Dienst of enig deel daarvan niet reproduceren, wijzigen, decompileren of afgeleide werken maken, tenzij dit uitdrukkelijk is toegestaan door toepasselijk recht."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnisatie",
        "blocks": [
          {
            "kind": "p",
            "text": "U gaat ermee akkoord de Uitgever te vrijwaren en schadeloos te stellen voor elke claim, schade, aansprakelijkheid, kosten of kostenpost (inclusief redelijke juridische kosten) die voortvloeit uit (a) uw schending van deze Voorwaarden, (b) uw overtreding van enig recht of wet van derden, of (c) enige inhoud die u naar de Dienst heeft geüpload."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Wijzigingen in de Voorwaarden",
        "blocks": [
          {
            "kind": "p",
            "text": "Wij kunnen deze Voorwaarden van tijd tot tijd wijzigen. Substantiële wijzigingen worden minimaal dertig (30) dagen voorafgaand aan de inwerkingtreding per e-mail aan accounthouders meegedeeld. Door het gebruik van de Dienst na deze periode te continueren, gaat u akkoord met de gewijzigde Voorwaarden. De meest recente versie is altijd beschikbaar op [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Beëindiging",
        "blocks": [
          {
            "kind": "p",
            "text": "U kunt uw account op elk moment beëindigen via uw dashboard. Wij kunnen uw account onmiddellijk en zonder voorafgaande kennisgeving opschorten of beëindigen als u deze Voorwaarden overtreedt, de Dienst misbruikt of een terugkerende abonnementskosten niet betaalt. Bij beëindiging worden uw gegevens binnen dertig (30) dagen verwijderd, met uitzondering van factuurgegevens en toestemmingsregistraties die worden bewaard zoals beschreven in ons Privacybeleid."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Toepasselijk recht en jurisdictie",
        "blocks": [
          {
            "kind": "p",
            "text": "Deze Voorwaarden vallen onder het recht van Frankrijk. Elke geschil dat voortvloeit uit of verband houdt met deze Voorwaarden of de Dienst wordt onderworpen aan de exclusieve jurisdictie van de rechtbanken van Parijs, Frankrijk, tenzij een consument zijn verplichte actierecht in zijn land van verblijf kan uitoefenen krachtens EU- of nationaal recht. Voordat u juridische stappen onderneemt, gaat u ermee akkoord om te proberen het geschil op een vriendelijke manier op te lossen door te schrijven naar [legal@konvertools.com](mailto:legal@konvertools.com). EU-consumenten kunnen ook gebruikmaken van het platform voor online geschillenbeslechting van de Europese Commissie op [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Overige bepalingen",
        "blocks": [
          {
            "kind": "p",
            "text": "Als enig onderdeel van deze Voorwaarden nietig of onuitvoerbaar wordt verklaard, blijven de overige onderdelen volledig van kracht. Onze niet-nakoming van enig recht of bepaling is geen afstand van dat recht. Deze Voorwaarden (samen met het Privacybeleid en eventuele plan-specifieke voorwaarden die bij aankoop zijn vermeld) vormen de volledige overeenkomst tussen u en de Uitgever met betrekking tot de Dienst."
          }
        ]
      }
    ]
  },
  "ja": {
    "h1": "利用規約",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最終更新日: %DATE% · Konvertoolsをご利用いただくことで、これらの利用規約に同意したものとみなされます。",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. 同意",
        "blocks": [
          {
            "kind": "p",
            "text": "本利用規約（以下「本規約」といいます。）は、貴方（以下「ユーザー」といいます。）とKonvertoolsの提供元（以下「発行元」、「当社」、「弊社」といいます。）との間の、Konvertoolsウェブサイトおよび関連ツール、API、サービス（以下総称して「サービス」といいます。）のご利用に関する拘束力のある合意を形成します。アカウントの作成、登録時の同意チェックボックスの選択、またはサービス内のいずれかのツールをご利用いただくことにより、貴方は本規約全体を読み、理解し、完全に同意したことを確認したものとみなされます。また、プライバシーポリシーと合わせてご同意いただくものとします。"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. サービス",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertoolsは、ファイル変換ユーティリティ、文書・画像処理ツール、AI支援テキストユーティリティ、セキュリティツール（ウイルススキャナー、メール検証、フィッシング検出、URLスキャナー）、および開発者向けユーティリティのカタログを提供します。ほとんどのツールはブラウザ内で完全に実行されますが、一部のツールはサーバー処理を必要とします。サービスは、**「現状有姿」**および**「利用可能な状態」**で提供され、明示的・黙示的を問わず、商品性、特定目的への適合性、非侵害性を含むいかなる保証もありません。"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 責任の制限 — 注意深くお読みください",
        "blocks": [
          {
            "kind": "p",
            "text": "**法令で最大限許容される範囲で、発行元は、貴方によるサービスのご利用またはご利用不能に起因するいかなる種類の損害についても責任を負いません。**特に、発行元は以下に起因する責任を負わないことに貴方は同意します。"
          },
          {
            "kind": "ul",
            "items": [
              "データの損失、破損または不正なファイル、変換の失敗；",
              "ツールの出力に基づく意思決定、財務上・ビジネス上その他の意思決定；",
              "ダウンタイム、遅延、または機能の一時的な利用不能；",
              "第三者サービスの障害（Supabase、Mistral、VirusTotal、Google、Stripe、Resend、ホスティングプロバイダー）；",
              "間接的、偶発的、特別、結果的、または懲罰的損害を含むいかなる種類の損害；",
              "請求の原因となった事象が発生する前12か月間に貴方が弊社に実際に支払った料金を超える集計金額、無料プランユーザーの場合は100ユーロを上限とします。"
            ]
          },
          {
            "kind": "p",
            "text": "**セキュリティツール**：ウイルススキャナー、URLスキャナー、フィッシング検出、メール検証は、**情報提供および参考目的のみ**で提供されます。これらは第三者のシグナル（VirusTotalの70以上のアンチウイルスエンジン、Google Safe Browsing、パブリックDNS）および大規模言語モデルのヒューリスティックを集約したものです。**安全性、有効性、リスクの不在を保証するものではありません**。新しいマルウェアはアンチウイルスエンジンが更新されるまで検出を逃れ、新しいフィッシングページは評判データベースがカタログ化するよりも速く出現します。弊社のチェックを通過したメールであっても、まだアクティブでないか詐欺の可能性があります。発行元は、弊社が検知しなかった悪意のあるファイル、弊社が安全と判断したフィッシングメール、弊社が特定できなかった安全でないリンク、または弊社が有効と判断したアドレスに送信されたトランザクションメールに起因するいかなる損害についても、明示的に責任を放棄します。ユーザーは、これらのツールに基づくセキュリティ上の判断について全面的な責任を負います。"
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 適切な利用",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方は以下の行為を行わないことに同意します。"
          },
          {
            "kind": "ul",
            "items": [
              "貴方の管轄地またはフランスにおいて違法なコンテンツをアップロード、処理、または配布すること；",
              "必要な権利を有していないファイルを処理すること（許可なく著作権のある作品、処理する権利のない個人データ、機密情報）；",
              "詐欺、マネーロンダリング、テロ資金調達、その他の犯罪行為を実行または助長すること；",
              "AI人間化ツール、AIテキストツール、その他の機能を使用して、剽窃を行うこと、第三者を欺くこと、学術・採用・広告ネットワークなどの評価システムをそのルールに違反する方法で操作すること、または適用法に違反する方法で誤解を招くこと；",
              "法令違反となる管轄地で弊社のスキャナーをテストするためにマルウェアをアップロードすること（代わりにEICARテストファイルを使用してください）；",
              "サービスの運用または可用性を妨害または干渉する目的で、過負荷をかけたり、リバースエンジニアリングを行ったり、スクレイピングを行ったり、レート制限を悪用したりすること；",
              "割り当てられたクォータ、支払い要件、またはその他の制限を回避すること；",
              "無料プランのクォータを複数化するために複数のアカウントを作成したり、プランで許可されている以上の個人間でアカウントを共有したりすること。"
            ]
          },
          {
            "kind": "p",
            "text": "弊社は、本項に違反したと合理的な根拠があると判断した場合、直ちに通知なしにアカウントを停止または終了することがあり、いかなる種類の返金も受けられません。"
          }
        ]
      },
      {
        "id": "content",
        "title": "5. 貴方のコンテンツ",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方は、サービスに送信するファイルおよびテキストに関するすべての権利、所有権、利益を保持します。貴方は、要求されたツールを提供するためにのみ処理するという厳格に限定された、無償、世界的なライセンスを弊社に付与します。このライセンスは、結果が貴方に返される瞬間（サーバー処理が必要なツール）に終了するか、ブラウザ内で完結するツールの場合はそもそも発生しません（貴方のファイルは弊社に到達しません）。弊社は、貴方のコンテンツの所有権を主張したり、それを使用してAIモデルをトレーニングしたりすることはありません。"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. アカウント",
        "blocks": [
          {
            "kind": "p",
            "text": "アカウントを作成するには、少なくとも16歳以上でなければなりません。貴方は、資格情報を機密に保ち、アカウント下で発生するあらゆる活動について責任を負います。不正アクセスが疑われる場合は、直ちに[security@konvertools.com](mailto:security@konvertools.com)までご連絡ください。"
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
              "**プラン**：無料（€0）、Pro（月額€12または年額€99）、Business（月額€39または年額€349）。プランの機能およびクォータは、購入時の[料金ページ](/pricing)に記載されているとおりです。弊社は30日間の事前通知をもってプランの機能を変更する権利を留保します。",
              "**自動更新**：月額および年額のサブスクリプションは、キャンセルされるまで同じ頻度で自動更新されます。ダッシュボードからいつでもキャンセルできます。キャンセルは現在の請求期間の終了時に有効となり、それまでは引き続きアクセスできます。",
              "**撤回権（EU）**：フランス消費者法第L. 221-28条に基づき、初回の14日間の撤回期間中に有償機能を実際にご利用いただいた場合、貴方は契約の即時履行に明示的に同意し、撤回権を放棄したものとみなされます。有償機能をご利用でない場合は、[billing@konvertools.com](mailto:billing@konvertools.com)までメールを送信することで14日以内に撤回でき、弊社は14日以内に全額返金いたします。",
              "**部分返金不可**：上記の撤回シナリオを除き、現在の請求期間に支払われた料金は返金されません。",
              "**クレジット**：APIクレジットをワンタイムパック（「Starter」、「Growth」、「Scale」、「Studio」）で購入した場合、**有効期限はありません**。Businessプラン加入者に毎月自動付与される300クレジットは、カレンダー月の末日に失効し、**返金されません**。",
              "**価格改定**：弊社は30日間の事前通知をもって価格を改定することがあります。既存のサブスクライバーは、次回の更新日まで現在の価格が適用されます。",
              "**税金**：表示される価格は、該当する場合を除き、消費税は含まれていません。Stripeが貴方の管轄地における税金の徴収および納付を行います。"
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
            "text": "Businessプランでは、ダッシュボードから生成するAPIキーで認証されるパブリックREST APIが提供されます。APIのご利用は、以下の規約にも追加で適用されます。"
          },
          {
            "kind": "ul",
            "items": [
              "**レート制限**：1分あたり60リクエスト（Proアップグレード）または120リクエスト（Business）。持続的な悪用は、一時的な制限またはキーの永久取り消しにつながる可能性があります。",
              "**クレジット消費**：各APIコールは、[APIドキュメント](/api)に記載されているレートでクレジットを消費します。失敗したコール（5xxレスポンス）はクレジットを消費しません。",
              "**キーのセキュリティ**：APIキーを安全に保管し、侵害された場合はローテーションする責任は貴方にあります。弊社は、悪用が疑われる場合はいつでもキーを取り消すことがあります。",
              "**上流の利用に関する適切性**：弊社のAPIを使用して構築されたアプリケーションは、これらの利用規約（特に適切な利用に関するセクション）に準拠する必要があります。エンドユーザーに弊社のAPIキーを公開してはなりません（代わりにサービスをサブライセンスしてください）。"
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
            "text": "サービスの名称、ロゴ、コード、デザイン、ドキュメント、データベース構造、および集約されたコンテンツは、発行元の排他的な所有物であり、フランスおよび国際的な知的財産法によって保護されています。サービスを意図したとおりにご利用いただくために必要な範囲を超えて、貴方にライセンスは付与されません。適用法により明示的に許可されている場合を除き、サービスまたはその一部を複製、改変、逆アセンブル、派生的著作物を作成することはできません。"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. 免責補償",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方は、以下に起因するあらゆる請求、損失、損害、責任、費用（合理的な弁護士費用を含む）について、発行元に損害を与えず、発行元を免責することに同意します。（a）貴方による本規約の違反、（b）貴方による法令または第三者の権利の侵害、（c）貴方がサービスに送信したコンテンツ。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. 利用規約の変更",
        "blocks": [
          {
            "kind": "p",
            "text": "弊社は随時本規約を改定することがあります。実質的な変更については、効力発生日30日前までにアカウント保有者にメールで通知されます。その期間を過ぎてサービスを引き続きご利用いただくことで、改定された規約に同意したものとみなされます。最新版は常に[https://konvertools.com/terms](https://konvertools.com/terms)でご確認いただけます。"
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. 終了",
        "blocks": [
          {
            "kind": "p",
            "text": "貴方はダッシュボードからいつでもアカウントを終了できます。弊社は、貴方が本規約に違反した場合、サービスを悪用した場合、または定期購読料の支払いに失敗した場合、直ちに通知なしにアカウントを終了または停止することがあります。終了後、貴方のデータは30日以内に削除されますが、プライバシーポリシーに記載されているとおり、請求記録および同意記録は保持されます。"
          }
        ]
      },
      {
        "id": "law",
        "title": "13. 準拠法および管轄",
        "blocks": [
          {
            "kind": "p",
            "text": "本規約はフランス法に準拠します。本規約またはサービスに起因または関連するあらゆる紛争は、欧州連合または適用される国内法により消費者の強制的な権利行使が優先される場合を除き、フランス・パリの裁判所の専属管轄に付託されます。法的措置を開始する前に、[legal@konvertools.com](mailto:legal@konvertools.com)に書面で紛争の amicable な解決を試みることに同意します。EUの消費者は、欧州委員会のオンライン紛争解決プラットフォーム[ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)もご利用いただけます。"
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. その他",
        "blocks": [
          {
            "kind": "p",
            "text": "本規約のいずれかの条項が無効または執行不能と判断された場合でも、他の条項は完全に有効です。弊社による権利または条項の執行不履行は、その権利の放棄を意味しません。本規約（プライバシーポリシーおよび購入時に参照されるプラン固有の条項と合わせて）は、サービスに関する貴方と発行元との間の完全な合意を構成します。"
          }
        ]
      }
    ]
  },
  "zh": {
    "h1": "服务条款",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "最后更新：%DATE% · 通过使用 Konvertools，您即表示同意这些条款。",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. 接受",
        "blocks": [
          {
            "kind": "p",
            "text": "本《服务条款》（以下简称“条款”）构成您（以下简称“您”或“用户”）与 Konvertools 的发布方（以下简称“发布方”、“我们”或“本公司”）之间的一项具有约束力的协议，涵盖您对 Konvertools 网站及所有相关工具、API 和服务（统称为“服务”）的使用。通过创建账户、在注册时勾选接受框或仅使用服务中的任何工具，您即确认已完整阅读、理解并接受这些条款的全部内容，同时连同我们的《隐私政策》一并接受。"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. 服务",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools 提供一系列文件转换工具、文档与图像处理工具、AI 辅助文本工具、指示性安全工具（病毒扫描器、邮箱验证器、钓鱼检测器、URL 扫描器）及开发者工具。大多数工具在您的浏览器中完全本地执行；部分工具需服务器处理。服务以“**原样**”和“**按现状**”提供，不附带任何明示或默示的保证，包括但不限于适销性、适用性或非侵权性。"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 责任限制 — 请仔细阅读",
        "blocks": [
          {
            "kind": "p",
            "text": "**在法律允许的最大范围内，发布方对您使用或无法使用服务而产生的任何损害概不承担责任。** 您特别同意并确认，发布方无需对以下情况承担责任："
          },
          {
            "kind": "ul",
            "items": [
              "数据丢失、文件损坏或转换失败；",
              "基于任何工具输出所做出的决定（包括但不限于财务、商业等）；",
              "服务的停机、延迟或临时不可用；",
              "第三方服务故障（Supabase、Mistral、VirusTotal、Google、Stripe、Resend、托管服务提供商）；",
              "间接、附带、特殊、后果性或惩罚性损害赔偿；",
              "任何超过您在引发索赔事件前十二（12）个月内实际向我们支付的费用的累计金额，免费用户上限为一百（100）欧元。"
            ]
          },
          {
            "kind": "p",
            "text": "**安全工具**：病毒扫描器、URL 扫描器、钓鱼检测器及邮箱验证器仅供**参考和指示性使用**。它们汇总第三方信号（VirusTotal 的 70 余个杀毒引擎、Google 安全浏览、公共 DNS）及大语言模型启发式方法。这些工具**不构成安全性、有效性或无风险的保证**。新型恶意软件可能在杀毒引擎更新前逃避检测；新钓鱼页面的出现速度远超信誉数据库的收录速度；通过我们检查的邮箱仍可能存在无效或欺诈风险。发布方明确拒绝对任何以下情况承担责任：服务未标记的恶意文件、服务判定为安全的钓鱼邮件、服务未识别的不安全链接或服务标记为有效地址的交易邮件。用户应对基于这些工具所做出的安全决策承担全部责任。"
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 可接受使用",
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
              "实施或协助欺诈、洗钱、恐怖主义融资或任何犯罪活动；",
              "使用 AI 人性化工具、AI 文本工具或其他功能进行抄袭、欺骗第三方、操纵评估系统（学术、招聘、广告网络）以违反其规则，或以任何方式误导他人而违反适用法律；",
              "上传恶意软件以测试扫描器（如在您所在司法管辖区属违法行为，请改用 EICAR 测试文件）；",
              "试图过载、逆向工程、抓取、滥用速率限制或以其他方式干扰服务的运行或可用性；",
              "规避配额、付费要求或其他限制；",
              "创建多个账户以增加免费额度或跨多个用户共享单个账户。"
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
            "text": "您对提交至服务的文件和文本保留所有权利、所有权和利益。您授予我们一项严格有限的、免版税的、全球性许可，仅用于处理您的内容以提供您请求的工具。该许可在结果返回给您时（服务器辅助工具）立即终止，或在浏览器端工具中从未生效（因为您的文件未传输至我们）。我们不会、也不会对您的内容主张所有权，或将其用于训练 AI 模型。"
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. 账户",
        "blocks": [
          {
            "kind": "p",
            "text": "您必须年满十六（16）周岁方可创建账户。您对保管好凭证及账户下的任何活动负责。如发现任何未经授权的访问，请立即发送邮件至 [security@konvertools.com](mailto:security@konvertools.com) 通知我们。"
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
              "**套餐**：免费（€0）、专业版（€12/月或€99/年）、商业版（€39/月或€349/年）。套餐功能与配额以购买时我方 [定价页面](/pricing) 上的说明为准。我们保留在提前 30 天通知的情况下修改套餐功能的权利。",
              "**自动续费**：月度与年度订阅将自动续费，直至取消。您可随时从仪表板取消订阅；取消将在当前计费周期结束时生效。您将保留访问权限直至该日期。",
              "**撤回权（欧盟）**：根据《法国消费者法》第 L. 221-28 条，在初始 14 天撤回期内积极使用服务的情况下，您明确同意立即履行合同并放弃撤回权。如您未使用任何付费功能，可在 14 天内通过发送邮件至 [billing@konvertools.com](mailto:billing@konvertools.com) 申请撤回，我们将在 14 天内全额退款。",
              "**不予部分退款**：除上述撤回情形外，当前计费周期内已支付的费用概不退款。",
              "**积分**：购买的一次性积分包（“入门”、“成长”、“扩展”、“工作室”）**永不过期**。商业版订阅用户每月自动赠送的 300 积分将在日历月结束时到期，**且不予退款**。",
              "**价格变更**：我们可在提前 30 天通知后调整价格。现有订阅用户在下次续费前将维持当前价格。",
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
              "**积分消耗**：每次 API 调用按 [API 文档](/api) 中公布的费率扣除积分。失败调用（5xx 响应）不扣除积分。",
              "**密钥安全**：您应负责安全存储 API 密钥并在泄露时及时轮换。如我们怀疑滥用，可随时撤销任何密钥。",
              "**上游使用合规**：基于我们 API 构建的应用必须遵守这些条款，包括可接受使用条款。您不得将我们的 API 密钥暴露给最终用户（请改用子授权您的服务）。"
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
            "text": "服务的名称、徽标、代码、设计、文档、数据库结构及汇总内容是发布方的独家财产，受法国及国际知识产权法保护。除为使用服务所必需的严格许可外，您无权对服务或其任何部分进行复制、修改、反编译或创建衍生作品，法律另有明确授权的除外。"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. 赔偿责任",
        "blocks": [
          {
            "kind": "p",
            "text": "您同意对以下情况向发布方进行赔偿并使其免受任何索赔、损失、损害、责任、成本或费用（包括合理律师费）的损害：（a）您违反这些条款；（b）您违反任何法律或第三方权利；（c）您向服务提交的任何内容。"
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. 条款变更",
        "blocks": [
          {
            "kind": "p",
            "text": "我们可能不时修改这些条款。实质性变更将至少提前三十（30）天通过邮件通知账户持有人。在该期限后继续使用服务即表示您接受修改后的条款。最新版本始终可在 [https://konvertools.com/terms](https://konvertools.com/terms) 查看。"
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. 终止",
        "blocks": [
          {
            "kind": "p",
            "text": "您可随时从仪表板终止账户。如您违反这些条款、滥用服务或未支付订阅费用，我们可立即无通知地终止或暂停您的账户。账户终止后，您的数据将在三十（30）天内删除，但计费记录和同意记录将按《隐私政策》所述保留。"
          }
        ]
      },
      {
        "id": "law",
        "title": "13. 管辖法律与司法管辖",
        "blocks": [
          {
            "kind": "p",
            "text": "这些条款受法国法律管辖。与这些条款或服务相关的任何争议应提交巴黎法院专属管辖，但如欧盟或适用的国内法赋予消费者在其居住国的强制性诉讼权利，则不在此限。在提起法律诉讼前，您同意尝试通过发送邮件至 [legal@konvertools.com](mailto:legal@konvertools.com) 友好解决争议。欧盟消费者还可使用欧洲委员会的在线争议解决平台：[ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)。"
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. 其他条款",
        "blocks": [
          {
            "kind": "p",
            "text": "如任何条款被认定为无效或不可执行，其余条款仍完全有效。我们未行使任何权利或条款不构成对该权利的放弃。这些条款（连同《隐私政策》及购买时引用的特定套餐条款）构成您与发布方就服务达成的完整协议。"
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
            "text": "본 서비스 약관(이하 \"약관\")은 귀하(이하 \"사용자\")와 Konvertools의 발행자(이하 \"발행자\", \"우리\", \"저희\") 간의 Konvertools 웹사이트 및 모든 관련 도구, API, 서비스(이하 \"서비스\") 사용에 대한 구속력 있는 계약입니다. 계정을 생성하거나, 가입 시 수락 확인란을 체크하거나, 서비스상의 어떤 도구든 사용함으로써 귀하는 본 약관 전체와 당사의 개인정보 보호정책을 읽고 이해했으며 전적으로 수락했다는 사실을 확인하는 것입니다."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. 서비스",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools는 파일 변환 유틸리티, 문서 및 이미지 처리 도구, AI 지원 텍스트 유틸리티, 예비 보안 도구(바이러스 스캐너, 이메일 인증 도구, 피싱 감지 도구, URL 스캐너) 및 개발자 유틸리티로 구성된 카탈로그를 제공합니다. 대부분의 도구는 브라우저에서 완전히 실행되며, 일부는 서버 처리가 필요합니다. 서비스는 **\"있는 그대로\"** 및 **\"사용 가능한 상태로\"** 제공되며, 명시적이든 묵시적이든 상품성, 특정 목적에의 적합성 또는 비침해성에 대한 어떠한 보증도 없습니다."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. 책임 제한 — 주의 깊게 읽어 주십시오",
        "blocks": [
          {
            "kind": "p",
            "text": "**법이 허용하는 최대한으로, 발행자는 서비스 사용 또는 사용 불가능으로 인한 모든 종류의 손해에 대한 책임을 부인합니다.** 특히, 귀하는 다음 사항을 인정하고 동의합니다. 발행자는 다음에 대해 책임을 지지 않습니다."
          },
          {
            "kind": "ul",
            "items": [
              "데이터 손실, 손상 또는 잘못된 파일, 또는 변환 실패;",
              "도구의 출력 결과에 기반한 결정(재정, 비즈니스 등);",
              "서비스의 가동 중지, 지연 또는 일시적 사용 불가;",
              "서드파티 서비스 실패(Supsabase, Mistral, VirusTotal, Google, Stripe, Resend, 호스팅 제공업체);",
              "간접적, 우발적, 특별, 결과적 또는 징벌적 손해 배상;",
              "사건 발생 전 12개월 동안 귀하가 지불한 수수료를 초과하는 금액(무료 등급 사용자의 경우 100유로로 상한)."
            ]
          },
          {
            "kind": "p",
            "text": "**보안 도구**: 바이러스 스캐너, URL 스캐너, 피싱 감지 도구 및 이메일 인증 도구는 **정보 제공 및 예비 목적**으로만 제공됩니다. 이러한 도구는 서드파티 신호(바이러스토탈의 70개 이상의 안티바이러스 엔진, 구글 안전한 브라우징, 공개 DNS) 및 대규모 언어 모델 기반 추론을 집계합니다. 이러한 도구는 **안전성, 유효성 또는 위험 부재에 대한 보증을 구성하지 않습니다**. 새로운 악성 코드는 안티바이러스 엔진이 업데이트되기 전까지 감지되지 않을 수 있으며, 새로운 피싱 페이지는 평판 데이터베이스가 목록화하기 전에 더 빠르게 등장할 수 있습니다. 서비스가 안전한 것으로 판단한 이메일도 여전히 비활성 또는 사기일 수 있습니다. 발행자는 서비스에서 감지하지 못한 악성 파일, 안전한 것으로 판단한 피싱 이메일, 식별하지 못한 안전하지 않은 링크 또는 서비스가 유효하다고 표시한 주소로 전송된 거래용 이메일로 인한 모든 손해에 대해 명시적으로 책임을 거부합니다. 사용자는 이러한 도구를 기반으로 한 보안 결정에 대한 전적인 책임을 집니다."
          }
        ]
      },
      {
        "id": "acceptable-use",
        "title": "4. 허용 가능한 사용",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 다음 행위를 위해 서비스를 사용하지 않을 것에 동의합니다."
          },
          {
            "kind": "ul",
            "items": [
              "귀하의 관할권 또는 프랑스에서 불법인 콘텐츠를 업로드, 처리 또는 배포;",
              "필요한 권리를 보유하지 않은 파일 처리(저작권이 있는 작품을 무단으로, 귀하가 처리할 권한이 없는 개인정보, 기밀 정보);",
              "사기, 돈세탁, 테러 자금 조달 또는 기타 범죄 행위를 저지르거나 용이하게 함;",
              "AI 인간화 도구, AI 텍스트 도구 또는 기타 기능을 표절, 제3자를 기만, 학술, 채용, 광고 네트워크 등 평가 시스템을 규정을 위반하는 방식으로 조작하거나, 적용 가능한 법률을 위반하는 방식으로 오도하는 데 사용;",
              "법률을 위반하는 방식으로 스캐너를 테스트하기 위해 악성 코드를 업로드(대신 EICAR 테스트 파일을 사용);",
              "서비스의 운영 또는 가용성을 방해하거나 과부하를 일으키거나, 역공학을 시도하거나, 스크래핑을 하거나, 사용률 제한을 남용하거나, 기타 간섭을 시도;",
              "할당량, 결제 요구 사항 또는 기타 제한을 우회;",
              "무료 등급 할당량을 늘리기 위해 다중 계정을 생성하거나, 계획에서 허용하는 것보다 많은 인원이 계정을 공유."
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
            "text": "귀하는 서비스에 제출하는 파일 및 텍스트에 대한 모든 권리, 소유권 및 이익을 보유합니다. 귀하는 요청한 도구를 제공하기 위해 해당 콘텐츠를 처리할 수 있도록 엄격히 제한된, 무료, 전 세계적인 라이선스를 발행자에게 부여합니다. 이 라이선스는 결과가 귀하에게 반환되는 즉시 종료됩니다(서버 지원 도구) 또는 브라우저 전용 도구의 경우 파일 자체가 전송되지 않으므로 발생하지 않습니다. 발행자는 귀하의 콘텐츠를 소유하지 않으며, AI 모델 훈련에 사용하지 않습니다."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. 계정",
        "blocks": [
          {
            "kind": "p",
            "text": "계정을 생성하려면 최소 16세 이상이어야 합니다. 귀하는 자격 증명을 비밀로 유지하고 계정 하에서 발생하는 모든 활동에 대해 책임을 집니다. [security@konvertools.com](mailto:security@konvertools.com)으로 suspected unauthorized access(허가받지 않은 접근 의심)을 즉시 알리십시오."
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
              "**요금제**: 무료(€0), 프로(월 €12 또는 연 €99), 비즈니스(월 €39 또는 연 €349). 요금제 기능 및 할당량은 구매 시 [요금제 페이지](/pricing)에서 설명한 바와 같습니다. 발행자는 30일 전에 통보하고 요금제 기능을 수정할 권리를 보유합니다.",
              "**자동 갱신**: 월별 및 연간 구독은 취소할 때까지 동일한 주기로 자동 갱신됩니다. 언제든지 대시보드에서 취소할 수 있으며, 취소는 현재 결제 기간이 종료될 때 적용됩니다. 해당 날짜까지 액세스가 유지됩니다.",
              "**철회권(EU)**: 프랑스 소비자법 제 L. 221-28조에 따라, 초기 14일 철회 기간 동안 서비스를 적극적으로 사용한 경우 귀하는 계약을 즉시 이행하는 데 명시적으로 동의하며, 철회권을 포기합니다. 유료 기능을 사용하지 않았다면 14일 이내에 [billing@konvertools.com](mailto:billing@konvertools.com)으로 이메일을 보내 철회할 수 있으며, 발행자는 14일 이내에 전액 환불을 발행합니다.",
              "**부분 환불 불가**: 위의 철회 시나리오 외에는 현재 결제 기간에 대해 이미 지불된 수수료는 환불되지 않습니다.",
              "**크레딧**: API 크레딧(일회성 패키지 \"Starter\", \"Growth\", \"Scale\", \"Studio\")은 **절대 만료되지 않습니다**. 비즈니스 구독자에게 매월 자동으로 부여되는 300크레딧은 매월 말일까지 유효하며 **환불되지 않습니다**.",
              "**가격 변경**: 발행자는 30일 전에 가격을 변경할 수 있습니다. 기존 구독자는 다음 갱신일까지 현재 가격을 유지합니다.",
              "**세금**: 가격은 적용 가능한 경우 부가가치세가 제외된 상태로 표시됩니다. Stripe가 귀하의 관할권에서 발생하는 세금을 징수 및 납부합니다."
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
            "text": "비즈니스 요금제는 대시보드에서 생성하는 API 키로 인증되는 공개 REST API를 제공합니다. API 사용은 다음에 따라 추가로 규율됩니다."
          },
          {
            "kind": "ul",
            "items": [
              "**사용률 제한**: 분당 60회 요청(프로 상향) 또는 분당 120회 요청(비즈니스). 지속적인 남용은 일시적인 속도 제한 또는 영구적인 키 취소로 이어질 수 있습니다.",
              "**크레딧 소비**: 각 API 호출은 [API 문서](/api)에 게시된 비율로 크레딧을 차감합니다. 실패한 호출(5xx 응답)은 크레딧을 차감하지 않습니다.",
              "**키 보안**: API 키를 안전하게 저장하고 손상된 경우 교체할 책임은 귀하에게 있습니다. 발행자는 남용이 의심되는 경우 언제든지 키를 취소할 수 있습니다.",
              "**상위 사용 허용**: 당사의 API를 기반으로 구축된 애플리케이션은 본 약관을 포함하여 허용 가능한 사용 섹션을 준수해야 합니다. 당사의 API 키를 최종 사용자에게 노출해서는 안 됩니다(서비스를 서브라이선스하십시오)."
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
            "text": "서비스의 이름, 로고, 코드, 디자인, 문서, 데이터베이스 구조 및 집계된 콘텐츠는 발행자의 배타적 재산이며, 프랑스 및 국제 지적 재산권법으로 보호됩니다. 서비스 사용에 필요한 경우를 제외하고는 어떠한 라이선스도 부여되지 않습니다. 적용 가능한 법률에 의해 명시적으로 허용된 경우를 제외하고는 서비스의 복제, 수정, 역공학 또는 파생 작업을 수행할 수 없습니다."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. 면책 조항",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 다음 사항으로부터 발생하는 모든 청구, 손실, 손해, 책임, 비용 또는 비용(합리적인 법적 수수료 포함)을 발행자에게 배상하고 면책할 것에 동의합니다. (a) 본 약관 위반, (b) 법 또는 제3자 권리 위반, (c) 서비스에 제출한 콘텐츠."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. 약관 변경",
        "blocks": [
          {
            "kind": "p",
            "text": "발행자는 약관을 수시로 수정할 수 있습니다. 실질적인 변경 사항은 계정 보유자에게 약관 발효 최소 30일 전에 이메일로 통보됩니다. 해당 기간 이후에도 서비스를 계속 사용함으로써 귀하는 수정된 약관을 수락하는 것입니다. 최신 버전은 항상 [https://konvertools.com/terms](https://konvertools.com/terms)에서 확인할 수 있습니다."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. 종료",
        "blocks": [
          {
            "kind": "p",
            "text": "귀하는 언제든지 대시보드에서 계정을 종료할 수 있습니다. 발행자는 본 약관을 위반하거나, 서비스를 남용하거나, 정기 구독료를 지불하지 않는 경우 계정을 즉시 및 사전 통보 없이 종료 또는 정지할 수 있습니다. 종료 시 billing records(결제 기록) 및 개인정보 보호정책에 설명된 대로 보관된 동의 기록을 제외하고 데이터가 30일 이내에 삭제됩니다."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. 준거법 및 관할권",
        "blocks": [
          {
            "kind": "p",
            "text": "본 약관은 프랑스 법률에 따라 규율됩니다. 본 약관 또는 서비스와 관련하여 발생하는 분쟁은 유럽 연합 또는 적용 가능한 국내법 하에서 소비자의 강제적 권리가 우선하는 경우를 제외하고는 프랑스 파리 소재 법원의 전속 관할권에 제출됩니다. 법적 조치를 개시하기 전에 [legal@konvertools.com](mailto:legal@konvertools.com)으로 서신을 보내 분쟁을 원만히 해결하기 위해 노력할 것에 동의합니다. EU 소비자는 [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)에서 유럽 위원회의 온라인 분쟁 해결 플랫폼을 사용할 수도 있습니다."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. 기타",
        "blocks": [
          {
            "kind": "p",
            "text": "본 약관의 어느 조항이 무효 또는 집행 불가능하다고 판단되는 경우, 나머지 조항은 완전히 유효합니다. 발행자의 권리 또는 조항의 집행 실패는 해당 권리의 포기로 간주되지 않습니다. 본 약관(개인정보 보호정책 및 구매 시 참조된 요금제별 약관과 함께)은 서비스와 관련하여 귀하와 발행자 간의 전체 계약을 구성합니다."
          }
        ]
      }
    ]
  },
  "ar": {
    "h1": "الشروط والأحكام",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "آخر تحديث: %DATE% · باستخدامك لـ Konvertools، فإنك توافق على هذه الشروط.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. القبول",
        "blocks": [
          {
            "kind": "p",
            "text": "تشكل هذه الشروط والأحكام (المشار إليها بـ \"الشروط\") اتفاقية ملزمة بينك (المستخدم) وناشر Konvertools (الناشر، \"نحن\") فيما يتعلق باستخدامك لموقع Konvertools وجميع الأدوات والواجهات البرمجية والخدمات ذات الصلة (يشار إليها مجتمعة بـ \"الخدمة\"). من خلال إنشاء حساب، أو تحديد مربع القبول أثناء التسجيل، أو ببساطة باستخدام أي أداة على الخدمة، فإنك تؤكد أنك قد قرأت وفهمت وقبلت هذه الشروط بالكامل، إلى جانب سياستنا الخاصة بالخصوصية."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. الخدمة",
        "blocks": [
          {
            "kind": "p",
            "text": "توفر Konvertools كتالوجاً من أدوات تحويل الملفات، وأدوات معالجة المستندات والصور، وأدوات النص المدعومة بالذكاء الاصطناعي، وأدوات الأمان التوضيحية (ماسح الفيروسات، ومحقق البريد الإلكتروني، وكاشف التصيد، وماسح الروابط) وأدوات المطورين. تنفذ معظم الأدوات بالكامل في متصفحك؛ بينما تتطلب بعضها معالجة على الخادم. تُقدم الخدمة **\"كما هي\" و\"كما متاحة\"** دون أي ضمان من أي نوع، سواء أكان ذلك صريحاً أو ضمنياً، بما في ذلك القابلية للتسويق، والملاءمة لغرض معين، أو عدم انتهاك الحقوق."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. الحد من المسؤولية — اقرأ بعناية",
        "blocks": [
          {
            "kind": "p",
            "text": "**إلى أقصى حد تسمح به القوانين، يتنازل الناشر عن أي مسؤولية عن الأضرار من أي نوع ناتجة عن استخدامك أو عدم قدرتك على استخدام الخدمة.** وبشكل خاص، فإنك تقر وتوافق على أن الناشر لن يكون مسؤولاً عن:"
          },
          {
            "kind": "ul",
            "items": [
              "فقدان البيانات، أو الملفات الفاسدة أو غير الصحيحة، أو عمليات التحويل الفاشلة؛",
              "القرارات، المالية أو التجارية أو غير ذلك، التي تتخذها بناءً على مخرجات أي أداة؛",
              "فترات التوقف، أو التأخير، أو عدم توفر أي ميزة مؤقتاً؛",
              "فشل الخدمات التابعة لجهات خارجية (Supabase، Mistral، VirusTotal، Google، Stripe، Resend، مزودي الاستضافة)؛",
              "الأضرار غير المباشرة أو العرضية أو الخاصة أو اللاحقة أو العقابية من أي نوع؛",
              "أي مبلغ إجمالي يتجاوز الرسوم التي دفعتها إلينا فعلياً خلال الاثني عشر (12) شهراً السابقة للحدث الذي أدى إلى المطالبة، مع تحديد سقف قدره مائة (100) يورو للمستخدمين من الطبقة المجانية."
            ]
          },
          {
            "kind": "p",
            "text": "**أدوات الأمان**: ماسح الفيروسات، وماسح الروابط، وكاشف التصيد، ومحقق البريد الإلكتروني مقدمة **لأغراض إعلامية وتوضيحية فقط**. فهي تجمع إشارات من جهات خارجية (أكثر من 70 محرك مضاد للفيروسات من VirusTotal، وGoogle Safe Browsing، والدلالات العامة) وقياسات خوارزميات الذكاء الاصطناعي الكبيرة. **لا تشكل هذه الأدوات ضماناً للسلامة أو الصلاحية أو عدم وجود مخاطر**. يمكن أن يتجنب البرامج الضارة الجديدة الكشف حتى يتم تحديث محركات مضادات الفيروسات؛ تظهر صفحات التصيد الجديدة أسرع من قدرة قواعد البيانات على تصنيفها؛ قد يكون البريد الإلكتروني الذي اجتاز فحصنا لا يزال نشطاً أو احتيالياً. يتنازل الناشر صراحة عن أي مسؤولية عن أي ضرر ناتج عن ملف ضار لم تكتشفه الخدمة، أو بريد إلكتروني تصيدي اعتبرته الخدمة آمناً، أو رابط غير آمن لم تتمكن الخدمة من تحديده، أو بريد إلكتروني معاملة أُرسل إلى عنوان اعتبرته الخدمة صالحاً. يتحمل المستخدم المسؤولية الكاملة عن القرارات الأمنية المتخذة بناءً على هذه الأدوات."
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
              "ارتكاب أو تسهيل الاحتيال، وغسيل الأموال، وتمويل الإرهاب، أو أي نشاط إجرامي آخر؛",
              "استخدام أدوات التزييف البشري للذكاء الاصطناعي، أو أدوات النص للذكاء الاصطناعي، أو أي ميزة أخرى للانتحال، أو لخداع طرف ثالث، أو لت manipulate أنظمة التقييم (الأكاديمية، التوظيف، شبكات الإعلانات) بما يتعارض مع قواعدها، أو لإضفاء طابع خادع بأي طريقة تنتهك القانون المعمول به؛",
              "تحميل برامج ضارة لاختبار ماسحنا إذا كان القيام بذلك ينتهك القانون في ولايتك القضائية (استخدم ملف EICAR الاختباري بدلاً من ذلك)؛",
              "محاولة تحميل الخدمة، أو الهندسة العكسية لها، أو استخلاص البيانات منها، أو إساءة استخدام حدود المعدل، أو التدخل بطريقة أخرى في تشغيل الخدمة أو توافرها؛",
              "التحايل على الحصص أو متطلبات الدفع أو أي قيود أخرى مفروضة؛",
              "إنشاء حسابات متعددة لتضخيم حصص الطبقة المجانية، أو مشاركة حساب عبر أكثر من فرد مما تسمح به خطتك."
            ]
          },
          {
            "kind": "p",
            "text": "يجوز لنا تعليق أو إنهاء حسابك فوراً ودون إشعار إذا كان لدينا أسباب معقولة للاعتقاد بأنك انتهكت هذا القسم، دون الحق في استرداد أي مبلغ."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. المحتوى الخاص بك",
        "blocks": [
          {
            "kind": "p",
            "text": "أنت تحتفظ بجميع الحقوق، واللقب، والمصلحة في الملفات والنصوص التي تقدمها إلى الخدمة. تمنحنا ترخيصاً محدوداً للغاية، ومجانياً، وعالمياً لمعالجتها حصرياً لتقديم الأداة التي طلبتها. ينتهي هذا الترخيص فوراً عند إرجاع النتيجة إليك (الأدوات التي تتطلب خادم) أو لا ينشأ على الإطلاق (الأدوات التي تعمل في المتصفح فقط، حيث لا تصل ملفاتك إلينا أبداً). نحن لا نطالب، ولن نطالب، بملكية محتواك، ولن نستخدمه لتدريب نماذج الذكاء الاصطناعي."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. الحسابات",
        "blocks": [
          {
            "kind": "p",
            "text": "يجب أن يكون عمرك ستة عشر (16) عاماً على الأقل لإنشاء حساب. أنت مسؤول عن الحفاظ على سرية بيانات الاعتماد الخاصة بك وعن أي نشاط يحدث تحت حسابك. أخبرنا فوراً عبر البريد الإلكتروني [security@konvertools.com](mailto:security@konvertools.com) بأي وصول غير مصرح به مشتبه به."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. الاشتراكات، الفوترة، والاسترداد",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**الخطط**: مجانية (0 يورو)، محترف (12 يورو/شهر أو 99 يورو/سنة)، أعمال (39 يورو/شهر أو 349 يورو/سنة). ميزات الخطط والحصص موضحة على [صفحة التسعير](/pricing) لدينا وقت الشراء. نحتفظ بحق تعديل ميزات الخطط مع إشعار مسبق مدته 30 يوماً.",
              "**التجديد التلقائي**: تتجدد الاشتراكات الشهرية والسنوية تلقائياً بنفس وتيرتها حتى يتم إلغاؤها. يمكنك إلغاء الاشتراك في أي وقت من لوحة التحكم الخاصة بك؛ يدخل الإلغاء حيز التنفيذ في نهاية فترة الفوترة الحالية. تحتفظ بالوصول حتى ذلك التاريخ.",
              "**حق الانسحاب (الاتحاد الأوروبي)**: بموجب المادة L. 221-28 من قانون الاستهلاك الفرنسي، عندما تستخدم الخدمة بنشاط خلال فترة الانسحاب الأولية البالغة 14 يوماً، فإنك توافق صراحة على تنفيذ العقد فوراً وتتنازل عن حقك في الانسحاب. إذا لم تستخدم أي ميزة مدفوعة، يمكنك الانسحاب خلال 14 يوماً عبر إرسال بريد إلكتروني إلى [billing@konvertools.com](mailto:billing@konvertools.com) وسنقوم برد المبلغ بالكامل خلال 14 يوماً.",
              "**عدم استرداد المبالغ الجزئية**: خارج سيناريو الانسحاب المذكور أعلاه، فإن الرسوم المدفوعة بالفعل للفترة الفواتيرية الحالية غير قابلة للاسترداد.",
              "**الائتمانات**: ائتمانات واجهة برمجة التطبيقات التي تم شراؤها كحزم لمرة واحدة (\"مبتدئ\"، \"نمو\"، \"توسع\"، \"استوديو\") **لا تنتهي صلاحيتها أبداً**. تنتهي صلاحية الـ 300 ائتمان التي تمنحها تلقائياً كل شهر لمشتركي خطة الأعمال في نهاية الشهر الميلادي **ولا يمكن استردادها**.",
              "**تغييرات الأسعار**: يجوز لنا تعديل الأسعار مع إشعار مسبق مدته 30 يوماً. يحتفظ المشتركون الحاليون بسعرهم الحالي حتى تاريخ تجديدهم التالي.",
              "**الضريبة**: تُعرض الأسعار بدون ضريبة القيمة المضافة حيثما ينطبق ذلك. يجمع Stripe أي ضريبة مستحقة في ولايتك القضائية ويسددها."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. واجهة برمجة التطبيقات العامة REST",
        "blocks": [
          {
            "kind": "p",
            "text": "تكشف خطة الأعمال عن واجهة برمجة تطبيقات عامة REST يتم المصادقة عليها بواسطة مفاتيح واجهة برمجة التطبيقات التي تولدها من لوحة التحكم الخاصة بك. يخضع استخدام واجهة برمجة التطبيقات أيضاً لـ:"
          },
          {
            "kind": "ul",
            "items": [
              "**حدود المعدل**: 60 طلباً في الدقيقة (زيادات خطة محترف) أو 120 طلباً في الدقيقة (خطة أعمال). قد يؤدي سوء الاستخدام المستمر إلى خنق مؤقت أو إلغاء دائم للمفتاح.",
              "**استهلاك الائتمان**: يخصم كل استدعاء لواجهة برمجة التطبيقات ائتمانات وفقاً للمعدلات المنشورة في [توثيق واجهة برمجة التطبيقات](/api) لدينا. لا يخصم الاستدعاءات الفاشلة (استجابات 5xx) ائتمانات.",
              "**أمان المفتاح**: أنت مسؤول عن تخزين مفاتيح واجهة برمجة التطبيقات الخاصة بك بشكل آمن وتدويرها إذا تم اختراقها. يجوز لنا إلغاء أي مفتاح في أي وقت إذا اشتبهنا في سوء الاستخدام.",
              "**الاستخدام المسموح به upstream**: يجب أن تتوافق التطبيقات المبنية على واجهة برمجة التطبيقات لدينا مع هذه الشروط، بما في ذلك قسم الاستخدام المقبول. يجب ألا تعرض مفاتيح واجهة برمجة التطبيقات لدينا للمستخدمين النهائيين (قم بترخيص خدمتك بدلاً من ذلك)."
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
            "text": "الاسم، والشعار، والكود، والتصميم، والتوثيق، وهيكل قاعدة البيانات والمحتوى المجمّع للخدمة هي ملكية حصرية للناشر وتحميها قوانين الملكية الفكرية الفرنسية والدولية. لا يُمنح لك أي ترخيص بخلاف ما هو ضروري تماماً لاستخدام الخدمة كما هو مقصود. لا يجوز لك استنساخ أو تعديل أو فك تشفير أو إنشاء أعمال مشتقة من الخدمة أو أي جزء منها، إلا إذا كان ذلك مسموحاً به صراحة بموجب القانون المعمول به."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. التعويض",
        "blocks": [
          {
            "kind": "p",
            "text": "أنت توافق على تعويض الناشر وحمايته من أي مطالبة أو خسارة أو ضرر أو مسؤولية أو تكلفة أو نفقات (بما في ذلك الرسوم القانونية المعقولة) تنشأ عن (أ) انتهاكك لهذه الشروط، (ب) انتهاكك لأي قانون أو حق طرف ثالث، أو (ج) أي محتوى قدمته إلى الخدمة."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. التغييرات في الشروط",
        "blocks": [
          {
            "kind": "p",
            "text": "يجوز لنا تعديل هذه الشروط من وقت لآخر. سيتم إشعار التغييرات الجوهرية عبر البريد الإلكتروني لحاملي الحسابات قبل ثلاثين (30) يوماً على الأقل من سريانها. من خلال مواصلة استخدام الخدمة بعد تلك الفترة، فإنك تقبل الشروط المعدلة. الإصدار الأحدث متاح دائماً على [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. الإنهاء",
        "blocks": [
          {
            "kind": "p",
            "text": "يجوز لك إنهاء حسابك في أي وقت من لوحة التحكم الخاصة بك. يجوز لنا إنهاء أو تعليق حسابك فوراً ودون إشعار إذا انتهكت هذه الشروط، أو أسأت استخدام الخدمة، أو فشلت في دفع اشتراك متكرر. عند الإنهاء، يتم حذف بياناتك خلال ثلاثين (30) يوماً، باستثناء سجلات الفوترة وسجلات الموافقة التي تحتفظ بها وفقاً لسياستنا الخاصة بالخصوصية."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. القانون الحاكم والاختصاص القضائي",
        "blocks": [
          {
            "kind": "p",
            "text": "تخضع هذه الشروط لقوانين فرنسا. يتم تقديم أي نزاع ينشأ عن هذه الشروط أو الخدمة إلى الاختصاص الحصري لمحاكم باريس، فرنسا، باستثناء الحقوق الإلزامية للمستهلك في بلد إقامتهم بموجب قانون الاتحاد الأوروبي أو القانون الوطني المعمول به. قبل بدء أي إجراء قانوني، соглашаетесь попытаться разрешить спор дружелюбно, написав на [legal@konvertools.com](mailto:legal@konvertools.com). يمكن للمستهلكين في الاتحاد الأوروبي أيضاً استخدام منصة حل النزاعات عبر الإنترنت التابعة للمفوضية الأوروبية على [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. بنود متنوعة",
        "blocks": [
          {
            "kind": "p",
            "text": "إذا تم اعتبار أي بند من هذه الشروط باطلاً أو غير قابل للتنفيذ، تظل البنود المتبقية سارية بالكامل. عدم قيامنا بإنفاذ أي حق أو بند لا يشكل تنازلاً عن ذلك الحق. تشكل هذه الشروط (إلى جانب سياسة الخصوصية وأي شروط محددة للخطة المشار إليها وقت الشراء) الاتفاقية الكاملة بينك وبين الناشر فيما يتعلق بالخدمة."
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
            "text": "Настоящие Условия обслуживания (далее — «Условия») представляют собой обязательное соглашение между вами (далее — «Пользователь») и издателем сервиса Konvertools (далее — «Издатель», «мы», «нас») в отношении вашего использования веб-сайта Konvertools и всех связанных инструментов, API и услуг (совокупно — «Сервис»). Создавая учётную запись, отмечая флажок принятия при регистрации или просто используя любой инструмент на Сервисе, вы подтверждаете, что ознакомились, поняли и полностью принимаете эти Условия, а также нашу Политику конфиденциальности."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Описание Сервиса",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools предоставляет каталог утилит для конвертации файлов, инструментов обработки документов и изображений, ИИ-инструментов для работы с текстом, а также инструментов безопасности (сканер вирусов, проверка электронной почты, детектор фишинга, сканер URL) и разработчика. Большинство инструментов работают полностью в вашем браузере; часть требует серверной обработки. Сервис предоставляется **«как есть»** и **«по мере возможности»** без каких-либо явных или подразумеваемых гарантий, включая пригодность для конкретных целей или отсутствие нарушений прав."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Ограничение ответственности — внимательно прочитайте",
        "blocks": [
          {
            "kind": "p",
            "text": "**В максимально допустимой законом степени Издатель снимает с себя ответственность за любой ущерб, возникший в результате использования или невозможности использования Сервиса.** В частности, вы признаёте и соглашаетесь с тем, что Издатель не несёт ответственности за:"
          },
          {
            "kind": "ul",
            "items": [
              "потерю данных, повреждённые или некорректные файлы, неудачные конвертации;",
              "решения, финансового, делового или иного характера, принятые вами на основе результатов работы любого инструмента;",
              "простои, задержки или временную недоступность функций;",
              "сбои сторонних сервисов (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, провайдеры хостинга);",
              "косвенные, случайные, особые, сопутствующие или штрафные убытки любого рода;",
              "любую совокупную сумму, превышающую плату, фактически уплаченную вами за последние двенадцать (12) месяцев до события, ставшего причиной претензии, с лимитом в сто (100) евро для пользователей бесплатного тарифа."
            ]
          },
          {
            "kind": "p",
            "text": "**Инструменты безопасности**: сканер вирусов, сканер URL, детектор фишинга и проверка электронной почты предоставляются **исключительно в информационных и ознакомительных целях**. Они агрегируют сторонние сигналы (движки антивирусов VirusTotal, Google Safe Browsing, публичные DNS) и эвристические модели на основе больших языковых моделей. Они **не гарантируют безопасности, подлинности или отсутствия риска**. Новое вредоносное ПО может оставаться незамеченным до обновления антивирусных движков; новые страницы фишинга появляются быстрее, чем базы репутации успевают их каталогизировать; электронное письмо, прошедшее проверку, может оказаться недействительным или мошенническим. Издатель прямо отказывается от любой ответственности за любой ущерб, возникший в результате вредоносного файла, который Сервис не распознал, фишингового письма, признанного безопасным, небезопасной ссылки, которую Сервис не идентифицировал, или транзакционного письма, отправленного на адрес, который Сервис пометил как действительный. Пользователь несет единоличную ответственность за принятие решений о безопасности на основе этих инструментов."
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
              "обработки файлов, на которые у вас нет необходимых прав (произведения, защищённые авторским правом, без разрешения, личные данные, к которым вы не имеете права доступа, засекреченная информация);",
              "совершения или содействия мошенничеству, отмыванию денег, финансированию терроризма или любой другой преступной деятельности;",
              "использования ИИ-гуманизатора, ИИ-инструментов для работы с текстом или любых других функций для плагиата, обмана третьих лиц, манипуляции системами оценки (академическими, рекрутинговыми, рекламными сетями) в нарушение их правил или для введения в заблуждение любым способом, противоречащим применимому законодательству;",
              "загрузки вредоносного ПО для тестирования сканера, если это нарушает закон в вашей юрисдикции (используйте тестовый файл EICAR);",
              "попыток перегрузить, reverse-engineer, scrapить, нарушить ограничения по скорости или иным образом вмешаться в работу или доступность Сервиса;",
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
            "text": "Вы сохраняете все права, титул и интерес в отношении файлов и текста, которые вы загружаете на Сервис. Вы предоставляете нам строго ограниченную, безвозмездную, мировую лицензию на их обработку исключительно для предоставления запрошенного вами инструмента. Эта лицензия прекращает своё действие в момент возврата результата вам (для инструментов с серверной обработкой) или не возникает вовсе (для инструментов, работающих только в браузере, так как ваш файл к нам не поступает). Мы не претендуем и не будем претендовать на право собственности на ваш контент и не используем его для обучения ИИ-моделей."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Учётные записи",
        "blocks": [
          {
            "kind": "p",
            "text": "Вам должно быть не менее шестнадцати (16) лет для создания учётной записи. Вы несёте ответственность за сохранность ваших учётных данных и за любую активность, происходящую под вашей учётной записью. Немедленно уведомьте нас о любом подозреваемом несанкционированном доступе по адресу [security@konvertools.com](mailto:security@konvertools.com)."
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
              "**Автоматическое продление**: ежемесячные и годовые подписки продлеваются автоматически в том же режиме до момента отмены. Вы можете отменить подписку в любой момент через личный кабинет; отмена вступает в силу в конце текущего расчётного периода. Вы сохраняете доступ до этой даты.",
              "**Право на отказ (ЕС)**: в соответствии со статьёй L. 221-28 Французского потребительского кодекса, если вы активно используете Сервис в течение первоначального 14-дневного периода отказа, вы прямо выражаете согласие на немедленное исполнение договора и отказываетесь от права на отказ. Если вы не использовали ни одну платную функцию, вы можете отказаться в течение 14 дней, отправив письмо на [billing@konvertools.com](mailto:billing@konvertools.com), и мы вернём вам полную сумму в течение 14 дней.",
              "**Возврат средств не частичный**: за пределами описанного выше сценария возврата, уплаченные за текущий расчётный период средства не подлежат возврату.",
              "**Кредиты**: приобретённые однократно пакеты API-кредитов («Starter», «Growth», «Scale», «Studio») **никогда не истекают**. 300 кредитов, ежемесячно предоставляемые подписчикам тарифа Business, истекают в конце календарного месяца и **не подлежат возврату**.",
              "**Изменение цен**: мы можем изменять цены с уведомлением за 30 дней. Действующие подписчики сохраняют текущую цену до следующей даты продления.",
              "**Налоги**: цены указаны без учёта НДС, где применимо. Stripe взимает и перечисляет любые налоги, подлежащие уплате в вашей юрисдикции."
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
            "text": "Тарифный план Business предоставляет доступ к публичному REST API, аутентифицируемому с помощью API-ключей, которые вы генерируете в личном кабинете. Использование API регулируется дополнительно следующими положениями:"
          },
          {
            "kind": "ul",
            "items": [
              "**Ограничения по скорости**: 60 запросов в минуту (дополнительные запросы для тарифа Pro) или 120 запросов в минуту (для тарифа Business). Постоянное нарушение может привести к временному ограничению скорости или постоянной блокировке ключа.",
              "**Списание кредитов**: каждый API-запрос списывает кредиты по тарифам, опубликованным в нашей [документации по API](/api). Неудачные запросы (ответы 5xx) не списывают кредиты.",
              "**Безопасность ключей**: вы несёте ответственность за безопасное хранение ваших API-ключей и их ротацию в случае компрометации. Мы можем заблокировать любой ключ в любой момент при подозрении на злоупотребление.",
              "**Допустимое использование вышестоящими сторонами**: приложения, построенные на основе нашего API, должны соответствовать настоящим Условиям, включая раздел о допустимом использовании. Вы не должны раскрывать наши API-ключи конечным пользователям (используйте вместо этого сублицензирование вашего сервиса)."
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
            "text": "Название, логотип, код, дизайн, документация, структура базы данных и агрегированный контент Сервиса являются исключительной собственностью Издателя и защищены французским и международным законодательством об интеллектуальной собственности. Вы не получаете никакой лицензии, кроме строго необходимой для использования Сервиса по назначению. Вы не вправе воспроизводить, изменять, декомпилировать или создавать производные работы на основе Сервиса или любой его части, кроме случаев, прямо разрешённых применимым законодательством."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Возмещение ущерба",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы соглашаетесь возмещать Издателю и ограждать его от любых претензий, убытков, ущерба, ответственности, затрат или расходов (включая разумные юридические сборы), возникших в результате (a) вашего нарушения настоящих Условий, (b) вашего нарушения закона или прав третьих лиц, или (c) любого контента, который вы загрузили на Сервис."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Изменение Условий",
        "blocks": [
          {
            "kind": "p",
            "text": "Мы можем время от времени изменять настоящие Условия. Существенные изменения будут доведены до сведения владельцев учётных записей по электронной почте не менее чем за тридцать (30) дней до вступления в силу. Продолжая использовать Сервис после этого периода, вы принимаете изменённые Условия. Последняя версия всегда доступна по адресу [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Прекращение действия",
        "blocks": [
          {
            "kind": "p",
            "text": "Вы можете в любой момент заблокировать свою учётную запись через личный кабинет. Мы можем немедленно приостановить или заблокировать вашу учётную запись без предварительного уведомления, если вы нарушили настоящие Условия, злоупотребили Сервисом или не оплатили текущую подписку. После прекращения действия ваши данные удаляются в течение тридцати (30) дней, за исключением платёжных записей и записей о согласии, которые хранятся в соответствии с нашей Политикой конфиденциальности."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Применимое право и подсудность",
        "blocks": [
          {
            "kind": "p",
            "text": "Настоящие Условия регулируются законодательством Франции. Любые споры, возникающие в связи с настоящими Условиями или Сервисом, подлежат рассмотрению в исключительной юрисдикции судов Парижа, Франция, за исключением случаев, когда обязательное право потребителя на обращение в суд в стране его проживания превалирует в соответствии с законодательством Европейского Союза или национальным законодательством. Прежде чем начинать судебное разбирательство, вы соглашаетесь попытаться урегулировать спор мирным путём, направив письмо на [legal@konvertools.com](mailto:legal@konvertools.com). Потребители из ЕС также могут воспользоваться платформой Европейской комиссии по онлайн-разрешению споров по адресу [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
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
            "text": "ये सेवा की शर्तें (इन्हें \"शर्तें\" कहा जाता है) आपके (उपयोगकर्ता) और Konvertools के प्रकाशक (प्रकाशक, \"हम\", \"हमें\") के बीच एक बाध्यकारी समझौता है, जो Konvertools वेबसाइट और उससे संबंधित सभी टूल, API और सेवाओं (सामूहिक रूप से \"सेवा\") के आपके उपयोग के संबंध में है। एक खाता बनाकर, साइनअप पर स्वीकृति बॉक्स पर टिक लगाकर, या सेवा पर किसी भी टूल का उपयोग करके, आप पुष्टि करते हैं कि आपने इन शर्तों को पूरी तरह से पढ़ लिया है, समझ लिया है और स्वीकार कर लिया है, साथ ही हमारी गोपनीयता नीति को भी।"
          }
        ]
      },
      {
        "id": "service",
        "title": "2. सेवा",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools फाइल रूपांतरण उपयोगिताओं, दस्तावेज़ और छवि प्रसंस्करण टूल, AI-सहायता प्राप्त टेक्स्ट उपयोगिताओं, संकेतक सुरक्षा टूल (वायरस स्कैनर, ईमेल सत्यापनकर्ता, फ़िशिंग डिटेक्टर, URL स्कैनर) और डेवलपर उपयोगिताओं का एक कैटलॉग प्रदान करता है। अधिकांश टूल पूरी तरह से आपके ब्राउज़र में निष्पादित होते हैं; कुछ को सर्वर प्रसंस्करण की आवश्यकता होती है। सेवा **\"जैसी है\" और \"जैसा उपलब्ध है\"** के आधार पर प्रदान की जाती है, बिना किसी प्रकार की वारंटी के, चाहे वह व्यक्त या निहित हो, जिसमें व्यापारिकता, विशेष उद्देश्य के लिए उपयुक्तता, या उल्लंघन न होना शामिल है।"
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. देयता की सीमा — ध्यानपूर्वक पढ़ें",
        "blocks": [
          {
            "kind": "p",
            "text": "**जहां तक कानून द्वारा अनुमति दी गई है, प्रकाशक सेवा के आपके उपयोग या उपयोग में असमर्थता से उत्पन्न होने वाले किसी भी प्रकार के नुकसान के लिए देयता को अस्वीकार करता है।** विशेष रूप से, आप स्वीकार करते हैं और सहमत हैं कि प्रकाशक उत्तरदायी नहीं होगा:"
          },
          {
            "kind": "ul",
            "items": [
              "डेटा हानि, दूषित या गलत फ़ाइलें, या असफल रूपांतरण;",
              "आपके द्वारा किसी भी टूल के आउटपुट के आधार पर लिए गए निर्णय, वित्तीय, व्यावसायिक या अन्यथा;",
              "डाउनटाइम, विलंबता, या किसी भी सुविधा की अस्थायी अनुपलब्धता;",
              "तृतीय-पक्ष सेवा विफलताएं (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, होस्टिंग प्रदाता);",
              "अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक नुकसान किसी भी प्रकार के;",
              "घटना के कारण दावे के लिए पूर्ववर्ती बारह (12) महीनों में आपने वास्तव में जो शुल्क भुगतान किया है, उससे अधिक राशि, मुफ्त-स्तरीय उपयोगकर्ताओं के लिए एक सौ (100) यूरो तक सीमित।"
            ]
          },
          {
            "kind": "p",
            "text": "**सुरक्षा टूल**: वायरस स्कैनर, URL स्कैनर, फ़िशिंग डिटेक्टर और ईमेल सत्यापनकर्ता केवल **सूचनात्मक और संकेतक उद्देश्यों** के लिए प्रदान किए गए हैं। वे तृतीय-पक्ष संकेतों (VirusTotal के 70+ एंटीवायरस इंजन, Google Safe Browsing, सार्वजनिक DNS) और बड़े भाषा-मॉडल अनुमान एकत्र करते हैं। वे **सुरक्षा, वैधता या जोखिम की अनुपस्थिति की गारंटी नहीं बनाते हैं**। नया मालवेयर तब तक पहचान से बच सकता है जब तक एंटीवायरस इंजन अपडेट नहीं होते; नए फ़िशिंग पेज प्रतिष्ठा डेटाबेस की तुलना में तेजी से दिखाई देते हैं; एक ईमेल जो हमारे जांच पास कर लेता है, फिर भी निष्क्रिय या धोखाधड़ी वाला हो सकता है। प्रकाशक इन टूल के आधार पर लिए गए सुरक्षा निर्णयों से उत्पन्न होने वाले किसी भी नुकसान के लिए स्पष्ट रूप से देयता अस्वीकार करता है। उपयोगकर्ता इन टूल के आधार पर लिए गए सुरक्षा निर्णयों के लिए पूरी तरह से उत्तरदायी है।"
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
              "ऐसे फ़ाइलों को संसाधित करना जिनके आपके पास आवश्यक अधिकार नहीं हैं (अनधिकृत कॉपीराइटेड कार्य, व्यक्तिगत डेटा जिसे आप संसाधित करने के अधिकारी नहीं हैं, वर्गीकृत जानकारी);",
              "धोखाधड़ी, मनी लॉन्ड्रिंग, आतंकवाद के वित्तपोषण या किसी भी आपराधिक गतिविधि को सुविधाजनक बनाना;",
              "AI मानवीकरण, AI टेक्स्ट टूल या किसी अन्य सुविधा का उपयोग करके साहित्यिक चोरी करना, किसी तीसरे पक्ष को धोखा देना, मूल्यांकन प्रणाली (शैक्षणिक, भर्ती, विज्ञापन नेटवर्क) को हेरफेर करना जो उनके नियमों का उल्लंघन करता है, या लागू कानून का उल्लंघन करने वाले तरीके से धोखा देना;",
              "हमारे स्कैनर का परीक्षण करने के लिए मालवेयर अपलोड करना यदि ऐसा करना आपके अधिकार क्षेत्र में कानून का उल्लंघन करता है (EICAR परीक्षण फ़ाइल का उपयोग करें);",
              "सेवा के संचालन या उपलब्धता में हस्तक्षेप करने के लिए ओवरलोड, रिवर्स-इंजीनियरिंग, स्क्रैपिंग, दर सीमा का दुरुपयोग करने का प्रयास करना, या अन्यथा हस्तक्षेप करना;",
              "कोटा, भुगतान आवश्यकताओं या लागू प्रतिबंधों को दरकिनार करना;",
              "मुक्त-स्तरीय कोटा को गुणा करने के लिए एकाधिक खाते बनाना, या अपने प्लान द्वारा अनुमत व्यक्तियों से अधिक व्यक्तियों के बीच एक खाता साझा करना।"
            ]
          },
          {
            "kind": "p",
            "text": "यदि हमें उचित आधार मिलते हैं कि आपने इस अनुभाग का उल्लंघन किया है, तो हम आपके खाते को तुरंत और बिना सूचना के निलंबित या समाप्त कर सकते हैं, बिना किसी प्रकार के धनवापसी के अधिकार के।"
          }
        ]
      },
      {
        "id": "content",
        "title": "5. आपकी सामग्री",
        "blocks": [
          {
            "kind": "p",
            "text": "आप सेवा में सबमिट किए गए फ़ाइलों और टेक्स्ट में सभी अधिकार, शीर्षक और हित बरकरार रखते हैं। आप हमें केवल वह टूल प्रदान करने के लिए आवश्यक एक सख्त रूप से सीमित, रॉयल्टी-मुक्त, वैश्विक लाइसेंस प्रदान करते हैं। यह लाइसेंस तुरंत समाप्त हो जाता है जब परिणाम आपको वापस कर दिया जाता है (सर्वर-सहायता प्राप्त टूल) या कभी अस्तित्व में नहीं आता (ब्राउज़र-केवल टूल, क्योंकि आपकी फ़ाइल कभी हमारे पास नहीं पहुंचती)। हम आपके कंटेंट का स्वामित्व नहीं लेते हैं और न ही इसे AI मॉडल को प्रशिक्षित करने के लिए उपयोग करेंगे।"
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
        "title": "7. सदस्यता, बिलिंग और धनवापसी",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**योजनाएं**: मुफ्त (€0), प्रो (€12/माह या €99/वर्ष), बिजनेस (€39/माह या €349/वर्ष)। योजना सुविधाएं और कोटा हमारे [मूल्य निर्धारण पृष्ठ](/pricing) पर खरीद के समय वर्णित हैं। हमारे पास 30 दिनों के नोटिस के साथ योजना सुविधाओं में संशोधन करने का अधिकार सुरक्षित है।",
              "**स्वतः नवीनीकरण**: मासिक और वार्षिक सदस्यताएं स्वचालित रूप से उसी आवृत्ति पर नवीनीकृत होती हैं जब तक रद्द नहीं की जाती। आप अपने डैशबोर्ड से कभी भी रद्द कर सकते हैं; रद्द करने का प्रभाव वर्तमान बिलिंग अवधि के अंत में होता है। आप उस तिथि तक पहुंच बरकरार रखते हैं।",
              "**वापसी का अधिकार (ईयू)**: फ्रेंच उपभोक्ता संहिता के अनुच्छेद L. 221-28 के तहत, जब आप प्रारंभिक 14-दिवसीय वापसी अवधि के दौरान सक्रिय रूप से सेवा का उपयोग करते हैं, तो आप स्पष्ट रूप से अनुबंध के तत्काल निष्पादन के लिए सहमति देते हैं और अपनी वापसी के अधिकार को त्याग देते हैं। यदि आपने किसी भुगतान सुविधा का उपयोग नहीं किया है, तो आप 14 दिनों के भीतर [billing@konvertools.com](mailto:billing@konvertools.com) को ईमेल करके वापसी कर सकते हैं और हम 14 दिनों के भीतर पूर्ण धनवापसी जारी करेंगे।",
              "**आंशिक धनवापसी नहीं**: ऊपर वर्णित वापसी परिदृश्य के अलावा, वर्तमान बिलिंग अवधि के लिए पहले से भुगतान किए गए शुल्क गैर-वापसी योग्य हैं।",
              "**क्रेडिट**: एक बार के पैक (\"स्टार्टर\", \"ग्रोथ\", \"स्केल\", \"स्टूडियो\") के रूप में खरीदे गए API क्रेडिट **कभी समाप्त नहीं होते**। बिजनेस ग्राहकों को प्रत्येक माह स्वचालित रूप से प्रदान किए जाने वाले 300 क्रेडिट कैलेंडर माह के अंत में समाप्त हो जाते हैं और **गैर-वापसी योग्य** हैं।",
              "**मूल्य परिवर्तन**: हम 30 दिनों के नोटिस के साथ मूल्यों में संशोधन कर सकते हैं। मौजूदा ग्राहक अपनी अगली नवीनीकरण तिथि तक अपनी वर्तमान कीमत बरकरार रखते हैं।",
              "**कर**: मूल्य प्रदर्शित किए गए हैं जहां लागू हो कर को छोड़कर। Stripe आपके अधिकार क्षेत्र में देय किसी भी कर को एकत्र और प्रेषित करता है।"
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
              "**दर सीमाएं**: 60 अनुरोध प्रति मिनट (प्रो अतिरिक्त) या 120 अनुरोध प्रति मिनट (बिजनेस)। निरंतर दुरुपयोग के परिणामस्वरूप अस्थायी थ्रॉटलिंग या स्थायी कुंजी निरस्तीकरण हो सकता है।",
              "**क्रेडिट खपत**: प्रत्येक API कॉल हमारे [API दस्तावेज़](/api) में प्रकाशित दरों पर क्रेडिट काटता है। विफल कॉल (5xx प्रतिक्रियाएं) क्रेडिट नहीं काटते।",
              "**कुंजी सुरक्षा**: आप अपने API कुंजियों को सुरक्षित रूप से संग्रहीत करने और यदि समझौता किया गया हो तो उन्हें बदलने के लिए उत्तरदायी हैं। हम किसी भी कुंजी को किसी भी समय निरस्त कर सकते हैं यदि हमें दुरुपयोग का संदेह हो।",
              "**स्वीकार्य अपस्ट्रीम उपयोग**: हमारे API पर निर्मित एप्लिकेशन को इन शर्तों का पालन करना चाहिए, जिसमें स्वीकार्य-उपयोग अनुभाग शामिल है। आपको अपने API कुंजियों को अंतिम उपयोगकर्ताओं को उजागर नहीं करना चाहिए (अपनी सेवा को उप-लाइसेंस दें)।"
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
            "text": "सेवा का नाम, लोगो, कोड, डिजाइन, दस्तावेज़, डेटाबेस संरचना और एकत्रित सामग्री प्रकाशक की विशेष संपत्ति है और फ्रेंच और अंतर्राष्ट्रीय बौद्धिक-संपदा कानून द्वारा संरक्षित है। आपको सेवा के उपयोग के लिए आवश्यक से अधिक कोई लाइसेंस प्रदान नहीं किया जाता है। आप सेवा या उसके किसी भी हिस्से को पुनरुत्पादित, संशोधित, डी-कंपाइल या व्युत्पन्न कार्य बनाने के लिए नहीं कर सकते, सिवाय इसके कि जहां लागू कानून द्वारा स्पष्ट रूप से अनुमति दी गई हो।"
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. क्षतिपूर्ति",
        "blocks": [
          {
            "kind": "p",
            "text": "आप इन शर्तों के अपने उल्लंघन से उत्पन्न होने वाले किसी भी दावे, हानि, क्षति, देयता, लागत या व्यय (उचित कानूनी शुल्क सहित) के लिए प्रकाशक को क्षतिपूर्ति करने और उसे हानिरहित रखने के लिए सहमत हैं, (a) आपके द्वारा इन शर्तों का उल्लंघन, (b) कानून या किसी तीसरे पक्ष के अधिकार का उल्लंघन, या (c) आप द्वारा सेवा में सबमिट की गई कोई भी सामग्री।"
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. शर्तों में परिवर्तन",
        "blocks": [
          {
            "kind": "p",
            "text": "हम इन शर्तों में समय-समय पर संशोधन कर सकते हैं। महत्वपूर्ण परिवर्तन खाता धारकों को प्रभावी होने से कम से कम तीस (30) दिन पहले ईमेल द्वारा सूचित किए जाएंगे। उस अवधि के बाद सेवा का उपयोग करना जारी रखने से आप संशोधित शर्तों को स्वीकार करते हैं। नवीनतम संस्करण हमेशा [https://konvertools.com/terms](https://konvertools.com/terms) पर उपलब्ध है।"
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. समाप्ति",
        "blocks": [
          {
            "kind": "p",
            "text": "आप अपने डैशबोर्ड से कभी भी अपना खाता समाप्त कर सकते हैं। यदि आप इन शर्तों का उल्लंघन करते हैं, सेवा का दुरुपयोग करते हैं, या आवर्ती सदस्यता का भुगतान करने में विफल रहते हैं, तो हम आपके खाते को तुरंत और बिना सूचना के समाप्त या निलंबित कर सकते हैं। समाप्ति पर आपका डेटा तीस (30) दिनों के भीतर हटा दिया जाता है, सिवाय बिलिंग रिकॉर्ड और सहमति रिकॉर्ड के जिन्हें हमारी गोपनीयता नीति के अनुसार बरकरार रखा जाता है।"
          }
        ]
      },
      {
        "id": "law",
        "title": "13. शासी कानून और अधिकार क्षेत्र",
        "blocks": [
          {
            "kind": "p",
            "text": "ये शर्तें फ्रांस के कानूनों द्वारा शासित हैं। इन शर्तों या सेवा से उत्पन्न होने वाले किसी भी विवाद को फ्रांस के पेरिस के न्यायालयों के विशेष अधिकार क्षेत्र में प्रस्तुत किया जाएगा, सिवाय जहां यूरोपीय संघ या लागू राष्ट्रीय कानून के तहत उपभोक्ता के निवास देश में अनिवार्य कार्रवाई के अधिकार का प्रावधान है। कानूनी कार्रवाई शुरू करने से पहले, आप [legal@konvertools.com](mailto:legal@konvertools.com) को लिखकर विवाद को सौहार्दपूर्ण ढंग से हल करने का प्रयास करने के लिए सहमत हैं। ईयू उपभोक्ता [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) पर यूरोपीय आयोग के ऑनलाइन विवाद समाधान मंच का भी उपयोग कर सकते हैं।"
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. विविध",
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
            "text": "Bu Hizmet Şartları (\"Şartlar\"), siz (\"Kullanıcı\") ile Konvertools'un yayıncısı (\"Yayımcı\", \"biz\", \"bizim\") arasında, Konvertools web sitesi ve tüm ilgili araçlar, API'ler ve hizmetler (birlikte \"Hizmet\" olarak anılır) kullanımınızla ilgili olarak yapılan bağlayıcı bir anlaşmadır. Bir hesap oluşturduğunuzda, kayıt sırasında kabul onay kutusunu işaretlediğinizde veya Hizmet'teki herhangi bir aracı kullandığınızda, bu Şartları tamamen okuduğunuzu, anladığınızı ve kabul ettiğinizi, ayrıca Gizlilik Politikamızla birlikte doğruladığınızı teyit etmiş olursunuz."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Hizmet",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools, dosya dönüştürme yardımcı programları, belge ve görüntü işleme araçları, AI destekli metin araçları, gösterge niteliğindeki güvenlik araçları (virüs tarayıcı, e-posta doğrulayıcı, phishing tespit aracı, URL tarayıcı) ve geliştirici araçları olmak üzere bir katalog sunmaktadır. Araçların çoğu tamamen tarayıcınızda çalışır; bazıları sunucu işlemesi gerektirir. Hizmet, **\"olduğu gibi\"** ve **\"mevcut olduğu gibi\"** sunulmaktadır ve herhangi bir türde açık veya zımni garanti, ticari uygunluk, belirli bir amaca uygunluk veya ihlal etmeme dahil olmak üzere herhangi bir garanti verilmez."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Sorumluluk sınırlaması — dikkatlice okuyun",
        "blocks": [
          {
            "kind": "p",
            "text": "**Yasal olarak izin verilen maksimum ölçüde, Yayımcı, Hizmet'in kullanımından veya kullanamamanızdan kaynaklanan herhangi bir türdeki zararlar için herhangi bir sorumluluk kabul etmez.** Özellikle, aşağıdakilerden kaynaklanan zararlar için Yayımcı'nın sorumlu olmayacağını kabul ve taahhüt edersiniz:"
          },
          {
            "kind": "ul",
            "items": [
              "veri kaybı, bozulmuş veya yanlış dosyalar veya başarısız dönüşümler;",
              "araç çıktısına dayanarak aldığınız kararlar, finansal, ticari veya diğer türden kararlar dahil;",
              "herhangi bir özelliğin çalışmama süresi, gecikme veya geçici olarak kullanılamaması;",
              "üçüncü taraf hizmet arızaları (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, barındırma sağlayıcıları);",
              "dolaylı, rastlantısal, özel, sonuçsal veya cezai zararlar dahil olmak üzere herhangi bir türdeki zararlar;",
              "olayın meydana geldiği tarihten önceki on iki (12) ay boyunca bize ödediğiniz ücretlerin toplam tutarı, ücretsiz kullanıcı kategorisindekiler için yüz (100) avro olmak üzere, aşan herhangi bir miktar."
            ]
          },
          {
            "kind": "p",
            "text": "**Güvenlik araçları**: Virüs Tarayıcı, URL Tarayıcı, Phishing Tespit Aracı ve E-posta Doğrulayıcı yalnızca **bilgi verme ve gösterge niteliğinde** amaçlarla sunulmaktadır. Üçüncü taraf sinyallerini (VirusTotal'ın 70'den fazla antivirüs motoru, Google Güvenli Tarama, genel DNS) ve büyük dil modeli sezgilerini birleştirirler. Bunlar **güvenlik, geçerlilik veya risk bulunmaması garantisi oluşturmaz**. Yeni kötü amaçlı yazılımlar antivirüs motorları güncellenene kadar tespit edilemeyebilir; yeni phishing sayfaları itibar veritabanlarının kataloglamasından daha hızlı ortaya çıkabilir; Hizmetimizin kontrollerinden geçen bir e-posta hala sahte olabilir. Yayımcı, Hizmet'in işaretlemediği kötü amaçlı bir dosya, Hizmet'in güvenli olduğunu değerlendirdiği bir phishing e-postası, Hizmet'in tanımlayamadığı güvensiz bir bağlantı veya Hizmet'in geçerli olduğunu işaretlediği bir adrese gönderilen işlem e-postası nedeniyle oluşan herhangi bir zarar için açıkça sorumluluk kabul etmemektedir. Kullanıcı, bu araçlara dayanarak alınan güvenlik kararlarından tek başına sorumludur."
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
              "bulunduğunuz yargı bölgesinde veya Fransa'da yasa dışı olan içerikleri yüklemek, işlemek veya dağıtmak;",
              "gerekli haklara sahip olmadığınız dosyaları işlemek (yetkisiz telif hakkı eserleri, işleme hakkına sahip olmadığınız kişisel veriler, gizli bilgiler);",
              "dolandırıcılık, kara para aklama, terörizmin finansmanı veya herhangi bir suç faaliyeti gerçekleştirmek veya kolaylaştırmak;",
              "AI insanlaştırıcıyı, AI metin araçlarını veya diğer herhangi bir özelliği intihal yapmak, üçüncü bir tarafı aldatmak, akademik, işe alım, reklam ağları gibi değerlendirme sistemlerini onların kurallarına aykırı şekilde manipüle etmek veya uygulanabilir yasanın ihlaline yol açacak şekilde yanıltmak için kullanmak;",
              "EICAR test dosyasını kullanmak yerine tarayıcımızı test etmek amacıyla yasa dışı olabilecek şekilde kötü amaçlı yazılım yüklemek;",
              "Hizmet'in çalışmasını veya kullanılabilirliğini engellemek, tersine mühendislik uygulamak, kazımak, hız sınırlarını kötüye kullanmak veya müdahale etmek için girişimde bulunmak;",
              "kotaları, ödeme gerekliliklerini veya mevcut diğer kısıtlamaları aşmaya çalışmak;",
              "ücretsiz kullanıcı kotasını çoğaltmak için birden fazla hesap oluşturmak veya hesabınızı planınızın izin verdiğinden daha fazla kişi arasında paylaşmak."
            ]
          },
          {
            "kind": "p",
            "text": "Bu bölümün ihlal edildiğine dair makul gerekçelerimiz olması durumunda hesabınızı derhal ve önceden bildirimde bulunmaksızın askıya alabilir veya sonlandırabiliriz; herhangi bir türde geri ödeme hakkına sahip olmayacaksınız."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. İçeriğiniz",
        "blocks": [
          {
            "kind": "p",
            "text": "Hizmet'e gönderdiğiniz dosya ve metinlerin tüm haklarına, unvanına ve çıkarına siz sahip olursunuz. Size yalnızca talep ettiğiniz aracı sunmak amacıyla işlemek üzere, sınırlı, ücretsiz, dünya çapında bir lisans size verirsiniz. Bu lisans, sonuç size iade edildiğinde (sunucu destekli araçlar) anında sona erer veya hiç oluşmaz (tarayıcıda yalnızca araçlar, çünkü dosyanız bize ulaşmaz). İçeriğinizin sahibi olmadığımız gibi AI modellerini eğitmek için kullanmayız ve kullanmayacağız."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Hesaplar",
        "blocks": [
          {
            "kind": "p",
            "text": "Hesap oluşturmak için en az on altı (16) yaşında olmalısınız. Kimlik bilgilerinizi gizli tutmaktan ve hesabınız altında gerçekleşen herhangi bir faaliyetten siz sorumlusunuz. Herhangi bir yetkisiz erişim şüphesi durumunda derhal [security@konvertools.com](mailto:security@konvertools.com) adresinden bizi bilgilendirin."
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
              "**Planlar**: Ücretsiz (€0), Pro (€12/ay veya €99/yıl), İş (€39/ay veya €349/yıl). Plan özellikleri ve kotaları, satın alma sırasında [Fiyatlandırma sayfamızda](/pricing) açıklandığı gibidir. Plan özelliklerinde 30 günlük önceden bildirimle değişiklik yapma hakkımız saklıdır.",
              "**Otomatik yenileme**: Aylık ve yıllık abonelikler, iptal edilene kadar aynı sıklıkta otomatik olarak yenilenir. Hesabınızdan herhangi bir zamanda iptal edebilirsiniz; iptal, cari faturalandırma döneminin sonunda geçerli olur. O tarihe kadar erişiminizi korursunuz.",
              "**İptal hakkı (AB)**: Fransız Tüketici Kanunu'nun L. 221-28. maddesi uyarınca, ilk 14 günlük iptal süresi içinde Hizmet'i aktif olarak kullanmanız durumunda sözleşmenin hemen yerine getirilmesine açıkça rıza gösterir ve iptal hakkından feragat edersiniz. Ücretli bir özelliği kullanmadıysanız, [billing@konvertools.com](mailto:billing@konvertools.com) adresine e-posta göndererek 14 gün içinde iptal edebilir ve 14 gün içinde tam iade yaparız.",
              "**Kısmi iadeler yoktur**: yukarıdaki iptal senaryosu dışında, cari faturalandırma dönemine ait ücretler iade edilemez.",
              "**Krediler**: Tek seferlik paketler olarak satın alınan API kredileri (\"Başlangıç\", \"Büyüme\", \"Ölçek\", \"Stüdyo\") **süresiz olarak geçerlidir**. İş planı abonelerine her ay otomatik olarak verilen 300 kredi, takvim ayının sonunda sona erer ve **iade edilemez**.",
              "**Fiyat değişiklikleri**: 30 günlük önceden bildirimle fiyatları değiştirebiliriz. Mevcut aboneler, bir sonraki yenileme tarihlerine kadar mevcut fiyatlarını korurlar.",
              "**Vergi**: Fiyatlar, uygulanabilir olduğu yerlerde KDV hariç gösterilir. Stripe, bulunduğunuz yargı bölgesinde geçerli olan herhangi bir vergiyi toplar ve öder."
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
            "text": "İş planı, kontrol panelinizden oluşturduğunuz API anahtarlarıyla kimlik doğrulanan genel bir REST API sunar. API kullanımı ayrıca aşağıdakilerle de düzenlenir:"
          },
          {
            "kind": "ul",
            "items": [
              "**Hız sınırları**: Dakikada 60 istek (Pro eklemeleri) veya dakikada 120 istek (İş). Sürekli kötüye kullanım, geçici olarak sınırlama veya kalıcı anahtar iptaline yol açabilir.",
              "**Kredi tüketimi**: Her API çağrısı, [API belgelerimizde](/api) yayınlanan oranlarda kredileri düşürür. Başarısız çağrılar (5xx yanıtları) kredileri düşürmez.",
              "**Anahtar güvenliği**: API anahtarlarınızı güvenli bir şekilde saklamaktan ve şüpheli durumlarda değiştirmekten siz sorumlusunuz. Suistimal şüphesi durumunda herhangi bir anahtarı herhangi bir zamanda iptal edebiliriz.",
              "**Yukarı akış kullanımı**: API'miz üzerine kurulu uygulamaların, kabul edilebilir kullanım bölümünü de içeren bu Şartlara uyması gerekir. API anahtarlarımızı son kullanıcılara maruz bırakmayın (hizmetinizi lisanslayın yerine)."
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
            "text": "Hizmet'in adı, logosu, kodu, tasarımı, belgeleri, veritabanı yapısı ve toplanmış içeriği Yayımcı'nın münhasır mülkiyetindedir ve Fransız ve uluslararası fikri mülkiyet hukuku tarafından korunmaktadır. Size yalnızca Hizmet'i amaçlandığı şekilde kullanmanız için gerekli olanın ötesinde herhangi bir lisans verilmemektedir. Uygulanabilir yasanın açıkça izin vermediği durumlar hariç, Hizmet'in veya herhangi bir bölümünün kopyalanmasına, değiştirilmesine, tersine mühendislik yapılmasına veya türev çalışmalar yapılmasına izin verilmez."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Tazminat",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Şartların ihlali, herhangi bir yasanın veya üçüncü taraf hakkının ihlali veya Hizmet'e gönderdiğiniz herhangi bir içeriğiniz nedeniyle ortaya çıkan herhangi bir talep, kayıp, zarar, sorumluluk, maliyet veya giderden (makul avukatlık ücretleri dahil) Yayımcı'nın zarar görmeyeceğini ve Yayımcı'nın zararsız bırakılacağını kabul edersiniz."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Şartlardaki değişiklikler",
        "blocks": [
          {
            "kind": "p",
            "text": "Şartlarımızı zaman zaman değiştirebiliriz. Önemli değişiklikler, etkili olmalarından en az otuz (30) gün önce hesap sahiplerine e-posta yoluyla bildirilecektir. Bu süre geçtikten sonra Hizmet'i kullanmaya devam etmeniz, değiştirilmiş Şartları kabul etmiş sayılırsınız. En son versiyon her zaman [https://konvertools.com/terms](https://konvertools.com/terms) adresinde mevcuttur."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Sözleşmenin sona ermesi",
        "blocks": [
          {
            "kind": "p",
            "text": "Hesabınızı herhangi bir zamanda kontrol panelinizden sonlandırabilirsiniz. Şartları ihlal etmeniz, Hizmet'i kötüye kullanmanız veya yinelenen bir aboneliği ödememeniz durumunda hesabınızı derhal ve önceden bildirimde bulunmaksızın sonlandırabilir veya askıya alabiliriz. Sözleşmenin sona ermesinden sonra verileriniz, Gizlilik Politikamızda açıklanan şekilde fatura kayıtları ve rıza kayıtları hariç olmak üzere otuz (30) gün içinde silinir."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Yürürlük hukuku ve yargı yetkisi",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Şartlar Fransa hukukuna tabidir. Bu Şartlardan veya Hizmet'ten kaynaklanan veya bağlantılı olan herhangi bir anlaşmazlık, Avrupa Birliği veya uygulanabilir ulusal hukuk altında tüketicinin ikametgah ülkesindeki zorunlu dava hakkı geçerli olmadıkça, Paris mahkemelerinin münhasır yargı yetkisine tabi olacaktır. Hukuki işlem başlatmadan önce, [legal@konvertools.com](mailto:legal@konvertools.com) adresine yazarak anlaşmazlığı dostane şekilde çözmeyi kabul edersiniz. AB tüketicileri ayrıca anlaşmazlıklarını [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr) adresindeki Avrupa Komisyonu'nun Çevrimiçi Anlaşmazlık Çözümü platformunu da kullanabilir."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Çeşitli hükümler",
        "blocks": [
          {
            "kind": "p",
            "text": "Bu Şartların herhangi bir hükmü geçersiz veya uygulanamaz bulunursa, kalan hükümler tamamen yürürlükte kalır. Herhangi bir hakkın veya hükmün uygulanmaması, o hakkın feragat edildiği anlamına gelmez. Bu Şartlar (Gizlilik Politikası ve satın alma sırasında referans verilen plan spesifik hükümleriyle birlikte) siz ve Yayımcı arasındaki Hizmet'e ilişkin tüm anlaşmayı oluşturur."
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
            "text": "Ketentuan Layanan ini (\"Ketentuan\") membentuk perjanjian yang mengikat antara Anda (\"Pengguna\") dan penerbit Konvertools (\"Penerbit\", \"kami\", \"kami\") terkait penggunaan situs web Konvertools serta semua alat, API, dan layanan terkait (secara kolektif disebut \"Layanan\"). Dengan membuat akun, mencentang kotak penerimaan saat pendaftaran, atau hanya dengan menggunakan alat apa pun di Layanan, Anda menyatakan telah membaca, memahami, dan menerima Ketentuan ini secara keseluruhan, bersama dengan Kebijakan Privasi kami."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Layanan",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools menyediakan katalog utilitas konversi berkas, alat pemrosesan dokumen dan gambar, utilitas teks berbantuan AI, alat keamanan indikatif (pemindai virus, verifikator email, pendeteksi phishing, pemindai URL), serta utilitas pengembang. Sebagian besar alat berjalan sepenuhnya di peramban Anda; beberapa memerlukan pemrosesan server. Layanan disediakan **\"apa adanya\" dan \"tersedia apa adanya\"** tanpa jaminan apa pun, baik secara tegas maupun tersirat, termasuk tetapi tidak terbatas pada kelayakan dagang, kesesuaian untuk tujuan tertentu, atau tidak melanggar hak cipta."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Pembatasan tanggung jawab — baca dengan seksama",
        "blocks": [
          {
            "kind": "p",
            "text": "**Sejauh yang diizinkan oleh hukum, Penerbit menolak segala tanggung jawab atas kerugian apa pun yang timbul dari penggunaan atau ketidakmampuan Anda untuk menggunakan Layanan.** Secara khusus, Anda menyatakan dan menyetujui bahwa Penerbit tidak akan bertanggung jawab atas:"
          },
          {
            "kind": "ul",
            "items": [
              "kehilangan data, berkas yang rusak atau tidak benar, atau konversi yang gagal;",
              "keputusan, baik keuangan, bisnis, maupun lainnya, yang Anda ambil berdasarkan keluaran dari alat apa pun;",
              "waktu henti, latensi, atau ketidaktersediaan sementara fitur apa pun;",
              "kegagalan layanan pihak ketiga (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, penyedia hosting);",
              "kerugian tidak langsung, insidental, khusus, konsekuensial, ataupun hukuman apa pun;",
              "jumlah agregat yang melebihi biaya yang benar-benar Anda bayarkan kepada kami dalam dua belas (12) bulan sebelum kejadian yang menimbulkan klaim, dengan batas seratus (100) euro untuk pengguna tingkat gratis."
            ]
          },
          {
            "kind": "p",
            "text": "**Alat keamanan**: Pemindai Virus, Pemindai URL, Pendeteksi Phishing, dan Verifikator Email disediakan **hanya untuk tujuan informatif dan indikatif**. Alat-alat ini mengumpulkan sinyal dari pihak ketiga (70+ mesin antivirus VirusTotal, Google Safe Browsing, DNS publik) serta heuristik model bahasa besar. Alat-alat ini **bukan merupakan jaminan keamanan, validitas, atau ketidakberisikoan**. Malware baru dapat menghindari deteksi hingga mesin antivirus diperbarui; halaman phishing baru muncul lebih cepat daripada basis data reputasi dapat mengkatalognya; email yang lolos pemeriksaan kami mungkin masih bersifat inaktif atau penipuan. Penerbit secara tegas menolak segala tanggung jawab atas kerugian apa pun yang timbul akibat berkas jahat yang tidak terdeteksi Layanan, email phishing yang dianggap aman oleh Layanan, tautan tidak aman yang gagal diidentifikasi Layanan, atau email transaksional yang dikirim ke alamat yang ditandai Layanan sebagai valid. Pengguna bertanggung jawab penuh atas keputusan keamanan yang diambil berdasarkan alat-alat ini."
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
              "memproses berkas yang tidak memiliki hak yang diperlukan (karya berhak cipta tanpa izin, data pribadi yang tidak Anda izinkan untuk diproses, informasi rahasia);",
              "melakukan atau memfasilitasi penipuan, pencucian uang, pendanaan terorisme, atau aktivitas kriminal lainnya;",
              "menggunakan humanizer AI, alat teks AI, atau fitur lainnya untuk plagiarisme, menipu pihak ketiga, memanipulasi sistem evaluasi (akademik, rekrutmen, jaringan iklan) dengan cara yang melanggar aturan mereka, atau menyesatkan dengan cara yang melanggar hukum yang berlaku;",
              "mengunggah malware untuk menguji pemindai jika tindakan tersebut melanggar hukum di yurisdiksi Anda (gunakan file uji EICAR sebagai gantinya);",
              "mencoba membebani, melakukan rekayasa balik, scraping, menyalahgunakan batas laju, atau mengganggu operasi atau ketersediaan Layanan dengan cara lain;",
              "mengelakkan kuota, persyaratan pembayaran, atau pembatasan lainnya yang berlaku;",
              "membuat banyak akun untuk menggandakan kuota tingkat gratis, atau berbagi akun dengan lebih banyak individu daripada yang diizinkan oleh paket Anda."
            ]
          },
          {
            "kind": "p",
            "text": "Kami dapat menangguhkan atau menghentikan akun Anda segera dan tanpa pemberitahuan jika kami memiliki alasan yang masuk akal untuk meyakini Anda telah melanggar bagian ini, tanpa hak atas pengembalian dana apa pun."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Konten Anda",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda tetap memiliki semua hak, kepemilikan, dan kepentingan atas berkas dan teks yang Anda unggah ke Layanan. Anda memberikan kami lisensi terbatas, tanpa royalti, bersifat global untuk memprosesnya semata-mata guna memberikan alat yang Anda minta. Lisensi ini berakhir seketika hasil dikembalikan kepada Anda (alat berbantuan server) atau tidak pernah tercipta sama sekali (alat berbasis peramban, karena berkas Anda tidak pernah sampai ke kami). Kami tidak, dan tidak akan, mengklaim kepemilikan atas konten Anda atau menggunakannya untuk melatih model AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Akun",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda harus berusia minimal enam belas (16) tahun untuk membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan kredensial Anda dan atas aktivitas apa pun yang terjadi di bawah akun Anda. Beritahukan kepada kami segera melalui [security@konvertools.com](mailto:security@konvertools.com) jika terjadi akses tidak sah yang dicurigai."
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
              "**Paket**: Gratis (€0), Pro (€12/bulan atau €99/tahun), Bisnis (€39/bulan atau €349/tahun). Fitur dan kuota paket dijelaskan di [halaman Harga kami](/pricing) pada saat pembelian. Kami berhak mengubah fitur paket dengan pemberitahuan 30 hari sebelumnya.",
              "**Pembaruan otomatis**: langganan bulanan dan tahunan diperbarui secara otomatis dengan frekuensi yang sama hingga dibatalkan. Anda dapat membatalkan kapan saja melalui dasbor Anda; pembatalan berlaku pada akhir periode penagihan saat ini. Anda tetap memiliki akses hingga tanggal tersebut.",
              "**Hak penarikan (UE)**: berdasarkan Pasal L. 221-28 dari Kode Konsumen Prancis, ketika Anda secara aktif menggunakan Layanan selama periode penarikan awal 14 hari, Anda secara tegas menyetujui pelaksanaan kontrak segera dan melepaskan hak penarikan Anda. Jika Anda tidak menggunakan fitur berbayar apa pun, Anda dapat menarik diri dalam 14 hari dengan mengirim email ke [billing@konvertools.com](mailto:billing@konvertools.com) dan kami akan mengembalikan dana penuh dalam 14 hari.",
              "**Tidak ada pengembalian sebagian**: di luar skenario penarikan di atas, biaya yang sudah dibayarkan untuk periode penagihan saat ini tidak dapat dikembalikan.",
              "**Kredit**: kredit API yang dibeli sebagai paket sekali pakai (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **tidak pernah kedaluwarsa**. 300 kredit yang secara otomatis diberikan setiap bulan kepada pelanggan Bisnis kedaluwarsa pada akhir bulan kalender dan **tidak dapat dikembalikan**.",
              "**Perubahan harga**: kami dapat mengubah harga dengan pemberitahuan 30 hari sebelumnya. Pelanggan yang sudah ada mempertahankan harga saat ini hingga tanggal pembaruan berikutnya.",
              "**Pajak**: harga yang ditampilkan tidak termasuk PPN jika berlaku. Stripe akan memungut dan menyetorkan pajak yang terutang di yurisdiksi Anda."
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
            "text": "Paket Bisnis mengekspos API REST publik yang diautentikasi dengan kunci API yang Anda buat dari dasbor. Penggunaan API juga tunduk pada:"
          },
          {
            "kind": "ul",
            "items": [
              "**Batas laju**: 60 permintaan per menit (tambahan Pro) atau 120 permintaan per menit (Bisnis). Penyalahgunaan berkelanjutan dapat mengakibatkan pembatasan sementara atau pencabutan kunci permanen.",
              "**Pengurangan kredit**: setiap panggilan API mengurangi kredit sesuai tarif yang dipublikasikan di [dokumentasi API kami](/api). Panggilan gagal (respons 5xx) tidak mengurangi kredit.",
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
            "text": "Nama, logo, kode, desain, dokumentasi, struktur basis data, dan konten agregat Layanan adalah milik eksklusif Penerbit dan dilindungi oleh hukum kekayaan intelektual Prancis dan internasional. Tidak ada lisensi yang diberikan kepada Anda selain yang secara ketat diperlukan untuk menggunakan Layanan sebagaimana dimaksud. Anda tidak boleh mereproduksi, memodifikasi, melakukan dekompilasi, atau membuat karya turunan dari Layanan atau bagian apa pun darinya, kecuali sebagaimana secara tegas diizinkan oleh hukum yang berlaku."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnifikasi",
        "blocks": [
          {
            "kind": "p",
            "text": "Anda setuju untuk membebaskan dan membela Penerbit dari segala klaim, kerugian, kerusakan, tanggung jawab, biaya, atau pengeluaran (termasuk biaya hukum yang wajar) yang timbul dari (a) pelanggaran Anda terhadap Ketentuan, (b) pelanggaran Anda terhadap hukum atau hak pihak ketiga, atau (c) konten apa pun yang Anda unggah ke Layanan."
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
            "text": "Anda dapat menghentikan akun Anda kapan saja melalui dasbor. Kami dapat menghentikan atau menangguhkan akun Anda segera dan tanpa pemberitahuan jika Anda melanggar Ketentuan, menyalahgunakan Layanan, atau gagal membayar langganan berulang. Setelah pemutusan, data Anda akan dihapus dalam tiga puluh (30) hari, kecuali catatan penagihan dan pencatatan persetujuan yang disimpan sebagaimana dijelaskan dalam Kebijakan Privasi kami."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Hukum yang berlaku dan yurisdiksi",
        "blocks": [
          {
            "kind": "p",
            "text": "Ketentuan ini tunduk pada hukum Prancis. Setiap sengketa yang timbul dari atau terkait dengan Ketentuan atau Layanan akan diajukan kepada yurisdiksi eksklusif pengadilan Paris, Prancis, kecuali jika hak tindakan wajib konsumen di negara tempat tinggal mereka berlaku berdasarkan hukum Uni Eropa atau nasional yang berlaku. Sebelum memulai tindakan hukum, Anda setuju untuk mencoba menyelesaikan sengketa secara damai dengan menulis ke [legal@konvertools.com](mailto:legal@konvertools.com). Konsumen UE juga dapat menggunakan platform Penyelesaian Sengketa Online Komisi Eropa di [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Ketentuan lainnya",
        "blocks": [
          {
            "kind": "p",
            "text": "Jika ketentuan apa pun dalam Ketentuan ini dinyatakan tidak valid atau tidak dapat ditegakkan, ketentuan yang tersisa tetap berlaku sepenuhnya. Kegagalan kami untuk menegakkan hak atau ketentuan apa pun bukan merupakan pelepasan atas hak tersebut. Ketentuan ini (bersama dengan Kebijakan Privasi dan ketentuan spesifik paket apa pun yang dirujuk saat pembelian) merupakan perjanjian lengkap antara Anda dan Penerbit terkait Layanan."
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
            "text": "Các Điều khoản Dịch vụ (\"Điều khoản\") này tạo thành thỏa thuận ràng buộc giữa bạn (\"Người dùng\") và nhà xuất bản của Konvertools (\"Nhà xuất bản\", \"chúng tôi\", \"chúng tôi\") liên quan đến việc sử dụng trang web Konvertools và tất cả các công cụ, API và dịch vụ liên quan (tập thể gọi là \"Dịch vụ\"). Bằng cách tạo tài khoản, tích vào ô chấp nhận khi đăng ký hoặc đơn giản bằng cách sử dụng bất kỳ công cụ nào trên Dịch vụ, bạn xác nhận rằng bạn đã đọc, hiểu và chấp nhận toàn bộ các Điều khoản này, cùng với Chính sách Bảo mật của chúng tôi."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Dịch vụ",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools cung cấp danh mục các tiện ích chuyển đổi tệp, công cụ xử lý tài liệu và hình ảnh, tiện ích hỗ trợ bởi AI, công cụ bảo mật chỉ mang tính chất tham khảo (quét virus, xác minh email, phát hiện lừa đảo, quét URL) và tiện ích dành cho nhà phát triển. Hầu hết các công cụ hoạt động hoàn toàn trong trình duyệt của bạn; một số yêu cầu xử lý trên máy chủ. Dịch vụ được cung cấp **\"nguyên trạng\" và \"sẵn có\"** mà không có bất kỳ bảo hành nào, dù là rõ ràng hay ngụ ý, bao gồm khả năng thương mại, phù hợp cho mục đích cụ thể hoặc không xâm phạm."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Giới hạn trách nhiệm — đọc kỹ",
        "blocks": [
          {
            "kind": "p",
            "text": "**Trong phạm vi tối đa cho phép bởi pháp luật, Nhà xuất bản từ chối mọi trách nhiệm đối với mọi thiệt hại phát sinh từ việc sử dụng hoặc không thể sử dụng Dịch vụ của bạn.** Đặc biệt, bạn thừa nhận và đồng ý rằng Nhà xuất bản sẽ không chịu trách nhiệm về:"
          },
          {
            "kind": "ul",
            "items": [
              "mất dữ liệu, tệp bị hỏng hoặc không chính xác, hoặc chuyển đổi thất bại;",
              "các quyết định, tài chính, kinh doanh hoặc các quyết định khác mà bạn đưa ra dựa trên kết quả của bất kỳ công cụ nào;",
              "thời gian chết, độ trễ hoặc sự không khả dụng tạm thời của bất kỳ tính năng nào;",
              "lỗi dịch vụ của bên thứ ba (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, nhà cung cấp dịch vụ lưu trữ);",
              "thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc thiệt hại trừng phạt dưới mọi hình thức;",
              "bất kỳ khoản tiền tổng hợp nào vượt quá khoản phí bạn đã thanh toán cho chúng tôi trong mười hai (12) tháng trước sự kiện phát sinh yêu cầu bồi thường, giới hạn ở một trăm (100) euro đối với người dùng gói miễn phí."
            ]
          },
          {
            "kind": "p",
            "text": "**Công cụ bảo mật**: Quét Virus, Quét URL, Phát hiện Lừa đảo và Xác minh Email được cung cấp **chỉ mang tính chất thông tin và tham khảo**. Chúng tổng hợp các tín hiệu từ bên thứ ba (hơn 70+ công cụ diệt virus của VirusTotal, Google Safe Browsing, DNS công cộng) và thuật toán heuristic dựa trên mô hình ngôn ngữ lớn. Chúng **không cấu thành bất kỳ sự đảm bảo nào về an toàn, tính hợp lệ hoặc không có rủi ro**. Phần mềm độc hại mới có thể vượt qua hệ thống phát hiện cho đến khi các công cụ diệt virus được cập nhật; các trang lừa đảo mới xuất hiện nhanh hơn so với cơ sở dữ liệu danh tiếng có thể phân loại; một email vượt qua kiểm tra của chúng tôi vẫn có thể không hoạt động hoặc gian lận. Nhà xuất bản từ chối mọi trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ một tệp độc hại mà Dịch vụ không phát hiện, một email lừa đảo mà Dịch vụ coi là an toàn, một liên kết không an toàn mà Dịch vụ không xác định được, hoặc một email giao dịch được gửi đến địa chỉ mà Dịch vụ đánh dấu là hợp lệ. Người dùng chịu trách nhiệm duy nhất cho các quyết định bảo mật dựa trên các công cụ này."
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
              "tải lên, xử lý hoặc phân phối nội dung bất hợp pháp trong phạm vi thẩm quyền của bạn hoặc tại Pháp;",
              "xử lý các tệp mà bạn không sở hữu quyền cần thiết (tác phẩm có bản quyền không có sự cho phép, dữ liệu cá nhân mà bạn không được phép xử lý, thông tin mật);",
              "thực hiện hoặc tạo điều kiện thuận lợi cho gian lận, rửa tiền, tài trợ cho khủng bố hoặc bất kỳ hoạt động tội phạm nào;",
              "sử dụng công cụ nhân hóa AI, công cụ văn bản AI hoặc bất kỳ tính năng nào khác để đạo văn, lừa dối bên thứ ba, thao túng hệ thống đánh giá (học thuật, tuyển dụng, mạng quảng cáo) theo cách vi phạm quy tắc của họ, hoặc gây hiểu lầm theo bất kỳ cách nào vi phạm luật áp dụng;",
              "tải lên phần mềm độc hại để kiểm tra trình quét nếu việc đó vi phạm pháp luật trong phạm vi thẩm quyền của bạn (thay vào đó hãy sử dụng tệp kiểm tra EICAR);",
              "cố gắng quá tải, đảo ngược kỹ thuật, thu thập dữ liệu, lạm dụng giới hạn tốc độ hoặc can thiệp vào hoạt động hoặc khả năng sẵn có của Dịch vụ theo cách khác;",
              "vượt quá hạn ngạch, yêu cầu thanh toán hoặc bất kỳ hạn chế nào khác đang áp dụng;",
              "tạo nhiều tài khoản để nhân đôi hạn ngạch gói miễn phí hoặc chia sẻ tài khoản cho nhiều cá nhân hơn so với kế hoạch của bạn cho phép."
            ]
          },
          {
            "kind": "p",
            "text": "Chúng tôi có thể tạm ngừng hoặc chấm dứt tài khoản của bạn ngay lập tức và không cần thông báo nếu chúng tôi có lý do chính đáng để tin rằng bạn đã vi phạm điều khoản này, mà không có quyền yêu cầu hoàn tiền dưới bất kỳ hình thức nào."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Nội dung của bạn",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn giữ toàn bộ quyền, tiêu đề và lợi ích đối với các tệp và văn bản bạn gửi đến Dịch vụ. Bạn cấp cho chúng tôi giấy phép giới hạn, không có bản quyền, toàn cầu để xử lý chúng chỉ nhằm cung cấp công cụ bạn yêu cầu. Giấy phép này chấm dứt ngay khi kết quả được trả về cho bạn (công cụ hỗ trợ bởi máy chủ) hoặc không bao giờ tồn tại (công cụ chỉ chạy trên trình duyệt, vì tệp của bạn không bao giờ đến được với chúng tôi). Chúng tôi không, và sẽ không, tuyên bố sở hữu nội dung của bạn hoặc sử dụng nó để đào tạo mô hình AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Tài khoản",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn phải đủ mười sáu (16) tuổi trở lên để tạo tài khoản. Bạn chịu trách nhiệm giữ bí mật thông tin đăng nhập của mình và mọi hoạt động xảy ra dưới tài khoản của bạn. Thông báo ngay cho chúng tôi qua email [security@konvertools.com](mailto:security@konvertools.com) về bất kỳ truy cập trái phép nào được nghi ngờ."
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
              "**Gói dịch vụ**: Miễn phí (€0), Pro (€12/tháng hoặc €99/năm), Business (€39/tháng hoặc €349/năm). Các tính năng và hạn ngạch của gói được mô tả trên trang [Bảng giá của chúng tôi](/pricing) tại thời điểm mua. Chúng tôi có quyền sửa đổi tính năng gói với thông báo trước 30 ngày.",
              "**Tự động gia hạn**: đăng ký hàng tháng và hàng năm tự động gia hạn theo cùng chu kỳ cho đến khi bị hủy. Bạn có thể hủy bất kỳ lúc nào từ bảng điều khiển của mình; việc hủy có hiệu lực vào cuối kỳ thanh toán hiện tại. Bạn vẫn có quyền truy cập cho đến ngày đó.",
              "**Quyền rút lui (EU)**: theo Điều L. 221-28 của Bộ luật Tiêu dùng Pháp, khi bạn chủ động sử dụng Dịch vụ trong giai đoạn rút lui ban đầu 14 ngày, bạn đồng ý thực hiện hợp đồng ngay lập tức và từ bỏ quyền rút lui của mình. Nếu bạn chưa sử dụng bất kỳ tính năng trả phí nào, bạn có thể rút lui trong vòng 14 ngày bằng cách gửi email đến [billing@konvertools.com](mailto:billing@konvertools.com) và chúng tôi sẽ hoàn tiền đầy đủ trong vòng 14 ngày.",
              "**Không hoàn tiền một phần**: ngoài trường hợp rút lui nêu trên, phí đã thanh toán cho kỳ thanh toán hiện tại không được hoàn lại.",
              "**Tín dụng**: tín dụng API mua dưới dạng gói một lần (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **không bao giờ hết hạn**. 300 tín dụng được cấp tự động mỗi tháng cho người đăng ký Business hết hạn vào cuối tháng dương lịch và **không được hoàn lại**.",
              "**Thay đổi giá**: chúng tôi có thể sửa đổi giá với thông báo trước 30 ngày. Người đăng ký hiện tại giữ nguyên giá hiện tại cho đến ngày gia hạn tiếp theo.",
              "**Thuế**: giá được hiển thị không bao gồm VAT (nếu có). Stripe thu thập và nộp bất kỳ khoản thuế nào phải nộp trong phạm vi thẩm quyền của bạn."
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
            "text": "Gói Business cung cấp API REST công khai được xác thực bằng khóa API do bạn tạo từ bảng điều khiển. Việc sử dụng API cũng bị chi phối bởi:"
          },
          {
            "kind": "ul",
            "items": [
              "**Giới hạn tốc độ**: 60 yêu cầu mỗi phút (nâng cấp Pro) hoặc 120 yêu cầu mỗi phút (Business). Lạm dụng kéo dài có thể dẫn đến tạm ngưng tạm thời hoặc thu hồi khóa vĩnh viễn.",
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
            "text": "Tên, biểu tượng, mã, thiết kế, tài liệu, cấu trúc cơ sở dữ liệu và nội dung tổng hợp của Dịch vụ là tài sản độc quyền của Nhà xuất bản và được bảo vệ bởi luật sở hữu trí tuệ của Pháp và quốc tế. Bạn không được cấp bất kỳ giấy phép nào ngoài những gì cần thiết để sử dụng Dịch vụ theo mục đích dự định. Bạn không được phép sao chép, sửa đổi, dịch ngược hoặc tạo tác phẩm phái sinh từ Dịch vụ hoặc bất kỳ phần nào của nó, trừ khi được pháp luật cho phép một cách rõ ràng."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Bồi thường thiệt hại",
        "blocks": [
          {
            "kind": "p",
            "text": "Bạn đồng ý bồi thường và giữ Nhà xuất bản vô hại khỏi bất kỳ khiếu nại, tổn thất, thiệt hại, trách nhiệm, chi phí hoặc khoản chi (bao gồm phí pháp lý hợp lý) phát sinh từ (a) việc bạn vi phạm các Điều khoản này, (b) việc bạn vi phạm bất kỳ luật nào hoặc quyền của bên thứ ba, hoặc (c) bất kỳ nội dung nào bạn gửi đến Dịch vụ."
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
            "text": "Bạn có thể chấm dứt tài khoản của mình bất kỳ lúc nào từ bảng điều khiển. Chúng tôi có thể chấm dứt hoặc tạm ngừng tài khoản của bạn ngay lập tức và không cần thông báo nếu bạn vi phạm các Điều khoản này, lạm dụng Dịch vụ hoặc không thanh toán đăng ký định kỳ. Sau khi chấm dứt, dữ liệu của bạn sẽ bị xóa trong vòng ba mươi (30) ngày, ngoại trừ hồ sơ thanh toán và hồ sơ đồng thuận được lưu giữ theo mô tả trong Chính sách Bảo mật của chúng tôi."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Luật áp dụng và thẩm quyền xét xử",
        "blocks": [
          {
            "kind": "p",
            "text": "Các Điều khoản này chịu sự điều chỉnh của luật pháp Pháp. Bất kỳ tranh chấp phát sinh từ hoặc liên quan đến các Điều khoản này hoặc Dịch vụ sẽ được nộp đến thẩm quyền độc quyền của tòa án Paris, Pháp, trừ trường hợp quyền hành động bắt buộc của người tiêu dùng tại quốc gia cư trú của họ có hiệu lực theo luật của Liên minh Châu Âu hoặc luật quốc gia áp dụng. Trước khi khởi kiện, bạn đồng ý cố gắng giải quyết tranh chấp một cách thân thiện bằng cách viết thư đến [legal@konvertools.com](mailto:legal@konvertools.com). Người tiêu dùng EU cũng có thể sử dụng nền tảng Giải quyết Tranh chấp Trực tuyến của Ủy ban Châu Âu tại [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Các điều khoản khác",
        "blocks": [
          {
            "kind": "p",
            "text": "Nếu bất kỳ điều khoản nào của các Điều khoản này bị coi là vô hiệu hoặc không thể thực thi, các điều khoản còn lại vẫn có hiệu lực đầy đủ. Việc chúng tôi không thực thi bất kỳ quyền hoặc điều khoản nào không phải là từ bỏ quyền đó. Các Điều khoản này (cùng với Chính sách Bảo mật và bất kỳ điều khoản cụ thể theo gói nào được đề cập khi mua) cấu thành toàn bộ thỏa thuận giữa bạn và Nhà xuất bản liên quan đến Dịch vụ."
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
            "text": "Dessa Användarvillkor (nedan kallade \"Villkoren\") utgör ett bindande avtal mellan dig (nedan kallad \"Användaren\") och utgivaren av Konvertools (nedan kallad \"Utgivaren\", \"vi\", \"oss\") beträffande ditt användande av Konvertools webbplats och alla tillhörande verktyg, API:er och tjänster (gemensamt kallade \"Tjänsten\"). Genom att skapa ett konto, kryssa i acceptansrutan vid registrering eller helt enkelt använda något verktyg på Tjänsten bekräftar du att du har läst, förstått och accepterat dessa Villkor i sin helhet, tillsammans med vår Integritetspolicy."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Tjänsten",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools tillhandahåller en katalog med filkonverteringsverktyg, dokument- och bildbehandlingsverktyg, AI-assisterade textverktyg, indikativa säkerhetsverktyg (virusskanner, e-postverifierare, phishingdetektor, URL-skanner) samt utvecklarverktyg. De flesta verktyg körs helt i din webbläsare; vissa kräver serverbearbetning. Tjänsten tillhandahålls **\"som den är\" och \"tillgänglig\"** utan någon form av garanti, uttrycklig eller underförstådd, inklusive försäljningsbarhet, lämplighet för ett särskilt ändamål eller icke-intrång."
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
              "förlust av data, korrupta eller felaktiga filer, eller misslyckade konverteringar;",
              "beslut, finansiella, affärsmässiga eller andra, som du fattar baserat på resultatet från något verktyg;",
              "nedtid, fördröjning eller tillfällig otillgänglighet av någon funktion;",
              "fel hos tredje parts tjänster (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, värdtjänstleverantörer);",
              "indirekta, tillfälliga, särskilda, följd- eller straffskador av något slag;",
              "något sammanlagt belopp som överstiger de avgifter du faktiskt har betalat till oss under de tolv (12) månader som föregår händelsen som ger upphov till kravet, med ett tak på ett hundra (100) euro för användare på gratisplan."
            ]
          },
          {
            "kind": "p",
            "text": "**Säkerhetsverktyg**: Virusskannern, URL-skannern, Phishingdetektorn och E-postverifieraren tillhandahålls **enbart i informations- och indikativt syfte**. De aggregerar signaler från tredje part (VirusTotals 70+ antivirusmotorer, Google Safe Browsing, offentlig DNS) och heuristiker från stora språkmodeller. De **konstituerar inte någon garanti för säkerhet, giltighet eller frånvaro av risk**. Ny skadlig kod kan undgå upptäckt tills antivirusmotorer uppdateras; nya phishing-sidor dyker upp snabbare än ryktesdatabaser kan katalogisera dem; en e-post som passerar våra kontroller kan ändå vara inaktiv eller bedräglig. Utgivaren friskriver sig uttryckligen från allt ansvar för skador som uppstår till följd av en skadlig fil som Tjänsten inte flaggade, en phishing-e-post som Tjänsten bedömde som säker, en osäker länk som Tjänsten missade, eller en transaktionell e-post som skickades till en adress som Tjänsten markerade som giltig. Användaren bär ensamt ansvaret för säkerhetsbeslut som fattas på grundval av dessa verktyg."
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
              "ladda upp skadlig kod för att testa vår skanner om detta skulle strida mot lagen i din jurisdiktion (använd i stället EICAR-testfilen);",
              "försöka överbelasta, reverse-engineera, skrapa, missbruka hastighetsbegränsningar eller på annat sätt störa driften eller tillgängligheten av Tjänsten;",
              "undvika kvoter, betalningskrav eller andra begränsningar som finns;",
              "skapa flera konton för att utöka gratisplanens kvoter eller dela ett konto med fler personer än vad din plan tillåter."
            ]
          },
          {
            "kind": "p",
            "text": "Vi kan omedelbart och utan föregående meddelande suspendera eller avsluta ditt konto om vi har rimliga skäl att tro att du har brutit mot denna sektion, utan rätt till återbetalning av något slag."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Ditt innehåll",
        "blocks": [
          {
            "kind": "p",
            "text": "Du behåller alla rättigheter, titel och intresse i de filer och texter som du skickar till Tjänsten. Du ger oss en strikt begränsad, avgiftsfri, världsomspännande licens att bearbeta dem enbart för att leverera det verktyg du begärde. Denna licens upphör i samma ögonblick som resultatet returneras till dig (serverassisterade verktyg) eller aldrig träder i kraft alls (webbläsarbaserade verktyg, eftersom din fil aldrig når oss). Vi gör, och kommer inte att, göra anspråk på äganderätt till ditt innehåll eller använda det för att träna AI-modeller."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konton",
        "blocks": [
          {
            "kind": "p",
            "text": "Du måste vara minst sexton (16) år gammal för att skapa ett konto. Du ansvarar för att hålla dina inloggningsuppgifter konfidentiella och för all aktivitet som sker under ditt konto. Meddela oss omedelbart på [security@konvertools.com](mailto:security@konvertools.com) om du misstänker obehörig åtkomst."
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
              "**Planer**: Gratis (€0), Pro (€12/månad eller €99/år), Business (€39/månad eller €349/år). Planernas funktioner och kvoter beskrivs på vår [Prissida](/pricing) vid köptillfället. Vi förbehåller oss rätten att ändra planernas funktioner med 30 dagars varsel.",
              "**Automatisk förnyelse**: månads- och årsabonnemang förnyas automatiskt med samma intervall tills de sägs upp. Du kan säga upp när som helst från ditt kontrollpanel; uppsägningen träder i kraft vid slutet av den aktuella faktureringsperioden. Du behåller åtkomst tills dess.",
              "**Ångerrätt (EU)**: enligt Artikel L. 221-28 i den franska konsumentkodexen, när du aktivt använder Tjänsten under den initiala 14-dagars ångerfristen, samtycker du uttryckligen till omedelbar fullgörande av avtalet och avstår från din ångerrätt. Om du inte har använt någon betald funktion kan du ångra dig inom 14 dagar genom att skicka ett e-postmeddelande till [billing@konvertools.com](mailto:billing@konvertools.com) och vi kommer att återbetala fullt belopp inom 14 dagar.",
              "**Inga partiella återbetalningar**: utanför ovanstående ångerscenario är redan betalda avgifter för den aktuella faktureringsperioden icke-återbetalningsbara.",
              "**Krediter**: API-krediter som köpts som engångspaket (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **löper aldrig ut**. De 300 krediter som Business-abonnenter automatiskt tilldelas varje månad löper ut vid slutet av kalendermånaden och är **icke-återbetalningsbara**.",
              "**Prisförändringar**: vi kan ändra priser med 30 dagars varsel. Befintliga abonnenter behåller sitt nuvarande pris tills nästa förnyelsedatum.",
              "**Moms**: priser visas exklusive moms där så är tillämpligt. Stripe samlar in och redovisar eventuell moms som ska betalas i din jurisdiktion."
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
            "text": "Business-planen exponerar ett offentligt REST API som autentiseras med API-nycklar som du genererar från din kontrollpanel. Användningen av API:t regleras dessutom av följande:"
          },
          {
            "kind": "ul",
            "items": [
              "**Hastighetsbegränsningar**: 60 förfrågningar per minut (Pro-tillägg) eller 120 förfrågningar per minut (Business). Upprepad missbruk kan leda till tillfällig begränsning eller permanent återkallande av nyckeln.",
              "**Kreditförbrukning**: varje API-anrop drar av krediter enligt de priser som anges i vår [API-dokumentation](/api). Misslyckade anrop (5xx-svar) drar inte av krediter.",
              "**Nyckelsäkerhet**: du ansvarar för att lagra dina API-nycklar säkert och rotera dem om de komprometteras. Vi kan återkalla vilken nyckel som helst när som helst om vi misstänker missbruk.",
              "**Acceptabel uppströmsanvändning**: applikationer som bygger på vårt API måste följa dessa Villkor, inklusive avsnittet om acceptabel användning. Du får inte exponera våra API-nycklar för slutanvändare (licensiera i stället ut din tjänst)."
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
            "text": "Namn, logotyp, kod, design, dokumentation, databasstruktur och aggregerat innehåll från Tjänsten är Utgivarens exklusiva egendom och skyddas av fransk och internationell immaterialrättslagstiftning. Ingen licens beviljas dig utöver vad som är strikt nödvändigt för att använda Tjänsten som avsett. Du får inte reproducera, modifiera, dekompilera eller skapa härledda verk av Tjänsten eller någon del av den, utom i den utsträckning som uttryckligen tillåts av tillämplig lag."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Skadeståndsansvar",
        "blocks": [
          {
            "kind": "p",
            "text": "Du förbinder dig att ersätta och hålla Utgivaren skadeslös från alla anspråk, förluster, skador, ansvar, kostnader eller utgifter (inklusive rimliga juridiska avgifter) som uppstår till följd av (a) ditt brott mot dessa Villkor, (b) ditt brott mot någon lag eller tredje parts rättigheter, eller (c) något innehåll som du har skickat till Tjänsten."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Ändringar av Villkoren",
        "blocks": [
          {
            "kind": "p",
            "text": "Vi kan ändra dessa Villkor när som helst. Väsentliga ändringar kommer att meddelas via e-post till kontoinnehavare minst trettio (30) dagar innan de träder i kraft. Genom att fortsätta använda Tjänsten efter denna period accepterar du de ändrade Villkoren. Den senaste versionen finns alltid tillgänglig på [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Uppsägning",
        "blocks": [
          {
            "kind": "p",
            "text": "Du kan säga upp ditt konto när som helst från din kontrollpanel. Vi kan säga upp eller suspendera ditt konto omedelbart och utan föregående meddelande om du bryter mot dessa Villkor, missbrukar Tjänsten eller inte betalar ett återkommande abonnemang. Vid uppsägning raderas dina data inom trettio (30) dagar, med undantag för faktureringsposter och samtyckesregister som behålls enligt vår Integritetspolicy."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Tillämplig lag och jurisdiktion",
        "blocks": [
          {
            "kind": "p",
            "text": "Dessa Villkor styrs av fransk lag. Eventuella tvister som uppstår i samband med dessa Villkor eller Tjänsten ska hänskjutas till de exklusiva domstolarna i Paris, Frankrike, såvida inte en konsuments obligatoriska rätt till åtgärd i sin hemvistland enligt EU-lagstiftning eller nationell lagstiftning gäller. Innan du inleder rättsliga åtgärder förbinder du dig att försöka lösa tvisten på ett vänligt sätt genom att skriva till [legal@konvertools.com](mailto:legal@konvertools.com). EU-konsumenter kan också använda Europeiska kommissionens plattform för online-tvister på [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Övriga bestämmelser",
        "blocks": [
          {
            "kind": "p",
            "text": "Om någon bestämmelse i dessa Villkor befinns ogiltig eller oenforcebar, förblir de återstående bestämmelserna fullt giltiga. Vårt underlåtande att genomdriva någon rätt eller bestämmelse utgör inte någon avståelse från denna rätt. Dessa Villkor (tillsammans med Integritetspolicyn och eventuella plan-specifika villkor som refereras vid köp) utgör hela avtalet mellan dig och Utgivaren beträffande Tjänsten."
          }
        ]
      }
    ]
  },
  "pl": {
    "h1": "Regulamin Usługi",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Ostatnia aktualizacja: __DATA__ · Korzystając z Konvertools, akceptujesz niniejszy regulamin.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Akceptacja",
        "blocks": [
          {
            "kind": "p",
            "text": "Niniejszy Regulamin Usługi (zwany dalej „Regulaminem”) stanowi wiążącą umowę pomiędzy Tobą (zwany dalej „Użytkownikiem”) a wydawcą Konvertools (zwany dalej „Wydawcą”, „my”, „nas”) dotyczącą korzystania z witryny Konvertools oraz wszystkich powiązanych narzędzi, interfejsów API i usług (zwanych łącznie „Usługą”). Tworząc konto, zaznaczając pole akceptacji podczas rejestracji lub po prostu korzystając z dowolnego narzędzia w Usłudze, potwierdzasz, że zapoznałeś się z Regulaminem w całości, zrozumiałeś go i akceptujesz, wraz z naszą Polityką Prywatności."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Charakterystyka Usługi",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools oferuje katalog narzędzi do konwersji plików, przetwarzania dokumentów i obrazów, narzędzi tekstowych wspomaganych sztuczną inteligencją, wskaźnikowych narzędzi bezpieczeństwa (skaner wirusów, weryfikator poczty e-mail, wykrywacz phishingu, skaner adresów URL) oraz narzędzi dla programistów. Większość narzędzi działa wyłącznie w przeglądarce użytkownika; niektóre wymagają przetwarzania po stronie serwera. Usługa jest świadczona **„tak jak jest” i „w stanie dostępnym”** bez jakiejkolwiek gwarancji, wyraźnej lub dorozumianej, w tym dotyczącej przydatności handlowej, przydatności do określonego celu lub braku naruszenia praw własności intelektualnej."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Ograniczenie odpowiedzialności — przeczytaj uważnie",
        "blocks": [
          {
            "kind": "p",
            "text": "**W maksymalnym zakresie dozwolonym przez obowiązujące prawo, Wydawca wyłącza wszelką odpowiedzialność za szkody powstałe w wyniku korzystania z Usługi lub niemożności jej użycia.** W szczególności uznajesz i zgadzasz się, że Wydawca nie ponosi odpowiedzialności za:"
          },
          {
            "kind": "ul",
            "items": [
              "utratę danych, uszkodzone lub nieprawidłowe pliki lub nieudane konwersje;",
              "podejmowane decyzje, w tym finansowe, biznesowe lub inne, oparte na wynikach dowolnego narzędzia;",
              "przestoje, opóźnienia lub tymczasową niedostępność jakiejkolwiek funkcji;",
              "awarie usług zewnętrznych (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, dostawcy hostingu);",
              "szkody pośrednie, przypadkowe, specjalne, następcze lub karne jakiegokolwiek rodzaju;",
              "jakąkolwiek łączną kwotę przewyższającą opłaty, które rzeczywiście zapłaciłeś nam w ciągu dwunastu (12) miesięcy poprzedzających zdarzenie stanowiące podstawę roszczenia, ograniczoną do stu (100) euro w przypadku użytkowników darmowego poziomu."
            ]
          },
          {
            "kind": "p",
            "text": "**Narzędzia bezpieczeństwa**: Skaner Wirusów, Skaner Adresów URL, Wykrywacz Phishingu oraz Weryfikator Poczty E-mail są świadczone **wyłącznie w celach informacyjnych i wskaźnikowych**. Agregują one sygnały zewnętrzne (70+ silników antywirusowych VirusTotal, Google Safe Browsing, publiczny DNS) oraz heurystyki oparte na dużych modelach językowych. **Nie stanowią one gwarancji bezpieczeństwa, ważności lub braku ryzyka.** Nowe złośliwe oprogramowanie może unikać wykrycia do czasu aktualizacji silników antywirusowych; nowe strony phishingowe pojawiają się szybciej, niż bazy reputacji są w stanie je skatalogować; e-mail, który przeszedł nasze kontrole, może nadal być nieaktywny lub oszukańczy. Wydawca wyraźnie wyłącza wszelką odpowiedzialność za jakiekolwiek szkody wynikające z złośliwego pliku, którego Usługa nie wykryła, e-mailu phishingowego uznanego przez Usługę za bezpieczny, niebezpiecznego linku, którego Usługa nie zidentyfikowała, lub transakcyjnego e-maila wysłanego na adres uznany przez Usługę za ważny. Użytkownik ponosi wyłączną odpowiedzialność za decyzje dotyczące bezpieczeństwa podejmowane na podstawie tych narzędzi."
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
              "przetwarzania plików, do których nie posiadasz odpowiednich praw (utworów chronionych prawem autorskim bez upoważnienia, danych osobowych, do których nie jesteś uprawniony, informacji niejawnych);",
              "popełniania lub ułatwiania oszustwa, prania brudnych pieniędzy, finansowania terroryzmu lub jakiejkolwiek działalności przestępczej;",
              "korzystania z narzędzi do humanizacji tekstu AI, narzędzi tekstowych AI lub jakiejkolwiek innej funkcji w celu plagiatu, oszukiwania osób trzecich, manipulowania systemami oceny (akademickimi, rekrutacyjnymi, sieci reklamowych) w sposób naruszający ich zasady lub wprowadzania w błąd w jakikolwiek sposób, który narusza obowiązujące prawo;",
              "przesyłania złośliwego oprogramowania w celu przetestowania naszego skanera, jeśli czynność ta byłaby nielegalna w Twojej jurysdykcji (zamiast tego użyj pliku testowego EICAR);",
              "próby przeciążenia, inżynierii wstecznej, scrapingowania, nadużywania limitów częstotliwości lub w inny sposób zakłócania działania lub dostępności Usługi;",
              "omijania limitów, wymogów płatności lub jakichkolwiek innych ograniczeń wprowadzonych w Usłudze;",
              "tworzenia wielu kont w celu zwiększenia limitów darmowego poziomu lub udostępniania konta większej liczbie osób, niż pozwala na to Twój plan."
            ]
          },
          {
            "kind": "p",
            "text": "Możemy natychmiast zawiesić lub zakończyć Twoje konto bez uprzedzenia, jeśli mamy uzasadnione podstawy, by sądzić, że naruszyłeś niniejszy punkt, bez prawa do zwrotu jakichkolwiek opłat."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Twoje treści",
        "blocks": [
          {
            "kind": "p",
            "text": "Zachowujesz wszelkie prawa, tytuł i interes w plikach i tekstach, które przesyłasz do Usługi. Udzielasz nam ściśle ograniczonej, nieodpłatnej, światowej licencji na ich przetwarzanie wyłącznie w celu dostarczenia narzędzia, którego zażądałeś. Licencja ta wygasa w momencie zwrócenia wyniku (narzędzia wymagające przetwarzania serwerowego) lub nie powstaje wcale (narzędzia działające wyłącznie w przeglądarce, gdyż Twój plik nigdy do nas nie trafia). Nie rościmy sobie i nie będziemy rościć prawa własności do Twoich treści ani używać ich do trenowania modeli AI."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Konta",
        "blocks": [
          {
            "kind": "p",
            "text": "Musisz mieć ukończone co najmniej szesnaście (16) lat, aby utworzyć konto. Jesteś odpowiedzialny za zachowanie poufności swoich danych logowania oraz za wszelką działalność odbywającą się na Twoim koncie. Powiadom nas niezwłocznie na adres [security@konvertools.com](mailto:security@konvertools.com) o podejrzewanym nieautoryzowanym dostępie."
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
              "**Autoodnawianie**: subskrypcje miesięczne i roczne odnawiają się automatycznie w tej samej częstotliwości, aż do odwołania. Możesz anulować w dowolnym momencie z poziomu panelu użytkownika; anulowanie wchodzi w życie z końcem bieżącego okresu rozliczeniowego. Zachowujesz dostęp do Usługi do tego dnia.",
              "**Prawo odstąpienia (UE)**: zgodnie z artykułem L. 221-28 francuskiego Kodeksu Konsumenckiego, jeśli aktywnie korzystasz z Usługi w początkowym 14-dniowym okresie odstąpienia, wyrażasz zgodę na natychmiastowe wykonanie umowy i rezygnujesz z prawa do odstąpienia. Jeśli nie korzystałeś z żadnej płatnej funkcji, możesz odstąpić w ciągu 14 dni, wysyłając wiadomość na adres [billing@konvertools.com](mailto:billing@konvertools.com), a my dokonamy pełnego zwrotu w ciągu 14 dni.",
              "**Brak częściowych zwrotów**: poza powyższym przypadkiem odstąpienia, opłaty już zapłacone za bieżący okres rozliczeniowy nie podlegają zwrotowi.",
              "**Kredyty**: zakupione pakiety kredytów API (,,Starter”, „Growth”, „Scale”, „Studio”) **nie tracą ważności**. 300 kredytów przyznawanych automatycznie każdego miesiąca użytkownikom planu Business tracą ważność z końcem miesiąca kalendarzowego i **nie podlegają zwrotowi**.",
              "**Zmiany cen**: możemy zmieniać ceny z 30-dniowym wyprzedzeniem. Istniejący subskrybenci zachowują obowiązującą cenę do następnego terminu odnowienia.",
              "**Podatek**: ceny są wyświetlane bez podatku VAT, gdzie ma to zastosowanie. Stripe pobiera i przekazuje należny podatek w Twojej jurysdykcji."
            ]
          }
        ]
      },
      {
        "id": "api",
        "title": "8. Publiczny interfejs API REST",
        "blocks": [
          {
            "kind": "p",
            "text": "Plan Business udostępnia publiczny interfejs API REST uwierzytelniany za pomocą kluczy API generowanych z poziomu panelu użytkownika. Korzystanie z interfejsu API jest dodatkowo regulowane przez:"
          },
          {
            "kind": "ul",
            "items": [
              "**Limity częstotliwości**: 60 żądań na minutę (dodatki Pro) lub 120 żądań na minutę (Business). Długotrwałe nadużycia mogą skutkować tymczasowym ograniczeniem lub trwałym unieważnieniem klucza.",
              "**Pobieranie kredytów**: każde wywołanie interfejsu API pobiera kredyty według stawek opublikowanych w naszej [dokumentacji API](/api). Niepowodzenia wywołań (odpowiedzi 5xx) nie pobierają kredytów.",
              "**Bezpieczeństwo kluczy**: jesteś odpowiedzialny za bezpieczne przechowywanie swoich kluczy API i ich rotację w przypadku podejrzenia naruszenia. Możemy unieważnić dowolny klucz w dowolnym momencie, jeśli podejrzewamy nadużycie.",
              "**Akceptowalne zastosowania nadrzędne**: aplikacje zbudowane na podstawie naszego interfejsu API muszą być zgodne z niniejszym Regulaminem, w tym z sekcją dotyczącą użytkowania zgodnego z przeznaczeniem. Nie wolno Ci udostępniać naszych kluczy API użytkownikom końcowym (zamiast tego udziel sublicencji na swoją usługę)."
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
            "text": "Nazwa, logo, kod, projekt, dokumentacja, struktura bazy danych oraz agregowane treści Usługi są wyłączną własnością Wydawcy i są chronione przez francuskie oraz międzynarodowe prawo własności intelektualnej. Nie udziela się Ci żadnej licencji poza tymi ściśle niezbędnymi do korzystania z Usługi zgodnie z jej przeznaczeniem. Nie możesz powielać, modyfikować, dekompilować ani tworzyć utworów zależnych Usługi lub jakiejkolwiek jej części, z wyjątkiem przypadków wyraźnie dozwolonych przez obowiązujące prawo."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnizacja",
        "blocks": [
          {
            "kind": "p",
            "text": "Zgadzasz się zwolnić Wydawcę oraz utrzymać go bez szkody z tytułu jakiegokolwiek roszczenia, straty, szkody, odpowiedzialności, kosztu lub wydatku (w tym rozsądnych honorariów prawnych) wynikających z (a) Twojego naruszenia niniejszego Regulaminu, (b) naruszenia przez Ciebie prawa lub praw osób trzecich lub (c) jakiejkolwiek treści, którą przesłałeś do Usługi."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Zmiany w Regulaminie",
        "blocks": [
          {
            "kind": "p",
            "text": "Możemy okresowo zmieniać niniejszy Regulamin. Istotne zmiany zostaną powiadomione e-mailowo użytkownikom posiadającym konta co najmniej trzydzieści (30) dni przed ich wejściem w życie. Kontynuując korzystanie z Usługi po upływie tego okresu, akceptujesz zmieniony Regulamin. Najnowsza wersja jest zawsze dostępna pod adresem [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Rozwiązanie umowy",
        "blocks": [
          {
            "kind": "p",
            "text": "Możesz rozwiązać swoje konto w dowolnym momencie z poziomu panelu użytkownika. Możemy rozwiązać lub zawiesić Twoje konto natychmiast i bez uprzedzenia, jeśli naruszasz niniejszy Regulamin, nadużywasz Usługi lub nie płacisz za subskrypcję cykliczną. Po rozwiązaniu Twoje dane są usuwane w ciągu trzydziestu (30) dni, z wyjątkiem zapisów dotyczących rozliczeń i zgód, które są przechowywane zgodnie z naszą Polityką Prywatności."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Prawo właściwe i jurysdykcja",
        "blocks": [
          {
            "kind": "p",
            "text": "Niniejszy Regulamin podlega prawu Francji. Wszelkie spory wynikające z niniejszego Regulaminu lub Usługi będą rozpatrywane przez wyłączną jurysdykcję sądów Paryża we Francji, z wyjątkiem przypadków, w których konsumentowi przysługuje obowiązkowe prawo do działania w jego kraju zamieszkania na mocy prawa Unii Europejskiej lub obowiązującego prawa krajowego. Przed wszczęciem postępowania sądowego zgadzasz się podjąć próbę polubownego rozwiązania sporu, wysyłając wiadomość na adres [legal@konvertools.com](mailto:legal@konvertools.com). Konsumenci z UE mogą również skorzystać z platformy do rozstrzygania sporów konsumenckich Komisji Europejskiej pod adresem [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Postanowienia ogólne",
        "blocks": [
          {
            "kind": "p",
            "text": "Jeśli jakiekolwiek postanowienie niniejszego Regulaminu zostanie uznane za nieważne lub nieegzekwowalne, pozostałe postanowienia pozostają w pełni skuteczne. Nasze niedopełnienie obowiązku egzekwowania jakiegokolwiek prawa lub postanowienia nie stanowi zrzeczenia się tego prawa. Niniejszy Regulamin (wraz z Polityką Prywatności i ewentualnymi warunkami dotyczącymi konkretnych planów, do których odwołano się podczas zakupu) stanowi całość porozumienia pomiędzy Tobą a Wydawcą dotyczącego Usługi."
          }
        ]
      }
    ]
  },
  "uk": {
    "h1": "Правила надання послуг",
    "lastUpdated": "2026-06-02",
    "lastUpdatedLabel": "Останнє оновлення: %DATE% · Використовуючи Konvertools, ви погоджуєтеся з цими правилами.",
    "sections": [
      {
        "id": "acceptance",
        "title": "1. Прийняття",
        "blocks": [
          {
            "kind": "p",
            "text": "Ці Правила надання послуг (далі — «Правила») є обов'язковим договором між вами (далі — «Користувач») та видавцем Konvertools (далі — «Видавець», «ми», «нас») щодо використання вами вебсайту Konvertools та усіх пов’язаних інструментів, API та послуг (далі — «Послуга»). Створюючи обліковий запис, встановлюючи прапорець прийняття під час реєстрації або просто використовуючи будь-який інструмент на Послузі, ви підтверджуєте, що ознайомилися, зрозуміли та повністю приймаєте ці Правила разом із нашою Політикою конфіденційності."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Послуга",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools надає каталог утиліт для конвертації файлів, інструменти для роботи з документами та зображеннями, AI-помічники для роботи з текстом, індикативні інструменти безпеки (сканер вірусів, валідатор електронних адрес, детектор фішингу, сканер URL-адрес) та розробницькі утиліти. Більшість інструментів працюють виключно у вашому браузері; деякі вимагають серверної обробки. Послуга надається **«як є»** та **«за наявності»** без будь-яких гарантій, прямо чи опосередковано, включаючи придатність для продажу, відповідність певній меті або відсутність порушень прав інтелектуальної власності."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Обмеження відповідальності — уважно прочитайте",
        "blocks": [
          {
            "kind": "p",
            "text": "**У межах, дозволених чинним законодавством, Видавець відмовляється від будь-якої відповідальності за шкоду будь-якого роду, що виникла внаслідок використання вами Послуги або неможливості її використання.** Зокрема, ви визнаєте та погоджуєтеся, що Видавець не нестиме відповідальності за:"
          },
          {
            "kind": "ul",
            "items": [
              "втрату даних, пошкоджені або неправильні файли, або невдалі конвертації;",
              "рішення, фінансові, бізнесові чи інші, які ви приймаєте на основі результатів роботи будь-якого інструменту;",
              "простої, затримки або тимчасову недоступність будь-якої функції;",
              "збої сторонніх сервісів (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, хостинг-провайдери);",
              "непрямі, випадкові, спеціальні, наслідкові чи штрафні збитки будь-якого роду;",
              "будь-яку сукупну суму, що перевищує плату, яку ви фактично сплатили нам протягом дванадцяти (12) місяців до події, що спричинила вимогу, з обмеженням у сто (100) євро для користувачів безкоштовного тарифу."
            ]
          },
          {
            "kind": "p",
            "text": "**Інструменти безпеки**: Сканер вірусів, Сканер URL-адрес, Детектор фішингу та Валідатор електронних адрес надаються **виключно в інформаційних та індикативних цілях**. Вони агрегують сторонні сигнали (70+ антивірусних движків VirusTotal, Google Safe Browsing, відкриті DNS) та евристику великих мовних моделей. Вони **не становлять жодної гарантії безпеки, дійсності чи відсутності ризику**. Новий шкідливий код може уникнути виявлення до оновлення антивірусних движків; нові фішингові сторінки з’являються швидше, ніж бази даних репутації встигають їх каталогізувати; електронний лист, який пройшов нашу перевірку, може виявитися недійсним або шахрайським. Видавець прямо відмовляється від будь-якої відповідальності за шкоду, спричинену шкідливим файлом, який Послуга не виявила, фішинговим листом, який Послуга визнала безпечним, небезпечним посиланням, яке Послуга не ідентифікувала, або транзакційним листом, надісланим на адресу, яку Послуга позначила як дійсну. Користувач несе повну відповідальність за рішення щодо безпеки, прийняті на основі цих інструментів."
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
              "завантаження, обробки або поширення контенту, який є незаконним у вашій країні чи у Франції;",
              "обробки файлів, щодо яких у вас немає необхідних прав (охоронювані авторським правом твори без дозволу, персональні дані, до яких ви не маєте права обробляти, засекречена інформація);",
              "вчинення або сприяння шахрайству, відмиванню грошей, фінансуванню тероризму чи будь-якої іншої злочинної діяльності;",
              "використання AI-гуманізатора, AI-інструментів для роботи з текстом або будь-якої іншої функції для плагіату, обману третьої сторони, маніпуляції системами оцінювання (академічними, рекрутинговими, рекламними мережами) у спосіб, що суперечить їхнім правилам, або для введення в оману в будь-який спосіб, що порушує чинне законодавство;",
              "завантаження шкідливого коду для тестування нашого сканера, якщо це порушує законодавство вашої країни (замість цього використовуйте тестовий файл EICAR);",
              "намагатися перевантажити, зворотньо розробляти, збирати дані, зловживати лімітами швидкості або іншим чином втручатися в роботу чи доступність Послуги;",
              "обходити квоти, вимоги до оплати або будь-які інші обмеження, що діють;",
              "створювати кілька облікових записів для збільшення лімітів безкоштовного тарифу або ділитися обліковим записом з більшою кількістю осіб, ніж дозволяє ваш тариф."
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
            "text": "Ви зберігаєте усі права, титул та інтереси щодо файлів і тексту, які ви надсилаєте до Послуги. Ви надаєте нам суворо обмежену, безоплатну, світову ліцензію на їх обробку виключно для надання запитаного вами інструменту. Ця ліцензія припиняється миттєво, щойно результат повертається вам (інструменти з серверною обробкою) або не виникає взагалі (інструменти, що працюють лише у браузері, оскільки ваш файл до нас не надходить). Ми не претендуємо і не будемо претендувати на право власності на ваш контент та не використовуватимемо його для навчання AI-моделей."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Облікові записи",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви повинні бути не молодшими за шістнадцять (16) років, щоб створити обліковий запис. Ви несете відповідальність за конфіденційність своїх облікових даних та за будь-яку діяльність, що відбувається під вашим обліковим записом. Негайно повідомте нас за адресою [security@konvertools.com](mailto:security@konvertools.com) про будь-яке підозрюване несанкціоноване використання."
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
              "**Автоматичне поновлення**: щомісячні та річні підписки поновлюються автоматично з тією ж періодичністю до моменту скасування. Ви можете скасувати підписку в будь-який час через свій кабінет; скасування набирає чинності наприкінці поточного платіжного періоду. Ви зберігаєте доступ до Послуги до цієї дати.",
              "**Право на відмову (ЄС)**: відповідно до статті L. 221-28 Французького кодексу захисту прав споживачів, коли ви активно використовуєте Послугу протягом початкового 14-денного періоду відмови, ви прямо погоджуєтеся на негайне виконання договору та відмовляєтеся від права на відмову. Якщо ви не використовували жодної платної функції, ви можете відмовитися протягом 14 днів, надіславши електронний лист на [billing@konvertools.com](mailto:billing@konvertools.com), і ми здійснимо повне повернення коштів протягом 14 днів.",
              "**Без часткового повернення коштів**: за межами вищеописаного сценарію відмови, вже сплачені за поточний платіжний період кошти не підлягають поверненню.",
              "**Кредити**: API-кредити, придбані як одноразові пакети («Starter», «Growth», «Scale», «Studio»), **не мають терміну придатності**. 300 кредитів, які автоматично надаються кожного місяця користувачам тарифу Business, втрачають чинність наприкінці календарного місяця та **не підлягають поверненню**.",
              "**Зміна цін**: ми можемо змінювати ціни з повідомленням за 30 днів. Існуючі підписники зберігають свою поточну ціну до наступної дати поновлення.",
              "**Податок**: ціни вказані без урахування ПДВ, де це застосовно. Stripe збирає та перераховує будь-який податок, що підлягає сплаті у вашій країні."
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
            "text": "Тариф Business надає публічний REST API, автентифікований за допомогою API-ключів, які ви генеруєте у своєму кабінеті. Використання API регулюється додатково наступними умовами:"
          },
          {
            "kind": "ul",
            "items": [
              "**Ліміти швидкості**: 60 запитів за хвилину (для додаткових пакетів Pro) або 120 запитів за хвилину (для Business). Постійне зловживання може призвести до тимчасового обмеження швидкості або остаточного скасування ключа.",
              "**Списання кредитів**: кожен запит до API списує кредити за тарифами, опублікованими в нашій [документації API](/api). Неуспішні запити (відповіді 5xx) не списують кредити.",
              "**Безпека ключів**: ви несете відповідальність за безпечне зберігання своїх API-ключів та їх зміну у разі компрометації. Ми можемо скасувати будь-який ключ у будь-який час, якщо підозрюємо зловживання.",
              "**Прийнятне використання сторонніми розробниками**: додатки, створені на основі нашого API, повинні відповідати цим Правилам, включаючи розділ щодо прийнятного використання. Ви не повинні надавати нашим API-ключам кінцевим користувачам (натомість ліцензуйте свою послугу)."
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
            "text": "Назва, логотип, код, дизайн, документація, структура бази даних та агрегований контент Послуги є виключною власністю Видавця та захищені французьким та міжнародним законодавством про інтелектуальну власність. Вам надається лише ліцензія, суворо необхідна для використання Послуги за призначенням. Ви не можете відтворювати, змінювати, декомпілювати чи створювати похідні роботи щодо Послуги або будь-якої її частини, окрім випадків, прямо дозволених чинним законодавством."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Відшкодування збитків",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви погоджуєтеся відшкодовувати Видавцю та захищати його від будь-яких претензій, збитків, шкоди, відповідальності, витрат чи витрат (включаючи розумні юридичні гонорари), що виникають через (a) ваше порушення цих Правил, (b) ваше порушення будь-якого закону чи прав третьої сторони, або (c) будь-який контент, який ви надіслали до Послуги."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Зміни до Правил",
        "blocks": [
          {
            "kind": "p",
            "text": "Ми можемо періодично змінювати ці Правила. Істотні зміни буде повідомлено електронною поштою власникам облікових записів щонайменше за тридцять (30) днів до набрання ними чинності. Продовжуючи використовувати Послугу після цього періоду, ви приймаєте змінені Правила. Остання версія завжди доступна за адресою [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Припинення дії",
        "blocks": [
          {
            "kind": "p",
            "text": "Ви можете закрити свій обліковий запис у будь-який час через свій кабінет. Ми можемо негайно закрити або призупинити ваш обліковий запис без попередження, якщо ви порушили ці Правила, зловживаєте Послугою або не сплачуєте періодичну підписку. Після закриття ваші дані видаляються протягом тридцяти (30) днів, окрім записів про оплату та згод, які зберігаються відповідно до нашої Політики конфіденційності."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Застосовне право та юрисдикція",
        "blocks": [
          {
            "kind": "p",
            "text": "Ці Правила регулюються законодавством Франції. Будь-які спори, що виникають у зв’язку з цими Правилами або Послугою, підлягають виключній юрисдикції судів Парижа, Франція, окрім випадків, коли обов’язкове право споживача на судовий захист у країні його проживання переважає відповідно до законодавства Європейського Союзу або національного законодавства. Перш ніж розпочинати юридичні дії, ви погоджуєтеся спробувати врегулювати спір мирним шляхом, надіславши листа на [legal@konvertools.com](mailto:legal@konvertools.com). Споживачі з ЄС також можуть скористатися платформою Європейської комісії з вирішення онлайн-спорів за адресою [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Інші положення",
        "blocks": [
          {
            "kind": "p",
            "text": "Якщо будь-яке положення цих Правил визнано недійсним або нездійсненним, інші положення залишаються в повній силі. Наше невиконання будь-якого права чи положення не є відмовою від цього права. Ці Правила (разом із Політикою конфіденційності та будь-якими специфічними умовами тарифу, на які ми посилаємося під час покупки) становлять повну угоду між вами та Видавцем щодо Послуги."
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
            "text": "Tyto Služební podmínky (dále jen „Podmínky“) tvoří závaznou dohodu mezi vámi (dále jen „Uživatel“) a vydavatelem služby Konvertools (dále jen „Vydavatel“, „my“, „nás“) týkající se vašeho používání webových stránek Konvertools a všech souvisejících nástrojů, API a služeb (dohromady „Služba“). Vytvořením účtu, zaškrtnutím políčka pro přijetí podmínek při registraci nebo pouhým použitím jakéhokoli nástroje na Službě potvrzujete, že jste si tyto Podmínky přečetli, porozuměli jim a plně je přijímáte spolu s naší Zásadou ochrany osobních údajů."
          }
        ]
      },
      {
        "id": "service",
        "title": "2. Služba",
        "blocks": [
          {
            "kind": "p",
            "text": "Konvertools poskytuje katalog nástrojů pro převody souborů, zpracování dokumentů a obrázků, nástroje s podporou AI, indikativní bezpečnostní nástroje (skener virů, ověřovač e-mailů, detektor phishingu, skener URL) a nástroje pro vývojáře. Většina nástrojů běží zcela ve vašem prohlížeči; některé vyžadují zpracování na serveru. Služba je poskytována **„tak, jak je“** a **„tak, jak je k dispozici“** bez jakékoli záruky, ať už výslovné či implicitní, včetně záruk obchodovatelnosti, vhodnosti pro konkrétní účel nebo neporušení práv třetích stran."
          }
        ]
      },
      {
        "id": "liability",
        "title": "3. Omezení odpovědnosti — pozorně si přečtěte",
        "blocks": [
          {
            "kind": "p",
            "text": "**V maximální míře povolené zákonem Vydavatel odmítá jakoukoli odpovědnost za škody jakéhokoli druhu vzniklé v důsledku vašeho používání Služby nebo neschopnosti ji používat.** Konkrétně uznáváte a souhlasíte s tím, že Vydavatel nebude odpovědný za:"
          },
          {
            "kind": "ul",
            "items": [
              "ztrátu dat, poškozené nebo nesprávné soubory či selhání převodů;",
              "rozhodnutí, finanční, obchodní či jiná, která učiníte na základě výstupu z jakéhokoli nástroje;",
              "doby nečinnosti, latenci či dočasnou nedostupnost jakékoli funkce;",
              "selhání služeb třetích stran (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, poskytovatelé hostingu);",
              "nepřímé, vedlejší, zvláštní, následné či trestné škody jakéhokoli druhu;",
              "jakékoli souhrnné částky převyšující poplatky, které jste nám skutečně zaplatili během dvanácti (12) měsíců předcházejících události, která dala vzniknout nároku, a to maximálně sto (100) eur pro uživatele bez placeného tarifu."
            ]
          },
          {
            "kind": "p",
            "text": "**Bezpečnostní nástroje**: Skener virů, Skener URL, Detektor phishingu a Ověřovač e-mailů slouží pouze **pro informační a indikativní účely**. Tyto nástroje agregují signály třetích stran (70+ antivirových enginů VirusTotal, Google Safe Browsing, veřejné DNS) a heuristiky velkých jazykových modelů. **Nezaručují bezpečnost, platnost ani absenci rizika**. Nový malware může unikat detekci až do aktualizace antivirových enginů; nové phishingové stránky se objevují rychleji, než je mohou databáze reputace katalogizovat; e-mail, který projde našimi kontrolami, může být stále neaktivní či podvodný. Vydavatel výslovně odmítá jakoukoli odpovědnost za jakoukoli újmu způsobenou škodlivým souborem, který Služba neoznačila, phishingovým e-mailem, který Služba považovala za bezpečný, nebezpečným odkazem, který Služba nezjistila, či transakčním e-mailem odeslaným na adresu, kterou Služba označila jako platnou. Uživatel nese veškerou odpovědnost za bezpečnostní rozhodnutí učiněná na základě těchto nástrojů."
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
              "nahrávání, zpracování či distribuci obsahu, který je v vaší jurisdikci či ve Francii nelegální;",
              "zpracování souborů, k nimž nemáte potřebná práva (autorskoprávně chráněná díla bez souhlasu, osobní údaje, které nemáte oprávnění zpracovávat, utajované informace);",
              "páchání či usnadňování podvodů, praní špinavých peněz, financování terorismu či jakékoli trestné činnosti;",
              "používání nástrojů pro humanizaci AI, nástrojů pro texty s podporou AI či jakékoli jiné funkce k plagiátorství, k podvodu třetí strany, k manipulaci hodnocení systémů (akademických, náborových, reklamních sítí) způsobem, který porušuje jejich pravidla, či k jakémukoli jinému klamání v rozporu s platnými zákony;",
              "nahrávání škodlivého softwaru za účelem testování našeho skeneru, pokud by to bylo v rozporu se zákonem ve vaší jurisdikci (místo toho použijte testovací soubor EICAR);",
              "pokusům o přetížení, reverzní inženýrství, scraping, zneužívání limitů rychlosti či jinému zasahování do provozu či dostupnosti Služby;",
              "obcházení kvót, platebních požadavků či jakýchkoli jiných omezení;",
              "vytváření více účtů za účelem násobení kvót bez placeného tarifu či sdílení jednoho účtu s větším počtem osob, než umožňuje váš tarif."
            ]
          },
          {
            "kind": "p",
            "text": "Můžeme váš účet okamžitě a bez upozornění pozastavit či ukončit, pokud máme oprávněné důvody domnívat se, že jste tuto sekci porušili, a to bez nároku na jakoukoli refundaci."
          }
        ]
      },
      {
        "id": "content",
        "title": "5. Váš obsah",
        "blocks": [
          {
            "kind": "p",
            "text": "Všechna práva, vlastnictví a oprávnění k souborům a textům, které do Služby nahrajete, zůstávají nadále ve vašem vlastnictví. Poskytujete nám striktně omezenou, bezúplatnou, celosvětovou licenci k jejich zpracování výhradně za účelem poskytnutí nástroje, který jste si vyžádali. Tato licence zaniká okamžikem vrácení výsledku (nástroje využívající serverové zpracování) či vůbec nevzniká (nástroje běžící pouze v prohlížeči, protože váš soubor k nám vůbec nedorazí). Netvrdíme si vlastnictví vašeho obsahu ani jej nepoužíváme k trénování AI modelů."
          }
        ]
      },
      {
        "id": "accounts",
        "title": "6. Účty",
        "blocks": [
          {
            "kind": "p",
            "text": "Pro vytvoření účtu musíte být starší šestnácti (16) let. Jste odpovědní za utajení svých přihlašovacích údajů a za jakoukoli činnost, která proběhne pod vaším účtem. Okamžitě nás informujte na adrese [security@konvertools.com](mailto:security@konvertools.com) o jakémkoli podezření na neoprávněný přístup."
          }
        ]
      },
      {
        "id": "subscriptions",
        "title": "7. Předplatné, platby a vrácení peněz",
        "blocks": [
          {
            "kind": "ul",
            "items": [
              "**Tarify**: Bezplatný (0 €), Pro (12 €/měsíc nebo 99 €/rok), Business (39 €/měsíc nebo 349 €/rok). Funkce a kvóty tarifů jsou popsány na naší stránce [Ceník](/pricing) v době nákupu. Vyhrazujeme si právo měnit funkce tarifů s 30denním předstihem.",
              "**Automatické prodloužení**: Měsíční a roční předplatné se automaticky prodlužují stejnou frekvencí až do zrušení. Můžete je zrušit kdykoli z vašeho panelu; zrušení nabývá účinnosti na konci aktuálního fakturačního období. Přístup si ponecháte až do tohoto data.",
              "**Právo na odstoupení (EU)**: podle článku L. 221-28 francouzského spotřebitelského zákoníku, pokud aktivně používáte Službu během počátečního 14denního období pro odstoupení, výslovně souhlasíte s okamžitým plněním smlouvy a vzdáváte se práva na odstoupení. Pokud jste nepoužili žádnou placenou funkci, můžete odstoupit do 14 dnů zasláním e-mailu na [billing@konvertools.com](mailto:billing@konvertools.com) a my vám do 14 dnů vydáme plnou refundaci.",
              "**Žádné částečné vrácení peněz**: Mimo výše uvedený scénář pro odstoupení jsou již zaplacené poplatky za aktuální fakturační období nevratné.",
              "**Kredity**: API kredity zakoupené jako jednorázové balíčky („Starter“, „Growth“, „Scale“, „Studio“) **nikdy nevyprší**. 300 kreditů automaticky přidělovaných každý měsíc uživatelům tarifu Business vyprší na konci kalendářního měsíce a **nejsou vratné**.",
              "**Změny cen**: Můžeme ceny změnit s 30denním předstihem. Stávající předplatitelé si ponechávají svou aktuální cenu až do dalšího data obnovy.",
              "**Daň**: Ceny jsou uváděny bez DPH, pokud je to relevantní. Společnost Stripe vybírá a odvádí jakoukoli daň, která je ve vaší jurisdikci povinná."
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
            "text": "Tarif Business poskytuje veřejné REST API autentizované pomocí API klíčů, které si generujete ve svém panelu. Použití API je dále upraveno následujícími podmínkami:"
          },
          {
            "kind": "ul",
            "items": [
              "**Limit rychlosti**: 60 požadavků za minutu (překročení tarifu Pro) nebo 120 požadavků za minutu (tarif Business). Trvalé zneužívání může vést k dočasnému omezování či trvalému odebrání klíče.",
              "**Spotřeba kreditů**: Každý požadavek na API odečte kredity podle sazeb zveřejněných v naší [dokumentaci k API](/api). Neúspěšné požadavky (5xx odpovědi) kredity neodečítají.",
              "**Zabezpečení klíčů**: Jste odpovědní za bezpečné uložení svých API klíčů a jejich rotaci v případě kompromitace. Můžeme kdykoli odebrat jakýkoli klíč, pokud máme podezření na zneužití.",
              "**Přípustné upstream použití**: Aplikace postavené na našem API musí splňovat tyto Podmínky, včetně části o přípustném použití. Nesmíte vystavovat naše API klíče koncovým uživatelům (místo toho sublicencujte svou službu)."
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
            "text": "Název, logo, kód, design, dokumentace, struktura databáze a agregovaný obsah Služby jsou výhradním vlastnictvím Vydavatele a jsou chráněny francouzskými a mezinárodními zákony o duševním vlastnictví. Vám není poskytnuta žádná licence kromě té, která je nezbytně nutná k používání Služby tak, jak je zamýšleno. Nesmíte reprodukovat, upravovat, dekompilovat ani vytvářet odvozená díla Služby či její části, ledaže by to bylo výslovně povoleno platným zákonem."
          }
        ]
      },
      {
        "id": "indemnity",
        "title": "10. Indemnifikace",
        "blocks": [
          {
            "kind": "p",
            "text": "Souhlasíte, že budete Vydavatele chránit a uhradíte mu jakýkoli nárok, ztrátu, škodu, odpovědnost, náklad či výdaj (včetně přiměřených právních poplatků), který vznikne v důsledku (a) vašeho porušení těchto Podmínek, (b) porušení jakéhokoli zákona či práv třetích stran, nebo (c) jakéhokoli obsahu, který jste do Služby nahráli."
          }
        ]
      },
      {
        "id": "changes",
        "title": "11. Změny Podmínek",
        "blocks": [
          {
            "kind": "p",
            "text": "Můžeme tyto Podmínky občas měnit. Podstatné změny budou oznámeny e-mailem držitelům účtů alespoň třicet (30) dní před jejich nabytím účinnosti. Pokračováním v používání Služby po uplynutí této lhůty přijímáte změněné Podmínky. Nejnovější verze je vždy k dispozici na [https://konvertools.com/terms](https://konvertools.com/terms)."
          }
        ]
      },
      {
        "id": "termination",
        "title": "12. Ukončení",
        "blocks": [
          {
            "kind": "p",
            "text": "Můžete si svůj účet kdykoli ukončit prostřednictvím svého panelu. Můžeme váš účet okamžitě a bez upozornění ukončit či pozastavit, pokud porušíte tyto Podmínky, zneužijete Službu či nezaplatíte opakující se předplatné. Po ukončení jsou vaše data smazána do třiceti (30) dnů, kromě fakturačních a souhlasových záznamů, které jsou uchovány tak, jak je popsáno v naší Zásadě ochrany osobních údajů."
          }
        ]
      },
      {
        "id": "law",
        "title": "13. Předmět právní úpravy a příslušnost",
        "blocks": [
          {
            "kind": "p",
            "text": "Tyto Podmínky se řídí právem Francie. Jakýkoli spor vzniklý v souvislosti s těmito Podmínkami či Službou bude podroben výlučné příslušnosti soudů v Paříži ve Francii, s výjimkou případů, kdy má spotřebitel podle evropského či národního práva nárok na soudní ochranu ve své zemi bydliště. Před zahájením právních kroků se dohodněte na mimosoudním řešení sporu zasláním zprávy na [legal@konvertools.com](mailto:legal@konvertools.com). Spotřebitelé z EU mohou také využít platformu pro řešení sporů Evropské komise na adrese [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)."
          }
        ]
      },
      {
        "id": "misc",
        "title": "14. Různé",
        "blocks": [
          {
            "kind": "p",
            "text": "Pokud je jakákoli část těchto Podmínek shledána neplatnou či nevymahatelnou, zbytek zůstává v plném rozsahu účinný. Naše neprosazování jakéhokoli práva či ustanovení není zřeknutím se tohoto práva. Tyto Podmínky (spolu se Zásadou ochrany osobních údajů a jakýmikoli tarifově specifickými podmínkami uvedenými při nákupu) tvoří celou dohodu mezi vámi a Vydavatelem týkající se Služby."
          }
        ]
      }
    ]
  }
};
