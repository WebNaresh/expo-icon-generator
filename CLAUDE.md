# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev        # next dev --port 8888 (Turbopack default in Next.js 16)
bun run build      # next build (postbuild auto-generates sitemap)
bun run lint       # eslint . (not next lint — removed in Next.js 16)
bun run start      # next start
```

Dev server runs on **port 8888**.

## Architecture

Next.js 16 App Router application that generates platform-specific icons for Expo/React Native apps. Users upload an image and receive all required iOS, Android, and web icons. No database — all content is static files or external APIs (GitHub).

### Key Directories

- `app/_components/` — Home page components + co-located hooks (`use-*.ts`) + barrel exports via `index.ts`
- `app/_data/` — Centralized static content (blog posts, tutorials) imported by both index and `[slug]` pages
- `components/ui/` — shadcn/ui primitives only (new-york style, neutral base, lucide icons)
- `components/utils/` — Global layout components (navbar, footer)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Route-Specific Components Convention

Route-specific components go in `app/<route>/_components/`. Global shared components go in `components/`. Custom hooks are co-located with their components.

### Data Flow

- **Server components** (default): Blog, tutorials, contributor pages. Use native `fetch` with `{ next: { revalidate: 3600 } }` for caching.
- **Client components** (`"use client"`): Home page (file upload/drag-drop), FAQ (interactive search), navbar (hydration guard).
- **TanStack Query**: Provider in `app/providers.tsx`. Used for `useMutation` (feedback form). Client data fetching uses plain `useState`/`fetch`.
- **Dynamic route params**: Always `Promise<{ slug: string }>` + `await` (Next.js 16 async params).

### API Routes

All use `NextRequest`/`NextResponse`:

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/generate-icons` | POST | Sharp-based image processing, returns base64 icons |
| `/api/analyze-image-colors` | POST | Sharp color analysis for background suggestions |
| `/api/contributors` | GET | GitHub API with in-memory caching + rate limiting |
| `/api/send-feedback` | POST | Nodemailer email via Gmail |

### Proxy (formerly Middleware)

`proxy.ts` handles: PWA manifest rewrite (`/manifest.json` → `/manifest.webmanifest`), trailing slash redirects (301), canonical URL headers, security headers.

## Styling

- **Tailwind v4** configured in `app/globals.css` (no `tailwind.config.js`)
- **shadcn/ui** with oklch CSS variables for semantic colors (`--primary`, `--secondary`, `--muted`, etc.)
- **Brand color**: Sky blue (`sky-*` classes, `#0ea5e9`)
- **Canonical syntax enforced** by `eslint-plugin-tailwind-canonical-classes`:
  - `h-(--var)` not `h-[var(--var)]`
  - `px` not `[1px]` when shorthand exists

## ESLint

Flat config in `eslint.config.mjs`:
- `eslint-config-next/core-web-vitals` + `/typescript`
- `eslint-plugin-tailwindcss` (validates class names against `globals.css`)
- `eslint-plugin-unused-imports` (errors on unused imports)
- `eslint-plugin-tailwind-canonical-classes` (warns on non-canonical syntax)

Tailwind ESLint settings whitelist all shadcn semantic classes (`bg-primary`, `text-muted-foreground`, etc.).

## Environment Variables

```
NEXT_GMAIL_USER          # Gmail address for feedback emails
NEXT_GMAIL_PASSWORD      # Gmail app password
GITHUB_TOKEN             # Optional: higher GitHub API rate limits
NEXT_PUBLIC_BASE_URL     # Optional: base URL override (defaults to vercel URL)
```

## TypeScript

- `strict: true` with path alias `@/*` → `./`
- Dynamic routes use async params: `params: Promise<{ slug: string }>`
- `notFound()` from `next/navigation` for missing slugs
