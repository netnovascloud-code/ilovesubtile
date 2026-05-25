import type { Locale } from "@/lib/i18n/locales";

export type UiStrings = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  home: {
    toolsTitle: string;
    toolsLead: string;
    whyTitle: string;
    reasons: Array<{ title: string; body: string }>;
    upgradeTitle: string;
    upgradeBody: string;
    upgradeCtaPrimary: string;
    upgradeCtaSecondary: string;
    upgradeFeatures: string[];
  };
  pricing: {
    title: string;
    lead: string;
    mostPopular: string;
    perMonth: string;
    forever: string;
    footnote: string;
    free: { desc: string; cta: string };
    pro: { desc: string; cta: string };
    business: { desc: string; cta: string };
  };
  tool: {
    howItWorks: string;
    faq: string;
    breadcrumbHome: string;
    proBadge: string;
  };
};

const en: UiStrings = {
  hero: {
    badge: "Free · No sign-up required",
    title: "Convert, generate & translate subtitles online",
    subtitle: "Sixteen focused tools for SRT, VTT and captioned video. Drop your file, get your result — no editor, no sign-up, no nonsense.",
    ctaPrimary: "Start with the generator",
    ctaSecondary: "See all tools",
  },
  home: {
    toolsTitle: "All subtitle tools",
    toolsLead: "Pick the tool you need. Drop your file. Get your result.",
    whyTitle: "Why CaptionFlow?",
    reasons: [
      { title: "Built for one thing", body: "Each tool does exactly one job. No bloated video editor, no learning curve." },
      { title: "Powered by AI", body: "State-of-the-art AI for transcription and translation — accurate in 30+ languages." },
      { title: "30+ languages", body: "Translate subtitles cue-by-cue with strict JSON output — timestamps stay intact." },
      { title: "Files auto-deleted", body: "We process and forget. Your media is gone within an hour." },
    ],
    upgradeTitle: "Need more? Go Pro for €12/month.",
    upgradeBody: "Unlimited runs, files up to 500 MB, no ads, no watermark, every translation language. Cancel anytime.",
    upgradeCtaPrimary: "See pricing",
    upgradeCtaSecondary: "Create free account",
    upgradeFeatures: [
      "Unlimited tool runs",
      "Files up to 500 MB",
      "No ads, no watermark",
      "All translation languages",
      "Priority queue",
    ],
  },
  pricing: {
    title: "Simple, honest pricing",
    lead: "Free for everyone. Go Pro when you need more. Cancel anytime.",
    mostPopular: "Most popular",
    perMonth: "per month",
    forever: "forever",
    footnote: "All prices in EUR, VAT excluded. Annual plans available at checkout (save ~30%).",
    free: { desc: "Great for one-off jobs.", cta: "Get started" },
    pro: { desc: "Unlimited tools, no ads, no watermark.", cta: "Upgrade to Pro" },
    business: { desc: "API access and team seats.", cta: "Choose Business" },
  },
  tool: { howItWorks: "How it works", faq: "Frequently asked questions", breadcrumbHome: "Home", proBadge: "Pro feature" },
};

const fr: UiStrings = {
  hero: {
    badge: "Gratuit · sans inscription",
    title: "Convertir, générer et traduire vos sous-titres en ligne",
    subtitle: "Seize outils dédiés aux SRT, VTT et sous-titres vidéo. Déposez votre fichier, récupérez le résultat — sans éditeur compliqué, sans inscription.",
    ctaPrimary: "Démarrer avec le générateur",
    ctaSecondary: "Voir tous les outils",
  },
  home: {
    toolsTitle: "Tous les outils de sous-titrage",
    toolsLead: "Choisissez votre outil. Déposez votre fichier. Récupérez le résultat.",
    whyTitle: "Pourquoi CaptionFlow ?",
    reasons: [
      { title: "Une seule mission par outil", body: "Chaque outil fait exactement une chose. Pas d'éditeur vidéo lourd, pas de courbe d'apprentissage." },
      { title: "Propulsé par l'IA", body: "Une IA de pointe pour la transcription et la traduction — précise dans 30+ langues." },
      { title: "30+ langues", body: "Traduction cue par cue avec sortie JSON stricte — les timestamps restent intacts." },
      { title: "Fichiers auto-supprimés", body: "On traite et on oublie. Vos médias disparaissent en moins d'une heure." },
    ],
    upgradeTitle: "Besoin de plus ? Passez Pro pour 12 €/mois.",
    upgradeBody: "Utilisations illimitées, fichiers jusqu'à 500 Mo, sans pub, sans filigrane, toutes les langues. Annulable à tout moment.",
    upgradeCtaPrimary: "Voir les tarifs",
    upgradeCtaSecondary: "Créer un compte gratuit",
    upgradeFeatures: [
      "Utilisations illimitées",
      "Fichiers jusqu'à 500 Mo",
      "Sans pub, sans filigrane",
      "Toutes les langues de traduction",
      "File d'attente prioritaire",
    ],
  },
  pricing: {
    title: "Tarifs simples et transparents",
    lead: "Gratuit pour tous. Passez Pro quand vous en avez besoin. Annulable à tout moment.",
    mostPopular: "Le plus populaire",
    perMonth: "par mois",
    forever: "pour toujours",
    footnote: "Tous les prix en EUR, hors TVA. Plans annuels disponibles au paiement (économisez ~30 %).",
    free: { desc: "Parfait pour un usage ponctuel.", cta: "Commencer" },
    pro: { desc: "Outils illimités, sans pub, sans filigrane.", cta: "Passer à Pro" },
    business: { desc: "Accès API et places en équipe.", cta: "Choisir Business" },
  },
  tool: { howItWorks: "Comment ça marche", faq: "Questions fréquentes", breadcrumbHome: "Accueil", proBadge: "Fonction Pro" },
};

