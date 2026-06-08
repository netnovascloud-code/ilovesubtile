import type { Locale } from "@/lib/i18n/locales";

export type ChromeStrings = {
  nav: { tools: string; pricing: string; api: string; login: string; start: string };
  footer: {
    tagline: string;
    gdprBadge: string;
    topTools: string;
    /** Heading for the category-hub links column. Optional — falls back to
     *  "Categories" (the hubs are English-only routes). */
    categories?: string;
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
  footer: { tagline: "Free online conversion tools — files, images, code, text and more. One simple tool per job.", gdprBadge: "GDPR Compliant · Files never stored", topTools: "Top tools", categories: "Categories", product: "Product", legal: "Legal", pricing: "Pricing", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Privacy", terms: "Terms", rights: "All rights reserved." },
  card: { open: "Open", pro: "Pro" },
  account: { billing: "Billing", logout: "Log out" },
  upload: { instant: "Instant conversion — runs in your browser, no upload needed", dropOrClick: "Drop your file or click to upload", dropHere: "Drop the file here", formats: "Accepted formats", maxFree: "Max {mb} MB on the free plan.", selectFile: "Select a file", fileTooLarge: "This file is {size}. Free limit is {mb} MB — upgrade to Pro for up to 500 MB." },
  processing: { working: "Working on your file…", uploading: "Uploading your file…", processing: "Processing your file…", takes: "This usually takes 30–90 seconds", ad: "Advertisement" },
  result: { ready: "Your file is ready", download: "Download", tryAnother: "Process another file", whatNext: "What's next?", preview: "Preview" },
  adblock: { title: "Konvertools is free thanks to ads", body1: "You can disable ads by", goPro: "going Pro at €12/month", body2: ", or by allowing ads on this site.", dismiss: "Dismiss" },
  errors: { serverReturned: "Server returned {status}. Try again in a moment.", noResultUrl: "The server didn't return a result URL.", network: "Network error.", notWiredUp: "This tool isn't wired up to a backend yet. Configure the matching Supabase Edge Function to enable it.", noCues: "No cues found.", badFormat: "Couldn't detect SRT or VTT format.", cantParse: "Couldn't parse that file.", wrongFormat: "That looks like a {fmt} file. Try the {other} converter instead." },
  sync: { prompt: "How much should we shift?", help: "Positive numbers delay subtitles (push them later). Negative advances them.", seconds: "Seconds", millis: "Milliseconds", apply: "Apply offset", cancel: "Cancel" },
  clean: { title: "What should we clean?", summary: "{a} cues in · {b} after cleanup.", cancel: "Cancel", download: "Download cleaned file", stripSdh: "Strip SDH tags like [music] (sigh)", removeDup: "Remove consecutive duplicate lines", shouting: "Convert ALL-CAPS to sentence case", collapseWs: "Collapse multiple spaces", trim: "Trim whitespace around each line" },
  editor: { openAnother: "Open another", export: "Export", delete: "Delete", openFile: "Open file", cues: "{n} cues" },
  srtToText: { merged: "Layout: merged paragraphs", perCue: "Layout: one line per cue" },
  auth: { loginTitle: "Welcome back", loginLead: "Log in to your Konvertools account.", registerTitle: "Create your account", registerLead: "5 free runs per day. No credit card required.", email: "Email", password: "Password", loginCta: "Log in", registerCta: "Create account", loading: "Please wait…", orWithEmail: "or with email", google: "Continue with Google", checkInbox: "Check your inbox to confirm your email.", noAccount: "Don't have an account?", createOne: "Create one", hasAccount: "Already have an account?", logIn: "Log in" },
};

const fr: ChromeStrings = {
  nav: { tools: "Outils", pricing: "Tarifs", api: "API", login: "Connexion", start: "Commencer" },
  footer: { tagline: "Outils de conversion en ligne gratuits — fichiers, images, code, texte et plus. Un outil simple par tâche.", gdprBadge: "Conforme RGPD · Fichiers jamais stockés", topTools: "Outils phares", product: "Produit", legal: "Mentions légales", pricing: "Tarifs", api: "API", dashboard: "Tableau de bord", vsVeed: "vs VEED.io", privacy: "Confidentialité", terms: "CGU", rights: "Tous droits réservés." },
  card: { open: "Ouvrir", pro: "Pro" },
  account: { billing: "Facturation", logout: "Déconnexion" },
  upload: { instant: "Conversion instantanée — dans votre navigateur, aucun envoi requis", dropOrClick: "Déposez votre fichier ou cliquez pour téléverser", dropHere: "Déposez le fichier ici", formats: "Formats acceptés", maxFree: "Max {mb} Mo sur l'offre gratuite.", selectFile: "Choisir un fichier", fileTooLarge: "Ce fichier fait {size}. Limite gratuite : {mb} Mo — passez Pro pour jusqu'à 500 Mo." },
  processing: { working: "Traitement de votre fichier…", uploading: "Téléversement…", processing: "Traitement en cours…", takes: "Cela prend généralement 30 à 90 secondes", ad: "Publicité" },
  result: { ready: "Votre fichier est prêt", download: "Télécharger", tryAnother: "Traiter un autre fichier", whatNext: "Et ensuite ?", preview: "Aperçu" },
  adblock: { title: "Konvertools est gratuit grâce aux publicités", body1: "Vous pouvez désactiver les pubs en", goPro: "passant Pro pour 12 €/mois", body2: ", ou en autorisant les pubs sur ce site.", dismiss: "Fermer" },
  errors: { serverReturned: "Le serveur a renvoyé {status}. Réessayez dans un instant.", noResultUrl: "Le serveur n'a pas renvoyé d'URL de résultat.", network: "Erreur réseau.", notWiredUp: "Cet outil n'est pas encore branché à un backend. Configurez la fonction Supabase correspondante.", noCues: "Aucune ligne trouvée.", badFormat: "Format SRT ou VTT non détecté.", cantParse: "Impossible de lire ce fichier.", wrongFormat: "Ceci ressemble à un fichier {fmt}. Essayez plutôt le convertisseur {other}." },
  sync: { prompt: "De combien décaler ?", help: "Les nombres positifs retardent les sous-titres. Les négatifs les avancent.", seconds: "Secondes", millis: "Millisecondes", apply: "Appliquer le décalage", cancel: "Annuler" },
  clean: { title: "Que faut-il nettoyer ?", summary: "{a} lignes en entrée · {b} après nettoyage.", cancel: "Annuler", download: "Télécharger le fichier nettoyé", stripSdh: "Supprimer les balises SDH comme [musique] (soupir)", removeDup: "Supprimer les lignes en doublon consécutives", shouting: "Convertir les MAJUSCULES en casse de phrase", collapseWs: "Réduire les espaces multiples", trim: "Couper les espaces autour de chaque ligne" },
  editor: { openAnother: "Ouvrir un autre", export: "Exporter", delete: "Supprimer", openFile: "Ouvrir un fichier", cues: "{n} lignes" },
  srtToText: { merged: "Mise en page : paragraphes fusionnés", perCue: "Mise en page : une ligne par cue" },
  auth: { loginTitle: "Bon retour", loginLead: "Connectez-vous à votre compte Konvertools.", registerTitle: "Créez votre compte", registerLead: "5 utilisations gratuites par jour. Sans carte bancaire.", email: "E-mail", password: "Mot de passe", loginCta: "Se connecter", registerCta: "Créer le compte", loading: "Veuillez patienter…", orWithEmail: "ou avec un e-mail", google: "Continuer avec Google", checkInbox: "Consultez votre boîte mail pour confirmer votre e-mail.", noAccount: "Pas encore de compte ?", createOne: "Créez-en un", hasAccount: "Déjà un compte ?", logIn: "Se connecter" },
};

const es: ChromeStrings = {
  nav: { tools: "Herramientas", pricing: "Precios", api: "API", login: "Iniciar sesión", start: "Empezar" },
  footer: { tagline: "Herramientas de conversión online gratis — archivos, imágenes, código, texto y más. Una herramienta simple por tarea.", gdprBadge: "Conforme con el RGPD · Archivos nunca almacenados", topTools: "Herramientas destacadas", product: "Producto", legal: "Legal", pricing: "Precios", api: "API", dashboard: "Panel", vsVeed: "vs VEED.io", privacy: "Privacidad", terms: "Términos", rights: "Todos los derechos reservados." },
  card: { open: "Abrir", pro: "Pro" },
  account: { billing: "Facturación", logout: "Cerrar sesión" },
  upload: { instant: "Conversión instantánea — en tu navegador, sin subir nada", dropOrClick: "Suelta tu archivo o haz clic para subirlo", dropHere: "Suelta el archivo aquí", formats: "Formatos aceptados", maxFree: "Máx. {mb} MB en el plan gratis.", selectFile: "Elegir un archivo", fileTooLarge: "Este archivo pesa {size}. El límite gratis es {mb} MB — pasa a Pro hasta 500 MB." },
  processing: { working: "Procesando tu archivo…", uploading: "Subiendo…", processing: "Procesando…", takes: "Suele tardar entre 30 y 90 segundos", ad: "Publicidad" },
  result: { ready: "Tu archivo está listo", download: "Descargar", tryAnother: "Procesar otro archivo", whatNext: "¿Y ahora?", preview: "Vista previa" },
  adblock: { title: "Konvertools es gratis gracias a los anuncios", body1: "Puedes desactivar los anuncios", goPro: "pasando a Pro por 12 €/mes", body2: ", o permitiendo los anuncios en este sitio.", dismiss: "Cerrar" },
  errors: { serverReturned: "El servidor devolvió {status}. Inténtalo de nuevo.", noResultUrl: "El servidor no devolvió una URL de resultado.", network: "Error de red.", notWiredUp: "Esta herramienta aún no está conectada al backend. Configura la función Supabase correspondiente.", noCues: "No se encontraron líneas.", badFormat: "No se detectó el formato SRT o VTT.", cantParse: "No se pudo leer el archivo.", wrongFormat: "Parece un archivo {fmt}. Prueba el conversor {other}." },
  sync: { prompt: "¿Cuánto desplazar?", help: "Los números positivos retrasan los subtítulos. Los negativos los adelantan.", seconds: "Segundos", millis: "Milisegundos", apply: "Aplicar desplazamiento", cancel: "Cancelar" },
  clean: { title: "¿Qué hay que limpiar?", summary: "{a} líneas de entrada · {b} tras la limpieza.", cancel: "Cancelar", download: "Descargar archivo limpio", stripSdh: "Quitar etiquetas SDH como [música] (suspiro)", removeDup: "Eliminar líneas duplicadas consecutivas", shouting: "Convertir MAYÚSCULAS a mayúsculas de oración", collapseWs: "Colapsar espacios múltiples", trim: "Recortar espacios alrededor de cada línea" },
  editor: { openAnother: "Abrir otro", export: "Exportar", delete: "Eliminar", openFile: "Abrir archivo", cues: "{n} líneas" },
  srtToText: { merged: "Diseño: párrafos fusionados", perCue: "Diseño: una línea por cue" },
  auth: { loginTitle: "Bienvenido de nuevo", loginLead: "Inicia sesión en tu cuenta Konvertools.", registerTitle: "Crea tu cuenta", registerLead: "5 usos gratuitos al día. Sin tarjeta.", email: "Correo", password: "Contraseña", loginCta: "Iniciar sesión", registerCta: "Crear cuenta", loading: "Un momento…", orWithEmail: "o con correo", google: "Continuar con Google", checkInbox: "Revisa tu correo para confirmar.", noAccount: "¿No tienes cuenta?", createOne: "Crea una", hasAccount: "¿Ya tienes cuenta?", logIn: "Inicia sesión" },
};

const pt: ChromeStrings = {
  nav: { tools: "Ferramentas", pricing: "Preços", api: "API", login: "Entrar", start: "Começar" },
  footer: { tagline: "Ferramentas de conversão online grátis — arquivos, imagens, código, texto e mais. Uma ferramenta simples por tarefa.", gdprBadge: "Em conformidade com o RGPD · Arquivos nunca armazenados", topTools: "Ferramentas em destaque", product: "Produto", legal: "Legal", pricing: "Preços", api: "API", dashboard: "Painel", vsVeed: "vs VEED.io", privacy: "Privacidade", terms: "Termos", rights: "Todos os direitos reservados." },
  card: { open: "Abrir", pro: "Pro" },
  account: { billing: "Faturamento", logout: "Sair" },
  upload: { instant: "Conversão instantânea — no seu navegador, sem upload", dropOrClick: "Solte seu arquivo ou clique para enviar", dropHere: "Solte o arquivo aqui", formats: "Formatos aceitos", maxFree: "Máx. {mb} MB no plano grátis.", selectFile: "Escolher arquivo", fileTooLarge: "Este arquivo tem {size}. Limite grátis: {mb} MB — vá Pro até 500 MB." },
  processing: { working: "Processando seu arquivo…", uploading: "Enviando…", processing: "Processando…", takes: "Geralmente leva 30 a 90 segundos", ad: "Publicidade" },
  result: { ready: "Seu arquivo está pronto", download: "Baixar", tryAnother: "Processar outro arquivo", whatNext: "E agora?", preview: "Pré-visualização" },
  adblock: { title: "Konvertools é grátis graças aos anúncios", body1: "Você pode desativar os anúncios", goPro: "indo Pro por €12/mês", body2: ", ou permitindo anúncios neste site.", dismiss: "Fechar" },
  errors: { serverReturned: "O servidor retornou {status}. Tente novamente.", noResultUrl: "O servidor não retornou URL de resultado.", network: "Erro de rede.", notWiredUp: "Esta ferramenta ainda não está conectada ao backend. Configure a função Supabase correspondente.", noCues: "Nenhuma linha encontrada.", badFormat: "Formato SRT ou VTT não detectado.", cantParse: "Não foi possível ler o arquivo.", wrongFormat: "Parece um arquivo {fmt}. Tente o conversor {other}." },
  sync: { prompt: "Quanto deslocar?", help: "Números positivos atrasam as legendas. Negativos adiantam.", seconds: "Segundos", millis: "Milissegundos", apply: "Aplicar deslocamento", cancel: "Cancelar" },
  clean: { title: "O que limpar?", summary: "{a} linhas de entrada · {b} após a limpeza.", cancel: "Cancelar", download: "Baixar arquivo limpo", stripSdh: "Remover tags SDH como [música] (suspiro)", removeDup: "Remover linhas duplicadas consecutivas", shouting: "Converter MAIÚSCULAS para caixa de frase", collapseWs: "Colapsar espaços múltiplos", trim: "Aparar espaços ao redor de cada linha" },
  editor: { openAnother: "Abrir outro", export: "Exportar", delete: "Excluir", openFile: "Abrir arquivo", cues: "{n} linhas" },
  srtToText: { merged: "Layout: parágrafos mesclados", perCue: "Layout: uma linha por cue" },
  auth: { loginTitle: "Bem-vindo de volta", loginLead: "Entre na sua conta Konvertools.", registerTitle: "Crie sua conta", registerLead: "5 usos grátis por dia. Sem cartão.", email: "E-mail", password: "Senha", loginCta: "Entrar", registerCta: "Criar conta", loading: "Aguarde…", orWithEmail: "ou com e-mail", google: "Continuar com Google", checkInbox: "Confira seu e-mail para confirmar.", noAccount: "Ainda não tem conta?", createOne: "Crie uma", hasAccount: "Já tem conta?", logIn: "Entrar" },
};

const de: ChromeStrings = {
  nav: { tools: "Tools", pricing: "Preise", api: "API", login: "Anmelden", start: "Loslegen" },
  footer: { tagline: "Kostenlose Online-Konvertierungstools — Dateien, Bilder, Code, Text und mehr. Ein einfaches Tool pro Aufgabe.", gdprBadge: "DSGVO-konform · Dateien werden nie gespeichert", topTools: "Top-Tools", product: "Produkt", legal: "Rechtliches", pricing: "Preise", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Datenschutz", terms: "AGB", rights: "Alle Rechte vorbehalten." },
  card: { open: "Öffnen", pro: "Pro" },
  account: { billing: "Abrechnung", logout: "Abmelden" },
  upload: { instant: "Sofortige Konvertierung — im Browser, kein Upload nötig", dropOrClick: "Datei hier ablegen oder klicken zum Hochladen", dropHere: "Datei hier ablegen", formats: "Akzeptierte Formate", maxFree: "Max. {mb} MB im Gratis-Plan.", selectFile: "Datei wählen", fileTooLarge: "Diese Datei ist {size}. Gratis-Limit: {mb} MB — Pro bis 500 MB." },
  processing: { working: "Datei wird verarbeitet…", uploading: "Wird hochgeladen…", processing: "Wird verarbeitet…", takes: "Dauert meist 30–90 Sekunden", ad: "Werbung" },
  result: { ready: "Deine Datei ist fertig", download: "Herunterladen", tryAnother: "Weitere Datei verarbeiten", whatNext: "Was als Nächstes?", preview: "Vorschau" },
  adblock: { title: "Konvertools ist dank Werbung kostenlos", body1: "Du kannst die Werbung deaktivieren, indem du", goPro: "Pro für 12 €/Monat holst", body2: " oder Werbung auf dieser Seite zulässt.", dismiss: "Schließen" },
  errors: { serverReturned: "Server antwortete mit {status}. Versuch es gleich nochmal.", noResultUrl: "Der Server lieferte keine Ergebnis-URL.", network: "Netzwerkfehler.", notWiredUp: "Dieses Tool ist noch nicht ans Backend angeschlossen. Richte die zugehörige Supabase-Funktion ein.", noCues: "Keine Cues gefunden.", badFormat: "SRT- oder VTT-Format nicht erkannt.", cantParse: "Datei konnte nicht gelesen werden.", wrongFormat: "Sieht aus wie eine {fmt}-Datei. Nutze stattdessen den {other}-Konverter." },
  sync: { prompt: "Wie viel verschieben?", help: "Positive Werte verzögern Untertitel, negative beschleunigen sie.", seconds: "Sekunden", millis: "Millisekunden", apply: "Verschiebung anwenden", cancel: "Abbrechen" },
  clean: { title: "Was soll bereinigt werden?", summary: "{a} Cues rein · {b} nach Bereinigung.", cancel: "Abbrechen", download: "Bereinigte Datei herunterladen", stripSdh: "SDH-Tags wie [Musik] (seufzt) entfernen", removeDup: "Aufeinanderfolgende doppelte Zeilen entfernen", shouting: "GROSSBUCHSTABEN in Satzform umwandeln", collapseWs: "Mehrfach-Leerzeichen reduzieren", trim: "Leerzeichen um jede Zeile trimmen" },
  editor: { openAnother: "Andere öffnen", export: "Exportieren", delete: "Löschen", openFile: "Datei öffnen", cues: "{n} Cues" },
  srtToText: { merged: "Layout: zusammengeführte Absätze", perCue: "Layout: eine Zeile pro Cue" },
  auth: { loginTitle: "Willkommen zurück", loginLead: "Melde dich bei deinem Konvertools-Konto an.", registerTitle: "Konto erstellen", registerLead: "5 kostenlose Durchläufe pro Tag. Keine Karte erforderlich.", email: "E-Mail", password: "Passwort", loginCta: "Anmelden", registerCta: "Konto erstellen", loading: "Bitte warten…", orWithEmail: "oder mit E-Mail", google: "Mit Google fortfahren", checkInbox: "Prüfe dein Postfach zur Bestätigung.", noAccount: "Noch kein Konto?", createOne: "Eines erstellen", hasAccount: "Schon ein Konto?", logIn: "Anmelden" },
};

const it: ChromeStrings = {
  nav: { tools: "Strumenti", pricing: "Prezzi", api: "API", login: "Accedi", start: "Inizia" },
  footer: { tagline: "Strumenti di conversione online gratuiti — file, immagini, codice, testo e altro. Uno strumento semplice per attività.", gdprBadge: "Conforme al GDPR · File mai memorizzati", topTools: "Strumenti principali", product: "Prodotto", legal: "Legale", pricing: "Prezzi", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Privacy", terms: "Termini", rights: "Tutti i diritti riservati." },
  card: { open: "Apri", pro: "Pro" },
  account: { billing: "Fatturazione", logout: "Esci" },
  upload: { instant: "Conversione istantanea — nel browser, nessun upload", dropOrClick: "Trascina il file o clicca per caricare", dropHere: "Rilascia il file qui", formats: "Formati accettati", maxFree: "Max {mb} MB nel piano gratuito.", selectFile: "Scegli un file", fileTooLarge: "Questo file è {size}. Limite gratis: {mb} MB — passa a Pro fino a 500 MB." },
  processing: { working: "Elaborazione del file…", uploading: "Caricamento…", processing: "Elaborazione…", takes: "Di solito 30–90 secondi", ad: "Pubblicità" },
  result: { ready: "Il tuo file è pronto", download: "Scarica", tryAnother: "Elabora un altro file", whatNext: "E adesso?", preview: "Anteprima" },
  adblock: { title: "Konvertools è gratis grazie agli annunci", body1: "Puoi disattivare gli annunci", goPro: "passando a Pro per 12 €/mese", body2: ", o consentendo gli annunci su questo sito.", dismiss: "Chiudi" },
  errors: { serverReturned: "Il server ha restituito {status}. Riprova tra un momento.", noResultUrl: "Il server non ha restituito un URL di risultato.", network: "Errore di rete.", notWiredUp: "Questo strumento non è ancora connesso al backend. Configura la funzione Supabase corrispondente.", noCues: "Nessuna riga trovata.", badFormat: "Formato SRT o VTT non rilevato.", cantParse: "Impossibile leggere il file.", wrongFormat: "Sembra un file {fmt}. Prova il convertitore {other}." },
  sync: { prompt: "Di quanto spostare?", help: "I numeri positivi ritardano i sottotitoli, i negativi li anticipano.", seconds: "Secondi", millis: "Millisecondi", apply: "Applica spostamento", cancel: "Annulla" },
  clean: { title: "Cosa pulire?", summary: "{a} righe in ingresso · {b} dopo la pulizia.", cancel: "Annulla", download: "Scarica il file pulito", stripSdh: "Rimuovere tag SDH come [musica] (sospiro)", removeDup: "Rimuovere righe duplicate consecutive", shouting: "Convertire MAIUSCOLO in maiuscolo di frase", collapseWs: "Ridurre spazi multipli", trim: "Tagliare gli spazi attorno a ogni riga" },
  editor: { openAnother: "Apri un altro", export: "Esporta", delete: "Elimina", openFile: "Apri file", cues: "{n} righe" },
  srtToText: { merged: "Layout: paragrafi uniti", perCue: "Layout: una riga per cue" },
  auth: { loginTitle: "Bentornato", loginLead: "Accedi al tuo account Konvertools.", registerTitle: "Crea il tuo account", registerLead: "5 utilizzi gratis al giorno. Senza carta.", email: "E-mail", password: "Password", loginCta: "Accedi", registerCta: "Crea account", loading: "Attendere…", orWithEmail: "o con e-mail", google: "Continua con Google", checkInbox: "Controlla la posta per confermare.", noAccount: "Non hai un account?", createOne: "Creane uno", hasAccount: "Hai già un account?", logIn: "Accedi" },
};

const nl: ChromeStrings = {
  nav: { tools: "Tools", pricing: "Prijzen", api: "API", login: "Inloggen", start: "Aan de slag" },
  footer: { tagline: "Gratis online conversietools — bestanden, afbeeldingen, code, tekst en meer. Eén eenvoudige tool per taak.", gdprBadge: "AVG-conform · Bestanden nooit opgeslagen", topTools: "Top-tools", product: "Product", legal: "Juridisch", pricing: "Prijzen", api: "API", dashboard: "Dashboard", vsVeed: "vs VEED.io", privacy: "Privacy", terms: "Voorwaarden", rights: "Alle rechten voorbehouden." },
  card: { open: "Openen", pro: "Pro" },
  account: { billing: "Facturering", logout: "Uitloggen" },
  upload: { instant: "Directe conversie — in je browser, geen upload nodig", dropOrClick: "Sleep je bestand of klik om te uploaden", dropHere: "Bestand hier neerzetten", formats: "Geaccepteerde formaten", maxFree: "Max. {mb} MB op het gratis abonnement.", selectFile: "Bestand kiezen", fileTooLarge: "Dit bestand is {size}. Gratis limiet: {mb} MB — upgrade naar Pro tot 500 MB." },
  processing: { working: "Bestand wordt verwerkt…", uploading: "Uploaden…", processing: "Verwerken…", takes: "Duurt meestal 30–90 seconden", ad: "Advertentie" },
  result: { ready: "Je bestand is klaar", download: "Downloaden", tryAnother: "Nog een bestand verwerken", whatNext: "Wat nu?", preview: "Voorbeeld" },
  adblock: { title: "Konvertools is gratis dankzij advertenties", body1: "Je kunt advertenties uitschakelen door", goPro: "Pro te nemen voor €12/maand", body2: ", of door advertenties op deze site toe te staan.", dismiss: "Sluiten" },
  errors: { serverReturned: "Server gaf {status}. Probeer het zo opnieuw.", noResultUrl: "De server gaf geen resultaat-URL.", network: "Netwerkfout.", notWiredUp: "Deze tool is nog niet gekoppeld aan een backend. Configureer de Supabase-functie.", noCues: "Geen cues gevonden.", badFormat: "SRT- of VTT-formaat niet herkend.", cantParse: "Kan dat bestand niet lezen.", wrongFormat: "Dat lijkt een {fmt}-bestand. Gebruik liever de {other}-converter." },
  sync: { prompt: "Hoeveel verschuiven?", help: "Positieve getallen vertragen ondertitels, negatieve versnellen ze.", seconds: "Seconden", millis: "Milliseconden", apply: "Verschuiving toepassen", cancel: "Annuleren" },
  clean: { title: "Wat moet er opgeschoond?", summary: "{a} cues in · {b} na opschonen.", cancel: "Annuleren", download: "Opgeschoond bestand downloaden", stripSdh: "SDH-tags verwijderen zoals [muziek] (zucht)", removeDup: "Opeenvolgende dubbele regels verwijderen", shouting: "HOOFDLETTERS naar zinshoofdletters", collapseWs: "Meerdere spaties samenvoegen", trim: "Witruimte rond elke regel trimmen" },
  editor: { openAnother: "Andere openen", export: "Exporteren", delete: "Verwijderen", openFile: "Bestand openen", cues: "{n} cues" },
  srtToText: { merged: "Layout: samengevoegde alinea's", perCue: "Layout: één regel per cue" },
  auth: { loginTitle: "Welkom terug", loginLead: "Log in op je Konvertools-account.", registerTitle: "Maak je account", registerLead: "5 gratis runs per dag. Geen creditcard.", email: "E-mail", password: "Wachtwoord", loginCta: "Inloggen", registerCta: "Account maken", loading: "Een ogenblik…", orWithEmail: "of met e-mail", google: "Doorgaan met Google", checkInbox: "Controleer je inbox om te bevestigen.", noAccount: "Nog geen account?", createOne: "Maak er een", hasAccount: "Heb je al een account?", logIn: "Inloggen" },
};

const ja: ChromeStrings = {
  nav: { tools: "ツール", pricing: "料金", api: "API", login: "ログイン", start: "始める" },
  footer: { tagline: "無料のオンライン変換ツール — ファイル、画像、コード、テキストなど。作業ごとにシンプルなツール 1 つ。", gdprBadge: "GDPR 準拠 · ファイルは保存されません", topTools: "主要ツール", product: "プロダクト", legal: "法的事項", pricing: "料金", api: "API", dashboard: "ダッシュボード", vsVeed: "VEED.io との比較", privacy: "プライバシー", terms: "利用規約", rights: "All rights reserved." },
  card: { open: "開く", pro: "Pro" },
  account: { billing: "請求", logout: "ログアウト" },
  upload: { instant: "即時変換 — ブラウザ内で実行、アップロード不要", dropOrClick: "ファイルをドロップまたはクリックしてアップロード", dropHere: "ここにファイルをドロップ", formats: "対応形式", maxFree: "無料プランは最大 {mb} MB。", selectFile: "ファイルを選択", fileTooLarge: "このファイルは {size} です。無料の上限は {mb} MB — Pro なら 500 MB まで。" },
  processing: { working: "処理中…", uploading: "アップロード中…", processing: "処理中…", takes: "通常 30〜90 秒かかります", ad: "広告" },
  result: { ready: "ファイルが完成しました", download: "ダウンロード", tryAnother: "別のファイルを処理", whatNext: "次は？", preview: "プレビュー" },
  adblock: { title: "Konvertools は広告のおかげで無料です", body1: "広告は次の方法で無効化できます：", goPro: "月 12 ユーロで Pro へ", body2: " もしくは、このサイトで広告を許可してください。", dismiss: "閉じる" },
  errors: { serverReturned: "サーバーが {status} を返しました。少し後でもう一度。", noResultUrl: "サーバーが結果 URL を返しませんでした。", network: "ネットワークエラー。", notWiredUp: "このツールはまだバックエンドに接続されていません。対応する Supabase 関数を設定してください。", noCues: "キューが見つかりませんでした。", badFormat: "SRT または VTT 形式を検出できません。", cantParse: "このファイルを解析できません。", wrongFormat: "これは {fmt} ファイルのようです。{other} コンバーターをお使いください。" },
  sync: { prompt: "どれだけずらしますか？", help: "正の値で字幕を遅らせ、負の値で早めます。", seconds: "秒", millis: "ミリ秒", apply: "オフセットを適用", cancel: "キャンセル" },
  clean: { title: "何をクリーンアップしますか？", summary: "入力 {a} キュー · クリーンアップ後 {b}。", cancel: "キャンセル", download: "クリーンアップ済みをダウンロード", stripSdh: "[音楽] (ため息) のような SDH タグを削除", removeDup: "連続する重複行を削除", shouting: "全大文字を文頭大文字に変換", collapseWs: "連続する空白をまとめる", trim: "各行の前後の空白を削除" },
  editor: { openAnother: "別を開く", export: "エクスポート", delete: "削除", openFile: "ファイルを開く", cues: "{n} キュー" },
  srtToText: { merged: "レイアウト：段落を結合", perCue: "レイアウト：キューごとに 1 行" },
  auth: { loginTitle: "お帰りなさい", loginLead: "Konvertools アカウントにログイン。", registerTitle: "アカウント作成", registerLead: "1 日 5 回まで無料。クレジットカード不要。", email: "メール", password: "パスワード", loginCta: "ログイン", registerCta: "アカウント作成", loading: "お待ちください…", orWithEmail: "またはメールで", google: "Google で続行", checkInbox: "確認メールを受信箱でご確認ください。", noAccount: "アカウントをお持ちでない方は？", createOne: "作成する", hasAccount: "既にアカウントをお持ちですか？", logIn: "ログイン" },
};

const zh: ChromeStrings = {
  nav: { tools: "工具", pricing: "价格", api: "API", login: "登录", start: "开始使用" },
  footer: { tagline: "免费在线转换工具 — 文件、图像、代码、文本等。每项任务一个简单工具。", gdprBadge: "符合 GDPR · 文件从不存储", topTools: "热门工具", product: "产品", legal: "法律", pricing: "价格", api: "API", dashboard: "面板", vsVeed: "对比 VEED.io", privacy: "隐私", terms: "条款", rights: "保留所有权利。" },
  card: { open: "打开", pro: "Pro" },
  account: { billing: "账单", logout: "退出登录" },
  upload: { instant: "即时转换 — 在浏览器中运行,无需上传", dropOrClick: "拖入文件或点击上传", dropHere: "将文件拖到这里", formats: "支持的格式", maxFree: "免费版最大 {mb} MB。", selectFile: "选择文件", fileTooLarge: "此文件 {size}。免费上限 {mb} MB — 升级 Pro 最大 500 MB。" },
  processing: { working: "正在处理…", uploading: "上传中…", processing: "处理中…", takes: "通常需要 30〜90 秒", ad: "广告" },
  result: { ready: "您的文件已准备好", download: "下载", tryAnother: "处理另一个文件", whatNext: "接下来呢?", preview: "预览" },
  adblock: { title: "Konvertools 因广告而免费", body1: "您可以通过以下方式关闭广告:", goPro: "每月 9 欧元升级 Pro", body2: ",或在本站允许广告。", dismiss: "关闭" },
  errors: { serverReturned: "服务器返回 {status}。请稍后重试。", noResultUrl: "服务器未返回结果 URL。", network: "网络错误。", notWiredUp: "此工具尚未连接到后端。请配置对应的 Supabase 函数。", noCues: "未找到字幕行。", badFormat: "无法识别 SRT 或 VTT 格式。", cantParse: "无法解析该文件。", wrongFormat: "这看起来像 {fmt} 文件。请改用 {other} 转换器。" },
  sync: { prompt: "偏移多少?", help: "正数延迟字幕,负数提前。", seconds: "秒", millis: "毫秒", apply: "应用偏移", cancel: "取消" },
  clean: { title: "需要清理什么?", summary: "输入 {a} 行 · 清理后 {b}。", cancel: "取消", download: "下载已清理文件", stripSdh: "去除 [音乐] (叹气) 等 SDH 标签", removeDup: "去除相邻重复行", shouting: "将全大写转为句首大写", collapseWs: "合并多余空格", trim: "修剪每行首尾空格" },
  editor: { openAnother: "打开另一个", export: "导出", delete: "删除", openFile: "打开文件", cues: "{n} 行" },
  srtToText: { merged: "布局:合并段落", perCue: "布局:每行一句" },
  auth: { loginTitle: "欢迎回来", loginLead: "登录您的 Konvertools 帐户。", registerTitle: "创建帐户", registerLead: "每日 5 次免费使用。无需信用卡。", email: "邮箱", password: "密码", loginCta: "登录", registerCta: "创建帐户", loading: "请稍候…", orWithEmail: "或使用邮箱", google: "使用 Google 继续", checkInbox: "请查收邮件确认。", noAccount: "还没有帐户?", createOne: "创建一个", hasAccount: "已有帐户?", logIn: "登录" },
};

const ko: ChromeStrings = {
  nav: { tools: "도구", pricing: "요금", api: "API", login: "로그인", start: "시작하기" },
  footer: { tagline: "무료 온라인 변환 도구 — 파일, 이미지, 코드, 텍스트 등. 작업마다 간단한 도구 하나.", gdprBadge: "GDPR 준수 · 파일은 저장되지 않습니다", topTools: "주요 도구", product: "프로덕트", legal: "법적 사항", pricing: "요금", api: "API", dashboard: "대시보드", vsVeed: "VEED.io 비교", privacy: "개인정보", terms: "이용약관", rights: "All rights reserved." },
  card: { open: "열기", pro: "Pro" },
  account: { billing: "결제", logout: "로그아웃" },
  upload: { instant: "즉시 변환 — 브라우저에서 실행, 업로드 불필요", dropOrClick: "파일을 끌어다 놓거나 클릭하여 업로드", dropHere: "여기에 파일을 놓으세요", formats: "지원 형식", maxFree: "무료 플랜은 최대 {mb} MB.", selectFile: "파일 선택", fileTooLarge: "이 파일은 {size} 입니다. 무료 한도 {mb} MB — Pro 는 최대 500 MB." },
  processing: { working: "처리 중…", uploading: "업로드 중…", processing: "처리 중…", takes: "보통 30〜90초 걸립니다", ad: "광고" },
  result: { ready: "파일이 준비되었습니다", download: "다운로드", tryAnother: "다른 파일 처리", whatNext: "다음은?", preview: "미리보기" },
  adblock: { title: "Konvertools 는 광고 덕분에 무료입니다", body1: "광고는 다음 방법으로 비활성화 가능:", goPro: "월 12유로로 Pro 가입", body2: " 또는 이 사이트의 광고를 허용해 주세요.", dismiss: "닫기" },
  errors: { serverReturned: "서버가 {status} 를 반환했습니다. 잠시 후 다시 시도하세요.", noResultUrl: "서버가 결과 URL 을 반환하지 않았습니다.", network: "네트워크 오류.", notWiredUp: "이 도구는 아직 백엔드에 연결되지 않았습니다. 해당 Supabase 함수를 설정하세요.", noCues: "큐를 찾을 수 없습니다.", badFormat: "SRT 또는 VTT 형식을 감지할 수 없습니다.", cantParse: "파일을 분석할 수 없습니다.", wrongFormat: "{fmt} 파일 같습니다. {other} 변환기를 사용하세요." },
  sync: { prompt: "얼마나 이동할까요?", help: "양수는 자막을 늦추고, 음수는 앞당깁니다.", seconds: "초", millis: "밀리초", apply: "오프셋 적용", cancel: "취소" },
  clean: { title: "무엇을 정리할까요?", summary: "입력 {a}개 큐 · 정리 후 {b}.", cancel: "취소", download: "정리된 파일 다운로드", stripSdh: "[음악] (한숨) 같은 SDH 태그 제거", removeDup: "연속 중복 줄 제거", shouting: "전체 대문자를 문장형 대소문자로", collapseWs: "여러 공백을 하나로", trim: "각 줄의 공백 자르기" },
  editor: { openAnother: "다른 거 열기", export: "내보내기", delete: "삭제", openFile: "파일 열기", cues: "{n}개 큐" },
  srtToText: { merged: "레이아웃: 단락 병합", perCue: "레이아웃: 큐당 한 줄" },
  auth: { loginTitle: "다시 오신 것을 환영합니다", loginLead: "Konvertools 계정에 로그인.", registerTitle: "계정 만들기", registerLead: "하루 5회 무료. 카드 불필요.", email: "이메일", password: "비밀번호", loginCta: "로그인", registerCta: "계정 만들기", loading: "잠시만요…", orWithEmail: "또는 이메일로", google: "Google 로 계속", checkInbox: "확인 이메일을 확인해 주세요.", noAccount: "계정이 없으신가요?", createOne: "만들기", hasAccount: "이미 계정이 있나요?", logIn: "로그인" },
};

const ar: ChromeStrings = {
  nav: { tools: "الأدوات", pricing: "الأسعار", api: "API", login: "تسجيل الدخول", start: "ابدأ" },
  footer: { tagline: "أدوات تحويل مجانية عبر الإنترنت — ملفات وصور وأكواد ونصوص والمزيد. أداة بسيطة لكل مهمة.", gdprBadge: "متوافق مع GDPR · لا يتم تخزين الملفات أبدًا", topTools: "الأدوات الأساسية", product: "المنتج", legal: "قانوني", pricing: "الأسعار", api: "API", dashboard: "لوحة التحكم", vsVeed: "مقارنة بـ VEED.io", privacy: "الخصوصية", terms: "الشروط", rights: "جميع الحقوق محفوظة." },
  card: { open: "افتح", pro: "Pro" },
  account: { billing: "الفوترة", logout: "تسجيل الخروج" },
  upload: { instant: "تحويل فوري — داخل متصفحك، بلا رفع", dropOrClick: "أفلت ملفك أو انقر للرفع", dropHere: "أفلت الملف هنا", formats: "الصيغ المقبولة", maxFree: "أقصى {mb} ميجا في الخطة المجانية.", selectFile: "اختر ملفًا", fileTooLarge: "هذا الملف {size}. الحد المجاني {mb} ميجا — Pro حتى 500 ميجا." },
  processing: { working: "جارٍ المعالجة…", uploading: "جارٍ الرفع…", processing: "جارٍ المعالجة…", takes: "عادةً يستغرق 30 إلى 90 ثانية", ad: "إعلان" },
  result: { ready: "ملفك جاهز", download: "تنزيل", tryAnother: "معالجة ملف آخر", whatNext: "ماذا بعد؟", preview: "معاينة" },
  adblock: { title: "Konvertools مجاني بفضل الإعلانات", body1: "يمكنك تعطيل الإعلانات عبر:", goPro: "الترقية إلى Pro بـ 12 يورو/شهر", body2: " أو السماح بالإعلانات على هذا الموقع.", dismiss: "إغلاق" },
  errors: { serverReturned: "أعاد الخادم {status}. حاول مجددًا.", noResultUrl: "لم يُعِد الخادم رابط نتيجة.", network: "خطأ في الشبكة.", notWiredUp: "هذه الأداة لم تُربط بعد بالخلفية. فعّل دالة Supabase المطابقة.", noCues: "لا توجد سطور.", badFormat: "تعذّر اكتشاف صيغة SRT أو VTT.", cantParse: "تعذّر قراءة الملف.", wrongFormat: "يبدو ملف {fmt}. استخدم محوّل {other} بدلًا من ذلك." },
  sync: { prompt: "بكم تريد الإزاحة؟", help: "القيم الموجبة تؤخّر الترجمات، والسالبة تقدّمها.", seconds: "ثوانٍ", millis: "ميلي ثانية", apply: "تطبيق الإزاحة", cancel: "إلغاء" },
  clean: { title: "ماذا ننظّف؟", summary: "{a} سطور دخلت · {b} بعد التنظيف.", cancel: "إلغاء", download: "تنزيل الملف النظيف", stripSdh: "إزالة وسوم SDH مثل [موسيقى] (تنهد)", removeDup: "إزالة الأسطر المكرّرة المتتالية", shouting: "تحويل الأحرف الكبيرة إلى صياغة جملة", collapseWs: "دمج المسافات المتعددة", trim: "إزالة المسافات حول كل سطر" },
  editor: { openAnother: "افتح آخر", export: "تصدير", delete: "حذف", openFile: "افتح ملفًا", cues: "{n} سطر" },
  srtToText: { merged: "التخطيط: فقرات مدمجة", perCue: "التخطيط: سطر لكل cue" },
  auth: { loginTitle: "مرحبًا بعودتك", loginLead: "سجّل دخول إلى حساب Konvertools.", registerTitle: "أنشئ حسابك", registerLead: "5 استخدامات مجانية يوميًا. لا حاجة لبطاقة.", email: "البريد", password: "كلمة المرور", loginCta: "تسجيل الدخول", registerCta: "إنشاء حساب", loading: "يرجى الانتظار…", orWithEmail: "أو بالبريد", google: "متابعة بـ Google", checkInbox: "تفقّد بريدك للتأكيد.", noAccount: "لا تملك حسابًا؟", createOne: "أنشئ واحدًا", hasAccount: "تملك حسابًا بالفعل؟", logIn: "تسجيل الدخول" },
};

const ru: ChromeStrings = {
  nav: { tools: "Инструменты", pricing: "Тарифы", api: "API", login: "Войти", start: "Начать" },
  footer: { tagline: "Бесплатные онлайн-инструменты конвертации — файлы, изображения, код, текст и другое. Один простой инструмент на задачу.", gdprBadge: "Соответствует GDPR · Файлы никогда не хранятся", topTools: "Основные инструменты", product: "Продукт", legal: "Правовое", pricing: "Тарифы", api: "API", dashboard: "Панель", vsVeed: "Сравнение с VEED.io", privacy: "Конфиденциальность", terms: "Условия", rights: "Все права защищены." },
  card: { open: "Открыть", pro: "Pro" },
  account: { billing: "Оплата", logout: "Выйти" },
  upload: { instant: "Мгновенная конвертация — в браузере, без загрузки", dropOrClick: "Перетащите файл или нажмите для загрузки", dropHere: "Бросьте файл сюда", formats: "Допустимые форматы", maxFree: "Макс. {mb} МБ на бесплатном тарифе.", selectFile: "Выбрать файл", fileTooLarge: "Файл размером {size}. Бесплатный лимит {mb} МБ — Pro до 500 МБ." },
  processing: { working: "Обрабатываем ваш файл…", uploading: "Загружаем…", processing: "Обрабатываем…", takes: "Обычно занимает 30–90 секунд", ad: "Реклама" },
  result: { ready: "Ваш файл готов", download: "Скачать", tryAnother: "Обработать ещё файл", whatNext: "Что дальше?", preview: "Превью" },
  adblock: { title: "Konvertools бесплатен благодаря рекламе", body1: "Рекламу можно отключить,", goPro: "перейдя на Pro за 12 €/мес", body2: ", или разрешив рекламу на этом сайте.", dismiss: "Закрыть" },
  errors: { serverReturned: "Сервер вернул {status}. Попробуйте через мгновение.", noResultUrl: "Сервер не вернул URL результата.", network: "Сетевая ошибка.", notWiredUp: "Этот инструмент пока не подключён к бэкенду. Настройте соответствующую функцию Supabase.", noCues: "Сабтайтлы не найдены.", badFormat: "Не удалось определить формат SRT или VTT.", cantParse: "Не удалось прочитать файл.", wrongFormat: "Похоже на файл {fmt}. Используйте конвертер {other}." },
  sync: { prompt: "На сколько сдвинуть?", help: "Положительные значения задерживают субтитры, отрицательные опережают.", seconds: "Секунды", millis: "Миллисекунды", apply: "Применить сдвиг", cancel: "Отмена" },
  clean: { title: "Что почистить?", summary: "Вход: {a} реплик · после очистки: {b}.", cancel: "Отмена", download: "Скачать очищенный файл", stripSdh: "Убрать SDH-теги вроде [музыка] (вздох)", removeDup: "Убрать подряд идущие дубликаты", shouting: "ПРОПИСНЫЕ → регистр предложения", collapseWs: "Сжать множественные пробелы", trim: "Обрезать пробелы вокруг строк" },
  editor: { openAnother: "Открыть другой", export: "Экспорт", delete: "Удалить", openFile: "Открыть файл", cues: "{n} реплик" },
  srtToText: { merged: "Раскладка: объединённые абзацы", perCue: "Раскладка: одна строка на реплику" },
  auth: { loginTitle: "С возвращением", loginLead: "Войдите в аккаунт Konvertools.", registerTitle: "Создать аккаунт", registerLead: "5 бесплатных запусков в день. Карта не нужна.", email: "Email", password: "Пароль", loginCta: "Войти", registerCta: "Создать аккаунт", loading: "Подождите…", orWithEmail: "или по email", google: "Продолжить с Google", checkInbox: "Проверьте почту для подтверждения.", noAccount: "Нет аккаунта?", createOne: "Создайте", hasAccount: "Уже есть аккаунт?", logIn: "Войти" },
};

const hi: ChromeStrings = {
  nav: { tools: "टूल", pricing: "मूल्य", api: "API", login: "लॉग इन", start: "शुरू करें" },
  footer: { tagline: "मुफ़्त ऑनलाइन रूपांतरण टूल — फ़ाइलें, इमेज, कोड, टेक्स्ट और बहुत कुछ। हर काम के लिए एक सरल टूल।", gdprBadge: "GDPR अनुपालन · फ़ाइलें कभी संग्रहीत नहीं", topTools: "मुख्य टूल", product: "उत्पाद", legal: "क़ानूनी", pricing: "मूल्य", api: "API", dashboard: "डैशबोर्ड", vsVeed: "VEED.io से तुलना", privacy: "गोपनीयता", terms: "शर्तें", rights: "सर्वाधिकार सुरक्षित।" },
  card: { open: "खोलें", pro: "Pro" },
  account: { billing: "बिलिंग", logout: "लॉग आउट" },
  upload: { instant: "तुरंत रूपांतरण — आपके ब्राउज़र में, अपलोड की ज़रूरत नहीं", dropOrClick: "फ़ाइल छोड़ें या अपलोड करने के लिए क्लिक करें", dropHere: "फ़ाइल यहाँ छोड़ें", formats: "स्वीकृत प्रारूप", maxFree: "मुफ़्त प्लान में अधिकतम {mb} MB।", selectFile: "फ़ाइल चुनें", fileTooLarge: "यह फ़ाइल {size} है. मुफ़्त सीमा {mb} MB — Pro में 500 MB तक।" },
  processing: { working: "आपकी फ़ाइल पर काम हो रहा है…", uploading: "अपलोड हो रहा है…", processing: "प्रोसेस हो रहा है…", takes: "आमतौर पर 30–90 सेकंड लगते हैं", ad: "विज्ञापन" },
  result: { ready: "आपकी फ़ाइल तैयार है", download: "डाउनलोड", tryAnother: "एक और फ़ाइल प्रोसेस करें", whatNext: "आगे क्या?", preview: "पूर्वावलोकन" },
  adblock: { title: "Konvertools विज्ञापनों के कारण मुफ़्त है", body1: "आप विज्ञापन इस तरह बंद कर सकते हैं:", goPro: "€12/माह में Pro लें", body2: ", या इस साइट पर विज्ञापनों की अनुमति दें।", dismiss: "बंद करें" },
  errors: { serverReturned: "सर्वर ने {status} लौटाया. कुछ देर में पुनः प्रयास करें।", noResultUrl: "सर्वर ने रिज़ल्ट URL नहीं लौटाया।", network: "नेटवर्क त्रुटि।", notWiredUp: "यह टूल अभी बैकेंड से जुड़ा नहीं है. संबंधित Supabase फ़ंक्शन कॉन्फ़िगर करें।", noCues: "कोई क्यू नहीं मिला।", badFormat: "SRT या VTT प्रारूप का पता नहीं चला।", cantParse: "फ़ाइल पढ़ी नहीं जा सकी।", wrongFormat: "यह {fmt} फ़ाइल लगती है. इसके बजाय {other} कनवर्टर आज़माएँ।" },
  sync: { prompt: "कितना शिफ्ट करें?", help: "धनात्मक मान सबटाइटल को विलंबित करते हैं, ऋणात्मक उन्हें आगे लाते हैं।", seconds: "सेकंड", millis: "मिलीसेकंड", apply: "ऑफसेट लागू करें", cancel: "रद्द करें" },
  clean: { title: "क्या साफ़ करना है?", summary: "{a} क्यू इनपुट · सफ़ाई के बाद {b}।", cancel: "रद्द करें", download: "साफ़ की गई फ़ाइल डाउनलोड करें", stripSdh: "[संगीत] (आह) जैसे SDH टैग हटाएँ", removeDup: "लगातार डुप्लिकेट लाइनें हटाएँ", shouting: "ALL-CAPS को वाक्य केस में बदलें", collapseWs: "कई स्पेस को संक्षिप्त करें", trim: "हर लाइन के आसपास स्पेस ट्रिम करें" },
  editor: { openAnother: "दूसरा खोलें", export: "एक्सपोर्ट", delete: "हटाएँ", openFile: "फ़ाइल खोलें", cues: "{n} क्यू" },
  srtToText: { merged: "लेआउट: मर्ज किए गए पैराग्राफ़", perCue: "लेआउट: हर क्यू के लिए एक लाइन" },
  auth: { loginTitle: "वापसी पर स्वागत है", loginLead: "अपने Konvertools खाते में लॉग इन करें।", registerTitle: "अपना खाता बनाएँ", registerLead: "रोज़ 5 मुफ़्त रन। क्रेडिट कार्ड ज़रूरी नहीं।", email: "ईमेल", password: "पासवर्ड", loginCta: "लॉग इन", registerCta: "खाता बनाएँ", loading: "कृपया प्रतीक्षा करें…", orWithEmail: "या ईमेल से", google: "Google से जारी रखें", checkInbox: "पुष्टि के लिए अपना इनबॉक्स देखें।", noAccount: "खाता नहीं है?", createOne: "एक बनाएँ", hasAccount: "पहले से खाता है?", logIn: "लॉग इन" },
};

const tr: ChromeStrings = {
  nav: { tools: "Araçlar", pricing: "Fiyatlar", api: "API", login: "Giriş yap", start: "Başla" },
  footer: { tagline: "Ücretsiz çevrimiçi dönüştürme araçları — dosyalar, görüntüler, kod, metin ve daha fazlası. Her iş için tek bir basit araç.", gdprBadge: "GDPR uyumlu · Dosyalar asla saklanmaz", topTools: "En iyi araçlar", product: "Ürün", legal: "Yasal", pricing: "Fiyatlar", api: "API", dashboard: "Panel", vsVeed: "VEED.io karşılaştırması", privacy: "Gizlilik", terms: "Şartlar", rights: "Tüm hakları saklıdır." },
  card: { open: "Aç", pro: "Pro" },
  account: { billing: "Faturalandırma", logout: "Çıkış yap" },
  upload: { instant: "Anında dönüştürme — tarayıcınızda çalışır, yükleme gerekmez", dropOrClick: "Dosyanızı bırakın veya yüklemek için tıklayın", dropHere: "Dosyayı buraya bırakın", formats: "Kabul edilen biçimler", maxFree: "Ücretsiz planda en fazla {mb} MB.", selectFile: "Dosya seç", fileTooLarge: "Bu dosya {size}. Ücretsiz sınır {mb} MB — 500 MB'a kadar için Pro'ya geçin." },
  processing: { working: "Dosyanız işleniyor…", uploading: "Yükleniyor…", processing: "İşleniyor…", takes: "Genellikle 30–90 saniye sürer", ad: "Reklam" },
  result: { ready: "Dosyanız hazır", download: "İndir", tryAnother: "Başka bir dosya işle", whatNext: "Sırada ne var?", preview: "Önizleme" },
  adblock: { title: "Konvertools reklamlar sayesinde ücretsizdir", body1: "Reklamları şu şekilde devre dışı bırakabilirsiniz:", goPro: "ayda 12 €'ya Pro'ya geçerek", body2: " veya bu sitede reklamlara izin vererek.", dismiss: "Kapat" },
  errors: { serverReturned: "Sunucu {status} döndürdü. Birazdan tekrar deneyin.", noResultUrl: "Sunucu bir sonuç URL'si döndürmedi.", network: "Ağ hatası.", notWiredUp: "Bu araç henüz bir arka uca bağlı değil. İlgili Supabase işlevini yapılandırın.", noCues: "Altyazı satırı bulunamadı.", badFormat: "SRT veya VTT biçimi algılanamadı.", cantParse: "Bu dosya ayrıştırılamadı.", wrongFormat: "Bu bir {fmt} dosyası gibi görünüyor. Bunun yerine {other} dönüştürücüyü deneyin." },
  sync: { prompt: "Ne kadar kaydıralım?", help: "Pozitif sayılar altyazıları geciktirir, negatif sayılar öne alır.", seconds: "Saniye", millis: "Milisaniye", apply: "Kaydırmayı uygula", cancel: "İptal" },
  clean: { title: "Neyi temizleyelim?", summary: "{a} satır girdi · temizlikten sonra {b}.", cancel: "İptal", download: "Temizlenmiş dosyayı indir", stripSdh: "[müzik] (iç çeker) gibi SDH etiketlerini kaldır", removeDup: "Ardışık yinelenen satırları kaldır", shouting: "BÜYÜK HARFLERİ cümle düzenine çevir", collapseWs: "Birden çok boşluğu birleştir", trim: "Her satırın etrafındaki boşlukları kırp" },
  editor: { openAnother: "Başka aç", export: "Dışa aktar", delete: "Sil", openFile: "Dosya aç", cues: "{n} satır" },
  srtToText: { merged: "Düzen: birleştirilmiş paragraflar", perCue: "Düzen: her altyazı için bir satır" },
  auth: { loginTitle: "Tekrar hoş geldiniz", loginLead: "Konvertools hesabınıza giriş yapın.", registerTitle: "Hesabınızı oluşturun", registerLead: "Günde 5 ücretsiz kullanım. Kredi kartı gerekmez.", email: "E-posta", password: "Şifre", loginCta: "Giriş yap", registerCta: "Hesap oluştur", loading: "Lütfen bekleyin…", orWithEmail: "veya e-posta ile", google: "Google ile devam et", checkInbox: "E-postanızı onaylamak için gelen kutunuzu kontrol edin.", noAccount: "Hesabınız yok mu?", createOne: "Bir tane oluşturun", hasAccount: "Zaten hesabınız var mı?", logIn: "Giriş yap" },
};

const id: ChromeStrings = {
  nav: { tools: "Alat", pricing: "Harga", api: "API", login: "Masuk", start: "Mulai" },
  footer: { tagline: "Alat konversi online gratis — file, gambar, kode, teks, dan lainnya. Satu alat sederhana per tugas.", gdprBadge: "Patuh GDPR · File tidak pernah disimpan", topTools: "Alat unggulan", product: "Produk", legal: "Hukum", pricing: "Harga", api: "API", dashboard: "Dasbor", vsVeed: "vs VEED.io", privacy: "Privasi", terms: "Ketentuan", rights: "Semua hak dilindungi." },
  card: { open: "Buka", pro: "Pro" },
  account: { billing: "Penagihan", logout: "Keluar" },
  upload: { instant: "Konversi instan — berjalan di browser Anda, tanpa unggah", dropOrClick: "Letakkan file Anda atau klik untuk mengunggah", dropHere: "Letakkan file di sini", formats: "Format yang diterima", maxFree: "Maks {mb} MB pada paket gratis.", selectFile: "Pilih file", fileTooLarge: "File ini {size}. Batas gratis {mb} MB — tingkatkan ke Pro hingga 500 MB." },
  processing: { working: "Memproses file Anda…", uploading: "Mengunggah…", processing: "Memproses…", takes: "Biasanya butuh 30–90 detik", ad: "Iklan" },
  result: { ready: "File Anda siap", download: "Unduh", tryAnother: "Proses file lain", whatNext: "Selanjutnya?", preview: "Pratinjau" },
  adblock: { title: "Konvertools gratis berkat iklan", body1: "Anda dapat menonaktifkan iklan dengan", goPro: "beralih ke Pro seharga €12/bulan", body2: ", atau dengan mengizinkan iklan di situs ini.", dismiss: "Tutup" },
  errors: { serverReturned: "Server mengembalikan {status}. Coba lagi sebentar.", noResultUrl: "Server tidak mengembalikan URL hasil.", network: "Kesalahan jaringan.", notWiredUp: "Alat ini belum terhubung ke backend. Konfigurasikan fungsi Supabase yang sesuai.", noCues: "Tidak ada teks ditemukan.", badFormat: "Format SRT atau VTT tidak terdeteksi.", cantParse: "Tidak dapat mengurai file itu.", wrongFormat: "Itu tampak seperti file {fmt}. Coba konverter {other}." },
  sync: { prompt: "Berapa banyak menggeser?", help: "Angka positif menunda subtitle, negatif memajukannya.", seconds: "Detik", millis: "Milidetik", apply: "Terapkan offset", cancel: "Batal" },
  clean: { title: "Apa yang harus dibersihkan?", summary: "{a} baris masuk · {b} setelah pembersihan.", cancel: "Batal", download: "Unduh file bersih", stripSdh: "Hapus tag SDH seperti [musik] (mendesah)", removeDup: "Hapus baris duplikat berturut-turut", shouting: "Ubah HURUF KAPITAL ke huruf kalimat", collapseWs: "Gabungkan beberapa spasi", trim: "Pangkas spasi di sekitar setiap baris" },
  editor: { openAnother: "Buka lainnya", export: "Ekspor", delete: "Hapus", openFile: "Buka file", cues: "{n} baris" },
  srtToText: { merged: "Tata letak: paragraf digabung", perCue: "Tata letak: satu baris per teks" },
  auth: { loginTitle: "Selamat datang kembali", loginLead: "Masuk ke akun Konvertools Anda.", registerTitle: "Buat akun Anda", registerLead: "5 penggunaan gratis per hari. Tanpa kartu kredit.", email: "Email", password: "Kata sandi", loginCta: "Masuk", registerCta: "Buat akun", loading: "Mohon tunggu…", orWithEmail: "atau dengan email", google: "Lanjutkan dengan Google", checkInbox: "Periksa kotak masuk untuk konfirmasi email.", noAccount: "Belum punya akun?", createOne: "Buat satu", hasAccount: "Sudah punya akun?", logIn: "Masuk" },
};

const vi: ChromeStrings = {
  nav: { tools: "Công cụ", pricing: "Giá", api: "API", login: "Đăng nhập", start: "Bắt đầu" },
  footer: { tagline: "Công cụ chuyển đổi trực tuyến miễn phí — tệp, hình ảnh, mã, văn bản và hơn thế. Một công cụ đơn giản cho mỗi tác vụ.", gdprBadge: "Tuân thủ GDPR · Tệp không bao giờ được lưu trữ", topTools: "Công cụ hàng đầu", product: "Sản phẩm", legal: "Pháp lý", pricing: "Giá", api: "API", dashboard: "Bảng điều khiển", vsVeed: "So với VEED.io", privacy: "Quyền riêng tư", terms: "Điều khoản", rights: "Bảo lưu mọi quyền." },
  card: { open: "Mở", pro: "Pro" },
  account: { billing: "Thanh toán", logout: "Đăng xuất" },
  upload: { instant: "Chuyển đổi tức thì — chạy trong trình duyệt, không cần tải lên", dropOrClick: "Thả tệp của bạn hoặc nhấp để tải lên", dropHere: "Thả tệp vào đây", formats: "Định dạng được chấp nhận", maxFree: "Tối đa {mb} MB ở gói miễn phí.", selectFile: "Chọn tệp", fileTooLarge: "Tệp này {size}. Giới hạn miễn phí {mb} MB — nâng cấp Pro lên đến 500 MB." },
  processing: { working: "Đang xử lý tệp của bạn…", uploading: "Đang tải lên…", processing: "Đang xử lý…", takes: "Thường mất 30–90 giây", ad: "Quảng cáo" },
  result: { ready: "Tệp của bạn đã sẵn sàng", download: "Tải xuống", tryAnother: "Xử lý tệp khác", whatNext: "Tiếp theo?", preview: "Xem trước" },
  adblock: { title: "Konvertools miễn phí nhờ quảng cáo", body1: "Bạn có thể tắt quảng cáo bằng cách", goPro: "lên Pro với giá 12 €/tháng", body2: ", hoặc cho phép quảng cáo trên trang này.", dismiss: "Đóng" },
  errors: { serverReturned: "Máy chủ trả về {status}. Thử lại sau giây lát.", noResultUrl: "Máy chủ không trả về URL kết quả.", network: "Lỗi mạng.", notWiredUp: "Công cụ này chưa được kết nối với backend. Cấu hình hàm Supabase tương ứng.", noCues: "Không tìm thấy phụ đề.", badFormat: "Không phát hiện định dạng SRT hoặc VTT.", cantParse: "Không thể phân tích tệp đó.", wrongFormat: "Đó có vẻ là tệp {fmt}. Hãy thử bộ chuyển đổi {other}." },
  sync: { prompt: "Dịch chuyển bao nhiêu?", help: "Số dương làm trễ phụ đề, số âm làm sớm hơn.", seconds: "Giây", millis: "Mili giây", apply: "Áp dụng độ lệch", cancel: "Hủy" },
  clean: { title: "Cần dọn dẹp gì?", summary: "{a} dòng vào · {b} sau khi dọn dẹp.", cancel: "Hủy", download: "Tải tệp đã dọn dẹp", stripSdh: "Xóa thẻ SDH như [nhạc] (thở dài)", removeDup: "Xóa các dòng trùng lặp liên tiếp", shouting: "Chuyển CHỮ HOA thành kiểu câu", collapseWs: "Gộp nhiều khoảng trắng", trim: "Cắt khoảng trắng quanh mỗi dòng" },
  editor: { openAnother: "Mở tệp khác", export: "Xuất", delete: "Xóa", openFile: "Mở tệp", cues: "{n} dòng" },
  srtToText: { merged: "Bố cục: đoạn văn được gộp", perCue: "Bố cục: một dòng cho mỗi phụ đề" },
  auth: { loginTitle: "Chào mừng trở lại", loginLead: "Đăng nhập vào tài khoản Konvertools của bạn.", registerTitle: "Tạo tài khoản của bạn", registerLead: "5 lượt miễn phí mỗi ngày. Không cần thẻ tín dụng.", email: "Email", password: "Mật khẩu", loginCta: "Đăng nhập", registerCta: "Tạo tài khoản", loading: "Vui lòng đợi…", orWithEmail: "hoặc bằng email", google: "Tiếp tục với Google", checkInbox: "Kiểm tra hộp thư để xác nhận email.", noAccount: "Chưa có tài khoản?", createOne: "Tạo một tài khoản", hasAccount: "Đã có tài khoản?", logIn: "Đăng nhập" },
};

const sv: ChromeStrings = {
  nav: { tools: "Verktyg", pricing: "Priser", api: "API", login: "Logga in", start: "Kom igång" },
  footer: { tagline: "Gratis onlineverktyg för konvertering — filer, bilder, kod, text och mer. Ett enkelt verktyg per uppgift.", gdprBadge: "GDPR-kompatibel · Filer lagras aldrig", topTools: "Toppverktyg", product: "Produkt", legal: "Juridik", pricing: "Priser", api: "API", dashboard: "Panel", vsVeed: "vs VEED.io", privacy: "Integritet", terms: "Villkor", rights: "Alla rättigheter förbehållna." },
  card: { open: "Öppna", pro: "Pro" },
  account: { billing: "Fakturering", logout: "Logga ut" },
  upload: { instant: "Direkt konvertering — körs i din webbläsare, ingen uppladdning behövs", dropOrClick: "Släpp din fil eller klicka för att ladda upp", dropHere: "Släpp filen här", formats: "Accepterade format", maxFree: "Max {mb} MB på gratisplanen.", selectFile: "Välj en fil", fileTooLarge: "Den här filen är {size}. Gratisgränsen är {mb} MB — uppgradera till Pro för upp till 500 MB." },
  processing: { working: "Bearbetar din fil…", uploading: "Laddar upp…", processing: "Bearbetar…", takes: "Tar oftast 30–90 sekunder", ad: "Annons" },
  result: { ready: "Din fil är klar", download: "Ladda ner", tryAnother: "Bearbeta en annan fil", whatNext: "Vad händer nu?", preview: "Förhandsgranska" },
  adblock: { title: "Konvertools är gratis tack vare annonser", body1: "Du kan inaktivera annonser genom att", goPro: "gå Pro för 12 €/månad", body2: ", eller genom att tillåta annonser på den här webbplatsen.", dismiss: "Stäng" },
  errors: { serverReturned: "Servern returnerade {status}. Försök igen om en stund.", noResultUrl: "Servern returnerade ingen resultat-URL.", network: "Nätverksfel.", notWiredUp: "Det här verktyget är inte kopplat till en backend än. Konfigurera motsvarande Supabase-funktion.", noCues: "Inga textrader hittades.", badFormat: "Kunde inte identifiera SRT- eller VTT-format.", cantParse: "Kunde inte tolka filen.", wrongFormat: "Det ser ut som en {fmt}-fil. Prova {other}-konverteraren istället." },
  sync: { prompt: "Hur mycket ska vi förskjuta?", help: "Positiva tal fördröjer undertexter, negativa tidigarelägger dem.", seconds: "Sekunder", millis: "Millisekunder", apply: "Tillämpa förskjutning", cancel: "Avbryt" },
  clean: { title: "Vad ska vi rensa?", summary: "{a} rader in · {b} efter rensning.", cancel: "Avbryt", download: "Ladda ner rensad fil", stripSdh: "Ta bort SDH-taggar som [musik] (suck)", removeDup: "Ta bort upprepade dubbletter", shouting: "Konvertera VERSALER till meningsform", collapseWs: "Slå ihop flera mellanslag", trim: "Trimma blanksteg runt varje rad" },
  editor: { openAnother: "Öppna en annan", export: "Exportera", delete: "Ta bort", openFile: "Öppna fil", cues: "{n} rader" },
  srtToText: { merged: "Layout: sammanslagna stycken", perCue: "Layout: en rad per textrad" },
  auth: { loginTitle: "Välkommen tillbaka", loginLead: "Logga in på ditt Konvertools-konto.", registerTitle: "Skapa ditt konto", registerLead: "5 gratis körningar per dag. Inget kreditkort krävs.", email: "E-post", password: "Lösenord", loginCta: "Logga in", registerCta: "Skapa konto", loading: "Vänta…", orWithEmail: "eller med e-post", google: "Fortsätt med Google", checkInbox: "Kolla din inkorg för att bekräfta din e-post.", noAccount: "Har du inget konto?", createOne: "Skapa ett", hasAccount: "Har du redan ett konto?", logIn: "Logga in" },
};

const pl: ChromeStrings = {
  nav: { tools: "Narzędzia", pricing: "Cennik", api: "API", login: "Zaloguj się", start: "Zacznij" },
  footer: { tagline: "Darmowe narzędzia konwersji online — pliki, obrazy, kod, tekst i więcej. Jedno proste narzędzie do każdego zadania.", gdprBadge: "Zgodny z RODO · Pliki nigdy nie są przechowywane", topTools: "Najlepsze narzędzia", product: "Produkt", legal: "Informacje prawne", pricing: "Cennik", api: "API", dashboard: "Panel", vsVeed: "vs VEED.io", privacy: "Prywatność", terms: "Warunki", rights: "Wszelkie prawa zastrzeżone." },
  card: { open: "Otwórz", pro: "Pro" },
  account: { billing: "Rozliczenia", logout: "Wyloguj się" },
  upload: { instant: "Natychmiastowa konwersja — działa w przeglądarce, bez przesyłania", dropOrClick: "Upuść plik lub kliknij, aby przesłać", dropHere: "Upuść plik tutaj", formats: "Akceptowane formaty", maxFree: "Maks. {mb} MB w planie darmowym.", selectFile: "Wybierz plik", fileTooLarge: "Ten plik ma {size}. Limit darmowy to {mb} MB — przejdź na Pro do 500 MB." },
  processing: { working: "Przetwarzanie pliku…", uploading: "Przesyłanie…", processing: "Przetwarzanie…", takes: "Zwykle trwa 30–90 sekund", ad: "Reklama" },
  result: { ready: "Twój plik jest gotowy", download: "Pobierz", tryAnother: "Przetwórz kolejny plik", whatNext: "Co dalej?", preview: "Podgląd" },
  adblock: { title: "Konvertools jest darmowy dzięki reklamom", body1: "Możesz wyłączyć reklamy,", goPro: "przechodząc na Pro za 12 €/mies.", body2: ", lub zezwalając na reklamy w tej witrynie.", dismiss: "Zamknij" },
  errors: { serverReturned: "Serwer zwrócił {status}. Spróbuj ponownie za chwilę.", noResultUrl: "Serwer nie zwrócił adresu URL wyniku.", network: "Błąd sieci.", notWiredUp: "To narzędzie nie jest jeszcze podłączone do backendu. Skonfiguruj odpowiednią funkcję Supabase.", noCues: "Nie znaleziono napisów.", badFormat: "Nie wykryto formatu SRT lub VTT.", cantParse: "Nie można przetworzyć tego pliku.", wrongFormat: "To wygląda jak plik {fmt}. Wypróbuj konwerter {other}." },
  sync: { prompt: "O ile przesunąć?", help: "Liczby dodatnie opóźniają napisy, ujemne je przyspieszają.", seconds: "Sekundy", millis: "Milisekundy", apply: "Zastosuj przesunięcie", cancel: "Anuluj" },
  clean: { title: "Co wyczyścić?", summary: "{a} wierszy na wejściu · {b} po czyszczeniu.", cancel: "Anuluj", download: "Pobierz wyczyszczony plik", stripSdh: "Usuń tagi SDH, np. [muzyka] (westchnienie)", removeDup: "Usuń kolejne zduplikowane wiersze", shouting: "Zamień WIELKIE LITERY na zdaniowe", collapseWs: "Scal wielokrotne spacje", trim: "Przytnij spacje wokół każdego wiersza" },
  editor: { openAnother: "Otwórz inny", export: "Eksportuj", delete: "Usuń", openFile: "Otwórz plik", cues: "{n} wierszy" },
  srtToText: { merged: "Układ: scalone akapity", perCue: "Układ: jeden wiersz na napis" },
  auth: { loginTitle: "Witaj ponownie", loginLead: "Zaloguj się na konto Konvertools.", registerTitle: "Utwórz konto", registerLead: "5 darmowych użyć dziennie. Bez karty.", email: "E-mail", password: "Hasło", loginCta: "Zaloguj się", registerCta: "Utwórz konto", loading: "Proszę czekać…", orWithEmail: "lub przez e-mail", google: "Kontynuuj z Google", checkInbox: "Sprawdź skrzynkę, aby potwierdzić e-mail.", noAccount: "Nie masz konta?", createOne: "Utwórz je", hasAccount: "Masz już konto?", logIn: "Zaloguj się" },
};

const uk: ChromeStrings = {
  nav: { tools: "Інструменти", pricing: "Ціни", api: "API", login: "Увійти", start: "Почати" },
  footer: { tagline: "Безкоштовні онлайн-інструменти конвертації — файли, зображення, код, текст тощо. Один простий інструмент на завдання.", gdprBadge: "Відповідає GDPR · Файли ніколи не зберігаються", topTools: "Найкращі інструменти", product: "Продукт", legal: "Юридична інформація", pricing: "Ціни", api: "API", dashboard: "Панель", vsVeed: "проти VEED.io", privacy: "Конфіденційність", terms: "Умови", rights: "Усі права захищено." },
  card: { open: "Відкрити", pro: "Pro" },
  account: { billing: "Оплата", logout: "Вийти" },
  upload: { instant: "Миттєва конвертація — у вашому браузері, без завантаження", dropOrClick: "Перетягніть файл або натисніть, щоб завантажити", dropHere: "Перетягніть файл сюди", formats: "Прийнятні формати", maxFree: "Макс. {mb} МБ у безкоштовному плані.", selectFile: "Вибрати файл", fileTooLarge: "Цей файл {size}. Безкоштовний ліміт {mb} МБ — перейдіть на Pro до 500 МБ." },
  processing: { working: "Обробка вашого файлу…", uploading: "Завантаження…", processing: "Обробка…", takes: "Зазвичай триває 30–90 секунд", ad: "Реклама" },
  result: { ready: "Ваш файл готовий", download: "Завантажити", tryAnother: "Обробити інший файл", whatNext: "Що далі?", preview: "Попередній перегляд" },
  adblock: { title: "Konvertools безкоштовний завдяки рекламі", body1: "Ви можете вимкнути рекламу,", goPro: "перейшовши на Pro за 12 €/міс", body2: ", або дозволивши рекламу на цьому сайті.", dismiss: "Закрити" },
  errors: { serverReturned: "Сервер повернув {status}. Спробуйте за мить.", noResultUrl: "Сервер не повернув URL результату.", network: "Помилка мережі.", notWiredUp: "Цей інструмент ще не підключено до бекенду. Налаштуйте відповідну функцію Supabase.", noCues: "Субтитрів не знайдено.", badFormat: "Не вдалося визначити формат SRT або VTT.", cantParse: "Не вдалося розібрати цей файл.", wrongFormat: "Схоже на файл {fmt}. Спробуйте конвертер {other}." },
  sync: { prompt: "На скільки зсунути?", help: "Додатні числа затримують субтитри, від'ємні — пришвидшують.", seconds: "Секунди", millis: "Мілісекунди", apply: "Застосувати зсув", cancel: "Скасувати" },
  clean: { title: "Що очистити?", summary: "{a} рядків на вході · {b} після очищення.", cancel: "Скасувати", download: "Завантажити очищений файл", stripSdh: "Видалити теги SDH, як-от [музика] (зітхання)", removeDup: "Видалити послідовні дублікати рядків", shouting: "Перетворити ВЕЛИКІ ЛІТЕРИ на регістр речення", collapseWs: "Об'єднати кілька пробілів", trim: "Обрізати пробіли навколо кожного рядка" },
  editor: { openAnother: "Відкрити інший", export: "Експорт", delete: "Видалити", openFile: "Відкрити файл", cues: "{n} рядків" },
  srtToText: { merged: "Макет: об'єднані абзаци", perCue: "Макет: один рядок на субтитр" },
  auth: { loginTitle: "З поверненням", loginLead: "Увійдіть до облікового запису Konvertools.", registerTitle: "Створіть обліковий запис", registerLead: "5 безкоштовних запусків на день. Без картки.", email: "Електронна пошта", password: "Пароль", loginCta: "Увійти", registerCta: "Створити обліковий запис", loading: "Зачекайте…", orWithEmail: "або через email", google: "Продовжити з Google", checkInbox: "Перевірте пошту для підтвердження.", noAccount: "Немає облікового запису?", createOne: "Створіть його", hasAccount: "Уже маєте обліковий запис?", logIn: "Увійти" },
};

const cs: ChromeStrings = {
  nav: { tools: "Nástroje", pricing: "Ceny", api: "API", login: "Přihlásit se", start: "Začít" },
  footer: { tagline: "Bezplatné online nástroje pro konverzi — soubory, obrázky, kód, text a další. Jeden jednoduchý nástroj na úkol.", gdprBadge: "V souladu s GDPR · Soubory se nikdy neukládají", topTools: "Hlavní nástroje", product: "Produkt", legal: "Právní informace", pricing: "Ceny", api: "API", dashboard: "Panel", vsVeed: "vs VEED.io", privacy: "Soukromí", terms: "Podmínky", rights: "Všechna práva vyhrazena." },
  card: { open: "Otevřít", pro: "Pro" },
  account: { billing: "Fakturace", logout: "Odhlásit se" },
  upload: { instant: "Okamžitá konverze — běží ve vašem prohlížeči, bez nahrávání", dropOrClick: "Přetáhněte soubor nebo klikněte pro nahrání", dropHere: "Sem přetáhněte soubor", formats: "Přijímané formáty", maxFree: "Max. {mb} MB v bezplatném plánu.", selectFile: "Vybrat soubor", fileTooLarge: "Tento soubor má {size}. Bezplatný limit je {mb} MB — přejděte na Pro až 500 MB." },
  processing: { working: "Zpracování vašeho souboru…", uploading: "Nahrávání…", processing: "Zpracování…", takes: "Obvykle trvá 30–90 sekund", ad: "Reklama" },
  result: { ready: "Váš soubor je připraven", download: "Stáhnout", tryAnother: "Zpracovat další soubor", whatNext: "Co dál?", preview: "Náhled" },
  adblock: { title: "Konvertools je zdarma díky reklamám", body1: "Reklamy můžete vypnout", goPro: "přechodem na Pro za 12 €/měsíc", body2: ", nebo povolením reklam na tomto webu.", dismiss: "Zavřít" },
  errors: { serverReturned: "Server vrátil {status}. Zkuste to za chvíli znovu.", noResultUrl: "Server nevrátil URL výsledku.", network: "Chyba sítě.", notWiredUp: "Tento nástroj ještě není připojen k backendu. Nakonfigurujte odpovídající funkci Supabase.", noCues: "Nenalezeny žádné titulky.", badFormat: "Nepodařilo se rozpoznat formát SRT nebo VTT.", cantParse: "Tento soubor nelze zpracovat.", wrongFormat: "Vypadá to jako soubor {fmt}. Zkuste místo toho převodník {other}." },
  sync: { prompt: "O kolik posunout?", help: "Kladná čísla zpožďují titulky, záporná je urychlují.", seconds: "Sekundy", millis: "Milisekundy", apply: "Použít posun", cancel: "Zrušit" },
  clean: { title: "Co vyčistit?", summary: "{a} řádků na vstupu · {b} po vyčištění.", cancel: "Zrušit", download: "Stáhnout vyčištěný soubor", stripSdh: "Odstranit SDH značky jako [hudba] (povzdech)", removeDup: "Odstranit po sobě jdoucí duplicitní řádky", shouting: "Převést VELKÁ PÍSMENA na větný formát", collapseWs: "Sloučit více mezer", trim: "Oříznout mezery kolem každého řádku" },
  editor: { openAnother: "Otevřít jiný", export: "Exportovat", delete: "Smazat", openFile: "Otevřít soubor", cues: "{n} řádků" },
  srtToText: { merged: "Rozvržení: sloučené odstavce", perCue: "Rozvržení: jeden řádek na titulek" },
  auth: { loginTitle: "Vítejte zpět", loginLead: "Přihlaste se ke svému účtu Konvertools.", registerTitle: "Vytvořte si účet", registerLead: "5 bezplatných použití denně. Bez karty.", email: "E-mail", password: "Heslo", loginCta: "Přihlásit se", registerCta: "Vytvořit účet", loading: "Čekejte prosím…", orWithEmail: "nebo e-mailem", google: "Pokračovat s Google", checkInbox: "Zkontrolujte schránku pro potvrzení e-mailu.", noAccount: "Nemáte účet?", createOne: "Vytvořte si ho", hasAccount: "Už máte účet?", logIn: "Přihlásit se" },
};

// Partial<>: missing locales fall back to English via getChrome().
export const CHROME_STRINGS: Partial<Record<Locale, ChromeStrings>> = {
  en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi, tr, id, vi, sv, pl, uk, cs,
};

export function getChrome(locale: Locale): ChromeStrings {
  return CHROME_STRINGS[locale] ?? en;
}

/** Simple {placeholder} interpolation. */
export function t(template: string, params: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
}
