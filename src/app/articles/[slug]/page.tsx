import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { TopicChip } from "@/components/ui/topic-chip";
import { MetadataRow } from "@/components/ui/metadata-row";
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
} from "@/lib/sanity/fetchers";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo/metadata";
import { articleJsonLd, safeJsonLdSerialize } from "@/lib/seo/jsonld";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return { title: "Article" };

  const ogImage =
    article.thumbnail?.mode === "source" && article.thumbnail.url
      ? article.thumbnail.url
      : DEFAULT_OG_IMAGE;

  return {
    title: article.title,
    description: article.summaryShort,
    alternates: { canonical: absoluteUrl(`/articles/${slug}`) },
    openGraph: {
      title: article.title,
      description: article.summaryShort,
      url: absoluteUrl(`/articles/${slug}`),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      section: article.topic.name,
      tags: article.tags,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summaryShort,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await fetchRelatedArticles(article.topic.slug, slug, 2);
  const jsonLd = articleJsonLd(article);

  return (
    <article className="py-12 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(jsonLd) }}
      />
      <Container className="max-w-2xl">

        {/* ── Header ── */}
        <header className="mb-12">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <TopicChip name={article.topic.name} slug={article.topic.slug} active />
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
            {article.title}
          </h1>

          <MetadataRow
            source={article.sourceName}
            readingTime={article.readingTime}
            date={article.publishedAt}
            className="mt-5"
          />
        </header>

        {/* ── TL;DR ── */}
        <section className="mb-12 border-l-2 border-primary py-1 pl-5">
          <p className="text-pretty text-lg leading-relaxed text-foreground/80">
            {article.summaryShort}
          </p>
        </section>

        {/* ── Full Summary ── */}
        <section className="mb-12">
          <div className="prose-custom space-y-5">
            {article.summaryLong.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-pretty leading-[1.8] text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* ── Key Takeaways ── */}
        {article.keyTakeaways.length > 0 && (
          <section className="mb-12 rounded-lg border border-border bg-card/50 p-6 sm:p-8">
            <h2 className="mb-5 text-sm font-semibold uppercase text-foreground">
              Key Takeaways
            </h2>
            <ul className="space-y-4">
              {article.keyTakeaways.map((point, i) => (
                <li key={i} className="flex gap-4 text-sm leading-relaxed">
                  <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold tabular-nums text-primary">
                    {i + 1}
                  </span>
                  <span className="text-pretty text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Why It Matters ── */}
        {article.whyItMatters && (
          <section className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase text-foreground">
              Why It Matters
            </h2>
            <p className="text-pretty leading-[1.8] text-muted-foreground">
              {article.whyItMatters}
            </p>
          </section>
        )}

        {/* ── Divider ── */}
        <hr className="mb-12 border-border" />

        {/* ── Source Attribution ── */}
        <section className="mb-16 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            <span>Summarised from </span>
            <span className="font-medium text-foreground">{article.sourceName}</span>
          </div>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Read original
            <ExternalLink className="size-3.5" />
          </a>
        </section>

        {/* ── Further Reading ── */}
        {related.length > 0 && (
          <section>
            <SectionHeader title="Further Reading" className="mb-6" />
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((a) => (
                <ArticleCard key={a._id} article={a} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
