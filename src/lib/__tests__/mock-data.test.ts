import { describe, it, expect } from "vitest";
import {
  MOCK_ARTICLES,
  MOCK_TOPICS,
  MOCK_DIGESTS,
  getArticleBySlug,
  getDigestByDate,
  getTopicBySlug,
  getArticlesByTopic,
  getFeaturedArticle,
  searchArticles,
} from "../mock-data";

describe("getArticleBySlug", () => {
  it("returns the correct article for a valid slug", () => {
    const article = getArticleBySlug("openai-gpt5-preview-autonomous-reasoning");
    expect(article).toBeDefined();
    expect(article?.title).toBe(
      "OpenAI Announces GPT-5 Preview: The Dawn of Autonomous Reasoning"
    );
  });

  it("returns undefined for an invalid slug", () => {
    expect(getArticleBySlug("nonexistent-slug")).toBeUndefined();
  });
});

describe("getDigestByDate", () => {
  it("returns the correct digest for a valid date", () => {
    const digest = getDigestByDate("2026-03-15");
    expect(digest).toBeDefined();
    expect(digest?.date).toBe("2026-03-15");
  });

  it("returns undefined for an invalid date", () => {
    expect(getDigestByDate("1999-01-01")).toBeUndefined();
  });
});

describe("getTopicBySlug", () => {
  it("returns the correct topic for a valid slug", () => {
    const topic = getTopicBySlug("ai");
    expect(topic).toBeDefined();
    expect(topic?.name).toBe("AI");
  });

  it("returns undefined for an invalid slug", () => {
    expect(getTopicBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getArticlesByTopic", () => {
  it("returns articles matching the given topic slug", () => {
    const articles = getArticlesByTopic("ai");
    expect(articles.length).toBeGreaterThan(0);
    articles.forEach((a) => {
      expect(a.topic.slug).toBe("ai");
    });
  });

  it("returns an empty array for a topic with no articles", () => {
    expect(getArticlesByTopic("nonexistent")).toEqual([]);
  });
});

describe("getFeaturedArticle", () => {
  it("returns a featured article", () => {
    const article = getFeaturedArticle();
    expect(article).toBeDefined();
    expect(article.featured).toBe(true);
  });
});

describe("searchArticles", () => {
  it("finds articles by title keyword", () => {
    const results = searchArticles("GPT-5");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain("GPT-5");
  });

  it("finds articles by tag", () => {
    const results = searchArticles("Robotics");
    expect(results.length).toBeGreaterThan(0);
  });

  it("finds articles by topic name", () => {
    const results = searchArticles("Security");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns an empty array for no matches", () => {
    expect(searchArticles("zzzznonexistentzzzz")).toEqual([]);
  });
});

describe("mock data integrity", () => {
  it("has topics, articles, and digests", () => {
    expect(MOCK_TOPICS.length).toBeGreaterThan(0);
    expect(MOCK_ARTICLES.length).toBeGreaterThan(0);
    expect(MOCK_DIGESTS.length).toBeGreaterThan(0);
  });
});
