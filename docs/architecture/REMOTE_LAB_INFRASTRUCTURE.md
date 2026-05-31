# Architecture: Tier 3 Remote Lab (VDI) Setup

Tier 3 is the core differentiator for KeyShare. It allows secure sharing of SSO-gated accounts (like corporate enterprise portals) without exposing the raw password to the Customer, bypassing geo-fencing, hardware footprinting, and impossible travel detection.

## Technical Approach: Browser Isolation & Remote Desktop

To make this economically viable and highly performant, we cannot spin up a full $50/mo Windows Server for every $15/mo customer. We need containerized Remote Browser Isolation (RBI) or lightweight Virtual Desktop Infrastructure (VDI).

### The "Negotiator" Infrastructure Stack

#### 1. Compute Layer (Containerized Workspaces)
Instead of full VMs, we will use Dockerized Desktop Environments (e.g., **Kasm Workspaces** or **LinuxServer.io Webtops**).
*   **Why:** A Docker container running a Linux GUI + Chrome takes ~500MB of RAM. We can run 50 Customers on a single high-end dedicated server, bringing unit costs down to ~$1-2/month per Customer.
*   **Delivery:** The Customer accesses the Remote Lab directly through their standard web browser using WebRTC or Apache Guacamole (HTML5 Canvas). No client-side software is required.

#### 2. The Authentication Flow (The "Handshake")
To prevent the Customer from seeing the password:
1.  **Servicer Initialization:** The Servicer spins up the container via the KeyShare dashboard. They log into the container, open Chrome, log into their corporate portal or platform, and check the "Remember Me" box. They then close the session. The session cookie is now saved in the container's persistent volume.
2.  **Customer Access:** The Customer purchases Tier 3 access. KeyShare grants them access to *that specific container*. When the Customer opens the browser inside the container, they are already logged in. 
3.  **Credential Protection:** We block access to the browser's "Saved Passwords" settings via Chrome Enterprise Policies to ensure the Customer cannot extract the raw password.

#### 3. Network Obfuscation
*   The Docker host machine routes the container's outbound traffic through a **Residential Proxy** located in the same geographic region as the Servicer. 
*   **Result:** The target platform (e.g., Pluralsight) sees a user in Texas, using Chrome on Linux, with an IP address from AT&T Residential. The footprint never changes, regardless of whether the Customer is connecting from India or Germany.

## Security Controls for the Negotiator

1.  **Container Ephemerality:** If a Customer compromises a container, they only compromise that single browser session.
2.  **Time-Boxing:** The Remote Lab is only spun up when the Customer clicks "Connect" on the KeyShare dashboard to save cloud compute costs. It auto-hibernates after 15 minutes of inactivity.
3.  **Audit Logging:** KeyShare logs network traffic metadata (not TLS payloads, but DNS requests) to ensure the Customer is only accessing the agreed-upon platform (e.g., Udemy) and not using the Servicer's container to mine crypto or conduct illegal activities.
