import React from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { Sparkles, Zap, Search, ShieldCheck, Smartphone, LifeBuoy, CheckCircle2 } from 'lucide-react';

interface WhyUsSectionProps {
  currentTheme: ThemeId;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];

  const reasons = [
    {
      icon: Sparkles,
      title: 'Premium Design',
      description: 'Modern UI with memorable user experiences designed to captivate visitors.',
      accent: 'from-cyan-400 to-blue-500',
      badge: 'Pixel Perfect'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Optimized for speed and Core Web Vitals to deliver sub-second page loads.',
      accent: 'from-amber-400 to-orange-500',
      badge: '100/100 Speed'
    },
    {
      icon: Search,
      title: 'SEO Ready',
      description: 'Built using search engine best practices so your business ranks higher on Google.',
      accent: 'from-emerald-400 to-teal-500',
      badge: 'Google Rank'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Development',
      description: 'Modern architecture and secure coding standards to protect your business and data.',
      accent: 'from-purple-400 to-indigo-500',
      badge: 'ISO Grade'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Perfect experience on every device—mobile, tablet, laptop, and desktop screens.',
      accent: 'from-pink-400 to-rose-500',
      badge: 'All Screens'
    },
    {
      icon: LifeBuoy,
      title: 'Long-Term Support',
      description: 'Dedicated support and proactive maintenance after launch so you never worry.',
      accent: 'from-blue-400 to-cyan-500',
      badge: '3 Months Free'
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-8 overflow-hidden bg-black/40 border-t border-b border-white/10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/10 blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-semibold">
              The Ayan Advantage
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Businesses Choose <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
              Ayan Web Studio
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            We don't just create websites. We build digital experiences designed to help businesses stand out, build trust, and convert more customers.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,210,255,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.accent} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-black/90 rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Standard in every build</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
