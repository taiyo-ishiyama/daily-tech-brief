import { Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AISummaryBadge } from "./ai-summary-badge";

interface MetadataRowProps {
  date?: string;
  readingTime?: number;
  source?: string;
  showAiBadge?: boolean;
  className?: string;
}

export function MetadataRow({ date, readingTime, source, showAiBadge = true, className }: MetadataRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground", className)}>
      {source && <span>{source}</span>}
      {source && (readingTime || date) && <span aria-hidden="true">&middot;</span>}
      {readingTime && (
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {readingTime} min read
        </span>
      )}
      {readingTime && date && <span aria-hidden="true">&middot;</span>}
      {date && <time dateTime={date}>{format(new Date(date), "d MMM yyyy")}</time>}
      {showAiBadge && (
        <>
          <span aria-hidden="true">&middot;</span>
          <AISummaryBadge />
        </>
      )}
    </div>
  );
}
