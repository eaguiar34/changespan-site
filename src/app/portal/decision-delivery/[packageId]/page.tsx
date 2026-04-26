import { redirect } from "next/navigation";

export default async function RedirectDecisionDeliveryPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  redirect(`/portal/release-candidate/${packageId}`);
}