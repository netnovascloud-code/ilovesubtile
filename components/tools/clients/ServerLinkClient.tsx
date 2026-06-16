"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, Copy, Check, ShieldCheck, LogIn, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callTool } from "@/lib/tool-api";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";

type Kind = "short" | "deep" | "magic";

type CreateResult = { code: string; url: string; kind: Kind; expires_at: string | null; max_clicks: number | null };

const T: Record<string, Record<string, string>> = {
  en: {
    short_title: "Shorten a link",
    short_blurb: "Turn a long URL into a tidy konvertools.com/s/… link. Every destination is screened with Google Safe Browsing before it's created.",
    short_cta: "Create short link",
    deep_title: "Create a smart / deep link",
    deep_blurb: "One link that opens your iOS or Android app when installed, and falls back to a web page everywhere else.",
    deep_cta: "Create smart link",
    magic_title: "Create a magic link",
    magic_blurb: "A single-use or time-limited link — perfect for confirmations, one-off downloads or invitations. It stops working once it expires or hits its click limit.",
    magic_cta: "Create magic link",
    login_title: "Sign in to create links",
    login_blurb: "Links are tied to your account so you can manage and revoke them, and so we can screen every destination for phishing. It's free.",
    sign_in: "Sign in",
    create_account: "Create a free account",
    field_destination_url: "Destination URL",
    field_web_fallback: "Web fallback URL",
    field_ios: "iOS app URL (optional)",
    field_ios_hint: "e.g. myapp:// or an App Store link",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android app URL (optional)",
    field_android_hint: "e.g. intent:// or a Play Store link",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Expires after (days)",
    field_expires_hint: "Leave blank for no time limit",
    field_max_clicks: "Max clicks",
    field_max_clicks_hint: "Defaults to 1 (single-use) if both are blank",
    field_alias: "Custom alias (optional)",
    field_alias_hint: "Letters, numbers, - and _ — 3 to 32 chars",
    antiphishing: "Anti-phishing screened",
    creating: "Creating…",
    error_enter_url: "Enter the destination URL.",
    error_sign_in: "Please sign in to create links.",
    error_generic: "Could not create the link. Please try again.",
    error_network: "Network error. Please try again.",
    result_ready: "Your link is ready",
    result_copied: "Copied",
    result_copy: "Copy",
    result_open: "Open",
    result_magic_prefix: "One-time / limited link",
    result_magic_expires: ", expires ",
    result_magic_clicks_max: " click max",
    result_magic_clicks_max_plural: " clicks max",
    result_deep_info: "Opens your app when installed, web fallback otherwise.",
    result_short_info: "Manage your links from your dashboard.",
  },
  fr: {
    short_title: "Raccourcir un lien",
    short_blurb: "Transformez une longue URL en un lien konvertools.com/s/… bien rangé. Chaque destination est vérifiée avec Google Safe Browsing avant d'être créée.",
    short_cta: "Créer un lien court",
    deep_title: "Créer un lien intelligent / deep link",
    deep_blurb: "Un seul lien qui ouvre votre application iOS ou Android si elle est installée, et redirige vers une page web dans tous les autres cas.",
    deep_cta: "Créer un lien intelligent",
    magic_title: "Créer un lien magique",
    magic_blurb: "Un lien à usage unique ou limité dans le temps — idéal pour les confirmations, téléchargements uniques ou invitations. Il cesse de fonctionner une fois expiré ou après avoir atteint sa limite de clics.",
    magic_cta: "Créer un lien magique",
    login_title: "Connectez-vous pour créer des liens",
    login_blurb: "Les liens sont liés à votre compte pour que vous puissiez les gérer et les révoquer, et pour que nous puissions vérifier chaque destination contre le phishing. C'est gratuit.",
    sign_in: "Se connecter",
    create_account: "Créer un compte gratuit",
    field_destination_url: "URL de destination",
    field_web_fallback: "URL de repli web",
    field_ios: "URL de l'application iOS (facultatif)",
    field_ios_hint: "ex. myapp:// ou un lien vers l'App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL de l'application Android (facultatif)",
    field_android_hint: "ex. intent:// ou un lien vers le Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Expire après (jours)",
    field_expires_hint: "Laisser vide pour aucune limite de temps",
    field_max_clicks: "Nombre max de clics",
    field_max_clicks_hint: "Par défaut 1 (usage unique) si les deux sont vides",
    field_alias: "Alias personnalisé (facultatif)",
    field_alias_hint: "Lettres, chiffres, - et _ — 3 à 32 caractères",
    antiphishing: "Vérifié anti-hameçonnage",
    creating: "Création…",
    error_enter_url: "Entrez l'URL de destination.",
    error_sign_in: "Veuillez vous connecter pour créer des liens.",
    error_generic: "Impossible de créer le lien. Veuillez réessayer.",
    error_network: "Erreur réseau. Veuillez réessayer.",
    result_ready: "Votre lien est prêt",
    result_copied: "Copié",
    result_copy: "Copier",
    result_open: "Ouvrir",
    result_magic_prefix: "Lien à usage unique / limité",
    result_magic_expires: ", expire le ",
    result_magic_clicks_max: " clic max",
    result_magic_clicks_max_plural: " clics max",
    result_deep_info: "Ouvre votre application si installée, sinon repli web.",
    result_short_info: "Gérez vos liens depuis votre tableau de bord.",
  },
  es: {
    short_title: "Acortar un enlace",
    short_blurb: "Convierte una URL larga en un enlace ordenado konvertools.com/s/…. Cada destino es verificado con Google Safe Browsing antes de crearse.",
    short_cta: "Crear enlace corto",
    deep_title: "Crear un enlace inteligente / deep link",
    deep_blurb: "Un solo enlace que abre tu app iOS o Android si está instalada, y redirige a una página web en cualquier otro caso.",
    deep_cta: "Crear enlace inteligente",
    magic_title: "Crear un enlace mágico",
    magic_blurb: "Un enlace de un solo uso o con límite de tiempo — perfecto para confirmaciones, descargas únicas o invitaciones. Deja de funcionar cuando expira o alcanza su límite de clics.",
    magic_cta: "Crear enlace mágico",
    login_title: "Inicia sesión para crear enlaces",
    login_blurb: "Los enlaces están vinculados a tu cuenta para que puedas gestionarlos y revocarlos, y para que podamos verificar cada destino contra el phishing. Es gratis.",
    sign_in: "Iniciar sesión",
    create_account: "Crear una cuenta gratuita",
    field_destination_url: "URL de destino",
    field_web_fallback: "URL de respaldo web",
    field_ios: "URL de la app iOS (opcional)",
    field_ios_hint: "ej. myapp:// o un enlace de la App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL de la app Android (opcional)",
    field_android_hint: "ej. intent:// o un enlace de la Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Expira después de (días)",
    field_expires_hint: "Dejar en blanco para sin límite de tiempo",
    field_max_clicks: "Máximo de clics",
    field_max_clicks_hint: "Por defecto 1 (uso único) si ambos están vacíos",
    field_alias: "Alias personalizado (opcional)",
    field_alias_hint: "Letras, números, - y _ — 3 a 32 caracteres",
    antiphishing: "Verificado anti-phishing",
    creating: "Creando…",
    error_enter_url: "Ingresa la URL de destino.",
    error_sign_in: "Por favor inicia sesión para crear enlaces.",
    error_generic: "No se pudo crear el enlace. Inténtalo de nuevo.",
    error_network: "Error de red. Inténtalo de nuevo.",
    result_ready: "Tu enlace está listo",
    result_copied: "Copiado",
    result_copy: "Copiar",
    result_open: "Abrir",
    result_magic_prefix: "Enlace de uso único / limitado",
    result_magic_expires: ", expira el ",
    result_magic_clicks_max: " clic máx.",
    result_magic_clicks_max_plural: " clics máx.",
    result_deep_info: "Abre tu app si está instalada, respaldo web en caso contrario.",
    result_short_info: "Gestiona tus enlaces desde tu panel de control.",
  },
  pt: {
    short_title: "Encurtar um link",
    short_blurb: "Transforme uma URL longa em um link organizado konvertools.com/s/…. Cada destino é verificado com o Google Safe Browsing antes de ser criado.",
    short_cta: "Criar link curto",
    deep_title: "Criar um link inteligente / deep link",
    deep_blurb: "Um único link que abre seu app iOS ou Android quando instalado, e redireciona para uma página web em todos os outros casos.",
    deep_cta: "Criar link inteligente",
    magic_title: "Criar um link mágico",
    magic_blurb: "Um link de uso único ou com limite de tempo — perfeito para confirmações, downloads únicos ou convites. Ele para de funcionar quando expira ou atinge seu limite de cliques.",
    magic_cta: "Criar link mágico",
    login_title: "Entre para criar links",
    login_blurb: "Os links estão vinculados à sua conta para que você possa gerenciá-los e revogá-los, e para que possamos verificar cada destino contra phishing. É gratuito.",
    sign_in: "Entrar",
    create_account: "Criar uma conta gratuita",
    field_destination_url: "URL de destino",
    field_web_fallback: "URL de fallback web",
    field_ios: "URL do app iOS (opcional)",
    field_ios_hint: "ex. myapp:// ou um link da App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL do app Android (opcional)",
    field_android_hint: "ex. intent:// ou um link da Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Expira após (dias)",
    field_expires_hint: "Deixe em branco para sem limite de tempo",
    field_max_clicks: "Máx. de cliques",
    field_max_clicks_hint: "Padrão 1 (uso único) se ambos estiverem em branco",
    field_alias: "Alias personalizado (opcional)",
    field_alias_hint: "Letras, números, - e _ — 3 a 32 caracteres",
    antiphishing: "Verificado anti-phishing",
    creating: "Criando…",
    error_enter_url: "Insira a URL de destino.",
    error_sign_in: "Por favor, entre para criar links.",
    error_generic: "Não foi possível criar o link. Tente novamente.",
    error_network: "Erro de rede. Tente novamente.",
    result_ready: "Seu link está pronto",
    result_copied: "Copiado",
    result_copy: "Copiar",
    result_open: "Abrir",
    result_magic_prefix: "Link de uso único / limitado",
    result_magic_expires: ", expira em ",
    result_magic_clicks_max: " clique máx.",
    result_magic_clicks_max_plural: " cliques máx.",
    result_deep_info: "Abre seu app quando instalado, fallback web caso contrário.",
    result_short_info: "Gerencie seus links no seu painel.",
  },
  de: {
    short_title: "Einen Link kürzen",
    short_blurb: "Wandle eine lange URL in einen übersichtlichen konvertools.com/s/…-Link um. Jedes Ziel wird vor der Erstellung mit Google Safe Browsing überprüft.",
    short_cta: "Kurzlink erstellen",
    deep_title: "Einen Smart-Link / Deep-Link erstellen",
    deep_blurb: "Ein einziger Link, der deine iOS- oder Android-App öffnet, wenn sie installiert ist, und andernfalls auf eine Webseite weiterleitet.",
    deep_cta: "Smart-Link erstellen",
    magic_title: "Einen Magic-Link erstellen",
    magic_blurb: "Ein einmaliger oder zeitlich begrenzter Link — ideal für Bestätigungen, einmalige Downloads oder Einladungen. Er hört auf zu funktionieren, wenn er abläuft oder sein Klicklimit erreicht.",
    magic_cta: "Magic-Link erstellen",
    login_title: "Anmelden, um Links zu erstellen",
    login_blurb: "Links sind mit deinem Konto verknüpft, damit du sie verwalten und widerrufen kannst und damit wir jedes Ziel auf Phishing prüfen können. Es ist kostenlos.",
    sign_in: "Anmelden",
    create_account: "Kostenloses Konto erstellen",
    field_destination_url: "Ziel-URL",
    field_web_fallback: "Web-Fallback-URL",
    field_ios: "iOS-App-URL (optional)",
    field_ios_hint: "z.B. myapp:// oder ein App-Store-Link",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android-App-URL (optional)",
    field_android_hint: "z.B. intent:// oder ein Play-Store-Link",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Läuft ab nach (Tagen)",
    field_expires_hint: "Leer lassen für kein Zeitlimit",
    field_max_clicks: "Max. Klicks",
    field_max_clicks_hint: "Standard 1 (einmalig), wenn beide leer sind",
    field_alias: "Benutzerdefinierter Alias (optional)",
    field_alias_hint: "Buchstaben, Zahlen, - und _ — 3 bis 32 Zeichen",
    antiphishing: "Anti-Phishing-geprüft",
    creating: "Wird erstellt…",
    error_enter_url: "Gib die Ziel-URL ein.",
    error_sign_in: "Bitte melde dich an, um Links zu erstellen.",
    error_generic: "Link konnte nicht erstellt werden. Bitte versuche es erneut.",
    error_network: "Netzwerkfehler. Bitte versuche es erneut.",
    result_ready: "Dein Link ist fertig",
    result_copied: "Kopiert",
    result_copy: "Kopieren",
    result_open: "Öffnen",
    result_magic_prefix: "Einmaliger / begrenzter Link",
    result_magic_expires: ", läuft ab am ",
    result_magic_clicks_max: " Klick max.",
    result_magic_clicks_max_plural: " Klicks max.",
    result_deep_info: "Öffnet deine App wenn installiert, sonst Web-Fallback.",
    result_short_info: "Verwalte deine Links in deinem Dashboard.",
  },
  it: {
    short_title: "Accorciare un link",
    short_blurb: "Trasforma un URL lungo in un link ordinato konvertools.com/s/…. Ogni destinazione viene verificata con Google Safe Browsing prima di essere creata.",
    short_cta: "Crea link breve",
    deep_title: "Crea un link intelligente / deep link",
    deep_blurb: "Un unico link che apre la tua app iOS o Android quando è installata, e reindirizza a una pagina web in tutti gli altri casi.",
    deep_cta: "Crea link intelligente",
    magic_title: "Crea un link magico",
    magic_blurb: "Un link monouso o a tempo limitato — perfetto per conferme, download singoli o inviti. Smette di funzionare quando scade o raggiunge il limite di clic.",
    magic_cta: "Crea link magico",
    login_title: "Accedi per creare link",
    login_blurb: "I link sono collegati al tuo account in modo che tu possa gestirli e revocarli, e in modo che possiamo verificare ogni destinazione per il phishing. È gratuito.",
    sign_in: "Accedi",
    create_account: "Crea un account gratuito",
    field_destination_url: "URL di destinazione",
    field_web_fallback: "URL di fallback web",
    field_ios: "URL app iOS (opzionale)",
    field_ios_hint: "es. myapp:// o un link dell'App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL app Android (opzionale)",
    field_android_hint: "es. intent:// o un link del Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Scade dopo (giorni)",
    field_expires_hint: "Lascia vuoto per nessun limite di tempo",
    field_max_clicks: "Clic massimi",
    field_max_clicks_hint: "Predefinito 1 (monouso) se entrambi sono vuoti",
    field_alias: "Alias personalizzato (opzionale)",
    field_alias_hint: "Lettere, numeri, - e _ — da 3 a 32 caratteri",
    antiphishing: "Verificato anti-phishing",
    creating: "Creazione in corso…",
    error_enter_url: "Inserisci l'URL di destinazione.",
    error_sign_in: "Effettua l'accesso per creare link.",
    error_generic: "Impossibile creare il link. Riprova.",
    error_network: "Errore di rete. Riprova.",
    result_ready: "Il tuo link è pronto",
    result_copied: "Copiato",
    result_copy: "Copia",
    result_open: "Apri",
    result_magic_prefix: "Link monouso / limitato",
    result_magic_expires: ", scade il ",
    result_magic_clicks_max: " clic max",
    result_magic_clicks_max_plural: " clic max",
    result_deep_info: "Apre la tua app se installata, altrimenti fallback web.",
    result_short_info: "Gestisci i tuoi link dalla tua dashboard.",
  },
  nl: {
    short_title: "Een link verkorten",
    short_blurb: "Zet een lange URL om in een nette konvertools.com/s/…-link. Elke bestemming wordt gecontroleerd met Google Safe Browsing voordat deze wordt aangemaakt.",
    short_cta: "Korte link aanmaken",
    deep_title: "Een slimme link / deep link aanmaken",
    deep_blurb: "Eén link die je iOS- of Android-app opent als deze is geïnstalleerd, en anders terugvalt op een webpagina.",
    deep_cta: "Slimme link aanmaken",
    magic_title: "Een magische link aanmaken",
    magic_blurb: "Een eenmalige of tijdgebonden link — perfect voor bevestigingen, eenmalige downloads of uitnodigingen. Hij stopt met werken zodra hij verloopt of zijn klieklimiet bereikt.",
    magic_cta: "Magische link aanmaken",
    login_title: "Log in om links aan te maken",
    login_blurb: "Links zijn gekoppeld aan je account zodat je ze kunt beheren en intrekken, en zodat we elke bestemming kunnen controleren op phishing. Het is gratis.",
    sign_in: "Inloggen",
    create_account: "Gratis account aanmaken",
    field_destination_url: "Doel-URL",
    field_web_fallback: "Web-fallback-URL",
    field_ios: "iOS-app-URL (optioneel)",
    field_ios_hint: "bijv. myapp:// of een App Store-link",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android-app-URL (optioneel)",
    field_android_hint: "bijv. intent:// of een Play Store-link",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Verloopt na (dagen)",
    field_expires_hint: "Leeg laten voor geen tijdslimiet",
    field_max_clicks: "Max. klikken",
    field_max_clicks_hint: "Standaard 1 (eenmalig) als beide leeg zijn",
    field_alias: "Aangepaste alias (optioneel)",
    field_alias_hint: "Letters, cijfers, - en _ — 3 tot 32 tekens",
    antiphishing: "Anti-phishing gecontroleerd",
    creating: "Aanmaken…",
    error_enter_url: "Voer de doel-URL in.",
    error_sign_in: "Log in om links aan te maken.",
    error_generic: "Link kon niet worden aangemaakt. Probeer het opnieuw.",
    error_network: "Netwerkfout. Probeer het opnieuw.",
    result_ready: "Je link is klaar",
    result_copied: "Gekopieerd",
    result_copy: "Kopiëren",
    result_open: "Openen",
    result_magic_prefix: "Eenmalige / beperkte link",
    result_magic_expires: ", verloopt op ",
    result_magic_clicks_max: " klik max.",
    result_magic_clicks_max_plural: " klikken max.",
    result_deep_info: "Opent je app als geïnstalleerd, anders web-fallback.",
    result_short_info: "Beheer je links vanuit je dashboard.",
  },
  ja: {
    short_title: "リンクを短縮する",
    short_blurb: "長いURLをすっきりしたkonvertools.com/s/…リンクに変換します。作成前にすべてのリンク先はGoogle Safe Browsingで審査されます。",
    short_cta: "短縮リンクを作成",
    deep_title: "スマートリンク／ディープリンクを作成",
    deep_blurb: "インストール済みのiOSまたはAndroidアプリを開き、それ以外の場合はウェブページにフォールバックする1つのリンクです。",
    deep_cta: "スマートリンクを作成",
    magic_title: "マジックリンクを作成",
    magic_blurb: "1回限りまたは期間限定のリンク — 確認、単発ダウンロード、招待に最適です。有効期限が切れるか、クリック上限に達すると機能しなくなります。",
    magic_cta: "マジックリンクを作成",
    login_title: "ログインしてリンクを作成",
    login_blurb: "リンクはアカウントに紐付けられており、管理・取り消しができます。また、すべてのリンク先のフィッシング審査も行われます。無料です。",
    sign_in: "ログイン",
    create_account: "無料アカウントを作成",
    field_destination_url: "リンク先URL",
    field_web_fallback: "ウェブフォールバックURL",
    field_ios: "iOSアプリURL（任意）",
    field_ios_hint: "例：myapp:// またはApp Storeのリンク",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "AndroidアプリURL（任意）",
    field_android_hint: "例：intent:// またはPlay Storeのリンク",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "有効期限（日数）",
    field_expires_hint: "空白にすると期限なし",
    field_max_clicks: "最大クリック数",
    field_max_clicks_hint: "両方空白の場合は1（1回限り）がデフォルト",
    field_alias: "カスタムエイリアス（任意）",
    field_alias_hint: "英数字、-、_ — 3〜32文字",
    antiphishing: "フィッシング対策審査済み",
    creating: "作成中…",
    error_enter_url: "リンク先URLを入力してください。",
    error_sign_in: "リンクを作成するにはログインしてください。",
    error_generic: "リンクを作成できませんでした。もう一度お試しください。",
    error_network: "ネットワークエラーです。もう一度お試しください。",
    result_ready: "リンクが準備できました",
    result_copied: "コピー済み",
    result_copy: "コピー",
    result_open: "開く",
    result_magic_prefix: "1回限り / 限定リンク",
    result_magic_expires: "、有効期限：",
    result_magic_clicks_max: " クリック上限",
    result_magic_clicks_max_plural: " クリック上限",
    result_deep_info: "インストール済みの場合はアプリを開き、それ以外はウェブにフォールバックします。",
    result_short_info: "ダッシュボードからリンクを管理してください。",
  },
  zh: {
    short_title: "缩短链接",
    short_blurb: "将长网址转换为整洁的 konvertools.com/s/… 链接。每个目标地址在创建前都会经过 Google 安全浏览审核。",
    short_cta: "创建短链接",
    deep_title: "创建智能链接 / 深层链接",
    deep_blurb: "一个链接，安装了 iOS 或 Android 应用时将直接打开应用，否则跳转到网页。",
    deep_cta: "创建智能链接",
    magic_title: "创建魔法链接",
    magic_blurb: "一次性或限时链接 — 非常适合确认、一次性下载或邀请。到期或达到点击上限后将停止工作。",
    magic_cta: "创建魔法链接",
    login_title: "登录以创建链接",
    login_blurb: "链接与您的账户绑定，便于您管理和撤销，我们还会对每个目标地址进行钓鱼检测。完全免费。",
    sign_in: "登录",
    create_account: "创建免费账户",
    field_destination_url: "目标网址",
    field_web_fallback: "网页回退网址",
    field_ios: "iOS 应用链接（可选）",
    field_ios_hint: "例如：myapp:// 或 App Store 链接",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android 应用链接（可选）",
    field_android_hint: "例如：intent:// 或 Play Store 链接",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "过期时间（天）",
    field_expires_hint: "留空表示不限时",
    field_max_clicks: "最大点击次数",
    field_max_clicks_hint: "两者为空时默认为 1（一次性使用）",
    field_alias: "自定义别名（可选）",
    field_alias_hint: "字母、数字、- 和 _ — 3 到 32 个字符",
    antiphishing: "已通过反钓鱼审核",
    creating: "创建中…",
    error_enter_url: "请输入目标网址。",
    error_sign_in: "请登录以创建链接。",
    error_generic: "无法创建链接，请重试。",
    error_network: "网络错误，请重试。",
    result_ready: "您的链接已就绪",
    result_copied: "已复制",
    result_copy: "复制",
    result_open: "打开",
    result_magic_prefix: "一次性 / 限制链接",
    result_magic_expires: "，到期：",
    result_magic_clicks_max: " 次点击上限",
    result_magic_clicks_max_plural: " 次点击上限",
    result_deep_info: "已安装时打开应用，否则回退到网页。",
    result_short_info: "从您的控制台管理链接。",
  },
  ko: {
    short_title: "링크 단축",
    short_blurb: "긴 URL을 깔끔한 konvertools.com/s/… 링크로 변환합니다. 생성 전에 모든 목적지는 Google 세이프 브라우징으로 검사됩니다.",
    short_cta: "단축 링크 만들기",
    deep_title: "스마트 링크 / 딥 링크 만들기",
    deep_blurb: "iOS 또는 Android 앱이 설치된 경우 앱을 열고, 그렇지 않으면 웹 페이지로 연결되는 링크입니다.",
    deep_cta: "스마트 링크 만들기",
    magic_title: "매직 링크 만들기",
    magic_blurb: "일회용 또는 시간 제한 링크 — 확인, 일회성 다운로드 또는 초대에 완벽합니다. 만료되거나 클릭 제한에 도달하면 작동을 멈춥니다.",
    magic_cta: "매직 링크 만들기",
    login_title: "로그인하여 링크 만들기",
    login_blurb: "링크는 계정에 연결되어 관리 및 취소가 가능하며, 모든 목적지에 대한 피싱 검사도 수행됩니다. 무료입니다.",
    sign_in: "로그인",
    create_account: "무료 계정 만들기",
    field_destination_url: "목적지 URL",
    field_web_fallback: "웹 폴백 URL",
    field_ios: "iOS 앱 URL (선택사항)",
    field_ios_hint: "예: myapp:// 또는 App Store 링크",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android 앱 URL (선택사항)",
    field_android_hint: "예: intent:// 또는 Play Store 링크",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "만료 기간 (일)",
    field_expires_hint: "시간 제한 없음은 비워 두세요",
    field_max_clicks: "최대 클릭 수",
    field_max_clicks_hint: "둘 다 비어 있으면 기본값 1 (일회용)",
    field_alias: "사용자 지정 별칭 (선택사항)",
    field_alias_hint: "영문자, 숫자, - 및 _ — 3~32자",
    antiphishing: "피싱 방지 검사 완료",
    creating: "생성 중…",
    error_enter_url: "목적지 URL을 입력하세요.",
    error_sign_in: "링크를 만들려면 로그인하세요.",
    error_generic: "링크를 만들 수 없습니다. 다시 시도해 주세요.",
    error_network: "네트워크 오류입니다. 다시 시도해 주세요.",
    result_ready: "링크가 준비되었습니다",
    result_copied: "복사됨",
    result_copy: "복사",
    result_open: "열기",
    result_magic_prefix: "일회용 / 제한 링크",
    result_magic_expires: ", 만료: ",
    result_magic_clicks_max: " 클릭 최대",
    result_magic_clicks_max_plural: " 클릭 최대",
    result_deep_info: "설치된 경우 앱을 열고, 그렇지 않으면 웹 폴백.",
    result_short_info: "대시보드에서 링크를 관리하세요.",
  },
  ar: {
    short_title: "اختصار رابط",
    short_blurb: "حوّل رابطاً طويلاً إلى رابط أنيق على konvertools.com/s/…. يتم فحص كل وجهة باستخدام التصفح الآمن من Google قبل الإنشاء.",
    short_cta: "إنشاء رابط قصير",
    deep_title: "إنشاء رابط ذكي / رابط عميق",
    deep_blurb: "رابط واحد يفتح تطبيق iOS أو Android عند تثبيته، ويرجع إلى صفحة ويب في أي مكان آخر.",
    deep_cta: "إنشاء رابط ذكي",
    magic_title: "إنشاء رابط سحري",
    magic_blurb: "رابط للاستخدام مرة واحدة أو محدود المدة — مثالي للتأكيدات والتنزيلات الفردية أو الدعوات. يتوقف عن العمل عند انتهاء صلاحيته أو بلوغ حد النقرات.",
    magic_cta: "إنشاء رابط سحري",
    login_title: "سجّل الدخول لإنشاء روابط",
    login_blurb: "الروابط مرتبطة بحسابك حتى تتمكن من إدارتها وإلغائها، ولكي نتمكن من فحص كل وجهة بحثاً عن التصيد الاحتيالي. إنه مجاني.",
    sign_in: "تسجيل الدخول",
    create_account: "إنشاء حساب مجاني",
    field_destination_url: "رابط الوجهة",
    field_web_fallback: "رابط الويب الاحتياطي",
    field_ios: "رابط تطبيق iOS (اختياري)",
    field_ios_hint: "مثال: myapp:// أو رابط App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "رابط تطبيق Android (اختياري)",
    field_android_hint: "مثال: intent:// أو رابط Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "ينتهي بعد (أيام)",
    field_expires_hint: "اتركه فارغاً لعدم وجود حد زمني",
    field_max_clicks: "الحد الأقصى للنقرات",
    field_max_clicks_hint: "القيمة الافتراضية 1 (مرة واحدة) إذا كان كلاهما فارغاً",
    field_alias: "اسم مستعار مخصص (اختياري)",
    field_alias_hint: "أحرف وأرقام و - و _ — من 3 إلى 32 حرفاً",
    antiphishing: "تمت مراجعة مكافحة التصيد",
    creating: "جارٍ الإنشاء…",
    error_enter_url: "أدخل رابط الوجهة.",
    error_sign_in: "يرجى تسجيل الدخول لإنشاء روابط.",
    error_generic: "تعذّر إنشاء الرابط. يرجى المحاولة مرة أخرى.",
    error_network: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
    result_ready: "رابطك جاهز",
    result_copied: "تم النسخ",
    result_copy: "نسخ",
    result_open: "فتح",
    result_magic_prefix: "رابط لمرة واحدة / محدود",
    result_magic_expires: "، ينتهي في ",
    result_magic_clicks_max: " نقرة كحد أقصى",
    result_magic_clicks_max_plural: " نقرات كحد أقصى",
    result_deep_info: "يفتح تطبيقك عند التثبيت، وإلا يرجع إلى الويب.",
    result_short_info: "أدر روابطك من لوحة التحكم.",
  },
  ru: {
    short_title: "Сократить ссылку",
    short_blurb: "Превратите длинный URL в аккуратную ссылку konvertools.com/s/…. Каждое назначение проверяется через Google Safe Browsing перед созданием.",
    short_cta: "Создать короткую ссылку",
    deep_title: "Создать умную / глубокую ссылку",
    deep_blurb: "Одна ссылка, которая открывает ваше приложение iOS или Android, если оно установлено, и переходит на веб-страницу во всех остальных случаях.",
    deep_cta: "Создать умную ссылку",
    magic_title: "Создать магическую ссылку",
    magic_blurb: "Одноразовая или ограниченная по времени ссылка — идеально для подтверждений, разовых загрузок или приглашений. Перестаёт работать после истечения срока или достижения лимита кликов.",
    magic_cta: "Создать магическую ссылку",
    login_title: "Войдите, чтобы создавать ссылки",
    login_blurb: "Ссылки привязаны к вашему аккаунту, чтобы вы могли управлять ими и отзывать их, а мы могли проверять каждое назначение на фишинг. Это бесплатно.",
    sign_in: "Войти",
    create_account: "Создать бесплатный аккаунт",
    field_destination_url: "URL назначения",
    field_web_fallback: "Резервный URL",
    field_ios: "URL приложения iOS (необязательно)",
    field_ios_hint: "напр. myapp:// или ссылка на App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL приложения Android (необязательно)",
    field_android_hint: "напр. intent:// или ссылка на Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Истекает через (дней)",
    field_expires_hint: "Оставьте пустым для неограниченного срока",
    field_max_clicks: "Макс. кликов",
    field_max_clicks_hint: "По умолчанию 1 (одноразовая), если оба пустые",
    field_alias: "Пользовательский псевдоним (необязательно)",
    field_alias_hint: "Буквы, цифры, - и _ — от 3 до 32 символов",
    antiphishing: "Проверено на фишинг",
    creating: "Создаётся…",
    error_enter_url: "Введите URL назначения.",
    error_sign_in: "Пожалуйста, войдите, чтобы создать ссылки.",
    error_generic: "Не удалось создать ссылку. Пожалуйста, повторите попытку.",
    error_network: "Ошибка сети. Пожалуйста, повторите попытку.",
    result_ready: "Ваша ссылка готова",
    result_copied: "Скопировано",
    result_copy: "Копировать",
    result_open: "Открыть",
    result_magic_prefix: "Одноразовая / ограниченная ссылка",
    result_magic_expires: ", истекает ",
    result_magic_clicks_max: " клик макс.",
    result_magic_clicks_max_plural: " кликов макс.",
    result_deep_info: "Открывает приложение если установлено, иначе веб-страница.",
    result_short_info: "Управляйте ссылками в панели управления.",
  },
  hi: {
    short_title: "लिंक को छोटा करें",
    short_blurb: "एक लंबे URL को एक साफ-सुथरे konvertools.com/s/… लिंक में बदलें। बनाने से पहले हर गंतव्य को Google Safe Browsing से जाँचा जाता है।",
    short_cta: "छोटा लिंक बनाएं",
    deep_title: "स्मार्ट लिंक / डीप लिंक बनाएं",
    deep_blurb: "एक ऐसा लिंक जो iOS या Android ऐप इंस्टॉल होने पर उसे खोलता है, और बाकी हर जगह वेब पेज पर ले जाता है।",
    deep_cta: "स्मार्ट लिंक बनाएं",
    magic_title: "मैजिक लिंक बनाएं",
    magic_blurb: "एक बार उपयोग या समय-सीमित लिंक — पुष्टि, एकमुश्त डाउनलोड या आमंत्रण के लिए उपयुक्त। समाप्त होने या क्लिक सीमा तक पहुँचने पर काम करना बंद हो जाता है।",
    magic_cta: "मैजिक लिंक बनाएं",
    login_title: "लिंक बनाने के लिए साइन इन करें",
    login_blurb: "लिंक आपके खाते से जुड़े हैं ताकि आप उन्हें प्रबंधित और रद्द कर सकें, और ताकि हम हर गंतव्य को फ़िशिंग के लिए जाँच सकें। यह मुफ़्त है।",
    sign_in: "साइन इन करें",
    create_account: "मुफ़्त खाता बनाएं",
    field_destination_url: "गंतव्य URL",
    field_web_fallback: "वेब फ़ॉलबैक URL",
    field_ios: "iOS ऐप URL (वैकल्पिक)",
    field_ios_hint: "उदा. myapp:// या App Store लिंक",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android ऐप URL (वैकल्पिक)",
    field_android_hint: "उदा. intent:// या Play Store लिंक",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "बाद में समाप्त होता है (दिन)",
    field_expires_hint: "समय सीमा नहीं के लिए खाली छोड़ें",
    field_max_clicks: "अधिकतम क्लिक",
    field_max_clicks_hint: "यदि दोनों खाली हों तो डिफ़ॉल्ट 1 (एकल-उपयोग)",
    field_alias: "कस्टम उपनाम (वैकल्पिक)",
    field_alias_hint: "अक्षर, संख्याएं, - और _ — 3 से 32 वर्ण",
    antiphishing: "एंटी-फ़िशिंग जाँच की गई",
    creating: "बनाया जा रहा है…",
    error_enter_url: "गंतव्य URL दर्ज करें।",
    error_sign_in: "लिंक बनाने के लिए कृपया साइन इन करें।",
    error_generic: "लिंक नहीं बन सका। कृपया पुनः प्रयास करें।",
    error_network: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।",
    result_ready: "आपका लिंक तैयार है",
    result_copied: "कॉपी हो गया",
    result_copy: "कॉपी करें",
    result_open: "खोलें",
    result_magic_prefix: "एकल-उपयोग / सीमित लिंक",
    result_magic_expires: ", समाप्ति: ",
    result_magic_clicks_max: " क्लिक अधिकतम",
    result_magic_clicks_max_plural: " क्लिक अधिकतम",
    result_deep_info: "इंस्टॉल होने पर ऐप खोलता है, अन्यथा वेब फ़ॉलबैक।",
    result_short_info: "अपने डैशबोर्ड से लिंक प्रबंधित करें।",
  },
  tr: {
    short_title: "Bir bağlantıyı kısalt",
    short_blurb: "Uzun bir URL'yi düzenli bir konvertools.com/s/… bağlantısına dönüştürün. Her hedef, oluşturulmadan önce Google Safe Browsing ile taranır.",
    short_cta: "Kısa bağlantı oluştur",
    deep_title: "Akıllı bağlantı / derin bağlantı oluştur",
    deep_blurb: "iOS veya Android uygulamanız yüklüyse uygulamayı açan, aksi takdirde web sayfasına yönlendiren tek bir bağlantı.",
    deep_cta: "Akıllı bağlantı oluştur",
    magic_title: "Sihirli bağlantı oluştur",
    magic_blurb: "Tek kullanımlık veya süresi sınırlı bir bağlantı — onaylar, tek seferlik indirmeler veya davetler için mükemmel. Süresi dolduğunda veya tıklama sınırına ulaştığında çalışmayı durdurur.",
    magic_cta: "Sihirli bağlantı oluştur",
    login_title: "Bağlantı oluşturmak için giriş yapın",
    login_blurb: "Bağlantılar hesabınıza bağlıdır, böylece onları yönetebilir ve iptal edebilirsiniz; ayrıca her hedefi kimlik avına karşı tarayabiliriz. Ücretsizdir.",
    sign_in: "Giriş yap",
    create_account: "Ücretsiz hesap oluştur",
    field_destination_url: "Hedef URL",
    field_web_fallback: "Web yedek URL",
    field_ios: "iOS uygulama URL'si (isteğe bağlı)",
    field_ios_hint: "ör. myapp:// veya App Store bağlantısı",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android uygulama URL'si (isteğe bağlı)",
    field_android_hint: "ör. intent:// veya Play Store bağlantısı",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Süre sonu (gün)",
    field_expires_hint: "Zaman sınırı olmadan boş bırakın",
    field_max_clicks: "Maks. tıklama",
    field_max_clicks_hint: "İkisi de boşsa varsayılan 1 (tek kullanım)",
    field_alias: "Özel takma ad (isteğe bağlı)",
    field_alias_hint: "Harfler, rakamlar, - ve _ — 3 ile 32 karakter",
    antiphishing: "Kimlik avı taraması yapıldı",
    creating: "Oluşturuluyor…",
    error_enter_url: "Hedef URL'yi girin.",
    error_sign_in: "Bağlantı oluşturmak için lütfen giriş yapın.",
    error_generic: "Bağlantı oluşturulamadı. Lütfen tekrar deneyin.",
    error_network: "Ağ hatası. Lütfen tekrar deneyin.",
    result_ready: "Bağlantınız hazır",
    result_copied: "Kopyalandı",
    result_copy: "Kopyala",
    result_open: "Aç",
    result_magic_prefix: "Tek kullanımlık / sınırlı bağlantı",
    result_magic_expires: ", sona erme tarihi: ",
    result_magic_clicks_max: " tıklama maks.",
    result_magic_clicks_max_plural: " tıklama maks.",
    result_deep_info: "Yüklüyse uygulamanızı açar, aksi takdirde web yedeği.",
    result_short_info: "Bağlantılarınızı panonuzdan yönetin.",
  },
  id: {
    short_title: "Persingkat tautan",
    short_blurb: "Ubah URL panjang menjadi tautan konvertools.com/s/… yang rapi. Setiap tujuan diperiksa dengan Google Safe Browsing sebelum dibuat.",
    short_cta: "Buat tautan pendek",
    deep_title: "Buat tautan cerdas / deep link",
    deep_blurb: "Satu tautan yang membuka aplikasi iOS atau Android Anda saat terpasang, dan mengarahkan ke halaman web di tempat lain.",
    deep_cta: "Buat tautan cerdas",
    magic_title: "Buat tautan ajaib",
    magic_blurb: "Tautan sekali pakai atau terbatas waktu — sempurna untuk konfirmasi, unduhan satu kali, atau undangan. Berhenti berfungsi saat kedaluwarsa atau mencapai batas klik.",
    magic_cta: "Buat tautan ajaib",
    login_title: "Masuk untuk membuat tautan",
    login_blurb: "Tautan terhubung ke akun Anda sehingga Anda dapat mengelola dan mencabutnya, dan agar kami dapat memeriksa setiap tujuan terhadap phishing. Gratis.",
    sign_in: "Masuk",
    create_account: "Buat akun gratis",
    field_destination_url: "URL tujuan",
    field_web_fallback: "URL fallback web",
    field_ios: "URL aplikasi iOS (opsional)",
    field_ios_hint: "mis. myapp:// atau tautan App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL aplikasi Android (opsional)",
    field_android_hint: "mis. intent:// atau tautan Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Kedaluwarsa setelah (hari)",
    field_expires_hint: "Biarkan kosong untuk tanpa batas waktu",
    field_max_clicks: "Maks. klik",
    field_max_clicks_hint: "Default 1 (sekali pakai) jika keduanya kosong",
    field_alias: "Alias kustom (opsional)",
    field_alias_hint: "Huruf, angka, - dan _ — 3 hingga 32 karakter",
    antiphishing: "Diperiksa anti-phishing",
    creating: "Membuat…",
    error_enter_url: "Masukkan URL tujuan.",
    error_sign_in: "Silakan masuk untuk membuat tautan.",
    error_generic: "Tidak dapat membuat tautan. Silakan coba lagi.",
    error_network: "Kesalahan jaringan. Silakan coba lagi.",
    result_ready: "Tautan Anda siap",
    result_copied: "Disalin",
    result_copy: "Salin",
    result_open: "Buka",
    result_magic_prefix: "Tautan sekali pakai / terbatas",
    result_magic_expires: ", kedaluwarsa ",
    result_magic_clicks_max: " klik maks.",
    result_magic_clicks_max_plural: " klik maks.",
    result_deep_info: "Membuka aplikasi jika terpasang, fallback web sebaliknya.",
    result_short_info: "Kelola tautan Anda dari dasbor.",
  },
  vi: {
    short_title: "Rút ngắn liên kết",
    short_blurb: "Biến URL dài thành liên kết gọn gàng konvertools.com/s/…. Mọi điểm đến đều được kiểm tra với Google Safe Browsing trước khi tạo.",
    short_cta: "Tạo liên kết ngắn",
    deep_title: "Tạo liên kết thông minh / deep link",
    deep_blurb: "Một liên kết mở ứng dụng iOS hoặc Android của bạn khi được cài đặt, và chuyển hướng đến trang web ở nơi khác.",
    deep_cta: "Tạo liên kết thông minh",
    magic_title: "Tạo liên kết ma thuật",
    magic_blurb: "Liên kết dùng một lần hoặc có giới hạn thời gian — hoàn hảo cho xác nhận, tải xuống một lần hoặc lời mời. Ngừng hoạt động khi hết hạn hoặc đạt giới hạn lượt nhấp.",
    magic_cta: "Tạo liên kết ma thuật",
    login_title: "Đăng nhập để tạo liên kết",
    login_blurb: "Liên kết được gắn với tài khoản của bạn để bạn có thể quản lý và thu hồi chúng, và để chúng tôi có thể kiểm tra mọi điểm đến về lừa đảo. Miễn phí.",
    sign_in: "Đăng nhập",
    create_account: "Tạo tài khoản miễn phí",
    field_destination_url: "URL đích",
    field_web_fallback: "URL dự phòng web",
    field_ios: "URL ứng dụng iOS (tùy chọn)",
    field_ios_hint: "vd. myapp:// hoặc liên kết App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL ứng dụng Android (tùy chọn)",
    field_android_hint: "vd. intent:// hoặc liên kết Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Hết hạn sau (ngày)",
    field_expires_hint: "Để trống nếu không giới hạn thời gian",
    field_max_clicks: "Số lần nhấp tối đa",
    field_max_clicks_hint: "Mặc định 1 (dùng một lần) nếu cả hai trống",
    field_alias: "Bí danh tùy chỉnh (tùy chọn)",
    field_alias_hint: "Chữ cái, số, - và _ — 3 đến 32 ký tự",
    antiphishing: "Đã kiểm tra chống lừa đảo",
    creating: "Đang tạo…",
    error_enter_url: "Nhập URL đích.",
    error_sign_in: "Vui lòng đăng nhập để tạo liên kết.",
    error_generic: "Không thể tạo liên kết. Vui lòng thử lại.",
    error_network: "Lỗi mạng. Vui lòng thử lại.",
    result_ready: "Liên kết của bạn đã sẵn sàng",
    result_copied: "Đã sao chép",
    result_copy: "Sao chép",
    result_open: "Mở",
    result_magic_prefix: "Liên kết dùng một lần / giới hạn",
    result_magic_expires: ", hết hạn ",
    result_magic_clicks_max: " lần nhấp tối đa",
    result_magic_clicks_max_plural: " lần nhấp tối đa",
    result_deep_info: "Mở ứng dụng khi được cài đặt, dự phòng web nếu không.",
    result_short_info: "Quản lý liên kết từ bảng điều khiển của bạn.",
  },
  sv: {
    short_title: "Förkorta en länk",
    short_blurb: "Förvandla en lång URL till en snygg konvertools.com/s/…-länk. Varje destination kontrolleras med Google Safe Browsing innan den skapas.",
    short_cta: "Skapa kort länk",
    deep_title: "Skapa en smart länk / djuplänk",
    deep_blurb: "En länk som öppnar din iOS- eller Android-app när den är installerad, och faller tillbaka till en webbsida annars.",
    deep_cta: "Skapa smart länk",
    magic_title: "Skapa en magisk länk",
    magic_blurb: "En engångslänk eller tidsbegränsad länk — perfekt för bekräftelser, engångsnedladdningar eller inbjudningar. Slutar fungera när den löper ut eller når klickgränsen.",
    magic_cta: "Skapa magisk länk",
    login_title: "Logga in för att skapa länkar",
    login_blurb: "Länkarna är kopplade till ditt konto så att du kan hantera och återkalla dem, och så att vi kan granska varje destination mot nätfiske. Det är gratis.",
    sign_in: "Logga in",
    create_account: "Skapa ett gratis konto",
    field_destination_url: "Destinations-URL",
    field_web_fallback: "Webb-fallback-URL",
    field_ios: "iOS-app-URL (valfritt)",
    field_ios_hint: "t.ex. myapp:// eller en App Store-länk",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "Android-app-URL (valfritt)",
    field_android_hint: "t.ex. intent:// eller en Play Store-länk",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Löper ut efter (dagar)",
    field_expires_hint: "Lämna tomt för ingen tidsgräns",
    field_max_clicks: "Max klick",
    field_max_clicks_hint: "Standard 1 (engångs) om båda är tomma",
    field_alias: "Anpassat alias (valfritt)",
    field_alias_hint: "Bokstäver, siffror, - och _ — 3 till 32 tecken",
    antiphishing: "Kontrollerad mot nätfiske",
    creating: "Skapar…",
    error_enter_url: "Ange destinations-URL.",
    error_sign_in: "Logga in för att skapa länkar.",
    error_generic: "Kunde inte skapa länken. Försök igen.",
    error_network: "Nätverksfel. Försök igen.",
    result_ready: "Din länk är klar",
    result_copied: "Kopierad",
    result_copy: "Kopiera",
    result_open: "Öppna",
    result_magic_prefix: "Engångs- / begränsad länk",
    result_magic_expires: ", löper ut ",
    result_magic_clicks_max: " klick max",
    result_magic_clicks_max_plural: " klick max",
    result_deep_info: "Öppnar appen när installerad, webb-fallback annars.",
    result_short_info: "Hantera dina länkar från din instrumentpanel.",
  },
  pl: {
    short_title: "Skróć link",
    short_blurb: "Zamień długi URL w schludny link konvertools.com/s/…. Każde miejsce docelowe jest sprawdzane przez Google Safe Browsing przed utworzeniem.",
    short_cta: "Utwórz krótki link",
    deep_title: "Utwórz inteligentny link / deep link",
    deep_blurb: "Jeden link, który otwiera Twoją aplikację iOS lub Android, gdy jest zainstalowana, i przekierowuje do strony internetowej we wszystkich innych przypadkach.",
    deep_cta: "Utwórz inteligentny link",
    magic_title: "Utwórz magiczny link",
    magic_blurb: "Link jednorazowy lub z ograniczeniem czasowym — idealny do potwierdzeń, jednorazowych pobrań lub zaproszeń. Przestaje działać po wygaśnięciu lub osiągnięciu limitu kliknięć.",
    magic_cta: "Utwórz magiczny link",
    login_title: "Zaloguj się, aby tworzyć linki",
    login_blurb: "Linki są powiązane z Twoim kontem, abyś mógł nimi zarządzać i je odwoływać, a my możemy sprawdzać każde miejsce docelowe pod kątem phishingu. To jest bezpłatne.",
    sign_in: "Zaloguj się",
    create_account: "Utwórz bezpłatne konto",
    field_destination_url: "URL docelowy",
    field_web_fallback: "Zapasowy URL strony",
    field_ios: "URL aplikacji iOS (opcjonalnie)",
    field_ios_hint: "np. myapp:// lub link do App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL aplikacji Android (opcjonalnie)",
    field_android_hint: "np. intent:// lub link do Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Wygasa po (dni)",
    field_expires_hint: "Pozostaw puste bez limitu czasu",
    field_max_clicks: "Maks. kliknięć",
    field_max_clicks_hint: "Domyślnie 1 (jednorazowe) jeśli oba są puste",
    field_alias: "Niestandardowy alias (opcjonalnie)",
    field_alias_hint: "Litery, cyfry, - i _ — 3 do 32 znaków",
    antiphishing: "Sprawdzono pod kątem phishingu",
    creating: "Tworzenie…",
    error_enter_url: "Wprowadź docelowy URL.",
    error_sign_in: "Zaloguj się, aby tworzyć linki.",
    error_generic: "Nie można utworzyć linku. Spróbuj ponownie.",
    error_network: "Błąd sieci. Spróbuj ponownie.",
    result_ready: "Twój link jest gotowy",
    result_copied: "Skopiowano",
    result_copy: "Kopiuj",
    result_open: "Otwórz",
    result_magic_prefix: "Link jednorazowy / ograniczony",
    result_magic_expires: ", wygasa ",
    result_magic_clicks_max: " kliknięcie maks.",
    result_magic_clicks_max_plural: " kliknięć maks.",
    result_deep_info: "Otwiera aplikację jeśli zainstalowana, inaczej strona zapasowa.",
    result_short_info: "Zarządzaj linkami z pulpitu nawigacyjnego.",
  },
  uk: {
    short_title: "Скоротити посилання",
    short_blurb: "Перетворіть довгий URL на акуратне посилання konvertools.com/s/…. Кожне призначення перевіряється через Google Safe Browsing перед створенням.",
    short_cta: "Створити коротке посилання",
    deep_title: "Створити розумне / глибоке посилання",
    deep_blurb: "Одне посилання, яке відкриває ваш iOS або Android-додаток, якщо він встановлений, і переходить на веб-сторінку в усіх інших випадках.",
    deep_cta: "Створити розумне посилання",
    magic_title: "Створити магічне посилання",
    magic_blurb: "Одноразове або обмежене в часі посилання — ідеально для підтверджень, разових завантажень або запрошень. Перестає працювати після закінчення терміну або досягнення ліміту кліків.",
    magic_cta: "Створити магічне посилання",
    login_title: "Увійдіть, щоб створювати посилання",
    login_blurb: "Посилання прив'язані до вашого облікового запису, щоб ви могли керувати ними та відкликати їх, а ми могли перевіряти кожне призначення на фішинг. Це безкоштовно.",
    sign_in: "Увійти",
    create_account: "Створити безкоштовний обліковий запис",
    field_destination_url: "URL призначення",
    field_web_fallback: "Резервний веб-URL",
    field_ios: "URL iOS-додатка (необов'язково)",
    field_ios_hint: "напр. myapp:// або посилання App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL Android-додатка (необов'язково)",
    field_android_hint: "напр. intent:// або посилання Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Закінчується через (днів)",
    field_expires_hint: "Залиште порожнім для необмеженого часу",
    field_max_clicks: "Макс. кліків",
    field_max_clicks_hint: "За замовчуванням 1 (одноразове), якщо обидва порожні",
    field_alias: "Власний псевдонім (необов'язково)",
    field_alias_hint: "Букви, цифри, - і _ — від 3 до 32 символів",
    antiphishing: "Перевірено на фішинг",
    creating: "Створення…",
    error_enter_url: "Введіть URL призначення.",
    error_sign_in: "Будь ласка, увійдіть, щоб створити посилання.",
    error_generic: "Не вдалося створити посилання. Будь ласка, спробуйте знову.",
    error_network: "Помилка мережі. Будь ласка, спробуйте знову.",
    result_ready: "Ваше посилання готове",
    result_copied: "Скопійовано",
    result_copy: "Копіювати",
    result_open: "Відкрити",
    result_magic_prefix: "Одноразове / обмежене посилання",
    result_magic_expires: ", закінчується ",
    result_magic_clicks_max: " клік макс.",
    result_magic_clicks_max_plural: " кліків макс.",
    result_deep_info: "Відкриває додаток якщо встановлено, інакше веб-сторінка.",
    result_short_info: "Керуйте посиланнями з панелі управління.",
  },
  cs: {
    short_title: "Zkrátit odkaz",
    short_blurb: "Přeměňte dlouhou URL na úhledný odkaz konvertools.com/s/…. Každý cíl je před vytvořením prověřen prostřednictvím Google Safe Browsing.",
    short_cta: "Vytvořit krátký odkaz",
    deep_title: "Vytvořit chytrý odkaz / hluboký odkaz",
    deep_blurb: "Jeden odkaz, který otevře vaši iOS nebo Android aplikaci, pokud je nainstalována, a jinak přesměruje na webovou stránku.",
    deep_cta: "Vytvořit chytrý odkaz",
    magic_title: "Vytvořit magický odkaz",
    magic_blurb: "Jednorázový nebo časově omezený odkaz — ideální pro potvrzení, jednorázové stahování nebo pozvánky. Přestane fungovat, když vyprší platnost nebo dosáhne limitu kliknutí.",
    magic_cta: "Vytvořit magický odkaz",
    login_title: "Přihlaste se a vytvářejte odkazy",
    login_blurb: "Odkazy jsou propojeny s vaším účtem, abyste je mohli spravovat a rušit, a abychom mohli každý cíl prověřit na phishing. Je to zdarma.",
    sign_in: "Přihlásit se",
    create_account: "Vytvořit bezplatný účet",
    field_destination_url: "Cílová URL",
    field_web_fallback: "Záložní webová URL",
    field_ios: "URL iOS aplikace (volitelné)",
    field_ios_hint: "např. myapp:// nebo odkaz na App Store",
    field_ios_placeholder: "https://apps.apple.com/…",
    field_android: "URL Android aplikace (volitelné)",
    field_android_hint: "např. intent:// nebo odkaz na Play Store",
    field_android_placeholder: "https://play.google.com/…",
    field_expires: "Vyprší za (dní)",
    field_expires_hint: "Ponechte prázdné pro neomezený čas",
    field_max_clicks: "Max. kliknutí",
    field_max_clicks_hint: "Výchozí hodnota 1 (jednorázové) pokud jsou obě prázdné",
    field_alias: "Vlastní alias (volitelné)",
    field_alias_hint: "Písmena, číslice, - a _ — 3 až 32 znaků",
    antiphishing: "Prověřeno proti phishingu",
    creating: "Vytváření…",
    error_enter_url: "Zadejte cílovou URL.",
    error_sign_in: "Přihlaste se prosím pro vytváření odkazů.",
    error_generic: "Odkaz se nepodařilo vytvořit. Zkuste to prosím znovu.",
    error_network: "Chyba sítě. Zkuste to prosím znovu.",
    result_ready: "Váš odkaz je připraven",
    result_copied: "Zkopírováno",
    result_copy: "Kopírovat",
    result_open: "Otevřít",
    result_magic_prefix: "Jednorázový / omezený odkaz",
    result_magic_expires: ", vyprší ",
    result_magic_clicks_max: " kliknutí max.",
    result_magic_clicks_max_plural: " kliknutí max.",
    result_deep_info: "Otevře aplikaci pokud je nainstalovaná, jinak webová záloha.",
    result_short_info: "Spravujte své odkazy z řídicího panelu.",
  },
};

