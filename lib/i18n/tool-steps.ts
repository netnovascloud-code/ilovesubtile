import type { Locale } from "@/lib/i18n/locales";

export type LocalisedStep = { title: string; body: string };
type StepsBySlug = Record<string, LocalisedStep[]>;

const fr: StepsBySlug = {
  "subtitle-generator": [
    { title: "Téléversez votre média", body: "Déposez une vidéo ou un fichier audio. MP4, MOV, MP3, WAV et plus." },
    { title: "L'IA génère les sous-titres", body: "AI transcrit l'audio avec timestamps dans plus de 30 langues." },
    { title: "Téléchargez le SRT", body: "Un fichier .srt propre prêt pour YouTube, Premiere ou tout lecteur." },
  ],
  "add-subtitles-to-video": [
    { title: "Téléversez vidéo + sous-titres", body: "Choisissez votre MP4/MOV et un fichier SRT ou VTT." },
    { title: "Choisissez un style", body: "Police, taille, couleur, position — ou gardez le style par défaut." },
    { title: "Téléchargez le MP4 sous-titré", body: "Nous rendons avec FFmpeg et vous renvoyons la vidéo finie." },
  ],
  "srt-to-vtt": [
    { title: "Déposez votre fichier .srt", body: "Ou collez le texte des sous-titres directement dans l'éditeur." },
    { title: "Conversion en navigateur", body: "La conversion s'exécute entièrement sur votre appareil — votre fichier ne le quitte jamais." },
    { title: "Téléchargez le .vtt", body: "Branchez-le à <video> ou tout lecteur HTML5." },
  ],
  "vtt-to-srt": [
    { title: "Déposez votre fichier .vtt", body: "Ou collez les cues WebVTT directement dans l'éditeur." },
    { title: "Conversion instantanée", body: "Entêtes, styles et identifiants de cue sont nettoyés automatiquement." },
    { title: "Téléchargez le .srt", body: "Prêt pour Premiere, DaVinci, YouTube — partout." },
  ],
  "translate-subtitles": [
    { title: "Téléversez le SRT ou VTT", body: "La langue source est détectée automatiquement." },
    { title: "Choisissez la langue cible", body: "De l'anglais à l'arabe en passant par le japonais." },
    { title: "Téléchargez le fichier traduit", body: "Même timing, texte traduit. Idéal pour republier à l'international." },
  ],
  "sync-subtitles": [
    { title: "Téléversez le fichier désynchronisé", body: "SRT et VTT supportés." },
    { title: "Saisissez le décalage", body: "Positif pour retarder, négatif pour avancer. Précision à la milliseconde." },
    { title: "Téléchargez le fichier corrigé", body: "Chaque cue décalé exactement — début et fin préservés." },
  ],
  "extract-subtitles": [
    { title: "Téléversez la vidéo", body: "MKV, MP4, MOV, WebM — tout ce qui contient des pistes embarquées." },
    { title: "Sélectionnez les pistes", body: "Nous listons chaque piste de sous-titres avec sa langue et son codec." },
    { title: "Téléchargez les SRT", body: "Chaque piste exportée en fichier .srt propre." },
  ],
  "subtitle-editor": [
    { title: "Chargez fichier + vidéo", body: "Déposez vos sous-titres et (optionnellement) la vidéo correspondante." },
    { title: "Éditez les cues en direct", body: "Cliquez sur une ligne, corrigez texte ou timing, visualisez dans l'aperçu." },
    { title: "Exportez", body: "Téléchargez le SRT ou VTT corrigé une fois fini." },
  ],
  "tiktok-subtitles": [
    { title: "Téléversez votre vidéo courte", body: "Verticale ou horizontale — tout format d'image." },
    { title: "Choisissez un style", body: "Karaoke, pop-up, classique — prévisualisation avant rendu." },
    { title: "Téléchargez le MP4 sous-titré", body: "Déjà stylé. Mettez-le dans votre planificateur et publiez." },
  ],
  "clean-subtitles": [
    { title: "Téléversez SRT ou VTT", body: "Nettoyage déterministe — rien d'autre n'est modifié." },
    { title: "Choisissez ce qu'il faut nettoyer", body: "[Musique], (rires), majuscules de hurlement, doubles espaces — à activer/désactiver." },
    { title: "Téléchargez le fichier nettoyé", body: "Plus léger, plus net, prêt à publier." },
  ],
  "srt-to-text": [
    { title: "Déposez votre fichier de sous-titres", body: "SRT ou VTT — les deux fonctionnent." },
    { title: "Choisissez la mise en page", body: "Une ligne par cue, paragraphes fusionnés, ou avec étiquettes de locuteur." },
    { title: "Téléchargez le .txt", body: "À utiliser comme transcript, entrée de résumé ou brouillon d'article." },
  ],
  "youtube-chapters": [
    { title: "Téléversez le transcript", body: "SRT, VTT ou texte brut." },
    { title: "L'IA détecte les chapitres", body: "Nous sélectionnons des sections sémantiques, pas des intervalles arbitraires." },
    { title: "Copiez-collez", body: "Insérez les chapitres formatés dans la description YouTube." },
  ],
  "batch-translate": [
    { title: "Téléversez votre SRT maître", body: "Choisissez la langue source ou laissez-nous la détecter." },
    { title: "Sélectionnez les langues cibles", body: "Cochez jusqu'à 30. Exécution en parallèle." },
    { title: "Téléchargez un ZIP", body: "Un SRT traduit par langue, prêt à attacher à chaque release." },
  ],
  "style-subtitles": [
    { title: "Téléversez votre SRT ou VTT", body: "Ou collez les cues directement." },
    { title: "Personnalisez les styles", body: "Police, taille, couleur, contour, ombre, alignement, position verticale." },
    { title: "Téléchargez le .ass", body: "À ouvrir dans VLC, Aegisub ou tout lecteur moderne." },
  ],
  "auto-sync": [
    { title: "Téléversez vidéo + sous-titres", body: "Les deux sont nécessaires — l'audio sert de référence." },
    { title: "L'IA réaligne chaque cue", body: "L'alignement forcé fait correspondre chaque ligne à l'instant où elle est prononcée." },
    { title: "Téléchargez un SRT synchronisé", body: "Les cues tombent maintenant exactement sur les mots prononcés." },
  ],
  api: [
    { title: "Obtenez une clé API", body: "Disponible sur le plan Business ou en pay-as-you-go." },
    { title: "POSTez votre job", body: "Endpoints REST pour chaque outil. Webhooks pour les jobs longs." },
    { title: "Recevez votre fichier", body: "Réponse JSON avec une URL de téléchargement signée." },
  ],
};

