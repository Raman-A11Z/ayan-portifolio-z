import React, { useState } from 'react';
import { SERVICES } from '../data/servicesData';
import { ThreeCanvas } from './ThreeCanvas';
import { THEMES } from '../data/themeData';
import { ThemeId, ServiceItem } from '../types';
import { soundFx } from '../utils/audio';
import { Sparkles, ArrowRight, CheckCircle2, Zap, Building2, ShoppingBag, Cpu, ShieldCheck, TrendingUp } from 'lucide-react';

interface ServicesSectionProps {
  currentTheme: ThemeId;
  currency?: 'INR' | 'USD';
  onSelectServiceForEstimator?: (serviceId: string) => void;
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentTheme,
  onOpenContact
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('landing-pages');
  const theme = THEMES[currentTheme] || THEMES['deepPurple'];

  const selectedService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

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

  return (
    <section id="services" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
            <Sparkles className="w-3.5 h-3.5" /> Handcrafted Deliverables & Craftsmanship
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Specialized Digital Offerings <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
              Bespoke Systems, Zero Templates
            </span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg">
            Each service is forged with its own custom 3D shape, specialized tech stack, and guaranteed performance deliverables.
          </p>
        </div>

        {/* Interactive Services Grid & Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-amber-300 uppercase tracking-widest font-semibold px-1">
              Select Capabilities:
            </div>

            {SERVICES.map((srv) => {
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
                      <div className="text-xs text-slate-400 font-mono line-clamp-1">
                        {srv.category}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase">From</span>
                    <span className="font-bold text-amber-300">
                      ₹{srv.inrStartingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Dive Active Service Inspector Card */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl ${theme.glassStyle} border shadow-2xl space-y-8 relative overflow-hidden`}>
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-amber-300">
                      {selectedService.category}
                    </span>
                    {selectedService.launchOfferLabel && (
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-extrabold text-[11px] font-mono tracking-wider">
                        🔥 {selectedService.launchOfferLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedService.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 items-center text-xs font-mono text-slate-300">
                    <span className="text-slate-400">Perfect For:</span>
                    {selectedService.perfectForList.map((pf, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-cyan-300">
                        {pf}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3D Geometry Shape Viewer */}
                <div className="w-28 h-28 rounded-2xl bg-black/60 border border-white/15 overflow-hidden relative shrink-0">
                  <ThreeCanvas currentTheme={currentTheme} shapeType={selectedService.shape3d} interactiveControls={false} />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-amber-300 uppercase border border-white/10">
                    3D {selectedService.shape3d}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {selectedService.description}
              </p>

              {/* Service Features Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
                  Included Features:
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {selectedService.featuresList.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs text-slate-200 font-mono">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    {selectedService.isCustomQuote ? (
                      <span className="text-2xl font-extrabold text-cyan-300 font-mono">
                        Starting ₹80,000+
                      </span>
                    ) : (
                      <>
                        <span className="text-sm font-mono text-slate-400 line-through">
                          ₹{selectedService.regularPriceINR.toLocaleString('en-IN')}
                        </span>
                        <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                          ₹{selectedService.offerPriceINR.toLocaleString('en-IN')}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                    {selectedService.isCustomQuote ? 'Custom Quote Available' : 'Launch Offer Discounted Price'}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onOpenContact();
                    }}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
