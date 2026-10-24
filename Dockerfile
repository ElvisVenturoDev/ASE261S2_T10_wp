FROM python:3.13-slim

# Bufferes y .pyc: logs en vivo, sin obsoletos.
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencias primero (capa cacheable).
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY app ./app

# Puerto por defecto
ENV PORT=5000
EXPOSE 5000

CMD ["python", "app.py"]
