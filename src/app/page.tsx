import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Zap } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { FeaturedArticleCard } from "@/components/article/featured-article-card";
import { TopicChip } from "@/components/ui/topic-chip";
import { PageTitle, BodyLarge, MutedSmall } from "@/components/ui/typography";
import {
  fetchFeaturedArticle,
  fetchLatestDigest,
  fetchAllTopics,
} from "@/lib/sanity/fetchers";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, todayDigest, topics] = await Promise.all([
    fetchFeaturedArticle(),
    fetchLatestDigest(),
    fetchAllTopics(),
  ]);

  if (!todayDigest) {
    return (
      <section className="py-16">
        <Container>
          <PageTitle className="text-balance">The Intelligence Brief.</PageTitle>
          <BodyLarge className="mt-4 text-pretty text-muted-foreground">
            No digests available yet. Check back soon.
          </BodyLarge>
        </Container>
      </section>
    );
  }

  const todayArticles = todayDigest.articles
    .filter((a) => a._id !== featured?._id)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="space-y-6">
              <PageTitle className="text-balance">The Intelligence Brief.</PageTitle>
              <BodyLarge className="text-pretty text-muted-foreground">
                AI-curated summaries of the day&rsquo;s most significant technological
                developments. Cut through the noise with concise, expert-reviewed analysis.
              </BodyLarge>
              <MutedSmall>{format(new Date(todayDigest.date), "EEEE, d MMMM yyyy")}</MutedSmall>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold tabular-nums text-primary">{todayDigest.articles.length}</p>
                  <p className="text-xs text-muted-foreground">articles today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold tabular-nums text-primary">{topics.length}</p>
                  <p className="text-xs text-muted-foreground">topics covered</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/digest/${todayDigest.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  <Zap className="size-4" />
                  Read today&rsquo;s digest
                </Link>
                <Link
                  href="/topics"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Browse topics
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Insight */}
      {featured && (
        <section className="py-12 lg:py-16">
          <Container>
            <SectionHeader title="Featured Insight" className="mb-8" />
            <FeaturedArticleCard article={featured} />
          </Container>
        </section>
      )}

      {/* Topic chips */}
      {topics.length > 0 && (
        <section className="py-8">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm font-medium text-muted-foreground">Trending topics:</span>
              {topics.map((topic) => (
                <TopicChip key={topic.slug} name={topic.name} slug={topic.slug} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Today's Summaries */}
      {todayArticles.length > 0 && (
        <section className="py-12 lg:py-16">
          <Container>
            <SectionHeader
              title="Today&rsquo;s Summaries"
              href={`/digest/${todayDigest.slug}`}
              linkLabel="View all"
              className="mb-8"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {todayArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
