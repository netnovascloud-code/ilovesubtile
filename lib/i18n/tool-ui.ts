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

// Partial<>: missing locales fall back to English via getToolUi().
export const TOOL_UI: Partial<Record<Locale, ToolUiStrings>> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi };

export function getToolUi(locale: Locale): ToolUiStrings {
  return TOOL_UI[locale] ?? en;
}
