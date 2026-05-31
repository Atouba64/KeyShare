"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getRentalDurationMs } from "@/lib/format";
import { redirect } from "next/navigation";
import type { ActionResult } from "./auth";

const CATEGORY_MAP: Record<string, string> = {
  "E-Learning": "E-Learning",
  "Generative AI": "Generative AI",
  "Dev Tools": "Dev Tools",
  Streaming: "Streaming",
  "Business Data": "Business Data",
  Design: "Design",
  Other: "Other",
};

const CONNECTION_MAP: Record<string, string> = {
  "Browser Session (Extension)": "BROWSER_SESSION",
  "API Wrapper": "API_WRAPPER",
  "License Key / Seat": "LICENSE_KEY",
};

const PRICE_UNIT_MAP: Record<string, string> = {
  Hour: "HOURLY",
  Day: "DAILY",
  "Weekend (48h)": "WEEKEND",
  Week: "WEEKLY",
};

export async function createListing(formData: FormData): Promise<ActionResult> {
  const user = await requireUser();

  const platformName = String(formData.get("platformName") || "").trim();
  const categoryLabel = String(formData.get("category") || "");
  const connectionLabel = String(formData.get("connectionType") || "");
  const price = parseFloat(String(formData.get("price") || "0"));
  const priceUnitLabel = String(formData.get("priceUnit") || "");
  const description = String(formData.get("description") || "").trim() || null;

  if (!platformName || !categoryLabel || !connectionLabel || !priceUnitLabel) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!price || price <= 0) {
    return { success: false, error: "Price must be greater than zero." };
  }

  const category = CATEGORY_MAP[categoryLabel] || categoryLabel;
  const connectionType = CONNECTION_MAP[connectionLabel] || "BROWSER_SESSION";
  const priceUnit = PRICE_UNIT_MAP[priceUnitLabel] || "DAILY";

  await prisma.listing.create({
    data: {
      providerId: user.id,
      title: platformName,
      platformName,
      category,
      description,
      connectionType,
      price,
      priceUnit,
      status: "ACTIVE",
    },
  });

  redirect("/marketplace");
}

export async function createRental(listingId: string): Promise<ActionResult> {
  const user = await requireUser();

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { provider: true },
  });

  if (!listing || listing.status !== "ACTIVE") {
    return { success: false, error: "This listing is no longer available." };
  }

  if (listing.providerId === user.id) {
    return { success: false, error: "You cannot rent your own listing." };
  }

  const activeRental = await prisma.rental.findFirst({
    where: {
      listingId,
      status: "ACTIVE",
      endTime: { gt: new Date() },
    },
  });

  if (activeRental) {
    return { success: false, error: "This listing is currently rented. Try again later." };
  }

  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + getRentalDurationMs(listing.priceUnit));

  const rental = await prisma.rental.create({
    data: {
      listingId: listing.id,
      renterId: user.id,
      startTime,
      endTime,
      totalCost: listing.price,
      status: "ACTIVE",
    },
  });

  await prisma.transaction.create({
    data: {
      userId: user.id,
      rentalId: rental.id,
      amount: listing.price,
      status: "HELD_IN_ESCROW",
    },
  });

  redirect("/dashboard?tab=rentals");
}
