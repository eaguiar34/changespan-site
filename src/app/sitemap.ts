import type { MetadataRoute } from "next";
import { releases, releaseSlug } from "@/lib/releases";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const routes = [
    "",
    "/how-it-works",
    "/features",
    "/collaboration",
    "/roadmap",
    "/join-beta",
    "/join-beta/thanks",
    "/tutorials",
    "/pricing",
    "/download",
    "/download/windows",
    "/about",
    "/privacy",
    "/terms",
    "/eula",
    "/release-notes",
    "/request-demo",
  ];

  const staticEntries = routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const releaseEntries = releases.map((r) => ({
    url: `${siteUrl}/release-notes/${releaseSlug(r)}`,
    lastModified: new Date(r.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...releaseEntries];
}