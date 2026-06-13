from pypdf import PdfReader
from docx import Document
import io

def extract_text_from_pdf(file_content: bytes) -> str:
    text = ""
    try:
        reader = PdfReader(io.BytesIO(file_content))
        for page in reader.pages:
            text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error extracting PDF: {e}")
    return text.strip()

def extract_text_from_docx(file_content: bytes) -> str:
    text = ""
    try:
        doc = Document(io.BytesIO(file_content))
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        print(f"Error extracting DOCX: {e}")
    return text.strip()

def extract_text(file_content: bytes, filename: str) -> str:
    filename_lower = filename.lower()
    if filename_lower.endswith(".pdf"):
        return extract_text_from_pdf(file_content)
    elif filename_lower.endswith((".doc", ".docx")):
        return extract_text_from_docx(file_content)
    else:
        return ""
