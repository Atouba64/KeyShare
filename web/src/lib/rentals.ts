import { prisma } from "./db";

export async function expireFinishedRentals() {
  await prisma.rental.updateMany({
    where: {
      status: "ACTIVE",
      endTime: { lte: new Date() },
    },
    data: { status: "EXPIRED" },
  });
}
