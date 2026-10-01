# Portfolio + Custom CMS — Indigo SaaS Glassmorphism Design System

> **Design direction:** Light-only, professional, modern SaaS, premium glassmorphism.
>
> **Product:** Personal Developer Portfolio + Custom CMS
>
> **Frontend:** React + Vite + Redux Toolkit + Tailwind CSS
>
> **Admin CMS:** React + Vite + Redux Toolkit + Tailwind CSS
>
> **Backend:** Node.js + Express + Prisma
>
> **Database:** PostgreSQL
>
> **Core principle:** The public portfolio should feel like a polished modern SaaS/product website, while the CMS should use the same visual language with stronger emphasis on clarity, speed, data density, and usability.

---

## 1. Design Goals

This project has two interfaces:

1. **Public Portfolio** — brand-focused, visual, editorial, responsive, and polished.
2. **Admin CMS** — functional, structured, efficient, and optimized for CRUD workflows.

Both interfaces must share one visual identity.

### Design characteristics

- Light mode only.
- Indigo as the primary brand color.
- White and cool-slate backgrounds.
- Soft blue/violet gradients used as atmosphere rather than decoration everywhere.
- Glassmorphism used on selected surfaces, not every component.
- High readability and strong text contrast.
- Large, confident typography for portfolio sections.
- Compact and information-dense layouts for the CMS.
- Thin borders and soft shadows instead of heavy borders.
- Medium corner radii; avoid excessive pill-shaped UI.
- Subtle animation only where it improves feedback or hierarchy.
- Mobile-first responsive behavior.

---

# 2. Brand Concept — Indigo SaaS

The visual identity combines:

```text
Modern SaaS
     +
Professional Developer Portfolio
     +
Light Glassmorphism
     +
Editorial Typography
```

The design should feel appropriate for:

- a software engineer portfolio
- a freelancer/developer personal brand
- a small product studio
- a technical consultant
- a modern SaaS company

It should **not** feel like:

- a gaming website
- a neon cyberpunk interface
- a cryptocurrency dashboard
- an excessive glassmorphism experiment
- a generic bootstrap admin panel

---

# 3. Color System

## 3.1 Core Palette

### Brand

| Token | Hex | Purpose |
|---|---:|---|
| `--color-indigo-50` | `#EEF2FF` | Very soft brand background |
| `--color-indigo-100` | `#E0E7FF` | Soft brand surface |
| `--color-indigo-200` | `#C7D2FE` | Soft border / selected surface |
| `--color-indigo-400` | `#818CF8` | Decorative accent |
| `--color-indigo-500` | `#6366F1` | Secondary brand accent |
| `--color-indigo-600` | `#4F46E5` | Primary CTA |
| `--color-indigo-700` | `#4338CA` | Primary hover / active |
| `--color-indigo-800` | `#3730A3` | Strong brand text |

### Neutral

| Token | Hex | Purpose |
|---|---:|---|
| `--color-slate-50` | `#F8FAFC` | Main page background |
| `--color-slate-100` | `#F1F5F9` | Secondary background |
| `--color-slate-200` | `#E2E8F0` | Borders |
| `--color-slate-300` | `#CBD5E1` | Disabled / muted border |
| `--color-slate-400` | `#94A3B8` | Placeholder / muted text |
| `--color-slate-500` | `#64748B` | Secondary text |
| `--color-slate-600` | `#475569` | Body secondary text |
| `--color-slate-700` | `#334155` | Strong secondary text |
| `--color-slate-800` | `#1E293B` | Headings / dense text |
| `--color-slate-900` | `#0F172A` | Primary text |
| `--color-white` | `#FFFFFF` | Main surface |

### Supporting colors

| Token | Hex | Purpose |
|---|---:|---|
| `--color-success` | `#16A34A` | Success |
| `--color-success-soft` | `#DCFCE7` | Success background |
| `--color-warning` | `#D97706` | Warning |
| `--color-warning-soft` | `#FEF3C7` | Warning background |
| `--color-error` | `#DC2626` | Error / destructive |
| `--color-error-soft` | `#FEE2E2` | Error background |
| `--color-info` | `#0284C7` | Informational state |
| `--color-info-soft` | `#E0F2FE` | Information background |

