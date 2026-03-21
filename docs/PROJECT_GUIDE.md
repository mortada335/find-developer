# Find Developer — Project Architecture Guide

> **Purpose**: This guide explains every file in the project so you can understand the full codebase
> and replicate these patterns in future projects.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Entry Point Files](#1-entry-point-files)
4. [Routing](#2-routing)
5. [Layout Components](#3-layout-components)
6. [Developer Components](#4-developer-components)
7. [Pages](#5-pages)
8. [Data & Theming](#6-data--theming)
9. [shadcn/ui Components](#7-shadcnui-components)
10. [Key Patterns to Reuse](#key-patterns-to-reuse)

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

**How data flows:**

```
main.jsx → App.jsx → Layout → Navbar + Page + Footer
                                          ↑
                                    routes/index.jsx
                                    (lazy-loaded pages)
```

---

## Folder Structure

```
src/
├── main.jsx                    ← App entry point
├── App.jsx                     ← Route configuration
├── index.css                   ← Global styles + theme variables
│
├── context/theme/              ← Theme (dark/light mode)
│   ├── ThemeProvider.jsx
│   ├── ThemeContext.jsx
│   └── index.js
│
├── routes/
│   └── index.jsx               ← All routes defined here
│
├── components/
│   ├── layout/                 ← Shared layout components
│   │   ├── Layout.jsx          ← Page wrapper (Navbar + content + Footer)
│   │   ├── Navbar.jsx          ← Top navigation bar
│   │   ├── Footer.jsx          ← Bottom footer
│   │   ├── Section.jsx         ← Reusable page section wrapper
│   │   ├── ModeToggle.jsx      ← Dark/light theme switcher
│   │   └── AnnouncementBanners.jsx ← Dismissible info banners
│   │
│   ├── developer/              ← Developer-specific components
│   │   ├── DeveloperCard.jsx   ← Card showing developer info
│   │   ├── FilterPanel.jsx     ← Search & filter controls
│   │   └── BadgeChip.jsx       ← Colored badge with icon
│   │
│   └── ui/                     ← shadcn/ui components (auto-generated)
│       ├── button.jsx
│       ├── card.jsx
│       ├── badge.jsx
│       ├── input.jsx
│       ├── pagination.jsx
│       ├── sheet.jsx           ← Mobile slide-out menu
│       ├── dropdown-menu.jsx
│       └── ...
│
├── pages/                      ← One folder per page
│   ├── home/index.jsx
│   ├── services/index.jsx
│   ├── blogs/index.jsx
│   ├── plans/index.jsx
│   ├── recommended/index.jsx
│   ├── special-needs/index.jsx
│   ├── register/index.jsx
│   ├── login/index.jsx
│   ├── developer-profile/index.jsx
│   ├── about/index.jsx
│   ├── badges/index.jsx
│   ├── charts/index.jsx
│   └── not-found/index.jsx
│
└── data/
    └── mock.js                 ← Fake data (replace with API later)
```

---

## 1. Entry Point Files

### `main.jsx` — The Starting Point

```jsx
// This is the VERY FIRST file that runs when your app loads.
// Think of it as plugging in your app's power cord.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'              // ← Load all CSS first
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './context/theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>                     {/* Catches bugs in development */}
    <BrowserRouter>                {/* Enables URL-based navigation */}
      <ThemeProvider               {/* Makes dark/light mode available everywhere */}
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <App />                    {/* Your actual app */}
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

**Why this order matters:**
1. `BrowserRouter` must wrap everything that uses `<Link>` or `useLocation()`
2. `ThemeProvider` must wrap everything that uses `useTheme()`
3. `App` goes inside both so it has access to routing AND theme

---

### `App.jsx` — Route Setup

```jsx
// App.jsx decides WHICH page to show based on the URL.
// It also wraps all pages in a Layout (Navbar + Footer).

import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { publicRoutes } from "./routes"
import Layout from "./components/layout/Layout"

function App() {
  return (
    <>
      {/* Suspense shows a loading spinner while lazy pages are downloading */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* All pages share the same Layout (Navbar + Footer) */}
          <Route path="/" element={<Layout />}>
            {publicRoutes.map(({ path, element, index }) => (
              <Route key={path} path={path} element={element} index={index} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
```

**Key concept — Nested Routes:**
```
<Route path="/" element={<Layout />}>     ← Layout always renders
  <Route path="/" element={<Home />} />   ← Home renders INSIDE Layout
  <Route path="/services" element={<Services />} />
</Route>
```
The `<Outlet />` inside Layout is where the child page renders.

---

## 2. Routing

### `routes/index.jsx` — Route Definitions

```jsx
import { lazy } from "react";

// lazy() = don't download the page code until user visits it
// This makes the initial app load FAST
const Home = lazy(() => import("@/pages/home"));
const Services = lazy(() => import("@/pages/services"));
// ... more pages

export const publicRoutes = [
  { path: "/", element: <Home />, index: true },  // index = default route
  { path: "/services", element: <Services /> },
  { path: "/developers/:slug", element: <DeveloperProfile /> },
  // :slug = dynamic parameter, e.g. /developers/hussein-ghadhban
  { path: "*", element: <NotFound /> },  // * = catch-all for 404s
];
```

**Pattern to reuse:**
- `lazy()` + `<Suspense>` = code splitting (faster initial load)
- `:slug` = dynamic URL parameters (access with `useParams()`)
- `*` = 404 catch-all (always put LAST)

---

## 3. Layout Components

### `Layout.jsx` — The Page Wrapper

```jsx
// Every page in the app renders INSIDE this component.
// It provides the consistent Navbar → Content → Footer structure.

const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col">  {/* Full viewport height */}
      <Navbar />                                {/* Fixed at top */}
      <AnnouncementBanners />                   {/* Below navbar */}
      <main className="flex-1">                 {/* Stretches to fill space */}
        <div className="container mx-auto w-full px-4">
          <Outlet />                            {/* ← THE PAGE RENDERS HERE */}
        </div>
      </main>
      <Footer />                                {/* Sticks to bottom */}
    </div>
  )
}
```

**Sticky Footer trick:**
- `min-h-dvh` = fill at least the full screen height
- `flex flex-col` = stack children vertically
- `flex-1` on `<main>` = main grows to fill all remaining space
- Result: Footer is always at the bottom, even on short pages

---

### `Navbar.jsx` — Top Navigation

**Key patterns:**
```jsx
// 1. Active link highlighting
const { pathname } = useLocation();
// Compare current URL with link URL:
className={pathname === to ? "text-primary" : "text-muted-foreground"}

// 2. Glassmorphism effect
className="bg-background/80 backdrop-blur-md"
// bg-background/80  = 80% opacity background
// backdrop-blur-md   = blur what's behind it

// 3. Mobile hamburger menu (using shadcn Sheet)
<Sheet>                        {/* Slide-out panel */}
  <SheetTrigger>               {/* Button that opens it */}
    <Menu />                   {/* Hamburger icon */}
  </SheetTrigger>
  <SheetContent side="right">  {/* Panel slides from right */}
    {/* Mobile nav links go here */}
  </SheetContent>
</Sheet>

// 4. Responsive: show/hide
<div className="hidden md:flex">  {/* Hidden on mobile, visible on md+ */}
<Button className="md:hidden">   {/* Visible on mobile, hidden on md+ */}
```

---

### `Footer.jsx` — Bottom Navigation

Simple component with:
- Donation text (Qi Card number)
- Brand logo + GitHub link
- Navigation links (About, Charts, Badges, Plans, Services)
- Copyright text

---

### `Section.jsx` — Page Section Wrapper

```jsx
// Wraps page content with consistent padding and max-width.
// Used by every page for consistent layout.

const Section = ({ children, className }) => (
  <section className={cn(
    "w-full max-w-7xl mx-auto py-4",  // centered, padded
    className
  )}>
    {children}
  </section>
)
```

---

### `ModeToggle.jsx` — Theme Switcher

```jsx
// Dropdown button in the Navbar that lets users pick: Light / Dark / System
// Uses useTheme() from ThemeProvider to change theme

const { setTheme } = useTheme()
// setTheme("dark")   → forces dark mode
// setTheme("light")  → forces light mode
// setTheme("system") → follows OS preference
```

---

### `AnnouncementBanners.jsx` — Dismissible Banners

```jsx
// Two notification banners below the navbar.
// Users can dismiss them with X button. Dismissal is saved to localStorage.

// Pattern: localStorage for persistence
const [dismissed, setDismissed] = useState(() => {
  return localStorage.getItem(`banner-${storageKey}`) === "true";
});

// Pattern: Conditional rendering
if (dismissed) return null; // Don't render if dismissed

// Pattern: Style variants using a map
const styles = {
  info: "bg-emerald-500/10 text-emerald-700",     // Green
  warning: "bg-amber-500/10 text-amber-700",       // Yellow
};
className={styles[type]}  // Pick style based on type prop
```

---

## 4. Developer Components

### `DeveloperCard.jsx` — The Star Component ⭐

This is the most complex component. Here's every technique it uses:

```jsx
// 1. FIXED-HEIGHT CARD with pinned button
<Card className="flex flex-col h-full">
  <CardHeader className="shrink-0">    {/* Fixed: never shrinks */}
  <CardContent className="flex-1">     {/* Grows: fills available space */}
  <CardFooter className="shrink-0 mt-auto">  {/* Pinned to bottom */}
```

**Why this works:**
```
┌────────────────────┐
│ Header (shrink-0)  │  ← Always same height
├────────────────────┤
│                    │
│ Content (flex-1)   │  ← Stretches to fill
│                    │
├────────────────────┤
│ Footer (mt-auto)   │  ← Pushed to bottom
└────────────────────┘
```

```jsx
// 2. BIO TEXT with fixed space (even when empty)
<p className="line-clamp-3 min-h-[3.75rem]">
  {bio || "\u00A0"}   {/* \u00A0 = non-breaking space (keeps height) */}
</p>
// line-clamp-3   = max 3 lines, adds "..." if longer
// min-h-[3.75rem] = always reserves space for 3 lines

// 3. GROUP HOVER — children react to parent hover
<Card className="group ...">
  <div className="group-hover:border-purple-500/50">
    {/* Avatar border glows when CARD is hovered */}
  </div>
</Card>

// 4. TRUNCATE — prevent long names from breaking layout
<CardTitle className="truncate">
  {name}  {/* "Karrar Mohammed Hamid Al-Du..." */}
</CardTitle>

// 5. LINKS row with consistent spacing
<div className="flex items-center gap-2 flex-wrap min-h-[1.25rem]">
  {/* min-h ensures row takes space even if no links */}
  {portfolioUrl && <a>Portfolio</a>}
  {githubUrl && <a>GitHub</a>}
</div>

// 6. CONDITIONAL RENDERING
{phone && (              // Only show phone if developer has one
  <a href={`tel:${phone}`}>
    <Phone /> {phone}
  </a>
)}
```

---

### `FilterPanel.jsx` — Search & Filters

```jsx
// 1. COLLAPSIBLE CARD
const [isOpen, setIsOpen] = useState(false);

<CardHeader onClick={() => setIsOpen(!isOpen)}>  {/* Click to toggle */}
  Filters {isOpen ? <ChevronUp /> : <ChevronDown />}
</CardHeader>
{isOpen && <CardContent>...</CardContent>}        {/* Only show if open */}

// 2. FILTER STATE — lifted up to parent (Home page)
// FilterPanel doesn't OWN the filter state, it receives it as props:
const FilterPanel = ({ filters, onFilterChange }) => {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });  // Notify parent
  };
}

// 3. SKILL TAG TOGGLE
const toggleSkill = (skill) => {
  const current = filters.skills || [];
  const updated = current.includes(skill)
    ? current.filter(s => s !== skill)  // Remove if already selected
    : [...current, skill];              // Add if not selected
  updateFilter("skills", updated);
};

// Styling active vs inactive:
className={isActive
  ? "bg-purple-600 text-white"        // Selected
  : "hover:bg-purple-500/10"          // Not selected
}

// 4. AI PROMPT with clipboard
const handleCopyPrompt = async () => {
  await navigator.clipboard.writeText(aiPrompt);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);  // Reset after 2s
};

// 5. useMemo — recalculate only when filters change
const aiPrompt = useMemo(() => {
  // Build prompt string from current filters
  return `Search for developers on find-developer.com...`;
}, [filters]);  // Only re-runs when filters change
```

---

### `BadgeChip.jsx` — Colored Badge

```jsx
// Maps badge slugs to visual styles

// 1. Data-driven design — styles come from mock.js
const badgeInfo = {
  "soft-skills": {
    label: "Soft Skills",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  // ...
};

// 2. Icon mapping
const badgeIcons = {
  "soft-skills": Heart,
  "experience-validated": CheckCircle,
  "platform-contributor": Star,
  "platform-marketer": Megaphone,
};

// 3. Usage
<Badge variant="outline" className={info.color}>
  <Icon className="h-3 w-3" />
  {info.label}
</Badge>
```

---

## 5. Pages

### `home/index.jsx` — The Main Page

```jsx
// Structure:
// 1. Hero Section     → Gradient title + CTA button
// 2. FilterPanel      → Collapsible search/filters
// 3. Developer Grid   → 3-column responsive grid of DeveloperCards
// 4. Pagination       → Page numbers
// 5. Back to Top      → Scroll button

// KEY PATTERNS:

// A. Client-side filtering with useMemo
const filteredDevelopers = useMemo(() => {
  return mockDevelopers.filter(dev => {
    if (filters.search && !dev.name.toLowerCase().includes(...)) return false;
    if (filters.jobTitle && dev.jobTitle !== filters.jobTitle) return false;
    // ... more filters
    return true;
  });
}, [filters]);  // Re-filters only when filters change

// B. Client-side pagination
const ITEMS_PER_PAGE = 6;
const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
const visible = filtered.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

// C. Reset page when filters change
const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
  setCurrentPage(1);  // Go back to page 1
};

// D. Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 col mobile → 2 cols tablet → 3 cols desktop */}
</div>

// E. Gradient text
<h1 className="bg-gradient-to-r from-purple-600 to-purple-800
  bg-clip-text text-transparent">
  Find Your Perfect Developer
</h1>
// bg-gradient-to-r    = gradient going left → right
// from-/to-           = gradient colors
// bg-clip-text        = clip gradient to text shape
// text-transparent    = make text color see-through (shows gradient)
```

---

### `services/index.jsx` — Services Page

```jsx
// Displays service providers with expandable service details.

// KEY PATTERNS:

// A. Expandable accordion
const [expandedId, setExpandedId] = useState(null);

const toggle = (id) => {
  setExpandedId(expandedId === id ? null : id);  // Toggle open/close
};

{expandedId === service.id && (
  <div>
    {service.features.map(f => <li>{f}</li>)}  {/* Show details */}
  </div>
)}

// B. mailto: links with pre-filled subject
<a href="mailto:email@example.com?subject=Service+Inquiry&body=Hello">
  Contact Us
</a>
```

---

### Page Stubs (Plans, Recommended, etc.)

All remaining pages follow the same simple pattern:

```jsx
import Section from "@/components/layout/Section";

const PageName = () => {
  return (
    <Section>
      <h1 className="text-3xl font-bold">Page Title</h1>
      <p className="text-muted-foreground mt-2">
        Description text.
      </p>
    </Section>
  );
};

export default PageName;
```

These are **stubs** — replace the content with actual UI when you build each page.

---

## 6. Data & Theming

### `data/mock.js` — Fake Data

```jsx
// This file contains ALL the fake data for the app.
// When you connect to a real API later, you replace
// imports from mock.js with API calls.

export const mockDevelopers = [
  {
    id: 1,                          // Unique ID
    slug: "hussein-ghadhban",       // URL-friendly name
    name: "Hussein Ghadhban",       // Display name
    avatar: null,                   // Image URL (null = show placeholder)
    jobTitle: "Full Stack Developer",
    bio: "Long description...",
    skills: ["React", "Laravel"],   // For filtering
    experienceYears: 5,
    expectedSalary: null,           // Hidden on the card
    availabilityType: "full-time",  // For filtering
    location: "Baghdad",            // For filtering
    phone: "0771...",               // Optional
    email: "dev@email.com",         // Optional
    portfolioUrl: "https://...",    // Optional
    githubUrl: "https://...",       // Optional
    linkedinUrl: "https://...",     // Optional
    badges: ["soft-skills", "experience-validated"],
    projects: [],
    recommendations: [],
  },
  // ... more developers
];

export const badgeInfo = {
  "soft-skills": {
    label: "Soft Skills",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  // ... each badge has a label + color scheme
};

export const filterOptions = {
  jobTitles: ["Full Stack Developer", "Backend Developer", ...],
  skills: ["React", "Laravel", "Node.js", ...],
  locations: ["Baghdad", "Basra", ...],
  availabilityTypes: ["full-time", "freelance", ...],
};
```

---

### `context/theme/ThemeProvider.jsx` — Dark/Light Mode

```jsx
// HOW IT WORKS:
// 1. Reads saved theme from localStorage (or uses default "dark")
// 2. Adds "dark" or "light" class to <html> element
// 3. Tailwind's dark: prefix activates based on that class

export default function ThemeProvider({ children, defaultTheme, storageKey }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;  // <html>
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Check OS preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);  // Add "dark" or "light" to <html>
    }
  }, [theme]);

  // Provide theme + setter to all children via React Context
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
```

**How dark mode works in Tailwind:**
```jsx
// In your CSS:
.dark .bg-background { background: #0a0a0a; }
.light .bg-background { background: #ffffff; }

// In your JSX — use dark: prefix:
<div className="bg-white dark:bg-gray-900">
  <p className="text-black dark:text-white">Hello</p>
</div>
```

---

### `index.css` — Global Styles & Theme Variables

```css
/* Tailwind imports */
@import "tailwindcss";

/* Theme variables using CSS custom properties */
:root {
  --background: oklch(1 0 0);      /* Light mode: white */
  --foreground: oklch(0.145 0 0);  /* Light mode: dark text */
  --primary: oklch(0.546 0.245 262.881);  /* Purple */
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);  /* Dark mode: near-black */
  --foreground: oklch(0.985 0 0);  /* Dark mode: white text */
  /* ... dark overrides */
}

/* These variables are used by shadcn/ui components automatically */
/* bg-background → uses --background */
/* text-foreground → uses --foreground */
/* bg-primary → uses --primary */
```

---

## 7. shadcn/ui Components

These are in `components/ui/`. **Don't edit them directly** — they're generated by
`npx shadcn@latest add <component>`. Key ones used:

| Component | What It Does | Used In |
|---|---|---|
| `Button` | Styled button with variants | Everywhere |
| `Card` | Container with header/content/footer | DeveloperCard, FilterPanel |
| `Badge` | Small label/tag | BadgeChip, FilterPanel skills |
| `Input` | Text input field | FilterPanel search |
| `Pagination` | Page navigation | Home page |
| `Sheet` | Slide-out panel | Mobile navbar menu |
| `DropdownMenu` | Popup menu | ModeToggle (theme picker) |

---

## Key Patterns to Reuse

### 1. Fixed-Height Card with Pinned Footer
```jsx
<Card className="flex flex-col h-full">
  <CardHeader className="shrink-0" />   {/* Fixed */}
  <CardContent className="flex-1" />    {/* Grows */}
  <CardFooter className="shrink-0 mt-auto" />  {/* Pinned bottom */}
</Card>
```

### 2. Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 3. Gradient Text
```jsx
<h1 className="bg-gradient-to-r from-purple-600 to-purple-800
  bg-clip-text text-transparent">
```

### 4. Glassmorphism
```jsx
className="bg-background/80 backdrop-blur-md"
```

### 5. Group Hover
```jsx
<div className="group">
  <div className="group-hover:border-purple-500" />
</div>
```

### 6. Color Opacity Tints
```jsx
className="bg-purple-500/10"  // 10% opacity = subtle tint
className="border-purple-500/20"  // 20% opacity border
```

### 7. Lazy-Loaded Routes
```jsx
const Page = lazy(() => import("@/pages/page"));
// Wrap in <Suspense fallback={<Loading />}>
```

### 8. Dark Mode Support
```jsx
className="text-gray-900 dark:text-white bg-white dark:bg-gray-900"
// Or use theme variables: text-foreground bg-background
```

### 9. Conditional Rendering
```jsx
{phone && <PhoneDisplay />}     // Show only if phone exists
{isOpen && <FilterContent />}   // Show only when open
```

### 10. State Lifted to Parent
```jsx
// Parent owns the state:
const [filters, setFilters] = useState({...});
// Child receives and updates via props:
<FilterPanel filters={filters} onFilterChange={setFilters} />
```
