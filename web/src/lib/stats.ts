import { prisma } from "@/lib/db";

export async function getPlatformStats() {
  const [listingCount, userCount, rentalCount] = await Promise.all([
    prisma.listing.count({ where: { status: "ACTIVE" } }),
    prisma.user.count(),
    prisma.rental.count(),
  ]);

  return { listingCount, userCount, rentalCount };
}
