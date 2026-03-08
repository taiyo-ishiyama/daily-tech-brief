# Daily Tech Brief — Full Planning Document

## 1. Project Overview

### Project name

Daily Tech Brief

### Product summary

Daily Tech Brief is a premium editorial-style website that publishes curated daily tech news summaries.

The workflow is intentionally human-in-the-loop:

* manually run a Claude skill to collect daily tech articles
* manually review and choose which articles are worth publishing
* manually run another Claude skill to upload selected articles and summaries to Sanity
* the website reads published content from Sanity and presents it in a polished, searchable editorial experience

This is not an automated content farm or a fully automated ingestion pipeline.
It is a curated publishing workflow assisted by AI.

### Core product value

The product should help readers:

* quickly understand important tech news
* scan summaries efficiently
* trust the source attribution
* revisit the site daily for high-signal curated content

### Product positioning

The site should feel like:

* a premium daily tech digest
* a modern digital publication
* a curated editorial briefing with light search/archive functionality

It should not feel like:

* a SaaS dashboard
* a noisy news portal
* a social feed app
* an AI-generated content farm

---

## 2. Product Goals

### Primary goals

* publish daily curated tech article summaries
* present summaries in a premium editorial interface
* make browsing by date, topic, and article easy
* maintain strong trust through source attribution and clarity
* keep MVP architecture simple and maintainable

### Secondary goals

* support long-term SEO growth through article and digest pages
* create a reusable content structure for future scaling
* make future automation possible without needing it now

### Non-goals for MVP

* no full automated scraping-to-publish pipeline
* no user accounts
* no bookmarks/saved articles
* no newsletter system initially
* no recommendation engine
* no personalization
* no heavy analytics/dashboard features
* no complex admin panel outside of Sanity

---

## 3. Workflow / Operating Model

### Editorial workflow

1. Run Claude skill to collect daily tech articles
2. Review and select articles manually
3. Run another Claude skill to upload selected content to Sanity
4. Website reads structured published content from Sanity
5. Readers browse content through homepage, digest pages, article pages, topic pages, and search

### Why this workflow is preferred

This manual workflow is the right MVP choice because it:

* gives editorial quality control
* reduces infrastructure complexity
* avoids publishing low-quality or irrelevant AI-generated summaries
* lowers cost
* keeps the system easy to debug and evolve

### Future flexibility

If manual publishing becomes painful later, the system can evolve toward automation by adding:

* scheduled jobs
* webhook ingestion
* background workers
* automated draft creation

But none of those are required in the first version.

---

## 4. MVP Scope

### In scope

* homepage
* daily digest index page
* daily digest detail page
* article detail page
* topic/category page
* search page
* about page
* Sanity content model
* manually curated publishing workflow
* source attribution and metadata
* responsive UI
* SEO-ready public pages

### Out of scope for now

* user login
* user profiles
* comments
* saved articles
* newsletter automation
* advanced analytics dashboards
* recommendation engine
* custom CMS/admin panel outside Sanity
* full backend database separate from Sanity

---

## 5. UX and Design Direction

### Core design concept

The site should use a:
**dark editorial + premium tech digest** aesthetic.

### Desired visual tone

* modern
* minimal
* calm
* premium
* trustworthy
* typography-led
* structured
* highly readable

### Undesired visual tone

* dashboard-heavy
* over-engineered product UI
* app-shell layouts for public pages
* noisy gradients
* AI-gimmicky visuals
* overly image-heavy layout

### Editorial positioning

The public site should feel closer to:

* a modern digital publication
* a curated newsletter archive
* a premium editorial digest

It should feel less like:

* a SaaS analytics app
* a content recommendation feed
* a social content platform

### Public site layout principles

* slim sticky top header
* centered content layouts
* strong typography hierarchy
* generous whitespace
* clear reading rhythm
* restrained use of accent color
* optional light right sidebar only where helpful
* no permanent left sidebar on public pages

### Content-first principles

The content itself should be the hero.
Design should prioritize:

* title
* source
* date
* summary
* why it matters
* key takeaways
* original article link

Not decorative UI chrome.

---

## 6. Page Architecture

## 6.1 Homepage

### Purpose

The homepage should immediately communicate:

