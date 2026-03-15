import Link from "next/link";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";
import { CardTitle } from "@/components/ui/typography";
import { TopicChip } from "@/components/ui/topic-chip";
import { MetadataRow } from "@/components/ui/metadata-row";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <TopicChip name={article.topic.name} slug={article.topic.slug} />
      </div>
      <Link href={`/articles/${article.slug}`}>
        <CardTitle className="transition-colors group-hover:text-primary">
          {article.title}
        </CardTitle>
      </Link>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {article.summaryShort}
      </p>
      <MetadataRow
        source={article.sourceName}
        readingTime={article.readingTime}
        date={article.publishedAt}
        className="mt-auto pt-2"
      />
    </article>
  );
}
