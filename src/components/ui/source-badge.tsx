import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceBadgeProps {
  name: string;
  url?: string;
  className?: string;
}

export function SourceBadge({ name, url, className }: SourceBadgeProps) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground",
          className
        )}
      >
        {name}
        <ExternalLink className="size-3" />
      </a>
    );
  }

  return (
    <span className={cn("inline-flex items-center text-xs text-muted-foreground", className)}>
      {name}
    </span>
  );
}
