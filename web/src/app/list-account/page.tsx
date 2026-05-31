import { Metadata } from "next";
import { ShieldCheck, Banknote, Clock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import ListAccountForm from "@/components/ListAccountForm";

export const metadata: Metadata = {
  title: "List an Account | KeyShare",
  description: "Monetize your unused premium subscriptions safely with KeyShare.",
};

export default async function ListAccountPage() {
  await requireUser();

  return (
    <div className="pt-12 pb-24 container mx-auto px-4 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            Provider Program
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Turn idle subscriptions into <span className="text-emerald-400">passive income.</span>
          </h1>
          <p className="text-lg text-neutral-400 mb-8">
            Publish a live listing to the KeyShare marketplace. Real users can discover and rent your resource immediately.
          </p>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 text-emerald-500 mx-auto md:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Secure by design</h3>
                <p className="text-sm text-neutral-400">Listings go live instantly. Session access is delivered through our secure bridge when renters book.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 text-emerald-500 mx-auto md:mx-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">You control availability</h3>
                <p className="text-sm text-neutral-400">Set your price and rental window. Only one renter can hold an active slot at a time.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 text-emerald-500 mx-auto md:mx-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Real bookings tracked</h3>
                <p className="text-sm text-neutral-400">Every rental is stored in your dashboard with live timers and escrow records.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500" />
          <h2 className="text-2xl font-bold mb-6">Create a Listing</h2>
          <ListAccountForm />
        </div>
      </div>
    </div>
  );
}
