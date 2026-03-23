# DeveloperCard — Deep Dive

> Explains every part of `DeveloperCard.jsx` so you understand how to build complex cards.

---

## Card Layout (Visual)

```
┌─────────────────────────────────────────────┐
│  □ (checkbox)              ⭐ Recommended    │
│  [🎤] [🚀] [🔋]  badge icons                │
│                                               │
│  ◯ Avatar   Name ──────────────────────     │
│             [Full-Stack Developer pill]       │
├─────────────────────────────────────────────┤
│  ● Available   Freelance   Remote            │
│  🧳 4 years experience                       │
│  📍 Baghdad                                  │
│  👍 3 Recommendations  (amber)               │
│                                               │
│  Bio text (max 3 lines)...                   │
│  🌐 Portfolio  🐱 GitHub  💼 LinkedIn        │
├─────────────────────────────────────────────┤
│  [View Full Profile ──────────────────────]  │
└─────────────────────────────────────────────┘
```

---

## The Flexbox Fixed-Height Trick

The card grid needs all cards at the **same height** with the button pinned to the bottom.

```jsx
// Card = flex column that fills its grid cell
<Card className="flex flex-col h-full">
  <CardHeader className="shrink-0">    {/* Never shrinks */}
  <CardContent className="flex-1">     {/* Fills remaining space */}
  <CardFooter className="shrink-0 mt-auto">  {/* Pinned to bottom */}
```

```
┌────────────┐  ┌────────────┐  ┌────────────┐
│ Header     │  │ Header     │  │ Header     │  ← shrink-0
├────────────┤  ├────────────┤  ├────────────┤
│            │  │ Long bio   │  │ No bio     │
│ Short bio  │  │ that takes │  │            │
│            │  │ more space │  │            │  ← flex-1 (fills)
│            │  │            │  │            │
├────────────┤  ├────────────┤  ├────────────┤
│ [Button]   │  │ [Button]   │  │ [Button]   │  ← mt-auto (pinned)
└────────────┘  └────────────┘  └────────────┘
     All buttons align! ✓
```

---

## Handling Empty Content

Reserve space even when data is missing:

```jsx
// Bio: always 3 lines high even if empty
<p className="line-clamp-3 min-h-[3.75rem]">
  {bio || "\u00A0"}  {/* non-breaking space keeps the height */}
</p>

// Links row: always 1 line high even if no links
<div className="flex items-center gap-2 flex-wrap min-h-[1.25rem]">
  {portfolioUrl && <a>Portfolio</a>}
  {githubUrl && <a>GitHub</a>}
</div>
```

---

## Badge Icons Row

```jsx
// Each badge slug maps to a colored icon
const badgeConfig = {
  "soft-skills":          { icon: Mic,        color: "#3b82f6" }, // blue
  "experience-validated": { icon: Rocket,      color: "#22c55e" }, // green
  "passion-developer":    { icon: BatteryFull, color: "#eab308" }, // yellow
  "platform-contributor": { icon: UsersRound,  color: "#a855f7" }, // purple
  "platform-marketer":    { icon: BarChart3,   color: "#ec4899" }, // pink
  "the-founder":          { icon: Star,        color: "#f97316" }, // orange
};

// Render:
{badges.map(slug => {
  const cfg = badgeConfig[slug];
  return (
    <div
      key={slug}
      className="h-7 w-7 rounded-md flex items-center justify-center"
      style={{ backgroundColor: `${cfg.color}20` }}  // 12% opacity bg
    >
      <cfg.icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
    </div>
  );
})}
```

---

## Job Title as Bordered Pill

```jsx
// NOT a plain text — styled as a small bordered badge:
<span className="inline-block text-xs mt-1 px-2 py-0.5 rounded border border-border text-muted-foreground">
  {jobTitle}
</span>
```

---

## Recommendations Count (Amber)

```jsx
{(recommendations.length > 0 || isRecommended) && (
  <span className="inline-flex items-center gap-1.5 text-amber-500">
    <ThumbsUp className="h-3.5 w-3.5" />
    {recommendations.length + (isRecommended ? 1 : 0)} Recommendation(s)
  </span>
)}
```

---

## Group Hover

```jsx
// Parent: add "group" class
<Card className="group hover:shadow-lg hover:border-amber-500/30">
  // Child: react when ANY part of card is hovered
  <div className="group-hover:ring-amber-500/30">
    Avatar
  </div>
</Card>
```

---

## Developer Object Shape

From `data/mock.js`:
```js
{
  id: 1,
  slug: "hussein-ghadhban",        // → /developers/hussein-ghadhban
  name: "Hussein Ghadhban",
  avatar: null,                    // image URL or null
  jobTitle: "Full Stack Developer",
  bio: "bio text...",
  skills: ["React", "Laravel"],
  experience: 4,                   // years (used on card)
  experienceYears: 4,              // years (used on profile)
  availability: "Available",       // green ● tag
  availabilityType: "Freelance",   // availability badge
  location: "Baghdad",
  isRecommended: true,             // shows ⭐ Recommended
  badges: ["soft-skills", "experience-validated"],
  recommendations: [               // shown on profile page
    { quote: "Great dev", recommenderName: "Ali", recommenderTitle: "CTO" }
  ],
  email: "dev@email.com",
  phone: "0771...",
  portfolioUrl: "https://...",
  githubUrl: "https://github.com/...",
  linkedinUrl: "https://linkedin.com/in/...",
}
```

---

## Template: Reusable Card Pattern

```jsx
const MyCard = ({ item }) => (
  <Card className="flex flex-col h-full group hover:shadow-lg hover:border-amber-500/30 transition-all duration-200">
    <CardHeader className="shrink-0">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-amber-500">
          {item.initials}
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="truncate">{item.name}</CardTitle>
          <span className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground">
            {item.role}
          </span>
        </div>
      </div>
    </CardHeader>

    <CardContent className="flex-1 space-y-3">
      <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
        {item.description || "\u00A0"}
      </p>
      <div className="flex flex-wrap gap-1 min-h-[1.25rem]">
        {item.tags?.map(tag => <Badge key={tag}>{tag}</Badge>)}
      </div>
    </CardContent>

    <CardFooter className="shrink-0 mt-auto">
      <Button asChild variant="outline" className="w-full">
        <Link to={`/items/${item.slug}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);
```
