from pydantic import BaseModel
from typing import List, Optional

class ParsedResume(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    skills: List[str] = []
    raw_text: str

class MatchRequest(BaseModel):
    resume: ParsedResume
    job_description: str
    experience: Optional[int] = None
    job_type: Optional[str] = None

class MatchResponse(BaseModel):
    score: float
    overall_score: float
    skill_score: float
    experience_score: float
    role_score: float
    status: str
    matched_skills: List[str]
    missing_skills: List[str]
    experience: Optional[int] = None
    job_type: Optional[str] = None
