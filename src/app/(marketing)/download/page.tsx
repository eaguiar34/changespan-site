import Link from "next/link";
import { downloadArtifacts } from "@/lib/downloads";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-4xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Download
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Get the ChangeSpan desktop app
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Install the Windows desktop app for local project controls work, then use
            the browser portal for review, comments, and approvals from the same site.
          </p>
        </div>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                ChangeSpan Desktop for Windows
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Best for project teams managing local schedules, controls data, review
                publishing, and desktop sync.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signin?next=/portal"
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign in to Portal
              </Link>
              <Link
                href="/portal"
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Portal
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">System requirements</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">OS:</span> Windows 10 or Windows 11</p>
              <p><span className="font-semibold text-slate-900">RAM:</span> 8 GB minimum</p>
              <p><span className="font-semibold text-slate-900">Storage:</span> 1 GB free space minimum</p>
              <p><span className="font-semibold text-slate-900">Network:</span> Internet needed for portal sync features</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Release workflow</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Installer link:</span> replace placeholder links with hosted builds</p>
              <p><span className="font-semibold text-slate-900">Checksum:</span> paste the real SHA-256 for each release</p>
              <p><span className="font-semibold text-slate-900">Recommended host:</span> GitHub Releases, S3, or R2</p>
              <p><span className="font-semibold text-slate-900">Review flow:</span> desktop publish → portal review → desktop sync</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-950">Downloads table</h2>
            <p className="mt-2 text-sm text-slate-600">
              Replace the placeholder installer URLs, file sizes, and checksum values
              with the actual packaged release data.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Version</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Channel</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Platform</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Installer</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">SHA-256</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Size</th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Published</th>
                </tr>
              </thead>
              <tbody>
                {downloadArtifacts.map((artifact) => (
                  <tr key={`${artifact.version}-${artifact.platform}`}>
                    <td className="border-b border-slate-100 px-4 py-4 text-sm font-semibold text-slate-900">
                      {artifact.version}
                    </td>
                    <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-700">
                      {artifact.channel}
                    </td>
                    <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-700">
                      {artifact.platform}
                    </td>
                    <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-700">
                      <div className="flex flex-col gap-1">
                        <a
                          href={artifact.installerUrl}
                          className="font-semibold text-slate-900 underline-offset-4 hover:underline"
                        >
                          {artifact.installerName}
                        </a>
                        <span className="text-xs text-slate-500">{artifact.notes}</span>
                      </div>
                    </td>
                    <td className="border-b border-slate-100 px-4 py-4 text-xs text-slate-600">
                      {artifact.sha256}
                    </td>
                    <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-700">
                      {artifact.fileSize}
                    </td>
                    <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-700">
                      {artifact.publishedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}