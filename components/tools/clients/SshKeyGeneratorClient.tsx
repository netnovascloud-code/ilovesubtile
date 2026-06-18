"use client";

import { useState } from "react";
import { Copy, Check, Download, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateEd25519SshKey, generateRsaSshKey } from "@/lib/openssh";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    algoLabel: "Algorithm",
    hintEd25519: "Recommended — fast, small, modern",
    hintRsa2048: "Wide compatibility",
    hintRsa3072: "Stronger RSA",
    hintRsa4096: "Strongest RSA, slower",
    commentLabel: "Comment",
    commentOptional: "(optional, usually your email)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Generating in your browser…",
    generateBtn: "Generate SSH key pair",
    pubKeyLabel: "Public key (OpenSSH)",
    copied: "Copied",
    copy: "Copy",
    download: "Download",
    pubKeyHint: "Paste this one-liner into ~/.ssh/authorized_keys on a server, or into the SSH-keys page of GitHub / GitLab / your cloud provider.",
    privKeyLabel: "Private key (OpenSSH)",
    privKeyHint: "Save this file as ~/.ssh/id_{algo} and chmod 600 it. Never share it. To add a passphrase later, run ssh-keygen -p -f <file>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% in your browser — the private key never leaves this page. Generated with WebCrypto (RSA) and the audited @noble/curves library (Ed25519).",
    generationFailed: "Generation failed.",
  },
  fr: {
    algoLabel: "Algorithme",
    hintEd25519: "Recommandé — rapide, compact, moderne",
    hintRsa2048: "Large compatibilité",
    hintRsa3072: "RSA plus robuste",
    hintRsa4096: "RSA le plus robuste, plus lent",
    commentLabel: "Commentaire",
    commentOptional: "(facultatif, généralement votre e-mail)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Génération dans votre navigateur…",
    generateBtn: "Générer une paire de clés SSH",
    pubKeyLabel: "Clé publique (OpenSSH)",
    copied: "Copié",
    copy: "Copier",
    download: "Télécharger",
    pubKeyHint: "Collez cette ligne dans ~/.ssh/authorized_keys sur un serveur, ou dans la page clés SSH de GitHub / GitLab / votre fournisseur cloud.",
    privKeyLabel: "Clé privée (OpenSSH)",
    privKeyHint: "Enregistrez ce fichier sous ~/.ssh/id_{algo} et faites chmod 600. Ne le partagez jamais. Pour ajouter une phrase secrète plus tard, exécutez ssh-keygen -p -f <fichier>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% dans votre navigateur — la clé privée ne quitte jamais cette page. Générée avec WebCrypto (RSA) et la bibliothèque auditée @noble/curves (Ed25519).",
    generationFailed: "La génération a échoué.",
  },
  es: {
    algoLabel: "Algoritmo",
    hintEd25519: "Recomendado — rápido, pequeño, moderno",
    hintRsa2048: "Amplia compatibilidad",
    hintRsa3072: "RSA más fuerte",
    hintRsa4096: "RSA más potente, más lento",
    commentLabel: "Comentario",
    commentOptional: "(opcional, generalmente tu correo)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Generando en tu navegador…",
    generateBtn: "Generar par de claves SSH",
    pubKeyLabel: "Clave pública (OpenSSH)",
    copied: "Copiado",
    copy: "Copiar",
    download: "Descargar",
    pubKeyHint: "Pega esta línea en ~/.ssh/authorized_keys en un servidor, o en la página de claves SSH de GitHub / GitLab / tu proveedor cloud.",
    privKeyLabel: "Clave privada (OpenSSH)",
    privKeyHint: "Guarda este archivo como ~/.ssh/id_{algo} y haz chmod 600. Nunca lo compartas. Para añadir una frase de contraseña más tarde, ejecuta ssh-keygen -p -f <archivo>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% en tu navegador — la clave privada nunca abandona esta página. Generada con WebCrypto (RSA) y la biblioteca auditada @noble/curves (Ed25519).",
    generationFailed: "La generación falló.",
  },
  pt: {
    algoLabel: "Algoritmo",
    hintEd25519: "Recomendado — rápido, compacto, moderno",
    hintRsa2048: "Ampla compatibilidade",
    hintRsa3072: "RSA mais forte",
    hintRsa4096: "RSA mais poderoso, mais lento",
    commentLabel: "Comentário",
    commentOptional: "(opcional, geralmente seu e-mail)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Gerando no seu navegador…",
    generateBtn: "Gerar par de chaves SSH",
    pubKeyLabel: "Chave pública (OpenSSH)",
    copied: "Copiado",
    copy: "Copiar",
    download: "Baixar",
    pubKeyHint: "Cole esta linha em ~/.ssh/authorized_keys no servidor, ou na página de chaves SSH do GitHub / GitLab / seu provedor de nuvem.",
    privKeyLabel: "Chave privada (OpenSSH)",
    privKeyHint: "Salve este arquivo como ~/.ssh/id_{algo} e execute chmod 600. Nunca compartilhe. Para adicionar uma senha mais tarde, execute ssh-keygen -p -f <arquivo>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% no seu navegador — a chave privada nunca sai desta página. Gerada com WebCrypto (RSA) e a biblioteca auditada @noble/curves (Ed25519).",
    generationFailed: "A geração falhou.",
  },
  de: {
    algoLabel: "Algorithmus",
    hintEd25519: "Empfohlen — schnell, klein, modern",
    hintRsa2048: "Breite Kompatibilität",
    hintRsa3072: "Stärkeres RSA",
    hintRsa4096: "Stärkstes RSA, langsamer",
    commentLabel: "Kommentar",
    commentOptional: "(optional, meistens deine E-Mail)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Wird im Browser generiert…",
    generateBtn: "SSH-Schlüsselpaar generieren",
    pubKeyLabel: "Öffentlicher Schlüssel (OpenSSH)",
    copied: "Kopiert",
    copy: "Kopieren",
    download: "Herunterladen",
    pubKeyHint: "Diese Zeile in ~/.ssh/authorized_keys auf einem Server einfügen oder auf der SSH-Schlüssel-Seite von GitHub / GitLab / deinem Cloud-Anbieter.",
    privKeyLabel: "Privater Schlüssel (OpenSSH)",
    privKeyHint: "Diese Datei als ~/.ssh/id_{algo} speichern und chmod 600 ausführen. Niemals teilen. Um später eine Passphrase hinzuzufügen, führe ssh-keygen -p -f <Datei> aus.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% in deinem Browser — der private Schlüssel verlässt diese Seite nie. Generiert mit WebCrypto (RSA) und der geprüften @noble/curves-Bibliothek (Ed25519).",
    generationFailed: "Generierung fehlgeschlagen.",
  },
  it: {
    algoLabel: "Algoritmo",
    hintEd25519: "Consigliato — veloce, compatto, moderno",
    hintRsa2048: "Ampia compatibilità",
    hintRsa3072: "RSA più robusto",
    hintRsa4096: "RSA più potente, più lento",
    commentLabel: "Commento",
    commentOptional: "(facoltativo, di solito la tua e-mail)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Generazione nel browser…",
    generateBtn: "Genera coppia di chiavi SSH",
    pubKeyLabel: "Chiave pubblica (OpenSSH)",
    copied: "Copiato",
    copy: "Copia",
    download: "Scarica",
    pubKeyHint: "Incolla questa riga in ~/.ssh/authorized_keys su un server, o nella pagina chiavi SSH di GitHub / GitLab / il tuo cloud provider.",
    privKeyLabel: "Chiave privata (OpenSSH)",
    privKeyHint: "Salva questo file come ~/.ssh/id_{algo} e fai chmod 600. Non condividerla mai. Per aggiungere una passphrase in seguito, esegui ssh-keygen -p -f <file>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% nel tuo browser — la chiave privata non lascia mai questa pagina. Generata con WebCrypto (RSA) e la libreria auditata @noble/curves (Ed25519).",
    generationFailed: "Generazione non riuscita.",
  },
  nl: {
    algoLabel: "Algoritme",
    hintEd25519: "Aanbevolen — snel, klein, modern",
    hintRsa2048: "Brede compatibiliteit",
    hintRsa3072: "Sterkere RSA",
    hintRsa4096: "Sterkste RSA, langzamer",
    commentLabel: "Commentaar",
    commentOptional: "(optioneel, meestal je e-mailadres)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Genereren in je browser…",
    generateBtn: "SSH-sleutelpaar genereren",
    pubKeyLabel: "Publieke sleutel (OpenSSH)",
    copied: "Gekopieerd",
    copy: "Kopiëren",
    download: "Downloaden",
    pubKeyHint: "Plak deze regel in ~/.ssh/authorized_keys op een server, of op de SSH-sleutelpagina van GitHub / GitLab / je cloudprovider.",
    privKeyLabel: "Privésleutel (OpenSSH)",
    privKeyHint: "Sla dit bestand op als ~/.ssh/id_{algo} en voer chmod 600 uit. Deel het nooit. Om later een wachtwoordzin toe te voegen, voer je ssh-keygen -p -f <bestand> uit.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% in je browser — de privésleutel verlaat deze pagina nooit. Gegenereerd met WebCrypto (RSA) en de gecontroleerde @noble/curves-bibliotheek (Ed25519).",
    generationFailed: "Generatie mislukt.",
  },
  ja: {
    algoLabel: "アルゴリズム",
    hintEd25519: "推奨 — 高速、小型、モダン",
    hintRsa2048: "幅広い互換性",
    hintRsa3072: "より強力なRSA",
    hintRsa4096: "最強のRSA、やや遅い",
    commentLabel: "コメント",
    commentOptional: "（任意、通常はメールアドレス）",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "ブラウザで生成中…",
    generateBtn: "SSHキーペアを生成",
    pubKeyLabel: "公開鍵 (OpenSSH)",
    copied: "コピーしました",
    copy: "コピー",
    download: "ダウンロード",
    pubKeyHint: "この1行をサーバーの ~/.ssh/authorized_keys に貼り付けるか、GitHub / GitLab / クラウドプロバイダーのSSHキーページに追加してください。",
    privKeyLabel: "秘密鍵 (OpenSSH)",
    privKeyHint: "このファイルを ~/.ssh/id_{algo} として保存し、chmod 600 を実行してください。絶対に共有しないでください。後でパスフレーズを追加するには ssh-keygen -p -f <ファイル> を実行してください。",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% ブラウザ内で処理 — 秘密鍵はこのページから出ません。WebCrypto (RSA) と監査済み @noble/curves ライブラリ (Ed25519) で生成。",
    generationFailed: "生成に失敗しました。",
  },
  zh: {
    algoLabel: "算法",
    hintEd25519: "推荐 — 快速、紧凑、现代",
    hintRsa2048: "广泛兼容",
    hintRsa3072: "更强的RSA",
    hintRsa4096: "最强RSA，较慢",
    commentLabel: "注释",
    commentOptional: "（可选，通常是您的邮箱）",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "正在浏览器中生成…",
    generateBtn: "生成SSH密钥对",
    pubKeyLabel: "公钥 (OpenSSH)",
    copied: "已复制",
    copy: "复制",
    download: "下载",
    pubKeyHint: "将此行粘贴到服务器的 ~/.ssh/authorized_keys 中，或粘贴到 GitHub / GitLab / 云提供商的SSH密钥页面。",
    privKeyLabel: "私钥 (OpenSSH)",
    privKeyHint: "将此文件保存为 ~/.ssh/id_{algo} 并执行 chmod 600。切勿共享。若要稍后添加密码，请运行 ssh-keygen -p -f <文件>。",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% 在您的浏览器中处理 — 私钥永远不会离开此页面。使用 WebCrypto (RSA) 和经过审计的 @noble/curves 库 (Ed25519) 生成。",
    generationFailed: "生成失败。",
  },
  ko: {
    algoLabel: "알고리즘",
    hintEd25519: "권장 — 빠르고, 작고, 최신",
    hintRsa2048: "넓은 호환성",
    hintRsa3072: "더 강력한 RSA",
    hintRsa4096: "가장 강력한 RSA, 느림",
    commentLabel: "설명",
    commentOptional: "(선택사항, 보통 이메일)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "브라우저에서 생성 중…",
    generateBtn: "SSH 키 쌍 생성",
    pubKeyLabel: "공개키 (OpenSSH)",
    copied: "복사됨",
    copy: "복사",
    download: "다운로드",
    pubKeyHint: "이 한 줄을 서버의 ~/.ssh/authorized_keys에 붙여넣거나 GitHub / GitLab / 클라우드 공급자의 SSH 키 페이지에 추가하세요.",
    privKeyLabel: "개인키 (OpenSSH)",
    privKeyHint: "이 파일을 ~/.ssh/id_{algo}로 저장하고 chmod 600을 실행하세요. 절대 공유하지 마세요. 나중에 암호를 추가하려면 ssh-keygen -p -f <파일>을 실행하세요.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% 브라우저에서 처리 — 개인키는 이 페이지를 벗어나지 않습니다. WebCrypto (RSA) 및 감사된 @noble/curves 라이브러리 (Ed25519)로 생성됩니다.",
    generationFailed: "생성에 실패했습니다.",
  },
  ar: {
    algoLabel: "الخوارزمية",
    hintEd25519: "موصى به — سريع وصغير وحديث",
    hintRsa2048: "توافق واسع",
    hintRsa3072: "RSA أقوى",
    hintRsa4096: "RSA الأقوى، أبطأ",
    commentLabel: "تعليق",
    commentOptional: "(اختياري، عادةً بريدك الإلكتروني)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "جارٍ الإنشاء في متصفحك…",
    generateBtn: "إنشاء زوج مفاتيح SSH",
    pubKeyLabel: "المفتاح العام (OpenSSH)",
    copied: "تم النسخ",
    copy: "نسخ",
    download: "تنزيل",
    pubKeyHint: "الصق هذا السطر في ~/.ssh/authorized_keys على الخادم، أو في صفحة مفاتيح SSH لدى GitHub / GitLab / مزود الحوسبة السحابية.",
    privKeyLabel: "المفتاح الخاص (OpenSSH)",
    privKeyHint: "احفظ هذا الملف باسم ~/.ssh/id_{algo} ونفّذ chmod 600. لا تشاركه أبداً. لإضافة عبارة مرور لاحقاً، نفّذ ssh-keygen -p -f <ملف>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% في متصفحك — المفتاح الخاص لا يغادر هذه الصفحة أبداً. يُولَّد باستخدام WebCrypto (RSA) ومكتبة @noble/curves المُدقَّقة (Ed25519).",
    generationFailed: "فشل الإنشاء.",
  },
  ru: {
    algoLabel: "Алгоритм",
    hintEd25519: "Рекомендуется — быстрый, компактный, современный",
    hintRsa2048: "Широкая совместимость",
    hintRsa3072: "Более надёжный RSA",
    hintRsa4096: "Наиболее надёжный RSA, медленнее",
    commentLabel: "Комментарий",
    commentOptional: "(необязательно, обычно ваш email)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Генерация в браузере…",
    generateBtn: "Сгенерировать SSH-ключевую пару",
    pubKeyLabel: "Публичный ключ (OpenSSH)",
    copied: "Скопировано",
    copy: "Копировать",
    download: "Скачать",
    pubKeyHint: "Вставьте эту строку в ~/.ssh/authorized_keys на сервере или на странице SSH-ключей GitHub / GitLab / вашего облачного провайдера.",
    privKeyLabel: "Приватный ключ (OpenSSH)",
    privKeyHint: "Сохраните файл как ~/.ssh/id_{algo} и выполните chmod 600. Никогда не делитесь им. Чтобы добавить пароль позже, выполните ssh-keygen -p -f <файл>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% в браузере — приватный ключ никогда не покидает эту страницу. Сгенерировано с WebCrypto (RSA) и аудированной библиотекой @noble/curves (Ed25519).",
    generationFailed: "Генерация не удалась.",
  },
  hi: {
    algoLabel: "एल्गोरिदम",
    hintEd25519: "अनुशंसित — तेज़, छोटा, आधुनिक",
    hintRsa2048: "व्यापक संगतता",
    hintRsa3072: "मजबूत RSA",
    hintRsa4096: "सबसे मजबूत RSA, धीमा",
    commentLabel: "टिप्पणी",
    commentOptional: "(वैकल्पिक, आमतौर पर आपका ईमेल)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "आपके ब्राउज़र में उत्पन्न हो रहा है…",
    generateBtn: "SSH कुंजी जोड़ी बनाएं",
    pubKeyLabel: "सार्वजनिक कुंजी (OpenSSH)",
    copied: "कॉपी किया",
    copy: "कॉपी",
    download: "डाउनलोड",
    pubKeyHint: "इस एक पंक्ति को सर्वर पर ~/.ssh/authorized_keys में, या GitHub / GitLab / अपने क्लाउड प्रदाता के SSH-कुंजी पृष्ठ में पेस्ट करें।",
    privKeyLabel: "निजी कुंजी (OpenSSH)",
    privKeyHint: "इस फ़ाइल को ~/.ssh/id_{algo} के रूप में सहेजें और chmod 600 चलाएं। इसे कभी साझा न करें। बाद में पासफ़्रेज़ जोड़ने के लिए ssh-keygen -p -f <फ़ाइल> चलाएं।",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% आपके ब्राउज़र में — निजी कुंजी इस पृष्ठ से कभी बाहर नहीं जाती। WebCrypto (RSA) और ऑडिटेड @noble/curves लाइब्रेरी (Ed25519) से उत्पन्न।",
    generationFailed: "उत्पन्न करने में विफल।",
  },
  tr: {
    algoLabel: "Algoritma",
    hintEd25519: "Önerilen — hızlı, küçük, modern",
    hintRsa2048: "Geniş uyumluluk",
    hintRsa3072: "Daha güçlü RSA",
    hintRsa4096: "En güçlü RSA, daha yavaş",
    commentLabel: "Yorum",
    commentOptional: "(isteğe bağlı, genellikle e-postanız)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Tarayıcınızda oluşturuluyor…",
    generateBtn: "SSH anahtar çifti oluştur",
    pubKeyLabel: "Genel anahtar (OpenSSH)",
    copied: "Kopyalandı",
    copy: "Kopyala",
    download: "İndir",
    pubKeyHint: "Bu satırı sunucuda ~/.ssh/authorized_keys dosyasına veya GitHub / GitLab / bulut sağlayıcınızın SSH anahtarları sayfasına yapıştırın.",
    privKeyLabel: "Özel anahtar (OpenSSH)",
    privKeyHint: "Bu dosyayı ~/.ssh/id_{algo} olarak kaydedin ve chmod 600 çalıştırın. Asla paylaşmayın. Daha sonra parola eklemek için ssh-keygen -p -f <dosya> çalıştırın.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% tarayıcınızda — özel anahtar bu sayfayı asla terk etmez. WebCrypto (RSA) ve denetlenmiş @noble/curves kütüphanesi (Ed25519) ile oluşturulur.",
    generationFailed: "Oluşturma başarısız.",
  },
  id: {
    algoLabel: "Algoritma",
    hintEd25519: "Direkomendasikan — cepat, kecil, modern",
    hintRsa2048: "Kompatibilitas luas",
    hintRsa3072: "RSA lebih kuat",
    hintRsa4096: "RSA paling kuat, lebih lambat",
    commentLabel: "Komentar",
    commentOptional: "(opsional, biasanya email Anda)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Membuat di browser Anda…",
    generateBtn: "Buat pasangan kunci SSH",
    pubKeyLabel: "Kunci publik (OpenSSH)",
    copied: "Disalin",
    copy: "Salin",
    download: "Unduh",
    pubKeyHint: "Tempel baris ini ke ~/.ssh/authorized_keys di server, atau ke halaman kunci SSH di GitHub / GitLab / penyedia cloud Anda.",
    privKeyLabel: "Kunci privat (OpenSSH)",
    privKeyHint: "Simpan file ini sebagai ~/.ssh/id_{algo} dan jalankan chmod 600. Jangan pernah dibagikan. Untuk menambahkan passphrase nanti, jalankan ssh-keygen -p -f <file>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% di browser Anda — kunci privat tidak pernah meninggalkan halaman ini. Dibuat dengan WebCrypto (RSA) dan pustaka @noble/curves yang telah diaudit (Ed25519).",
    generationFailed: "Pembuatan gagal.",
  },
  vi: {
    algoLabel: "Thuật toán",
    hintEd25519: "Được khuyến nghị — nhanh, nhỏ, hiện đại",
    hintRsa2048: "Khả năng tương thích rộng",
    hintRsa3072: "RSA mạnh hơn",
    hintRsa4096: "RSA mạnh nhất, chậm hơn",
    commentLabel: "Nhận xét",
    commentOptional: "(tùy chọn, thường là email của bạn)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Đang tạo trong trình duyệt của bạn…",
    generateBtn: "Tạo cặp khóa SSH",
    pubKeyLabel: "Khóa công khai (OpenSSH)",
    copied: "Đã sao chép",
    copy: "Sao chép",
    download: "Tải xuống",
    pubKeyHint: "Dán dòng này vào ~/.ssh/authorized_keys trên máy chủ, hoặc vào trang khóa SSH của GitHub / GitLab / nhà cung cấp đám mây của bạn.",
    privKeyLabel: "Khóa riêng tư (OpenSSH)",
    privKeyHint: "Lưu tệp này dưới dạng ~/.ssh/id_{algo} và chạy chmod 600. Không bao giờ chia sẻ. Để thêm cụm mật khẩu sau, chạy ssh-keygen -p -f <tệp>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% trong trình duyệt của bạn — khóa riêng tư không bao giờ rời khỏi trang này. Được tạo bằng WebCrypto (RSA) và thư viện @noble/curves đã được kiểm toán (Ed25519).",
    generationFailed: "Tạo khóa thất bại.",
  },
  sv: {
    algoLabel: "Algoritm",
    hintEd25519: "Rekommenderas — snabb, liten, modern",
    hintRsa2048: "Bred kompatibilitet",
    hintRsa3072: "Starkare RSA",
    hintRsa4096: "Starkaste RSA, långsammare",
    commentLabel: "Kommentar",
    commentOptional: "(valfritt, vanligtvis din e-post)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Genererar i din webbläsare…",
    generateBtn: "Generera SSH-nyckelpar",
    pubKeyLabel: "Publik nyckel (OpenSSH)",
    copied: "Kopierat",
    copy: "Kopiera",
    download: "Ladda ner",
    pubKeyHint: "Klistra in den här raden i ~/.ssh/authorized_keys på en server, eller på SSH-nyckelsidan för GitHub / GitLab / din molnleverantör.",
    privKeyLabel: "Privat nyckel (OpenSSH)",
    privKeyHint: "Spara den här filen som ~/.ssh/id_{algo} och kör chmod 600. Dela den aldrig. För att lägga till en lösenfras senare, kör ssh-keygen -p -f <fil>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% i din webbläsare — den privata nyckeln lämnar aldrig den här sidan. Genererad med WebCrypto (RSA) och det granskade @noble/curves-biblioteket (Ed25519).",
    generationFailed: "Genereringen misslyckades.",
  },
  pl: {
    algoLabel: "Algorytm",
    hintEd25519: "Zalecany — szybki, mały, nowoczesny",
    hintRsa2048: "Szeroka kompatybilność",
    hintRsa3072: "Silniejszy RSA",
    hintRsa4096: "Najsilniejszy RSA, wolniejszy",
    commentLabel: "Komentarz",
    commentOptional: "(opcjonalnie, zazwyczaj Twój e-mail)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Generowanie w przeglądarce…",
    generateBtn: "Wygeneruj parę kluczy SSH",
    pubKeyLabel: "Klucz publiczny (OpenSSH)",
    copied: "Skopiowano",
    copy: "Kopiuj",
    download: "Pobierz",
    pubKeyHint: "Wklej tę linię do ~/.ssh/authorized_keys na serwerze lub na stronie kluczy SSH GitHub / GitLab / Twojego dostawcy chmury.",
    privKeyLabel: "Klucz prywatny (OpenSSH)",
    privKeyHint: "Zapisz ten plik jako ~/.ssh/id_{algo} i uruchom chmod 600. Nigdy go nie udostępniaj. Aby dodać hasło później, uruchom ssh-keygen -p -f <plik>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% w Twojej przeglądarce — klucz prywatny nigdy nie opuszcza tej strony. Wygenerowany za pomocą WebCrypto (RSA) i audytowanej biblioteki @noble/curves (Ed25519).",
    generationFailed: "Generowanie nie powiodło się.",
  },
  uk: {
    algoLabel: "Алгоритм",
    hintEd25519: "Рекомендовано — швидкий, компактний, сучасний",
    hintRsa2048: "Широка сумісність",
    hintRsa3072: "Надійніший RSA",
    hintRsa4096: "Найнадійніший RSA, повільніше",
    commentLabel: "Коментар",
    commentOptional: "(необов'язково, зазвичай ваш email)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Генерується у браузері…",
    generateBtn: "Згенерувати SSH-ключову пару",
    pubKeyLabel: "Публічний ключ (OpenSSH)",
    copied: "Скопійовано",
    copy: "Копіювати",
    download: "Завантажити",
    pubKeyHint: "Вставте цей рядок у ~/.ssh/authorized_keys на сервері або на сторінці SSH-ключів GitHub / GitLab / вашого хмарного провайдера.",
    privKeyLabel: "Приватний ключ (OpenSSH)",
    privKeyHint: "Збережіть файл як ~/.ssh/id_{algo} і виконайте chmod 600. Ніколи не діліться ним. Щоб додати пароль пізніше, виконайте ssh-keygen -p -f <файл>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% у вашому браузері — приватний ключ ніколи не покидає цю сторінку. Згенеровано з WebCrypto (RSA) та аудованою бібліотекою @noble/curves (Ed25519).",
    generationFailed: "Генерація не вдалася.",
  },
  cs: {
    algoLabel: "Algoritmus",
    hintEd25519: "Doporučeno — rychlý, malý, moderní",
    hintRsa2048: "Široká kompatibilita",
    hintRsa3072: "Silnější RSA",
    hintRsa4096: "Nejsilnější RSA, pomalejší",
    commentLabel: "Komentář",
    commentOptional: "(volitelně, obvykle váš e-mail)",
    commentPlaceholder: "alice@workstation",
    generatingBtn: "Generování v prohlížeči…",
    generateBtn: "Vygenerovat pár SSH klíčů",
    pubKeyLabel: "Veřejný klíč (OpenSSH)",
    copied: "Zkopírováno",
    copy: "Kopírovat",
    download: "Stáhnout",
    pubKeyHint: "Vložte tento řádek do ~/.ssh/authorized_keys na serveru nebo na stránku SSH klíčů na GitHub / GitLab / vašem poskytovateli cloudu.",
    privKeyLabel: "Soukromý klíč (OpenSSH)",
    privKeyHint: "Uložte tento soubor jako ~/.ssh/id_{algo} a spusťte chmod 600. Nikdy jej nesdílejte. Chcete-li přidat heslo později, spusťte ssh-keygen -p -f <soubor>.",
    privKeyHintEd25519: "ed25519",
    privKeyHintRsa: "rsa",
    footer: "100% ve vašem prohlížeči — soukromý klíč nikdy neopustí tuto stránku. Vygenerováno pomocí WebCrypto (RSA) a auditované knihovny @noble/curves (Ed25519).",
    generationFailed: "Generování selhalo.",
  },
};

