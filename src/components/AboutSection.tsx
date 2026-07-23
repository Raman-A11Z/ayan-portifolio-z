import React from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { Sparkles, ShieldCheck, Zap, Heart, Lock, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TeamSection } from './TeamSection';
import ayanAvatar from '../assets/images/ayan_founder_portrait_1784795466652.jpg';

interface AboutSectionProps {
  currentTheme: ThemeId;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];

  const coreValueIcons = [
    { icon: Sparkles, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { icon: Award, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { icon: ShieldCheck, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { icon: Zap, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { icon: Lock, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { icon: Heart, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' }
  ];

  const studioTimeline = [
    { year: 'Vision', title: 'Studio Inception', desc: 'Founded with a commitment to sub-second performance, bespoke 3D design, and zero template compromises.' },
    { year: 'Methodology', title: '8-Step Blueprint', desc: 'Engineered a repeatable, transparent web development pipeline ensuring on-time delivery.' },
    { year: 'Architecture', title: 'Modern Stack Shift', desc: 'Standardized on React, TypeScript, Three.js WebGL shaders, and cloud serverless DB infrastructure.' },
    { year: 'Commitment', title: '3-Month Support SLA', desc: 'Pioneered zero-cost 90-day post-launch technical maintenance and security monitoring.' }
  ];

  return (
    <section className="py-24 px-4 sm:px-8 bg-black/80 relative overflow-hidden border-t border-b border-white/10">
      
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-purple-600/10 via-indigo-600/10 to-amber-500/10 blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-semibold">
              Leadership & Craftsmanship
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet The Founder
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg">
            Direct leadership, architectural integrity, and obsession with quality in every single line of code.
          </p>
        </div>

        {/* Founder Hero Card & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Professional Portrait Area */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-black p-2 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)]">
              
              {/* Photo Area with Gradient Frame */}
              <div className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={ayanAvatar}
                  alt="Ayan - Founder & Chief Architect"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                
                {/* Overlay Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-white">Ayan</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] font-mono text-amber-300 uppercase font-semibold">
                      Chief Architect
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 block">Founder & Lead Engineer</span>
                </div>
              </div>

              {/* Animated Signature SVG */}
              <div className="mt-4 px-4 pb-2 flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Handcrafted Signature</span>
                  <svg className="w-32 h-10 text-amber-300 stroke-current fill-none" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10,40 Q30,10 50,35 T90,20 T130,45 T170,15"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    <text x="140" y="50" fontSize="18" fontFamily="cursive" fill="#fcd34d">Ayan.</text>
                  </svg>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">100% Quality First</span>
                  <span className="text-[10px] font-mono text-slate-400">Zero Template Compromises</span>
                </div>
              </div>

            </div>
          </div>

          {/* Story & Mission Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block font-semibold">
                Studio Philosophy
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Building Modern Websites That Help Businesses Scale
              </h3>

              {/* Explicit Story Text as requested by Prompt */}
              <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed bg-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
                {COMPANY_INFO.founder.bio}
              </p>
            </div>

            {/* Mission Statement */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-blue-900/30 border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" /> Mission Statement
              </div>
              <p className="text-sm sm:text-base text-slate-200 font-medium italic">
                "{COMPANY_INFO.founder.mission}"
              </p>
            </div>

            {/* Experience & Quality Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {COMPANY_INFO.founder.highlights.map((hl, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-2xl font-extrabold text-amber-300 font-mono block">
                    {hl.metric}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300 leading-tight block">
                    {hl.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* CORE VALUES GRID */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Core Values
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              The foundational principles guiding every project at Ayan Web Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.coreValues.map((val, idx) => {
              const style = coreValueIcons[idx % coreValueIcons.length];
              const Icon = style.icon;

              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${style.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {val.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIMELINE ANIMATION / MILESTONES */}
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block">Roadmap & Milestones</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Architectural Timeline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioTimeline.map((item, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20">
                    {item.year}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-white mt-3">{item.title}</h4>
                <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MEET OUR TEAM SECTION */}
        <div className="pt-12 border-t border-white/10">
          <TeamSection currentTheme={currentTheme} />
        </div>

      </div>
    </section>
  );
};
