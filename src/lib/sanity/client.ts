import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "./env";

// Use a placeholder projectId during build when the env var is not set.
// Fetches will return empty results until a real project ID is configured.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn,
});

/** Whether the Sanity project is properly configured. */
export const isSanityConfigured = !!projectId;
