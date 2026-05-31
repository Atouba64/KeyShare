import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | KeyShare",
  description: "KeyShare Terms of Service and User Agreement.",
};

export default function TermsPage() {
  return (
    <div className="pt-20 pb-20 container mx-auto px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert prose-emerald max-w-none space-y-6 text-neutral-300">
        <p><strong>Last Updated:</strong> May 31, 2026</p>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the KeyShare platform, marketplace, browser extension, or API, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
          <p>
            KeyShare is a peer-to-peer marketplace that facilitates the temporary, secure sharing of software licenses, digital subscriptions, and API limits. KeyShare provides the infrastructure (browser extensions, API wrappers, and payment escrow) to connect "Providers" (users with active subscriptions) with "Renters" (users needing temporary access).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Provider Responsibilities</h2>
          <p>
            As a Provider listing an account on KeyShare, you agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>You are the legitimate owner or authorized user of the subscription being shared.</li>
            <li>You will not list accounts that contain sensitive personal data or financial information.</li>
            <li>You understand that while KeyShare uses IP proxying and secure session wrappers, you bear the ultimate responsibility for adhering to your underlying subscription's Terms of Service. KeyShare is not liable for accounts flagged or banned by third-party services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Renter Responsibilities</h2>
          <p>
            As a Renter accessing accounts via KeyShare, you agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>You will use the rented sessions strictly for the duration purchased.</li>
            <li>You will not attempt to bypass the KeyShare extension, extract cookies, access billing portals, or change account passwords. Any such attempt will result in an immediate lifetime ban and potential legal action.</li>
            <li>You will not use the rented access for illegal activities, harassment, or generating prohibited content.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Payments and Escrow</h2>
          <p>
            KeyShare processes payments securely via Stripe. Funds are held in escrow until the rental period concludes successfully. KeyShare deducts a platform fee from the transaction. Refunds are only issued if the provided session fails to connect or is invalid at the time of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            KeyShare provides the platform "as is". We do not guarantee uninterrupted access to third-party services. In no event shall KeyShare be liable for any indirect, incidental, or consequential damages arising out of your use of the platform.
          </p>
        </section>
      </div>
    </div>
  );
}