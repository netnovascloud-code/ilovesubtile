"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?/",
};

const T: Record<string, Record<string, string>> = {
  en: {
    pickSet: "Pick at least one character set",
    regenerate: "Regenerate",
    copy: "Copy",
    copied: "Copied",
    strength: "Strength:",
    weak: "Weak",
    ok: "OK",
    strong: "Strong",
    veryStrong: "Very strong",
    length: "Length",
    lowercase: "Lowercase a-z",
    uppercase: "Uppercase A-Z",
    digits: "Digits 0-9",
    symbols: "Symbols !@#…",
    privacy: "Generated locally with crypto.getRandomValues — never sent to a server.",
  },
  fr: {
    pickSet: "Choisissez au moins un jeu de caractères",
    regenerate: "Régénérer",
    copy: "Copier",
    copied: "Copié",
    strength: "Force :",
    weak: "Faible",
    ok: "Moyen",
    strong: "Fort",
    veryStrong: "Très fort",
    length: "Longueur",
    lowercase: "Minuscules a-z",
    uppercase: "Majuscules A-Z",
    digits: "Chiffres 0-9",
    symbols: "Symboles !@#…",
    privacy: "Généré localement avec crypto.getRandomValues — jamais envoyé à un serveur.",
  },
  es: {
    pickSet: "Elige al menos un conjunto de caracteres",
    regenerate: "Regenerar",
    copy: "Copiar",
    copied: "Copiado",
    strength: "Fuerza:",
    weak: "Débil",
    ok: "Regular",
    strong: "Fuerte",
    veryStrong: "Muy fuerte",
    length: "Longitud",
    lowercase: "Minúsculas a-z",
    uppercase: "Mayúsculas A-Z",
    digits: "Dígitos 0-9",
    symbols: "Símbolos !@#…",
    privacy: "Generado localmente con crypto.getRandomValues — nunca se envía a un servidor.",
  },
  pt: {
    pickSet: "Escolha pelo menos um conjunto de caracteres",
    regenerate: "Regenerar",
    copy: "Copiar",
    copied: "Copiado",
    strength: "Força:",
    weak: "Fraca",
    ok: "Razoável",
    strong: "Forte",
    veryStrong: "Muito forte",
    length: "Comprimento",
    lowercase: "Minúsculas a-z",
    uppercase: "Maiúsculas A-Z",
    digits: "Dígitos 0-9",
    symbols: "Símbolos !@#…",
    privacy: "Gerado localmente com crypto.getRandomValues — nunca enviado a um servidor.",
  },
  de: {
    pickSet: "Wählen Sie mindestens einen Zeichensatz",
    regenerate: "Neu generieren",
    copy: "Kopieren",
    copied: "Kopiert",
    strength: "Stärke:",
    weak: "Schwach",
    ok: "OK",
    strong: "Stark",
    veryStrong: "Sehr stark",
    length: "Länge",
    lowercase: "Kleinbuchstaben a-z",
    uppercase: "Großbuchstaben A-Z",
    digits: "Ziffern 0-9",
    symbols: "Symbole !@#…",
    privacy: "Lokal mit crypto.getRandomValues generiert — niemals an einen Server gesendet.",
  },
  it: {
    pickSet: "Scegli almeno un set di caratteri",
    regenerate: "Rigenera",
    copy: "Copia",
    copied: "Copiato",
    strength: "Forza:",
    weak: "Debole",
    ok: "Sufficiente",
    strong: "Forte",
    veryStrong: "Molto forte",
    length: "Lunghezza",
    lowercase: "Minuscole a-z",
    uppercase: "Maiuscole A-Z",
    digits: "Cifre 0-9",
    symbols: "Simboli !@#…",
    privacy: "Generato localmente con crypto.getRandomValues — non inviato mai a un server.",
  },
  nl: {
    pickSet: "Kies minimaal één tekenset",
    regenerate: "Opnieuw genereren",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    strength: "Sterkte:",
    weak: "Zwak",
    ok: "Redelijk",
    strong: "Sterk",
    veryStrong: "Zeer sterk",
    length: "Lengte",
    lowercase: "Kleine letters a-z",
    uppercase: "Hoofdletters A-Z",
    digits: "Cijfers 0-9",
    symbols: "Symbolen !@#…",
    privacy: "Lokaal gegenereerd met crypto.getRandomValues — nooit naar een server gestuurd.",
  },
  ja: {
    pickSet: "少なくとも 1 つの文字セットを選んでください",
    regenerate: "再生成",
    copy: "コピー",
    copied: "コピー済み",
    strength: "強度：",
    weak: "弱い",
    ok: "普通",
    strong: "強い",
    veryStrong: "非常に強い",
    length: "長さ",
    lowercase: "小文字 a-z",
    uppercase: "大文字 A-Z",
    digits: "数字 0-9",
    symbols: "記号 !@#…",
    privacy: "crypto.getRandomValues でローカル生成 — サーバーには送信されません。",
  },
  zh: {
    pickSet: "请至少选择一种字符集",
    regenerate: "重新生成",
    copy: "复制",
    copied: "已复制",
    strength: "强度：",
    weak: "弱",
    ok: "一般",
    strong: "强",
    veryStrong: "非常强",
    length: "长度",
    lowercase: "小写字母 a-z",
    uppercase: "大写字母 A-Z",
    digits: "数字 0-9",
    symbols: "符号 !@#…",
    privacy: "使用 crypto.getRandomValues 在本地生成 — 从不发送到服务器。",
  },
  ko: {
    pickSet: "최소 하나의 문자 세트를 선택하세요",
    regenerate: "재생성",
    copy: "복사",
    copied: "복사됨",
    strength: "강도:",
    weak: "약함",
    ok: "보통",
    strong: "강함",
    veryStrong: "매우 강함",
    length: "길이",
    lowercase: "소문자 a-z",
    uppercase: "대문자 A-Z",
    digits: "숫자 0-9",
    symbols: "기호 !@#…",
    privacy: "crypto.getRandomValues로 로컬에서 생성 — 서버에 전송되지 않습니다.",
  },
  ar: {
    pickSet: "اختر مجموعة أحرف واحدة على الأقل",
    regenerate: "إعادة التوليد",
    copy: "نسخ",
    copied: "تم النسخ",
    strength: "القوة:",
    weak: "ضعيف",
    ok: "مقبول",
    strong: "قوي",
    veryStrong: "قوي جداً",
    length: "الطول",
    lowercase: "أحرف صغيرة a-z",
    uppercase: "أحرف كبيرة A-Z",
    digits: "أرقام 0-9",
    symbols: "رموز !@#…",
    privacy: "يُولَد محلياً بـ crypto.getRandomValues — لا يُرسل أبداً إلى خادم.",
  },
  ru: {
    pickSet: "Выберите хотя бы один набор символов",
    regenerate: "Пересоздать",
    copy: "Копировать",
    copied: "Скопировано",
    strength: "Надёжность:",
    weak: "Слабый",
    ok: "Средний",
    strong: "Надёжный",
    veryStrong: "Очень надёжный",
    length: "Длина",
    lowercase: "Строчные a-z",
    uppercase: "Прописные A-Z",
    digits: "Цифры 0-9",
    symbols: "Символы !@#…",
    privacy: "Создан локально с помощью crypto.getRandomValues — никогда не отправляется на сервер.",
  },
  hi: {
    pickSet: "कम से कम एक कैरेक्टर सेट चुनें",
    regenerate: "पुनर्निर्मित करें",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    strength: "मज़बूती:",
    weak: "कमज़ोर",
    ok: "ठीक",
    strong: "मज़बूत",
    veryStrong: "बहुत मज़बूत",
    length: "लंबाई",
    lowercase: "छोटे अक्षर a-z",
    uppercase: "बड़े अक्षर A-Z",
    digits: "अंक 0-9",
    symbols: "प्रतीक !@#…",
    privacy: "crypto.getRandomValues के साथ स्थानीय रूप से उत्पन्न — कभी सर्वर को नहीं भेजा जाता।",
  },
  tr: {
    pickSet: "En az bir karakter seti seçin",
    regenerate: "Yeniden oluştur",
    copy: "Kopyala",
    copied: "Kopyalandı",
    strength: "Güç:",
    weak: "Zayıf",
    ok: "Orta",
    strong: "Güçlü",
    veryStrong: "Çok güçlü",
    length: "Uzunluk",
    lowercase: "Küçük harfler a-z",
    uppercase: "Büyük harfler A-Z",
    digits: "Rakamlar 0-9",
    symbols: "Semboller !@#…",
    privacy: "crypto.getRandomValues ile yerel olarak oluşturuldu — sunucuya asla gönderilmez.",
  },
  id: {
    pickSet: "Pilih setidaknya satu set karakter",
    regenerate: "Buat ulang",
    copy: "Salin",
    copied: "Disalin",
    strength: "Kekuatan:",
    weak: "Lemah",
    ok: "Cukup",
    strong: "Kuat",
    veryStrong: "Sangat kuat",
    length: "Panjang",
    lowercase: "Huruf kecil a-z",
    uppercase: "Huruf kapital A-Z",
    digits: "Digit 0-9",
    symbols: "Simbol !@#…",
    privacy: "Dibuat secara lokal dengan crypto.getRandomValues — tidak pernah dikirim ke server.",
  },
  vi: {
    pickSet: "Chọn ít nhất một bộ ký tự",
    regenerate: "Tạo lại",
    copy: "Sao chép",
    copied: "Đã sao chép",
    strength: "Độ mạnh:",
    weak: "Yếu",
    ok: "Tạm",
    strong: "Mạnh",
    veryStrong: "Rất mạnh",
    length: "Độ dài",
    lowercase: "Chữ thường a-z",
    uppercase: "Chữ hoa A-Z",
    digits: "Chữ số 0-9",
    symbols: "Ký hiệu !@#…",
    privacy: "Được tạo cục bộ với crypto.getRandomValues — không bao giờ gửi đến máy chủ.",
  },
  sv: {
    pickSet: "Välj minst en teckenuppsättning",
    regenerate: "Generera om",
    copy: "Kopiera",
    copied: "Kopierat",
    strength: "Styrka:",
    weak: "Svagt",
    ok: "OK",
    strong: "Starkt",
    veryStrong: "Mycket starkt",
    length: "Längd",
    lowercase: "Gemener a-z",
    uppercase: "Versaler A-Z",
    digits: "Siffror 0-9",
    symbols: "Symboler !@#…",
    privacy: "Genereras lokalt med crypto.getRandomValues — skickas aldrig till en server.",
  },
  pl: {
    pickSet: "Wybierz co najmniej jeden zestaw znaków",
    regenerate: "Generuj ponownie",
    copy: "Kopiuj",
    copied: "Skopiowano",
    strength: "Siła:",
    weak: "Słabe",
    ok: "Średnie",
    strong: "Silne",
    veryStrong: "Bardzo silne",
    length: "Długość",
    lowercase: "Małe litery a-z",
    uppercase: "Wielkie litery A-Z",
    digits: "Cyfry 0-9",
    symbols: "Symbole !@#…",
    privacy: "Generowane lokalnie przez crypto.getRandomValues — nigdy nie wysyłane na serwer.",
  },
  uk: {
    pickSet: "Виберіть принаймні один набір символів",
    regenerate: "Перегенерувати",
    copy: "Копіювати",
    copied: "Скопійовано",
    strength: "Надійність:",
    weak: "Слабкий",
    ok: "Середній",
    strong: "Надійний",
    veryStrong: "Дуже надійний",
    length: "Довжина",
    lowercase: "Малі літери a-z",
    uppercase: "Великі літери A-Z",
    digits: "Цифри 0-9",
    symbols: "Символи !@#…",
    privacy: "Генерується локально через crypto.getRandomValues — ніколи не надсилається на сервер.",
  },
  cs: {
    pickSet: "Vyberte alespoň jednu sadu znaků",
    regenerate: "Regenerovat",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    strength: "Síla:",
    weak: "Slabé",
    ok: "OK",
    strong: "Silné",
    veryStrong: "Velmi silné",
    length: "Délka",
    lowercase: "Malá písmena a-z",
    uppercase: "Velká písmena A-Z",
    digits: "Číslice 0-9",
    symbols: "Symboly !@#…",
    privacy: "Generováno lokálně pomocí crypto.getRandomValues — nikdy neposíláno na server.",
  },
};

