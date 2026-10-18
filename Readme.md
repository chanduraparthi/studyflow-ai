<p align="center">
  <img src="https://img.shields.io/badge/chandu's%20AI-AI%20Learning%20Platform-10B981?style=for-the-badge&logo=bookstack&logoColor=white" alt="chandu's AI" />
</p>

<h1 align="center">📚 chandu's AI — AI-Powered Document Learning Platform</h1>

<p align="center">
  <strong>Upload PDFs. Generate Flashcards & Quizzes. Chat with AI. Track Progress.</strong><br/>
  A full-stack MERN application powered by Google Gemini AI that transforms static PDF documents into interactive, intelligent learning experiences.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-886FBF?style=flat&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" />
</p>

---

## 🌐 Live Demo - [https://chandus-ai.vercel.app/](https://studyflow-ai-3heu-olzhvqp7o-chanduraparthis-projects.vercel.app/)
---

## ✨ Features

### 📄 Document Management
- **PDF Upload** — Upload PDFs up to **10 MB**; files are stored on **Cloudinary CDN** (no local disk dependency)
- **Text Extraction** — Automatic text extraction from PDFs using `pdf-parse` v2
- **Smart Chunking** — Extracted text is split into overlapping chunks (500 chars, 50 char overlap) and stored in MongoDB for optimized AI context retrieval
- **Cloud Viewer** — One-click **"View PDF"** button opens the document from Cloudinary in a new browser tab (works on all devices and browsers — no iframe issues)

### 🤖 AI Features (Google Gemini 2.5 Flash Lite)
- **Chat with Document** — Conversational AI that answers questions using relevant chunks from your uploaded PDFs
- **Generate Flashcards** — AI creates study flashcards from document content with difficulty levels
- **Generate Quiz** — Auto-generated multiple-choice quizzes with explanations
- **Document Summary** — Get a concise AI-generated summary of any uploaded document
- **Explain Concept** — Ask the AI to explain specific concepts found in the document

### 🃏 Flashcard System
- Flip-card UI with question/answer reveal
- Star/favorite important cards
- Review tracking with last-reviewed timestamps
- Delete flashcard sets

### 📝 Quizzes
- Multiple-choice questions with 4 options each
- Difficulty levels (Easy / Medium / Hard)
- Score calculation and detailed results with correct answers and explanations
- Review past quiz performance

### 📊 Progress Dashboard
- Total documents, flashcards, and quizzes count
- Recent study activity
- Quick navigation to study materials

### 🔐 Authentication
- **Local** — Email/password registration and login with bcrypt hashing
- **Google OAuth** — One-click Google sign-in via `@react-oauth/google`
- JWT-based session management (7-day token expiry)
- Profile management and password change

### 📱 Responsive Design
- Fully responsive layout with sidebar navigation on desktop and collapsible menu on mobile
- Works on all modern browsers (Chrome, Firefox, Safari, Edge) on both laptop and mobile

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React 19)                      │
│   Vite 7 • TailwindCSS 4 • React Router v7 • Axios              │
│                                                                  │
│   ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌──────────────────┐   │
│   │  Pages  │ │Components│ │  Services │ │ AuthContext (JWT) │   │
│   └────┬────┘ └────┬─────┘ └─────┬─────┘ └────────┬─────────┘   │
│        └───────────┴─────────────┴────────────────┘              │
│                         │  Axios HTTP                            │
│                         ▼                                        │
├──────────────────────────────────────────────────────────────────┤
│                       BACKEND (Express 5)                        │
│   Node.js • Mongoose 9 • JWT • Multer (memory) • Cloudinary     │
│                                                                  │
│   ┌────────┐ ┌────────────┐ ┌──────────┐ ┌─────────────────┐    │
│   │ Routes │→│ Controllers│→│  Models  │→│    MongoDB       │    │
│   └────────┘ └──────┬─────┘ └──────────┘ └─────────────────┘    │
│                     │                                            │
│          ┌──────────┼──────────────┐                             │
│          ▼          ▼              ▼                              │
│   ┌────────────┐ ┌──────────┐ ┌───────────────┐                 │
│   │ Cloudinary │ │ pdf-parse│ │ Google Gemini │                  │
│   │  (PDF CDN) │ │ (extract)│ │  (AI service) │                  │
│   └────────────┘ └──────────┘ └───────────────┘                 │
└──────────────────────────────────────────────────────────────────┘
```

### PDF Upload Flow

```
User uploads PDF
       │
       ▼
