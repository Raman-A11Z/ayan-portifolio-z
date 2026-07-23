import React from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { CheckCircle2, ShieldCheck, Sparkles, Smartphone, Zap, Search, Layout, Lock, Globe, Server, Gift } from 'lucide-react';

interface IncludedFeaturesSectionProps {
  currentTheme: ThemeId;
}

export const IncludedFeaturesSection: React.FC<IncludedFeaturesSectionProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];

  const standardFeatures = [
    { title: 'Premium UI Design', desc: 'Bespoke layout tuned for luxury visual hierarchy', icon: Sparkles },
    { title: 'Mobile Responsive', desc: 'Flawless performance on iOS, Android & tablet screens', icon: Smartphone },
    { title: 'Fast Loading', desc: '100/100 Core Web Vitals with sub-second response times', icon: Zap },
    { title: 'Basic SEO', desc: 'Meta tags, structured data, and search engine submission', icon: Search },
    { title: 'Admin Panel', desc: 'Intuitive CMS to easily manage content & media', icon: Layout },
    { title: 'Secure Code', desc: 'Modern encryption & OWASP security best practices', icon: Lock },
    { title: 'Google Friendly', desc: 'Clean indexing and sitemap generation for Google', icon: Globe },
    { title: 'Clean Architecture', desc: 'Maintainable, scalable React & TypeScript codebase', icon: ShieldCheck },
    { title: 'Deployment Support', desc: 'Free setup on Cloudflare, Vercel, or custom server', icon: Server },
    { title: '3 Months Free Support', desc: 'Included bug fixes, updates, and maintenance', icon: Gift }
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-black/60 border-t border-b border-white/10 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono tracking-widest text-emerald-300 uppercase font-semibold">
              Standard Baseline Guarantee
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What Every Website <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
              Includes At Zero Extra Cost
            </span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg">
            No hidden fees. Every project engineered by Ayan Web Studio comes pre-packed with enterprise essentials.
          </p>
        </div>

        {/* 10 Feature Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {standardFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 transition-all hover:bg-white/[0.06] flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-light mt-1.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  ✓ Included
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
