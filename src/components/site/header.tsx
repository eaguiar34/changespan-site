import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 font-semibold text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-900">CS</span>
          <span>
            <span className="block text-base font-bold">ChangeSpan</span>
            <span className="block text-xs text-slate-500">Track change. Understand impact.</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-700">
          <Link href="/features">Features</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/download">Download</Link>
          <Link href="/signin" className="rounded-full bg-slate-900 px-4 py-2 text-white">Portal</Link>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