type Algo = "ed25519" | "rsa-2048" | "rsa-3072" | "rsa-4096";

export function SshKeyGeneratorClient() {
  const s = T[useLocale()] ?? T.en;

  const ALGOS: { id: Algo; label: string; hint: string }[] = [
    { id: "ed25519", label: "Ed25519", hint: s.hintEd25519 },
    { id: "rsa-2048", label: "RSA 2048", hint: s.hintRsa2048 },
    { id: "rsa-3072", label: "RSA 3072", hint: s.hintRsa3072 },
    { id: "rsa-4096", label: "RSA 4096", hint: s.hintRsa4096 },
  ];

  const [algo, setAlgo] = useState<Algo>("ed25519");
  const [comment, setComment] = useState("");
  const [pub, setPub] = useState("");
  const [priv, setPriv] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"pub" | "priv" | null>(null);

  async function generate() {
    setBusy(true); setError(null); setPub(""); setPriv("");
    try {
      const c = comment.trim();
      const pair = algo === "ed25519"
        ? await generateEd25519SshKey(c)
        : await generateRsaSshKey(Number(algo.slice(4)) as 2048 | 3072 | 4096, c);
      setPub(pair.openSshPublic);
      setPriv(pair.openSshPrivate);
    } catch (e) {
      setError(e instanceof Error ? e.message : s.generationFailed);
    } finally {
      setBusy(false);
    }
  }

  function copy(kind: "pub" | "priv") {
    navigator.clipboard.writeText(kind === "pub" ? pub : priv);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  }

  function download(kind: "pub" | "priv") {
    const isPub = kind === "pub";
    const blob = new Blob([isPub ? pub + "\n" : priv], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isPub
      ? (algo === "ed25519" ? "id_ed25519.pub" : "id_rsa.pub")
      : (algo === "ed25519" ? "id_ed25519" : "id_rsa");
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.algoLabel}</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ALGOS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAlgo(a.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                algo === a.id
                  ? "border-rose-400 bg-rose-50/50"
                  : "border-ink-200 bg-white hover:bg-ink-50"
              }`}
            >
              <div className="text-sm font-semibold text-ink-900">{a.label}</div>
              <div className="mt-0.5 text-xs text-ink-500">{a.hint}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700" htmlFor="ssh-comment">
          {s.commentLabel} <span className="font-normal text-ink-400">{s.commentOptional}</span>
        </label>
        <input
          id="ssh-comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={s.commentPlaceholder}
          spellCheck={false}
          className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <Button onClick={generate} disabled={busy} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
        {busy ? s.generatingBtn : s.generateBtn}
      </Button>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {pub && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{s.pubKeyLabel}</label>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => copy("pub")}>
                {copied === "pub" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "pub" ? s.copied : s.copy}
              </Button>
              <Button size="sm" variant="outline" onClick={() => download("pub")}>
                <Download className="h-3.5 w-3.5" /> {s.download}
              </Button>
            </div>
          </div>
          <textarea
            value={pub}
            readOnly
            spellCheck={false}
            className="h-20 w-full resize-y rounded-lg border border-ink-200 bg-ink-50/50 p-3 font-mono text-[12px] text-ink-900"
          />
          <p className="text-xs text-ink-500">
            {s.pubKeyHint}
          </p>
        </div>
      )}

      {priv && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{s.privKeyLabel}</label>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => copy("priv")}>
                {copied === "priv" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "priv" ? s.copied : s.copy}
              </Button>
              <Button size="sm" variant="outline" onClick={() => download("priv")}>
                <Download className="h-3.5 w-3.5" /> {s.download}
              </Button>
            </div>
          </div>
          <textarea
            value={priv}
            readOnly
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-ink-200 bg-ink-50/50 p-3 font-mono text-[12px] text-ink-900"
          />
          <p className="text-xs text-rose-700">
            {s.privKeyHint.replace("{algo}", algo === "ed25519" ? s.privKeyHintEd25519 : s.privKeyHintRsa)}
          </p>
        </div>
      )}

      <p className="text-xs text-ink-400">{s.footer}</p>
    </div>
  );
}
