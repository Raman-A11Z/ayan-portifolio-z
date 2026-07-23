import React, { useState } from 'react';
import { SERVICES } from '../data/servicesData';
import { ThreeCanvas } from './ThreeCanvas';
import { THEMES } from '../data/themeData';
import { ThemeId, ServiceItem } from '../types';
import { soundFx } from '../utils/audio';
import { SEOHead } from './SEOHead';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, CheckCircle2, Zap, Building2, ShoppingBag, 
  Cpu, ShieldCheck, TrendingUp, Layers, Check, HelpCircle, PhoneCall, Code2
} from 'lucide-react';

interface ServicesPageProps {
  currentTheme: ThemeId;
  onOpenContact: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  currentTheme,
  onOpenContact
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeServiceId, setActiveServiceId] = useState<string>('landing-pages');
  const theme = THEMES[currentTheme] || THEMES['deepPurple'];
  const navigate = useNavigate();

  const selectedService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'web', label: 'Web Development' },
    { id: 'ecommerce', label: 'E-Commerce Stores' },
    { id: '3d', label: '3D WebGL Experiences' },
    { id: 'enterprise', label: 'Enterprise Web Apps' }
  ];

  const filteredServices = SERVICES.filter(srv => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'web') return srv.id.includes('landing') || srv.id.includes('corporate');
    if (activeCategory === 'ecommerce') return srv.id.includes('ecommerce');
    if (activeCategory === '3d') return srv.id.includes('3d');
    if (activeCategory === 'enterprise') return srv.id.includes('custom') || srv.id.includes('maintenance');
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const serviceFAQs = [
    {
      q: "How long does a custom website build take?",
      a: "Standard corporate sites and high-converting landing pages are delivered in 7–14 days. Complex e-commerce platforms and 3D WebGL portals take 2–4 weeks."
    },
    {
      q: "Do you offer post-launch support and hosting maintenance?",
      a: "Yes! Every single website build includes 3 Months of FREE full-stack maintenance, domain management, SSL updates, and performance monitoring."
    },
    {
      q: "Can I accept payments directly on my website in India?",
      a: "Absolutely. We integrate Razorpay, Cashfree, UPI QR codes, PhonePe, and international Stripe payments with zero technical hassle."
    },
    {
      q: "Do you write custom code or use templates?",
      a: "We write 100% custom React 19, TypeScript, and Three.js WebGL code. Zero slow WordPress themes, zero generic templates, guaranteeing sub-second speed."
    }
  ];

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 min-h-screen">
      <SEOHead
        title="Web Development & 3D Engineering Services • Ayan Web Studio"
        description="Explore bespoke React web engineering, 3D WebGL portals, e-commerce storefronts, and digital transformation services in India."
      />

      {/* Page Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
          <Sparkles className="w-3.5 h-3.5" /> Bespoke Engineering & Zero Template Guarantee
        </div>

        <h1 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Dedicated Engineering <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Services & Solutions
          </span>
        </h1>

        <p className="text-slate-300 font-light text-base sm:text-lg">
          Custom React 19 web applications, WebGL 3D property models, headless D2C storefronts, and automated business workflows designed for extreme performance.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              soundFx.playClick();
              setActiveCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
              activeCategory === cat.id
                ? 'bg-amber-400 text-black font-extrabold border-amber-300 shadow-lg scale-105'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Service Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Service Selection List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-amber-300 uppercase tracking-widest font-semibold px-1">
            Choose A Service ({filteredServices.length}):
          </div>

          {filteredServices.map((srv) => {
            const isSelected = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveServiceId(srv.id);
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between border group ${
                  isSelected
                    ? 'bg-white/15 border-amber-400/50 shadow-2xl scale-[1.01]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="p-3 rounded-xl transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: isSelected ? srv.accentColor : 'rgba(255,255,255,0.08)',
                      color: isSelected ? '#000000' : '#FFFFFF'
                    }}
                  >
                    {getIcon(srv.iconName)}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                      {srv.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {srv.category}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-extrabold text-amber-300">
                    ₹{srv.offerPriceINR.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Offer Rate
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Service Deep Dive */}
        <div className="lg:col-span-7">
          <div className={`p-8 rounded-3xl ${theme.glassStyle} border border-white/15 shadow-2xl space-y-8 relative overflow-hidden text-left`}>
            
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block font-bold">
                  Service Specification
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedService.title}
                </h3>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-gradient-to-br from-amber-400/20 to-purple-500/20 border border-amber-400/40 text-right">
                <span className="text-[10px] font-mono text-slate-300 uppercase block">Launch Offer Rate</span>
                <span className="text-xl font-extrabold text-amber-300 font-mono">₹{selectedService.offerPriceINR.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-200 font-light text-sm sm:text-base leading-relaxed">
              {selectedService.description}
            </p>

            {/* 3D Visual Shader Interactive Preview */}
            <div className="h-56 rounded-2xl bg-black/80 border border-white/15 relative overflow-hidden group shadow-inner">
              <ThreeCanvas shapeType={selectedService.shape3d} color={selectedService.accentColor} />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 border border-white/20 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md">
                <Cpu className="w-3 h-3 text-amber-300" />
                <span>3D WebGL Asset: {selectedService.shape3d.toUpperCase()}</span>
              </div>
            </div>

            {/* Included Deliverables */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-amber-300 tracking-wider font-extrabold">
                Guaranteed Deliverables Included:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.deliverables.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-mono">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Tech Stack Architecture:
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedService.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  soundFx.playClick();
                  navigate('/book');
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase font-mono tracking-wider shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>Book This Service (10% OFF)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenContact();
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/15 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>Discuss Custom Requirements</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Service FAQ Accordion */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl space-y-8 text-left shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-mono text-cyan-300">
            <HelpCircle className="w-3.5 h-3.5" /> Service Clarifications
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceFAQs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-start gap-2">
                <span className="font-mono text-slate-500">Q{idx + 1}.</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
