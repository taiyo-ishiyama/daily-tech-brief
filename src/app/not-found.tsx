import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24">
      <Container className="text-center">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </Container>
    </section>
  );
}
