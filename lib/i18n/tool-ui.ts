import type { Locale } from "@/lib/i18n/locales";

export type ToolUiStrings = {
  translate: {
    sourceLang: string;
    targetLang: string;
    autoDetect: string;
    translateNow: string;
    helper: string;
  };
  chapters: {
    uploadOrPaste: string;
    pasteHere: string;
    generate: string;
    copy: string;
    copied: string;
    chaptersTitle: string;
  };
  batch: {
    selectTargets: string;
    atLeast2: string;
    translating: string;
    allDone: string;
    perLanguage: string;
  };
  autoSync: {
    videoFile: string;
    subtitleFile: string;
    bothNeeded: string;
    align: string;
  };
  extract: {
    selectTracks: string;
    noTracks: string;
    track: string;
  };
};

const en: ToolUiStrings = {
  translate: { sourceLang: "Source language", targetLang: "Target language", autoDetect: "Auto-detect", translateNow: "Translate now", helper: "We'll translate every cue while keeping the original timing intact." },
  chapters: { uploadOrPaste: "Upload an SRT/VTT or paste your transcript", pasteHere: "Paste your transcript here…", generate: "Generate chapters", copy: "Copy chapters", copied: "Copied!", chaptersTitle: "Your YouTube chapters" },
  batch: { selectTargets: "Pick the languages to translate into", atLeast2: "Select at least one language.", translating: "Translating…", allDone: "All translations are ready", perLanguage: "Per language" },
  autoSync: { videoFile: "Video or audio file", subtitleFile: "SRT or VTT file", bothNeeded: "Both files are required — the audio is the reference.", align: "Align with AI" },
  extract: { selectTracks: "Subtitle tracks found", noTracks: "No subtitle tracks found in that file.", track: "Track" },
};

const fr: ToolUiStrings = {
  translate: { sourceLang: "Langue source", targetLang: "Langue cible", autoDetect: "Détection auto", translateNow: "Traduire", helper: "Nous traduisons chaque ligne en préservant le timing d'origine." },
  chapters: { uploadOrPaste: "Téléversez un SRT/VTT ou collez votre transcript", pasteHere: "Collez votre transcript ici…", generate: "Générer les chapitres", copy: "Copier les chapitres", copied: "Copié !", chaptersTitle: "Vos chapitres YouTube" },
  batch: { selectTargets: "Choisissez les langues cibles", atLeast2: "Sélectionnez au moins une langue.", translating: "Traduction…", allDone: "Toutes les traductions sont prêtes", perLanguage: "Par langue" },
  autoSync: { videoFile: "Fichier vidéo ou audio", subtitleFile: "Fichier SRT ou VTT", bothNeeded: "Les deux fichiers sont requis — l'audio sert de référence.", align: "Aligner avec l'IA" },
  extract: { selectTracks: "Pistes de sous-titres trouvées", noTracks: "Aucune piste de sous-titres trouvée.", track: "Piste" },
};

const es: ToolUiStrings = {
  translate: { sourceLang: "Idioma de origen", targetLang: "Idioma de destino", autoDetect: "Detección automática", translateNow: "Traducir", helper: "Traducimos cada línea preservando el timing original." },
  chapters: { uploadOrPaste: "Sube un SRT/VTT o pega tu transcripción", pasteHere: "Pega tu transcripción aquí…", generate: "Generar capítulos", copy: "Copiar capítulos", copied: "¡Copiado!", chaptersTitle: "Tus capítulos de YouTube" },
  batch: { selectTargets: "Elige los idiomas de destino", atLeast2: "Selecciona al menos un idioma.", translating: "Traduciendo…", allDone: "Todas las traducciones están listas", perLanguage: "Por idioma" },
  autoSync: { videoFile: "Archivo de vídeo o audio", subtitleFile: "Archivo SRT o VTT", bothNeeded: "Ambos archivos son necesarios — el audio es la referencia.", align: "Alinear con IA" },
  extract: { selectTracks: "Pistas de subtítulos encontradas", noTracks: "No se encontraron pistas de subtítulos.", track: "Pista" },
};

