import Link from "next/link";
import { Container } from "@/components/site/container";
import { demoPack } from "@/lib/demoPack";

export default function DemoPackPage() {
  const formEndpoint = process.env.NEXT_PUBLIC_DEMO_PACK_FORM_ENDPOINT || "";

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">{demoPack.title}</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            A self-serve evaluation kit: sample schedules (CSV), a guided workflow, and a short walkthrough video.
            No calls required.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo-pack/thanks"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Get the Demo Pack
            </Link>
            <Link
              href="/download/windows"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Download ChangeSpan (Windows)
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {demoPack.includes.map((section) => (
              <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">{section.title}</div>
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {demoPack.optionalCapture.enabled ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-lg font-semibold">Optional: email me the links</div>
              <p className="mt-2 max-w-2xl text-slate-700">
                Get the Demo Pack links in your inbox (so you don’t lose them). This is optional — the pack is ungated.
              </p>

              {!formEndpoint ? (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  Set <span className="font-mono">NEXT_PUBLIC_DEMO_PACK_FORM_ENDPOINT</span> in{" "}
                  <span className="font-mono">.env.local</span> to enable the capture form (Formspree/Basin). The Demo
                  Pack is still available above.
                </div>
              ) : (
                <form className="mt-6 grid gap-4 md:grid-cols-2" action={formEndpoint} method="POST">
                  {/* Redirect after submit. Update localhost → your real domain after deploy. */}
                  <input
                    type="hidden"
                    name="_redirect"
                    value="http://localhost:3000/demo-pack/thanks?captured=1"
                  />

                  {/* Honeypot */}
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
                      placeholder="Baseline vs updates, TIA narratives, RFI impacts, submittals…"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Send me the links
                    </button>
                    <div className="text-xs text-slate-600">No spam. One email with links, and you’re done.</div>
                  </div>
                </form>
              )}
            </div>
          ) : null}
        </div>
      </Container>
    </main>
  );
}