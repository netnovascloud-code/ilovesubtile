# Konvertools — file-conversion microservice (Scaleway Serverless Container).
#
# Heavy conversions that can't run in Supabase Edge Functions (Deno, no native
# binaries) live here. The service NEVER sees the Supabase service_role key — it
# only receives short-lived SIGNED URLs from the `convert` Edge Function:
#   - inputUrl : signed GET to download the source from bucket `uploads`
#   - outputUrl: signed PUT to upload the result into bucket `outputs`
# Every request must carry X-Internal-Token == env INTERNAL_TOKEN (else 403).
#
# Routes: POST /convert, GET /health.

import os
import time
import shutil
import logging
import secrets
import subprocess
import tempfile
import zipfile
from pathlib import Path

import httpx
import magic
from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("conversion")

INTERNAL_TOKEN = os.environ.get("INTERNAL_TOKEN", "")
MAX_FILE_MB = int(os.environ.get("MAX_FILE_MB", "50"))
MAX_BYTES = MAX_FILE_MB * 1024 * 1024
PDF_IMAGE_DPI = int(os.environ.get("PDF_IMAGE_DPI", "150"))
HTTP_TIMEOUT = float(os.environ.get("HTTP_TIMEOUT", "120"))

app = FastAPI(title="Konvertools Conversion Service", docs_url=None, redoc_url=None)


class ConvertRequest(BaseModel):
    inputUrl: str
    outputUrl: str
    sourceFormat: str
    targetFormat: str


class ConversionError(Exception):
    """A clean, user-facing failure (bad/corrupt file, unsupported pair…)."""


# Real-MIME allow-list per declared source format (python-magic on the bytes,
# never trusting the extension).
SOURCE_MIME = {
    "pdf": {"application/pdf"},
    "docx": {"application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/zip"},
    "xlsx": {"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/zip"},
    "pptx": {"application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/zip"},
}

# (source, target) -> (handler name, output extension, output content-type)
ROUTES = {
    ("pdf", "docx"): "pdf_to_docx",
    ("pdf", "xlsx"): "pdf_to_xlsx",
    ("pdf", "pdf"): "compress_pdf",          # pdf->pdf == Ghostscript compression
    ("pdf", "png"): "pdf_to_images",
    ("pdf", "jpg"): "pdf_to_images",
    ("pdf", "jpeg"): "pdf_to_images",
    ("docx", "pdf"): "office_to_pdf",
    ("pptx", "pdf"): "office_to_pdf",
    ("xlsx", "pdf"): "office_to_pdf",
}

