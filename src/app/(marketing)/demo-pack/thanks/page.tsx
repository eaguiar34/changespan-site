import Link from "next/link";
import { Container } from "@/components/site/container";
import { demoPack } from "@/lib/demoPack";
import { track } from "@/lib/analytics";

export default function DemoPackThanksPage({
  searchParams,
}: {
  searchParams?: { captured?: string };
}) {
  const captured = searchParams?.captured === "1";

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Demo Pack</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            Download the sample files and follow the guided workflow. If you haven’t installed ChangeSpan yet, grab the
            Windows installer first.
          </p>

          {captured ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              Got it — we’ll email you the Demo Pack links shortly.
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm text-slate-500">Download</div>
                <div className="mt-2 text-xl font-semibold">{demoPack.zip.fileName}</div>
                <div className="mt-1 text-sm text-slate-600">{demoPack.zip.sizeNote}</div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={demoPack.zip.href}
                    download
                    onClick={() => track("DemoPackDownload")}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Download Demo Pack (ZIP)
                  </a>
                  <Link
                    href="/download/windows"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                    onClick={() => track("WindowsInstallerFromDemoPack")}
                  >
                    Download ChangeSpan (Windows)
                  </Link>
                </div>

                <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold">Try this workflow (10–20 minutes)</div>
                  <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700">
                    <li>Install ChangeSpan</li>
                    <li>Import the Small sample CSV</li>
                    <li>Set a baseline</li>
                    <li>Apply the update/event (or open the Medium sample)</li>
                    <li>Export a comparison/artifact you can review</li>
                  </ol>

                  <div className="mt-4 text-sm">
                    <Link href={demoPack.walkthrough.pageHref} className="font-semibold text-slate-900 hover:underline">
                      Follow the “Getting Started” tutorial →
                    </Link>
                  </div>
                </div>
              </div>

              {demoPack.walkthrough.videoEmbedUrl ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <iframe
                    className="aspect-video w-full"
                    src={demoPack.walkthrough.videoEmbedUrl}
                    title="ChangeSpan walkthrough video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-sm font-semibold">Walkthrough video</div>
                  <p className="mt-2 text-slate-700">
                    Add a video embed URL in <span className="font-mono text-sm">src/lib/demoPack.ts</span> when ready.
                  </p>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold">What’s inside the ZIP</div>
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                  <li>Small sample schedule (CSV)</li>
                  <li>Medium sample schedule (CSV)</li>
                  <li>README with import notes</li>
                </ul>

                <div className="mt-10 text-sm font-semibold">Need help?</div>
                <p className="mt-2 text-sm text-slate-700">
                  Add a support email here. Later we can add “office hours” without turning it into sales calls.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-sm text-slate-600">
            Tip: If you share ChangeSpan internally, send teammates this link: <span className="font-mono">/demo-pack</span>
          </div>
        </div>
      </Container>
    </main>
  );
}