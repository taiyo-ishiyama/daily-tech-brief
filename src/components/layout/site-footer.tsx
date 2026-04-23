import Link from "next/link";
import { Zap } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Zap className="size-4 text-primary" />
          <span className="text-sm">{SITE_NAME}</span>
        </Link>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </Container>
    </footer>
  );
}
