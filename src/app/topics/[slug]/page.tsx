import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { FeaturedArticleCard } from "@/components/article/featured-article-card";
import { TopicChip } from "@/components/ui/topic-chip";
import { PageTitle, BodyLarge, MutedSmall } from "@/components/ui/typography";
import {
  fetchTopicBySlug,
  fetchArticlesByTopic,
  fetchAllTopics,
} from "@/lib/sanity/fetchers";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = await fetchTopicBySlug(slug);
  return {
    title: topic?.name ?? "Topic",
  };
}

export const revalidate = 60;

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const [topic, articles, allTopics] = await Promise.all([
    fetchTopicBySlug(slug),
    fetchArticlesByTopic(slug),
    fetchAllTopics(),
  ]);

  if (!topic) {
    notFound();
  }

  const leadArticle = articles[0];
  const archiveArticles = articles.slice(1);

  return (
    <section className="py-12 lg:py-16">
      <Container>
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/topics" className="transition-colors hover:text-foreground">
            Topics
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{topic.name}</span>
        </nav>

        {/* Topic header */}
        <div className="mb-10 space-y-3">
          <PageTitle className="text-balance italic">{topic.name}</PageTitle>
          <BodyLarge className="max-w-2xl text-pretty text-muted-foreground">
            {topic.description}
          </BodyLarge>
          <MutedSmall>
            {articles.length} article{articles.length !== 1 ? "s" : ""} in archive
          </MutedSmall>
        </div>

        {/* Topic tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-muted-foreground">Topics:</span>
          {allTopics.map((t) => (
            <TopicChip
              key={t.slug}
              name={t.name}
              slug={t.slug}
              active={t.slug === slug}
            />
          ))}
        </div>

        {/* Lead story */}
        {leadArticle && (
          <div className="mb-12">
            <FeaturedArticleCard article={leadArticle} />
          </div>
        )}

        {/* Archive grid */}
        {archiveArticles.length > 0 && (
          <div>
            <SectionHeader title="Archive" className="mb-6" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {archiveArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
