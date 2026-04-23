# Daily Tech Brief

A curated daily tech news digest with AI-generated summaries, built with Next.js and Sanity CMS.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Base UI |
| CMS | Sanity |
| Fonts | Inter + JetBrains Mono |
| Hosting | Vercel |
| Testing | Vitest (Unit) |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run linter
pnpm lint

# Run type checker
pnpm typecheck

# Run tests
pnpm test
```

## Project Structure

```
daily-tech-brief/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Homepage
│   │   ├── articles/        # Article detail pages
│   │   ├── digest/          # Digest index & detail pages
│   │   ├── topics/          # Topics index & detail pages
│   │   ├── search/          # Search page
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   ├── robots.ts        # Robots.txt
│   │   └── opengraph-image.tsx  # Default OG image
│   ├── components/          # React components
│   │   ├── layout/          # Header, Footer, Container
│   │   ├── article/         # Article cards & placeholders
│   │   ├── digest/          # Digest cards
│   │   └── ui/              # UI primitives
│   ├── lib/                 # Utilities and config
│   │   ├── sanity/          # Sanity client, queries, fetchers
│   │   ├── seo/             # SEO metadata & JSON-LD
│   │   ├── hooks/           # Custom React hooks
│   │   ├── constants/       # Site config
│   │   └── utils/           # Helper functions
│   └── types/               # TypeScript type definitions
├── sanity/                  # Sanity Studio
│   └── schemaTypes/         # Content schemas
├── scripts/                 # Utility scripts
│   └── seed-sanity.mjs      # Seed test data
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md      # Technical architecture
│   ├── CONTENT_MODEL.md     # Sanity CMS schemas
│   └── PLANNING.md          # Product planning
└── public/                  # Static assets
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_EDITOR_TOKEN=your_editor_token
```

## Editorial Workflow

Content is published through a human-in-the-loop workflow using Claude Code skills:

1. **Collect** — Gather trending articles from Hacker News, Hatena Bookmark, and Reddit
2. **Review** — Browse the daily digest and select articles
3. **Publish** — Select URLs to generate summaries and upload to Sanity
4. **Browse** — The website reads published content from Sanity and presents it in an editorial interface

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) — Technical architecture and data flow
- [Content Model](./docs/CONTENT_MODEL.md) — Sanity CMS schema details
- [Planning](./docs/PLANNING.md) — Product planning and design direction
