import React from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft, RefreshCw, Compass, PhoneCall, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from './SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      <SEOHead
        title="404 Page Not Found • Ayan Web Studio"
        description="The page you are looking for does not exist or has been relocated within Ayan Web Studio."
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        
        {/* Giant 404 Glitch Graphic */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block mb-6"
        >
          <span className="text-8xl sm:text-9xl font-black font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-500 drop-shadow-[0_0_35px_rgba(34,211,238,0.4)]">
            404
          </span>
          <div className="absolute -top-3 -right-6 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase flex items-center gap-1.5 shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Lost in Cyberspace</span>
          </div>
        </motion.div>

        {/* Heading & Story Copy */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
        >
          Oops! This Vector Doesn't Exist
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          The page or digital asset you requested has been moved, renamed, or temporarily de-indexed. Don't worry—Ayan Web Studio's core navigation is always available.
        </motion.p>

        {/* Quick Route Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-left"
        >
          <Link
            to="/services"
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all group"
          >
            <Compass className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-sm text-white">Our Services</div>
            <div className="text-xs text-slate-400">Explore Web Solutions</div>
          </Link>

          <Link
            to="/pricing"
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all group"
          >
            <Sparkles className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-sm text-white">Pricing Plans</div>
            <div className="text-xs text-slate-400">Packages & Features</div>
          </Link>

          <Link
            to="/showcase"
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all group"
          >
            <RefreshCw className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-sm text-white">Portfolio</div>
            <div className="text-xs text-slate-400">Client Showcases</div>
          </Link>

          <Link
            to="/contact"
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all group"
          >
            <PhoneCall className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-sm text-white">Contact Us</div>
            <div className="text-xs text-slate-400">Patna Studio Line</div>
          </Link>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3.5 rounded-xl font-medium bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back One Step</span>
          </button>
        </motion.div>

      </div>
    </div>
  );
};
