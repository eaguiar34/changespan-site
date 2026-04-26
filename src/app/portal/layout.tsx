import Link from "next/link";
import { ReactNode } from "react";
import { getPlatformVersion } from "@/lib/api";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  let version = "unknown";
  try {
    const data = await getPlatformVersion();
    version = data.version || version;
  } catch {}

  const items = [
    { href: "/portal/release-candidate", label: "Packages" },
    { href: "/portal/release-candidate", label: "Dashboard" },
    { href: "/portal/release-candidate", label: "Attachments" },
    { href: "/portal/release-candidate", label: "Exports" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">Portal status:</span> ChangeSpan API • v{version}
        </div>
        <nav className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
}
