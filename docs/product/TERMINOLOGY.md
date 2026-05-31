# Platform Terminology & Actor Model

To ensure consistent communication across engineering, product, and business teams, KeyShare utilizes the following terminology to define the actors in our ecosystem.

## 1. The Servicer (aka "Shareant" or "Server")
**Definition:** The individual who owns the original account, license, or subscription and is offering it up for lease on the platform.
*   **Role:** Supply-side provider.
*   **Motivations:** Recoup costs of unused subscriptions (e.g., WGU alumni with active alumni benefits, or current students monetizing unused Udemy/Pluralsight access).
*   **Risks:** Account suspension due to impossible travel, TOS violations, or credential theft.

## 2. The Customer (aka "Searchant" or "Guest")
**Definition:** The individual purchasing temporary or continuous access to the Servicer's resource.
*   **Role:** Demand-side consumer.
*   **Motivations:** Gaining access to premium, expensive resources (certifications, labs, premium IDEs, streaming) at a fraction of the market cost. Bypassing HR "degree" walls by acquiring raw skills (Docker, K8s, AWS) affordably.
*   **Risks:** Losing access mid-month, dealing with complex proxy setups.

## 3. The Negotiator (KeyShare Platform)
**Definition:** Us. The marketplace, escrow agent, and infrastructure provider bridging the gap between the Servicer and the Customer.
*   **Role:** Intermediary, Security layer, Payment gateway.
*   **Motivations:** Capturing transaction fees, SaaS tier fees (VPN/Remote Labs), and building a scalable two-sided marketplace.
*   **Responsibilities:** 
    *   Matchmaking.
    *   Obfuscating technical footprints (VPNs, VMs) to protect the Servicer's account from bans.
    *   Protecting the Customer from fraudulent Servicers via payment escrow.
