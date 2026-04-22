"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { format } from "date-fns";

import { Container } from "@/components/layout/container";
import { TopicChip } from "@/components/ui/topic-chip";
import { Button } from "@/components/ui/button";
import { PageTitle, BodyLarge, CardTitle } from "@/components/ui/typography";
import { searchArticlesAction } from "@/lib/sanity/actions";
import type { Article, Topic } from "@/types";

interface SearchPageClientProps {
  topics: Topic[];
}

export default function SearchPageClient({ topics }: SearchPageClientProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      startTransition(async () => {
        const articles = await searchArticlesAction(query.trim());
        setResults(articles);
        setSearched(true);
      });
    }
  }

  function highlightQuery(text: string) {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
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
          <BodyLarge className="text-muted-foreground">
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

        {/* Filter pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {topics.map((topic) => (
            <TopicChip key={topic.slug} name={topic.name} slug={topic.slug} />
          ))}
        </div>

        {/* Results */}
        {searched && (
          <div>
            <p className="mb-6 text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">{results.length}</span>{" "}
              result{results.length !== 1 ? "s" : ""} for{" "}
              <span className="font-medium text-primary">&ldquo;{query}&rdquo;</span>
            </p>

            {results.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                No articles found. Try a different search term.
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
                          className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
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
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
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

            {/* Static pagination */}
            {results.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button variant="outline" size="icon-sm" disabled>
                  &lsaquo;
                </Button>
                <Button size="sm" className="min-w-[2rem]">
                  1
                </Button>
                <Button variant="outline" size="sm" className="min-w-[2rem]">
                  2
                </Button>
                <Button variant="outline" size="icon-sm" disabled>
                  &rsaquo;
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
