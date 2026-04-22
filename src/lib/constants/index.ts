export const SITE_NAME = "Daily Tech Brief";
export const SITE_DESCRIPTION =
  "A curated daily digest of the most important tech news, summarised with AI and reviewed by humans.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dailytechbrief.com";

export const NAV_LINKS = [
  { label: "Today", href: "/" },
  { label: "Digests", href: "/digest" },
  { label: "Topics", href: "/topics" },
  { label: "Search", href: "/search" },
] as const;

export const DEFAULT_TOPICS = [
  "AI",
  "Startups",
  "Cloud",
  "Security",
  "Web Development",
  "Open Source",
] as const;
