import React from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  currentTheme: ThemeId;
  onOpenContact: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ currentTheme, onOpenContact }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];

  return (
    <section className="py-24 px-4 sm:px-8 relative overflow-hidden bg-gradient-to-b from-black/90 via-black to-[#08080c] border-t border-white/10">
      
      {/* Background Animated Beams */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-amber-500/15 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8 p-10 sm:p-16 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,210,255,0.15)] relative overflow-hidden">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span className="font-semibold tracking-wider uppercase">Let's Create Digital Excellence</span>
        </div>

        {/* Main CTA Headline */}
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Ready To Build <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Something Amazing?
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
          Whether you're launching a new business, upgrading an existing website, or planning a custom web application, Ayan Web Studio is ready to help.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              soundFx.playSuccess();
              onOpenContact();
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-500 hover:from-amber-300 hover:to-indigo-400 text-black font-extrabold text-sm tracking-wide shadow-[0_0_50px_rgba(0,210,255,0.3)] flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>Book Free Consultation</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://wa.me/917033221791?text=Hello%20Ayan%20Web%20Studio!%20I%20want%20to%20discuss%20building%20a%20website%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="px-8 py-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-extrabold text-sm font-mono tracking-wide flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Contact Founder on WhatsApp</span>
          </a>
        </div>

        {/* Baseline Guarantees */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free 30-Min Strategy Call
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero Obligation Proposal
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> 3 Months Free Support
          </span>
        </div>

      </div>
    </section>
  );
};