* what the site is
* why it is useful
* what happened today
* where to start reading

### Structure

* sticky top header
* hero section
* featured story/featured insight block
* today’s summaries section
* browse by topic section
* recent digests section
* footer

### Homepage content requirements

#### Header

* site logo/name
* Today
* Digests
* Topics
* Search
* About
* optional theme toggle
* optional CTA like “Read today’s digest”

#### Hero

* site title
* short value proposition
* current date
* updated today time
* number of stories summarized today
* featured topic or signal of the day
* primary CTA: Read today’s digest
* secondary CTA: Browse latest summaries

#### Featured story section

* one prominent featured article
* richer treatment than standard cards
* source name
* summary
* why it matters
* CTA to article page

#### Today’s summaries

* clean list or grid of summary cards
* text-led, not image-heavy
* fast to scan

#### Browse by topic

* topic chips or links

#### Recent digests

* recent daily digest cards

### Homepage goals

* feel like a front page of a publication
* feel current and alive
* support quick scanning
* emphasize daily value

---

## 6.2 Daily Digest Page

### Purpose

Represent a single day’s curated tech briefing.

### Structure

* top header only
* centered title/date/intro
* lightweight stats row
* featured article block
* grouped topic sections
* optional small right sidebar on desktop
* footer

### Content requirements

#### Top section

* page title
* digest date
* short editorial intro
* total article count
* category count
* featured topic
* last updated time

#### Featured article

* title
* source
* summary
* why it matters
* CTA

#### Topic groups

Example groups:

* AI
* Startups
* Cloud
* Security
* Web Development
* Open Source

Each topic section should contain:

* section header
* optional intro line
* article summary cards or compact list items

### Sidebar (optional desktop only)

* jump to topic links
* related digests
* small newsletter placeholder CTA later

### Digest page goals

* feel like a curated publication issue
* not feel like an app workspace
* preserve reading rhythm and structure

---

## 6.3 Article Detail Page

### Purpose

Present one AI-curated article summary as a trustworthy editorial page.

### Structure

* top metadata area
* TL;DR block
* key takeaways
* why it matters
* full AI summary
* original source section
* related articles
* footer

### Content requirements

#### Top metadata

* category/topic chip
* article title
* source publication name
* original article link
* publication date
* optional updated date
* estimated reading time
* AI summary badge
* tags

#### TL;DR block

* short high-level summary

#### Key takeaways

* 3–5 concise bullet points

#### Why it matters

* short editorial explanation of significance

#### Full AI summary

* longer structured summary in paragraphs

#### Original source section

* clear attribution
* prominent external link to original article
* optional source preview metadata

#### Related articles

* 3–4 related summaries by topic/tag

### Article page goals

* strongest trust signal in the system
* excellent readability
* premium editorial feel
* strong source attribution

---

## 6.4 Topic / Category Page

### Purpose

Allow users to browse summaries by category in a publication-like archive.

### Structure

* standard top header
* category title and description
* optional metadata row
* lead story or featured article
* archive grid/list of related content
* footer

### Content requirements

* topic title
* short editorial description
* optional article count
* optional last updated
* featured article for the category
* archive of related summaries
* subtle filters/sort only if useful

### UX rules

This page should feel like a category archive, not a personalized feed.
Avoid patterns like:

* Saved
* Feed
* Following
* recommendation-first behavior

### Topic page goals

* publication archive tone
* clear browsing path
* support discovery without feeling like an app feed

---

## 6.5 Search Page

### Purpose

Help users quickly find relevant summaries.

### Structure

* top header
* large search bar
* subtle filters
* result list
* footer

### Search filters (lightweight)

* topic/category
* source
* date
* tag

### Search result item

* title
* source
* date
* short summary excerpt
* optional highlighted match
* CTA to article page

### Search page goals

* utility-focused
* clean and fast feeling
* visually aligned with editorial brand

---

## 6.6 About Page

### Purpose

Explain what Daily Tech Brief is and build trust.

### Suggested content

* product mission
* how summaries are created
* explanation of AI assistance + human curation
* source attribution philosophy
* contact / future newsletter placeholder

---

## 7. Design System Direction

### Theme

* dark mode default
* subtle indigo or blue accent
* typography-led design
* premium editorial tone

