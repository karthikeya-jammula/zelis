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

### Quick start (both services together)

```bash
# Install all dependencies
npm run install:all

# Start server (port 5000) + client dev server (port 5173)
npm run dev
```

> **Note:** Copy `server/.env.example` to `server/.env` and fill in your
> `OPENROUTER_API_KEY` before generating tests. Without the key the server
> still starts and all other routes work; only `POST /api/tests` will fail.

### Manual (separate terminals)

#### Backend

```bash
cd server
cp .env.example .env   # edit OPENROUTER_API_KEY (and optionally MONGODB_URI)
npm install
npm run dev
```

`MONGODB_URI` is optional — an in-memory MongoDB instance is started
automatically when it is not provided.

#### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend proxies `/api` → `http://localhost:5000` in dev mode.

### Production build

```bash
npm run build          # builds client/dist
npm start              # serves API + static frontend on port 5000
```

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
