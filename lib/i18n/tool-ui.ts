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
  burnIn: {
    videoFile: string;
    subtitleFile: string;
    style: string;
    customise: string;
    burnNow: string;
  };
  style: {
    font: string;
    size: string;
    color: string;
    outline: string;
    outlineWidth: string;
    position: string;
    align: string;
    bold: string;
    italic: string;
    top: string;
    middle: string;
    bottom: string;
    preview: string;
    previewText: string;
    download: string;
  };
  generator: {
    outputFormat: string;
    srt: string;
    vtt: string;
    sourceLang: string;
    autoDetect: string;
    generate: string;
  };
  tiktok: {
    pickPreset: string;
    classic: string;
    karaoke: string;
    popup: string;
    bigBold: string;
    render: string;
  };
  pricing: {
    monthly: string;
    annual: string;
    saveBadge: string;
  };
};

const en: ToolUiStrings = {
  translate: { sourceLang: "Source language", targetLang: "Target language", autoDetect: "Auto-detect", translateNow: "Translate now", helper: "We'll translate every cue while keeping the original timing intact." },
  chapters: { uploadOrPaste: "Upload an SRT/VTT or paste your transcript", pasteHere: "Paste your transcript here…", generate: "Generate chapters", copy: "Copy chapters", copied: "Copied!", chaptersTitle: "Your YouTube chapters" },
  batch: { selectTargets: "Pick the languages to translate into", atLeast2: "Select at least one language.", translating: "Translating…", allDone: "All translations are ready", perLanguage: "Per language" },
  autoSync: { videoFile: "Video or audio file", subtitleFile: "SRT or VTT file", bothNeeded: "Both files are required — the audio is the reference.", align: "Align with AI" },
  extract: { selectTracks: "Subtitle tracks found", noTracks: "No subtitle tracks found in that file.", track: "Track" },
  burnIn: { videoFile: "Video file", subtitleFile: "Subtitle file", style: "Caption style", customise: "Customise the look", burnNow: "Burn captions in" },
  style: { font: "Font", size: "Size", color: "Text color", outline: "Outline color", outlineWidth: "Outline width", position: "Position", align: "Alignment", bold: "Bold", italic: "Italic", top: "Top", middle: "Middle", bottom: "Bottom", preview: "Preview", previewText: "The quick brown fox jumps over the lazy dog", download: "Download styled file" },
  generator: { outputFormat: "Output format", srt: "SRT", vtt: "VTT", sourceLang: "Spoken language", autoDetect: "Auto-detect", generate: "Generate subtitles" },
  tiktok: { pickPreset: "Pick a caption preset", classic: "Classic", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Big & Bold", render: "Render captioned video" },
  pricing: { monthly: "Monthly", annual: "Annual", saveBadge: "Save ~30%" },
};

const fr: ToolUiStrings = {
  translate: { sourceLang: "Langue source", targetLang: "Langue cible", autoDetect: "Détection auto", translateNow: "Traduire", helper: "Nous traduisons chaque ligne en préservant le timing d'origine." },
  chapters: { uploadOrPaste: "Téléversez un SRT/VTT ou collez votre transcript", pasteHere: "Collez votre transcript ici…", generate: "Générer les chapitres", copy: "Copier les chapitres", copied: "Copié !", chaptersTitle: "Vos chapitres YouTube" },
  batch: { selectTargets: "Choisissez les langues cibles", atLeast2: "Sélectionnez au moins une langue.", translating: "Traduction…", allDone: "Toutes les traductions sont prêtes", perLanguage: "Par langue" },
  autoSync: { videoFile: "Fichier vidéo ou audio", subtitleFile: "Fichier SRT ou VTT", bothNeeded: "Les deux fichiers sont requis — l'audio sert de référence.", align: "Aligner avec l'IA" },
  extract: { selectTracks: "Pistes de sous-titres trouvées", noTracks: "Aucune piste de sous-titres trouvée.", track: "Piste" },
  burnIn: { videoFile: "Fichier vidéo", subtitleFile: "Fichier de sous-titres", style: "Style des sous-titres", customise: "Personnaliser l'apparence", burnNow: "Incruster les sous-titres" },
  style: { font: "Police", size: "Taille", color: "Couleur du texte", outline: "Couleur du contour", outlineWidth: "Épaisseur du contour", position: "Position", align: "Alignement", bold: "Gras", italic: "Italique", top: "Haut", middle: "Centre", bottom: "Bas", preview: "Aperçu", previewText: "Le vif renard brun saute sur le chien paresseux", download: "Télécharger le fichier stylé" },
  generator: { outputFormat: "Format de sortie", srt: "SRT", vtt: "VTT", sourceLang: "Langue parlée", autoDetect: "Détection auto", generate: "Générer les sous-titres" },
  tiktok: { pickPreset: "Choisir un style", classic: "Classique", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Gros & Gras", render: "Générer la vidéo sous-titrée" },
  pricing: { monthly: "Mensuel", annual: "Annuel", saveBadge: "Économisez ~30 %" },
};

const es: ToolUiStrings = {
  translate: { sourceLang: "Idioma de origen", targetLang: "Idioma de destino", autoDetect: "Detección automática", translateNow: "Traducir", helper: "Traducimos cada línea preservando el timing original." },
  chapters: { uploadOrPaste: "Sube un SRT/VTT o pega tu transcripción", pasteHere: "Pega tu transcripción aquí…", generate: "Generar capítulos", copy: "Copiar capítulos", copied: "¡Copiado!", chaptersTitle: "Tus capítulos de YouTube" },
  batch: { selectTargets: "Elige los idiomas de destino", atLeast2: "Selecciona al menos un idioma.", translating: "Traduciendo…", allDone: "Todas las traducciones están listas", perLanguage: "Por idioma" },
  autoSync: { videoFile: "Archivo de vídeo o audio", subtitleFile: "Archivo SRT o VTT", bothNeeded: "Ambos archivos son necesarios — el audio es la referencia.", align: "Alinear con IA" },
  extract: { selectTracks: "Pistas de subtítulos encontradas", noTracks: "No se encontraron pistas de subtítulos.", track: "Pista" },
  burnIn: { videoFile: "Archivo de vídeo", subtitleFile: "Archivo de subtítulos", style: "Estilo de subtítulos", customise: "Personalizar el diseño", burnNow: "Incrustar subtítulos" },
  style: { font: "Fuente", size: "Tamaño", color: "Color del texto", outline: "Color del contorno", outlineWidth: "Grosor del contorno", position: "Posición", align: "Alineación", bold: "Negrita", italic: "Cursiva", top: "Arriba", middle: "Medio", bottom: "Abajo", preview: "Vista previa", previewText: "El veloz murciélago hindú comía feliz cardillo y kiwi", download: "Descargar archivo con estilo" },
  generator: { outputFormat: "Formato de salida", srt: "SRT", vtt: "VTT", sourceLang: "Idioma hablado", autoDetect: "Detección automática", generate: "Generar subtítulos" },
  tiktok: { pickPreset: "Elige un estilo", classic: "Clásico", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Grande y negrita", render: "Renderizar vídeo con subtítulos" },
  pricing: { monthly: "Mensual", annual: "Anual", saveBadge: "Ahorra ~30 %" },
};

const pt: ToolUiStrings = {
  translate: { sourceLang: "Idioma de origem", targetLang: "Idioma de destino", autoDetect: "Detecção automática", translateNow: "Traduzir", helper: "Traduzimos cada linha preservando o timing original." },
  chapters: { uploadOrPaste: "Envie um SRT/VTT ou cole sua transcrição", pasteHere: "Cole sua transcrição aqui…", generate: "Gerar capítulos", copy: "Copiar capítulos", copied: "Copiado!", chaptersTitle: "Seus capítulos do YouTube" },
  batch: { selectTargets: "Escolha os idiomas de destino", atLeast2: "Selecione pelo menos um idioma.", translating: "Traduzindo…", allDone: "Todas as traduções estão prontas", perLanguage: "Por idioma" },
  autoSync: { videoFile: "Arquivo de vídeo ou áudio", subtitleFile: "Arquivo SRT ou VTT", bothNeeded: "Ambos os arquivos são necessários — o áudio é a referência.", align: "Alinhar com IA" },
  extract: { selectTracks: "Faixas de legendas encontradas", noTracks: "Nenhuma faixa de legendas encontrada.", track: "Faixa" },
  burnIn: { videoFile: "Arquivo de vídeo", subtitleFile: "Arquivo de legendas", style: "Estilo das legendas", customise: "Personalizar a aparência", burnNow: "Incorporar legendas" },
  style: { font: "Fonte", size: "Tamanho", color: "Cor do texto", outline: "Cor do contorno", outlineWidth: "Espessura do contorno", position: "Posição", align: "Alinhamento", bold: "Negrito", italic: "Itálico", top: "Topo", middle: "Meio", bottom: "Base", preview: "Pré-visualização", previewText: "A rápida raposa marrom pula sobre o cão preguiçoso", download: "Baixar arquivo estilizado" },
  generator: { outputFormat: "Formato de saída", srt: "SRT", vtt: "VTT", sourceLang: "Idioma falado", autoDetect: "Detecção automática", generate: "Gerar legendas" },
  tiktok: { pickPreset: "Escolha um estilo", classic: "Clássico", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Grande e Negrito", render: "Renderizar vídeo legendado" },
  pricing: { monthly: "Mensal", annual: "Anual", saveBadge: "Economize ~30%" },
};

const de: ToolUiStrings = {
  translate: { sourceLang: "Quellsprache", targetLang: "Zielsprache", autoDetect: "Auto-erkennen", translateNow: "Übersetzen", helper: "Wir übersetzen jede Zeile und behalten das ursprüngliche Timing." },
  chapters: { uploadOrPaste: "SRT/VTT hochladen oder Transkript einfügen", pasteHere: "Transkript hier einfügen…", generate: "Kapitel erzeugen", copy: "Kapitel kopieren", copied: "Kopiert!", chaptersTitle: "Deine YouTube-Kapitel" },
  batch: { selectTargets: "Zielsprachen wählen", atLeast2: "Wähle mindestens eine Sprache.", translating: "Übersetze…", allDone: "Alle Übersetzungen sind fertig", perLanguage: "Pro Sprache" },
  autoSync: { videoFile: "Video- oder Audiodatei", subtitleFile: "SRT- oder VTT-Datei", bothNeeded: "Beide Dateien werden benötigt — das Audio ist die Referenz.", align: "Mit KI ausrichten" },
  extract: { selectTracks: "Untertitelspuren gefunden", noTracks: "Keine Untertitelspuren gefunden.", track: "Spur" },
  burnIn: { videoFile: "Videodatei", subtitleFile: "Untertiteldatei", style: "Untertitelstil", customise: "Erscheinungsbild anpassen", burnNow: "Untertitel einbrennen" },
  style: { font: "Schrift", size: "Größe", color: "Textfarbe", outline: "Kontur-Farbe", outlineWidth: "Kontur-Stärke", position: "Position", align: "Ausrichtung", bold: "Fett", italic: "Kursiv", top: "Oben", middle: "Mitte", bottom: "Unten", preview: "Vorschau", previewText: "Falsches Üben von Xylophonmusik quält jeden größeren Zwerg", download: "Stylierte Datei herunterladen" },
  generator: { outputFormat: "Ausgabeformat", srt: "SRT", vtt: "VTT", sourceLang: "Gesprochene Sprache", autoDetect: "Auto-erkennen", generate: "Untertitel erzeugen" },
  tiktok: { pickPreset: "Style wählen", classic: "Klassisch", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Groß & Fett", render: "Untertiteltes Video rendern" },
  pricing: { monthly: "Monatlich", annual: "Jährlich", saveBadge: "Spare ~30 %" },
};

const it: ToolUiStrings = {
  translate: { sourceLang: "Lingua di origine", targetLang: "Lingua di destinazione", autoDetect: "Rilevamento automatico", translateNow: "Traduci", helper: "Traduciamo ogni riga mantenendo il timing originale." },
  chapters: { uploadOrPaste: "Carica un SRT/VTT o incolla la trascrizione", pasteHere: "Incolla la trascrizione qui…", generate: "Genera capitoli", copy: "Copia capitoli", copied: "Copiato!", chaptersTitle: "I tuoi capitoli YouTube" },
  batch: { selectTargets: "Scegli le lingue di destinazione", atLeast2: "Seleziona almeno una lingua.", translating: "Traduzione…", allDone: "Tutte le traduzioni sono pronte", perLanguage: "Per lingua" },
  autoSync: { videoFile: "File video o audio", subtitleFile: "File SRT o VTT", bothNeeded: "Servono entrambi i file — l'audio è il riferimento.", align: "Allinea con IA" },
  extract: { selectTracks: "Tracce di sottotitoli trovate", noTracks: "Nessuna traccia di sottotitoli trovata.", track: "Traccia" },
  burnIn: { videoFile: "File video", subtitleFile: "File sottotitoli", style: "Stile sottotitoli", customise: "Personalizza l'aspetto", burnNow: "Incidi i sottotitoli" },
  style: { font: "Font", size: "Dimensione", color: "Colore testo", outline: "Colore contorno", outlineWidth: "Spessore contorno", position: "Posizione", align: "Allineamento", bold: "Grassetto", italic: "Corsivo", top: "Alto", middle: "Centro", bottom: "Basso", preview: "Anteprima", previewText: "Ma la volpe, col suo balzo, ha raggiunto il quieto Fido", download: "Scarica file con stile" },
  generator: { outputFormat: "Formato di output", srt: "SRT", vtt: "VTT", sourceLang: "Lingua parlata", autoDetect: "Rilevamento automatico", generate: "Genera sottotitoli" },
  tiktok: { pickPreset: "Scegli uno stile", classic: "Classico", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Grande & Grassetto", render: "Renderizza video sottotitolato" },
  pricing: { monthly: "Mensile", annual: "Annuale", saveBadge: "Risparmia ~30 %" },
};

const nl: ToolUiStrings = {
  translate: { sourceLang: "Brontaal", targetLang: "Doeltaal", autoDetect: "Auto-detect", translateNow: "Vertalen", helper: "We vertalen elke regel met behoud van de oorspronkelijke timing." },
  chapters: { uploadOrPaste: "Upload een SRT/VTT of plak je transcript", pasteHere: "Plak je transcript hier…", generate: "Hoofdstukken genereren", copy: "Hoofdstukken kopiëren", copied: "Gekopieerd!", chaptersTitle: "Je YouTube-hoofdstukken" },
  batch: { selectTargets: "Kies de doeltalen", atLeast2: "Selecteer minstens één taal.", translating: "Vertalen…", allDone: "Alle vertalingen zijn klaar", perLanguage: "Per taal" },
  autoSync: { videoFile: "Video- of audiobestand", subtitleFile: "SRT- of VTT-bestand", bothNeeded: "Beide bestanden zijn nodig — de audio is de referentie.", align: "Uitlijnen met AI" },
  extract: { selectTracks: "Ondertitelsporen gevonden", noTracks: "Geen ondertitelsporen gevonden.", track: "Spoor" },
  burnIn: { videoFile: "Videobestand", subtitleFile: "Ondertitelbestand", style: "Ondertitelstijl", customise: "Look aanpassen", burnNow: "Ondertitels inbranden" },
  style: { font: "Lettertype", size: "Grootte", color: "Tekstkleur", outline: "Omtrekkleur", outlineWidth: "Omtrekdikte", position: "Positie", align: "Uitlijning", bold: "Vet", italic: "Cursief", top: "Boven", middle: "Midden", bottom: "Onder", preview: "Voorbeeld", previewText: "De snelle bruine vos springt over de luie hond", download: "Gestyled bestand downloaden" },
  generator: { outputFormat: "Uitvoerformaat", srt: "SRT", vtt: "VTT", sourceLang: "Gesproken taal", autoDetect: "Auto-detect", generate: "Ondertitels genereren" },
  tiktok: { pickPreset: "Kies een stijl", classic: "Klassiek", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Groot & Vet", render: "Video met ondertitels renderen" },
  pricing: { monthly: "Maandelijks", annual: "Jaarlijks", saveBadge: "Bespaar ~30 %" },
};

const ja: ToolUiStrings = {
  translate: { sourceLang: "ソース言語", targetLang: "ターゲット言語", autoDetect: "自動検出", translateNow: "翻訳する", helper: "元のタイミングを保持したまま各行を翻訳します。" },
  chapters: { uploadOrPaste: "SRT/VTT をアップロードするか、トランスクリプトを貼り付け", pasteHere: "ここにトランスクリプトを貼り付け…", generate: "チャプターを生成", copy: "チャプターをコピー", copied: "コピーしました！", chaptersTitle: "YouTube チャプター" },
  batch: { selectTargets: "ターゲット言語を選択", atLeast2: "少なくとも 1 つの言語を選択してください。", translating: "翻訳中…", allDone: "すべての翻訳が完了しました", perLanguage: "言語ごと" },
  autoSync: { videoFile: "動画または音声ファイル", subtitleFile: "SRT または VTT ファイル", bothNeeded: "両方のファイルが必要です — 音声がリファレンスになります。", align: "AI で同期" },
  extract: { selectTracks: "検出された字幕トラック", noTracks: "字幕トラックが見つかりませんでした。", track: "トラック" },
  burnIn: { videoFile: "動画ファイル", subtitleFile: "字幕ファイル", style: "字幕スタイル", customise: "見た目をカスタマイズ", burnNow: "字幕を焼き込み" },
  style: { font: "フォント", size: "サイズ", color: "テキストの色", outline: "縁の色", outlineWidth: "縁の太さ", position: "位置", align: "整列", bold: "太字", italic: "斜体", top: "上", middle: "中央", bottom: "下", preview: "プレビュー", previewText: "いろはにほへと ちりぬるを わかよたれそ", download: "スタイル適用ファイルをダウンロード" },
  generator: { outputFormat: "出力形式", srt: "SRT", vtt: "VTT", sourceLang: "話されている言語", autoDetect: "自動検出", generate: "字幕を生成" },
  tiktok: { pickPreset: "スタイルを選択", classic: "クラシック", karaoke: "カラオケ", popup: "ポップアップ", bigBold: "大きく太く", render: "字幕付き動画をレンダリング" },
  pricing: { monthly: "月額", annual: "年額", saveBadge: "約 30% お得" },
};

const zh: ToolUiStrings = {
  translate: { sourceLang: "源语言", targetLang: "目标语言", autoDetect: "自动检测", translateNow: "立即翻译", helper: "我们逐行翻译,保留原始时间轴。" },
  chapters: { uploadOrPaste: "上传 SRT/VTT 或粘贴转录稿", pasteHere: "在此粘贴转录稿…", generate: "生成章节", copy: "复制章节", copied: "已复制!", chaptersTitle: "您的 YouTube 章节" },
  batch: { selectTargets: "选择目标语言", atLeast2: "至少选择一种语言。", translating: "翻译中…", allDone: "所有翻译已完成", perLanguage: "每种语言" },
  autoSync: { videoFile: "视频或音频文件", subtitleFile: "SRT 或 VTT 文件", bothNeeded: "需要两个文件 — 音频作参考。", align: "用 AI 对齐" },
  extract: { selectTracks: "找到的字幕轨", noTracks: "未找到字幕轨。", track: "轨道" },
  burnIn: { videoFile: "视频文件", subtitleFile: "字幕文件", style: "字幕样式", customise: "自定义外观", burnNow: "烧录字幕" },
  style: { font: "字体", size: "字号", color: "文字颜色", outline: "描边颜色", outlineWidth: "描边粗细", position: "位置", align: "对齐", bold: "粗体", italic: "斜体", top: "顶部", middle: "中部", bottom: "底部", preview: "预览", previewText: "敏捷的棕色狐狸跳过懒狗", download: "下载样式化文件" },
  generator: { outputFormat: "输出格式", srt: "SRT", vtt: "VTT", sourceLang: "讲话语言", autoDetect: "自动检测", generate: "生成字幕" },
  tiktok: { pickPreset: "选择样式", classic: "经典", karaoke: "卡拉 OK", popup: "弹出", bigBold: "大字粗体", render: "渲染带字幕视频" },
  pricing: { monthly: "按月", annual: "按年", saveBadge: "节省约 30%" },
};

const ko: ToolUiStrings = {
  translate: { sourceLang: "원본 언어", targetLang: "대상 언어", autoDetect: "자동 감지", translateNow: "지금 번역", helper: "원본 타이밍을 유지하면서 각 줄을 번역합니다." },
  chapters: { uploadOrPaste: "SRT/VTT 업로드 또는 트랜스크립트 붙여넣기", pasteHere: "여기에 트랜스크립트 붙여넣기…", generate: "챕터 생성", copy: "챕터 복사", copied: "복사됨!", chaptersTitle: "YouTube 챕터" },
  batch: { selectTargets: "대상 언어 선택", atLeast2: "최소 1개 언어를 선택하세요.", translating: "번역 중…", allDone: "모든 번역이 완료되었습니다", perLanguage: "언어별" },
  autoSync: { videoFile: "영상 또는 오디오 파일", subtitleFile: "SRT 또는 VTT 파일", bothNeeded: "두 파일 모두 필요합니다 — 오디오가 기준.", align: "AI 로 정렬" },
  extract: { selectTracks: "발견된 자막 트랙", noTracks: "자막 트랙을 찾을 수 없습니다.", track: "트랙" },
  burnIn: { videoFile: "영상 파일", subtitleFile: "자막 파일", style: "자막 스타일", customise: "외관 사용자화", burnNow: "자막 인코딩" },
  style: { font: "글꼴", size: "크기", color: "텍스트 색상", outline: "외곽선 색상", outlineWidth: "외곽선 두께", position: "위치", align: "정렬", bold: "굵게", italic: "기울임", top: "위", middle: "가운데", bottom: "아래", preview: "미리보기", previewText: "키스의 고유조건은 입술끼리 만나야 하고", download: "스타일 적용 파일 다운로드" },
  generator: { outputFormat: "출력 형식", srt: "SRT", vtt: "VTT", sourceLang: "음성 언어", autoDetect: "자동 감지", generate: "자막 생성" },
  tiktok: { pickPreset: "스타일 선택", classic: "클래식", karaoke: "노래방", popup: "팝업", bigBold: "굵고 큼", render: "자막 영상 렌더" },
  pricing: { monthly: "월간", annual: "연간", saveBadge: "~30% 절약" },
};

const ar: ToolUiStrings = {
  translate: { sourceLang: "لغة المصدر", targetLang: "لغة الهدف", autoDetect: "اكتشاف تلقائي", translateNow: "ترجم الآن", helper: "نترجم كل سطر مع الحفاظ على التوقيت الأصلي." },
  chapters: { uploadOrPaste: "ارفع SRT/VTT أو الصق نسختك النصية", pasteHere: "ألصق نسختك النصية هنا…", generate: "أنشئ الفصول", copy: "انسخ الفصول", copied: "تم النسخ!", chaptersTitle: "فصول YouTube الخاصة بك" },
  batch: { selectTargets: "اختر لغات الهدف", atLeast2: "اختر لغة واحدة على الأقل.", translating: "جارٍ الترجمة…", allDone: "كل الترجمات جاهزة", perLanguage: "لكل لغة" },
  autoSync: { videoFile: "ملف فيديو أو صوت", subtitleFile: "ملف SRT أو VTT", bothNeeded: "يلزم كلا الملفين — الصوت هو المرجع.", align: "محاذاة بالذكاء الاصطناعي" },
  extract: { selectTracks: "مسارات الترجمة الموجودة", noTracks: "لم تُعثر على مسارات ترجمة.", track: "مسار" },
  burnIn: { videoFile: "ملف الفيديو", subtitleFile: "ملف الترجمة", style: "نمط الترجمة", customise: "تخصيص المظهر", burnNow: "احرق الترجمة" },
  style: { font: "الخط", size: "الحجم", color: "لون النص", outline: "لون الإطار", outlineWidth: "سمك الإطار", position: "الموضع", align: "المحاذاة", bold: "غامق", italic: "مائل", top: "أعلى", middle: "وسط", bottom: "أسفل", preview: "معاينة", previewText: "أكلت العين قبل أن تعرف، فطنة الذيل تخبر بالنجوم", download: "نزّل الملف المنسّق" },
  generator: { outputFormat: "صيغة الإخراج", srt: "SRT", vtt: "VTT", sourceLang: "اللغة المنطوقة", autoDetect: "اكتشاف تلقائي", generate: "أنشئ الترجمة" },
  tiktok: { pickPreset: "اختر النمط", classic: "كلاسيكي", karaoke: "كاراوكي", popup: "منبثق", bigBold: "كبير وغامق", render: "حرّر الفيديو المُترجم" },
  pricing: { monthly: "شهريًا", annual: "سنويًا", saveBadge: "وفّر ~30%" },
};

const ru: ToolUiStrings = {
  translate: { sourceLang: "Исходный язык", targetLang: "Целевой язык", autoDetect: "Автоопределение", translateNow: "Перевести", helper: "Мы переводим каждую строку, сохраняя исходный тайминг." },
  chapters: { uploadOrPaste: "Загрузите SRT/VTT или вставьте транскрипт", pasteHere: "Вставьте транскрипт сюда…", generate: "Создать главы", copy: "Скопировать главы", copied: "Скопировано!", chaptersTitle: "Ваши главы YouTube" },
  batch: { selectTargets: "Выберите целевые языки", atLeast2: "Выберите хотя бы один язык.", translating: "Перевод…", allDone: "Все переводы готовы", perLanguage: "По языку" },
  autoSync: { videoFile: "Видео или аудио файл", subtitleFile: "Файл SRT или VTT", bothNeeded: "Нужны оба файла — аудио служит эталоном.", align: "Выровнять ИИ" },
  extract: { selectTracks: "Найденные дорожки субтитров", noTracks: "Дорожек субтитров не найдено.", track: "Дорожка" },
  burnIn: { videoFile: "Видеофайл", subtitleFile: "Файл субтитров", style: "Стиль субтитров", customise: "Настроить вид", burnNow: "Вшить субтитры" },
  style: { font: "Шрифт", size: "Размер", color: "Цвет текста", outline: "Цвет обводки", outlineWidth: "Толщина обводки", position: "Положение", align: "Выравнивание", bold: "Жирный", italic: "Курсив", top: "Верх", middle: "Центр", bottom: "Низ", preview: "Превью", previewText: "Съешь же ещё этих мягких французских булок", download: "Скачать стилизованный файл" },
  generator: { outputFormat: "Формат вывода", srt: "SRT", vtt: "VTT", sourceLang: "Язык речи", autoDetect: "Автоопределение", generate: "Создать субтитры" },
  tiktok: { pickPreset: "Выберите стиль", classic: "Классика", karaoke: "Караоке", popup: "Поп-ап", bigBold: "Крупный и жирный", render: "Рендер с субтитрами" },
  pricing: { monthly: "Помесячно", annual: "Годовой", saveBadge: "Скидка ~30 %" },
};

const hi: ToolUiStrings = {
  translate: { sourceLang: "स्रोत भाषा", targetLang: "लक्ष्य भाषा", autoDetect: "स्वतः पहचान", translateNow: "अनुवाद करें", helper: "हम मूल टाइमिंग को बरकरार रखते हुए हर पंक्ति का अनुवाद करते हैं।" },
  chapters: { uploadOrPaste: "SRT/VTT अपलोड करें या अपना ट्रांसक्रिप्ट चिपकाएँ", pasteHere: "यहाँ अपना ट्रांसक्रिप्ट चिपकाएँ…", generate: "चैप्टर बनाएँ", copy: "चैप्टर कॉपी करें", copied: "कॉपी हो गया!", chaptersTitle: "आपके YouTube चैप्टर" },
  batch: { selectTargets: "लक्ष्य भाषाएँ चुनें", atLeast2: "कम से कम एक भाषा चुनें।", translating: "अनुवाद हो रहा है…", allDone: "सभी अनुवाद तैयार हैं", perLanguage: "प्रति भाषा" },
  autoSync: { videoFile: "वीडियो या ऑडियो फ़ाइल", subtitleFile: "SRT या VTT फ़ाइल", bothNeeded: "दोनों फ़ाइलें ज़रूरी हैं — ऑडियो संदर्भ है।", align: "AI से संरेखित करें" },
  extract: { selectTracks: "मिले हुए सबटाइटल ट्रैक", noTracks: "कोई सबटाइटल ट्रैक नहीं मिला।", track: "ट्रैक" },
  burnIn: { videoFile: "वीडियो फ़ाइल", subtitleFile: "सबटाइटल फ़ाइल", style: "सबटाइटल शैली", customise: "रूप कस्टमाइज़ करें", burnNow: "सबटाइटल बर्न करें" },
  style: { font: "फ़ॉन्ट", size: "आकार", color: "टेक्स्ट का रंग", outline: "आउटलाइन रंग", outlineWidth: "आउटलाइन मोटाई", position: "स्थिति", align: "संरेखण", bold: "बोल्ड", italic: "तिरछा", top: "ऊपर", middle: "मध्य", bottom: "नीचे", preview: "पूर्वावलोकन", previewText: "किसी भी आदमी की किस्मत बदल सकती है", download: "स्टाइल वाली फ़ाइल डाउनलोड करें" },
  generator: { outputFormat: "आउटपुट प्रारूप", srt: "SRT", vtt: "VTT", sourceLang: "बोली जाने वाली भाषा", autoDetect: "स्वतः पहचान", generate: "सबटाइटल बनाएँ" },
  tiktok: { pickPreset: "शैली चुनें", classic: "क्लासिक", karaoke: "कराओके", popup: "पॉप-अप", bigBold: "बड़ा और बोल्ड", render: "सबटाइटल वाला वीडियो रेंडर करें" },
  pricing: { monthly: "मासिक", annual: "वार्षिक", saveBadge: "~30% बचत" },
};

const tr: ToolUiStrings = {
  translate: { sourceLang: "Kaynak dil", targetLang: "Hedef dil", autoDetect: "Otomatik algıla", translateNow: "Şimdi çevir", helper: "Orijinal zamanlamayı koruyarak her satırı çeviririz." },
  chapters: { uploadOrPaste: "Bir SRT/VTT yükleyin veya transkriptinizi yapıştırın", pasteHere: "Transkriptinizi buraya yapıştırın…", generate: "Bölümler oluştur", copy: "Bölümleri kopyala", copied: "Kopyalandı!", chaptersTitle: "YouTube bölümleriniz" },
  batch: { selectTargets: "Çevrilecek dilleri seçin", atLeast2: "En az bir dil seçin.", translating: "Çevriliyor…", allDone: "Tüm çeviriler hazır", perLanguage: "Dil başına" },
  autoSync: { videoFile: "Video veya ses dosyası", subtitleFile: "SRT veya VTT dosyası", bothNeeded: "Her iki dosya da gerekli — ses referanstır.", align: "AI ile hizala" },
  extract: { selectTracks: "Bulunan altyazı parçaları", noTracks: "Bu dosyada altyazı parçası bulunamadı.", track: "Parça" },
  burnIn: { videoFile: "Video dosyası", subtitleFile: "Altyazı dosyası", style: "Altyazı stili", customise: "Görünümü özelleştir", burnNow: "Altyazıları göm" },
  style: { font: "Yazı tipi", size: "Boyut", color: "Metin rengi", outline: "Kontur rengi", outlineWidth: "Kontur kalınlığı", position: "Konum", align: "Hizalama", bold: "Kalın", italic: "İtalik", top: "Üst", middle: "Orta", bottom: "Alt", preview: "Önizleme", previewText: "Pijamalı hasta yağız şoföre çabucak güvendi", download: "Stilize dosyayı indir" },
  generator: { outputFormat: "Çıktı biçimi", srt: "SRT", vtt: "VTT", sourceLang: "Konuşulan dil", autoDetect: "Otomatik algıla", generate: "Altyazı oluştur" },
  tiktok: { pickPreset: "Bir hazır ayar seçin", classic: "Klasik", karaoke: "Karaoke", popup: "Açılır", bigBold: "Büyük & Kalın", render: "Altyazılı video oluştur" },
  pricing: { monthly: "Aylık", annual: "Yıllık", saveBadge: "~%30 tasarruf" },
};

const id: ToolUiStrings = {
  translate: { sourceLang: "Bahasa sumber", targetLang: "Bahasa tujuan", autoDetect: "Deteksi otomatis", translateNow: "Terjemahkan sekarang", helper: "Kami menerjemahkan setiap baris sambil mempertahankan timing asli." },
  chapters: { uploadOrPaste: "Unggah SRT/VTT atau tempel transkrip Anda", pasteHere: "Tempel transkrip Anda di sini…", generate: "Buat bab", copy: "Salin bab", copied: "Disalin!", chaptersTitle: "Bab YouTube Anda" },
  batch: { selectTargets: "Pilih bahasa untuk diterjemahkan", atLeast2: "Pilih setidaknya satu bahasa.", translating: "Menerjemahkan…", allDone: "Semua terjemahan siap", perLanguage: "Per bahasa" },
  autoSync: { videoFile: "File video atau audio", subtitleFile: "File SRT atau VTT", bothNeeded: "Kedua file diperlukan — audio adalah referensinya.", align: "Selaraskan dengan AI" },
  extract: { selectTracks: "Trek subtitle ditemukan", noTracks: "Tidak ada trek subtitle dalam file itu.", track: "Trek" },
  burnIn: { videoFile: "File video", subtitleFile: "File subtitle", style: "Gaya subtitle", customise: "Sesuaikan tampilan", burnNow: "Sematkan subtitle" },
  style: { font: "Font", size: "Ukuran", color: "Warna teks", outline: "Warna garis luar", outlineWidth: "Tebal garis luar", position: "Posisi", align: "Perataan", bold: "Tebal", italic: "Miring", top: "Atas", middle: "Tengah", bottom: "Bawah", preview: "Pratinjau", previewText: "Rubah cokelat cepat melompati anjing malas", download: "Unduh file bergaya" },
  generator: { outputFormat: "Format keluaran", srt: "SRT", vtt: "VTT", sourceLang: "Bahasa lisan", autoDetect: "Deteksi otomatis", generate: "Buat subtitle" },
  tiktok: { pickPreset: "Pilih preset", classic: "Klasik", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Besar & Tebal", render: "Render video bersubtitle" },
  pricing: { monthly: "Bulanan", annual: "Tahunan", saveBadge: "Hemat ~30%" },
};

const vi: ToolUiStrings = {
  translate: { sourceLang: "Ngôn ngữ nguồn", targetLang: "Ngôn ngữ đích", autoDetect: "Tự động phát hiện", translateNow: "Dịch ngay", helper: "Chúng tôi dịch từng dòng trong khi giữ nguyên thời gian gốc." },
  chapters: { uploadOrPaste: "Tải lên SRT/VTT hoặc dán bản chép lời của bạn", pasteHere: "Dán bản chép lời của bạn vào đây…", generate: "Tạo chương", copy: "Sao chép chương", copied: "Đã sao chép!", chaptersTitle: "Các chương YouTube của bạn" },
  batch: { selectTargets: "Chọn ngôn ngữ để dịch", atLeast2: "Chọn ít nhất một ngôn ngữ.", translating: "Đang dịch…", allDone: "Tất cả bản dịch đã sẵn sàng", perLanguage: "Theo ngôn ngữ" },
  autoSync: { videoFile: "Tệp video hoặc âm thanh", subtitleFile: "Tệp SRT hoặc VTT", bothNeeded: "Cần cả hai tệp — âm thanh là tham chiếu.", align: "Căn chỉnh bằng AI" },
  extract: { selectTracks: "Đã tìm thấy track phụ đề", noTracks: "Không tìm thấy track phụ đề trong tệp đó.", track: "Track" },
  burnIn: { videoFile: "Tệp video", subtitleFile: "Tệp phụ đề", style: "Kiểu phụ đề", customise: "Tùy chỉnh giao diện", burnNow: "Ghi phụ đề vào" },
  style: { font: "Phông chữ", size: "Cỡ", color: "Màu chữ", outline: "Màu viền", outlineWidth: "Độ dày viền", position: "Vị trí", align: "Căn lề", bold: "Đậm", italic: "Nghiêng", top: "Trên", middle: "Giữa", bottom: "Dưới", preview: "Xem trước", previewText: "Con cáo nâu nhanh nhẹn nhảy qua con chó lười", download: "Tải tệp đã tạo kiểu" },
  generator: { outputFormat: "Định dạng đầu ra", srt: "SRT", vtt: "VTT", sourceLang: "Ngôn ngữ nói", autoDetect: "Tự động phát hiện", generate: "Tạo phụ đề" },
  tiktok: { pickPreset: "Chọn mẫu", classic: "Cổ điển", karaoke: "Karaoke", popup: "Bật lên", bigBold: "To & Đậm", render: "Kết xuất video có phụ đề" },
  pricing: { monthly: "Hàng tháng", annual: "Hàng năm", saveBadge: "Tiết kiệm ~30%" },
};

const sv: ToolUiStrings = {
  translate: { sourceLang: "Källspråk", targetLang: "Målspråk", autoDetect: "Identifiera automatiskt", translateNow: "Översätt nu", helper: "Vi översätter varje rad och behåller den ursprungliga timingen." },
  chapters: { uploadOrPaste: "Ladda upp en SRT/VTT eller klistra in din transkription", pasteHere: "Klistra in din transkription här…", generate: "Generera kapitel", copy: "Kopiera kapitel", copied: "Kopierat!", chaptersTitle: "Dina YouTube-kapitel" },
  batch: { selectTargets: "Välj språk att översätta till", atLeast2: "Välj minst ett språk.", translating: "Översätter…", allDone: "Alla översättningar är klara", perLanguage: "Per språk" },
  autoSync: { videoFile: "Video- eller ljudfil", subtitleFile: "SRT- eller VTT-fil", bothNeeded: "Båda filerna krävs — ljudet är referensen.", align: "Justera med AI" },
  extract: { selectTracks: "Hittade undertextspår", noTracks: "Inga undertextspår hittades i filen.", track: "Spår" },
  burnIn: { videoFile: "Videofil", subtitleFile: "Undertextfil", style: "Undertextstil", customise: "Anpassa utseendet", burnNow: "Bränn in undertexter" },
  style: { font: "Typsnitt", size: "Storlek", color: "Textfärg", outline: "Konturfärg", outlineWidth: "Konturbredd", position: "Position", align: "Justering", bold: "Fet", italic: "Kursiv", top: "Topp", middle: "Mitten", bottom: "Botten", preview: "Förhandsgranska", previewText: "Flygande bäckasiner söka hwila på mjuka tuvor", download: "Ladda ner stylad fil" },
  generator: { outputFormat: "Utdataformat", srt: "SRT", vtt: "VTT", sourceLang: "Talat språk", autoDetect: "Identifiera automatiskt", generate: "Generera undertexter" },
  tiktok: { pickPreset: "Välj en förinställning", classic: "Klassisk", karaoke: "Karaoke", popup: "Popup", bigBold: "Stor & Fet", render: "Rendera textad video" },
  pricing: { monthly: "Månadsvis", annual: "Årsvis", saveBadge: "Spara ~30 %" },
};

const pl: ToolUiStrings = {
  translate: { sourceLang: "Język źródłowy", targetLang: "Język docelowy", autoDetect: "Wykryj automatycznie", translateNow: "Przetłumacz teraz", helper: "Tłumaczymy każdy wiersz, zachowując oryginalne czasy." },
  chapters: { uploadOrPaste: "Prześlij SRT/VTT lub wklej transkrypcję", pasteHere: "Wklej transkrypcję tutaj…", generate: "Generuj rozdziały", copy: "Kopiuj rozdziały", copied: "Skopiowano!", chaptersTitle: "Twoje rozdziały YouTube" },
  batch: { selectTargets: "Wybierz języki docelowe", atLeast2: "Wybierz co najmniej jeden język.", translating: "Tłumaczenie…", allDone: "Wszystkie tłumaczenia gotowe", perLanguage: "Na język" },
  autoSync: { videoFile: "Plik wideo lub audio", subtitleFile: "Plik SRT lub VTT", bothNeeded: "Oba pliki są wymagane — dźwięk jest punktem odniesienia.", align: "Wyrównaj z AI" },
  extract: { selectTracks: "Znalezione ścieżki napisów", noTracks: "Nie znaleziono ścieżek napisów w tym pliku.", track: "Ścieżka" },
  burnIn: { videoFile: "Plik wideo", subtitleFile: "Plik napisów", style: "Styl napisów", customise: "Dostosuj wygląd", burnNow: "Wypal napisy" },
  style: { font: "Czcionka", size: "Rozmiar", color: "Kolor tekstu", outline: "Kolor obrysu", outlineWidth: "Grubość obrysu", position: "Pozycja", align: "Wyrównanie", bold: "Pogrubienie", italic: "Kursywa", top: "Góra", middle: "Środek", bottom: "Dół", preview: "Podgląd", previewText: "Zażółć gęślą jaźń", download: "Pobierz plik ze stylem" },
  generator: { outputFormat: "Format wyjściowy", srt: "SRT", vtt: "VTT", sourceLang: "Język mówiony", autoDetect: "Wykryj automatycznie", generate: "Generuj napisy" },
  tiktok: { pickPreset: "Wybierz ustawienie", classic: "Klasyczny", karaoke: "Karaoke", popup: "Pop-up", bigBold: "Duży i pogrubiony", render: "Renderuj wideo z napisami" },
  pricing: { monthly: "Miesięcznie", annual: "Rocznie", saveBadge: "Oszczędź ~30%" },
};

const uk: ToolUiStrings = {
  translate: { sourceLang: "Мова джерела", targetLang: "Цільова мова", autoDetect: "Автовизначення", translateNow: "Перекласти зараз", helper: "Ми перекладаємо кожен рядок, зберігаючи оригінальний тайминг." },
  chapters: { uploadOrPaste: "Завантажте SRT/VTT або вставте транскрипт", pasteHere: "Вставте транскрипт сюди…", generate: "Створити розділи", copy: "Копіювати розділи", copied: "Скопійовано!", chaptersTitle: "Ваші розділи YouTube" },
  batch: { selectTargets: "Виберіть мови для перекладу", atLeast2: "Виберіть принаймні одну мову.", translating: "Переклад…", allDone: "Усі переклади готові", perLanguage: "На мову" },
  autoSync: { videoFile: "Відео- або аудіофайл", subtitleFile: "Файл SRT або VTT", bothNeeded: "Потрібні обидва файли — аудіо є еталоном.", align: "Вирівняти з AI" },
  extract: { selectTracks: "Знайдені доріжки субтитрів", noTracks: "У цьому файлі не знайдено доріжок субтитрів.", track: "Доріжка" },
  burnIn: { videoFile: "Відеофайл", subtitleFile: "Файл субтитрів", style: "Стиль субтитрів", customise: "Налаштувати вигляд", burnNow: "Вшити субтитри" },
  style: { font: "Шрифт", size: "Розмір", color: "Колір тексту", outline: "Колір обведення", outlineWidth: "Товщина обведення", position: "Позиція", align: "Вирівнювання", bold: "Жирний", italic: "Курсив", top: "Угорі", middle: "Посередині", bottom: "Внизу", preview: "Перегляд", previewText: "Жебракують філософи при ґанку церкви в Гадячі", download: "Завантажити стилізований файл" },
  generator: { outputFormat: "Формат виводу", srt: "SRT", vtt: "VTT", sourceLang: "Мова мовлення", autoDetect: "Автовизначення", generate: "Створити субтитри" },
  tiktok: { pickPreset: "Виберіть пресет", classic: "Класичний", karaoke: "Караоке", popup: "Спливаючий", bigBold: "Великий і жирний", render: "Рендер відео із субтитрами" },
  pricing: { monthly: "Щомісяця", annual: "Щороку", saveBadge: "Економія ~30 %" },
};

const cs: ToolUiStrings = {
  translate: { sourceLang: "Zdrojový jazyk", targetLang: "Cílový jazyk", autoDetect: "Automatická detekce", translateNow: "Přeložit nyní", helper: "Překládáme každý řádek a zachováváme původní časování." },
  chapters: { uploadOrPaste: "Nahrajte SRT/VTT nebo vložte přepis", pasteHere: "Vložte přepis sem…", generate: "Vytvořit kapitoly", copy: "Kopírovat kapitoly", copied: "Zkopírováno!", chaptersTitle: "Vaše kapitoly YouTube" },
  batch: { selectTargets: "Vyberte cílové jazyky", atLeast2: "Vyberte alespoň jeden jazyk.", translating: "Překládání…", allDone: "Všechny překlady jsou hotové", perLanguage: "Na jazyk" },
  autoSync: { videoFile: "Video nebo audio soubor", subtitleFile: "Soubor SRT nebo VTT", bothNeeded: "Jsou potřeba oba soubory — zvuk je referencí.", align: "Zarovnat pomocí AI" },
  extract: { selectTracks: "Nalezené stopy titulků", noTracks: "V tomto souboru nebyly nalezeny žádné stopy titulků.", track: "Stopa" },
  burnIn: { videoFile: "Video soubor", subtitleFile: "Soubor titulků", style: "Styl titulků", customise: "Přizpůsobit vzhled", burnNow: "Vypálit titulky" },
  style: { font: "Písmo", size: "Velikost", color: "Barva textu", outline: "Barva obrysu", outlineWidth: "Tloušťka obrysu", position: "Pozice", align: "Zarovnání", bold: "Tučné", italic: "Kurzíva", top: "Nahoře", middle: "Uprostřed", bottom: "Dole", preview: "Náhled", previewText: "Příliš žluťoučký kůň úpěl ďábelské ódy", download: "Stáhnout stylovaný soubor" },
  generator: { outputFormat: "Výstupní formát", srt: "SRT", vtt: "VTT", sourceLang: "Mluvený jazyk", autoDetect: "Automatická detekce", generate: "Vytvořit titulky" },
  tiktok: { pickPreset: "Vyberte předvolbu", classic: "Klasický", karaoke: "Karaoke", popup: "Vyskakovací", bigBold: "Velké a tučné", render: "Vykreslit video s titulky" },
  pricing: { monthly: "Měsíčně", annual: "Ročně", saveBadge: "Ušetřete ~30 %" },
};

// Partial<>: missing locales fall back to English via getToolUi().
export const TOOL_UI: Partial<Record<Locale, ToolUiStrings>> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi, tr, id, vi, sv, pl, uk, cs };

export function getToolUi(locale: Locale): ToolUiStrings {
  return TOOL_UI[locale] ?? en;
}

// ──────────────────────────────────────────────────────────────────────────
// CommonUi — widget chrome shared by the generic tool clients (upload zones,
// action buttons, status, privacy notes, quota + templates lines). Kept as its
// own map so adding it never touches the 20 ToolUiStrings objects above.
// ──────────────────────────────────────────────────────────────────────────
export type CommonUi = {
  uploadImage: string; dragDropPrivate: string; clickToUpload: string; accepted: string; change: string;
  convert: string; convertAgain: string; converting: string; loadingEngine: string; firstLoad: string;
  percentComplete: string; download: string; copy: string; copied: string; processing: string; working: string;
  result: string; original: string; resultPlaceholder: string; aiResultPlaceholder: string; ready: string;
  width: string; height: string; lockRatio: string; quality: string; rotate: string; conversionFailed: string;
  privacyFiles: string; privacyImage: string; privacyFfmpeg: string; privacyText: string;
  quotaAnonPrefix: string; quotaAnonLink: string; quotaFreePrefix: string; quotaFreeLink: string; unlimited: string;
  tplUpgrade: string; tplUpgradeSuffix: string; tplMine: string; tplNone: string; tplSave: string; tplSaving: string; tplNamePrompt: string;
};

const cEn: CommonUi = {
  uploadImage: "Click to upload an image", dragDropPrivate: "or drag and drop · processed privately in your browser", clickToUpload: "Click to upload", accepted: "Accepted", change: "Change",
  convert: "Convert", convertAgain: "Convert again", converting: "Converting…", loadingEngine: "Loading FFmpeg…", firstLoad: "First load is ~30 MB; cached afterwards.",
  percentComplete: "% complete", download: "Download", copy: "Copy", copied: "Copied", processing: "Processing…", working: "Working on it…",
  result: "Result", original: "Original", resultPlaceholder: "Result appears here instantly…", aiResultPlaceholder: "Your result will appear here.", ready: "Ready — your converted file is on the right.",
  width: "Width", height: "Height", lockRatio: "Lock ratio", quality: "Quality", rotate: "Rotate", conversionFailed: "Conversion failed",
  privacyFiles: "🔒 Your files are deleted automatically after download. Never stored, never shared.", privacyImage: "100% in your browser — your image is never uploaded. Free and unlimited.", privacyFfmpeg: "Processed 100% in your browser via FFmpeg WebAssembly — your file is never uploaded.", privacyText: "100% in your browser — nothing is uploaded. Free and unlimited, no account needed.",
  quotaAnonPrefix: "2 free AI runs/day —", quotaAnonLink: "Sign in for 5", quotaFreePrefix: "Free plan: 5 AI runs/day —", quotaFreeLink: "Go Pro for 500/month", unlimited: "Unlimited",
  tplUpgrade: "Upgrade to Pro", tplUpgradeSuffix: "to save your settings as reusable templates.", tplMine: "My templates", tplNone: "No templates yet.", tplSave: "Save current", tplSaving: "Saving…", tplNamePrompt: "Name this template:",
};
const cFr: CommonUi = {
  uploadImage: "Cliquez pour téléverser une image", dragDropPrivate: "ou glissez-déposez · traité en privé dans votre navigateur", clickToUpload: "Cliquez pour téléverser", accepted: "Acceptés", change: "Changer",
  convert: "Convertir", convertAgain: "Convertir à nouveau", converting: "Conversion…", loadingEngine: "Chargement de FFmpeg…", firstLoad: "Le premier chargement fait ~30 Mo ; mis en cache ensuite.",
  percentComplete: " % terminé", download: "Télécharger", copy: "Copier", copied: "Copié", processing: "Traitement…", working: "En cours…",
  result: "Résultat", original: "Original", resultPlaceholder: "Le résultat apparaît ici instantanément…", aiResultPlaceholder: "Votre résultat apparaîtra ici.", ready: "Prêt — votre fichier converti est à droite.",
  width: "Largeur", height: "Hauteur", lockRatio: "Verrouiller le ratio", quality: "Qualité", rotate: "Pivoter", conversionFailed: "Échec de la conversion",
  privacyFiles: "🔒 Vos fichiers sont supprimés automatiquement après le téléchargement. Jamais stockés, jamais partagés.", privacyImage: "100 % dans votre navigateur — votre image n'est jamais téléversée. Gratuit et illimité.", privacyFfmpeg: "Traité à 100 % dans votre navigateur via FFmpeg WebAssembly — votre fichier n'est jamais téléversé.", privacyText: "100 % dans votre navigateur — rien n'est téléversé. Gratuit et illimité, sans compte.",
  quotaAnonPrefix: "2 utilisations IA gratuites/jour —", quotaAnonLink: "Connectez-vous pour 5", quotaFreePrefix: "Offre gratuite : 5 utilisations IA/jour —", quotaFreeLink: "Passez Pro pour 500/mois", unlimited: "Illimité",
  tplUpgrade: "Passer à Pro", tplUpgradeSuffix: "pour enregistrer vos réglages comme modèles réutilisables.", tplMine: "Mes modèles", tplNone: "Aucun modèle pour l'instant.", tplSave: "Enregistrer", tplSaving: "Enregistrement…", tplNamePrompt: "Nommez ce modèle :",
};
const cEs: CommonUi = {
  uploadImage: "Haz clic para subir una imagen", dragDropPrivate: "o arrastra y suelta · procesado de forma privada en tu navegador", clickToUpload: "Haz clic para subir", accepted: "Aceptados", change: "Cambiar",
  convert: "Convertir", convertAgain: "Convertir de nuevo", converting: "Convirtiendo…", loadingEngine: "Cargando FFmpeg…", firstLoad: "La primera carga es ~30 MB; luego se almacena en caché.",
  percentComplete: " % completado", download: "Descargar", copy: "Copiar", copied: "Copiado", processing: "Procesando…", working: "Trabajando en ello…",
  result: "Resultado", original: "Original", resultPlaceholder: "El resultado aparece aquí al instante…", aiResultPlaceholder: "Tu resultado aparecerá aquí.", ready: "Listo — tu archivo convertido está a la derecha.",
  width: "Ancho", height: "Alto", lockRatio: "Bloquear proporción", quality: "Calidad", rotate: "Rotar", conversionFailed: "Error de conversión",
  privacyFiles: "🔒 Tus archivos se eliminan automáticamente tras la descarga. Nunca almacenados, nunca compartidos.", privacyImage: "100 % en tu navegador — tu imagen nunca se sube. Gratis e ilimitado.", privacyFfmpeg: "Procesado 100 % en tu navegador con FFmpeg WebAssembly — tu archivo nunca se sube.", privacyText: "100 % en tu navegador — nada se sube. Gratis e ilimitado, sin cuenta.",
  quotaAnonPrefix: "2 usos de IA gratis/día —", quotaAnonLink: "Inicia sesión para 5", quotaFreePrefix: "Plan gratis: 5 usos de IA/día —", quotaFreeLink: "Hazte Pro por 500/mes", unlimited: "Ilimitado",
  tplUpgrade: "Hazte Pro", tplUpgradeSuffix: "para guardar tus ajustes como plantillas reutilizables.", tplMine: "Mis plantillas", tplNone: "Aún no hay plantillas.", tplSave: "Guardar actual", tplSaving: "Guardando…", tplNamePrompt: "Nombra esta plantilla:",
};
const cPt: CommonUi = {
  uploadImage: "Clique para enviar uma imagem", dragDropPrivate: "ou arraste e solte · processado de forma privada no seu navegador", clickToUpload: "Clique para enviar", accepted: "Aceitos", change: "Trocar",
  convert: "Converter", convertAgain: "Converter novamente", converting: "Convertendo…", loadingEngine: "Carregando FFmpeg…", firstLoad: "O primeiro carregamento tem ~30 MB; depois fica em cache.",
  percentComplete: "% concluído", download: "Baixar", copy: "Copiar", copied: "Copiado", processing: "Processando…", working: "Trabalhando nisso…",
  result: "Resultado", original: "Original", resultPlaceholder: "O resultado aparece aqui instantaneamente…", aiResultPlaceholder: "Seu resultado aparecerá aqui.", ready: "Pronto — seu arquivo convertido está à direita.",
  width: "Largura", height: "Altura", lockRatio: "Travar proporção", quality: "Qualidade", rotate: "Girar", conversionFailed: "Falha na conversão",
  privacyFiles: "🔒 Seus arquivos são excluídos automaticamente após o download. Nunca armazenados, nunca compartilhados.", privacyImage: "100% no seu navegador — sua imagem nunca é enviada. Grátis e ilimitado.", privacyFfmpeg: "Processado 100% no seu navegador via FFmpeg WebAssembly — seu arquivo nunca é enviado.", privacyText: "100% no seu navegador — nada é enviado. Grátis e ilimitado, sem conta.",
  quotaAnonPrefix: "2 usos de IA grátis/dia —", quotaAnonLink: "Entre para 5", quotaFreePrefix: "Plano grátis: 5 usos de IA/dia —", quotaFreeLink: "Seja Pro por 500/mês", unlimited: "Ilimitado",
  tplUpgrade: "Seja Pro", tplUpgradeSuffix: "para salvar suas configurações como modelos reutilizáveis.", tplMine: "Meus modelos", tplNone: "Ainda sem modelos.", tplSave: "Salvar atual", tplSaving: "Salvando…", tplNamePrompt: "Dê um nome a este modelo:",
};
const cDe: CommonUi = {
  uploadImage: "Zum Hochladen eines Bildes klicken", dragDropPrivate: "oder per Drag & Drop · privat in deinem Browser verarbeitet", clickToUpload: "Zum Hochladen klicken", accepted: "Akzeptiert", change: "Ändern",
  convert: "Konvertieren", convertAgain: "Erneut konvertieren", converting: "Konvertiere…", loadingEngine: "FFmpeg wird geladen…", firstLoad: "Erster Ladevorgang ~30 MB; danach im Cache.",
  percentComplete: " % fertig", download: "Herunterladen", copy: "Kopieren", copied: "Kopiert", processing: "Verarbeite…", working: "Wird bearbeitet…",
  result: "Ergebnis", original: "Original", resultPlaceholder: "Das Ergebnis erscheint hier sofort…", aiResultPlaceholder: "Dein Ergebnis erscheint hier.", ready: "Fertig — deine konvertierte Datei ist rechts.",
  width: "Breite", height: "Höhe", lockRatio: "Seitenverhältnis sperren", quality: "Qualität", rotate: "Drehen", conversionFailed: "Konvertierung fehlgeschlagen",
  privacyFiles: "🔒 Deine Dateien werden nach dem Download automatisch gelöscht. Nie gespeichert, nie geteilt.", privacyImage: "100 % in deinem Browser — dein Bild wird nie hochgeladen. Kostenlos und unbegrenzt.", privacyFfmpeg: "Zu 100 % in deinem Browser via FFmpeg WebAssembly verarbeitet — deine Datei wird nie hochgeladen.", privacyText: "100 % in deinem Browser — nichts wird hochgeladen. Kostenlos und unbegrenzt, ohne Konto.",
  quotaAnonPrefix: "2 kostenlose KI-Läufe/Tag —", quotaAnonLink: "Anmelden für 5", quotaFreePrefix: "Gratis-Plan: 5 KI-Läufe/Tag —", quotaFreeLink: "Pro für 500/Monat", unlimited: "Unbegrenzt",
  tplUpgrade: "Auf Pro upgraden", tplUpgradeSuffix: "um deine Einstellungen als wiederverwendbare Vorlagen zu speichern.", tplMine: "Meine Vorlagen", tplNone: "Noch keine Vorlagen.", tplSave: "Aktuelle speichern", tplSaving: "Speichern…", tplNamePrompt: "Benenne diese Vorlage:",
};
const cIt: CommonUi = {
  uploadImage: "Clicca per caricare un'immagine", dragDropPrivate: "o trascina qui · elaborato in privato nel tuo browser", clickToUpload: "Clicca per caricare", accepted: "Accettati", change: "Cambia",
  convert: "Converti", convertAgain: "Converti di nuovo", converting: "Conversione…", loadingEngine: "Caricamento di FFmpeg…", firstLoad: "Il primo caricamento è ~30 MB; poi in cache.",
  percentComplete: "% completato", download: "Scarica", copy: "Copia", copied: "Copiato", processing: "Elaborazione…", working: "Sto lavorando…",
  result: "Risultato", original: "Originale", resultPlaceholder: "Il risultato appare qui all'istante…", aiResultPlaceholder: "Il tuo risultato apparirà qui.", ready: "Pronto — il file convertito è a destra.",
  width: "Larghezza", height: "Altezza", lockRatio: "Blocca proporzioni", quality: "Qualità", rotate: "Ruota", conversionFailed: "Conversione non riuscita",
  privacyFiles: "🔒 I tuoi file vengono eliminati automaticamente dopo il download. Mai memorizzati, mai condivisi.", privacyImage: "100% nel tuo browser — la tua immagine non viene mai caricata. Gratis e illimitato.", privacyFfmpeg: "Elaborato al 100% nel tuo browser con FFmpeg WebAssembly — il tuo file non viene mai caricato.", privacyText: "100% nel tuo browser — nulla viene caricato. Gratis e illimitato, senza account.",
  quotaAnonPrefix: "2 usi IA gratis/giorno —", quotaAnonLink: "Accedi per 5", quotaFreePrefix: "Piano gratis: 5 usi IA/giorno —", quotaFreeLink: "Passa a Pro per 500/mese", unlimited: "Illimitato",
  tplUpgrade: "Passa a Pro", tplUpgradeSuffix: "per salvare le impostazioni come modelli riutilizzabili.", tplMine: "I miei modelli", tplNone: "Ancora nessun modello.", tplSave: "Salva attuale", tplSaving: "Salvataggio…", tplNamePrompt: "Dai un nome a questo modello:",
};
const cNl: CommonUi = {
  uploadImage: "Klik om een afbeelding te uploaden", dragDropPrivate: "of sleep hierheen · privé verwerkt in je browser", clickToUpload: "Klik om te uploaden", accepted: "Geaccepteerd", change: "Wijzigen",
  convert: "Converteren", convertAgain: "Opnieuw converteren", converting: "Converteren…", loadingEngine: "FFmpeg laden…", firstLoad: "Eerste keer laden is ~30 MB; daarna gecachet.",
  percentComplete: "% voltooid", download: "Downloaden", copy: "Kopiëren", copied: "Gekopieerd", processing: "Verwerken…", working: "Bezig…",
  result: "Resultaat", original: "Origineel", resultPlaceholder: "Het resultaat verschijnt hier direct…", aiResultPlaceholder: "Je resultaat verschijnt hier.", ready: "Klaar — je geconverteerde bestand staat rechts.",
  width: "Breedte", height: "Hoogte", lockRatio: "Verhouding vergrendelen", quality: "Kwaliteit", rotate: "Draaien", conversionFailed: "Conversie mislukt",
  privacyFiles: "🔒 Je bestanden worden na het downloaden automatisch verwijderd. Nooit opgeslagen, nooit gedeeld.", privacyImage: "100% in je browser — je afbeelding wordt nooit geüpload. Gratis en onbeperkt.", privacyFfmpeg: "100% in je browser verwerkt via FFmpeg WebAssembly — je bestand wordt nooit geüpload.", privacyText: "100% in je browser — niets wordt geüpload. Gratis en onbeperkt, zonder account.",
  quotaAnonPrefix: "2 gratis AI-runs/dag —", quotaAnonLink: "Log in voor 5", quotaFreePrefix: "Gratis plan: 5 AI-runs/dag —", quotaFreeLink: "Ga Pro voor 500/maand", unlimited: "Onbeperkt",
  tplUpgrade: "Upgrade naar Pro", tplUpgradeSuffix: "om je instellingen als herbruikbare sjablonen op te slaan.", tplMine: "Mijn sjablonen", tplNone: "Nog geen sjablonen.", tplSave: "Huidige opslaan", tplSaving: "Opslaan…", tplNamePrompt: "Geef dit sjabloon een naam:",
};
const cJa: CommonUi = {
  uploadImage: "クリックして画像をアップロード", dragDropPrivate: "またはドラッグ&ドロップ · ブラウザ内で非公開に処理", clickToUpload: "クリックしてアップロード", accepted: "対応形式", change: "変更",
  convert: "変換", convertAgain: "もう一度変換", converting: "変換中…", loadingEngine: "FFmpeg を読み込み中…", firstLoad: "初回読み込みは約 30 MB。以降はキャッシュされます。",
  percentComplete: "% 完了", download: "ダウンロード", copy: "コピー", copied: "コピーしました", processing: "処理中…", working: "処理しています…",
  result: "結果", original: "元", resultPlaceholder: "結果がここに即座に表示されます…", aiResultPlaceholder: "結果がここに表示されます。", ready: "準備完了 — 変換後のファイルは右側です。",
  width: "幅", height: "高さ", lockRatio: "縦横比を固定", quality: "品質", rotate: "回転", conversionFailed: "変換に失敗しました",
  privacyFiles: "🔒 ファイルはダウンロード後に自動削除されます。保存も共有も一切しません。", privacyImage: "100% ブラウザ内 — 画像はアップロードされません。無料・無制限。", privacyFfmpeg: "FFmpeg WebAssembly により 100% ブラウザ内で処理 — ファイルはアップロードされません。", privacyText: "100% ブラウザ内 — 何もアップロードされません。無料・無制限、アカウント不要。",
  quotaAnonPrefix: "無料の AI 実行 2 回/日 —", quotaAnonLink: "ログインで 5 回", quotaFreePrefix: "無料プラン：AI 実行 5 回/日 —", quotaFreeLink: "Pro で月 500 回", unlimited: "無制限",
  tplUpgrade: "Pro にアップグレード", tplUpgradeSuffix: "して設定を再利用可能なテンプレートとして保存。", tplMine: "マイテンプレート", tplNone: "まだテンプレートがありません。", tplSave: "現在の設定を保存", tplSaving: "保存中…", tplNamePrompt: "このテンプレートに名前を付けてください：",
};
const cZh: CommonUi = {
  uploadImage: "点击上传图片", dragDropPrivate: "或拖放 · 在浏览器中私密处理", clickToUpload: "点击上传", accepted: "支持格式", change: "更换",
  convert: "转换", convertAgain: "再次转换", converting: "转换中…", loadingEngine: "正在加载 FFmpeg…", firstLoad: "首次加载约 30 MB；之后会缓存。",
  percentComplete: "% 完成", download: "下载", copy: "复制", copied: "已复制", processing: "处理中…", working: "正在处理…",
  result: "结果", original: "原始", resultPlaceholder: "结果会立即显示在这里…", aiResultPlaceholder: "您的结果将显示在这里。", ready: "就绪 — 转换后的文件在右侧。",
  width: "宽度", height: "高度", lockRatio: "锁定比例", quality: "质量", rotate: "旋转", conversionFailed: "转换失败",
  privacyFiles: "🔒 文件在下载后自动删除。绝不存储,绝不分享。", privacyImage: "100% 在您的浏览器中 — 图片绝不上传。免费且无限制。", privacyFfmpeg: "通过 FFmpeg WebAssembly 100% 在浏览器中处理 — 文件绝不上传。", privacyText: "100% 在您的浏览器中 — 不上传任何内容。免费无限制,无需账户。",
  quotaAnonPrefix: "每天 2 次免费 AI —", quotaAnonLink: "登录可用 5 次", quotaFreePrefix: "免费版:每天 5 次 AI —", quotaFreeLink: "升级 Pro 每月 500 次", unlimited: "无限制",
  tplUpgrade: "升级到 Pro", tplUpgradeSuffix: "即可将设置保存为可复用模板。", tplMine: "我的模板", tplNone: "还没有模板。", tplSave: "保存当前", tplSaving: "保存中…", tplNamePrompt: "为此模板命名:",
};
const cKo: CommonUi = {
  uploadImage: "클릭하여 이미지 업로드", dragDropPrivate: "또는 드래그 앤 드롭 · 브라우저에서 비공개로 처리", clickToUpload: "클릭하여 업로드", accepted: "지원 형식", change: "변경",
  convert: "변환", convertAgain: "다시 변환", converting: "변환 중…", loadingEngine: "FFmpeg 로드 중…", firstLoad: "첫 로드는 약 30 MB이며 이후 캐시됩니다.",
  percentComplete: "% 완료", download: "다운로드", copy: "복사", copied: "복사됨", processing: "처리 중…", working: "처리하는 중…",
  result: "결과", original: "원본", resultPlaceholder: "결과가 여기에 즉시 표시됩니다…", aiResultPlaceholder: "결과가 여기에 표시됩니다.", ready: "준비됨 — 변환된 파일이 오른쪽에 있습니다.",
  width: "너비", height: "높이", lockRatio: "비율 잠금", quality: "품질", rotate: "회전", conversionFailed: "변환 실패",
  privacyFiles: "🔒 파일은 다운로드 후 자동으로 삭제됩니다. 저장하거나 공유하지 않습니다.", privacyImage: "100% 브라우저에서 — 이미지는 업로드되지 않습니다. 무료, 무제한.", privacyFfmpeg: "FFmpeg WebAssembly 로 100% 브라우저에서 처리 — 파일은 업로드되지 않습니다.", privacyText: "100% 브라우저에서 — 아무것도 업로드되지 않습니다. 무료, 무제한, 계정 불필요.",
  quotaAnonPrefix: "무료 AI 하루 2회 —", quotaAnonLink: "로그인하면 5회", quotaFreePrefix: "무료 플랜: AI 하루 5회 —", quotaFreeLink: "Pro 로 월 500회", unlimited: "무제한",
  tplUpgrade: "Pro 로 업그레이드", tplUpgradeSuffix: "하여 설정을 재사용 가능한 템플릿으로 저장하세요.", tplMine: "내 템플릿", tplNone: "아직 템플릿이 없습니다.", tplSave: "현재 저장", tplSaving: "저장 중…", tplNamePrompt: "이 템플릿의 이름을 지정하세요:",
};
const cAr: CommonUi = {
  uploadImage: "انقر لرفع صورة", dragDropPrivate: "أو اسحب وأفلت · تتم المعالجة بخصوصية في متصفحك", clickToUpload: "انقر للرفع", accepted: "المقبولة", change: "تغيير",
  convert: "تحويل", convertAgain: "تحويل مجددًا", converting: "جارٍ التحويل…", loadingEngine: "جارٍ تحميل FFmpeg…", firstLoad: "التحميل الأول نحو 30 ميجابايت؛ ثم يُخزَّن مؤقتًا.",
  percentComplete: "٪ اكتمل", download: "تنزيل", copy: "نسخ", copied: "تم النسخ", processing: "جارٍ المعالجة…", working: "جارٍ العمل…",
  result: "النتيجة", original: "الأصل", resultPlaceholder: "تظهر النتيجة هنا فورًا…", aiResultPlaceholder: "ستظهر نتيجتك هنا.", ready: "جاهز — ملفك المحوّل على اليمين.",
  width: "العرض", height: "الارتفاع", lockRatio: "قفل النسبة", quality: "الجودة", rotate: "تدوير", conversionFailed: "فشل التحويل",
  privacyFiles: "🔒 تُحذف ملفاتك تلقائيًا بعد التنزيل. لا تُخزَّن ولا تُشارك أبدًا.", privacyImage: "100% داخل متصفحك — لا تُرفع صورتك أبدًا. مجاني وبلا حدود.", privacyFfmpeg: "تتم المعالجة 100% داخل متصفحك عبر FFmpeg WebAssembly — لا يُرفع ملفك أبدًا.", privacyText: "100% داخل متصفحك — لا يُرفع أي شيء. مجاني وبلا حدود وبدون حساب.",
  quotaAnonPrefix: "تشغيلان مجانيان للذكاء الاصطناعي/يوم —", quotaAnonLink: "سجّل الدخول لـ 5", quotaFreePrefix: "الخطة المجانية: 5 تشغيلات ذكاء اصطناعي/يوم —", quotaFreeLink: "اشترك في Pro لـ 500/شهر", unlimited: "غير محدود",
  tplUpgrade: "الترقية إلى Pro", tplUpgradeSuffix: "لحفظ إعداداتك كقوالب قابلة لإعادة الاستخدام.", tplMine: "قوالبي", tplNone: "لا توجد قوالب بعد.", tplSave: "حفظ الحالي", tplSaving: "جارٍ الحفظ…", tplNamePrompt: "أعطِ اسمًا لهذا القالب:",
};
const cRu: CommonUi = {
  uploadImage: "Нажмите, чтобы загрузить изображение", dragDropPrivate: "или перетащите · обрабатывается приватно в вашем браузере", clickToUpload: "Нажмите для загрузки", accepted: "Принимаются", change: "Изменить",
  convert: "Конвертировать", convertAgain: "Конвертировать снова", converting: "Конвертация…", loadingEngine: "Загрузка FFmpeg…", firstLoad: "Первая загрузка ~30 МБ; затем кешируется.",
  percentComplete: "% готово", download: "Скачать", copy: "Копировать", copied: "Скопировано", processing: "Обработка…", working: "Работаем…",
  result: "Результат", original: "Оригинал", resultPlaceholder: "Результат появится здесь мгновенно…", aiResultPlaceholder: "Ваш результат появится здесь.", ready: "Готово — конвертированный файл справа.",
  width: "Ширина", height: "Высота", lockRatio: "Сохранять пропорции", quality: "Качество", rotate: "Повернуть", conversionFailed: "Ошибка конвертации",
  privacyFiles: "🔒 Ваши файлы удаляются автоматически после скачивания. Никогда не хранятся и не передаются.", privacyImage: "100% в вашем браузере — изображение не загружается на сервер. Бесплатно и без ограничений.", privacyFfmpeg: "Обработка на 100% в браузере через FFmpeg WebAssembly — файл не загружается на сервер.", privacyText: "100% в вашем браузере — ничего не загружается. Бесплатно, без ограничений и без аккаунта.",
  quotaAnonPrefix: "2 бесплатных запуска ИИ/день —", quotaAnonLink: "Войдите для 5", quotaFreePrefix: "Бесплатный план: 5 запусков ИИ/день —", quotaFreeLink: "Pro — 500/месяц", unlimited: "Без ограничений",
  tplUpgrade: "Перейти на Pro", tplUpgradeSuffix: "чтобы сохранять настройки как многоразовые шаблоны.", tplMine: "Мои шаблоны", tplNone: "Шаблонов пока нет.", tplSave: "Сохранить текущие", tplSaving: "Сохранение…", tplNamePrompt: "Назовите этот шаблон:",
};
const cHi: CommonUi = {
  uploadImage: "छवि अपलोड करने के लिए क्लिक करें", dragDropPrivate: "या खींचकर छोड़ें · आपके ब्राउज़र में निजी रूप से संसाधित", clickToUpload: "अपलोड करने के लिए क्लिक करें", accepted: "स्वीकृत", change: "बदलें",
  convert: "कन्वर्ट करें", convertAgain: "फिर से कन्वर्ट करें", converting: "कन्वर्ट हो रहा है…", loadingEngine: "FFmpeg लोड हो रहा है…", firstLoad: "पहली बार लोड ~30 MB; उसके बाद कैश हो जाता है।",
  percentComplete: "% पूर्ण", download: "डाउनलोड", copy: "कॉपी", copied: "कॉपी हो गया", processing: "प्रोसेस हो रहा है…", working: "काम चल रहा है…",
  result: "परिणाम", original: "मूल", resultPlaceholder: "परिणाम यहाँ तुरंत दिखता है…", aiResultPlaceholder: "आपका परिणाम यहाँ दिखेगा।", ready: "तैयार — आपकी कन्वर्ट की गई फ़ाइल दाईं ओर है।",
  width: "चौड़ाई", height: "ऊँचाई", lockRatio: "अनुपात लॉक करें", quality: "गुणवत्ता", rotate: "घुमाएँ", conversionFailed: "कन्वर्ज़न विफल",
  privacyFiles: "🔒 डाउनलोड के बाद आपकी फ़ाइलें स्वतः हट जाती हैं। कभी संग्रहीत नहीं, कभी साझा नहीं।", privacyImage: "100% आपके ब्राउज़र में — आपकी छवि कभी अपलोड नहीं होती। मुफ़्त और असीमित।", privacyFfmpeg: "FFmpeg WebAssembly के ज़रिए 100% आपके ब्राउज़र में संसाधित — आपकी फ़ाइल कभी अपलोड नहीं होती।", privacyText: "100% आपके ब्राउज़र में — कुछ भी अपलोड नहीं होता। मुफ़्त, असीमित, बिना खाता।",
  quotaAnonPrefix: "2 मुफ़्त AI उपयोग/दिन —", quotaAnonLink: "5 के लिए साइन इन करें", quotaFreePrefix: "मुफ़्त प्लान: 5 AI उपयोग/दिन —", quotaFreeLink: "500/माह के लिए Pro लें", unlimited: "असीमित",
  tplUpgrade: "Pro में अपग्रेड करें", tplUpgradeSuffix: "ताकि अपनी सेटिंग्स पुन: प्रयोज्य टेम्पलेट के रूप में सहेज सकें।", tplMine: "मेरे टेम्पलेट", tplNone: "अभी कोई टेम्पलेट नहीं।", tplSave: "वर्तमान सहेजें", tplSaving: "सहेजा जा रहा है…", tplNamePrompt: "इस टेम्पलेट को नाम दें:",
};
const cTr: CommonUi = {
  uploadImage: "Resim yüklemek için tıklayın", dragDropPrivate: "veya sürükleyip bırakın · tarayıcınızda gizlice işlenir", clickToUpload: "Yüklemek için tıklayın", accepted: "Kabul edilenler", change: "Değiştir",
  convert: "Dönüştür", convertAgain: "Tekrar dönüştür", converting: "Dönüştürülüyor…", loadingEngine: "FFmpeg yükleniyor…", firstLoad: "İlk yükleme ~30 MB; sonra önbelleğe alınır.",
  percentComplete: "% tamamlandı", download: "İndir", copy: "Kopyala", copied: "Kopyalandı", processing: "İşleniyor…", working: "Üzerinde çalışılıyor…",
  result: "Sonuç", original: "Orijinal", resultPlaceholder: "Sonuç anında burada görünür…", aiResultPlaceholder: "Sonucunuz burada görünecek.", ready: "Hazır — dönüştürülen dosyanız sağda.",
  width: "Genişlik", height: "Yükseklik", lockRatio: "Oranı kilitle", quality: "Kalite", rotate: "Döndür", conversionFailed: "Dönüştürme başarısız",
  privacyFiles: "🔒 Dosyalarınız indirildikten sonra otomatik silinir. Asla saklanmaz, asla paylaşılmaz.", privacyImage: "%100 tarayıcınızda — resminiz asla yüklenmez. Ücretsiz ve sınırsız.", privacyFfmpeg: "FFmpeg WebAssembly ile %100 tarayıcınızda işlenir — dosyanız asla yüklenmez.", privacyText: "%100 tarayıcınızda — hiçbir şey yüklenmez. Ücretsiz, sınırsız, hesapsız.",
  quotaAnonPrefix: "Günde 2 ücretsiz AI çalıştırması —", quotaAnonLink: "5 için giriş yapın", quotaFreePrefix: "Ücretsiz plan: günde 5 AI çalıştırması —", quotaFreeLink: "Ayda 500 için Pro", unlimited: "Sınırsız",
  tplUpgrade: "Pro'ya yükselt", tplUpgradeSuffix: "ayarlarınızı yeniden kullanılabilir şablonlar olarak kaydetmek için.", tplMine: "Şablonlarım", tplNone: "Henüz şablon yok.", tplSave: "Geçerli olanı kaydet", tplSaving: "Kaydediliyor…", tplNamePrompt: "Bu şablona bir ad verin:",
};
const cId: CommonUi = {
  uploadImage: "Klik untuk mengunggah gambar", dragDropPrivate: "atau seret & lepas · diproses secara pribadi di browser Anda", clickToUpload: "Klik untuk mengunggah", accepted: "Diterima", change: "Ganti",
  convert: "Konversi", convertAgain: "Konversi lagi", converting: "Mengonversi…", loadingEngine: "Memuat FFmpeg…", firstLoad: "Muat pertama ~30 MB; setelahnya di-cache.",
  percentComplete: "% selesai", download: "Unduh", copy: "Salin", copied: "Disalin", processing: "Memproses…", working: "Sedang mengerjakan…",
  result: "Hasil", original: "Asli", resultPlaceholder: "Hasil muncul di sini secara instan…", aiResultPlaceholder: "Hasil Anda akan muncul di sini.", ready: "Siap — file hasil konversi ada di kanan.",
  width: "Lebar", height: "Tinggi", lockRatio: "Kunci rasio", quality: "Kualitas", rotate: "Putar", conversionFailed: "Konversi gagal",
  privacyFiles: "🔒 File Anda otomatis dihapus setelah diunduh. Tidak pernah disimpan, tidak pernah dibagikan.", privacyImage: "100% di browser Anda — gambar Anda tidak pernah diunggah. Gratis dan tanpa batas.", privacyFfmpeg: "Diproses 100% di browser Anda via FFmpeg WebAssembly — file Anda tidak pernah diunggah.", privacyText: "100% di browser Anda — tidak ada yang diunggah. Gratis, tanpa batas, tanpa akun.",
  quotaAnonPrefix: "2 proses AI gratis/hari —", quotaAnonLink: "Masuk untuk 5", quotaFreePrefix: "Paket gratis: 5 proses AI/hari —", quotaFreeLink: "Pro untuk 500/bulan", unlimited: "Tanpa batas",
  tplUpgrade: "Tingkatkan ke Pro", tplUpgradeSuffix: "untuk menyimpan pengaturan sebagai template yang dapat dipakai ulang.", tplMine: "Template saya", tplNone: "Belum ada template.", tplSave: "Simpan saat ini", tplSaving: "Menyimpan…", tplNamePrompt: "Beri nama template ini:",
};
const cVi: CommonUi = {
  uploadImage: "Nhấp để tải lên hình ảnh", dragDropPrivate: "hoặc kéo và thả · xử lý riêng tư trong trình duyệt của bạn", clickToUpload: "Nhấp để tải lên", accepted: "Được chấp nhận", change: "Đổi",
  convert: "Chuyển đổi", convertAgain: "Chuyển đổi lại", converting: "Đang chuyển đổi…", loadingEngine: "Đang tải FFmpeg…", firstLoad: "Lần tải đầu ~30 MB; sau đó được lưu cache.",
  percentComplete: "% hoàn tất", download: "Tải xuống", copy: "Sao chép", copied: "Đã sao chép", processing: "Đang xử lý…", working: "Đang thực hiện…",
  result: "Kết quả", original: "Bản gốc", resultPlaceholder: "Kết quả xuất hiện ngay tại đây…", aiResultPlaceholder: "Kết quả của bạn sẽ xuất hiện ở đây.", ready: "Sẵn sàng — tệp đã chuyển đổi ở bên phải.",
  width: "Chiều rộng", height: "Chiều cao", lockRatio: "Khóa tỉ lệ", quality: "Chất lượng", rotate: "Xoay", conversionFailed: "Chuyển đổi thất bại",
  privacyFiles: "🔒 Tệp của bạn tự động bị xóa sau khi tải xuống. Không bao giờ lưu trữ, không bao giờ chia sẻ.", privacyImage: "100% trong trình duyệt của bạn — hình ảnh không bao giờ được tải lên. Miễn phí và không giới hạn.", privacyFfmpeg: "Xử lý 100% trong trình duyệt của bạn qua FFmpeg WebAssembly — tệp không bao giờ được tải lên.", privacyText: "100% trong trình duyệt của bạn — không tải lên bất cứ thứ gì. Miễn phí, không giới hạn, không cần tài khoản.",
  quotaAnonPrefix: "2 lượt AI miễn phí/ngày —", quotaAnonLink: "Đăng nhập để có 5", quotaFreePrefix: "Gói miễn phí: 5 lượt AI/ngày —", quotaFreeLink: "Lên Pro để có 500/tháng", unlimited: "Không giới hạn",
  tplUpgrade: "Nâng cấp lên Pro", tplUpgradeSuffix: "để lưu cài đặt thành mẫu dùng lại.", tplMine: "Mẫu của tôi", tplNone: "Chưa có mẫu nào.", tplSave: "Lưu hiện tại", tplSaving: "Đang lưu…", tplNamePrompt: "Đặt tên cho mẫu này:",
};
const cSv: CommonUi = {
  uploadImage: "Klicka för att ladda upp en bild", dragDropPrivate: "eller dra och släpp · bearbetas privat i din webbläsare", clickToUpload: "Klicka för att ladda upp", accepted: "Tillåtna", change: "Byt",
  convert: "Konvertera", convertAgain: "Konvertera igen", converting: "Konverterar…", loadingEngine: "Laddar FFmpeg…", firstLoad: "Första laddningen är ~30 MB; cachas sedan.",
  percentComplete: "% klart", download: "Ladda ner", copy: "Kopiera", copied: "Kopierat", processing: "Bearbetar…", working: "Arbetar…",
  result: "Resultat", original: "Original", resultPlaceholder: "Resultatet visas här direkt…", aiResultPlaceholder: "Ditt resultat visas här.", ready: "Klart — din konverterade fil är till höger.",
  width: "Bredd", height: "Höjd", lockRatio: "Lås proportion", quality: "Kvalitet", rotate: "Rotera", conversionFailed: "Konvertering misslyckades",
  privacyFiles: "🔒 Dina filer raderas automatiskt efter nedladdning. Lagras aldrig, delas aldrig.", privacyImage: "100 % i din webbläsare — din bild laddas aldrig upp. Gratis och obegränsat.", privacyFfmpeg: "Bearbetas 100 % i din webbläsare via FFmpeg WebAssembly — din fil laddas aldrig upp.", privacyText: "100 % i din webbläsare — inget laddas upp. Gratis, obegränsat, inget konto.",
  quotaAnonPrefix: "2 gratis AI-körningar/dag —", quotaAnonLink: "Logga in för 5", quotaFreePrefix: "Gratisplan: 5 AI-körningar/dag —", quotaFreeLink: "Bli Pro för 500/månad", unlimited: "Obegränsat",
  tplUpgrade: "Uppgradera till Pro", tplUpgradeSuffix: "för att spara dina inställningar som återanvändbara mallar.", tplMine: "Mina mallar", tplNone: "Inga mallar än.", tplSave: "Spara aktuell", tplSaving: "Sparar…", tplNamePrompt: "Namnge den här mallen:",
};
const cPl: CommonUi = {
  uploadImage: "Kliknij, aby przesłać obraz", dragDropPrivate: "lub przeciągnij i upuść · przetwarzane prywatnie w przeglądarce", clickToUpload: "Kliknij, aby przesłać", accepted: "Akceptowane", change: "Zmień",
  convert: "Konwertuj", convertAgain: "Konwertuj ponownie", converting: "Konwertowanie…", loadingEngine: "Ładowanie FFmpeg…", firstLoad: "Pierwsze ładowanie ~30 MB; potem z pamięci podręcznej.",
  percentComplete: "% ukończono", download: "Pobierz", copy: "Kopiuj", copied: "Skopiowano", processing: "Przetwarzanie…", working: "Pracuję…",
  result: "Wynik", original: "Oryginał", resultPlaceholder: "Wynik pojawia się tutaj natychmiast…", aiResultPlaceholder: "Twój wynik pojawi się tutaj.", ready: "Gotowe — przekonwertowany plik jest po prawej.",
  width: "Szerokość", height: "Wysokość", lockRatio: "Zablokuj proporcje", quality: "Jakość", rotate: "Obróć", conversionFailed: "Konwersja nie powiodła się",
  privacyFiles: "🔒 Twoje pliki są automatycznie usuwane po pobraniu. Nigdy nie przechowywane, nigdy nieudostępniane.", privacyImage: "100% w Twojej przeglądarce — obraz nigdy nie jest przesyłany. Za darmo i bez limitu.", privacyFfmpeg: "Przetwarzane w 100% w przeglądarce przez FFmpeg WebAssembly — plik nigdy nie jest przesyłany.", privacyText: "100% w Twojej przeglądarce — nic nie jest przesyłane. Za darmo, bez limitu, bez konta.",
  quotaAnonPrefix: "2 darmowe uruchomienia AI/dzień —", quotaAnonLink: "Zaloguj się, by mieć 5", quotaFreePrefix: "Plan darmowy: 5 uruchomień AI/dzień —", quotaFreeLink: "Pro za 500/miesiąc", unlimited: "Bez limitu",
  tplUpgrade: "Przejdź na Pro", tplUpgradeSuffix: "aby zapisywać ustawienia jako szablony wielokrotnego użytku.", tplMine: "Moje szablony", tplNone: "Brak szablonów.", tplSave: "Zapisz bieżące", tplSaving: "Zapisywanie…", tplNamePrompt: "Nazwij ten szablon:",
};
const cUk: CommonUi = {
  uploadImage: "Натисніть, щоб завантажити зображення", dragDropPrivate: "або перетягніть · обробляється приватно у вашому браузері", clickToUpload: "Натисніть, щоб завантажити", accepted: "Приймаються", change: "Змінити",
  convert: "Конвертувати", convertAgain: "Конвертувати знову", converting: "Конвертація…", loadingEngine: "Завантаження FFmpeg…", firstLoad: "Перше завантаження ~30 МБ; далі кешується.",
  percentComplete: "% готово", download: "Завантажити", copy: "Копіювати", copied: "Скопійовано", processing: "Обробка…", working: "Працюємо…",
  result: "Результат", original: "Оригінал", resultPlaceholder: "Результат з'явиться тут миттєво…", aiResultPlaceholder: "Ваш результат з'явиться тут.", ready: "Готово — конвертований файл праворуч.",
  width: "Ширина", height: "Висота", lockRatio: "Зафіксувати пропорції", quality: "Якість", rotate: "Повернути", conversionFailed: "Помилка конвертації",
  privacyFiles: "🔒 Ваші файли автоматично видаляються після завантаження. Ніколи не зберігаються й не передаються.", privacyImage: "100% у вашому браузері — зображення ніколи не завантажується на сервер. Безкоштовно й без обмежень.", privacyFfmpeg: "Обробка на 100% у браузері через FFmpeg WebAssembly — файл ніколи не завантажується на сервер.", privacyText: "100% у вашому браузері — нічого не завантажується. Безкоштовно, без обмежень і без акаунта.",
  quotaAnonPrefix: "2 безкоштовні запуски ШІ/день —", quotaAnonLink: "Увійдіть для 5", quotaFreePrefix: "Безкоштовний план: 5 запусків ШІ/день —", quotaFreeLink: "Pro за 500/місяць", unlimited: "Без обмежень",
  tplUpgrade: "Перейти на Pro", tplUpgradeSuffix: "щоб зберігати налаштування як багаторазові шаблони.", tplMine: "Мої шаблони", tplNone: "Шаблонів ще немає.", tplSave: "Зберегти поточні", tplSaving: "Збереження…", tplNamePrompt: "Назвіть цей шаблон:",
};
const cCs: CommonUi = {
  uploadImage: "Kliknutím nahrajete obrázek", dragDropPrivate: "nebo přetáhněte · zpracováno soukromě ve vašem prohlížeči", clickToUpload: "Kliknutím nahrajete", accepted: "Přijímané", change: "Změnit",
  convert: "Převést", convertAgain: "Převést znovu", converting: "Převádím…", loadingEngine: "Načítání FFmpeg…", firstLoad: "První načtení ~30 MB; poté z mezipaměti.",
  percentComplete: "% hotovo", download: "Stáhnout", copy: "Kopírovat", copied: "Zkopírováno", processing: "Zpracovávám…", working: "Pracuji…",
  result: "Výsledek", original: "Originál", resultPlaceholder: "Výsledek se zobrazí zde okamžitě…", aiResultPlaceholder: "Váš výsledek se zobrazí zde.", ready: "Hotovo — převedený soubor je vpravo.",
  width: "Šířka", height: "Výška", lockRatio: "Zamknout poměr", quality: "Kvalita", rotate: "Otočit", conversionFailed: "Převod se nezdařil",
  privacyFiles: "🔒 Vaše soubory se po stažení automaticky smažou. Nikdy se neukládají ani nesdílejí.", privacyImage: "100 % ve vašem prohlížeči — obrázek se nikdy nenahrává. Zdarma a bez omezení.", privacyFfmpeg: "Zpracováno 100 % ve vašem prohlížeči přes FFmpeg WebAssembly — soubor se nikdy nenahrává.", privacyText: "100 % ve vašem prohlížeči — nic se nenahrává. Zdarma, bez omezení, bez účtu.",
  quotaAnonPrefix: "2 běhy AI zdarma/den —", quotaAnonLink: "Přihlaste se pro 5", quotaFreePrefix: "Plán zdarma: 5 běhů AI/den —", quotaFreeLink: "Pro za 500/měsíc", unlimited: "Bez omezení",
  tplUpgrade: "Přejít na Pro", tplUpgradeSuffix: "pro uložení nastavení jako znovupoužitelných šablon.", tplMine: "Moje šablony", tplNone: "Zatím žádné šablony.", tplSave: "Uložit aktuální", tplSaving: "Ukládání…", tplNamePrompt: "Pojmenujte tuto šablonu:",
};

export const COMMON_UI: Partial<Record<Locale, CommonUi>> = {
  en: cEn, fr: cFr, es: cEs, pt: cPt, de: cDe, it: cIt, nl: cNl, ja: cJa, zh: cZh, ko: cKo,
  ar: cAr, ru: cRu, hi: cHi, tr: cTr, id: cId, vi: cVi, sv: cSv, pl: cPl, uk: cUk, cs: cCs,
};

export function getCommonUi(locale: Locale): CommonUi {
  return COMMON_UI[locale] ?? cEn;
}
