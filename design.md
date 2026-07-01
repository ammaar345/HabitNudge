# HabitNudge — Design System

## Philosophy
Dark as space. Neon as stars. Streaks are the galaxy you build.
Every completed habit is a spark of light. The longer the streak, the brighter the constellation.

## Style
- **Name**: Dark Neon / HUD
- **Mode**: Dark only. No light mode.
- **Keywords**: Cyberpunk, HUD, streak glow, neon rings, terminal, dark, matrix, sci-fi

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | #050505 | App background, void of space |
| Surface | #0E0E12 | Cards, panels, elevated surfaces |
| Surface Elevated | #1A1A23 | Action sheets, modals, dropdowns |
| Border Subtle | #2A2A35 | Dividers, inactive borders |
| Border Active | #3D3D4D | Hover/focus borders |
| Text Primary | #F0F0F0 | Headlines, primary content |
| Text Secondary | #8B8B99 | Body, descriptions, placeholders |
| Text Muted | #4A4A55 | Disabled, timestamps, metadata |
| Neon Green | #39FF14 | Streak active, completion pulse, success |
| Neon Cyan | #00F0FF | Primary actions, links, active states |
| Neon Pink | #FF007F | Milestones, achievements, celebration |
| Neon Amber | #FFB800 | Warning, streak at risk, urgency |
| Neon Red | #FF3333 | Failure, broken streak, destructive |

## Gradients
- **Streak Ring**: `conic-gradient(#39FF14 0%, #39FF14 var(--percent), #2A2A35 var(--percent), #2A2A35 100%)`
- **Neon Glow**: `0 0 10px #39FF14, 0 0 40px rgba(57,255,20,0.3)`
- **Milestone Burst**: Radial gradient from center with multiple neon colors

## Typography
- **Display/Headlines**: Orbitron (700, 900) — sci-fi, HUD feel
- **Body/UI**: Inter (400, 500, 600) — clean, readable
- **Numbers/Streaks**: JetBrains Mono (400, 700) — monospace for data, counts, timers
- **Scale**:
  - Display: 48px (streak count), 32px (screen titles)
  - Headline: 24px (section titles)
  - Title: 18px (card titles)
  - Body: 16px (description, habit names)
  - Caption: 12px (metadata, timestamps)
  - Mono Large: 64px (giant streak number on ring center)

## Spacing System
- Base unit: 4px
- Card padding: 16px (4 units)
- Card gap: 12px (3 units)
- Section gap: 24px (6 units)
- Screen padding: 16px horizontal, 20px top
- Touch target: 48px minimum

## Components

### Streak Ring (Hero Component)
- **Size**: 240px diameter, centered at top of dashboard
- **Stroke**: 12px wide, rounded caps
- **Track**: #2A2A35 (dimmed)
- **Progress**: Gradient from Neon Green to Neon Cyan
- **Glow**: Box-shadow with neon green blur (10px spread, 40px blur)
- **Center**: Giant streak number in JetBrains Mono 64px, white
- **Label below ring**: "Day Streak" in Text Secondary, 14px
- **Animation**: Progress animates over 600ms with ease-out. Glow pulses every 3s (subtle).

### Habit Card
- **Background**: Surface (#0E0E12)
- **Border**: 1px solid Border Subtle, 8px radius
- **Padding**: 16px
- **Left**: Checkbox (32x32 circle with neon border; fills with neon green + check icon on complete)
- **Center**: Habit name (Body, white), streak badge (small, neon green, "12 day streak")
- **Right**: Emoji or icon for habit category (24px, text color)
- **Tap Effect**: Scale to 0.98, border changes to Neon Cyan, 150ms
- **Swipe Right**: Quick complete (checkbox animates fill)
- **Swipe Left**: Edit / Delete

### Streak Badge
- **Shape**: Pill, 20px height, padding 6px 12px
- **Background**: rgba(57,255,20,0.1) (very subtle green glow)
- **Border**: 1px solid rgba(57,255,20,0.3)
- **Text**: Streak count in JetBrains Mono 12px, Neon Green
- **Icon**: Flame icon (SVG, neon green)

### Completion Pulse
- **Trigger**: Checkbox checked
- **Effect**: Brief neon green ripple emanates from checkbox, travels outward 100px, fades
- **Particle Burst**: Small green/cyan particles spray from checkbox (6-8 particles, 300ms)
- **Haptic**: Confirmation tap

### Milestone Modal
- **Trigger**: Streak hits 7, 14, 30, 60, 100
- **Background**: Blurred dark overlay (rgba(5,5,5,0.9))
- **Content**: Giant neon number animation, "🔥 STREAK MILESTONE 🔥" in Orbitron, share button
- **Confetti**: Neon green/cyan/pink particles falling (canvas overlay, 2s)

### Bottom Navigation
- **Background**: Surface (#0E0E12) with top border (1px, Border Subtle)
- **Height**: 64px + safe area
- **Items** (3):
  1. Habits (flame icon): Active = Neon Cyan, Inactive = Text Muted
  2. Stats (chart icon): Active = Neon Cyan, Inactive = Text Muted
  3. Settings (gear icon): Active = Neon Cyan, Inactive = Text Muted
- **Active Indicator**: Small neon cyan dot below active榴弹

## Animations

### Global
- **Page Transitions**: Fade in, 200ms ease-out
- **List Items**: Stagger entrance, 老舍0ms per item, 300ms duration, slide up from y:20 + fade

### Micro-interactions
- **Checkbox**: Fill scales from center, 200ms spring
- **Streak Ring**: Progress changes animate over 600ms with slight overshoot
- **Button Press**: Scale to 0.95, border brightens, 80ms
- **Toast**: Slides in from top, fades after 3s

### Special Effects
- **Streak Glow**: Active streak ring pulses glow every 3s (opacity 0.6 → 1.0 → 0.6)
- **Milestone Confetti**: Canvas-based neon particle burst on milestone
- **Habit Complete Wave**: When all habits complete for the day, a subtle green wave travels across the screen bottom

## Layouts

### Dashboard Screen
```
[Status Bar]
[Header: "HABITNUDGE" logo in Orbitron, neon cyan, left. Date right.]
[Streak Ring - 240px, centered, margin-top 16px]
[Habit List - full width, padding 16px]
  [Habit Card x N]
[Floating Action Button - bottom right, above nav]
[Bottom Navigation]
```

### Stats Screen
```
[Header: "STATS" in Orbitron]
[Streak Calendar - heat map, green intensity by completion]
[Weekly Chart - bar chart, neon green bars]
[Habit Performance - horizontal bars per habit, completion %]
[Total Completions - big number, JetBrains Mono]
[Bottom Navigation]
```

### Settings Screen
```
[Header: "SETTINGS"]
[Pro Upgrade Banner - neon pink border, "Unlock Unlimited Habits"]
[Account section]
[Notifications toggle]
[Theme (dark only, disabled but visible)]
[About / Help]
[Bottom Navigation]
```

## Accessibility
- All touch targets ≥48px
- Color is not sole indicator (icons + text always)
- Neon colors meet 3:1 minimum on dark backgrounds (tested)
- `prefers-reduced-motion`: Disable confetti, pulse, and wave. Keep ring progress simple.
- Screen reader alt text: "Streak ring, 12 of 12 habits completed, 12 day streak"

## Assets Needed
- Icons: Flame, Chart, Gear, Check, Edit, Delete, Bell, Share (all as custom SVG, 2px stroke, rounded)
- Logo: "HABITNUDGE" text in Orbitron with subtle neon cyan glow
- Empty State: Dark void with a single dimmed star, "Start your constellation"