---

# 4. Background System

The application must remain **light mode only**.

## Public Portfolio Background

Use a very light neutral base:

```css
background: #F8FAFC;
```

Add subtle ambient gradients behind major sections:

```text
Top-left:     Indigo 5–8% opacity
Top-right:    Violet 4–6% opacity
Bottom:       Blue 3–5% opacity
```

The gradient must remain subtle enough that text and cards stay dominant.

### Recommended visual stack

```text
Body background
      ↓
Ambient gradient blobs
      ↓
Subtle grid/noise (optional)
      ↓
Glass surface / content
```

Avoid large saturated gradients occupying most of the viewport.

---

# 5. Glassmorphism System

Glassmorphism is an **accent technique**, not the default treatment for everything.

## 5.1 Standard Glass Card

Recommended Tailwind concept:

```text
bg-white/70
backdrop-blur-xl
border border-white/60
shadow-[0_8px_30px_rgba(15,23,42,0.06)]
```

Equivalent design intent:

```css
background: rgba(255, 255, 255, 0.70);
backdrop-filter: blur(18px);
-webkit-backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.60);
```

## 5.2 Strong Glass

Use for hero panels, highlighted project cards, and selected CMS overlays.

```text
bg-white/80
backdrop-blur-2xl
border border-white/70
shadow-[0_16px_45px_rgba(15,23,42,0.08)]
```

## 5.3 Soft Glass

Use for compact metadata, tags, and secondary cards.

```text
bg-white/55
backdrop-blur-lg
border border-white/50
```

## Glass Rules

### Do

- Keep the content readable.
- Use blur against a light gradient or soft background.
- Maintain visible borders.
- Use subtle shadows.
- Combine glass with solid white surfaces for hierarchy.

### Do not

- Apply `backdrop-blur` to every component.
- Use extremely transparent cards.
- Put long dense text on highly transparent backgrounds.
- Stack several transparent cards on top of each other.
- Use saturated rainbow gradients behind text-heavy cards.

---

# 6. Typography

Typography should communicate technical confidence without feeling corporate or sterile.

## Primary Font

Recommended:

```text
Inter
```

Fallback:

```text
ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

## Optional Display Font

A modern geometric display font can be used only for large hero headings if desired.

Keep body/UI typography on the primary sans-serif family.

---

## Type Scale

### Hero

```text
Desktop: 64–80px
Tablet:  48–64px
Mobile:  40–48px
Line-height: 0.95–1.05
Weight: 700–800
Letter-spacing: -0.04em
```

### Page Heading

```text
Desktop: 48–56px
Tablet:  40–48px
Mobile:  32–40px
Weight: 700
Letter-spacing: -0.03em
```

### Section Heading

```text
32–40px
Weight: 700
```

### Card Heading

```text
20–24px
Weight: 600–700
```

### Body

```text
16–18px
Line-height: 1.6–1.75
Color: #475569
```

### Small / Metadata

```text
12–14px
Weight: 500–600
Color: #64748B
```

---

# 7. Typography Rules

Use strong contrast between heading and supporting text.

Example:

```text
FULL STACK
DEVELOPER.