const es: StepsBySlug = {
  "subtitle-generator": [
    { title: "Sube tu medio", body: "Suelta un vídeo o un audio. MP4, MOV, MP3, WAV y más." },
    { title: "La IA genera los subtítulos", body: "AI transcribe el audio con timestamps en más de 30 idiomas." },
    { title: "Descarga el SRT", body: "Un .srt limpio listo para YouTube, Premiere o cualquier reproductor." },
  ],
  "add-subtitles-to-video": [
    { title: "Sube vídeo + subtítulos", body: "Elige tu MP4/MOV y un archivo SRT o VTT." },
    { title: "Elige un estilo", body: "Fuente, tamaño, color, posición — o deja el estilo limpio por defecto." },
    { title: "Descarga el MP4 subtitulado", body: "Renderizamos con FFmpeg y te devolvemos el vídeo terminado." },
  ],
  "srt-to-vtt": [
    { title: "Suelta tu archivo .srt", body: "O pega el texto de los subtítulos directamente en el editor." },
    { title: "Conversión en el navegador", body: "Todo ocurre en tu dispositivo — tu archivo nunca lo abandona." },
    { title: "Descarga el .vtt", body: "Conéctalo a <video> o cualquier reproductor HTML5." },
  ],
  "vtt-to-srt": [
    { title: "Suelta tu archivo .vtt", body: "O pega los cues WebVTT directamente en el editor." },
    { title: "Conversión instantánea", body: "Encabezados, estilos e identificadores de cue se limpian automáticamente." },
    { title: "Descarga el .srt", body: "Listo para Premiere, DaVinci, YouTube — donde sea." },
  ],
  "translate-subtitles": [
    { title: "Sube el SRT o VTT", body: "El idioma de origen se detecta automáticamente." },
    { title: "Elige el idioma destino", body: "Del inglés al árabe pasando por el japonés." },
    { title: "Descarga el archivo traducido", body: "Mismo timing, texto traducido. Ideal para publicar internacionalmente." },
  ],
  "sync-subtitles": [
    { title: "Sube el archivo desincronizado", body: "Soportamos SRT y VTT." },
    { title: "Introduce el desplazamiento", body: "Positivo para retrasar, negativo para adelantar. Precisión de milisegundos." },
    { title: "Descarga el archivo corregido", body: "Cada cue desplazado exacto — inicio y fin preservados." },
  ],
  "extract-subtitles": [
    { title: "Sube el vídeo", body: "MKV, MP4, MOV, WebM — cualquier cosa con pistas embebidas." },
    { title: "Selecciona las pistas", body: "Listamos cada pista de subtítulos con su idioma y códec." },
    { title: "Descarga los SRTs", body: "Cada pista exportada como un .srt limpio." },
  ],
  "subtitle-editor": [
    { title: "Carga archivo + vídeo", body: "Suelta los subtítulos y (opcional) el vídeo correspondiente." },
    { title: "Edita los cues en vivo", body: "Haz clic en una línea, ajusta texto o timing, mira la vista previa." },
    { title: "Exporta", body: "Descarga el SRT o VTT corregido cuando termines." },
  ],
  "tiktok-subtitles": [
    { title: "Sube tu vídeo corto", body: "Vertical u horizontal — cualquier proporción." },
    { title: "Elige un estilo de caption", body: "Karaoke, pop-up, clásico — vista previa antes del render." },
    { title: "Descarga el MP4 con subtítulos", body: "Ya estilizado. Súbelo a tu programador y publica." },
  ],
  "clean-subtitles": [
    { title: "Sube SRT o VTT", body: "Pasada de limpieza determinista — nada más se cambia." },
    { title: "Elige qué limpiar", body: "[Música], (risas), MAYÚSCULAS gritadas, dobles espacios — actívalos uno a uno." },
    { title: "Descarga el archivo limpio", body: "Más pequeño, más ordenado, listo para publicar." },
  ],
  "srt-to-text": [
    { title: "Suelta tu archivo de subtítulos", body: "SRT o VTT — ambos funcionan." },
    { title: "Elige el diseño", body: "Una línea por cue, párrafos fusionados, o con etiquetas de hablante." },
    { title: "Descarga el .txt", body: "Úsalo como transcripción, entrada de resumen o borrador de artículo." },
  ],
  "youtube-chapters": [
    { title: "Sube el transcript", body: "SRT, VTT o texto plano." },
    { title: "La IA encuentra los cortes", body: "Elegimos secciones con significado, no intervalos arbitrarios." },
    { title: "Copia y pega", body: "Pega los capítulos formateados en tu descripción de YouTube." },
  ],
  "batch-translate": [
    { title: "Sube tu SRT maestro", body: "Elige el idioma de origen o déjanos detectarlo." },
    { title: "Selecciona los idiomas destino", body: "Marca hasta 30. Los corremos en paralelo." },
    { title: "Descarga un ZIP", body: "Un SRT traducido por idioma, listo para cada lanzamiento." },
  ],
  "style-subtitles": [
    { title: "Sube tu SRT o VTT", body: "O pega los cues directamente." },
    { title: "Personaliza los estilos", body: "Fuente, tamaño, color, borde, sombra, alineación, posición vertical." },
    { title: "Descarga el .ass", body: "Ábrelo en VLC, Aegisub o cualquier reproductor moderno." },
  ],
  "auto-sync": [
    { title: "Sube vídeo + subtítulos", body: "Necesitamos ambos — el audio es la referencia." },
    { title: "La IA realinea cada cue", body: "Alineación forzada que ajusta cada línea al momento real en que se habla." },
    { title: "Descarga un SRT sincronizado", body: "Los cues ahora caen exactos sobre las palabras." },
  ],
  api: [
    { title: "Consigue una clave API", body: "Disponible en el plan Business o pay-as-you-go." },
    { title: "POST tu trabajo", body: "Endpoints REST para cada herramienta. Webhooks para jobs largos." },
    { title: "Recibe tu archivo", body: "Respuesta JSON con una URL de descarga firmada." },
  ],
};

const pt: StepsBySlug = {
  "subtitle-generator": [
    { title: "Envie sua mídia", body: "Solte um vídeo ou áudio. MP4, MOV, MP3, WAV e mais." },
    { title: "A IA gera as legendas", body: "AI transcreve o áudio com timestamps em mais de 30 idiomas." },
    { title: "Baixe o SRT", body: "Um .srt limpo, pronto para YouTube, Premiere ou qualquer player." },
  ],
  "add-subtitles-to-video": [
    { title: "Envie vídeo + legendas", body: "Escolha seu MP4/MOV e um arquivo SRT ou VTT." },
    { title: "Escolha um estilo", body: "Fonte, tamanho, cor, posição — ou mantenha o padrão limpo." },
    { title: "Baixe o MP4 legendado", body: "Renderizamos com FFmpeg e devolvemos o vídeo finalizado." },
  ],
  "srt-to-vtt": [
    { title: "Solte seu arquivo .srt", body: "Ou cole o texto das legendas direto no editor." },
    { title: "Conversão no navegador", body: "Tudo acontece no seu dispositivo — o arquivo nunca sai dele." },
    { title: "Baixe o .vtt", body: "Coloque no <video> ou em qualquer player HTML5." },
  ],
  "vtt-to-srt": [
    { title: "Solte seu arquivo .vtt", body: "Ou cole os cues WebVTT direto no editor." },
    { title: "Conversão instantânea", body: "Cabeçalhos, estilos e identificadores de cue limpos automaticamente." },
    { title: "Baixe o .srt", body: "Pronto para Premiere, DaVinci, YouTube — em qualquer lugar." },
  ],
  "translate-subtitles": [
    { title: "Envie o SRT ou VTT", body: "O idioma de origem é detectado automaticamente." },
    { title: "Escolha o idioma destino", body: "Do inglês ao árabe passando pelo japonês." },
    { title: "Baixe o arquivo traduzido", body: "Mesmo timing, texto traduzido. Perfeito para publicar globalmente." },
  ],
  "sync-subtitles": [
    { title: "Envie o arquivo dessincronizado", body: "Suportamos SRT e VTT." },
    { title: "Informe o deslocamento", body: "Positivo para atrasar, negativo para adiantar. Precisão de milissegundos." },
    { title: "Baixe o arquivo corrigido", body: "Cada cue deslocado exato — início e fim preservados." },
  ],
  "extract-subtitles": [
    { title: "Envie o vídeo", body: "MKV, MP4, MOV, WebM — qualquer coisa com faixas embutidas." },
    { title: "Selecione as faixas", body: "Listamos cada faixa de legenda com seu idioma e codec." },
    { title: "Baixe os SRTs", body: "Cada faixa exportada como um .srt limpo." },
  ],
  "subtitle-editor": [
    { title: "Carregue arquivo + vídeo", body: "Solte as legendas e (opcional) o vídeo correspondente." },
    { title: "Edite os cues ao vivo", body: "Clique em uma linha, ajuste texto ou timing, veja na prévia." },
    { title: "Exporte", body: "Baixe o SRT ou VTT corrigido ao terminar." },
  ],
  "tiktok-subtitles": [
    { title: "Envie seu vídeo curto", body: "Vertical ou horizontal — qualquer proporção." },
    { title: "Escolha um estilo", body: "Karaoke, pop-up, clássico — prévia antes do render." },
    { title: "Baixe o MP4 legendado", body: "Já estilizado. Coloque no seu agendador e publique." },
  ],
  "clean-subtitles": [
    { title: "Envie SRT ou VTT", body: "Passada de limpeza determinística — nada mais é alterado." },
    { title: "Escolha o que limpar", body: "[Música], (risadas), MAIÚSCULAS gritadas, espaços duplos — ative cada um." },
    { title: "Baixe o arquivo limpo", body: "Menor, mais arrumado, pronto para publicar." },
  ],
  "srt-to-text": [
    { title: "Solte seu arquivo de legendas", body: "SRT ou VTT — ambos funcionam." },
    { title: "Escolha o layout", body: "Uma linha por cue, parágrafos mesclados, ou com rótulos de fala." },
    { title: "Baixe o .txt", body: "Use como transcrição, entrada de resumo ou rascunho de artigo." },
  ],
  "youtube-chapters": [
    { title: "Envie a transcrição", body: "SRT, VTT ou texto puro." },
    { title: "A IA encontra os cortes", body: "Selecionamos seções com significado, não intervalos arbitrários." },
    { title: "Copie e cole", body: "Cole os capítulos formatados na descrição do YouTube." },
  ],
  "batch-translate": [
    { title: "Envie seu SRT mestre", body: "Escolha o idioma de origem ou deixe a gente detectar." },
    { title: "Selecione os idiomas destino", body: "Marque até 30. Rodamos em paralelo." },
    { title: "Baixe um ZIP", body: "Um SRT traduzido por idioma, pronto para cada release." },
  ],
  "style-subtitles": [
    { title: "Envie seu SRT ou VTT", body: "Ou cole os cues diretamente." },
    { title: "Personalize os estilos", body: "Fonte, tamanho, cor, contorno, sombra, alinhamento, posição vertical." },
    { title: "Baixe o .ass", body: "Abra no VLC, Aegisub ou qualquer player moderno." },
  ],
  "auto-sync": [
    { title: "Envie vídeo + legendas", body: "Precisamos dos dois — o áudio é a referência." },
    { title: "A IA realinha cada cue", body: "Alinhamento forçado que combina cada linha com o momento falado." },
    { title: "Baixe um SRT sincronizado", body: "Cues agora caem exatamente sobre as palavras." },
  ],
  api: [
    { title: "Pegue uma chave API", body: "Disponível no plano Business ou pay-as-you-go." },
    { title: "POST seu job", body: "Endpoints REST para cada ferramenta. Webhooks para jobs longos." },
    { title: "Receba seu arquivo", body: "Resposta JSON com uma URL de download assinada." },
  ],
};