### Layout rules

* centered max-width content containers
* slim sticky header
* strong vertical section spacing
* optional right sidebar only on selected pages
* no left app-shell sidebar for public pages

### Component principles

Use a consistent set of components:

* site header
* footer
* hero section
* section header
* featured story card
* article summary card
* digest card
* topic chip
* metadata row
* source badge
* AI summary badge
* related article card
* search bar

### Card principles

Standard cards should be:

* text-led
* concise
* scannable
* not over-decorated
* not overloaded with tags/badges

Featured content can be richer than standard cards.

### Trust cues

Across the site, clearly surface:

* source name
* original publish date
* AI summary badge
* original source link
* updated date where relevant

---

## 8. Thumbnail / Visual Strategy

### Final strategy

Use this order:

1. original source media
2. top 16:9 screenshot of the article page / hero region
3. no thumbnail

### Why this is the chosen strategy

* preserves trust
* uses real source-derived visuals
* avoids gimmicky AI-generated imagery
* keeps editorial integrity
* supports a premium publication tone

### Important clarification

The screenshot should not be a raw full-page screenshot.
It should be a clean 16:9 capture of the article’s hero/title region or top fold area.

### Thumbnail usage by page type

#### Use thumbnails mainly for:

* homepage featured story
* digest featured story
* topic lead story
* selected related article cards

#### Prefer text-first layout for:

* standard summary cards
* search results
* archive lists where image adds little value

### Fallback behavior

If both source media and screenshot are poor, show no thumbnail and render a text-first card gracefully.

### Thumbnail acceptance rules

#### Accept source media if:

* good quality
* crops well in 16:9
* not overly text-heavy
* not just a logo
* visually clean

#### Accept screenshot if:

* no cookie banner/modal blocks it
* title/hero area is clean
* readable at reduced size
* not cluttered with ads or overlays

#### Otherwise:

* no thumbnail

---

## 9. Content Model

The CMS source of truth will be Sanity.
No separate application database is required for MVP.

## 9.1 Article

Suggested fields:

* title
* slug
* sourceName
* sourceUrl
* publishedAt
* updatedAt (optional)
* summaryShort
* summaryLong
* whyItMatters
* keyTakeaways
* tags
* topic
* thumbnail
* featured (boolean)
* digestDate
* readingTime
* aiSummaryLabel (or fixed badge in UI)

### Article role

The article document is the main public content object for summary pages.

## 9.2 Digest

Suggested fields:

* title
* slug or date route
* date
* intro
* featuredArticle
* articles[]
* topicStats (optional)
* updatedAt

### Digest role

Represents a curated issue/day of content.

## 9.3 Topic

Suggested fields:

* name
* slug
* description
* featuredArticle (optional)

### Topic role

Supports archive/category browsing.

## 9.4 Thumbnail object

Suggested fields:

* mode: source | screenshot | none
* url
* alt
* width
* height
* sourceUrl (optional)

---

## 10. Technical Architecture

## 10.1 Chosen stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* optional light Framer Motion only if needed

### CMS / content layer

* Sanity

### Hosting

* Vercel

### Screenshot fallback

* Playwright

### Search

* simple Sanity query driven search for MVP
* no dedicated search infrastructure initially

### Analytics

* optional Vercel Analytics later

## 10.2 Why this stack is right

This stack is preferred because it is:

* simple
* modern
* maintainable
* well suited for editorial websites
* compatible with structured content
* good for SEO
* fast to implement
* easy to evolve later

## 10.3 What is intentionally not included

Not needed for MVP:

* Supabase
* Prisma
* cron jobs
* queues
* workers
* automated pipelines
* separate admin app
* heavy backend services

---

## 11. Content Publishing Architecture

### Current architecture

Claude collection skill
-> manual article selection
-> Claude upload skill
-> Sanity
-> Next.js public website

### Philosophy

The system is intentionally human-curated.
Automation can come later if needed, but it is not part of version one.

---

## 12. Search Strategy

### MVP search behavior

Keep search simple.
Search over:

* title
* summary
* topic
* tags
* source

### Why simple search is enough now

* limited content volume initially
* manual curation reduces noise
* avoids premature complexity

### Future upgrades if needed

