import Link from "next/link";
import { Container } from "@/components/site/container";

export default function HowItWorksPage() {
  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">How it works</h1>
          <p className="mt-3 max-w-3xl text-slate-700">
            ChangeSpan is built around closed-loop project controls. The schedule is not a picture—it’s a model that
            drives results, forecast, impacts, and explainability.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-sm font-semibold">Closed-loop model</div>
            <div className="mt-5 grid gap-4 md:grid-cols-5">
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <div className="font-semibold">1) Schedule logic</div>
                <div className="mt-1 text-slate-600">Activities, ties, constraints</div>
              </div>
              <div className="flex items-center justify-center text-slate-400">→</div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <div className="font-semibold">2) Results</div>
                <div className="mt-1 text-slate-600">Dates, float, critical path</div>
              </div>
              <div className="flex items-center justify-center text-slate-400">→</div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <div className="font-semibold">3) Controls + forecast</div>
                <div className="mt-1 text-slate-600">Work packages + curves</div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-5">
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <div className="font-semibold">4) Impacts + scenarios</div>
                <div className="mt-1 text-slate-600">Compare changes safely</div>
              </div>
              <div className="flex items-center justify-center text-slate-400">→</div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm md:col-span-3">
                <div className="font-semibold">5) Explainability</div>
                <div className="mt-1 text-slate-600">
                  “Why did it change?” tied to events, assumptions, and logic.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">Explainability is a feature, not a promise</div>
              <p className="mt-2 text-slate-700">
                When dates or costs move, ChangeSpan is designed to show the chain of reasoning: what changed, where it
                propagated, and what assumptions were used.
              </p>
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Visual placeholder: “Why did it change?” panel
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">Scenario compare keeps baselines safe</div>
              <p className="mt-2 text-slate-700">
                Run alternatives without corrupting the baseline. Compare outcomes side-by-side and keep review
                workflows clean.
              </p>
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Visual placeholder: Baseline vs Scenario compare
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/join-beta"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Join Beta
            </Link>
            <Link
              href="/collaboration"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
            >
              Collaboration model
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}