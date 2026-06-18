import { type Locale } from "@/lib/i18n/locales";

/**
 * Localised prose for the REST API documentation page (/api and /<locale>/api).
 *
 * Only HUMAN PROSE lives here — section headings, endpoint descriptions, error
 * "When" descriptions, the scope paragraphs, sidebar cards and labels. Code
 * samples (the cURL / JavaScript snippets), JSON response bodies, HTTP status
 * codes and machine-readable error codes (bad_request, 402, …) stay in the page
 * as English constants and are NEVER translated.
 *
 * English is the base and the fallback for any locale not present here (same
 * degradation as the other i18n dictionaries). Endpoint descriptions are keyed
 * by their `action`; error descriptions are keyed by their error `name`.
 */
export type ApiStrings = {
  sections: {
    auth: string;
    covers: string;
    endpoints: string;
    errors: string;
    privacy: string;
  };
  auth: {
    /** Prose around the Authorization header / dashboard link. */
    intro1: string;
    dashboardLink: string;
    intro2: string;
    /** Label before the base URL value. */
    baseUrlLabel: string;
    /** Sentence describing the rate limit. The numbers/tokens stay literal. */
    rateLimit1: string;
    rateLimit2: string;
    rateLimit3: string;
  };
  covers: {
    /** "What the API covers" — three paragraphs of prose. */
    p1a: string;
    p1Transcription: string;
    p1b: string;
    p1TextAi: string;
    p1c: string;
    p2a: string;
    browserToolsLink: string;
    p2b: string;
    p3: string;
  };
  /** Endpoint descriptions, keyed by their action. */
  endpoints: Record<
    | "me"
    | "transcribe"
    | "translate"
    | "rephrase"
    | "summarize"
    | "humanize"
    | "convert_code"
    | "job"
    | "remove_background"
    | "convert_pdf"
    | "convert_image",
    string
  >;
  /** Error "When" descriptions, keyed by the error name. */
  errors: Record<
    | "bad_request"
    | "invalid_api_key"
    | "insufficient_credits"
    | "job_not_found"
    | "text_too_long"
    | "rate_limited"
    | "server_error"
    | "processing_failed",
    string
  >;
  /** Labels for the errors section + table columns. */
  errorsIntro1: string;
  errorsIntro2: string;
  errorsTableHttp: string;
  errorsTableError: string;
  errorsTableWhen: string;
  errorExampleLabel: string;
  /** Privacy paragraph. */
  privacyBody: string;
  /** Sidebar cards. */
  sidebar: {
    getKeyTitle: string;
    getKeyBody: string;
    seePricing: string;
    creditPacksTitle: string;
    creditPacksNote: string;
    costTableTitle: string;
  };
  /** The live tester card (ApiTesterClient). */
  tester: {
    title: string;
    lead: string;
    keyPlaceholder: string;
    inputPlaceholder: string;
    calling: string;
    test: string;
    creditsRemaining: (n: string) => string;
    networkError: (msg: string) => string;
    httpError: (status: string, code: string, message: string) => string;
  };
};

const en: ApiStrings = {
  sections: {
    auth: "Authentication",
    covers: "What the API covers",
    endpoints: "Endpoints",
    errors: "Errors",
    privacy: "Privacy",
  },
  auth: {
    intro1: "with every request. Generate a key from your",
    dashboardLink: "dashboard",
    intro2:
      "(Business plan). Each call spends credits from your balance — credits never expire.",
    baseUrlLabel: "Base URL:",
    rateLimit1: "Rate limit:",
    rateLimit2: "60 requests/minute",
    rateLimit3: "per key. Exceeding it returns",
  },
  covers: {
    p1a: "The API is",
    p1Transcription: "transcription",
    p1b: "(audio/video → text, Voxtral) and",
    p1TextAi: "text & AI",
    p1c:
      "(translate, summarise, rephrase, humanise, convert code). OCR and server-side video/heavy-format conversions are rolling out next.",
    p2a: "Our",
    browserToolsLink: "browser tools",
    p2b:
      "— image, PDF and audio edits, background removal, format conversions — are not in the API, by design. They run entirely in the visitor’s browser, so there is nothing to call server-side: the file never leaves the device and these tools stay free, unlimited and private. Run them client-side in your own product instead.",
    p3:
      "The same per-plan limits apply to API calls as to the web app. Uploads are capped by plan (Free 20 MB · Pro 1 GB · Business 5 GB) and enforced server-side; long media is billed per started minute, so video length is bounded by your credit balance rather than a hard cut-off. Every call is metered against your key — {api_keys} → {jobs} → {credit_transactions} — and follows one lifecycle: create the task → send the file → we process it → you fetch the result → the file is deleted. The Mistral key stays secret on our servers and is never exposed.",
  },
  endpoints: {
    me: "Account info: plan, credit balance, email, max file size.",
    transcribe:
      "Audio / video → timestamped SRT. Billed per started minute (61s = 2 min = 20). Multipart `file`, or JSON { file_url }.",
    translate:
      "Translate text or an SRT/VTT file (timestamps preserved). Billed per started 1000 words, minimum 5. Params: `target_lang`, `style`.",
    rephrase:
      "Rewrite text in a chosen style. 3 credits up to 500 words, 8 beyond. Params: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Summarise text. 3 credits up to 500 words, 6 beyond. Params: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Rewrite AI text so it reads naturally. 5 credits up to 500 words, 12 beyond. Params: `text`, `level` (light/medium/strong).",
    convert_code:
      "Convert source code between languages. Params: `code`, `from_language`, `to_language`.",
    job: "Fetch a job by id. Pass &id=<uuid>.",
    remove_background:
      "Cut out a transparent PNG. Runs in-browser today (free & unlimited); REST access is rolling out.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Runs in-browser today; REST access is rolling out.",
    convert_image:
      "Re-encode to a target format with quality/resize. Runs in-browser today; REST access is rolling out.",
  },
  errors: {
    bad_request: "Missing or invalid parameter — the message says which.",
    invalid_api_key: "Key missing, not found, or revoked.",
    insufficient_credits:
      "Balance too low — response includes how many you need.",
    job_not_found: "That job id doesn't belong to your account.",
    text_too_long: "Keep text payloads under 40,000 characters.",
    rate_limited: "Too many requests — retry after the indicated delay.",
    server_error: "Something broke on our side — retry.",
    processing_failed: "Upstream model error — you are not charged.",
  },
  errorsIntro1:
    "Every endpoint returns a consistent JSON envelope with an",
  errorsIntro2: "code and a human-readable",
  errorsTableHttp: "HTTP",
  errorsTableError: "error",
  errorsTableWhen: "When",
  errorExampleLabel: "402 example",
  privacyBody:
    "Result files in results/ storage carry a 10-minute signed URL and are deleted within 30 minutes by a scheduled purge. Job rows are deleted after 2 hours. File content is never retained beyond that window.",
  sidebar: {
    getKeyTitle: "Get an API key",
    getKeyBody:
      "The REST API is included with the Business plan (€79/month) — 300 credits every month, plus top-up packs that never expire.",
    seePricing: "See pricing →",
    creditPacksTitle: "Credit packs",
    creditPacksNote: "Top-ups never expire.",
    costTableTitle: "Cost table",
  },
  tester: {
    title: "Try it live",
    lead: "Paste your API key, pick an endpoint, we make the real call and show the response.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Text to send…",
    calling: "Calling…",
    test: "Test",
    creditsRemaining: (n) => `${n} credits remaining`,
    networkError: (msg) => `Network error: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const fr: ApiStrings = {
  sections: {
    auth: "Authentification",
    covers: "Ce que couvre l’API",
    endpoints: "Points de terminaison",
    errors: "Erreurs",
    privacy: "Confidentialité",
  },
  auth: {
    intro1: "avec chaque requête. Générez une clé depuis votre",
    dashboardLink: "tableau de bord",
    intro2:
      "(offre Business). Chaque appel consomme des crédits de votre solde — les crédits n’expirent jamais.",
    baseUrlLabel: "URL de base :",
    rateLimit1: "Limite de débit :",
    rateLimit2: "60 requêtes/minute",
    rateLimit3: "par clé. La dépasser renvoie",
  },
  covers: {
    p1a: "L’API est",
    p1Transcription: "la transcription",
    p1b: "(audio/vidéo → texte, Voxtral) et",
    p1TextAi: "le texte & l’IA",
    p1c:
      "(traduire, résumer, reformuler, humaniser, convertir du code). L’OCR et les conversions vidéo/formats lourds côté serveur arrivent ensuite.",
    p2a: "Nos",
    browserToolsLink: "outils navigateur",
    p2b:
      "— retouches d’image, PDF et audio, suppression d’arrière-plan, conversions de format — ne sont pas dans l’API, par conception. Ils s’exécutent entièrement dans le navigateur du visiteur, il n’y a donc rien à appeler côté serveur : le fichier ne quitte jamais l’appareil et ces outils restent gratuits, illimités et privés. Exécutez-les côté client dans votre propre produit.",
    p3:
      "Les mêmes limites par offre s’appliquent aux appels API qu’à l’application web. Les envois sont plafonnés selon l’offre (Free 20 Mo · Pro 1 Go · Business 5 Go) et appliqués côté serveur ; les médias longs sont facturés par minute entamée, donc la durée d’une vidéo est limitée par votre solde de crédits plutôt que par un plafond strict. Chaque appel est comptabilisé sur votre clé — {api_keys} → {jobs} → {credit_transactions} — et suit un seul cycle de vie : créer la tâche → envoyer le fichier → nous le traitons → vous récupérez le résultat → le fichier est supprimé. La clé Mistral reste secrète sur nos serveurs et n’est jamais exposée.",
  },
  endpoints: {
    me: "Infos du compte : offre, solde de crédits, e-mail, taille de fichier max.",
    transcribe:
      "Audio / vidéo → SRT horodaté. Facturé par minute entamée (61 s = 2 min = 20). `file` multipart, ou JSON { file_url }.",
    translate:
      "Traduit du texte ou un fichier SRT/VTT (horodatages préservés). Facturé par tranche de 1000 mots entamée, minimum 5. Paramètres : `target_lang`, `style`.",
    rephrase:
      "Réécrit le texte dans un style choisi. 3 crédits jusqu’à 500 mots, 8 au-delà. Paramètres : `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Résume le texte. 3 crédits jusqu’à 500 mots, 6 au-delà. Paramètres : `text`, `format` (short/bullets/detailed).",
    humanize:
      "Réécrit un texte d’IA pour qu’il se lise naturellement. 5 crédits jusqu’à 500 mots, 12 au-delà. Paramètres : `text`, `level` (light/medium/strong).",
    convert_code:
      "Convertit du code source d’un langage à un autre. Paramètres : `code`, `from_language`, `to_language`.",
    job: "Récupère une tâche par identifiant. Ajoutez &id=<uuid>.",
    remove_background:
      "Détoure un PNG transparent. Fonctionne dans le navigateur aujourd’hui (gratuit & illimité) ; l’accès REST se déploie progressivement.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Fonctionne dans le navigateur aujourd’hui ; l’accès REST se déploie progressivement.",
    convert_image:
      "Réencode vers un format cible avec qualité/redimensionnement. Fonctionne dans le navigateur aujourd’hui ; l’accès REST se déploie progressivement.",
  },
  errors: {
    bad_request: "Paramètre manquant ou invalide — le message précise lequel.",
    invalid_api_key: "Clé manquante, introuvable ou révoquée.",
    insufficient_credits:
      "Solde trop faible — la réponse indique combien il vous en faut.",
    job_not_found: "Cet identifiant de tâche n’appartient pas à votre compte.",
    text_too_long: "Gardez les charges de texte sous 40 000 caractères.",
    rate_limited: "Trop de requêtes — réessayez après le délai indiqué.",
    server_error: "Un problème est survenu de notre côté — réessayez.",
    processing_failed: "Erreur du modèle en amont — vous n’êtes pas facturé.",
  },
  errorsIntro1:
    "Chaque point de terminaison renvoie une enveloppe JSON cohérente avec un code",
  errorsIntro2: "et un message lisible",
  errorsTableHttp: "HTTP",
  errorsTableError: "erreur",
  errorsTableWhen: "Quand",
  errorExampleLabel: "Exemple 402",
  privacyBody:
    "Les fichiers de résultat dans le stockage results/ portent une URL signée de 10 minutes et sont supprimés dans les 30 minutes par une purge planifiée. Les enregistrements de tâche sont supprimés après 2 heures. Le contenu des fichiers n’est jamais conservé au-delà de cette fenêtre.",
  sidebar: {
    getKeyTitle: "Obtenir une clé API",
    getKeyBody:
      "L’API REST est incluse dans l’offre Business (79 €/mois) — 300 crédits chaque mois, plus des packs de recharge qui n’expirent jamais.",
    seePricing: "Voir les tarifs →",
    creditPacksTitle: "Packs de crédits",
    creditPacksNote: "Les recharges n’expirent jamais.",
    costTableTitle: "Tableau des coûts",
  },
  tester: {
    title: "Essayer en direct",
    lead: "Collez votre clé API, choisissez un point de terminaison, nous faisons l’appel réel et affichons la réponse.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Texte à envoyer…",
    calling: "Appel en cours…",
    test: "Tester",
    creditsRemaining: (n) => `${n} crédits restants`,
    networkError: (msg) => `Erreur réseau : ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? ` : ${message}` : ""}`,
  },
};

