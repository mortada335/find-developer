# DevConnect — Quick Start Cheatsheet

## 🚀 Setup

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build
```

## 📁 Key Files

| File | Purpose |
|---|---|
| `src/data/mock.js` | All dummy data (developers, jobs, blogs, etc.) |
| `src/context/AppContext.jsx` | State management store (bookmarks, jobs, notifications) |
| `src/context/AuthContext.jsx` | Authentication state |
| `src/services/api.js` | Data access service layer |
| `src/routes/index.jsx` | All route definitions |
| `src/index.css` | Global styles and CSS variables |

## 🎨 Theme Colors

| Token | Value | Use |
|---|---|---|
| `primary` | Emerald/Teal | Buttons, links, accents |
| `blue-500` | Blue | Badges, recommendations |
| `violet-500` | Violet | Availability type tags |
| `destructive` | Red | Error states, destructive actions |
| `muted-foreground` | Gray | Secondary text |

## 🧩 Key Components

### Developer Card
```jsx
import DeveloperCard from "@/components/developer/DeveloperCard";
<DeveloperCard developer={devObject} />
```

### Bookmark Button
```jsx
import BookmarkButton from "@/components/developer/BookmarkButton";
<BookmarkButton developerId={dev.id} />
```

### Using State Management
```jsx
import { useApp } from "@/context/AppContext";
const { toggleBookmark, isBookmarked, applyToJob, hasApplied } = useApp();
```

## 🗺️ Routes

| Path | Page |
|---|---|
| `/` | Home (hero, stats, featured, grid) |
| `/jobs` | Job board |
| `/hackathons` | Events |
| `/blogs` | Blog |
| `/testimonials` | Client testimonials |
| `/charts` | Analytics |
| `/badges` | Badge guide |
| `/developers/:slug` | Developer profile |
| `/register` | Sign up |
| `/admin/login` | Sign in |

## 📦 Dependencies

- **React 19** — UI framework
- **react-router-dom** — Client routing
- **framer-motion** — Animations
- **lucide-react** — Icons
- **shadcn/ui** — Component primitives
- **tailwindcss** — Utility CSS

## 💡 Tips

- All state persists to `localStorage` — clear it to reset
- The `api.js` service layer is ready for backend swap — replace function bodies with real API calls
- Framer Motion `<motion.div>` wraps cards/sections for enter animations
- The `.glass` CSS class applies frosted glassmorphism styling
