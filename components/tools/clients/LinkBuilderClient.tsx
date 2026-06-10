"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Mail, Wifi, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    tab_email: "Email",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Phone",
    mailto_to: "To",
    mailto_cc: "Cc (optional)",
    mailto_subject: "Subject",
    mailto_body: "Body",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "Hello!",
    mailto_body_ph: "Pre-filled message…",
    wifi_ssid: "Network name (SSID)",
    wifi_ssid_ph: "MyWiFi",
    wifi_security: "Security",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "No password",
    wifi_password: "Password",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Hidden network",
    wifi_hint: "Paste this into the QR Code Generator to make a \"scan to connect\" Wi-Fi code.",
    sms_phone: "Phone number",
    sms_phone_ph: "+1 555 123 4567",
    sms_message: "Pre-filled message (optional)",
    sms_message_ph: "Hi there…",
    tel_phone: "Phone number",
    tel_phone_ph: "+1 555 123 4567",
    privacy_note: "Built in your browser — nothing is uploaded.",
    result_label: "Your link",
    result_copied: "Copied",
    result_copy: "Copy",
  },
  fr: {
    tab_email: "E-mail",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Téléphone",
    mailto_to: "À",
    mailto_cc: "Cc (facultatif)",
    mailto_subject: "Objet",
    mailto_body: "Corps du message",
    mailto_to_ph: "nom@exemple.com",
    mailto_cc_ph: "autre@exemple.com",
    mailto_subject_ph: "Bonjour !",
    mailto_body_ph: "Message prérempli…",
    wifi_ssid: "Nom du réseau (SSID)",
    wifi_ssid_ph: "MonWiFi",
    wifi_security: "Sécurité",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Sans mot de passe",
    wifi_password: "Mot de passe",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Réseau masqué",
    wifi_hint: "Collez ceci dans le générateur de QR Code pour créer un code Wi-Fi \"scanner pour se connecter\".",
    sms_phone: "Numéro de téléphone",
    sms_phone_ph: "+33 6 12 34 56 78",
    sms_message: "Message prérempli (facultatif)",
    sms_message_ph: "Bonjour…",
    tel_phone: "Numéro de téléphone",
    tel_phone_ph: "+33 6 12 34 56 78",
    privacy_note: "Construit dans votre navigateur — rien n'est téléchargé.",
    result_label: "Votre lien",
    result_copied: "Copié",
    result_copy: "Copier",
  },
  es: {
    tab_email: "Correo",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Teléfono",
    mailto_to: "Para",
    mailto_cc: "Cc (opcional)",
    mailto_subject: "Asunto",
    mailto_body: "Cuerpo",
    mailto_to_ph: "nombre@ejemplo.com",
    mailto_cc_ph: "otro@ejemplo.com",
    mailto_subject_ph: "¡Hola!",
    mailto_body_ph: "Mensaje predefinido…",
    wifi_ssid: "Nombre de red (SSID)",
    wifi_ssid_ph: "MiWiFi",
    wifi_security: "Seguridad",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Sin contraseña",
    wifi_password: "Contraseña",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Red oculta",
    wifi_hint: "Pega esto en el generador de códigos QR para crear un código Wi-Fi \"escanear para conectar\".",
    sms_phone: "Número de teléfono",
    sms_phone_ph: "+34 600 123 456",
    sms_message: "Mensaje predefinido (opcional)",
    sms_message_ph: "Hola…",
    tel_phone: "Número de teléfono",
    tel_phone_ph: "+34 600 123 456",
    privacy_note: "Construido en tu navegador — nada se sube.",
    result_label: "Tu enlace",
    result_copied: "Copiado",
    result_copy: "Copiar",
  },
  pt: {
    tab_email: "E-mail",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telefone",
    mailto_to: "Para",
    mailto_cc: "Cc (opcional)",
    mailto_subject: "Assunto",
    mailto_body: "Corpo",
    mailto_to_ph: "nome@exemplo.com",
    mailto_cc_ph: "outro@exemplo.com",
    mailto_subject_ph: "Olá!",
    mailto_body_ph: "Mensagem pré-preenchida…",
    wifi_ssid: "Nome da rede (SSID)",
    wifi_ssid_ph: "MinhaWiFi",
    wifi_security: "Segurança",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Sem senha",
    wifi_password: "Senha",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Rede oculta",
    wifi_hint: "Cole isso no gerador de QR Code para criar um código Wi-Fi \"escanear para conectar\".",
    sms_phone: "Número de telefone",
    sms_phone_ph: "+55 11 91234-5678",
    sms_message: "Mensagem pré-preenchida (opcional)",
    sms_message_ph: "Olá…",
    tel_phone: "Número de telefone",
    tel_phone_ph: "+55 11 91234-5678",
    privacy_note: "Criado no seu navegador — nada é enviado.",
    result_label: "Seu link",
    result_copied: "Copiado",
    result_copy: "Copiar",
  },
  de: {
    tab_email: "E-Mail",
    tab_wifi: "WLAN",
    tab_sms: "SMS",
    tab_phone: "Telefon",
    mailto_to: "An",
    mailto_cc: "Cc (optional)",
    mailto_subject: "Betreff",
    mailto_body: "Nachricht",
    mailto_to_ph: "name@beispiel.de",
    mailto_cc_ph: "andere@beispiel.de",
    mailto_subject_ph: "Hallo!",
    mailto_body_ph: "Vorausgefüllte Nachricht…",
    wifi_ssid: "Netzwerkname (SSID)",
    wifi_ssid_ph: "MeinWLAN",
    wifi_security: "Sicherheit",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Kein Passwort",
    wifi_password: "Passwort",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Verstecktes Netzwerk",
    wifi_hint: "Füge dies in den QR-Code-Generator ein, um einen WLAN-Code zum \"Scannen zum Verbinden\" zu erstellen.",
    sms_phone: "Telefonnummer",
    sms_phone_ph: "+49 151 1234567",
    sms_message: "Vorausgefüllte Nachricht (optional)",
    sms_message_ph: "Hallo…",
    tel_phone: "Telefonnummer",
    tel_phone_ph: "+49 151 1234567",
    privacy_note: "In deinem Browser erstellt — nichts wird hochgeladen.",
    result_label: "Dein Link",
    result_copied: "Kopiert",
    result_copy: "Kopieren",
  },
  it: {
    tab_email: "Email",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telefono",
    mailto_to: "A",
    mailto_cc: "Cc (opzionale)",
    mailto_subject: "Oggetto",
    mailto_body: "Corpo",
    mailto_to_ph: "nome@esempio.it",
    mailto_cc_ph: "altro@esempio.it",
    mailto_subject_ph: "Ciao!",
    mailto_body_ph: "Messaggio precompilato…",
    wifi_ssid: "Nome rete (SSID)",
    wifi_ssid_ph: "MiaRete",
    wifi_security: "Sicurezza",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Nessuna password",
    wifi_password: "Password",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Rete nascosta",
    wifi_hint: "Incolla questo nel generatore di QR Code per creare un codice Wi-Fi \"scansiona per connettere\".",
    sms_phone: "Numero di telefono",
    sms_phone_ph: "+39 320 123 4567",
    sms_message: "Messaggio precompilato (opzionale)",
    sms_message_ph: "Ciao…",
    tel_phone: "Numero di telefono",
    tel_phone_ph: "+39 320 123 4567",
    privacy_note: "Creato nel tuo browser — niente viene caricato.",
    result_label: "Il tuo link",
    result_copied: "Copiato",
    result_copy: "Copia",
  },
  nl: {
    tab_email: "E-mail",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telefoon",
    mailto_to: "Aan",
    mailto_cc: "Cc (optioneel)",
    mailto_subject: "Onderwerp",
    mailto_body: "Bericht",
    mailto_to_ph: "naam@voorbeeld.nl",
    mailto_cc_ph: "ander@voorbeeld.nl",
    mailto_subject_ph: "Hallo!",
    mailto_body_ph: "Vooraf ingevuld bericht…",
    wifi_ssid: "Netwerknaam (SSID)",
    wifi_ssid_ph: "MijnWiFi",
    wifi_security: "Beveiliging",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Geen wachtwoord",
    wifi_password: "Wachtwoord",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Verborgen netwerk",
    wifi_hint: "Plak dit in de QR-codegenerator om een ​​Wi-Fi-code te maken voor \"scannen om te verbinden\".",
    sms_phone: "Telefoonnummer",
    sms_phone_ph: "+31 6 1234 5678",
    sms_message: "Vooraf ingevuld bericht (optioneel)",
    sms_message_ph: "Hallo…",
    tel_phone: "Telefoonnummer",
    tel_phone_ph: "+31 6 1234 5678",
    privacy_note: "In je browser gebouwd — niets wordt geüpload.",
    result_label: "Je link",
    result_copied: "Gekopieerd",
    result_copy: "Kopiëren",
  },
  ja: {
    tab_email: "メール",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "電話",
    mailto_to: "宛先",
    mailto_cc: "Cc（任意）",
    mailto_subject: "件名",
    mailto_body: "本文",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "こんにちは！",
    mailto_body_ph: "事前入力メッセージ…",
    wifi_ssid: "ネットワーク名（SSID）",
    wifi_ssid_ph: "MyWiFi",
    wifi_security: "セキュリティ",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "パスワードなし",
    wifi_password: "パスワード",
    wifi_password_ph: "••••••••",
    wifi_hidden: "非公開ネットワーク",
    wifi_hint: "QRコードジェネレーターにこれを貼り付けて「スキャンして接続」Wi-Fiコードを作成します。",
    sms_phone: "電話番号",
    sms_phone_ph: "+81 90 1234 5678",
    sms_message: "事前入力メッセージ（任意）",
    sms_message_ph: "こんにちは…",
    tel_phone: "電話番号",
    tel_phone_ph: "+81 90 1234 5678",
    privacy_note: "ブラウザ内で生成 — 何もアップロードされません。",
    result_label: "あなたのリンク",
    result_copied: "コピー済み",
    result_copy: "コピー",
  },
  zh: {
    tab_email: "电子邮件",
    tab_wifi: "Wi-Fi",
    tab_sms: "短信",
    tab_phone: "电话",
    mailto_to: "收件人",
    mailto_cc: "抄送（可选）",
    mailto_subject: "主题",
    mailto_body: "正文",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "你好！",
    mailto_body_ph: "预填消息…",
    wifi_ssid: "网络名称（SSID）",
    wifi_ssid_ph: "MyWiFi",
    wifi_security: "安全性",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "无密码",
    wifi_password: "密码",
    wifi_password_ph: "••••••••",
    wifi_hidden: "隐藏网络",
    wifi_hint: "将此粘贴到二维码生成器中，创建「扫描连接」Wi-Fi 码。",
    sms_phone: "电话号码",
    sms_phone_ph: "+86 138 0000 0000",
    sms_message: "预填消息（可选）",
    sms_message_ph: "你好…",
    tel_phone: "电话号码",
    tel_phone_ph: "+86 138 0000 0000",
    privacy_note: "在浏览器中生成 — 不会上传任何内容。",
    result_label: "您的链接",
    result_copied: "已复制",
    result_copy: "复制",
  },
  ko: {
    tab_email: "이메일",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "전화",
    mailto_to: "받는 사람",
    mailto_cc: "참조 (선택사항)",
    mailto_subject: "제목",
    mailto_body: "본문",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "안녕하세요!",
    mailto_body_ph: "미리 채워진 메시지…",
    wifi_ssid: "네트워크 이름 (SSID)",
    wifi_ssid_ph: "MyWiFi",
    wifi_security: "보안",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "비밀번호 없음",
    wifi_password: "비밀번호",
    wifi_password_ph: "••••••••",
    wifi_hidden: "숨겨진 네트워크",
    wifi_hint: "QR 코드 생성기에 붙여넣어 \"스캔하여 연결\" Wi-Fi 코드를 만드세요.",
    sms_phone: "전화번호",
    sms_phone_ph: "+82 10 1234 5678",
    sms_message: "미리 채워진 메시지 (선택사항)",
    sms_message_ph: "안녕하세요…",
    tel_phone: "전화번호",
    tel_phone_ph: "+82 10 1234 5678",
    privacy_note: "브라우저에서 생성 — 아무것도 업로드되지 않습니다.",
    result_label: "귀하의 링크",
    result_copied: "복사됨",
    result_copy: "복사",
  },
  ar: {
    tab_email: "البريد الإلكتروني",
    tab_wifi: "Wi-Fi",
    tab_sms: "رسالة نصية",
    tab_phone: "الهاتف",
    mailto_to: "إلى",
    mailto_cc: "نسخة (اختياري)",
    mailto_subject: "الموضوع",
    mailto_body: "نص الرسالة",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "مرحباً!",
    mailto_body_ph: "رسالة مسبقة الملء…",
    wifi_ssid: "اسم الشبكة (SSID)",
    wifi_ssid_ph: "شبكتي",
    wifi_security: "الأمان",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "بدون كلمة مرور",
    wifi_password: "كلمة المرور",
    wifi_password_ph: "••••••••",
    wifi_hidden: "شبكة مخفية",
    wifi_hint: "الصق هذا في مولّد رمز QR لإنشاء رمز Wi-Fi \"مسح للاتصال\".",
    sms_phone: "رقم الهاتف",
    sms_phone_ph: "+966 50 123 4567",
    sms_message: "رسالة مسبقة الملء (اختياري)",
    sms_message_ph: "مرحباً…",
    tel_phone: "رقم الهاتف",
    tel_phone_ph: "+966 50 123 4567",
    privacy_note: "يُنشأ في متصفحك — لا يُرفع أي شيء.",
    result_label: "رابطك",
    result_copied: "تم النسخ",
    result_copy: "نسخ",
  },
  ru: {
    tab_email: "Эл. почта",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Телефон",
    mailto_to: "Кому",
    mailto_cc: "Копия (необязательно)",
    mailto_subject: "Тема",
    mailto_body: "Текст",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "Привет!",
    mailto_body_ph: "Предзаполненное сообщение…",
    wifi_ssid: "Имя сети (SSID)",
    wifi_ssid_ph: "МояСеть",
    wifi_security: "Безопасность",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Без пароля",
    wifi_password: "Пароль",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Скрытая сеть",
    wifi_hint: "Вставьте это в генератор QR-кодов, чтобы создать Wi-Fi-код «Сканируйте для подключения».",
    sms_phone: "Номер телефона",
    sms_phone_ph: "+7 900 123 45 67",
    sms_message: "Предзаполненное сообщение (необязательно)",
    sms_message_ph: "Привет…",
    tel_phone: "Номер телефона",
    tel_phone_ph: "+7 900 123 45 67",
    privacy_note: "Создаётся в вашем браузере — ничего не загружается.",
    result_label: "Ваша ссылка",
    result_copied: "Скопировано",
    result_copy: "Копировать",
  },
  hi: {
    tab_email: "ईमेल",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "फ़ोन",
    mailto_to: "प्रति",
    mailto_cc: "Cc (वैकल्पिक)",
    mailto_subject: "विषय",
    mailto_body: "संदेश",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "नमस्ते!",
    mailto_body_ph: "पूर्व-भरा संदेश…",
    wifi_ssid: "नेटवर्क नाम (SSID)",
    wifi_ssid_ph: "MyWiFi",
    wifi_security: "सुरक्षा",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "कोई पासवर्ड नहीं",
    wifi_password: "पासवर्ड",
    wifi_password_ph: "••••••••",
    wifi_hidden: "छुपा हुआ नेटवर्क",
    wifi_hint: "\"स्कैन करके कनेक्ट\" Wi-Fi कोड बनाने के लिए इसे QR Code Generator में पेस्ट करें।",
    sms_phone: "फ़ोन नंबर",
    sms_phone_ph: "+91 98765 43210",
    sms_message: "पूर्व-भरा संदेश (वैकल्पिक)",
    sms_message_ph: "नमस्ते…",
    tel_phone: "फ़ोन नंबर",
    tel_phone_ph: "+91 98765 43210",
    privacy_note: "आपके ब्राउज़र में निर्मित — कुछ भी अपलोड नहीं होता।",
    result_label: "आपका लिंक",
    result_copied: "कॉपी हो गया",
    result_copy: "कॉपी करें",
  },
  tr: {
    tab_email: "E-posta",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telefon",
    mailto_to: "Kime",
    mailto_cc: "Cc (isteğe bağlı)",
    mailto_subject: "Konu",
    mailto_body: "Mesaj gövdesi",
    mailto_to_ph: "isim@ornek.com",
    mailto_cc_ph: "diger@ornek.com",
    mailto_subject_ph: "Merhaba!",
    mailto_body_ph: "Önceden doldurulmuş mesaj…",
    wifi_ssid: "Ağ adı (SSID)",
    wifi_ssid_ph: "WiFim",
    wifi_security: "Güvenlik",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Şifre yok",
    wifi_password: "Şifre",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Gizli ağ",
    wifi_hint: "\"Bağlanmak için tara\" Wi-Fi kodu oluşturmak için bunu QR Kod Oluşturucu'ya yapıştırın.",
    sms_phone: "Telefon numarası",
    sms_phone_ph: "+90 532 123 45 67",
    sms_message: "Önceden doldurulmuş mesaj (isteğe bağlı)",
    sms_message_ph: "Merhaba…",
    tel_phone: "Telefon numarası",
    tel_phone_ph: "+90 532 123 45 67",
    privacy_note: "Tarayıcınızda oluşturulur — hiçbir şey yüklenmez.",
    result_label: "Bağlantınız",
    result_copied: "Kopyalandı",
    result_copy: "Kopyala",
  },
  id: {
    tab_email: "Email",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telepon",
    mailto_to: "Kepada",
    mailto_cc: "Cc (opsional)",
    mailto_subject: "Subjek",
    mailto_body: "Isi pesan",
    mailto_to_ph: "nama@contoh.com",
    mailto_cc_ph: "lain@contoh.com",
    mailto_subject_ph: "Halo!",
    mailto_body_ph: "Pesan yang sudah diisi…",
    wifi_ssid: "Nama jaringan (SSID)",
    wifi_ssid_ph: "WiFiSaya",
    wifi_security: "Keamanan",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Tanpa kata sandi",
    wifi_password: "Kata sandi",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Jaringan tersembunyi",
    wifi_hint: "Tempelkan ini ke Pembuat Kode QR untuk membuat kode Wi-Fi \"pindai untuk terhubung\".",
    sms_phone: "Nomor telepon",
    sms_phone_ph: "+62 812 3456 7890",
    sms_message: "Pesan yang sudah diisi (opsional)",
    sms_message_ph: "Halo…",
    tel_phone: "Nomor telepon",
    tel_phone_ph: "+62 812 3456 7890",
    privacy_note: "Dibuat di browser Anda — tidak ada yang diunggah.",
    result_label: "Tautan Anda",
    result_copied: "Disalin",
    result_copy: "Salin",
  },
  vi: {
    tab_email: "Email",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Điện thoại",
    mailto_to: "Đến",
    mailto_cc: "Cc (tùy chọn)",
    mailto_subject: "Chủ đề",
    mailto_body: "Nội dung",
    mailto_to_ph: "ten@example.com",
    mailto_cc_ph: "khac@example.com",
    mailto_subject_ph: "Xin chào!",
    mailto_body_ph: "Tin nhắn điền sẵn…",
    wifi_ssid: "Tên mạng (SSID)",
    wifi_ssid_ph: "WiFiCuaToi",
    wifi_security: "Bảo mật",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Không có mật khẩu",
    wifi_password: "Mật khẩu",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Mạng ẩn",
    wifi_hint: "Dán vào Trình tạo mã QR để tạo mã Wi-Fi \"quét để kết nối\".",
    sms_phone: "Số điện thoại",
    sms_phone_ph: "+84 90 123 4567",
    sms_message: "Tin nhắn điền sẵn (tùy chọn)",
    sms_message_ph: "Xin chào…",
    tel_phone: "Số điện thoại",
    tel_phone_ph: "+84 90 123 4567",
    privacy_note: "Tạo trong trình duyệt của bạn — không có gì được tải lên.",
    result_label: "Liên kết của bạn",
    result_copied: "Đã sao chép",
    result_copy: "Sao chép",
  },
  sv: {
    tab_email: "E-post",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telefon",
    mailto_to: "Till",
    mailto_cc: "Kopia (valfritt)",
    mailto_subject: "Ämne",
    mailto_body: "Brödtext",
    mailto_to_ph: "namn@example.com",
    mailto_cc_ph: "annan@example.com",
    mailto_subject_ph: "Hej!",
    mailto_body_ph: "Förifylt meddelande…",
    wifi_ssid: "Nätverksnamn (SSID)",
    wifi_ssid_ph: "MittWiFi",
    wifi_security: "Säkerhet",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Inget lösenord",
    wifi_password: "Lösenord",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Dolt nätverk",
    wifi_hint: "Klistra in detta i QR-kodgeneratorn för att skapa en Wi-Fi-kod för \"skanna för att ansluta\".",
    sms_phone: "Telefonnummer",
    sms_phone_ph: "+46 70 123 45 67",
    sms_message: "Förifylt meddelande (valfritt)",
    sms_message_ph: "Hej…",
    tel_phone: "Telefonnummer",
    tel_phone_ph: "+46 70 123 45 67",
    privacy_note: "Skapad i din webbläsare — inget laddas upp.",
    result_label: "Din länk",
    result_copied: "Kopierad",
    result_copy: "Kopiera",
  },
  pl: {
    tab_email: "E-mail",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telefon",
    mailto_to: "Do",
    mailto_cc: "DW (opcjonalnie)",
    mailto_subject: "Temat",
    mailto_body: "Treść",
    mailto_to_ph: "imie@przyklad.pl",
    mailto_cc_ph: "inny@przyklad.pl",
    mailto_subject_ph: "Cześć!",
    mailto_body_ph: "Wstępnie wypełniona wiadomość…",
    wifi_ssid: "Nazwa sieci (SSID)",
    wifi_ssid_ph: "MojaWiFi",
    wifi_security: "Zabezpieczenie",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Brak hasła",
    wifi_password: "Hasło",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Ukryta sieć",
    wifi_hint: "Wklej to do generatora kodów QR, aby utworzyć kod Wi-Fi \"zeskanuj, aby połączyć\".",
    sms_phone: "Numer telefonu",
    sms_phone_ph: "+48 501 234 567",
    sms_message: "Wstępnie wypełniona wiadomość (opcjonalnie)",
    sms_message_ph: "Cześć…",
    tel_phone: "Numer telefonu",
    tel_phone_ph: "+48 501 234 567",
    privacy_note: "Tworzony w Twojej przeglądarce — nic nie jest przesyłane.",
    result_label: "Twój link",
    result_copied: "Skopiowano",
    result_copy: "Kopiuj",
  },
  uk: {
    tab_email: "Ел. пошта",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Телефон",
    mailto_to: "Кому",
    mailto_cc: "Копія (необов'язково)",
    mailto_subject: "Тема",
    mailto_body: "Текст",
    mailto_to_ph: "name@example.com",
    mailto_cc_ph: "other@example.com",
    mailto_subject_ph: "Привіт!",
    mailto_body_ph: "Попередньо заповнене повідомлення…",
    wifi_ssid: "Назва мережі (SSID)",
    wifi_ssid_ph: "МояМережа",
    wifi_security: "Безпека",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Без пароля",
    wifi_password: "Пароль",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Прихована мережа",
    wifi_hint: "Вставте це у генератор QR-кодів, щоб створити Wi-Fi-код «скануйте для підключення».",
    sms_phone: "Номер телефону",
    sms_phone_ph: "+38 050 123 4567",
    sms_message: "Попередньо заповнене повідомлення (необов'язково)",
    sms_message_ph: "Привіт…",
    tel_phone: "Номер телефону",
    tel_phone_ph: "+38 050 123 4567",
    privacy_note: "Створено у вашому браузері — нічого не завантажується.",
    result_label: "Ваше посилання",
    result_copied: "Скопійовано",
    result_copy: "Копіювати",
  },
  cs: {
    tab_email: "E-mail",
    tab_wifi: "Wi-Fi",
    tab_sms: "SMS",
    tab_phone: "Telefon",
    mailto_to: "Komu",
    mailto_cc: "Kopie (volitelné)",
    mailto_subject: "Předmět",
    mailto_body: "Zpráva",
    mailto_to_ph: "jmeno@priklad.cz",
    mailto_cc_ph: "jiny@priklad.cz",
    mailto_subject_ph: "Ahoj!",
    mailto_body_ph: "Předvyplněná zpráva…",
    wifi_ssid: "Název sítě (SSID)",
    wifi_ssid_ph: "MojeWiFi",
    wifi_security: "Zabezpečení",
    wifi_wpa: "WPA/WPA2/WPA3",
    wifi_wep: "WEP",
    wifi_nopass: "Bez hesla",
    wifi_password: "Heslo",
    wifi_password_ph: "••••••••",
    wifi_hidden: "Skrytá síť",
    wifi_hint: "Vložte to do generátoru QR kódů a vytvořte Wi-Fi kód \"skenovat pro připojení\".",
    sms_phone: "Telefonní číslo",
    sms_phone_ph: "+420 601 234 567",
    sms_message: "Předvyplněná zpráva (volitelné)",
    sms_message_ph: "Ahoj…",
    tel_phone: "Telefonní číslo",
    tel_phone_ph: "+420 601 234 567",
    privacy_note: "Vytvořeno ve vašem prohlížeči — nic se nenahrává.",
    result_label: "Váš odkaz",
    result_copied: "Zkopírováno",
    result_copy: "Kopírovat",
  },
};

