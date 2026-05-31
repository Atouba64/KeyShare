"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { setSession, clearSession } from "@/lib/auth";

export type ActionResult = {
  success: boolean;
  error?: string;
};

function isAdminEmail(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  return adminEmail ? email.toLowerCase() === adminEmail : false;
}

export async function registerUser(formData: FormData): Promise<ActionResult> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const role = isAdminEmail(email) ? "ADMIN" : null;

  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  await setSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect(role ? "/dashboard" : "/onboarding");
}

export async function loginUser(formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.passwordHash) {
    return { success: false, error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid email or password." };
  }

  await setSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  if (!user.role) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}

export async function logoutUser() {
  await clearSession();
  redirect("/login");
}

export async function updateUserRole(role: string): Promise<ActionResult> {
  const { requireUser } = await import("@/lib/auth");
  const user = await requireUser();

  const allowed = ["RENTER", "PROVIDER", "BOTH"];
  if (!allowed.includes(role)) {
    return { success: false, error: "Invalid role selected." };
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { role },
  });

  await setSession({
    id: updated.id,
    email: updated.email,
    name: updated.name,
    role: updated.role,
  });

  redirect("/dashboard");
}
