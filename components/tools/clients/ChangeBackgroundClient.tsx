"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { useLocale } from "@/hooks/useLocale";

// We reuse the @imgly/background-removal lib that already powers
// /remove-background. The CDN URL keeps onnxruntime-web out of the Next bundle.
type BgModule = { removeBackground: (input: Blob | string) => Promise<Blob> };
let bgCache: BgModule | null = null;
async function loadBg(): Promise<BgModule> {
  if (bgCache) return bgCache;
  const url = "https://esm.sh/@imgly/background-removal@1.5.6?bundle";
  bgCache = (await import(/* webpackIgnore: true */ url)) as BgModule;
  return bgCache;
}

type BgMode = "color" | "gradient" | "image";

const GRADIENTS: { id: string; label: string; from: string; to: string }[] = [
  { id: "sunset", label: "Sunset", from: "#ff7e5f", to: "#feb47b" },
  { id: "ocean", label: "Ocean", from: "#2193b0", to: "#6dd5ed" },
  { id: "purple", label: "Purple", from: "#7f00ff", to: "#e100ff" },
  { id: "mint", label: "Mint", from: "#56ab2f", to: "#a8e063" },
  { id: "rose", label: "Rose", from: "#ff5f6d", to: "#ffc371" },
  { id: "ink", label: "Ink", from: "#232526", to: "#414345" },
];

