import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CardTitle } from "@/components/ui/typography";

interface DigestCardProps {
  title: string;
  date: string;
  slug: string;
  intro?: string;
  articleCount?: number;
  className?: string;
}

export function DigestCard({ title, date, slug, intro, articleCount, className }: DigestCardProps) {
  return (
    <Link
      href={`/digest/${slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
        className
      )}
    >
      <time dateTime={date} className="text-xs font-medium text-primary">
        {format(new Date(date), "EEEE, d MMMM yyyy")}
      </time>
      <CardTitle className="transition-colors group-hover:text-primary">
        {title}
      </CardTitle>
      {intro && (
        <p className="line-clamp-2 text-sm text-muted-foreground">{intro}</p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        {articleCount !== undefined && (
          <span className="text-xs text-muted-foreground">
            {articleCount} article{articleCount !== 1 ? "s" : ""}
          </span>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
          Read digest
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
