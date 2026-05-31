import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import OnboardingForm from "@/components/OnboardingForm";

export default async function OnboardingPage() {
  const user = await requireUser();

  if (user.role) {
    redirect(user.role === "ADMIN" ? "/admin" : "/dashboard");
  }

  return <OnboardingForm />;
}
