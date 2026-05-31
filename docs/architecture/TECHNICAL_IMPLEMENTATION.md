# Security & Infrastructure Architecture (v2)

Our initial approach (using a browser extension to copy session cookies directly to the Renter's local browser) was fundamentally flawed and presented unacceptable security risks. If a cookie touches the Renter's local machine, a bad actor can extract it using developer tools and bypass our time limits and security controls.

To remain economically viable while ensuring **absolute zero-trust security**, we have pivoted to a combination of **Edge Reverse Proxying** and **Cloud Browser Isolation**.

## 1. The Threat Model & Vulnerabilities

| Threat | Previous Vulnerable Approach | The New KeyShare Solution |
| :--- | :--- | :--- |
| **Cookie Theft / Session Hijacking** | Renter extracts injected cookie using Chrome DevTools or malicious scripts. | **Reverse Proxy Injection:** The cookie lives in our secure Cloud Vault. Our Edge Proxy injects the cookie server-side. The Renter *never* receives the raw cookie on their device. |
| **Billing / Password Tampering** | Renter navigates to account settings and changes password or billing info. | **Proxy Request Filtering:** Our Edge Proxy inspects all outbound URLs and blocks requests to `/settings`, `/billing`, or `/password` on the target platform. |
| **Geo-Fencing & IP Bans** | Target platform detects login from two different countries simultaneously. | **Residential Egress Proxies:** Our Edge Proxy routes the final request through a residential IP matching the Provider's home region (e.g., US-East). |
| **High Infrastructure Costs** | Running heavy Windows/Linux VMs for Remote Desktop (VDI) to isolate SSO. | **Cloudflare Workers / Edge Functions:** Running reverse proxies at the edge costs fractions of a cent per million requests. Infinitely scalable and highly economical. |

---

## 2. The Core Technologies

### A. The Edge Reverse Proxy (Web Apps)
For standard web platforms (e.g., Udemy, Ahrefs, Crunchbase), we use an Identity-Aware Proxy (IAP) architecture deployed on edge networks (like Cloudflare Workers or AWS Lambda@Edge).

**How it works:**
1.  **Provider Deposit:** The Provider logs into the target app. They use a lightweight KeyShare Provider Extension *only* to extract the active session token and deposit it directly into our encrypted **Cloud Vault** (HashiCorp Vault or AWS Secrets Manager).
2.  **Renter Access:** The Renter goes to `ahrefs.keyshare.online`.
3.  **The Intercept:** Our Edge Proxy intercepts the request. It verifies the Renter's active rental in our database.
4.  **The Injection:** The Edge Proxy retrieves the Provider's cookie from the Vault, attaches it to the HTTP request headers, and forwards the request to `ahrefs.com`.
5.  **The Sanitization:** `ahrefs.com` responds with the dashboard HTML. The Edge Proxy strips out any sensitive `Set-Cookie` headers or billing data, and serves the sanitized HTML to the Renter. 
*The Renter gets full access, but possesses zero credentials.*

### B. Cloud Browser Isolation (High-Security & Desktop Apps)
For ultra-secure SSO environments (corporate portals) or desktop-bound applications, reverse proxying isn't enough.

**How it works:**
We utilize **Remote Browser Isolation (RBI)** using headless containers (Docker + KasmVNC or Apache Guacamole).
1.  We spin up a lightweight, ephemeral Linux container running a headless browser.
2.  The Provider authenticates the session inside this cloud container.
3.  The Renter accesses the container via a secure WebRTC stream in their browser. They receive a video feed of the application and can send mouse/keyboard inputs. 
4.  *Cost Control:* We aggressively spin down containers the second a session ends. We utilize AWS Spot Instances or inexpensive bare-metal providers (Hetzner, Fly.io) to keep compute costs negligible (approx $0.02 - $0.05 per hour).

### C. API Gateway Wrapping (Generative AI)
For tools like Midjourney, OpenAI, or SaaS APIs, we do not provide UI access at all.
1.  We hold the Provider's API key in our Vault.
2.  The Renter hits the KeyShare API endpoint (`api.keyshare.online/v1/generate`).
3.  We validate funds, rate limit the request, append the Provider's API key, and forward it to the target service.

---

## 3. Tech Stack Requirements

To execute this on a tight budget, we will utilize:
*   **Database:** PostgreSQL (Supabase or Neon) for high-performance, low-cost relational data.
*   **Edge Proxy:** Cloudflare Workers (generous free tier, highly programmable proxying).
*   **Authentication:** NextAuth.js / Auth.js (Free, handles OAuth and Credentials).
*   **Secret Management:** AWS Secrets Manager or Cloudflare KV (for storing session cookies securely at rest).
*   **Payments & Escrow:** Stripe Connect (specifically designed for multi-party marketplaces, handles compliance and payouts natively).