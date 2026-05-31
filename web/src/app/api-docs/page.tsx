import { Metadata } from "next";
import { Code2, Terminal, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "API Documentation | KeyShare",
  description: "Integrate KeyShare's proxy and session wrappers directly into your applications.",
};

export default function ApiDocsPage() {
  return (
    <div className="pt-20 pb-20 container mx-auto px-4 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Terminal className="w-8 h-8 text-emerald-500" />
          KeyShare API Documentation
        </h1>
        <p className="text-lg text-neutral-400">
          Programmatically rent, proxy, and manage AI compute and SaaS subscriptions.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-neutral-800 pb-2">Overview</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            The KeyShare API allows developers to wrap premium tool requests (like Midjourney, ChatGPT API, or proprietary data sources) and route them securely through our provider network. This is especially useful for "The AI Content Marathon" or "The Market Research Deep Dive" use cases where UI access is not strictly required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-neutral-800 pb-2">Authentication</h2>
          <p className="text-neutral-300 mb-4">
            Authenticate your API requests using a Bearer token in the `Authorization` header.
          </p>
          <div className="bg-neutral-950 rounded-lg p-4 font-mono text-sm border border-neutral-800 text-neutral-300">
            Authorization: Bearer ks_live_XXXXXXXXXXXXXXXXXXXX
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-neutral-800 pb-2">Endpoints</h2>
          
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-bold text-xs rounded border border-emerald-500/20">POST</span>
                <code className="text-white font-mono text-sm">/v1/proxy/generative-ai</code>
              </div>
              <p className="text-sm text-neutral-400 mb-4">
                Send a prompt to a specific generative AI model using a rented compute slot. The request is routed through a provider's active API quota.
              </p>
              
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Request Body</h4>
              <pre className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-sm font-mono text-neutral-300 overflow-x-auto">
{`{
  "target_service": "midjourney",
  "provider_tier": "pro_fast",
  "prompt": "cyberpunk city skyline at night, neon lights --ar 16:9",
  "max_cost_cents": 50
}`}
              </pre>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 font-bold text-xs rounded border border-blue-500/20">GET</span>
                <code className="text-white font-mono text-sm">/v1/sessions/active</code>
              </div>
              <p className="text-sm text-neutral-400 mb-4">
                Retrieve a list of all your currently active rented browser sessions and their remaining TTL (Time To Live).
              </p>
              
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Response</h4>
              <pre className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-sm font-mono text-neutral-300 overflow-x-auto">
{`{
  "sessions": [
    {
      "id": "sess_892nf109f",
      "service": "Enterprise Access",
      "expires_at": "2026-06-02T14:30:00Z",
      "remaining_seconds": 128400,
      "status": "active"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
