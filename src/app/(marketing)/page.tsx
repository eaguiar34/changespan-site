import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Final workflow consolidation starter</div>
            <h1 className="text-5xl font-black tracking-tight">Project controls built around one operating loop.</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">ChangeSpan helps teams review what changed, assess impact, publish decision-ready packages, and sync responses back into the desktop workflow.</p>
            <div className="mt-8 flex gap-4">
              <a href="/download" className="rounded-full bg-slate-900 px-5 py-3 text-white">Download desktop app</a>
              <a href="/portal/command-center" className="rounded-full border border-slate-300 px-5 py-3 text-slate-900">Open portal</a>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {[["Operations Center", "Start here every day"], ["Changes Inbox", "One queue for RFIs, submittals, documents, and field changes"], ["Change Detail", "Shared impact and traceability layout"], ["Publish + Review", "One closeout flow"]].map(([title, note]) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-4">
                  <div className="font-semibold">{title}</div>
                  <div className="mt-1 text-sm text-slate-500">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