I design and build scalable web applications
using modern frontend, backend and database
technologies.
```

Avoid:

```text
Every word in uppercase.
Excessive letter spacing.
Tiny gray body text.
Long paragraphs with no visual breaks.
```

---

# 8. Spacing System

Use Tailwind spacing consistently.

Preferred base spacing:

```text
4px   → micro
8px   → tight
12px  → compact
16px  → default
24px  → component spacing
32px  → card/section spacing
48px  → major spacing
64px  → large section spacing
96px  → hero/major section spacing
128px → major desktop section separation
```

Public portfolio sections should have generous vertical spacing.

CMS screens should use tighter spacing to improve data density.

---

# 9. Border Radius

Use moderate rounding.

```text
Small controls      8px
Inputs              10px
Buttons             10px
Cards               16px
Large feature cards 20px
Hero glass panel    24px
Modal               20px
```

Avoid turning all buttons/cards into `rounded-full`.

Pills should be reserved for:

- technology tags
- status indicators
- filters
- small metadata

---

# 10. Shadow System

Use soft, cool shadows.

## Shadow XS

```text
shadow-[0_1px_2px_rgba(15,23,42,0.04)]
```

## Shadow SM

```text
shadow-[0_4px_14px_rgba(15,23,42,0.05)]
```

## Shadow MD

```text
shadow-[0_8px_30px_rgba(15,23,42,0.07)]
```

## Shadow LG

```text
shadow-[0_18px_50px_rgba(15,23,42,0.10)]
```

Use the strongest shadow only for floating or featured elements.

---

# 11. Buttons

## Primary Button

```text
bg-indigo-600
text-white
hover:bg-indigo-700
focus:ring-2
focus:ring-indigo-500/30
shadow-sm
```

Visual behavior:

```text
Default → solid indigo
Hover   → slightly darker indigo + small lift
Active  → remove lift
Focus   → visible focus ring
Disabled→ muted surface + reduced contrast
```

## Secondary Button

```text
bg-white
text-slate-700
border border-slate-200
hover:bg-slate-50
```

## Glass Button

For hero secondary actions:

```text
bg-white/65
backdrop-blur-lg
border border-white/70
text-slate-800
hover:bg-white/85
```

## Destructive Button

```text
bg-red-600
text-white
hover:bg-red-700
```

Use destructive actions only when the action is genuinely destructive.

---

# 12. Inputs and Forms

Inputs should look professional and stable rather than heavily glassy.

Recommended:

```text
bg-white
border border-slate-200
rounded-xl
text-slate-900
placeholder:text-slate-400
focus:border-indigo-500
focus:ring-4 focus:ring-indigo-500/10
```

### Input states

```text
Default
Hover
Focus
Disabled
Error
Success
```

Error example:

```text
border-red-300
focus:border-red-500
focus:ring-red-500/10
```

Forms must always provide visible labels.

Do not rely only on placeholder text as a label.

---

# 13. Navigation — Public Website

The navbar should feel lightweight and premium.

## Desktop

```text
┌──────────────────────────────────────────────────┐
│ INDRASISH     About  Skills  Work  Blog  Contact │
│                                                  │
└──────────────────────────────────────────────────┘
```

Recommended treatment:

```text
sticky top-4
mx-auto
max-width: 1200–1280px
bg-white/70
backdrop-blur-xl
border border-white/70
shadow-sm
rounded-2xl
```

Keep the navbar visually separated from the page but not overly prominent.

## Mobile

Use a compact glass header with a clear menu button.

The mobile menu should be a solid/mostly opaque white panel for readability.

---

# 14. Public Hero Section

The hero is the strongest visual area.

## Composition

```text
Left:
    Eyebrow
    Large title
    Supporting text
    Primary CTA
    Secondary CTA

Right:
    Profile image / visual identity
    Soft glass panel
    Decorative gradient / grid
```

Recommended layout:

```text
Desktop:  55% content / 45% visual
Tablet:   1 column or 60/40
Mobile:   1 column
```

### Hero background

Use:

- `bg-slate-50`
- extremely soft indigo glow
- subtle violet glow
- optional fine grid

Never allow the background treatment to compete with the headline.

---

# 15. About Section

Use a clean two-column composition:

```text
┌───────────────────┬─────────────────────────────┐
│                   │                             │
│ Profile / image   │ About content               │
│ glass panel       │ Short introduction          │
│                   │ Full biography              │
│                   │ Key facts                   │
│                   │                             │
└───────────────────┴─────────────────────────────┘
```

Use glass only around the visual/profile surface.

The text area can remain solid to preserve readability.

---

# 16. Skills Section

Skills are CMS-managed content.

Recommended presentation:

```text
Frontend
┌────────┐ ┌────────┐ ┌────────┐
│ React  │ │ Tailwind│ │ Redux │
└────────┘ └────────┘ └────────┘

