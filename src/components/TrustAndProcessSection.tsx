import React, { useState, useEffect } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { fetchReviews, updateReviewStatus, SupabaseReview } from '../lib/supabaseClient';
import { PostReviewModal } from './PostReviewModal';
import { ShieldCheck, Award, Zap, Code2, Users, Star, ArrowRight, Sparkles, Plus, Database, Check, X, ShieldAlert, MessageCircle, CheckCircle2 } from 'lucide-react';

interface TrustAndProcessSectionProps {
  currentTheme: ThemeId;
  onOpenContact: () => void;
}

export const TrustAndProcessSection: React.FC<TrustAndProcessSectionProps> = ({
  currentTheme,
  onOpenContact
}) => {
  const theme = THEMES[currentTheme] || THEMES['deepPurple'];

  // Reviews state
  const [reviewsList, setReviewsList] = useState<SupabaseReview[]>([]);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'approved' | 'pending'>('approved');

  useEffect(() => {
    fetchReviews().then(data => setReviewsList(data));
  }, []);

  const handleReviewSubmitted = (newReview: SupabaseReview) => {
    setReviewsList(prev => [newReview, ...prev]);
  };

  const handleApproveReview = async (id: string) => {
    soundFx.playSuccess();
    const updated = await updateReviewStatus(id, 'approved');
    setReviewsList(updated);
  };

  const handleRejectReview = async (id: string) => {
    soundFx.playClick();
    const updated = await updateReviewStatus(id, 'rejected');
    setReviewsList(updated);
  };

  const approvedReviews = reviewsList.filter(r => r.status === 'approved');
  const pendingReviews = reviewsList.filter(r => r.status === 'pending');

  const trustPillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Complete IP & Source Code Handover',
      desc: 'You retain 100% legal ownership of all code, 3D assets, design tokens, and domain assets. No vendor lock-in.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Sub-Second Speed Guarantee',
      desc: 'Every build undergoes a rigorous Lighthouse audit guaranteeing a 90+ score on mobile and 100 on desktop.'
    },
    {
      icon: <Award className="w-6 h-6 text-purple-400" />,
      title: 'GST Compliant Enterprise Billing',
      desc: 'Seamless B2B billing with full GST invoicing, milestone-based escrow payments, and Razorpay/Bank transfer options.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      title: 'Localized Indian Market Optimization',
      desc: 'Tailored for Indian consumers with WhatsApp API lead triggers, UPI one-click payments, and Tier 1/2 performance routing.'
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Discovery & 3D Visual Strategy',
      timeframe: 'Days 1 – 5',
      desc: 'Architectural blueprinting, brand visual direction, 3D logomark wireframing, and interactive moodboard signoff.'
    },
    {
      step: '02',
      title: 'High-Fidelity Component Crafting',
      timeframe: 'Days 6 – 15',
      desc: 'Designing pixel-perfect responsive layouts in Figma, custom micro-interactions, and WebGL material shaders.'
    },
    {
      step: '03',
      title: 'Full-Stack Engineering & WebGL',
      timeframe: 'Days 16 – 25',
      desc: 'React 19 / Vite component synthesis, Three.js 3D canvas integration, API connectors, and state engine.'
    },
    {
      step: '04',
      title: '100/100 Speed Audit & Scale Launch',
      timeframe: 'Days 26 – 30',
      desc: 'Comprehensive Lighthouse optimization, vulnerability scanning, DNS propagation, and live team handover.'
    }
  ];

  return (
    <section id="trust" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Trust Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5" /> Built for High-Growth Businesses
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Studio Quality Guarantee & Precision SLA <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
              Crafted to Outperform Standard Agencies
            </span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg">
            We operate with the rigor of an elite engineering consultancy and the creative soul of a luxury design studio.
          </p>
        </div>

        {/* 4 Trust Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl ${theme.glassStyle} border shadow-xl space-y-4 flex flex-col justify-between hover:border-amber-400/50 transition-all`}
            >
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-black/60 border border-white/10 w-fit">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Methodology Timeline */}
        <div className="space-y-10 pt-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-amber-300 tracking-widest font-semibold">
              Execution Precision
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Streamlined Engineering Process
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((m) => (
              <div
                key={m.step}
                className="p-6 rounded-3xl bg-black/60 border border-white/15 space-y-4 relative overflow-hidden group hover:border-purple-400/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-400">
                    {m.step}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-300 border border-white/15">
                    {m.timeframe}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Client Testimonials / Reviews Section */}
        <div id="reviews" className="space-y-10 pt-12 border-t border-white/10 scroll-mt-28">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono text-amber-300">
                <Sparkles className="w-3.5 h-3.5" /> Client Reviews & Endorsements
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                What Indian Business Leaders Say
              </h3>
              <p className="text-xs font-mono text-slate-300">
                Real client feedback synced with Supabase Database. Post your review below!
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
              {/* Post Your Review Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setPostModalOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Post Your Review</span>
              </button>

              {/* Admin Moderation Toggle */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setAdminMode(!adminMode);
                }}
                className={`px-4 py-3 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  adminMode
                    ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4 text-purple-400" />
                <span>Admin Moderation {pendingReviews.length > 0 && `(${pendingReviews.length} Pending)`}</span>
              </button>
            </div>
          </div>

          {/* Admin Moderation Panel (When Active) */}
          {adminMode && (
            <div className="p-6 rounded-3xl bg-purple-950/40 border border-purple-500/40 text-left space-y-4 animate-in fade-in duration-200 shadow-2xl">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-300" />
                  <h4 className="text-sm font-extrabold font-mono text-white">
                    Supabase Review Moderation Console (Admin Mode)
                  </h4>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {pendingReviews.length} Reviews Awaiting Approval
                </span>
              </div>

              {pendingReviews.length === 0 ? (
                <p className="text-xs font-mono text-slate-400 py-4 text-center">
                  ✨ All submitted reviews have been moderated. No pending reviews in cue!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {pendingReviews.map(review => (
                    <div key={review.id} className="p-4 rounded-2xl bg-black/60 border border-amber-400/40 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-white">{review.clientName}</div>
                          <div className="text-[10px] font-mono text-amber-300">{review.role}, {review.company}</div>
                          <div className="text-[10px] font-mono text-slate-400">Project: {review.projectType} • {review.createdAt}</div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-200 italic font-light bg-white/5 p-2.5 rounded-xl border border-white/10">
                        "{review.reviewText}"
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleApproveReview(review.id)}
                          className="flex-1 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Approve & Publish</span>
                        </button>

                        <button
                          onClick={() => handleRejectReview(review.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-mono text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Published Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approvedReviews.map((t) => (
              <div
                key={t.id}
                className={`p-6 rounded-3xl ${theme.glassStyle} border shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-400/40 transition-colors`}
              >
                <div className="space-y-4">
                  {/* Top Header: Stars & Project Type */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                      {t.projectType || 'Web Engineering'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-light">
                    "{t.reviewText}"
                  </p>
                </div>

                {/* Author Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-amber-400 p-[1px] shrink-0">
                    <img
                      src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                      alt={t.clientName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{t.clientName}</span>
                      <span className="text-emerald-400 text-[10px]" title="Verified Review">✓</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {t.role}, <strong className="text-amber-300">{t.company}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Post Review Modal Component */}
        <PostReviewModal
          currentTheme={currentTheme}
          isOpen={postModalOpen}
          onClose={() => setPostModalOpen(false)}
          onReviewSubmitted={handleReviewSubmitted}
        />

        {/* Bottom Callout Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-black border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Upgrade Your Digital Identity?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Book a direct 1-on-1 strategy call with our Chief Designer & Technical Director.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenContact();
            }}
            className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-amber-400/30 shrink-0 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Reserve Q3 Project Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
