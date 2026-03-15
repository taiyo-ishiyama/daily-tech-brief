import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageTitle, SectionTitle, BodyLarge } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Daily Tech Brief and how we curate the news.",
};

export default function AboutPage() {
  return (
    <section className="py-12 lg:py-16">
      <Container className="max-w-3xl">
        <PageTitle className="mb-6">About Daily Tech Brief</PageTitle>

        <div className="space-y-10">
          {/* Mission */}
          <div className="space-y-4">
            <SectionTitle>Our Mission</SectionTitle>
            <BodyLarge className="text-muted-foreground">
              Daily Tech Brief exists to cut through the noise. In an era of information
              overload, technology professionals need a reliable, concise source of truth
              for what&rsquo;s genuinely important in the tech landscape.
            </BodyLarge>
            <p className="leading-relaxed text-muted-foreground">
              We curate the most significant developments across artificial intelligence,
              cloud computing, cybersecurity, web development, startups, and open source.
              Each story is distilled into an actionable summary, highlighting not just
              what happened, but why it matters for practitioners and decision-makers.
            </p>
          </div>

          {/* How it works */}
          <div className="space-y-4">
            <SectionTitle>How It Works</SectionTitle>
            <p className="leading-relaxed text-muted-foreground">
              Our process combines the breadth of AI with the judgement of experienced
              technologists. Each morning, our AI systems scan hundreds of sources
              — from major tech publications and research repositories to developer
              forums and industry newsletters.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              The AI identifies the stories with the highest signal, generates structured
              summaries, extracts key takeaways, and assesses the broader significance
              of each development. Every summary is then reviewed by our editorial team
              to ensure accuracy, context, and relevance.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              The result is a daily digest that you can read in under ten minutes,
              confident that you haven&rsquo;t missed anything critical.
            </p>
          </div>

          {/* Source Attribution */}
          <div className="space-y-4">
            <SectionTitle>Source Attribution</SectionTitle>
            <p className="leading-relaxed text-muted-foreground">
              We believe in giving credit where it&rsquo;s due. Every article on Daily
              Tech Brief links back to the original source. Our summaries are designed to
              complement, not replace, the original reporting. We encourage readers to
              follow through to the full articles for deeper context.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Our source base includes established publications such as TechCrunch,
              The Verge, Wired, Ars Technica, Bloomberg, and many more, alongside
              primary sources like official blogs, research papers, and release notes.
            </p>
          </div>

          {/* Editorial Standards */}
          <div className="space-y-4">
            <SectionTitle>Editorial Standards</SectionTitle>
            <p className="leading-relaxed text-muted-foreground">
              Accuracy is non-negotiable. All AI-generated summaries are marked with an
              AI badge and reviewed before publication. We correct errors promptly and
              transparently. Our goal is to be the most trusted daily briefing in
              technology.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
