import pandas as pd
import json
import os
import re

CSV_PATH = r"C:\Users\Rajesh Kanna\.cache\kagglehub\datasets\adityarajsrv\job-descriptions-2025-tech-and-non-tech-roles\versions\1\job_dataset.csv"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "known_skills.json")

def build_db():
    print("Loading dataset...")
    df = pd.read_csv(CSV_PATH)
    
    skills_set = set()
    
    print("Extracting skills and keywords...")
    # The dataset has 'Skills' and 'Keywords' columns separated by semicolons
    for col in ['Skills', 'Keywords']:
        if col in df.columns:
            for item in df[col].dropna():
                parts = item.split(';')
                for p in parts:
                    clean_skill = p.strip().lower()
                    clean_skill = re.sub(r'\s+(basics|fundamentals)$', '', clean_skill)
                    if len(clean_skill) > 1:
                        skills_set.add(clean_skill)
                        
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Found {len(skills_set)} unique skills! Saving to database...")
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted(list(skills_set)), f, indent=4)
        
    print(f"Successfully saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    build_db()