const T: Record<string, Record<string, string>> = {
  en: {
    subjectLabel: "Subject image",
    bgColor: "Background colour",
    bgImageLabel: "Background image",
    removingBg: "Removing the original background…",
    buildingBg: "Building the new background…",
    reApply: "Re-apply background",
    changeBg: "Change background",
    download: "Download",
    privacyNote: "Background removed locally with an on-device model — your image is never uploaded. First run downloads ~70 MB of weights; cached afterwards.",
    errorPrefix: "Could not change the background: ",
    pickBgImage: "Pick a background image, or switch to color/gradient.",
  },
  fr: {
    subjectLabel: "Image du sujet",
    bgColor: "Couleur d'arrière-plan",
    bgImageLabel: "Image d'arrière-plan",
    removingBg: "Suppression de l'arrière-plan d'origine…",
    buildingBg: "Construction du nouvel arrière-plan…",
    reApply: "Réappliquer l'arrière-plan",
    changeBg: "Changer l'arrière-plan",
    download: "Télécharger",
    privacyNote: "Arrière-plan supprimé localement avec un modèle embarqué — votre image n'est jamais envoyée. Le premier lancement télécharge ∼70 Mo de poids ; mis en cache ensuite.",
    errorPrefix: "Impossible de changer l'arrière-plan : ",
    pickBgImage: "Choisissez une image d'arrière-plan ou passez en couleur/dégradé.",
  },
  es: {
    subjectLabel: "Imagen del sujeto",
    bgColor: "Color de fondo",
    bgImageLabel: "Imagen de fondo",
    removingBg: "Eliminando el fondo original…",
    buildingBg: "Creando el nuevo fondo…",
    reApply: "Volver a aplicar fondo",
    changeBg: "Cambiar fondo",
    download: "Descargar",
    privacyNote: "Fondo eliminado localmente con un modelo en el dispositivo — tu imagen nunca se sube. La primera ejecución descarga ∼70 MB; se guarda en caché después.",
    errorPrefix: "No se pudo cambiar el fondo: ",
    pickBgImage: "Elige una imagen de fondo o cambia a color/degradado.",
  },
  pt: {
    subjectLabel: "Imagem do sujeito",
    bgColor: "Cor do fundo",
    bgImageLabel: "Imagem de fundo",
    removingBg: "Removendo o fundo original…",
    buildingBg: "Construindo o novo fundo…",
    reApply: "Reaplicar fundo",
    changeBg: "Alterar fundo",
    download: "Baixar",
    privacyNote: "Fundo removido localmente com um modelo no dispositivo — sua imagem nunca é enviada. A primeira execução baixa ∼70 MB; armazenado em cache depois.",
    errorPrefix: "Não foi possível alterar o fundo: ",
    pickBgImage: "Escolha uma imagem de fundo ou mude para cor/gradiente.",
  },
  de: {
    subjectLabel: "Motivbild",
    bgColor: "Hintergrundfarbe",
    bgImageLabel: "Hintergrundbild",
    removingBg: "Originalhintergrund wird entfernt…",
    buildingBg: "Neuer Hintergrund wird aufgebaut…",
    reApply: "Hintergrund erneut anwenden",
    changeBg: "Hintergrund ändern",
    download: "Herunterladen",
    privacyNote: "Hintergrund lokal mit einem On-Device-Modell entfernt — Ihr Bild wird niemals hochgeladen. Beim ersten Start werden ∼70 MB geladen; danach gecacht.",
    errorPrefix: "Hintergrund konnte nicht geändert werden: ",
    pickBgImage: "Wählen Sie ein Hintergrundbild aus oder wechseln Sie zu Farbe/Farbverlauf.",
  },
  it: {
    subjectLabel: "Immagine soggetto",
    bgColor: "Colore sfondo",
    bgImageLabel: "Immagine di sfondo",
    removingBg: "Rimozione dello sfondo originale…",
    buildingBg: "Creazione del nuovo sfondo…",
    reApply: "Applica sfondo di nuovo",
    changeBg: "Cambia sfondo",
    download: "Scarica",
    privacyNote: "Sfondo rimosso localmente con un modello on-device — la tua immagine non viene mai caricata. Al primo avvio scarica ∼70 MB; poi viene messo in cache.",
    errorPrefix: "Impossibile cambiare lo sfondo: ",
    pickBgImage: "Scegli un'immagine di sfondo oppure passa a colore/gradiente.",
  },
  nl: {
    subjectLabel: "Onderwerpafbeelding",
    bgColor: "Achtergrondkleur",
    bgImageLabel: "Achtergrondafbeelding",
    removingBg: "Originele achtergrond verwijderen…",
    buildingBg: "Nieuwe achtergrond opbouwen…",
    reApply: "Achtergrond opnieuw toepassen",
    changeBg: "Achtergrond wijzigen",
    download: "Downloaden",
    privacyNote: "Achtergrond lokaal verwijderd met een on-device model — uw afbeelding wordt nooit geüpload. Bij de eerste uitvoering worden ∼70 MB geladen; daarna gecached.",
    errorPrefix: "Kan achtergrond niet wijzigen: ",
    pickBgImage: "Kies een achtergrondafbeelding of schakel naar kleur/verloop.",
  },
  ja: {
    subjectLabel: "被写体の画像",
    bgColor: "背景色",
    bgImageLabel: "背景画像",
    removingBg: "元の背景を削除中…",
    buildingBg: "新しい背景を作成中…",
    reApply: "背景を再適用",
    changeBg: "背景を変更",
    download: "ダウンロード",
    privacyNote: "デバイス上のモデルでローカル処理 — 画像はアップロードされません。初回起動時に約 70 MB をダウンロードし、以後はキャッシュされます。",
    errorPrefix: "背景を変更できませんでした: ",
    pickBgImage: "背景画像を選ぶか、カラー/グラデーションに切り替えてください。",
  },
  zh: {
    subjectLabel: "主体图片",
    bgColor: "背景颜色",
    bgImageLabel: "背景图片",
    removingBg: "正在删除原始背景…",
    buildingBg: "正在构建新背景…",
    reApply: "重新应用背景",
    changeBg: "更换背景",
    download: "下载",
    privacyNote: "使用设备端模型在本地删除背景 — 您的图片永远不会被上传。首次运行下载约 70 MB；之后缓存。",
    errorPrefix: "无法更改背景: ",
    pickBgImage: "请选择背景图片，或切换到颜色/渐变。",
  },
  ko: {
    subjectLabel: "피사체 이미지",
    bgColor: "배경 색상",
    bgImageLabel: "배경 이미지",
    removingBg: "원래 배경 제거 중…",
    buildingBg: "새 배경 구성 중…",
    reApply: "배경 다시 적용",
    changeBg: "배경 변경",
    download: "다운로드",
    privacyNote: "디바이스 모델로 로컬에서 배경 제거 — 이미지는 절대 업로드되지 않습니다. 첫 실행 시 약 70 MB를 다운로드하고 이후 캐시됩니다.",
    errorPrefix: "배경을 변경할 수 없습니다: ",
    pickBgImage: "배경 이미지를 선택하거나 색상/그라데이션으로 전환하세요.",
  },
  ar: {
    subjectLabel: "صورة الموضوع",
    bgColor: "لون الخلفية",
    bgImageLabel: "صورة الخلفية",
    removingBg: "جارٍ إزالة الخلفية الأصلية…",
    buildingBg: "جارٍ بناء الخلفية الجديدة…",
    reApply: "إعادة تطبيق الخلفية",
    changeBg: "تغيير الخلفية",
    download: "تنزيل",
    privacyNote: "تتم إزالة الخلفية محليًا بنموذج على الجهاز — صورتك لن تُرفع أبدًا. التشغيل الأوّل يُنزّل ∼70 ميغابايت ثم يُخزَّن.",
    errorPrefix: "تعذّر تغيير الخلفية: ",
    pickBgImage: "اختر صورة خلفية أو انتقل إلى اللون/التدرج.",
  },
  ru: {
    subjectLabel: "Изображение объекта",
    bgColor: "Цвет фона",
    bgImageLabel: "Изображение фона",
    removingBg: "Удаляется исходный фон…",
    buildingBg: "Создаётся новый фон…",
    reApply: "Применить фон повторно",
    changeBg: "Изменить фон",
    download: "Скачать",
    privacyNote: "Фон удаляется локально с помощью модели на устройстве — ваше изображение никогда не загружается. При первом запуске скачивается ∼70 МБ; затем кешируется.",
    errorPrefix: "Не удалось изменить фон: ",
    pickBgImage: "Выберите фоновое изображение или переключитесь на цвет/градиент.",
  },
  hi: {
    subjectLabel: "विषय छवि",
    bgColor: "पृष्ठभूमि रंग",
    bgImageLabel: "पृष्ठभूमि छवि",
    removingBg: "मूल पृष्ठभूमि हटाई जा रही है…",
    buildingBg: "नई पृष्ठभूमि बनाई जा रही है…",
    reApply: "पृष्ठभूमि फिर से लागू करें",
    changeBg: "पृष्ठभूमि बदलें",
    download: "डाउनलोड",
    privacyNote: "डिवाइस मॉडल के साथ स्थानीय रूप से पृष्ठभूमि हटाई गई — आपकी छवि कभी अपलोड नहीं होती। पहली बार ∼70 MB डाउनलोड होती है; फिर कैश होती है।",
    errorPrefix: "पृष्ठभूमि नहीं बदली जा सकी: ",
    pickBgImage: "एक पृष्ठभूमि छवि चुनें या रंग/ग्रेडिएंट पर स्विच करें।",
  },
  tr: {
    subjectLabel: "Konu görseli",
    bgColor: "Arka plan rengi",
    bgImageLabel: "Arka plan görseli",
    removingBg: "Orijinal arka plan kaldırılıyor…",
    buildingBg: "Yeni arka plan oluşturuluyor…",
    reApply: "Arka planı yeniden uygula",
    changeBg: "Arka planı değiştir",
    download: "İndir",
    privacyNote: "Arka plan, cihaz üzerindeki bir modelle yerel olarak kaldırılıyor — görseliniz hiçbir zaman yüklenmez. İlk çalıştırmada ∼70 MB indirilir; sonra önbelleğe alınır.",
    errorPrefix: "Arka plan değiştirilemedi: ",
    pickBgImage: "Bir arka plan görseli seçin veya renk/degrade moduna geçin.",
  },
  id: {
    subjectLabel: "Gambar subjek",
    bgColor: "Warna latar belakang",
    bgImageLabel: "Gambar latar belakang",
    removingBg: "Menghapus latar belakang asli…",
    buildingBg: "Membangun latar belakang baru…",
    reApply: "Terapkan ulang latar belakang",
    changeBg: "Ganti latar belakang",
    download: "Unduh",
    privacyNote: "Latar belakang dihapus secara lokal menggunakan model di perangkat — gambar Anda tidak pernah diunggah. Pertama kali mengunduh ∼70 MB; selanjutnya di-cache.",
    errorPrefix: "Tidak dapat mengubah latar belakang: ",
    pickBgImage: "Pilih gambar latar belakang atau beralih ke warna/gradien.",
  },
  vi: {
    subjectLabel: "Ảnh chủ thể",
    bgColor: "Màu nền",
    bgImageLabel: "Ảnh nền",
    removingBg: "Đang xóa nền gốc…",
    buildingBg: "Đang tạo nền mới…",
    reApply: "Áp dụng lại nền",
    changeBg: "Đổi nền",
    download: "Tải xuống",
    privacyNote: "Nền được xóa cục bộ bằng mô hình trên thiết bị — ảnh của bạn không bao giờ được tải lên. Lần đầu tải ∼70 MB; sau đó được lưu vào bộ nhớ đệm.",
    errorPrefix: "Không thể thay đổi nền: ",
    pickBgImage: "Chọn ảnh nền hoặc chuyển sang màu sắc/dải màu.",
  },
  sv: {
    subjectLabel: "Motivbild",
    bgColor: "Bakgrundsfärg",
    bgImageLabel: "Bakgrundsbild",
    removingBg: "Tar bort originalbakgrunden…",
    buildingBg: "Skapar ny bakgrund…",
    reApply: "Applicera bakgrund igen",
    changeBg: "Byt bakgrund",
    download: "Ladda ner",
    privacyNote: "Bakgrunden tas bort lokalt med en on-device-modell — din bild laddas aldrig upp. Vid första körningen laddas ∼70 MB ned; cachas sedan.",
    errorPrefix: "Kunde inte ändra bakgrunden: ",
    pickBgImage: "Välj en bakgrundsbild eller byt till färg/gradient.",
  },
  pl: {
    subjectLabel: "Obraz obiektu",
    bgColor: "Kolor tła",
    bgImageLabel: "Obraz tła",
    removingBg: "Usuwanie oryginalnego tła…",
    buildingBg: "Tworzenie nowego tła…",
    reApply: "Zastosuj tło ponownie",
    changeBg: "Zmień tło",
    download: "Pobierz",
    privacyNote: "Tło usuwane lokalnie za pomocą modelu na urządzeniu — Twój obraz nigdy nie jest przesyłany. Pierwsze uruchomienie pobiera ∼70 MB; następnie jest w pamięci podręcznej.",
    errorPrefix: "Nie można zmienić tła: ",
    pickBgImage: "Wybierz obraz tła lub przełącz na kolor/gradient.",
  },
  uk: {
    subjectLabel: "Зображення об'єкта",
    bgColor: "Колір фону",
    bgImageLabel: "Зображення фону",
    removingBg: "Видалення оригінального фону…",
    buildingBg: "Створення нового фону…",
    reApply: "Застосувати фон знову",
    changeBg: "Змінити фон",
    download: "Завантажити",
    privacyNote: "Фон видаляється локально за допомогою моделі на пристрої — ваше зображення ніколи не завантажується. Перший запуск завантажує ∼70 МБ; потім кешується.",
    errorPrefix: "Не вдалося змінити фон: ",
    pickBgImage: "Виберіть фонове зображення або перейдіть до кольору/градієнта.",
  },
  cs: {
    subjectLabel: "Obrázek subjektu",
    bgColor: "Barva pozadí",
    bgImageLabel: "Obrázek pozadí",
    removingBg: "Odstraňování původního pozadí…",
    buildingBg: "Vytváření nového pozadí…",
    reApply: "Znovu použít pozadí",
    changeBg: "Změnit pozadí",
    download: "Stáhnout",
    privacyNote: "Pozadí odstraněno lokálně pomocí modelu na zařízení — váš obrázek není nikdy nahrán. První spuštění stahuje ∼70 MB; poté se ukládá do mezipaměti.",
    errorPrefix: "Nelze změnit pozadí: ",
    pickBgImage: "Vyberte obrázek pozadí nebo přepněte na barvu/přechod.",
  },
};

