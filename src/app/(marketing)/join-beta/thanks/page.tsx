import { Container } from "@/components/site/container";
import Link from "next/link";

export default function JoinBetaThanksPage({
  searchParams,
}: {
  searchParams?: { captured?: string };
}) {
  const captured = searchParams?.captured === "1";

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">You’re on the list</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            We’ll email your beta invite link as slots open. In the meantime, you can download sample CSV schedules and
            walk through the closed-loop workflow.
          </p>

          {captured ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              Invite request received — watch your inbox.
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm text-slate-500">Sample files</div>
                <div className="mt-2 text-xl font-semibold">Sample CSV schedules (ZIP)</div>
                <p className="mt-2 text-slate-700">
                  Small + medium samples you can import to understand the workflow and outputs.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/api/download/demo-pack"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Download sample ZIP
                  </a>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                  >
                    Review how it works
                  </Link>
                </div>

                <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold">Try this workflow (10–20 minutes)</div>
                  <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700">
                    <li>Download the sample ZIP</li>
                    <li>Import the Small sample CSV</li>
                    <li>Run schedule results and review deltas</li>
                    <li>Compare a scenario and document “why”</li>
                    <li>Preview schedule-driven forecast curves</li>
                  </ol>
                  <div className="mt-4 text-sm">
                    <Link href="/tutorials" className="font-semibold text-slate-900 hover:underline">
                      Browse Guides →
                    </Link>
                  </div>
                </div>

                <div className="mt-8 text-sm text-slate-600">
                  Questions?{" "}
                  <Link href="/request-demo" className="font-semibold text-slate-900 hover:underline">
                    Request a walkthrough →
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold">What’s inside</div>
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                  <li>Small sample schedule (CSV)</li>
                  <li>Medium sample schedule (CSV)</li>
                  <li>README with import notes</li>
                </ul>

                <div className="mt-10 text-sm font-semibold">Privacy & trust</div>
                <p className="mt-2 text-sm text-slate-700">
                  Offline-first, file-based projects, and no mandatory cloud. That’s the whole point.
                </p>
                <div className="mt-4">
                  <Link href="/collaboration" className="text-sm font-semibold text-slate-900 hover:underline">
                    Collaboration model →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-sm text-slate-600">
            Share internally: <span className="font-mono">/join-beta</span>
          </div>
        </div>
      </Container>
    </main>
  );
}