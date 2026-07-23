import React, { useState } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { submitBooking } from '../lib/cms';
import { SEOHead } from './SEOHead';
import { Sparkles, CheckCircle2, Calendar, Clock, Phone, Mail, MessageSquare, Flame, Tag, ShieldCheck, ArrowRight, Gift } from 'lucide-react';

interface BookConsultationPageProps {
  currentTheme: ThemeId;
  currency?: 'INR' | 'USD';
}

export const BookConsultationPage: React.FC<BookConsultationPageProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [submittedStep, setSubmittedStep] = useState<number | null>(null);

  // Step 1 State
  const [quickForm, setQuickForm] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    category: 'E-Commerce / Retail',
    contactMethod: 'WhatsApp',
    meetingDate: '',
    meetingTime: '11:00 AM IST',
    message: ''
  });

  // Step 2 State
  const [detailedForm, setDetailedForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessName: '',
    industry: '',
    currentWebsite: '',
    logoStatus: 'Have high-res logo',
    seoStatus: 'No SEO - Need fresh Google Indexing & Local SEO',
    websiteTypeNeeded: 'Corporate Business Website',
    businessGoals: '',
    targetAudience: '',
    servicesOffered: '',
    adminPanelRequired: 'Yes',
    blogRequired: 'Yes',
    eCommerceRequired: 'No',
    bookingRequired: 'Yes',
    paymentGatewayRequired: 'Yes',
    seoRequired: 'Yes',
    colorStyle: 'Dark Luxury / Neon Glow',
    referenceWebsites: '',
    budgetRange: '₹20,000 - ₹40,000',
    deadline: 'Within 2 Weeks',
    additionalNotes: ''
  });

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    await submitBooking({ type: 'quick_consult', ...quickForm });
    setSubmittedStep(1);
  };

  const handleDetailedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    await submitBooking({ type: 'detailed_questionnaire', ...detailedForm });
    setSubmittedStep(2);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-5xl mx-auto space-y-12 min-h-screen">
      <SEOHead
        title="Book Free Consultation • Ayan Web Studio"
        description="Book a free 30-minute web strategy call or submit your project questionnaire to lock in a ₹1000 launch discount."
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-purple-500/20 border border-amber-400/40 text-xs font-mono text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span className="font-extrabold uppercase tracking-widest">Book Consultation & Strategy Call</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Discuss Your <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Next Digital Growth Milestone
          </span>
        </h1>

        <p className="text-slate-300 font-light text-base sm:text-lg">
          Choose between a quick 30-minute discovery call booking or complete our detailed questionnaire to instantly claim an additional ₹1,000 discount.
        </p>
      </div>

      {/* Step Selector Tabs */}
      <div className="flex rounded-2xl bg-white/5 p-1.5 border border-white/10 backdrop-blur-xl max-w-xl mx-auto">
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveStep(1);
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 ${
            activeStep === 1
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Step 1: Quick Call Booking</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            setActiveStep(2);
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 relative ${
            activeStep === 2
              ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Gift className="w-4 h-4 text-amber-300" />
          <span>Step 2: Questionnaire</span>
          <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white text-[9px] font-extrabold font-mono tracking-wider animate-bounce">
            ₹1000 OFF
          </span>
        </button>
      </div>

      {/* SUCCESS CONFIRMATION MODAL STATE */}
      {submittedStep ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-emerald-500/40 backdrop-blur-2xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-extrabold">
              {submittedStep === 2 ? '₹1,000 Discount Applied & Submitted!' : 'Consultation Scheduled!'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Thank You! We Received Your Request.
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-lg mx-auto">
              Ayan Web Studio will reach out via WhatsApp and Email within 2 business hours to confirm your meeting time and project proposal.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => setSubmittedStep(null)}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold"
            >
              Submit Another Request
            </button>

            <a
              href="https://wa.me/917033221791?text=Hello%20Ayan!%20I%20just%20submitted%20the%20consultation%20form."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message on WhatsApp Now</span>
            </a>
          </div>
        </div>
      ) : activeStep === 1 ? (
        
        /* STEP 1: QUICK CONSULTATION FORM */
        <form onSubmit={handleQuickSubmit} className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-300" /> Step 1: Quick Consultation Form
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Select your preferred time for a 30-minute discovery session with founder Ayan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Full Name *</label>
              <input
                type="text"
                required
                value={quickForm.fullName}
                onChange={(e) => setQuickForm({ ...quickForm, fullName: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Business Name *</label>
              <input
                type="text"
                required
                value={quickForm.businessName}
                onChange={(e) => setQuickForm({ ...quickForm, businessName: e.target.value })}
                placeholder="e.g. Sharma Enterprises"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                value={quickForm.phone}
                onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Email Address *</label>
              <input
                type="email"
                required
                value={quickForm.email}
                onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                placeholder="rahul@example.com"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Business Category</label>
              <select
                value={quickForm.category}
                onChange={(e) => setQuickForm({ ...quickForm, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="E-Commerce / Retail">E-Commerce / Retail</option>
                <option value="Corporate / Business">Corporate / Business</option>
                <option value="Real Estate / Architecture">Real Estate / Architecture</option>
                <option value="Healthcare / Clinics">Healthcare / Clinics</option>
                <option value="Education / Coaching">Education / Coaching</option>
                <option value="Restaurant / Hospitality">Restaurant / Hospitality</option>
                <option value="Tech / SaaS Application">Tech / SaaS Application</option>
                <option value="Other">Other Category</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Preferred Contact Method</label>
              <select
                value={quickForm.contactMethod}
                onChange={(e) => setQuickForm({ ...quickForm, contactMethod: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="WhatsApp">WhatsApp Call / Chat</option>
                <option value="Phone Call">Direct Phone Call</option>
                <option value="Google Meet">Google Meet Video Call</option>
                <option value="Email">Email Communication</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Preferred Meeting Date</label>
              <input
                type="date"
                required
                value={quickForm.meetingDate}
                onChange={(e) => setQuickForm({ ...quickForm, meetingDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Preferred Meeting Time</label>
              <select
                value={quickForm.meetingTime}
                onChange={(e) => setQuickForm({ ...quickForm, meetingTime: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="10:00 AM IST">10:00 AM IST</option>
                <option value="11:30 AM IST">11:30 AM IST</option>
                <option value="02:00 PM IST">02:00 PM IST</option>
                <option value="04:00 PM IST">04:00 PM IST</option>
                <option value="06:30 PM IST">06:30 PM IST</option>
              </select>
            </div>

          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 uppercase block">Message / Initial Vision</label>
            <textarea
              rows={4}
              value={quickForm.message}
              onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
              placeholder="Tell us briefly about your business goals and key requirements..."
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase font-mono tracking-wider shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        
        /* STEP 2: ADVANCE PROJECT QUESTIONNAIRE WITH 10% DISCOUNT */
        <form onSubmit={handleDetailedSubmit} className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-cyan-400/40 backdrop-blur-2xl space-y-8 shadow-2xl">
          
          {/* Discount Banner as explicitly required by Prompt */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-400/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-amber-400 shrink-0 animate-bounce" />
              <div>
                <span className="text-amber-300 font-extrabold text-xs font-mono uppercase tracking-wider block">
                  🔥 Special Incentive: 10% Instant Discount
                </span>
                <p className="text-sm text-white font-bold">
                  Complete this advance form and lock in an additional 10% OFF + ₹1,000 launch credit on your website project!
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-amber-400 text-black font-mono font-black text-xs shrink-0">
              10% OFF
            </span>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block font-bold">
              1. Contact & Business Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={detailedForm.fullName}
                  onChange={(e) => setDetailedForm({ ...detailedForm, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={detailedForm.phone}
                  onChange={(e) => setDetailedForm({ ...detailedForm, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Email Address *</label>
                <input
                  type="email"
                  required
                  value={detailedForm.email}
                  onChange={(e) => setDetailedForm({ ...detailedForm, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Business Name *</label>
                <input
                  type="text"
                  required
                  value={detailedForm.businessName}
                  onChange={(e) => setDetailedForm({ ...detailedForm, businessName: e.target.value })}
                  placeholder="e.g. Apex Global Solutions"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Current Website URL (If Any)</label>
                <input
                  type="text"
                  value={detailedForm.currentWebsite}
                  onChange={(e) => setDetailedForm({ ...detailedForm, currentWebsite: e.target.value })}
                  placeholder="e.g. https://myoldwebsite.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Industry / Category *</label>
                <input
                  type="text"
                  required
                  value={detailedForm.industry}
                  onChange={(e) => setDetailedForm({ ...detailedForm, industry: e.target.value })}
                  placeholder="e.g. Healthcare, E-Commerce, Legal"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block font-bold">
              2. Brand Logo & SEO Requirements
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Do you have a Logo? *</label>
                <select
                  value={detailedForm.logoStatus}
                  onChange={(e) => setDetailedForm({ ...detailedForm, logoStatus: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Have high-res logo">Yes, I have high-resolution logo</option>
                  <option value="Need logo designed by Ayan Studio">No, need custom 3D/Vector logo created</option>
                  <option value="Have existing logo that needs redesign">Have old logo that needs modern redesign</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">SEO & Google Ranking Status *</label>
                <select
                  value={detailedForm.seoStatus}
                  onChange={(e) => setDetailedForm({ ...detailedForm, seoStatus: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="No SEO - Need fresh Google Indexing & Local SEO">No SEO - Need fresh Google Indexing & Local SEO</option>
                  <option value="Basic SEO - Need On-Page & Technical SEO">Basic SEO - Need On-Page & Technical SEO overhaul</option>
                  <option value="Active SEO - Preserve rankings in redesign">Active Website - Preserve rankings in redesign</option>
                  <option value="Full Organic SEO & Monthly Keywords Strategy">Full Organic SEO & Monthly Keywords Growth</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">What type of website do you need? *</label>
                <select
                  value={detailedForm.websiteTypeNeeded}
                  onChange={(e) => setDetailedForm({ ...detailedForm, websiteTypeNeeded: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Corporate Business Website">Corporate Business Website</option>
                  <option value="E-Commerce Storefront">E-Commerce Storefront (UPI/Card Payment)</option>
                  <option value="Educational / Coaching Institute Portal">Educational / Coaching Institute Portal</option>
                  <option value="Real Estate / Property Showcase">Real Estate / Property Showcase</option>
                  <option value="Healthcare / Clinic Appointment Portal">Healthcare / Clinic Appointment Portal</option>
                  <option value="High-Conversion Landing Page">High-Conversion Landing Page</option>
                  <option value="Custom Web App / SaaS Platform">Custom Web App / SaaS Platform</option>
                  <option value="Restaurant / Hotel Digital Menu">Restaurant / Hotel Digital Menu</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase block">Business Goals</label>
                <input
                  type="text"
                  value={detailedForm.businessGoals}
                  onChange={(e) => setDetailedForm({ ...detailedForm, businessGoals: e.target.value })}
                  placeholder="e.g. Get more leads, online payments, brand trust"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Feature Check Toggles */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-mono text-amber-300 uppercase tracking-widest block font-bold">
              Required Website Modules & Features
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: 'adminPanelRequired', label: 'Admin Panel Required' },
                { key: 'blogRequired', label: 'Blog Section Required' },
                { key: 'eCommerceRequired', label: 'E-Commerce Store' },
                { key: 'bookingRequired', label: 'Appointment Booking' },
                { key: 'paymentGatewayRequired', label: 'Payment Gateway (UPI/Card)' },
                { key: 'seoRequired', label: 'SEO & Google Indexing' }
              ].map((item) => (
                <div key={item.key} className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-200">{item.label}</span>
                  <select
                    value={(detailedForm as any)[item.key]}
                    onChange={(e) => setDetailedForm({ ...detailedForm, [item.key]: e.target.value })}
                    className="bg-white/10 border border-white/15 rounded px-2 py-1 text-xs font-mono text-cyan-300"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Preferred Color / Visual Style</label>
              <select
                value={detailedForm.colorStyle}
                onChange={(e) => setDetailedForm({ ...detailedForm, colorStyle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="Dark Luxury / Neon Glow">Dark Luxury / Neon Glow</option>
                <option value="Clean Minimalist Light">Clean Minimalist Light</option>
                <option value="Corporate Navy & Gold">Corporate Navy & Gold</option>
                <option value="Creative Artistic Gradient">Creative Artistic Gradient</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Reference Websites (Inspiration)</label>
              <input
                type="text"
                value={detailedForm.referenceWebsites}
                onChange={(e) => setDetailedForm({ ...detailedForm, referenceWebsites: e.target.value })}
                placeholder="e.g. apple.com, stripe.com, targetwebsite.in"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Estimated Budget Range</label>
              <select
                value={detailedForm.budgetRange}
                onChange={(e) => setDetailedForm({ ...detailedForm, budgetRange: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="₹11,999 - ₹20,000">₹11,999 - ₹20,000 (Express Startup Website)</option>
                <option value="₹20,000 - ₹40,000">₹20,000 - ₹40,000 (Full Business Storefront)</option>
                <option value="₹40,000 - ₹80,000">₹40,000 - ₹80,000 (Custom E-Commerce / App)</option>
                <option value="₹80,000+">₹80,000+ (Enterprise Custom Application)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase block">Project Deadline</label>
              <select
                value={detailedForm.deadline}
                onChange={(e) => setDetailedForm({ ...detailedForm, deadline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="Urgent (7 Days)">Urgent (7 Days)</option>
                <option value="Within 2 Weeks">Within 2 Weeks</option>
                <option value="Within 1 Month">Within 1 Month</option>
                <option value="Flexible Schedule">Flexible Schedule</option>
              </select>
            </div>

          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 uppercase block">Additional Notes / Special Instructions</label>
            <textarea
              rows={3}
              value={detailedForm.additionalNotes}
              onChange={(e) => setDetailedForm({ ...detailedForm, additionalNotes: e.target.value })}
              placeholder="Any specific features, domain name preferences, or questions..."
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 hover:from-emerald-300 hover:to-amber-300 text-black font-extrabold text-sm uppercase font-mono tracking-wider shadow-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
          >
            <span>Submit Project Details & Claim ₹1000 Discount</span>
            <Tag className="w-4 h-4 text-black" />
          </button>
        </form>
      )}

    </div>
  );
};
