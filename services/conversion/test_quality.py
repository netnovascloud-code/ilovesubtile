#!/usr/bin/env python3
"""
Acceptance / quality tests for the conversion microservice.

Run it against a LOCALLY running instance of the service:

    # terminal 1 — run the service (so the local fixture server is reachable)
    INTERNAL_TOKEN=devtoken MAX_FILE_MB=50 uvicorn app:app --port 8080

    # terminal 2 — run the tests
    INTERNAL_TOKEN=devtoken python test_quality.py

Env:
  BASE_URL      service base url            (default http://127.0.0.1:8080)
  INTERNAL_TOKEN must match the running service's INTERNAL_TOKEN (default devtoken)
  FIXTURE_HOST  host the SERVICE uses to reach this test's fixture server
                (default 127.0.0.1; use host.docker.internal if the service runs in Docker)
  TEST_PDF      path to a PDF with tables + screenshots. If unset, one is
                generated with reportlab (pip install reportlab).

Exits non-zero if any acceptance criterion fails.
"""
import base64
import io
import os
import sys
import threading
import zipfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import httpx

BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:8080").rstrip("/")
TOKEN = os.environ.get("INTERNAL_TOKEN", "devtoken")
FIXTURE_HOST = os.environ.get("FIXTURE_HOST", "127.0.0.1")

# A 4x4 red PNG so the generated test PDF embeds a real raster image
# (pdf2docx must surface it under word/media/).
_RED_PNG = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVR4nGP8z8Dwn4EIwDiqkL4KAV4Cyko7"
    "AAAAAElFTkSuQmCC"
)

_results = {}  # captured PUT bodies, keyed by path


def _make_test_pdf() -> bytes:
    if os.environ.get("TEST_PDF"):
        with open(os.environ["TEST_PDF"], "rb") as fh:
            return fh.read()
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.platypus import Image, Paragraph, SimpleDocTemplate, Spacer, Table
    except ImportError:
        print("WARN: reportlab not installed and TEST_PDF unset → skipping the .docx quality check.")
        print("      pip install reportlab  (or set TEST_PDF=/path/to/your.pdf)")
        return b""
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4)
    styles = getSampleStyleSheet()
    img_path = "/tmp/_qtest_red.png"
    with open(img_path, "wb") as fh:
        fh.write(_RED_PNG)
    story = [
        Paragraph("Quarterly Report", styles["Title"]),
        Paragraph("This document contains a real table and an embedded screenshot.", styles["Normal"]),
        Spacer(1, 12),
        Image(img_path, width=80, height=80),
        Spacer(1, 12),
        Table([["Product", "Qty", "Price"], ["Apple", "12", "3.50"], ["Banana", "7", "1.20"]]),
    ]
    doc.build(story)
    return buf.getvalue()


class _Fixture(BaseHTTPRequestHandler):
    pdf_bytes = b""

    def log_message(self, *a):  # silence
        pass

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/pdf")
        self.send_header("Content-Length", str(len(self.pdf_bytes)))
        self.end_headers()
        self.wfile.write(self.pdf_bytes)

    def do_PUT(self):
        length = int(self.headers.get("Content-Length", "0"))
        _results[self.path] = self.rfile.read(length)
        self.send_response(200)
        self.end_headers()


def _start_fixture(pdf_bytes: bytes):
    _Fixture.pdf_bytes = pdf_bytes
    srv = ThreadingHTTPServer(("0.0.0.0", 0), _Fixture)
    port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://{FIXTURE_HOST}:{port}"


FAILS = []


def check(name: str, ok: bool, detail: str = ""):
    print(f"{'PASS' if ok else 'FAIL'}  {name}{(' — ' + detail) if detail else ''}")
    if not ok:
        FAILS.append(name)


def main():
    # 1) health
    try:
        r = httpx.get(f"{BASE_URL}/health", timeout=10)
        check("GET /health → 200", r.status_code == 200, f"got {r.status_code}")
    except Exception as e:
        check("GET /health → 200", False, str(e))

    pdf = _make_test_pdf()
    srv, fixture_url = _start_fixture(pdf if pdf else b"%PDF-1.4\n")

    # 2) 403 without a valid internal token
    r = httpx.post(f"{BASE_URL}/convert",
                   json={"inputUrl": f"{fixture_url}/input", "outputUrl": f"{fixture_url}/o1",
                         "sourceFormat": "pdf", "targetFormat": "docx"},
                   headers={"X-Internal-Token": "WRONG"}, timeout=30)
    check("POST /convert with bad token → 403", r.status_code == 403, f"got {r.status_code}")

    # 3) corrupt PDF → clean error (422), no crash
    _Fixture.pdf_bytes = b"%PDF-1.4 this is not a real pdf body \x00\x01\x02"
    r = httpx.post(f"{BASE_URL}/convert",
                   json={"inputUrl": f"{fixture_url}/input", "outputUrl": f"{fixture_url}/o2",
                         "sourceFormat": "pdf", "targetFormat": "docx"},
                   headers={"X-Internal-Token": TOKEN}, timeout=120)
    check("corrupt PDF → clean 4xx (no crash)", 400 <= r.status_code < 500, f"got {r.status_code}")

    # 4) quality: pdf → docx must reconstruct structure
    if pdf:
        _Fixture.pdf_bytes = pdf
        r = httpx.post(f"{BASE_URL}/convert",
                       json={"inputUrl": f"{fixture_url}/input", "outputUrl": f"{fixture_url}/result.docx",
                             "sourceFormat": "pdf", "targetFormat": "docx"},
                       headers={"X-Internal-Token": TOKEN}, timeout=180)
        check("pdf→docx → 200", r.status_code == 200, f"got {r.status_code}: {r.text[:200]}")
        data = _results.get("/result.docx")
        if data:
            try:
                zf = zipfile.ZipFile(io.BytesIO(data))
                names = zf.namelist()
                document = zf.read("word/document.xml").decode("utf-8", "ignore")
                check("docx embeds images (word/media/)", any(n.startswith("word/media/") for n in names))
                check("docx has real tables (<w:tbl>)", "<w:tbl" in document)
                check("docx has styles (styles.xml)", "word/styles.xml" in names)
                check("no 'Page X of Y' in body", "Page " not in document or " of " not in document)
                check("no dotted TOC leaders in body", "....." not in document)
            except Exception as e:
                check("docx is a valid .docx archive", False, str(e))
        else:
            check("docx was uploaded to the signed url", False, "no PUT captured")
    else:
        print("SKIP  pdf→docx quality check (no test PDF available)")

    srv.shutdown()
    print()
    if FAILS:
        print(f"❌ {len(FAILS)} check(s) failed: {', '.join(FAILS)}")
        sys.exit(1)
    print("✅ all checks passed")


if __name__ == "__main__":
    main()
