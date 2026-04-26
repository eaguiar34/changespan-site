import { demoPackLinks } from "@/lib/demoPackLinks";

export const demoPack = {
  title: "ChangeSpan Demo Pack",
  zip: {
    href: demoPackLinks.downloadUrl,
    fileName: demoPackLinks.zipFileName,
    sizeNote: "ZIP • includes sample CSV schedules",
  },
  includes: [
    {
      title: "Sample schedules (CSV)",
      bullets: [
        "Small sample (quick baseline → update)",
        "Medium sample (more realistic activity count)",
        "Import-ready CSV format for ChangeSpan",
      ],
    },
    {
      title: "Guided workflow (10–20 minutes)",
      bullets: [
        "Import schedule",
        "Set baseline",
        "Apply an update/event",
        "Export comparison / artifacts",
      ],
    },
    {
      title: "Walkthrough video (short)",
      bullets: [
        "Install → import → baseline → update → outputs",
        "Add an embed link when your video is ready",
      ],
    },
  ],
  walkthrough: {
    videoEmbedUrl: "",
    pageHref: "/tutorials/getting-started",
  },
  optionalCapture: {
    enabled: true,
  },
};