const de: StepsBySlug = {
  "subtitle-generator": [
    { title: "Medium hochladen", body: "Lade ein Video oder Audio hoch. MP4, MOV, MP3, WAV und mehr." },
    { title: "KI erstellt die Untertitel", body: "AI transkribiert dein Audio mit Zeitstempeln in 30+ Sprachen." },
    { title: "SRT herunterladen", body: "Saubere .srt-Datei, bereit für YouTube, Premiere oder jeden Player." },
  ],
  "add-subtitles-to-video": [
    { title: "Video + Untertitel hochladen", body: "Wähle dein MP4/MOV und eine SRT- oder VTT-Datei." },
    { title: "Stil wählen", body: "Schrift, Größe, Farbe, Position — oder den klaren Standard behalten." },
    { title: "Untertiteltes MP4 herunterladen", body: "Wir rendern mit FFmpeg und schicken dir das fertige Video zurück." },
  ],
  "srt-to-vtt": [
    { title: ".srt-Datei ablegen", body: "Oder Untertiteltext direkt in den Editor einfügen." },
    { title: "Konvertierung im Browser", body: "Läuft komplett auf deinem Gerät — die Datei verlässt es nie." },
    { title: ".vtt herunterladen", body: "In <video> oder jeden HTML5-Player einbinden." },
  ],
  "vtt-to-srt": [
    { title: ".vtt-Datei ablegen", body: "Oder WebVTT-Cues direkt in den Editor einfügen." },
    { title: "Sofortige Konvertierung", body: "Header, Styling und Cue-Identifier werden automatisch bereinigt." },
    { title: ".srt herunterladen", body: "Bereit für Premiere, DaVinci, YouTube — überall." },
  ],
  "translate-subtitles": [
    { title: "SRT oder VTT hochladen", body: "Quellsprache wird automatisch erkannt." },
    { title: "Zielsprache wählen", body: "Von Englisch über Japanisch bis Arabisch." },
    { title: "Übersetzte Datei herunterladen", body: "Gleiches Timing, übersetzter Text. Perfekt für internationale Veröffentlichungen." },
  ],
  "sync-subtitles": [
    { title: "Verschobene Datei hochladen", body: "Wir unterstützen SRT und VTT." },
    { title: "Versatz eingeben", body: "Positiv zum Verzögern, negativ zum Vorziehen. Millisekundengenau." },
    { title: "Korrigierte Datei herunterladen", body: "Jeder Cue exakt verschoben — Start- und Endzeit erhalten." },
  ],
  "extract-subtitles": [
    { title: "Video hochladen", body: "MKV, MP4, MOV, WebM — alles mit eingebetteten Spuren." },
    { title: "Spuren auswählen", body: "Wir listen jede Untertitelspur mit Sprache und Codec." },
    { title: "SRTs herunterladen", body: "Jede Spur als saubere .srt-Datei exportiert." },
  ],
  "subtitle-editor": [
    { title: "Datei + Video laden", body: "Untertitel ablegen und (optional) das passende Video." },
    { title: "Cues live bearbeiten", body: "Klick eine Zeile, korrigiere Text oder Timing, sieh's in der Vorschau." },
    { title: "Exportieren", body: "Lade das korrigierte SRT oder VTT herunter, wenn du fertig bist." },
  ],
  "tiktok-subtitles": [
    { title: "Kurzvideo hochladen", body: "Vertikal oder horizontal — jedes Seitenverhältnis." },
    { title: "Caption-Stil wählen", body: "Karaoke, Pop-up, klassisch — Vorschau vor dem Rendern." },
    { title: "Untertiteltes MP4 herunterladen", body: "Bereits gestylt. Ab in den Scheduler und veröffentlichen." },
  ],
  "clean-subtitles": [
    { title: "SRT oder VTT hochladen", body: "Deterministischer Bereinigungslauf — sonst nichts wird geändert." },
    { title: "Auswählen, was zu bereinigen ist", body: "[Musik], (lacht), GROSSBUCHSTABEN-Geschrei, doppelte Leerzeichen — einzeln umschaltbar." },
    { title: "Bereinigte Datei herunterladen", body: "Kleiner, aufgeräumter, veröffentlichungsbereit." },
  ],
  "srt-to-text": [
    { title: "Untertiteldatei ablegen", body: "SRT oder VTT — beides geht." },
    { title: "Layout wählen", body: "Eine Zeile pro Cue, zusammengeführte Absätze oder mit Sprecher-Labels." },
    { title: ".txt herunterladen", body: "Nutz es als Transkript, Eingabe für Zusammenfassungen oder Artikelentwurf." },
  ],
  "youtube-chapters": [
    { title: "Transkript hochladen", body: "SRT, VTT oder reiner Text." },
    { title: "KI findet die Kapitelmarken", body: "Wir wählen sinnvolle Abschnitte, keine willkürlichen Intervalle." },
    { title: "Kopieren & einfügen", body: "Formatierte Kapitel in deine YouTube-Beschreibung einfügen." },
  ],
  "batch-translate": [
    { title: "Master-SRT hochladen", body: "Quellsprache wählen oder uns erkennen lassen." },
    { title: "Zielsprachen wählen", body: "Bis zu 30 Sprachen ankreuzen. Wir laufen parallel." },
    { title: "ZIP herunterladen", body: "Ein übersetztes SRT pro Sprache, bereit für jede Release." },
  ],
  "style-subtitles": [
    { title: "SRT oder VTT hochladen", body: "Oder Cues direkt einfügen." },
    { title: "Stile anpassen", body: "Schrift, Größe, Farbe, Outline, Schatten, Ausrichtung, vertikale Position." },
    { title: ".ass herunterladen", body: "In VLC, Aegisub oder jeden modernen Player ziehen." },
  ],
  "auto-sync": [
    { title: "Video + Untertitel hochladen", body: "Wir brauchen beides — das Audio ist die Referenz." },
    { title: "KI richtet jeden Cue neu aus", body: "Forced Alignment passt jede Zeile an, wo sie tatsächlich gesprochen wird." },
    { title: "Synchronisiertes SRT herunterladen", body: "Cues sitzen jetzt exakt auf den gesprochenen Wörtern." },
  ],
  api: [
    { title: "API-Key holen", body: "Im Business-Plan oder pay-as-you-go verfügbar." },
    { title: "Job POSTen", body: "REST-Endpunkte für jedes Tool. Webhooks für lange Jobs." },
    { title: "Datei empfangen", body: "JSON-Antwort mit signierter Download-URL." },
  ],
};

const it: StepsBySlug = {
  "subtitle-generator": [
    { title: "Carica il tuo media", body: "Rilascia un video o un audio. MP4, MOV, MP3, WAV e altri." },
    { title: "L'IA genera i sottotitoli", body: "AI trascrive l'audio con timestamp in oltre 30 lingue." },
    { title: "Scarica l'SRT", body: "Un .srt pulito, pronto per YouTube, Premiere o qualsiasi player." },
  ],
  "add-subtitles-to-video": [
    { title: "Carica video + sottotitoli", body: "Scegli il tuo MP4/MOV e un file SRT o VTT." },
    { title: "Scegli uno stile", body: "Font, dimensione, colore, posizione — o tieni lo stile pulito di default." },
    { title: "Scarica l'MP4 sottotitolato", body: "Renderizziamo con FFmpeg e ti restituiamo il video finito." },
  ],
  "srt-to-vtt": [
    { title: "Rilascia il tuo file .srt", body: "Oppure incolla il testo dei sottotitoli direttamente nell'editor." },
    { title: "Conversione nel browser", body: "Tutto avviene sul tuo dispositivo — il file non lo lascia mai." },
    { title: "Scarica il .vtt", body: "Mettilo in <video> o in qualsiasi player HTML5." },
  ],
  "vtt-to-srt": [
    { title: "Rilascia il tuo file .vtt", body: "Oppure incolla i cue WebVTT direttamente nell'editor." },
    { title: "Conversione istantanea", body: "Header, stile e identificatori di cue puliti automaticamente." },
    { title: "Scarica il .srt", body: "Pronto per Premiere, DaVinci, YouTube — ovunque." },
  ],
  "translate-subtitles": [
    { title: "Carica il SRT o VTT", body: "La lingua sorgente è rilevata automaticamente." },
    { title: "Scegli la lingua di destinazione", body: "Dall'inglese all'arabo passando per il giapponese." },
    { title: "Scarica il file tradotto", body: "Stesso timing, testo tradotto. Perfetto per pubblicare globalmente." },
  ],
  "sync-subtitles": [
    { title: "Carica il file fuori sincrono", body: "Supportiamo SRT e VTT." },
    { title: "Inserisci l'offset", body: "Positivo per ritardare, negativo per anticipare. Precisione al millisecondo." },
    { title: "Scarica il file corretto", body: "Ogni cue spostato esatto — inizio e fine preservati." },
  ],
  "extract-subtitles": [
    { title: "Carica il video", body: "MKV, MP4, MOV, WebM — qualsiasi cosa con tracce incorporate." },
    { title: "Seleziona le tracce", body: "Elenchiamo ogni traccia di sottotitoli con lingua e codec." },
    { title: "Scarica gli SRT", body: "Ogni traccia esportata come .srt pulito." },
  ],
  "subtitle-editor": [
    { title: "Carica file + video", body: "Rilascia i sottotitoli e (opzionale) il video corrispondente." },
    { title: "Modifica i cue in tempo reale", body: "Clicca una riga, sistema testo o timing, guarda l'anteprima." },
    { title: "Esporta", body: "Scarica il SRT o VTT corretto quando hai finito." },
  ],
  "tiktok-subtitles": [
    { title: "Carica il tuo video corto", body: "Verticale o orizzontale — qualsiasi rapporto." },
    { title: "Scegli uno stile caption", body: "Karaoke, pop-up, classico — anteprima prima del render." },
    { title: "Scarica l'MP4 sottotitolato", body: "Già stilizzato. Mettilo nel tuo scheduler e pubblica." },
  ],
  "clean-subtitles": [
    { title: "Carica SRT o VTT", body: "Pulizia deterministica — niente altro viene cambiato." },
    { title: "Scegli cosa pulire", body: "[Musica], (risate), MAIUSCOLE urlate, doppi spazi — attivali a uno a uno." },
    { title: "Scarica il file pulito", body: "Più piccolo, più ordinato, pronto da pubblicare." },
  ],
  "srt-to-text": [
    { title: "Rilascia il file di sottotitoli", body: "SRT o VTT — entrambi funzionano." },
    { title: "Scegli il layout", body: "Una riga per cue, paragrafi uniti, o con etichette di speaker." },
    { title: "Scarica il .txt", body: "Usalo come trascrizione, input per riassunti o bozza di articolo." },
  ],
  "youtube-chapters": [
    { title: "Carica la trascrizione", body: "SRT, VTT o testo semplice." },
    { title: "L'IA trova i tagli", body: "Selezioniamo sezioni significative, non intervalli arbitrari." },
    { title: "Copia & incolla", body: "Incolla i capitoli formattati nella descrizione YouTube." },
  ],
  "batch-translate": [
    { title: "Carica il tuo SRT master", body: "Scegli la lingua sorgente o lascia rilevare a noi." },
    { title: "Seleziona le lingue di destinazione", body: "Spunta fino a 30. Eseguiamo in parallelo." },
    { title: "Scarica uno ZIP", body: "Un SRT tradotto per lingua, pronto per ogni release." },
  ],
  "style-subtitles": [
    { title: "Carica il tuo SRT o VTT", body: "Oppure incolla i cue direttamente." },
    { title: "Personalizza gli stili", body: "Font, dimensione, colore, contorno, ombra, allineamento, posizione verticale." },
    { title: "Scarica il .ass", body: "Aprilo in VLC, Aegisub o qualsiasi player moderno." },
  ],
  "auto-sync": [
    { title: "Carica video + sottotitoli", body: "Servono entrambi — l'audio è il riferimento." },
    { title: "L'IA riallinea ogni cue", body: "Allineamento forzato che fa coincidere ogni riga con quando viene effettivamente detta." },
    { title: "Scarica un SRT sincronizzato", body: "I cue ora cadono esattamente sulle parole pronunciate." },
  ],
  api: [
    { title: "Ottieni una chiave API", body: "Disponibile sul piano Business o pay-as-you-go." },
    { title: "POSTa il tuo job", body: "Endpoint REST per ogni strumento. Webhook per job lunghi." },
    { title: "Ricevi il tuo file", body: "Risposta JSON con un URL di download firmato." },
  ],
};

