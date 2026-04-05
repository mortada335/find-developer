# DevConnect — Project Guide

> **Project Name**: DevConnect  
> **Stack**: Vite + React 19 + Tailwind CSS + shadcn/ui + Framer Motion  
> **Status**: Frontend complete with dummy state management (ready for backend integration)

---

## Overview

DevConnect is a **developer talent marketplace** where companies discover, evaluate, and hire pre-vetted engineers. The frontend operates entirely with client-side state management (React Context + `useReducer`) acting as a mock backend, so every feature is fully interactive without any server.

---

## Key Features

### Developer Discovery
- Browse 22+ international developer profiles with avatars, bios, and endorsements
- Advanced filtering by job title, skills, location, and availability
- Compare developers side by side
- Bookmark/favorite developers (persisted in localStorage)
- Featured developer showcase

### Job Board (`/jobs`)
- Browse curated job listings with company info, salary ranges, and tech stack tags
- Apply to jobs (state-managed)
- Save/bookmark job listings
- Filter by job type (Full-time, Contract, Part-time)

### Analytics Dashboard (`/charts`)
- Visual charts for developer distribution by location, availability, job title
- Average salary by experience level

### Hackathons (`/hackathons`)
- Browse upcoming and past hackathon events

### Blog (`/blogs`)
- Tech articles authored by platform developers

### Testimonials (`/testimonials`)
- Client testimonials with ratings

### Authentication
- Registration and login with localStorage-based session
- Profile management

---

## Architecture

### State Management
- **`AppContext`** — Central app store via `useReducer` for bookmarks, job applications, saved jobs, messages, notifications, newsletter subscriptions. Persisted to localStorage.
- **`AuthContext`** — User session management (login, register, logout, profile updates).
- **`api.js`** — Service layer abstracting data access. Currently uses mock data + localStorage; designed for easy swap to real API calls.

### Data Layer (`src/data/mock.js`)
All dummy data lives in a single file:
- `mockDevelopers` — 22 international developer profiles
- `mockJobs` — 6 job listings from fictional companies
- `mockBlogs` — 5 tech articles
- `mockHackathons` — 4 events
- `mockTestimonials` — 4 client testimonials
- `mockServices`, `mockBadgeDetails`, `mockChartData`
- `filterOptions` — Dynamic filter configuration

### Component Structure
```
src/
├── components/
│   ├── developer/
│   │   ├── BookmarkButton.jsx    — Heart bookmark wired to AppContext
│   │   ├── CompareModal.jsx      — Side-by-side comparison
│   │   ├── DeveloperCard.jsx     — Profile card with endorsements
│   │   ├── FilterPanel.jsx       — Advanced filter controls
│   │   └── BadgeChip.jsx         — Badge display chip
│   ├── layout/
│   │   ├── Navbar.jsx            — Floating pill navigation
│   │   ├── Footer.jsx            — Multi-column footer
│   │   ├── HeroSection.jsx       — Animated hero with gradient blobs
│   │   ├── HowItWorksSection.jsx — 3-step guide
│   │   ├── TrustedBySection.jsx  — Company logo bar
│   │   ├── NewsletterSection.jsx — Email signup
│   │   ├── Layout.jsx            — Shell layout
│   │   ├── ModeToggle.jsx        — Dark/light theme
│   │   └── Section.jsx           — Container wrapper
│   └── ui/                       — shadcn/ui primitives
├── context/
│   ├── AppContext.jsx             — App state (bookmarks, jobs, messages)
│   └── AuthContext.jsx            — Auth session
├── data/
│   └── mock.js                    — All dummy data
├── pages/                         — Route pages
├── routes/
│   └── index.jsx                  — Route definitions
└── services/
    └── api.js                     — Data access layer
```

---

## Design System

### Color Palette
- **Primary**: Emerald/Teal (`oklch(0.62 0.16 165)`)
- **Dark background**: Deep slate with blue undertone
- **Accents**: Blue, Violet, Cyan, Rose for badges and status indicators

### Typography
- **Font**: Inter (Google Fonts) — weights 300–700
- **Headings**: Bold/Extrabold, tight tracking
- **Body**: Regular weight, relaxed leading

### Key CSS Utilities
| Class | Purpose |
|---|---|
| `.glass` | Glassmorphism card effect |
| `.background-gradient` | Subtle mesh gradient |
| `.animate-float` | Gentle floating animation |
| `.link-underline` | Animated link underline |

### Animation Library
- **Framer Motion** — Page transitions, card hover effects, layout animations, staggered reveals

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, stats, featured devs, browse grid, how it works, newsletter |
| `/jobs` | Jobs | Job board with apply/save functionality |
| `/hackathons` | Hackathons | Event listings |
| `/blogs` | Blog | Tech articles |
| `/testimonials` | Testimonials | Client feedback |
| `/charts` | Analytics | Data visualizations |
| `/badges` | Badges | Badge system info |
| `/services` | Services | Professional services |
| `/developers/:slug` | Developer Profile | Detailed developer view |
| `/register` | Register | New developer signup |
| `/admin/login` | Login | Authentication |
| `/profile` | Profile | User profile management |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Future Backend Integration

The `api.js` service layer is designed for a clean swap:
1. Replace `delay()` + localStorage calls with `axios`/`fetch` API calls
2. Point to your backend URL via environment variables
3. The Context providers will continue to work — just feed them real API responses
