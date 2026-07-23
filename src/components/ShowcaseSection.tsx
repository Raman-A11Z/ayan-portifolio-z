import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { THEMES } from '../data/themeData';
import { ThemeId, PortfolioProject } from '../types';
import { soundFx } from '../utils/audio';
import { Sparkles, ExternalLink, ArrowUpRight, Award, Zap, ShieldCheck, SlidersHorizontal, Check, ArrowRight } from 'lucide-react';

interface ShowcaseSectionProps {
  currentTheme: ThemeId;
  isHome?: boolean;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ currentTheme, isHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const theme = THEMES[currentTheme] || THEMES['deepPurple'];

  const categories = ['All', 'Custom SaaS', '3D Experience', 'E-Commerce', 'Business Web'];

  const displayedProjects = isHome
    ? PORTFOLIO_PROJECTS.slice(0, 3)
    : (selectedCategory === 'All'
        ? PORTFOLIO_PROJECTS
        : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory));

  return (
    <section id="showcase" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-purple-600/10 blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
            <Sparkles className="w-3.5 h-3.5" /> Proven ROI & Performance
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {isHome ? 'Featured Work Showcase' : 'Flagship Engineering Showcase'} <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
              Real ROI Metrics, Zero Compromise
            </span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg">
            {isHome
              ? 'A curated selection of our high-impact web applications engineered for performance and conversion.'
              : 'Explore how we engineered digital dominance for leading Indian enterprises and global scaleups.'}
          </p>
        </div>

        {/* Filter Category Tabs (Only shown on full Showcase page) */}
        {!isHome && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all border ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold border-amber-300 shadow-lg shadow-amber-400/20'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Portfolio Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-3xl ${theme.glassStyle} border shadow-2xl p-5 flex flex-col justify-between group hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="space-y-4">
                
                {/* Project Image Preview */}
                <div className="relative h-52 rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-white/15">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/40 font-bold">
                      {project.lighthouseScore.performance}/100 Speed
                    </span>
                  </div>

                  {/* Bottom Location/Year */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span>{project.client}</span>
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* ROI Key Stats */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/50 border border-white/10">
                  {project.stats.map((st, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs font-bold font-mono text-amber-300">{st.value}</div>
                      <div className="text-[9px] font-mono text-slate-400 uppercase line-clamp-1">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

                {/* Card Footer Action */}
                <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveProjectModal(project);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-semibold text-white flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Inspect Case Study</span>
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-lg"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        alert(`Live demo preview ready! Vercel URL will automatically link here when deployed.`);
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1 hover:bg-emerald-500/20 transition-all"
                      title="Vercel deployment ready"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
            </div>
          ))}
        </div>

        {/* View All Showcase Button for Home Page */}
        {isHome && (
          <div className="text-center pt-4">
            <Link
              to="/showcase"
              onClick={() => soundFx.playClick()}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm tracking-wide shadow-xl shadow-amber-400/20 transition-all hover:scale-105"
            >
              <span>Explore Full 12+ Project Portfolio & Case Studies</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        )}

      </div>

      {/* Case Study Deep Dive Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/20 p-6 sm:p-8 space-y-6 text-left shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest font-semibold">
                  {activeProjectModal.category} • {activeProjectModal.year}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activeProjectModal.title}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Client: {activeProjectModal.client} ({activeProjectModal.location})
                </p>
              </div>

              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/15"
              >
                Close ✕
              </button>
            </div>

            {/* Before vs After Redesign Comparison Slider */}
            {activeProjectModal.beforeImage && activeProjectModal.afterImage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4" /> Before vs After Redesign Comparison
                  </span>
                  <span className="text-slate-400">Drag Slider Below</span>
                </div>

                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/15 select-none">
                  {/* After Image (Background) */}
                  <img
                    src={activeProjectModal.afterImage}
                    alt="After Redesign"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/80 text-black font-mono font-bold text-xs shadow-lg">
                    AFTER: AYAN STUDIO (100/100)
                  </div>

                  {/* Before Image (Clipped overlay) */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={activeProjectModal.beforeImage}
                      alt="Before Redesign"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-500/80 text-white font-mono font-bold text-xs shadow-lg">
                      BEFORE: Legacy Site (32/100)
                    </div>
                  </div>

                  {/* Slider Control Line */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  />

                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] pointer-events-none z-20 flex items-center justify-center"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center shadow-2xl">
                      ↔
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Lighthouse Scores */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-center font-mono">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                  {activeProjectModal.lighthouseScore.performance}/100
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Performance</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-amber-300">
                  {activeProjectModal.lighthouseScore.accessibility}/100
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Accessibility</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                  {activeProjectModal.lighthouseScore.seo}/100
                </div>
                <div className="text-[10px] text-slate-400 uppercase">SEO Rating</div>
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-amber-300 font-semibold">Engineering Impact:</h4>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {activeProjectModal.description}
              </p>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-white/10 text-xs font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveProjectModal(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs"
              >
                Done Inspecting
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
