import type { Article } from "@/types";

interface FeaturedArticleCardProps {
  article: Article;
  className?: string;
}

export function FeaturedArticleCard({ article, className }: FeaturedArticleCardProps) {
  void article;
  void className;
  return null;
}