Multer (memoryStorage) ── validates PDF type & 10MB limit
       │
       ▼
Buffer ──► Cloudinary upload_stream (resource_type: "image")
       │         │
       │         └──► Returns secure_url + public_id
       │
       ▼
MongoDB Document created (status: "Processing")
       │
       ▼
Response sent to client immediately (non-blocking)
       │
       ▼ (background)
pdf-parse extracts text from the in-memory Buffer
       │
       ▼
textChunker splits text into overlapping chunks
       │
       ▼
MongoDB Document updated (extractedText, chunks, status: "Ready")
```

### AI Chat Flow

```
User sends message
       │
       ▼
Backend retrieves document chunks from MongoDB
       │
       ▼
findRelevantChunks() scores chunks by keyword overlap with user query
       │
       ▼
Top 3 relevant chunks injected into Gemini AI prompt
       │
       ▼
Gemini 2.5 Flash Lite generates context-aware response
       │
       ▼
Message + response saved to ChatHistory collection
       │
       ▼
Response returned to frontend
```

---

## 📁 Project Structure

```
chandus_AI_FullStack_Project_MERN/
│
├── backend/
│   ├── server.js                   # Express app entry point & Vercel export
│   ├── package.json
│   ├── vercel.json                 # Vercel serverless config (60s timeout)
│   │
│   ├── config/
│   │   ├── cloudinary.js           # Cloudinary v2 SDK configuration
│   │   ├── db.js                   # MongoDB / Mongoose connection
│   │   └── multer.js               # Multer memoryStorage + PDF filter + 10MB limit
│   │
│   ├── controllers/
│   │   ├── aiController.js         # AI endpoints (chat, flashcards, quiz, summary, explain)
│   │   ├── authController.js       # Auth (register, login, Google OAuth, profile)
│   │   ├── documentController.js   # Document CRUD with Cloudinary upload/delete
│   │   ├── flashcardController.js  # Flashcard sets (CRUD, review, star)
│   │   ├── progressController.js   # Dashboard progress aggregation
│   │   └── quizController.js       # Quiz CRUD and submission scoring
│   │
│   ├── middlewares/
│   │   ├── auth.js                 # JWT verification middleware
│   │   └── errorHandler.js         # Global error handler
│   │
│   ├── models/
│   │   ├── ChatHistory.js          # AI chat conversation history
│   │   ├── Document.js             # PDF document with chunks & Cloudinary fields
│   │   ├── Flashcard.js            # Flashcard sets with review tracking
│   │   ├── Quiz.js                 # Quizzes with questions & user answers
│   │   └── User.js                 # User with local & Google auth support
│   │
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── flashcardRoutes.js
│   │   ├── progressRoutes.js
│   │   └── quizRoutes.js
│   │
│   └── utils/
│       ├── geminiService.js        # Google Gemini AI integration with retry logic
│       ├── pdfParser.js            # PDF text extraction from Buffer (no disk I/O)
│       └── textChunker.js          # Text chunking with overlap + relevance scoring
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js              # Vite + TailwindCSS plugin
│   ├── vercel.json                 # SPA rewrites for Vercel
│   │
│   └── src/
│       ├── App.jsx                 # Route definitions
│       ├── main.jsx                # Entry point + Google OAuth provider
│       ├── index.css               # Global styles + Tailwind imports
│       │
│       ├── components/
│       │   ├── ai/                 # AIActions (summary, explain)
│       │   ├── chat/               # ChatInterface (AI conversation UI)
│       │   ├── common/             # Button, EmptyState, MarkdownRenderer, Modal,
│       │   │                       #   PageHeader, Spinner, Tabs
│       │   ├── documents/          # DocumentCard
│       │   ├── flashcards/         # Flashcard, FlashcardManager, FlashcardSetCard
│       │   ├── homeComponents/     # Banner, Footer, LenisScroller, NavBar, SectionTitle
│       │   ├── homeSection/        # HeroSection, WhatWeDoSection, FreqSection, etc.
│       │   ├── layout/             # AppLayout (Header + Sidebar), Header, Sidebar
│       │   └── quizzes/            # QuizCard, QuizManager
│       │
│       ├── context/
│       │   └── AuthContext.jsx     # Auth state (user, login, logout, token management)
│       │
│       ├── pages/
│       │   ├── Auth/               # LoginPage, RegisterPage, ProtectedRoute
│       │   ├── Dashboard/          # DashboardPage
│       │   ├── Documents/          # DocumentListPage, DocumentDetailPage
│       │   ├── Flashcards/         # FlashcardListPage, FlashcardPage
│       │   ├── Home/               # Home (landing page)
│       │   ├── Profile/            # ProfilePage
│       │   ├── Quizzes/            # QuizTakePage, QuizResultPage
│       │   └── NotFoundPage.jsx
│       │
│       ├── services/               # API service modules (axios calls)
│       │   ├── aiService.js
│       │   ├── authService.js
│       │   ├── documentService.js
│       │   ├── flashcardService.js
│       │   ├── progressService.js
│       │   └── quizService.js
│       │
│       └── utils/
│           ├── apiPaths.js         # Centralized API URL builder
│           └── axiosInstance.js    # Axios instance with JWT interceptor
│
└── Reaadme.md
```

---

## 🔌 API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register with email & password | No |
| POST | `/login` | Login with email & password | No |
| POST | `/google` | Google OAuth login/register | No |
| GET | `/profile` | Get current user profile | Yes |
| PUT | `/profile` | Update username & profile image | Yes |
| PUT | `/change-password` | Change password | Yes |

### Documents — `/api/documents`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/upload` | Upload PDF (multipart form, max 10 MB) → Cloudinary | Yes |
| GET | `/` | List all user documents (with flashcard/quiz counts) | Yes |
| GET | `/:id` | Get single document detail (text, chunks, metadata) | Yes |
| DELETE | `/:id` | Delete document + Cloudinary file + all associated data | Yes |

