# DevConnect — Developer Card Guide

## Card Anatomy

The `DeveloperCard` component (`src/components/developer/DeveloperCard.jsx`) displays a developer profile in a compact, interactive card format.

```
┌─────────────────────────────────────────────┐
│  [badges row]                 [♡ Bookmark]  │
│                               [⭐ Top]      │
│  ┌────┐  Name                               │
│  │ AV │  Job Title  · $85/hr                │
│  └────┘                                     │
│                                             │
│  🟢 Available  │ full-time                   │
│  💼 7 years experience                       │
│  📍 San Francisco, US                        │
│  👍 3 Recommendations                        │
│                                             │
│  Bio text line-clamped to 2 lines...        │
│                                             │
│  React +24  Node.js +18  TypeScript +15     │
│                                             │
│  🔗 Portfolio  🐙 GitHub  🔗 LinkedIn        │
│                                             │
│  ─────────────────────────────────────────  │
│           [ View Profile ]                   │
└─────────────────────────────────────────────┘
```

## Data Props

```js
const developer = {
  id: 1,                          // Unique ID
  slug: "alex-chen",              // URL slug
  name: "Alex Chen",              // Display name
  avatar: "https://...",          // Avatar URL (ui-avatars.com)
  jobTitle: "Full-Stack Developer",
  bio: "...",                     // Short bio
  skills: ["React", "Node.js"],   // Tech skills array
  experienceYears: 7,             // Years of experience
  hourlyRate: 85,                 // $/hr rate
  availabilityType: "full-time",  // full-time, freelance, contract, part-time
  availability: "Available",      // Status text
  location: "San Francisco, US",
  isRecommended: true,            // Shows "Top" badge
  isFeatured: true,               // Appears in featured section
  badges: ["soft-skills", ...],   // Badge slugs
  portfolioUrl: "...",
  githubUrl: "...",
  linkedinUrl: "...",
  recommendations: [...],         // Recommendation objects
  endorsements: {                 // Skill endorsement counts
    "React": 24,
    "Node.js": 18,
  },
};
```

## Badge Icons

| Badge Slug | Icon | Color |
|---|---|---|
| `soft-skills` | Mic | Sky (#0ea5e9) |
| `experience-validated` | Rocket | Emerald (#10b981) |
| `passion-developer` | BatteryFull | Violet (#8b5cf6) |
| `platform-contributor` | UsersRound | Cyan (#06b6d4) |
| `platform-marketer` | BarChart3 | Indigo (#6366f1) |
| `the-founder` | Star | Teal (#14b8a6) |

## Interactive Features

- **Bookmark Button**: Heart icon in top-right. Wired to `AppContext.toggleBookmark()`. Persisted to localStorage.
- **Endorsements**: Top 3 skill endorsements shown as pills with counts.
- **Hover Effects**: Card lifts with subtle shadow, top gradient line fades in, avatar gets primary border glow.
- **Profile Link**: "View Profile" button links to `/developers/:slug`.

## Styling Notes

- Uses `glass` CSS class for frosted glassmorphism effect
- Avatar has a blurred glow behind it on hover
- Availability indicator has a pulsing green dot animation
- Card uses Framer Motion `whileHover` for lift animation on the parent grid
