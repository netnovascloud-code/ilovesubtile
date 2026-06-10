"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { md5 } from "js-md5";
import { useLocale } from "@/hooks/useLocale";

const ALGOS = ["MD5", "SHA-1", "SHA-256", "SHA-512"] as const;
type Algo = (typeof ALGOS)[number];

async function compute(text: string, algo: Algo): Promise<string> {
  if (algo === "MD5") return md5(text);
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const T: Record<string, Record<string, string>> = {
  en: {
    label: "Text to hash",
    placeholder: "Type or paste any text — hashes update instantly.",
    privacy: "100% in your browser — MD5 via js-md5, SHA family via WebCrypto. MD5 should not be used for security-critical hashing.",
  },
  fr: {
    label: "Texte à hacher",
    placeholder: "Tapez ou collez du texte — les hachages se mettent à jour instantanément.",
    privacy: "100 % dans votre navigateur — MD5 via js-md5, famille SHA via WebCrypto. MD5 ne doit pas être utilisé pour le hachage en contexte de sécurité critique.",
  },
  es: {
    label: "Texto para hashear",
    placeholder: "Escribe o pega cualquier texto — los hashes se actualizan al instante.",
    privacy: "100 % en tu navegador — MD5 via js-md5, familia SHA vía WebCrypto. MD5 no debe usarse para hashing de seguridad crítica.",
  },
  pt: {
    label: "Texto para hashear",
    placeholder: "Digite ou cole qualquer texto — os hashes atualizam instantaneamente.",
    privacy: "100% no seu navegador — MD5 via js-md5, família SHA via WebCrypto. MD5 não deve ser usado para hashing de segurança crítica.",
  },
  de: {
    label: "Zu hashender Text",
    placeholder: "Text eingeben oder einfügen — Hashes werden sofort aktualisiert.",
    privacy: "100 % im Browser — MD5 via js-md5, SHA-Familie via WebCrypto. MD5 sollte nicht für sicherheitskritisches Hashing verwendet werden.",
  },
  it: {
    label: "Testo da hashare",
    placeholder: "Digita o incolla qualsiasi testo — gli hash si aggiornano istantaneamente.",
    privacy: "100% nel tuo browser — MD5 tramite js-md5, famiglia SHA tramite WebCrypto. MD5 non dovrebbe essere usato per hashing critico per la sicurezza.",
  },
  nl: {
    label: "Te hashen tekst",
    placeholder: "Typ of plak tekst — hashes worden direct bijgewerkt.",
    privacy: "100% in uw browser — MD5 via js-md5, SHA-familie via WebCrypto. MD5 mag niet worden gebruikt voor beveiligingskritisch hashen.",
  },
  ja: {
    label: "ハッシュするテキスト",
    placeholder: "テキストを入力または貼り付け — ハッシュは即座に更新されます。",
    privacy: "ブラウザ内で 100% 処理 — MD5 は js-md5、SHA ファミリーは WebCrypto を使用。MD5 はセキュリティ上重要なハッシュには使用しないでください。",
  },
  zh: {
    label: "要哈希的文本",
    placeholder: "输入或粘贴任意文本 — 哈希值即时更新。",
    privacy: "在您的浏览器中 100% 处理 — MD5 使用 js-md5，SHA 系列使用 WebCrypto。MD5 不应用于安全关键的哈希。",
  },
  ko: {
    label: "해시할 텍스트",
    placeholder: "텍스트를 입력하거나 붙여넣기 — 해시가 즉시 업데이트됩니다.",
    privacy: "브라우저에서 100% 처리 — MD5는 js-md5, SHA 계열은 WebCrypto 사용. MD5는 보안에 중요한 해싱에 사용해서는 안 됩니다.",
  },
  ar: {
    label: "النص للتجزئة",
    placeholder: "اكتب أو الصق أي نص — تُحدَّث قيم التجزئة فوراً.",
    privacy: "100٪ في متصفحك — MD5 عبر js-md5، عائلة SHA عبر WebCrypto. يجب عدم استخدام MD5 للتجزئة الحساسة أمنياً.",
  },
  ru: {
    label: "Текст для хеширования",
    placeholder: "Введите или вставьте любой текст — хеши обновляются мгновенно.",
    privacy: "100% в вашем браузере — MD5 через js-md5, SHA-семейство через WebCrypto. MD5 не следует использовать для критически важного хеширования.",
  },
  hi: {
    label: "हैश करने के लिए टेक्स्ट",
    placeholder: "कोई भी टेक्स्ट टाइप या पेस्ट करें — हैश तुरंत अपडेट होते हैं।",
    privacy: "आपके ब्राउज़र में 100% — MD5 js-md5 के माध्यम से, SHA फ़ैमिली WebCrypto के माध्यम से। MD5 का उपयोग सुरक्षा-महत्वपूर्ण हैशिंग के लिए नहीं करना चाहिए।",
  },
  tr: {
    label: "Hashlenecek metin",
    placeholder: "Herhangi bir metin yazın veya yapıştırın — hashler anında güncellenir.",
    privacy: "Tarayıcınızda %100 işlem — MD5 js-md5 üzerinden, SHA ailesi WebCrypto üzerinden. MD5 güvenlik açısından kritik hashleme için kullanılmamalıdır.",
  },
  id: {
    label: "Teks untuk di-hash",
    placeholder: "Ketik atau tempel teks apa saja — hash diperbarui seketika.",
    privacy: "100% di browser Anda — MD5 melalui js-md5, keluarga SHA melalui WebCrypto. MD5 tidak boleh digunakan untuk hashing yang kritis terhadap keamanan.",
  },
  vi: {
    label: "Văn bản để băm",
    placeholder: "Nhập hoặc dán bất kỳ văn bản nào — các hàm băm cập nhật ngay lập tức.",
    privacy: "100% trong trình duyệt của bạn — MD5 qua js-md5, họ SHA qua WebCrypto. MD5 không nên dùng cho băm quan trọng về bảo mật.",
  },
  sv: {
    label: "Text att hasha",
    placeholder: "Skriv eller klistra in text — hasharna uppdateras direkt.",
    privacy: "100 % i din webbläsare — MD5 via js-md5, SHA-familjen via WebCrypto. MD5 bör inte användas för säkerhetskritisk hashning.",
  },
  pl: {
    label: "Tekst do zahashowania",
    placeholder: "Wpisz lub wklej dowolny tekst — skróty aktualizują się natychmiast.",
    privacy: "100% w Twojej przeglądarce — MD5 przez js-md5, rodzina SHA przez WebCrypto. MD5 nie powinien być używany do hashowania krytycznego dla bezpieczeństwa.",
  },
  uk: {
    label: "Текст для хешування",
    placeholder: "Введіть або вставте будь-який текст — хеші оновлюються миттєво.",
    privacy: "100% у вашому браузері — MD5 через js-md5, SHA-сімейство через WebCrypto. MD5 не слід використовувати для критично важливого хешування.",
  },
  cs: {
    label: "Text k hashování",
    placeholder: "Napište nebo vložte libovolný text — hashe se aktualizují okamžitě.",
    privacy: "100 % ve vašem prohlížeči — MD5 přes js-md5, rodina SHA přes WebCrypto. MD5 by nemělo být používáno pro bezpečnostně kritické hashování.",
  },
};

export function HashClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<Algo, string>>({ MD5: "", "SHA-1": "", "SHA-256": "", "SHA-512": "" });
  const [copied, setCopied] = useState<Algo | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!input) { if (alive) setHashes({ MD5: "", "SHA-1": "", "SHA-256": "", "SHA-512": "" }); return; }
      const next = { MD5: "", "SHA-1": "", "SHA-256": "", "SHA-512": "" } as Record<Algo, string>;
      for (const a of ALGOS) next[a] = await compute(input, a);
      if (alive) setHashes(next);
    })();
    return () => { alive = false; };
  }, [input]);

  function copy(a: Algo) { navigator.clipboard.writeText(hashes[a]); setCopied(a); setTimeout(() => setCopied(null), 1500); }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.label}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={s.placeholder}
          className="h-40 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>
      {ALGOS.map((a) => (
        <div key={a} className="flex items-center gap-2">
          <span className="w-20 text-xs font-semibold uppercase tracking-wide text-ink-500">{a}</span>
          <code className="flex-1 break-all rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-[12px] text-ink-900">
            {hashes[a] || <span className="text-ink-300">—</span>}
          </code>
          <button onClick={() => copy(a)} disabled={!hashes[a]} className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-2 text-xs text-ink-600 hover:text-ink-900 disabled:opacity-40">
            {copied === a ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      ))}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
