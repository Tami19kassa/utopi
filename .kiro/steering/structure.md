# Project Structure

## Root
```
/
├── server.ts          # Express server — API routes + Vite middleware
├── staffData.ts       # Static org chart data (CEO, departments, staff)
├── local-data.json    # Local file DB fallback (media items, socials, hero video)
├── index.html         # Vite entry point
├── vite.config.ts     # Vite config
├── tsconfig.json      # TypeScript config
├── package.json
└── .env.example
```

## Frontend (`src/`)
```
src/
├── main.tsx           # React entry — mounts <App />
├── App.tsx            # Root component: layout, section orchestration, data loading
├── index.css          # Global styles + Tailwind base
├── types.ts           # Shared TypeScript interfaces (Riddle, MediaItem, SocialAccount, etc.)
├── components/        # One file per page section/feature
│   ├── HugeHero.tsx           # Hero section with video background and nav
│   ├── StoryScrollJourney.tsx # Scroll-driven brand story
│   ├── BrandEcosystem.tsx     # Product lineup showcase
│   ├── EnqoqCashDemo.tsx      # Interactive trivia game
│   ├── StaffHierarchy.tsx     # Org chart (uses staffData.ts)
│   ├── MediaHub.tsx           # Blog/vlog feed
│   ├── HugeFooter.tsx         # Footer with nav + socials
│   ├── AdminPanel.tsx         # Internal CMS panel (media, socials, DB config)
│   ├── CookieBanner.tsx       # GDPR cookie consent
│   ├── StudioShowcase.tsx     # Studio section
│   ├── InteractiveYutobiaStage.tsx
│   ├── StaggeredLetterReveal.tsx
│   └── YutobiaLogo.tsx
└── lib/
    └── supabase.ts    # All API fetch functions (despite the name, hits /api/* on Express)
```

## Static Assets
```
public/                # Served as-is by Vite (video files: hero.mp4, back.mp4, etc.)
src/assets/images/     # Imported image assets
```

## Config & Meta
```
.kiro/steering/        # AI steering documents
.env.example           # Environment variable template
tidb-config.json       # TiDB connection config (runtime-generated, gitignored)
```

## Conventions
- All shared types go in `src/types.ts`
- Each page section is a standalone component in `src/components/`
- `App.tsx` owns top-level state (media items, socials, hero video URL) and passes props down
- API calls always go through `src/lib/supabase.ts` — never fetch `/api/*` directly from components
- Static/seed data lives in `staffData.ts` (org chart) and as constants in `server.ts` (media defaults)
- `local-data.json` is the live local DB state — do not commit changes to it
