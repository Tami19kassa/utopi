# Tech Stack

## Runtime & Build
- **Runtime**: Node.js with `tsx` for dev, `esbuild` for production server bundle
- **Frontend build**: Vite 6 + `@vitejs/plugin-react`
- **Language**: TypeScript (~5.8), strict ESNext modules
- **Path alias**: `@/` maps to the workspace root (e.g. `@/src/types`)

## Frontend
- **React 19** with functional components and hooks
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no separate config file)
- **motion/react** (`motion` package) — all animations use this, NOT `framer-motion`
- **GSAP 3** — available for complex timeline animations
- **Lenis** — smooth scroll library
- **Three.js** — available for 3D/WebGL work
- **lucide-react** — icon library

## Backend
- **Express** server (`server.ts`) — serves both the API and Vite middleware in dev
- **Database**: TiDB Cloud Serverless (MySQL-compatible) via `mysql2`, with automatic fallback to a local `local-data.json` file overlay
- Data access layer lives in `src/lib/supabase.ts` (named for legacy reasons — it's actually a REST fetch layer hitting `/api/*` endpoints)

## External Integrations
- **@google/genai** — Gemini AI SDK available
- **@supabase/supabase-js** — installed but effectively unused; all data goes through the custom Express API
- **dotenv** — env vars loaded via `.env` (see `.env.example`)

## Common Commands

```bash
npm run dev       # Start dev server (Express + Vite middleware) on port 3000
npm run build     # Vite build + esbuild server bundle → dist/
npm start         # Run production server from dist/server.cjs
npm run lint      # TypeScript type-check (tsc --noEmit)
npm run clean     # Remove dist/
```

## Environment Variables
See `.env.example`. Key vars:
- `TIDB_HOST`, `TIDB_PORT`, `TIDB_USER`, `TIDB_PASSWORD`, `TIDB_DATABASE` — TiDB Cloud connection
- `GEMINI_API_KEY` — Google Gemini
