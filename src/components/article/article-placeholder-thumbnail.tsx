import type { Article } from "@/types";
import { cn } from "@/lib/utils";

const TOPIC_COLORS: Record<string, { chip: string; bg: string }> = {
  ai: { chip: "text-indigo-600 border-indigo-300 dark:text-indigo-400 dark:border-indigo-400/30", bg: "bg-indigo-50 dark:bg-indigo-950/40" },
  startups: { chip: "text-pink-600 border-pink-300 dark:text-pink-400 dark:border-pink-400/30", bg: "bg-pink-50 dark:bg-pink-950/40" },
  cloud: { chip: "text-sky-600 border-sky-300 dark:text-sky-400 dark:border-sky-400/30", bg: "bg-sky-50 dark:bg-sky-950/40" },
  security: { chip: "text-red-600 border-red-300 dark:text-red-400 dark:border-red-400/30", bg: "bg-red-50 dark:bg-red-950/40" },
  "web-development": { chip: "text-emerald-600 border-emerald-300 dark:text-emerald-400 dark:border-emerald-400/30", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  "open-source": { chip: "text-orange-600 border-orange-300 dark:text-orange-400 dark:border-orange-400/30", bg: "bg-orange-50 dark:bg-orange-950/40" },
  programming: { chip: "text-violet-600 border-violet-300 dark:text-violet-400 dark:border-violet-400/30", bg: "bg-violet-50 dark:bg-violet-950/40" },
  career: { chip: "text-amber-600 border-amber-300 dark:text-amber-400 dark:border-amber-400/30", bg: "bg-amber-50 dark:bg-amber-950/40" },
};

const DEFAULT_COLORS = { chip: "text-indigo-600 border-indigo-300 dark:text-indigo-400 dark:border-indigo-400/30", bg: "bg-indigo-50 dark:bg-indigo-950/40" };

interface ArticlePlaceholderThumbnailProps {
  article: Article;
  size?: "default" | "large";
  className?: string;
}

export function ArticlePlaceholderThumbnail({
  article,
  size = "default",
  className,
}: ArticlePlaceholderThumbnailProps) {
  const colors = TOPIC_COLORS[article.topic.slug] ?? DEFAULT_COLORS;
  const isLarge = size === "large";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        colors.bg,
        className
      )}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: isLarge ? "48px 48px" : "40px 40px",
        }}
      />
      {/* Content */}
      <div
        className={cn(
          "relative flex flex-col items-center gap-2 text-center",
          isLarge ? "gap-3 px-8 py-10" : "px-5 py-6"
        )}
      >
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase",
            isLarge && "px-3.5 py-1 text-xs",
            colors.chip
          )}
        >
          {article.topic.name}
        </span>
        <span
          className={cn(
            "line-clamp-2 font-bold text-foreground/90",
            isLarge ? "line-clamp-3 max-w-md text-xl" : "text-sm"
          )}
        >
          {article.title}
        </span>
        <span
          className={cn(
            "text-[0.625rem] font-medium text-muted-foreground",
            isLarge && "text-xs"
          )}
        >
          {article.sourceName}
        </span>
      </div>
    </div>
  );
}
