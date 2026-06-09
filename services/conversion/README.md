# Conversion microservice

Heavy file conversions for Konvertools, run in a container (Scaleway Serverless
Containers, fr-par, scale-to-zero). Called only by the Supabase `convert` Edge
Function over HTTPS with a shared `X-Internal-Token`. It never receives the
Supabase service_role key — only short-lived signed URLs.

## Routes
- `GET /health` → `{ "status": "ok" }`
- `POST /convert` (header `X-Internal-Token`) — body:
  `{ inputUrl, outputUrl, sourceFormat, targetFormat }`

## Supported conversions
| source → target | tool |
|---|---|
| pdf → docx | pdf2docx (reconstructs text+tables+images+styles); LibreOffice fallback |
| pdf → xlsx | pdfplumber tables → openpyxl (clear error if no table found) |
| docx/pptx/xlsx → pdf | `libreoffice --headless --convert-to pdf` |
| pdf → pdf | Ghostscript compression (`-dPDFSETTINGS=/ebook`) |
| pdf → png/jpg | `pdftoppm` (poppler), DPI via `PDF_IMAGE_DPI`, returns a ZIP of pages |

Light edits (merge, split, rotate, watermark, page numbers) stay in the browser
with pdf-lib — they are **not** handled here.

## Env vars (set in the Scaleway container)
- `INTERNAL_TOKEN` (required) — shared secret; requests without it get 403.
- `MAX_FILE_MB` (default 50)
- `PDF_IMAGE_DPI` (default 150)
- `PORT` (default 8080)

## Run locally
```bash
pip install -r requirements.txt        # plus the native tools (libreoffice, ghostscript, poppler, libmagic)
INTERNAL_TOKEN=devtoken uvicorn app:app --port 8080
```

## Quality / acceptance tests
```bash
pip install reportlab httpx            # reportlab generates a test PDF; or set TEST_PDF=/path.pdf
INTERNAL_TOKEN=devtoken python test_quality.py
```

## Build & push (manual, no CI)
```bash
cp .env.example .env                   # fill SCW_ACCESS_KEY / SCW_SECRET_KEY
./deploy.sh                            # builds linux/amd64 and pushes :latest
```
