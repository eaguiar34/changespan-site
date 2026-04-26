import { NextResponse } from "next/server";
import { demoPackLinks } from "@/lib/demoPackLinks";

export const runtime = "nodejs";

export async function GET() {
  const url = demoPackLinks.externalUrl;

  if (!url || url.startsWith("PASTE_")) {
    return NextResponse.json(
      {
        error:
          "Demo Pack URL not configured. Set demoPackLinks.externalUrl in src/lib/demoPackLinks.ts",
      },
      { status: 500 }
    );
  }

  return NextResponse.redirect(url, { status: 302 });
}