// Pure client-side "special link" builder: mailto / wifi / sms / tel URIs.
// Everything is computed in the browser — nothing is uploaded.
type Tab = "mailto" | "wifi" | "sms" | "tel";

function enc(s: string) {
  return encodeURIComponent(s);
}
// Wi-Fi QR payload escaping per the standard: \ ; , : " are escaped with a backslash.
function wifiEsc(s: string) {
  return s.replace(/([\\;,:"])/g, "\\$1");
}

export function LinkBuilderClient() {
  const s = T[useLocale()] ?? T.en;
  const [tab, setTab] = useState<Tab>("mailto");
  const [copied, setCopied] = useState(false);

  // mailto
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  // wifi
  const [ssid, setSsid] = useState("");
  const [pass, setPass] = useState("");
  const [enc2, setEnc2] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [hidden, setHidden] = useState(false);
  // sms
  const [smsNum, setSmsNum] = useState("");
  const [smsMsg, setSmsMsg] = useState("");
  // tel
  const [tel, setTel] = useState("");

  const TABS: { id: Tab; labelKey: keyof typeof s; icon: typeof Mail }[] = [
    { id: "mailto", labelKey: "tab_email", icon: Mail },
    { id: "wifi", labelKey: "tab_wifi", icon: Wifi },
    { id: "sms", labelKey: "tab_sms", icon: MessageSquare },
    { id: "tel", labelKey: "tab_phone", icon: Phone },
  ];

  const result = useMemo(() => {
    if (tab === "mailto") {
      if (!to.trim()) return "";
      const params = new URLSearchParams();
      if (cc.trim()) params.set("cc", cc.trim());
      if (subject.trim()) params.set("subject", subject.trim());
      if (emailBody.trim()) params.set("body", emailBody);
      const qs = params.toString();
      return `mailto:${to.trim()}${qs ? `?${qs}` : ""}`;
    }
    if (tab === "wifi") {
      if (!ssid.trim()) return "";
      const t = enc2 === "nopass" ? "nopass" : enc2;
      const p = enc2 === "nopass" ? "" : `P:${wifiEsc(pass)};`;
      return `WIFI:T:${t};S:${wifiEsc(ssid)};${p}${hidden ? "H:true;" : ""};`;
    }
    if (tab === "sms") {
      if (!smsNum.trim()) return "";
      const num = smsNum.replace(/[^\d+]/g, "");
      return `sms:${num}${smsMsg.trim() ? `?body=${enc(smsMsg)}` : ""}`;
    }
    if (tab === "tel") {
      if (!tel.trim()) return "";
      return `tel:${tel.replace(/[^\d+]/g, "")}`;
    }
    return "";
  }, [tab, to, cc, subject, emailBody, ssid, pass, enc2, hidden, smsNum, smsMsg, tel]);

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  const input = "w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
  const labelCls = "mb-1.5 block text-sm font-medium text-ink-700";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 rounded-lg border border-ink-200 bg-white p-1">
        {TABS.map(({ id, labelKey, icon: Icon }) => (
          <button key={id} onClick={() => { setTab(id); setCopied(false); }}
            className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              tab === id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
            <Icon className="h-4 w-4" /> {s[labelKey]}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
        {tab === "mailto" && (
          <div className="space-y-3">
            <label className="block"><span className={labelCls}>{s.mailto_to}</span>
              <input value={to} onChange={(e) => setTo(e.target.value)} placeholder={s.mailto_to_ph} className={input} /></label>
            <label className="block"><span className={labelCls}>{s.mailto_cc}</span>
              <input value={cc} onChange={(e) => setCc(e.target.value)} placeholder={s.mailto_cc_ph} className={input} /></label>
            <label className="block"><span className={labelCls}>{s.mailto_subject}</span>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={s.mailto_subject_ph} className={input} /></label>
            <label className="block"><span className={labelCls}>{s.mailto_body}</span>
              <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder={s.mailto_body_ph} className={cn(input, "h-24 resize-y")} /></label>
          </div>
        )}

        {tab === "wifi" && (
          <div className="space-y-3">
            <label className="block"><span className={labelCls}>{s.wifi_ssid}</span>
              <input value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder={s.wifi_ssid_ph} className={input} /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block"><span className={labelCls}>{s.wifi_security}</span>
                <select value={enc2} onChange={(e) => setEnc2(e.target.value as typeof enc2)} className={input}>
                  <option value="WPA">{s.wifi_wpa}</option>
                  <option value="WEP">{s.wifi_wep}</option>
                  <option value="nopass">{s.wifi_nopass}</option>
                </select></label>
              <label className="block"><span className={labelCls}>{s.wifi_password}</span>
                <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder={s.wifi_password_ph} disabled={enc2 === "nopass"} className={cn(input, enc2 === "nopass" && "opacity-50")} /></label>
            </div>
            <label className="flex items-center gap-2 text-sm text-ink-600">
              <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="rounded border-ink-300" /> {s.wifi_hidden}
            </label>
            <p className="text-xs text-ink-400">{s.wifi_hint}</p>
          </div>
        )}

        {tab === "sms" && (
          <div className="space-y-3">
            <label className="block"><span className={labelCls}>{s.sms_phone}</span>
              <input value={smsNum} onChange={(e) => setSmsNum(e.target.value)} placeholder={s.sms_phone_ph} inputMode="tel" className={input} /></label>
            <label className="block"><span className={labelCls}>{s.sms_message}</span>
              <textarea value={smsMsg} onChange={(e) => setSmsMsg(e.target.value)} placeholder={s.sms_message_ph} className={cn(input, "h-20 resize-y")} /></label>
          </div>
        )}

        {tab === "tel" && (
          <label className="block"><span className={labelCls}>{s.tel_phone}</span>
            <input value={tel} onChange={(e) => setTel(e.target.value)} placeholder={s.tel_phone_ph} inputMode="tel" className={input} /></label>
        )}
        <p className="mt-3 text-xs text-ink-400">{s.privacy_note}</p>
      </div>

      {result && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="mb-2 text-sm font-medium text-emerald-800">{s.result_label}</p>
          <div className="flex items-stretch gap-2">
            <input readOnly value={result} onFocus={(e) => e.currentTarget.select()}
              className="flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-2 font-mono text-xs text-ink-900" />
            <Button variant="outline" onClick={copy}>
              {copied ? <><Check className="h-4 w-4" /> {s.result_copied}</> : <><Copy className="h-4 w-4" /> {s.result_copy}</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
