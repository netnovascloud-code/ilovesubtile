"use client";

import { useState } from "react";
import { Copy, Check, Lock, Unlock, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { decryptText, encryptText } from "@/lib/aes-text";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    modeEncrypt: "Encrypt",
    modeDecrypt: "Decrypt",
    inputLabelEncrypt: "Plain text",
    inputLabelDecrypt: "Encrypted blob (base64)",
    outputLabelEncrypt: "Encrypted blob (base64)",
    outputLabelDecrypt: "Decrypted text",
    placeholderEncrypt: "Type or paste the message you want to encrypt…",
    placeholderDecrypt: "Paste the base64 ciphertext you received…",
    passwordLabel: "Password",
    passwordPlaceholderEncrypt: "Pick a strong password",
    passwordPlaceholderDecrypt: "Same password used to encrypt",
    ariaHidePassword: "Hide password",
    ariaShowPassword: "Show password",
    passwordHint: "Use a long, unique password. If you lose it the message is unrecoverable — there is no reset.",
    encryptingBtn: "Encrypting…",
    decryptingBtn: "Decrypting…",
    copied: "Copied",
    copy: "Copy",
    operationFailed: "Operation failed.",
    footer: "AES-256-GCM, key derived from your password via PBKDF2-SHA-256 (600 000 iterations, OWASP 2023). 100% in your browser — your message and password never leave the device.",
  },
  fr: {
    modeEncrypt: "Chiffrer",
    modeDecrypt: "Déchiffrer",
    inputLabelEncrypt: "Texte brut",
    inputLabelDecrypt: "Blob chiffré (base64)",
    outputLabelEncrypt: "Blob chiffré (base64)",
    outputLabelDecrypt: "Texte déchiffré",
    placeholderEncrypt: "Saisissez ou collez le message à chiffrer…",
    placeholderDecrypt: "Collez ici le texte chiffré en base64…",
    passwordLabel: "Mot de passe",
    passwordPlaceholderEncrypt: "Choisissez un mot de passe fort",
    passwordPlaceholderDecrypt: "Même mot de passe utilisé pour le chiffrement",
    ariaHidePassword: "Masquer le mot de passe",
    ariaShowPassword: "Afficher le mot de passe",
    passwordHint: "Utilisez un mot de passe long et unique. Si vous le perdez, le message est irrécupérable — il n'y a pas de réinitialisation.",
    encryptingBtn: "Chiffrement…",
    decryptingBtn: "Déchiffrement…",
    copied: "Copié",
    copy: "Copier",
    operationFailed: "Opération échouée.",
    footer: "AES-256-GCM, clé dérivée de votre mot de passe via PBKDF2-SHA-256 (600 000 itérations, OWASP 2023). 100% dans votre navigateur — votre message et mot de passe ne quittent jamais l'appareil.",
  },
  es: {
    modeEncrypt: "Cifrar",
    modeDecrypt: "Descifrar",
    inputLabelEncrypt: "Texto plano",
    inputLabelDecrypt: "Blob cifrado (base64)",
    outputLabelEncrypt: "Blob cifrado (base64)",
    outputLabelDecrypt: "Texto descifrado",
    placeholderEncrypt: "Escribe o pega el mensaje que quieres cifrar…",
    placeholderDecrypt: "Pega aquí el texto cifrado en base64…",
    passwordLabel: "Contraseña",
    passwordPlaceholderEncrypt: "Elige una contraseña fuerte",
    passwordPlaceholderDecrypt: "Misma contraseña usada para cifrar",
    ariaHidePassword: "Ocultar contraseña",
    ariaShowPassword: "Mostrar contraseña",
    passwordHint: "Usa una contraseña larga y única. Si la pierdes, el mensaje es irrecuperable — no hay restablecimiento.",
    encryptingBtn: "Cifrando…",
    decryptingBtn: "Descifrando…",
    copied: "Copiado",
    copy: "Copiar",
    operationFailed: "Operación fallida.",
    footer: "AES-256-GCM, clave derivada de tu contraseña mediante PBKDF2-SHA-256 (600 000 iteraciones, OWASP 2023). 100% en tu navegador — tu mensaje y contraseña nunca abandonan el dispositivo.",
  },
  pt: {
    modeEncrypt: "Criptografar",
    modeDecrypt: "Descriptografar",
    inputLabelEncrypt: "Texto simples",
    inputLabelDecrypt: "Blob criptografado (base64)",
    outputLabelEncrypt: "Blob criptografado (base64)",
    outputLabelDecrypt: "Texto descriptografado",
    placeholderEncrypt: "Digite ou cole a mensagem que deseja criptografar…",
    placeholderDecrypt: "Cole aqui o texto cifrado em base64…",
    passwordLabel: "Senha",
    passwordPlaceholderEncrypt: "Escolha uma senha forte",
    passwordPlaceholderDecrypt: "Mesma senha usada para criptografar",
    ariaHidePassword: "Ocultar senha",
    ariaShowPassword: "Mostrar senha",
    passwordHint: "Use uma senha longa e única. Se perdê-la, a mensagem é irrecuperável — não há redefinição.",
    encryptingBtn: "Criptografando…",
    decryptingBtn: "Descriptografando…",
    copied: "Copiado",
    copy: "Copiar",
    operationFailed: "Operação falhou.",
    footer: "AES-256-GCM, chave derivada da sua senha via PBKDF2-SHA-256 (600 000 iterações, OWASP 2023). 100% no seu navegador — sua mensagem e senha nunca saem do dispositivo.",
  },
  de: {
    modeEncrypt: "Verschlüsseln",
    modeDecrypt: "Entschlüsseln",
    inputLabelEncrypt: "Klartext",
    inputLabelDecrypt: "Verschlüsselter Blob (base64)",
    outputLabelEncrypt: "Verschlüsselter Blob (base64)",
    outputLabelDecrypt: "Entschlüsselter Text",
    placeholderEncrypt: "Nachricht zum Verschlüsseln eingeben oder einfügen…",
    placeholderDecrypt: "Den empfangenen Base64-Chiffretext hier einfügen…",
    passwordLabel: "Passwort",
    passwordPlaceholderEncrypt: "Sicheres Passwort wählen",
    passwordPlaceholderDecrypt: "Gleiches Passwort wie beim Verschlüsseln",
    ariaHidePassword: "Passwort verbergen",
    ariaShowPassword: "Passwort anzeigen",
    passwordHint: "Verwende ein langes, einzigartiges Passwort. Wenn du es verlierst, ist die Nachricht unwiederbringlich verloren — es gibt kein Zurücksetzen.",
    encryptingBtn: "Wird verschlüsselt…",
    decryptingBtn: "Wird entschlüsselt…",
    copied: "Kopiert",
    copy: "Kopieren",
    operationFailed: "Vorgang fehlgeschlagen.",
    footer: "AES-256-GCM, Schlüssel aus deinem Passwort via PBKDF2-SHA-256 (600 000 Iterationen, OWASP 2023) abgeleitet. 100% in deinem Browser — deine Nachricht und dein Passwort verlassen das Gerät nie.",
  },
  it: {
    modeEncrypt: "Cifra",
    modeDecrypt: "Decifra",
    inputLabelEncrypt: "Testo in chiaro",
    inputLabelDecrypt: "Blob cifrato (base64)",
    outputLabelEncrypt: "Blob cifrato (base64)",
    outputLabelDecrypt: "Testo decifrato",
    placeholderEncrypt: "Digita o incolla il messaggio da cifrare…",
    placeholderDecrypt: "Incolla qui il testo cifrato in base64…",
    passwordLabel: "Password",
    passwordPlaceholderEncrypt: "Scegli una password robusta",
    passwordPlaceholderDecrypt: "Stessa password usata per cifrare",
    ariaHidePassword: "Nascondi password",
    ariaShowPassword: "Mostra password",
    passwordHint: "Usa una password lunga e unica. Se la perdi il messaggio è irrecuperabile — non esiste ripristino.",
    encryptingBtn: "Cifratura in corso…",
    decryptingBtn: "Decifratura in corso…",
    copied: "Copiato",
    copy: "Copia",
    operationFailed: "Operazione non riuscita.",
    footer: "AES-256-GCM, chiave derivata dalla password tramite PBKDF2-SHA-256 (600 000 iterazioni, OWASP 2023). 100% nel tuo browser — messaggio e password non lasciano mai il dispositivo.",
  },
  nl: {
    modeEncrypt: "Versleutelen",
    modeDecrypt: "Ontsleutelen",
    inputLabelEncrypt: "Leesbare tekst",
    inputLabelDecrypt: "Versleutelde blob (base64)",
    outputLabelEncrypt: "Versleutelde blob (base64)",
    outputLabelDecrypt: "Ontsleutelde tekst",
    placeholderEncrypt: "Typ of plak het bericht dat je wilt versleutelen…",
    placeholderDecrypt: "Plak hier de ontvangen base64-cijfertekst…",
    passwordLabel: "Wachtwoord",
    passwordPlaceholderEncrypt: "Kies een sterk wachtwoord",
    passwordPlaceholderDecrypt: "Hetzelfde wachtwoord als bij versleuteling",
    ariaHidePassword: "Wachtwoord verbergen",
    ariaShowPassword: "Wachtwoord tonen",
    passwordHint: "Gebruik een lang, uniek wachtwoord. Als je het verliest, is het bericht onherstelbaar — er is geen hersteloptie.",
    encryptingBtn: "Versleutelen…",
    decryptingBtn: "Ontsleutelen…",
    copied: "Gekopieerd",
    copy: "Kopiëren",
    operationFailed: "Bewerking mislukt.",
    footer: "AES-256-GCM, sleutel afgeleid van je wachtwoord via PBKDF2-SHA-256 (600 000 iteraties, OWASP 2023). 100% in je browser — je bericht en wachtwoord verlaten het apparaat nooit.",
  },
  ja: {
    modeEncrypt: "暗号化",
    modeDecrypt: "復号化",
    inputLabelEncrypt: "平文",
    inputLabelDecrypt: "暗号化されたBlob (base64)",
    outputLabelEncrypt: "暗号化されたBlob (base64)",
    outputLabelDecrypt: "復号されたテキスト",
    placeholderEncrypt: "暗号化したいメッセージを入力または貼り付けてください…",
    placeholderDecrypt: "受け取ったbase64暗号文を貼り付けてください…",
    passwordLabel: "パスワード",
    passwordPlaceholderEncrypt: "強力なパスワードを選択してください",
    passwordPlaceholderDecrypt: "暗号化に使用したパスワード",
    ariaHidePassword: "パスワードを非表示",
    ariaShowPassword: "パスワードを表示",
    passwordHint: "長くてユニークなパスワードを使用してください。紛失した場合、メッセージは復元不能です — リセット機能はありません。",
    encryptingBtn: "暗号化中…",
    decryptingBtn: "復号化中…",
    copied: "コピーしました",
    copy: "コピー",
    operationFailed: "操作に失敗しました。",
    footer: "AES-256-GCM、パスワードからPBKDF2-SHA-256（600,000回反復、OWASP 2023）でキーを導出。100%ブラウザ内処理 — メッセージとパスワードはデバイスから出ません。",
  },
  zh: {
    modeEncrypt: "加密",
    modeDecrypt: "解密",
    inputLabelEncrypt: "明文",
    inputLabelDecrypt: "加密数据 (base64)",
    outputLabelEncrypt: "加密数据 (base64)",
    outputLabelDecrypt: "解密后的文本",
    placeholderEncrypt: "输入或粘贴要加密的消息…",
    placeholderDecrypt: "粘贴收到的base64密文…",
    passwordLabel: "密码",
    passwordPlaceholderEncrypt: "选择一个强密码",
    passwordPlaceholderDecrypt: "与加密时相同的密码",
    ariaHidePassword: "隐藏密码",
    ariaShowPassword: "显示密码",
    passwordHint: "使用长且唯一的密码。如果丢失，消息将无法恢复 — 没有重置选项。",
    encryptingBtn: "加密中…",
    decryptingBtn: "解密中…",
    copied: "已复制",
    copy: "复制",
    operationFailed: "操作失败。",
    footer: "AES-256-GCM，通过PBKDF2-SHA-256（600,000次迭代，OWASP 2023）从密码派生密钥。100%在您的浏览器中处理 — 消息和密码永远不会离开设备。",
  },
  ko: {
    modeEncrypt: "암호화",
    modeDecrypt: "복호화",
    inputLabelEncrypt: "평문",
    inputLabelDecrypt: "암호화된 Blob (base64)",
    outputLabelEncrypt: "암호화된 Blob (base64)",
    outputLabelDecrypt: "복호화된 텍스트",
    placeholderEncrypt: "암호화할 메시지를 입력하거나 붙여넣으세요…",
    placeholderDecrypt: "받은 base64 암호문을 붙여넣으세요…",
    passwordLabel: "비밀번호",
    passwordPlaceholderEncrypt: "강력한 비밀번호를 선택하세요",
    passwordPlaceholderDecrypt: "암호화에 사용한 것과 동일한 비밀번호",
    ariaHidePassword: "비밀번호 숨기기",
    ariaShowPassword: "비밀번호 표시",
    passwordHint: "길고 고유한 비밀번호를 사용하세요. 잃어버리면 메시지를 복구할 수 없습니다 — 재설정 기능이 없습니다.",
    encryptingBtn: "암호화 중…",
    decryptingBtn: "복호화 중…",
    copied: "복사됨",
    copy: "복사",
    operationFailed: "작업에 실패했습니다.",
    footer: "AES-256-GCM, PBKDF2-SHA-256(600,000 반복, OWASP 2023)을 통해 비밀번호에서 파생된 키. 100% 브라우저에서 처리 — 메시지와 비밀번호는 장치를 벗어나지 않습니다.",
  },
  ar: {
    modeEncrypt: "تشفير",
    modeDecrypt: "فك التشفير",
    inputLabelEncrypt: "نص عادي",
    inputLabelDecrypt: "بيانات مشفّرة (base64)",
    outputLabelEncrypt: "بيانات مشفّرة (base64)",
    outputLabelDecrypt: "النص بعد فك التشفير",
    placeholderEncrypt: "اكتب أو الصق الرسالة التي تريد تشفيرها…",
    placeholderDecrypt: "الصق هنا النص المشفّر بصيغة base64…",
    passwordLabel: "كلمة المرور",
    passwordPlaceholderEncrypt: "اختر كلمة مرور قوية",
    passwordPlaceholderDecrypt: "نفس كلمة المرور المستخدمة للتشفير",
    ariaHidePassword: "إخفاء كلمة المرور",
    ariaShowPassword: "إظهار كلمة المرور",
    passwordHint: "استخدم كلمة مرور طويلة وفريدة. إذا فقدتها، ستصبح الرسالة غير قابلة للاسترداد — لا يوجد إعادة تعيين.",
    encryptingBtn: "جارٍ التشفير…",
    decryptingBtn: "جارٍ فك التشفير…",
    copied: "تم النسخ",
    copy: "نسخ",
    operationFailed: "فشلت العملية.",
    footer: "AES-256-GCM، مفتاح مشتق من كلمة مرورك عبر PBKDF2-SHA-256 (600 000 تكرار، OWASP 2023). 100% في متصفحك — رسالتك وكلمة مرورك لا تغادران الجهاز أبدًا.",
  },
  ru: {
    modeEncrypt: "Зашифровать",
    modeDecrypt: "Расшифровать",
    inputLabelEncrypt: "Открытый текст",
    inputLabelDecrypt: "Зашифрованный блоб (base64)",
    outputLabelEncrypt: "Зашифрованный блоб (base64)",
    outputLabelDecrypt: "Расшифрованный текст",
    placeholderEncrypt: "Введите или вставьте сообщение для шифрования…",
    placeholderDecrypt: "Вставьте полученный base64-шифротекст…",
    passwordLabel: "Пароль",
    passwordPlaceholderEncrypt: "Выберите надёжный пароль",
    passwordPlaceholderDecrypt: "Тот же пароль, что при шифровании",
    ariaHidePassword: "Скрыть пароль",
    ariaShowPassword: "Показать пароль",
    passwordHint: "Используйте длинный уникальный пароль. Если забудете его, сообщение восстановить невозможно — сброса не существует.",
    encryptingBtn: "Шифрование…",
    decryptingBtn: "Расшифровка…",
    copied: "Скопировано",
    copy: "Копировать",
    operationFailed: "Операция не удалась.",
    footer: "AES-256-GCM, ключ выводится из пароля через PBKDF2-SHA-256 (600 000 итераций, OWASP 2023). 100% в браузере — сообщение и пароль никогда не покидают устройство.",
  },
  hi: {
    modeEncrypt: "एन्क्रिप्ट",
    modeDecrypt: "डिक्रिप्ट",
    inputLabelEncrypt: "सादा पाठ",
    inputLabelDecrypt: "एन्क्रिप्टेड डेटा (base64)",
    outputLabelEncrypt: "एन्क्रिप्टेड डेटा (base64)",
    outputLabelDecrypt: "डिक्रिप्टेड टेक्स्ट",
    placeholderEncrypt: "एन्क्रिप्ट करने के लिए संदेश टाइप या पेस्ट करें…",
    placeholderDecrypt: "प्राप्त base64 सिफरटेक्स्ट यहाँ पेस्ट करें…",
    passwordLabel: "पासवर्ड",
    passwordPlaceholderEncrypt: "एक मजबूत पासवर्ड चुनें",
    passwordPlaceholderDecrypt: "एन्क्रिप्ट करने के लिए उपयोग किया गया वही पासवर्ड",
    ariaHidePassword: "पासवर्ड छिपाएं",
    ariaShowPassword: "पासवर्ड दिखाएं",
    passwordHint: "एक लंबा, अद्वितीय पासवर्ड उपयोग करें। यदि आप इसे खो देते हैं तो संदेश अपुनर्प्राप्य है — कोई रीसेट नहीं है।",
    encryptingBtn: "एन्क्रिप्ट हो रहा है…",
    decryptingBtn: "डिक्रिप्ट हो रहा है…",
    copied: "कॉपी किया",
    copy: "कॉपी",
    operationFailed: "ऑपरेशन विफल।",
    footer: "AES-256-GCM, PBKDF2-SHA-256 (600,000 पुनरावृत्तियां, OWASP 2023) के माध्यम से आपके पासवर्ड से कुंजी प्राप्त की। 100% आपके ब्राउज़र में — आपका संदेश और पासवर्ड कभी भी डिवाइस नहीं छोड़ते।",
  },
  tr: {
    modeEncrypt: "Şifrele",
    modeDecrypt: "Şifreyi Çöz",
    inputLabelEncrypt: "Düz metin",
    inputLabelDecrypt: "Şifreli blob (base64)",
    outputLabelEncrypt: "Şifreli blob (base64)",
    outputLabelDecrypt: "Şifresi çözülmüş metin",
    placeholderEncrypt: "Şifrelemek istediğiniz mesajı yazın veya yapıştırın…",
    placeholderDecrypt: "Aldığınız base64 şifreli metni buraya yapıştırın…",
    passwordLabel: "Şifre",
    passwordPlaceholderEncrypt: "Güçlü bir şifre seçin",
    passwordPlaceholderDecrypt: "Şifrelemede kullanılan aynı şifre",
    ariaHidePassword: "Şifreyi gizle",
    ariaShowPassword: "Şifreyi göster",
    passwordHint: "Uzun ve benzersiz bir şifre kullanın. Kaybederseniz mesaj kurtarılamaz — sıfırlama yoktur.",
    encryptingBtn: "Şifreleniyor…",
    decryptingBtn: "Şifre çözülüyor…",
    copied: "Kopyalandı",
    copy: "Kopyala",
    operationFailed: "İşlem başarısız.",
    footer: "AES-256-GCM, şifrenizden PBKDF2-SHA-256 (600.000 iterasyon, OWASP 2023) ile türetilen anahtar. 100% tarayıcınızda — mesajınız ve şifreniz cihazı asla terk etmez.",
  },
  id: {
    modeEncrypt: "Enkripsi",
    modeDecrypt: "Dekripsi",
    inputLabelEncrypt: "Teks biasa",
    inputLabelDecrypt: "Blob terenkripsi (base64)",
    outputLabelEncrypt: "Blob terenkripsi (base64)",
    outputLabelDecrypt: "Teks terdekripsi",
    placeholderEncrypt: "Ketik atau tempel pesan yang ingin Anda enkripsi…",
    placeholderDecrypt: "Tempel teks sandi base64 yang Anda terima…",
    passwordLabel: "Kata sandi",
    passwordPlaceholderEncrypt: "Pilih kata sandi yang kuat",
    passwordPlaceholderDecrypt: "Kata sandi yang sama digunakan untuk enkripsi",
    ariaHidePassword: "Sembunyikan kata sandi",
    ariaShowPassword: "Tampilkan kata sandi",
    passwordHint: "Gunakan kata sandi yang panjang dan unik. Jika hilang, pesan tidak dapat dipulihkan — tidak ada reset.",
    encryptingBtn: "Mengenkripsi…",
    decryptingBtn: "Mendekripsi…",
    copied: "Disalin",
    copy: "Salin",
    operationFailed: "Operasi gagal.",
    footer: "AES-256-GCM, kunci diturunkan dari kata sandi Anda melalui PBKDF2-SHA-256 (600.000 iterasi, OWASP 2023). 100% di browser Anda — pesan dan kata sandi tidak pernah meninggalkan perangkat.",
  },
  vi: {
    modeEncrypt: "Mã hóa",
    modeDecrypt: "Giải mã",
    inputLabelEncrypt: "Văn bản thuần",
    inputLabelDecrypt: "Dữ liệu đã mã hóa (base64)",
    outputLabelEncrypt: "Dữ liệu đã mã hóa (base64)",
    outputLabelDecrypt: "Văn bản đã giải mã",
    placeholderEncrypt: "Nhập hoặc dán tin nhắn bạn muốn mã hóa…",
    placeholderDecrypt: "Dán văn bản mã hóa base64 bạn nhận được vào đây…",
    passwordLabel: "Mật khẩu",
    passwordPlaceholderEncrypt: "Chọn mật khẩu mạnh",
    passwordPlaceholderDecrypt: "Mật khẩu giống như khi mã hóa",
    ariaHidePassword: "Ẩn mật khẩu",
    ariaShowPassword: "Hiển thị mật khẩu",
    passwordHint: "Sử dụng mật khẩu dài và duy nhất. Nếu mất, tin nhắn không thể phục hồi — không có tùy chọn đặt lại.",
    encryptingBtn: "Đang mã hóa…",
    decryptingBtn: "Đang giải mã…",
    copied: "Đã sao chép",
    copy: "Sao chép",
    operationFailed: "Thao tác thất bại.",
    footer: "AES-256-GCM, khóa được dẫn xuất từ mật khẩu của bạn qua PBKDF2-SHA-256 (600.000 vòng lặp, OWASP 2023). 100% trong trình duyệt của bạn — tin nhắn và mật khẩu không bao giờ rời thiết bị.",
  },
  sv: {
    modeEncrypt: "Kryptera",
    modeDecrypt: "Dekryptera",
    inputLabelEncrypt: "Klartext",
    inputLabelDecrypt: "Krypterad blob (base64)",
    outputLabelEncrypt: "Krypterad blob (base64)",
    outputLabelDecrypt: "Dekrypterad text",
    placeholderEncrypt: "Skriv eller klistra in meddelandet du vill kryptera…",
    placeholderDecrypt: "Klistra in den mottagna base64-chiffertexten här…",
    passwordLabel: "Lösenord",
    passwordPlaceholderEncrypt: "Välj ett starkt lösenord",
    passwordPlaceholderDecrypt: "Samma lösenord som användes vid kryptering",
    ariaHidePassword: "Dölj lösenord",
    ariaShowPassword: "Visa lösenord",
    passwordHint: "Använd ett långt, unikt lösenord. Om du förlorar det är meddelandet oåterkalleligt — det finns ingen återställning.",
    encryptingBtn: "Krypterar…",
    decryptingBtn: "Dekrypterar…",
    copied: "Kopierat",
    copy: "Kopiera",
    operationFailed: "Åtgärden misslyckades.",
    footer: "AES-256-GCM, nyckel härledd från ditt lösenord via PBKDF2-SHA-256 (600 000 iterationer, OWASP 2023). 100% i din webbläsare — ditt meddelande och lösenord lämnar aldrig enheten.",
  },
  pl: {
    modeEncrypt: "Zaszyfruj",
    modeDecrypt: "Odszyfruj",
    inputLabelEncrypt: "Tekst jawny",
    inputLabelDecrypt: "Zaszyfrowany blob (base64)",
    outputLabelEncrypt: "Zaszyfrowany blob (base64)",
    outputLabelDecrypt: "Odszyfrowany tekst",
    placeholderEncrypt: "Wpisz lub wklej wiadomość do zaszyfrowania…",
    placeholderDecrypt: "Wklej tutaj otrzymany base64 szyfrogram…",
    passwordLabel: "Hasło",
    passwordPlaceholderEncrypt: "Wybierz silne hasło",
    passwordPlaceholderDecrypt: "To samo hasło użyte do szyfrowania",
    ariaHidePassword: "Ukryj hasło",
    ariaShowPassword: "Pokaż hasło",
    passwordHint: "Użyj długiego, unikalnego hasła. Jeśli je stracisz, wiadomość jest nieodwracalna — nie ma opcji resetowania.",
    encryptingBtn: "Szyfrowanie…",
    decryptingBtn: "Odszyfrowanie…",
    copied: "Skopiowano",
    copy: "Kopiuj",
    operationFailed: "Operacja nie powiodła się.",
    footer: "AES-256-GCM, klucz wyprowadzany z hasła przez PBKDF2-SHA-256 (600 000 iteracji, OWASP 2023). 100% w Twojej przeglądarce — wiadomość i hasło nigdy nie opuszczają urządzenia.",
  },
  uk: {
    modeEncrypt: "Зашифрувати",
    modeDecrypt: "Розшифрувати",
    inputLabelEncrypt: "Відкритий текст",
    inputLabelDecrypt: "Зашифрований блоб (base64)",
    outputLabelEncrypt: "Зашифрований блоб (base64)",
    outputLabelDecrypt: "Розшифрований текст",
    placeholderEncrypt: "Введіть або вставте повідомлення для шифрування…",
    placeholderDecrypt: "Вставте отриманий base64-шифротекст…",
    passwordLabel: "Пароль",
    passwordPlaceholderEncrypt: "Оберіть надійний пароль",
    passwordPlaceholderDecrypt: "Той самий пароль, що при шифруванні",
    ariaHidePassword: "Приховати пароль",
    ariaShowPassword: "Показати пароль",
    passwordHint: "Використовуйте довгий унікальний пароль. Якщо забудете його, повідомлення не відновити — скидання не передбачено.",
    encryptingBtn: "Шифрування…",
    decryptingBtn: "Розшифровка…",
    copied: "Скопійовано",
    copy: "Копіювати",
    operationFailed: "Операція не вдалася.",
    footer: "AES-256-GCM, ключ виводиться з пароля через PBKDF2-SHA-256 (600 000 ітерацій, OWASP 2023). 100% у браузері — повідомлення і пароль ніколи не покидають пристрій.",
  },
  cs: {
    modeEncrypt: "Zašifrovat",
    modeDecrypt: "Dešifrovat",
    inputLabelEncrypt: "Otevřený text",
    inputLabelDecrypt: "Zašifrovaný blob (base64)",
    outputLabelEncrypt: "Zašifrovaný blob (base64)",
    outputLabelDecrypt: "Dešifrovaný text",
    placeholderEncrypt: "Napište nebo vložte zprávu, kterou chcete zašifrovat…",
    placeholderDecrypt: "Sem vložte přijatý base64 šifrový text…",
    passwordLabel: "Heslo",
    passwordPlaceholderEncrypt: "Zvolte silné heslo",
    passwordPlaceholderDecrypt: "Stejné heslo použité při šifrování",
    ariaHidePassword: "Skrýt heslo",
    ariaShowPassword: "Zobrazit heslo",
    passwordHint: "Použijte dlouhé, unikátní heslo. Pokud ho ztratíte, zpráva je neobnovitelná — neexistuje žádné resetování.",
    encryptingBtn: "Šifrování…",
    decryptingBtn: "Dešifrování…",
    copied: "Zkopírováno",
    copy: "Kopírovat",
    operationFailed: "Operace selhala.",
    footer: "AES-256-GCM, klíč odvozený z vašeho hesla přes PBKDF2-SHA-256 (600 000 iterací, OWASP 2023). 100% ve vašem prohlížeči — vaše zpráva a heslo nikdy neopustí zařízení.",
  },
};

