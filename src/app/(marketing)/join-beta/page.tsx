import Link from "next/link";
import { Container } from "@/components/site/container";

export default function JoinBetaPage() {
  const formEndpoint = process.env.NEXT_PUBLIC_DEMO_PACK_FORM_ENDPOINT || "";

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Join the invite-only beta</h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            ChangeSpan is an offline-first desktop app for closed-loop project controls: schedule logic → results →
            controls/cost forecast → impacts/scenarios → explainability. We’re starting with federal heavy civil and
            expanding to DOT and vertical.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">What you’ll get in beta</div>
              <ul className="mt-3 list-disc pl-5 text-slate-700">
                <li>Windows beta invite link (as capacity allows)</li>
                <li>Sample project files (CSV) for evaluation</li>
                <li>Guides for the closed-loop workflow</li>
              </ul>

              <div className="mt-6 text-sm text-slate-600">
                Beta is invite-only so we can keep feedback tight and support manageable.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-lg font-semibold">Trust & model</div>
              <ul className="mt-3 list-disc pl-5 text-slate-700">
                <li>Offline-first (no mandatory cloud)</li>
                <li>File-based project folders</li>
                <li>Audit trail + snapshots</li>
                <li>Lock/read-only safety</li>
              </ul>
              <div className="mt-6">
                <Link href="/collaboration" className="text-sm font-semibold text-slate-900 hover:underline">
                  See the collaboration model →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm text-slate-500">Invite request</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Get on the beta list</h2>
                <p className="mt-2 text-slate-700">
                  Drop your email and a little context. We’ll send an invite link as slots open.
                </p>

                {!formEndpoint ? (
                  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    Set <span className="font-mono">NEXT_PUBLIC_DEMO_PACK_FORM_ENDPOINT</span> in{" "}
                    <span className="font-mono">.env.local</span> to enable the invite form (Formspree/Basin).
                  </div>
                ) : (
                  <form className="mt-6 grid gap-4 md:grid-cols-2" action={formEndpoint} method="POST">
                    <input type="hidden" name="_subject" value="ChangeSpan Beta Invite Request" />
                    <input
                      type="hidden"
                      name="_redirect"
                      value="http://localhost:3000/join-beta/thanks?captured=1"
                    />
                    <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div>
                      <label className="text-sm font-semibold">Name</label>
                      <input
                        name="name"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold">Company</label>
                      <input
                        name="company"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2"
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold">Role</label>
                      <input
                        name="role"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2"
                        placeholder="Project Engineer, Scheduler, Controls…"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold">What are you trying to solve?</label>
                      <textarea
                        name="intent"
                        rows={4}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2"
                        placeholder="Baseline vs updates, scenario compare, schedule-driven forecasting, explainability…"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Join Beta
                      </button>
                      <div className="text-xs text-slate-600">No spam. Invite + occasional beta notes only.</div>
                    </div>
                  </form>
                )}

                <div className="mt-6 text-sm text-slate-600">
                  Questions instead?{" "}
                  <Link href="/request-demo" className="font-semibold text-slate-900 hover:underline">
                    Request a walkthrough →
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold">Windows requirements</div>
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                  <li>Windows 10/11 (64-bit)</li>
                  <li>8 GB RAM recommended (16 GB for large schedules)</li>
                  <li>500 MB free disk space</li>
                  <li>1920×1080 recommended</li>
                </ul>

                <div className="mt-8 text-sm font-semibold">Want to evaluate now?</div>
                <p className="mt-2 text-sm text-slate-700">
                  Download sample CSV schedules and follow a guided workflow.
                </p>
                <Link
                  href="/join-beta/thanks"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Get sample files (CSV)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}