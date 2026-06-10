"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

type Unit = "metric" | "imperial";

const T: Record<string, Record<string, string>> = {
  en: {
    metricBtn: "Metric (cm / kg)",
    imperialBtn: "Imperial (ft / lb)",
    heightCm: "Height (cm)",
    weightKg: "Weight (kg)",
    heightFt: "Height (ft)",
    heightIn: "Height (in)",
    weightLb: "Weight (lb)",
    yourBmi: "Your BMI",
    underweight: "Underweight",
    healthy: "Healthy weight",
    overweight: "Overweight",
    obese: "Obese",
    disclaimer: "BMI is a rough screening tool and doesn't account for muscle mass, age or build. For guidance only, not medical advice.",
  },
  fr: {
    metricBtn: "Métrique (cm / kg)",
    imperialBtn: "Impérial (ft / lb)",
    heightCm: "Taille (cm)",
    weightKg: "Poids (kg)",
    heightFt: "Taille (ft)",
    heightIn: "Taille (po)",
    weightLb: "Poids (lb)",
    yourBmi: "Votre IMC",
    underweight: "Insuffisance pondérale",
    healthy: "Poids normal",
    overweight: "Surpoids",
    obese: "Obésité",
    disclaimer: "L'IMC est un outil de dépistage approximatif qui ne tient pas compte de la masse musculaire, de l'âge ou de la morphologie. À titre indicatif uniquement, pas un conseil médical.",
  },
  es: {
    metricBtn: "Métrico (cm / kg)",
    imperialBtn: "Imperial (ft / lb)",
    heightCm: "Altura (cm)",
    weightKg: "Peso (kg)",
    heightFt: "Altura (ft)",
    heightIn: "Altura (pulg)",
    weightLb: "Peso (lb)",
    yourBmi: "Su IMC",
    underweight: "Bajo peso",
    healthy: "Peso saludable",
    overweight: "Sobrepeso",
    obese: "Obesidad",
    disclaimer: "El IMC es una herramienta de detección aproximada y no tiene en cuenta la masa muscular, la edad o la constitución. Solo orientativo, no es consejo médico.",
  },
  pt: {
    metricBtn: "Métrico (cm / kg)",
    imperialBtn: "Imperial (ft / lb)",
    heightCm: "Altura (cm)",
    weightKg: "Peso (kg)",
    heightFt: "Altura (ft)",
    heightIn: "Altura (pol)",
    weightLb: "Peso (lb)",
    yourBmi: "O seu IMC",
    underweight: "Abaixo do peso",
    healthy: "Peso saudável",
    overweight: "Excesso de peso",
    obese: "Obesidade",
    disclaimer: "O IMC é uma ferramenta de triagem aproximada e não tem em conta a massa muscular, a idade ou a constituição física. Apenas para orientação, não é conselho médico.",
  },
  de: {
    metricBtn: "Metrisch (cm / kg)",
    imperialBtn: "Imperial (ft / lb)",
    heightCm: "Größe (cm)",
    weightKg: "Gewicht (kg)",
    heightFt: "Größe (ft)",
    heightIn: "Größe (Zoll)",
    weightLb: "Gewicht (lb)",
    yourBmi: "Ihr BMI",
    underweight: "Untergewicht",
    healthy: "Normalgewicht",
    overweight: "Übergewicht",
    obese: "Adipositas",
    disclaimer: "Der BMI ist ein grobes Screening-Tool und berücksichtigt keine Muskelmasse, kein Alter oder keinen Körperbau. Nur zur Orientierung, keine medizinische Beratung.",
  },
  it: {
    metricBtn: "Metrico (cm / kg)",
    imperialBtn: "Imperiale (ft / lb)",
    heightCm: "Altezza (cm)",
    weightKg: "Peso (kg)",
    heightFt: "Altezza (ft)",
    heightIn: "Altezza (pol)",
    weightLb: "Peso (lb)",
    yourBmi: "Il tuo BMI",
    underweight: "Sottopeso",
    healthy: "Peso normale",
    overweight: "Sovrappeso",
    obese: "Obeso",
    disclaimer: "Il BMI è uno strumento di screening approssimativo e non tiene conto della massa muscolare, dell'età o della corporatura. Solo a scopo informativo, non è una consulenza medica.",
  },
  nl: {
    metricBtn: "Metrisch (cm / kg)",
    imperialBtn: "Imperiaal (ft / lb)",
    heightCm: "Lengte (cm)",
    weightKg: "Gewicht (kg)",
    heightFt: "Lengte (ft)",
    heightIn: "Lengte (inch)",
    weightLb: "Gewicht (lb)",
    yourBmi: "Uw BMI",
    underweight: "Ondergewicht",
    healthy: "Gezond gewicht",
    overweight: "Overgewicht",
    obese: "Obesitas",
    disclaimer: "BMI is een ruwe screeningstool en houdt geen rekening met spiermassa, leeftijd of lichaamsbouw. Alleen ter informatie, geen medisch advies.",
  },
  ja: {
    metricBtn: "メートル法 (cm / kg)",
    imperialBtn: "ヤード・ポンド法 (ft / lb)",
    heightCm: "身長 (cm)",
    weightKg: "体重 (kg)",
    heightFt: "身長 (フィート)",
    heightIn: "身長 (インチ)",
    weightLb: "体重 (ポンド)",
    yourBmi: "あなたの BMI",
    underweight: "低体重",
    healthy: "標準体重",
    overweight: "過体重",
    obese: "肥満",
    disclaimer: "BMI は大まかなスクリーニング指標であり、筋肉量・年齢・体型は考慮されません。参考のみ、医療アドバイスではありません。",
  },
  zh: {
    metricBtn: "公制 (cm / kg)",
    imperialBtn: "英制 (ft / lb)",
    heightCm: "身高 (cm)",
    weightKg: "体重 (kg)",
    heightFt: "身高 (英尺)",
    heightIn: "身高 (英寸)",
    weightLb: "体重 (磅)",
    yourBmi: "您的 BMI",
    underweight: "偏轻",
    healthy: "正常",
    overweight: "超重",
    obese: "肥胖",
    disclaimer: "BMI 是粗略的筛查工具，不考虑肌肉量、年龄或体型。仅供参考，非医疗建议。",
  },
  ko: {
    metricBtn: "미터법 (cm / kg)",
    imperialBtn: "야드파운드법 (ft / lb)",
    heightCm: "키 (cm)",
    weightKg: "체중 (kg)",
    heightFt: "키 (피트)",
    heightIn: "키 (인치)",
    weightLb: "체중 (파운드)",
    yourBmi: "내 BMI",
    underweight: "저체중",
    healthy: "정상 체중",
    overweight: "과체중",
    obese: "비만",
    disclaimer: "BMI는 대략적인 선별 도구로 근육량, 나이 또는 체형을 고려하지 않습니다. 참고용이며 의료 조언이 아닙니다.",
  },
  ar: {
    metricBtn: "متري (cm / kg)",
    imperialBtn: "إمبراطوري (ft / lb)",
    heightCm: "الطول (سم)",
    weightKg: "الوزن (كجم)",
    heightFt: "الطول (قدم)",
    heightIn: "الطول (بوصة)",
    weightLb: "الوزن (رطل)",
    yourBmi: "مؤشر كتلة جسمك",
    underweight: "نقص الوزن",
    healthy: "وزن صحي",
    overweight: "زيادة الوزن",
    obese: "سمنة",
    disclaimer: "مؤشر كتلة الجسم أداة فحص تقريبية ولا يأخذ في الاعتبار الكتلة العضلية أو العمر أو البنية الجسدية. للاسترشاد فقط، وليس نصيحة طبية.",
  },
  ru: {
    metricBtn: "Метрическая (см / кг)",
    imperialBtn: "Имперская (фут / фунт)",
    heightCm: "Рост (см)",
    weightKg: "Вес (кг)",
    heightFt: "Рост (фут)",
    heightIn: "Рост (дюйм)",
    weightLb: "Вес (фунт)",
    yourBmi: "Ваш ИМТ",
    underweight: "Недовес",
    healthy: "Нормальный вес",
    overweight: "Избыточный вес",
    obese: "Ожирение",
    disclaimer: "ИМТ — это приблизительный инструмент скрининга и не учитывает мышечную массу, возраст или телосложение. Только для ориентации, не является медицинской консультацией.",
  },
  hi: {
    metricBtn: "मीट्रिक (cm / kg)",
    imperialBtn: "इम्पीरियल (ft / lb)",
    heightCm: "ऊंचाई (cm)",
    weightKg: "वजन (kg)",
    heightFt: "ऊंचाई (ft)",
    heightIn: "ऊंचाई (in)",
    weightLb: "वजन (lb)",
    yourBmi: "आपका BMI",
    underweight: "कम वजन",
    healthy: "स्वस्थ वजन",
    overweight: "अधिक वजन",
    obese: "मोटापा",
    disclaimer: "BMI एक अनुमानित स्क्रीनिंग उपकरण है और मांसपेशियों, उम्र या शरीर की संरचना को ध्यान में नहीं रखता। केवल मार्गदर्शन के लिए, चिकित्सा सलाह नहीं।",
  },
  tr: {
    metricBtn: "Metrik (cm / kg)",
    imperialBtn: "İmparatorluk (ft / lb)",
    heightCm: "Boy (cm)",
    weightKg: "Ağırlık (kg)",
    heightFt: "Boy (ft)",
    heightIn: "Boy (in)",
    weightLb: "Ağırlık (lb)",
    yourBmi: "VKİ'niz",
    underweight: "Düşük kilolu",
    healthy: "Sağlıklı kilo",
    overweight: "Fazla kilolu",
    obese: "Obez",
    disclaimer: "VKİ, kas kütlesini, yaşı veya vücut yapısını dikkate almayan kaba bir tarama aracıdır. Yalnızca rehberlik amaçlıdır, tıbbi tavsiye değildir.",
  },
  id: {
    metricBtn: "Metrik (cm / kg)",
    imperialBtn: "Imperial (ft / lb)",
    heightCm: "Tinggi badan (cm)",
    weightKg: "Berat badan (kg)",
    heightFt: "Tinggi badan (ft)",
    heightIn: "Tinggi badan (in)",
    weightLb: "Berat badan (lb)",
    yourBmi: "BMI Anda",
    underweight: "Berat badan kurang",
    healthy: "Berat badan normal",
    overweight: "Kelebihan berat badan",
    obese: "Obesitas",
    disclaimer: "BMI adalah alat skrining kasar dan tidak memperhitungkan massa otot, usia, atau bentuk tubuh. Hanya untuk panduan, bukan saran medis.",
  },
  vi: {
    metricBtn: "Hệ mét (cm / kg)",
    imperialBtn: "Hệ đế quốc (ft / lb)",
    heightCm: "Chiều cao (cm)",
    weightKg: "Cân nặng (kg)",
    heightFt: "Chiều cao (ft)",
    heightIn: "Chiều cao (inch)",
    weightLb: "Cân nặng (lb)",
    yourBmi: "BMI của bạn",
    underweight: "Thiếu cân",
    healthy: "Cân nặng lành mạnh",
    overweight: "Thừa cân",
    obese: "Béo phì",
    disclaimer: "BMI là công cụ sàng lọc thô và không tính đến khối lượng cơ, tuổi tác hay vóc dáng. Chỉ mang tính tham khảo, không phải lời khuyên y tế.",
  },
  sv: {
    metricBtn: "Metriskt (cm / kg)",
    imperialBtn: "Imperiellt (ft / lb)",
    heightCm: "Längd (cm)",
    weightKg: "Vikt (kg)",
    heightFt: "Längd (ft)",
    heightIn: "Längd (tum)",
    weightLb: "Vikt (lb)",
    yourBmi: "Ditt BMI",
    underweight: "Undervikt",
    healthy: "Normalvikt",
    overweight: "Övervikt",
    obese: "Fetma",
    disclaimer: "BMI är ett grovt screeningverktyg och tar inte hänsyn till muskelmassa, ålder eller kroppsbyggnad. Endast vägledning, inte medicinsk rådgivning.",
  },
  pl: {
    metricBtn: "Metryczny (cm / kg)",
    imperialBtn: "Imperialny (ft / lb)",
    heightCm: "Wzrost (cm)",
    weightKg: "Waga (kg)",
    heightFt: "Wzrost (ft)",
    heightIn: "Wzrost (cal)",
    weightLb: "Waga (lb)",
    yourBmi: "Twoje BMI",
    underweight: "Niedowaga",
    healthy: "Prawidłowa waga",
    overweight: "Nadwaga",
    obese: "Otyłość",
    disclaimer: "BMI to przybliżone narzędzie przesiewowe, które nie uwzględnia masy mięśniowej, wieku ani budowy ciała. Tylko informacyjnie, nie jest to porada medyczna.",
  },
  uk: {
    metricBtn: "Метрична (см / кг)",
    imperialBtn: "Імперська (фут / фунт)",
    heightCm: "Зріст (см)",
    weightKg: "Вага (кг)",
    heightFt: "Зріст (фут)",
    heightIn: "Зріст (дюйм)",
    weightLb: "Вага (фунт)",
    yourBmi: "Ваш ІМТ",
    underweight: "Недостатня вага",
    healthy: "Нормальна вага",
    overweight: "Надмірна вага",
    obese: "Ожиріння",
    disclaimer: "ІМТ — приблизний інструмент скринінгу, який не враховує м'язову масу, вік або статуру. Лише для орієнтації, не є медичною консультацією.",
  },
  cs: {
    metricBtn: "Metrický (cm / kg)",
    imperialBtn: "Imperiální (ft / lb)",
    heightCm: "Výška (cm)",
    weightKg: "Hmotnost (kg)",
    heightFt: "Výška (ft)",
    heightIn: "Výška (palce)",
    weightLb: "Hmotnost (lb)",
    yourBmi: "Vaše BMI",
    underweight: "Podváha",
    healthy: "Zdravá hmotnost",
    overweight: "Nadváha",
    obese: "Obezita",
    disclaimer: "BMI je hrubý screeningový nástroj a nebere v úvahu svalovou hmotu, věk ani stavbu těla. Pouze pro orientaci, není to lékařská rada.",
  },
};

