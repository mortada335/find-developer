# Quickstart Cheatsheet

> Copy-paste recipes for patterns used in this DevConnect project.

---

## 1. Create a New Page

```bash
mkdir -p src/pages/my-page && touch src/pages/my-page/index.jsx
```

```jsx
// src/pages/my-page/index.jsx
import Section from "@/components/layout/Section";
import HeroSection from "@/components/layout/HeroSection";

const MyPage = () => (
  <>
    <HeroSection
      badge="My Page"
      title="Page Title"
      subtitle="Short description here."
    />
    <Section className="h-auto min-h-0">
      <h2 className="text-2xl font-bold">Content</h2>
    </Section>
  </>
);

export default MyPage;
```

```jsx
// src/routes/index.jsx — add:
const MyPage = lazy(() => import("@/pages/my-page"));
{ path: "/my-page", element: <MyPage /> },
```

---

## 2. Color Reference (Amber Theme)

| Class | Use For |
|---|---|
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary/dim text |
| `bg-background` | Page background |
| `bg-card` | Card background |
| `bg-amber-500 text-black` | Primary buttons |
| `text-amber-500` | Accent text / icons |
| `border-amber-500/30` | Subtle amber border |
| `bg-amber-500/10` | Subtle amber background tint |

> ⚠️ Do NOT use purple — the theme has been converted to amber.

---

## 3. Responsive Breakpoints

```jsx
// Mobile-first:
<div className="
  grid
  grid-cols-1        // Mobile: 1 col
  md:grid-cols-2     // Tablet 768px+: 2 cols
  lg:grid-cols-3     // Desktop 1024px+: 3 cols
  gap-4
">

// Show/hide:
<div className="hidden md:flex">  {/* Desktop only */}
<div className="md:hidden">       {/* Mobile only */}
```

---

## 4. Card with Pinned Footer Button

```jsx
<Card className="flex flex-col h-full group hover:shadow-lg hover:border-amber-500/30 transition-all">
  <CardHeader className="shrink-0">
    {/* Fixed height — always same */}
  </CardHeader>
  <CardContent className="flex-1 space-y-3">
    {/* Grows to fill space */}
    <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
      {description || "\u00A0"}
    </p>
  </CardContent>
  <CardFooter className="shrink-0 mt-auto">
    <Button className="w-full">View Details</Button>
  </CardFooter>
</Card>
```

---

## 5. Filter State Pattern (Lifted State)

```jsx
// Parent owns state:
const [filters, setFilters] = useState({ search: "", jobTitle: "" });

const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
  setCurrentPage(1);  // Reset to page 1
};

// Pass to child:
<FilterPanel filters={filters} onFilterChange={handleFilterChange} />

// In FilterPanel:
const FilterPanel = ({ filters, onFilterChange }) => {
  const update = (key, val) => onFilterChange({ ...filters, [key]: val });
};
```

---

## 6. Pagination

```jsx
const ITEMS_PER_PAGE = 6;
const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
const visible = filtered.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);
```

---

## 7. LocalStorage Persistence

```jsx
// Read saved value on init:
const [dismissed, setDismissed] = useState(
  () => localStorage.getItem("my-key") === "true"
);

// Save on change:
const dismiss = () => {
  setDismissed(true);
  localStorage.setItem("my-key", "true");
};
```

---

## 8. Connecting to Laravel API

```jsx
// Install React Query first:
// npm install @tanstack/react-query axios

// Wrap App in QueryClientProvider:
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}><App /></QueryClientProvider>

// In any component:
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const { data: developers, isLoading, isError } = useQuery({
  queryKey: ["developers", filters],
  queryFn: () =>
    axios.get("http://localhost:8000/api/developers", { params: filters })
      .then(res => res.data),
});

if (isLoading) return <p>Loading...</p>;
if (isError) return <p>Error loading data.</p>;
```

**API base URL** — set in `.env`:
```
VITE_API_URL=http://localhost:8000
```

```jsx
// Use in axios:
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
```

---

## 9. Auth Token (Sanctum)

```jsx
// After login, store token:
localStorage.setItem("token", response.data.token);

// Attach to all requests:
axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("token")}`;
```

---

## 10. Project Commands

```bash
npm run dev      # Start dev server → http://localhost:5174
npm run build    # Production build
npm run preview  # Preview production build locally
npx shadcn@latest add <component>  # Add new shadcn/ui component
```
