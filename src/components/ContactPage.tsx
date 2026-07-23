import React, { useState } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { soundFx } from '../utils/audio';
import { submitContactMessage } from '../lib/cms';
import { SEOHead } from './SEOHead';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

interface ContactPageProps {
  currentTheme: ThemeId;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'New Website Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    await submitContactMessage(form);
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 min-h-screen">
      <SEOHead
        title="Contact Us • Ayan Web Studio | Boring Road, Patna, India"
        description="Get in touch with Ayan Web Studio via WhatsApp or Email. Located at Boring Road, Patna, Bihar, India."
      />

      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
          <Building2 className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-semibold">
            Direct Communication Line
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Start Your <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Digital Transformation
          </span>
        </h1>

        <p className="text-slate-300 font-light text-base sm:text-lg">
          Have a question or ready to launch your new website? Reach out directly via Phone, WhatsApp, or Email.
        </p>
      </div>

      {/* Contact Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Phone Card */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-400/50 backdrop-blur-xl transition-all space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Direct Call</span>
            <h3 className="text-lg font-bold text-white mt-0.5">Founder Line Direct</h3>
            <p className="text-xs text-slate-400 mt-1">Available Mon-Sat 9AM-8PM</p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.contact.phone}`}
            onClick={() => soundFx.playClick()}
            className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold flex items-center justify-center gap-2 transition-transform"
          >
            <span>Call Now</span>
          </a>
        </div>

        {/* WhatsApp Card */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-xl transition-all space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Instant WhatsApp</span>
            <h3 className="text-lg font-bold text-white mt-0.5">WhatsApp Direct Line</h3>
            <p className="text-xs text-slate-400 mt-1">Avg response time: 10 mins</p>
          </div>
          <a
            href={COMPANY_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-2 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Chat</span>
          </a>
        </div>

        {/* Email Card */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl transition-all space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Official Email</span>
            <h3 className="text-sm font-bold text-white mt-0.5 break-all">{COMPANY_INFO.contact.emails[0]}</h3>
            <p className="text-[11px] text-slate-400 mt-1 break-all">{COMPANY_INFO.contact.emails[1]}</p>
          </div>
          <a
            href={`mailto:${COMPANY_INFO.contact.emails[0]}`}
            onClick={() => soundFx.playClick()}
            className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold flex items-center justify-center gap-2 transition-transform"
          >
            <span>Send Email</span>
          </a>
        </div>

        {/* Office Address Card */}
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-purple-400/50 backdrop-blur-xl transition-all space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Office Location</span>
            <h3 className="text-lg font-bold text-white mt-0.5">{COMPANY_INFO.contact.office}</h3>
            <p className="text-xs text-slate-400 mt-1">{COMPANY_INFO.contact.city}, {COMPANY_INFO.contact.state}, {COMPANY_INFO.contact.country}</p>
          </div>
          <div className="pt-2 text-[11px] font-mono text-amber-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Mon-Sat: 9AM - 8PM IST</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Contact Form & Google Map Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-300" /> Send Us A Message
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Fill out the form below and founder Ayan will personally respond to your inquiry within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-300 font-light">
                Thank you, {form.name}. We have received your inquiry regarding "{form.subject}". Ayan Web Studio will reach out shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-xl bg-white/10 text-white font-mono text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="vikram@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase block">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. New E-Commerce Website"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 uppercase block">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share details about your business goals, target audience, and preferred deadline..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase font-mono tracking-wider shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <span>Send Direct Message</span>
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          )}
        </div>

        {/* Google Map Placeholder & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Google Map Ready Embed Area */}
          <div className="rounded-3xl overflow-hidden border border-white/15 bg-slate-900 relative h-[320px] shadow-2xl flex flex-col justify-between p-6">
            
            {/* Embedded Google Map iframe ready for Boring Road Patna */}
            <iframe
              title="Ayan Web Studio Office - Boring Road Patna"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5186830560037!2d85.116666!3d25.613333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed582312345677%3A0x123456789abcdef!2sBoring%20Rd%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 filter grayscale invert opacity-75 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div className="relative z-10 self-start px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>HQ: Boring Road, Patna, Bihar</span>
            </div>

            <div className="relative z-10 self-end p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20 max-w-xs space-y-1">
              <h4 className="text-xs font-bold text-white">Ayan Web Studio</h4>
              <p className="text-[10px] text-slate-300 font-mono">Boring Road, Patna, Bihar 800001, India</p>
            </div>
          </div>

          {/* Business Hours Box */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-300" /> Working Hours & Availability
            </h3>
            <ul className="space-y-2 text-xs font-mono text-slate-300">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Monday - Friday</span>
                <span className="text-emerald-400 font-bold">9:00 AM - 8:00 PM IST</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Saturday</span>
                <span className="text-amber-300 font-bold">10:00 AM - 6:00 PM IST</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-slate-400">Emergency Client Support Only</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
