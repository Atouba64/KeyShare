# Platform Mechanics & Strategy

To build KeyShare into a successful marketplace while navigating the inherent risks of credential sharing, the platform must adopt specific technical and operational strategies.

## 1. The Two Sharing Models

KeyShare will support two distinct methods of sharing, depending on the type of resource:

### Model A: "Invite-Based" Sharing (Low Risk, TOS Compliant)
This model applies to platforms that offer "Family", "Team", or "Duo" plans (e.g., Spotify Family, Nintendo Switch Online, Canva Pro Teams).
- **How it works:** The seller does *not* share their password. Instead, when a buyer pays for a slot, the seller receives the buyer's email address and sends them an official invite link via the platform's native system.
- **Advantage:** Highly secure, impossible for the buyer to steal the seller's account, and generally compliant with platform rules.

### Model B: "Credential Vault" Sharing (Higher Risk, Requires Trust)
This model applies to single-seat accounts (e.g., a standard Chegg account, ChatGPT Plus).
- **How it works:** The seller inputs their username and password into KeyShare's encrypted vault. When a buyer rents the account, they are given access to the credentials.
- **Security Mechanisms Required:**
  - **No-Change Agreements:** Buyers agree to severe penalties/bans if they attempt to change the password or account settings.
  - **Automated Rotation:** Following the *GoSplit* model, KeyShare could prompt the seller to change their password on the 1st of every month, preventing old buyers from retaining access.
  - **Browser Extension (Advanced):** KeyShare could develop a browser extension that auto-fills the login credentials for the buyer without ever showing them the plain-text password.

## 2. Navigating the University / SSO Problem

As noted in the research, sharing corporate Single Sign-On (SSO) credentials is too risky for the seller (exposing personal, HR, and financial data). To facilitate the sharing of enterprise resources safely:

- **License Keys vs. Logins:** Some enterprise benefits provide standalone activation keys (e.g., JetBrains IDEs, Sketch, Autodesk). KeyShare can facilitate the sale/rental of these specific keys rather than the whole account.
- **Proxy Access / API Bridging (Future Scope):** Exploring complex ways to proxy traffic, though highly technically challenging and likely to break.
- **Policy Enforcement:** KeyShare should actively warn users *against* sharing primary SSO portal passwords.

## 3. Financial Mechanics

- **Escrow System:** To prevent scams, buyers pay KeyShare upfront. The funds are held in escrow and only released to the seller after a 24-48 hour verification period (proving the credentials work).
- **Revenue Model:**
  - **Sellers:** Keep 100% of their asking price (incentivizes supply).
  - **Buyers:** Pay the asking price + a platform commission fee (e.g., 15% + $0.50 transaction fee).

## 4. Development Roadmap

**Phase 1: The Minimum Viable Product (MVP)**
- Basic user authentication.
- Marketplace listing capabilities (Create, Read, Update, Delete).
- Simple encrypted text field for credential sharing (Vault).
- Stripe integration for payments and escrow.

**Phase 2: Trust & Safety**
- User rating system (Sellers rated on reliability; Buyers rated on not tampering with accounts).
- Automated refund handling if credentials fail.
- Chat system for buyers and sellers to communicate securely.

**Phase 3: Advanced Integrations**
- Password masking via a custom KeyShare Browser Extension.
- API integrations with major platforms to automatically verify if a shared password is valid.