const pt: ToolUiStrings = {
  translate: { sourceLang: "Idioma de origem", targetLang: "Idioma de destino", autoDetect: "Detecção automática", translateNow: "Traduzir", helper: "Traduzimos cada linha preservando o timing original." },
  chapters: { uploadOrPaste: "Envie um SRT/VTT ou cole sua transcrição", pasteHere: "Cole sua transcrição aqui…", generate: "Gerar capítulos", copy: "Copiar capítulos", copied: "Copiado!", chaptersTitle: "Seus capítulos do YouTube" },
  batch: { selectTargets: "Escolha os idiomas de destino", atLeast2: "Selecione pelo menos um idioma.", translating: "Traduzindo…", allDone: "Todas as traduções estão prontas", perLanguage: "Por idioma" },
  autoSync: { videoFile: "Arquivo de vídeo ou áudio", subtitleFile: "Arquivo SRT ou VTT", bothNeeded: "Ambos os arquivos são necessários — o áudio é a referência.", align: "Alinhar com IA" },
  extract: { selectTracks: "Faixas de legendas encontradas", noTracks: "Nenhuma faixa de legendas encontrada.", track: "Faixa" },
};

const de: ToolUiStrings = {
  translate: { sourceLang: "Quellsprache", targetLang: "Zielsprache", autoDetect: "Auto-erkennen", translateNow: "Übersetzen", helper: "Wir übersetzen jede Zeile und behalten das ursprüngliche Timing." },
  chapters: { uploadOrPaste: "SRT/VTT hochladen oder Transkript einfügen", pasteHere: "Transkript hier einfügen…", generate: "Kapitel erzeugen", copy: "Kapitel kopieren", copied: "Kopiert!", chaptersTitle: "Deine YouTube-Kapitel" },
  batch: { selectTargets: "Zielsprachen wählen", atLeast2: "Wähle mindestens eine Sprache.", translating: "Übersetze…", allDone: "Alle Übersetzungen sind fertig", perLanguage: "Pro Sprache" },
  autoSync: { videoFile: "Video- oder Audiodatei", subtitleFile: "SRT- oder VTT-Datei", bothNeeded: "Beide Dateien werden benötigt — das Audio ist die Referenz.", align: "Mit KI ausrichten" },
  extract: { selectTracks: "Untertitelspuren gefunden", noTracks: "Keine Untertitelspuren gefunden.", track: "Spur" },
};

const it: ToolUiStrings = {
  translate: { sourceLang: "Lingua di origine", targetLang: "Lingua di destinazione", autoDetect: "Rilevamento automatico", translateNow: "Traduci", helper: "Traduciamo ogni riga mantenendo il timing originale." },
  chapters: { uploadOrPaste: "Carica un SRT/VTT o incolla la trascrizione", pasteHere: "Incolla la trascrizione qui…", generate: "Genera capitoli", copy: "Copia capitoli", copied: "Copiato!", chaptersTitle: "I tuoi capitoli YouTube" },
  batch: { selectTargets: "Scegli le lingue di destinazione", atLeast2: "Seleziona almeno una lingua.", translating: "Traduzione…", allDone: "Tutte le traduzioni sono pronte", perLanguage: "Per lingua" },
  autoSync: { videoFile: "File video o audio", subtitleFile: "File SRT o VTT", bothNeeded: "Servono entrambi i file — l'audio è il riferimento.", align: "Allinea con IA" },
  extract: { selectTracks: "Tracce di sottotitoli trovate", noTracks: "Nessuna traccia di sottotitoli trovata.", track: "Traccia" },
};

