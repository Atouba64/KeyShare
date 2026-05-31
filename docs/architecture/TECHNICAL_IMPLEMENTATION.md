# Deep Technical Implementation

This document outlines the concrete technical architecture, database schemas, and infrastructure pipelines required to make KeyShare (The Negotiator) a reality.

## 1. Core Technology Stack

*   **Frontend (Web App):** Next.js 14 (App Router), React, Tailwind CSS, Shadcn UI (for rapid component development).
*   **Backend API:** Next.js Server Actions & API Routes (Node.js).
*   **Database:** PostgreSQL, managed via Prisma ORM or Drizzle.
*   **Payments & Escrow:** Stripe Connect (Custom accounts).
*   **Tier 2 (VPN) Infrastructure:** WireGuard VPN API / Integration with BrightData (Residential Proxies).
*   **Tier 3 (VDI) Infrastructure:** Kasm Workspaces API or Apache Guacamole + Docker on AWS EC2 or DigitalOcean Droplets.

## 2. Infrastructure Workflows

### Tier 2: Credential + VPN Tunnel (Workflow)
1.  **Supply Side:** Servicer lists an account and provides their home IP address region (e.g., Texas, USA).
2.  **Demand Side:** Customer rents the account.
3.  **Provisioning:** 
    *   KeyShare Backend hits the BrightData (or similar residential proxy provider) API to lease a Residential IP in Texas, USA.
    *   KeyShare generates a `.ovpn` or WireGuard configuration file tied to this proxy.
4.  **Delivery:** Customer receives the credentials + a download link for the VPN profile. They are instructed to turn on the VPN *before* logging in.

### Tier 3: Remote Machine / Browser Isolation (Workflow)
1.  **Environment Generation:** KeyShare maintains a fleet of Docker hosts (e.g., Ubuntu VMs running Docker engine).
2.  **Container Spin-up:** When a Tier 3 order is confirmed, KeyShare's backend makes an API call to the Docker host:
    ```bash
    docker run -d --name session_1234 -p 6901:6901 -e VNC_PW=password kasmweb/chrome:1.14.0
    ```
    *(Note: In production, we use Kasm Workspaces API to manage these programmatically).*
3.  **Servicer Seeding:** The Servicer connects to `https://keyshare.app/vdi/session_1234` (proxied via Nginx to the container's NoVNC port). They log into the target service (e.g., Pluralsight), check "Remember Me", and disconnect. The Docker volume containing the Chrome profile `~/.config/google-chrome` is persisted.
4.  **Customer Hand-off:** The Customer clicks "Connect" on their dashboard. KeyShare spins the container back up, mounting the persisted volume. The Customer accesses the container via their browser. They are already logged in. 
5.  **Data Destruction:** Once the rental period ends, the container and its volume are destroyed.

## 3. Database Schema (PostgreSQL)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  role          Role     // CUSTOMER, SERVICER, ADMIN
  stripeAccId   String?  // For Servicer payouts
  listings      Listing[]
  rentals       Rental[]
}

model Listing {
  id            String   @id @default(cuid())
  servicerId    String
  servicer      User     @relation(fields: [servicerId], references: [id])
  platformName  String   // e.g., "Udemy Business", "Netflix"
  tier          Int      // 1, 2, or 3
  pricePerMonth Float
  status        String   // ACTIVE, RENTED, PAUSED
  credentials   String   // Encrypted JSON
  rentals       Rental[]
}

model Rental {
  id            String   @id @default(cuid())
  listingId     String
  listing       Listing  @relation(fields: [listingId], references: [id])
  customerId    String
  customer      User     @relation(fields: [customerId], references: [id])
  startDate     DateTime @default(now())
  endDate       DateTime
  vdiEndpoint   String?  // URL for Tier 3 access
  vpnConfig     String?  // VPN file URL for Tier 2
  status        String   // ACTIVE, EXPIRED, DISPUTED
}
```

## 4. Payment Escrow Flow (Stripe Connect)
1. Customer pays $15/mo. Stripe holds funds in KeyShare's platform account (Escrow).
2. KeyShare verifies the rental has been active for 48 hours without disputes.
3. KeyShare takes a $3 platform fee (Negotiator fee) and transfers $12 to the Servicer's Stripe Connected Account.