### AI — `/api/ai`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/generate-flashcards` | Generate flashcards from document using Gemini AI | Yes |
| POST | `/generate-quiz` | Generate multiple-choice quiz from document | Yes |
| POST | `/generate-summary` | Generate document summary | Yes |
| POST | `/chat` | Chat with AI about a document (context-aware via chunks) | Yes |
| POST | `/explain-concept` | Explain a specific concept from document | Yes |
| GET | `/chat-history/:documentId` | Retrieve chat history for a document | Yes |

### Flashcards — `/api/flashcards`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all user's flashcard sets | Yes |
| GET | `/:documentId` | Get flashcards for a specific document | Yes |
| POST | `/:cardId/review` | Mark a flashcard as reviewed | Yes |
| PUT | `/:cardId/star` | Toggle star/favorite on a flashcard | Yes |
| DELETE | `/:cardId` | Delete a flashcard set | Yes |

### Quizzes — `/api/quizzes`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/:documentId` | Get quizzes for a document | Yes |
| GET | `/quiz/:id` | Get a single quiz by ID | Yes |
| POST | `/:id/submit` | Submit quiz answers and get score | Yes |
| GET | `/:id/results` | Get quiz results with answers/explanations | Yes |
| DELETE | `/:id` | Delete a quiz | Yes |

### Progress — `/api/progress`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/dashboard` | Get aggregated study progress data | Yes |

---

## 🗄️ Database Models

### User
| Field | Type | Notes |
|-------|------|-------|
| `username` | String | Required, unique, 3–50 chars |
| `email` | String | Required, unique, lowercase, regex validated |
| `password` | String | bcrypt hashed, required for local auth only |
| `profileImage` | String | Default avatar URL |
| `googleId` | String | Unique, sparse — for Google OAuth users |
| `authProvider` | String | `'local'` or `'google'` |
| `createdAt` / `updatedAt` | Date | Auto-managed timestamps |

