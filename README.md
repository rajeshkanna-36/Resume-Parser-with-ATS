<div align="center">
  <h1>🚀 Resume Parser & ATS Matching System</h1>
  <p>An intelligent, AI-powered Application Tracking System (ATS) that parses resumes and scores them against job descriptions.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Python-3.12+-blue.svg" alt="Python Version" />
    <img src="https://img.shields.io/badge/FastAPI-0.136.3+-green.svg" alt="FastAPI" />
    <img src="https://img.shields.io/badge/React-19-blue.svg" alt="React" />
    <img src="https://img.shields.io/badge/Vite-8-purple.svg" alt="Vite" />
    <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/Docker-Supported-2496ED.svg" alt="Docker" />
  </p>
</div>

<br />

## 📖 Overview

The **Resume Parser & ATS Matching System** is a full-stack application designed to streamline the recruitment process. It allows HR professionals and recruiters to upload candidate resumes, intelligently extract key information (such as skills, experience, and contact details), and instantly calculate a match score against a specific job description. 

Say goodbye to manually reviewing hundreds of resumes!

---

## ✨ Key Features

- **📄 Intelligent Resume Parsing:** Automatically extracts text from `.pdf`, `.doc`, and `.docx` files using state-of-the-art Python libraries (`pypdf`, `python-docx`).
- **🧠 Natural Language Processing:** Leverages `spaCy` to identify and extract crucial entities like candidate skills, education, and professional experience.
- **🎯 ATS Match Scoring:** Calculates a real-time compatibility score comparing the parsed resume data with the target job description.
- **⚡ High-Performance Backend:** Built on top of **FastAPI** for lightning-fast API responses and asynchronous processing.
- **🎨 Modern User Interface:** A sleek, highly responsive frontend built with **React**, **Vite**, and **TailwindCSS**.
- **🐳 Docker Ready:** Comes with a pre-configured Dockerfile for easy containerization and deployment.

---

## 🛠️ Technology Stack

### Backend
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
* **NLP & Processing:** [spaCy](https://spacy.io/), [Pandas](https://pandas.pydata.org/)
* **File Handling:** `pypdf`, `python-docx`, `python-multipart`
* **Package Manager:** [uv](https://github.com/astral-sh/uv)
* **Server:** Uvicorn

### Frontend
* **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Routing & HTTP:** React Router DOM, Axios

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- **Python** (>= 3.12)
- **Node.js** (>= 18)
- **uv** (Astral's lightning-fast Python package installer)

### 1. Backend Setup

Open a terminal and navigate to the `Backend` directory:

```bash
cd Backend
```

Install the dependencies using `uv`:
```bash
uv sync
```

Download the required spaCy English language model:
```bash
uv run python -m spacy download en_core_web_sm
```

Start the FastAPI development server:
```bash
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
*The API will be available at http://localhost:8000*
*You can access the interactive API docs at http://localhost:8000/docs*

### 2. Frontend Setup

Open a new terminal window and navigate to the `Frontend` directory:

```bash
cd Frontend
```

Install the required Node.js dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The frontend application will be available at http://localhost:5173*

---

## 🐳 Docker Deployment

The project includes a `Dockerfile` tailored for the backend, making it easy to deploy on platforms like Railway, Render, or your own VPS.

To build and run the Docker image locally:

```bash
# Build the image
docker build -t resume-parser-backend .

# Run the container
docker run -p 8000:8000 resume-parser-backend
```

---

## 🔌 API Endpoints (Quick Reference)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/`      | Health check endpoint to verify the API is running. |
| `POST` | `/api/upload` | Upload a resume (`.pdf`, `.docx`) to parse its content. |
| `POST` | `/api/match`  | Submit a parsed resume and a Job Description to get a match score. |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the [ISC License](https://opensource.org/licenses/ISC).
