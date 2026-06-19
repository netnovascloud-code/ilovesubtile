import type { Locale } from "@/lib/i18n/locales";
import type { LocalisedStep } from "./tool-steps";

/**
 * AUTO-GENERATED — do not edit by hand.
 *
 * Localised "How it works" step cards for every tool, keyed slug → locale.
 * getLocalisedSteps prefers hand-authored steps (lib/i18n/tool-steps.ts) over
 * this overlay, and falls back to the English source (tools-config.ts) when a
 * (slug, locale) pair is absent. A missing entry is therefore always safe.
 */
export const GENERATED_STEP_TRANSLATIONS: Record<string, Partial<Record<Locale, LocalisedStep[]>>> = {
  "add-subtitles-to-video": {
    "ar": [
      {
        "title": "ارفع الفيديو والترجمة",
        "body": "اختر ملف MP4/MOV وملف SRT أو VTT."
      },
      {
        "title": "اختر النمط",
        "body": "الخط والحجم واللون والموضع — أو احتفظ بالإعدادات الافتراضية النظيفة."
      },
      {
        "title": "حمّل ملف MP4 مع التسميات",
        "body": "ندمج الترجمة كمسار قابل للتحديد باستخدام FFmpeg ونُعيد إليك الفيديو."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte video a titulky",
        "body": "Vyberte soubor MP4/MOV a soubor SRT nebo VTT."
      },
      {
        "title": "Zvolte styl",
        "body": "Písmo, velikost, barva, poloha — nebo ponechte výchozí čisté nastavení."
      },
      {
        "title": "Stáhněte MP4 s titulky",
        "body": "Titulky přimixujeme jako volitelnou stopu pomocí FFmpeg a vrátíme vám video."
      }
    ],
    "de": [
      {
        "title": "Video und Untertitel hochladen",
        "body": "MP4/MOV und eine SRT- oder VTT-Datei auswählen."
      },
      {
        "title": "Stil wählen",
        "body": "Schrift, Größe, Farbe, Position — oder einfach den cleanen Standard behalten."
      },
      {
        "title": "MP4 mit Untertiteln herunterladen",
        "body": "Wir muxen die Untertitel per FFmpeg als auswählbare Spur und schicken dein Video zurück."
      }
    ],
    "es": [
      {
        "title": "Sube el vídeo y los subtítulos",
        "body": "Selecciona tu MP4/MOV y un archivo SRT o VTT."
      },
      {
        "title": "Elige un estilo",
        "body": "Fuente, tamaño, color, posición — o déjalo con el diseño limpio por defecto."
      },
      {
        "title": "Descarga el MP4 con subtítulos",
        "body": "Mezclamos los subtítulos como pista seleccionable con FFmpeg y te devolvemos el vídeo."
      }
    ],
    "fr": [
      {
        "title": "Importez la vidéo et les sous-titres",
        "body": "Choisissez votre MP4/MOV et un fichier SRT ou VTT."
      },
      {
        "title": "Choisissez un style",
        "body": "Police, taille, couleur, position — ou gardez le style épuré par défaut."
      },
      {
        "title": "Téléchargez le MP4 sous-titré",
        "body": "Nous insérons les sous-titres comme piste sélectionnable via FFmpeg et vous renvoyons la vidéo."
      }
    ],
    "hi": [
      {
        "title": "वीडियो + सबटाइटल अपलोड करें",
        "body": "अपना MP4/MOV और एक SRT या VTT फ़ाइल चुनें।"
      },
      {
        "title": "स्टाइल चुनें",
        "body": "फ़ॉन्ट, साइज़, रंग, पोज़ीशन — या डिफ़ॉल्ट रखें।"
      },
      {
        "title": "कैप्शन वाला MP4 डाउनलोड करें",
        "body": "हम FFmpeg से सबटाइटल को एक सिलेक्टेबल ट्रैक के रूप में मिलाकर आपका वीडियो वापस भेजते हैं।"
      }
    ],
    "id": [
      {
        "title": "Unggah video + subtitle",
        "body": "Pilih file MP4/MOV dan file SRT atau VTT kamu."
      },
      {
        "title": "Pilih gaya tampilan",
        "body": "Font, ukuran, warna, posisi — atau gunakan tampilan bawaan yang bersih."
      },
      {
        "title": "Unduh MP4 berteks",
        "body": "Kami menyematkan subtitle sebagai trek yang bisa dipilih dengan FFmpeg, lalu mengembalikan videomu."
      }
    ],
    "it": [
      {
        "title": "Carica video e sottotitoli",
        "body": "Seleziona il tuo MP4/MOV e un file SRT o VTT."
      },
      {
        "title": "Scegli uno stile",
        "body": "Font, dimensione, colore, posizione — oppure lascia il design pulito predefinito."
      },
      {
        "title": "Scarica il MP4 con i sottotitoli",
        "body": "Integriamo i sottotitoli come traccia selezionabile con FFmpeg e ti restituiamo il video."
      }
    ],
    "ja": [
      {
        "title": "動画と字幕をアップロード",
        "body": "MP4/MOV と SRT または VTT ファイルを選択。"
      },
      {
        "title": "スタイルを選択",
        "body": "フォント・サイズ・色・位置を調整するか、デフォルトのままでOK。"
      },
      {
        "title": "字幕入りMP4をダウンロード",
        "body": "FFmpeg で選択可能なトラックとして字幕をミックスして返します。"
      }
    ],
    "ko": [
      {
        "title": "동영상 + 자막 업로드",
        "body": "MP4/MOV 파일과 SRT 또는 VTT 파일을 선택하세요."
      },
      {
        "title": "스타일 선택",
        "body": "글꼴, 크기, 색상, 위치를 지정하거나 기본값을 그대로 사용하세요."
      },
      {
        "title": "자막이 삽입된 MP4 다운로드",
        "body": "FFmpeg를 통해 자막을 선택 가능한 트랙으로 합쳐 동영상을 반환합니다."
      }
    ],
    "nl": [
      {
        "title": "Upload video + ondertitels",
        "body": "Kies je MP4/MOV en een SRT- of VTT-bestand."
      },
      {
        "title": "Kies een stijl",
        "body": "Lettertype, grootte, kleur, positie — of gebruik de strakke standaard."
      },
      {
        "title": "Download de MP4 met ondertitels",
        "body": "We voegen de ondertitels als selecteerbaar spoor samen via FFmpeg en sturen je video terug."
      }
    ],
    "pl": [
      {
        "title": "Prześlij wideo i napisy",
        "body": "Wybierz plik MP4/MOV oraz plik SRT lub VTT."
      },
      {
        "title": "Wybierz styl",
        "body": "Czcionka, rozmiar, kolor, pozycja — albo zostaw domyślny, czysty wygląd."
      },
      {
        "title": "Pobierz wideo z napisami",
        "body": "Scalamy napisy jako osobną ścieżkę za pomocą FFmpeg i odsyłamy gotowy plik MP4."
      }
    ],
    "pt": [
      {
        "title": "Carregue o vídeo + legendas",
        "body": "Selecione o seu MP4/MOV e um ficheiro SRT ou VTT."
      },
      {
        "title": "Escolha um estilo",
        "body": "Fonte, tamanho, cor, posição — ou mantenha o padrão limpo."
      },
      {
        "title": "Baixe o MP4 com legendas",
        "body": "Incorporamos as legendas como faixa selecionável com FFmpeg e devolvemos o seu vídeo."
      }
    ],
    "ru": [
      {
        "title": "Загрузите видео и субтитры",
        "body": "Выберите MP4/MOV и файл SRT или VTT."
      },
      {
        "title": "Выберите стиль",
        "body": "Шрифт, размер, цвет, расположение — или оставьте стандартный вид."
      },
      {
        "title": "Скачайте MP4 с субтитрами",
        "body": "Субтитры вшиваются как выбираемая дорожка через FFmpeg, и видео возвращается вам."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp video och undertexter",
        "body": "Välj din MP4/MOV och en SRT- eller VTT-fil."
      },
      {
        "title": "Välj ett utseende",
        "body": "Typsnitt, storlek, färg, position — eller behåll den rena standardstilen."
      },
      {
        "title": "Ladda ned undertextad MP4",
        "body": "Vi muxar undertexterna som ett valbart spår med FFmpeg och skickar tillbaka din video."
      }
    ],
    "tr": [
      {
        "title": "Video ve altyazıyı yükle",
        "body": "MP4/MOV dosyanı ve bir SRT ya da VTT dosyasını seç."
      },
      {
        "title": "Bir stil seç",
        "body": "Yazı tipi, boyut, renk, konum — ya da sade varsayılanı koru."
      },
      {
        "title": "Altyazılı MP4'ü indir",
        "body": "Altyazılar, FFmpeg aracılığıyla seçilebilir bir parça olarak eklenir ve video sana geri gönderilir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте відео та субтитри",
        "body": "Оберіть MP4/MOV і файл SRT або VTT."
      },
      {
        "title": "Налаштуйте стиль",
        "body": "Шрифт, розмір, колір, позиція — або залиште стандартний вигляд."
      },
      {
        "title": "Завантажте MP4 із субтитрами",
        "body": "Ми вбудовуємо субтитри як окрему доріжку через FFmpeg і повертаємо відео."
      }
    ],
    "vi": [
      {
        "title": "Tải lên video và phụ đề",
        "body": "Chọn file MP4/MOV cùng file SRT hoặc VTT tương ứng."
      },
      {
        "title": "Chọn kiểu hiển thị",
        "body": "Phông chữ, cỡ chữ, màu sắc, vị trí — hoặc giữ nguyên mặc định."
      },
      {
        "title": "Tải xuống MP4 đã có phụ đề",
        "body": "Chúng tôi ghép phụ đề thành track riêng bằng FFmpeg rồi trả lại video cho bạn."
      }
    ],
    "zh": [
      {
        "title": "上传视频和字幕",
        "body": "选择 MP4/MOV 文件，以及 SRT 或 VTT 字幕文件。"
      },
      {
        "title": "选择样式",
        "body": "自定义字体、大小、颜色和位置，或保留默认的简洁样式。"
      },
      {
        "title": "下载带字幕的 MP4",
        "body": "我们使用 FFmpeg 将字幕作为可选轨道嵌入，处理完毕后返回视频。"
      }
    ]
  },
  "adjust-image": {
    "ar": [
      {
        "title": "ارفع صورتك",
        "body": "JPG أو PNG أو WebP — تبقى على جهازك."
      },
      {
        "title": "حرّك شرائط التمرير",
        "body": "شاهد التغييرات تتحدث مباشرةً."
      },
      {
        "title": "صدّر النتيجة",
        "body": "نفس التنسيق، كامل الدقة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "JPG, PNG nebo WebP — zůstane na vašem zařízení."
      },
      {
        "title": "Táhněte posuvníky",
        "body": "Změny se projeví živě."
      },
      {
        "title": "Exportujte výsledek",
        "body": "Stejný formát, plné rozlišení."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "JPG, PNG oder WebP — bleibt auf deinem Gerät."
      },
      {
        "title": "Regler verschieben",
        "body": "Änderungen werden sofort live angezeigt."
      },
      {
        "title": "Ergebnis exportieren",
        "body": "Gleiches Format, volle Auflösung."
      }
    ],
    "es": [
      {
        "title": "Sube tu imagen",
        "body": "JPG, PNG o WebP — se queda en tu dispositivo."
      },
      {
        "title": "Mueve los controles deslizantes",
        "body": "Los cambios se actualizan en tiempo real."
      },
      {
        "title": "Exporta el resultado",
        "body": "Mismo formato, resolución completa."
      }
    ],
    "fr": [
      {
        "title": "Importez votre image",
        "body": "JPG, PNG ou WebP — reste sur votre appareil."
      },
      {
        "title": "Bougez les curseurs",
        "body": "Les modifications s'affichent en direct."
      },
      {
        "title": "Exportez le résultat",
        "body": "Même format, pleine résolution."
      }
    ],
    "hi": [
      {
        "title": "अपनी इमेज अपलोड करें",
        "body": "JPG, PNG या WebP — आपके डिवाइस पर रहती है।"
      },
      {
        "title": "स्लाइडर खींचें",
        "body": "बदलाव लाइव अपडेट होते देखें।"
      },
      {
        "title": "परिणाम एक्सपोर्ट करें",
        "body": "वही फॉर्मेट, पूरा रेज़ॉल्यूशन।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambarmu",
        "body": "JPG, PNG, atau WebP — tetap di perangkatmu."
      },
      {
        "title": "Geser slidernya",
        "body": "Lihat perubahan langsung secara real-time."
      },
      {
        "title": "Ekspor hasilnya",
        "body": "Format sama, resolusi penuh."
      }
    ],
    "it": [
      {
        "title": "Carica la tua immagine",
        "body": "JPG, PNG o WebP — rimane sul tuo dispositivo."
      },
      {
        "title": "Trascina i cursori",
        "body": "Le modifiche si aggiornano in tempo reale."
      },
      {
        "title": "Esporta il risultato",
        "body": "Stesso formato, risoluzione piena."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "JPG、PNG または WebP。デバイス上に保持されます。"
      },
      {
        "title": "スライダーを調整",
        "body": "変更結果をリアルタイムで確認。"
      },
      {
        "title": "結果をエクスポート",
        "body": "同じ形式でフル解像度のまま出力。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "JPG, PNG 또는 WebP — 기기에 머무릅니다."
      },
      {
        "title": "슬라이더 조정",
        "body": "변경 사항이 실시간으로 반영됩니다."
      },
      {
        "title": "결과 내보내기",
        "body": "원본 형식, 전체 해상도 그대로."
      }
    ],
    "nl": [
      {
        "title": "Upload je afbeelding",
        "body": "JPG, PNG of WebP — blijft op je apparaat."
      },
      {
        "title": "Versleep de schuifregelaars",
        "body": "Zie de wijzigingen live bijwerken."
      },
      {
        "title": "Exporteer het resultaat",
        "body": "Zelfde formaat, volledige resolutie."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "JPG, PNG lub WebP — zostaje na Twoim urządzeniu."
      },
      {
        "title": "Przeciągaj suwaki",
        "body": "Zmiany widać na żywo."
      },
      {
        "title": "Eksportuj wynik",
        "body": "Ten sam format, pełna rozdzielczość."
      }
    ],
    "pt": [
      {
        "title": "Carregue a sua imagem",
        "body": "JPG, PNG ou WebP — fica no seu dispositivo."
      },
      {
        "title": "Arraste os controlos",
        "body": "Veja as alterações em tempo real."
      },
      {
        "title": "Exporte o resultado",
        "body": "Mesmo formato, resolução total."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPG, PNG или WebP — остаётся на вашем устройстве."
      },
      {
        "title": "Двигайте ползунки",
        "body": "Изменения отображаются в реальном времени."
      },
      {
        "title": "Экспортируйте результат",
        "body": "Тот же формат, полное разрешение."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din bild",
        "body": "JPG, PNG eller WebP — stannar på din enhet."
      },
      {
        "title": "Dra i reglagen",
        "body": "Se ändringarna uppdateras live."
      },
      {
        "title": "Exportera resultatet",
        "body": "Samma format, full upplösning."
      }
    ],
    "tr": [
      {
        "title": "Görselini yükle",
        "body": "JPG, PNG veya WebP — cihazında kalır."
      },
      {
        "title": "Kaydırıcıları sürükle",
        "body": "Değişiklikler canlı olarak güncellenir."
      },
      {
        "title": "Sonucu dışa aktar",
        "body": "Aynı format, tam çözünürlük."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPG, PNG або WebP — залишається на пристрої."
      },
      {
        "title": "Рухайте повзунки",
        "body": "Зміни відображаються в реальному часі."
      },
      {
        "title": "Збережіть результат",
        "body": "Той самий формат, повна роздільна здатність."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "JPG, PNG hoặc WebP — ở lại trên thiết bị của bạn."
      },
      {
        "title": "Kéo các thanh trượt",
        "body": "Xem thay đổi cập nhật trực tiếp."
      },
      {
        "title": "Xuất kết quả",
        "body": "Cùng định dạng, độ phân giải đầy đủ."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "支持 JPG、PNG 或 WebP，文件保留在本地设备。"
      },
      {
        "title": "拖动滑块调整",
        "body": "实时预览调整效果。"
      },
      {
        "title": "导出结果",
        "body": "保留原始格式和完整分辨率。"
      }
    ]
  },
  "ai-detector": {
    "ar": [
      {
        "title": "الصق فقرة",
        "body": "بضع جمل على الأقل للحصول على تقدير مفيد."
      },
      {
        "title": "الذكاء الاصطناعي يُحلّل الأسلوب",
        "body": "يبحث عن علامات الكتابة الاصطناعية — انتقالات رسمية مفرطة وإيقاع منتظم وعبارات تحوّط."
      },
      {
        "title": "احصل على نتيجة",
        "body": "احتمال من 0 إلى 100 مع العبارات والأسباب المُعلَّمة."
      }
    ],
    "cs": [
      {
        "title": "Vložte odstavec",
        "body": "Alespoň pár vět pro smysluplný odhad."
      },
      {
        "title": "AI analyzuje styl",
        "body": "Hledá znaky AI textu — přepjaté přechody, jednotvárné tempo, klišé."
      },
      {
        "title": "Získejte skóre",
        "body": "Pravděpodobnost 0–100 plus označené fráze a důvody."
      }
    ],
    "de": [
      {
        "title": "Absatz einfügen",
        "body": "Mindestens ein paar Sätze für eine aussagekräftige Einschätzung."
      },
      {
        "title": "KI analysiert den Stil",
        "body": "Sucht nach KI-typischen Merkmalen — überfomale Übergänge, gleichmäßiges Tempo, Absicherungsfloskeln."
      },
      {
        "title": "Score erhalten",
        "body": "Wahrscheinlichkeit 0–100 plus markierte Phrasen und Begründungen."
      }
    ],
    "es": [
      {
        "title": "Pega un párrafo",
        "body": "Al menos unas cuantas frases para obtener una estimación útil."
      },
      {
        "title": "La IA analiza el estilo",
        "body": "Detecta señales de IA: transiciones demasiado formales, ritmo uniforme, clichés evasivos."
      },
      {
        "title": "Obtén una puntuación",
        "body": "Probabilidad del 0 al 100, con frases marcadas y explicaciones."
      }
    ],
    "fr": [
      {
        "title": "Collez un paragraphe",
        "body": "Au moins quelques phrases pour une estimation utile."
      },
      {
        "title": "L'IA analyse le style",
        "body": "Repère les signes d'IA : transitions trop formelles, rythme uniforme, clichés prudents."
      },
      {
        "title": "Obtenez un score",
        "body": "Probabilité de 0 à 100, avec les phrases signalées et les raisons."
      }
    ],
    "hi": [
      {
        "title": "एक पैराग्राफ पेस्ट करें",
        "body": "उपयोगी अनुमान के लिए कम से कम कुछ वाक्य।"
      },
      {
        "title": "AI स्टाइल का विश्लेषण करता है",
        "body": "AI के संकेतों की तलाश — अति-औपचारिक ट्रांज़िशन, एकसमान पेसिंग, हेजिंग क्लिशे।"
      },
      {
        "title": "स्कोर पाएं",
        "body": "0-100 संभावना के साथ फ्लैग किए गए वाक्यांश और कारण।"
      }
    ],
    "id": [
      {
        "title": "Tempel paragraf",
        "body": "Minimal beberapa kalimat untuk estimasi yang berguna."
      },
      {
        "title": "AI menganalisis gayanya",
        "body": "Mencari ciri khas AI — transisi terlalu formal, ritme seragam, klise berhati-hati."
      },
      {
        "title": "Dapatkan skor",
        "body": "Kemungkinan 0–100 ditambah frasa dan alasan yang ditandai."
      }
    ],
    "it": [
      {
        "title": "Incolla un paragrafo",
        "body": "Almeno qualche frase per una stima utile."
      },
      {
        "title": "L'AI analizza lo stile",
        "body": "Cerca i segnali tipici dell'AI — transizioni eccessivamente formali, ritmo uniforme, cliché prudenziali."
      },
      {
        "title": "Ottieni un punteggio",
        "body": "Probabilità da 0 a 100, con le frasi segnalate e le motivazioni."
      }
    ],
    "ja": [
      {
        "title": "段落をペースト",
        "body": "有用な推定には少なくとも数文が必要です。"
      },
      {
        "title": "AIがスタイルを分析",
        "body": "過度にフォーマルな表現・均一なテンポ・決まり文句などを検出。"
      },
      {
        "title": "スコアを取得",
        "body": "0〜100のAI可能性スコア、フラグされたフレーズと理由を表示。"
      }
    ],
    "ko": [
      {
        "title": "문단 붙여넣기",
        "body": "유용한 추정치를 위해 최소 몇 문장 이상이어야 합니다."
      },
      {
        "title": "AI가 문체를 분석합니다",
        "body": "과도하게 격식적인 전환어, 균일한 리듬, 전형적인 완곡 표현 등 AI 특성을 파악합니다."
      },
      {
        "title": "점수 확인",
        "body": "0–100 AI 가능성 점수와 표시된 문구 및 이유."
      }
    ],
    "nl": [
      {
        "title": "Plak een alinea",
        "body": "Minimaal een paar zinnen voor een zinvolle schatting."
      },
      {
        "title": "AI analyseert de stijl",
        "body": "Zoekt naar AI-kenmerken — te formele overgangen, egaal tempo, hedging-clichés."
      },
      {
        "title": "Ontvang een score",
        "body": "0–100 kans plus gemarkeerde zinsdelen en redenen."
      }
    ],
    "pl": [
      {
        "title": "Wklej akapit",
        "body": "Co najmniej kilka zdań, aby wynik był miarodajny."
      },
      {
        "title": "AI analizuje styl",
        "body": "Szuka cech AI — zbyt formalnych przejść, równomiernego rytmu, szablonowych zwrotów."
      },
      {
        "title": "Otrzymaj wynik",
        "body": "Prawdopodobieństwo 0–100 oraz oznaczone frazy i powody."
      }
    ],
    "pt": [
      {
        "title": "Cole um parágrafo",
        "body": "Pelo menos algumas frases para uma estimativa útil."
      },
      {
        "title": "A IA analisa o estilo",
        "body": "Deteta marcas de IA — transições excessivamente formais, ritmo uniforme, clichês cautelosos."
      },
      {
        "title": "Obtenha uma pontuação",
        "body": "Probabilidade de 0–100 mais frases sinalizadas e razões."
      }
    ],
    "ru": [
      {
        "title": "Вставьте абзац",
        "body": "Хотя бы несколько предложений для достоверной оценки."
      },
      {
        "title": "ИИ анализирует стиль",
        "body": "Ищет признаки ИИ-генерации: формальные переходы, равномерный темп, шаблонные оговорки."
      },
      {
        "title": "Получите оценку",
        "body": "Вероятность от 0 до 100 с выделенными фразами и пояснениями."
      }
    ],
    "sv": [
      {
        "title": "Klistra in ett stycke",
        "body": "Minst några meningar för en användbar uppskattning."
      },
      {
        "title": "AI analyserar stilen",
        "body": "Letar efter AI-tecken — övertydliga övergångar, jämnt tempo, klichéartade formuleringar."
      },
      {
        "title": "Få ett poäng",
        "body": "0–100 sannolikhet plus flaggade fraser och förklaringar."
      }
    ],
    "tr": [
      {
        "title": "Bir paragraf yapıştır",
        "body": "Yararlı bir tahmin için en az birkaç cümle."
      },
      {
        "title": "AI stili analiz ediyor",
        "body": "AI belirtilerine bakıyor — aşırı resmi geçişler, düzgün tempo, klişe ifadeler."
      },
      {
        "title": "Bir puan al",
        "body": "0-100 olasılık skoru, işaretlenen ifadeler ve gerekçeler."
      }
    ],
    "uk": [
      {
        "title": "Вставте абзац",
        "body": "Хоча б кілька речень для достовірної оцінки."
      },
      {
        "title": "ШІ аналізує стиль",
        "body": "Шукає ознаки ШІ — надмірно формальні переходи, рівномірний темп, кліше-застереження."
      },
      {
        "title": "Отримайте оцінку",
        "body": "Ймовірність 0–100 плюс позначені фрази з поясненнями."
      }
    ],
    "vi": [
      {
        "title": "Dán một đoạn văn",
        "body": "Ít nhất vài câu để có ước tính hữu ích."
      },
      {
        "title": "AI phân tích phong cách",
        "body": "Tìm dấu hiệu của AI — chuyển tiếp quá trang trọng, nhịp điệu đồng đều, sáo ngữ dự phòng."
      },
      {
        "title": "Nhận điểm số",
        "body": "Xác suất 0–100 kèm các cụm từ và lý do bị gắn cờ."
      }
    ],
    "zh": [
      {
        "title": "粘贴一段文字",
        "body": "至少几个句子，以获得有参考价值的估算结果。"
      },
      {
        "title": "AI 分析文风",
        "body": "检测 AI 特征——过于正式的过渡语、节奏单一、套话式表达。"
      },
      {
        "title": "获取评分",
        "body": "0–100 的 AI 可能性评分，并标注可疑短语及原因。"
      }
    ]
  },
  "anonymize-text": {
    "ar": [
      {
        "title": "الصق نصك",
        "body": "سجلات أو نصوص أو وثائق — أي شيء يحتوي بيانات شخصية."
      },
      {
        "title": "اختر الأسلوب",
        "body": "تسميات مكتوبة مثل [EMAIL]، أو قناع ••••، أو حذف كامل."
      },
      {
        "title": "انسخ أو حمّل",
        "body": "يجري الحجب محليًا — نصك لا يغادر الصفحة أبدًا."
      }
    ],
    "cs": [
      {
        "title": "Vložte text",
        "body": "Logy, přepisy, dokumenty — cokoli s osobními údaji."
      },
      {
        "title": "Zvolte styl",
        "body": "Štítky jako [EMAIL], maska ••••, nebo úplné odstranění."
      },
      {
        "title": "Zkopírujte nebo stáhněte",
        "body": "Anonymizace probíhá lokálně — váš text nikdy neopustí stránku."
      }
    ],
    "de": [
      {
        "title": "Text einfügen",
        "body": "Logs, Transkripte, Dokumente — alles mit persönlichen Daten."
      },
      {
        "title": "Stil wählen",
        "body": "Labels wie [E-MAIL], eine ••••-Maskierung oder vollständige Entfernung."
      },
      {
        "title": "Kopieren oder herunterladen",
        "body": "Die Schwärzung läuft lokal — dein Text verlässt die Seite nie."
      }
    ],
    "es": [
      {
        "title": "Pega tu texto",
        "body": "Registros, transcripciones, documentos — cualquier cosa con datos personales."
      },
      {
        "title": "Elige el estilo",
        "body": "Etiquetas como [EMAIL], una máscara ••••, o eliminación completa."
      },
      {
        "title": "Copia o descarga",
        "body": "La anonimización se ejecuta localmente — tu texto nunca sale de la página."
      }
    ],
    "fr": [
      {
        "title": "Collez votre texte",
        "body": "Logs, transcriptions, documents — tout ce qui contient des données personnelles."
      },
      {
        "title": "Choisissez un style",
        "body": "Étiquettes comme [EMAIL], un masque ••••, ou suppression complète."
      },
      {
        "title": "Copiez ou téléchargez",
        "body": "La rédaction s'effectue localement — votre texte ne quitte pas la page."
      }
    ],
    "hi": [
      {
        "title": "अपना टेक्स्ट पेस्ट करें",
        "body": "लॉग, ट्रांसक्रिप्ट, दस्तावेज़ — व्यक्तिगत डेटा वाला कुछ भी।"
      },
      {
        "title": "स्टाइल चुनें",
        "body": "[EMAIL] जैसे टाइप्ड लेबल, •••• मास्क, या पूरी तरह हटाना।"
      },
      {
        "title": "कॉपी या डाउनलोड करें",
        "body": "रिडैक्शन लोकल रूप से चलता है — आपका टेक्स्ट पेज नहीं छोड़ता।"
      }
    ],
    "id": [
      {
        "title": "Tempel teks kamu",
        "body": "Log, transkrip, dokumen — apa saja yang mengandung data pribadi."
      },
      {
        "title": "Pilih gaya",
        "body": "Label bertipe seperti [EMAIL], sensor ••••, atau penghapusan penuh."
      },
      {
        "title": "Salin atau unduh",
        "body": "Penyensoran berjalan secara lokal — teks tidak pernah meninggalkan halaman."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo testo",
        "body": "Log, trascrizioni, documenti — qualsiasi cosa contenga dati personali."
      },
      {
        "title": "Scegli uno stile",
        "body": "Etichette come [EMAIL], una maschera con ••••, o rimozione completa."
      },
      {
        "title": "Copia o scarica",
        "body": "La redazione avviene in locale — il tuo testo non lascia mai la pagina."
      }
    ],
    "ja": [
      {
        "title": "テキストをペースト",
        "body": "ログ・トランスクリプト・個人情報を含むドキュメントなど。"
      },
      {
        "title": "スタイルを選択",
        "body": "[EMAIL] などのラベル、•••• マスク、または完全削除。"
      },
      {
        "title": "コピーまたはダウンロード",
        "body": "匿名化はローカルで実行。テキストはページ外に送信されません。"
      }
    ],
    "ko": [
      {
        "title": "텍스트 붙여넣기",
        "body": "로그, 대본, 문서 — 개인 정보가 포함된 모든 텍스트."
      },
      {
        "title": "스타일 선택",
        "body": "[EMAIL]과 같은 레이블, •••• 마스킹, 또는 완전 제거."
      },
      {
        "title": "복사 또는 다운로드",
        "body": "익명화가 로컬에서 실행됩니다 — 텍스트가 페이지를 벗어나지 않습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je tekst",
        "body": "Logbestanden, transcripties, documenten — alles met persoonsgegevens."
      },
      {
        "title": "Kies een stijl",
        "body": "Labels zoals [EMAIL], een ••••-masker of volledige verwijdering."
      },
      {
        "title": "Kopiëren of downloaden",
        "body": "De anonimisering verloopt lokaal — je tekst verlaat de pagina nooit."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój tekst",
        "body": "Logi, transkrypty, dokumenty — wszystko z danymi osobowymi."
      },
      {
        "title": "Wybierz styl",
        "body": "Etykiety takie jak [EMAIL], maska ••••, lub całkowite usunięcie."
      },
      {
        "title": "Skopiuj lub pobierz",
        "body": "Redakcja działa lokalnie — Twój tekst nigdzie nie trafia."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu texto",
        "body": "Registos, transcrições, documentos — qualquer coisa com dados pessoais."
      },
      {
        "title": "Escolha um estilo",
        "body": "Etiquetas como [EMAIL], uma máscara ••••, ou remoção total."
      },
      {
        "title": "Copie ou baixe",
        "body": "A redação corre localmente — o seu texto nunca sai da página."
      }
    ],
    "ru": [
      {
        "title": "Вставьте текст",
        "body": "Логи, транскрипты, документы — всё, что содержит персональные данные."
      },
      {
        "title": "Выберите стиль",
        "body": "Метки вроде [EMAIL], маска •••• или полное удаление."
      },
      {
        "title": "Скопируйте или скачайте",
        "body": "Обработка выполняется локально — текст не покидает страницу."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din text",
        "body": "Loggar, transkript, dokument — vad som helst med personuppgifter."
      },
      {
        "title": "Välj en stil",
        "body": "Typade etiketter som [EMAIL], en ••••-mask eller fullständig borttagning."
      },
      {
        "title": "Kopiera eller ladda ned",
        "body": "Redigeringen sker lokalt — din text lämnar aldrig sidan."
      }
    ],
    "tr": [
      {
        "title": "Metnini yapıştır",
        "body": "Günlükler, transkriptler, belgeler — kişisel veri içeren her şey."
      },
      {
        "title": "Bir stil seç",
        "body": "[E-POSTA] gibi yazılı etiketler, •••• maskesi veya tamamen kaldırma."
      },
      {
        "title": "Kopyala veya indir",
        "body": "Redaksiyon yerel olarak çalışır — metnin sayfadan çıkmaz."
      }
    ],
    "uk": [
      {
        "title": "Вставте текст",
        "body": "Логи, транскрипти, документи — будь-що з персональними даними."
      },
      {
        "title": "Оберіть стиль",
        "body": "Мітки на зразок [EMAIL], маска ••••, або повне видалення."
      },
      {
        "title": "Скопіюйте або завантажте",
        "body": "Редагування відбувається локально — текст не покидає сторінку."
      }
    ],
    "vi": [
      {
        "title": "Dán văn bản vào đây",
        "body": "Nhật ký, bản ghi, tài liệu — bất kỳ nội dung nào có dữ liệu cá nhân."
      },
      {
        "title": "Chọn kiểu ẩn danh",
        "body": "Nhãn kiểu [EMAIL], mặt nạ ••••, hoặc xóa hoàn toàn."
      },
      {
        "title": "Sao chép hoặc tải xuống",
        "body": "Quá trình ẩn danh chạy cục bộ — văn bản không rời khỏi trang."
      }
    ],
    "zh": [
      {
        "title": "粘贴文本",
        "body": "日志、文字稿、文档——任何含个人信息的内容均可。"
      },
      {
        "title": "选择处理方式",
        "body": "标签替换如 [EMAIL]、•••• 遮盖，或完全删除。"
      },
      {
        "title": "复制或下载",
        "body": "脱敏在本地运行，文本不会离开页面。"
      }
    ]
  },
  "api": {
    "ar": [
      {
        "title": "احصل على مفتاح API",
        "body": "متاح في خطة Business أو بالدفع حسب الاستخدام."
      },
      {
        "title": "أرسل طلبك بـ POST",
        "body": "نقاط نهاية REST لكل أداة. Webhooks للمهام طويلة الأمد."
      },
      {
        "title": "استلم ملفك",
        "body": "استجابة JSON مع رابط تنزيل موقّع."
      }
    ],
    "cs": [
      {
        "title": "Získejte API klíč",
        "body": "K dispozici v plánu Business nebo na bázi platby za použití."
      },
      {
        "title": "Odešlete úlohu přes POST",
        "body": "REST endpointy pro každý nástroj. Webhooky pro dlouhotrvající úlohy."
      },
      {
        "title": "Přijměte soubor",
        "body": "JSON odpověď s podepsanou URL ke stažení."
      }
    ],
    "de": [
      {
        "title": "API-Schlüssel holen",
        "body": "Verfügbar im Business-Plan oder Pay-as-you-go."
      },
      {
        "title": "Job per POST senden",
        "body": "REST-Endpunkte für jedes Tool. Webhooks für lang laufende Jobs."
      },
      {
        "title": "Datei empfangen",
        "body": "JSON-Antwort mit einer signierten Download-URL."
      }
    ],
    "es": [
      {
        "title": "Obtén una clave de API",
        "body": "Disponible en el plan Business o con pago por uso."
      },
      {
        "title": "Envía tu trabajo por POST",
        "body": "Endpoints REST para cada herramienta. Webhooks para tareas largas."
      },
      {
        "title": "Recibe tu archivo",
        "body": "Respuesta JSON con una URL de descarga firmada."
      }
    ],
    "fr": [
      {
        "title": "Obtenez une clé API",
        "body": "Disponible avec le forfait Business ou en paiement à l'usage."
      },
      {
        "title": "Envoyez votre requête",
        "body": "Endpoints REST pour chaque outil. Webhooks pour les traitements longs."
      },
      {
        "title": "Récupérez votre fichier",
        "body": "Réponse JSON avec une URL de téléchargement signée."
      }
    ],
    "hi": [
      {
        "title": "API key पाएं",
        "body": "Business प्लान पर या पे-एज़-यू-गो में उपलब्ध।"
      },
      {
        "title": "अपना जॉब POST करें",
        "body": "हर टूल के लिए REST एंडपॉइंट। लंबे जॉब के लिए Webhooks।"
      },
      {
        "title": "फ़ाइल प्राप्त करें",
        "body": "साइन किए गए डाउनलोड URL के साथ JSON रिस्पॉन्स।"
      }
    ],
    "id": [
      {
        "title": "Dapatkan kunci API",
        "body": "Tersedia pada paket Business atau bayar sesuai penggunaan."
      },
      {
        "title": "POST pekerjaan kamu",
        "body": "Endpoint REST untuk setiap alat. Webhook untuk pekerjaan yang berjalan lama."
      },
      {
        "title": "Terima file kamu",
        "body": "Respons JSON dengan URL unduhan bertanda tangan."
      }
    ],
    "it": [
      {
        "title": "Ottieni una chiave API",
        "body": "Disponibile con il piano Business o con il pagamento a consumo."
      },
      {
        "title": "Invia il tuo job via POST",
        "body": "Endpoint REST per ogni strumento. Webhook per i job a lunga esecuzione."
      },
      {
        "title": "Ricevi il tuo file",
        "body": "Risposta JSON con un URL di download firmato."
      }
    ],
    "ja": [
      {
        "title": "APIキーを取得",
        "body": "Businessプランまたは従量課金で利用可能。"
      },
      {
        "title": "ジョブを POST",
        "body": "全ツール対応の REST エンドポイント。長時間ジョブにはWebhookを使用。"
      },
      {
        "title": "ファイルを受け取る",
        "body": "署名付きダウンロードURLを含む JSON レスポンスが返されます。"
      }
    ],
    "ko": [
      {
        "title": "API 키 발급",
        "body": "비즈니스 플랜 또는 사용량 기반 요금제에서 사용 가능합니다."
      },
      {
        "title": "작업 POST 요청",
        "body": "모든 도구에 대한 REST 엔드포인트. 장시간 작업에는 웹훅을 사용하세요."
      },
      {
        "title": "파일 수신",
        "body": "서명된 다운로드 URL이 포함된 JSON 응답을 받습니다."
      }
    ],
    "nl": [
      {
        "title": "Haal een API-sleutel op",
        "body": "Beschikbaar in het Business-abonnement of per gebruik."
      },
      {
        "title": "Stuur je taak in via POST",
        "body": "REST-endpoints voor elke tool. Webhooks voor langlopende taken."
      },
      {
        "title": "Ontvang je bestand",
        "body": "JSON-respons met een ondertekende download-URL."
      }
    ],
    "pl": [
      {
        "title": "Uzyskaj klucz API",
        "body": "Dostępny w planie Business lub w modelu płatności za użycie."
      },
      {
        "title": "Wyślij zadanie przez POST",
        "body": "Endpointy REST dla każdego narzędzia. Webhooki dla długich zadań."
      },
      {
        "title": "Odbierz swój plik",
        "body": "Odpowiedź JSON z podpisanym adresem URL do pobrania."
      }
    ],
    "pt": [
      {
        "title": "Obtenha uma chave API",
        "body": "Disponível no plano Business ou com pagamento por utilização."
      },
      {
        "title": "Envie o seu job via POST",
        "body": "Endpoints REST para todas as ferramentas. Webhooks para jobs de longa duração."
      },
      {
        "title": "Receba o seu ficheiro",
        "body": "Resposta JSON com um URL de download assinado."
      }
    ],
    "ru": [
      {
        "title": "Получите API-ключ",
        "body": "Доступен в тарифе Business или по системе pay-as-you-go."
      },
      {
        "title": "Отправьте задачу через POST",
        "body": "REST-эндпоинты для каждого инструмента. Вебхуки для долгих операций."
      },
      {
        "title": "Получите файл",
        "body": "JSON-ответ со ссылкой для скачивания."
      }
    ],
    "sv": [
      {
        "title": "Skaffa en API-nyckel",
        "body": "Tillgänglig på Business-planen eller betala per användning."
      },
      {
        "title": "POST ditt jobb",
        "body": "REST-endpoints för varje verktyg. Webhooks för långvariga jobb."
      },
      {
        "title": "Ta emot din fil",
        "body": "JSON-svar med en signerad nedladdnings-URL."
      }
    ],
    "tr": [
      {
        "title": "API anahtarı al",
        "body": "Business planında veya kullandıkça öde modeliyle kullanılabilir."
      },
      {
        "title": "İşini POST et",
        "body": "Her araç için REST uç noktaları. Uzun işlemler için webhook desteği."
      },
      {
        "title": "Dosyanı al",
        "body": "İmzalı indirme URL'si içeren JSON yanıtı."
      }
    ],
    "uk": [
      {
        "title": "Отримайте API-ключ",
        "body": "Доступно на тарифі Business або з оплатою за використання."
      },
      {
        "title": "Надішліть запит",
        "body": "REST-ендпоїнти для кожного інструменту. Вебхуки для тривалих завдань."
      },
      {
        "title": "Отримайте файл",
        "body": "JSON-відповідь із підписаним посиланням для завантаження."
      }
    ],
    "vi": [
      {
        "title": "Lấy API key",
        "body": "Có sẵn trên gói Business hoặc thanh toán theo lượng dùng."
      },
      {
        "title": "Gửi yêu cầu POST",
        "body": "Endpoint REST cho mọi công cụ. Webhook cho các tác vụ chạy lâu."
      },
      {
        "title": "Nhận file kết quả",
        "body": "Phản hồi JSON kèm URL tải xuống có chữ ký."
      }
    ],
    "zh": [
      {
        "title": "获取 API 密钥",
        "body": "适用于商业版套餐或按需付费。"
      },
      {
        "title": "提交任务",
        "body": "每个工具均有 REST 接口，长耗时任务支持 Webhook 回调。"
      },
      {
        "title": "获取结果文件",
        "body": "JSON 响应中包含带签名的下载链接。"
      }
    ]
  },
  "auto-sync": {
    "ar": [
      {
        "title": "ارفع الفيديو والترجمة",
        "body": "نحتاج كليهما — الصوت هو المرجع."
      },
      {
        "title": "الذكاء الاصطناعي يُعيد محاذاة كل إشارة",
        "body": "المحاذاة الإجبارية تطابق كل سطر مع موضع نطقه الفعلي."
      },
      {
        "title": "حمّل SRT متزامنة",
        "body": "الإشارات تقع الآن بدقة على الكلمات المنطوقة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte video a titulky",
        "body": "Potřebujeme obojí — zvuk slouží jako reference."
      },
      {
        "title": "AI srovná každou stopu",
        "body": "Nucené zarovnání přiřadí každý řádek k místu, kde je skutečně vyslovený."
      },
      {
        "title": "Stáhněte synchronizovaný SRT",
        "body": "Stopy nyní sedí přesně na mluvených slovech."
      }
    ],
    "de": [
      {
        "title": "Video und Untertitel hochladen",
        "body": "Wir brauchen beides — das Audio dient als Referenz."
      },
      {
        "title": "KI richtet jeden Cue neu aus",
        "body": "Forced Alignment ordnet jede Zeile genau dem gesprochenen Wort zu."
      },
      {
        "title": "Synchronisiertes SRT herunterladen",
        "body": "Cues sitzen jetzt exakt auf den gesprochenen Wörtern."
      }
    ],
    "es": [
      {
        "title": "Sube el vídeo y los subtítulos",
        "body": "Necesitamos ambos — el audio es la referencia."
      },
      {
        "title": "La IA realinea cada pista",
        "body": "La alineación forzada une cada línea al momento exacto en que se dice."
      },
      {
        "title": "Descarga el SRT sincronizado",
        "body": "Las pistas ahora coinciden exactamente con las palabras habladas."
      }
    ],
    "fr": [
      {
        "title": "Importez la vidéo et les sous-titres",
        "body": "Nous avons besoin des deux — l'audio sert de référence."
      },
      {
        "title": "L'IA réaligne chaque réplique",
        "body": "L'alignement forcé cale chaque ligne sur ce qui est effectivement dit."
      },
      {
        "title": "Téléchargez un SRT synchronisé",
        "body": "Les répliques sont désormais calées exactement sur les mots prononcés."
      }
    ],
    "hi": [
      {
        "title": "वीडियो + सबटाइटल अपलोड करें",
        "body": "हमें दोनों चाहिए — ऑडियो ही रेफरेंस है।"
      },
      {
        "title": "AI हर क्यू को रीअलाइन करता है",
        "body": "फोर्स्ड अलाइनमेंट हर लाइन को ठीक वहाँ मिलाता है जहाँ वह बोली गई है।"
      },
      {
        "title": "सिंक किया हुआ SRT डाउनलोड करें",
        "body": "क्यूज़ अब बोले गए शब्दों पर बिल्कुल सटीक बैठते हैं।"
      }
    ],
    "id": [
      {
        "title": "Unggah video + subtitle",
        "body": "Keduanya diperlukan — audio adalah referensinya."
      },
      {
        "title": "AI menyelaraskan setiap cue",
        "body": "Penyelarasan paksa mencocokkan setiap baris dengan bagian yang benar-benar diucapkan."
      },
      {
        "title": "Unduh SRT yang sudah sinkron",
        "body": "Cue kini tepat berada di kata-kata yang diucapkan."
      }
    ],
    "it": [
      {
        "title": "Carica video e sottotitoli",
        "body": "Ci servono entrambi — l'audio è il riferimento."
      },
      {
        "title": "L'AI riallinea ogni cue",
        "body": "L'allineamento forzato associa ogni riga al momento esatto in cui viene pronunciata."
      },
      {
        "title": "Scarica il file SRT sincronizzato",
        "body": "Le cue ora coincidono esattamente con le parole pronunciate."
      }
    ],
    "ja": [
      {
        "title": "動画と字幕をアップロード",
        "body": "両方必要です。音声が基準になります。"
      },
      {
        "title": "AIが各キューを再調整",
        "body": "強制アライメントで各セリフの実際の発話位置に合わせます。"
      },
      {
        "title": "同期済み SRT をダウンロード",
        "body": "キューが発話と完全に一致した状態になります。"
      }
    ],
    "ko": [
      {
        "title": "동영상 + 자막 업로드",
        "body": "둘 다 필요합니다 — 오디오가 기준이 됩니다."
      },
      {
        "title": "AI가 각 큐를 재정렬합니다",
        "body": "강제 정렬로 모든 줄이 실제 발화 위치에 맞춰집니다."
      },
      {
        "title": "싱크된 SRT 다운로드",
        "body": "큐가 발화 내용에 정확히 일치합니다."
      }
    ],
    "nl": [
      {
        "title": "Upload video + ondertitels",
        "body": "We hebben beide nodig — de audio is de referentie."
      },
      {
        "title": "AI lijnt elke cue opnieuw uit",
        "body": "Geforceerde uitlijning koppelt elke regel aan het moment waarop het echt gezegd wordt."
      },
      {
        "title": "Download een gesynchroniseerde SRT",
        "body": "Cues zitten nu precies op de gesproken woorden."
      }
    ],
    "pl": [
      {
        "title": "Prześlij wideo i napisy",
        "body": "Potrzebujemy obu plików — dźwięk jest punktem odniesienia."
      },
      {
        "title": "AI wyrównuje każdą wskazówkę",
        "body": "Wymuszone wyrównanie dopasowuje każdą linię do momentu, gdy jest faktycznie wypowiadana."
      },
      {
        "title": "Pobierz zsynchronizowany plik SRT",
        "body": "Wskazówki leżą dokładnie na wypowiadanych słowach."
      }
    ],
    "pt": [
      {
        "title": "Carregue vídeo + legendas",
        "body": "Precisamos dos dois — o áudio é a referência."
      },
      {
        "title": "A IA realinha cada cue",
        "body": "O alinhamento forçado associa cada linha ao momento exato em que é falada."
      },
      {
        "title": "Baixe o SRT sincronizado",
        "body": "As cues ficam exatamente sobre as palavras faladas."
      }
    ],
    "ru": [
      {
        "title": "Загрузите видео и субтитры",
        "body": "Нужны оба файла — аудио используется как эталон."
      },
      {
        "title": "ИИ выравнивает каждую реплику",
        "body": "Принудительное выравнивание привязывает каждую строку к моменту произнесения."
      },
      {
        "title": "Скачайте синхронизированный SRT",
        "body": "Реплики теперь точно совпадают с речью."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp video och undertexter",
        "body": "Vi behöver båda — ljudet är referensen."
      },
      {
        "title": "AI justerar varje cue",
        "body": "Forcerad anpassning matchar varje rad mot det talade stället."
      },
      {
        "title": "Ladda ned en synkad SRT",
        "body": "Cues sitter nu exakt på de talade orden."
      }
    ],
    "tr": [
      {
        "title": "Video ve altyazıyı yükle",
        "body": "İkisine de ihtiyacımız var — ses referans kaynağıdır."
      },
      {
        "title": "AI her ipucunu yeniden hizalıyor",
        "body": "Zorla hizalama, her satırı gerçekte söylendiği yere eşler."
      },
      {
        "title": "Senkronize SRT dosyasını indir",
        "body": "İpuçları artık konuşulan sözcüklerin tam üzerinde oturuyor."
      }
    ],
    "uk": [
      {
        "title": "Завантажте відео та субтитри",
        "body": "Потрібні обидва — аудіо є точкою відліку."
      },
      {
        "title": "ШІ вирівнює кожен рядок",
        "body": "Примусове вирівнювання прив'язує кожну фразу до моменту звучання."
      },
      {
        "title": "Завантажте синхронізований SRT",
        "body": "Рядки точно збігаються зі словами."
      }
    ],
    "vi": [
      {
        "title": "Tải lên video và phụ đề",
        "body": "Cần cả hai — âm thanh là tham chiếu."
      },
      {
        "title": "AI căn chỉnh lại từng cue",
        "body": "Căn chỉnh cưỡng bức khớp mỗi dòng với thời điểm thực sự được nói."
      },
      {
        "title": "Tải xuống file SRT đã đồng bộ",
        "body": "Các cue giờ khớp chính xác với lời thoại."
      }
    ],
    "zh": [
      {
        "title": "上传视频和字幕",
        "body": "两者都需要——音频是对齐的参考基准。"
      },
      {
        "title": "AI 重新对齐每条字幕",
        "body": "强制对齐技术将每一行精准匹配到实际语音位置。"
      },
      {
        "title": "下载同步后的 SRT",
        "body": "每条字幕与说话内容完全对应。"
      }
    ]
  },
  "barcode-generator": {
    "ar": [
      {
        "title": "اختر التنسيق",
        "body": "Code 128 وEAN-13 وUPC وCode 39 وغيرها."
      },
      {
        "title": "اكتب القيمة",
        "body": "أمثلة متاحة لكل تنسيق."
      },
      {
        "title": "حمّل",
        "body": "PNG للطباعة، SVG للتصميم."
      }
    ],
    "cs": [
      {
        "title": "Vyberte formát",
        "body": "Code 128, EAN-13, UPC, Code 39 a další."
      },
      {
        "title": "Zadejte hodnotu",
        "body": "Pro každý formát jsou přiloženy ukázky."
      },
      {
        "title": "Stáhněte",
        "body": "PNG pro tisk, SVG pro design."
      }
    ],
    "de": [
      {
        "title": "Format wählen",
        "body": "Code 128, EAN-13, UPC, Code 39 und mehr."
      },
      {
        "title": "Wert eingeben",
        "body": "Für jedes Format sind Beispieldaten enthalten."
      },
      {
        "title": "Herunterladen",
        "body": "PNG für den Druck, SVG für das Design."
      }
    ],
    "es": [
      {
        "title": "Elige el formato",
        "body": "Code 128, EAN-13, UPC, Code 39 y más."
      },
      {
        "title": "Escribe el valor",
        "body": "Ejemplos incluidos para cada formato."
      },
      {
        "title": "Descarga",
        "body": "PNG para imprimir, SVG para diseño."
      }
    ],
    "fr": [
      {
        "title": "Choisissez un format",
        "body": "Code 128, EAN-13, UPC, Code 39 et bien d'autres."
      },
      {
        "title": "Tapez la valeur",
        "body": "Des exemples sont fournis pour chaque format."
      },
      {
        "title": "Téléchargez",
        "body": "PNG pour l'impression, SVG pour le design."
      }
    ],
    "hi": [
      {
        "title": "फॉर्मेट चुनें",
        "body": "Code 128, EAN-13, UPC, Code 39 और अधिक।"
      },
      {
        "title": "वैल्यू टाइप करें",
        "body": "हर फॉर्मेट के लिए सैंपल शामिल हैं।"
      },
      {
        "title": "डाउनलोड करें",
        "body": "प्रिंट के लिए PNG, डिज़ाइन के लिए SVG।"
      }
    ],
    "id": [
      {
        "title": "Pilih format",
        "body": "Code 128, EAN-13, UPC, Code 39, dan lainnya."
      },
      {
        "title": "Ketik nilainya",
        "body": "Contoh disertakan untuk setiap format."
      },
      {
        "title": "Unduh",
        "body": "PNG untuk cetak, SVG untuk desain."
      }
    ],
    "it": [
      {
        "title": "Scegli un formato",
        "body": "Code 128, EAN-13, UPC, Code 39 e altri."
      },
      {
        "title": "Inserisci il valore",
        "body": "Esempi inclusi per ogni formato."
      },
      {
        "title": "Scarica",
        "body": "PNG per la stampa, SVG per il design."
      }
    ],
    "ja": [
      {
        "title": "形式を選択",
        "body": "Code 128、EAN-13、UPC、Code 39 など。"
      },
      {
        "title": "値を入力",
        "body": "各形式のサンプルが含まれています。"
      },
      {
        "title": "ダウンロード",
        "body": "印刷用PNG、デザイン用SVG。"
      }
    ],
    "ko": [
      {
        "title": "형식 선택",
        "body": "Code 128, EAN-13, UPC, Code 39 등."
      },
      {
        "title": "값 입력",
        "body": "형식별 샘플이 제공됩니다."
      },
      {
        "title": "다운로드",
        "body": "인쇄용 PNG, 디자인용 SVG."
      }
    ],
    "nl": [
      {
        "title": "Kies een formaat",
        "body": "Code 128, EAN-13, UPC, Code 39 en meer."
      },
      {
        "title": "Typ de waarde",
        "body": "Voorbeelden beschikbaar voor elk formaat."
      },
      {
        "title": "Downloaden",
        "body": "PNG voor drukwerk, SVG voor design."
      }
    ],
    "pl": [
      {
        "title": "Wybierz format",
        "body": "Code 128, EAN-13, UPC, Code 39 i inne."
      },
      {
        "title": "Wpisz wartość",
        "body": "Dla każdego formatu dostępne są przykłady."
      },
      {
        "title": "Pobierz",
        "body": "PNG do druku, SVG do projektowania."
      }
    ],
    "pt": [
      {
        "title": "Escolha um formato",
        "body": "Code 128, EAN-13, UPC, Code 39 e muito mais."
      },
      {
        "title": "Escreva o valor",
        "body": "Exemplos incluídos para cada formato."
      },
      {
        "title": "Baixe",
        "body": "PNG para impressão, SVG para design."
      }
    ],
    "ru": [
      {
        "title": "Выберите формат",
        "body": "Code 128, EAN-13, UPC, Code 39 и другие."
      },
      {
        "title": "Введите значение",
        "body": "Для каждого формата есть примеры."
      },
      {
        "title": "Скачайте",
        "body": "PNG для печати, SVG для дизайна."
      }
    ],
    "sv": [
      {
        "title": "Välj format",
        "body": "Code 128, EAN-13, UPC, Code 39 och fler."
      },
      {
        "title": "Ange värdet",
        "body": "Exempeldata ingår för varje format."
      },
      {
        "title": "Ladda ned",
        "body": "PNG för tryck, SVG för design."
      }
    ],
    "tr": [
      {
        "title": "Bir format seç",
        "body": "Code 128, EAN-13, UPC, Code 39 ve daha fazlası."
      },
      {
        "title": "Değeri yaz",
        "body": "Her format için örnek değerler mevcut."
      },
      {
        "title": "İndir",
        "body": "Baskı için PNG, tasarım için SVG."
      }
    ],
    "uk": [
      {
        "title": "Оберіть формат",
        "body": "Code 128, EAN-13, UPC, Code 39 та інші."
      },
      {
        "title": "Введіть значення",
        "body": "Для кожного формату є приклади."
      },
      {
        "title": "Завантажте",
        "body": "PNG для друку, SVG для дизайну."
      }
    ],
    "vi": [
      {
        "title": "Chọn định dạng",
        "body": "Code 128, EAN-13, UPC, Code 39 và nhiều loại khác."
      },
      {
        "title": "Nhập giá trị",
        "body": "Có mẫu sẵn cho mỗi định dạng."
      },
      {
        "title": "Tải xuống",
        "body": "PNG để in, SVG để thiết kế."
      }
    ],
    "zh": [
      {
        "title": "选择格式",
        "body": "支持 Code 128、EAN-13、UPC、Code 39 等格式。"
      },
      {
        "title": "输入数值",
        "body": "每种格式附有示例数据供参考。"
      },
      {
        "title": "下载",
        "body": "PNG 用于打印，SVG 用于设计。"
      }
    ]
  },
  "barcode-reader": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "لأي باركود قياسي أو QR."
      },
      {
        "title": "نكتشف التنسيق تلقائيًا",
        "body": "EAN وUPC وCode 128 وQR وأكثر من 10 أنواع أخرى."
      },
      {
        "title": "اقرأ القيمة",
        "body": "مُعلَّمة بالتنسيق وجاهزة للنسخ."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte fotku",
        "body": "Libovolného standardního čárového kódu nebo QR."
      },
      {
        "title": "Automaticky detekujeme formát",
        "body": "EAN, UPC, Code 128, QR a 10+ dalších."
      },
      {
        "title": "Přečtěte hodnotu",
        "body": "Označeno formátem a připraveno ke zkopírování."
      }
    ],
    "de": [
      {
        "title": "Foto hochladen",
        "body": "Von einem beliebigen Standard-Barcode oder QR."
      },
      {
        "title": "Wir erkennen das Format automatisch",
        "body": "EAN, UPC, Code 128, QR und 10+ weitere."
      },
      {
        "title": "Wert auslesen",
        "body": "Mit Format-Tag — bereit zum Kopieren."
      }
    ],
    "es": [
      {
        "title": "Sube una foto",
        "body": "De cualquier código de barras estándar o QR."
      },
      {
        "title": "Detectamos el formato automáticamente",
        "body": "EAN, UPC, Code 128, QR y más de 10 formatos más."
      },
      {
        "title": "Lee el valor",
        "body": "Con etiqueta de formato e listo para copiar."
      }
    ],
    "fr": [
      {
        "title": "Importez une photo",
        "body": "D'un code-barres standard ou QR quelconque."
      },
      {
        "title": "Nous détectons le format automatiquement",
        "body": "EAN, UPC, Code 128, QR et 10+ autres."
      },
      {
        "title": "Lisez la valeur",
        "body": "Avec le format indiqué, prête à copier."
      }
    ],
    "hi": [
      {
        "title": "एक फोटो अपलोड करें",
        "body": "किसी भी स्टैंडर्ड बारकोड या QR की।"
      },
      {
        "title": "हम फॉर्मेट ऑटो-डिटेक्ट करते हैं",
        "body": "EAN, UPC, Code 128, QR और 10+ अधिक।"
      },
      {
        "title": "वैल्यू पढ़ें",
        "body": "फॉर्मेट-टैग्ड और कॉपी के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Unggah foto",
        "body": "Barcode standar atau QR apa pun."
      },
      {
        "title": "Kami mendeteksi format secara otomatis",
        "body": "EAN, UPC, Code 128, QR, dan 10+ lainnya."
      },
      {
        "title": "Baca nilainya",
        "body": "Berlabel format dan siap disalin."
      }
    ],
    "it": [
      {
        "title": "Carica una foto",
        "body": "Di qualsiasi codice a barre standard o QR."
      },
      {
        "title": "Rileviamo il formato automaticamente",
        "body": "EAN, UPC, Code 128, QR e altri 10+ formati."
      },
      {
        "title": "Leggi il valore",
        "body": "Con l'etichetta del formato, pronto da copiare."
      }
    ],
    "ja": [
      {
        "title": "写真をアップロード",
        "body": "一般的なバーコードまたは QR の写真。"
      },
      {
        "title": "形式を自動検出",
        "body": "EAN、UPC、Code 128、QR など10種類以上に対応。"
      },
      {
        "title": "値を読み取る",
        "body": "形式タグ付きでコピー可能な状態で表示。"
      }
    ],
    "ko": [
      {
        "title": "사진 업로드",
        "body": "표준 바코드 또는 QR 사진."
      },
      {
        "title": "형식 자동 감지",
        "body": "EAN, UPC, Code 128, QR 등 10가지 이상."
      },
      {
        "title": "값 읽기",
        "body": "형식이 태그되어 바로 복사할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Upload een foto",
        "body": "Van een standaard barcode of QR."
      },
      {
        "title": "We detecteren het formaat automatisch",
        "body": "EAN, UPC, Code 128, QR en 10+ andere."
      },
      {
        "title": "Lees de waarde",
        "body": "Voorzien van formaatlabel en klaar om te kopiëren."
      }
    ],
    "pl": [
      {
        "title": "Prześlij zdjęcie",
        "body": "Dowolnego standardowego kodu kreskowego lub QR."
      },
      {
        "title": "Automatyczne wykrywanie formatu",
        "body": "EAN, UPC, Code 128, QR i 10+ innych."
      },
      {
        "title": "Odczytaj wartość",
        "body": "Oznaczona formatem, gotowa do skopiowania."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma foto",
        "body": "De qualquer código de barras ou QR padrão."
      },
      {
        "title": "Detetamos o formato automaticamente",
        "body": "EAN, UPC, Code 128, QR e 10+ mais."
      },
      {
        "title": "Leia o valor",
        "body": "Com o formato identificado e pronto para copiar."
      }
    ],
    "ru": [
      {
        "title": "Загрузите фото",
        "body": "С любым стандартным штрихкодом или QR."
      },
      {
        "title": "Формат определяется автоматически",
        "body": "EAN, UPC, Code 128, QR и 10+ других форматов."
      },
      {
        "title": "Считайте значение",
        "body": "С указанием формата, готово к копированию."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp ett foto",
        "body": "Av vilken standard-streckkod eller QR som helst."
      },
      {
        "title": "Vi identifierar formatet automatiskt",
        "body": "EAN, UPC, Code 128, QR och 10+ fler."
      },
      {
        "title": "Läs värdet",
        "body": "Formatmärkt och redo att kopiera."
      }
    ],
    "tr": [
      {
        "title": "Fotoğraf yükle",
        "body": "Herhangi bir standart barkod veya QR."
      },
      {
        "title": "Formatı otomatik algılıyoruz",
        "body": "EAN, UPC, Code 128, QR ve 10'dan fazlası."
      },
      {
        "title": "Değeri oku",
        "body": "Format etiketli ve kopyalamaya hazır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте фото",
        "body": "Будь-якого стандартного штрих-коду або QR."
      },
      {
        "title": "Ми автоматично визначаємо формат",
        "body": "EAN, UPC, Code 128, QR та 10+ інших."
      },
      {
        "title": "Читайте значення",
        "body": "З міткою формату, готово до копіювання."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "Ảnh chụp bất kỳ mã vạch hoặc QR tiêu chuẩn nào."
      },
      {
        "title": "Tự động nhận diện định dạng",
        "body": "EAN, UPC, Code 128, QR và 10+ loại khác."
      },
      {
        "title": "Đọc giá trị",
        "body": "Kèm nhãn định dạng, sẵn sàng sao chép."
      }
    ],
    "zh": [
      {
        "title": "上传照片",
        "body": "任意标准条形码或 QR 码的照片均可。"
      },
      {
        "title": "自动识别格式",
        "body": "支持 EAN、UPC、Code 128、QR 及 10 余种其他格式。"
      },
      {
        "title": "读取内容",
        "body": "显示格式类型，可一键复制。"
      }
    ]
  },
  "base64": {
    "ar": [
      {
        "title": "اختر الوضع",
        "body": "ترميز نص عادي، أو فكّ ترميز سلسلة Base64."
      },
      {
        "title": "اكتب أو الصق",
        "body": "يُعالَج ترميز UTF-8 بصحة، بما في ذلك الرموز التعبيرية."
      },
      {
        "title": "انسخ النتيجة",
        "body": "فوري، على الجهاز، بلا رفع."
      }
    ],
    "cs": [
      {
        "title": "Vyberte režim",
        "body": "Zakódujte prostý text nebo dekódujte řetězec base64."
      },
      {
        "title": "Napište nebo vložte",
        "body": "UTF-8 je zpracováno správně, včetně emoji."
      },
      {
        "title": "Zkopírujte výsledek",
        "body": "Okamžitě, na zařízení, bez nahrávání."
      }
    ],
    "de": [
      {
        "title": "Modus wählen",
        "body": "Klartext kodieren oder einen Base64-String dekodieren."
      },
      {
        "title": "Eingeben oder einfügen",
        "body": "UTF-8 wird korrekt verarbeitet — auch Emojis."
      },
      {
        "title": "Ergebnis kopieren",
        "body": "Sofort, auf dem Gerät, kein Upload."
      }
    ],
    "es": [
      {
        "title": "Elige el modo",
        "body": "Codifica texto plano o decodifica una cadena Base64."
      },
      {
        "title": "Escribe o pega",
        "body": "UTF-8 se gestiona correctamente, incluyendo emojis."
      },
      {
        "title": "Copia el resultado",
        "body": "Instantáneo, en tu dispositivo, sin subidas."
      }
    ],
    "fr": [
      {
        "title": "Choisissez un mode",
        "body": "Encodez du texte brut, ou décodez une chaîne base64."
      },
      {
        "title": "Tapez ou collez",
        "body": "L'UTF-8 est géré correctement, y compris les emoji."
      },
      {
        "title": "Copiez le résultat",
        "body": "Instantané, sur votre appareil, sans transfert."
      }
    ],
    "hi": [
      {
        "title": "मोड चुनें",
        "body": "प्लेन टेक्स्ट एनकोड करें, या Base64 स्ट्रिंग डीकोड करें।"
      },
      {
        "title": "टाइप करें या पेस्ट करें",
        "body": "UTF-8 सही तरीके से हैंडल होता है, इमोजी सहित।"
      },
      {
        "title": "परिणाम कॉपी करें",
        "body": "तुरंत, डिवाइस पर, कोई अपलोड नहीं।"
      }
    ],
    "id": [
      {
        "title": "Pilih mode",
        "body": "Enkode teks biasa, atau dekode string base64."
      },
      {
        "title": "Ketik atau tempel",
        "body": "UTF-8 ditangani dengan benar, termasuk emoji."
      },
      {
        "title": "Salin hasilnya",
        "body": "Instan, di perangkat, tanpa unggah."
      }
    ],
    "it": [
      {
        "title": "Scegli una modalità",
        "body": "Codifica testo semplice oppure decodifica una stringa base64."
      },
      {
        "title": "Digita o incolla",
        "body": "UTF-8 è gestito correttamente, emoji incluse."
      },
      {
        "title": "Copia il risultato",
        "body": "Istantaneo, sul dispositivo, senza upload."
      }
    ],
    "ja": [
      {
        "title": "モードを選択",
        "body": "プレーンテキストをエンコード、またはbase64文字列をデコード。"
      },
      {
        "title": "入力またはペースト",
        "body": "絵文字を含む UTF-8 も正しく処理されます。"
      },
      {
        "title": "結果をコピー",
        "body": "即座にデバイス上で完結。アップロード不要。"
      }
    ],
    "ko": [
      {
        "title": "모드 선택",
        "body": "일반 텍스트를 인코딩하거나, Base64 문자열을 디코딩하세요."
      },
      {
        "title": "입력 또는 붙여넣기",
        "body": "이모지를 포함한 UTF-8이 올바르게 처리됩니다."
      },
      {
        "title": "결과 복사",
        "body": "즉시, 기기에서 실행되며 업로드가 없습니다."
      }
    ],
    "nl": [
      {
        "title": "Kies een modus",
        "body": "Codeer gewone tekst, of decodeer een base64-string."
      },
      {
        "title": "Typ of plak",
        "body": "UTF-8 wordt correct verwerkt, inclusief emoji."
      },
      {
        "title": "Kopieer het resultaat",
        "body": "Direct, op je apparaat, geen upload."
      }
    ],
    "pl": [
      {
        "title": "Wybierz tryb",
        "body": "Zakoduj zwykły tekst albo zdekoduj ciąg base64."
      },
      {
        "title": "Wpisz lub wklej",
        "body": "UTF-8 jest obsługiwane poprawnie, w tym emoji."
      },
      {
        "title": "Skopiuj wynik",
        "body": "Błyskawicznie, na urządzeniu, bez przesyłania."
      }
    ],
    "pt": [
      {
        "title": "Escolha o modo",
        "body": "Codifique texto simples ou descodifique uma string base64."
      },
      {
        "title": "Escreva ou cole",
        "body": "UTF-8 é tratado corretamente, incluindo emoji."
      },
      {
        "title": "Copie o resultado",
        "body": "Instantâneo, no dispositivo, sem upload."
      }
    ],
    "ru": [
      {
        "title": "Выберите режим",
        "body": "Кодирование текста или декодирование строки base64."
      },
      {
        "title": "Введите или вставьте",
        "body": "UTF-8 обрабатывается правильно, включая эмодзи."
      },
      {
        "title": "Скопируйте результат",
        "body": "Мгновенно, на устройстве, без загрузки на сервер."
      }
    ],
    "sv": [
      {
        "title": "Välj ett läge",
        "body": "Koda ren text, eller avkoda en base64-sträng."
      },
      {
        "title": "Skriv eller klistra in",
        "body": "UTF-8 hanteras korrekt, inklusive emoji."
      },
      {
        "title": "Kopiera resultatet",
        "body": "Omedelbart, på enheten, ingen uppladdning."
      }
    ],
    "tr": [
      {
        "title": "Bir mod seç",
        "body": "Düz metni kodla ya da base64 dizesini çöz."
      },
      {
        "title": "Yaz veya yapıştır",
        "body": "Emoji dahil UTF-8 doğru şekilde işlenir."
      },
      {
        "title": "Sonucu kopyala",
        "body": "Anında, cihazında, yükleme yok."
      }
    ],
    "uk": [
      {
        "title": "Оберіть режим",
        "body": "Кодуйте звичайний текст або декодуйте рядок Base64."
      },
      {
        "title": "Введіть або вставте текст",
        "body": "UTF-8 обробляється коректно, включно з емодзі."
      },
      {
        "title": "Скопіюйте результат",
        "body": "Миттєво, на пристрої, без завантаження."
      }
    ],
    "vi": [
      {
        "title": "Chọn chế độ",
        "body": "Mã hóa văn bản thường, hoặc giải mã chuỗi Base64."
      },
      {
        "title": "Nhập hoặc dán văn bản",
        "body": "UTF-8 được xử lý đúng, kể cả emoji."
      },
      {
        "title": "Sao chép kết quả",
        "body": "Tức thì, trên thiết bị, không cần tải lên."
      }
    ],
    "zh": [
      {
        "title": "选择模式",
        "body": "对纯文本编码，或解码 base64 字符串。"
      },
      {
        "title": "输入或粘贴内容",
        "body": "正确处理 UTF-8，包括表情符号。"
      },
      {
        "title": "复制结果",
        "body": "即时完成，本地运行，无需上传。"
      }
    ]
  },
  "batch-translate": {
    "ar": [
      {
        "title": "ارفع ملف SRT الرئيسي",
        "body": "اختر لغة المصدر أو دعنا نكتشفها تلقائيًا."
      },
      {
        "title": "اختر اللغات الهدف",
        "body": "حدّد ما يصل إلى 30 لغة. نعالجها بالتوازي."
      },
      {
        "title": "حمّل ملف ZIP",
        "body": "ملف SRT مترجَم لكل لغة، جاهز لإرفاقه بكل إصدار."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte hlavní SRT",
        "body": "Zvolte zdrojový jazyk nebo nechte detekci na nás."
      },
      {
        "title": "Vyberte cílové jazyky",
        "body": "Zaškrtněte až 30. Překlady spustíme paralelně."
      },
      {
        "title": "Stáhněte ZIP",
        "body": "Jeden přeložený SRT na jazyk, připravený pro každé vydání."
      }
    ],
    "de": [
      {
        "title": "Master-SRT hochladen",
        "body": "Ausgangssprache wählen oder automatisch erkennen lassen."
      },
      {
        "title": "Zielsprachen auswählen",
        "body": "Bis zu 30 ankreuzen. Wir verarbeiten sie parallel."
      },
      {
        "title": "ZIP herunterladen",
        "body": "Eine übersetzte SRT pro Sprache — bereit zum Anhängen an jede Veröffentlichung."
      }
    ],
    "es": [
      {
        "title": "Sube tu SRT principal",
        "body": "Elige el idioma de origen o déjanos detectarlo."
      },
      {
        "title": "Selecciona los idiomas de destino",
        "body": "Marca hasta 30. Los procesamos en paralelo."
      },
      {
        "title": "Descarga el ZIP",
        "body": "Un SRT traducido por idioma, listo para adjuntar en cada publicación."
      }
    ],
    "fr": [
      {
        "title": "Importez votre SRT principal",
        "body": "Choisissez la langue source ou laissez-nous la détecter."
      },
      {
        "title": "Sélectionnez les langues cibles",
        "body": "Cochez jusqu'à 30. Nous les traitons en parallèle."
      },
      {
        "title": "Téléchargez un ZIP",
        "body": "Un SRT traduit par langue, prêt à joindre à chaque version."
      }
    ],
    "hi": [
      {
        "title": "अपना मास्टर SRT अपलोड करें",
        "body": "स्रोत भाषा चुनें या हमें डिटेक्ट करने दें।"
      },
      {
        "title": "लक्ष्य भाषाएं चुनें",
        "body": "30 तक टिक करें। हम उन्हें समानांतर में चलाते हैं।"
      },
      {
        "title": "ZIP डाउनलोड करें",
        "body": "हर भाषा के लिए एक अनुवादित SRT, हर रिलीज़ के साथ जोड़ने के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Unggah SRT utama kamu",
        "body": "Pilih bahasa sumber atau biarkan kami mendeteksinya."
      },
      {
        "title": "Pilih bahasa target",
        "body": "Centang hingga 30 bahasa. Kami memprosesnya secara paralel."
      },
      {
        "title": "Unduh ZIP",
        "body": "Satu SRT terjemahan per bahasa, siap dilampirkan ke setiap rilis."
      }
    ],
    "it": [
      {
        "title": "Carica il tuo file SRT principale",
        "body": "Scegli la lingua di origine o lascia che la rilevi automaticamente."
      },
      {
        "title": "Seleziona le lingue di destinazione",
        "body": "Spunta fino a 30 lingue. Le elaboriamo in parallelo."
      },
      {
        "title": "Scarica un archivio ZIP",
        "body": "Un file SRT tradotto per lingua, pronto da allegare a ogni versione."
      }
    ],
    "ja": [
      {
        "title": "マスター SRT をアップロード",
        "body": "元の言語を選択するか、自動検出に任せてください。"
      },
      {
        "title": "翻訳先の言語を選択",
        "body": "最大30言語をチェック。並列処理で一括翻訳。"
      },
      {
        "title": "ZIP をダウンロード",
        "body": "言語ごとに翻訳済み SRT を1ファイル。各リリースに添付できる状態。"
      }
    ],
    "ko": [
      {
        "title": "마스터 SRT 업로드",
        "body": "원본 언어를 선택하거나 자동 감지를 사용하세요."
      },
      {
        "title": "대상 언어 선택",
        "body": "최대 30개까지 선택하면 병렬로 처리됩니다."
      },
      {
        "title": "ZIP 다운로드",
        "body": "언어별 번역된 SRT 파일이 포함됩니다. 각 배포본에 바로 첨부하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload je hoofd-SRT",
        "body": "Kies de brontaal of laat ons die detecteren."
      },
      {
        "title": "Selecteer doeltalen",
        "body": "Vink er tot 30 aan. We verwerken ze parallel."
      },
      {
        "title": "Download een ZIP",
        "body": "Eén vertaalde SRT per taal, klaar om bij elke release te voegen."
      }
    ],
    "pl": [
      {
        "title": "Prześlij główny plik SRT",
        "body": "Wybierz język źródłowy lub pozwól nam go wykryć."
      },
      {
        "title": "Zaznacz języki docelowe",
        "body": "Wybierz do 30. Przetwarzamy je równolegle."
      },
      {
        "title": "Pobierz archiwum ZIP",
        "body": "Jeden przetłumaczony plik SRT na język, gotowy do dołączenia do każdego wydania."
      }
    ],
    "pt": [
      {
        "title": "Carregue o SRT principal",
        "body": "Escolha o idioma de origem ou deixe-nos detetá-lo."
      },
      {
        "title": "Selecione os idiomas de destino",
        "body": "Marque até 30. Processamos todos em paralelo."
      },
      {
        "title": "Baixe um ZIP",
        "body": "Um SRT traduzido por idioma, pronto para anexar a cada lançamento."
      }
    ],
    "ru": [
      {
        "title": "Загрузите основной SRT",
        "body": "Укажите исходный язык или дайте нам определить его автоматически."
      },
      {
        "title": "Выберите целевые языки",
        "body": "До 30 языков одновременно — переводим параллельно."
      },
      {
        "title": "Скачайте ZIP",
        "body": "По одному переведённому SRT на каждый язык — готово для каждого релиза."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din huvud-SRT",
        "body": "Välj källspråk eller låt oss identifiera det."
      },
      {
        "title": "Välj målspråk",
        "body": "Bocka i upp till 30. Vi kör dem parallellt."
      },
      {
        "title": "Ladda ned en ZIP",
        "body": "En översatt SRT per språk, redo att bifoga till varje release."
      }
    ],
    "tr": [
      {
        "title": "Ana SRT dosyanı yükle",
        "body": "Kaynak dili seç ya da otomatik algılamaya bırak."
      },
      {
        "title": "Hedef dilleri seç",
        "body": "30'a kadar işaretle. Hepsini paralel olarak işliyoruz."
      },
      {
        "title": "ZIP dosyasını indir",
        "body": "Her dil için ayrı bir SRT, her sürüme eklenmeye hazır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте основний SRT",
        "body": "Вкажіть мову оригіналу або дайте нам її визначити."
      },
      {
        "title": "Оберіть цільові мови",
        "body": "Позначте до 30. Ми обробляємо їх паралельно."
      },
      {
        "title": "Завантажте ZIP",
        "body": "Один перекладений SRT на мову — готово для кожного регіону."
      }
    ],
    "vi": [
      {
        "title": "Tải lên file SRT chính",
        "body": "Chọn ngôn ngữ nguồn hoặc để chúng tôi tự phát hiện."
      },
      {
        "title": "Chọn ngôn ngữ đích",
        "body": "Chọn tối đa 30 ngôn ngữ. Chúng tôi xử lý song song."
      },
      {
        "title": "Tải xuống file ZIP",
        "body": "Một file SRT đã dịch cho mỗi ngôn ngữ, sẵn sàng đính kèm vào từng bản phát hành."
      }
    ],
    "zh": [
      {
        "title": "上传主 SRT 文件",
        "body": "选择源语言，或让我们自动检测。"
      },
      {
        "title": "选择目标语言",
        "body": "最多勾选 30 种，并行处理。"
      },
      {
        "title": "下载 ZIP 压缩包",
        "body": "每种语言对应一个 SRT 文件，可直接附加到各发行版本。"
      }
    ]
  },
  "blur-face": {
    "ar": [
      {
        "title": "أسقط صورتك",
        "body": "JPG أو PNG أو WebP."
      },
      {
        "title": "ارسم مستطيلات",
        "body": "غطّ كل وجه أو منطقة حساسة."
      },
      {
        "title": "صدّر الصورة المُضبَّبة",
        "body": "البكسلات داخل المربعات تُضبَّب بصفة دائمة."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte obrázek",
        "body": "JPG, PNG nebo WebP."
      },
      {
        "title": "Nakreslete obdélníky",
        "body": "Překryjte každou tvář nebo citlivou oblast."
      },
      {
        "title": "Exportujte rozmazaný obrázek",
        "body": "Pixely v rámečcích jsou trvale rozmazány."
      }
    ],
    "de": [
      {
        "title": "Bild ablegen",
        "body": "JPG, PNG oder WebP."
      },
      {
        "title": "Rechtecke ziehen",
        "body": "Jedes Gesicht oder sensible Bereich abdecken."
      },
      {
        "title": "Bearbeitetes Bild exportieren",
        "body": "Pixel in den Auswahlrahmen werden dauerhaft unscharf gemacht."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu imagen",
        "body": "JPG, PNG o WebP."
      },
      {
        "title": "Dibuja rectángulos",
        "body": "Cubre cada cara o zona sensible."
      },
      {
        "title": "Exporta la imagen difuminada",
        "body": "Los píxeles dentro de los cuadros quedan difuminados de forma permanente."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre image",
        "body": "JPG, PNG ou WebP."
      },
      {
        "title": "Tracez des rectangles",
        "body": "Couvrez chaque visage ou zone sensible."
      },
      {
        "title": "Exportez l'image floutée",
        "body": "Les pixels dans les zones sont définitivement floutés."
      }
    ],
    "hi": [
      {
        "title": "अपनी इमेज डालें",
        "body": "JPG, PNG या WebP।"
      },
      {
        "title": "आयत खींचें",
        "body": "हर चेहरे या संवेदनशील क्षेत्र को ढकें।"
      },
      {
        "title": "ब्लर इमेज एक्सपोर्ट करें",
        "body": "बॉक्स में पिक्सल स्थायी रूप से ब्लर हो जाते हैं।"
      }
    ],
    "id": [
      {
        "title": "Seret gambarmu",
        "body": "JPG, PNG, atau WebP."
      },
      {
        "title": "Seret kotak seleksi",
        "body": "Tutup setiap wajah atau area sensitif."
      },
      {
        "title": "Ekspor gambar yang disamarkan",
        "body": "Piksel dalam kotak disamarkan secara permanen."
      }
    ],
    "it": [
      {
        "title": "Trascina la tua immagine",
        "body": "JPG, PNG o WebP."
      },
      {
        "title": "Disegna i rettangoli",
        "body": "Coprì ogni volto o area sensibile."
      },
      {
        "title": "Esporta l'immagine sfocata",
        "body": "I pixel nelle aree selezionate vengono sfocati in modo permanente."
      }
    ],
    "ja": [
      {
        "title": "画像をドロップ",
        "body": "JPG、PNG または WebP。"
      },
      {
        "title": "矩形をドラッグ",
        "body": "顔や個人情報を含む箇所を覆う。"
      },
      {
        "title": "ぼかし済み画像をエクスポート",
        "body": "指定範囲のピクセルが完全にぼかされます。"
      }
    ],
    "ko": [
      {
        "title": "이미지 드롭",
        "body": "JPG, PNG 또는 WebP."
      },
      {
        "title": "직사각형 드래그",
        "body": "각 얼굴이나 민감한 영역을 덮으세요."
      },
      {
        "title": "블러 처리된 이미지 내보내기",
        "body": "선택 영역의 픽셀이 영구적으로 블러 처리됩니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep je afbeelding hierheen",
        "body": "JPG, PNG of WebP."
      },
      {
        "title": "Teken rechthoeken",
        "body": "Bedek elk gezicht of gevoelig gebied."
      },
      {
        "title": "Exporteer de wazige afbeelding",
        "body": "Pixels in de kaders zijn permanent vervaagd."
      }
    ],
    "pl": [
      {
        "title": "Upuść swój obraz",
        "body": "JPG, PNG lub WebP."
      },
      {
        "title": "Zaznacz prostokąty",
        "body": "Przykryj każdą twarz lub wrażliwy obszar."
      },
      {
        "title": "Eksportuj rozmazany obraz",
        "body": "Piksele w zaznaczonych obszarach są trwale rozmazane."
      }
    ],
    "pt": [
      {
        "title": "Arraste a sua imagem",
        "body": "JPG, PNG ou WebP."
      },
      {
        "title": "Arraste retângulos",
        "body": "Cubra cada rosto ou zona sensível."
      },
      {
        "title": "Exporte a imagem desfocada",
        "body": "Os pixels nas caixas ficam permanentemente desfocados."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPG, PNG или WebP."
      },
      {
        "title": "Выделите области",
        "body": "Обведите каждое лицо или чувствительную зону прямоугольником."
      },
      {
        "title": "Экспортируйте с размытием",
        "body": "Пиксели внутри прямоугольников размыты навсегда."
      }
    ],
    "sv": [
      {
        "title": "Släpp din bild",
        "body": "JPG, PNG eller WebP."
      },
      {
        "title": "Rita rektanglar",
        "body": "Täck varje ansikte eller känslig zon."
      },
      {
        "title": "Exportera suddig bild",
        "body": "Pixlarna i rutorna suddas ut permanent."
      }
    ],
    "tr": [
      {
        "title": "Görselini bırak",
        "body": "JPG, PNG veya WebP."
      },
      {
        "title": "Dikdörtgenler çiz",
        "body": "Her yüzü veya hassas bölgeyi kapat."
      },
      {
        "title": "Bulanıklaştırılmış görseli dışa aktar",
        "body": "Kutulardaki pikseller kalıcı olarak bulanıklaştırılır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPG, PNG або WebP."
      },
      {
        "title": "Малюйте прямокутники",
        "body": "Закрийте кожне обличчя або чутливу зону."
      },
      {
        "title": "Збережіть розмите зображення",
        "body": "Пікселі в рамках розмито безповоротно."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh vào đây",
        "body": "JPG, PNG hoặc WebP."
      },
      {
        "title": "Vẽ hình chữ nhật",
        "body": "Che mỗi khuôn mặt hoặc vùng nhạy cảm."
      },
      {
        "title": "Xuất ảnh đã làm mờ",
        "body": "Các điểm ảnh trong vùng chọn bị làm mờ vĩnh viễn."
      }
    ],
    "zh": [
      {
        "title": "拖入图片",
        "body": "支持 JPG、PNG 或 WebP。"
      },
      {
        "title": "拖拽绘制矩形区域",
        "body": "覆盖每张人脸或敏感区域。"
      },
      {
        "title": "导出模糊后的图片",
        "body": "框选区域内的像素将被永久模糊处理。"
      }
    ]
  },
  "business-card-scanner": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "لأي بطاقة عمل."
      },
      {
        "title": "الذكاء الاصطناعي يستخرج الحقول",
        "body": "الاسم والمسمى الوظيفي والبريد والهاتف والموقع…"
      },
      {
        "title": "حمّل vCard",
        "body": "اسحبه إلى جهات الاتصال أو Gmail أو Outlook."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte fotku",
        "body": "Libovolné vizitky."
      },
      {
        "title": "AI extrahuje pole",
        "body": "Jméno, titul, e-mail, telefon, web…"
      },
      {
        "title": "Stáhněte vCard",
        "body": "Přetáhněte do Kontaktů, Gmail nebo Outlooku."
      }
    ],
    "de": [
      {
        "title": "Foto hochladen",
        "body": "Von einer beliebigen Visitenkarte."
      },
      {
        "title": "KI extrahiert die Felder",
        "body": "Name, Titel, E-Mail, Telefon, Website …"
      },
      {
        "title": "vCard herunterladen",
        "body": "In Kontakte, Gmail oder Outlook ziehen."
      }
    ],
    "es": [
      {
        "title": "Sube una foto",
        "body": "De cualquier tarjeta de visita."
      },
      {
        "title": "La IA extrae los campos",
        "body": "Nombre, cargo, email, teléfono, web…"
      },
      {
        "title": "Descarga el vCard",
        "body": "Arrástralo a Contactos, Gmail o Outlook."
      }
    ],
    "fr": [
      {
        "title": "Importez une photo",
        "body": "D'une carte de visite quelconque."
      },
      {
        "title": "L'IA extrait les champs",
        "body": "Nom, titre, e-mail, téléphone, site web…"
      },
      {
        "title": "Téléchargez la vCard",
        "body": "Glissez-la dans Contacts, Gmail ou Outlook."
      }
    ],
    "hi": [
      {
        "title": "एक फोटो अपलोड करें",
        "body": "किसी भी बिज़नेस कार्ड की।"
      },
      {
        "title": "AI फील्ड्स निकालता है",
        "body": "नाम, टाइटल, ईमेल, फ़ोन, वेबसाइट…"
      },
      {
        "title": "vCard डाउनलोड करें",
        "body": "Contacts, Gmail या Outlook में ड्रैग करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah foto",
        "body": "Kartu nama apa pun."
      },
      {
        "title": "AI mengekstrak bidang",
        "body": "Nama, jabatan, email, telepon, situs web…"
      },
      {
        "title": "Unduh vCard",
        "body": "Seret ke Contacts, Gmail, atau Outlook."
      }
    ],
    "it": [
      {
        "title": "Carica una foto",
        "body": "Di qualsiasi biglietto da visita."
      },
      {
        "title": "L'AI estrae i dati",
        "body": "Nome, titolo, email, telefono, sito web…"
      },
      {
        "title": "Scarica il vCard",
        "body": "Trascinalo in Contatti, Gmail o Outlook."
      }
    ],
    "ja": [
      {
        "title": "写真をアップロード",
        "body": "名刺の写真を用意してください。"
      },
      {
        "title": "AIがフィールドを抽出",
        "body": "氏名・肩書き・メール・電話番号・ウェブサイトなど。"
      },
      {
        "title": "vCard をダウンロード",
        "body": "連絡先・Gmail・Outlook にドラッグ＆ドロップ。"
      }
    ],
    "ko": [
      {
        "title": "사진 업로드",
        "body": "명함 사진이면 무엇이든 가능합니다."
      },
      {
        "title": "AI가 정보를 추출합니다",
        "body": "이름, 직함, 이메일, 전화, 웹사이트 등."
      },
      {
        "title": "vCard 다운로드",
        "body": "연락처, Gmail 또는 Outlook에 드래그하여 추가하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload een foto",
        "body": "Van een visitekaartje."
      },
      {
        "title": "AI extraheert de velden",
        "body": "Naam, titel, e-mail, telefoon, website…"
      },
      {
        "title": "Download de vCard",
        "body": "Sleep hem in Contacten, Gmail of Outlook."
      }
    ],
    "pl": [
      {
        "title": "Prześlij zdjęcie",
        "body": "Dowolnej wizytówki."
      },
      {
        "title": "AI wyodrębnia pola",
        "body": "Imię i nazwisko, stanowisko, e-mail, telefon, strona internetowa…"
      },
      {
        "title": "Pobierz vCard",
        "body": "Przeciągnij do Kontaktów, Gmail lub Outlook."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma foto",
        "body": "De qualquer cartão de visita."
      },
      {
        "title": "A IA extrai os campos",
        "body": "Nome, cargo, e-mail, telefone, website…"
      },
      {
        "title": "Baixe o vCard",
        "body": "Arraste para Contactos, Gmail ou Outlook."
      }
    ],
    "ru": [
      {
        "title": "Загрузите фото",
        "body": "Любой визитной карточки."
      },
      {
        "title": "ИИ извлекает поля",
        "body": "Имя, должность, email, телефон, сайт…"
      },
      {
        "title": "Скачайте vCard",
        "body": "Перетащите в Contacts, Gmail или Outlook."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp ett foto",
        "body": "Av vilket visitkort som helst."
      },
      {
        "title": "AI extraherar fälten",
        "body": "Namn, titel, e-post, telefon, webbplats…"
      },
      {
        "title": "Ladda ned vCard:en",
        "body": "Drag in i Kontakter, Gmail eller Outlook."
      }
    ],
    "tr": [
      {
        "title": "Fotoğraf yükle",
        "body": "Herhangi bir kartvizit."
      },
      {
        "title": "AI alanları çıkarıyor",
        "body": "Ad, unvan, e-posta, telefon, web sitesi..."
      },
      {
        "title": "vCard indir",
        "body": "Kişiler, Gmail veya Outlook'a sürükle."
      }
    ],
    "uk": [
      {
        "title": "Завантажте фото",
        "body": "Будь-якої візитної картки."
      },
      {
        "title": "ШІ витягує поля",
        "body": "Імʼя, посада, email, телефон, вебсайт…"
      },
      {
        "title": "Завантажте vCard",
        "body": "Перетягніть у Контакти, Gmail або Outlook."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "Ảnh chụp bất kỳ danh thiếp nào."
      },
      {
        "title": "AI trích xuất thông tin",
        "body": "Tên, chức vụ, email, điện thoại, website…"
      },
      {
        "title": "Tải xuống vCard",
        "body": "Kéo vào Contacts, Gmail hoặc Outlook."
      }
    ],
    "zh": [
      {
        "title": "上传照片",
        "body": "任意名片的照片均可。"
      },
      {
        "title": "AI 提取字段",
        "body": "姓名、职位、邮箱、电话、网站等信息。"
      },
      {
        "title": "下载 vCard 文件",
        "body": "可拖入通讯录、Gmail 或 Outlook。"
      }
    ]
  },
  "change-background": {
    "ar": [
      {
        "title": "ارفع صورة الموضوع",
        "body": "شخص أو منتج أو جسم."
      },
      {
        "title": "اختر خلفية جديدة",
        "body": "لون صلب أو تدرج مسبق الضبط أو صورتك الخاصة."
      },
      {
        "title": "حمّل PNG",
        "body": "مُركَّب بالدقة الأصلية."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte fotografii s objektem",
        "body": "Osoba, produkt nebo předmět."
      },
      {
        "title": "Vyberte nové pozadí",
        "body": "Jednobarevné, přechodová předvolba nebo vlastní obrázek."
      },
      {
        "title": "Stáhněte PNG",
        "body": "Složeno v původním rozlišení."
      }
    ],
    "de": [
      {
        "title": "Motivfoto hochladen",
        "body": "Person, Produkt oder Objekt."
      },
      {
        "title": "Neuen Hintergrund wählen",
        "body": "Einfarbig, Verlaufs-Preset oder eigenes Bild."
      },
      {
        "title": "PNG herunterladen",
        "body": "Compositing in der Originalauflösung."
      }
    ],
    "es": [
      {
        "title": "Sube la foto del sujeto",
        "body": "Persona, producto u objeto."
      },
      {
        "title": "Elige el nuevo fondo",
        "body": "Color sólido, degradado predefinido o tu propia imagen."
      },
      {
        "title": "Descarga el PNG",
        "body": "Composición a la resolución original."
      }
    ],
    "fr": [
      {
        "title": "Importez une photo avec sujet",
        "body": "Personne, produit ou objet."
      },
      {
        "title": "Choisissez un nouveau fond",
        "body": "Couleur unie, dégradé prédéfini, ou votre propre image."
      },
      {
        "title": "Téléchargez le PNG",
        "body": "Composité à la résolution d'origine."
      }
    ],
    "hi": [
      {
        "title": "सब्जेक्ट फोटो अपलोड करें",
        "body": "व्यक्ति, उत्पाद या वस्तु।"
      },
      {
        "title": "नया बैकग्राउंड चुनें",
        "body": "ठोस रंग, ग्रेडिएंट प्रीसेट, या अपनी खुद की इमेज।"
      },
      {
        "title": "PNG डाउनलोड करें",
        "body": "मूल रेज़ॉल्यूशन पर कंपोज़िट।"
      }
    ],
    "id": [
      {
        "title": "Unggah foto subjek",
        "body": "Orang, produk, atau objek."
      },
      {
        "title": "Pilih latar belakang baru",
        "body": "Warna solid, preset gradien, atau gambar milikmu sendiri."
      },
      {
        "title": "Unduh PNG",
        "body": "Digabungkan pada resolusi asli."
      }
    ],
    "it": [
      {
        "title": "Carica la foto del soggetto",
        "body": "Persona, prodotto o oggetto."
      },
      {
        "title": "Scegli un nuovo sfondo",
        "body": "Colore uniforme, preset con gradiente o una tua immagine."
      },
      {
        "title": "Scarica il PNG",
        "body": "Composizione alla risoluzione originale."
      }
    ],
    "ja": [
      {
        "title": "被写体の写真をアップロード",
        "body": "人物・商品・物体など。"
      },
      {
        "title": "新しい背景を選択",
        "body": "単色・グラデーションプリセット・独自の画像から選択。"
      },
      {
        "title": "PNGをダウンロード",
        "body": "元の解像度で合成して出力。"
      }
    ],
    "ko": [
      {
        "title": "피사체 사진 업로드",
        "body": "사람, 제품 또는 물체."
      },
      {
        "title": "새 배경 선택",
        "body": "단색, 그라디언트 프리셋, 또는 직접 이미지 업로드."
      },
      {
        "title": "PNG 다운로드",
        "body": "원본 해상도로 합성됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload een onderwerps-foto",
        "body": "Persoon, product of object."
      },
      {
        "title": "Kies een nieuwe achtergrond",
        "body": "Effen kleur, verlooppreset of je eigen afbeelding."
      },
      {
        "title": "Download de PNG",
        "body": "Samengesteld op de oorspronkelijke resolutie."
      }
    ],
    "pl": [
      {
        "title": "Prześlij zdjęcie z obiektem",
        "body": "Osoba, produkt lub przedmiot."
      },
      {
        "title": "Wybierz nowe tło",
        "body": "Jednolity kolor, gotowy gradient lub własny obraz."
      },
      {
        "title": "Pobierz PNG",
        "body": "Skomponowane w oryginalnej rozdzielczości."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma foto com sujeito",
        "body": "Pessoa, produto ou objeto."
      },
      {
        "title": "Escolha um novo fundo",
        "body": "Cor sólida, gradiente predefinido ou a sua própria imagem."
      },
      {
        "title": "Baixe o PNG",
        "body": "Composto na resolução original."
      }
    ],
    "ru": [
      {
        "title": "Загрузите фото с объектом",
        "body": "Человек, продукт или предмет."
      },
      {
        "title": "Выберите новый фон",
        "body": "Однотонный цвет, готовый градиент или собственное изображение."
      },
      {
        "title": "Скачайте PNG",
        "body": "Коллаж в исходном разрешении."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp ett motivfoto",
        "body": "Person, produkt eller föremål."
      },
      {
        "title": "Välj en ny bakgrund",
        "body": "Enfärgad, gradientpreset eller din egen bild."
      },
      {
        "title": "Ladda ned PNG:en",
        "body": "Sammansatt i originalupplösningen."
      }
    ],
    "tr": [
      {
        "title": "Özne fotoğrafını yükle",
        "body": "Kişi, ürün veya nesne."
      },
      {
        "title": "Yeni arka plan seç",
        "body": "Düz renk, gradyan ön ayarı veya kendi görseliniz."
      },
      {
        "title": "PNG indir",
        "body": "Orijinal çözünürlükte birleştirilmiş."
      }
    ],
    "uk": [
      {
        "title": "Завантажте фото з обʼєктом",
        "body": "Людина, товар або будь-який предмет."
      },
      {
        "title": "Оберіть новий фон",
        "body": "Однотонний, градієнтний пресет або власне зображення."
      },
      {
        "title": "Завантажте PNG",
        "body": "Компоновка в оригінальній роздільній здатності."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh đối tượng lên",
        "body": "Người, sản phẩm hoặc vật thể."
      },
      {
        "title": "Chọn nền mới",
        "body": "Màu đơn sắc, gradient có sẵn, hoặc ảnh của bạn."
      },
      {
        "title": "Tải xuống PNG",
        "body": "Ghép ảnh ở độ phân giải gốc."
      }
    ],
    "zh": [
      {
        "title": "上传主体照片",
        "body": "人物、产品或物体均可。"
      },
      {
        "title": "选择新背景",
        "body": "纯色、渐变预设，或上传自定义图片。"
      },
      {
        "title": "下载 PNG",
        "body": "以原始分辨率合成输出。"
      }
    ]
  },
  "citation-generator": {
    "ar": [
      {
        "title": "اختر الأسلوب",
        "body": "APA أو MLA أو Chicago أو Harvard أو IEEE."
      },
      {
        "title": "الصق تفاصيل المصدر",
        "body": "العنوان والمؤلفون والسنة والناشر / الرابط — ما توفّر لديك."
      },
      {
        "title": "انسخ استشهادك",
        "body": "مرجع كامل ومثال داخل النص، جاهز للصق."
      }
    ],
    "cs": [
      {
        "title": "Vyberte styl",
        "body": "APA, MLA, Chicago, Harvard nebo IEEE."
      },
      {
        "title": "Vložte údaje o zdroji",
        "body": "Název, autoři, rok, vydavatel / URL — cokoli máte k dispozici."
      },
      {
        "title": "Zkopírujte citaci",
        "body": "Úplný odkaz plus příklad v textu, připraveny k vložení."
      }
    ],
    "de": [
      {
        "title": "Stil wählen",
        "body": "APA, MLA, Chicago, Harvard oder IEEE."
      },
      {
        "title": "Quellenangaben einfügen",
        "body": "Titel, Autoren, Jahr, Verlag / URL — was auch immer vorhanden ist."
      },
      {
        "title": "Zitat kopieren",
        "body": "Vollständige Referenz plus Kurzbeleg — direkt zum Einfügen bereit."
      }
    ],
    "es": [
      {
        "title": "Elige el estilo",
        "body": "APA, MLA, Chicago, Harvard o IEEE."
      },
      {
        "title": "Pega los datos de la fuente",
        "body": "Título, autores, año, editorial o URL — lo que tengas."
      },
      {
        "title": "Copia tu cita",
        "body": "Referencia completa más un ejemplo en el texto, listo para pegar."
      }
    ],
    "fr": [
      {
        "title": "Choisissez un style",
        "body": "APA, MLA, Chicago, Harvard ou IEEE."
      },
      {
        "title": "Collez les détails de la source",
        "body": "Titre, auteurs, année, éditeur / URL — tout ce dont vous disposez."
      },
      {
        "title": "Copiez votre citation",
        "body": "Référence complète avec exemple de citation dans le texte, prêt à coller."
      }
    ],
    "hi": [
      {
        "title": "स्टाइल चुनें",
        "body": "APA, MLA, Chicago, Harvard या IEEE।"
      },
      {
        "title": "स्रोत विवरण पेस्ट करें",
        "body": "शीर्षक, लेखक, वर्ष, प्रकाशक / URL — जो भी हो।"
      },
      {
        "title": "अपना उद्धरण कॉपी करें",
        "body": "पूर्ण संदर्भ और इन-टेक्स्ट उदाहरण, पेस्ट के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Pilih gaya",
        "body": "APA, MLA, Chicago, Harvard, atau IEEE."
      },
      {
        "title": "Tempel detail sumber",
        "body": "Judul, penulis, tahun, penerbit / URL — apa saja yang kamu punya."
      },
      {
        "title": "Salin sitasimu",
        "body": "Referensi lengkap plus contoh dalam teks, siap ditempel."
      }
    ],
    "it": [
      {
        "title": "Scegli uno stile",
        "body": "APA, MLA, Chicago, Harvard o IEEE."
      },
      {
        "title": "Incolla i dati della fonte",
        "body": "Titolo, autori, anno, editore / URL — tutto quello che hai."
      },
      {
        "title": "Copia la citazione",
        "body": "Riferimento completo più un esempio nel testo, pronto da incollare."
      }
    ],
    "ja": [
      {
        "title": "スタイルを選択",
        "body": "APA、MLA、Chicago、Harvard または IEEE。"
      },
      {
        "title": "出典の詳細をペースト",
        "body": "タイトル・著者・年・出版社/URL など手元にある情報を入力。"
      },
      {
        "title": "引用文をコピー",
        "body": "本文中引用例付きのフル参考文献をすぐに貼り付けられます。"
      }
    ],
    "ko": [
      {
        "title": "스타일 선택",
        "body": "APA, MLA, Chicago, Harvard 또는 IEEE."
      },
      {
        "title": "출처 정보 붙여넣기",
        "body": "제목, 저자, 연도, 출판사 / URL — 가진 정보면 충분합니다."
      },
      {
        "title": "인용 복사",
        "body": "본문 인용 예시와 함께 완성된 참고 문헌을 받으세요."
      }
    ],
    "nl": [
      {
        "title": "Kies een stijl",
        "body": "APA, MLA, Chicago, Harvard of IEEE."
      },
      {
        "title": "Plak brongegevens",
        "body": "Titel, auteurs, jaar, uitgever / URL — alles wat je hebt."
      },
      {
        "title": "Kopieer je bronvermelding",
        "body": "Volledige referentie plus een in-tekst-voorbeeld, klaar om te plakken."
      }
    ],
    "pl": [
      {
        "title": "Wybierz styl",
        "body": "APA, MLA, Chicago, Harvard lub IEEE."
      },
      {
        "title": "Wklej dane źródła",
        "body": "Tytuł, autorzy, rok, wydawca / URL — podaj to, co masz."
      },
      {
        "title": "Skopiuj cytat",
        "body": "Pełna referencja plus przykład cytowania w tekście, gotowe do wklejenia."
      }
    ],
    "pt": [
      {
        "title": "Escolha um estilo",
        "body": "APA, MLA, Chicago, Harvard ou IEEE."
      },
      {
        "title": "Cole os detalhes da fonte",
        "body": "Título, autores, ano, editora / URL — o que tiver disponível."
      },
      {
        "title": "Copie a sua citação",
        "body": "Referência completa mais um exemplo no texto, prontos para colar."
      }
    ],
    "ru": [
      {
        "title": "Выберите стиль",
        "body": "APA, MLA, Chicago, Harvard или IEEE."
      },
      {
        "title": "Вставьте данные источника",
        "body": "Название, авторы, год, издательство / URL — всё, что есть."
      },
      {
        "title": "Скопируйте цитату",
        "body": "Полная ссылка и пример в тексте, готово к вставке."
      }
    ],
    "sv": [
      {
        "title": "Välj stil",
        "body": "APA, MLA, Chicago, Harvard eller IEEE."
      },
      {
        "title": "Klistra in källuppgifter",
        "body": "Titel, författare, år, förlag / URL — vad du har."
      },
      {
        "title": "Kopiera din källhänvisning",
        "body": "Fullständig referens plus ett textexempel, redo att klistra in."
      }
    ],
    "tr": [
      {
        "title": "Bir stil seç",
        "body": "APA, MLA, Chicago, Harvard veya IEEE."
      },
      {
        "title": "Kaynak bilgilerini yapıştır",
        "body": "Başlık, yazarlar, yıl, yayıncı / URL — elinde ne varsa."
      },
      {
        "title": "Alıntını kopyala",
        "body": "Tam kaynak ve metin içi örnek, yapıştırmaya hazır."
      }
    ],
    "uk": [
      {
        "title": "Оберіть стиль",
        "body": "APA, MLA, Chicago, Harvard або IEEE."
      },
      {
        "title": "Вставте дані джерела",
        "body": "Назва, автори, рік, видавець / URL — що є, те й вставляйте."
      },
      {
        "title": "Скопіюйте посилання",
        "body": "Повна бібліографія та приклад внутрішньотекстового посилання, готові до вставки."
      }
    ],
    "vi": [
      {
        "title": "Chọn phong cách trích dẫn",
        "body": "APA, MLA, Chicago, Harvard hoặc IEEE."
      },
      {
        "title": "Dán thông tin nguồn",
        "body": "Tiêu đề, tác giả, năm xuất bản, nhà xuất bản / URL — những gì bạn có."
      },
      {
        "title": "Sao chép trích dẫn",
        "body": "Tài liệu tham khảo đầy đủ kèm ví dụ trích dẫn trong văn bản, sẵn sàng để dán."
      }
    ],
    "zh": [
      {
        "title": "选择引用格式",
        "body": "支持 APA、MLA、Chicago、Harvard 或 IEEE。"
      },
      {
        "title": "粘贴来源信息",
        "body": "标题、作者、年份、出版商/URL，填写已知内容即可。"
      },
      {
        "title": "复制引用",
        "body": "完整参考文献及正文内引用示例，一键复制。"
      }
    ]
  },
  "clean-ai-export": {
    "ar": [
      {
        "title": "الصق مخرجات الذكاء الاصطناعي",
        "body": "من ChatGPT أو Claude أو Gemini أو أي نموذج لغوي."
      },
      {
        "title": "اختر درجة التنظيف",
        "body": "قياسي، أو الأحرف غير المرئية فقط، أو حذف التنسيق، أو نص عادي."
      },
      {
        "title": "انسخ أو حمّل",
        "body": "نص عادي أنيق بلا أحرف مخفية."
      }
    ],
    "cs": [
      {
        "title": "Vložte výstup z AI",
        "body": "Z ChatGPT, Claude, Gemini nebo libovolného LLM."
      },
      {
        "title": "Zvolte míru čištění",
        "body": "Standardní, jen neviditelné znaky, odstraně formátování, nebo prostý text."
      },
      {
        "title": "Zkopírujte nebo stáhněte",
        "body": "Získáte čistý prostý text bez skrytých znaků."
      }
    ],
    "de": [
      {
        "title": "KI-Output einfügen",
        "body": "Von ChatGPT, Claude, Gemini oder jedem anderen LLM."
      },
      {
        "title": "Reinigungsgrad wählen",
        "body": "Standard, nur unsichtbare Zeichen, Formatierung entfernen oder reiner Klartext."
      },
      {
        "title": "Kopieren oder herunterladen",
        "body": "Sauberer Klartext — ohne versteckte Zeichen."
      }
    ],
    "es": [
      {
        "title": "Pega el texto generado por IA",
        "body": "De ChatGPT, Claude, Gemini o cualquier LLM."
      },
      {
        "title": "Elige el nivel de limpieza",
        "body": "Estándar, solo caracteres invisibles, sin formato o texto plano total."
      },
      {
        "title": "Copia o descarga",
        "body": "Texto plano y limpio, sin caracteres ocultos."
      }
    ],
    "fr": [
      {
        "title": "Collez une sortie IA",
        "body": "De ChatGPT, Claude, Gemini ou n'importe quel LLM."
      },
      {
        "title": "Choisissez le niveau de nettoyage",
        "body": "Standard, caractères invisibles seulement, suppression du formatage, ou texte brut."
      },
      {
        "title": "Copiez ou téléchargez",
        "body": "Du texte brut bien propre, sans caractères cachés."
      }
    ],
    "hi": [
      {
        "title": "AI आउटपुट पेस्ट करें",
        "body": "ChatGPT, Claude, Gemini या किसी भी LLM से।"
      },
      {
        "title": "कितना साफ़ करना है चुनें",
        "body": "स्टैंडर्ड, केवल अदृश्य कैरेक्टर, फ़ॉर्मेटिंग हटाएं, या प्लेन टेक्स्ट।"
      },
      {
        "title": "कॉपी या डाउनलोड करें",
        "body": "बिना छुपे कैरेक्टर के साफ़ प्लेन टेक्स्ट पाएं।"
      }
    ],
    "id": [
      {
        "title": "Tempel keluaran AI",
        "body": "Dari ChatGPT, Claude, Gemini, atau LLM apa pun."
      },
      {
        "title": "Pilih tingkat kebersihan",
        "body": "Standar, hanya karakter tak terlihat, hapus format, atau teks biasa."
      },
      {
        "title": "Salin atau unduh",
        "body": "Dapatkan teks bersih tanpa karakter tersembunyi."
      }
    ],
    "it": [
      {
        "title": "Incolla l'output dell'AI",
        "body": "Da ChatGPT, Claude, Gemini o qualsiasi altro LLM."
      },
      {
        "title": "Scegli il livello di pulizia",
        "body": "Standard, solo caratteri invisibili, rimozione formattazione o testo semplice."
      },
      {
        "title": "Copia o scarica",
        "body": "Testo semplice e ordinato, senza caratteri nascosti."
      }
    ],
    "ja": [
      {
        "title": "AIの出力をペースト",
        "body": "ChatGPT、Claude、Gemini、その他のLLMからの出力に対応。"
      },
      {
        "title": "クリーンの度合いを選択",
        "body": "標準・不可視文字のみ・書式除去・プレーンテキストから選択。"
      },
      {
        "title": "コピーまたはダウンロード",
        "body": "隠し文字のないきれいなプレーンテキストを取得。"
      }
    ],
    "ko": [
      {
        "title": "AI 출력 붙여넣기",
        "body": "ChatGPT, Claude, Gemini 또는 어떤 LLM이든 가능합니다."
      },
      {
        "title": "정리 수준 선택",
        "body": "기본, 숨겨진 문자만, 서식 제거, 또는 순수 텍스트."
      },
      {
        "title": "복사 또는 다운로드",
        "body": "숨겨진 문자 없이 깔끔한 텍스트를 받으세요."
      }
    ],
    "nl": [
      {
        "title": "Plak AI-uitvoer",
        "body": "Van ChatGPT, Claude, Gemini of een andere LLM."
      },
      {
        "title": "Kies hoe grondig",
        "body": "Standaard, alleen onzichtbare tekens, opmaak verwijderen of puur platte tekst."
      },
      {
        "title": "Kopiëren of downloaden",
        "body": "Nette platte tekst zonder verborgen tekens."
      }
    ],
    "pl": [
      {
        "title": "Wklej wynik z AI",
        "body": "Z ChatGPT, Claude, Gemini lub dowolnego modelu językowego."
      },
      {
        "title": "Wybierz stopień czyszczenia",
        "body": "Standardowy, tylko niewidoczne znaki, usuń formatowanie lub czysty tekst."
      },
      {
        "title": "Skopiuj lub pobierz",
        "body": "Porządny zwykły tekst bez ukrytych znaków."
      }
    ],
    "pt": [
      {
        "title": "Cole o output da IA",
        "body": "Do ChatGPT, Claude, Gemini ou qualquer LLM."
      },
      {
        "title": "Escolha o nível de limpeza",
        "body": "Padrão, apenas caracteres invisíveis, remover formatação ou texto simples."
      },
      {
        "title": "Copie ou baixe",
        "body": "Obtenha texto simples e limpo, sem caracteres ocultos."
      }
    ],
    "ru": [
      {
        "title": "Вставьте текст от ИИ",
        "body": "Из ChatGPT, Claude, Gemini или любой языковой модели."
      },
      {
        "title": "Выберите степень очистки",
        "body": "Стандартная, только невидимые символы, удаление форматирования или чистый текст."
      },
      {
        "title": "Скопируйте или скачайте",
        "body": "Аккуратный текст без скрытых символов."
      }
    ],
    "sv": [
      {
        "title": "Klistra in AI-utdata",
        "body": "Från ChatGPT, Claude, Gemini eller valfri LLM."
      },
      {
        "title": "Välj renhetsgrad",
        "body": "Standard, endast osynliga tecken, ta bort formatering eller ren text."
      },
      {
        "title": "Kopiera eller ladda ned",
        "body": "Få snygg ren text utan dolda tecken."
      }
    ],
    "tr": [
      {
        "title": "AI çıktısını yapıştır",
        "body": "ChatGPT, Claude, Gemini veya herhangi bir LLM'den."
      },
      {
        "title": "Temizlik düzeyini seç",
        "body": "Standart, yalnızca görünmez karakterler, biçimlendirmeyi kaldır veya düz metin."
      },
      {
        "title": "Kopyala veya indir",
        "body": "Gizli karakter içermeyen düzenli düz metin al."
      }
    ],
    "uk": [
      {
        "title": "Вставте вивід ШІ",
        "body": "З ChatGPT, Claude, Gemini або будь-якої LLM."
      },
      {
        "title": "Оберіть ступінь очищення",
        "body": "Стандартний, лише невидимі символи, прибрати форматування або простий текст."
      },
      {
        "title": "Скопіюйте або завантажте",
        "body": "Чистий простий текст без прихованих символів."
      }
    ],
    "vi": [
      {
        "title": "Dán nội dung AI vào đây",
        "body": "Từ ChatGPT, Claude, Gemini hoặc bất kỳ LLM nào."
      },
      {
        "title": "Chọn mức độ dọn dẹp",
        "body": "Tiêu chuẩn, chỉ xóa ký tự ẩn, xóa định dạng, hoặc văn bản thuần."
      },
      {
        "title": "Sao chép hoặc tải xuống",
        "body": "Nhận văn bản sạch không có ký tự ẩn."
      }
    ],
    "zh": [
      {
        "title": "粘贴 AI 输出内容",
        "body": "来自 ChatGPT、Claude、Gemini 或其他大语言模型均可。"
      },
      {
        "title": "选择清理程度",
        "body": "标准、仅清除不可见字符、去除格式，或纯文本。"
      },
      {
        "title": "复制或下载",
        "body": "获得无隐藏字符的干净纯文本。"
      }
    ]
  },
  "clean-subtitles": {
    "ar": [
      {
        "title": "ارفع SRT أو VTT",
        "body": "نجري تنظيفًا حتميًا — لا شيء آخر يتغير."
      },
      {
        "title": "اختر ما تريد تنظيفه",
        "body": "[Music] و(laughter) والأحرف الكبيرة والمسافات المزدوجة — فعّل كلًا منها."
      },
      {
        "title": "حمّل الملف المُنظَّف",
        "body": "أصغر حجمًا وأكثر أناقةً، جاهز للنشر."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte SRT nebo VTT",
        "body": "Provedeme deterministické čištění — nic jiného se nezmění."
      },
      {
        "title": "Vyberte, co vyčistit",
        "body": "[Music], (smích), KŘIČENÍ VERZÁLKAMI, dvojité mezery — každou volbu přepněte zvlášť."
      },
      {
        "title": "Stáhněte vyčištěný soubor",
        "body": "Kompaktnější, přehlednější a připravený k publikování."
      }
    ],
    "de": [
      {
        "title": "SRT oder VTT hochladen",
        "body": "Wir führen einen deterministischen Bereinigungsdurchlauf durch — nichts anderes wird verändert."
      },
      {
        "title": "Bereinigungsoptionen wählen",
        "body": "[Musik], (Lachen), GROSSBUCHSTABEN, Doppelleerzeichen — alles einzeln umschaltbar."
      },
      {
        "title": "Bereinigte Datei herunterladen",
        "body": "Kompakter, ordentlicher und veröffentlichungsbereit."
      }
    ],
    "es": [
      {
        "title": "Sube tu SRT o VTT",
        "body": "Aplicamos una limpieza precisa — nada más se modifica."
      },
      {
        "title": "Elige qué limpiar",
        "body": "[Música], (risas), mayúsculas innecesarias, espacios dobles — actívalos uno a uno."
      },
      {
        "title": "Descarga el archivo limpio",
        "body": "Más compacto, más ordenado y listo para publicar."
      }
    ],
    "fr": [
      {
        "title": "Importez un SRT ou VTT",
        "body": "Nous appliquons un nettoyage déterministe — rien d'autre n'est modifié."
      },
      {
        "title": "Choisissez ce à nettoyer",
        "body": "[Musique], (rires), majuscules criées, doubles espaces — activez chaque option."
      },
      {
        "title": "Téléchargez le fichier nettoyé",
        "body": "Plus léger, plus propre, prêt à être publié."
      }
    ],
    "hi": [
      {
        "title": "SRT या VTT अपलोड करें",
        "body": "हम एक निश्चित क्लीनअप पास चलाते हैं — कुछ और नहीं बदलता।"
      },
      {
        "title": "क्या साफ़ करना है चुनें",
        "body": "[Music], (laughter), कैप्स में चिल्लाना, डबल स्पेस — हर एक को टॉगल करें।"
      },
      {
        "title": "साफ़ की गई फ़ाइल डाउनलोड करें",
        "body": "छोटी, सुव्यवस्थित और प्रकाशन के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Unggah SRT atau VTT",
        "body": "Kami menjalankan pembersihan deterministik — tidak ada yang diubah selain itu."
      },
      {
        "title": "Pilih apa yang ingin dibersihkan",
        "body": "[Music], (laughter), huruf besar semua, spasi ganda — aktifkan satu per satu."
      },
      {
        "title": "Unduh file yang sudah bersih",
        "body": "Lebih ringkas, lebih rapi, dan siap dipublikasikan."
      }
    ],
    "it": [
      {
        "title": "Carica un file SRT o VTT",
        "body": "Applichiamo una pulizia deterministica — nient'altro viene modificato."
      },
      {
        "title": "Scegli cosa rimuovere",
        "body": "[Musica], (risate), maiuscole urlate, doppi spazi — attiva o disattiva ogni opzione."
      },
      {
        "title": "Scarica il file pulito",
        "body": "Più compatto, più ordinato e pronto per la pubblicazione."
      }
    ],
    "ja": [
      {
        "title": "SRT または VTT をアップロード",
        "body": "決定論的なクリーンアップのみ実行。それ以外は変更しません。"
      },
      {
        "title": "クリーン対象を選択",
        "body": "[Music]、（笑い声）、全大文字、二重スペース — 各項目をトグルで選択。"
      },
      {
        "title": "クリーン済みファイルをダウンロード",
        "body": "すっきりと整理され、すぐに公開できる状態。"
      }
    ],
    "ko": [
      {
        "title": "SRT 또는 VTT 업로드",
        "body": "결정론적 정리 작업만 실행되며 다른 내용은 변경되지 않습니다."
      },
      {
        "title": "정리할 항목 선택",
        "body": "[Music], (laughter), 대문자 강조, 이중 공백 — 각각 개별 선택 가능합니다."
      },
      {
        "title": "정리된 파일 다운로드",
        "body": "더 작고 깔끔하게, 바로 배포할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Upload SRT of VTT",
        "body": "We voeren een deterministische opschoningsronde uit — verder wordt niets gewijzigd."
      },
      {
        "title": "Kies wat je wilt opschonen",
        "body": "[Music], (gelach), SCHREEUWEN IN HOOFDLETTERS, dubbele spaties — schakel elk afzonderlijk in."
      },
      {
        "title": "Download het opgeschoonde bestand",
        "body": "Kleiner, netter en publicatieklaar."
      }
    ],
    "pl": [
      {
        "title": "Prześlij plik SRT lub VTT",
        "body": "Stosujemy deterministyczne czyszczenie — nic więcej nie jest zmieniane."
      },
      {
        "title": "Wybierz, co wyczyścić",
        "body": "[Muzyka], (śmiech), krzyczące wielkie litery, podwójne spacje — włącz lub wyłącz każdą opcję."
      },
      {
        "title": "Pobierz oczyszczony plik",
        "body": "Mniejszy, schludniejszy i gotowy do publikacji."
      }
    ],
    "pt": [
      {
        "title": "Carregue SRT ou VTT",
        "body": "Aplicamos uma limpeza determinística — nada mais é alterado."
      },
      {
        "title": "Escolha o que limpar",
        "body": "[Music], (laughter), maiúsculas em excesso, espaços duplos — ative cada opção."
      },
      {
        "title": "Baixe o ficheiro limpo",
        "body": "Mais leve, mais organizado e pronto para publicar."
      }
    ],
    "ru": [
      {
        "title": "Загрузите SRT или VTT",
        "body": "Применяется детерминированная очистка — всё остальное остаётся без изменений."
      },
      {
        "title": "Выберите, что очистить",
        "body": "[Music], (laughter), крик заглавными, двойные пробелы — включайте по отдельности."
      },
      {
        "title": "Скачайте очищенный файл",
        "body": "Компактнее, аккуратнее и готов к публикации."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp SRT eller VTT",
        "body": "Vi kör en deterministisk städpassning — inget annat ändras."
      },
      {
        "title": "Välj vad som ska städas",
        "body": "[Musik], (skratt), VERSALSKRIK, dubbla mellanslag — växla vart och ett."
      },
      {
        "title": "Ladda ned den städade filen",
        "body": "Mindre, snyggare och redo att publiceras."
      }
    ],
    "tr": [
      {
        "title": "SRT veya VTT yükle",
        "body": "Deterministik bir temizleme işlemi uygularız — başka hiçbir şey değiştirilmez."
      },
      {
        "title": "Neyi temizleyeceğini seç",
        "body": "[Müzik], (kahkaha), büyük harf bağırışları, çift boşluklar — her birini ayrı aç/kapat."
      },
      {
        "title": "Temizlenmiş dosyayı indir",
        "body": "Daha küçük, daha düzenli ve yayına hazır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте SRT або VTT",
        "body": "Ми виконуємо детермінований прохід очищення — більше нічого не змінюється."
      },
      {
        "title": "Оберіть, що прибрати",
        "body": "[Music], (laughter), зайві пробіли, крик капслоком — вмикайте кожен пункт окремо."
      },
      {
        "title": "Завантажте очищений файл",
        "body": "Компактніший, охайніший і готовий до публікації."
      }
    ],
    "vi": [
      {
        "title": "Tải lên file SRT hoặc VTT",
        "body": "Chúng tôi chạy lượt dọn dẹp xác định — không thay đổi gì khác."
      },
      {
        "title": "Chọn nội dung cần dọn",
        "body": "[Music], (laughter), chữ HOA la hét, khoảng trắng thừa — bật/tắt từng mục."
      },
      {
        "title": "Tải xuống file đã dọn dẹp",
        "body": "Gọn gàng hơn, sạch sẽ hơn, sẵn sàng để đăng tải."
      }
    ],
    "zh": [
      {
        "title": "上传 SRT 或 VTT",
        "body": "执行确定性清理，仅处理选定内容，其余保持不变。"
      },
      {
        "title": "选择清理项目",
        "body": "【音乐】、（笑声）、全大写喊叫、多余空格——逐项开关。"
      },
      {
        "title": "下载清理后的文件",
        "body": "更精简、更整洁，随时可发布。"
      }
    ]
  },
  "conjugation": {
    "ar": [
      {
        "title": "أدخل فعلًا",
        "body": "في صيغة المصدر — تُكتشف اللغة تلقائيًا."
      },
      {
        "title": "الذكاء الاصطناعي يصرّفه",
        "body": "جميع الأزمنة والأوجه الرئيسية، ضميرًا بضمير."
      },
      {
        "title": "انسخ الجدول",
        "body": "نص عادي نظيف، جاهز للصق."
      }
    ],
    "cs": [
      {
        "title": "Zadejte sloveso",
        "body": "V infinitivu — libovolný jazyk je detekován automaticky."
      },
      {
        "title": "AI ho časuje",
        "body": "Všechny hlavní časy a způsoby, osoba po osobě."
      },
      {
        "title": "Zkopírujte tabulku",
        "body": "Čistý prostý text, připravený k vložení."
      }
    ],
    "de": [
      {
        "title": "Verb eingeben",
        "body": "Im Infinitiv — jede Sprache wird automatisch erkannt."
      },
      {
        "title": "KI konjugiert es",
        "body": "Alle Hauptzeiten und Modi, Person für Person."
      },
      {
        "title": "Tabelle kopieren",
        "body": "Sauberer Klartext — direkt zum Einfügen bereit."
      }
    ],
    "es": [
      {
        "title": "Introduce un verbo",
        "body": "En infinitivo — cualquier idioma se detecta automáticamente."
      },
      {
        "title": "La IA lo conjuga",
        "body": "Todos los tiempos y modos principales, persona a persona."
      },
      {
        "title": "Copia la tabla",
        "body": "Texto plano y limpio, listo para pegar."
      }
    ],
    "fr": [
      {
        "title": "Entrez un verbe",
        "body": "À l'infinitif — n'importe quelle langue est détectée automatiquement."
      },
      {
        "title": "L'IA le conjugue",
        "body": "Tous les temps et modes principaux, personne par personne."
      },
      {
        "title": "Copiez le tableau",
        "body": "Texte brut et propre, prêt à coller."
      }
    ],
    "hi": [
      {
        "title": "एक क्रिया दर्ज करें",
        "body": "इनफिनिटिव रूप में — कोई भी भाषा अपने आप पहचानी जाती है।"
      },
      {
        "title": "AI इसे संयुग्मित करता है",
        "body": "सभी प्रमुख काल और मूड, व्यक्ति दर व्यक्ति।"
      },
      {
        "title": "टेबल कॉपी करें",
        "body": "साफ़ प्लेन टेक्स्ट, पेस्ट के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Masukkan kata kerja",
        "body": "Dalam bentuk infinitif — bahasa apa pun terdeteksi otomatis."
      },
      {
        "title": "AI mengkonjugasikannya",
        "body": "Semua kala dan modus utama, orang per orang."
      },
      {
        "title": "Salin tabelnya",
        "body": "Teks biasa yang bersih, siap ditempel."
      }
    ],
    "it": [
      {
        "title": "Inserisci un verbo",
        "body": "All'infinito — qualsiasi lingua viene rilevata automaticamente."
      },
      {
        "title": "L'AI lo coniuga",
        "body": "Tutti i tempi e i modi principali, persona per persona."
      },
      {
        "title": "Copia la tabella",
        "body": "Testo semplice e pulito, pronto da incollare."
      }
    ],
    "ja": [
      {
        "title": "動詞を入力",
        "body": "不定詞形で入力。任意の言語を自動検出。"
      },
      {
        "title": "AIが活用形を生成",
        "body": "人称ごとにすべての主要な時制・法を表示。"
      },
      {
        "title": "表をコピー",
        "body": "そのまま貼り付けられるクリーンなプレーンテキスト。"
      }
    ],
    "ko": [
      {
        "title": "동사 입력",
        "body": "원형으로 입력하세요 — 언어는 자동으로 감지됩니다."
      },
      {
        "title": "AI가 활용합니다",
        "body": "주요 시제와 법, 인칭별로 모두 표시됩니다."
      },
      {
        "title": "표 복사",
        "body": "깔끔한 일반 텍스트로 바로 붙여넣을 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Voer een werkwoord in",
        "body": "In de infinitief — elke taal wordt automatisch herkend."
      },
      {
        "title": "AI vervoegt het",
        "body": "Alle hoofdtijden en modi, persoon voor persoon."
      },
      {
        "title": "Kopieer de tabel",
        "body": "Nette platte tekst, klaar om te plakken."
      }
    ],
    "pl": [
      {
        "title": "Wpisz czasownik",
        "body": "W bezokoliczniku — język jest wykrywany automatycznie."
      },
      {
        "title": "AI odmienia go",
        "body": "Wszystkie główne czasy i tryby, osoba po osobie."
      },
      {
        "title": "Skopiuj tabelę",
        "body": "Czysty zwykły tekst, gotowy do wklejenia."
      }
    ],
    "pt": [
      {
        "title": "Introduza um verbo",
        "body": "No infinitivo — qualquer idioma é detetado automaticamente."
      },
      {
        "title": "A IA conjuga-o",
        "body": "Todos os tempos e modos principais, pessoa a pessoa."
      },
      {
        "title": "Copie a tabela",
        "body": "Texto simples e limpo, pronto para colar."
      }
    ],
    "ru": [
      {
        "title": "Введите глагол",
        "body": "В инфинитиве — язык определяется автоматически."
      },
      {
        "title": "ИИ спрягает его",
        "body": "Все основные времена и наклонения, по лицам."
      },
      {
        "title": "Скопируйте таблицу",
        "body": "Чистый текст, готов к вставке."
      }
    ],
    "sv": [
      {
        "title": "Ange ett verb",
        "body": "I infinitiv — vilket språk som helst identifieras automatiskt."
      },
      {
        "title": "AI konjugerar det",
        "body": "Alla huvudtider och modi, person för person."
      },
      {
        "title": "Kopiera tabellen",
        "body": "Ren klartext, redo att klistra in."
      }
    ],
    "tr": [
      {
        "title": "Bir fiil gir",
        "body": "Mastar formunda — her dil otomatik algılanır."
      },
      {
        "title": "AI çekimliyor",
        "body": "Tüm ana zamanlar ve kipler, kişi kişi."
      },
      {
        "title": "Tabloyu kopyala",
        "body": "Yapıştırmaya hazır, temiz düz metin."
      }
    ],
    "uk": [
      {
        "title": "Введіть дієслово",
        "body": "В інфінітиві — мова визначається автоматично."
      },
      {
        "title": "ШІ відмінює його",
        "body": "Всі основні часи й способи, особа за особою."
      },
      {
        "title": "Скопіюйте таблицю",
        "body": "Чистий простий текст, готовий до вставки."
      }
    ],
    "vi": [
      {
        "title": "Nhập động từ",
        "body": "Dạng nguyên mẫu — ngôn ngữ nào cũng được phát hiện tự động."
      },
      {
        "title": "AI chia động từ",
        "body": "Đầy đủ các thì và thức, từng ngôi một."
      },
      {
        "title": "Sao chép bảng",
        "body": "Văn bản thuần sạch sẽ, sẵn sàng để dán."
      }
    ],
    "zh": [
      {
        "title": "输入动词",
        "body": "输入不定式形式，支持任意语言，自动识别。"
      },
      {
        "title": "AI 变位",
        "body": "所有主要时态和语气，逐人称列出。"
      },
      {
        "title": "复制变位表",
        "body": "整洁纯文本，随时粘贴使用。"
      }
    ]
  },
  "context-examples": {
    "ar": [
      {
        "title": "اكتب كلمة",
        "body": "تعبير اصطلاحي أو فعل أو اسم — تُكتشف اللغة تلقائيًا."
      },
      {
        "title": "اختر لغة الترجمة",
        "body": "أكثر من 30 لغة مدعومة."
      },
      {
        "title": "اقرأ الأمثلة في السياق",
        "body": "ستة أزواج ثنائية اللغة عبر مستويات مختلفة — اختر الظل المناسب."
      }
    ],
    "cs": [
      {
        "title": "Napište slovo",
        "body": "Idiom, sloveso, podstatné jméno — libovolný jazyk je detekován."
      },
      {
        "title": "Vyberte jazyk překladu",
        "body": "Podporováno 30+ jazyků."
      },
      {
        "title": "Čtěte příklady v kontextu",
        "body": "Šest dvojjazyčných párů z různých stylových rovin — vyberte ten správný odstín."
      }
    ],
    "de": [
      {
        "title": "Wort eingeben",
        "body": "Redewendung, Verb, Nomen — jede Sprache wird erkannt."
      },
      {
        "title": "Übersetzungssprache wählen",
        "body": "30+ Sprachen unterstützt."
      },
      {
        "title": "Kontextbeispiele lesen",
        "body": "Sechs zweisprachige Paare aus verschiedenen Registern — den richtigen Ton treffen."
      }
    ],
    "es": [
      {
        "title": "Escribe una palabra",
        "body": "Expresión, verbo, sustantivo — cualquier idioma se detecta."
      },
      {
        "title": "Elige el idioma de traducción",
        "body": "Más de 30 idiomas disponibles."
      },
      {
        "title": "Lee ejemplos en contexto",
        "body": "Seis pares bilingües en distintos registros — elige el matiz adecuado."
      }
    ],
    "fr": [
      {
        "title": "Tapez un mot",
        "body": "Idiome, verbe, nom — n'importe quelle langue est détectée."
      },
      {
        "title": "Choisissez une langue de traduction",
        "body": "Plus de 30 langues prises en charge."
      },
      {
        "title": "Lisez des exemples en contexte",
        "body": "Six paires bilingues dans différents registres — trouvez la nuance qui convient."
      }
    ],
    "hi": [
      {
        "title": "एक शब्द टाइप करें",
        "body": "मुहावरा, क्रिया, संज्ञा — कोई भी भाषा पहचानी जाती है।"
      },
      {
        "title": "अनुवाद भाषा चुनें",
        "body": "30+ भाषाएं समर्थित।"
      },
      {
        "title": "संदर्भ में उदाहरण पढ़ें",
        "body": "विभिन्न स्तरों में छह द्विभाषी जोड़े — सही शेड चुनें।"
      }
    ],
    "id": [
      {
        "title": "Ketik kata",
        "body": "Idiom, kata kerja, kata benda — bahasa apa pun terdeteksi."
      },
      {
        "title": "Pilih bahasa terjemahan",
        "body": "30+ bahasa didukung."
      },
      {
        "title": "Baca contoh dalam konteks",
        "body": "Enam pasang bilingual lintas register — pilih nuansa yang tepat."
      }
    ],
    "it": [
      {
        "title": "Digita una parola",
        "body": "Idioma, verbo, sostantivo — qualsiasi lingua viene rilevata."
      },
      {
        "title": "Scegli la lingua di traduzione",
        "body": "Oltre 30 lingue supportate."
      },
      {
        "title": "Leggi esempi in contesto",
        "body": "Sei coppie bilingui in diversi registri — scegli la sfumatura giusta."
      }
    ],
    "ja": [
      {
        "title": "単語を入力",
        "body": "イディオム・動詞・名詞など。言語は自動検出。"
      },
      {
        "title": "翻訳言語を選択",
        "body": "30以上の言語に対応。"
      },
      {
        "title": "文脈例を確認",
        "body": "さまざまなレジスターの6つのバイリンガル例文で、最適なニュアンスを選択。"
      }
    ],
    "ko": [
      {
        "title": "단어 입력",
        "body": "관용어, 동사, 명사 — 언어는 자동으로 감지됩니다."
      },
      {
        "title": "번역 언어 선택",
        "body": "30개 이상의 언어를 지원합니다."
      },
      {
        "title": "문맥 예문 확인",
        "body": "다양한 문체의 이중 언어 예문 6쌍 — 딱 맞는 용법을 찾으세요."
      }
    ],
    "nl": [
      {
        "title": "Typ een woord",
        "body": "Idioom, werkwoord, zelfstandig naamwoord — elke taal wordt herkend."
      },
      {
        "title": "Kies een vertaaltaal",
        "body": "30+ talen ondersteund."
      },
      {
        "title": "Lees voorbeelden in context",
        "body": "Zes tweetalige paren in verschillende registers — kies de juiste nuance."
      }
    ],
    "pl": [
      {
        "title": "Wpisz słowo",
        "body": "Idiom, czasownik, rzeczownik — język wykrywany automatycznie."
      },
      {
        "title": "Wybierz język tłumaczenia",
        "body": "Obsługiwanych 30+ języków."
      },
      {
        "title": "Czytaj przykłady w kontekście",
        "body": "Sześć dwujęzycznych par z różnych rejestrów — wybierz właściwy odcień."
      }
    ],
    "pt": [
      {
        "title": "Escreva uma palavra",
        "body": "Expressão, verbo, substantivo — qualquer idioma é detetado."
      },
      {
        "title": "Escolha o idioma de tradução",
        "body": "Mais de 30 idiomas suportados."
      },
      {
        "title": "Leia exemplos em contexto",
        "body": "Seis pares bilíngues em diferentes registos — escolha o tom certo."
      }
    ],
    "ru": [
      {
        "title": "Введите слово",
        "body": "Идиома, глагол, существительное — язык определяется автоматически."
      },
      {
        "title": "Выберите язык перевода",
        "body": "Поддерживается 30+ языков."
      },
      {
        "title": "Читайте примеры в контексте",
        "body": "Шесть двуязычных пар в разных стилях — выберите нужный оттенок."
      }
    ],
    "sv": [
      {
        "title": "Skriv ett ord",
        "body": "Idiom, verb, substantiv — vilket språk som helst identifieras."
      },
      {
        "title": "Välj ett översättningsspråk",
        "body": "30+ språk stöds."
      },
      {
        "title": "Läs kontextuella exempel",
        "body": "Sex tvåspråkiga par från olika register — välj rätt nyans."
      }
    ],
    "tr": [
      {
        "title": "Bir kelime yaz",
        "body": "Deyim, fiil, isim — her dil algılanır."
      },
      {
        "title": "Çeviri dilini seç",
        "body": "30'dan fazla dil desteklenir."
      },
      {
        "title": "Bağlamlı örnekleri oku",
        "body": "Farklı kullanım düzeylerinde altı ikidilli çift — doğru nüansı seç."
      }
    ],
    "uk": [
      {
        "title": "Введіть слово",
        "body": "Фразеологізм, дієслово, іменник — мова визначається автоматично."
      },
      {
        "title": "Оберіть мову перекладу",
        "body": "Підтримується 30+ мов."
      },
      {
        "title": "Читайте приклади в контексті",
        "body": "Шість двомовних пар у різних стилях — оберіть потрібний відтінок."
      }
    ],
    "vi": [
      {
        "title": "Nhập một từ",
        "body": "Thành ngữ, động từ, danh từ — ngôn ngữ nào cũng được phát hiện."
      },
      {
        "title": "Chọn ngôn ngữ dịch",
        "body": "Hỗ trợ 30+ ngôn ngữ."
      },
      {
        "title": "Đọc ví dụ trong ngữ cảnh",
        "body": "Sáu cặp song ngữ ở các văn phong khác nhau — chọn sắc thái phù hợp."
      }
    ],
    "zh": [
      {
        "title": "输入词语",
        "body": "惯用语、动词、名词均可，自动识别语言。"
      },
      {
        "title": "选择翻译语言",
        "body": "支持 30+ 种语言。"
      },
      {
        "title": "查看语境例句",
        "body": "六组双语例句，覆盖不同语体，找到最贴切的用法。"
      }
    ]
  },
  "contract-analyzer": {
    "ar": [
      {
        "title": "ارفع PDF العقد",
        "body": "نصي — المسح الضوئي يحتاج OCR أولًا."
      },
      {
        "title": "نستخرج ونلخّص",
        "body": "الأطراف والمدة والدفع والمسؤولية والبنود الملاحَظة."
      },
      {
        "title": "اقرأ التحذيرات",
        "body": "يُعلّم الذكاء الاصطناعي البنود أحادية الجانب أو غير المعتادة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte PDF smlouvy",
        "body": "Textové — naskenované dokumenty nejprve potřebují OCR."
      },
      {
        "title": "Extrahujeme a shrneme",
        "body": "Strany, trvání, platby, odpovědnost, pozoruhodné klauzule."
      },
      {
        "title": "Přečtěte si varování",
        "body": "AI označí jednostranná nebo neobvyklá ustanovení."
      }
    ],
    "de": [
      {
        "title": "Vertrags-PDF hochladen",
        "body": "Textbasiert — gescannte Dokumente benötigen zuerst OCR."
      },
      {
        "title": "Wir extrahieren und fassen zusammen",
        "body": "Parteien, Laufzeit, Zahlung, Haftung, auffällige Klauseln."
      },
      {
        "title": "Rote Fahnen lesen",
        "body": "KI markiert einseitige oder ungewöhnliche Bestimmungen."
      }
    ],
    "es": [
      {
        "title": "Sube el PDF del contrato",
        "body": "Con texto seleccionable — los escaneados necesitan OCR primero."
      },
      {
        "title": "Extraemos y resumimos",
        "body": "Partes, duración, pago, responsabilidad y cláusulas destacadas."
      },
      {
        "title": "Lee las alertas",
        "body": "La IA señala cláusulas inusuales o desequilibradas."
      }
    ],
    "fr": [
      {
        "title": "Importez le PDF du contrat",
        "body": "Doit être basé sur du texte — les scans nécessitent une OCR au préalable."
      },
      {
        "title": "Nous extrayons et résumons",
        "body": "Parties, durée, paiement, responsabilité, clauses notables."
      },
      {
        "title": "Lisez les points d'alerte",
        "body": "L'IA signale les clauses déséquilibrées ou inhabituelles."
      }
    ],
    "hi": [
      {
        "title": "कॉन्ट्रैक्ट PDF अपलोड करें",
        "body": "टेक्स्ट-आधारित — स्कैन को पहले OCR चाहिए।"
      },
      {
        "title": "हम एक्सट्रैक्ट और सारांशित करते हैं",
        "body": "पार्टियां, अवधि, भुगतान, दायित्व, उल्लेखनीय क्लॉज़।"
      },
      {
        "title": "रेड फ्लैग पढ़ें",
        "body": "AI एकतरफा या असामान्य प्रावधानों को फ्लैग करता है।"
      }
    ],
    "id": [
      {
        "title": "Unggah PDF kontrak",
        "body": "Berbasis teks — pindaian perlu OCR terlebih dahulu."
      },
      {
        "title": "Kami mengekstrak dan merangkum",
        "body": "Pihak-pihak, jangka waktu, pembayaran, kewajiban, klausul penting."
      },
      {
        "title": "Baca peringatan merah",
        "body": "AI menandai ketentuan yang sepihak atau tidak biasa."
      }
    ],
    "it": [
      {
        "title": "Carica il PDF del contratto",
        "body": "Deve essere basato su testo — i documenti scansionati richiedono prima l'OCR."
      },
      {
        "title": "Estraiamo e riassumiamo",
        "body": "Parti, durata, pagamento, responsabilità, clausole rilevanti."
      },
      {
        "title": "Leggi i segnali d'allarme",
        "body": "L'AI evidenzia le clausole unilaterali o insolite."
      }
    ],
    "ja": [
      {
        "title": "契約書のPDFをアップロード",
        "body": "テキストベースのもの。スキャンはOCRが必要です。"
      },
      {
        "title": "抽出と要約",
        "body": "当事者・期間・支払い・責任・注目条項を抽出。"
      },
      {
        "title": "危険フラグを確認",
        "body": "一方的または異常な条項を AI が指摘します。"
      }
    ],
    "ko": [
      {
        "title": "계약서 PDF 업로드",
        "body": "텍스트 기반이어야 합니다 — 스캔본은 먼저 OCR이 필요합니다."
      },
      {
        "title": "추출 및 요약",
        "body": "당사자, 기간, 지불, 책임, 주요 조항."
      },
      {
        "title": "위험 조항 확인",
        "body": "AI가 일방적이거나 비정상적인 조항을 표시합니다."
      }
    ],
    "nl": [
      {
        "title": "Upload de contract-PDF",
        "body": "Tekstgebaseerd — gescande documenten hebben eerst OCR nodig."
      },
      {
        "title": "We extraheren en vatten samen",
        "body": "Partijen, looptijd, betaling, aansprakelijkheid, opvallende clausules."
      },
      {
        "title": "Lees de rode vlaggen",
        "body": "AI signaleert eenzijdige of ongebruikelijke bepalingen."
      }
    ],
    "pl": [
      {
        "title": "Prześlij PDF umowy",
        "body": "Oparty na tekście — skany wymagają najpierw OCR."
      },
      {
        "title": "Wyodrębniamy i streszczamy",
        "body": "Strony, czas trwania, płatność, odpowiedzialność, kluczowe klauzule."
      },
      {
        "title": "Przeczytaj ostrzeżenia",
        "body": "AI zaznacza jednostronne lub niestandardowe postanowienia."
      }
    ],
    "pt": [
      {
        "title": "Carregue o PDF do contrato",
        "body": "Com texto selecionável — digitalizações precisam de OCR primeiro."
      },
      {
        "title": "Extraímos e resumimos",
        "body": "Partes, prazo, pagamento, responsabilidade, cláusulas relevantes."
      },
      {
        "title": "Leia os alertas",
        "body": "A IA assinala cláusulas unilaterais ou incomuns."
      }
    ],
    "ru": [
      {
        "title": "Загрузите PDF контракта",
        "body": "Текстовый PDF — сканы сначала потребуют OCR."
      },
      {
        "title": "Извлечение и краткое изложение",
        "body": "Стороны, срок, оплата, ответственность, ключевые пункты."
      },
      {
        "title": "Прочитайте предупреждения",
        "body": "ИИ выделяет односторонние или нестандартные положения."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp avtals-PDF:en",
        "body": "Textbaserad — skannade dokument behöver OCR först."
      },
      {
        "title": "Vi extraherar och sammanfattar",
        "body": "Parter, löptid, betalning, ansvar, märkbara klausuler."
      },
      {
        "title": "Läs varningssignalerna",
        "body": "AI flaggar ensidiga eller ovanliga bestämmelser."
      }
    ],
    "tr": [
      {
        "title": "Sözleşme PDF'ini yükle",
        "body": "Metin tabanlı olmalı — taranmışlar önce OCR gerektirir."
      },
      {
        "title": "Çıkarıyor ve özetliyoruz",
        "body": "Taraflar, süre, ödeme, sorumluluk, dikkat çeken maddeler."
      },
      {
        "title": "Kırmızı bayrakları oku",
        "body": "AI, tek taraflı veya olağandışı hükümleri işaretler."
      }
    ],
    "uk": [
      {
        "title": "Завантажте PDF договору",
        "body": "Текстовий — відскановані потребують попереднього OCR."
      },
      {
        "title": "Ми витягуємо і підсумовуємо",
        "body": "Сторони, термін, оплата, відповідальність, ключові пункти."
      },
      {
        "title": "Перегляньте тривожні сигнали",
        "body": "ШІ позначає однобокі або незвичні положення."
      }
    ],
    "vi": [
      {
        "title": "Tải lên file PDF hợp đồng",
        "body": "Dạng văn bản — tài liệu scan cần OCR trước."
      },
      {
        "title": "Chúng tôi trích xuất và tóm tắt",
        "body": "Các bên, thời hạn, thanh toán, trách nhiệm pháp lý, điều khoản đáng chú ý."
      },
      {
        "title": "Đọc cảnh báo rủi ro",
        "body": "AI gắn cờ các điều khoản thiên lệch hoặc bất thường."
      }
    ],
    "zh": [
      {
        "title": "上传合同 PDF",
        "body": "需为文字版 PDF，扫描件请先进行 OCR 处理。"
      },
      {
        "title": "提取与摘要",
        "body": "涵盖合同方、期限、付款、责任条款和重要条款。"
      },
      {
        "title": "查看风险提示",
        "body": "AI 标记不平等或异常条款，提醒注意。"
      }
    ]
  },
  "cover-letter": {
    "ar": [
      {
        "title": "أدخل خلفيتك المهنية",
        "body": "الاسم والدور الحالي والمهارات الأساسية."
      },
      {
        "title": "الصق وصف الوظيفة",
        "body": "نُكيّف الخطاب وفق لغته وأسلوبه."
      },
      {
        "title": "صدّر إلى PDF",
        "body": "حرّر النتيجة ثم حمّلها."
      }
    ],
    "cs": [
      {
        "title": "Zadejte své zázemí",
        "body": "Jméno, aktuální pozice, klíčové dovednosti."
      },
      {
        "title": "Vložte popis pracovní pozice",
        "body": "Přizpůsobíme dopis jejímu jazyku a tónu."
      },
      {
        "title": "Exportujte do PDF",
        "body": "Upravte výsledek a stáhněte."
      }
    ],
    "de": [
      {
        "title": "Hintergrund eingeben",
        "body": "Name, aktuelle Stelle, wichtigste Fähigkeiten."
      },
      {
        "title": "Stellenbeschreibung einfügen",
        "body": "Wir passen das Anschreiben an Sprache und Ton der Stelle an."
      },
      {
        "title": "Als PDF exportieren",
        "body": "Ergebnis bearbeiten und herunterladen."
      }
    ],
    "es": [
      {
        "title": "Introduce tu perfil",
        "body": "Nombre, puesto actual, habilidades clave."
      },
      {
        "title": "Pega la descripción del puesto",
        "body": "Adaptamos la carta a su lenguaje y tono."
      },
      {
        "title": "Exporta a PDF",
        "body": "Edita el resultado y descárgalo."
      }
    ],
    "fr": [
      {
        "title": "Renseignez votre parcours",
        "body": "Nom, poste actuel, compétences clés."
      },
      {
        "title": "Collez la description du poste",
        "body": "Nous adaptons la lettre à son langage et à son ton."
      },
      {
        "title": "Exportez en PDF",
        "body": "Modifiez le résultat, puis téléchargez."
      }
    ],
    "hi": [
      {
        "title": "अपनी पृष्ठभूमि दर्ज करें",
        "body": "नाम, वर्तमान भूमिका, प्रमुख कौशल।"
      },
      {
        "title": "जॉब डिस्क्रिप्शन पेस्ट करें",
        "body": "हम पत्र को उसकी भाषा और टोन के अनुसार तैयार करते हैं।"
      },
      {
        "title": "PDF में एक्सपोर्ट करें",
        "body": "परिणाम एडिट करें, फिर डाउनलोड करें।"
      }
    ],
    "id": [
      {
        "title": "Masukkan latar belakangmu",
        "body": "Nama, posisi saat ini, keahlian utama."
      },
      {
        "title": "Tempel deskripsi pekerjaan",
        "body": "Kami menyesuaikan surat dengan bahasa dan nada lowongan tersebut."
      },
      {
        "title": "Ekspor ke PDF",
        "body": "Edit hasilnya, lalu unduh."
      }
    ],
    "it": [
      {
        "title": "Inserisci il tuo profilo",
        "body": "Nome, ruolo attuale, competenze chiave."
      },
      {
        "title": "Incolla la descrizione del lavoro",
        "body": "Adattiamo la lettera al linguaggio e al tono dell'annuncio."
      },
      {
        "title": "Esporta in PDF",
        "body": "Modifica il risultato, poi scarica."
      }
    ],
    "ja": [
      {
        "title": "経歴を入力",
        "body": "氏名・現在の役職・主要スキル。"
      },
      {
        "title": "求人票をペースト",
        "body": "その言葉とトーンに合わせたカバーレターを作成。"
      },
      {
        "title": "PDFにエクスポート",
        "body": "内容を編集してからダウンロード。"
      }
    ],
    "ko": [
      {
        "title": "배경 정보 입력",
        "body": "이름, 현재 직무, 주요 역량."
      },
      {
        "title": "채용 공고 붙여넣기",
        "body": "공고의 언어와 톤에 맞게 편지를 작성합니다."
      },
      {
        "title": "PDF로 내보내기",
        "body": "결과를 수정한 후 다운로드하세요."
      }
    ],
    "nl": [
      {
        "title": "Voer je achtergrond in",
        "body": "Naam, huidige functie, belangrijkste vaardigheden."
      },
      {
        "title": "Plak de vacaturetekst",
        "body": "We stemmen de brief af op de taal en toon ervan."
      },
      {
        "title": "Exporteer naar PDF",
        "body": "Bewerk het resultaat en download het."
      }
    ],
    "pl": [
      {
        "title": "Podaj swoje dane",
        "body": "Imię, aktualne stanowisko, kluczowe umiejętności."
      },
      {
        "title": "Wklej opis stanowiska",
        "body": "Dopasowujemy list do jego języka i tonu."
      },
      {
        "title": "Eksportuj do PDF",
        "body": "Edytuj wynik, a następnie pobierz."
      }
    ],
    "pt": [
      {
        "title": "Introduza o seu perfil",
        "body": "Nome, função atual, competências-chave."
      },
      {
        "title": "Cole a descrição da vaga",
        "body": "Adaptamos a carta ao tom e linguagem do anúncio."
      },
      {
        "title": "Exporte para PDF",
        "body": "Edite o resultado e baixe."
      }
    ],
    "ru": [
      {
        "title": "Введите информацию о себе",
        "body": "Имя, текущая должность, ключевые навыки."
      },
      {
        "title": "Вставьте описание вакансии",
        "body": "Письмо адаптируется под её язык и тон."
      },
      {
        "title": "Экспортируйте в PDF",
        "body": "Отредактируйте результат, затем скачайте."
      }
    ],
    "sv": [
      {
        "title": "Ange din bakgrund",
        "body": "Namn, nuvarande roll, nyckelkompetenser."
      },
      {
        "title": "Klistra in jobbannonsen",
        "body": "Vi skräddarsyr brevet efter annonsens språk och ton."
      },
      {
        "title": "Exportera till PDF",
        "body": "Redigera resultatet och ladda ned."
      }
    ],
    "tr": [
      {
        "title": "Arka planını gir",
        "body": "Ad, mevcut rol, temel beceriler."
      },
      {
        "title": "İş ilanını yapıştır",
        "body": "Mektubu ilanın diline ve tonuna göre uyarlıyoruz."
      },
      {
        "title": "PDF olarak dışa aktar",
        "body": "Sonucu düzenle, sonra indir."
      }
    ],
    "uk": [
      {
        "title": "Введіть свої дані",
        "body": "Ім'я, поточна посада, ключові навички."
      },
      {
        "title": "Вставте опис вакансії",
        "body": "Ми адаптуємо лист під її мову та тон."
      },
      {
        "title": "Збережіть у PDF",
        "body": "Відредагуйте результат, потім завантажте."
      }
    ],
    "vi": [
      {
        "title": "Nhập thông tin của bạn",
        "body": "Tên, vị trí hiện tại, kỹ năng chính."
      },
      {
        "title": "Dán mô tả công việc",
        "body": "Chúng tôi điều chỉnh thư theo ngôn ngữ và giọng điệu của công việc đó."
      },
      {
        "title": "Xuất sang PDF",
        "body": "Chỉnh sửa kết quả, rồi tải xuống."
      }
    ],
    "zh": [
      {
        "title": "输入个人背景",
        "body": "姓名、当前职位和核心技能。"
      },
      {
        "title": "粘贴职位描述",
        "body": "我们会根据其语言风格量身定制求职信。"
      },
      {
        "title": "导出为 PDF",
        "body": "编辑后即可下载。"
      }
    ]
  },
  "create-zip": {
    "ar": [
      {
        "title": "أضف الملفات",
        "body": "أسقط ملفات متعددة من جهازك."
      },
      {
        "title": "نضغطها",
        "body": "ضغط DEFLATE داخل المتصفح."
      },
      {
        "title": "حمّل ZIP",
        "body": "أرشيف واحد جاهز للمشاركة."
      }
    ],
    "cs": [
      {
        "title": "Přidejte soubory",
        "body": "Přetáhněte více souborů ze svého zařízení."
      },
      {
        "title": "Zkomprimujeme je",
        "body": "Komprese DEFLATE přímo v prohlížeči."
      },
      {
        "title": "Stáhněte ZIP",
        "body": "Jeden archiv, připravený ke sdílení."
      }
    ],
    "de": [
      {
        "title": "Dateien hinzufügen",
        "body": "Mehrere Dateien von deinem Gerät ablegen."
      },
      {
        "title": "Wir komprimieren sie",
        "body": "DEFLATE-Komprimierung direkt im Browser."
      },
      {
        "title": "ZIP herunterladen",
        "body": "Ein einzelnes Archiv — bereit zum Teilen."
      }
    ],
    "es": [
      {
        "title": "Añade archivos",
        "body": "Arrastra varios archivos desde tu dispositivo."
      },
      {
        "title": "Los comprimimos",
        "body": "Compresión DEFLATE en el navegador."
      },
      {
        "title": "Descarga el ZIP",
        "body": "Un solo archivo comprimido, listo para compartir."
      }
    ],
    "fr": [
      {
        "title": "Ajoutez des fichiers",
        "body": "Déposez plusieurs fichiers depuis votre appareil."
      },
      {
        "title": "Nous les compressons",
        "body": "Compression DEFLATE dans le navigateur."
      },
      {
        "title": "Téléchargez le ZIP",
        "body": "Une archive unique, prête à partager."
      }
    ],
    "hi": [
      {
        "title": "फ़ाइलें जोड़ें",
        "body": "अपने डिवाइस से कई फ़ाइलें डालें।"
      },
      {
        "title": "हम उन्हें कंप्रेस करते हैं",
        "body": "ब्राउज़र में DEFLATE कंप्रेशन।"
      },
      {
        "title": "ZIP डाउनलोड करें",
        "body": "एकल आर्काइव, शेयर करने के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Tambahkan file",
        "body": "Seret beberapa file dari perangkatmu."
      },
      {
        "title": "Kami mengompresinya",
        "body": "Kompresi DEFLATE di browser."
      },
      {
        "title": "Unduh ZIP",
        "body": "Satu arsip, siap dibagikan."
      }
    ],
    "it": [
      {
        "title": "Aggiungi i file",
        "body": "Trascina più file dal tuo dispositivo."
      },
      {
        "title": "Li comprimiamo",
        "body": "Compressione DEFLATE direttamente nel browser."
      },
      {
        "title": "Scarica l'archivio ZIP",
        "body": "Un singolo archivio, pronto da condividere."
      }
    ],
    "ja": [
      {
        "title": "ファイルを追加",
        "body": "デバイスから複数ファイルをドロップ。"
      },
      {
        "title": "圧縮する",
        "body": "ブラウザ内で DEFLATE 圧縮を実行。"
      },
      {
        "title": "ZIPをダウンロード",
        "body": "1つのアーカイブにまとめて共有できます。"
      }
    ],
    "ko": [
      {
        "title": "파일 추가",
        "body": "기기에서 여러 파일을 드롭하세요."
      },
      {
        "title": "압축 처리",
        "body": "브라우저에서 DEFLATE 압축이 실행됩니다."
      },
      {
        "title": "ZIP 다운로드",
        "body": "공유할 수 있는 하나의 압축 파일."
      }
    ],
    "nl": [
      {
        "title": "Bestanden toevoegen",
        "body": "Sleep meerdere bestanden vanaf je apparaat hierheen."
      },
      {
        "title": "We comprimeren ze",
        "body": "DEFLATE-compressie rechtstreeks in de browser."
      },
      {
        "title": "Download de ZIP",
        "body": "Één archief, klaar om te delen."
      }
    ],
    "pl": [
      {
        "title": "Dodaj pliki",
        "body": "Upuść wiele plików ze swojego urządzenia."
      },
      {
        "title": "Kompresujemy je",
        "body": "Kompresja DEFLATE w przeglądarce."
      },
      {
        "title": "Pobierz archiwum ZIP",
        "body": "Jedno archiwum, gotowe do udostępnienia."
      }
    ],
    "pt": [
      {
        "title": "Adicione ficheiros",
        "body": "Arraste vários ficheiros do seu dispositivo."
      },
      {
        "title": "Comprimimos tudo",
        "body": "Compressão DEFLATE no browser."
      },
      {
        "title": "Baixe o ZIP",
        "body": "Um arquivo único, pronto para partilhar."
      }
    ],
    "ru": [
      {
        "title": "Добавьте файлы",
        "body": "Перетащите несколько файлов с устройства."
      },
      {
        "title": "Выполняем сжатие",
        "body": "Сжатие DEFLATE прямо в браузере."
      },
      {
        "title": "Скачайте ZIP",
        "body": "Единый архив, готов к отправке."
      }
    ],
    "sv": [
      {
        "title": "Lägg till filer",
        "body": "Släpp flera filer från din enhet."
      },
      {
        "title": "Vi komprimerar dem",
        "body": "DEFLATE-komprimering i webbläsaren."
      },
      {
        "title": "Ladda ned ZIP:en",
        "body": "Ett enda arkiv, redo att dela."
      }
    ],
    "tr": [
      {
        "title": "Dosya ekle",
        "body": "Cihazından birden fazla dosya bırak."
      },
      {
        "title": "Sıkıştırıyoruz",
        "body": "Tarayıcıda DEFLATE sıkıştırması."
      },
      {
        "title": "ZIP dosyasını indir",
        "body": "Paylaşıma hazır tek arşiv."
      }
    ],
    "uk": [
      {
        "title": "Додайте файли",
        "body": "Перетягніть кілька файлів із пристрою."
      },
      {
        "title": "Ми їх стискаємо",
        "body": "Стиснення DEFLATE прямо в браузері."
      },
      {
        "title": "Завантажте ZIP",
        "body": "Один архів, готовий до поширення."
      }
    ],
    "vi": [
      {
        "title": "Thêm file",
        "body": "Kéo thả nhiều file từ thiết bị của bạn."
      },
      {
        "title": "Nén tự động",
        "body": "Nén DEFLATE ngay trong trình duyệt."
      },
      {
        "title": "Tải xuống file ZIP",
        "body": "Một archive duy nhất, sẵn sàng chia sẻ."
      }
    ],
    "zh": [
      {
        "title": "添加文件",
        "body": "从设备中拖入多个文件。"
      },
      {
        "title": "在浏览器内压缩",
        "body": "在浏览器中使用 DEFLATE 算法压缩。"
      },
      {
        "title": "下载 ZIP 压缩包",
        "body": "单一归档文件，随时可分享。"
      }
    ]
  },
  "csv-to-json": {
    "ar": [
      {
        "title": "الصق CSV الخاص بك",
        "body": "يُعامَل الصف الأول كترويسة."
      },
      {
        "title": "نُحلّله بأمان",
        "body": "الحقول بين علامات اقتباس والفواصل تُعالَج بصحة."
      },
      {
        "title": "انسخ JSON",
        "body": "مصفوفة نظيفة من الكائنات، جاهزة لكودك."
      }
    ],
    "cs": [
      {
        "title": "Vložte CSV",
        "body": "První řádek se považuje za záhlaví."
      },
      {
        "title": "Zpracujeme bezpečně",
        "body": "Pole v uvozovkách, escapované uvozovky i čárky jsou správně zpracovány."
      },
      {
        "title": "Zkopírujte JSON",
        "body": "Čisté pole objektů připravené pro váš kód."
      }
    ],
    "de": [
      {
        "title": "CSV einfügen",
        "body": "Die erste Zeile wird als Header behandelt."
      },
      {
        "title": "Sicheres Parsen",
        "body": "Felder in Anführungszeichen, maskierte Zeichen und Kommas werden korrekt verarbeitet."
      },
      {
        "title": "JSON kopieren",
        "body": "Ein sauberes Array von Objekten — bereit für deinen Code."
      }
    ],
    "es": [
      {
        "title": "Pega tu CSV",
        "body": "La primera fila se toma como cabecera."
      },
      {
        "title": "Lo analizamos de forma segura",
        "body": "Campos entre comillas, comillas escapadas y comas se gestionan correctamente."
      },
      {
        "title": "Copia el JSON",
        "body": "Un array de objetos limpio, listo para tu código."
      }
    ],
    "fr": [
      {
        "title": "Collez votre CSV",
        "body": "La première ligne est considérée comme l'en-tête."
      },
      {
        "title": "Nous l'analysons proprement",
        "body": "Les champs entre guillemets, les virgules échappées et les quotes imbriquées sont gérés."
      },
      {
        "title": "Copiez le JSON",
        "body": "Un tableau d'objets propre, prêt pour votre code."
      }
    ],
    "hi": [
      {
        "title": "अपना CSV पेस्ट करें",
        "body": "पहली पंक्ति को हेडर माना जाता है।"
      },
      {
        "title": "हम इसे सुरक्षित रूप से पार्स करते हैं",
        "body": "क्वोटेड फील्ड्स, एस्केप्ड क्वोट्स और कॉमा हैंडल किए जाते हैं।"
      },
      {
        "title": "JSON कॉपी करें",
        "body": "ऑब्जेक्ट्स का एक साफ़ अरे, आपके कोड के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Tempel CSV kamu",
        "body": "Baris pertama diperlakukan sebagai header."
      },
      {
        "title": "Kami mengurai dengan aman",
        "body": "Bidang yang dikutip, kutipan yang di-escape, dan koma ditangani dengan benar."
      },
      {
        "title": "Salin JSON",
        "body": "Array objek yang bersih, siap untuk kode kamu."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo CSV",
        "body": "La prima riga viene trattata come intestazione."
      },
      {
        "title": "Parsing sicuro",
        "body": "Campi tra virgolette, virgolette di escape e virgole vengono gestiti correttamente."
      },
      {
        "title": "Copia il JSON",
        "body": "Un array di oggetti pulito, pronto per il tuo codice."
      }
    ],
    "ja": [
      {
        "title": "CSV をペースト",
        "body": "1行目がヘッダーとして扱われます。"
      },
      {
        "title": "安全にパース",
        "body": "クォートされたフィールド、エスケープされたクォート、カンマも適切に処理。"
      },
      {
        "title": "JSON をコピー",
        "body": "コードですぐ使えるクリーンなオブジェクトの配列。"
      }
    ],
    "ko": [
      {
        "title": "CSV 붙여넣기",
        "body": "첫 번째 행이 헤더로 처리됩니다."
      },
      {
        "title": "안전하게 파싱됩니다",
        "body": "따옴표로 감싼 필드, 이스케이프된 따옴표, 쉼표가 올바르게 처리됩니다."
      },
      {
        "title": "JSON 복사",
        "body": "코드에서 바로 사용할 수 있는 깔끔한 객체 배열입니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je CSV",
        "body": "De eerste rij wordt als header gebruikt."
      },
      {
        "title": "We verwerken het veilig",
        "body": "Aanhalingstekens, geëscapte tekens en komma's in velden worden correct behandeld."
      },
      {
        "title": "Kopieer de JSON",
        "body": "Een nette array van objecten, klaar voor je code."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój CSV",
        "body": "Pierwszy wiersz traktowany jest jako nagłówek."
      },
      {
        "title": "Bezpieczne parsowanie",
        "body": "Pola w cudzysłowie, znaki specjalne i przecinki są poprawnie obsługiwane."
      },
      {
        "title": "Skopiuj JSON",
        "body": "Czysta tablica obiektów, gotowa do użycia w kodzie."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu CSV",
        "body": "A primeira linha é tratada como cabeçalho."
      },
      {
        "title": "Processamos com segurança",
        "body": "Campos entre aspas, aspas escapadas e vírgulas são tratados corretamente."
      },
      {
        "title": "Copie o JSON",
        "body": "Um array limpo de objetos, pronto para o seu código."
      }
    ],
    "ru": [
      {
        "title": "Вставьте CSV",
        "body": "Первая строка считается заголовком."
      },
      {
        "title": "Безопасный парсинг",
        "body": "Поля в кавычках, экранированные кавычки и запятые обрабатываются корректно."
      },
      {
        "title": "Скопируйте JSON",
        "body": "Чистый массив объектов, готовый для вашего кода."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din CSV",
        "body": "Den första raden behandlas som rubrik."
      },
      {
        "title": "Vi parsar den säkert",
        "body": "Citerade fält, escapade citattecken och kommatecken hanteras."
      },
      {
        "title": "Kopiera JSON:en",
        "body": "En ren array av objekt, redo för din kod."
      }
    ],
    "tr": [
      {
        "title": "CSV'ni yapıştır",
        "body": "İlk satır başlık olarak işlenir."
      },
      {
        "title": "Güvenli şekilde ayrıştırıyoruz",
        "body": "Tırnak içindeki alanlar, kaçış karakterleri ve virgüller doğru işlenir."
      },
      {
        "title": "JSON'u kopyala",
        "body": "Kodun için hazır, temiz bir nesne dizisi."
      }
    ],
    "uk": [
      {
        "title": "Вставте CSV",
        "body": "Перший рядок вважається заголовком."
      },
      {
        "title": "Безпечне парсування",
        "body": "Поля в лапках, екрановані символи та коми обробляються коректно."
      },
      {
        "title": "Скопіюйте JSON",
        "body": "Чистий масив обʼєктів, готовий для вашого коду."
      }
    ],
    "vi": [
      {
        "title": "Dán CSV vào đây",
        "body": "Hàng đầu tiên được coi là tiêu đề."
      },
      {
        "title": "Phân tích an toàn",
        "body": "Trường được trích dẫn, dấu ngoặc thoát và dấu phẩy đều được xử lý đúng."
      },
      {
        "title": "Sao chép JSON",
        "body": "Mảng đối tượng sạch sẽ, sẵn sàng cho code của bạn."
      }
    ],
    "zh": [
      {
        "title": "粘贴 CSV",
        "body": "第一行将作为标题行处理。"
      },
      {
        "title": "安全解析",
        "body": "带引号的字段、转义引号和逗号均正确处理。"
      },
      {
        "title": "复制 JSON",
        "body": "生成整洁的对象数组，可直接用于代码。"
      }
    ]
  },
  "deep-link": {
    "ar": [
      {
        "title": "اضبط صفحة الاحتياط",
        "body": "الصفحة التي تُفتح على سطح المكتب أو عند عدم تثبيت التطبيق."
      },
      {
        "title": "أضف روابط التطبيق",
        "body": "روابط Deep-link لـ iOS و/أو Android أو روابط المتجر."
      },
      {
        "title": "شارك رابطًا واحدًا",
        "body": "يوجّه كل زائر إلى المكان المناسب."
      }
    ],
    "cs": [
      {
        "title": "Nastavte záložní webovou adresu",
        "body": "Stránka, která se otevře na desktopu nebo pokud aplikace není nainstalována."
      },
      {
        "title": "Přidejte URL aplikací",
        "body": "Vaše iOS a/nebo Android hluboké odkazy nebo URL obchodu s aplikacemi."
      },
      {
        "title": "Sdílejte jeden odkaz",
        "body": "Každého návštěvníka přesměruje na správné místo."
      }
    ],
    "de": [
      {
        "title": "Web-Fallback festlegen",
        "body": "Die Seite, die auf dem Desktop oder ohne installierte App geöffnet wird."
      },
      {
        "title": "App-URLs hinzufügen",
        "body": "iOS- und/oder Android-Deep-Link oder Store-URLs."
      },
      {
        "title": "Einen Link teilen",
        "body": "Er führt jeden Besucher an den richtigen Ort."
      }
    ],
    "es": [
      {
        "title": "Configura el destino web alternativo",
        "body": "La página que se abrirá en escritorio o si la app no está instalada."
      },
      {
        "title": "Añade las URLs de la app",
        "body": "Tu deep-link de iOS y/o Android o las URLs de la tienda."
      },
      {
        "title": "Comparte un solo enlace",
        "body": "Redirige a cada visitante al lugar correcto."
      }
    ],
    "fr": [
      {
        "title": "Définissez une page de secours web",
        "body": "La page à ouvrir sur ordinateur ou si l'application n'est pas installée."
      },
      {
        "title": "Ajoutez les URLs applicatives",
        "body": "Vos deep-links iOS et/ou Android ou URLs de boutique."
      },
      {
        "title": "Partagez un seul lien",
        "body": "Il redirige chaque visiteur au bon endroit."
      }
    ],
    "hi": [
      {
        "title": "वेब फॉलबैक सेट करें",
        "body": "डेस्कटॉप पर या ऐप इंस्टॉल न होने पर खुलने वाला पेज।"
      },
      {
        "title": "ऐप URLs जोड़ें",
        "body": "आपके iOS और/या Android डीप-लिंक या स्टोर URLs।"
      },
      {
        "title": "एक लिंक शेयर करें",
        "body": "यह हर विज़िटर को सही जगह भेजता है।"
      }
    ],
    "id": [
      {
        "title": "Atur fallback web",
        "body": "Halaman yang dibuka di desktop atau jika aplikasi belum terpasang."
      },
      {
        "title": "Tambahkan URL aplikasi",
        "body": "Deep link iOS dan/atau Android atau URL toko kamu."
      },
      {
        "title": "Bagikan satu tautan",
        "body": "Tautan mengarahkan setiap pengunjung ke tempat yang tepat."
      }
    ],
    "it": [
      {
        "title": "Imposta un fallback web",
        "body": "La pagina da aprire su desktop o se l'app non è installata."
      },
      {
        "title": "Aggiungi gli URL dell'app",
        "body": "I tuoi deep link o URL dello store per iOS e/o Android."
      },
      {
        "title": "Condividi un solo link",
        "body": "Instrada ogni visitatore nel posto giusto."
      }
    ],
    "ja": [
      {
        "title": "Webフォールバックを設定",
        "body": "デスクトップやアプリ未インストール時に開くページ。"
      },
      {
        "title": "アプリのURLを追加",
        "body": "iOS および/または Android のディープリンクまたはストアURL。"
      },
      {
        "title": "リンクを1つ共有",
        "body": "訪問者ごとに適切な場所へルーティング。"
      }
    ],
    "ko": [
      {
        "title": "웹 폴백 설정",
        "body": "앱이 설치되지 않았거나 데스크톱에서 열릴 페이지."
      },
      {
        "title": "앱 URL 추가",
        "body": "iOS 및/또는 Android 딥링크 또는 스토어 URL."
      },
      {
        "title": "링크 하나 공유",
        "body": "각 방문자를 적합한 곳으로 자동 연결합니다."
      }
    ],
    "nl": [
      {
        "title": "Stel een webfallback in",
        "body": "De pagina die op desktop of zonder geïnstalleerde app wordt geopend."
      },
      {
        "title": "Voeg app-URL's toe",
        "body": "Je iOS- en/of Android-deep-link of store-URL's."
      },
      {
        "title": "Deel één link",
        "body": "Hij stuurt elke bezoeker naar de juiste bestemming."
      }
    ],
    "pl": [
      {
        "title": "Ustaw adres fallback",
        "body": "Strona, która otworzy się na komputerze lub gdy aplikacja nie jest zainstalowana."
      },
      {
        "title": "Dodaj adresy URL aplikacji",
        "body": "Twoje deep-linki lub adresy sklepów na iOS i/lub Android."
      },
      {
        "title": "Udostępnij jeden link",
        "body": "Kieruje każdego odwiedzającego we właściwe miejsce."
      }
    ],
    "pt": [
      {
        "title": "Defina um fallback web",
        "body": "A página a abrir em desktop ou quando a app não está instalada."
      },
      {
        "title": "Adicione URLs de app",
        "body": "Os seus deep-links iOS e/ou Android ou URLs da loja."
      },
      {
        "title": "Partilhe um único link",
        "body": "Ele encaminha cada visitante para o lugar certo."
      }
    ],
    "ru": [
      {
        "title": "Задайте запасной URL",
        "body": "Страница, которая откроется на компьютере или если приложение не установлено."
      },
      {
        "title": "Добавьте URL приложений",
        "body": "Ваши deep-link или ссылки на магазины для iOS и/или Android."
      },
      {
        "title": "Поделитесь одной ссылкой",
        "body": "Она направит каждого пользователя в нужное место."
      }
    ],
    "sv": [
      {
        "title": "Ange en webbfallback",
        "body": "Sidan som öppnas på dator eller om appen inte är installerad."
      },
      {
        "title": "Lägg till app-URL:er",
        "body": "Dina iOS- och/eller Android-djuplänkar eller butiks-URL:er."
      },
      {
        "title": "Dela en länk",
        "body": "Den skickar varje besökare till rätt ställe."
      }
    ],
    "tr": [
      {
        "title": "Web geri dönüş adresi belirle",
        "body": "Masaüstünde veya uygulama yüklü değilse açılacak sayfa."
      },
      {
        "title": "Uygulama URL'leri ekle",
        "body": "iOS ve/veya Android derin bağlantısı ya da mağaza URL'leri."
      },
      {
        "title": "Tek bağlantı paylaş",
        "body": "Her ziyaretçiyi doğru yere yönlendirir."
      }
    ],
    "uk": [
      {
        "title": "Задайте резервний вебпосилання",
        "body": "Сторінка для відкриття на десктопі або якщо застосунок не встановлено."
      },
      {
        "title": "Додайте URL застосунків",
        "body": "Посилання deep-link або посилання на магазин для iOS та/або Android."
      },
      {
        "title": "Поширте одне посилання",
        "body": "Воно спрямовує кожного відвідувача в потрібне місце."
      }
    ],
    "vi": [
      {
        "title": "Đặt trang dự phòng",
        "body": "Trang mở trên máy tính hoặc khi ứng dụng chưa cài đặt."
      },
      {
        "title": "Thêm URL ứng dụng",
        "body": "Deep-link hoặc URL cửa hàng cho iOS và/hoặc Android."
      },
      {
        "title": "Chia sẻ một liên kết duy nhất",
        "body": "Tự động chuyển hướng mỗi người dùng đến đúng nơi."
      }
    ],
    "zh": [
      {
        "title": "设置网页回退地址",
        "body": "在桌面端或未安装应用时打开的页面。"
      },
      {
        "title": "添加应用链接",
        "body": "iOS 和/或 Android 的深层链接或应用商店链接。"
      },
      {
        "title": "分享统一链接",
        "body": "自动将每位访客引导至对应的目标页面。"
      }
    ]
  },
  "enhance-image": {
    "ar": [
      {
        "title": "أسقط صورتك",
        "body": "JPG أو PNG أو WebP — تبقى على جهازك."
      },
      {
        "title": "إعدادات افتراضية مضبوطة تلقائيًا",
        "body": "السطوع والتباين والتشبّع مُعدَّة مسبقًا لتحسين نظيف."
      },
      {
        "title": "حمّل",
        "body": "احصل على الصورة المُحسَّنة فورًا."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte obrázek",
        "body": "JPG, PNG nebo WebP — zůstane na vašem zařízení."
      },
      {
        "title": "Automaticky optimalizované výchozí hodnoty",
        "body": "Jas, kontrast a sytost jsou nastaveny pro přirozené vylepšení."
      },
      {
        "title": "Stáhněte",
        "body": "Vylepšený obrázek získáte okamžitě."
      }
    ],
    "de": [
      {
        "title": "Bild ablegen",
        "body": "JPG, PNG oder WebP — bleibt auf deinem Gerät."
      },
      {
        "title": "Automatisch optimierte Voreinstellungen",
        "body": "Helligkeit, Kontrast und Sättigung voreingestellt für ein cleanes Auffrischen."
      },
      {
        "title": "Herunterladen",
        "body": "Das verbesserte Bild sofort erhalten."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu imagen",
        "body": "JPG, PNG o WebP — se queda en tu dispositivo."
      },
      {
        "title": "Ajustes optimizados automáticamente",
        "body": "Brillo, contraste y saturación preconfigurados para un resultado impecable."
      },
      {
        "title": "Descarga",
        "body": "Obtén la imagen mejorada al instante."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre image",
        "body": "JPG, PNG ou WebP — reste sur votre appareil."
      },
      {
        "title": "Réglages automatiques optimisés",
        "body": "Luminosité, contraste et saturation précalibrés pour un rendu impeccable."
      },
      {
        "title": "Téléchargez",
        "body": "Récupérez l'image améliorée instantanément."
      }
    ],
    "hi": [
      {
        "title": "अपनी इमेज डालें",
        "body": "JPG, PNG या WebP — आपके डिवाइस पर रहती है।"
      },
      {
        "title": "ऑटो-ट्यून डिफ़ॉल्ट",
        "body": "ब्राइटनेस, कंट्रास्ट और सैचुरेशन साफ़ सुधार के लिए पहले से सेट।"
      },
      {
        "title": "डाउनलोड करें",
        "body": "बेहतर इमेज तुरंत पाएं।"
      }
    ],
    "id": [
      {
        "title": "Seret gambarmu",
        "body": "JPG, PNG, atau WebP — tetap di perangkatmu."
      },
      {
        "title": "Pengaturan otomatis",
        "body": "Kecerahan, kontras, dan saturasi diatur otomatis untuk tampilan yang lebih segar."
      },
      {
        "title": "Unduh",
        "body": "Dapatkan gambar yang sudah ditingkatkan seketika."
      }
    ],
    "it": [
      {
        "title": "Trascina la tua immagine",
        "body": "JPG, PNG o WebP — rimane sul tuo dispositivo."
      },
      {
        "title": "Impostazioni ottimizzate automaticamente",
        "body": "Luminosità, contrasto e saturazione preimpostati per un miglioramento immediato."
      },
      {
        "title": "Scarica",
        "body": "Ottieni l'immagine migliorata all'istante."
      }
    ],
    "ja": [
      {
        "title": "画像をドロップ",
        "body": "JPG、PNG または WebP。デバイス上に保持されます。"
      },
      {
        "title": "自動チューニング適用済み",
        "body": "明るさ・コントラスト・彩度がきれいな仕上がりに最適化済み。"
      },
      {
        "title": "ダウンロード",
        "body": "補正済み画像を即座に取得。"
      }
    ],
    "ko": [
      {
        "title": "이미지 드롭",
        "body": "JPG, PNG 또는 WebP — 기기에 머무릅니다."
      },
      {
        "title": "자동 최적화 기본값",
        "body": "밝기, 대비, 채도가 자연스럽게 보정됩니다."
      },
      {
        "title": "다운로드",
        "body": "향상된 이미지를 즉시 받으세요."
      }
    ],
    "nl": [
      {
        "title": "Sleep je afbeelding hierheen",
        "body": "JPG, PNG of WebP — blijft op je apparaat."
      },
      {
        "title": "Automatisch afgestelde standaarden",
        "body": "Helderheid, contrast en verzadiging vooraf ingesteld voor een frisse opknapbeurt."
      },
      {
        "title": "Downloaden",
        "body": "Ontvang de verbeterde afbeelding direct."
      }
    ],
    "pl": [
      {
        "title": "Upuść swój obraz",
        "body": "JPG, PNG lub WebP — zostaje na Twoim urządzeniu."
      },
      {
        "title": "Automatyczne ustawienia",
        "body": "Jasność, kontrast i nasycenie dobrane z góry dla czystej poprawy."
      },
      {
        "title": "Pobierz",
        "body": "Ulepszone zdjęcie dostępne od razu."
      }
    ],
    "pt": [
      {
        "title": "Arraste a sua imagem",
        "body": "JPG, PNG ou WebP — fica no seu dispositivo."
      },
      {
        "title": "Ajustes automáticos otimizados",
        "body": "Brilho, contraste e saturação pré-definidos para um realce equilibrado."
      },
      {
        "title": "Baixe",
        "body": "Obtenha a imagem melhorada instantaneamente."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPG, PNG или WebP — остаётся на вашем устройстве."
      },
      {
        "title": "Автонастройка",
        "body": "Яркость, контраст и насыщенность уже оптимально настроены для лучшего результата."
      },
      {
        "title": "Скачайте",
        "body": "Получите улучшенное изображение мгновенно."
      }
    ],
    "sv": [
      {
        "title": "Släpp din bild",
        "body": "JPG, PNG eller WebP — stannar på din enhet."
      },
      {
        "title": "Automatiskt inställda standardvärden",
        "body": "Ljusstyrka, kontrast och mättnad förinställda för ett rent lyft."
      },
      {
        "title": "Ladda ned",
        "body": "Få den förbättrade bilden direkt."
      }
    ],
    "tr": [
      {
        "title": "Görselini bırak",
        "body": "JPG, PNG veya WebP — cihazında kalır."
      },
      {
        "title": "Otomatik ayarlanmış varsayılanlar",
        "body": "Parlaklık, kontrast ve doygunluk temiz bir iyileştirme için önceden ayarlanmış."
      },
      {
        "title": "İndir",
        "body": "Geliştirilmiş görseli hemen al."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPG, PNG або WebP — залишається на пристрої."
      },
      {
        "title": "Автоналаштування",
        "body": "Яскравість, контраст і насиченість попередньо налаштовані для чистого підняття якості."
      },
      {
        "title": "Завантажте",
        "body": "Отримайте покращене зображення миттєво."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh vào đây",
        "body": "JPG, PNG hoặc WebP — ở lại trên thiết bị của bạn."
      },
      {
        "title": "Cài đặt tự động tối ưu",
        "body": "Độ sáng, độ tương phản và độ bão hòa được đặt sẵn để làm đẹp ảnh."
      },
      {
        "title": "Tải xuống",
        "body": "Nhận ảnh đã cải thiện ngay lập tức."
      }
    ],
    "zh": [
      {
        "title": "拖入图片",
        "body": "支持 JPG、PNG 或 WebP，文件保留在本地设备。"
      },
      {
        "title": "智能默认参数",
        "body": "亮度、对比度和饱和度预设，让图片焕然一新。"
      },
      {
        "title": "下载",
        "body": "即时获取增强后的图片。"
      }
    ]
  },
  "excel-to-json": {
    "ar": [
      {
        "title": "ارفع جدول البيانات",
        "body": ".xls أو .xlsx."
      },
      {
        "title": "اختر الورقة والشكل",
        "body": "مصفوفة من الكائنات (بترويسات) أو صفوف خام."
      },
      {
        "title": "انسخ JSON",
        "body": "أو حمّله."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte tabulku",
        "body": ".xls nebo .xlsx."
      },
      {
        "title": "Vyberte list a strukturu",
        "body": "Pole objektů (se záhlavím) nebo surové řádky."
      },
      {
        "title": "Zkopírujte JSON",
        "body": "Nebo stáhněte."
      }
    ],
    "de": [
      {
        "title": "Tabelle hochladen",
        "body": ".xls oder .xlsx."
      },
      {
        "title": "Tabellenblatt und Format wählen",
        "body": "Array von Objekten (mit Headern) oder rohe Zeilen."
      },
      {
        "title": "JSON kopieren",
        "body": "Oder herunterladen."
      }
    ],
    "es": [
      {
        "title": "Sube tu hoja de cálculo",
        "body": ".xls o .xlsx."
      },
      {
        "title": "Elige la hoja y la estructura",
        "body": "Array de objetos (con cabeceras) o filas en bruto."
      },
      {
        "title": "Copia el JSON",
        "body": "O descárgalo."
      }
    ],
    "fr": [
      {
        "title": "Importez votre feuille de calcul",
        "body": ".xls ou .xlsx."
      },
      {
        "title": "Choisissez la feuille et la structure",
        "body": "Tableau d'objets (avec en-têtes) ou lignes brutes."
      },
      {
        "title": "Copiez le JSON",
        "body": "Ou téléchargez-le."
      }
    ],
    "hi": [
      {
        "title": "अपनी स्प्रेडशीट अपलोड करें",
        "body": ".xls या .xlsx।"
      },
      {
        "title": "शीट और शेप चुनें",
        "body": "ऑब्जेक्ट्स का अरे (हेडर) या रॉ पंक्तियां।"
      },
      {
        "title": "JSON कॉपी करें",
        "body": "या डाउनलोड करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah spreadsheet kamu",
        "body": ".xls atau .xlsx."
      },
      {
        "title": "Pilih sheet dan bentuk data",
        "body": "Array objek (dengan header) atau baris mentah."
      },
      {
        "title": "Salin JSON",
        "body": "Atau unduh."
      }
    ],
    "it": [
      {
        "title": "Carica il tuo foglio di calcolo",
        "body": ".xls o .xlsx."
      },
      {
        "title": "Scegli foglio e struttura",
        "body": "Array di oggetti (con intestazioni) o righe grezze."
      },
      {
        "title": "Copia il JSON",
        "body": "Oppure scaricalo."
      }
    ],
    "ja": [
      {
        "title": "スプレッドシートをアップロード",
        "body": ".xls または .xlsx。"
      },
      {
        "title": "シートと形式を選択",
        "body": "オブジェクトの配列（ヘッダー付き）または生データ行。"
      },
      {
        "title": "JSONをコピー",
        "body": "またはダウンロード。"
      }
    ],
    "ko": [
      {
        "title": "스프레드시트 업로드",
        "body": ".xls 또는 .xlsx."
      },
      {
        "title": "시트 및 형태 선택",
        "body": "헤더 기반 객체 배열 또는 원시 행 데이터."
      },
      {
        "title": "JSON 복사",
        "body": "또는 다운로드하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload je spreadsheet",
        "body": ".xls of .xlsx."
      },
      {
        "title": "Kies een blad en vorm",
        "body": "Array van objecten (met headers) of ruwe rijen."
      },
      {
        "title": "Kopieer de JSON",
        "body": "Of download hem."
      }
    ],
    "pl": [
      {
        "title": "Prześlij arkusz kalkulacyjny",
        "body": "Plik .xls lub .xlsx."
      },
      {
        "title": "Wybierz arkusz i kształt danych",
        "body": "Tablica obiektów (z nagłówkami) lub surowe wiersze."
      },
      {
        "title": "Skopiuj JSON",
        "body": "Lub pobierz go."
      }
    ],
    "pt": [
      {
        "title": "Carregue a sua folha de cálculo",
        "body": ".xls ou .xlsx."
      },
      {
        "title": "Escolha a folha e o formato",
        "body": "Array de objetos (com cabeçalhos) ou linhas brutas."
      },
      {
        "title": "Copie o JSON",
        "body": "Ou baixe-o."
      }
    ],
    "ru": [
      {
        "title": "Загрузите таблицу",
        "body": ".xls или .xlsx."
      },
      {
        "title": "Выберите лист и структуру",
        "body": "Массив объектов с заголовками или необработанные строки."
      },
      {
        "title": "Скопируйте JSON",
        "body": "Или скачайте."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp ditt kalkylblad",
        "body": ".xls eller .xlsx."
      },
      {
        "title": "Välj ark och form",
        "body": "Array av objekt (rubriker) eller råa rader."
      },
      {
        "title": "Kopiera JSON:en",
        "body": "Eller ladda ned den."
      }
    ],
    "tr": [
      {
        "title": "Tabloyu yükle",
        "body": ".xls veya .xlsx."
      },
      {
        "title": "Sayfa ve şekil seç",
        "body": "Nesne dizisi (başlıklar) veya ham satırlar."
      },
      {
        "title": "JSON'u kopyala",
        "body": "Ya da indir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте таблицю",
        "body": ".xls або .xlsx."
      },
      {
        "title": "Оберіть аркуш і структуру",
        "body": "Масив обʼєктів (із заголовками) або необроблені рядки."
      },
      {
        "title": "Скопіюйте JSON",
        "body": "Або завантажте файл."
      }
    ],
    "vi": [
      {
        "title": "Tải bảng tính lên",
        "body": ".xls hoặc .xlsx."
      },
      {
        "title": "Chọn sheet và cấu trúc",
        "body": "Mảng đối tượng (có tiêu đề) hoặc các hàng thô."
      },
      {
        "title": "Sao chép JSON",
        "body": "Hoặc tải xuống."
      }
    ],
    "zh": [
      {
        "title": "上传表格文件",
        "body": "支持 .xls 或 .xlsx 格式。"
      },
      {
        "title": "选择工作表和数据结构",
        "body": "对象数组（含标题行）或原始行数据。"
      },
      {
        "title": "复制 JSON",
        "body": "或直接下载。"
      }
    ]
  },
  "extract-colors": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "أي تنسيق شائع."
      },
      {
        "title": "نأخذ عينات البكسل",
        "body": "الألوان السائدة مرتبة حسب التكرار."
      },
      {
        "title": "انسخ القيم",
        "body": "HEX وRGB وHSL — نقرة واحدة لكل منها."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "Libovolný běžný formát."
      },
      {
        "title": "Vzorkujeme pixely",
        "body": "Dominantní barvy seřazené podle četnosti."
      },
      {
        "title": "Zkopírujte hodnoty",
        "body": "HEX, RGB a HSL — každou jedním klikem."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "Jedes gängige Format."
      },
      {
        "title": "Wir analysieren die Pixel",
        "body": "Dominante Farben, nach Häufigkeit sortiert."
      },
      {
        "title": "Werte kopieren",
        "body": "HEX, RGB und HSL — je mit einem Klick."
      }
    ],
    "es": [
      {
        "title": "Sube una imagen",
        "body": "Cualquier formato habitual."
      },
      {
        "title": "Analizamos los píxeles",
        "body": "Colores predominantes, ordenados por frecuencia."
      },
      {
        "title": "Copia los valores",
        "body": "HEX, RGB y HSL — con un solo clic."
      }
    ],
    "fr": [
      {
        "title": "Importez une image",
        "body": "N'importe quel format courant."
      },
      {
        "title": "Nous analysons les pixels",
        "body": "Couleurs dominantes, classées par fréquence."
      },
      {
        "title": "Copiez les valeurs",
        "body": "HEX, RGB et HSL — un clic chacune."
      }
    ],
    "hi": [
      {
        "title": "एक इमेज अपलोड करें",
        "body": "कोई भी सामान्य फॉर्मेट।"
      },
      {
        "title": "हम पिक्सल सैंपल करते हैं",
        "body": "आवृत्ति के अनुसार क्रमबद्ध प्रमुख रंग।"
      },
      {
        "title": "वैल्यू कॉपी करें",
        "body": "HEX, RGB और HSL — एक क्लिक में।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambar",
        "body": "Format umum apa pun."
      },
      {
        "title": "Kami mengambil sampel piksel",
        "body": "Warna dominan, diurutkan berdasarkan frekuensi."
      },
      {
        "title": "Salin nilainya",
        "body": "HEX, RGB, dan HSL — satu klik masing-masing."
      }
    ],
    "it": [
      {
        "title": "Carica un'immagine",
        "body": "Qualsiasi formato comune."
      },
      {
        "title": "Analizziamo i pixel",
        "body": "Colori dominanti, ordinati per frequenza."
      },
      {
        "title": "Copia i valori",
        "body": "HEX, RGB e HSL — un clic per ciascuno."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "一般的な形式に対応。"
      },
      {
        "title": "ピクセルをサンプリング",
        "body": "頻度順にランク付けされたドミナントカラーを抽出。"
      },
      {
        "title": "値をコピー",
        "body": "HEX・RGB・HSL — ワンクリックでコピー。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "일반적인 모든 형식 지원."
      },
      {
        "title": "픽셀 샘플링",
        "body": "빈도 순으로 정렬된 주요 색상."
      },
      {
        "title": "값 복사",
        "body": "HEX, RGB, HSL — 각각 한 번에 복사."
      }
    ],
    "nl": [
      {
        "title": "Upload een afbeelding",
        "body": "Elk gangbaar formaat."
      },
      {
        "title": "We bemonsteren de pixels",
        "body": "Dominante kleuren, gerangschikt op frequentie."
      },
      {
        "title": "Kopieer de waarden",
        "body": "HEX, RGB en HSL — met één klik elk."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "Dowolny popularny format."
      },
      {
        "title": "Próbkujemy piksele",
        "body": "Dominujące kolory posortowane według częstości."
      },
      {
        "title": "Skopiuj wartości",
        "body": "HEX, RGB i HSL — jedno kliknięcie dla każdego."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma imagem",
        "body": "Qualquer formato comum."
      },
      {
        "title": "Analisamos os pixels",
        "body": "Cores dominantes, ordenadas por frequência."
      },
      {
        "title": "Copie os valores",
        "body": "HEX, RGB e HSL — um clique para cada."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "Любой распространённый формат."
      },
      {
        "title": "Анализируем пиксели",
        "body": "Основные цвета, отсортированные по частоте."
      },
      {
        "title": "Скопируйте значения",
        "body": "HEX, RGB и HSL — одним кликом каждый."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en bild",
        "body": "Vilket vanligt format som helst."
      },
      {
        "title": "Vi samplar pixlarna",
        "body": "Dominerande färger, rankade efter frekvens."
      },
      {
        "title": "Kopiera värdena",
        "body": "HEX, RGB och HSL — ett klick var."
      }
    ],
    "tr": [
      {
        "title": "Görsel yükle",
        "body": "Yaygın herhangi bir format."
      },
      {
        "title": "Pikselleri örnekliyoruz",
        "body": "Baskın renkler, sıklığa göre sıralanmış."
      },
      {
        "title": "Değerleri kopyala",
        "body": "HEX, RGB ve HSL — her biri tek tıkla."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "Будь-який поширений формат."
      },
      {
        "title": "Ми аналізуємо пікселі",
        "body": "Домінуючі кольори, відсортовані за частотою."
      },
      {
        "title": "Скопіюйте значення",
        "body": "HEX, RGB і HSL — одним кліком кожен."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "Bất kỳ định dạng phổ biến nào."
      },
      {
        "title": "Phân tích điểm ảnh",
        "body": "Màu chủ đạo, xếp hạng theo tần suất xuất hiện."
      },
      {
        "title": "Sao chép giá trị màu",
        "body": "HEX, RGB và HSL — mỗi loại một cú nhấp."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "支持常见图片格式。"
      },
      {
        "title": "像素采样分析",
        "body": "提取主色调，按出现频率排序。"
      },
      {
        "title": "复制颜色值",
        "body": "HEX、RGB 和 HSL 格式，一键复制。"
      }
    ]
  },
  "extract-subtitles": {
    "ar": [
      {
        "title": "ارفع الفيديو",
        "body": "MKV وMP4 وMOV وWebM — أي شيء يحتوي مسارات مضمّنة."
      },
      {
        "title": "اختر المسارات",
        "body": "نعرض كل مسار ترجمة مع لغته وترميزه."
      },
      {
        "title": "حمّل ملفات SRT",
        "body": "كل مسار مُصدَّر كملف .srt نظيف."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte video",
        "body": "MKV, MP4, MOV, WebM — cokoli s vloženými stopami."
      },
      {
        "title": "Vyberte stopy",
        "body": "Zobrazíme každou titulkovou stopu s jejím jazykem a kodekem."
      },
      {
        "title": "Stáhněte SRT soubory",
        "body": "Každá stopa exportována jako čistý soubor .srt."
      }
    ],
    "de": [
      {
        "title": "Video hochladen",
        "body": "MKV, MP4, MOV, WebM — alles mit eingebetteten Spuren."
      },
      {
        "title": "Spuren auswählen",
        "body": "Alle Untertitelspuren werden mit Sprache und Codec aufgelistet."
      },
      {
        "title": "SRTs herunterladen",
        "body": "Jede Spur als saubere .srt-Datei exportiert."
      }
    ],
    "es": [
      {
        "title": "Sube el vídeo",
        "body": "MKV, MP4, MOV, WebM — cualquier formato con pistas incrustadas."
      },
      {
        "title": "Selecciona las pistas",
        "body": "Listamos cada pista de subtítulos con su idioma y códec."
      },
      {
        "title": "Descarga los SRTs",
        "body": "Cada pista exportada como un archivo .srt limpio."
      }
    ],
    "fr": [
      {
        "title": "Importez la vidéo",
        "body": "MKV, MP4, MOV, WebM — tout fichier avec des pistes intégrées."
      },
      {
        "title": "Sélectionnez les pistes",
        "body": "Nous listons chaque piste de sous-titres avec sa langue et son codec."
      },
      {
        "title": "Téléchargez les SRT",
        "body": "Chaque piste exportée sous forme de fichier .srt propre."
      }
    ],
    "hi": [
      {
        "title": "वीडियो अपलोड करें",
        "body": "MKV, MP4, MOV, WebM — एम्बेडेड ट्रैक वाली कोई भी फ़ाइल।"
      },
      {
        "title": "ट्रैक चुनें",
        "body": "हम हर सबटाइटल ट्रैक को उसकी भाषा और कोडेक के साथ सूचीबद्ध करते हैं।"
      },
      {
        "title": "SRT डाउनलोड करें",
        "body": "हर ट्रैक एक साफ़ .srt फ़ाइल के रूप में एक्सपोर्ट होता है।"
      }
    ],
    "id": [
      {
        "title": "Unggah video",
        "body": "MKV, MP4, MOV, WebM — apa saja yang memiliki trek tertanam."
      },
      {
        "title": "Pilih trek",
        "body": "Kami menampilkan setiap trek subtitle beserta bahasa dan kodeknya."
      },
      {
        "title": "Unduh SRT",
        "body": "Setiap trek diekspor sebagai file .srt yang bersih."
      }
    ],
    "it": [
      {
        "title": "Carica il video",
        "body": "MKV, MP4, MOV, WebM — qualsiasi file con tracce incorporate."
      },
      {
        "title": "Seleziona le tracce",
        "body": "Elenchiamo ogni traccia di sottotitoli con lingua e codec."
      },
      {
        "title": "Scarica i file SRT",
        "body": "Ogni traccia esportata come file .srt pulito."
      }
    ],
    "ja": [
      {
        "title": "動画をアップロード",
        "body": "MKV、MP4、MOV、WebM など、埋め込みトラックのある形式に対応。"
      },
      {
        "title": "トラックを選択",
        "body": "言語とコーデック付きで全字幕トラックを一覧表示。"
      },
      {
        "title": "SRT をダウンロード",
        "body": "各トラックをクリーンな .srt ファイルとしてエクスポート。"
      }
    ],
    "ko": [
      {
        "title": "동영상 업로드",
        "body": "MKV, MP4, MOV, WebM 등 자막 트랙이 내장된 모든 형식."
      },
      {
        "title": "트랙 선택",
        "body": "언어와 코덱 정보와 함께 모든 자막 트랙이 나열됩니다."
      },
      {
        "title": "SRT 다운로드",
        "body": "각 트랙이 깔끔한 .srt 파일로 추출됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload de video",
        "body": "MKV, MP4, MOV, WebM — alles met ingebedde sporen."
      },
      {
        "title": "Kies de sporen",
        "body": "We tonen elk ondertitelspoor met taal en codec."
      },
      {
        "title": "Download SRTs",
        "body": "Elk spoor geëxporteerd als een netjes .srt-bestand."
      }
    ],
    "pl": [
      {
        "title": "Prześlij wideo",
        "body": "MKV, MP4, MOV, WebM — wszystko z osadzonymi ścieżkami napisów."
      },
      {
        "title": "Wybierz ścieżki",
        "body": "Listujemy każdą ścieżkę napisów z językiem i kodekiem."
      },
      {
        "title": "Pobierz pliki SRT",
        "body": "Każda ścieżka wyeksportowana jako osobny, czysty plik .srt."
      }
    ],
    "pt": [
      {
        "title": "Carregue o vídeo",
        "body": "MKV, MP4, MOV, WebM — qualquer ficheiro com faixas incorporadas."
      },
      {
        "title": "Selecione as faixas",
        "body": "Listamos todas as faixas de legendas com idioma e codec."
      },
      {
        "title": "Baixe os SRTs",
        "body": "Cada faixa exportada como um ficheiro .srt limpo."
      }
    ],
    "ru": [
      {
        "title": "Загрузите видео",
        "body": "MKV, MP4, MOV, WebM — любой файл со встроенными дорожками."
      },
      {
        "title": "Выберите дорожки",
        "body": "Отображаются все субтитровые дорожки с языком и кодеком."
      },
      {
        "title": "Скачайте SRT",
        "body": "Каждая дорожка экспортируется в отдельный .srt-файл."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp videon",
        "body": "MKV, MP4, MOV, WebM — vad som helst med inbäddade spår."
      },
      {
        "title": "Välj spår",
        "body": "Vi listar alla undertextspår med språk och codec."
      },
      {
        "title": "Ladda ned SRT-filer",
        "body": "Varje spår exporterat som en ren .srt-fil."
      }
    ],
    "tr": [
      {
        "title": "Videoyu yükle",
        "body": "MKV, MP4, MOV, WebM — gömülü parçası olan her şey."
      },
      {
        "title": "Parçaları seç",
        "body": "Her altyazı parçasını dili ve kodekiyle birlikte listeleriz."
      },
      {
        "title": "SRT dosyalarını indir",
        "body": "Her parça temiz bir .srt olarak dışa aktarılır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте відео",
        "body": "MKV, MP4, MOV, WebM — будь-який формат із вбудованими доріжками."
      },
      {
        "title": "Оберіть доріжки",
        "body": "Ми покажемо всі субтитрові доріжки з мовою та кодеком."
      },
      {
        "title": "Завантажте SRT",
        "body": "Кожна доріжка експортується як окремий .srt файл."
      }
    ],
    "vi": [
      {
        "title": "Tải video lên",
        "body": "MKV, MP4, MOV, WebM — bất kỳ định dạng nào có track nhúng sẵn."
      },
      {
        "title": "Chọn track cần trích xuất",
        "body": "Chúng tôi liệt kê đầy đủ các track phụ đề kèm ngôn ngữ và codec."
      },
      {
        "title": "Tải xuống file SRT",
        "body": "Mỗi track được xuất thành một file .srt riêng biệt."
      }
    ],
    "zh": [
      {
        "title": "上传视频",
        "body": "支持 MKV、MP4、MOV、WebM 等含内嵌字幕轨道的格式。"
      },
      {
        "title": "选择轨道",
        "body": "列出所有字幕轨道，包含语言和编码信息。"
      },
      {
        "title": "下载 SRT 文件",
        "body": "每条轨道均导出为整洁的 .srt 文件。"
      }
    ]
  },
  "extract-zip": {
    "ar": [
      {
        "title": "ارفع ملف ZIP",
        "body": "يظل أرشيفك على جهازك."
      },
      {
        "title": "نعرض كل الملفات",
        "body": "تصفّح واختر ما تحتاجه."
      },
      {
        "title": "حمّل الملفات",
        "body": "واحدًا تلو الآخر — بلا رحلة إلى الخادم."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte ZIP",
        "body": "Archiv zůstane na vašem zařízení."
      },
      {
        "title": "Zobrazíme každý soubor",
        "body": "Procházejte a vyberte, co potřebujete."
      },
      {
        "title": "Stáhněte soubory",
        "body": "Jeden po druhém — bez odesílání na server."
      }
    ],
    "de": [
      {
        "title": "ZIP hochladen",
        "body": "Dein Archiv bleibt auf deinem Gerät."
      },
      {
        "title": "Wir listen alle Dateien auf",
        "body": "Durchsuchen und auswählen, was du brauchst."
      },
      {
        "title": "Dateien herunterladen",
        "body": "Einzeln — kein Serverroundtrip."
      }
    ],
    "es": [
      {
        "title": "Sube el ZIP",
        "body": "Tu archivo permanece en tu dispositivo."
      },
      {
        "title": "Listamos todos los archivos",
        "body": "Navega y selecciona lo que necesites."
      },
      {
        "title": "Descarga los archivos",
        "body": "Uno a uno — sin pasar por ningún servidor."
      }
    ],
    "fr": [
      {
        "title": "Importez un ZIP",
        "body": "Votre archive reste sur votre appareil."
      },
      {
        "title": "Nous listons chaque fichier",
        "body": "Parcourez et sélectionnez ce dont vous avez besoin."
      },
      {
        "title": "Téléchargez les fichiers",
        "body": "Un par un — sans aller-retour serveur."
      }
    ],
    "hi": [
      {
        "title": "ZIP अपलोड करें",
        "body": "आपका आर्काइव आपके डिवाइस पर रहता है।"
      },
      {
        "title": "हम हर फ़ाइल सूचीबद्ध करते हैं",
        "body": "ब्राउज़ करें और जो चाहिए वो चुनें।"
      },
      {
        "title": "फ़ाइलें डाउनलोड करें",
        "body": "एक-एक करके — कोई सर्वर राउंडट्रिप नहीं।"
      }
    ],
    "id": [
      {
        "title": "Unggah ZIP",
        "body": "Arsip kamu tetap di perangkatmu."
      },
      {
        "title": "Kami menampilkan setiap file",
        "body": "Telusuri dan pilih yang kamu butuhkan."
      },
      {
        "title": "Unduh file",
        "body": "Satu per satu — tanpa perjalanan ke server."
      }
    ],
    "it": [
      {
        "title": "Carica un archivio ZIP",
        "body": "L'archivio rimane sul tuo dispositivo."
      },
      {
        "title": "Elenchiamo ogni file",
        "body": "Sfoglia e scegli quello che ti serve."
      },
      {
        "title": "Scarica i file",
        "body": "Uno alla volta — nessun trasferimento verso il server."
      }
    ],
    "ja": [
      {
        "title": "ZIPをアップロード",
        "body": "アーカイブはデバイス上に保持されます。"
      },
      {
        "title": "全ファイルを一覧表示",
        "body": "内容を確認して必要なファイルを選択。"
      },
      {
        "title": "ファイルをダウンロード",
        "body": "1ファイルずつ取り出せます。サーバー往復なし。"
      }
    ],
    "ko": [
      {
        "title": "ZIP 업로드",
        "body": "압축 파일이 기기에 머무릅니다."
      },
      {
        "title": "모든 파일 목록 확인",
        "body": "내용을 탐색하고 필요한 파일을 선택하세요."
      },
      {
        "title": "파일 다운로드",
        "body": "하나씩 — 서버 왕복 없이."
      }
    ],
    "nl": [
      {
        "title": "Upload een ZIP",
        "body": "Je archief blijft op je apparaat."
      },
      {
        "title": "We tonen elk bestand",
        "body": "Blader en kies wat je nodig hebt."
      },
      {
        "title": "Bestanden downloaden",
        "body": "Eén voor één — zonder serveromweg."
      }
    ],
    "pl": [
      {
        "title": "Prześlij archiwum ZIP",
        "body": "Twoje archiwum pozostaje na Twoim urządzeniu."
      },
      {
        "title": "Listujemy każdy plik",
        "body": "Przeglądaj i wybierz to, czego potrzebujesz."
      },
      {
        "title": "Pobierz pliki",
        "body": "Jeden po drugim — bez wysyłania na serwer."
      }
    ],
    "pt": [
      {
        "title": "Carregue um ZIP",
        "body": "O seu arquivo fica no seu dispositivo."
      },
      {
        "title": "Listamos todos os ficheiros",
        "body": "Navegue e selecione o que precisa."
      },
      {
        "title": "Baixe os ficheiros",
        "body": "Um a um — sem viagem ao servidor."
      }
    ],
    "ru": [
      {
        "title": "Загрузите ZIP",
        "body": "Архив остаётся на вашем устройстве."
      },
      {
        "title": "Просматриваем содержимое",
        "body": "Выбирайте нужные файлы из списка."
      },
      {
        "title": "Скачайте файлы",
        "body": "По одному — без обращения к серверу."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en ZIP",
        "body": "Ditt arkiv stannar på din enhet."
      },
      {
        "title": "Vi listar varje fil",
        "body": "Bläddra och välj vad du behöver."
      },
      {
        "title": "Ladda ned filer",
        "body": "En i taget — ingen serveromväg."
      }
    ],
    "tr": [
      {
        "title": "ZIP yükle",
        "body": "Arşivin cihazında kalır."
      },
      {
        "title": "Her dosyayı listeliyoruz",
        "body": "Göz at ve ihtiyacın olanı seç."
      },
      {
        "title": "Dosyaları indir",
        "body": "Teker teker — sunucu gidip gelmesi yok."
      }
    ],
    "uk": [
      {
        "title": "Завантажте ZIP",
        "body": "Архів залишається на вашому пристрої."
      },
      {
        "title": "Ми показуємо всі файли",
        "body": "Перегляньте і оберіть потрібні."
      },
      {
        "title": "Завантажте файли",
        "body": "По одному — без звернення до сервера."
      }
    ],
    "vi": [
      {
        "title": "Tải lên file ZIP",
        "body": "Archive của bạn ở lại trên thiết bị."
      },
      {
        "title": "Xem danh sách file",
        "body": "Duyệt và chọn những gì bạn cần."
      },
      {
        "title": "Tải xuống file",
        "body": "Từng file một — không cần qua server."
      }
    ],
    "zh": [
      {
        "title": "上传 ZIP 文件",
        "body": "压缩包保留在您的设备上。"
      },
      {
        "title": "浏览文件列表",
        "body": "查看所有文件并选择需要的内容。"
      },
      {
        "title": "下载文件",
        "body": "逐一下载，无需服务器中转。"
      }
    ]
  },
  "file-encryptor": {
    "ar": [
      {
        "title": "اختر الوضع",
        "body": "تشفير لحماية ملف، أو فكّ تشفير لاستعادته."
      },
      {
        "title": "أسقط الملف وكلمة المرور",
        "body": "المفتاح مشتق محليًا عبر PBKDF2-SHA-256 (600 000 تكرار)."
      },
      {
        "title": "حمّل",
        "body": "المخرج المشفَّر باسم filename.enc؛ فكّ التشفير يُعيد الاسم الأصلي."
      }
    ],
    "cs": [
      {
        "title": "Vyberte režim",
        "body": "Šifrovat pro ochranu souboru, nebo dešifrovat pro jeho obnovení."
      },
      {
        "title": "Přetáhněte soubor a zadejte heslo",
        "body": "Klíč se odvozuje lokálně přes PBKDF2-SHA-256 (600 000 iterací)."
      },
      {
        "title": "Stáhněte",
        "body": "Zašifrovaný výstup jako filename.enc; dešifrování obnoví původní název."
      }
    ],
    "de": [
      {
        "title": "Modus wählen",
        "body": "Verschlüsseln zum Schützen oder Entschlüsseln zum Wiederherstellen einer Datei."
      },
      {
        "title": "Datei und Passwort ablegen",
        "body": "Schlüssel wird lokal via PBKDF2-SHA-256 abgeleitet (600.000 Iterationen)."
      },
      {
        "title": "Herunterladen",
        "body": "Verschlüsselte Ausgabe als filename.enc; beim Entschlüsseln wird der Originalname wiederhergestellt."
      }
    ],
    "es": [
      {
        "title": "Elige el modo",
        "body": "Cifrar para proteger un archivo, o Descifrar para recuperarlo."
      },
      {
        "title": "Arrastra el archivo y añade la contraseña",
        "body": "Clave derivada localmente mediante PBKDF2-SHA-256 (600 000 iteraciones)."
      },
      {
        "title": "Descarga",
        "body": "Salida cifrada como filename.enc; el descifrado restaura el nombre original."
      }
    ],
    "fr": [
      {
        "title": "Choisissez un mode",
        "body": "Chiffrez pour protéger un fichier, ou déchiffrez pour en récupérer un."
      },
      {
        "title": "Déposez le fichier et le mot de passe",
        "body": "Clé dérivée localement via PBKDF2-SHA-256 (600 000 itérations)."
      },
      {
        "title": "Téléchargez",
        "body": "Sortie chiffrée sous nom-de-fichier.enc ; le déchiffrement restaure le nom d'origine."
      }
    ],
    "hi": [
      {
        "title": "मोड चुनें",
        "body": "फ़ाइल सुरक्षित करने के लिए Encrypt, या रिकवर करने के लिए Decrypt।"
      },
      {
        "title": "फ़ाइल + पासवर्ड डालें",
        "body": "Key लोकल रूप से PBKDF2-SHA-256 (600,000 iterations) के ज़रिए derive होती है।"
      },
      {
        "title": "डाउनलोड करें",
        "body": "एनक्रिप्टेड आउटपुट filename.enc के रूप में; डिक्रिप्शन मूल नाम वापस लाता है।"
      }
    ],
    "id": [
      {
        "title": "Pilih mode",
        "body": "Enkripsi untuk melindungi file, atau Dekripsi untuk memulihkannya."
      },
      {
        "title": "Seret file + kata sandi",
        "body": "Kunci diturunkan secara lokal melalui PBKDF2-SHA-256 (600.000 iterasi)."
      },
      {
        "title": "Unduh",
        "body": "Keluaran terenkripsi sebagai filename.enc; dekripsi memulihkan nama aslinya."
      }
    ],
    "it": [
      {
        "title": "Scegli una modalità",
        "body": "Cifra per proteggere un file, o Decifra per recuperarlo."
      },
      {
        "title": "Trascina il file e inserisci la password",
        "body": "Chiave derivata in locale tramite PBKDF2-SHA-256 (600 000 iterazioni)."
      },
      {
        "title": "Scarica",
        "body": "Output cifrato come filename.enc; la decifratura ripristina il nome originale."
      }
    ],
    "ja": [
      {
        "title": "モードを選択",
        "body": "暗号化でファイルを保護、復号化でファイルを復元。"
      },
      {
        "title": "ファイルとパスワードをドロップ",
        "body": "PBKDF2-SHA-256（600,000回反復）でローカルにキーを導出。"
      },
      {
        "title": "ダウンロード",
        "body": "暗号化後は filename.enc として出力。復号化すると元のファイル名に戻ります。"
      }
    ],
    "ko": [
      {
        "title": "모드 선택",
        "body": "파일을 보호하려면 암호화, 복원하려면 복호화를 선택하세요."
      },
      {
        "title": "파일 + 비밀번호 드롭",
        "body": "PBKDF2-SHA-256(600,000회 반복)으로 로컬에서 키를 파생합니다."
      },
      {
        "title": "다운로드",
        "body": "암호화된 파일은 filename.enc로 저장되며, 복호화 시 원래 이름이 복원됩니다."
      }
    ],
    "nl": [
      {
        "title": "Kies een modus",
        "body": "Versleutelen om een bestand te beveiligen, of ontsleutelen om het te herstellen."
      },
      {
        "title": "Sleep het bestand + wachtwoord hierheen",
        "body": "Sleutel lokaal afgeleid via PBKDF2-SHA-256 (600 000 iteraties)."
      },
      {
        "title": "Downloaden",
        "body": "Versleutelde uitvoer als filename.enc; ontsleuteling herstelt de oorspronkelijke naam."
      }
    ],
    "pl": [
      {
        "title": "Wybierz tryb",
        "body": "Szyfruj, aby chronić plik, lub Odszyfruj, aby go odtworzyć."
      },
      {
        "title": "Upuść plik i podaj hasło",
        "body": "Klucz wyprowadzany lokalnie przez PBKDF2-SHA-256 (600 000 iteracji)."
      },
      {
        "title": "Pobierz",
        "body": "Zaszyfrowany plik jako filename.enc; odszyfrowanie przywraca oryginalną nazwę."
      }
    ],
    "pt": [
      {
        "title": "Escolha o modo",
        "body": "Cifrar para proteger um ficheiro, ou Decifrar para o recuperar."
      },
      {
        "title": "Arraste o ficheiro + palavra-passe",
        "body": "Chave derivada localmente via PBKDF2-SHA-256 (600 000 iterações)."
      },
      {
        "title": "Baixe",
        "body": "Saída cifrada como filename.enc; a decifração restaura o nome original."
      }
    ],
    "ru": [
      {
        "title": "Выберите режим",
        "body": "Зашифровать файл для защиты или расшифровать для восстановления."
      },
      {
        "title": "Загрузите файл и введите пароль",
        "body": "Ключ формируется локально через PBKDF2-SHA-256 (600 000 итераций)."
      },
      {
        "title": "Скачайте",
        "body": "Зашифрованный файл сохраняется как filename.enc; при расшифровке восстанавливается исходное имя."
      }
    ],
    "sv": [
      {
        "title": "Välj ett läge",
        "body": "Kryptera för att skydda en fil, eller dekryptera för att återställa en."
      },
      {
        "title": "Släpp filen och ange lösenord",
        "body": "Nyckel härleds lokalt via PBKDF2-SHA-256 (600 000 iterationer)."
      },
      {
        "title": "Ladda ned",
        "body": "Krypterad utdata som filnamn.enc; dekryptering återställer det ursprungliga namnet."
      }
    ],
    "tr": [
      {
        "title": "Bir mod seç",
        "body": "Bir dosyayı korumak için Şifrele, kurtarmak için Çöz."
      },
      {
        "title": "Dosyayı ve şifreyi bırak",
        "body": "Anahtar, yerel olarak PBKDF2-SHA-256 ile türetilir (600 000 yineleme)."
      },
      {
        "title": "İndir",
        "body": "Şifreli çıktı filename.enc olarak; çözme işlemi orijinal adı geri yükler."
      }
    ],
    "uk": [
      {
        "title": "Оберіть режим",
        "body": "Шифруйте для захисту файлу або дешифруйте для відновлення."
      },
      {
        "title": "Завантажте файл і введіть пароль",
        "body": "Ключ виводиться локально через PBKDF2-SHA-256 (600 000 ітерацій)."
      },
      {
        "title": "Завантажте",
        "body": "Зашифрований файл — filename.enc; дешифрування відновлює оригінальну назву."
      }
    ],
    "vi": [
      {
        "title": "Chọn chế độ",
        "body": "Mã hóa để bảo vệ file, hoặc giải mã để khôi phục."
      },
      {
        "title": "Thả file và nhập mật khẩu",
        "body": "Khóa được tạo cục bộ qua PBKDF2-SHA-256 (600 000 vòng lặp)."
      },
      {
        "title": "Tải xuống",
        "body": "File mã hóa có tên filename.enc; giải mã sẽ khôi phục tên gốc."
      }
    ],
    "zh": [
      {
        "title": "选择模式",
        "body": "加密以保护文件，或解密以恢复文件。"
      },
      {
        "title": "拖入文件并输入密码",
        "body": "通过 PBKDF2-SHA-256（600,000 次迭代）在本地派生密钥。"
      },
      {
        "title": "下载",
        "body": "加密输出为 filename.enc；解密后自动恢复原始文件名。"
      }
    ]
  },
  "fill-pdf-form": {
    "ar": [
      {
        "title": "ارفع PDF قابلًا للملء",
        "body": "أي شيء يحتوي حقول AcroForm — نماذج IRS أو المدرسة أو الطلبات…"
      },
      {
        "title": "ملء الحقول",
        "body": "النصوص وخانات الاختيار وأزرار الراديو والقوائم المنسدلة تُكتشف تلقائيًا."
      },
      {
        "title": "حمّل (مُسطَّح أو قابل للتحرير)",
        "body": "بدّل التسطيح لتثبيت القيم في PDF."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte vyplnitelné PDF",
        "body": "Cokoli s poli AcroForm — formuláře IRS, školní, přihlášky…"
      },
      {
        "title": "Vyplňte pole",
        "body": "Textová pole, zaškrtávací políčka, přepínače a rozbalovací seznamy jsou detekovány automaticky."
      },
      {
        "title": "Stáhněte (sloučené nebo upravitelné)",
        "body": "Přepněte sloučení pro trvalé uzamčení hodnot do PDF."
      }
    ],
    "de": [
      {
        "title": "Ausfüllbares PDF hochladen",
        "body": "Alles mit AcroForm-Feldern — Steuerformulare, Schul- und Bewerbungsformulare …"
      },
      {
        "title": "Felder ausfüllen",
        "body": "Textfelder, Checkboxen, Optionsfelder und Dropdowns werden automatisch erkannt."
      },
      {
        "title": "Herunterladen (geglättet oder bearbeitbar)",
        "body": "Glätten aktivieren, um die Werte dauerhaft ins PDF einzubetten."
      }
    ],
    "es": [
      {
        "title": "Sube un PDF rellenable",
        "body": "Cualquier formulario con campos AcroForm — IRS, escolar, solicitudes…"
      },
      {
        "title": "Rellena los campos",
        "body": "Texto, casillas, botones de radio y menús desplegables se detectan automáticamente."
      },
      {
        "title": "Descarga (aplanado o editable)",
        "body": "Activa el aplanado para bloquear los valores en el PDF."
      }
    ],
    "fr": [
      {
        "title": "Importez un PDF à remplir",
        "body": "Tout fichier avec des champs AcroForm — formulaires IRS, scolaires, administratifs…"
      },
      {
        "title": "Remplissez les champs",
        "body": "Textes, cases à cocher, boutons radio et listes déroulantes détectés automatiquement."
      },
      {
        "title": "Téléchargez (aplati ou modifiable)",
        "body": "Activez l'aplatissement pour verrouiller les valeurs dans le PDF."
      }
    ],
    "hi": [
      {
        "title": "भरने योग्य PDF अपलोड करें",
        "body": "AcroForm फील्ड वाला कुछ भी — IRS, स्कूल, आवेदन फॉर्म…"
      },
      {
        "title": "फील्ड भरें",
        "body": "टेक्स्ट, चेकबॉक्स, रेडियो और ड्रॉपडाउन अपने आप पहचाने जाते हैं।"
      },
      {
        "title": "डाउनलोड करें (फ्लैटेन्ड या एडिट करने योग्य)",
        "body": "PDF में वैल्यू लॉक करने के लिए फ्लैटेन टॉगल करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah PDF yang bisa diisi",
        "body": "Apa pun dengan kolom AcroForm — IRS, sekolah, formulir aplikasi…"
      },
      {
        "title": "Isi kolom-kolomnya",
        "body": "Teks, kotak centang, radio, dan dropdown terdeteksi otomatis."
      },
      {
        "title": "Unduh (diratakan atau bisa diedit)",
        "body": "Aktifkan flatten untuk mengunci nilai ke dalam PDF."
      }
    ],
    "it": [
      {
        "title": "Carica un PDF compilabile",
        "body": "Qualsiasi documento con campi AcroForm — moduli IRS, scolastici, di candidatura…"
      },
      {
        "title": "Compila i campi",
        "body": "Testo, caselle di controllo, radio button e menu a discesa vengono rilevati automaticamente."
      },
      {
        "title": "Scarica (appiattito o modificabile)",
        "body": "Attiva l'opzione di appiattimento per bloccare i valori nel PDF."
      }
    ],
    "ja": [
      {
        "title": "入力可能なPDFをアップロード",
        "body": "AcroFormフィールドがあるもの — IRS・学校・申請書など。"
      },
      {
        "title": "フィールドを入力",
        "body": "テキスト・チェックボックス・ラジオボタン・ドロップダウンを自動検出。"
      },
      {
        "title": "ダウンロード（フラット化または編集可能）",
        "body": "フラット化をオンにするとPDFに値が固定されます。"
      }
    ],
    "ko": [
      {
        "title": "작성 가능한 PDF 업로드",
        "body": "AcroForm 필드가 있는 모든 양식 — IRS, 학교, 신청서 등."
      },
      {
        "title": "필드 작성",
        "body": "텍스트, 체크박스, 라디오, 드롭다운이 자동으로 감지됩니다."
      },
      {
        "title": "다운로드 (플래튼 또는 편집 가능)",
        "body": "플래튼 옵션을 켜면 값이 PDF에 고정됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload een invulbaar PDF-formulier",
        "body": "Alles met AcroForm-velden — belasting-, school- en aanvraagformulieren…"
      },
      {
        "title": "Vul de velden in",
        "body": "Tekst, selectievakjes, keuzerondjes en vervolgkeuzelijsten worden automatisch herkend."
      },
      {
        "title": "Download (afgevlakt of bewerkbaar)",
        "body": "Schakel afvlakken in om de waarden permanent in de PDF te vergrendelen."
      }
    ],
    "pl": [
      {
        "title": "Prześlij wypełnialny PDF",
        "body": "Z polami AcroForm — formularze IRS, szkolne, aplikacyjne…"
      },
      {
        "title": "Wypełnij pola",
        "body": "Pola tekstowe, pola wyboru, przyciski radiowe i listy rozwijane są wykrywane automatycznie."
      },
      {
        "title": "Pobierz (spłaszczony lub edytowalny)",
        "body": "Przełącz spłaszczanie, aby trwale wbudować wartości w PDF."
      }
    ],
    "pt": [
      {
        "title": "Carregue um PDF preenchível",
        "body": "Qualquer formulário com campos AcroForm — IRS, escola, candidaturas…"
      },
      {
        "title": "Preencha os campos",
        "body": "Texto, caixas de seleção, botões de opção e menus são detetados automaticamente."
      },
      {
        "title": "Baixe (achatado ou editável)",
        "body": "Ative o achatamento para bloquear os valores no PDF."
      }
    ],
    "ru": [
      {
        "title": "Загрузите заполняемый PDF",
        "body": "Любой файл с полями AcroForm — налоговые, учебные, заявительные формы…"
      },
      {
        "title": "Заполните поля",
        "body": "Текстовые поля, флажки, переключатели и выпадающие списки распознаются автоматически."
      },
      {
        "title": "Скачайте (сплющенный или редактируемый)",
        "body": "Включите сплющивание, чтобы зафиксировать значения в PDF."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en ifyllbar PDF",
        "body": "Vad som helst med AcroForm-fält — IRS, skola, ansökningsformulär…"
      },
      {
        "title": "Fyll i fälten",
        "body": "Text, kryssrutor, radioknappar och rullgardinsmenyer identifieras automatiskt."
      },
      {
        "title": "Ladda ned (tillplattad eller redigerbar)",
        "body": "Växla tillplattning för att låsa värdena i PDF:en."
      }
    ],
    "tr": [
      {
        "title": "Doldurulabilir PDF yükle",
        "body": "AcroForm alanlarına sahip her şey — IRS, okul, başvuru formları..."
      },
      {
        "title": "Alanları doldur",
        "body": "Metin, onay kutuları, radyo düğmeleri ve açılır listeler otomatik algılanır."
      },
      {
        "title": "İndir (düzleştirilmiş veya düzenlenebilir)",
        "body": "Değerleri PDF'e kilitlemek için düzleştirmeyi aç."
      }
    ],
    "uk": [
      {
        "title": "Завантажте заповнювану форму PDF",
        "body": "Будь-яка з полями AcroForm — форми IRS, шкільні, заявкові…"
      },
      {
        "title": "Заповніть поля",
        "body": "Текстові поля, прапорці, перемикачі та випадні списки визначаються автоматично."
      },
      {
        "title": "Завантажте (сплющений або редагований)",
        "body": "Увімкніть сплющення, щоб заблокувати значення у PDF."
      }
    ],
    "vi": [
      {
        "title": "Tải lên PDF có thể điền",
        "body": "Bất kỳ tài liệu có trường AcroForm — IRS, trường học, mẫu đơn đăng ký…"
      },
      {
        "title": "Điền vào các trường",
        "body": "Văn bản, hộp kiểm, nút radio và danh sách thả xuống được phát hiện tự động."
      },
      {
        "title": "Tải xuống (làm phẳng hoặc giữ chỉnh sửa)",
        "body": "Bật làm phẳng để khóa các giá trị vào PDF."
      }
    ],
    "zh": [
      {
        "title": "上传可填写的 PDF",
        "body": "含 AcroForm 字段的 PDF 均可——IRS 表格、学校表格、申请表等。"
      },
      {
        "title": "填写字段",
        "body": "自动检测文本框、复选框、单选框和下拉菜单。"
      },
      {
        "title": "下载（扁平化或可编辑）",
        "body": "开启扁平化可将填写内容永久锁入 PDF。"
      }
    ]
  },
  "flip-image": {
    "ar": [
      {
        "title": "ارفع صورتك",
        "body": "JPG أو PNG أو WebP — تبقى على جهازك."
      },
      {
        "title": "اختر الاتجاه",
        "body": "أفقي أو رأسي أو كليهما."
      },
      {
        "title": "حمّل النتيجة",
        "body": "نفس التنسيق، نفس الجودة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "JPG, PNG nebo WebP — zůstane na vašem zařízení."
      },
      {
        "title": "Vyberte směr",
        "body": "Vodorovně, svisle, nebo obojí."
      },
      {
        "title": "Stáhněte výsledek",
        "body": "Stejný formát, stejná kvalita."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "JPG, PNG oder WebP — bleibt auf deinem Gerät."
      },
      {
        "title": "Richtung wählen",
        "body": "Horizontal, vertikal oder beides."
      },
      {
        "title": "Ergebnis herunterladen",
        "body": "Gleiches Format, gleiche Qualität."
      }
    ],
    "es": [
      {
        "title": "Sube tu imagen",
        "body": "JPG, PNG o WebP — se queda en tu dispositivo."
      },
      {
        "title": "Elige la dirección",
        "body": "Horizontal, vertical o ambas."
      },
      {
        "title": "Descarga el resultado",
        "body": "Mismo formato, misma calidad."
      }
    ],
    "fr": [
      {
        "title": "Importez votre image",
        "body": "JPG, PNG ou WebP — reste sur votre appareil."
      },
      {
        "title": "Choisissez un sens",
        "body": "Horizontale, verticale, ou les deux."
      },
      {
        "title": "Téléchargez le résultat",
        "body": "Même format, même qualité."
      }
    ],
    "hi": [
      {
        "title": "अपनी इमेज अपलोड करें",
        "body": "JPG, PNG या WebP — आपके डिवाइस पर रहती है।"
      },
      {
        "title": "दिशा चुनें",
        "body": "हॉरिज़ॉन्टल, वर्टिकल, या दोनों।"
      },
      {
        "title": "परिणाम डाउनलोड करें",
        "body": "वही फॉर्मेट, वही क्वालिटी।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambarmu",
        "body": "JPG, PNG, atau WebP — tetap di perangkatmu."
      },
      {
        "title": "Pilih arah",
        "body": "Horizontal, vertikal, atau keduanya."
      },
      {
        "title": "Unduh hasilnya",
        "body": "Format sama, kualitas sama."
      }
    ],
    "it": [
      {
        "title": "Carica la tua immagine",
        "body": "JPG, PNG o WebP — rimane sul tuo dispositivo."
      },
      {
        "title": "Scegli una direzione",
        "body": "Orizzontale, verticale, o entrambe."
      },
      {
        "title": "Scarica il risultato",
        "body": "Stesso formato, stessa qualità."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "JPG、PNG または WebP。デバイス上に保持されます。"
      },
      {
        "title": "方向を選択",
        "body": "水平・垂直、または両方。"
      },
      {
        "title": "結果をダウンロード",
        "body": "同じ形式・同じ品質で出力。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "JPG, PNG 또는 WebP — 기기에 머무릅니다."
      },
      {
        "title": "방향 선택",
        "body": "좌우, 상하, 또는 둘 다."
      },
      {
        "title": "결과 다운로드",
        "body": "형식과 품질이 그대로 유지됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload je afbeelding",
        "body": "JPG, PNG of WebP — blijft op je apparaat."
      },
      {
        "title": "Kies een richting",
        "body": "Horizontaal, verticaal of beide."
      },
      {
        "title": "Download het resultaat",
        "body": "Zelfde formaat, zelfde kwaliteit."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "JPG, PNG lub WebP — zostaje na Twoim urządzeniu."
      },
      {
        "title": "Wybierz kierunek",
        "body": "Poziomo, pionowo lub w obu kierunkach."
      },
      {
        "title": "Pobierz wynik",
        "body": "Ten sam format, ta sama jakość."
      }
    ],
    "pt": [
      {
        "title": "Carregue a sua imagem",
        "body": "JPG, PNG ou WebP — fica no seu dispositivo."
      },
      {
        "title": "Escolha a direção",
        "body": "Horizontal, vertical ou ambas."
      },
      {
        "title": "Baixe o resultado",
        "body": "Mesmo formato, mesma qualidade."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPG, PNG или WebP — остаётся на вашем устройстве."
      },
      {
        "title": "Выберите направление",
        "body": "По горизонтали, по вертикали или оба варианта."
      },
      {
        "title": "Скачайте результат",
        "body": "Тот же формат, то же качество."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din bild",
        "body": "JPG, PNG eller WebP — stannar på din enhet."
      },
      {
        "title": "Välj riktning",
        "body": "Horisontellt, vertikalt eller båda."
      },
      {
        "title": "Ladda ned resultatet",
        "body": "Samma format, samma kvalitet."
      }
    ],
    "tr": [
      {
        "title": "Görselini yükle",
        "body": "JPG, PNG veya WebP — cihazında kalır."
      },
      {
        "title": "Yön seç",
        "body": "Yatay, dikey veya her ikisi."
      },
      {
        "title": "Sonucu indir",
        "body": "Aynı format, aynı kalite."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPG, PNG або WebP — залишається на пристрої."
      },
      {
        "title": "Оберіть напрямок",
        "body": "Горизонтально, вертикально або обидва."
      },
      {
        "title": "Завантажте результат",
        "body": "Той самий формат, та сама якість."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "JPG, PNG hoặc WebP — ở lại trên thiết bị của bạn."
      },
      {
        "title": "Chọn chiều lật",
        "body": "Ngang, dọc, hoặc cả hai."
      },
      {
        "title": "Tải xuống kết quả",
        "body": "Cùng định dạng, cùng chất lượng."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "支持 JPG、PNG 或 WebP，文件保留在本地设备。"
      },
      {
        "title": "选择翻转方向",
        "body": "水平、垂直或两者同时。"
      },
      {
        "title": "下载结果",
        "body": "格式和画质保持不变。"
      }
    ]
  },
  "format-json": {
    "ar": [
      {
        "title": "الصق JSON الخاص بك",
        "body": "أسقط أي JSON — صحيح كان أم لا."
      },
      {
        "title": "جمّل أو صغّر",
        "body": "نُنسّق بمسافة بادئة من مسافتين، أو نحذف كل المسافات البيضاء."
      },
      {
        "title": "انسخ أو حمّل",
        "body": "احصل على النتيجة النظيفة كملف .json أو في الحافظة."
      }
    ],
    "cs": [
      {
        "title": "Vložte JSON",
        "body": "Přetáhněte libovolný JSON — platný i neplatný."
      },
      {
        "title": "Zkrášlete nebo minifikujte",
        "body": "Naformátujeme s odsazením 2 mezerami, nebo odstraníme veškeré bílé znaky."
      },
      {
        "title": "Zkopírujte nebo stáhněte",
        "body": "Vezměte čistý výsledek jako soubor .json nebo do schránky."
      }
    ],
    "de": [
      {
        "title": "JSON einfügen",
        "body": "Beliebiges JSON ablegen — valide oder nicht."
      },
      {
        "title": "Formatieren oder minimieren",
        "body": "Wir schreiben es mit 2-Space-Einrückung um oder entfernen jeden Leerraum."
      },
      {
        "title": "Kopieren oder herunterladen",
        "body": "Sauberes Ergebnis als .json-Datei oder in die Zwischenablage."
      }
    ],
    "es": [
      {
        "title": "Pega tu JSON",
        "body": "Cualquier JSON — válido o no."
      },
      {
        "title": "Embellece o minifica",
        "body": "Formateamos con sangría de 2-space o eliminamos todo el espacio en blanco."
      },
      {
        "title": "Copia o descarga",
        "body": "Obtén el resultado limpio como archivo .json o cópialo al portapapeles."
      }
    ],
    "fr": [
      {
        "title": "Collez votre JSON",
        "body": "Déposez n'importe quel JSON — valide ou non."
      },
      {
        "title": "Embellissez ou minifiez",
        "body": "Mise en forme avec indentation 2-space, ou suppression de tous les espaces."
      },
      {
        "title": "Copiez ou téléchargez",
        "body": "Récupérez le résultat propre en fichier .json ou dans le presse-papiers."
      }
    ],
    "hi": [
      {
        "title": "अपना JSON पेस्ट करें",
        "body": "कोई भी JSON डालें — वैलिड हो या न हो।"
      },
      {
        "title": "ब्यूटिफाई या मिनिफाई करें",
        "body": "हम 2-स्पेस इंडेंट के साथ प्रिटी-प्रिंट करते हैं, या सारी व्हाइटस्पेस हटाते हैं।"
      },
      {
        "title": "कॉपी या डाउनलोड करें",
        "body": ".json फ़ाइल के रूप में या क्लिपबोर्ड पर साफ़ परिणाम लें।"
      }
    ],
    "id": [
      {
        "title": "Tempel JSON kamu",
        "body": "Masukkan JSON apa pun — valid atau tidak."
      },
      {
        "title": "Perindah atau perkecil",
        "body": "Kami memformat dengan indentasi 2 spasi, atau menghapus semua spasi."
      },
      {
        "title": "Salin atau unduh",
        "body": "Ambil hasilnya sebagai file .json atau ke clipboard."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo JSON",
        "body": "Inserisci qualsiasi JSON — valido o meno."
      },
      {
        "title": "Formatta o minimizza",
        "body": "Indentiamo con 2-space o rimuoviamo tutti gli spazi bianchi."
      },
      {
        "title": "Copia o scarica",
        "body": "Ottieni il risultato pulito come file .json o copialo negli appunti."
      }
    ],
    "ja": [
      {
        "title": "JSONをペースト",
        "body": "有効・無効問わず、どんな JSON でもOK。"
      },
      {
        "title": "整形または圧縮",
        "body": "2スペースインデントで整形、またはすべての空白を除去。"
      },
      {
        "title": "コピーまたはダウンロード",
        "body": ".json ファイルまたはクリップボードへ。"
      }
    ],
    "ko": [
      {
        "title": "JSON 붙여넣기",
        "body": "유효하지 않은 JSON이라도 괜찮습니다."
      },
      {
        "title": "보기 좋게 또는 최소화",
        "body": "2칸 들여쓰기로 예쁘게 출력하거나, 모든 공백을 제거합니다."
      },
      {
        "title": "복사 또는 다운로드",
        "body": "정리된 결과를 .json 파일로 받거나 클립보드에 복사하세요."
      }
    ],
    "nl": [
      {
        "title": "Plak je JSON",
        "body": "Gooi er willekeurige JSON in — geldig of niet."
      },
      {
        "title": "Mooi opmaken of minificeren",
        "body": "We formatteren met 2-spatie-inspringing, of verwijderen alle witruimte."
      },
      {
        "title": "Kopiëren of downloaden",
        "body": "Neem het nette resultaat als .json-bestand of kopieer het naar je klembord."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój JSON",
        "body": "Wrzuć dowolny JSON — poprawny lub nie."
      },
      {
        "title": "Upiększ lub zminifikuj",
        "body": "Formatujemy z wcięciami 2-spacyjnymi lub usuwamy wszystkie białe znaki."
      },
      {
        "title": "Skopiuj lub pobierz",
        "body": "Pobierz czysty wynik jako plik .json lub skopiuj do schowka."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu JSON",
        "body": "Insira qualquer JSON — válido ou não."
      },
      {
        "title": "Embeleze ou minifique",
        "body": "Formatamos com indentação de 2-space ou removemos todo o espaço em branco."
      },
      {
        "title": "Copie ou baixe",
        "body": "Obtenha o resultado limpo como ficheiro .json ou para a área de transferência."
      }
    ],
    "ru": [
      {
        "title": "Вставьте JSON",
        "body": "Любой JSON — валидный или нет."
      },
      {
        "title": "Форматирование или минификация",
        "body": "Красивое форматирование с отступами в 2 пробела или удаление всех пробелов."
      },
      {
        "title": "Скопируйте или скачайте",
        "body": "Получите результат как .json-файл или скопируйте в буфер обмена."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din JSON",
        "body": "Släpp in valfri JSON — giltig eller inte."
      },
      {
        "title": "Formatera eller minifiera",
        "body": "Vi skriver ut snyggt med 2-stegs indrag, eller tar bort allt blanksteg."
      },
      {
        "title": "Kopiera eller ladda ned",
        "body": "Hämta det rena resultatet som en .json-fil eller till urklipp."
      }
    ],
    "tr": [
      {
        "title": "JSON'unu yapıştır",
        "body": "Geçerli olsun ya da olmasın, herhangi bir JSON bırak."
      },
      {
        "title": "Güzelleştir veya küçült",
        "body": "2 boşluklu girinti ile düzgün biçimlendir ya da tüm boşlukları kaldır."
      },
      {
        "title": "Kopyala veya indir",
        "body": "Temiz sonucu .json dosyası olarak al ya da panoya kopyala."
      }
    ],
    "uk": [
      {
        "title": "Вставте JSON",
        "body": "Будь-який JSON — коректний чи ні."
      },
      {
        "title": "Форматуйте або мініфікуйте",
        "body": "Красивий відступ у 2 пробіли або повне стискання без пробілів."
      },
      {
        "title": "Скопіюйте або завантажте",
        "body": "Отримайте результат як .json файл або в буфер обміну."
      }
    ],
    "vi": [
      {
        "title": "Dán JSON vào đây",
        "body": "Bất kỳ JSON nào — hợp lệ hay không."
      },
      {
        "title": "Làm đẹp hoặc thu gọn",
        "body": "Định dạng chuẩn với 2 khoảng trắng thụt lề, hoặc loại bỏ toàn bộ khoảng trắng."
      },
      {
        "title": "Sao chép hoặc tải xuống",
        "body": "Lấy kết quả sạch dưới dạng file .json hoặc sao chép vào clipboard."
      }
    ],
    "zh": [
      {
        "title": "粘贴 JSON",
        "body": "任意 JSON 均可，有效或无效的都支持。"
      },
      {
        "title": "美化或压缩",
        "body": "以 2 个空格缩进格式化，或去除所有空白字符。"
      },
      {
        "title": "复制或下载",
        "body": "将整洁的结果保存为 .json 文件，或复制到剪贴板。"
      }
    ]
  },
  "format-sql": {
    "ar": [
      {
        "title": "الصق SQL الخاص بك",
        "body": "SELECT أو INSERT أو UPDATE أو DELETE."
      },
      {
        "title": "نسّقه",
        "body": "تحصل الجمل الرئيسية على سطورها الخاصة والكلمات المفتاحية تُكتب بأحرف كبيرة."
      },
      {
        "title": "انسخ النتيجة",
        "body": "SQL مقروء للمراجعات والتوثيق."
      }
    ],
    "cs": [
      {
        "title": "Vložte SQL",
        "body": "SELECT, INSERT, UPDATE nebo DELETE."
      },
      {
        "title": "Naformátujte",
        "body": "Hlavní klauzule dostanou vlastní řádky; klíčová slova se zapíší verzálkami."
      },
      {
        "title": "Zkopírujte výsledek",
        "body": "Čitelné SQL pro revize a dokumentaci."
      }
    ],
    "de": [
      {
        "title": "SQL einfügen",
        "body": "Ein SELECT, INSERT, UPDATE oder DELETE."
      },
      {
        "title": "Formatieren",
        "body": "Hauptklauseln erhalten eigene Zeilen; Schlüsselwörter werden großgeschrieben."
      },
      {
        "title": "Ergebnis kopieren",
        "body": "Lesbares SQL für Reviews und Dokumentation."
      }
    ],
    "es": [
      {
        "title": "Pega tu SQL",
        "body": "Un SELECT, INSERT, UPDATE o DELETE."
      },
      {
        "title": "Formátalo",
        "body": "Las cláusulas principales van en líneas separadas; palabras clave en mayúsculas."
      },
      {
        "title": "Copia el resultado",
        "body": "SQL legible para revisiones y documentación."
      }
    ],
    "fr": [
      {
        "title": "Collez votre SQL",
        "body": "Un SELECT, INSERT, UPDATE ou DELETE."
      },
      {
        "title": "Formatez-le",
        "body": "Les grandes clauses ont chacune leur ligne ; les mots-clés en majuscules."
      },
      {
        "title": "Copiez le résultat",
        "body": "Un SQL lisible pour les revues de code et la documentation."
      }
    ],
    "hi": [
      {
        "title": "अपना SQL पेस्ट करें",
        "body": "SELECT, INSERT, UPDATE या DELETE।"
      },
      {
        "title": "फ़ॉर्मेट करें",
        "body": "प्रमुख क्लॉज़ को अपनी लाइन मिलती है; keywords कैपिटलाइज़ होते हैं।"
      },
      {
        "title": "परिणाम कॉपी करें",
        "body": "रिव्यू और डॉक्स के लिए पठनीय SQL।"
      }
    ],
    "id": [
      {
        "title": "Tempel SQL kamu",
        "body": "Pernyataan SELECT, INSERT, UPDATE, atau DELETE."
      },
      {
        "title": "Format",
        "body": "Klausa utama mendapat baris sendiri; kata kunci ditulis kapital."
      },
      {
        "title": "Salin hasilnya",
        "body": "SQL yang mudah dibaca untuk tinjauan dan dokumentasi."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo SQL",
        "body": "Un SELECT, INSERT, UPDATE o DELETE."
      },
      {
        "title": "Formatta",
        "body": "Le clausole principali vanno su righe proprie; le parole chiave vengono capitalizzate."
      },
      {
        "title": "Copia il risultato",
        "body": "SQL leggibile per revisioni e documentazione."
      }
    ],
    "ja": [
      {
        "title": "SQLをペースト",
        "body": "SELECT、INSERT、UPDATE、DELETE に対応。"
      },
      {
        "title": "フォーマットする",
        "body": "主要な句を個別の行に分け、キーワードを大文字化。"
      },
      {
        "title": "結果をコピー",
        "body": "レビューやドキュメント向けの読みやすい SQL。"
      }
    ],
    "ko": [
      {
        "title": "SQL 붙여넣기",
        "body": "SELECT, INSERT, UPDATE 또는 DELETE."
      },
      {
        "title": "포맷 적용",
        "body": "주요 절이 각자의 줄에 배치되고, 키워드가 대문자로 변환됩니다."
      },
      {
        "title": "결과 복사",
        "body": "검토와 문서화에 적합한 가독성 높은 SQL."
      }
    ],
    "nl": [
      {
        "title": "Plak je SQL",
        "body": "Een SELECT, INSERT, UPDATE of DELETE."
      },
      {
        "title": "Opmaken",
        "body": "Hoofdclausules krijgen elk een eigen regel; sleutelwoorden worden met hoofdletters geschreven."
      },
      {
        "title": "Kopieer het resultaat",
        "body": "Leesbare SQL voor codereviews en documentatie."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój SQL",
        "body": "SELECT, INSERT, UPDATE lub DELETE."
      },
      {
        "title": "Sformatuj",
        "body": "Główne klauzule w osobnych wierszach; słowa kluczowe pisane wielkimi literami."
      },
      {
        "title": "Skopiuj wynik",
        "body": "Czytelny SQL do przeglądów kodu i dokumentacji."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu SQL",
        "body": "Um SELECT, INSERT, UPDATE ou DELETE."
      },
      {
        "title": "Formate",
        "body": "As cláusulas principais ficam em linhas próprias; palavras-chave em maiúsculas."
      },
      {
        "title": "Copie o resultado",
        "body": "SQL legível para revisões e documentação."
      }
    ],
    "ru": [
      {
        "title": "Вставьте SQL",
        "body": "SELECT, INSERT, UPDATE или DELETE."
      },
      {
        "title": "Форматирование",
        "body": "Основные конструкции — на отдельных строках, ключевые слова с заглавной буквы."
      },
      {
        "title": "Скопируйте результат",
        "body": "Читаемый SQL для ревью и документации."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din SQL",
        "body": "En SELECT, INSERT, UPDATE eller DELETE."
      },
      {
        "title": "Formatera den",
        "body": "Huvudklausuler får egna rader; nyckelord skrivs med versaler."
      },
      {
        "title": "Kopiera resultatet",
        "body": "Lättläst SQL för granskningar och dokumentation."
      }
    ],
    "tr": [
      {
        "title": "SQL'ini yapıştır",
        "body": "SELECT, INSERT, UPDATE veya DELETE."
      },
      {
        "title": "Biçimlendir",
        "body": "Ana cümleler kendi satırlarına alınır; anahtar kelimeler büyük harfe çevrilir."
      },
      {
        "title": "Sonucu kopyala",
        "body": "İnceleme ve belgeler için okunabilir SQL."
      }
    ],
    "uk": [
      {
        "title": "Вставте SQL",
        "body": "SELECT, INSERT, UPDATE або DELETE."
      },
      {
        "title": "Форматуйте",
        "body": "Основні клаузи на окремих рядках; ключові слова у верхньому регістрі."
      },
      {
        "title": "Скопіюйте результат",
        "body": "Читабельний SQL для рев'ю та документації."
      }
    ],
    "vi": [
      {
        "title": "Dán SQL vào đây",
        "body": "SELECT, INSERT, UPDATE hoặc DELETE đều được."
      },
      {
        "title": "Định dạng lại",
        "body": "Mỗi mệnh đề chính trên dòng riêng; từ khóa viết hoa."
      },
      {
        "title": "Sao chép kết quả",
        "body": "SQL dễ đọc, dùng cho review và tài liệu."
      }
    ],
    "zh": [
      {
        "title": "粘贴 SQL",
        "body": "支持 SELECT、INSERT、UPDATE 或 DELETE 语句。"
      },
      {
        "title": "格式化",
        "body": "主要子句单独成行，关键字自动大写。"
      },
      {
        "title": "复制结果",
        "body": "可读性强，便于代码审查和文档编写。"
      }
    ]
  },
  "handwriting-to-text": {
    "ar": [
      {
        "title": "ارفع صورة واضحة",
        "body": "الإضاءة الجيدة والتباين يُساعدان كثيرًا."
      },
      {
        "title": "الذكاء الاصطناعي يقرأها سطرًا بسطر",
        "body": "المقاطع غير المقروءة تُعلَّم ولا تُخمَّن."
      },
      {
        "title": "انسخ أو حمّل",
        "body": "احصل على .txt نظيف للنص المكتوب."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte ostrý snímek",
        "body": "Dobré osvětlení a kontrast velmi pomáhají."
      },
      {
        "title": "AI přečte řádek po řádku",
        "body": "Nečitelné pasáže jsou označeny, nikoli domýšleny."
      },
      {
        "title": "Zkopírujte nebo stáhněte",
        "body": "Získáte čistý .txt soubor s přepisem."
      }
    ],
    "de": [
      {
        "title": "Klares Foto hochladen",
        "body": "Gute Beleuchtung und Kontrast helfen erheblich."
      },
      {
        "title": "KI liest es Zeile für Zeile",
        "body": "Unleserliche Stellen werden gekennzeichnet, nicht geraten."
      },
      {
        "title": "Kopieren oder herunterladen",
        "body": "Sauberes .txt-Transkript erhalten."
      }
    ],
    "es": [
      {
        "title": "Sube una foto nítida",
        "body": "Una buena iluminación y contraste ayudan mucho."
      },
      {
        "title": "La IA lo lee línea a línea",
        "body": "Los fragmentos ilegibles se marcan, no se inventan."
      },
      {
        "title": "Copia o descarga",
        "body": "Obtén un .txt limpio con la transcripción."
      }
    ],
    "fr": [
      {
        "title": "Importez une photo nette",
        "body": "Un bon éclairage et un bon contraste aident beaucoup."
      },
      {
        "title": "L'IA lit ligne par ligne",
        "body": "Les passages illisibles sont signalés, pas inventés."
      },
      {
        "title": "Copiez ou téléchargez",
        "body": "Obtenez une transcription propre en .txt."
      }
    ],
    "hi": [
      {
        "title": "स्पष्ट फोटो अपलोड करें",
        "body": "अच्छी रोशनी और कंट्रास्ट से काफी मदद मिलती है।"
      },
      {
        "title": "AI इसे लाइन दर लाइन पढ़ता है",
        "body": "अस्पष्ट अंश टैग किए जाते हैं, अनुमान नहीं लगाए जाते।"
      },
      {
        "title": "कॉपी या डाउनलोड करें",
        "body": "ट्रांसक्रिप्शन का एक साफ़ .txt पाएं।"
      }
    ],
    "id": [
      {
        "title": "Unggah foto yang jelas",
        "body": "Pencahayaan dan kontras yang baik sangat membantu."
      },
      {
        "title": "AI membaca baris per baris",
        "body": "Bagian yang tidak terbaca ditandai, bukan ditebak."
      },
      {
        "title": "Salin atau unduh",
        "body": "Dapatkan file .txt bersih dari hasil transkripsi."
      }
    ],
    "it": [
      {
        "title": "Carica una foto nitida",
        "body": "Una buona illuminazione e un buon contrasto fanno la differenza."
      },
      {
        "title": "L'AI legge riga per riga",
        "body": "I passaggi illeggibili vengono contrassegnati, non inventati."
      },
      {
        "title": "Copia o scarica",
        "body": "Ottieni un file .txt pulito della trascrizione."
      }
    ],
    "ja": [
      {
        "title": "鮮明な写真をアップロード",
        "body": "明るさとコントラストが高いほど精度が上がります。"
      },
      {
        "title": "AIが1行ずつ読み取る",
        "body": "判読不能な箇所はタグ付け。推測はしません。"
      },
      {
        "title": "コピーまたはダウンロード",
        "body": "書き起こしのクリーンな .txt を取得。"
      }
    ],
    "ko": [
      {
        "title": "선명한 사진 업로드",
        "body": "밝은 조명과 높은 대비가 인식률을 높입니다."
      },
      {
        "title": "AI가 줄 단위로 읽습니다",
        "body": "읽기 어려운 부분은 추측하지 않고 태그됩니다."
      },
      {
        "title": "복사 또는 다운로드",
        "body": "깔끔한 .txt 형식의 필기 인식 결과를 받으세요."
      }
    ],
    "nl": [
      {
        "title": "Upload een scherpe foto",
        "body": "Goede belichting en contrast helpen enorm."
      },
      {
        "title": "AI leest het regel voor regel",
        "body": "Onleesbare passages worden getagd, niet geraden."
      },
      {
        "title": "Kopiëren of downloaden",
        "body": "Ontvang een nette .txt van de transcriptie."
      }
    ],
    "pl": [
      {
        "title": "Prześlij wyraźne zdjęcie",
        "body": "Dobre oświetlenie i kontrast bardzo pomagają."
      },
      {
        "title": "AI odczytuje linijka po linijce",
        "body": "Nieczytelne fragmenty są oznaczane, a nie zgadywane."
      },
      {
        "title": "Skopiuj lub pobierz",
        "body": "Czysty plik .txt z transkrypcją."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma foto nítida",
        "body": "Boa iluminação e contraste ajudam muito."
      },
      {
        "title": "A IA lê linha a linha",
        "body": "Passagens ilegíveis são sinalizadas, não inventadas."
      },
      {
        "title": "Copie ou baixe",
        "body": "Obtenha um .txt limpo da transcrição."
      }
    ],
    "ru": [
      {
        "title": "Загрузите чёткое фото",
        "body": "Хорошее освещение и контраст сильно помогают."
      },
      {
        "title": "ИИ читает строку за строкой",
        "body": "Неразборчивые фрагменты помечаются, а не угадываются."
      },
      {
        "title": "Скопируйте или скачайте",
        "body": "Получите чистый .txt с транскрипцией."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp ett tydligt foto",
        "body": "Bra ljussättning och kontrast hjälper mycket."
      },
      {
        "title": "AI läser det rad för rad",
        "body": "Oläsliga passager märks, inte gissas."
      },
      {
        "title": "Kopiera eller ladda ned",
        "body": "Få en ren .txt av transkriptionen."
      }
    ],
    "tr": [
      {
        "title": "Net bir fotoğraf yükle",
        "body": "İyi aydınlatma ve kontrast çok yardımcı olur."
      },
      {
        "title": "AI satır satır okuyor",
        "body": "Okunamayan bölümler tahmin edilmez, etiketlenir."
      },
      {
        "title": "Kopyala veya indir",
        "body": "Transkripsiyonun temiz bir .txt dosyasını al."
      }
    ],
    "uk": [
      {
        "title": "Завантажте чітке фото",
        "body": "Гарне освітлення та контраст суттєво допомагають."
      },
      {
        "title": "ШІ читає рядок за рядком",
        "body": "Нерозбірливі фрагменти позначаються, а не вгадуються."
      },
      {
        "title": "Скопіюйте або завантажте",
        "body": "Отримайте чистий .txt транскрипту."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh rõ nét lên",
        "body": "Ánh sáng tốt và độ tương phản cao giúp ích rất nhiều."
      },
      {
        "title": "AI đọc từng dòng",
        "body": "Các đoạn không rõ được gắn nhãn, không đoán mò."
      },
      {
        "title": "Sao chép hoặc tải xuống",
        "body": "Nhận file .txt sạch của bản ghi chép."
      }
    ],
    "zh": [
      {
        "title": "上传清晰照片",
        "body": "良好的光线和对比度有助于提升识别准确率。"
      },
      {
        "title": "AI 逐行识别",
        "body": "无法辨认的内容会标注说明，而非猜测。"
      },
      {
        "title": "复制或下载",
        "body": "获取转录文字的整洁 .txt 文件。"
      }
    ]
  },
  "heic-to-jpg": {
    "ar": [
      {
        "title": "أسقط صورة HEIC",
        "body": "من iPhone أو iPad."
      },
      {
        "title": "اختر الجودة",
        "body": "92 ممتاز للطباعة الفوتوغرافية."
      },
      {
        "title": "حمّل JPG",
        "body": "متوافق عالميًا."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte fotku HEIC",
        "body": "Z iPhonu nebo iPadu."
      },
      {
        "title": "Vyberte kvalitu",
        "body": "92 je skvělé pro tisk fotografií."
      },
      {
        "title": "Stáhněte JPG",
        "body": "Univerzálně kompatibilní."
      }
    ],
    "de": [
      {
        "title": "HEIC-Foto ablegen",
        "body": "Von einem iPhone oder iPad."
      },
      {
        "title": "Qualität wählen",
        "body": "92 ist ideal für Fotodrucke."
      },
      {
        "title": "JPG herunterladen",
        "body": "Universell kompatibel."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu foto HEIC",
        "body": "De un iPhone o iPad."
      },
      {
        "title": "Elige la calidad",
        "body": "92 es perfecto para imprimir fotos."
      },
      {
        "title": "Descarga el JPG",
        "body": "Compatible con cualquier dispositivo."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre photo HEIC",
        "body": "Depuis un iPhone ou un iPad."
      },
      {
        "title": "Choisissez la qualité",
        "body": "92, idéal pour les tirages photo."
      },
      {
        "title": "Téléchargez le JPG",
        "body": "Compatible partout."
      }
    ],
    "hi": [
      {
        "title": "अपनी HEIC फोटो डालें",
        "body": "iPhone या iPad से।"
      },
      {
        "title": "क्वालिटी चुनें",
        "body": "92 फोटो प्रिंट के लिए बेहतरीन है।"
      },
      {
        "title": "JPG डाउनलोड करें",
        "body": "सार्वभौमिक रूप से संगत।"
      }
    ],
    "id": [
      {
        "title": "Seret foto HEIC kamu",
        "body": "Dari iPhone atau iPad."
      },
      {
        "title": "Pilih kualitas",
        "body": "92 sangat baik untuk cetak foto."
      },
      {
        "title": "Unduh JPG",
        "body": "Kompatibel secara universal."
      }
    ],
    "it": [
      {
        "title": "Trascina la tua foto HEIC",
        "body": "Da iPhone o iPad."
      },
      {
        "title": "Scegli la qualità",
        "body": "92 è ottimo per stampe fotografiche."
      },
      {
        "title": "Scarica il JPG",
        "body": "Compatibile con qualsiasi dispositivo."
      }
    ],
    "ja": [
      {
        "title": "HEICフォトをドロップ",
        "body": "iPhoneまたはiPadから転送した写真。"
      },
      {
        "title": "品質を選択",
        "body": "印刷用写真には92が最適。"
      },
      {
        "title": "JPGをダウンロード",
        "body": "あらゆる環境に対応した汎用フォーマット。"
      }
    ],
    "ko": [
      {
        "title": "HEIC 사진 드롭",
        "body": "iPhone 또는 iPad에서 촬영한 사진."
      },
      {
        "title": "품질 선택",
        "body": "92는 사진 인쇄에 이상적입니다."
      },
      {
        "title": "JPG 다운로드",
        "body": "어디서나 호환됩니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep je HEIC-foto hierheen",
        "body": "Van een iPhone of iPad."
      },
      {
        "title": "Kies een kwaliteit",
        "body": "92 is uitstekend voor fotoafdrukken."
      },
      {
        "title": "Download JPG",
        "body": "Universeel compatibel."
      }
    ],
    "pl": [
      {
        "title": "Upuść zdjęcie HEIC",
        "body": "Z iPhone'a lub iPada."
      },
      {
        "title": "Wybierz jakość",
        "body": "92 świetnie sprawdza się do wydruków."
      },
      {
        "title": "Pobierz JPG",
        "body": "Kompatybilny wszędzie."
      }
    ],
    "pt": [
      {
        "title": "Arraste a sua foto HEIC",
        "body": "De um iPhone ou iPad."
      },
      {
        "title": "Escolha a qualidade",
        "body": "92 é excelente para impressões fotográficas."
      },
      {
        "title": "Baixe o JPG",
        "body": "Compatível universalmente."
      }
    ],
    "ru": [
      {
        "title": "Загрузите HEIC-фото",
        "body": "С iPhone или iPad."
      },
      {
        "title": "Выберите качество",
        "body": "92 — отлично подходит для печатных фотографий."
      },
      {
        "title": "Скачайте JPG",
        "body": "Поддерживается повсеместно."
      }
    ],
    "sv": [
      {
        "title": "Släpp ditt HEIC-foto",
        "body": "Från en iPhone eller iPad."
      },
      {
        "title": "Välj kvalitet",
        "body": "92 är utmärkt för fotoutskrifter."
      },
      {
        "title": "Ladda ned JPG",
        "body": "Universellt kompatibel."
      }
    ],
    "tr": [
      {
        "title": "HEIC fotoğrafını bırak",
        "body": "iPhone veya iPad'den."
      },
      {
        "title": "Kalite seç",
        "body": "Baskı kaliteli fotoğraflar için 92 harika bir seçenek."
      },
      {
        "title": "JPG indir",
        "body": "Her yerde desteklenir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте HEIC-фото",
        "body": "З iPhone або iPad."
      },
      {
        "title": "Оберіть якість",
        "body": "92 — відмінно для друку фотографій."
      },
      {
        "title": "Завантажте JPG",
        "body": "Сумісно всюди."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh HEIC vào đây",
        "body": "Từ iPhone hoặc iPad."
      },
      {
        "title": "Chọn chất lượng",
        "body": "92 là lựa chọn tốt cho ảnh in."
      },
      {
        "title": "Tải xuống JPG",
        "body": "Tương thích với mọi nơi."
      }
    ],
    "zh": [
      {
        "title": "拖入 HEIC 照片",
        "body": "来自 iPhone 或 iPad 拍摄的照片。"
      },
      {
        "title": "选择画质",
        "body": "92 非常适合照片打印输出。"
      },
      {
        "title": "下载 JPG",
        "body": "兼容性最广的格式。"
      }
    ]
  },
  "heic-to-png": {
    "ar": [
      {
        "title": "أسقط صورة HEIC",
        "body": "من iPhone أو iPad."
      },
      {
        "title": "انقر تحويل",
        "body": "يُفكّ ترميزه عبر WebAssembly في متصفحك."
      },
      {
        "title": "حمّل PNG",
        "body": "بلا فقدان للجودة، يدعم الشفافية."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte fotku HEIC",
        "body": "Z iPhonu nebo iPadu."
      },
      {
        "title": "Klikněte na převést",
        "body": "Dekódováno přes WebAssembly ve vašem prohlížeči."
      },
      {
        "title": "Stáhněte PNG",
        "body": "Bezztrátové, podporuje průhlednost."
      }
    ],
    "de": [
      {
        "title": "HEIC-Foto ablegen",
        "body": "Von einem iPhone oder iPad."
      },
      {
        "title": "Konvertieren klicken",
        "body": "Wird via WebAssembly im Browser dekodiert."
      },
      {
        "title": "PNG herunterladen",
        "body": "Verlustfrei und transparenzfähig."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu foto HEIC",
        "body": "De un iPhone o iPad."
      },
      {
        "title": "Haz clic en convertir",
        "body": "Decodificado mediante WebAssembly en tu navegador."
      },
      {
        "title": "Descarga el PNG",
        "body": "Sin pérdida de calidad, compatible con transparencia."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre photo HEIC",
        "body": "Depuis un iPhone ou un iPad."
      },
      {
        "title": "Cliquez sur Convertir",
        "body": "Décodé via WebAssembly dans votre navigateur."
      },
      {
        "title": "Téléchargez le PNG",
        "body": "Sans perte, compatible avec la transparence."
      }
    ],
    "hi": [
      {
        "title": "अपनी HEIC फोटो डालें",
        "body": "iPhone या iPad से।"
      },
      {
        "title": "कन्वर्ट पर क्लिक करें",
        "body": "ब्राउज़र में WebAssembly के ज़रिए डीकोड होता है।"
      },
      {
        "title": "PNG डाउनलोड करें",
        "body": "लॉसलेस, ट्रांसपेरेंसी-फ्रेंडली।"
      }
    ],
    "id": [
      {
        "title": "Seret foto HEIC kamu",
        "body": "Dari iPhone atau iPad."
      },
      {
        "title": "Klik konversi",
        "body": "Didekode melalui WebAssembly di browsermu."
      },
      {
        "title": "Unduh PNG",
        "body": "Lossless, mendukung transparansi."
      }
    ],
    "it": [
      {
        "title": "Trascina la tua foto HEIC",
        "body": "Da iPhone o iPad."
      },
      {
        "title": "Clicca su Converti",
        "body": "Decodificato tramite WebAssembly nel tuo browser."
      },
      {
        "title": "Scarica il PNG",
        "body": "Lossless, compatibile con la trasparenza."
      }
    ],
    "ja": [
      {
        "title": "HEICフォトをドロップ",
        "body": "iPhoneまたはiPadから転送した写真。"
      },
      {
        "title": "変換をクリック",
        "body": "ブラウザの WebAssembly でデコード。"
      },
      {
        "title": "PNGをダウンロード",
        "body": "ロスレスで透過にも対応。"
      }
    ],
    "ko": [
      {
        "title": "HEIC 사진 드롭",
        "body": "iPhone 또는 iPad에서 촬영한 사진."
      },
      {
        "title": "변환 클릭",
        "body": "브라우저에서 WebAssembly로 디코딩됩니다."
      },
      {
        "title": "PNG 다운로드",
        "body": "무손실, 투명도 지원."
      }
    ],
    "nl": [
      {
        "title": "Sleep je HEIC-foto hierheen",
        "body": "Van een iPhone of iPad."
      },
      {
        "title": "Klik op converteren",
        "body": "Gedecodeerd via WebAssembly in je browser."
      },
      {
        "title": "Download PNG",
        "body": "Verliesvrij en transparantievriendelijk."
      }
    ],
    "pl": [
      {
        "title": "Upuść zdjęcie HEIC",
        "body": "Z iPhone'a lub iPada."
      },
      {
        "title": "Kliknij Konwertuj",
        "body": "Dekodowane przez WebAssembly w Twojej przeglądarce."
      },
      {
        "title": "Pobierz PNG",
        "body": "Bezstratny, obsługuje przezroczystość."
      }
    ],
    "pt": [
      {
        "title": "Arraste a sua foto HEIC",
        "body": "De um iPhone ou iPad."
      },
      {
        "title": "Clique em converter",
        "body": "Descodificado via WebAssembly no seu browser."
      },
      {
        "title": "Baixe o PNG",
        "body": "Sem perdas, compatível com transparência."
      }
    ],
    "ru": [
      {
        "title": "Загрузите HEIC-фото",
        "body": "С iPhone или iPad."
      },
      {
        "title": "Нажмите «Конвертировать»",
        "body": "Декодирование через WebAssembly прямо в браузере."
      },
      {
        "title": "Скачайте PNG",
        "body": "Без потерь, с поддержкой прозрачности."
      }
    ],
    "sv": [
      {
        "title": "Släpp ditt HEIC-foto",
        "body": "Från en iPhone eller iPad."
      },
      {
        "title": "Klicka konvertera",
        "body": "Avkodas via WebAssembly i din webbläsare."
      },
      {
        "title": "Ladda ned PNG",
        "body": "Förlustfri och transparensvänlig."
      }
    ],
    "tr": [
      {
        "title": "HEIC fotoğrafını bırak",
        "body": "iPhone veya iPad'den."
      },
      {
        "title": "Dönüştür'e tıkla",
        "body": "Tarayıcında WebAssembly ile çözülür."
      },
      {
        "title": "PNG indir",
        "body": "Kayıpsız, şeffaflık destekli."
      }
    ],
    "uk": [
      {
        "title": "Завантажте HEIC-фото",
        "body": "З iPhone або iPad."
      },
      {
        "title": "Натисніть «конвертувати»",
        "body": "Декодування через WebAssembly прямо у браузері."
      },
      {
        "title": "Завантажте PNG",
        "body": "Без втрат, підтримує прозорість."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh HEIC vào đây",
        "body": "Từ iPhone hoặc iPad."
      },
      {
        "title": "Nhấn chuyển đổi",
        "body": "Giải mã qua WebAssembly ngay trong trình duyệt."
      },
      {
        "title": "Tải xuống PNG",
        "body": "Không mất dữ liệu, hỗ trợ nền trong suốt."
      }
    ],
    "zh": [
      {
        "title": "拖入 HEIC 照片",
        "body": "来自 iPhone 或 iPad 拍摄的照片。"
      },
      {
        "title": "点击转换",
        "body": "通过浏览器中的 WebAssembly 解码。"
      },
      {
        "title": "下载 PNG",
        "body": "无损格式，支持透明通道。"
      }
    ]
  },
  "html-to-image": {
    "ar": [
      {
        "title": "الصق HTML الخاص بك",
        "body": "الأنماط المضمّنة تعمل بشكل أفضل."
      },
      {
        "title": "اضبط الحجم والتنسيق",
        "body": "العرض والارتفاع و PNG / JPG."
      },
      {
        "title": "اعرض وحمّل",
        "body": "يتم في متصفحك."
      }
    ],
    "cs": [
      {
        "title": "Vložte HTML",
        "body": "Nejlépe fungují vložené styly."
      },
      {
        "title": "Nastavte velikost a formát",
        "body": "Šířka, výška a PNG / JPG."
      },
      {
        "title": "Vykreslete a stáhněte",
        "body": "Zpracováno ve vašem prohlížeči."
      }
    ],
    "de": [
      {
        "title": "HTML einfügen",
        "body": "Inline-Styles funktionieren am besten."
      },
      {
        "title": "Größe und Format festlegen",
        "body": "Breite, Höhe und PNG / JPG."
      },
      {
        "title": "Rendern und herunterladen",
        "body": "Fertig in deinem Browser."
      }
    ],
    "es": [
      {
        "title": "Pega tu HTML",
        "body": "Los estilos en línea funcionan mejor."
      },
      {
        "title": "Define el tamaño y el formato",
        "body": "Ancho, alto y PNG / JPG."
      },
      {
        "title": "Renderiza y descarga",
        "body": "Todo en tu navegador."
      }
    ],
    "fr": [
      {
        "title": "Collez votre HTML",
        "body": "Les styles en ligne fonctionnent le mieux."
      },
      {
        "title": "Définissez la taille et le format",
        "body": "Largeur, hauteur et PNG / JPG."
      },
      {
        "title": "Rendu et téléchargement",
        "body": "Effectué dans votre navigateur."
      }
    ],
    "hi": [
      {
        "title": "अपना HTML पेस्ट करें",
        "body": "इनलाइन स्टाइल सबसे अच्छे काम करते हैं।"
      },
      {
        "title": "साइज़ और फॉर्मेट सेट करें",
        "body": "चौड़ाई, ऊंचाई और PNG / JPG।"
      },
      {
        "title": "रेंडर करें और डाउनलोड करें",
        "body": "आपके ब्राउज़र में पूरा होता है।"
      }
    ],
    "id": [
      {
        "title": "Tempel HTML kamu",
        "body": "Gaya inline paling ideal."
      },
      {
        "title": "Atur ukuran dan format",
        "body": "Lebar, tinggi, dan PNG / JPG."
      },
      {
        "title": "Render dan unduh",
        "body": "Selesai di browsermu."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo HTML",
        "body": "Gli stili inline funzionano meglio."
      },
      {
        "title": "Imposta dimensioni e formato",
        "body": "Larghezza, altezza e PNG / JPG."
      },
      {
        "title": "Genera e scarica",
        "body": "Tutto nel tuo browser."
      }
    ],
    "ja": [
      {
        "title": "HTMLをペースト",
        "body": "インラインスタイルが最適です。"
      },
      {
        "title": "サイズと形式を設定",
        "body": "幅・高さおよび PNG / JPG を指定。"
      },
      {
        "title": "レンダリングしてダウンロード",
        "body": "ブラウザ上で完結。"
      }
    ],
    "ko": [
      {
        "title": "HTML 붙여넣기",
        "body": "인라인 스타일이 가장 잘 동작합니다."
      },
      {
        "title": "크기 및 형식 설정",
        "body": "가로, 세로, PNG / JPG."
      },
      {
        "title": "렌더링 후 다운로드",
        "body": "브라우저에서 처리됩니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je HTML",
        "body": "Inline stijlen werken het best."
      },
      {
        "title": "Stel grootte en formaat in",
        "body": "Breedte, hoogte en PNG / JPG."
      },
      {
        "title": "Renderen en downloaden",
        "body": "Klaar in je browser."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój HTML",
        "body": "Style inline działają najlepiej."
      },
      {
        "title": "Ustaw rozmiar i format",
        "body": "Szerokość, wysokość oraz PNG lub JPG."
      },
      {
        "title": "Renderuj i pobierz",
        "body": "Gotowe w Twojej przeglądarce."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu HTML",
        "body": "Estilos inline funcionam melhor."
      },
      {
        "title": "Defina o tamanho e o formato",
        "body": "Largura, altura e PNG / JPG."
      },
      {
        "title": "Renderize e baixe",
        "body": "Feito no seu browser."
      }
    ],
    "ru": [
      {
        "title": "Вставьте HTML",
        "body": "Встроенные стили работают лучше всего."
      },
      {
        "title": "Задайте размер и формат",
        "body": "Ширина, высота и PNG / JPG."
      },
      {
        "title": "Рендеринг и скачивание",
        "body": "Выполняется в браузере."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din HTML",
        "body": "Inline-stilar fungerar bäst."
      },
      {
        "title": "Ange storlek och format",
        "body": "Bredd, höjd och PNG / JPG."
      },
      {
        "title": "Rendera och ladda ned",
        "body": "Klart i din webbläsare."
      }
    ],
    "tr": [
      {
        "title": "HTML'ini yapıştır",
        "body": "Satır içi stiller en iyi sonucu verir."
      },
      {
        "title": "Boyut ve format ayarla",
        "body": "Genişlik, yükseklik ve PNG / JPG."
      },
      {
        "title": "İşle ve indir",
        "body": "Tarayıcında tamamlanır."
      }
    ],
    "uk": [
      {
        "title": "Вставте HTML",
        "body": "Вбудовані стилі спрацьовують найкраще."
      },
      {
        "title": "Задайте розмір і формат",
        "body": "Ширина, висота та PNG / JPG."
      },
      {
        "title": "Рендер і завантаження",
        "body": "Виконується у браузері."
      }
    ],
    "vi": [
      {
        "title": "Dán HTML vào đây",
        "body": "Style nội tuyến cho kết quả tốt nhất."
      },
      {
        "title": "Đặt kích thước và định dạng",
        "body": "Chiều rộng, chiều cao và PNG / JPG."
      },
      {
        "title": "Kết xuất và tải xuống",
        "body": "Xử lý ngay trong trình duyệt."
      }
    ],
    "zh": [
      {
        "title": "粘贴 HTML",
        "body": "内联样式效果最佳。"
      },
      {
        "title": "设置尺寸和格式",
        "body": "宽度、高度，以及 PNG 或 JPG 格式。"
      },
      {
        "title": "渲染并下载",
        "body": "在浏览器中完成。"
      }
    ]
  },
  "html-to-markdown": {
    "ar": [
      {
        "title": "الصق HTML الخاص بك",
        "body": "مقتطف أو هيكل مستند كامل."
      },
      {
        "title": "تحويل إلى Markdown",
        "body": "الوسوم الشائعة تُحوَّل إلى Markdown نظيف."
      },
      {
        "title": "انسخ Markdown",
        "body": "جاهز لملف README أو التوثيق."
      }
    ],
    "cs": [
      {
        "title": "Vložte HTML",
        "body": "Fragment nebo celé tělo dokumentu."
      },
      {
        "title": "Převeďte na Markdown",
        "body": "Běžné tagy se převedou na čistý Markdown."
      },
      {
        "title": "Zkopírujte Markdown",
        "body": "Připraveno pro váš README nebo dokumentaci."
      }
    ],
    "de": [
      {
        "title": "HTML einfügen",
        "body": "Ein Ausschnitt oder ein kompletter Dokumentkörper."
      },
      {
        "title": "In Markdown umwandeln",
        "body": "Gängige Tags werden zu sauberem Markdown."
      },
      {
        "title": "Markdown kopieren",
        "body": "Direkt für README oder Dokumentation verwenden."
      }
    ],
    "es": [
      {
        "title": "Pega tu HTML",
        "body": "Un fragmento o el cuerpo completo de un documento."
      },
      {
        "title": "Convierte a Markdown",
        "body": "Las etiquetas más comunes se mapean a Markdown limpio."
      },
      {
        "title": "Copia el Markdown",
        "body": "Listo para tu README o documentación."
      }
    ],
    "fr": [
      {
        "title": "Collez votre HTML",
        "body": "Un extrait ou le corps d'un document complet."
      },
      {
        "title": "Convertissez en Markdown",
        "body": "Les balises courantes sont converties en Markdown propre."
      },
      {
        "title": "Copiez le Markdown",
        "body": "Prêt pour votre README ou votre documentation."
      }
    ],
    "hi": [
      {
        "title": "अपना HTML पेस्ट करें",
        "body": "एक स्निपेट या पूरा डॉक्युमेंट बॉडी।"
      },
      {
        "title": "Markdown में कन्वर्ट करें",
        "body": "सामान्य टैग्स साफ़ Markdown में बदल जाते हैं।"
      },
      {
        "title": "Markdown कॉपी करें",
        "body": "आपके README या डॉक्स के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Tempel HTML kamu",
        "body": "Cuplikan atau seluruh isi dokumen."
      },
      {
        "title": "Konversi ke Markdown",
        "body": "Tag umum dipetakan ke Markdown yang bersih."
      },
      {
        "title": "Salin Markdown",
        "body": "Siap untuk README atau dokumentasi kamu."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo HTML",
        "body": "Un frammento o il body completo di un documento."
      },
      {
        "title": "Converti in Markdown",
        "body": "I tag più comuni si traducono in Markdown pulito."
      },
      {
        "title": "Copia il Markdown",
        "body": "Pronto per il tuo README o la documentazione."
      }
    ],
    "ja": [
      {
        "title": "HTMLをペースト",
        "body": "スニペットでも完全なドキュメント本文でも対応。"
      },
      {
        "title": "Markdown に変換",
        "body": "一般的なタグをクリーンな Markdown にマッピング。"
      },
      {
        "title": "Markdown をコピー",
        "body": "README やドキュメントにすぐ使えます。"
      }
    ],
    "ko": [
      {
        "title": "HTML 붙여넣기",
        "body": "일부 코드 또는 전체 문서 본문."
      },
      {
        "title": "Markdown으로 변환",
        "body": "일반적인 태그가 깔끔한 Markdown으로 변환됩니다."
      },
      {
        "title": "Markdown 복사",
        "body": "README나 문서에 바로 사용하세요."
      }
    ],
    "nl": [
      {
        "title": "Plak je HTML",
        "body": "Een fragment of een volledig documentlichaam."
      },
      {
        "title": "Converteren naar Markdown",
        "body": "Gangbare tags worden nette Markdown."
      },
      {
        "title": "Kopieer de Markdown",
        "body": "Klaar voor je README of documentatie."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój HTML",
        "body": "Fragment lub pełna treść dokumentu."
      },
      {
        "title": "Konwertuj do Markdown",
        "body": "Popularne tagi zamieniają się w czysty Markdown."
      },
      {
        "title": "Skopiuj Markdown",
        "body": "Gotowy do README lub dokumentacji."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu HTML",
        "body": "Um trecho ou o corpo completo de um documento."
      },
      {
        "title": "Converta para Markdown",
        "body": "As tags mais comuns são mapeadas para Markdown limpo."
      },
      {
        "title": "Copie o Markdown",
        "body": "Pronto para o seu README ou documentação."
      }
    ],
    "ru": [
      {
        "title": "Вставьте HTML",
        "body": "Фрагмент или полное тело документа."
      },
      {
        "title": "Конвертация в Markdown",
        "body": "Распространённые теги преобразуются в чистый Markdown."
      },
      {
        "title": "Скопируйте Markdown",
        "body": "Готов для README или документации."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din HTML",
        "body": "Ett utdrag eller ett helt dokumentbody."
      },
      {
        "title": "Konvertera till Markdown",
        "body": "Vanliga taggar mappas till ren Markdown."
      },
      {
        "title": "Kopiera Markdown:en",
        "body": "Redo för din README eller dokumentation."
      }
    ],
    "tr": [
      {
        "title": "HTML'ini yapıştır",
        "body": "Bir parçacık veya tam bir belge gövdesi."
      },
      {
        "title": "Markdown'a dönüştür",
        "body": "Yaygın etiketler temiz Markdown'a dönüşür."
      },
      {
        "title": "Markdown'u kopyala",
        "body": "README dosyan veya belgeler için hazır."
      }
    ],
    "uk": [
      {
        "title": "Вставте HTML",
        "body": "Фрагмент або повне тіло документа."
      },
      {
        "title": "Конвертуйте у Markdown",
        "body": "Поширені теги перетворюються на чистий Markdown."
      },
      {
        "title": "Скопіюйте Markdown",
        "body": "Готово для README або документації."
      }
    ],
    "vi": [
      {
        "title": "Dán HTML vào đây",
        "body": "Một đoạn nhỏ hoặc toàn bộ nội dung trang."
      },
      {
        "title": "Chuyển sang Markdown",
        "body": "Các thẻ phổ biến được chuyển đổi thành Markdown sạch sẽ."
      },
      {
        "title": "Sao chép Markdown",
        "body": "Dùng ngay cho README hoặc tài liệu của bạn."
      }
    ],
    "zh": [
      {
        "title": "粘贴 HTML",
        "body": "片段或完整文档正文均可。"
      },
      {
        "title": "转换为 Markdown",
        "body": "常见标签映射为整洁的 Markdown 语法。"
      },
      {
        "title": "复制 Markdown",
        "body": "可直接用于 README 或文档。"
      }
    ]
  },
  "image-collage": {
    "ar": [
      {
        "title": "أسقط صورك",
        "body": "JPG أو PNG أو WebP — أي عدد."
      },
      {
        "title": "اختر التخطيط",
        "body": "2×1 أو 2×2 أو 3×3 أو شريط."
      },
      {
        "title": "اضبط وصدّر",
        "body": "الفجوة والخلفية والحجم — حمّل كـ PNG."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte fotky",
        "body": "JPG, PNG nebo WebP — libovolný počet."
      },
      {
        "title": "Vyberte rozložení",
        "body": "2×1, 2×2, 3×3 nebo pruh."
      },
      {
        "title": "Dolaďte a exportujte",
        "body": "Mezery, pozadí, velikost — stáhněte jako PNG."
      }
    ],
    "de": [
      {
        "title": "Fotos ablegen",
        "body": "JPG, PNG oder WebP — beliebig viele."
      },
      {
        "title": "Layout wählen",
        "body": "2×1, 2×2, 3×3 oder Streifen."
      },
      {
        "title": "Anpassen und exportieren",
        "body": "Abstand, Hintergrund, Größe — als PNG herunterladen."
      }
    ],
    "es": [
      {
        "title": "Arrastra tus fotos",
        "body": "JPG, PNG o WebP — tantas como quieras."
      },
      {
        "title": "Elige una composición",
        "body": "2×1, 2×2, 3×3 o tira horizontal."
      },
      {
        "title": "Ajusta y exporta",
        "body": "Margen, fondo, tamaño — descarga como PNG."
      }
    ],
    "fr": [
      {
        "title": "Déposez vos photos",
        "body": "JPG, PNG ou WebP — autant que vous voulez."
      },
      {
        "title": "Choisissez une disposition",
        "body": "2×1, 2×2, 3×3 ou bande."
      },
      {
        "title": "Ajustez et exportez",
        "body": "Espacement, fond, taille — téléchargez en PNG."
      }
    ],
    "hi": [
      {
        "title": "अपनी फोटो डालें",
        "body": "JPG, PNG या WebP — कोई भी संख्या।"
      },
      {
        "title": "लेआउट चुनें",
        "body": "2×1, 2×2, 3×3 या स्ट्रिप।"
      },
      {
        "title": "ट्यून करें और एक्सपोर्ट करें",
        "body": "गैप, बैकग्राउंड, साइज़ — PNG के रूप में डाउनलोड करें।"
      }
    ],
    "id": [
      {
        "title": "Seret foto-fotomu",
        "body": "JPG, PNG, atau WebP — berapa pun jumlahnya."
      },
      {
        "title": "Pilih tata letak",
        "body": "2×1, 2×2, 3×3, atau strip."
      },
      {
        "title": "Sesuaikan dan ekspor",
        "body": "Celah, latar belakang, ukuran — unduh sebagai PNG."
      }
    ],
    "it": [
      {
        "title": "Trascina le tue foto",
        "body": "JPG, PNG o WebP — quante vuoi."
      },
      {
        "title": "Scegli un layout",
        "body": "2×1, 2×2, 3×3 o striscia."
      },
      {
        "title": "Regola ed esporta",
        "body": "Spazio, sfondo, dimensioni — scarica come PNG."
      }
    ],
    "ja": [
      {
        "title": "写真をドロップ",
        "body": "JPG、PNG または WebP — 枚数制限なし。"
      },
      {
        "title": "レイアウトを選択",
        "body": "2×1、2×2、3×3 またはストリップ。"
      },
      {
        "title": "調整してエクスポート",
        "body": "余白・背景・サイズを設定してPNGとしてダウンロード。"
      }
    ],
    "ko": [
      {
        "title": "사진 드롭",
        "body": "JPG, PNG 또는 WebP — 장수 제한 없음."
      },
      {
        "title": "레이아웃 선택",
        "body": "2×1, 2×2, 3×3 또는 스트립."
      },
      {
        "title": "조정 후 내보내기",
        "body": "간격, 배경, 크기 설정 후 PNG로 다운로드."
      }
    ],
    "nl": [
      {
        "title": "Sleep je foto's hierheen",
        "body": "JPG, PNG of WebP — elk aantal."
      },
      {
        "title": "Kies een indeling",
        "body": "2×1, 2×2, 3×3 of strip."
      },
      {
        "title": "Aanpassen en exporteren",
        "body": "Tussenruimte, achtergrond, grootte — download als PNG."
      }
    ],
    "pl": [
      {
        "title": "Upuść swoje zdjęcia",
        "body": "JPG, PNG lub WebP — dowolna liczba."
      },
      {
        "title": "Wybierz układ",
        "body": "2×1, 2×2, 3×3 lub pasek."
      },
      {
        "title": "Dostosuj i eksportuj",
        "body": "Odstęp, tło, rozmiar — pobierz jako PNG."
      }
    ],
    "pt": [
      {
        "title": "Arraste as suas fotos",
        "body": "JPG, PNG ou WebP — qualquer quantidade."
      },
      {
        "title": "Escolha um layout",
        "body": "2×1, 2×2, 3×3 ou faixa."
      },
      {
        "title": "Ajuste e exporte",
        "body": "Espaçamento, fundo, tamanho — baixe como PNG."
      }
    ],
    "ru": [
      {
        "title": "Загрузите фотографии",
        "body": "JPG, PNG или WebP — любое количество."
      },
      {
        "title": "Выберите макет",
        "body": "2×1, 2×2, 3×3 или лента."
      },
      {
        "title": "Настройте и экспортируйте",
        "body": "Отступы, фон, размер — скачайте как PNG."
      }
    ],
    "sv": [
      {
        "title": "Släpp dina foton",
        "body": "JPG, PNG eller WebP — hur många som helst."
      },
      {
        "title": "Välj layout",
        "body": "2×1, 2×2, 3×3 eller remsa."
      },
      {
        "title": "Finjustera och exportera",
        "body": "Mellanrum, bakgrund, storlek — ladda ned som PNG."
      }
    ],
    "tr": [
      {
        "title": "Fotoğraflarını bırak",
        "body": "JPG, PNG veya WebP — istediğin kadar."
      },
      {
        "title": "Bir düzen seç",
        "body": "2x1, 2x2, 3x3 veya şerit."
      },
      {
        "title": "İnce ayar yap ve dışa aktar",
        "body": "Boşluk, arka plan, boyut — PNG olarak indir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте фото",
        "body": "JPG, PNG або WebP — будь-яка кількість."
      },
      {
        "title": "Оберіть макет",
        "body": "2×1, 2×2, 3×3 або стрічка."
      },
      {
        "title": "Налаштуйте та збережіть",
        "body": "Відступ, фон, розмір — завантажте як PNG."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh vào đây",
        "body": "JPG, PNG hoặc WebP — bao nhiêu ảnh cũng được."
      },
      {
        "title": "Chọn bố cục",
        "body": "2×1, 2×2, 3×3 hoặc dạng dải."
      },
      {
        "title": "Tinh chỉnh và xuất",
        "body": "Khoảng cách, nền, kích thước — tải xuống dạng PNG."
      }
    ],
    "zh": [
      {
        "title": "拖入照片",
        "body": "支持 JPG、PNG 或 WebP，数量不限。"
      },
      {
        "title": "选择布局",
        "body": "2×1、2×2、3×3 或条形拼接。"
      },
      {
        "title": "调整并导出",
        "body": "设置间距、背景和尺寸，下载为 PNG。"
      }
    ]
  },
  "image-from-jpg": {
    "ar": [
      {
        "title": "أسقط ملف JPG",
        "body": "يبقى على جهازك."
      },
      {
        "title": "انقر تحويل",
        "body": "يُعاد ترميزه كـ PNG."
      },
      {
        "title": "حمّل",
        "body": "جاهز للتصاميم أو الشفافية."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte JPG",
        "body": "Zůstane na vašem zařízení."
      },
      {
        "title": "Klikněte na převést",
        "body": "Překóduje se jako PNG."
      },
      {
        "title": "Stáhněte",
        "body": "Připraveno pro grafiku nebo průhlednost."
      }
    ],
    "de": [
      {
        "title": "JPG ablegen",
        "body": "Bleibt auf deinem Gerät."
      },
      {
        "title": "Konvertieren klicken",
        "body": "Wird als PNG neu kodiert."
      },
      {
        "title": "Herunterladen",
        "body": "Bereit für Designs oder Transparenz."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu JPG",
        "body": "Se queda en tu dispositivo."
      },
      {
        "title": "Haz clic en convertir",
        "body": "Se recodifica como PNG."
      },
      {
        "title": "Descarga",
        "body": "Listo para diseños o con soporte de transparencia."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre JPG",
        "body": "Reste sur votre appareil."
      },
      {
        "title": "Cliquez sur Convertir",
        "body": "Ré-encodé en PNG."
      },
      {
        "title": "Téléchargez",
        "body": "Prêt pour le design ou la transparence."
      }
    ],
    "hi": [
      {
        "title": "अपना JPG डालें",
        "body": "आपके डिवाइस पर रहता है।"
      },
      {
        "title": "कन्वर्ट पर क्लिक करें",
        "body": "PNG के रूप में री-एनकोड होता है।"
      },
      {
        "title": "डाउनलोड करें",
        "body": "डिज़ाइन या ट्रांसपेरेंसी के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Seret JPG kamu",
        "body": "Tetap di perangkatmu."
      },
      {
        "title": "Klik konversi",
        "body": "Di-encode ulang sebagai PNG."
      },
      {
        "title": "Unduh",
        "body": "Siap untuk desain atau transparansi."
      }
    ],
    "it": [
      {
        "title": "Trascina il tuo JPG",
        "body": "Rimane sul tuo dispositivo."
      },
      {
        "title": "Clicca su Converti",
        "body": "Ricodificato come PNG."
      },
      {
        "title": "Scarica",
        "body": "Pronto per design o trasparenze."
      }
    ],
    "ja": [
      {
        "title": "JPGをドロップ",
        "body": "デバイス上に保持されます。"
      },
      {
        "title": "変換をクリック",
        "body": "PNGとして再エンコード。"
      },
      {
        "title": "ダウンロード",
        "body": "デザインや透過処理にすぐ使えます。"
      }
    ],
    "ko": [
      {
        "title": "JPG 드롭",
        "body": "기기에 머무릅니다."
      },
      {
        "title": "변환 클릭",
        "body": "PNG로 재인코딩됩니다."
      },
      {
        "title": "다운로드",
        "body": "디자인 작업이나 투명도 처리에 바로 사용하세요."
      }
    ],
    "nl": [
      {
        "title": "Sleep je JPG hierheen",
        "body": "Blijft op je apparaat."
      },
      {
        "title": "Klik op converteren",
        "body": "Opnieuw gecodeerd als PNG."
      },
      {
        "title": "Downloaden",
        "body": "Klaar voor designs of transparantie."
      }
    ],
    "pl": [
      {
        "title": "Upuść swój JPG",
        "body": "Zostaje na Twoim urządzeniu."
      },
      {
        "title": "Kliknij Konwertuj",
        "body": "Ponownie zakodowany jako PNG."
      },
      {
        "title": "Pobierz",
        "body": "Gotowy do projektowania lub obsługi przezroczystości."
      }
    ],
    "pt": [
      {
        "title": "Arraste o seu JPG",
        "body": "Fica no seu dispositivo."
      },
      {
        "title": "Clique em converter",
        "body": "Recodificado como PNG."
      },
      {
        "title": "Baixe",
        "body": "Pronto para designs ou transparência."
      }
    ],
    "ru": [
      {
        "title": "Загрузите JPG",
        "body": "Остаётся на вашем устройстве."
      },
      {
        "title": "Нажмите «Конвертировать»",
        "body": "Перекодируется в PNG."
      },
      {
        "title": "Скачайте",
        "body": "Готово для дизайна или работы с прозрачностью."
      }
    ],
    "sv": [
      {
        "title": "Släpp din JPG",
        "body": "Stannar på din enhet."
      },
      {
        "title": "Klicka konvertera",
        "body": "Omkodas som PNG."
      },
      {
        "title": "Ladda ned",
        "body": "Redo för design eller transparens."
      }
    ],
    "tr": [
      {
        "title": "JPG'ni bırak",
        "body": "Cihazında kalır."
      },
      {
        "title": "Dönüştür'e tıkla",
        "body": "PNG olarak yeniden kodlanır."
      },
      {
        "title": "İndir",
        "body": "Tasarım veya şeffaflık için hazır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте JPG",
        "body": "Залишається на пристрої."
      },
      {
        "title": "Натисніть «конвертувати»",
        "body": "Перекодовується у PNG."
      },
      {
        "title": "Завантажте",
        "body": "Готово для дизайну або використання з прозорістю."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả file JPG vào đây",
        "body": "Ở lại trên thiết bị của bạn."
      },
      {
        "title": "Nhấn chuyển đổi",
        "body": "Mã hóa lại thành PNG."
      },
      {
        "title": "Tải xuống",
        "body": "Sẵn sàng cho thiết kế hoặc dùng với nền trong suốt."
      }
    ],
    "zh": [
      {
        "title": "拖入 JPG 文件",
        "body": "文件保留在本地设备。"
      },
      {
        "title": "点击转换",
        "body": "重新编码为 PNG 格式。"
      },
      {
        "title": "下载",
        "body": "可用于设计或需要透明背景的场景。"
      }
    ]
  },
  "image-to-base64": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "JPG أو PNG أو GIF أو WebP أو SVG."
      },
      {
        "title": "انسخ data URI",
        "body": "أو انسخ Base64 الخام — بدّل البادئة."
      },
      {
        "title": "فكّ الترميز للصورة",
        "body": "الصق أي سلسلة Base64 للمعاينة والتنزيل."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "JPG, PNG, GIF, WebP nebo SVG."
      },
      {
        "title": "Zkopírujte data URI",
        "body": "Nebo zkopírujte surový base64 — přepněte předponu."
      },
      {
        "title": "Dekódujte zpět na obrázek",
        "body": "Vložte libovolný řetězec base64 pro náhled a stažení."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "JPG, PNG, GIF, WebP oder SVG."
      },
      {
        "title": "Data-URI kopieren",
        "body": "Oder reines Base64 kopieren — Präfix per Schalter an-/abschalten."
      },
      {
        "title": "Zurück ins Bild dekodieren",
        "body": "Beliebigen Base64-String einfügen, um ihn in der Vorschau anzuzeigen und herunterzuladen."
      }
    ],
    "es": [
      {
        "title": "Sube una imagen",
        "body": "JPG, PNG, GIF, WebP o SVG."
      },
      {
        "title": "Copia el URI de datos",
        "body": "O copia el Base64 puro — alterna el prefijo."
      },
      {
        "title": "Decodifica de vuelta a imagen",
        "body": "Pega cualquier cadena Base64 para previsualizarla y descargarla."
      }
    ],
    "fr": [
      {
        "title": "Importez une image",
        "body": "JPG, PNG, GIF, WebP ou SVG."
      },
      {
        "title": "Copiez l'URI de données",
        "body": "Ou copiez le base64 brut — activez/désactivez le préfixe."
      },
      {
        "title": "Décodez en image",
        "body": "Collez n'importe quelle chaîne base64 pour prévisualiser et télécharger."
      }
    ],
    "hi": [
      {
        "title": "एक इमेज अपलोड करें",
        "body": "JPG, PNG, GIF, WebP या SVG।"
      },
      {
        "title": "data URI कॉपी करें",
        "body": "या रॉ Base64 कॉपी करें — प्रीफिक्स टॉगल करें।"
      },
      {
        "title": "वापस इमेज में डीकोड करें",
        "body": "प्रीव्यू और डाउनलोड के लिए कोई भी Base64 स्ट्रिंग पेस्ट करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambar",
        "body": "JPG, PNG, GIF, WebP, atau SVG."
      },
      {
        "title": "Salin data URI",
        "body": "Atau salin base64 mentah — aktifkan/nonaktifkan prefiks."
      },
      {
        "title": "Dekode kembali ke gambar",
        "body": "Tempel string base64 apa pun untuk pratinjau dan unduhan."
      }
    ],
    "it": [
      {
        "title": "Carica un'immagine",
        "body": "JPG, PNG, GIF, WebP o SVG."
      },
      {
        "title": "Copia il data URI",
        "body": "Oppure copia il base64 grezzo — attiva o disattiva il prefisso."
      },
      {
        "title": "Decodifica in immagine",
        "body": "Incolla qualsiasi stringa base64 per visualizzarla e scaricarla."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "JPG、PNG、GIF、WebP または SVG。"
      },
      {
        "title": "データURIをコピー",
        "body": "または生の Base64 のみコピー。プレフィックスはトグルで切り替え。"
      },
      {
        "title": "画像としてデコード",
        "body": "Base64 文字列をペーストしてプレビューとダウンロードが可能。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "JPG, PNG, GIF, WebP 또는 SVG."
      },
      {
        "title": "데이터 URI 복사",
        "body": "또는 순수 Base64를 복사하세요 — 접두사 토글로 전환 가능합니다."
      },
      {
        "title": "이미지로 다시 디코딩",
        "body": "Base64 문자열을 붙여넣어 미리보고 다운로드하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload een afbeelding",
        "body": "JPG, PNG, GIF, WebP of SVG."
      },
      {
        "title": "Kopieer de data-URI",
        "body": "Of kopieer ruwe base64 — schakel het voorvoegsel in of uit."
      },
      {
        "title": "Decodeer terug naar afbeelding",
        "body": "Plak een base64-string om een preview te zien en te downloaden."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "JPG, PNG, GIF, WebP lub SVG."
      },
      {
        "title": "Skopiuj data URI",
        "body": "Lub skopiuj surowy base64 — przełącz prefiks."
      },
      {
        "title": "Zdekoduj z powrotem do obrazu",
        "body": "Wklej dowolny ciąg base64, aby wyświetlić podgląd i pobrać plik."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma imagem",
        "body": "JPG, PNG, GIF, WebP ou SVG."
      },
      {
        "title": "Copie o data URI",
        "body": "Ou copie o base64 puro — alterne o prefixo."
      },
      {
        "title": "Descodifique de volta para imagem",
        "body": "Cole qualquer string base64 para pré-visualizar e baixar."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPG, PNG, GIF, WebP или SVG."
      },
      {
        "title": "Скопируйте data URI",
        "body": "Или скопируйте чистый base64 — переключите префикс."
      },
      {
        "title": "Декодируйте обратно в изображение",
        "body": "Вставьте любую строку base64 для просмотра и скачивания."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en bild",
        "body": "JPG, PNG, GIF, WebP eller SVG."
      },
      {
        "title": "Kopiera data-URI:n",
        "body": "Eller kopiera rå base64 — växla prefixet."
      },
      {
        "title": "Avkoda tillbaka till bild",
        "body": "Klistra in valfri base64-sträng för att förhandsgranska och ladda ned."
      }
    ],
    "tr": [
      {
        "title": "Görsel yükle",
        "body": "JPG, PNG, GIF, WebP veya SVG."
      },
      {
        "title": "Veri URI'sini kopyala",
        "body": "Ya da ham base64'ü kopyala — öneki aç/kapat."
      },
      {
        "title": "Görsele geri çöz",
        "body": "Herhangi bir base64 dizesini yapıştırarak önizle ve indir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPG, PNG, GIF, WebP або SVG."
      },
      {
        "title": "Скопіюйте URI даних",
        "body": "Або скопіюйте чистий Base64 — перемикач префікса в наявності."
      },
      {
        "title": "Декодуйте назад у зображення",
        "body": "Вставте будь-який рядок Base64, щоб переглянути і завантажити."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "JPG, PNG, GIF, WebP hoặc SVG."
      },
      {
        "title": "Sao chép data URI",
        "body": "Hoặc sao chép Base64 thuần — bật/tắt tiền tố tùy ý."
      },
      {
        "title": "Giải mã ngược về ảnh",
        "body": "Dán bất kỳ chuỗi Base64 nào để xem trước và tải xuống."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "支持 JPG、PNG、GIF、WebP 或 SVG。"
      },
      {
        "title": "复制 data URI",
        "body": "或复制原始 base64——可切换是否带前缀。"
      },
      {
        "title": "解码为图片",
        "body": "粘贴任意 base64 字符串，即可预览并下载。"
      }
    ]
  },
  "image-to-ico": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "المربعة تعمل بشكل أفضل — غيرها يحصل على أشرطة."
      },
      {
        "title": "نبني كل الأحجام",
        "body": "16 و32 و48 و64 بكسل في ملف .ico واحد."
      },
      {
        "title": "حمّل favicon.ico",
        "body": "أسقطه في جذر موقعك."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "Čtvercový funguje nejlépe — ostatní se přizpůsobí letterboxem."
      },
      {
        "title": "Vytvoříme každou velikost",
        "body": "16, 32, 48 a 64 px v jednom souboru .ico."
      },
      {
        "title": "Stáhněte favicon.ico",
        "body": "Vložte do kořenového adresáře svého webu."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "Quadratisch funktioniert am besten — andere werden mit Letterboxing eingepasst."
      },
      {
        "title": "Wir erstellen alle Größen",
        "body": "16, 32, 48 und 64 px in einer .ico-Datei."
      },
      {
        "title": "favicon.ico herunterladen",
        "body": "Im Website-Stammverzeichnis ablegen."
      }
    ],
    "es": [
      {
        "title": "Sube una imagen",
        "body": "Cuadrada es ideal — otras se ajustan con letterbox."
      },
      {
        "title": "Generamos todos los tamaños",
        "body": "16, 32, 48 y 64 px en un solo .ico."
      },
      {
        "title": "Descarga favicon.ico",
        "body": "Colócalo en la raíz de tu sitio."
      }
    ],
    "fr": [
      {
        "title": "Importez une image",
        "body": "Le carré fonctionne mieux — les autres sont mis en boîte."
      },
      {
        "title": "Nous générons chaque taille",
        "body": "16, 32, 48 et 64 px dans un seul .ico."
      },
      {
        "title": "Téléchargez favicon.ico",
        "body": "Déposez-le à la racine de votre site."
      }
    ],
    "hi": [
      {
        "title": "एक इमेज अपलोड करें",
        "body": "स्क्वेयर सबसे अच्छा काम करता है — बाकी को लेटरबॉक्स किया जाता है।"
      },
      {
        "title": "हम हर साइज़ बनाते हैं",
        "body": "एक .ico में 16, 32, 48 और 64 px।"
      },
      {
        "title": "favicon.ico डाउनलोड करें",
        "body": "अपनी साइट रूट में डालें।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambar",
        "body": "Gambar persegi paling ideal — yang lain akan diberi letterbox."
      },
      {
        "title": "Kami membuat setiap ukuran",
        "body": "16, 32, 48, dan 64 px dalam satu file .ico."
      },
      {
        "title": "Unduh favicon.ico",
        "body": "Letakkan di root situs kamu."
      }
    ],
    "it": [
      {
        "title": "Carica un'immagine",
        "body": "Le immagini quadrate funzionano meglio — le altre vengono letterboxate."
      },
      {
        "title": "Generiamo ogni dimensione",
        "body": "16, 32, 48 e 64 px in un unico file .ico."
      },
      {
        "title": "Scarica favicon.ico",
        "body": "Inseriscilo nella root del tuo sito."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "正方形が最適。それ以外はレターボックス処理されます。"
      },
      {
        "title": "全サイズを自動生成",
        "body": "16、32、48、64px を1つの .ico にまとめます。"
      },
      {
        "title": "favicon.ico をダウンロード",
        "body": "サイトのルートに配置するだけ。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "정사각형이 가장 좋습니다 — 그 외는 레터박스 처리됩니다."
      },
      {
        "title": "모든 크기 생성",
        "body": "16, 32, 48, 64 px이 하나의 .ico에 포함됩니다."
      },
      {
        "title": "favicon.ico 다운로드",
        "body": "사이트 루트에 바로 놓으세요."
      }
    ],
    "nl": [
      {
        "title": "Upload een afbeelding",
        "body": "Vierkant werkt het best — andere worden met letterboxing aangepast."
      },
      {
        "title": "We genereren elke maat",
        "body": "16, 32, 48 en 64 px in één .ico-bestand."
      },
      {
        "title": "Download favicon.ico",
        "body": "Zet het in de root van je site."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "Kwadratowy jest najlepszy — inne są letterboxowane."
      },
      {
        "title": "Tworzymy wszystkie rozmiary",
        "body": "16, 32, 48 i 64 px w jednym pliku .ico."
      },
      {
        "title": "Pobierz favicon.ico",
        "body": "Wrzuć do głównego katalogu swojej strony."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma imagem",
        "body": "Quadrada funciona melhor — outras são enquadradas com margens."
      },
      {
        "title": "Geramos todos os tamanhos",
        "body": "16, 32, 48 e 64 px num único .ico."
      },
      {
        "title": "Baixe o favicon.ico",
        "body": "Coloque-o na raiz do seu site."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "Квадрат подходит лучше всего — другие форматы будут вписаны с полями."
      },
      {
        "title": "Создаём все размеры",
        "body": "16, 32, 48 и 64 пикселя в одном .ico."
      },
      {
        "title": "Скачайте favicon.ico",
        "body": "Разместите в корне сайта."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en bild",
        "body": "Kvadratisk fungerar bäst — andra läggs i letterbox."
      },
      {
        "title": "Vi bygger varje storlek",
        "body": "16, 32, 48 och 64 px i en .ico."
      },
      {
        "title": "Ladda ned favicon.ico",
        "body": "Lägg den i din webbplatsrot."
      }
    ],
    "tr": [
      {
        "title": "Görsel yükle",
        "body": "Kare en iyi sonucu verir — diğerleri letterbox ile doldurulur."
      },
      {
        "title": "Her boyutu oluşturuyoruz",
        "body": "Tek bir .ico içinde 16, 32, 48 ve 64 piksel."
      },
      {
        "title": "favicon.ico indir",
        "body": "Site kök dizinine bırak."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "Квадратне підходить найкраще — інші масштабуються з відступами."
      },
      {
        "title": "Ми формуємо всі розміри",
        "body": "16, 32, 48 і 64 пікселі в одному .ico."
      },
      {
        "title": "Завантажте favicon.ico",
        "body": "Розмістіть у кореневій теці сайту."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "Ảnh vuông cho kết quả tốt nhất — ảnh khác sẽ được thêm viền đen."
      },
      {
        "title": "Tạo đủ các kích cỡ",
        "body": "16, 32, 48 và 64 px trong một file .ico."
      },
      {
        "title": "Tải xuống favicon.ico",
        "body": "Đặt thẳng vào thư mục gốc của trang web."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "正方形效果最佳，其他比例会自动加黑边填充。"
      },
      {
        "title": "自动生成各尺寸",
        "body": "16、32、48 和 64 像素，全部打包到一个 .ico 中。"
      },
      {
        "title": "下载 favicon.ico",
        "body": "放到网站根目录即可使用。"
      }
    ]
  },
  "image-to-jpg": {
    "ar": [
      {
        "title": "أسقط صورتك",
        "body": "أي تنسيق شائع."
      },
      {
        "title": "اختر الجودة",
        "body": "الافتراضي 92 يحافظ على وضوح الصور."
      },
      {
        "title": "حمّل JPG",
        "body": "معروض في المتصفح، بلا رفع."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte obrázek",
        "body": "Libovolný běžný formát."
      },
      {
        "title": "Vyberte kvalitu",
        "body": "Výchozí hodnota 92 zachová fotky v ostré kvalitě."
      },
      {
        "title": "Stáhněte JPG",
        "body": "Zpracováno prohlížečem, bez nahrávání."
      }
    ],
    "de": [
      {
        "title": "Bild ablegen",
        "body": "Jedes gängige Format."
      },
      {
        "title": "Qualität wählen",
        "body": "Standard 92 hält Fotos gestochen scharf."
      },
      {
        "title": "JPG herunterladen",
        "body": "Im Browser gerendert — kein Upload."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu imagen",
        "body": "Cualquier formato habitual."
      },
      {
        "title": "Elige la calidad",
        "body": "El valor por defecto de 92 mantiene las fotos nítidas."
      },
      {
        "title": "Descarga el JPG",
        "body": "Procesado en el navegador, sin subidas."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre image",
        "body": "N'importe quel format courant."
      },
      {
        "title": "Choisissez la qualité",
        "body": "92 par défaut pour conserver des photos nettes."
      },
      {
        "title": "Téléchargez le JPG",
        "body": "Rendu navigateur, sans envoi."
      }
    ],
    "hi": [
      {
        "title": "अपनी इमेज डालें",
        "body": "कोई भी सामान्य फॉर्मेट।"
      },
      {
        "title": "क्वालिटी चुनें",
        "body": "डिफ़ॉल्ट 92 फोटो को साफ़ रखता है।"
      },
      {
        "title": "JPG डाउनलोड करें",
        "body": "ब्राउज़र-रेंडर्ड, कोई अपलोड नहीं।"
      }
    ],
    "id": [
      {
        "title": "Seret gambarmu",
        "body": "Format umum apa pun."
      },
      {
        "title": "Pilih kualitas",
        "body": "Default 92 menjaga foto tetap tajam."
      },
      {
        "title": "Unduh JPG",
        "body": "Dirender di browser, tanpa unggah."
      }
    ],
    "it": [
      {
        "title": "Trascina la tua immagine",
        "body": "Qualsiasi formato comune."
      },
      {
        "title": "Scegli la qualità",
        "body": "Il valore predefinito 92 mantiene le foto nitide."
      },
      {
        "title": "Scarica il JPG",
        "body": "Reso nel browser, nessun upload."
      }
    ],
    "ja": [
      {
        "title": "画像をドロップ",
        "body": "一般的な形式に対応。"
      },
      {
        "title": "品質を選択",
        "body": "デフォルト92でシャープな写真を維持。"
      },
      {
        "title": "JPGをダウンロード",
        "body": "ブラウザでレンダリング。アップロード不要。"
      }
    ],
    "ko": [
      {
        "title": "이미지 드롭",
        "body": "일반적인 모든 형식 지원."
      },
      {
        "title": "품질 선택",
        "body": "기본값 92는 사진을 선명하게 유지합니다."
      },
      {
        "title": "JPG 다운로드",
        "body": "브라우저에서 렌더링되며, 업로드가 없습니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep je afbeelding hierheen",
        "body": "Elk gangbaar formaat."
      },
      {
        "title": "Kies een kwaliteit",
        "body": "Standaard 92 houdt foto's scherp."
      },
      {
        "title": "Download JPG",
        "body": "Gerenderd in de browser, geen upload."
      }
    ],
    "pl": [
      {
        "title": "Upuść swój obraz",
        "body": "Dowolny popularny format."
      },
      {
        "title": "Wybierz jakość",
        "body": "Domyślne 92 zachowuje ostrość zdjęć."
      },
      {
        "title": "Pobierz JPG",
        "body": "Renderowane w przeglądarce, bez przesyłania."
      }
    ],
    "pt": [
      {
        "title": "Arraste a sua imagem",
        "body": "Qualquer formato comum."
      },
      {
        "title": "Escolha a qualidade",
        "body": "O padrão 92 mantém as fotos nítidas."
      },
      {
        "title": "Baixe o JPG",
        "body": "Renderizado no browser, sem upload."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "Любой распространённый формат."
      },
      {
        "title": "Выберите качество",
        "body": "По умолчанию 92 — фото остаются чёткими."
      },
      {
        "title": "Скачайте JPG",
        "body": "Рендеринг в браузере, без загрузки на сервер."
      }
    ],
    "sv": [
      {
        "title": "Släpp din bild",
        "body": "Vilket vanligt format som helst."
      },
      {
        "title": "Välj kvalitet",
        "body": "Standard 92 håller foton skarpa."
      },
      {
        "title": "Ladda ned JPG",
        "body": "Webbläsarrenderad, ingen uppladdning."
      }
    ],
    "tr": [
      {
        "title": "Görselini bırak",
        "body": "Yaygın herhangi bir format."
      },
      {
        "title": "Kalite seç",
        "body": "Varsayılan 92, fotoğrafları net tutar."
      },
      {
        "title": "JPG indir",
        "body": "Tarayıcıda işlenir, yükleme yok."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "Будь-який поширений формат."
      },
      {
        "title": "Оберіть якість",
        "body": "Стандартне значення 92 зберігає чіткість фото."
      },
      {
        "title": "Завантажте JPG",
        "body": "Рендеринг у браузері, без завантаження на сервер."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh vào đây",
        "body": "Bất kỳ định dạng phổ biến nào."
      },
      {
        "title": "Chọn chất lượng",
        "body": "Mặc định 92 giữ ảnh sắc nét."
      },
      {
        "title": "Tải xuống JPG",
        "body": "Kết xuất trên trình duyệt, không tải lên."
      }
    ],
    "zh": [
      {
        "title": "拖入图片",
        "body": "支持常见图片格式。"
      },
      {
        "title": "选择画质",
        "body": "默认 92，照片清晰锐利。"
      },
      {
        "title": "下载 JPG",
        "body": "浏览器本地渲染，无需上传。"
      }
    ]
  },
  "image-to-table": {
    "ar": [
      {
        "title": "ارفع صورة جدول",
        "body": "صورة فوتوغرافية أو مسح ضوئي أو لقطة شاشة لأي جدول أو جدول بيانات."
      },
      {
        "title": "الذكاء الاصطناعي يقرأ الخلايا",
        "body": "تُعاد بناء الصفوف والأعمدة كبيانات نظيفة."
      },
      {
        "title": "صدّر بياناتك",
        "body": "حمّل كـ Excel (.xlsx) أو CSV أو JSON — نقرة واحدة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek tabulky",
        "body": "Fotka, sken nebo snímek obrazovky libovolné tabulky či tabulkového procesoru."
      },
      {
        "title": "AI přečte buňky",
        "body": "Řádky a sloupce jsou rekonstruovány do čistých dat."
      },
      {
        "title": "Exportujte data",
        "body": "Stáhněte jako Excel (.xlsx), CSV nebo JSON — jedním klikem."
      }
    ],
    "de": [
      {
        "title": "Tabellenbild hochladen",
        "body": "Foto, Scan oder Screenshot einer Tabelle oder Tabellenkalkulation."
      },
      {
        "title": "KI liest die Zellen",
        "body": "Zeilen und Spalten werden zu sauberen Daten rekonstruiert."
      },
      {
        "title": "Daten exportieren",
        "body": "Als Excel (.xlsx), CSV oder JSON herunterladen — ein Klick."
      }
    ],
    "es": [
      {
        "title": "Sube una imagen de tabla",
        "body": "Foto, escaneo o captura de cualquier tabla u hoja de cálculo."
      },
      {
        "title": "La IA lee las celdas",
        "body": "Filas y columnas se reconstruyen en datos limpios."
      },
      {
        "title": "Exporta tus datos",
        "body": "Descarga como Excel (.xlsx), CSV o JSON — con un solo clic."
      }
    ],
    "fr": [
      {
        "title": "Importez une image de tableau",
        "body": "Photo, scan ou capture d'écran de n'importe quel tableau ou feuille de calcul."
      },
      {
        "title": "L'IA lit les cellules",
        "body": "Les lignes et colonnes sont reconstruites en données propres."
      },
      {
        "title": "Exportez vos données",
        "body": "Téléchargez en Excel (.xlsx), CSV ou JSON — en un clic."
      }
    ],
    "hi": [
      {
        "title": "टेबल इमेज अपलोड करें",
        "body": "किसी भी टेबल या स्प्रेडशीट की फोटो, स्कैन या स्क्रीनशॉट।"
      },
      {
        "title": "AI सेल्स पढ़ता है",
        "body": "पंक्तियां और कॉलम साफ़ डेटा में पुनर्निर्मित होते हैं।"
      },
      {
        "title": "अपना डेटा एक्सपोर्ट करें",
        "body": "Excel (.xlsx), CSV या JSON के रूप में डाउनलोड करें — एक क्लिक में।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambar tabel",
        "body": "Foto, pindaian, atau tangkapan layar tabel atau spreadsheet apa pun."
      },
      {
        "title": "AI membaca sel-selnya",
        "body": "Baris dan kolom direkonstruksi menjadi data yang bersih."
      },
      {
        "title": "Ekspor datamu",
        "body": "Unduh sebagai Excel (.xlsx), CSV, atau JSON — satu klik."
      }
    ],
    "it": [
      {
        "title": "Carica un'immagine con una tabella",
        "body": "Una foto, una scansione o uno screenshot di qualsiasi tabella o foglio di calcolo."
      },
      {
        "title": "L'AI legge le celle",
        "body": "Righe e colonne vengono ricostruite in dati puliti."
      },
      {
        "title": "Esporta i dati",
        "body": "Scarica come Excel (.xlsx), CSV o JSON — in un clic."
      }
    ],
    "ja": [
      {
        "title": "表の画像をアップロード",
        "body": "表やスプレッドシートの写真・スキャン・スクリーンショット。"
      },
      {
        "title": "AIがセルを読み取る",
        "body": "行と列をクリーンなデータとして再構築。"
      },
      {
        "title": "データをエクスポート",
        "body": "Excel（.xlsx）・CSV・JSON でダウンロード。ワンクリック。"
      }
    ],
    "ko": [
      {
        "title": "표 이미지 업로드",
        "body": "표나 스프레드시트의 사진, 스캔, 또는 스크린샷."
      },
      {
        "title": "AI가 셀을 읽습니다",
        "body": "행과 열이 깔끔한 데이터로 재구성됩니다."
      },
      {
        "title": "데이터 내보내기",
        "body": "Excel(.xlsx), CSV 또는 JSON으로 다운로드 — 한 번에."
      }
    ],
    "nl": [
      {
        "title": "Upload een tabelafbeelding",
        "body": "Een foto, scan of schermafbeelding van een tabel of spreadsheet."
      },
      {
        "title": "AI leest de cellen",
        "body": "Rijen en kolommen worden gereconstrueerd tot nette data."
      },
      {
        "title": "Exporteer je data",
        "body": "Download als Excel (.xlsx), CSV of JSON — met één klik."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz tabeli",
        "body": "Zdjęcie, skan lub zrzut ekranu dowolnej tabeli lub arkusza kalkulacyjnego."
      },
      {
        "title": "AI odczytuje komórki",
        "body": "Wiersze i kolumny są rekonstruowane w czyste dane."
      },
      {
        "title": "Eksportuj dane",
        "body": "Pobierz jako Excel (.xlsx), CSV lub JSON — jednym kliknięciem."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma imagem de tabela",
        "body": "Uma foto, digitalização ou captura de ecrã de qualquer tabela ou folha de cálculo."
      },
      {
        "title": "A IA lê as células",
        "body": "Linhas e colunas são reconstruídas em dados limpos."
      },
      {
        "title": "Exporte os seus dados",
        "body": "Baixe como Excel (.xlsx), CSV ou JSON — um clique."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение таблицы",
        "body": "Фото, скан или скриншот любой таблицы или электронной таблицы."
      },
      {
        "title": "ИИ читает ячейки",
        "body": "Строки и столбцы восстанавливаются в чистые данные."
      },
      {
        "title": "Экспортируйте данные",
        "body": "Скачайте как Excel (.xlsx), CSV или JSON — одним кликом."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en tabellbild",
        "body": "Ett foto, en skanning eller skärmdump av en tabell eller ett kalkylblad."
      },
      {
        "title": "AI läser cellerna",
        "body": "Rader och kolumner rekonstrueras till ren data."
      },
      {
        "title": "Exportera dina data",
        "body": "Ladda ned som Excel (.xlsx), CSV eller JSON — ett klick."
      }
    ],
    "tr": [
      {
        "title": "Tablo görseli yükle",
        "body": "Herhangi bir tablonun veya tablonun fotoğrafı, taraması veya ekran görüntüsü."
      },
      {
        "title": "AI hücreleri okuyor",
        "body": "Satırlar ve sütunlar temiz verilere dönüştürülür."
      },
      {
        "title": "Verilerini dışa aktar",
        "body": "Excel (.xlsx), CSV veya JSON olarak indir — tek tıkla."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення таблиці",
        "body": "Фото, скан або скриншот будь-якої таблиці чи таблиці даних."
      },
      {
        "title": "ШІ зчитує комірки",
        "body": "Рядки і стовпці відновлюються у чисті дані."
      },
      {
        "title": "Збережіть дані",
        "body": "Завантажте як Excel (.xlsx), CSV або JSON — одним кліком."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh bảng lên",
        "body": "Ảnh chụp, scan hoặc screenshot của bất kỳ bảng hoặc bảng tính nào."
      },
      {
        "title": "AI đọc từng ô",
        "body": "Hàng và cột được tái tạo thành dữ liệu sạch sẽ."
      },
      {
        "title": "Xuất dữ liệu",
        "body": "Tải xuống dạng Excel (.xlsx), CSV hoặc JSON — một cú nhấp."
      }
    ],
    "zh": [
      {
        "title": "上传表格图片",
        "body": "任意表格或电子表格的照片、扫描件或截图均可。"
      },
      {
        "title": "AI 识别单元格",
        "body": "行列结构重建为整洁的数据格式。"
      },
      {
        "title": "导出数据",
        "body": "一键下载为 Excel（.xlsx）、CSV 或 JSON。"
      }
    ]
  },
  "image-to-text": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "JPEG أو PNG أو WebP أو BMP أو TIFF — تبقى على جهازك."
      },
      {
        "title": "اختر اللغة",
        "body": "12 لغة شائعة مدعومة جاهزةً."
      },
      {
        "title": "احصل على النص",
        "body": "انسخه أو حمّله كـ .txt."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "JPEG, PNG, WebP, BMP nebo TIFF — zůstane na vašem zařízení."
      },
      {
        "title": "Vyberte jazyk",
        "body": "Podporováno 12 běžných jazyků."
      },
      {
        "title": "Získejte text",
        "body": "Zkopírujte nebo stáhněte jako .txt."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "JPEG, PNG, WebP, BMP oder TIFF — bleibt auf deinem Gerät."
      },
      {
        "title": "Sprache wählen",
        "body": "12 gängige Sprachen direkt unterstützt."
      },
      {
        "title": "Text erhalten",
        "body": "Kopieren oder als .txt herunterladen."
      }
    ],
    "es": [
      {
        "title": "Sube una imagen",
        "body": "JPEG, PNG, WebP, BMP o TIFF — se queda en tu dispositivo."
      },
      {
        "title": "Elige el idioma",
        "body": "12 idiomas habituales disponibles de serie."
      },
      {
        "title": "Obtén el texto",
        "body": "Cópialo o descárgalo como .txt."
      }
    ],
    "fr": [
      {
        "title": "Importez une image",
        "body": "JPEG, PNG, WebP, BMP ou TIFF — reste sur votre appareil."
      },
      {
        "title": "Choisissez la langue",
        "body": "12 langues courantes prises en charge d'emblée."
      },
      {
        "title": "Récupérez le texte",
        "body": "Copiez-le ou téléchargez-le en .txt."
      }
    ],
    "hi": [
      {
        "title": "एक इमेज अपलोड करें",
        "body": "JPEG, PNG, WebP, BMP या TIFF — आपके डिवाइस पर रहती है।"
      },
      {
        "title": "भाषा चुनें",
        "body": "12 सामान्य भाषाएं बिल्ट-इन सपोर्टेड।"
      },
      {
        "title": "टेक्स्ट पाएं",
        "body": "कॉपी करें या .txt के रूप में डाउनलोड करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambar",
        "body": "JPEG, PNG, WebP, BMP, atau TIFF — tetap di perangkatmu."
      },
      {
        "title": "Pilih bahasanya",
        "body": "12 bahasa umum didukung sejak awal."
      },
      {
        "title": "Dapatkan teksnya",
        "body": "Salin atau unduh sebagai .txt."
      }
    ],
    "it": [
      {
        "title": "Carica un'immagine",
        "body": "JPEG, PNG, WebP, BMP o TIFF — rimane sul tuo dispositivo."
      },
      {
        "title": "Scegli la lingua",
        "body": "12 lingue comuni supportate di default."
      },
      {
        "title": "Ottieni il testo",
        "body": "Copiali o scaricali come file .txt."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "JPEG、PNG、WebP、BMP または TIFF。デバイス上に保持されます。"
      },
      {
        "title": "言語を選択",
        "body": "一般的な12言語が標準搭載。"
      },
      {
        "title": "テキストを取得",
        "body": "コピーまたは .txt としてダウンロード。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "JPEG, PNG, WebP, BMP 또는 TIFF — 기기에 머무릅니다."
      },
      {
        "title": "언어 선택",
        "body": "기본 제공 12개 주요 언어 지원."
      },
      {
        "title": "텍스트 받기",
        "body": "복사하거나 .txt로 다운로드하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload een afbeelding",
        "body": "JPEG, PNG, WebP, BMP of TIFF — blijft op je apparaat."
      },
      {
        "title": "Kies de taal",
        "body": "12 veelgebruikte talen standaard ondersteund."
      },
      {
        "title": "Ontvang de tekst",
        "body": "Kopiëren of downloaden als .txt."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "JPEG, PNG, WebP, BMP lub TIFF — zostaje na Twoim urządzeniu."
      },
      {
        "title": "Wybierz język",
        "body": "Obsługiwanych 12 popularnych języków od razu po instalacji."
      },
      {
        "title": "Otrzymaj tekst",
        "body": "Skopiuj lub pobierz jako plik .txt."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma imagem",
        "body": "JPEG, PNG, WebP, BMP ou TIFF — fica no seu dispositivo."
      },
      {
        "title": "Escolha o idioma",
        "body": "12 idiomas comuns suportados de raiz."
      },
      {
        "title": "Obtenha o texto",
        "body": "Copie ou baixe como .txt."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPEG, PNG, WebP, BMP или TIFF — остаётся на вашем устройстве."
      },
      {
        "title": "Выберите язык",
        "body": "12 распространённых языков поддерживаются из коробки."
      },
      {
        "title": "Получите текст",
        "body": "Скопируйте или скачайте как .txt."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en bild",
        "body": "JPEG, PNG, WebP, BMP eller TIFF — stannar på din enhet."
      },
      {
        "title": "Välj språk",
        "body": "12 vanliga språk stöds direkt."
      },
      {
        "title": "Hämta texten",
        "body": "Kopiera eller ladda ned som .txt."
      }
    ],
    "tr": [
      {
        "title": "Görsel yükle",
        "body": "JPEG, PNG, WebP, BMP veya TIFF — cihazında kalır."
      },
      {
        "title": "Dili seç",
        "body": "Hazır olarak 12 yaygın dil desteklenir."
      },
      {
        "title": "Metni al",
        "body": "Kopyala veya .txt olarak indir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPEG, PNG, WebP, BMP або TIFF — залишається на пристрої."
      },
      {
        "title": "Оберіть мову",
        "body": "Підтримується 12 поширених мов із коробки."
      },
      {
        "title": "Отримайте текст",
        "body": "Скопіюйте або завантажте як .txt."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "JPEG, PNG, WebP, BMP hoặc TIFF — ở lại trên thiết bị của bạn."
      },
      {
        "title": "Chọn ngôn ngữ",
        "body": "Hỗ trợ 12 ngôn ngữ phổ biến ngay từ đầu."
      },
      {
        "title": "Lấy văn bản",
        "body": "Sao chép hoặc tải xuống dạng .txt."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "支持 JPEG、PNG、WebP、BMP 或 TIFF，文件保留在本地设备。"
      },
      {
        "title": "选择语言",
        "body": "内置支持 12 种常用语言。"
      },
      {
        "title": "获取文字",
        "body": "复制或下载为 .txt 文件。"
      }
    ]
  },
  "images-to-gif": {
    "ar": [
      {
        "title": "أسقط صورك",
        "body": "إطاران أو أكثر — اسحب لإعادة الترتيب."
      },
      {
        "title": "اضبط التوقيت والحجم",
        "body": "تأخير الإطار والحجم والتكرار."
      },
      {
        "title": "ابن GIF",
        "body": "مُرمَّز في Web Worker، يُنزَّل فورًا."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte obrázky",
        "body": "2 nebo více snímků — přetažením změňte pořadí."
      },
      {
        "title": "Nastavte časování a velikost",
        "body": "Zpoždění snímků, výstupní velikost, smyčka."
      },
      {
        "title": "Vytvořte GIF",
        "body": "Zakódováno ve Web Workeru, stáhne se okamžitě."
      }
    ],
    "de": [
      {
        "title": "Bilder ablegen",
        "body": "2 oder mehr Frames — per Drag-and-Drop neu anordnen."
      },
      {
        "title": "Timing und Größe festlegen",
        "body": "Frame-Verzögerung, Ausgabegröße, Schleife."
      },
      {
        "title": "GIF erstellen",
        "body": "In einem Web Worker kodiert — sofortiger Download."
      }
    ],
    "es": [
      {
        "title": "Arrastra tus imágenes",
        "body": "2 o más fotogramas — arrástralos para reordenarlos."
      },
      {
        "title": "Configura la duración y el tamaño",
        "body": "Retardo por fotograma, tamaño de salida, bucle."
      },
      {
        "title": "Genera el GIF",
        "body": "Codificado en un Web Worker, se descarga al instante."
      }
    ],
    "fr": [
      {
        "title": "Déposez vos images",
        "body": "2 images ou plus — glissez pour réordonner."
      },
      {
        "title": "Définissez le timing et la taille",
        "body": "Délai entre les images, taille de sortie, boucle."
      },
      {
        "title": "Créez le GIF",
        "body": "Encodé dans un Web Worker, téléchargement instantané."
      }
    ],
    "hi": [
      {
        "title": "अपनी इमेज डालें",
        "body": "2 या अधिक फ्रेम — ड्रैग करके क्रम बदलें।"
      },
      {
        "title": "टाइमिंग और साइज़ सेट करें",
        "body": "फ्रेम देरी, आउटपुट साइज़, लूप।"
      },
      {
        "title": "GIF बनाएं",
        "body": "Web Worker में एनकोड होता है, तुरंत डाउनलोड होता है।"
      }
    ],
    "id": [
      {
        "title": "Seret gambar-gambarmu",
        "body": "2 frame atau lebih — drag untuk mengatur urutan."
      },
      {
        "title": "Atur waktu dan ukuran",
        "body": "Jeda frame, ukuran keluaran, pengulangan."
      },
      {
        "title": "Buat GIF",
        "body": "Di-encode di Web Worker, langsung terunduh."
      }
    ],
    "it": [
      {
        "title": "Trascina le tue immagini",
        "body": "2 o più frame — trascina per riordinare."
      },
      {
        "title": "Imposta timing e dimensioni",
        "body": "Ritardo tra frame, dimensione di output, loop."
      },
      {
        "title": "Crea il GIF",
        "body": "Codificato in un Web Worker, il download è immediato."
      }
    ],
    "ja": [
      {
        "title": "画像をドロップ",
        "body": "2フレーム以上。ドラッグで順番を変更。"
      },
      {
        "title": "タイミングとサイズを設定",
        "body": "フレーム間隔・出力サイズ・ループ回数。"
      },
      {
        "title": "GIFを生成",
        "body": "Web Worker でエンコードされ、即座にダウンロード。"
      }
    ],
    "ko": [
      {
        "title": "이미지 드롭",
        "body": "2장 이상의 프레임 — 드래그로 순서를 조정하세요."
      },
      {
        "title": "타이밍 및 크기 설정",
        "body": "프레임 딜레이, 출력 크기, 루프."
      },
      {
        "title": "GIF 생성",
        "body": "Web Worker에서 인코딩되어 즉시 다운로드됩니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep je afbeeldingen hierheen",
        "body": "2 of meer frames — sleep om te herordenen."
      },
      {
        "title": "Stel timing en grootte in",
        "body": "Framevertraging, uitvoergrootte, herhaling."
      },
      {
        "title": "GIF bouwen",
        "body": "Gecodeerd in een Web Worker, direct te downloaden."
      }
    ],
    "pl": [
      {
        "title": "Upuść obrazy",
        "body": "2 lub więcej klatek — przeciągnij, aby zmienić kolejność."
      },
      {
        "title": "Ustaw czas i rozmiar",
        "body": "Opóźnienie klatek, rozmiar wyjściowy, pętla."
      },
      {
        "title": "Utwórz GIF",
        "body": "Kodowany w Web Workerze, pobierany natychmiast."
      }
    ],
    "pt": [
      {
        "title": "Arraste as suas imagens",
        "body": "2 ou mais frames — arraste para reordenar."
      },
      {
        "title": "Defina o timing e o tamanho",
        "body": "Atraso por frame, tamanho de saída, loop."
      },
      {
        "title": "Crie o GIF",
        "body": "Codificado num Web Worker, disponível para download instantâneo."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображения",
        "body": "2 и более кадра — перетаскивайте для изменения порядка."
      },
      {
        "title": "Настройте тайминг и размер",
        "body": "Задержка кадра, размер вывода, зацикливание."
      },
      {
        "title": "Создайте GIF",
        "body": "Кодируется в Web Worker, скачивается мгновенно."
      }
    ],
    "sv": [
      {
        "title": "Släpp dina bilder",
        "body": "2 eller fler bildrutor — drag för att ordna om."
      },
      {
        "title": "Ange timing och storlek",
        "body": "Bildruta-fördröjning, utdatastorlek, loop."
      },
      {
        "title": "Bygg GIF",
        "body": "Kodas i en Web Worker, laddas ned direkt."
      }
    ],
    "tr": [
      {
        "title": "Görsellerini bırak",
        "body": "2 veya daha fazla kare — sıralamak için sürükle."
      },
      {
        "title": "Zamanlama ve boyut ayarla",
        "body": "Kare gecikmesi, çıktı boyutu, döngü."
      },
      {
        "title": "GIF oluştur",
        "body": "Web Worker'da kodlanır, anında indirilir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "2 і більше кадрів — перетягуйте для зміни порядку."
      },
      {
        "title": "Налаштуйте тайминг і розмір",
        "body": "Затримка кадру, вихідний розмір, зациклення."
      },
      {
        "title": "Створіть GIF",
        "body": "Кодування у Web Worker, завантаження миттєве."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh vào đây",
        "body": "Từ 2 khung hình trở lên — kéo để sắp xếp lại thứ tự."
      },
      {
        "title": "Đặt thời gian và kích thước",
        "body": "Độ trễ khung hình, kích thước đầu ra, lặp lại."
      },
      {
        "title": "Tạo GIF",
        "body": "Mã hóa trong Web Worker, tải xuống ngay lập tức."
      }
    ],
    "zh": [
      {
        "title": "拖入图片",
        "body": "2 帧或更多，拖拽调整顺序。"
      },
      {
        "title": "设置时间和尺寸",
        "body": "帧延迟、输出尺寸和循环设置。"
      },
      {
        "title": "生成 GIF",
        "body": "在 Web Worker 中编码，即刻下载。"
      }
    ]
  },
  "json-to-csv": {
    "ar": [
      {
        "title": "الصق مصفوفة JSON",
        "body": "مصفوفة من الكائنات، كما في مخرجات API."
      },
      {
        "title": "اكتشاف تلقائي للأعمدة",
        "body": "نجمع كل المفاتيح عبر الصفوف في ترويسات CSV."
      },
      {
        "title": "حمّل CSV",
        "body": "افتحه مباشرةً في Excel أو Sheets أو Numbers."
      }
    ],
    "cs": [
      {
        "title": "Vložte pole JSON",
        "body": "Pole objektů, například výstup z API."
      },
      {
        "title": "Automatická detekce sloupců",
        "body": "Shromáždíme všechny klíče z řádků jako záhlaví CSV."
      },
      {
        "title": "Stáhněte CSV",
        "body": "Otevřete přímo v Excel, Sheets nebo Numbers."
      }
    ],
    "de": [
      {
        "title": "JSON-Array einfügen",
        "body": "Ein Array von Objekten, wie z. B. API-Output."
      },
      {
        "title": "Spalten automatisch erkennen",
        "body": "Wir sammeln alle Schlüssel aller Zeilen als CSV-Header."
      },
      {
        "title": "CSV herunterladen",
        "body": "Direkt in Excel, Sheets oder Numbers öffnen."
      }
    ],
    "es": [
      {
        "title": "Pega un array JSON",
        "body": "Un array de objetos, como la salida de una API."
      },
      {
        "title": "Detección automática de columnas",
        "body": "Recopilamos todas las claves de las filas y las convertimos en cabeceras CSV."
      },
      {
        "title": "Descarga el CSV",
        "body": "Ábrelo directamente en Excel, Sheets o Numbers."
      }
    ],
    "fr": [
      {
        "title": "Collez un tableau JSON",
        "body": "Un tableau d'objets, comme les sorties d'une API."
      },
      {
        "title": "Colonnes détectées automatiquement",
        "body": "Nous collectons toutes les clés des lignes pour en faire des en-têtes CSV."
      },
      {
        "title": "Téléchargez le CSV",
        "body": "Ouvrez-le directement dans Excel, Sheets ou Numbers."
      }
    ],
    "hi": [
      {
        "title": "JSON अरे पेस्ट करें",
        "body": "ऑब्जेक्ट्स का एक अरे, जैसे API आउटपुट।"
      },
      {
        "title": "कॉलम ऑटो-डिटेक्ट",
        "body": "हम पंक्तियों में हर key को CSV हेडर में इकट्ठा करते हैं।"
      },
      {
        "title": "CSV डाउनलोड करें",
        "body": "सीधे Excel, Sheets या Numbers में खोलें।"
      }
    ],
    "id": [
      {
        "title": "Tempel array JSON",
        "body": "Array objek, seperti keluaran API."
      },
      {
        "title": "Deteksi kolom otomatis",
        "body": "Kami mengumpulkan setiap kunci dari semua baris menjadi header CSV."
      },
      {
        "title": "Unduh CSV",
        "body": "Buka langsung di Excel, Sheets, atau Numbers."
      }
    ],
    "it": [
      {
        "title": "Incolla un array JSON",
        "body": "Un array di oggetti, come l'output di un'API."
      },
      {
        "title": "Rilevamento automatico delle colonne",
        "body": "Raccogliamo tutte le chiavi presenti nelle righe come intestazioni CSV."
      },
      {
        "title": "Scarica il file CSV",
        "body": "Aprilo direttamente in Excel, Sheets o Numbers."
      }
    ],
    "ja": [
      {
        "title": "JSONの配列をペースト",
        "body": "APIの出力など、オブジェクトの配列形式。"
      },
      {
        "title": "列を自動検出",
        "body": "全行のキーを収集して CSV ヘッダーに変換。"
      },
      {
        "title": "CSV をダウンロード",
        "body": "Excel、Sheets、Numbers にそのまま開けます。"
      }
    ],
    "ko": [
      {
        "title": "JSON 배열 붙여넣기",
        "body": "API 출력처럼 객체 배열 형태여야 합니다."
      },
      {
        "title": "열 자동 감지",
        "body": "모든 행의 키를 수집해 CSV 헤더로 만듭니다."
      },
      {
        "title": "CSV 다운로드",
        "body": "Excel, Sheets 또는 Numbers에서 바로 열 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak een JSON-array",
        "body": "Een array van objecten, zoals API-uitvoer."
      },
      {
        "title": "Automatische kolomdetectie",
        "body": "We verzamelen elke sleutel uit alle rijen als CSV-header."
      },
      {
        "title": "Download de CSV",
        "body": "Meteen openen in Excel, Sheets of Numbers."
      }
    ],
    "pl": [
      {
        "title": "Wklej tablicę JSON",
        "body": "Tablica obiektów, np. wynik z API."
      },
      {
        "title": "Automatyczne wykrywanie kolumn",
        "body": "Zbieramy wszystkie klucze z wierszy jako nagłówki CSV."
      },
      {
        "title": "Pobierz plik CSV",
        "body": "Otwórz od razu w Excel, Sheets lub Numbers."
      }
    ],
    "pt": [
      {
        "title": "Cole um array JSON",
        "body": "Um array de objetos, como a saída de uma API."
      },
      {
        "title": "Deteção automática de colunas",
        "body": "Recolhemos todas as chaves das linhas para os cabeçalhos do CSV."
      },
      {
        "title": "Baixe o CSV",
        "body": "Abra diretamente no Excel, Sheets ou Numbers."
      }
    ],
    "ru": [
      {
        "title": "Вставьте JSON-массив",
        "body": "Массив объектов, например вывод API."
      },
      {
        "title": "Автоопределение столбцов",
        "body": "Все ключи из каждой строки собираются в заголовки CSV."
      },
      {
        "title": "Скачайте CSV",
        "body": "Открывайте прямо в Excel, Sheets или Numbers."
      }
    ],
    "sv": [
      {
        "title": "Klistra in en JSON-array",
        "body": "En array av objekt, som API-utdata."
      },
      {
        "title": "Automatisk kolumnidentifiering",
        "body": "Vi samlar varje nyckel från alla rader till CSV-rubriker."
      },
      {
        "title": "Ladda ned CSV:en",
        "body": "Öppna den direkt i Excel, Sheets eller Numbers."
      }
    ],
    "tr": [
      {
        "title": "JSON dizisi yapıştır",
        "body": "API çıktısı gibi nesnelerden oluşan bir dizi."
      },
      {
        "title": "Sütunları otomatik algıla",
        "body": "Tüm satırlardaki her anahtarı toplayıp CSV başlıklarına dönüştürürüz."
      },
      {
        "title": "CSV dosyasını indir",
        "body": "Doğrudan Excel, Sheets veya Numbers'da aç."
      }
    ],
    "uk": [
      {
        "title": "Вставте JSON-масив",
        "body": "Масив обʼєктів, наприклад вивід API."
      },
      {
        "title": "Автовизначення стовпців",
        "body": "Ми збираємо всі ключі з рядків у заголовки CSV."
      },
      {
        "title": "Завантажте CSV",
        "body": "Відкривайте одразу в Excel, Sheets або Numbers."
      }
    ],
    "vi": [
      {
        "title": "Dán mảng JSON vào đây",
        "body": "Một mảng các đối tượng, chẳng hạn như dữ liệu đầu ra của API."
      },
      {
        "title": "Tự động nhận diện cột",
        "body": "Chúng tôi thu thập tất cả khóa từ các hàng thành tiêu đề CSV."
      },
      {
        "title": "Tải xuống file CSV",
        "body": "Mở thẳng trong Excel, Sheets hoặc Numbers."
      }
    ],
    "zh": [
      {
        "title": "粘贴 JSON 数组",
        "body": "对象数组格式，例如 API 返回的数据。"
      },
      {
        "title": "自动检测列",
        "body": "提取所有行中的键名作为 CSV 标题行。"
      },
      {
        "title": "下载 CSV",
        "body": "可直接在 Excel、Sheets 或 Numbers 中打开。"
      }
    ]
  },
  "json-to-sql": {
    "ar": [
      {
        "title": "الصق مصفوفة JSON",
        "body": "مصفوفة من الكائنات المسطّحة."
      },
      {
        "title": "سمّ الجدول",
        "body": "يُستخدم في جملة INSERT المولَّدة."
      },
      {
        "title": "انسخ SQL",
        "body": "جاهز للتشغيل، أو للعودة إلى JSON."
      }
    ],
    "cs": [
      {
        "title": "Vložte pole JSON",
        "body": "Pole plochých objektů."
      },
      {
        "title": "Pojmenujte tabulku",
        "body": "Použije se ve vygenerovaném INSERT."
      },
      {
        "title": "Zkopírujte SQL",
        "body": "Připraveno ke spuštění, nebo přepněte zpět na JSON."
      }
    ],
    "de": [
      {
        "title": "JSON-Array einfügen",
        "body": "Ein Array flacher Objekte."
      },
      {
        "title": "Tabellennamen festlegen",
        "body": "Wird im generierten INSERT verwendet."
      },
      {
        "title": "SQL kopieren",
        "body": "Sofort ausführbar — oder zurück in JSON umwandeln."
      }
    ],
    "es": [
      {
        "title": "Pega un array JSON",
        "body": "Un array de objetos planos."
      },
      {
        "title": "Nombra la tabla",
        "body": "Se usará en el INSERT generado."
      },
      {
        "title": "Copia el SQL",
        "body": "Listo para ejecutar, o vuélvelo a convertir a JSON."
      }
    ],
    "fr": [
      {
        "title": "Collez un tableau JSON",
        "body": "Un tableau d'objets plats."
      },
      {
        "title": "Nommez la table",
        "body": "Utilisé dans l'INSERT généré."
      },
      {
        "title": "Copiez le SQL",
        "body": "Prêt à exécuter, ou à reconvertir en JSON."
      }
    ],
    "hi": [
      {
        "title": "JSON अरे पेस्ट करें",
        "body": "फ्लैट ऑब्जेक्ट्स का एक अरे।"
      },
      {
        "title": "टेबल का नाम दें",
        "body": "जेनरेट किए गए INSERT में उपयोग होगा।"
      },
      {
        "title": "SQL कॉपी करें",
        "body": "चलाने के लिए तैयार, या JSON पर वापस जाएं।"
      }
    ],
    "id": [
      {
        "title": "Tempel array JSON",
        "body": "Array objek datar."
      },
      {
        "title": "Beri nama tabel",
        "body": "Digunakan dalam INSERT yang dihasilkan."
      },
      {
        "title": "Salin SQL",
        "body": "Siap dijalankan, atau balik kembali ke JSON."
      }
    ],
    "it": [
      {
        "title": "Incolla un array JSON",
        "body": "Un array di oggetti semplici."
      },
      {
        "title": "Dai un nome alla tabella",
        "body": "Viene usato nell'INSERT generato."
      },
      {
        "title": "Copia il SQL",
        "body": "Pronto da eseguire, oppure converti di nuovo in JSON."
      }
    ],
    "ja": [
      {
        "title": "JSONの配列をペースト",
        "body": "フラットなオブジェクトの配列。"
      },
      {
        "title": "テーブル名を入力",
        "body": "生成される INSERT 文で使用されます。"
      },
      {
        "title": "SQLをコピー",
        "body": "そのまま実行できます。JSONに戻すことも可能。"
      }
    ],
    "ko": [
      {
        "title": "JSON 배열 붙여넣기",
        "body": "단순 객체의 배열이어야 합니다."
      },
      {
        "title": "테이블 이름 지정",
        "body": "생성되는 INSERT 구문에 사용됩니다."
      },
      {
        "title": "SQL 복사",
        "body": "바로 실행하거나 JSON으로 되돌릴 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak een JSON-array",
        "body": "Een array van platte objecten."
      },
      {
        "title": "Geef de tabel een naam",
        "body": "Gebruikt in de gegenereerde INSERT."
      },
      {
        "title": "Kopieer de SQL",
        "body": "Direct uitvoerbaar, of terug omzetten naar JSON."
      }
    ],
    "pl": [
      {
        "title": "Wklej tablicę JSON",
        "body": "Tablica płaskich obiektów."
      },
      {
        "title": "Podaj nazwę tabeli",
        "body": "Zostanie użyta w wygenerowanej instrukcji INSERT."
      },
      {
        "title": "Skopiuj SQL",
        "body": "Gotowy do uruchomienia lub do ponownej konwersji na JSON."
      }
    ],
    "pt": [
      {
        "title": "Cole um array JSON",
        "body": "Um array de objetos simples."
      },
      {
        "title": "Dê um nome à tabela",
        "body": "Usado no INSERT gerado."
      },
      {
        "title": "Copie o SQL",
        "body": "Pronto para executar, ou converta de volta para JSON."
      }
    ],
    "ru": [
      {
        "title": "Вставьте JSON-массив",
        "body": "Массив плоских объектов."
      },
      {
        "title": "Введите имя таблицы",
        "body": "Используется в сгенерированном INSERT."
      },
      {
        "title": "Скопируйте SQL",
        "body": "Готов к выполнению или обратной конвертации в JSON."
      }
    ],
    "sv": [
      {
        "title": "Klistra in en JSON-array",
        "body": "En array av platta objekt."
      },
      {
        "title": "Namnge tabellen",
        "body": "Används i den genererade INSERT:en."
      },
      {
        "title": "Kopiera SQL:en",
        "body": "Redo att köra, eller konvertera tillbaka till JSON."
      }
    ],
    "tr": [
      {
        "title": "JSON dizisi yapıştır",
        "body": "Düz nesnelerden oluşan bir dizi."
      },
      {
        "title": "Tablo adını ver",
        "body": "Oluşturulan INSERT sorgusunda kullanılır."
      },
      {
        "title": "SQL'i kopyala",
        "body": "Çalıştırmaya hazır ya da JSON'a geri çevir."
      }
    ],
    "uk": [
      {
        "title": "Вставте JSON-масив",
        "body": "Масив простих обʼєктів."
      },
      {
        "title": "Назвіть таблицю",
        "body": "Назва використовується у згенерованому INSERT."
      },
      {
        "title": "Скопіюйте SQL",
        "body": "Готово до виконання або конвертації назад у JSON."
      }
    ],
    "vi": [
      {
        "title": "Dán mảng JSON vào đây",
        "body": "Một mảng các đối tượng phẳng."
      },
      {
        "title": "Đặt tên bảng",
        "body": "Dùng trong câu lệnh INSERT được tạo ra."
      },
      {
        "title": "Sao chép SQL",
        "body": "Chạy được ngay, hoặc chuyển ngược về JSON."
      }
    ],
    "zh": [
      {
        "title": "粘贴 JSON 数组",
        "body": "扁平对象数组格式。"
      },
      {
        "title": "命名表名",
        "body": "用于生成的 INSERT 语句中。"
      },
      {
        "title": "复制 SQL",
        "body": "可直接执行，或转换回 JSON。"
      }
    ]
  },
  "json-to-xml": {
    "ar": [
      {
        "title": "الصق JSON الخاص بك",
        "body": "الكائنات والمصفوفات مدعومة."
      },
      {
        "title": "تحويل إلى XML",
        "body": "المفاتيح تصبح وسوم؛ المصفوفات تصبح عناصر <item> متكررة."
      },
      {
        "title": "حمّل XML",
        "body": "مُشكَّل بصحة وجاهز للاستخدام."
      }
    ],
    "cs": [
      {
        "title": "Vložte JSON",
        "body": "Objekty i pole jsou podporovány."
      },
      {
        "title": "Převeďte na XML",
        "body": "Klíče se stanou tagy; pole se stanou opakovanými elementy <item>."
      },
      {
        "title": "Stáhněte XML",
        "body": "Správně strukturované a připravené k použití."
      }
    ],
    "de": [
      {
        "title": "JSON einfügen",
        "body": "Objekte und Arrays werden beide unterstützt."
      },
      {
        "title": "In XML umwandeln",
        "body": "Schlüssel werden zu Tags; Arrays zu wiederholten <item>-Elementen."
      },
      {
        "title": "XML herunterladen",
        "body": "Wohlgeformt und direkt einsatzbereit."
      }
    ],
    "es": [
      {
        "title": "Pega tu JSON",
        "body": "Se admiten tanto objetos como arrays."
      },
      {
        "title": "Convierte a XML",
        "body": "Las claves se convierten en etiquetas; los arrays en elementos <item> repetidos."
      },
      {
        "title": "Descarga el XML",
        "body": "Bien formado y listo para usar."
      }
    ],
    "fr": [
      {
        "title": "Collez votre JSON",
        "body": "Objets et tableaux sont tous les deux pris en charge."
      },
      {
        "title": "Convertissez en XML",
        "body": "Les clés deviennent des balises ; les tableaux deviennent des éléments répétés."
      },
      {
        "title": "Téléchargez le XML",
        "body": "Bien formé et prêt à l'emploi."
      }
    ],
    "hi": [
      {
        "title": "अपना JSON पेस्ट करें",
        "body": "ऑब्जेक्ट्स और अरे दोनों सपोर्टेड।"
      },
      {
        "title": "XML में कन्वर्ट करें",
        "body": "Keys टैग बन जाते हैं; अरे रिपीटेड <item> एलिमेंट बनते हैं।"
      },
      {
        "title": "XML डाउनलोड करें",
        "body": "वेल-फॉर्म्ड और उपयोग के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Tempel JSON kamu",
        "body": "Objek dan array keduanya didukung."
      },
      {
        "title": "Konversi ke XML",
        "body": "Kunci menjadi tag; array menjadi elemen <item> yang berulang."
      },
      {
        "title": "Unduh XML",
        "body": "Terformat dengan baik dan siap digunakan."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo JSON",
        "body": "Oggetti e array sono entrambi supportati."
      },
      {
        "title": "Converti in XML",
        "body": "Le chiavi diventano tag; gli array diventano elementi <item> ripetuti."
      },
      {
        "title": "Scarica il file XML",
        "body": "Ben formato e pronto all'uso."
      }
    ],
    "ja": [
      {
        "title": "JSONをペースト",
        "body": "オブジェクトと配列の両方に対応。"
      },
      {
        "title": "XMLに変換",
        "body": "キーがタグになり、配列は繰り返しの <item> 要素になります。"
      },
      {
        "title": "XMLをダウンロード",
        "body": "整形式のXMLがすぐに使えます。"
      }
    ],
    "ko": [
      {
        "title": "JSON 붙여넣기",
        "body": "객체와 배열 모두 지원합니다."
      },
      {
        "title": "XML로 변환",
        "body": "키가 태그가 되고, 배열은 반복되는 <item> 요소가 됩니다."
      },
      {
        "title": "XML 다운로드",
        "body": "올바른 형식으로 바로 사용할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je JSON",
        "body": "Objecten en arrays worden beide ondersteund."
      },
      {
        "title": "Converteren naar XML",
        "body": "Sleutels worden tags; arrays worden herhaalde <item>-elementen."
      },
      {
        "title": "Download de XML",
        "body": "Goed opgemaakte, direct bruikbare XML."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój JSON",
        "body": "Obsługiwane są zarówno obiekty, jak i tablice."
      },
      {
        "title": "Konwertuj do XML",
        "body": "Klucze stają się tagami; tablice przekształcają się w powtarzające się elementy <item>."
      },
      {
        "title": "Pobierz plik XML",
        "body": "Poprawnie sformułowany i gotowy do użycia."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu JSON",
        "body": "Objetos e arrays — ambos suportados."
      },
      {
        "title": "Converta para XML",
        "body": "As chaves tornam-se tags; os arrays tornam-se elementos <item> repetidos."
      },
      {
        "title": "Baixe o XML",
        "body": "Bem formado e pronto a usar."
      }
    ],
    "ru": [
      {
        "title": "Вставьте JSON",
        "body": "Поддерживаются объекты и массивы."
      },
      {
        "title": "Конвертация в XML",
        "body": "Ключи становятся тегами, массивы — повторяющимися элементами <item>."
      },
      {
        "title": "Скачайте XML",
        "body": "Корректно сформированный, готов к использованию."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din JSON",
        "body": "Objekt och arrayer stöds båda."
      },
      {
        "title": "Konvertera till XML",
        "body": "Nycklar blir taggar; arrayer blir upprepade <item>-element."
      },
      {
        "title": "Ladda ned XML:en",
        "body": "Välformad och redo att använda."
      }
    ],
    "tr": [
      {
        "title": "JSON'unu yapıştır",
        "body": "Nesneler ve diziler desteklenir."
      },
      {
        "title": "XML'e dönüştür",
        "body": "Anahtarlar etiket olur; diziler tekrarlanan <item> öğelerine dönüşür."
      },
      {
        "title": "XML dosyasını indir",
        "body": "Düzgün biçimlendirilmiş ve kullanıma hazır."
      }
    ],
    "uk": [
      {
        "title": "Вставте JSON",
        "body": "Підтримуються обʼєкти і масиви."
      },
      {
        "title": "Конвертуйте у XML",
        "body": "Ключі стають тегами; масиви — повторюваними елементами <item>."
      },
      {
        "title": "Завантажте XML",
        "body": "Коректний формат, готовий до використання."
      }
    ],
    "vi": [
      {
        "title": "Dán JSON vào đây",
        "body": "Hỗ trợ cả đối tượng lẫn mảng."
      },
      {
        "title": "Chuyển sang XML",
        "body": "Khóa thành thẻ; mảng thành các phần tử <item> lặp lại."
      },
      {
        "title": "Tải xuống file XML",
        "body": "Đúng cú pháp, sẵn sàng sử dụng."
      }
    ],
    "zh": [
      {
        "title": "粘贴 JSON",
        "body": "对象和数组均支持。"
      },
      {
        "title": "转换为 XML",
        "body": "键名转为标签，数组转为重复的 <item> 元素。"
      },
      {
        "title": "下载 XML 文件",
        "body": "格式规范，即取即用。"
      }
    ]
  },
  "json-to-yaml": {
    "ar": [
      {
        "title": "الصق JSON الخاص بك",
        "body": "الكائنات والمصفوفات والقيم المفردة مدعومة."
      },
      {
        "title": "تحويل إلى YAML",
        "body": "مخرجات مبنية على المسافات البادئة، مقروءة للإنسان."
      },
      {
        "title": "حمّل YAML",
        "body": "أسقطه مباشرةً في ملف الإعداد."
      }
    ],
    "cs": [
      {
        "title": "Vložte JSON",
        "body": "Objekty, pole i skaláry jsou podporovány."
      },
      {
        "title": "Převeďte na YAML",
        "body": "Odsazením strukturovaný, lidsky čitelný výstup."
      },
      {
        "title": "Stáhněte YAML",
        "body": "Vložte přímo do své konfigurace."
      }
    ],
    "de": [
      {
        "title": "JSON einfügen",
        "body": "Objekte, Arrays und Skalare werden unterstützt."
      },
      {
        "title": "In YAML umwandeln",
        "body": "Einrückungsbasierte, menschenlesbare Ausgabe."
      },
      {
        "title": "YAML herunterladen",
        "body": "Direkt in deine Konfiguration einbinden."
      }
    ],
    "es": [
      {
        "title": "Pega tu JSON",
        "body": "Se admiten objetos, arrays y valores escalares."
      },
      {
        "title": "Convierte a YAML",
        "body": "Salida legible basada en sangría."
      },
      {
        "title": "Descarga el YAML",
        "body": "Úsalo directamente en tu configuración."
      }
    ],
    "fr": [
      {
        "title": "Collez votre JSON",
        "body": "Objets, tableaux et scalaires pris en charge."
      },
      {
        "title": "Convertissez en YAML",
        "body": "Sortie lisible par l'humain, basée sur l'indentation."
      },
      {
        "title": "Téléchargez le YAML",
        "body": "Glissez-le directement dans votre configuration."
      }
    ],
    "hi": [
      {
        "title": "अपना JSON पेस्ट करें",
        "body": "ऑब्जेक्ट्स, अरे और स्केलर सपोर्टेड।"
      },
      {
        "title": "YAML में कन्वर्ट करें",
        "body": "इंडेंटेशन-आधारित, मानव-पठनीय आउटपुट।"
      },
      {
        "title": "YAML डाउनलोड करें",
        "body": "सीधे अपने कॉन्फिग में डालें।"
      }
    ],
    "id": [
      {
        "title": "Tempel JSON kamu",
        "body": "Objek, array, dan skalar didukung."
      },
      {
        "title": "Konversi ke YAML",
        "body": "Keluaran berbasis indentasi yang mudah dibaca manusia."
      },
      {
        "title": "Unduh YAML",
        "body": "Langsung masukkan ke konfigurasi kamu."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo JSON",
        "body": "Oggetti, array e valori scalari supportati."
      },
      {
        "title": "Converti in YAML",
        "body": "Output leggibile dall'uomo, basato sull'indentazione."
      },
      {
        "title": "Scarica il file YAML",
        "body": "Inseriscilo direttamente nella tua configurazione."
      }
    ],
    "ja": [
      {
        "title": "JSONをペースト",
        "body": "オブジェクト・配列・スカラーに対応。"
      },
      {
        "title": "YAMLに変換",
        "body": "インデントベースの人間が読みやすい形式で出力。"
      },
      {
        "title": "YAMLをダウンロード",
        "body": "設定ファイルにそのまま使えます。"
      }
    ],
    "ko": [
      {
        "title": "JSON 붙여넣기",
        "body": "객체, 배열, 스칼라 모두 지원합니다."
      },
      {
        "title": "YAML로 변환",
        "body": "들여쓰기 기반의 사람이 읽기 쉬운 형식으로 출력됩니다."
      },
      {
        "title": "YAML 다운로드",
        "body": "설정 파일에 바로 사용하세요."
      }
    ],
    "nl": [
      {
        "title": "Plak je JSON",
        "body": "Objecten, arrays en scalairs worden ondersteund."
      },
      {
        "title": "Converteren naar YAML",
        "body": "Op inspringing gebaseerde, goed leesbare uitvoer."
      },
      {
        "title": "Download de YAML",
        "body": "Zet het rechtstreeks in je configuratie."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój JSON",
        "body": "Obsługiwane obiekty, tablice i wartości skalarne."
      },
      {
        "title": "Konwertuj do YAML",
        "body": "Czytelny dla człowieka wynik z wcięciami."
      },
      {
        "title": "Pobierz plik YAML",
        "body": "Wrzuć bezpośrednio do swojej konfiguracji."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu JSON",
        "body": "Objetos, arrays e escalares suportados."
      },
      {
        "title": "Converta para YAML",
        "body": "Saída legível por humanos, baseada em indentação."
      },
      {
        "title": "Baixe o YAML",
        "body": "Insira diretamente na sua configuração."
      }
    ],
    "ru": [
      {
        "title": "Вставьте JSON",
        "body": "Поддерживаются объекты, массивы и скаляры."
      },
      {
        "title": "Конвертация в YAML",
        "body": "Читаемый вывод на основе отступов."
      },
      {
        "title": "Скачайте YAML",
        "body": "Вставляйте прямо в конфигурацию."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din JSON",
        "body": "Objekt, arrayer och skalarer stöds."
      },
      {
        "title": "Konvertera till YAML",
        "body": "Indragningsbaserad, lättläst utdata."
      },
      {
        "title": "Ladda ned YAML:en",
        "body": "Lägg den direkt i din konfiguration."
      }
    ],
    "tr": [
      {
        "title": "JSON'unu yapıştır",
        "body": "Nesneler, diziler ve skalarlar desteklenir."
      },
      {
        "title": "YAML'a dönüştür",
        "body": "Girinti tabanlı, insan tarafından okunabilir çıktı."
      },
      {
        "title": "YAML dosyasını indir",
        "body": "Doğrudan yapılandırma dosyana bırak."
      }
    ],
    "uk": [
      {
        "title": "Вставте JSON",
        "body": "Підтримуються обʼєкти, масиви та скалярні значення."
      },
      {
        "title": "Конвертуйте у YAML",
        "body": "Зрозумілий вивід на основі відступів."
      },
      {
        "title": "Завантажте YAML",
        "body": "Одразу в конфігураційний файл."
      }
    ],
    "vi": [
      {
        "title": "Dán JSON vào đây",
        "body": "Hỗ trợ đối tượng, mảng và giá trị đơn."
      },
      {
        "title": "Chuyển sang YAML",
        "body": "Đầu ra dựa trên thụt lề, dễ đọc."
      },
      {
        "title": "Tải xuống file YAML",
        "body": "Dùng thẳng trong cấu hình của bạn."
      }
    ],
    "zh": [
      {
        "title": "粘贴 JSON",
        "body": "支持对象、数组和标量。"
      },
      {
        "title": "转换为 YAML",
        "body": "基于缩进的可读格式输出。"
      },
      {
        "title": "下载 YAML 文件",
        "body": "可直接放入配置文件使用。"
      }
    ]
  },
  "jwt-decoder": {
    "ar": [
      {
        "title": "الصق JWT الخاص بك",
        "body": "الرمز كاملًا: header.payload.signature."
      },
      {
        "title": "فكّ الترميز محليًا",
        "body": "نُفكّ ترميز Base64URL للترويسة والحمولة على الجهاز."
      },
      {
        "title": "افحص المطالبات",
        "body": "اقرأ JSON — لا شيء يُرسَل إلى خادم."
      }
    ],
    "cs": [
      {
        "title": "Vložte JWT",
        "body": "Celý token: header.payload.signature."
      },
      {
        "title": "Dekódujte lokálně",
        "body": "Hlavičku a payload dekódujeme pomocí Base64URL přímo na zařízení."
      },
      {
        "title": "Prozkoumejte nároky",
        "body": "Přečtěte JSON — nic se neposílá na server."
      }
    ],
    "de": [
      {
        "title": "JWT einfügen",
        "body": "Den vollständigen Token: header.payload.signature."
      },
      {
        "title": "Lokal dekodieren",
        "body": "Wir dekodieren Header und Payload per Base64URL auf dem Gerät."
      },
      {
        "title": "Claims einsehen",
        "body": "Das JSON lesen — nichts wird an einen Server gesendet."
      }
    ],
    "es": [
      {
        "title": "Pega tu JWT",
        "body": "El token completo: header.payload.signature."
      },
      {
        "title": "Decodifica localmente",
        "body": "Decodificamos en Base64URL la cabecera y el payload en tu dispositivo."
      },
      {
        "title": "Inspecciona los claims",
        "body": "Lee el JSON — nada se envía a ningún servidor."
      }
    ],
    "fr": [
      {
        "title": "Collez votre JWT",
        "body": "Le token complet : header.payload.signature."
      },
      {
        "title": "Décodez localement",
        "body": "Nous décodons en base64URL le header et le payload sur votre appareil."
      },
      {
        "title": "Inspectez les claims",
        "body": "Lisez le JSON — rien n'est envoyé à un serveur."
      }
    ],
    "hi": [
      {
        "title": "अपना JWT पेस्ट करें",
        "body": "पूरा टोकन: header.payload.signature।"
      },
      {
        "title": "लोकल डीकोड करें",
        "body": "हम डिवाइस पर header और payload को Base64URL-डीकोड करते हैं।"
      },
      {
        "title": "क्लेम्स जांचें",
        "body": "JSON पढ़ें — कुछ भी सर्वर पर नहीं भेजा जाता।"
      }
    ],
    "id": [
      {
        "title": "Tempel JWT kamu",
        "body": "Token lengkap: header.payload.signature."
      },
      {
        "title": "Dekode secara lokal",
        "body": "Kami mendekode header dan payload dengan base64 URL di perangkatmu."
      },
      {
        "title": "Periksa klaim",
        "body": "Baca JSON — tidak ada yang dikirim ke server."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo JWT",
        "body": "Il token completo: header.payload.signature."
      },
      {
        "title": "Decodifica in locale",
        "body": "Decodifichiamo in base64URL l'header e il payload sul tuo dispositivo."
      },
      {
        "title": "Ispeziona i claim",
        "body": "Leggi il JSON — nulla viene inviato a un server."
      }
    ],
    "ja": [
      {
        "title": "JWTをペースト",
        "body": "完全なトークン: header.payload.signature。"
      },
      {
        "title": "ローカルでデコード",
        "body": "ヘッダーとペイロードをデバイス上で Base64URL デコード。"
      },
      {
        "title": "クレームを確認",
        "body": "JSON を読み取ります。サーバーへの送信は一切なし。"
      }
    ],
    "ko": [
      {
        "title": "JWT 붙여넣기",
        "body": "전체 토큰: header.payload.signature 형식으로 입력하세요."
      },
      {
        "title": "로컬에서 디코딩",
        "body": "Base64URL로 인코딩된 헤더와 페이로드를 기기에서 디코딩합니다."
      },
      {
        "title": "클레임 확인",
        "body": "JSON을 읽어보세요 — 서버로는 아무것도 전송되지 않습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je JWT",
        "body": "Het volledige token: header.payload.signature."
      },
      {
        "title": "Lokaal decoderen",
        "body": "We decoderen de header en payload via base64URL op je apparaat."
      },
      {
        "title": "Bekijk de claims",
        "body": "Lees de JSON — er wordt niets naar een server gestuurd."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój JWT",
        "body": "Pełny token: nagłówek.ładunek.podpis."
      },
      {
        "title": "Dekodowanie lokalnie",
        "body": "Dekodujemy base64URL nagłówka i ładunku na Twoim urządzeniu."
      },
      {
        "title": "Sprawdź dane uwierzytelniające",
        "body": "Odczytaj JSON — nic nie jest wysyłane na serwer."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu JWT",
        "body": "O token completo: header.payload.signature."
      },
      {
        "title": "Descodifique localmente",
        "body": "Descodificamos o header e o payload em Base64URL no seu dispositivo."
      },
      {
        "title": "Inspecione os claims",
        "body": "Leia o JSON — nada é enviado para um servidor."
      }
    ],
    "ru": [
      {
        "title": "Вставьте JWT",
        "body": "Полный токен: header.payload.signature."
      },
      {
        "title": "Декодирование на устройстве",
        "body": "Заголовок и полезная нагрузка декодируются через base64URL прямо у вас."
      },
      {
        "title": "Изучите содержимое",
        "body": "Читайте JSON — ничего не отправляется на сервер."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din JWT",
        "body": "Hela token: header.payload.signature."
      },
      {
        "title": "Avkoda lokalt",
        "body": "Vi Base64URL-avkodar header och payload på enheten."
      },
      {
        "title": "Granska anspråken",
        "body": "Läs JSON:en — inget skickas till en server."
      }
    ],
    "tr": [
      {
        "title": "JWT'ni yapıştır",
        "body": "Tam token: başlık.yük.imza."
      },
      {
        "title": "Yerel olarak çöz",
        "body": "Başlık ve yükü cihazında base64URL ile çözeriz."
      },
      {
        "title": "Talepleri incele",
        "body": "JSON'u oku — hiçbir şey sunucuya gönderilmez."
      }
    ],
    "uk": [
      {
        "title": "Вставте JWT",
        "body": "Повний токен: header.payload.signature."
      },
      {
        "title": "Декодування на пристрої",
        "body": "Ми Base64URL-декодуємо заголовок і payload локально."
      },
      {
        "title": "Перегляньте claims",
        "body": "Читайте JSON — нічого не надсилається на сервер."
      }
    ],
    "vi": [
      {
        "title": "Dán JWT vào đây",
        "body": "Token đầy đủ: header.payload.signature."
      },
      {
        "title": "Giải mã cục bộ",
        "body": "Chúng tôi giải mã Base64URL header và payload ngay trên thiết bị."
      },
      {
        "title": "Xem các claim",
        "body": "Đọc JSON — không có gì được gửi lên server."
      }
    ],
    "zh": [
      {
        "title": "粘贴 JWT",
        "body": "完整令牌格式：header.payload.signature。"
      },
      {
        "title": "本地解码",
        "body": "在设备上对 header 和 payload 进行 base64URL 解码。"
      },
      {
        "title": "查看声明内容",
        "body": "直接读取 JSON——数据不会发送到任何服务器。"
      }
    ]
  },
  "magic-link": {
    "ar": [
      {
        "title": "الصق الوجهة",
        "body": "إلى أين يقود الرابط."
      },
      {
        "title": "اضبط الحدود",
        "body": "ينتهي بعد N أيام و/أو بعد N نقرة."
      },
      {
        "title": "شاركه مرة واحدة",
        "body": "يُدمَّر ذاتيًا عند بلوغ الحد."
      }
    ],
    "cs": [
      {
        "title": "Vložte cíl",
        "body": "Kam má odkaz vést."
      },
      {
        "title": "Nastavte limity",
        "body": "Vypršení po N dnech a/nebo po N kliknutích."
      },
      {
        "title": "Sdílejte jednou",
        "body": "Odkaz se sám zničí, jakmile je limit dosažen."
      }
    ],
    "de": [
      {
        "title": "Ziel einfügen",
        "body": "Wohin der Link führen soll."
      },
      {
        "title": "Limits festlegen",
        "body": "Nach N Tagen und/oder N Klicks ablaufen lassen."
      },
      {
        "title": "Einmalig teilen",
        "body": "Er zerstört sich selbst, sobald das Limit erreicht ist."
      }
    ],
    "es": [
      {
        "title": "Pega el destino",
        "body": "Adónde debe llevar el enlace."
      },
      {
        "title": "Establece los límites",
        "body": "Caduca en N días y/o tras N clics."
      },
      {
        "title": "Compártelo una sola vez",
        "body": "Se autodestruye al alcanzar el límite."
      }
    ],
    "fr": [
      {
        "title": "Collez la destination",
        "body": "Vers où le lien doit mener."
      },
      {
        "title": "Définissez les limites",
        "body": "Expiration après N jours et/ou après N clics."
      },
      {
        "title": "Partagez-le une fois",
        "body": "Il s'autodétruit quand la limite est atteinte."
      }
    ],
    "hi": [
      {
        "title": "डेस्टिनेशन पेस्ट करें",
        "body": "लिंक कहाँ ले जाना चाहिए।"
      },
      {
        "title": "सीमाएं सेट करें",
        "body": "N दिन और/या N क्लिक के बाद एक्सपायर।"
      },
      {
        "title": "एक बार शेयर करें",
        "body": "सीमा पहुंचने पर यह खुद नष्ट हो जाता है।"
      }
    ],
    "id": [
      {
        "title": "Tempel tujuan",
        "body": "Ke mana tautan harus mengarah."
      },
      {
        "title": "Atur batasannya",
        "body": "Kedaluwarsa setelah N hari dan/atau setelah N klik."
      },
      {
        "title": "Bagikan sekali",
        "body": "Tautan akan hancur sendiri saat batas tercapai."
      }
    ],
    "it": [
      {
        "title": "Incolla la destinazione",
        "body": "Dove deve portare il link."
      },
      {
        "title": "Imposta i limiti",
        "body": "Scadenza dopo N giorni e/o dopo N clic."
      },
      {
        "title": "Condividilo una volta",
        "body": "Si autodistrugge al raggiungimento del limite."
      }
    ],
    "ja": [
      {
        "title": "遷移先をペースト",
        "body": "リンクが誘導する先のURL。"
      },
      {
        "title": "制限を設定",
        "body": "N日後または N回クリック後に期限切れ。"
      },
      {
        "title": "一度だけ共有",
        "body": "上限に達すると自動的に無効化されます。"
      }
    ],
    "ko": [
      {
        "title": "목적지 붙여넣기",
        "body": "링크가 이동할 주소."
      },
      {
        "title": "제한 설정",
        "body": "N일 후 만료 및/또는 N번 클릭 후 만료."
      },
      {
        "title": "한 번만 공유",
        "body": "제한에 도달하면 자동으로 소멸됩니다."
      }
    ],
    "nl": [
      {
        "title": "Plak de bestemming",
        "body": "Waar de link naartoe moet leiden."
      },
      {
        "title": "Stel de limieten in",
        "body": "Vervalt na N dagen en/of na N klikken."
      },
      {
        "title": "Deel hem eenmalig",
        "body": "Hij vernietigt zichzelf zodra de limiet is bereikt."
      }
    ],
    "pl": [
      {
        "title": "Wklej adres docelowy",
        "body": "Dokąd powinien prowadzić link."
      },
      {
        "title": "Ustaw limity",
        "body": "Wygasa po N dniach i/lub po N kliknięciach."
      },
      {
        "title": "Udostępnij raz",
        "body": "Samoczynnie się dezaktywuje po osiągnięciu limitu."
      }
    ],
    "pt": [
      {
        "title": "Cole o destino",
        "body": "Para onde o link deve levar."
      },
      {
        "title": "Defina os limites",
        "body": "Expire após N dias e/ou após N cliques."
      },
      {
        "title": "Partilhe uma única vez",
        "body": "Autodestrói-se quando o limite é atingido."
      }
    ],
    "ru": [
      {
        "title": "Вставьте адрес назначения",
        "body": "Куда должна вести ссылка."
      },
      {
        "title": "Задайте ограничения",
        "body": "Срок действия в днях и/или максимальное число переходов."
      },
      {
        "title": "Поделитесь один раз",
        "body": "Ссылка самоуничтожается при достижении лимита."
      }
    ],
    "sv": [
      {
        "title": "Klistra in destinationen",
        "body": "Dit länken ska leda."
      },
      {
        "title": "Ange begränsningarna",
        "body": "Upphör efter N dagar och/eller efter N klick."
      },
      {
        "title": "Dela den en gång",
        "body": "Den förstör sig själv när gränsen nås."
      }
    ],
    "tr": [
      {
        "title": "Hedef adresi yapıştır",
        "body": "Bağlantının götüreceği yer."
      },
      {
        "title": "Sınırları belirle",
        "body": "N gün ve/veya N tıklama sonra geçerlilik süresi dolsun."
      },
      {
        "title": "Bir kez paylaş",
        "body": "Limite ulaşıldığında kendi kendini imha eder."
      }
    ],
    "uk": [
      {
        "title": "Вставте призначення",
        "body": "Куди має вести посилання."
      },
      {
        "title": "Встановіть обмеження",
        "body": "Термін дії N днів та/або N переходів."
      },
      {
        "title": "Поширте одного разу",
        "body": "Посилання самознищується після досягнення ліміту."
      }
    ],
    "vi": [
      {
        "title": "Dán đích đến",
        "body": "Nơi liên kết sẽ dẫn tới."
      },
      {
        "title": "Đặt giới hạn",
        "body": "Hết hạn sau N ngày và/hoặc sau N lượt nhấp."
      },
      {
        "title": "Chia sẻ một lần",
        "body": "Tự hủy khi đạt đến giới hạn."
      }
    ],
    "zh": [
      {
        "title": "粘贴目标地址",
        "body": "链接最终指向的页面。"
      },
      {
        "title": "设置限制条件",
        "body": "N 天后过期，或达到 N 次点击后失效。"
      },
      {
        "title": "一次性分享",
        "body": "达到限制后链接自动销毁。"
      }
    ]
  },
  "markdown-to-html": {
    "ar": [
      {
        "title": "اكتب أو الصق Markdown",
        "body": "عناوين وخط عريض ومائل وقوائم وروابط وأسوار كود."
      },
      {
        "title": "تحويل إلى HTML",
        "body": "معروض فورًا أثناء الكتابة."
      },
      {
        "title": "انسخ أو حمّل",
        "body": "احصل على HTML لموقعك أو نظام إدارة المحتوى."
      }
    ],
    "cs": [
      {
        "title": "Napište nebo vložte Markdown",
        "body": "Nadpisy, tučné, kurzíva, seznamy, odkazy, bloky kódu."
      },
      {
        "title": "Převeďte na HTML",
        "body": "Vykresluje se okamžitě při psaní."
      },
      {
        "title": "Zkopírujte nebo stáhněte",
        "body": "Vezměte HTML pro svůj web nebo CMS."
      }
    ],
    "de": [
      {
        "title": "Markdown schreiben oder einfügen",
        "body": "Überschriften, Fettdruck, Kursiv, Listen, Links, Code-Blöcke."
      },
      {
        "title": "In HTML umwandeln",
        "body": "Wird sofort beim Tippen gerendert."
      },
      {
        "title": "Kopieren oder herunterladen",
        "body": "HTML für deine Website oder dein CMS übernehmen."
      }
    ],
    "es": [
      {
        "title": "Escribe o pega Markdown",
        "body": "Encabezados, negrita, cursiva, listas, enlaces, bloques de código."
      },
      {
        "title": "Convierte a HTML",
        "body": "Se renderiza al instante mientras escribes."
      },
      {
        "title": "Copia o descarga",
        "body": "Toma el HTML para tu sitio web o CMS."
      }
    ],
    "fr": [
      {
        "title": "Rédigez ou collez du Markdown",
        "body": "Titres, gras, italique, listes, liens, blocs de code."
      },
      {
        "title": "Convertissez en HTML",
        "body": "Rendu instantané au fil de la frappe."
      },
      {
        "title": "Copiez ou téléchargez",
        "body": "Récupérez le HTML pour votre site ou votre CMS."
      }
    ],
    "hi": [
      {
        "title": "Markdown लिखें या पेस्ट करें",
        "body": "हेडिंग, बोल्ड, इटैलिक, लिस्ट, लिंक, कोड फेंस।"
      },
      {
        "title": "HTML में कन्वर्ट करें",
        "body": "टाइप करते ही तुरंत रेंडर होता है।"
      },
      {
        "title": "कॉपी या डाउनलोड करें",
        "body": "अपनी साइट या CMS के लिए HTML लें।"
      }
    ],
    "id": [
      {
        "title": "Tulis atau tempel Markdown",
        "body": "Judul, tebal, miring, daftar, tautan, pagar kode."
      },
      {
        "title": "Konversi ke HTML",
        "body": "Dirender seketika saat kamu mengetik."
      },
      {
        "title": "Salin atau unduh",
        "body": "Ambil HTML untuk situs atau CMS kamu."
      }
    ],
    "it": [
      {
        "title": "Scrivi o incolla Markdown",
        "body": "Titoli, grassetto, corsivo, liste, link, blocchi di codice."
      },
      {
        "title": "Converti in HTML",
        "body": "Il rendering avviene istantaneamente mentre scrivi."
      },
      {
        "title": "Copia o scarica",
        "body": "Prendi l'HTML per il tuo sito o CMS."
      }
    ],
    "ja": [
      {
        "title": "Markdown を入力またはペースト",
        "body": "見出し・太字・斜体・リスト・リンク・コードフェンスに対応。"
      },
      {
        "title": "HTMLに変換",
        "body": "入力しながら即座にレンダリング。"
      },
      {
        "title": "コピーまたはダウンロード",
        "body": "サイトや CMS 向けの HTML を取得。"
      }
    ],
    "ko": [
      {
        "title": "Markdown 작성 또는 붙여넣기",
        "body": "제목, 굵게, 기울임, 목록, 링크, 코드 블록."
      },
      {
        "title": "HTML로 변환",
        "body": "입력하는 즉시 렌더링됩니다."
      },
      {
        "title": "복사 또는 다운로드",
        "body": "사이트나 CMS에 사용할 HTML을 가져가세요."
      }
    ],
    "nl": [
      {
        "title": "Schrijf of plak Markdown",
        "body": "Koppen, vet, cursief, lijsten, links, codeblokken."
      },
      {
        "title": "Converteren naar HTML",
        "body": "Direct gerenderd terwijl je typt."
      },
      {
        "title": "Kopiëren of downloaden",
        "body": "Neem de HTML voor je site of CMS."
      }
    ],
    "pl": [
      {
        "title": "Napisz lub wklej Markdown",
        "body": "Nagłówki, pogrubienie, kursywa, listy, linki, bloki kodu."
      },
      {
        "title": "Konwertuj do HTML",
        "body": "Renderowane natychmiast podczas pisania."
      },
      {
        "title": "Skopiuj lub pobierz",
        "body": "Pobierz HTML dla swojej strony lub CMS."
      }
    ],
    "pt": [
      {
        "title": "Escreva ou cole Markdown",
        "body": "Títulos, negrito, itálico, listas, links, blocos de código."
      },
      {
        "title": "Converta para HTML",
        "body": "Renderizado instantaneamente enquanto escreve."
      },
      {
        "title": "Copie ou baixe",
        "body": "Obtenha o HTML para o seu site ou CMS."
      }
    ],
    "ru": [
      {
        "title": "Напишите или вставьте Markdown",
        "body": "Заголовки, жирный, курсив, списки, ссылки, блоки кода."
      },
      {
        "title": "Конвертация в HTML",
        "body": "Рендеринг происходит мгновенно по мере ввода."
      },
      {
        "title": "Скопируйте или скачайте",
        "body": "Готовый HTML для сайта или CMS."
      }
    ],
    "sv": [
      {
        "title": "Skriv eller klistra in Markdown",
        "body": "Rubriker, fetstil, kursiv, listor, länkar, kodblock."
      },
      {
        "title": "Konvertera till HTML",
        "body": "Renderas omedelbart medan du skriver."
      },
      {
        "title": "Kopiera eller ladda ned",
        "body": "Hämta HTML:en för din webbplats eller CMS."
      }
    ],
    "tr": [
      {
        "title": "Markdown yaz veya yapıştır",
        "body": "Başlıklar, kalın, italik, listeler, bağlantılar, kod blokları."
      },
      {
        "title": "HTML'e dönüştür",
        "body": "Yazarken anında işlenir."
      },
      {
        "title": "Kopyala veya indir",
        "body": "Siten veya CMS'in için HTML'i al."
      }
    ],
    "uk": [
      {
        "title": "Напишіть або вставте Markdown",
        "body": "Заголовки, жирний, курсив, списки, посилання, блоки коду."
      },
      {
        "title": "Конвертуйте у HTML",
        "body": "Рендериться миттєво під час введення."
      },
      {
        "title": "Скопіюйте або завантажте",
        "body": "HTML готовий для сайту або CMS."
      }
    ],
    "vi": [
      {
        "title": "Viết hoặc dán Markdown",
        "body": "Tiêu đề, in đậm, in nghiêng, danh sách, liên kết, khối code."
      },
      {
        "title": "Chuyển sang HTML",
        "body": "Kết xuất ngay khi bạn gõ."
      },
      {
        "title": "Sao chép hoặc tải xuống",
        "body": "Lấy HTML dùng cho trang web hoặc CMS của bạn."
      }
    ],
    "zh": [
      {
        "title": "编写或粘贴 Markdown",
        "body": "支持标题、粗体、斜体、列表、链接和代码块。"
      },
      {
        "title": "转换为 HTML",
        "body": "输入时即时渲染。"
      },
      {
        "title": "复制或下载",
        "body": "获取 HTML 代码，用于网站或内容管理系统。"
      }
    ]
  },
  "markdown-to-word": {
    "ar": [
      {
        "title": "الصق أو حمّل Markdown",
        "body": "اكتبه مباشرةً أو حمّل ملف .md."
      },
      {
        "title": "نحوّل البنية",
        "body": "عناوين وقوائم واقتباسات وتأكيد."
      },
      {
        "title": "حمّل .docx",
        "body": "قابل للتحرير في Word وGoogle Docs وLibreOffice."
      }
    ],
    "cs": [
      {
        "title": "Vložte nebo načtěte Markdown",
        "body": "Napište ho nebo načtěte soubor .md."
      },
      {
        "title": "Převedeme strukturu",
        "body": "Nadpisy, seznamy, citace a důrazy."
      },
      {
        "title": "Stáhněte .docx",
        "body": "Upravitelné ve Word, Google Docs nebo LibreOffice."
      }
    ],
    "de": [
      {
        "title": "Markdown einfügen oder laden",
        "body": "Direkt eingeben oder eine .md-Datei laden."
      },
      {
        "title": "Wir konvertieren die Struktur",
        "body": "Überschriften, Listen, Zitate und Hervorhebungen."
      },
      {
        "title": ".docx herunterladen",
        "body": "Bearbeitbar in Word, Google Docs oder LibreOffice."
      }
    ],
    "es": [
      {
        "title": "Pega o carga el Markdown",
        "body": "Escríbelo directamente o carga un archivo .md."
      },
      {
        "title": "Convertimos la estructura",
        "body": "Encabezados, listas, citas y énfasis."
      },
      {
        "title": "Descarga el .docx",
        "body": "Editable en Word, Google Docs o LibreOffice."
      }
    ],
    "fr": [
      {
        "title": "Collez ou chargez du Markdown",
        "body": "Rédigez-le ou chargez un fichier .md."
      },
      {
        "title": "Nous convertissons la structure",
        "body": "Titres, listes, citations et emphases."
      },
      {
        "title": "Téléchargez le .docx",
        "body": "Modifiable dans Word, Google Docs ou LibreOffice."
      }
    ],
    "hi": [
      {
        "title": "Markdown पेस्ट या लोड करें",
        "body": "टाइप करें या .md फ़ाइल लोड करें।"
      },
      {
        "title": "हम स्ट्रक्चर कन्वर्ट करते हैं",
        "body": "हेडिंग, लिस्ट, क्वोट और एम्फेसिस।"
      },
      {
        "title": ".docx डाउनलोड करें",
        "body": "Word, Google Docs या LibreOffice में एडिट करने योग्य।"
      }
    ],
    "id": [
      {
        "title": "Tempel atau muat Markdown",
        "body": "Ketik langsung atau muat file .md."
      },
      {
        "title": "Kami mengonversi strukturnya",
        "body": "Judul, daftar, kutipan, dan penekanan."
      },
      {
        "title": "Unduh .docx",
        "body": "Dapat diedit di Word, Google Docs, atau LibreOffice."
      }
    ],
    "it": [
      {
        "title": "Incolla o carica il Markdown",
        "body": "Scrivilo direttamente o carica un file .md."
      },
      {
        "title": "Convertiamo la struttura",
        "body": "Titoli, liste, citazioni e enfasi."
      },
      {
        "title": "Scarica il file .docx",
        "body": "Modificabile in Word, Google Docs o LibreOffice."
      }
    ],
    "ja": [
      {
        "title": "Markdown を入力または読み込む",
        "body": "直接入力するか、.md ファイルを読み込む。"
      },
      {
        "title": "構造を変換",
        "body": "見出し・リスト・引用・強調テキストに対応。"
      },
      {
        "title": ".docx をダウンロード",
        "body": "Word、Google Docs、LibreOffice で編集できます。"
      }
    ],
    "ko": [
      {
        "title": "Markdown 붙여넣기 또는 불러오기",
        "body": "직접 입력하거나 .md 파일을 불러오세요."
      },
      {
        "title": "구조 변환",
        "body": "제목, 목록, 인용, 강조가 변환됩니다."
      },
      {
        "title": ".docx 다운로드",
        "body": "Word, Google Docs 또는 LibreOffice에서 편집 가능합니다."
      }
    ],
    "nl": [
      {
        "title": "Plak of laad Markdown",
        "body": "Typ het in of laad een .md-bestand."
      },
      {
        "title": "We converteren de structuur",
        "body": "Koppen, lijsten, citaten en nadruk."
      },
      {
        "title": "Download het .docx-bestand",
        "body": "Bewerkbaar in Word, Google Docs of LibreOffice."
      }
    ],
    "pl": [
      {
        "title": "Wklej lub załaduj Markdown",
        "body": "Wpisz ręcznie lub załaduj plik .md."
      },
      {
        "title": "Konwertujemy strukturę",
        "body": "Nagłówki, listy, cytaty i wyróżnienia."
      },
      {
        "title": "Pobierz plik .docx",
        "body": "Edytowalny w Word, Google Docs lub LibreOffice."
      }
    ],
    "pt": [
      {
        "title": "Cole ou carregue Markdown",
        "body": "Escreva diretamente ou carregue um ficheiro .md."
      },
      {
        "title": "Convertemos a estrutura",
        "body": "Títulos, listas, citações e ênfase."
      },
      {
        "title": "Baixe o .docx",
        "body": "Editável no Word, Google Docs ou LibreOffice."
      }
    ],
    "ru": [
      {
        "title": "Вставьте или загрузите Markdown",
        "body": "Введите вручную или загрузите .md-файл."
      },
      {
        "title": "Конвертируем структуру",
        "body": "Заголовки, списки, цитаты и выделение."
      },
      {
        "title": "Скачайте .docx",
        "body": "Редактируется в Word, Google Docs или LibreOffice."
      }
    ],
    "sv": [
      {
        "title": "Klistra in eller läs in Markdown",
        "body": "Skriv det eller läs in en .md-fil."
      },
      {
        "title": "Vi konverterar strukturen",
        "body": "Rubriker, listor, citat och betoning."
      },
      {
        "title": "Ladda ned .docx",
        "body": "Redigerbar i Word, Google Docs eller LibreOffice."
      }
    ],
    "tr": [
      {
        "title": "Markdown yaz veya yükle",
        "body": "Doğrudan gir ya da bir .md dosyası yükle."
      },
      {
        "title": "Yapıyı dönüştürüyoruz",
        "body": "Başlıklar, listeler, alıntılar ve vurgular."
      },
      {
        "title": ".docx dosyasını indir",
        "body": "Word, Google Docs veya LibreOffice'te düzenlenebilir."
      }
    ],
    "uk": [
      {
        "title": "Вставте або завантажте Markdown",
        "body": "Введіть текст або завантажте .md файл."
      },
      {
        "title": "Ми конвертуємо структуру",
        "body": "Заголовки, списки, цитати та акценти."
      },
      {
        "title": "Завантажте .docx",
        "body": "Редагується у Word, Google Docs або LibreOffice."
      }
    ],
    "vi": [
      {
        "title": "Dán hoặc tải Markdown",
        "body": "Gõ trực tiếp hoặc tải file .md lên."
      },
      {
        "title": "Chúng tôi chuyển đổi cấu trúc",
        "body": "Tiêu đề, danh sách, trích dẫn và định dạng nhấn mạnh."
      },
      {
        "title": "Tải xuống file .docx",
        "body": "Chỉnh sửa được trong Word, Google Docs hoặc LibreOffice."
      }
    ],
    "zh": [
      {
        "title": "粘贴或加载 Markdown",
        "body": "直接输入，或加载 .md 文件。"
      },
      {
        "title": "转换文档结构",
        "body": "标题、列表、引用和强调格式均完整转换。"
      },
      {
        "title": "下载 .docx 文件",
        "body": "可在 Word、Google Docs 或 LibreOffice 中直接编辑。"
      }
    ]
  },
  "meme-generator": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "أي صورة فوتوغرافية أو لقطة شاشة أو قالب."
      },
      {
        "title": "اكتب تعليقاتك",
        "body": "نص في الأعلى وفي الأسفل — معاينة حية."
      },
      {
        "title": "حمّل كـ PNG",
        "body": "جاهز للمشاركة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "Libovolnou fotku, snímek obrazovky nebo šablonu."
      },
      {
        "title": "Napište popisky",
        "body": "Text nahoře a dole — živý náhled."
      },
      {
        "title": "Stáhněte jako PNG",
        "body": "Připraveno ke sdílení."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "Foto, Screenshot oder Vorlage."
      },
      {
        "title": "Bildunterschriften eingeben",
        "body": "Text oben und unten — Live-Vorschau."
      },
      {
        "title": "Als PNG herunterladen",
        "body": "Direkt zum Teilen bereit."
      }
    ],
    "es": [
      {
        "title": "Sube una imagen",
        "body": "Cualquier foto, captura de pantalla o plantilla."
      },
      {
        "title": "Escribe los textos",
        "body": "Texto superior e inferior — previsualización en tiempo real."
      },
      {
        "title": "Descarga como PNG",
        "body": "Listo para compartir."
      }
    ],
    "fr": [
      {
        "title": "Importez une image",
        "body": "N'importe quelle photo, capture d'écran ou modèle."
      },
      {
        "title": "Tapez vos légendes",
        "body": "Texte en haut et en bas — aperçu en direct."
      },
      {
        "title": "Téléchargez en PNG",
        "body": "Prêt à partager."
      }
    ],
    "hi": [
      {
        "title": "एक इमेज अपलोड करें",
        "body": "कोई भी फोटो, स्क्रीनशॉट या टेम्पलेट।"
      },
      {
        "title": "अपने कैप्शन टाइप करें",
        "body": "ऊपर और नीचे का टेक्स्ट — लाइव प्रीव्यू।"
      },
      {
        "title": "PNG के रूप में डाउनलोड करें",
        "body": "शेयर करने के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambar",
        "body": "Foto, tangkapan layar, atau template apa pun."
      },
      {
        "title": "Ketik teks kamu",
        "body": "Teks atas dan bawah — pratinjau langsung."
      },
      {
        "title": "Unduh sebagai PNG",
        "body": "Siap dibagikan."
      }
    ],
    "it": [
      {
        "title": "Carica un'immagine",
        "body": "Qualsiasi foto, screenshot o template."
      },
      {
        "title": "Scrivi le didascalie",
        "body": "Testo in alto e in basso — anteprima in tempo reale."
      },
      {
        "title": "Scarica come PNG",
        "body": "Pronto da condividere."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "写真・スクリーンショット・テンプレートを選択。"
      },
      {
        "title": "キャプションを入力",
        "body": "上下のテキストをリアルタイムでプレビュー。"
      },
      {
        "title": "PNGとしてダウンロード",
        "body": "そのままシェアできます。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "사진, 스크린샷 또는 템플릿."
      },
      {
        "title": "캡션 입력",
        "body": "상단과 하단 텍스트 — 실시간 미리보기."
      },
      {
        "title": "PNG로 다운로드",
        "body": "바로 공유할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Upload een afbeelding",
        "body": "Elke foto, schermafbeelding of sjabloon."
      },
      {
        "title": "Typ je bijschriften",
        "body": "Tekst boven en onder — live preview."
      },
      {
        "title": "Download als PNG",
        "body": "Klaar om te delen."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "Dowolne zdjęcie, zrzut ekranu lub szablon."
      },
      {
        "title": "Wpisz podpisy",
        "body": "Tekst u góry i u dołu — podgląd na żywo."
      },
      {
        "title": "Pobierz jako PNG",
        "body": "Gotowe do udostępnienia."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma imagem",
        "body": "Qualquer foto, captura de ecrã ou template."
      },
      {
        "title": "Escreva as suas legendas",
        "body": "Texto em cima e em baixo — pré-visualização em tempo real."
      },
      {
        "title": "Baixe como PNG",
        "body": "Pronto para partilhar."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "Любое фото, скриншот или шаблон."
      },
      {
        "title": "Введите подписи",
        "body": "Текст сверху и снизу — предпросмотр в реальном времени."
      },
      {
        "title": "Скачайте как PNG",
        "body": "Готово к публикации."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en bild",
        "body": "Vilket foto, skärmdump eller mall som helst."
      },
      {
        "title": "Skriv dina bildtexter",
        "body": "Text överst och underst — liveförhandsgranskning."
      },
      {
        "title": "Ladda ned som PNG",
        "body": "Redo att dela."
      }
    ],
    "tr": [
      {
        "title": "Görsel yükle",
        "body": "Herhangi bir fotoğraf, ekran görüntüsü veya şablon."
      },
      {
        "title": "Altyazılarını yaz",
        "body": "Üst ve alt metin — canlı önizleme."
      },
      {
        "title": "PNG olarak indir",
        "body": "Paylaşıma hazır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "Будь-яке фото, скриншот або шаблон."
      },
      {
        "title": "Введіть підписи",
        "body": "Текст зверху і знизу — живий попередній перегляд."
      },
      {
        "title": "Завантажте як PNG",
        "body": "Готово до поширення."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "Bất kỳ ảnh chụp, ảnh màn hình hoặc mẫu nào."
      },
      {
        "title": "Nhập chú thích",
        "body": "Văn bản trên và dưới — xem trước trực tiếp."
      },
      {
        "title": "Tải xuống dạng PNG",
        "body": "Sẵn sàng chia sẻ."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "照片、截图或模板均可。"
      },
      {
        "title": "输入字幕文字",
        "body": "上下各一行文字，实时预览。"
      },
      {
        "title": "下载 PNG",
        "body": "随时可分享。"
      }
    ]
  },
  "merge-csv": {
    "ar": [
      {
        "title": "أضف ملفات CSV",
        "body": "أسقط ملفات متعددة؛ أعد ترتيبها بالسحب."
      },
      {
        "title": "اختر وضع الدمج",
        "body": "حسب اسم العمود (افتراضي) أو تراص كما هي."
      },
      {
        "title": "حمّل CSV المدموج",
        "body": "ملف واحد جاهز للخطوة التالية."
      }
    ],
    "cs": [
      {
        "title": "Přidejte CSV soubory",
        "body": "Přetáhněte více souborů; pořadí změňte přetažením."
      },
      {
        "title": "Vyberte způsob sloučení",
        "body": "Podle názvu sloupce (výchozí) nebo prostě naskládejte za sebou."
      },
      {
        "title": "Stáhněte sloučené CSV",
        "body": "Jeden soubor, připravený pro další krok."
      }
    ],
    "de": [
      {
        "title": "CSVs hinzufügen",
        "body": "Mehrere Dateien ablegen; per Drag-and-Drop neu anordnen."
      },
      {
        "title": "Zusammenführungsmodus wählen",
        "body": "Nach Spaltenname (Standard) oder einfach untereinander stapeln."
      },
      {
        "title": "Zusammengeführte CSV herunterladen",
        "body": "Eine Datei — bereit für den nächsten Schritt."
      }
    ],
    "es": [
      {
        "title": "Añade tus CSVs",
        "body": "Arrastra varios archivos; reordénalos arrastrando."
      },
      {
        "title": "Elige el modo de fusión",
        "body": "Por nombre de columna (por defecto) o apilando tal cual."
      },
      {
        "title": "Descarga el CSV combinado",
        "body": "Un único archivo, listo para el siguiente paso."
      }
    ],
    "fr": [
      {
        "title": "Ajoutez vos CSV",
        "body": "Déposez plusieurs fichiers ; réordonnez par glisser-déposer."
      },
      {
        "title": "Choisissez un mode de fusion",
        "body": "Par nom de colonne (défaut) ou empilement en l'état."
      },
      {
        "title": "Téléchargez le CSV fusionné",
        "body": "Un seul fichier, prêt pour la suite."
      }
    ],
    "hi": [
      {
        "title": "अपनी CSVs जोड़ें",
        "body": "कई फ़ाइलें डालें; ड्रैग करके क्रम बदलें।"
      },
      {
        "title": "मर्ज मोड चुनें",
        "body": "कॉलम नाम से (डिफ़ॉल्ट) या ज्यों-का-त्यों स्टैक करें।"
      },
      {
        "title": "मर्ज की हुई CSV डाउनलोड करें",
        "body": "एक फ़ाइल, अगले चरण के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Tambahkan CSV kamu",
        "body": "Seret beberapa file; atur ulang urutan dengan drag."
      },
      {
        "title": "Pilih mode penggabungan",
        "body": "Berdasarkan nama kolom (default) atau susun apa adanya."
      },
      {
        "title": "Unduh CSV yang sudah digabung",
        "body": "Satu file, siap untuk langkah berikutnya."
      }
    ],
    "it": [
      {
        "title": "Aggiungi i tuoi file CSV",
        "body": "Trascina più file; riordinali trascinandoli."
      },
      {
        "title": "Scegli la modalità di unione",
        "body": "Per nome di colonna (predefinito) o sovrapposizione diretta."
      },
      {
        "title": "Scarica il CSV unito",
        "body": "Un unico file, pronto per il passaggio successivo."
      }
    ],
    "ja": [
      {
        "title": "CSVを追加",
        "body": "複数ファイルをドロップ。ドラッグで順番を変更。"
      },
      {
        "title": "結合モードを選択",
        "body": "列名で結合（デフォルト）またはそのまま積み重ね。"
      },
      {
        "title": "結合済みCSVをダウンロード",
        "body": "1ファイルにまとめて次のステップへ。"
      }
    ],
    "ko": [
      {
        "title": "CSV 파일 추가",
        "body": "여러 파일을 드롭하고 드래그로 순서를 조정하세요."
      },
      {
        "title": "병합 방식 선택",
        "body": "열 이름 기준(기본) 또는 그대로 쌓기."
      },
      {
        "title": "병합된 CSV 다운로드",
        "body": "다음 단계에 바로 사용할 수 있는 하나의 파일."
      }
    ],
    "nl": [
      {
        "title": "Voeg je CSV-bestanden toe",
        "body": "Sleep meerdere bestanden hierheen; rangschik ze door te slepen."
      },
      {
        "title": "Kies een samenvoegmodus",
        "body": "Op kolomnaam (standaard) of gewoon stapelen."
      },
      {
        "title": "Download de samengevoegde CSV",
        "body": "Eén bestand, klaar voor de volgende stap."
      }
    ],
    "pl": [
      {
        "title": "Dodaj pliki CSV",
        "body": "Upuść kilka plików; zmieniaj kolejność przeciąganiem."
      },
      {
        "title": "Wybierz tryb scalania",
        "body": "Po nazwie kolumny (domyślnie) lub ułóż jeden pod drugim."
      },
      {
        "title": "Pobierz scalony CSV",
        "body": "Jeden plik, gotowy do dalszego przetwarzania."
      }
    ],
    "pt": [
      {
        "title": "Adicione os seus CSVs",
        "body": "Arraste vários ficheiros; reordene por arrastar."
      },
      {
        "title": "Escolha o modo de fusão",
        "body": "Por nome de coluna (padrão) ou empilhamento direto."
      },
      {
        "title": "Baixe o CSV combinado",
        "body": "Um único ficheiro, pronto para o próximo passo."
      }
    ],
    "ru": [
      {
        "title": "Добавьте CSV-файлы",
        "body": "Перетащите несколько файлов и расположите в нужном порядке."
      },
      {
        "title": "Выберите режим объединения",
        "body": "По названию столбца (по умолчанию) или простая склейка."
      },
      {
        "title": "Скачайте объединённый CSV",
        "body": "Один файл, готов к дальнейшей работе."
      }
    ],
    "sv": [
      {
        "title": "Lägg till dina CSV:er",
        "body": "Släpp flera filer; ordna om med drag."
      },
      {
        "title": "Välj sammanslagningsläge",
        "body": "Efter kolumnnamn (standard) eller stapla i befintligt skick."
      },
      {
        "title": "Ladda ned den sammanslagna CSV:en",
        "body": "En fil, redo för nästa steg."
      }
    ],
    "tr": [
      {
        "title": "CSV dosyalarını ekle",
        "body": "Birden fazla dosya bırak; sürükleyerek yeniden sırala."
      },
      {
        "title": "Birleştirme modunu seç",
        "body": "Sütun adına göre (varsayılan) veya olduğu gibi üst üste ekle."
      },
      {
        "title": "Birleştirilmiş CSV'yi indir",
        "body": "Bir sonraki adım için hazır tek dosya."
      }
    ],
    "uk": [
      {
        "title": "Додайте CSV-файли",
        "body": "Перетягніть кілька файлів; змінюйте порядок перетягуванням."
      },
      {
        "title": "Оберіть режим злиття",
        "body": "За назвою стовпця (стандартно) або поставити один за одним."
      },
      {
        "title": "Завантажте обʼєднаний CSV",
        "body": "Один файл, готовий до наступного кроку."
      }
    ],
    "vi": [
      {
        "title": "Thêm các file CSV",
        "body": "Kéo thả nhiều file; sắp xếp lại bằng cách kéo."
      },
      {
        "title": "Chọn kiểu gộp",
        "body": "Theo tên cột (mặc định) hoặc ghép nối tiếp như vốn có."
      },
      {
        "title": "Tải xuống file CSV đã gộp",
        "body": "Một file duy nhất, sẵn sàng cho bước tiếp theo."
      }
    ],
    "zh": [
      {
        "title": "添加 CSV 文件",
        "body": "拖入多个文件，拖拽调整顺序。"
      },
      {
        "title": "选择合并方式",
        "body": "按列名合并（默认）或直接堆叠。"
      },
      {
        "title": "下载合并后的 CSV",
        "body": "一个文件，直接进入下一步处理。"
      }
    ]
  },
  "minify-css": {
    "ar": [
      {
        "title": "الصق CSS الخاص بك",
        "body": "قاعدة واحدة أو ورقة أنماط كاملة."
      },
      {
        "title": "صغّره",
        "body": "تُحذف التعليقات والمسافات البيضاء الزائدة بأمان."
      },
      {
        "title": "حمّل النتيجة",
        "body": "ملفات أصغر، وتحميل أسرع للصفحات."
      }
    ],
    "cs": [
      {
        "title": "Vložte CSS",
        "body": "Jedno pravidlo nebo celý styl."
      },
      {
        "title": "Minifikujte",
        "body": "Komentáře a nadbytečné bílé znaky jsou bezpečně odstraněny."
      },
      {
        "title": "Stáhněte výsledek",
        "body": "Menší soubory, rychlejší načítání stránek."
      }
    ],
    "de": [
      {
        "title": "CSS einfügen",
        "body": "Eine Regel oder ein ganzes Stylesheet."
      },
      {
        "title": "Minimieren",
        "body": "Kommentare und überflüssige Leerzeichen werden sicher entfernt."
      },
      {
        "title": "Ergebnis herunterladen",
        "body": "Kleinere Dateien, schnellere Seitenladevorgänge."
      }
    ],
    "es": [
      {
        "title": "Pega tu CSS",
        "body": "Una regla o una hoja de estilos completa."
      },
      {
        "title": "Minifícalo",
        "body": "Comentarios y espacios en blanco redundantes eliminados de forma segura."
      },
      {
        "title": "Descarga el resultado",
        "body": "Archivos más ligeros, páginas más rápidas."
      }
    ],
    "fr": [
      {
        "title": "Collez votre CSS",
        "body": "Une règle ou une feuille de style entière."
      },
      {
        "title": "Minifiez-le",
        "body": "Commentaires et espaces superflus supprimés en toute sécurité."
      },
      {
        "title": "Téléchargez le résultat",
        "body": "Fichiers plus légers, pages plus rapides."
      }
    ],
    "hi": [
      {
        "title": "अपना CSS पेस्ट करें",
        "body": "एक रूल या पूरी स्टाइलशीट।"
      },
      {
        "title": "मिनिफाई करें",
        "body": "कमेंट और अनावश्यक व्हाइटस्पेस सुरक्षित रूप से हटाए जाते हैं।"
      },
      {
        "title": "परिणाम डाउनलोड करें",
        "body": "छोटी फ़ाइलें, तेज़ पेज लोड।"
      }
    ],
    "id": [
      {
        "title": "Tempel CSS kamu",
        "body": "Satu aturan atau seluruh stylesheet."
      },
      {
        "title": "Perkecil",
        "body": "Komentar dan spasi berlebih dihapus dengan aman."
      },
      {
        "title": "Unduh hasilnya",
        "body": "File lebih kecil, halaman lebih cepat."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo CSS",
        "body": "Una regola o un intero foglio di stile."
      },
      {
        "title": "Minimizza",
        "body": "Commenti e spazi ridondanti rimossi in modo sicuro."
      },
      {
        "title": "Scarica il risultato",
        "body": "File più leggeri, pagine più veloci."
      }
    ],
    "ja": [
      {
        "title": "CSSをペースト",
        "body": "1ルールでもスタイルシート全体でも対応。"
      },
      {
        "title": "圧縮する",
        "body": "コメントと不要な空白を安全に除去。"
      },
      {
        "title": "結果をダウンロード",
        "body": "ファイルが軽くなり、ページ読み込みが速くなります。"
      }
    ],
    "ko": [
      {
        "title": "CSS 붙여넣기",
        "body": "규칙 하나 또는 전체 스타일시트."
      },
      {
        "title": "최소화",
        "body": "주석과 불필요한 공백이 안전하게 제거됩니다."
      },
      {
        "title": "결과 다운로드",
        "body": "파일이 작아지고 페이지 로드가 빨라집니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je CSS",
        "body": "Een regel of een heel stylesheet."
      },
      {
        "title": "Minificeren",
        "body": "Commentaar en overbodige witruimte worden veilig verwijderd."
      },
      {
        "title": "Download het resultaat",
        "body": "Kleinere bestanden, snellere paginalading."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój CSS",
        "body": "Jedna reguła lub cały arkusz stylów."
      },
      {
        "title": "Zminifikuj",
        "body": "Komentarze i zbędne białe znaki usunięte bezpiecznie."
      },
      {
        "title": "Pobierz wynik",
        "body": "Mniejsze pliki, szybsze ładowanie strony."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu CSS",
        "body": "Uma regra ou uma folha de estilos completa."
      },
      {
        "title": "Minifique",
        "body": "Comentários e espaços em branco redundantes removidos com segurança."
      },
      {
        "title": "Baixe o resultado",
        "body": "Ficheiros menores, páginas mais rápidas."
      }
    ],
    "ru": [
      {
        "title": "Вставьте CSS",
        "body": "Одно правило или целая таблица стилей."
      },
      {
        "title": "Минификация",
        "body": "Комментарии и лишние пробелы безопасно удаляются."
      },
      {
        "title": "Скачайте результат",
        "body": "Меньше файлов — быстрее загрузка страниц."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din CSS",
        "body": "En regel eller ett helt stilark."
      },
      {
        "title": "Minifiera den",
        "body": "Kommentarer och överflödigt blanksteg tas bort säkert."
      },
      {
        "title": "Ladda ned resultatet",
        "body": "Mindre filer, snabbare sidinläsning."
      }
    ],
    "tr": [
      {
        "title": "CSS'ini yapıştır",
        "body": "Bir kural veya tüm bir stil sayfası."
      },
      {
        "title": "Küçült",
        "body": "Yorumlar ve gereksiz boşluklar güvenli şekilde kaldırılır."
      },
      {
        "title": "Sonucu indir",
        "body": "Daha küçük dosyalar, daha hızlı sayfa yüklemeleri."
      }
    ],
    "uk": [
      {
        "title": "Вставте CSS",
        "body": "Один блок або цілий файл стилів."
      },
      {
        "title": "Мініфікуйте",
        "body": "Коментарі та зайві пробіли безпечно прибираються."
      },
      {
        "title": "Завантажте результат",
        "body": "Менший файл — швидше завантаження сторінки."
      }
    ],
    "vi": [
      {
        "title": "Dán CSS vào đây",
        "body": "Một quy tắc hoặc toàn bộ stylesheet."
      },
      {
        "title": "Thu gọn",
        "body": "Comment và khoảng trắng dư thừa được loại bỏ an toàn."
      },
      {
        "title": "Tải xuống kết quả",
        "body": "File nhỏ hơn, trang tải nhanh hơn."
      }
    ],
    "zh": [
      {
        "title": "粘贴 CSS",
        "body": "单条规则或完整样式表均可。"
      },
      {
        "title": "压缩",
        "body": "安全去除注释和多余空白字符。"
      },
      {
        "title": "下载结果",
        "body": "文件更小，页面加载更快。"
      }
    ]
  },
  "password-checker": {
    "ar": [
      {
        "title": "اكتب كلمة مرور",
        "body": "تُجزَّأ محليًا في متصفحك."
      },
      {
        "title": "يُرسَل 5 أحرف فقط من الجزء",
        "body": "بفضل k-anonymity، لا تغادر كلمة المرور جهازك أبدًا."
      },
      {
        "title": "اطّلع على النتيجة",
        "body": "آمنة، أم عدد مرات ظهورها في اختراقات."
      }
    ],
    "cs": [
      {
        "title": "Zadejte heslo",
        "body": "Je hashováno lokálně ve vašem prohlížeči."
      },
      {
        "title": "Odešle se jen 5 znaků hashe",
        "body": "Díky k-anonymity samotné heslo nikdy neopustí zařízení."
      },
      {
        "title": "Přečtěte výsledek",
        "body": "Bezpečné, nebo v kolika únicích bylo heslo nalezeno."
      }
    ],
    "de": [
      {
        "title": "Passwort eingeben",
        "body": "Es wird lokal in deinem Browser gehasht."
      },
      {
        "title": "Nur 5 Hash-Zeichen gesendet",
        "body": "k-anonymity stellt sicher, dass das Passwort selbst nie übermittelt wird."
      },
      {
        "title": "Ergebnis sehen",
        "body": "Sicher — oder in wie vielen Datenlecks es aufgetaucht ist."
      }
    ],
    "es": [
      {
        "title": "Escribe una contraseña",
        "body": "Se hashea localmente en tu navegador."
      },
      {
        "title": "Solo se envían 5 caracteres del hash",
        "body": "La k-anonymity garantiza que la contraseña en sí nunca sale de tu dispositivo."
      },
      {
        "title": "Mira el veredicto",
        "body": "Segura, o cuántas filtraciones contiene."
      }
    ],
    "fr": [
      {
        "title": "Tapez un mot de passe",
        "body": "Il est haché localement dans votre navigateur."
      },
      {
        "title": "Seuls 5 caractères du hash sont envoyés",
        "body": "La k-anonymity garantit que le mot de passe lui-même ne part jamais."
      },
      {
        "title": "Lisez le verdict",
        "body": "Sûr, ou combien de fuites de données l'ont exposé."
      }
    ],
    "hi": [
      {
        "title": "पासवर्ड टाइप करें",
        "body": "यह आपके ब्राउज़र में लोकल रूप से हैश होता है।"
      },
      {
        "title": "केवल 5 हैश कैरेक्टर भेजे जाते हैं",
        "body": "k-anonymity का मतलब है पासवर्ड खुद कभी नहीं जाता।"
      },
      {
        "title": "निर्णय देखें",
        "body": "सुरक्षित है, या कितने ब्रीच में पाया गया।"
      }
    ],
    "id": [
      {
        "title": "Ketik kata sandi",
        "body": "Di-hash secara lokal di browsermu."
      },
      {
        "title": "Hanya 5 karakter hash yang dikirim",
        "body": "k-anonymity memastikan kata sandi itu sendiri tidak pernah keluar."
      },
      {
        "title": "Lihat hasilnya",
        "body": "Aman, atau berapa kali muncul dalam kebocoran data."
      }
    ],
    "it": [
      {
        "title": "Digita una password",
        "body": "Viene hashata localmente nel tuo browser."
      },
      {
        "title": "Solo 5 caratteri dell'hash vengono inviati",
        "body": "Grazie alla k-anonymity, la password stessa non abbandona mai il dispositivo."
      },
      {
        "title": "Visualizza il verdetto",
        "body": "Sicura, oppure quante volte è comparsa in breach noti."
      }
    ],
    "ja": [
      {
        "title": "パスワードを入力",
        "body": "ブラウザ内でローカルにハッシュ化されます。"
      },
      {
        "title": "送信されるのはハッシュの5文字のみ",
        "body": "k-anonymity によりパスワード自体は外部に送信されません。"
      },
      {
        "title": "結果を確認",
        "body": "安全か、または何件の流出に含まれているかを表示。"
      }
    ],
    "ko": [
      {
        "title": "비밀번호 입력",
        "body": "브라우저에서 로컬로 해시 처리됩니다."
      },
      {
        "title": "해시 5자리만 전송",
        "body": "k-anonymity 방식으로 비밀번호 자체는 전송되지 않습니다."
      },
      {
        "title": "결과 확인",
        "body": "안전하거나, 유출된 횟수를 알 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Typ een wachtwoord",
        "body": "Het wordt lokaal gehasht in je browser."
      },
      {
        "title": "Slechts 5 hashtekens verstuurd",
        "body": "k-anonymity zorgt ervoor dat het wachtwoord zelf nooit de browser verlaat."
      },
      {
        "title": "Zie het oordeel",
        "body": "Veilig, of in hoeveel datalekken het voorkwam."
      }
    ],
    "pl": [
      {
        "title": "Wpisz hasło",
        "body": "Jest haszowane lokalnie w Twojej przeglądarce."
      },
      {
        "title": "Wysyłamy tylko 5 znaków hasha",
        "body": "Dzięki k-anonymity samo hasło nigdy nie opuszcza urządzenia."
      },
      {
        "title": "Zobacz wynik",
        "body": "Bezpieczne — lub w ilu wyciekach danych się pojawiło."
      }
    ],
    "pt": [
      {
        "title": "Escreva uma palavra-passe",
        "body": "É convertida em hash localmente, no seu browser."
      },
      {
        "title": "Apenas 5 caracteres do hash são enviados",
        "body": "A técnica k-anonymity garante que a palavra-passe em si nunca sai do dispositivo."
      },
      {
        "title": "Veja o veredicto",
        "body": "Segura, ou em quantas violações de dados apareceu."
      }
    ],
    "ru": [
      {
        "title": "Введите пароль",
        "body": "Хешируется локально прямо в браузере."
      },
      {
        "title": "Отправляются только 5 символов хеша",
        "body": "k-anonymity гарантирует, что сам пароль не покидает устройство."
      },
      {
        "title": "Получите результат",
        "body": "Безопасный или количество утечек, в которых он засветился."
      }
    ],
    "sv": [
      {
        "title": "Skriv in ett lösenord",
        "body": "Det hashas lokalt i din webbläsare."
      },
      {
        "title": "Bara 5 hashtecken skickas",
        "body": "k-anonymity innebär att själva lösenordet aldrig lämnar enheten."
      },
      {
        "title": "Se utfallet",
        "body": "Säkert, eller hur många dataintrång det förekommit i."
      }
    ],
    "tr": [
      {
        "title": "Bir şifre gir",
        "body": "Tarayıcında yerel olarak karma haline getirilir."
      },
      {
        "title": "Yalnızca 5 karma karakteri gönderilir",
        "body": "k-anonymity sayesinde şifrenin kendisi hiçbir yere gitmez."
      },
      {
        "title": "Sonucu gör",
        "body": "Güvenli mi, yoksa kaç ihlalde görünmüş?"
      }
    ],
    "uk": [
      {
        "title": "Введіть пароль",
        "body": "Він хешується локально у вашому браузері."
      },
      {
        "title": "Надсилається лише 5 символів хешу",
        "body": "Завдяки k-anonymity сам пароль ніколи не надсилається."
      },
      {
        "title": "Дивіться результат",
        "body": "Безпечний — або скількох витоків він торкнувся."
      }
    ],
    "vi": [
      {
        "title": "Nhập mật khẩu",
        "body": "Mật khẩu được băm cục bộ ngay trong trình duyệt."
      },
      {
        "title": "Chỉ gửi 5 ký tự hash",
        "body": "k-anonymity đảm bảo bản thân mật khẩu không bao giờ rời khỏi thiết bị."
      },
      {
        "title": "Xem kết quả",
        "body": "An toàn, hoặc mật khẩu đã xuất hiện trong bao nhiêu vụ rò rỉ."
      }
    ],
    "zh": [
      {
        "title": "输入密码",
        "body": "密码在浏览器本地进行哈希处理。"
      },
      {
        "title": "仅发送 5 位哈希字符",
        "body": "k-anonymity 机制确保密码本身不会离开本地。"
      },
      {
        "title": "查看检测结果",
        "body": "显示密码是否安全，或出现在多少次数据泄露中。"
      }
    ]
  },
  "pdf-ocr": {
    "ar": [
      {
        "title": "ارفع PDF ممسوحًا ضوئيًا",
        "body": "يبقى على جهازك — لا يُرفع أبدًا."
      },
      {
        "title": "اختر لغة المستند",
        "body": "12 لغة شائعة مدعومة."
      },
      {
        "title": "اقرأ وحمّل",
        "body": "OCR صفحةً بصفحة، مُصدَّر كـ .txt واحد."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte naskenované PDF",
        "body": "Zůstane na vašem zařízení — nikdy se nenahraje."
      },
      {
        "title": "Vyberte jazyk dokumentu",
        "body": "Podporováno 12 běžných jazyků."
      },
      {
        "title": "Čtěte a stahujte",
        "body": "OCR stránka po stránce, exportováno jako jeden soubor .txt."
      }
    ],
    "de": [
      {
        "title": "Gescanntes PDF hochladen",
        "body": "Bleibt auf deinem Gerät — wird nie hochgeladen."
      },
      {
        "title": "Dokumentsprache wählen",
        "body": "12 gängige Sprachen unterstützt."
      },
      {
        "title": "Lesen und herunterladen",
        "body": "Seitenweises OCR — exportiert als einzelne .txt-Datei."
      }
    ],
    "es": [
      {
        "title": "Sube un PDF escaneado",
        "body": "Se queda en tu dispositivo — nunca se sube."
      },
      {
        "title": "Elige el idioma del documento",
        "body": "12 idiomas habituales disponibles."
      },
      {
        "title": "Lee y descarga",
        "body": "OCR página a página, exportado como un único .txt."
      }
    ],
    "fr": [
      {
        "title": "Importez un PDF scanné",
        "body": "Reste sur votre appareil — jamais envoyé."
      },
      {
        "title": "Choisissez la langue du document",
        "body": "12 langues courantes prises en charge."
      },
      {
        "title": "Lisez et téléchargez",
        "body": "OCR page par page, exporté en un seul .txt."
      }
    ],
    "hi": [
      {
        "title": "स्कैन की गई PDF अपलोड करें",
        "body": "आपके डिवाइस पर रहती है — कभी अपलोड नहीं होती।"
      },
      {
        "title": "दस्तावेज़ की भाषा चुनें",
        "body": "12 सामान्य भाषाएं समर्थित।"
      },
      {
        "title": "पढ़ें और डाउनलोड करें",
        "body": "पेज दर पेज OCR, एकल .txt के रूप में एक्सपोर्ट।"
      }
    ],
    "id": [
      {
        "title": "Unggah PDF pindaian",
        "body": "Tetap di perangkatmu — tidak pernah diunggah."
      },
      {
        "title": "Pilih bahasa dokumen",
        "body": "12 bahasa umum didukung."
      },
      {
        "title": "Baca dan unduh",
        "body": "OCR halaman per halaman, diekspor sebagai satu file .txt."
      }
    ],
    "it": [
      {
        "title": "Carica un PDF scansionato",
        "body": "Rimane sul tuo dispositivo — non viene mai caricato."
      },
      {
        "title": "Scegli la lingua del documento",
        "body": "12 lingue comuni supportate."
      },
      {
        "title": "Leggi e scarica",
        "body": "OCR pagina per pagina, esportato in un unico file .txt."
      }
    ],
    "ja": [
      {
        "title": "スキャンしたPDFをアップロード",
        "body": "デバイス上に保持。外部への送信は一切なし。"
      },
      {
        "title": "ドキュメントの言語を選択",
        "body": "一般的な12言語に対応。"
      },
      {
        "title": "読み取りとダウンロード",
        "body": "ページごとにOCR処理し、1つの .txt としてエクスポート。"
      }
    ],
    "ko": [
      {
        "title": "스캔된 PDF 업로드",
        "body": "기기에 머무릅니다 — 업로드되지 않습니다."
      },
      {
        "title": "문서 언어 선택",
        "body": "12개 주요 언어 지원."
      },
      {
        "title": "읽기 및 다운로드",
        "body": "페이지별 OCR 처리 후 하나의 .txt로 내보냅니다."
      }
    ],
    "nl": [
      {
        "title": "Upload een gescande PDF",
        "body": "Blijft op je apparaat — wordt nooit geüpload."
      },
      {
        "title": "Kies de documenttaal",
        "body": "12 veelgebruikte talen ondersteund."
      },
      {
        "title": "Lezen en downloaden",
        "body": "OCR per pagina, geëxporteerd als één .txt-bestand."
      }
    ],
    "pl": [
      {
        "title": "Prześlij zeskanowany PDF",
        "body": "Zostaje na Twoim urządzeniu — nigdy nie jest przesyłany."
      },
      {
        "title": "Wybierz język dokumentu",
        "body": "Obsługiwanych 12 popularnych języków."
      },
      {
        "title": "Odczytaj i pobierz",
        "body": "OCR strona po stronie, wyeksportowany jako jeden plik .txt."
      }
    ],
    "pt": [
      {
        "title": "Carregue um PDF digitalizado",
        "body": "Fica no seu dispositivo — nunca é carregado."
      },
      {
        "title": "Escolha o idioma do documento",
        "body": "12 idiomas comuns suportados."
      },
      {
        "title": "Leia e baixe",
        "body": "OCR página a página, exportado como um único .txt."
      }
    ],
    "ru": [
      {
        "title": "Загрузите сканированный PDF",
        "body": "Остаётся на вашем устройстве — не загружается на сервер."
      },
      {
        "title": "Выберите язык документа",
        "body": "Поддерживается 12 распространённых языков."
      },
      {
        "title": "Читайте и скачивайте",
        "body": "OCR постранично, экспорт в единый .txt."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en skannad PDF",
        "body": "Stannar på din enhet — laddas aldrig upp."
      },
      {
        "title": "Välj dokumentspråk",
        "body": "12 vanliga språk stöds."
      },
      {
        "title": "Läs och ladda ned",
        "body": "Sida-för-sida OCR, exporterad som en enda .txt."
      }
    ],
    "tr": [
      {
        "title": "Taranmış PDF yükle",
        "body": "Cihazında kalır — hiçbir zaman yüklenmez."
      },
      {
        "title": "Belge dilini seç",
        "body": "12 yaygın dil desteklenir."
      },
      {
        "title": "Oku ve indir",
        "body": "Sayfa sayfa OCR, tek bir .txt olarak dışa aktarılır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте сканований PDF",
        "body": "Залишається на пристрої — нікуди не надсилається."
      },
      {
        "title": "Оберіть мову документа",
        "body": "Підтримується 12 поширених мов."
      },
      {
        "title": "Читайте та завантажуйте",
        "body": "OCR сторінка за сторінкою, збережено як єдиний .txt."
      }
    ],
    "vi": [
      {
        "title": "Tải lên PDF đã scan",
        "body": "Ở lại trên thiết bị của bạn — không bao giờ được tải lên."
      },
      {
        "title": "Chọn ngôn ngữ tài liệu",
        "body": "Hỗ trợ 12 ngôn ngữ phổ biến."
      },
      {
        "title": "Đọc và tải xuống",
        "body": "OCR từng trang, xuất thành một file .txt duy nhất."
      }
    ],
    "zh": [
      {
        "title": "上传扫描版 PDF",
        "body": "文件保留在本地设备，不会上传。"
      },
      {
        "title": "选择文档语言",
        "body": "内置支持 12 种常用语言。"
      },
      {
        "title": "识别并下载",
        "body": "逐页 OCR 识别，导出为单一 .txt 文件。"
      }
    ]
  },
  "pdf-redaction": {
    "ar": [
      {
        "title": "ارفع PDF",
        "body": "يبقى على جهازك — لا يُرفع أبدًا."
      },
      {
        "title": "ارسم مربعات سوداء",
        "body": "اسحب فوق أي محتوى حساس، صفحةً بصفحة."
      },
      {
        "title": "صدّر مُسطَّحًا",
        "body": "تُحوَّل الصفحات إلى صور لجعل الحجب دائمًا."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte PDF",
        "body": "Zůstane na vašem zařízení — nikdy se nenahraje."
      },
      {
        "title": "Nakreslete černé rámečky",
        "body": "Táhněte přes citlivé části, stránku po stránce."
      },
      {
        "title": "Exportujte sloučeně",
        "body": "Stránky jsou rastrizovány, takže redigování je trvalé."
      }
    ],
    "de": [
      {
        "title": "PDF hochladen",
        "body": "Bleibt auf deinem Gerät — wird nie hochgeladen."
      },
      {
        "title": "Schwarze Balken zeichnen",
        "body": "Seitenweise über sensible Stellen ziehen."
      },
      {
        "title": "Geglättet exportieren",
        "body": "Seiten werden gerastert, sodass die Schwärzungen dauerhaft sind."
      }
    ],
    "es": [
      {
        "title": "Sube un PDF",
        "body": "Se queda en tu dispositivo — nunca se sube."
      },
      {
        "title": "Dibuja cuadros negros",
        "body": "Arrastra sobre cualquier dato sensible, página a página."
      },
      {
        "title": "Exporta el documento aplanado",
        "body": "Las páginas se rasterizan para que las redacciones sean permanentes."
      }
    ],
    "fr": [
      {
        "title": "Importez un PDF",
        "body": "Reste sur votre appareil — jamais envoyé."
      },
      {
        "title": "Dessinez des zones noires",
        "body": "Glissez sur tout ce qui est sensible, page par page."
      },
      {
        "title": "Exportez aplati",
        "body": "Les pages sont rastérisées pour que les caviardages soient permanents."
      }
    ],
    "hi": [
      {
        "title": "PDF अपलोड करें",
        "body": "आपके डिवाइस पर रहता है — कभी अपलोड नहीं होता।"
      },
      {
        "title": "काले बॉक्स खींचें",
        "body": "पेज दर पेज संवेदनशील चीज़ों पर ड्रैग करें।"
      },
      {
        "title": "फ्लैटेन्ड एक्सपोर्ट करें",
        "body": "पेज रैस्टराइज़ होते हैं ताकि रिडैक्शन स्थायी हो।"
      }
    ],
    "id": [
      {
        "title": "Unggah PDF",
        "body": "Tetap di perangkatmu — tidak pernah diunggah."
      },
      {
        "title": "Gambar kotak hitam",
        "body": "Seret di atas konten sensitif, halaman per halaman."
      },
      {
        "title": "Ekspor yang sudah diratakan",
        "body": "Halaman diraster sehingga redaksi bersifat permanen."
      }
    ],
    "it": [
      {
        "title": "Carica un PDF",
        "body": "Rimane sul tuo dispositivo — non viene mai caricato."
      },
      {
        "title": "Disegna i riquadri neri",
        "body": "Trascinali sulle informazioni sensibili, pagina per pagina."
      },
      {
        "title": "Esporta appiattito",
        "body": "Le pagine vengono rasterizzate per rendere le redazioni permanenti."
      }
    ],
    "ja": [
      {
        "title": "PDFをアップロード",
        "body": "デバイス上に保持。外部への送信は一切なし。"
      },
      {
        "title": "黒いボックスを描画",
        "body": "ページごとに機密情報の上をドラッグ。"
      },
      {
        "title": "フラット化してエクスポート",
        "body": "ページをラスタライズし、墨消しを永久に適用。"
      }
    ],
    "ko": [
      {
        "title": "PDF 업로드",
        "body": "기기에 머무릅니다 — 업로드되지 않습니다."
      },
      {
        "title": "검정 박스 그리기",
        "body": "페이지별로 민감한 부분 위에 드래그하세요."
      },
      {
        "title": "플래튼 내보내기",
        "body": "페이지가 래스터화되어 삭제 처리가 영구적으로 적용됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload een PDF",
        "body": "Blijft op je apparaat — wordt nooit geüpload."
      },
      {
        "title": "Teken zwarte kaders",
        "body": "Sleep over alles wat gevoelig is, pagina voor pagina."
      },
      {
        "title": "Exporteer afgevlakt",
        "body": "Pagina's worden gerasterd zodat redacties permanent zijn."
      }
    ],
    "pl": [
      {
        "title": "Prześlij PDF",
        "body": "Zostaje na Twoim urządzeniu — nigdy nie jest przesyłany."
      },
      {
        "title": "Narysuj czarne prostokąty",
        "body": "Przeciągnij nad wrażliwymi fragmentami, strona po stronie."
      },
      {
        "title": "Eksportuj spłaszczony plik",
        "body": "Strony są rasteryzowane, więc redakcje są trwałe."
      }
    ],
    "pt": [
      {
        "title": "Carregue um PDF",
        "body": "Fica no seu dispositivo — nunca é carregado."
      },
      {
        "title": "Desenhe caixas pretas",
        "body": "Arraste sobre qualquer informação sensível, página a página."
      },
      {
        "title": "Exporte achatado",
        "body": "As páginas são rasterizadas para que as redações sejam permanentes."
      }
    ],
    "ru": [
      {
        "title": "Загрузите PDF",
        "body": "Остаётся на вашем устройстве — не загружается на сервер."
      },
      {
        "title": "Нанесите чёрные прямоугольники",
        "body": "Обведите чувствительные фрагменты на каждой странице."
      },
      {
        "title": "Экспортируйте сплющенный документ",
        "body": "Страницы растрируются, редактирование становится необратимым."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en PDF",
        "body": "Stannar på din enhet — laddas aldrig upp."
      },
      {
        "title": "Rita svarta rutor",
        "body": "Drag över allt känsligt, sida för sida."
      },
      {
        "title": "Exportera tillplattad",
        "body": "Sidorna rasteras så att redigeringarna är permanenta."
      }
    ],
    "tr": [
      {
        "title": "PDF yükle",
        "body": "Cihazında kalır — hiçbir zaman yüklenmez."
      },
      {
        "title": "Siyah kutular çiz",
        "body": "Hassas içeriklerin üzerine sayfa sayfa sürükle."
      },
      {
        "title": "Düzleştirilmiş olarak dışa aktar",
        "body": "Sayfalar taranır; redaksiyonlar kalıcıdır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте PDF",
        "body": "Залишається на пристрої — нікуди не надсилається."
      },
      {
        "title": "Намалюйте чорні рамки",
        "body": "Перетягніть над чутливим вмістом, сторінку за сторінкою."
      },
      {
        "title": "Збережіть сплющений документ",
        "body": "Сторінки растеризуються, щоб редагування стало постійним."
      }
    ],
    "vi": [
      {
        "title": "Tải PDF lên",
        "body": "Ở lại trên thiết bị của bạn — không bao giờ được tải lên."
      },
      {
        "title": "Vẽ hộp đen che nội dung",
        "body": "Kéo qua từng trang để che nội dung nhạy cảm."
      },
      {
        "title": "Xuất bản đã làm phẳng",
        "body": "Trang được raster hóa để việc biên tập là vĩnh viễn."
      }
    ],
    "zh": [
      {
        "title": "上传 PDF",
        "body": "文件保留在本地设备，不会上传。"
      },
      {
        "title": "绘制黑色遮挡框",
        "body": "逐页拖拽覆盖敏感内容。"
      },
      {
        "title": "导出扁平化文件",
        "body": "页面经过栅格化处理，遮挡内容永久不可恢复。"
      }
    ]
  },
  "photo-editor": {
    "ar": [
      {
        "title": "أسقط صورة",
        "body": "JPG أو PNG أو WebP."
      },
      {
        "title": "اضبط أو اختر إعدادًا مسبقًا",
        "body": "السطوع والتباين والتشبّع والصبغة والضبابية والتدرج الرمادي."
      },
      {
        "title": "صدّر",
        "body": "محفوظ بتنسيق المصدر."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte fotku",
        "body": "JPG, PNG nebo WebP."
      },
      {
        "title": "Dolaďte nebo vyberte předvolbu",
        "body": "Jas, kontrast, sytost, odstín, rozostření, stupně šedi."
      },
      {
        "title": "Exportujte",
        "body": "Uloženo ve zdrojovém formátu."
      }
    ],
    "de": [
      {
        "title": "Foto ablegen",
        "body": "JPG, PNG oder WebP."
      },
      {
        "title": "Anpassen oder Preset wählen",
        "body": "Helligkeit, Kontrast, Sättigung, Farbton, Weichzeichnung, Graustufen."
      },
      {
        "title": "Exportieren",
        "body": "Im Originalformat gespeichert."
      }
    ],
    "es": [
      {
        "title": "Arrastra una foto",
        "body": "JPG, PNG o WebP."
      },
      {
        "title": "Ajusta o elige un preset",
        "body": "Brillo, contraste, saturación, tono, desenfoque, escala de grises."
      },
      {
        "title": "Exporta",
        "body": "Guardado en el formato original."
      }
    ],
    "fr": [
      {
        "title": "Déposez une photo",
        "body": "JPG, PNG ou WebP."
      },
      {
        "title": "Ajustez ou choisissez un préréglage",
        "body": "Luminosité, contraste, saturation, teinte, flou, niveaux de gris."
      },
      {
        "title": "Exportez",
        "body": "Sauvegardé dans le format source."
      }
    ],
    "hi": [
      {
        "title": "एक फोटो डालें",
        "body": "JPG, PNG या WebP।"
      },
      {
        "title": "ट्यून करें या प्रीसेट चुनें",
        "body": "ब्राइटनेस, कंट्रास्ट, सैचुरेशन, ह्यू, ब्लर, ग्रेस्केल।"
      },
      {
        "title": "एक्सपोर्ट करें",
        "body": "स्रोत फॉर्मेट में सेव होता है।"
      }
    ],
    "id": [
      {
        "title": "Seret foto",
        "body": "JPG, PNG, atau WebP."
      },
      {
        "title": "Sesuaikan atau pilih preset",
        "body": "Kecerahan, kontras, saturasi, rona, blur, grayscale."
      },
      {
        "title": "Ekspor",
        "body": "Disimpan dalam format sumber."
      }
    ],
    "it": [
      {
        "title": "Trascina una foto",
        "body": "JPG, PNG o WebP."
      },
      {
        "title": "Regola o scegli un preset",
        "body": "Luminosità, contrasto, saturazione, tonalità, sfocatura, scala di grigi."
      },
      {
        "title": "Esporta",
        "body": "Salvata nel formato originale."
      }
    ],
    "ja": [
      {
        "title": "写真をドロップ",
        "body": "JPG、PNG または WebP。"
      },
      {
        "title": "手動調整またはプリセットを選択",
        "body": "明るさ・コントラスト・彩度・色相・ブラー・グレースケール。"
      },
      {
        "title": "エクスポート",
        "body": "元の形式で保存。"
      }
    ],
    "ko": [
      {
        "title": "사진 드롭",
        "body": "JPG, PNG 또는 WebP."
      },
      {
        "title": "직접 조정하거나 프리셋 선택",
        "body": "밝기, 대비, 채도, 색조, 블러, 흑백."
      },
      {
        "title": "내보내기",
        "body": "원본 형식으로 저장됩니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep een foto hierheen",
        "body": "JPG, PNG of WebP."
      },
      {
        "title": "Pas aan of kies een preset",
        "body": "Helderheid, contrast, verzadiging, tint, vervaging, grijstinten."
      },
      {
        "title": "Exporteren",
        "body": "Opgeslagen in het bronformaat."
      }
    ],
    "pl": [
      {
        "title": "Upuść zdjęcie",
        "body": "JPG, PNG lub WebP."
      },
      {
        "title": "Dostosuj lub wybierz preset",
        "body": "Jasność, kontrast, nasycenie, odcień, rozmycie, skala szarości."
      },
      {
        "title": "Eksportuj",
        "body": "Zapisane w oryginalnym formacie."
      }
    ],
    "pt": [
      {
        "title": "Arraste uma foto",
        "body": "JPG, PNG ou WebP."
      },
      {
        "title": "Ajuste ou escolha um preset",
        "body": "Brilho, contraste, saturação, matiz, desfoque, escala de cinzas."
      },
      {
        "title": "Exporte",
        "body": "Guardado no formato original."
      }
    ],
    "ru": [
      {
        "title": "Загрузите фото",
        "body": "JPG, PNG или WebP."
      },
      {
        "title": "Настройте или выберите пресет",
        "body": "Яркость, контраст, насыщенность, оттенок, размытие, чёрно-белое."
      },
      {
        "title": "Экспорт",
        "body": "Сохраняется в исходном формате."
      }
    ],
    "sv": [
      {
        "title": "Släpp ett foto",
        "body": "JPG, PNG eller WebP."
      },
      {
        "title": "Finjustera eller välj en preset",
        "body": "Ljusstyrka, kontrast, mättnad, nyans, oskärpa, gråskala."
      },
      {
        "title": "Exportera",
        "body": "Sparas i källformatet."
      }
    ],
    "tr": [
      {
        "title": "Bir fotoğraf bırak",
        "body": "JPG, PNG veya WebP."
      },
      {
        "title": "İnce ayar yap veya hazır ayar seç",
        "body": "Parlaklık, kontrast, doygunluk, ton, bulanıklık, gri tonlama."
      },
      {
        "title": "Dışa aktar",
        "body": "Kaynak formatta kaydedilir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте фото",
        "body": "JPG, PNG або WebP."
      },
      {
        "title": "Налаштуйте або оберіть пресет",
        "body": "Яскравість, контраст, насиченість, відтінок, розмиття, відтінки сірого."
      },
      {
        "title": "Збережіть",
        "body": "Зберігається у вихідному форматі."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả ảnh vào đây",
        "body": "JPG, PNG hoặc WebP."
      },
      {
        "title": "Tinh chỉnh hoặc chọn preset",
        "body": "Độ sáng, tương phản, bão hòa, màu sắc, làm mờ, thang xám."
      },
      {
        "title": "Xuất ảnh",
        "body": "Lưu theo định dạng gốc."
      }
    ],
    "zh": [
      {
        "title": "拖入照片",
        "body": "支持 JPG、PNG 或 WebP。"
      },
      {
        "title": "手动调整或选择预设",
        "body": "亮度、对比度、饱和度、色调、模糊和灰度。"
      },
      {
        "title": "导出",
        "body": "以原始格式保存。"
      }
    ]
  },
  "qr-code-reader": {
    "ar": [
      {
        "title": "ارفع أو امسح",
        "body": "أسقط صورة، أو انقر «مسح بالكاميرا»."
      },
      {
        "title": "نُفكّك محليًا",
        "body": "كشف دقيق للبكسل عبر jsQR."
      },
      {
        "title": "اقرأ أو افتح",
        "body": "انسخ القيمة، أو افتح الرابط."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte nebo naskenujte",
        "body": "Přetáhněte obrázek nebo klepněte na Skenovat kamerou."
      },
      {
        "title": "Dekódujeme lokálně",
        "body": "Precizní detekce pixelů přes jsQR."
      },
      {
        "title": "Přečtěte nebo otevřete",
        "body": "Zkopírujte hodnotu nebo otevřete odkaz."
      }
    ],
    "de": [
      {
        "title": "Hochladen oder scannen",
        "body": "Bild ablegen oder auf 'Mit Kamera scannen' tippen."
      },
      {
        "title": "Wir dekodieren lokal",
        "body": "Pixelgenaue Erkennung via jsQR."
      },
      {
        "title": "Lesen oder öffnen",
        "body": "Wert kopieren oder den Link direkt öffnen."
      }
    ],
    "es": [
      {
        "title": "Sube o escanea",
        "body": "Arrastra una imagen o pulsa Escanear con la cámara."
      },
      {
        "title": "Decodificamos localmente",
        "body": "Detección de píxeles perfecta mediante jsQR."
      },
      {
        "title": "Lee o abre",
        "body": "Copia el valor o abre el enlace."
      }
    ],
    "fr": [
      {
        "title": "Importez ou scannez",
        "body": "Déposez une image, ou appuyez sur Scanner avec l'appareil photo."
      },
      {
        "title": "Nous décodons localement",
        "body": "Détection pixel parfait via jsQR."
      },
      {
        "title": "Lisez ou ouvrez",
        "body": "Copiez la valeur, ou ouvrez le lien."
      }
    ],
    "hi": [
      {
        "title": "अपलोड या स्कैन करें",
        "body": "एक इमेज डालें, या कैमरे से स्कैन टैप करें।"
      },
      {
        "title": "हम लोकल डीकोड करते हैं",
        "body": "jsQR के ज़रिए पिक्सल-परफेक्ट डिटेक्शन।"
      },
      {
        "title": "पढ़ें या खोलें",
        "body": "वैल्यू कॉपी करें, या लिंक खोलें।"
      }
    ],
    "id": [
      {
        "title": "Unggah atau pindai",
        "body": "Seret gambar, atau ketuk Pindai dari kamera."
      },
      {
        "title": "Kami mendekode secara lokal",
        "body": "Deteksi piksel sempurna via jsQR."
      },
      {
        "title": "Baca atau buka",
        "body": "Salin nilainya, atau buka tautan."
      }
    ],
    "it": [
      {
        "title": "Carica o scansiona",
        "body": "Trascina un'immagine, o tocca 'Scansiona con fotocamera'."
      },
      {
        "title": "Decodifica in locale",
        "body": "Rilevamento preciso al pixel tramite jsQR."
      },
      {
        "title": "Leggi o apri",
        "body": "Copia il valore, oppure apri il link."
      }
    ],
    "ja": [
      {
        "title": "アップロードまたはスキャン",
        "body": "画像をドロップ、またはカメラでスキャン。"
      },
      {
        "title": "ローカルでデコード",
        "body": "jsQR による高精度検出。"
      },
      {
        "title": "読み取りまたは開く",
        "body": "値をコピー、またはリンクを開く。"
      }
    ],
    "ko": [
      {
        "title": "업로드 또는 스캔",
        "body": "이미지를 드롭하거나 카메라로 스캔하세요."
      },
      {
        "title": "로컬에서 디코딩",
        "body": "jsQR을 통한 정밀 감지."
      },
      {
        "title": "읽기 또는 열기",
        "body": "값을 복사하거나 링크를 바로 열 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Upload of scan",
        "body": "Sleep een afbeelding hierheen, of tik op Scannen met camera."
      },
      {
        "title": "We decoderen lokaal",
        "body": "Pixelnauwkeurige detectie via jsQR."
      },
      {
        "title": "Lezen of openen",
        "body": "Kopieer de waarde, of open de link."
      }
    ],
    "pl": [
      {
        "title": "Prześlij lub zeskanuj",
        "body": "Upuść obraz lub dotknij Skanuj z kamery."
      },
      {
        "title": "Dekodujemy lokalnie",
        "body": "Pikselowo precyzyjne wykrywanie przez jsQR."
      },
      {
        "title": "Odczytaj lub otwórz",
        "body": "Skopiuj wartość lub otwórz link."
      }
    ],
    "pt": [
      {
        "title": "Carregue ou digitalize",
        "body": "Arraste uma imagem, ou toque em Digitalizar com câmara."
      },
      {
        "title": "Descodificamos localmente",
        "body": "Deteção precisa via jsQR."
      },
      {
        "title": "Leia ou abra",
        "body": "Copie o valor ou abra o link."
      }
    ],
    "ru": [
      {
        "title": "Загрузите или отсканируйте",
        "body": "Перетащите изображение или нажмите «Сканировать с камеры»."
      },
      {
        "title": "Декодирование локально",
        "body": "Точное распознавание через jsQR."
      },
      {
        "title": "Прочитайте или откройте",
        "body": "Скопируйте значение или откройте ссылку."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp eller skanna",
        "body": "Släpp en bild, eller tryck Skanna med kamera."
      },
      {
        "title": "Vi avkodar lokalt",
        "body": "Pixelperfekt igenkänning via jsQR."
      },
      {
        "title": "Läs eller öppna",
        "body": "Kopiera värdet, eller öppna länken."
      }
    ],
    "tr": [
      {
        "title": "Yükle veya tara",
        "body": "Görsel bırak ya da kamerayla tara seçeneğine dokun."
      },
      {
        "title": "Yerel olarak çözüyoruz",
        "body": "jsQR ile piksel mükemmelliğinde algılama."
      },
      {
        "title": "Oku veya aç",
        "body": "Değeri kopyala ya da bağlantıyı aç."
      }
    ],
    "uk": [
      {
        "title": "Завантажте або скануйте",
        "body": "Перетягніть зображення або натисніть «Сканувати з камери»."
      },
      {
        "title": "Декодування локально",
        "body": "Точне розпізнавання через jsQR."
      },
      {
        "title": "Читайте або відкривайте",
        "body": "Скопіюйте значення або відкрийте посилання."
      }
    ],
    "vi": [
      {
        "title": "Tải lên hoặc quét trực tiếp",
        "body": "Kéo thả ảnh, hoặc nhấn Quét từ camera."
      },
      {
        "title": "Giải mã cục bộ",
        "body": "Nhận diện chính xác từng pixel qua jsQR."
      },
      {
        "title": "Đọc hoặc mở liên kết",
        "body": "Sao chép giá trị, hoặc mở đường link."
      }
    ],
    "zh": [
      {
        "title": "上传或扫描",
        "body": "拖入图片，或点击「相机扫描」。"
      },
      {
        "title": "本地解码",
        "body": "通过 jsQR 进行像素级精准识别。"
      },
      {
        "title": "读取或打开",
        "body": "复制解码内容，或直接打开链接。"
      }
    ]
  },
  "font-converter": {
    "ar": [
      {
        "title": "أفلت خطوطك",
        "body": "TTF أو OTF أو WOFF أو WOFF2 — عدة ملفات دفعة واحدة."
      },
      {
        "title": "اختر صيغة الإخراج",
        "body": "WOFF2 أو WOFF أو TTF."
      },
      {
        "title": "تنزيل",
        "body": "يتم التحويل في متصفحك، ولا يُرفع أبدًا."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte svá písma",
        "body": "TTF, OTF, WOFF nebo WOFF2 — několik najednou."
      },
      {
        "title": "Vyberte výstup",
        "body": "WOFF2, WOFF nebo TTF."
      },
      {
        "title": "Stáhnout",
        "body": "Převedeno ve vašem prohlížeči, nikdy se nenahrává."
      }
    ],
    "de": [
      {
        "title": "Schriften ablegen",
        "body": "TTF, OTF, WOFF oder WOFF2 — mehrere auf einmal."
      },
      {
        "title": "Ausgabe wählen",
        "body": "WOFF2, WOFF oder TTF."
      },
      {
        "title": "Herunterladen",
        "body": "Im Browser konvertiert, nie hochgeladen."
      }
    ],
    "es": [
      {
        "title": "Suelta tus fuentes",
        "body": "TTF, OTF, WOFF o WOFF2 — varias a la vez."
      },
      {
        "title": "Elige la salida",
        "body": "WOFF2, WOFF o TTF."
      },
      {
        "title": "Descargar",
        "body": "Convertido en tu navegador, nunca se sube."
      }
    ],
    "fr": [
      {
        "title": "Déposez vos polices",
        "body": "TTF, OTF, WOFF ou WOFF2 — plusieurs à la fois."
      },
      {
        "title": "Choisissez la sortie",
        "body": "WOFF2, WOFF ou TTF."
      },
      {
        "title": "Téléchargez",
        "body": "Converti dans votre navigateur, jamais envoyé."
      }
    ],
    "hi": [
      {
        "title": "अपने फ़ॉन्ट छोड़ें",
        "body": "TTF, OTF, WOFF या WOFF2 — एक साथ कई।"
      },
      {
        "title": "आउटपुट चुनें",
        "body": "WOFF2, WOFF या TTF।"
      },
      {
        "title": "डाउनलोड करें",
        "body": "आपके ब्राउज़र में बदला गया, कभी अपलोड नहीं हुआ।"
      }
    ],
    "id": [
      {
        "title": "Letakkan font Anda",
        "body": "TTF, OTF, WOFF, atau WOFF2 — beberapa sekaligus."
      },
      {
        "title": "Pilih keluaran",
        "body": "WOFF2, WOFF, atau TTF."
      },
      {
        "title": "Unduh",
        "body": "Dikonversi di peramban Anda, tidak pernah diunggah."
      }
    ],
    "it": [
      {
        "title": "Trascina i tuoi font",
        "body": "TTF, OTF, WOFF o WOFF2 — più di uno alla volta."
      },
      {
        "title": "Scegli l'output",
        "body": "WOFF2, WOFF o TTF."
      },
      {
        "title": "Scarica",
        "body": "Convertito nel tuo browser, mai caricato."
      }
    ],
    "ja": [
      {
        "title": "フォントをドロップ",
        "body": "TTF・OTF・WOFF・WOFF2 — 複数を一度に。"
      },
      {
        "title": "出力を選ぶ",
        "body": "WOFF2・WOFF・TTF。"
      },
      {
        "title": "ダウンロード",
        "body": "ブラウザ内で変換、アップロードは一切なし。"
      }
    ],
    "ko": [
      {
        "title": "글꼴을 끌어다 놓기",
        "body": "TTF, OTF, WOFF 또는 WOFF2 — 여러 개를 한 번에."
      },
      {
        "title": "출력 선택",
        "body": "WOFF2, WOFF 또는 TTF."
      },
      {
        "title": "다운로드",
        "body": "브라우저에서 변환되며 업로드되지 않습니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep je lettertypen",
        "body": "TTF, OTF, WOFF of WOFF2 — meerdere tegelijk."
      },
      {
        "title": "Kies de uitvoer",
        "body": "WOFF2, WOFF of TTF."
      },
      {
        "title": "Downloaden",
        "body": "Geconverteerd in je browser, nooit geüpload."
      }
    ],
    "pl": [
      {
        "title": "Upuść swoje czcionki",
        "body": "TTF, OTF, WOFF lub WOFF2 — kilka naraz."
      },
      {
        "title": "Wybierz format wyjściowy",
        "body": "WOFF2, WOFF lub TTF."
      },
      {
        "title": "Pobierz",
        "body": "Konwertowane w Twojej przeglądarce, nigdy nieprzesyłane."
      }
    ],
    "pt": [
      {
        "title": "Solte suas fontes",
        "body": "TTF, OTF, WOFF ou WOFF2 — várias de uma vez."
      },
      {
        "title": "Escolha a saída",
        "body": "WOFF2, WOFF ou TTF."
      },
      {
        "title": "Baixar",
        "body": "Convertido no seu navegador, nunca enviado."
      }
    ],
    "ru": [
      {
        "title": "Перетащите шрифты",
        "body": "TTF, OTF, WOFF или WOFF2 — несколько сразу."
      },
      {
        "title": "Выберите формат вывода",
        "body": "WOFF2, WOFF или TTF."
      },
      {
        "title": "Скачать",
        "body": "Конвертируется в вашем браузере, никогда не загружается."
      }
    ],
    "sv": [
      {
        "title": "Släpp dina teckensnitt",
        "body": "TTF, OTF, WOFF eller WOFF2 — flera samtidigt."
      },
      {
        "title": "Välj utdata",
        "body": "WOFF2, WOFF eller TTF."
      },
      {
        "title": "Ladda ner",
        "body": "Konverteras i din webbläsare, laddas aldrig upp."
      }
    ],
    "tr": [
      {
        "title": "Yazı tiplerini bırakın",
        "body": "TTF, OTF, WOFF veya WOFF2 — aynı anda birden fazla."
      },
      {
        "title": "Çıktıyı seçin",
        "body": "WOFF2, WOFF veya TTF."
      },
      {
        "title": "İndir",
        "body": "Tarayıcınızda dönüştürülür, asla yüklenmez."
      }
    ],
    "uk": [
      {
        "title": "Перетягніть свої шрифти",
        "body": "TTF, OTF, WOFF або WOFF2 — кілька одночасно."
      },
      {
        "title": "Виберіть формат виводу",
        "body": "WOFF2, WOFF або TTF."
      },
      {
        "title": "Завантажити",
        "body": "Конвертується у вашому браузері, ніколи не завантажується."
      }
    ],
    "vi": [
      {
        "title": "Thả phông chữ của bạn",
        "body": "TTF, OTF, WOFF hoặc WOFF2 — nhiều tệp cùng lúc."
      },
      {
        "title": "Chọn định dạng đầu ra",
        "body": "WOFF2, WOFF hoặc TTF."
      },
      {
        "title": "Tải xuống",
        "body": "Được chuyển đổi trong trình duyệt của bạn, không bao giờ tải lên."
      }
    ],
    "zh": [
      {
        "title": "拖入你的字体",
        "body": "TTF、OTF、WOFF 或 WOFF2 — 一次多个。"
      },
      {
        "title": "选择输出格式",
        "body": "WOFF2、WOFF 或 TTF。"
      },
      {
        "title": "下载",
        "body": "在你的浏览器中转换，绝不上传。"
      }
    ]
  },
  "text-to-speech": {
    "ar": [
      {
        "title": "اكتب نصّك",
        "body": "الصق أو اكتب ما تريد نطقه."
      },
      {
        "title": "اختر صوتًا",
        "body": "اختر من بين عدة أصوات طبيعية."
      },
      {
        "title": "أنشئ ونزّل",
        "body": "استمع ثم نزّل ملف MP3."
      }
    ],
    "cs": [
      {
        "title": "Napište svůj text",
        "body": "Vložte nebo napište, co se má přečíst."
      },
      {
        "title": "Vyberte hlas",
        "body": "Vyberte z několika přirozených hlasů."
      },
      {
        "title": "Vygenerujte a stáhněte",
        "body": "Poslechněte si a poté stáhněte MP3."
      }
    ],
    "de": [
      {
        "title": "Text eingeben",
        "body": "Füge ein oder schreibe, was gesprochen werden soll."
      },
      {
        "title": "Stimme wählen",
        "body": "Wähle aus mehreren natürlichen Stimmen."
      },
      {
        "title": "Erzeugen & herunterladen",
        "body": "Anhören und dann das MP3 herunterladen."
      }
    ],
    "es": [
      {
        "title": "Escribe tu texto",
        "body": "Pega o escribe lo que quieres que se diga."
      },
      {
        "title": "Elige una voz",
        "body": "Elige entre varias voces naturales."
      },
      {
        "title": "Generar y descargar",
        "body": "Escucha y luego descarga el MP3."
      }
    ],
    "fr": [
      {
        "title": "Saisissez votre texte",
        "body": "Collez ou écrivez ce que vous voulez entendre."
      },
      {
        "title": "Choisissez une voix",
        "body": "Choisissez parmi plusieurs voix naturelles."
      },
      {
        "title": "Générez et téléchargez",
        "body": "Écoutez, puis téléchargez le MP3."
      }
    ],
    "hi": [
      {
        "title": "अपना टेक्स्ट टाइप करें",
        "body": "जो बोलवाना है उसे पेस्ट करें या लिखें।"
      },
      {
        "title": "एक आवाज़ चुनें",
        "body": "कई स्वाभाविक आवाज़ों में से चुनें।"
      },
      {
        "title": "बनाएँ और डाउनलोड करें",
        "body": "सुनें, फिर MP3 डाउनलोड करें।"
      }
    ],
    "id": [
      {
        "title": "Ketik teks Anda",
        "body": "Tempel atau tulis apa yang ingin diucapkan."
      },
      {
        "title": "Pilih suara",
        "body": "Pilih dari beberapa suara alami."
      },
      {
        "title": "Buat & unduh",
        "body": "Dengarkan, lalu unduh MP3."
      }
    ],
    "it": [
      {
        "title": "Scrivi il tuo testo",
        "body": "Incolla o scrivi ciò che vuoi far pronunciare."
      },
      {
        "title": "Scegli una voce",
        "body": "Scegli tra più voci naturali."
      },
      {
        "title": "Genera e scarica",
        "body": "Ascolta, poi scarica l'MP3."
      }
    ],
    "ja": [
      {
        "title": "テキストを入力",
        "body": "読み上げたい内容を貼り付けるか入力します。"
      },
      {
        "title": "声を選ぶ",
        "body": "複数の自然な声から選びます。"
      },
      {
        "title": "生成してダウンロード",
        "body": "再生してから MP3 をダウンロード。"
      }
    ],
    "ko": [
      {
        "title": "텍스트 입력",
        "body": "읽어줄 내용을 붙여넣거나 작성하세요."
      },
      {
        "title": "음성 선택",
        "body": "여러 자연스러운 음성 중에서 선택하세요."
      },
      {
        "title": "생성 후 다운로드",
        "body": "들어본 다음 MP3 를 다운로드하세요."
      }
    ],
    "nl": [
      {
        "title": "Typ je tekst",
        "body": "Plak of schrijf wat je wilt laten uitspreken."
      },
      {
        "title": "Kies een stem",
        "body": "Kies uit meerdere natuurlijke stemmen."
      },
      {
        "title": "Genereren & downloaden",
        "body": "Luister en download daarna de MP3."
      }
    ],
    "pl": [
      {
        "title": "Wpisz swój tekst",
        "body": "Wklej lub napisz, co ma zostać wypowiedziane."
      },
      {
        "title": "Wybierz głos",
        "body": "Wybierz spośród kilku naturalnych głosów."
      },
      {
        "title": "Generuj i pobierz",
        "body": "Posłuchaj, a następnie pobierz MP3."
      }
    ],
    "pt": [
      {
        "title": "Digite seu texto",
        "body": "Cole ou escreva o que deseja que seja falado."
      },
      {
        "title": "Escolha uma voz",
        "body": "Escolha entre várias vozes naturais."
      },
      {
        "title": "Gerar e baixar",
        "body": "Ouça e depois baixe o MP3."
      }
    ],
    "ru": [
      {
        "title": "Введите текст",
        "body": "Вставьте или напишите то, что нужно озвучить."
      },
      {
        "title": "Выберите голос",
        "body": "Выберите из нескольких естественных голосов."
      },
      {
        "title": "Сгенерируйте и скачайте",
        "body": "Прослушайте, затем скачайте MP3."
      }
    ],
    "sv": [
      {
        "title": "Skriv din text",
        "body": "Klistra in eller skriv det du vill ska läsas upp."
      },
      {
        "title": "Välj en röst",
        "body": "Välj bland flera naturliga röster."
      },
      {
        "title": "Generera och ladda ner",
        "body": "Lyssna och ladda sedan ner MP3-filen."
      }
    ],
    "tr": [
      {
        "title": "Metninizi yazın",
        "body": "Seslendirmek istediğinizi yapıştırın veya yazın."
      },
      {
        "title": "Bir ses seçin",
        "body": "Birkaç doğal ses arasından seçin."
      },
      {
        "title": "Oluştur ve indir",
        "body": "Dinleyin, ardından MP3'ü indirin."
      }
    ],
    "uk": [
      {
        "title": "Введіть свій текст",
        "body": "Вставте або напишіть те, що потрібно озвучити."
      },
      {
        "title": "Виберіть голос",
        "body": "Виберіть з кількох природних голосів."
      },
      {
        "title": "Згенеруйте та завантажте",
        "body": "Прослухайте, а потім завантажте MP3."
      }
    ],
    "vi": [
      {
        "title": "Nhập văn bản của bạn",
        "body": "Dán hoặc viết nội dung bạn muốn đọc."
      },
      {
        "title": "Chọn một giọng",
        "body": "Chọn từ nhiều giọng tự nhiên."
      },
      {
        "title": "Tạo và tải xuống",
        "body": "Nghe thử, rồi tải tệp MP3."
      }
    ],
    "zh": [
      {
        "title": "输入你的文本",
        "body": "粘贴或写下你想要朗读的内容。"
      },
      {
        "title": "选择一个声音",
        "body": "从多种自然声音中选择。"
      },
      {
        "title": "生成并下载",
        "body": "试听后下载 MP3。"
      }
    ]
  },
  "qr-generator": {
    "ar": [
      {
        "title": "اكتب المحتوى",
        "body": "رابط URL أو نص أو Wi-Fi أو vCard…"
      },
      {
        "title": "خصّص المظهر",
        "body": "الألوان والحجم وتصحيح الأخطاء."
      },
      {
        "title": "حمّل PNG",
        "body": "اطبع أو شارك أو ضمّن."
      }
    ],
    "cs": [
      {
        "title": "Zadejte obsah",
        "body": "URL, text, Wi-Fi, vCard…"
      },
      {
        "title": "Přizpůsobte vzhled",
        "body": "Barvy, velikost a úroveň opravy chyb."
      },
      {
        "title": "Stáhněte PNG",
        "body": "Vytiskněte, sdílejte nebo vložte."
      }
    ],
    "de": [
      {
        "title": "Inhalt eingeben",
        "body": "URL, Text, WLAN, vCard …"
      },
      {
        "title": "Aussehen anpassen",
        "body": "Farben, Größe und Fehlerkorrektur."
      },
      {
        "title": "PNG herunterladen",
        "body": "Drucken, teilen oder einbetten."
      }
    ],
    "es": [
      {
        "title": "Escribe el contenido",
        "body": "URL, texto, Wi-Fi, vCard…"
      },
      {
        "title": "Personaliza el aspecto",
        "body": "Colores, tamaño y corrección de errores."
      },
      {
        "title": "Descarga el PNG",
        "body": "Imprímelo, compártelo o incrústalo."
      }
    ],
    "fr": [
      {
        "title": "Tapez le contenu",
        "body": "URL, texte, Wi-Fi, vCard…"
      },
      {
        "title": "Personnalisez l'apparence",
        "body": "Couleurs, taille et niveau de correction d'erreur."
      },
      {
        "title": "Téléchargez le PNG",
        "body": "Imprimez, partagez ou intégrez."
      }
    ],
    "hi": [
      {
        "title": "सामग्री टाइप करें",
        "body": "URL, टेक्स्ट, Wi-Fi, vCard…"
      },
      {
        "title": "लुक कस्टमाइज़ करें",
        "body": "रंग, साइज़ और एरर-करेक्शन।"
      },
      {
        "title": "PNG डाउनलोड करें",
        "body": "प्रिंट, शेयर या एम्बेड करें।"
      }
    ],
    "id": [
      {
        "title": "Ketik kontennya",
        "body": "URL, teks, Wi-Fi, vCard…"
      },
      {
        "title": "Sesuaikan tampilan",
        "body": "Warna, ukuran, dan koreksi kesalahan."
      },
      {
        "title": "Unduh PNG",
        "body": "Cetak, bagikan, atau sematkan."
      }
    ],
    "it": [
      {
        "title": "Inserisci il contenuto",
        "body": "URL, testo, Wi-Fi, vCard…"
      },
      {
        "title": "Personalizza l'aspetto",
        "body": "Colori, dimensione e livello di correzione degli errori."
      },
      {
        "title": "Scarica il PNG",
        "body": "Stampalo, condividilo o incorporalo."
      }
    ],
    "ja": [
      {
        "title": "内容を入力",
        "body": "URL・テキスト・Wi-Fi・vCard など。"
      },
      {
        "title": "外観をカスタマイズ",
        "body": "色・サイズ・エラー訂正レベルを設定。"
      },
      {
        "title": "PNGをダウンロード",
        "body": "印刷・シェア・埋め込みにすぐ使えます。"
      }
    ],
    "ko": [
      {
        "title": "내용 입력",
        "body": "URL, 텍스트, Wi-Fi, vCard 등."
      },
      {
        "title": "디자인 설정",
        "body": "색상, 크기, 오류 수정 수준."
      },
      {
        "title": "PNG 다운로드",
        "body": "인쇄, 공유 또는 임베드."
      }
    ],
    "nl": [
      {
        "title": "Typ de inhoud",
        "body": "URL, tekst, Wi-Fi, vCard…"
      },
      {
        "title": "Pas de weergave aan",
        "body": "Kleuren, grootte en foutcorrectieniveau."
      },
      {
        "title": "Download de PNG",
        "body": "Afdrukken, delen of insluiten."
      }
    ],
    "pl": [
      {
        "title": "Wpisz treść",
        "body": "Adres URL, tekst, Wi-Fi, vCard…"
      },
      {
        "title": "Dostosuj wygląd",
        "body": "Kolory, rozmiar i korekcja błędów."
      },
      {
        "title": "Pobierz PNG",
        "body": "Wydrukuj, udostępnij lub osadź."
      }
    ],
    "pt": [
      {
        "title": "Escreva o conteúdo",
        "body": "URL, texto, Wi-Fi, vCard…"
      },
      {
        "title": "Personalize o aspeto",
        "body": "Cores, tamanho e correção de erros."
      },
      {
        "title": "Baixe o PNG",
        "body": "Imprima, partilhe ou incorpore."
      }
    ],
    "ru": [
      {
        "title": "Введите содержимое",
        "body": "URL, текст, Wi-Fi, vCard…"
      },
      {
        "title": "Настройте внешний вид",
        "body": "Цвета, размер и уровень коррекции ошибок."
      },
      {
        "title": "Скачайте PNG",
        "body": "Для печати, публикации или встраивания."
      }
    ],
    "sv": [
      {
        "title": "Ange innehållet",
        "body": "URL, text, Wi-Fi, vCard…"
      },
      {
        "title": "Anpassa utseendet",
        "body": "Färger, storlek och felkorrigering."
      },
      {
        "title": "Ladda ned PNG:en",
        "body": "Skriv ut, dela eller bädda in."
      }
    ],
    "tr": [
      {
        "title": "İçeriği yaz",
        "body": "URL, metin, Wi-Fi, vCard..."
      },
      {
        "title": "Görünümü özelleştir",
        "body": "Renkler, boyut ve hata düzeltme."
      },
      {
        "title": "PNG indir",
        "body": "Yazdır, paylaş veya göm."
      }
    ],
    "uk": [
      {
        "title": "Введіть вміст",
        "body": "URL, текст, Wi-Fi, vCard…"
      },
      {
        "title": "Налаштуйте вигляд",
        "body": "Кольори, розмір і рівень виправлення помилок."
      },
      {
        "title": "Завантажте PNG",
        "body": "Для друку, поширення або вбудовування."
      }
    ],
    "vi": [
      {
        "title": "Nhập nội dung",
        "body": "URL, văn bản, Wi-Fi, vCard…"
      },
      {
        "title": "Tuỳ chỉnh giao diện",
        "body": "Màu sắc, kích thước và mức sửa lỗi."
      },
      {
        "title": "Tải xuống PNG",
        "body": "In, chia sẻ hoặc nhúng vào nội dung."
      }
    ],
    "zh": [
      {
        "title": "输入内容",
        "body": "URL、文本、Wi-Fi、vCard 等均可。"
      },
      {
        "title": "自定义外观",
        "body": "颜色、尺寸和纠错级别。"
      },
      {
        "title": "下载 PNG",
        "body": "可用于打印、分享或嵌入使用。"
      }
    ]
  },
  "receipt-scanner": {
    "ar": [
      {
        "title": "ارفع صورة الإيصال",
        "body": "ورقي أو لقطة شاشة PDF — كلاهما يعمل."
      },
      {
        "title": "الذكاء الاصطناعي يُحلّل الإجماليات",
        "body": "التاجر والتاريخ والمجموع الفرعي والضريبة والإجمالي وبنود الفاتورة."
      },
      {
        "title": "صدّر كـ CSV",
        "body": "يُستورَد مباشرةً في Excel أو Notion أو أداة المحاسبة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte fotku účtenky",
        "body": "Papírová nebo snímek PDF — obojí funguje."
      },
      {
        "title": "AI zpracuje součty",
        "body": "Obchodník, datum, mezisoučet, daň, celkem, jednotlivé položky."
      },
      {
        "title": "Exportujte jako CSV",
        "body": "Importujte přímo do Excel, Notion nebo svého účetního nástroje."
      }
    ],
    "de": [
      {
        "title": "Belegfoto hochladen",
        "body": "Papierbeleg oder PDF-Screenshot — beides funktioniert."
      },
      {
        "title": "KI liest die Beträge aus",
        "body": "Händler, Datum, Zwischensumme, Steuer, Gesamtbetrag, Einzelposten."
      },
      {
        "title": "Als CSV exportieren",
        "body": "Direkt in Excel, Notion oder dein Buchhaltungstool importierbar."
      }
    ],
    "es": [
      {
        "title": "Sube una foto del ticket",
        "body": "Papel o captura de PDF — ambos funcionan."
      },
      {
        "title": "La IA analiza los totales",
        "body": "Comercio, fecha, subtotal, impuestos, total y líneas de detalle."
      },
      {
        "title": "Exporta como CSV",
        "body": "Importa directamente en Excel, Notion o tu herramienta de contabilidad."
      }
    ],
    "fr": [
      {
        "title": "Importez une photo de ticket",
        "body": "Ticket papier ou capture PDF — les deux fonctionnent."
      },
      {
        "title": "L'IA analyse les totaux",
        "body": "Commerçant, date, sous-total, taxes, total, détail des articles."
      },
      {
        "title": "Exportez en CSV",
        "body": "S'importe directement dans Excel, Notion ou votre outil de comptabilité."
      }
    ],
    "hi": [
      {
        "title": "रसीद की फोटो अपलोड करें",
        "body": "पेपर या PDF स्क्रीनशॉट — दोनों काम करते हैं।"
      },
      {
        "title": "AI टोटल पार्स करता है",
        "body": "मर्चेंट, तारीख, सबटोटल, टैक्स, कुल, लाइन आइटम।"
      },
      {
        "title": "CSV के रूप में एक्सपोर्ट करें",
        "body": "सीधे Excel, Notion या आपके अकाउंटिंग टूल में इम्पोर्ट होता है।"
      }
    ],
    "id": [
      {
        "title": "Unggah foto struk",
        "body": "Struk kertas atau tangkapan layar PDF — keduanya bisa."
      },
      {
        "title": "AI mengurai totalnya",
        "body": "Pedagang, tanggal, subtotal, pajak, total, item baris."
      },
      {
        "title": "Ekspor sebagai CSV",
        "body": "Langsung diimpor ke Excel, Notion, atau alat akuntansimu."
      }
    ],
    "it": [
      {
        "title": "Carica la foto dello scontrino",
        "body": "Cartaceo o screenshot di PDF — entrambi funzionano."
      },
      {
        "title": "L'AI analizza i totali",
        "body": "Esercente, data, subtotale, IVA, totale, voci di spesa."
      },
      {
        "title": "Esporta come CSV",
        "body": "Si importa direttamente in Excel, Notion o nel tuo software contabile."
      }
    ],
    "ja": [
      {
        "title": "レシートの写真をアップロード",
        "body": "紙のレシートでも PDF スクリーンショットでも対応。"
      },
      {
        "title": "AIが合計金額を解析",
        "body": "店舗名・日付・小計・税金・合計・明細を抽出。"
      },
      {
        "title": "CSVとしてエクスポート",
        "body": "Excel、Notion、その他会計ツールに直接インポートできます。"
      }
    ],
    "ko": [
      {
        "title": "영수증 사진 업로드",
        "body": "종이 영수증이나 PDF 스크린샷 — 둘 다 가능합니다."
      },
      {
        "title": "AI가 금액을 파싱합니다",
        "body": "가맹점, 날짜, 소계, 세금, 합계, 항목 목록."
      },
      {
        "title": "CSV로 내보내기",
        "body": "Excel, Notion 또는 회계 도구에 바로 가져올 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Upload een foto van een bon",
        "body": "Papier of PDF-schermafbeelding — beide werken."
      },
      {
        "title": "AI parseert de bedragen",
        "body": "Handelaar, datum, subtotaal, belasting, totaal, regelitems."
      },
      {
        "title": "Exporteer als CSV",
        "body": "Direct te importeren in Excel, Notion of je boekhoudtool."
      }
    ],
    "pl": [
      {
        "title": "Prześlij zdjęcie paragonu",
        "body": "Papierowy lub zrzut ekranu PDF — oba działają."
      },
      {
        "title": "AI analizuje kwoty",
        "body": "Sprzedawca, data, kwota netto, podatek, suma, pozycje."
      },
      {
        "title": "Eksportuj jako CSV",
        "body": "Importuje się bezpośrednio do Excel, Notion lub Twojego narzędzia księgowego."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma foto de recibo",
        "body": "Papel ou captura de PDF — ambos funcionam."
      },
      {
        "title": "A IA analisa os totais",
        "body": "Comerciante, data, subtotal, impostos, total, itens."
      },
      {
        "title": "Exporte como CSV",
        "body": "Importa diretamente para Excel, Notion ou a sua ferramenta de contabilidade."
      }
    ],
    "ru": [
      {
        "title": "Загрузите фото чека",
        "body": "Бумажный или PDF-скриншот — оба варианта работают."
      },
      {
        "title": "ИИ разбирает суммы",
        "body": "Продавец, дата, подытог, налог, итого, позиции."
      },
      {
        "title": "Экспортируйте как CSV",
        "body": "Импортируйте прямо в Excel, Notion или систему учёта."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp ett kvittofoto",
        "body": "Papper eller PDF-skärmdump — båda fungerar."
      },
      {
        "title": "AI tolkar summorna",
        "body": "Handlare, datum, delsumma, skatt, totalt, radartiklar."
      },
      {
        "title": "Exportera som CSV",
        "body": "Importeras direkt till Excel, Notion eller ditt bokföringsprogram."
      }
    ],
    "tr": [
      {
        "title": "Fiş fotoğrafı yükle",
        "body": "Kağıt veya PDF ekran görüntüsü — ikisi de çalışır."
      },
      {
        "title": "AI toplamları ayrıştırıyor",
        "body": "Satıcı, tarih, ara toplam, vergi, toplam, kalem satırları."
      },
      {
        "title": "CSV olarak dışa aktar",
        "body": "Doğrudan Excel, Notion veya muhasebe aracınıza aktarır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте фото чека",
        "body": "Паперовий або скриншот PDF — обидва варіанти працюють."
      },
      {
        "title": "ШІ парсує суми",
        "body": "Магазин, дата, підсума, податок, загальна сума, позиції."
      },
      {
        "title": "Збережіть як CSV",
        "body": "Імпортується прямо в Excel, Notion або вашу бухгалтерську програму."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh hóa đơn lên",
        "body": "Ảnh giấy hoặc screenshot PDF — cả hai đều được."
      },
      {
        "title": "AI phân tích các khoản",
        "body": "Người bán, ngày, tạm tính, thuế, tổng cộng, từng dòng mục."
      },
      {
        "title": "Xuất dạng CSV",
        "body": "Nhập thẳng vào Excel, Notion hoặc phần mềm kế toán của bạn."
      }
    ],
    "zh": [
      {
        "title": "上传收据照片",
        "body": "纸质收据或 PDF 截图均可。"
      },
      {
        "title": "AI 解析金额",
        "body": "商家、日期、小计、税额、总金额和明细项目。"
      },
      {
        "title": "导出 CSV",
        "body": "可直接导入 Excel、Notion 或记账工具。"
      }
    ]
  },
  "regex-tester": {
    "ar": [
      {
        "title": "أدخل نمطًا",
        "body": "اكتب تعبيرك النظامي واختر الأعلام (g وi وm وs)."
      },
      {
        "title": "الصق نصًا للاختبار",
        "body": "تُبرز التطابقات أثناء الكتابة."
      },
      {
        "title": "افحص المجموعات",
        "body": "تُعرض كل تطابقات ومجموعات الالتقاط."
      }
    ],
    "cs": [
      {
        "title": "Zadejte vzor",
        "body": "Napište regulární výraz a vyberte příznaky (g, i, m, s)."
      },
      {
        "title": "Vložte testovací text",
        "body": "Shody se zvýrazňují při psaní."
      },
      {
        "title": "Prozkoumejte skupiny",
        "body": "Všechny shody a zachycené skupiny jsou vypísány."
      }
    ],
    "de": [
      {
        "title": "Muster eingeben",
        "body": "Regex eingeben und Flags wählen (g, i, m, s)."
      },
      {
        "title": "Testtext einfügen",
        "body": "Treffer werden beim Tippen hervorgehoben."
      },
      {
        "title": "Gruppen untersuchen",
        "body": "Jeder Treffer und jede Capture-Gruppe wird aufgelistet."
      }
    ],
    "es": [
      {
        "title": "Introduce un patrón",
        "body": "Escribe tu regex y elige las opciones (g, i, m, s)."
      },
      {
        "title": "Pega el texto de prueba",
        "body": "Las coincidencias se resaltan mientras escribes."
      },
      {
        "title": "Inspecciona los grupos",
        "body": "Cada coincidencia y grupo de captura se lista por separado."
      }
    ],
    "fr": [
      {
        "title": "Entrez un motif",
        "body": "Tapez votre regex et choisissez les drapeaux (g, i, m, s)."
      },
      {
        "title": "Collez le texte de test",
        "body": "Les correspondances se surlignent au fil de la frappe."
      },
      {
        "title": "Inspectez les groupes",
        "body": "Chaque correspondance et groupe de capture est listé."
      }
    ],
    "hi": [
      {
        "title": "पैटर्न दर्ज करें",
        "body": "अपना regex टाइप करें और फ्लैग्स चुनें (g, i, m, s)।"
      },
      {
        "title": "टेस्ट टेक्स्ट पेस्ट करें",
        "body": "टाइप करते ही मैच हाइलाइट होते हैं।"
      },
      {
        "title": "ग्रुप्स जांचें",
        "body": "हर मैच और कैप्चर ग्रुप सूचीबद्ध है।"
      }
    ],
    "id": [
      {
        "title": "Masukkan pola",
        "body": "Ketik regex kamu dan pilih flag (g, i, m, s)."
      },
      {
        "title": "Tempel teks uji",
        "body": "Kecocokan disorot saat kamu mengetik."
      },
      {
        "title": "Periksa grup",
        "body": "Setiap kecocokan dan grup tangkapan ditampilkan."
      }
    ],
    "it": [
      {
        "title": "Inserisci un pattern",
        "body": "Digita la tua regex e scegli i flag (g, i, m, s)."
      },
      {
        "title": "Incolla il testo di test",
        "body": "I match si evidenziano mentre scrivi."
      },
      {
        "title": "Esamina i gruppi",
        "body": "Ogni match e gruppo di cattura viene elencato."
      }
    ],
    "ja": [
      {
        "title": "パターンを入力",
        "body": "正規表現を入力してフラグ（g、i、m、s）を選択。"
      },
      {
        "title": "テストテキストをペースト",
        "body": "入力しながらマッチ箇所がハイライト表示。"
      },
      {
        "title": "グループを確認",
        "body": "全マッチとキャプチャグループが一覧表示されます。"
      }
    ],
    "ko": [
      {
        "title": "패턴 입력",
        "body": "정규식을 입력하고 플래그(g, i, m, s)를 선택하세요."
      },
      {
        "title": "테스트 텍스트 붙여넣기",
        "body": "입력하는 동안 매칭 결과가 강조 표시됩니다."
      },
      {
        "title": "그룹 확인",
        "body": "모든 매치와 캡처 그룹이 목록으로 표시됩니다."
      }
    ],
    "nl": [
      {
        "title": "Voer een patroon in",
        "body": "Typ je regex en kies vlaggen (g, i, m, s)."
      },
      {
        "title": "Plak testtekst",
        "body": "Overeenkomsten worden gemarkeerd terwijl je typt."
      },
      {
        "title": "Bekijk groepen",
        "body": "Elke overeenkomst en vastgelegde groep wordt weergegeven."
      }
    ],
    "pl": [
      {
        "title": "Wpisz wzorzec",
        "body": "Wpisz wyrażenie regularne i wybierz flagi (g, i, m, s)."
      },
      {
        "title": "Wklej tekst testowy",
        "body": "Dopasowania są podświetlane na bieżąco podczas pisania."
      },
      {
        "title": "Sprawdź grupy",
        "body": "Każde dopasowanie i grupa przechwytująca są wyświetlane na liście."
      }
    ],
    "pt": [
      {
        "title": "Introduza um padrão",
        "body": "Escreva a sua regex e selecione as flags (g, i, m, s)."
      },
      {
        "title": "Cole o texto de teste",
        "body": "As correspondências são realçadas enquanto escreve."
      },
      {
        "title": "Inspecione os grupos",
        "body": "Cada correspondência e grupo de captura é listado."
      }
    ],
    "ru": [
      {
        "title": "Введите шаблон",
        "body": "Напишите регулярное выражение и выберите флаги (g, i, m, s)."
      },
      {
        "title": "Вставьте тестовый текст",
        "body": "Совпадения подсвечиваются по мере ввода."
      },
      {
        "title": "Просматривайте группы",
        "body": "Все совпадения и группы захвата перечислены."
      }
    ],
    "sv": [
      {
        "title": "Ange ett mönster",
        "body": "Skriv ditt regex och välj flaggor (g, i, m, s)."
      },
      {
        "title": "Klistra in testtext",
        "body": "Träffar markeras medan du skriver."
      },
      {
        "title": "Granska grupper",
        "body": "Varje träff och fångstgrupp listas."
      }
    ],
    "tr": [
      {
        "title": "Bir kalıp gir",
        "body": "Regex'ini yaz ve bayrakları seç (g, i, m, s)."
      },
      {
        "title": "Test metni yapıştır",
        "body": "Yazarken eşleşmeler vurgulanır."
      },
      {
        "title": "Grupları incele",
        "body": "Her eşleşme ve yakalama grubu listelenir."
      }
    ],
    "uk": [
      {
        "title": "Введіть шаблон",
        "body": "Напишіть regex та оберіть прапорці (g, i, m, s)."
      },
      {
        "title": "Вставте тестовий текст",
        "body": "Збіги підсвічуються під час введення."
      },
      {
        "title": "Перегляньте групи",
        "body": "Всі збіги та групи захоплення виведено в списку."
      }
    ],
    "vi": [
      {
        "title": "Nhập pattern",
        "body": "Gõ regex và chọn cờ (g, i, m, s)."
      },
      {
        "title": "Dán văn bản kiểm tra",
        "body": "Các kết quả khớp được tô sáng khi bạn gõ."
      },
      {
        "title": "Xem chi tiết nhóm",
        "body": "Mọi kết quả khớp và nhóm capture đều được liệt kê."
      }
    ],
    "zh": [
      {
        "title": "输入正则表达式",
        "body": "输入模式并选择标志（g、i、m、s）。"
      },
      {
        "title": "粘贴测试文本",
        "body": "输入时匹配结果实时高亮显示。"
      },
      {
        "title": "查看分组",
        "body": "列出每个匹配项及其捕获分组。"
      }
    ]
  },
  "remove-background": {
    "ar": [
      {
        "title": "ارفع صورة",
        "body": "JPG أو PNG أو WebP — تبقى على جهازك."
      },
      {
        "title": "الذكاء الاصطناعي يقطع الموضوع",
        "body": "يعمل في متصفحك عبر WebAssembly، بلا رفع."
      },
      {
        "title": "حمّل PNG شفافًا",
        "body": "جاهز للتصميم والعروض التقديمية والتجارة الإلكترونية."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "JPG, PNG nebo WebP — zůstane na vašem zařízení."
      },
      {
        "title": "AI vystřihne objekt",
        "body": "Zpracování probíhá v prohlížeči přes WebAssembly, bez nahrávání."
      },
      {
        "title": "Stáhněte průhledné PNG",
        "body": "Připraveno pro design, prezentace nebo e-commerce."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "JPG, PNG oder WebP — bleibt auf deinem Gerät."
      },
      {
        "title": "KI schneidet das Motiv aus",
        "body": "Läuft via WebAssembly im Browser — kein Upload."
      },
      {
        "title": "Transparentes PNG herunterladen",
        "body": "Direkt für Design, Präsentationen oder E-Commerce bereit."
      }
    ],
    "es": [
      {
        "title": "Sube una imagen",
        "body": "JPG, PNG o WebP — se queda en tu dispositivo."
      },
      {
        "title": "La IA recorta el sujeto",
        "body": "Se ejecuta en tu navegador vía WebAssembly, sin subidas."
      },
      {
        "title": "Descarga el PNG transparente",
        "body": "Listo para diseño, presentaciones o e-commerce."
      }
    ],
    "fr": [
      {
        "title": "Importez une image",
        "body": "JPG, PNG ou WebP — reste sur votre appareil."
      },
      {
        "title": "L'IA détoutre le sujet",
        "body": "Tourne dans votre navigateur via WebAssembly, sans envoi."
      },
      {
        "title": "Téléchargez le PNG transparent",
        "body": "Prêt pour le design, les présentations ou le e-commerce."
      }
    ],
    "hi": [
      {
        "title": "एक इमेज अपलोड करें",
        "body": "JPG, PNG या WebP — आपके डिवाइस पर रहती है।"
      },
      {
        "title": "AI विषय को काटता है",
        "body": "WebAssembly के ज़रिए ब्राउज़र में चलता है, कोई अपलोड नहीं।"
      },
      {
        "title": "ट्रांसपेरेंट PNG डाउनलोड करें",
        "body": "डिज़ाइन, स्लाइड या ई-कॉमर्स के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambar",
        "body": "JPG, PNG, atau WebP — tetap di perangkatmu."
      },
      {
        "title": "AI memotong subjek",
        "body": "Berjalan di browsermu via WebAssembly, tanpa unggah."
      },
      {
        "title": "Unduh PNG transparan",
        "body": "Siap untuk desain, presentasi, atau e-commerce."
      }
    ],
    "it": [
      {
        "title": "Carica un'immagine",
        "body": "JPG, PNG o WebP — rimane sul tuo dispositivo."
      },
      {
        "title": "L'AI ritaglia il soggetto",
        "body": "Elaborazione nel browser tramite WebAssembly, senza upload."
      },
      {
        "title": "Scarica il PNG trasparente",
        "body": "Pronto per design, presentazioni o e-commerce."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "JPG、PNG または WebP。デバイス上に保持されます。"
      },
      {
        "title": "AIが被写体を切り抜き",
        "body": "WebAssembly でブラウザ上で処理。アップロード不要。"
      },
      {
        "title": "透過PNGをダウンロード",
        "body": "デザイン・スライド・ECサイトにすぐ使えます。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "JPG, PNG 또는 WebP — 기기에 머무릅니다."
      },
      {
        "title": "AI가 피사체를 분리합니다",
        "body": "WebAssembly를 통해 브라우저에서 실행되며, 업로드가 없습니다."
      },
      {
        "title": "투명 PNG 다운로드",
        "body": "디자인, 슬라이드, 이커머스에 바로 사용하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload een afbeelding",
        "body": "JPG, PNG of WebP — blijft op je apparaat."
      },
      {
        "title": "AI knipt het onderwerp uit",
        "body": "Verloopt in je browser via WebAssembly, geen upload."
      },
      {
        "title": "Download transparante PNG",
        "body": "Klaar voor design, presentaties of e-commerce."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "JPG, PNG lub WebP — zostaje na Twoim urządzeniu."
      },
      {
        "title": "AI wycina obiekt",
        "body": "Działa w przeglądarce przez WebAssembly, bez przesyłania pliku."
      },
      {
        "title": "Pobierz przezroczyste PNG",
        "body": "Gotowe do projektowania, prezentacji lub e-commerce."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma imagem",
        "body": "JPG, PNG ou WebP — fica no seu dispositivo."
      },
      {
        "title": "A IA recorta o sujeito",
        "body": "Corre no browser via WebAssembly, sem upload."
      },
      {
        "title": "Baixe o PNG transparente",
        "body": "Pronto para design, apresentações ou e-commerce."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPG, PNG или WebP — остаётся на вашем устройстве."
      },
      {
        "title": "ИИ вырезает объект",
        "body": "Обработка через WebAssembly в браузере, без загрузки на сервер."
      },
      {
        "title": "Скачайте PNG с прозрачным фоном",
        "body": "Готово для дизайна, презентаций или интернет-магазина."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en bild",
        "body": "JPG, PNG eller WebP — stannar på din enhet."
      },
      {
        "title": "AI klipper ut motivet",
        "body": "Körs i din webbläsare via WebAssembly, ingen uppladdning."
      },
      {
        "title": "Ladda ned transparent PNG",
        "body": "Redo för design, presentationer eller e-handel."
      }
    ],
    "tr": [
      {
        "title": "Bir görsel yükle",
        "body": "JPG, PNG veya WebP — cihazında kalır."
      },
      {
        "title": "AI özneyi kesip çıkarıyor",
        "body": "WebAssembly aracılığıyla tarayıcında çalışır, yükleme yok."
      },
      {
        "title": "Şeffaf PNG indir",
        "body": "Tasarım, sunum slaytları veya e-ticaret için hazır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPG, PNG або WebP — залишається на пристрої."
      },
      {
        "title": "ШІ вирізає обʼєкт",
        "body": "Працює у браузері через WebAssembly — без завантаження на сервер."
      },
      {
        "title": "Завантажте прозорий PNG",
        "body": "Готово для дизайну, презентацій або інтернет-магазину."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "JPG, PNG hoặc WebP — ở lại trên thiết bị của bạn."
      },
      {
        "title": "AI tách đối tượng ra",
        "body": "Chạy trong trình duyệt qua WebAssembly, không tải lên."
      },
      {
        "title": "Tải xuống PNG trong suốt",
        "body": "Dùng ngay cho thiết kế, slide hoặc thương mại điện tử."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "支持 JPG、PNG 或 WebP，文件保留在本地设备。"
      },
      {
        "title": "AI 抠出主体",
        "body": "通过 WebAssembly 在浏览器中运行，无需上传。"
      },
      {
        "title": "下载透明 PNG",
        "body": "可用于设计、演示或电商场景。"
      }
    ]
  },
  "remove-video-background": {
    "ar": [
      {
        "title": "ارفع فيديو",
        "body": "MP4 أو MOV أو WebM — يبقى على جهازك."
      },
      {
        "title": "اختر الخلفية",
        "body": "شفافة أو شاشة خضراء أو بيضاء أو سوداء أو أي لون مخصص."
      },
      {
        "title": "حمّل النتيجة",
        "body": "WebM شفاف، أو MP4 باللون الذي اخترته."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte video",
        "body": "MP4, MOV nebo WebM — zůstane na vašem zařízení."
      },
      {
        "title": "Vyberte pozadí",
        "body": "Průhledné, zelené plátno, bílé, černé nebo libovolná barva."
      },
      {
        "title": "Stáhněte výsledek",
        "body": "Průhledné WebM nebo MP4 s vámi zvolenou barvou."
      }
    ],
    "de": [
      {
        "title": "Video hochladen",
        "body": "MP4, MOV oder WebM — bleibt auf deinem Gerät."
      },
      {
        "title": "Hintergrund wählen",
        "body": "Transparent, Greenscreen, Weiß, Schwarz oder eine beliebige Farbe."
      },
      {
        "title": "Ergebnis herunterladen",
        "body": "Transparentes WebM oder ein MP4 mit deiner gewählten Farbe."
      }
    ],
    "es": [
      {
        "title": "Sube un vídeo",
        "body": "MP4, MOV o WebM — se queda en tu dispositivo."
      },
      {
        "title": "Elige el fondo",
        "body": "Transparente, pantalla verde, blanco, negro o cualquier color personalizado."
      },
      {
        "title": "Descarga el resultado",
        "body": "WebM transparente, o MP4 con el color que hayas elegido."
      }
    ],
    "fr": [
      {
        "title": "Importez une vidéo",
        "body": "MP4, MOV ou WebM — reste sur votre appareil."
      },
      {
        "title": "Choisissez un fond",
        "body": "Transparent, écran vert, blanc, noir, ou toute couleur personnalisée."
      },
      {
        "title": "Téléchargez le résultat",
        "body": "WebM transparent, ou un MP4 avec la couleur de votre choix."
      }
    ],
    "hi": [
      {
        "title": "वीडियो अपलोड करें",
        "body": "MP4, MOV या WebM — आपके डिवाइस पर रहता है।"
      },
      {
        "title": "बैकग्राउंड चुनें",
        "body": "ट्रांसपेरेंट, ग्रीन स्क्रीन, सफेद, काला, या कोई भी कस्टम रंग।"
      },
      {
        "title": "परिणाम डाउनलोड करें",
        "body": "ट्रांसपेरेंट WebM, या आपके चुने रंग के साथ MP4।"
      }
    ],
    "id": [
      {
        "title": "Unggah video",
        "body": "MP4, MOV, atau WebM — tetap di perangkatmu."
      },
      {
        "title": "Pilih latar belakang",
        "body": "Transparan, green screen, putih, hitam, atau warna kustom apa pun."
      },
      {
        "title": "Unduh hasilnya",
        "body": "WebM transparan, atau MP4 dengan warna pilihanmu."
      }
    ],
    "it": [
      {
        "title": "Carica un video",
        "body": "MP4, MOV o WebM — rimane sul tuo dispositivo."
      },
      {
        "title": "Scegli uno sfondo",
        "body": "Trasparente, green screen, bianco, nero o qualsiasi colore personalizzato."
      },
      {
        "title": "Scarica il risultato",
        "body": "WebM trasparente, o MP4 con il colore che hai scelto."
      }
    ],
    "ja": [
      {
        "title": "動画をアップロード",
        "body": "MP4、MOV または WebM。デバイス上に保持されます。"
      },
      {
        "title": "背景を選択",
        "body": "透過・グリーンスクリーン・白・黒・任意のカスタムカラー。"
      },
      {
        "title": "結果をダウンロード",
        "body": "透過 WebM、または選択した色の MP4 で出力。"
      }
    ],
    "ko": [
      {
        "title": "동영상 업로드",
        "body": "MP4, MOV 또는 WebM — 기기에 머무릅니다."
      },
      {
        "title": "배경 선택",
        "body": "투명, 그린 스크린, 흰색, 검정, 또는 사용자 지정 색상."
      },
      {
        "title": "결과 다운로드",
        "body": "투명 WebM 또는 선택한 색상의 MP4."
      }
    ],
    "nl": [
      {
        "title": "Upload een video",
        "body": "MP4, MOV of WebM — blijft op je apparaat."
      },
      {
        "title": "Kies een achtergrond",
        "body": "Transparant, green screen, wit, zwart of een aangepaste kleur."
      },
      {
        "title": "Download het resultaat",
        "body": "Transparante WebM, of een MP4 met je gekozen kleur."
      }
    ],
    "pl": [
      {
        "title": "Prześlij wideo",
        "body": "MP4, MOV lub WebM — zostaje na Twoim urządzeniu."
      },
      {
        "title": "Wybierz tło",
        "body": "Przezroczyste, zielony ekran, białe, czarne lub dowolny kolor."
      },
      {
        "title": "Pobierz wynik",
        "body": "Przezroczyste WebM lub MP4 z wybranym kolorem tła."
      }
    ],
    "pt": [
      {
        "title": "Carregue um vídeo",
        "body": "MP4, MOV ou WebM — fica no seu dispositivo."
      },
      {
        "title": "Escolha um fundo",
        "body": "Transparente, chroma key, branco, preto ou qualquer cor personalizada."
      },
      {
        "title": "Baixe o resultado",
        "body": "WebM transparente, ou um MP4 com a cor escolhida."
      }
    ],
    "ru": [
      {
        "title": "Загрузите видео",
        "body": "MP4, MOV или WebM — остаётся на вашем устройстве."
      },
      {
        "title": "Выберите фон",
        "body": "Прозрачный, хромакей, белый, чёрный или любой пользовательский цвет."
      },
      {
        "title": "Скачайте результат",
        "body": "Прозрачный WebM или MP4 с выбранным цветом."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en video",
        "body": "MP4, MOV eller WebM — stannar på din enhet."
      },
      {
        "title": "Välj bakgrund",
        "body": "Transparent, green screen, vit, svart eller valfri anpassad färg."
      },
      {
        "title": "Ladda ned resultatet",
        "body": "Transparent WebM, eller en MP4 med din valda färg."
      }
    ],
    "tr": [
      {
        "title": "Video yükle",
        "body": "MP4, MOV veya WebM — cihazında kalır."
      },
      {
        "title": "Bir arka plan seç",
        "body": "Şeffaf, yeşil ekran, beyaz, siyah veya özel bir renk."
      },
      {
        "title": "Sonucu indir",
        "body": "Şeffaf WebM veya seçtiğin renkle MP4."
      }
    ],
    "uk": [
      {
        "title": "Завантажте відео",
        "body": "MP4, MOV або WebM — залишається на пристрої."
      },
      {
        "title": "Оберіть фон",
        "body": "Прозорий, хромакей, білий, чорний або будь-який власний колір."
      },
      {
        "title": "Завантажте результат",
        "body": "Прозорий WebM або MP4 з обраним кольором."
      }
    ],
    "vi": [
      {
        "title": "Tải video lên",
        "body": "MP4, MOV hoặc WebM — ở lại trên thiết bị của bạn."
      },
      {
        "title": "Chọn nền mới",
        "body": "Trong suốt, màn hình xanh, trắng, đen hoặc màu tùy chỉnh."
      },
      {
        "title": "Tải xuống kết quả",
        "body": "WebM trong suốt, hoặc MP4 với màu nền bạn chọn."
      }
    ],
    "zh": [
      {
        "title": "上传视频",
        "body": "支持 MP4、MOV 或 WebM，文件保留在本地设备。"
      },
      {
        "title": "选择背景",
        "body": "透明、绿幕、白色、黑色或任意自定义颜色。"
      },
      {
        "title": "下载结果",
        "body": "透明背景输出为 WebM，指定颜色背景输出为 MP4。"
      }
    ]
  },
  "resume-builder": {
    "ar": [
      {
        "title": "أدخل بياناتك",
        "body": "الترويسة والصورة والملخص والخبرة والتعليم والمهارات."
      },
      {
        "title": "صمّمه",
        "body": "اختر تخطيطًا (Clean أو Modern أو Elegant أو Sidebar) ولون مميزًا وخطًا."
      },
      {
        "title": "صدّر PDF",
        "body": "يُولَّد محليًا بـ pdf-lib — لا شيء يُرفع."
      }
    ],
    "cs": [
      {
        "title": "Vyplňte své údaje",
        "body": "Záhlaví, fotka, shrnutí, zkušenosti, vzdělání, dovednosti."
      },
      {
        "title": "Navrhněte vzhled",
        "body": "Vyberte rozložení (Čisté, Moderní, Elegantní, Postranní panel), barvu a písmo."
      },
      {
        "title": "Exportujte PDF",
        "body": "Generováno lokálně pomocí pdf-lib — nic se nenahrává."
      }
    ],
    "de": [
      {
        "title": "Daten ausfüllen",
        "body": "Kopfzeile, Foto, Zusammenfassung, Erfahrung, Ausbildung, Fähigkeiten."
      },
      {
        "title": "Design wählen",
        "body": "Layout (Clean, Modern, Elegant, Sidebar), Akzentfarbe und Schrift auswählen."
      },
      {
        "title": "PDF exportieren",
        "body": "Lokal mit pdf-lib generiert — nichts wird hochgeladen."
      }
    ],
    "es": [
      {
        "title": "Rellena tus datos",
        "body": "Cabecera, foto, resumen, experiencia, formación, habilidades."
      },
      {
        "title": "Diseña tu CV",
        "body": "Elige una plantilla (Clean, Modern, Elegant, Sidebar), color de acento y fuente."
      },
      {
        "title": "Exporta el PDF",
        "body": "Generado localmente con pdf-lib — nada se sube."
      }
    ],
    "fr": [
      {
        "title": "Remplissez vos informations",
        "body": "En-tête, photo, résumé, expériences, formation, compétences."
      },
      {
        "title": "Personnalisez le design",
        "body": "Choisissez une mise en page (Épuré, Moderne, Élégant, Latéral), couleur d'accent et police."
      },
      {
        "title": "Exportez le PDF",
        "body": "Généré localement avec pdf-lib — rien n'est envoyé."
      }
    ],
    "hi": [
      {
        "title": "अपनी जानकारी भरें",
        "body": "हेडर, फोटो, सारांश, अनुभव, शिक्षा, कौशल।"
      },
      {
        "title": "डिज़ाइन करें",
        "body": "लेआउट (Clean, Modern, Elegant, Sidebar), एक्सेंट रंग और फ़ॉन्ट चुनें।"
      },
      {
        "title": "PDF एक्सपोर्ट करें",
        "body": "pdf-lib से लोकल रूप से जेनरेट — कुछ भी अपलोड नहीं।"
      }
    ],
    "id": [
      {
        "title": "Isi detailmu",
        "body": "Header, foto, ringkasan, pengalaman, pendidikan, keahlian."
      },
      {
        "title": "Desain",
        "body": "Pilih tata letak (Clean, Modern, Elegant, Sidebar), warna aksen, dan font."
      },
      {
        "title": "Ekspor PDF",
        "body": "Dibuat secara lokal dengan pdf-lib — tidak ada yang diunggah."
      }
    ],
    "it": [
      {
        "title": "Inserisci i tuoi dati",
        "body": "Intestazione, foto, sommario, esperienza, istruzione, competenze."
      },
      {
        "title": "Progettalo",
        "body": "Scegli un layout (Clean, Modern, Elegant, Sidebar), colore principale e font."
      },
      {
        "title": "Esporta il PDF",
        "body": "Generato in locale con pdf-lib — nulla viene caricato."
      }
    ],
    "ja": [
      {
        "title": "詳細を入力",
        "body": "ヘッダー・写真・概要・職歴・学歴・スキル。"
      },
      {
        "title": "デザインを設定",
        "body": "レイアウト（クリーン・モダン・エレガント・サイドバー）・アクセントカラー・フォントを選択。"
      },
      {
        "title": "PDFをエクスポート",
        "body": "pdf-lib でローカル生成。アップロード不要。"
      }
    ],
    "ko": [
      {
        "title": "정보 입력",
        "body": "헤더, 사진, 요약, 경력, 학력, 기술."
      },
      {
        "title": "디자인 설정",
        "body": "레이아웃(Clean, Modern, Elegant, Sidebar), 포인트 색상, 글꼴 선택."
      },
      {
        "title": "PDF 내보내기",
        "body": "pdf-lib으로 로컬에서 생성 — 업로드 없음."
      }
    ],
    "nl": [
      {
        "title": "Vul je gegevens in",
        "body": "Koptekst, foto, samenvatting, werkervaring, opleiding, vaardigheden."
      },
      {
        "title": "Ontwerp het",
        "body": "Kies een indeling (Clean, Modern, Elegant, Sidebar), accentkleur en lettertype."
      },
      {
        "title": "Exporteer de PDF",
        "body": "Lokaal gegenereerd met pdf-lib — niets wordt geüpload."
      }
    ],
    "pl": [
      {
        "title": "Wypełnij swoje dane",
        "body": "Nagłówek, zdjęcie, podsumowanie, doświadczenie, wykształcenie, umiejętności."
      },
      {
        "title": "Zaprojektuj wygląd",
        "body": "Wybierz układ (Czysty, Nowoczesny, Elegancki, Boczny), kolor akcentu i czcionkę."
      },
      {
        "title": "Eksportuj PDF",
        "body": "Generowany lokalnie przez pdf-lib — nic nie jest przesyłane."
      }
    ],
    "pt": [
      {
        "title": "Preencha os seus dados",
        "body": "Cabeçalho, foto, resumo, experiência, formação, competências."
      },
      {
        "title": "Designe o layout",
        "body": "Escolha um estilo (Clean, Modern, Elegant, Sidebar), cor de destaque e fonte."
      },
      {
        "title": "Exporte o PDF",
        "body": "Gerado localmente com pdf-lib — nada é carregado."
      }
    ],
    "ru": [
      {
        "title": "Заполните данные",
        "body": "Шапка, фото, краткое описание, опыт, образование, навыки."
      },
      {
        "title": "Оформите",
        "body": "Выберите макет (Clean, Modern, Elegant, Sidebar), акцентный цвет и шрифт."
      },
      {
        "title": "Экспортируйте PDF",
        "body": "Генерируется локально через pdf-lib — ничего не загружается."
      }
    ],
    "sv": [
      {
        "title": "Fyll i dina uppgifter",
        "body": "Rubrik, foto, sammanfattning, erfarenhet, utbildning, kompetenser."
      },
      {
        "title": "Utforma den",
        "body": "Välj layout (Clean, Modern, Elegant, Sidebar), accentfärg och typsnitt."
      },
      {
        "title": "Exportera PDF:en",
        "body": "Genereras lokalt med pdf-lib — inget laddas upp."
      }
    ],
    "tr": [
      {
        "title": "Bilgilerini doldur",
        "body": "Başlık, fotoğraf, özet, deneyim, eğitim, beceriler."
      },
      {
        "title": "Tasarımla",
        "body": "Bir düzen seç (Sade, Modern, Zarif, Kenar Çubuğu), vurgu rengi ve yazı tipi."
      },
      {
        "title": "PDF olarak dışa aktar",
        "body": "pdf-lib ile yerel olarak oluşturulur — hiçbir şey yüklenmez."
      }
    ],
    "uk": [
      {
        "title": "Заповніть дані",
        "body": "Заголовок, фото, резюме, досвід, освіта, навички."
      },
      {
        "title": "Оформіть",
        "body": "Оберіть макет (Чистий, Сучасний, Елегантний, Бічна панель), акцентний колір і шрифт."
      },
      {
        "title": "Збережіть PDF",
        "body": "Генерується локально через pdf-lib — нічого не завантажується."
      }
    ],
    "vi": [
      {
        "title": "Điền thông tin của bạn",
        "body": "Tiêu đề, ảnh, tóm tắt, kinh nghiệm, học vấn, kỹ năng."
      },
      {
        "title": "Thiết kế CV",
        "body": "Chọn bố cục (Clean, Modern, Elegant, Sidebar), màu nhấn và phông chữ."
      },
      {
        "title": "Xuất PDF",
        "body": "Tạo cục bộ bằng pdf-lib — không tải lên."
      }
    ],
    "zh": [
      {
        "title": "填写个人信息",
        "body": "页眉、照片、简介、工作经历、教育背景和技能。"
      },
      {
        "title": "设计版式",
        "body": "选择布局（简洁、现代、优雅、侧边栏）、强调色和字体。"
      },
      {
        "title": "导出 PDF",
        "body": "通过 pdf-lib 在本地生成，不上传任何内容。"
      }
    ]
  },
  "screenshot-to-code": {
    "ar": [
      {
        "title": "ارفع لقطة شاشة",
        "body": "لموقع أو لوحة تحكم أو نموذج تصميم."
      },
      {
        "title": "الذكاء الاصطناعي يكتب الترميز",
        "body": "HTML دلالي + أدوات Tailwind."
      },
      {
        "title": "معاينة وتنزيل",
        "body": "معاينة iframe حية، ثم تصدير كـ .html."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte snímek obrazovky",
        "body": "Webu, dashboardu nebo mockupu."
      },
      {
        "title": "AI napíše kód",
        "body": "Sémantické HTML + Tailwind utility třídy."
      },
      {
        "title": "Náhled a stažení",
        "body": "Živý náhled v iframe, pak export jako .html."
      }
    ],
    "de": [
      {
        "title": "Screenshot hochladen",
        "body": "Von einer Website, einem Dashboard oder Mockup."
      },
      {
        "title": "KI schreibt den Markup-Code",
        "body": "Semantisches HTML + Tailwind-Utilities."
      },
      {
        "title": "Vorschau und Download",
        "body": "Live-iframe-Vorschau — dann als .html exportieren."
      }
    ],
    "es": [
      {
        "title": "Sube una captura de pantalla",
        "body": "De un sitio web, panel de control o mockup."
      },
      {
        "title": "La IA escribe el marcado",
        "body": "HTML semántico + utilidades de Tailwind."
      },
      {
        "title": "Previsualiza y descarga",
        "body": "Vista previa en iframe en vivo, luego exporta como .html."
      }
    ],
    "fr": [
      {
        "title": "Importez une capture d'écran",
        "body": "D'un site web, d'un tableau de bord ou d'une maquette."
      },
      {
        "title": "L'IA écrit le balisage",
        "body": "HTML sémantique + utilitaires Tailwind."
      },
      {
        "title": "Prévisualisez et téléchargez",
        "body": "Aperçu en iframe en direct, puis export en .html."
      }
    ],
    "hi": [
      {
        "title": "स्क्रीनशॉट अपलोड करें",
        "body": "किसी वेबसाइट, डैशबोर्ड या मॉकअप का।"
      },
      {
        "title": "AI मार्कअप लिखता है",
        "body": "सिमेंटिक HTML + Tailwind यूटिलिटीज़।"
      },
      {
        "title": "प्रीव्यू और डाउनलोड करें",
        "body": "लाइव iframe प्रीव्यू, फिर .html के रूप में एक्सपोर्ट करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah tangkapan layar",
        "body": "Situs web, dasbor, atau mockup."
      },
      {
        "title": "AI menulis markupnya",
        "body": "HTML semantik + utilitas Tailwind."
      },
      {
        "title": "Pratinjau dan unduh",
        "body": "Pratinjau iframe langsung, lalu ekspor sebagai .html."
      }
    ],
    "it": [
      {
        "title": "Carica uno screenshot",
        "body": "Di un sito web, una dashboard o un mockup."
      },
      {
        "title": "L'AI scrive il markup",
        "body": "HTML semantico con le utility di Tailwind."
      },
      {
        "title": "Anteprima e download",
        "body": "Anteprima live in iframe, poi esporta come file .html."
      }
    ],
    "ja": [
      {
        "title": "スクリーンショットをアップロード",
        "body": "ウェブサイト・ダッシュボード・モックアップの画像。"
      },
      {
        "title": "AIがマークアップを生成",
        "body": "セマンティック HTML + Tailwind ユーティリティ。"
      },
      {
        "title": "プレビューとダウンロード",
        "body": "ライブ iframe プレビュー後、.html としてエクスポート。"
      }
    ],
    "ko": [
      {
        "title": "스크린샷 업로드",
        "body": "웹사이트, 대시보드 또는 목업 화면."
      },
      {
        "title": "AI가 마크업을 작성합니다",
        "body": "시맨틱 HTML + Tailwind 유틸리티."
      },
      {
        "title": "미리보기 후 다운로드",
        "body": "인라인 프레임 미리보기 후 .html로 내보내세요."
      }
    ],
    "nl": [
      {
        "title": "Upload een schermafbeelding",
        "body": "Van een website, dashboard of mockup."
      },
      {
        "title": "AI schrijft de opmaak",
        "body": "Semantische HTML + Tailwind-hulpklassen."
      },
      {
        "title": "Preview en downloaden",
        "body": "Live iframe-preview, daarna exporteren als .html."
      }
    ],
    "pl": [
      {
        "title": "Prześlij zrzut ekranu",
        "body": "Strony internetowej, dashboardu lub makiety."
      },
      {
        "title": "AI pisze znaczniki",
        "body": "Semantyczny HTML i klasy narzędziowe Tailwind."
      },
      {
        "title": "Podgląd i pobieranie",
        "body": "Podgląd na żywo w iframe, a następnie eksport jako plik .html."
      }
    ],
    "pt": [
      {
        "title": "Carregue uma captura de ecrã",
        "body": "De um website, dashboard ou mockup."
      },
      {
        "title": "A IA escreve o código",
        "body": "HTML semântico + utilitários Tailwind."
      },
      {
        "title": "Pré-visualize e baixe",
        "body": "Pré-visualização ao vivo em iframe, depois exporte como .html."
      }
    ],
    "ru": [
      {
        "title": "Загрузите скриншот",
        "body": "Сайта, дашборда или макета."
      },
      {
        "title": "ИИ пишет разметку",
        "body": "Семантический HTML + утилиты Tailwind."
      },
      {
        "title": "Просмотрите и скачайте",
        "body": "Предпросмотр в iframe, затем экспорт как .html."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en skärmdump",
        "body": "Av en webbplats, instrumentpanel eller mockup."
      },
      {
        "title": "AI skriver koden",
        "body": "Semantisk HTML + Tailwind-verktyg."
      },
      {
        "title": "Förhandsgranska och ladda ned",
        "body": "Live iframe-förhandsgranskning, exportera sedan som .html."
      }
    ],
    "tr": [
      {
        "title": "Ekran görüntüsü yükle",
        "body": "Bir web sitesi, kontrol paneli veya taslak."
      },
      {
        "title": "AI işaretlemeyi yazıyor",
        "body": "Anlamsal HTML + Tailwind yardımcı programları."
      },
      {
        "title": "Önizle ve indir",
        "body": "Canlı iframe önizlemesi, ardından .html olarak dışa aktar."
      }
    ],
    "uk": [
      {
        "title": "Завантажте скриншот",
        "body": "Вебсайту, дашборду або макета."
      },
      {
        "title": "ШІ пише розмітку",
        "body": "Семантичний HTML + утиліти Tailwind."
      },
      {
        "title": "Перегляньте та завантажте",
        "body": "Живий попередній перегляд в iframe, потім збережіть як .html."
      }
    ],
    "vi": [
      {
        "title": "Tải screenshot lên",
        "body": "Ảnh chụp trang web, dashboard hoặc mockup."
      },
      {
        "title": "AI viết code giao diện",
        "body": "HTML ngữ nghĩa kết hợp tiện ích Tailwind."
      },
      {
        "title": "Xem trước và tải xuống",
        "body": "Xem trước trực tiếp trong iframe, rồi xuất file .html."
      }
    ],
    "zh": [
      {
        "title": "上传截图",
        "body": "网站、仪表盘或原型设计图均可。"
      },
      {
        "title": "AI 生成标记代码",
        "body": "语义化 HTML + Tailwind 工具类。"
      },
      {
        "title": "预览并下载",
        "body": "实时 iframe 预览，导出为 .html 文件。"
      }
    ]
  },
  "sign-pdf": {
    "ar": [
      {
        "title": "ارفع PDF",
        "body": "يُسقط في متصفحك — لا يغادر جهازك أبدًا."
      },
      {
        "title": "ارسم توقيعك",
        "body": "بالفأرة أو لوحة التتبع أو الإصبع على لوحة نظيفة."
      },
      {
        "title": "حمّل PDF الموقَّع",
        "body": "يقع التوقيع في أسفل يمين الصفحة الأخيرة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte PDF",
        "body": "Načte se v prohlížeči — nikdy neopustí vaše zařízení."
      },
      {
        "title": "Nakreslete podpis",
        "body": "Myší, touchpadem nebo prstem na čistém plátně."
      },
      {
        "title": "Stáhněte podepsané PDF",
        "body": "Podpis se umístí na poslední stránku, vpravo dole."
      }
    ],
    "de": [
      {
        "title": "PDF hochladen",
        "body": "Wird in deinem Browser geöffnet — verlässt dein Gerät nie."
      },
      {
        "title": "Unterschrift zeichnen",
        "body": "Mit Maus, Trackpad oder Finger auf einer freien Zeichenfläche."
      },
      {
        "title": "Signiertes PDF herunterladen",
        "body": "Unterschrift landet auf der letzten Seite, unten rechts."
      }
    ],
    "es": [
      {
        "title": "Sube tu PDF",
        "body": "Se carga en tu navegador — nunca sale de tu dispositivo."
      },
      {
        "title": "Dibuja tu firma",
        "body": "Con ratón, trackpad o dedo sobre un lienzo en blanco."
      },
      {
        "title": "Descarga el PDF firmado",
        "body": "La firma se coloca en la última página, en la esquina inferior derecha."
      }
    ],
    "fr": [
      {
        "title": "Importez votre PDF",
        "body": "S'ouvre dans votre navigateur — ne quitte jamais votre appareil."
      },
      {
        "title": "Dessinez votre signature",
        "body": "Souris, pavé tactile ou doigt sur un canvas vierge."
      },
      {
        "title": "Téléchargez le PDF signé",
        "body": "La signature se place en bas à droite de la dernière page."
      }
    ],
    "hi": [
      {
        "title": "अपना PDF अपलोड करें",
        "body": "ब्राउज़र में आता है — डिवाइस नहीं छोड़ता।"
      },
      {
        "title": "अपना हस्ताक्षर बनाएं",
        "body": "साफ़ कैनवास पर माउस, ट्रैकपैड या उंगली से।"
      },
      {
        "title": "हस्ताक्षरित PDF डाउनलोड करें",
        "body": "हस्ताक्षर अंतिम पेज पर नीचे-दाईं ओर रखा जाता है।"
      }
    ],
    "id": [
      {
        "title": "Unggah PDF kamu",
        "body": "Masuk ke browsermu — tidak pernah meninggalkan perangkatmu."
      },
      {
        "title": "Gambar tanda tanganmu",
        "body": "Mouse, trackpad, atau jari di kanvas yang bersih."
      },
      {
        "title": "Unduh PDF yang sudah ditandatangani",
        "body": "Tanda tangan ditempatkan di halaman terakhir, pojok kanan bawah."
      }
    ],
    "it": [
      {
        "title": "Carica il tuo PDF",
        "body": "Si apre nel browser — non lascia mai il tuo dispositivo."
      },
      {
        "title": "Disegna la tua firma",
        "body": "Con mouse, trackpad o dito su una tela pulita."
      },
      {
        "title": "Scarica il PDF firmato",
        "body": "La firma viene posizionata in basso a destra nell'ultima pagina."
      }
    ],
    "ja": [
      {
        "title": "PDFをアップロード",
        "body": "ブラウザに読み込まれます。デバイス外に送信されることはありません。"
      },
      {
        "title": "署名を描く",
        "body": "マウス・トラックパッド・またはキャンバス上に指で描く。"
      },
      {
        "title": "署名済みPDFをダウンロード",
        "body": "最終ページの右下に署名が配置されます。"
      }
    ],
    "ko": [
      {
        "title": "PDF 업로드",
        "body": "브라우저에 불러오며, 기기를 벗어나지 않습니다."
      },
      {
        "title": "서명 그리기",
        "body": "마우스, 트랙패드 또는 손가락으로 빈 캔버스에 직접 그리세요."
      },
      {
        "title": "서명된 PDF 다운로드",
        "body": "서명이 마지막 페이지 우측 하단에 삽입됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload je PDF",
        "body": "Wordt geladen in je browser — verlaat je apparaat nooit."
      },
      {
        "title": "Teken je handtekening",
        "body": "Muis, trackpad of vinger op een leeg canvas."
      },
      {
        "title": "Download de ondertekende PDF",
        "body": "Handtekening geplaatst op de laatste pagina, rechtsonder."
      }
    ],
    "pl": [
      {
        "title": "Prześlij swój PDF",
        "body": "Trafia do przeglądarki — nigdy nie opuszcza urządzenia."
      },
      {
        "title": "Narysuj swój podpis",
        "body": "Myszką, touchpadem lub palcem na czystym płótnie."
      },
      {
        "title": "Pobierz podpisany PDF",
        "body": "Podpis umieszczony na ostatniej stronie, w prawym dolnym rogu."
      }
    ],
    "pt": [
      {
        "title": "Carregue o seu PDF",
        "body": "Abre no browser — nunca sai do seu dispositivo."
      },
      {
        "title": "Desenhe a sua assinatura",
        "body": "Rato, trackpad ou dedo num canvas limpo."
      },
      {
        "title": "Baixe o PDF assinado",
        "body": "A assinatura é colocada na última página, canto inferior direito."
      }
    ],
    "ru": [
      {
        "title": "Загрузите PDF",
        "body": "Открывается в браузере — не покидает ваше устройство."
      },
      {
        "title": "Нарисуйте подпись",
        "body": "Мышью, тачпадом или пальцем на чистом холсте."
      },
      {
        "title": "Скачайте подписанный PDF",
        "body": "Подпись размещается на последней странице, в правом нижнем углу."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din PDF",
        "body": "Läses in i din webbläsare — lämnar aldrig din enhet."
      },
      {
        "title": "Rita din underskrift",
        "body": "Mus, styrplatta eller finger på en ren yta."
      },
      {
        "title": "Ladda ned den signerade PDF:en",
        "body": "Underskriften placeras på sista sidan, nere till höger."
      }
    ],
    "tr": [
      {
        "title": "PDF'ini yükle",
        "body": "Tarayıcına düşer — cihazından çıkmaz."
      },
      {
        "title": "İmzanı çiz",
        "body": "Fare, dokunmatik yüzey veya temiz bir tuval üzerinde parmak."
      },
      {
        "title": "İmzalı PDF'i indir",
        "body": "İmza son sayfanın sağ alt köşesine yerleşir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте PDF",
        "body": "Завантажується у браузер — не покидає пристрій."
      },
      {
        "title": "Намалюйте підпис",
        "body": "Мишею, тачпадом або пальцем на чистому полотні."
      },
      {
        "title": "Завантажте підписаний PDF",
        "body": "Підпис розміщується на останній сторінці внизу праворуч."
      }
    ],
    "vi": [
      {
        "title": "Tải PDF lên",
        "body": "Tải vào trình duyệt — không rời khỏi thiết bị của bạn."
      },
      {
        "title": "Vẽ chữ ký",
        "body": "Chuột, trackpad hoặc ngón tay trên canvas trắng."
      },
      {
        "title": "Tải xuống PDF đã ký",
        "body": "Chữ ký đặt ở cuối trang cuối, góc dưới bên phải."
      }
    ],
    "zh": [
      {
        "title": "上传 PDF",
        "body": "直接在浏览器中打开，文件不会离开您的设备。"
      },
      {
        "title": "绘制签名",
        "body": "在空白画布上用鼠标、触控板或手指绘制。"
      },
      {
        "title": "下载已签名的 PDF",
        "body": "签名添加在最后一页右下角。"
      }
    ]
  },
  "sql-to-json": {
    "ar": [
      {
        "title": "اختر الاتجاه",
        "body": "SQL ← JSON أو JSON ← SQL."
      },
      {
        "title": "الصق المدخل",
        "body": "جملة INSERT أو مصفوفة من الكائنات."
      },
      {
        "title": "انسخ النتيجة",
        "body": "جاهزة للإدراج في الجانب الآخر."
      }
    ],
    "cs": [
      {
        "title": "Vyberte směr",
        "body": "SQL → JSON nebo JSON → SQL."
      },
      {
        "title": "Vložte vstup",
        "body": "INSERT příkaz nebo pole objektů."
      },
      {
        "title": "Zkopírujte výsledek",
        "body": "Připraveno k vložení na druhou stranu."
      }
    ],
    "de": [
      {
        "title": "Richtung wählen",
        "body": "SQL → JSON oder JSON → SQL."
      },
      {
        "title": "Eingabe einfügen",
        "body": "Ein INSERT oder ein Array von Objekten."
      },
      {
        "title": "Ergebnis kopieren",
        "body": "Bereit für die andere Seite."
      }
    ],
    "es": [
      {
        "title": "Elige la dirección",
        "body": "SQL → JSON o JSON → SQL."
      },
      {
        "title": "Pega tu entrada",
        "body": "Un INSERT o un array de objetos."
      },
      {
        "title": "Copia el resultado",
        "body": "Listo para usar en el otro extremo."
      }
    ],
    "fr": [
      {
        "title": "Choisissez un sens",
        "body": "SQL → JSON ou JSON → SQL."
      },
      {
        "title": "Collez votre entrée",
        "body": "Un INSERT ou un tableau d'objets."
      },
      {
        "title": "Copiez le résultat",
        "body": "Prêt à basculer de l'autre côté."
      }
    ],
    "hi": [
      {
        "title": "दिशा चुनें",
        "body": "SQL → JSON या JSON → SQL।"
      },
      {
        "title": "अपना इनपुट पेस्ट करें",
        "body": "एक INSERT या ऑब्जेक्ट्स का अरे।"
      },
      {
        "title": "परिणाम कॉपी करें",
        "body": "दूसरी तरफ डालने के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Pilih arah",
        "body": "SQL → JSON atau JSON → SQL."
      },
      {
        "title": "Tempel inputmu",
        "body": "Pernyataan INSERT atau array objek."
      },
      {
        "title": "Salin hasilnya",
        "body": "Siap dimasukkan ke sisi lainnya."
      }
    ],
    "it": [
      {
        "title": "Scegli una direzione",
        "body": "SQL → JSON oppure JSON → SQL."
      },
      {
        "title": "Incolla il tuo input",
        "body": "Un INSERT o un array di oggetti."
      },
      {
        "title": "Copia il risultato",
        "body": "Pronto da usare dall'altra parte."
      }
    ],
    "ja": [
      {
        "title": "方向を選択",
        "body": "SQL → JSON または JSON → SQL。"
      },
      {
        "title": "入力をペースト",
        "body": "INSERT 文またはオブジェクトの配列。"
      },
      {
        "title": "結果をコピー",
        "body": "もう一方の形式にそのまま使えます。"
      }
    ],
    "ko": [
      {
        "title": "방향 선택",
        "body": "SQL → JSON 또는 JSON → SQL."
      },
      {
        "title": "입력값 붙여넣기",
        "body": "INSERT 구문 또는 객체 배열."
      },
      {
        "title": "결과 복사",
        "body": "반대편에 바로 사용할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Kies een richting",
        "body": "SQL → JSON of JSON → SQL."
      },
      {
        "title": "Plak je invoer",
        "body": "Een INSERT of een array van objecten."
      },
      {
        "title": "Kopieer het resultaat",
        "body": "Klaar om aan de andere kant in te voegen."
      }
    ],
    "pl": [
      {
        "title": "Wybierz kierunek",
        "body": "SQL → JSON lub JSON → SQL."
      },
      {
        "title": "Wklej dane wejściowe",
        "body": "Instrukcję INSERT lub tablicę obiektów."
      },
      {
        "title": "Skopiuj wynik",
        "body": "Gotowy do wstawienia po drugiej stronie."
      }
    ],
    "pt": [
      {
        "title": "Escolha a direção",
        "body": "SQL → JSON ou JSON → SQL."
      },
      {
        "title": "Cole a sua entrada",
        "body": "Um INSERT ou um array de objetos."
      },
      {
        "title": "Copie o resultado",
        "body": "Pronto para usar no outro lado."
      }
    ],
    "ru": [
      {
        "title": "Выберите направление",
        "body": "SQL → JSON или JSON → SQL."
      },
      {
        "title": "Вставьте входные данные",
        "body": "INSERT-запрос или массив объектов."
      },
      {
        "title": "Скопируйте результат",
        "body": "Готово для использования на другой стороне."
      }
    ],
    "sv": [
      {
        "title": "Välj riktning",
        "body": "SQL → JSON eller JSON → SQL."
      },
      {
        "title": "Klistra in din input",
        "body": "En INSERT eller en array av objekt."
      },
      {
        "title": "Kopiera resultatet",
        "body": "Redo att lägga på andra sidan."
      }
    ],
    "tr": [
      {
        "title": "Yön seç",
        "body": "SQL → JSON veya JSON → SQL."
      },
      {
        "title": "Girişini yapıştır",
        "body": "Bir INSERT veya nesne dizisi."
      },
      {
        "title": "Sonucu kopyala",
        "body": "Diğer tarafa yapıştırmaya hazır."
      }
    ],
    "uk": [
      {
        "title": "Оберіть напрямок",
        "body": "SQL → JSON або JSON → SQL."
      },
      {
        "title": "Вставте вхідні дані",
        "body": "INSERT або масив обʼєктів."
      },
      {
        "title": "Скопіюйте результат",
        "body": "Готово до використання в іншому форматі."
      }
    ],
    "vi": [
      {
        "title": "Chọn chiều chuyển đổi",
        "body": "SQL → JSON hoặc JSON → SQL."
      },
      {
        "title": "Dán dữ liệu đầu vào",
        "body": "Một lệnh INSERT hoặc một mảng đối tượng."
      },
      {
        "title": "Sao chép kết quả",
        "body": "Sẵn sàng dùng ở phía còn lại."
      }
    ],
    "zh": [
      {
        "title": "选择转换方向",
        "body": "SQL → JSON 或 JSON → SQL。"
      },
      {
        "title": "粘贴输入内容",
        "body": "INSERT 语句或对象数组均可。"
      },
      {
        "title": "复制结果",
        "body": "可直接用于另一侧的工具。"
      }
    ]
  },
  "srt-to-text": {
    "ar": [
      {
        "title": "أسقط ملف الترجمة",
        "body": "SRT أو VTT — كلاهما يعمل."
      },
      {
        "title": "اختر التخطيط",
        "body": "سطر لكل إشارة، أو فقرات مدموجة، أو مع تسميات المتحدثين."
      },
      {
        "title": "حمّل .txt",
        "body": "استخدمه كنص نظيف أو مدخل ملخّص أو مسودة مقال."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte soubor s titulky",
        "body": "SRT nebo VTT — oba fungují."
      },
      {
        "title": "Vyberte rozložení",
        "body": "Jeden řádek na stopu, sloučené odstavce nebo s označením mluvčích."
      },
      {
        "title": "Stáhněte .txt",
        "body": "Použijte jako čistý přepis, podklad pro shrnutí nebo náčrt článku."
      }
    ],
    "de": [
      {
        "title": "Untertiteldatei ablegen",
        "body": "SRT oder VTT — beides funktioniert."
      },
      {
        "title": "Layout wählen",
        "body": "Eine Zeile pro Cue, zusammengeführte Absätze oder mit Sprecher-Labels."
      },
      {
        "title": ".txt herunterladen",
        "body": "Als sauberes Transkript, als Eingabe für Zusammenfassungen oder als Artikelentwurf."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu archivo de subtítulos",
        "body": "SRT o VTT — ambos funcionan."
      },
      {
        "title": "Elige el formato de salida",
        "body": "Una línea por pista, párrafos fusionados o con etiquetas de locutor."
      },
      {
        "title": "Descarga el .txt",
        "body": "Úsalo como transcripción limpia, base para un resumen o borrador de artículo."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre fichier de sous-titres",
        "body": "SRT ou VTT — les deux fonctionnent."
      },
      {
        "title": "Choisissez une mise en forme",
        "body": "Une ligne par réplique, paragraphes fusionnés, ou avec les noms des locuteurs."
      },
      {
        "title": "Téléchargez le .txt",
        "body": "Utilisez-le comme transcription propre, base de résumé ou brouillon d'article."
      }
    ],
    "hi": [
      {
        "title": "अपनी सबटाइटल फ़ाइल डालें",
        "body": "SRT या VTT — दोनों काम करते हैं।"
      },
      {
        "title": "लेआउट चुनें",
        "body": "प्रति क्यू एक लाइन, मर्ज किए गए पैराग्राफ, या स्पीकर लेबल के साथ।"
      },
      {
        "title": ".txt डाउनलोड करें",
        "body": "साफ़ ट्रांसक्रिप्ट, सारांश इनपुट या लेख ड्राफ़्ट के रूप में उपयोग करें।"
      }
    ],
    "id": [
      {
        "title": "Seret file subtitle kamu",
        "body": "SRT atau VTT — keduanya bisa."
      },
      {
        "title": "Pilih tata letak",
        "body": "Satu baris per cue, paragraf gabungan, atau dengan label pembicara."
      },
      {
        "title": "Unduh .txt",
        "body": "Gunakan sebagai transkrip bersih, bahan ringkasan, atau draf artikel."
      }
    ],
    "it": [
      {
        "title": "Trascina il tuo file di sottotitoli",
        "body": "SRT o VTT — entrambi funzionano."
      },
      {
        "title": "Scegli un layout",
        "body": "Una riga per cue, paragrafi uniti o con etichette degli speaker."
      },
      {
        "title": "Scarica il file .txt",
        "body": "Usalo come trascrizione pulita, input per riassunti o bozza di articolo."
      }
    ],
    "ja": [
      {
        "title": "字幕ファイルをドロップ",
        "body": "SRT でも VTT でも対応。"
      },
      {
        "title": "レイアウトを選択",
        "body": "キューごとに1行、段落をまとめる、または話者ラベル付き。"
      },
      {
        "title": ".txt をダウンロード",
        "body": "クリーンなトランスクリプト、要約の素材、記事下書きとして活用できます。"
      }
    ],
    "ko": [
      {
        "title": "자막 파일 드롭",
        "body": "SRT 또는 VTT — 둘 다 지원합니다."
      },
      {
        "title": "레이아웃 선택",
        "body": "큐별 한 줄, 단락 병합, 또는 화자 레이블 포함."
      },
      {
        "title": ".txt 다운로드",
        "body": "깔끔한 대본, 요약 입력, 또는 기사 초안으로 활용하세요."
      }
    ],
    "nl": [
      {
        "title": "Sleep je ondertitelbestand hierheen",
        "body": "SRT of VTT — beide werken."
      },
      {
        "title": "Kies een indeling",
        "body": "Één regel per cue, samengevoegde alinea's of met sprekerslabels."
      },
      {
        "title": "Download .txt",
        "body": "Gebruik het als schone transcriptie, samenvattingsinvoer of artikelconcept."
      }
    ],
    "pl": [
      {
        "title": "Upuść plik z napisami",
        "body": "SRT lub VTT — oba działają."
      },
      {
        "title": "Wybierz układ",
        "body": "Jeden wiersz na wskazówkę, scalone akapity lub z etykietami mówcy."
      },
      {
        "title": "Pobierz plik .txt",
        "body": "Użyj jako czysty transkrypt, materiał do streszczenia lub szkic artykułu."
      }
    ],
    "pt": [
      {
        "title": "Arraste o ficheiro de legendas",
        "body": "SRT ou VTT — ambos funcionam."
      },
      {
        "title": "Escolha o layout",
        "body": "Uma linha por cue, parágrafos mesclados ou com etiquetas de locutor."
      },
      {
        "title": "Baixe o .txt",
        "body": "Use como transcrição limpa, base para resumos ou rascunho de artigo."
      }
    ],
    "ru": [
      {
        "title": "Загрузите файл субтитров",
        "body": "SRT или VTT — оба формата поддерживаются."
      },
      {
        "title": "Выберите формат",
        "body": "По одной строке на реплику, объединённые абзацы или с именами спикеров."
      },
      {
        "title": "Скачайте .txt",
        "body": "Используйте как чистую транскрипцию, основу для конспекта или черновик статьи."
      }
    ],
    "sv": [
      {
        "title": "Släpp din undertextfil",
        "body": "SRT eller VTT — båda fungerar."
      },
      {
        "title": "Välj layout",
        "body": "En rad per cue, sammanslagna stycken eller med talarrubriker."
      },
      {
        "title": "Ladda ned .txt",
        "body": "Använd som rent transkript, sammanfattningsinput eller artikelutkast."
      }
    ],
    "tr": [
      {
        "title": "Altyazı dosyanı bırak",
        "body": "SRT veya VTT — ikisi de çalışır."
      },
      {
        "title": "Bir düzen seç",
        "body": "İpucu başına bir satır, birleştirilmiş paragraflar veya konuşmacı etiketleriyle."
      },
      {
        "title": ".txt dosyasını indir",
        "body": "Temiz transkript, özet girişi veya makale taslağı olarak kullan."
      }
    ],
    "uk": [
      {
        "title": "Завантажте файл субтитрів",
        "body": "SRT або VTT — обидва формати підходять."
      },
      {
        "title": "Оберіть структуру",
        "body": "Один рядок на фразу, злиті абзаци або з мітками спікерів."
      },
      {
        "title": "Завантажте .txt",
        "body": "Готово як чистий транскрипт, вхідні дані для резюме або чернетка статті."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả file phụ đề",
        "body": "SRT hoặc VTT — cả hai đều được."
      },
      {
        "title": "Chọn kiểu định dạng",
        "body": "Mỗi cue một dòng, gộp thành đoạn văn, hoặc kèm nhãn người nói."
      },
      {
        "title": "Tải xuống file .txt",
        "body": "Dùng làm bản ghi chép, dữ liệu tóm tắt, hoặc bản nháp bài viết."
      }
    ],
    "zh": [
      {
        "title": "拖入字幕文件",
        "body": "SRT 或 VTT 均可。"
      },
      {
        "title": "选择输出格式",
        "body": "每条字幕单独一行、合并为段落，或保留说话人标注。"
      },
      {
        "title": "下载 .txt 文件",
        "body": "可用作文字稿、摘要素材或文章草稿。"
      }
    ]
  },
  "srt-to-vtt": {
    "ar": [
      {
        "title": "أسقط ملف .srt",
        "body": "أو الصق نص الترجمة مباشرةً في المحرر."
      },
      {
        "title": "تحويل تلقائي داخل المتصفح",
        "body": "يعمل التحويل كليًا على جهازك — لا يغادره ملفك أبدًا."
      },
      {
        "title": "حمّل .vtt",
        "body": "أسقطه في <video> أو أي مشغّل HTML5."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte soubor .srt",
        "body": "Nebo vložte text titulků přímo do editoru."
      },
      {
        "title": "Automatická konverze v prohlížeči",
        "body": "Vše proběhne na vašem zařízení — soubor nikam neopustí."
      },
      {
        "title": "Stáhněte .vtt",
        "body": "Vložte ho do <video> nebo libovolného HTML5 přehrávače."
      }
    ],
    "de": [
      {
        "title": ".srt-Datei ablegen",
        "body": "Oder Untertiteltext direkt in den Editor einfügen."
      },
      {
        "title": "Konvertierung direkt im Browser",
        "body": "Läuft vollständig auf deinem Gerät — deine Datei verlässt es nie."
      },
      {
        "title": ".vtt herunterladen",
        "body": "In <video> oder jeden HTML5-Player einbinden."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu archivo .srt",
        "body": "O pega el texto de los subtítulos directamente en el editor."
      },
      {
        "title": "Conversión automática en el navegador",
        "body": "Todo el proceso ocurre en tu dispositivo — el archivo nunca sale de él."
      },
      {
        "title": "Descarga el .vtt",
        "body": "Úsalo en <video> o en cualquier reproductor HTML5."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre fichier .srt",
        "body": "Ou collez le texte des sous-titres directement dans l'éditeur."
      },
      {
        "title": "Conversion automatique dans le navigateur",
        "body": "La conversion s'effectue entièrement sur votre appareil — votre fichier ne le quitte pas."
      },
      {
        "title": "Téléchargez le .vtt",
        "body": "Glissez-le dans une balise <video> ou tout lecteur HTML5."
      }
    ],
    "hi": [
      {
        "title": "अपनी .srt फ़ाइल डालें",
        "body": "या सीधे एडिटर में सबटाइटल टेक्स्ट पेस्ट करें।"
      },
      {
        "title": "ब्राउज़र में ऑटो-कन्वर्ट",
        "body": "कन्वर्ज़न पूरी तरह आपके डिवाइस पर होता है — फ़ाइल कहीं नहीं जाती।"
      },
      {
        "title": ".vtt डाउनलोड करें",
        "body": "<video> या किसी भी HTML5 प्लेयर में डालें।"
      }
    ],
    "id": [
      {
        "title": "Seret file .srt kamu",
        "body": "Atau tempel teks subtitle langsung ke editor."
      },
      {
        "title": "Konversi otomatis di browser",
        "body": "Konversi berjalan sepenuhnya di perangkatmu — file tidak pernah keluar."
      },
      {
        "title": "Unduh .vtt",
        "body": "Sematkan ke <video> atau pemutar HTML5 apa pun."
      }
    ],
    "it": [
      {
        "title": "Trascina il tuo file .srt",
        "body": "Oppure incolla il testo dei sottotitoli direttamente nell'editor."
      },
      {
        "title": "Conversione automatica nel browser",
        "body": "La conversione avviene interamente sul tuo dispositivo — il file non lo abbandona mai."
      },
      {
        "title": "Scarica il file .vtt",
        "body": "Inseriscilo in un elemento <video> o in qualsiasi player HTML5."
      }
    ],
    "ja": [
      {
        "title": ".srt ファイルをドロップ",
        "body": "またはエディタに字幕テキストを直接ペースト。"
      },
      {
        "title": "ブラウザ上で自動変換",
        "body": "変換はデバイス上で完結。ファイルは外部に送信されません。"
      },
      {
        "title": ".vtt をダウンロード",
        "body": "<video> や HTML5 プレイヤーにそのまま組み込めます。"
      }
    ],
    "ko": [
      {
        "title": ".srt 파일 드롭",
        "body": "또는 자막 텍스트를 편집기에 직접 붙여넣기 하세요."
      },
      {
        "title": "브라우저에서 자동 변환",
        "body": "변환이 기기에서 완전히 실행됩니다. 파일이 외부로 전송되지 않습니다."
      },
      {
        "title": ".vtt 다운로드",
        "body": "<video> 태그나 HTML5 플레이어에 바로 사용할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep je .srt-bestand hierheen",
        "body": "Of plak de ondertiteltekst rechtstreeks in de editor."
      },
      {
        "title": "Automatisch converteren in de browser",
        "body": "De conversie verloopt volledig op je apparaat — je bestand verlaat het nooit."
      },
      {
        "title": "Download .vtt",
        "body": "Zet het direct in <video> of een HTML5-speler."
      }
    ],
    "pl": [
      {
        "title": "Upuść plik .srt",
        "body": "Albo wklej tekst napisów bezpośrednio do edytora."
      },
      {
        "title": "Konwersja w przeglądarce",
        "body": "Przetwarzanie odbywa się całkowicie na Twoim urządzeniu — plik nigdzie nie trafia."
      },
      {
        "title": "Pobierz plik .vtt",
        "body": "Wstaw do znacznika <video> lub dowolnego odtwarzacza HTML5."
      }
    ],
    "pt": [
      {
        "title": "Arraste o seu ficheiro .srt",
        "body": "Ou cole o texto das legendas diretamente no editor."
      },
      {
        "title": "Conversão automática no browser",
        "body": "A conversão corre inteiramente no seu dispositivo — o ficheiro nunca o abandona."
      },
      {
        "title": "Baixe o .vtt",
        "body": "Insira-o num elemento <video> ou em qualquer reprodutor HTML5."
      }
    ],
    "ru": [
      {
        "title": "Загрузите .srt-файл",
        "body": "Или вставьте текст субтитров прямо в редактор."
      },
      {
        "title": "Автоконвертация в браузере",
        "body": "Конвертация выполняется полностью на вашем устройстве — файл никуда не отправляется."
      },
      {
        "title": "Скачайте .vtt",
        "body": "Вставьте в тег <video> или любой HTML5-плеер."
      }
    ],
    "sv": [
      {
        "title": "Släpp din .srt-fil",
        "body": "Eller klistra in undertexttext direkt i editorn."
      },
      {
        "title": "Automatisk konvertering i webbläsaren",
        "body": "Konverteringen sker helt på din enhet — filen lämnar aldrig den."
      },
      {
        "title": "Ladda ned .vtt",
        "body": "Lägg den i <video> eller valfri HTML5-spelare."
      }
    ],
    "tr": [
      {
        "title": ".srt dosyanı bırak",
        "body": "Ya da altyazı metnini doğrudan editöre yapıştır."
      },
      {
        "title": "Tarayıcıda otomatik dönüştür",
        "body": "Dönüşüm tamamen cihazında gerçekleşir — dosyan hiçbir yere gitmez."
      },
      {
        "title": ".vtt dosyasını indir",
        "body": "<video> etiketine veya herhangi bir HTML5 oynatıcıya bırak."
      }
    ],
    "uk": [
      {
        "title": "Завантажте .srt файл",
        "body": "Або вставте текст субтитрів безпосередньо в редактор."
      },
      {
        "title": "Конвертація в браузері",
        "body": "Перетворення відбувається прямо на вашому пристрої — файл нікуди не надсилається."
      },
      {
        "title": "Завантажте .vtt",
        "body": "Готово для <video> або будь-якого HTML5-плеєра."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả file .srt",
        "body": "Hoặc dán trực tiếp nội dung phụ đề vào trình soạn thảo."
      },
      {
        "title": "Chuyển đổi ngay trên trình duyệt",
        "body": "Toàn bộ quá trình xử lý diễn ra trên thiết bị của bạn — file không rời khỏi máy."
      },
      {
        "title": "Tải xuống file .vtt",
        "body": "Dùng ngay với thẻ <video> hoặc bất kỳ trình phát HTML5 nào."
      }
    ],
    "zh": [
      {
        "title": "拖入 .srt 文件",
        "body": "或直接将字幕文本粘贴到编辑器中。"
      },
      {
        "title": "在浏览器内自动转换",
        "body": "转换完全在本地设备上完成，文件不会离开您的设备。"
      },
      {
        "title": "下载 .vtt 文件",
        "body": "直接用于 <video> 标签或任何 HTML5 播放器。"
      }
    ]
  },
  "ssh-key-generator": {
    "ar": [
      {
        "title": "اختر الخوارزمية",
        "body": "Ed25519 (موصى به) أو RSA 2048/3072/4096."
      },
      {
        "title": "توليد محلي",
        "body": "متصفحك يجري العمليات الحسابية — لا شيء يُرسَل."
      },
      {
        "title": "انسخ أو حمّل",
        "body": "المفتاح العام بتنسيق OpenSSH، والمفتاح الخاص كـ -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "cs": [
      {
        "title": "Vyberte algoritmus",
        "body": "Ed25519 (doporučeno) nebo RSA 2048/3072/4096."
      },
      {
        "title": "Generujte lokálně",
        "body": "Výpočet provede váš prohlížeč — nic se neodesílá."
      },
      {
        "title": "Zkopírujte nebo stáhněte",
        "body": "Veřejný klíč ve formátu OpenSSH, soukromý klíč jako -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "de": [
      {
        "title": "Algorithmus wählen",
        "body": "Ed25519 (empfohlen) oder RSA 2048/3072/4096."
      },
      {
        "title": "Lokal generieren",
        "body": "Dein Browser erledigt die Berechnung — nichts wird gesendet."
      },
      {
        "title": "Kopieren oder herunterladen",
        "body": "Öffentlicher Schlüssel im OpenSSH-Format, privater Schlüssel als -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "es": [
      {
        "title": "Elige el algoritmo",
        "body": "Ed25519 (recomendado) o RSA 2048/3072/4096."
      },
      {
        "title": "Generación local",
        "body": "Tu navegador hace el cálculo — nada se envía."
      },
      {
        "title": "Copia o descarga",
        "body": "Clave pública en formato OpenSSH, clave privada como -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "fr": [
      {
        "title": "Choisissez un algorithme",
        "body": "Ed25519 (recommandé) ou RSA 2048/3072/4096."
      },
      {
        "title": "Génération locale",
        "body": "Votre navigateur fait le calcul — rien n'est envoyé."
      },
      {
        "title": "Copiez ou téléchargez",
        "body": "Clé publique au format OpenSSH, clé privée sous -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "hi": [
      {
        "title": "एल्गोरिदम चुनें",
        "body": "Ed25519 (अनुशंसित) या RSA 2048/3072/4096।"
      },
      {
        "title": "लोकल जेनरेट करें",
        "body": "आपका ब्राउज़र कैलकुलेशन करता है — कुछ भी नहीं भेजा जाता।"
      },
      {
        "title": "कॉपी या डाउनलोड करें",
        "body": "OpenSSH फॉर्मेट में पब्लिक key, प्राइवेट key -----BEGIN OPENSSH PRIVATE KEY----- के रूप में।"
      }
    ],
    "id": [
      {
        "title": "Pilih algoritma",
        "body": "Ed25519 (disarankan) atau RSA 2048/3072/4096."
      },
      {
        "title": "Buat secara lokal",
        "body": "Browsermu yang melakukan kalkulasi — tidak ada yang dikirim."
      },
      {
        "title": "Salin atau unduh",
        "body": "Kunci publik dalam format OpenSSH, kunci privat sebagai -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "it": [
      {
        "title": "Scegli un algoritmo",
        "body": "Ed25519 (consigliato) oppure RSA 2048/3072/4096."
      },
      {
        "title": "Generazione in locale",
        "body": "Il calcolo avviene nel tuo browser — nulla viene inviato."
      },
      {
        "title": "Copia o scarica",
        "body": "Chiave pubblica in formato OpenSSH, chiave privata come -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "ja": [
      {
        "title": "アルゴリズムを選択",
        "body": "Ed25519（推奨）または RSA 2048/3072/4096。"
      },
      {
        "title": "ローカルで生成",
        "body": "ブラウザで演算。外部への送信は一切なし。"
      },
      {
        "title": "コピーまたはダウンロード",
        "body": "公開鍵は OpenSSH 形式、秘密鍵は -----BEGIN OPENSSH PRIVATE KEY----- として出力。"
      }
    ],
    "ko": [
      {
        "title": "알고리즘 선택",
        "body": "Ed25519(권장) 또는 RSA 2048/3072/4096."
      },
      {
        "title": "로컬에서 생성",
        "body": "브라우저에서 직접 연산합니다 — 아무것도 전송되지 않습니다."
      },
      {
        "title": "복사 또는 다운로드",
        "body": "공개 키는 OpenSSH 형식, 개인 키는 -----BEGIN OPENSSH PRIVATE KEY----- 형식."
      }
    ],
    "nl": [
      {
        "title": "Kies een algoritme",
        "body": "Ed25519 (aanbevolen) of RSA 2048/3072/4096."
      },
      {
        "title": "Lokaal genereren",
        "body": "Je browser doet de berekeningen — er wordt niets verstuurd."
      },
      {
        "title": "Kopiëren of downloaden",
        "body": "Publieke sleutel in OpenSSH-formaat, privésleutel als -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "pl": [
      {
        "title": "Wybierz algorytm",
        "body": "Ed25519 (zalecany) lub RSA 2048/3072/4096."
      },
      {
        "title": "Generuj lokalnie",
        "body": "Obliczenia wykonuje Twoja przeglądarka — nic nie jest wysyłane."
      },
      {
        "title": "Skopiuj lub pobierz",
        "body": "Klucz publiczny w formacie OpenSSH, klucz prywatny jako -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "pt": [
      {
        "title": "Escolha um algoritmo",
        "body": "Ed25519 (recomendado) ou RSA 2048/3072/4096."
      },
      {
        "title": "Gerado localmente",
        "body": "O seu browser faz os cálculos — nada é enviado."
      },
      {
        "title": "Copie ou baixe",
        "body": "Chave pública no formato OpenSSH, chave privada como -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "ru": [
      {
        "title": "Выберите алгоритм",
        "body": "Ed25519 (рекомендуется) или RSA 2048/3072/4096."
      },
      {
        "title": "Генерация на устройстве",
        "body": "Вычисления выполняет браузер — ничего не отправляется."
      },
      {
        "title": "Скопируйте или скачайте",
        "body": "Публичный ключ в формате OpenSSH, приватный в виде -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "sv": [
      {
        "title": "Välj algoritm",
        "body": "Ed25519 (rekommenderas) eller RSA 2048/3072/4096."
      },
      {
        "title": "Generera lokalt",
        "body": "Din webbläsare gör jobbet — inget skickas."
      },
      {
        "title": "Kopiera eller ladda ned",
        "body": "Publik nyckel i OpenSSH-format, privat nyckel som -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "tr": [
      {
        "title": "Bir algoritma seç",
        "body": "Ed25519 (önerilen) veya RSA 2048/3072/4096."
      },
      {
        "title": "Yerel olarak oluştur",
        "body": "Hesaplamayı tarayıcın yapar — hiçbir şey gönderilmez."
      },
      {
        "title": "Kopyala veya indir",
        "body": "OpenSSH biçiminde açık anahtar, özel anahtar -----BEGIN OPENSSH PRIVATE KEY----- olarak."
      }
    ],
    "uk": [
      {
        "title": "Оберіть алгоритм",
        "body": "Ed25519 (рекомендовано) або RSA 2048/3072/4096."
      },
      {
        "title": "Генерація на пристрої",
        "body": "Браузер виконує обчислення — нічого не надсилається."
      },
      {
        "title": "Скопіюйте або завантажте",
        "body": "Публічний ключ у форматі OpenSSH, приватний — як -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "vi": [
      {
        "title": "Chọn thuật toán",
        "body": "Ed25519 (khuyên dùng) hoặc RSA 2048/3072/4096."
      },
      {
        "title": "Tạo khóa cục bộ",
        "body": "Trình duyệt thực hiện toàn bộ — không có gì được gửi đi."
      },
      {
        "title": "Sao chép hoặc tải xuống",
        "body": "Khóa công khai định dạng OpenSSH, khóa bí mật dưới dạng -----BEGIN OPENSSH PRIVATE KEY-----."
      }
    ],
    "zh": [
      {
        "title": "选择算法",
        "body": "Ed25519（推荐）或 RSA 2048/3072/4096。"
      },
      {
        "title": "本地生成",
        "body": "由浏览器完成计算，不发送任何数据。"
      },
      {
        "title": "复制或下载",
        "body": "公钥为 OpenSSH 格式，私钥以 -----BEGIN OPENSSH PRIVATE KEY----- 开头。"
      }
    ]
  },
  "style-subtitles": {
    "ar": [
      {
        "title": "ارفع SRT أو VTT",
        "body": "أو الصق الإشارات مباشرةً."
      },
      {
        "title": "خصّص الأنماط",
        "body": "الخط والحجم واللون والإطار والظل والمحاذاة والموضع الرأسي."
      },
      {
        "title": "حمّل .ass",
        "body": "أسقطه في VLC أو Aegisub أو أي مشغّل حديث."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte SRT nebo VTT",
        "body": "Nebo vložte stopy přímo."
      },
      {
        "title": "Přizpůsobte styly",
        "body": "Písmo, velikost, barva, okraj, stín, zarovnání, svislá poloha."
      },
      {
        "title": "Stáhněte .ass",
        "body": "Vložte do VLC, Aegisub nebo libovolného moderního přehrávače."
      }
    ],
    "de": [
      {
        "title": "SRT oder VTT hochladen",
        "body": "Oder Cues direkt einfügen."
      },
      {
        "title": "Stile anpassen",
        "body": "Schrift, Größe, Farbe, Rahmen, Schlagschatten, Ausrichtung, vertikale Position."
      },
      {
        "title": ".ass herunterladen",
        "body": "Direkt in VLC, Aegisub oder jeden modernen Player laden."
      }
    ],
    "es": [
      {
        "title": "Sube tu SRT o VTT",
        "body": "O pega las pistas directamente."
      },
      {
        "title": "Personaliza los estilos",
        "body": "Fuente, tamaño, color, borde, sombra, alineación y posición vertical."
      },
      {
        "title": "Descarga el .ass",
        "body": "Úsalo en VLC, Aegisub o cualquier reproductor moderno."
      }
    ],
    "fr": [
      {
        "title": "Importez votre SRT ou VTT",
        "body": "Ou collez les répliques directement."
      },
      {
        "title": "Personnalisez les styles",
        "body": "Police, taille, couleur, bordure, ombre portée, alignement, position verticale."
      },
      {
        "title": "Téléchargez le .ass",
        "body": "Glissez-le dans VLC, Aegisub ou tout lecteur moderne."
      }
    ],
    "hi": [
      {
        "title": "अपना SRT या VTT अपलोड करें",
        "body": "या सीधे क्यूज़ पेस्ट करें।"
      },
      {
        "title": "स्टाइल कस्टमाइज़ करें",
        "body": "फ़ॉन्ट, साइज़, रंग, बॉर्डर, ड्रॉप शैडो, अलाइनमेंट, वर्टिकल पोज़ीशन।"
      },
      {
        "title": ".ass डाउनलोड करें",
        "body": "VLC, Aegisub या किसी भी आधुनिक प्लेयर में डालें।"
      }
    ],
    "id": [
      {
        "title": "Unggah SRT atau VTT kamu",
        "body": "Atau tempel cue langsung."
      },
      {
        "title": "Sesuaikan gaya",
        "body": "Font, ukuran, warna, tepi, bayangan, perataan, posisi vertikal."
      },
      {
        "title": "Unduh .ass",
        "body": "Masukkan ke VLC, Aegisub, atau pemutar modern apa pun."
      }
    ],
    "it": [
      {
        "title": "Carica il tuo file SRT o VTT",
        "body": "Oppure incolla le cue direttamente."
      },
      {
        "title": "Personalizza gli stili",
        "body": "Font, dimensione, colore, bordo, ombra, allineamento, posizione verticale."
      },
      {
        "title": "Scarica il file .ass",
        "body": "Inseriscilo in VLC, Aegisub o qualsiasi player moderno."
      }
    ],
    "ja": [
      {
        "title": "SRT または VTT をアップロード",
        "body": "またはキューを直接ペースト。"
      },
      {
        "title": "スタイルをカスタマイズ",
        "body": "フォント・サイズ・色・ボーダー・ドロップシャドウ・配置・縦位置。"
      },
      {
        "title": ".ass をダウンロード",
        "body": "VLC、Aegisub、その他モダンなプレイヤーにそのまま使えます。"
      }
    ],
    "ko": [
      {
        "title": "SRT 또는 VTT 업로드",
        "body": "또는 큐를 직접 붙여넣기 하세요."
      },
      {
        "title": "스타일 설정",
        "body": "글꼴, 크기, 색상, 테두리, 드롭 섀도, 정렬, 수직 위치."
      },
      {
        "title": ".ass 다운로드",
        "body": "VLC, Aegisub 또는 최신 플레이어에 바로 사용하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload je SRT of VTT",
        "body": "Of plak cues rechtstreeks in de editor."
      },
      {
        "title": "Stijlen aanpassen",
        "body": "Lettertype, grootte, kleur, rand, slagschaduw, uitlijning, verticale positie."
      },
      {
        "title": "Download .ass",
        "body": "Zet het in VLC, Aegisub of elke moderne mediaspeler."
      }
    ],
    "pl": [
      {
        "title": "Prześlij plik SRT lub VTT",
        "body": "Albo wklej wskazówki bezpośrednio."
      },
      {
        "title": "Dostosuj style",
        "body": "Czcionka, rozmiar, kolor, obramowanie, cień, wyrównanie, pozycja pionowa."
      },
      {
        "title": "Pobierz plik .ass",
        "body": "Wrzuć do VLC, Aegisub lub dowolnego nowoczesnego odtwarzacza."
      }
    ],
    "pt": [
      {
        "title": "Carregue o seu SRT ou VTT",
        "body": "Ou cole as cues diretamente."
      },
      {
        "title": "Personalize os estilos",
        "body": "Fonte, tamanho, cor, contorno, sombra, alinhamento, posição vertical."
      },
      {
        "title": "Baixe o .ass",
        "body": "Insira no VLC, Aegisub ou em qualquer reprodutor moderno."
      }
    ],
    "ru": [
      {
        "title": "Загрузите SRT или VTT",
        "body": "Или вставьте реплики напрямую."
      },
      {
        "title": "Настройте стили",
        "body": "Шрифт, размер, цвет, обводка, тень, выравнивание, вертикальное положение."
      },
      {
        "title": "Скачайте .ass",
        "body": "Откройте в VLC, Aegisub или любом современном плеере."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din SRT eller VTT",
        "body": "Eller klistra in cues direkt."
      },
      {
        "title": "Anpassa stilar",
        "body": "Typsnitt, storlek, färg, kantlinje, droppskugga, justering, vertikal position."
      },
      {
        "title": "Ladda ned .ass",
        "body": "Lägg den i VLC, Aegisub eller valfri modern spelare."
      }
    ],
    "tr": [
      {
        "title": "SRT veya VTT dosyanı yükle",
        "body": "Ya da ipuçlarını doğrudan yapıştır."
      },
      {
        "title": "Stilleri özelleştir",
        "body": "Yazı tipi, boyut, renk, kenarlık, gölge, hizalama, dikey konum."
      },
      {
        "title": ".ass dosyasını indir",
        "body": "VLC, Aegisub veya herhangi bir modern oynatıcıya bırak."
      }
    ],
    "uk": [
      {
        "title": "Завантажте SRT або VTT",
        "body": "Або вставте рядки напряму."
      },
      {
        "title": "Налаштуйте стиль",
        "body": "Шрифт, розмір, колір, обведення, тінь, вирівнювання, вертикальна позиція."
      },
      {
        "title": "Завантажте .ass",
        "body": "Готово для VLC, Aegisub або будь-якого сучасного плеєра."
      }
    ],
    "vi": [
      {
        "title": "Tải lên file SRT hoặc VTT",
        "body": "Hoặc dán trực tiếp các cue vào."
      },
      {
        "title": "Tuỳ chỉnh kiểu dáng",
        "body": "Phông chữ, cỡ, màu sắc, viền, đổ bóng, căn lề, vị trí dọc."
      },
      {
        "title": "Tải xuống file .ass",
        "body": "Dùng ngay trên VLC, Aegisub hoặc bất kỳ trình phát hiện đại nào."
      }
    ],
    "zh": [
      {
        "title": "上传 SRT 或 VTT",
        "body": "或直接粘贴字幕内容。"
      },
      {
        "title": "自定义样式",
        "body": "字体、大小、颜色、描边、投影、对齐方式和垂直位置。"
      },
      {
        "title": "下载 .ass 文件",
        "body": "可直接用于 VLC、Aegisub 或任何现代播放器。"
      }
    ]
  },
  "subtitle-editor": {
    "ar": [
      {
        "title": "حمّل الملف والفيديو",
        "body": "أسقط الترجمة و(اختياريًا) الفيديو المقابل."
      },
      {
        "title": "حرّر الإشارات مباشرةً",
        "body": "انقر على سطر، وعدّل النص أو التوقيت، وشاهد التغيير في المعاينة."
      },
      {
        "title": "تصدير",
        "body": "حمّل ملف SRT أو VTT المُصحَّح عند الانتهاء."
      }
    ],
    "cs": [
      {
        "title": "Načtěte soubor a video",
        "body": "Přetáhněte titulky a (volitelně) odpovídající video."
      },
      {
        "title": "Upravujte stopy živě",
        "body": "Klikněte na řádek, opravte text nebo časování a hned to uvidíte v náhledu."
      },
      {
        "title": "Exportujte",
        "body": "Stáhněte opravený SRT nebo VTT, až budete hotovi."
      }
    ],
    "de": [
      {
        "title": "Datei und Video laden",
        "body": "Untertitel ablegen und optional das passende Video dazu."
      },
      {
        "title": "Cues live bearbeiten",
        "body": "Zeile anklicken, Text oder Timing anpassen, direkt in der Vorschau sehen."
      },
      {
        "title": "Exportieren",
        "body": "Korrigiertes SRT oder VTT herunterladen, wenn du fertig bist."
      }
    ],
    "es": [
      {
        "title": "Carga el archivo y el vídeo",
        "body": "Arrastra los subtítulos y, opcionalmente, el vídeo correspondiente."
      },
      {
        "title": "Edita las pistas en directo",
        "body": "Haz clic en una línea, corrige el texto o el tiempo y vélo en la previsualización."
      },
      {
        "title": "Exporta",
        "body": "Descarga el SRT o VTT corregido cuando hayas terminado."
      }
    ],
    "fr": [
      {
        "title": "Chargez le fichier et la vidéo",
        "body": "Déposez vos sous-titres et, si vous le souhaitez, la vidéo correspondante."
      },
      {
        "title": "Éditez les répliques en direct",
        "body": "Cliquez sur une ligne, corrigez le texte ou le timing, visualisez le résultat en aperçu."
      },
      {
        "title": "Exportez",
        "body": "Téléchargez le SRT ou VTT corrigé une fois terminé."
      }
    ],
    "hi": [
      {
        "title": "फ़ाइल + वीडियो लोड करें",
        "body": "अपने सबटाइटल और (वैकल्पिक रूप से) मिलान करने वाला वीडियो डालें।"
      },
      {
        "title": "क्यूज़ लाइव एडिट करें",
        "body": "किसी लाइन पर क्लिक करें, टेक्स्ट या टाइमिंग ठीक करें, प्रीव्यू में देखें।"
      },
      {
        "title": "एक्सपोर्ट करें",
        "body": "काम पूरा होने पर सही किया हुआ SRT या VTT डाउनलोड करें।"
      }
    ],
    "id": [
      {
        "title": "Muat file + video",
        "body": "Seret subtitle kamu dan (opsional) video yang sesuai."
      },
      {
        "title": "Edit cue secara langsung",
        "body": "Klik baris, perbaiki teks atau waktu, lihat hasilnya di pratinjau."
      },
      {
        "title": "Ekspor",
        "body": "Unduh SRT atau VTT yang sudah diperbaiki setelah selesai."
      }
    ],
    "it": [
      {
        "title": "Carica file e video",
        "body": "Trascina i sottotitoli e, facoltativamente, il video corrispondente."
      },
      {
        "title": "Modifica le cue in tempo reale",
        "body": "Clicca su una riga, correggi il testo o il timing e visualizza l'anteprima."
      },
      {
        "title": "Esporta",
        "body": "Scarica il file SRT o VTT corretto quando hai finito."
      }
    ],
    "ja": [
      {
        "title": "ファイルと動画を読み込む",
        "body": "字幕と（任意で）対応する動画をドロップ。"
      },
      {
        "title": "キューをライブ編集",
        "body": "行をクリックしてテキストやタイミングを修正。プレビューで即確認。"
      },
      {
        "title": "エクスポート",
        "body": "編集完了後、修正した SRT または VTT をダウンロード。"
      }
    ],
    "ko": [
      {
        "title": "파일 + 동영상 불러오기",
        "body": "자막 파일과 (선택적으로) 해당 동영상을 드롭하세요."
      },
      {
        "title": "큐 실시간 편집",
        "body": "줄을 클릭해 텍스트나 타이밍을 수정하고 미리보기에서 바로 확인하세요."
      },
      {
        "title": "내보내기",
        "body": "편집이 끝나면 수정된 SRT 또는 VTT를 다운로드하세요."
      }
    ],
    "nl": [
      {
        "title": "Laad bestand + video",
        "body": "Sleep je ondertitels en (optioneel) de bijbehorende video hierheen."
      },
      {
        "title": "Bewerk cues live",
        "body": "Klik op een regel, pas de tekst of timing aan en zie het direct in de preview."
      },
      {
        "title": "Exporteren",
        "body": "Download de gecorrigeerde SRT of VTT als je klaar bent."
      }
    ],
    "pl": [
      {
        "title": "Załaduj plik i wideo",
        "body": "Upuść napisy i (opcjonalnie) pasujące wideo."
      },
      {
        "title": "Edytuj wskazówki na żywo",
        "body": "Kliknij wiersz, popraw tekst lub czas — zmiany widać od razu w podglądzie."
      },
      {
        "title": "Eksportuj",
        "body": "Pobierz poprawiony plik SRT lub VTT, gdy skończysz."
      }
    ],
    "pt": [
      {
        "title": "Carregue o ficheiro + vídeo",
        "body": "Arraste as suas legendas e (opcionalmente) o vídeo correspondente."
      },
      {
        "title": "Edite as cues em tempo real",
        "body": "Clique numa linha, corrija o texto ou a sincronização e veja a pré-visualização."
      },
      {
        "title": "Exporte",
        "body": "Baixe o SRT ou VTT corrigido quando terminar."
      }
    ],
    "ru": [
      {
        "title": "Загрузите файл и видео",
        "body": "Перетащите субтитры и (опционально) соответствующее видео."
      },
      {
        "title": "Редактируйте реплики в реальном времени",
        "body": "Кликните на строку, исправьте текст или тайминг — изменения сразу видны в превью."
      },
      {
        "title": "Экспорт",
        "body": "Скачайте исправленный SRT или VTT по завершении работы."
      }
    ],
    "sv": [
      {
        "title": "Läs in fil och video",
        "body": "Släpp dina undertexter och (valfritt) den matchande videon."
      },
      {
        "title": "Redigera cues live",
        "body": "Klicka på en rad, rätta text eller timing — se det i förhandsgranskningen."
      },
      {
        "title": "Exportera",
        "body": "Ladda ned den korrigerade SRT- eller VTT-filen när du är klar."
      }
    ],
    "tr": [
      {
        "title": "Dosyayı ve videoyu yükle",
        "body": "Altyazılarını ve (isteğe bağlı olarak) eşleşen videoyu bırak."
      },
      {
        "title": "İpuçlarını canlı düzenle",
        "body": "Bir satıra tıkla, metni veya zamanlamayı düzelt, önizlemede gör."
      },
      {
        "title": "Dışa aktar",
        "body": "İşin bitince düzeltilmiş SRT veya VTT dosyasını indir."
      }
    ],
    "uk": [
      {
        "title": "Завантажте файл і відео",
        "body": "Перетягніть субтитри та (за бажанням) відповідне відео."
      },
      {
        "title": "Редагуйте рядки наживо",
        "body": "Клікніть рядок, виправте текст або тайминг — зміни одразу видно в превʼю."
      },
      {
        "title": "Експортуйте",
        "body": "Завантажте виправлений SRT або VTT, коли закінчите."
      }
    ],
    "vi": [
      {
        "title": "Tải file và video",
        "body": "Kéo thả file phụ đề và (tuỳ chọn) video tương ứng."
      },
      {
        "title": "Chỉnh sửa cue trực tiếp",
        "body": "Nhấp vào dòng, sửa nội dung hoặc thời gian, xem ngay trên bản xem trước."
      },
      {
        "title": "Xuất file",
        "body": "Tải xuống file SRT hoặc VTT đã chỉnh sửa khi hoàn tất."
      }
    ],
    "zh": [
      {
        "title": "加载字幕和视频",
        "body": "拖入字幕文件，以及可选的对应视频。"
      },
      {
        "title": "实时编辑字幕",
        "body": "点击某行，修改文本或时间，预览区即时更新。"
      },
      {
        "title": "导出文件",
        "body": "编辑完成后下载修正后的 SRT 或 VTT 文件。"
      }
    ]
  },
  "subtitle-generator": {
    "ar": [
      {
        "title": "ارفع ملف الوسائط",
        "body": "أسقط ملف فيديو أو صوت. ندعم MP4 وMOV وMP3 وWAV وغيرها."
      },
      {
        "title": "الذكاء الاصطناعي يولّد التسميات",
        "body": "يُحوّل الذكاء الاصطناعي صوتك إلى نص مع طوابع زمنية بأكثر من 30 لغة."
      },
      {
        "title": "حمّل ملف SRT",
        "body": "احصل على ملف .srt نظيف جاهز لـ YouTube وPremiere وأي مشغّل."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte médium",
        "body": "Přetáhněte video nebo audio soubor. Podporujeme MP4, MOV, MP3, WAV a další."
      },
      {
        "title": "AI vygeneruje titulky",
        "body": "AI přepíše zvuk s časovými razítky ve 30+ jazycích."
      },
      {
        "title": "Stáhněte SRT",
        "body": "Získáte čistý soubor .srt připravený pro YouTube, Premiere nebo libovolný přehrávač."
      }
    ],
    "de": [
      {
        "title": "Mediendatei hochladen",
        "body": "Video oder Audio ablegen. Unterstützt werden MP4, MOV, MP3, WAV und mehr."
      },
      {
        "title": "KI erstellt Untertitel",
        "body": "Die KI transkribiert dein Audio mit Zeitstempeln in 30+ Sprachen."
      },
      {
        "title": "SRT herunterladen",
        "body": "Saubere .srt-Datei — direkt für YouTube, Premiere oder jeden Player bereit."
      }
    ],
    "es": [
      {
        "title": "Sube tu archivo multimedia",
        "body": "Arrastra un vídeo o audio. Compatibles: MP4, MOV, MP3, WAV y más."
      },
      {
        "title": "La IA genera los subtítulos",
        "body": "La IA transcribe el audio con marcas de tiempo en más de 30 idiomas."
      },
      {
        "title": "Descarga el SRT",
        "body": "Obtén un archivo .srt listo para YouTube, Premiere o cualquier reproductor."
      }
    ],
    "fr": [
      {
        "title": "Importez votre média",
        "body": "Déposez une vidéo ou un fichier audio. Nous prenons en charge MP4, MOV, MP3, WAV et bien d'autres."
      },
      {
        "title": "L'IA génère les sous-titres",
        "body": "L'IA transcrit votre audio avec horodatage dans 30+ langues."
      },
      {
        "title": "Téléchargez le SRT",
        "body": "Récupérez un fichier .srt propre, prêt pour YouTube, Premiere ou n'importe quel lecteur."
      }
    ],
    "hi": [
      {
        "title": "अपनी मीडिया अपलोड करें",
        "body": "कोई वीडियो या ऑडियो फ़ाइल डालें। हम MP4, MOV, MP3, WAV और अन्य फॉर्मेट सपोर्ट करते हैं।"
      },
      {
        "title": "AI कैप्शन बनाता है",
        "body": "AI आपके ऑडियो को 30+ भाषाओं में टाइमस्टैंप के साथ ट्रांसक्राइब करता है।"
      },
      {
        "title": "SRT डाउनलोड करें",
        "body": "YouTube, Premiere या किसी भी प्लेयर के लिए तैयार एक साफ़ .srt फ़ाइल पाएं।"
      }
    ],
    "id": [
      {
        "title": "Unggah media kamu",
        "body": "Seret video atau file audio. Kami mendukung MP4, MOV, MP3, WAV, dan lainnya."
      },
      {
        "title": "AI membuat teks otomatis",
        "body": "AI mentranskrip audio dengan stempel waktu dalam 30+ bahasa."
      },
      {
        "title": "Unduh file SRT",
        "body": "Dapatkan file .srt yang bersih, siap untuk YouTube, Premiere, atau pemutar apa pun."
      }
    ],
    "it": [
      {
        "title": "Carica il tuo file multimediale",
        "body": "Trascina un video o un file audio. Supportiamo MP4, MOV, MP3, WAV e altri formati."
      },
      {
        "title": "L'AI genera i sottotitoli",
        "body": "L'AI trascrive l'audio con i timestamp in 30+ lingue."
      },
      {
        "title": "Scarica il file SRT",
        "body": "Ottieni un file .srt pulito, pronto per YouTube, Premiere o qualsiasi player."
      }
    ],
    "ja": [
      {
        "title": "メディアをアップロード",
        "body": "動画または音声ファイルをドロップ。MP4、MOV、MP3、WAV などに対応。"
      },
      {
        "title": "AIが字幕を生成",
        "body": "AIが30以上の言語でタイムスタンク付きの音声を書き起こします。"
      },
      {
        "title": "SRTをダウンロード",
        "body": "YouTube、Premiere、各種プレイヤーで使える .srt ファイルを取得。"
      }
    ],
    "ko": [
      {
        "title": "미디어 파일 업로드",
        "body": "동영상 또는 오디오 파일을 드롭하세요. MP4, MOV, MP3, WAV 등을 지원합니다."
      },
      {
        "title": "AI가 자막을 생성합니다",
        "body": "AI가 30개 이상의 언어로 타임스탬프와 함께 음성을 텍스트로 변환합니다."
      },
      {
        "title": "SRT 다운로드",
        "body": "YouTube, Premiere 또는 모든 플레이어에 바로 사용할 수 있는 깔끔한 .srt 파일을 받으세요."
      }
    ],
    "nl": [
      {
        "title": "Upload je mediabestand",
        "body": "Sleep een video of audiobestand hierheen. We ondersteunen MP4, MOV, MP3, WAV en meer."
      },
      {
        "title": "AI genereert ondertitels",
        "body": "AI transcribeert je audio met tijdstempels in 30+ talen."
      },
      {
        "title": "Download de SRT",
        "body": "Een nette .srt klaar voor YouTube, Premiere of elke mediaspeler."
      }
    ],
    "pl": [
      {
        "title": "Prześlij swój plik",
        "body": "Upuść plik wideo lub audio. Obsługujemy MP4, MOV, MP3, WAV i wiele innych."
      },
      {
        "title": "AI generuje napisy",
        "body": "AI transkrybuje dźwięk ze znacznikami czasu w 30+ językach."
      },
      {
        "title": "Pobierz plik SRT",
        "body": "Gotowy plik .srt dla YouTube, Premiere lub dowolnego odtwarzacza."
      }
    ],
    "pt": [
      {
        "title": "Carregue o seu ficheiro",
        "body": "Arraste um vídeo ou áudio. Suportamos MP4, MOV, MP3, WAV e muito mais."
      },
      {
        "title": "A IA gera as legendas",
        "body": "A IA transcreve o áudio com marcações de tempo em 30+ idiomas."
      },
      {
        "title": "Baixe o SRT",
        "body": "Obtenha um ficheiro .srt pronto para YouTube, Premiere ou qualquer reprodutor."
      }
    ],
    "ru": [
      {
        "title": "Загрузите медиафайл",
        "body": "Перетащите видео или аудио. Поддерживаются MP4, MOV, MP3, WAV и другие форматы."
      },
      {
        "title": "ИИ генерирует субтитры",
        "body": "Искусственный интеллект транскрибирует аудио с временными метками на 30+ языках."
      },
      {
        "title": "Скачайте SRT",
        "body": "Получите готовый .srt-файл для YouTube, Premiere или любого плеера."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din mediafil",
        "body": "Släpp en video- eller ljudfil. Vi stöder MP4, MOV, MP3, WAV och fler format."
      },
      {
        "title": "AI genererar undertexter",
        "body": "AI transkriberar ditt ljud med tidsstämplar på 30+ språk."
      },
      {
        "title": "Ladda ned SRT-filen",
        "body": "Få en ren .srt-fil redo för YouTube, Premiere eller valfri spelare."
      }
    ],
    "tr": [
      {
        "title": "Medya dosyanı yükle",
        "body": "Bir video veya ses dosyası bırak. MP4, MOV, MP3, WAV ve daha fazlası desteklenir."
      },
      {
        "title": "AI altyazıları oluşturuyor",
        "body": "AI, sesinizi 30'dan fazla dilde zaman damgalarıyla metne dönüştürür."
      },
      {
        "title": "SRT dosyasını indir",
        "body": "YouTube, Premiere veya herhangi bir oynatıcıya hazır, temiz bir .srt dosyası alırsın."
      }
    ],
    "uk": [
      {
        "title": "Завантажте медіафайл",
        "body": "Перетягніть відео або аудіо. Підтримуємо MP4, MOV, MP3, WAV та інші формати."
      },
      {
        "title": "ШІ генерує субтитри",
        "body": "ШІ транскрибує аудіо з таймкодами на 30+ мовах."
      },
      {
        "title": "Завантажте SRT",
        "body": "Отримайте готовий .srt файл для YouTube, Premiere або будь-якого плеєра."
      }
    ],
    "vi": [
      {
        "title": "Tải tệp phương tiện lên",
        "body": "Kéo thả tệp video hoặc âm thanh. Hỗ trợ MP4, MOV, MP3, WAV và nhiều định dạng khác."
      },
      {
        "title": "AI tạo phụ đề tự động",
        "body": "AI phiên âm giọng nói kèm mốc thời gian trong 30+ ngôn ngữ."
      },
      {
        "title": "Tải xuống file SRT",
        "body": "Nhận file .srt sạch sẽ, dùng ngay trên YouTube, Premiere hoặc bất kỳ trình phát nào."
      }
    ],
    "zh": [
      {
        "title": "上传媒体文件",
        "body": "拖入视频或音频文件，支持 MP4、MOV、MP3、WAV 等格式。"
      },
      {
        "title": "AI 自动生成字幕",
        "body": "AI 对音频进行转录，支持 30+ 种语言，并带有精确时间戳。"
      },
      {
        "title": "下载 SRT 文件",
        "body": "获得整洁的 .srt 文件，可直接用于 YouTube、Premiere 或任意播放器。"
      }
    ]
  },
  "sync-subtitles": {
    "ar": [
      {
        "title": "ارفع الملف غير المتزامن",
        "body": "ندعم SRT وVTT."
      },
      {
        "title": "أدخل قيمة الإزاحة",
        "body": "موجب للتأخير، سالب للتقديم. دقة بالملي ثانية."
      },
      {
        "title": "حمّل الملف المُصحَّح",
        "body": "كل إشارة مُزاحة بدقة — مع الحفاظ على طوابع البداية والنهاية."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte nesynchronizovaný soubor",
        "body": "Podporujeme SRT a VTT."
      },
      {
        "title": "Zadejte posun",
        "body": "Kladná hodnota zpozdí, záporná zrychlí. Přesnost na milisekundy."
      },
      {
        "title": "Stáhněte opravený soubor",
        "body": "Každá stopa posunuta přesně — začátek i konec jsou zachovány."
      }
    ],
    "de": [
      {
        "title": "Versetzte Datei hochladen",
        "body": "SRT und VTT werden unterstützt."
      },
      {
        "title": "Versatz eingeben",
        "body": "Positiv zum Verzögern, negativ zum Vorziehen. Millisekunden-Genauigkeit."
      },
      {
        "title": "Korrigierte Datei herunterladen",
        "body": "Jeder Cue exakt verschoben — Start- und End-Zeitstempel bleiben erhalten."
      }
    ],
    "es": [
      {
        "title": "Sube el archivo desincronizado",
        "body": "Compatibles: SRT y VTT."
      },
      {
        "title": "Introduce el desfase",
        "body": "Positivo para retrasar, negativo para adelantar. Precisión de milisegundos."
      },
      {
        "title": "Descarga el archivo corregido",
        "body": "Cada pista desplazada exactamente — marcas de inicio y fin conservadas."
      }
    ],
    "fr": [
      {
        "title": "Importez le fichier désynchronisé",
        "body": "Nous prenons en charge SRT et VTT."
      },
      {
        "title": "Entrez le décalage",
        "body": "Positif pour retarder, négatif pour avancer. Précision à la milliseconde."
      },
      {
        "title": "Téléchargez le fichier corrigé",
        "body": "Chaque réplique décalée exactement — horodatages de début et de fin préservés."
      }
    ],
    "hi": [
      {
        "title": "डीसिंक फ़ाइल अपलोड करें",
        "body": "हम SRT और VTT सपोर्ट करते हैं।"
      },
      {
        "title": "ऑफ़सेट डालें",
        "body": "देरी के लिए पॉज़िटिव, आगे करने के लिए नेगेटिव। मिलीसेकंड की सटीकता।"
      },
      {
        "title": "ठीक की गई फ़ाइल डाउनलोड करें",
        "body": "हर क्यू बिल्कुल सही — शुरू और अंत के टाइमस्टैंप सुरक्षित।"
      }
    ],
    "id": [
      {
        "title": "Unggah file yang tidak sinkron",
        "body": "Kami mendukung SRT dan VTT."
      },
      {
        "title": "Masukkan offset",
        "body": "Positif untuk menunda, negatif untuk memajukan. Presisi milidetik."
      },
      {
        "title": "Unduh file yang sudah diperbaiki",
        "body": "Setiap cue digeser tepat — stempel waktu awal dan akhir tetap terjaga."
      }
    ],
    "it": [
      {
        "title": "Carica il file non sincronizzato",
        "body": "Supportiamo SRT e VTT."
      },
      {
        "title": "Inserisci l'offset",
        "body": "Positivo per ritardare, negativo per anticipare. Precisione al millisecondo."
      },
      {
        "title": "Scarica il file corretto",
        "body": "Ogni cue spostata con precisione — timestamp di inizio e fine preservati."
      }
    ],
    "ja": [
      {
        "title": "ズレた字幕ファイルをアップロード",
        "body": "SRT と VTT に対応。"
      },
      {
        "title": "オフセットを入力",
        "body": "正の値で遅延、負の値で前進。ミリ秒単位で調整可能。"
      },
      {
        "title": "修正済みファイルをダウンロード",
        "body": "全キューが正確にシフト。開始・終了タイムスタンプも保持。"
      }
    ],
    "ko": [
      {
        "title": "싱크가 맞지 않는 파일 업로드",
        "body": "SRT와 VTT를 지원합니다."
      },
      {
        "title": "오프셋 입력",
        "body": "양수는 지연, 음수는 앞당깁니다. 밀리초 단위로 정밀하게 조정하세요."
      },
      {
        "title": "수정된 파일 다운로드",
        "body": "모든 큐가 정확히 이동되며 시작·종료 타임스탬프가 유지됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload het niet-gesynchroniseerde bestand",
        "body": "We ondersteunen SRT en VTT."
      },
      {
        "title": "Geef de verschuiving op",
        "body": "Positief om te vertragen, negatief om te vervroegen. Nauwkeurig op milliseconde."
      },
      {
        "title": "Download het gecorrigeerde bestand",
        "body": "Elke cue precies verschoven — begin- en eindtijdstempels bewaard."
      }
    ],
    "pl": [
      {
        "title": "Prześlij niesynchroniczny plik",
        "body": "Obsługujemy SRT i VTT."
      },
      {
        "title": "Podaj przesunięcie",
        "body": "Wartość dodatnia opóźni napisy, ujemna przyspieszy. Precyzja do milisekundy."
      },
      {
        "title": "Pobierz naprawiony plik",
        "body": "Każda wskazówka przesunięta dokładnie — znaczniki początku i końca zachowane."
      }
    ],
    "pt": [
      {
        "title": "Carregue o ficheiro dessincronizado",
        "body": "Suportamos SRT e VTT."
      },
      {
        "title": "Introduza o desfasamento",
        "body": "Positivo para atrasar, negativo para adiantar. Precisão em milissegundos."
      },
      {
        "title": "Baixe o ficheiro corrigido",
        "body": "Cada cue deslocada com exatidão — timestamps de início e fim preservados."
      }
    ],
    "ru": [
      {
        "title": "Загрузите файл с рассинхроном",
        "body": "Поддерживаются SRT и VTT."
      },
      {
        "title": "Введите сдвиг",
        "body": "Положительное значение — задержка, отрицательное — опережение. Точность до миллисекунды."
      },
      {
        "title": "Скачайте исправленный файл",
        "body": "Каждая реплика сдвинута точно — начало и конец временных меток сохранены."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp den osynkade filen",
        "body": "Vi stöder SRT och VTT."
      },
      {
        "title": "Ange offset",
        "body": "Positivt för att fördröja, negativt för att tidigarelägga. Millisekundsprecision."
      },
      {
        "title": "Ladda ned den fixade filen",
        "body": "Varje cue förskjuten exakt — start- och sluttidsstämplar bevarade."
      }
    ],
    "tr": [
      {
        "title": "Senkronsuz dosyayı yükle",
        "body": "SRT ve VTT desteklenir."
      },
      {
        "title": "Farkı gir",
        "body": "Geciktirmek için artı, öne almak için eksi. Milisaniye hassasiyeti."
      },
      {
        "title": "Düzeltilmiş dosyayı indir",
        "body": "Her ipucu tam olarak kaydırılmış — başlangıç ve bitiş zaman damgaları korunmuş."
      }
    ],
    "uk": [
      {
        "title": "Завантажте файл із помилковим таймингом",
        "body": "Підтримуємо SRT і VTT."
      },
      {
        "title": "Введіть зміщення",
        "body": "Позитивне — затримка, від'ємне — прискорення. Точність до мілісекунди."
      },
      {
        "title": "Завантажте виправлений файл",
        "body": "Кожен рядок зміщено рівно — початок і кінець збережено."
      }
    ],
    "vi": [
      {
        "title": "Tải lên file phụ đề bị lệch",
        "body": "Hỗ trợ SRT và VTT."
      },
      {
        "title": "Nhập độ lệch",
        "body": "Giá trị dương để trì hoãn, âm để tăng tốc. Độ chính xác đến millisecond."
      },
      {
        "title": "Tải xuống file đã sửa",
        "body": "Tất cả cue được dịch chuyển chính xác — thời điểm bắt đầu và kết thúc được giữ nguyên."
      }
    ],
    "zh": [
      {
        "title": "上传不同步的字幕文件",
        "body": "支持 SRT 和 VTT 格式。"
      },
      {
        "title": "输入偏移量",
        "body": "正值延后，负值提前，精度达毫秒级。"
      },
      {
        "title": "下载修复后的文件",
        "body": "每条字幕精确偏移，起止时间戳完整保留。"
      }
    ]
  },
  "synonyms-finder": {
    "ar": [
      {
        "title": "اكتب كلمة",
        "body": "بأي لغة — يكتشفها الذكاء الاصطناعي تلقائيًا."
      },
      {
        "title": "احصل على مرادفات مدركة للسياق",
        "body": "مُجمَّعة حسب المعنى عندما تحمل الكلمة أكثر من دلالة."
      },
      {
        "title": "انسخ ما يناسبك",
        "body": "البدائل الأكثر طبيعية أولًا."
      }
    ],
    "cs": [
      {
        "title": "Napište slovo",
        "body": "V libovolném jazyce — AI ho detekuje automaticky."
      },
      {
        "title": "Získejte synonyma dle kontextu",
        "body": "Seskupená podle významu, pokud má slovo více smyslů."
      },
      {
        "title": "Zkopírujte, co se hodí",
        "body": "Nejpřirozenější alternativy jsou první."
      }
    ],
    "de": [
      {
        "title": "Wort eingeben",
        "body": "In beliebiger Sprache — die KI erkennt sie automatisch."
      },
      {
        "title": "Bedeutungsbewusste Synonyme erhalten",
        "body": "Nach Bedeutung gruppiert, wenn ein Wort mehrere Bedeutungen hat."
      },
      {
        "title": "Passendes kopieren",
        "body": "Die natürlichsten Alternativen zuerst."
      }
    ],
    "es": [
      {
        "title": "Escribe una palabra",
        "body": "En cualquier idioma — la IA lo detecta automáticamente."
      },
      {
        "title": "Sinónimos según el contexto",
        "body": "Agrupados por significado cuando una palabra tiene varios sentidos."
      },
      {
        "title": "Copia el que mejor encaje",
        "body": "Las alternativas más naturales, primero."
      }
    ],
    "fr": [
      {
        "title": "Tapez un mot",
        "body": "Dans n'importe quelle langue — l'IA la détecte automatiquement."
      },
      {
        "title": "Obtenez des synonymes contextuels",
        "body": "Regroupés par sens quand un mot a plusieurs significations."
      },
      {
        "title": "Copiez ce qui convient",
        "body": "Les alternatives les plus naturelles en premier."
      }
    ],
    "hi": [
      {
        "title": "एक शब्द टाइप करें",
        "body": "किसी भी भाषा में — AI इसे अपने आप पहचानता है।"
      },
      {
        "title": "अर्थ-सजग समानार्थी पाएं",
        "body": "जब किसी शब्द के कई अर्थ हों तो अर्थ के अनुसार समूहीकृत।"
      },
      {
        "title": "जो सही लगे कॉपी करें",
        "body": "सबसे प्राकृतिक विकल्प पहले।"
      }
    ],
    "id": [
      {
        "title": "Ketik kata",
        "body": "Dalam bahasa apa pun — AI mendeteksinya secara otomatis."
      },
      {
        "title": "Dapatkan sinonim berbasis makna",
        "body": "Dikelompokkan berdasarkan arti jika kata memiliki beberapa makna."
      },
      {
        "title": "Salin yang paling cocok",
        "body": "Alternatif paling alami ditampilkan lebih dulu."
      }
    ],
    "it": [
      {
        "title": "Digita una parola",
        "body": "In qualsiasi lingua — l'AI la rileva automaticamente."
      },
      {
        "title": "Ottieni sinonimi contestuali",
        "body": "Raggruppati per significato quando una parola ha più accezioni."
      },
      {
        "title": "Copia quello che fa al caso tuo",
        "body": "Le alternative più naturali vengono prima."
      }
    ],
    "ja": [
      {
        "title": "単語を入力",
        "body": "任意の言語でOK。AIが自動検出します。"
      },
      {
        "title": "意味別の類語を取得",
        "body": "単語が複数の意味を持つ場合、意味ごとにグループ化。"
      },
      {
        "title": "合うものをコピー",
        "body": "最も自然な候補が先頭に表示されます。"
      }
    ],
    "ko": [
      {
        "title": "단어 입력",
        "body": "어떤 언어든 AI가 자동으로 감지합니다."
      },
      {
        "title": "의미별 유의어 제공",
        "body": "단어의 의미가 여러 개일 경우 의미별로 그룹화됩니다."
      },
      {
        "title": "맞는 단어 복사",
        "body": "가장 자연스러운 대안이 먼저 표시됩니다."
      }
    ],
    "nl": [
      {
        "title": "Typ een woord",
        "body": "In elke taal — de AI herkent hem automatisch."
      },
      {
        "title": "Ontvang betekenisgevoelige synoniemen",
        "body": "Gegroepeerd op betekenis als een woord meerdere zinnen heeft."
      },
      {
        "title": "Kopieer wat past",
        "body": "Meest natuurlijke alternatieven eerst."
      }
    ],
    "pl": [
      {
        "title": "Wpisz słowo",
        "body": "W dowolnym języku — AI wykrywa go automatycznie."
      },
      {
        "title": "Synonimy z uwzględnieniem znaczenia",
        "body": "Grupowane według sensu, gdy słowo ma kilka znaczeń."
      },
      {
        "title": "Skopiuj to, co pasuje",
        "body": "Najpierw najbardziej naturalne alternatywy."
      }
    ],
    "pt": [
      {
        "title": "Escreva uma palavra",
        "body": "Em qualquer idioma — a IA deteta automaticamente."
      },
      {
        "title": "Obtenha sinônimos contextuais",
        "body": "Agrupados por significado quando a palavra tem vários sentidos."
      },
      {
        "title": "Copie o que se encaixa",
        "body": "As alternativas mais naturais aparecem primeiro."
      }
    ],
    "ru": [
      {
        "title": "Введите слово",
        "body": "На любом языке — ИИ определит его автоматически."
      },
      {
        "title": "Получите синонимы по значению",
        "body": "Сгруппированы по смыслу, если у слова несколько значений."
      },
      {
        "title": "Скопируйте подходящий вариант",
        "body": "Самые естественные альтернативы — в начале списка."
      }
    ],
    "sv": [
      {
        "title": "Skriv ett ord",
        "body": "På vilket språk som helst — AI identifierar det automatiskt."
      },
      {
        "title": "Få betydelsemedvetna synonymer",
        "body": "Grupperade efter innebörd när ett ord har flera betydelser."
      },
      {
        "title": "Kopiera det som passar",
        "body": "Mest naturliga alternativ först."
      }
    ],
    "tr": [
      {
        "title": "Bir kelime yaz",
        "body": "Herhangi bir dilde — AI otomatik olarak algılar."
      },
      {
        "title": "Anlam farkında eş anlamlılar al",
        "body": "Kelimenin birden fazla anlamı varsa anlama göre gruplandırılmış."
      },
      {
        "title": "Uygun olanı kopyala",
        "body": "En doğal alternatifler önce gelir."
      }
    ],
    "uk": [
      {
        "title": "Введіть слово",
        "body": "Будь-якою мовою — ШІ визначить її автоматично."
      },
      {
        "title": "Отримайте синоніми з урахуванням значення",
        "body": "Згруповані за змістом, якщо слово має кілька значень."
      },
      {
        "title": "Скопіюйте потрібне",
        "body": "Найбільш природні варіанти — першими."
      }
    ],
    "vi": [
      {
        "title": "Nhập một từ",
        "body": "Bất kỳ ngôn ngữ nào — AI tự phát hiện."
      },
      {
        "title": "Nhận từ đồng nghĩa theo ngữ nghĩa",
        "body": "Nhóm theo nghĩa khi từ có nhiều nghĩa khác nhau."
      },
      {
        "title": "Sao chép từ phù hợp",
        "body": "Các lựa chọn tự nhiên nhất được xếp trước."
      }
    ],
    "zh": [
      {
        "title": "输入词语",
        "body": "支持任意语言，AI 自动识别。"
      },
      {
        "title": "获取按语义分组的同义词",
        "body": "同一词语的多个含义分别归组显示。"
      },
      {
        "title": "复制最合适的",
        "body": "最自然的替代词优先展示。"
      }
    ]
  },
  "text-encryptor": {
    "ar": [
      {
        "title": "اختر الوضع",
        "body": "تشفير لقفل رسالة، أو فكّ تشفير لقراءتها."
      },
      {
        "title": "أدخل كلمة مرور قوية",
        "body": "تُستخدم لاشتقاق مفتاح AES محليًا عبر PBKDF2."
      },
      {
        "title": "انسخ النتيجة",
        "body": "كتلة base64 مكتفية بذاتها يمكنك إرسالها لأي شخص."
      }
    ],
    "cs": [
      {
        "title": "Vyberte režim",
        "body": "Šifrovat pro zamknutí zprávy, nebo dešifrovat pro její přečtení."
      },
      {
        "title": "Zadejte silné heslo",
        "body": "Použije se k odvození AES klíče lokálně přes PBKDF2."
      },
      {
        "title": "Zkopírujte výsledek",
        "body": "Samostatný blob base64, který můžete poslat kamkoli."
      }
    ],
    "de": [
      {
        "title": "Modus wählen",
        "body": "Verschlüsseln zum Sichern einer Nachricht oder Entschlüsseln zum Lesen."
      },
      {
        "title": "Starkes Passwort eingeben",
        "body": "Dient zur lokalen AES-Schlüsselableitung via PBKDF2."
      },
      {
        "title": "Ergebnis kopieren",
        "body": "Ein in sich geschlossener base64-Blob, den du überall versenden kannst."
      }
    ],
    "es": [
      {
        "title": "Elige el modo",
        "body": "Cifrar para proteger un mensaje, o Descifrar para leerlo."
      },
      {
        "title": "Introduce una contraseña robusta",
        "body": "Se usa para derivar la clave AES localmente mediante PBKDF2."
      },
      {
        "title": "Copia el resultado",
        "body": "Un blob base64 autocontenido que puedes enviar a cualquier lugar."
      }
    ],
    "fr": [
      {
        "title": "Choisissez un mode",
        "body": "Chiffrez pour verrouiller un message, ou déchiffrez pour en lire un."
      },
      {
        "title": "Entrez un mot de passe fort",
        "body": "Utilisé pour dériver la clé AES localement via PBKDF2."
      },
      {
        "title": "Copiez le résultat",
        "body": "Un blob base64 autonome que vous pouvez envoyer n'importe où."
      }
    ],
    "hi": [
      {
        "title": "मोड चुनें",
        "body": "संदेश लॉक करने के लिए Encrypt, या पढ़ने के लिए Decrypt।"
      },
      {
        "title": "मज़बूत पासवर्ड डालें",
        "body": "लोकल रूप से PBKDF2 के ज़रिए AES key derive करने के लिए उपयोग होता है।"
      },
      {
        "title": "परिणाम कॉपी करें",
        "body": "एक self-contained base64 blob जो आप कहीं भी भेज सकते हैं।"
      }
    ],
    "id": [
      {
        "title": "Pilih mode",
        "body": "Enkripsi untuk mengunci pesan, atau Dekripsi untuk membacanya."
      },
      {
        "title": "Masukkan kata sandi yang kuat",
        "body": "Digunakan untuk menurunkan kunci AES secara lokal melalui PBKDF2."
      },
      {
        "title": "Salin hasilnya",
        "body": "Blob base64 mandiri yang bisa dikirim ke mana saja."
      }
    ],
    "it": [
      {
        "title": "Scegli una modalità",
        "body": "Cifra per proteggere un messaggio, o Decifra per leggerlo."
      },
      {
        "title": "Inserisci una password robusta",
        "body": "Usata per derivare la chiave AES in locale tramite PBKDF2."
      },
      {
        "title": "Copia il risultato",
        "body": "Un blob base64 autonomo che puoi inviare ovunque."
      }
    ],
    "ja": [
      {
        "title": "モードを選択",
        "body": "暗号化でメッセージを保護、復号化でメッセージを読む。"
      },
      {
        "title": "強力なパスワードを入力",
        "body": "PBKDF2 でローカルに AES キーを導出するために使用。"
      },
      {
        "title": "結果をコピー",
        "body": "どこへでも送れる自己完結型の base64 ブロブ。"
      }
    ],
    "ko": [
      {
        "title": "모드 선택",
        "body": "메시지를 잠그려면 암호화, 읽으려면 복호화를 선택하세요."
      },
      {
        "title": "강력한 비밀번호 입력",
        "body": "PBKDF2를 통해 로컬에서 AES 키를 파생합니다."
      },
      {
        "title": "결과 복사",
        "body": "어디서든 전송할 수 있는 독립적인 base64 블롭입니다."
      }
    ],
    "nl": [
      {
        "title": "Kies een modus",
        "body": "Versleutelen om een bericht te vergrendelen, of ontsleutelen om er een te lezen."
      },
      {
        "title": "Voer een sterk wachtwoord in",
        "body": "Gebruikt om lokaal de AES-sleutel af te leiden via PBKDF2."
      },
      {
        "title": "Kopieer het resultaat",
        "body": "Een op zichzelf staande base64-blob die je overal naartoe kunt sturen."
      }
    ],
    "pl": [
      {
        "title": "Wybierz tryb",
        "body": "Szyfruj, aby zabezpieczyć wiadomość, lub Odszyfruj, aby ją odczytać."
      },
      {
        "title": "Podaj silne hasło",
        "body": "Służy do lokalnego wyprowadzenia klucza AES przez PBKDF2."
      },
      {
        "title": "Skopiuj wynik",
        "body": "Samodzielny blob base64, który możesz przesłać w dowolne miejsce."
      }
    ],
    "pt": [
      {
        "title": "Escolha o modo",
        "body": "Cifrar para bloquear uma mensagem, ou Decifrar para ler uma."
      },
      {
        "title": "Introduza uma palavra-passe forte",
        "body": "Usada para derivar a chave AES localmente via PBKDF2."
      },
      {
        "title": "Copie o resultado",
        "body": "Um blob base64 autónomo que pode enviar para onde quiser."
      }
    ],
    "ru": [
      {
        "title": "Выберите режим",
        "body": "Зашифровать сообщение или расшифровать полученное."
      },
      {
        "title": "Введите надёжный пароль",
        "body": "Используется для локального получения AES-ключа через PBKDF2."
      },
      {
        "title": "Скопируйте результат",
        "body": "Самодостаточный base64-блоб, который можно отправить куда угодно."
      }
    ],
    "sv": [
      {
        "title": "Välj ett läge",
        "body": "Kryptera för att låsa ett meddelande, eller dekryptera för att läsa ett."
      },
      {
        "title": "Ange ett starkt lösenord",
        "body": "Används för att härleda AES-nyckeln lokalt via PBKDF2."
      },
      {
        "title": "Kopiera resultatet",
        "body": "En fristående base64-blob du kan skicka var som helst."
      }
    ],
    "tr": [
      {
        "title": "Bir mod seç",
        "body": "Mesaj kilitlemek için Şifrele, okumak için Çöz."
      },
      {
        "title": "Güçlü bir şifre gir",
        "body": "Yerel olarak PBKDF2 aracılığıyla AES anahtarını türetmek için kullanılır."
      },
      {
        "title": "Sonucu kopyala",
        "body": "Her yere gönderilebilen, kendi kendine yeten bir base64 blobu."
      }
    ],
    "uk": [
      {
        "title": "Оберіть режим",
        "body": "Шифруйте, щоб захистити повідомлення, або дешифруйте, щоб його прочитати."
      },
      {
        "title": "Введіть надійний пароль",
        "body": "Використовується для локального виведення AES-ключа через PBKDF2."
      },
      {
        "title": "Скопіюйте результат",
        "body": "Самодостатній base64-блок, який можна надіслати куди завгодно."
      }
    ],
    "vi": [
      {
        "title": "Chọn chế độ",
        "body": "Mã hóa để khóa tin nhắn, hoặc giải mã để đọc."
      },
      {
        "title": "Nhập mật khẩu mạnh",
        "body": "Dùng để tạo khóa AES cục bộ qua PBKDF2."
      },
      {
        "title": "Sao chép kết quả",
        "body": "Một blob base64 khép kín, có thể gửi đi bất kỳ đâu."
      }
    ],
    "zh": [
      {
        "title": "选择模式",
        "body": "加密以锁定消息，或解密以读取消息。"
      },
      {
        "title": "输入强密码",
        "body": "通过 PBKDF2 在本地派生 AES 密钥。"
      },
      {
        "title": "复制结果",
        "body": "生成独立的 base64 数据块，可在任意渠道发送。"
      }
    ]
  },
  "tiktok-subtitles": {
    "ar": [
      {
        "title": "ارفع مقطعك القصير",
        "body": "رأسي أو أفقي — أي نسبة عرض."
      },
      {
        "title": "اختر نمط التسمية",
        "body": "كاراوكي أو منبثق أو كلاسيكي — معاينة قبل العرض."
      },
      {
        "title": "حمّل MP4 مع التسميات",
        "body": "جاهز بالتنسيق. أسقطه في جدول النشر."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte krátké video",
        "body": "Svislé nebo vodorovné — jakýkoli poměr stran."
      },
      {
        "title": "Vyberte styl titulků",
        "body": "Karaoke, pop-up, klasický — náhled před vykreslením."
      },
      {
        "title": "Stáhněte MP4 s titulky",
        "body": "Styl je zahrnut. Přetáhněte do plánovače a publikujte."
      }
    ],
    "de": [
      {
        "title": "Kurzform-Video hochladen",
        "body": "Vertikal oder horizontal — jedes Seitenverhältnis."
      },
      {
        "title": "Untertitel-Stil wählen",
        "body": "Karaoke, Pop-up, Klassisch — Vorschau vor dem Rendern."
      },
      {
        "title": "MP4 mit Untertiteln herunterladen",
        "body": "Fertig gestaltet. In den Scheduler laden und posten."
      }
    ],
    "es": [
      {
        "title": "Sube tu vídeo corto",
        "body": "Vertical u horizontal — cualquier relación de aspecto."
      },
      {
        "title": "Elige el estilo de subtítulos",
        "body": "Karaoke, pop-up, clásico — previsualiza antes de renderizar."
      },
      {
        "title": "Descarga el MP4 con subtítulos",
        "body": "Ya con el estilo aplicado. Súbelo a tu planificador y publica."
      }
    ],
    "fr": [
      {
        "title": "Importez votre vidéo courte",
        "body": "Verticale ou horizontale — tout format d'image."
      },
      {
        "title": "Choisissez un style de sous-titres",
        "body": "Karaoké, pop-up, classique — prévisualisez avant le rendu."
      },
      {
        "title": "Téléchargez le MP4 sous-titré",
        "body": "Déjà stylisé. Glissez-le dans votre planificateur et publiez."
      }
    ],
    "hi": [
      {
        "title": "अपना शॉर्ट-फॉर्म वीडियो अपलोड करें",
        "body": "वर्टिकल या हॉरिज़ॉन्टल — कोई भी आस्पेक्ट रेशियो।"
      },
      {
        "title": "कैप्शन स्टाइल चुनें",
        "body": "कराओके, पॉप-अप, क्लासिक — रेंडर से पहले प्रीव्यू करें।"
      },
      {
        "title": "कैप्शन वाला MP4 डाउनलोड करें",
        "body": "स्टाइल तैयार है। अपने शेड्यूलर में डालें और पोस्ट करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah video pendekmu",
        "body": "Vertikal atau horizontal — rasio aspek apa pun."
      },
      {
        "title": "Pilih gaya teks",
        "body": "Karaoke, pop-up, klasik — pratinjau sebelum dirender."
      },
      {
        "title": "Unduh MP4 berteks",
        "body": "Sudah bergaya. Masukkan ke penjadwal dan posting."
      }
    ],
    "it": [
      {
        "title": "Carica il tuo video in formato breve",
        "body": "Verticale o orizzontale — qualsiasi proporzione."
      },
      {
        "title": "Scegli uno stile per le didascalie",
        "body": "Karaoke, pop-up, classico — visualizza l'anteprima prima del rendering."
      },
      {
        "title": "Scarica il MP4 con i sottotitoli",
        "body": "Già stilizzato. Inseriscilo nel tuo scheduler e pubblica."
      }
    ],
    "ja": [
      {
        "title": "ショート動画をアップロード",
        "body": "縦向き・横向き問わず、任意のアスペクト比に対応。"
      },
      {
        "title": "キャプションスタイルを選択",
        "body": "カラオケ・ポップアップ・クラシックをレンダリング前にプレビュー。"
      },
      {
        "title": "字幕入りMP4をダウンロード",
        "body": "スタイル適用済み。スケジューラに入れてそのまま投稿できます。"
      }
    ],
    "ko": [
      {
        "title": "숏폼 동영상 업로드",
        "body": "세로 또는 가로 — 어떤 비율이든 괜찮습니다."
      },
      {
        "title": "자막 스타일 선택",
        "body": "노래방, 팝업, 클래식 — 렌더링 전에 미리 확인하세요."
      },
      {
        "title": "자막이 삽입된 MP4 다운로드",
        "body": "스타일이 이미 적용되어 있습니다. 스케줄러에 바로 올리세요."
      }
    ],
    "nl": [
      {
        "title": "Upload je korte video",
        "body": "Verticaal of horizontaal — elke beeldverhouding."
      },
      {
        "title": "Kies een bijschriftstijl",
        "body": "Karaoke, pop-up, klassiek — bekijk een preview vóór het renderen."
      },
      {
        "title": "Download de MP4 met ondertitels",
        "body": "Al gestyled. Zet hem in je scheduler en post."
      }
    ],
    "pl": [
      {
        "title": "Prześlij swój krótki film",
        "body": "Pionowy lub poziomy — dowolny format kadru."
      },
      {
        "title": "Wybierz styl napisów",
        "body": "Karaoke, wyskakujące, klasyczne — sprawdź podgląd przed renderowaniem."
      },
      {
        "title": "Pobierz wideo z napisami",
        "body": "Gotowe i ostylowane. Wrzuć do planera i opublikuj."
      }
    ],
    "pt": [
      {
        "title": "Carregue o seu vídeo curto",
        "body": "Vertical ou horizontal — qualquer proporção de ecrã."
      },
      {
        "title": "Escolha um estilo de legenda",
        "body": "Karaoke, pop-up, clássico — pré-visualize antes de renderizar."
      },
      {
        "title": "Baixe o MP4 com legendas",
        "body": "Já estilizado. Adicione ao seu agendador e publique."
      }
    ],
    "ru": [
      {
        "title": "Загрузите короткое видео",
        "body": "Вертикальное или горизонтальное — любое соотношение сторон."
      },
      {
        "title": "Выберите стиль субтитров",
        "body": "Karaoke, pop-up, классический — смотрите превью перед рендерингом."
      },
      {
        "title": "Скачайте MP4 с субтитрами",
        "body": "Стиль уже применён. Загружайте в планировщик и публикуйте."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din kortvideo",
        "body": "Stående eller liggande — vilket bildformat som helst."
      },
      {
        "title": "Välj en textningsstil",
        "body": "Karaoke, pop-up, klassisk — förhandsgranska innan rendering."
      },
      {
        "title": "Ladda ned den textade MP4:an",
        "body": "Redan stilsatt. Lägg den i din schemaläggare och publicera."
      }
    ],
    "tr": [
      {
        "title": "Kısa video içeriğini yükle",
        "body": "Dikey veya yatay — her en-boy oranı desteklenir."
      },
      {
        "title": "Bir altyazı stili seç",
        "body": "Karaoke, pop-up, klasik — işlemeden önce önizle."
      },
      {
        "title": "Altyazılı MP4'ü indir",
        "body": "Stillendirilmiş olarak hazır. Planlayıcına bırak ve paylaş."
      }
    ],
    "uk": [
      {
        "title": "Завантажте коротке відео",
        "body": "Вертикальне чи горизонтальне — будь-яке співвідношення сторін."
      },
      {
        "title": "Оберіть стиль субтитрів",
        "body": "Каraoke, спливаючі, класичні — перегляньте перед рендерингом."
      },
      {
        "title": "Завантажте MP4 із субтитрами",
        "body": "Стиль уже застосовано. Завантажте до планувальника і публікуйте."
      }
    ],
    "vi": [
      {
        "title": "Tải video ngắn lên",
        "body": "Dọc hay ngang — mọi tỉ lệ khung hình đều được."
      },
      {
        "title": "Chọn phong cách phụ đề",
        "body": "Karaoke, pop-up, classic — xem trước trước khi xuất."
      },
      {
        "title": "Tải xuống MP4 đã có phụ đề",
        "body": "Đã hoàn thiện. Đưa vào lịch đăng và xuất bản ngay."
      }
    ],
    "zh": [
      {
        "title": "上传短视频",
        "body": "竖屏或横屏均可，支持任意宽高比。"
      },
      {
        "title": "选择字幕样式",
        "body": "卡拉OK、弹出式、经典款——渲染前可先预览效果。"
      },
      {
        "title": "下载带字幕的 MP4",
        "body": "样式已就绪，导入排期工具直接发布。"
      }
    ]
  },
  "translate-document-with-layout": {
    "ar": [
      {
        "title": "ارفع .docx",
        "body": "مستندات Word (.docx) — الخطوط والعناوين والجداول والصور تبقى في مكانها."
      },
      {
        "title": "اختر لغة الهدف",
        "body": "أكثر من 30 لغة بطلاقة ذكاء اصطناعي أصيلة."
      },
      {
        "title": "حمّل النسخة المترجَمة",
        "body": "نفس التخطيط، كل فقرة مترجَمة — حتى الترويسات والتذييلات."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte soubor .docx",
        "body": "Word dokumenty (.docx) — písma, nadpisy, tabulky a obrázky zůstanou na místě."
      },
      {
        "title": "Vyberte cílový jazyk",
        "body": "30+ jazyků s plynulostí nativní AI."
      },
      {
        "title": "Stáhněte přeloženou kopii",
        "body": "Stejné rozložení, každý odstavec přeložen — včetně záhlaví a zápatí."
      }
    ],
    "de": [
      {
        "title": ".docx hochladen",
        "body": "Word-Dokumente (.docx) — Schriften, Überschriften, Tabellen und Bilder bleiben erhalten."
      },
      {
        "title": "Zielsprache wählen",
        "body": "30+ Sprachen mit nativ-flüssiger KI-Übersetzung."
      },
      {
        "title": "Übersetzte Kopie herunterladen",
        "body": "Gleiches Layout, jeder Absatz übersetzt — auch Kopf- und Fußzeilen."
      }
    ],
    "es": [
      {
        "title": "Sube tu .docx",
        "body": "Documentos Word (.docx) — fuentes, encabezados, tablas e imágenes se conservan."
      },
      {
        "title": "Elige el idioma de destino",
        "body": "Más de 30 idiomas con fluidez nativa de IA."
      },
      {
        "title": "Descarga la copia traducida",
        "body": "Mismo diseño, cada párrafo traducido — incluso encabezados y pies de página."
      }
    ],
    "fr": [
      {
        "title": "Importez votre .docx",
        "body": "Documents Word (.docx) — polices, titres, tableaux et images restent en place."
      },
      {
        "title": "Choisissez la langue cible",
        "body": "Plus de 30 langues avec une fluidité IA native."
      },
      {
        "title": "Téléchargez la copie traduite",
        "body": "Même mise en page, chaque paragraphe traduit — y compris les en-têtes et pieds de page."
      }
    ],
    "hi": [
      {
        "title": "अपना .docx अपलोड करें",
        "body": "Word दस्तावेज़ (.docx) — फ़ॉन्ट, हेडिंग, टेबल और इमेज यथावत रहते हैं।"
      },
      {
        "title": "लक्ष्य भाषा चुनें",
        "body": "AI-नेटिव प्रवाह के साथ 30+ भाषाएं।"
      },
      {
        "title": "अनुवादित कॉपी डाउनलोड करें",
        "body": "वही लेआउट, हर पैराग्राफ अनुवादित — हेडर और फुटर भी।"
      }
    ],
    "id": [
      {
        "title": "Unggah .docx kamu",
        "body": "Dokumen Word (.docx) — font, judul, tabel, dan gambar tetap di tempatnya."
      },
      {
        "title": "Pilih bahasa target",
        "body": "30+ bahasa dengan kelancaran berbasis AI."
      },
      {
        "title": "Unduh salinan terjemahan",
        "body": "Tata letak sama, setiap paragraf diterjemahkan — termasuk header dan footer."
      }
    ],
    "it": [
      {
        "title": "Carica il tuo file .docx",
        "body": "Documenti Word (.docx) — font, titoli, tabelle e immagini restano al loro posto."
      },
      {
        "title": "Scegli la lingua di destinazione",
        "body": "Oltre 30 lingue con fluidità nativa dell'AI."
      },
      {
        "title": "Scarica la copia tradotta",
        "body": "Stesso layout, ogni paragrafo tradotto — anche intestazioni e piè di pagina."
      }
    ],
    "ja": [
      {
        "title": ".docx をアップロード",
        "body": "Wordドキュメント（.docx）— フォント・見出し・表・画像もそのまま維持。"
      },
      {
        "title": "翻訳先の言語を選択",
        "body": "AIネイティブな流暢さで30以上の言語に対応。"
      },
      {
        "title": "翻訳済みコピーをダウンロード",
        "body": "レイアウトそのまま、全段落を翻訳。ヘッダー・フッターも含みます。"
      }
    ],
    "ko": [
      {
        "title": ".docx 업로드",
        "body": "Word 문서(.docx) — 글꼴, 제목, 표, 이미지가 그대로 유지됩니다."
      },
      {
        "title": "번역 언어 선택",
        "body": "AI 네이티브 수준의 30개 이상 언어 지원."
      },
      {
        "title": "번역된 파일 다운로드",
        "body": "레이아웃은 그대로, 헤더와 푸터를 포함한 모든 단락이 번역됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload je .docx-bestand",
        "body": "Word-documenten (.docx) — lettertypen, koppen, tabellen en afbeeldingen blijven op hun plek."
      },
      {
        "title": "Kies een doeltaal",
        "body": "30+ talen met AI-native vloeiendheid."
      },
      {
        "title": "Download de vertaalde kopie",
        "body": "Zelfde opmaak, elke alinea vertaald — ook kop- en voetteksten."
      }
    ],
    "pl": [
      {
        "title": "Prześlij plik .docx",
        "body": "Dokumenty Word (.docx) — czcionki, nagłówki, tabele i obrazy pozostają na miejscu."
      },
      {
        "title": "Wybierz język docelowy",
        "body": "30+ języków z natywną płynnością AI."
      },
      {
        "title": "Pobierz przetłumaczoną kopię",
        "body": "Ten sam układ, każdy akapit przetłumaczony — łącznie z nagłówkami i stopkami."
      }
    ],
    "pt": [
      {
        "title": "Carregue o seu .docx",
        "body": "Documentos Word (.docx) — fontes, títulos, tabelas e imagens mantêm-se no lugar."
      },
      {
        "title": "Escolha o idioma de destino",
        "body": "Mais de 30 idiomas com fluência nativa da IA."
      },
      {
        "title": "Baixe a cópia traduzida",
        "body": "Mesmo layout, cada parágrafo traduzido — incluindo cabeçalhos e rodapés."
      }
    ],
    "ru": [
      {
        "title": "Загрузите .docx",
        "body": "Word-документы (.docx) — шрифты, заголовки, таблицы и изображения сохраняются."
      },
      {
        "title": "Выберите язык перевода",
        "body": "30+ языков с нативным качеством перевода на базе ИИ."
      },
      {
        "title": "Скачайте переведённую копию",
        "body": "Тот же макет, каждый абзац переведён — включая верхние и нижние колонтитулы."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din .docx",
        "body": "Word-dokument (.docx) — typsnitt, rubriker, tabeller och bilder förblir på plats."
      },
      {
        "title": "Välj målspråk",
        "body": "30+ språk med AI-native flyt."
      },
      {
        "title": "Ladda ned den översatta kopian",
        "body": "Samma layout, varje stycke översatt — även sidhuvuden och sidfötter."
      }
    ],
    "tr": [
      {
        "title": ".docx dosyanı yükle",
        "body": "Word belgeleri (.docx) — yazı tipleri, başlıklar, tablolar ve görseller yerinde kalır."
      },
      {
        "title": "Hedef dili seç",
        "body": "AI'nin doğal akıcılığıyla 30'dan fazla dil."
      },
      {
        "title": "Çevrilmiş kopyayı indir",
        "body": "Aynı düzen, her paragraf çevrilmiş — üstbilgi ve altbilgiler dahil."
      }
    ],
    "uk": [
      {
        "title": "Завантажте .docx",
        "body": "Документи Word (.docx) — шрифти, заголовки, таблиці та зображення залишаються на місці."
      },
      {
        "title": "Оберіть цільову мову",
        "body": "30+ мов із нативною точністю ШІ."
      },
      {
        "title": "Завантажте перекладену копію",
        "body": "Той самий макет, кожен абзац перекладено — включно із заголовками та нижніми колонтитулами."
      }
    ],
    "vi": [
      {
        "title": "Tải file .docx lên",
        "body": "Tài liệu Word (.docx) — phông chữ, tiêu đề, bảng và ảnh giữ nguyên vị trí."
      },
      {
        "title": "Chọn ngôn ngữ đích",
        "body": "30+ ngôn ngữ với độ lưu loát AI tự nhiên."
      },
      {
        "title": "Tải xuống bản đã dịch",
        "body": "Cùng bố cục, mọi đoạn đều được dịch — kể cả đầu trang và chân trang."
      }
    ],
    "zh": [
      {
        "title": "上传 .docx 文件",
        "body": "Word 文档（.docx），字体、标题、表格和图片的布局完整保留。"
      },
      {
        "title": "选择目标语言",
        "body": "支持 30+ 种语言，AI 翻译流畅自然。"
      },
      {
        "title": "下载翻译副本",
        "body": "版式不变，每个段落均已翻译，包括页眉和页脚。"
      }
    ]
  },
  "translate-subtitles": {
    "ar": [
      {
        "title": "ارفع SRT أو VTT",
        "body": "يُكتشف تلقائيًا لغة المصدر."
      },
      {
        "title": "اختر لغة الهدف",
        "body": "من الإنجليزية والإسبانية إلى اليابانية والعربية."
      },
      {
        "title": "حمّل الملف المترجَم",
        "body": "نفس التوقيت، نص مترجَم. مثالي لإعادة النشر عالميًا."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte SRT nebo VTT",
        "body": "Zdrojový jazyk se detekuje automaticky."
      },
      {
        "title": "Vyberte cílový jazyk",
        "body": "Od angličtiny a španělštiny po japonštinu a arabštinu."
      },
      {
        "title": "Stáhněte přeložený soubor",
        "body": "Stejné časování, přeložený text. Ideální pro celosvětové publikování."
      }
    ],
    "de": [
      {
        "title": "SRT oder VTT hochladen",
        "body": "Die Ausgangssprache wird automatisch erkannt."
      },
      {
        "title": "Zielsprache wählen",
        "body": "Von Englisch und Spanisch bis Japanisch und Arabisch."
      },
      {
        "title": "Übersetzte Datei herunterladen",
        "body": "Gleiche Timings, übersetzter Text. Perfekt für globale Veröffentlichungen."
      }
    ],
    "es": [
      {
        "title": "Sube tu SRT o VTT",
        "body": "El idioma de origen se detecta automáticamente."
      },
      {
        "title": "Elige el idioma de destino",
        "body": "Desde inglés y español hasta japonés y árabe."
      },
      {
        "title": "Descarga el archivo traducido",
        "body": "Mismos tiempos, texto traducido. Ideal para publicar a nivel global."
      }
    ],
    "fr": [
      {
        "title": "Importez un SRT ou VTT",
        "body": "La langue source est détectée automatiquement."
      },
      {
        "title": "Choisissez la langue cible",
        "body": "De l'anglais et l'espagnol au japonais et à l'arabe."
      },
      {
        "title": "Téléchargez le fichier traduit",
        "body": "Même timing, texte traduit. Idéal pour une diffusion internationale."
      }
    ],
    "hi": [
      {
        "title": "SRT या VTT अपलोड करें",
        "body": "स्रोत भाषा अपने आप पहचानी जाती है।"
      },
      {
        "title": "लक्ष्य भाषा चुनें",
        "body": "अंग्रेज़ी और स्पेनिश से लेकर जापानी और अरबी तक।"
      },
      {
        "title": "अनुवादित फ़ाइल डाउनलोड करें",
        "body": "वही टाइमिंग, अनुवादित टेक्स्ट। दुनियाभर में पुनः प्रकाशन के लिए एकदम सही।"
      }
    ],
    "id": [
      {
        "title": "Unggah SRT atau VTT",
        "body": "Bahasa sumber terdeteksi secara otomatis."
      },
      {
        "title": "Pilih bahasa target",
        "body": "Dari Inggris dan Spanyol hingga Jepang dan Arab."
      },
      {
        "title": "Unduh file terjemahan",
        "body": "Waktu tetap sama, teks sudah diterjemahkan. Sempurna untuk distribusi global."
      }
    ],
    "it": [
      {
        "title": "Carica un file SRT o VTT",
        "body": "La lingua di origine viene rilevata automaticamente."
      },
      {
        "title": "Scegli la lingua di destinazione",
        "body": "Dall'inglese allo spagnolo, dal giapponese all'arabo."
      },
      {
        "title": "Scarica il file tradotto",
        "body": "Stesso timing, testo tradotto. Perfetto per pubblicare i tuoi contenuti a livello globale."
      }
    ],
    "ja": [
      {
        "title": "SRT または VTT をアップロード",
        "body": "元の言語は自動検出されます。"
      },
      {
        "title": "翻訳先の言語を選択",
        "body": "英語やスペイン語から日本語・アラビア語まで対応。"
      },
      {
        "title": "翻訳済みファイルをダウンロード",
        "body": "タイミングはそのまま、テキストのみ翻訳。グローバル配信にも最適。"
      }
    ],
    "ko": [
      {
        "title": "SRT 또는 VTT 업로드",
        "body": "원본 언어가 자동으로 감지됩니다."
      },
      {
        "title": "번역 언어 선택",
        "body": "영어, 스페인어부터 일본어, 아랍어까지 다양하게 지원합니다."
      },
      {
        "title": "번역된 파일 다운로드",
        "body": "타이밍은 그대로, 텍스트만 번역됩니다. 글로벌 재배포에 최적화되어 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Upload SRT of VTT",
        "body": "De brontaal wordt automatisch herkend."
      },
      {
        "title": "Kies een doeltaal",
        "body": "Van Engels en Spaans tot Japans en Arabisch."
      },
      {
        "title": "Download het vertaalde bestand",
        "body": "Zelfde timing, vertaalde tekst. Perfect voor wereldwijde heruitgave."
      }
    ],
    "pl": [
      {
        "title": "Prześlij plik SRT lub VTT",
        "body": "Język źródłowy jest wykrywany automatycznie."
      },
      {
        "title": "Wybierz język docelowy",
        "body": "Od angielskiego i hiszpańskiego po japoński i arabski."
      },
      {
        "title": "Pobierz przetłumaczony plik",
        "body": "Te same czasy, przetłumaczony tekst. Idealny do ponownej publikacji na całym świecie."
      }
    ],
    "pt": [
      {
        "title": "Carregue SRT ou VTT",
        "body": "O idioma de origem é detetado automaticamente."
      },
      {
        "title": "Escolha o idioma de destino",
        "body": "De inglês e espanhol a japonês e árabe."
      },
      {
        "title": "Baixe o ficheiro traduzido",
        "body": "Mesma sincronização, texto traduzido. Ideal para publicação global."
      }
    ],
    "ru": [
      {
        "title": "Загрузите SRT или VTT",
        "body": "Язык оригинала определяется автоматически."
      },
      {
        "title": "Выберите язык перевода",
        "body": "От английского и испанского до японского и арабского."
      },
      {
        "title": "Скачайте переведённый файл",
        "body": "Тайминг сохранён, текст переведён. Идеально для публикации на международную аудиторию."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp SRT eller VTT",
        "body": "Källspråket identifieras automatiskt."
      },
      {
        "title": "Välj målspråk",
        "body": "Från engelska och spanska till japanska och arabiska."
      },
      {
        "title": "Ladda ned den översatta filen",
        "body": "Samma timing, översatt text. Perfekt för global publicering."
      }
    ],
    "tr": [
      {
        "title": "SRT veya VTT yükle",
        "body": "Kaynak dil otomatik olarak algılanır."
      },
      {
        "title": "Hedef dili seç",
        "body": "İngilizce ve İspanyolcadan Japonca ve Arapçaya kadar."
      },
      {
        "title": "Çevrilmiş dosyayı indir",
        "body": "Aynı zamanlama, çevrilmiş metin. Küresel yayın için mükemmel."
      }
    ],
    "uk": [
      {
        "title": "Завантажте SRT або VTT",
        "body": "Мова оригіналу визначається автоматично."
      },
      {
        "title": "Оберіть цільову мову",
        "body": "Від англійської та іспанської до японської та арабської."
      },
      {
        "title": "Завантажте перекладений файл",
        "body": "Тайминг незмінний, текст перекладено. Ідеально для публікацій на різних ринках."
      }
    ],
    "vi": [
      {
        "title": "Tải lên file SRT hoặc VTT",
        "body": "Ngôn ngữ nguồn được phát hiện tự động."
      },
      {
        "title": "Chọn ngôn ngữ đích",
        "body": "Từ tiếng Anh, tiếng Tây Ban Nha đến tiếng Nhật và tiếng Ả Rập."
      },
      {
        "title": "Tải xuống file đã dịch",
        "body": "Giữ nguyên mốc thời gian, chỉ dịch nội dung. Lý tưởng để phát hành toàn cầu."
      }
    ],
    "zh": [
      {
        "title": "上传 SRT 或 VTT",
        "body": "自动识别源语言，无需手动选择。"
      },
      {
        "title": "选择目标语言",
        "body": "涵盖英语、西班牙语、日语、阿拉伯语等众多语言。"
      },
      {
        "title": "下载翻译后的文件",
        "body": "时间轴不变，文本已翻译，轻松面向全球发布。"
      }
    ]
  },
  "url-encode": {
    "ar": [
      {
        "title": "اختر الترميز أو فكّ الترميز",
        "body": "بدّل بين الوضعين."
      },
      {
        "title": "الصق الرابط أو النص",
        "body": "المسافات والنبرات والرموز تُعالَج بصحة."
      },
      {
        "title": "انسخ النتيجة",
        "body": "جاهزة للإدراج في رابط أو استدعاء API."
      }
    ],
    "cs": [
      {
        "title": "Zvolte kódování nebo dekódování",
        "body": "Přepínejte mezi oběma režimy."
      },
      {
        "title": "Vložte URL nebo text",
        "body": "Mezery, háčky, čárky a symboly jsou zpracovány správně."
      },
      {
        "title": "Zkopírujte výsledek",
        "body": "Připraveno k vložení do odkazu nebo API volání."
      }
    ],
    "de": [
      {
        "title": "Kodieren oder dekodieren wählen",
        "body": "Zwischen beiden Modi umschalten."
      },
      {
        "title": "URL oder Text einfügen",
        "body": "Leerzeichen, Akzente und Sonderzeichen werden korrekt behandelt."
      },
      {
        "title": "Ergebnis kopieren",
        "body": "Direkt in einen Link oder API-Aufruf einfügen."
      }
    ],
    "es": [
      {
        "title": "Elige codificar o decodificar",
        "body": "Alterna entre los dos modos."
      },
      {
        "title": "Pega tu URL o texto",
        "body": "Espacios, acentos y símbolos tratados correctamente."
      },
      {
        "title": "Copia el resultado",
        "body": "Listo para añadir a un enlace o llamada a la API."
      }
    ],
    "fr": [
      {
        "title": "Choisissez encodage ou décodage",
        "body": "Basculez entre les deux modes."
      },
      {
        "title": "Collez votre URL ou texte",
        "body": "Espaces, accents et symboles correctement traités."
      },
      {
        "title": "Copiez le résultat",
        "body": "Prêt à intégrer dans un lien ou un appel API."
      }
    ],
    "hi": [
      {
        "title": "एनकोड या डीकोड चुनें",
        "body": "दोनों मोड के बीच टॉगल करें।"
      },
      {
        "title": "अपना URL या टेक्स्ट पेस्ट करें",
        "body": "स्पेस, एक्सेंट और सिंबल सही तरीके से हैंडल होते हैं।"
      },
      {
        "title": "परिणाम कॉपी करें",
        "body": "किसी लिंक या API कॉल में डालने के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Pilih enkode atau dekode",
        "body": "Beralih antara dua mode."
      },
      {
        "title": "Tempel URL atau teks kamu",
        "body": "Spasi, aksen, dan simbol ditangani dengan benar."
      },
      {
        "title": "Salin hasilnya",
        "body": "Siap ditempelkan ke tautan atau panggilan API."
      }
    ],
    "it": [
      {
        "title": "Scegli codifica o decodifica",
        "body": "Passa da una modalità all'altra con un clic."
      },
      {
        "title": "Incolla il tuo URL o testo",
        "body": "Spazi, accenti e simboli gestiti correttamente."
      },
      {
        "title": "Copia il risultato",
        "body": "Pronto da inserire in un link o in una chiamata API."
      }
    ],
    "ja": [
      {
        "title": "エンコードまたはデコードを選択",
        "body": "2つのモードを切り替えられます。"
      },
      {
        "title": "URLまたはテキストをペースト",
        "body": "スペース・アクセント記号・特殊文字も正しく処理。"
      },
      {
        "title": "結果をコピー",
        "body": "リンクや API コールにそのまま使えます。"
      }
    ],
    "ko": [
      {
        "title": "인코딩 또는 디코딩 선택",
        "body": "두 모드를 전환하세요."
      },
      {
        "title": "URL 또는 텍스트 붙여넣기",
        "body": "공백, 악센트 문자, 특수 기호가 올바르게 처리됩니다."
      },
      {
        "title": "결과 복사",
        "body": "링크나 API 호출에 바로 사용할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Kies coderen of decoderen",
        "body": "Schakel tussen de twee modi."
      },
      {
        "title": "Plak je URL of tekst",
        "body": "Spaties, accenten en symbolen worden correct verwerkt."
      },
      {
        "title": "Kopieer het resultaat",
        "body": "Klaar om in een link of API-aanroep te plakken."
      }
    ],
    "pl": [
      {
        "title": "Wybierz kodowanie lub dekodowanie",
        "body": "Przełączaj między dwoma trybami."
      },
      {
        "title": "Wklej adres URL lub tekst",
        "body": "Spacje, akcenty i symbole obsługiwane poprawnie."
      },
      {
        "title": "Skopiuj wynik",
        "body": "Gotowy do wstawienia w link lub wywołanie API."
      }
    ],
    "pt": [
      {
        "title": "Escolha codificar ou descodificar",
        "body": "Alterne entre os dois modos."
      },
      {
        "title": "Cole o URL ou texto",
        "body": "Espaços, acentos e símbolos tratados corretamente."
      },
      {
        "title": "Copie o resultado",
        "body": "Pronto para inserir num link ou numa chamada API."
      }
    ],
    "ru": [
      {
        "title": "Выберите кодирование или декодирование",
        "body": "Переключайтесь между двумя режимами."
      },
      {
        "title": "Вставьте URL или текст",
        "body": "Пробелы, акценты и спецсимволы обрабатываются корректно."
      },
      {
        "title": "Скопируйте результат",
        "body": "Готово для вставки в ссылку или вызов API."
      }
    ],
    "sv": [
      {
        "title": "Välj koda eller avkoda",
        "body": "Växla mellan de två lägena."
      },
      {
        "title": "Klistra in din URL eller text",
        "body": "Mellanslag, accenter och symboler hanteras korrekt."
      },
      {
        "title": "Kopiera resultatet",
        "body": "Redo att lägga i en länk eller API-anrop."
      }
    ],
    "tr": [
      {
        "title": "Kodla veya çöz seçeneğini seç",
        "body": "İki mod arasında geçiş yap."
      },
      {
        "title": "URL veya metnini yapıştır",
        "body": "Boşluklar, aksanlar ve semboller doğru şekilde işlenir."
      },
      {
        "title": "Sonucu kopyala",
        "body": "Bir bağlantıya veya API çağrısına yapıştırmaya hazır."
      }
    ],
    "uk": [
      {
        "title": "Оберіть кодування або декодування",
        "body": "Перемикайтесь між режимами."
      },
      {
        "title": "Вставте URL або текст",
        "body": "Пробіли, наголоси та спецсимволи обробляються правильно."
      },
      {
        "title": "Скопіюйте результат",
        "body": "Готово для посилань або API-викликів."
      }
    ],
    "vi": [
      {
        "title": "Chọn mã hóa hoặc giải mã",
        "body": "Chuyển đổi giữa hai chế độ dễ dàng."
      },
      {
        "title": "Dán URL hoặc văn bản",
        "body": "Khoảng trắng, dấu trọng âm và ký hiệu đều được xử lý đúng."
      },
      {
        "title": "Sao chép kết quả",
        "body": "Sẵn sàng dùng trong liên kết hoặc lệnh gọi API."
      }
    ],
    "zh": [
      {
        "title": "选择编码或解码",
        "body": "在两种模式之间切换。"
      },
      {
        "title": "粘贴 URL 或文本",
        "body": "空格、重音符号和特殊字符均正确处理。"
      },
      {
        "title": "复制结果",
        "body": "可直接用于链接或 API 调用。"
      }
    ]
  },
  "url-shortener": {
    "ar": [
      {
        "title": "الصق رابطًا طويلًا",
        "body": "أي رابط http(s) تريد اختصاره."
      },
      {
        "title": "نفحصه",
        "body": "يتحقق Google Safe Browsing من التصيّد والبرمجيات الخبيثة."
      },
      {
        "title": "انسخ رابطك القصير",
        "body": "اختياريًا اختر اسمًا مستعارًا مخصصًا."
      }
    ],
    "cs": [
      {
        "title": "Vložte dlouhou URL",
        "body": "Libovolný http(s) odkaz, který chcete zkrátit."
      },
      {
        "title": "Zkontrolujeme ji",
        "body": "Google Safe Browsing prohledá phishing a malware."
      },
      {
        "title": "Zkopírujte krátký odkaz",
        "body": "Volitelně zadejte vlastní alias."
      }
    ],
    "de": [
      {
        "title": "Lange URL einfügen",
        "body": "Jeden http(s)-Link, den du kürzen möchtest."
      },
      {
        "title": "Wir prüfen ihn",
        "body": "Google Safe Browsing überprüft auf Phishing und Malware."
      },
      {
        "title": "Kurzen Link kopieren",
        "body": "Optional einen eigenen Alias vergeben."
      }
    ],
    "es": [
      {
        "title": "Pega una URL larga",
        "body": "Cualquier enlace http(s) que quieras acortar."
      },
      {
        "title": "La verificamos",
        "body": "Google Safe Browsing comprueba si hay phishing o malware."
      },
      {
        "title": "Copia tu enlace corto",
        "body": "Opcionalmente, elige un alias personalizado."
      }
    ],
    "fr": [
      {
        "title": "Collez une URL longue",
        "body": "N'importe quel lien http(s) à raccourcir."
      },
      {
        "title": "Nous la vérifions",
        "body": "Google Safe Browsing contrôle le phishing et les logiciels malveillants."
      },
      {
        "title": "Copiez votre lien court",
        "body": "Choisissez éventuellement un alias personnalisé."
      }
    ],
    "hi": [
      {
        "title": "लंबा URL पेस्ट करें",
        "body": "कोई भी http(s) लिंक जिसे आप छोटा करना चाहते हैं।"
      },
      {
        "title": "हम इसे जांचते हैं",
        "body": "Google Safe Browsing फिशिंग और मैलवेयर के लिए चेक करता है।"
      },
      {
        "title": "अपना शॉर्ट लिंक कॉपी करें",
        "body": "वैकल्पिक रूप से एक कस्टम उपनाम चुनें।"
      }
    ],
    "id": [
      {
        "title": "Tempel URL panjang",
        "body": "Tautan http(s) apa pun yang ingin dipersingkat."
      },
      {
        "title": "Kami memverifikasinya",
        "body": "Google Safe Browsing memeriksa phishing dan malware."
      },
      {
        "title": "Salin tautan pendekmu",
        "body": "Opsional, pilih alias kustom."
      }
    ],
    "it": [
      {
        "title": "Incolla un URL lungo",
        "body": "Qualsiasi link http(s) che vuoi accorciare."
      },
      {
        "title": "Lo verifichiamo",
        "body": "Google Safe Browsing lo controlla per phishing e malware."
      },
      {
        "title": "Copia il tuo link corto",
        "body": "Facoltativamente, scegli un alias personalizzato."
      }
    ],
    "ja": [
      {
        "title": "長いURLをペースト",
        "body": "短縮したい http(s) リンクを入力。"
      },
      {
        "title": "安全性をチェック",
        "body": "Google セーフブラウジングでフィッシング・マルウェアを確認。"
      },
      {
        "title": "短縮リンクをコピー",
        "body": "任意でカスタムエイリアスも設定可能。"
      }
    ],
    "ko": [
      {
        "title": "긴 URL 붙여넣기",
        "body": "단축하고 싶은 http(s) 링크."
      },
      {
        "title": "안전 검사",
        "body": "Google Safe Browsing으로 피싱 및 악성코드를 확인합니다."
      },
      {
        "title": "단축 링크 복사",
        "body": "원하면 사용자 지정 별칭도 설정할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak een lange URL",
        "body": "Elke http(s)-link die je wilt verkorten."
      },
      {
        "title": "We controleren hem",
        "body": "Google Safe Browsing scant op phishing en malware."
      },
      {
        "title": "Kopieer je korte link",
        "body": "Optioneel een eigen alias kiezen."
      }
    ],
    "pl": [
      {
        "title": "Wklej długi adres URL",
        "body": "Dowolny link http(s), który chcesz skrócić."
      },
      {
        "title": "Sprawdzamy go",
        "body": "Google Safe Browsing weryfikuje pod kątem phishingu i złośliwego oprogramowania."
      },
      {
        "title": "Skopiuj skrócony link",
        "body": "Opcjonalnie wybierz własny alias."
      }
    ],
    "pt": [
      {
        "title": "Cole um URL longo",
        "body": "Qualquer link http(s) que queira encurtar."
      },
      {
        "title": "Verificamos a segurança",
        "body": "O Google Safe Browsing deteta phishing e malware."
      },
      {
        "title": "Copie o link curto",
        "body": "Opcionalmente, escolha um alias personalizado."
      }
    ],
    "ru": [
      {
        "title": "Вставьте длинный URL",
        "body": "Любая http(s)-ссылка, которую нужно сократить."
      },
      {
        "title": "Проверяем безопасность",
        "body": "Google Safe Browsing проверяет на фишинг и вредоносное ПО."
      },
      {
        "title": "Скопируйте короткую ссылку",
        "body": "При желании задайте собственный псевдоним."
      }
    ],
    "sv": [
      {
        "title": "Klistra in en lång URL",
        "body": "Vilken http(s)-länk du än vill förkorta."
      },
      {
        "title": "Vi granskar den",
        "body": "Google Safe Browsing kontrollerar för nätfiske och skadlig kod."
      },
      {
        "title": "Kopiera din kortlänk",
        "body": "Välj eventuellt ett eget alias."
      }
    ],
    "tr": [
      {
        "title": "Uzun URL yapıştır",
        "body": "Kısaltmak istediğin herhangi bir http(s) bağlantısı."
      },
      {
        "title": "Tarıyoruz",
        "body": "Google Güvenli Tarama, kimlik avı ve kötü amaçlı yazılımlara karşı kontrol eder."
      },
      {
        "title": "Kısa bağlantını kopyala",
        "body": "İsteğe bağlı olarak özel bir takma ad seç."
      }
    ],
    "uk": [
      {
        "title": "Вставте довге посилання",
        "body": "Будь-яке http(s) посилання, яке потрібно скоротити."
      },
      {
        "title": "Ми перевіряємо його",
        "body": "Google Safe Browsing виявляє фішинг і шкідливий контент."
      },
      {
        "title": "Скопіюйте коротке посилання",
        "body": "За бажанням задайте власний псевдонім."
      }
    ],
    "vi": [
      {
        "title": "Dán URL dài vào đây",
        "body": "Bất kỳ liên kết http(s) nào bạn muốn rút gọn."
      },
      {
        "title": "Chúng tôi kiểm tra an toàn",
        "body": "Google Safe Browsing kiểm tra phishing và mã độc."
      },
      {
        "title": "Sao chép liên kết ngắn",
        "body": "Tuỳ chọn đặt tên alias riêng."
      }
    ],
    "zh": [
      {
        "title": "粘贴长网址",
        "body": "任意需要缩短的 http(s) 链接。"
      },
      {
        "title": "安全检测",
        "body": "通过 Google Safe Browsing 检查钓鱼和恶意软件。"
      },
      {
        "title": "复制短链接",
        "body": "可选择设置自定义别名。"
      }
    ]
  },
  "video-thumbnail": {
    "ar": [
      {
        "title": "ارفع فيديو",
        "body": "MP4 أو MOV أو WebM أو MKV — يبقى على جهازك."
      },
      {
        "title": "تصفّح أو اختر اقتراحًا",
        "body": "نولّد تلقائيًا 6 إطارات مرشّحة."
      },
      {
        "title": "حمّل الإطار",
        "body": "PNG بالدقة الأصلية للفيديو."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte video",
        "body": "MP4, MOV, WebM nebo MKV — zůstane na vašem zařízení."
      },
      {
        "title": "Procházejte nebo vyberte návrh",
        "body": "Automaticky vygenerujeme 6 kandidátních snímků."
      },
      {
        "title": "Stáhněte snímek",
        "body": "PNG v nativním rozlišení videa."
      }
    ],
    "de": [
      {
        "title": "Video hochladen",
        "body": "MP4, MOV, WebM oder MKV — bleibt auf deinem Gerät."
      },
      {
        "title": "Scrubben oder Vorschlag wählen",
        "body": "Wir generieren automatisch 6 Kandidaten-Frames."
      },
      {
        "title": "Frame herunterladen",
        "body": "PNG in der nativen Auflösung des Videos."
      }
    ],
    "es": [
      {
        "title": "Sube un vídeo",
        "body": "MP4, MOV, WebM o MKV — se queda en tu dispositivo."
      },
      {
        "title": "Navega o elige una sugerencia",
        "body": "Generamos automáticamente 6 fotogramas candidatos."
      },
      {
        "title": "Descarga el fotograma",
        "body": "PNG a la resolución nativa del vídeo."
      }
    ],
    "fr": [
      {
        "title": "Importez une vidéo",
        "body": "MP4, MOV, WebM ou MKV — reste sur votre appareil."
      },
      {
        "title": "Parcourez ou choisissez une suggestion",
        "body": "Nous générons automatiquement 6 images candidates."
      },
      {
        "title": "Téléchargez l'image",
        "body": "PNG à la résolution native de la vidéo."
      }
    ],
    "hi": [
      {
        "title": "वीडियो अपलोड करें",
        "body": "MP4, MOV, WebM या MKV — आपके डिवाइस पर रहता है।"
      },
      {
        "title": "स्क्रब करें या सुझाव चुनें",
        "body": "हम 6 कैंडिडेट फ्रेम ऑटो-जेनरेट करते हैं।"
      },
      {
        "title": "फ्रेम डाउनलोड करें",
        "body": "वीडियो के नेटिव रेज़ॉल्यूशन पर PNG।"
      }
    ],
    "id": [
      {
        "title": "Unggah video",
        "body": "MP4, MOV, WebM, atau MKV — tetap di perangkatmu."
      },
      {
        "title": "Geser atau pilih saran",
        "body": "Kami menghasilkan 6 frame kandidat secara otomatis."
      },
      {
        "title": "Unduh frame",
        "body": "PNG dengan resolusi asli video."
      }
    ],
    "it": [
      {
        "title": "Carica un video",
        "body": "MP4, MOV, WebM o MKV — rimane sul tuo dispositivo."
      },
      {
        "title": "Scorri la timeline o scegli un suggerimento",
        "body": "Generiamo automaticamente 6 frame candidati."
      },
      {
        "title": "Scarica il frame",
        "body": "PNG alla risoluzione nativa del video."
      }
    ],
    "ja": [
      {
        "title": "動画をアップロード",
        "body": "MP4、MOV、WebM または MKV。デバイス上に保持されます。"
      },
      {
        "title": "スクラブまたは候補を選択",
        "body": "6つの候補フレームを自動生成。"
      },
      {
        "title": "フレームをダウンロード",
        "body": "動画のネイティブ解像度の PNG。"
      }
    ],
    "ko": [
      {
        "title": "동영상 업로드",
        "body": "MP4, MOV, WebM 또는 MKV — 기기에 머무릅니다."
      },
      {
        "title": "스크럽 또는 추천 프레임 선택",
        "body": "6개의 후보 프레임이 자동으로 생성됩니다."
      },
      {
        "title": "프레임 다운로드",
        "body": "동영상 원본 해상도의 PNG."
      }
    ],
    "nl": [
      {
        "title": "Upload een video",
        "body": "MP4, MOV, WebM of MKV — blijft op je apparaat."
      },
      {
        "title": "Scrubbe of kies een suggestie",
        "body": "We genereren automatisch 6 kandidaat-frames."
      },
      {
        "title": "Download het frame",
        "body": "PNG op de oorspronkelijke resolutie van de video."
      }
    ],
    "pl": [
      {
        "title": "Prześlij wideo",
        "body": "MP4, MOV, WebM lub MKV — zostaje na Twoim urządzeniu."
      },
      {
        "title": "Przewijaj lub wybierz sugestię",
        "body": "Automatycznie generujemy 6 propozycji klatek."
      },
      {
        "title": "Pobierz klatkę",
        "body": "PNG w natywnej rozdzielczości wideo."
      }
    ],
    "pt": [
      {
        "title": "Carregue um vídeo",
        "body": "MP4, MOV, WebM ou MKV — fica no seu dispositivo."
      },
      {
        "title": "Navegue ou escolha uma sugestão",
        "body": "Geramos automaticamente 6 frames candidatos."
      },
      {
        "title": "Baixe o frame",
        "body": "PNG na resolução nativa do vídeo."
      }
    ],
    "ru": [
      {
        "title": "Загрузите видео",
        "body": "MP4, MOV, WebM или MKV — остаётся на вашем устройстве."
      },
      {
        "title": "Прокрутите или выберите из вариантов",
        "body": "Автоматически генерируются 6 кадров-кандидатов."
      },
      {
        "title": "Скачайте кадр",
        "body": "PNG в нативном разрешении видео."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp en video",
        "body": "MP4, MOV, WebM eller MKV — stannar på din enhet."
      },
      {
        "title": "Skrubba eller välj ett förslag",
        "body": "Vi genererar automatiskt 6 kandidatbildrutor."
      },
      {
        "title": "Ladda ned bildrutan",
        "body": "PNG i videons ursprungliga upplösning."
      }
    ],
    "tr": [
      {
        "title": "Video yükle",
        "body": "MP4, MOV, WebM veya MKV — cihazında kalır."
      },
      {
        "title": "Gezin veya öneri seç",
        "body": "Otomatik olarak 6 aday kare oluşturuyoruz."
      },
      {
        "title": "Kareyi indir",
        "body": "Videonun orijinal çözünürlüğünde PNG."
      }
    ],
    "uk": [
      {
        "title": "Завантажте відео",
        "body": "MP4, MOV, WebM або MKV — залишається на пристрої."
      },
      {
        "title": "Перемотайте або оберіть кадр",
        "body": "Ми автоматично генеруємо 6 кадрів-кандидатів."
      },
      {
        "title": "Завантажте кадр",
        "body": "PNG у рідній роздільній здатності відео."
      }
    ],
    "vi": [
      {
        "title": "Tải video lên",
        "body": "MP4, MOV, WebM hoặc MKV — ở lại trên thiết bị của bạn."
      },
      {
        "title": "Tua hoặc chọn gợi ý",
        "body": "Chúng tôi tự động tạo 6 khung hình đề xuất."
      },
      {
        "title": "Tải xuống khung hình",
        "body": "PNG ở độ phân giải gốc của video."
      }
    ],
    "zh": [
      {
        "title": "上传视频",
        "body": "支持 MP4、MOV、WebM 或 MKV，文件保留在本地设备。"
      },
      {
        "title": "手动拖拽或选择推荐帧",
        "body": "自动生成 6 个候选帧供选择。"
      },
      {
        "title": "下载帧图片",
        "body": "以视频原始分辨率输出 PNG。"
      }
    ]
  },
  "voice-to-text": {
    "ar": [
      {
        "title": "ارفع صوتًا أو فيديو",
        "body": "MP3 وWAV وM4A وMP4 وMOV وغيرها — حتى 100 MB مجانًا."
      },
      {
        "title": "الذكاء الاصطناعي ينسخه",
        "body": "نسخ دقيق بأكثر من 30 لغة مع فواصل الفقرات."
      },
      {
        "title": "حرّر أو انسخ أو حمّل",
        "body": "نص قابل للتحرير ونظيف — انسخه أو احفظه كـ .txt."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte audio nebo video",
        "body": "MP3, WAV, M4A, MP4, MOV a další — až 100 MB zdarma."
      },
      {
        "title": "AI přepíše obsah",
        "body": "Přesný přepis ve 30+ jazycích s odstavci."
      },
      {
        "title": "Upravujte, kopírujte nebo stahujte",
        "body": "Čistý upravitelný text — zkopírujte nebo uložte jako .txt."
      }
    ],
    "de": [
      {
        "title": "Audio oder Video hochladen",
        "body": "MP3, WAV, M4A, MP4, MOV und mehr — bis zu 100 MB kostenlos."
      },
      {
        "title": "KI transkribiert es",
        "body": "Präzise Transkription in 30+ Sprachen mit Absatzumbrüchen."
      },
      {
        "title": "Bearbeiten, kopieren oder herunterladen",
        "body": "Ordentlicher, bearbeitbarer Text — kopieren oder als .txt speichern."
      }
    ],
    "es": [
      {
        "title": "Sube audio o vídeo",
        "body": "MP3, WAV, M4A, MP4, MOV y más — hasta 100 MB gratis."
      },
      {
        "title": "La IA lo transcribe",
        "body": "Transcripción precisa en más de 30 idiomas, con saltos de párrafo."
      },
      {
        "title": "Edita, copia o descarga",
        "body": "Texto editable y limpio — cópialo o guárdalo como .txt."
      }
    ],
    "fr": [
      {
        "title": "Importez un audio ou une vidéo",
        "body": "MP3, WAV, M4A, MP4, MOV et plus — jusqu'à 100 Mo gratuitement."
      },
      {
        "title": "L'IA transcrit",
        "body": "Transcription précise dans 30+ langues, avec sauts de paragraphes."
      },
      {
        "title": "Modifiez, copiez ou téléchargez",
        "body": "Texte éditable et propre — copiez-le ou sauvegardez en .txt."
      }
    ],
    "hi": [
      {
        "title": "ऑडियो या वीडियो अपलोड करें",
        "body": "MP3, WAV, M4A, MP4, MOV और अधिक — 100 MB तक मुफ्त।"
      },
      {
        "title": "AI ट्रांसक्राइब करता है",
        "body": "पैराग्राफ ब्रेक के साथ 30+ भाषाओं में सटीक ट्रांसक्रिप्शन।"
      },
      {
        "title": "एडिट, कॉपी या डाउनलोड करें",
        "body": "साफ़ एडिट करने योग्य टेक्स्ट — कॉपी करें या .txt सेव करें।"
      }
    ],
    "id": [
      {
        "title": "Unggah audio atau video",
        "body": "MP3, WAV, M4A, MP4, MOV, dan lainnya — hingga 100 MB gratis."
      },
      {
        "title": "AI mentranskrip",
        "body": "Transkripsi akurat dalam 30+ bahasa, dengan jeda paragraf."
      },
      {
        "title": "Edit, salin, atau unduh",
        "body": "Teks yang rapi dan bisa diedit — salin atau simpan sebagai .txt."
      }
    ],
    "it": [
      {
        "title": "Carica audio o video",
        "body": "MP3, WAV, M4A, MP4, MOV e altri — fino a 100 MB gratuitamente."
      },
      {
        "title": "L'AI trascrive",
        "body": "Trascrizione accurata in 30+ lingue, con interruzioni di paragrafo."
      },
      {
        "title": "Modifica, copia o scarica",
        "body": "Testo modificabile e ordinato — copialo o salva un file .txt."
      }
    ],
    "ja": [
      {
        "title": "音声または動画をアップロード",
        "body": "MP3、WAV、M4A、MP4、MOV など — 最大100MBまで無料。"
      },
      {
        "title": "AIが書き起こす",
        "body": "30以上の言語に対応した高精度な書き起こし。段落区切りあり。"
      },
      {
        "title": "編集・コピー・ダウンロード",
        "body": "編集可能なテキスト — コピーまたは .txt として保存。"
      }
    ],
    "ko": [
      {
        "title": "오디오 또는 동영상 업로드",
        "body": "MP3, WAV, M4A, MP4, MOV 등 — 무료로 최대 100 MB."
      },
      {
        "title": "AI가 텍스트로 변환합니다",
        "body": "30개 이상의 언어로 단락 구분이 포함된 정확한 변환."
      },
      {
        "title": "편집, 복사 또는 다운로드",
        "body": "편집 가능한 깔끔한 텍스트 — 복사하거나 .txt로 저장하세요."
      }
    ],
    "nl": [
      {
        "title": "Upload audio of video",
        "body": "MP3, WAV, M4A, MP4, MOV en meer — tot 100 MB gratis."
      },
      {
        "title": "AI transcribeert het",
        "body": "Nauwkeurige transcriptie in 30+ talen, met alinea-opmaak."
      },
      {
        "title": "Bewerken, kopiëren of downloaden",
        "body": "Nette bewerkbare tekst — kopieer hem of sla op als .txt."
      }
    ],
    "pl": [
      {
        "title": "Prześlij audio lub wideo",
        "body": "MP3, WAV, M4A, MP4, MOV i więcej — do 100 MB za darmo."
      },
      {
        "title": "AI transkrybuje",
        "body": "Dokładna transkrypcja w 30+ językach, z podziałem na akapity."
      },
      {
        "title": "Edytuj, kopiuj lub pobierz",
        "body": "Schludny edytowalny tekst — skopiuj lub zapisz jako plik .txt."
      }
    ],
    "pt": [
      {
        "title": "Carregue áudio ou vídeo",
        "body": "MP3, WAV, M4A, MP4, MOV e mais — até 100 MB grátis."
      },
      {
        "title": "A IA transcreve",
        "body": "Transcrição precisa em 30+ idiomas, com quebras de parágrafo."
      },
      {
        "title": "Edite, copie ou baixe",
        "body": "Texto editável e organizado — copie ou guarde um .txt."
      }
    ],
    "ru": [
      {
        "title": "Загрузите аудио или видео",
        "body": "MP3, WAV, M4A, MP4, MOV и другие — до 100 МБ бесплатно."
      },
      {
        "title": "ИИ транскрибирует",
        "body": "Точная транскрипция на 30+ языках с разбивкой на абзацы."
      },
      {
        "title": "Редактируйте, копируйте или скачивайте",
        "body": "Аккуратный редактируемый текст — скопируйте или сохраните как .txt."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp ljud eller video",
        "body": "MP3, WAV, M4A, MP4, MOV och fler — upp till 100 MB gratis."
      },
      {
        "title": "AI transkriberar det",
        "body": "Noggrann transkription på 30+ språk, med styckesbrytningar."
      },
      {
        "title": "Redigera, kopiera eller ladda ned",
        "body": "Snygg redigerbar text — kopiera eller spara som .txt."
      }
    ],
    "tr": [
      {
        "title": "Ses veya video yükle",
        "body": "MP3, WAV, M4A, MP4, MOV ve daha fazlası — ücretsiz olarak 100 MB'a kadar."
      },
      {
        "title": "AI metne dönüştürüyor",
        "body": "30'dan fazla dilde paragraf aralarıyla doğru transkripsiyon."
      },
      {
        "title": "Düzenle, kopyala veya indir",
        "body": "Düzenlenebilir temiz metin — kopyala veya .txt olarak kaydet."
      }
    ],
    "uk": [
      {
        "title": "Завантажте аудіо або відео",
        "body": "MP3, WAV, M4A, MP4, MOV та інші — до 100 МБ безкоштовно."
      },
      {
        "title": "ШІ транскрибує",
        "body": "Точна транскрипція на 30+ мовах із розбивкою на абзаци."
      },
      {
        "title": "Редагуйте, копіюйте або завантажте",
        "body": "Чистий текст для редагування — скопіюйте або збережіть як .txt."
      }
    ],
    "vi": [
      {
        "title": "Tải lên audio hoặc video",
        "body": "MP3, WAV, M4A, MP4, MOV và nhiều định dạng khác — miễn phí đến 100 MB."
      },
      {
        "title": "AI phiên âm nội dung",
        "body": "Phiên âm chính xác trong 30+ ngôn ngữ, có ngắt đoạn."
      },
      {
        "title": "Chỉnh sửa, sao chép hoặc tải xuống",
        "body": "Văn bản sạch có thể chỉnh sửa — sao chép hoặc lưu file .txt."
      }
    ],
    "zh": [
      {
        "title": "上传音频或视频",
        "body": "支持 MP3、WAV、M4A、MP4、MOV 等格式，免费版最大 100 MB。"
      },
      {
        "title": "AI 转录",
        "body": "支持 30+ 种语言，精准转录并自动划分段落。"
      },
      {
        "title": "编辑、复制或下载",
        "body": "整洁可编辑的文本，复制或保存为 .txt 文件。"
      }
    ]
  },
  "vtt-to-srt": {
    "ar": [
      {
        "title": "أسقط ملف .vtt",
        "body": "أو الصق إشارات WebVTT مباشرةً في المحرر."
      },
      {
        "title": "تحويل فوري",
        "body": "تُنظَّف الترويسات والتنسيقات ومعرّفات الإشارات تلقائيًا."
      },
      {
        "title": "حمّل .srt",
        "body": "جاهز لـ Premiere وDaVinci وYouTube — وأي مكان آخر."
      }
    ],
    "cs": [
      {
        "title": "Přetáhněte soubor .vtt",
        "body": "Nebo vložte WebVTT stopy přímo do editoru."
      },
      {
        "title": "Okamžitá konverze",
        "body": "Záhlaví, styly a identifikátory stop se automaticky upraví."
      },
      {
        "title": "Stáhněte .srt",
        "body": "Připraveno pro Premiere, DaVinci, YouTube — kamkoli."
      }
    ],
    "de": [
      {
        "title": ".vtt-Datei ablegen",
        "body": "Oder WebVTT-Cues direkt in den Editor einfügen."
      },
      {
        "title": "Sofort konvertieren",
        "body": "Header, Styling und Cue-Bezeichner werden automatisch bereinigt."
      },
      {
        "title": ".srt herunterladen",
        "body": "Sofort einsatzbereit — für Premiere, DaVinci, YouTube und überall sonst."
      }
    ],
    "es": [
      {
        "title": "Arrastra tu archivo .vtt",
        "body": "O pega las pistas WebVTT directamente en el editor."
      },
      {
        "title": "Conversión instantánea",
        "body": "Cabeceras, estilos e identificadores de pista se limpian automáticamente."
      },
      {
        "title": "Descarga el .srt",
        "body": "Listo para Premiere, DaVinci, YouTube — donde lo necesites."
      }
    ],
    "fr": [
      {
        "title": "Déposez votre fichier .vtt",
        "body": "Ou collez les répliques WebVTT directement dans l'éditeur."
      },
      {
        "title": "Conversion instantanée",
        "body": "Les en-têtes, styles et identifiants de répliques sont nettoyés automatiquement."
      },
      {
        "title": "Téléchargez le .srt",
        "body": "Prêt pour Premiere, DaVinci, YouTube — où vous voulez."
      }
    ],
    "hi": [
      {
        "title": "अपनी .vtt फ़ाइल डालें",
        "body": "या WebVTT क्यूज़ सीधे एडिटर में पेस्ट करें।"
      },
      {
        "title": "तुरंत कन्वर्ज़न",
        "body": "हेडर, स्टाइलिंग और क्यू आइडेंटिफायर अपने आप साफ़ हो जाते हैं।"
      },
      {
        "title": ".srt डाउनलोड करें",
        "body": "Premiere, DaVinci, YouTube — कहीं भी उपयोग करें।"
      }
    ],
    "id": [
      {
        "title": "Seret file .vtt kamu",
        "body": "Atau tempel cue WebVTT langsung ke editor."
      },
      {
        "title": "Konversi instan",
        "body": "Header, gaya, dan pengenal cue dibersihkan secara otomatis."
      },
      {
        "title": "Unduh .srt",
        "body": "Siap untuk Premiere, DaVinci, YouTube — di mana saja."
      }
    ],
    "it": [
      {
        "title": "Trascina il tuo file .vtt",
        "body": "Oppure incolla le cue WebVTT direttamente nell'editor."
      },
      {
        "title": "Conversione istantanea",
        "body": "Header, stili e identificatori delle cue vengono eliminati automaticamente."
      },
      {
        "title": "Scarica il file .srt",
        "body": "Pronto per Premiere, DaVinci, YouTube — ovunque."
      }
    ],
    "ja": [
      {
        "title": ".vtt ファイルをドロップ",
        "body": "またはエディタに WebVTT のキューを直接ペースト。"
      },
      {
        "title": "即座に変換",
        "body": "ヘッダー・スタイル・キューIDは自動的に整理されます。"
      },
      {
        "title": ".srt をダウンロード",
        "body": "Premiere、DaVinci、YouTube ほかどこでも使えます。"
      }
    ],
    "ko": [
      {
        "title": ".vtt 파일 드롭",
        "body": "또는 WebVTT 큐를 편집기에 직접 붙여넣기 하세요."
      },
      {
        "title": "즉시 변환",
        "body": "헤더, 스타일링, 큐 식별자가 자동으로 정리됩니다."
      },
      {
        "title": ".srt 다운로드",
        "body": "Premiere, DaVinci, YouTube 등 어디서나 사용할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Sleep je .vtt-bestand hierheen",
        "body": "Of plak WebVTT-cues rechtstreeks in de editor."
      },
      {
        "title": "Directe conversie",
        "body": "Headers, opmaak en cue-id's worden automatisch opgeschoond."
      },
      {
        "title": "Download .srt",
        "body": "Klaar voor Premiere, DaVinci, YouTube — overal."
      }
    ],
    "pl": [
      {
        "title": "Upuść plik .vtt",
        "body": "Albo wklej wskazówki WebVTT bezpośrednio do edytora."
      },
      {
        "title": "Błyskawiczna konwersja",
        "body": "Nagłówki, style i identyfikatory wskazówek są automatycznie porządkowane."
      },
      {
        "title": "Pobierz plik .srt",
        "body": "Gotowy dla Premiere, DaVinci, YouTube — wszędzie."
      }
    ],
    "pt": [
      {
        "title": "Arraste o seu ficheiro .vtt",
        "body": "Ou cole as cues WebVTT diretamente no editor."
      },
      {
        "title": "Conversão instantânea",
        "body": "Cabeçalhos, estilos e identificadores de cues são limpos automaticamente."
      },
      {
        "title": "Baixe o .srt",
        "body": "Pronto para Premiere, DaVinci, YouTube — onde quiser."
      }
    ],
    "ru": [
      {
        "title": "Загрузите .vtt-файл",
        "body": "Или вставьте реплики WebVTT прямо в редактор."
      },
      {
        "title": "Мгновенная конвертация",
        "body": "Заголовки, стили и идентификаторы реплик очищаются автоматически."
      },
      {
        "title": "Скачайте .srt",
        "body": "Готово для Premiere, DaVinci, YouTube — куда угодно."
      }
    ],
    "sv": [
      {
        "title": "Släpp din .vtt-fil",
        "body": "Eller klistra in WebVTT-cues direkt i editorn."
      },
      {
        "title": "Omedelbar konvertering",
        "body": "Sidhuvuden, stilar och cue-identifierare städas upp automatiskt."
      },
      {
        "title": "Ladda ned .srt",
        "body": "Redo för Premiere, DaVinci, YouTube — var som helst."
      }
    ],
    "tr": [
      {
        "title": ".vtt dosyanı bırak",
        "body": "Ya da WebVTT ipuçlarını doğrudan editöre yapıştır."
      },
      {
        "title": "Anında dönüşüm",
        "body": "Başlıklar, stiller ve ipucu tanımlayıcılar otomatik olarak temizlenir."
      },
      {
        "title": ".srt dosyasını indir",
        "body": "Premiere, DaVinci, YouTube — her yerde kullanıma hazır."
      }
    ],
    "uk": [
      {
        "title": "Завантажте .vtt файл",
        "body": "Або вставте WebVTT-рядки прямо в редактор."
      },
      {
        "title": "Миттєва конвертація",
        "body": "Заголовки, стилі та ідентифікатори рядків прибираються автоматично."
      },
      {
        "title": "Завантажте .srt",
        "body": "Готово для Premiere, DaVinci, YouTube — і не тільки."
      }
    ],
    "vi": [
      {
        "title": "Kéo thả file .vtt",
        "body": "Hoặc dán trực tiếp các cue WebVTT vào trình soạn thảo."
      },
      {
        "title": "Chuyển đổi tức thì",
        "body": "Header, định dạng và ID cue được dọn dẹp tự động."
      },
      {
        "title": "Tải xuống file .srt",
        "body": "Dùng được ngay trên Premiere, DaVinci, YouTube — ở bất kỳ đâu."
      }
    ],
    "zh": [
      {
        "title": "拖入 .vtt 文件",
        "body": "或将 WebVTT 字幕内容直接粘贴到编辑器中。"
      },
      {
        "title": "即时转换",
        "body": "自动清理文件头、样式标签和字幕标识符。"
      },
      {
        "title": "下载 .srt 文件",
        "body": "可直接用于 Premiere、DaVinci、YouTube 等任意平台。"
      }
    ]
  },
  "watermark-image": {
    "ar": [
      {
        "title": "ارفع صورتك",
        "body": "JPG أو PNG أو WebP — تبقى على جهازك."
      },
      {
        "title": "نسّق العلامة المائية",
        "body": "النص واللون والشفافية والحجم والموضع."
      },
      {
        "title": "حمّل النتيجة",
        "body": "العلامة المائية محروقة في الصورة."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte obrázek",
        "body": "JPG, PNG nebo WebP — zůstane na vašem zařízení."
      },
      {
        "title": "Upravte vodoznak",
        "body": "Text, barva, průhlednost, velikost a poloha."
      },
      {
        "title": "Stáhněte výsledek",
        "body": "Vodoznak je trvale zahrnut."
      }
    ],
    "de": [
      {
        "title": "Bild hochladen",
        "body": "JPG, PNG oder WebP — bleibt auf deinem Gerät."
      },
      {
        "title": "Wasserzeichen gestalten",
        "body": "Text, Farbe, Deckkraft, Größe und Position."
      },
      {
        "title": "Ergebnis herunterladen",
        "body": "Wasserzeichen dauerhaft eingebrannt."
      }
    ],
    "es": [
      {
        "title": "Sube tu imagen",
        "body": "JPG, PNG o WebP — se queda en tu dispositivo."
      },
      {
        "title": "Personaliza la marca de agua",
        "body": "Texto, color, opacidad, tamaño y posición."
      },
      {
        "title": "Descarga el resultado",
        "body": "Marca de agua integrada de forma permanente."
      }
    ],
    "fr": [
      {
        "title": "Importez votre image",
        "body": "JPG, PNG ou WebP — reste sur votre appareil."
      },
      {
        "title": "Stylisez le filigrane",
        "body": "Texte, couleur, opacité, taille et position."
      },
      {
        "title": "Téléchargez le résultat",
        "body": "Filigrane intégré définitivement."
      }
    ],
    "hi": [
      {
        "title": "अपनी इमेज अपलोड करें",
        "body": "JPG, PNG या WebP — आपके डिवाइस पर रहती है।"
      },
      {
        "title": "वॉटरमार्क स्टाइल करें",
        "body": "टेक्स्ट, रंग, ओपैसिटी, साइज़ और पोज़ीशन।"
      },
      {
        "title": "परिणाम डाउनलोड करें",
        "body": "वॉटरमार्क बेक हो गया।"
      }
    ],
    "id": [
      {
        "title": "Unggah gambarmu",
        "body": "JPG, PNG, atau WebP — tetap di perangkatmu."
      },
      {
        "title": "Atur gaya watermark",
        "body": "Teks, warna, opasitas, ukuran, dan posisi."
      },
      {
        "title": "Unduh hasilnya",
        "body": "Watermark sudah tertanam permanen."
      }
    ],
    "it": [
      {
        "title": "Carica la tua immagine",
        "body": "JPG, PNG o WebP — rimane sul tuo dispositivo."
      },
      {
        "title": "Personalizza il watermark",
        "body": "Testo, colore, opacità, dimensione e posizione."
      },
      {
        "title": "Scarica il risultato",
        "body": "Watermark impresso sull'immagine."
      }
    ],
    "ja": [
      {
        "title": "画像をアップロード",
        "body": "JPG、PNG または WebP。デバイス上に保持されます。"
      },
      {
        "title": "透かしをスタイル設定",
        "body": "テキスト・色・不透明度・サイズ・位置を調整。"
      },
      {
        "title": "結果をダウンロード",
        "body": "透かしが焼き付けられた状態で出力。"
      }
    ],
    "ko": [
      {
        "title": "이미지 업로드",
        "body": "JPG, PNG 또는 WebP — 기기에 머무릅니다."
      },
      {
        "title": "워터마크 스타일 설정",
        "body": "텍스트, 색상, 불투명도, 크기, 위치."
      },
      {
        "title": "결과 다운로드",
        "body": "워터마크가 영구적으로 삽입됩니다."
      }
    ],
    "nl": [
      {
        "title": "Upload je afbeelding",
        "body": "JPG, PNG of WebP — blijft op je apparaat."
      },
      {
        "title": "Stijl het watermerk",
        "body": "Tekst, kleur, doorzichtigheid, grootte en positie."
      },
      {
        "title": "Download het resultaat",
        "body": "Watermerk permanent ingebrand."
      }
    ],
    "pl": [
      {
        "title": "Prześlij obraz",
        "body": "JPG, PNG lub WebP — zostaje na Twoim urządzeniu."
      },
      {
        "title": "Ostyluj znak wodny",
        "body": "Tekst, kolor, przezroczystość, rozmiar i pozycja."
      },
      {
        "title": "Pobierz wynik",
        "body": "Znak wodny trwale wbudowany w obraz."
      }
    ],
    "pt": [
      {
        "title": "Carregue a sua imagem",
        "body": "JPG, PNG ou WebP — fica no seu dispositivo."
      },
      {
        "title": "Personalize a marca d'água",
        "body": "Texto, cor, opacidade, tamanho e posição."
      },
      {
        "title": "Baixe o resultado",
        "body": "Marca d'água incorporada definitivamente."
      }
    ],
    "ru": [
      {
        "title": "Загрузите изображение",
        "body": "JPG, PNG или WebP — остаётся на вашем устройстве."
      },
      {
        "title": "Настройте водяной знак",
        "body": "Текст, цвет, прозрачность, размер и положение."
      },
      {
        "title": "Скачайте результат",
        "body": "Водяной знак встроен навсегда."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp din bild",
        "body": "JPG, PNG eller WebP — stannar på din enhet."
      },
      {
        "title": "Utforma vattenstämpeln",
        "body": "Text, färg, opacitet, storlek och position."
      },
      {
        "title": "Ladda ned resultatet",
        "body": "Vattenstämpeln är inbränd."
      }
    ],
    "tr": [
      {
        "title": "Görselini yükle",
        "body": "JPG, PNG veya WebP — cihazında kalır."
      },
      {
        "title": "Filigranı stillendir",
        "body": "Metin, renk, opaklık, boyut ve konum."
      },
      {
        "title": "Sonucu indir",
        "body": "Filigran kalıcı olarak işlenmiş."
      }
    ],
    "uk": [
      {
        "title": "Завантажте зображення",
        "body": "JPG, PNG або WebP — залишається на пристрої."
      },
      {
        "title": "Налаштуйте водяний знак",
        "body": "Текст, колір, прозорість, розмір і позиція."
      },
      {
        "title": "Завантажте результат",
        "body": "Водяний знак вбудовано назавжди."
      }
    ],
    "vi": [
      {
        "title": "Tải ảnh lên",
        "body": "JPG, PNG hoặc WebP — ở lại trên thiết bị của bạn."
      },
      {
        "title": "Tuỳ chỉnh watermark",
        "body": "Văn bản, màu sắc, độ mờ, kích cỡ và vị trí."
      },
      {
        "title": "Tải xuống kết quả",
        "body": "Watermark đã được in vào ảnh."
      }
    ],
    "zh": [
      {
        "title": "上传图片",
        "body": "支持 JPG、PNG 或 WebP，文件保留在本地设备。"
      },
      {
        "title": "设置水印样式",
        "body": "文字、颜色、透明度、大小和位置。"
      },
      {
        "title": "下载结果",
        "body": "水印已永久烧入图片。"
      }
    ]
  },
  "word-counter": {
    "ar": [
      {
        "title": "الصق نصك",
        "body": "من تغريدة إلى رسالة دكتوراه."
      },
      {
        "title": "اطّلع على الإحصاءات الحية",
        "body": "كلمات وأحرف وجمل وفقرات ووقت القراءة."
      },
      {
        "title": "استخدمه في أي مكان",
        "body": "مثالي للمقالات ووصف SEO والمنشورات الاجتماعية."
      }
    ],
    "cs": [
      {
        "title": "Vložte text",
        "body": "Cokoli od tweetu po diplomovou práci."
      },
      {
        "title": "Sledujte živé statistiky",
        "body": "Slova, znaky, věty, odstavce a čas čtení."
      },
      {
        "title": "Použijte kdekoli",
        "body": "Ideální pro eseje, SEO popisky a příspěvky na sociálních sítích."
      }
    ],
    "de": [
      {
        "title": "Text einfügen",
        "body": "Von einem Tweet bis zur Abschlussarbeit."
      },
      {
        "title": "Live-Statistiken sehen",
        "body": "Wörter, Zeichen, Sätze, Absätze und Lesezeit."
      },
      {
        "title": "Überall nutzen",
        "body": "Ideal für Essays, SEO-Meta-Texte und Social-Media-Beiträge."
      }
    ],
    "es": [
      {
        "title": "Pega tu texto",
        "body": "Desde un tuit hasta una tesis."
      },
      {
        "title": "Estadísticas en tiempo real",
        "body": "Palabras, caracteres, frases, párrafos y tiempo de lectura."
      },
      {
        "title": "Úsalo en cualquier contexto",
        "body": "Perfecto para ensayos, metadatos SEO y publicaciones en redes."
      }
    ],
    "fr": [
      {
        "title": "Collez votre texte",
        "body": "D'un tweet à une thèse."
      },
      {
        "title": "Statistiques en temps réel",
        "body": "Mots, caractères, phrases, paragraphes et temps de lecture."
      },
      {
        "title": "Utilisable partout",
        "body": "Idéal pour les dissertations, les métas SEO et les posts sur les réseaux."
      }
    ],
    "hi": [
      {
        "title": "अपना टेक्स्ट पेस्ट करें",
        "body": "एक ट्वीट से लेकर थीसिस तक कुछ भी।"
      },
      {
        "title": "लाइव आंकड़े देखें",
        "body": "शब्द, अक्षर, वाक्य, पैराग्राफ और पढ़ने का समय।"
      },
      {
        "title": "कहीं भी उपयोग करें",
        "body": "निबंध, SEO मेटा और सोशल पोस्ट के लिए एकदम सही।"
      }
    ],
    "id": [
      {
        "title": "Tempel teks kamu",
        "body": "Dari tweet hingga tesis."
      },
      {
        "title": "Lihat statistik langsung",
        "body": "Kata, karakter, kalimat, paragraf, dan estimasi waktu baca."
      },
      {
        "title": "Gunakan di mana saja",
        "body": "Ideal untuk esai, meta SEO, dan posting media sosial."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo testo",
        "body": "Da un tweet a una tesi di laurea."
      },
      {
        "title": "Statistiche in tempo reale",
        "body": "Parole, caratteri, frasi, paragrafi e tempo di lettura."
      },
      {
        "title": "Usalo ovunque",
        "body": "Perfetto per saggi, meta SEO e post sui social."
      }
    ],
    "ja": [
      {
        "title": "テキストをペースト",
        "body": "ツイートから論文まで、どんな長さでも対応。"
      },
      {
        "title": "リアルタイム統計を確認",
        "body": "単語数・文字数・文数・段落数・読了時間。"
      },
      {
        "title": "どこでも活用",
        "body": "エッセイ・SEOメタ・SNS投稿にぴったり。"
      }
    ],
    "ko": [
      {
        "title": "텍스트 붙여넣기",
        "body": "트윗 한 줄부터 논문까지 무엇이든 가능합니다."
      },
      {
        "title": "실시간 통계 확인",
        "body": "단어, 문자, 문장, 단락 수와 예상 읽기 시간."
      },
      {
        "title": "어디서나 활용",
        "body": "에세이, SEO 메타, 소셜 게시물에 딱 맞습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je tekst",
        "body": "Van een tweet tot een scriptie."
      },
      {
        "title": "Zie live statistieken",
        "body": "Woorden, tekens, zinnen, alinea's en leestijd."
      },
      {
        "title": "Overal inzetbaar",
        "body": "Perfect voor essays, SEO-meta en social-posts."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój tekst",
        "body": "Od tweeta po pracę dyplomową."
      },
      {
        "title": "Zobacz statystyki na żywo",
        "body": "Słowa, znaki, zdania, akapity i czas czytania."
      },
      {
        "title": "Użyj wszędzie",
        "body": "Idealne do wypracowań, meta SEO i postów w mediach społecznościowych."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu texto",
        "body": "Desde um tweet até uma tese."
      },
      {
        "title": "Veja as estatísticas em tempo real",
        "body": "Palavras, caracteres, frases, parágrafos e tempo de leitura."
      },
      {
        "title": "Use em qualquer contexto",
        "body": "Ideal para redações, meta SEO e publicações nas redes sociais."
      }
    ],
    "ru": [
      {
        "title": "Вставьте текст",
        "body": "Что угодно — от твита до диссертации."
      },
      {
        "title": "Смотрите статистику в реальном времени",
        "body": "Слова, символы, предложения, абзацы и время чтения."
      },
      {
        "title": "Используйте везде",
        "body": "Идеально для эссе, SEO-мета и постов в соцсетях."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din text",
        "body": "Allt från en tweet till en avhandling."
      },
      {
        "title": "Se livestatistik",
        "body": "Ord, tecken, meningar, stycken och lästid."
      },
      {
        "title": "Använd var som helst",
        "body": "Perfekt för uppsatser, SEO-metatext och sociala inlägg."
      }
    ],
    "tr": [
      {
        "title": "Metnini yapıştır",
        "body": "Bir tweet'ten teze kadar her şey."
      },
      {
        "title": "Canlı istatistikleri gör",
        "body": "Kelime, karakter, cümle, paragraf ve okuma süresi."
      },
      {
        "title": "Her yerde kullan",
        "body": "Denemeler, SEO meta açıklamaları ve sosyal medya paylaşımları için ideal."
      }
    ],
    "uk": [
      {
        "title": "Вставте текст",
        "body": "Від твіту до дисертації."
      },
      {
        "title": "Статистика в реальному часі",
        "body": "Слова, символи, речення, абзаци та час читання."
      },
      {
        "title": "Для будь-яких потреб",
        "body": "Ідеально для есе, SEO-мета та дописів у соцмережах."
      }
    ],
    "vi": [
      {
        "title": "Dán văn bản vào đây",
        "body": "Từ một tweet đến một luận văn đều được."
      },
      {
        "title": "Xem thống kê trực tiếp",
        "body": "Số từ, ký tự, câu, đoạn văn và thời gian đọc ước tính."
      },
      {
        "title": "Dùng được ở mọi nơi",
        "body": "Lý tưởng cho bài luận, meta SEO và bài đăng mạng xã hội."
      }
    ],
    "zh": [
      {
        "title": "粘贴文本",
        "body": "推文或论文均可。"
      },
      {
        "title": "查看实时统计",
        "body": "字数、字符数、句子数、段落数和预计阅读时间。"
      },
      {
        "title": "随处可用",
        "body": "适用于文章写作、SEO 元描述和社交媒体帖子。"
      }
    ]
  },
  "xml-to-json": {
    "ar": [
      {
        "title": "الصق XML الخاص بك",
        "body": "أي مستند XML مُشكَّل بصحة."
      },
      {
        "title": "تحويل محلي",
        "body": "الوسوم تصبح مفاتيح؛ الوسوم المتكررة تصبح مصفوفات."
      },
      {
        "title": "انسخ JSON",
        "body": "جاهز للاستخدام في كودك."
      }
    ],
    "cs": [
      {
        "title": "Vložte XML",
        "body": "Libovolný správně formátovaný XML dokument."
      },
      {
        "title": "Převeďte lokálně",
        "body": "Tagy se stanou klíči; opakované tagy se stanou poli."
      },
      {
        "title": "Zkopírujte JSON",
        "body": "Připraveno k použití ve vašem kódu."
      }
    ],
    "de": [
      {
        "title": "XML einfügen",
        "body": "Jedes wohlgeformte XML-Dokument."
      },
      {
        "title": "Lokal konvertieren",
        "body": "Tags werden zu Schlüsseln; wiederholte Tags werden zu Arrays."
      },
      {
        "title": "JSON kopieren",
        "body": "Direkt im Code verwendbar."
      }
    ],
    "es": [
      {
        "title": "Pega tu XML",
        "body": "Cualquier documento XML bien formado."
      },
      {
        "title": "Convierte localmente",
        "body": "Las etiquetas se convierten en claves; las etiquetas repetidas, en arrays."
      },
      {
        "title": "Copia el JSON",
        "body": "Listo para usar en tu código."
      }
    ],
    "fr": [
      {
        "title": "Collez votre XML",
        "body": "N'importe quel document XML bien formé."
      },
      {
        "title": "Conversion locale",
        "body": "Les balises deviennent des clés ; les balises répétées deviennent des tableaux."
      },
      {
        "title": "Copiez le JSON",
        "body": "Prêt à utiliser dans votre code."
      }
    ],
    "hi": [
      {
        "title": "अपना XML पेस्ट करें",
        "body": "कोई भी वेल-फॉर्म्ड XML दस्तावेज़।"
      },
      {
        "title": "लोकल कन्वर्ट करें",
        "body": "Tags keys बन जाते हैं; रिपीटेड टैग्स अरे बनते हैं।"
      },
      {
        "title": "JSON कॉपी करें",
        "body": "आपके कोड में उपयोग के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Tempel XML kamu",
        "body": "Dokumen XML apa pun yang terformat dengan baik."
      },
      {
        "title": "Konversi secara lokal",
        "body": "Tag menjadi kunci; tag berulang menjadi array."
      },
      {
        "title": "Salin JSON",
        "body": "Siap digunakan dalam kode kamu."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo XML",
        "body": "Qualsiasi documento XML ben formato."
      },
      {
        "title": "Converti in locale",
        "body": "I tag diventano chiavi; i tag ripetuti diventano array."
      },
      {
        "title": "Copia il JSON",
        "body": "Pronto all'uso nel tuo codice."
      }
    ],
    "ja": [
      {
        "title": "XMLをペースト",
        "body": "整形式の XML ドキュメントであればOK。"
      },
      {
        "title": "ローカルで変換",
        "body": "タグがキーになり、繰り返しタグは配列になります。"
      },
      {
        "title": "JSONをコピー",
        "body": "コードにすぐ組み込めます。"
      }
    ],
    "ko": [
      {
        "title": "XML 붙여넣기",
        "body": "올바른 형식의 XML 문서라면 무엇이든 가능합니다."
      },
      {
        "title": "로컬에서 변환",
        "body": "태그가 키가 되고, 반복 태그는 배열이 됩니다."
      },
      {
        "title": "JSON 복사",
        "body": "코드에서 바로 사용할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je XML",
        "body": "Elk goed opgemaakte XML-document."
      },
      {
        "title": "Lokaal converteren",
        "body": "Tags worden sleutels; herhaalde tags worden arrays."
      },
      {
        "title": "Kopieer de JSON",
        "body": "Direct bruikbaar in je code."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój XML",
        "body": "Dowolny poprawnie sformułowany dokument XML."
      },
      {
        "title": "Konwersja lokalnie",
        "body": "Tagi stają się kluczami; powtarzające się tagi stają się tablicami."
      },
      {
        "title": "Skopiuj JSON",
        "body": "Gotowy do użycia w kodzie."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu XML",
        "body": "Qualquer documento XML bem formado."
      },
      {
        "title": "Converta localmente",
        "body": "As tags tornam-se chaves; tags repetidas tornam-se arrays."
      },
      {
        "title": "Copie o JSON",
        "body": "Pronto a usar no seu código."
      }
    ],
    "ru": [
      {
        "title": "Вставьте XML",
        "body": "Любой корректно сформированный XML-документ."
      },
      {
        "title": "Конвертация локально",
        "body": "Теги становятся ключами, повторяющиеся теги — массивами."
      },
      {
        "title": "Скопируйте JSON",
        "body": "Готов к использованию в вашем коде."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din XML",
        "body": "Vilket välformat XML-dokument som helst."
      },
      {
        "title": "Konvertera lokalt",
        "body": "Taggar blir nycklar; upprepade taggar blir arrayer."
      },
      {
        "title": "Kopiera JSON:en",
        "body": "Redo att använda i din kod."
      }
    ],
    "tr": [
      {
        "title": "XML'ini yapıştır",
        "body": "Düzgün biçimlendirilmiş herhangi bir XML belgesi."
      },
      {
        "title": "Yerel olarak dönüştür",
        "body": "Etiketler anahtar olur; tekrarlanan etiketler diziye dönüşür."
      },
      {
        "title": "JSON'u kopyala",
        "body": "Kodunda kullanmaya hazır."
      }
    ],
    "uk": [
      {
        "title": "Вставте XML",
        "body": "Будь-який коректний XML-документ."
      },
      {
        "title": "Конвертація локально",
        "body": "Теги стають ключами; повторювані теги — масивами."
      },
      {
        "title": "Скопіюйте JSON",
        "body": "Готово для вашого коду."
      }
    ],
    "vi": [
      {
        "title": "Dán XML vào đây",
        "body": "Bất kỳ tài liệu XML đúng cú pháp nào."
      },
      {
        "title": "Chuyển đổi cục bộ",
        "body": "Thẻ thành khóa; thẻ lặp lại thành mảng."
      },
      {
        "title": "Sao chép JSON",
        "body": "Sẵn sàng dùng trong code của bạn."
      }
    ],
    "zh": [
      {
        "title": "粘贴 XML",
        "body": "任何格式规范的 XML 文档均可。"
      },
      {
        "title": "本地转换",
        "body": "标签转为键名，重复标签转为数组。"
      },
      {
        "title": "复制 JSON",
        "body": "可直接在代码中使用。"
      }
    ]
  },
  "yaml-to-json": {
    "ar": [
      {
        "title": "الصق YAML الخاص بك",
        "body": "خرائط وتسلسلات وكتل متداخلة."
      },
      {
        "title": "تحويل إلى JSON",
        "body": "نُحلّل المسافات البادئة والقيم على الجهاز."
      },
      {
        "title": "انسخ JSON",
        "body": "جاهز لأي أداة تتعامل مع JSON."
      }
    ],
    "cs": [
      {
        "title": "Vložte YAML",
        "body": "Mapy, sekvence a vnořené bloky."
      },
      {
        "title": "Převeďte na JSON",
        "body": "Odsazení a skaláry zpracujeme přímo na zařízení."
      },
      {
        "title": "Zkopírujte JSON",
        "body": "Připraveno pro libovolný nástroj, který pracuje s JSON."
      }
    ],
    "de": [
      {
        "title": "YAML einfügen",
        "body": "Maps, Sequenzen und verschachtelte Blöcke."
      },
      {
        "title": "In JSON umwandeln",
        "body": "Einrückung und Skalare werden auf dem Gerät geparst."
      },
      {
        "title": "JSON kopieren",
        "body": "Bereit für jedes Tool, das JSON versteht."
      }
    ],
    "es": [
      {
        "title": "Pega tu YAML",
        "body": "Mapas, secuencias y bloques anidados."
      },
      {
        "title": "Convierte a JSON",
        "body": "Analizamos la sangría y los escalares en tu dispositivo."
      },
      {
        "title": "Copia el JSON",
        "body": "Listo para cualquier herramienta que hable JSON."
      }
    ],
    "fr": [
      {
        "title": "Collez votre YAML",
        "body": "Maps, séquences et blocs imbriqués."
      },
      {
        "title": "Convertissez en JSON",
        "body": "Nous analysons l'indentation et les scalaires sur votre appareil."
      },
      {
        "title": "Copiez le JSON",
        "body": "Prêt pour tout outil qui parle JSON."
      }
    ],
    "hi": [
      {
        "title": "अपना YAML पेस्ट करें",
        "body": "मैप्स, सीक्वेंस और नेस्टेड ब्लॉक।"
      },
      {
        "title": "JSON में कन्वर्ट करें",
        "body": "हम डिवाइस पर इंडेंटेशन और स्केलर पार्स करते हैं।"
      },
      {
        "title": "JSON कॉपी करें",
        "body": "JSON समझने वाले किसी भी टूल के लिए तैयार।"
      }
    ],
    "id": [
      {
        "title": "Tempel YAML kamu",
        "body": "Map, urutan, dan blok bertingkat."
      },
      {
        "title": "Konversi ke JSON",
        "body": "Kami mengurai indentasi dan skalar di perangkatmu."
      },
      {
        "title": "Salin JSON",
        "body": "Siap untuk alat apa pun yang memahami JSON."
      }
    ],
    "it": [
      {
        "title": "Incolla il tuo YAML",
        "body": "Mappe, sequenze e blocchi annidati."
      },
      {
        "title": "Converti in JSON",
        "body": "Analizziamo indentazione e scalari sul tuo dispositivo."
      },
      {
        "title": "Copia il JSON",
        "body": "Pronto per qualsiasi strumento che parla JSON."
      }
    ],
    "ja": [
      {
        "title": "YAMLをペースト",
        "body": "マップ・シーケンス・ネストされたブロックに対応。"
      },
      {
        "title": "JSONに変換",
        "body": "インデントとスカラーをデバイス上でパース。"
      },
      {
        "title": "JSONをコピー",
        "body": "JSON対応のあらゆるツールにすぐ使えます。"
      }
    ],
    "ko": [
      {
        "title": "YAML 붙여넣기",
        "body": "맵, 시퀀스, 중첩 블록 모두 지원합니다."
      },
      {
        "title": "JSON으로 변환",
        "body": "들여쓰기와 스칼라를 기기에서 파싱합니다."
      },
      {
        "title": "JSON 복사",
        "body": "JSON을 사용하는 모든 도구에 바로 사용할 수 있습니다."
      }
    ],
    "nl": [
      {
        "title": "Plak je YAML",
        "body": "Maps, sequences en geneste blokken."
      },
      {
        "title": "Converteren naar JSON",
        "body": "We verwerken inspringing en scalairs op je apparaat."
      },
      {
        "title": "Kopieer de JSON",
        "body": "Klaar voor elke tool die JSON begrijpt."
      }
    ],
    "pl": [
      {
        "title": "Wklej swój YAML",
        "body": "Mapy, sekwencje i zagnieżdżone bloki."
      },
      {
        "title": "Konwertuj do JSON",
        "body": "Parsujemy wcięcia i wartości skalarne na Twoim urządzeniu."
      },
      {
        "title": "Skopiuj JSON",
        "body": "Gotowy dla każdego narzędzia obsługującego JSON."
      }
    ],
    "pt": [
      {
        "title": "Cole o seu YAML",
        "body": "Mapas, sequências e blocos aninhados."
      },
      {
        "title": "Converta para JSON",
        "body": "Processamos a indentação e os escalares no seu dispositivo."
      },
      {
        "title": "Copie o JSON",
        "body": "Pronto para qualquer ferramenta que fale JSON."
      }
    ],
    "ru": [
      {
        "title": "Вставьте YAML",
        "body": "Словари, последовательности и вложенные блоки."
      },
      {
        "title": "Конвертация в JSON",
        "body": "Отступы и скаляры разбираются на устройстве."
      },
      {
        "title": "Скопируйте JSON",
        "body": "Готов для любого инструмента, работающего с JSON."
      }
    ],
    "sv": [
      {
        "title": "Klistra in din YAML",
        "body": "Kartor, sekvenser och nästlade block."
      },
      {
        "title": "Konvertera till JSON",
        "body": "Vi parsar indragning och skalarer på enheten."
      },
      {
        "title": "Kopiera JSON:en",
        "body": "Redo för vilket verktyg som helst som talar JSON."
      }
    ],
    "tr": [
      {
        "title": "YAML'ını yapıştır",
        "body": "Haritalar, diziler ve iç içe bloklar."
      },
      {
        "title": "JSON'a dönüştür",
        "body": "Girintileri ve skaları cihazında ayrıştırırız."
      },
      {
        "title": "JSON'u kopyala",
        "body": "JSON kullanan her araç için hazır."
      }
    ],
    "uk": [
      {
        "title": "Вставте YAML",
        "body": "Мапи, послідовності та вкладені блоки."
      },
      {
        "title": "Конвертуйте у JSON",
        "body": "Ми парсимо відступи й скаляри на пристрої."
      },
      {
        "title": "Скопіюйте JSON",
        "body": "Готово для будь-якого інструменту, що розуміє JSON."
      }
    ],
    "vi": [
      {
        "title": "Dán YAML vào đây",
        "body": "Map, danh sách và khối lồng nhau đều được."
      },
      {
        "title": "Chuyển sang JSON",
        "body": "Phân tích thụt lề và giá trị đơn trên thiết bị."
      },
      {
        "title": "Sao chép JSON",
        "body": "Dùng được với mọi công cụ hiểu JSON."
      }
    ],
    "zh": [
      {
        "title": "粘贴 YAML",
        "body": "支持映射、序列和嵌套块。"
      },
      {
        "title": "转换为 JSON",
        "body": "在设备上解析缩进和标量。"
      },
      {
        "title": "复制 JSON",
        "body": "可用于任何支持 JSON 的工具。"
      }
    ]
  },
  "youtube-chapters": {
    "ar": [
      {
        "title": "ارفع النص المكتوب",
        "body": "SRT أو VTT أو نص عادي."
      },
      {
        "title": "الذكاء الاصطناعي يحدد الفصول",
        "body": "نختار أقسامًا ذات معنى دلالي، لا فترات اعتباطية."
      },
      {
        "title": "انسخ والصق",
        "body": "أسقط الفصول المنسّقة في وصف YouTube."
      }
    ],
    "cs": [
      {
        "title": "Nahrajte přepis",
        "body": "SRT, VTT nebo prostý text."
      },
      {
        "title": "AI najde předěly kapitol",
        "body": "Vybereme smysluplné sekce, ne libovolné intervaly."
      },
      {
        "title": "Zkopírujte a vložte",
        "body": "Přetáhněte naformátované kapitoly do popisu na YouTube."
      }
    ],
    "de": [
      {
        "title": "Transkript hochladen",
        "body": "SRT, VTT oder Klartext."
      },
      {
        "title": "KI findet die Kapitelgrenzen",
        "body": "Wir wählen semantisch sinnvolle Abschnitte, keine willkürlichen Intervalle."
      },
      {
        "title": "Kopieren und einfügen",
        "body": "Kapitel direkt in die YouTube-Beschreibung einfügen."
      }
    ],
    "es": [
      {
        "title": "Sube la transcripción",
        "body": "SRT, VTT o texto plano."
      },
      {
        "title": "La IA encuentra los cortes de capítulo",
        "body": "Detectamos secciones con sentido semántico, no intervalos arbitrarios."
      },
      {
        "title": "Copia y pega",
        "body": "Añade los capítulos formateados directamente a la descripción de YouTube."
      }
    ],
    "fr": [
      {
        "title": "Importez la transcription",
        "body": "SRT, VTT ou texte brut."
      },
      {
        "title": "L'IA trouve les coupures de chapitres",
        "body": "Nous détectons des sections sémantiquement cohérentes, pas des intervalles arbitraires."
      },
      {
        "title": "Copiez-collez",
        "body": "Glissez les chapitres formatés dans votre description YouTube."
      }
    ],
    "hi": [
      {
        "title": "ट्रांसक्रिप्ट अपलोड करें",
        "body": "SRT, VTT या प्लेन टेक्स्ट।"
      },
      {
        "title": "AI चैप्टर ब्रेक ढूंढता है",
        "body": "हम अर्थपूर्ण सेक्शन चुनते हैं, न कि मनमाने अंतराल।"
      },
      {
        "title": "कॉपी और पेस्ट करें",
        "body": "फ़ॉर्मेट किए गए चैप्टर अपने YouTube विवरण में डालें।"
      }
    ],
    "id": [
      {
        "title": "Unggah transkrip",
        "body": "SRT, VTT, atau teks biasa."
      },
      {
        "title": "AI menemukan pembagian bab",
        "body": "Kami memilih bagian yang bermakna secara semantis, bukan interval sembarangan."
      },
      {
        "title": "Salin & tempel",
        "body": "Letakkan bab yang sudah diformat ke deskripsi YouTube kamu."
      }
    ],
    "it": [
      {
        "title": "Carica la trascrizione",
        "body": "SRT, VTT o testo semplice."
      },
      {
        "title": "L'AI individua i capitoli",
        "body": "Selezioniamo sezioni semanticamente significative, non intervalli arbitrari."
      },
      {
        "title": "Copia e incolla",
        "body": "Inserisci i capitoli formattati nella descrizione del tuo video YouTube."
      }
    ],
    "ja": [
      {
        "title": "トランスクリプトをアップロード",
        "body": "SRT、VTT またはプレーンテキスト。"
      },
      {
        "title": "AIがチャプターの区切りを検出",
        "body": "任意の間隔ではなく、意味的に適切なセクションを自動選択。"
      },
      {
        "title": "コピー＆ペースト",
        "body": "フォーマット済みのチャプターを YouTube の説明欄に貼り付けるだけ。"
      }
    ],
    "ko": [
      {
        "title": "대본 업로드",
        "body": "SRT, VTT 또는 일반 텍스트."
      },
      {
        "title": "AI가 챕터 구분점을 찾습니다",
        "body": "임의 구간이 아닌 의미론적으로 자연스러운 섹션을 선택합니다."
      },
      {
        "title": "복사 후 붙여넣기",
        "body": "생성된 챕터를 YouTube 설명란에 바로 붙여넣으세요."
      }
    ],
    "nl": [
      {
        "title": "Upload transcriptie",
        "body": "SRT, VTT of gewone tekst."
      },
      {
        "title": "AI vindt de hoofdstukovergangen",
        "body": "We kiezen semantisch betekenisvolle secties, geen willekeurige intervallen."
      },
      {
        "title": "Kopiëren en plakken",
        "body": "Zet de opgemaakte hoofdstukken in je YouTube-beschrijving."
      }
    ],
    "pl": [
      {
        "title": "Prześlij transkrypt",
        "body": "SRT, VTT lub zwykły tekst."
      },
      {
        "title": "AI wyznacza rozdziały",
        "body": "Wybieramy sekcje z semantycznym sensem, nie arbitralne odstępy."
      },
      {
        "title": "Skopiuj i wklej",
        "body": "Wstaw sformatowane rozdziały do opisu wideo na YouTube."
      }
    ],
    "pt": [
      {
        "title": "Carregue a transcrição",
        "body": "SRT, VTT ou texto simples."
      },
      {
        "title": "A IA encontra as divisões de capítulo",
        "body": "Selecionamos secções com significado semântico, não intervalos arbitrários."
      },
      {
        "title": "Copie e cole",
        "body": "Adicione os capítulos formatados à descrição do seu YouTube."
      }
    ],
    "ru": [
      {
        "title": "Загрузите транскрипт",
        "body": "SRT, VTT или обычный текст."
      },
      {
        "title": "ИИ находит разделы",
        "body": "Разбиение на главы по смыслу, а не через равные промежутки."
      },
      {
        "title": "Скопируйте и вставьте",
        "body": "Готовые главы — прямо в описание YouTube-видео."
      }
    ],
    "sv": [
      {
        "title": "Ladda upp transkript",
        "body": "SRT, VTT eller ren text."
      },
      {
        "title": "AI hittar kapitelbrytningarna",
        "body": "Vi väljer semantiskt meningsfulla avsnitt, inte godtyckliga intervall."
      },
      {
        "title": "Kopiera och klistra in",
        "body": "Lägg de formaterade kapitlen i din YouTube-beskrivning."
      }
    ],
    "tr": [
      {
        "title": "Transkripti yükle",
        "body": "SRT, VTT veya düz metin."
      },
      {
        "title": "AI bölüm sınırlarını buluyor",
        "body": "Rastgele aralıklar değil, anlamsal açıdan mantıklı bölümler seçeriz."
      },
      {
        "title": "Kopyala ve yapıştır",
        "body": "Biçimlendirilmiş bölümleri YouTube açıklamanıza bırakın."
      }
    ],
    "uk": [
      {
        "title": "Завантажте транскрипт",
        "body": "SRT, VTT або звичайний текст."
      },
      {
        "title": "ШІ знаходить розділи",
        "body": "Ми виділяємо змістовні частини, а не довільні інтервали."
      },
      {
        "title": "Скопіюйте та вставте",
        "body": "Готовий список розділів — одразу в опис YouTube."
      }
    ],
    "vi": [
      {
        "title": "Tải bản ghi lên",
        "body": "SRT, VTT hoặc văn bản thuần."
      },
      {
        "title": "AI xác định điểm chia chương",
        "body": "Chúng tôi chọn các phần có ý nghĩa ngữ nghĩa, không chia theo khoảng thời gian tùy ý."
      },
      {
        "title": "Sao chép và dán",
        "body": "Dán các chương đã định dạng vào phần mô tả YouTube của bạn."
      }
    ],
    "zh": [
      {
        "title": "上传文字稿",
        "body": "支持 SRT、VTT 或纯文本格式。"
      },
      {
        "title": "AI 识别章节分界",
        "body": "依据语义划分章节，而非按固定时间间隔切割。"
      },
      {
        "title": "复制粘贴即可",
        "body": "将生成的章节列表粘贴到 YouTube 视频简介中。"
      }
    ]
  }
};