### Document
| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId → User | Owner reference |
| `title` | String | User-provided document title |
| `fileName` | String | Original PDF filename |
| `filePath` | String | **Cloudinary `secure_url`** (HTTPS CDN link) |
| `cloudinaryPublicId` | String | Used for deletion from Cloudinary |
| `fileSize` | Number | File size in bytes |
| `extractedText` | String | Full extracted text from PDF |
| `chunks` | Array | `{ content, pageNumber, chunkIndex }` — used by AI context |
| `status` | Enum | `'Processing'` → `'Ready'` / `'Failed'` |
| `uploadDate` | Date | When the document was uploaded |
| `lastAccessed` | Date | When the document was last viewed |

### Flashcard
| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId → User | Owner |
| `documentId` | ObjectId → Document | Source document |
| `cards` | Array | `{ question, answer, difficulty, lastReviewed, reviewCount, isStarred }` |

### Quiz
| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId → User | Owner |
| `documentId` | ObjectId → Document | Source document |
| `title` | String | AI-generated quiz title |
| `questions` | Array | `{ question, options[4], correctAnswer, explanation, difficulty }` |
| `userAnswers` | Array | `{ questionIndex, selectedAnswer, isCorrect, answeredAt }` |
| `score` | Number | Calculated after submission |
| `totalQuestions` | Number | Total question count |
| `completedAt` | Date | When the quiz was submitted (`null` if not taken) |