const nl: StepsBySlug = {
  "subtitle-generator": [
    { title: "Upload je media", body: "Sleep een video of audio. MP4, MOV, MP3, WAV en meer." },
    { title: "AI genereert ondertitels", body: "AI transcribeert je audio met timestamps in 30+ talen." },
    { title: "Download het SRT", body: "Schoon .srt bestand, klaar voor YouTube, Premiere of elke player." },
  ],
  "add-subtitles-to-video": [
    { title: "Upload video + ondertitels", body: "Kies je MP4/MOV en een SRT- of VTT-bestand." },
    { title: "Kies een stijl", body: "Lettertype, grootte, kleur, positie — of hou de schone standaard." },
    { title: "Download de MP4 met ondertitels", body: "We renderen met FFmpeg en sturen je de afgeronde video terug." },
  ],
  "srt-to-vtt": [
    { title: "Sleep je .srt-bestand", body: "Of plak ondertiteltekst rechtstreeks in de editor." },
    { title: "Conversie in de browser", body: "Alles draait op je apparaat — je bestand verlaat het nooit." },
    { title: "Download het .vtt", body: "Plak het in <video> of elke HTML5-player." },
  ],
  "vtt-to-srt": [
    { title: "Sleep je .vtt-bestand", body: "Of plak WebVTT-cues rechtstreeks in de editor." },
    { title: "Directe conversie", body: "Headers, styling en cue-identifiers worden automatisch opgeruimd." },
    { title: "Download het .srt", body: "Klaar voor Premiere, DaVinci, YouTube — overal." },
  ],
  "translate-subtitles": [
    { title: "Upload SRT of VTT", body: "Brontaal wordt automatisch herkend." },
    { title: "Kies een doeltaal", body: "Van Engels tot Arabisch via Japans." },
    { title: "Download het vertaalde bestand", body: "Zelfde timing, vertaalde tekst. Perfect voor wereldwijde release." },
  ],
  "sync-subtitles": [
    { title: "Upload het uit-sync bestand", body: "We ondersteunen SRT en VTT." },
    { title: "Voer de offset in", body: "Positief om te vertragen, negatief om te versnellen. Milliseconde-precisie." },
    { title: "Download het gecorrigeerde bestand", body: "Elke cue exact verschoven — start- en eindtijden behouden." },
  ],
  "extract-subtitles": [
    { title: "Upload de video", body: "MKV, MP4, MOV, WebM — alles met ingebedde sporen." },
    { title: "Kies de sporen", body: "We tonen elk ondertitelspoor met taal en codec." },
    { title: "Download de SRTs", body: "Elk spoor geëxporteerd als schoon .srt-bestand." },
  ],
  "subtitle-editor": [
    { title: "Laad bestand + video", body: "Sleep je ondertitels en (optioneel) de bijbehorende video." },
    { title: "Bewerk cues live", body: "Klik op een regel, herstel tekst of timing, zie het in de preview." },
    { title: "Exporteren", body: "Download het gecorrigeerde SRT of VTT als je klaar bent." },
  ],
  "tiktok-subtitles": [
    { title: "Upload je korte video", body: "Verticaal of horizontaal — elke verhouding." },
    { title: "Kies een caption-stijl", body: "Karaoke, pop-up, klassiek — preview voor rendering." },
    { title: "Download de MP4 met ondertitels", body: "Al gestyled. Zet hem in je scheduler en publiceer." },
  ],
  "clean-subtitles": [
    { title: "Upload SRT of VTT", body: "Deterministische opschoonronde — verder verandert niets." },
    { title: "Kies wat op te schonen", body: "[Muziek], (gelach), HOOFDLETTERS schreeuwen, dubbele spaties — schakel afzonderlijk in." },
    { title: "Download het opgeschoonde bestand", body: "Kleiner, opgeruimder, klaar voor publicatie." },
  ],
  "srt-to-text": [
    { title: "Sleep je ondertitelbestand", body: "SRT of VTT — beide werken." },
    { title: "Kies een layout", body: "Eén regel per cue, samengevoegde alinea's, of met spreker-labels." },
    { title: "Download het .txt", body: "Gebruik het als transcript, samenvatting-input of artikelschets." },
  ],
  "youtube-chapters": [
    { title: "Upload het transcript", body: "SRT, VTT of platte tekst." },
    { title: "AI vindt de hoofdstukken", body: "We kiezen betekenisvolle secties, geen willekeurige intervallen." },
    { title: "Kopiëren & plakken", body: "Plak de geformatteerde hoofdstukken in je YouTube-beschrijving." },
  ],
  "batch-translate": [
    { title: "Upload je master-SRT", body: "Kies brontaal of laat ons detecteren." },
    { title: "Kies doeltalen", body: "Vink er tot 30 aan. We draaien parallel." },
    { title: "Download een ZIP", body: "Eén vertaalde SRT per taal, klaar voor elke release." },
  ],
  "style-subtitles": [
    { title: "Upload je SRT of VTT", body: "Of plak cues direct." },
    { title: "Stijlen aanpassen", body: "Lettertype, grootte, kleur, omtrek, schaduw, uitlijning, verticale positie." },
    { title: "Download het .ass", body: "Open in VLC, Aegisub of elke moderne player." },
  ],
  "auto-sync": [
    { title: "Upload video + ondertitels", body: "We hebben beide nodig — het audio is de referentie." },
    { title: "AI lijnt elke cue opnieuw uit", body: "Geforceerde uitlijning koppelt elke regel aan wanneer hij echt wordt gezegd." },
    { title: "Download een gesynchroniseerd SRT", body: "Cues vallen nu precies op de gesproken woorden." },
  ],
  api: [
    { title: "Krijg een API-sleutel", body: "Beschikbaar in het Business-plan of pay-as-you-go." },
    { title: "POST je job", body: "REST-endpoints voor elke tool. Webhooks voor langlopende jobs." },
    { title: "Ontvang je bestand", body: "JSON-respons met een ondertekende download-URL." },
  ],
};

