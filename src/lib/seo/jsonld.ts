import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { Article } from "@/types";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "./metadata";

const publisher = {
  "@type": "Organization" as const,
  name: SITE_NAME,
  url: SITE_URL,
};

export function articleJsonLd(article: Article) {
  const url = absoluteUrl(`/articles/${article.slug}`);
  const image = article.thumbnail?.url || DEFAULT_OG_IMAGE;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summaryShort,
    url,
    mainEntityOfPage: url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    image: [image],
    articleSection: article.topic.name,
    keywords: article.tags.join(", "),
    publisher,
    ...(article.sourceUrl ? { isBasedOn: article.sourceUrl } : {}),
  };
}

export function collectionPageJsonLd(
  name: string,
  description: string,
  path: string,
  items: { url: string; name: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: item.url,
        name: item.name,
      })),
    },
  };
}

export function safeJsonLdSerialize(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
