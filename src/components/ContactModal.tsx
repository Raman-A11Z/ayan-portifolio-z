import React, { useState } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { submitLeadToSupabase } from '../lib/supabaseClient';
import { MessageCircle, Calendar, Send, CheckCircle2, Sparkles, Phone, Mail, User, Building, DollarSign, Globe, Search, Image as ImageIcon, Tag, Gift, Flame, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  currentTheme: ThemeId;
  currency?: 'INR' | 'USD';
  initialBrief?: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  currentTheme,
  initialBrief = '',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'advance' | 'quick'>('advance');

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [currentWebsiteUrl, setCurrentWebsiteUrl] = useState('');
  const [logoStatus, setLogoStatus] = useState('Have high-res logo');
  const [seoStatus, setSeoStatus] = useState('No SEO - Need fresh Google Indexing & Local SEO');
  const [websiteTypeNeeded, setWebsiteTypeNeeded] = useState('Corporate Business Website');
  const [budget, setBudget] = useState('₹25,000 – ₹50,000');
  const [colorStyle, setColorStyle] = useState('Dark Luxury / Neon Glow');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [brief, setBrief] = useState(initialBrief || '');

  // Features selected
  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    adminPanel: true,
    paymentGateway: true,
    seoOptimization: true,
    bookingSystem: true,
    blogCMS: false,
    liveWhatsApp: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = THEMES[currentTheme] || THEMES['deepPurple'];

  const toggleFeature = (key: string) => {
    soundFx.playClick();
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    setLoading(true);

    const generatedCode = `AYAN10OFF-${Math.floor(1000 + Math.random() * 9000)}`;
    setDiscountCode(generatedCode);

    const activeFeaturesList = Object.entries(features)
      .filter(([_, val]) => val)
      .map(([key]) => key)
      .join(', ');

    await submitLeadToSupabase('consultations', {
      name,
      phone,
      email,
      businessName,
      currentWebsiteUrl,
      logoStatus,
      seoStatus,
      websiteTypeNeeded,
      budget,
      colorStyle,
      referenceUrl,
      brief,
      discountCode: generatedCode,
      features: activeFeaturesList
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 600);
  };

  // Compile detailed WhatsApp message
  const activeFeaturesList = Object.entries(features)
    .filter(([_, val]) => val)
    .map(([key]) => key)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `🔥 *ADVANCE WEBSITE BOOKING FORM (10% DISCOUNT CLAIM)* 🔥\n` +
    `--------------------------------------\n` +
    `👤 *Name:* ${name || 'Prospective Client'}\n` +
    `📞 *Phone/WhatsApp:* ${phone || 'N/A'}\n` +
    `📧 *Email:* ${email || 'N/A'}\n` +
    `🏢 *Business Name:* ${businessName || 'N/A'}\n` +
    `🌐 *Current Website:* ${currentWebsiteUrl || 'None / New Website'}\n\n` +
    `🎨 *Logo Status:* ${logoStatus}\n` +
    `🚀 *SEO Status & Strategy:* ${seoStatus}\n` +
    `💻 *Website Type Needed:* ${websiteTypeNeeded}\n` +
    `⚡ *Modules Required:* ${activeFeaturesList || 'Standard'}\n` +
    `🎨 *Visual Style:* ${colorStyle}\n` +
    `🔗 *Reference URLs:* ${referenceUrl || 'N/A'}\n` +
    `💰 *Budget Range:* ${budget}\n` +
    `🏷️ *10% Discount Code:* ${discountCode || 'AYAN10OFF-CLAIM'}\n\n` +
    `📝 *Additional Project Brief:* ${brief || 'Looking for high-conversion web development & SEO strategy.'}`
  );

  return (
    <div className="fixed inset-0 z-50 p-3 sm:p-6 flex items-center justify-center bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className={`w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl ${theme.glassStyle} border border-white/20 p-5 sm:p-8 space-y-6 text-left shadow-2xl relative`}>
        
        {/* Modal Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/40 text-xs font-mono text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>ADVANCE BOOKING & CALL FORM</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Book Strategy Call & Get <span className="text-amber-300">10% OFF</span>
            </h3>
            <p className="text-xs font-mono text-slate-300">
              Fill project requirements below to lock in a 10% instant discount + direct call with founder Ayan.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10"
          >
            ✕
          </button>
        </div>

        {/* Form Selector Tabs */}
        {!submitted && (
          <div className="flex rounded-xl bg-black/60 p-1 border border-white/10">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('advance');
              }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'advance'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Advance Detailed Form (Get 10% OFF)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('quick');
              }}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'quick'
                  ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Instant WhatsApp Call</span>
            </button>
          </div>
        )}

        {submitted ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
                10% DISCOUNT LOCKED!
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white pt-1">
                Advance Booking Recorded!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Your unique 10% discount voucher code is generated below:
              </p>
              <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/40 text-amber-300 font-mono font-black text-xl inline-block tracking-wider">
                {discountCode}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left max-w-lg mx-auto space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Instant WhatsApp Dispatch Ready</span>
              </div>
              <p className="text-xs text-slate-300">
                Send your complete project details & discount code directly to Founder Ayan on WhatsApp for immediate priority review.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://wa.me/917033221791?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Send Brief to Founder Ayan on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : activeTab === 'advance' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 10% OFF Callout Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-emerald-500/15 border border-amber-400/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
                <span className="text-xs text-slate-200">
                  Fill all details below to lock in <strong className="text-amber-300">10% Instant Discount Voucher</strong> on your website development!
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-mono font-black text-[11px] shrink-0">
                10% OFF
              </span>
            </div>

            {/* Section 1: Contact & Business Details */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest block font-bold">
                1. Contact & Business Identity
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <User className="w-3 h-3 text-amber-300" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-300" /> Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Building className="w-3 h-3 text-amber-300" /> Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Sharma Clinic / Kuber Capital"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-amber-300" /> Current Website URL (If Any)
                  </label>
                  <input
                    type="text"
                    value={currentWebsiteUrl}
                    onChange={(e) => setCurrentWebsiteUrl(e.target.value)}
                    placeholder="e.g. https://myoldwebsite.com (or leave empty)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Logo & SEO Status */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block font-bold">
                2. Brand Logo & SEO Strategy
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-cyan-300" /> Do you have a Brand Logo? *
                  </label>
                  <select
                    value={logoStatus}
                    onChange={(e) => setLogoStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Have high-res logo">Yes, I have high-resolution logo</option>
                    <option value="Need logo designed by Ayan Studio">No, need custom 3D/Vector logo created</option>
                    <option value="Have existing logo that needs redesign">Have old logo that needs modern redesign</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Search className="w-3 h-3 text-cyan-300" /> Existing SEO & Google Indexing *
                  </label>
                  <select
                    value={seoStatus}
                    onChange={(e) => setSeoStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  >
                    <option value="No SEO - Need fresh Google Indexing & Local SEO">No SEO - Need fresh Google Indexing & Local SEO</option>
                    <option value="Basic SEO - Need On-Page & Technical SEO">Basic SEO - Need On-Page & Technical SEO overhaul</option>
                    <option value="Active SEO - Preserve rankings in redesign">Active Website - Preserve rankings in redesign</option>
                    <option value="Full Organic SEO & Monthly Keywords Strategy">Full Organic SEO & Monthly Keywords Growth</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Website Type & Budget */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono text-purple-300 uppercase tracking-widest block font-bold">
                3. Website Type & Specifications
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">What type of website do you need? *</label>
                  <select
                    value={websiteTypeNeeded}
                    onChange={(e) => setWebsiteTypeNeeded(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  >
                    <option value="E-Commerce Storefront">E-Commerce Storefront (UPI/Card Payment)</option>
                    <option value="Corporate Business Website">Corporate Business Website</option>
                    <option value="Educational / Coaching Institute Portal">Educational / Coaching Institute Portal</option>
                    <option value="Real Estate / Property Showcase">Real Estate / Property Showcase</option>
                    <option value="Healthcare / Clinic Appointment Portal">Healthcare / Clinic Appointment Portal</option>
                    <option value="High-Conversion Landing Page">High-Conversion Landing Page</option>
                    <option value="Custom Web App / SaaS Platform">Custom Web App / SaaS Platform</option>
                    <option value="Restaurant / Hotel Digital Menu">Restaurant / Hotel Digital Menu</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">Estimated Budget Range</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
                  >
                    <option value="₹11,999 – ₹25,000">₹11,999 – ₹25,000 (Express Launch)</option>
                    <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000 (Full Business Site)</option>
                    <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000 (Custom E-Commerce / App)</option>
                    <option value="₹1,00,000+">₹1,00,000+ (Enterprise Custom System)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modules Checkboxes */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-mono text-slate-300 block font-bold">
                Check Modules You Need Included:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'adminPanel', label: 'Admin Control Panel' },
                  { key: 'paymentGateway', label: 'UPI Payment Gateway' },
                  { key: 'seoOptimization', label: 'Google SEO & Indexing' },
                  { key: 'bookingSystem', label: 'Appointment Booking' },
                  { key: 'blogCMS', label: 'Blog & Articles CMS' },
                  { key: 'liveWhatsApp', label: 'Live WhatsApp Chat' }
                ].map((item) => (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => toggleFeature(item.key)}
                    className={`p-2 rounded-xl text-left border text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                      features[item.key]
                        ? 'bg-amber-400/20 border-amber-400/50 text-amber-200'
                        : 'bg-black/50 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] font-bold ${features[item.key] ? 'bg-amber-400 text-black' : 'border border-slate-500'}`}>
                      {features[item.key] && '✓'}
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aesthetic & References */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">Preferred Visual Style</label>
                <select
                  value={colorStyle}
                  onChange={(e) => setColorStyle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                >
                  <option value="Dark Luxury / Neon Glow">Dark Luxury / Neon Glow</option>
                  <option value="Clean Minimalist Light">Clean Minimalist Light</option>
                  <option value="Corporate Navy & Gold">Corporate Navy & Gold</option>
                  <option value="Creative Vibrant Gradient">Creative Vibrant Gradient</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">Reference Website URLs</label>
                <input
                  type="text"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="e.g. apple.com, stripe.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Brief Textarea */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Additional Project Details / Specific Requests:</label>
              <textarea
                rows={2}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Tell us any specific features or goals for your new website..."
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-black font-extrabold text-xs uppercase font-mono tracking-wider shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
              >
                {loading ? (
                  <span>Generating 10% Discount Code...</span>
                ) : (
                  <>
                    <Tag className="w-4 h-4 fill-black" />
                    <span>Submit Advance Form & Get 10% Discount</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* QUICK WHATSAPP DIRECT CALL TAB */
          <div className="p-6 rounded-2xl bg-black/60 border border-emerald-500/30 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
              <MessageCircle className="w-8 h-8 fill-emerald-400 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-white">Direct WhatsApp Discovery Call</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Connect directly with Founder & Chief Architect Ayan on WhatsApp for instant 1-on-1 strategy and quick website quote.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-300 space-y-1 text-left">
              <div className="font-bold flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" /> WhatsApp Hotline: +91 70332 21791
              </div>
              <div className="text-[11px] text-slate-400">
                Average Response Time: <strong className="text-amber-300">Under 15 Minutes</strong>
              </div>
            </div>

            <a
              href={`https://wa.me/917033221791?text=${encodeURIComponent('Hi Ayan Web Studio! I would like to schedule an instant discovery call for a new website project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-extrabold text-xs uppercase font-mono tracking-wider shadow-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Connect on WhatsApp Instantly</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
