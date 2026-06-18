"use client";

import { useMemo, useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

// All factors are "to the base unit"; conversion is value * fromFactor / toFactor.
type LinearGroup = { id: string; label: string; base: string; units: { id: string; label: string; factor: number }[] };

const GROUPS: LinearGroup[] = [
  { id: "length", label: "Length", base: "m", units: [
    { id: "mm", label: "Millimetres", factor: 0.001 },
    { id: "cm", label: "Centimetres", factor: 0.01 },
    { id: "m", label: "Metres", factor: 1 },
    { id: "km", label: "Kilometres", factor: 1000 },
    { id: "in", label: "Inches", factor: 0.0254 },
    { id: "ft", label: "Feet", factor: 0.3048 },
    { id: "yd", label: "Yards", factor: 0.9144 },
    { id: "mi", label: "Miles", factor: 1609.344 },
  ] },
  { id: "weight", label: "Weight", base: "g", units: [
    { id: "mg", label: "Milligrams", factor: 0.001 },
    { id: "g", label: "Grams", factor: 1 },
    { id: "kg", label: "Kilograms", factor: 1000 },
    { id: "t", label: "Tonnes", factor: 1_000_000 },
    { id: "oz", label: "Ounces", factor: 28.3495 },
    { id: "lb", label: "Pounds", factor: 453.592 },
  ] },
  { id: "area", label: "Area", base: "m²", units: [
    { id: "cm2", label: "cm²", factor: 0.0001 },
    { id: "m2", label: "m²", factor: 1 },
    { id: "km2", label: "km²", factor: 1_000_000 },
    { id: "ha", label: "Hectares", factor: 10_000 },
    { id: "ft2", label: "ft²", factor: 0.092903 },
    { id: "ac", label: "Acres", factor: 4046.86 },
  ] },
  { id: "speed", label: "Speed", base: "m/s", units: [
    { id: "ms", label: "m/s", factor: 1 },
    { id: "kmh", label: "km/h", factor: 1 / 3.6 },
    { id: "mph", label: "mph", factor: 0.44704 },
    { id: "kn", label: "Knots", factor: 0.514444 },
    { id: "fts", label: "ft/s", factor: 0.3048 },
  ] },
];

function convertLinear(value: number, fromFactor: number, toFactor: number) {
  return (value * fromFactor) / toFactor;
}

// Temperature isn't a linear scale, handled separately.
function convertTemp(v: number, from: string, to: string): number {
  let c: number;
  if (from === "C") c = v; else if (from === "F") c = (v - 32) * 5 / 9; else c = v - 273.15;
  if (to === "C") return c; if (to === "F") return c * 9 / 5 + 32; return c + 273.15;
}

function round(n: number) {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs === 0 ? 0 : abs < 0.01 ? 6 : abs < 1 ? 4 : abs < 100 ? 3 : 2;
  return n.toFixed(digits).replace(/\.?0+$/, "");
}

const T: Record<string, Record<string, string>> = {
  en: {
    from: "From",
    to: "To",
    privacy: "Instant, in-browser conversion. Free and unlimited.",
    length: "Length",
    weight: "Weight",
    area: "Area",
    speed: "Speed",
    temperature: "Temperature",
    millimetres: "Millimetres",
    centimetres: "Centimetres",
    metres: "Metres",
    kilometres: "Kilometres",
    inches: "Inches",
    feet: "Feet",
    yards: "Yards",
    miles: "Miles",
    milligrams: "Milligrams",
    grams: "Grams",
    kilograms: "Kilograms",
    tonnes: "Tonnes",
    ounces: "Ounces",
    pounds: "Pounds",
    hectares: "Hectares",
    acres: "Acres",
    knots: "Knots",
  },
  fr: {
    from: "De",
    to: "Vers",
    privacy: "Conversion instantanée dans le navigateur. Gratuit et illimité.",
    length: "Longueur",
    weight: "Poids",
    area: "Superficie",
    speed: "Vitesse",
    temperature: "Température",
    millimetres: "Millimètres",
    centimetres: "Centimètres",
    metres: "Mètres",
    kilometres: "Kilomètres",
    inches: "Pouces",
    feet: "Pieds",
    yards: "Yards",
    miles: "Miles",
    milligrams: "Milligrammes",
    grams: "Grammes",
    kilograms: "Kilogrammes",
    tonnes: "Tonnes",
    ounces: "Onces",
    pounds: "Livres",
    hectares: "Hectares",
    acres: "Acres",
    knots: "Nœuds",
  },
  es: {
    from: "De",
    to: "A",
    privacy: "Conversión instantánea en el navegador. Gratis e ilimitada.",
    length: "Longitud",
    weight: "Peso",
    area: "Área",
    speed: "Velocidad",
    temperature: "Temperatura",
    millimetres: "Milímetros",
    centimetres: "Centímetros",
    metres: "Metros",
    kilometres: "Kilómetros",
    inches: "Pulgadas",
    feet: "Pies",
    yards: "Yardas",
    miles: "Millas",
    milligrams: "Miligramos",
    grams: "Gramos",
    kilograms: "Kilogramos",
    tonnes: "Toneladas",
    ounces: "Onzas",
    pounds: "Libras",
    hectares: "Hectáreas",
    acres: "Acres",
    knots: "Nudos",
  },
  pt: {
    from: "De",
    to: "Para",
    privacy: "Conversão instantânea no navegador. Gratuito e ilimitado.",
    length: "Comprimento",
    weight: "Peso",
    area: "Área",
    speed: "Velocidade",
    temperature: "Temperatura",
    millimetres: "Milímetros",
    centimetres: "Centímetros",
    metres: "Metros",
    kilometres: "Quilômetros",
    inches: "Polegadas",
    feet: "Pés",
    yards: "Jardas",
    miles: "Milhas",
    milligrams: "Miligramas",
    grams: "Gramas",
    kilograms: "Quilogramas",
    tonnes: "Toneladas",
    ounces: "Onças",
    pounds: "Libras",
    hectares: "Hectares",
    acres: "Acres",
    knots: "Nós",
  },
  de: {
    from: "Von",
    to: "Nach",
    privacy: "Sofortige Umrechnung im Browser. Kostenlos und unbegrenzt.",
    length: "Länge",
    weight: "Gewicht",
    area: "Fläche",
    speed: "Geschwindigkeit",
    temperature: "Temperatur",
    millimetres: "Millimeter",
    centimetres: "Zentimeter",
    metres: "Meter",
    kilometres: "Kilometer",
    inches: "Zoll",
    feet: "Fuß",
    yards: "Yards",
    miles: "Meilen",
    milligrams: "Milligramm",
    grams: "Gramm",
    kilograms: "Kilogramm",
    tonnes: "Tonnen",
    ounces: "Unzen",
    pounds: "Pfund",
    hectares: "Hektar",
    acres: "Acres",
    knots: "Knoten",
  },
  it: {
    from: "Da",
    to: "A",
    privacy: "Conversione istantanea nel browser. Gratuito e illimitato.",
    length: "Lunghezza",
    weight: "Peso",
    area: "Area",
    speed: "Velocità",
    temperature: "Temperatura",
    millimetres: "Millimetri",
    centimetres: "Centimetri",
    metres: "Metri",
    kilometres: "Chilometri",
    inches: "Pollici",
    feet: "Piedi",
    yards: "Iarde",
    miles: "Miglia",
    milligrams: "Milligrammi",
    grams: "Grammi",
    kilograms: "Chilogrammi",
    tonnes: "Tonnellate",
    ounces: "Once",
    pounds: "Libbre",
    hectares: "Ettari",
    acres: "Acri",
    knots: "Nodi",
  },
  nl: {
    from: "Van",
    to: "Naar",
    privacy: "Directe omzetting in de browser. Gratis en onbeperkt.",
    length: "Lengte",
    weight: "Gewicht",
    area: "Oppervlakte",
    speed: "Snelheid",
    temperature: "Temperatuur",
    millimetres: "Millimeter",
    centimetres: "Centimeter",
    metres: "Meter",
    kilometres: "Kilometer",
    inches: "Inch",
    feet: "Voet",
    yards: "Yard",
    miles: "Mijl",
    milligrams: "Milligram",
    grams: "Gram",
    kilograms: "Kilogram",
    tonnes: "Ton",
    ounces: "Ons",
    pounds: "Pond",
    hectares: "Hectare",
    acres: "Acres",
    knots: "Knopen",
  },
  ja: {
    from: "変換元",
    to: "変換先",
    privacy: "ブラウザ内で即時変換。無料・無制限。",
    length: "長さ",
    weight: "重さ",
    area: "面積",
    speed: "速度",
    temperature: "温度",
    millimetres: "ミリメートル",
    centimetres: "センチメートル",
    metres: "メートル",
    kilometres: "キロメートル",
    inches: "インチ",
    feet: "フィート",
    yards: "ヤード",
    miles: "マイル",
    milligrams: "ミリグラム",
    grams: "グラム",
    kilograms: "キログラム",
    tonnes: "トン",
    ounces: "オンス",
    pounds: "ポンド",
    hectares: "ヘクタール",
    acres: "エーカー",
    knots: "ノット",
  },
  zh: {
    from: "从",
    to: "到",
    privacy: "浏览器内即时转换。免费且无限制。",
    length: "长度",
    weight: "重量",
    area: "面积",
    speed: "速度",
    temperature: "温度",
    millimetres: "毫米",
    centimetres: "厘米",
    metres: "米",
    kilometres: "千米",
    inches: "英寸",
    feet: "英尺",
    yards: "码",
    miles: "英里",
    milligrams: "毫克",
    grams: "克",
    kilograms: "千克",
    tonnes: "吨",
    ounces: "盎司",
    pounds: "磅",
    hectares: "公顷",
    acres: "英亩",
    knots: "节",
  },
  ko: {
    from: "변환 전",
    to: "변환 후",
    privacy: "브라우저에서 즉시 변환. 무료 및 무제한.",
    length: "길이",
    weight: "무게",
    area: "면적",
    speed: "속도",
    temperature: "온도",
    millimetres: "밀리미터",
    centimetres: "센티미터",
    metres: "미터",
    kilometres: "킬로미터",
    inches: "인치",
    feet: "피트",
    yards: "야드",
    miles: "마일",
    milligrams: "밀리그램",
    grams: "그램",
    kilograms: "킬로그램",
    tonnes: "톤",
    ounces: "온스",
    pounds: "파운드",
    hectares: "헥타르",
    acres: "에이커",
    knots: "노트",
  },
  ar: {
    from: "من",
    to: "إلى",
    privacy: "تحويل فوري في المتصفح. مجاني وغير محدود.",
    length: "الطول",
    weight: "الوزن",
    area: "المساحة",
    speed: "السرعة",
    temperature: "درجة الحرارة",
    millimetres: "ملليمتر",
    centimetres: "سنتيمتر",
    metres: "متر",
    kilometres: "كيلومتر",
    inches: "بوصة",
    feet: "قدم",
    yards: "ياردة",
    miles: "ميل",
    milligrams: "ملليغرام",
    grams: "غرام",
    kilograms: "كيلوغرام",
    tonnes: "طن",
    ounces: "أونصة",
    pounds: "رطل",
    hectares: "هكتار",
    acres: "فدان",
    knots: "عقدة",
  },
  ru: {
    from: "Из",
    to: "В",
    privacy: "Мгновенная конвертация в браузере. Бесплатно и без ограничений.",
    length: "Длина",
    weight: "Вес",
    area: "Площадь",
    speed: "Скорость",
    temperature: "Температура",
    millimetres: "Миллиметры",
    centimetres: "Сантиметры",
    metres: "Метры",
    kilometres: "Километры",
    inches: "Дюймы",
    feet: "Футы",
    yards: "Ярды",
    miles: "Мили",
    milligrams: "Миллиграммы",
    grams: "Граммы",
    kilograms: "Килограммы",
    tonnes: "Тонны",
    ounces: "Унции",
    pounds: "Фунты",
    hectares: "Гектары",
    acres: "Акры",
    knots: "Узлы",
  },
  hi: {
    from: "से",
    to: "तक",
    privacy: "ब्राउज़र में तात्कालिक रूपांतरण। मुफ़्त और असीमित।",
    length: "लंबाई",
    weight: "वजन",
    area: "क्षेत्रफल",
    speed: "गति",
    temperature: "तापमान",
    millimetres: "मिलीमीटर",
    centimetres: "सेंटीमीटर",
    metres: "मीटर",
    kilometres: "किलोमीटर",
    inches: "इंच",
    feet: "फुट",
    yards: "यार्ड",
    miles: "मील",
    milligrams: "मिलीग्राम",
    grams: "ग्राम",
    kilograms: "किलोग्राम",
    tonnes: "टन",
    ounces: "औंस",
    pounds: "पाउंड",
    hectares: "हेक्टेयर",
    acres: "एकड़",
    knots: "नॉट",
  },
  tr: {
    from: "Kaynak",
    to: "Hedef",
    privacy: "Tarayıcıda anında dönüştürme. Ücretsiz ve sınırsız.",
    length: "Uzunluk",
    weight: "Ağırlık",
    area: "Alan",
    speed: "Hız",
    temperature: "Sıcaklık",
    millimetres: "Milimetre",
    centimetres: "Santimetre",
    metres: "Metre",
    kilometres: "Kilometre",
    inches: "İnç",
    feet: "Ayak",
    yards: "Yarda",
    miles: "Mil",
    milligrams: "Miligram",
    grams: "Gram",
    kilograms: "Kilogram",
    tonnes: "Ton",
    ounces: "Ons",
    pounds: "Pound",
    hectares: "Hektar",
    acres: "Dönüm",
    knots: "Deniz mili/s",
  },
  id: {
    from: "Dari",
    to: "Ke",
    privacy: "Konversi instan di browser. Gratis dan tak terbatas.",
    length: "Panjang",
    weight: "Berat",
    area: "Luas",
    speed: "Kecepatan",
    temperature: "Suhu",
    millimetres: "Milimeter",
    centimetres: "Sentimeter",
    metres: "Meter",
    kilometres: "Kilometer",
    inches: "Inci",
    feet: "Kaki",
    yards: "Yard",
    miles: "Mil",
    milligrams: "Miligram",
    grams: "Gram",
    kilograms: "Kilogram",
    tonnes: "Ton",
    ounces: "Ons",
    pounds: "Pound",
    hectares: "Hektare",
    acres: "Acre",
    knots: "Knot",
  },
  vi: {
    from: "Từ",
    to: "Đến",
    privacy: "Chuyển đổi tức thì trong trình duyệt. Miễn phí và không giới hạn.",
    length: "Chiều dài",
    weight: "Trọng lượng",
    area: "Diện tích",
    speed: "Tốc độ",
    temperature: "Nhiệt độ",
    millimetres: "Milimét",
    centimetres: "Centimét",
    metres: "Mét",
    kilometres: "Kilômét",
    inches: "Inch",
    feet: "Feet",
    yards: "Yard",
    miles: "Dặm",
    milligrams: "Miligam",
    grams: "Gam",
    kilograms: "Kilôgam",
    tonnes: "Tấn",
    ounces: "Ounce",
    pounds: "Pound",
    hectares: "Hecta",
    acres: "Mẫu Anh",
    knots: "Hải lý/giờ",
  },
  sv: {
    from: "Från",
    to: "Till",
    privacy: "Omedelbar konvertering i webbläsaren. Gratis och obegränsat.",
    length: "Längd",
    weight: "Vikt",
    area: "Area",
    speed: "Hastighet",
    temperature: "Temperatur",
    millimetres: "Millimeter",
    centimetres: "Centimeter",
    metres: "Meter",
    kilometres: "Kilometer",
    inches: "Tum",
    feet: "Fot",
    yards: "Yards",
    miles: "Mil",
    milligrams: "Milligram",
    grams: "Gram",
    kilograms: "Kilogram",
    tonnes: "Ton",
    ounces: "Uns",
    pounds: "Pund",
    hectares: "Hektar",
    acres: "Acres",
    knots: "Knop",
  },
  pl: {
    from: "Z",
    to: "Na",
    privacy: "Natychmiastowa konwersja w przeglądarce. Bezpłatnie i bez ograniczeń.",
    length: "Długość",
    weight: "Waga",
    area: "Powierzchnia",
    speed: "Prędkość",
    temperature: "Temperatura",
    millimetres: "Milimetry",
    centimetres: "Centymetry",
    metres: "Metry",
    kilometres: "Kilometry",
    inches: "Cale",
    feet: "Stopy",
    yards: "Jardy",
    miles: "Mile",
    milligrams: "Miligramy",
    grams: "Gramy",
    kilograms: "Kilogramy",
    tonnes: "Tony",
    ounces: "Uncje",
    pounds: "Funty",
    hectares: "Hektary",
    acres: "Akry",
    knots: "Węzły",
  },
  uk: {
    from: "З",
    to: "У",
    privacy: "Миттєве перетворення в браузері. Безкоштовно та без обмежень.",
    length: "Довжина",
    weight: "Вага",
    area: "Площа",
    speed: "Швидкість",
    temperature: "Температура",
    millimetres: "Міліметри",
    centimetres: "Сантиметри",
    metres: "Метри",
    kilometres: "Кілометри",
    inches: "Дюйми",
    feet: "Фути",
    yards: "Ярди",
    miles: "Милі",
    milligrams: "Міліграми",
    grams: "Грами",
    kilograms: "Кілограми",
    tonnes: "Тонни",
    ounces: "Унції",
    pounds: "Фунти",
    hectares: "Гектари",
    acres: "Акри",
    knots: "Вузли",
  },
  cs: {
    from: "Z",
    to: "Na",
    privacy: "Okamžitá konverze v prohlížeči. Zdarma a bez omezení.",
    length: "Délka",
    weight: "Hmotnost",
    area: "Plocha",
    speed: "Rychlost",
    temperature: "Teplota",
    millimetres: "Milimetry",
    centimetres: "Centimetry",
    metres: "Metry",
    kilometres: "Kilometry",
    inches: "Palce",
    feet: "Stopy",
    yards: "Yardy",
    miles: "Míle",
    milligrams: "Miligramy",
    grams: "Gramy",
    kilograms: "Kilogramy",
    tonnes: "Tuny",
    ounces: "Unce",
    pounds: "Libry",
    hectares: "Hektary",
    acres: "Akry",
    knots: "Uzly",
  },
};

// Unit label translation map (keyed by English label)
const UNIT_LABEL_MAP: Record<string, keyof typeof T["en"]> = {
  Millimetres: "millimetres",
  Centimetres: "centimetres",
  Metres: "metres",
  Kilometres: "kilometres",
  Inches: "inches",
  Feet: "feet",
  Yards: "yards",
  Miles: "miles",
  Milligrams: "milligrams",
  Grams: "grams",
  Kilograms: "kilograms",
  Tonnes: "tonnes",
  Ounces: "ounces",
  Pounds: "pounds",
  Hectares: "hectares",
  Acres: "acres",
  Knots: "knots",
};

const GROUP_LABEL_MAP: Record<string, keyof typeof T["en"]> = {
  Length: "length",
  Weight: "weight",
  Area: "area",
  Speed: "speed",
};

export function UnitConverterClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [groupId, setGroupId] = useState("length");
  const [tempFrom, setTempFrom] = useState("C");
  const [tempTo, setTempTo] = useState("F");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [value, setValue] = useState<string>("1");
  const [copied, setCopied] = useState(false);

  const group = GROUPS.find((g) => g.id === groupId);

  const output = useMemo(() => {
    const v = parseFloat(value);
    if (!isFinite(v)) return "";
    if (groupId === "temperature") return round(convertTemp(v, tempFrom, tempTo));
    if (!group) return "";
    const f = group.units.find((u) => u.id === fromUnit)?.factor ?? 1;
    const t = group.units.find((u) => u.id === toUnit)?.factor ?? 1;
    return round(convertLinear(v, f, t));
  }, [value, group, groupId, fromUnit, toUnit, tempFrom, tempTo]);

  function swap() {
    if (groupId === "temperature") { setTempFrom(tempTo); setTempTo(tempFrom); }
    else { setFromUnit(toUnit); setToUnit(fromUnit); }
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  const selectCls = "rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

  const translatedGroups = [
    ...GROUPS.map((g) => ({ id: g.id, label: s[GROUP_LABEL_MAP[g.label] as keyof typeof T["en"]] ?? g.label })),
    { id: "temperature", label: s.temperature },
  ];

  function translateUnitLabel(label: string): string {
    const key = UNIT_LABEL_MAP[label];
    if (key) return s[key] ?? label;
    return label;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {translatedGroups.map((g) => (
          <button key={g.id} onClick={() => { setGroupId(g.id); if (g.id !== "temperature" && group) { setFromUnit(group.units[0].id); setToUnit(group.units[1]?.id ?? group.units[0].id); } }}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${groupId === g.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"}`}>
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid items-end gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-ink-500">{s.from}</label>
          <div className="flex gap-2">
            <input value={value} onChange={(e) => setValue(e.target.value)} type="number" inputMode="decimal" className={`flex-1 ${selectCls}`} />
            {groupId === "temperature" ? (
              <select value={tempFrom} onChange={(e) => setTempFrom(e.target.value)} className={selectCls}>
                <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
              </select>
            ) : (
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className={selectCls}>
                {group?.units.map((u) => <option key={u.id} value={u.id}>{translateUnitLabel(u.label)}</option>)}
              </select>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center pb-1">
          <Button size="sm" variant="outline" onClick={swap}><ArrowRightLeft className="h-3.5 w-3.5" /></Button>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-ink-500">{s.to}</label>
          <div className="flex gap-2">
            <input readOnly value={output} className={`flex-1 bg-ink-50/50 ${selectCls}`} />
            {groupId === "temperature" ? (
              <select value={tempTo} onChange={(e) => setTempTo(e.target.value)} className={selectCls}>
                <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
              </select>
            ) : (
              <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className={selectCls}>
                {group?.units.map((u) => <option key={u.id} value={u.id}>{translateUnitLabel(u.label)}</option>)}
              </select>
            )}
            <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      </div>
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
