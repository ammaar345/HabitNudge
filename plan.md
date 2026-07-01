# HabitNudge AI — Full Plan

## Core Concept
Proactive AI habit coach. Delivers context-aware nudges to users throughout the day. Manages 5-10 daily habits per user. Focuses on streaks and reward loops.

## Design System
- **Style**: Minimalist, streak-first visuals, dark theme with neon accents
- **Palette**: Background #0A0A0F, Card #16161D, Primary Neon #00FF41, Secondary #6366F1, Danger #EF4444, Text #E2E8F0
- **Typography**: Inter (body), Share Tech Mono (streaks/scores)
- **Layout**: Single screen with bottom nav. Primary habit list fills 80% of screen. Streak ring and score badge at top.
- **Key Component**: Animated ring showing streak progress. Pulses on completion.
- **Animation**: Ring fills with neon glow (300ms ease-out). Streak count counts up on completion. Confetti on milestone (7, 14, 30 days).

## Tech Stack
- React Native (Expo) or Kotlin/Jetpack Compose
- Firebase Auth + Firestore (free tier)
- Haiku 4.5 API for nudge logic
- RevenueCat for subscriptions

## MVP Features (Week 1-2)
1. User auth (Firebase)
2. Habit creation (name, frequency, time)
3. Daily checklist with streak counter
4. AI-generated motivational nudges (Haiku API)
5. Streak visualization (animated ring)
6. Freemium: 3 habits free, unlimited on Pro ($7/mo)

## Wireframe Structure
- **Screen 1 (Habits)**: Vertical list of habits, each with circular checkbox. Tap to complete. Streak badge on each row.
- **Screen 2 (Stats)**: Weekly streak chart. Total streaks. Longest streak.
- **Screen 3 (Settings)**: Push notification times. Account. Upgrade to Pro.

## Revenue Model
- Free: 3 habits, basic stats
- Pro ($7/mo or $49/yr): Unlimited habits, AI nudges, advanced analytics, custom themes
- Target: 500 users → $3,500/mo MRR

## Distribution
- ProductHunt launch
- r/Productivity, r/getdisciplined
- TikTok "day in my habit stack" content