function category(bmi: number, s: Record<string, string>): { label: string; tone: string } {
  if (bmi < 18.5) return { label: s.underweight, tone: "text-sky-700" };
  if (bmi < 25) return { label: s.healthy, tone: "text-emerald-700" };
  if (bmi < 30) return { label: s.overweight, tone: "text-amber-700" };
  return { label: s.obese, tone: "text-red-700" };
}

export function BmiCalculatorClient() {
  const s = T[useLocale()] ?? T.en;

  const [unit, setUnit] = useState<Unit>("metric");
  // metric
  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("70");
  // imperial
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("154");

  const bmi = useMemo(() => {
    if (unit === "metric") {
      const h = Number(cm) / 100, w = Number(kg);
      if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return NaN;
      return w / (h * h);
    }
    const totalIn = Number(ft) * 12 + Number(inch), w = Number(lb);
    if (!Number.isFinite(totalIn) || !Number.isFinite(w) || totalIn <= 0 || w <= 0) return NaN;
    return (w / (totalIn * totalIn)) * 703;
  }, [unit, cm, kg, ft, inch, lb]);

  const ok = Number.isFinite(bmi);
  const cat = ok ? category(bmi, s) : null;

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${unit === u ? "bg-brand-500 text-white" : "text-ink-600"}`}>
            {u === "metric" ? s.metricBtn : s.imperialBtn}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.heightCm}
            <input type="number" min={0} value={cm} onChange={(e) => setCm(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.weightKg}
            <input type="number" min={0} value={kg} onChange={(e) => setKg(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.heightFt}
            <input type="number" min={0} value={ft} onChange={(e) => setFt(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.heightIn}
            <input type="number" min={0} value={inch} onChange={(e) => setInch(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.weightLb}
            <input type="number" min={0} value={lb} onChange={(e) => setLb(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
        </div>
      )}

      <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-5">
        <div className="text-xs uppercase tracking-wide text-brand-700">{s.yourBmi}</div>
        <div className="mt-1 flex items-baseline gap-3">
          <div className="text-3xl font-semibold text-ink-900">{ok ? bmi.toFixed(1) : "—"}</div>
          {cat && <div className={`text-sm font-semibold ${cat.tone}`}>{cat.label}</div>}
        </div>
      </div>

      <p className="text-xs text-ink-400">{s.disclaimer}</p>
    </div>
  );
}
