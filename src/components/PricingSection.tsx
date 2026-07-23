import React from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { SERVICES } from '../data/servicesData';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Flame, Clock } from 'lucide-react';

interface PricingSectionProps {
  currentTheme: ThemeId;
  currency?: 'INR' | 'USD';
  onOpenContactWithBrief: (brief: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currentTheme,
  onOpenContactWithBrief
}) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-8 relative overflow-hidden bg-black/80 border-t border-white/10">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-500/10 blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Launch Offer Banner Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-400/40 text-xs font-mono text-amber-300 shadow-xl">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="font-extrabold uppercase tracking-widest text-amber-300">
              Launch Offer
            </span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              Valid Until <strong>15 August</strong>
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Pricing <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
              Zero Hidden Charges
            </span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg">
            Lock in launch discount prices before 15 August. Every package includes source code ownership and 3 months of free maintenance.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICES.map((pkg) => {
            const isPopular = pkg.id === 'business-websites';

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-gradient-to-b from-white/10 via-white/5 to-black/80 border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.2)] scale-[1.02]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/25'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black font-mono font-extrabold text-[10px] tracking-widest uppercase shadow-lg">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block font-semibold">
                      {pkg.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 font-light line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                    {pkg.isCustomQuote ? (
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Starting From</span>
                        <div className="text-3xl font-extrabold text-cyan-300 font-mono">
                          ₹80,000+
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">Custom Quote Based On Requirements</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Launch Offer Price</span>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                            ₹{pkg.offerPriceINR.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-mono text-slate-400 line-through">
                            ₹{pkg.regularPriceINR.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 font-semibold block mt-1">
                          🔥 Save ₹{(pkg.regularPriceINR - pkg.offerPriceINR).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold block">
                      Package Features:
                    </span>
                    <ul className="space-y-2">
                      {pkg.featuresList.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-200 font-mono">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8 mt-8 border-t border-white/10 space-y-3">
                  <button
                    onClick={() => {
                      soundFx.playSuccess();
                      onOpenContactWithBrief(`I am interested in booking the "${pkg.title}" package at the Launch Offer price.`);
                    }}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg ${
                      isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    <span>Book Your Website Today</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[10px] text-center font-mono text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>3 Months Free Support Included</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-white/15 text-center sm:flex sm:items-center sm:justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" /> Need a custom scope or enterprise agreement?
            </h4>
            <p className="text-xs text-slate-300 font-light">
              We offer flexible milestone billing, custom NDAs, and corporate GST invoicing for Indian businesses.
            </p>
          </div>

          <button
            onClick={() => onOpenContactWithBrief('I need a custom proposal with corporate GST billing and milestone terms.')}
            className="mt-4 sm:mt-0 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-amber-300 whitespace-nowrap"
          >
            Request Corporate Proposal →
          </button>
        </div>

      </div>
    </section>
  );
};
