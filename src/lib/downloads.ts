export type DownloadArtifact = {
  version: string;
  channel: string;
  platform: string;
  installerName: string;
  installerUrl: string;
  sha256: string;
  fileSize: string;
  publishedAt: string;
  notes: string;
};

export const downloadArtifacts: DownloadArtifact[] = [
  {
    version: "0.3.0",
    channel: "beta",
    platform: "Windows x64",
    installerName: "ChangeSpan-Setup-0.3.0.exe",
    installerUrl: "#",
    sha256: "ADD_REAL_SHA256_FOR_0_3_0",
    fileSize: "TBD",
    publishedAt: "2026-04-11",
    notes: "Portal review loop, multi-snapshot portal selection, sync CLI improvements.",
  },
  {
    version: "0.2.0",
    channel: "beta",
    platform: "Windows x64",
    installerName: "ChangeSpan-Setup-0.2.0.exe",
    installerUrl: "#",
    sha256: "ADD_REAL_SHA256_FOR_0_2_0",
    fileSize: "TBD",
    publishedAt: "2026-04-05",
    notes: "Initial desktop-to-portal sync proof and review event workflow.",
  },
];