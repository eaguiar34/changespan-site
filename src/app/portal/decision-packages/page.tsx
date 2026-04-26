import { redirect } from "next/navigation";

export default function RedirectLegacyPage() {
  redirect("/portal/release-candidate");
}
