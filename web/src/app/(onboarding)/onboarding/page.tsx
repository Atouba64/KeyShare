import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { defaultRedirectForRole } from "@/lib/navigation";

export default async function OnboardingPage() {
  const user = await requireUser();
  redirect(defaultRedirectForRole(user.role));
}
