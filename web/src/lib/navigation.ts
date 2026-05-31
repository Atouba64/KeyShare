export function safeNextPath(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/marketplace";
  }
  return next;
}

export function defaultRedirectForRole(role: string | null): string {
  if (role === "ADMIN") return "/admin";
  return "/marketplace";
}
