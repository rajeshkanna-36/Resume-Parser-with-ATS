import { useState, useRef } from "react";
import axios from "axios";
import Button from "../Components/Button";
import Drag from "../Components/Drag";

function Uploadpage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("Fullstack Developer");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleAnalyse = async () => {
    if (!file || !jobDescription) {
      alert("Please provide both a resume and a job description.");
      return;
    }
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("file", file);
        
        const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
        const uploadRes = await axios.post(`${API_URL}/api/upload`, formData);
        
        const matchRes = await axios.post(`${API_URL}/api/match`, {
            resume: uploadRes.data,
            job_description: jobDescription,
            experience: experience ? parseInt(experience) : null,
            job_type: jobType
        });
        
        setResult({
            ...matchRes.data,
            parsedData: uploadRes.data
        });
    } catch (err) {
        console.error(err);
        alert("An error occurred. Make sure the FastAPI backend is running.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => { if(e.target.files[0]) setFile(e.target.files[0]) }} 
        style={{ display: "none" }} 
        accept=".pdf,.doc,.docx"
      />

      {/* Left Section */}
      <div className="w-1/2 border-r border-white/20 flex flex-col items-center justify-center gap-6 p-8">
        {!result ? (
            <>
              <Drag file={file} onFileDrop={setFile} onClick={() => fileInputRef.current.click()} />
              <Button text="SELECT RESUME" onClick={() => fileInputRef.current.click()} />
            </>
        ) : (
            <div className="text-white w-full text-center">
                <h2 className="text-3xl font-bold text-cyan-400 mb-2">Analysis Complete</h2>
                <h3 className="text-xl font-semibold">{result.parsedData.name || "Candidate Name"}</h3>
                <p className="text-gray-400 mb-4">{result.parsedData.email}</p>
                
                <div className={`p-4 rounded-xl border mb-6 text-center font-bold text-xl tracking-widest ${result.status === 'Selected' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                    STATUS: {result.status}
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6 mx-auto w-full">
                    <div className="text-6xl font-bold text-cyan-400 mb-2">{result.overall_score}%</div>
                    <div className="text-sm uppercase tracking-widest text-gray-400 mb-6">Overall Match Score</div>
                    
                    <div className="flex flex-col gap-4 text-left">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Skill Match (60%)</span>
                                <span>{result.skill_score}%</span>
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-cyan-400 h-full" style={{ width: `${result.skill_score}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Experience Match (20%)</span>
                                <span>{result.experience_score}%</span>
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-400 h-full" style={{ width: `${result.experience_score}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Role Alignment (20%)</span>
                                <span>{result.role_score}%</span>
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-purple-400 h-full" style={{ width: `${result.role_score}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-1/2 p-12 flex flex-col h-screen overflow-y-auto">
        {!result ? (
            <>
                <div className="flex gap-4 mb-4">
                    <input 
                        type="number"
                        placeholder="Years of Experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-1/2 p-4 border border-white/30 rounded-xl bg-transparent text-white outline-none focus:border-cyan-400"
                    />
                    <select 
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="w-1/2 p-4 border border-white/30 rounded-xl bg-transparent text-white outline-none focus:border-cyan-400 [&>option]:bg-gray-800"
                    >
                        <option>Fullstack Developer</option>
                        <option>Backend Developer</option>
                        <option>Frontend Developer</option>
                        <option>ML Engineer</option>
                        <option>Data Scientist</option>
                    </select>
                </div>
                
                <textarea
                placeholder="Paste Job Description Here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-[400px] p-6 border border-white/30 rounded-xl bg-transparent text-white outline-none resize-none focus:border-cyan-400"
                />
                
                <Button
                text={loading ? "ANALYSING..." : "ANALYSE"} 
                className="mt-6 w-full"
                onClick={handleAnalyse}
                disabled={loading}
                />
            </>
        ) : (
            <div className="text-white">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-green-400 mb-4">Matched Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {result.matched_skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full border border-green-400/30 text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4">Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {result.missing_skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-red-400/20 text-red-400 rounded-full border border-red-400/30 text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                
                <Button text="ANALYSE ANOTHER" className="mt-12 w-full" onClick={() => {setResult(null); setFile(null); setJobDescription("");}} />
            </div>
        )}
      </div>

    </div>
  );
}

export default Uploadpage;