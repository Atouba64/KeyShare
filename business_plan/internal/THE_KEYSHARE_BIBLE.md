# The KeyShare Bible (Internal Operations & Strategy)

This document is the absolute source of truth for all KeyShare founders, developers, employees, and operators. If you work here, you must know everything in this document. It answers the fundamental questions of our existence, operations, and technical strategy.

---

## 1. The Core Philosophy (What & Why)
**What is KeyShare?**
KeyShare is a peer-to-peer (P2P) marketplace that acts as an escrow agent and technical proxy for digital subscription sharing. We call ourselves "The Negotiator."

**Why are we building this? (The EdTech Arbitrage)**
The tech hiring and startup market is broken. It requires tools that cost thousands of dollars to acquire (via enterprise licenses like Pluralsight, AWS, JetBrains, ZoomInfo, SEMrush). Meanwhile, massive corporations and funded agencies have free access to these exact tools and use barely 20% of them. We are building the bridge. We allow the "Haves" to monetize their waste, and the "Have-Nots" to access premium resources affordably.

---

## 2. The Actors (Who)
*   **The Servicer (Supply):** The person who legally owns the account/license. They want passive income.
*   **The Customer (Demand):** The person who wants access to the account for a fraction of retail cost.
*   **The Negotiator (Us):** The platform. We provide trust (Escrow payments) and technical stealth (VPNs/Remote Labs) so the Servicer doesn't get banned and the Customer doesn't get scammed.

---

## 3. How It Works (The Mechanics)

### How to Access & Use KeyShare
*   **Platform:** A Next.js web application (accessible via mobile and desktop browsers).
*   **Servicer Flow:** Sign up -> Connect Stripe (for payouts) -> Click "List Resource" -> Select Tier -> Enter Credentials (encrypted) -> Set Monthly Price -> Wait for Customer.
*   **Customer Flow:** Browse Marketplace -> Select Resource -> Pay via Credit Card (Stripe) -> Access Resource via Dashboard (Raw, VPN config, or "Connect to Remote Lab" button).

### How We Make Money (The Economics)
We take a cut of the transaction + a markup on the infrastructure.
1.  **Commission:** 15% of the base rental price set by the Servicer.
2.  **Tier 2 (Silver) Markup:** We charge the Customer $3/mo for the VPN. Our cost is ~$0.50. Profit: $2.50.
3.  **Tier 3 (Gold) Markup:** We charge the Customer $8/mo for the Remote Lab. Our cost is ~$1.50. Profit: $6.50.

---

## 4. The 3-Tier Tech Stack (How We Deliver)

### Tier 1: Bronze (Raw Credentials)
*   **Tech:** AES-256 encryption in PostgreSQL. We display the password to the Customer.
*   **Use Case:** Low-security sites. 

### Tier 2: Silver (VPN Tunnel)
*   **Tech:** We hit the BrightData (or similar) API to spin up a residential proxy matching the Servicer's zip code. We generate a WireGuard config file for the Customer to download.
*   **Use Case:** Netflix, Disney+, standard streaming. Bypasses geo-fencing.

### Tier 3: Gold (Remote Lab / VDI)
*   **Tech:** Ephemeral Docker containers running Linux + Chrome + NoVNC (Kasm Workspaces).
*   **Flow:** The Servicer logs into our container *once*. The session cookie is saved to a persistent Docker volume. When the Customer clicks "Connect", we spin up that specific container and stream the browser to their screen via WebRTC/HTML5 Canvas. 
*   **Use Case:** Corporate Single Sign-On (SSO), High-security Enterprise tools. The Customer never sees the password, and the platform sees a perfect, unchanging hardware fingerprint.

---

## 5. Exhaustive Internal Q&A

### Q: Is this legal?
**A:** There is a difference between "Illegal" (breaking the law) and "TOS Violation" (breaking a company's rules). Sharing passwords is a TOS violation for companies like Netflix or Udemy. We are not breaking laws; we are facilitating a grey market. We protect ourselves by stating KeyShare is an infrastructure provider. We protect our users via Tier 2 and Tier 3 obfuscation.

### Q: What if the Servicer changes the password mid-month to scam the Customer?
**A:** We hold the funds in Escrow (Stripe Connect). If a Customer reports a lockout, they click "Dispute". We pause the payout to the Servicer. If the Servicer does not provide working credentials within 24 hours, the Customer is refunded, and the Servicer's trust score drops (eventual ban).

### Q: What if the Customer changes the Servicer's password and steals the account?
**A:** 
*   In **Tier 1 & 2**, this is a risk. We ban the Customer's credit card and IP, but the Servicer must use account recovery with the host platform.
*   In **Tier 3 (Gold)**, this is impossible. The Customer never sees the password, and we lock down the browser's settings menu inside the Docker container so they cannot view saved passwords or change emails.

### Q: How do we prevent Customers from doing illegal things (hacking, CP, fraud) on our Tier 3 Remote Labs?
**A:** Strict Egress filtering. If a Customer rents a Udemy account, the Docker container's firewall (iptables/DNS routing) is locked down to *only* allow traffic to `*.udemy.com` and required CDNs. If they try to navigate to another site, the connection drops. We also log DNS requests (not payloads) for auditing.

### Q: How do we scale Tier 3 economically? VMs are expensive.
**A:** We do *not* use full AWS EC2 instances per user. We use Dockerized Browser Isolation. A single $40/mo dedicated server (e.g., Hetzner or AWS bare metal) can run 30-50 simultaneous browser containers. Because Customers don't use the service 24/7, we aggressively hibernate containers after 15 minutes of inactivity.

### Q: How does the Corporate / SSO Arbitrage actually work?
**A:** Corporations use Okta/Microsoft SSO. An employee cannot give a stranger their SSO password, as it gives access to internal HR data and emails. 
Using **Tier 3**, the corporate employee remotes into our container and logs into *just* the target app (e.g., Pluralsight) via SSO. They close the window. The Customer pays $15/mo. When the Customer opens the container, they are looking at Pluralsight, authenticated as the employee, but they cannot navigate backward to the corporate portal. It is completely ring-fenced.

### Q: Who sets the price?
**A:** Free market dynamics. The Servicer sets their base asking price (e.g., $10/mo). KeyShare dynamically adds the infrastructure fee (e.g., +$8 for Tier 3) and commission (+15%). The Customer sees the final bundled price ($19.50/mo).

### Q: What is our ultimate endgame?
**A:** Phase 1 is the Grey Market (Netflix, Spotify). Phase 2 is the Enterprise Arbitrage (Corporate perks, B2B SaaS, API Quotas). Phase 3 is becoming a legitimate B2B infrastructure provider where companies use our VDI tech to securely issue temporary access to contractors without creating new SSO seats.