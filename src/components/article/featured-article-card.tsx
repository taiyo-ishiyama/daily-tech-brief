import Link from "next/link";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";
import { CardTitle } from "@/components/ui/typography";
import { TopicChip } from "@/components/ui/topic-chip";
import { MetadataRow } from "@/components/ui/metadata-row";
import { ArticlePlaceholderThumbnail } from "./article-placeholder-thumbnail";

interface FeaturedArticleCardProps {
  article: Article;
  className?: string;
}

export function FeaturedArticleCard({ article, className }: FeaturedArticleCardProps) {
  return (
    <article
      className={cn(
        "group grid gap-6 overflow-hidden rounded-lg border border-border bg-card md:grid-cols-2",
        className
      )}
    >
      {/* Thumbnail */}
      {article.thumbnail?.mode === "source" && article.thumbnail.url ? (
        <div className="aspect-video overflow-hidden bg-secondary md:aspect-auto md:min-h-80">
          <img
            src={article.thumbnail.url}
            alt={article.thumbnail.alt ?? article.title}
            className="size-full object-cover"
          />
        </div>
      ) : (
        <ArticlePlaceholderThumbnail
          article={article}
          size="large"
          className="aspect-video md:aspect-auto md:min-h-80"
        />
      )}

      {/* Content */}
      <div className="flex flex-col justify-center gap-4 p-6 md:py-8 md:pr-8 md:pl-0">
        <TopicChip name={article.topic.name} slug={article.topic.slug} />
        <Link href={`/articles/${article.slug}`}>
          <CardTitle
            as="h2"
            className="text-xl transition-colors group-hover:text-primary sm:text-2xl"
          >
            {article.title}
          </CardTitle>
        </Link>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {article.summaryShort}
        </p>
        {article.whyItMatters && (
          <div className="rounded-md border border-border bg-secondary/50 p-4">
            <p className="mb-1 text-xs font-semibold uppercase text-primary">
              Why it matters
            </p>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {article.whyItMatters}
            </p>
          </div>
        )}
        <MetadataRow
          source={article.sourceName}
          readingTime={article.readingTime}
          date={article.publishedAt}
        />
      </div>
    </article>
  );
}
