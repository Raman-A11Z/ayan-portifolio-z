import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Code2, ShieldCheck, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Digital Engine...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const textIntervals = [
      { p: 20, text: 'Loading 3D Shader Pipelines...' },
      { p: 45, text: 'Optimizing Sub-Second Speed Vectors...' },
      { p: 70, text: 'Synchronizing Patna Studio Core...' },
      { p: 90, text: 'Preparing Cybernetic Glass System...' },
      { p: 100, text: 'Digital Excellence Ready.' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) onLoadingComplete();
          }, 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const boundedNext = Math.min(next, 100);

        const matchText = textIntervals.find((t) => boundedNext <= t.p);
        if (matchText) {
          setLoadingText(matchText.text);
        }

        return boundedNext;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090e] text-white overflow-hidden select-none"
        >
          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Core Glass Loading Card */}
          <div className="relative z-10 flex flex-col items-center px-8 py-10 max-w-md w-full mx-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 text-center">
            
            {/* Animated Logo Container */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 rounded-2xl blur-lg animate-pulse" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-purple-500 p-0.5 shadow-xl shadow-cyan-500/20 relative z-10 flex items-center justify-center">
                <div className="w-full h-full bg-[#07090e] rounded-[14px] flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 120 120" fill="none">
                    <path d="M60 22 L28 92 L42 92 L52 68 L68 68 L78 92 L92 92 Z" fill="url(#loadingLogoGrad)" />
                    <path d="M60 42 L55 58 L65 58 Z" fill="#07090e" />
                    <defs>
                      <linearGradient id="loadingLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="50%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#C084FC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Tagline */}
            <h2 className="text-xl font-bold tracking-wider text-white mb-1 flex items-center gap-2">
              AYAN WEB STUDIO
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
                v3.0
              </span>
            </h2>
            <p className="text-xs text-indigo-300/80 tracking-widest uppercase font-mono mb-8">
              We Build Digital Excellence
            </p>

            {/* Progress Counter */}
            <div className="w-full mb-4">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                  {loadingText}
                </span>
                <span className="font-bold text-cyan-300">{progress}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Feature Pills Footer */}
            <div className="grid grid-cols-3 gap-2 w-full pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400">
              <div className="flex items-center justify-center gap-1 bg-white/[0.02] py-1.5 rounded-lg border border-white/5">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>99+ Speed</span>
              </div>
              <div className="flex items-center justify-center gap-1 bg-white/[0.02] py-1.5 rounded-lg border border-white/5">
                <Code2 className="w-3 h-3 text-cyan-400" />
                <span>3D Shader</span>
              </div>
              <div className="flex items-center justify-center gap-1 bg-white/[0.02] py-1.5 rounded-lg border border-white/5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Secure</span>
              </div>
            </div>

          </div>

          {/* Location Badge */}
          <div className="absolute bottom-6 text-center text-xs font-mono text-slate-500 tracking-wider">
            Patna • Boring Road • Bihar • India
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
