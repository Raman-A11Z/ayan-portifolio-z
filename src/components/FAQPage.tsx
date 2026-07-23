import React, { useState } from 'react';
import { THEMES } from '../data/themeData';
import { ThemeId } from '../types';
import { FAQ_ITEMS } from '../data/faqData';
import { soundFx } from '../utils/audio';
import { SEOHead } from './SEOHead';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  currentTheme: ThemeId;
  onOpenContact: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ currentTheme, onOpenContact }) => {
  const theme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'Process & Timeline', 'Design & Tech', 'Pricing & Payment', 'Support'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    soundFx.playClick();
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-5xl mx-auto space-y-12 min-h-screen">
      <SEOHead
        title="Frequently Asked Questions • Ayan Web Studio"
        description="Find answers to common questions about web development timelines, custom React design, payment terms, admin panels, SEO, and 3-month free support."
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl">
          <HelpCircle className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-semibold">
            Clear Transparent Answers
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>
            Questions
          </span>
        </h1>

        <p className="text-slate-300 font-light text-base sm:text-lg">
          Everything you need to know about partnering with Ayan Web Studio, our engineering process, and client guarantees.
        </p>
      </div>

      {/* Search & Category Tabs */}
      <div className="space-y-4">
        
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. SEO, payment, timeline)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 shadow-xl"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center p-12 rounded-3xl bg-white/[0.02] border border-white/10 text-slate-400 font-mono text-sm">
            No questions found matching "{searchQuery}".
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.06] border-amber-400/50 shadow-xl'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 border border-white/15 text-amber-300 shrink-0">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>

                  <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-400 text-black' : 'text-slate-300'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 animate-in fade-in-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Unanswered Question CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-blue-900/30 border border-purple-500/30 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Have a specific question not listed here?</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto font-light">
          Founder Ayan is available on WhatsApp to answer any custom architectural or billing questions directly.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="https://wa.me/917033221791?text=Hello%20Ayan!%20I%20have%20a%20question%20about..."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>

          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold"
          >
            Book Strategy Call
          </button>
        </div>
      </div>

    </div>
  );
};
