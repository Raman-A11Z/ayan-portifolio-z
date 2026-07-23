import React, { useState } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { submitUserReview, SupabaseReview } from '../lib/supabaseClient';
import { Star, X, CheckCircle2, Sparkles, Send, User, Building, MessageSquare, Database } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PostReviewModalProps {
  currentTheme: ThemeId;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (newReview: SupabaseReview) => void;
}

export const PostReviewModal: React.FC<PostReviewModalProps> = ({
  currentTheme,
  isOpen,
  onClose,
  onReviewSubmitted
}) => {
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Founder / CEO');
  const [rating, setRating] = useState(5);
  const [projectType, setProjectType] = useState('Corporate Website');
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const theme = THEMES[currentTheme] || THEMES['deepPurple'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    setLoading(true);

    try {
      const result = await submitUserReview({
        clientName,
        company,
        role,
        rating,
        reviewText,
        projectType
      });

      setLoading(false);
      setSubmitted(true);
      onReviewSubmitted(result.review);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className={`w-full max-w-xl rounded-3xl ${theme.glassStyle} border border-white/20 p-6 sm:p-8 space-y-6 text-left shadow-2xl relative`}>
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono text-amber-300">
              <Sparkles className="w-3.5 h-3.5" /> Client Feedback & Review
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Post Your Own Review
            </h3>
            <p className="text-xs font-mono text-slate-300">
              Share your project experience. Reviews are sent for studio approval before publishing.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-extrabold text-white">Review Submitted for Approval!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
              Thank you, <strong className="text-amber-300">{clientName}</strong>! Your review has been recorded. Once approved by Ayan Web Studio team, it will appear live on our homepage.
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 font-mono flex items-center justify-center gap-2">
              <Database className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Status: Pending Approval (Saved to Supabase DB)</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs font-mono"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300 uppercase flex items-center gap-1">
                  <User className="w-3 h-3 text-amber-300" /> Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Priyanshu Raj"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300 uppercase flex items-center gap-1">
                  <Building className="w-3 h-3 text-amber-300" /> Company / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Apex Health India"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300 uppercase">Designation / Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Founder & Director"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300 uppercase">Project Type Delivered</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                >
                  <option value="Corporate Website">Corporate Website</option>
                  <option value="E-Commerce Storefront">E-Commerce Storefront</option>
                  <option value="3D WebGL Web Experience">3D WebGL Web Experience</option>
                  <option value="Custom SaaS Platform">Custom SaaS Platform</option>
                  <option value="Clinic / Educational Portal">Clinic / Educational Portal</option>
                </select>
              </div>

            </div>

            {/* Rating Stars Selection */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-mono text-slate-300 uppercase block">Rating Score</label>
              <div className="flex items-center gap-2 bg-black/60 p-2.5 rounded-xl border border-white/15 w-fit">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => {
                      soundFx.playClick();
                      setRating(s);
                    }}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-amber-300 ml-2">{rating} / 5 Stars</span>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-mono text-slate-300 uppercase flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-amber-300" /> Your Review & Feedback *
              </label>
              <textarea
                required
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience working with Ayan Web Studio, quality of design, response speed, and performance outcomes..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-black font-extrabold text-xs uppercase font-mono tracking-wider shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <span>Encrypting & Submitting Review...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Review For Approval</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