const es: UiStrings = {
  hero: {
    badge: "Gratis · sin registro",
    title: "Convierte, genera y traduce subtítulos en línea",
    subtitle: "Dieciséis herramientas centradas en SRT, VTT y vídeo con subtítulos. Suelta tu archivo, descarga el resultado — sin editor, sin registro.",
    ctaPrimary: "Empezar con el generador",
    ctaSecondary: "Ver todas las herramientas",
  },
  home: {
    toolsTitle: "Todas las herramientas de subtítulos",
    toolsLead: "Elige la herramienta. Suelta tu archivo. Descarga el resultado.",
    whyTitle: "¿Por qué CaptionFlow?",
    reasons: [
      { title: "Una sola misión por herramienta", body: "Cada herramienta hace exactamente una cosa. Sin editor de vídeo pesado, sin curva de aprendizaje." },
      { title: "Impulsado por AI", body: "AI transcribe, AI traduce — preciso en más de 30 idiomas." },
      { title: "30+ idiomas", body: "Traducción cue por cue con salida JSON estricta — los timestamps quedan intactos." },
      { title: "Archivos auto-eliminados", body: "Procesamos y olvidamos. Tu material desaparece en menos de una hora." },
    ],
    upgradeTitle: "¿Necesitas más? Pasa a Pro por 12 €/mes.",
    upgradeBody: "Usos ilimitados, archivos hasta 500 MB, sin anuncios, sin marca de agua, todos los idiomas. Cancela cuando quieras.",
    upgradeCtaPrimary: "Ver precios",
    upgradeCtaSecondary: "Crear cuenta gratis",
    upgradeFeatures: [
      "Usos ilimitados",
      "Archivos hasta 500 MB",
      "Sin anuncios, sin marca de agua",
      "Todos los idiomas de traducción",
      "Cola prioritaria",
    ],
  },
  pricing: {
    title: "Precios simples y honestos",
    lead: "Gratis para todos. Pasa a Pro cuando necesites más. Cancela cuando quieras.",
    mostPopular: "Más popular",
    perMonth: "al mes",
    forever: "para siempre",
    footnote: "Todos los precios en EUR, IVA no incluido. Planes anuales disponibles en pago (ahorra ~30 %).",
    free: { desc: "Perfecto para usos puntuales.", cta: "Empezar" },
    pro: { desc: "Herramientas ilimitadas, sin anuncios, sin marca de agua.", cta: "Pasar a Pro" },
    business: { desc: "Acceso API y plazas de equipo.", cta: "Elegir Business" },
  },
  tool: { howItWorks: "Cómo funciona", faq: "Preguntas frecuentes", breadcrumbHome: "Inicio", proBadge: "Función Pro" },
};

