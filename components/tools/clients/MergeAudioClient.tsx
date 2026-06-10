"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { getFfmpeg } from "@/lib/ffmpeg-client";
import { useLocale } from "@/hooks/useLocale";

type Entry = { id: string; file: File };

// FFmpeg.wasm is loaded via the shared self-hosted-worker loader
// (lib/ffmpeg-client). The previous inline UMD loader (no classWorkerURL) broke
// under Next/Webpack and never initialised.

const T: Record<string, Record<string, string>> = {
  en: {
    addAudioFiles: "Add audio files",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — drag to set the order",
    outputBitrate: "Output bitrate",
    loadingFfmpeg: "Loading FFmpeg (~30 MB, first time only)…",
    merging: "Merging…",
    mergeFiles: "Merge files",
    downloadMp3: "Download MP3",
    errorPrefix: "Merge failed: ",
    privacy: "Merged 100% in your browser via FFmpeg.wasm — your files are never uploaded.",
  },
  fr: {
    addAudioFiles: "Ajouter des fichiers audio",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — glissez pour définir l'ordre",
    outputBitrate: "Débit de sortie",
    loadingFfmpeg: "Chargement de FFmpeg (~30 Mo, première fois seulement)…",
    merging: "Fusion…",
    mergeFiles: "Fusionner les fichiers",
    downloadMp3: "Télécharger MP3",
    errorPrefix: "Échec de la fusion : ",
    privacy: "Fusion 100 % dans votre navigateur via FFmpeg.wasm — vos fichiers ne sont jamais envoyés.",
  },
  es: {
    addAudioFiles: "Agregar archivos de audio",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — arrastra para establecer el orden",
    outputBitrate: "Tasa de bits de salida",
    loadingFfmpeg: "Cargando FFmpeg (~30 MB, solo la primera vez)…",
    merging: "Fusionando…",
    mergeFiles: "Combinar archivos",
    downloadMp3: "Descargar MP3",
    errorPrefix: "Error al fusionar: ",
    privacy: "Fusionado 100 % en tu navegador con FFmpeg.wasm — tus archivos nunca se suben.",
  },
  pt: {
    addAudioFiles: "Adicionar arquivos de áudio",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — arraste para definir a ordem",
    outputBitrate: "Taxa de bits de saída",
    loadingFfmpeg: "Carregando FFmpeg (~30 MB, apenas na primeira vez)…",
    merging: "Mesclando…",
    mergeFiles: "Mesclar arquivos",
    downloadMp3: "Baixar MP3",
    errorPrefix: "Falha ao mesclar: ",
    privacy: "Mesclado 100% no seu navegador via FFmpeg.wasm — seus arquivos nunca são enviados.",
  },
  de: {
    addAudioFiles: "Audiodateien hinzufügen",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — ziehen, um die Reihenfolge festzulegen",
    outputBitrate: "Ausgabe-Bitrate",
    loadingFfmpeg: "FFmpeg wird geladen (~30 MB, nur beim ersten Mal)…",
    merging: "Zusammenführen…",
    mergeFiles: "Dateien zusammenführen",
    downloadMp3: "MP3 herunterladen",
    errorPrefix: "Zusammenführen fehlgeschlagen: ",
    privacy: "100 % im Browser via FFmpeg.wasm zusammengeführt — Ihre Dateien werden nie hochgeladen.",
  },
  it: {
    addAudioFiles: "Aggiungi file audio",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — trascina per impostare l'ordine",
    outputBitrate: "Bitrate di output",
    loadingFfmpeg: "Caricamento FFmpeg (~30 MB, solo la prima volta)…",
    merging: "Unione…",
    mergeFiles: "Unisci file",
    downloadMp3: "Scarica MP3",
    errorPrefix: "Unione fallita: ",
    privacy: "Unito 100% nel tuo browser via FFmpeg.wasm — i tuoi file non vengono mai caricati.",
  },
  nl: {
    addAudioFiles: "Audiobestanden toevoegen",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — sleep om de volgorde in te stellen",
    outputBitrate: "Uitvoerbitsnelheid",
    loadingFfmpeg: "FFmpeg laden (~30 MB, alleen de eerste keer)…",
    merging: "Samenvoegen…",
    mergeFiles: "Bestanden samenvoegen",
    downloadMp3: "MP3 downloaden",
    errorPrefix: "Samenvoegen mislukt: ",
    privacy: "100% samengevoegd in uw browser via FFmpeg.wasm — uw bestanden worden nooit geüpload.",
  },
  ja: {
    addAudioFiles: "オーディオファイルを追加",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — ドラッグして順序を設定",
    outputBitrate: "出力ビットレート",
    loadingFfmpeg: "FFmpegを読み込んでいます（～30 MB、初回のみ）…",
    merging: "結合中…",
    mergeFiles: "ファイルを結合",
    downloadMp3: "MP3をダウンロード",
    errorPrefix: "結合に失敗しました: ",
    privacy: "FFmpeg.wasmでブラウザ内で100%処理 — ファイルは決してアップロードされません。",
  },
  zh: {
    addAudioFiles: "添加音频文件",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — 拖动以设置顺序",
    outputBitrate: "输出比特率",
    loadingFfmpeg: "正在加载 FFmpeg（～30 MB，仅首次）…",
    merging: "合并中…",
    mergeFiles: "合并文件",
    downloadMp3: "下载 MP3",
    errorPrefix: "合并失败：",
    privacy: "100% 在您的浏览器中通过 FFmpeg.wasm 合并 — 您的文件永远不会被上传。",
  },
  ko: {
    addAudioFiles: "오디오 파일 추가",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — 드래그하여 순서 설정",
    outputBitrate: "출력 비트레이트",
    loadingFfmpeg: "FFmpeg 로딩 중（~30 MB, 첫 번만）…",
    merging: "병합 중…",
    mergeFiles: "파일 병합",
    downloadMp3: "MP3 다운로드",
    errorPrefix: "병합 실패: ",
    privacy: "FFmpeg.wasm을 통해 브라우저에서 100% 처리 — 파일은 절대 업로드되지 않습니다.",
  },
  ar: {
    addAudioFiles: "إضافة ملفات صوتية",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — اسحب لتحديد الترتيب",
    outputBitrate: "معدل البت للإخراج",
    loadingFfmpeg: "جاري تحميل FFmpeg (~30 MB، في المرة الأولى فقط)…",
    merging: "جاري الدمج…",
    mergeFiles: "دمج الملفات",
    downloadMp3: "تنزيل MP3",
    errorPrefix: "فشل الدمج: ",
    privacy: "دمج 100% في متصفحك عبر FFmpeg.wasm — لن يتم رفع ملفاتك مطلقًا.",
  },
  ru: {
    addAudioFiles: "Добавить аудиофайлы",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — перетащите для установки порядка",
    outputBitrate: "Выходной битрейт",
    loadingFfmpeg: "Загрузка FFmpeg (~30 МБ, только первый раз)…",
    merging: "Объединение…",
    mergeFiles: "Объединить файлы",
    downloadMp3: "Скачать MP3",
    errorPrefix: "Ошибка объединения: ",
    privacy: "100% объединено в вашем браузере через FFmpeg.wasm — ваши файлы никогда не загружаются.",
  },
  hi: {
    addAudioFiles: "ऑडियो फ़ाइलें जोड़ें",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — क्रम निर्धारित करने के लिए खींचें",
    outputBitrate: "आउटपुट बिटरेट",
    loadingFfmpeg: "FFmpeg लोड हो रहा है (~30 MB, केवल पहली बार)…",
    merging: "मर्ज हो रहा है…",
    mergeFiles: "फ़ाइलें मर्ज करें",
    downloadMp3: "MP3 डाउनलोड करें",
    errorPrefix: "मर्ज विफल: ",
    privacy: "FFmpeg.wasm के जरिए आपके ब्राउज़र में 100% मर्ज — आपकी फ़ाइलें कभी अपलोड नहीं होतीं।",
  },
  tr: {
    addAudioFiles: "Ses dosyaları ekle",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — sırayı ayarlamak için sürükle",
    outputBitrate: "Çıkış bit hızı",
    loadingFfmpeg: "FFmpeg yükleniyor (~30 MB, yalnızca ilk seferinde)…",
    merging: "Birleştiriliyor…",
    mergeFiles: "Dosyaları birleştir",
    downloadMp3: "MP3 indir",
    errorPrefix: "Birleştirme başarısız: ",
    privacy: "FFmpeg.wasm aracılığıyla tarayıcınızda %100 birleştirilir — dosyalarınız asla yüklenmez.",
  },
  id: {
    addAudioFiles: "Tambah file audio",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — seret untuk mengatur urutan",
    outputBitrate: "Bitrate keluaran",
    loadingFfmpeg: "Memuat FFmpeg (~30 MB, hanya pertama kali)…",
    merging: "Menggabungkan…",
    mergeFiles: "Gabungkan file",
    downloadMp3: "Unduh MP3",
    errorPrefix: "Penggabungan gagal: ",
    privacy: "100% digabungkan di browser Anda melalui FFmpeg.wasm — file Anda tidak pernah diunggah.",
  },
  vi: {
    addAudioFiles: "Thêm tệp âm thanh",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — kéo để sắp xếp thứ tự",
    outputBitrate: "Tốc độ bit đầu ra",
    loadingFfmpeg: "Đang tải FFmpeg (~30 MB, chỉ lần đầu tiên)…",
    merging: "Đang ghép…",
    mergeFiles: "Ghép tệp",
    downloadMp3: "Tải MP3",
    errorPrefix: "Ghép thất bại: ",
    privacy: "100% ghép trong trình duyệt của bạn qua FFmpeg.wasm — tệp của bạn không bao giờ được tải lên.",
  },
  sv: {
    addAudioFiles: "Lägg till ljudfiler",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — dra för att ange ordningen",
    outputBitrate: "Utdatabithastighet",
    loadingFfmpeg: "Laddar FFmpeg (~30 MB, bara första gången)…",
    merging: "Sammanfogar…",
    mergeFiles: "Sammanfoga filer",
    downloadMp3: "Ladda ned MP3",
    errorPrefix: "Sammanfogning misslyckades: ",
    privacy: "100% sammanfogat i din webbläsare via FFmpeg.wasm — dina filer laddas aldrig upp.",
  },
  pl: {
    addAudioFiles: "Dodaj pliki audio",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — przeciągnij, aby ustawić kolejność",
    outputBitrate: "Wyjściowy bitrate",
    loadingFfmpeg: "Ładowanie FFmpeg (~30 MB, tylko za pierwszym razem)…",
    merging: "Scalanie…",
    mergeFiles: "Scal pliki",
    downloadMp3: "Pobierz MP3",
    errorPrefix: "Scalanie nie powiodło się: ",
    privacy: "100% scalone w przeglądarce przez FFmpeg.wasm — Twoje pliki nigdy nie są przesyłane.",
  },
  uk: {
    addAudioFiles: "Додати аудіофайли",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — перетягніть для встановлення порядку",
    outputBitrate: "Вихідний бітрейт",
    loadingFfmpeg: "Завантаження FFmpeg (~30 МБ, лише перший раз)…",
    merging: "Об'єднання…",
    mergeFiles: "Об'єднати файли",
    downloadMp3: "Завантажити MP3",
    errorPrefix: "Помилка об'єднання: ",
    privacy: "100% об'єднано у вашому браузері через FFmpeg.wasm — ваші файли ніколи не завантажуються.",
  },
  cs: {
    addAudioFiles: "Přidat zvukové soubory",
    addHint: "MP3 · WAV · M4A · FLAC · OGG — přetáhněte pro nastavení pořadí",
    outputBitrate: "Výstupní přenosová rychlost",
    loadingFfmpeg: "Načítání FFmpeg (~30 MB, pouze poprvé)…",
    merging: "Slučování…",
    mergeFiles: "Sloučit soubory",
    downloadMp3: "Stáhnout MP3",
    errorPrefix: "Sloučení selhalo: ",
    privacy: "100% sloučeno ve vašem prohlížeči přes FFmpeg.wasm — vaše soubory nejsou nikdy nahrávány.",
  },
};