Backend
┌────────┐ ┌────────┐ ┌────────┐
│ Node   │ │Express │ │Prisma  │
└────────┘ └────────┘ └────────┘
```

Do not use arbitrary progress bars for technical skill levels unless the content model explicitly requires them.

Prefer:

- skill name
- category
- optional level label
- optional icon

---

# 17. Projects Section

Projects are one of the primary portfolio surfaces.

## Card design

```text
┌────────────────────────────────────┐
│                                    │
│          PROJECT IMAGE             │
│                                    │
├────────────────────────────────────┤
│ Featured                           │
│                                    │
│ Project Name                       │
│ Short project description          │
│                                    │
│ React  Node  PostgreSQL  Prisma    │
│                                    │
│ View Project  ↗                    │
└────────────────────────────────────┘
```

### Hover behavior

Use subtle motion:

```text
translate-y: -4px
shadow increase
image scale: 1.02
border: slightly stronger
```

Do not use aggressive 3D rotations or large scaling.

---

# 18. Experience Timeline

Use an understated timeline.

```text
2026 ─────●───── Full Stack Developer
           │
2025 ─────●───── Software Intern
           │
2024 ─────●───── Academic / Project Work
```

The timeline should use indigo for the line/nodes and neutral colors for supporting information.

On mobile, stack entries vertically.

---

# 19. Services Section

Use 3–6 service cards.

Example:

```text
┌─────────────────┐
│ ◇               │
│ Web Development │
│                 │
│ Building modern │
│ web applications │
└─────────────────┘
```

Each card should have:

- icon
- title
- short description
- optional detail link

---

# 20. Testimonials

Use a clean quote-card layout.

```text
┌──────────────────────────────────┐
│ “                                 │
│                                  │
│ Testimonial content...           │
│                                  │
│ Person Name                      │
│ Role / Company                   │
└──────────────────────────────────┘
```

Use a light glass surface with a subtle indigo quote mark.

Do not make testimonials look like social-media posts.

---

# 21. Blog Section

Blog cards should look editorial.

```text
┌────────────────────────────────┐
│            Cover               │
├────────────────────────────────┤
│ Technology                     │
│ Article title                  │
│ Short excerpt                  │
│ 12 Sep 2026 · 5 min read       │
└────────────────────────────────┘
```

The CMS should control:

- title
- slug
- excerpt
- content
- cover image
- status
- publication date
- author

The public website only displays published content.

---

# 22. Contact Section

Use a split design:

```text
┌─────────────────────┬──────────────────────────┐
│ Let's work together │ Name                     │
│                     │ Email                    │
│ Email               │ Subject                  │
│ Social links        │ Message                  │
│ Location             │                          │
│                     │ [ Send Message ]         │
└─────────────────────┴──────────────────────────┘
```

Form fields remain solid white for clarity.

The surrounding section may use a soft indigo gradient.

---

# 23. Footer

Keep the footer minimal.

```text
INDRASISH

About   Work   Blog   Contact

GitHub   LinkedIn   Other

