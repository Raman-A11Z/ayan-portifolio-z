import React, { useState } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { soundFx } from '../utils/audio';
import { Palette, ChevronDown, Check, Sparkles } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onSelectTheme }) => {
  const [open, setOpen] = useState(false);
  const activeTheme = THEMES[currentTheme] || THEMES['deepPurple'];

  const handleSelect = (id: ThemeId) => {
    soundFx.playThemeSwitch();
    onSelectTheme(id);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        
        {/* Dropdown Options */}
        {open && (
          <div className="absolute bottom-16 right-0 w-72 sm:w-80 p-3 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="px-3 py-2 flex items-center justify-between border-b border-white/10 mb-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Live Design Switcher
              </span>
              <span className="text-[10px] font-mono text-slate-400">7 Handcrafted Themes</span>
            </div>

            {Object.values(THEMES).map((th) => {
              const isSelected = th.id === currentTheme;
              return (
                <button
                  key={th.id}
                  onClick={() => handleSelect(th.id as ThemeId)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-white/15 border border-white/20 shadow-lg'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Color Swatch Dot */}
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-white/20 flex items-center justify-center">
                      <div className={`w-full h-full ${th.bgClass}`} />
                      <div
                        className="absolute inset-1 rounded-sm opacity-80"
                        style={{ backgroundColor: th.primaryColorHex }}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                        {th.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono line-clamp-1">
                        {th.tagline}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            setOpen(!open);
          }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-black/80 hover:bg-black/95 backdrop-blur-2xl border border-amber-400/30 text-white font-mono text-xs shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="relative w-5 h-5 rounded-full flex items-center justify-center overflow-hidden">
            <Palette className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
          </div>

          <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
            Theme: <span className="text-amber-300 font-bold">{activeTheme.name}</span>
          </span>

          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