const pt: UiStrings = {
  hero: {
    badge: "Grátis · sem cadastro",
    title: "Converta, gere e traduza legendas online",
    subtitle: "Dezesseis ferramentas focadas em SRT, VTT e vídeo legendado. Solte seu arquivo, baixe o resultado — sem editor, sem cadastro.",
    ctaPrimary: "Começar com o gerador",
    ctaSecondary: "Ver todas as ferramentas",
  },
  home: {
    toolsTitle: "Todas as ferramentas de legendas",
    toolsLead: "Escolha a ferramenta. Solte seu arquivo. Baixe o resultado.",
    whyTitle: "Por que CaptionFlow?",
    reasons: [
      { title: "Uma só missão por ferramenta", body: "Cada ferramenta faz exatamente uma coisa. Sem editor de vídeo pesado, sem curva de aprendizado." },
      { title: "Powered by AI", body: "AI transcreve, AI traduz — preciso em mais de 30 idiomas." },
      { title: "30+ idiomas", body: "Tradução cue por cue com saída JSON estrita — timestamps intactos." },
      { title: "Arquivos auto-deletados", body: "Processamos e esquecemos. Sua mídia some em menos de uma hora." },
    ],
    upgradeTitle: "Precisa de mais? Vá Pro por €12/mês.",
    upgradeBody: "Usos ilimitados, arquivos até 500 MB, sem anúncios, sem marca d'água, todos os idiomas. Cancele quando quiser.",
    upgradeCtaPrimary: "Ver preços",
    upgradeCtaSecondary: "Criar conta grátis",
    upgradeFeatures: [
      "Usos ilimitados",
      "Arquivos até 500 MB",
      "Sem anúncios, sem marca d'água",
      "Todos os idiomas de tradução",
      "Fila prioritária",
    ],
  },
  pricing: {
    title: "Preços simples e honestos",
    lead: "Grátis para todos. Vá Pro quando precisar. Cancele quando quiser.",
    mostPopular: "Mais popular",
    perMonth: "por mês",
    forever: "para sempre",
    footnote: "Todos os preços em EUR, IVA não incluído. Planos anuais disponíveis no checkout (economize ~30 %).",
    free: { desc: "Ideal para usos pontuais.", cta: "Começar" },
    pro: { desc: "Ferramentas ilimitadas, sem anúncios, sem marca d'água.", cta: "Ir para Pro" },
    business: { desc: "Acesso à API e assentos em equipe.", cta: "Escolher Business" },
  },
  tool: { howItWorks: "Como funciona", faq: "Perguntas frequentes", breadcrumbHome: "Início", proBadge: "Recurso Pro" },
};

const de: UiStrings = {
  hero: {
    badge: "Kostenlos · ohne Anmeldung",
    title: "Untertitel online umwandeln, erstellen und übersetzen",
    subtitle: "Sechzehn fokussierte Tools für SRT, VTT und Video-Untertitel. Datei hochladen, Ergebnis herunterladen — kein Editor, keine Anmeldung.",
    ctaPrimary: "Mit dem Generator starten",
    ctaSecondary: "Alle Tools ansehen",
  },
  home: {
    toolsTitle: "Alle Untertitel-Tools",
    toolsLead: "Tool wählen. Datei hochladen. Ergebnis herunterladen.",
    whyTitle: "Warum CaptionFlow?",
    reasons: [
      { title: "Eine Aufgabe pro Tool", body: "Jedes Tool macht genau eine Sache. Kein überladener Video-Editor, keine Lernkurve." },
      { title: "Powered by AI", body: "AI transkribiert, AI übersetzt — präzise in 30+ Sprachen." },
      { title: "30+ Sprachen", body: "Cue-für-Cue-Übersetzung mit striktem JSON — Zeitstempel bleiben erhalten." },
      { title: "Dateien werden gelöscht", body: "Wir verarbeiten und vergessen. Deine Medien sind binnen einer Stunde weg." },
    ],
    upgradeTitle: "Mehr nötig? Pro für 12 €/Monat.",
    upgradeBody: "Unbegrenzte Nutzung, Dateien bis 500 MB, keine Werbung, kein Wasserzeichen, alle Sprachen. Jederzeit kündbar.",
    upgradeCtaPrimary: "Preise ansehen",
    upgradeCtaSecondary: "Kostenloses Konto erstellen",
    upgradeFeatures: [
      "Unbegrenzte Nutzung",
      "Dateien bis 500 MB",
      "Keine Werbung, kein Wasserzeichen",
      "Alle Übersetzungssprachen",
      "Vorrangige Warteschlange",
    ],
  },
  pricing: {
    title: "Einfache, faire Preise",
    lead: "Kostenlos für alle. Pro, wenn du mehr brauchst. Jederzeit kündbar.",
    mostPopular: "Am beliebtesten",
    perMonth: "pro Monat",
    forever: "für immer",
    footnote: "Alle Preise in EUR, ohne MwSt. Jahrespläne im Checkout verfügbar (spare ~30 %).",
    free: { desc: "Ideal für gelegentliche Nutzung.", cta: "Loslegen" },
    pro: { desc: "Unbegrenzte Tools, keine Werbung, kein Wasserzeichen.", cta: "Auf Pro upgraden" },
    business: { desc: "API-Zugang und Team-Sitze.", cta: "Business wählen" },
  },
  tool: { howItWorks: "So funktioniert's", faq: "Häufige Fragen", breadcrumbHome: "Startseite", proBadge: "Pro-Funktion" },
};

