# Architecture

## Overview

Daily Tech Brief uses a **Next.js App Router** frontend with **Sanity CMS** as the content layer. Content is manually curated via Claude Code skills and published to Sanity, where the website reads it through GROQ queries in Server Components.

## Data Flow

```
Claude Code Skills → Sanity CMS → GROQ Queries → Server Components → React UI → Browser
```

1. `/collect-trend-daily` skill gathers articles from multiple sources
2. `/publish-to-sanity` skill fetches article content, generates AI summaries, and uploads to Sanity
3. Next.js Server Components fetch content via the Sanity client at request time
4. ISR (`revalidate = 60`) ensures content updates within 60 seconds

## Rendering Strategy

| Page | Strategy | Revalidation |
|------|----------|-------------|
| Homepage | ISR | 60s |
| Article detail | ISR (cached per slug) | 60s |
| Digest detail | ISR (cached per date) | 60s |
| Digest index | ISR | 60s |
| Topics index | ISR | 60s |
| Topic detail | ISR | 60s |
| Search | ISR (server) + Client-side search | 60s |
| Sitemap | Dynamic | Per request |
| OG Image | Edge runtime | Cached |

## Key Architectural Decisions

### Sanity as sole data store

No separate application database. Sanity handles all content storage, querying, and media. This keeps the architecture simple and avoids data synchronisation issues.

### Server Components by default

All pages are async Server Components that fetch directly from Sanity. Only the search client and theme toggle use `"use client"` — everything else stays on the server for performance and SEO.

### Safe fetch wrapper

All Sanity fetchers use a `safeFetch` wrapper that returns fallback values (empty arrays, `null`) when the Sanity project is not configured. This allows the app to build and run without a live Sanity backend.

### Topic classification

Articles are classified into one of 8 predefined topics (AI, Startups, Cloud, Security, Web Development, Open Source, Programming, Career). Topics are seeded as Sanity documents and referenced by articles.

## Layout

- Sticky header with navigation and theme toggle
- Centred content containers with `max-w` constraints
- No left sidebar on public pages
- Minimal footer with brand and copyright only

## SEO

- `metadataBase` set in root layout for canonical URL resolution
- Per-page `generateMetadata` with OG tags, Twitter cards, and canonical URLs
- JSON-LD structured data (`Article` for articles, `CollectionPage` for digests/topics)
- Dynamic sitemap with all articles, digests, and topics
- Edge-generated default OG image
- Search page set to `noindex`

## Theming

- Light/dark mode via CSS variables on `:root` and `.dark` class
- Inline script in `<head>` prevents flash of wrong theme
- `ThemeToggle` component reads DOM class directly (no React state)
- `prefers-color-scheme` respected on first visit

## Styling Conventions

- Tailwind CSS with theme tokens via CSS variables
- `cn()` utility (`clsx` + `tailwind-merge`) for conditional classes
- No custom `letter-spacing` or gradients (per baseline-ui constraints)
- `text-balance` on headings, `text-pretty` on body text
- `tabular-nums` on numeric data

## Animation

- CSS transitions only (no JS animation library)
- `Reveal` and `RevealGroup` components for viewport-triggered fade-in + slide-up
- Card hover: `-translate-y-0.5` lift with `shadow-md`
- All animations wrapped in `motion-safe:` for `prefers-reduced-motion` support

## File Conventions

- Components: PascalCase (`ArticleCard.tsx`)
- Utilities/hooks: camelCase (`useInView.ts`)
- Pages: Next.js conventions (`page.tsx`, `layout.tsx`, `not-found.tsx`)
- Sanity schemas: camelCase (`article.ts`, `digest.ts`)
- Types: PascalCase interfaces (`Article`, `Digest`, `Topic`)
