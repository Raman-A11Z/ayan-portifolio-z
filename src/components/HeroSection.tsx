import React from 'react';
import { Link } from 'react-router-dom';
import { ThreeCanvas } from './ThreeCanvas';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, Layers, MessageCircle, Gift } from 'lucide-react';

interface HeroSectionProps {
  currentTheme: ThemeId;
  onOpenEstimator?: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  onOpenEstimator,
  onOpenContact
}) => {
  const theme = THEMES[currentTheme] || THEMES['deepPurple'];

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-center overflow-hidden">
      
      {/* Background Animated Glow Beams */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-amber-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Brand Statement & CTA */}
        <div className="lg:col-span-7 space-y-6 text-left z-10">
          
          {/* 20% Commission Offer Banner */}
          <Link
            to="/earn-careers"
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-purple-500/20 border border-amber-400/50 hover:border-amber-300 text-xs font-mono text-amber-300 transition-all hover:scale-102 shadow-xl group"
          >
            <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>
              <strong className="text-white font-extrabold">REFERRAL OFFER:</strong> Earn <strong className="text-emerald-300 underline font-extrabold">20% Flat Commission</strong> per client referral!
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Top Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl shadow-xl w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono tracking-wider text-amber-300 uppercase font-semibold">
              India's Premier Web Craft Studio
            </span>
            <span className="text-white/30 font-mono">|</span>
            <span className="text-xs font-mono text-slate-300">Q3 Client Slots Open</span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Building Websites That <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
                Grow Your Business.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl font-mono text-amber-200/90 font-medium tracking-wide">
              "We Build Digital Excellence"
            </p>
          </div>

          {/* Body Narrative */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
            We design premium websites, e-commerce stores, and custom web applications that help businesses build trust, generate more leads, and grow online.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/917033221791?text=i%20want%20discuss"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-extrabold text-sm tracking-wide shadow-[0_0_40px_rgba(16,185,129,0.3)] border border-emerald-300/50 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>Contact Founder on WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#showcase"
              onClick={() => soundFx.playClick()}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-sm tracking-wide backdrop-blur-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>View Our Showcase</span>
            </a>
          </div>

          {/* Hero Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono text-slate-200">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 font-bold">✔</span> Responsive Design
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 font-bold">✔</span> Premium UI/UX
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 font-bold">✔</span> Admin Dashboard
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 font-bold">✔</span> SEO Optimized
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 font-bold">✔</span> Lightning Fast
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 font-bold">✔</span> Secure Development
            </span>
          </div>

          {/* Quick Metrics Bar / Statistics */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 max-w-2xl">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">20+</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-mono uppercase tracking-wider mt-1">Projects Delivered</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">100%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-mono uppercase tracking-wider mt-1">Fast Delivery</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">90%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-mono uppercase tracking-wider mt-1">Customer Satisfaction</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-mono">24/7</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300 font-mono uppercase tracking-wider mt-1">SLA Support</div>
            </div>
          </div>

          {/* Trust Guarantee Badges */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 pt-2 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Code Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Zero Bug Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" /> Guaranteed Timeline SLA
            </span>
          </div>

        </div>

        {/* Right Column: Interactive 3D Canvas Stage */}
        <div className="lg:col-span-5 relative w-full h-[450px] sm:h-[550px] z-10">
          
          {/* Glass Framing Frame */}
          <div className={`w-full h-full rounded-3xl ${theme.glassStyle} p-3 border shadow-2xl relative overflow-hidden flex flex-col justify-between`}>
            
            {/* Header Stage Bar */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-black/40 border border-white/10 z-20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              <span className="text-[11px] font-mono text-amber-300 font-semibold tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> AYAN-3D-MONOLITH.canvas
              </span>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                60 FPS
              </span>
            </div>

            {/* ThreeJS Stage Canvas */}
            <div className="w-full flex-1 relative">
              <ThreeCanvas currentTheme={currentTheme} shapeType="a-logo" />
            </div>

            {/* Footer Stage Controls Caption */}
            <div className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[10px] font-mono text-slate-300 flex items-center justify-between z-20">
              <span>Interactive View: Drag to Rotate • Scroll to Zoom</span>
              <span className="text-amber-300">Glass & Chrome Prism Material</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
