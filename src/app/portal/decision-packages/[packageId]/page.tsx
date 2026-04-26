import { redirect } from "next/navigation";

export default async function DecisionPackageRedirectPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  redirect(`/portal/release-candidate/${packageId}`);
}
