"use client";

import { useState } from "react";
import { Loader2, Download, Plus, Trash2, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Exp = { role: string; company: string; period: string; bullets: string };
type Edu = { degree: string; school: string; period: string };
type Resume = {
  name: string; title: string; email: string; phone: string; location: string; summary: string;
  experience: Exp[]; education: Edu[]; skills: string; photo: string | null;
};

type Layout = "clean" | "modern" | "elegant" | "sidebar";

// Accent palette — layout × colour × font gives hundreds of distinct looks.
const COLORS: { id: string; hex: string; rgb: [number, number, number] }[] = [
  { id: "Indigo", hex: "#4f46e5", rgb: [0.31, 0.27, 0.9] },
  { id: "Blue", hex: "#2563eb", rgb: [0.15, 0.39, 0.92] },
  { id: "Teal", hex: "#0d9488", rgb: [0.05, 0.58, 0.53] },
  { id: "Emerald", hex: "#059669", rgb: [0.02, 0.59, 0.41] },
  { id: "Rose", hex: "#e11d48", rgb: [0.88, 0.11, 0.28] },
  { id: "Amber", hex: "#b45309", rgb: [0.71, 0.33, 0.04] },
  { id: "Slate", hex: "#334155", rgb: [0.2, 0.25, 0.33] },
  { id: "Violet", hex: "#7c3aed", rgb: [0.49, 0.23, 0.93] },
  { id: "Cyan", hex: "#0891b2", rgb: [0.03, 0.57, 0.7] },
  { id: "Charcoal", hex: "#111827", rgb: [0.07, 0.09, 0.15] },
];

const SEED: Resume = {
  name: "Alex Rivera", title: "Senior Product Designer", email: "alex@example.com",
  phone: "+1 555 0142", location: "Paris, France",
  summary: "Product designer with 8 years of experience leading design systems, end-to-end shipping and cross-functional collaboration.",
  experience: [
    { role: "Senior Product Designer", company: "Acme Inc.", period: "2021 — present",
      bullets: "Led the redesign of the core checkout flow (+18% conversion)\nBuilt the new design system used across 4 product surfaces\nMentored 3 junior designers" },
    { role: "Product Designer", company: "Globex", period: "2018 — 2021",
      bullets: "Owned the mobile onboarding (+22% activation)\nRan weekly user research and synthesized findings for the team" },
  ],
  education: [{ degree: "MA Interaction Design", school: "ENSCI Les Ateliers", period: "2014 — 2016" }],
  skills: "Figma, Design Systems, User Research, Prototyping, HTML/CSS, Workshop facilitation",
  photo: null,
};

const T: Record<string, Record<string, string>> = {
  en: {
    template: "Template",
    clean_label: "Clean",
    clean_hint: "Minimal, ATS-friendly",
    modern_label: "Modern",
    modern_hint: "Accent bars, bold",
    elegant_label: "Elegant",
    elegant_hint: "Serif, centered",
    sidebar_label: "Sidebar",
    sidebar_hint: "Coloured column + photo",
    accent_colour: "Accent colour",
    font: "Font",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Photo",
    photo_optional: "(optional)",
    added: "Added",
    upload_headshot: "Upload headshot",
    download_pdf: "Download PDF",
    full_name: "Full name",
    title: "Title",
    email: "Email",
    phone: "Phone",
    location: "Location",
    summary: "Summary",
    experience: "Experience",
    add: "Add",
    role: "Role",
    company: "Company",
    period: "Period",
    bullets: "Bullets (one per line)",
    remove: "Remove",
    education: "Education",
    degree: "Degree",
    school: "School",
    skills: "Skills (comma-separated)",
    footer: "4 layouts × 10 colours × 2 fonts = hundreds of looks. Built entirely in your browser with pdf-lib — your data and photo never leave your device.",
    // PDF section titles
    pdf_contact: "Contact",
    pdf_skills: "Skills",
    pdf_education: "Education",
    pdf_profile: "Profile",
    pdf_experience: "Experience",
    pdf_summary: "Summary",
  },
  fr: {
    template: "Modèle",
    clean_label: "Épuré",
    clean_hint: "Minimal, compatible ATS",
    modern_label: "Moderne",
    modern_hint: "Barres d'accent, gras",
    elegant_label: "Élégant",
    elegant_hint: "Empattements, centré",
    sidebar_label: "Barre latérale",
    sidebar_hint: "Colonne colorée + photo",
    accent_colour: "Couleur d'accent",
    font: "Police",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Photo",
    photo_optional: "(optionnel)",
    added: "Ajoutée",
    upload_headshot: "Télécharger une photo",
    download_pdf: "Télécharger le PDF",
    full_name: "Nom complet",
    title: "Titre",
    email: "E-mail",
    phone: "Téléphone",
    location: "Lieu",
    summary: "Résumé",
    experience: "Expérience",
    add: "Ajouter",
    role: "Poste",
    company: "Entreprise",
    period: "Période",
    bullets: "Points clés (un par ligne)",
    remove: "Supprimer",
    education: "Formation",
    degree: "Diplôme",
    school: "École",
    skills: "Compétences (séparées par des virgules)",
    footer: "4 mises en page × 10 couleurs × 2 polices = des centaines de looks. Entièrement dans votre navigateur avec pdf-lib — vos données ne quittent jamais votre appareil.",
    pdf_contact: "Contact",
    pdf_skills: "Compétences",
    pdf_education: "Formation",
    pdf_profile: "Profil",
    pdf_experience: "Expérience",
    pdf_summary: "Résumé",
  },
  es: {
    template: "Plantilla",
    clean_label: "Limpio",
    clean_hint: "Minimalista, compatible ATS",
    modern_label: "Moderno",
    modern_hint: "Barras de acento, negrita",
    elegant_label: "Elegante",
    elegant_hint: "Serif, centrado",
    sidebar_label: "Barra lateral",
    sidebar_hint: "Columna de color + foto",
    accent_colour: "Color de acento",
    font: "Fuente",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Foto",
    photo_optional: "(opcional)",
    added: "Añadida",
    upload_headshot: "Subir foto",
    download_pdf: "Descargar PDF",
    full_name: "Nombre completo",
    title: "Título",
    email: "Correo electrónico",
    phone: "Teléfono",
    location: "Ubicación",
    summary: "Resumen",
    experience: "Experiencia",
    add: "Añadir",
    role: "Cargo",
    company: "Empresa",
    period: "Período",
    bullets: "Puntos clave (uno por línea)",
    remove: "Eliminar",
    education: "Educación",
    degree: "Título",
    school: "Centro educativo",
    skills: "Habilidades (separadas por comas)",
    footer: "4 diseños × 10 colores × 2 fuentes = cientos de looks. Generado en tu navegador con pdf-lib — tus datos nunca salen de tu dispositivo.",
    pdf_contact: "Contacto",
    pdf_skills: "Habilidades",
    pdf_education: "Educación",
    pdf_profile: "Perfil",
    pdf_experience: "Experiencia",
    pdf_summary: "Resumen",
  },
  pt: {
    template: "Modelo",
    clean_label: "Limpo",
    clean_hint: "Minimalista, compatível ATS",
    modern_label: "Moderno",
    modern_hint: "Barras de destaque, negrito",
    elegant_label: "Elegante",
    elegant_hint: "Serifado, centralizado",
    sidebar_label: "Barra lateral",
    sidebar_hint: "Coluna colorida + foto",
    accent_colour: "Cor de destaque",
    font: "Fonte",
    sans: "Sem serifa",
    serif: "Serifada",
    photo_label: "Foto",
    photo_optional: "(opcional)",
    added: "Adicionada",
    upload_headshot: "Enviar foto",
    download_pdf: "Baixar PDF",
    full_name: "Nome completo",
    title: "Título",
    email: "E-mail",
    phone: "Telefone",
    location: "Localização",
    summary: "Resumo",
    experience: "Experiência",
    add: "Adicionar",
    role: "Cargo",
    company: "Empresa",
    period: "Período",
    bullets: "Pontos principais (um por linha)",
    remove: "Remover",
    education: "Formação",
    degree: "Grau",
    school: "Escola",
    skills: "Competências (separadas por vírgulas)",
    footer: "4 layouts × 10 cores × 2 fontes = centenas de visuais. Gerado no seu navegador com pdf-lib — seus dados nunca saem do dispositivo.",
    pdf_contact: "Contato",
    pdf_skills: "Competências",
    pdf_education: "Formação",
    pdf_profile: "Perfil",
    pdf_experience: "Experiência",
    pdf_summary: "Resumo",
  },
  de: {
    template: "Vorlage",
    clean_label: "Klar",
    clean_hint: "Minimal, ATS-freundlich",
    modern_label: "Modern",
    modern_hint: "Akzentleisten, fett",
    elegant_label: "Elegant",
    elegant_hint: "Serifenschrift, zentriert",
    sidebar_label: "Seitenleiste",
    sidebar_hint: "Farbige Spalte + Foto",
    accent_colour: "Akzentfarbe",
    font: "Schriftart",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Foto",
    photo_optional: "(optional)",
    added: "Hinzugefügt",
    upload_headshot: "Foto hochladen",
    download_pdf: "PDF herunterladen",
    full_name: "Vollständiger Name",
    title: "Titel",
    email: "E-Mail",
    phone: "Telefon",
    location: "Ort",
    summary: "Zusammenfassung",
    experience: "Erfahrung",
    add: "Hinzufügen",
    role: "Position",
    company: "Unternehmen",
    period: "Zeitraum",
    bullets: "Stichpunkte (einer pro Zeile)",
    remove: "Entfernen",
    education: "Bildung",
    degree: "Abschluss",
    school: "Schule",
    skills: "Fähigkeiten (kommagetrennt)",
    footer: "4 Layouts × 10 Farben × 2 Schriftarten = Hunderte von Looks. Vollständig in Ihrem Browser mit pdf-lib erstellt — Ihre Daten verlassen nie Ihr Gerät.",
    pdf_contact: "Kontakt",
    pdf_skills: "Fähigkeiten",
    pdf_education: "Bildung",
    pdf_profile: "Profil",
    pdf_experience: "Erfahrung",
    pdf_summary: "Zusammenfassung",
  },
  it: {
    template: "Modello",
    clean_label: "Pulito",
    clean_hint: "Minimale, compatibile ATS",
    modern_label: "Moderno",
    modern_hint: "Barre di accento, grassetto",
    elegant_label: "Elegante",
    elegant_hint: "Serif, centrato",
    sidebar_label: "Barra laterale",
    sidebar_hint: "Colonna colorata + foto",
    accent_colour: "Colore accento",
    font: "Carattere",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Foto",
    photo_optional: "(opzionale)",
    added: "Aggiunta",
    upload_headshot: "Carica foto",
    download_pdf: "Scarica PDF",
    full_name: "Nome completo",
    title: "Titolo",
    email: "E-mail",
    phone: "Telefono",
    location: "Luogo",
    summary: "Riepilogo",
    experience: "Esperienza",
    add: "Aggiungi",
    role: "Ruolo",
    company: "Azienda",
    period: "Periodo",
    bullets: "Punti chiave (uno per riga)",
    remove: "Rimuovi",
    education: "Formazione",
    degree: "Titolo di studio",
    school: "Scuola",
    skills: "Competenze (separate da virgole)",
    footer: "4 layout × 10 colori × 2 caratteri = centinaia di stili. Creato nel tuo browser con pdf-lib — i tuoi dati non lasciano mai il dispositivo.",
    pdf_contact: "Contatto",
    pdf_skills: "Competenze",
    pdf_education: "Formazione",
    pdf_profile: "Profilo",
    pdf_experience: "Esperienza",
    pdf_summary: "Riepilogo",
  },
  nl: {
    template: "Sjabloon",
    clean_label: "Strak",
    clean_hint: "Minimaal, ATS-vriendelijk",
    modern_label: "Modern",
    modern_hint: "Accentbalken, vet",
    elegant_label: "Elegant",
    elegant_hint: "Serif, gecentreerd",
    sidebar_label: "Zijbalk",
    sidebar_hint: "Gekleurde kolom + foto",
    accent_colour: "Accentkleur",
    font: "Lettertype",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Foto",
    photo_optional: "(optioneel)",
    added: "Toegevoegd",
    upload_headshot: "Foto uploaden",
    download_pdf: "PDF downloaden",
    full_name: "Volledige naam",
    title: "Titel",
    email: "E-mail",
    phone: "Telefoon",
    location: "Locatie",
    summary: "Samenvatting",
    experience: "Ervaring",
    add: "Toevoegen",
    role: "Functie",
    company: "Bedrijf",
    period: "Periode",
    bullets: "Opsommingspunten (één per regel)",
    remove: "Verwijderen",
    education: "Opleiding",
    degree: "Diploma",
    school: "School",
    skills: "Vaardigheden (komma-gescheiden)",
    footer: "4 lay-outs × 10 kleuren × 2 lettertypen = honderden looks. Volledig in uw browser met pdf-lib gebouwd — uw gegevens verlaten nooit uw apparaat.",
    pdf_contact: "Contact",
    pdf_skills: "Vaardigheden",
    pdf_education: "Opleiding",
    pdf_profile: "Profiel",
    pdf_experience: "Ervaring",
    pdf_summary: "Samenvatting",
  },
  ja: {
    template: "テンプレート",
    clean_label: "クリーン",
    clean_hint: "シンプル、ATS対応",
    modern_label: "モダン",
    modern_hint: "アクセントバー、太字",
    elegant_label: "エレガント",
    elegant_hint: "セリフ体、中央揃え",
    sidebar_label: "サイドバー",
    sidebar_hint: "カラー列 + 写真",
    accent_colour: "アクセントカラー",
    font: "フォント",
    sans: "サンセリフ",
    serif: "セリフ",
    photo_label: "写真",
    photo_optional: "（任意）",
    added: "追加済み",
    upload_headshot: "顔写真をアップロード",
    download_pdf: "PDFをダウンロード",
    full_name: "氏名",
    title: "役職",
    email: "メール",
    phone: "電話番号",
    location: "所在地",
    summary: "自己紹介",
    experience: "職歴",
    add: "追加",
    role: "職種",
    company: "会社名",
    period: "期間",
    bullets: "箇条書き（1行に1項目）",
    remove: "削除",
    education: "学歴",
    degree: "学位",
    school: "学校名",
    skills: "スキル（カンマ区切り）",
    footer: "4レイアウト × 10色 × 2フォント = 何百ものデザイン。pdf-libを使用してブラウザ内で完結 — データがデバイスから外に出ることはありません。",
    pdf_contact: "連絡先",
    pdf_skills: "スキル",
    pdf_education: "学歴",
    pdf_profile: "プロフィール",
    pdf_experience: "職歴",
    pdf_summary: "概要",
  },
  zh: {
    template: "模板",
    clean_label: "简洁",
    clean_hint: "极简，ATS友好",
    modern_label: "现代",
    modern_hint: "强调色条，粗体",
    elegant_label: "优雅",
    elegant_hint: "衬线字体，居中",
    sidebar_label: "侧边栏",
    sidebar_hint: "彩色列 + 照片",
    accent_colour: "强调色",
    font: "字体",
    sans: "无衬线",
    serif: "衬线",
    photo_label: "照片",
    photo_optional: "（可选）",
    added: "已添加",
    upload_headshot: "上传头像",
    download_pdf: "下载PDF",
    full_name: "全名",
    title: "职位",
    email: "电子邮件",
    phone: "电话",
    location: "所在地",
    summary: "个人简介",
    experience: "工作经历",
    add: "添加",
    role: "职位",
    company: "公司",
    period: "时间段",
    bullets: "要点（每行一条）",
    remove: "删除",
    education: "教育经历",
    degree: "学位",
    school: "学校",
    skills: "技能（逗号分隔）",
    footer: "4种布局 × 10种颜色 × 2种字体 = 数百种外观。完全在您的浏览器中通过pdf-lib构建 — 您的数据和照片永不离开您的设备。",
    pdf_contact: "联系方式",
    pdf_skills: "技能",
    pdf_education: "教育经历",
    pdf_profile: "个人简介",
    pdf_experience: "工作经历",
    pdf_summary: "概要",
  },
  ko: {
    template: "템플릿",
    clean_label: "클린",
    clean_hint: "미니멀, ATS 친화적",
    modern_label: "모던",
    modern_hint: "강조 바, 굵은 글씨",
    elegant_label: "엘레강트",
    elegant_hint: "세리프, 중앙 정렬",
    sidebar_label: "사이드바",
    sidebar_hint: "컬러 열 + 사진",
    accent_colour: "강조 색상",
    font: "폰트",
    sans: "산세리프",
    serif: "세리프",
    photo_label: "사진",
    photo_optional: "(선택)",
    added: "추가됨",
    upload_headshot: "증명사진 업로드",
    download_pdf: "PDF 다운로드",
    full_name: "이름",
    title: "직함",
    email: "이메일",
    phone: "전화번호",
    location: "위치",
    summary: "자기소개",
    experience: "경력",
    add: "추가",
    role: "직책",
    company: "회사",
    period: "기간",
    bullets: "주요 내용 (한 줄에 하나씩)",
    remove: "삭제",
    education: "학력",
    degree: "학위",
    school: "학교",
    skills: "기술 (쉼표로 구분)",
    footer: "4가지 레이아웃 × 10가지 색상 × 2가지 폰트 = 수백 가지 디자인. pdf-lib를 사용해 브라우저에서 완전히 처리 — 데이터가 기기를 벗어나지 않습니다.",
    pdf_contact: "연락처",
    pdf_skills: "기술",
    pdf_education: "학력",
    pdf_profile: "프로필",
    pdf_experience: "경력",
    pdf_summary: "요약",
  },
  ar: {
    template: "قالب",
    clean_label: "نظيف",
    clean_hint: "بسيط، متوافق مع ATS",
    modern_label: "عصري",
    modern_hint: "أشرطة لوني، خط عريض",
    elegant_label: "أنيق",
    elegant_hint: "خط مزخرف، توسيط",
    sidebar_label: "شريط جانبي",
    sidebar_hint: "عمود ملون + صورة",
    accent_colour: "اللون المميز",
    font: "الخط",
    sans: "بدون زخرفة",
    serif: "مزخرف",
    photo_label: "صورة",
    photo_optional: "(اختياري)",
    added: "تمت الإضافة",
    upload_headshot: "رفع صورة شخصية",
    download_pdf: "تنزيل PDF",
    full_name: "الاسم الكامل",
    title: "المسمى الوظيفي",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    summary: "الملخص",
    experience: "الخبرة",
    add: "إضافة",
    role: "الدور",
    company: "الشركة",
    period: "الفترة",
    bullets: "النقاط الرئيسية (نقطة في كل سطر)",
    remove: "إزالة",
    education: "التعليم",
    degree: "الدرجة العلمية",
    school: "المدرسة",
    skills: "المهارات (مفصولة بفواصل)",
    footer: "4 تصاميم × 10 ألوان × خطان = مئات المظاهر. مبني بالكامل في متصفحك باستخدام pdf-lib — بياناتك وصورتك لا تغادران جهازك أبدًا.",
    pdf_contact: "التواصل",
    pdf_skills: "المهارات",
    pdf_education: "التعليم",
    pdf_profile: "الملف الشخصي",
    pdf_experience: "الخبرة",
    pdf_summary: "الملخص",
  },
  ru: {
    template: "Шаблон",
    clean_label: "Чистый",
    clean_hint: "Минималистичный, для ATS",
    modern_label: "Современный",
    modern_hint: "Акцентные полосы, жирный",
    elegant_label: "Элегантный",
    elegant_hint: "Засечки, по центру",
    sidebar_label: "Боковая панель",
    sidebar_hint: "Цветная колонка + фото",
    accent_colour: "Цвет акцента",
    font: "Шрифт",
    sans: "Рубленый",
    serif: "С засечками",
    photo_label: "Фото",
    photo_optional: "(необязательно)",
    added: "Добавлено",
    upload_headshot: "Загрузить фото",
    download_pdf: "Скачать PDF",
    full_name: "Полное имя",
    title: "Должность",
    email: "Электронная почта",
    phone: "Телефон",
    location: "Местоположение",
    summary: "Резюме",
    experience: "Опыт работы",
    add: "Добавить",
    role: "Роль",
    company: "Компания",
    period: "Период",
    bullets: "Пункты (по одному на строку)",
    remove: "Удалить",
    education: "Образование",
    degree: "Степень",
    school: "Учебное заведение",
    skills: "Навыки (через запятую)",
    footer: "4 макета × 10 цветов × 2 шрифта = сотни вариантов. Полностью в вашем браузере с pdf-lib — ваши данные и фото никогда не покидают устройство.",
    pdf_contact: "Контакты",
    pdf_skills: "Навыки",
    pdf_education: "Образование",
    pdf_profile: "Профиль",
    pdf_experience: "Опыт работы",
    pdf_summary: "Резюме",
  },
  hi: {
    template: "टेम्पलेट",
    clean_label: "साफ़",
    clean_hint: "न्यूनतम, ATS-अनुकूल",
    modern_label: "आधुनिक",
    modern_hint: "एक्सेंट बार, बोल्ड",
    elegant_label: "सुंदर",
    elegant_hint: "सेरिफ़, केन्द्रित",
    sidebar_label: "साइडबार",
    sidebar_hint: "रंगीन कॉलम + फ़ोटो",
    accent_colour: "एक्सेंट रंग",
    font: "फ़ॉन्ट",
    sans: "सैन्स",
    serif: "सेरिफ़",
    photo_label: "फ़ोटो",
    photo_optional: "(वैकल्पिक)",
    added: "जोड़ा गया",
    upload_headshot: "हेडशॉट अपलोड करें",
    download_pdf: "PDF डाउनलोड करें",
    full_name: "पूरा नाम",
    title: "पदनाम",
    email: "ईमेल",
    phone: "फ़ोन",
    location: "स्थान",
    summary: "सारांश",
    experience: "अनुभव",
    add: "जोड़ें",
    role: "भूमिका",
    company: "कंपनी",
    period: "अवधि",
    bullets: "बुलेट पॉइंट (प्रति पंक्ति एक)",
    remove: "हटाएं",
    education: "शिक्षा",
    degree: "डिग्री",
    school: "विद्यालय",
    skills: "कौशल (अल्पविराम से अलग)",
    footer: "4 लेआउट × 10 रंग × 2 फ़ॉन्ट = सैकड़ों लुक। pdf-lib के साथ पूरी तरह आपके ब्राउज़र में निर्मित — आपका डेटा और फ़ोटो कभी आपके डिवाइस से बाहर नहीं जाते।",
    pdf_contact: "संपर्क",
    pdf_skills: "कौशल",
    pdf_education: "शिक्षा",
    pdf_profile: "प्रोफ़ाइल",
    pdf_experience: "अनुभव",
    pdf_summary: "सारांश",
  },
  tr: {
    template: "Şablon",
    clean_label: "Temiz",
    clean_hint: "Minimal, ATS uyumlu",
    modern_label: "Modern",
    modern_hint: "Vurgu çubukları, kalın",
    elegant_label: "Zarif",
    elegant_hint: "Serif, ortalanmış",
    sidebar_label: "Kenar çubuğu",
    sidebar_hint: "Renkli sütun + fotoğraf",
    accent_colour: "Vurgu rengi",
    font: "Yazı tipi",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Fotoğraf",
    photo_optional: "(isteğe bağlı)",
    added: "Eklendi",
    upload_headshot: "Vesikalık yükle",
    download_pdf: "PDF indir",
    full_name: "Ad Soyad",
    title: "Unvan",
    email: "E-posta",
    phone: "Telefon",
    location: "Konum",
    summary: "Özet",
    experience: "Deneyim",
    add: "Ekle",
    role: "Rol",
    company: "Şirket",
    period: "Dönem",
    bullets: "Madde işaretleri (her satıra bir tane)",
    remove: "Kaldır",
    education: "Eğitim",
    degree: "Derece",
    school: "Okul",
    skills: "Beceriler (virgülle ayrılmış)",
    footer: "4 düzen × 10 renk × 2 yazı tipi = yüzlerce görünüm. pdf-lib ile tamamen tarayıcınızda oluşturulur — verileriniz ve fotoğrafınız asla cihazınızı terk etmez.",
    pdf_contact: "İletişim",
    pdf_skills: "Beceriler",
    pdf_education: "Eğitim",
    pdf_profile: "Profil",
    pdf_experience: "Deneyim",
    pdf_summary: "Özet",
  },
  id: {
    template: "Template",
    clean_label: "Bersih",
    clean_hint: "Minimalis, ramah ATS",
    modern_label: "Modern",
    modern_hint: "Bilah aksen, tebal",
    elegant_label: "Elegan",
    elegant_hint: "Serif, rata tengah",
    sidebar_label: "Bilah samping",
    sidebar_hint: "Kolom berwarna + foto",
    accent_colour: "Warna aksen",
    font: "Font",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Foto",
    photo_optional: "(opsional)",
    added: "Ditambahkan",
    upload_headshot: "Unggah foto",
    download_pdf: "Unduh PDF",
    full_name: "Nama lengkap",
    title: "Jabatan",
    email: "Email",
    phone: "Telepon",
    location: "Lokasi",
    summary: "Ringkasan",
    experience: "Pengalaman",
    add: "Tambah",
    role: "Peran",
    company: "Perusahaan",
    period: "Periode",
    bullets: "Poin utama (satu per baris)",
    remove: "Hapus",
    education: "Pendidikan",
    degree: "Gelar",
    school: "Sekolah",
    skills: "Keahlian (dipisah koma)",
    footer: "4 tata letak × 10 warna × 2 font = ratusan tampilan. Dibuat sepenuhnya di browser Anda dengan pdf-lib — data dan foto Anda tidak pernah meninggalkan perangkat.",
    pdf_contact: "Kontak",
    pdf_skills: "Keahlian",
    pdf_education: "Pendidikan",
    pdf_profile: "Profil",
    pdf_experience: "Pengalaman",
    pdf_summary: "Ringkasan",
  },
  vi: {
    template: "Mẫu",
    clean_label: "Gọn gàng",
    clean_hint: "Tối giản, thân thiện ATS",
    modern_label: "Hiện đại",
    modern_hint: "Thanh nhấn, đậm",
    elegant_label: "Thanh lịch",
    elegant_hint: "Chân, căn giữa",
    sidebar_label: "Thanh bên",
    sidebar_hint: "Cột màu + ảnh",
    accent_colour: "Màu nhấn",
    font: "Phông chữ",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Ảnh",
    photo_optional: "(tùy chọn)",
    added: "Đã thêm",
    upload_headshot: "Tải ảnh chân dung",
    download_pdf: "Tải PDF",
    full_name: "Họ và tên",
    title: "Chức danh",
    email: "Email",
    phone: "Điện thoại",
    location: "Địa điểm",
    summary: "Tóm tắt",
    experience: "Kinh nghiệm",
    add: "Thêm",
    role: "Vị trí",
    company: "Công ty",
    period: "Thời gian",
    bullets: "Điểm nổi bật (mỗi dòng một điểm)",
    remove: "Xóa",
    education: "Học vấn",
    degree: "Bằng cấp",
    school: "Trường",
    skills: "Kỹ năng (phân cách bằng dấu phẩy)",
    footer: "4 bố cục × 10 màu × 2 phông chữ = hàng trăm thiết kế. Được tạo hoàn toàn trong trình duyệt của bạn với pdf-lib — dữ liệu và ảnh của bạn không bao giờ rời khỏi thiết bị.",
    pdf_contact: "Liên hệ",
    pdf_skills: "Kỹ năng",
    pdf_education: "Học vấn",
    pdf_profile: "Hồ sơ",
    pdf_experience: "Kinh nghiệm",
    pdf_summary: "Tóm tắt",
  },
  sv: {
    template: "Mall",
    clean_label: "Ren",
    clean_hint: "Minimalt, ATS-vänligt",
    modern_label: "Modern",
    modern_hint: "Accentfält, fetstil",
    elegant_label: "Elegant",
    elegant_hint: "Serif, centrerat",
    sidebar_label: "Sidofält",
    sidebar_hint: "Färgad kolumn + foto",
    accent_colour: "Accentfärg",
    font: "Teckensnitt",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Foto",
    photo_optional: "(valfritt)",
    added: "Tillagd",
    upload_headshot: "Ladda upp porträtt",
    download_pdf: "Ladda ner PDF",
    full_name: "Fullständigt namn",
    title: "Titel",
    email: "E-post",
    phone: "Telefon",
    location: "Plats",
    summary: "Sammanfattning",
    experience: "Erfarenhet",
    add: "Lägg till",
    role: "Roll",
    company: "Företag",
    period: "Period",
    bullets: "Punkter (en per rad)",
    remove: "Ta bort",
    education: "Utbildning",
    degree: "Examen",
    school: "Skola",
    skills: "Färdigheter (kommaseparerade)",
    footer: "4 layouter × 10 färger × 2 teckensnitt = hundratals utseenden. Byggt helt i din webbläsare med pdf-lib — dina data och foto lämnar aldrig din enhet.",
    pdf_contact: "Kontakt",
    pdf_skills: "Färdigheter",
    pdf_education: "Utbildning",
    pdf_profile: "Profil",
    pdf_experience: "Erfarenhet",
    pdf_summary: "Sammanfattning",
  },
  pl: {
    template: "Szablon",
    clean_label: "Czysty",
    clean_hint: "Minimalny, przyjazny ATS",
    modern_label: "Nowoczesny",
    modern_hint: "Paski akcentu, pogrubienie",
    elegant_label: "Elegancki",
    elegant_hint: "Szeryfowy, wyśrodkowany",
    sidebar_label: "Panel boczny",
    sidebar_hint: "Kolorowa kolumna + zdjęcie",
    accent_colour: "Kolor akcentu",
    font: "Czcionka",
    sans: "Sans",
    serif: "Szeryfowa",
    photo_label: "Zdjęcie",
    photo_optional: "(opcjonalne)",
    added: "Dodano",
    upload_headshot: "Prześlij zdjęcie",
    download_pdf: "Pobierz PDF",
    full_name: "Pełne imię i nazwisko",
    title: "Tytuł",
    email: "E-mail",
    phone: "Telefon",
    location: "Lokalizacja",
    summary: "Podsumowanie",
    experience: "Doświadczenie",
    add: "Dodaj",
    role: "Stanowisko",
    company: "Firma",
    period: "Okres",
    bullets: "Punkty (jeden w wierszu)",
    remove: "Usuń",
    education: "Wykształcenie",
    degree: "Stopień naukowy",
    school: "Szkoła",
    skills: "Umiejętności (oddzielone przecinkami)",
    footer: "4 układy × 10 kolorów × 2 czcionki = setki wygląd. Zbudowane w całości w przeglądarce z pdf-lib — Twoje dane i zdjęcie nigdy nie opuszczają urządzenia.",
    pdf_contact: "Kontakt",
    pdf_skills: "Umiejętności",
    pdf_education: "Wykształcenie",
    pdf_profile: "Profil",
    pdf_experience: "Doświadczenie",
    pdf_summary: "Podsumowanie",
  },
  uk: {
    template: "Шаблон",
    clean_label: "Чистий",
    clean_hint: "Мінімалістичний, для ATS",
    modern_label: "Сучасний",
    modern_hint: "Акцентні смуги, жирний",
    elegant_label: "Елегантний",
    elegant_hint: "Засічки, по центру",
    sidebar_label: "Бічна панель",
    sidebar_hint: "Кольорова колонка + фото",
    accent_colour: "Колір акценту",
    font: "Шрифт",
    sans: "Рублений",
    serif: "Із засічками",
    photo_label: "Фото",
    photo_optional: "(необов'язково)",
    added: "Додано",
    upload_headshot: "Завантажити фото",
    download_pdf: "Завантажити PDF",
    full_name: "Повне ім'я",
    title: "Посада",
    email: "Електронна пошта",
    phone: "Телефон",
    location: "Місцезнаходження",
    summary: "Резюме",
    experience: "Досвід роботи",
    add: "Додати",
    role: "Роль",
    company: "Компанія",
    period: "Період",
    bullets: "Пункти (по одному на рядок)",
    remove: "Видалити",
    education: "Освіта",
    degree: "Ступінь",
    school: "Навчальний заклад",
    skills: "Навички (через кому)",
    footer: "4 макети × 10 кольорів × 2 шрифти = сотні варіантів. Повністю у вашому браузері з pdf-lib — ваші дані та фото ніколи не залишають пристрій.",
    pdf_contact: "Контакти",
    pdf_skills: "Навички",
    pdf_education: "Освіта",
    pdf_profile: "Профіль",
    pdf_experience: "Досвід роботи",
    pdf_summary: "Резюме",
  },
  cs: {
    template: "Šablona",
    clean_label: "Čistý",
    clean_hint: "Minimalistický, přátelský k ATS",
    modern_label: "Moderní",
    modern_hint: "Zvýrazněné pruhy, tučné",
    elegant_label: "Elegantní",
    elegant_hint: "Patkový, vycentrovaný",
    sidebar_label: "Postranní panel",
    sidebar_hint: "Barevný sloupec + foto",
    accent_colour: "Barva zvýraznění",
    font: "Písmo",
    sans: "Sans",
    serif: "Serif",
    photo_label: "Fotografie",
    photo_optional: "(volitelné)",
    added: "Přidáno",
    upload_headshot: "Nahrát fotografii",
    download_pdf: "Stáhnout PDF",
    full_name: "Celé jméno",
    title: "Titul",
    email: "E-mail",
    phone: "Telefon",
    location: "Místo",
    summary: "Shrnutí",
    experience: "Zkušenosti",
    add: "Přidat",
    role: "Role",
    company: "Společnost",
    period: "Období",
    bullets: "Odrážky (jedna na řádek)",
    remove: "Odebrat",
    education: "Vzdělání",
    degree: "Titul",
    school: "Škola",
    skills: "Dovednosti (oddělené čárkami)",
    footer: "4 rozvržení × 10 barev × 2 písma = stovky vzhledů. Vytvořeno zcela ve vašem prohlížeči pomocí pdf-lib — vaše data a fotografie nikdy neopustí vaše zařízení.",
    pdf_contact: "Kontakt",
    pdf_skills: "Dovednosti",
    pdf_education: "Vzdělání",
    pdf_profile: "Profil",
    pdf_experience: "Zkušenosti",
    pdf_summary: "Shrnutí",
  },
};

/** Downscale a headshot to ≤512px JPEG so the PDF stays small. */
async function toPhotoDataUrl(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 512 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  c.getContext("2d")!.drawImage(bmp, 0, 0, w, h); bmp.close();
  return c.toDataURL("image/jpeg", 0.9);
}

export function ResumeBuilderClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const LAYOUTS: { id: Layout; label: string; hint: string }[] = [
    { id: "clean", label: s.clean_label, hint: s.clean_hint },
    { id: "modern", label: s.modern_label, hint: s.modern_hint },
    { id: "elegant", label: s.elegant_label, hint: s.elegant_hint },
    { id: "sidebar", label: s.sidebar_label, hint: s.sidebar_hint },
  ];

  const [r, setR] = useState<Resume>(SEED);
  const [layout, setLayout] = useState<Layout>("clean");
  const [color, setColor] = useState(COLORS[0]);
  const [serif, setSerif] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof Resume>(k: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setR({ ...r, [k]: e.target.value });
  const setExp = (i: number, field: keyof Exp, v: string) => { const next = [...r.experience]; next[i] = { ...next[i], [field]: v }; setR({ ...r, experience: next }); };
  const setEdu = (i: number, field: keyof Edu, v: string) => { const next = [...r.education]; next[i] = { ...next[i], [field]: v }; setR({ ...r, education: next }); };
  const addExp = () => setR({ ...r, experience: [...r.experience, { role: "", company: "", period: "", bullets: "" }] });
  const delExp = (i: number) => setR({ ...r, experience: r.experience.filter((_, j) => j !== i) });
  const addEdu = () => setR({ ...r, education: [...r.education, { degree: "", school: "", period: "" }] });
  const delEdu = (i: number) => setR({ ...r, education: r.education.filter((_, j) => j !== i) });

  async function onPhoto(f: File | null) {
    if (!f) return;
    try { setR((prev) => ({ ...prev, photo: null })); const url = await toPhotoDataUrl(f); setR((prev) => ({ ...prev, photo: url })); }
    catch { /* ignore bad image */ }
  }

  async function exportPdf() {
    setBusy(true);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(serif ? StandardFonts.TimesRoman : StandardFonts.Helvetica);
      const bold = await doc.embedFont(serif ? StandardFonts.TimesRomanBold : StandardFonts.HelveticaBold);
      const accent = rgb(...color.rgb);
      const ink = rgb(0.12, 0.13, 0.16);
      const muted = rgb(0.42, 0.45, 0.5);
      const white = rgb(1, 1, 1);
      const softWhite = rgb(0.9, 0.92, 0.96);

      // Embed the photo once (JPEG from our downscale).
      let photo: Awaited<ReturnType<typeof doc.embedJpg>> | null = null;
      if (r.photo?.startsWith("data:image/jpeg")) {
        try { photo = await doc.embedJpg(r.photo); } catch { photo = null; }
      }

      const A4: [number, number] = [595, 842];
      const wrap = (text: string, size: number, f: typeof font, maxW: number): string[] => {
        const out: string[] = [];
        for (const para of text.split(/\n/)) {
          const words = para.split(/\s+/); let line = "";
          for (const w of words) {
            const candidate = line ? `${line} ${w}` : w;
            if (f.widthOfTextAtSize(candidate, size) > maxW) { if (line) out.push(line); line = w; } else line = candidate;
          }
          out.push(line);
        }
        return out;
      };

      if (layout === "sidebar") {
        // ── Two-column: coloured left rail (photo + contact + skills) ─────────
        const SW = 200; // sidebar width
        let page = doc.addPage(A4);
        const drawRail = () => page.drawRectangle({ x: 0, y: 0, width: SW, height: A4[1], color: accent });
        drawRail();
        // Left column cursor (white text inside the rail).
        const lx = 28, lW = SW - 56;
        let ly = A4[1] - 40;
        // Rail page-break: if the sidebar content (contact/skills/education)
        // overflows the page, start a new page and redraw the rail rather than
        // drawing into negative-y (which silently dropped the overflow).
        const ensureL = (h: number) => { if (ly - h < 40) { page = doc.addPage(A4); drawRail(); ly = A4[1] - 40; } };
        if (photo) {
          const ps = 110; const px = (SW - ps) / 2;
          page.drawImage(photo, { x: px, y: ly - ps, width: ps, height: ps });
          ly -= ps + 24;
        }
        const railText = (text: string, size: number, f: typeof font, gap: number, textColor = softWhite) => {
          for (const line of wrap(text, size, f, lW)) { ensureL(size + gap); page.drawText(line, { x: lx, y: ly, size, font: f, color: textColor }); ly -= size + gap; }
        };
        const railTitle = (t: string) => { ly -= 8; railText(t.toUpperCase(), 11, bold, 6, white); };
        railTitle(s.pdf_contact);
        for (const c of [r.email, r.phone, r.location].filter(Boolean)) railText(c, 9.5, font, 4);
        if (r.skills.trim()) { railTitle(s.pdf_skills); for (const sk of r.skills.split(/,\s*/).filter(Boolean)) railText(`•  ${sk}`, 9.5, font, 4); }
        if (r.education.some((e) => e.degree || e.school)) {
          railTitle(s.pdf_education);
          for (const e of r.education) { if (!e.degree && !e.school) continue; railText(e.degree, 9.5, bold, 2, white); if (e.school) railText(e.school, 9, font, 2); if (e.period) railText(e.period, 8.5, font, 6); }
        }

        // Right column cursor (ink text on white).
        const rx = SW + 32, rW = A4[0] - rx - 40;
        let ry = A4[1] - 56;
        const ensureR = (h: number) => { if (ry - h < 48) { page = doc.addPage(A4); drawRail(); ry = A4[1] - 56; } };
        const rt = (text: string, size: number, f: typeof font, gap: number, textColor = ink) => {
          for (const line of wrap(text, size, f, rW)) { ensureR(size + gap); page.drawText(line, { x: rx, y: ry, size, font: f, color: textColor }); ry -= size + gap; }
        };
        const rTitle = (t: string) => { ensureR(22); page.drawText(t.toUpperCase(), { x: rx, y: ry, size: 12, font: bold, color: accent }); ry -= 18; };
        rt(r.name || "Name", 24, bold, 4, ink);
        if (r.title) rt(r.title, 13, font, 12, muted);
        if (r.summary.trim()) { rTitle(s.pdf_profile); rt(r.summary, 10.5, font, 4); ry -= 6; }
        if (r.experience.some((e) => e.role || e.company)) {
          rTitle(s.pdf_experience);
          for (const e of r.experience) {
            if (!e.role && !e.company) continue;
            ensureR(40);
            rt(`${e.role}${e.company ? "  ·  " + e.company : ""}`, 11.5, bold, 2);
            if (e.period) rt(e.period, 9.5, font, 4, muted);
            for (const b of e.bullets.split(/\n/).filter(Boolean)) rt(`•  ${b}`, 10.5, font, 3);
            ry -= 6;
          }
        }
      } else {
        // ── Single column (clean / modern / elegant) ──────────────────────────
        const left = 56, right = A4[0] - 56;
        let page = doc.addPage(A4);
        let y = 800;
        const centered = layout === "elegant";
        const newPage = () => { page = doc.addPage(A4); y = 800; };
        const ensure = (h: number) => { if (y - h < 56) newPage(); };
        // Photo: top-right thumbnail for clean/modern; centered above name for elegant.
        let headerMaxW = right - left;
        if (photo && !centered) {
          const ps = 78; page.drawImage(photo, { x: right - ps, y: y - ps + 10, width: ps, height: ps }); headerMaxW = right - left - ps - 16;
        }
        if (photo && centered) {
          const ps = 84; page.drawImage(photo, { x: (A4[0] - ps) / 2, y: y - ps, width: ps, height: ps }); y -= ps + 12;
        }
        const draw = (text: string, size: number, f: typeof font, textColor = ink, gap = 4, maxW = headerMaxW, center = false) => {
          for (const line of wrap(text, size, f, maxW)) {
            ensure(size + gap);
            const x = center ? (A4[0] - f.widthOfTextAtSize(line, size)) / 2 : left;
            page.drawText(line, { x, y, size, font: f, color: textColor });
            y -= size + gap;
          }
        };
        const sectionTitle = (labelText: string) => {
          ensure(22);
          if (layout === "modern") {
            page.drawRectangle({ x: left, y: y - 4, width: 4, height: 14, color: accent });
            page.drawText(labelText.toUpperCase(), { x: left + 10, y, size: 12, font: bold, color: accent });
            y -= 22;
          } else if (centered) {
            const t = labelText.toUpperCase();
            page.drawText(t, { x: (A4[0] - bold.widthOfTextAtSize(t, 11)) / 2, y, size: 11, font: bold, color: accent });
            y -= 18;
          } else {
            draw(labelText, 13, bold, ink, 4, right - left);
            page.drawLine({ start: { x: left, y: y - 2 }, end: { x: right, y: y - 2 }, thickness: 0.6, color: muted }); y -= 10;
          }
        };
        // Header
        draw(r.name || "Name", 24, bold, accent, 4, headerMaxW, centered);
        if (r.title) draw(r.title, 13, font, muted, 6, headerMaxW, centered);
        const contact = [r.email, r.phone, r.location].filter(Boolean).join("  ·  ");
        if (contact) draw(contact, 10, font, muted, 12, right - left, centered);
        if (r.summary.trim()) { sectionTitle(s.pdf_summary); draw(r.summary, 10.5, font, ink, 4, right - left); y -= 6; }
        if (r.experience.some((e) => e.role || e.company)) {
          sectionTitle(s.pdf_experience);
          for (const e of r.experience) {
            if (!e.role && !e.company) continue;
            ensure(40);
            draw(`${e.role}${e.company ? "  ·  " + e.company : ""}`, 11.5, bold, ink, 2, right - left);
            if (e.period) draw(e.period, 9.5, font, muted, 4, right - left);
            for (const b of e.bullets.split(/\n/).filter(Boolean)) draw(`•  ${b}`, 10.5, font, ink, 3, right - left);
            y -= 6;
          }
        }
        if (r.education.some((e) => e.degree || e.school)) {
          sectionTitle(s.pdf_education);
          for (const e of r.education) {
            if (!e.degree && !e.school) continue;
            ensure(28);
            draw(`${e.degree}${e.school ? "  ·  " + e.school : ""}`, 11, bold, ink, 2, right - left);
            if (e.period) draw(e.period, 9.5, font, muted, 4, right - left);
            y -= 4;
          }
        }
        if (r.skills.trim()) { sectionTitle(s.pdf_skills); draw(r.skills, 10.5, font, ink, 4, right - left); }
      }

      const bytes = await doc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url;
      a.download = `${(r.name || "resume").replace(/\s+/g, "-").toLowerCase()}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally { setBusy(false); }
  }

  const inputCls = "mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
  const labelEl = (l: string) => <span className="text-xs font-medium text-ink-600">{l}</span>;

  return (
    <div className="space-y-6">
      {/* Template gallery */}
      <div className="rounded-xl border border-ink-100 bg-white p-4">
        <p className="text-sm font-semibold text-ink-800">{s.template}</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LAYOUTS.map((l) => (
            <button key={l.id} onClick={() => setLayout(l.id)}
              className={cn("rounded-lg border p-3 text-left transition-colors", layout === l.id ? "border-brand-400 ring-2 ring-brand-100" : "border-ink-200 hover:border-ink-300")}>
              <span className="block text-sm font-medium text-ink-900">{l.label}</span>
              <span className="mt-0.5 block text-xs text-ink-400">{l.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div>
            <p className="text-xs font-medium text-ink-600">{s.accent_colour}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {COLORS.map((c) => (
                <button key={c.id} title={c.id} onClick={() => setColor(c)}
                  className={cn("h-6 w-6 rounded-full ring-offset-2 transition", color.id === c.id && "ring-2 ring-ink-400")}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-600">{s.font}</p>
            <div className="mt-1.5 inline-flex rounded-lg border border-ink-200 bg-white p-1">
              {[{ id: false, l: s.sans }, { id: true, l: s.serif }].map((f) => (
                <button key={f.l} onClick={() => setSerif(f.id)}
                  className={cn("rounded-md px-3 py-1 text-xs font-medium", serif === f.id ? "bg-brand-500 text-white" : "text-ink-600")}>
                  {f.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-ink-600">{s.photo_label} {layout !== "sidebar" && s.photo_optional}</p>
            <div className="mt-1.5 flex items-center gap-2">
              {r.photo ? (
                <span className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-2 py-1 text-xs text-ink-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt="" className="h-6 w-6 rounded object-cover" />
                  {s.added}
                  <button onClick={() => setR((prev) => ({ ...prev, photo: null }))} aria-label="Remove" className="text-ink-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                </span>
              ) : (
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 hover:border-ink-300">
                  <ImagePlus className="h-3.5 w-3.5" /> {s.upload_headshot}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0] ?? null)} />
                </label>
              )}
            </div>
          </div>
          <Button onClick={exportPdf} disabled={busy} size="lg" className="ml-auto">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {s.download_pdf}
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label>{labelEl(s.full_name)}<input className={inputCls} value={r.name} onChange={set("name")} /></label>
        <label>{labelEl(s.title)}<input className={inputCls} value={r.title} onChange={set("title")} /></label>
        <label>{labelEl(s.email)}<input className={inputCls} value={r.email} onChange={set("email")} /></label>
        <label>{labelEl(s.phone)}<input className={inputCls} value={r.phone} onChange={set("phone")} /></label>
        <label className="sm:col-span-2">{labelEl(s.location)}<input className={inputCls} value={r.location} onChange={set("location")} /></label>
        <label className="sm:col-span-2">{labelEl(s.summary)}<textarea rows={3} className={inputCls} value={r.summary} onChange={set("summary")} /></label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-800">{s.experience}</h3>
          <Button variant="outline" size="sm" onClick={addExp}><Plus className="h-3.5 w-3.5" /> {s.add}</Button>
        </div>
        {r.experience.map((e, i) => (
          <div key={i} className="rounded-lg border border-ink-100 bg-white p-3">
            <div className="grid gap-2 sm:grid-cols-3">
              <label>{labelEl(s.role)}<input className={inputCls} value={e.role} onChange={(ev) => setExp(i, "role", ev.target.value)} /></label>
              <label>{labelEl(s.company)}<input className={inputCls} value={e.company} onChange={(ev) => setExp(i, "company", ev.target.value)} /></label>
              <label>{labelEl(s.period)}<input className={inputCls} value={e.period} onChange={(ev) => setExp(i, "period", ev.target.value)} /></label>
              <label className="sm:col-span-3">{labelEl(s.bullets)}<textarea rows={3} className={inputCls} value={e.bullets} onChange={(ev) => setExp(i, "bullets", ev.target.value)} /></label>
            </div>
            <div className="mt-2 flex justify-end">
              <button onClick={() => delExp(i)} className="text-xs text-red-600 hover:underline"><Trash2 className="mr-1 inline h-3 w-3" />{s.remove}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-800">{s.education}</h3>
          <Button variant="outline" size="sm" onClick={addEdu}><Plus className="h-3.5 w-3.5" /> {s.add}</Button>
        </div>
        {r.education.map((e, i) => (
          <div key={i} className="grid gap-2 rounded-lg border border-ink-100 bg-white p-3 sm:grid-cols-3">
            <label>{labelEl(s.degree)}<input className={inputCls} value={e.degree} onChange={(ev) => setEdu(i, "degree", ev.target.value)} /></label>
            <label>{labelEl(s.school)}<input className={inputCls} value={e.school} onChange={(ev) => setEdu(i, "school", ev.target.value)} /></label>
            <label>{labelEl(s.period)}<input className={inputCls} value={e.period} onChange={(ev) => setEdu(i, "period", ev.target.value)} /></label>
            <div className="sm:col-span-3 flex justify-end">
              <button onClick={() => delEdu(i)} className="text-xs text-red-600 hover:underline"><Trash2 className="mr-1 inline h-3 w-3" />{s.remove}</button>
            </div>
          </div>
        ))}
      </div>

      <label className="block">{labelEl(s.skills)}<textarea rows={2} className={inputCls} value={r.skills} onChange={set("skills")} /></label>

      <p className="text-xs text-ink-400">{s.footer}</p>
    </div>
  );
}
