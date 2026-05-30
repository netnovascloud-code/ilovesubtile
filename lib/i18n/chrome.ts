import type { Locale } from "@/lib/i18n/locales";

export type ChromeStrings = {
  nav: { tools: string; pricing: string; api: string; login: string; start: string };
  footer: {
    tagline: string;
    topTools: string;
    product: string;
    legal: string;
    pricing: string;
    api: string;
    dashboard: string;
    vsVeed: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  card: { open: string; pro: string };
  account: { billing: string; logout: string };
  upload: {
    instant: string;
    dropOrClick: string;
    dropHere: string;
    formats: string;
    maxFree: string;
    selectFile: string;
    fileTooLarge: string;
  };
  processing: { working: string; uploading: string; processing: string; takes: string; ad: string };
  result: { ready: string; download: string; tryAnother: string; whatNext: string; preview: string };
  adblock: { title: string; body1: string; goPro: string; body2: string; dismiss: string };
  errors: {
    serverReturned: string;
    noResultUrl: string;
    network: string;
    notWiredUp: string;
    noCues: string;
    badFormat: string;
    cantParse: string;
    wrongFormat: string;
  };
  sync: { prompt: string; help: string; seconds: string; millis: string; apply: string; cancel: string };
  clean: {
    title: string;
    summary: string;
    cancel: string;
    download: string;
    stripSdh: string;
    removeDup: string;
    shouting: string;
    collapseWs: string;
    trim: string;
  };
  editor: { openAnother: string; export: string; delete: string; openFile: string; cues: string };
  srtToText: { merged: string; perCue: string };
  auth: {
    loginTitle: string;
    loginLead: string;
    registerTitle: string;
    registerLead: string;
    email: string;
    password: string;
    loginCta: string;
    registerCta: string;
    loading: string;
    orWithEmail: string;
    google: string;
    checkInbox: string;
    noAccount: string;
    createOne: string;
    hasAccount: string;
    logIn: string;
  };
};

const en: ChromeStrings = {
  nav: { tools: "Tools", pricing: "Pricing", api: "API", login: "Log in", start: "Get started" },
  footer: { tagline: "Free online conversion tools — files, images, code, text and more. One simple tool per job.", topTools: "Top tools", product: "Product", legal: "Legal", pricing: "Pricing", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Privacy", terms: "Terms", rights: "All rights reserved." },
  card: { open: "Open", pro: "Pro" },
  account: { billing: "Billing", logout: "Log out" },
  upload: { instant: "Instant conversion — runs in your browser, no upload needed", dropOrClick: "Drop your file or click to upload", dropHere: "Drop the file here", formats: "Accepted formats", maxFree: "Max {mb} MB on the free plan.", selectFile: "Select a file", fileTooLarge: "This file is {size}. Free limit is {mb} MB — upgrade to Pro for up to 500 MB." },
  processing: { working: "Working on your file…", uploading: "Uploading your file…", processing: "Processing your file…", takes: "This usually takes 30–90 seconds", ad: "Advertisement" },
  result: { ready: "Your file is ready", download: "Download", tryAnother: "Process another file", whatNext: "What's next?", preview: "Preview" },
  adblock: { title: "Konver is free thanks to ads", body1: "You can disable ads by", goPro: "going Pro at €9/month", body2: ", or by allowing ads on this site.", dismiss: "Dismiss" },
  errors: { serverReturned: "Server returned {status}. Try again in a moment.", noResultUrl: "The server didn't return a result URL.", network: "Network error.", notWiredUp: "This tool isn't wired up to a backend yet. Configure the matching Supabase Edge Function to enable it.", noCues: "No cues found.", badFormat: "Couldn't detect SRT or VTT format.", cantParse: "Couldn't parse that file.", wrongFormat: "That looks like a {fmt} file. Try the {other} converter instead." },
  sync: { prompt: "How much should we shift?", help: "Positive numbers delay subtitles (push them later). Negative advances them.", seconds: "Seconds", millis: "Milliseconds", apply: "Apply offset", cancel: "Cancel" },
  clean: { title: "What should we clean?", summary: "{a} cues in · {b} after cleanup.", cancel: "Cancel", download: "Download cleaned file", stripSdh: "Strip SDH tags like [music] (sigh)", removeDup: "Remove consecutive duplicate lines", shouting: "Convert ALL-CAPS to sentence case", collapseWs: "Collapse multiple spaces", trim: "Trim whitespace around each line" },
  editor: { openAnother: "Open another", export: "Export", delete: "Delete", openFile: "Open file", cues: "{n} cues" },
  srtToText: { merged: "Layout: merged paragraphs", perCue: "Layout: one line per cue" },
  auth: { loginTitle: "Welcome back", loginLead: "Log in to your Konver account.", registerTitle: "Create your account", registerLead: "5 free runs per day. No credit card required.", email: "Email", password: "Password", loginCta: "Log in", registerCta: "Create account", loading: "Please wait…", orWithEmail: "or with email", google: "Continue with Google", checkInbox: "Check your inbox to confirm your email.", noAccount: "Don't have an account?", createOne: "Create one", hasAccount: "Already have an account?", logIn: "Log in" },
};

const fr: ChromeStrings = {
  nav: { tools: "Outils", pricing: "Tarifs", api: "API", login: "Connexion", start: "Commencer" },
  footer: { tagline: "Outils de sous-titrage gratuits — générer, traduire, synchroniser, convertir. Un outil par tâche, tout dans votre navigateur.", topTools: "Outils phares", product: "Produit", legal: "Mentions légales", pricing: "Tarifs", api: "API", dashboard: "Tableau de bord", vsVeed: "vs VEED.io", privacy: "Confidentialité", terms: "CGU", rights: "Tous droits réservés." },
  card: { open: "Ouvrir", pro: "Pro" },
  account: { billing: "Facturation", logout: "Déconnexion" },
  upload: { instant: "Conversion instantanée — dans votre navigateur, aucun envoi requis", dropOrClick: "Déposez votre fichier ou cliquez pour téléverser", dropHere: "Déposez le fichier ici", formats: "Formats acceptés", maxFree: "Max {mb} Mo sur l'offre gratuite.", selectFile: "Choisir un fichier", fileTooLarge: "Ce fichier fait {size}. Limite gratuite : {mb} Mo — passez Pro pour jusqu'à 500 Mo." },
  processing: { working: "Traitement de votre fichier…", uploading: "Téléversement…", processing: "Traitement en cours…", takes: "Cela prend généralement 30 à 90 secondes", ad: "Publicité" },
  result: { ready: "Votre fichier est prêt", download: "Télécharger", tryAnother: "Traiter un autre fichier", whatNext: "Et ensuite ?", preview: "Aperçu" },
  adblock: { title: "Konver est gratuit grâce aux publicités", body1: "Vous pouvez désactiver les pubs en", goPro: "passant Pro pour 9 €/mois", body2: ", ou en autorisant les pubs sur ce site.", dismiss: "Fermer" },
  errors: { serverReturned: "Le serveur a renvoyé {status}. Réessayez dans un instant.", noResultUrl: "Le serveur n'a pas renvoyé d'URL de résultat.", network: "Erreur réseau.", notWiredUp: "Cet outil n'est pas encore branché à un backend. Configurez la fonction Supabase correspondante.", noCues: "Aucune ligne trouvée.", badFormat: "Format SRT ou VTT non détecté.", cantParse: "Impossible de lire ce fichier.", wrongFormat: "Ceci ressemble à un fichier {fmt}. Essayez plutôt le convertisseur {other}." },
  sync: { prompt: "De combien décaler ?", help: "Les nombres positifs retardent les sous-titres. Les négatifs les avancent.", seconds: "Secondes", millis: "Millisecondes", apply: "Appliquer le décalage", cancel: "Annuler" },
  clean: { title: "Que faut-il nettoyer ?", summary: "{a} lignes en entrée · {b} après nettoyage.", cancel: "Annuler", download: "Télécharger le fichier nettoyé", stripSdh: "Supprimer les balises SDH comme [musique] (soupir)", removeDup: "Supprimer les lignes en doublon consécutives", shouting: "Convertir les MAJUSCULES en casse de phrase", collapseWs: "Réduire les espaces multiples", trim: "Couper les espaces autour de chaque ligne" },
  editor: { openAnother: "Ouvrir un autre", export: "Exporter", delete: "Supprimer", openFile: "Ouvrir un fichier", cues: "{n} lignes" },
  srtToText: { merged: "Mise en page : paragraphes fusionnés", perCue: "Mise en page : une ligne par cue" },
  auth: { loginTitle: "Bon retour", loginLead: "Connectez-vous à votre compte Konver.", registerTitle: "Créez votre compte", registerLead: "5 utilisations gratuites par jour. Sans carte bancaire.", email: "E-mail", password: "Mot de passe", loginCta: "Se connecter", registerCta: "Créer le compte", loading: "Veuillez patienter…", orWithEmail: "ou avec un e-mail", google: "Continuer avec Google", checkInbox: "Consultez votre boîte mail pour confirmer votre e-mail.", noAccount: "Pas encore de compte ?", createOne: "Créez-en un", hasAccount: "Déjà un compte ?", logIn: "Se connecter" },
};

const es: ChromeStrings = {
  nav: { tools: "Herramientas", pricing: "Precios", api: "API", login: "Iniciar sesión", start: "Empezar" },
  footer: { tagline: "Herramientas gratuitas de subtítulos — generar, traducir, sincronizar, convertir. Una herramienta por tarea, todo en tu navegador.", topTools: "Herramientas destacadas", product: "Producto", legal: "Legal", pricing: "Precios", api: "API", dashboard: "Panel", vsVeed: "vs VEED.io", privacy: "Privacidad", terms: "Términos", rights: "Todos los derechos reservados." },
  card: { open: "Abrir", pro: "Pro" },
  account: { billing: "Facturación", logout: "Cerrar sesión" },
  upload: { instant: "Conversión instantánea — en tu navegador, sin subir nada", dropOrClick: "Suelta tu archivo o haz clic para subirlo", dropHere: "Suelta el archivo aquí", formats: "Formatos aceptados", maxFree: "Máx. {mb} MB en el plan gratis.", selectFile: "Elegir un archivo", fileTooLarge: "Este archivo pesa {size}. El límite gratis es {mb} MB — pasa a Pro hasta 500 MB." },
  processing: { working: "Procesando tu archivo…", uploading: "Subiendo…", processing: "Procesando…", takes: "Suele tardar entre 30 y 90 segundos", ad: "Publicidad" },
  result: { ready: "Tu archivo está listo", download: "Descargar", tryAnother: "Procesar otro archivo", whatNext: "¿Y ahora?", preview: "Vista previa" },
  adblock: { title: "Konver es gratis gracias a los anuncios", body1: "Puedes desactivar los anuncios", goPro: "pasando a Pro por 9 €/mes", body2: ", o permitiendo los anuncios en este sitio.", dismiss: "Cerrar" },
  errors: { serverReturned: "El servidor devolvió {status}. Inténtalo de nuevo.", noResultUrl: "El servidor no devolvió una URL de resultado.", network: "Error de red.", notWiredUp: "Esta herramienta aún no está conectada al backend. Configura la función Supabase correspondiente.", noCues: "No se encontraron líneas.", badFormat: "No se detectó el formato SRT o VTT.", cantParse: "No se pudo leer el archivo.", wrongFormat: "Parece un archivo {fmt}. Prueba el conversor {other}." },
  sync: { prompt: "¿Cuánto desplazar?", help: "Los números positivos retrasan los subtítulos. Los negativos los adelantan.", seconds: "Segundos", millis: "Milisegundos", apply: "Aplicar desplazamiento", cancel: "Cancelar" },
  clean: { title: "¿Qué hay que limpiar?", summary: "{a} líneas de entrada · {b} tras la limpieza.", cancel: "Cancelar", download: "Descargar archivo limpio", stripSdh: "Quitar etiquetas SDH como [música] (suspiro)", removeDup: "Eliminar líneas duplicadas consecutivas", shouting: "Convertir MAYÚSCULAS a mayúsculas de oración", collapseWs: "Colapsar espacios múltiples", trim: "Recortar espacios alrededor de cada línea" },
  editor: { openAnother: "Abrir otro", export: "Exportar", delete: "Eliminar", openFile: "Abrir archivo", cues: "{n} líneas" },
  srtToText: { merged: "Diseño: párrafos fusionados", perCue: "Diseño: una línea por cue" },
  auth: { loginTitle: "Bienvenido de nuevo", loginLead: "Inicia sesión en tu cuenta Konver.", registerTitle: "Crea tu cuenta", registerLead: "5 usos gratuitos al día. Sin tarjeta.", email: "Correo", password: "Contraseña", loginCta: "Iniciar sesión", registerCta: "Crear cuenta", loading: "Un momento…", orWithEmail: "o con correo", google: "Continuar con Google", checkInbox: "Revisa tu correo para confirmar.", noAccount: "¿No tienes cuenta?", createOne: "Crea una", hasAccount: "¿Ya tienes cuenta?", logIn: "Inicia sesión" },
};

const pt: ChromeStrings = {
  nav: { tools: "Ferramentas", pricing: "Preços", api: "API", login: "Entrar", start: "Começar" },
  footer: { tagline: "Ferramentas grátis de legendas — gerar, traduzir, sincronizar, converter. Uma ferramenta por tarefa, tudo no navegador.", topTools: "Ferramentas em destaque", product: "Produto", legal: "Legal", pricing: "Preços", api: "API", dashboard: "Painel", vsVeed: "vs VEED.io", privacy: "Privacidade", terms: "Termos", rights: "Todos os direitos reservados." },
  card: { open: "Abrir", pro: "Pro" },
  account: { billing: "Faturamento", logout: "Sair" },
  upload: { instant: "Conversão instantânea — no seu navegador, sem upload", dropOrClick: "Solte seu arquivo ou clique para enviar", dropHere: "Solte o arquivo aqui", formats: "Formatos aceitos", maxFree: "Máx. {mb} MB no plano grátis.", selectFile: "Escolher arquivo", fileTooLarge: "Este arquivo tem {size}. Limite grátis: {mb} MB — vá Pro até 500 MB." },
  processing: { working: "Processando seu arquivo…", uploading: "Enviando…", processing: "Processando…", takes: "Geralmente leva 30 a 90 segundos", ad: "Publicidade" },
  result: { ready: "Seu arquivo está pronto", download: "Baixar", tryAnother: "Processar outro arquivo", whatNext: "E agora?", preview: "Pré-visualização" },
  adblock: { title: "Konver é grátis graças aos anúncios", body1: "Você pode desativar os anúncios", goPro: "indo Pro por €9/mês", body2: ", ou permitindo anúncios neste site.", dismiss: "Fechar" },
  errors: { serverReturned: "O servidor retornou {status}. Tente novamente.", noResultUrl: "O servidor não retornou URL de resultado.", network: "Erro de rede.", notWiredUp: "Esta ferramenta ainda não está conectada ao backend. Configure a função Supabase correspondente.", noCues: "Nenhuma linha encontrada.", badFormat: "Formato SRT ou VTT não detectado.", cantParse: "Não foi possível ler o arquivo.", wrongFormat: "Parece um arquivo {fmt}. Tente o conversor {other}." },
  sync: { prompt: "Quanto deslocar?", help: "Números positivos atrasam as legendas. Negativos adiantam.", seconds: "Segundos", millis: "Milissegundos", apply: "Aplicar deslocamento", cancel: "Cancelar" },
  clean: { title: "O que limpar?", summary: "{a} linhas de entrada · {b} após a limpeza.", cancel: "Cancelar", download: "Baixar arquivo limpo", stripSdh: "Remover tags SDH como [música] (suspiro)", removeDup: "Remover linhas duplicadas consecutivas", shouting: "Converter MAIÚSCULAS para caixa de frase", collapseWs: "Colapsar espaços múltiplos", trim: "Aparar espaços ao redor de cada linha" },
  editor: { openAnother: "Abrir outro", export: "Exportar", delete: "Excluir", openFile: "Abrir arquivo", cues: "{n} linhas" },
  srtToText: { merged: "Layout: parágrafos mesclados", perCue: "Layout: uma linha por cue" },
  auth: { loginTitle: "Bem-vindo de volta", loginLead: "Entre na sua conta Konver.", registerTitle: "Crie sua conta", registerLead: "5 usos grátis por dia. Sem cartão.", email: "E-mail", password: "Senha", loginCta: "Entrar", registerCta: "Criar conta", loading: "Aguarde…", orWithEmail: "ou com e-mail", google: "Continuar com Google", checkInbox: "Confira seu e-mail para confirmar.", noAccount: "Ainda não tem conta?", createOne: "Crie uma", hasAccount: "Já tem conta?", logIn: "Entrar" },
};

const de: ChromeStrings = {
  nav: { tools: "Tools", pricing: "Preise", api: "API", login: "Anmelden", start: "Loslegen" },
  footer: { tagline: "Kostenlose Untertitel-Tools — erzeugen, übersetzen, synchronisieren, umwandeln. Ein Tool pro Aufgabe, alles im Browser.", topTools: "Top-Tools", product: "Produkt", legal: "Rechtliches", pricing: "Preise", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Datenschutz", terms: "AGB", rights: "Alle Rechte vorbehalten." },
  card: { open: "Öffnen", pro: "Pro" },
  account: { billing: "Abrechnung", logout: "Abmelden" },
  upload: { instant: "Sofortige Konvertierung — im Browser, kein Upload nötig", dropOrClick: "Datei hier ablegen oder klicken zum Hochladen", dropHere: "Datei hier ablegen", formats: "Akzeptierte Formate", maxFree: "Max. {mb} MB im Gratis-Plan.", selectFile: "Datei wählen", fileTooLarge: "Diese Datei ist {size}. Gratis-Limit: {mb} MB — Pro bis 500 MB." },
  processing: { working: "Datei wird verarbeitet…", uploading: "Wird hochgeladen…", processing: "Wird verarbeitet…", takes: "Dauert meist 30–90 Sekunden", ad: "Werbung" },
  result: { ready: "Deine Datei ist fertig", download: "Herunterladen", tryAnother: "Weitere Datei verarbeiten", whatNext: "Was als Nächstes?", preview: "Vorschau" },
  adblock: { title: "Konver ist dank Werbung kostenlos", body1: "Du kannst die Werbung deaktivieren, indem du", goPro: "Pro für 9 €/Monat holst", body2: " oder Werbung auf dieser Seite zulässt.", dismiss: "Schließen" },
  errors: { serverReturned: "Server antwortete mit {status}. Versuch es gleich nochmal.", noResultUrl: "Der Server lieferte keine Ergebnis-URL.", network: "Netzwerkfehler.", notWiredUp: "Dieses Tool ist noch nicht ans Backend angeschlossen. Richte die zugehörige Supabase-Funktion ein.", noCues: "Keine Cues gefunden.", badFormat: "SRT- oder VTT-Format nicht erkannt.", cantParse: "Datei konnte nicht gelesen werden.", wrongFormat: "Sieht aus wie eine {fmt}-Datei. Nutze stattdessen den {other}-Konverter." },
  sync: { prompt: "Wie viel verschieben?", help: "Positive Werte verzögern Untertitel, negative beschleunigen sie.", seconds: "Sekunden", millis: "Millisekunden", apply: "Verschiebung anwenden", cancel: "Abbrechen" },
  clean: { title: "Was soll bereinigt werden?", summary: "{a} Cues rein · {b} nach Bereinigung.", cancel: "Abbrechen", download: "Bereinigte Datei herunterladen", stripSdh: "SDH-Tags wie [Musik] (seufzt) entfernen", removeDup: "Aufeinanderfolgende doppelte Zeilen entfernen", shouting: "GROSSBUCHSTABEN in Satzform umwandeln", collapseWs: "Mehrfach-Leerzeichen reduzieren", trim: "Leerzeichen um jede Zeile trimmen" },
  editor: { openAnother: "Andere öffnen", export: "Exportieren", delete: "Löschen", openFile: "Datei öffnen", cues: "{n} Cues" },
  srtToText: { merged: "Layout: zusammengeführte Absätze", perCue: "Layout: eine Zeile pro Cue" },
  auth: { loginTitle: "Willkommen zurück", loginLead: "Melde dich bei deinem Konver-Konto an.", registerTitle: "Konto erstellen", registerLead: "5 kostenlose Durchläufe pro Tag. Keine Karte erforderlich.", email: "E-Mail", password: "Passwort", loginCta: "Anmelden", registerCta: "Konto erstellen", loading: "Bitte warten…", orWithEmail: "oder mit E-Mail", google: "Mit Google fortfahren", checkInbox: "Prüfe dein Postfach zur Bestätigung.", noAccount: "Noch kein Konto?", createOne: "Eines erstellen", hasAccount: "Schon ein Konto?", logIn: "Anmelden" },
};

const it: ChromeStrings = {
  nav: { tools: "Strumenti", pricing: "Prezzi", api: "API", login: "Accedi", start: "Inizia" },
  footer: { tagline: "Strumenti gratuiti per sottotitoli — generare, tradurre, sincronizzare, convertire. Uno strumento per attività, tutto nel browser.", topTools: "Strumenti principali", product: "Prodotto", legal: "Legale", pricing: "Prezzi", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Privacy", terms: "Termini", rights: "Tutti i diritti riservati." },
  card: { open: "Apri", pro: "Pro" },
  account: { billing: "Fatturazione", logout: "Esci" },
  upload: { instant: "Conversione istantanea — nel browser, nessun upload", dropOrClick: "Trascina il file o clicca per caricare", dropHere: "Rilascia il file qui", formats: "Formati accettati", maxFree: "Max {mb} MB nel piano gratuito.", selectFile: "Scegli un file", fileTooLarge: "Questo file è {size}. Limite gratis: {mb} MB — passa a Pro fino a 500 MB." },
  processing: { working: "Elaborazione del file…", uploading: "Caricamento…", processing: "Elaborazione…", takes: "Di solito 30–90 secondi", ad: "Pubblicità" },
  result: { ready: "Il tuo file è pronto", download: "Scarica", tryAnother: "Elabora un altro file", whatNext: "E adesso?", preview: "Anteprima" },
  adblock: { title: "Konver è gratis grazie agli annunci", body1: "Puoi disattivare gli annunci", goPro: "passando a Pro per 9 €/mese", body2: ", o consentendo gli annunci su questo sito.", dismiss: "Chiudi" },
  errors: { serverReturned: "Il server ha restituito {status}. Riprova tra un momento.", noResultUrl: "Il server non ha restituito un URL di risultato.", network: "Errore di rete.", notWiredUp: "Questo strumento non è ancora connesso al backend. Configura la funzione Supabase corrispondente.", noCues: "Nessuna riga trovata.", badFormat: "Formato SRT o VTT non rilevato.", cantParse: "Impossibile leggere il file.", wrongFormat: "Sembra un file {fmt}. Prova il convertitore {other}." },
  sync: { prompt: "Di quanto spostare?", help: "I numeri positivi ritardano i sottotitoli, i negativi li anticipano.", seconds: "Secondi", millis: "Millisecondi", apply: "Applica spostamento", cancel: "Annulla" },
  clean: { title: "Cosa pulire?", summary: "{a} righe in ingresso · {b} dopo la pulizia.", cancel: "Annulla", download: "Scarica il file pulito", stripSdh: "Rimuovere tag SDH come [musica] (sospiro)", removeDup: "Rimuovere righe duplicate consecutive", shouting: "Convertire MAIUSCOLO in maiuscolo di frase", collapseWs: "Ridurre spazi multipli", trim: "Tagliare gli spazi attorno a ogni riga" },
  editor: { openAnother: "Apri un altro", export: "Esporta", delete: "Elimina", openFile: "Apri file", cues: "{n} righe" },
  srtToText: { merged: "Layout: paragrafi uniti", perCue: "Layout: una riga per cue" },
  auth: { loginTitle: "Bentornato", loginLead: "Accedi al tuo account Konver.", registerTitle: "Crea il tuo account", registerLead: "5 utilizzi gratis al giorno. Senza carta.", email: "E-mail", password: "Password", loginCta: "Accedi", registerCta: "Crea account", loading: "Attendere…", orWithEmail: "o con e-mail", google: "Continua con Google", checkInbox: "Controlla la posta per confermare.", noAccount: "Non hai un account?", createOne: "Creane uno", hasAccount: "Hai già un account?", logIn: "Accedi" },
};

const nl: ChromeStrings = {
  nav: { tools: "Tools", pricing: "Prijzen", api: "API", login: "Inloggen", start: "Aan de slag" },
  footer: { tagline: "Gratis ondertitel-tools — genereren, vertalen, synchroniseren, converteren. Eén tool per taak, alles in je browser.", topTools: "Top-tools", product: "Product", legal: "Juridisch", pricing: "Prijzen", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Privacy", terms: "Voorwaarden", rights: "Alle rechten voorbehouden." },
  card: { open: "Openen", pro: "Pro" },
  account: { billing: "Facturering", logout: "Uitloggen" },
  upload: { instant: "Directe conversie — in je browser, geen upload nodig", dropOrClick: "Sleep je bestand of klik om te uploaden", dropHere: "Bestand hier neerzetten", formats: "Geaccepteerde formaten", maxFree: "Max. {mb} MB op het gratis abonnement.", selectFile: "Bestand kiezen", fileTooLarge: "Dit bestand is {size}. Gratis limiet: {mb} MB — upgrade naar Pro tot 500 MB." },
  processing: { working: "Bestand wordt verwerkt…", uploading: "Uploaden…", processing: "Verwerken…", takes: "Duurt meestal 30–90 seconden", ad: "Advertentie" },
  result: { ready: "Je bestand is klaar", download: "Downloaden", tryAnother: "Nog een bestand verwerken", whatNext: "Wat nu?", preview: "Voorbeeld" },
  adblock: { title: "Konver is gratis dankzij advertenties", body1: "Je kunt advertenties uitschakelen door", goPro: "Pro te nemen voor €9/maand", body2: ", of door advertenties op deze site toe te staan.", dismiss: "Sluiten" },
  errors: { serverReturned: "Server gaf {status}. Probeer het zo opnieuw.", noResultUrl: "De server gaf geen resultaat-URL.", network: "Netwerkfout.", notWiredUp: "Deze tool is nog niet gekoppeld aan een backend. Configureer de Supabase-functie.", noCues: "Geen cues gevonden.", badFormat: "SRT- of VTT-formaat niet herkend.", cantParse: "Kan dat bestand niet lezen.", wrongFormat: "Dat lijkt een {fmt}-bestand. Gebruik liever de {other}-converter." },
  sync: { prompt: "Hoeveel verschuiven?", help: "Positieve getallen vertragen ondertitels, negatieve versnellen ze.", seconds: "Seconden", millis: "Milliseconden", apply: "Verschuiving toepassen", cancel: "Annuleren" },
  clean: { title: "Wat moet er opgeschoond?", summary: "{a} cues in · {b} na opschonen.", cancel: "Annuleren", download: "Opgeschoond bestand downloaden", stripSdh: "SDH-tags verwijderen zoals [muziek] (zucht)", removeDup: "Opeenvolgende dubbele regels verwijderen", shouting: "HOOFDLETTERS naar zinshoofdletters", collapseWs: "Meerdere spaties samenvoegen", trim: "Witruimte rond elke regel trimmen" },
  editor: { openAnother: "Andere openen", export: "Exporteren", delete: "Verwijderen", openFile: "Bestand openen", cues: "{n} cues" },
  srtToText: { merged: "Layout: samengevoegde alinea's", perCue: "Layout: één regel per cue" },
  auth: { loginTitle: "Welkom terug", loginLead: "Log in op je Konver-account.", registerTitle: "Maak je account", registerLead: "5 gratis runs per dag. Geen creditcard.", email: "E-mail", password: "Wachtwoord", loginCta: "Inloggen", registerCta: "Account maken", loading: "Een ogenblik…", orWithEmail: "of met e-mail", google: "Doorgaan met Google", checkInbox: "Controleer je inbox om te bevestigen.", noAccount: "Nog geen account?", createOne: "Maak er een", hasAccount: "Heb je al een account?", logIn: "Inloggen" },
};

const ja: ChromeStrings = {
  nav: { tools: "ツール", pricing: "料金", api: "API", login: "ログイン", start: "始める" },
  footer: { tagline: "無料の字幕ツール — 生成、翻訳、同期、変換。1 つの作業に 1 つのツール、すべてブラウザで。", topTools: "主要ツール", product: "プロダクト", legal: "法的事項", pricing: "料金", api: "API", dashboard: "ダッシュボード", vsVeed: "VEED.io との比較", privacy: "プライバシー", terms: "利用規約", rights: "All rights reserved." },
  card: { open: "開く", pro: "Pro" },
  account: { billing: "請求", logout: "ログアウト" },
  upload: { instant: "即時変換 — ブラウザ内で実行、アップロード不要", dropOrClick: "ファイルをドロップまたはクリックしてアップロード", dropHere: "ここにファイルをドロップ", formats: "対応形式", maxFree: "無料プランは最大 {mb} MB。", selectFile: "ファイルを選択", fileTooLarge: "このファイルは {size} です。無料の上限は {mb} MB — Pro なら 500 MB まで。" },
  processing: { working: "処理中…", uploading: "アップロード中…", processing: "処理中…", takes: "通常 30〜90 秒かかります", ad: "広告" },
  result: { ready: "ファイルが完成しました", download: "ダウンロード", tryAnother: "別のファイルを処理", whatNext: "次は？", preview: "プレビュー" },
  adblock: { title: "Konver は広告のおかげで無料です", body1: "広告は次の方法で無効化できます：", goPro: "月 9 ユーロで Pro へ", body2: " もしくは、このサイトで広告を許可してください。", dismiss: "閉じる" },
  errors: { serverReturned: "サーバーが {status} を返しました。少し後でもう一度。", noResultUrl: "サーバーが結果 URL を返しませんでした。", network: "ネットワークエラー。", notWiredUp: "このツールはまだバックエンドに接続されていません。対応する Supabase 関数を設定してください。", noCues: "キューが見つかりませんでした。", badFormat: "SRT または VTT 形式を検出できません。", cantParse: "このファイルを解析できません。", wrongFormat: "これは {fmt} ファイルのようです。{other} コンバーターをお使いください。" },
  sync: { prompt: "どれだけずらしますか？", help: "正の値で字幕を遅らせ、負の値で早めます。", seconds: "秒", millis: "ミリ秒", apply: "オフセットを適用", cancel: "キャンセル" },
  clean: { title: "何をクリーンアップしますか？", summary: "入力 {a} キュー · クリーンアップ後 {b}。", cancel: "キャンセル", download: "クリーンアップ済みをダウンロード", stripSdh: "[音楽] (ため息) のような SDH タグを削除", removeDup: "連続する重複行を削除", shouting: "全大文字を文頭大文字に変換", collapseWs: "連続する空白をまとめる", trim: "各行の前後の空白を削除" },
  editor: { openAnother: "別を開く", export: "エクスポート", delete: "削除", openFile: "ファイルを開く", cues: "{n} キュー" },
  srtToText: { merged: "レイアウト：段落を結合", perCue: "レイアウト：キューごとに 1 行" },
  auth: { loginTitle: "お帰りなさい", loginLead: "Konver アカウントにログイン。", registerTitle: "アカウント作成", registerLead: "1 日 5 回まで無料。クレジットカード不要。", email: "メール", password: "パスワード", loginCta: "ログイン", registerCta: "アカウント作成", loading: "お待ちください…", orWithEmail: "またはメールで", google: "Google で続行", checkInbox: "確認メールを受信箱でご確認ください。", noAccount: "アカウントをお持ちでない方は？", createOne: "作成する", hasAccount: "既にアカウントをお持ちですか？", logIn: "ログイン" },
};

const zh: ChromeStrings = {
  nav: { tools: "工具", pricing: "价格", api: "API", login: "登录", start: "开始使用" },
  footer: { tagline: "免费字幕工具 — 生成、翻译、同步、转换。一项任务一个工具,全部在浏览器中完成。", topTools: "热门工具", product: "产品", legal: "法律", pricing: "价格", api: "API", dashboard: "面板", vsVeed: "对比 VEED.io", privacy: "隐私", terms: "条款", rights: "保留所有权利。" },
  card: { open: "打开", pro: "Pro" },
  account: { billing: "账单", logout: "退出登录" },
  upload: { instant: "即时转换 — 在浏览器中运行,无需上传", dropOrClick: "拖入文件或点击上传", dropHere: "将文件拖到这里", formats: "支持的格式", maxFree: "免费版最大 {mb} MB。", selectFile: "选择文件", fileTooLarge: "此文件 {size}。免费上限 {mb} MB — 升级 Pro 最大 500 MB。" },
  processing: { working: "正在处理…", uploading: "上传中…", processing: "处理中…", takes: "通常需要 30〜90 秒", ad: "广告" },
  result: { ready: "您的文件已准备好", download: "下载", tryAnother: "处理另一个文件", whatNext: "接下来呢?", preview: "预览" },
  adblock: { title: "Konver 因广告而免费", body1: "您可以通过以下方式关闭广告:", goPro: "每月 9 欧元升级 Pro", body2: ",或在本站允许广告。", dismiss: "关闭" },
  errors: { serverReturned: "服务器返回 {status}。请稍后重试。", noResultUrl: "服务器未返回结果 URL。", network: "网络错误。", notWiredUp: "此工具尚未连接到后端。请配置对应的 Supabase 函数。", noCues: "未找到字幕行。", badFormat: "无法识别 SRT 或 VTT 格式。", cantParse: "无法解析该文件。", wrongFormat: "这看起来像 {fmt} 文件。请改用 {other} 转换器。" },
  sync: { prompt: "偏移多少?", help: "正数延迟字幕,负数提前。", seconds: "秒", millis: "毫秒", apply: "应用偏移", cancel: "取消" },
  clean: { title: "需要清理什么?", summary: "输入 {a} 行 · 清理后 {b}。", cancel: "取消", download: "下载已清理文件", stripSdh: "去除 [音乐] (叹气) 等 SDH 标签", removeDup: "去除相邻重复行", shouting: "将全大写转为句首大写", collapseWs: "合并多余空格", trim: "修剪每行首尾空格" },
  editor: { openAnother: "打开另一个", export: "导出", delete: "删除", openFile: "打开文件", cues: "{n} 行" },
  srtToText: { merged: "布局:合并段落", perCue: "布局:每行一句" },
  auth: { loginTitle: "欢迎回来", loginLead: "登录您的 Konver 帐户。", registerTitle: "创建帐户", registerLead: "每日 5 次免费使用。无需信用卡。", email: "邮箱", password: "密码", loginCta: "登录", registerCta: "创建帐户", loading: "请稍候…", orWithEmail: "或使用邮箱", google: "使用 Google 继续", checkInbox: "请查收邮件确认。", noAccount: "还没有帐户?", createOne: "创建一个", hasAccount: "已有帐户?", logIn: "登录" },
};

const ko: ChromeStrings = {
  nav: { tools: "도구", pricing: "요금", api: "API", login: "로그인", start: "시작하기" },
  footer: { tagline: "무료 자막 도구 — 생성, 번역, 동기화, 변환. 작업당 하나의 도구, 모두 브라우저에서.", topTools: "주요 도구", product: "프로덕트", legal: "법적 사항", pricing: "요금", api: "API", dashboard: "대시보드", vsVeed: "VEED.io 비교", privacy: "개인정보", terms: "이용약관", rights: "All rights reserved." },
  card: { open: "열기", pro: "Pro" },
  account: { billing: "결제", logout: "로그아웃" },
  upload: { instant: "즉시 변환 — 브라우저에서 실행, 업로드 불필요", dropOrClick: "파일을 끌어다 놓거나 클릭하여 업로드", dropHere: "여기에 파일을 놓으세요", formats: "지원 형식", maxFree: "무료 플랜은 최대 {mb} MB.", selectFile: "파일 선택", fileTooLarge: "이 파일은 {size} 입니다. 무료 한도 {mb} MB — Pro 는 최대 500 MB." },
  processing: { working: "처리 중…", uploading: "업로드 중…", processing: "처리 중…", takes: "보통 30〜90초 걸립니다", ad: "광고" },
  result: { ready: "파일이 준비되었습니다", download: "다운로드", tryAnother: "다른 파일 처리", whatNext: "다음은?", preview: "미리보기" },
  adblock: { title: "Konver 는 광고 덕분에 무료입니다", body1: "광고는 다음 방법으로 비활성화 가능:", goPro: "월 9유로로 Pro 가입", body2: " 또는 이 사이트의 광고를 허용해 주세요.", dismiss: "닫기" },
  errors: { serverReturned: "서버가 {status} 를 반환했습니다. 잠시 후 다시 시도하세요.", noResultUrl: "서버가 결과 URL 을 반환하지 않았습니다.", network: "네트워크 오류.", notWiredUp: "이 도구는 아직 백엔드에 연결되지 않았습니다. 해당 Supabase 함수를 설정하세요.", noCues: "큐를 찾을 수 없습니다.", badFormat: "SRT 또는 VTT 형식을 감지할 수 없습니다.", cantParse: "파일을 분석할 수 없습니다.", wrongFormat: "{fmt} 파일 같습니다. {other} 변환기를 사용하세요." },
  sync: { prompt: "얼마나 이동할까요?", help: "양수는 자막을 늦추고, 음수는 앞당깁니다.", seconds: "초", millis: "밀리초", apply: "오프셋 적용", cancel: "취소" },
  clean: { title: "무엇을 정리할까요?", summary: "입력 {a}개 큐 · 정리 후 {b}.", cancel: "취소", download: "정리된 파일 다운로드", stripSdh: "[음악] (한숨) 같은 SDH 태그 제거", removeDup: "연속 중복 줄 제거", shouting: "전체 대문자를 문장형 대소문자로", collapseWs: "여러 공백을 하나로", trim: "각 줄의 공백 자르기" },
  editor: { openAnother: "다른 거 열기", export: "내보내기", delete: "삭제", openFile: "파일 열기", cues: "{n}개 큐" },
  srtToText: { merged: "레이아웃: 단락 병합", perCue: "레이아웃: 큐당 한 줄" },
  auth: { loginTitle: "다시 오신 것을 환영합니다", loginLead: "Konver 계정에 로그인.", registerTitle: "계정 만들기", registerLead: "하루 5회 무료. 카드 불필요.", email: "이메일", password: "비밀번호", loginCta: "로그인", registerCta: "계정 만들기", loading: "잠시만요…", orWithEmail: "또는 이메일로", google: "Google 로 계속", checkInbox: "확인 이메일을 확인해 주세요.", noAccount: "계정이 없으신가요?", createOne: "만들기", hasAccount: "이미 계정이 있나요?", logIn: "로그인" },
};

const ar: ChromeStrings = {
  nav: { tools: "الأدوات", pricing: "الأسعار", api: "API", login: "تسجيل الدخول", start: "ابدأ" },
  footer: { tagline: "أدوات مجانية للترجمة — توليد وترجمة ومزامنة وتحويل. أداة واحدة لكل مهمة، الكل في متصفحك.", topTools: "الأدوات الأساسية", product: "المنتج", legal: "قانوني", pricing: "الأسعار", api: "API", dashboard: "لوحة التحكم", vsVeed: "مقارنة بـ VEED.io", privacy: "الخصوصية", terms: "الشروط", rights: "جميع الحقوق محفوظة." },
  card: { open: "افتح", pro: "Pro" },
  account: { billing: "الفوترة", logout: "تسجيل الخروج" },
  upload: { instant: "تحويل فوري — داخل متصفحك، بلا رفع", dropOrClick: "أفلت ملفك أو انقر للرفع", dropHere: "أفلت الملف هنا", formats: "الصيغ المقبولة", maxFree: "أقصى {mb} ميجا في الخطة المجانية.", selectFile: "اختر ملفًا", fileTooLarge: "هذا الملف {size}. الحد المجاني {mb} ميجا — Pro حتى 500 ميجا." },
  processing: { working: "جارٍ المعالجة…", uploading: "جارٍ الرفع…", processing: "جارٍ المعالجة…", takes: "عادةً يستغرق 30 إلى 90 ثانية", ad: "إعلان" },
  result: { ready: "ملفك جاهز", download: "تنزيل", tryAnother: "معالجة ملف آخر", whatNext: "ماذا بعد؟", preview: "معاينة" },
  adblock: { title: "Konver مجاني بفضل الإعلانات", body1: "يمكنك تعطيل الإعلانات عبر:", goPro: "الترقية إلى Pro بـ 9 يورو/شهر", body2: " أو السماح بالإعلانات على هذا الموقع.", dismiss: "إغلاق" },
  errors: { serverReturned: "أعاد الخادم {status}. حاول مجددًا.", noResultUrl: "لم يُعِد الخادم رابط نتيجة.", network: "خطأ في الشبكة.", notWiredUp: "هذه الأداة لم تُربط بعد بالخلفية. فعّل دالة Supabase المطابقة.", noCues: "لا توجد سطور.", badFormat: "تعذّر اكتشاف صيغة SRT أو VTT.", cantParse: "تعذّر قراءة الملف.", wrongFormat: "يبدو ملف {fmt}. استخدم محوّل {other} بدلًا من ذلك." },
  sync: { prompt: "بكم تريد الإزاحة؟", help: "القيم الموجبة تؤخّر الترجمات، والسالبة تقدّمها.", seconds: "ثوانٍ", millis: "ميلي ثانية", apply: "تطبيق الإزاحة", cancel: "إلغاء" },
  clean: { title: "ماذا ننظّف؟", summary: "{a} سطور دخلت · {b} بعد التنظيف.", cancel: "إلغاء", download: "تنزيل الملف النظيف", stripSdh: "إزالة وسوم SDH مثل [موسيقى] (تنهد)", removeDup: "إزالة الأسطر المكرّرة المتتالية", shouting: "تحويل الأحرف الكبيرة إلى صياغة جملة", collapseWs: "دمج المسافات المتعددة", trim: "إزالة المسافات حول كل سطر" },
  editor: { openAnother: "افتح آخر", export: "تصدير", delete: "حذف", openFile: "افتح ملفًا", cues: "{n} سطر" },
  srtToText: { merged: "التخطيط: فقرات مدمجة", perCue: "التخطيط: سطر لكل cue" },
  auth: { loginTitle: "مرحبًا بعودتك", loginLead: "سجّل دخول إلى حساب Konver.", registerTitle: "أنشئ حسابك", registerLead: "5 استخدامات مجانية يوميًا. لا حاجة لبطاقة.", email: "البريد", password: "كلمة المرور", loginCta: "تسجيل الدخول", registerCta: "إنشاء حساب", loading: "يرجى الانتظار…", orWithEmail: "أو بالبريد", google: "متابعة بـ Google", checkInbox: "تفقّد بريدك للتأكيد.", noAccount: "لا تملك حسابًا؟", createOne: "أنشئ واحدًا", hasAccount: "تملك حسابًا بالفعل؟", logIn: "تسجيل الدخول" },
};

const ru: ChromeStrings = {
  nav: { tools: "Инструменты", pricing: "Тарифы", api: "API", login: "Войти", start: "Начать" },
  footer: { tagline: "Бесплатные инструменты для субтитров — генерировать, переводить, синхронизировать, конвертировать. Один инструмент на задачу, всё в браузере.", topTools: "Основные инструменты", product: "Продукт", legal: "Правовое", pricing: "Тарифы", api: "API", dashboard: "Панель", vsVeed: "Сравнение с VEED.io", privacy: "Конфиденциальность", terms: "Условия", rights: "Все права защищены." },
  card: { open: "Открыть", pro: "Pro" },
  account: { billing: "Оплата", logout: "Выйти" },
  upload: { instant: "Мгновенная конвертация — в браузере, без загрузки", dropOrClick: "Перетащите файл или нажмите для загрузки", dropHere: "Бросьте файл сюда", formats: "Допустимые форматы", maxFree: "Макс. {mb} МБ на бесплатном тарифе.", selectFile: "Выбрать файл", fileTooLarge: "Файл размером {size}. Бесплатный лимит {mb} МБ — Pro до 500 МБ." },
  processing: { working: "Обрабатываем ваш файл…", uploading: "Загружаем…", processing: "Обрабатываем…", takes: "Обычно занимает 30–90 секунд", ad: "Реклама" },
  result: { ready: "Ваш файл готов", download: "Скачать", tryAnother: "Обработать ещё файл", whatNext: "Что дальше?", preview: "Превью" },
  adblock: { title: "Konver бесплатен благодаря рекламе", body1: "Рекламу можно отключить,", goPro: "перейдя на Pro за 9 €/мес", body2: ", или разрешив рекламу на этом сайте.", dismiss: "Закрыть" },
  errors: { serverReturned: "Сервер вернул {status}. Попробуйте через мгновение.", noResultUrl: "Сервер не вернул URL результата.", network: "Сетевая ошибка.", notWiredUp: "Этот инструмент пока не подключён к бэкенду. Настройте соответствующую функцию Supabase.", noCues: "Сабтайтлы не найдены.", badFormat: "Не удалось определить формат SRT или VTT.", cantParse: "Не удалось прочитать файл.", wrongFormat: "Похоже на файл {fmt}. Используйте конвертер {other}." },
  sync: { prompt: "На сколько сдвинуть?", help: "Положительные значения задерживают субтитры, отрицательные опережают.", seconds: "Секунды", millis: "Миллисекунды", apply: "Применить сдвиг", cancel: "Отмена" },
  clean: { title: "Что почистить?", summary: "Вход: {a} реплик · после очистки: {b}.", cancel: "Отмена", download: "Скачать очищенный файл", stripSdh: "Убрать SDH-теги вроде [музыка] (вздох)", removeDup: "Убрать подряд идущие дубликаты", shouting: "ПРОПИСНЫЕ → регистр предложения", collapseWs: "Сжать множественные пробелы", trim: "Обрезать пробелы вокруг строк" },
  editor: { openAnother: "Открыть другой", export: "Экспорт", delete: "Удалить", openFile: "Открыть файл", cues: "{n} реплик" },
  srtToText: { merged: "Раскладка: объединённые абзацы", perCue: "Раскладка: одна строка на реплику" },
  auth: { loginTitle: "С возвращением", loginLead: "Войдите в аккаунт Konver.", registerTitle: "Создать аккаунт", registerLead: "5 бесплатных запусков в день. Карта не нужна.", email: "Email", password: "Пароль", loginCta: "Войти", registerCta: "Создать аккаунт", loading: "Подождите…", orWithEmail: "или по email", google: "Продолжить с Google", checkInbox: "Проверьте почту для подтверждения.", noAccount: "Нет аккаунта?", createOne: "Создайте", hasAccount: "Уже есть аккаунт?", logIn: "Войти" },
};

const hi: ChromeStrings = {
  nav: { tools: "टूल", pricing: "मूल्य", api: "API", login: "लॉग इन", start: "शुरू करें" },
  footer: { tagline: "मुफ़्त सबटाइटल टूल — बनाएँ, अनुवाद करें, सिंक करें, बदलें। हर काम के लिए एक टूल, सब ब्राउज़र में।", topTools: "मुख्य टूल", product: "उत्पाद", legal: "क़ानूनी", pricing: "मूल्य", api: "API", dashboard: "डैशबोर्ड", vsVeed: "VEED.io से तुलना", privacy: "गोपनीयता", terms: "शर्तें", rights: "सर्वाधिकार सुरक्षित।" },
  card: { open: "खोलें", pro: "Pro" },
  account: { billing: "बिलिंग", logout: "लॉग आउट" },
  upload: { instant: "तुरंत रूपांतरण — आपके ब्राउज़र में, अपलोड की ज़रूरत नहीं", dropOrClick: "फ़ाइल छोड़ें या अपलोड करने के लिए क्लिक करें", dropHere: "फ़ाइल यहाँ छोड़ें", formats: "स्वीकृत प्रारूप", maxFree: "मुफ़्त प्लान में अधिकतम {mb} MB।", selectFile: "फ़ाइल चुनें", fileTooLarge: "यह फ़ाइल {size} है. मुफ़्त सीमा {mb} MB — Pro में 500 MB तक।" },
  processing: { working: "आपकी फ़ाइल पर काम हो रहा है…", uploading: "अपलोड हो रहा है…", processing: "प्रोसेस हो रहा है…", takes: "आमतौर पर 30–90 सेकंड लगते हैं", ad: "विज्ञापन" },
  result: { ready: "आपकी फ़ाइल तैयार है", download: "डाउनलोड", tryAnother: "एक और फ़ाइल प्रोसेस करें", whatNext: "आगे क्या?", preview: "पूर्वावलोकन" },
  adblock: { title: "Konver विज्ञापनों के कारण मुफ़्त है", body1: "आप विज्ञापन इस तरह बंद कर सकते हैं:", goPro: "€9/माह में Pro लें", body2: ", या इस साइट पर विज्ञापनों की अनुमति दें।", dismiss: "बंद करें" },
  errors: { serverReturned: "सर्वर ने {status} लौटाया. कुछ देर में पुनः प्रयास करें।", noResultUrl: "सर्वर ने रिज़ल्ट URL नहीं लौटाया।", network: "नेटवर्क त्रुटि।", notWiredUp: "यह टूल अभी बैकेंड से जुड़ा नहीं है. संबंधित Supabase फ़ंक्शन कॉन्फ़िगर करें।", noCues: "कोई क्यू नहीं मिला।", badFormat: "SRT या VTT प्रारूप का पता नहीं चला।", cantParse: "फ़ाइल पढ़ी नहीं जा सकी।", wrongFormat: "यह {fmt} फ़ाइल लगती है. इसके बजाय {other} कनवर्टर आज़माएँ।" },
  sync: { prompt: "कितना शिफ्ट करें?", help: "धनात्मक मान सबटाइटल को विलंबित करते हैं, ऋणात्मक उन्हें आगे लाते हैं।", seconds: "सेकंड", millis: "मिलीसेकंड", apply: "ऑफसेट लागू करें", cancel: "रद्द करें" },
  clean: { title: "क्या साफ़ करना है?", summary: "{a} क्यू इनपुट · सफ़ाई के बाद {b}।", cancel: "रद्द करें", download: "साफ़ की गई फ़ाइल डाउनलोड करें", stripSdh: "[संगीत] (आह) जैसे SDH टैग हटाएँ", removeDup: "लगातार डुप्लिकेट लाइनें हटाएँ", shouting: "ALL-CAPS को वाक्य केस में बदलें", collapseWs: "कई स्पेस को संक्षिप्त करें", trim: "हर लाइन के आसपास स्पेस ट्रिम करें" },
  editor: { openAnother: "दूसरा खोलें", export: "एक्सपोर्ट", delete: "हटाएँ", openFile: "फ़ाइल खोलें", cues: "{n} क्यू" },
  srtToText: { merged: "लेआउट: मर्ज किए गए पैराग्राफ़", perCue: "लेआउट: हर क्यू के लिए एक लाइन" },
  auth: { loginTitle: "वापसी पर स्वागत है", loginLead: "अपने Konver खाते में लॉग इन करें।", registerTitle: "अपना खाता बनाएँ", registerLead: "रोज़ 5 मुफ़्त रन। क्रेडिट कार्ड ज़रूरी नहीं।", email: "ईमेल", password: "पासवर्ड", loginCta: "लॉग इन", registerCta: "खाता बनाएँ", loading: "कृपया प्रतीक्षा करें…", orWithEmail: "या ईमेल से", google: "Google से जारी रखें", checkInbox: "पुष्टि के लिए अपना इनबॉक्स देखें।", noAccount: "खाता नहीं है?", createOne: "एक बनाएँ", hasAccount: "पहले से खाता है?", logIn: "लॉग इन" },
};

// Partial<>: missing locales fall back to English via getChrome().
export const CHROME_STRINGS: Partial<Record<Locale, ChromeStrings>> = {
  en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi,
};

export function getChrome(locale: Locale): ChromeStrings {
  return CHROME_STRINGS[locale] ?? en;
}

/** Simple {placeholder} interpolation. */
export function t(template: string, params: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
}
