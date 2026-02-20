# DeveloperCard — Deep Dive

> This doc explains every line of the DeveloperCard component so you can
> build similar cards for any future project.

---

## The Problem: Cards with Uneven Heights

When cards in a grid have different amounts of content, they end up
with different heights. Buttons end up at random positions:

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Name     │  │ Name     │  │ Name     │
│ Short bio│  │ Very     │  │ No bio   │
│          │  │ long bio │  │          │
│ [Button] │  │ that goes│  │ [Button] │
└──────────┘  │ on and   │  └──────────┘
              │ on...    │
              │ [Button] │  ← Button is lower!
              └──────────┘
```

## The Solution: Flexbox Fixed Card

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Name     │  │ Name     │  │ Name     │
│ Short bio│  │ Very     │  │ No bio   │
│          │  │ long bio │  │ ‎         │
│ ‎         │  │ that is  │  │ ‎         │
│ ‎         │  │ clamped  │  │ ‎         │
│ [Button] │  │ [Button] │  │ [Button] │
└──────────┘  └──────────┘  └──────────┘
```

All buttons align. Here's how:

---

## The CSS Flexbox Trick

```jsx
// Step 1: Card = flex column that fills its grid cell
<Card className="flex flex-col h-full">

// Step 2: Header = fixed height (never shrinks)
<CardHeader className="shrink-0">

// Step 3: Content = fills all remaining space
<CardContent className="flex-1">

// Step 4: Footer = pinned to bottom
<CardFooter className="shrink-0 mt-auto">
```

### Why Each Class Matters

| Class | What It Does |
|---|---|
| `flex flex-col` | Stack children vertically |
| `h-full` | Card fills entire grid cell height |
| `shrink-0` | This section never shrinks when space is tight |
| `flex-1` | This section GROWS to fill all leftover space |
| `mt-auto` | Push this section to the very bottom |

---

## Handling Missing Content

Some developers have a phone, others don't. Some have a portfolio, others
don't. Without careful handling, this creates uneven card heights.

**Solution: Reserve minimum space**

```jsx
// Bio: always reserves space for 3 lines
<p className="line-clamp-3 min-h-[3.75rem]">
  {bio || "\u00A0"}       {/* Non-breaking space if no bio */}
</p>

// Links row: always reserves one line of height
<div className="min-h-[1.25rem]">
  {portfolioUrl && <a>Portfolio</a>}
  {githubUrl && <a>GitHub</a>}
</div>

// Badges: always reserves badge height
<div className="min-h-[1.5rem]">
  {badges.map(b => <BadgeChip />)}
</div>
```

### Why `min-h-[value]` Works

```
min-h-[3.75rem]  =  minimum height of 3.75rem (60px)
                     This is exactly 3 lines of text-sm
                     Even if bio is empty, the space is reserved
```

---

## Group Hover Pattern

```jsx
// Parent: mark as "group"
<Card className="group">
  // Child: react to group hover
  <div className="group-hover:border-purple-500/50">
    {/* Avatar border glows when ANY part of the card is hovered */}
  </div>
</Card>
```

**Without `group`**: Only the avatar border would glow when hovering the avatar.
**With `group`**: The avatar border glows when hovering ANYWHERE on the card.

---

## Responsive Text: truncate vs line-clamp

```jsx
// truncate = single line, cut with "..."
<CardTitle className="truncate">
  Karrar Mohammed Hamid Al-Dulai...  {/* Cut off */}
</CardTitle>

// line-clamp-3 = max 3 lines, cut with "..."
<p className="line-clamp-3">
  I'm a dedicated backend web
  developer with a passion for
  creating efficient and scalable...  {/* Cut after 3 lines */}
</p>
```

---

## Conditional Fields Pattern

```jsx
// Only show phone if the developer has one:
{phone && (
  <a href={`tel:${phone}`}>
    <Phone /> {phone}
  </a>
)}

// Only show Portfolio link if URL exists:
{portfolioUrl && (
  <a href={portfolioUrl}>
    <Globe /> Portfolio
  </a>
)}
```

**This is called "short-circuit evaluation":**
- `true && <JSX>` → renders JSX
- `false && <JSX>` → renders nothing

---

## Template: Make Your Own Card

```jsx
const MyCard = ({ item }) => {
  return (
    <Card className="flex flex-col h-full group
      overflow-hidden transition-all duration-300
      hover:shadow-lg hover:border-primary/30">

      {/* HEADER — Fixed */}
      <CardHeader className="shrink-0">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-muted" />
          <div className="flex-1 min-w-0">
            <CardTitle className="truncate">{item.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          </div>
        </div>
      </CardHeader>

      {/* CONTENT — Grows */}
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
          {item.description || "\u00A0"}
        </p>
        <div className="flex flex-wrap gap-1.5 min-h-[1.5rem]">
          {item.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </CardContent>

      {/* FOOTER — Pinned to bottom */}
      <CardFooter className="shrink-0 mt-auto">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/items/${item.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
```

Use this template for any card-based layout in future projects.
