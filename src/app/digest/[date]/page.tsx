import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Newspaper, Tag, Clock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { FeaturedArticleCard } from "@/components/article/featured-article-card";
import { PageTitle, BodyLarge } from "@/components/ui/typography";
import { fetchDigestByDate } from "@/lib/sanity/fetchers";

interface DigestDetailPageProps {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: DigestDetailPageProps) {
  const { date } = await params;
  return {
    title: `Daily Digest — ${date}`,
  };
}

export const revalidate = 60;

export default async function DigestDetailPage({ params }: DigestDetailPageProps) {
  const { date } = await params;
  const digest = await fetchDigestByDate(date);

  if (!digest) {
    notFound();
  }

  const totalReadingTime = digest.articles.reduce((sum, a) => sum + a.readingTime, 0);

  // Group articles by topic
  const articlesByTopic = new Map<string, typeof digest.articles>();
  for (const article of digest.articles) {
    const topicName = article.topic.name;
    const group = articlesByTopic.get(topicName) ?? [];
    group.push(article);
    articlesByTopic.set(topicName, group);
  }

  return (
    <section className="py-12 lg:py-16">
      <Container>
        {/* Header */}
        <div className="mb-10 space-y-4">
          <PageTitle className="text-balance">{digest.title}</PageTitle>
          <p className="text-sm font-medium text-primary">
            {format(new Date(digest.date), "EEEE, d MMMM yyyy")}
          </p>
          <BodyLarge className="max-w-2xl text-pretty text-muted-foreground">
            {digest.intro}
          </BodyLarge>
        </div>

        {/* Stats row */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <Newspaper className="mx-auto mb-2 size-5 text-primary" />
            <p className="text-2xl font-bold tabular-nums">{digest.articles.length}</p>
            <p className="text-xs text-muted-foreground">articles curated</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <Tag className="mx-auto mb-2 size-5 text-primary" />
            <p className="text-2xl font-bold tabular-nums">
              {Object.keys(digest.topicStats ?? {}).length}
            </p>
            <p className="text-xs text-muted-foreground">topics covered</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <Clock className="mx-auto mb-2 size-5 text-primary" />
            <p className="text-2xl font-bold tabular-nums">{totalReadingTime}</p>
            <p className="text-xs text-muted-foreground">min total reading</p>
          </div>
        </div>

        {/* Featured article */}
        {digest.featuredArticle && (
          <div className="mb-12">
            <FeaturedArticleCard article={digest.featuredArticle} />
          </div>
        )}

        {/* Topic-grouped sections */}
        {Array.from(articlesByTopic.entries()).map(([topicName, articles]) => {
          const topicSlug = articles[0]?.topic.slug ?? topicName.toLowerCase();
          return (
            <div key={topicName} className="mb-12 last:mb-0">
              <SectionHeader
                title={topicName}
                href={`/topics/${topicSlug}`}
                linkLabel="View all"
                className="mb-6"
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
