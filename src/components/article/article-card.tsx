import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";
import { CardTitle } from "@/components/ui/typography";
import { TopicChip } from "@/components/ui/topic-chip";
import { MetadataRow } from "@/components/ui/metadata-row";
import { ArticlePlaceholderThumbnail } from "./article-placeholder-thumbnail";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col gap-3 overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/30",
        className
      )}
    >
      <Link href={`/articles/${article.slug}`} className="block">
        {article.thumbnail?.mode === "source" && article.thumbnail.url ? (
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <Image
              src={article.thumbnail.url}
              alt={article.thumbnail.alt ?? article.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <ArticlePlaceholderThumbnail
            article={article}
            className="aspect-video"
          />
        )}
      </Link>
      <div className="flex flex-col gap-3 px-5 pb-5">
        <div className="flex items-center gap-2">
          <TopicChip name={article.topic.name} slug={article.topic.slug} />
        </div>
        <Link href={`/articles/${article.slug}`}>
          <CardTitle className="transition-colors group-hover:text-primary">
            {article.title}
          </CardTitle>
        </Link>
        <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          {article.summaryShort}
        </p>
        <MetadataRow
          source={article.sourceName}
          readingTime={article.readingTime}
          date={article.publishedAt}
          className="mt-auto pt-2"
        />
      </div>
    </article>
  );
}
