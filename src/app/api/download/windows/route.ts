import { NextResponse } from "next/server";
import { latestWindowsStable } from "@/lib/releases";

export const runtime = "nodejs";

export async function GET() {
  const url = latestWindowsStable.externalUrl;

  // If someone forgot to set it, fail loudly rather than silently downloading "#"
  if (!url || url.startsWith("PASTE_")) {
    return NextResponse.json(
      {
        error:
          "Installer URL not configured. Set latestWindowsStable.externalUrl in src/lib/releases.ts",
      },
      { status: 500 }
    );
  }

  // Temporary redirect (keeps your URL stable, external can change)
  return NextResponse.redirect(url, { status: 302 });
}