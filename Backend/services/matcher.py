from models.schemas import ParsedResume, MatchResponse
from services.parser import extract_skills
import re

def calculate_match_score(resume: ParsedResume, job_description: str, candidate_experience: int = None, job_type: str = None) -> MatchResponse:
    jd_skills = extract_skills(job_description)
    resume_skills = set(resume.skills)
    
    matched_skills = []
    missing_skills = []
    
    for skill in jd_skills:
        if skill in resume_skills:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)
            
    # 1. Skill Score
    skill_score = 0.0
    if len(jd_skills) > 0:
        skill_score = (len(matched_skills) / len(jd_skills)) * 100
    else:
        skill_score = 100.0
        
    # 2. Experience Score
    experience_score = 100.0
    exp_match = re.search(r'(\d+)(?:\+|-)?(?:\s+to\s+\d+)?\s*(?:years?|yrs?)(?:\s+of)?\s+experience', job_description.lower())
    if exp_match and candidate_experience is not None:
        required_exp = int(exp_match.group(1))
        if required_exp > 0:
            if candidate_experience >= required_exp:
                experience_score = 100.0
            else:
                experience_score = (candidate_experience / required_exp) * 100
    elif exp_match and candidate_experience is None:
        experience_score = 50.0 # Penalty for not providing experience when required
        
    # 3. Role Score
    role_score = 70.0 # Default
    if job_type:
        job_type_lower = job_type.lower().replace(" developer", "").replace(" engineer", "")
        if job_type_lower in resume.raw_text.lower():
            role_score = 100.0
            
    # 4. Overall Score
    overall_score = round((skill_score * 0.6) + (experience_score * 0.2) + (role_score * 0.2), 2)
    
    status = "Selected" if overall_score >= 75 else "Not Selected"
            
    return MatchResponse(
        score=overall_score,
        overall_score=overall_score,
        skill_score=round(skill_score, 2),
        experience_score=round(experience_score, 2),
        role_score=round(role_score, 2),
        status=status,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        experience=candidate_experience,
        job_type=job_type
    )
