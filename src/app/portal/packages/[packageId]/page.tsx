import { redirect } from "next/navigation";

export default async function PackageRedirectPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  redirect(`/portal/release-candidate/${packageId}`);
}
