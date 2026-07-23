import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, CheckCircle2, PhoneCall, Sparkles, Send } from 'lucide-react';
import { SEOHead } from './SEOHead';

export const MaintenancePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      <SEOHead
        title="Scheduled Maintenance • Ayan Web Studio"
        description="Ayan Web Studio is currently deploying performance upgrades and 3D shader enhancements."
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/20 via-cyan-500/10 to-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        
        {/* Status Pill */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-6"
        >
          <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Scheduled Performance Optimization in Progress</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          Upgrading Digital Engines
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          We are deploying major sub-second cache improvements and 3D shader updates across Patna Studio nodes. Systems will resume normal operations shortly.
        </motion.p>

        {/* Progress Timeline List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left"
        >
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Complete
            </span>
            <span className="font-semibold text-sm text-white">Database Indexing</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col justify-between">
            <span className="text-xs font-mono text-amber-300 flex items-center gap-1 mb-1 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> In Progress
            </span>
            <span className="font-semibold text-sm text-white">3D Shader Re-bind</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5" /> Upcoming
            </span>
            <span className="font-semibold text-sm text-slate-300">CDN Cache Warmup</span>
          </div>
        </motion.div>

        {/* Notification Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl mb-8"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2">
            Get Notified Upon Re-launch
          </h3>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>You're subscribed! We'll alert you the moment systems go live.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-cyan-500 text-white hover:scale-105 transition-all flex items-center gap-1.5 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Alert Me</span>
              </button>
            </form>
          )}
        </motion.div>

        {/* Support Hotline */}
        <div className="flex justify-center items-center gap-2 text-sm text-slate-400">
          <span>Need immediate assistance with an ongoing client project?</span>
          <a
            href="https://wa.me/917033221791"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp Founder Direct</span>
          </a>
        </div>

      </div>
    </div>
  );
};
