"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { format } from "date-fns";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PageTitle, BodyLarge, CardTitle } from "@/components/ui/typography";
import { searchArticlesAction } from "@/lib/sanity/actions";
import { cn } from "@/lib/utils";
import type { Article, Topic } from "@/types";

interface SearchPageClientProps {
  topics: Topic[];
  initialResults: Article[];
  initialQuery: string;
  initialTopic: string;
}

export default function SearchPageClient({
  topics,
  initialResults,
  initialQuery,
  initialTopic,
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const urlTopic = searchParams.get("topic") ?? "";

  const [query, setQuery] = useState(urlQuery || initialQuery);
  const [activeTopic, setActiveTopic] = useState(urlTopic || initialTopic);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>(initialResults);
  const [searched, setSearched] = useState(initialResults.length > 0 || !!initialQuery);
  const [isPending, startTransition] = useTransition();
  const latestSearchId = useRef(0);

  function executeSearch(term: string, topicSlug: string) {
    if (!term) {
      latestSearchId.current += 1;
      setResults([]);
      setSubmittedQuery("");
      setSearched(false);
      return;
    }

    const searchId = latestSearchId.current + 1;
    latestSearchId.current = searchId;
    setSearched(false);
    startTransition(async () => {
      const articles = await searchArticlesAction(term, topicSlug || undefined);
      if (searchId !== latestSearchId.current) return;
      setResults(articles);
      setSubmittedQuery(term);
      setSearched(true);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    if (activeTopic) params.set("topic", activeTopic);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
    executeSearch(trimmed, activeTopic);
  }

  function handleTopicToggle(topicSlug: string) {
    const next = activeTopic === topicSlug ? "" : topicSlug;
    setActiveTopic(next);

    const trimmed = query.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    if (next) params.set("topic", next);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");

    if (trimmed) {
      executeSearch(trimmed, next);
    }
  }

  function highlightQuery(text: string) {
    if (!submittedQuery) return text;
    const regex = new RegExp(
      `(${submittedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="rounded bg-primary/30 px-0.5 text-foreground">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <Container>
        {/* Header */}
        <div className="mb-8 space-y-3">
          <PageTitle>Search Archive</PageTitle>
          <BodyLarge className="text-pretty text-muted-foreground">
            Find specific insights from our comprehensive archive of daily tech news and analysis.
          </BodyLarge>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Searching…" : "Search"}
          </Button>
        </form>

        {/* Topic filter chips */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {topics.map((topic) => (
            <button
              key={topic.slug}
              type="button"
              aria-pressed={activeTopic === topic.slug}
              onClick={() => handleTopicToggle(topic.slug)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                activeTopic === topic.slug
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {topic.name}
            </button>
          ))}
        </div>

        {/* Results */}
        {searched && (
          <div>
            <p className="mb-6 text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">{results.length}</span>{" "}
              result{results.length !== 1 ? "s" : ""} for{" "}
              <span className="font-medium text-primary">&ldquo;{submittedQuery}&rdquo;</span>
              {activeTopic && (
                <>
                  {" "}in{" "}
                  <span className="font-medium text-primary">
                    {topics.find((t) => t.slug === activeTopic)?.name ?? activeTopic}
                  </span>
                </>
              )}
            </p>

            {results.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                No articles found. Try a different search term or topic.
              </p>
            ) : (
              <div className="space-y-4">
                {results.map((article) => (
                  <article
                    key={article._id}
                    className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(new Date(article.publishedAt), "d MMM yyyy")}
                      </span>
                    </div>
                    <Link href={`/articles/${article.slug}`}>
                      <CardTitle className="mb-2 transition-colors hover:text-primary">
                        {highlightQuery(article.title)}
                      </CardTitle>
                    </Link>
                    <p className="mb-3 line-clamp-2 text-pretty text-sm text-muted-foreground">
                      {highlightQuery(article.summaryShort)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {article.sourceName}
                      </span>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        View Full Summary &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
