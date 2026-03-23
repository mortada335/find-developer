# DevConnect — Project Guide

> **Project Name**: DevConnect (clone of find-developer.com)  
> **Stack**: Vite + React + Tailwind CSS + shadcn/ui + Lucide Icons  
> **Dev Server Port**: 5174 (`npm run dev`)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Pages & Routes](#pages--routes)
4. [Layout Components](#layout-components)
5. [Developer Components](#developer-components)
6. [Data Layer](#data-layer)
7. [Theming System](#theming-system)
8. [shadcn/ui Reference](#shadcnui-reference)
9. [Key Patterns](#key-patterns)
10. [Backend Integration Guide](#backend-integration-guide)

---

## Project Overview

```
Tech Stack:
├── Vite          → Build tool (fast dev server + bundler)
├── React         → UI library
├── React Router  → Client-side page navigation
├── Tailwind CSS  → Utility-first CSS framework
├── shadcn/ui     → Pre-built accessible UI components
└── Lucide React  → Icon library
```

**Data flow:**
```
main.jsx → App.jsx → Layout → Navbar + AnnouncementBanners + Page + Footer
                                          ↑
                                    routes/index.jsx
                                    (lazy-loaded pages)
```

**Authentication Context:** `AuthContext` provides `user`, `isAuthenticated`, and `logout()` to all components.

---

## Folder Structure

```
src/
├── main.jsx                    ← Entry point
├── App.jsx                     ← Route configuration
├── index.css                   ← Global styles + CSS theme variables
│
├── context/
│   ├── AuthContext.jsx         ← Auth state (user, isAuthenticated, logout)
│   └── theme/
│       ├── ThemeProvider.jsx   ← Dark/light mode provider
│       ├── ThemeContext.jsx
│       └── index.js
│
├── routes/
│   └── index.jsx               ← All public routes (lazy-loaded)
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx          ← Wrapper: Navbar + Outlet + Footer
│   │   ├── Navbar.jsx          ← Top nav + bug report banner + mobile sheet
│   │   ├── Footer.jsx          ← Footer with Support Us + Qi card + social icons
│   │   ├── Section.jsx         ← Page section wrapper (full-width, padded)
│   │   ├── HeroSection.jsx     ← Reusable hero with duck emojis + starry bg
│   │   ├── ModeToggle.jsx      ← Dark/light/system theme switcher
│   │   └── AnnouncementBanners.jsx ← Two dismissible banners (Open Source + Email)
│   │
│   ├── developer/
│   │   ├── DeveloperCard.jsx   ← Developer card (badge icons, recommendations, job pill)
│   │   ├── FilterPanel.jsx     ← Collapsible search/filter sidebar
│   │   ├── BadgeChip.jsx       ← Colored badge chip with icon
│   │   └── CompareModal.jsx    ← Side-by-side developer comparison dialog
│   │
│   └── ui/                     ← shadcn/ui (auto-generated, don't edit)
│       ├── button.jsx, card.jsx, badge.jsx, input.jsx
│       ├── dialog.jsx, sheet.jsx, pagination.jsx
│       └── separator.jsx, dropdown-menu.jsx, ...
│
├── pages/
│   ├── home/index.jsx          ← Main developer listing + filters + compare
│   ├── developer-profile/index.jsx ← Two-column profile page
│   ├── blogs/index.jsx         ← Blog post grid with hero
│   ├── badges/index.jsx        ← Badge catalog with toggle descriptions
│   ├── charts/index.jsx        ← Stats charts (bar, line, donut, horizontal bar)
│   ├── hackathons/index.jsx    ← Hackathon cards
│   ├── services/index.jsx      ← Service provider listings
│   ├── register/index.jsx      ← Registration form
│   ├── login/index.jsx         ← Login form
│   ├── profile/index.jsx       ← Authenticated user profile
│   ├── about/index.jsx         ← Privacy policy / about page
│   ├── recommended/index.jsx   ← Recommended developers
│   ├── special-needs/index.jsx ← Special needs page
│   ├── plans/index.jsx         ← Pricing plans
│   └── not-found/index.jsx     ← 404 page
│
└── data/
    └── mock.js                 ← All fake data (replace with API calls for backend)
```

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `home/index.jsx` | Developer listing with search, filters, compare |
| `/developers/:slug` | `developer-profile/index.jsx` | Full developer profile |
| `/blogs` | `blogs/index.jsx` | Blog posts grid |
| `/badges` | `badges/index.jsx` | Badge catalog |
| `/charts` | `charts/index.jsx` | Developer statistics charts |
| `/hackathons` | `hackathons/index.jsx` | Hackathon listings |
| `/services` | `services/index.jsx` | Service provider listings |
| `/register` | `register/index.jsx` | Registration |
| `/admin/login` | `login/index.jsx` | Login |
| `/profile` | `profile/index.jsx` | My profile (authenticated) |
| `/about` | `about/index.jsx` | About / Privacy Policy |
| `*` | `not-found/index.jsx` | 404 catch-all |

---

## Layout Components

### `Layout.jsx`
```jsx
// Wraps every page. Full-width, no container constraint.
<div className="flex min-h-dvh flex-col">
  <Navbar />              {/* Fixed at top (h-14) */}
  <AnnouncementBanners /> {/* Stacked below navbar (mt-[5.5rem]) */}
  <main className="flex-1">
    <Outlet />           {/* Page renders here */}
  </main>
  <Footer />
</div>
```

> ⚠️ **Important**: No `container` wrapper on `<main>`. Each page/Section handles its own padding. This avoids the side-gap problem.

### `Navbar.jsx`
- Brand: **DevConnect** + GitHub icon
- Nav links: Home | Blog | Badges | Hackathons | Charts
- Right: Sign In (text link) | Sign Up (amber outlined button) | Theme toggle
- Mobile: shadcn `Sheet` slide-out from right
- **Bug report banner**: thin bar below navbar (`fixed top-14 z-40`)
- Auth: shows user avatar + logout when `isAuthenticated`

### `Footer.jsx`
- Top row: Brand + nav links (Home, Privacy policy, Blog, Badges, Hackathons, Support, Sign In, Sign Up)
- **Support Us section**: ❤️ icon + description + Qi card number box (`5862997060`)
- Bottom row: copyright + social icons (GitHub, Instagram, LinkedIn, Telegram)

### `Section.jsx`
```jsx
// Full-width, vertically padded section wrapper
<section className="font-roboto flex flex-col w-full h-dvh min-h-full max-h-fit justify-start py-4 px-4">
  {children}
</section>
```
Use `className` prop to override (e.g. `className="h-auto min-h-0"` for content pages).

### `HeroSection.jsx`
```jsx
// Reusable hero used on every page
<HeroSection
  badge="Find developers"          // Label in the pill badge
  title="Find the right developer for your project"
  subtitle="Browse vetted developers..."
/>
```
Features: dot-grid dark background, floating 🦆 duck emojis, amber pill badge, scroll indicator.

### `AnnouncementBanners.jsx`
Two dismissible banners saved to localStorage:
1. **Open Source** (green) — links to GitHub
2. **Important** (amber) — email check reminder

---

## Developer Components

### `DeveloperCard.jsx`
The main card shown in the developer grid.

**Structure:**
```
┌─────────────────────────────────────┐
│  □ (select checkbox)   ⭐Recommended  │  ← amber tag if isRecommended
│  [Badge icons row]                   │  ← colored icon chips per badge
│  ◯ Avatar   Name (link)             │
│             Job Title (bordered pill)│
├─────────────────────────────────────┤
│  ● Available  Freelance  Remote      │  ← availability tags
│  🧳 4 years experience               │
│  📍 Baghdad                          │
│  👍 3 Recommendations (amber)        │
│  Bio text (3 lines max)             │
│  Links: Portfolio | GitHub | LinkedIn│
├─────────────────────────────────────┤
│  [View Full Profile] button          │  ← links to /developers/:slug
└─────────────────────────────────────┘
```

**Key props from `mock.js`:**
```js
{
  id, slug, name, avatar, jobTitle, bio,
  skills, experience, experienceYears,
  availability,     // "Available"
  availabilityType, // "Freelance" / "Full-time" / "Remote"
  location,         // city name
  isRecommended,    // boolean → shows ⭐ tag
  badges,           // array of badge slugs
  recommendations,  // array of recommendation objects
  portfolioUrl, githubUrl, linkedinUrl, email, phone
}
```

### `FilterPanel.jsx`
Collapsible sidebar/card with:
- Search by name/skills
- Job title dropdown
- Skills tags (toggle multi-select)
- Location filter
- Availability type filter
- AI Prompt generator (copy to clipboard)
- Clear all filters button

State is **lifted to parent** (Home page) — FilterPanel only reads/calls `onFilterChange`.

### `BadgeChip.jsx`
Maps badge slugs → colored badges with icons:
```
soft-skills          → blue  mic icon
experience-validated → green rocket icon
passion-developer    → yellow battery icon
platform-contributor → purple users icon
platform-marketer    → pink chart icon
the-founder          → orange star icon
```

### `CompareModal.jsx`
Side-by-side comparison dialog. Opens when 2+ developer checkboxes are selected on home page.

---

## Developer Profile Page

**Route:** `/developers/:slug`

Layout matches find-developer.com:
```
← Back to Search

[Initials Avatar]  Name
                   Job Title
                   [Badge icon chips]

┌─── Stats Bar ───────────────────────────────┐
│ 🧳 4 Years Experience  📍 Baghdad  ● Available  👍 3 Recommendations │
└─────────────────────────────────────────────┘

┌─── Left (2/3) ───────────┐  ┌─── Quick Info Sidebar (1/3) ───┐
│ About section            │  │ Role: Full Stack Developer       │
│ Get In Touch buttons     │  │ Experience: 4 Years              │
│   [Email] [GitHub]       │  │ Location: Baghdad                │
│   [LinkedIn]             │  │ Availability: Available          │
│ Skills & Technologies    │  │                                   │
│   [React] [Laravel] ...  │  │ [Contact Now] (amber)            │
│ Recommendations (N)      │  │ [Login to Chat]                  │
│   quote cards            │  │ [Recommend]                      │
└──────────────────────────┘  └───────────────────────────────────┘
```

Skill tags use **amber background** (`bg-amber-500 text-black`).

---

## Data Layer

### `data/mock.js`
All mock data lives here. When connecting to the Laravel API, replace these imports with API calls.

**Exports:**
```js
export const mockDevelopers = [ ... ]     // Array of developer objects
export const badgeInfo = { ... }          // Slug → { label, color }
export const filterOptions = { ... }      // jobTitles, skills, locations, availabilityTypes
export const mockBlogs = [ ... ]          // Blog post objects
export const mockBadges = [ ... ]         // Badge objects with descriptions
export const mockHackathons = [ ... ]     // Hackathon objects
export const mockChartData = { ... }      // Chart datasets
```

**API Replacement Pattern:**
```jsx
// BEFORE (mock):
import { mockDevelopers } from "@/data/mock";

// AFTER (real API with React Query):
import { useQuery } from "@tanstack/react-query";
const { data, isLoading } = useQuery({
  queryKey: ["developers", filters],
  queryFn: () => fetch(`/api/developers?${new URLSearchParams(filters)}`).then(r => r.json()),
});
```

---

## Theming System

**Dark mode default.** Theme stored in localStorage under `vite-ui-theme`.

```
ThemeProvider adds "dark" or "light" class to <html>
Tailwind's dark: prefix activates based on that class
```

**Color variables** (in `index.css`):
| CSS Variable | Purpose |
|---|---|
| `--background` | Page background |
| `--foreground` | Primary text |
| `--primary` | Brand accent (amber: `#f59e0b`) |
| `--muted-foreground` | Secondary/dimmed text |
| `--card` | Card backgrounds |
| `--border` | Border color |

**Use theme-aware colors:**
```jsx
// ✅ Correct
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
<div className="bg-background">Page bg</div>
<div className="bg-card">Card bg</div>

// ✅ Amber accent (primary)
<button className="bg-amber-500 hover:bg-amber-600 text-black">Click</button>
```

---

## shadcn/ui Reference

| Component | Import | Used In |
|---|---|---|
| `Button` | `@/components/ui/button` | Everywhere |
| `Card, CardHeader, CardContent, CardFooter` | `@/components/ui/card` | DeveloperCard, FilterPanel, Profile |
| `Badge` | `@/components/ui/badge` | BadgeChip, Skills |
| `Input` | `@/components/ui/input` | Search, FilterPanel |
| `Dialog` | `@/components/ui/dialog` | CompareModal |
| `Sheet` | `@/components/ui/sheet` | Mobile Navbar menu |
| `Pagination` | `@/components/ui/pagination` | Home page |
| `DropdownMenu` | `@/components/ui/dropdown-menu` | ModeToggle |
| `Separator` | `@/components/ui/separator` | Profile page |

**Add new component:**
```bash
npx shadcn@latest add <component-name>
```

---

## Key Patterns

### 1. Lazy-loaded Routes
```jsx
const Home = lazy(() => import("@/pages/home"));
// Wrap app in <Suspense fallback={<Spinner />}>
```

### 2. Fixed-Height Card (aligned buttons)
```jsx
<Card className="flex flex-col h-full">
  <CardHeader className="shrink-0" />   {/* Fixed */}
  <CardContent className="flex-1" />    {/* Grows */}
  <CardFooter className="shrink-0 mt-auto" />  {/* Pinned to bottom */}
</Card>
```

### 3. Client-Side Filtering with useMemo
```jsx
const filtered = useMemo(() => {
  return mockDevelopers.filter(dev => {
    if (filters.search && !dev.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.jobTitle && dev.jobTitle !== filters.jobTitle) return false;
    return true;
  });
}, [filters]);
```

### 4. Client-Side Pagination
```jsx
const ITEMS_PER_PAGE = 6;
const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
const visible = filtered.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);
```

### 5. Amber Color Tints
```jsx
bg-amber-500/10    // 10% = very subtle
border-amber-500/30  // subtle border
text-amber-500     // amber text
bg-amber-500 text-black  // solid amber button
```

### 6. Group Hover
```jsx
<Card className="group">
  <div className="group-hover:border-amber-500/50" />
</Card>
```

---

## Backend Integration Guide

### Architecture
```
Frontend (React/Vite)        Backend (Laravel)
port 5174              ←→    port 8000

axios/fetch → /api/developers → DeveloperController → Developer model → MySQL
```

### API Endpoints Needed

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/developers` | List with filters (search, jobTitle, skills, location, availability) |
| `GET` | `/api/developers/{slug}` | Single developer profile |
| `GET` | `/api/badges` | All badges |
| `GET` | `/api/blogs` | Blog posts |
| `GET` | `/api/hackathons` | Hackathon list |
| `GET` | `/api/charts/stats` | Aggregated stats for charts |
| `POST` | `/api/register` | Register new developer |
| `POST` | `/api/login` | Login + return token |
| `POST` | `/api/logout` | Logout (revoke token) |
| `PUT` | `/api/developers/{slug}` | Update developer profile |
| `POST` | `/api/recommendations` | Add recommendation |

### Database Models Needed

```
Developer     → id, slug, name, job_title, bio, avatar, experience_years,
                location, email, github_url, linkedin_url, portfolio_url,
                availability, availability_type, is_recommended, salary,
                created_at, updated_at

developer_skill (pivot) → developer_id, skill_id
developer_badge (pivot) → developer_id, badge_id
Skill         → id, name, slug
Badge         → id, name, slug, description, icon, color
Recommendation → id, developer_id, recommender_name, recommender_title, quote
Blog          → id, title, slug, excerpt, body, featured_image, author_id, published_at
Hackathon     → id, title, slug, description, image, date, location, status
User          → id, name, email, password (standard Laravel)
```

### Frontend Files to Update for API

| File | Change |
|------|--------|
| `data/mock.js` | Remove / keep as fallback |
| `pages/home/index.jsx` | Replace `mockDevelopers` with `useQuery(["developers", filters])` |
| `pages/developer-profile/index.jsx` | Replace `mockDevelopers.find()` with `useQuery(["developer", slug])` |
| `pages/blogs/index.jsx` | Replace `mockBlogs` with `useQuery(["blogs"])` |
| `pages/badges/index.jsx` | Replace `mockBadges` with `useQuery(["badges"])` |
| `pages/charts/index.jsx` | Replace `mockChartData` with `useQuery(["charts/stats"])` |
| `pages/hackathons/index.jsx` | Replace `mockHackathons` with `useQuery(["hackathons"])` |
| `context/AuthContext.jsx` | Connect to `/api/login`, `/api/logout`, store Sanctum token |
