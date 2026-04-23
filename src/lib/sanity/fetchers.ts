import { cache } from "react";

import { client, isSanityConfigured } from "./client";
import {
  ARTICLE_BY_SLUG_QUERY,
  FEATURED_ARTICLE_QUERY,
  ARTICLES_BY_TOPIC_QUERY,
  RELATED_ARTICLES_QUERY,
  SEARCH_ARTICLES_QUERY,
  SEARCH_ARTICLES_BY_TOPIC_QUERY,
  ALL_DIGESTS_QUERY,
  DIGEST_BY_DATE_QUERY,
  LATEST_DIGEST_QUERY,
  ALL_TOPICS_QUERY,
  TOPICS_WITH_COUNTS_QUERY,
  TOPIC_BY_SLUG_QUERY,
  SITEMAP_ARTICLES_QUERY,
  SITEMAP_DIGESTS_QUERY,
  SITEMAP_TOPICS_QUERY,
} from "./queries";
import type { Article, Digest, Topic } from "@/types";

// ── Safe fetch wrapper ──
// Returns a fallback value when the Sanity project is not configured,
// allowing the app to build and run without a live Sanity backend.

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> | undefined,
  fallback: T
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  if (params) {
    return client.fetch<T>(query, params);
  }
  return client.fetch<T>(query);
}

// ── topicStats transform ──
// Sanity stores camelCase field names; the frontend expects display names.

const TOPIC_STATS_MAP: Record<string, string> = {
  ai: "AI",
  startups: "Startups",
  cloud: "Cloud",
  security: "Security",
  webDevelopment: "Web Development",
  openSource: "Open Source",
  programming: "Programming",
  career: "Career",
};

function transformTopicStats(
  raw: Record<string, number> | undefined | null
): Record<string, number> | undefined {
  if (!raw) return undefined;
  const result: Record<string, number> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "number" && value > 0) {
      result[TOPIC_STATS_MAP[key] ?? key] = value;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

function transformDigest<T extends Digest | null>(digest: T): T {
  if (!digest) return digest;
  return { ...digest, topicStats: transformTopicStats(digest.topicStats) };
}

// ── Article fetchers ──

export const fetchArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    return safeFetch<Article | null>(ARTICLE_BY_SLUG_QUERY, { slug }, null);
  }
);

export async function fetchFeaturedArticle(): Promise<Article | null> {
  return safeFetch<Article | null>(FEATURED_ARTICLE_QUERY, undefined, null);
}

export async function fetchArticlesByTopic(
  topicSlug: string
): Promise<Article[]> {
  return safeFetch<Article[]>(ARTICLES_BY_TOPIC_QUERY, { topicSlug }, []);
}

export async function fetchRelatedArticles(
  topicSlug: string,
  currentSlug: string,
  limit = 2
): Promise<Article[]> {
  return safeFetch<Article[]>(RELATED_ARTICLES_QUERY, {
    topicSlug,
    currentSlug,
    limit,
  }, []);
}

export async function searchArticles(query: string, topicSlug?: string): Promise<Article[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];
  const q = `${trimmedQuery}*`;
  const trimmedTopic = topicSlug?.trim();
  if (trimmedTopic) {
    return safeFetch<Article[]>(SEARCH_ARTICLES_BY_TOPIC_QUERY, { q, topicSlug: trimmedTopic }, []);
  }
  return safeFetch<Article[]>(SEARCH_ARTICLES_QUERY, { q }, []);
}

// ── Digest fetchers ──

export async function fetchAllDigests(): Promise<Digest[]> {
  const digests = await safeFetch<Digest[]>(ALL_DIGESTS_QUERY, undefined, []);
  return digests.map(transformDigest);
}

export async function fetchLatestDigest(): Promise<Digest | null> {
  const digest = await safeFetch<Digest | null>(LATEST_DIGEST_QUERY, undefined, null);
  return transformDigest(digest);
}

export const fetchDigestByDate = cache(
  async (date: string): Promise<Digest | null> => {
    const digest = await safeFetch<Digest | null>(DIGEST_BY_DATE_QUERY, {
      date,
    }, null);
    return transformDigest(digest);
  }
);

// ── Topic fetchers ──

export async function fetchAllTopics(): Promise<Topic[]> {
  return safeFetch<Topic[]>(ALL_TOPICS_QUERY, undefined, []);
}

export async function fetchTopicsWithCounts(): Promise<
  (Topic & { articleCount: number })[]
> {
  return safeFetch<(Topic & { articleCount: number })[]>(
    TOPICS_WITH_COUNTS_QUERY,
    undefined,
    []
  );
}

export const fetchTopicBySlug = cache(
  async (slug: string): Promise<Topic | null> => {
    return safeFetch<Topic | null>(TOPIC_BY_SLUG_QUERY, { slug }, null);
  }
);

// ── Sitemap fetchers ──

interface SitemapArticle { slug: string; publishedAt: string; updatedAt?: string }
interface SitemapDigest { date: string; updatedAt?: string }
interface SitemapTopic { slug: string }

export async function fetchArticlesForSitemap(): Promise<SitemapArticle[]> {
  return safeFetch<SitemapArticle[]>(SITEMAP_ARTICLES_QUERY, undefined, []);
}

export async function fetchDigestsForSitemap(): Promise<SitemapDigest[]> {
  return safeFetch<SitemapDigest[]>(SITEMAP_DIGESTS_QUERY, undefined, []);
}

export async function fetchTopicsForSitemap(): Promise<SitemapTopic[]> {
  return safeFetch<SitemapTopic[]>(SITEMAP_TOPICS_QUERY, undefined, []);
}
