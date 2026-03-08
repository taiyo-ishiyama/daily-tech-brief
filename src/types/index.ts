// ── Core content types aligned with Sanity schema ──

export type ThumbnailMode = "source" | "screenshot" | "none";

export interface Thumbnail {
  mode: ThumbnailMode;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  sourceUrl?: string;
}

export interface Article {
  _id: string;
  _type: "article";
  title: string;
  slug: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  updatedAt?: string;
  summaryShort: string;
  summaryLong: string;
  whyItMatters: string;
  keyTakeaways: string[];
  tags: string[];
  topic: Topic;
  thumbnail?: Thumbnail;
  featured: boolean;
  digestDate: string;
  readingTime: number;
}

export interface Digest {
  _id: string;
  _type: "digest";
  title: string;
  slug: string;
  date: string;
  intro: string;
  featuredArticle?: Article;
  articles: Article[];
  topicStats?: Record<string, number>;
  updatedAt?: string;
}

export interface Topic {
  _id: string;
  _type: "topic";
  name: string;
  slug: string;
  description: string;
  featuredArticle?: Article;
}
