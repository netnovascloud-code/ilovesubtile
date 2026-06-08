import type { Locale } from "@/lib/i18n/locales";

/**
 * Localized category-hub FAQ. The English canonical category page renders a
 * richer, category-specific FAQ inline (see CategoryPage); localized variants
 * use this generic, fully-translated set so the page reads entirely in-language
 * instead of dropping the FAQ block. Three standard questions cover the common
 * concerns (free? files uploaded? account needed?).
 */
export type CategoryFaq = { heading: string; items: { q: string; a: string }[] };

export const CATEGORY_FAQ: Record<Locale, CategoryFaq> = {
  en: {
    heading: "Frequently asked questions",
    items: [
      { q: "Are these tools free?", a: "Yes — every tool here is free and unlimited for in-browser conversions. AI tools have a generous daily allowance on the free plan; Pro unlocks unlimited runs and larger files." },
      { q: "Are my files uploaded?", a: "Most tools run entirely in your browser, so your files never leave your device. The few that need a server (AI transcription, translation, video burn-in) delete files within 30 minutes." },
      { q: "Do I need an account?", a: "No. Every tool works without signing up. Create an account only for a higher daily quota, larger files, saved templates and the workflow builder." },
    ],
  },
  fr: {
    heading: "Questions fréquentes",
    items: [
      { q: "Ces outils sont-ils gratuits ?", a: "Oui — chaque outil est gratuit et illimité pour les conversions dans le navigateur. Les outils IA disposent d'un quota quotidien généreux sur l'offre gratuite ; Pro débloque un usage illimité et des fichiers plus volumineux." },
      { q: "Mes fichiers sont-ils envoyés en ligne ?", a: "La plupart des outils fonctionnent entièrement dans votre navigateur : vos fichiers ne quittent jamais votre appareil. Les rares qui nécessitent un serveur (transcription IA, traduction, incrustation vidéo) suppriment les fichiers sous 30 minutes." },
      { q: "Faut-il créer un compte ?", a: "Non. Chaque outil fonctionne sans inscription. Créez un compte uniquement pour un quota quotidien plus élevé, des fichiers plus volumineux, des modèles enregistrés et le créateur de workflows." },
    ],
  },
  es: {
    heading: "Preguntas frecuentes",
    items: [
      { q: "¿Estas herramientas son gratis?", a: "Sí: todas las herramientas son gratis e ilimitadas para conversiones en el navegador. Las herramientas con IA tienen un límite diario generoso en el plan gratuito; Pro desbloquea uso ilimitado y archivos más grandes." },
      { q: "¿Se suben mis archivos?", a: "La mayoría funcionan por completo en tu navegador, así que tus archivos nunca salen de tu dispositivo. Los pocos que necesitan un servidor (transcripción con IA, traducción, incrustación de vídeo) eliminan los archivos en 30 minutos." },
      { q: "¿Necesito una cuenta?", a: "No. Todas las herramientas funcionan sin registro. Crea una cuenta solo para un límite diario mayor, archivos más grandes, plantillas guardadas y el creador de flujos de trabajo." },
    ],
  },
  pt: {
    heading: "Perguntas frequentes",
    items: [
      { q: "Estas ferramentas são gratuitas?", a: "Sim — todas as ferramentas são gratuitas e ilimitadas para conversões no navegador. As ferramentas com IA têm um limite diário generoso no plano gratuito; o Pro liberta uso ilimitado e ficheiros maiores." },
      { q: "Os meus ficheiros são enviados?", a: "A maioria funciona inteiramente no seu navegador, por isso os ficheiros nunca saem do seu dispositivo. As poucas que precisam de servidor (transcrição com IA, tradução, incrustação de vídeo) eliminam os ficheiros em 30 minutos." },
      { q: "Preciso de uma conta?", a: "Não. Todas as ferramentas funcionam sem registo. Crie uma conta apenas para um limite diário maior, ficheiros maiores, modelos guardados e o construtor de fluxos de trabalho." },
    ],
  },
  de: {
    heading: "Häufige Fragen",
    items: [
      { q: "Sind diese Tools kostenlos?", a: "Ja – jedes Tool ist kostenlos und unbegrenzt für Konvertierungen im Browser. KI-Tools haben im kostenlosen Plan ein großzügiges Tageslimit; Pro schaltet unbegrenzte Nutzung und größere Dateien frei." },
      { q: "Werden meine Dateien hochgeladen?", a: "Die meisten Tools laufen vollständig im Browser, sodass Ihre Dateien Ihr Gerät nie verlassen. Die wenigen, die einen Server brauchen (KI-Transkription, Übersetzung, Video-Einbrennen), löschen Dateien innerhalb von 30 Minuten." },
      { q: "Brauche ich ein Konto?", a: "Nein. Jedes Tool funktioniert ohne Anmeldung. Erstellen Sie ein Konto nur für ein höheres Tageslimit, größere Dateien, gespeicherte Vorlagen und den Workflow-Builder." },
    ],
  },
  it: {
    heading: "Domande frequenti",
    items: [
      { q: "Questi strumenti sono gratuiti?", a: "Sì: ogni strumento è gratuito e illimitato per le conversioni nel browser. Gli strumenti IA hanno un limite giornaliero generoso nel piano gratuito; Pro sblocca uso illimitato e file più grandi." },
      { q: "I miei file vengono caricati?", a: "La maggior parte degli strumenti funziona interamente nel browser, quindi i tuoi file non lasciano mai il dispositivo. I pochi che richiedono un server (trascrizione IA, traduzione, incorporazione video) eliminano i file entro 30 minuti." },
      { q: "Serve un account?", a: "No. Ogni strumento funziona senza registrazione. Crea un account solo per un limite giornaliero più alto, file più grandi, modelli salvati e il workflow builder." },
    ],
  },
  nl: {
    heading: "Veelgestelde vragen",
    items: [
      { q: "Zijn deze tools gratis?", a: "Ja — elke tool is gratis en onbeperkt voor conversies in de browser. AI-tools hebben een royale daglimiet in het gratis plan; Pro ontgrendelt onbeperkt gebruik en grotere bestanden." },
      { q: "Worden mijn bestanden geüpload?", a: "De meeste tools draaien volledig in je browser, dus je bestanden verlaten je apparaat nooit. De enkele die een server nodig hebben (AI-transcriptie, vertaling, video-inbranden) verwijderen bestanden binnen 30 minuten." },
      { q: "Heb ik een account nodig?", a: "Nee. Elke tool werkt zonder registratie. Maak alleen een account voor een hogere daglimiet, grotere bestanden, opgeslagen sjablonen en de workflow-builder." },
    ],
  },
  ja: {
    heading: "よくある質問",
    items: [
      { q: "これらのツールは無料ですか？", a: "はい。ブラウザ内での変換はすべて無料・無制限です。AIツールは無料プランでも十分な1日の利用枠があり、Proなら無制限かつ大きなファイルに対応します。" },
      { q: "ファイルはアップロードされますか？", a: "ほとんどのツールはブラウザ内で完結するため、ファイルが端末から出ることはありません。サーバーが必要な一部（AI文字起こし、翻訳、動画への字幕焼き込み）でも、ファイルは30分以内に削除されます。" },
      { q: "アカウントは必要ですか？", a: "いいえ。すべてのツールは登録なしで使えます。1日の利用枠の拡大、より大きなファイル、テンプレートの保存、ワークフロービルダーが必要な場合のみアカウントを作成してください。" },
    ],
  },
  zh: {
    heading: "常见问题",
    items: [
      { q: "这些工具是免费的吗？", a: "是的——所有在浏览器中进行的转换都免费且不限次数。AI 工具在免费套餐中有充足的每日额度；Pro 可解锁无限次使用和更大的文件。" },
      { q: "我的文件会被上传吗？", a: "大多数工具完全在您的浏览器中运行，文件不会离开您的设备。少数需要服务器的功能（AI 转写、翻译、视频压制字幕）会在 30 分钟内删除文件。" },
      { q: "我需要注册账户吗？", a: "不需要。所有工具无需注册即可使用。仅当您需要更高的每日额度、更大的文件、保存模板和工作流构建器时才需创建账户。" },
    ],
  },
  ko: {
    heading: "자주 묻는 질문",
    items: [
      { q: "이 도구들은 무료인가요?", a: "네 — 브라우저에서 이루어지는 모든 변환은 무료이며 무제한입니다. AI 도구는 무료 요금제에서도 넉넉한 일일 사용량을 제공하며, Pro는 무제한 사용과 더 큰 파일을 지원합니다." },
      { q: "내 파일이 업로드되나요?", a: "대부분의 도구는 브라우저 안에서만 실행되어 파일이 기기를 벗어나지 않습니다. 서버가 필요한 일부(AI 전사, 번역, 영상 자막 입히기)도 30분 이내에 파일을 삭제합니다." },
      { q: "계정이 필요한가요?", a: "아니요. 모든 도구는 가입 없이 사용할 수 있습니다. 더 높은 일일 사용량, 더 큰 파일, 저장된 템플릿, 워크플로 빌더가 필요할 때만 계정을 만드세요." },
    ],
  },
  ar: {
    heading: "الأسئلة الشائعة",
    items: [
      { q: "هل هذه الأدوات مجانية؟", a: "نعم — كل أداة مجانية وبلا حدود للتحويلات داخل المتصفح. وأدوات الذكاء الاصطناعي لها حصة يومية سخية في الخطة المجانية، وتمنحك خطة Pro استخدامًا غير محدود وملفات أكبر." },
      { q: "هل يتم رفع ملفاتي؟", a: "معظم الأدوات تعمل بالكامل داخل متصفحك، لذا لا تغادر ملفاتك جهازك أبدًا. أما القليل منها التي تحتاج إلى خادم (التفريغ النصي بالذكاء الاصطناعي، الترجمة، دمج الترجمة في الفيديو) فتحذف الملفات خلال 30 دقيقة." },
      { q: "هل أحتاج إلى حساب؟", a: "لا. كل أداة تعمل دون تسجيل. أنشئ حسابًا فقط للحصول على حصة يومية أكبر وملفات أكبر وقوالب محفوظة وأداة إنشاء سير العمل." },
    ],
  },
  ru: {
    heading: "Частые вопросы",
    items: [
      { q: "Эти инструменты бесплатные?", a: "Да — все инструменты бесплатны и без ограничений для конвертации в браузере. У ИИ-инструментов щедрый дневной лимит на бесплатном тарифе; Pro открывает безлимит и файлы большего размера." },
      { q: "Мои файлы загружаются на сервер?", a: "Большинство инструментов работают полностью в браузере, поэтому ваши файлы не покидают устройство. Те немногие, которым нужен сервер (ИИ-транскрипция, перевод, вшивание субтитров), удаляют файлы в течение 30 минут." },
      { q: "Нужен ли аккаунт?", a: "Нет. Все инструменты работают без регистрации. Создавайте аккаунт только ради большего дневного лимита, файлов большего размера, сохранённых шаблонов и конструктора рабочих процессов." },
    ],
  },
  hi: {
    heading: "अक्सर पूछे जाने वाले प्रश्न",
    items: [
      { q: "क्या ये टूल मुफ़्त हैं?", a: "हाँ — ब्राउज़र में होने वाले सभी रूपांतरण मुफ़्त और असीमित हैं। एआई टूल के लिए मुफ़्त प्लान में उदार दैनिक सीमा है; Pro असीमित उपयोग और बड़ी फ़ाइलें अनलॉक करता है।" },
      { q: "क्या मेरी फ़ाइलें अपलोड होती हैं?", a: "ज़्यादातर टूल पूरी तरह आपके ब्राउज़र में चलते हैं, इसलिए आपकी फ़ाइलें कभी आपके डिवाइस से बाहर नहीं जातीं। जिन कुछ को सर्वर चाहिए (एआई ट्रांसक्रिप्शन, अनुवाद, वीडियो बर्न-इन) वे 30 मिनट के भीतर फ़ाइलें हटा देते हैं।" },
      { q: "क्या मुझे खाता चाहिए?", a: "नहीं। हर टूल बिना साइन-अप के काम करता है। खाता केवल अधिक दैनिक सीमा, बड़ी फ़ाइलें, सहेजे गए टेम्पलेट और वर्कफ़्लो बिल्डर के लिए बनाएं।" },
    ],
  },
  tr: {
    heading: "Sıkça sorulan sorular",
    items: [
      { q: "Bu araçlar ücretsiz mi?", a: "Evet — tarayıcıda yapılan tüm dönüştürmeler ücretsiz ve sınırsızdır. Yapay zeka araçlarının ücretsiz planda cömert bir günlük hakkı vardır; Pro sınırsız kullanım ve daha büyük dosyalar sunar." },
      { q: "Dosyalarım yükleniyor mu?", a: "Çoğu araç tamamen tarayıcınızda çalışır, böylece dosyalarınız cihazınızdan hiç çıkmaz. Sunucu gerektiren birkaçı (yapay zeka deşifre, çeviri, videoya altyazı gömme) dosyaları 30 dakika içinde siler." },
      { q: "Hesap gerekli mi?", a: "Hayır. Tüm araçlar kayıt olmadan çalışır. Yalnızca daha yüksek günlük hak, daha büyük dosyalar, kayıtlı şablonlar ve iş akışı oluşturucu için hesap açın." },
    ],
  },
  id: {
    heading: "Pertanyaan umum",
    items: [
      { q: "Apakah alat ini gratis?", a: "Ya — semua alat gratis dan tanpa batas untuk konversi di peramban. Alat AI punya jatah harian yang besar di paket gratis; Pro membuka penggunaan tanpa batas dan file lebih besar." },
      { q: "Apakah file saya diunggah?", a: "Sebagian besar alat berjalan sepenuhnya di peramban, jadi file Anda tidak pernah meninggalkan perangkat. Sedikit yang butuh server (transkripsi AI, terjemahan, pembakaran subtitle video) menghapus file dalam 30 menit." },
      { q: "Apakah saya perlu akun?", a: "Tidak. Semua alat berfungsi tanpa mendaftar. Buat akun hanya untuk jatah harian lebih besar, file lebih besar, template tersimpan, dan workflow builder." },
    ],
  },
  vi: {
    heading: "Câu hỏi thường gặp",
    items: [
      { q: "Các công cụ này có miễn phí không?", a: "Có — mọi công cụ đều miễn phí và không giới hạn cho các chuyển đổi trong trình duyệt. Công cụ AI có hạn mức hằng ngày hào phóng ở gói miễn phí; Pro mở khóa dùng không giới hạn và tệp lớn hơn." },
      { q: "Tệp của tôi có được tải lên không?", a: "Hầu hết công cụ chạy hoàn toàn trong trình duyệt nên tệp của bạn không bao giờ rời khỏi thiết bị. Một số ít cần máy chủ (phiên âm AI, dịch, ghép phụ đề vào video) sẽ xóa tệp trong vòng 30 phút." },
      { q: "Tôi có cần tài khoản không?", a: "Không. Mọi công cụ đều hoạt động mà không cần đăng ký. Chỉ tạo tài khoản khi bạn cần hạn mức hằng ngày cao hơn, tệp lớn hơn, mẫu đã lưu và trình tạo quy trình." },
    ],
  },
  sv: {
    heading: "Vanliga frågor",
    items: [
      { q: "Är dessa verktyg gratis?", a: "Ja – alla verktyg är gratis och obegränsade för konverteringar i webbläsaren. AI-verktyg har en generös daglig kvot i gratisplanen; Pro låser upp obegränsad användning och större filer." },
      { q: "Laddas mina filer upp?", a: "De flesta verktyg körs helt i din webbläsare, så dina filer lämnar aldrig din enhet. De få som behöver en server (AI-transkribering, översättning, inbränning av undertexter) raderar filer inom 30 minuter." },
      { q: "Behöver jag ett konto?", a: "Nej. Alla verktyg fungerar utan registrering. Skapa ett konto endast för högre daglig kvot, större filer, sparade mallar och workflow-byggaren." },
    ],
  },
  pl: {
    heading: "Często zadawane pytania",
    items: [
      { q: "Czy te narzędzia są darmowe?", a: "Tak — wszystkie narzędzia są darmowe i bez limitu dla konwersji w przeglądarce. Narzędzia AI mają hojny dzienny limit w planie darmowym; Pro odblokowuje nielimitowane użycie i większe pliki." },
      { q: "Czy moje pliki są przesyłane?", a: "Większość narzędzi działa w całości w przeglądarce, więc pliki nigdy nie opuszczają urządzenia. Nieliczne wymagające serwera (transkrypcja AI, tłumaczenie, wypalanie napisów) usuwają pliki w ciągu 30 minut." },
      { q: "Czy potrzebuję konta?", a: "Nie. Wszystkie narzędzia działają bez rejestracji. Załóż konto tylko dla wyższego dziennego limitu, większych plików, zapisanych szablonów i kreatora przepływów pracy." },
    ],
  },
  uk: {
    heading: "Часті запитання",
    items: [
      { q: "Чи ці інструменти безкоштовні?", a: "Так — усі інструменти безкоштовні та без обмежень для конвертації у браузері. Інструменти ШІ мають щедрий денний ліміт на безкоштовному тарифі; Pro відкриває безлімітне використання та більші файли." },
      { q: "Чи завантажуються мої файли?", a: "Більшість інструментів працюють повністю у браузері, тож ваші файли ніколи не залишають пристрій. Ті небагато, яким потрібен сервер (ШІ-транскрипція, переклад, вшивання субтитрів), видаляють файли протягом 30 хвилин." },
      { q: "Чи потрібен обліковий запис?", a: "Ні. Усі інструменти працюють без реєстрації. Створюйте обліковий запис лише заради більшого денного ліміту, більших файлів, збережених шаблонів і конструктора робочих процесів." },
    ],
  },
  cs: {
    heading: "Časté dotazy",
    items: [
      { q: "Jsou tyto nástroje zdarma?", a: "Ano — všechny nástroje jsou zdarma a bez omezení pro převody v prohlížeči. Nástroje s AI mají v bezplatném tarifu štědrý denní limit; Pro odemyká neomezené použití a větší soubory." },
      { q: "Nahrávají se mé soubory?", a: "Většina nástrojů běží zcela ve vašem prohlížeči, takže soubory nikdy neopustí vaše zařízení. Těch pár, které potřebují server (přepis pomocí AI, překlad, vypálení titulků), maže soubory do 30 minut." },
      { q: "Potřebuji účet?", a: "Ne. Všechny nástroje fungují bez registrace. Účet si vytvořte jen kvůli vyššímu dennímu limitu, větším souborům, uloženým šablonám a tvůrci workflow." },
    ],
  },
};
