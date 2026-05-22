# IdeaVault — Startup Idea Sharing Platform

**Live Site:** https://b13-a9-ideavault-client-atahar-shih-tau.vercel.app

A modern community platform built with **Next.js 15** where entrepreneurs share, discover, and validate startup ideas through likes, bookmarks, and threaded discussion.

## Features

- **Full CRUD on Ideas & Comments** — Server-side validated, ownership-checked Route Handlers using MongoDB
- **Better Auth Authentication** — Email/password (min 6 + upper + lower validation) **and** Google OAuth, with secure session cookies
- **JWT-secured Private Routes** — Add Idea, My Ideas, My Interactions, Bookmarks, Profile all require a valid session; reload keeps you logged in
- **Smart Trending Algorithm** — MongoDB `$aggregate` ranks ideas by `(likes × 3) + (comments × 2) + recency boost`, returns top 6 via `$limit`
- **Like & Bookmark System** — Heart any idea, save it to your personal bookmarks page
- **Search, Category & Date Filter** — Case-insensitive title search (`$regex`), category dropdown, and date range filter (`$gte` / `$lte`)
- **Dark / Light Theme** — Persisted in localStorage, no flash of unstyled content
- **Fully Responsive** — Mobile, tablet, desktop

## Tech Stack

- **Framework:** Next.js 15 (App Router, JavaScript, RSC)
- **Auth:** Better Auth + MongoDB Adapter
- **Database:** MongoDB (native driver)
- **Styling:** Tailwind CSS v4 + DaisyUI v5
- **UX:** Swiper, react-hot-toast, custom animations

## Run Locally

```bash
npm install
# fill in .env.local
npm run dev
```

Open http://localhost:3000.