export function ServerLinkClient({ kind }: { kind: Kind }) {
  const { user, loading } = useUser();
  const s = T[useLocale()] ?? T.en;
  const [target, setTarget] = useState("");
  const [ios, setIos] = useState("");
  const [android, setAndroid] = useState("");
  const [alias, setAlias] = useState("");
  const [days, setDays] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateResult | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCopy(setCopied);

  async function create() {
    setError(null);
    setResult(null);
    if (!target.trim()) {
      setError(s.error_enter_url);
      return;
    }
    setBusy(true);
    try {
      const payload: Record<string, unknown> = { kind, target_url: target.trim() };
      if (alias.trim()) payload.code = alias.trim();
      if (kind === "deep") {
        if (ios.trim()) payload.ios_url = ios.trim();
        if (android.trim()) payload.android_url = android.trim();
      }
      if (kind === "magic") {
        if (days.trim()) payload.expires_in_days = Number(days);
        if (maxClicks.trim()) payload.max_clicks = Number(maxClicks);
      }
      // callTool expects a TOOL SLUG (which it maps to the create-link function
      // via FN_MAP and echoes as ?tool=… for logging) — not the function name.
      // Passing "create-link" here threw "No backend function mapped" before any
      // request was sent, surfacing as the generic network error.
      const slug = kind === "deep" ? "deep-link" : kind === "magic" ? "magic-link" : "url-shortener";
      const res = await callTool(slug, payload);
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setError(s.error_sign_in);
        return;
      }
      if (!res.ok) {
        setError((data as { message?: string }).message ?? s.error_generic);
        return;
      }
      setResult(data as CreateResult);
    } catch {
      setError(s.error_network);
    } finally {
      setBusy(false);
    }
  }

  // ── login gate ──────────────────────────────────────────────────────
  if (!loading && !user) {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600">
          <LogIn className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-ink-900">{s.login_title}</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-500">
          {s.login_blurb}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href={`/login?redirect=${encodeURIComponent(redirectFor(kind))}`}>
            <Button>{s.sign_in}</Button>
          </Link>
          <Link href={`/register?redirect=${encodeURIComponent(redirectFor(kind))}`}>
            <Button variant="outline">{s.create_account}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = s[`${kind}_title`];
  const blurb = s[`${kind}_blurb`];
  const cta = s[`${kind}_cta`];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Link2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-ink-900">{title}</h2>
            <p className="mt-0.5 text-sm text-ink-500">{blurb}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Field label={kind === "deep" ? s.field_web_fallback : s.field_destination_url}>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="https://example.com/your-page"
              inputMode="url"
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </Field>

          {kind === "deep" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={s.field_ios} hint={s.field_ios_hint}>
                <input value={ios} onChange={(e) => setIos(e.target.value)} placeholder={s.field_ios_placeholder}
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
              <Field label={s.field_android} hint={s.field_android_hint}>
                <input value={android} onChange={(e) => setAndroid(e.target.value)} placeholder={s.field_android_placeholder}
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
            </div>
          )}

          {kind === "magic" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={s.field_expires} hint={s.field_expires_hint}>
                <input value={days} onChange={(e) => setDays(e.target.value.replace(/\D/g, ""))} placeholder="7" inputMode="numeric"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
              <Field label={s.field_max_clicks} hint={s.field_max_clicks_hint}>
                <input value={maxClicks} onChange={(e) => setMaxClicks(e.target.value.replace(/\D/g, ""))} placeholder="1" inputMode="numeric"
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
              </Field>
            </div>
          )}

          <Field label={s.field_alias} hint={s.field_alias_hint}>
            <div className="flex items-stretch overflow-hidden rounded-lg border border-ink-200 bg-white focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
              <span className="flex items-center bg-ink-50 px-3 text-sm text-ink-400">konvertools.com/s/</span>
              <input value={alias} onChange={(e) => setAlias(e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase())} placeholder="my-link"
                className="flex-1 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </Field>

          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="inline-flex items-center gap-1.5 text-xs text-ink-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> {s.antiphishing}
            </p>
            <Button onClick={create} disabled={busy}>
              {busy ? s.creating : cta}
            </Button>
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        </div>
      </div>

      {result && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="mb-2 text-sm font-medium text-emerald-800">{s.result_ready}</p>
          <div className="flex items-stretch gap-2">
            <input
              readOnly
              value={result.url}
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 font-mono text-sm text-ink-900"
            />
            <Button variant="outline" onClick={() => copy(result.url)}>
              {copied ? <><Check className="h-4 w-4" /> {s.result_copied}</> : <><Copy className="h-4 w-4" /> {s.result_copy}</>}
            </Button>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline"><ExternalLink className="h-4 w-4" /> {s.result_open}</Button>
            </a>
          </div>
          <p className="mt-2 text-xs text-emerald-700">
            {result.kind === "magic"
              ? `${s.result_magic_prefix}${result.expires_at ? `${s.result_magic_expires}${new Date(result.expires_at).toLocaleDateString()}` : ""}${result.max_clicks ? `, ${result.max_clicks}${result.max_clicks > 1 ? s.result_magic_clicks_max_plural : s.result_magic_clicks_max}` : ""}.`
              : result.kind === "deep"
              ? s.result_deep_info
              : s.result_short_info}
          </p>
        </div>
      )}
    </div>
  );
}

function redirectFor(kind: Kind): string {
  return kind === "deep" ? "/deep-link" : kind === "magic" ? "/magic-link" : "/url-shortener";
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

function useCopy(setCopied: (v: boolean) => void) {
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
}