© 2026 Indrasish Biswas
```

Use a slightly darker light background such as:

```text
#F1F5F9
```

rather than dark mode.

---

# 24. CMS Design System

The CMS should feel like a SaaS admin application using the same Indigo identity.

## CMS Layout

```text
┌───────────────┬───────────────────────────────────────┐
│               │                                       │
│ Logo          │ Page heading                          │
│               │ Description                 + Action  │
│ Dashboard     │                                       │
│               │ Filters                               │
│ Content       │ ┌───────────────────────────────────┐ │
│  About        │ │ Table / cards / content           │ │
│  Skills       │ │                                   │ │
│  Projects     │ │                                   │ │
│  Blogs        │ └───────────────────────────────────┘ │
│  Experience   │                                       │
│  Services     │                                       │
│               │                                       │
│ Media         │                                       │
│ Messages      │                                       │
│ Settings      │                                       │
│               │                                       │
│ User          │                                       │
└───────────────┴───────────────────────────────────────┘
```

## CMS Sidebar

Prefer a mostly solid white surface with subtle transparency only when the background supports it.

```text
bg-white/85
backdrop-blur-xl
border-r border-slate-200/80
```

### Active navigation

```text
bg-indigo-50
text-indigo-700
font-medium
```

With a thin indigo indicator:

```text
w-1 bg-indigo-600 rounded-r-full
```

---

# 25. CMS Dashboard

The dashboard should summarize the portfolio system.

Recommended cards:

```text
Projects
Blogs
Skills
Testimonials
Messages
Media
```

Example:

```text
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ Projects       │ │ Blog Posts     │ │ Messages       │
│ 12             │ │ 8              │ │ 5 new          │
│ +2 this month  │ │ 1 draft        │ │ 3 unread       │
└────────────────┘ └────────────────┘ └────────────────┘
```

Dashboard cards should be mostly solid white rather than fully transparent.

Glass can be used selectively on summary cards.

---

# 26. CMS Tables

Tables should prioritize usability over decoration.

```text
┌─────────────────────────────────────────────────────┐
│ Project       Status     Featured    Updated Action │
├─────────────────────────────────────────────────────┤
│ EduVora       Published  Yes         Today   Edit   │
│ FinSight      Draft      No          Sep 28  Edit   │
└─────────────────────────────────────────────────────┘
```

Use:

```text
bg-white
border border-slate-200
rounded-2xl
overflow-hidden
```

Header:

```text
bg-slate-50
text-slate-600
text-xs
font-semibold
uppercase
tracking-wide
```

Do not use transparent glass tables if text becomes difficult to scan.

---

# 27. CMS Forms

All CRUD forms should follow one consistent structure.

```text
Page Header
    ↓
Form Card
    ↓
Field groups
    ↓
Media selector / uploader
    ↓
Status controls
    ↓
Action footer
```

Action footer:

```text
Cancel
Save Draft
Save / Publish
```

Use sticky action bars only for long forms.

---

# 28. Media Library

Use a grid layout.

```text
┌──────────┐ ┌──────────┐ ┌──────────┐
│ image    │ │ image    │ │ image    │
│          │ │          │ │          │
│ filename │ │ filename │ │ filename │
└──────────┘ └──────────┘ └──────────┘
```

Media card metadata:

- thumbnail
- original filename
- type
- size
- uploaded date
- copy/use action
- delete action

Use confirmation dialogs for destructive deletion.

---

# 29. Contact Messages

Use status badges:

```text
New       → indigo/blue
Read      → slate
Replied   → green
Archived  → gray
Spam      → red
```

Message details should use a dedicated readable panel rather than a dense table-only presentation.

---

# 30. Status Badges

Use soft background + strong text.

### Published

```text
bg-green-50 text-green-700 border-green-200
```

### Draft

```text
bg-amber-50 text-amber-700 border-amber-200
```

### Archived

```text
bg-slate-100 text-slate-600 border-slate-200
```

### Error / Spam

```text
bg-red-50 text-red-700 border-red-200
```

### Active

```text
bg-indigo-50 text-indigo-700 border-indigo-200
```

---

# 31. Modals

Modal structure:

```text
┌────────────────────────────────────────┐
│ Title                              ×    │
├────────────────────────────────────────┤
│                                        │
│ Content                                │
│                                        │
├────────────────────────────────────────┤
│                    Cancel    Confirm   │
└────────────────────────────────────────┘
```

Backdrop:

```text
bg-slate-900/20
backdrop-blur-sm
```

Modal:

```text
bg-white/95
backdrop-blur-xl
rounded-2xl
shadow-[0_24px_70px_rgba(15,23,42,0.16)]
```

---

# 32. Toast Notifications

Toast positions:

```text
Desktop → top-right
Mobile  → top-center / top-safe-area
```

Examples:

```text
✓ Project created successfully.
✓ Blog published successfully.
✓ Image uploaded successfully.
```

Error:

```text
✕ Unable to save changes. Please try again.
```

Keep messages short and actionable.

---

# 33. Loading States

Use skeleton loading rather than blank screens wherever possible.

Example:

```text
┌──────────────────────────┐
│ ███████████████          │
│ ██████████               │
│ ███████████████████      │
└──────────────────────────┘
```

Skeleton color:

```text
bg-slate-100
animate-pulse
```

Avoid excessive spinners.

---

# 34. Empty States

Every list-based CMS page needs an empty state.

Example:

```text
          ◇

     No projects yet

