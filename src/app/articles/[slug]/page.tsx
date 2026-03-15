import { notFound } from "next/navigation";
import { ExternalLink, Key, Lightbulb, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { TopicChip } from "@/components/ui/topic-chip";
import { MetadataRow } from "@/components/ui/metadata-row";
import { PageTitle, SectionTitle } from "@/components/ui/typography";
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
} from "@/lib/sanity/fetchers";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  return {
    title: article?.title ?? "Article",
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await fetchRelatedArticles(article.topic.slug, slug, 2);

  return (
    <section className="py-12 lg:py-16">
      <Container className="max-w-3xl">
        {/* Topic chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          <TopicChip name={article.topic.name} slug={article.topic.slug} active />
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <PageTitle className="mb-4">{article.title}</PageTitle>

        {/* Metadata */}
        <MetadataRow
          source={article.sourceName}
          readingTime={article.readingTime}
          date={article.publishedAt}
          className="mb-8"
        />

        {/* Executive Summary */}
        <div className="mb-8 border-l-2 border-primary pl-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            Executive Summary
          </p>
          <p className="italic leading-relaxed text-muted-foreground">
            {article.summaryLong}
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Key className="size-4 text-primary" />
            <SectionTitle as="h3" className="text-lg sm:text-xl">
              Key Takeaways
            </SectionTitle>
          </div>
          <ul className="space-y-3">
            {article.keyTakeaways.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Why It Matters */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="size-4 text-primary" />
            <SectionTitle as="h3" className="text-lg sm:text-xl">
              Why it matters
            </SectionTitle>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            {article.whyItMatters}
          </p>
        </div>

        {/* Full AI Analysis */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <SectionTitle as="h3" className="text-lg sm:text-xl">
              Full AI Analysis
            </SectionTitle>
          </div>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>{article.summaryLong}</p>
            <p>{article.whyItMatters}</p>
          </div>
        </div>

        {/* Original Source */}
        <div className="mb-12 rounded-lg border border-border bg-card p-6 text-center">
          <p className="mb-1 text-xs text-muted-foreground">
            This curated summary was synthesised by {" "}
            <span className="text-foreground">Daily Tech Brief AI</span> from{" "}
            <span className="text-foreground">{article.sourceName}</span>.
          </p>
          <p className="mb-4 text-xs text-muted-foreground">
            Original content belongs to {article.sourceName}.
          </p>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
          >
            Read original article
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        {/* Further Reading */}
        {related.length > 0 && (
          <div>
            <SectionHeader title="Further Reading" className="mb-6" />
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((a) => (
                <ArticleCard key={a._id} article={a} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