const ja: StepsBySlug = {
  "subtitle-generator": [
    { title: "メディアをアップロード", body: "動画または音声をドロップ。MP4、MOV、MP3、WAV など。" },
    { title: "AI が字幕を生成", body: "AI が 30 以上の言語でタイムスタンプ付き文字起こし。" },
    { title: "SRT をダウンロード", body: "YouTube、Premiere、各種プレイヤーで使える綺麗な .srt。" },
  ],
  "add-subtitles-to-video": [
    { title: "動画と字幕をアップロード", body: "MP4/MOV と SRT または VTT を選択。" },
    { title: "スタイルを選択", body: "フォント、サイズ、色、位置 — または既定のクリーンスタイル。" },
    { title: "字幕付き MP4 をダウンロード", body: "FFmpeg でレンダリングして完成動画を返します。" },
  ],
  "srt-to-vtt": [
    { title: ".srt をドロップ", body: "または字幕テキストをエディターに直接貼り付け。" },
    { title: "ブラウザ内で変換", body: "すべて端末内で実行 — ファイルは外に出ません。" },
    { title: ".vtt をダウンロード", body: "<video> や任意の HTML5 プレイヤーに組み込み。" },
  ],
  "vtt-to-srt": [
    { title: ".vtt をドロップ", body: "または WebVTT のキューをエディターに直接貼り付け。" },
    { title: "即時変換", body: "ヘッダー、スタイル、キュー識別子は自動で整理。" },
    { title: ".srt をダウンロード", body: "Premiere、DaVinci、YouTube — どこでも対応。" },
  ],
  "translate-subtitles": [
    { title: "SRT または VTT をアップロード", body: "ソース言語は自動検出。" },
    { title: "ターゲット言語を選択", body: "英語からアラビア語、日本語まで。" },
    { title: "翻訳済みファイルをダウンロード", body: "同じタイミング、翻訳されたテキスト。世界向け再公開に最適。" },
  ],
  "sync-subtitles": [
    { title: "ずれたファイルをアップロード", body: "SRT と VTT に対応。" },
    { title: "オフセットを入力", body: "正で遅延、負で前倒し。ミリ秒精度。" },
    { title: "修正済みファイルをダウンロード", body: "各キューが正確にシフト — 開始/終了タイムスタンプは保持。" },
  ],
  "extract-subtitles": [
    { title: "動画をアップロード", body: "MKV、MP4、MOV、WebM — 埋め込みトラックを持つもの。" },
    { title: "トラックを選択", body: "各字幕トラックを言語とコーデック付きで表示。" },
    { title: "SRT をダウンロード", body: "各トラックを綺麗な .srt として出力。" },
  ],
  "subtitle-editor": [
    { title: "ファイル + 動画を読み込み", body: "字幕と（任意で）対応動画をドロップ。" },
    { title: "キューをライブ編集", body: "行をクリックしてテキストやタイミングを修正、プレビューで確認。" },
    { title: "エクスポート", body: "完了したら修正済みの SRT または VTT をダウンロード。" },
  ],
  "tiktok-subtitles": [
    { title: "ショート動画をアップロード", body: "縦・横どちらでも、どんな比率でも。" },
    { title: "字幕スタイルを選択", body: "カラオケ、ポップアップ、クラシック — レンダー前にプレビュー。" },
    { title: "字幕付き MP4 をダウンロード", body: "既にスタイル適用済み。スケジューラーに入れて投稿。" },
  ],
  "clean-subtitles": [
    { title: "SRT または VTT をアップロード", body: "決定論的なクリーンアップ — 他は変更しません。" },
    { title: "クリーンアップ対象を選択", body: "[音楽]、(笑い)、全大文字、二重スペース — 個別に切り替え。" },
    { title: "クリーン済みファイルをダウンロード", body: "より小さく整然と、公開準備完了。" },
  ],
  "srt-to-text": [
    { title: "字幕ファイルをドロップ", body: "SRT・VTT どちらも対応。" },
    { title: "レイアウトを選択", body: "キューごとに 1 行、段落結合、話者ラベル付きなど。" },
    { title: ".txt をダウンロード", body: "文字起こし、要約入力、記事下書きとして使えます。" },
  ],
  "youtube-chapters": [
    { title: "文字起こしをアップロード", body: "SRT、VTT、プレーンテキスト。" },
    { title: "AI がチャプター区切りを検出", body: "任意の間隔ではなく意味のあるセクションを選択。" },
    { title: "コピー＆ペースト", body: "整形済みチャプターを YouTube の説明欄に貼り付け。" },
  ],
  "batch-translate": [
    { title: "マスター SRT をアップロード", body: "ソース言語を指定するか自動検出。" },
    { title: "ターゲット言語を選択", body: "最大 30 言語をチェック。並列で実行。" },
    { title: "ZIP をダウンロード", body: "言語ごとに翻訳済み SRT、各リリースに添付できます。" },
  ],
  "style-subtitles": [
    { title: "SRT または VTT をアップロード", body: "またはキューを直接貼り付け。" },
    { title: "スタイルをカスタマイズ", body: "フォント、サイズ、色、輪郭、影、配置、垂直位置。" },
    { title: ".ass をダウンロード", body: "VLC、Aegisub、各種モダンプレイヤーで開けます。" },
  ],
  "auto-sync": [
    { title: "動画 + 字幕をアップロード", body: "両方必要 — 音声がリファレンス。" },
    { title: "AI が各キューを再アライン", body: "強制アラインメントで実際に話された位置に合わせます。" },
    { title: "同期済み SRT をダウンロード", body: "キューが発話に正確に合います。" },
  ],
  api: [
    { title: "API キーを取得", body: "Business プランまたは従量課金で利用可能。" },
    { title: "ジョブを POST", body: "各ツール用の REST エンドポイント。長時間ジョブには Webhook。" },
    { title: "ファイルを受信", body: "署名付きダウンロード URL を含む JSON レスポンス。" },
  ],
};

const zh: StepsBySlug = {
  "subtitle-generator": [
    { title: "上传媒体", body: "拖入视频或音频。MP4、MOV、MP3、WAV 等。" },
    { title: "AI 生成字幕", body: "AI 在 30 多种语言中转录并标记时间戳。" },
    { title: "下载 SRT", body: "干净的 .srt,适配 YouTube、Premiere 或任意播放器。" },
  ],
  "add-subtitles-to-video": [
    { title: "上传视频 + 字幕", body: "选择 MP4/MOV 及 SRT 或 VTT 文件。" },
    { title: "选择样式", body: "字体、字号、颜色、位置 — 或保留默认。" },
    { title: "下载带字幕的 MP4", body: "用 FFmpeg 渲染并返回成品视频。" },
  ],
  "srt-to-vtt": [
    { title: "拖入 .srt 文件", body: "或将字幕文本直接粘贴到编辑器。" },
    { title: "浏览器内转换", body: "完全在您的设备上运行 — 文件不会离开。" },
    { title: "下载 .vtt", body: "嵌入到 <video> 或任意 HTML5 播放器。" },
  ],
  "vtt-to-srt": [
    { title: "拖入 .vtt 文件", body: "或将 WebVTT 标记直接粘贴到编辑器。" },
    { title: "即时转换", body: "自动清理头部、样式和标记标识符。" },
    { title: "下载 .srt", body: "适用 Premiere、DaVinci、YouTube — 任何地方。" },
  ],
  "translate-subtitles": [
    { title: "上传 SRT 或 VTT", body: "源语言会自动检测。" },
    { title: "选择目标语言", body: "英语、阿拉伯语、日语等。" },
    { title: "下载翻译后的文件", body: "时间轴不变,文本翻译。适合全球发布。" },
  ],
  "sync-subtitles": [
    { title: "上传不同步的文件", body: "支持 SRT 与 VTT。" },
    { title: "输入偏移", body: "正数延迟、负数提前。毫秒级精度。" },
    { title: "下载修正后的文件", body: "每个 cue 精确偏移 — 开始与结束时间保持。" },
  ],
  "extract-subtitles": [
    { title: "上传视频", body: "MKV、MP4、MOV、WebM — 任何含嵌入轨的视频。" },
    { title: "选择轨道", body: "列出每条字幕轨的语言与编码。" },
    { title: "下载 SRTs", body: "每条轨导出为干净的 .srt。" },
  ],
  "subtitle-editor": [
    { title: "加载文件 + 视频", body: "拖入字幕与(可选)对应视频。" },
    { title: "实时编辑 cues", body: "点击一行,修正文本或时间,在预览中查看。" },
    { title: "导出", body: "完成后下载修正后的 SRT 或 VTT。" },
  ],
  "tiktok-subtitles": [
    { title: "上传短视频", body: "竖屏或横屏 — 任何比例。" },
    { title: "选择字幕样式", body: "卡拉 OK、弹出、经典 — 渲染前预览。" },
    { title: "下载带字幕的 MP4", body: "已样式化。放入排程器发布。" },
  ],
  "clean-subtitles": [
    { title: "上传 SRT 或 VTT", body: "确定性清理 — 其它不变。" },
    { title: "选择清理项", body: "[音乐]、(笑)、全大写、双空格 — 逐项启用。" },
    { title: "下载已清理文件", body: "更小、更整洁,即可发布。" },
  ],
  "srt-to-text": [
    { title: "拖入字幕文件", body: "SRT 或 VTT — 都支持。" },
    { title: "选择布局", body: "每行一句、合并段落或附说话人标签。" },
    { title: "下载 .txt", body: "可作转录稿、摘要输入或文章草稿。" },
  ],
  "youtube-chapters": [
    { title: "上传转录稿", body: "SRT、VTT 或纯文本。" },
    { title: "AI 找到章节断点", body: "我们选择语义有意义的部分,而非任意间隔。" },
    { title: "复制并粘贴", body: "将格式化的章节粘贴到 YouTube 描述。" },
  ],
  "batch-translate": [
    { title: "上传母版 SRT", body: "选择源语言或让我们检测。" },
    { title: "选择目标语言", body: "勾选至多 30 种。并行执行。" },
    { title: "下载 ZIP", body: "每种语言一个 SRT,准备好附加到每次发布。" },
  ],
  "style-subtitles": [
    { title: "上传 SRT 或 VTT", body: "或直接粘贴 cues。" },
    { title: "自定义样式", body: "字体、字号、颜色、描边、阴影、对齐、垂直位置。" },
    { title: "下载 .ass", body: "在 VLC、Aegisub 或任何现代播放器中打开。" },
  ],
  "auto-sync": [
    { title: "上传视频 + 字幕", body: "需要两者 — 音频是参考。" },
    { title: "AI 重新对齐每个 cue", body: "强制对齐将每行匹配到实际发声处。" },
    { title: "下载同步后的 SRT", body: "Cues 现在精确落在发音上。" },
  ],
  api: [
    { title: "获取 API 密钥", body: "Business 套餐或按需付费可用。" },
    { title: "POST 您的作业", body: "每个工具的 REST 端点。长任务用 Webhook。" },
    { title: "接收文件", body: "包含签名下载 URL 的 JSON 响应。" },
  ],
};

