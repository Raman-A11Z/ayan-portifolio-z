import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { soundFx } from '../utils/audio';
import { MessageCircle, MapPin, Mail, Phone, Send, Sparkles, ShieldCheck, Heart, Lock } from 'lucide-react';
import studioLogo from '../assets/images/ayan_studio_logo_1784795445117.jpg';

interface FooterProps {
  currentTheme: ThemeId;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentTheme, onOpenContact }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const theme = THEMES[currentTheme] || THEMES['deepPurple'];
  const navigate = useNavigate();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playSuccess();
    setSubscribed(true);
  };

  const handleLinkClick = (path: string) => {
    soundFx.playClick();
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(path.replace('/', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative pt-20 pb-12 px-4 sm:px-8 border-t border-white/10 bg-black/95 overflow-hidden text-slate-300">
      
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-purple-600/10 blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-600 to-amber-400 p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img
                    src={studioLogo}
                    alt="Ayan Web Studio Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-lg text-white">
                  AYAN <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/10 text-amber-300">STUDIO</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400">
                  "We Build Digital Excellence"
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Ayan Web Studio was founded to create premium, modern, and high-performance websites that help businesses establish a strong digital presence. Sub-second performance, 100% custom React architecture, and 3 months of free maintenance.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3 Months Post-Launch Maintenance Included</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-amber-300 uppercase tracking-widest font-semibold block">
              Company
            </span>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => handleLinkClick('/earn-careers')} className="text-amber-300 font-bold hover:text-amber-200 transition-colors">
                  🎁 Earn & Job
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/about')} className="hover:text-amber-300 transition-colors">
                  About Founder
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/#services')} className="hover:text-amber-300 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/#pricing')} className="hover:text-amber-300 transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/book')} className="hover:text-amber-300 transition-colors">
                  Book Call
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/contact')} className="hover:text-amber-300 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Quick Links (Col 7-8) */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-amber-300 uppercase tracking-widest font-semibold block">
              Resources
            </span>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => handleLinkClick('/blog')} className="hover:text-amber-300 transition-colors">
                  Engineering Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/faq')} className="hover:text-amber-300 transition-colors">
                  FAQ & Answers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/testimonials')} className="hover:text-amber-300 transition-colors">
                  Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/privacy')} className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/terms')} className="hover:text-amber-300 transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information (Col 9-12) */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-amber-300 uppercase tracking-widest font-semibold block">
              Contact Information
            </span>

            <ul className="space-y-2.5 text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="hover:text-amber-300 transition-colors">
                  Phone: {COMPANY_INFO.contact.phone}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={COMPANY_INFO.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">
                  WhatsApp: {COMPANY_INFO.contact.whatsapp}
                </a>
              </li>

              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href={`mailto:${COMPANY_INFO.contact.emails[0]}`} className="hover:text-amber-300">
                    {COMPANY_INFO.contact.emails[0]}
                  </a>
                  <a href={`mailto:${COMPANY_INFO.contact.emails[1]}`} className="hover:text-amber-300 text-slate-400 text-[11px]">
                    {COMPANY_INFO.contact.emails[1]}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Office: {COMPANY_INFO.contact.office}, {COMPANY_INFO.contact.city}, {COMPANY_INFO.contact.state}, {COMPANY_INFO.contact.country}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Policies & Copyright Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            Copyright © 2026 Ayan Web Studio. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleLinkClick('/privacy')} className="hover:text-amber-300 transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('/terms')} className="hover:text-amber-300 transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('/admin/login')} className="hover:text-amber-300 transition-colors flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-amber-300 font-bold">Admin</span>
            </button>
          </div>
        </div>

        {/* Bottom Section as explicitly requested by Prompt */}
        <div className="pt-4 border-t border-white/5 text-center text-xs font-mono text-slate-400">
          Designed and Developed by <span className="text-amber-300 font-bold">Ayan Web Studio</span>
        </div>

      </div>
    </footer>
  );
};
