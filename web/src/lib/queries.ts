import { prisma } from "./db";
import { expireFinishedRentals } from "./rentals";

export async function getActiveListings() {
  await expireFinishedRentals();

  return prisma.listing.findMany({
    where: { status: "ACTIVE" },
    include: {
      provider: {
        select: { id: true, name: true, email: true },
      },
      rentals: {
        where: {
          status: "ACTIVE",
          endTime: { gt: new Date() },
        },
        select: { id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDashboardData(userId: string) {
  await expireFinishedRentals();

  const [user, providingRentals, usingRentals, listings, earnings] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    }),
    prisma.rental.findMany({
      where: {
        listing: { providerId: userId },
        status: "ACTIVE",
        endTime: { gt: new Date() },
      },
      include: {
        listing: true,
        renter: { select: { name: true, email: true } },
      },
      orderBy: { endTime: "asc" },
    }),
    prisma.rental.findMany({
      where: {
        renterId: userId,
        status: "ACTIVE",
        endTime: { gt: new Date() },
      },
      include: {
        listing: {
          include: {
            provider: { select: { name: true, email: true } },
          },
        },
      },
      orderBy: { endTime: "asc" },
    }),
    prisma.listing.findMany({
      where: { providerId: userId },
      include: {
        rentals: {
          where: { status: { in: ["ACTIVE", "EXPIRED"] } },
          select: { id: true, totalCost: true, status: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.transaction.aggregate({
      where: {
        userId,
        status: "RELEASED_TO_PROVIDER",
      },
      _sum: { amount: true },
    }),
  ]);

  const activeProvidingCount = providingRentals.length;
  const activeUsingCount = usingRentals.length;
  const totalEarnings = earnings._sum.amount || 0;
  const todayEarnings = providingRentals.reduce((sum, r) => sum + r.totalCost, 0);

  return {
    user,
    providingRentals,
    usingRentals,
    listings,
    stats: {
      totalEarnings,
      activeProvidingCount,
      activeUsingCount,
      todayEarnings,
    },
  };
}

export async function getAdminOverview() {
  await expireFinishedRentals();

  const [userCount, activeRentals, transactions, recentRentals, flaggedCount] = await Promise.all([
    prisma.user.count(),
    prisma.rental.count({
      where: { status: "ACTIVE", endTime: { gt: new Date() } },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.rental.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        listing: { select: { title: true } },
        renter: { select: { email: true, name: true } },
      },
    }),
    prisma.rental.count({ where: { status: "DISPUTED" } }),
  ]);

  const gmv = transactions._sum.amount || 0;

  return {
    userCount,
    activeRentals,
    gmv,
    platformFee: gmv * 0.1,
    flaggedCount,
    recentRentals,
  };
}

export async function getAdminUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          providedListings: true,
          rentals: true,
        },
      },
    },
  });
}