const it: UiStrings = {
  hero: {
    badge: "Gratuito · senza registrazione",
    title: "Converti, genera e traduci sottotitoli online",
    subtitle: "Sedici strumenti dedicati a SRT, VTT e video sottotitolati. Carica il file, scarica il risultato — niente editor, niente registrazione.",
    ctaPrimary: "Inizia con il generatore",
    ctaSecondary: "Vedi tutti gli strumenti",
  },
  home: {
    toolsTitle: "Tutti gli strumenti per sottotitoli",
    toolsLead: "Scegli lo strumento. Carica il file. Scarica il risultato.",
    whyTitle: "Perché CaptionFlow?",
    reasons: [
      { title: "Una missione per strumento", body: "Ogni strumento fa esattamente una cosa. Niente editor video pesante, nessuna curva di apprendimento." },
      { title: "Powered by AI", body: "AI per la trascrizione, AI per la traduzione — preciso in 30+ lingue." },
      { title: "30+ lingue", body: "Traduzione cue per cue con output JSON rigoroso — i timestamp restano intatti." },
      { title: "File auto-eliminati", body: "Elaboriamo e dimentichiamo. I tuoi file spariscono entro un'ora." },
    ],
    upgradeTitle: "Vuoi di più? Passa a Pro per 12 €/mese.",
    upgradeBody: "Utilizzi illimitati, file fino a 500 MB, niente pubblicità, niente filigrana, tutte le lingue. Disdetta in qualsiasi momento.",
    upgradeCtaPrimary: "Vedi i prezzi",
    upgradeCtaSecondary: "Crea un account gratuito",
    upgradeFeatures: [
      "Utilizzi illimitati",
      "File fino a 500 MB",
      "Niente pubblicità, niente filigrana",
      "Tutte le lingue di traduzione",
      "Coda prioritaria",
    ],
  },
  pricing: {
    title: "Prezzi semplici e onesti",
    lead: "Gratis per tutti. Passa a Pro quando ti serve. Disdetta quando vuoi.",
    mostPopular: "Il più popolare",
    perMonth: "al mese",
    forever: "per sempre",
    footnote: "Tutti i prezzi in EUR, IVA esclusa. Piani annuali al checkout (risparmia ~30 %).",
    free: { desc: "Perfetto per usi sporadici.", cta: "Inizia" },
    pro: { desc: "Strumenti illimitati, niente pubblicità, niente filigrana.", cta: "Passa a Pro" },
    business: { desc: "Accesso API e posti per team.", cta: "Scegli Business" },
  },
  tool: { howItWorks: "Come funziona", faq: "Domande frequenti", breadcrumbHome: "Home", proBadge: "Funzione Pro" },
};

const nl: UiStrings = {
  hero: {
    badge: "Gratis · geen registratie",
    title: "Ondertitels online converteren, genereren en vertalen",
    subtitle: "Zestien gerichte tools voor SRT, VTT en ondertitelde video. Bestand uploaden, resultaat downloaden — geen editor, geen registratie.",
    ctaPrimary: "Start met de generator",
    ctaSecondary: "Alle tools bekijken",
  },
  home: {
    toolsTitle: "Alle ondertitel-tools",
    toolsLead: "Kies je tool. Upload je bestand. Download het resultaat.",
    whyTitle: "Waarom CaptionFlow?",
    reasons: [
      { title: "Eén taak per tool", body: "Elke tool doet precies één ding. Geen overladen video-editor, geen leercurve." },
      { title: "Powered by AI", body: "AI transcribeert, AI vertaalt — nauwkeurig in 30+ talen." },
      { title: "30+ talen", body: "Cue-per-cue vertaling met strikte JSON-output — timestamps blijven intact." },
      { title: "Bestanden automatisch verwijderd", body: "We verwerken en vergeten. Je media is binnen een uur weg." },
    ],
    upgradeTitle: "Meer nodig? Ga Pro voor €12/maand.",
    upgradeBody: "Onbeperkt gebruik, bestanden tot 500 MB, geen advertenties, geen watermerk, alle talen. Altijd opzegbaar.",
    upgradeCtaPrimary: "Bekijk prijzen",
    upgradeCtaSecondary: "Maak een gratis account",
    upgradeFeatures: [
      "Onbeperkt gebruik",
      "Bestanden tot 500 MB",
      "Geen advertenties, geen watermerk",
      "Alle vertaaltalen",
      "Prioriteitswachtrij",
    ],
  },
  pricing: {
    title: "Eenvoudige, eerlijke prijzen",
    lead: "Gratis voor iedereen. Pro wanneer je meer nodig hebt. Altijd opzegbaar.",
    mostPopular: "Meest populair",
    perMonth: "per maand",
    forever: "voor altijd",
    footnote: "Alle prijzen in EUR, exclusief btw. Jaarplannen beschikbaar bij afrekenen (bespaar ~30 %).",
    free: { desc: "Ideaal voor losse klussen.", cta: "Aan de slag" },
    pro: { desc: "Onbeperkte tools, geen advertenties, geen watermerk.", cta: "Upgrade naar Pro" },
    business: { desc: "API-toegang en teamzitplaatsen.", cta: "Kies Business" },
  },
  tool: { howItWorks: "Zo werkt het", faq: "Veelgestelde vragen", breadcrumbHome: "Home", proBadge: "Pro-functie" },
};

