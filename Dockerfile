FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

# Copy the dependency files from Backend
COPY Backend/pyproject.toml Backend/uv.lock ./

# Install dependencies using uv
RUN uv sync --frozen

# Download the spacy model
RUN uv run python -m spacy download en_core_web_sm

# Copy the application code from Backend
COPY Backend/ .

# Railway automatically sets the PORT environment variable
CMD ["sh", "-c", "uv run uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
