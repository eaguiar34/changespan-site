import Link from "next/link";
import { Container } from "@/components/site/container";
import { latestWindowsStable, releaseSlug } from "@/lib/releases";
import { track } from "@/lib/analytics";

export default function WindowsDownloadPage() {
  const latest = latestWindowsStable;
  const notesSlug = releaseSlug(latest);

  return (
    <main>
      <Container>
        <div className="py-14 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Download for Windows</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            Install the latest stable release. Verify the checksum for confidence.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm text-slate-500">Latest stable</div>
                <div className="mt-1 text-xl font-semibold">v{latest.version}</div>
                <div className="mt-1 text-sm text-slate-600">{latest.date}</div>
                <div className="mt-3 text-sm text-slate-700">{latest.fileName}</div>
                {latest.sizeNote ? <div className="mt-1 text-sm text-slate-600">{latest.sizeNote}</div> : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={latest.downloadUrl}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  onClick={() => track("WindowsInstallerDownload")}
                >
                  Download installer
                </a>
                <Link
                  href={`/release-notes/${notesSlug}`}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Release notes
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold">SHA-256</div>
              <div className="mt-2 break-all font-mono text-xs text-slate-700">{latest.sha256}</div>

              <div className="mt-4 text-sm text-slate-700">
                Verify on Windows (PowerShell):
                <div className="mt-2 rounded-lg bg-slate-950 p-3 font-mono text-xs text-slate-50">
                  Get-FileHash .\{latest.fileName} -Algorithm SHA256
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="text-sm font-semibold">System requirements</div>
              <ul className="mt-3 list-disc pl-5 text-slate-700">
                <li>Windows 10/11 (64-bit)</li>
                <li>8 GB RAM recommended (16 GB for large schedules)</li>
                <li>500 MB free disk space</li>
                <li>1920×1080 recommended</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-semibold">Self-serve evaluation</div>
              <p className="mt-3 text-slate-700">
                Download sample schedules (CSV) + follow a guided workflow in 10–20 minutes.
              </p>
              <Link
                href="/demo-pack"
                className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Get the Demo Pack
              </Link>
            </div>
          </div>

          <p className="mt-10 text-sm text-slate-600">
            Note: Early releases may trigger Windows SmartScreen. Always download from official links and verify the
            checksum.
          </p>
        </div>
      </Container>
    </main>
  );
}