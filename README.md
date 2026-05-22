<div align="center">

# 💡 IdeaVault

### Startup Idea Sharing & Validation Platform

*Where great ideas meet the community that helps them grow.*

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-Secured-6366F1?style=for-the-badge&logo=auth0&logoColor=white)](https://www.better-auth.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

### 🔗 [**Live Demo**](https://b13-a9-ideavault-client-atahar-shih-tau.vercel.app) &nbsp;•&nbsp; [Server Repo](https://github.com/Atahar-Shihab/B13-A9-ideavault-server_Atahar-Shihab)

</div>

---

## 📖 Overview

**IdeaVault** is a full-stack web platform where entrepreneurs and innovators can **share** startup ideas, **discover** trending concepts, and **engage** through likes, bookmarks, and threaded discussion. Instead of booking or scheduling, the platform focuses on **idea validation and community engagement** — helping creators refine their concepts collectively.

Built end-to-end with **Next.js 15 App Router** (frontend + backend API routes in one project), secured with **Better Auth**, and powered by **MongoDB**.

---

## ✨ Key Features

- 🔐 **Dual Authentication** — Email/password (with strong validation) **and** Google OAuth, powered by Better Auth with secure session cookies that persist across reloads
- 💡 **Full CRUD on Ideas** — Create, read, update (modal), and delete (confirmation modal) startup ideas with 10 detailed fields, all ownership-protected on the server
- 💬 **Threaded Comment System** — Add, edit, and delete your own comments with author avatars and timestamps in real time
- 🔥 **Smart Trending Algorithm** — MongoDB `$aggregate` ranks ideas by `(likes × 3) + (comments × 2) + recency boost`, surfacing the hottest 6 via `$limit`
- ❤️ **Likes & 🔖 Bookmarks** — Heart ideas you love and save ideas to a personal bookmarks page for later
- 🔎 **Powerful Search & Filter** — Case-insensitive title search (`$regex`), category filtering, and date-range filtering (`$gte` / `$lte`)
- 🌗 **Dark / Light Theme** — One-click global toggle, persisted in localStorage with zero flash of unstyled content
- 📱 **Fully Responsive** — Pixel-perfect on mobile, tablet, and desktop with a premium, animated UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, JavaScript, React Server Components) |
| **Authentication** | Better Auth + MongoDB Adapter (Email/Password + Google OAuth) |
| **Database** | MongoDB Atlas (native driver) |
| **Styling** | Tailwind CSS v4 + DaisyUI v5 |
| **UI / UX** | Swiper (carousel), react-hot-toast, custom CSS animations |
| **Fonts** | Plus Jakarta Sans + Space Grotesk |
| **Deployment** | Vercel |

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/                  # Backend Route Handlers (the "server")
│   │   ├── auth/[...all]/     # Better Auth catch-all
│   │   ├── ideas/            # Ideas CRUD + trending + likes
│   │   ├── comments/         # Comments CRUD
│   │   ├── bookmarks/        # Bookmark toggle + list
│   │   ├── interactions/     # User's commented ideas
│   │   └── user/profile/     # Profile update
│   ├── ideas/[id]/           # Idea details (private)
│   ├── add-idea/             # Submit idea (private)
│   ├── my-ideas/             # Dashboard (private)
│   ├── login/ • register/    # Auth pages
│   ├── layout.js             # Root layout + Navbar + Footer
│   └── page.jsx              # Home page
├── components/               # Navbar, Footer, IdeaCard, Marquee, etc.
└── lib/                      # auth.js, mongodb.js, session.js
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (see below)

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### Environment Variables (`.env.local`)

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📡 API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/*` | Better Auth (login, register, Google, session) |
| `GET / POST` | `/api/ideas` | List (search/filter) · Create idea |
| `GET / PUT / DELETE` | `/api/ideas/[id]` | Single idea · Update · Delete |
| `GET` | `/api/ideas/trending` | Top 6 trending (`$aggregate` + `$limit`) |
| `POST` | `/api/ideas/[id]/like` | Toggle like |
| `GET / POST` | `/api/comments` | Create comment |
| `GET` | `/api/comments/[ideaId]` | Comments for an idea |
| `PUT / DELETE` | `/api/comments/edit/[id]` | Edit / delete own comment |
| `GET / POST` | `/api/bookmarks` | List / toggle bookmarks |
| `GET` | `/api/interactions` | Ideas the user commented on |
| `PATCH` | `/api/user/profile` | Update profile |

---

<div align="center">

Made with 💜 by **Atahar Shihab**

⭐ Star this repo if you found it helpful!

</div>
