import Link from "next/link";

type Item = { key: string; label: string };

export function LayeredNav({
  primary,
  advanced,
  advancedMode,
}: {
  primary: Item[];
  advanced: Item[];
  advancedMode: boolean;
}) {
  const routeFor = (key: string) => {
    switch (key) {
      case "dashboard":
      case "packages":
      case "attachments":
      case "exports":
        return "/portal/release-candidate";
      case "admin":
        return "/portal/admin/workspace";
      case "action_board":
        return "/portal/pm-action-board?advanced=1";
      case "reviewer_queue":
        return "/portal/reviewer-queue?advanced=1";
      case "executive_report":
        return "/portal/executive-report?advanced=1";
      default:
        return "/portal/release-candidate";
    }
  };

  return (
    <nav className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-3">
        {primary.map((item) => (
          <Link
            key={item.key}
            href={routeFor(item.key)}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900"
          >
            {item.label}
          </Link>
        ))}
        {advancedMode
          ? advanced.map((item) => (
              <Link
                key={item.key}
                href={routeFor(item.key)}
                className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {item.label}
              </Link>
            ))
          : null}
      </div>
    </nav>
  );
}
