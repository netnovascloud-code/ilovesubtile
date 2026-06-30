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
    title: "Convert files, images, audio, video & text online",
    subtitle: "80+ free, fast online tools for documents, images, audio, video, code and text — most run right in your browser. No sign-up.",
    ctaPrimary: "Start with the generator",
    ctaSecondary: "See all tools",
  },
  home: {
    toolsTitle: "All subtitle tools",
    toolsLead: "Pick the tool you need. Drop your file. Get your result.",
    whyTitle: "Why Konvertools?",
    reasons: [
      { title: "Built for one thing", body: "Each tool does exactly one job. No bloated video editor, no learning curve." },
      { title: "Powered by AI", body: "State-of-the-art AI for transcription and translation — accurate in 30+ languages." },
      { title: "30+ languages", body: "Translate subtitles cue-by-cue with strict JSON output — timestamps stay intact." },
      { title: "Files auto-deleted", body: "We process and forget. Your media is gone within an hour." },
    ],
    upgradeTitle: "Need more? Go Pro for €25/month.",
    upgradeBody: "500 AI conversions/month, Workflow Builder, batch up to 20 files, saved templates, files up to 1 GB, no ads, no watermark. Cancel anytime.",
    upgradeCtaPrimary: "See pricing",
    upgradeCtaSecondary: "Create free account",
    upgradeFeatures: [
      "500 AI conversions/month",
      "Workflow Builder",
      "Batch up to 20 files",
      "Templates",
      "No ads, no watermark",
    ],
  },
  pricing: {
    title: "Simple, honest pricing",
    lead: "Free for everyone. Go Pro when you need more. Cancel anytime.",
    mostPopular: "Most popular",
    perMonth: "per month",
    forever: "forever",
    footnote: "All prices in EUR, VAT excluded. Annual plans available at checkout (save ~30%).",
    free: { desc: "All browser tools, free & unlimited.", cta: "Get started" },
    pro: { desc: "500 AI conversions/month · Workflow Builder · Batch 20 files.", cta: "Upgrade to Pro" },
    business: { desc: "3,000 AI conversions/month", cta: "Choose Business" },
  },
  tool: { howItWorks: "How it works", faq: "Frequently asked questions", breadcrumbHome: "Home", proBadge: "Pro feature" },
};

const fr: UiStrings = {
  hero: {
    badge: "Gratuit · sans inscription",
    title: "Convertir fichiers, images, audio, vidéo et texte en ligne",
    subtitle: "Plus de 80 outils en ligne gratuits et rapides pour documents, images, audio, vidéo, code et texte — la plupart dans votre navigateur. Sans inscription.",
    ctaPrimary: "Démarrer avec le générateur",
    ctaSecondary: "Voir tous les outils",
  },
  home: {
    toolsTitle: "Tous les outils de sous-titrage",
    toolsLead: "Choisissez votre outil. Déposez votre fichier. Récupérez le résultat.",
    whyTitle: "Pourquoi Konvertools ?",
    reasons: [
      { title: "Une seule mission par outil", body: "Chaque outil fait exactement une chose. Pas d'éditeur vidéo lourd, pas de courbe d'apprentissage." },
      { title: "Propulsé par l'IA", body: "Une IA de pointe pour la transcription et la traduction — précise dans 30+ langues." },
      { title: "30+ langues", body: "Traduction cue par cue avec sortie JSON stricte — les timestamps restent intacts." },
      { title: "Fichiers auto-supprimés", body: "On traite et on oublie. Vos médias disparaissent en moins d'une heure." },
    ],
    upgradeTitle: "Besoin de plus ? Passez Pro pour 25 €/mois.",
    upgradeBody: "500 conversions IA/mois, Workflow Builder, batch jusqu'à 20 fichiers, templates sauvegardés, fichiers jusqu’à 1 Go, sans pub, sans filigrane. Annulable à tout moment.",
    upgradeCtaPrimary: "Voir les tarifs",
    upgradeCtaSecondary: "Créer un compte gratuit",
    upgradeFeatures: [
      "500 conversions IA/mois",
      "Workflow Builder",
      "Batch jusqu'à 20 fichiers",
      "Templates",
      "Sans pub, sans filigrane",
    ],
  },
  pricing: {
    title: "Tarifs simples et transparents",
    lead: "Gratuit pour tous. Passez Pro quand vous en avez besoin. Annulable à tout moment.",
    mostPopular: "Le plus populaire",
    perMonth: "par mois",
    forever: "pour toujours",
    footnote: "Tous les prix en EUR, hors TVA. Plans annuels disponibles au paiement (économisez ~30 %).",
    free: { desc: "Tous les outils navigateur, gratuits et illimités.", cta: "Commencer" },
    pro: { desc: "500 conversions IA/mois · Workflow Builder · Batch 20 fichiers.", cta: "Passer à Pro" },
    business: { desc: "3 000 conversions IA/mois", cta: "Choisir Business" },
  },
  tool: { howItWorks: "Comment ça marche", faq: "Questions fréquentes", breadcrumbHome: "Accueil", proBadge: "Fonction Pro" },
};