type Mode = "encrypt" | "decrypt";

export function TextEncryptorClient() {
  const s = T[useLocale()] ?? T.en;
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run() {
    setBusy(true); setError(null); setOutput("");
    try {
      const fn = mode === "encrypt" ? encryptText : decryptText;
      setOutput(await fn(input, password));
    } catch (e) {
      setError(e instanceof Error ? e.message : s.operationFailed);
    } finally {
      setBusy(false);
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const inputLabel = mode === "encrypt" ? s.inputLabelEncrypt : s.inputLabelDecrypt;
  const outputLabel = mode === "encrypt" ? s.outputLabelEncrypt : s.outputLabelDecrypt;
  const inputPlaceholder = mode === "encrypt" ? s.placeholderEncrypt : s.placeholderDecrypt;
  const CtaIcon = mode === "encrypt" ? Lock : Unlock;

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["encrypt", "decrypt"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setInput(""); setOutput(""); setError(null); }}
            className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === m ? "bg-rose-500 text-white" : "text-ink-600 hover:text-ink-900"
            }`}
          >
            {m === "encrypt" ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {m === "encrypt" ? s.modeEncrypt : s.modeDecrypt}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{inputLabel}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          spellCheck={false}
          className="h-44 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-[13px] text-ink-900 placeholder:text-ink-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700" htmlFor="aes-pwd">
          {s.passwordLabel}
        </label>
        <div className="relative">
          <input
            id="aes-pwd"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "encrypt" ? s.passwordPlaceholderEncrypt : s.passwordPlaceholderDecrypt}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 pr-10 text-sm text-ink-900 placeholder:text-ink-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? s.ariaHidePassword : s.ariaShowPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ink-400 hover:text-ink-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {mode === "encrypt" && (
          <p className="mt-1.5 text-xs text-ink-500">{s.passwordHint}</p>
        )}
      </div>

      <Button onClick={run} disabled={busy || !input || !password} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CtaIcon className="h-4 w-4" />}
        {busy
          ? (mode === "encrypt" ? s.encryptingBtn : s.decryptingBtn)
          : (mode === "encrypt" ? s.modeEncrypt : s.modeDecrypt)}
      </Button>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{outputLabel}</label>
            <Button size="sm" variant="outline" onClick={copy}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? s.copied : s.copy}
            </Button>
          </div>
          <textarea
            value={output}
            readOnly
            spellCheck={false}
            className="h-44 w-full resize-y rounded-lg border border-ink-200 bg-ink-50/50 p-3 font-mono text-[13px] text-ink-900"
          />
        </div>
      )}

      <p className="text-xs text-ink-400">{s.footer}</p>
    </div>
  );
}
