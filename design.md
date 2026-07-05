# HabitNudge — Design Direction (v2)

Last updated: 2026-07-02
Based on sneaky's session direction: sharp/modern, thin elegant icons, matrix rain, futuristic digital feel.

## Philosophy
Matrix rain meets sharp Swiss design. Every interaction should feel like a high-end developer tool from a cyberpunk universe. Nothing feels "whipped up in 5 minutes." The app breathes, has depth, and rewards every tap with tactile feedback.

## Aesthetic Keywords
Matrix rain, futuristic, sharp geometry, thin elegant strokes, faded black gradient, digital glow, 3D depth, immersive, tactile sound feedback.

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#000000` | True black, base void |
| Surface | `#0A0A0A` | Slightly lifted from pure black |
| Surface Elevated | `#111111` | Modals, active states |
| Border | `rgba(255,255,255,0.04)` | Ultra-subtle dividers |
| Border Active | `rgba(57,255,20,0.2)` | Matrix green active borders |
| Text Primary | `#F0F0F0` | Headlines, primary content |
| Text Secondary | `#888888` | Body, descriptions |
| Text Muted | `#555555` | Disabled, metadata |
| Matrix Green | `#39FF14` | Primary accent, rain, streaks |
| Crimson Red | `#FF2D55` | Secondary accent, milestones, alerts |

## Typography
- **Headings/Body**: Satoshi (sharp geometric sans-serif)
  - Weights: 700 (headings), 500 (body), 400 (labels)
  - Sharp letterforms, premium feel, NOT generic Inter
- **Numbers/Mono**: JetBrains Mono (400, 700)
- **Base size**: 16px body. Headings scale with `tracking-tight`.
- **Anti-pattern**: No rounded fonts, no Inter, no serifs on UI

## Icons
- **Style**: Ultra-thin stroke (1px), square linecaps, precise geometry
- **Custom SVGs only** — NO emoji, NO Lucide, NO Heroicons, NO generic
- **Grid**: 16x16 viewBox for nav, 20x20 for inline, consistent alignment
- **Each icon feels "engineered"** — minimal lines, sharp intersections

## Matrix Rain System
- Canvas-based full-screen overlay
- Green characters (katakana + ASCII + numbers) falling in columns
- Default opacity: 0.02-0.05 (atmospheric whisper)
- Intensifies briefly on tab switches (flash to 0.15 for 300ms)
- Perpetual but never distracting

## Sound Effects (Web Audio API)
- All synthetic — no audio files needed
- Tap: quick 800Hz sine click (30ms)
- Toggle: dual-tone ping 600+900Hz (80ms)
- Page switch: rising sweep 300->1200Hz (120ms)
- Volume: low (-15dB), users barely conscious of it

## Navigation (Bottom Tabs)
- Active tab: subtle 3D perspective (rotateX: -5deg, slight translateZ)
- Matrix rain flash overlay on every tab switch
- Active icon: green characters falling within icon bounds
- Slide transitions between screens with direction awareness
- Labels pulse green glow on activation

## Animation Principles
- Spring physics: stiffness 200-400, damping 20-30
- Entrances: staggered fade + slide (never just opacity alone)
- Exits: ~60% of entrance duration
- Micro-interactions: 150-300ms
- Page transitions: 200ms with matrix flash overlay
- Perpetual micro-animations on key elements (pulse, float, shimmer)

## Components

### HabitCard
- Thin 1px border, clean, no heavy card look
- Checkbox: 1px stroke, square corners, sharp checkmark
- Font: Satoshi 500 for habit name, slightly larger
- Streak number springs up on change
- Emoji replaced with thin SVG icons

### StreakRing
- Matrix green gradient ring, sharp linecap
- Number count-up with cubic ease-out
- Subtle pulsing inner glow on active streak
- 88px diameter, stroke width 5

### MilestoneModal
- Matrix rain intensifies behind modal
- Sharp geometric flame icon (no rounded)
- Crimson red accent on milestone badge
- Text stagger entrance (headline -> badge -> button)

### Settings
- Custom thin gear icon (8 teeth, sharp geometry)
- Row dividers: 1px at rgba(255,255,255,0.04)
- Pro banner: faded matrix green + crimson gradient

## Layout Principles
- Left-aligned content hierarchy
- Generous negative space (no cramming)
- Uses `min-h-dvh` not `h-screen`
- Consistent 8px/16px spacing increments
- Max-width: 480px (centered on wider screens)

## Anti-Patterns (Banned)
- Purple/blue gradients (AI slop)
- Round pill shapes used excessively
- Thick/heavy borders (2px+)
- Emoji as icons
- Generic Inter font
- Centered-everything layout
- Loud obnoxious glows
- Cards without borders (muddy hierarchy)

## Accessibility
- All touch targets >= 44px
- Color is never the sole indicator
- Matrix green meets 3:1 on #000000 (validated)
- prefers-reduced-motion: disables matrix rain, confetti, perpetual animations
- Sound effects only on user gesture (no auto-play)