const ja: UiStrings = {
  hero: {
    badge: "無料 · 登録不要",
    title: "字幕をオンラインで変換・生成・翻訳",
    subtitle: "SRT、VTT、字幕付き動画に特化した16のツール。ファイルをドロップして結果を受け取るだけ — 編集ソフトも登録も不要。",
    ctaPrimary: "ジェネレーターを始める",
    ctaSecondary: "すべてのツールを見る",
  },
  home: {
    toolsTitle: "すべての字幕ツール",
    toolsLead: "ツールを選んで、ファイルをドロップして、結果を受け取る。",
    whyTitle: "CaptionFlowを選ぶ理由",
    reasons: [
      { title: "1ツール1機能", body: "各ツールはひとつの仕事だけをこなします。重い動画エディタも学習コストも不要。" },
      { title: "AI搭載", body: "AIが文字起こし、AIが翻訳を担当 — 30以上の言語で高精度。" },
      { title: "30以上の言語", body: "厳格なJSON出力でキューごとに翻訳 — タイムスタンプはそのまま。" },
      { title: "ファイルは自動削除", body: "処理したら忘れます。1時間以内にメディアは消えます。" },
    ],
    upgradeTitle: "もっと必要？月12ユーロでPro。",
    upgradeBody: "無制限の利用、500 MBまでのファイル、広告なし、透かしなし、すべての言語。いつでも解約可。",
    upgradeCtaPrimary: "料金を見る",
    upgradeCtaSecondary: "無料アカウントを作成",
    upgradeFeatures: [
      "無制限の利用",
      "ファイル最大500 MB",
      "広告なし・透かしなし",
      "すべての翻訳言語",
      "優先キュー",
    ],
  },
  pricing: {
    title: "シンプルで誠実な料金",
    lead: "誰でも無料。必要になったらProへ。いつでも解約可能。",
    mostPopular: "最も人気",
    perMonth: "月額",
    forever: "永久",
    footnote: "価格はすべてEUR、税抜き。年間プランはチェックアウトで利用可（約30%お得）。",
    free: { desc: "単発の用途に最適。", cta: "始める" },
    pro: { desc: "無制限のツール、広告なし、透かしなし。", cta: "Proにアップグレード" },
    business: { desc: "APIアクセスとチームシート。", cta: "Businessを選ぶ" },
  },
  tool: { howItWorks: "使い方", faq: "よくある質問", breadcrumbHome: "ホーム", proBadge: "Pro機能" },
};

