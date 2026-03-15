import Link from "next/link";
import { cn } from "@/lib/utils";

interface TopicChipProps {
  name: string;
  slug: string;
  active?: boolean;
  className?: string;
}

export function TopicChip({ name, slug, active, className }: TopicChipProps) {
  return (
    <Link
      href={`/topics/${slug}`}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary/20 text-primary"
          : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground",
        className
      )}
    >
      {name}
    </Link>
  );
}