const es: UiStrings = {
  hero: {
    badge: "Gratis · sin registro",
    title: "Convierte archivos, imágenes, audio, vídeo y texto online",
    subtitle: "Más de 80 herramientas online gratis y rápidas para documentos, imágenes, audio, vídeo, código y texto — la mayoría en tu navegador. Sin registro.",
    ctaPrimary: "Empezar con el generador",
    ctaSecondary: "Ver todas las herramientas",
  },
  home: {
    toolsTitle: "Todas las herramientas de subtítulos",
    toolsLead: "Elige la herramienta. Suelta tu archivo. Descarga el resultado.",
    whyTitle: "¿Por qué Konvertools?",
    reasons: [
      { title: "Una sola misión por herramienta", body: "Cada herramienta hace exactamente una cosa. Sin editor de vídeo pesado, sin curva de aprendizaje." },
      { title: "Impulsado por AI", body: "AI transcribe, AI traduce — preciso en más de 30 idiomas." },
      { title: "30+ idiomas", body: "Traducción cue por cue con salida JSON estricta — los timestamps quedan intactos." },
      { title: "Archivos auto-eliminados", body: "Procesamos y olvidamos. Tu material desaparece en menos de una hora." },
    ],
    upgradeTitle: "¿Necesitas más? Pasa a Pro por 25 €/mes.",
    upgradeBody: "500 conversiones IA/mes, archivos hasta 1 GB, sin anuncios, sin marca de agua, todos los idiomas. Cancela cuando quieras.",
    upgradeCtaPrimary: "Ver precios",
    upgradeCtaSecondary: "Crear cuenta gratis",
    upgradeFeatures: [
      "500 conversiones IA/mes",
      "Archivos hasta 1 GB",
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
    pro: { desc: "500 conversiones IA/mes · Workflow Builder · Lote 20 archivos.", cta: "Pasar a Pro" },
    business: { desc: "3.000 conversiones IA/mes", cta: "Elegir Business" },
  },
  tool: { howItWorks: "Cómo funciona", faq: "Preguntas frecuentes", breadcrumbHome: "Inicio", proBadge: "Función Pro" },
};

const pt: UiStrings = {
  hero: {
    badge: "Grátis · sem cadastro",
    title: "Converta arquivos, imagens, áudio, vídeo e texto online",
    subtitle: "Mais de 80 ferramentas online grátis e rápidas para documentos, imagens, áudio, vídeo, código e texto — a maioria no seu navegador. Sem cadastro.",
    ctaPrimary: "Começar com o gerador",
    ctaSecondary: "Ver todas as ferramentas",
  },
  home: {
    toolsTitle: "Todas as ferramentas de legendas",
    toolsLead: "Escolha a ferramenta. Solte seu arquivo. Baixe o resultado.",
    whyTitle: "Por que Konvertools?",
    reasons: [
      { title: "Uma só missão por ferramenta", body: "Cada ferramenta faz exatamente uma coisa. Sem editor de vídeo pesado, sem curva de aprendizado." },
      { title: "Com tecnologia de IA", body: "A IA transcreve, a IA traduz — preciso em mais de 30 idiomas." },
      { title: "30+ idiomas", body: "Tradução cue por cue com saída JSON estrita — timestamps intactos." },
      { title: "Arquivos auto-deletados", body: "Processamos e esquecemos. Sua mídia some em menos de uma hora." },
    ],
    upgradeTitle: "Precisa de mais? Vá Pro por €25/mês.",
    upgradeBody: "500 conversões IA/mês, arquivos até 1 GB, sem anúncios, sem marca d'água, todos os idiomas. Cancele quando quiser.",
    upgradeCtaPrimary: "Ver preços",
    upgradeCtaSecondary: "Criar conta grátis",
    upgradeFeatures: [
      "500 conversões IA/mês",
      "Arquivos até 1 GB",
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
    pro: { desc: "500 conversões IA/mês · Workflow Builder · Lote 20 arquivos.", cta: "Ir para Pro" },
    business: { desc: "3.000 conversões IA/mês", cta: "Escolher Business" },
  },
  tool: { howItWorks: "Como funciona", faq: "Perguntas frequentes", breadcrumbHome: "Início", proBadge: "Recurso Pro" },
};

const de: UiStrings = {
  hero: {
    badge: "Kostenlos · ohne Anmeldung",
    title: "Dateien, Bilder, Audio, Video & Text online umwandeln",
    subtitle: "80+ kostenlose, schnelle Online-Tools für Dokumente, Bilder, Audio, Video, Code und Text — die meisten direkt im Browser. Ohne Anmeldung.",
    ctaPrimary: "Mit dem Generator starten",
    ctaSecondary: "Alle Tools ansehen",
  },
  home: {
    toolsTitle: "Alle Untertitel-Tools",
    toolsLead: "Tool wählen. Datei hochladen. Ergebnis herunterladen.",
    whyTitle: "Warum Konvertools?",
    reasons: [
      { title: "Eine Aufgabe pro Tool", body: "Jedes Tool macht genau eine Sache. Kein überladener Video-Editor, keine Lernkurve." },
      { title: "KI-gestützt", body: "KI transkribiert, KI übersetzt — präzise in 30+ Sprachen." },
      { title: "30+ Sprachen", body: "Cue-für-Cue-Übersetzung mit striktem JSON — Zeitstempel bleiben erhalten." },
      { title: "Dateien werden gelöscht", body: "Wir verarbeiten und vergessen. Deine Medien sind binnen einer Stunde weg." },
    ],
    upgradeTitle: "Mehr nötig? Pro für 25 €/Monat.",
    upgradeBody: "500 KI-Konvertierungen/Monat, Dateien bis 1 GB, keine Werbung, kein Wasserzeichen, alle Sprachen. Jederzeit kündbar.",
    upgradeCtaPrimary: "Preise ansehen",
    upgradeCtaSecondary: "Kostenloses Konto erstellen",
    upgradeFeatures: [
      "500 KI-Konvertierungen/Monat",
      "Dateien bis 1 GB",
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
    pro: { desc: "500 KI-Konvertierungen/Monat · Workflow Builder · Batch 20 Dateien.", cta: "Auf Pro upgraden" },
    business: { desc: "3.000 KI-Konvertierungen/Monat", cta: "Business wählen" },
  },
  tool: { howItWorks: "So funktioniert's", faq: "Häufige Fragen", breadcrumbHome: "Startseite", proBadge: "Pro-Funktion" },
};

const it: UiStrings = {
  hero: {
    badge: "Gratuito · senza registrazione",
    title: "Converti file, immagini, audio, video e testo online",
    subtitle: "Oltre 80 strumenti online gratuiti e veloci per documenti, immagini, audio, video, codice e testo — la maggior parte nel browser. Senza registrazione.",
    ctaPrimary: "Inizia con il generatore",
    ctaSecondary: "Vedi tutti gli strumenti",
  },
  home: {
    toolsTitle: "Tutti gli strumenti per sottotitoli",
    toolsLead: "Scegli lo strumento. Carica il file. Scarica il risultato.",
    whyTitle: "Perché Konvertools?",
    reasons: [
      { title: "Una missione per strumento", body: "Ogni strumento fa esattamente una cosa. Niente editor video pesante, nessuna curva di apprendimento." },
      { title: "Basato sull'IA", body: "IA per la trascrizione, IA per la traduzione — precisa in 30+ lingue." },
      { title: "30+ lingue", body: "Traduzione cue per cue con output JSON rigoroso — i timestamp restano intatti." },
      { title: "File auto-eliminati", body: "Elaboriamo e dimentichiamo. I tuoi file spariscono entro un'ora." },
    ],
    upgradeTitle: "Vuoi di più? Passa a Pro per 25 €/mese.",
    upgradeBody: "500 conversioni IA/mese, file fino a 1 GB, niente pubblicità, niente filigrana, tutte le lingue. Disdetta in qualsiasi momento.",
    upgradeCtaPrimary: "Vedi i prezzi",
    upgradeCtaSecondary: "Crea un account gratuito",
    upgradeFeatures: [
      "500 conversioni IA/mese",
      "File fino a 1 GB",
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
    pro: { desc: "500 conversioni IA/mese · Workflow Builder · Batch 20 file.", cta: "Passa a Pro" },
    business: { desc: "3.000 conversioni IA/mese", cta: "Scegli Business" },
  },
  tool: { howItWorks: "Come funziona", faq: "Domande frequenti", breadcrumbHome: "Home", proBadge: "Funzione Pro" },
};

const nl: UiStrings = {
  hero: {
    badge: "Gratis · geen registratie",
    title: "Bestanden, afbeeldingen, audio, video & tekst online converteren",
    subtitle: "80+ gratis, snelle online tools voor documenten, afbeeldingen, audio, video, code en tekst — de meeste direct in je browser. Geen registratie.",
    ctaPrimary: "Start met de generator",
    ctaSecondary: "Alle tools bekijken",
  },
  home: {
    toolsTitle: "Alle ondertitel-tools",
    toolsLead: "Kies je tool. Upload je bestand. Download het resultaat.",
    whyTitle: "Waarom Konvertools?",
    reasons: [
      { title: "Eén taak per tool", body: "Elke tool doet precies één ding. Geen overladen video-editor, geen leercurve." },
      { title: "Aangedreven door AI", body: "AI transcribeert, AI vertaalt — nauwkeurig in 30+ talen." },
      { title: "30+ talen", body: "Cue-per-cue vertaling met strikte JSON-output — timestamps blijven intact." },
      { title: "Bestanden automatisch verwijderd", body: "We verwerken en vergeten. Je media is binnen een uur weg." },
    ],
    upgradeTitle: "Meer nodig? Ga Pro voor €25/maand.",
    upgradeBody: "500 AI-conversies/maand, bestanden tot 1 GB, geen advertenties, geen watermerk, alle talen. Altijd opzegbaar.",
    upgradeCtaPrimary: "Bekijk prijzen",
    upgradeCtaSecondary: "Maak een gratis account",
    upgradeFeatures: [
      "500 AI-conversies/maand",
      "Bestanden tot 1 GB",
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
    pro: { desc: "500 AI-conversies/maand · Workflow Builder · Batch 20 bestanden.", cta: "Upgrade naar Pro" },
    business: { desc: "3.000 AI-conversies/maand", cta: "Kies Business" },
  },
  tool: { howItWorks: "Zo werkt het", faq: "Veelgestelde vragen", breadcrumbHome: "Home", proBadge: "Pro-functie" },
};

const ja: UiStrings = {
  hero: {
    badge: "無料 · 登録不要",
    title: "ファイル・画像・音声・動画・テキストをオンライン変換",
    subtitle: "文書・画像・音声・動画・コード・テキスト向けの無料で高速なオンラインツール 80 種類以上。多くはブラウザ内で動作。登録不要。",
    ctaPrimary: "ジェネレーターを始める",
    ctaSecondary: "すべてのツールを見る",
  },
  home: {
    toolsTitle: "すべての字幕ツール",
    toolsLead: "ツールを選んで、ファイルをドロップして、結果を受け取る。",
    whyTitle: "Konvertoolsを選ぶ理由",
    reasons: [
      { title: "1ツール1機能", body: "各ツールはひとつの仕事だけをこなします。重い動画エディタも学習コストも不要。" },
      { title: "AI搭載", body: "AIが文字起こし、AIが翻訳を担当 — 30以上の言語で高精度。" },
      { title: "30以上の言語", body: "厳格なJSON出力でキューごとに翻訳 — タイムスタンプはそのまま。" },
      { title: "ファイルは自動削除", body: "処理したら忘れます。1時間以内にメディアは消えます。" },
    ],
    upgradeTitle: "もっと必要？月25ユーロでPro。",
    upgradeBody: "月 500 回の AI 変換、1 GBまでのファイル、広告なし、透かしなし、すべての言語。いつでも解約可。",
    upgradeCtaPrimary: "料金を見る",
    upgradeCtaSecondary: "無料アカウントを作成",
    upgradeFeatures: [
      "月 500 回の AI 変換",
      "ファイル最大1 GB",
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
    pro: { desc: "月 500 回の AI 変換 · Workflow Builder · 20 ファイル一括", cta: "Proにアップグレード" },
    business: { desc: "月 3,000 回の AI 変換", cta: "Businessを選ぶ" },
  },
  tool: { howItWorks: "使い方", faq: "よくある質問", breadcrumbHome: "ホーム", proBadge: "Pro機能" },
};

const zh: UiStrings = {
  hero: {
    badge: "免费 · 无需注册",
    title: "在线转换文件、图片、音频、视频和文本",
    subtitle: "面向文档、图片、音频、视频、代码和文本的 80+ 免费快捷在线工具，多数在浏览器中运行。无需注册。",
    ctaPrimary: "从生成器开始",
    ctaSecondary: "查看所有工具",
  },
  home: {
    toolsTitle: "所有字幕工具",
    toolsLead: "选择工具，上传文件，下载结果。",
    whyTitle: "为什么选择 Konvertools？",
    reasons: [
      { title: "每个工具只做一件事", body: "每个工具只完成一项任务。没有臃肿的视频编辑器，没有学习曲线。" },
      { title: "由 AI 驱动", body: "AI 负责转录,AI 负责翻译 — 在 30 多种语言中保持准确。" },
      { title: "30+ 语言", body: "逐句翻译并输出严格 JSON — 时间戳保持不变。" },
      { title: "文件自动删除", body: "处理完即遗忘。您的媒体将在一小时内消失。" },
    ],
    upgradeTitle: "需要更多？每月 25 欧元升级 Pro。",
    upgradeBody: "每月 500 次 AI 转换、最高 1 GB 文件、无广告、无水印、所有语言。随时取消。",
    upgradeCtaPrimary: "查看价格",
    upgradeCtaSecondary: "创建免费帐户",
    upgradeFeatures: [
      "每月 500 次 AI 转换",
      "最大 1 GB 文件",
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
    pro: { desc: "每月 500 次 AI 转换 · Workflow Builder · 批量 20 个文件", cta: "升级到 Pro" },
    business: { desc: "每月 3,000 次 AI 转换", cta: "选择 Business" },
  },
  tool: { howItWorks: "工作原理", faq: "常见问题", breadcrumbHome: "首页", proBadge: "Pro 功能" },
};

const ko: UiStrings = {
  hero: {
    badge: "무료 · 가입 불필요",
    title: "파일·이미지·오디오·동영상·텍스트 온라인 변환",
    subtitle: "문서·이미지·오디오·동영상·코드·텍스트를 위한 80개 이상의 무료 고속 온라인 도구. 대부분 브라우저에서 실행. 가입 불필요.",
    ctaPrimary: "생성기로 시작",
    ctaSecondary: "모든 도구 보기",
  },
  home: {
    toolsTitle: "모든 자막 도구",
    toolsLead: "도구를 선택하고, 파일을 올리고, 결과를 받으세요.",
    whyTitle: "왜 Konvertools인가요?",
    reasons: [
      { title: "도구당 한 가지 작업", body: "각 도구는 정확히 한 가지 일만 합니다. 무거운 영상 편집기도, 학습 곡선도 없습니다." },
      { title: "AI 기반", body: "AI가 전사, AI가 번역 — 30개 이상의 언어에서 정확합니다." },
      { title: "30개 이상 언어", body: "엄격한 JSON 출력으로 큐 단위 번역 — 타임스탬프는 그대로 유지됩니다." },
      { title: "파일 자동 삭제", body: "처리 후 잊어버립니다. 미디어는 1시간 안에 사라집니다." },
    ],
    upgradeTitle: "더 필요하신가요? 월 25유로로 Pro.",
    upgradeBody: "월 500회 AI 변환, 1 GB까지의 파일, 광고 없음, 워터마크 없음, 모든 언어. 언제든 해지 가능.",
    upgradeCtaPrimary: "가격 보기",
    upgradeCtaSecondary: "무료 계정 만들기",
    upgradeFeatures: [
      "월 500회 AI 변환",
      "최대 1 GB 파일",
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
    pro: { desc: "월 500회 AI 변환 · Workflow Builder · 20개 일괄 처리", cta: "Pro로 업그레이드" },
    business: { desc: "월 3,000회 AI 변환", cta: "Business 선택" },
  },
  tool: { howItWorks: "작동 방식", faq: "자주 묻는 질문", breadcrumbHome: "홈", proBadge: "Pro 기능" },
};

const ar: UiStrings = {
  hero: {
    badge: "مجاني · بدون تسجيل",
    title: "حوّل الملفات والصور والصوت والفيديو والنصوص عبر الإنترنت",
    subtitle: "أكثر من 80 أداة أونلاين مجانية وسريعة للمستندات والصور والصوت والفيديو والشيفرة والنصوص — معظمها يعمل داخل متصفحك. بدون تسجيل.",
    ctaPrimary: "ابدأ بمولّد الترجمة",
    ctaSecondary: "اعرض كل الأدوات",
  },
  home: {
    toolsTitle: "كل أدوات الترجمة",
    toolsLead: "اختر الأداة. ارفع الملف. حمّل النتيجة.",
    whyTitle: "لماذا Konvertools؟",
    reasons: [
      { title: "مهمة واحدة لكل أداة", body: "كل أداة تقوم بمهمة واحدة بالضبط. لا محرر فيديو ثقيل، لا منحنى تعلم." },
      { title: "مدعوم بـ AI", body: "AI للتفريغ، AI للترجمة — دقيق في أكثر من 30 لغة." },
      { title: "أكثر من 30 لغة", body: "ترجمة سطرًا بسطر مع إخراج JSON صارم — تظل الطوابع الزمنية كما هي." },
      { title: "حذف تلقائي للملفات", body: "نعالج ثم ننسى. تختفي وسائطك خلال ساعة." },
    ],
    upgradeTitle: "تحتاج أكثر؟ Pro بـ 25 يورو/شهر.",
    upgradeBody: "500 تحويل ذكاء اصطناعي/شهر، ملفات حتى 1 جيجا، بدون إعلانات، بدون علامة مائية، كل اللغات. إلغاء في أي وقت.",
    upgradeCtaPrimary: "اعرض الأسعار",
    upgradeCtaSecondary: "إنشاء حساب مجاني",
    upgradeFeatures: [
      "500 تحويل ذكاء اصطناعي/شهر",
      "ملفات حتى 1 جيجا",
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
    pro: { desc: "500 تحويل ذكاء اصطناعي/شهر · Workflow Builder · 20 ملفًا دفعة", cta: "الترقية إلى Pro" },
    business: { desc: "3000 تحويل/شهر", cta: "اختر Business" },
  },
  tool: { howItWorks: "كيف يعمل", faq: "الأسئلة الشائعة", breadcrumbHome: "الرئيسية", proBadge: "ميزة Pro" },
};

const ru: UiStrings = {
  hero: {
    badge: "Бесплатно · без регистрации",
    title: "Конвертируйте файлы, изображения, аудио, видео и текст онлайн",
    subtitle: "80+ бесплатных быстрых онлайн-инструментов для документов, изображений, аудио, видео, кода и текста — большинство работает прямо в браузере. Без регистрации.",
    ctaPrimary: "Начать с генератора",
    ctaSecondary: "Все инструменты",
  },
  home: {
    toolsTitle: "Все инструменты для субтитров",
    toolsLead: "Выберите инструмент. Загрузите файл. Скачайте результат.",
    whyTitle: "Почему Konvertools?",
    reasons: [
      { title: "Один инструмент — одна задача", body: "Каждый инструмент делает ровно одно дело. Никаких громоздких редакторов, никакого обучения." },
      { title: "На базе AI", body: "AI транскрибирует, AI переводит — точно в 30+ языках." },
      { title: "30+ языков", body: "Перевод по сабтайтлам со строгим JSON — таймкоды остаются нетронутыми." },
      { title: "Файлы удаляются автоматически", body: "Обработали и забыли. Медиа исчезает в течение часа." },
    ],
    upgradeTitle: "Нужно больше? Pro за 25 €/мес.",
    upgradeBody: "500 ИИ-конвертаций/мес, файлы до 1 ГБ, без рекламы, без вотермарки, все языки. Отмена в любой момент.",
    upgradeCtaPrimary: "Посмотреть тарифы",
    upgradeCtaSecondary: "Создать бесплатный аккаунт",
    upgradeFeatures: [
      "500 ИИ-конвертаций/мес",
      "Файлы до 1 ГБ",
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
    pro: { desc: "500 ИИ-конвертаций/мес · Workflow Builder · Пакет 20 файлов.", cta: "Перейти на Pro" },
    business: { desc: "3000 ИИ-конвертаций/мес", cta: "Выбрать Business" },
  },
  tool: { howItWorks: "Как это работает", faq: "Частые вопросы", breadcrumbHome: "Главная", proBadge: "Pro-функция" },
};

const hi: UiStrings = {
  hero: {
    badge: "मुफ़्त · पंजीकरण नहीं चाहिए",
    title: "ऑनलाइन फ़ाइलें, छवियाँ, ऑडियो, वीडियो और टेक्स्ट कन्वर्ट करें",
    subtitle: "दस्तावेज़, छवियों, ऑडियो, वीडियो, कोड और टेक्स्ट के लिए 80+ मुफ़्त, तेज़ ऑनलाइन टूल — अधिकांश आपके ब्राउज़र में चलते हैं। पंजीकरण नहीं।",
    ctaPrimary: "जनरेटर से शुरू करें",
    ctaSecondary: "सभी टूल देखें",
  },
  home: {
    toolsTitle: "सभी सबटाइटल टूल",
    toolsLead: "टूल चुनें। फ़ाइल अपलोड करें। परिणाम डाउनलोड करें।",
    whyTitle: "Konvertools क्यों?",
    reasons: [
      { title: "एक टूल, एक काम", body: "हर टूल ठीक एक काम करता है। न भारी वीडियो एडिटर, न सीखने की ज़रूरत।" },
      { title: "AI द्वारा संचालित", body: "AI ट्रांसक्रिप्शन करता है, AI अनुवाद करता है — 30+ भाषाओं में सटीक।" },
      { title: "30+ भाषाएँ", body: "क्यू-दर-क्यू अनुवाद, सख्त JSON आउटपुट के साथ — टाइमस्टैम्प यथावत रहते हैं।" },
      { title: "फ़ाइलें स्वतः हटा दी जाती हैं", body: "हम प्रोसेस करते हैं और भूल जाते हैं। आपका मीडिया एक घंटे में हट जाता है।" },
    ],
    upgradeTitle: "और चाहिए? €25/माह में Pro लें।",
    upgradeBody: "500 AI रूपांतरण/माह, 1 GB तक की फ़ाइलें, कोई विज्ञापन नहीं, कोई वॉटरमार्क नहीं, हर भाषा। कभी भी रद्द करें।",
    upgradeCtaPrimary: "क़ीमतें देखें",
    upgradeCtaSecondary: "मुफ़्त खाता बनाएँ",
    upgradeFeatures: [
      "500 AI रूपांतरण/माह",
      "1 GB तक की फ़ाइलें",
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
    pro: { desc: "500 AI रूपांतरण/माह · Workflow Builder · 20 फ़ाइलें बैच", cta: "Pro में अपग्रेड करें" },
    business: { desc: "3,000 AI रूपांतरण/माह", cta: "Business चुनें" },
  },
  tool: { howItWorks: "यह कैसे काम करता है", faq: "अक्सर पूछे जाने वाले प्रश्न", breadcrumbHome: "होम", proBadge: "Pro सुविधा" },
};

const tr: UiStrings = {
  hero: {
    badge: "Ücretsiz · Kayıt gerekmez",
    title: "Dosya, görüntü, ses, video ve metni çevrimiçi dönüştürün",
    subtitle: "Belgeler, görüntüler, ses, video, kod ve metin için 80+ ücretsiz ve hızlı çevrimiçi araç — çoğu doğrudan tarayıcınızda çalışır. Kayıt yok.",
    ctaPrimary: "Üreticiyle başla",
    ctaSecondary: "Tüm araçları gör",
  },
  home: {
    toolsTitle: "Tüm araçlar",
    toolsLead: "İhtiyacınız olan aracı seçin. Dosyanızı bırakın. Sonucu alın.",
    whyTitle: "Neden Konvertools?",
    reasons: [
      { title: "Tek bir iş için tasarlandı", body: "Her araç tam olarak bir işi yapar. Şişkin video düzenleyici yok, öğrenme eğrisi yok." },
      { title: "AI destekli", body: "Transkripsiyon ve çeviri için son teknoloji AI — 30+ dilde doğru." },
      { title: "30+ dil", body: "Altyazıları satır satır çevirin — zaman damgaları korunur." },
      { title: "Dosyalar otomatik silinir", body: "İşler ve unuturuz. Medyanız bir saat içinde silinir." },
    ],
    upgradeTitle: "Daha fazlası mı lazım? Ayda 25 €'ya Pro'ya geçin.",
    upgradeBody: "Aylık 500 AI dönüşümü, Workflow Builder, 20 dosyaya kadar toplu işlem, kayıtlı şablonlar, 1 GB'a kadar dosya, reklamsız, filigransız. İstediğiniz zaman iptal edin.",
    upgradeCtaPrimary: "Fiyatları gör",
    upgradeCtaSecondary: "Ücretsiz hesap oluştur",
    upgradeFeatures: ["Aylık 500 AI dönüşümü", "Workflow Builder", "20 dosyaya kadar toplu işlem", "Şablonlar", "Reklamsız, filigransız"],
  },
  pricing: {
    title: "Basit, dürüst fiyatlandırma",
    lead: "Herkes için ücretsiz. Daha fazlasına ihtiyaç duyduğunuzda Pro'ya geçin. İstediğiniz zaman iptal edin.",
    mostPopular: "En popüler",
    perMonth: "aylık",
    forever: "sonsuza dek",
    footnote: "Tüm fiyatlar EUR cinsinden, KDV hariç. Yıllık planlar ödemede mevcut (~%30 tasarruf).",
    free: { desc: "Tüm tarayıcı araçları, ücretsiz ve sınırsız.", cta: "Başla" },
    pro: { desc: "Aylık 500 AI dönüşümü · Workflow Builder · 20 dosya toplu işlem.", cta: "Pro'ya yükselt" },
    business: { desc: "Aylık 3.000 AI dönüşümü", cta: "Business'ı seç" },
  },
  tool: { howItWorks: "Nasıl çalışır", faq: "Sık sorulan sorular", breadcrumbHome: "Ana sayfa", proBadge: "Pro özelliği" },
};

const id: UiStrings = {
  hero: {
    badge: "Gratis · Tanpa pendaftaran",
    title: "Konversi file, gambar, audio, video & teks online",
    subtitle: "80+ alat online gratis dan cepat untuk dokumen, gambar, audio, video, kode, dan teks — kebanyakan berjalan langsung di browser Anda. Tanpa pendaftaran.",
    ctaPrimary: "Mulai dengan generator",
    ctaSecondary: "Lihat semua alat",
  },
  home: {
    toolsTitle: "Semua alat",
    toolsLead: "Pilih alat yang Anda butuhkan. Letakkan file Anda. Dapatkan hasilnya.",
    whyTitle: "Mengapa Konvertools?",
    reasons: [
      { title: "Dibuat untuk satu hal", body: "Setiap alat melakukan tepat satu pekerjaan. Tanpa editor video yang berat, tanpa kurva belajar." },
      { title: "Didukung AI", body: "AI canggih untuk transkripsi dan terjemahan — akurat dalam 30+ bahasa." },
      { title: "30+ bahasa", body: "Terjemahkan subtitle baris demi baris — stempel waktu tetap utuh." },
      { title: "File terhapus otomatis", body: "Kami memproses lalu melupakan. Media Anda hilang dalam satu jam." },
    ],
    upgradeTitle: "Butuh lebih? Pro seharga €25/bulan.",
    upgradeBody: "500 konversi AI/bulan, Workflow Builder, batch hingga 20 file, template tersimpan, file hingga 1 GB, tanpa iklan, tanpa watermark. Batalkan kapan saja.",
    upgradeCtaPrimary: "Lihat harga",
    upgradeCtaSecondary: "Buat akun gratis",
    upgradeFeatures: ["500 konversi AI/bulan", "Workflow Builder", "Batch hingga 20 file", "Template", "Tanpa iklan, tanpa watermark"],
  },
  pricing: {
    title: "Harga sederhana dan jujur",
    lead: "Gratis untuk semua. Pro saat Anda butuh lebih. Batalkan kapan saja.",
    mostPopular: "Paling populer",
    perMonth: "per bulan",
    forever: "selamanya",
    footnote: "Semua harga dalam EUR, belum termasuk PPN. Paket tahunan tersedia saat checkout (hemat ~30%).",
    free: { desc: "Semua alat browser, gratis & tanpa batas.", cta: "Mulai" },
    pro: { desc: "500 konversi AI/bulan · Workflow Builder · Batch 20 file.", cta: "Tingkatkan ke Pro" },
    business: { desc: "3.000 konversi AI/bulan", cta: "Pilih Business" },
  },
  tool: { howItWorks: "Cara kerja", faq: "Pertanyaan umum", breadcrumbHome: "Beranda", proBadge: "Fitur Pro" },
};

const vi: UiStrings = {
  hero: {
    badge: "Miễn phí · Không cần đăng ký",
    title: "Chuyển đổi tệp, hình ảnh, âm thanh, video & văn bản trực tuyến",
    subtitle: "Hơn 80 công cụ trực tuyến miễn phí, nhanh chóng cho tài liệu, hình ảnh, âm thanh, video, mã và văn bản — hầu hết chạy ngay trong trình duyệt. Không cần đăng ký.",
    ctaPrimary: "Bắt đầu với trình tạo",
    ctaSecondary: "Xem tất cả công cụ",
  },
  home: {
    toolsTitle: "Tất cả công cụ",
    toolsLead: "Chọn công cụ bạn cần. Thả tệp của bạn. Nhận kết quả.",
    whyTitle: "Tại sao chọn Konvertools?",
    reasons: [
      { title: "Được tạo cho một việc", body: "Mỗi công cụ làm đúng một việc. Không có trình chỉnh sửa video cồng kềnh, không cần học." },
      { title: "Hỗ trợ bởi AI", body: "AI tiên tiến cho phiên âm và dịch — chính xác trong hơn 30 ngôn ngữ." },
      { title: "Hơn 30 ngôn ngữ", body: "Dịch phụ đề từng dòng — dấu thời gian được giữ nguyên." },
      { title: "Tệp tự động xóa", body: "Chúng tôi xử lý rồi quên. Phương tiện của bạn biến mất trong vòng một giờ." },
    ],
    upgradeTitle: "Cần thêm? Lên Pro với giá 25 €/tháng.",
    upgradeBody: "500 lượt AI/tháng, Workflow Builder, xử lý hàng loạt đến 20 tệp, mẫu đã lưu, tệp đến 1 GB, không quảng cáo, không hình mờ. Hủy bất cứ lúc nào.",
    upgradeCtaPrimary: "Xem giá",
    upgradeCtaSecondary: "Tạo tài khoản miễn phí",
    upgradeFeatures: ["500 lượt AI/tháng", "Workflow Builder", "Xử lý hàng loạt đến 20 tệp", "Mẫu", "Không quảng cáo, không hình mờ"],
  },
  pricing: {
    title: "Giá đơn giản, minh bạch",
    lead: "Miễn phí cho mọi người. Lên Pro khi cần thêm. Hủy bất cứ lúc nào.",
    mostPopular: "Phổ biến nhất",
    perMonth: "mỗi tháng",
    forever: "vĩnh viễn",
    footnote: "Tất cả giá tính bằng EUR, chưa gồm VAT. Gói năm có sẵn khi thanh toán (tiết kiệm ~30%).",
    free: { desc: "Tất cả công cụ trình duyệt, miễn phí & không giới hạn.", cta: "Bắt đầu" },
    pro: { desc: "500 lượt AI/tháng · Workflow Builder · Hàng loạt 20 tệp.", cta: "Nâng cấp lên Pro" },
    business: { desc: "3.000 lượt AI/tháng", cta: "Chọn Business" },
  },
  tool: { howItWorks: "Cách hoạt động", faq: "Câu hỏi thường gặp", breadcrumbHome: "Trang chủ", proBadge: "Tính năng Pro" },
};

const sv: UiStrings = {
  hero: {
    badge: "Gratis · Ingen registrering",
    title: "Konvertera filer, bilder, ljud, video och text online",
    subtitle: "80+ gratis, snabba onlineverktyg för dokument, bilder, ljud, video, kod och text — de flesta körs direkt i din webbläsare. Ingen registrering.",
    ctaPrimary: "Börja med generatorn",
    ctaSecondary: "Se alla verktyg",
  },
  home: {
    toolsTitle: "Alla verktyg",
    toolsLead: "Välj verktyget du behöver. Släpp din fil. Få ditt resultat.",
    whyTitle: "Varför Konvertools?",
    reasons: [
      { title: "Byggt för en sak", body: "Varje verktyg gör exakt en sak. Ingen uppsvälld videoredigerare, ingen inlärningskurva." },
      { title: "Drivs av AI", body: "Toppmodern AI för transkribering och översättning — exakt på 30+ språk." },
      { title: "30+ språk", body: "Översätt undertexter rad för rad — tidsstämplar förblir intakta." },
      { title: "Filer raderas automatiskt", body: "Vi bearbetar och glömmer. Dina media är borta inom en timme." },
    ],
    upgradeTitle: "Behöver du mer? Gå Pro för 25 €/månad.",
    upgradeBody: "500 AI-konverteringar/månad, Workflow Builder, batch upp till 20 filer, sparade mallar, filer upp till 1 GB, inga annonser, ingen vattenstämpel. Avsluta när som helst.",
    upgradeCtaPrimary: "Se priser",
    upgradeCtaSecondary: "Skapa gratis konto",
    upgradeFeatures: ["500 AI-konverteringar/månad", "Workflow Builder", "Batch upp till 20 filer", "Mallar", "Inga annonser, ingen vattenstämpel"],
  },
  pricing: {
    title: "Enkel, ärlig prissättning",
    lead: "Gratis för alla. Gå Pro när du behöver mer. Avsluta när som helst.",
    mostPopular: "Mest populär",
    perMonth: "per månad",
    forever: "för alltid",
    footnote: "Alla priser i EUR, exkl. moms. Årsplaner tillgängliga i kassan (spara ~30 %).",
    free: { desc: "Alla webbläsarverktyg, gratis & obegränsat.", cta: "Kom igång" },
    pro: { desc: "500 AI-konverteringar/månad · Workflow Builder · Batch 20 filer.", cta: "Uppgradera till Pro" },
    business: { desc: "3 000 AI-konverteringar/månad", cta: "Välj Business" },
  },
  tool: { howItWorks: "Så fungerar det", faq: "Vanliga frågor", breadcrumbHome: "Hem", proBadge: "Pro-funktion" },
};

const pl: UiStrings = {
  hero: {
    badge: "Za darmo · Bez rejestracji",
    title: "Konwertuj pliki, obrazy, audio, wideo i tekst online",
    subtitle: "Ponad 80 darmowych, szybkich narzędzi online do dokumentów, obrazów, audio, wideo, kodu i tekstu — większość działa bezpośrednio w przeglądarce. Bez rejestracji.",
    ctaPrimary: "Zacznij od generatora",
    ctaSecondary: "Zobacz wszystkie narzędzia",
  },
  home: {
    toolsTitle: "Wszystkie narzędzia",
    toolsLead: "Wybierz potrzebne narzędzie. Upuść plik. Pobierz wynik.",
    whyTitle: "Dlaczego Konvertools?",
    reasons: [
      { title: "Stworzone do jednego zadania", body: "Każde narzędzie robi dokładnie jedną rzecz. Bez rozdętego edytora wideo, bez nauki." },
      { title: "Napędzane przez AI", body: "Najnowocześniejsze AI do transkrypcji i tłumaczenia — dokładne w ponad 30 językach." },
      { title: "30+ języków", body: "Tłumacz napisy wiersz po wierszu — znaczniki czasu pozostają nienaruszone." },
      { title: "Pliki usuwane automatycznie", body: "Przetwarzamy i zapominamy. Twoje media znikają w ciągu godziny." },
    ],
    upgradeTitle: "Potrzebujesz więcej? Pro za 25 €/mies.",
    upgradeBody: "500 konwersji AI/mies., Workflow Builder, wsadowo do 20 plików, zapisane szablony, pliki do 1 GB, bez reklam, bez znaku wodnego. Anuluj w każdej chwili.",
    upgradeCtaPrimary: "Zobacz cennik",
    upgradeCtaSecondary: "Utwórz darmowe konto",
    upgradeFeatures: ["500 konwersji AI/mies.", "Workflow Builder", "Wsadowo do 20 plików", "Szablony", "Bez reklam, bez znaku wodnego"],
  },
  pricing: {
    title: "Proste, uczciwe ceny",
    lead: "Za darmo dla wszystkich. Pro, gdy potrzebujesz więcej. Anuluj w każdej chwili.",
    mostPopular: "Najpopularniejszy",
    perMonth: "miesięcznie",
    forever: "na zawsze",
    footnote: "Wszystkie ceny w EUR, bez VAT. Plany roczne dostępne przy płatności (oszczędność ~30%).",
    free: { desc: "Wszystkie narzędzia w przeglądarce, za darmo i bez limitu.", cta: "Zacznij" },
    pro: { desc: "500 konwersji AI/mies. · Workflow Builder · Wsad 20 plików.", cta: "Przejdź na Pro" },
    business: { desc: "3000 konwersji AI/mies.", cta: "Wybierz Business" },
  },
  tool: { howItWorks: "Jak to działa", faq: "Najczęstsze pytania", breadcrumbHome: "Strona główna", proBadge: "Funkcja Pro" },
};

const uk: UiStrings = {
  hero: {
    badge: "Безкоштовно · Без реєстрації",
    title: "Конвертуйте файли, зображення, аудіо, відео та текст онлайн",
    subtitle: "Понад 80 безкоштовних швидких онлайн-інструментів для документів, зображень, аудіо, відео, коду та тексту — більшість працює прямо у браузері. Без реєстрації.",
    ctaPrimary: "Почати з генератора",
    ctaSecondary: "Усі інструменти",
  },
  home: {
    toolsTitle: "Усі інструменти",
    toolsLead: "Виберіть потрібний інструмент. Перетягніть файл. Отримайте результат.",
    whyTitle: "Чому Konvertools?",
    reasons: [
      { title: "Створено для однієї задачі", body: "Кожен інструмент робить рівно одну справу. Жодного громіздкого відеоредактора, жодного навчання." },
      { title: "На базі AI", body: "Найсучасніший AI для транскрипції та перекладу — точно понад 30 мовами." },
      { title: "30+ мов", body: "Перекладайте субтитри рядок за рядком — часові мітки залишаються незмінними." },
      { title: "Файли видаляються автоматично", body: "Обробляємо й забуваємо. Ваші медіа зникають упродовж години." },
    ],
    upgradeTitle: "Потрібно більше? Pro за 25 €/міс.",
    upgradeBody: "500 AI-конвертацій/міс, Workflow Builder, пакетна обробка до 20 файлів, збережені шаблони, файли до 1 ГБ, без реклами, без водяного знака. Скасування будь-коли.",
    upgradeCtaPrimary: "Переглянути ціни",
    upgradeCtaSecondary: "Створити безкоштовний акаунт",
    upgradeFeatures: ["500 AI-конвертацій/міс", "Workflow Builder", "Пакетна обробка до 20 файлів", "Шаблони", "Без реклами, без водяного знака"],
  },
  pricing: {
    title: "Прості, чесні ціни",
    lead: "Безкоштовно для всіх. Pro, коли потрібно більше. Скасування будь-коли.",
    mostPopular: "Найпопулярніший",
    perMonth: "на місяць",
    forever: "назавжди",
    footnote: "Усі ціни в EUR, без ПДВ. Річні плани доступні під час оплати (економія ~30%).",
    free: { desc: "Усі браузерні інструменти, безкоштовно й без обмежень.", cta: "Почати" },
    pro: { desc: "500 AI-конвертацій/міс · Workflow Builder · Пакет 20 файлів.", cta: "Перейти на Pro" },
    business: { desc: "3000 AI-конвертацій/міс", cta: "Обрати Business" },
  },
  tool: { howItWorks: "Як це працює", faq: "Поширені запитання", breadcrumbHome: "Головна", proBadge: "Функція Pro" },
};

const cs: UiStrings = {
  hero: {
    badge: "Zdarma · Bez registrace",
    title: "Převádějte soubory, obrázky, zvuk, video a text online",
    subtitle: "80+ bezplatných rychlých online nástrojů pro dokumenty, obrázky, zvuk, video, kód a text — většina běží přímo ve vašem prohlížeči. Bez registrace.",
    ctaPrimary: "Začít s generátorem",
    ctaSecondary: "Zobrazit všechny nástroje",
  },
  home: {
    toolsTitle: "Všechny nástroje",
    toolsLead: "Vyberte nástroj, který potřebujete. Přetáhněte soubor. Získejte výsledek.",
    whyTitle: "Proč Konvertools?",
    reasons: [
      { title: "Vytvořeno pro jednu věc", body: "Každý nástroj dělá přesně jednu věc. Žádný nabubřelý videoeditor, žádná křivka učení." },
      { title: "Poháněno AI", body: "Špičková AI pro přepis a překlad — přesné ve více než 30 jazycích." },
      { title: "30+ jazyků", body: "Překládejte titulky řádek po řádku — časové značky zůstávají nedotčené." },
      { title: "Soubory se mažou automaticky", body: "Zpracujeme a zapomeneme. Vaše média zmizí do hodiny." },
    ],
    upgradeTitle: "Potřebujete více? Pro za 25 €/měsíc.",
    upgradeBody: "500 AI konverzí/měsíc, Workflow Builder, dávka až 20 souborů, uložené šablony, soubory až 1 GB, bez reklam, bez vodoznaku. Zrušení kdykoli.",
    upgradeCtaPrimary: "Zobrazit ceny",
    upgradeCtaSecondary: "Vytvořit bezplatný účet",
    upgradeFeatures: ["500 AI konverzí/měsíc", "Workflow Builder", "Dávka až 20 souborů", "Šablony", "Bez reklam, bez vodoznaku"],
  },
  pricing: {
    title: "Jednoduché, poctivé ceny",
    lead: "Zdarma pro všechny. Pro, když potřebujete více. Zrušení kdykoli.",
    mostPopular: "Nejoblíbenější",
    perMonth: "měsíčně",
    forever: "navždy",
    footnote: "Všechny ceny v EUR, bez DPH. Roční plány dostupné při platbě (úspora ~30 %).",
    free: { desc: "Všechny nástroje v prohlížeči, zdarma a bez omezení.", cta: "Začít" },
    pro: { desc: "500 AI konverzí/měsíc · Workflow Builder · Dávka 20 souborů.", cta: "Přejít na Pro" },
    business: { desc: "3 000 AI konverzí/měsíc", cta: "Vybrat Business" },
  },
  tool: { howItWorks: "Jak to funguje", faq: "Časté dotazy", breadcrumbHome: "Domů", proBadge: "Funkce Pro" },
};

// Partial<>: any locale not listed falls back to English via getStrings().
export const UI_STRINGS: Partial<Record<Locale, UiStrings>> = {
  en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi, tr, id, vi, sv, pl, uk, cs,
};

export function getStrings(locale: Locale): UiStrings {
  return UI_STRINGS[locale] ?? en;
}