const es: ApiStrings = {
  sections: {
    auth: "Autenticación",
    covers: "Qué cubre la API",
    endpoints: "Puntos de acceso",
    errors: "Errores",
    privacy: "Privacidad",
  },
  auth: {
    intro1: "con cada solicitud. Genera una clave desde tu",
    dashboardLink: "panel",
    intro2:
      "(plan Business). Cada llamada gasta créditos de tu saldo — los créditos nunca caducan.",
    baseUrlLabel: "URL base:",
    rateLimit1: "Límite de solicitudes:",
    rateLimit2: "60 solicitudes/minuto",
    rateLimit3: "por clave. Superarlo devuelve",
  },
  covers: {
    p1a: "La API es",
    p1Transcription: "transcripción",
    p1b: "(audio/vídeo → texto, Voxtral) y",
    p1TextAi: "texto e IA",
    p1c:
      "(traducir, resumir, reformular, humanizar, convertir código). El OCR y las conversiones de vídeo/formatos pesados del lado del servidor llegarán a continuación.",
    p2a: "Nuestras",
    browserToolsLink: "herramientas de navegador",
    p2b:
      "— ediciones de imagen, PDF y audio, eliminación de fondo, conversiones de formato — no están en la API, por diseño. Se ejecutan por completo en el navegador del visitante, así que no hay nada que llamar del lado del servidor: el archivo nunca sale del dispositivo y estas herramientas siguen siendo gratuitas, ilimitadas y privadas. Ejecútalas del lado del cliente en tu propio producto.",
    p3:
      "Los mismos límites por plan se aplican a las llamadas de la API que a la aplicación web. Las cargas están limitadas según el plan (Free 20 MB · Pro 1 GB · Business 5 GB) y se aplican del lado del servidor; los medios largos se facturan por minuto iniciado, así que la duración del vídeo está limitada por tu saldo de créditos en lugar de por un corte estricto. Cada llamada se contabiliza con tu clave — {api_keys} → {jobs} → {credit_transactions} — y sigue un único ciclo de vida: crear la tarea → enviar el archivo → lo procesamos → recuperas el resultado → el archivo se elimina. La clave de Mistral permanece secreta en nuestros servidores y nunca se expone.",
  },
  endpoints: {
    me: "Información de la cuenta: plan, saldo de créditos, correo electrónico, tamaño máximo de archivo.",
    transcribe:
      "Audio / vídeo → SRT con marcas de tiempo. Facturado por minuto iniciado (61 s = 2 min = 20). `file` multipart, o JSON { file_url }.",
    translate:
      "Traduce texto o un archivo SRT/VTT (se conservan las marcas de tiempo). Facturado por cada 1000 palabras iniciadas, mínimo 5. Parámetros: `target_lang`, `style`.",
    rephrase:
      "Reescribe el texto en un estilo elegido. 3 créditos hasta 500 palabras, 8 más allá. Parámetros: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Resume texto. 3 créditos hasta 500 palabras, 6 más allá. Parámetros: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Reescribe texto de IA para que se lea con naturalidad. 5 créditos hasta 500 palabras, 12 más allá. Parámetros: `text`, `level` (light/medium/strong).",
    convert_code:
      "Convierte código fuente entre lenguajes. Parámetros: `code`, `from_language`, `to_language`.",
    job: "Recupera una tarea por id. Añade &id=<uuid>.",
    remove_background:
      "Recorta un PNG transparente. Hoy se ejecuta en el navegador (gratis e ilimitado); el acceso REST se está implementando.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Hoy se ejecuta en el navegador; el acceso REST se está implementando.",
    convert_image:
      "Recodifica a un formato de destino con calidad/redimensionado. Hoy se ejecuta en el navegador; el acceso REST se está implementando.",
  },
  errors: {
    bad_request: "Parámetro ausente o inválido — el mensaje indica cuál.",
    invalid_api_key: "Clave ausente, no encontrada o revocada.",
    insufficient_credits:
      "Saldo demasiado bajo — la respuesta incluye cuántos necesitas.",
    job_not_found: "Ese id de tarea no pertenece a tu cuenta.",
    text_too_long: "Mantén las cargas de texto por debajo de 40 000 caracteres.",
    rate_limited: "Demasiadas solicitudes — reintenta tras el retraso indicado.",
    server_error: "Algo falló de nuestro lado — reintenta.",
    processing_failed: "Error del modelo de origen — no se te cobra.",
  },
  errorsIntro1:
    "Cada punto de acceso devuelve un envoltorio JSON coherente con un código",
  errorsIntro2: "y un mensaje legible",
  errorsTableHttp: "HTTP",
  errorsTableError: "error",
  errorsTableWhen: "Cuándo",
  errorExampleLabel: "Ejemplo 402",
  privacyBody:
    "Los archivos de resultado en el almacenamiento results/ llevan una URL firmada de 10 minutos y se eliminan en un plazo de 30 minutos mediante una purga programada. Las filas de tareas se eliminan tras 2 horas. El contenido de los archivos nunca se conserva más allá de esa ventana.",
  sidebar: {
    getKeyTitle: "Obtener una clave de API",
    getKeyBody:
      "La API REST está incluida en el plan Business (79 €/mes) — 300 créditos cada mes, más packs de recarga que nunca caducan.",
    seePricing: "Ver precios →",
    creditPacksTitle: "Packs de créditos",
    creditPacksNote: "Las recargas nunca caducan.",
    costTableTitle: "Tabla de costes",
  },
  tester: {
    title: "Pruébalo en vivo",
    lead: "Pega tu clave de API, elige un punto de acceso, hacemos la llamada real y mostramos la respuesta.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Texto a enviar…",
    calling: "Llamando…",
    test: "Probar",
    creditsRemaining: (n) => `${n} créditos restantes`,
    networkError: (msg) => `Error de red: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const pt: ApiStrings = {
  sections: {
    auth: "Autenticação",
    covers: "O que a API cobre",
    endpoints: "Endpoints",
    errors: "Erros",
    privacy: "Privacidade",
  },
  auth: {
    intro1: "com cada requisição. Gere uma chave a partir do seu",
    dashboardLink: "painel",
    intro2:
      "(plano Business). Cada chamada gasta créditos do seu saldo — os créditos nunca expiram.",
    baseUrlLabel: "URL base:",
    rateLimit1: "Limite de requisições:",
    rateLimit2: "60 requisições/minuto",
    rateLimit3: "por chave. Ultrapassá-lo retorna",
  },
  covers: {
    p1a: "A API é",
    p1Transcription: "transcrição",
    p1b: "(áudio/vídeo → texto, Voxtral) e",
    p1TextAi: "texto e IA",
    p1c:
      "(traduzir, resumir, reformular, humanizar, converter código). O OCR e as conversões de vídeo/formatos pesados no lado do servidor chegarão em seguida.",
    p2a: "Nossas",
    browserToolsLink: "ferramentas de navegador",
    p2b:
      "— edições de imagem, PDF e áudio, remoção de fundo, conversões de formato — não estão na API, por design. Elas rodam inteiramente no navegador do visitante, então não há nada a chamar no lado do servidor: o arquivo nunca sai do dispositivo e essas ferramentas permanecem gratuitas, ilimitadas e privadas. Rode-as no lado do cliente no seu próprio produto.",
    p3:
      "Os mesmos limites por plano se aplicam às chamadas da API e ao aplicativo web. Os envios são limitados por plano (Free 20 MB · Pro 1 GB · Business 5 GB) e aplicados no lado do servidor; mídias longas são cobradas por minuto iniciado, então a duração do vídeo é limitada pelo seu saldo de créditos em vez de um corte rígido. Cada chamada é medida em relação à sua chave — {api_keys} → {jobs} → {credit_transactions} — e segue um único ciclo de vida: criar a tarefa → enviar o arquivo → nós o processamos → você busca o resultado → o arquivo é excluído. A chave da Mistral permanece secreta em nossos servidores e nunca é exposta.",
  },
  endpoints: {
    me: "Informações da conta: plano, saldo de créditos, e-mail, tamanho máximo de arquivo.",
    transcribe:
      "Áudio / vídeo → SRT com marcação de tempo. Cobrado por minuto iniciado (61 s = 2 min = 20). `file` multipart, ou JSON { file_url }.",
    translate:
      "Traduz texto ou um arquivo SRT/VTT (marcações de tempo preservadas). Cobrado por cada 1000 palavras iniciadas, mínimo 5. Parâmetros: `target_lang`, `style`.",
    rephrase:
      "Reescreve o texto em um estilo escolhido. 3 créditos até 500 palavras, 8 além disso. Parâmetros: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Resume texto. 3 créditos até 500 palavras, 6 além disso. Parâmetros: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Reescreve texto de IA para que soe natural. 5 créditos até 500 palavras, 12 além disso. Parâmetros: `text`, `level` (light/medium/strong).",
    convert_code:
      "Converte código-fonte entre linguagens. Parâmetros: `code`, `from_language`, `to_language`.",
    job: "Busca uma tarefa por id. Passe &id=<uuid>.",
    remove_background:
      "Recorta um PNG transparente. Hoje roda no navegador (grátis e ilimitado); o acesso REST está sendo lançado.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Hoje roda no navegador; o acesso REST está sendo lançado.",
    convert_image:
      "Recodifica para um formato de destino com qualidade/redimensionamento. Hoje roda no navegador; o acesso REST está sendo lançado.",
  },
  errors: {
    bad_request: "Parâmetro ausente ou inválido — a mensagem indica qual.",
    invalid_api_key: "Chave ausente, não encontrada ou revogada.",
    insufficient_credits:
      "Saldo baixo demais — a resposta inclui quantos você precisa.",
    job_not_found: "Esse id de tarefa não pertence à sua conta.",
    text_too_long: "Mantenha as cargas de texto abaixo de 40.000 caracteres.",
    rate_limited: "Requisições em excesso — tente novamente após o atraso indicado.",
    server_error: "Algo quebrou do nosso lado — tente novamente.",
    processing_failed: "Erro do modelo de origem — você não é cobrado.",
  },
  errorsIntro1:
    "Cada endpoint retorna um envelope JSON consistente com um código",
  errorsIntro2: "e uma mensagem legível",
  errorsTableHttp: "HTTP",
  errorsTableError: "erro",
  errorsTableWhen: "Quando",
  errorExampleLabel: "Exemplo 402",
  privacyBody:
    "Os arquivos de resultado no armazenamento results/ têm uma URL assinada de 10 minutos e são excluídos em até 30 minutos por uma limpeza agendada. As linhas de tarefa são excluídas após 2 horas. O conteúdo dos arquivos nunca é retido além dessa janela.",
  sidebar: {
    getKeyTitle: "Obter uma chave de API",
    getKeyBody:
      "A API REST está incluída no plano Business (€79/mês) — 300 créditos por mês, além de pacotes de recarga que nunca expiram.",
    seePricing: "Ver preços →",
    creditPacksTitle: "Pacotes de créditos",
    creditPacksNote: "As recargas nunca expiram.",
    costTableTitle: "Tabela de custos",
  },
  tester: {
    title: "Experimente ao vivo",
    lead: "Cole sua chave de API, escolha um endpoint, fazemos a chamada real e mostramos a resposta.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Texto a enviar…",
    calling: "Chamando…",
    test: "Testar",
    creditsRemaining: (n) => `${n} créditos restantes`,
    networkError: (msg) => `Erro de rede: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const de: ApiStrings = {
  sections: {
    auth: "Authentifizierung",
    covers: "Was die API abdeckt",
    endpoints: "Endpunkte",
    errors: "Fehler",
    privacy: "Datenschutz",
  },
  auth: {
    intro1: "bei jeder Anfrage. Erstellen Sie einen Schlüssel in Ihrem",
    dashboardLink: "Dashboard",
    intro2:
      "(Business-Tarif). Jeder Aufruf verbraucht Guthaben von Ihrem Konto — Guthaben verfällt nie.",
    baseUrlLabel: "Basis-URL:",
    rateLimit1: "Ratenbegrenzung:",
    rateLimit2: "60 Anfragen/Minute",
    rateLimit3: "pro Schlüssel. Bei Überschreitung wird zurückgegeben",
  },
  covers: {
    p1a: "Die API ist",
    p1Transcription: "Transkription",
    p1b: "(Audio/Video → Text, Voxtral) und",
    p1TextAi: "Text & KI",
    p1c:
      "(übersetzen, zusammenfassen, umformulieren, vermenschlichen, Code konvertieren). OCR sowie serverseitige Video-/Schwerformat-Konvertierungen folgen als Nächstes.",
    p2a: "Unsere",
    browserToolsLink: "Browser-Tools",
    p2b:
      "— Bild-, PDF- und Audiobearbeitung, Hintergrundentfernung, Formatkonvertierungen — sind bewusst nicht Teil der API. Sie laufen vollständig im Browser des Besuchers, sodass es serverseitig nichts aufzurufen gibt: Die Datei verlässt nie das Gerät und diese Tools bleiben kostenlos, unbegrenzt und privat. Führen Sie sie clientseitig in Ihrem eigenen Produkt aus.",
    p3:
      "Für API-Aufrufe gelten dieselben Tarifgrenzen wie für die Web-App. Uploads sind je nach Tarif begrenzt (Free 20 MB · Pro 1 GB · Business 5 GB) und werden serverseitig durchgesetzt; lange Medien werden pro angefangene Minute abgerechnet, sodass die Videolänge eher durch Ihr Guthaben als durch eine harte Obergrenze begrenzt ist. Jeder Aufruf wird gegen Ihren Schlüssel gezählt — {api_keys} → {jobs} → {credit_transactions} — und folgt einem einzigen Lebenszyklus: Aufgabe erstellen → Datei senden → wir verarbeiten sie → Sie holen das Ergebnis ab → die Datei wird gelöscht. Der Mistral-Schlüssel bleibt auf unseren Servern geheim und wird nie offengelegt.",
  },
  endpoints: {
    me: "Kontoinformationen: Tarif, Guthaben, E-Mail, maximale Dateigröße.",
    transcribe:
      "Audio / Video → SRT mit Zeitstempeln. Abrechnung pro angefangene Minute (61 s = 2 Min = 20). `file` multipart oder JSON { file_url }.",
    translate:
      "Übersetzt Text oder eine SRT/VTT-Datei (Zeitstempel bleiben erhalten). Abrechnung pro angefangene 1000 Wörter, mindestens 5. Parameter: `target_lang`, `style`.",
    rephrase:
      "Schreibt Text in einem gewählten Stil um. 3 Credits bis 500 Wörter, 8 darüber hinaus. Parameter: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Fasst Text zusammen. 3 Credits bis 500 Wörter, 6 darüber hinaus. Parameter: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Schreibt KI-Text so um, dass er natürlich klingt. 5 Credits bis 500 Wörter, 12 darüber hinaus. Parameter: `text`, `level` (light/medium/strong).",
    convert_code:
      "Konvertiert Quellcode zwischen Sprachen. Parameter: `code`, `from_language`, `to_language`.",
    job: "Ruft einen Auftrag per id ab. &id=<uuid> anhängen.",
    remove_background:
      "Schneidet ein transparentes PNG frei. Läuft heute im Browser (kostenlos & unbegrenzt); der REST-Zugriff wird ausgerollt.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Läuft heute im Browser; der REST-Zugriff wird ausgerollt.",
    convert_image:
      "Kodiert in ein Zielformat mit Qualität/Größenänderung um. Läuft heute im Browser; der REST-Zugriff wird ausgerollt.",
  },
  errors: {
    bad_request: "Fehlender oder ungültiger Parameter — die Meldung nennt welcher.",
    invalid_api_key: "Schlüssel fehlt, nicht gefunden oder widerrufen.",
    insufficient_credits:
      "Guthaben zu niedrig — die Antwort enthält, wie viel Sie benötigen.",
    job_not_found: "Diese Auftrags-id gehört nicht zu Ihrem Konto.",
    text_too_long: "Halten Sie Text-Payloads unter 40.000 Zeichen.",
    rate_limited: "Zu viele Anfragen — nach der angegebenen Verzögerung erneut versuchen.",
    server_error: "Auf unserer Seite ist etwas schiefgelaufen — erneut versuchen.",
    processing_failed: "Fehler des vorgelagerten Modells — Ihnen wird nichts berechnet.",
  },
  errorsIntro1:
    "Jeder Endpunkt gibt eine einheitliche JSON-Hülle mit einem Code",
  errorsIntro2: "und einer lesbaren Meldung zurück",
  errorsTableHttp: "HTTP",
  errorsTableError: "Fehler",
  errorsTableWhen: "Wann",
  errorExampleLabel: "402-Beispiel",
  privacyBody:
    "Ergebnisdateien im results/-Speicher tragen eine signierte URL mit 10 Minuten Gültigkeit und werden innerhalb von 30 Minuten durch eine geplante Bereinigung gelöscht. Auftragszeilen werden nach 2 Stunden gelöscht. Dateiinhalte werden nie über dieses Zeitfenster hinaus aufbewahrt.",
  sidebar: {
    getKeyTitle: "API-Schlüssel erhalten",
    getKeyBody:
      "Die REST-API ist im Business-Tarif (79 €/Monat) enthalten — 300 Credits pro Monat, plus Aufstockungspakete, die nie verfallen.",
    seePricing: "Preise ansehen →",
    creditPacksTitle: "Credit-Pakete",
    creditPacksNote: "Aufstockungen verfallen nie.",
    costTableTitle: "Kostentabelle",
  },
  tester: {
    title: "Live ausprobieren",
    lead: "Fügen Sie Ihren API-Schlüssel ein, wählen Sie einen Endpunkt, wir führen den echten Aufruf aus und zeigen die Antwort.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Zu sendender Text…",
    calling: "Aufruf läuft…",
    test: "Testen",
    creditsRemaining: (n) => `${n} Credits verbleibend`,
    networkError: (msg) => `Netzwerkfehler: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const it: ApiStrings = {
  sections: {
    auth: "Autenticazione",
    covers: "Cosa copre l’API",
    endpoints: "Endpoint",
    errors: "Errori",
    privacy: "Privacy",
  },
  auth: {
    intro1: "a ogni richiesta. Genera una chiave dal tuo",
    dashboardLink: "pannello",
    intro2:
      "(piano Business). Ogni chiamata consuma crediti dal tuo saldo — i crediti non scadono mai.",
    baseUrlLabel: "URL di base:",
    rateLimit1: "Limite di frequenza:",
    rateLimit2: "60 richieste/minuto",
    rateLimit3: "per chiave. Superarlo restituisce",
  },
  covers: {
    p1a: "L’API è",
    p1Transcription: "trascrizione",
    p1b: "(audio/video → testo, Voxtral) e",
    p1TextAi: "testo e IA",
    p1c:
      "(tradurre, riassumere, riformulare, umanizzare, convertire codice). L’OCR e le conversioni video/formati pesanti lato server arriveranno a breve.",
    p2a: "I nostri",
    browserToolsLink: "strumenti per browser",
    p2b:
      "— modifiche di immagini, PDF e audio, rimozione dello sfondo, conversioni di formato — non sono nell’API, per scelta progettuale. Vengono eseguiti interamente nel browser del visitatore, quindi non c’è nulla da chiamare lato server: il file non lascia mai il dispositivo e questi strumenti restano gratuiti, illimitati e privati. Eseguili lato client nel tuo prodotto.",
    p3:
      "Gli stessi limiti per piano si applicano alle chiamate API come all’app web. I caricamenti sono limitati per piano (Free 20 MB · Pro 1 GB · Business 5 GB) e applicati lato server; i media lunghi sono fatturati al minuto iniziato, quindi la durata del video è limitata dal tuo saldo di crediti anziché da un tetto rigido. Ogni chiamata è conteggiata sulla tua chiave — {api_keys} → {jobs} → {credit_transactions} — e segue un unico ciclo di vita: creare l’attività → inviare il file → lo elaboriamo → recuperi il risultato → il file viene eliminato. La chiave Mistral resta segreta sui nostri server e non viene mai esposta.",
  },
  endpoints: {
    me: "Informazioni sull’account: piano, saldo crediti, e-mail, dimensione massima del file.",
    transcribe:
      "Audio / video → SRT con marca temporale. Fatturato al minuto iniziato (61 s = 2 min = 20). `file` multipart, o JSON { file_url }.",
    translate:
      "Traduce testo o un file SRT/VTT (marche temporali conservate). Fatturato ogni 1000 parole iniziate, minimo 5. Parametri: `target_lang`, `style`.",
    rephrase:
      "Riscrive il testo in uno stile scelto. 3 crediti fino a 500 parole, 8 oltre. Parametri: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Riassume il testo. 3 crediti fino a 500 parole, 6 oltre. Parametri: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Riscrive il testo dell’IA perché si legga in modo naturale. 5 crediti fino a 500 parole, 12 oltre. Parametri: `text`, `level` (light/medium/strong).",
    convert_code:
      "Converte il codice sorgente tra linguaggi. Parametri: `code`, `from_language`, `to_language`.",
    job: "Recupera un’attività per id. Aggiungi &id=<uuid>.",
    remove_background:
      "Ritaglia un PNG trasparente. Oggi viene eseguito nel browser (gratuito e illimitato); l’accesso REST è in fase di rilascio.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Oggi viene eseguito nel browser; l’accesso REST è in fase di rilascio.",
    convert_image:
      "Ricodifica in un formato di destinazione con qualità/ridimensionamento. Oggi viene eseguito nel browser; l’accesso REST è in fase di rilascio.",
  },
  errors: {
    bad_request: "Parametro mancante o non valido — il messaggio indica quale.",
    invalid_api_key: "Chiave mancante, non trovata o revocata.",
    insufficient_credits:
      "Saldo troppo basso — la risposta indica quanti te ne servono.",
    job_not_found: "Quell’id di attività non appartiene al tuo account.",
    text_too_long: "Mantieni i payload di testo sotto i 40.000 caratteri.",
    rate_limited: "Troppe richieste — riprova dopo il ritardo indicato.",
    server_error: "Qualcosa si è rotto dalla nostra parte — riprova.",
    processing_failed: "Errore del modello a monte — non ti viene addebitato nulla.",
  },
  errorsIntro1:
    "Ogni endpoint restituisce un involucro JSON coerente con un codice",
  errorsIntro2: "e un messaggio leggibile",
  errorsTableHttp: "HTTP",
  errorsTableError: "errore",
  errorsTableWhen: "Quando",
  errorExampleLabel: "Esempio 402",
  privacyBody:
    "I file di risultato nell’archivio results/ portano un URL firmato di 10 minuti e vengono eliminati entro 30 minuti da una pulizia pianificata. Le righe delle attività vengono eliminate dopo 2 ore. Il contenuto dei file non viene mai conservato oltre tale finestra.",
  sidebar: {
    getKeyTitle: "Ottieni una chiave API",
    getKeyBody:
      "L’API REST è inclusa nel piano Business (79 €/mese) — 300 crediti ogni mese, più pacchetti di ricarica che non scadono mai.",
    seePricing: "Vedi i prezzi →",
    creditPacksTitle: "Pacchetti di crediti",
    creditPacksNote: "Le ricariche non scadono mai.",
    costTableTitle: "Tabella dei costi",
  },
  tester: {
    title: "Provalo dal vivo",
    lead: "Incolla la tua chiave API, scegli un endpoint, facciamo la chiamata reale e mostriamo la risposta.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Testo da inviare…",
    calling: "Chiamata in corso…",
    test: "Prova",
    creditsRemaining: (n) => `${n} crediti rimanenti`,
    networkError: (msg) => `Errore di rete: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const nl: ApiStrings = {
  sections: {
    auth: "Authenticatie",
    covers: "Wat de API dekt",
    endpoints: "Endpoints",
    errors: "Fouten",
    privacy: "Privacy",
  },
  auth: {
    intro1: "bij elk verzoek. Genereer een sleutel vanuit je",
    dashboardLink: "dashboard",
    intro2:
      "(Business-abonnement). Elke aanroep verbruikt credits van je saldo — credits verlopen nooit.",
    baseUrlLabel: "Basis-URL:",
    rateLimit1: "Snelheidslimiet:",
    rateLimit2: "60 verzoeken/minuut",
    rateLimit3: "per sleutel. Overschrijden geeft",
  },
  covers: {
    p1a: "De API is",
    p1Transcription: "transcriptie",
    p1b: "(audio/video → tekst, Voxtral) en",
    p1TextAi: "tekst & AI",
    p1c:
      "(vertalen, samenvatten, herformuleren, vermenselijken, code converteren). OCR en serverzijdige video-/zwaarformaatconversies komen hierna.",
    p2a: "Onze",
    browserToolsLink: "browsertools",
    p2b:
      "— afbeeldings-, PDF- en audiobewerkingen, achtergrond verwijderen, formaatconversies — zitten bewust niet in de API. Ze draaien volledig in de browser van de bezoeker, dus er valt serverzijdig niets aan te roepen: het bestand verlaat nooit het apparaat en deze tools blijven gratis, onbeperkt en privé. Voer ze clientzijdig uit in je eigen product.",
    p3:
      "Voor API-aanroepen gelden dezelfde abonnementslimieten als voor de web-app. Uploads zijn per abonnement begrensd (Free 20 MB · Pro 1 GB · Business 5 GB) en worden serverzijdig afgedwongen; lange media worden per begonnen minuut gefactureerd, dus de videolengte wordt begrensd door je creditsaldo in plaats van een harde limiet. Elke aanroep wordt afgemeten tegen je sleutel — {api_keys} → {jobs} → {credit_transactions} — en volgt één levenscyclus: de taak aanmaken → het bestand verzenden → wij verwerken het → jij haalt het resultaat op → het bestand wordt verwijderd. De Mistral-sleutel blijft geheim op onze servers en wordt nooit blootgesteld.",
  },
  endpoints: {
    me: "Accountinfo: abonnement, creditsaldo, e-mail, maximale bestandsgrootte.",
    transcribe:
      "Audio / video → SRT met tijdcodes. Gefactureerd per begonnen minuut (61 s = 2 min = 20). `file` multipart, of JSON { file_url }.",
    translate:
      "Vertaalt tekst of een SRT/VTT-bestand (tijdcodes behouden). Gefactureerd per begonnen 1000 woorden, minimaal 5. Parameters: `target_lang`, `style`.",
    rephrase:
      "Herschrijft tekst in een gekozen stijl. 3 credits tot 500 woorden, 8 daarboven. Parameters: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Vat tekst samen. 3 credits tot 500 woorden, 6 daarboven. Parameters: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Herschrijft AI-tekst zodat die natuurlijk leest. 5 credits tot 500 woorden, 12 daarboven. Parameters: `text`, `level` (light/medium/strong).",
    convert_code:
      "Converteert broncode tussen talen. Parameters: `code`, `from_language`, `to_language`.",
    job: "Haalt een taak op via id. Voeg &id=<uuid> toe.",
    remove_background:
      "Knipt een transparante PNG uit. Draait vandaag in de browser (gratis & onbeperkt); REST-toegang wordt uitgerold.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Draait vandaag in de browser; REST-toegang wordt uitgerold.",
    convert_image:
      "Hercodeert naar een doelformaat met kwaliteit/formaatwijziging. Draait vandaag in de browser; REST-toegang wordt uitgerold.",
  },
  errors: {
    bad_request: "Ontbrekende of ongeldige parameter — het bericht zegt welke.",
    invalid_api_key: "Sleutel ontbreekt, niet gevonden of ingetrokken.",
    insufficient_credits:
      "Saldo te laag — het antwoord bevat hoeveel je nodig hebt.",
    job_not_found: "Die taak-id hoort niet bij je account.",
    text_too_long: "Houd tekst-payloads onder de 40.000 tekens.",
    rate_limited: "Te veel verzoeken — probeer opnieuw na de aangegeven vertraging.",
    server_error: "Er ging iets mis aan onze kant — probeer opnieuw.",
    processing_failed: "Fout in het upstream-model — er wordt niets in rekening gebracht.",
  },
  errorsIntro1:
    "Elk endpoint geeft een consistente JSON-envelop terug met een code",
  errorsIntro2: "en een leesbaar bericht",
  errorsTableHttp: "HTTP",
  errorsTableError: "fout",
  errorsTableWhen: "Wanneer",
  errorExampleLabel: "402-voorbeeld",
  privacyBody:
    "Resultaatbestanden in de results/-opslag hebben een ondertekende URL van 10 minuten en worden binnen 30 minuten verwijderd door een geplande opschoning. Taakrijen worden na 2 uur verwijderd. Bestandsinhoud wordt nooit langer dan dat venster bewaard.",
  sidebar: {
    getKeyTitle: "Een API-sleutel verkrijgen",
    getKeyBody:
      "De REST-API zit bij het Business-abonnement (€79/maand) — 300 credits per maand, plus bijvulpakketten die nooit verlopen.",
    seePricing: "Bekijk prijzen →",
    creditPacksTitle: "Creditpakketten",
    creditPacksNote: "Bijvullingen verlopen nooit.",
    costTableTitle: "Kostentabel",
  },
  tester: {
    title: "Probeer het live",
    lead: "Plak je API-sleutel, kies een endpoint, wij doen de echte aanroep en tonen het antwoord.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Te verzenden tekst…",
    calling: "Aanroepen…",
    test: "Testen",
    creditsRemaining: (n) => `${n} credits resterend`,
    networkError: (msg) => `Netwerkfout: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const ja: ApiStrings = {
  sections: {
    auth: "認証",
    covers: "APIの対応範囲",
    endpoints: "エンドポイント",
    errors: "エラー",
    privacy: "プライバシー",
  },
  auth: {
    intro1: "をすべてのリクエストに付与します。キーは次の場所で生成できます：",
    dashboardLink: "ダッシュボード",
    intro2:
      "（Businessプラン）。各呼び出しは残高からクレジットを消費します — クレジットは失効しません。",
    baseUrlLabel: "ベースURL：",
    rateLimit1: "レート制限：",
    rateLimit2: "60リクエスト/分",
    rateLimit3: "（キーごと）。超過すると次が返されます",
  },
  covers: {
    p1a: "このAPIは",
    p1Transcription: "文字起こし",
    p1b: "（音声/動画 → テキスト、Voxtral）と",
    p1TextAi: "テキスト & AI",
    p1c:
      "（翻訳、要約、言い換え、人間らしく、コード変換）です。OCRおよびサーバー側の動画/重量級フォーマット変換は次に展開されます。",
    p2a: "当社の",
    browserToolsLink: "ブラウザツール",
    p2b:
      "— 画像、PDF、音声の編集、背景除去、フォーマット変換 — は設計上APIには含まれません。これらは訪問者のブラウザ内で完全に実行されるため、サーバー側で呼び出すものはありません：ファイルはデバイスから出ず、これらのツールは無料・無制限・プライベートのままです。代わりにご自身の製品でクライアント側で実行してください。",
    p3:
      "API呼び出しにはWebアプリと同じプランごとの制限が適用されます。アップロードはプランごとに上限があり（Free 20 MB · Pro 1 GB · Business 5 GB）、サーバー側で適用されます。長いメディアは開始した分ごとに課金されるため、動画の長さは厳格な打ち切りではなくクレジット残高によって制限されます。各呼び出しはキーに対して計測されます — {api_keys} → {jobs} → {credit_transactions} — そして単一のライフサイクルに従います：タスクを作成 → ファイルを送信 → 当社が処理 → 結果を取得 → ファイルが削除されます。Mistralキーは当社サーバー上で秘匿され、決して公開されません。",
  },
  endpoints: {
    me: "アカウント情報：プラン、クレジット残高、メール、最大ファイルサイズ。",
    transcribe:
      "音声 / 動画 → タイムスタンプ付きSRT。開始した分ごとに課金（61秒 = 2分 = 20）。multipartの`file`、またはJSON { file_url }。",
    translate:
      "テキストまたはSRT/VTTファイルを翻訳（タイムスタンプは保持）。開始した1000語ごとに課金、最低5。パラメータ：`target_lang`、`style`。",
    rephrase:
      "選択したスタイルでテキストを書き換えます。500語まで3クレジット、それ以上は8。パラメータ：`text`、`style`（professional/casual/academic/creative/simple/legal）。",
    summarize:
      "テキストを要約します。500語まで3クレジット、それ以上は6。パラメータ：`text`、`format`（short/bullets/detailed）。",
    humanize:
      "AIテキストを自然に読めるよう書き換えます。500語まで5クレジット、それ以上は12。パラメータ：`text`、`level`（light/medium/strong）。",
    convert_code:
      "ソースコードを言語間で変換します。パラメータ：`code`、`from_language`、`to_language`。",
    job: "idでジョブを取得します。&id=<uuid>を付けてください。",
    remove_background:
      "透過PNGを切り抜きます。現在はブラウザ内で実行（無料・無制限）。RESTアクセスは順次展開中です。",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text。現在はブラウザ内で実行。RESTアクセスは順次展開中です。",
    convert_image:
      "品質/リサイズを指定して対象フォーマットに再エンコードします。現在はブラウザ内で実行。RESTアクセスは順次展開中です。",
  },
  errors: {
    bad_request: "パラメータの欠落または無効 — メッセージにどれかが示されます。",
    invalid_api_key: "キーが欠落、見つからない、または失効しています。",
    insufficient_credits:
      "残高が不足しています — 応答に必要な数が含まれます。",
    job_not_found: "そのジョブidはあなたのアカウントに属していません。",
    text_too_long: "テキストのペイロードは40,000文字未満にしてください。",
    rate_limited: "リクエストが多すぎます — 指定された遅延後に再試行してください。",
    server_error: "当社側で問題が発生しました — 再試行してください。",
    processing_failed: "上流モデルのエラー — 課金されません。",
  },
  errorsIntro1:
    "すべてのエンドポイントは、一貫したJSONエンベロープを返します。コード",
  errorsIntro2: "と人間が読めるメッセージ",
  errorsTableHttp: "HTTP",
  errorsTableError: "エラー",
  errorsTableWhen: "条件",
  errorExampleLabel: "402の例",
  privacyBody:
    "results/ストレージ内の結果ファイルは10分間の署名付きURLを持ち、スケジュールされたパージにより30分以内に削除されます。ジョブの行は2時間後に削除されます。ファイルの内容はそのウィンドウを超えて保持されることはありません。",
  sidebar: {
    getKeyTitle: "APIキーを取得",
    getKeyBody:
      "REST APIはBusinessプラン（€79/月）に含まれます — 毎月300クレジット、加えて失効しないチャージパック。",
    seePricing: "料金を見る →",
    creditPacksTitle: "クレジットパック",
    creditPacksNote: "チャージは失効しません。",
    costTableTitle: "料金表",
  },
  tester: {
    title: "ライブで試す",
    lead: "APIキーを貼り付け、エンドポイントを選択すると、実際の呼び出しを行い応答を表示します。",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "送信するテキスト…",
    calling: "呼び出し中…",
    test: "テスト",
    creditsRemaining: (n) => `残り${n}クレジット`,
    networkError: (msg) => `ネットワークエラー：${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `：${message}` : ""}`,
  },
};

const zh: ApiStrings = {
  sections: {
    auth: "身份验证",
    covers: "API 覆盖范围",
    endpoints: "端点",
    errors: "错误",
    privacy: "隐私",
  },
  auth: {
    intro1: "随每个请求一起发送。从以下位置生成密钥：",
    dashboardLink: "控制台",
    intro2:
      "（Business 计划）。每次调用都会从你的余额中消耗积分 — 积分永不过期。",
    baseUrlLabel: "基础 URL：",
    rateLimit1: "速率限制：",
    rateLimit2: "60 次请求/分钟",
    rateLimit3: "（每个密钥）。超出会返回",
  },
  covers: {
    p1a: "该 API 是",
    p1Transcription: "转录",
    p1b: "（音频/视频 → 文本，Voxtral）和",
    p1TextAi: "文本与 AI",
    p1c:
      "（翻译、摘要、改写、人性化、转换代码）。OCR 以及服务器端的视频/重格式转换将随后推出。",
    p2a: "我们的",
    browserToolsLink: "浏览器工具",
    p2b:
      "— 图像、PDF 和音频编辑、背景去除、格式转换 — 按设计不在 API 中。它们完全在访问者的浏览器中运行，因此服务器端无需调用：文件从不离开设备，这些工具始终免费、无限且私密。请在你自己的产品中以客户端方式运行它们。",
    p3:
      "API 调用与网页应用适用相同的按计划限制。上传按计划设上限（Free 20 MB · Pro 1 GB · Business 5 GB）并在服务器端强制执行；长媒体按已开始的分钟计费，因此视频长度受你的积分余额限制，而非硬性截断。每次调用都按你的密钥计量 — {api_keys} → {jobs} → {credit_transactions} — 并遵循单一生命周期：创建任务 → 发送文件 → 我们处理 → 你获取结果 → 文件被删除。Mistral 密钥在我们的服务器上保密，永不暴露。",
  },
  endpoints: {
    me: "账户信息：计划、积分余额、电子邮件、最大文件大小。",
    transcribe:
      "音频 / 视频 → 带时间戳的 SRT。按已开始的分钟计费（61 秒 = 2 分钟 = 20）。multipart `file`，或 JSON { file_url }。",
    translate:
      "翻译文本或 SRT/VTT 文件（保留时间戳）。按已开始的每 1000 词计费，最少 5。参数：`target_lang`、`style`。",
    rephrase:
      "以所选风格改写文本。500 词以内 3 积分，超出 8。参数：`text`、`style`（professional/casual/academic/creative/simple/legal）。",
    summarize:
      "摘要文本。500 词以内 3 积分，超出 6。参数：`text`、`format`（short/bullets/detailed）。",
    humanize:
      "改写 AI 文本使其读起来自然。500 词以内 5 积分，超出 12。参数：`text`、`level`（light/medium/strong）。",
    convert_code:
      "在不同语言之间转换源代码。参数：`code`、`from_language`、`to_language`。",
    job: "按 id 获取任务。附加 &id=<uuid>。",
    remove_background:
      "抠出透明 PNG。如今在浏览器中运行（免费且无限）；REST 访问正在推出。",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text。如今在浏览器中运行；REST 访问正在推出。",
    convert_image:
      "以质量/调整大小重新编码为目标格式。如今在浏览器中运行；REST 访问正在推出。",
  },
  errors: {
    bad_request: "参数缺失或无效 — 消息会说明是哪个。",
    invalid_api_key: "密钥缺失、未找到或已撤销。",
    insufficient_credits:
      "余额过低 — 响应中包含你所需的数量。",
    job_not_found: "该任务 id 不属于你的账户。",
    text_too_long: "请将文本负载保持在 40,000 个字符以内。",
    rate_limited: "请求过多 — 请在指示的延迟后重试。",
    server_error: "我们这边出了问题 — 请重试。",
    processing_failed: "上游模型错误 — 不会向你收费。",
  },
  errorsIntro1:
    "每个端点都返回一致的 JSON 封装，其中包含一个代码",
  errorsIntro2: "和一条可读消息",
  errorsTableHttp: "HTTP",
  errorsTableError: "错误",
  errorsTableWhen: "何时",
  errorExampleLabel: "402 示例",
  privacyBody:
    "results/ 存储中的结果文件带有 10 分钟的签名 URL，并由计划清理在 30 分钟内删除。任务行在 2 小时后删除。文件内容绝不会在该窗口之后保留。",
  sidebar: {
    getKeyTitle: "获取 API 密钥",
    getKeyBody:
      "REST API 包含在 Business 计划（€79/月）中 — 每月 300 积分，外加永不过期的充值包。",
    seePricing: "查看价格 →",
    creditPacksTitle: "积分包",
    creditPacksNote: "充值永不过期。",
    costTableTitle: "费用表",
  },
  tester: {
    title: "在线试用",
    lead: "粘贴你的 API 密钥，选择一个端点，我们发起真实调用并显示响应。",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "要发送的文本…",
    calling: "调用中…",
    test: "测试",
    creditsRemaining: (n) => `剩余 ${n} 积分`,
    networkError: (msg) => `网络错误：${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `：${message}` : ""}`,
  },
};

const ko: ApiStrings = {
  sections: {
    auth: "인증",
    covers: "API가 다루는 범위",
    endpoints: "엔드포인트",
    errors: "오류",
    privacy: "개인정보 보호",
  },
  auth: {
    intro1: "을(를) 모든 요청에 포함하세요. 키는 다음에서 생성합니다:",
    dashboardLink: "대시보드",
    intro2:
      "(Business 요금제). 각 호출은 잔액에서 크레딧을 소비합니다 — 크레딧은 만료되지 않습니다.",
    baseUrlLabel: "기본 URL:",
    rateLimit1: "속도 제한:",
    rateLimit2: "분당 60 요청",
    rateLimit3: "(키당). 초과하면 다음을 반환합니다",
  },
  covers: {
    p1a: "이 API는",
    p1Transcription: "전사",
    p1b: "(오디오/비디오 → 텍스트, Voxtral)와",
    p1TextAi: "텍스트 & AI",
    p1c:
      "(번역, 요약, 다시 쓰기, 자연스럽게, 코드 변환)입니다. OCR과 서버 측 비디오/무거운 포맷 변환은 다음에 출시됩니다.",
    p2a: "당사의",
    browserToolsLink: "브라우저 도구",
    p2b:
      "— 이미지, PDF, 오디오 편집, 배경 제거, 포맷 변환 — 는 설계상 API에 포함되지 않습니다. 이들은 방문자의 브라우저에서 전적으로 실행되므로 서버 측에서 호출할 것이 없습니다: 파일은 기기를 떠나지 않으며 이러한 도구는 무료, 무제한, 비공개로 유지됩니다. 대신 자신의 제품에서 클라이언트 측으로 실행하세요.",
    p3:
      "API 호출에는 웹 앱과 동일한 요금제별 제한이 적용됩니다. 업로드는 요금제별 상한이 있으며(Free 20 MB · Pro 1 GB · Business 5 GB) 서버 측에서 적용됩니다. 긴 미디어는 시작된 분당 청구되므로 비디오 길이는 엄격한 컷오프가 아니라 크레딧 잔액에 의해 제한됩니다. 모든 호출은 키를 기준으로 측정됩니다 — {api_keys} → {jobs} → {credit_transactions} — 그리고 단일 수명 주기를 따릅니다: 작업 생성 → 파일 전송 → 당사가 처리 → 결과 가져오기 → 파일 삭제. Mistral 키는 당사 서버에서 비밀로 유지되며 절대 노출되지 않습니다.",
  },
  endpoints: {
    me: "계정 정보: 요금제, 크레딧 잔액, 이메일, 최대 파일 크기.",
    transcribe:
      "오디오 / 비디오 → 타임스탬프 SRT. 시작된 분당 청구(61초 = 2분 = 20). multipart `file` 또는 JSON { file_url }.",
    translate:
      "텍스트 또는 SRT/VTT 파일을 번역합니다(타임스탬프 유지). 시작된 1000단어당 청구, 최소 5. 매개변수: `target_lang`, `style`.",
    rephrase:
      "선택한 스타일로 텍스트를 다시 씁니다. 500단어까지 3크레딧, 이상은 8. 매개변수: `text`, `style`(professional/casual/academic/creative/simple/legal).",
    summarize:
      "텍스트를 요약합니다. 500단어까지 3크레딧, 이상은 6. 매개변수: `text`, `format`(short/bullets/detailed).",
    humanize:
      "AI 텍스트를 자연스럽게 읽히도록 다시 씁니다. 500단어까지 5크레딧, 이상은 12. 매개변수: `text`, `level`(light/medium/strong).",
    convert_code:
      "소스 코드를 언어 간에 변환합니다. 매개변수: `code`, `from_language`, `to_language`.",
    job: "id로 작업을 가져옵니다. &id=<uuid>를 추가하세요.",
    remove_background:
      "투명 PNG를 잘라냅니다. 오늘은 브라우저에서 실행됩니다(무료 & 무제한). REST 접근은 출시 중입니다.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. 오늘은 브라우저에서 실행됩니다. REST 접근은 출시 중입니다.",
    convert_image:
      "품질/크기 조정으로 대상 포맷으로 다시 인코딩합니다. 오늘은 브라우저에서 실행됩니다. REST 접근은 출시 중입니다.",
  },
  errors: {
    bad_request: "매개변수 누락 또는 잘못됨 — 메시지가 어느 것인지 알려줍니다.",
    invalid_api_key: "키가 없거나 찾을 수 없거나 취소되었습니다.",
    insufficient_credits:
      "잔액이 너무 적습니다 — 응답에 필요한 수량이 포함됩니다.",
    job_not_found: "그 작업 id는 귀하의 계정에 속하지 않습니다.",
    text_too_long: "텍스트 페이로드를 40,000자 미만으로 유지하세요.",
    rate_limited: "요청이 너무 많습니다 — 표시된 지연 후 다시 시도하세요.",
    server_error: "당사 측에서 문제가 발생했습니다 — 다시 시도하세요.",
    processing_failed: "업스트림 모델 오류 — 요금이 부과되지 않습니다.",
  },
  errorsIntro1:
    "모든 엔드포인트는 일관된 JSON 봉투를 반환합니다. 코드",
  errorsIntro2: "와 사람이 읽을 수 있는 메시지",
  errorsTableHttp: "HTTP",
  errorsTableError: "오류",
  errorsTableWhen: "조건",
  errorExampleLabel: "402 예시",
  privacyBody:
    "results/ 저장소의 결과 파일은 10분짜리 서명된 URL을 가지며 예약된 정리에 의해 30분 이내에 삭제됩니다. 작업 행은 2시간 후 삭제됩니다. 파일 내용은 그 기간을 넘어 보존되지 않습니다.",
  sidebar: {
    getKeyTitle: "API 키 받기",
    getKeyBody:
      "REST API는 Business 요금제(€79/월)에 포함됩니다 — 매월 300크레딧, 그리고 만료되지 않는 충전 팩.",
    seePricing: "요금 보기 →",
    creditPacksTitle: "크레딧 팩",
    creditPacksNote: "충전은 만료되지 않습니다.",
    costTableTitle: "비용 표",
  },
  tester: {
    title: "라이브로 사용해 보기",
    lead: "API 키를 붙여넣고 엔드포인트를 선택하면 실제 호출을 수행하고 응답을 표시합니다.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "보낼 텍스트…",
    calling: "호출 중…",
    test: "테스트",
    creditsRemaining: (n) => `${n} 크레딧 남음`,
    networkError: (msg) => `네트워크 오류: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const ar: ApiStrings = {
  sections: {
    auth: "المصادقة",
    covers: "ما تغطيه واجهة برمجة التطبيقات",
    endpoints: "نقاط النهاية",
    errors: "الأخطاء",
    privacy: "الخصوصية",
  },
  auth: {
    intro1: "مع كل طلب. أنشئ مفتاحًا من",
    dashboardLink: "لوحة التحكم",
    intro2:
      "(خطة Business). كل استدعاء يستهلك أرصدة من رصيدك — الأرصدة لا تنتهي صلاحيتها أبدًا.",
    baseUrlLabel: "عنوان URL الأساسي:",
    rateLimit1: "حد المعدل:",
    rateLimit2: "60 طلبًا/دقيقة",
    rateLimit3: "لكل مفتاح. تجاوزه يُرجِع",
  },
  covers: {
    p1a: "واجهة برمجة التطبيقات هي",
    p1Transcription: "النسخ النصي",
    p1b: "(صوت/فيديو ← نص، Voxtral) و",
    p1TextAi: "النص والذكاء الاصطناعي",
    p1c:
      "(ترجمة، تلخيص، إعادة صياغة، أنسنة، تحويل التعليمات البرمجية). سيُطرح OCR وتحويلات الفيديو/الصيغ الثقيلة من جانب الخادم تاليًا.",
    p2a: "إن",
    browserToolsLink: "أدوات المتصفح",
    p2b:
      "الخاصة بنا — تعديلات الصور وملفات PDF والصوت، إزالة الخلفية، تحويلات الصيغ — ليست في واجهة برمجة التطبيقات، عن قصد. فهي تعمل بالكامل في متصفح الزائر، لذلك لا يوجد ما يُستدعى من جانب الخادم: لا يغادر الملف الجهاز أبدًا، وتبقى هذه الأدوات مجانية وغير محدودة وخاصة. شغّلها من جانب العميل في منتجك الخاص بدلاً من ذلك.",
    p3:
      "تنطبق نفس حدود الخطة على استدعاءات واجهة برمجة التطبيقات كما على تطبيق الويب. عمليات الرفع محدودة حسب الخطة (Free 20 MB · Pro 1 GB · Business 5 GB) ومُطبَّقة من جانب الخادم؛ تُحتسب الوسائط الطويلة لكل دقيقة بدأت، لذا فإن طول الفيديو محدود برصيدك من الأرصدة بدلاً من قطع صارم. كل استدعاء يُقاس مقابل مفتاحك — {api_keys} ← {jobs} ← {credit_transactions} — ويتبع دورة حياة واحدة: إنشاء المهمة ← إرسال الملف ← نعالجه ← تجلب النتيجة ← يُحذف الملف. يبقى مفتاح Mistral سريًا على خوادمنا ولا يُكشف أبدًا.",
  },
  endpoints: {
    me: "معلومات الحساب: الخطة، رصيد الأرصدة، البريد الإلكتروني، الحد الأقصى لحجم الملف.",
    transcribe:
      "صوت / فيديو ← SRT بطوابع زمنية. يُحتسب لكل دقيقة بدأت (61 ث = دقيقتان = 20). `file` متعدد الأجزاء، أو JSON { file_url }.",
    translate:
      "يترجم نصًا أو ملف SRT/VTT (مع الحفاظ على الطوابع الزمنية). يُحتسب لكل 1000 كلمة بدأت، بحد أدنى 5. المعاملات: `target_lang`، `style`.",
    rephrase:
      "يعيد كتابة النص بأسلوب مختار. 3 أرصدة حتى 500 كلمة، و8 بعدها. المعاملات: `text`، `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "يلخّص النص. 3 أرصدة حتى 500 كلمة، و6 بعدها. المعاملات: `text`، `format` (short/bullets/detailed).",
    humanize:
      "يعيد كتابة نص الذكاء الاصطناعي ليُقرأ بشكل طبيعي. 5 أرصدة حتى 500 كلمة، و12 بعدها. المعاملات: `text`، `level` (light/medium/strong).",
    convert_code:
      "يحوّل الشيفرة المصدرية بين اللغات. المعاملات: `code`، `from_language`، `to_language`.",
    job: "يجلب مهمة بواسطة id. أضف ‎&id=<uuid>.",
    remove_background:
      "يقتطع صورة PNG شفافة. يعمل اليوم في المتصفح (مجاني وغير محدود)؛ وصول REST قيد الطرح.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. يعمل اليوم في المتصفح؛ وصول REST قيد الطرح.",
    convert_image:
      "يعيد الترميز إلى صيغة مستهدفة مع الجودة/تغيير الحجم. يعمل اليوم في المتصفح؛ وصول REST قيد الطرح.",
  },
  errors: {
    bad_request: "معامل مفقود أو غير صالح — الرسالة تحدد أيها.",
    invalid_api_key: "المفتاح مفقود أو غير موجود أو مُلغى.",
    insufficient_credits:
      "الرصيد منخفض جدًا — يتضمن الرد العدد الذي تحتاجه.",
    job_not_found: "معرّف المهمة هذا لا ينتمي إلى حسابك.",
    text_too_long: "أبقِ حمولات النص دون 40,000 حرف.",
    rate_limited: "طلبات كثيرة جدًا — أعد المحاولة بعد التأخير المشار إليه.",
    server_error: "حدث خطأ من جانبنا — أعد المحاولة.",
    processing_failed: "خطأ في النموذج المصدر — لا تُحاسَب.",
  },
  errorsIntro1:
    "تُرجِع كل نقطة نهاية مغلفًا JSON متسقًا يحتوي على رمز",
  errorsIntro2: "ورسالة قابلة للقراءة",
  errorsTableHttp: "HTTP",
  errorsTableError: "خطأ",
  errorsTableWhen: "متى",
  errorExampleLabel: "مثال 402",
  privacyBody:
    "تحمل ملفات النتائج في تخزين results/ عنوان URL موقّعًا لمدة 10 دقائق وتُحذف خلال 30 دقيقة عبر تنظيف مجدول. تُحذف صفوف المهام بعد ساعتين. لا يُحتفظ بمحتوى الملفات أبدًا بعد تلك النافذة.",
  sidebar: {
    getKeyTitle: "احصل على مفتاح API",
    getKeyBody:
      "واجهة REST API مضمّنة في خطة Business (79 €/شهر) — 300 رصيد كل شهر، بالإضافة إلى حزم شحن لا تنتهي صلاحيتها أبدًا.",
    seePricing: "عرض الأسعار ←",
    creditPacksTitle: "حزم الأرصدة",
    creditPacksNote: "عمليات الشحن لا تنتهي صلاحيتها أبدًا.",
    costTableTitle: "جدول التكاليف",
  },
  tester: {
    title: "جرّبها مباشرةً",
    lead: "الصق مفتاح API الخاص بك، اختر نقطة نهاية، نُجري الاستدعاء الحقيقي ونعرض الرد.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "نص للإرسال…",
    calling: "جارٍ الاستدعاء…",
    test: "اختبار",
    creditsRemaining: (n) => `${n} رصيد متبقٍّ`,
    networkError: (msg) => `خطأ في الشبكة: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const ru: ApiStrings = {
  sections: {
    auth: "Аутентификация",
    covers: "Что охватывает API",
    endpoints: "Конечные точки",
    errors: "Ошибки",
    privacy: "Конфиденциальность",
  },
  auth: {
    intro1: "с каждым запросом. Создайте ключ в своей",
    dashboardLink: "панели управления",
    intro2:
      "(план Business). Каждый вызов расходует кредиты из вашего баланса — кредиты никогда не сгорают.",
    baseUrlLabel: "Базовый URL:",
    rateLimit1: "Ограничение частоты:",
    rateLimit2: "60 запросов/минуту",
    rateLimit3: "на ключ. Превышение возвращает",
  },
  covers: {
    p1a: "API — это",
    p1Transcription: "транскрипция",
    p1b: "(аудио/видео → текст, Voxtral) и",
    p1TextAi: "текст и ИИ",
    p1c:
      "(перевод, резюмирование, перефразирование, очеловечивание, конвертация кода). OCR и серверные конвертации видео/тяжёлых форматов появятся следующими.",
    p2a: "Наши",
    browserToolsLink: "браузерные инструменты",
    p2b:
      "— правка изображений, PDF и аудио, удаление фона, конвертации форматов — намеренно не входят в API. Они выполняются полностью в браузере посетителя, поэтому на стороне сервера нечего вызывать: файл никогда не покидает устройство, а эти инструменты остаются бесплатными, безлимитными и приватными. Запускайте их на стороне клиента в своём собственном продукте.",
    p3:
      "К вызовам API применяются те же ограничения по плану, что и к веб-приложению. Загрузки ограничены по плану (Free 20 MB · Pro 1 GB · Business 5 GB) и проверяются на стороне сервера; длинные медиа тарифицируются за начатую минуту, поэтому длина видео ограничена вашим балансом кредитов, а не жёстким лимитом. Каждый вызов учитывается по вашему ключу — {api_keys} → {jobs} → {credit_transactions} — и проходит единый жизненный цикл: создать задачу → отправить файл → мы обрабатываем → вы забираете результат → файл удаляется. Ключ Mistral остаётся секретным на наших серверах и никогда не раскрывается.",
  },
  endpoints: {
    me: "Сведения об аккаунте: план, баланс кредитов, email, максимальный размер файла.",
    transcribe:
      "Аудио / видео → SRT с временными метками. Тарификация за начатую минуту (61 с = 2 мин = 20). multipart `file` или JSON { file_url }.",
    translate:
      "Переводит текст или файл SRT/VTT (временные метки сохраняются). Тарификация за начатые 1000 слов, минимум 5. Параметры: `target_lang`, `style`.",
    rephrase:
      "Переписывает текст в выбранном стиле. 3 кредита до 500 слов, 8 сверх того. Параметры: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Резюмирует текст. 3 кредита до 500 слов, 6 сверх того. Параметры: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Переписывает текст ИИ так, чтобы он читался естественно. 5 кредитов до 500 слов, 12 сверх того. Параметры: `text`, `level` (light/medium/strong).",
    convert_code:
      "Конвертирует исходный код между языками. Параметры: `code`, `from_language`, `to_language`.",
    job: "Получает задачу по id. Добавьте &id=<uuid>.",
    remove_background:
      "Вырезает прозрачный PNG. Сегодня работает в браузере (бесплатно и без ограничений); доступ через REST разворачивается.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Сегодня работает в браузере; доступ через REST разворачивается.",
    convert_image:
      "Перекодирует в целевой формат с качеством/изменением размера. Сегодня работает в браузере; доступ через REST разворачивается.",
  },
  errors: {
    bad_request: "Отсутствует или недопустим параметр — в сообщении указано, какой.",
    invalid_api_key: "Ключ отсутствует, не найден или отозван.",
    insufficient_credits:
      "Слишком низкий баланс — в ответе указано, сколько нужно.",
    job_not_found: "Этот id задачи не принадлежит вашему аккаунту.",
    text_too_long: "Держите текстовые полезные нагрузки до 40 000 символов.",
    rate_limited: "Слишком много запросов — повторите после указанной задержки.",
    server_error: "Что-то сломалось на нашей стороне — повторите.",
    processing_failed: "Ошибка вышестоящей модели — плата не взимается.",
  },
  errorsIntro1:
    "Каждая конечная точка возвращает единообразную JSON-оболочку с кодом",
  errorsIntro2: "и читаемым сообщением",
  errorsTableHttp: "HTTP",
  errorsTableError: "ошибка",
  errorsTableWhen: "Когда",
  errorExampleLabel: "Пример 402",
  privacyBody:
    "Файлы результатов в хранилище results/ имеют подписанный URL на 10 минут и удаляются в течение 30 минут запланированной очисткой. Строки задач удаляются через 2 часа. Содержимое файлов никогда не хранится дольше этого окна.",
  sidebar: {
    getKeyTitle: "Получить ключ API",
    getKeyBody:
      "REST API входит в план Business (79 €/мес) — 300 кредитов каждый месяц плюс пакеты пополнения, которые никогда не сгорают.",
    seePricing: "Смотреть цены →",
    creditPacksTitle: "Пакеты кредитов",
    creditPacksNote: "Пополнения никогда не сгорают.",
    costTableTitle: "Таблица стоимости",
  },
  tester: {
    title: "Попробовать вживую",
    lead: "Вставьте ваш ключ API, выберите конечную точку, мы сделаем реальный вызов и покажем ответ.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Текст для отправки…",
    calling: "Вызов…",
    test: "Тест",
    creditsRemaining: (n) => `Осталось ${n} кредитов`,
    networkError: (msg) => `Ошибка сети: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const hi: ApiStrings = {
  sections: {
    auth: "प्रमाणीकरण",
    covers: "API क्या कवर करता है",
    endpoints: "एंडपॉइंट",
    errors: "त्रुटियाँ",
    privacy: "गोपनीयता",
  },
  auth: {
    intro1: "हर अनुरोध के साथ। अपने यहाँ से एक कुंजी बनाएँ",
    dashboardLink: "डैशबोर्ड",
    intro2:
      "(Business योजना)। प्रत्येक कॉल आपके बैलेंस से क्रेडिट खर्च करती है — क्रेडिट कभी समाप्त नहीं होते।",
    baseUrlLabel: "बेस URL:",
    rateLimit1: "दर सीमा:",
    rateLimit2: "60 अनुरोध/मिनट",
    rateLimit3: "प्रति कुंजी। इसे पार करने पर लौटाता है",
  },
  covers: {
    p1a: "API है",
    p1Transcription: "ट्रांसक्रिप्शन",
    p1b: "(ऑडियो/वीडियो → टेक्स्ट, Voxtral) और",
    p1TextAi: "टेक्स्ट और AI",
    p1c:
      "(अनुवाद, सारांश, पुनर्लेखन, मानवीकरण, कोड रूपांतरण)। OCR और सर्वर-साइड वीडियो/भारी-फ़ॉर्मेट रूपांतरण अगले आ रहे हैं।",
    p2a: "हमारे",
    browserToolsLink: "ब्राउज़र टूल",
    p2b:
      "— छवि, PDF और ऑडियो संपादन, पृष्ठभूमि हटाना, फ़ॉर्मेट रूपांतरण — डिज़ाइन के अनुसार API में नहीं हैं। ये पूरी तरह आगंतुक के ब्राउज़र में चलते हैं, इसलिए सर्वर-साइड कॉल करने को कुछ नहीं है: फ़ाइल कभी डिवाइस नहीं छोड़ती और ये टूल मुफ़्त, असीमित और निजी बने रहते हैं। इसके बजाय इन्हें अपने उत्पाद में क्लाइंट-साइड चलाएँ।",
    p3:
      "API कॉल पर वही प्रति-योजना सीमाएँ लागू होती हैं जो वेब ऐप पर। अपलोड योजना के अनुसार सीमित हैं (Free 20 MB · Pro 1 GB · Business 5 GB) और सर्वर-साइड लागू होते हैं; लंबी मीडिया शुरू हुई प्रति मिनट के अनुसार बिल की जाती है, इसलिए वीडियो की लंबाई किसी कठोर सीमा के बजाय आपके क्रेडिट बैलेंस से बंधी होती है। प्रत्येक कॉल आपकी कुंजी के विरुद्ध मापी जाती है — {api_keys} → {jobs} → {credit_transactions} — और एक ही जीवनचक्र का पालन करती है: कार्य बनाएँ → फ़ाइल भेजें → हम इसे संसाधित करते हैं → आप परिणाम लाते हैं → फ़ाइल हटा दी जाती है। Mistral कुंजी हमारे सर्वरों पर गुप्त रहती है और कभी उजागर नहीं होती।",
  },
  endpoints: {
    me: "खाता जानकारी: योजना, क्रेडिट बैलेंस, ईमेल, अधिकतम फ़ाइल आकार।",
    transcribe:
      "ऑडियो / वीडियो → टाइमस्टैम्प वाली SRT। शुरू हुई प्रति मिनट बिल (61 से = 2 मिनट = 20)। multipart `file`, या JSON { file_url }।",
    translate:
      "टेक्स्ट या SRT/VTT फ़ाइल का अनुवाद करता है (टाइमस्टैम्प संरक्षित)। शुरू हुई प्रति 1000 शब्द बिल, न्यूनतम 5। पैरामीटर: `target_lang`, `style`।",
    rephrase:
      "चुनी हुई शैली में टेक्स्ट पुनर्लिखित करता है। 500 शब्दों तक 3 क्रेडिट, उससे आगे 8। पैरामीटर: `text`, `style` (professional/casual/academic/creative/simple/legal)।",
    summarize:
      "टेक्स्ट का सारांश बनाता है। 500 शब्दों तक 3 क्रेडिट, उससे आगे 6। पैरामीटर: `text`, `format` (short/bullets/detailed)।",
    humanize:
      "AI टेक्स्ट को स्वाभाविक रूप से पढ़ने योग्य बनाने हेतु पुनर्लिखित करता है। 500 शब्दों तक 5 क्रेडिट, उससे आगे 12। पैरामीटर: `text`, `level` (light/medium/strong)।",
    convert_code:
      "स्रोत कोड को भाषाओं के बीच रूपांतरित करता है। पैरामीटर: `code`, `from_language`, `to_language`।",
    job: "id द्वारा एक कार्य प्राप्त करता है। &id=<uuid> जोड़ें।",
    remove_background:
      "एक पारदर्शी PNG काटता है। आज ब्राउज़र में चलता है (मुफ़्त और असीमित); REST पहुँच जारी हो रही है।",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text। आज ब्राउज़र में चलता है; REST पहुँच जारी हो रही है।",
    convert_image:
      "गुणवत्ता/आकार बदलने के साथ लक्षित फ़ॉर्मेट में पुनः एन्कोड करता है। आज ब्राउज़र में चलता है; REST पहुँच जारी हो रही है।",
  },
  errors: {
    bad_request: "पैरामीटर अनुपस्थित या अमान्य — संदेश बताता है कौन सा।",
    invalid_api_key: "कुंजी अनुपस्थित, नहीं मिली, या निरस्त।",
    insufficient_credits:
      "बैलेंस बहुत कम — प्रतिक्रिया में शामिल है कि आपको कितने चाहिए।",
    job_not_found: "वह कार्य id आपके खाते से संबंधित नहीं है।",
    text_too_long: "टेक्स्ट पेलोड को 40,000 वर्णों से कम रखें।",
    rate_limited: "बहुत अधिक अनुरोध — संकेतित विलंब के बाद पुनः प्रयास करें।",
    server_error: "हमारी ओर से कुछ टूट गया — पुनः प्रयास करें।",
    processing_failed: "अपस्ट्रीम मॉडल त्रुटि — आपसे शुल्क नहीं लिया जाता।",
  },
  errorsIntro1:
    "प्रत्येक एंडपॉइंट एक सुसंगत JSON आवरण लौटाता है जिसमें एक कोड",
  errorsIntro2: "और एक पठनीय संदेश होता है",
  errorsTableHttp: "HTTP",
  errorsTableError: "त्रुटि",
  errorsTableWhen: "कब",
  errorExampleLabel: "402 उदाहरण",
  privacyBody:
    "results/ संग्रहण में परिणाम फ़ाइलें 10-मिनट का साइन किया गया URL रखती हैं और एक निर्धारित पर्ज द्वारा 30 मिनट के भीतर हटा दी जाती हैं। कार्य पंक्तियाँ 2 घंटे बाद हटा दी जाती हैं। फ़ाइल सामग्री उस अवधि के बाद कभी नहीं रखी जाती।",
  sidebar: {
    getKeyTitle: "एक API कुंजी प्राप्त करें",
    getKeyBody:
      "REST API, Business योजना (€79/माह) में शामिल है — हर माह 300 क्रेडिट, साथ ही टॉप-अप पैक जो कभी समाप्त नहीं होते।",
    seePricing: "मूल्य निर्धारण देखें →",
    creditPacksTitle: "क्रेडिट पैक",
    creditPacksNote: "टॉप-अप कभी समाप्त नहीं होते।",
    costTableTitle: "लागत तालिका",
  },
  tester: {
    title: "इसे लाइव आज़माएँ",
    lead: "अपनी API कुंजी पेस्ट करें, एक एंडपॉइंट चुनें, हम वास्तविक कॉल करते हैं और प्रतिक्रिया दिखाते हैं।",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "भेजने के लिए टेक्स्ट…",
    calling: "कॉल हो रही है…",
    test: "परीक्षण",
    creditsRemaining: (n) => `${n} क्रेडिट शेष`,
    networkError: (msg) => `नेटवर्क त्रुटि: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const tr: ApiStrings = {
  sections: {
    auth: "Kimlik doğrulama",
    covers: "API'nin kapsadıkları",
    endpoints: "Uç noktalar",
    errors: "Hatalar",
    privacy: "Gizlilik",
  },
  auth: {
    intro1: "her istekle birlikte. Bir anahtarı şuradan oluşturun:",
    dashboardLink: "kontrol paneli",
    intro2:
      "(Business planı). Her çağrı bakiyenizden kredi harcar — krediler asla sona ermez.",
    baseUrlLabel: "Temel URL:",
    rateLimit1: "Hız sınırı:",
    rateLimit2: "dakikada 60 istek",
    rateLimit3: "anahtar başına. Aşılması şunu döndürür",
  },
  covers: {
    p1a: "API",
    p1Transcription: "deşifre",
    p1b: "(ses/video → metin, Voxtral) ve",
    p1TextAi: "metin & yapay zeka",
    p1c:
      "(çevir, özetle, yeniden ifade et, insanlaştır, kod dönüştür) içindir. OCR ve sunucu tarafı video/ağır biçim dönüştürmeleri sırada.",
    p2a: "Bizim",
    browserToolsLink: "tarayıcı araçlarımız",
    p2b:
      "— görsel, PDF ve ses düzenlemeleri, arka plan kaldırma, biçim dönüştürmeleri — tasarım gereği API'de değildir. Tamamen ziyaretçinin tarayıcısında çalışırlar, bu yüzden sunucu tarafında çağrılacak bir şey yoktur: dosya cihazdan asla çıkmaz ve bu araçlar ücretsiz, sınırsız ve gizli kalır. Bunun yerine kendi ürününüzde istemci tarafında çalıştırın.",
    p3:
      "API çağrılarına web uygulamasıyla aynı plan başına sınırlar uygulanır. Yüklemeler plana göre sınırlandırılır (Free 20 MB · Pro 1 GB · Business 5 GB) ve sunucu tarafında uygulanır; uzun medya başlanan dakika başına ücretlendirilir, dolayısıyla video uzunluğu katı bir kesinti yerine kredi bakiyenizle sınırlanır. Her çağrı anahtarınıza göre ölçülür — {api_keys} → {jobs} → {credit_transactions} — ve tek bir yaşam döngüsünü izler: görevi oluştur → dosyayı gönder → biz işleriz → sonucu alırsın → dosya silinir. Mistral anahtarı sunucularımızda gizli kalır ve asla açığa çıkmaz.",
  },
  endpoints: {
    me: "Hesap bilgileri: plan, kredi bakiyesi, e-posta, maksimum dosya boyutu.",
    transcribe:
      "Ses / video → zaman damgalı SRT. Başlanan dakika başına ücretlendirilir (61 sn = 2 dk = 20). multipart `file` veya JSON { file_url }.",
    translate:
      "Metni veya bir SRT/VTT dosyasını çevirir (zaman damgaları korunur). Başlanan 1000 kelime başına ücretlendirilir, en az 5. Parametreler: `target_lang`, `style`.",
    rephrase:
      "Metni seçilen bir üslupta yeniden yazar. 500 kelimeye kadar 3 kredi, ötesinde 8. Parametreler: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Metni özetler. 500 kelimeye kadar 3 kredi, ötesinde 6. Parametreler: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Yapay zeka metnini doğal okunacak şekilde yeniden yazar. 500 kelimeye kadar 5 kredi, ötesinde 12. Parametreler: `text`, `level` (light/medium/strong).",
    convert_code:
      "Kaynak kodunu diller arasında dönüştürür. Parametreler: `code`, `from_language`, `to_language`.",
    job: "id ile bir görevi getirir. &id=<uuid> ekleyin.",
    remove_background:
      "Şeffaf bir PNG keser. Bugün tarayıcıda çalışır (ücretsiz ve sınırsız); REST erişimi kullanıma sunuluyor.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Bugün tarayıcıda çalışır; REST erişimi kullanıma sunuluyor.",
    convert_image:
      "Kalite/yeniden boyutlandırma ile hedef biçime yeniden kodlar. Bugün tarayıcıda çalışır; REST erişimi kullanıma sunuluyor.",
  },
  errors: {
    bad_request: "Eksik veya geçersiz parametre — mesaj hangisi olduğunu söyler.",
    invalid_api_key: "Anahtar eksik, bulunamadı veya iptal edilmiş.",
    insufficient_credits:
      "Bakiye çok düşük — yanıt ne kadar gerektiğini içerir.",
    job_not_found: "O görev id'si hesabınıza ait değil.",
    text_too_long: "Metin yüklerini 40.000 karakterin altında tutun.",
    rate_limited: "Çok fazla istek — belirtilen gecikmeden sonra yeniden deneyin.",
    server_error: "Bizim tarafımızda bir şey bozuldu — yeniden deneyin.",
    processing_failed: "Üst akış modeli hatası — sizden ücret alınmaz.",
  },
  errorsIntro1:
    "Her uç nokta, bir kod içeren tutarlı bir JSON zarfı döndürür",
  errorsIntro2: "ve okunabilir bir mesaj",
  errorsTableHttp: "HTTP",
  errorsTableError: "hata",
  errorsTableWhen: "Ne zaman",
  errorExampleLabel: "402 örneği",
  privacyBody:
    "results/ depolamasındaki sonuç dosyaları 10 dakikalık imzalı bir URL taşır ve zamanlanmış bir temizlik ile 30 dakika içinde silinir. Görev satırları 2 saat sonra silinir. Dosya içeriği bu pencereden sonra asla saklanmaz.",
  sidebar: {
    getKeyTitle: "Bir API anahtarı edinin",
    getKeyBody:
      "REST API, Business planına dahildir (€79/ay) — her ay 300 kredi, ayrıca asla sona ermeyen yükleme paketleri.",
    seePricing: "Fiyatlandırmaya bakın →",
    creditPacksTitle: "Kredi paketleri",
    creditPacksNote: "Yüklemeler asla sona ermez.",
    costTableTitle: "Maliyet tablosu",
  },
  tester: {
    title: "Canlı deneyin",
    lead: "API anahtarınızı yapıştırın, bir uç nokta seçin, gerçek çağrıyı yapalım ve yanıtı gösterelim.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Gönderilecek metin…",
    calling: "Çağrılıyor…",
    test: "Test et",
    creditsRemaining: (n) => `${n} kredi kaldı`,
    networkError: (msg) => `Ağ hatası: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const id: ApiStrings = {
  sections: {
    auth: "Autentikasi",
    covers: "Apa yang dicakup API",
    endpoints: "Endpoint",
    errors: "Kesalahan",
    privacy: "Privasi",
  },
  auth: {
    intro1: "dengan setiap permintaan. Buat kunci dari",
    dashboardLink: "dasbor",
    intro2:
      "(paket Business). Setiap panggilan menghabiskan kredit dari saldo Anda — kredit tidak pernah kedaluwarsa.",
    baseUrlLabel: "URL dasar:",
    rateLimit1: "Batas laju:",
    rateLimit2: "60 permintaan/menit",
    rateLimit3: "per kunci. Melampauinya mengembalikan",
  },
  covers: {
    p1a: "API ini adalah",
    p1Transcription: "transkripsi",
    p1b: "(audio/video → teks, Voxtral) dan",
    p1TextAi: "teks & AI",
    p1c:
      "(menerjemahkan, meringkas, memparafrasa, memanusiakan, mengonversi kode). OCR dan konversi video/format berat di sisi server akan menyusul.",
    p2a: "Alat",
    browserToolsLink: "peramban kami",
    p2b:
      "— pengeditan gambar, PDF dan audio, penghapusan latar belakang, konversi format — sengaja tidak ada di API. Semuanya berjalan sepenuhnya di peramban pengunjung, jadi tidak ada yang perlu dipanggil di sisi server: berkas tidak pernah meninggalkan perangkat dan alat-alat ini tetap gratis, tanpa batas, dan privat. Jalankan saja di sisi klien dalam produk Anda sendiri.",
    p3:
      "Batas per paket yang sama berlaku untuk panggilan API seperti pada aplikasi web. Unggahan dibatasi per paket (Free 20 MB · Pro 1 GB · Business 5 GB) dan diberlakukan di sisi server; media panjang ditagih per menit yang dimulai, jadi durasi video dibatasi oleh saldo kredit Anda alih-alih batas keras. Setiap panggilan diukur terhadap kunci Anda — {api_keys} → {jobs} → {credit_transactions} — dan mengikuti satu siklus hidup: buat tugas → kirim berkas → kami memprosesnya → Anda mengambil hasilnya → berkas dihapus. Kunci Mistral tetap rahasia di server kami dan tidak pernah terungkap.",
  },
  endpoints: {
    me: "Info akun: paket, saldo kredit, email, ukuran berkas maksimum.",
    transcribe:
      "Audio / video → SRT bertanda waktu. Ditagih per menit yang dimulai (61 dtk = 2 mnt = 20). `file` multipart, atau JSON { file_url }.",
    translate:
      "Menerjemahkan teks atau berkas SRT/VTT (tanda waktu dipertahankan). Ditagih per 1000 kata yang dimulai, minimum 5. Parameter: `target_lang`, `style`.",
    rephrase:
      "Menulis ulang teks dalam gaya yang dipilih. 3 kredit hingga 500 kata, 8 di atasnya. Parameter: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Meringkas teks. 3 kredit hingga 500 kata, 6 di atasnya. Parameter: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Menulis ulang teks AI agar terbaca alami. 5 kredit hingga 500 kata, 12 di atasnya. Parameter: `text`, `level` (light/medium/strong).",
    convert_code:
      "Mengonversi kode sumber antarbahasa. Parameter: `code`, `from_language`, `to_language`.",
    job: "Mengambil tugas berdasarkan id. Tambahkan &id=<uuid>.",
    remove_background:
      "Memotong PNG transparan. Hari ini berjalan di peramban (gratis & tanpa batas); akses REST sedang diluncurkan.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Hari ini berjalan di peramban; akses REST sedang diluncurkan.",
    convert_image:
      "Mengodekan ulang ke format target dengan kualitas/pengubahan ukuran. Hari ini berjalan di peramban; akses REST sedang diluncurkan.",
  },
  errors: {
    bad_request: "Parameter hilang atau tidak valid — pesan menyebut yang mana.",
    invalid_api_key: "Kunci hilang, tidak ditemukan, atau dicabut.",
    insufficient_credits:
      "Saldo terlalu rendah — respons menyertakan berapa yang Anda butuhkan.",
    job_not_found: "id tugas itu bukan milik akun Anda.",
    text_too_long: "Jaga muatan teks di bawah 40.000 karakter.",
    rate_limited: "Terlalu banyak permintaan — coba lagi setelah jeda yang ditunjukkan.",
    server_error: "Ada yang rusak di sisi kami — coba lagi.",
    processing_failed: "Kesalahan model hulu — Anda tidak dikenai biaya.",
  },
  errorsIntro1:
    "Setiap endpoint mengembalikan amplop JSON yang konsisten dengan sebuah kode",
  errorsIntro2: "dan pesan yang dapat dibaca",
  errorsTableHttp: "HTTP",
  errorsTableError: "kesalahan",
  errorsTableWhen: "Kapan",
  errorExampleLabel: "Contoh 402",
  privacyBody:
    "Berkas hasil di penyimpanan results/ membawa URL bertanda tangan selama 10 menit dan dihapus dalam 30 menit oleh pembersihan terjadwal. Baris tugas dihapus setelah 2 jam. Konten berkas tidak pernah disimpan melampaui jendela tersebut.",
  sidebar: {
    getKeyTitle: "Dapatkan kunci API",
    getKeyBody:
      "REST API disertakan dalam paket Business (€79/bulan) — 300 kredit setiap bulan, plus paket isi ulang yang tidak pernah kedaluwarsa.",
    seePricing: "Lihat harga →",
    creditPacksTitle: "Paket kredit",
    creditPacksNote: "Isi ulang tidak pernah kedaluwarsa.",
    costTableTitle: "Tabel biaya",
  },
  tester: {
    title: "Coba langsung",
    lead: "Tempel kunci API Anda, pilih endpoint, kami melakukan panggilan nyata dan menampilkan responsnya.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Teks untuk dikirim…",
    calling: "Memanggil…",
    test: "Uji",
    creditsRemaining: (n) => `${n} kredit tersisa`,
    networkError: (msg) => `Kesalahan jaringan: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const vi: ApiStrings = {
  sections: {
    auth: "Xác thực",
    covers: "Phạm vi của API",
    endpoints: "Điểm cuối",
    errors: "Lỗi",
    privacy: "Quyền riêng tư",
  },
  auth: {
    intro1: "với mỗi yêu cầu. Tạo một khóa từ",
    dashboardLink: "bảng điều khiển",
    intro2:
      "(gói Business). Mỗi lệnh gọi tiêu tốn tín dụng từ số dư của bạn — tín dụng không bao giờ hết hạn.",
    baseUrlLabel: "URL cơ sở:",
    rateLimit1: "Giới hạn tốc độ:",
    rateLimit2: "60 yêu cầu/phút",
    rateLimit3: "mỗi khóa. Vượt quá sẽ trả về",
  },
  covers: {
    p1a: "API dành cho",
    p1Transcription: "chuyển lời nói thành văn bản",
    p1b: "(âm thanh/video → văn bản, Voxtral) và",
    p1TextAi: "văn bản & AI",
    p1c:
      "(dịch, tóm tắt, diễn đạt lại, nhân hóa, chuyển đổi mã). OCR và chuyển đổi video/định dạng nặng phía máy chủ sẽ ra mắt tiếp theo.",
    p2a: "Các",
    browserToolsLink: "công cụ trình duyệt",
    p2b:
      "của chúng tôi — chỉnh sửa hình ảnh, PDF và âm thanh, xóa nền, chuyển đổi định dạng — không có trong API, theo thiết kế. Chúng chạy hoàn toàn trong trình duyệt của khách truy cập, nên không có gì để gọi phía máy chủ: tệp không bao giờ rời khỏi thiết bị và các công cụ này vẫn miễn phí, không giới hạn và riêng tư. Thay vào đó hãy chạy chúng phía máy khách trong sản phẩm của riêng bạn.",
    p3:
      "Các giới hạn theo gói áp dụng cho lệnh gọi API giống như với ứng dụng web. Tải lên bị giới hạn theo gói (Free 20 MB · Pro 1 GB · Business 5 GB) và được thực thi phía máy chủ; phương tiện dài được tính phí theo mỗi phút đã bắt đầu, nên độ dài video bị giới hạn bởi số dư tín dụng của bạn thay vì một mức cắt cứng. Mỗi lệnh gọi được đo theo khóa của bạn — {api_keys} → {jobs} → {credit_transactions} — và tuân theo một vòng đời duy nhất: tạo tác vụ → gửi tệp → chúng tôi xử lý → bạn lấy kết quả → tệp bị xóa. Khóa Mistral được giữ bí mật trên máy chủ của chúng tôi và không bao giờ bị lộ.",
  },
  endpoints: {
    me: "Thông tin tài khoản: gói, số dư tín dụng, email, kích thước tệp tối đa.",
    transcribe:
      "Âm thanh / video → SRT có dấu thời gian. Tính phí theo mỗi phút đã bắt đầu (61 giây = 2 phút = 20). `file` multipart, hoặc JSON { file_url }.",
    translate:
      "Dịch văn bản hoặc tệp SRT/VTT (giữ nguyên dấu thời gian). Tính phí theo mỗi 1000 từ đã bắt đầu, tối thiểu 5. Tham số: `target_lang`, `style`.",
    rephrase:
      "Viết lại văn bản theo phong cách đã chọn. 3 tín dụng tới 500 từ, 8 trở lên. Tham số: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Tóm tắt văn bản. 3 tín dụng tới 500 từ, 6 trở lên. Tham số: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Viết lại văn bản AI để đọc tự nhiên. 5 tín dụng tới 500 từ, 12 trở lên. Tham số: `text`, `level` (light/medium/strong).",
    convert_code:
      "Chuyển đổi mã nguồn giữa các ngôn ngữ. Tham số: `code`, `from_language`, `to_language`.",
    job: "Lấy một tác vụ theo id. Thêm &id=<uuid>.",
    remove_background:
      "Cắt ra một PNG trong suốt. Hôm nay chạy trong trình duyệt (miễn phí & không giới hạn); quyền truy cập REST đang được triển khai.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Hôm nay chạy trong trình duyệt; quyền truy cập REST đang được triển khai.",
    convert_image:
      "Mã hóa lại sang định dạng mục tiêu với chất lượng/đổi kích thước. Hôm nay chạy trong trình duyệt; quyền truy cập REST đang được triển khai.",
  },
  errors: {
    bad_request: "Tham số thiếu hoặc không hợp lệ — thông báo cho biết tham số nào.",
    invalid_api_key: "Khóa bị thiếu, không tìm thấy, hoặc đã thu hồi.",
    insufficient_credits:
      "Số dư quá thấp — phản hồi bao gồm số lượng bạn cần.",
    job_not_found: "id tác vụ đó không thuộc tài khoản của bạn.",
    text_too_long: "Giữ tải trọng văn bản dưới 40.000 ký tự.",
    rate_limited: "Quá nhiều yêu cầu — thử lại sau độ trễ được chỉ định.",
    server_error: "Đã có sự cố phía chúng tôi — thử lại.",
    processing_failed: "Lỗi mô hình thượng nguồn — bạn không bị tính phí.",
  },
  errorsIntro1:
    "Mỗi điểm cuối trả về một phong bì JSON nhất quán với một mã",
  errorsIntro2: "và một thông báo dễ đọc",
  errorsTableHttp: "HTTP",
  errorsTableError: "lỗi",
  errorsTableWhen: "Khi nào",
  errorExampleLabel: "Ví dụ 402",
  privacyBody:
    "Các tệp kết quả trong bộ lưu trữ results/ mang một URL đã ký 10 phút và bị xóa trong vòng 30 phút bằng một lần dọn dẹp theo lịch. Các hàng tác vụ bị xóa sau 2 giờ. Nội dung tệp không bao giờ được giữ lại quá khung thời gian đó.",
  sidebar: {
    getKeyTitle: "Lấy một khóa API",
    getKeyBody:
      "REST API đi kèm gói Business (€79/tháng) — 300 tín dụng mỗi tháng, cùng các gói nạp thêm không bao giờ hết hạn.",
    seePricing: "Xem giá →",
    creditPacksTitle: "Gói tín dụng",
    creditPacksNote: "Các lần nạp thêm không bao giờ hết hạn.",
    costTableTitle: "Bảng chi phí",
  },
  tester: {
    title: "Dùng thử trực tiếp",
    lead: "Dán khóa API của bạn, chọn một điểm cuối, chúng tôi thực hiện lệnh gọi thật và hiển thị phản hồi.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Văn bản để gửi…",
    calling: "Đang gọi…",
    test: "Kiểm tra",
    creditsRemaining: (n) => `Còn lại ${n} tín dụng`,
    networkError: (msg) => `Lỗi mạng: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const sv: ApiStrings = {
  sections: {
    auth: "Autentisering",
    covers: "Vad API:et täcker",
    endpoints: "Slutpunkter",
    errors: "Fel",
    privacy: "Integritet",
  },
  auth: {
    intro1: "med varje förfrågan. Generera en nyckel från din",
    dashboardLink: "instrumentpanel",
    intro2:
      "(Business-plan). Varje anrop förbrukar krediter från ditt saldo — krediter förfaller aldrig.",
    baseUrlLabel: "Bas-URL:",
    rateLimit1: "Hastighetsgräns:",
    rateLimit2: "60 förfrågningar/minut",
    rateLimit3: "per nyckel. Att överskrida den returnerar",
  },
  covers: {
    p1a: "API:et är för",
    p1Transcription: "transkription",
    p1b: "(ljud/video → text, Voxtral) och",
    p1TextAi: "text & AI",
    p1c:
      "(översätta, sammanfatta, omformulera, mänskliggöra, konvertera kod). OCR och serversidiga video-/tungformatkonverteringar lanseras härnäst.",
    p2a: "Våra",
    browserToolsLink: "webbläsarverktyg",
    p2b:
      "— bild-, PDF- och ljudredigeringar, bakgrundsborttagning, formatkonverteringar — finns medvetet inte i API:et. De körs helt i besökarens webbläsare, så det finns inget att anropa på serversidan: filen lämnar aldrig enheten och dessa verktyg förblir gratis, obegränsade och privata. Kör dem på klientsidan i din egen produkt i stället.",
    p3:
      "Samma gränser per plan gäller för API-anrop som för webbappen. Uppladdningar är begränsade per plan (Free 20 MB · Pro 1 GB · Business 5 GB) och tillämpas på serversidan; långa medier debiteras per påbörjad minut, så videolängden begränsas av ditt kreditsaldo snarare än en hård gräns. Varje anrop mäts mot din nyckel — {api_keys} → {jobs} → {credit_transactions} — och följer en enda livscykel: skapa uppgiften → skicka filen → vi bearbetar den → du hämtar resultatet → filen raderas. Mistral-nyckeln förblir hemlig på våra servrar och exponeras aldrig.",
  },
  endpoints: {
    me: "Kontoinformation: plan, kreditsaldo, e-post, maximal filstorlek.",
    transcribe:
      "Ljud / video → SRT med tidsstämplar. Debiteras per påbörjad minut (61 s = 2 min = 20). multipart `file`, eller JSON { file_url }.",
    translate:
      "Översätter text eller en SRT/VTT-fil (tidsstämplar bevaras). Debiteras per påbörjade 1000 ord, minst 5. Parametrar: `target_lang`, `style`.",
    rephrase:
      "Skriver om text i en vald stil. 3 krediter upp till 500 ord, 8 därutöver. Parametrar: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Sammanfattar text. 3 krediter upp till 500 ord, 6 därutöver. Parametrar: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Skriver om AI-text så att den läses naturligt. 5 krediter upp till 500 ord, 12 därutöver. Parametrar: `text`, `level` (light/medium/strong).",
    convert_code:
      "Konverterar källkod mellan språk. Parametrar: `code`, `from_language`, `to_language`.",
    job: "Hämtar ett jobb via id. Lägg till &id=<uuid>.",
    remove_background:
      "Klipper ut en transparent PNG. Körs i webbläsaren i dag (gratis & obegränsat); REST-åtkomst rullas ut.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Körs i webbläsaren i dag; REST-åtkomst rullas ut.",
    convert_image:
      "Kodar om till ett målformat med kvalitet/storleksändring. Körs i webbläsaren i dag; REST-åtkomst rullas ut.",
  },
  errors: {
    bad_request: "Saknad eller ogiltig parameter — meddelandet anger vilken.",
    invalid_api_key: "Nyckeln saknas, hittades inte eller är återkallad.",
    insufficient_credits:
      "Saldot är för lågt — svaret anger hur många du behöver.",
    job_not_found: "Det jobb-id:t tillhör inte ditt konto.",
    text_too_long: "Håll textnyttolaster under 40 000 tecken.",
    rate_limited: "För många förfrågningar — försök igen efter den angivna fördröjningen.",
    server_error: "Något gick fel på vår sida — försök igen.",
    processing_failed: "Fel i uppströmsmodellen — du debiteras inte.",
  },
  errorsIntro1:
    "Varje slutpunkt returnerar ett enhetligt JSON-kuvert med en kod",
  errorsIntro2: "och ett läsbart meddelande",
  errorsTableHttp: "HTTP",
  errorsTableError: "fel",
  errorsTableWhen: "När",
  errorExampleLabel: "402-exempel",
  privacyBody:
    "Resultatfiler i results/-lagringen bär en signerad URL som gäller i 10 minuter och raderas inom 30 minuter av en schemalagd rensning. Jobbrader raderas efter 2 timmar. Filinnehåll behålls aldrig efter det fönstret.",
  sidebar: {
    getKeyTitle: "Skaffa en API-nyckel",
    getKeyBody:
      "REST-API:et ingår i Business-planen (79 €/månad) — 300 krediter varje månad, plus påfyllnadspaket som aldrig förfaller.",
    seePricing: "Se priser →",
    creditPacksTitle: "Kreditpaket",
    creditPacksNote: "Påfyllningar förfaller aldrig.",
    costTableTitle: "Kostnadstabell",
  },
  tester: {
    title: "Prova live",
    lead: "Klistra in din API-nyckel, välj en slutpunkt, vi gör det riktiga anropet och visar svaret.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Text att skicka…",
    calling: "Anropar…",
    test: "Testa",
    creditsRemaining: (n) => `${n} krediter kvar`,
    networkError: (msg) => `Nätverksfel: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const pl: ApiStrings = {
  sections: {
    auth: "Uwierzytelnianie",
    covers: "Co obejmuje API",
    endpoints: "Punkty końcowe",
    errors: "Błędy",
    privacy: "Prywatność",
  },
  auth: {
    intro1: "przy każdym żądaniu. Wygeneruj klucz w swoim",
    dashboardLink: "panelu",
    intro2:
      "(plan Business). Każde wywołanie zużywa kredyty z Twojego salda — kredyty nigdy nie wygasają.",
    baseUrlLabel: "Bazowy URL:",
    rateLimit1: "Limit szybkości:",
    rateLimit2: "60 żądań/minutę",
    rateLimit3: "na klucz. Przekroczenie zwraca",
  },
  covers: {
    p1a: "API służy do",
    p1Transcription: "transkrypcji",
    p1b: "(audio/wideo → tekst, Voxtral) oraz",
    p1TextAi: "tekstu i AI",
    p1c:
      "(tłumaczenie, streszczanie, przeformułowanie, humanizacja, konwersja kodu). OCR oraz konwersje wideo/ciężkich formatów po stronie serwera pojawią się w następnej kolejności.",
    p2a: "Nasze",
    browserToolsLink: "narzędzia przeglądarkowe",
    p2b:
      "— edycje obrazów, PDF i audio, usuwanie tła, konwersje formatów — z założenia nie są w API. Działają w całości w przeglądarce odwiedzającego, więc po stronie serwera nie ma niczego do wywołania: plik nigdy nie opuszcza urządzenia, a narzędzia te pozostają darmowe, nieograniczone i prywatne. Uruchamiaj je po stronie klienta we własnym produkcie.",
    p3:
      "Do wywołań API stosują się te same limity na plan, co do aplikacji webowej. Przesyłane pliki są ograniczone według planu (Free 20 MB · Pro 1 GB · Business 5 GB) i egzekwowane po stronie serwera; długie media są rozliczane za rozpoczętą minutę, więc długość wideo jest ograniczona Twoim saldem kredytów, a nie sztywnym progiem. Każde wywołanie jest mierzone względem Twojego klucza — {api_keys} → {jobs} → {credit_transactions} — i podlega jednemu cyklowi życia: utwórz zadanie → wyślij plik → przetwarzamy je → pobierasz wynik → plik zostaje usunięty. Klucz Mistral pozostaje tajny na naszych serwerach i nigdy nie jest ujawniany.",
  },
  endpoints: {
    me: "Informacje o koncie: plan, saldo kredytów, e-mail, maksymalny rozmiar pliku.",
    transcribe:
      "Audio / wideo → SRT ze znacznikami czasu. Rozliczane za rozpoczętą minutę (61 s = 2 min = 20). multipart `file` lub JSON { file_url }.",
    translate:
      "Tłumaczy tekst lub plik SRT/VTT (znaczniki czasu zachowane). Rozliczane za rozpoczęte 1000 słów, minimum 5. Parametry: `target_lang`, `style`.",
    rephrase:
      "Przepisuje tekst w wybranym stylu. 3 kredyty do 500 słów, 8 powyżej. Parametry: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Streszcza tekst. 3 kredyty do 500 słów, 6 powyżej. Parametry: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Przepisuje tekst AI tak, by czytał się naturalnie. 5 kredytów do 500 słów, 12 powyżej. Parametry: `text`, `level` (light/medium/strong).",
    convert_code:
      "Konwertuje kod źródłowy między językami. Parametry: `code`, `from_language`, `to_language`.",
    job: "Pobiera zadanie po id. Dodaj &id=<uuid>.",
    remove_background:
      "Wycina przezroczysty PNG. Dziś działa w przeglądarce (za darmo i bez limitu); dostęp REST jest wdrażany.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Dziś działa w przeglądarce; dostęp REST jest wdrażany.",
    convert_image:
      "Ponownie koduje do formatu docelowego z jakością/zmianą rozmiaru. Dziś działa w przeglądarce; dostęp REST jest wdrażany.",
  },
  errors: {
    bad_request: "Brakujący lub nieprawidłowy parametr — komunikat wskazuje który.",
    invalid_api_key: "Klucz brakuje, nie znaleziono lub został cofnięty.",
    insufficient_credits:
      "Saldo zbyt niskie — odpowiedź zawiera, ile potrzebujesz.",
    job_not_found: "To id zadania nie należy do Twojego konta.",
    text_too_long: "Utrzymuj ładunki tekstowe poniżej 40 000 znaków.",
    rate_limited: "Zbyt wiele żądań — spróbuj ponownie po wskazanym opóźnieniu.",
    server_error: "Coś się zepsuło po naszej stronie — spróbuj ponownie.",
    processing_failed: "Błąd modelu nadrzędnego — nie zostaniesz obciążony.",
  },
  errorsIntro1:
    "Każdy punkt końcowy zwraca spójną kopertę JSON z kodem",
  errorsIntro2: "i czytelnym komunikatem",
  errorsTableHttp: "HTTP",
  errorsTableError: "błąd",
  errorsTableWhen: "Kiedy",
  errorExampleLabel: "Przykład 402",
  privacyBody:
    "Pliki wyników w magazynie results/ noszą podpisany URL ważny 10 minut i są usuwane w ciągu 30 minut przez zaplanowane czyszczenie. Wiersze zadań są usuwane po 2 godzinach. Zawartość plików nigdy nie jest przechowywana poza tym oknem.",
  sidebar: {
    getKeyTitle: "Uzyskaj klucz API",
    getKeyBody:
      "REST API jest dołączone do planu Business (79 €/miesiąc) — 300 kredytów co miesiąc, plus pakiety doładowań, które nigdy nie wygasają.",
    seePricing: "Zobacz cennik →",
    creditPacksTitle: "Pakiety kredytów",
    creditPacksNote: "Doładowania nigdy nie wygasają.",
    costTableTitle: "Tabela kosztów",
  },
  tester: {
    title: "Wypróbuj na żywo",
    lead: "Wklej swój klucz API, wybierz punkt końcowy, wykonujemy prawdziwe wywołanie i pokazujemy odpowiedź.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Tekst do wysłania…",
    calling: "Wywoływanie…",
    test: "Testuj",
    creditsRemaining: (n) => `Pozostało ${n} kredytów`,
    networkError: (msg) => `Błąd sieci: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const uk: ApiStrings = {
  sections: {
    auth: "Автентифікація",
    covers: "Що охоплює API",
    endpoints: "Кінцеві точки",
    errors: "Помилки",
    privacy: "Конфіденційність",
  },
  auth: {
    intro1: "з кожним запитом. Згенеруйте ключ у своїй",
    dashboardLink: "панелі керування",
    intro2:
      "(план Business). Кожен виклик витрачає кредити з вашого балансу — кредити ніколи не згоряють.",
    baseUrlLabel: "Базовий URL:",
    rateLimit1: "Обмеження частоти:",
    rateLimit2: "60 запитів/хвилину",
    rateLimit3: "на ключ. Перевищення повертає",
  },
  covers: {
    p1a: "API — це",
    p1Transcription: "транскрипція",
    p1b: "(аудіо/відео → текст, Voxtral) та",
    p1TextAi: "текст та ШІ",
    p1c:
      "(переклад, резюмування, перефразування, олюднення, конвертація коду). OCR та серверні конвертації відео/важких форматів з’являться наступними.",
    p2a: "Наші",
    browserToolsLink: "браузерні інструменти",
    p2b:
      "— редагування зображень, PDF та аудіо, видалення фону, конвертації форматів — навмисно не входять до API. Вони виконуються повністю в браузері відвідувача, тож на стороні сервера немає чого викликати: файл ніколи не залишає пристрій, а ці інструменти лишаються безкоштовними, безлімітними та приватними. Запускайте їх на стороні клієнта у власному продукті.",
    p3:
      "До викликів API застосовуються ті самі обмеження за планом, що й до вебзастосунку. Завантаження обмежені за планом (Free 20 MB · Pro 1 GB · Business 5 GB) та застосовуються на стороні сервера; довгі медіа тарифікуються за розпочату хвилину, тож тривалість відео обмежена вашим балансом кредитів, а не жорстким лімітом. Кожен виклик обліковується за вашим ключем — {api_keys} → {jobs} → {credit_transactions} — і проходить єдиний життєвий цикл: створити завдання → надіслати файл → ми обробляємо → ви забираєте результат → файл видаляється. Ключ Mistral лишається таємним на наших серверах і ніколи не розкривається.",
  },
  endpoints: {
    me: "Відомості про обліковий запис: план, баланс кредитів, email, максимальний розмір файлу.",
    transcribe:
      "Аудіо / відео → SRT з мітками часу. Тарифікація за розпочату хвилину (61 с = 2 хв = 20). multipart `file` або JSON { file_url }.",
    translate:
      "Перекладає текст або файл SRT/VTT (мітки часу збережено). Тарифікація за розпочаті 1000 слів, мінімум 5. Параметри: `target_lang`, `style`.",
    rephrase:
      "Переписує текст у вибраному стилі. 3 кредити до 500 слів, 8 понад те. Параметри: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Резюмує текст. 3 кредити до 500 слів, 6 понад те. Параметри: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Переписує текст ШІ, щоб він читався природно. 5 кредитів до 500 слів, 12 понад те. Параметри: `text`, `level` (light/medium/strong).",
    convert_code:
      "Конвертує вихідний код між мовами. Параметри: `code`, `from_language`, `to_language`.",
    job: "Отримує завдання за id. Додайте &id=<uuid>.",
    remove_background:
      "Вирізає прозорий PNG. Сьогодні працює в браузері (безкоштовно та без обмежень); доступ через REST розгортається.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Сьогодні працює в браузері; доступ через REST розгортається.",
    convert_image:
      "Перекодовує в цільовий формат з якістю/зміною розміру. Сьогодні працює в браузері; доступ через REST розгортається.",
  },
  errors: {
    bad_request: "Відсутній або недійсний параметр — повідомлення вказує який.",
    invalid_api_key: "Ключ відсутній, не знайдено або відкликано.",
    insufficient_credits:
      "Баланс занадто низький — у відповіді зазначено, скільки потрібно.",
    job_not_found: "Цей id завдання не належить вашому обліковому запису.",
    text_too_long: "Тримайте текстові корисні навантаження до 40 000 символів.",
    rate_limited: "Забагато запитів — повторіть після зазначеної затримки.",
    server_error: "Щось зламалося з нашого боку — повторіть.",
    processing_failed: "Помилка вищого за течією моделі — з вас не стягується плата.",
  },
  errorsIntro1:
    "Кожна кінцева точка повертає узгоджену оболонку JSON з кодом",
  errorsIntro2: "та читабельним повідомленням",
  errorsTableHttp: "HTTP",
  errorsTableError: "помилка",
  errorsTableWhen: "Коли",
  errorExampleLabel: "Приклад 402",
  privacyBody:
    "Файли результатів у сховищі results/ мають підписаний URL на 10 хвилин і видаляються протягом 30 хвилин запланованим очищенням. Рядки завдань видаляються через 2 години. Вміст файлів ніколи не зберігається поза цим вікном.",
  sidebar: {
    getKeyTitle: "Отримати ключ API",
    getKeyBody:
      "REST API входить до плану Business (79 €/місяць) — 300 кредитів щомісяця, а також пакети поповнення, які ніколи не згоряють.",
    seePricing: "Переглянути ціни →",
    creditPacksTitle: "Пакети кредитів",
    creditPacksNote: "Поповнення ніколи не згоряють.",
    costTableTitle: "Таблиця вартості",
  },
  tester: {
    title: "Спробувати наживо",
    lead: "Вставте свій ключ API, виберіть кінцеву точку, ми робимо справжній виклик і показуємо відповідь.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Текст для надсилання…",
    calling: "Виклик…",
    test: "Перевірити",
    creditsRemaining: (n) => `Залишилось ${n} кредитів`,
    networkError: (msg) => `Помилка мережі: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const cs: ApiStrings = {
  sections: {
    auth: "Ověření",
    covers: "Co API pokrývá",
    endpoints: "Koncové body",
    errors: "Chyby",
    privacy: "Soukromí",
  },
  auth: {
    intro1: "s každým požadavkem. Vygenerujte klíč ve svém",
    dashboardLink: "panelu",
    intro2:
      "(plán Business). Každé volání spotřebovává kredity z vašeho zůstatku — kredity nikdy nevyprší.",
    baseUrlLabel: "Základní URL:",
    rateLimit1: "Limit rychlosti:",
    rateLimit2: "60 požadavků/minutu",
    rateLimit3: "na klíč. Jeho překročení vrátí",
  },
  covers: {
    p1a: "API je pro",
    p1Transcription: "přepis",
    p1b: "(audio/video → text, Voxtral) a",
    p1TextAi: "text a AI",
    p1c:
      "(přeložit, shrnout, přeformulovat, polidštit, převést kód). OCR a serverové převody videa/těžkých formátů se zavádějí jako další.",
    p2a: "Naše",
    browserToolsLink: "prohlížečové nástroje",
    p2b:
      "— úpravy obrázků, PDF a zvuku, odstranění pozadí, převody formátů — záměrně nejsou v API. Běží zcela v prohlížeči návštěvníka, takže na straně serveru není co volat: soubor nikdy neopustí zařízení a tyto nástroje zůstávají zdarma, neomezené a soukromé. Spusťte je raději na straně klienta ve svém vlastním produktu.",
    p3:
      "Na volání API se vztahují stejné limity podle plánu jako na webovou aplikaci. Nahrávání je omezeno podle plánu (Free 20 MB · Pro 1 GB · Business 5 GB) a vynucováno na straně serveru; dlouhá média se účtují za započatou minutu, takže délka videa je omezena vaším zůstatkem kreditů, nikoli pevným stropem. Každé volání je měřeno vůči vašemu klíči — {api_keys} → {jobs} → {credit_transactions} — a sleduje jediný životní cyklus: vytvořit úlohu → odeslat soubor → zpracujeme jej → vyzvednete výsledek → soubor je smazán. Klíč Mistral zůstává tajný na našich serverech a nikdy není vystaven.",
  },
  endpoints: {
    me: "Informace o účtu: plán, zůstatek kreditů, e-mail, maximální velikost souboru.",
    transcribe:
      "Audio / video → SRT s časovými značkami. Účtováno za započatou minutu (61 s = 2 min = 20). multipart `file` nebo JSON { file_url }.",
    translate:
      "Přeloží text nebo soubor SRT/VTT (časové značky zachovány). Účtováno za započatých 1000 slov, minimum 5. Parametry: `target_lang`, `style`.",
    rephrase:
      "Přepíše text ve zvoleném stylu. 3 kredity do 500 slov, 8 nad to. Parametry: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Shrne text. 3 kredity do 500 slov, 6 nad to. Parametry: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Přepíše text od AI tak, aby se četl přirozeně. 5 kreditů do 500 slov, 12 nad to. Parametry: `text`, `level` (light/medium/strong).",
    convert_code:
      "Převádí zdrojový kód mezi jazyky. Parametry: `code`, `from_language`, `to_language`.",
    job: "Načte úlohu podle id. Přidejte &id=<uuid>.",
    remove_background:
      "Vyřízne průhledné PNG. Dnes běží v prohlížeči (zdarma a neomezeně); přístup přes REST se zavádí.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Dnes běží v prohlížeči; přístup přes REST se zavádí.",
    convert_image:
      "Překóduje do cílového formátu s kvalitou/změnou velikosti. Dnes běží v prohlížeči; přístup přes REST se zavádí.",
  },
  errors: {
    bad_request: "Chybějící nebo neplatný parametr — zpráva uvádí který.",
    invalid_api_key: "Klíč chybí, nebyl nalezen nebo byl zrušen.",
    insufficient_credits:
      "Zůstatek je příliš nízký — odpověď obsahuje, kolik potřebujete.",
    job_not_found: "To id úlohy nepatří k vašemu účtu.",
    text_too_long: "Udržujte textové datové části pod 40 000 znaků.",
    rate_limited: "Příliš mnoho požadavků — opakujte po uvedeném zpoždění.",
    server_error: "Na naší straně se něco pokazilo — opakujte.",
    processing_failed: "Chyba nadřazeného modelu — nic se vám neúčtuje.",
  },
  errorsIntro1:
    "Každý koncový bod vrací konzistentní obálku JSON s kódem",
  errorsIntro2: "a čitelnou zprávou",
  errorsTableHttp: "HTTP",
  errorsTableError: "chyba",
  errorsTableWhen: "Kdy",
  errorExampleLabel: "Příklad 402",
  privacyBody:
    "Soubory výsledků v úložišti results/ nesou podepsanou URL na 10 minut a jsou smazány do 30 minut naplánovaným úklidem. Řádky úloh jsou smazány po 2 hodinách. Obsah souborů není nikdy uchováván déle než toto okno.",
  sidebar: {
    getKeyTitle: "Získat klíč API",
    getKeyBody:
      "REST API je součástí plánu Business (79 €/měsíc) — 300 kreditů každý měsíc, plus dobíjecí balíčky, které nikdy nevyprší.",
    seePricing: "Zobrazit ceny →",
    creditPacksTitle: "Balíčky kreditů",
    creditPacksNote: "Dobití nikdy nevyprší.",
    costTableTitle: "Tabulka nákladů",
  },
  tester: {
    title: "Vyzkoušejte naživo",
    lead: "Vložte svůj klíč API, vyberte koncový bod, my provedeme skutečné volání a zobrazíme odpověď.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Text k odeslání…",
    calling: "Volání…",
    test: "Otestovat",
    creditsRemaining: (n) => `Zbývá ${n} kreditů`,
    networkError: (msg) => `Chyba sítě: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const TABLE: Partial<Record<Locale, ApiStrings>> = {
  en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi, tr, id, vi, sv, pl, uk, cs,
};

export function getApi(locale: Locale): ApiStrings {
  return TABLE[locale] ?? en;
}
