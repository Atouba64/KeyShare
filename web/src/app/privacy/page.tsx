import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KeyShare",
  description: "Learn how KeyShare handles and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-20 pb-20 container mx-auto px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert prose-emerald max-w-none space-y-6 text-neutral-300">
        <p><strong>Last Updated:</strong> May 31, 2026</p>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you use KeyShare, we collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Account Information:</strong> Name, email address, and payment details (processed securely via Stripe).</li>
            <li><strong>Session Data:</strong> Encrypted session cookies necessary to facilitate access transfers between Providers and Renters. <strong>We do not collect, store, or have access to plaintext passwords.</strong></li>
            <li><strong>Usage Data:</strong> Timestamps, rental durations, and connection logs for debugging and platform security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Facilitate the secure transfer of active sessions between users.</li>
            <li>Process payments and payouts.</li>
            <li>Monitor platform integrity and prevent fraud or account takeover attempts.</li>
            <li>Communicate with you regarding updates, security alerts, and support.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Security & Encryption</h2>
          <p>
            Security is our core product. Session cookies are encrypted locally in your browser before being transmitted to our servers. They remain encrypted at rest and are only decrypted within the isolated browser environment of the Renter. We utilize bank-level AES-256 encryption.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Third-Party Sharing</h2>
          <p>
            We do not sell your personal data. We only share data with essential third-party service providers (such as Stripe for payments or AWS for cloud infrastructure) required to operate the KeyShare platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal data at any time. You can delete your account directly from your Dashboard settings, which will permanently wipe all your associated session data and API keys from our systems.
          </p>
        </section>
      </div>
    </div>
  );
}