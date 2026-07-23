import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Code2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from './SEOHead';

export const ComingSoonPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      <SEOHead
        title="Coming Soon • Next-Gen AI Web Builder by Ayan Web Studio"
        description="Ayan Web Studio is launching a proprietary 3D interactive web studio suite for Indian businesses."
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/15 to-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6"
        >
          <Rocket className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>Next-Generation Product Launch • Q2 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          Ayan Web Studio AI Engine
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          We are engineering an AI-powered instant web architect tool tailored specifically for Bihar and Indian startups. Instant sub-second deployment, automated 3D product visualizers, and zero-code WhatsApp sales sync.
        </motion.p>

        {/* Feature Teasers */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left"
        >
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <Cpu className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="font-semibold text-sm text-white">AI Web Architect</div>
            <div className="text-xs text-slate-400">Generate landing pages in seconds</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <Code2 className="w-5 h-5 text-indigo-400 mb-2" />
            <div className="font-semibold text-sm text-white">3D Product Canvas</div>
            <div className="text-xs text-slate-400">Interactive WebGL displays</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <Sparkles className="w-5 h-5 text-purple-400 mb-2" />
            <div className="font-semibold text-sm text-white">Zero-Code Sync</div>
            <div className="text-xs text-slate-400">WhatsApp & UPI auto-pay</div>
          </div>
        </motion.div>

        {/* Subscription Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl mb-8"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2">
            Join the Exclusive Beta Early Access
          </h3>

          {submitted ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Priority spot reserved! We will invite you when beta testing begins.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-600 text-white hover:scale-105 transition-all flex items-center gap-1.5 text-sm"
              >
                <span>Request Invite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>

        {/* Back Link */}
        <Link
          to="/"
          className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
        >
          <span>← Back to Ayan Web Studio Main Platform</span>
        </Link>

      </div>
    </div>
  );
};