const nl: ToolUiStrings = {
  translate: { sourceLang: "Brontaal", targetLang: "Doeltaal", autoDetect: "Auto-detect", translateNow: "Vertalen", helper: "We vertalen elke regel met behoud van de oorspronkelijke timing." },
  chapters: { uploadOrPaste: "Upload een SRT/VTT of plak je transcript", pasteHere: "Plak je transcript hier…", generate: "Hoofdstukken genereren", copy: "Hoofdstukken kopiëren", copied: "Gekopieerd!", chaptersTitle: "Je YouTube-hoofdstukken" },
  batch: { selectTargets: "Kies de doeltalen", atLeast2: "Selecteer minstens één taal.", translating: "Vertalen…", allDone: "Alle vertalingen zijn klaar", perLanguage: "Per taal" },
  autoSync: { videoFile: "Video- of audiobestand", subtitleFile: "SRT- of VTT-bestand", bothNeeded: "Beide bestanden zijn nodig — de audio is de referentie.", align: "Uitlijnen met AI" },
  extract: { selectTracks: "Ondertitelsporen gevonden", noTracks: "Geen ondertitelsporen gevonden.", track: "Spoor" },
};

const ja: ToolUiStrings = {
  translate: { sourceLang: "ソース言語", targetLang: "ターゲット言語", autoDetect: "自動検出", translateNow: "翻訳する", helper: "元のタイミングを保持したまま各行を翻訳します。" },
  chapters: { uploadOrPaste: "SRT/VTT をアップロードするか、トランスクリプトを貼り付け", pasteHere: "ここにトランスクリプトを貼り付け…", generate: "チャプターを生成", copy: "チャプターをコピー", copied: "コピーしました！", chaptersTitle: "YouTube チャプター" },
  batch: { selectTargets: "ターゲット言語を選択", atLeast2: "少なくとも 1 つの言語を選択してください。", translating: "翻訳中…", allDone: "すべての翻訳が完了しました", perLanguage: "言語ごと" },
  autoSync: { videoFile: "動画または音声ファイル", subtitleFile: "SRT または VTT ファイル", bothNeeded: "両方のファイルが必要です — 音声がリファレンスになります。", align: "AI で同期" },
  extract: { selectTracks: "検出された字幕トラック", noTracks: "字幕トラックが見つかりませんでした。", track: "トラック" },
};

const zh: ToolUiStrings = {
  translate: { sourceLang: "源语言", targetLang: "目标语言", autoDetect: "自动检测", translateNow: "立即翻译", helper: "我们逐行翻译,保留原始时间轴。" },
  chapters: { uploadOrPaste: "上传 SRT/VTT 或粘贴转录稿", pasteHere: "在此粘贴转录稿…", generate: "生成章节", copy: "复制章节", copied: "已复制!", chaptersTitle: "您的 YouTube 章节" },
  batch: { selectTargets: "选择目标语言", atLeast2: "至少选择一种语言。", translating: "翻译中…", allDone: "所有翻译已完成", perLanguage: "每种语言" },
  autoSync: { videoFile: "视频或音频文件", subtitleFile: "SRT 或 VTT 文件", bothNeeded: "需要两个文件 — 音频作参考。", align: "用 AI 对齐" },
  extract: { selectTracks: "找到的字幕轨", noTracks: "未找到字幕轨。", track: "轨道" },
};

const ko: ToolUiStrings = {
  translate: { sourceLang: "원본 언어", targetLang: "대상 언어", autoDetect: "자동 감지", translateNow: "지금 번역", helper: "원본 타이밍을 유지하면서 각 줄을 번역합니다." },
  chapters: { uploadOrPaste: "SRT/VTT 업로드 또는 트랜스크립트 붙여넣기", pasteHere: "여기에 트랜스크립트 붙여넣기…", generate: "챕터 생성", copy: "챕터 복사", copied: "복사됨!", chaptersTitle: "YouTube 챕터" },
  batch: { selectTargets: "대상 언어 선택", atLeast2: "최소 1개 언어를 선택하세요.", translating: "번역 중…", allDone: "모든 번역이 완료되었습니다", perLanguage: "언어별" },
  autoSync: { videoFile: "영상 또는 오디오 파일", subtitleFile: "SRT 또는 VTT 파일", bothNeeded: "두 파일 모두 필요합니다 — 오디오가 기준.", align: "AI 로 정렬" },
  extract: { selectTracks: "발견된 자막 트랙", noTracks: "자막 트랙을 찾을 수 없습니다.", track: "트랙" },
};

