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

<br/>

### 🌐 [**Visit Live Site**](https://b13-a9-ideavault-client-atahar-shih-tau.vercel.app)

[Live Demo](https://b13-a9-ideavault-client-atahar-shih-tau.vercel.app) &nbsp;•&nbsp; [Server Repository](https://github.com/Atahar-Shihab/B13-A9-ideavault-server_Atahar-Shihab) &nbsp;•&nbsp; [Report Bug](https://github.com/Atahar-Shihab/B13-A9-ideavault-client_Atahar-Shihab/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#️-project-structure)
- [API Reference](#-api-reference)
- [Author](#-author)

---

## 📖 Overview

**IdeaVault** is a full-stack web platform where entrepreneurs and innovators can **share** startup ideas, **discover** trending concepts, and **engage** through likes, bookmarks, and threaded discussion. Rather than booking or scheduling, the platform focuses on **idea validation and community engagement** — helping creators refine their concepts collectively.

Built end-to-end with **Next.js 15 App Router** (frontend **and** backend API routes in a single project), authenticated with **Better Auth**, and powered by **MongoDB Atlas**.

> 🎯 **Built for:** Programming Hero Assignment 9 (CAT_01) — featuring Next.js, Node.js, MongoDB, Better Auth, full CRUD, JWT-style sessions, protected routes, search/filter/sort, and a dark/light theme.

---

## ✨ Key Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Dual Authentication** | Email/password (with strong validation) **and** Google OAuth via Better Auth, with secure session cookies that persist across reloads |
| 💡 | **Full CRUD on Ideas** | Create, read, update (modal), delete (confirmation modal) — 10 detailed fields, all ownership-protected server-side |
| 💬 | **Threaded Comments** | Add, edit, and delete your own comments with author avatars and timestamps |
| 🔥 | **Smart Trending Algorithm** | MongoDB `$aggregate` ranks by `(likes × 3) + (comments × 2) + recency boost`, top 6 via `$limit` |
| ❤️ | **Likes & Bookmarks** | Heart ideas and save favourites to a personal bookmarks page |
| 🔎 | **Search, Filter & Sort** | Case-insensitive title search (`$regex`), category filter, and date-range filter (`$gte` / `$lte`) |
| 🛡️ | **Protected Routes** | Add Idea, My Ideas, My Interactions, Bookmarks & Profile require auth; reload never logs you out |
| 🌗 | **Dark / Light Theme** | One-click global toggle, persisted in localStorage, zero flash on load |
| 📱 | **Fully Responsive** | Pixel-perfect across mobile, tablet, and desktop with a premium animated UI |
| 🔔 | **Toasts Everywhere** | Every CRUD action and interaction shows a toast — no native browser alerts |

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



## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas connection string
- A Google OAuth Client (ID + Secret)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Atahar-Shihab/B13-A9-ideavault-client_Atahar-Shihab.git
cd B13-A9-ideavault-client_Atahar-Shihab

# 2. Install dependencies
npm install

# 3. Create .env.local (see below)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ For production, set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your deployed domain, and add the production callback URL (`/api/auth/callback/google`) in Google Cloud Console.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/                   # Backend Route Handlers (the "server")
│   │   ├── auth/[...all]/      # Better Auth catch-all
│   │   ├── ideas/             # Ideas CRUD + trending + likes
│   │   ├── comments/          # Comments CRUD
│   │   ├── bookmarks/         # Bookmark toggle + list + check
│   │   ├── interactions/      # User's commented ideas
│   │   └── user/profile/      # Profile update
│   ├── ideas/[id]/            # Idea details (private)
│   ├── add-idea/              # Submit idea (private)
│   ├── my-ideas/              # Dashboard with edit/delete modals (private)
│   ├── my-interactions/       # Commented ideas (private)
│   ├── bookmarks/             # Saved ideas (private)
│   ├── profile/               # Profile management (private)
│   ├── login/  •  register/   # Auth pages
│   ├── layout.js              # Root layout + Navbar + Footer
│   ├── page.jsx               # Home page
│   └── not-found.jsx          # Custom 404
├── components/                # Navbar, Footer, IdeaCard, Marquee, PrivateGuard…
└── lib/                       # auth.js, auth-client.js, mongodb.js, session.js
```

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| `*` | `/api/auth/*` | — | Better Auth (login, register, Google, session) |
| `GET` | `/api/ideas` | — | List ideas with search / category / date filters |
| `POST` | `/api/ideas` | ✅ | Create a new idea |
| `GET` | `/api/ideas/trending` | — | Top 6 trending (`$aggregate` + `$limit`) |
| `GET` | `/api/ideas/my` | ✅ | Current user's ideas |
| `GET` | `/api/ideas/[id]` | ✅ | Single idea details |
| `PUT` | `/api/ideas/[id]` | ✅ | Update (author only) |
| `DELETE` | `/api/ideas/[id]` | ✅ | Delete (author only) |
| `POST` | `/api/ideas/[id]/like` | ✅ | Toggle like |
| `POST` | `/api/comments` | ✅ | Add a comment |
| `GET` | `/api/comments/[ideaId]` | — | Get comments for an idea |
| `PUT/DELETE` | `/api/comments/edit/[id]` | ✅ | Edit / delete own comment |
| `GET/POST` | `/api/bookmarks` | ✅ | List / toggle bookmarks |
| `GET` | `/api/bookmarks/check` | ✅ | Bookmarked idea IDs |
| `GET` | `/api/interactions` | ✅ | Ideas the user commented on |
| `PATCH` | `/api/user/profile` | ✅ | Update profile |

---

## 👤 Author

**Atahar Shihab**

[![GitHub](https://img.shields.io/badge/GitHub-Atahar--Shihab-181717?style=flat&logo=github)](https://github.com/Atahar-Shihab)

---

<div align="center">

### Built with 💜 using Next.js, MongoDB & Better Auth

⭐ **Star this repo if you found it helpful!**

</div>
