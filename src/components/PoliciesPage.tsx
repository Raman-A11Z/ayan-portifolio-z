import React from 'react';
import { SEOHead } from './SEOHead';
import { ShieldCheck, FileText } from 'lucide-react';

interface PoliciesPageProps {
  type: 'privacy' | 'terms';
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-4xl mx-auto space-y-8 min-h-screen">
      <SEOHead
        title={isPrivacy ? 'Privacy Policy • Ayan Web Studio' : 'Terms & Conditions • Ayan Web Studio'}
        description="Legal transparency, data privacy guarantees, intellectual property ownership, and client terms for Ayan Web Studio."
      />

      <div className="space-y-4 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-amber-300">
          {isPrivacy ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4 text-cyan-400" />}
          <span>Legal & Transparency Governance</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>

        <p className="text-xs font-mono text-slate-400">
          Last updated: July 2026 • Effective for all client agreements and digital interactions with Ayan Web Studio.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-6 text-slate-300 font-light text-sm sm:text-base leading-relaxed">
        {isPrivacy ? (
          <>
            <h3 className="text-lg font-bold text-white">1. Data Protection Commitment</h3>
            <p>
              Ayan Web Studio ("Studio", "We", "Us") respects your personal data and client business privacy. We collect only necessary contact details (such as Name, Phone Number, Email, and Business Specifications) voluntarily provided through our consultation forms or direct WhatsApp communications.
            </p>

            <h3 className="text-lg font-bold text-white">2. Confidentiality & Non-Disclosure</h3>
            <p>
              All proprietary business assets, design wireframes, codebases, database credentials, and business concepts shared with Ayan Web Studio remain 100% strictly confidential. We execute standard Non-Disclosure Agreements (NDAs) upon request prior to project initiation.
            </p>

            <h3 className="text-lg font-bold text-white">3. Third-Party Services</h3>
            <p>
              We do not sell, rent, or trade client personal information to external marketers or data brokers. Integrations with cloud providers (Vercel, Cloudflare, Supabase, Google Maps, Razorpay) strictly adhere to standard security encryption protocols.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-white">1. Source Code Ownership & Transfer</h3>
            <p>
              Upon full settlement of milestone project invoices, 100% intellectual property ownership of all custom React/TypeScript source code, design assets, and database schemas transfers completely to the client. Zero proprietary code lock-in.
            </p>

            <h3 className="text-lg font-bold text-white">2. Payment Milestones & Invoicing</h3>
            <p>
              Standard engagements are structured on a 50/50 milestone schedule (50% upfront deposit upon contract execution, 50% upon final sign-off prior to domain propagation). Invoices include formal GST breakdown for registered Indian business entities.
            </p>

            <h3 className="text-lg font-bold text-white">3. Three Months Free Support SLA</h3>
            <p>
              Every completed website build includes 90 consecutive days of complimentary post-launch technical support, covering bug remediation, security patches, minor text/media updates, and server uptime monitoring.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