function strengthLabel(len: number, classes: number, s: Record<string, string>): { label: string; cls: string; pct: number } {
  const entropy = len * Math.log2([26, 36, 62, 88][Math.max(0, Math.min(3, classes - 1))] || 26);
  if (entropy < 40) return { label: s.weak, cls: "bg-red-500", pct: 25 };
  if (entropy < 60) return { label: s.ok, cls: "bg-amber-500", pct: 50 };
  if (entropy < 90) return { label: s.strong, cls: "bg-emerald-500", pct: 75 };
  return { label: s.veryStrong, cls: "bg-emerald-600", pct: 100 };
}

export function PasswordGenClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pool = [
      lower && SETS.lower,
      upper && SETS.upper,
      digits && SETS.digits,
      symbols && SETS.symbols,
    ].filter(Boolean).join("");
    if (!pool) { setPwd(""); return; }
    const buf = new Uint32Array(length);
    crypto.getRandomValues(buf);
    let out = "";
    for (let i = 0; i < length; i++) out += pool[buf[i] % pool.length];
    setPwd(out);
  }, [length, lower, upper, digits, symbols]);

  useEffect(() => { generate(); }, [generate]);

  function copy() { if (!pwd) return; navigator.clipboard.writeText(pwd); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  const classes = [lower, upper, digits, symbols].filter(Boolean).length;
  const st = strengthLabel(length, classes, s);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-ink-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <code className="flex-1 select-all break-all rounded-md bg-ink-50 px-3 py-3 font-mono text-base text-ink-900">
            {pwd || <span className="text-ink-300">{s.pickSet}</span>}
          </code>
          <Button size="sm" variant="outline" onClick={generate}><RefreshCw className="h-3.5 w-3.5" /> {s.regenerate}</Button>
          <Button size="sm" onClick={copy} disabled={!pwd}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? s.copied : s.copy}
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs font-medium text-ink-500">{s.strength}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
            <div className={cn("h-full rounded-full transition-all", st.cls)} style={{ width: `${st.pct}%` }} />
          </div>
          <span className="text-xs font-semibold text-ink-700">{st.label}</span>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-ink-100 bg-white p-4">
        <div>
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium text-ink-700">{s.length}</label>
            <span className="font-mono text-ink-900">{length}</span>
          </div>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-1 w-full accent-brand-500" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([
            [s.lowercase, lower, setLower],
            [s.uppercase, upper, setUpper],
            [s.digits, digits, setDigits],
            [s.symbols, symbols, setSymbols],
          ] as const).map(([label, on, set]) => (
            <label key={label} className="flex cursor-pointer items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700">
              <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
