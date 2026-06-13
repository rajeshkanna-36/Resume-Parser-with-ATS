from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from services.extract import extract_text
from services.parser import parse_resume
from services.matcher import calculate_match_score
from models.schemas import ParsedResume, MatchRequest, MatchResponse

router = APIRouter()

@router.post("/upload", response_model=ParsedResume)
async def upload_resume(file: UploadFile = File(...)):
    allowed_extensions = [".pdf", ".doc", ".docx"]

    if not any(file.filename.lower().endswith(ext) for ext in allowed_extensions):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    file_content = await file.read()
    extracted_text = extract_text(file_content, file.filename)
    
    if not extracted_text:
        raise HTTPException(status_code=400, detail="Could not extract text from the file")

    parsed_data = parse_resume(extracted_text)
    return ParsedResume(**parsed_data)

@router.post("/match", response_model=MatchResponse)
async def match_resume(request: MatchRequest = Body(...)):
    if not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty")
        
    match_result = calculate_match_score(request.resume, request.job_description, request.experience, request.job_type)
    return match_result