export function ChangeBackgroundClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [mode, setMode] = useState<BgMode>("color");
  const [color, setColor] = useState("#ffffff");
  const [gradient, setGradient] = useState(GRADIENTS[0]);
  const [cutoutBlob, setCutoutBlob] = useState<Blob | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [phase, setPhase] = useState<"idle" | "removing" | "compositing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string[]>([]);

  useEffect(() => () => { cleanup.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  async function ensureCutout(): Promise<Blob> {
    if (cutoutBlob) return cutoutBlob;
    setPhase("removing");
    const bg = await loadBg();
    const blob = await bg.removeBackground(file!);
    setCutoutBlob(blob);
    return blob;
  }

  async function buildBackground(width: number, height: number): Promise<HTMLCanvasElement> {
    const c = document.createElement("canvas");
    c.width = width; c.height = height;
    const ctx = c.getContext("2d")!;
    if (mode === "color") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    } else if (mode === "gradient") {
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, gradient.from); g.addColorStop(1, gradient.to);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    } else {
      if (!bgFile) throw new Error(s.pickBgImage);
      const bmp = await createImageBitmap(bgFile);
      // Cover the canvas while preserving the bg image's aspect ratio.
      const r = Math.max(width / bmp.width, height / bmp.height);
      const w = bmp.width * r, h = bmp.height * r;
      ctx.drawImage(bmp, (width - w) / 2, (height - h) / 2, w, h);
      bmp.close?.();
    }
    return c;
  }

  async function run() {
    if (!file) return;
    setError(null); setOutUrl(null); setPhase("removing");
    try {
      const cutout = await ensureCutout();
      setPhase("compositing");
      const subjBmp = await createImageBitmap(cutout);
      const bgCanvas = await buildBackground(subjBmp.width, subjBmp.height);
      const ctx = bgCanvas.getContext("2d")!;
      ctx.drawImage(subjBmp, 0, 0);
      subjBmp.close?.();
      const blob: Blob = await new Promise((res) => bgCanvas.toBlob((b) => res(b!), "image/png"));
      cleanup.current.forEach((u) => URL.revokeObjectURL(u));
      const url = URL.createObjectURL(blob);
      cleanup.current = [url];
      setOutUrl(url); setOutSize(blob.size); setPhase("done");
    } catch (e) {
      setError(`${s.errorPrefix}${(e as Error).message}`);
      setPhase("error");
    }
  }

  const busy = phase === "removing" || phase === "compositing";

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.subjectLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setCutoutBlob(null); setOutUrl(null); }}
        current={file}
      />

      {file && (
        <>
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {(["color", "gradient", "image"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize ${mode === m ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                {m}
              </button>
            ))}
          </div>

          {mode === "color" && (
            <label className="flex items-center gap-3 text-xs font-medium text-ink-600">
              {s.bgColor}
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-ink-200 bg-white p-1" />
              <span className="font-mono text-ink-700">{color.toUpperCase()}</span>
            </label>
          )}

          {mode === "gradient" && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {GRADIENTS.map((g) => (
                <button key={g.id} onClick={() => setGradient(g)}
                  className={`h-14 rounded-lg border text-xs font-medium text-white shadow-sm ${gradient.id === g.id ? "ring-2 ring-brand-500" : "border-ink-200"}`}
                  style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}>
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {mode === "image" && (
            <MiniDrop
              label={s.bgImageLabel}
              accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
              icon={<ImageIcon className="h-5 w-5" />}
              onFile={setBgFile}
              current={bgFile}
            />
          )}

          <Button onClick={run} disabled={busy} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
            {phase === "removing" ? s.removingBg :
             phase === "compositing" ? s.buildingBg :
             cutoutBlob ? s.reApply : s.changeBg}
          </Button>
        </>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {outUrl && !busy && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Result" className="mx-auto max-h-96 rounded-lg border border-ink-100" />
          <a href={outUrl} download={`${(file?.name ?? "image").replace(/\.[^.]+$/, "")}-newbg.png`}>
            <Button size="lg"><Download className="h-4 w-4" /> {s.download} · {formatBytes(outSize)}</Button>
          </a>
        </div>
      )}

      <p className="text-xs text-ink-400">
        {s.privacyNote}
      </p>
    </div>
  );
}
