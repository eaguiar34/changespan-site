import { ReactNode } from "react";
import { getFeatureFlags, getNavModel } from "@/lib/platform";
import { LayeredNav } from "@/components/portal/layered-nav";

export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [flags, nav] = await Promise.all([getFeatureFlags(), getNavModel()]);
  const advancedMode = !!flags?.supported_tools;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <LayeredNav
          primary={nav.primary}
          advanced={nav.advanced}
          advancedMode={advancedMode}
        />
        {children}
      </div>
    </div>
  );
}
