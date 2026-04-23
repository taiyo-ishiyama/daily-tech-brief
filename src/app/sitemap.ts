import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import {
  fetchArticlesForSitemap,
  fetchDigestsForSitemap,
  fetchTopicsForSitemap,
} from "@/lib/sanity/fetchers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, digests, topics] = await Promise.all([
    fetchArticlesForSitemap().catch(() => []),
    fetchDigestsForSitemap().catch(() => []),
    fetchTopicsForSitemap().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/digest`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/topics`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: a.updatedAt ?? a.publishedAt,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const digestPages: MetadataRoute.Sitemap = digests.map((d) => ({
    url: `${SITE_URL}/digest/${d.date}`,
    lastModified: d.updatedAt ?? d.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const topicPages: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${SITE_URL}/topics/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...digestPages, ...topicPages];
}
