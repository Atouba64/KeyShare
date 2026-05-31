export function formatPriceUnit(unit: string): string {
  switch (unit) {
    case "HOURLY":
      return "per hr";
    case "DAILY":
      return "per day";
    case "WEEKEND":
      return "per 48hrs";
    case "WEEKLY":
      return "per week";
    default:
      return unit.toLowerCase();
  }
}

export function formatConnectionType(type: string): string {
  switch (type) {
    case "BROWSER_SESSION":
      return "Browser Session";
    case "API_WRAPPER":
      return "API Proxy";
    case "LICENSE_KEY":
      return "License Key";
    default:
      return type;
  }
}

export function formatRole(role: string | null): string {
  switch (role) {
    case "RENTER":
      return "Renter";
    case "PROVIDER":
      return "Provider";
    case "BOTH":
      return "Renter & Provider";
    case "ADMIN":
      return "Admin";
    default:
      return "New User";
  }
}

export function getInitials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export function getRentalDurationMs(unit: string): number {
  switch (unit) {
    case "HOURLY":
      return 60 * 60 * 1000;
    case "DAILY":
      return 24 * 60 * 60 * 1000;
    case "WEEKEND":
      return 48 * 60 * 60 * 1000;
    case "WEEKLY":
      return 7 * 24 * 60 * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000;
  }
}

export function formatTimeRemaining(endTime: Date): string {
  const ms = endTime.getTime() - Date.now();
  if (ms <= 0) return "Expired";

  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return `${days}d ${remHours}h left`;
  }
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export function providerHandle(email: string, name: string | null): string {
  if (name?.trim()) {
    return name.trim().replace(/\s+/g, "_").toLowerCase();
  }
  return email.split("@")[0];
}
