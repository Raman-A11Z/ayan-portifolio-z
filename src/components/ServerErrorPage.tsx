import React from 'react';
import { motion } from 'motion/react';
import { AlertOctagon, RefreshCw, Home, PhoneCall, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from './SEOHead';

export const ServerErrorPage: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      <SEOHead
        title="500 Internal Error • Ayan Web Studio"
        description="A technical diagnostic exception occurred. Ayan Web Studio engineers have been automatically notified."
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-600/20 via-purple-600/10 to-indigo-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        
        {/* Diagnostic Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono uppercase tracking-wider mb-6"
        >
          <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>System Diagnostic Code: 500_SERVER_EXCEPTION</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          Temporary Server Anomaly
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          Our cloud runtime experienced an unhandled state. Our automated monitoring system has logged this incident. Please refresh the pipeline or return home.
        </motion.p>

        {/* System Terminal Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-5 rounded-2xl bg-black/60 border border-white/10 text-left font-mono text-xs text-slate-300 mb-8 overflow-hidden relative shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-slate-400">
            <span className="flex items-center gap-2 text-indigo-400">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Diagnostic Console Log</span>
            </span>
            <span className="text-[10px] text-emerald-400 uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Auto-Recovery Active
            </span>
          </div>
          <div className="space-y-1.5 text-slate-400">
            <p className="text-rose-400">[ERROR]: Shader compiler process reset unexpected (0x500)</p>
            <p>[INFO]: Studio node Patna-Core-01 verifying edge route state...</p>
            <p>[INFO]: Fallback CDN static cache deployed successfully.</p>
            <p className="text-cyan-300">[ACTION]: Re-initializing page context state token.</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleReload}
            className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-rose-500 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry & Refresh Pipeline</span>
          </button>

          <Link
            to="/"
            className="px-6 py-3.5 rounded-xl font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href="tel:+917033221791"
            className="px-6 py-3.5 rounded-xl font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Patna Studio Support</span>
          </a>
        </motion.div>

      </div>
    </div>
  );
};
