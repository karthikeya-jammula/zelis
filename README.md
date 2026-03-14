# AI-Powered Test Generator

Full-stack web app that generates AI-based MCQ test papers from syllabus topics and difficulty level.

## Stack

- Frontend: React + Vite + Tailwind CSS + Framer Motion + React Three Fiber
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- AI: OpenRouter Chat Completions API

## Project Structure

- `client`: 3D interactive frontend dashboard
- `server`: REST API, OpenRouter integration, MongoDB persistence

## Setup

### 1. Backend

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

Set the values in `server/.env`, especially:

- `OPENROUTER_API_KEY`
- `MONGODB_URI`

### 2. Frontend

```bash
cd client
copy .env.example .env
npm install
npm run dev
```

Frontend defaults to `http://localhost:5000/api`.

## API

- `GET /api/health`
- `GET /api/tests`
- `POST /api/tests`

### `POST /api/tests` payload

```json
{
  "topics": ["Data Structures: Arrays, Trees, Graphs"],
  "difficulty": "Intermediate",
  "numberOfQuestions": 10
}
```

## Features Delivered

- Manual syllabus entry with multiple topic groups
- Difficulty levels: Beginner, Intermediate, Advanced
- AI-generated MCQs with options, answer, explanation, topic, and difficulty
- MongoDB storage for `Question` and `TestPaper`
- 3D animated hero background and floating visual elements
- Responsive dashboard for desktop, tablet, and mobile
- Dark/light toggle
- Export as JSON and print-to-PDF path
