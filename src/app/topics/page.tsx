import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageTitle, BodyLarge, CardTitle } from "@/components/ui/typography";
import { MOCK_TOPICS, getArticlesByTopic } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse articles by topic.",
};

export default function TopicsIndexPage() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-10 space-y-3">
          <PageTitle>Topics</PageTitle>
          <BodyLarge className="text-muted-foreground">
            Browse our coverage by topic. Each category is curated to surface the most
            impactful developments in its domain.
          </BodyLarge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_TOPICS.map((topic) => {
            const articles = getArticlesByTopic(topic.slug);
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <CardTitle className="transition-colors group-hover:text-primary">
                  {topic.name}
                </CardTitle>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {topic.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-xs text-muted-foreground">
                    {articles.length} article{articles.length !== 1 ? "s" : ""}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Explore
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
