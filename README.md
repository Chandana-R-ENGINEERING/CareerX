# CareerX 🚀
### Discover. Prepare. Practise. Succeed.

**CareerX** is an AI-powered student career and placement preparation platform that brings essential career-building tools together in one place. From discovering job opportunities to preparing for interviews, CareerX helps students organise and manage their journey towards career readiness.

Instead of switching between multiple platforms for job searches, resume preparation, coding practice, and interview preparation, students can access these features through one unified workspace.

---

## ✨ Features

### 💼 Job & Internship Discovery
- Explore job and internship opportunities.
- View opportunity details and requirements.
- Save interesting opportunities.
- Track application progress.

### 📄 Resume Builder & ATS Analyzer
- Create and customise resumes.
- Analyse resumes using AI.
- Identify relevant skills and keywords.
- Get suggestions to improve resume quality.

### 🧠 Aptitude Practice
- Practise aptitude questions.
- Attempt timed quizzes.
- Calculate scores and monitor performance.

### 💻 Coding Zone
- Explore coding challenges.
- Practise programming problems.
- Evaluate practice submissions.

### 🎤 Mock Interview
- Practise interview questions.
- Receive AI-assisted feedback on responses.
- Improve interview preparation.

### 🤖 AI Career Assistant
- Get career-related guidance.
- Ask questions about skills and career preparation.
- Receive AI-powered suggestions and support.

### 📊 Application Tracker
- Keep track of saved opportunities and applications.
- Monitor application statuses.
- Organise the job application journey.

### 🎯 Skills Roadmap
- Explore learning goals.
- Track completed learning activities.
- Organise skill development progress.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend development |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS 4 | Styling and responsive UI |
| Node.js | Backend runtime |
| Express.js | REST API development |
| Google Gemini API | AI-powered features |
| dotenv | Environment configuration |
| Lucide React | Icons |
| localStorage | Browser-side application state and persistence |

---

## 🏗️ Architecture

CareerX follows a frontend-backend architecture.

```text
                 ┌─────────────────────────┐
                 │       CareerX UI        │
                 │   React + TypeScript    │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │      Express Server     │
                 │       Node.js API       │
                 └────────────┬────────────┘
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
       ┌──────────────────┐      ┌──────────────────┐
       │  Gemini API      │      │  Application     │
       │  AI Services     │      │  State & Data    │
       └──────────────────┘      └──────────────────┘
```

### AI API Endpoints

| Endpoint | Purpose |
|---|---|
| `/api/gemini/chat` | AI career assistant |
| `/api/gemini/resume-analyze` | Resume analysis |
| `/api/gemini/mock-interview-eval` | Mock interview evaluation |
| `/api/code/run` | Coding practice evaluation |

---

## ⚙️ Getting Started

Follow these steps to run CareerX locally.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/CareerX.git
```

### 2. Navigate to the project directory

```bash
cd CareerX
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Keep your API key private. Never commit your `.env` file to GitHub.

### 5. Start the application

Use the development commands configured in the project's `package.json`.

For example, if the project defines separate frontend and backend scripts:

```bash
npm run dev
```

Check the available scripts in `package.json` if the command differs.

---

## 🔐 Environment Configuration

CareerX uses `dotenv` to load environment variables into `process.env`.

This keeps configuration values, such as API credentials, separate from the application source code.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
.env.*
!.env.example
node_modules/
dist/
```

You can provide an `.env.example` file with placeholder values for other developers.

---

## 📌 Current MVP Notes

CareerX is an evolving project. The current MVP uses browser `localStorage` for much of its application state and predefined datasets for job listings and practice content.

Some AI features depend on a valid Gemini API key and service availability. Fallback behaviour may be used when AI services are unavailable.

The coding evaluation feature is a demonstration implementation, not a production-grade secure code execution sandbox.

---

## 🚀 Future Enhancements

- Cloud database integration.
- Stronger authentication and user management.
- Authorised live job and internship API integrations.
- Secure code execution sandbox.
- More personalised AI career recommendations.
- Advanced progress analytics and placement insights.
- Integration with additional learning and career tools.

---

## 🎯 Vision

The goal of CareerX is to make career preparation more organised, accessible, and manageable for students by connecting opportunities, learning, practice, and placement readiness in a single platform.

**CareerX – Your journey from learning to career readiness starts here.**

---

## 👩‍💻 Author

Developed as a student-focused technology project.

**If you find this project interesting, consider giving the repository a ⭐!**