Create your first project to
show it on your portfolio.

     [ Create Project ]
```

Empty states should explain the next action.

---

# 35. Error States

Never display raw API/server errors directly to the user.

Preferred:

```text
Something went wrong.
We couldn't load your projects.

[ Try Again ]
```

Developer-facing details belong in logs, not the UI.

---

# 36. Responsive Breakpoints

Use Tailwind's responsive approach.

```text
Mobile       < 640px
Small        640px+
Medium       768px+
Large        1024px+
XL           1280px+
2XL          1536px+
```

## Mobile principles

- Single-column layouts.
- Collapsible navbar.
- Collapsible CMS sidebar.
- Full-width forms.
- Horizontal card scrolling only when justified.
- Tables become stacked cards or horizontally scrollable containers.
- Buttons remain easy to tap.
- Never depend on hover for essential interactions.

---

# 37. Accessibility

The visual design must remain accessible.

## Requirements

- Use semantic HTML.
- Every interactive element needs a visible focus state.
- Maintain sufficient text/background contrast.
- Do not communicate state by color alone.
- Images require meaningful `alt` text when content-bearing.
- Decorative images should use empty alt text.
- Form inputs require labels.
- Buttons must have understandable labels.
- Keyboard navigation must work throughout the CMS.
- Modals must trap focus appropriately.
- Do not remove browser focus indicators without replacement.

Glass effects must never reduce text readability.

---

# 38. Animation System

Animations should communicate state and hierarchy.

## Default duration

```text
Fast:   150ms
Normal: 200ms
Slow:   300ms
```

## Recommended easing

```text
cubic-bezier(0.2, 0.8, 0.2, 1)
```

Use animation for:

- hover states
- menu transitions
- modal entrance
- card elevation
- section reveal
- button feedback
- image hover

Avoid:

- constant floating elements everywhere
- excessive parallax
- spinning decorative objects
- large zoom transitions
- animations that delay interaction

Respect `prefers-reduced-motion`.

---

# 39. Iconography

Recommended library:

```text
lucide-react
```

Icon rules:

- Use consistent stroke weight.
- Default size: 18–20px.
- Button icon: 16–18px.
- Large feature icon: 24–32px.
- Do not mix unrelated icon families.
- Icons support labels; they do not replace important labels unless universally understood.

---

# 40. Image Treatment

Portfolio project images should be visually consistent.

Recommended:

```text
aspect-ratio: 16 / 10
object-cover
rounded-xl / rounded-2xl
```

Use a subtle image overlay only on hover.

Example:

```text
image
  ↓
hover
  ↓
slight scale + subtle indigo overlay
```

Do not permanently apply heavy gradients over project screenshots.

---

# 41. Grid / Decorative Background

The public site may use a very subtle grid.

Recommended visual intensity:

```text
Opacity: 0.03–0.05
Line spacing: 32–48px
```

The grid is decorative only.

It must never interfere with text or form readability.

---

# 42. Gradient System

Primary gradient:

```text
Indigo → Violet
#4F46E5 → #7C3AED
```

Secondary gradient:

```text
Blue → Indigo
#3B82F6 → #4F46E5
```

Soft ambient gradient:

```text
Indigo at very low opacity
→ transparent
```

Use gradients for:

- hero atmosphere
- decorative blobs
- selected CTA backgrounds
- featured project accents
- illustration backgrounds

Do not use gradients on every button/card.

---

# 43. Z-Index Strategy

Keep a simple stacking system.

```text
Base content       0
Decorative         1
Sticky elements    20
Dropdown           30
Overlay            40
Modal              50
Toast              60
Critical overlay   70
```

Avoid arbitrary large z-index values throughout the project.

---

# 44. Content Hierarchy

Every screen should make the following obvious:

```text
1. Where am I?
2. What is this page for?
3. What information matters?
4. What action should I take?
5. What happened after the action?
```

For CMS pages:

```text
Page title
    ↓
