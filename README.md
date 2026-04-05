# Sycro — Frontend

A React + TypeScript frontend for Sycro, a student collaboration platform for sharing notes, creating quizzes, and discussing study materials.

---

## Tech Stack

**Core**
- React 18
- TypeScript
- Vite

**Routing & HTTP**
- React Router DOM
- Axios
- Fetch API

**Styling**
- Tailwind CSS

**Authentication**
- JWT (stored in localStorage)
- Google OAuth2
- GitHub OAuth

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AuthSideBar.tsx
│   │   ├── Bookmark.tsx
│   │   ├── Comments.tsx
│   │   ├── GoogleBtn.tsx
│   │   ├── LayoutWrapper.tsx
│   │   └── Votes.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Feed.tsx
│   │   ├── Post.tsx
│   │   ├── Publish.tsx
│   │   ├── QuizFeed.tsx
│   │   ├── Quizzes.tsx
│   │   ├── Profile.tsx
│   │   ├── User_Bookmarks.tsx
│   │   ├── Signup.tsx
│   │   └── Signin.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── api.ts
│   ├── styles/
│   ├── images/
│   └── main.tsx
├── index.html
├── vite.config.ts
└── .env
```

---

## Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with hero, features, and live demo preview |
| Feed | `/Feed` | Browse all uploaded notes and study materials |
| Post | `/Post/:id` | View a single post with files, votes, and comments |
| Publish | `/Publish` | Upload study files with cover photo and description |
| Quiz Feed | `/QuizFeed` | Browse all community quizzes |
| Quizzes | `/Quiz/:id` | Take a specific quiz and submit answers |
| Profile | `/Profile/:userId` | View a user's posts and quizzes |
| Bookmarks | `/Bookmarks` | View your saved posts |
| Sign Up | `/Signup` | Register with email or Google/GitHub OAuth |
| Sign In | `/Signin` | Login with email or Google/GitHub OAuth |

---

## Features

**Authentication**
- Email and password registration and login
- Google OAuth2 login via Google Identity Services
- GitHub OAuth login
- JWT token stored in localStorage
- Protected routes via token verification

**Notes and File Sharing**
- Upload multiple files (PDF, images) with a cover photo
- Browse all community notes in a card-based feed
- View individual posts with file preview and PDF viewer
- Cloudinary and local storage support depending on backend config

**Voting and Comments**
- Upvote and downvote posts
- Add and view comments on posts

**Quizzes**
- Browse all quizzes in the community
- Take quizzes with multiple choice questions
- Submit answers and get instant score results
- Retry quizzes after submission

**Bookmarks**
- Save posts for later
- View all bookmarked posts in one place

**User Profiles**
- View any user's posts and quizzes by profile

**Home Page**
- Animated live comments demo section
- How it works section
- Features/benefits section
- Call to action

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sycro.git
cd sycro/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
VITE_SERVER_URL=http://localhost:5000
VITE_APP_BACKEND_URL=your_production_backend_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Run in development

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SERVER_URL` | Local backend URL (development) |
| `VITE_APP_BACKEND_URL` | Production backend URL |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID |

The `DynamicUrl()` utility in `src/utils/api.ts` automatically switches between local and production backend URLs based on the Vite `MODE`.

---

## Authentication Flow

### Email Login
1. User submits email and password
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Token sent in `Authorization: Bearer <token>` header on protected requests

### Google OAuth
1. User clicks Google button
2. Google returns an ID token
3. Token sent to backend `/api/auth/google`
4. Backend verifies and returns JWT
5. JWT stored in `localStorage`

### GitHub OAuth
1. User is redirected to backend `/auth/github`
2. GitHub handles OAuth flow
3. Backend returns JWT after verification

---

## Deployment (Render Static Site)

1. Push frontend to GitHub
2. Create a new Static Site on Render
3. Set the following:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add environment variables
5. Deploy

---

## Author

Developed by Mike. Built with React, TypeScript, and Tailwind CSS.
