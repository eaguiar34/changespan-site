export type Release = {
  version: string; // e.g. "0.1.0"
  date: string; // YYYY-MM-DD
  platform: "windows";
  channel: "stable" | "beta";
  fileName: string; // e.g. "ChangeSpan-Setup-v0.1.0.exe"

  /**
   * downloadUrl is what the WEBSITE uses. Keep it stable.
   * We route it through /api/download/windows so you never change buttons/links.
   */
  downloadUrl: string; // e.g. "/api/download/windows"

  /**
   * externalUrl is where the binary actually lives (GitHub Releases / R2).
   * Update this per release.
   */
  externalUrl: string;

  sha256: string; // SHA-256 checksum
  sizeNote?: string; // e.g. "115 MB"
  highlights: string[];
  fixes?: string[];
  knownIssues?: string[];
};

export const releases: Release[] = [
  {
    version: "0.1.0",
    date: "2026-03-09",
    platform: "windows",
    channel: "stable",
    fileName: "ChangeSpan-Setup-v0.1.0.exe",
    downloadUrl: "/api/download/windows",
    externalUrl: "PASTE_DIRECT_INSTALLER_URL_HERE",
    sha256: "PASTE_SHA256_HERE",
    sizeNote: "",
    highlights: [
      "Initial public evaluation build.",
      "Core scheduling + project controls workflows (desktop).",
      "Export-friendly artifacts for review.",
    ],
    fixes: [],
    knownIssues: [
      "Windows SmartScreen may warn on early unsigned releases. Verify the SHA-256 checksum on the download page.",
    ],
  },
];

// Latest stable Windows release
export const latestWindowsStable: Release =
  releases
    .filter((r) => r.platform === "windows" && r.channel === "stable")
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0] ?? releases[0];

export function releaseSlug(r: Release) {
  return `v${r.version.replace(/\./g, "-")}`;
}

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((r) => releaseSlug(r) === slug);
}