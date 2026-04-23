# Content Model

This document describes the Sanity CMS schema for Daily Tech Brief.

## Document Types

### Article

The primary content type. Each article represents an AI-curated summary of a tech news story.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Article title (in English) |
| `slug` | slug | Yes | URL-friendly identifier, auto-generated from title |
| `sourceName` | string | Yes | Original publication name (e.g. "TechCrunch") |
| `sourceUrl` | url | Yes | Link to the original article |
| `publishedAt` | datetime | Yes | Original publication date |
| `updatedAt` | datetime | No | Last update timestamp |
| `summaryShort` | text | Yes | 1-2 sentence TL;DR |
| `summaryLong` | text | Yes | 3-5 paragraph structured summary |
| `whyItMatters` | text | No | 2-3 sentences on significance |
| `keyTakeaways` | string[] | No | 3-5 concise bullet points |
| `tags` | string[] | No | 3-6 keyword tags |
| `topic` | reference (Topic) | Yes | Primary topic classification |
| `thumbnail` | object | No | Thumbnail image (see below) |
| `featured` | boolean | No | Whether this is the featured article of the day |
| `digestDate` | date | Yes | Date of the digest this article belongs to |
| `readingTime` | number | No | Estimated reading time in minutes (default: 3) |

#### Thumbnail Object

| Field | Type | Description |
|-------|------|-------------|
| `mode` | string | `"source"`, `"screenshot"`, or `"none"` |
| `url` | url | Image URL |
| `alt` | string | Alt text |
| `width` | number | Image width |
| `height` | number | Image height |
| `sourceUrl` | url | Original source URL for attribution |

### Digest

Represents a single day's curated tech briefing. Groups articles into a dated edition.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Digest title (typically "Daily Digest") |
| `slug` | slug | Yes | URL identifier (typically the date: `2026-04-21`) |
| `date` | date | Yes | Digest date |
| `intro` | text | No | 1-2 sentence editorial introduction |
| `featuredArticle` | reference (Article) | No | The lead article for this digest |
| `articles` | reference[] (Article) | No | All articles in this digest |
| `topicStats` | object | No | Article counts per topic (see below) |
| `updatedAt` | datetime | No | Last update timestamp |

#### Topic Stats Object

| Field | Type | Description |
|-------|------|-------------|
| `ai` | number | Article count for AI |
| `startups` | number | Article count for Startups |
| `cloud` | number | Article count for Cloud |
| `security` | number | Article count for Security |
| `webDevelopment` | number | Article count for Web Development |
| `openSource` | number | Article count for Open Source |
| `programming` | number | Article count for Programming |
| `career` | number | Article count for Career |

### Topic

Categories for organising articles. Predefined set of 8 topics.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Display name (e.g. "AI", "Web Development") |
| `slug` | slug | Yes | URL identifier (e.g. `ai`, `web-development`) |
| `description` | text | No | Editorial description of the topic |

#### Predefined Topics

| ID | Name | Slug |
|----|------|------|
| `topic-ai` | AI | `ai` |
| `topic-startups` | Startups | `startups` |
| `topic-cloud` | Cloud | `cloud` |
| `topic-security` | Security | `security` |
| `topic-webdev` | Web Development | `web-development` |
| `topic-opensource` | Open Source | `open-source` |
| `topic-programming` | Programming | `programming` |
| `topic-career` | Career | `career` |

## Data Retrieval

Content is fetched via GROQ queries through the `next-sanity` client. Key query patterns:

- **Article projection** includes a dereferenced `topic` and coalesced arrays (`coalesce(keyTakeaways, [])`) to prevent null reference errors
- **Digest projection** includes dereferenced `featuredArticle` and `articles[]` with full article projections
- **Search query** uses GROQ `match` operator with prefix matching (`query*`) across title, summaryShort, summaryLong, and sourceName, limited to 20 results
- **Sitemap queries** use lightweight projections (slug + dates only) to minimise payload

All fetchers use React `cache()` for request deduplication and a `safeFetch` wrapper that returns fallback values when Sanity is not configured.

## Content Publishing

Content is published through Claude Code skills, not through the Sanity Studio UI directly:

1. `/collect-trend-daily` — Gathers articles from Hacker News, Hatena Bookmark, and Reddit
2. `/publish-to-sanity` — Fetches article content, generates English summaries, classifies topic, extracts OG images, and creates Article + Digest documents via the Sanity Mutations API

The seed script (`scripts/seed-sanity.mjs`) can populate topics and test data. It requires the `--allow-production` flag to write to the production dataset.
