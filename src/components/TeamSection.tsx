import React, { useState } from 'react';
import { motion } from 'motion/react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { useCMS } from '../contexts/CMSContext';
import { soundFx } from '../utils/audio';
import { 
  Users, 
  MessageCircle, 
  Sparkles, 
  Cpu, 
  Award, 
  Eye, 
  Zap, 
  ShieldCheck, 
  Headphones, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';

interface TeamSectionProps {
  currentTheme: ThemeId;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
  const { teamMembers, cultureCards, teamStats } = useCMS();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getCultureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-amber-300" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-300" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-cyan-300" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-yellow-300" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-300" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-pink-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <section id="team" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto space-y-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/10 via-amber-500/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ================================================== */}
      {/* SECTION HEADER                                     */}
      {/* ================================================== */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 border border-amber-400/30 text-xs font-mono text-amber-300 shadow-xl"
        >
          <Users className="w-4 h-4 text-amber-300" />
          <span className="font-extrabold uppercase tracking-widest">Our Leadership & Craftsmen</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Meet the Team Behind{' '}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Ayan Web Studio
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 font-light text-base sm:text-lg leading-relaxed"
        >
          Passionate professionals working together to design, develop, and deliver modern digital experiences for businesses across India.
        </motion.p>
      </div>

      {/* ================================================== */}
      {/* TEAM MEMBERS (4-COL DESKTOP, 2-COL TABLET, 1-COL) */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => {
              soundFx.playHover();
              setHoveredCard(member.id);
            }}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group relative rounded-3xl ${theme.glassStyle} border border-white/10 p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 shadow-2xl hover:scale-[1.02] hover:border-amber-400/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden`}
          >
            {/* Top Glow Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-6">
              
              {/* Professional Portrait with Ambient Ring */}
              <div className="relative w-28 h-28 mx-auto rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-purple-500 to-cyan-400 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900 relative flex items-center justify-center">
                  {member.avatar ? (
                    <>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-900 flex flex-col items-center justify-center p-2 text-center group-hover:from-purple-900/60 group-hover:to-slate-900 transition-colors">
                      <span className="text-3xl font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-cyan-300">
                        {member.name.substring(0, 2).toUpperCase()}
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-1">
                        Developer
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Role */}
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  {member.role}
                </p>
              </div>

              {/* Short Bio */}
              <p className="text-xs text-slate-300 font-light leading-relaxed text-center sm:text-left line-clamp-4">
                {member.bio}
              </p>

              {/* Experience Highlights */}
              {member.experienceHighlights && member.experienceHighlights.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-widest font-semibold block">
                    Highlights
                  </span>
                  <ul className="space-y-1.5">
                    {member.experienceHighlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Pills */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono text-cyan-300/80 uppercase tracking-widest font-semibold block">
                  Core Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-white/5 group-hover:bg-amber-400/10 border border-white/10 group-hover:border-amber-400/30 text-[10px] font-mono text-slate-200 group-hover:text-amber-300 transition-all whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* WhatsApp Integration Button (Ayan Founder Only) */}
            {member.id === 'ayan' && (
              <div className="pt-5 border-t border-white/10 mt-6 text-center">
                <a
                  href="https://wa.me/917033221791?text=i%20want%20discuss"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md group-hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Contact Founder on WhatsApp</span>
                </a>
              </div>
            )}

          </motion.div>
        ))}
      </div>

      {/* ================================================== */}
      {/* OUR CULTURE ("How We Work")                        */}
      {/* ================================================== */}
      <div className="pt-12 border-t border-white/10 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
            OUR CULTURE & VALUES
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            How We Work
          </h3>
          <p className="text-slate-300 font-light text-sm sm:text-base">
            Engineered workflows rooted in integrity, continuous improvement, and sub-second performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cultureCards.map((culture) => (
            <div
              key={culture.id}
              className={`p-6 rounded-2xl ${theme.glassStyle} border border-white/10 hover:border-cyan-400/40 transition-all duration-300 space-y-3 shadow-xl group hover:scale-[1.02]`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getCultureIcon(culture.iconName)}
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {culture.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {culture.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ================================================== */}
      {/* TEAM STATISTICS (CMS-READY & ANIMATED COUNTERS)     */}
      {/* ================================================== */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/40 via-black/60 to-slate-950/40 border border-white/15 backdrop-blur-2xl space-y-8 shadow-2xl">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-extrabold">
            IMPACT METRICS
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Driven By Results & Excellence
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {teamStats.map((stat) => (
            <div key={stat.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-amber-400/40 transition-all">
              <div className="text-2xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-cyan-300">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                {stat.label}
              </div>
              <p className="text-[10px] text-slate-400 font-light leading-snug pt-1">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
