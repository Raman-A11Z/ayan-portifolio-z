import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, Menu, X, ArrowUpRight, Calendar, MessageCircle } from 'lucide-react';
import studioLogo from '../assets/images/ayan_studio_logo_1784795445117.jpg';

interface HeaderProps {
  currentTheme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onSelectTheme,
  onOpenContact
}) => {
  const [muted, setMuted] = useState(soundFx.muted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = THEMES[currentTheme] || THEMES['deepPurple'];
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMute();
    setMuted(isMuted);
    if (!isMuted) soundFx.playClick();
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Showcase', path: '/showcase' },
    { label: 'Blog', path: '/blog' },
    { label: 'Pricing', path: '/#pricing', isHash: true },
    { label: 'Earn & Job', path: '/earn-careers' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (path: string, isHash?: boolean) => {
    soundFx.playClick();
    setMobileMenuOpen(false);

    if (isHash) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(path.replace('/', ''));
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const element = document.querySelector(path.replace('/', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2 sm:px-8 sm:py-3 transition-all duration-300">
      <div className={`max-w-7xl mx-auto ${theme.glassStyle} rounded-2xl px-3 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between border shadow-2xl transition-all`}>
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => {
            soundFx.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group"
        >
          {/* Logo 3D Icon */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-600 to-amber-400 p-[1.5px] shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center overflow-hidden relative">
              <img
                src={studioLogo}
                alt="Ayan Web Studio Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-sm sm:text-base text-white flex items-center gap-1 leading-none">
              AYAN <span className="text-[10px] sm:text-xs font-mono font-normal px-1.5 py-0.5 rounded bg-white/10 text-amber-300 border border-white/10">STUDIO</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-slate-400 mt-0.5">
              Digital Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path, link.isHash)}
                className={`text-xs uppercase font-mono tracking-wider transition-colors relative py-1 ${
                  isActive
                    ? 'text-amber-300 font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-amber-300'
                    : 'text-slate-300 hover:text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-purple-400 hover:after:w-full after:transition-all'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Call to Action */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* INR Badge */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-300">
            <span className="font-bold text-[11px] sm:text-xs">₹ INR</span>
          </div>

          {/* Audio Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 sm:p-2 rounded-lg border transition-all ${
              muted ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-purple-500/20 border-purple-400/40 text-purple-300'
            }`}
            title={muted ? 'Unmute Tactile Sound' : 'Mute Tactile Sound'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/917033221791?text=Hi%20Ayan!%20I%20want%20to%20discuss%20a%20new%20website%20project."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-extrabold text-xs tracking-wide shadow-lg border border-emerald-300/40 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black" />
            <span className="whitespace-nowrap font-mono">WhatsApp</span>
          </a>

          {/* Advance Booking & Call Form Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenContact();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-black font-extrabold text-xs tracking-wide shadow-xl border border-amber-300/50 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <Calendar className="w-3.5 h-3.5 fill-black shrink-0" />
            <span className="whitespace-nowrap font-mono font-black">Book Call</span>
            <span className="px-1.5 py-0.5 rounded-full bg-black text-amber-300 font-mono text-[9px] font-extrabold tracking-tight border border-amber-300/30">
              10% OFF
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl p-4 rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/15 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.path, link.isHash)}
              className="text-xs font-mono tracking-wider text-slate-200 py-2.5 px-3 rounded-lg hover:bg-white/10 text-left flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
