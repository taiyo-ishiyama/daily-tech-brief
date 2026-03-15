import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AISummaryBadgeProps {
  className?: string;
}

export function AISummaryBadge({ className }: AISummaryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary",
        className
      )}
    >
      <Sparkles className="size-3" />
      AI Summary
    </span>
  );
}