const zh: UiStrings = {
  hero: {
    badge: "免费 · 无需注册",
    title: "在线转换、生成和翻译字幕",
    subtitle: "十六款专注于 SRT、VTT 和带字幕视频的工具。上传文件，下载结果 — 无需编辑器，无需注册。",
    ctaPrimary: "从生成器开始",
    ctaSecondary: "查看所有工具",
  },
  home: {
    toolsTitle: "所有字幕工具",
    toolsLead: "选择工具，上传文件，下载结果。",
    whyTitle: "为什么选择 CaptionFlow？",
    reasons: [
      { title: "每个工具只做一件事", body: "每个工具只完成一项任务。没有臃肿的视频编辑器，没有学习曲线。" },
      { title: "由 AI 驱动", body: "AI 负责转录,AI 负责翻译 — 在 30 多种语言中保持准确。" },
      { title: "30+ 语言", body: "逐句翻译并输出严格 JSON — 时间戳保持不变。" },
      { title: "文件自动删除", body: "处理完即遗忘。您的媒体将在一小时内消失。" },
    ],
    upgradeTitle: "需要更多？每月 12 欧元升级 Pro。",
    upgradeBody: "无限使用、最高 500 MB 文件、无广告、无水印、所有语言。随时取消。",
    upgradeCtaPrimary: "查看价格",
    upgradeCtaSecondary: "创建免费帐户",
    upgradeFeatures: [
      "无限工具使用",
      "最大 500 MB 文件",
      "无广告、无水印",
      "所有翻译语言",
      "优先队列",
    ],
  },
  pricing: {
    title: "简单诚信的定价",
    lead: "对所有人免费。需要更多时升级 Pro。随时取消。",
    mostPopular: "最受欢迎",
    perMonth: "每月",
    forever: "永久",
    footnote: "所有价格以欧元计,不含增值税。年付方案在结账时可选(节省约 30%)。",
    free: { desc: "适合一次性使用。", cta: "开始使用" },
    pro: { desc: "无限工具、无广告、无水印。", cta: "升级到 Pro" },
    business: { desc: "API 访问与团队席位。", cta: "选择 Business" },
  },
  tool: { howItWorks: "工作原理", faq: "常见问题", breadcrumbHome: "首页", proBadge: "Pro 功能" },
};

const ko: UiStrings = {
  hero: {
    badge: "무료 · 가입 불필요",
    title: "온라인으로 자막을 변환·생성·번역",
    subtitle: "SRT, VTT, 자막 영상에 특화된 16개의 도구. 파일을 올리고 결과를 받기만 하면 됩니다 — 편집기도, 가입도 필요 없습니다.",
    ctaPrimary: "생성기로 시작",
    ctaSecondary: "모든 도구 보기",
  },
  home: {
    toolsTitle: "모든 자막 도구",
    toolsLead: "도구를 선택하고, 파일을 올리고, 결과를 받으세요.",
    whyTitle: "왜 CaptionFlow인가요?",
    reasons: [
      { title: "도구당 한 가지 작업", body: "각 도구는 정확히 한 가지 일만 합니다. 무거운 영상 편집기도, 학습 곡선도 없습니다." },
      { title: "AI 기반", body: "AI가 전사, AI가 번역 — 30개 이상의 언어에서 정확합니다." },
      { title: "30개 이상 언어", body: "엄격한 JSON 출력으로 큐 단위 번역 — 타임스탬프는 그대로 유지됩니다." },
      { title: "파일 자동 삭제", body: "처리 후 잊어버립니다. 미디어는 1시간 안에 사라집니다." },
    ],
    upgradeTitle: "더 필요하신가요? 월 12유로로 Pro.",
    upgradeBody: "무제한 사용, 500 MB까지의 파일, 광고 없음, 워터마크 없음, 모든 언어. 언제든 해지 가능.",
    upgradeCtaPrimary: "가격 보기",
    upgradeCtaSecondary: "무료 계정 만들기",
    upgradeFeatures: [
      "무제한 사용",
      "최대 500 MB 파일",
      "광고 없음, 워터마크 없음",
      "모든 번역 언어",
      "우선 대기열",
    ],
  },
  pricing: {
    title: "간단하고 정직한 가격",
    lead: "누구나 무료. 필요할 때 Pro로. 언제든 해지 가능.",
    mostPopular: "가장 인기",
    perMonth: "월",
    forever: "영구",
    footnote: "모든 가격은 EUR이며 부가세 별도. 결제 시 연간 요금제 선택 가능(약 30% 절약).",
    free: { desc: "일회성 사용에 적합.", cta: "시작하기" },
    pro: { desc: "무제한 도구, 광고 없음, 워터마크 없음.", cta: "Pro로 업그레이드" },
    business: { desc: "API 액세스 및 팀 좌석.", cta: "Business 선택" },
  },
  tool: { howItWorks: "작동 방식", faq: "자주 묻는 질문", breadcrumbHome: "홈", proBadge: "Pro 기능" },
};