export function MergeAudioClient() {
  const s = T[useLocale()] ?? T.en;
  const [items, setItems] = useState<Entry[]>([]);
  const [bitrate, setBitrate] = useState("192k");
  const [phase, setPhase] = useState<"idle" | "loading" | "running">("idle");
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const dragIndex = useRef<number | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  function add(list: FileList | null) {
    if (!list) return;
    const next: Entry[] = [];
    for (const f of Array.from(list)) {
      if (f.type.startsWith("audio/") || /\.(mp3|wav|m4a|aac|flac|ogg|opus)$/i.test(f.name)) next.push({ id: crypto.randomUUID(), file: f });
    }
    setItems((prev) => [...prev, ...next]);
    setOutUrl(null); setError(null);
  }
  function remove(id: string) { setItems((prev) => prev.filter((e) => e.id !== id)); setOutUrl(null); }
  function move(from: number, to: number) { setItems((prev) => { const n = prev.slice(); const [it] = n.splice(from, 1); n.splice(to, 0, it); return n; }); }

  async function merge() {
    if (items.length < 2 || phase !== "idle") return;
    setError(null); setOutUrl(null); setPhase("loading");
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      const ff = await getFfmpeg();
      setPhase("running");
      const names: string[] = [];
      for (let i = 0; i < items.length; i++) {
        const ext = (items[i].file.name.split(".").pop() || "mp3").toLowerCase();
        const n = `in${i}.${ext}`;
        await ff.writeFile(n, await fetchFile(items[i].file));
        names.push(n);
      }
      const inputs = names.flatMap((n) => ["-i", n]);
      const filter = `${names.map((_, i) => `[${i}:a]`).join("")}concat=n=${names.length}:v=0:a=1[out]`;
      const code = await ff.exec([...inputs, "-filter_complex", filter, "-map", "[out]", "-c:a", "libmp3lame", "-b:a", bitrate, "out.mp3"]);
      if (code !== 0) throw new Error("FFmpeg exit " + code);
      const data = await ff.readFile("out.mp3");
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
      try { for (const n of names) await ff.deleteFile(n); await ff.deleteFile("out.mp3"); } catch {}
    } catch (e) { setError(`${s.errorPrefix}${(e as Error).message}`); }
    finally { setPhase("idle"); }
  }

  const busy = phase !== "idle";

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-amber-600" />
        <span className="mt-2 font-medium text-ink-900">{s.addAudioFiles}</span>
        <span className="mt-0.5 text-xs text-ink-400">{s.addHint}</span>
        <input type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.opus" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((e, i) => (
            <li key={e.id} draggable onDragStart={() => { dragIndex.current = i; }} onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
              className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2">
              <GripVertical className="h-4 w-4 cursor-grab text-ink-300" />
              <span className="grid h-6 w-6 place-items-center rounded bg-amber-50 text-xs font-bold text-amber-700">{i + 1}</span>
              <span className="flex-1 truncate text-sm text-ink-800">{e.file.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(e.file.size)}</span>
              <button onClick={() => remove(e.id)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <label className="flex items-center gap-2 text-sm text-ink-600">{s.outputBitrate}
          <select value={bitrate} onChange={(e) => setBitrate(e.target.value)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
            {["128k", "192k", "256k", "320k"].map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <span className="text-sm text-ink-700">{phase === "loading" ? s.loadingFfmpeg : s.merging}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={merge} disabled={items.length < 2 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.merging : `${s.mergeFiles}${items.length ? ` (${items.length})` : ""}`}
        </Button>
        {outUrl && (
          <a href={outUrl} download="merged.mp3">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.downloadMp3} · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