const ko: StepsBySlug = {
  "subtitle-generator": [
    { title: "미디어 업로드", body: "영상 또는 오디오를 드롭하세요. MP4, MOV, MP3, WAV 등." },
    { title: "AI 가 자막 생성", body: "AI 가 30개 이상 언어로 타임스탬프와 함께 전사합니다." },
    { title: "SRT 다운로드", body: "YouTube, Premiere 등 어떤 플레이어에도 맞는 깔끔한 .srt." },
  ],
  "add-subtitles-to-video": [
    { title: "영상 + 자막 업로드", body: "MP4/MOV 와 SRT 또는 VTT 파일 선택." },
    { title: "스타일 선택", body: "글꼴, 크기, 색상, 위치 — 또는 기본 깔끔한 스타일 유지." },
    { title: "자막 들어간 MP4 다운로드", body: "FFmpeg 로 렌더링하여 완성된 영상을 돌려드립니다." },
  ],
  "srt-to-vtt": [
    { title: ".srt 파일 드롭", body: "또는 자막 텍스트를 에디터에 바로 붙여넣기." },
    { title: "브라우저 내 변환", body: "모두 기기에서 실행 — 파일이 외부로 나가지 않습니다." },
    { title: ".vtt 다운로드", body: "<video> 나 HTML5 플레이어에 사용." },
  ],
  "vtt-to-srt": [
    { title: ".vtt 파일 드롭", body: "또는 WebVTT 큐를 에디터에 바로 붙여넣기." },
    { title: "즉시 변환", body: "헤더, 스타일, 큐 식별자를 자동으로 정리." },
    { title: ".srt 다운로드", body: "Premiere, DaVinci, YouTube — 어디든." },
  ],
  "translate-subtitles": [
    { title: "SRT 또는 VTT 업로드", body: "원본 언어는 자동 감지." },
    { title: "대상 언어 선택", body: "영어부터 아랍어, 일본어까지." },
    { title: "번역된 파일 다운로드", body: "타이밍은 그대로, 텍스트만 번역. 글로벌 재공개에 최적." },
  ],
  "sync-subtitles": [
    { title: "어긋난 파일 업로드", body: "SRT 와 VTT 지원." },
    { title: "오프셋 입력", body: "양수로 지연, 음수로 앞당김. 밀리초 정밀도." },
    { title: "수정된 파일 다운로드", body: "각 큐가 정확히 이동 — 시작/종료 타임스탬프 보존." },
  ],
  "extract-subtitles": [
    { title: "영상 업로드", body: "MKV, MP4, MOV, WebM — 내장 트랙이 있는 모든 영상." },
    { title: "트랙 선택", body: "각 자막 트랙을 언어와 코덱과 함께 표시." },
    { title: "SRT 다운로드", body: "각 트랙을 깔끔한 .srt 파일로 내보냄." },
  ],
  "subtitle-editor": [
    { title: "파일 + 영상 로드", body: "자막을 드롭하고 (선택사항) 해당 영상도." },
    { title: "큐를 실시간 편집", body: "줄을 클릭해 텍스트나 타이밍을 수정, 미리보기에서 확인." },
    { title: "내보내기", body: "끝나면 수정된 SRT 또는 VTT 다운로드." },
  ],
  "tiktok-subtitles": [
    { title: "숏폼 영상 업로드", body: "세로 또는 가로 — 어떤 비율이든." },
    { title: "캡션 스타일 선택", body: "노래방, 팝업, 클래식 — 렌더 전 미리보기." },
    { title: "자막 들어간 MP4 다운로드", body: "이미 스타일 적용. 스케줄러에 넣고 게시." },
  ],
  "clean-subtitles": [
    { title: "SRT 또는 VTT 업로드", body: "결정론적 정리 — 다른 것은 변경하지 않음." },
    { title: "정리할 항목 선택", body: "[음악], (웃음), 전체 대문자 외침, 이중 공백 — 각각 토글." },
    { title: "정리된 파일 다운로드", body: "더 작고 깔끔, 출판 준비 완료." },
  ],
  "srt-to-text": [
    { title: "자막 파일 드롭", body: "SRT 와 VTT 모두 가능." },
    { title: "레이아웃 선택", body: "큐당 한 줄, 단락 병합, 또는 화자 레이블 포함." },
    { title: ".txt 다운로드", body: "트랜스크립트, 요약 입력, 글 초안으로 활용." },
  ],
  "youtube-chapters": [
    { title: "트랜스크립트 업로드", body: "SRT, VTT 또는 일반 텍스트." },
    { title: "AI 가 챕터 분할 지점 탐지", body: "임의 간격이 아닌 의미 있는 구간을 선택." },
    { title: "복사 & 붙여넣기", body: "포맷된 챕터를 YouTube 설명에 붙여넣기." },
  ],
  "batch-translate": [
    { title: "마스터 SRT 업로드", body: "원본 언어 선택 또는 자동 감지." },
    { title: "대상 언어 선택", body: "최대 30개 체크. 병렬 실행." },
    { title: "ZIP 다운로드", body: "언어당 번역된 SRT 하나, 각 출시에 첨부 준비." },
  ],
  "style-subtitles": [
    { title: "SRT 또는 VTT 업로드", body: "또는 큐를 직접 붙여넣기." },
    { title: "스타일 커스터마이즈", body: "글꼴, 크기, 색상, 외곽선, 그림자, 정렬, 수직 위치." },
    { title: ".ass 다운로드", body: "VLC, Aegisub 등 모던 플레이어에서 열기." },
  ],
  "auto-sync": [
    { title: "영상 + 자막 업로드", body: "둘 다 필요 — 오디오가 기준." },
    { title: "AI 가 각 큐를 재정렬", body: "강제 정렬로 각 줄을 실제 발화 시점에 맞춤." },
    { title: "동기화된 SRT 다운로드", body: "이제 큐가 발화된 단어에 정확히 위치." },
  ],
  api: [
    { title: "API 키 받기", body: "Business 플랜 또는 종량제로 사용 가능." },
    { title: "작업 POST", body: "각 도구의 REST 엔드포인트. 장시간 작업에는 웹훅." },
    { title: "파일 수신", body: "서명된 다운로드 URL 이 포함된 JSON 응답." },
  ],
};