### ChatHistory
| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId → User | Owner |
| `documentId` | ObjectId → Document | Document being discussed |
| `messages` | Array | `{ role: 'user'/'assistant', content, timestamp, relevantChunks }` |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2 | UI framework |
| Vite | 7.3 | Build tool & dev server |
| TailwindCSS | 4.2 | Utility-first styling |
| React Router | 7.13 | Client-side routing (SPA) |
| Axios | — | HTTP client with JWT interceptor |
| react-hot-toast | — | Toast notifications |
| react-markdown + remark-gfm | — | Markdown rendering for AI responses |
| react-syntax-highlighter | — | Code syntax highlighting in AI output |
| Lucide React | — | Modern icon library |
| Lenis | — | Smooth scroll (landing page) |
| @react-oauth/google | — | Google OAuth frontend integration |
| moment | — | Date/time formatting |
| tw-animate-css | — | TailwindCSS animations |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 5.2 | Web framework |
| Mongoose | 9.2 | MongoDB ODM |
| Cloudinary | 2.9 | PDF cloud storage & CDN delivery |
| Multer | 2.1 | File upload middleware (memory storage) |
| pdf-parse | 2.4 | PDF text extraction from buffer |
| @google/genai | 1.43 | Google Gemini AI SDK |
| bcryptjs | 3.0 | Password hashing |
| jsonwebtoken | 9.0 | JWT authentication |
| express-validator | 7.3 | Request input validation |
| google-auth-library | 10.6 | Google OAuth token verification |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **MongoDB Atlas** | Cloud database |
| **Cloudinary** | PDF file storage & CDN delivery |
| **Vercel** | Serverless deployment (frontend + backend) |
| **Google Cloud** | OAuth 2.0 & Gemini AI API |

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/chandus_ai

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Google
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Upload (optional — default is 10MB = 10485760 bytes)
MAX_FILE_SIZE=10485760
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Cloudinary** account ([sign up free](https://cloudinary.com/))
- **Google Cloud** project with:
  - OAuth 2.0 Client ID ([Google Cloud Console](https://console.cloud.google.com/))
  - Gemini AI API key ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chandus_AI_FullStack_Project_MERN.git
cd chandus_AI_FullStack_Project_MERN
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with all variables from the **Backend Environment Variables** section above.

```bash
npm run dev    # Start with nodemon (development)
# or
npm start      # Start with node (production)
```

The backend server runs on **http://localhost:5000** by default.

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

```bash
npm run dev    # Start Vite dev server
```

The frontend runs on **http://localhost:5173** by default.

### 4. Cloudinary Setup

1. Create a free [Cloudinary account](https://cloudinary.com/)
2. From the **Cloudinary Dashboard**, copy your **Cloud Name**, **API Key**, and **API Secret**
3. Add them to your backend `.env` file
4. When you upload PDFs, they will be stored in the `chandus_ai/documents/` folder in your Cloudinary Media Library

---

## 🌍 Deployment (Vercel)

Both the frontend and backend are configured for **Vercel** serverless deployment with zero-config.

### Backend Deployment

1. Push the `backend/` folder to a GitHub repository
2. Import in **Vercel** → set **Root Directory** to `backend`
3. Set all **Environment Variables** from the backend `.env` section
4. Set **Framework Preset** to **Other**
5. The `vercel.json` routes all requests to `server.js` with a **60-second function timeout**

### Frontend Deployment

1. Push the `frontend/` folder to a GitHub repository
2. Import in **Vercel** → set **Root Directory** to `frontend`
3. Set **Environment Variables**:
   - `VITE_API_URL` = your deployed backend URL (e.g., `https://chandus-ai-api.vercel.app`)
   - `VITE_GOOGLE_CLIENT_ID` = your Google Client ID
4. Set **Framework Preset** to **Vite**
5. The `vercel.json` handles SPA fallback routing for all client-side routes

### ⚠️ Important Vercel Notes

| Concern | Solution |
|---------|----------|
| **No local filesystem** | Vercel serverless has a read-only filesystem. All file uploads use **Multer memory storage** (buffer) and stream directly to Cloudinary via `upload_stream` — no disk writes |
| **10 MB upload limit** | Multer enforces the max file size before any processing begins |
| **60-second timeout** | Backend functions have a 60s max duration (in `vercel.json`), sufficient for PDF upload + Cloudinary streaming + text extraction |
| **No iframe PDF viewer** | PDFs are accessed via a direct **Cloudinary CDN link** (opens in new tab), avoiding cross-origin iframe restrictions on deployed environments |
| **Cold starts** | First request after inactivity may take 2-5 seconds due to Vercel cold start — subsequent requests are fast |
| **CORS** | Backend CORS auto-allows `*.vercel.app` preview deployments in addition to your configured `FRONTEND_URL` |

---

## 🔒 Security

- Passwords hashed with **bcryptjs** (10 salt rounds)
- JWT tokens stored in `localStorage` with 7-day expiration
- All API routes (except auth) protected by JWT verification middleware
- CORS configured to only allow the specified frontend origin and `*.vercel.app` preview deployments
- File uploads restricted to **PDF only** with configurable size limits
- MongoDB injection prevented by Mongoose schema validation and type casting
- Input validation on auth routes via `express-validator`
- Cloudinary files stored with unique timestamped public IDs
- Google OAuth tokens verified server-side via `google-auth-library`

---

## 📱 Frontend Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page with hero, features, testimonials |
| `/login` | Login | Email/password or Google OAuth login |
| `/register` | Register | New account registration |
| `/dashboard` | Dashboard | Study progress overview _(protected)_ |
| `/documents` | Document List | View, upload & manage documents _(protected)_ |
| `/documents/:id` | Document Detail | View PDF, Chat, AI Actions, Flashcards, Quizzes tabs _(protected)_ |
| `/flashcards` | Flashcard List | Browse all flashcard sets _(protected)_ |
| `/documents/:id/flashcards` | Flashcard Study | Study flashcards for a specific document _(protected)_ |
| `/quizzes/:quizId` | Quiz Take | Take a quiz _(protected)_ |
| `/quizzes/:quizId/results` | Quiz Results | View quiz score, answers & explanations _(protected)_ |
| `/profile` | Profile | Manage account settings _(protected)_ |
| `*` | 404 | Not found page |

---

## 🧠 How AI Features Work

1. **Context Retrieval** — When you use any AI feature, the system retrieves the most relevant text chunks from the document using keyword-based scoring (`textChunker.findRelevantChunks`)

2. **Prompt Engineering** — Relevant chunks are injected into carefully crafted prompts sent to Google Gemini 2.5 Flash Lite model

3. **Retry Logic** — The Gemini service includes exponential backoff with up to 3 retries for transient API failures

4. **Chat History** — Conversations are persisted in MongoDB with relevant chunk indices, allowing multi-turn context-aware discussions

5. **Structured Output** — AI responses for flashcards and quizzes are generated in structured text format, parsed and validated before saving to MongoDB with difficulty levels and explanations

---

## 📋 Scripts

### Backend

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon server.js` | Development with hot reload |
| `start` | `node server.js` | Production start |

### Frontend

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Development server with HMR |
| `build` | `vite build` | Production build |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Lint codebase |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Built with ❤️ using the MERN Stack — Powered by Google Gemini AI & Cloudinary
</p>
