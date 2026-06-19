"use client";

import { useState } from "react";
import { Upload, Download, Loader2, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Entry = { name: string; size: number; url: string };

const T: Record<string, Record<string, string>> = {
  en: { uploadZip: "Upload a ZIP file", files: "files", reading: "Reading archive…", save: "Save", errOpen: "Could not open archive", privacy: "Extracted 100% in your browser — your archive is never uploaded." },
  fr: { uploadZip: "Téléversez un fichier ZIP", files: "fichiers", reading: "Lecture de l'archive…", save: "Enregistrer", errOpen: "Impossible d'ouvrir l'archive", privacy: "Extrait 100 % dans votre navigateur — votre archive n'est jamais téléversée." },
  es: { uploadZip: "Sube un archivo ZIP", files: "archivos", reading: "Leyendo el archivo…", save: "Guardar", errOpen: "No se pudo abrir el archivo", privacy: "Extraído 100 % en tu navegador — tu archivo nunca se sube." },
  pt: { uploadZip: "Envie um arquivo ZIP", files: "arquivos", reading: "Lendo o arquivo…", save: "Salvar", errOpen: "Não foi possível abrir o arquivo", privacy: "Extraído 100% no seu navegador — seu arquivo nunca é enviado." },
  de: { uploadZip: "ZIP-Datei hochladen", files: "Dateien", reading: "Archiv wird gelesen…", save: "Speichern", errOpen: "Archiv konnte nicht geöffnet werden", privacy: "Zu 100 % in deinem Browser extrahiert — dein Archiv wird nie hochgeladen." },
  it: { uploadZip: "Carica un file ZIP", files: "file", reading: "Lettura dell'archivio…", save: "Salva", errOpen: "Impossibile aprire l'archivio", privacy: "Estratto al 100% nel tuo browser — il tuo archivio non viene mai caricato." },
  nl: { uploadZip: "Upload een ZIP-bestand", files: "bestanden", reading: "Archief lezen…", save: "Opslaan", errOpen: "Kon archief niet openen", privacy: "100% in je browser uitgepakt — je archief wordt nooit geüpload." },
  ja: { uploadZip: "ZIP ファイルをアップロード", files: "ファイル", reading: "アーカイブを読み込み中…", save: "保存", errOpen: "アーカイブを開けませんでした", privacy: "100% ブラウザ内で展開 — アーカイブはアップロードされません。" },
  zh: { uploadZip: "上传 ZIP 文件", files: "个文件", reading: "正在读取压缩包…", save: "保存", errOpen: "无法打开压缩包", privacy: "100% 在您的浏览器中解压 — 压缩包绝不上传。" },
  ko: { uploadZip: "ZIP 파일 업로드", files: "개 파일", reading: "아카이브 읽는 중…", save: "저장", errOpen: "아카이브를 열 수 없습니다", privacy: "100% 브라우저에서 추출 — 아카이브는 업로드되지 않습니다." },
  ar: { uploadZip: "ارفع ملف ZIP", files: "ملفات", reading: "جارٍ قراءة الأرشيف…", save: "حفظ", errOpen: "تعذّر فتح الأرشيف", privacy: "يُستخرج 100% داخل متصفحك — لا يُرفع أرشيفك أبدًا." },
  ru: { uploadZip: "Загрузите ZIP-файл", files: "файлов", reading: "Чтение архива…", save: "Сохранить", errOpen: "Не удалось открыть архив", privacy: "Извлечение на 100% в браузере — архив не загружается на сервер." },
  hi: { uploadZip: "ZIP फ़ाइल अपलोड करें", files: "फ़ाइलें", reading: "आर्काइव पढ़ा जा रहा है…", save: "सहेजें", errOpen: "आर्काइव नहीं खोल सके", privacy: "100% आपके ब्राउज़र में निकाला गया — आपका आर्काइव कभी अपलोड नहीं होता।" },
  tr: { uploadZip: "ZIP dosyası yükleyin", files: "dosya", reading: "Arşiv okunuyor…", save: "Kaydet", errOpen: "Arşiv açılamadı", privacy: "%100 tarayıcınızda çıkarıldı — arşiviniz asla yüklenmez." },
  id: { uploadZip: "Unggah file ZIP", files: "file", reading: "Membaca arsip…", save: "Simpan", errOpen: "Tidak dapat membuka arsip", privacy: "Diekstrak 100% di browser Anda — arsip Anda tidak pernah diunggah." },
  vi: { uploadZip: "Tải lên tệp ZIP", files: "tệp", reading: "Đang đọc kho lưu trữ…", save: "Lưu", errOpen: "Không thể mở kho lưu trữ", privacy: "Giải nén 100% trong trình duyệt của bạn — kho lưu trữ không bao giờ được tải lên." },
  sv: { uploadZip: "Ladda upp en ZIP-fil", files: "filer", reading: "Läser arkivet…", save: "Spara", errOpen: "Kunde inte öppna arkivet", privacy: "Extraherat 100 % i din webbläsare — ditt arkiv laddas aldrig upp." },
  pl: { uploadZip: "Prześlij plik ZIP", files: "plików", reading: "Odczytywanie archiwum…", save: "Zapisz", errOpen: "Nie udało się otworzyć archiwum", privacy: "Wypakowane w 100% w przeglądarce — Twoje archiwum nigdy nie jest wysyłane." },
  uk: { uploadZip: "Завантажте файл ZIP", files: "файлів", reading: "Читання архіву…", save: "Зберегти", errOpen: "Не вдалося відкрити архів", privacy: "Розпакування на 100% у вашому браузері — архів не завантажується на сервер." },
  cs: { uploadZip: "Nahrajte soubor ZIP", files: "souborů", reading: "Čtení archivu…", save: "Uložit", errOpen: "Archiv se nepodařilo otevřít", privacy: "Rozbaleno 100 % ve vašem prohlížeči — váš archiv se nikdy nenahrává." },
};

export function ZipExtractClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(f: File) {
    setFile(f); setError(null); setEntries([]); setBusy(true);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = await JSZip.loadAsync(await f.arrayBuffer());
      const list: Entry[] = [];
      for (const path of Object.keys(zip.files)) {
        const entry = zip.files[path];
        if (entry.dir) continue;
        const blob = await entry.async("blob");
        list.push({ name: path, size: blob.size, url: URL.createObjectURL(blob) });
      }
      setEntries(list);
    } catch (e) { setError(`${s.errOpen}: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  function clear() {
    entries.forEach((e) => URL.revokeObjectURL(e.url));
    setEntries([]); setFile(null);
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadZip}</span>
          <input type="file" accept=".zip,application/zip,application/x-zip-compressed" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) load(f); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{entries.length} {s.files} · {formatBytes(file.size)}</span>
          </div>
          <button onClick={clear} aria-label="Remove" className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && <p className="text-sm text-ink-500"><Loader2 className="inline h-3.5 w-3.5 animate-spin" /> {s.reading}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {entries.length > 0 && (
        <ul className="divide-y divide-ink-100 rounded-lg border border-ink-100 bg-white">
          {entries.map((e) => (
            <li key={e.name} className="flex items-center gap-3 px-3 py-2">
              <FileText className="h-4 w-4 text-ink-400" />
              <span className="flex-1 truncate text-sm text-ink-800">{e.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(e.size)}</span>
              <a href={e.url} download={e.name.split("/").pop() || e.name}>
                <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> {s.save}</Button>
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
