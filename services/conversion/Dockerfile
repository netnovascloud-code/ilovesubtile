# Konvertools conversion microservice — Scaleway Serverless Container image.
FROM python:3.12-slim

# Native tools the handlers shell out to:
#   libreoffice writer/calc/impress → office→pdf (+ pdf→docx fallback)
#   ghostscript                     → real PDF compression
#   poppler-utils (pdftoppm)        → pdf→images
#   libmagic1                       → python-magic real-type detection
#   fonts-dejavu / fonts-liberation → correct text embedding in LO/GS output
RUN apt-get update && apt-get install -y --no-install-recommends \
      libreoffice-writer libreoffice-calc libreoffice-impress \
      ghostscript poppler-utils libmagic1 fonts-dejavu fonts-liberation \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python deps first → this layer is cached unless requirements.txt changes.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App last → code changes don't bust the heavy layers above.
COPY app.py .

ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT:-8080}"]
