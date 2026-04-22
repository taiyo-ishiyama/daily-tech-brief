import Link from "next/link";
import { Zap } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { Container } from "./container";

const footerLinks = {
  Navigation: [
    { label: "Today", href: "/" },
    { label: "Digests", href: "/digest" },
    { label: "Topics", href: "/topics" },
    { label: "Search", href: "/search" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Zap className="size-5 text-primary" />
              <span className="text-sm">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your daily dose of technological breakthroughs, distilled into actionable summaries.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