const ar: StepsBySlug = {
  "subtitle-generator": [
    { title: "ارفع ملفك", body: "أفلت فيديو أو صوت. MP4 وMOV وMP3 وWAV وغيرها." },
    { title: "الذكاء الاصطناعي يولّد الترجمة", body: "AI يفرّغ الصوت بطوابع زمنية في أكثر من 30 لغة." },
    { title: "نزّل SRT", body: "ملف .srt نظيف جاهز لـ YouTube وPremiere وأي مشغل." },
  ],
  "add-subtitles-to-video": [
    { title: "ارفع الفيديو + الترجمة", body: "اختر MP4/MOV وملف SRT أو VTT." },
    { title: "اختر نمطًا", body: "خط، حجم، لون، موضع — أو احتفظ بالنمط الافتراضي." },
    { title: "نزّل MP4 المُترجم", body: "نحرّر بـ FFmpeg ونعيد لك الفيديو الجاهز." },
  ],
  "srt-to-vtt": [
    { title: "أفلت ملف .srt", body: "أو الصق نص الترجمة مباشرة في المحرر." },
    { title: "تحويل داخل المتصفح", body: "كل شيء يجري على جهازك — لا يغادر الملف." },
    { title: "نزّل .vtt", body: "أدخله في <video> أو أي مشغل HTML5." },
  ],
  "vtt-to-srt": [
    { title: "أفلت ملف .vtt", body: "أو الصق سطور WebVTT مباشرة في المحرر." },
    { title: "تحويل فوري", body: "العناوين والأنماط ومعرّفات السطور تُنظَّف تلقائيًا." },
    { title: "نزّل .srt", body: "جاهز لـ Premiere وDaVinci وYouTube — في أي مكان." },
  ],
  "translate-subtitles": [
    { title: "ارفع SRT أو VTT", body: "لغة المصدر تُكتشف تلقائيًا." },
    { title: "اختر لغة الهدف", body: "من الإنجليزية إلى العربية مرورًا باليابانية." },
    { title: "نزّل الملف المُترجم", body: "نفس التوقيت، نص مترجم. مثالي للنشر العالمي." },
  ],
  "sync-subtitles": [
    { title: "ارفع الملف غير المتزامن", body: "ندعم SRT وVTT." },
    { title: "أدخل الإزاحة", body: "الموجبة تؤخّر، السالبة تقدّم. دقّة بالميلي ثانية." },
    { title: "نزّل الملف المُصحَّح", body: "كل سطر منزاح بدقة — الطوابع الزمنية للبداية والنهاية محفوظة." },
  ],
  "extract-subtitles": [
    { title: "ارفع الفيديو", body: "MKV وMP4 وMOV وWebM — أي شيء يحوي مسارات مضمّنة." },
    { title: "اختر المسارات", body: "نعرض كل مسار ترجمة بلغته وترميزه." },
    { title: "نزّل ملفات SRT", body: "كل مسار يُصدَّر كملف .srt نظيف." },
  ],
  "subtitle-editor": [
    { title: "حمّل الملف + الفيديو", body: "أفلت الترجمات و(اختياريًا) الفيديو المطابق." },
    { title: "حرّر السطور حيًّا", body: "انقر سطرًا، عدّل النص أو التوقيت، شاهد في المعاينة." },
    { title: "تصدير", body: "نزّل SRT أو VTT المُصحَّح عند الانتهاء." },
  ],
  "tiktok-subtitles": [
    { title: "ارفع فيديو قصير", body: "عمودي أو أفقي — بأي نسبة." },
    { title: "اختر نمط الترجمة", body: "كاراوكي، منبثقة، كلاسيكية — معاينة قبل التحرير." },
    { title: "نزّل MP4 المُترجم", body: "مُنسَّق سلفًا. ضعه في جدولك وانشر." },
  ],
  "clean-subtitles": [
    { title: "ارفع SRT أو VTT", body: "تمريرة تنظيف حتمية — لا شيء آخر يُغيَّر." },
    { title: "اختر ما تنظّفه", body: "[موسيقى]، (ضحك)، أحرف كبيرة صارخة، مسافات مزدوجة — بدّل كلًا منها." },
    { title: "نزّل الملف النظيف", body: "أصغر وأنظف وجاهز للنشر." },
  ],
  "srt-to-text": [
    { title: "أفلت ملف الترجمة", body: "SRT أو VTT — كلاهما يعمل." },
    { title: "اختر التخطيط", body: "سطر لكل سطر، فقرات مدمجة، أو مع تسميات المتحدث." },
    { title: "نزّل .txt", body: "استخدمه نسخة نصية أو مدخلًا لملخص أو مسوّدة مقال." },
  ],
  "youtube-chapters": [
    { title: "ارفع النسخة النصية", body: "SRT أو VTT أو نص خام." },
    { title: "الذكاء الاصطناعي يكتشف الفصول", body: "نختار أقسامًا ذات معنى لا فواصل اعتباطية." },
    { title: "انسخ والصق", body: "ألصق الفصول المنسّقة في وصف YouTube." },
  ],
  "batch-translate": [
    { title: "ارفع SRT الأصلي", body: "اختر لغة المصدر أو دعنا نكتشفها." },
    { title: "اختر لغات الهدف", body: "حدّد حتى 30 لغة. نُنفّذ بالتوازي." },
    { title: "نزّل ZIP", body: "ملف SRT مترجم لكل لغة، جاهز لكل إصدار." },
  ],
  "style-subtitles": [
    { title: "ارفع SRT أو VTT", body: "أو الصق السطور مباشرة." },
    { title: "خصّص الأنماط", body: "الخط، الحجم، اللون، الإطار، الظل، المحاذاة، الموضع الرأسي." },
    { title: "نزّل .ass", body: "افتحه في VLC أو Aegisub أو أي مشغل حديث." },
  ],
  "auto-sync": [
    { title: "ارفع الفيديو + الترجمة", body: "نحتاج كليهما — الصوت هو المرجع." },
    { title: "الذكاء الاصطناعي يعيد محاذاة كل سطر", body: "محاذاة قسرية تطابق كل سطر مع لحظة نطقه فعليًا." },
    { title: "نزّل SRT متزامن", body: "تستقر السطور تمامًا على الكلمات المنطوقة." },
  ],
  api: [
    { title: "احصل على مفتاح API", body: "متوفر في خطة Business أو الدفع حسب الاستخدام." },
    { title: "أرسل وظيفتك", body: "نقاط REST لكل أداة. Webhooks للوظائف الطويلة." },
    { title: "استلم ملفك", body: "استجابة JSON برابط تنزيل موقّع." },
  ],
};

const ru: StepsBySlug = {
  "subtitle-generator": [
    { title: "Загрузите медиа", body: "Перетащите видео или аудио. MP4, MOV, MP3, WAV и другие." },
    { title: "ИИ генерирует субтитры", body: "AI транскрибирует аудио с таймкодами на 30+ языках." },
    { title: "Скачайте SRT", body: "Чистый .srt, готовый для YouTube, Premiere или любого плеера." },
  ],
  "add-subtitles-to-video": [
    { title: "Загрузите видео + субтитры", body: "Выберите MP4/MOV и файл SRT или VTT." },
    { title: "Выберите стиль", body: "Шрифт, размер, цвет, позиция — или оставьте чистый стандарт." },
    { title: "Скачайте MP4 с субтитрами", body: "Рендерим в FFmpeg и возвращаем готовое видео." },
  ],
  "srt-to-vtt": [
    { title: "Перетащите .srt", body: "Или вставьте текст субтитров прямо в редактор." },
    { title: "Конвертация в браузере", body: "Всё на вашем устройстве — файл его не покидает." },
    { title: "Скачайте .vtt", body: "Вставьте в <video> или любой HTML5-плеер." },
  ],
  "vtt-to-srt": [
    { title: "Перетащите .vtt", body: "Или вставьте WebVTT-реплики прямо в редактор." },
    { title: "Мгновенная конвертация", body: "Заголовки, стили и идентификаторы реплик чистятся автоматически." },
    { title: "Скачайте .srt", body: "Готово к Premiere, DaVinci, YouTube — куда угодно." },
  ],
  "translate-subtitles": [
    { title: "Загрузите SRT или VTT", body: "Исходный язык определяется автоматически." },
    { title: "Выберите целевой язык", body: "От английского до арабского и японского." },
    { title: "Скачайте переведённый файл", body: "Тот же тайминг, переведённый текст. Идеально для глобального переиздания." },
  ],
  "sync-subtitles": [
    { title: "Загрузите рассинхронизированный файл", body: "Поддерживаем SRT и VTT." },
    { title: "Введите смещение", body: "Положительное задерживает, отрицательное опережает. Точность до миллисекунды." },
    { title: "Скачайте исправленный файл", body: "Каждая реплика смещена точно — начало и конец сохранены." },
  ],
  "extract-subtitles": [
    { title: "Загрузите видео", body: "MKV, MP4, MOV, WebM — всё, что содержит встроенные дорожки." },
    { title: "Выберите дорожки", body: "Показываем каждую дорожку субтитров с языком и кодеком." },
    { title: "Скачайте SRT-файлы", body: "Каждая дорожка экспортируется как чистый .srt." },
  ],
  "subtitle-editor": [
    { title: "Загрузите файл + видео", body: "Перетащите субтитры и (опционально) соответствующее видео." },
    { title: "Редактируйте реплики в реальном времени", body: "Кликните строку, исправьте текст или тайминг, посмотрите превью." },
    { title: "Экспорт", body: "По окончании скачайте исправленный SRT или VTT." },
  ],
  "tiktok-subtitles": [
    { title: "Загрузите короткое видео", body: "Вертикальное или горизонтальное — любое соотношение." },
    { title: "Выберите стиль субтитров", body: "Караоке, поп-ап, классика — превью перед рендерингом." },
    { title: "Скачайте MP4 с субтитрами", body: "Уже стилизовано. Закидывайте в планировщик и публикуйте." },
  ],
  "clean-subtitles": [
    { title: "Загрузите SRT или VTT", body: "Детерминированная чистка — больше ничего не меняется." },
    { title: "Выберите что чистить", body: "[Музыка], (смех), КРИКИ КАПСОМ, двойные пробелы — переключайте по отдельности." },
    { title: "Скачайте очищенный файл", body: "Компактнее, аккуратнее, готов к публикации." },
  ],
  "srt-to-text": [
    { title: "Перетащите файл субтитров", body: "SRT или VTT — оба работают." },
    { title: "Выберите макет", body: "Одна строка на реплику, объединённые абзацы или с метками говорящих." },
    { title: "Скачайте .txt", body: "Используйте как транскрипт, вход для пересказа или черновик статьи." },
  ],
  "youtube-chapters": [
    { title: "Загрузите транскрипт", body: "SRT, VTT или обычный текст." },
    { title: "ИИ находит границы глав", body: "Мы выбираем осмысленные разделы, а не произвольные интервалы." },
    { title: "Скопируйте и вставьте", body: "Вставьте отформатированные главы в описание на YouTube." },
  ],
  "batch-translate": [
    { title: "Загрузите мастер-SRT", body: "Выберите исходный язык или дайте нам определить." },
    { title: "Выберите целевые языки", body: "Отметьте до 30. Запускаем параллельно." },
    { title: "Скачайте ZIP", body: "По одному переведённому SRT на язык — готово к каждому релизу." },
  ],
  "style-subtitles": [
    { title: "Загрузите SRT или VTT", body: "Или вставьте реплики напрямую." },
    { title: "Настройте стили", body: "Шрифт, размер, цвет, обводка, тень, выравнивание, вертикальная позиция." },
    { title: "Скачайте .ass", body: "Откройте в VLC, Aegisub или любом современном плеере." },
  ],
  "auto-sync": [
    { title: "Загрузите видео + субтитры", body: "Нужны оба — аудио служит эталоном." },
    { title: "ИИ перевыравнивает каждую реплику", body: "Принудительное выравнивание привязывает каждую строку к моменту произнесения." },
    { title: "Скачайте синхронизированный SRT", body: "Реплики теперь точно ложатся на произнесённые слова." },
  ],
  api: [
    { title: "Получите API-ключ", body: "Доступен на тарифе Business или по факту использования." },
    { title: "POST'те задачу", body: "REST-эндпоинты для каждого инструмента. Webhooks для долгих задач." },
    { title: "Получите файл", body: "JSON-ответ с подписанной ссылкой для скачивания." },
  ],
};