Description
    ↓
Primary action
    ↓
Filters/search
    ↓
Content
```

---

# 45. Public Portfolio Content Hierarchy

The public website should follow:

```text
Hero
 ↓
About
 ↓
Skills
 ↓
Featured Projects
 ↓
Experience
 ↓
Services
 ↓
Testimonials
 ↓
Blog
 ↓
Contact
 ↓
Footer
```

Content should come from the custom CMS/API wherever the project model supports dynamic content.

---

# 46. CMS Content Hierarchy

The CMS sidebar should group related functionality:

```text
Dashboard

CONTENT
├── Site Settings
├── About
├── Skills
├── Projects
├── Experience
├── Services
├── Testimonials
├── Blogs
└── Social Links

MEDIA
└── Media Library

COMMUNICATION
└── Contact Messages

SYSTEM
├── Profile
└── Logout
```

This matches the project's custom CMS responsibility for managing portfolio content, media, authentication, and contact messages.

---

# 47. Tailwind Class Philosophy

Prefer reusable components over repeating long class strings.

Bad:

```jsx
<button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl ...">
```

repeated in many files.

Better:

```jsx
<Button variant="primary">
  View Projects
</Button>
```

Centralize recurring styles in reusable components such as:

```text
Button
Input
Textarea
Select
Badge
Card
GlassCard
Modal
Toast
PageHeader
EmptyState
LoadingSkeleton
ConfirmDialog
```

---

# 48. Recommended Shared Component Variants

## Button

```text
primary
secondary
ghost
glass
danger
```

## Card

```text
solid
glass
featured
interactive
```

## Badge

```text
default
success
warning
danger
info
indigo
```

## Input

```text
default
error
success
disabled
```

This keeps the design system consistent across both the portfolio and CMS.

---

# 49. Design Tokens as CSS Variables

Create one centralized token layer so the visual language can be adjusted without changing component logic.

```css
:root {
  --background: #f8fafc;
  --surface: #ffffff;
  --surface-soft: #f1f5f9;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;

  --border: #e2e8f0;
  --border-strong: #cbd5e1;

  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-soft: #eef2ff;

  --accent: #6366f1;
  --accent-soft: #e0e7ff;

  --success: #16a34a;
  --warning: #d97706;
  --error: #dc2626;
  --info: #0284c7;

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
}
```

Keep semantic names in components instead of scattering arbitrary color values throughout the codebase.

---

# 50. Tailwind Utility Patterns

## Glass surface

```text
bg-white/70
backdrop-blur-xl
border border-white/60
shadow-[0_8px_30px_rgba(15,23,42,0.06)]
```

## Solid card

```text
bg-white
border border-slate-200/80
shadow-[0_4px_20px_rgba(15,23,42,0.05)]
```

## Primary CTA

```text
bg-indigo-600
hover:bg-indigo-700
text-white
rounded-xl
shadow-sm
transition-colors
```

## Soft secondary

```text
bg-indigo-50
text-indigo-700
border border-indigo-100
hover:bg-indigo-100
```

## Focus ring

```text
focus:outline-none
focus:ring-4
focus:ring-indigo-500/10
focus:border-indigo-500
```

---

# 51. Page Container

Use a consistent maximum width.

```text
max-w-7xl
mx-auto
px-4 sm:px-6 lg:px-8
```

For very wide editorial content, allow selected hero/project areas to expand up to:

```text
max-w-[1440px]
```

Do not let text paragraphs become excessively wide.

Recommended reading width:

```text
max-w-2xl / max-w-3xl
```

---

# 52. Section Pattern

Every major public section should follow:

```text
section eyebrow
      ↓