const ar: UiStrings = {
  hero: {
    badge: "مجاني · بدون تسجيل",
    title: "حوّل، أنشئ، وترجم الترجمات عبر الإنترنت",
    subtitle: "ستة عشر أداة مخصصة لـ SRT وVTT والفيديو المُترجم. ارفع ملفك واحصل على النتيجة — بدون محرر، بدون تسجيل.",
    ctaPrimary: "ابدأ بمولّد الترجمة",
    ctaSecondary: "اعرض كل الأدوات",
  },
  home: {
    toolsTitle: "كل أدوات الترجمة",
    toolsLead: "اختر الأداة. ارفع الملف. حمّل النتيجة.",
    whyTitle: "لماذا CaptionFlow؟",
    reasons: [
      { title: "مهمة واحدة لكل أداة", body: "كل أداة تقوم بمهمة واحدة بالضبط. لا محرر فيديو ثقيل، لا منحنى تعلم." },
      { title: "مدعوم بـ AI", body: "AI للتفريغ، AI للترجمة — دقيق في أكثر من 30 لغة." },
      { title: "أكثر من 30 لغة", body: "ترجمة سطرًا بسطر مع إخراج JSON صارم — تظل الطوابع الزمنية كما هي." },
      { title: "حذف تلقائي للملفات", body: "نعالج ثم ننسى. تختفي وسائطك خلال ساعة." },
    ],
    upgradeTitle: "تحتاج أكثر؟ Pro بـ 12 يورو/شهر.",
    upgradeBody: "استخدام غير محدود، ملفات حتى 500 ميجا، بدون إعلانات، بدون علامة مائية، كل اللغات. إلغاء في أي وقت.",
    upgradeCtaPrimary: "اعرض الأسعار",
    upgradeCtaSecondary: "إنشاء حساب مجاني",
    upgradeFeatures: [
      "استخدام غير محدود",
      "ملفات حتى 500 ميجا",
      "بدون إعلانات، بدون علامة مائية",
      "كل لغات الترجمة",
      "قائمة انتظار ذات أولوية",
    ],
  },
  pricing: {
    title: "تسعير بسيط وعادل",
    lead: "مجاني للجميع. ترقّ إلى Pro حين تحتاج المزيد. إلغاء في أي وقت.",
    mostPopular: "الأكثر شعبية",
    perMonth: "شهريًا",
    forever: "للأبد",
    footnote: "كل الأسعار باليورو، بدون ضريبة القيمة المضافة. خطط سنوية متاحة عند الدفع (وفّر ~30%).",
    free: { desc: "مثالي للاستخدام العرضي.", cta: "ابدأ" },
    pro: { desc: "أدوات بلا حدود، بدون إعلانات، بدون علامة مائية.", cta: "الترقية إلى Pro" },
    business: { desc: "وصول إلى الـ API ومقاعد للفريق.", cta: "اختر Business" },
  },
  tool: { howItWorks: "كيف يعمل", faq: "الأسئلة الشائعة", breadcrumbHome: "الرئيسية", proBadge: "ميزة Pro" },
};

const ru: UiStrings = {
  hero: {
    badge: "Бесплатно · без регистрации",
    title: "Конвертируйте, создавайте и переводите субтитры онлайн",
    subtitle: "Шестнадцать инструментов для SRT, VTT и видео с субтитрами. Загрузите файл, получите результат — без редактора, без регистрации.",
    ctaPrimary: "Начать с генератора",
    ctaSecondary: "Все инструменты",
  },
  home: {
    toolsTitle: "Все инструменты для субтитров",
    toolsLead: "Выберите инструмент. Загрузите файл. Скачайте результат.",
    whyTitle: "Почему CaptionFlow?",
    reasons: [
      { title: "Один инструмент — одна задача", body: "Каждый инструмент делает ровно одно дело. Никаких громоздких редакторов, никакого обучения." },
      { title: "На базе AI", body: "AI транскрибирует, AI переводит — точно в 30+ языках." },
      { title: "30+ языков", body: "Перевод по сабтайтлам со строгим JSON — таймкоды остаются нетронутыми." },
      { title: "Файлы удаляются автоматически", body: "Обработали и забыли. Медиа исчезает в течение часа." },
    ],
    upgradeTitle: "Нужно больше? Pro за 12 €/мес.",
    upgradeBody: "Безлимитный запуск, файлы до 500 МБ, без рекламы, без вотермарки, все языки. Отмена в любой момент.",
    upgradeCtaPrimary: "Посмотреть тарифы",
    upgradeCtaSecondary: "Создать бесплатный аккаунт",
    upgradeFeatures: [
      "Безлимитный запуск",
      "Файлы до 500 МБ",
      "Без рекламы, без вотермарки",
      "Все языки перевода",
      "Приоритетная очередь",
    ],
  },
  pricing: {
    title: "Простые честные тарифы",
    lead: "Бесплатно всем. Pro — когда нужно больше. Отмена в любое время.",
    mostPopular: "Самый популярный",
    perMonth: "в месяц",
    forever: "навсегда",
    footnote: "Все цены в EUR, без НДС. Годовые тарифы при оплате (экономия ~30%).",
    free: { desc: "Подходит для разовых задач.", cta: "Начать" },
    pro: { desc: "Безлимит инструментов, без рекламы и вотермарок.", cta: "Перейти на Pro" },
    business: { desc: "Доступ к API и места для команды.", cta: "Выбрать Business" },
  },
  tool: { howItWorks: "Как это работает", faq: "Частые вопросы", breadcrumbHome: "Главная", proBadge: "Pro-функция" },
};

