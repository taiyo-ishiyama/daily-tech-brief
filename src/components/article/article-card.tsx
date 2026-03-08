import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  void article;
  void className;
  return null;
}
