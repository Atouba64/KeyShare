import { Metadata } from "next";
import { ShieldCheck, Lock, EyeOff, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Security | KeyShare",
  description: "KeyShare's security architecture and commitment to protecting user accounts.",
};

export default function SecurityPage() {
  return (
    <div className="pt-20 pb-20 container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Security Architecture</h1>
        <p className="text-lg text-neutral-400">
          How we keep accounts safe, passwords hidden, and sessions secure.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <Lock className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Zero-Password Architecture</h3>
          <p className="text-neutral-400 text-sm">
            Providers never input their passwords into KeyShare. Our system relies entirely on intercepting and migrating active session cookies via our browser extension.
          </p>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <EyeOff className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
          <p className="text-neutral-400 text-sm">
            Session cookies are encrypted locally on the Provider's machine before transit, stored encrypted in our database, and only decrypted inside the Renter's sandboxed environment.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <Server className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Residential IP Proxying</h3>
          <p className="text-neutral-400 text-sm">
            To prevent geo-fencing triggers or account locks, Renter traffic is routed through residential proxies that match the geographic location of the Provider.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Isolated Sandboxing</h3>
          <p className="text-neutral-400 text-sm">
            The KeyShare extension creates an isolated browser container for the rented session. The Renter cannot view, copy, or export the injected cookies.
          </p>
        </div>
      </div>

      <div className="prose prose-invert prose-emerald max-w-none space-y-6 text-neutral-300">
        <h2 className="text-2xl font-bold text-white mb-4">Vulnerability Disclosure</h2>
        <p>
          We take security seriously. If you believe you have found a vulnerability in the KeyShare platform, extension, or API, please contact our security team immediately at <code>security@keyshare.online</code>.
        </p>
        <p>
          We operate a bug bounty program and will reward responsible disclosures that help keep our users safe.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Account Protection Measures</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Billing URL Blocking:</strong> The KeyShare extension actively blocks network requests to billing, account settings, and password change URLs while a rented session is active.</li>
          <li><strong>Automatic Expiry:</strong> Sessions self-destruct exactly when the rental period expires. KeyShare forces a logout and invalidates the local container.</li>
          <li><strong>Anomaly Detection:</strong> If the extension detects attempts to tamper with the sandbox or export cookies, it instantly kills the session and permanently bans the Renter.</li>
        </ul>
      </div>
    </div>
  );
}