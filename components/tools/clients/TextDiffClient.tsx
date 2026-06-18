"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

/** Simple line-level LCS diff — produces (type, text) tuples for rendering. */
type DiffOp = { type: "eq" | "add" | "del"; text: string };

function lineDiff(a: string, b: string): DiffOp[] {
  const A = a.split(/\r?\n/);
  const B = b.split(/\r?\n/);
  const n = A.length, m = B.length;
  // LCS table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ops: DiffOp[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) { ops.push({ type: "eq", text: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push({ type: "del", text: A[i] }); i++; }
    else { ops.push({ type: "add", text: B[j] }); j++; }
  }
  while (i < n) ops.push({ type: "del", text: A[i++] });
  while (j < m) ops.push({ type: "add", text: B[j++] });
  return ops;
}

const T: Record<string, Record<string, string>> = {
  en: {
    original: "Original",
    changed: "Changed",
    privacy: "100% in your browser — both texts never leave your device.",
  },
  fr: {
    original: "Original",
    changed: "Modifié",
    privacy: "100 % dans votre navigateur — les deux textes ne quittent jamais votre appareil.",
  },
  es: {
    original: "Original",
    changed: "Modificado",
    privacy: "100 % en su navegador — ambos textos nunca salen de su dispositivo.",
  },
  pt: {
    original: "Original",
    changed: "Alterado",
    privacy: "100 % no seu navegador — ambos os textos nunca saem do seu dispositivo.",
  },
  de: {
    original: "Original",
    changed: "Geändert",
    privacy: "100 % in Ihrem Browser — beide Texte verlassen Ihr Gerät nie.",
  },
  it: {
    original: "Originale",
    changed: "Modificato",
    privacy: "100 % nel tuo browser — entrambi i testi non lasciano mai il tuo dispositivo.",
  },
  nl: {
    original: "Origineel",
    changed: "Gewijzigd",
    privacy: "100 % in uw browser — beide teksten verlaten uw apparaat nooit.",
  },
  ja: {
    original: "元のテキスト",
    changed: "変更後",
    privacy: "100 % ブラウザ内で処理 — 両方のテキストはデバイス外に出ません。",
  },
  zh: {
    original: "原文",
    changed: "修改后",
    privacy: "100 % 在您的浏览器中处理 — 两段文本不会离开您的设备。",
  },
  ko: {
    original: "원본",
    changed: "변경됨",
    privacy: "100 % 브라우저에서 실행 — 두 텍스트 모두 기기를 떠나지 않습니다.",
  },
  ar: {
    original: "الأصل",
    changed: "المعدَّل",
    privacy: "معالجة 100 % في متصفحك — كلا النصين لا يغادران جهازك أبدًا.",
  },
  ru: {
    original: "Оригинал",
    changed: "Изменённый",
    privacy: "100 % в вашем браузере — оба текста никогда не покидают ваше устройство.",
  },
  hi: {
    original: "मूल",
    changed: "परिवर्तित",
    privacy: "100 % आपके ब्राउज़र में — दोनों टेक्स्ट कभी भी आपके डिवाइस से नहीं जाते।",
  },
  tr: {
    original: "Orijinal",
    changed: "Değiştirilmiş",
    privacy: "100 % tarayıcınızda — her iki metin de cihazınızdan hiç çıkmaz.",
  },
  id: {
    original: "Asli",
    changed: "Diubah",
    privacy: "100 % di browser Anda — kedua teks tidak pernah meninggalkan perangkat Anda.",
  },
  vi: {
    original: "Bản gốc",
    changed: "Đã thay đổi",
    privacy: "100 % trong trình duyệt của bạn — cả hai văn bản không bao giờ rời khỏi thiết bị của bạn.",
  },
  sv: {
    original: "Original",
    changed: "Ändrad",
    privacy: "100 % i din webbläsare — båda texterna lämnar aldrig din enhet.",
  },
  pl: {
    original: "Oryginał",
    changed: "Zmieniony",
    privacy: "100 % w Twojej przeglądarce — oba teksty nigdy nie opuszczają Twojego urządzenia.",
  },
  uk: {
    original: "Оригінал",
    changed: "Змінений",
    privacy: "100 % у вашому браузері — обидва тексти ніколи не покидають ваш пристрій.",
  },
  cs: {
    original: "Originál",
    changed: "Změněný",
    privacy: "100 % ve vašem prohlížeči — oba texty nikdy neopustí vaše zařízení.",
  },
};

export function TextDiffClient() {
  const s = T[useLocale()] ?? T.en;

  const [a, setA] = useState("The quick brown fox\njumps over the lazy dog.\nA second line.\n");
  const [b, setB] = useState("The quick red fox\njumps over the lazy dog.\nAn added line.\nA second line.\n");

  const ops = useMemo(() => lineDiff(a, b), [a, b]);
  const stats = useMemo(() => {
    let add = 0, del = 0, eq = 0;
    for (const o of ops) (o.type === "add" ? add++ : o.type === "del" ? del++ : eq++);
    return { add, del, eq };
  }, [ops]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-400">{s.original}</label>
          <textarea value={a} onChange={(e) => setA(e.target.value)} spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-400">{s.changed}</label>
          <textarea value={b} onChange={(e) => setB(e.target.value)} spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-ink-500">
        <span className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-emerald-700">+{stats.add}</span>
        <span className="rounded bg-red-50 px-2 py-0.5 font-mono text-red-700">−{stats.del}</span>
        <span className="rounded bg-ink-50 px-2 py-0.5 font-mono text-ink-500">={stats.eq}</span>
      </div>

      <pre className="overflow-auto rounded-lg border border-ink-100 bg-white p-4 font-mono text-sm leading-relaxed">
        {ops.map((o, i) => (
          <div key={i} className={
            o.type === "add" ? "bg-emerald-50 text-emerald-800" :
            o.type === "del" ? "bg-red-50 text-red-800" : "text-ink-700"
          }>
            <span className="select-none pr-2 text-ink-300">{o.type === "add" ? "+" : o.type === "del" ? "−" : " "}</span>
            {o.text || " "}
          </div>
        ))}
      </pre>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
