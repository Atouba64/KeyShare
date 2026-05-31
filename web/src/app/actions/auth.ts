"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { setSession, clearSession } from "@/lib/auth";
import { defaultRedirectForRole, safeNextPath } from "@/lib/navigation";

export type ActionResult = {
  success: boolean;
  error?: string;
};

function isAdminEmail(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  return adminEmail ? email.toLowerCase() === adminEmail : false;
}

function resolveRole(email: string) {
  return isAdminEmail(email) ? "ADMIN" : "BOTH";
}

export async function registerUser(formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const nameInput = String(formData.get("name") || "").trim();
  const next = safeNextPath(String(formData.get("next") || ""));

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const role = resolveRole(email);
  const name = nameInput || email.split("@")[0];

  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  await setSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect(next || defaultRedirectForRole(role));
}

export async function loginUser(formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(String(formData.get("next") || ""));

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user?.passwordHash) {
    return { success: false, error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid email or password." };
  }

  // Backfill role for older accounts created before auto-role assignment
  if (!user.role) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { role: resolveRole(email) },
    });
  }

  await setSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect(next || defaultRedirectForRole(user.role));
}

export async function logoutUser() {
  await clearSession();
  redirect("/");
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
