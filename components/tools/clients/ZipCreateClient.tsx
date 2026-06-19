"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: { addFiles: "Add any files", dropHint: "Drop or click to choose — bundled into a single ZIP", files: "file(s)", total: "total", compressing: "Compressing…", createZip: "Create ZIP", downloadZip: "Download ZIP", errCreate: "Could not create ZIP", privacy: "Bundled 100% in your browser — your files are never uploaded." },
  fr: { addFiles: "Ajoutez des fichiers", dropHint: "Déposez ou cliquez pour choisir — regroupés dans un seul ZIP", files: "fichier(s)", total: "total", compressing: "Compression…", createZip: "Créer le ZIP", downloadZip: "Télécharger le ZIP", errCreate: "Impossible de créer le ZIP", privacy: "Regroupé 100 % dans votre navigateur — vos fichiers ne sont jamais téléversés." },
  es: { addFiles: "Añade archivos", dropHint: "Suelta o haz clic para elegir — agrupados en un solo ZIP", files: "archivo(s)", total: "total", compressing: "Comprimiendo…", createZip: "Crear ZIP", downloadZip: "Descargar ZIP", errCreate: "No se pudo crear el ZIP", privacy: "Agrupado 100 % en tu navegador — tus archivos nunca se suben." },
  pt: { addFiles: "Adicione arquivos", dropHint: "Solte ou clique para escolher — agrupados em um único ZIP", files: "arquivo(s)", total: "total", compressing: "Compactando…", createZip: "Criar ZIP", downloadZip: "Baixar ZIP", errCreate: "Não foi possível criar o ZIP", privacy: "Agrupado 100% no seu navegador — seus arquivos nunca são enviados." },
  de: { addFiles: "Dateien hinzufügen", dropHint: "Ablegen oder klicken zum Auswählen — in einer einzigen ZIP gebündelt", files: "Datei(en)", total: "gesamt", compressing: "Komprimiere…", createZip: "ZIP erstellen", downloadZip: "ZIP herunterladen", errCreate: "ZIP konnte nicht erstellt werden", privacy: "Zu 100 % in deinem Browser gebündelt — deine Dateien werden nie hochgeladen." },
  it: { addFiles: "Aggiungi file", dropHint: "Trascina o clicca per scegliere — raggruppati in un unico ZIP", files: "file", total: "totale", compressing: "Compressione…", createZip: "Crea ZIP", downloadZip: "Scarica ZIP", errCreate: "Impossibile creare lo ZIP", privacy: "Raggruppato al 100% nel tuo browser — i tuoi file non vengono mai caricati." },
  nl: { addFiles: "Bestanden toevoegen", dropHint: "Sleep of klik om te kiezen — gebundeld in één ZIP", files: "bestand(en)", total: "totaal", compressing: "Comprimeren…", createZip: "ZIP maken", downloadZip: "ZIP downloaden", errCreate: "Kon ZIP niet maken", privacy: "100% in je browser gebundeld — je bestanden worden nooit geüpload." },
  ja: { addFiles: "ファイルを追加", dropHint: "ドロップまたはクリックして選択 — 1 つの ZIP にまとめます", files: "ファイル", total: "合計", compressing: "圧縮中…", createZip: "ZIP を作成", downloadZip: "ZIP をダウンロード", errCreate: "ZIP を作成できませんでした", privacy: "100% ブラウザ内でまとめます — ファイルはアップロードされません。" },
  zh: { addFiles: "添加任意文件", dropHint: "拖放或点击选择 — 打包成单个 ZIP", files: "个文件", total: "共", compressing: "压缩中…", createZip: "创建 ZIP", downloadZip: "下载 ZIP", errCreate: "无法创建 ZIP", privacy: "100% 在您的浏览器中打包 — 文件绝不上传。" },
  ko: { addFiles: "파일 추가", dropHint: "끌어다 놓거나 클릭해 선택 — 하나의 ZIP 으로 묶음", files: "개 파일", total: "합계", compressing: "압축 중…", createZip: "ZIP 만들기", downloadZip: "ZIP 다운로드", errCreate: "ZIP 을 만들 수 없습니다", privacy: "100% 브라우저에서 묶음 — 파일은 업로드되지 않습니다." },
  ar: { addFiles: "أضف أي ملفات", dropHint: "أفلِت أو انقر للاختيار — تُجمَع في ملف ZIP واحد", files: "ملف", total: "الإجمالي", compressing: "جارٍ الضغط…", createZip: "إنشاء ZIP", downloadZip: "تنزيل ZIP", errCreate: "تعذّر إنشاء ZIP", privacy: "يُجمَع 100% داخل متصفحك — لا تُرفع ملفاتك أبدًا." },
  ru: { addFiles: "Добавить файлы", dropHint: "Перетащите или нажмите для выбора — упакуются в один ZIP", files: "файл(ов)", total: "всего", compressing: "Сжатие…", createZip: "Создать ZIP", downloadZip: "Скачать ZIP", errCreate: "Не удалось создать ZIP", privacy: "Упаковка на 100% в браузере — файлы не загружаются на сервер." },
  hi: { addFiles: "कोई भी फ़ाइल जोड़ें", dropHint: "छोड़ें या चुनने के लिए क्लिक करें — एक ZIP में संयोजित", files: "फ़ाइल", total: "कुल", compressing: "संपीड़ित किया जा रहा है…", createZip: "ZIP बनाएँ", downloadZip: "ZIP डाउनलोड करें", errCreate: "ZIP नहीं बना सके", privacy: "100% आपके ब्राउज़र में संयोजित — आपकी फ़ाइलें कभी अपलोड नहीं होतीं।" },
  tr: { addFiles: "Dosya ekleyin", dropHint: "Bırakın veya seçmek için tıklayın — tek bir ZIP'te toplanır", files: "dosya", total: "toplam", compressing: "Sıkıştırılıyor…", createZip: "ZIP oluştur", downloadZip: "ZIP indir", errCreate: "ZIP oluşturulamadı", privacy: "%100 tarayıcınızda toplanır — dosyalarınız asla yüklenmez." },
  id: { addFiles: "Tambahkan file apa pun", dropHint: "Letakkan atau klik untuk memilih — digabung dalam satu ZIP", files: "file", total: "total", compressing: "Mengompres…", createZip: "Buat ZIP", downloadZip: "Unduh ZIP", errCreate: "Tidak dapat membuat ZIP", privacy: "Digabung 100% di browser Anda — file Anda tidak pernah diunggah." },
  vi: { addFiles: "Thêm tệp bất kỳ", dropHint: "Thả hoặc nhấp để chọn — gộp vào một tệp ZIP", files: "tệp", total: "tổng", compressing: "Đang nén…", createZip: "Tạo ZIP", downloadZip: "Tải ZIP", errCreate: "Không thể tạo ZIP", privacy: "Gộp 100% trong trình duyệt của bạn — tệp không bao giờ được tải lên." },
  sv: { addFiles: "Lägg till filer", dropHint: "Släpp eller klicka för att välja — buntas i en enda ZIP", files: "fil(er)", total: "totalt", compressing: "Komprimerar…", createZip: "Skapa ZIP", downloadZip: "Ladda ner ZIP", errCreate: "Kunde inte skapa ZIP", privacy: "Buntas 100 % i din webbläsare — dina filer laddas aldrig upp." },
  pl: { addFiles: "Dodaj dowolne pliki", dropHint: "Upuść lub kliknij, aby wybrać — spakowane w jeden ZIP", files: "plik(ów)", total: "łącznie", compressing: "Kompresja…", createZip: "Utwórz ZIP", downloadZip: "Pobierz ZIP", errCreate: "Nie udało się utworzyć ZIP", privacy: "Spakowane w 100% w przeglądarce — Twoje pliki nigdy nie są wysyłane." },
  uk: { addFiles: "Додати будь-які файли", dropHint: "Перетягніть або натисніть, щоб вибрати — пакуються в один ZIP", files: "файл(ів)", total: "усього", compressing: "Стиснення…", createZip: "Створити ZIP", downloadZip: "Завантажити ZIP", errCreate: "Не вдалося створити ZIP", privacy: "Пакування на 100% у вашому браузері — ваші файли не завантажуються на сервер." },
  cs: { addFiles: "Přidat libovolné soubory", dropHint: "Přetáhněte nebo klikněte pro výběr — sbaleno do jednoho ZIP", files: "soubor(ů)", total: "celkem", compressing: "Komprese…", createZip: "Vytvořit ZIP", downloadZip: "Stáhnout ZIP", errCreate: "ZIP se nepodařilo vytvořit", privacy: "Sbaleno 100 % ve vašem prohlížeči — vaše soubory se nikdy nenahrávají." },
};

