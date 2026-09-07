# AI-Powered Notes Manager - Frontend

A modern, responsive, glassmorphic React frontend application built for the **AI-Powered Notes Manager** system. This frontend provides user authentication, complete Notes CRUD operations, search and category filtering, status error handling, and integrated AI content generation via FastAPI AI Service.

---

## 🌟 Key Features

- **Authentication & Security**:
  - User Registration (`/register`) & Login (`/login`)
  - JWT token storage in `localStorage` & automatic `Authorization: Bearer <token>` headers
  - Protected route redirection and global 401 session expiration handling
- **Notes CRUD Operations**:
  - List notes with date badges, category tags, and responsive card layouts (`/notes`)
  - Create new notes with title, content, and category tags (`/notes/new`)
  - Edit existing notes (`/notes/:id/edit`)
  - Delete notes with interactive confirmation modal
- **AI Service Integration**:
  - Direct integration with FastAPI AI Service (`POST http://localhost:8000/api/ai/generate`)
  - "Improve with AI" action button embedded in NoteForm
  - Preset prompts ("Improve Clarity & Grammar", "Summarize Note", "Make Professional", "Expand Ideas") & custom prompt input
- **User Interface & Aesthetics**:
  - Sleek dark mode glassmorphic interface built with CSS variables & Tailwind CSS
  - Micro-animations, smooth hover states, and responsive layout
  - Real-time search query filtering and category tab sorting
  - Clear error status banners (400, 401, 404, 409, 500)

---

## 🏗️ Architecture & Folder Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── authApi.js       # Login & Register Axios requests
│   │   ├── noteApi.js       # Notes CRUD Axios requests & Bearer auth headers
│   │   └── aiApi.js         # FastAPI AI endpoint request generator
│   │
│   ├── components/
│   │   ├── Navbar.jsx       # Glassmorphic top navigation & user session controls
│   │   ├── NoteCard.jsx     # Card preview with date/tag metadata & delete modal
│   │   ├── NoteForm.jsx     # Reusable create/edit form with integrated AI button
│   │   ├── NotesList.jsx    # Responsive grid layout with search & category filtering
│   │   ├── AIAction.jsx     # AI prompt controls & content generator trigger
│   │   ├── Loading.jsx      # Animated spinner & full-screen loading overlay
│   │   └── ErrorMessage.jsx # Error status alert component (400, 401, 404, 409, 500)
│   │
│   ├── pages/
│   │   ├── Login.jsx        # User login screen (/login)
│   │   ├── Register.jsx     # User registration screen (/register)
│   │   ├── Notes.jsx        # Main notes dashboard (/notes)
│   │   └── EditNote.jsx     # Note editor page (/notes/new & /notes/:id/edit)
│   │
│   ├── context/
│   │   └── AuthContext.jsx  # React authentication state context provider
│   │
│   ├── utils/
│   │   └── storage.js       # LocalStorage session token and user persistence
│   │
│   ├── App.jsx              # React Router setup & protected route guards
│   ├── main.jsx             # React DOM root entry point
│   └── index.css            # Custom CSS tokens, glassmorphism, & animations
│
├── .env                     # Environment variables configuration
├── package.json
└── README.md
```

---

## 🚀 Environment Setup & Running

### 1. Environment Variables (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_AI_API_URL=http://localhost:8000/api/ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🔗 Backend Service URLs

| Service | Base URL | Purpose |
| :--- | :--- | :--- |
| **Node.js / Express** | `http://localhost:5000` | User Authentication & Notes CRUD APIs |
| **FastAPI AI Service** | `http://localhost:8000` | AI text enhancement and content generation |

---

## 🧪 Testing Verification

1. **Register**: Go to `http://localhost:5173/register` and submit a new user name, email, and password.
2. **Login**: Go to `http://localhost:5173/login` to authenticate and receive JWT token.
3. **Notes List**: View stored notes at `/notes`, search notes by title, or filter by category tag.
4. **Create Note & AI Improvement**: Click "New Note" (`/notes/new`), enter a title and rough draft content, click **"Improve with AI"**, and watch the textarea populate with enhanced text before saving!
5. **Edit & Delete Note**: Click the Edit icon on any note card to modify it or click Delete to trigger the confirmation modal.
