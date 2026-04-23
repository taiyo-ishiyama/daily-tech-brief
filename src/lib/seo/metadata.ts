import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export const DEFAULT_OG_IMAGE = absoluteUrl("/opengraph-image");

export const sharedMetadata = {
  siteName: SITE_NAME,
  locale: "en_AU",
  type: "website" as const,
};
