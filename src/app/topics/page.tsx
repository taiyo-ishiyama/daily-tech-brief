import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageTitle, BodyLarge, CardTitle } from "@/components/ui/typography";
import { fetchTopicsWithCounts } from "@/lib/sanity/fetchers";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse our coverage by topic. Each category is curated to surface the most impactful developments in its domain.",
  alternates: { canonical: "/topics" },
};

export const revalidate = 60;

export default async function TopicsIndexPage() {
  const topics = await fetchTopicsWithCounts();

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-10 space-y-3">
          <PageTitle className="text-balance">Topics</PageTitle>
          <BodyLarge className="text-pretty text-muted-foreground">
            Browse our coverage by topic. Each category is curated to surface the most
            impactful developments in its domain.
          </BodyLarge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <CardTitle className="transition-colors group-hover:text-primary">
                {topic.name}
              </CardTitle>
              <p className="line-clamp-2 text-pretty text-sm text-muted-foreground">
                {topic.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="text-xs tabular-nums text-muted-foreground">
                  {topic.articleCount} article{topic.articleCount !== 1 ? "s" : ""}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
