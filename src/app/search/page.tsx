import { fetchAllTopics } from "@/lib/sanity/fetchers";
import SearchPageClient from "./search-client";

export const metadata = {
  title: "Search",
  description: "Search the Daily Tech Brief archive.",
};

export default async function SearchPage() {
  const topics = await fetchAllTopics();
  return <SearchPageClient topics={topics} />;
}
