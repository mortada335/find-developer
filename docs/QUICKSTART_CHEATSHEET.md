# Quickstart Cheatsheet

> Copy-paste recipes for common patterns used in this project.

---

## 1. Create a New Page

```bash
# Step 1: Create the page file
mkdir -p src/pages/my-page
touch src/pages/my-page/index.jsx
```

```jsx
// Step 2: Write the page component
// src/pages/my-page/index.jsx
import Section from "@/components/layout/Section";

const MyPage = () => {
  return (
    <Section>
      <h1 className="text-3xl font-bold">My Page</h1>
      <p className="text-muted-foreground mt-2">Page content here.</p>
    </Section>
  );
};

export default MyPage;
```

```jsx
// Step 3: Add route in src/routes/index.jsx
const MyPage = lazy(() => import("@/pages/my-page"));

// Add to publicRoutes array:
{ path: "/my-page", element: <MyPage /> },
```

---

## 2. Use Dark Mode Colors

```jsx
// ❌ BAD: Hard-coded colors (breaks in dark mode)
<p className="text-gray-800">Hello</p>

// ✅ GOOD: Theme-aware colors
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>

// ✅ GOOD: Manual dark mode override
<p className="text-gray-800 dark:text-gray-200">Hello</p>
```

### Color Reference

| Class | Light | Dark | Use For |
|---|---|---|---|
| `text-foreground` | Black | White | Primary text |
| `text-muted-foreground` | Gray | Light gray | Secondary text |
| `bg-background` | White | Near black | Page background |
| `bg-muted` | Light gray | Dark gray | Subtle backgrounds |
| `bg-card` | White | Dark gray | Card backgrounds |
| `text-primary` | Purple | Purple | Brand/accent text |

---

## 3. Responsive Breakpoints

```jsx
// Mobile-first: write mobile style, then override for larger screens

<div className="
  text-sm            // Mobile: small text
  md:text-base       // Tablet (768px+): normal text
  lg:text-lg         // Desktop (1024px+): large text
">

// Common grid pattern:
<div className="
  grid
  grid-cols-1        // Mobile: 1 column
  md:grid-cols-2     // Tablet: 2 columns
  lg:grid-cols-3     // Desktop: 3 columns
  gap-4
">

// Show/hide by screen size:
<div className="hidden md:flex">   {/* Hidden on mobile */}
<div className="md:hidden">        {/* Hidden on desktop */}
```

---

## 4. Opacity Color Tints

```jsx
// Instead of picking exact colors, use opacity:
bg-purple-500/10    // 10% opacity = very subtle tint
bg-purple-500/20    // 20% opacity = light tint
bg-purple-500/30    // 30% opacity = medium tint
border-purple-500/20 // Subtle border
hover:bg-purple-500/10 // Subtle hover effect

// Great for: badges, hover states, backgrounds, borders
```

---

## 5. Smooth Transitions

```jsx
// Add to any element for smooth changes:
className="transition-all duration-300"

// Specific transitions:
transition-colors     // Only animate color changes
transition-opacity    // Only animate opacity
transition-transform  // Only animate transforms (scale, move)
transition-all        // Animate everything

// Durations:
duration-150   // Fast (buttons)
duration-200   // Normal
duration-300   // Smooth (cards)
duration-500   // Slow (page transitions)
```

---

## 6. Common Icon Sizes

```jsx
// lucide-react icons:
<Icon className="h-3 w-3" />    // Tiny (inside badges)
<Icon className="h-3.5 w-3.5" /> // Small (inline with text)
<Icon className="h-4 w-4" />    // Normal (nav, buttons)
<Icon className="h-5 w-5" />    // Medium (mobile menu)
<Icon className="h-7 w-7" />    // Large (avatar placeholder)
```

---

## 7. State Management Flow

```jsx
// PARENT owns the state:
const [filters, setFilters] = useState({ search: "", jobTitle: "" });

// PARENT passes state + setter to CHILD:
<FilterPanel
  filters={filters}                    // State (read-only for child)
  onFilterChange={(newFilters) => {     // Callback to update state
    setFilters(newFilters);
    setCurrentPage(1);                 // Side effect
  }}
/>

// CHILD reads state from props and calls callback to update:
const FilterPanel = ({ filters, onFilterChange }) => {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };
};
```

---

## 8. Connecting to a Real API (Future)

```jsx
// BEFORE (mock data):
import { mockDevelopers } from "@/data/mock";
const developers = mockDevelopers;

// AFTER (real API with React Query):
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const { data: developers, isLoading } = useQuery({
  queryKey: ["developers", filters],
  queryFn: () => axios.get("/api/developers", { params: filters }),
});

if (isLoading) return <Spinner />;
```

---

## 9. Adding a New shadcn/ui Component

```bash
npx shadcn@latest add dialog    # Adds dialog component
npx shadcn@latest add table     # Adds table component
npx shadcn@latest add tabs      # Adds tabs component
```

Components are added to `src/components/ui/`. Import them:
```jsx
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
```

---

## 10. Project Commands

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
```
