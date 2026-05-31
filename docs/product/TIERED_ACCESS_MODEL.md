# The 3-Tier Product Matrix

From a business and product perspective, offering a single model of credential sharing is dangerous. Different platforms have different levels of security (e.g., Netflix has high geo-fencing; a random AI tool might have none). 

To maximize TAM (Total Addressable Market) while providing upsell opportunities, the Negotiator (KeyShare) offers a **3-Tier Product Matrix**.

---

## Tier 1: Raw Credentials (The "Bronze" Tier)
The most basic, cheapest tier. The Customer pays the lowest fee and receives the raw username and password.

*   **How it works:** Escrow clears, Customer gets credentials, Customer logs in from their own device.
*   **Best For:** Services with zero geo-fencing or loose security policies (e.g., some basic news sites, low-tier SaaS).
*   **The Drawback (The "Impossible Travel" Problem):** If the Servicer is in New York and the Customer is in Vietnam, logging in will trigger a security flag. The Servicer's account risks suspension. The risk is entirely on the Servicer.
*   **Unit Economics:** High margin for us (low infrastructure costs), but high churn due to account bans.

---

## Tier 2: Credential + VPN Tunnel (The "Silver" Tier)
A mid-level tier where the Negotiator provides technical obfuscation alongside the credentials. 

*   **How it works:** The Customer receives the credentials AND access to a VPN profile/proxy. The Negotiator routes the Customer's traffic through an IP address geographically matching the Servicer's home location (e.g., Residential Proxies).
*   **Best For:** Streaming platforms (Netflix, Disney+) and mid-security enterprise tools that check IP addresses but not deep hardware/device fingerprints.
*   **The Advantage:** Bypasses "impossible travel" algorithms. The service sees the login coming from the same city/state as the original Servicer.
*   **Unit Economics:** Medium margin. KeyShare must pay for residential proxy bandwidth or VPN infrastructure, passing this cost to the Customer in the form of a higher subscription fee.

---

## Tier 3: The Remote Machine (The "Gold" Tier / DaaS)
The premium, bulletproof tier. The Customer never sees the credentials. Instead, they access a Remote Lab (Virtual Machine / Browser Isolation) managed by the Negotiator.

*   **How it works:** 
    1. KeyShare spins up a Virtual Machine (e.g., Windows Server or Linux with Kasm Workspaces).
    2. The Servicer logs into the target platform *once* on this VM, dropping the session cookie.
    3. The Customer remotes into this machine via their browser. They use the platform directly within the VM.
*   **Best For:** High-security enterprise tools, Single Sign-On (SSO) gated resources (like corporate learning portals, Okta-gated agency accounts), and extremely sensitive platforms.
*   **The Advantage:** Perfect security. The platform's security algorithms see the *exact same hardware footprint, MAC address, IP address, and browser fingerprint* every time. The Customer cannot steal the credentials because they never see the password—they only see an active session. 
*   **Unit Economics:** Lowest margin percentage, but highest absolute dollar profit. High infrastructure costs (running EC2 instances/VMs), but we can charge a premium SaaS fee. Zero churn from account bans.
