import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchAllTopics, searchArticles } from "@/lib/sanity/fetchers";
import SearchPageClient from "./search-client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the article archive.",
};

export const revalidate = 60;

interface SearchPageProps {
  searchParams: Promise<{ q?: string; topic?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", topic = "" } = await searchParams;
  const [topics, initialResults] = await Promise.all([
    fetchAllTopics(),
    q ? searchArticles(q, topic || undefined) : Promise.resolve([]),
  ]);

  return (
    <Suspense>
      <SearchPageClient
        topics={topics}
        initialResults={initialResults}
        initialQuery={q}
        initialTopic={topic}
      />
    </Suspense>
  );
}
