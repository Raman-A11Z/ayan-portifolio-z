import React from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { PhoneCall, FileSearch, MonitorPlay, FileCheck, Code, CheckCircle, Rocket, HeartHandshake, ArrowRight } from 'lucide-react';

interface ProcessTimelineProps {
  currentTheme: ThemeId;
  onOpenContact: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ currentTheme, onOpenContact }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];

  const steps = [
    {
      num: 'Step 1',
      title: 'Free Consultation',
      desc: 'Initial discovery call to understand your business goals, target audience, and website vision.',
      icon: PhoneCall,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      num: 'Step 2',
      title: 'Requirement Analysis',
      desc: 'In-depth audit of competitor landscapes, site map planning, feature specs, and tech stack selection.',
      icon: FileSearch,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      num: 'Step 3',
      title: 'Live Website Demo',
      desc: 'Interactive 3D wireframe prototype & design preview so you experience the look & feel before code.',
      icon: MonitorPlay,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      num: 'Step 4',
      title: 'Proposal',
      desc: 'Clear scope breakdown, transparent pricing, milestone schedule, and GST contract agreement.',
      icon: FileCheck,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      num: 'Step 5',
      title: 'Development',
      desc: 'Full-stack React/TypeScript coding, Three.js 3D animations, mobile responsiveness, and CMS wiring.',
      icon: Code,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      num: 'Step 6',
      title: 'Testing',
      desc: 'Rigorous 100/100 Lighthouse speed optimization, cross-browser compatibility, and security QA.',
      icon: CheckCircle,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      num: 'Step 7',
      title: 'Website Launch',
      desc: 'Domain propagation, SSL security setup, Google Search Console indexing, and live deployment.',
      icon: Rocket,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    },
    {
      num: 'Step 8',
      title: 'Three Months Free Support',
      desc: 'Guaranteed 90 days of free technical maintenance, bug fixes, content updates, and backups.',
      icon: HeartHandshake,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    }
  ];

  return (
    <section id="process" className="py-24 px-4 sm:px-8 bg-black/70 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 w-[700px] h-[500px] bg-cyan-600/10 blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-semibold">
              Our 8-Step Proven Process
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How We Work <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
              From Concept to Guaranteed Success
            </span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg">
            A seamless, transparent 8-step roadmap engineered to eliminate friction and launch your project on time.
          </p>
        </div>

        {/* 8-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300">
                      {st.num}
                    </span>

                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${st.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span>Phase 0{idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenContact}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-amber-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-cyan-400/20 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <span>Start Step 1: Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
