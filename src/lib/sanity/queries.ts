import { groq } from "next-sanity";

// ── Shared projection fragments ──

const topicProjection = groq`{
  _id,
  _type,
  name,
  "slug": slug.current,
  description
}`;

const articleProjection = groq`{
  _id,
  _type,
  title,
  "slug": slug.current,
  sourceName,
  sourceUrl,
  publishedAt,
  updatedAt,
  summaryShort,
  summaryLong,
  whyItMatters,
  keyTakeaways,
  tags,
  topic->${topicProjection},
  thumbnail,
  featured,
  digestDate,
  readingTime
}`;

// ── Article queries ──

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0]${articleProjection}
`;

export const FEATURED_ARTICLE_QUERY = groq`
  *[_type == "article" && featured == true] | order(publishedAt desc)[0]${articleProjection}
`;

export const ARTICLES_BY_TOPIC_QUERY = groq`
  *[_type == "article" && topic->slug.current == $topicSlug] | order(publishedAt desc)${articleProjection}
`;

export const RELATED_ARTICLES_QUERY = groq`
  *[_type == "article" && topic->slug.current == $topicSlug && slug.current != $currentSlug] | order(publishedAt desc)[0...$limit]${articleProjection}
`;

export const SEARCH_ARTICLES_QUERY = groq`
  *[_type == "article" && (
    title match $q ||
    summaryShort match $q ||
    summaryLong match $q ||
    sourceName match $q
  )] | order(publishedAt desc)${articleProjection}
`;

// ── Digest queries ──

const digestProjection = groq`{
  _id,
  _type,
  title,
  "slug": slug.current,
  date,
  intro,
  featuredArticle->${articleProjection},
  articles[]->${articleProjection},
  topicStats,
  updatedAt
}`;

export const ALL_DIGESTS_QUERY = groq`
  *[_type == "digest"] | order(date desc)${digestProjection}
`;

export const LATEST_DIGEST_QUERY = groq`
  *[_type == "digest"] | order(date desc)[0]${digestProjection}
`;

export const DIGEST_BY_DATE_QUERY = groq`
  *[_type == "digest" && date == $date][0]${digestProjection}
`;

// ── Topic queries ──

export const ALL_TOPICS_QUERY = groq`
  *[_type == "topic"] | order(name asc)${topicProjection}
`;

export const TOPICS_WITH_COUNTS_QUERY = groq`
  *[_type == "topic"] | order(name asc) {
    ...,
    "slug": slug.current,
    "articleCount": count(*[_type == "article" && references(^._id)])
  }
`;

export const TOPIC_BY_SLUG_QUERY = groq`
  *[_type == "topic" && slug.current == $slug][0]${topicProjection}
`;