export function ZipCreateClient() {
  const s = T[useLocale()] ?? T.en;
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const total = files.reduce((a, f) => a + f.size, 0);

  function add(list: FileList | null) {
    if (!list) return;
    setFiles((s) => [...s, ...Array.from(list)]);
    setResultUrl(null);
  }
  function remove(i: number) { setFiles((s) => s.filter((_, idx) => idx !== i)); setResultUrl(null); }

  async function makeZip() {
    if (files.length === 0 || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      const seen = new Map<string, number>();
      for (const f of files) {
        let name = f.name;
        if (seen.has(name)) { const n = (seen.get(name) ?? 0) + 1; seen.set(name, n); const dot = name.lastIndexOf("."); name = dot > 0 ? `${name.slice(0, dot)} (${n})${name.slice(dot)}` : `${name} (${n})`; }
        else seen.set(name, 1);
        zip.file(name, f);
      }
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (e) { setError(`${s.errCreate}: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-blue-600" />
        <span className="mt-2 font-medium text-ink-900">{s.addFiles}</span>
        <span className="mt-0.5 text-xs text-ink-400">{s.dropHint}</span>
        <input type="file" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 rounded-md border border-ink-100 bg-white px-3 py-1.5 text-sm">
              <span className="flex-1 truncate text-ink-800">{f.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(f.size)}</span>
              <button onClick={() => remove(i)} aria-label="Remove" className="rounded p-1 text-ink-400 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
          <li className="px-3 py-1 text-xs text-ink-400">{files.length} {s.files} · {s.total} {formatBytes(total)}</li>
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={makeZip} disabled={files.length === 0 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.compressing : `${s.createZip}${files.length ? ` (${files.length})` : ""}`}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="archive.zip">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> {s.downloadZip} ({formatBytes(resultSize)})</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
