"use server";

import type { Article } from "@/types";
import { searchArticles } from "./fetchers";

export async function searchArticlesAction(
  query: string,
  topicSlug?: string
): Promise<Article[]> {
  if (!query || typeof query !== "string" || !query.trim()) {
    return [];
  }
  return searchArticles(query.trim(), topicSlug || undefined);
}