const ar: ToolUiStrings = {
  translate: { sourceLang: "لغة المصدر", targetLang: "لغة الهدف", autoDetect: "اكتشاف تلقائي", translateNow: "ترجم الآن", helper: "نترجم كل سطر مع الحفاظ على التوقيت الأصلي." },
  chapters: { uploadOrPaste: "ارفع SRT/VTT أو الصق نسختك النصية", pasteHere: "ألصق نسختك النصية هنا…", generate: "أنشئ الفصول", copy: "انسخ الفصول", copied: "تم النسخ!", chaptersTitle: "فصول YouTube الخاصة بك" },
  batch: { selectTargets: "اختر لغات الهدف", atLeast2: "اختر لغة واحدة على الأقل.", translating: "جارٍ الترجمة…", allDone: "كل الترجمات جاهزة", perLanguage: "لكل لغة" },
  autoSync: { videoFile: "ملف فيديو أو صوت", subtitleFile: "ملف SRT أو VTT", bothNeeded: "يلزم كلا الملفين — الصوت هو المرجع.", align: "محاذاة بالذكاء الاصطناعي" },
  extract: { selectTracks: "مسارات الترجمة الموجودة", noTracks: "لم تُعثر على مسارات ترجمة.", track: "مسار" },
};

const ru: ToolUiStrings = {
  translate: { sourceLang: "Исходный язык", targetLang: "Целевой язык", autoDetect: "Автоопределение", translateNow: "Перевести", helper: "Мы переводим каждую строку, сохраняя исходный тайминг." },
  chapters: { uploadOrPaste: "Загрузите SRT/VTT или вставьте транскрипт", pasteHere: "Вставьте транскрипт сюда…", generate: "Создать главы", copy: "Скопировать главы", copied: "Скопировано!", chaptersTitle: "Ваши главы YouTube" },
  batch: { selectTargets: "Выберите целевые языки", atLeast2: "Выберите хотя бы один язык.", translating: "Перевод…", allDone: "Все переводы готовы", perLanguage: "По языку" },
  autoSync: { videoFile: "Видео или аудио файл", subtitleFile: "Файл SRT или VTT", bothNeeded: "Нужны оба файла — аудио служит эталоном.", align: "Выровнять ИИ" },
  extract: { selectTracks: "Найденные дорожки субтитров", noTracks: "Дорожек субтитров не найдено.", track: "Дорожка" },
};

const hi: ToolUiStrings = {
  translate: { sourceLang: "स्रोत भाषा", targetLang: "लक्ष्य भाषा", autoDetect: "स्वतः पहचान", translateNow: "अनुवाद करें", helper: "हम मूल टाइमिंग को बरकरार रखते हुए हर पंक्ति का अनुवाद करते हैं।" },
  chapters: { uploadOrPaste: "SRT/VTT अपलोड करें या अपना ट्रांसक्रिप्ट चिपकाएँ", pasteHere: "यहाँ अपना ट्रांसक्रिप्ट चिपकाएँ…", generate: "चैप्टर बनाएँ", copy: "चैप्टर कॉपी करें", copied: "कॉपी हो गया!", chaptersTitle: "आपके YouTube चैप्टर" },
  batch: { selectTargets: "लक्ष्य भाषाएँ चुनें", atLeast2: "कम से कम एक भाषा चुनें।", translating: "अनुवाद हो रहा है…", allDone: "सभी अनुवाद तैयार हैं", perLanguage: "प्रति भाषा" },
  autoSync: { videoFile: "वीडियो या ऑडियो फ़ाइल", subtitleFile: "SRT या VTT फ़ाइल", bothNeeded: "दोनों फ़ाइलें ज़रूरी हैं — ऑडियो संदर्भ है।", align: "AI से संरेखित करें" },
  extract: { selectTracks: "मिले हुए सबटाइटल ट्रैक", noTracks: "कोई सबटाइटल ट्रैक नहीं मिला।", track: "ट्रैक" },
};

export const TOOL_UI: Record<Locale, ToolUiStrings> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi };

export function getToolUi(locale: Locale): ToolUiStrings {
  return TOOL_UI[locale] ?? TOOL_UI.en;
}