const hi: StepsBySlug = {
  "subtitle-generator": [
    { title: "अपना मीडिया अपलोड करें", body: "वीडियो या ऑडियो छोड़ें। MP4, MOV, MP3, WAV और बहुत कुछ।" },
    { title: "AI सबटाइटल बनाता है", body: "AI का AI 30+ भाषाओं में टाइमस्टैम्प के साथ ट्रांसक्राइब करता है।" },
    { title: "SRT डाउनलोड करें", body: "YouTube, Premiere या किसी भी प्लेयर के लिए स्वच्छ .srt फ़ाइल।" },
  ],
  "add-subtitles-to-video": [
    { title: "वीडियो + सबटाइटल अपलोड करें", body: "अपना MP4/MOV और SRT या VTT चुनें।" },
    { title: "एक स्टाइल चुनें", body: "फ़ॉन्ट, आकार, रंग, स्थिति — या साफ़ डिफ़ॉल्ट रखें।" },
    { title: "कैप्शन वाला MP4 डाउनलोड करें", body: "हम FFmpeg से रेंडर करते हैं और आपको तैयार वीडियो वापस देते हैं।" },
  ],
  "srt-to-vtt": [
    { title: "अपनी .srt फ़ाइल छोड़ें", body: "या सबटाइटल टेक्स्ट सीधे एडिटर में पेस्ट करें।" },
    { title: "ब्राउज़र में रूपांतरण", body: "सब आपके डिवाइस पर — फ़ाइल कहीं नहीं जाती।" },
    { title: ".vtt डाउनलोड करें", body: "<video> या किसी HTML5 प्लेयर में डालें।" },
  ],
  "vtt-to-srt": [
    { title: "अपनी .vtt फ़ाइल छोड़ें", body: "या WebVTT क्यू सीधे एडिटर में पेस्ट करें।" },
    { title: "तुरंत रूपांतरण", body: "हेडर, स्टाइल और क्यू पहचानकर्ता स्वचालित साफ़।" },
    { title: ".srt डाउनलोड करें", body: "Premiere, DaVinci, YouTube — कहीं भी तैयार।" },
  ],
  "translate-subtitles": [
    { title: "SRT या VTT अपलोड करें", body: "स्रोत भाषा स्वतः पहचानी जाती है।" },
    { title: "लक्ष्य भाषा चुनें", body: "अंग्रेज़ी से अरबी, जापानी तक।" },
    { title: "अनुवादित फ़ाइल डाउनलोड करें", body: "वही टाइमिंग, अनुवादित टेक्स्ट. वैश्विक प्रकाशन के लिए बढ़िया।" },
  ],
  "sync-subtitles": [
    { title: "असिंक्रोनस फ़ाइल अपलोड करें", body: "हम SRT और VTT समर्थन करते हैं।" },
    { title: "ऑफसेट दर्ज करें", body: "धनात्मक देरी, ऋणात्मक आगे. मिलीसेकंड परिशुद्धता।" },
    { title: "ठीक की गई फ़ाइल डाउनलोड करें", body: "हर क्यू सटीक शिफ़्ट — आरंभ/अंत टाइमस्टैम्प संरक्षित।" },
  ],
  "extract-subtitles": [
    { title: "वीडियो अपलोड करें", body: "MKV, MP4, MOV, WebM — कोई भी एम्बेडेड ट्रैक वाला।" },
    { title: "ट्रैक चुनें", body: "हर सबटाइटल ट्रैक उसकी भाषा और कोडेक के साथ दिखाते हैं।" },
    { title: "SRTs डाउनलोड करें", body: "हर ट्रैक स्वच्छ .srt फ़ाइल के रूप में निर्यात।" },
  ],
  "subtitle-editor": [
    { title: "फ़ाइल + वीडियो लोड करें", body: "अपने सबटाइटल छोड़ें और (वैकल्पिक) मेल खाता वीडियो।" },
    { title: "क्यू को लाइव संपादित करें", body: "एक लाइन पर क्लिक करें, टेक्स्ट या टाइमिंग ठीक करें, पूर्वावलोकन देखें।" },
    { title: "निर्यात", body: "जब समाप्त हो जाए, संशोधित SRT या VTT डाउनलोड करें।" },
  ],
  "tiktok-subtitles": [
    { title: "अपना शॉर्ट वीडियो अपलोड करें", body: "वर्टिकल या हॉरिज़ॉन्टल — कोई भी अनुपात।" },
    { title: "कैप्शन स्टाइल चुनें", body: "कराओके, पॉप-अप, क्लासिक — रेंडर से पहले पूर्वावलोकन।" },
    { title: "कैप्शन वाला MP4 डाउनलोड करें", body: "पहले से स्टाइल्ड. अपने शेड्यूलर में डालें और पोस्ट करें।" },
  ],
  "clean-subtitles": [
    { title: "SRT या VTT अपलोड करें", body: "नियतात्मक सफ़ाई पास — और कुछ नहीं बदलता।" },
    { title: "क्या साफ़ करना है चुनें", body: "[संगीत], (हँसी), ALL-CAPS चीख, दोहरा स्पेस — हर एक टॉगल करें।" },
    { title: "साफ़ की गई फ़ाइल डाउनलोड करें", body: "छोटी, साफ़, प्रकाशन के लिए तैयार।" },
  ],
  "srt-to-text": [
    { title: "अपनी सबटाइटल फ़ाइल छोड़ें", body: "SRT या VTT — दोनों काम करते हैं।" },
    { title: "लेआउट चुनें", body: "हर क्यू के लिए एक लाइन, मर्ज किए गए पैराग्राफ़, या स्पीकर लेबल के साथ।" },
    { title: ".txt डाउनलोड करें", body: "ट्रांसक्रिप्ट, सारांश इनपुट या लेख ड्राफ़्ट के रूप में उपयोग करें।" },
  ],
  "youtube-chapters": [
    { title: "ट्रांसक्रिप्ट अपलोड करें", body: "SRT, VTT या सादा टेक्स्ट।" },
    { title: "AI चैप्टर ब्रेक ढूँढता है", body: "हम अर्थपूर्ण खंड चुनते हैं, मनमाने अंतराल नहीं।" },
    { title: "कॉपी & पेस्ट", body: "फॉर्मेट किए गए चैप्टर अपने YouTube विवरण में चिपकाएँ।" },
  ],
  "batch-translate": [
    { title: "अपनी मास्टर SRT अपलोड करें", body: "स्रोत भाषा चुनें या हमें पहचानने दें।" },
    { title: "लक्ष्य भाषाएँ चुनें", body: "30 तक टिक करें. हम समानांतर में चलाते हैं।" },
    { title: "एक ZIP डाउनलोड करें", body: "हर भाषा के लिए एक अनुवादित SRT, हर रिलीज़ के लिए तैयार।" },
  ],
  "style-subtitles": [
    { title: "अपनी SRT या VTT अपलोड करें", body: "या क्यू सीधे पेस्ट करें।" },
    { title: "स्टाइल कस्टमाइज़ करें", body: "फ़ॉन्ट, आकार, रंग, बॉर्डर, छाया, संरेखण, ऊर्ध्वाधर स्थिति।" },
    { title: ".ass डाउनलोड करें", body: "VLC, Aegisub या किसी आधुनिक प्लेयर में खोलें।" },
  ],
  "auto-sync": [
    { title: "वीडियो + सबटाइटल अपलोड करें", body: "दोनों चाहिए — ऑडियो संदर्भ है।" },
    { title: "AI हर क्यू को पुनः संरेखित करता है", body: "फ़ोर्स्ड एलाइनमेंट हर लाइन को उसके वास्तविक बोले जाने के क्षण पर मिलाता है।" },
    { title: "सिंक SRT डाउनलोड करें", body: "क्यू अब बोले गए शब्दों पर सटीक बैठते हैं।" },
  ],
  api: [
    { title: "API कुंजी प्राप्त करें", body: "Business प्लान या पे-एज़-यू-गो पर उपलब्ध।" },
    { title: "अपना जॉब POST करें", body: "हर टूल के लिए REST एंडपॉइंट. लंबे जॉब के लिए वेबहुक।" },
    { title: "अपनी फ़ाइल प्राप्त करें", body: "साइन किए डाउनलोड URL के साथ JSON प्रतिक्रिया।" },
  ],
};

const ALL: Partial<Record<Locale, StepsBySlug>> = { fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi };

export function getLocalisedSteps(slug: string, locale: Locale): LocalisedStep[] | null {
  return ALL[locale]?.[slug] ?? null;
}