* Typesense
* Algolia
* Meilisearch

But not required at launch.

---

## 13. SEO and Discoverability

### SEO goals

* each article page should be indexable
* each digest page should be indexable
* topic pages should support long-tail discovery

### Requirements

* unique page title for each article
* meta description for articles and digests
* Open Graph metadata
* canonical URLs
* sitemap
* robots.txt
* structured headings
* readable URL slugs

### Content strategy implication

Using individual article pages + digest pages supports stronger SEO than digest-only publishing.

---

## 14. Accessibility and Responsiveness

### Accessibility goals

* readable contrast in dark mode
* keyboard-accessible navigation
* semantic heading structure
* accessible external link labels
* alt text for thumbnails where applicable

### Responsive goals

* strong mobile reading experience
* single-column layout on small screens
* compact but readable metadata on mobile
* no broken layout when no thumbnail is present

---

## 15. Recommended Repo Structure

```txt
Daily-tech-brief/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── articles/
│   │   │   └── [slug]/page.tsx
│   │   ├── digest/
│   │   │   ├── page.tsx
│   │   │   └── [date]/page.tsx
│   │   ├── topics/
│   │   │   └── [slug]/page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── article/
│   │   ├── digest/
│   │   ├── topic/
│   │   └── ui/
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── image.ts
│   │   ├── utils/
│   │   └── constants/
│   ├── types/
│   └── styles/
├── sanity/
│   ├── schemaTypes/
│   │   ├── article.ts
│   │   ├── digest.ts
│   │   ├── topic.ts
│   │   └── index.ts
│   ├── sanity.config.ts
│   └── env.ts
├── public/
├── .env.local
├── package.json
└── README.md
```

---

## 16. Implementation Priorities

## Phase 1 — Foundation

* set up Next.js app
* set up Tailwind + shadcn/ui
* set up Sanity project
* define article, digest, and topic schemas
* connect Sanity content fetching to frontend

## Phase 2 — Core public pages

* homepage
* article detail page
* digest detail page
* topic page
* search page
* about page

## Phase 3 — visual refinement

* implement final dark editorial design system
* polish card states
* polish footer/header consistency
* refine mobile behavior
* ensure no-thumbnail states look intentional

## Phase 4 — thumbnail support

* support source image rendering
* add screenshot fallback support if desired
* validate graceful no-thumbnail rendering

## Phase 5 — SEO and finishing

* metadata
* sitemap
* robots
* OG tags
* performance polish

---

## 17. Risks and Mitigations

### Risk: design drifts back into SaaS/dashboard style

Mitigation:

* use article page as benchmark
* preserve editorial tone
* avoid left-side app shell in public pages
* keep typography and spacing central

### Risk: thumbnails feel inconsistent

Mitigation:

* use only source media or screenshot
* no forced image everywhere
* allow text-first cards

### Risk: manual workflow becomes tedious

Mitigation:

* start manual intentionally
* validate value first
* add automation later only when justified

### Risk: trust concerns around AI-generated summaries

Mitigation:

* strong source attribution
* clear AI summary badge
* clear original article links
* human curation remains part of workflow

---

## 18. Product Principles to Preserve

1. Curated over automated
2. Trust over novelty
3. Readability over decoration
4. Editorial calm over dashboard density
5. Signal over volume
6. Consistency over feature sprawl
7. Content-first layout over UI-heavy chrome

---

## 19. Final Stack Recommendation

### Use this stack for MVP

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Sanity
* Vercel
* Playwright only if screenshot fallback is implemented

### Do not add yet

* Supabase
* Prisma
* job schedulers
* queues
* workers
* advanced search infrastructure
* custom admin system

---

## 20. Final Summary

Daily Tech Brief should launch as a curated editorial tech publication powered by a simple manual AI-assisted workflow.

The best MVP is:

* a premium dark editorial website
* structured content managed in Sanity
* manually selected and uploaded summaries via Claude skills
* a clean content model with articles, digests, and topics
* a restrained and trustworthy thumbnail strategy
* no unnecessary automation or backend complexity at the start

The product should prioritize:

* trust
* readability
* editorial quality
* daily revisit value
* implementation simplicity

This gives the strongest balance of quality, speed, and maintainability for version one.