OUTPUT_META = {
    "pdf_to_docx": (".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
    "pdf_to_xlsx": (".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
    "compress_pdf": (".pdf", "application/pdf"),
    "pdf_to_images": (".zip", "application/zip"),
    "office_to_pdf": (".pdf", "application/pdf"),
}


# ── Conversion handlers ───────────────────────────────────────────────────────
def pdf_to_docx(src: Path, out: Path, tmp: Path) -> None:
    """Reconstruct text + tables + images + styles (NOT raw text extraction)."""
    try:
        from pdf2docx import Converter
        cv = Converter(str(src))
        try:
            cv.convert(str(out))  # full structural reconstruction
        finally:
            cv.close()
        if out.exists() and out.stat().st_size > 0:
            return
        raise ConversionError("pdf2docx produced an empty file")
    except ConversionError:
        raise
    except Exception as e:  # encrypted / malformed / pdf2docx edge case → fallback
        log.warning("pdf2docx failed (%s) — falling back to LibreOffice", e)
        _libreoffice(src, "docx", out, tmp)


def pdf_to_xlsx(src: Path, out: Path, tmp: Path) -> None:
    """Extract real tables with pdfplumber → openpyxl. No line-by-line text."""
    import pdfplumber
    from openpyxl import Workbook

    wb = Workbook()
    wb.remove(wb.active)
    found = 0
    try:
        with pdfplumber.open(str(src)) as pdf:
            for pidx, page in enumerate(pdf.pages, start=1):
                for tidx, table in enumerate(page.extract_tables() or [], start=1):
                    if not table:
                        continue
                    found += 1
                    ws = wb.create_sheet(title=f"P{pidx}_T{tidx}"[:31])
                    for row in table:
                        ws.append([("" if c is None else str(c)) for c in row])
    except Exception as e:
        raise ConversionError(f"Could not read the PDF (corrupt or encrypted?): {e}")
    if found == 0:
        raise ConversionError("No tables were detected in this PDF, so there is nothing to put in a spreadsheet.")
    wb.save(str(out))


def office_to_pdf(src: Path, out: Path, tmp: Path) -> None:
    _libreoffice(src, "pdf", out, tmp)


def compress_pdf(src: Path, out: Path, tmp: Path) -> None:
    """Real compression via Ghostscript (/ebook preset)."""
    rc = subprocess.run(
        ["gs", "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.4", "-dPDFSETTINGS=/ebook",
         "-dNOPAUSE", "-dQUIET", "-dBATCH", "-dSAFER", f"-sOutputFile={out}", str(src)],
        capture_output=True, text=True, timeout=HTTP_TIMEOUT,
    )
    if rc.returncode != 0 or not out.exists() or out.stat().st_size == 0:
        raise ConversionError(f"Ghostscript could not compress this PDF: {rc.stderr[:300]}")


def pdf_to_images(src: Path, out: Path, tmp: Path) -> None:
    """Rasterise each page with pdftoppm (poppler), then ZIP the images."""
    prefix = tmp / "page"
    rc = subprocess.run(
        ["pdftoppm", "-r", str(PDF_IMAGE_DPI), "-png", str(src), str(prefix)],
        capture_output=True, text=True, timeout=HTTP_TIMEOUT,
    )
    imgs = sorted(tmp.glob("page*.png"))
    if rc.returncode != 0 or not imgs:
        raise ConversionError(f"poppler could not render this PDF: {rc.stderr[:300]}")
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
        for img in imgs:
            zf.write(img, arcname=img.name)


def _libreoffice(src: Path, target_ext: str, out: Path, tmp: Path) -> None:
    """`libreoffice --headless --convert-to <ext>` into a temp outdir, then move."""
    outdir = tmp / "lo_out"
    outdir.mkdir(exist_ok=True)
    # A dedicated profile dir avoids the "another LibreOffice is running" lock.
    profile = (tmp / "lo_profile").as_uri()
    rc = subprocess.run(
        ["libreoffice", "--headless", "--norestore", f"-env:UserInstallation={profile}",
         "--convert-to", target_ext, "--outdir", str(outdir), str(src)],
        capture_output=True, text=True, timeout=HTTP_TIMEOUT,
    )
    produced = list(outdir.glob(f"*.{target_ext}"))
    if rc.returncode != 0 or not produced:
        raise ConversionError(f"LibreOffice could not convert this file: {rc.stderr[:300]}")
    shutil.move(str(produced[0]), str(out))


# ── HTTP layer ────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/convert")
async def convert(req: ConvertRequest, x_internal_token: str = Header(default="")):
    # Constant-time check of the shared internal token.
    if not INTERNAL_TOKEN or not secrets.compare_digest(x_internal_token, INTERNAL_TOKEN):
        raise HTTPException(status_code=403, detail="forbidden")

    src_fmt = req.sourceFormat.strip().lower().lstrip(".")
    tgt_fmt = req.targetFormat.strip().lower().lstrip(".")
    handler_name = ROUTES.get((src_fmt, tgt_fmt))
    if not handler_name:
        raise HTTPException(status_code=422, detail=f"Unsupported conversion: {src_fmt} → {tgt_fmt}")

    started = time.time()
    workdir = Path(tempfile.mkdtemp(prefix="conv_"))
    src_path = workdir / f"source.{src_fmt}"
    out_ext, out_ctype = OUTPUT_META[handler_name]
    out_path = workdir / f"result{out_ext}"
    try:
        # 1) Download the source via the signed URL (streamed, size-capped).
        async with httpx.AsyncClient(timeout=HTTP_TIMEOUT, follow_redirects=True) as client:
            async with client.stream("GET", req.inputUrl) as r:
                if r.status_code != 200:
                    raise ConversionError(f"Could not download the source file (HTTP {r.status_code}).")
                size = 0
                with open(src_path, "wb") as fh:
                    async for chunk in r.aiter_bytes():
                        size += len(chunk)
                        if size > MAX_BYTES:
                            raise ConversionError(f"File exceeds the {MAX_FILE_MB} MB limit.")
                        fh.write(chunk)

        # 2) Validate the REAL file type (never trust the extension).
        real_mime = magic.from_file(str(src_path), mime=True)
        allowed = SOURCE_MIME.get(src_fmt)
        if allowed and real_mime not in allowed:
            raise ConversionError(f"The file is not a valid {src_fmt.upper()} (detected: {real_mime}).")

        # 3) Convert.
        globals()[handler_name](src_path, out_path, workdir)
        if not out_path.exists() or out_path.stat().st_size == 0:
            raise ConversionError("Conversion produced no output.")

        # 4) Upload the result via the signed PUT URL.
        async with httpx.AsyncClient(timeout=HTTP_TIMEOUT, follow_redirects=True) as client:
            with open(out_path, "rb") as fh:
                up = await client.put(req.outputUrl, content=fh.read(),
                                      headers={"Content-Type": out_ctype, "x-upsert": "true"})
            if up.status_code not in (200, 201):
                raise ConversionError(f"Could not upload the result (HTTP {up.status_code}).")

        dur = round(time.time() - started, 2)
        log.info("OK %s->%s %.2fs %dB", src_fmt, tgt_fmt, dur, out_path.stat().st_size)
        return JSONResponse({"ok": True, "contentType": out_ctype, "durationSec": dur})

    except ConversionError as e:
        log.info("FAIL %s->%s : %s", src_fmt, tgt_fmt, e)
        raise HTTPException(status_code=422, detail=str(e))
    except subprocess.TimeoutExpired:
        log.info("FAIL %s->%s : timeout", src_fmt, tgt_fmt)
        raise HTTPException(status_code=504, detail="Conversion timed out.")
    except HTTPException:
        raise
    except Exception as e:  # never crash the worker on one bad file
        log.exception("UNEXPECTED %s->%s", src_fmt, tgt_fmt)
        raise HTTPException(status_code=500, detail=f"Internal conversion error: {e}")
    finally:
        # RGPD: wipe every temp artifact for this request.
        shutil.rmtree(workdir, ignore_errors=True)
