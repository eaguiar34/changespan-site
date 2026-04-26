import Link from "next/link";
import { Container } from "@/components/site/container";

const sections = [
  {
    title: "CPM scheduling that stays clean",
    points: [
      "Baseline vs update comparisons",
      "Export-friendly artifacts",
      "Workflow designed for real project conversations",
    ],
  },
  {
    title: "RFIs + impact modeling",
    points: [
      "Connect events to time impacts",
      "Keep a defensible narrative",
      "Reduce “why did the date move?” chaos",
    ],
  },
  {
    title: "Submittals / spec matching",
    points: [
      "Track requirements and submittals",
      "Stay ahead of missing scope and long-lead risks",
      "Simple views your team will actually use",
    ],
  },
  {
    title: "Cost / time-phased curves",
    points: [
      "Time-phase costs for reporting",
      "Trend visibility without spreadsheet pain",
      "Clear outputs for stakeholders",
    ],
  },
];

export default function TourPage() {
  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Product tour</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            A quick walkthrough of what ChangeSpan does and how it fits real controls workflows.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo-pack"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Get Demo Pack
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
            >
              Explore features
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {sections.map((s) => (
              <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold">{s.title}</div>
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Screenshot/video clip placeholder (we’ll replace with real captures).
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}