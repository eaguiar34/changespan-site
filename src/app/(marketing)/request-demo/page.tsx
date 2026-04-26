import Link from "next/link";
import RequestDemoForm from "@/components/site/request-demo-form";

export default function RequestDemoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_440px]">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Request Demo
            </p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-950">
              Request a walkthrough of the ChangeSpan workflow.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Use this page to request a product walkthrough focused on how
              ChangeSpan fits desktop-first project controls work, portal review,
              and desktop sync.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-950">
                  Desktop workflow
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  See how schedules, controls records, and project context stay in
                  the desktop app.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-950">
                  Review portal
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  See how browser-based reviewers comment, approve, and reject
                  against a stable snapshot revision.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-950">
                  Closed loop
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  See how review events sync back into the desktop workflow and
                  strengthen the project record.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                What the walkthrough can cover
              </h2>
              <div className="mt-5 space-y-3 text-slate-600">
                <p>• Desktop-first controls workflow</p>
                <p>• Snapshot publishing and portal review</p>
                <p>• Review sync back into desktop</p>
                <p>• How ChangeSpan differs from browser-only systems</p>
                <p>• Where the product is headed next</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Demo request form
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Tell us about your team
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This form now posts directly to the ChangeSpan API and saves the
              submission for review in the portal admin page.
            </p>

            <RequestDemoForm />

            <div className="mt-6 text-sm text-slate-600">
              Prefer to start yourself?{" "}
              <Link
                href="/download"
                className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              >
                Go to Download
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}