section heading
      ↓
short description
      ↓
content grid
      ↓
optional CTA
```

Example:

```text
SELECTED WORK

Projects I've built

A selection of applications and systems...

[ project grid ]
```

---

# 53. Featured Project Pattern

Use one large featured project followed by supporting cards.

```text
┌──────────────────────────────────────────────┐
│                                              │
│          FEATURED PROJECT IMAGE              │
│                                              │
├──────────────────────────────────────────────┤
│ EduVora                                      │
│ Education management platform                │
│                                              │
│ React · Node · PostgreSQL · Prisma            │
│                                              │
│ [ View Case Study ]                          │
└──────────────────────────────────────────────┘

┌───────────────┐ ┌───────────────┐
│ Project       │ │ Project       │
└───────────────┘ └───────────────┘
```

---

# 54. Dashboard Visual Hierarchy

The CMS should prioritize:

```text
Primary action
    ↓
Current data
    ↓
Status
    ↓
Secondary metadata
    ↓
Destructive actions
```

Do not make destructive actions visually equal to the primary save/publish action.

---

# 55. UX Rules for CRUD

Every CRUD page must provide:

```text
List
Search/filter where useful
Create
Read/details where useful
Edit
Delete
Loading
Empty state
Error state
Success feedback
Confirmation for destructive actions
```

After a successful mutation:

```text
Save → toast → update UI → preserve user context
```

Do not unnecessarily redirect users after every small action.

---

# 56. Glassmorphism Limits

For professional consistency, follow this rule:

```text
~70% solid UI
~20% soft glass
~10% decorative effects
```

The glass effect should enhance depth, not become the identity of every element.

Priority should remain:

```text
Content
 >
Usability
 >
Hierarchy
 >
Decoration
```

---

# 57. Do / Don't Summary

## DO

- Light background.
- White surfaces.
- Indigo primary brand.
- Subtle violet/blue gradients.
- Professional typography.
- Medium radius cards.
- Thin borders.
- Soft shadows.
- Controlled glass effects.
- Strong responsive behavior.
- Consistent design tokens.

## DON'T

- Dark mode.
- Neon colors.
- Heavy blur everywhere.
- Rainbow gradients.
- Excessive rounded pills.
- Huge shadows.
- Tiny low-contrast text.
- Animations that slow down workflows.
- Glass tables with unreadable data.
- Inconsistent component styling.

---

# 58. Final Visual Direction

The finished product should communicate:

```text
                 MODERN
                    │
                    ▼
           ┌─────────────────┐
           │  INDIGO SAAS    │
           └────────┬────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     CLEAN       GLASS       PREMIUM
        │           │           │
        └───────────┼───────────┘
                    ▼
             DEVELOPER BRAND
                    │
                    ▼
             CUSTOM CMS
```

The public portfolio should feel like a polished software product landing page.

The CMS should feel like a modern SaaS dashboard.

Both should clearly belong to the same product.

---

# 59. Implementation Priority

Implement the design system in this order:

```text
1. Global colors / CSS variables
2. Typography
3. Container + spacing
4. Buttons
5. Inputs / forms
6. Cards
7. Glass surfaces
8. Badges
9. Navbar
10. CMS sidebar
11. Tables
12. Modals
13. Toasts
14. Loading / empty / error states
15. Public page sections
16. CMS pages
17. Responsive refinements
18. Animation / micro-interactions
```

Do not start by designing individual pages independently.

Build the reusable visual primitives first, then compose pages from them.

---

# 60. Final Design Rule

**The UI must always prioritize content and usability over visual effects.**

Glassmorphism, gradients, shadows, blur, and animation are supporting elements.

The final result should look:

```text
Light
Modern
Professional
Technical
Clean
Premium
Responsive
```

while remaining practical for a real custom CMS with authentication, CRUD operations, media management, blogs, projects, skills, experience, testimonials, services, social links, and contact messages.