const hi: UiStrings = {
  hero: {
    badge: "मुफ़्त · पंजीकरण नहीं चाहिए",
    title: "ऑनलाइन सबटाइटल बदलें, बनाएँ और अनुवाद करें",
    subtitle: "SRT, VTT और कैप्शन वाले वीडियो के लिए सोलह सटीक टूल। फ़ाइल छोड़ें, परिणाम पाएँ — कोई एडिटर नहीं, कोई पंजीकरण नहीं।",
    ctaPrimary: "जनरेटर से शुरू करें",
    ctaSecondary: "सभी टूल देखें",
  },
  home: {
    toolsTitle: "सभी सबटाइटल टूल",
    toolsLead: "टूल चुनें। फ़ाइल अपलोड करें। परिणाम डाउनलोड करें।",
    whyTitle: "CaptionFlow क्यों?",
    reasons: [
      { title: "एक टूल, एक काम", body: "हर टूल ठीक एक काम करता है। न भारी वीडियो एडिटर, न सीखने की ज़रूरत।" },
      { title: "AI द्वारा संचालित", body: "AI ट्रांसक्रिप्शन करता है, AI अनुवाद करता है — 30+ भाषाओं में सटीक।" },
      { title: "30+ भाषाएँ", body: "क्यू-दर-क्यू अनुवाद, सख्त JSON आउटपुट के साथ — टाइमस्टैम्प यथावत रहते हैं।" },
      { title: "फ़ाइलें स्वतः हटा दी जाती हैं", body: "हम प्रोसेस करते हैं और भूल जाते हैं। आपका मीडिया एक घंटे में हट जाता है।" },
    ],
    upgradeTitle: "और चाहिए? €12/माह में Pro लें।",
    upgradeBody: "असीमित उपयोग, 500 MB तक की फ़ाइलें, कोई विज्ञापन नहीं, कोई वॉटरमार्क नहीं, हर भाषा। कभी भी रद्द करें।",
    upgradeCtaPrimary: "क़ीमतें देखें",
    upgradeCtaSecondary: "मुफ़्त खाता बनाएँ",
    upgradeFeatures: [
      "असीमित उपयोग",
      "500 MB तक की फ़ाइलें",
      "कोई विज्ञापन नहीं, कोई वॉटरमार्क नहीं",
      "सभी अनुवाद भाषाएँ",
      "प्राथमिकता कतार",
    ],
  },
  pricing: {
    title: "सरल, ईमानदार क़ीमतें",
    lead: "सभी के लिए मुफ़्त। ज़रूरत पड़ने पर Pro। कभी भी रद्द करें।",
    mostPopular: "सबसे लोकप्रिय",
    perMonth: "/माह",
    forever: "हमेशा के लिए",
    footnote: "सभी क़ीमतें EUR में, VAT शामिल नहीं। चेकआउट पर वार्षिक प्लान (~30% बचत)।",
    free: { desc: "एकल उपयोग के लिए बढ़िया।", cta: "शुरू करें" },
    pro: { desc: "असीमित टूल, कोई विज्ञापन नहीं, कोई वॉटरमार्क नहीं।", cta: "Pro में अपग्रेड करें" },
    business: { desc: "API एक्सेस और टीम सीटें।", cta: "Business चुनें" },
  },
  tool: { howItWorks: "यह कैसे काम करता है", faq: "अक्सर पूछे जाने वाले प्रश्न", breadcrumbHome: "होम", proBadge: "Pro सुविधा" },
};

export const UI_STRINGS: Record<Locale, UiStrings> = {
  en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi,
};

export function getStrings(locale: Locale): UiStrings {
  return UI_STRINGS[locale] ?? UI_STRINGS.en;
}
