import React, { useState } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { TESTIMONIALS_STATUS } from '../data/testimonialsData';
import { fetchTestimonials, submitReview } from '../lib/cms';
import { soundFx } from '../utils/audio';
import { SEOHead } from './SEOHead';
import { Star, ShieldCheck, MessageSquarePlus, Sparkles, CheckCircle2, UserCheck, Send, X } from 'lucide-react';

interface TestimonialsPageProps {
  currentTheme: ThemeId;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    clientName: '',
    company: '',
    projectType: 'Business Website',
    rating: 5,
    review: ''
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    // Send to Supabase (or local fallback)
    await submitReview({
      clientName: reviewForm.clientName,
      company: undefined,
      role: undefined,
      rating: Number(reviewForm.rating),
      reviewText: reviewForm.review,
      projectType: reviewForm.projectType,
      avatar: null,
      createdAt: new Date().toISOString().split('T')[0]
    } as any);
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 min-h-screen">
      <SEOHead
        title="Client Testimonials & Verified Reviews • Ayan Web Studio"
        description="Verified client testimonials, project case studies, and rating transparency for Ayan Web Studio."
      />

      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono tracking-widest text-emerald-300 uppercase font-semibold">
            100% Verified Transparency
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Client Feedback & <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Project Reviews
          </span>
        </h1>

        <p className="text-slate-300 font-light text-base sm:text-lg">
          We adhere strictly to genuine, un-altered client feedback.
        </p>
      </div>

      {/* Main Requirement Display Banner as requested by Prompt */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-black border border-white/15 backdrop-blur-2xl text-center space-y-6 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
        
        {/* Glow Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mx-auto shadow-lg">
          <UserCheck className="w-8 h-8" />
        </div>

        {/* Exact Banner Message as explicitly mandated by Prompt */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            "{TESTIMONIALS_STATUS.message}"
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
            {TESTIMONIALS_STATUS.subtitle}
          </p>
        </div>

        {/* Action Button for Client Review Submission */}
        <div className="pt-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setSubmitModalOpen(true);
            }}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 transition-transform hover:scale-105"
          >
            <MessageSquarePlus className="w-4 h-4 text-black" />
            <span>Completed A Project? Submit Client Review</span>
          </button>
        </div>

      </div>

      {/* CMS TESTIMONIAL CARD TEMPLATE PREVIEW GRID */}
      <div className="space-y-6 pt-6">
        <div className="text-center">
          <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block">
            CMS Card Architecture Ready For Live Sync
          </span>
        </div>

        {/* Placeholder CMS Cards Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              type: 'Business Website & SEO',
              demoClient: 'Corporate Client',
              rating: 5,
              reviewSample: 'Pending client review verification upon launch completion...',
              badge: 'CMS Sync Active'
            },
            {
              type: 'Custom E-Commerce Store',
              demoClient: 'Retail Storefront',
              rating: 5,
              reviewSample: 'Pending client review verification upon launch completion...',
              badge: 'CMS Sync Active'
            },
            {
              type: '3D Web Application',
              demoClient: 'Tech Enterprise',
              rating: 5,
              reviewSample: 'Pending client review verification upon launch completion...',
              badge: 'CMS Sync Active'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-4 relative opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-300">
                  {card.type}
                </span>

                <div className="flex text-amber-300 gap-1">
                  {[...Array(card.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-400 font-mono italic">
                "{card.reviewSample}"
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">{card.demoClient}</span>
                <span className="text-[10px] text-emerald-400 font-bold">{card.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT REVIEW MODAL */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 p-4 bg-black/90 backdrop-blur-2xl flex items-center justify-center">
          <div className="max-w-lg w-full bg-[#0a0a0f] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-2xl">
            
            <button
              onClick={() => {
                setSubmitModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-300 uppercase font-bold">Client Verification Portal</span>
              <h3 className="text-xl font-bold text-white">Submit Verified Client Review</h3>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Review Submitted!</h4>
                <p className="text-xs text-slate-300 font-light">
                  Thank you! Your feedback will be reviewed and published to the live CMS showcase.
                </p>
                <button
                  onClick={() => {
                    setSubmitModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="px-6 py-2 rounded-xl bg-white/10 text-white font-mono text-xs"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Your Name / Company *</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.clientName}
                    onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                    placeholder="e.g. Ananya Roy, Zenith Corp"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Project Type</label>
                  <select
                    value={reviewForm.projectType}
                    onChange={(e) => setReviewForm({ ...reviewForm, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Business Website">Business Website</option>
                    <option value="E-Commerce Storefront">E-Commerce Storefront</option>
                    <option value="Custom Web Application">Custom Web Application</option>
                    <option value="3D Brand Redesign">3D Brand Redesign</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Rating</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Your Review *</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    placeholder="Describe your experience working with Ayan Web Studio..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Submit Client Review</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
