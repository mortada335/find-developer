# DevConnect — Backend & API Guide

## Current Architecture: Client-Side State Management

DevConnect currently operates with a **client-side mock backend** — all data and state is managed through React Context + `useReducer`, persisted to `localStorage`. This guide documents the service layer architecture designed for an easy swap to a real backend.

---

## Service Layer (`src/services/api.js`)

All data access goes through the `api` object:

```js
import { api } from '@/services/api';

// Auth
const { user, token } = await api.auth.login(email, password);
const { user } = await api.auth.register(formData);
await api.auth.logout();
const user = await api.auth.getUser();
const updatedUser = await api.auth.updateProfile(data);

// Developers
const developers = await api.developers.getAll(filters);
const developer = await api.developers.getBySlug(slug);

// Blogs
const blogs = await api.blogs.getAll();

// Badges
const badges = await api.badges.getAll();

// Charts
const chartData = await api.charts.getData();

// Services
const services = await api.services.getAll();

// Filter Options
const options = await api.filters.getOptions();
```

---

## State Management Layer (`src/context/AppContext.jsx`)

The `AppContext` provides a centralized store for interactive features:

### Available Actions

| Action | Method | Description |
|---|---|---|
| Bookmark | `toggleBookmark(devId)` | Add/remove developer from bookmarks |
| Check Bookmark | `isBookmarked(devId)` | Returns boolean |
| Send Message | `sendMessage(devId, text)` | Store a message to a developer |
| Apply to Job | `applyToJob(jobId)` | Mark job as applied |
| Check Applied | `hasApplied(jobId)` | Returns boolean |
| Save Job | `toggleSaveJob(jobId)` | Bookmark a job listing |
| Check Saved | `isJobSaved(jobId)` | Returns boolean |
| Newsletter | `subscribeNewsletter(email)` | Subscribe to newsletter |
| Notifications | `addNotification(text, type)` | Push notification |
| Clear | `clearNotifications()` | Clear all notifications |

### State Shape

```js
{
  bookmarks: [1, 5, 12],         // Developer IDs
  messages: [{ id, developerId, text, createdAt }],
  notifications: [{ id, type, text, read, createdAt }],
  appliedJobs: [2, 4],           // Job IDs
  savedJobs: [1, 3],             // Job IDs
  newsletter: { subscribed: false, email: "" },
}
```

### Usage

```jsx
import { useApp } from "@/context/AppContext";

const MyComponent = () => {
  const { toggleBookmark, isBookmarked, applyToJob } = useApp();
  // ...
};
```

---

## Auth Flow (`src/context/AuthContext.jsx`)

### Registration
1. User submits form data (name, email, password, jobTitle, etc.)
2. `api.auth.register()` creates user in localStorage
3. Auto-login: token + user stored
4. AuthContext updates, UI reflects authenticated state

### Login
1. User submits email + password
2. `api.auth.login()` validates against localStorage users
3. Token + user stored in localStorage
4. AuthContext updates

### Session Persistence
- On mount, `api.auth.getUser()` checks for existing token in localStorage
- If valid token found, user session is restored
- Logout clears token and user from localStorage

---

## Data Models

### Developer
```typescript
interface Developer {
  id: number;
  slug: string;
  name: string;
  avatar: string | null;
  jobTitle: string;
  bio: string;
  skills: string[];
  experienceYears: number;
  expectedSalary: number | null;
  hourlyRate: number | null;
  availabilityType: "full-time" | "part-time" | "freelance" | "contract";
  availability: string;
  location: string;
  isSpecialNeeds: boolean;
  isRecommended: boolean;
  isFeatured: boolean;
  phone: string | null;
  email: string | null;
  portfolioUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  badges: string[];
  projects: Project[];
  recommendations: Recommendation[];
  endorsements: Record<string, number>;
}
```

### Job
```typescript
interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "Full-time" | "Contract" | "Part-time";
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  skills: string[];
  postedAt: string;
  applicants: number;
}
```

---

## Future Backend Migration

When ready to connect a real backend:

1. **Replace `api.js` internals** — swap localStorage operations with HTTP calls
2. **Keep Context layers** — AppContext and AuthContext remain as-is
3. **Add environment config** — `VITE_API_URL` for base URL
4. **Add auth interceptors** — Attach JWT to all API requests
5. **Replace localStorage persistence** — Use server-side session/token validation

The frontend architecture is designed so that **only `api.js` needs to change** — all components consume data through the same Context hooks.
