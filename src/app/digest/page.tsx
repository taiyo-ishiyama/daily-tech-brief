import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { DigestCard } from "@/components/digest/digest-card";
import { PageTitle, BodyLarge } from "@/components/ui/typography";
import { fetchAllDigests } from "@/lib/sanity/fetchers";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Digests",
  description: "Browse the archive of daily tech digests.",
};

export default async function DigestIndexPage() {
  const digests = await fetchAllDigests();

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-10 space-y-3">
          <PageTitle>Daily Digests</PageTitle>
          <BodyLarge className="text-muted-foreground">
            Browse the archive of daily tech digests. Each edition curates the most
            important stories, summarised with AI and reviewed for accuracy.
          </BodyLarge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {digests.map((digest) => (
            <DigestCard
              key={digest._id}
              title={digest.title}
              date={digest.date}
              slug={digest.slug}
              intro={digest.intro}
              articleCount={digest.articles.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
