import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Newspaper, Tag, Clock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { FeaturedArticleCard } from "@/components/article/featured-article-card";
import { PageTitle, BodyLarge } from "@/components/ui/typography";
import { fetchDigestByDate } from "@/lib/sanity/fetchers";
import { absoluteUrl } from "@/lib/seo/metadata";
import { collectionPageJsonLd, safeJsonLdSerialize } from "@/lib/seo/jsonld";

interface DigestDetailPageProps {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: DigestDetailPageProps): Promise<Metadata> {
  const { date } = await params;
  const digest = await fetchDigestByDate(date);
  const description = digest?.intro ?? `Daily tech digest for ${date}`;
  return {
    title: `Daily Digest — ${date}`,
    description,
    alternates: { canonical: absoluteUrl(`/digest/${date}`) },
    openGraph: {
      title: `Daily Digest — ${date}`,
      description,
      url: absoluteUrl(`/digest/${date}`),
      type: "website",
    },
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

  const jsonLd = collectionPageJsonLd(
    `Daily Digest — ${date}`,
    digest.intro,
    `/digest/${date}`,
    digest.articles.map((a) => ({ url: absoluteUrl(`/articles/${a.slug}`), name: a.title }))
  );

  return (
    <section className="py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(jsonLd) }}
      />
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
