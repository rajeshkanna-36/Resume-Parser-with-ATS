import re
import spacy
import json
import os

try:
    nlp = spacy.load("en_core_web_sm")
except Exception:
    nlp = None

SKILLS_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "known_skills.json")

try:
    with open(SKILLS_FILE, "r", encoding="utf-8") as f:
        KNOWN_SKILLS = set(json.load(f))
except Exception as e:
    print(f"Could not load known_skills.json: {e}")
    KNOWN_SKILLS = {
        "python", "java", "c++", "c#", "javascript", "typescript", "react", "angular", "vue",
        "node.js", "express", "django", "flask", "fastapi", "sql", "mysql", "postgresql", "mongodb",
        "aws", "azure", "gcp", "docker", "kubernetes", "git", "linux", "html", "css", "machine learning",
        "deep learning", "data analysis", "nlp", "pandas", "numpy", "tensorflow", "pytorch"
    }

# Sort by length descending so multi-word skills match before their single-word parts
SORTED_SKILLS = sorted(list(KNOWN_SKILLS), key=len, reverse=True)

def extract_email(text: str) -> str | None:
    email_regex = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
    match = re.search(email_regex, text)
    return match.group(0) if match else None

def extract_phone(text: str) -> str | None:
    phone_regex = r"\(?\b[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b"
    match = re.search(phone_regex, text)
    return match.group(0) if match else None

def extract_name(text: str) -> str | None:
    if not nlp:
        return None
    preview = text[:1000]
    doc = nlp(preview)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

def extract_skills(text: str) -> list[str]:
    text_lower = text.lower()
    found_skills = []
    for skill in SORTED_SKILLS:
        if skill in text_lower:
            # Verify word boundary
            if re.search(r"\b" + re.escape(skill) + r"\b", text_lower):
                found_skills.append(skill)
                # Remove it so we don't match sub-words (e.g. "java" inside "javascript" if not boundary, though boundary prevents that, but "machine" in "machine learning" should be prevented)
                text_lower = re.sub(r"\b" + re.escape(skill) + r"\b", " " * len(skill), text_lower)
                
    return list(set(found_skills))

def parse_resume(text: str) -> dict:
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "raw_text": text
    }
