import { getSession } from "@/lib/auth";
import { getActiveListings } from "@/lib/queries";
import MarketplaceClient from "@/components/MarketplaceClient";

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  const session = await getSession();
  const listings = await getActiveListings();

  return (
    <MarketplaceClient
      listings={listings}
      isLoggedIn={Boolean(session?.user?.id)}
      userRole={session?.user?.role ?? null}
      userId={session?.user?.id ?? null}
    />
  );
}
