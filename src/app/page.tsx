import Link from "next/link";
import { BarChart3, ClipboardCheck, FileText, GitBranch, ShieldCheck, Upload } from "lucide-react";
import SiteHeader from "@/components/site/header";
import Footer from "@/components/site/footer";

const featureBadges = [
  { title: "CPM", icon: GitBranch, text: "Logic-aware schedule workflows" },
  { title: "RFIs", icon: FileText, text: "Field questions tied to impact narratives" },
  { title: "Submittals", icon: ClipboardCheck, text: "Requirement and review visibility" },
  { title: "Phase Curves", icon: BarChart3, text: "Time-phased reporting and trend views" },
  { title: "Attachments", icon: Upload, text: "Snapshot-linked files and review packages" },
  { title: "Trust Layer", icon: ShieldCheck, text: "Workspace-scoped review and sync accountability" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Closed-loop project controls
              </p>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Desktop-first project controls with portal review, revision history, and attachments.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                ChangeSpan is moving from a connected prototype toward a full product. The next major jump
                adds workspace-level command center visibility, attachment registration, cleaner snapshot
                revision flow, and a more dependable review surface.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/download" className="inline-flex min-w-[198px] items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Download Desktop App
                </Link>
                <Link href="/portal/command-center" className="inline-flex min-w-[198px] items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50">
                  View Portal Command Center
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-500">What this jump adds</p>
                <div className="mt-5 space-y-4 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Workspace command center summary</div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Snapshot attachment registration</div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Cleaner snapshot revision lifecycle</div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">More stable site shell and portal entry</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featureBadges.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                    <Icon className="h-6 w-6 text-slate-900" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
